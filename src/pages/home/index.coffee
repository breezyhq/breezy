z = require 'zorium'

$spinner = require '../../components/spinner'
config = require '../../config'

if window?
  require './index.styl'

module.exports = $homePage = ({model, router, requests, serverData, entity}) ->
  z '.p-home',
    $spinner
