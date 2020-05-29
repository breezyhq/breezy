import * as _ from 'lodash-es'

import config from '../config'

# TODO: need to convert to graphql before this will work

export default class EntityUser
  namespace: 'entityUsers'

  constructor: ({@auth}) -> null

  addRoleByEntityIdAndUserId: (entityId, userId, roleId) =>
    @auth.call "#{@namespace}.addRoleByEntityIdAndUserId", {
      userId, entityId, roleId
    }, {invalidateAll: true}

  removeRoleByEntityIdAndUserId: (entityId, userId, roleId) =>
    @auth.call "#{@namespace}.removeRoleByEntityIdAndUserId", {
      userId, entityId, roleId
    }, {invalidateAll: true}

  getByEntityIdAndUserId: (entityId, userId) =>
    @auth.stream "#{@namespace}.getByEntityIdAndUserId", {entityId, userId}

  getTopByEntityId: (entityId) =>
    @auth.stream "#{@namespace}.getTopByEntityId", {entityId}

  getMeSettingsByEntityId: (entityId) =>
    @auth.stream "#{@namespace}.getMeSettingsByEntityId", {entityId}

  getOnlineCountByEntityId: (entityId) =>
    @auth.stream "#{@namespace}.getOnlineCountByEntityId", {entityId}

  updateMeSettingsByEntityId: (entityId, {globalNotifications}) =>
    @auth.call "#{@namespace}.updateMeSettingsByEntityId", {
      entityId, globalNotifications
    }, {invalidateAll: true}

  updateMeSettingsByEntityIdAndChannelId: ({entityId, channelId, diff}) =>
    @auth.call "#{@namespace}.updateMeSettingsByEntityIdAndChannelId", {
      entityId, channelId, diff
    }, {invalidateAll: true}

  hasPermission: ({meEntityUser, me, permissions, channelId, roles}) ->
    roles ?= meEntityUser?.roles
    isGlobalModerator = me?.flags?.isModerator or me?.email is 'austinhallock@gmail.com'
    isGlobalModerator or _.every permissions, (permission) ->
      _.find roles, (role) ->
        channelPermissions = channelId and role.channelPermissions?[channelId]
        globalPermissions = role.globalPermissions
        permissions = _.defaults(
          channelPermissions, globalPermissions, config.DEFAULT_PERMISSIONS
        )
        permissions[permission]
