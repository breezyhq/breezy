/* eslint-disable
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
import { z, useContext, useStream } from 'zorium'

import $appBar from 'frontend-shared/components/app_bar'
import $buttonMenu from 'frontend-shared/components/button_menu'
import $spinner from 'frontend-shared/components/spinner'

// import colors from '../../colors'
import context from '../../context'

if (typeof window !== 'undefined') { require('./index.styl') }

// generic page that gets loaded from cache for any page w/o a specific shell
export default function $shellPage ({ requestsStream }) {
  const { model } = useContext(context)
  // subscribe so they're in exoid cache
  const obj = useStream(() => ({
    me: model.user.getMe()
  }))

  return z('.p-shell',
    z($appBar, {
      title: '',
      style: 'primary'
      // $topLeftButton:
      //   z $buttonMenu, {color: colors.$header500Icon}
    }),
    z('.spinner',
      z($spinner))
  )
}
