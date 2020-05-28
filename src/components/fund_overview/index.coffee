{z, useContext} = require 'zorium'

import $fundOverviewLineChart from '../fund_overview_line_chart'
import $fundOverviewNteePie from '../fund_overview_ntee_pie'
import $fundOverviewFundingMap from '../fund_overview_funding_map'
import context from '../../context'

if window?
  require './index.styl'

module.exports = $fundOverview = ({irsFund}) ->
  {lang} = useContext context

  z '.z-fund-overview',
    z '.analytics',
      z '.block',
        z '.head',
          z '.title', lang.get 'fund.grantsPerYear'
        z $fundOverviewLineChart, {irsFund}
    z '.grid',
      z '.block.pie',
        z '.head',
          z '.title', lang.get 'fundOverview.fundedNtee'
        z $fundOverviewNteePie, {irsFund}
      z '.block.map',
        z '.head',
          z '.title', lang.get 'fundOverview.fundingMap'
        z $fundOverviewFundingMap, {irsFund}
