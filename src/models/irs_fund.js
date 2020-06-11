/* eslint-disable
    no-unused-expressions,
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
import config from '../config'

export default class IrsFund {
  constructor ({ auth }) { this.getByEin = this.getByEin.bind(this); this.search = this.search.bind(this); this.auth = auth; null }

  getByEin (ein) {
    return this.auth.stream({
      query: `\
query IrsFundGetByEin($ein: String!) {
  irsFund(ein: $ein) {
    ein, name, city, state, assets, mission, website,
    yearlyStats {
      years { year, assets, grantSum, officerSalaries }
    },
    lastYearStats {
      grants, grantMedian, grantSum, revenue, expenses
    },
    applicantInfo {
      acceptsUnsolicitedRequests, recipientName,
      requirements, deadlines, restrictions,
      address {
        street1, street2, postalCode, city, state, countryCode
      }
    }
    fundedNteeMajors { key, count, percent, sum, sumPercent }
    fundedStates { key, count, percent, sum, sumPercent }
  }
}\
`,
      variables: { ein },
      pull: 'irsFund'
    })
  }

  search ({ query, sort, limit }) {
    console.log('search')
    return this.auth.stream({
      query: `\
query IrsFundSearch($query: ESQuery!, $sort: JSON, $limit: Int) {
  irsFunds(query: $query, sort: $sort, limit: $limit) {
    totalCount,
    nodes {
      ein, name, city, state, assets,
      lastYearStats {
        grants, grantMedian, grantSum
      }
      fundedNteeMajors { key, count }
    }
  }
}\
`,
      variables: { query, sort, limit },
      pull: 'irsFunds'
    })
  }
}
