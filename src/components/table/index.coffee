{z, classKebab} = require 'zorium'
_map = require 'lodash/map'
_sumBy = require 'lodash/sumBy'

if window?
  require './index.styl'

# if it's lightweight enough, for long tables we could use
# https://github.com/mckervinc/react-fluid-table
# so i'm using same api to make for easy replacement
module.exports = $table = ({data, columns, onRowClick}) ->
  getStyle = ({width, isFlex}) ->
    if isFlex
      {minWidth: "#{width}px", flex: 1}
    else if width
      {width: if width then "#{width}px"}

  z '.z-table', {
    className: classKebab {hasRowClick: onRowClick}
  },
    z '.thead', {
      style:
        minWidth: "#{_sumBy(columns, 'width')}px"
    },
      _map columns, ({name, width, isFlex}) ->
        z '.th', {
          style: getStyle {width, isFlex}
        }, name
    z '.tbody',
      _map data, (row, i) ->
        z '.tr', {
          onclick: (e) ->
            onRowClick e, i
        },
          _map columns, ({key, name, width, isFlex, content}) ->
            z '.td', {
              style: getStyle {width, isFlex}
            },
              if content
                content {row}
              else
                row[key]
