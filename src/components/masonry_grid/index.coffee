{z, useStream} = require 'zorium'
_map = require 'lodash/map'
_flatten = require 'lodash/flatten'
_range = require 'lodash/range'
_filter = require 'lodash/filter'

if window?
  require './index.styl'

module.exports = MasonryGrid = ({model, $elements, columnCounts}) ->
  {breakpoint} = useStream ->
    breakpoint: model.window.getBreakpoint()

  columnCount = columnCounts[breakpoint or 'mobile'] or columnCounts['mobile']
  if columnCount is 1
    $columns = [$elements]
  else
    $columns = _map _range(columnCount), (columnIndex) ->
      _filter $elements, (element, i) ->
        i % columnCount is columnIndex

  z '.z-masonry-grid', {
    style:
      columnCount: columnCount
      webkitColumnCount: columnCount
  },
    _map $columns, ($els) ->
      z '.column', {
        style:
          width: "#{100 / columnCount}%"
      },
        _map $els, ($el) ->
          z '.row',
            $el
