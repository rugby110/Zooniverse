User = require '../models/user'
Controller = require './controller'

class TopBar extends Controller
  events: 
    'click input[name="login"]'   : 'logIn'
    'click input[name="signup"]'  : 'signUp'
    'click a.top-bar-button'      : 'toggleDisplay'

  constructor: ->
    @app ||= "test"
    @appName ||= "Test Name"
    User.project = @app

  elements:
    'input[name="username"]'        : 'username'
    'input[name="password"]'        : 'password'
    '.zooniverse-top-bar-container' : 'container'

  logIn: (e) =>
    login = User.login
      username: @username.val()
      password: @password.val()

  signUp: (e) =>
    alert('sign up')

  toggleDisplay: (e) =>
    @container.toggleClass 'visible'
