export default class IrsOrg {
  constructor ({ auth }) {
    this.getByEin = this.getByEin.bind(this)
    this.search = this.search.bind(this)
    this.auth = auth
  }

  getByEin (ein) {
    return this.auth.stream({
      query: `
        query IrsOrgGetByEin($ein: String!) {
          irsOrg(ein: $ein) {
            ein, name, city, state, assets, mission, website,
            employeeCount, volunteerCount,
            yearlyStats {
              years { year, assets, employeeCount, volunteerCount }
            },
          }
        }`,
      variables: { ein },
      pull: 'irsOrg'
    })
  }

  search ({ query, sort, limit }) {
    return this.auth.stream({
      query: `
        query IrsOrgSearch($query: ESQuery!, $sort: JSON, $limit: Int) {
          irsOrgs(query: $query, sort: $sort, limit: $limit) {
            totalCount,
            nodes {
              ein, nteecc, name, city, state, assets,
              employeeCount, volunteerCount
            }
          }
        }`,
      variables: { query, sort, limit },
      pull: 'irsOrgs'
    })
  }

  isEin (str) {
    return !isNaN(parseInt(str))
  }
}
