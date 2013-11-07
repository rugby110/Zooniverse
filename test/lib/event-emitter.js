// Generated by CoffeeScript 1.6.3
(function() {
  var EventEmitter, sinon,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  EventEmitter = zooniverse.EventEmitter;

  sinon = window.sinon;

  describe('EventEmitter', function() {
    describe('the class', function() {
      beforeEach(function() {
        var _ref;
        this.ExtendedClass = (function(_super) {
          __extends(ExtendedClass, _super);

          function ExtendedClass() {
            _ref = ExtendedClass.__super__.constructor.apply(this, arguments);
            return _ref;
          }

          return ExtendedClass;

        })(EventEmitter);
        return this.spy = sinon.spy();
      });
      it('can bind and trigger events', function() {
        var _this = this;
        this.ExtendedClass.on('foo', function() {
          var args, e;
          e = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return _this.spy.apply(_this, args);
        });
        this.ExtendedClass.trigger('foo', ['bar']);
        return expect(this.spy).to.have.been.calledWith('bar');
      });
      it('it can remove events', function() {
        this.ExtendedClass.on('foo', this.spy);
        this.ExtendedClass.off('foo', this.spy);
        this.ExtendedClass.trigger('foo');
        return expect(this.spy).not.to.have.been.called;
      });
      return it('it can bind an event once', function() {
        var _this = this;
        this.ExtendedClass.one('foo', function() {
          var args, e;
          e = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return _this.spy.apply(_this, args);
        });
        this.ExtendedClass.trigger('foo', 'bar');
        this.ExtendedClass.trigger('foo', 'boo');
        this.ExtendedClass.trigger('foo', 'far');
        expect(this.spy).to.have.been.calledOnce;
        return expect(this.spy).to.have.been.calledWith('bar');
      });
    });
    return describe('the instance', function() {
      beforeEach(function() {
        var _ref;
        this.ExtendedClass = (function(_super) {
          __extends(ExtendedClass, _super);

          function ExtendedClass() {
            _ref = ExtendedClass.__super__.constructor.apply(this, arguments);
            return _ref;
          }

          return ExtendedClass;

        })(EventEmitter);
        this.instance = new this.ExtendedClass;
        return this.spy = sinon.spy();
      });
      it('can bind and trigger events', function() {
        var _this = this;
        this.instance.on('foo', function() {
          var args, e;
          e = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return _this.spy.apply(_this, args);
        });
        this.instance.trigger('foo', ['bar']);
        return expect(this.spy).to.have.been.calledWith('bar');
      });
      it('passes triggers up to its class', function() {
        var _this = this;
        this.ExtendedClass.on('foo', function() {
          var args, e;
          e = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return _this.spy.apply(_this, args);
        });
        this.instance.trigger('foo', ['bar']);
        return expect(this.spy).to.have.been.calledWith(this.instance, 'bar');
      });
      it('it can remove events', function() {
        this.instance.on('foo', this.spy);
        this.instance.off('foo', this.spy);
        this.instance.trigger('foo', ['bar']);
        return expect(this.spy).not.to.have.been.calledWith('bar');
      });
      it('it can bind an event once', function() {
        var _this = this;
        this.instance.one('foo', function() {
          var args, e;
          e = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return _this.spy.apply(_this, args);
        });
        this.instance.trigger('foo', ['bar']);
        this.instance.trigger('foo', ['boo']);
        this.instance.trigger('foo', ['far']);
        expect(this.spy).to.have.been.calledOnce;
        return expect(this.spy).to.have.been.calledWith('bar');
      });
      return it('no longer functions once destroyed', function() {
        this.instance.on('foo', this.spy);
        this.instance.destroy();
        this.instance.trigger('foo');
        return expect(this.spy).not.to.have.been.called;
      });
    });
  });

}).call(this);
