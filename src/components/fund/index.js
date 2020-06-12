import { z, classKebab, useContext, useMemo, useStream } from 'zorium'
import * as _ from 'lodash-es'
import * as Rx from 'rxjs'
import * as rx from 'rxjs/operators'

import $tapTabs from 'frontend-shared/components/tap_tabs'

import $fundAtAGlance from '../fund_at_a_glance'
import $fundOverview from '../fund_overview'
import $fundGrants from '../fund_grants'
import $fundPersons from '../fund_persons'
import $fundApplicationInfo from '../fund_application_info'
import $fund990s from '../fund_990s'
import context from '../../context'

if (typeof window !== 'undefined') { require('./index.styl') }

const TABS = [
  {
    slug: 'overview',
    langKey: 'fund.tabOverview',
    $el: $fundOverview
  },
  {
    slug: 'grants',
    langKey: 'fund.tabGrants',
    $el: $fundGrants
  },
  {
    slug: 'persons',
    langKey: 'fund.tabPersons',
    $el: $fundPersons
  },
  {
    slug: 'application-info',
    langKey: 'fund.tabApplicationInfo',
    $el: $fundApplicationInfo
  },
  {
    slug: '990s',
    langKey: 'fund.tab990s',
    $el: $fund990s
  }
]

export default function $fund (props) {
  const { placeholderNameStream, irsFundStream, tabStream } = props
  const { lang, router } = useContext(context)

  const { selectedIndexStreams } = useMemo(() => {
    const selectedIndexStreams = new Rx.ReplaySubject(1)
    selectedIndexStreams.next(
      tabStream.pipe(rx.map((tab) => {
        let index = _.findIndex(TABS, { slug: tab })
        if (index === -1) {
          index = 0
        }
        return index
      }))
    )
    return { selectedIndexStreams }
  }, [])

  let { irsFund, selectedIndex } = useStream(() => ({
    irsFund: irsFundStream,
    selectedIndex: selectedIndexStreams.pipe(rx.switchAll())
  }))

  const tabs = _.map(TABS, tab =>
    _.defaults({
      name: lang.get(tab.langKey),
      route: router.getFund(irsFund, tab.slug)
    }, tab)
  )

  selectedIndex = selectedIndex || 0

  const selectedTab = tabs[selectedIndex]

  return z('.z-fund', {
    className: classKebab({
      scrollFitContent: !(['grants', 'persons'].includes(selectedTab.slug))
    })
  }, [
    z('.quick-info', [
      z($fundAtAGlance, { placeholderNameStream, irsFund })
    ]),
    z('.content', [
      z('.inner', [
        z($tapTabs, {
          selectedIndexStreams, tabs, tabProps: { irsFund, irsFundStream }
        })
      ])
    ])
  ])
}
