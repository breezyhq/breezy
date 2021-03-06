import { z, useContext, useMemo, useStream } from 'zorium'
import * as Rx from 'rxjs'
import * as rx from 'rxjs/operators'

import $dialog from 'frontend-shared/components/dialog'
import $button from 'frontend-shared/components/button'
import { streams } from 'frontend-shared/services/obs'

import $filterContent from '../filter_content'
import context from '../../context'

if (typeof window !== 'undefined' && window !== null) {
  require('./index.styl')
}

export default function $filterDialog ({ filter, onClose }) {
  const { lang } = useContext(context)

  var { valueStreams, resetValueStream } = useMemo(function () {
    valueStreams = streams(filter.valueStreams.stream)
    return {
      valueStreams,
      resetValueStream: new Rx.BehaviorSubject('')
    }
  }
  , [])

  const { resetValue, filterValue, hasValue } = useStream(() => ({
    resetValue: resetValueStream,
    filterValue: filter.valueStreams.stream,

    hasValue: valueStreams.pipe(
      rx.switchAll(),
      rx.map(value => Boolean(value)),
      rx.distinctUntilChanged((a, b) => a === b) // don't rerender a bunch
    )
  }))

  return z('.z-filter-dialog', [
    z($dialog, {
      onClose,
      $title: filter?.title || filter?.name,
      $content:
        z('.z-filter-dialog_content', [
          z('.content', [
            z($filterContent, {
              filter, filterValue, valueStreams, resetValue
            })
          ])
        ]),
      $actions:
        z('.z-filter-dialog_actions', [
          z('.reset', [
            hasValue &&
              z($button, {
                text: lang.get('general.reset'),
                onclick: () => {
                  filter.valueStreams.next(Rx.of(null))
                  valueStreams.next(Rx.of(null))
                  return resetValueStream.next(Date.now())
                }
              })
          ]),
          z('.save', [
            z($button, {
              text: lang.get('general.save'),
              isPrimary: true,
              onclick: () => {
                filter.valueStreams.next(valueStreams.stream)
                resetValueStream.next(Date.now())
                return onClose()
              }
            })
          ])
        ])
    })
  ])
};
