const DEFAULT_FIELDS = 'id, slug'

export default class Entity {
  constructor ({ auth }) {
    this.auth = auth
  }

  getAll = () => {
    return this.auth.stream({
      query: `query EntityGetAll { entities { ${DEFAULT_FIELDS} }`
    })
  }

  getAllByUserId = (userId) => {
    return this.auth.stream({
      query: `
        query EntityGetallByUserId($userId: ID!) {
          entities(userId: $userId) {
            ${DEFAULT_FIELDS}
          }
        }`,
      variables: { userId }
    })
  }

  getById = (id) => {
    return this.auth.stream({
      query: `query EntityGetById($slug: ID!) { entity(id: $id) { ${DEFAULT_FIELDS} }`,
      variables: { id }
    })
  }

  getBySlug = (slug) => {
    return this.auth.stream({
      query: `query EntityGetBySlug($slug: String!) { entity(slug: $slug) { ${DEFAULT_FIELDS} }`,
      variables: { slug }
    })
  }

  getDefaultEntity = () => {
    return this.auth.stream({
      query: `query EntityGetDefault { entity { ${DEFAULT_FIELDS} } }`
    })
  }

  joinById = (id) => {
    return this.auth.call({
      query: `
        mutation EntityJoinById($id: ID!) {
          entityJoinById(id: $id: entity { ${DEFAULT_FIELDS} }
        }`,
      variables: { id }
    }, { invalidateAll: true })
  }

  leaveById = (id) => {
    return this.auth.call({
      query: `
        mutation EntityLeaveById($id: ID!) {
          entityLeaveById(id: $id: entity { ${DEFAULT_FIELDS} }
        }`,
      variables: { id }
    }, { invalidateAll: true })
  }

  getDisplayName = (entity) => {
    return entity?.name || 'Nameless'
  }

  getPath = (entity, key, { replacements, router, language }) => {
    if (!router) {
      return '/'
    }
    const subdomain = router.getSubdomain()

    if (replacements == null) { replacements = {} }
    replacements.entityId = entity?.slug || entity?.id

    let path = router.get(key, replacements, { language })
    if (subdomain === entity?.slug) {
      path = path.replace(`/${entity?.slug}`, '')
    }
    return path
  }

  goPath = (entity, key, { replacements, router, language }, options) => {
    const subdomain = router.getSubdomain()

    if (replacements == null) { replacements = {} }
    replacements.entityId = entity?.slug || entity?.id

    let path = router.get(key, replacements, { language })
    if (subdomain === entity?.slug) {
      path = path.replace(`/${entity?.slug}`, '')
    }
    return router.goPath(path, options)
  }
}
