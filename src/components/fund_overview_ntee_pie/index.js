import {z, useContext} from 'zorium'
import * as _ from 'lodash-es'

import FormatService from 'frontend-shared/services/format'

import $chartPie from '../chart_pie'
import context from '../../context'
import {nteeColors} from '../../colors'

if window?
  require './index.styl'

LEGEND_COUNT = 5

export default $fundOverviewNteePie = ({irsFund}) ->
  {lang} = useContext context

  # TODO: useMemo?
  nteeMajors = _.orderBy irsFund?.fundedNteeMajors, 'count', 'desc'
  pieNteeMajors = _.reduce nteeMajors, (obj, {count, percent, key}) ->
    if percent > 7
      obj[key] = {count, percent, key}
    else
      obj.rest ?= {count: 0, percent: 0, key: 'rest'}
       # FIXME: find and add to 'rest'
      obj.rest.count += count
      obj.rest.percent += percent
    obj
  , {}
  data = _.map pieNteeMajors, ({count, percent, key}) ->
    label = if key is 'rest' \
            then lang.get 'general.other' \
            else lang.get "nteeMajor.#{key}"

    color = if key is 'rest' \
            then nteeColors['Z'].graph \
            else nteeColors[key].graph
    {
      id: label
      label: label
      value: count
      percent: percent
      color: color
    }

  colors = _.map data, 'color'

  z '.z-fund-overview-ntee-pie',
    z $chartPie, {data, colors}
    z '.legend',
      _.map _.take(nteeMajors, LEGEND_COUNT), ({count, percent, key}) ->
        z '.legend-item',
          z '.color', {
            style:
              background: nteeColors[key].graph
          }
          z '.info',
            z '.ntee', lang.get "nteeMajor.#{key}"
            # z '.dollars', FormatService.abbreviateDollar value
          z '.percent', "#{Math.round(percent)}%"