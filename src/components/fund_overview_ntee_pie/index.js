// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
let $fundOverviewNteePie;
import {z, useContext} from 'zorium';
import * as _ from 'lodash-es';

import FormatService from 'frontend-shared/services/format';

import $chartPie from '../chart_pie';
import context from '../../context';
import {nteeColors} from '../../colors';

if (typeof window !== 'undefined' && window !== null) {
  require('./index.styl');
}

const LEGEND_COUNT = 5;

export default $fundOverviewNteePie = function({irsFund}) {
  const {lang} = useContext(context);

  // TODO: useMemo?
  const nteeMajors = _.orderBy(irsFund?.fundedNteeMajors, 'count', 'desc');
  const pieNteeMajors = _.reduce(nteeMajors, function(obj, {count, percent, key}) {
    if (percent > 7) {
      obj[key] = {count, percent, key};
    } else {
      if (obj.rest == null) { obj.rest = {count: 0, percent: 0, key: 'rest'}; }
       // FIXME: find and add to 'rest'
      obj.rest.count += count;
      obj.rest.percent += percent;
    }
    return obj;
  }
  , {});
  const data = _.map(pieNteeMajors, function({count, percent, key}) {
    const label = key === 'rest' 
            ? lang.get('general.other') 
            : lang.get(`nteeMajor.${key}`);

    const color = key === 'rest' 
            ? nteeColors['Z'].graph 
            : nteeColors[key].graph;
    return {
      id: label,
      label,
      value: count,
      percent,
      color
    };
});

  const colors = _.map(data, 'color');

  return z('.z-fund-overview-ntee-pie',
    z($chartPie, {data, colors}),
    z('.legend',
      _.map(_.take(nteeMajors, LEGEND_COUNT), ({count, percent, key}) => z('.legend-item',
        z('.color', {
          style: {
            background: nteeColors[key].graph
          }
        }),
        z('.info',
          z('.ntee', lang.get(`nteeMajor.${key}`))),
          // z '.dollars', FormatService.abbreviateDollar value
        z('.percent', `${Math.round(percent)}%`)))
    )
  );
};
