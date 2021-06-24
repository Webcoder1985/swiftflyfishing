function(e) {
  var t = {
      url: !1,
      callback: !1,
      target: !1,
      duration: 120,
      on: "mouseover",
      touch: !0,
      onZoomIn: !1,
      onZoomOut: !1,
      magnify: 1
  };
  e.zoom = function(t, n, i, o) {
      var r, s, a, l, c, u, h, d = e(t),
          f = d.css("position"),
          p = e(n);
      return d.css("position", /(absolute|fixed)/.test(f) ? f : "relative"), d.css("overflow", "hidden"), i.style.width = i.style.height = "", e(i).addClass("zoomImg").css({
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
          width: i.width * o,
          height: i.height * o,
          border: "none",
          maxWidth: "none",
          maxHeight: "none"
      }).appendTo(t), {
          init: function() {
              s = d.outerWidth(), r = d.outerHeight(), n === d[0] ? (l = s, a = r) : (l = p.outerWidth(), a = p.outerHeight()), c = (i.width - s) / l, u = (i.height - r) / a, h = p.offset()
          },
          move: function(e) {
              var t = e.pageX - h.left,
                  n = e.pageY - h.top;
              n = Math.max(Math.min(n, a), 0), t = Math.max(Math.min(t, l), 0), i.style.left = t * -c + "px", i.style.top = n * -u + "px"
          }
      }
  }, e.fn.zoom = function(n) {
      return this.each(function() {
          var i, o, r, s = e.extend({}, t, n || {}),
              a = s.target || this,
              l = this,
              c = e(l),
              u = e(a),
              h = document.createElement("img"),
              d = e(h),
              f = "mousemove.zoom",
              p = !1,
              g = !1;
          (s.url || ((i = c.find("img"))[0] && (s.url = i.data("src") || i.attr("src")), s.url)) && (o = u.css("position"), r = u.css("overflow"), c.one("zoom.destroy", function() {
              c.off(".zoom"), u.css("position", o), u.css("overflow", r), d.remove()
          }), h.onload = function() {
              var t = e.zoom(a, l, h, s.magnify);

              function n(n) {
                  t.init(), t.move(n), d.stop().fadeTo(e.support.opacity ? s.duration : 0, 1, !!e.isFunction(s.onZoomIn) && s.onZoomIn.call(h))
              }

              function i() {
                  d.stop().fadeTo(s.duration, 0, !!e.isFunction(s.onZoomOut) && s.onZoomOut.call(h))
              }
              "grab" === s.on ? c.on("mousedown.zoom", function(o) {
                  1 === o.which && (e(document).one("mouseup.zoom", function() {
                      i(), e(document).off(f, t.move)
                  }), n(o), e(document).on(f, t.move), o.preventDefault())
              }) : "click" === s.on ? c.on("click.zoom", function(o) {
                  return p ? void 0 : (p = !0, n(o), e(document).on(f, t.move), e(document).one("click.zoom", function() {
                      i(), p = !1, e(document).off(f, t.move)
                  }), !1)
              }) : "toggle" === s.on ? c.on("click.zoom", function(e) {
                  p ? i() : n(e), p = !p
              }) : "mouseover" === s.on && (t.init(), c.on("mouseenter.zoom", n).on("mouseleave.zoom", i).on(f, t.move)), s.touch && c.on("touchstart.zoom", function(e) {
                  e.preventDefault(), g ? (g = !1, i()) : (g = !0, n(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]))
              }).on("touchmove.zoom", function(e) {
                  e.preventDefault(), t.move(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0])
              }).on("touchend.zoom", function(e) {
                  e.preventDefault(), g && (g = !1, i())
              }), e.isFunction(s.callback) && s.callback.call(h)
          }, h.src = s.url)
      })
  }, e.fn.zoom.defaults = t
}(window.jQuery),
function(e) {
  var t = !1;
  if ("function" == typeof define && define.amd && (define(e), t = !0), "object" == typeof exports && (module.exports = e(), t = !0), !t) {
      var n = window.Cookies,
          i = window.Cookies = e();
      i.noConflict = function() {
          return window.Cookies = n, i
      }
  }
}(function() {
  function e() {
      for (var e = 0, t = {}; e < arguments.length; e++) {
          var n = arguments[e];
          for (var i in n) t[i] = n[i]
      }
      return t
  }
  return function t(n) {
      function i(t, o, r) {
          var s;
          if ("undefined" != typeof document) {
              if (arguments.length > 1) {
                  if ("number" == typeof(r = e({
                          path: "/"
                      }, i.defaults, r)).expires) {
                      var a = new Date;
                      a.setMilliseconds(a.getMilliseconds() + 864e5 * r.expires), r.expires = a
                  }
                  r.expires = r.expires ? r.expires.toUTCString() : "";
                  try {
                      s = JSON.stringify(o), /^[\{\[]/.test(s) && (o = s)
                  } catch (e) {}
                  o = n.write ? n.write(o, t) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = (t = (t = encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                  var l = "";
                  for (var c in r) r[c] && (l += "; " + c, !0 !== r[c] && (l += "=" + r[c]));
                  return document.cookie = t + "=" + o + l
              }
              t || (s = {});
              for (var u = document.cookie ? document.cookie.split("; ") : [], h = /(%[0-9A-Z]{2})+/g, d = 0; d < u.length; d++) {
                  var f = u[d].split("="),
                      p = f.slice(1).join("=");
                  '"' === p.charAt(0) && (p = p.slice(1, -1));
                  try {
                      var g = f[0].replace(h, decodeURIComponent);
                      if (p = n.read ? n.read(p, g) : n(p, g) || p.replace(h, decodeURIComponent), this.json) try {
                          p = JSON.parse(p)
                      } catch (e) {}
                      if (t === g) {
                          s = p;
                          break
                      }
                      t || (s[g] = p)
                  } catch (e) {}
              }
              return s
          }
      }
      return i.set = i, i.get = function(e) {
          return i.call(i, e)
      }, i.getJSON = function() {
          return i.apply({
              json: !0
          }, [].slice.call(arguments))
      }, i.defaults = {}, i.remove = function(t, n) {
          i(t, "", e(n, {
              expires: -1
          }))
      }, i.withConverter = t, i
  }(function() {})
}),
function() {
  "use strict";

  function e(i) {
      if (!i) throw new Error("No options passed to Waypoint constructor");
      if (!i.element) throw new Error("No element option passed to Waypoint constructor");
      if (!i.handler) throw new Error("No handler option passed to Waypoint constructor");
      this.key = "waypoint-" + t, this.options = e.Adapter.extend({}, e.defaults, i), this.element = this.options.element, this.adapter = new e.Adapter(this.element), this.callback = i.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = e.Group.findOrCreate({
          name: this.options.group,
          axis: this.axis
      }), this.context = e.Context.findOrCreateByElement(this.options.context), e.offsetAliases[this.options.offset] && (this.options.offset = e.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), n[this.key] = this, t += 1
  }
  var t = 0,
      n = {};
  e.prototype.queueTrigger = function(e) {
      this.group.queueTrigger(this, e)
  }, e.prototype.trigger = function(e) {
      this.enabled && this.callback && this.callback.apply(this, e)
  }, e.prototype.destroy = function() {
      this.context.remove(this), this.group.remove(this), delete n[this.key]
  }, e.prototype.disable = function() {
      return this.enabled = !1, this
  }, e.prototype.enable = function() {
      return this.context.refresh(), this.enabled = !0, this
  }, e.prototype.next = function() {
      return this.group.next(this)
  }, e.prototype.previous = function() {
      return this.group.previous(this)
  }, e.invokeAll = function(e) {
      var t = [];
      for (var i in n) t.push(n[i]);
      for (var o = 0, r = t.length; r > o; o++) t[o][e]()
  }, e.destroyAll = function() {
      e.invokeAll("destroy")
  }, e.disableAll = function() {
      e.invokeAll("disable")
  }, e.enableAll = function() {
      e.invokeAll("enable")
  }, e.refreshAll = function() {
      e.Context.refreshAll()
  }, e.viewportHeight = function() {
      return window.innerHeight || document.documentElement.clientHeight
  }, e.viewportWidth = function() {
      return document.documentElement.clientWidth
  }, e.adapters = [], e.defaults = {
      context: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0
  }, e.offsetAliases = {
      "bottom-in-view": function() {
          return this.context.innerHeight() - this.adapter.outerHeight()
      },
      "right-in-view": function() {
          return this.context.innerWidth() - this.adapter.outerWidth()
      }
  }, window.Waypoint = e
}(),
function() {
  "use strict";

  function e(e) {
      window.setTimeout(e, 1e3 / 60)
  }

  function t(e) {
      this.element = e, this.Adapter = o.Adapter, this.adapter = new this.Adapter(e), this.key = "waypoint-context-" + n, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop()
      }, this.waypoints = {
          vertical: {},
          horizontal: {}
      }, e.waypointContextKey = this.key, i[e.waypointContextKey] = this, n += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
  }
  var n = 0,
      i = {},
      o = window.Waypoint,
      r = window.onload;
  t.prototype.add = function(e) {
      var t = e.options.horizontal ? "horizontal" : "vertical";
      this.waypoints[t][e.key] = e, this.refresh()
  }, t.prototype.checkEmpty = function() {
      var e = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          t = this.Adapter.isEmptyObject(this.waypoints.vertical);
      e && t && (this.adapter.off(".waypoints"), delete i[this.key])
  }, t.prototype.createThrottledResizeHandler = function() {
      function e() {
          t.handleResize(), t.didResize = !1
      }
      var t = this;
      this.adapter.on("resize.waypoints", function() {
          t.didResize || (t.didResize = !0, o.requestAnimationFrame(e))
      })
  }, t.prototype.createThrottledScrollHandler = function() {
      function e() {
          t.handleScroll(), t.didScroll = !1
      }
      var t = this;
      this.adapter.on("scroll.waypoints", function() {
          (!t.didScroll || o.isTouch) && (t.didScroll = !0, o.requestAnimationFrame(e))
      })
  }, t.prototype.handleResize = function() {
      o.Context.refreshAll()
  }, t.prototype.handleScroll = function() {
      var e = {},
          t = {
              horizontal: {
                  newScroll: this.adapter.scrollLeft(),
                  oldScroll: this.oldScroll.x,
                  forward: "right",
                  backward: "left"
              },
              vertical: {
                  newScroll: this.adapter.scrollTop(),
                  oldScroll: this.oldScroll.y,
                  forward: "down",
                  backward: "up"
              }
          };
      for (var n in t) {
          var i = t[n],
              o = i.newScroll > i.oldScroll ? i.forward : i.backward;
          for (var r in this.waypoints[n]) {
              var s = this.waypoints[n][r],
                  a = i.oldScroll < s.triggerPoint,
                  l = i.newScroll >= s.triggerPoint;
              (a && l || !a && !l) && (s.queueTrigger(o), e[s.group.id] = s.group)
          }
      }
      for (var c in e) e[c].flushTriggers();
      this.oldScroll = {
          x: t.horizontal.newScroll,
          y: t.vertical.newScroll
      }
  }, t.prototype.innerHeight = function() {
      return this.element == this.element.window ? o.viewportHeight() : this.adapter.innerHeight()
  }, t.prototype.remove = function(e) {
      delete this.waypoints[e.axis][e.key], this.checkEmpty()
  }, t.prototype.innerWidth = function() {
      return this.element == this.element.window ? o.viewportWidth() : this.adapter.innerWidth()
  }, t.prototype.destroy = function() {
      var e = [];
      for (var t in this.waypoints)
          for (var n in this.waypoints[t]) e.push(this.waypoints[t][n]);
      for (var i = 0, o = e.length; o > i; i++) e[i].destroy()
  }, t.prototype.refresh = function() {
      var e, t = this.element == this.element.window,
          n = t ? void 0 : this.adapter.offset(),
          i = {};
      for (var r in this.handleScroll(), e = {
              horizontal: {
                  contextOffset: t ? 0 : n.left,
                  contextScroll: t ? 0 : this.oldScroll.x,
                  contextDimension: this.innerWidth(),
                  oldScroll: this.oldScroll.x,
                  forward: "right",
                  backward: "left",
                  offsetProp: "left"
              },
              vertical: {
                  contextOffset: t ? 0 : n.top,
                  contextScroll: t ? 0 : this.oldScroll.y,
                  contextDimension: this.innerHeight(),
                  oldScroll: this.oldScroll.y,
                  forward: "down",
                  backward: "up",
                  offsetProp: "top"
              }
          }) {
          var s = e[r];
          for (var a in this.waypoints[r]) {
              var l, c, u, h, d = this.waypoints[r][a],
                  f = d.options.offset,
                  p = d.triggerPoint,
                  g = 0,
                  m = null == p;
              d.element !== d.element.window && (g = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = g + l - f, c = p < s.oldScroll, u = d.triggerPoint >= s.oldScroll, h = !c && !u, !m && (c && u) ? (d.queueTrigger(s.backward), i[d.group.id] = d.group) : !m && h ? (d.queueTrigger(s.forward), i[d.group.id] = d.group) : m && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), i[d.group.id] = d.group)
          }
      }
      return o.requestAnimationFrame(function() {
          for (var e in i) i[e].flushTriggers()
      }), this
  }, t.findOrCreateByElement = function(e) {
      return t.findByElement(e) || new t(e)
  }, t.refreshAll = function() {
      for (var e in i) i[e].refresh()
  }, t.findByElement = function(e) {
      return i[e.waypointContextKey]
  }, window.onload = function() {
      r && r(), t.refreshAll()
  }, o.requestAnimationFrame = function(t) {
      (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || e).call(window, t)
  }, o.Context = t
}(),
function() {
  "use strict";

  function e(e, t) {
      return e.triggerPoint - t.triggerPoint
  }

  function t(e, t) {
      return t.triggerPoint - e.triggerPoint
  }

  function n(e) {
      this.name = e.name, this.axis = e.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), i[this.axis][this.name] = this
  }
  var i = {
          vertical: {},
          horizontal: {}
      },
      o = window.Waypoint;
  n.prototype.add = function(e) {
      this.waypoints.push(e)
  }, n.prototype.clearTriggerQueues = function() {
      this.triggerQueues = {
          up: [],
          down: [],
          left: [],
          right: []
      }
  }, n.prototype.flushTriggers = function() {
      for (var n in this.triggerQueues) {
          var i = this.triggerQueues[n],
              o = "up" === n || "left" === n;
          i.sort(o ? t : e);
          for (var r = 0, s = i.length; s > r; r += 1) {
              var a = i[r];
              (a.options.continuous || r === i.length - 1) && a.trigger([n])
          }
      }
      this.clearTriggerQueues()
  }, n.prototype.next = function(t) {
      this.waypoints.sort(e);
      var n = o.Adapter.inArray(t, this.waypoints);
      return n === this.waypoints.length - 1 ? null : this.waypoints[n + 1]
  }, n.prototype.previous = function(t) {
      this.waypoints.sort(e);
      var n = o.Adapter.inArray(t, this.waypoints);
      return n ? this.waypoints[n - 1] : null
  }, n.prototype.queueTrigger = function(e, t) {
      this.triggerQueues[t].push(e)
  }, n.prototype.remove = function(e) {
      var t = o.Adapter.inArray(e, this.waypoints);
      t > -1 && this.waypoints.splice(t, 1)
  }, n.prototype.first = function() {
      return this.waypoints[0]
  }, n.prototype.last = function() {
      return this.waypoints[this.waypoints.length - 1]
  }, n.findOrCreate = function(e) {
      return i[e.axis][e.name] || new n(e)
  }, o.Group = n
}(),
function() {
  "use strict";

  function e(e) {
      this.$element = t(e)
  }
  var t = window.jQuery,
      n = window.Waypoint;
  t.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(t, n) {
      e.prototype[n] = function() {
          var e = Array.prototype.slice.call(arguments);
          return this.$element[n].apply(this.$element, e)
      }
  }), t.each(["extend", "inArray", "isEmptyObject"], function(n, i) {
      e[i] = t[i]
  }), n.adapters.push({
      name: "jquery",
      Adapter: e
  }), n.Adapter = e
}(),
function() {
  "use strict";

  function e(e) {
      return function() {
          var n = [],
              i = arguments[0];
          return e.isFunction(arguments[0]) && ((i = e.extend({}, arguments[1])).handler = arguments[0]), this.each(function() {
              var o = e.extend({}, i, {
                  element: this
              });
              "string" == typeof o.context && (o.context = e(this).closest(o.context)[0]), n.push(new t(o))
          }), n
      }
  }
  var t = window.Waypoint;
  window.jQuery && (window.jQuery.fn.waypoint = e(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = e(window.Zepto))
}(),
function() {
  "use strict";

  function e(i) {
      this.options = t.extend({}, e.defaults, i), this.container = this.options.element, "auto" !== this.options.container && (this.container = this.options.container), this.$container = t(this.container), this.$more = t(this.options.more), this.$more.length && (this.setupHandler(), this.waypoint = new n(this.options))
  }
  var t = window.jQuery,
      n = window.Waypoint;
  e.prototype.setupHandler = function() {
      this.options.handler = t.proxy(function() {
          this.options.onBeforePageLoad(), this.destroy(), this.$container.addClass(this.options.loadingClass), t.get(t(this.options.more).attr("href"), t.proxy(function(e) {
              var i = t(t.parseHTML(e)),
                  o = i.find(this.options.more),
                  r = i.find(this.options.items);
              r.length || (r = i.filter(this.options.items)), this.$container.append(r), this.$container.removeClass(this.options.loadingClass), o.length || (o = i.filter(this.options.more)), o.length ? (this.$more.replaceWith(o), this.$more = o, this.waypoint = new n(this.options)) : this.$more.remove(), this.options.onAfterPageLoad(r)
          }, this))
      }, this)
  }, e.prototype.destroy = function() {
      this.waypoint && this.waypoint.destroy()
  }, e.defaults = {
      container: "auto",
      items: ".infinite-item",
      more: ".infinite-more-link",
      offset: "bottom-in-view",
      loadingClass: "infinite-loading",
      onBeforePageLoad: t.noop,
      onAfterPageLoad: t.noop
  }, n.Infinite = e
}(), PointerEventsPolyfill.initialize = function(e) {
      return null == PointerEventsPolyfill.singleton && (PointerEventsPolyfill.singleton = new PointerEventsPolyfill(e)), PointerEventsPolyfill.singleton
  }, PointerEventsPolyfill.prototype.register_mouse_events = function() {
      $(document).on(this.options.mouseEvents.join(" "), this.options.selector, function(e) {
          if ("none" == $(this).css("pointer-events")) {
              var t = $(this).css("display");
              $(this).css("display", "none");
              var n = document.elementFromPoint(e.clientX, e.clientY);
              return t ? $(this).css("display", t) : $(this).css("display", ""), e.target = n, $(n).trigger(e), !1
          }
          return !0
      })
  }, String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
      return t = t || 0, this.indexOf(e, t) === t
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(n) {
          return t(e, n)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("jquery")) : e.jQueryBridget = t(e, e.jQuery)
  }(window, function(e, t) {
      "use strict";

      function n(n, r, a) {
          (a = a || t || e.jQuery) && (r.prototype.option || (r.prototype.option = function(e) {
              a.isPlainObject(e) && (this.options = a.extend(!0, this.options, e))
          }), a.fn[n] = function(e) {
              return "string" == typeof e ? function(e, t, i) {
                  var o, r = "$()." + n + '("' + t + '")';
                  return e.each(function(e, l) {
                      var c = a.data(l, n);
                      if (c) {
                          var u = c[t];
                          if (u && "_" != t.charAt(0)) {
                              var h = u.apply(c, i);
                              o = void 0 === o ? h : o
                          } else s(r + " is not a valid method")
                      } else s(n + " not initialized. Cannot call methods, i.e. " + r)
                  }), void 0 !== o ? o : e
              }(this, e, o.call(arguments, 1)) : (function(e, t) {
                  e.each(function(e, i) {
                      var o = a.data(i, n);
                      o ? (o.option(t), o._init()) : (o = new r(i, t), a.data(i, n, o))
                  })
              }(this, e), this)
          }, i(a))
      }

      function i(e) {
          !e || e && e.bridget || (e.bridget = n)
      }
      var o = Array.prototype.slice,
          r = e.console,
          s = void 0 === r ? function() {} : function(e) {
              r.error(e)
          };
      return i(t || e.jQuery), n
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
  }("undefined" != typeof window ? window : this, function() {
      function e() {}
      var t = e.prototype;
      return t.on = function(e, t) {
          if (e && t) {
              var n = this._events = this._events || {},
                  i = n[e] = n[e] || [];
              return -1 == i.indexOf(t) && i.push(t), this
          }
      }, t.once = function(e, t) {
          if (e && t) {
              this.on(e, t);
              var n = this._onceEvents = this._onceEvents || {};
              return (n[e] = n[e] || {})[t] = !0, this
          }
      }, t.off = function(e, t) {
          var n = this._events && this._events[e];
          if (n && n.length) {
              var i = n.indexOf(t);
              return -1 != i && n.splice(i, 1), this
          }
      }, t.emitEvent = function(e, t) {
          var n = this._events && this._events[e];
          if (n && n.length) {
              n = n.slice(0), t = t || [];
              for (var i = this._onceEvents && this._onceEvents[e], o = 0; o < n.length; o++) {
                  var r = n[o];
                  i && i[r] && (this.off(e, r), delete i[r]), r.apply(this, t)
              }
              return this
          }
      }, t.allOff = function() {
          delete this._events, delete this._onceEvents
      }, e
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("get-size/get-size", t) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
  }(window, function() {
      "use strict";

      function e(e) {
          var t = parseFloat(e);
          return -1 == e.indexOf("%") && !isNaN(t) && t
      }

      function t(e) {
          var t = getComputedStyle(e);
          return t || r("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), t
      }

      function n() {
          if (!l) {
              l = !0;
              var n = document.createElement("div");
              n.style.width = "200px", n.style.padding = "1px 2px 3px 4px", n.style.borderStyle = "solid", n.style.borderWidth = "1px 2px 3px 4px", n.style.boxSizing = "border-box";
              var r = document.body || document.documentElement;
              r.appendChild(n);
              var s = t(n);
              o = 200 == Math.round(e(s.width)), i.isBoxSizeOuter = o, r.removeChild(n)
          }
      }

      function i(i) {
          if (n(), "string" == typeof i && (i = document.querySelector(i)), i && "object" == typeof i && i.nodeType) {
              var r = t(i);
              if ("none" == r.display) return function() {
                  for (var e = {
                          width: 0,
                          height: 0,
                          innerWidth: 0,
                          innerHeight: 0,
                          outerWidth: 0,
                          outerHeight: 0
                      }, t = 0; t < a; t++) e[s[t]] = 0;
                  return e
              }();
              var l = {};
              l.width = i.offsetWidth, l.height = i.offsetHeight;
              for (var c = l.isBorderBox = "border-box" == r.boxSizing, u = 0; u < a; u++) {
                  var h = s[u],
                      d = r[h],
                      f = parseFloat(d);
                  l[h] = isNaN(f) ? 0 : f
              }
              var p = l.paddingLeft + l.paddingRight,
                  g = l.paddingTop + l.paddingBottom,
                  m = l.marginLeft + l.marginRight,
                  v = l.marginTop + l.marginBottom,
                  y = l.borderLeftWidth + l.borderRightWidth,
                  b = l.borderTopWidth + l.borderBottomWidth,
                  w = c && o,
                  x = e(r.width);
              !1 !== x && (l.width = x + (w ? 0 : p + y));
              var S = e(r.height);
              return !1 !== S && (l.height = S + (w ? 0 : g + b)), l.innerWidth = l.width - (p + y), l.innerHeight = l.height - (g + b), l.outerWidth = l.width + m, l.outerHeight = l.height + v, l
          }
      }
      var o, r = "undefined" == typeof console ? function() {} : function(e) {
              console.error(e)
          },
          s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
          a = s.length,
          l = !1;
      return i
  }),
  function(e, t) {
      "use strict";
      "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
  }(window, function() {
      "use strict";
      var e = function() {
          var e = window.Element.prototype;
          if (e.matches) return "matches";
          if (e.matchesSelector) return "matchesSelector";
          for (var t = ["webkit", "moz", "ms", "o"], n = 0; n < t.length; n++) {
              var i = t[n] + "MatchesSelector";
              if (e[i]) return i
          }
      }();
      return function(t, n) {
          return t[e](n)
      }
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(n) {
          return t(e, n)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector)
  }(window, function(e, t) {
      var n = {
              extend: function(e, t) {
                  for (var n in t) e[n] = t[n];
                  return e
              },
              modulo: function(e, t) {
                  return (e % t + t) % t
              }
          },
          i = Array.prototype.slice;
      n.makeArray = function(e) {
          return Array.isArray(e) ? e : null == e ? [] : "object" == typeof e && "number" == typeof e.length ? i.call(e) : [e]
      }, n.removeFrom = function(e, t) {
          var n = e.indexOf(t); - 1 != n && e.splice(n, 1)
      }, n.getParent = function(e, n) {
          for (; e.parentNode && e != document.body;)
              if (e = e.parentNode, t(e, n)) return e
      }, n.getQueryElement = function(e) {
          return "string" == typeof e ? document.querySelector(e) : e
      }, n.handleEvent = function(e) {
          var t = "on" + e.type;
          this[t] && this[t](e)
      }, n.filterFindElements = function(e, i) {
          e = n.makeArray(e);
          var o = [];
          return e.forEach(function(e) {
              if (e instanceof HTMLElement) {
                  if (!i) return void o.push(e);
                  t(e, i) && o.push(e);
                  for (var n = e.querySelectorAll(i), r = 0; r < n.length; r++) o.push(n[r])
              }
          }), o
      }, n.debounceMethod = function(e, t, n) {
          n = n || 100;
          var i = e.prototype[t],
              o = t + "Timeout";
          e.prototype[t] = function() {
              var e = this[o];
              clearTimeout(e);
              var t = arguments,
                  r = this;
              this[o] = setTimeout(function() {
                  i.apply(r, t), delete r[o]
              }, n)
          }
      }, n.docReady = function(e) {
          var t = document.readyState;
          "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
      }, n.toDashed = function(e) {
          return e.replace(/(.)([A-Z])/g, function(e, t, n) {
              return t + "-" + n
          }).toLowerCase()
      };
      var o = e.console;
      return n.htmlInit = function(t, i) {
          n.docReady(function() {
              var r = n.toDashed(i),
                  s = "data-" + r,
                  a = document.querySelectorAll("[" + s + "]"),
                  l = document.querySelectorAll(".js-" + r),
                  c = n.makeArray(a).concat(n.makeArray(l)),
                  u = s + "-options",
                  h = e.jQuery;
              c.forEach(function(e) {
                  var n, r = e.getAttribute(s) || e.getAttribute(u);
                  try {
                      n = r && JSON.parse(r)
                  } catch (t) {
                      return void(o && o.error("Error parsing " + s + " on " + e.className + ": " + t))
                  }
                  var a = new t(e, n);
                  h && h.data(e, i, a)
              })
          })
      }, n
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(n) {
          return t(e, n)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("get-size")) : (e.Flickity = e.Flickity || {}, e.Flickity.Cell = t(e, e.getSize))
  }(window, function(e, t) {
      function n(e, t) {
          this.element = e, this.parent = t, this.create()
      }
      var i = n.prototype;
      return i.create = function() {
          this.element.style.position = "absolute", this.element.setAttribute("aria-selected", "false"), this.x = 0, this.shift = 0
      }, i.destroy = function() {
          this.element.style.position = "";
          var e = this.parent.originSide;
          this.element.removeAttribute("aria-selected"), this.element.style[e] = ""
      }, i.getSize = function() {
          this.size = t(this.element)
      }, i.setPosition = function(e) {
          this.x = e, this.updateTarget(), this.renderPosition(e)
      }, i.updateTarget = i.setDefaultTarget = function() {
          var e = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
          this.target = this.x + this.size[e] + this.size.width * this.parent.cellAlign
      }, i.renderPosition = function(e) {
          var t = this.parent.originSide;
          this.element.style[t] = this.parent.getPositionValue(e)
      }, i.wrapShift = function(e) {
          this.shift = e, this.renderPosition(this.x + this.parent.slideableWidth * e)
      }, i.remove = function() {
          this.element.parentNode.removeChild(this.element)
      }, n
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("flickity/js/slide", t) : "object" == typeof module && module.exports ? module.exports = t() : (e.Flickity = e.Flickity || {}, e.Flickity.Slide = t())
  }(window, function() {
      "use strict";

      function e(e) {
          this.parent = e, this.isOriginLeft = "left" == e.originSide, this.cells = [], this.outerWidth = 0, this.height = 0
      }
      var t = e.prototype;
      return t.addCell = function(e) {
          if (this.cells.push(e), this.outerWidth += e.size.outerWidth, this.height = Math.max(e.size.outerHeight, this.height), 1 == this.cells.length) {
              this.x = e.x;
              var t = this.isOriginLeft ? "marginLeft" : "marginRight";
              this.firstMargin = e.size[t]
          }
      }, t.updateTarget = function() {
          var e = this.isOriginLeft ? "marginRight" : "marginLeft",
              t = this.getLastCell(),
              n = t ? t.size[e] : 0,
              i = this.outerWidth - (this.firstMargin + n);
          this.target = this.x + this.firstMargin + i * this.parent.cellAlign
      }, t.getLastCell = function() {
          return this.cells[this.cells.length - 1]
      }, t.select = function() {
          this.changeSelected(!0)
      }, t.unselect = function() {
          this.changeSelected(!1)
      }, t.changeSelected = function(e) {
          var t = e ? "add" : "remove";
          this.cells.forEach(function(n) {
              n.element.classList[t]("is-selected"), n.element.setAttribute("aria-selected", e.toString())
          })
      }, t.getCellElements = function() {
          return this.cells.map(function(e) {
              return e.element
          })
      }, e
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(n) {
          return t(e, n)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("fizzy-ui-utils")) : (e.Flickity = e.Flickity || {}, e.Flickity.animatePrototype = t(e, e.fizzyUIUtils))
  }(window, function(e, t) {
      var n = {
          startAnimation: function() {
              this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
          },
          animate: function() {
              this.applyDragForce(), this.applySelectedAttraction();
              var e = this.x;
              if (this.integratePhysics(), this.positionSlider(), this.settle(e), this.isAnimating) {
                  var t = this;
                  requestAnimationFrame(function() {
                      t.animate()
                  })
              }
          },
          positionSlider: function() {
              var e = this.x;
              this.options.wrapAround && this.cells.length > 1 && (e = t.modulo(e, this.slideableWidth), e -= this.slideableWidth, this.shiftWrapCells(e)), e += this.cursorPosition, e = this.options.rightToLeft ? -e : e;
              var n = this.getPositionValue(e);
              this.slider.style.transform = this.isAnimating ? "translate3d(" + n + ",0,0)" : "translateX(" + n + ")";
              var i = this.slides[0];
              if (i) {
                  var o = -this.x - i.target,
                      r = o / this.slidesWidth;
                  this.dispatchEvent("scroll", null, [r, o])
              }
          },
          positionSliderAtSelected: function() {
              this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider())
          },
          getPositionValue: function(e) {
              return this.options.percentPosition ? .01 * Math.round(e / this.size.innerWidth * 1e4) + "%" : Math.round(e) + "px"
          },
          settle: function(e) {
              this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * e) || this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]))
          },
          shiftWrapCells: function(e) {
              var t = this.cursorPosition + e;
              this._shiftCells(this.beforeShiftCells, t, -1);
              var n = this.size.innerWidth - (e + this.slideableWidth + this.cursorPosition);
              this._shiftCells(this.afterShiftCells, n, 1)
          },
          _shiftCells: function(e, t, n) {
              for (var i = 0; i < e.length; i++) {
                  var o = e[i],
                      r = t > 0 ? n : 0;
                  o.wrapShift(r), t -= o.size.outerWidth
              }
          },
          _unshiftCells: function(e) {
              if (e && e.length)
                  for (var t = 0; t < e.length; t++) e[t].wrapShift(0)
          },
          integratePhysics: function() {
              this.x += this.velocity, this.velocity *= this.getFrictionFactor()
          },
          applyForce: function(e) {
              this.velocity += e
          },
          getFrictionFactor: function() {
              return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
          },
          getRestingPosition: function() {
              return this.x + this.velocity / (1 - this.getFrictionFactor())
          },
          applyDragForce: function() {
              if (this.isDraggable && this.isPointerDown) {
                  var e = this.dragX - this.x - this.velocity;
                  this.applyForce(e)
              }
          },
          applySelectedAttraction: function() {
              if (!(this.isDraggable && this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
                  var e = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
                  this.applyForce(e)
              }
          }
      };
      return n
  }),
  function(e, t) {
      if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(n, i, o, r, s, a) {
          return t(e, n, i, o, r, s, a)
      });
      else if ("object" == typeof module && module.exports) module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
      else {
          var n = e.Flickity;
          e.Flickity = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, n.Cell, n.Slide, n.animatePrototype)
      }
  }(window, function(e, t, n, i, o, r, s) {
      function a(e, t) {
          for (e = i.makeArray(e); e.length;) t.appendChild(e.shift())
      }

      function l(e, t) {
          var n = i.getQueryElement(e);
          if (n) {
              if (this.element = n, this.element.flickityGUID) {
                  var o = f[this.element.flickityGUID];
                  return o.option(t), o
              }
              c && (this.$element = c(this.element)), this.options = i.extend({}, this.constructor.defaults), this.option(t), this._create()
          } else h && h.error("Bad element for Flickity: " + (n || e))
      }
      var c = e.jQuery,
          u = e.getComputedStyle,
          h = e.console,
          d = 0,
          f = {};
      l.defaults = {
          accessibility: !0,
          cellAlign: "center",
          freeScrollFriction: .075,
          friction: .28,
          namespaceJQueryEvents: !0,
          percentPosition: !0,
          resize: !0,
          selectedAttraction: .025,
          setGallerySize: !0
      }, l.createMethods = [];
      var p = l.prototype;
      i.extend(p, t.prototype), p._create = function() {
          var t = this.guid = ++d;
          for (var n in this.element.flickityGUID = t, f[t] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && e.addEventListener("resize", this), this.options.on) {
              var i = this.options.on[n];
              this.on(n, i)
          }
          l.createMethods.forEach(function(e) {
              this[e]()
          }, this), this.options.watchCSS ? this.watchCSS() : this.activate()
      }, p.option = function(e) {
          i.extend(this.options, e)
      }, p.activate = function() {
          if (!this.isActive) {
              this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize(), a(this._filterFindCellElements(this.element.children), this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate");
              var e, t = this.options.initialIndex;
              e = this.isInitActivated ? this.selectedIndex : void 0 !== t && this.cells[t] ? t : 0, this.select(e, !1, !0), this.isInitActivated = !0, this.dispatchEvent("ready")
          }
      }, p._createSlider = function() {
          var e = document.createElement("div");
          e.className = "flickity-slider", e.style[this.originSide] = 0, this.slider = e
      }, p._filterFindCellElements = function(e) {
          return i.filterFindElements(e, this.options.cellSelector)
      }, p.reloadCells = function() {
          this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
      }, p._makeCells = function(e) {
          return this._filterFindCellElements(e).map(function(e) {
              return new o(e, this)
          }, this)
      }, p.getLastCell = function() {
          return this.cells[this.cells.length - 1]
      }, p.getLastSlide = function() {
          return this.slides[this.slides.length - 1]
      }, p.positionCells = function() {
          this._sizeCells(this.cells), this._positionCells(0)
      }, p._positionCells = function(e) {
          e = e || 0, this.maxCellHeight = e && this.maxCellHeight || 0;
          var t = 0;
          if (e > 0) {
              var n = this.cells[e - 1];
              t = n.x + n.size.outerWidth
          }
          for (var i = this.cells.length, o = e; o < i; o++) {
              var r = this.cells[o];
              r.setPosition(t), t += r.size.outerWidth, this.maxCellHeight = Math.max(r.size.outerHeight, this.maxCellHeight)
          }
          this.slideableWidth = t, this.updateSlides(), this._containSlides(), this.slidesWidth = i ? this.getLastSlide().target - this.slides[0].target : 0
      }, p._sizeCells = function(e) {
          e.forEach(function(e) {
              e.getSize()
          })
      }, p.updateSlides = function() {
          if (this.slides = [], this.cells.length) {
              var e = new r(this);
              this.slides.push(e);
              var t = "left" == this.originSide ? "marginRight" : "marginLeft",
                  n = this._getCanCellFit();
              this.cells.forEach(function(i, o) {
                  if (e.cells.length) {
                      var s = e.outerWidth - e.firstMargin + (i.size.outerWidth - i.size[t]);
                      n.call(this, o, s) ? e.addCell(i) : (e.updateTarget(), e = new r(this), this.slides.push(e), e.addCell(i))
                  } else e.addCell(i)
              }, this), e.updateTarget(), this.updateSelectedSlide()
          }
      }, p._getCanCellFit = function() {
          var e = this.options.groupCells;
          if (!e) return function() {
              return !1
          };
          if ("number" == typeof e) {
              var t = parseInt(e, 10);
              return function(e) {
                  return e % t != 0
              }
          }
          var n = "string" == typeof e && e.match(/^(\d+)%$/),
              i = n ? parseInt(n[1], 10) / 100 : 1;
          return function(e, t) {
              return t <= (this.size.innerWidth + 1) * i
          }
      }, p._init = p.reposition = function() {
          this.positionCells(), this.positionSliderAtSelected()
      }, p.getSize = function() {
          this.size = n(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
      };
      var g = {
          center: {
              left: .5,
              right: .5
          },
          left: {
              left: 0,
              right: 1
          },
          right: {
              right: 0,
              left: 1
          }
      };
      return p.setCellAlign = function() {
          var e = g[this.options.cellAlign];
          this.cellAlign = e ? e[this.originSide] : this.options.cellAlign
      }, p.setGallerySize = function() {
          if (this.options.setGallerySize) {
              var e = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
              this.viewport.style.height = e + "px"
          }
      }, p._getWrapShiftCells = function() {
          if (this.options.wrapAround) {
              this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
              var e = this.cursorPosition,
                  t = this.cells.length - 1;
              this.beforeShiftCells = this._getGapCells(e, t, -1), e = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(e, 0, 1)
          }
      }, p._getGapCells = function(e, t, n) {
          for (var i = []; e > 0;) {
              var o = this.cells[t];
              if (!o) break;
              i.push(o), t += n, e -= o.size.outerWidth
          }
          return i
      }, p._containSlides = function() {
          if (this.options.contain && !this.options.wrapAround && this.cells.length) {
              var e = this.options.rightToLeft,
                  t = e ? "marginRight" : "marginLeft",
                  n = e ? "marginLeft" : "marginRight",
                  i = this.slideableWidth - this.getLastCell().size[n],
                  o = i < this.size.innerWidth,
                  r = this.cursorPosition + this.cells[0].size[t],
                  s = i - this.size.innerWidth * (1 - this.cellAlign);
              this.slides.forEach(function(e) {
                  o ? e.target = i * this.cellAlign : (e.target = Math.max(e.target, r), e.target = Math.min(e.target, s))
              }, this)
          }
      }, p.dispatchEvent = function(e, t, n) {
          var i = t ? [t].concat(n) : n;
          if (this.emitEvent(e, i), c && this.$element) {
              var o = e += this.options.namespaceJQueryEvents ? ".flickity" : "";
              if (t) {
                  var r = c.Event(t);
                  r.type = e, o = r
              }
              this.$element.trigger(o, n)
          }
      }, p.select = function(e, t, n) {
          if (this.isActive && (e = parseInt(e, 10), this._wrapSelect(e), (this.options.wrapAround || t) && (e = i.modulo(e, this.slides.length)), this.slides[e])) {
              var o = this.selectedIndex;
              this.selectedIndex = e, this.updateSelectedSlide(), n ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select", null, [e]), e != o && this.dispatchEvent("change", null, [e]), this.dispatchEvent("cellSelect")
          }
      }, p._wrapSelect = function(e) {
          var t = this.slides.length;
          if (!(this.options.wrapAround && t > 1)) return e;
          var n = i.modulo(e, t),
              o = Math.abs(n - this.selectedIndex),
              r = Math.abs(n + t - this.selectedIndex),
              s = Math.abs(n - t - this.selectedIndex);
          !this.isDragSelect && r < o ? e += t : !this.isDragSelect && s < o && (e -= t), e < 0 ? this.x -= this.slideableWidth : e >= t && (this.x += this.slideableWidth)
      }, p.previous = function(e, t) {
          this.select(this.selectedIndex - 1, e, t)
      }, p.next = function(e, t) {
          this.select(this.selectedIndex + 1, e, t)
      }, p.updateSelectedSlide = function() {
          var e = this.slides[this.selectedIndex];
          e && (this.unselectSelectedSlide(), this.selectedSlide = e, e.select(), this.selectedCells = e.cells, this.selectedElements = e.getCellElements(), this.selectedCell = e.cells[0], this.selectedElement = this.selectedElements[0])
      }, p.unselectSelectedSlide = function() {
          this.selectedSlide && this.selectedSlide.unselect()
      }, p.selectCell = function(e, t, n) {
          var i = this.queryCell(e);
          if (i) {
              var o = this.getCellSlideIndex(i);
              this.select(o, t, n)
          }
      }, p.getCellSlideIndex = function(e) {
          for (var t = 0; t < this.slides.length; t++) {
              if (-1 != this.slides[t].cells.indexOf(e)) return t
          }
      }, p.getCell = function(e) {
          for (var t = 0; t < this.cells.length; t++) {
              var n = this.cells[t];
              if (n.element == e) return n
          }
      }, p.getCells = function(e) {
          e = i.makeArray(e);
          var t = [];
          return e.forEach(function(e) {
              var n = this.getCell(e);
              n && t.push(n)
          }, this), t
      }, p.getCellElements = function() {
          return this.cells.map(function(e) {
              return e.element
          })
      }, p.getParentCell = function(e) {
          var t = this.getCell(e);
          return t || (e = i.getParent(e, ".flickity-slider > *"), this.getCell(e))
      }, p.getAdjacentCellElements = function(e, t) {
          if (!e) return this.selectedSlide.getCellElements();
          t = void 0 === t ? this.selectedIndex : t;
          var n = this.slides.length;
          if (1 + 2 * e >= n) return this.getCellElements();
          for (var o = [], r = t - e; r <= t + e; r++) {
              var s = this.options.wrapAround ? i.modulo(r, n) : r,
                  a = this.slides[s];
              a && (o = o.concat(a.getCellElements()))
          }
          return o
      }, p.queryCell = function(e) {
          return "number" == typeof e ? this.cells[e] : ("string" == typeof e && (e = this.element.querySelector(e)), this.getCell(e))
      }, p.uiChange = function() {
          this.emitEvent("uiChange")
      }, p.childUIPointerDown = function(e) {
          this.emitEvent("childUIPointerDown", [e])
      }, p.onresize = function() {
          this.watchCSS(), this.resize()
      }, i.debounceMethod(l, "onresize", 150), p.resize = function() {
          if (this.isActive) {
              this.getSize(), this.options.wrapAround && (this.x = i.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
              var e = this.selectedElements && this.selectedElements[0];
              this.selectCell(e, !1, !0)
          }
      }, p.watchCSS = function() {
          this.options.watchCSS && (-1 != u(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate())
      }, p.onkeydown = function(e) {
          var t = document.activeElement && document.activeElement != this.element;
          if (this.options.accessibility && !t) {
              var n = l.keyboardHandlers[e.keyCode];
              n && n.call(this)
          }
      }, l.keyboardHandlers = {
          37: function() {
              var e = this.options.rightToLeft ? "next" : "previous";
              this.uiChange(), this[e]()
          },
          39: function() {
              var e = this.options.rightToLeft ? "previous" : "next";
              this.uiChange(), this[e]()
          }
      }, p.focus = function() {
          var t = e.pageYOffset;
          this.element.focus({
              preventScroll: !0
          }), e.pageYOffset != t && e.scrollTo(e.pageXOffset, t)
      }, p.deactivate = function() {
          this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.unselectSelectedSlide(), this.cells.forEach(function(e) {
              e.destroy()
          }), this.element.removeChild(this.viewport), a(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"))
      }, p.destroy = function() {
          this.deactivate(), e.removeEventListener("resize", this), this.emitEvent("destroy"), c && this.$element && c.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete f[this.guid]
      }, i.extend(p, s), l.data = function(e) {
          var t = (e = i.getQueryElement(e)) && e.flickityGUID;
          return t && f[t]
      }, i.htmlInit(l, "flickity"), c && c.bridget && c.bridget("flickity", l), l.setJQuery = function(e) {
          c = e
      }, l.Cell = o, l
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(n) {
          return t(e, n)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.Unipointer = t(e, e.EvEmitter)
  }(window, function(e, t) {
      function n() {}
      var i = n.prototype = Object.create(t.prototype);
      i.bindStartEvent = function(e) {
          this._bindStartEvent(e, !0)
      }, i.unbindStartEvent = function(e) {
          this._bindStartEvent(e, !1)
      }, i._bindStartEvent = function(t, n) {
          var i = (n = void 0 === n || n) ? "addEventListener" : "removeEventListener",
              o = "mousedown";
          e.PointerEvent ? o = "pointerdown" : "ontouchstart" in e && (o = "touchstart"), t[i](o, this)
      }, i.handleEvent = function(e) {
          var t = "on" + e.type;
          this[t] && this[t](e)
      }, i.getTouch = function(e) {
          for (var t = 0; t < e.length; t++) {
              var n = e[t];
              if (n.identifier == this.pointerIdentifier) return n
          }
      }, i.onmousedown = function(e) {
          var t = e.button;
          t && 0 !== t && 1 !== t || this._pointerDown(e, e)
      }, i.ontouchstart = function(e) {
          this._pointerDown(e, e.changedTouches[0])
      }, i.onpointerdown = function(e) {
          this._pointerDown(e, e)
      }, i._pointerDown = function(e, t) {
          e.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== t.pointerId ? t.pointerId : t.identifier, this.pointerDown(e, t))
      }, i.pointerDown = function(e, t) {
          this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t])
      };
      var o = {
          mousedown: ["mousemove", "mouseup"],
          touchstart: ["touchmove", "touchend", "touchcancel"],
          pointerdown: ["pointermove", "pointerup", "pointercancel"]
      };
      return i._bindPostStartEvents = function(t) {
          if (t) {
              var n = o[t.type];
              n.forEach(function(t) {
                  e.addEventListener(t, this)
              }, this), this._boundPointerEvents = n
          }
      }, i._unbindPostStartEvents = function() {
          this._boundPointerEvents && (this._boundPointerEvents.forEach(function(t) {
              e.removeEventListener(t, this)
          }, this), delete this._boundPointerEvents)
      }, i.onmousemove = function(e) {
          this._pointerMove(e, e)
      }, i.onpointermove = function(e) {
          e.pointerId == this.pointerIdentifier && this._pointerMove(e, e)
      }, i.ontouchmove = function(e) {
          var t = this.getTouch(e.changedTouches);
          t && this._pointerMove(e, t)
      }, i._pointerMove = function(e, t) {
          this.pointerMove(e, t)
      }, i.pointerMove = function(e, t) {
          this.emitEvent("pointerMove", [e, t])
      }, i.onmouseup = function(e) {
          this._pointerUp(e, e)
      }, i.onpointerup = function(e) {
          e.pointerId == this.pointerIdentifier && this._pointerUp(e, e)
      }, i.ontouchend = function(e) {
          var t = this.getTouch(e.changedTouches);
          t && this._pointerUp(e, t)
      }, i._pointerUp = function(e, t) {
          this._pointerDone(), this.pointerUp(e, t)
      }, i.pointerUp = function(e, t) {
          this.emitEvent("pointerUp", [e, t])
      }, i._pointerDone = function() {
          this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone()
      }, i._pointerReset = function() {
          this.isPointerDown = !1, delete this.pointerIdentifier
      }, i.pointerDone = function() {}, i.onpointercancel = function(e) {
          e.pointerId == this.pointerIdentifier && this._pointerCancel(e, e)
      }, i.ontouchcancel = function(e) {
          var t = this.getTouch(e.changedTouches);
          t && this._pointerCancel(e, t)
      }, i._pointerCancel = function(e, t) {
          this._pointerDone(), this.pointerCancel(e, t)
      }, i.pointerCancel = function(e, t) {
          this.emitEvent("pointerCancel", [e, t])
      }, n.getPointerPoint = function(e) {
          return {
              x: e.pageX,
              y: e.pageY
          }
      }, n
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(n) {
          return t(e, n)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("unipointer")) : e.Unidragger = t(e, e.Unipointer)
  }(window, function(e, t) {
      function n() {}
      var i = n.prototype = Object.create(t.prototype);
      i.bindHandles = function() {
          this._bindHandles(!0)
      }, i.unbindHandles = function() {
          this._bindHandles(!1)
      }, i._bindHandles = function(t) {
          for (var n = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener", i = t ? this._touchActionValue : "", o = 0; o < this.handles.length; o++) {
              var r = this.handles[o];
              this._bindStartEvent(r, t), r[n]("click", this), e.PointerEvent && (r.style.touchAction = i)
          }
      }, i._touchActionValue = "none", i.pointerDown = function(e, t) {
          this.okayPointerDown(e) && (this.pointerDownPointer = t, e.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t]))
      };
      var o = {
              TEXTAREA: !0,
              INPUT: !0,
              SELECT: !0,
              OPTION: !0
          },
          r = {
              radio: !0,
              checkbox: !0,
              button: !0,
              submit: !0,
              image: !0,
              file: !0
          };
      return i.okayPointerDown = function(e) {
          var t = o[e.target.nodeName],
              n = r[e.target.type],
              i = !t || n;
          return i || this._pointerReset(), i
      }, i.pointerDownBlur = function() {
          var e = document.activeElement;
          e && e.blur && e != document.body && e.blur()
      }, i.pointerMove = function(e, t) {
          var n = this._dragPointerMove(e, t);
          this.emitEvent("pointerMove", [e, t, n]), this._dragMove(e, t, n)
      }, i._dragPointerMove = function(e, t) {
          var n = {
              x: t.pageX - this.pointerDownPointer.pageX,
              y: t.pageY - this.pointerDownPointer.pageY
          };
          return !this.isDragging && this.hasDragStarted(n) && this._dragStart(e, t), n
      }, i.hasDragStarted = function(e) {
          return Math.abs(e.x) > 3 || Math.abs(e.y) > 3
      }, i.pointerUp = function(e, t) {
          this.emitEvent("pointerUp", [e, t]), this._dragPointerUp(e, t)
      }, i._dragPointerUp = function(e, t) {
          this.isDragging ? this._dragEnd(e, t) : this._staticClick(e, t)
      }, i._dragStart = function(e, t) {
          this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(e, t)
      }, i.dragStart = function(e, t) {
          this.emitEvent("dragStart", [e, t])
      }, i._dragMove = function(e, t, n) {
          this.isDragging && this.dragMove(e, t, n)
      }, i.dragMove = function(e, t, n) {
          e.preventDefault(), this.emitEvent("dragMove", [e, t, n])
      }, i._dragEnd = function(e, t) {
          this.isDragging = !1, setTimeout(function() {
              delete this.isPreventingClicks
          }.bind(this)), this.dragEnd(e, t)
      }, i.dragEnd = function(e, t) {
          this.emitEvent("dragEnd", [e, t])
      }, i.onclick = function(e) {
          this.isPreventingClicks && e.preventDefault()
      }, i._staticClick = function(e, t) {
          this.isIgnoringMouseUp && "mouseup" == e.type || (this.staticClick(e, t), "mouseup" != e.type && (this.isIgnoringMouseUp = !0, setTimeout(function() {
              delete this.isIgnoringMouseUp
          }.bind(this), 400)))
      }, i.staticClick = function(e, t) {
          this.emitEvent("staticClick", [e, t])
      }, n.getPointerPoint = t.getPointerPoint, n
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(n, i, o) {
          return t(e, n, i, o)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : e.Flickity = t(e, e.Flickity, e.Unidragger, e.fizzyUIUtils)
  }(window, function(e, t, n, i) {
      function o() {
          return {
              x: e.pageXOffset,
              y: e.pageYOffset
          }
      }
      i.extend(t.defaults, {
          draggable: ">1",
          dragThreshold: 3
      }), t.createMethods.push("_createDrag");
      var r = t.prototype;
      i.extend(r, n.prototype), r._touchActionValue = "pan-y";
      var s = "createTouch" in document,
          a = !1;
      r._createDrag = function() {
          this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("childUIPointerDown", this._childUIPointerDownDrag), this.on("deactivate", this.onDeactivateDrag), this.on("cellChange", this.updateDraggable), s && !a && (e.addEventListener("touchmove", function() {}), a = !0)
      }, r.onActivateDrag = function() {
          this.handles = [this.viewport], this.bindHandles(), this.updateDraggable()
      }, r.onDeactivateDrag = function() {
          this.unbindHandles(), this.element.classList.remove("is-draggable")
      }, r.updateDraggable = function() {
          ">1" == this.options.draggable ? this.isDraggable = this.slides.length > 1 : this.isDraggable = this.options.draggable, this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
      }, r.bindDrag = function() {
          this.options.draggable = !0, this.updateDraggable()
      }, r.unbindDrag = function() {
          this.options.draggable = !1, this.updateDraggable()
      }, r._uiChangeDrag = function() {
          delete this.isFreeScrolling
      }, r._childUIPointerDownDrag = function(e) {
          e.preventDefault(), this.pointerDownFocus(e)
      }, r.pointerDown = function(t, n) {
          this.isDraggable ? this.okayPointerDown(t) && (this._pointerDownPreventDefault(t), this.pointerDownFocus(t), document.activeElement != this.element && this.pointerDownBlur(), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this.pointerDownScroll = o(), e.addEventListener("scroll", this), this._pointerDownDefault(t, n)) : this._pointerDownDefault(t, n)
      }, r._pointerDownDefault = function(e, t) {
          this.pointerDownPointer = t, this._bindPostStartEvents(e), this.dispatchEvent("pointerDown", e, [t])
      };
      var l = {
          INPUT: !0,
          TEXTAREA: !0,
          SELECT: !0
      };
      return r.pointerDownFocus = function(e) {
          l[e.target.nodeName] || this.focus()
      }, r._pointerDownPreventDefault = function(e) {
          var t = "touchstart" == e.type,
              n = "touch" == e.pointerType,
              i = l[e.target.nodeName];
          t || n || i || e.preventDefault()
      }, r.hasDragStarted = function(e) {
          return Math.abs(e.x) > this.options.dragThreshold
      }, r.pointerUp = function(e, t) {
          delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", e, [t]), this._dragPointerUp(e, t)
      }, r.pointerDone = function() {
          e.removeEventListener("scroll", this), delete this.pointerDownScroll
      }, r.dragStart = function(t, n) {
          this.isDraggable && (this.dragStartPosition = this.x, this.startAnimation(), e.removeEventListener("scroll", this), this.dispatchEvent("dragStart", t, [n]))
      }, r.pointerMove = function(e, t) {
          var n = this._dragPointerMove(e, t);
          this.dispatchEvent("pointerMove", e, [t, n]), this._dragMove(e, t, n)
      }, r.dragMove = function(e, t, n) {
          if (this.isDraggable) {
              e.preventDefault(), this.previousDragX = this.dragX;
              var i = this.options.rightToLeft ? -1 : 1;
              this.options.wrapAround && (n.x = n.x % this.slideableWidth);
              var o = this.dragStartPosition + n.x * i;
              if (!this.options.wrapAround && this.slides.length) {
                  var r = Math.max(-this.slides[0].target, this.dragStartPosition);
                  o = o > r ? .5 * (o + r) : o;
                  var s = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                  o = o < s ? .5 * (o + s) : o
              }
              this.dragX = o, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", e, [t, n])
          }
      }, r.dragEnd = function(e, t) {
          if (this.isDraggable) {
              this.options.freeScroll && (this.isFreeScrolling = !0);
              var n = this.dragEndRestingSelect();
              if (this.options.freeScroll && !this.options.wrapAround) {
                  var i = this.getRestingPosition();
                  this.isFreeScrolling = -i > this.slides[0].target && -i < this.getLastSlide().target
              } else this.options.freeScroll || n != this.selectedIndex || (n += this.dragEndBoostSelect());
              delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(n), delete this.isDragSelect, this.dispatchEvent("dragEnd", e, [t])
          }
      }, r.dragEndRestingSelect = function() {
          var e = this.getRestingPosition(),
              t = Math.abs(this.getSlideDistance(-e, this.selectedIndex)),
              n = this._getClosestResting(e, t, 1),
              i = this._getClosestResting(e, t, -1);
          return n.distance < i.distance ? n.index : i.index
      }, r._getClosestResting = function(e, t, n) {
          for (var i = this.selectedIndex, o = 1 / 0, r = this.options.contain && !this.options.wrapAround ? function(e, t) {
                  return e <= t
              } : function(e, t) {
                  return e < t
              }; r(t, o) && (i += n, o = t, null !== (t = this.getSlideDistance(-e, i)));) t = Math.abs(t);
          return {
              distance: o,
              index: i - n
          }
      }, r.getSlideDistance = function(e, t) {
          var n = this.slides.length,
              o = this.options.wrapAround && n > 1,
              r = o ? i.modulo(t, n) : t,
              s = this.slides[r];
          if (!s) return null;
          var a = o ? this.slideableWidth * Math.floor(t / n) : 0;
          return e - (s.target + a)
      }, r.dragEndBoostSelect = function() {
          if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100) return 0;
          var e = this.getSlideDistance(-this.dragX, this.selectedIndex),
              t = this.previousDragX - this.dragX;
          return e > 0 && t > 0 ? 1 : e < 0 && t < 0 ? -1 : 0
      }, r.staticClick = function(e, t) {
          var n = this.getParentCell(e.target),
              i = n && n.element,
              o = n && this.cells.indexOf(n);
          this.dispatchEvent("staticClick", e, [t, i, o])
      }, r.onscroll = function() {
          var e = o(),
              t = this.pointerDownScroll.x - e.x,
              n = this.pointerDownScroll.y - e.y;
          (Math.abs(t) > 3 || Math.abs(n) > 3) && this._pointerDone()
      }, t
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function(n) {
          return t(e, n)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("unipointer")) : e.TapListener = t(e, e.Unipointer)
  }(window, function(e, t) {
      function n(e) {
          this.bindTap(e)
      }
      var i = n.prototype = Object.create(t.prototype);
      return i.bindTap = function(e) {
          e && (this.unbindTap(), this.tapElement = e, this._bindStartEvent(e, !0))
      }, i.unbindTap = function() {
          this.tapElement && (this._bindStartEvent(this.tapElement, !0), delete this.tapElement)
      }, i.pointerUp = function(n, i) {
          if (!this.isIgnoringMouseUp || "mouseup" != n.type) {
              var o = t.getPointerPoint(i),
                  r = this.tapElement.getBoundingClientRect(),
                  s = e.pageXOffset,
                  a = e.pageYOffset;
              if (o.x >= r.left + s && o.x <= r.right + s && o.y >= r.top + a && o.y <= r.bottom + a && this.emitEvent("tap", [n, i]), "mouseup" != n.type) {
                  this.isIgnoringMouseUp = !0;
                  var l = this;
                  setTimeout(function() {
                      delete l.isIgnoringMouseUp
                  }, 400)
              }
          }
      }, i.destroy = function() {
          this.pointerDone(), this.unbindTap()
      }, n
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(n, i, o) {
          return t(e, n, i, o)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : t(e, e.Flickity, e.TapListener, e.fizzyUIUtils)
  }(window, function(e, t, n, i) {
      "use strict";

      function o(e, t) {
          this.direction = e, this.parent = t, this._create()
      }
      var r = "http://www.w3.org/2000/svg";
      o.prototype = Object.create(n.prototype), o.prototype._create = function() {
          this.isEnabled = !0, this.isPrevious = -1 == this.direction;
          var e = this.parent.options.rightToLeft ? 1 : -1;
          this.isLeft = this.direction == e;
          var t = this.element = document.createElement("button");
          t.className = "flickity-button flickity-prev-next-button", t.className += this.isPrevious ? " previous" : " next", t.setAttribute("type", "button"), this.disable(), t.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
          var n = this.createSVG();
          t.appendChild(n), this.on("tap", this.onTap), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
      }, o.prototype.activate = function() {
          this.bindTap(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element)
      }, o.prototype.deactivate = function() {
          this.parent.element.removeChild(this.element), n.prototype.destroy.call(this), this.element.removeEventListener("click", this)
      }, o.prototype.createSVG = function() {
          var e = document.createElementNS(r, "svg");
          e.setAttribute("class", "flickity-button-icon"), e.setAttribute("viewBox", "0 0 100 100");
          var t = document.createElementNS(r, "path"),
              n = function(e) {
                  return "string" == typeof e ? e : "M " + e.x0 + ",50 L " + e.x1 + "," + (e.y1 + 50) + " L " + e.x2 + "," + (e.y2 + 50) + " L " + e.x3 + ",50  L " + e.x2 + "," + (50 - e.y2) + " L " + e.x1 + "," + (50 - e.y1) + " Z"
              }(this.parent.options.arrowShape);
          return t.setAttribute("d", n), t.setAttribute("class", "arrow"), this.isLeft || t.setAttribute("transform", "translate(100, 100) rotate(180) "), e.appendChild(t), e
      }, o.prototype.onTap = function() {
          if (this.isEnabled) {
              this.parent.uiChange();
              var e = this.isPrevious ? "previous" : "next";
              this.parent[e]()
          }
      }, o.prototype.handleEvent = i.handleEvent, o.prototype.onclick = function(e) {
          var t = document.activeElement;
          t && t == this.element && this.onTap(e, e)
      }, o.prototype.enable = function() {
          this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
      }, o.prototype.disable = function() {
          this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
      }, o.prototype.update = function() {
          var e = this.parent.slides;
          if (this.parent.options.wrapAround && e.length > 1) this.enable();
          else {
              var t = e.length ? e.length - 1 : 0,
                  n = this.isPrevious ? 0 : t;
              this[this.parent.selectedIndex == n ? "disable" : "enable"]()
          }
      }, o.prototype.destroy = function() {
          this.deactivate()
      }, i.extend(t.defaults, {
          prevNextButtons: !0,
          arrowShape: {
              x0: 10,
              x1: 60,
              y1: 50,
              x2: 70,
              y2: 40,
              x3: 30
          }
      }), t.createMethods.push("_createPrevNextButtons");
      var s = t.prototype;
      return s._createPrevNextButtons = function() {
          this.options.prevNextButtons && (this.prevButton = new o(-1, this), this.nextButton = new o(1, this), this.on("activate", this.activatePrevNextButtons))
      }, s.activatePrevNextButtons = function() {
          this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
      }, s.deactivatePrevNextButtons = function() {
          this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
      }, t.PrevNextButton = o, t
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(n, i, o) {
          return t(e, n, i, o)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : t(e, e.Flickity, e.TapListener, e.fizzyUIUtils)
  }(window, function(e, t, n, i) {
      function o(e) {
          this.parent = e, this._create()
      }
      o.prototype = new n, o.prototype._create = function() {
          this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.on("tap", this.onTap), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
      }, o.prototype.activate = function() {
          this.setDots(), this.bindTap(this.holder), this.parent.element.appendChild(this.holder)
      }, o.prototype.deactivate = function() {
          this.parent.element.removeChild(this.holder), n.prototype.destroy.call(this)
      }, o.prototype.setDots = function() {
          var e = this.parent.slides.length - this.dots.length;
          e > 0 ? this.addDots(e) : e < 0 && this.removeDots(-e)
      }, o.prototype.addDots = function(e) {
          for (var t = document.createDocumentFragment(), n = [], i = this.dots.length, o = i + e, r = i; r < o; r++) {
              var s = document.createElement("li");
              s.className = "dot", s.setAttribute("aria-label", "Page dot " + (r + 1)), t.appendChild(s), n.push(s)
          }
          this.holder.appendChild(t), this.dots = this.dots.concat(n)
      }, o.prototype.removeDots = function(e) {
          this.dots.splice(this.dots.length - e, e).forEach(function(e) {
              this.holder.removeChild(e)
          }, this)
      }, o.prototype.updateSelected = function() {
          this.selectedDot && (this.selectedDot.className = "dot", this.selectedDot.removeAttribute("aria-current")), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected", this.selectedDot.setAttribute("aria-current", "step"))
      }, o.prototype.onTap = function(e) {
          var t = e.target;
          if ("LI" == t.nodeName) {
              this.parent.uiChange();
              var n = this.dots.indexOf(t);
              this.parent.select(n)
          }
      }, o.prototype.destroy = function() {
          this.deactivate()
      }, t.PageDots = o, i.extend(t.defaults, {
          pageDots: !0
      }), t.createMethods.push("_createPageDots");
      var r = t.prototype;
      return r._createPageDots = function() {
          this.options.pageDots && (this.pageDots = new o(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots))
      }, r.activatePageDots = function() {
          this.pageDots.activate()
      }, r.updateSelectedPageDots = function() {
          this.pageDots.updateSelected()
      }, r.updatePageDots = function() {
          this.pageDots.setDots()
      }, r.deactivatePageDots = function() {
          this.pageDots.deactivate()
      }, t.PageDots = o, t
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(e, n, i) {
          return t(e, n, i)
      }) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : t(e.EvEmitter, e.fizzyUIUtils, e.Flickity)
  }(window, function(e, t, n) {
      function i(e) {
          this.parent = e, this.state = "stopped", this.onVisibilityChange = this.visibilityChange.bind(this), this.onVisibilityPlay = this.visibilityPlay.bind(this)
      }
      i.prototype = Object.create(e.prototype), i.prototype.play = function() {
          if ("playing" != this.state) {
              if (document.hidden) return void document.addEventListener("visibilitychange", this.onVisibilityPlay);
              this.state = "playing", document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick()
          }
      }, i.prototype.tick = function() {
          if ("playing" == this.state) {
              var e = this.parent.options.autoPlay;
              e = "number" == typeof e ? e : 3e3;
              var t = this;
              this.clear(), this.timeout = setTimeout(function() {
                  t.parent.next(!0), t.tick()
              }, e)
          }
      }, i.prototype.stop = function() {
          this.state = "stopped", this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange)
      }, i.prototype.clear = function() {
          clearTimeout(this.timeout)
      }, i.prototype.pause = function() {
          "playing" == this.state && (this.state = "paused", this.clear())
      }, i.prototype.unpause = function() {
          "paused" == this.state && this.play()
      }, i.prototype.visibilityChange = function() {
          this[document.hidden ? "pause" : "unpause"]()
      }, i.prototype.visibilityPlay = function() {
          this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay)
      }, t.extend(n.defaults, {
          pauseAutoPlayOnHover: !0
      }), n.createMethods.push("_createPlayer");
      var o = n.prototype;
      return o._createPlayer = function() {
          this.player = new i(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
      }, o.activatePlayer = function() {
          this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this))
      }, o.playPlayer = function() {
          this.player.play()
      }, o.stopPlayer = function() {
          this.player.stop()
      }, o.pausePlayer = function() {
          this.player.pause()
      }, o.unpausePlayer = function() {
          this.player.unpause()
      }, o.deactivatePlayer = function() {
          this.player.stop(), this.element.removeEventListener("mouseenter", this)
      }, o.onmouseenter = function() {
          this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this))
      }, o.onmouseleave = function() {
          this.player.unpause(), this.element.removeEventListener("mouseleave", this)
      }, n.Player = i, n
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(n, i) {
          return t(e, n, i)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("fizzy-ui-utils")) : t(e, e.Flickity, e.fizzyUIUtils)
  }(window, function(e, t, n) {
      var i = t.prototype;
      return i.insert = function(e, t) {
          var n = this._makeCells(e);
          if (n && n.length) {
              var i = this.cells.length;
              t = void 0 === t ? i : t;
              var o = function(e) {
                      var t = document.createDocumentFragment();
                      return e.forEach(function(e) {
                          t.appendChild(e.element)
                      }), t
                  }(n),
                  r = t == i;
              if (r) this.slider.appendChild(o);
              else {
                  var s = this.cells[t].element;
                  this.slider.insertBefore(o, s)
              }
              if (0 === t) this.cells = n.concat(this.cells);
              else if (r) this.cells = this.cells.concat(n);
              else {
                  var a = this.cells.splice(t, i - t);
                  this.cells = this.cells.concat(n).concat(a)
              }
              this._sizeCells(n), this.cellChange(t, !0)
          }
      }, i.append = function(e) {
          this.insert(e, this.cells.length)
      }, i.prepend = function(e) {
          this.insert(e, 0)
      }, i.remove = function(e) {
          var t = this.getCells(e);
          if (t && t.length) {
              var i = this.cells.length - 1;
              t.forEach(function(e) {
                  e.remove();
                  var t = this.cells.indexOf(e);
                  i = Math.min(t, i), n.removeFrom(this.cells, e)
              }, this), this.cellChange(i, !0)
          }
      }, i.cellSizeChange = function(e) {
          var t = this.getCell(e);
          if (t) {
              t.getSize();
              var n = this.cells.indexOf(t);
              this.cellChange(n)
          }
      }, i.cellChange = function(e, t) {
          var n = this.selectedElement;
          this._positionCells(e), this._getWrapShiftCells(), this.setGallerySize();
          var i = this.getCell(n);
          i && (this.selectedIndex = this.getCellSlideIndex(i)), this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex), this.emitEvent("cellChange", [e]), this.select(this.selectedIndex), t && this.positionSliderAtSelected()
      }, t
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(n, i) {
          return t(e, n, i)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("fizzy-ui-utils")) : t(e, e.Flickity, e.fizzyUIUtils)
  }(window, function(e, t, n) {
      "use strict";

      function i(e) {
          if ("IMG" == e.nodeName) {
              var t = e.getAttribute("data-flickity-lazyload"),
                  i = e.getAttribute("data-flickity-lazyload-src"),
                  o = e.getAttribute("data-flickity-lazyload-srcset");
              if (t || i || o) return [e]
          }
          var r = e.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");
          return n.makeArray(r)
      }

      function o(e, t) {
          this.img = e, this.flickity = t, this.load()
      }
      t.createMethods.push("_createLazyload");
      var r = t.prototype;
      return r._createLazyload = function() {
          this.on("select", this.lazyLoad)
      }, r.lazyLoad = function() {
          var e = this.options.lazyLoad;
          if (e) {
              var t = "number" == typeof e ? e : 0,
                  n = this.getAdjacentCellElements(t),
                  r = [];
              n.forEach(function(e) {
                  var t = i(e);
                  r = r.concat(t)
              }), r.forEach(function(e) {
                  new o(e, this)
              }, this)
          }
      }, o.prototype.handleEvent = n.handleEvent, o.prototype.load = function() {
          this.img.addEventListener("load", this), this.img.addEventListener("error", this);
          var e = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"),
              t = this.img.getAttribute("data-flickity-lazyload-srcset");
          this.img.src = e, t && this.img.setAttribute("srcset", t), this.img.removeAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload-src"), this.img.removeAttribute("data-flickity-lazyload-srcset")
      }, o.prototype.onload = function(e) {
          this.complete(e, "flickity-lazyloaded")
      }, o.prototype.onerror = function(e) {
          this.complete(e, "flickity-lazyerror")
      }, o.prototype.complete = function(e, t) {
          this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
          var n = this.flickity.getParentCell(this.img),
              i = n && n.element;
          this.flickity.cellSizeChange(i), this.img.classList.add(t), this.flickity.dispatchEvent("lazyLoad", e, i)
      }, t.LazyLoader = o, t
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], t) : "object" == typeof module && module.exports && (module.exports = t(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
  }(window, function(e) {
      return e
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], t) : "object" == typeof module && module.exports ? module.exports = t(require("flickity"), require("fizzy-ui-utils")) : e.Flickity = t(e.Flickity, e.fizzyUIUtils)
  }(window, function(e, t) {
      e.createMethods.push("_createAsNavFor");
      var n = e.prototype;
      return n._createAsNavFor = function() {
          this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
          var e = this.options.asNavFor;
          if (e) {
              var t = this;
              setTimeout(function() {
                  t.setNavCompanion(e)
              })
          }
      }, n.setNavCompanion = function(n) {
          n = t.getQueryElement(n);
          var i = e.data(n);
          if (i && i != this) {
              this.navCompanion = i;
              var o = this;
              this.onNavCompanionSelect = function() {
                  o.navCompanionSelect()
              }, i.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0)
          }
      }, n.navCompanionSelect = function(e) {
          if (this.navCompanion) {
              var t = this.navCompanion.selectedCells[0],
                  n = this.navCompanion.cells.indexOf(t),
                  i = n + this.navCompanion.selectedCells.length - 1,
                  o = Math.floor(function(e, t, n) {
                      return (t - e) * n + e
                  }(n, i, this.navCompanion.cellAlign));
              if (this.selectCell(o, !1, e), this.removeNavSelectedElements(), !(o >= this.cells.length)) {
                  var r = this.cells.slice(n, i + 1);
                  this.navSelectedElements = r.map(function(e) {
                      return e.element
                  }), this.changeNavSelectedClass("add")
              }
          }
      }, n.changeNavSelectedClass = function(e) {
          this.navSelectedElements.forEach(function(t) {
              t.classList[e]("is-nav-selected")
          })
      }, n.activateAsNavFor = function() {
          this.navCompanionSelect(!0)
      }, n.removeNavSelectedElements = function() {
          this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements)
      }, n.onNavStaticClick = function(e, t, n, i) {
          "number" == typeof i && this.navCompanion.selectCell(i)
      }, n.deactivateAsNavFor = function() {
          this.removeNavSelectedElements()
      }, n.destroyAsNavFor = function() {
          this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion)
      }, e
  }),
  function(e, t) {
      "use strict";
      "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function(n) {
          return t(e, n)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
  }("undefined" != typeof window ? window : this, function(e, t) {
      function n(e, t) {
          for (var n in t) e[n] = t[n];
          return e
      }

      function i(e, t, o) {
          if (!(this instanceof i)) return new i(e, t, o);
          var r = e;
          return "string" == typeof e && (r = document.querySelectorAll(e)), r ? (this.elements = function(e) {
              return Array.isArray(e) ? e : "object" == typeof e && "number" == typeof e.length ? l.call(e) : [e]
          }(r), this.options = n({}, this.options), "function" == typeof t ? o = t : n(this.options, t), o && this.on("always", o), this.getImages(), s && (this.jqDeferred = new s.Deferred), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (r || e))
      }

      function o(e) {
          this.img = e
      }

      function r(e, t) {
          this.url = e, this.element = t, this.img = new Image
      }
      var s = e.jQuery,
          a = e.console,
          l = Array.prototype.slice;
      i.prototype = Object.create(t.prototype), i.prototype.options = {}, i.prototype.getImages = function() {
          this.images = [], this.elements.forEach(this.addElementImages, this)
      }, i.prototype.addElementImages = function(e) {
          "IMG" == e.nodeName && this.addImage(e), !0 === this.options.background && this.addElementBackgroundImages(e);
          var t = e.nodeType;
          if (t && c[t]) {
              for (var n = e.querySelectorAll("img"), i = 0; i < n.length; i++) {
                  var o = n[i];
                  this.addImage(o)
              }
              if ("string" == typeof this.options.background) {
                  var r = e.querySelectorAll(this.options.background);
                  for (i = 0; i < r.length; i++) {
                      var s = r[i];
                      this.addElementBackgroundImages(s)
                  }
              }
          }
      };
      var c = {
          1: !0,
          9: !0,
          11: !0
      };
      return i.prototype.addElementBackgroundImages = function(e) {
          var t = getComputedStyle(e);
          if (t)
              for (var n = /url\((['"])?(.*?)\1\)/gi, i = n.exec(t.backgroundImage); null !== i;) {
                  var o = i && i[2];
                  o && this.addBackground(o, e), i = n.exec(t.backgroundImage)
              }
      }, i.prototype.addImage = function(e) {
          var t = new o(e);
          this.images.push(t)
      }, i.prototype.addBackground = function(e, t) {
          var n = new r(e, t);
          this.images.push(n)
      }, i.prototype.check = function() {
          function e(e, n, i) {
              setTimeout(function() {
                  t.progress(e, n, i)
              })
          }
          var t = this;
          return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(t) {
              t.once("progress", e), t.check()
          }) : void this.complete()
      }, i.prototype.progress = function(e, t, n) {
          this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + n, e, t)
      }, i.prototype.complete = function() {
          var e = this.hasAnyBroken ? "fail" : "done";
          if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
              var t = this.hasAnyBroken ? "reject" : "resolve";
              this.jqDeferred[t](this)
          }
      }, o.prototype = Object.create(t.prototype), o.prototype.check = function() {
          return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
      }, o.prototype.getIsImageComplete = function() {
          return this.img.complete && this.img.naturalWidth
      }, o.prototype.confirm = function(e, t) {
          this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
      }, o.prototype.handleEvent = function(e) {
          var t = "on" + e.type;
          this[t] && this[t](e)
      }, o.prototype.onload = function() {
          this.confirm(!0, "onload"), this.unbindEvents()
      }, o.prototype.onerror = function() {
          this.confirm(!1, "onerror"), this.unbindEvents()
      }, o.prototype.unbindEvents = function() {
          this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
      }, r.prototype = Object.create(o.prototype), r.prototype.check = function() {
          this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
      }, r.prototype.unbindEvents = function() {
          this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
      }, r.prototype.confirm = function(e, t) {
          this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
      }, i.makeJQueryPlugin = function(t) {
          (t = t || e.jQuery) && ((s = t).fn.imagesLoaded = function(e, t) {
              return new i(this, e, t).jqDeferred.promise(s(this))
          })
      }, i.makeJQueryPlugin(), i
  }),
  function(e, t) {
      "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function(n, i) {
          return t(e, n, i)
      }) : "object" == typeof module && module.exports ? module.exports = t(e, require("flickity"), require("imagesloaded")) : e.Flickity = t(e, e.Flickity, e.imagesLoaded)
  }(window, function(e, t, n) {
      "use strict";
      t.createMethods.push("_createImagesLoaded");
      var i = t.prototype;
      return i._createImagesLoaded = function() {
          this.on("activate", this.imagesLoaded)
      }, i.imagesLoaded = function() {
          if (this.options.imagesLoaded) {
              var e = this;
              n(this.slider).on("progress", function(t, n) {
                  var i = e.getParentCell(n.img);
                  e.cellSizeChange(i && i.element), e.options.freeScroll || e.positionSliderAtSelected()
              })
          }
      }, t
  }),
  function(e, t, n) {
      function i(e, t) {
          return typeof e === t
      }

      function o() {
          return "function" != typeof t.createElement ? t.createElement(arguments[0]) : h ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
      }

      function r() {
          var e = t.body;
          return e || ((e = o(h ? "svg" : "body")).fake = !0), e
      }
      var s = [],
          a = [],
          l = {
              _version: "3.3.1",
              _config: {
                  classPrefix: "",
                  enableClasses: !0,
                  enableJSClass: !0,
                  usePrefixes: !0
              },
              _q: [],
              on: function(e, t) {
                  var n = this;
                  setTimeout(function() {
                      t(n[e])
                  }, 0)
              },
              addTest: function(e, t, n) {
                  a.push({
                      name: e,
                      fn: t,
                      options: n
                  })
              },
              addAsyncTest: function(e) {
                  a.push({
                      name: null,
                      fn: e
                  })
              }
          },
          c = function() {};
      c.prototype = l, c = new c;
      var u = t.documentElement,
          h = "svg" === u.nodeName.toLowerCase(),
          d = l._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
      l._prefixes = d;
      var f = l.testStyles = function(e, n, i, s) {
          var a, l, c, h, d = "modernizr",
              f = o("div"),
              p = r();
          if (parseInt(i, 10))
              for (; i--;)(c = o("div")).id = s ? s[i] : d + (i + 1), f.appendChild(c);
          return (a = o("style")).type = "text/css", a.id = "s" + d, (p.fake ? p : f).appendChild(a), p.appendChild(f), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(t.createTextNode(e)), f.id = d, p.fake && (p.style.background = "", p.style.overflow = "hidden", h = u.style.overflow, u.style.overflow = "hidden", u.appendChild(p)), l = n(f, e), p.fake ? (p.parentNode.removeChild(p), u.style.overflow = h, u.offsetHeight) : f.parentNode.removeChild(f), !!l
      };
      c.addTest("touchevents", function() {
              var n;
              if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) n = !0;
              else {
                  var i = ["@media (", d.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
                  f(i, function(e) {
                      n = 9 === e.offsetTop
                  })
              }
              return n
          }),
          function() {
              var e, t, n, o, r, l;
              for (var u in a)
                  if (a.hasOwnProperty(u)) {
                      if (e = [], (t = a[u]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                          for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                      for (o = i(t.fn, "function") ? t.fn() : t.fn, r = 0; r < e.length; r++) 1 === (l = e[r].split(".")).length ? c[l[0]] = o : (!c[l[0]] || c[l[0]] instanceof Boolean || (c[l[0]] = new Boolean(c[l[0]])), c[l[0]][l[1]] = o), s.push((o ? "" : "no-") + l.join("-"))
                  }
          }(),
          function(e) {
              var t = u.className,
                  n = c._config.classPrefix || "";
              if (h && (t = t.baseVal), c._config.enableJSClass) {
                  var i = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
                  t = t.replace(i, "$1" + n + "js$2")
              }
              c._config.enableClasses && (t += " " + n + e.join(" " + n), h ? u.className.baseVal = t : u.className = t)
          }(s), delete l.addTest, delete l.addAsyncTest;
      for (var p = 0; p < c._q.length; p++) c._q[p]();
      e.Modernizr = c
  }(window, document),
  function(e, t) {
      "function" == typeof define && define.amd ? define([], function() {
          return t()
      }) : "object" == typeof exports ? module.exports = t() : e.Headhesive = t()
  }(this, function() {
      "use strict";
      var e = function(t, n) {
              for (var i in n) n.hasOwnProperty(i) && (t[i] = "object" == typeof n[i] ? e(t[i], n[i]) : n[i]);
              return t
          },
          t = function(e, t) {
              var n, i, o, r = Date.now || function() {
                      return (new Date).getTime()
                  },
                  s = null,
                  a = 0,
                  l = function() {
                      a = r(), s = null, o = e.apply(n, i), n = i = null
                  };
              return function() {
                  var c = r(),
                      u = t - (c - a);
                  return n = this, i = arguments, 0 >= u ? (clearTimeout(s), s = null, a = c, o = e.apply(n, i), n = i = null) : s || (s = setTimeout(l, u)), o
              }
          },
          n = function(t, n) {
              "querySelector" in document && "addEventListener" in window && (this.visible = !1, this.options = {
                  offset: 300,
                  offsetSide: "top",
                  classes: {
                      clone: "headhesive",
                      stick: "headhesive--stick",
                      unstick: "headhesive--unstick"
                  },
                  throttle: 250,
                  onInit: function() {},
                  onStick: function() {},
                  onUnstick: function() {},
                  onDestroy: function() {}
              }, this.elem = "string" == typeof t ? document.querySelector(t) : t, this.options = e(this.options, n), this.init())
          };
      return n.prototype = {
          constructor: n,
          init: function() {
              if (this.clonedElem = this.elem.cloneNode(!0), this.clonedElem.className += " " + this.options.classes.clone, document.body.insertBefore(this.clonedElem, document.body.firstChild), "number" == typeof this.options.offset) this.scrollOffset = this.options.offset;
              else {
                  if ("string" != typeof this.options.offset) throw new Error("Invalid offset: " + this.options.offset);
                  this._setScrollOffset()
              }
              this._throttleUpdate = t(this.update.bind(this), this.options.throttle), this._throttleScrollOffset = t(this._setScrollOffset.bind(this), this.options.throttle), window.addEventListener("scroll", this._throttleUpdate, !1), window.addEventListener("resize", this._throttleScrollOffset, !1), this.options.onInit.call(this)
          },
          _setScrollOffset: function() {
              "string" == typeof this.options.offset && (this.scrollOffset = function(e, t) {
                  for (var n = 0, i = e.offsetHeight; e;) n += e.offsetTop, e = e.offsetParent;
                  return "bottom" === t && (n += i), n
              }(document.querySelector(this.options.offset), this.options.offsetSide))
          },
          destroy: function() {
              document.body.removeChild(this.clonedElem), window.removeEventListener("scroll", this._throttleUpdate), window.removeEventListener("resize", this._throttleScrollOffset), this.options.onDestroy.call(this)
          },
          stick: function() {
              this.visible || (this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*", "g"), ""), this.clonedElem.className += " " + this.options.classes.stick, this.visible = !0, this.options.onStick.call(this))
          },
          unstick: function() {
              this.visible && (this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.stick + "(\\s|$)*", "g"), ""), this.clonedElem.className += " " + this.options.classes.unstick, this.visible = !1, this.options.onUnstick.call(this))
          },
          update: function() {
              (void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop) > this.scrollOffset ? this.stick() : this.unstick()
          }
      }, n
  }),
  function() {
      var e = function() {
          function e(e) {
              return decodeURIComponent(e.replace(/\+/g, " "))
          }

          function t(e, t) {
              var n = e.charAt(0),
                  i = t.split(n);
              return n === e ? i : i[(e = parseInt(e.substring(1), 10)) < 0 ? i.length + e : e - 1]
          }

          function n(t, n) {
              for (var i = t.charAt(0), o = n.split("&"), r = [], s = {}, a = [], l = t.substring(1), c = 0, u = o.length; c < u; c++)
                  if ((r = o[c].match(/(.*?)=(.*)/)) || (r = [o[c], o[c], ""]), "" !== r[1].replace(/\s/g, "")) {
                      if (r[2] = e(r[2] || ""), l === r[1]) return r[2];
                      (a = r[1].match(/(.*)\[([0-9]+)\]/)) ? (s[a[1]] = s[a[1]] || [], s[a[1]][a[2]] = r[2]) : s[r[1]] = r[2]
                  } return i === t ? s : s[l]
          }
          return function(e, i) {
              var o, r = {};
              if ("tld?" !== e) {
                  if (i = i || window.location.toString(), !e) return i;
                  if (e = e.toString(), o = i.match(/^mailto:([^\/].+)/)) r.protocol = "mailto", r.email = o[1];
                  else {
                      if ((o = i.match(/(.*?)\/#\!(.*)/)) && (i = o[1] + o[2]), (o = i.match(/(.*?)#(.*)/)) && (r.hash = o[2], i = o[1]), r.hash && e.match(/^#/)) return n(e, r.hash);
                      if ((o = i.match(/(.*?)\?(.*)/)) && (r.query = o[2], i = o[1]), r.query && e.match(/^\?/)) return n(e, r.query);
                      if ((o = i.match(/(.*?)\:?\/\/(.*)/)) && (r.protocol = o[1].toLowerCase(), i = o[2]), (o = i.match(/(.*?)(\/.*)/)) && (r.path = o[2], i = o[1]), r.path = (r.path || "").replace(/^([^\/])/, "/$1"), e.match(/^[\-0-9]+$/) && (e = e.replace(/^([^\/])/, "/$1")), e.match(/^\//)) return t(e, r.path.substring(1));
                      if ((o = t("/-1", r.path.substring(1))) && (o = o.match(/(.*?)\.(.*)/)) && (r.file = o[0], r.filename = o[1], r.fileext = o[2]), (o = i.match(/(.*)\:([0-9]+)$/)) && (r.port = o[2], i = o[1]), (o = i.match(/(.*?)@(.*)/)) && (r.auth = o[1], i = o[2]), r.auth && (o = r.auth.match(/(.*)\:(.*)/), r.user = o ? o[1] : r.auth, r.pass = o ? o[2] : void 0), r.hostname = i.toLowerCase(), "." === e.charAt(0)) return t(e, r.hostname);
                      r.port = r.port || ("https" === r.protocol ? "443" : "80"), r.protocol = r.protocol || ("443" === r.port ? "https" : "http")
                  }
                  return e in r ? r[e] : "{}" === e ? r : void 0
              }
          }
      }();
      "function" == typeof window.define && window.define.amd ? window.define("js-url", [], function() {
          return e
      }) : (void 0 !== window.jQuery && window.jQuery.extend({
          url: function(e, t) {
              return window.url(e, t)
          }
      }), window.url = e)
  }();
var objectFitImages = function() {
  "use strict";

  function e(e, t, n) {
      var i = function(e, t) {
          return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + e + "' height='" + t + "'%3E%3C/svg%3E"
      }(t || 1, n || 0);
      d.call(e, "src") !== i && f.call(e, "src", i)
  }

  function t(e, n) {
      e.naturalWidth ? n(e) : setTimeout(t, 100, e, n)
  }

  function n(n) {
      var o = function(e) {
              for (var t, n = getComputedStyle(e).fontFamily, i = {}; null !== (t = s.exec(n));) i[t[1]] = t[2];
              return i
          }(n),
          a = n[r];
      if (o["object-fit"] = o["object-fit"] || "fill", !a.img) {
          if ("fill" === o["object-fit"]) return;
          if (!a.skipTest && l && !o["object-position"]) return
      }
      if (!a.img) {
          a.img = new Image(n.width, n.height), a.img.srcset = d.call(n, "data-ofi-srcset") || n.srcset, a.img.src = d.call(n, "data-ofi-src") || n.src, f.call(n, "data-ofi-src", n.src), n.srcset && f.call(n, "data-ofi-srcset", n.srcset), e(n, n.naturalWidth || n.width, n.naturalHeight || n.height), n.srcset && (n.srcset = "");
          try {
              i(n)
          } catch (n) {
              window.console && console.warn("https://bit.ly/ofi-old-browser")
          }
      }(function(e) {
          if (e.srcset && !h && window.picturefill) {
              var t = window.picturefill._;
              e[t.ns] && e[t.ns].evaled || t.fillImg(e, {
                  reselect: !0
              }), e[t.ns].curSrc || (e[t.ns].supported = !1, t.fillImg(e, {
                  reselect: !0
              })), e.currentSrc = e[t.ns].curSrc || e.src
          }
      })(a.img), n.style.backgroundImage = 'url("' + (a.img.currentSrc || a.img.src).replace(/"/g, '\\"') + '")', n.style.backgroundPosition = o["object-position"] || "center", n.style.backgroundRepeat = "no-repeat", n.style.backgroundOrigin = "content-box", /scale-down/.test(o["object-fit"]) ? t(a.img, function() {
          a.img.naturalWidth > n.width || a.img.naturalHeight > n.height ? n.style.backgroundSize = "contain" : n.style.backgroundSize = "auto"
      }) : n.style.backgroundSize = o["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), t(a.img, function(t) {
          e(n, t.naturalWidth, t.naturalHeight)
      })
  }

  function i(e) {
      var t = {
          get: function(t) {
              return e[r].img[t || "src"]
          },
          set: function(t, i) {
              return e[r].img[i || "src"] = t, f.call(e, "data-ofi-" + i, t), n(e), t
          }
      };
      Object.defineProperty(e, "src", t), Object.defineProperty(e, "currentSrc", {
          get: function() {
              return t.get("currentSrc")
          }
      }), Object.defineProperty(e, "srcset", {
          get: function() {
              return t.get("srcset")
          },
          set: function(e) {
              return t.set(e, "srcset")
          }
      })
  }

  function o(e, t) {
      var i = !p && !e;
      if (t = t || {}, e = e || "img", c && !t.skipTest || !u) return !1;
      "img" === e ? e = document.getElementsByTagName("img") : "string" == typeof e ? e = document.querySelectorAll(e) : "length" in e || (e = [e]);
      for (var s = 0; s < e.length; s++) e[s][r] = e[s][r] || {
          skipTest: t.skipTest
      }, n(e[s]);
      i && (document.body.addEventListener("load", function(e) {
          "IMG" === e.target.tagName && o(e.target, {
              skipTest: t.skipTest
          })
      }, !0), p = !0, e = "img"), t.watchMQ && window.addEventListener("resize", o.bind(null, e, {
          skipTest: t.skipTest
      }))
  }
  var r = "bfred-it:object-fit-images",
      s = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g,
      a = "undefined" == typeof Image ? {
          style: {
              "object-position": 1
          }
      } : new Image,
      l = "object-fit" in a.style,
      c = "object-position" in a.style,
      u = "background-size" in a.style,
      h = "string" == typeof a.currentSrc,
      d = a.getAttribute,
      f = a.setAttribute,
      p = !1;
  return o.supportsObjectFit = l, o.supportsObjectPosition = c,
      function() {
          function e(e, t) {
              return e[r] && e[r].img && ("src" === t || "srcset" === t) ? e[r].img : e
          }
          c || (HTMLImageElement.prototype.getAttribute = function(t) {
              return d.call(e(this, t), t)
          }, HTMLImageElement.prototype.setAttribute = function(t, n) {
              return f.call(e(this, t), t, String(n))
          })
      }(), o
}();
! function(e) {
  e.extend(e.expr[":"], {
      "off-top": function(t) {
          return e(t).offset().top < e(window).scrollTop()
      },
      "off-right": function(t) {
          return e(t).offset().left + e(t).outerWidth() - e(window).scrollLeft() > e(window).width()
      },
      "off-bottom": function(t) {
          return e(t).offset().top + e(t).outerHeight() - e(window).scrollTop() > e(window).height()
      },
      "off-left": function(t) {
          return e(t).offset().left < e(window).scrollLeft()
      },
      "off-screen": function(t) {
          return e(t).is(":off-top, :off-right, :off-bottom, :off-left")
      }
  })
}(jQuery),
function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.lazyframe = t()
}(this, function() {
  "use strict";
  var e = Object.assign || function(e) {
      for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
      }
      return e
  };
  return function() {
      function t(e) {
          var t = this;
          if (e instanceof HTMLElement != 0 && !e.classList.contains("lazyframe--loaded")) {
              var i = {
                  el: e,
                  settings: n(e)
              };
              i.el.addEventListener("click", function() {
                  i.el.appendChild(i.iframe);
                  var n = e.querySelectorAll("iframe");
                  i.settings.onAppend.call(t, n[0])
              }), s.lazyload ? r(i) : o(i, i.settings.thumbnail)
          }
      }

      function n(t) {
          var n = Array.prototype.slice.apply(t.attributes).filter(function(e) {
                  return "" !== e.value
              }).reduce(function(e, t) {
                  return e[0 === t.name.indexOf("data-") ? t.name.split("data-")[1] : t.name] = t.value, e
              }, {}),
              o = e({}, s, n, {
                  y: t.offsetTop,
                  parameters: i(n.src)
              });
          if (o.vendor) {
              var r = o.src.match(c.regex[o.vendor]);
              o.id = c.condition[o.vendor](r)
          }
          return o
      }

      function i(e) {
          var t = e.split("?");
          return t[1] ? -1 !== (t = t[1]).indexOf("autoplay") ? t : t + "&autoplay=1" : "autoplay=1"
      }

      function o(e) {
          var t = this;
          ! function(e) {
              return !(!e.vendor || e.title && e.thumbnail || ("youtube" === e.vendor || "youtube_nocookie" === e.vendor) && !e.apikey)
          }(e.settings) ? r(e, !0): function(e, t) {
              var n = c.endpoints[e.settings.vendor](e.settings),
                  i = new XMLHttpRequest;
              i.open("GET", n, !0), i.onload = function() {
                  if (i.status >= 200 && i.status < 400) {
                      var n = JSON.parse(i.responseText);
                      t(null, [n, e])
                  } else t(!0)
              }, i.onerror = function() {
                  t(!0)
              }, i.send()
          }(e, function(n, i) {
              if (!n) {
                  var o = i[0],
                      s = i[1];
                  if (s.settings.title || (s.settings.title = c.response[s.settings.vendor].title(o)), !s.settings.thumbnail) {
                      var a = c.response[s.settings.vendor].thumbnail(o);
                      s.settings.thumbnail = a, e.settings.onThumbnailLoad.call(t, a)
                  }
                  r(s, !0)
              }
          })
      }

      function r(e, t) {
          if (e.iframe = function(e) {
                  var t = document.createDocumentFragment(),
                      n = document.createElement("iframe");
                  if (e.vendor && (e.src = c.src[e.vendor](e)), n.setAttribute("id", "lazyframe-" + e.id), n.setAttribute("src", e.src), n.setAttribute("frameborder", 0), n.setAttribute("allowfullscreen", ""), "vine" === e.vendor) {
                      var i = document.createElement("script");
                      i.setAttribute("src", "https://platform.vine.co/static/scripts/embed.js"), t.appendChild(i)
                  }
                  return t.appendChild(n), t
              }(e.settings), e.settings.thumbnail && t && (e.el.style.backgroundImage = "url(" + e.settings.thumbnail + ")"), e.settings.title && 0 === e.el.children.length) {
              var n = document.createDocumentFragment(),
                  i = document.createElement("span");
              i.className = "lazyframe__title", i.innerHTML = e.settings.title, n.appendChild(i), e.el.appendChild(n)
          }
          s.lazyload || (e.el.classList.add("lazyframe--loaded"), e.settings.onLoad.call(this, e), a.push(e)), e.settings.initialized || a.push(e)
      }
      var s = void 0,
          a = [],
          l = {
              vendor: void 0,
              id: void 0,
              src: void 0,
              thumbnail: void 0,
              title: void 0,
              apikey: void 0,
              initialized: !1,
              parameters: void 0,
              y: void 0,
              debounce: 250,
              lazyload: !0,
              initinview: !1,
              onLoad: function(e) {},
              onAppend: function(e) {},
              onThumbnailLoad: function(e) {}
          },
          c = {
              regex: {
                  youtube_nocookie: /(?:youtube-nocookie\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=)))([a-zA-Z0-9_-]{6,11})/,
                  youtube: /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/,
                  vimeo: /vimeo\.com\/(?:video\/)?([0-9]*)(?:\?|)/,
                  vine: /vine.co\/v\/(.*)/
              },
              condition: {
                  youtube: function(e) {
                      return !(!e || 11 != e[1].length) && e[1]
                  },
                  youtube_nocookie: function(e) {
                      return !(!e || 11 != e[1].length) && e[1]
                  },
                  vimeo: function(e) {
                      return !!(e && 9 === e[1].length || 8 === e[1].length) && e[1]
                  },
                  vine: function(e) {
                      return !(!e || 11 !== e[1].length) && e[1]
                  }
              },
              src: {
                  youtube: function(e) {
                      return "https://www.youtube.com/embed/" + e.id + "/?" + e.parameters
                  },
                  youtube_nocookie: function(e) {
                      return "https://www.youtube-nocookie.com/embed/" + e.id + "/?" + e.parameters
                  },
                  vimeo: function(e) {
                      return "https://player.vimeo.com/video/" + e.id + "/?" + e.parameters
                  },
                  vine: function(e) {
                      return "https://vine.co/v/" + e.id + "/embed/simple"
                  }
              },
              endpoints: {
                  youtube: function(e) {
                      return "https://www.googleapis.com/youtube/v3/videos?id=" + e.id + "&key=" + e.apikey + "&fields=items(snippet(title,thumbnails))&part=snippet"
                  },
                  youtube_nocookie: function(e) {
                      return "https://www.googleapis.com/youtube/v3/videos?id=" + e.id + "&key=" + e.apikey + "&fields=items(snippet(title,thumbnails))&part=snippet"
                  },
                  vimeo: function(e) {
                      return "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + e.id
                  },
                  vine: function(e) {
                      return "https://vine.co/oembed.json?url=https%3A%2F%2Fvine.co%2Fv%2F" + e.id
                  }
              },
              response: {
                  youtube: {
                      title: function(e) {
                          return e.items[0].snippet.title
                      },
                      thumbnail: function(e) {
                          var t = e.items[0].snippet.thumbnails;
                          return (t.maxres || t.standard || t.high || t.medium || t.default).url
                      }
                  },
                  youtube_nocookie: {
                      title: function(e) {
                          return e.items[0].snippet.title
                      },
                      thumbnail: function(e) {
                          var t = e.items[0].snippet.thumbnails;
                          return (t.maxres || t.standard || t.high || t.medium || t.default).url
                      }
                  },
                  vimeo: {
                      title: function(e) {
                          return e.title
                      },
                      thumbnail: function(e) {
                          return e.thumbnail_url
                      }
                  },
                  vine: {
                      title: function(e) {
                          return e.title
                      },
                      thumbnail: function(e) {
                          return e.thumbnail_url
                      }
                  }
              }
          };
      return function(n) {
          if (s = e({}, l, arguments.length <= 1 ? void 0 : arguments[1]), "string" == typeof n)
              for (var i = document.querySelectorAll(n), r = 0; r < i.length; r++) t(i[r]);
          else if (void 0 === n.length) t(n);
          else if (n.length > 1)
              for (var c = 0; c < n.length; c++) t(n[c]);
          else t(n[0]);
          s.lazyload && function() {
              var e = this,
                  t = window.innerHeight,
                  n = a.length,
                  i = function(t, i) {
                      t.settings.initialized = !0, t.el.classList.add("lazyframe--loaded"), n--, o(t), t.settings.initinview && t.el.click(), t.settings.onLoad.call(e, t)
                  };
              a.filter(function(e) {
                  return e.settings.y < t
              }).forEach(i);
              var r = function(e, t, n) {
                      var i = void 0;
                      return function() {
                          var o = this,
                              r = arguments,
                              s = n;
                          clearTimeout(i), i = setTimeout(function() {
                              i = null, e.apply(o, r)
                          }, t), s && e.apply(o, r)
                      }
                  }(function() {
                      c = l < window.pageYOffset, l = window.pageYOffset, c && a.filter(function(e) {
                          return e.settings.y < t + l && !1 === e.settings.initialized
                      }).forEach(i), 0 === n && window.removeEventListener("scroll", r, !1)
                  }, s.debounce),
                  l = 0,
                  c = !1;
              window.addEventListener("scroll", r, !1)
          }()
      }
  }()
}),
function(e, t, n, i) {
  "use strict";

  function o(e, t) {
      var i, o, r, s = [],
          a = 0;
      e && e.isDefaultPrevented() || (e.preventDefault(), t = t || {}, e && e.data && (t = f(e.data.options, t)), i = t.$target || n(e.currentTarget).trigger("blur"), (r = n.fancybox.getInstance()) && r.$trigger && r.$trigger.is(i) || (t.selector ? s = n(t.selector) : (o = i.attr("data-fancybox") || "") ? s = (s = e.data ? e.data.items : []).length ? s.filter('[data-fancybox="' + o + '"]') : n('[data-fancybox="' + o + '"]') : s = [i], (a = n(s).index(i)) < 0 && (a = 0), (r = n.fancybox.open(s, t, a)).$trigger = i))
  }
  if (e.console = e.console || {
          info: function(e) {}
      }, n) {
      if (n.fn.fancybox) return void console.info("fancyBox already initialized");
      var r = {
              closeExisting: !1,
              loop: !1,
              gutter: 50,
              keyboard: !0,
              preventCaptionOverlap: !0,
              arrows: !0,
              infobar: !0,
              smallBtn: "auto",
              toolbar: "auto",
              buttons: ["zoom", "slideShow", "thumbs", "close"],
              idleTime: 3,
              protect: !1,
              modal: !1,
              image: {
                  preload: !1
              },
              ajax: {
                  settings: {
                      data: {
                          fancybox: !0
                      }
                  }
              },
              iframe: {
                  tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                  preload: !0,
                  css: {},
                  attr: {
                      scrolling: "auto"
                  }
              },
              video: {
                  tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                  format: "",
                  autoStart: !0
              },
              defaultType: "image",
              animationEffect: "zoom",
              animationDuration: 366,
              zoomOpacity: "auto",
              transitionEffect: "fade",
              transitionDuration: 366,
              slideClass: "",
              baseClass: "",
              baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
              spinnerTpl: '<div class="fancybox-loading"></div>',
              errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
              btnTpl: {
                  download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                  zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                  close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                  arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                  arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                  smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
              },
              parentEl: "body",
              hideScrollbar: !0,
              autoFocus: !0,
              backFocus: !0,
              trapFocus: !0,
              fullScreen: {
                  autoStart: !1
              },
              touch: {
                  vertical: !0,
                  momentum: !0
              },
              hash: null,
              media: {},
              slideShow: {
                  autoStart: !1,
                  speed: 3e3
              },
              thumbs: {
                  autoStart: !1,
                  hideOnClose: !0,
                  parentEl: ".fancybox-container",
                  axis: "y"
              },
              wheel: "auto",
              onInit: n.noop,
              beforeLoad: n.noop,
              afterLoad: n.noop,
              beforeShow: n.noop,
              afterShow: n.noop,
              beforeClose: n.noop,
              afterClose: n.noop,
              onActivate: n.noop,
              onDeactivate: n.noop,
              clickContent: function(e, t) {
                  return "image" === e.type && "zoom"
              },
              clickSlide: "close",
              clickOutside: "close",
              dblclickContent: !1,
              dblclickSlide: !1,
              dblclickOutside: !1,
              mobile: {
                  preventCaptionOverlap: !1,
                  idleTime: !1,
                  clickContent: function(e, t) {
                      return "image" === e.type && "toggleControls"
                  },
                  clickSlide: function(e, t) {
                      return "image" === e.type ? "toggleControls" : "close"
                  },
                  dblclickContent: function(e, t) {
                      return "image" === e.type && "zoom"
                  },
                  dblclickSlide: function(e, t) {
                      return "image" === e.type && "zoom"
                  }
              },
              lang: "en",
              i18n: {
                  en: {
                      CLOSE: "Close",
                      NEXT: "Next",
                      PREV: "Previous",
                      ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                      PLAY_START: "Start slideshow",
                      PLAY_STOP: "Pause slideshow",
                      FULL_SCREEN: "Full screen",
                      THUMBS: "Thumbnails",
                      DOWNLOAD: "Download",
                      SHARE: "Share",
                      ZOOM: "Zoom"
                  },
                  de: {
                      CLOSE: "Schlie&szlig;en",
                      NEXT: "Weiter",
                      PREV: "Zur&uuml;ck",
                      ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                      PLAY_START: "Diaschau starten",
                      PLAY_STOP: "Diaschau beenden",
                      FULL_SCREEN: "Vollbild",
                      THUMBS: "Vorschaubilder",
                      DOWNLOAD: "Herunterladen",
                      SHARE: "Teilen",
                      ZOOM: "Vergr&ouml;&szlig;ern"
                  }
              }
          },
          s = n(e),
          a = n(t),
          l = 0,
          c = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || function(t) {
              return e.setTimeout(t, 1e3 / 60)
          },
          u = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.oCancelAnimationFrame || function(t) {
              e.clearTimeout(t)
          },
          h = function() {
              var e, n = t.createElement("fakeelement"),
                  i = {
                      transition: "transitionend",
                      OTransition: "oTransitionEnd",
                      MozTransition: "transitionend",
                      WebkitTransition: "webkitTransitionEnd"
                  };
              for (e in i)
                  if (void 0 !== n.style[e]) return i[e];
              return "transitionend"
          }(),
          d = function(e) {
              return e && e.length && e[0].offsetHeight
          },
          f = function(e, t) {
              var i = n.extend(!0, {}, e, t);
              return n.each(t, function(e, t) {
                  n.isArray(t) && (i[e] = t)
              }), i
          },
          p = function(e) {
              var i, o;
              return !(!e || e.ownerDocument !== t) && (n(".fancybox-container").css("pointer-events", "none"), i = {
                  x: e.getBoundingClientRect().left + e.offsetWidth / 2,
                  y: e.getBoundingClientRect().top + e.offsetHeight / 2
              }, o = t.elementFromPoint(i.x, i.y) === e, n(".fancybox-container").css("pointer-events", ""), o)
          },
          g = function(e, t, i) {
              var o = this;
              o.opts = f({
                  index: i
              }, n.fancybox.defaults), n.isPlainObject(t) && (o.opts = f(o.opts, t)), n.fancybox.isMobile && (o.opts = f(o.opts, o.opts.mobile)), o.id = o.opts.id || ++l, o.currIndex = parseInt(o.opts.index, 10) || 0, o.prevIndex = null, o.prevPos = null, o.currPos = 0, o.firstRun = !0, o.group = [], o.slides = {}, o.addContent(e), o.group.length && o.init()
          };
      n.extend(g.prototype, {
              init: function() {
                  var i, o, r = this,
                      s = r.group[r.currIndex].opts;
                  s.closeExisting && n.fancybox.close(!0), n("body").addClass("fancybox-active"), !n.fancybox.getInstance() && !1 !== s.hideScrollbar && !n.fancybox.isMobile && t.body.scrollHeight > e.innerHeight && (n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (e.innerWidth - t.documentElement.clientWidth) + "px;}</style>"), n("body").addClass("compensate-for-scrollbar")), o = "", n.each(s.buttons, function(e, t) {
                      o += s.btnTpl[t] || ""
                  }), i = n(r.translate(r, s.baseTpl.replace("{{buttons}}", o).replace("{{arrows}}", s.btnTpl.arrowLeft + s.btnTpl.arrowRight))).attr("id", "fancybox-container-" + r.id).addClass(s.baseClass).data("FancyBox", r).appendTo(s.parentEl), r.$refs = {
                      container: i
                  }, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(e) {
                      r.$refs[e] = i.find(".fancybox-" + e)
                  }), r.trigger("onInit"), r.activate(), r.jumpTo(r.currIndex)
              },
              translate: function(e, t) {
                  var n = e.opts.i18n[e.opts.lang] || e.opts.i18n.en;
                  return t.replace(/\{\{(\w+)\}\}/g, function(e, t) {
                      return void 0 === n[t] ? e : n[t]
                  })
              },
              addContent: function(e) {
                  var t, i = this,
                      o = n.makeArray(e);
                  n.each(o, function(e, t) {
                      var o, r, s, a, l, c = {},
                          u = {};
                      n.isPlainObject(t) ? (c = t, u = t.opts || t) : "object" === n.type(t) && n(t).length ? (u = (o = n(t)).data() || {}, (u = n.extend(!0, {}, u, u.options)).$orig = o, c.src = i.opts.src || u.src || o.attr("href"), c.type || c.src || (c.type = "inline", c.src = t)) : c = {
                          type: "html",
                          src: t + ""
                      }, c.opts = n.extend(!0, {}, i.opts, u), n.isArray(u.buttons) && (c.opts.buttons = u.buttons), n.fancybox.isMobile && c.opts.mobile && (c.opts = f(c.opts, c.opts.mobile)), r = c.type || c.opts.type, a = c.src || "", !r && a && ((s = a.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (r = "video", c.opts.video.format || (c.opts.video.format = "video/" + ("ogv" === s[1] ? "ogg" : s[1]))) : a.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? r = "image" : a.match(/\.(pdf)((\?|#).*)?$/i) ? (r = "iframe", c = n.extend(!0, c, {
                          contentType: "pdf",
                          opts: {
                              iframe: {
                                  preload: !1
                              }
                          }
                      })) : "#" === a.charAt(0) && (r = "inline")), r ? c.type = r : i.trigger("objectNeedsType", c), c.contentType || (c.contentType = n.inArray(c.type, ["html", "inline", "ajax"]) > -1 ? "html" : c.type), c.index = i.group.length, "auto" == c.opts.smallBtn && (c.opts.smallBtn = n.inArray(c.type, ["html", "inline", "ajax"]) > -1), "auto" === c.opts.toolbar && (c.opts.toolbar = !c.opts.smallBtn), c.$thumb = c.opts.$thumb || null, c.opts.$trigger && c.index === i.opts.index && (c.$thumb = c.opts.$trigger.find("img:first"), c.$thumb.length && (c.opts.$orig = c.opts.$trigger)), c.$thumb && c.$thumb.length || !c.opts.$orig || (c.$thumb = c.opts.$orig.find("img:first")), c.$thumb && !c.$thumb.length && (c.$thumb = null), c.thumb = c.opts.thumb || (c.$thumb ? c.$thumb[0].src : null), "function" === n.type(c.opts.caption) && (c.opts.caption = c.opts.caption.apply(t, [i, c])), "function" === n.type(i.opts.caption) && (c.opts.caption = i.opts.caption.apply(t, [i, c])), c.opts.caption instanceof n || (c.opts.caption = void 0 === c.opts.caption ? "" : c.opts.caption + ""), "ajax" === c.type && ((l = a.split(/\s+/, 2)).length > 1 && (c.src = l.shift(), c.opts.filter = l.shift())), c.opts.modal && (c.opts = n.extend(!0, c.opts, {
                          trapFocus: !0,
                          infobar: 0,
                          toolbar: 0,
                          smallBtn: 0,
                          keyboard: 0,
                          slideShow: 0,
                          fullScreen: 0,
                          thumbs: 0,
                          touch: 0,
                          clickContent: !1,
                          clickSlide: !1,
                          clickOutside: !1,
                          dblclickContent: !1,
                          dblclickSlide: !1,
                          dblclickOutside: !1
                      })), i.group.push(c)
                  }), Object.keys(i.slides).length && (i.updateControls(), (t = i.Thumbs) && t.isActive && (t.create(), t.focus()))
              },
              addEvents: function() {
                  var t = this;
                  t.removeEvents(), t.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(e) {
                      e.stopPropagation(), e.preventDefault(), t.close(e)
                  }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(e) {
                      e.stopPropagation(), e.preventDefault(), t.previous()
                  }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(e) {
                      e.stopPropagation(), e.preventDefault(), t.next()
                  }).on("click.fb", "[data-fancybox-zoom]", function(e) {
                      t[t.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                  }), s.on("orientationchange.fb resize.fb", function(e) {
                      e && e.originalEvent && "resize" === e.originalEvent.type ? (t.requestId && u(t.requestId), t.requestId = c(function() {
                          t.update(e)
                      })) : (t.current && "iframe" === t.current.type && t.$refs.stage.hide(), setTimeout(function() {
                          t.$refs.stage.show(), t.update(e)
                      }, n.fancybox.isMobile ? 600 : 250))
                  }), a.on("keydown.fb", function(e) {
                      var i = (n.fancybox ? n.fancybox.getInstance() : null).current,
                          o = e.keyCode || e.which;
                      if (9 != o) return !i.opts.keyboard || e.ctrlKey || e.altKey || e.shiftKey || n(e.target).is("input,textarea,video,audio") ? void 0 : 8 === o || 27 === o ? (e.preventDefault(), void t.close(e)) : 37 === o || 38 === o ? (e.preventDefault(), void t.previous()) : 39 === o || 40 === o ? (e.preventDefault(), void t.next()) : void t.trigger("afterKeydown", e, o);
                      i.opts.trapFocus && t.focus(e)
                  }), t.group[t.currIndex].opts.idleTime && (t.idleSecondsCounter = 0, a.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(e) {
                      t.idleSecondsCounter = 0, t.isIdle && t.showControls(), t.isIdle = !1
                  }), t.idleInterval = e.setInterval(function() {
                      ++t.idleSecondsCounter >= t.group[t.currIndex].opts.idleTime && !t.isDragging && (t.isIdle = !0, t.idleSecondsCounter = 0, t.hideControls())
                  }, 1e3))
              },
              removeEvents: function() {
                  var t = this;
                  s.off("orientationchange.fb resize.fb"), a.off("keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), t.idleInterval && (e.clearInterval(t.idleInterval), t.idleInterval = null)
              },
              previous: function(e) {
                  return this.jumpTo(this.currPos - 1, e)
              },
              next: function(e) {
                  return this.jumpTo(this.currPos + 1, e)
              },
              jumpTo: function(e, t) {
                  var i, o, r, s, a, l, c, u, h, f = this,
                      p = f.group.length;
                  if (!(f.isDragging || f.isClosing || f.isAnimating && f.firstRun)) {
                      if (e = parseInt(e, 10), !(r = f.current ? f.current.opts.loop : f.opts.loop) && (e < 0 || e >= p)) return !1;
                      if (i = f.firstRun = !Object.keys(f.slides).length, a = f.current, f.prevIndex = f.currIndex, f.prevPos = f.currPos, s = f.createSlide(e), p > 1 && ((r || s.index < p - 1) && f.createSlide(e + 1), (r || s.index > 0) && f.createSlide(e - 1)), f.current = s, f.currIndex = s.index, f.currPos = s.pos, f.trigger("beforeShow", i), f.updateControls(), s.forcedDuration = void 0, n.isNumeric(t) ? s.forcedDuration = t : t = s.opts[i ? "animationDuration" : "transitionDuration"], t = parseInt(t, 10), o = f.isMoved(s), s.$slide.addClass("fancybox-slide--current"), i) return s.opts.animationEffect && t && f.$refs.container.css("transition-duration", t + "ms"), f.$refs.container.addClass("fancybox-is-open").trigger("focus"), f.loadSlide(s), void f.preload("image");
                      l = n.fancybox.getTranslate(a.$slide), c = n.fancybox.getTranslate(f.$refs.stage), n.each(f.slides, function(e, t) {
                          n.fancybox.stop(t.$slide, !0)
                      }), a.pos !== s.pos && (a.isComplete = !1), a.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"), o ? (h = l.left - (a.pos * l.width + a.pos * a.opts.gutter), n.each(f.slides, function(e, i) {
                          i.$slide.removeClass("fancybox-animated").removeClass(function(e, t) {
                              return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                          });
                          var o = i.pos * l.width + i.pos * i.opts.gutter;
                          n.fancybox.setTranslate(i.$slide, {
                              top: 0,
                              left: o - c.left + h
                          }), i.pos !== s.pos && i.$slide.addClass("fancybox-slide--" + (i.pos > s.pos ? "next" : "previous")), d(i.$slide), n.fancybox.animate(i.$slide, {
                              top: 0,
                              left: (i.pos - s.pos) * l.width + (i.pos - s.pos) * i.opts.gutter
                          }, t, function() {
                              i.$slide.css({
                                  transform: "",
                                  opacity: ""
                              }).removeClass("fancybox-slide--next fancybox-slide--previous"), i.pos === f.currPos && f.complete()
                          })
                      })) : t && s.opts.transitionEffect && (u = "fancybox-animated fancybox-fx-" + s.opts.transitionEffect, a.$slide.addClass("fancybox-slide--" + (a.pos > s.pos ? "next" : "previous")), n.fancybox.animate(a.$slide, u, t, function() {
                          a.$slide.removeClass(u).removeClass("fancybox-slide--next fancybox-slide--previous")
                      }, !1)), s.isLoaded ? f.revealContent(s) : f.loadSlide(s), f.preload("image")
                  }
              },
              createSlide: function(e) {
                  var t, i, o = this;
                  return i = (i = e % o.group.length) < 0 ? o.group.length + i : i, !o.slides[e] && o.group[i] && (t = n('<div class="fancybox-slide"></div>').appendTo(o.$refs.stage), o.slides[e] = n.extend(!0, {}, o.group[i], {
                      pos: e,
                      $slide: t,
                      isLoaded: !1
                  }), o.updateSlide(o.slides[e])), o.slides[e]
              },
              scaleToActual: function(e, t, i) {
                  var o, r, s, a, l, c = this,
                      u = c.current,
                      h = u.$content,
                      d = n.fancybox.getTranslate(u.$slide).width,
                      f = n.fancybox.getTranslate(u.$slide).height,
                      p = u.width,
                      g = u.height;
                  c.isAnimating || c.isMoved() || !h || "image" != u.type || !u.isLoaded || u.hasError || (c.isAnimating = !0, n.fancybox.stop(h), e = void 0 === e ? .5 * d : e, t = void 0 === t ? .5 * f : t, (o = n.fancybox.getTranslate(h)).top -= n.fancybox.getTranslate(u.$slide).top, o.left -= n.fancybox.getTranslate(u.$slide).left, a = p / o.width, l = g / o.height, r = .5 * d - .5 * p, s = .5 * f - .5 * g, p > d && ((r = o.left * a - (e * a - e)) > 0 && (r = 0), r < d - p && (r = d - p)), g > f && ((s = o.top * l - (t * l - t)) > 0 && (s = 0), s < f - g && (s = f - g)), c.updateCursor(p, g), n.fancybox.animate(h, {
                      top: s,
                      left: r,
                      scaleX: a,
                      scaleY: l
                  }, i || 366, function() {
                      c.isAnimating = !1
                  }), c.SlideShow && c.SlideShow.isActive && c.SlideShow.stop())
              },
              scaleToFit: function(e) {
                  var t, i = this,
                      o = i.current,
                      r = o.$content;
                  i.isAnimating || i.isMoved() || !r || "image" != o.type || !o.isLoaded || o.hasError || (i.isAnimating = !0, n.fancybox.stop(r), t = i.getFitPos(o), i.updateCursor(t.width, t.height), n.fancybox.animate(r, {
                      top: t.top,
                      left: t.left,
                      scaleX: t.width / r.width(),
                      scaleY: t.height / r.height()
                  }, e || 366, function() {
                      i.isAnimating = !1
                  }))
              },
              getFitPos: function(e) {
                  var t, i, o, r, s = e.$content,
                      a = e.$slide,
                      l = e.width || e.opts.width,
                      c = e.height || e.opts.height,
                      u = {};
                  return !!(e.isLoaded && s && s.length) && (t = n.fancybox.getTranslate(this.$refs.stage).width, i = n.fancybox.getTranslate(this.$refs.stage).height, t -= parseFloat(a.css("paddingLeft")) + parseFloat(a.css("paddingRight")) + parseFloat(s.css("marginLeft")) + parseFloat(s.css("marginRight")), i -= parseFloat(a.css("paddingTop")) + parseFloat(a.css("paddingBottom")) + parseFloat(s.css("marginTop")) + parseFloat(s.css("marginBottom")), l && c || (l = t, c = i), (l *= o = Math.min(1, t / l, i / c)) > t - .5 && (l = t), (c *= o) > i - .5 && (c = i), "image" === e.type ? (u.top = Math.floor(.5 * (i - c)) + parseFloat(a.css("paddingTop")), u.left = Math.floor(.5 * (t - l)) + parseFloat(a.css("paddingLeft"))) : "video" === e.contentType && (c > l / (r = e.opts.width && e.opts.height ? l / c : e.opts.ratio || 16 / 9) ? c = l / r : l > c * r && (l = c * r)), u.width = l, u.height = c, u)
              },
              update: function(e) {
                  var t = this;
                  n.each(t.slides, function(n, i) {
                      t.updateSlide(i, e)
                  })
              },
              updateSlide: function(e, t) {
                  var i = this,
                      o = e && e.$content,
                      r = e.width || e.opts.width,
                      s = e.height || e.opts.height,
                      a = e.$slide;
                  i.adjustCaption(e), o && (r || s || "video" === e.contentType) && !e.hasError && (n.fancybox.stop(o), n.fancybox.setTranslate(o, i.getFitPos(e)), e.pos === i.currPos && (i.isAnimating = !1, i.updateCursor())), i.adjustLayout(e), a.length && (a.trigger("refresh"), e.pos === i.currPos && i.$refs.toolbar.add(i.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", a.get(0).scrollHeight > a.get(0).clientHeight)), i.trigger("onUpdate", e, t)
              },
              centerSlide: function(e) {
                  var t = this,
                      i = t.current,
                      o = i.$slide;
                  !t.isClosing && i && (o.siblings().css({
                      transform: "",
                      opacity: ""
                  }), o.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"), n.fancybox.animate(o, {
                      top: 0,
                      left: 0,
                      opacity: 1
                  }, void 0 === e ? 0 : e, function() {
                      o.css({
                          transform: "",
                          opacity: ""
                      }), i.isComplete || t.complete()
                  }, !1))
              },
              isMoved: function(e) {
                  var t, i, o = e || this.current;
                  return !!o && (i = n.fancybox.getTranslate(this.$refs.stage), t = n.fancybox.getTranslate(o.$slide), !o.$slide.hasClass("fancybox-animated") && (Math.abs(t.top - i.top) > .5 || Math.abs(t.left - i.left) > .5))
              },
              updateCursor: function(e, t) {
                  var i, o, r = this,
                      s = r.current,
                      a = r.$refs.container;
                  s && !r.isClosing && r.Guestures && (a.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"), o = !!(i = r.canPan(e, t)) || r.isZoomable(), a.toggleClass("fancybox-is-zoomable", o), n("[data-fancybox-zoom]").prop("disabled", !o), i ? a.addClass("fancybox-can-pan") : o && ("zoom" === s.opts.clickContent || n.isFunction(s.opts.clickContent) && "zoom" == s.opts.clickContent(s)) ? a.addClass("fancybox-can-zoomIn") : s.opts.touch && (s.opts.touch.vertical || r.group.length > 1) && "video" !== s.contentType && a.addClass("fancybox-can-swipe"))
              },
              isZoomable: function() {
                  var e, t = this,
                      n = t.current;
                  if (n && !t.isClosing && "image" === n.type && !n.hasError) {
                      if (!n.isLoaded) return !0;
                      if ((e = t.getFitPos(n)) && (n.width > e.width || n.height > e.height)) return !0
                  }
                  return !1
              },
              isScaledDown: function(e, t) {
                  var i = !1,
                      o = this.current,
                      r = o.$content;
                  return void 0 !== e && void 0 !== t ? i = e < o.width && t < o.height : r && (i = (i = n.fancybox.getTranslate(r)).width < o.width && i.height < o.height), i
              },
              canPan: function(e, t) {
                  var i = this.current,
                      o = null,
                      r = !1;
                  return "image" === i.type && (i.isComplete || e && t) && !i.hasError && (r = this.getFitPos(i), void 0 !== e && void 0 !== t ? o = {
                      width: e,
                      height: t
                  } : i.isComplete && (o = n.fancybox.getTranslate(i.$content)), o && r && (r = Math.abs(o.width - r.width) > 1.5 || Math.abs(o.height - r.height) > 1.5)), r
              },
              loadSlide: function(e) {
                  var t, i, o, r = this;
                  if (!e.isLoading && !e.isLoaded) {
                      if (e.isLoading = !0, !1 === r.trigger("beforeLoad", e)) return e.isLoading = !1, !1;
                      switch (t = e.type, (i = e.$slide).off("refresh").trigger("onReset").addClass(e.opts.slideClass), t) {
                          case "image":
                              r.setImage(e);
                              break;
                          case "iframe":
                              r.setIframe(e);
                              break;
                          case "html":
                              r.setContent(e, e.src || e.content);
                              break;
                          case "video":
                              r.setContent(e, e.opts.video.tpl.replace(/\{\{src\}\}/gi, e.src).replace("{{format}}", e.opts.videoFormat || e.opts.video.format || "").replace("{{poster}}", e.thumb || ""));
                              break;
                          case "inline":
                              n(e.src).length ? r.setContent(e, n(e.src)) : r.setError(e);
                              break;
                          case "ajax":
                              r.showLoading(e), o = n.ajax(n.extend({}, e.opts.ajax.settings, {
                                  url: e.src,
                                  success: function(t, n) {
                                      "success" === n && r.setContent(e, t)
                                  },
                                  error: function(t, n) {
                                      t && "abort" !== n && r.setError(e)
                                  }
                              })), i.one("onReset", function() {
                                  o.abort()
                              });
                              break;
                          default:
                              r.setError(e)
                      }
                      return !0
                  }
              },
              setImage: function(e) {
                  var i, o = this;
                  setTimeout(function() {
                      var t = e.$image;
                      o.isClosing || !e.isLoading || t && t.length && t[0].complete || e.hasError || o.showLoading(e)
                  }, 50), o.checkSrcset(e), e.$content = n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide.addClass("fancybox-slide--image")), !1 !== e.opts.preload && e.opts.width && e.opts.height && e.thumb && (e.width = e.opts.width, e.height = e.opts.height, (i = t.createElement("img")).onerror = function() {
                      n(this).remove(), e.$ghost = null
                  }, i.onload = function() {
                      o.afterLoad(e)
                  }, e.$ghost = n(i).addClass("fancybox-image").appendTo(e.$content).attr("src", e.thumb)), o.setBigImage(e)
              },
              checkSrcset: function(t) {
                  var n, i, o, r, s = t.opts.srcset || t.opts.image.srcset;
                  if (s) {
                      o = e.devicePixelRatio || 1, r = e.innerWidth * o, (i = s.split(",").map(function(e) {
                          var t = {};
                          return e.trim().split(/\s+/).forEach(function(e, n) {
                              var i = parseInt(e.substring(0, e.length - 1), 10);
                              if (0 === n) return t.url = e;
                              i && (t.value = i, t.postfix = e[e.length - 1])
                          }), t
                      })).sort(function(e, t) {
                          return e.value - t.value
                      });
                      for (var a = 0; a < i.length; a++) {
                          var l = i[a];
                          if ("w" === l.postfix && l.value >= r || "x" === l.postfix && l.value >= o) {
                              n = l;
                              break
                          }
                      }!n && i.length && (n = i[i.length - 1]), n && (t.src = n.url, t.width && t.height && "w" == n.postfix && (t.height = t.width / t.height * n.value, t.width = n.value), t.opts.srcset = s)
                  }
              },
              setBigImage: function(e) {
                  var i = this,
                      o = t.createElement("img"),
                      r = n(o);
                  e.$image = r.one("error", function() {
                      i.setError(e)
                  }).one("load", function() {
                      var t;
                      e.$ghost || (i.resolveImageSlideSize(e, this.naturalWidth, this.naturalHeight), i.afterLoad(e)), i.isClosing || (e.opts.srcset && ((t = e.opts.sizes) && "auto" !== t || (t = (e.width / e.height > 1 && s.width() / s.height() > 1 ? "100" : Math.round(e.width / e.height * 100)) + "vw"), r.attr("sizes", t).attr("srcset", e.opts.srcset)), e.$ghost && setTimeout(function() {
                          e.$ghost && !i.isClosing && e.$ghost.hide()
                      }, Math.min(300, Math.max(1e3, e.height / 1600))), i.hideLoading(e))
                  }).addClass("fancybox-image").attr("src", e.src).appendTo(e.$content), (o.complete || "complete" == o.readyState) && r.naturalWidth && r.naturalHeight ? r.trigger("load") : o.error && r.trigger("error")
              },
              resolveImageSlideSize: function(e, t, n) {
                  var i = parseInt(e.opts.width, 10),
                      o = parseInt(e.opts.height, 10);
                  e.width = t, e.height = n, i > 0 && (e.width = i, e.height = Math.floor(i * n / t)), o > 0 && (e.width = Math.floor(o * t / n), e.height = o)
              },
              setIframe: function(e) {
                  var t, i = this,
                      o = e.opts.iframe,
                      r = e.$slide;
                  e.$content = n('<div class="fancybox-content' + (o.preload ? " fancybox-is-hidden" : "") + '"></div>').css(o.css).appendTo(r), r.addClass("fancybox-slide--" + e.contentType), e.$iframe = t = n(o.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(o.attr).appendTo(e.$content), o.preload ? (i.showLoading(e), t.on("load.fb error.fb", function(t) {
                      this.isReady = 1, e.$slide.trigger("refresh"), i.afterLoad(e)
                  }), r.on("refresh.fb", function() {
                      var n, i = e.$content,
                          s = o.css.width,
                          a = o.css.height;
                      if (1 === t[0].isReady) {
                          try {
                              n = t.contents().find("body")
                          } catch (e) {}
                          n && n.length && n.children().length && (r.css("overflow", "visible"), i.css({
                              width: "100%",
                              "max-width": "100%",
                              height: "9999px"
                          }), void 0 === s && (s = Math.ceil(Math.max(n[0].clientWidth, n.outerWidth(!0)))), i.css("width", s || "").css("max-width", ""), void 0 === a && (a = Math.ceil(Math.max(n[0].clientHeight, n.outerHeight(!0)))), i.css("height", a || ""), r.css("overflow", "auto")), i.removeClass("fancybox-is-hidden")
                      }
                  })) : i.afterLoad(e), t.attr("src", e.src), r.one("onReset", function() {
                      try {
                          n(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                      } catch (e) {}
                      n(this).off("refresh.fb").empty(), e.isLoaded = !1, e.isRevealed = !1
                  })
              },
              setContent: function(e, t) {
                  var i = this;
                  i.isClosing || (i.hideLoading(e), e.$content && n.fancybox.stop(e.$content), e.$slide.empty(), function(e) {
                      return e && e.hasOwnProperty && e instanceof n
                  }(t) && t.parent().length ? ((t.hasClass("fancybox-content") || t.parent().hasClass("fancybox-content")) && t.parents(".fancybox-slide").trigger("onReset"), e.$placeholder = n("<div>").hide().insertAfter(t), t.css("display", "inline-block")) : e.hasError || ("string" === n.type(t) && (t = n("<div>").append(n.trim(t)).contents()), e.opts.filter && (t = n("<div>").html(t).find(e.opts.filter))), e.$slide.one("onReset", function() {
                      n(this).find("video,audio").trigger("pause"), e.$placeholder && (e.$placeholder.after(t.removeClass("fancybox-content").hide()).remove(), e.$placeholder = null), e.$smallBtn && (e.$smallBtn.remove(), e.$smallBtn = null), e.hasError || (n(this).empty(), e.isLoaded = !1, e.isRevealed = !1)
                  }), n(t).appendTo(e.$slide), n(t).is("video,audio") && (n(t).addClass("fancybox-video"), n(t).wrap("<div></div>"), e.contentType = "video", e.opts.width = e.opts.width || n(t).attr("width"), e.opts.height = e.opts.height || n(t).attr("height")), e.$content = e.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(), e.$content.siblings().hide(), e.$content.length || (e.$content = e.$slide.wrapInner("<div></div>").children().first()), e.$content.addClass("fancybox-content"), e.$slide.addClass("fancybox-slide--" + e.contentType), i.afterLoad(e))
              },
              setError: function(e) {
                  e.hasError = !0, e.$slide.trigger("onReset").removeClass("fancybox-slide--" + e.contentType).addClass("fancybox-slide--error"), e.contentType = "html", this.setContent(e, this.translate(e, e.opts.errorTpl)), e.pos === this.currPos && (this.isAnimating = !1)
              },
              showLoading: function(e) {
                  var t = this;
                  (e = e || t.current) && !e.$spinner && (e.$spinner = n(t.translate(t, t.opts.spinnerTpl)).appendTo(e.$slide).hide().fadeIn("fast"))
              },
              hideLoading: function(e) {
                  (e = e || this.current) && e.$spinner && (e.$spinner.stop().remove(), delete e.$spinner)
              },
              afterLoad: function(e) {
                  var t = this;
                  t.isClosing || (e.isLoading = !1, e.isLoaded = !0, t.trigger("afterLoad", e), t.hideLoading(e), !e.opts.smallBtn || e.$smallBtn && e.$smallBtn.length || (e.$smallBtn = n(t.translate(e, e.opts.btnTpl.smallBtn)).appendTo(e.$content)), e.opts.protect && e.$content && !e.hasError && (e.$content.on("contextmenu.fb", function(e) {
                      return 2 == e.button && e.preventDefault(), !0
                  }), "image" === e.type && n('<div class="fancybox-spaceball"></div>').appendTo(e.$content)), t.adjustCaption(e), t.adjustLayout(e), e.pos === t.currPos && t.updateCursor(), t.revealContent(e))
              },
              adjustCaption: function(e) {
                  var t, n = this,
                      i = e || n.current,
                      o = i.opts.caption,
                      r = i.opts.preventCaptionOverlap,
                      s = n.$refs.caption,
                      a = !1;
                  s.toggleClass("fancybox-caption--separate", r), r && o && o.length && (i.pos !== n.currPos ? ((t = s.clone().appendTo(s.parent())).children().eq(0).empty().html(o), a = t.outerHeight(!0), t.empty().remove()) : n.$caption && (a = n.$caption.outerHeight(!0)), i.$slide.css("padding-bottom", a || ""))
              },
              adjustLayout: function(e) {
                  var t, n, i, o, r = e || this.current;
                  r.isLoaded && !0 !== r.opts.disableLayoutFix && (r.$content.css("margin-bottom", ""), r.$content.outerHeight() > r.$slide.height() + .5 && (i = r.$slide[0].style["padding-bottom"], o = r.$slide.css("padding-bottom"), parseFloat(o) > 0 && (t = r.$slide[0].scrollHeight, r.$slide.css("padding-bottom", 0), Math.abs(t - r.$slide[0].scrollHeight) < 1 && (n = o), r.$slide.css("padding-bottom", i))), r.$content.css("margin-bottom", n))
              },
              revealContent: function(e) {
                  var t, i, o, r, s = this,
                      a = e.$slide,
                      l = !1,
                      c = !1,
                      u = s.isMoved(e),
                      h = e.isRevealed;
                  return e.isRevealed = !0, t = e.opts[s.firstRun ? "animationEffect" : "transitionEffect"], o = e.opts[s.firstRun ? "animationDuration" : "transitionDuration"], o = parseInt(void 0 === e.forcedDuration ? o : e.forcedDuration, 10), !u && e.pos === s.currPos && o || (t = !1), "zoom" === t && (e.pos === s.currPos && o && "image" === e.type && !e.hasError && (c = s.getThumbPos(e)) ? l = s.getFitPos(e) : t = "fade"), "zoom" === t ? (s.isAnimating = !0, l.scaleX = l.width / c.width, l.scaleY = l.height / c.height, "auto" == (r = e.opts.zoomOpacity) && (r = Math.abs(e.width / e.height - c.width / c.height) > .1), r && (c.opacity = .1, l.opacity = 1), n.fancybox.setTranslate(e.$content.removeClass("fancybox-is-hidden"), c), d(e.$content), void n.fancybox.animate(e.$content, l, o, function() {
                      s.isAnimating = !1, s.complete()
                  })) : (s.updateSlide(e), t ? (n.fancybox.stop(a), i = "fancybox-slide--" + (e.pos >= s.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + t, a.addClass(i).removeClass("fancybox-slide--current"), e.$content.removeClass("fancybox-is-hidden"), d(a), "image" !== e.type && e.$content.hide().show(0), void n.fancybox.animate(a, "fancybox-slide--current", o, function() {
                      a.removeClass(i).css({
                          transform: "",
                          opacity: ""
                      }), e.pos === s.currPos && s.complete()
                  }, !0)) : (e.$content.removeClass("fancybox-is-hidden"), h || !u || "image" !== e.type || e.hasError || e.$content.hide().fadeIn("fast"), void(e.pos === s.currPos && s.complete())))
              },
              getThumbPos: function(e) {
                  var t, i, o, r, s, a = !1,
                      l = e.$thumb;
                  return !(!l || !p(l[0])) && (t = n.fancybox.getTranslate(l), i = parseFloat(l.css("border-top-width") || 0), o = parseFloat(l.css("border-right-width") || 0), r = parseFloat(l.css("border-bottom-width") || 0), s = parseFloat(l.css("border-left-width") || 0), a = {
                      top: t.top + i,
                      left: t.left + s,
                      width: t.width - o - s,
                      height: t.height - i - r,
                      scaleX: 1,
                      scaleY: 1
                  }, t.width > 0 && t.height > 0 && a)
              },
              complete: function() {
                  var e, t = this,
                      i = t.current,
                      o = {};
                  !t.isMoved() && i.isLoaded && (i.isComplete || (i.isComplete = !0, i.$slide.siblings().trigger("onReset"), t.preload("inline"), d(i.$slide), i.$slide.addClass("fancybox-slide--complete"), n.each(t.slides, function(e, i) {
                      i.pos >= t.currPos - 1 && i.pos <= t.currPos + 1 ? o[i.pos] = i : i && (n.fancybox.stop(i.$slide), i.$slide.off().remove())
                  }), t.slides = o), t.isAnimating = !1, t.updateCursor(), t.trigger("afterShow"), i.opts.video.autoStart && i.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function() {
                      this.webkitExitFullscreen && this.webkitExitFullscreen(), t.next()
                  }), i.opts.autoFocus && "html" === i.contentType && ((e = i.$content.find("input[autofocus]:enabled:visible:first")).length ? e.trigger("focus") : t.focus(null, !0)), i.$slide.scrollTop(0).scrollLeft(0))
              },
              preload: function(e) {
                  var t, n, i = this;
                  i.group.length < 2 || (n = i.slides[i.currPos + 1], (t = i.slides[i.currPos - 1]) && t.type === e && i.loadSlide(t), n && n.type === e && i.loadSlide(n))
              },
              focus: function(e, i) {
                  var o, r, s = this,
                      a = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
                  s.isClosing || ((o = (o = !e && s.current && s.current.isComplete ? s.current.$slide.find("*:visible" + (i ? ":not(.fancybox-close-small)" : "")) : s.$refs.container.find("*:visible")).filter(a).filter(function() {
                      return "hidden" !== n(this).css("visibility") && !n(this).hasClass("disabled")
                  })).length ? (r = o.index(t.activeElement), e && e.shiftKey ? (r < 0 || 0 == r) && (e.preventDefault(), o.eq(o.length - 1).trigger("focus")) : (r < 0 || r == o.length - 1) && (e && e.preventDefault(), o.eq(0).trigger("focus"))) : s.$refs.container.trigger("focus"))
              },
              activate: function() {
                  var e = this;
                  n(".fancybox-container").each(function() {
                      var t = n(this).data("FancyBox");
                      t && t.id !== e.id && !t.isClosing && (t.trigger("onDeactivate"), t.removeEvents(), t.isVisible = !1)
                  }), e.isVisible = !0, (e.current || e.isIdle) && (e.update(), e.updateControls()), e.trigger("onActivate"), e.addEvents()
              },
              close: function(e, t) {
                  var i, o, r, s, a, l, u, h = this,
                      f = h.current,
                      p = function() {
                          h.cleanUp(e)
                      };
                  return !(h.isClosing || (h.isClosing = !0, !1 === h.trigger("beforeClose", e) ? (h.isClosing = !1, c(function() {
                      h.update()
                  }), 1) : (h.removeEvents(), r = f.$content, i = f.opts.animationEffect, o = n.isNumeric(t) ? t : i ? f.opts.animationDuration : 0, f.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), !0 !== e ? n.fancybox.stop(f.$slide) : i = !1, f.$slide.siblings().trigger("onReset").remove(), o && h.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", o + "ms"), h.hideLoading(f), h.hideControls(!0), h.updateCursor(), "zoom" !== i || r && o && "image" === f.type && !h.isMoved() && !f.hasError && (u = h.getThumbPos(f)) || (i = "fade"), "zoom" === i ? (n.fancybox.stop(r), s = n.fancybox.getTranslate(r), l = {
                      top: s.top,
                      left: s.left,
                      scaleX: s.width / u.width,
                      scaleY: s.height / u.height,
                      width: u.width,
                      height: u.height
                  }, a = f.opts.zoomOpacity, "auto" == a && (a = Math.abs(f.width / f.height - u.width / u.height) > .1), a && (u.opacity = 0), n.fancybox.setTranslate(r, l), d(r), n.fancybox.animate(r, u, o, p), 0) : (i && o ? n.fancybox.animate(f.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + i, o, p) : !0 === e ? setTimeout(p, o) : p(), 0))))
              },
              cleanUp: function(t) {
                  var i, o, r, s = this,
                      a = s.current.opts.$orig;
                  s.current.$slide.trigger("onReset"), s.$refs.container.empty().remove(), s.trigger("afterClose", t), s.current.opts.backFocus && (a && a.length && a.is(":visible") || (a = s.$trigger), a && a.length && (o = e.scrollX, r = e.scrollY, a.trigger("focus"), n("html, body").scrollTop(r).scrollLeft(o))), s.current = null, (i = n.fancybox.getInstance()) ? i.activate() : (n("body").removeClass("fancybox-active compensate-for-scrollbar"), n("#fancybox-style-noscroll").remove())
              },
              trigger: function(e, t) {
                  var i, o = Array.prototype.slice.call(arguments, 1),
                      r = this,
                      s = t && t.opts ? t : r.current;
                  if (s ? o.unshift(s) : s = r, o.unshift(r), n.isFunction(s.opts[e]) && (i = s.opts[e].apply(s, o)), !1 === i) return i;
                  "afterClose" !== e && r.$refs ? r.$refs.container.trigger(e + ".fb", o) : a.trigger(e + ".fb", o)
              },
              updateControls: function() {
                  var e = this,
                      i = e.current,
                      o = i.index,
                      r = e.$refs.container,
                      s = e.$refs.caption,
                      a = i.opts.caption;
                  i.$slide.trigger("refresh"), a && a.length ? (e.$caption = s, s.children().eq(0).html(a)) : e.$caption = null, e.hasHiddenControls || e.isIdle || e.showControls(), r.find("[data-fancybox-count]").html(e.group.length), r.find("[data-fancybox-index]").html(o + 1), r.find("[data-fancybox-prev]").prop("disabled", !i.opts.loop && o <= 0), r.find("[data-fancybox-next]").prop("disabled", !i.opts.loop && o >= e.group.length - 1), "image" === i.type ? r.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", i.opts.image.src || i.src).show() : i.opts.toolbar && r.find("[data-fancybox-download],[data-fancybox-zoom]").hide(), n(t.activeElement).is(":hidden,[disabled]") && e.$refs.container.trigger("focus")
              },
              hideControls: function(e) {
                  var t = ["infobar", "toolbar", "nav"];
                  !e && this.current.opts.preventCaptionOverlap || t.push("caption"), this.$refs.container.removeClass(t.map(function(e) {
                      return "fancybox-show-" + e
                  }).join(" ")), this.hasHiddenControls = !0
              },
              showControls: function() {
                  var e = this,
                      t = e.current ? e.current.opts : e.opts,
                      n = e.$refs.container;
                  e.hasHiddenControls = !1, e.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!t.toolbar || !t.buttons)).toggleClass("fancybox-show-infobar", !!(t.infobar && e.group.length > 1)).toggleClass("fancybox-show-caption", !!e.$caption).toggleClass("fancybox-show-nav", !!(t.arrows && e.group.length > 1)).toggleClass("fancybox-is-modal", !!t.modal)
              },
              toggleControls: function() {
                  this.hasHiddenControls ? this.showControls() : this.hideControls()
              }
          }), n.fancybox = {
              version: "3.5.6",
              defaults: r,
              getInstance: function(e) {
                  var t = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                      i = Array.prototype.slice.call(arguments, 1);
                  return t instanceof g && ("string" === n.type(e) ? t[e].apply(t, i) : "function" === n.type(e) && e.apply(t, i), t)
              },
              open: function(e, t, n) {
                  return new g(e, t, n)
              },
              close: function(e) {
                  var t = this.getInstance();
                  t && (t.close(), !0 === e && this.close(e))
              },
              destroy: function() {
                  this.close(!0), a.add("body").off("click.fb-start", "**")
              },
              isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
              use3d: function() {
                  var n = t.createElement("div");
                  return e.getComputedStyle && e.getComputedStyle(n) && e.getComputedStyle(n).getPropertyValue("transform") && !(t.documentMode && t.documentMode < 11)
              }(),
              getTranslate: function(e) {
                  var t;
                  return !(!e || !e.length) && {
                      top: (t = e[0].getBoundingClientRect()).top || 0,
                      left: t.left || 0,
                      width: t.width,
                      height: t.height,
                      opacity: parseFloat(e.css("opacity"))
                  }
              },
              setTranslate: function(e, t) {
                  var n = "",
                      i = {};
                  if (e && t) return void 0 === t.left && void 0 === t.top || (n = (void 0 === t.left ? e.position().left : t.left) + "px, " + (void 0 === t.top ? e.position().top : t.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), void 0 !== t.scaleX && void 0 !== t.scaleY ? n += " scale(" + t.scaleX + ", " + t.scaleY + ")" : void 0 !== t.scaleX && (n += " scaleX(" + t.scaleX + ")"), n.length && (i.transform = n), void 0 !== t.opacity && (i.opacity = t.opacity), void 0 !== t.width && (i.width = t.width), void 0 !== t.height && (i.height = t.height), e.css(i)
              },
              animate: function(e, t, i, o, r) {
                  var s, a = this;
                  n.isFunction(i) && (o = i, i = null), a.stop(e), s = a.getTranslate(e), e.on(h, function(l) {
                      (!l || !l.originalEvent || e.is(l.originalEvent.target) && "z-index" != l.originalEvent.propertyName) && (a.stop(e), n.isNumeric(i) && e.css("transition-duration", ""), n.isPlainObject(t) ? void 0 !== t.scaleX && void 0 !== t.scaleY && a.setTranslate(e, {
                          top: t.top,
                          left: t.left,
                          width: s.width * t.scaleX,
                          height: s.height * t.scaleY,
                          scaleX: 1,
                          scaleY: 1
                      }) : !0 !== r && e.removeClass(t), n.isFunction(o) && o(l))
                  }), n.isNumeric(i) && e.css("transition-duration", i + "ms"), n.isPlainObject(t) ? (void 0 !== t.scaleX && void 0 !== t.scaleY && (delete t.width, delete t.height, e.parent().hasClass("fancybox-slide--image") && e.parent().addClass("fancybox-is-scaling")), n.fancybox.setTranslate(e, t)) : e.addClass(t), e.data("timer", setTimeout(function() {
                      e.trigger(h)
                  }, i + 33))
              },
              stop: function(e, t) {
                  e && e.length && (clearTimeout(e.data("timer")), t && e.trigger(h), e.off(h).css("transition-duration", ""), e.parent().removeClass("fancybox-is-scaling"))
              }
          }, n.fn.fancybox = function(e) {
              var t;
              return (t = (e = e || {}).selector || !1) ? n("body").off("click.fb-start", t).on("click.fb-start", t, {
                  options: e
              }, o) : this.off("click.fb-start").on("click.fb-start", {
                  items: this,
                  options: e
              }, o), this
          }, a.on("click.fb-start", "[data-fancybox]", o), a.on("click.fb-start", "[data-fancybox-trigger]", function(e) {
              n('[data-fancybox="' + n(this).attr("data-fancybox-trigger") + '"]').eq(n(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {
                  $trigger: n(this)
              })
          }),
          function() {
              var e = null;
              a.on("mousedown mouseup focus blur", ".fancybox-button", function(t) {
                  switch (t.type) {
                      case "mousedown":
                          e = n(this);
                          break;
                      case "mouseup":
                          e = null;
                          break;
                      case "focusin":
                          n(".fancybox-button").removeClass("fancybox-focus"), n(this).is(e) || n(this).is("[disabled]") || n(this).addClass("fancybox-focus");
                          break;
                      case "focusout":
                          n(".fancybox-button").removeClass("fancybox-focus")
                  }
              })
          }()
  }
}(window, document, jQuery),
function(e) {
  "use strict";
  var t = {
          youtube: {
              matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
              params: {
                  autoplay: 1,
                  autohide: 1,
                  fs: 1,
                  rel: 0,
                  hd: 1,
                  wmode: "transparent",
                  enablejsapi: 1,
                  html5: 1
              },
              paramPlace: 8,
              type: "iframe",
              url: "https://www.youtube-nocookie.com/embed/$4",
              thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
          },
          vimeo: {
              matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
              params: {
                  autoplay: 1,
                  hd: 1,
                  show_title: 1,
                  show_byline: 1,
                  show_portrait: 0,
                  fullscreen: 1
              },
              paramPlace: 3,
              type: "iframe",
              url: "//player.vimeo.com/video/$2"
          },
          instagram: {
              matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
              type: "image",
              url: "//$1/p/$2/media/?size=l"
          },
          gmap_place: {
              matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
              type: "iframe",
              url: function(e) {
                  return "//maps.google." + e[2] + "/?ll=" + (e[9] ? e[9] + "&z=" + Math.floor(e[10]) + (e[12] ? e[12].replace(/^\//, "&") : "") : e[12] + "").replace(/\?/, "&") + "&output=" + (e[12] && e[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
              }
          },
          gmap_search: {
              matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
              type: "iframe",
              url: function(e) {
                  return "//maps.google." + e[2] + "/maps?q=" + e[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
              }
          }
      },
      n = function(t, n, i) {
          if (t) return i = i || "", "object" === e.type(i) && (i = e.param(i, !0)), e.each(n, function(e, n) {
              t = t.replace("$" + e, n || "")
          }), i.length && (t += (t.indexOf("?") > 0 ? "&" : "?") + i), t
      };
  e(document).on("objectNeedsType.fb", function(i, o, r) {
      var s, a, l, c, u, h, d, f = r.src || "",
          p = !1;
      s = e.extend(!0, {}, t, r.opts.media), e.each(s, function(t, i) {
          if (l = f.match(i.matcher)) {
              if (p = i.type, d = t, h = {}, i.paramPlace && l[i.paramPlace]) {
                  "?" == (u = l[i.paramPlace])[0] && (u = u.substring(1)), u = u.split("&");
                  for (var o = 0; o < u.length; ++o) {
                      var s = u[o].split("=", 2);
                      2 == s.length && (h[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
                  }
              }
              return c = e.extend(!0, {}, i.params, r.opts[t], h), f = "function" === e.type(i.url) ? i.url.call(this, l, c, r) : n(i.url, l, c), a = "function" === e.type(i.thumb) ? i.thumb.call(this, l, c, r) : n(i.thumb, l), "youtube" === t ? f = f.replace(/&t=((\d+)m)?(\d+)s/, function(e, t, n, i) {
                  return "&start=" + ((n ? 60 * parseInt(n, 10) : 0) + parseInt(i, 10))
              }) : "vimeo" === t && (f = f.replace("&%23", "#")), !1
          }
      }), p ? (r.opts.thumb || r.opts.$thumb && r.opts.$thumb.length || (r.opts.thumb = a), "iframe" === p && (r.opts = e.extend(!0, r.opts, {
          iframe: {
              preload: !1,
              attr: {
                  scrolling: "no"
              }
          }
      })), e.extend(r, {
          type: p,
          src: f,
          origSrc: r.src,
          contentSource: d,
          contentType: "image" === p ? "image" : "gmap_place" == d || "gmap_search" == d ? "map" : "video"
      })) : f && (r.type = r.opts.defaultType)
  });
  var i = {
      youtube: {
          src: "https://www.youtube.com/iframe_api",
          class: "YT",
          loading: !1,
          loaded: !1
      },
      vimeo: {
          src: "https://player.vimeo.com/api/player.js",
          class: "Vimeo",
          loading: !1,
          loaded: !1
      },
      load: function(e) {
          var t, n = this;
          this[e].loaded ? setTimeout(function() {
              n.done(e)
          }) : this[e].loading || (this[e].loading = !0, (t = document.createElement("script")).type = "text/javascript", t.src = this[e].src, "youtube" === e ? window.onYouTubeIframeAPIReady = function() {
              n[e].loaded = !0, n.done(e)
          } : t.onload = function() {
              n[e].loaded = !0, n.done(e)
          }, document.body.appendChild(t))
      },
      done: function(t) {
          var n, i;
          "youtube" === t && delete window.onYouTubeIframeAPIReady, (n = e.fancybox.getInstance()) && (i = n.current.$content.find("iframe"), "youtube" === t && void 0 !== YT && YT ? new YT.Player(i.attr("id"), {
              events: {
                  onStateChange: function(e) {
                      0 == e.data && n.next()
                  }
              }
          }) : "vimeo" === t && void 0 !== Vimeo && Vimeo && new Vimeo.Player(i).on("ended", function() {
              n.next()
          }))
      }
  };
  e(document).on({
      "afterShow.fb": function(e, t, n) {
          t.group.length > 1 && ("youtube" === n.contentSource || "vimeo" === n.contentSource) && i.load(n.contentSource)
      }
  })
}(jQuery),
function(e, t, n) {
  "use strict";
  var i = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || function(t) {
          return e.setTimeout(t, 1e3 / 60)
      },
      o = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.oCancelAnimationFrame || function(t) {
          e.clearTimeout(t)
      },
      r = function(t) {
          var n = [];
          for (var i in t = (t = t.originalEvent || t || e.e).touches && t.touches.length ? t.touches : t.changedTouches && t.changedTouches.length ? t.changedTouches : [t]) t[i].pageX ? n.push({
              x: t[i].pageX,
              y: t[i].pageY
          }) : t[i].clientX && n.push({
              x: t[i].clientX,
              y: t[i].clientY
          });
          return n
      },
      s = function(e, t, n) {
          return t && e ? "x" === n ? e.x - t.x : "y" === n ? e.y - t.y : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) : 0
      },
      a = function(e) {
          if (e.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || n.isFunction(e.get(0).onclick) || e.data("selectable")) return !0;
          for (var t = 0, i = e[0].attributes, o = i.length; t < o; t++)
              if ("data-fancybox-" === i[t].nodeName.substr(0, 14)) return !0;
          return !1
      },
      l = function(t) {
          var n = e.getComputedStyle(t)["overflow-y"],
              i = e.getComputedStyle(t)["overflow-x"],
              o = ("scroll" === n || "auto" === n) && t.scrollHeight > t.clientHeight,
              r = ("scroll" === i || "auto" === i) && t.scrollWidth > t.clientWidth;
          return o || r
      },
      c = function(e) {
          for (var t = !1; !(t = l(e.get(0))) && ((e = e.parent()).length && !e.hasClass("fancybox-stage") && !e.is("body")););
          return t
      },
      u = function(e) {
          var t = this;
          t.instance = e, t.$bg = e.$refs.bg, t.$stage = e.$refs.stage, t.$container = e.$refs.container, t.destroy(), t.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(t, "ontouchstart"))
      };
  u.prototype.destroy = function() {
      var e = this;
      e.$container.off(".fb.touch"), n(t).off(".fb.touch"), e.requestId && (o(e.requestId), e.requestId = null), e.tapped && (clearTimeout(e.tapped), e.tapped = null)
  }, u.prototype.ontouchstart = function(i) {
      var o = this,
          l = n(i.target),
          u = o.instance,
          h = u.current,
          d = h.$slide,
          f = h.$content,
          p = "touchstart" == i.type;
      if (p && o.$container.off("mousedown.fb.touch"), (!i.originalEvent || 2 != i.originalEvent.button) && d.length && l.length && !a(l) && !a(l.parent()) && (l.is("img") || !(i.originalEvent.clientX > l[0].clientWidth + l.offset().left))) {
          if (!h || u.isAnimating || h.$slide.hasClass("fancybox-animated")) return i.stopPropagation(), void i.preventDefault();
          o.realPoints = o.startPoints = r(i), o.startPoints.length && (h.touch && i.stopPropagation(), o.startEvent = i, o.canTap = !0, o.$target = l, o.$content = f, o.opts = h.opts.touch, o.isPanning = !1, o.isSwiping = !1, o.isZooming = !1, o.isScrolling = !1, o.canPan = u.canPan(), o.startTime = (new Date).getTime(), o.distanceX = o.distanceY = o.distance = 0, o.canvasWidth = Math.round(d[0].clientWidth), o.canvasHeight = Math.round(d[0].clientHeight), o.contentLastPos = null, o.contentStartPos = n.fancybox.getTranslate(o.$content) || {
              top: 0,
              left: 0
          }, o.sliderStartPos = n.fancybox.getTranslate(d), o.stagePos = n.fancybox.getTranslate(u.$refs.stage), o.sliderStartPos.top -= o.stagePos.top, o.sliderStartPos.left -= o.stagePos.left, o.contentStartPos.top -= o.stagePos.top, o.contentStartPos.left -= o.stagePos.left, n(t).off(".fb.touch").on(p ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(o, "ontouchend")).on(p ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(o, "ontouchmove")), n.fancybox.isMobile && t.addEventListener("scroll", o.onscroll, !0), ((o.opts || o.canPan) && (l.is(o.$stage) || o.$stage.find(l).length) || (l.is(".fancybox-image") && i.preventDefault(), n.fancybox.isMobile && l.parents(".fancybox-caption").length)) && (o.isScrollable = c(l) || c(l.parent()), n.fancybox.isMobile && o.isScrollable || i.preventDefault(), (1 === o.startPoints.length || h.hasError) && (o.canPan ? (n.fancybox.stop(o.$content), o.isPanning = !0) : o.isSwiping = !0, o.$container.addClass("fancybox-is-grabbing")), 2 === o.startPoints.length && "image" === h.type && (h.isLoaded || h.$ghost) && (o.canTap = !1, o.isSwiping = !1, o.isPanning = !1, o.isZooming = !0, n.fancybox.stop(o.$content), o.centerPointStartX = .5 * (o.startPoints[0].x + o.startPoints[1].x) - n(e).scrollLeft(), o.centerPointStartY = .5 * (o.startPoints[0].y + o.startPoints[1].y) - n(e).scrollTop(), o.percentageOfImageAtPinchPointX = (o.centerPointStartX - o.contentStartPos.left) / o.contentStartPos.width, o.percentageOfImageAtPinchPointY = (o.centerPointStartY - o.contentStartPos.top) / o.contentStartPos.height, o.startDistanceBetweenFingers = s(o.startPoints[0], o.startPoints[1]))))
      }
  }, u.prototype.onscroll = function(e) {
      this.isScrolling = !0, t.removeEventListener("scroll", this.onscroll, !0)
  }, u.prototype.ontouchmove = function(e) {
      var t = this;
      return void 0 !== e.originalEvent.buttons && 0 === e.originalEvent.buttons ? void t.ontouchend(e) : t.isScrolling ? void(t.canTap = !1) : (t.newPoints = r(e), void((t.opts || t.canPan) && t.newPoints.length && t.newPoints.length && (t.isSwiping && !0 === t.isSwiping || e.preventDefault(), t.distanceX = s(t.newPoints[0], t.startPoints[0], "x"), t.distanceY = s(t.newPoints[0], t.startPoints[0], "y"), t.distance = s(t.newPoints[0], t.startPoints[0]), t.distance > 0 && (t.isSwiping ? t.onSwipe(e) : t.isPanning ? t.onPan() : t.isZooming && t.onZoom()))))
  }, u.prototype.onSwipe = function(t) {
      var r, s = this,
          a = s.instance,
          l = s.isSwiping,
          c = s.sliderStartPos.left || 0;
      if (!0 !== l) "x" == l && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? c += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? c -= Math.pow(-s.distanceX, .8) : c += s.distanceX), s.sliderLastPos = {
          top: "x" == l ? 0 : s.sliderStartPos.top + s.distanceY,
          left: c
      }, s.requestId && (o(s.requestId), s.requestId = null), s.requestId = i(function() {
          s.sliderLastPos && (n.each(s.instance.slides, function(e, t) {
              var i = t.pos - s.instance.currPos;
              n.fancybox.setTranslate(t.$slide, {
                  top: s.sliderLastPos.top,
                  left: s.sliderLastPos.left + i * s.canvasWidth + i * t.opts.gutter
              })
          }), s.$container.addClass("fancybox-is-sliding"))
      });
      else if (Math.abs(s.distance) > 10) {
          if (s.canTap = !1, a.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : a.isDragging || !1 === s.opts.vertical || "auto" === s.opts.vertical && n(e).width() > 800 ? s.isSwiping = "x" : (r = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s.isSwiping = r > 45 && r < 135 ? "y" : "x"), "y" === s.isSwiping && n.fancybox.isMobile && s.isScrollable) return void(s.isScrolling = !0);
          a.isDragging = s.isSwiping, s.startPoints = s.newPoints, n.each(a.slides, function(e, t) {
              var i, o;
              n.fancybox.stop(t.$slide), i = n.fancybox.getTranslate(t.$slide), o = n.fancybox.getTranslate(a.$refs.stage), t.$slide.css({
                  transform: "",
                  opacity: "",
                  "transition-duration": ""
              }).removeClass("fancybox-animated").removeClass(function(e, t) {
                  return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
              }), t.pos === a.current.pos && (s.sliderStartPos.top = i.top - o.top, s.sliderStartPos.left = i.left - o.left), n.fancybox.setTranslate(t.$slide, {
                  top: i.top - o.top,
                  left: i.left - o.left
              })
          }), a.SlideShow && a.SlideShow.isActive && a.SlideShow.stop()
      }
  }, u.prototype.onPan = function() {
      var e = this;
      s(e.newPoints[0], e.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5) ? e.startPoints = e.newPoints : (e.canTap = !1, e.contentLastPos = e.limitMovement(), e.requestId && o(e.requestId), e.requestId = i(function() {
          n.fancybox.setTranslate(e.$content, e.contentLastPos)
      }))
  }, u.prototype.limitMovement = function() {
      var e, t, n, i, o, r, s = this,
          a = s.canvasWidth,
          l = s.canvasHeight,
          c = s.distanceX,
          u = s.distanceY,
          h = s.contentStartPos,
          d = h.left,
          f = h.top,
          p = h.width,
          g = h.height;
      return o = p > a ? d + c : d, r = f + u, e = Math.max(0, .5 * a - .5 * p), t = Math.max(0, .5 * l - .5 * g), n = Math.min(a - p, .5 * a - .5 * p), i = Math.min(l - g, .5 * l - .5 * g), c > 0 && o > e && (o = e - 1 + Math.pow(-e + d + c, .8) || 0), c < 0 && o < n && (o = n + 1 - Math.pow(n - d - c, .8) || 0), u > 0 && r > t && (r = t - 1 + Math.pow(-t + f + u, .8) || 0), u < 0 && r < i && (r = i + 1 - Math.pow(i - f - u, .8) || 0), {
          top: r,
          left: o
      }
  }, u.prototype.limitPosition = function(e, t, n, i) {
      var o = this.canvasWidth,
          r = this.canvasHeight;
      return n > o ? e = (e = e > 0 ? 0 : e) < o - n ? o - n : e : e = Math.max(0, o / 2 - n / 2), i > r ? t = (t = t > 0 ? 0 : t) < r - i ? r - i : t : t = Math.max(0, r / 2 - i / 2), {
          top: t,
          left: e
      }
  }, u.prototype.onZoom = function() {
      var t = this,
          r = t.contentStartPos,
          a = r.width,
          l = r.height,
          c = r.left,
          u = r.top,
          h = s(t.newPoints[0], t.newPoints[1]) / t.startDistanceBetweenFingers,
          d = Math.floor(a * h),
          f = Math.floor(l * h),
          p = (a - d) * t.percentageOfImageAtPinchPointX,
          g = (l - f) * t.percentageOfImageAtPinchPointY,
          m = (t.newPoints[0].x + t.newPoints[1].x) / 2 - n(e).scrollLeft(),
          v = (t.newPoints[0].y + t.newPoints[1].y) / 2 - n(e).scrollTop(),
          y = m - t.centerPointStartX,
          b = {
              top: u + (g + (v - t.centerPointStartY)),
              left: c + (p + y),
              scaleX: h,
              scaleY: h
          };
      t.canTap = !1, t.newWidth = d, t.newHeight = f, t.contentLastPos = b, t.requestId && o(t.requestId), t.requestId = i(function() {
          n.fancybox.setTranslate(t.$content, t.contentLastPos)
      })
  }, u.prototype.ontouchend = function(e) {
      var i = this,
          s = i.isSwiping,
          a = i.isPanning,
          l = i.isZooming,
          c = i.isScrolling;
      if (i.endPoints = r(e), i.dMs = Math.max((new Date).getTime() - i.startTime, 1), i.$container.removeClass("fancybox-is-grabbing"), n(t).off(".fb.touch"), t.removeEventListener("scroll", i.onscroll, !0), i.requestId && (o(i.requestId), i.requestId = null), i.isSwiping = !1, i.isPanning = !1, i.isZooming = !1, i.isScrolling = !1, i.instance.isDragging = !1, i.canTap) return i.onTap(e);
      i.speed = 100, i.velocityX = i.distanceX / i.dMs * .5, i.velocityY = i.distanceY / i.dMs * .5, a ? i.endPanning() : l ? i.endZooming() : i.endSwiping(s, c)
  }, u.prototype.endSwiping = function(e, t) {
      var i = this,
          o = !1,
          r = i.instance.group.length,
          s = Math.abs(i.distanceX),
          a = "x" == e && r > 1 && (i.dMs > 130 && s > 10 || s > 50);
      i.sliderLastPos = null, "y" == e && !t && Math.abs(i.distanceY) > 50 ? (n.fancybox.animate(i.instance.current.$slide, {
          top: i.sliderStartPos.top + i.distanceY + 150 * i.velocityY,
          opacity: 0
      }, 200), o = i.instance.close(!0, 250)) : a && i.distanceX > 0 ? o = i.instance.previous(300) : a && i.distanceX < 0 && (o = i.instance.next(300)), !1 !== o || "x" != e && "y" != e || i.instance.centerSlide(200), i.$container.removeClass("fancybox-is-sliding")
  }, u.prototype.endPanning = function() {
      var e, t, i, o = this;
      o.contentLastPos && (!1 === o.opts.momentum || o.dMs > 350 ? (e = o.contentLastPos.left, t = o.contentLastPos.top) : (e = o.contentLastPos.left + 500 * o.velocityX, t = o.contentLastPos.top + 500 * o.velocityY), (i = o.limitPosition(e, t, o.contentStartPos.width, o.contentStartPos.height)).width = o.contentStartPos.width, i.height = o.contentStartPos.height, n.fancybox.animate(o.$content, i, 366))
  }, u.prototype.endZooming = function() {
      var e, t, i, o, r = this,
          s = r.instance.current,
          a = r.newWidth,
          l = r.newHeight;
      r.contentLastPos && (e = r.contentLastPos.left, o = {
          top: t = r.contentLastPos.top,
          left: e,
          width: a,
          height: l,
          scaleX: 1,
          scaleY: 1
      }, n.fancybox.setTranslate(r.$content, o), a < r.canvasWidth && l < r.canvasHeight ? r.instance.scaleToFit(150) : a > s.width || l > s.height ? r.instance.scaleToActual(r.centerPointStartX, r.centerPointStartY, 150) : (i = r.limitPosition(e, t, a, l), n.fancybox.animate(r.$content, i, 150)))
  }, u.prototype.onTap = function(t) {
      var i, o = this,
          s = n(t.target),
          a = o.instance,
          l = a.current,
          c = t && r(t) || o.startPoints,
          u = c[0] ? c[0].x - n(e).scrollLeft() - o.stagePos.left : 0,
          h = c[0] ? c[0].y - n(e).scrollTop() - o.stagePos.top : 0,
          d = function(e) {
              var i = l.opts[e];
              if (n.isFunction(i) && (i = i.apply(a, [l, t])), i) switch (i) {
                  case "close":
                      a.close(o.startEvent);
                      break;
                  case "toggleControls":
                      a.toggleControls();
                      break;
                  case "next":
                      a.next();
                      break;
                  case "nextOrClose":
                      a.group.length > 1 ? a.next() : a.close(o.startEvent);
                      break;
                  case "zoom":
                      "image" == l.type && (l.isLoaded || l.$ghost) && (a.canPan() ? a.scaleToFit() : a.isScaledDown() ? a.scaleToActual(u, h) : a.group.length < 2 && a.close(o.startEvent))
              }
          };
      if ((!t.originalEvent || 2 != t.originalEvent.button) && (s.is("img") || !(u > s[0].clientWidth + s.offset().left))) {
          if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) i = "Outside";
          else if (s.is(".fancybox-slide")) i = "Slide";
          else {
              if (!a.current.$content || !a.current.$content.find(s).addBack().filter(s).length) return;
              i = "Content"
          }
          if (o.tapped) {
              if (clearTimeout(o.tapped), o.tapped = null, Math.abs(u - o.tapX) > 50 || Math.abs(h - o.tapY) > 50) return this;
              d("dblclick" + i)
          } else o.tapX = u, o.tapY = h, l.opts["dblclick" + i] && l.opts["dblclick" + i] !== l.opts["click" + i] ? o.tapped = setTimeout(function() {
              o.tapped = null, a.isAnimating || d("click" + i)
          }, 500) : d("click" + i);
          return this
      }
  }, n(t).on("onActivate.fb", function(e, t) {
      t && !t.Guestures && (t.Guestures = new u(t))
  }).on("beforeClose.fb", function(e, t) {
      t && t.Guestures && t.Guestures.destroy()
  })
}(window, document, jQuery),
function(e, t) {
  "use strict";
  t.extend(!0, t.fancybox.defaults, {
      btnTpl: {
          slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'
      },
      slideShow: {
          autoStart: !1,
          speed: 3e3,
          progress: !0
      }
  });
  var n = function(e) {
      this.instance = e, this.init()
  };
  t.extend(n.prototype, {
      timer: null,
      isActive: !1,
      $button: null,
      init: function() {
          var e = this,
              n = e.instance,
              i = n.group[n.currIndex].opts.slideShow;
          e.$button = n.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
              e.toggle()
          }), n.group.length < 2 || !i ? e.$button.hide() : i.progress && (e.$progress = t('<div class="fancybox-progress"></div>').appendTo(n.$refs.inner))
      },
      set: function(e) {
          var n = this,
              i = n.instance,
              o = i.current;
          o && (!0 === e || o.opts.loop || i.currIndex < i.group.length - 1) ? n.isActive && "video" !== o.contentType && (n.$progress && t.fancybox.animate(n.$progress.show(), {
              scaleX: 1
          }, o.opts.slideShow.speed), n.timer = setTimeout(function() {
              i.current.opts.loop || i.current.index != i.group.length - 1 ? i.next() : i.jumpTo(0)
          }, o.opts.slideShow.speed)) : (n.stop(), i.idleSecondsCounter = 0, i.showControls())
      },
      clear: function() {
          var e = this;
          clearTimeout(e.timer), e.timer = null, e.$progress && e.$progress.removeAttr("style").hide()
      },
      start: function() {
          var e = this,
              t = e.instance.current;
          t && (e.$button.attr("title", (t.opts.i18n[t.opts.lang] || t.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), e.isActive = !0, t.isComplete && e.set(!0), e.instance.trigger("onSlideShowChange", !0))
      },
      stop: function() {
          var e = this,
              t = e.instance.current;
          e.clear(), e.$button.attr("title", (t.opts.i18n[t.opts.lang] || t.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), e.isActive = !1, e.instance.trigger("onSlideShowChange", !1), e.$progress && e.$progress.removeAttr("style").hide()
      },
      toggle: function() {
          var e = this;
          e.isActive ? e.stop() : e.start()
      }
  }), t(e).on({
      "onInit.fb": function(e, t) {
          t && !t.SlideShow && (t.SlideShow = new n(t))
      },
      "beforeShow.fb": function(e, t, n, i) {
          var o = t && t.SlideShow;
          i ? o && n.opts.slideShow.autoStart && o.start() : o && o.isActive && o.clear()
      },
      "afterShow.fb": function(e, t, n) {
          var i = t && t.SlideShow;
          i && i.isActive && i.set()
      },
      "afterKeydown.fb": function(n, i, o, r, s) {
          var a = i && i.SlideShow;
          !a || !o.opts.slideShow || 80 !== s && 32 !== s || t(e.activeElement).is("button,a,input") || (r.preventDefault(), a.toggle())
      },
      "beforeClose.fb onDeactivate.fb": function(e, t) {
          var n = t && t.SlideShow;
          n && n.stop()
      }
  }), t(e).on("visibilitychange", function() {
      var n = t.fancybox.getInstance(),
          i = n && n.SlideShow;
      i && i.isActive && (e.hidden ? i.clear() : i.set())
  })
}(document, jQuery),
function(e, t) {
  "use strict";
  var n = function() {
      for (var t = [
              ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
              ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
              ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
              ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
              ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
          ], n = {}, i = 0; i < t.length; i++) {
          var o = t[i];
          if (o && o[1] in e) {
              for (var r = 0; r < o.length; r++) n[t[0][r]] = o[r];
              return n
          }
      }
      return !1
  }();
  if (n) {
      var i = {
          request: function(t) {
              (t = t || e.documentElement)[n.requestFullscreen](t.ALLOW_KEYBOARD_INPUT)
          },
          exit: function() {
              e[n.exitFullscreen]()
          },
          toggle: function(t) {
              t = t || e.documentElement, this.isFullscreen() ? this.exit() : this.request(t)
          },
          isFullscreen: function() {
              return Boolean(e[n.fullscreenElement])
          },
          enabled: function() {
              return Boolean(e[n.fullscreenEnabled])
          }
      };
      t.extend(!0, t.fancybox.defaults, {
          btnTpl: {
              fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'
          },
          fullScreen: {
              autoStart: !1
          }
      }), t(e).on(n.fullscreenchange, function() {
          var e = i.isFullscreen(),
              n = t.fancybox.getInstance();
          n && (n.current && "image" === n.current.type && n.isAnimating && (n.isAnimating = !1, n.update(!0, !0, 0), n.isComplete || n.complete()), n.trigger("onFullscreenChange", e), n.$refs.container.toggleClass("fancybox-is-fullscreen", e), n.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !e).toggleClass("fancybox-button--fsexit", e))
      })
  }
  t(e).on({
      "onInit.fb": function(e, t) {
          n ? t && t.group[t.currIndex].opts.fullScreen ? (t.$refs.container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(e) {
              e.stopPropagation(), e.preventDefault(), i.toggle()
          }), t.opts.fullScreen && !0 === t.opts.fullScreen.autoStart && i.request(), t.FullScreen = i) : t && t.$refs.toolbar.find("[data-fancybox-fullscreen]").hide() : t.$refs.toolbar.find("[data-fancybox-fullscreen]").remove()
      },
      "afterKeydown.fb": function(e, t, n, i, o) {
          t && t.FullScreen && 70 === o && (i.preventDefault(), t.FullScreen.toggle())
      },
      "beforeClose.fb": function(e, t) {
          t && t.FullScreen && t.$refs.container.hasClass("fancybox-is-fullscreen") && i.exit()
      }
  })
}(document, jQuery),
function(e, t) {
  "use strict";
  var n = "fancybox-thumbs";
  t.fancybox.defaults = t.extend(!0, {
      btnTpl: {
          thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'
      },
      thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: ".fancybox-container",
          axis: "y"
      }
  }, t.fancybox.defaults);
  var i = function(e) {
      this.init(e)
  };
  t.extend(i.prototype, {
      $button: null,
      $grid: null,
      $list: null,
      isVisible: !1,
      isActive: !1,
      init: function(e) {
          var t = this,
              n = e.group,
              i = 0;
          t.instance = e, t.opts = n[e.currIndex].opts.thumbs, e.Thumbs = t, t.$button = e.$refs.toolbar.find("[data-fancybox-thumbs]");
          for (var o = 0, r = n.length; o < r && (n[o].thumb && i++, !(i > 1)); o++);
          i > 1 && t.opts ? (t.$button.removeAttr("style").on("click", function() {
              t.toggle()
          }), t.isActive = !0) : t.$button.hide()
      },
      create: function() {
          var e, i = this,
              o = i.instance,
              r = i.opts.parentEl,
              s = [];
          i.$grid || (i.$grid = t('<div class="' + n + " " + n + "-" + i.opts.axis + '"></div>').appendTo(o.$refs.container.find(r).addBack().filter(r)), i.$grid.on("click", "a", function() {
              o.jumpTo(t(this).attr("data-index"))
          })), i.$list || (i.$list = t('<div class="' + n + '__list">').appendTo(i.$grid)), t.each(o.group, function(t, n) {
              (e = n.thumb) || "image" !== n.type || (e = n.src), s.push('<a href="javascript:;" tabindex="0" data-index="' + t + '"' + (e && e.length ? ' style="background-image:url(' + e + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
          }), i.$list[0].innerHTML = s.join(""), "x" === i.opts.axis && i.$list.width(parseInt(i.$grid.css("padding-right"), 10) + o.group.length * i.$list.children().eq(0).outerWidth(!0))
      },
      focus: function(e) {
          var t, n, i = this,
              o = i.$list,
              r = i.$grid;
          i.instance.current && (n = (t = o.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + i.instance.current.index + '"]').addClass("fancybox-thumbs-active")).position(), "y" === i.opts.axis && (n.top < 0 || n.top > o.height() - t.outerHeight()) ? o.stop().animate({
              scrollTop: o.scrollTop() + n.top
          }, e) : "x" === i.opts.axis && (n.left < r.scrollLeft() || n.left > r.scrollLeft() + (r.width() - t.outerWidth())) && o.parent().stop().animate({
              scrollLeft: n.left
          }, e))
      },
      update: function() {
          var e = this;
          e.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), e.isVisible ? (e.$grid || e.create(), e.instance.trigger("onThumbsShow"), e.focus(0)) : e.$grid && e.instance.trigger("onThumbsHide"), e.instance.update()
      },
      hide: function() {
          this.isVisible = !1, this.update()
      },
      show: function() {
          this.isVisible = !0, this.update()
      },
      toggle: function() {
          this.isVisible = !this.isVisible, this.update()
      }
  }), t(e).on({
      "onInit.fb": function(e, t) {
          var n;
          t && !t.Thumbs && ((n = new i(t)).isActive && !0 === n.opts.autoStart && n.show())
      },
      "beforeShow.fb": function(e, t, n, i) {
          var o = t && t.Thumbs;
          o && o.isVisible && o.focus(i ? 0 : 250)
      },
      "afterKeydown.fb": function(e, t, n, i, o) {
          var r = t && t.Thumbs;
          r && r.isActive && 71 === o && (i.preventDefault(), r.toggle())
      },
      "beforeClose.fb": function(e, t) {
          var n = t && t.Thumbs;
          n && n.isVisible && !1 !== n.opts.hideOnClose && n.$grid.hide()
      }
  })
}(document, jQuery),
function(e, t) {
  "use strict";
  t.extend(!0, t.fancybox.defaults, {
      btnTpl: {
          share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'
      },
      share: {
          url: function(e, t) {
              return !e.currentHash && "inline" !== t.type && "html" !== t.type && (t.origSrc || t.src) || window.location
          },
          tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
      }
  }), t(e).on("click", "[data-fancybox-share]", function() {
      var e, n, i = t.fancybox.getInstance(),
          o = i.current || null;
      o && ("function" === t.type(o.opts.share.url) && (e = o.opts.share.url.apply(o, [i, o])), n = o.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === o.type ? encodeURIComponent(o.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(e)).replace(/\{\{url_raw\}\}/g, function(e) {
          var t = {
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
              "/": "&#x2F;",
              "`": "&#x60;",
              "=": "&#x3D;"
          };
          return String(e).replace(/[&<>"'`=\/]/g, function(e) {
              return t[e]
          })
      }(e)).replace(/\{\{descr\}\}/g, i.$caption ? encodeURIComponent(i.$caption.text()) : ""), t.fancybox.open({
          src: i.translate(i, n),
          type: "html",
          opts: {
              touch: !1,
              animationEffect: !1,
              afterLoad: function(e, t) {
                  i.$refs.container.one("beforeClose.fb", function() {
                      e.close(null, 0)
                  }), t.$content.find(".fancybox-share__button").click(function() {
                      return window.open(this.href, "Share", "width=550, height=450"), !1
                  })
              },
              mobile: {
                  autoFocus: !1
              }
          }
      }))
  })
}(document, jQuery),
function(e, t, n) {
  "use strict";

  function i() {
      var t = e.location.hash.substr(1),
          n = t.split("-"),
          i = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) && parseInt(n.pop(-1), 10) || 1;
      return {
          hash: t,
          index: i < 1 ? 1 : i,
          gallery: n.join("-")
      }
  }

  function o(e) {
      "" !== e.gallery && n("[data-fancybox='" + n.escapeSelector(e.gallery) + "']").eq(e.index - 1).focus().trigger("click.fb-start")
  }

  function r(e) {
      var t, n;
      return !!e && ("" !== (n = (t = e.current ? e.current.opts : e.opts).hash || (t.$orig ? t.$orig.data("fancybox") || t.$orig.data("fancybox-trigger") : "")) && n)
  }
  n.escapeSelector || (n.escapeSelector = function(e) {
      return (e + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function(e, t) {
          return t ? "\0" === e ? "ï¿½" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
      })
  }), n(function() {
      !1 !== n.fancybox.defaults.hash && (n(t).on({
          "onInit.fb": function(e, t) {
              var n, o;
              !1 !== t.group[t.currIndex].opts.hash && (n = i(), (o = r(t)) && n.gallery && o == n.gallery && (t.currIndex = n.index - 1))
          },
          "beforeShow.fb": function(n, i, o, s) {
              var a;
              o && !1 !== o.opts.hash && (a = r(i)) && (i.currentHash = a + (i.group.length > 1 ? "-" + (o.index + 1) : ""), e.location.hash !== "#" + i.currentHash && (s && !i.origHash && (i.origHash = e.location.hash), i.hashTimer && clearTimeout(i.hashTimer), i.hashTimer = setTimeout(function() {
                  "replaceState" in e.history ? (e.history[s ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + i.currentHash), s && (i.hasCreatedHistory = !0)) : e.location.hash = i.currentHash, i.hashTimer = null
              }, 300)))
          },
          "beforeClose.fb": function(n, i, o) {
              o && !1 !== o.opts.hash && (clearTimeout(i.hashTimer), i.currentHash && i.hasCreatedHistory ? e.history.back() : i.currentHash && ("replaceState" in e.history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + (i.origHash || "")) : e.location.hash = i.origHash), i.currentHash = null)
          }
      }), n(e).on("hashchange.fb", function() {
          var e = i(),
              t = null;
          n.each(n(".fancybox-container").get().reverse(), function(e, i) {
              var o = n(i).data("FancyBox");
              if (o && o.currentHash) return t = o, !1
          }), t ? t.currentHash === e.gallery + "-" + e.index || 1 === e.index && t.currentHash == e.gallery || (t.currentHash = null, t.close()) : "" !== e.gallery && o(e)
      }), setTimeout(function() {
          n.fancybox.getInstance() || o(i())
      }, 50))
  })
}(window, document, jQuery),
function(e, t) {
  "use strict";
  var n = (new Date).getTime();
  t(e).on({
      "onInit.fb": function(e, t, i) {
          t.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(e) {
              var i = t.current,
                  o = (new Date).getTime();
              t.group.length < 2 || !1 === i.opts.wheel || "auto" === i.opts.wheel && "image" !== i.type || (e.preventDefault(), e.stopPropagation(), i.$slide.hasClass("fancybox-animated") || (e = e.originalEvent || e, o - n < 250 || (n = o, t[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]())))
          })
      }
  })
}(document, jQuery), "object" == typeof navigator && function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Plyr", t) : (e = e || self).Plyr = t()
}(this, function() {
  "use strict";
  ! function() {
      if ("undefined" != typeof window) try {
          var e = new window.CustomEvent("test", {
              cancelable: !0
          });
          if (e.preventDefault(), !0 !== e.defaultPrevented) throw new Error("Could not prevent default")
      } catch (e) {
          var t = function(e, t) {
              var n, i;
              return (t = t || {}).bubbles = !!t.bubbles, t.cancelable = !!t.cancelable, (n = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i = n.preventDefault, n.preventDefault = function() {
                  i.call(this);
                  try {
                      Object.defineProperty(this, "defaultPrevented", {
                          get: function() {
                              return !0
                          }
                      })
                  } catch (e) {
                      this.defaultPrevented = !0
                  }
              }, n
          };
          t.prototype = window.Event.prototype, window.CustomEvent = t
      }
  }();
  var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

  function t(e, t) {
      return e(t = {
          exports: {}
      }, t.exports), t.exports
  }
  var n = function(e) {
          return e && e.Math == Math && e
      },
      i = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof e && e) || Function("return this")(),
      o = function(e) {
          try {
              return !!e()
          } catch (e) {
              return !0
          }
      },
      r = !o(function() {
          return 7 != Object.defineProperty({}, 1, {
              get: function() {
                  return 7
              }
          })[1]
      }),
      s = {}.propertyIsEnumerable,
      a = Object.getOwnPropertyDescriptor,
      l = {
          f: a && !s.call({
              1: 2
          }, 1) ? function(e) {
              var t = a(this, e);
              return !!t && t.enumerable
          } : s
      },
      c = function(e, t) {
          return {
              enumerable: !(1 & e),
              configurable: !(2 & e),
              writable: !(4 & e),
              value: t
          }
      },
      u = {}.toString,
      h = function(e) {
          return u.call(e).slice(8, -1)
      },
      d = "".split,
      f = o(function() {
          return !Object("z").propertyIsEnumerable(0)
      }) ? function(e) {
          return "String" == h(e) ? d.call(e, "") : Object(e)
      } : Object,
      p = function(e) {
          if (null == e) throw TypeError("Can't call method on " + e);
          return e
      },
      g = function(e) {
          return f(p(e))
      },
      m = function(e) {
          return "object" == typeof e ? null !== e : "function" == typeof e
      },
      v = function(e, t) {
          if (!m(e)) return e;
          var n, i;
          if (t && "function" == typeof(n = e.toString) && !m(i = n.call(e))) return i;
          if ("function" == typeof(n = e.valueOf) && !m(i = n.call(e))) return i;
          if (!t && "function" == typeof(n = e.toString) && !m(i = n.call(e))) return i;
          throw TypeError("Can't convert object to primitive value")
      },
      y = {}.hasOwnProperty,
      b = function(e, t) {
          return y.call(e, t)
      },
      w = i.document,
      x = m(w) && m(w.createElement),
      S = function(e) {
          return x ? w.createElement(e) : {}
      },
      k = !r && !o(function() {
          return 7 != Object.defineProperty(S("div"), "a", {
              get: function() {
                  return 7
              }
          }).a
      }),
      T = Object.getOwnPropertyDescriptor,
      C = {
          f: r ? T : function(e, t) {
              if (e = g(e), t = v(t, !0), k) try {
                  return T(e, t)
              } catch (e) {}
              if (b(e, t)) return c(!l.f.call(e, t), e[t])
          }
      },
      E = function(e) {
          if (!m(e)) throw TypeError(String(e) + " is not an object");
          return e
      },
      A = Object.defineProperty,
      P = {
          f: r ? A : function(e, t, n) {
              if (E(e), t = v(t, !0), E(n), k) try {
                  return A(e, t, n)
              } catch (e) {}
              if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
              return "value" in n && (e[t] = n.value), e
          }
      },
      L = r ? function(e, t, n) {
          return P.f(e, t, c(1, n))
      } : function(e, t, n) {
          return e[t] = n, e
      },
      I = function(e, t) {
          try {
              L(i, e, t)
          } catch (n) {
              i[e] = t
          }
          return t
      },
      j = i["__core-js_shared__"] || I("__core-js_shared__", {}),
      D = Function.toString;
  "function" != typeof j.inspectSource && (j.inspectSource = function(e) {
      return D.call(e)
  });
  var M, O, N, _ = j.inspectSource,
      R = i.WeakMap,
      $ = "function" == typeof R && /native code/.test(_(R)),
      z = t(function(e) {
          (e.exports = function(e, t) {
              return j[e] || (j[e] = void 0 !== t ? t : {})
          })("versions", []).push({
              version: "3.6.4",
              mode: "global",
              copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
          })
      }),
      F = 0,
      q = Math.random(),
      H = function(e) {
          return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++F + q).toString(36)
      },
      U = z("keys"),
      B = function(e) {
          return U[e] || (U[e] = H(e))
      },
      W = {},
      V = i.WeakMap;
  if ($) {
      var X = new V,
          Y = X.get,
          Q = X.has,
          G = X.set;
      M = function(e, t) {
          return G.call(X, e, t), t
      }, O = function(e) {
          return Y.call(X, e) || {}
      }, N = function(e) {
          return Q.call(X, e)
      }
  } else {
      var K = B("state");
      W[K] = !0, M = function(e, t) {
          return L(e, K, t), t
      }, O = function(e) {
          return b(e, K) ? e[K] : {}
      }, N = function(e) {
          return b(e, K)
      }
  }
  var Z, J = {
          set: M,
          get: O,
          has: N,
          enforce: function(e) {
              return N(e) ? O(e) : M(e, {})
          },
          getterFor: function(e) {
              return function(t) {
                  var n;
                  if (!m(t) || (n = O(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");
                  return n
              }
          }
      },
      ee = t(function(e) {
          var t = J.get,
              n = J.enforce,
              o = String(String).split("String");
          (e.exports = function(e, t, r, s) {
              var a = !!s && !!s.unsafe,
                  l = !!s && !!s.enumerable,
                  c = !!s && !!s.noTargetGet;
              "function" == typeof r && ("string" != typeof t || b(r, "name") || L(r, "name", t), n(r).source = o.join("string" == typeof t ? t : "")), e !== i ? (a ? !c && e[t] && (l = !0) : delete e[t], l ? e[t] = r : L(e, t, r)) : l ? e[t] = r : I(t, r)
          })(Function.prototype, "toString", function() {
              return "function" == typeof this && t(this).source || _(this)
          })
      }),
      te = i,
      ne = function(e) {
          return "function" == typeof e ? e : void 0
      },
      ie = function(e, t) {
          return arguments.length < 2 ? ne(te[e]) || ne(i[e]) : te[e] && te[e][t] || i[e] && i[e][t]
      },
      oe = Math.ceil,
      re = Math.floor,
      se = function(e) {
          return isNaN(e = +e) ? 0 : (e > 0 ? re : oe)(e)
      },
      ae = Math.min,
      le = function(e) {
          return e > 0 ? ae(se(e), 9007199254740991) : 0
      },
      ce = Math.max,
      ue = Math.min,
      he = function(e, t) {
          var n = se(e);
          return n < 0 ? ce(n + t, 0) : ue(n, t)
      },
      de = function(e) {
          return function(t, n, i) {
              var o, r = g(t),
                  s = le(r.length),
                  a = he(i, s);
              if (e && n != n) {
                  for (; s > a;)
                      if ((o = r[a++]) != o) return !0
              } else
                  for (; s > a; a++)
                      if ((e || a in r) && r[a] === n) return e || a || 0;
              return !e && -1
          }
      },
      fe = {
          includes: de(!0),
          indexOf: de(!1)
      },
      pe = fe.indexOf,
      ge = function(e, t) {
          var n, i = g(e),
              o = 0,
              r = [];
          for (n in i) !b(W, n) && b(i, n) && r.push(n);
          for (; t.length > o;) b(i, n = t[o++]) && (~pe(r, n) || r.push(n));
          return r
      },
      me = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
      ve = me.concat("length", "prototype"),
      ye = {
          f: Object.getOwnPropertyNames || function(e) {
              return ge(e, ve)
          }
      },
      be = {
          f: Object.getOwnPropertySymbols
      },
      we = ie("Reflect", "ownKeys") || function(e) {
          var t = ye.f(E(e)),
              n = be.f;
          return n ? t.concat(n(e)) : t
      },
      xe = function(e, t) {
          for (var n = we(t), i = P.f, o = C.f, r = 0; r < n.length; r++) {
              var s = n[r];
              b(e, s) || i(e, s, o(t, s))
          }
      },
      Se = /#|\.prototype\./,
      ke = function(e, t) {
          var n = Ce[Te(e)];
          return n == Ae || n != Ee && ("function" == typeof t ? o(t) : !!t)
      },
      Te = ke.normalize = function(e) {
          return String(e).replace(Se, ".").toLowerCase()
      },
      Ce = ke.data = {},
      Ee = ke.NATIVE = "N",
      Ae = ke.POLYFILL = "P",
      Pe = ke,
      Le = C.f,
      Ie = function(e, t) {
          var n, o, r, s, a, l = e.target,
              c = e.global,
              u = e.stat;
          if (n = c ? i : u ? i[l] || I(l, {}) : (i[l] || {}).prototype)
              for (o in t) {
                  if (s = t[o], r = e.noTargetGet ? (a = Le(n, o)) && a.value : n[o], !Pe(c ? o : l + (u ? "." : "#") + o, e.forced) && void 0 !== r) {
                      if (typeof s == typeof r) continue;
                      xe(s, r)
                  }(e.sham || r && r.sham) && L(s, "sham", !0), ee(n, o, s, e)
              }
      },
      je = !!Object.getOwnPropertySymbols && !o(function() {
          return !String(Symbol())
      }),
      De = je && !Symbol.sham && "symbol" == typeof Symbol.iterator,
      Me = Array.isArray || function(e) {
          return "Array" == h(e)
      },
      Oe = function(e) {
          return Object(p(e))
      },
      Ne = Object.keys || function(e) {
          return ge(e, me)
      },
      _e = r ? Object.defineProperties : function(e, t) {
          E(e);
          for (var n, i = Ne(t), o = i.length, r = 0; o > r;) P.f(e, n = i[r++], t[n]);
          return e
      },
      Re = ie("document", "documentElement"),
      $e = B("IE_PROTO"),
      ze = function() {},
      Fe = function(e) {
          return "<script>" + e + "<\/script>"
      },
      qe = function() {
          try {
              Z = document.domain && new ActiveXObject("htmlfile")
          } catch (e) {}
          var e, t;
          qe = Z ? function(e) {
              e.write(Fe("")), e.close();
              var t = e.parentWindow.Object;
              return e = null, t
          }(Z) : ((t = S("iframe")).style.display = "none", Re.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(Fe("document.F=Object")), e.close(), e.F);
          for (var n = me.length; n--;) delete qe.prototype[me[n]];
          return qe()
      };
  W[$e] = !0;
  var He = Object.create || function(e, t) {
          var n;
          return null !== e ? (ze.prototype = E(e), n = new ze, ze.prototype = null, n[$e] = e) : n = qe(), void 0 === t ? n : _e(n, t)
      },
      Ue = ye.f,
      Be = {}.toString,
      We = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
      Ve = {
          f: function(e) {
              return We && "[object Window]" == Be.call(e) ? function(e) {
                  try {
                      return Ue(e)
                  } catch (e) {
                      return We.slice()
                  }
              }(e) : Ue(g(e))
          }
      },
      Xe = z("wks"),
      Ye = i.Symbol,
      Qe = De ? Ye : Ye && Ye.withoutSetter || H,
      Ge = function(e) {
          return b(Xe, e) || (je && b(Ye, e) ? Xe[e] = Ye[e] : Xe[e] = Qe("Symbol." + e)), Xe[e]
      },
      Ke = {
          f: Ge
      },
      Ze = P.f,
      Je = function(e) {
          var t = te.Symbol || (te.Symbol = {});
          b(t, e) || Ze(t, e, {
              value: Ke.f(e)
          })
      },
      et = P.f,
      tt = Ge("toStringTag"),
      nt = function(e, t, n) {
          e && !b(e = n ? e : e.prototype, tt) && et(e, tt, {
              configurable: !0,
              value: t
          })
      },
      it = function(e) {
          if ("function" != typeof e) throw TypeError(String(e) + " is not a function");
          return e
      },
      ot = function(e, t, n) {
          if (it(e), void 0 === t) return e;
          switch (n) {
              case 0:
                  return function() {
                      return e.call(t)
                  };
              case 1:
                  return function(n) {
                      return e.call(t, n)
                  };
              case 2:
                  return function(n, i) {
                      return e.call(t, n, i)
                  };
              case 3:
                  return function(n, i, o) {
                      return e.call(t, n, i, o)
                  }
          }
          return function() {
              return e.apply(t, arguments)
          }
      },
      rt = Ge("species"),
      st = function(e, t) {
          var n;
          return Me(e) && ("function" != typeof(n = e.constructor) || n !== Array && !Me(n.prototype) ? m(n) && null === (n = n[rt]) && (n = void 0) : n = void 0), new(void 0 === n ? Array : n)(0 === t ? 0 : t)
      },
      at = [].push,
      lt = function(e) {
          var t = 1 == e,
              n = 2 == e,
              i = 3 == e,
              o = 4 == e,
              r = 6 == e,
              s = 5 == e || r;
          return function(a, l, c, u) {
              for (var h, d, p = Oe(a), g = f(p), m = ot(l, c, 3), v = le(g.length), y = 0, b = u || st, w = t ? b(a, v) : n ? b(a, 0) : void 0; v > y; y++)
                  if ((s || y in g) && (d = m(h = g[y], y, p), e))
                      if (t) w[y] = d;
                      else if (d) switch (e) {
                  case 3:
                      return !0;
                  case 5:
                      return h;
                  case 6:
                      return y;
                  case 2:
                      at.call(w, h)
              } else if (o) return !1;
              return r ? -1 : i || o ? o : w
          }
      },
      ct = {
          forEach: lt(0),
          map: lt(1),
          filter: lt(2),
          some: lt(3),
          every: lt(4),
          find: lt(5),
          findIndex: lt(6)
      },
      ut = ct.forEach,
      ht = B("hidden"),
      dt = Ge("toPrimitive"),
      ft = J.set,
      pt = J.getterFor("Symbol"),
      gt = Object.prototype,
      mt = i.Symbol,
      vt = ie("JSON", "stringify"),
      yt = C.f,
      bt = P.f,
      wt = Ve.f,
      xt = l.f,
      St = z("symbols"),
      kt = z("op-symbols"),
      Tt = z("string-to-symbol-registry"),
      Ct = z("symbol-to-string-registry"),
      Et = z("wks"),
      At = i.QObject,
      Pt = !At || !At.prototype || !At.prototype.findChild,
      Lt = r && o(function() {
          return 7 != He(bt({}, "a", {
              get: function() {
                  return bt(this, "a", {
                      value: 7
                  }).a
              }
          })).a
      }) ? function(e, t, n) {
          var i = yt(gt, t);
          i && delete gt[t], bt(e, t, n), i && e !== gt && bt(gt, t, i)
      } : bt,
      It = function(e, t) {
          var n = St[e] = He(mt.prototype);
          return ft(n, {
              type: "Symbol",
              tag: e,
              description: t
          }), r || (n.description = t), n
      },
      jt = De ? function(e) {
          return "symbol" == typeof e
      } : function(e) {
          return Object(e) instanceof mt
      },
      Dt = function(e, t, n) {
          e === gt && Dt(kt, t, n), E(e);
          var i = v(t, !0);
          return E(n), b(St, i) ? (n.enumerable ? (b(e, ht) && e[ht][i] && (e[ht][i] = !1), n = He(n, {
              enumerable: c(0, !1)
          })) : (b(e, ht) || bt(e, ht, c(1, {})), e[ht][i] = !0), Lt(e, i, n)) : bt(e, i, n)
      },
      Mt = function(e, t) {
          E(e);
          var n = g(t),
              i = Ne(n).concat(Rt(n));
          return ut(i, function(t) {
              r && !Ot.call(n, t) || Dt(e, t, n[t])
          }), e
      },
      Ot = function(e) {
          var t = v(e, !0),
              n = xt.call(this, t);
          return !(this === gt && b(St, t) && !b(kt, t)) && (!(n || !b(this, t) || !b(St, t) || b(this, ht) && this[ht][t]) || n)
      },
      Nt = function(e, t) {
          var n = g(e),
              i = v(t, !0);
          if (n !== gt || !b(St, i) || b(kt, i)) {
              var o = yt(n, i);
              return !o || !b(St, i) || b(n, ht) && n[ht][i] || (o.enumerable = !0), o
          }
      },
      _t = function(e) {
          var t = wt(g(e)),
              n = [];
          return ut(t, function(e) {
              b(St, e) || b(W, e) || n.push(e)
          }), n
      },
      Rt = function(e) {
          var t = e === gt,
              n = wt(t ? kt : g(e)),
              i = [];
          return ut(n, function(e) {
              !b(St, e) || t && !b(gt, e) || i.push(St[e])
          }), i
      };
  if (je || (ee((mt = function() {
          if (this instanceof mt) throw TypeError("Symbol is not a constructor");
          var e = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0,
              t = H(e),
              n = function(e) {
                  this === gt && n.call(kt, e), b(this, ht) && b(this[ht], t) && (this[ht][t] = !1), Lt(this, t, c(1, e))
              };
          return r && Pt && Lt(gt, t, {
              configurable: !0,
              set: n
          }), It(t, e)
      }).prototype, "toString", function() {
          return pt(this).tag
      }), ee(mt, "withoutSetter", function(e) {
          return It(H(e), e)
      }), l.f = Ot, P.f = Dt, C.f = Nt, ye.f = Ve.f = _t, be.f = Rt, Ke.f = function(e) {
          return It(Ge(e), e)
      }, r && (bt(mt.prototype, "description", {
          configurable: !0,
          get: function() {
              return pt(this).description
          }
      }), ee(gt, "propertyIsEnumerable", Ot, {
          unsafe: !0
      }))), Ie({
          global: !0,
          wrap: !0,
          forced: !je,
          sham: !je
      }, {
          Symbol: mt
      }), ut(Ne(Et), function(e) {
          Je(e)
      }), Ie({
          target: "Symbol",
          stat: !0,
          forced: !je
      }, {
          for: function(e) {
              var t = String(e);
              if (b(Tt, t)) return Tt[t];
              var n = mt(t);
              return Tt[t] = n, Ct[n] = t, n
          },
          keyFor: function(e) {
              if (!jt(e)) throw TypeError(e + " is not a symbol");
              if (b(Ct, e)) return Ct[e]
          },
          useSetter: function() {
              Pt = !0
          },
          useSimple: function() {
              Pt = !1
          }
      }), Ie({
          target: "Object",
          stat: !0,
          forced: !je,
          sham: !r
      }, {
          create: function(e, t) {
              return void 0 === t ? He(e) : Mt(He(e), t)
          },
          defineProperty: Dt,
          defineProperties: Mt,
          getOwnPropertyDescriptor: Nt
      }), Ie({
          target: "Object",
          stat: !0,
          forced: !je
      }, {
          getOwnPropertyNames: _t,
          getOwnPropertySymbols: Rt
      }), Ie({
          target: "Object",
          stat: !0,
          forced: o(function() {
              be.f(1)
          })
      }, {
          getOwnPropertySymbols: function(e) {
              return be.f(Oe(e))
          }
      }), vt) {
      var $t = !je || o(function() {
          var e = mt();
          return "[null]" != vt([e]) || "{}" != vt({
              a: e
          }) || "{}" != vt(Object(e))
      });
      Ie({
          target: "JSON",
          stat: !0,
          forced: $t
      }, {
          stringify: function(e, t, n) {
              for (var i, o = [e], r = 1; arguments.length > r;) o.push(arguments[r++]);
              if (i = t, (m(t) || void 0 !== e) && !jt(e)) return Me(t) || (t = function(e, t) {
                  if ("function" == typeof i && (t = i.call(this, e, t)), !jt(t)) return t
              }), o[1] = t, vt.apply(null, o)
          }
      })
  }
  mt.prototype[dt] || L(mt.prototype, dt, mt.prototype.valueOf), nt(mt, "Symbol"), W[ht] = !0;
  var zt = P.f,
      Ft = i.Symbol;
  if (r && "function" == typeof Ft && (!("description" in Ft.prototype) || void 0 !== Ft().description)) {
      var qt = {},
          Ht = function() {
              var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0]),
                  t = this instanceof Ht ? new Ft(e) : void 0 === e ? Ft() : Ft(e);
              return "" === e && (qt[t] = !0), t
          };
      xe(Ht, Ft);
      var Ut = Ht.prototype = Ft.prototype;
      Ut.constructor = Ht;
      var Bt = Ut.toString,
          Wt = "Symbol(test)" == String(Ft("test")),
          Vt = /^Symbol\((.*)\)[^)]+$/;
      zt(Ut, "description", {
          configurable: !0,
          get: function() {
              var e = m(this) ? this.valueOf() : this,
                  t = Bt.call(e);
              if (b(qt, e)) return "";
              var n = Wt ? t.slice(7, -1) : t.replace(Vt, "$1");
              return "" === n ? void 0 : n
          }
      }), Ie({
          global: !0,
          forced: !0
      }, {
          Symbol: Ht
      })
  }
  Je("iterator");
  var Xt = function(e, t) {
          var n = [][e];
          return !!n && o(function() {
              n.call(null, t || function() {
                  throw 1
              }, 1)
          })
      },
      Yt = Object.defineProperty,
      Qt = {},
      Gt = function(e) {
          throw e
      },
      Kt = function(e, t) {
          if (b(Qt, e)) return Qt[e];
          t || (t = {});
          var n = [][e],
              i = !!b(t, "ACCESSORS") && t.ACCESSORS,
              s = b(t, 0) ? t[0] : Gt,
              a = b(t, 1) ? t[1] : void 0;
          return Qt[e] = !!n && !o(function() {
              if (i && !r) return !0;
              var e = {
                  length: -1
              };
              i ? Yt(e, 1, {
                  enumerable: !0,
                  get: Gt
              }) : e[1] = 1, n.call(e, s, a)
          })
      },
      Zt = ct.forEach,
      Jt = Xt("forEach"),
      en = Kt("forEach"),
      tn = Jt && en ? [].forEach : function(e) {
          return Zt(this, e, arguments.length > 1 ? arguments[1] : void 0)
      };
  Ie({
      target: "Array",
      proto: !0,
      forced: [].forEach != tn
  }, {
      forEach: tn
  });
  var nn = fe.indexOf,
      on = [].indexOf,
      rn = !!on && 1 / [1].indexOf(1, -0) < 0,
      sn = Xt("indexOf"),
      an = Kt("indexOf", {
          ACCESSORS: !0,
          1: 0
      });
  Ie({
      target: "Array",
      proto: !0,
      forced: rn || !sn || !an
  }, {
      indexOf: function(e) {
          return rn ? on.apply(this, arguments) || 0 : nn(this, e, arguments.length > 1 ? arguments[1] : void 0)
      }
  });
  var ln = Ge("unscopables"),
      cn = Array.prototype;
  null == cn[ln] && P.f(cn, ln, {
      configurable: !0,
      value: He(null)
  });
  var un, hn, dn, fn = function(e) {
          cn[ln][e] = !0
      },
      pn = {},
      gn = !o(function() {
          function e() {}
          return e.prototype.constructor = null, Object.getPrototypeOf(new e) !== e.prototype
      }),
      mn = B("IE_PROTO"),
      vn = Object.prototype,
      yn = gn ? Object.getPrototypeOf : function(e) {
          return e = Oe(e), b(e, mn) ? e[mn] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? vn : null
      },
      bn = Ge("iterator"),
      wn = !1;
  [].keys && ("next" in (dn = [].keys()) ? (hn = yn(yn(dn))) !== Object.prototype && (un = hn) : wn = !0), null == un && (un = {}), b(un, bn) || L(un, bn, function() {
      return this
  });
  var xn = {
          IteratorPrototype: un,
          BUGGY_SAFARI_ITERATORS: wn
      },
      Sn = xn.IteratorPrototype,
      kn = function() {
          return this
      },
      Tn = function(e, t, n) {
          var i = t + " Iterator";
          return e.prototype = He(Sn, {
              next: c(1, n)
          }), nt(e, i, !1), pn[i] = kn, e
      },
      Cn = Object.setPrototypeOf || ("__proto__" in {} ? function() {
          var e, t = !1,
              n = {};
          try {
              (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), t = n instanceof Array
          } catch (e) {}
          return function(n, i) {
              return E(n),
                  function(e) {
                      if (!m(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype")
                  }(i), t ? e.call(n, i) : n.__proto__ = i, n
          }
      }() : void 0),
      En = xn.IteratorPrototype,
      An = xn.BUGGY_SAFARI_ITERATORS,
      Pn = Ge("iterator"),
      Ln = function() {
          return this
      },
      In = function(e, t, n, i, o, r, s) {
          Tn(n, t, i);
          var a, l, c, u = function(e) {
                  if (e === o && g) return g;
                  if (!An && e in f) return f[e];
                  switch (e) {
                      case "keys":
                      case "values":
                      case "entries":
                          return function() {
                              return new n(this, e)
                          }
                  }
                  return function() {
                      return new n(this)
                  }
              },
              h = t + " Iterator",
              d = !1,
              f = e.prototype,
              p = f[Pn] || f["@@iterator"] || o && f[o],
              g = !An && p || u(o),
              m = "Array" == t && f.entries || p;
          if (m && (a = yn(m.call(new e)), En !== Object.prototype && a.next && (yn(a) !== En && (Cn ? Cn(a, En) : "function" != typeof a[Pn] && L(a, Pn, Ln)), nt(a, h, !0))), "values" == o && p && "values" !== p.name && (d = !0, g = function() {
                  return p.call(this)
              }), f[Pn] !== g && L(f, Pn, g), pn[t] = g, o)
              if (l = {
                      values: u("values"),
                      keys: r ? g : u("keys"),
                      entries: u("entries")
                  }, s)
                  for (c in l) !An && !d && c in f || ee(f, c, l[c]);
              else Ie({
                  target: t,
                  proto: !0,
                  forced: An || d
              }, l);
          return l
      },
      jn = J.set,
      Dn = J.getterFor("Array Iterator"),
      Mn = In(Array, "Array", function(e, t) {
          jn(this, {
              type: "Array Iterator",
              target: g(e),
              index: 0,
              kind: t
          })
      }, function() {
          var e = Dn(this),
              t = e.target,
              n = e.kind,
              i = e.index++;
          return !t || i >= t.length ? (e.target = void 0, {
              value: void 0,
              done: !0
          }) : "keys" == n ? {
              value: i,
              done: !1
          } : "values" == n ? {
              value: t[i],
              done: !1
          } : {
              value: [i, t[i]],
              done: !1
          }
      }, "values");
  pn.Arguments = pn.Array, fn("keys"), fn("values"), fn("entries");
  var On = [].join,
      Nn = f != Object,
      _n = Xt("join", ",");
  Ie({
      target: "Array",
      proto: !0,
      forced: Nn || !_n
  }, {
      join: function(e) {
          return On.call(g(this), void 0 === e ? "," : e)
      }
  });
  var Rn, $n, zn = function(e, t, n) {
          var i = v(t);
          i in e ? P.f(e, i, c(0, n)) : e[i] = n
      },
      Fn = ie("navigator", "userAgent") || "",
      qn = i.process,
      Hn = qn && qn.versions,
      Un = Hn && Hn.v8;
  Un ? $n = (Rn = Un.split("."))[0] + Rn[1] : Fn && (!(Rn = Fn.match(/Edge\/(\d+)/)) || Rn[1] >= 74) && (Rn = Fn.match(/Chrome\/(\d+)/)) && ($n = Rn[1]);
  var Bn = $n && +$n,
      Wn = Ge("species"),
      Vn = function(e) {
          return Bn >= 51 || !o(function() {
              var t = [];
              return (t.constructor = {})[Wn] = function() {
                  return {
                      foo: 1
                  }
              }, 1 !== t[e](Boolean).foo
          })
      },
      Xn = Vn("slice"),
      Yn = Kt("slice", {
          ACCESSORS: !0,
          0: 0,
          1: 2
      }),
      Qn = Ge("species"),
      Gn = [].slice,
      Kn = Math.max;
  Ie({
      target: "Array",
      proto: !0,
      forced: !Xn || !Yn
  }, {
      slice: function(e, t) {
          var n, i, o, r = g(this),
              s = le(r.length),
              a = he(e, s),
              l = he(void 0 === t ? s : t, s);
          if (Me(r) && ("function" != typeof(n = r.constructor) || n !== Array && !Me(n.prototype) ? m(n) && null === (n = n[Qn]) && (n = void 0) : n = void 0, n === Array || void 0 === n)) return Gn.call(r, a, l);
          for (i = new(void 0 === n ? Array : n)(Kn(l - a, 0)), o = 0; a < l; a++, o++) a in r && zn(i, o, r[a]);
          return i.length = o, i
      }
  });
  var Zn = {};
  Zn[Ge("toStringTag")] = "z";
  var Jn = "[object z]" === String(Zn),
      ei = Ge("toStringTag"),
      ti = "Arguments" == h(function() {
          return arguments
      }()),
      ni = Jn ? h : function(e) {
          var t, n, i;
          return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = function(e, t) {
              try {
                  return e[t]
              } catch (e) {}
          }(t = Object(e), ei)) ? n : ti ? h(t) : "Object" == (i = h(t)) && "function" == typeof t.callee ? "Arguments" : i
      },
      ii = Jn ? {}.toString : function() {
          return "[object " + ni(this) + "]"
      };
  Jn || ee(Object.prototype, "toString", ii, {
      unsafe: !0
  });
  var oi = function() {
      var e = E(this),
          t = "";
      return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
  };

  function ri(e, t) {
      return RegExp(e, t)
  }
  var si = {
          UNSUPPORTED_Y: o(function() {
              var e = ri("a", "y");
              return e.lastIndex = 2, null != e.exec("abcd")
          }),
          BROKEN_CARET: o(function() {
              var e = ri("^r", "gy");
              return e.lastIndex = 2, null != e.exec("str")
          })
      },
      ai = RegExp.prototype.exec,
      li = String.prototype.replace,
      ci = ai,
      ui = function() {
          var e = /a/,
              t = /b*/g;
          return ai.call(e, "a"), ai.call(t, "a"), 0 !== e.lastIndex || 0 !== t.lastIndex
      }(),
      hi = si.UNSUPPORTED_Y || si.BROKEN_CARET,
      di = void 0 !== /()??/.exec("")[1];
  (ui || di || hi) && (ci = function(e) {
      var t, n, i, o, r = this,
          s = hi && r.sticky,
          a = oi.call(r),
          l = r.source,
          c = 0,
          u = e;
      return s && (-1 === (a = a.replace("y", "")).indexOf("g") && (a += "g"), u = String(e).slice(r.lastIndex), r.lastIndex > 0 && (!r.multiline || r.multiline && "\n" !== e[r.lastIndex - 1]) && (l = "(?: " + l + ")", u = " " + u, c++), n = new RegExp("^(?:" + l + ")", a)), di && (n = new RegExp("^" + l + "$(?!\\s)", a)), ui && (t = r.lastIndex), i = ai.call(s ? n : r, u), s ? i ? (i.input = i.input.slice(c), i[0] = i[0].slice(c), i.index = r.lastIndex, r.lastIndex += i[0].length) : r.lastIndex = 0 : ui && i && (r.lastIndex = r.global ? i.index + i[0].length : t), di && i && i.length > 1 && li.call(i[0], n, function() {
          for (o = 1; o < arguments.length - 2; o++) void 0 === arguments[o] && (i[o] = void 0)
      }), i
  });
  var fi = ci;
  Ie({
      target: "RegExp",
      proto: !0,
      forced: /./.exec !== fi
  }, {
      exec: fi
  });
  var pi = RegExp.prototype,
      gi = pi.toString,
      mi = o(function() {
          return "/a/b" != gi.call({
              source: "a",
              flags: "b"
          })
      }),
      vi = "toString" != gi.name;
  (mi || vi) && ee(RegExp.prototype, "toString", function() {
      var e = E(this),
          t = String(e.source),
          n = e.flags;
      return "/" + t + "/" + String(void 0 === n && e instanceof RegExp && !("flags" in pi) ? oi.call(e) : n)
  }, {
      unsafe: !0
  });
  var yi = function(e) {
          return function(t, n) {
              var i, o, r = String(p(t)),
                  s = se(n),
                  a = r.length;
              return s < 0 || s >= a ? e ? "" : void 0 : (i = r.charCodeAt(s)) < 55296 || i > 56319 || s + 1 === a || (o = r.charCodeAt(s + 1)) < 56320 || o > 57343 ? e ? r.charAt(s) : i : e ? r.slice(s, s + 2) : o - 56320 + (i - 55296 << 10) + 65536
          }
      },
      bi = {
          codeAt: yi(!1),
          charAt: yi(!0)
      },
      wi = bi.charAt,
      xi = J.set,
      Si = J.getterFor("String Iterator");
  In(String, "String", function(e) {
      xi(this, {
          type: "String Iterator",
          string: String(e),
          index: 0
      })
  }, function() {
      var e, t = Si(this),
          n = t.string,
          i = t.index;
      return i >= n.length ? {
          value: void 0,
          done: !0
      } : (e = wi(n, i), t.index += e.length, {
          value: e,
          done: !1
      })
  });
  var ki = Ge("species"),
      Ti = !o(function() {
          var e = /./;
          return e.exec = function() {
              var e = [];
              return e.groups = {
                  a: "7"
              }, e
          }, "7" !== "".replace(e, "$<a>")
      }),
      Ci = "$0" === "a".replace(/./, "$0"),
      Ei = Ge("replace"),
      Ai = !!/./ [Ei] && "" === /./ [Ei]("a", "$0"),
      Pi = !o(function() {
          var e = /(?:)/,
              t = e.exec;
          e.exec = function() {
              return t.apply(this, arguments)
          };
          var n = "ab".split(e);
          return 2 !== n.length || "a" !== n[0] || "b" !== n[1]
      }),
      Li = function(e, t, n, i) {
          var r = Ge(e),
              s = !o(function() {
                  var t = {};
                  return t[r] = function() {
                      return 7
                  }, 7 != "" [e](t)
              }),
              a = s && !o(function() {
                  var t = !1,
                      n = /a/;
                  return "split" === e && ((n = {}).constructor = {}, n.constructor[ki] = function() {
                      return n
                  }, n.flags = "", n[r] = /./ [r]), n.exec = function() {
                      return t = !0, null
                  }, n[r](""), !t
              });
          if (!s || !a || "replace" === e && (!Ti || !Ci || Ai) || "split" === e && !Pi) {
              var l = /./ [r],
                  c = n(r, "" [e], function(e, t, n, i, o) {
                      return t.exec === fi ? s && !o ? {
                          done: !0,
                          value: l.call(t, n, i)
                      } : {
                          done: !0,
                          value: e.call(n, t, i)
                      } : {
                          done: !1
                      }
                  }, {
                      REPLACE_KEEPS_$0: Ci,
                      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: Ai
                  }),
                  u = c[0],
                  h = c[1];
              ee(String.prototype, e, u), ee(RegExp.prototype, r, 2 == t ? function(e, t) {
                  return h.call(e, this, t)
              } : function(e) {
                  return h.call(e, this)
              })
          }
          i && L(RegExp.prototype[r], "sham", !0)
      },
      Ii = bi.charAt,
      ji = function(e, t, n) {
          return t + (n ? Ii(e, t).length : 1)
      },
      Di = function(e, t) {
          var n = e.exec;
          if ("function" == typeof n) {
              var i = n.call(e, t);
              if ("object" != typeof i) throw TypeError("RegExp exec method returned something other than an Object or null");
              return i
          }
          if ("RegExp" !== h(e)) throw TypeError("RegExp#exec called on incompatible receiver");
          return fi.call(e, t)
      },
      Mi = Math.max,
      Oi = Math.min,
      Ni = Math.floor,
      _i = /\$([$&'`]|\d\d?|<[^>]*>)/g,
      Ri = /\$([$&'`]|\d\d?)/g;
  Li("replace", 2, function(e, t, n, i) {
      var o = i.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
          r = i.REPLACE_KEEPS_$0,
          s = o ? "$" : "$0";
      return [function(n, i) {
          var o = p(this),
              r = null == n ? void 0 : n[e];
          return void 0 !== r ? r.call(n, o, i) : t.call(String(o), n, i)
      }, function(e, i) {
          if (!o && r || "string" == typeof i && -1 === i.indexOf(s)) {
              var l = n(t, e, this, i);
              if (l.done) return l.value
          }
          var c = E(e),
              u = String(this),
              h = "function" == typeof i;
          h || (i = String(i));
          var d = c.global;
          if (d) {
              var f = c.unicode;
              c.lastIndex = 0
          }
          for (var p = [];;) {
              var g = Di(c, u);
              if (null === g) break;
              if (p.push(g), !d) break;
              "" === String(g[0]) && (c.lastIndex = ji(u, le(c.lastIndex), f))
          }
          for (var m, v = "", y = 0, b = 0; b < p.length; b++) {
              g = p[b];
              for (var w = String(g[0]), x = Mi(Oi(se(g.index), u.length), 0), S = [], k = 1; k < g.length; k++) S.push(void 0 === (m = g[k]) ? m : String(m));
              var T = g.groups;
              if (h) {
                  var C = [w].concat(S, x, u);
                  void 0 !== T && C.push(T);
                  var A = String(i.apply(void 0, C))
              } else A = a(w, u, x, S, T, i);
              x >= y && (v += u.slice(y, x) + A, y = x + w.length)
          }
          return v + u.slice(y)
      }];

      function a(e, n, i, o, r, s) {
          var a = i + e.length,
              l = o.length,
              c = Ri;
          return void 0 !== r && (r = Oe(r), c = _i), t.call(s, c, function(t, s) {
              var c;
              switch (s.charAt(0)) {
                  case "$":
                      return "$";
                  case "&":
                      return e;
                  case "`":
                      return n.slice(0, i);
                  case "'":
                      return n.slice(a);
                  case "<":
                      c = r[s.slice(1, -1)];
                      break;
                  default:
                      var u = +s;
                      if (0 === u) return t;
                      if (u > l) {
                          var h = Ni(u / 10);
                          return 0 === h ? t : h <= l ? void 0 === o[h - 1] ? s.charAt(1) : o[h - 1] + s.charAt(1) : t
                      }
                      c = o[u - 1]
              }
              return void 0 === c ? "" : c
          })
      }
  });
  var $i = Object.is || function(e, t) {
      return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
  };
  Li("search", 1, function(e, t, n) {
      return [function(t) {
          var n = p(this),
              i = null == t ? void 0 : t[e];
          return void 0 !== i ? i.call(t, n) : new RegExp(t)[e](String(n))
      }, function(e) {
          var i = n(t, e, this);
          if (i.done) return i.value;
          var o = E(e),
              r = String(this),
              s = o.lastIndex;
          $i(s, 0) || (o.lastIndex = 0);
          var a = Di(o, r);
          return $i(o.lastIndex, s) || (o.lastIndex = s), null === a ? -1 : a.index
      }]
  });
  var zi = Ge("match"),
      Fi = function(e) {
          var t;
          return m(e) && (void 0 !== (t = e[zi]) ? !!t : "RegExp" == h(e))
      },
      qi = Ge("species"),
      Hi = function(e, t) {
          var n, i = E(e).constructor;
          return void 0 === i || null == (n = E(i)[qi]) ? t : it(n)
      },
      Ui = [].push,
      Bi = Math.min,
      Wi = !o(function() {
          return !RegExp(4294967295, "y")
      });
  Li("split", 2, function(e, t, n) {
      var i;
      return i = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function(e, n) {
          var i = String(p(this)),
              o = void 0 === n ? 4294967295 : n >>> 0;
          if (0 === o) return [];
          if (void 0 === e) return [i];
          if (!Fi(e)) return t.call(i, e, o);
          for (var r, s, a, l = [], c = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), u = 0, h = new RegExp(e.source, c + "g");
              (r = fi.call(h, i)) && !((s = h.lastIndex) > u && (l.push(i.slice(u, r.index)), r.length > 1 && r.index < i.length && Ui.apply(l, r.slice(1)), a = r[0].length, u = s, l.length >= o));) h.lastIndex === r.index && h.lastIndex++;
          return u === i.length ? !a && h.test("") || l.push("") : l.push(i.slice(u)), l.length > o ? l.slice(0, o) : l
      } : "0".split(void 0, 0).length ? function(e, n) {
          return void 0 === e && 0 === n ? [] : t.call(this, e, n)
      } : t, [function(t, n) {
          var o = p(this),
              r = null == t ? void 0 : t[e];
          return void 0 !== r ? r.call(t, o, n) : i.call(String(o), t, n)
      }, function(e, o) {
          var r = n(i, e, this, o, i !== t);
          if (r.done) return r.value;
          var s = E(e),
              a = String(this),
              l = Hi(s, RegExp),
              c = s.unicode,
              u = (s.ignoreCase ? "i" : "") + (s.multiline ? "m" : "") + (s.unicode ? "u" : "") + (Wi ? "y" : "g"),
              h = new l(Wi ? s : "^(?:" + s.source + ")", u),
              d = void 0 === o ? 4294967295 : o >>> 0;
          if (0 === d) return [];
          if (0 === a.length) return null === Di(h, a) ? [a] : [];
          for (var f = 0, p = 0, g = []; p < a.length;) {
              h.lastIndex = Wi ? p : 0;
              var m, v = Di(h, Wi ? a : a.slice(p));
              if (null === v || (m = Bi(le(h.lastIndex + (Wi ? 0 : p)), a.length)) === f) p = ji(a, p, c);
              else {
                  if (g.push(a.slice(f, p)), g.length === d) return g;
                  for (var y = 1; y <= v.length - 1; y++)
                      if (g.push(v[y]), g.length === d) return g;
                  p = f = m
              }
          }
          return g.push(a.slice(f)), g
      }]
  }, !Wi);
  var Vi = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
  };
  for (var Xi in Vi) {
      var Yi = i[Xi],
          Qi = Yi && Yi.prototype;
      if (Qi && Qi.forEach !== tn) try {
          L(Qi, "forEach", tn)
      } catch (e) {
          Qi.forEach = tn
      }
  }
  var Gi = Ge("iterator"),
      Ki = Ge("toStringTag"),
      Zi = Mn.values;
  for (var Ji in Vi) {
      var eo = i[Ji],
          to = eo && eo.prototype;
      if (to) {
          if (to[Gi] !== Zi) try {
              L(to, Gi, Zi)
          } catch (e) {
              to[Gi] = Zi
          }
          if (to[Ki] || L(to, Ki, Ji), Vi[Ji])
              for (var no in Mn)
                  if (to[no] !== Mn[no]) try {
                      L(to, no, Mn[no])
                  } catch (e) {
                      to[no] = Mn[no]
                  }
      }
  }
  var io = Ge("iterator"),
      oo = !o(function() {
          var e = new URL("b?a=1&b=2&c=3", "http://a"),
              t = e.searchParams,
              n = "";
          return e.pathname = "c%20d", t.forEach(function(e, i) {
              t.delete("b"), n += i + e
          }), !t.sort || "http://a/c%20d?a=1&c=3" !== e.href || "3" !== t.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !t[io] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("http://тест").host || "#%D0%B1" !== new URL("http://a#б").hash || "a1c3" !== n || "x" !== new URL("http://x", void 0).host
      }),
      ro = function(e, t, n) {
          if (!(e instanceof t)) throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
          return e
      },
      so = Object.assign,
      ao = Object.defineProperty,
      lo = !so || o(function() {
          if (r && 1 !== so({
                  b: 1
              }, so(ao({}, "a", {
                  enumerable: !0,
                  get: function() {
                      ao(this, "b", {
                          value: 3,
                          enumerable: !1
                      })
                  }
              }), {
                  b: 2
              })).b) return !0;
          var e = {},
              t = {},
              n = Symbol();
          return e[n] = 7, "abcdefghijklmnopqrst".split("").forEach(function(e) {
              t[e] = e
          }), 7 != so({}, e)[n] || "abcdefghijklmnopqrst" != Ne(so({}, t)).join("")
      }) ? function(e, t) {
          for (var n = Oe(e), i = arguments.length, o = 1, s = be.f, a = l.f; i > o;)
              for (var c, u = f(arguments[o++]), h = s ? Ne(u).concat(s(u)) : Ne(u), d = h.length, p = 0; d > p;) c = h[p++], r && !a.call(u, c) || (n[c] = u[c]);
          return n
      } : so,
      co = function(e, t, n, i) {
          try {
              return i ? t(E(n)[0], n[1]) : t(n)
          } catch (t) {
              var o = e.return;
              throw void 0 !== o && E(o.call(e)), t
          }
      },
      uo = Ge("iterator"),
      ho = Array.prototype,
      fo = function(e) {
          return void 0 !== e && (pn.Array === e || ho[uo] === e)
      },
      po = Ge("iterator"),
      go = function(e) {
          if (null != e) return e[po] || e["@@iterator"] || pn[ni(e)]
      },
      mo = function(e) {
          var t, n, i, o, r, s, a = Oe(e),
              l = "function" == typeof this ? this : Array,
              c = arguments.length,
              u = c > 1 ? arguments[1] : void 0,
              h = void 0 !== u,
              d = go(a),
              f = 0;
          if (h && (u = ot(u, c > 2 ? arguments[2] : void 0, 2)), null == d || l == Array && fo(d))
              for (n = new l(t = le(a.length)); t > f; f++) s = h ? u(a[f], f) : a[f], zn(n, f, s);
          else
              for (r = (o = d.call(a)).next, n = new l; !(i = r.call(o)).done; f++) s = h ? co(o, u, [i.value, f], !0) : i.value, zn(n, f, s);
          return n.length = f, n
      },
      vo = /[^\0-\u007E]/,
      yo = /[.\u3002\uFF0E\uFF61]/g,
      bo = "Overflow: input needs wider integers to process",
      wo = Math.floor,
      xo = String.fromCharCode,
      So = function(e) {
          return e + 22 + 75 * (e < 26)
      },
      ko = function(e, t, n) {
          var i = 0;
          for (e = n ? wo(e / 700) : e >> 1, e += wo(e / t); e > 455; i += 36) e = wo(e / 35);
          return wo(i + 36 * e / (e + 38))
      },
      To = function(e) {
          var t, n, i = [],
              o = (e = function(e) {
                  for (var t = [], n = 0, i = e.length; n < i;) {
                      var o = e.charCodeAt(n++);
                      if (o >= 55296 && o <= 56319 && n < i) {
                          var r = e.charCodeAt(n++);
                          56320 == (64512 & r) ? t.push(((1023 & o) << 10) + (1023 & r) + 65536) : (t.push(o), n--)
                      } else t.push(o)
                  }
                  return t
              }(e)).length,
              r = 128,
              s = 0,
              a = 72;
          for (t = 0; t < e.length; t++)(n = e[t]) < 128 && i.push(xo(n));
          var l = i.length,
              c = l;
          for (l && i.push("-"); c < o;) {
              var u = 2147483647;
              for (t = 0; t < e.length; t++)(n = e[t]) >= r && n < u && (u = n);
              var h = c + 1;
              if (u - r > wo((2147483647 - s) / h)) throw RangeError(bo);
              for (s += (u - r) * h, r = u, t = 0; t < e.length; t++) {
                  if ((n = e[t]) < r && ++s > 2147483647) throw RangeError(bo);
                  if (n == r) {
                      for (var d = s, f = 36;; f += 36) {
                          var p = f <= a ? 1 : f >= a + 26 ? 26 : f - a;
                          if (d < p) break;
                          var g = d - p,
                              m = 36 - p;
                          i.push(xo(So(p + g % m))), d = wo(g / m)
                      }
                      i.push(xo(So(d))), a = ko(s, h, c == l), s = 0, ++c
                  }
              }++s, ++r
          }
          return i.join("")
      },
      Co = function(e, t, n) {
          for (var i in t) ee(e, i, t[i], n);
          return e
      },
      Eo = function(e) {
          var t = go(e);
          if ("function" != typeof t) throw TypeError(String(e) + " is not iterable");
          return E(t.call(e))
      },
      Ao = ie("fetch"),
      Po = ie("Headers"),
      Lo = Ge("iterator"),
      Io = J.set,
      jo = J.getterFor("URLSearchParams"),
      Do = J.getterFor("URLSearchParamsIterator"),
      Mo = /\+/g,
      Oo = Array(4),
      No = function(e) {
          return Oo[e - 1] || (Oo[e - 1] = RegExp("((?:%[\\da-f]{2}){" + e + "})", "gi"))
      },
      _o = function(e) {
          try {
              return decodeURIComponent(e)
          } catch (t) {
              return e
          }
      },
      Ro = function(e) {
          var t = e.replace(Mo, " "),
              n = 4;
          try {
              return decodeURIComponent(t)
          } catch (e) {
              for (; n;) t = t.replace(No(n--), _o);
              return t
          }
      },
      $o = /[!'()~]|%20/g,
      zo = {
          "!": "%21",
          "'": "%27",
          "(": "%28",
          ")": "%29",
          "~": "%7E",
          "%20": "+"
      },
      Fo = function(e) {
          return zo[e]
      },
      qo = function(e) {
          return encodeURIComponent(e).replace($o, Fo)
      },
      Ho = function(e, t) {
          if (t)
              for (var n, i, o = t.split("&"), r = 0; r < o.length;)(n = o[r++]).length && (i = n.split("="), e.push({
                  key: Ro(i.shift()),
                  value: Ro(i.join("="))
              }))
      },
      Uo = function(e) {
          this.entries.length = 0, Ho(this.entries, e)
      },
      Bo = function(e, t) {
          if (e < t) throw TypeError("Not enough arguments")
      },
      Wo = Tn(function(e, t) {
          Io(this, {
              type: "URLSearchParamsIterator",
              iterator: Eo(jo(e).entries),
              kind: t
          })
      }, "Iterator", function() {
          var e = Do(this),
              t = e.kind,
              n = e.iterator.next(),
              i = n.value;
          return n.done || (n.value = "keys" === t ? i.key : "values" === t ? i.value : [i.key, i.value]), n
      }),
      Vo = function() {
          ro(this, Vo, "URLSearchParams");
          var e, t, n, i, o, r, s, a, l, c = arguments.length > 0 ? arguments[0] : void 0,
              u = [];
          if (Io(this, {
                  type: "URLSearchParams",
                  entries: u,
                  updateURL: function() {},
                  updateSearchParams: Uo
              }), void 0 !== c)
              if (m(c))
                  if ("function" == typeof(e = go(c)))
                      for (n = (t = e.call(c)).next; !(i = n.call(t)).done;) {
                          if ((s = (r = (o = Eo(E(i.value))).next).call(o)).done || (a = r.call(o)).done || !r.call(o).done) throw TypeError("Expected sequence with length 2");
                          u.push({
                              key: s.value + "",
                              value: a.value + ""
                          })
                      } else
                          for (l in c) b(c, l) && u.push({
                              key: l,
                              value: c[l] + ""
                          });
                  else Ho(u, "string" == typeof c ? "?" === c.charAt(0) ? c.slice(1) : c : c + "")
      },
      Xo = Vo.prototype;
  Co(Xo, {
      append: function(e, t) {
          Bo(arguments.length, 2);
          var n = jo(this);
          n.entries.push({
              key: e + "",
              value: t + ""
          }), n.updateURL()
      },
      delete: function(e) {
          Bo(arguments.length, 1);
          for (var t = jo(this), n = t.entries, i = e + "", o = 0; o < n.length;) n[o].key === i ? n.splice(o, 1) : o++;
          t.updateURL()
      },
      get: function(e) {
          Bo(arguments.length, 1);
          for (var t = jo(this).entries, n = e + "", i = 0; i < t.length; i++)
              if (t[i].key === n) return t[i].value;
          return null
      },
      getAll: function(e) {
          Bo(arguments.length, 1);
          for (var t = jo(this).entries, n = e + "", i = [], o = 0; o < t.length; o++) t[o].key === n && i.push(t[o].value);
          return i
      },
      has: function(e) {
          Bo(arguments.length, 1);
          for (var t = jo(this).entries, n = e + "", i = 0; i < t.length;)
              if (t[i++].key === n) return !0;
          return !1
      },
      set: function(e, t) {
          Bo(arguments.length, 1);
          for (var n, i = jo(this), o = i.entries, r = !1, s = e + "", a = t + "", l = 0; l < o.length; l++)(n = o[l]).key === s && (r ? o.splice(l--, 1) : (r = !0, n.value = a));
          r || o.push({
              key: s,
              value: a
          }), i.updateURL()
      },
      sort: function() {
          var e, t, n, i = jo(this),
              o = i.entries,
              r = o.slice();
          for (o.length = 0, n = 0; n < r.length; n++) {
              for (e = r[n], t = 0; t < n; t++)
                  if (o[t].key > e.key) {
                      o.splice(t, 0, e);
                      break
                  } t === n && o.push(e)
          }
          i.updateURL()
      },
      forEach: function(e) {
          for (var t, n = jo(this).entries, i = ot(e, arguments.length > 1 ? arguments[1] : void 0, 3), o = 0; o < n.length;) i((t = n[o++]).value, t.key, this)
      },
      keys: function() {
          return new Wo(this, "keys")
      },
      values: function() {
          return new Wo(this, "values")
      },
      entries: function() {
          return new Wo(this, "entries")
      }
  }, {
      enumerable: !0
  }), ee(Xo, Lo, Xo.entries), ee(Xo, "toString", function() {
      for (var e, t = jo(this).entries, n = [], i = 0; i < t.length;) e = t[i++], n.push(qo(e.key) + "=" + qo(e.value));
      return n.join("&")
  }, {
      enumerable: !0
  }), nt(Vo, "URLSearchParams"), Ie({
      global: !0,
      forced: !oo
  }, {
      URLSearchParams: Vo
  }), oo || "function" != typeof Ao || "function" != typeof Po || Ie({
      global: !0,
      enumerable: !0,
      forced: !0
  }, {
      fetch: function(e) {
          var t, n, i, o = [e];
          return arguments.length > 1 && (t = arguments[1], m(t) && (n = t.body, "URLSearchParams" === ni(n) && ((i = t.headers ? new Po(t.headers) : new Po).has("content-type") || i.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), t = He(t, {
              body: c(0, String(n)),
              headers: c(0, i)
          }))), o.push(t)), Ao.apply(this, o)
      }
  });
  var Yo, Qo = {
          URLSearchParams: Vo,
          getState: jo
      },
      Go = bi.codeAt,
      Ko = i.URL,
      Zo = Qo.URLSearchParams,
      Jo = Qo.getState,
      er = J.set,
      tr = J.getterFor("URL"),
      nr = Math.floor,
      ir = Math.pow,
      or = /[A-Za-z]/,
      rr = /[\d+\-.A-Za-z]/,
      sr = /\d/,
      ar = /^(0x|0X)/,
      lr = /^[0-7]+$/,
      cr = /^\d+$/,
      ur = /^[\dA-Fa-f]+$/,
      hr = /[\u0000\u0009\u000A\u000D #%\/:?@[\\]]/,
      dr = /[\u0000\u0009\u000A\u000D #\/:?@[\\]]/,
      fr = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,
      pr = /[\u0009\u000A\u000D]/g,
      gr = function(e, t) {
          var n, i, o;
          if ("[" == t.charAt(0)) {
              if ("]" != t.charAt(t.length - 1)) return "Invalid host";
              if (!(n = vr(t.slice(1, -1)))) return "Invalid host";
              e.host = n
          } else if (Cr(e)) {
              if (t = function(e) {
                      var t, n, i = [],
                          o = e.toLowerCase().replace(yo, ".").split(".");
                      for (t = 0; t < o.length; t++) n = o[t], i.push(vo.test(n) ? "xn--" + To(n) : n);
                      return i.join(".")
                  }(t), hr.test(t)) return "Invalid host";
              if (null === (n = mr(t))) return "Invalid host";
              e.host = n
          } else {
              if (dr.test(t)) return "Invalid host";
              for (n = "", i = mo(t), o = 0; o < i.length; o++) n += kr(i[o], br);
              e.host = n
          }
      },
      mr = function(e) {
          var t, n, i, o, r, s, a, l = e.split(".");
          if (l.length && "" == l[l.length - 1] && l.pop(), (t = l.length) > 4) return e;
          for (n = [], i = 0; i < t; i++) {
              if ("" == (o = l[i])) return e;
              if (r = 10, o.length > 1 && "0" == o.charAt(0) && (r = ar.test(o) ? 16 : 8, o = o.slice(8 == r ? 1 : 2)), "" === o) s = 0;
              else {
                  if (!(10 == r ? cr : 8 == r ? lr : ur).test(o)) return e;
                  s = parseInt(o, r)
              }
              n.push(s)
          }
          for (i = 0; i < t; i++)
              if (s = n[i], i == t - 1) {
                  if (s >= ir(256, 5 - t)) return null
              } else if (s > 255) return null;
          for (a = n.pop(), i = 0; i < n.length; i++) a += n[i] * ir(256, 3 - i);
          return a
      },
      vr = function(e) {
          var t, n, i, o, r, s, a, l = [0, 0, 0, 0, 0, 0, 0, 0],
              c = 0,
              u = null,
              h = 0,
              d = function() {
                  return e.charAt(h)
              };
          if (":" == d()) {
              if (":" != e.charAt(1)) return;
              h += 2, u = ++c
          }
          for (; d();) {
              if (8 == c) return;
              if (":" != d()) {
                  for (t = n = 0; n < 4 && ur.test(d());) t = 16 * t + parseInt(d(), 16), h++, n++;
                  if ("." == d()) {
                      if (0 == n) return;
                      if (h -= n, c > 6) return;
                      for (i = 0; d();) {
                          if (o = null, i > 0) {
                              if (!("." == d() && i < 4)) return;
                              h++
                          }
                          if (!sr.test(d())) return;
                          for (; sr.test(d());) {
                              if (r = parseInt(d(), 10), null === o) o = r;
                              else {
                                  if (0 == o) return;
                                  o = 10 * o + r
                              }
                              if (o > 255) return;
                              h++
                          }
                          l[c] = 256 * l[c] + o, 2 != ++i && 4 != i || c++
                      }
                      if (4 != i) return;
                      break
                  }
                  if (":" == d()) {
                      if (h++, !d()) return
                  } else if (d()) return;
                  l[c++] = t
              } else {
                  if (null !== u) return;
                  h++, u = ++c
              }
          }
          if (null !== u)
              for (s = c - u, c = 7; 0 != c && s > 0;) a = l[c], l[c--] = l[u + s - 1], l[u + --s] = a;
          else if (8 != c) return;
          return l
      },
      yr = function(e) {
          var t, n, i, o;
          if ("number" == typeof e) {
              for (t = [], n = 0; n < 4; n++) t.unshift(e % 256), e = nr(e / 256);
              return t.join(".")
          }
          if ("object" == typeof e) {
              for (t = "", i = function(e) {
                      for (var t = null, n = 1, i = null, o = 0, r = 0; r < 8; r++) 0 !== e[r] ? (o > n && (t = i, n = o), i = null, o = 0) : (null === i && (i = r), ++o);
                      return o > n && (t = i, n = o), t
                  }(e), n = 0; n < 8; n++) o && 0 === e[n] || (o && (o = !1), i === n ? (t += n ? ":" : "::", o = !0) : (t += e[n].toString(16), n < 7 && (t += ":")));
              return "[" + t + "]"
          }
          return e
      },
      br = {},
      wr = lo({}, br, {
          " ": 1,
          '"': 1,
          "<": 1,
          ">": 1,
          "`": 1
      }),
      xr = lo({}, wr, {
          "#": 1,
          "?": 1,
          "{": 1,
          "}": 1
      }),
      Sr = lo({}, xr, {
          "/": 1,
          ":": 1,
          ";": 1,
          "=": 1,
          "@": 1,
          "[": 1,
          "\\": 1,
          "]": 1,
          "^": 1,
          "|": 1
      }),
      kr = function(e, t) {
          var n = Go(e, 0);
          return n > 32 && n < 127 && !b(t, e) ? e : encodeURIComponent(e)
      },
      Tr = {
          ftp: 21,
          file: null,
          http: 80,
          https: 443,
          ws: 80,
          wss: 443
      },
      Cr = function(e) {
          return b(Tr, e.scheme)
      },
      Er = function(e) {
          return "" != e.username || "" != e.password
      },
      Ar = function(e) {
          return !e.host || e.cannotBeABaseURL || "file" == e.scheme
      },
      Pr = function(e, t) {
          var n;
          return 2 == e.length && or.test(e.charAt(0)) && (":" == (n = e.charAt(1)) || !t && "|" == n)
      },
      Lr = function(e) {
          var t;
          return e.length > 1 && Pr(e.slice(0, 2)) && (2 == e.length || "/" === (t = e.charAt(2)) || "\\" === t || "?" === t || "#" === t)
      },
      Ir = function(e) {
          var t = e.path,
              n = t.length;
          !n || "file" == e.scheme && 1 == n && Pr(t[0], !0) || t.pop()
      },
      jr = function(e) {
          return "." === e || "%2e" === e.toLowerCase()
      },
      Dr = {},
      Mr = {},
      Or = {},
      Nr = {},
      _r = {},
      Rr = {},
      $r = {},
      zr = {},
      Fr = {},
      qr = {},
      Hr = {},
      Ur = {},
      Br = {},
      Wr = {},
      Vr = {},
      Xr = {},
      Yr = {},
      Qr = {},
      Gr = {},
      Kr = {},
      Zr = {},
      Jr = function(e, t, n, i) {
          var o, r, s, a, l, c = n || Dr,
              u = 0,
              h = "",
              d = !1,
              f = !1,
              p = !1;
          for (n || (e.scheme = "", e.username = "", e.password = "", e.host = null, e.port = null, e.path = [], e.query = null, e.fragment = null, e.cannotBeABaseURL = !1, t = t.replace(fr, "")), t = t.replace(pr, ""), o = mo(t); u <= o.length;) {
              switch (r = o[u], c) {
                  case Dr:
                      if (!r || !or.test(r)) {
                          if (n) return "Invalid scheme";
                          c = Or;
                          continue
                      }
                      h += r.toLowerCase(), c = Mr;
                      break;
                  case Mr:
                      if (r && (rr.test(r) || "+" == r || "-" == r || "." == r)) h += r.toLowerCase();
                      else {
                          if (":" != r) {
                              if (n) return "Invalid scheme";
                              h = "", c = Or, u = 0;
                              continue
                          }
                          if (n && (Cr(e) != b(Tr, h) || "file" == h && (Er(e) || null !== e.port) || "file" == e.scheme && !e.host)) return;
                          if (e.scheme = h, n) return void(Cr(e) && Tr[e.scheme] == e.port && (e.port = null));
                          h = "", "file" == e.scheme ? c = Wr : Cr(e) && i && i.scheme == e.scheme ? c = Nr : Cr(e) ? c = zr : "/" == o[u + 1] ? (c = _r, u++) : (e.cannotBeABaseURL = !0, e.path.push(""), c = Gr)
                      }
                      break;
                  case Or:
                      if (!i || i.cannotBeABaseURL && "#" != r) return "Invalid scheme";
                      if (i.cannotBeABaseURL && "#" == r) {
                          e.scheme = i.scheme, e.path = i.path.slice(), e.query = i.query, e.fragment = "", e.cannotBeABaseURL = !0, c = Zr;
                          break
                      }
                      c = "file" == i.scheme ? Wr : Rr;
                      continue;
                  case Nr:
                      if ("/" != r || "/" != o[u + 1]) {
                          c = Rr;
                          continue
                      }
                      c = Fr, u++;
                      break;
                  case _r:
                      if ("/" == r) {
                          c = qr;
                          break
                      }
                      c = Qr;
                      continue;
                  case Rr:
                      if (e.scheme = i.scheme, r == Yo) e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.query = i.query;
                      else if ("/" == r || "\\" == r && Cr(e)) c = $r;
                      else if ("?" == r) e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.query = "", c = Kr;
                      else {
                          if ("#" != r) {
                              e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.path.pop(), c = Qr;
                              continue
                          }
                          e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.query = i.query, e.fragment = "", c = Zr
                      }
                      break;
                  case $r:
                      if (!Cr(e) || "/" != r && "\\" != r) {
                          if ("/" != r) {
                              e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, c = Qr;
                              continue
                          }
                          c = qr
                      } else c = Fr;
                      break;
                  case zr:
                      if (c = Fr, "/" != r || "/" != h.charAt(u + 1)) continue;
                      u++;
                      break;
                  case Fr:
                      if ("/" != r && "\\" != r) {
                          c = qr;
                          continue
                      }
                      break;
                  case qr:
                      if ("@" == r) {
                          d && (h = "%40" + h), d = !0, s = mo(h);
                          for (var g = 0; g < s.length; g++) {
                              var m = s[g];
                              if (":" != m || p) {
                                  var v = kr(m, Sr);
                                  p ? e.password += v : e.username += v
                              } else p = !0
                          }
                          h = ""
                      } else if (r == Yo || "/" == r || "?" == r || "#" == r || "\\" == r && Cr(e)) {
                          if (d && "" == h) return "Invalid authority";
                          u -= mo(h).length + 1, h = "", c = Hr
                      } else h += r;
                      break;
                  case Hr:
                  case Ur:
                      if (n && "file" == e.scheme) {
                          c = Xr;
                          continue
                      }
                      if (":" != r || f) {
                          if (r == Yo || "/" == r || "?" == r || "#" == r || "\\" == r && Cr(e)) {
                              if (Cr(e) && "" == h) return "Invalid host";
                              if (n && "" == h && (Er(e) || null !== e.port)) return;
                              if (a = gr(e, h)) return a;
                              if (h = "", c = Yr, n) return;
                              continue
                          }
                          "[" == r ? f = !0 : "]" == r && (f = !1), h += r
                      } else {
                          if ("" == h) return "Invalid host";
                          if (a = gr(e, h)) return a;
                          if (h = "", c = Br, n == Ur) return
                      }
                      break;
                  case Br:
                      if (!sr.test(r)) {
                          if (r == Yo || "/" == r || "?" == r || "#" == r || "\\" == r && Cr(e) || n) {
                              if ("" != h) {
                                  var y = parseInt(h, 10);
                                  if (y > 65535) return "Invalid port";
                                  e.port = Cr(e) && y === Tr[e.scheme] ? null : y, h = ""
                              }
                              if (n) return;
                              c = Yr;
                              continue
                          }
                          return "Invalid port"
                      }
                      h += r;
                      break;
                  case Wr:
                      if (e.scheme = "file", "/" == r || "\\" == r) c = Vr;
                      else {
                          if (!i || "file" != i.scheme) {
                              c = Qr;
                              continue
                          }
                          if (r == Yo) e.host = i.host, e.path = i.path.slice(), e.query = i.query;
                          else if ("?" == r) e.host = i.host, e.path = i.path.slice(), e.query = "", c = Kr;
                          else {
                              if ("#" != r) {
                                  Lr(o.slice(u).join("")) || (e.host = i.host, e.path = i.path.slice(), Ir(e)), c = Qr;
                                  continue
                              }
                              e.host = i.host, e.path = i.path.slice(), e.query = i.query, e.fragment = "", c = Zr
                          }
                      }
                      break;
                  case Vr:
                      if ("/" == r || "\\" == r) {
                          c = Xr;
                          break
                      }
                      i && "file" == i.scheme && !Lr(o.slice(u).join("")) && (Pr(i.path[0], !0) ? e.path.push(i.path[0]) : e.host = i.host), c = Qr;
                      continue;
                  case Xr:
                      if (r == Yo || "/" == r || "\\" == r || "?" == r || "#" == r) {
                          if (!n && Pr(h)) c = Qr;
                          else if ("" == h) {
                              if (e.host = "", n) return;
                              c = Yr
                          } else {
                              if (a = gr(e, h)) return a;
                              if ("localhost" == e.host && (e.host = ""), n) return;
                              h = "", c = Yr
                          }
                          continue
                      }
                      h += r;
                      break;
                  case Yr:
                      if (Cr(e)) {
                          if (c = Qr, "/" != r && "\\" != r) continue
                      } else if (n || "?" != r)
                          if (n || "#" != r) {
                              if (r != Yo && (c = Qr, "/" != r)) continue
                          } else e.fragment = "", c = Zr;
                      else e.query = "", c = Kr;
                      break;
                  case Qr:
                      if (r == Yo || "/" == r || "\\" == r && Cr(e) || !n && ("?" == r || "#" == r)) {
                          if (".." === (l = (l = h).toLowerCase()) || "%2e." === l || ".%2e" === l || "%2e%2e" === l ? (Ir(e), "/" == r || "\\" == r && Cr(e) || e.path.push("")) : jr(h) ? "/" == r || "\\" == r && Cr(e) || e.path.push("") : ("file" == e.scheme && !e.path.length && Pr(h) && (e.host && (e.host = ""), h = h.charAt(0) + ":"), e.path.push(h)), h = "", "file" == e.scheme && (r == Yo || "?" == r || "#" == r))
                              for (; e.path.length > 1 && "" === e.path[0];) e.path.shift();
                          "?" == r ? (e.query = "", c = Kr) : "#" == r && (e.fragment = "", c = Zr)
                      } else h += kr(r, xr);
                      break;
                  case Gr:
                      "?" == r ? (e.query = "", c = Kr) : "#" == r ? (e.fragment = "", c = Zr) : r != Yo && (e.path[0] += kr(r, br));
                      break;
                  case Kr:
                      n || "#" != r ? r != Yo && ("'" == r && Cr(e) ? e.query += "%27" : e.query += "#" == r ? "%23" : kr(r, br)) : (e.fragment = "", c = Zr);
                      break;
                  case Zr:
                      r != Yo && (e.fragment += kr(r, wr))
              }
              u++
          }
      },
      es = function(e) {
          var t, n, i = ro(this, es, "URL"),
              o = arguments.length > 1 ? arguments[1] : void 0,
              s = String(e),
              a = er(i, {
                  type: "URL"
              });
          if (void 0 !== o)
              if (o instanceof es) t = tr(o);
              else if (n = Jr(t = {}, String(o))) throw TypeError(n);
          if (n = Jr(a, s, null, t)) throw TypeError(n);
          var l = a.searchParams = new Zo,
              c = Jo(l);
          c.updateSearchParams(a.query), c.updateURL = function() {
              a.query = String(l) || null
          }, r || (i.href = ns.call(i), i.origin = is.call(i), i.protocol = os.call(i), i.username = rs.call(i), i.password = ss.call(i), i.host = as.call(i), i.hostname = ls.call(i), i.port = cs.call(i), i.pathname = us.call(i), i.search = hs.call(i), i.searchParams = ds.call(i), i.hash = fs.call(i))
      },
      ts = es.prototype,
      ns = function() {
          var e = tr(this),
              t = e.scheme,
              n = e.username,
              i = e.password,
              o = e.host,
              r = e.port,
              s = e.path,
              a = e.query,
              l = e.fragment,
              c = t + ":";
          return null !== o ? (c += "//", Er(e) && (c += n + (i ? ":" + i : "") + "@"), c += yr(o), null !== r && (c += ":" + r)) : "file" == t && (c += "//"), c += e.cannotBeABaseURL ? s[0] : s.length ? "/" + s.join("/") : "", null !== a && (c += "?" + a), null !== l && (c += "#" + l), c
      },
      is = function() {
          var e = tr(this),
              t = e.scheme,
              n = e.port;
          if ("blob" == t) try {
              return new URL(t.path[0]).origin
          } catch (e) {
              return "null"
          }
          return "file" != t && Cr(e) ? t + "://" + yr(e.host) + (null !== n ? ":" + n : "") : "null"
      },
      os = function() {
          return tr(this).scheme + ":"
      },
      rs = function() {
          return tr(this).username
      },
      ss = function() {
          return tr(this).password
      },
      as = function() {
          var e = tr(this),
              t = e.host,
              n = e.port;
          return null === t ? "" : null === n ? yr(t) : yr(t) + ":" + n
      },
      ls = function() {
          var e = tr(this).host;
          return null === e ? "" : yr(e)
      },
      cs = function() {
          var e = tr(this).port;
          return null === e ? "" : String(e)
      },
      us = function() {
          var e = tr(this),
              t = e.path;
          return e.cannotBeABaseURL ? t[0] : t.length ? "/" + t.join("/") : ""
      },
      hs = function() {
          var e = tr(this).query;
          return e ? "?" + e : ""
      },
      ds = function() {
          return tr(this).searchParams
      },
      fs = function() {
          var e = tr(this).fragment;
          return e ? "#" + e : ""
      },
      ps = function(e, t) {
          return {
              get: e,
              set: t,
              configurable: !0,
              enumerable: !0
          }
      };
  if (r && _e(ts, {
          href: ps(ns, function(e) {
              var t = tr(this),
                  n = String(e),
                  i = Jr(t, n);
              if (i) throw TypeError(i);
              Jo(t.searchParams).updateSearchParams(t.query)
          }),
          origin: ps(is),
          protocol: ps(os, function(e) {
              var t = tr(this);
              Jr(t, String(e) + ":", Dr)
          }),
          username: ps(rs, function(e) {
              var t = tr(this),
                  n = mo(String(e));
              if (!Ar(t)) {
                  t.username = "";
                  for (var i = 0; i < n.length; i++) t.username += kr(n[i], Sr)
              }
          }),
          password: ps(ss, function(e) {
              var t = tr(this),
                  n = mo(String(e));
              if (!Ar(t)) {
                  t.password = "";
                  for (var i = 0; i < n.length; i++) t.password += kr(n[i], Sr)
              }
          }),
          host: ps(as, function(e) {
              var t = tr(this);
              t.cannotBeABaseURL || Jr(t, String(e), Hr)
          }),
          hostname: ps(ls, function(e) {
              var t = tr(this);
              t.cannotBeABaseURL || Jr(t, String(e), Ur)
          }),
          port: ps(cs, function(e) {
              var t = tr(this);
              Ar(t) || ("" == (e = String(e)) ? t.port = null : Jr(t, e, Br))
          }),
          pathname: ps(us, function(e) {
              var t = tr(this);
              t.cannotBeABaseURL || (t.path = [], Jr(t, e + "", Yr))
          }),
          search: ps(hs, function(e) {
              var t = tr(this);
              "" == (e = String(e)) ? t.query = null: ("?" == e.charAt(0) && (e = e.slice(1)), t.query = "", Jr(t, e, Kr)), Jo(t.searchParams).updateSearchParams(t.query)
          }),
          searchParams: ps(ds),
          hash: ps(fs, function(e) {
              var t = tr(this);
              "" != (e = String(e)) ? ("#" == e.charAt(0) && (e = e.slice(1)), t.fragment = "", Jr(t, e, Zr)) : t.fragment = null
          })
      }), ee(ts, "toJSON", function() {
          return ns.call(this)
      }, {
          enumerable: !0
      }), ee(ts, "toString", function() {
          return ns.call(this)
      }, {
          enumerable: !0
      }), Ko) {
      var gs = Ko.createObjectURL,
          ms = Ko.revokeObjectURL;
      gs && ee(es, "createObjectURL", function(e) {
          return gs.apply(Ko, arguments)
      }), ms && ee(es, "revokeObjectURL", function(e) {
          return ms.apply(Ko, arguments)
      })
  }

  function vs(e) {
      return (vs = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(e)
  }

  function ys(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function bs(e, t) {
      for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
      }
  }

  function ws(e, t, n) {
      return t && bs(e.prototype, t), n && bs(e, n), e
  }

  function xs(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : e[t] = n, e
  }

  function Ss(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          t && (i = i.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
          })), n.push.apply(n, i)
      }
      return n
  }

  function ks(e) {
      for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2 ? Ss(Object(n), !0).forEach(function(t) {
              xs(e, t, n[t])
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ss(Object(n)).forEach(function(t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
          })
      }
      return e
  }

  function Ts(e, t) {
      return function(e) {
          if (Array.isArray(e)) return e
      }(e) || function(e, t) {
          if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) {
              var n = [],
                  i = !0,
                  o = !1,
                  r = void 0;
              try {
                  for (var s, a = e[Symbol.iterator](); !(i = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t); i = !0);
              } catch (e) {
                  o = !0, r = e
              } finally {
                  try {
                      i || null == a.return || a.return()
                  } finally {
                      if (o) throw r
                  }
              }
              return n
          }
      }(e, t) || function() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
      }()
  }

  function Cs(e) {
      return function(e) {
          if (Array.isArray(e)) {
              for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
              return n
          }
      }(e) || function(e) {
          if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
      }(e) || function() {
          throw new TypeError("Invalid attempt to spread non-iterable instance")
      }()
  }
  nt(es, "URL"), Ie({
          global: !0,
          forced: !oo,
          sham: !r
      }, {
          URL: es
      }),
      function(e) {
          var t = function() {
                  try {
                      return !!Symbol.iterator
                  } catch (e) {
                      return !1
                  }
              }(),
              n = function(e) {
                  var n = {
                      next: function() {
                          var t = e.shift();
                          return {
                              done: void 0 === t,
                              value: t
                          }
                      }
                  };
                  return t && (n[Symbol.iterator] = function() {
                      return n
                  }), n
              },
              i = function(e) {
                  return encodeURIComponent(e).replace(/%20/g, "+")
              },
              o = function(e) {
                  return decodeURIComponent(String(e).replace(/\+/g, " "))
              };
          (function() {
              try {
                  var t = e.URLSearchParams;
                  return "a=1" === new t("?a=1").toString() && "function" == typeof t.prototype.set
              } catch (e) {
                  return !1
              }
          })() || function() {
              var o = function e(t) {
                      Object.defineProperty(this, "_entries", {
                          writable: !0,
                          value: {}
                      });
                      var n = vs(t);
                      if ("undefined" === n);
                      else if ("string" === n) "" !== t && this._fromString(t);
                      else if (t instanceof e) {
                          var i = this;
                          t.forEach(function(e, t) {
                              i.append(t, e)
                          })
                      } else {
                          if (null === t || "object" !== n) throw new TypeError("Unsupported input's type for URLSearchParams");
                          if ("[object Array]" === Object.prototype.toString.call(t))
                              for (var o = 0; o < t.length; o++) {
                                  var r = t[o];
                                  if ("[object Array]" !== Object.prototype.toString.call(r) && 2 === r.length) throw new TypeError("Expected [string, any] as entry at index " + o + " of URLSearchParams's input");
                                  this.append(r[0], r[1])
                              } else
                                  for (var s in t) t.hasOwnProperty(s) && this.append(s, t[s])
                      }
                  },
                  r = o.prototype;
              r.append = function(e, t) {
                  e in this._entries ? this._entries[e].push(String(t)) : this._entries[e] = [String(t)]
              }, r.delete = function(e) {
                  delete this._entries[e]
              }, r.get = function(e) {
                  return e in this._entries ? this._entries[e][0] : null
              }, r.getAll = function(e) {
                  return e in this._entries ? this._entries[e].slice(0) : []
              }, r.has = function(e) {
                  return e in this._entries
              }, r.set = function(e, t) {
                  this._entries[e] = [String(t)]
              }, r.forEach = function(e, t) {
                  var n;
                  for (var i in this._entries)
                      if (this._entries.hasOwnProperty(i)) {
                          n = this._entries[i];
                          for (var o = 0; o < n.length; o++) e.call(t, n[o], i, this)
                      }
              }, r.keys = function() {
                  var e = [];
                  return this.forEach(function(t, n) {
                      e.push(n)
                  }), n(e)
              }, r.values = function() {
                  var e = [];
                  return this.forEach(function(t) {
                      e.push(t)
                  }), n(e)
              }, r.entries = function() {
                  var e = [];
                  return this.forEach(function(t, n) {
                      e.push([n, t])
                  }), n(e)
              }, t && (r[Symbol.iterator] = r.entries), r.toString = function() {
                  var e = [];
                  return this.forEach(function(t, n) {
                      e.push(i(n) + "=" + i(t))
                  }), e.join("&")
              }, e.URLSearchParams = o
          }();
          var r = e.URLSearchParams.prototype;
          "function" != typeof r.sort && (r.sort = function() {
              var e = this,
                  t = [];
              this.forEach(function(n, i) {
                  t.push([i, n]), e._entries || e.delete(i)
              }), t.sort(function(e, t) {
                  return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0
              }), e._entries && (e._entries = {});
              for (var n = 0; n < t.length; n++) this.append(t[n][0], t[n][1])
          }), "function" != typeof r._fromString && Object.defineProperty(r, "_fromString", {
              enumerable: !1,
              configurable: !1,
              writable: !1,
              value: function(e) {
                  if (this._entries) this._entries = {};
                  else {
                      var t = [];
                      this.forEach(function(e, n) {
                          t.push(n)
                      });
                      for (var n = 0; n < t.length; n++) this.delete(t[n])
                  }
                  var i, r = (e = e.replace(/^\?/, "")).split("&");
                  for (n = 0; n < r.length; n++) i = r[n].split("="), this.append(o(i[0]), i.length > 1 ? o(i[1]) : "")
              }
          })
      }(void 0 !== e ? e : "undefined" != typeof window ? window : "undefined" != typeof self ? self : e),
      function(e) {
          if (function() {
                  try {
                      var t = new e.URL("b", "http://a");
                      return t.pathname = "c d", "http://a/c%20d" === t.href && t.searchParams
                  } catch (e) {
                      return !1
                  }
              }() || function() {
                  var t = e.URL,
                      n = function(t, n) {
                          "string" != typeof t && (t = String(t));
                          var i, o = document;
                          if (n && (void 0 === e.location || n !== e.location.href)) {
                              (i = (o = document.implementation.createHTMLDocument("")).createElement("base")).href = n, o.head.appendChild(i);
                              try {
                                  if (0 !== i.href.indexOf(n)) throw new Error(i.href)
                              } catch (e) {
                                  throw new Error("URL unable to set base " + n + " due to " + e)
                              }
                          }
                          var r = o.createElement("a");
                          if (r.href = t, i && (o.body.appendChild(r), r.href = r.href), ":" === r.protocol || !/:/.test(r.href)) throw new TypeError("Invalid URL");
                          Object.defineProperty(this, "_anchorElement", {
                              value: r
                          });
                          var s = new e.URLSearchParams(this.search),
                              a = !0,
                              l = !0,
                              c = this;
                          ["append", "delete", "set"].forEach(function(e) {
                              var t = s[e];
                              s[e] = function() {
                                  t.apply(s, arguments), a && (l = !1, c.search = s.toString(), l = !0)
                              }
                          }), Object.defineProperty(this, "searchParams", {
                              value: s,
                              enumerable: !0
                          });
                          var u = void 0;
                          Object.defineProperty(this, "_updateSearchParams", {
                              enumerable: !1,
                              configurable: !1,
                              writable: !1,
                              value: function() {
                                  this.search !== u && (u = this.search, l && (a = !1, this.searchParams._fromString(this.search), a = !0))
                              }
                          })
                      },
                      i = n.prototype;
                  ["hash", "host", "hostname", "port", "protocol"].forEach(function(e) {
                      ! function(e) {
                          Object.defineProperty(i, e, {
                              get: function() {
                                  return this._anchorElement[e]
                              },
                              set: function(t) {
                                  this._anchorElement[e] = t
                              },
                              enumerable: !0
                          })
                      }(e)
                  }), Object.defineProperty(i, "search", {
                      get: function() {
                          return this._anchorElement.search
                      },
                      set: function(e) {
                          this._anchorElement.search = e, this._updateSearchParams()
                      },
                      enumerable: !0
                  }), Object.defineProperties(i, {
                      toString: {
                          get: function() {
                              var e = this;
                              return function() {
                                  return e.href
                              }
                          }
                      },
                      href: {
                          get: function() {
                              return this._anchorElement.href.replace(/\?$/, "")
                          },
                          set: function(e) {
                              this._anchorElement.href = e, this._updateSearchParams()
                          },
                          enumerable: !0
                      },
                      pathname: {
                          get: function() {
                              return this._anchorElement.pathname.replace(/(^\/?)/, "/")
                          },
                          set: function(e) {
                              this._anchorElement.pathname = e
                          },
                          enumerable: !0
                      },
                      origin: {
                          get: function() {
                              var e = {
                                      "http:": 80,
                                      "https:": 443,
                                      "ftp:": 21
                                  } [this._anchorElement.protocol],
                                  t = this._anchorElement.port != e && "" !== this._anchorElement.port;
                              return this._anchorElement.protocol + "//" + this._anchorElement.hostname + (t ? ":" + this._anchorElement.port : "")
                          },
                          enumerable: !0
                      },
                      password: {
                          get: function() {
                              return ""
                          },
                          set: function(e) {},
                          enumerable: !0
                      },
                      username: {
                          get: function() {
                              return ""
                          },
                          set: function(e) {},
                          enumerable: !0
                      }
                  }), n.createObjectURL = function(e) {
                      return t.createObjectURL.apply(t, arguments)
                  }, n.revokeObjectURL = function(e) {
                      return t.revokeObjectURL.apply(t, arguments)
                  }, e.URL = n
              }(), void 0 !== e.location && !("origin" in e.location)) {
              var t = function() {
                  return e.location.protocol + "//" + e.location.hostname + (e.location.port ? ":" + e.location.port : "")
              };
              try {
                  Object.defineProperty(e.location, "origin", {
                      get: t,
                      enumerable: !0
                  })
              } catch (n) {
                  setInterval(function() {
                      e.location.origin = t()
                  }, 100)
              }
          }
      }(void 0 !== e ? e : "undefined" != typeof window ? window : "undefined" != typeof self ? self : e);
  var Es = Ge("isConcatSpreadable"),
      As = Bn >= 51 || !o(function() {
          var e = [];
          return e[Es] = !1, e.concat()[0] !== e
      }),
      Ps = Vn("concat"),
      Ls = function(e) {
          if (!m(e)) return !1;
          var t = e[Es];
          return void 0 !== t ? !!t : Me(e)
      };
  Ie({
      target: "Array",
      proto: !0,
      forced: !As || !Ps
  }, {
      concat: function(e) {
          var t, n, i, o, r, s = Oe(this),
              a = st(s, 0),
              l = 0;
          for (t = -1, i = arguments.length; t < i; t++)
              if (r = -1 === t ? s : arguments[t], Ls(r)) {
                  if (l + (o = le(r.length)) > 9007199254740991) throw TypeError("Maximum allowed index exceeded");
                  for (n = 0; n < o; n++, l++) n in r && zn(a, l, r[n])
              } else {
                  if (l >= 9007199254740991) throw TypeError("Maximum allowed index exceeded");
                  zn(a, l++, r)
              } return a.length = l, a
      }
  });
  var Is = ct.filter,
      js = Vn("filter"),
      Ds = Kt("filter");
  Ie({
      target: "Array",
      proto: !0,
      forced: !js || !Ds
  }, {
      filter: function(e) {
          return Is(this, e, arguments.length > 1 ? arguments[1] : void 0)
      }
  });
  var Ms = ct.find,
      Os = !0,
      Ns = Kt("find");
  "find" in [] && Array(1).find(function() {
      Os = !1
  }), Ie({
      target: "Array",
      proto: !0,
      forced: Os || !Ns
  }, {
      find: function(e) {
          return Ms(this, e, arguments.length > 1 ? arguments[1] : void 0)
      }
  }), fn("find");
  var _s = Ge("iterator"),
      Rs = !1;
  try {
      var $s = 0,
          zs = {
              next: function() {
                  return {
                      done: !!$s++
                  }
              },
              return: function() {
                  Rs = !0
              }
          };
      zs[_s] = function() {
          return this
      }, Array.from(zs, function() {
          throw 2
      })
  } catch (e) {}
  var Fs = function(e, t) {
          if (!t && !Rs) return !1;
          var n = !1;
          try {
              var i = {};
              i[_s] = function() {
                  return {
                      next: function() {
                          return {
                              done: n = !0
                          }
                      }
                  }
              }, e(i)
          } catch (e) {}
          return n
      },
      qs = !Fs(function(e) {
          Array.from(e)
      });
  Ie({
      target: "Array",
      stat: !0,
      forced: qs
  }, {
      from: mo
  });
  var Hs = fe.includes,
      Us = Kt("indexOf", {
          ACCESSORS: !0,
          1: 0
      });
  Ie({
      target: "Array",
      proto: !0,
      forced: !Us
  }, {
      includes: function(e) {
          return Hs(this, e, arguments.length > 1 ? arguments[1] : void 0)
      }
  }), fn("includes");
  var Bs = ct.map,
      Ws = Vn("map"),
      Vs = Kt("map");
  Ie({
      target: "Array",
      proto: !0,
      forced: !Ws || !Vs
  }, {
      map: function(e) {
          return Bs(this, e, arguments.length > 1 ? arguments[1] : void 0)
      }
  });
  var Xs = function(e, t, n) {
          var i, o;
          return Cn && "function" == typeof(i = t.constructor) && i !== n && m(o = i.prototype) && o !== n.prototype && Cn(e, o), e
      },
      Ys = "\t\n\v\f\r                　\u2028\u2029\ufeff",
      Qs = "[" + Ys + "]",
      Gs = RegExp("^" + Qs + Qs + "*"),
      Ks = RegExp(Qs + Qs + "*$"),
      Zs = function(e) {
          return function(t) {
              var n = String(p(t));
              return 1 & e && (n = n.replace(Gs, "")), 2 & e && (n = n.replace(Ks, "")), n
          }
      },
      Js = {
          start: Zs(1),
          end: Zs(2),
          trim: Zs(3)
      },
      ea = ye.f,
      ta = C.f,
      na = P.f,
      ia = Js.trim,
      oa = i.Number,
      ra = oa.prototype,
      sa = "Number" == h(He(ra)),
      aa = function(e) {
          var t, n, i, o, r, s, a, l, c = v(e, !1);
          if ("string" == typeof c && c.length > 2)
              if (43 === (t = (c = ia(c)).charCodeAt(0)) || 45 === t) {
                  if (88 === (n = c.charCodeAt(2)) || 120 === n) return NaN
              } else if (48 === t) {
              switch (c.charCodeAt(1)) {
                  case 66:
                  case 98:
                      i = 2, o = 49;
                      break;
                  case 79:
                  case 111:
                      i = 8, o = 55;
                      break;
                  default:
                      return +c
              }
              for (s = (r = c.slice(2)).length, a = 0; a < s; a++)
                  if ((l = r.charCodeAt(a)) < 48 || l > o) return NaN;
              return parseInt(r, i)
          }
          return +c
      };
  if (Pe("Number", !oa(" 0o1") || !oa("0b1") || oa("+0x1"))) {
      for (var la, ca = function(e) {
              var t = arguments.length < 1 ? 0 : e,
                  n = this;
              return n instanceof ca && (sa ? o(function() {
                  ra.valueOf.call(n)
              }) : "Number" != h(n)) ? Xs(new oa(aa(t)), n, ca) : aa(t)
          }, ua = r ? ea(oa) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), ha = 0; ua.length > ha; ha++) b(oa, la = ua[ha]) && !b(ca, la) && na(ca, la, ta(oa, la));
      ca.prototype = ra, ra.constructor = ca, ee(i, "Number", ca)
  }
  var da = o(function() {
      Ne(1)
  });
  Ie({
      target: "Object",
      stat: !0,
      forced: da
  }, {
      keys: function(e) {
          return Ne(Oe(e))
      }
  });
  var fa = function(e) {
          if (Fi(e)) throw TypeError("The method doesn't accept regular expressions");
          return e
      },
      pa = Ge("match"),
      ga = function(e) {
          var t = /./;
          try {
              "/./" [e](t)
          } catch (n) {
              try {
                  return t[pa] = !1, "/./" [e](t)
              } catch (e) {}
          }
          return !1
      };
  Ie({
      target: "String",
      proto: !0,
      forced: !ga("includes")
  }, {
      includes: function(e) {
          return !!~String(p(this)).indexOf(fa(e), arguments.length > 1 ? arguments[1] : void 0)
      }
  });
  var ma = !o(function() {
          return Object.isExtensible(Object.preventExtensions({}))
      }),
      va = t(function(e) {
          var t = P.f,
              n = H("meta"),
              i = 0,
              o = Object.isExtensible || function() {
                  return !0
              },
              r = function(e) {
                  t(e, n, {
                      value: {
                          objectID: "O" + ++i,
                          weakData: {}
                      }
                  })
              },
              s = e.exports = {
                  REQUIRED: !1,
                  fastKey: function(e, t) {
                      if (!m(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                      if (!b(e, n)) {
                          if (!o(e)) return "F";
                          if (!t) return "E";
                          r(e)
                      }
                      return e[n].objectID
                  },
                  getWeakData: function(e, t) {
                      if (!b(e, n)) {
                          if (!o(e)) return !0;
                          if (!t) return !1;
                          r(e)
                      }
                      return e[n].weakData
                  },
                  onFreeze: function(e) {
                      return ma && s.REQUIRED && o(e) && !b(e, n) && r(e), e
                  }
              };
          W[n] = !0
      }),
      ya = (va.REQUIRED, va.fastKey, va.getWeakData, va.onFreeze, t(function(e) {
          var t = function(e, t) {
              this.stopped = e, this.result = t
          };
          (e.exports = function(e, n, i, o, r) {
              var s, a, l, c, u, h, d, f = ot(n, i, o ? 2 : 1);
              if (r) s = e;
              else {
                  if ("function" != typeof(a = go(e))) throw TypeError("Target is not iterable");
                  if (fo(a)) {
                      for (l = 0, c = le(e.length); c > l; l++)
                          if ((u = o ? f(E(d = e[l])[0], d[1]) : f(e[l])) && u instanceof t) return u;
                      return new t(!1)
                  }
                  s = a.call(e)
              }
              for (h = s.next; !(d = h.call(s)).done;)
                  if ("object" == typeof(u = co(s, f, d.value, o)) && u && u instanceof t) return u;
              return new t(!1)
          }).stop = function(e) {
              return new t(!0, e)
          }
      })),
      ba = va.getWeakData,
      wa = J.set,
      xa = J.getterFor,
      Sa = ct.find,
      ka = ct.findIndex,
      Ta = 0,
      Ca = function(e) {
          return e.frozen || (e.frozen = new Ea)
      },
      Ea = function() {
          this.entries = []
      },
      Aa = function(e, t) {
          return Sa(e.entries, function(e) {
              return e[0] === t
          })
      };
  Ea.prototype = {
      get: function(e) {
          var t = Aa(this, e);
          if (t) return t[1]
      },
      has: function(e) {
          return !!Aa(this, e)
      },
      set: function(e, t) {
          var n = Aa(this, e);
          n ? n[1] = t : this.entries.push([e, t])
      },
      delete: function(e) {
          var t = ka(this.entries, function(t) {
              return t[0] === e
          });
          return ~t && this.entries.splice(t, 1), !!~t
      }
  };
  var Pa = {
          getConstructor: function(e, t, n, i) {
              var o = e(function(e, r) {
                      ro(e, o, t), wa(e, {
                          type: t,
                          id: Ta++,
                          frozen: void 0
                      }), null != r && ya(r, e[i], e, n)
                  }),
                  r = xa(t),
                  s = function(e, t, n) {
                      var i = r(e),
                          o = ba(E(t), !0);
                      return !0 === o ? Ca(i).set(t, n) : o[i.id] = n, e
                  };
              return Co(o.prototype, {
                  delete: function(e) {
                      var t = r(this);
                      if (!m(e)) return !1;
                      var n = ba(e);
                      return !0 === n ? Ca(t).delete(e) : n && b(n, t.id) && delete n[t.id]
                  },
                  has: function(e) {
                      var t = r(this);
                      if (!m(e)) return !1;
                      var n = ba(e);
                      return !0 === n ? Ca(t).has(e) : n && b(n, t.id)
                  }
              }), Co(o.prototype, n ? {
                  get: function(e) {
                      var t = r(this);
                      if (m(e)) {
                          var n = ba(e);
                          return !0 === n ? Ca(t).get(e) : n ? n[t.id] : void 0
                      }
                  },
                  set: function(e, t) {
                      return s(this, e, t)
                  }
              } : {
                  add: function(e) {
                      return s(this, e, !0)
                  }
              }), o
          }
      },
      La = (t(function(e) {
          var t, n = J.enforce,
              r = !i.ActiveXObject && "ActiveXObject" in i,
              s = Object.isExtensible,
              a = function(e) {
                  return function() {
                      return e(this, arguments.length ? arguments[0] : void 0)
                  }
              },
              l = e.exports = function(e, t, n) {
                  var r = -1 !== e.indexOf("Map"),
                      s = -1 !== e.indexOf("Weak"),
                      a = r ? "set" : "add",
                      l = i[e],
                      c = l && l.prototype,
                      u = l,
                      h = {},
                      d = function(e) {
                          var t = c[e];
                          ee(c, e, "add" == e ? function(e) {
                              return t.call(this, 0 === e ? 0 : e), this
                          } : "delete" == e ? function(e) {
                              return !(s && !m(e)) && t.call(this, 0 === e ? 0 : e)
                          } : "get" == e ? function(e) {
                              return s && !m(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                          } : "has" == e ? function(e) {
                              return !(s && !m(e)) && t.call(this, 0 === e ? 0 : e)
                          } : function(e, n) {
                              return t.call(this, 0 === e ? 0 : e, n), this
                          })
                      };
                  if (Pe(e, "function" != typeof l || !(s || c.forEach && !o(function() {
                          (new l).entries().next()
                      })))) u = n.getConstructor(t, e, r, a), va.REQUIRED = !0;
                  else if (Pe(e, !0)) {
                      var f = new u,
                          p = f[a](s ? {} : -0, 1) != f,
                          g = o(function() {
                              f.has(1)
                          }),
                          v = Fs(function(e) {
                              new l(e)
                          }),
                          y = !s && o(function() {
                              for (var e = new l, t = 5; t--;) e[a](t, t);
                              return !e.has(-0)
                          });
                      v || ((u = t(function(t, n) {
                          ro(t, u, e);
                          var i = Xs(new l, t, u);
                          return null != n && ya(n, i[a], i, r), i
                      })).prototype = c, c.constructor = u), (g || y) && (d("delete"), d("has"), r && d("get")), (y || p) && d(a), s && c.clear && delete c.clear
                  }
                  return h[e] = u, Ie({
                      global: !0,
                      forced: u != l
                  }, h), nt(u, e), s || n.setStrong(u, e, r), u
              }("WeakMap", a, Pa);
          if ($ && r) {
              t = Pa.getConstructor(a, "WeakMap", !0), va.REQUIRED = !0;
              var c = l.prototype,
                  u = c.delete,
                  h = c.has,
                  d = c.get,
                  f = c.set;
              Co(c, {
                  delete: function(e) {
                      if (m(e) && !s(e)) {
                          var i = n(this);
                          return i.frozen || (i.frozen = new t), u.call(this, e) || i.frozen.delete(e)
                      }
                      return u.call(this, e)
                  },
                  has: function(e) {
                      if (m(e) && !s(e)) {
                          var i = n(this);
                          return i.frozen || (i.frozen = new t), h.call(this, e) || i.frozen.has(e)
                      }
                      return h.call(this, e)
                  },
                  get: function(e) {
                      if (m(e) && !s(e)) {
                          var i = n(this);
                          return i.frozen || (i.frozen = new t), h.call(this, e) ? d.call(this, e) : i.frozen.get(e)
                      }
                      return d.call(this, e)
                  },
                  set: function(e, i) {
                      if (m(e) && !s(e)) {
                          var o = n(this);
                          o.frozen || (o.frozen = new t), h.call(this, e) ? f.call(this, e, i) : o.frozen.set(e, i)
                      } else f.call(this, e, i);
                      return this
                  }
              })
          }
      }), ct.every),
      Ia = Xt("every"),
      ja = Kt("every");
  Ie({
      target: "Array",
      proto: !0,
      forced: !Ia || !ja
  }, {
      every: function(e) {
          return La(this, e, arguments.length > 1 ? arguments[1] : void 0)
      }
  }), Ie({
      target: "Object",
      stat: !0,
      forced: Object.assign !== lo
  }, {
      assign: lo
  });
  var Da = Js.trim;
  Ie({
      target: "String",
      proto: !0,
      forced: function(e) {
          return o(function() {
              return !!Ys[e]() || "​᠎" != "​᠎" [e]() || Ys[e].name !== e
          })
      }("trim")
  }, {
      trim: function() {
          return Da(this)
      }
  });
  var Ma = ct.some,
      Oa = Xt("some"),
      Na = Kt("some");
  Ie({
      target: "Array",
      proto: !0,
      forced: !Oa || !Na
  }, {
      some: function(e) {
          return Ma(this, e, arguments.length > 1 ? arguments[1] : void 0)
      }
  });
  var _a = "".repeat || function(e) {
          var t = String(p(this)),
              n = "",
              i = se(e);
          if (i < 0 || i == 1 / 0) throw RangeError("Wrong number of repetitions");
          for (; i > 0;
              (i >>>= 1) && (t += t)) 1 & i && (n += t);
          return n
      },
      Ra = 1..toFixed,
      $a = Math.floor,
      za = function(e, t, n) {
          return 0 === t ? n : t % 2 == 1 ? za(e, t - 1, n * e) : za(e * e, t / 2, n)
      },
      Fa = Ra && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !o(function() {
          Ra.call({})
      });
  Ie({
      target: "Number",
      proto: !0,
      forced: Fa
  }, {
      toFixed: function(e) {
          var t, n, i, o, r = function(e) {
                  if ("number" != typeof e && "Number" != h(e)) throw TypeError("Incorrect invocation");
                  return +e
              }(this),
              s = se(e),
              a = [0, 0, 0, 0, 0, 0],
              l = "",
              c = "0",
              u = function(e, t) {
                  for (var n = -1, i = t; ++n < 6;) i += e * a[n], a[n] = i % 1e7, i = $a(i / 1e7)
              },
              d = function(e) {
                  for (var t = 6, n = 0; --t >= 0;) n += a[t], a[t] = $a(n / e), n = n % e * 1e7
              },
              f = function() {
                  for (var e = 6, t = ""; --e >= 0;)
                      if ("" !== t || 0 === e || 0 !== a[e]) {
                          var n = String(a[e]);
                          t = "" === t ? n : t + _a.call("0", 7 - n.length) + n
                      } return t
              };
          if (s < 0 || s > 20) throw RangeError("Incorrect fraction digits");
          if (r != r) return "NaN";
          if (r <= -1e21 || r >= 1e21) return String(r);
          if (r < 0 && (l = "-", r = -r), r > 1e-21)
              if (n = (t = function(e) {
                      for (var t = 0, n = r * za(2, 69, 1); n >= 4096;) t += 12, n /= 4096;
                      for (; n >= 2;) t += 1, n /= 2;
                      return t
                  }() - 69) < 0 ? r * za(2, -t, 1) : r / za(2, t, 1), n *= 4503599627370496, (t = 52 - t) > 0) {
                  for (u(0, n), i = s; i >= 7;) u(1e7, 0), i -= 7;
                  for (u(za(10, i, 1), 0), i = t - 1; i >= 23;) d(1 << 23), i -= 23;
                  d(1 << i), u(1, 1), d(2), c = f()
              } else u(0, n), u(1 << -t, 0), c = f() + _a.call("0", s);
          return s > 0 ? l + ((o = c.length) <= s ? "0." + _a.call("0", s - o) + c : c.slice(0, o - s) + "." + c.slice(o - s)) : l + c
      }
  });
  var qa = l.f,
      Ha = function(e) {
          return function(t) {
              for (var n, i = g(t), o = Ne(i), s = o.length, a = 0, l = []; s > a;) n = o[a++], r && !qa.call(i, n) || l.push(e ? [n, i[n]] : i[n]);
              return l
          }
      },
      Ua = {
          entries: Ha(!0),
          values: Ha(!1)
      },
      Ba = Ua.entries;
  Ie({
      target: "Object",
      stat: !0
  }, {
      entries: function(e) {
          return Ba(e)
      }
  });
  var Wa = Ua.values;
  Ie({
      target: "Object",
      stat: !0
  }, {
      values: function(e) {
          return Wa(e)
      }
  });
  var Va = {
      addCSS: !0,
      thumbWidth: 15,
      watch: !0
  };
  Ie({
      target: "Number",
      stat: !0
  }, {
      isNaN: function(e) {
          return e != e
      }
  });
  var Xa = function(e) {
          return null != e ? e.constructor : null
      },
      Ya = function(e, t) {
          return Boolean(e && t && e instanceof t)
      },
      Qa = function(e) {
          return Xa(e) === String
      },
      Ga = function(e) {
          return Array.isArray(e)
      },
      Ka = function(e) {
          return Ya(e, NodeList)
      },
      Za = Qa,
      Ja = Ga,
      el = Ka,
      tl = function(e) {
          return Ya(e, Element)
      },
      nl = function(e) {
          return Ya(e, Event)
      },
      il = function(e) {
          return function(e) {
              return null == e
          }(e) || (Qa(e) || Ga(e) || Ka(e)) && !e.length || function(e) {
              return Xa(e) === Object
          }(e) && !Object.keys(e).length
      };
  Li("match", 1, function(e, t, n) {
      return [function(t) {
          var n = p(this),
              i = null == t ? void 0 : t[e];
          return void 0 !== i ? i.call(t, n) : new RegExp(t)[e](String(n))
      }, function(e) {
          var i = n(t, e, this);
          if (i.done) return i.value;
          var o = E(e),
              r = String(this);
          if (!o.global) return Di(o, r);
          var s = o.unicode;
          o.lastIndex = 0;
          for (var a, l = [], c = 0; null !== (a = Di(o, r));) {
              var u = String(a[0]);
              l[c] = u, "" === u && (o.lastIndex = ji(r, le(o.lastIndex), s)), c++
          }
          return 0 === c ? null : l
      }]
  });
  var ol, rl, sl, al = function() {
          function e(t, n) {
              ys(this, e), tl(t) ? this.element = t : Za(t) && (this.element = document.querySelector(t)), tl(this.element) && il(this.element.rangeTouch) && (this.config = Object.assign({}, Va, n), this.init())
          }
          return ws(e, [{
              key: "init",
              value: function() {
                  e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this)
              }
          }, {
              key: "destroy",
              value: function() {
                  e.enabled && (this.listeners(!1), this.element.rangeTouch = null)
              }
          }, {
              key: "listeners",
              value: function(e) {
                  var t = this,
                      n = e ? "addEventListener" : "removeEventListener";
                  ["touchstart", "touchmove", "touchend"].forEach(function(e) {
                      t.element[n](e, function(e) {
                          return t.set(e)
                      }, !1)
                  })
              }
          }, {
              key: "get",
              value: function(t) {
                  if (!e.enabled || !nl(t)) return null;
                  var n, i = t.target,
                      o = t.changedTouches[0],
                      r = parseFloat(i.getAttribute("min")) || 0,
                      s = parseFloat(i.getAttribute("max")) || 100,
                      a = parseFloat(i.getAttribute("step")) || 1,
                      l = s - r,
                      c = i.getBoundingClientRect(),
                      u = 100 / c.width * (this.config.thumbWidth / 2) / 100;
                  return (n = 100 / c.width * (o.clientX - c.left)) < 0 ? n = 0 : n > 100 && (n = 100), n < 50 ? n -= (100 - 2 * n) * u : n > 50 && (n += 2 * (n - 50) * u), r + function(e, t) {
                      if (t < 1) {
                          var n = function(e) {
                              var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                              return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
                          }(t);
                          return parseFloat(e.toFixed(n))
                      }
                      return Math.round(e / t) * t
                  }(l * (n / 100), a)
              }
          }, {
              key: "set",
              value: function(t) {
                  e.enabled && nl(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), function(e, t) {
                      if (e && t) {
                          var n = new Event(t);
                          e.dispatchEvent(n)
                      }
                  }(t.target, "touchend" === t.type ? "change" : "input"))
              }
          }], [{
              key: "setup",
              value: function(t) {
                  var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                      i = null;
                  if (il(t) || Za(t) ? i = Array.from(document.querySelectorAll(Za(t) ? t : 'input[type="range"]')) : tl(t) ? i = [t] : el(t) ? i = Array.from(t) : Ja(t) && (i = t.filter(tl)), il(i)) return null;
                  var o = Object.assign({}, Va, n);
                  Za(t) && o.watch && new MutationObserver(function(n) {
                      Array.from(n).forEach(function(n) {
                          Array.from(n.addedNodes).forEach(function(n) {
                              tl(n) && function(e, t) {
                                  return function() {
                                      return Array.from(document.querySelectorAll(t)).includes(this)
                                  }.call(e, t)
                              }(n, t) && new e(n, o)
                          })
                      })
                  }).observe(document.body, {
                      childList: !0,
                      subtree: !0
                  });
                  return i.map(function(t) {
                      return new e(t, n)
                  })
              }
          }, {
              key: "enabled",
              get: function() {
                  return "ontouchstart" in document.documentElement
              }
          }]), e
      }(),
      ll = i.Promise,
      cl = Ge("species"),
      ul = function(e) {
          var t = ie(e),
              n = P.f;
          r && t && !t[cl] && n(t, cl, {
              configurable: !0,
              get: function() {
                  return this
              }
          })
      },
      hl = /(iphone|ipod|ipad).*applewebkit/i.test(Fn),
      dl = i.location,
      fl = i.setImmediate,
      pl = i.clearImmediate,
      gl = i.process,
      ml = i.MessageChannel,
      vl = i.Dispatch,
      yl = 0,
      bl = {},
      wl = function(e) {
          if (bl.hasOwnProperty(e)) {
              var t = bl[e];
              delete bl[e], t()
          }
      },
      xl = function(e) {
          return function() {
              wl(e)
          }
      },
      Sl = function(e) {
          wl(e.data)
      },
      kl = function(e) {
          i.postMessage(e + "", dl.protocol + "//" + dl.host)
      };
  fl && pl || (fl = function(e) {
      for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
      return bl[++yl] = function() {
          ("function" == typeof e ? e : Function(e)).apply(void 0, t)
      }, ol(yl), yl
  }, pl = function(e) {
      delete bl[e]
  }, "process" == h(gl) ? ol = function(e) {
      gl.nextTick(xl(e))
  } : vl && vl.now ? ol = function(e) {
      vl.now(xl(e))
  } : ml && !hl ? (sl = (rl = new ml).port2, rl.port1.onmessage = Sl, ol = ot(sl.postMessage, sl, 1)) : !i.addEventListener || "function" != typeof postMessage || i.importScripts || o(kl) ? ol = "onreadystatechange" in S("script") ? function(e) {
      Re.appendChild(S("script")).onreadystatechange = function() {
          Re.removeChild(this), wl(e)
      }
  } : function(e) {
      setTimeout(xl(e), 0)
  } : (ol = kl, i.addEventListener("message", Sl, !1)));
  var Tl, Cl, El, Al, Pl, Ll, Il, jl, Dl = {
          set: fl,
          clear: pl
      },
      Ml = C.f,
      Ol = Dl.set,
      Nl = i.MutationObserver || i.WebKitMutationObserver,
      _l = i.process,
      Rl = i.Promise,
      $l = "process" == h(_l),
      zl = Ml(i, "queueMicrotask"),
      Fl = zl && zl.value;
  Fl || (Tl = function() {
      var e, t;
      for ($l && (e = _l.domain) && e.exit(); Cl;) {
          t = Cl.fn, Cl = Cl.next;
          try {
              t()
          } catch (e) {
              throw Cl ? Al() : El = void 0, e
          }
      }
      El = void 0, e && e.enter()
  }, $l ? Al = function() {
      _l.nextTick(Tl)
  } : Nl && !hl ? (Pl = !0, Ll = document.createTextNode(""), new Nl(Tl).observe(Ll, {
      characterData: !0
  }), Al = function() {
      Ll.data = Pl = !Pl
  }) : Rl && Rl.resolve ? (Il = Rl.resolve(void 0), jl = Il.then, Al = function() {
      jl.call(Il, Tl)
  }) : Al = function() {
      Ol.call(i, Tl)
  });
  var ql, Hl, Ul, Bl, Wl = Fl || function(e) {
          var t = {
              fn: e,
              next: void 0
          };
          El && (El.next = t), Cl || (Cl = t, Al()), El = t
      },
      Vl = function(e) {
          var t, n;
          this.promise = new e(function(e, i) {
              if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
              t = e, n = i
          }), this.resolve = it(t), this.reject = it(n)
      },
      Xl = {
          f: function(e) {
              return new Vl(e)
          }
      },
      Yl = function(e, t) {
          if (E(e), m(t) && t.constructor === e) return t;
          var n = Xl.f(e);
          return (0, n.resolve)(t), n.promise
      },
      Ql = function(e) {
          try {
              return {
                  error: !1,
                  value: e()
              }
          } catch (e) {
              return {
                  error: !0,
                  value: e
              }
          }
      },
      Gl = Dl.set,
      Kl = Ge("species"),
      Zl = "Promise",
      Jl = J.get,
      ec = J.set,
      tc = J.getterFor(Zl),
      nc = ll,
      ic = i.TypeError,
      oc = i.document,
      rc = i.process,
      sc = ie("fetch"),
      ac = Xl.f,
      lc = ac,
      cc = "process" == h(rc),
      uc = !!(oc && oc.createEvent && i.dispatchEvent),
      hc = Pe(Zl, function() {
          if (_(nc) === String(nc)) {
              if (66 === Bn) return !0;
              if (!cc && "function" != typeof PromiseRejectionEvent) return !0
          }
          if (Bn >= 51 && /native code/.test(nc)) return !1;
          var e = nc.resolve(1),
              t = function(e) {
                  e(function() {}, function() {})
              };
          return (e.constructor = {})[Kl] = t, !(e.then(function() {}) instanceof t)
      }),
      dc = hc || !Fs(function(e) {
          nc.all(e).catch(function() {})
      }),
      fc = function(e) {
          var t;
          return !(!m(e) || "function" != typeof(t = e.then)) && t
      },
      pc = function(e, t, n) {
          if (!t.notified) {
              t.notified = !0;
              var i = t.reactions;
              Wl(function() {
                  for (var o = t.value, r = 1 == t.state, s = 0; i.length > s;) {
                      var a, l, c, u = i[s++],
                          h = r ? u.ok : u.fail,
                          d = u.resolve,
                          f = u.reject,
                          p = u.domain;
                      try {
                          h ? (r || (2 === t.rejection && yc(e, t), t.rejection = 1), !0 === h ? a = o : (p && p.enter(), a = h(o), p && (p.exit(), c = !0)), a === u.promise ? f(ic("Promise-chain cycle")) : (l = fc(a)) ? l.call(a, d, f) : d(a)) : f(o)
                      } catch (e) {
                          p && !c && p.exit(), f(e)
                      }
                  }
                  t.reactions = [], t.notified = !1, n && !t.rejection && mc(e, t)
              })
          }
      },
      gc = function(e, t, n) {
          var o, r;
          uc ? ((o = oc.createEvent("Event")).promise = t, o.reason = n, o.initEvent(e, !1, !0), i.dispatchEvent(o)) : o = {
              promise: t,
              reason: n
          }, (r = i["on" + e]) ? r(o) : "unhandledrejection" === e && function(e, t) {
              var n = i.console;
              n && n.error && (1 === arguments.length ? n.error(e) : n.error(e, t))
          }("Unhandled promise rejection", n)
      },
      mc = function(e, t) {
          Gl.call(i, function() {
              var n, i = t.value;
              if (vc(t) && (n = Ql(function() {
                      cc ? rc.emit("unhandledRejection", i, e) : gc("unhandledrejection", e, i)
                  }), t.rejection = cc || vc(t) ? 2 : 1, n.error)) throw n.value
          })
      },
      vc = function(e) {
          return 1 !== e.rejection && !e.parent
      },
      yc = function(e, t) {
          Gl.call(i, function() {
              cc ? rc.emit("rejectionHandled", e) : gc("rejectionhandled", e, t.value)
          })
      },
      bc = function(e, t, n, i) {
          return function(o) {
              e(t, n, o, i)
          }
      },
      wc = function(e, t, n, i) {
          t.done || (t.done = !0, i && (t = i), t.value = n, t.state = 2, pc(e, t, !0))
      },
      xc = function(e, t, n, i) {
          if (!t.done) {
              t.done = !0, i && (t = i);
              try {
                  if (e === n) throw ic("Promise can't be resolved itself");
                  var o = fc(n);
                  o ? Wl(function() {
                      var i = {
                          done: !1
                      };
                      try {
                          o.call(n, bc(xc, e, i, t), bc(wc, e, i, t))
                      } catch (n) {
                          wc(e, i, n, t)
                      }
                  }) : (t.value = n, t.state = 1, pc(e, t, !1))
              } catch (n) {
                  wc(e, {
                      done: !1
                  }, n, t)
              }
          }
      };
  hc && (nc = function(e) {
      ro(this, nc, Zl), it(e), ql.call(this);
      var t = Jl(this);
      try {
          e(bc(xc, this, t), bc(wc, this, t))
      } catch (e) {
          wc(this, t, e)
      }
  }, (ql = function(e) {
      ec(this, {
          type: Zl,
          done: !1,
          notified: !1,
          parent: !1,
          reactions: [],
          rejection: !1,
          state: 0,
          value: void 0
      })
  }).prototype = Co(nc.prototype, {
      then: function(e, t) {
          var n = tc(this),
              i = ac(Hi(this, nc));
          return i.ok = "function" != typeof e || e, i.fail = "function" == typeof t && t, i.domain = cc ? rc.domain : void 0, n.parent = !0, n.reactions.push(i), 0 != n.state && pc(this, n, !1), i.promise
      },
      catch: function(e) {
          return this.then(void 0, e)
      }
  }), Hl = function() {
      var e = new ql,
          t = Jl(e);
      this.promise = e, this.resolve = bc(xc, e, t), this.reject = bc(wc, e, t)
  }, Xl.f = ac = function(e) {
      return e === nc || e === Ul ? new Hl(e) : lc(e)
  }, "function" == typeof ll && (Bl = ll.prototype.then, ee(ll.prototype, "then", function(e, t) {
      var n = this;
      return new nc(function(e, t) {
          Bl.call(n, e, t)
      }).then(e, t)
  }, {
      unsafe: !0
  }), "function" == typeof sc && Ie({
      global: !0,
      enumerable: !0,
      forced: !0
  }, {
      fetch: function(e) {
          return Yl(nc, sc.apply(i, arguments))
      }
  }))), Ie({
      global: !0,
      wrap: !0,
      forced: hc
  }, {
      Promise: nc
  }), nt(nc, Zl, !1), ul(Zl), Ul = ie(Zl), Ie({
      target: Zl,
      stat: !0,
      forced: hc
  }, {
      reject: function(e) {
          var t = ac(this);
          return t.reject.call(void 0, e), t.promise
      }
  }), Ie({
      target: Zl,
      stat: !0,
      forced: hc
  }, {
      resolve: function(e) {
          return Yl(this, e)
      }
  }), Ie({
      target: Zl,
      stat: !0,
      forced: dc
  }, {
      all: function(e) {
          var t = this,
              n = ac(t),
              i = n.resolve,
              o = n.reject,
              r = Ql(function() {
                  var n = it(t.resolve),
                      r = [],
                      s = 0,
                      a = 1;
                  ya(e, function(e) {
                      var l = s++,
                          c = !1;
                      r.push(void 0), a++, n.call(t, e).then(function(e) {
                          c || (c = !0, r[l] = e, --a || i(r))
                      }, o)
                  }), --a || i(r)
              });
          return r.error && o(r.value), n.promise
      },
      race: function(e) {
          var t = this,
              n = ac(t),
              i = n.reject,
              o = Ql(function() {
                  var o = it(t.resolve);
                  ya(e, function(e) {
                      o.call(t, e).then(n.resolve, i)
                  })
              });
          return o.error && i(o.value), n.promise
      }
  });
  var Sc, kc = C.f,
      Tc = "".startsWith,
      Cc = Math.min,
      Ec = ga("startsWith"),
      Ac = !(Ec || (Sc = kc(String.prototype, "startsWith"), !Sc || Sc.writable));
  Ie({
      target: "String",
      proto: !0,
      forced: !Ac && !Ec
  }, {
      startsWith: function(e) {
          var t = String(p(this));
          fa(e);
          var n = le(Cc(arguments.length > 1 ? arguments[1] : void 0, t.length)),
              i = String(e);
          return Tc ? Tc.call(t, i, n) : t.slice(n, n + i.length) === i
      }
  });
  var Pc, Lc, Ic, jc = function(e) {
          return null != e ? e.constructor : null
      },
      Dc = function(e, t) {
          return Boolean(e && t && e instanceof t)
      },
      Mc = function(e) {
          return null == e
      },
      Oc = function(e) {
          return jc(e) === Object
      },
      Nc = function(e) {
          return jc(e) === String
      },
      _c = function(e) {
          return Array.isArray(e)
      },
      Rc = function(e) {
          return Dc(e, NodeList)
      },
      $c = function(e) {
          return Mc(e) || (Nc(e) || _c(e) || Rc(e)) && !e.length || Oc(e) && !Object.keys(e).length
      },
      zc = Mc,
      Fc = Oc,
      qc = function(e) {
          return jc(e) === Number && !Number.isNaN(e)
      },
      Hc = Nc,
      Uc = function(e) {
          return jc(e) === Boolean
      },
      Bc = function(e) {
          return jc(e) === Function
      },
      Wc = _c,
      Vc = Rc,
      Xc = function(e) {
          return Dc(e, Element)
      },
      Yc = function(e) {
          return Dc(e, Event)
      },
      Qc = function(e) {
          return Dc(e, KeyboardEvent)
      },
      Gc = function(e) {
          return Dc(e, TextTrack) || !Mc(e) && Nc(e.kind)
      },
      Kc = function(e) {
          if (Dc(e, window.URL)) return !0;
          if (!Nc(e)) return !1;
          var t = e;
          e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e));
          try {
              return !$c(new URL(t).hostname)
          } catch (e) {
              return !1
          }
      },
      Zc = $c,
      Jc = (Pc = document.createElement("span"), Lc = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend"
      }, Ic = Object.keys(Lc).find(function(e) {
          return void 0 !== Pc.style[e]
      }), !!Hc(Ic) && Lc[Ic]);

  function eu(e, t) {
      setTimeout(function() {
          try {
              e.hidden = !0, e.offsetHeight, e.hidden = !1
          } catch (e) {}
      }, t)
  }
  var tu = {
          isIE: !!document.documentMode,
          isEdge: window.navigator.userAgent.includes("Edge"),
          isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
          isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
          isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
      },
      nu = function(e) {
          return function(t, n, i, o) {
              it(n);
              var r = Oe(t),
                  s = f(r),
                  a = le(r.length),
                  l = e ? a - 1 : 0,
                  c = e ? -1 : 1;
              if (i < 2)
                  for (;;) {
                      if (l in s) {
                          o = s[l], l += c;
                          break
                      }
                      if (l += c, e ? l < 0 : a <= l) throw TypeError("Reduce of empty array with no initial value")
                  }
              for (; e ? l >= 0 : a > l; l += c) l in s && (o = n(o, s[l], l, r));
              return o
          }
      },
      iu = [nu(!1), nu(!0)][0],
      ou = Xt("reduce"),
      ru = Kt("reduce", {
          1: 0
      });

  function su(e, t) {
      return t.split(".").reduce(function(e, t) {
          return e && e[t]
      }, e)
  }

  function au() {
      for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
      if (!n.length) return e;
      var o = n.shift();
      return Fc(o) ? (Object.keys(o).forEach(function(t) {
          Fc(o[t]) ? (Object.keys(e).includes(t) || Object.assign(e, xs({}, t, {})), au(e[t], o[t])) : Object.assign(e, xs({}, t, o[t]))
      }), au.apply(void 0, [e].concat(n))) : e
  }

  function lu(e, t) {
      var n = e.length ? e : [e];
      Array.from(n).reverse().forEach(function(e, n) {
          var i = n > 0 ? t.cloneNode(!0) : t,
              o = e.parentNode,
              r = e.nextSibling;
          i.appendChild(e), r ? o.insertBefore(i, r) : o.appendChild(i)
      })
  }

  function cu(e, t) {
      Xc(e) && !Zc(t) && Object.entries(t).filter(function(e) {
          var t = Ts(e, 2)[1];
          return !zc(t)
      }).forEach(function(t) {
          var n = Ts(t, 2),
              i = n[0],
              o = n[1];
          return e.setAttribute(i, o)
      })
  }

  function uu(e, t, n) {
      var i = document.createElement(e);
      return Fc(t) && cu(i, t), Hc(n) && (i.innerText = n), i
  }

  function hu(e, t, n, i) {
      Xc(t) && t.appendChild(uu(e, n, i))
  }

  function du(e) {
      Vc(e) || Wc(e) ? Array.from(e).forEach(du) : Xc(e) && Xc(e.parentNode) && e.parentNode.removeChild(e)
  }

  function fu(e) {
      if (Xc(e))
          for (var t = e.childNodes.length; t > 0;) e.removeChild(e.lastChild), t -= 1
  }

  function pu(e, t) {
      return Xc(t) && Xc(t.parentNode) && Xc(e) ? (t.parentNode.replaceChild(e, t), e) : null
  }

  function gu(e, t) {
      if (!Hc(e) || Zc(e)) return {};
      var n = {},
          i = au({}, t);
      return e.split(",").forEach(function(e) {
          var t = e.trim(),
              o = t.replace(".", ""),
              r = t.replace(/[[\]]/g, "").split("="),
              s = Ts(r, 1)[0],
              a = r.length > 1 ? r[1].replace(/["']/g, "") : "";
          switch (t.charAt(0)) {
              case ".":
                  Hc(i.class) ? n.class = "".concat(i.class, " ").concat(o) : n.class = o;
                  break;
              case "#":
                  n.id = t.replace("#", "");
                  break;
              case "[":
                  n[s] = a
          }
      }), au(i, n)
  }

  function mu(e, t) {
      if (Xc(e)) {
          var n = t;
          Uc(n) || (n = !e.hidden), e.hidden = n
      }
  }

  function vu(e, t, n) {
      if (Vc(e)) return Array.from(e).map(function(e) {
          return vu(e, t, n)
      });
      if (Xc(e)) {
          var i = "toggle";
          return void 0 !== n && (i = n ? "add" : "remove"), e.classList[i](t), e.classList.contains(t)
      }
      return !1
  }

  function yu(e, t) {
      return Xc(e) && e.classList.contains(t)
  }

  function bu(e, t) {
      return function() {
          return Array.from(document.querySelectorAll(t)).includes(this)
      }.call(e, t)
  }

  function wu(e) {
      return this.elements.container.querySelectorAll(e)
  }

  function xu(e) {
      return this.elements.container.querySelector(e)
  }

  function Su() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
          t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      Xc(e) && (e.focus({
          preventScroll: !0
      }), t && vu(e, this.config.classNames.tabFocus))
  }
  Ie({
      target: "Array",
      proto: !0,
      forced: !ou || !ru
  }, {
      reduce: function(e) {
          return iu(this, e, arguments.length, arguments.length > 1 ? arguments[1] : void 0)
      }
  });
  var ku, Tu = {
          "audio/ogg": "vorbis",
          "audio/wav": "1",
          "video/webm": "vp8, vorbis",
          "video/mp4": "avc1.42E01E, mp4a.40.2",
          "video/ogg": "theora"
      },
      Cu = {
          audio: "canPlayType" in document.createElement("audio"),
          video: "canPlayType" in document.createElement("video"),
          check: function(e, t, n) {
              var i = tu.isIPhone && n && Cu.playsinline,
                  o = Cu[e] || "html5" !== t;
              return {
                  api: o,
                  ui: o && Cu.rangeInput && ("video" !== e || !tu.isIPhone || i)
              }
          },
          pip: !(tu.isIPhone || !Bc(uu("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || uu("video").disablePictureInPicture)),
          airplay: Bc(window.WebKitPlaybackTargetAvailabilityEvent),
          playsinline: "playsInline" in document.createElement("video"),
          mime: function(e) {
              if (Zc(e)) return !1;
              var t = Ts(e.split("/"), 1)[0],
                  n = e;
              if (!this.isHTML5 || t !== this.type) return !1;
              Object.keys(Tu).includes(n) && (n += '; codecs="'.concat(Tu[e], '"'));
              try {
                  return Boolean(n && this.media.canPlayType(n).replace(/no/, ""))
              } catch (e) {
                  return !1
              }
          },
          textTracks: "textTracks" in document.createElement("video"),
          rangeInput: (ku = document.createElement("input"), ku.type = "range", "range" === ku.type),
          touch: "ontouchstart" in document.documentElement,
          transitions: !1 !== Jc,
          reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
      },
      Eu = function() {
          var e = !1;
          try {
              var t = Object.defineProperty({}, "passive", {
                  get: function() {
                      return e = !0, null
                  }
              });
              window.addEventListener("test", null, t), window.removeEventListener("test", null, t)
          } catch (e) {}
          return e
      }();

  function Au(e, t, n) {
      var i = this,
          o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
          r = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
          s = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
      if (e && "addEventListener" in e && !Zc(t) && Bc(n)) {
          var a = t.split(" "),
              l = s;
          Eu && (l = {
              passive: r,
              capture: s
          }), a.forEach(function(t) {
              i && i.eventListeners && o && i.eventListeners.push({
                  element: e,
                  type: t,
                  callback: n,
                  options: l
              }), e[o ? "addEventListener" : "removeEventListener"](t, n, l)
          })
      }
  }

  function Pu(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          n = arguments.length > 2 ? arguments[2] : void 0,
          i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
          o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
      Au.call(this, e, t, n, !0, i, o)
  }

  function Lu(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          n = arguments.length > 2 ? arguments[2] : void 0,
          i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
          o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
      Au.call(this, e, t, n, !1, i, o)
  }

  function Iu(e) {
      var t = this,
          n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          i = arguments.length > 2 ? arguments[2] : void 0,
          o = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
          r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
      Au.call(this, e, n, function s() {
          Lu(e, n, s, o, r);
          for (var a = arguments.length, l = new Array(a), c = 0; c < a; c++) l[c] = arguments[c];
          i.apply(t, l)
      }, !0, o, r)
  }

  function ju(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
      if (Xc(e) && !Zc(t)) {
          var o = new CustomEvent(t, {
              bubbles: n,
              detail: ks({}, i, {
                  plyr: this
              })
          });
          e.dispatchEvent(o)
      }
  }

  function Du(e) {
      return !!(Wc(e) || Hc(e) && e.includes(":")) && (Wc(e) ? e : e.split(":")).map(Number).every(qc)
  }

  function Mu(e) {
      if (!Wc(e) || !e.every(qc)) return null;
      var t = Ts(e, 2),
          n = t[0],
          i = t[1],
          o = function e(t, n) {
              return 0 === n ? t : e(n, t % n)
          }(n, i);
      return [n / o, i / o]
  }

  function Ou(e) {
      var t = function(e) {
              return Du(e) ? e.split(":").map(Number) : null
          },
          n = t(e);
      if (null === n && (n = t(this.config.ratio)), null === n && !Zc(this.embed) && Wc(this.embed.ratio) && (n = this.embed.ratio), null === n && this.isHTML5) {
          var i = this.media;
          n = Mu([i.videoWidth, i.videoHeight])
      }
      return n
  }

  function Nu(e) {
      if (!this.isVideo) return {};
      var t = this.elements.wrapper,
          n = Ou.call(this, e),
          i = Ts(Wc(n) ? n : [0, 0], 2),
          o = 100 / i[0] * i[1];
      if (t.style.paddingBottom = "".concat(o, "%"), this.isVimeo && this.supported.ui) {
          var r = (240 - o) / 4.8;
          this.media.style.transform = "translateY(-".concat(r, "%)")
      } else this.isHTML5 && t.classList.toggle(this.config.classNames.videoFixedRatio, null !== n);
      return {
          padding: o,
          ratio: n
      }
  }
  var _u = {
      getSources: function() {
          var e = this;
          return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter(function(t) {
              var n = t.getAttribute("type");
              return !!Zc(n) || Cu.mime.call(e, n)
          }) : []
      },
      getQualityOptions: function() {
          return this.config.quality.forced ? this.config.quality.options : _u.getSources.call(this).map(function(e) {
              return Number(e.getAttribute("size"))
          }).filter(Boolean)
      },
      setup: function() {
          if (this.isHTML5) {
              var e = this;
              e.options.speed = e.config.speed.options, Zc(this.config.ratio) || Nu.call(e), Object.defineProperty(e.media, "quality", {
                  get: function() {
                      var t = _u.getSources.call(e).find(function(t) {
                          return t.getAttribute("src") === e.source
                      });
                      return t && Number(t.getAttribute("size"))
                  },
                  set: function(t) {
                      if (e.quality !== t) {
                          if (e.config.quality.forced && Bc(e.config.quality.onChange)) e.config.quality.onChange(t);
                          else {
                              var n = _u.getSources.call(e).find(function(e) {
                                  return Number(e.getAttribute("size")) === t
                              });
                              if (!n) return;
                              var i = e.media,
                                  o = i.currentTime,
                                  r = i.paused,
                                  s = i.preload,
                                  a = i.readyState,
                                  l = i.playbackRate;
                              e.media.src = n.getAttribute("src"), ("none" !== s || a) && (e.once("loadedmetadata", function() {
                                  e.speed = l, e.currentTime = o, r || e.play()
                              }), e.media.load())
                          }
                          ju.call(e, e.media, "qualitychange", !1, {
                              quality: t
                          })
                      }
                  }
              })
          }
      },
      cancelRequests: function() {
          this.isHTML5 && (du(_u.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"))
      }
  };

  function Ru(e) {
      return Wc(e) ? e.filter(function(t, n) {
          return e.indexOf(t) === n
      }) : e
  }
  var $u = P.f,
      zu = ye.f,
      Fu = J.set,
      qu = Ge("match"),
      Hu = i.RegExp,
      Uu = Hu.prototype,
      Bu = /a/g,
      Wu = /a/g,
      Vu = new Hu(Bu) !== Bu,
      Xu = si.UNSUPPORTED_Y;
  if (r && Pe("RegExp", !Vu || Xu || o(function() {
          return Wu[qu] = !1, Hu(Bu) != Bu || Hu(Wu) == Wu || "/a/i" != Hu(Bu, "i")
      }))) {
      for (var Yu = function(e, t) {
              var n, i = this instanceof Yu,
                  o = Fi(e),
                  r = void 0 === t;
              if (!i && o && e.constructor === Yu && r) return e;
              Vu ? o && !r && (e = e.source) : e instanceof Yu && (r && (t = oi.call(e)), e = e.source), Xu && (n = !!t && t.indexOf("y") > -1) && (t = t.replace(/y/g, ""));
              var s = Xs(Vu ? new Hu(e, t) : Hu(e, t), i ? this : Uu, Yu);
              return Xu && n && Fu(s, {
                  sticky: n
              }), s
          }, Qu = function(e) {
              e in Yu || $u(Yu, e, {
                  configurable: !0,
                  get: function() {
                      return Hu[e]
                  },
                  set: function(t) {
                      Hu[e] = t
                  }
              })
          }, Gu = zu(Hu), Ku = 0; Gu.length > Ku;) Qu(Gu[Ku++]);
      Uu.constructor = Yu, Yu.prototype = Uu, ee(i, "RegExp", Yu)
  }

  function Zu(e) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
      return Zc(e) ? e : e.toString().replace(/{(\d+)}/g, function(e, t) {
          return n[t].toString()
      })
  }

  function Ju() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
      return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1"), "g"), n.toString())
  }

  function eh() {
      return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/\w\S*/g, function(e) {
          return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
      })
  }

  function th(e) {
      var t = document.createElement("div");
      return t.appendChild(e), t.innerHTML
  }
  ul("RegExp");
  var nh = {
          pip: "PIP",
          airplay: "AirPlay",
          html5: "HTML5",
          vimeo: "Vimeo",
          youtube: "YouTube"
      },
      ih = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          if (Zc(e) || Zc(t)) return "";
          var n = su(t.i18n, e);
          if (Zc(n)) return Object.keys(nh).includes(e) ? nh[e] : "";
          var i = {
              "{seektime}": t.seekTime,
              "{title}": t.title
          };
          return Object.entries(i).forEach(function(e) {
              var t = Ts(e, 2),
                  i = t[0],
                  o = t[1];
              n = Ju(n, i, o)
          }), n
      },
      oh = function() {
          function e(t) {
              ys(this, e), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key
          }
          return ws(e, [{
              key: "get",
              value: function(t) {
                  if (!e.supported || !this.enabled) return null;
                  var n = window.localStorage.getItem(this.key);
                  if (Zc(n)) return null;
                  var i = JSON.parse(n);
                  return Hc(t) && t.length ? i[t] : i
              }
          }, {
              key: "set",
              value: function(t) {
                  if (e.supported && this.enabled && Fc(t)) {
                      var n = this.get();
                      Zc(n) && (n = {}), au(n, t), window.localStorage.setItem(this.key, JSON.stringify(n))
                  }
              }
          }], [{
              key: "supported",
              get: function() {
                  try {
                      return "localStorage" in window && (window.localStorage.setItem("___test", "___test"), window.localStorage.removeItem("___test"), !0)
                  } catch (e) {
                      return !1
                  }
              }
          }]), e
      }();

  function rh(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";
      return new Promise(function(n, i) {
          try {
              var o = new XMLHttpRequest;
              if (!("withCredentials" in o)) return;
              o.addEventListener("load", function() {
                  if ("text" === t) try {
                      n(JSON.parse(o.responseText))
                  } catch (e) {
                      n(o.responseText)
                  } else n(o.response)
              }), o.addEventListener("error", function() {
                  throw new Error(o.status)
              }), o.open("GET", e, !0), o.responseType = t, o.send()
          } catch (e) {
              i(e)
          }
      })
  }

  function sh(e, t) {
      if (Hc(e)) {
          var n = Hc(t),
              i = function() {
                  return null !== document.getElementById(t)
              },
              o = function(e, t) {
                  e.innerHTML = t, n && i() || document.body.insertAdjacentElement("afterbegin", e)
              };
          if (!n || !i()) {
              var r = oh.supported,
                  s = document.createElement("div");
              if (s.setAttribute("hidden", ""), n && s.setAttribute("id", t), r) {
                  var a = window.localStorage.getItem("".concat("cache", "-").concat(t));
                  if (null !== a) {
                      var l = JSON.parse(a);
                      o(s, l.content)
                  }
              }
              rh(e).then(function(e) {
                  Zc(e) || (r && window.localStorage.setItem("".concat("cache", "-").concat(t), JSON.stringify({
                      content: e
                  })), o(s, e))
              }).catch(function() {})
          }
      }
  }
  var ah = Math.ceil,
      lh = Math.floor;
  Ie({
      target: "Math",
      stat: !0
  }, {
      trunc: function(e) {
          return (e > 0 ? lh : ah)(e)
      }
  });
  var ch = function(e) {
          return Math.trunc(e / 60 / 60 % 60, 10)
      },
      uh = function(e) {
          return Math.trunc(e / 60 % 60, 10)
      },
      hh = function(e) {
          return Math.trunc(e % 60, 10)
      };

  function dh() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
      if (!qc(e)) return dh(void 0, t, n);
      var i = function(e) {
              return "0".concat(e).slice(-2)
          },
          o = ch(e),
          r = uh(e),
          s = hh(e);
      return o = t || o > 0 ? "".concat(o, ":") : "", "".concat(n && e > 0 ? "-" : "").concat(o).concat(i(r), ":").concat(i(s))
  }
  var fh = {
      getIconUrl: function() {
          var e = new URL(this.config.iconUrl, window.location).host !== window.location.host || tu.isIE && !window.svg4everybody;
          return {
              url: this.config.iconUrl,
              cors: e
          }
      },
      findElements: function() {
          try {
              return this.elements.controls = xu.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
                  play: wu.call(this, this.config.selectors.buttons.play),
                  pause: xu.call(this, this.config.selectors.buttons.pause),
                  restart: xu.call(this, this.config.selectors.buttons.restart),
                  rewind: xu.call(this, this.config.selectors.buttons.rewind),
                  fastForward: xu.call(this, this.config.selectors.buttons.fastForward),
                  mute: xu.call(this, this.config.selectors.buttons.mute),
                  pip: xu.call(this, this.config.selectors.buttons.pip),
                  airplay: xu.call(this, this.config.selectors.buttons.airplay),
                  settings: xu.call(this, this.config.selectors.buttons.settings),
                  captions: xu.call(this, this.config.selectors.buttons.captions),
                  fullscreen: xu.call(this, this.config.selectors.buttons.fullscreen)
              }, this.elements.progress = xu.call(this, this.config.selectors.progress), this.elements.inputs = {
                  seek: xu.call(this, this.config.selectors.inputs.seek),
                  volume: xu.call(this, this.config.selectors.inputs.volume)
              }, this.elements.display = {
                  buffer: xu.call(this, this.config.selectors.display.buffer),
                  currentTime: xu.call(this, this.config.selectors.display.currentTime),
                  duration: xu.call(this, this.config.selectors.display.duration)
              }, Xc(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))), !0
          } catch (e) {
              return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1
          }
      },
      createIcon: function(e, t) {
          var n = fh.getIconUrl.call(this),
              i = "".concat(n.cors ? "" : n.url, "#").concat(this.config.iconPrefix),
              o = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          cu(o, au(t, {
              role: "presentation",
              focusable: "false"
          }));
          var r = document.createElementNS("http://www.w3.org/2000/svg", "use"),
              s = "".concat(i, "-").concat(e);
          return "href" in r && r.setAttributeNS("http://www.w3.org/1999/xlink", "href", s), r.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", s), o.appendChild(r), o
      },
      createLabel: function(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = ih(e, this.config);
          return uu("span", ks({}, t, {
              class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
          }), n)
      },
      createBadge: function(e) {
          if (Zc(e)) return null;
          var t = uu("span", {
              class: this.config.classNames.menu.value
          });
          return t.appendChild(uu("span", {
              class: this.config.classNames.menu.badge
          }, e)), t
      },
      createButton: function(e, t) {
          var n = this,
              i = au({}, t),
              o = function() {
                  var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString();
                  return (e = function() {
                      var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString();
                      return e = Ju(e, "-", " "), e = Ju(e, "_", " "), Ju(e = eh(e), " ", "")
                  }(e)).charAt(0).toLowerCase() + e.slice(1)
              }(e),
              r = {
                  element: "button",
                  toggle: !1,
                  label: null,
                  icon: null,
                  labelPressed: null,
                  iconPressed: null
              };
          switch (["element", "icon", "label"].forEach(function(e) {
                  Object.keys(i).includes(e) && (r[e] = i[e], delete i[e])
              }), "button" !== r.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some(function(e) {
                  return e === n.config.classNames.control
              }) || au(i, {
                  class: "".concat(i.class, " ").concat(this.config.classNames.control)
              }) : i.class = this.config.classNames.control, e) {
              case "play":
                  r.toggle = !0, r.label = "play", r.labelPressed = "pause", r.icon = "play", r.iconPressed = "pause";
                  break;
              case "mute":
                  r.toggle = !0, r.label = "mute", r.labelPressed = "unmute", r.icon = "volume", r.iconPressed = "muted";
                  break;
              case "captions":
                  r.toggle = !0, r.label = "enableCaptions", r.labelPressed = "disableCaptions", r.icon = "captions-off", r.iconPressed = "captions-on";
                  break;
              case "fullscreen":
                  r.toggle = !0, r.label = "enterFullscreen", r.labelPressed = "exitFullscreen", r.icon = "enter-fullscreen", r.iconPressed = "exit-fullscreen";
                  break;
              case "play-large":
                  i.class += " ".concat(this.config.classNames.control, "--overlaid"), o = "play", r.label = "play", r.icon = "play";
                  break;
              default:
                  Zc(r.label) && (r.label = o), Zc(r.icon) && (r.icon = e)
          }
          var s = uu(r.element);
          return r.toggle ? (s.appendChild(fh.createIcon.call(this, r.iconPressed, {
              class: "icon--pressed"
          })), s.appendChild(fh.createIcon.call(this, r.icon, {
              class: "icon--not-pressed"
          })), s.appendChild(fh.createLabel.call(this, r.labelPressed, {
              class: "label--pressed"
          })), s.appendChild(fh.createLabel.call(this, r.label, {
              class: "label--not-pressed"
          }))) : (s.appendChild(fh.createIcon.call(this, r.icon)), s.appendChild(fh.createLabel.call(this, r.label))), au(i, gu(this.config.selectors.buttons[o], i)), cu(s, i), "play" === o ? (Wc(this.elements.buttons[o]) || (this.elements.buttons[o] = []), this.elements.buttons[o].push(s)) : this.elements.buttons[o] = s, s
      },
      createRange: function(e, t) {
          var n = uu("input", au(gu(this.config.selectors.inputs[e]), {
              type: "range",
              min: 0,
              max: 100,
              step: .01,
              value: 0,
              autocomplete: "off",
              role: "slider",
              "aria-label": ih(e, this.config),
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": 0
          }, t));
          return this.elements.inputs[e] = n, fh.updateRangeFill.call(this, n), al.setup(n), n
      },
      createProgress: function(e, t) {
          var n = uu("progress", au(gu(this.config.selectors.display[e]), {
              min: 0,
              max: 100,
              value: 0,
              role: "progressbar",
              "aria-hidden": !0
          }, t));
          if ("volume" !== e) {
              n.appendChild(uu("span", null, "0"));
              var i = {
                      played: "played",
                      buffer: "buffered"
                  } [e],
                  o = i ? ih(i, this.config) : "";
              n.innerText = "% ".concat(o.toLowerCase())
          }
          return this.elements.display[e] = n, n
      },
      createTime: function(e, t) {
          var n = gu(this.config.selectors.display[e], t),
              i = uu("div", au(n, {
                  class: "".concat(n.class ? n.class : "", " ").concat(this.config.classNames.display.time, " ").trim(),
                  "aria-label": ih(e, this.config)
              }), "00:00");
          return this.elements.display[e] = i, i
      },
      bindMenuItemShortcuts: function(e, t) {
          var n = this;
          Pu.call(this, e, "keydown keyup", function(i) {
              if ([32, 38, 39, 40].includes(i.which) && (i.preventDefault(), i.stopPropagation(), "keydown" !== i.type)) {
                  var o, r = bu(e, '[role="menuitemradio"]');
                  !r && [32, 39].includes(i.which) ? fh.showMenuPanel.call(n, t, !0) : 32 !== i.which && (40 === i.which || r && 39 === i.which ? (o = e.nextElementSibling, Xc(o) || (o = e.parentNode.firstElementChild)) : (o = e.previousElementSibling, Xc(o) || (o = e.parentNode.lastElementChild)), Su.call(n, o, !0))
              }
          }, !1), Pu.call(this, e, "keyup", function(e) {
              13 === e.which && fh.focusFirstMenuItem.call(n, null, !0)
          })
      },
      createMenuItem: function(e) {
          var t = this,
              n = e.value,
              i = e.list,
              o = e.type,
              r = e.title,
              s = e.badge,
              a = void 0 === s ? null : s,
              l = e.checked,
              c = void 0 !== l && l,
              u = gu(this.config.selectors.inputs[o]),
              h = uu("button", au(u, {
                  type: "button",
                  role: "menuitemradio",
                  class: "".concat(this.config.classNames.control, " ").concat(u.class ? u.class : "").trim(),
                  "aria-checked": c,
                  value: n
              })),
              d = uu("span");
          d.innerHTML = r, Xc(a) && d.appendChild(a), h.appendChild(d), Object.defineProperty(h, "checked", {
              enumerable: !0,
              get: function() {
                  return "true" === h.getAttribute("aria-checked")
              },
              set: function(e) {
                  e && Array.from(h.parentNode.children).filter(function(e) {
                      return bu(e, '[role="menuitemradio"]')
                  }).forEach(function(e) {
                      return e.setAttribute("aria-checked", "false")
                  }), h.setAttribute("aria-checked", e ? "true" : "false")
              }
          }), this.listeners.bind(h, "click keyup", function(e) {
              if (!Qc(e) || 32 === e.which) {
                  switch (e.preventDefault(), e.stopPropagation(), h.checked = !0, o) {
                      case "language":
                          t.currentTrack = Number(n);
                          break;
                      case "quality":
                          t.quality = n;
                          break;
                      case "speed":
                          t.speed = parseFloat(n)
                  }
                  fh.showMenuPanel.call(t, "home", Qc(e))
              }
          }, o, !1), fh.bindMenuItemShortcuts.call(this, h, o), i.appendChild(h)
      },
      formatTime: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          return qc(e) ? dh(e, ch(this.duration) > 0, t) : e
      },
      updateTimeDisplay: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          Xc(e) && qc(t) && (e.innerText = fh.formatTime(t, n))
      },
      updateVolume: function() {
          this.supported.ui && (Xc(this.elements.inputs.volume) && fh.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), Xc(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume))
      },
      setRange: function(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          Xc(e) && (e.value = t, fh.updateRangeFill.call(this, e))
      },
      updateProgress: function(e) {
          var t = this;
          if (this.supported.ui && Yc(e)) {
              var n = 0;
              if (e) switch (e.type) {
                  case "timeupdate":
                  case "seeking":
                  case "seeked":
                      n = function(e, t) {
                          return 0 === e || 0 === t || Number.isNaN(e) || Number.isNaN(t) ? 0 : (e / t * 100).toFixed(2)
                      }(this.currentTime, this.duration), "timeupdate" === e.type && fh.setRange.call(this, this.elements.inputs.seek, n);
                      break;
                  case "playing":
                  case "progress":
                      ! function(e, n) {
                          var i = qc(n) ? n : 0,
                              o = Xc(e) ? e : t.elements.display.buffer;
                          if (Xc(o)) {
                              o.value = i;
                              var r = o.getElementsByTagName("span")[0];
                              Xc(r) && (r.childNodes[0].nodeValue = i)
                          }
                      }(this.elements.display.buffer, 100 * this.buffered)
              }
          }
      },
      updateRangeFill: function(e) {
          var t = Yc(e) ? e.target : e;
          if (Xc(t) && "range" === t.getAttribute("type")) {
              if (bu(t, this.config.selectors.inputs.seek)) {
                  t.setAttribute("aria-valuenow", this.currentTime);
                  var n = fh.formatTime(this.currentTime),
                      i = fh.formatTime(this.duration),
                      o = ih("seekLabel", this.config);
                  t.setAttribute("aria-valuetext", o.replace("{currentTime}", n).replace("{duration}", i))
              } else if (bu(t, this.config.selectors.inputs.volume)) {
                  var r = 100 * t.value;
                  t.setAttribute("aria-valuenow", r), t.setAttribute("aria-valuetext", "".concat(r.toFixed(1), "%"))
              } else t.setAttribute("aria-valuenow", t.value);
              tu.isWebkit && t.style.setProperty("--value", "".concat(t.value / t.max * 100, "%"))
          }
      },
      updateSeekTooltip: function(e) {
          var t = this;
          if (this.config.tooltips.seek && Xc(this.elements.inputs.seek) && Xc(this.elements.display.seekTooltip) && 0 !== this.duration) {
              var n = "".concat(this.config.classNames.tooltip, "--visible"),
                  i = function(e) {
                      return vu(t.elements.display.seekTooltip, n, e)
                  };
              if (this.touch) i(!1);
              else {
                  var o = 0,
                      r = this.elements.progress.getBoundingClientRect();
                  if (Yc(e)) o = 100 / r.width * (e.pageX - r.left);
                  else {
                      if (!yu(this.elements.display.seekTooltip, n)) return;
                      o = parseFloat(this.elements.display.seekTooltip.style.left, 10)
                  }
                  o < 0 ? o = 0 : o > 100 && (o = 100), fh.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * o), this.elements.display.seekTooltip.style.left = "".concat(o, "%"), Yc(e) && ["mouseenter", "mouseleave"].includes(e.type) && i("mouseenter" === e.type)
              }
          }
      },
      timeUpdate: function(e) {
          var t = !Xc(this.elements.display.duration) && this.config.invertTime;
          fh.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || fh.updateProgress.call(this, e)
      },
      durationUpdate: function() {
          if (this.supported.ui && (this.config.invertTime || !this.currentTime)) {
              if (this.duration >= Math.pow(2, 32)) return mu(this.elements.display.currentTime, !0), void mu(this.elements.progress, !0);
              Xc(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
              var e = Xc(this.elements.display.duration);
              !e && this.config.displayDuration && this.paused && fh.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && fh.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), fh.updateSeekTooltip.call(this)
          }
      },
      toggleMenuButton: function(e, t) {
          mu(this.elements.settings.buttons[e], !t)
      },
      updateSetting: function(e, t, n) {
          var i = this.elements.settings.panels[e],
              o = null,
              r = t;
          if ("captions" === e) o = this.currentTrack;
          else {
              if (o = Zc(n) ? this[e] : n, Zc(o) && (o = this.config[e].default), !Zc(this.options[e]) && !this.options[e].includes(o)) return void this.debug.warn("Unsupported value of '".concat(o, "' for ").concat(e));
              if (!this.config[e].options.includes(o)) return void this.debug.warn("Disabled value of '".concat(o, "' for ").concat(e))
          }
          if (Xc(r) || (r = i && i.querySelector('[role="menu"]')), Xc(r)) {
              this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML = fh.getLabel.call(this, e, o);
              var s = r && r.querySelector('[value="'.concat(o, '"]'));
              Xc(s) && (s.checked = !0)
          }
      },
      getLabel: function(e, t) {
          switch (e) {
              case "speed":
                  return 1 === t ? ih("normal", this.config) : "".concat(t, "&times;");
              case "quality":
                  if (qc(t)) {
                      var n = ih("qualityLabel.".concat(t), this.config);
                      return n.length ? n : "".concat(t, "p")
                  }
                  return eh(t);
              case "captions":
                  return mh.getLabel.call(this);
              default:
                  return null
          }
      },
      setQualityMenu: function(e) {
          var t = this;
          if (Xc(this.elements.settings.panels.quality)) {
              var n = this.elements.settings.panels.quality.querySelector('[role="menu"]');
              Wc(e) && (this.options.quality = Ru(e).filter(function(e) {
                  return t.config.quality.options.includes(e)
              }));
              var i = !Zc(this.options.quality) && this.options.quality.length > 1;
              if (fh.toggleMenuButton.call(this, "quality", i), fu(n), fh.checkMenu.call(this), i) {
                  var o = function(e) {
                      var n = ih("qualityBadge.".concat(e), t.config);
                      return n.length ? fh.createBadge.call(t, n) : null
                  };
                  this.options.quality.sort(function(e, n) {
                      var i = t.config.quality.options;
                      return i.indexOf(e) > i.indexOf(n) ? 1 : -1
                  }).forEach(function(e) {
                      fh.createMenuItem.call(t, {
                          value: e,
                          list: n,
                          type: "quality",
                          title: fh.getLabel.call(t, "quality", e),
                          badge: o(e)
                      })
                  }), fh.updateSetting.call(this, "quality", n)
              }
          }
      },
      setCaptionsMenu: function() {
          var e = this;
          if (Xc(this.elements.settings.panels.captions)) {
              var t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
                  n = mh.getTracks.call(this),
                  i = Boolean(n.length);
              if (fh.toggleMenuButton.call(this, "captions", i), fu(t), fh.checkMenu.call(this), i) {
                  var o = n.map(function(n, i) {
                      return {
                          value: i,
                          checked: e.captions.toggled && e.currentTrack === i,
                          title: mh.getLabel.call(e, n),
                          badge: n.language && fh.createBadge.call(e, n.language.toUpperCase()),
                          list: t,
                          type: "language"
                      }
                  });
                  o.unshift({
                      value: -1,
                      checked: !this.captions.toggled,
                      title: ih("disabled", this.config),
                      list: t,
                      type: "language"
                  }), o.forEach(fh.createMenuItem.bind(this)), fh.updateSetting.call(this, "captions", t)
              }
          }
      },
      setSpeedMenu: function() {
          var e = this;
          if (Xc(this.elements.settings.panels.speed)) {
              var t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
              this.options.speed = this.options.speed.filter(function(t) {
                  return t >= e.minimumSpeed && t <= e.maximumSpeed
              });
              var n = !Zc(this.options.speed) && this.options.speed.length > 1;
              fh.toggleMenuButton.call(this, "speed", n), fu(t), fh.checkMenu.call(this), n && (this.options.speed.forEach(function(n) {
                  fh.createMenuItem.call(e, {
                      value: n,
                      list: t,
                      type: "speed",
                      title: fh.getLabel.call(e, "speed", n)
                  })
              }), fh.updateSetting.call(this, "speed", t))
          }
      },
      checkMenu: function() {
          var e = this.elements.settings.buttons,
              t = !Zc(e) && Object.values(e).some(function(e) {
                  return !e.hidden
              });
          mu(this.elements.settings.menu, !t)
      },
      focusFirstMenuItem: function(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          if (!this.elements.settings.popup.hidden) {
              var n = e;
              Xc(n) || (n = Object.values(this.elements.settings.panels).find(function(e) {
                  return !e.hidden
              }));
              var i = n.querySelector('[role^="menuitem"]');
              Su.call(this, i, t)
          }
      },
      toggleMenu: function(e) {
          var t = this.elements.settings.popup,
              n = this.elements.buttons.settings;
          if (Xc(t) && Xc(n)) {
              var i = t.hidden,
                  o = i;
              if (Uc(e)) o = e;
              else if (Qc(e) && 27 === e.which) o = !1;
              else if (Yc(e)) {
                  var r = Bc(e.composedPath) ? e.composedPath()[0] : e.target,
                      s = t.contains(r);
                  if (s || !s && e.target !== n && o) return
              }
              n.setAttribute("aria-expanded", o), mu(t, !o), vu(this.elements.container, this.config.classNames.menu.open, o), o && Qc(e) ? fh.focusFirstMenuItem.call(this, null, !0) : o || i || Su.call(this, n, Qc(e))
          }
      },
      getMenuSize: function(e) {
          var t = e.cloneNode(!0);
          t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
          var n = t.scrollWidth,
              i = t.scrollHeight;
          return du(t), {
              width: n,
              height: i
          }
      },
      showMenuPanel: function() {
          var e = this,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
              n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              i = this.elements.container.querySelector("#plyr-settings-".concat(this.id, "-").concat(t));
          if (Xc(i)) {
              var o = i.parentNode,
                  r = Array.from(o.children).find(function(e) {
                      return !e.hidden
                  });
              if (Cu.transitions && !Cu.reducedMotion) {
                  o.style.width = "".concat(r.scrollWidth, "px"), o.style.height = "".concat(r.scrollHeight, "px");
                  var s = fh.getMenuSize.call(this, i);
                  Pu.call(this, o, Jc, function t(n) {
                      n.target === o && ["width", "height"].includes(n.propertyName) && (o.style.width = "", o.style.height = "", Lu.call(e, o, Jc, t))
                  }), o.style.width = "".concat(s.width, "px"), o.style.height = "".concat(s.height, "px")
              }
              mu(r, !0), mu(i, !1), fh.focusFirstMenuItem.call(this, i, n)
          }
      },
      setDownloadUrl: function() {
          var e = this.elements.buttons.download;
          Xc(e) && e.setAttribute("href", this.download)
      },
      create: function(e) {
          var t = this,
              n = fh.bindMenuItemShortcuts,
              i = fh.createButton,
              o = fh.createProgress,
              r = fh.createRange,
              s = fh.createTime,
              a = fh.setQualityMenu,
              l = fh.setSpeedMenu,
              c = fh.showMenuPanel;
          this.elements.controls = null, this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
          var u = uu("div", gu(this.config.selectors.controls.wrapper));
          this.elements.controls = u;
          var h = {
              class: "plyr__controls__item"
          };
          return Ru(this.config.controls).forEach(function(a) {
              if ("restart" === a && u.appendChild(i.call(t, "restart", h)), "rewind" === a && u.appendChild(i.call(t, "rewind", h)), "play" === a && u.appendChild(i.call(t, "play", h)), "fast-forward" === a && u.appendChild(i.call(t, "fast-forward", h)), "progress" === a) {
                  var l = uu("div", {
                          class: "".concat(h.class, " plyr__progress__container")
                      }),
                      d = uu("div", gu(t.config.selectors.progress));
                  if (d.appendChild(r.call(t, "seek", {
                          id: "plyr-seek-".concat(e.id)
                      })), d.appendChild(o.call(t, "buffer")), t.config.tooltips.seek) {
                      var f = uu("span", {
                          class: t.config.classNames.tooltip
                      }, "00:00");
                      d.appendChild(f), t.elements.display.seekTooltip = f
                  }
                  t.elements.progress = d, l.appendChild(t.elements.progress), u.appendChild(l)
              }
              if ("current-time" === a && u.appendChild(s.call(t, "currentTime", h)), "duration" === a && u.appendChild(s.call(t, "duration", h)), "mute" === a || "volume" === a) {
                  var p = t.elements.volume;
                  if (Xc(p) && u.contains(p) || (p = uu("div", au({}, h, {
                          class: "".concat(h.class, " plyr__volume").trim()
                      })), t.elements.volume = p, u.appendChild(p)), "mute" === a && p.appendChild(i.call(t, "mute")), "volume" === a && !tu.isIos) {
                      var g = {
                          max: 1,
                          step: .05,
                          value: t.config.volume
                      };
                      p.appendChild(r.call(t, "volume", au(g, {
                          id: "plyr-volume-".concat(e.id)
                      })))
                  }
              }
              if ("captions" === a && u.appendChild(i.call(t, "captions", h)), "settings" === a && !Zc(t.config.settings)) {
                  var m = uu("div", au({}, h, {
                      class: "".concat(h.class, " plyr__menu").trim(),
                      hidden: ""
                  }));
                  m.appendChild(i.call(t, "settings", {
                      "aria-haspopup": !0,
                      "aria-controls": "plyr-settings-".concat(e.id),
                      "aria-expanded": !1
                  }));
                  var v = uu("div", {
                          class: "plyr__menu__container",
                          id: "plyr-settings-".concat(e.id),
                          hidden: ""
                      }),
                      y = uu("div"),
                      b = uu("div", {
                          id: "plyr-settings-".concat(e.id, "-home")
                      }),
                      w = uu("div", {
                          role: "menu"
                      });
                  b.appendChild(w), y.appendChild(b), t.elements.settings.panels.home = b, t.config.settings.forEach(function(i) {
                      var o = uu("button", au(gu(t.config.selectors.buttons.settings), {
                          type: "button",
                          class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--forward"),
                          role: "menuitem",
                          "aria-haspopup": !0,
                          hidden: ""
                      }));
                      n.call(t, o, i), Pu.call(t, o, "click", function() {
                          c.call(t, i, !1)
                      });
                      var r = uu("span", null, ih(i, t.config)),
                          s = uu("span", {
                              class: t.config.classNames.menu.value
                          });
                      s.innerHTML = e[i], r.appendChild(s), o.appendChild(r), w.appendChild(o);
                      var a = uu("div", {
                              id: "plyr-settings-".concat(e.id, "-").concat(i),
                              hidden: ""
                          }),
                          l = uu("button", {
                              type: "button",
                              class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--back")
                          });
                      l.appendChild(uu("span", {
                          "aria-hidden": !0
                      }, ih(i, t.config))), l.appendChild(uu("span", {
                          class: t.config.classNames.hidden
                      }, ih("menuBack", t.config))), Pu.call(t, a, "keydown", function(e) {
                          37 === e.which && (e.preventDefault(), e.stopPropagation(), c.call(t, "home", !0))
                      }, !1), Pu.call(t, l, "click", function() {
                          c.call(t, "home", !1)
                      }), a.appendChild(l), a.appendChild(uu("div", {
                          role: "menu"
                      })), y.appendChild(a), t.elements.settings.buttons[i] = o, t.elements.settings.panels[i] = a
                  }), v.appendChild(y), m.appendChild(v), u.appendChild(m), t.elements.settings.popup = v, t.elements.settings.menu = m
              }
              if ("pip" === a && Cu.pip && u.appendChild(i.call(t, "pip", h)), "airplay" === a && Cu.airplay && u.appendChild(i.call(t, "airplay", h)), "download" === a) {
                  var x = au({}, h, {
                      element: "a",
                      href: t.download,
                      target: "_blank"
                  });
                  t.isHTML5 && (x.download = "");
                  var S = t.config.urls.download;
                  !Kc(S) && t.isEmbed && au(x, {
                      icon: "logo-".concat(t.provider),
                      label: t.provider
                  }), u.appendChild(i.call(t, "download", x))
              }
              "fullscreen" === a && u.appendChild(i.call(t, "fullscreen", h))
          }), this.isHTML5 && a.call(this, _u.getQualityOptions.call(this)), l.call(this), u
      },
      inject: function() {
          var e = this;
          if (this.config.loadSprite) {
              var t = fh.getIconUrl.call(this);
              t.cors && sh(t.url, "sprite-plyr")
          }
          this.id = Math.floor(1e4 * Math.random());
          var n = null;
          this.elements.controls = null;
          var i = {
                  id: this.id,
                  seektime: this.config.seekTime,
                  title: this.config.title
              },
              o = !0;
          Bc(this.config.controls) && (this.config.controls = this.config.controls.call(this, i)), this.config.controls || (this.config.controls = []), Xc(this.config.controls) || Hc(this.config.controls) ? n = this.config.controls : (n = fh.create.call(this, {
              id: this.id,
              seektime: this.config.seekTime,
              speed: this.speed,
              quality: this.quality,
              captions: mh.getLabel.call(this)
          }), o = !1);
          var r, s = function(e) {
              var t = e;
              return Object.entries(i).forEach(function(e) {
                  var n = Ts(e, 2),
                      i = n[0],
                      o = n[1];
                  t = Ju(t, "{".concat(i, "}"), o)
              }), t
          };
          if (o && (Hc(this.config.controls) ? n = s(n) : Xc(n) && (n.innerHTML = s(n.innerHTML))), Hc(this.config.selectors.controls.container) && (r = document.querySelector(this.config.selectors.controls.container)), Xc(r) || (r = this.elements.container), r[Xc(n) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", n), Xc(this.elements.controls) || fh.findElements.call(this), !Zc(this.elements.buttons)) {
              var a = function(t) {
                  var n = e.config.classNames.controlPressed;
                  Object.defineProperty(t, "pressed", {
                      enumerable: !0,
                      get: function() {
                          return yu(t, n)
                      },
                      set: function() {
                          var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                          vu(t, n, e)
                      }
                  })
              };
              Object.values(this.elements.buttons).filter(Boolean).forEach(function(e) {
                  Wc(e) || Vc(e) ? Array.from(e).filter(Boolean).forEach(a) : a(e)
              })
          }
          if (tu.isEdge && eu(r), this.config.tooltips.controls) {
              var l = this.config,
                  c = l.classNames,
                  u = l.selectors,
                  h = "".concat(u.controls.wrapper, " ").concat(u.labels, " .").concat(c.hidden),
                  d = wu.call(this, h);
              Array.from(d).forEach(function(t) {
                  vu(t, e.config.classNames.hidden, !1), vu(t, e.config.classNames.tooltip, !0)
              })
          }
      }
  };

  function ph(e) {
      var t = e;
      if (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) {
          var n = document.createElement("a");
          n.href = t, t = n.href
      }
      try {
          return new URL(t)
      } catch (e) {
          return null
      }
  }

  function gh(e) {
      var t = new URLSearchParams;
      return Fc(e) && Object.entries(e).forEach(function(e) {
          var n = Ts(e, 2),
              i = n[0],
              o = n[1];
          t.set(i, o)
      }), t
  }
  var mh = {
          setup: function() {
              if (this.supported.ui)
                  if (!this.isVideo || this.isYouTube || this.isHTML5 && !Cu.textTracks) Wc(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && fh.setCaptionsMenu.call(this);
                  else {
                      if (Xc(this.elements.captions) || (this.elements.captions = uu("div", gu(this.config.selectors.captions)), function(e, t) {
                              Xc(e) && Xc(t) && t.parentNode.insertBefore(e, t.nextSibling)
                          }(this.elements.captions, this.elements.wrapper)), tu.isIE && window.URL) {
                          var e = this.media.querySelectorAll("track");
                          Array.from(e).forEach(function(e) {
                              var t = e.getAttribute("src"),
                                  n = ph(t);
                              null !== n && n.hostname !== window.location.href.hostname && ["http:", "https:"].includes(n.protocol) && rh(t, "blob").then(function(t) {
                                  e.setAttribute("src", window.URL.createObjectURL(t))
                              }).catch(function() {
                                  du(e)
                              })
                          })
                      }
                      var t = Ru((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(function(e) {
                              return e.split("-")[0]
                          })),
                          n = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
                      "auto" === n && (n = Ts(t, 1)[0]);
                      var i = this.storage.get("captions");
                      if (Uc(i) || (i = this.config.captions.active), Object.assign(this.captions, {
                              toggled: !1,
                              active: i,
                              language: n,
                              languages: t
                          }), this.isHTML5) {
                          var o = this.config.captions.update ? "addtrack removetrack" : "removetrack";
                          Pu.call(this, this.media.textTracks, o, mh.update.bind(this))
                      }
                      setTimeout(mh.update.bind(this), 0)
                  }
          },
          update: function() {
              var e = this,
                  t = mh.getTracks.call(this, !0),
                  n = this.captions,
                  i = n.active,
                  o = n.language,
                  r = n.meta,
                  s = n.currentTrackNode,
                  a = Boolean(t.find(function(e) {
                      return e.language === o
                  }));
              this.isHTML5 && this.isVideo && t.filter(function(e) {
                  return !r.get(e)
              }).forEach(function(t) {
                  e.debug.log("Track added", t), r.set(t, {
                      default: "showing" === t.mode
                  }), t.mode = "hidden", Pu.call(e, t, "cuechange", function() {
                      return mh.updateCues.call(e)
                  })
              }), (a && this.language !== o || !t.includes(s)) && (mh.setLanguage.call(this, o), mh.toggle.call(this, i && a)), vu(this.elements.container, this.config.classNames.captions.enabled, !Zc(t)), (this.config.controls || []).includes("settings") && this.config.settings.includes("captions") && fh.setCaptionsMenu.call(this)
          },
          toggle: function(e) {
              var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
              if (this.supported.ui) {
                  var n = this.captions.toggled,
                      i = this.config.classNames.captions.active,
                      o = zc(e) ? !n : e;
                  if (o !== n) {
                      if (t || (this.captions.active = o, this.storage.set({
                              captions: o
                          })), !this.language && o && !t) {
                          var r = mh.getTracks.call(this),
                              s = mh.findTrack.call(this, [this.captions.language].concat(Cs(this.captions.languages)), !0);
                          return this.captions.language = s.language, void mh.set.call(this, r.indexOf(s))
                      }
                      this.elements.buttons.captions && (this.elements.buttons.captions.pressed = o), vu(this.elements.container, i, o), this.captions.toggled = o, fh.updateSetting.call(this, "captions"), ju.call(this, this.media, o ? "captionsenabled" : "captionsdisabled")
                  }
              }
          },
          set: function(e) {
              var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                  n = mh.getTracks.call(this);
              if (-1 !== e)
                  if (qc(e))
                      if (e in n) {
                          if (this.captions.currentTrack !== e) {
                              this.captions.currentTrack = e;
                              var i = n[e],
                                  o = (i || {}).language;
                              this.captions.currentTrackNode = i, fh.updateSetting.call(this, "captions"), t || (this.captions.language = o, this.storage.set({
                                  language: o
                              })), this.isVimeo && this.embed.enableTextTrack(o), ju.call(this, this.media, "languagechange")
                          }
                          mh.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && mh.updateCues.call(this)
                      } else this.debug.warn("Track not found", e);
              else this.debug.warn("Invalid caption argument", e);
              else mh.toggle.call(this, !1, t)
          },
          setLanguage: function(e) {
              var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
              if (Hc(e)) {
                  var n = e.toLowerCase();
                  this.captions.language = n;
                  var i = mh.getTracks.call(this),
                      o = mh.findTrack.call(this, [n]);
                  mh.set.call(this, i.indexOf(o), t)
              } else this.debug.warn("Invalid language argument", e)
          },
          getTracks: function() {
              var e = this,
                  t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              return Array.from((this.media || {}).textTracks || []).filter(function(n) {
                  return !e.isHTML5 || t || e.captions.meta.has(n)
              }).filter(function(e) {
                  return ["captions", "subtitles"].includes(e.kind)
              })
          },
          findTrack: function(e) {
              var t, n = this,
                  i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                  o = mh.getTracks.call(this),
                  r = function(e) {
                      return Number((n.captions.meta.get(e) || {}).default)
                  },
                  s = Array.from(o).sort(function(e, t) {
                      return r(t) - r(e)
                  });
              return e.every(function(e) {
                  return !(t = s.find(function(t) {
                      return t.language === e
                  }))
              }), t || (i ? s[0] : void 0)
          },
          getCurrentTrack: function() {
              return mh.getTracks.call(this)[this.currentTrack]
          },
          getLabel: function(e) {
              var t = e;
              return !Gc(t) && Cu.textTracks && this.captions.toggled && (t = mh.getCurrentTrack.call(this)), Gc(t) ? Zc(t.label) ? Zc(t.language) ? ih("enabled", this.config) : e.language.toUpperCase() : t.label : ih("disabled", this.config)
          },
          updateCues: function(e) {
              if (this.supported.ui)
                  if (Xc(this.elements.captions))
                      if (zc(e) || Array.isArray(e)) {
                          var t = e;
                          if (!t) {
                              var n = mh.getCurrentTrack.call(this);
                              t = Array.from((n || {}).activeCues || []).map(function(e) {
                                  return e.getCueAsHTML()
                              }).map(th)
                          }
                          var i = t.map(function(e) {
                              return e.trim()
                          }).join("\n");
                          if (i !== this.elements.captions.innerHTML) {
                              fu(this.elements.captions);
                              var o = uu("span", gu(this.config.selectors.caption));
                              o.innerHTML = i, this.elements.captions.appendChild(o), ju.call(this, this.media, "cuechange")
                          }
                      } else this.debug.warn("updateCues: Invalid input", e);
              else this.debug.warn("No captions element to render to")
          }
      },
      vh = {
          enabled: !0,
          title: "",
          debug: !1,
          autoplay: !1,
          autopause: !0,
          playsinline: !0,
          seekTime: 10,
          volume: 1,
          muted: !1,
          duration: null,
          displayDuration: !0,
          invertTime: !0,
          toggleInvert: !0,
          ratio: null,
          clickToPlay: !0,
          hideControls: !0,
          resetOnEnd: !1,
          disableContextMenu: !0,
          loadSprite: !0,
          iconPrefix: "plyr",
          iconUrl: "https://cdn.plyr.io/3.5.10/plyr.svg",
          blankVideo: "https://cdn.plyr.io/static/blank.mp4",
          quality: {
              default: 576,
              options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
              forced: !1,
              onChange: null
          },
          loop: {
              active: !1
          },
          speed: {
              selected: 1,
              options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4]
          },
          keyboard: {
              focused: !0,
              global: !1
          },
          tooltips: {
              controls: !1,
              seek: !0
          },
          captions: {
              active: !1,
              language: "auto",
              update: !1
          },
          fullscreen: {
              enabled: !0,
              fallback: !0,
              iosNative: !1
          },
          storage: {
              enabled: !0,
              key: "plyr"
          },
          controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
          settings: ["captions", "quality", "speed"],
          i18n: {
              restart: "Restart",
              rewind: "Rewind {seektime}s",
              play: "Play",
              pause: "Pause",
              fastForward: "Forward {seektime}s",
              seek: "Seek",
              seekLabel: "{currentTime} of {duration}",
              played: "Played",
              buffered: "Buffered",
              currentTime: "Current time",
              duration: "Duration",
              volume: "Volume",
              mute: "Mute",
              unmute: "Unmute",
              enableCaptions: "Enable captions",
              disableCaptions: "Disable captions",
              download: "Download",
              enterFullscreen: "Enter fullscreen",
              exitFullscreen: "Exit fullscreen",
              frameTitle: "Player for {title}",
              captions: "Captions",
              settings: "Settings",
              pip: "PIP",
              menuBack: "Go back to previous menu",
              speed: "Speed",
              normal: "Normal",
              quality: "Quality",
              loop: "Loop",
              start: "Start",
              end: "End",
              all: "All",
              reset: "Reset",
              disabled: "Disabled",
              enabled: "Enabled",
              advertisement: "Ad",
              qualityBadge: {
                  2160: "4K",
                  1440: "HD",
                  1080: "HD",
                  720: "HD",
                  576: "SD",
                  480: "SD"
              }
          },
          urls: {
              download: null,
              vimeo: {
                  sdk: "https://player.vimeo.com/api/player.js",
                  iframe: "https://player.vimeo.com/video/{0}?{1}",
                  api: "https://vimeo.com/api/v2/video/{0}.json"
              },
              youtube: {
                  sdk: "https://www.youtube.com/iframe_api",
                  api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
              },
              googleIMA: {
                  sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
              }
          },
          listeners: {
              seek: null,
              play: null,
              pause: null,
              restart: null,
              rewind: null,
              fastForward: null,
              mute: null,
              volume: null,
              captions: null,
              download: null,
              fullscreen: null,
              pip: null,
              airplay: null,
              speed: null,
              quality: null,
              loop: null,
              language: null
          },
          events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
          selectors: {
              editable: "input, textarea, select, [contenteditable]",
              container: ".plyr",
              controls: {
                  container: null,
                  wrapper: ".plyr__controls"
              },
              labels: "[data-plyr]",
              buttons: {
                  play: '[data-plyr="play"]',
                  pause: '[data-plyr="pause"]',
                  restart: '[data-plyr="restart"]',
                  rewind: '[data-plyr="rewind"]',
                  fastForward: '[data-plyr="fast-forward"]',
                  mute: '[data-plyr="mute"]',
                  captions: '[data-plyr="captions"]',
                  download: '[data-plyr="download"]',
                  fullscreen: '[data-plyr="fullscreen"]',
                  pip: '[data-plyr="pip"]',
                  airplay: '[data-plyr="airplay"]',
                  settings: '[data-plyr="settings"]',
                  loop: '[data-plyr="loop"]'
              },
              inputs: {
                  seek: '[data-plyr="seek"]',
                  volume: '[data-plyr="volume"]',
                  speed: '[data-plyr="speed"]',
                  language: '[data-plyr="language"]',
                  quality: '[data-plyr="quality"]'
              },
              display: {
                  currentTime: ".plyr__time--current",
                  duration: ".plyr__time--duration",
                  buffer: ".plyr__progress__buffer",
                  loop: ".plyr__progress__loop",
                  volume: ".plyr__volume--display"
              },
              progress: ".plyr__progress",
              captions: ".plyr__captions",
              caption: ".plyr__caption"
          },
          classNames: {
              type: "plyr--{0}",
              provider: "plyr--{0}",
              video: "plyr__video-wrapper",
              embed: "plyr__video-embed",
              videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
              embedContainer: "plyr__video-embed__container",
              poster: "plyr__poster",
              posterEnabled: "plyr__poster-enabled",
              ads: "plyr__ads",
              control: "plyr__control",
              controlPressed: "plyr__control--pressed",
              playing: "plyr--playing",
              paused: "plyr--paused",
              stopped: "plyr--stopped",
              loading: "plyr--loading",
              hover: "plyr--hover",
              tooltip: "plyr__tooltip",
              cues: "plyr__cues",
              hidden: "plyr__sr-only",
              hideControls: "plyr--hide-controls",
              isIos: "plyr--is-ios",
              isTouch: "plyr--is-touch",
              uiSupported: "plyr--full-ui",
              noTransition: "plyr--no-transition",
              display: {
                  time: "plyr__time"
              },
              menu: {
                  value: "plyr__menu__value",
                  badge: "plyr__badge",
                  open: "plyr--menu-open"
              },
              captions: {
                  enabled: "plyr--captions-enabled",
                  active: "plyr--captions-active"
              },
              fullscreen: {
                  enabled: "plyr--fullscreen-enabled",
                  fallback: "plyr--fullscreen-fallback"
              },
              pip: {
                  supported: "plyr--pip-supported",
                  active: "plyr--pip-active"
              },
              airplay: {
                  supported: "plyr--airplay-supported",
                  active: "plyr--airplay-active"
              },
              tabFocus: "plyr__tab-focus",
              previewThumbnails: {
                  thumbContainer: "plyr__preview-thumb",
                  thumbContainerShown: "plyr__preview-thumb--is-shown",
                  imageContainer: "plyr__preview-thumb__image-container",
                  timeContainer: "plyr__preview-thumb__time-container",
                  scrubbingContainer: "plyr__preview-scrubbing",
                  scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
              }
          },
          attributes: {
              embed: {
                  provider: "data-plyr-provider",
                  id: "data-plyr-embed-id"
              }
          },
          ads: {
              enabled: !1,
              publisherId: "",
              tagUrl: ""
          },
          previewThumbnails: {
              enabled: !1,
              src: ""
          },
          vimeo: {
              byline: !1,
              portrait: !1,
              title: !1,
              speed: !0,
              transparent: !1,
              sidedock: !1,
              controls: !1,
              referrerPolicy: null
          },
          youtube: {
              noCookie: !1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              modestbranding: 1
          }
      },
      yh = "picture-in-picture",
      bh = {
          html5: "html5",
          youtube: "youtube",
          vimeo: "vimeo"
      },
      wh = "video",
      xh = function() {},
      Sh = function() {
          function e() {
              var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              ys(this, e), this.enabled = window.console && t, this.enabled && this.log("Debugging enabled")
          }
          return ws(e, [{
              key: "log",
              get: function() {
                  return this.enabled ? Function.prototype.bind.call(console.log, console) : xh
              }
          }, {
              key: "warn",
              get: function() {
                  return this.enabled ? Function.prototype.bind.call(console.warn, console) : xh
              }
          }, {
              key: "error",
              get: function() {
                  return this.enabled ? Function.prototype.bind.call(console.error, console) : xh
              }
          }]), e
      }(),
      kh = function() {
          function e(t) {
              var n = this;
              ys(this, e), this.player = t, this.prefix = e.prefix, this.property = e.property, this.scrollPosition = {
                  x: 0,
                  y: 0
              }, this.forceFallback = "force" === t.config.fullscreen.fallback, Pu.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), function() {
                  n.onChange()
              }), Pu.call(this.player, this.player.elements.container, "dblclick", function(e) {
                  Xc(n.player.elements.controls) && n.player.elements.controls.contains(e.target) || n.toggle()
              }), Pu.call(this, this.player.elements.container, "keydown", function(e) {
                  return n.trapFocus(e)
              }), this.update()
          }
          return ws(e, [{
              key: "onChange",
              value: function() {
                  if (this.enabled) {
                      var e = this.player.elements.buttons.fullscreen;
                      Xc(e) && (e.pressed = this.active), ju.call(this.player, this.target, this.active ? "enterfullscreen" : "exitfullscreen", !0)
                  }
              }
          }, {
              key: "toggleFallback",
              value: function() {
                  var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                  if (e ? this.scrollPosition = {
                          x: window.scrollX || 0,
                          y: window.scrollY || 0
                      } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", vu(this.target, this.player.config.classNames.fullscreen.fallback, e), tu.isIos) {
                      var t = document.head.querySelector('meta[name="viewport"]'),
                          n = "viewport-fit=cover";
                      t || (t = document.createElement("meta")).setAttribute("name", "viewport");
                      var i = Hc(t.content) && t.content.includes(n);
                      e ? (this.cleanupViewport = !i, i || (t.content += ",".concat(n))) : this.cleanupViewport && (t.content = t.content.split(",").filter(function(e) {
                          return e.trim() !== n
                      }).join(","))
                  }
                  this.onChange()
              }
          }, {
              key: "trapFocus",
              value: function(e) {
                  if (!tu.isIos && this.active && "Tab" === e.key && 9 === e.keyCode) {
                      var t = document.activeElement,
                          n = wu.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),
                          i = Ts(n, 1)[0],
                          o = n[n.length - 1];
                      t !== o || e.shiftKey ? t === i && e.shiftKey && (o.focus(), e.preventDefault()) : (i.focus(), e.preventDefault())
                  }
              }
          }, {
              key: "update",
              value: function() {
                  var t;
                  this.enabled ? (t = this.forceFallback ? "Fallback (forced)" : e.native ? "Native" : "Fallback", this.player.debug.log("".concat(t, " fullscreen enabled"))) : this.player.debug.log("Fullscreen not supported and fallback disabled"), vu(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled)
              }
          }, {
              key: "enter",
              value: function() {
                  this.enabled && (tu.isIos && this.player.config.fullscreen.iosNative ? this.target.webkitEnterFullscreen() : !e.native || this.forceFallback ? this.toggleFallback(!0) : this.prefix ? Zc(this.prefix) || this.target["".concat(this.prefix, "Request").concat(this.property)]() : this.target.requestFullscreen({
                      navigationUI: "hide"
                  }))
              }
          }, {
              key: "exit",
              value: function() {
                  if (this.enabled)
                      if (tu.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), this.player.play();
                      else if (!e.native || this.forceFallback) this.toggleFallback(!1);
                  else if (this.prefix) {
                      if (!Zc(this.prefix)) {
                          var t = "moz" === this.prefix ? "Cancel" : "Exit";
                          document["".concat(this.prefix).concat(t).concat(this.property)]()
                      }
                  } else(document.cancelFullScreen || document.exitFullscreen).call(document)
              }
          }, {
              key: "toggle",
              value: function() {
                  this.active ? this.exit() : this.enter()
              }
          }, {
              key: "usingNative",
              get: function() {
                  return e.native && !this.forceFallback
              }
          }, {
              key: "enabled",
              get: function() {
                  return (e.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo
              }
          }, {
              key: "active",
              get: function() {
                  return !!this.enabled && (!e.native || this.forceFallback ? yu(this.target, this.player.config.classNames.fullscreen.fallback) : (this.prefix ? document["".concat(this.prefix).concat(this.property, "Element")] : document.fullscreenElement) === this.target)
              }
          }, {
              key: "target",
              get: function() {
                  return tu.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.container
              }
          }], [{
              key: "native",
              get: function() {
                  return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
              }
          }, {
              key: "prefix",
              get: function() {
                  if (Bc(document.exitFullscreen)) return "";
                  var e = "";
                  return ["webkit", "moz", "ms"].some(function(t) {
                      return !(!Bc(document["".concat(t, "ExitFullscreen")]) && !Bc(document["".concat(t, "CancelFullScreen")]) || (e = t, 0))
                  }), e
              }
          }, {
              key: "property",
              get: function() {
                  return "moz" === this.prefix ? "FullScreen" : "Fullscreen"
              }
          }]), e
      }(),
      Th = Math.sign || function(e) {
          return 0 == (e = +e) || e != e ? e : e < 0 ? -1 : 1
      };

  function Ch(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
      return new Promise(function(n, i) {
          var o = new Image,
              r = function() {
                  delete o.onload, delete o.onerror, (o.naturalWidth >= t ? n : i)(o)
              };
          Object.assign(o, {
              onload: r,
              onerror: r,
              src: e
          })
      })
  }
  Ie({
      target: "Math",
      stat: !0
  }, {
      sign: Th
  });
  var Eh = {
          addStyleHook: function() {
              vu(this.elements.container, this.config.selectors.container.replace(".", ""), !0), vu(this.elements.container, this.config.classNames.uiSupported, this.supported.ui)
          },
          toggleNativeControls: function() {
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls")
          },
          build: function() {
              var e = this;
              if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type)), void Eh.toggleNativeControls.call(this, !0);
              Xc(this.elements.controls) || (fh.inject.call(this), this.listeners.controls()), Eh.toggleNativeControls.call(this), this.isHTML5 && mh.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, fh.updateVolume.call(this), fh.timeUpdate.call(this), Eh.checkPlaying.call(this), vu(this.elements.container, this.config.classNames.pip.supported, Cu.pip && this.isHTML5 && this.isVideo), vu(this.elements.container, this.config.classNames.airplay.supported, Cu.airplay && this.isHTML5), vu(this.elements.container, this.config.classNames.isIos, tu.isIos), vu(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(function() {
                  ju.call(e, e.media, "ready")
              }, 0), Eh.setTitle.call(this), this.poster && Eh.setPoster.call(this, this.poster, !1).catch(function() {}), this.config.duration && fh.durationUpdate.call(this)
          },
          setTitle: function() {
              var e = ih("play", this.config);
              if (Hc(this.config.title) && !Zc(this.config.title) && (e += ", ".concat(this.config.title)), Array.from(this.elements.buttons.play || []).forEach(function(t) {
                      t.setAttribute("aria-label", e)
                  }), this.isEmbed) {
                  var t = xu.call(this, "iframe");
                  if (!Xc(t)) return;
                  var n = Zc(this.config.title) ? "video" : this.config.title,
                      i = ih("frameTitle", this.config);
                  t.setAttribute("title", i.replace("{title}", n))
              }
          },
          togglePoster: function(e) {
              vu(this.elements.container, this.config.classNames.posterEnabled, e)
          },
          setPoster: function(e) {
              var t = this;
              return (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("poster", e), this.isHTML5 ? Promise.resolve(e) : function() {
                  var e = this;
                  return new Promise(function(t) {
                      return e.ready ? setTimeout(t, 0) : Pu.call(e, e.elements.container, "ready", t)
                  }).then(function() {})
              }.call(this).then(function() {
                  return Ch(e)
              }).catch(function(n) {
                  throw e === t.poster && Eh.togglePoster.call(t, !1), n
              }).then(function() {
                  if (e !== t.poster) throw new Error("setPoster cancelled by later call to setPoster")
              }).then(function() {
                  return Object.assign(t.elements.poster.style, {
                      backgroundImage: "url('".concat(e, "')"),
                      backgroundSize: ""
                  }), Eh.togglePoster.call(t, !0), e
              }))
          },
          checkPlaying: function(e) {
              var t = this;
              vu(this.elements.container, this.config.classNames.playing, this.playing), vu(this.elements.container, this.config.classNames.paused, this.paused), vu(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(function(e) {
                  Object.assign(e, {
                      pressed: t.playing
                  }), e.setAttribute("aria-label", ih(t.playing ? "pause" : "play", t.config))
              }), Yc(e) && "timeupdate" === e.type || Eh.toggleControls.call(this)
          },
          checkLoading: function(e) {
              var t = this;
              this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(function() {
                  vu(t.elements.container, t.config.classNames.loading, t.loading), Eh.toggleControls.call(t)
              }, this.loading ? 250 : 0)
          },
          toggleControls: function(e) {
              var t = this.elements.controls;
              if (t && this.config.hideControls) {
                  var n = this.touch && this.lastSeekTime + 2e3 > Date.now();
                  this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || n))
              }
          }
      },
      Ah = function() {
          function e(t) {
              ys(this, e), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this)
          }
          return ws(e, [{
              key: "handleKey",
              value: function(e) {
                  var t = this.player,
                      n = t.elements,
                      i = e.keyCode ? e.keyCode : e.which,
                      o = "keydown" === e.type,
                      r = o && i === this.lastKey;
                  if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && qc(i))
                      if (o) {
                          var s = document.activeElement;
                          if (Xc(s)) {
                              var a = t.config.selectors.editable;
                              if (s !== n.inputs.seek && bu(s, a)) return;
                              if (32 === e.which && bu(s, 'button, [role^="menuitem"]')) return
                          }
                          switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(i) && (e.preventDefault(), e.stopPropagation()), i) {
                              case 48:
                              case 49:
                              case 50:
                              case 51:
                              case 52:
                              case 53:
                              case 54:
                              case 55:
                              case 56:
                              case 57:
                                  r || (t.currentTime = t.duration / 10 * (i - 48));
                                  break;
                              case 32:
                              case 75:
                                  r || t.togglePlay();
                                  break;
                              case 38:
                                  t.increaseVolume(.1);
                                  break;
                              case 40:
                                  t.decreaseVolume(.1);
                                  break;
                              case 77:
                                  r || (t.muted = !t.muted);
                                  break;
                              case 39:
                                  t.forward();
                                  break;
                              case 37:
                                  t.rewind();
                                  break;
                              case 70:
                                  t.fullscreen.toggle();
                                  break;
                              case 67:
                                  r || t.toggleCaptions();
                                  break;
                              case 76:
                                  t.loop = !t.loop
                          }
                          27 === i && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = i
                      } else this.lastKey = null
              }
          }, {
              key: "toggleMenu",
              value: function(e) {
                  fh.toggleMenu.call(this.player, e)
              }
          }, {
              key: "firstTouch",
              value: function() {
                  var e = this.player,
                      t = e.elements;
                  e.touch = !0, vu(t.container, e.config.classNames.isTouch, !0)
              }
          }, {
              key: "setTabFocus",
              value: function(e) {
                  var t = this.player,
                      n = t.elements;
                  if (clearTimeout(this.focusTimer), "keydown" !== e.type || 9 === e.which) {
                      "keydown" === e.type && (this.lastKeyDown = e.timeStamp);
                      var i, o = e.timeStamp - this.lastKeyDown <= 20;
                      ("focus" !== e.type || o) && (i = t.config.classNames.tabFocus, vu(wu.call(t, ".".concat(i)), i, !1), this.focusTimer = setTimeout(function() {
                          var e = document.activeElement;
                          n.container.contains(e) && vu(document.activeElement, t.config.classNames.tabFocus, !0)
                      }, 10))
                  }
              }
          }, {
              key: "global",
              value: function() {
                  var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                      t = this.player;
                  t.config.keyboard.global && Au.call(t, window, "keydown keyup", this.handleKey, e, !1), Au.call(t, document.body, "click", this.toggleMenu, e), Iu.call(t, document.body, "touchstart", this.firstTouch), Au.call(t, document.body, "keydown focus blur", this.setTabFocus, e, !1, !0)
              }
          }, {
              key: "container",
              value: function() {
                  var e = this.player,
                      t = e.config,
                      n = e.elements,
                      i = e.timers;
                  !t.keyboard.global && t.keyboard.focused && Pu.call(e, n.container, "keydown keyup", this.handleKey, !1), Pu.call(e, n.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", function(t) {
                      var o = n.controls;
                      o && "enterfullscreen" === t.type && (o.pressed = !1, o.hover = !1);
                      var r = 0;
                      ["touchstart", "touchmove", "mousemove"].includes(t.type) && (Eh.toggleControls.call(e, !0), r = e.touch ? 3e3 : 2e3), clearTimeout(i.controls), i.controls = setTimeout(function() {
                          return Eh.toggleControls.call(e, !1)
                      }, r)
                  });
                  var o = function(t) {
                          if (!t) return Nu.call(e);
                          var i = n.container.getBoundingClientRect(),
                              o = i.width,
                              r = i.height;
                          return Nu.call(e, "".concat(o, ":").concat(r))
                      },
                      r = function() {
                          clearTimeout(i.resized), i.resized = setTimeout(o, 50)
                      };
                  Pu.call(e, n.container, "enterfullscreen exitfullscreen", function(t) {
                      var i = e.fullscreen,
                          s = i.target,
                          a = i.usingNative;
                      if (s === n.container && (e.isEmbed || !Zc(e.config.ratio))) {
                          var l = "enterfullscreen" === t.type,
                              c = o(l);
                          c.padding, ! function(t, n, i) {
                              if (e.isVimeo) {
                                  var o = e.elements.wrapper.firstChild,
                                      r = Ts(t, 2)[1],
                                      s = Ts(Ou.call(e), 2),
                                      a = s[0],
                                      l = s[1];
                                  o.style.maxWidth = i ? "".concat(r / l * a, "px") : null, o.style.margin = i ? "0 auto" : null
                              }
                          }(c.ratio, 0, l), a || (l ? Pu.call(e, window, "resize", r) : Lu.call(e, window, "resize", r))
                      }
                  })
              }
          }, {
              key: "media",
              value: function() {
                  var e = this,
                      t = this.player,
                      n = t.elements;
                  if (Pu.call(t, t.media, "timeupdate seeking seeked", function(e) {
                          return fh.timeUpdate.call(t, e)
                      }), Pu.call(t, t.media, "durationchange loadeddata loadedmetadata", function(e) {
                          return fh.durationUpdate.call(t, e)
                      }), Pu.call(t, t.media, "ended", function() {
                          t.isHTML5 && t.isVideo && t.config.resetOnEnd && (t.restart(), t.pause())
                      }), Pu.call(t, t.media, "progress playing seeking seeked", function(e) {
                          return fh.updateProgress.call(t, e)
                      }), Pu.call(t, t.media, "volumechange", function(e) {
                          return fh.updateVolume.call(t, e)
                      }), Pu.call(t, t.media, "playing play pause ended emptied timeupdate", function(e) {
                          return Eh.checkPlaying.call(t, e)
                      }), Pu.call(t, t.media, "waiting canplay seeked playing", function(e) {
                          return Eh.checkLoading.call(t, e)
                      }), t.supported.ui && t.config.clickToPlay && !t.isAudio) {
                      var i = xu.call(t, ".".concat(t.config.classNames.video));
                      if (!Xc(i)) return;
                      Pu.call(t, n.container, "click", function(o) {
                          ([n.container, i].includes(o.target) || i.contains(o.target)) && (t.touch && t.config.hideControls || (t.ended ? (e.proxy(o, t.restart, "restart"), e.proxy(o, t.play, "play")) : e.proxy(o, t.togglePlay, "play")))
                      })
                  }
                  t.supported.ui && t.config.disableContextMenu && Pu.call(t, n.wrapper, "contextmenu", function(e) {
                      e.preventDefault()
                  }, !1), Pu.call(t, t.media, "volumechange", function() {
                      t.storage.set({
                          volume: t.volume,
                          muted: t.muted
                      })
                  }), Pu.call(t, t.media, "ratechange", function() {
                      fh.updateSetting.call(t, "speed"), t.storage.set({
                          speed: t.speed
                      })
                  }), Pu.call(t, t.media, "qualitychange", function(e) {
                      fh.updateSetting.call(t, "quality", null, e.detail.quality)
                  }), Pu.call(t, t.media, "ready qualitychange", function() {
                      fh.setDownloadUrl.call(t)
                  });
                  var o = t.config.events.concat(["keyup", "keydown"]).join(" ");
                  Pu.call(t, t.media, o, function(e) {
                      var i = e.detail,
                          o = void 0 === i ? {} : i;
                      "error" === e.type && (o = t.media.error), ju.call(t, n.container, e.type, !0, o)
                  })
              }
          }, {
              key: "proxy",
              value: function(e, t, n) {
                  var i = this.player,
                      o = i.config.listeners[n],
                      r = !0;
                  Bc(o) && (r = o.call(i, e)), !1 !== r && Bc(t) && t.call(i, e)
              }
          }, {
              key: "bind",
              value: function(e, t, n, i) {
                  var o = this,
                      r = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                      s = this.player,
                      a = s.config.listeners[i],
                      l = Bc(a);
                  Pu.call(s, e, t, function(e) {
                      return o.proxy(e, n, i)
                  }, r && !l)
              }
          }, {
              key: "controls",
              value: function() {
                  var e = this,
                      t = this.player,
                      n = t.elements,
                      i = tu.isIE ? "change" : "input";
                  if (n.buttons.play && Array.from(n.buttons.play).forEach(function(n) {
                          e.bind(n, "click", t.togglePlay, "play")
                      }), this.bind(n.buttons.restart, "click", t.restart, "restart"), this.bind(n.buttons.rewind, "click", t.rewind, "rewind"), this.bind(n.buttons.fastForward, "click", t.forward, "fastForward"), this.bind(n.buttons.mute, "click", function() {
                          t.muted = !t.muted
                      }, "mute"), this.bind(n.buttons.captions, "click", function() {
                          return t.toggleCaptions()
                      }), this.bind(n.buttons.download, "click", function() {
                          ju.call(t, t.media, "download")
                      }, "download"), this.bind(n.buttons.fullscreen, "click", function() {
                          t.fullscreen.toggle()
                      }, "fullscreen"), this.bind(n.buttons.pip, "click", function() {
                          t.pip = "toggle"
                      }, "pip"), this.bind(n.buttons.airplay, "click", t.airplay, "airplay"), this.bind(n.buttons.settings, "click", function(e) {
                          e.stopPropagation(), e.preventDefault(), fh.toggleMenu.call(t, e)
                      }, null, !1), this.bind(n.buttons.settings, "keyup", function(e) {
                          var n = e.which;
                          [13, 32].includes(n) && (13 !== n ? (e.preventDefault(), e.stopPropagation(), fh.toggleMenu.call(t, e)) : fh.focusFirstMenuItem.call(t, null, !0))
                      }, null, !1), this.bind(n.settings.menu, "keydown", function(e) {
                          27 === e.which && fh.toggleMenu.call(t, e)
                      }), this.bind(n.inputs.seek, "mousedown mousemove", function(e) {
                          var t = n.progress.getBoundingClientRect(),
                              i = 100 / t.width * (e.pageX - t.left);
                          e.currentTarget.setAttribute("seek-value", i)
                      }), this.bind(n.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", function(e) {
                          var n = e.currentTarget,
                              i = e.keyCode ? e.keyCode : e.which;
                          if (!Qc(e) || 39 === i || 37 === i) {
                              t.lastSeekTime = Date.now();
                              var o = n.hasAttribute("play-on-seeked"),
                                  r = ["mouseup", "touchend", "keyup"].includes(e.type);
                              o && r ? (n.removeAttribute("play-on-seeked"), t.play()) : !r && t.playing && (n.setAttribute("play-on-seeked", ""), t.pause())
                          }
                      }), tu.isIos) {
                      var o = wu.call(t, 'input[type="range"]');
                      Array.from(o).forEach(function(t) {
                          return e.bind(t, i, function(e) {
                              return eu(e.target)
                          })
                      })
                  }
                  this.bind(n.inputs.seek, i, function(e) {
                      var n = e.currentTarget,
                          i = n.getAttribute("seek-value");
                      Zc(i) && (i = n.value), n.removeAttribute("seek-value"), t.currentTime = i / n.max * t.duration
                  }, "seek"), this.bind(n.progress, "mouseenter mouseleave mousemove", function(e) {
                      return fh.updateSeekTooltip.call(t, e)
                  }), this.bind(n.progress, "mousemove touchmove", function(e) {
                      var n = t.previewThumbnails;
                      n && n.loaded && n.startMove(e)
                  }), this.bind(n.progress, "mouseleave touchend click", function() {
                      var e = t.previewThumbnails;
                      e && e.loaded && e.endMove(!1, !0)
                  }), this.bind(n.progress, "mousedown touchstart", function(e) {
                      var n = t.previewThumbnails;
                      n && n.loaded && n.startScrubbing(e)
                  }), this.bind(n.progress, "mouseup touchend", function(e) {
                      var n = t.previewThumbnails;
                      n && n.loaded && n.endScrubbing(e)
                  }), tu.isWebkit && Array.from(wu.call(t, 'input[type="range"]')).forEach(function(n) {
                      e.bind(n, "input", function(e) {
                          return fh.updateRangeFill.call(t, e.target)
                      })
                  }), t.config.toggleInvert && !Xc(n.display.duration) && this.bind(n.display.currentTime, "click", function() {
                      0 !== t.currentTime && (t.config.invertTime = !t.config.invertTime, fh.timeUpdate.call(t))
                  }), this.bind(n.inputs.volume, i, function(e) {
                      t.volume = e.target.value
                  }, "volume"), this.bind(n.controls, "mouseenter mouseleave", function(e) {
                      n.controls.hover = !t.touch && "mouseenter" === e.type
                  }), this.bind(n.controls, "mousedown mouseup touchstart touchend touchcancel", function(e) {
                      n.controls.pressed = ["mousedown", "touchstart"].includes(e.type)
                  }), this.bind(n.controls, "focusin", function() {
                      var i = t.config,
                          o = t.timers;
                      vu(n.controls, i.classNames.noTransition, !0), Eh.toggleControls.call(t, !0), setTimeout(function() {
                          vu(n.controls, i.classNames.noTransition, !1)
                      }, 0);
                      var r = e.touch ? 3e3 : 4e3;
                      clearTimeout(o.controls), o.controls = setTimeout(function() {
                          return Eh.toggleControls.call(t, !1)
                      }, r)
                  }), this.bind(n.inputs.volume, "wheel", function(e) {
                      var n = e.webkitDirectionInvertedFromDevice,
                          i = Ts([e.deltaX, -e.deltaY].map(function(e) {
                              return n ? -e : e
                          }), 2),
                          o = i[0],
                          r = i[1],
                          s = Math.sign(Math.abs(o) > Math.abs(r) ? o : r);
                      t.increaseVolume(s / 50);
                      var a = t.media.volume;
                      (1 === s && a < 1 || -1 === s && a > 0) && e.preventDefault()
                  }, "volume", !1)
              }
          }]), e
      }(),
      Ph = Vn("splice"),
      Lh = Kt("splice", {
          ACCESSORS: !0,
          0: 0,
          1: 2
      }),
      Ih = Math.max,
      jh = Math.min;
  Ie({
      target: "Array",
      proto: !0,
      forced: !Ph || !Lh
  }, {
      splice: function(e, t) {
          var n, i, o, r, s, a, l = Oe(this),
              c = le(l.length),
              u = he(e, c),
              h = arguments.length;
          if (0 === h ? n = i = 0 : 1 === h ? (n = 0, i = c - u) : (n = h - 2, i = jh(Ih(se(t), 0), c - u)), c + n - i > 9007199254740991) throw TypeError("Maximum allowed length exceeded");
          for (o = st(l, i), r = 0; r < i; r++)(s = u + r) in l && zn(o, r, l[s]);
          if (o.length = i, n < i) {
              for (r = u; r < c - i; r++) a = r + n, (s = r + i) in l ? l[a] = l[s] : delete l[a];
              for (r = c; r > c - i + n; r--) delete l[r - 1]
          } else if (n > i)
              for (r = c - i; r > u; r--) a = r + n - 1, (s = r + i - 1) in l ? l[a] = l[s] : delete l[a];
          for (r = 0; r < n; r++) l[r + u] = arguments[r + 2];
          return l.length = c - i + n, o
      }
  });
  var Dh = t(function(e, t) {
      e.exports = function() {
          var e = function() {},
              t = {},
              n = {},
              i = {};

          function o(e, t) {
              if (e) {
                  var o = i[e];
                  if (n[e] = t, o)
                      for (; o.length;) o[0](e, t), o.splice(0, 1)
              }
          }

          function r(t, n) {
              t.call && (t = {
                  success: t
              }), n.length ? (t.error || e)(n) : (t.success || e)(t)
          }

          function s(t, n, i, o) {
              var r, a, l = document,
                  c = i.async,
                  u = (i.numRetries || 0) + 1,
                  h = i.before || e,
                  d = t.replace(/[\?|#].*$/, ""),
                  f = t.replace(/^(css|img)!/, "");
              o = o || 0, /(^css!|\.css$)/.test(d) ? ((a = l.createElement("link")).rel = "stylesheet", a.href = f, (r = "hideFocus" in a) && a.relList && (r = 0, a.rel = "preload", a.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(d) ? (a = l.createElement("img")).src = f : ((a = l.createElement("script")).src = t, a.async = void 0 === c || c), a.onload = a.onerror = a.onbeforeload = function(e) {
                  var l = e.type[0];
                  if (r) try {
                      a.sheet.cssText.length || (l = "e")
                  } catch (e) {
                      18 != e.code && (l = "e")
                  }
                  if ("e" == l) {
                      if ((o += 1) < u) return s(t, n, i, o)
                  } else if ("preload" == a.rel && "style" == a.as) return a.rel = "stylesheet";
                  n(t, l, e.defaultPrevented)
              }, !1 !== h(t, a) && l.head.appendChild(a)
          }

          function a(e, n, i) {
              var a, l;
              if (n && n.trim && (a = n), l = (a ? i : n) || {}, a) {
                  if (a in t) throw "LoadJS";
                  t[a] = !0
              }

              function c(t, n) {
                  ! function(e, t, n) {
                      var i, o, r = (e = e.push ? e : [e]).length,
                          a = r,
                          l = [];
                      for (i = function(e, n, i) {
                              if ("e" == n && l.push(e), "b" == n) {
                                  if (!i) return;
                                  l.push(e)
                              }--r || t(l)
                          }, o = 0; o < a; o++) s(e[o], i, n)
                  }(e, function(e) {
                      r(l, e), t && r({
                          success: t,
                          error: n
                      }, e), o(a, e)
                  }, l)
              }
              if (l.returnPromise) return new Promise(c);
              c()
          }
          return a.ready = function(e, t) {
              return function(e, t) {
                  e = e.push ? e : [e];
                  var o, r, s, a = [],
                      l = e.length,
                      c = l;
                  for (o = function(e, n) {
                          n.length && a.push(e), --c || t(a)
                      }; l--;) r = e[l], (s = n[r]) ? o(r, s) : (i[r] = i[r] || []).push(o)
              }(e, function(e) {
                  r(t, e)
              }), a
          }, a.done = function(e) {
              o(e, [])
          }, a.reset = function() {
              t = {}, n = {}, i = {}
          }, a.isDefined = function(e) {
              return e in t
          }, a
      }()
  });

  function Mh(e) {
      return new Promise(function(t, n) {
          Dh(e, {
              success: t,
              error: n
          })
      })
  }

  function Oh(e) {
      e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ju.call(this, this.media, e ? "play" : "pause"))
  }
  var Nh = {
      setup: function() {
          var e = this;
          vu(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, Nu.call(e), Fc(window.Vimeo) ? Nh.ready.call(e) : Mh(e.config.urls.vimeo.sdk).then(function() {
              Nh.ready.call(e)
          }).catch(function(t) {
              e.debug.warn("Vimeo SDK (player.js) failed to load", t)
          })
      },
      ready: function() {
          var e = this,
              t = this,
              n = t.config.vimeo,
              i = gh(au({}, {
                  loop: t.config.loop.active,
                  autoplay: t.autoplay,
                  muted: t.muted,
                  gesture: "media",
                  playsinline: !this.config.fullscreen.iosNative
              }, n)),
              o = t.media.getAttribute("src");
          Zc(o) && (o = t.media.getAttribute(t.config.attributes.embed.id));
          var r, s = Zc(r = o) ? null : qc(Number(r)) ? r : r.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : r,
              a = uu("iframe"),
              l = Zu(t.config.urls.vimeo.iframe, s, i);
          a.setAttribute("src", l), a.setAttribute("allowfullscreen", ""), a.setAttribute("allowtransparency", ""), a.setAttribute("allow", "autoplay"), Zc(n.referrerPolicy) || a.setAttribute("referrerPolicy", n.referrerPolicy);
          var c = uu("div", {
              poster: t.poster,
              class: t.config.classNames.embedContainer
          });
          c.appendChild(a), t.media = pu(c, t.media), rh(Zu(t.config.urls.vimeo.api, s), "json").then(function(e) {
              if (!Zc(e)) {
                  var n = new URL(e[0].thumbnail_large);
                  n.pathname = "".concat(n.pathname.split("_")[0], ".jpg"), Eh.setPoster.call(t, n.href).catch(function() {})
              }
          }), t.embed = new window.Vimeo.Player(a, {
              autopause: t.config.autopause,
              muted: t.muted
          }), t.media.paused = !0, t.media.currentTime = 0, t.supported.ui && t.embed.disableTextTrack(), t.media.play = function() {
              return Oh.call(t, !0), t.embed.play()
          }, t.media.pause = function() {
              return Oh.call(t, !1), t.embed.pause()
          }, t.media.stop = function() {
              t.pause(), t.currentTime = 0
          };
          var u = t.media.currentTime;
          Object.defineProperty(t.media, "currentTime", {
              get: function() {
                  return u
              },
              set: function(e) {
                  var n = t.embed,
                      i = t.media,
                      o = t.paused,
                      r = t.volume,
                      s = o && !n.hasPlayed;
                  i.seeking = !0, ju.call(t, i, "seeking"), Promise.resolve(s && n.setVolume(0)).then(function() {
                      return n.setCurrentTime(e)
                  }).then(function() {
                      return s && n.pause()
                  }).then(function() {
                      return s && n.setVolume(r)
                  }).catch(function() {})
              }
          });
          var h = t.config.speed.selected;
          Object.defineProperty(t.media, "playbackRate", {
              get: function() {
                  return h
              },
              set: function(e) {
                  t.embed.setPlaybackRate(e).then(function() {
                      h = e, ju.call(t, t.media, "ratechange")
                  })
              }
          });
          var d = t.config.volume;
          Object.defineProperty(t.media, "volume", {
              get: function() {
                  return d
              },
              set: function(e) {
                  t.embed.setVolume(e).then(function() {
                      d = e, ju.call(t, t.media, "volumechange")
                  })
              }
          });
          var f = t.config.muted;
          Object.defineProperty(t.media, "muted", {
              get: function() {
                  return f
              },
              set: function(e) {
                  var n = !!Uc(e) && e;
                  t.embed.setVolume(n ? 0 : t.config.volume).then(function() {
                      f = n, ju.call(t, t.media, "volumechange")
                  })
              }
          });
          var p, g = t.config.loop;
          Object.defineProperty(t.media, "loop", {
              get: function() {
                  return g
              },
              set: function(e) {
                  var n = Uc(e) ? e : t.config.loop.active;
                  t.embed.setLoop(n).then(function() {
                      g = n
                  })
              }
          }), t.embed.getVideoUrl().then(function(e) {
              p = e, fh.setDownloadUrl.call(t)
          }).catch(function(t) {
              e.debug.warn(t)
          }), Object.defineProperty(t.media, "currentSrc", {
              get: function() {
                  return p
              }
          }), Object.defineProperty(t.media, "ended", {
              get: function() {
                  return t.currentTime === t.duration
              }
          }), Promise.all([t.embed.getVideoWidth(), t.embed.getVideoHeight()]).then(function(n) {
              var i = Ts(n, 2),
                  o = i[0],
                  r = i[1];
              t.embed.ratio = [o, r], Nu.call(e)
          }), t.embed.setAutopause(t.config.autopause).then(function(e) {
              t.config.autopause = e
          }), t.embed.getVideoTitle().then(function(n) {
              t.config.title = n, Eh.setTitle.call(e)
          }), t.embed.getCurrentTime().then(function(e) {
              u = e, ju.call(t, t.media, "timeupdate")
          }), t.embed.getDuration().then(function(e) {
              t.media.duration = e, ju.call(t, t.media, "durationchange")
          }), t.embed.getTextTracks().then(function(e) {
              t.media.textTracks = e, mh.setup.call(t)
          }), t.embed.on("cuechange", function(e) {
              var n = e.cues,
                  i = (void 0 === n ? [] : n).map(function(e) {
                      return function(e) {
                          var t = document.createDocumentFragment(),
                              n = document.createElement("div");
                          return t.appendChild(n), n.innerHTML = e, t.firstChild.innerText
                      }(e.text)
                  });
              mh.updateCues.call(t, i)
          }), t.embed.on("loaded", function() {
              t.embed.getPaused().then(function(e) {
                  Oh.call(t, !e), e || ju.call(t, t.media, "playing")
              }), Xc(t.embed.element) && t.supported.ui && t.embed.element.setAttribute("tabindex", -1)
          }), t.embed.on("bufferstart", function() {
              ju.call(t, t.media, "waiting")
          }), t.embed.on("bufferend", function() {
              ju.call(t, t.media, "playing")
          }), t.embed.on("play", function() {
              Oh.call(t, !0), ju.call(t, t.media, "playing")
          }), t.embed.on("pause", function() {
              Oh.call(t, !1)
          }), t.embed.on("timeupdate", function(e) {
              t.media.seeking = !1, u = e.seconds, ju.call(t, t.media, "timeupdate")
          }), t.embed.on("progress", function(e) {
              t.media.buffered = e.percent, ju.call(t, t.media, "progress"), 1 === parseInt(e.percent, 10) && ju.call(t, t.media, "canplaythrough"), t.embed.getDuration().then(function(e) {
                  e !== t.media.duration && (t.media.duration = e, ju.call(t, t.media, "durationchange"))
              })
          }), t.embed.on("seeked", function() {
              t.media.seeking = !1, ju.call(t, t.media, "seeked")
          }), t.embed.on("ended", function() {
              t.media.paused = !0, ju.call(t, t.media, "ended")
          }), t.embed.on("error", function(e) {
              t.media.error = e, ju.call(t, t.media, "error")
          }), setTimeout(function() {
              return Eh.build.call(t)
          }, 0)
      }
  };

  function _h(e) {
      e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ju.call(this, this.media, e ? "play" : "pause"))
  }

  function Rh(e) {
      return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0
  }
  var $h = {
          setup: function() {
              var e = this;
              if (vu(this.elements.wrapper, this.config.classNames.embed, !0), Fc(window.YT) && Bc(window.YT.Player)) $h.ready.call(this);
              else {
                  var t = window.onYouTubeIframeAPIReady;
                  window.onYouTubeIframeAPIReady = function() {
                      Bc(t) && t(), $h.ready.call(e)
                  }, Mh(this.config.urls.youtube.sdk).catch(function(t) {
                      e.debug.warn("YouTube API failed to load", t)
                  })
              }
          },
          getTitle: function(e) {
              var t = this;
              rh(Zu(this.config.urls.youtube.api, e)).then(function(e) {
                  if (Fc(e)) {
                      var n = e.title,
                          i = e.height,
                          o = e.width;
                      t.config.title = n, Eh.setTitle.call(t), t.embed.ratio = [o, i]
                  }
                  Nu.call(t)
              }).catch(function() {
                  Nu.call(t)
              })
          },
          ready: function() {
              var e = this,
                  t = e.media && e.media.getAttribute("id");
              if (Zc(t) || !t.startsWith("youtube-")) {
                  var n = e.media.getAttribute("src");
                  Zc(n) && (n = e.media.getAttribute(this.config.attributes.embed.id));
                  var i, o, r = Zc(i = n) ? null : i.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : i,
                      s = (o = e.provider, "".concat(o, "-").concat(Math.floor(1e4 * Math.random()))),
                      a = uu("div", {
                          id: s,
                          poster: e.poster
                      });
                  e.media = pu(a, e.media);
                  var l = function(e) {
                      return "https://i.ytimg.com/vi/".concat(r, "/").concat(e, "default.jpg")
                  };
                  Ch(l("maxres"), 121).catch(function() {
                      return Ch(l("sd"), 121)
                  }).catch(function() {
                      return Ch(l("hq"))
                  }).then(function(t) {
                      return Eh.setPoster.call(e, t.src)
                  }).then(function(t) {
                      t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover")
                  }).catch(function() {});
                  var c = e.config.youtube;
                  e.embed = new window.YT.Player(s, {
                      videoId: r,
                      host: Rh(c),
                      playerVars: au({}, {
                          autoplay: e.config.autoplay ? 1 : 0,
                          hl: e.config.hl,
                          controls: e.supported.ui ? 0 : 1,
                          disablekb: 1,
                          playsinline: e.config.fullscreen.iosNative ? 0 : 1,
                          cc_load_policy: e.captions.active ? 1 : 0,
                          cc_lang_pref: e.config.captions.language,
                          widget_referrer: window ? window.location.href : null
                      }, c),
                      events: {
                          onError: function(t) {
                              if (!e.media.error) {
                                  var n = t.data,
                                      i = {
                                          2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                                          5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                                          100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                                          101: "The owner of the requested video does not allow it to be played in embedded players.",
                                          150: "The owner of the requested video does not allow it to be played in embedded players."
                                      } [n] || "An unknown error occured";
                                  e.media.error = {
                                      code: n,
                                      message: i
                                  }, ju.call(e, e.media, "error")
                              }
                          },
                          onPlaybackRateChange: function(t) {
                              var n = t.target;
                              e.media.playbackRate = n.getPlaybackRate(), ju.call(e, e.media, "ratechange")
                          },
                          onReady: function(t) {
                              if (!Bc(e.media.play)) {
                                  var n = t.target;
                                  $h.getTitle.call(e, r), e.media.play = function() {
                                      _h.call(e, !0), n.playVideo()
                                  }, e.media.pause = function() {
                                      _h.call(e, !1), n.pauseVideo()
                                  }, e.media.stop = function() {
                                      n.stopVideo()
                                  }, e.media.duration = n.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
                                      get: function() {
                                          return Number(n.getCurrentTime())
                                      },
                                      set: function(t) {
                                          e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, ju.call(e, e.media, "seeking"), n.seekTo(t)
                                      }
                                  }), Object.defineProperty(e.media, "playbackRate", {
                                      get: function() {
                                          return n.getPlaybackRate()
                                      },
                                      set: function(e) {
                                          n.setPlaybackRate(e)
                                      }
                                  });
                                  var i = e.config.volume;
                                  Object.defineProperty(e.media, "volume", {
                                      get: function() {
                                          return i
                                      },
                                      set: function(t) {
                                          i = t, n.setVolume(100 * i), ju.call(e, e.media, "volumechange")
                                      }
                                  });
                                  var o = e.config.muted;
                                  Object.defineProperty(e.media, "muted", {
                                      get: function() {
                                          return o
                                      },
                                      set: function(t) {
                                          var i = Uc(t) ? t : o;
                                          o = i, n[i ? "mute" : "unMute"](), ju.call(e, e.media, "volumechange")
                                      }
                                  }), Object.defineProperty(e.media, "currentSrc", {
                                      get: function() {
                                          return n.getVideoUrl()
                                      }
                                  }), Object.defineProperty(e.media, "ended", {
                                      get: function() {
                                          return e.currentTime === e.duration
                                      }
                                  });
                                  var s = n.getAvailablePlaybackRates();
                                  e.options.speed = s.filter(function(t) {
                                      return e.config.speed.options.includes(t)
                                  }), e.supported.ui && e.media.setAttribute("tabindex", -1), ju.call(e, e.media, "timeupdate"), ju.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(function() {
                                      e.media.buffered = n.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && ju.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), ju.call(e, e.media, "canplaythrough"))
                                  }, 200), setTimeout(function() {
                                      return Eh.build.call(e)
                                  }, 50)
                              }
                          },
                          onStateChange: function(t) {
                              var n = t.target;
                              switch (clearInterval(e.timers.playing), e.media.seeking && [1, 2].includes(t.data) && (e.media.seeking = !1, ju.call(e, e.media, "seeked")), t.data) {
                                  case -1:
                                      ju.call(e, e.media, "timeupdate"), e.media.buffered = n.getVideoLoadedFraction(), ju.call(e, e.media, "progress");
                                      break;
                                  case 0:
                                      _h.call(e, !1), e.media.loop ? (n.stopVideo(), n.playVideo()) : ju.call(e, e.media, "ended");
                                      break;
                                  case 1:
                                      e.config.autoplay || !e.media.paused || e.embed.hasPlayed ? (_h.call(e, !0), ju.call(e, e.media, "playing"), e.timers.playing = setInterval(function() {
                                          ju.call(e, e.media, "timeupdate")
                                      }, 50), e.media.duration !== n.getDuration() && (e.media.duration = n.getDuration(), ju.call(e, e.media, "durationchange"))) : e.media.pause();
                                      break;
                                  case 2:
                                      e.muted || e.embed.unMute(), _h.call(e, !1);
                                      break;
                                  case 3:
                                      ju.call(e, e.media, "waiting")
                              }
                              ju.call(e, e.elements.container, "statechange", !1, {
                                  code: t.data
                              })
                          }
                      }
                  })
              }
          }
      },
      zh = {
          setup: function() {
              this.media ? (vu(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), vu(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && vu(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = uu("div", {
                  class: this.config.classNames.video
              }), lu(this.media, this.elements.wrapper), this.isEmbed && (this.elements.poster = uu("div", {
                  class: this.config.classNames.poster
              }), this.elements.wrapper.appendChild(this.elements.poster))), this.isHTML5 ? _u.setup.call(this) : this.isYouTube ? $h.setup.call(this) : this.isVimeo && Nh.setup.call(this)) : this.debug.warn("No media element found!")
          }
      },
      Fh = function() {
          function e(t) {
              var n = this;
              ys(this, e), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
                  container: null,
                  displayContainer: null
              }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(function(e, t) {
                  n.on("loaded", e), n.on("error", t)
              }), this.load()
          }
          return ws(e, [{
              key: "load",
              value: function() {
                  var e = this;
                  this.enabled && (Fc(window.google) && Fc(window.google.ima) ? this.ready() : Mh(this.player.config.urls.googleIMA.sdk).then(function() {
                      e.ready()
                  }).catch(function() {
                      e.trigger("error", new Error("Google IMA SDK failed to load"))
                  }))
              }
          }, {
              key: "ready",
              value: function() {
                  var e, t = this;
                  this.enabled || ((e = this).manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(function() {
                      t.clearSafetyTimer("onAdsManagerLoaded()")
                  }), this.listeners(), this.setupIMA()
              }
          }, {
              key: "setupIMA",
              value: function() {
                  this.elements.container = uu("div", {
                      class: this.player.config.classNames.ads
                  }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.requestAds()
              }
          }, {
              key: "requestAds",
              value: function() {
                  var e = this,
                      t = this.player.elements.container;
                  try {
                      this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function(t) {
                          return e.onAdsManagerLoaded(t)
                      }, !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(t) {
                          return e.onAdError(t)
                      }, !1);
                      var n = new google.ima.AdsRequest;
                      n.adTagUrl = this.tagUrl, n.linearAdSlotWidth = t.offsetWidth, n.linearAdSlotHeight = t.offsetHeight, n.nonLinearAdSlotWidth = t.offsetWidth, n.nonLinearAdSlotHeight = t.offsetHeight, n.forceNonLinearFullSlot = !1, n.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(n)
                  } catch (e) {
                      this.onAdError(e)
                  }
              }
          }, {
              key: "pollCountdown",
              value: function() {
                  var e = this;
                  if (!(arguments.length > 0 && void 0 !== arguments[0] && arguments[0])) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
                  this.countdownTimer = setInterval(function() {
                      var t = dh(Math.max(e.manager.getRemainingTime(), 0)),
                          n = "".concat(ih("advertisement", e.player.config), " - ").concat(t);
                      e.elements.container.setAttribute("data-badge-text", n)
                  }, 100)
              }
          }, {
              key: "onAdsManagerLoaded",
              value: function(e) {
                  var t = this;
                  if (this.enabled) {
                      var n = new google.ima.AdsRenderingSettings;
                      n.restoreCustomPlaybackStateOnAdBreakComplete = !0, n.enablePreloading = !0, this.manager = e.getAdsManager(this.player, n), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(e) {
                          return t.onAdError(e)
                      }), Object.keys(google.ima.AdEvent.Type).forEach(function(e) {
                          t.manager.addEventListener(google.ima.AdEvent.Type[e], function(e) {
                              return t.onAdEvent(e)
                          })
                      }), this.trigger("loaded")
                  }
              }
          }, {
              key: "addCuePoints",
              value: function() {
                  var e = this;
                  Zc(this.cuePoints) || this.cuePoints.forEach(function(t) {
                      if (0 !== t && -1 !== t && t < e.player.duration) {
                          var n = e.player.elements.progress;
                          if (Xc(n)) {
                              var i = 100 / e.player.duration * t,
                                  o = uu("span", {
                                      class: e.player.config.classNames.cues
                                  });
                              o.style.left = "".concat(i.toString(), "%"), n.appendChild(o)
                          }
                      }
                  })
              }
          }, {
              key: "onAdEvent",
              value: function(e) {
                  var t = this,
                      n = this.player.elements.container,
                      i = e.getAd(),
                      o = e.getAdData();
                  switch (function(e) {
                          ju.call(t.player, t.player.media, "ads".concat(e.replace(/_/g, "").toLowerCase()))
                      }(e.type), e.type) {
                      case google.ima.AdEvent.Type.LOADED:
                          this.trigger("loaded"), this.pollCountdown(!0), i.isLinear() || (i.width = n.offsetWidth, i.height = n.offsetHeight);
                          break;
                      case google.ima.AdEvent.Type.STARTED:
                          this.manager.setVolume(this.player.volume);
                          break;
                      case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                          this.loadAds();
                          break;
                      case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                          this.pauseContent();
                          break;
                      case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                          this.pollCountdown(), this.resumeContent();
                          break;
                      case google.ima.AdEvent.Type.LOG:
                          o.adError && this.player.debug.warn("Non-fatal ad error: ".concat(o.adError.getMessage()))
                  }
              }
          }, {
              key: "onAdError",
              value: function(e) {
                  this.cancel(), this.player.debug.warn("Ads error", e)
              }
          }, {
              key: "listeners",
              value: function() {
                  var e, t = this,
                      n = this.player.elements.container;
                  this.player.on("canplay", function() {
                      t.addCuePoints()
                  }), this.player.on("ended", function() {
                      t.loader.contentComplete()
                  }), this.player.on("timeupdate", function() {
                      e = t.player.currentTime
                  }), this.player.on("seeked", function() {
                      var n = t.player.currentTime;
                      Zc(t.cuePoints) || t.cuePoints.forEach(function(i, o) {
                          e < i && i < n && (t.manager.discardAdBreak(), t.cuePoints.splice(o, 1))
                      })
                  }), window.addEventListener("resize", function() {
                      t.manager && t.manager.resize(n.offsetWidth, n.offsetHeight, google.ima.ViewMode.NORMAL)
                  })
              }
          }, {
              key: "play",
              value: function() {
                  var e = this,
                      t = this.player.elements.container;
                  this.managerPromise || this.resumeContent(), this.managerPromise.then(function() {
                      e.manager.setVolume(e.player.volume), e.elements.displayContainer.initialize();
                      try {
                          e.initialized || (e.manager.init(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL), e.manager.start()), e.initialized = !0
                      } catch (t) {
                          e.onAdError(t)
                      }
                  }).catch(function() {})
              }
          }, {
              key: "resumeContent",
              value: function() {
                  this.elements.container.style.zIndex = "", this.playing = !1, this.player.media.play()
              }
          }, {
              key: "pauseContent",
              value: function() {
                  this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause()
              }
          }, {
              key: "cancel",
              value: function() {
                  this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds()
              }
          }, {
              key: "loadAds",
              value: function() {
                  var e = this;
                  this.managerPromise.then(function() {
                      e.manager && e.manager.destroy(), e.managerPromise = new Promise(function(t) {
                          e.on("loaded", t), e.player.debug.log(e.manager)
                      }), e.requestAds()
                  }).catch(function() {})
              }
          }, {
              key: "trigger",
              value: function(e) {
                  for (var t = this, n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) i[o - 1] = arguments[o];
                  var r = this.events[e];
                  Wc(r) && r.forEach(function(e) {
                      Bc(e) && e.apply(t, i)
                  })
              }
          }, {
              key: "on",
              value: function(e, t) {
                  return Wc(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this
              }
          }, {
              key: "startSafetyTimer",
              value: function(e, t) {
                  var n = this;
                  this.player.debug.log("Safety timer invoked from: ".concat(t)), this.safetyTimer = setTimeout(function() {
                      n.cancel(), n.clearSafetyTimer("startSafetyTimer()")
                  }, e)
              }
          }, {
              key: "clearSafetyTimer",
              value: function(e) {
                  zc(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: ".concat(e)), clearTimeout(this.safetyTimer), this.safetyTimer = null)
              }
          }, {
              key: "enabled",
              get: function() {
                  var e = this.config;
                  return this.player.isHTML5 && this.player.isVideo && e.enabled && (!Zc(e.publisherId) || Kc(e.tagUrl))
              }
          }, {
              key: "tagUrl",
              get: function() {
                  var e = this.config;
                  if (Kc(e.tagUrl)) return e.tagUrl;
                  var t = {
                      AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
                      AV_CHANNELID: "5a0458dc28a06145e4519d21",
                      AV_URL: window.location.hostname,
                      cb: Date.now(),
                      AV_WIDTH: 640,
                      AV_HEIGHT: 480,
                      AV_CDIM2: e.publisherId
                  };
                  return "".concat("https://go.aniview.com/api/adserver6/vast/", "?").concat(gh(t))
              }
          }]), e
      }(),
      qh = ct.findIndex,
      Hh = !0,
      Uh = Kt("findIndex");
  "findIndex" in [] && Array(1).findIndex(function() {
      Hh = !1
  }), Ie({
      target: "Array",
      proto: !0,
      forced: Hh || !Uh
  }, {
      findIndex: function(e) {
          return qh(this, e, arguments.length > 1 ? arguments[1] : void 0)
      }
  }), fn("findIndex");
  var Bh = Math.min,
      Wh = [].lastIndexOf,
      Vh = !!Wh && 1 / [1].lastIndexOf(1, -0) < 0,
      Xh = Xt("lastIndexOf"),
      Yh = Kt("indexOf", {
          ACCESSORS: !0,
          1: 0
      }),
      Qh = !Vh && Xh && Yh ? Wh : function(e) {
          if (Vh) return Wh.apply(this, arguments) || 0;
          var t = g(this),
              n = le(t.length),
              i = n - 1;
          for (arguments.length > 1 && (i = Bh(i, se(arguments[1]))), i < 0 && (i = n + i); i >= 0; i--)
              if (i in t && t[i] === e) return i || 0;
          return -1
      };
  Ie({
      target: "Array",
      proto: !0,
      forced: Qh !== [].lastIndexOf
  }, {
      lastIndexOf: Qh
  });
  var Gh, Kh = function(e, t) {
          var n = {};
          return e > t.width / t.height ? (n.width = t.width, n.height = 1 / e * t.width) : (n.height = t.height, n.width = e * t.height), n
      },
      Zh = function() {
          function e(t) {
              ys(this, e), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
                  thumb: {},
                  scrubbing: {}
              }, this.load()
          }
          return ws(e, [{
              key: "load",
              value: function() {
                  var e = this;
                  this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then(function() {
                      e.enabled && (e.render(), e.determineContainerAutoSizing(), e.loaded = !0)
                  })
              }
          }, {
              key: "getThumbnails",
              value: function() {
                  var e = this;
                  return new Promise(function(t) {
                      var n = e.player.config.previewThumbnails.src;
                      if (Zc(n)) throw new Error("Missing previewThumbnails.src config attribute");
                      var i = (Hc(n) ? [n] : n).map(function(t) {
                          return e.getThumbnail(t)
                      });
                      Promise.all(i).then(function() {
                          e.thumbnails.sort(function(e, t) {
                              return e.height - t.height
                          }), e.player.debug.log("Preview thumbnails", e.thumbnails), t()
                      })
                  })
              }
          }, {
              key: "getThumbnail",
              value: function(e) {
                  var t = this;
                  return new Promise(function(n) {
                      rh(e).then(function(i) {
                          var o, r, s = {
                              frames: (o = i, r = [], o.split(/\r\n\r\n|\n\n|\r\r/).forEach(function(e) {
                                  var t = {};
                                  e.split(/\r\n|\n|\r/).forEach(function(e) {
                                      if (qc(t.startTime)) {
                                          if (!Zc(e.trim()) && Zc(t.text)) {
                                              var n = e.trim().split("#xywh="),
                                                  i = Ts(n, 1);
                                              if (t.text = i[0], n[1]) {
                                                  var o = Ts(n[1].split(","), 4);
                                                  t.x = o[0], t.y = o[1], t.w = o[2], t.h = o[3]
                                              }
                                          }
                                      } else {
                                          var r = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
                                          r && (t.startTime = 60 * Number(r[1] || 0) * 60 + 60 * Number(r[2]) + Number(r[3]) + Number("0.".concat(r[4])), t.endTime = 60 * Number(r[6] || 0) * 60 + 60 * Number(r[7]) + Number(r[8]) + Number("0.".concat(r[9])))
                                      }
                                  }), t.text && r.push(t)
                              }), r),
                              height: null,
                              urlPrefix: ""
                          };
                          s.frames[0].text.startsWith("/") || s.frames[0].text.startsWith("http://") || s.frames[0].text.startsWith("https://") || (s.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));
                          var a = new Image;
                          a.onload = function() {
                              s.height = a.naturalHeight, s.width = a.naturalWidth, t.thumbnails.push(s), n()
                          }, a.src = s.urlPrefix + s.frames[0].text
                      })
                  })
              }
          }, {
              key: "startMove",
              value: function(e) {
                  if (this.loaded && Yc(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) {
                      if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);
                      else {
                          var t = this.player.elements.progress.getBoundingClientRect(),
                              n = 100 / t.width * (e.pageX - t.left);
                          this.seekTime = this.player.media.duration * (n / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = dh(this.seekTime)
                      }
                      this.showImageAtCurrentTime()
                  }
              }
          }, {
              key: "endMove",
              value: function() {
                  this.toggleThumbContainer(!1, !0)
              }
          }, {
              key: "startScrubbing",
              value: function(e) {
                  (zc(e.button) || !1 === e.button || 0 === e.button) && (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()))
              }
          }, {
              key: "endScrubbing",
              value: function() {
                  var e = this;
                  this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : Iu.call(this.player, this.player.media, "timeupdate", function() {
                      e.mouseDown || e.toggleScrubbingContainer(!1)
                  })
              }
          }, {
              key: "listeners",
              value: function() {
                  var e = this;
                  this.player.on("play", function() {
                      e.toggleThumbContainer(!1, !0)
                  }), this.player.on("seeked", function() {
                      e.toggleThumbContainer(!1)
                  }), this.player.on("timeupdate", function() {
                      e.lastTime = e.player.media.currentTime
                  })
              }
          }, {
              key: "render",
              value: function() {
                  this.elements.thumb.container = uu("div", {
                      class: this.player.config.classNames.previewThumbnails.thumbContainer
                  }), this.elements.thumb.imageContainer = uu("div", {
                      class: this.player.config.classNames.previewThumbnails.imageContainer
                  }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
                  var e = uu("div", {
                      class: this.player.config.classNames.previewThumbnails.timeContainer
                  });
                  this.elements.thumb.time = uu("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), Xc(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = uu("div", {
                      class: this.player.config.classNames.previewThumbnails.scrubbingContainer
                  }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container)
              }
          }, {
              key: "destroy",
              value: function() {
                  this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove()
              }
          }, {
              key: "showImageAtCurrentTime",
              value: function() {
                  var e = this;
                  this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
                  var t = this.thumbnails[0].frames.findIndex(function(t) {
                          return e.seekTime >= t.startTime && e.seekTime <= t.endTime
                      }),
                      n = t >= 0,
                      i = 0;
                  this.mouseDown || this.toggleThumbContainer(n), n && (this.thumbnails.forEach(function(n, o) {
                      e.loadedImages.includes(n.frames[t].text) && (i = o)
                  }), t !== this.showingThumb && (this.showingThumb = t, this.loadImage(i)))
              }
          }, {
              key: "loadImage",
              value: function() {
                  var e = this,
                      t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                      n = this.showingThumb,
                      i = this.thumbnails[t],
                      o = i.urlPrefix,
                      r = i.frames[n],
                      s = i.frames[n].text,
                      a = o + s;
                  if (this.currentImageElement && this.currentImageElement.dataset.filename === s) this.showImage(this.currentImageElement, r, t, n, s, !1), this.currentImageElement.dataset.index = n, this.removeOldImages(this.currentImageElement);
                  else {
                      this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);
                      var l = new Image;
                      l.src = a, l.dataset.index = n, l.dataset.filename = s, this.showingThumbFilename = s, this.player.debug.log("Loading image: ".concat(a)), l.onload = function() {
                          return e.showImage(l, r, t, n, s, !0)
                      }, this.loadingImage = l, this.removeOldImages(l)
                  }
              }
          }, {
              key: "showImage",
              value: function(e, t, n, i, o) {
                  var r = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5];
                  this.player.debug.log("Showing thumb: ".concat(o, ". num: ").concat(i, ". qual: ").concat(n, ". newimg: ").concat(r)), this.setImageSizeAndOffset(e, t), r && (this.currentImageContainer.appendChild(e), this.currentImageElement = e, this.loadedImages.includes(o) || this.loadedImages.push(o)), this.preloadNearby(i, !0).then(this.preloadNearby(i, !1)).then(this.getHigherQuality(n, e, t, o))
              }
          }, {
              key: "removeOldImages",
              value: function(e) {
                  var t = this;
                  Array.from(this.currentImageContainer.children).forEach(function(n) {
                      if ("img" === n.tagName.toLowerCase()) {
                          var i = t.usingSprites ? 500 : 1e3;
                          if (n.dataset.index !== e.dataset.index && !n.dataset.deleting) {
                              n.dataset.deleting = !0;
                              var o = t.currentImageContainer;
                              setTimeout(function() {
                                  o.removeChild(n), t.player.debug.log("Removing thumb: ".concat(n.dataset.filename))
                              }, i)
                          }
                      }
                  })
              }
          }, {
              key: "preloadNearby",
              value: function(e) {
                  var t = this,
                      n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                  return new Promise(function(i) {
                      setTimeout(function() {
                          var o = t.thumbnails[0].frames[e].text;
                          if (t.showingThumbFilename === o) {
                              var r;
                              r = n ? t.thumbnails[0].frames.slice(e) : t.thumbnails[0].frames.slice(0, e).reverse();
                              var s = !1;
                              r.forEach(function(e) {
                                  var n = e.text;
                                  if (n !== o && !t.loadedImages.includes(n)) {
                                      s = !0, t.player.debug.log("Preloading thumb filename: ".concat(n));
                                      var r = t.thumbnails[0].urlPrefix + n,
                                          a = new Image;
                                      a.src = r, a.onload = function() {
                                          t.player.debug.log("Preloaded thumb filename: ".concat(n)), t.loadedImages.includes(n) || t.loadedImages.push(n), i()
                                      }
                                  }
                              }), s || i()
                          }
                      }, 300)
                  })
              }
          }, {
              key: "getHigherQuality",
              value: function(e, t, n, i) {
                  var o = this;
                  if (e < this.thumbnails.length - 1) {
                      var r = t.naturalHeight;
                      this.usingSprites && (r = n.h), r < this.thumbContainerHeight && setTimeout(function() {
                          o.showingThumbFilename === i && (o.player.debug.log("Showing higher quality thumb for: ".concat(i)), o.loadImage(e + 1))
                      }, 300)
                  }
              }
          }, {
              key: "toggleThumbContainer",
              value: function() {
                  var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                      t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                      n = this.player.config.classNames.previewThumbnails.thumbContainerShown;
                  this.elements.thumb.container.classList.toggle(n, e), !e && t && (this.showingThumb = null, this.showingThumbFilename = null)
              }
          }, {
              key: "toggleScrubbingContainer",
              value: function() {
                  var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                      t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
                  this.elements.scrubbing.container.classList.toggle(t, e), e || (this.showingThumb = null, this.showingThumbFilename = null)
              }
          }, {
              key: "determineContainerAutoSizing",
              value: function() {
                  (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) && (this.sizeSpecifiedInCSS = !0)
              }
          }, {
              key: "setThumbContainerSizeAndPos",
              value: function() {
                  if (this.sizeSpecifiedInCSS) {
                      if (this.elements.thumb.imageContainer.clientHeight > 20 && this.elements.thumb.imageContainer.clientWidth < 20) {
                          var e = Math.floor(this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio);
                          this.elements.thumb.imageContainer.style.width = "".concat(e, "px")
                      } else if (this.elements.thumb.imageContainer.clientHeight < 20 && this.elements.thumb.imageContainer.clientWidth > 20) {
                          var t = Math.floor(this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio);
                          this.elements.thumb.imageContainer.style.height = "".concat(t, "px")
                      }
                  } else {
                      var n = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
                      this.elements.thumb.imageContainer.style.height = "".concat(this.thumbContainerHeight, "px"), this.elements.thumb.imageContainer.style.width = "".concat(n, "px")
                  }
                  this.setThumbContainerPos()
              }
          }, {
              key: "setThumbContainerPos",
              value: function() {
                  var e = this.player.elements.progress.getBoundingClientRect(),
                      t = this.player.elements.container.getBoundingClientRect(),
                      n = this.elements.thumb.container,
                      i = t.left - e.left + 10,
                      o = t.right - e.left - n.clientWidth - 10,
                      r = this.mousePosX - e.left - n.clientWidth / 2;
                  r < i && (r = i), r > o && (r = o), n.style.left = "".concat(r, "px")
              }
          }, {
              key: "setScrubbingContainerSize",
              value: function() {
                  var e = Kh(this.thumbAspectRatio, {
                          width: this.player.media.clientWidth,
                          height: this.player.media.clientHeight
                      }),
                      t = e.width,
                      n = e.height;
                  this.elements.scrubbing.container.style.width = "".concat(t, "px"), this.elements.scrubbing.container.style.height = "".concat(n, "px")
              }
          }, {
              key: "setImageSizeAndOffset",
              value: function(e, t) {
                  if (this.usingSprites) {
                      var n = this.thumbContainerHeight / t.h;
                      e.style.height = "".concat(e.naturalHeight * n, "px"), e.style.width = "".concat(e.naturalWidth * n, "px"), e.style.left = "-".concat(t.x * n, "px"), e.style.top = "-".concat(t.y * n, "px")
                  }
              }
          }, {
              key: "enabled",
              get: function() {
                  return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled
              }
          }, {
              key: "currentImageContainer",
              get: function() {
                  return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer
              }
          }, {
              key: "usingSprites",
              get: function() {
                  return Object.keys(this.thumbnails[0].frames[0]).includes("w")
              }
          }, {
              key: "thumbAspectRatio",
              get: function() {
                  return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height
              }
          }, {
              key: "thumbContainerHeight",
              get: function() {
                  return this.mouseDown ? Kh(this.thumbAspectRatio, {
                      width: this.player.media.clientWidth,
                      height: this.player.media.clientHeight
                  }).height : this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4)
              }
          }, {
              key: "currentImageElement",
              get: function() {
                  return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement
              },
              set: function(e) {
                  this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e
              }
          }]), e
      }(),
      Jh = {
          insertElements: function(e, t) {
              var n = this;
              Hc(t) ? hu(e, this.media, {
                  src: t
              }) : Wc(t) && t.forEach(function(t) {
                  hu(e, n.media, t)
              })
          },
          change: function(e) {
              var t = this;
              su(e, "sources.length") ? (_u.cancelRequests.call(this), this.destroy.call(this, function() {
                  t.options.quality = [], du(t.media), t.media = null, Xc(t.elements.container) && t.elements.container.removeAttribute("class");
                  var n = e.sources,
                      i = e.type,
                      o = Ts(n, 1)[0],
                      r = o.provider,
                      s = void 0 === r ? bh.html5 : r,
                      a = o.src,
                      l = "html5" === s ? i : "div",
                      c = "html5" === s ? {} : {
                          src: a
                      };
                  Object.assign(t, {
                      provider: s,
                      type: i,
                      supported: Cu.check(i, s, t.config.playsinline),
                      media: uu(l, c)
                  }), t.elements.container.appendChild(t.media), Uc(e.autoplay) && (t.config.autoplay = e.autoplay), t.isHTML5 && (t.config.crossorigin && t.media.setAttribute("crossorigin", ""), t.config.autoplay && t.media.setAttribute("autoplay", ""), Zc(e.poster) || (t.poster = e.poster), t.config.loop.active && t.media.setAttribute("loop", ""), t.config.muted && t.media.setAttribute("muted", ""), t.config.playsinline && t.media.setAttribute("playsinline", "")), Eh.addStyleHook.call(t), t.isHTML5 && Jh.insertElements.call(t, "source", n), t.config.title = e.title, zh.setup.call(t), t.isHTML5 && Object.keys(e).includes("tracks") && Jh.insertElements.call(t, "track", e.tracks), (t.isHTML5 || t.isEmbed && !t.supported.ui) && Eh.build.call(t), t.isHTML5 && t.media.load(), Zc(e.previewThumbnails) || (Object.assign(t.config.previewThumbnails, e.previewThumbnails), t.previewThumbnails && t.previewThumbnails.loaded && (t.previewThumbnails.destroy(), t.previewThumbnails = null), t.config.previewThumbnails.enabled && (t.previewThumbnails = new Zh(t))), t.fullscreen.update()
              }, !0)) : this.debug.warn("Invalid source format")
          }
      },
      ed = function() {
          function e(t, n) {
              var i = this;
              if (ys(this, e), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = Cu.touch, this.media = t, Hc(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || Vc(this.media) || Wc(this.media)) && (this.media = this.media[0]), this.config = au({}, vh, e.defaults, n || {}, function() {
                      try {
                          return JSON.parse(i.media.getAttribute("data-plyr-config"))
                      } catch (e) {
                          return {}
                      }
                  }()), this.elements = {
                      container: null,
                      captions: null,
                      buttons: {},
                      display: {},
                      progress: {},
                      inputs: {},
                      settings: {
                          popup: null,
                          menu: null,
                          panels: {},
                          buttons: {}
                      }
                  }, this.captions = {
                      active: null,
                      currentTrack: -1,
                      meta: new WeakMap
                  }, this.fullscreen = {
                      active: !1
                  }, this.options = {
                      speed: [],
                      quality: []
                  }, this.debug = new Sh(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", Cu), !zc(this.media) && Xc(this.media))
                  if (this.media.plyr) this.debug.warn("Target already setup");
                  else if (this.config.enabled)
                  if (Cu.check().api) {
                      var o = this.media.cloneNode(!0);
                      o.autoplay = !1, this.elements.original = o;
                      var r = this.media.tagName.toLowerCase(),
                          s = null,
                          a = null;
                      switch (r) {
                          case "div":
                              if (s = this.media.querySelector("iframe"), Xc(s)) {
                                  if (a = ph(s.getAttribute("src")), this.provider = function(e) {
                                          return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? bh.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? bh.vimeo : null
                                      }(a.toString()), this.elements.container = this.media, this.media = s, this.elements.container.className = "", a.search.length) {
                                      var l = ["1", "true"];
                                      l.includes(a.searchParams.get("autoplay")) && (this.config.autoplay = !0), l.includes(a.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = l.includes(a.searchParams.get("playsinline")), this.config.youtube.hl = a.searchParams.get("hl")) : this.config.playsinline = !0
                                  }
                              } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
                              if (Zc(this.provider) || !Object.keys(bh).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
                              this.type = wh;
                              break;
                          case "video":
                          case "audio":
                              this.type = r, this.provider = bh.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
                              break;
                          default:
                              return void this.debug.error("Setup failed: unsupported type")
                      }
                      this.supported = Cu.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new Ah(this), this.storage = new oh(this), this.media.plyr = this, Xc(this.elements.container) || (this.elements.container = uu("div", {
                          tabindex: 0
                      }), lu(this.media, this.elements.container)), Eh.addStyleHook.call(this), zh.setup.call(this), this.config.debug && Pu.call(this, this.elements.container, this.config.events.join(" "), function(e) {
                          i.debug.log("event: ".concat(e.type))
                      }), (this.isHTML5 || this.isEmbed && !this.supported.ui) && Eh.build.call(this), this.listeners.container(), this.listeners.global(), this.fullscreen = new kh(this), this.config.ads.enabled && (this.ads = new Fh(this)), this.isHTML5 && this.config.autoplay && setTimeout(function() {
                          return i.play()
                      }, 10), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new Zh(this))) : this.debug.error("Setup failed: no support")
                  } else this.debug.error("Setup failed: no support");
              else this.debug.error("Setup failed: disabled by config");
              else this.debug.error("Setup failed: no suitable element passed")
          }
          return ws(e, [{
              key: "play",
              value: function() {
                  var e = this;
                  return Bc(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then(function() {
                      return e.ads.play()
                  }).catch(function() {
                      return e.media.play()
                  }), this.media.play()) : null
              }
          }, {
              key: "pause",
              value: function() {
                  return this.playing && Bc(this.media.pause) ? this.media.pause() : null
              }
          }, {
              key: "togglePlay",
              value: function(e) {
                  return (Uc(e) ? e : !this.playing) ? this.play() : this.pause()
              }
          }, {
              key: "stop",
              value: function() {
                  this.isHTML5 ? (this.pause(), this.restart()) : Bc(this.media.stop) && this.media.stop()
              }
          }, {
              key: "restart",
              value: function() {
                  this.currentTime = 0
              }
          }, {
              key: "rewind",
              value: function(e) {
                  this.currentTime -= qc(e) ? e : this.config.seekTime
              }
          }, {
              key: "forward",
              value: function(e) {
                  this.currentTime += qc(e) ? e : this.config.seekTime
              }
          }, {
              key: "increaseVolume",
              value: function(e) {
                  var t = this.media.muted ? 0 : this.volume;
                  this.volume = t + (qc(e) ? e : 0)
              }
          }, {
              key: "decreaseVolume",
              value: function(e) {
                  this.increaseVolume(-e)
              }
          }, {
              key: "toggleCaptions",
              value: function(e) {
                  mh.toggle.call(this, e, !1)
              }
          }, {
              key: "airplay",
              value: function() {
                  Cu.airplay && this.media.webkitShowPlaybackTargetPicker()
              }
          }, {
              key: "toggleControls",
              value: function(e) {
                  if (this.supported.ui && !this.isAudio) {
                      var t = yu(this.elements.container, this.config.classNames.hideControls),
                          n = void 0 === e ? void 0 : !e,
                          i = vu(this.elements.container, this.config.classNames.hideControls, n);
                      if (i && this.config.controls.includes("settings") && !Zc(this.config.settings) && fh.toggleMenu.call(this, !1), i !== t) {
                          var o = i ? "controlshidden" : "controlsshown";
                          ju.call(this, this.media, o)
                      }
                      return !i
                  }
                  return !1
              }
          }, {
              key: "on",
              value: function(e, t) {
                  Pu.call(this, this.elements.container, e, t)
              }
          }, {
              key: "once",
              value: function(e, t) {
                  Iu.call(this, this.elements.container, e, t)
              }
          }, {
              key: "off",
              value: function(e, t) {
                  Lu(this.elements.container, e, t)
              }
          }, {
              key: "destroy",
              value: function(e) {
                  var t = this,
                      n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                  if (this.ready) {
                      var i = function() {
                          document.body.style.overflow = "", t.embed = null, n ? (Object.keys(t.elements).length && (du(t.elements.buttons.play), du(t.elements.captions), du(t.elements.controls), du(t.elements.wrapper), t.elements.buttons.play = null, t.elements.captions = null, t.elements.controls = null, t.elements.wrapper = null), Bc(e) && e()) : (function() {
                              this && this.eventListeners && (this.eventListeners.forEach(function(e) {
                                  var t = e.element,
                                      n = e.type,
                                      i = e.callback,
                                      o = e.options;
                                  t.removeEventListener(n, i, o)
                              }), this.eventListeners = [])
                          }.call(t), pu(t.elements.original, t.elements.container), ju.call(t, t.elements.original, "destroyed", !0), Bc(e) && e.call(t.elements.original), t.ready = !1, setTimeout(function() {
                              t.elements = null, t.media = null
                          }, 200))
                      };
                      this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (Eh.toggleNativeControls.call(this, !0), i()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && Bc(this.embed.destroy) && this.embed.destroy(), i()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i), setTimeout(i, 200))
                  }
              }
          }, {
              key: "supports",
              value: function(e) {
                  return Cu.mime.call(this, e)
              }
          }, {
              key: "isHTML5",
              get: function() {
                  return this.provider === bh.html5
              }
          }, {
              key: "isEmbed",
              get: function() {
                  return this.isYouTube || this.isVimeo
              }
          }, {
              key: "isYouTube",
              get: function() {
                  return this.provider === bh.youtube
              }
          }, {
              key: "isVimeo",
              get: function() {
                  return this.provider === bh.vimeo
              }
          }, {
              key: "isVideo",
              get: function() {
                  return this.type === wh
              }
          }, {
              key: "isAudio",
              get: function() {
                  return "audio" === this.type
              }
          }, {
              key: "playing",
              get: function() {
                  return Boolean(this.ready && !this.paused && !this.ended)
              }
          }, {
              key: "paused",
              get: function() {
                  return Boolean(this.media.paused)
              }
          }, {
              key: "stopped",
              get: function() {
                  return Boolean(this.paused && 0 === this.currentTime)
              }
          }, {
              key: "ended",
              get: function() {
                  return Boolean(this.media.ended)
              }
          }, {
              key: "currentTime",
              set: function(e) {
                  if (this.duration) {
                      var t = qc(e) && e > 0;
                      this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log("Seeking to ".concat(this.currentTime, " seconds"))
                  }
              },
              get: function() {
                  return Number(this.media.currentTime)
              }
          }, {
              key: "buffered",
              get: function() {
                  var e = this.media.buffered;
                  return qc(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0
              }
          }, {
              key: "seeking",
              get: function() {
                  return Boolean(this.media.seeking)
              }
          }, {
              key: "duration",
              get: function() {
                  var e = parseFloat(this.config.duration),
                      t = (this.media || {}).duration,
                      n = qc(t) && t !== 1 / 0 ? t : 0;
                  return e || n
              }
          }, {
              key: "volume",
              set: function(e) {
                  var t = e;
                  Hc(t) && (t = Number(t)), qc(t) || (t = this.storage.get("volume")), qc(t) || (t = this.config.volume), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !Zc(e) && this.muted && t > 0 && (this.muted = !1)
              },
              get: function() {
                  return Number(this.media.volume)
              }
          }, {
              key: "muted",
              set: function(e) {
                  var t = e;
                  Uc(t) || (t = this.storage.get("muted")), Uc(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t
              },
              get: function() {
                  return Boolean(this.media.muted)
              }
          }, {
              key: "hasAudio",
              get: function() {
                  return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)
              }
          }, {
              key: "speed",
              set: function(e) {
                  var t = this,
                      n = null;
                  qc(e) && (n = e), qc(n) || (n = this.storage.get("speed")), qc(n) || (n = this.config.speed.selected);
                  var i = this.minimumSpeed,
                      o = this.maximumSpeed;
                  n = function() {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 255;
                      return Math.min(Math.max(e, t), n)
                  }(n, i, o), this.config.speed.selected = n, setTimeout(function() {
                      t.media.playbackRate = n
                  }, 0)
              },
              get: function() {
                  return Number(this.media.playbackRate)
              }
          }, {
              key: "minimumSpeed",
              get: function() {
                  return this.isYouTube ? Math.min.apply(Math, Cs(this.options.speed)) : this.isVimeo ? .5 : .0625
              }
          }, {
              key: "maximumSpeed",
              get: function() {
                  return this.isYouTube ? Math.max.apply(Math, Cs(this.options.speed)) : this.isVimeo ? 2 : 16
              }
          }, {
              key: "quality",
              set: function(e) {
                  var t = this.config.quality,
                      n = this.options.quality;
                  if (n.length) {
                      var i = [!Zc(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(qc),
                          o = !0;
                      if (!n.includes(i)) {
                          var r = function(e, t) {
                              return Wc(e) && e.length ? e.reduce(function(e, n) {
                                  return Math.abs(n - t) < Math.abs(e - t) ? n : e
                              }) : null
                          }(n, i);
                          this.debug.warn("Unsupported quality option: ".concat(i, ", using ").concat(r, " instead")), i = r, o = !1
                      }
                      t.selected = i, this.media.quality = i, o && this.storage.set({
                          quality: i
                      })
                  }
              },
              get: function() {
                  return this.media.quality
              }
          }, {
              key: "loop",
              set: function(e) {
                  var t = Uc(e) ? e : this.config.loop.active;
                  this.config.loop.active = t, this.media.loop = t
              },
              get: function() {
                  return Boolean(this.media.loop)
              }
          }, {
              key: "source",
              set: function(e) {
                  Jh.change.call(this, e)
              },
              get: function() {
                  return this.media.currentSrc
              }
          }, {
              key: "download",
              get: function() {
                  var e = this.config.urls.download;
                  return Kc(e) ? e : this.source
              },
              set: function(e) {
                  Kc(e) && (this.config.urls.download = e, fh.setDownloadUrl.call(this))
              }
          }, {
              key: "poster",
              set: function(e) {
                  this.isVideo ? Eh.setPoster.call(this, e, !1).catch(function() {}) : this.debug.warn("Poster can only be set for video")
              },
              get: function() {
                  return this.isVideo ? this.media.getAttribute("poster") : null
              }
          }, {
              key: "ratio",
              get: function() {
                  if (!this.isVideo) return null;
                  var e = Mu(Ou.call(this));
                  return Wc(e) ? e.join(":") : e
              },
              set: function(e) {
                  this.isVideo ? Hc(e) && Du(e) ? (this.config.ratio = e, Nu.call(this)) : this.debug.error("Invalid aspect ratio specified (".concat(e, ")")) : this.debug.warn("Aspect ratio can only be set for video")
              }
          }, {
              key: "autoplay",
              set: function(e) {
                  var t = Uc(e) ? e : this.config.autoplay;
                  this.config.autoplay = t
              },
              get: function() {
                  return Boolean(this.config.autoplay)
              }
          }, {
              key: "currentTrack",
              set: function(e) {
                  mh.set.call(this, e, !1)
              },
              get: function() {
                  var e = this.captions,
                      t = e.toggled,
                      n = e.currentTrack;
                  return t ? n : -1
              }
          }, {
              key: "language",
              set: function(e) {
                  mh.setLanguage.call(this, e, !1)
              },
              get: function() {
                  return (mh.getCurrentTrack.call(this) || {}).language
              }
          }, {
              key: "pip",
              set: function(e) {
                  if (Cu.pip) {
                      var t = Uc(e) ? e : !this.pip;
                      Bc(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? yh : "inline"), Bc(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture())
                  }
              },
              get: function() {
                  return Cu.pip ? Zc(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === yh : null
              }
          }], [{
              key: "supported",
              value: function(e, t, n) {
                  return Cu.check(e, t, n)
              }
          }, {
              key: "loadSprite",
              value: function(e, t) {
                  return sh(e, t)
              }
          }, {
              key: "setup",
              value: function(t) {
                  var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                      i = null;
                  return Hc(t) ? i = Array.from(document.querySelectorAll(t)) : Vc(t) ? i = Array.from(t) : Wc(t) && (i = t.filter(Xc)), Zc(i) ? null : i.map(function(t) {
                      return new e(t, n)
                  })
              }
          }]), e
      }();
  return ed.defaults = (Gh = vh, JSON.parse(JSON.stringify(Gh))), ed
});