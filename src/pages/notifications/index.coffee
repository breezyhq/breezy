{z, useContext} = require 'zorium'
RxObservable = require('rxjs/Observable').Observable

import $appBar from 'frontend-shared/components/app_bar'
import $buttonMenu from 'frontend-shared/components/button_menu'
import $notifications from 'frontend-shared/components/notifications'

import config from '../../config'
import context from '../../context'
import colors from '../../colors'

if window?
  require './index.styl'

module.exports = $notificationsPage = ->
  {lang} = useContext context

  z '.p-notifications',
    z $appBar, {
      title: lang.get 'general.notifications'
      style: 'primary'
      $topLeftButton:
        z $buttonMenu, {color: colors.$header500Icon}
    }
    z $notifications
