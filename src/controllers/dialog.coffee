window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
template = zooniverse.views.Dialog || require '../views/dialog'

class Dialog extends BaseController
  content: ''

  className: 'zooniverse-dialog'
  template: template

  events:
    'click button[name="close-dialog"]': 'hide'
    'keydown': 'onKeyDown'

  elements:
    '.dialog': 'contentContainer'

  constructor: ->
    super
    @hide()

    @contentContainer.append @content

    @el.appendTo document.body

  onKeyDown: ({which}) ->
    @hide() if which is 27 # ESC

  show: ->
    @el.removeClass 'hidden'
    @contentContainer.find('input, textarea, select').first().focus()

  hide: ->
    @el.addClass 'hidden'

window.zooniverse.controllers.Dialog = Dialog
module?.exports = Dialog