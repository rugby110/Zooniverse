// Generated by CoffeeScript 1.6.3
(function() {
  var $, BaseController, EventEmitter, nextId, _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  EventEmitter = window.zooniverse.EventEmitter || require('../lib/event-emitter');

  $ = window.jQuery;

  nextId = 0;

  BaseController = (function(_super) {
    __extends(BaseController, _super);

    BaseController.prototype.el = null;

    BaseController.prototype.tagName = 'div';

    BaseController.prototype.className = '';

    BaseController.prototype.template = null;

    BaseController.prototype.id = '';

    BaseController.prototype.events = null;

    BaseController.prototype.elements = null;

    function BaseController(params) {
      var property, value;
      if (params == null) {
        params = {};
      }
      BaseController.__super__.constructor.apply(this, arguments);
      for (property in params) {
        if (!__hasProp.call(params, property)) continue;
        value = params[property];
        if (property in this) {
          this[property] = value;
        }
      }
      this.id || (this.id = "controller_" + nextId);
      nextId += 1;
      if (this.el == null) {
        this.el = document.createElement(this.tagName);
      }
      this.el = $(this.el);
      this.renderTemplate();
      this.delegateEvents();
      this.nameElements();
    }

    BaseController.prototype.renderTemplate = function() {
      if (this.className) {
        this.el.addClass(this.className);
      }
      if (!this.el.html()) {
        if (typeof this.template === 'string') {
          this.el.html(this.template);
        }
        if (typeof this.template === 'function') {
          return this.el.html(this.template(this));
        }
      }
    };

    BaseController.prototype.nameElements = function() {
      var name, selector, _ref, _results;
      if (this.elements != null) {
        _ref = this.elements;
        _results = [];
        for (selector in _ref) {
          name = _ref[selector];
          _results.push(this[name] = this.el.find(selector));
        }
        return _results;
      }
    };

    BaseController.prototype.delegateEvents = function() {
      var eventString, method, _ref, _results,
        _this = this;
      this.el.off("." + this.id);
      if (this.events != null) {
        _ref = this.events;
        _results = [];
        for (eventString in _ref) {
          method = _ref[eventString];
          _results.push((function(eventString, method) {
            var autoPreventDefault, eventName, selector, _ref1;
            _ref1 = eventString.split(/\s+/), eventName = _ref1[0], selector = 2 <= _ref1.length ? __slice.call(_ref1, 1) : [];
            selector = selector.join(' ');
            if (eventName.slice(-1) === '*') {
              eventName = eventName.slice(0, -1);
              autoPreventDefault = true;
            }
            if (typeof method === 'string') {
              method = _this[method];
            }
            return _this.el.on("" + eventName + "." + _this.id, selector, function(e) {
              if (autoPreventDefault) {
                e.preventDefault();
              }
              return method.call.apply(method, [_this].concat(__slice.call(arguments)));
            });
          })(eventString, method));
        }
        return _results;
      }
    };

    BaseController.prototype.destroy = function() {
      var propertyName, selector, _ref;
      if (this.elements != null) {
        _ref = this.elements;
        for (selector in _ref) {
          propertyName = _ref[selector];
          this[propertyName] = null;
        }
      }
      this.el.off();
      this.el.empty();
      this.el.remove();
      return BaseController.__super__.destroy.apply(this, arguments);
    };

    return BaseController;

  })(EventEmitter);

  window.zooniverse.controllers.BaseController = BaseController;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = BaseController;
  }

}).call(this);
