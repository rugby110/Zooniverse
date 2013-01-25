window.zooniverse ?= {}

EventEmitter = window.zooniverse.EventEmitter || require '../lib/event-emitter'
ProxyFrame = window.zooniverse.ProxyFrame || require './proxy-frame'
$ = window.jQuery

id = -1

class Api extends EventEmitter
  @current: null

  project: '.'

  headers: {}
  proxyFrame: null

  constructor: ({@project, host, path, loadTimeout} = {}) ->
    @proxyFrame = new ProxyFrame {host, path, loadTimeout}
    @select()

  request: (type, url, data, done, fail) ->
    if typeof data is 'function'
      [fail, done, data] = [done, data, null]

      @trigger 'request', [type, url, data]
    @proxyFrame.send {type, url, data, @headers}, done, fail

  get: ->
    window.req = @request 'get', arguments...

  getJSON: ->
    @request 'getJSON', arguments...

  post: ->
    @request 'post', arguments...

  put: ->
    @request 'put', arguments...

  delete: ->
    @request 'delete', arguments...

  select: ->
    @trigger 'select'
    @constructor.current = @

window.zooniverse.Api = Api
module?.exports = Api