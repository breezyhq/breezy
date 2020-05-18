{z, classKebab, useMemo, useStream} = require 'zorium'
_orderBy = require 'lodash/orderBy'
_map = require 'lodash/map'
_min = require 'lodash/min'
RxReplaySubject = require('rxjs/ReplaySubject').ReplaySubject
RxObservable = require('rxjs/Observable').Observable
require 'rxjs/add/observable/combineLatest'
require 'rxjs/add/observable/of'

$avatar = require '../avatar'
$dropdown = require '../dropdown'
$graph = require '../graph_widget'
FormatService = require '../../services/format'

if window?
  require './index.styl'

module.exports = Org = ({model, router, irsOrgStream}) ->
  {irsOrg990StatsStream, metricValueStreams,
    irsOrg990StatsAndMetricStream} = useMemo ->

    metricValueStreams = new RxReplaySubject 1
    metricValueStreams.next RxObservable.of 'revenue'

    irsOrg990StatsStream = irsOrgStream.switchMap (irsOrg) =>
      if irsOrg
        model.irsOrg990.getStatsByEin irsOrg.ein
      else
        RxObservable.of null

    {
      irsOrg990StatsStream
      metricValueStreams
      irsOrg990StatsAndMetricStream: RxObservable.combineLatest(
        irsOrg990StatsStream, metricValueStreams.switch(), (vals...) -> vals
      )
    }
  , []

  {me, metric, irsOrg, irsPersons, graphData, irsOrg990Stats
    org} = useStream ->
    me: model.user.getMe()
    metric: metricValueStreams.switch()
    graphData: irsOrg990StatsAndMetricStream.map ([stats, metric]) ->
      console.log stats, metric
      minVal = _min(stats?[metric])
      low = if minVal < 0 then minVal else 0

      {
        labels: stats?.years
        series: stats?[metric]
        low: low
      }
    irsOrg: irsOrgStream
    irsOrg990Stats: irsOrg990StatsStream
    irsPersons: irsOrgStream.switchMap (irsOrg) =>
      if irsOrg
        model.irsPerson.getAllByEin irsOrg.ein
        .map (irsPersons) ->
          _orderBy irsPersons, 'compensation', 'desc'
      else
        RxObservable.of null


  console.log 'irsOrg', metric, irsOrg, irsPersons
  console.log 'ORGID', org?.id
  console.log 'USERID', me?.id
  console.log graphData

  z '.z-org',
    z '.g-grid.overflow-visible',
      if irsOrg990Stats and not irsOrg990Stats.has990
        z '.no-990', model.l.get 'org.no990'
      else
        z '.g-cols',
          z '.g-col.g-xs-12.g-md-8',
            z '.box.analytics',
              z '.header',
                model.l.get 'general.analytics'
                z '.metric-dropdown',
                  z $dropdown, {
                    currentText: model.l.get 'org.changeMetric'
                    valueStreams: metricValueStreams
                    options: [
                      {value: 'revenue', text: model.l.get 'metric.revenue'}
                      {value: 'expenses', text: model.l.get 'metric.expenses'}
                      {value: 'net', text: model.l.get 'metric.net'}
                      {value: 'assets', text: model.l.get 'metric.assets'}
                      {value: 'employeeCount', text: model.l.get 'metric.employeeCount'}
                      {value: 'volunteerCount', text: model.l.get 'metric.volunteerCount'}
                    ]
                  }
              z '.content',
                z '.chart-header',
                  model.l.get("metric.#{metric}") or 'Custom metric' # FIXME
                z '.chart',
                  if window? and graphData and graphData.series
                    z $graph, {
                      labels: graphData.labels
                      series: [graphData.series]
                      options:
                        fullWidth: true
                        low: graphData.low
                        showArea: true
                        lineSmooth:
                          $graph.getChartist().Interpolation.monotoneCubic {
                            fillHoles: false
                          }
                        axisY:
                          onlyInteger: true
                          showGrid: true
                          # type: $graph.getChartist().FixedScaleAxis
                          labelInterpolationFnc: (value) ->
                            FormatService.abbreviateNumber value
                        axisX:
                          showLabel: true
                          showGrid: false
                    }
          z '.g-col.g-xs-12.g-md-4',
            z '.box.at-a-glance',
              z '.header',
                model.l.get 'org.atAGlance'
              z '.content',
                z '.top-metrics',
                  z '.metric',
                    z '.value',
                      FormatService.number irsOrg?.employeeCount or 0
                    z '.name',
                      model.l.get 'org.employees'
                  z '.metric',
                    z '.value',
                      '$'
                      FormatService.number irsOrg?.assets
                    z '.name',
                      model.l.get 'org.assets'
                z '.block',
                  z '.title', model.l.get 'general.location'
                  z '.text', FormatService.location irsOrg
                z '.block',
                  z '.title', model.l.get 'general.category'
                  z '.text',
                    model.l.get "nteeMajor.#{irsOrg?.nteecc?.substr(0, 1)}"
                z '.block',
                  z '.title', model.l.get 'general.mission'
                  z '.text.mission', {
                    className: classKebab {
                      isTruncated: irsOrg?.mission?.length > 50
                    }
                  },
                    FormatService.fixAllCaps irsOrg?.mission
                z '.block',
                  z '.title',
                    model.l.get 'org.lastReport', {
                      replacements: {year: irsOrg990Stats?.last?.year}
                    }
                  z '.metrics',
                    z '.metric',
                      z '.value',
                        '$'
                        FormatService.number irsOrg990Stats?.last?.expenses
                      z '.name',
                        model.l.get 'metric.expenses'
                    z '.metric',
                      z '.value',
                        '$'
                        FormatService.number irsOrg990Stats?.last?.revenue
                      z '.name',
                        model.l.get 'metric.revenue'

          z '.g-col.g-xs-12.g-md-5',
            z '.box',
              z '.header',
                model.l.get 'general.people'
              z '.content',
                _map irsPersons, (irsPerson) ->
                  z '.person',
                    z '.avatar',
                      z $avatar, {user: irsPerson}
                    z '.info',
                      z '.name', irsPerson.name
                      z '.title', irsPerson.title
                    z '.right',
                      '$'
                      FormatService.number irsPerson.compensation