RxObservable = require('rxjs/Observable').Observable
require 'rxjs/add/observable/of'
RxBehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject
RxReplaySubject = require('rxjs/ReplaySubject').ReplaySubject
_defaults = require 'lodash/defaults'
_isEmpty = require 'lodash/isEmpty'
_isEqual = require 'lodash/isEqual'
_filter = require 'lodash/filter'
_groupBy = require 'lodash/groupBy'
_map = require 'lodash/map'
_reduce = require 'lodash/reduce'
_some = require 'lodash/some'
_zipWith = require 'lodash/zipWith'

class SearchFiltersService
  getFundFilters: ->
    [
      {
        field: 'subType'
        type: 'fieldList'
        items: [
          {key: 'public', label: '1'}
          {key: 'private', label: 'two'}
        ]
        name: 'abc'
      }
  ]

  getFiltersStream: ({model, filters, initialFilters, dataType = 'irsFund'}) ->
    # eg filters from custom urls
    initialFilters ?= new RxBehaviorSubject null
    initialFilters.switchMap (initialFilters) =>
      persistentCookie = 'savedFilters'
      savedFilters = try
        JSON.parse model.cookie.get persistentCookie
      catch
        {}

      filters = _map filters, (filter) =>
        if filter.type is 'booleanArray'
          savedValueKey = "#{dataType}.#{filter.field}.#{filter.arrayValue}"
        else
          savedValueKey = "#{dataType}.#{filter.field}"

        initialValue = if initialFilters \
                       then initialFilters[savedValueKey] \
                       else savedFilters[savedValueKey]

        valueStreams = new RxReplaySubject 1
        valueStreams.next RxObservable.of(
          if initialValue? then initialValue else filter.defaultValue
        )

        _defaults {dataType, valueStreams}, filter

      if _isEmpty filters
        return RxObservable.of {}

      RxObservable.combineLatest(
        _map filters, ({valueStreams}) -> valueStreams.switch()
        (vals...) -> vals
      )
      # ^^ updates a lot since $filterContent sets valueStreams on a lot
      # on load. this prevents a bunch of extra lodash loops from getting called
      .distinctUntilChanged _isEqual
      .map (values) =>
        filtersWithValue = _zipWith filters, values, (filter, value) ->
          _defaults {value}, filter

        # set cookie to persist filters
        savedFilters = _reduce filtersWithValue, (obj, filter) ->
          {dataType, field, value, type, arrayValue} = filter
          if value? and type is 'booleanArray'
            obj["#{dataType}.#{field}.#{arrayValue}"] = value
          else if value?
            obj["#{dataType}.#{field}"] = value
          obj
        , {}
        model.cookie.set persistentCookie, JSON.stringify savedFilters

        filtersWithValue

    # for whatever reason, required for stream to update, unless the
    # initialFilters switchMap is removed
    .publishReplay(1).refCount()


  getESQueryFromFilters: (filters) =>
    groupedFilters = _groupBy filters, 'field'
    filter = _filter _map groupedFilters, (fieldFilters, field) =>
      unless _some fieldFilters, 'value'
        return

      filter = fieldFilters[0]

      switch filter.type
        when 'maxInt', 'maxIntCustom'
          {
            range:
              "#{field}":
                lte: filter.value
          }
        when 'minInt', 'minIntCustom'
          {
            range:
              "#{field}":
                gte: filter.value
          }
        when 'gtlt'
          if filter.value.operator and filter.value.value
            {
              range:
                "#{field}":
                  "#{filter.value.operator}": filter.value.value
            }
        when 'gtZero'
          {
            range:
              "#{field}":
                gt: 0
          }
        when 'list'
          {
            bool:
              must: _filter _map filter.value, (value, key) ->
                if value
                  match: "#{key}": value
          }
        when 'listBooleanAnd', 'iconListBooleanAnd'
          {
            bool:
              must: _filter _map filter.value, (value, key) ->
                if value
                  match: "#{field}.#{key}": true
          }
        when 'listBooleanOr'
          {
            bool:
              should: _filter _map filter.value, (value, key) ->
                if value
                  match: "#{field}.#{key}": true
          }
        when 'fieldList'
          {
            bool:
              should: _filter _map filter.value, (value, key) ->
                if value
                  match: "#{field}": key
          }
        when 'booleanArray'
          withValues = _filter(fieldFilters, 'value')

          {
            # there's potentially a cleaner way to do this?
            bool:
              should: _map withValues, ({value, arrayValue, valueFn}) ->
                # if subtypes are specified
                if typeof value is 'object'
                  bool:
                    must: [
                      {match: "#{field}": arrayValue}
                      bool:
                        should: valueFn value
                    ]
                else
                  {match: "#{field}": arrayValue}

            }

    filter


module.exports = new SearchFiltersService()
