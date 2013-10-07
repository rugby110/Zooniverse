// Generated by CoffeeScript 1.6.3
(function() {
  var $, e, favorites, i, key, messages, name, pair, params, randomImageUrl, recents, subjects, users, value, _i, _len, _ref, _ref1;

  $ = window.jQuery;

  params = {};

  _ref = location.search.slice(1).split('&');
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    pair = _ref[_i];
    _ref1 = pair.split('='), key = _ref1[0], value = _ref1[1];
    if (value == null) {
      continue;
    }
    params[key] = (function() {
      try {
        return JSON.parse(value);
      } catch (_error) {
        e = _error;
        return value;
      }
    })();
  }

  randomImageUrl = function(size) {
    var hex;
    if (size == null) {
      size = '1x1';
    }
    hex = ('00000' + (Math.floor(Math.random() * 0x1000000)).toString(16)).slice(-6);
    return "//placehold.it/" + size + "/" + hex + ".png";
  };

  subjects = (function() {
    var _j, _ref2, _results;
    _results = [];
    for (i = _j = 0, _ref2 = params.subjects || 50; 0 <= _ref2 ? _j < _ref2 : _j > _ref2; i = 0 <= _ref2 ? ++_j : --_j) {
      _results.push({
        id: "SUBJECT_" + i,
        zooniverse_id: "SUBJECT_" + i + "_ZOONIVERSE_ID",
        location: {
          standard: randomImageUrl()
        },
        coords: [0, 0],
        metadata: {},
        workflow_ids: ['WORKFLOW_ID']
      });
    }
    return _results;
  })();

  recents = (function() {
    var _j, _ref2, _results;
    _results = [];
    for (i = _j = 0, _ref2 = params.recents || subjects.length; 0 <= _ref2 ? _j < _ref2 : _j > _ref2; i = 0 <= _ref2 ? ++_j : --_j) {
      _results.push({
        id: "RECENT_" + i,
        subjects: [subjects[i]],
        project_id: 'PROJECT_ID',
        workflow_id: subjects[i].workflow_ids[0],
        created_at: (new Date).toUTCString()
      });
    }
    return _results;
  })();

  favorites = (function() {
    var _j, _ref2, _results;
    _results = [];
    for (i = _j = 0, _ref2 = params.recents || 5; 0 <= _ref2 ? _j < _ref2 : _j > _ref2; i = 0 <= _ref2 ? ++_j : --_j) {
      _results.push({
        id: "FAVORITE_" + i,
        subjects: [subjects[i]],
        project_id: 'PROJECT_ID',
        workflow_id: subjects[i].workflow_ids[0],
        created_at: (new Date).toUTCString()
      });
    }
    return _results;
  })();

  users = (function() {
    var _j, _len1, _ref2, _results;
    _ref2 = ['blinky', 'pinky', 'inky', 'clyde'];
    _results = [];
    for (i = _j = 0, _len1 = _ref2.length; _j < _len1; i = ++_j) {
      name = _ref2[i];
      _results.push({
        success: true,
        id: name,
        zooniverse_id: "" + (name.toUpperCase()) + "_ZID",
        api_key: "" + (name.toUpperCase()) + "_API_KEY",
        name: name,
        password: name,
        avatar: randomImageUrl('64x64'),
        project: {
          classification_count: recents.length,
          tutorial_done: false
        }
      });
    }
    return _results;
  })();

  messages = (function() {
    var _j, _ref2, _results;
    _results = [];
    for (i = _j = 0, _ref2 = params.messages || 5; 0 <= _ref2 ? _j < _ref2 : _j > _ref2; i = 0 <= _ref2 ? ++_j : --_j) {
      _results.push({});
    }
    return _results;
  })();

  window.database = {
    subjects: subjects,
    recents: recents,
    users: users,
    messages: messages,
    currentUser: null,
    post: function(model, values) {
      var newRecord;
      newRecord = $.extend({}, this[model][0], values);
      this[model].push(newRecord);
      return $.extend({}, newRecord);
    },
    get: function(model, query, _arg) {
      var byId, matches, miss, page, param, record, splice, _ref2;
      if (query == null) {
        query = 10;
      }
      _ref2 = _arg != null ? _arg : {}, splice = _ref2.splice, page = _ref2.page;
      if (page == null) {
        page = 1;
      }
      if (typeof query === 'string') {
        query = {
          id: query
        };
        byId = true;
      }
      if (typeof query === 'number') {
        if (splice) {
          return this[model].slice((page - 1) * query).splice(0, query);
        } else {
          return this[model].slice((page - 1) * query).slice(0, query);
        }
      } else {
        matches = (function() {
          var _j, _len1, _ref3, _results;
          _ref3 = this[model];
          _results = [];
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            record = _ref3[_j];
            miss = false;
            for (param in query) {
              value = query[param];
              if (record[param] !== value) {
                miss = true;
                break;
              }
            }
            if (miss) {
              continue;
            }
            _results.push(record);
          }
          return _results;
        }).call(this);
        if (matches.length === 0) {
          return {
            success: false
          };
        } else {
          if (byId) {
            return $.extend({
              success: record != null
            }, record);
          } else {
            return matches;
          }
        }
      }
    },
    "delete": function(model, id) {
      var item, _j, _len1, _ref2;
      _ref2 = this[model];
      for (i = _j = 0, _len1 = _ref2.length; _j < _len1; i = ++_j) {
        item = _ref2[i];
        if (item.id === id) {
          return this[model].splice(i, 1);
        }
      }
    }
  };

  window.database.currentUser = window.database.get('users', 'clyde');

}).call(this);
