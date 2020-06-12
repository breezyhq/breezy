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
            name, ein, employeeCount, assets
          }
        }`,
      variables: { ein },
      pull: 'irsOrg'
    })
  }

  search ({ query, limit }) {
    return this.auth.stream({
      query: `
        query IrsOrgSearch($query: ESQuery!) {
          irsOrgs(query: $query) {
            nodes { name, ein }
          }
        }`,
      variables: { query },
      pull: 'irsOrgs'
    })
  }

  isEin (str) {
    return !isNaN(parseInt(str))
  }
}
