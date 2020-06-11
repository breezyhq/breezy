# TODO: need to convert to graphql before this will work

export default class PushToken
  constructor: ({@auth, @token}) -> null

  upsert: ({tokenStr, sourceType, deviceId} = {}) =>
    @auth.call "#{@namespace}.upsert", {tokenStr, sourceType, deviceId}

  setCurrentPushToken: (token) =>
    @token.next token

  getCurrentPushToken: =>
    @token