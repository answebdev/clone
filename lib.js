/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
(function (q, m) {
  'function' === typeof define && define.amd
    ? define(m)
    : 'object' === typeof exports
    ? (module.exports = m())
    : (q.Blazy = m());
})(this, function () {
  function q(b) {
    var c = b._util;
    c.elements = E(b.options);
    c.count = c.elements.length;
    c.destroyed &&
      ((c.destroyed = !1),
      b.options.container &&
        l(b.options.container, function (a) {
          n(a, 'scroll', c.validateT);
        }),
      n(window, 'resize', c.saveViewportOffsetT),
      n(window, 'resize', c.validateT),
      n(window, 'scroll', c.validateT));
    m(b);
  }
  function m(b) {
    for (var c = b._util, a = 0; a < c.count; a++) {
      var d = c.elements[a],
        e;
      a: {
        var g = d;
        e = b.options;
        var p = g.getBoundingClientRect();
        if (e.container && y && (g = g.closest(e.containerClass))) {
          g = g.getBoundingClientRect();
          e = r(g, f)
            ? r(p, {
                top: g.top - e.offset,
                right: g.right + e.offset,
                bottom: g.bottom + e.offset,
                left: g.left - e.offset,
              })
            : !1;
          break a;
        }
        e = r(p, f);
      }
      if (e || t(d, b.options.successClass))
        b.load(d), c.elements.splice(a, 1), c.count--, a--;
    }
    0 === c.count && b.destroy();
  }
  function r(b, c) {
    return (
      b.right >= c.left &&
      b.bottom >= c.top &&
      b.left <= c.right &&
      b.top <= c.bottom
    );
  }
  function z(b, c, a) {
    if (
      !t(b, a.successClass) &&
      (c || a.loadInvisible || (0 < b.offsetWidth && 0 < b.offsetHeight))
    )
      if ((c = b.getAttribute(u) || b.getAttribute(a.src))) {
        c = c.split(a.separator);
        var d = c[A && 1 < c.length ? 1 : 0],
          e = b.getAttribute(a.srcset),
          g = 'img' === b.nodeName.toLowerCase(),
          p = (c = b.parentNode) && 'picture' === c.nodeName.toLowerCase();
        if (g || void 0 === b.src) {
          var h = new Image(),
            w = function () {
              a.error && a.error(b, 'invalid');
              v(b, a.errorClass);
              k(h, 'error', w);
              k(h, 'load', f);
            },
            f = function () {
              g
                ? p || B(b, d, e)
                : (b.style.backgroundImage = 'url("' + d + '")');
              x(b, a);
              k(h, 'load', f);
              k(h, 'error', w);
            };
          p &&
            ((h = b),
            l(c.getElementsByTagName('source'), function (b) {
              var c = a.srcset,
                e = b.getAttribute(c);
              e && (b.setAttribute('srcset', e), b.removeAttribute(c));
            }));
          n(h, 'error', w);
          n(h, 'load', f);
          B(h, d, e);
        } else (b.src = d), x(b, a);
      } else
        'video' === b.nodeName.toLowerCase()
          ? (l(b.getElementsByTagName('source'), function (b) {
              var c = a.src,
                e = b.getAttribute(c);
              e && (b.setAttribute('src', e), b.removeAttribute(c));
            }),
            b.load(),
            x(b, a))
          : (a.error && a.error(b, 'missing'), v(b, a.errorClass));
  }
  function x(b, c) {
    v(b, c.successClass);
    c.success && c.success(b);
    b.removeAttribute(c.src);
    b.removeAttribute(c.srcset);
    l(c.breakpoints, function (a) {
      b.removeAttribute(a.src);
    });
  }
  function B(b, c, a) {
    a && b.setAttribute('srcset', a);
    b.src = c;
  }
  function t(b, c) {
    return -1 !== (' ' + b.className + ' ').indexOf(' ' + c + ' ');
  }
  function v(b, c) {
    t(b, c) || (b.className += ' ' + c);
  }
  function E(b) {
    var c = [];
    b = b.root.querySelectorAll(b.selector);
    for (var a = b.length; a--; c.unshift(b[a]));
    return c;
  }
  function C(b) {
    f.bottom =
      (window.innerHeight || document.documentElement.clientHeight) + b;
    f.right = (window.innerWidth || document.documentElement.clientWidth) + b;
  }
  function n(b, c, a) {
    b.attachEvent
      ? b.attachEvent && b.attachEvent('on' + c, a)
      : b.addEventListener(c, a, { capture: !1, passive: !0 });
  }
  function k(b, c, a) {
    b.detachEvent
      ? b.detachEvent && b.detachEvent('on' + c, a)
      : b.removeEventListener(c, a, { capture: !1, passive: !0 });
  }
  function l(b, c) {
    if (b && c) for (var a = b.length, d = 0; d < a && !1 !== c(b[d], d); d++);
  }
  function D(b, c, a) {
    var d = 0;
    return function () {
      var e = +new Date();
      e - d < c || ((d = e), b.apply(a, arguments));
    };
  }
  var u, f, A, y;
  return function (b) {
    if (!document.querySelectorAll) {
      var c = document.createStyleSheet();
      document.querySelectorAll = function (a, b, d, h, f) {
        f = document.all;
        b = [];
        a = a.replace(/\[for\b/gi, '[htmlFor').split(',');
        for (d = a.length; d--; ) {
          c.addRule(a[d], 'k:v');
          for (h = f.length; h--; ) f[h].currentStyle.k && b.push(f[h]);
          c.removeRule(0);
        }
        return b;
      };
    }
    var a = this,
      d = (a._util = {});
    d.elements = [];
    d.destroyed = !0;
    a.options = b || {};
    a.options.error = a.options.error || !1;
    a.options.offset = a.options.offset || 100;
    a.options.root = a.options.root || document;
    a.options.success = a.options.success || !1;
    a.options.selector = a.options.selector || '.b-lazy';
    a.options.separator = a.options.separator || '|';
    a.options.containerClass = a.options.container;
    a.options.container = a.options.containerClass
      ? document.querySelectorAll(a.options.containerClass)
      : !1;
    a.options.errorClass = a.options.errorClass || 'b-error';
    a.options.breakpoints = a.options.breakpoints || !1;
    a.options.loadInvisible = a.options.loadInvisible || !1;
    a.options.successClass = a.options.successClass || 'b-loaded';
    a.options.validateDelay = a.options.validateDelay || 25;
    a.options.saveViewportOffsetDelay = a.options.saveViewportOffsetDelay || 50;
    a.options.srcset = a.options.srcset || 'data-srcset';
    a.options.src = u = a.options.src || 'data-src';
    y = Element.prototype.closest;
    A = 1 < window.devicePixelRatio;
    f = {};
    f.top = 0 - a.options.offset;
    f.left = 0 - a.options.offset;
    a.revalidate = function () {
      q(a);
    };
    a.load = function (a, b) {
      var c = this.options;
      void 0 === a.length
        ? z(a, b, c)
        : l(a, function (a) {
            z(a, b, c);
          });
    };
    a.destroy = function () {
      var a = this._util;
      this.options.container &&
        l(this.options.container, function (b) {
          k(b, 'scroll', a.validateT);
        });
      k(window, 'scroll', a.validateT);
      k(window, 'resize', a.validateT);
      k(window, 'resize', a.saveViewportOffsetT);
      a.count = 0;
      a.elements.length = 0;
      a.destroyed = !0;
    };
    d.validateT = D(
      function () {
        m(a);
      },
      a.options.validateDelay,
      a
    );
    d.saveViewportOffsetT = D(
      function () {
        C(a.options.offset);
      },
      a.options.saveViewportOffsetDelay,
      a
    );
    C(a.options.offset);
    l(a.options.breakpoints, function (a) {
      if (a.width >= window.screen.width) return (u = a.src), !1;
    });
    setTimeout(function () {
      q(a);
    });
  };
});
!(function (e) {
  var t = {};
  function i(n) {
    if (t[n]) return t[n].exports;
    var r = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(r.exports, r, r.exports, i), (r.l = !0), r.exports;
  }
  (i.m = e),
    (i.c = t),
    (i.d = function (e, t, n) {
      i.o(e, t) ||
        Object.defineProperty(e, t, {
          configurable: !1,
          enumerable: !0,
          get: n,
        });
    }),
    (i.r = function (e) {
      Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (i.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return i.d(t, 'a', t), t;
    }),
    (i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (i.p = ''),
    i((i.s = 11));
})([
  function (e, t, i) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
    var n = (function () {
      function e(e, t) {
        for (var i = 0; i < t.length; i++) {
          var n = t[i];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      return function (t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
      };
    })();
    i(9), i(8).polyfill(), i(5);
    var r = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, e);
      }
      return (
        n(e, null, [
          {
            key: 'callAjax',
            value: function (e) {
              var t = this,
                i =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                n = {
                  method: void 0 === i.method ? 'GET' : i.method,
                  headers: { 'Content-Type': 'application/json' },
                };
              return (
                ('POST' !== n.method && 'PUT' !== n.method) ||
                  (n.body = void 0 === i.data ? null : JSON.stringify(i.data)),
                void 0 !== i.cid &&
                  (n.headers.X_CID = void 0 === i.cid ? '' : i.cid),
                void 0 !== i.token &&
                  (n.headers.Authorization =
                    void 0 === i.token ? '' : 'Bearer ' + i.token),
                new Promise(function (i, r) {
                  fetch(e, n)
                    .then(function (e) {
                      if (e.ok) return e.json();
                      t._ajaxError(e);
                    })
                    .then(function (e) {
                      i(e);
                    })
                    .catch(function (e) {
                      r(e);
                    });
                })
              );
            },
          },
          {
            key: '_ajaxError',
            value: function (e) {
              switch (e.status) {
                case 400:
                  return Promise.reject(
                    new Error(
                      'Bad Request The request could not be understood or was missing required parameters.'
                    )
                  );
                case 401:
                  return Promise.reject(
                    new Error(
                      "Unauthorized Authentication failed or user doesn't have permissions for requested operation."
                    )
                  );
                default:
                  return Promise.reject(new Error(e.statusText));
              }
            },
          },
          {
            key: 'getPaymentTypes',
            value: function () {
              return ['CreditCard', 'PayPal', 'Boleto'];
            },
          },
          {
            key: 'getParameter',
            value: function (e) {
              var t = location.search.match(
                new RegExp('[?&]' + e + '=([^&]*)(&?)', 'i')
              );
              return t ? t[1] : null;
            },
          },
          {
            key: 'makeClientFingerPrint',
            value: function () {
              for (
                var e = new ClientJS(),
                  t = '',
                  i = e.getBrowserData().ua,
                  n = e.getCanvasPrint(),
                  r =
                    '&CustomFingerprint=' +
                    e.getCustomFingerprint(i, n).toString(),
                  o = '',
                  s = [
                    { name: 'SoftwareVersion', fn: 'getSoftwareVersion' },
                    { name: 'Fingerprint', fn: 'getFingerprint' },
                    { name: 'UserAgentLowerCase', fn: 'getUserAgentLowerCase' },
                    { name: 'Browser', fn: 'getBrowser' },
                    { name: 'BrowserVersion', fn: 'getBrowserVersion' },
                    { name: 'Engine', fn: 'getEngine' },
                    { name: 'OS', fn: 'getOS' },
                    { name: 'OSVersion', fn: 'getOSVersion' },
                    { name: 'Device', fn: 'getDevice' },
                    { name: 'DeviceType', fn: 'getDeviceType' },
                    { name: 'DeviceVendor', fn: 'getDeviceVendor' },
                    { name: 'CPU', fn: 'getCPU' },
                    { name: 'isMobile', fn: 'isMobile' },
                    { name: 'isMobileMajor', fn: 'isMobileMajor' },
                    { name: 'isMobileAndroid', fn: 'isMobileAndroid' },
                    { name: 'isMobileOpera', fn: 'isMobileOpera' },
                    { name: 'isMobileWindows', fn: 'isMobileWindows' },
                    { name: 'isMobileBlackBerry', fn: 'isMobileBlackBerry' },
                    { name: 'isMobileIOS', fn: 'isMobileIOS' },
                    { name: 'isIphone', fn: 'isIphone' },
                    { name: 'isIpad', fn: 'isIpad' },
                    { name: 'isIpod', fn: 'isIpod' },
                    { name: 'ScreenPrint', fn: 'getScreenPrint' },
                    { name: 'ColorDepth', fn: 'getColorDepth' },
                    { name: 'CurrentResolution', fn: 'getCurrentResolution' },
                    {
                      name: 'AvailableResolution',
                      fn: 'getAvailableResolution',
                    },
                    { name: 'DeviceXDPI', fn: 'getDeviceXDPI' },
                    { name: 'DeviceYDPI', fn: 'getDeviceYDPI' },
                    { name: 'Plugins', fn: 'getPlugins' },
                    { name: 'isJava', fn: 'isJava' },
                    { name: 'JavaVersion', fn: 'getJavaVersion' },
                    { name: 'isFlash', fn: 'isFlash' },
                    { name: 'FlashVersion', fn: 'getFlashVersion' },
                    { name: 'isSilverlight', fn: 'isSilverlight' },
                    { name: 'SilverlightVersion', fn: 'getSilverlightVersion' },
                    { name: 'isMimeTypes', fn: 'isMimeTypes' },
                    { name: 'MimeTypes', fn: 'getMimeTypes' },
                    { name: 'Fonts', fn: 'getFonts' },
                    { name: 'isLocalStorage', fn: 'isLocalStorage' },
                    { name: 'isSessionStorage', fn: 'isSessionStorage' },
                    { name: 'isCookie', fn: 'isCookie' },
                    { name: 'TimeZone', fn: 'getTimeZone' },
                    { name: 'Language', fn: 'getLanguage' },
                    { name: 'SystemLanguage', fn: 'getSystemLanguage' },
                    { name: 'isCanvas', fn: 'isCanvas' },
                  ],
                  a = 0;
                a <= s.length - 1;
                a++
              ) {
                var l = e[s[a].fn](),
                  u = s[a].name;
                (l = l ? l.toString() : 'n/a'),
                  (o = o + '&' + u + '=' + encodeURIComponent(l));
              }
              o = (o += r).substring(1);
              try {
                t = window.btoa(o);
              } catch (e) {
                console.log('bs64 errr');
              }
              return {
                referringUrl: document.referrer,
                landingUrl: window.location.href,
                userStringData64: t,
              };
            },
          },
          {
            key: 'validateOrderData',
            value: function (e, t) {
              if (
                (this._isNullOrEmpty(e.shippingMethodId) &&
                  this._logOrderErrorData(
                    'shippingMethodId field is not valid!'
                  ),
                this._isNullOrEmpty(e.productId) &&
                  this._logOrderErrorData('productId field is not valid!'),
                this._isNullOrEmpty(e.funnelBoxId))
              )
                return this._logOrderErrorData(
                  'funnelBoxId field is not valid!'
                );
              if (
                (this._isNullOrEmpty(t) &&
                  this._logOrderErrorData('paymentType field is not valid!'),
                'paypal' === t.toLowerCase())
              )
                void 0 === e.payment.paymentProcessorId &&
                  (e.payment = { paymentProcessorId: 5 }),
                  (e.shippingAddress = null);
              else if ('boleto' === t.toLowerCase())
                (e.payment = { paymentProcessorId: 25 }),
                  (e.shippingAddress = null);
              else if ('creditcard' === t.toLowerCase()) {
                if (
                  (this._isNullOrEmpty(e.customer.email) &&
                    this._logOrderErrorData(
                      'customer email field is not valid!'
                    ),
                  this._isNullOrEmpty(e.customer.firstName) &&
                    this._isNullOrEmpty(e.shippingAddress.firstName) &&
                    this._logOrderErrorData('firstname field is not valid!'),
                  this._isNullOrEmpty(e.customer.lastName) &&
                    this._isNullOrEmpty(e.shippingAddress.lastName) &&
                    this._logOrderErrorData('lastname field is not valid!'),
                  this._isNullOrEmpty(e.payment.name) &&
                    this._isNullOrEmpty(e.payment.cardId))
                ) {
                  var i = this._isNullOrEmpty(e.customer.firstName)
                      ? e.shippingAddress.firstName
                      : e.customer.firstName,
                    n = this._isNullOrEmpty(e.customer.lastName)
                      ? e.shippingAddress.lastName
                      : e.customer.lastName;
                  e.payment.name = i + ' ' + n;
                }
                this._isNullOrEmpty(e.payment.creditcard) &&
                  this._logOrderErrorData('creditcard field is not valid!'),
                  this._isNullOrEmpty(e.payment.creditCardBrand) &&
                    this._logOrderErrorData(
                      'creditCardBrand field is not valid!'
                    ),
                  this._isNullOrEmpty(e.payment.expiration) &&
                    this._logOrderErrorData('expiration field is not valid!'),
                  this._isNullOrEmpty(e.payment.cvv) &&
                    this._logOrderErrorData('cvv field is not valid!'),
                  !1 === e.useShippingAddressForBilling &&
                    null == e.billingAddress &&
                    this._logOrderErrorData(
                      'useShippingAddressForBilling equals false and billingAddress object is not valid!'
                    ),
                  this._isNullOrEmpty(e.shippingAddress.firstName) &&
                    (e.shippingAddress.firstName = e.customer.firstName),
                  this._isNullOrEmpty(e.shippingAddress.lastName) &&
                    (e.shippingAddress.lastName = e.customer.lastName),
                  this._isNullOrEmpty(e.shippingAddress.address1) &&
                    this._logOrderErrorData(
                      'shippingAddres address1 field is not valid!'
                    ),
                  this._isNullOrEmpty(e.shippingAddress.city) &&
                    this._logOrderErrorData(
                      'shippingAddres city field is not valid!'
                    ),
                  this._isNullOrEmpty(e.shippingAddress.countryCode) &&
                    this._logOrderErrorData(
                      'shippingAddres countryCode field is not valid!'
                    ),
                  (this._isNullOrEmpty(e.shippingAddress.state) ||
                    'N/A' == e.shippingAddress.state ||
                    '-' == e.shippingAddress.state) &&
                    (e.shippingAddress.state = e.shippingAddress.countryCode),
                  e.useShippingAddressForBilling ||
                    (this._isNullOrEmpty(e.billingAddress.firstName) &&
                      (e.billingAddress.firstName =
                        e.shippingAddress.firstName),
                    this._isNullOrEmpty(e.billingAddress.lastName) &&
                      (e.billingAddress.lastName = e.shippingAddress.lastName),
                    this._isNullOrEmpty(e.billingAddress.address1) &&
                      this._logOrderErrorData(
                        'billingAddress address1 field is not valid!'
                      ),
                    this._isNullOrEmpty(e.billingAddress.city) &&
                      this._logOrderErrorData(
                        'billingAddress city field is not valid!'
                      ),
                    this._isNullOrEmpty(e.billingAddress.countryCode) &&
                      this._logOrderErrorData(
                        'billingAddress countryCode field is not valid!'
                      ),
                    (this._isNullOrEmpty(e.billingAddress.state) ||
                      'N/A' == e.billingAddress.state ||
                      '-' == e.billingAddress.state) &&
                      (e.billingAddress.state = e.billingAddress.countryCode));
              } else
                ('afterpay' !== t.toLowerCase() &&
                  'stripe' !== t.toLowerCase() &&
                  'ideal' !== t.toLowerCase()) ||
                  (this._isNullOrEmpty(e.customer.email) &&
                    this._logOrderErrorData(
                      'customer email field is not valid!'
                    ),
                  this._isNullOrEmpty(e.shippingAddress.firstName) &&
                    (e.shippingAddress.firstName = e.customer.firstName),
                  this._isNullOrEmpty(e.shippingAddress.lastName) &&
                    (e.shippingAddress.lastName = e.customer.lastName),
                  this._isNullOrEmpty(e.shippingAddress.address1) &&
                    this._logOrderErrorData(
                      'shippingAddres address1 field is not valid!'
                    ),
                  this._isNullOrEmpty(e.shippingAddress.city) &&
                    this._logOrderErrorData(
                      'shippingAddres city field is not valid!'
                    ),
                  this._isNullOrEmpty(e.shippingAddress.countryCode) &&
                    this._logOrderErrorData(
                      'shippingAddres countryCode field is not valid!'
                    ),
                  (this._isNullOrEmpty(e.shippingAddress.state) ||
                    'N/A' == e.shippingAddress.state ||
                    '-' == e.shippingAddress.state) &&
                    (e.shippingAddress.state = e.shippingAddress.countryCode));
              return (
                e.payment.callBackParam ||
                  (location.href.indexOf('?') > 0 &&
                    (e.payment.callBackParam = encodeURI(
                      location.href.substr(location.href.indexOf('?'))
                    ))),
                e
              );
            },
          },
          {
            key: '_logOrderErrorData',
            value: function (e) {
              return console.log(e), null;
            },
          },
          {
            key: '_isNullOrEmpty',
            value: function (e) {
              return null == e || void 0 === e || '' === e.toString().trim();
            },
          },
          {
            key: 'antiFraud',
            value: function (e) {
              fetch(
                'https://emanage-prod-antifraud-api.azurewebsites.net/api/risk/kount/collectorConfig'
              )
                .then(function (e) {
                  return e.json();
                })
                .then(function (t) {
                  e(t);
                })
                .catch(function (e) {
                  return console.log(e);
                });
            },
          },
          {
            key: 'localStorage',
            value: (function (e) {
              function t() {
                return e.apply(this, arguments);
              }
              return (
                (t.toString = function () {
                  return e.toString();
                }),
                t
              );
            })(function () {
              return {
                get: function (e) {
                  return 'undefined' != typeof Storage
                    ? window.localStorage.getItem(e)
                    : (console.log('Sorry! No Web Storage support ....'), null);
                },
                set: function (e, t) {
                  'undefined' != typeof Storage
                    ? window.localStorage.setItem(e, t)
                    : console.log('Sorry! No Web Storage support ...');
                },
                remove: function (e) {
                  localStorage.removeItem(e);
                },
              };
            }),
          },
          {
            key: 'redirectPage',
            value: function (e, t) {
              var i =
                location.search.length > 0 ? location.search.substr(1) : '';
              return (
                e.indexOf('?') > 0
                  ? (e += '' !== i ? '&' + i : '')
                  : (e += '' !== i ? '?' + i : ''),
                '_blank' == t ? window.open(e) : (window.location = e),
                !1
              );
            },
          },
        ]),
        e
      );
    })();
    t.default = r;
  },
  ,
  function (e, t, i) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
    var n,
      r = (function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function (t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t;
        };
      })(),
      o = i(0),
      s = (n = o) && n.__esModule ? n : { default: n };
    var a = (function () {
      function e() {
        var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
          i =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
          n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          r = arguments[3];
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, e),
          (this.webkey = t),
          (this.cid = i),
          (this.isTest = n),
          (this.baseAPIEndpoint =
            void 0 !== r ? r : 'https://sales-prod.tryemanagecrm.com/api');
      }
      return (
        r(e, [
          {
            key: 'placeOrder',
            value: function (e, t, i) {
              if (e && '' !== e) {
                var n = this.baseAPIEndpoint + '/orders/' + this.webkey;
                this.isTest &&
                  (n.indexOf('?') > 0
                    ? (n += '&behaviorId=2')
                    : (n += '?behaviorId=2'));
                var r = this._beforeSubmitMainOrder(e, t);
                null != r
                  ? s.default
                      .callAjax(n, { cid: this.cid, method: 'POST', data: r })
                      .then(function (e) {
                        'function' == typeof i && i(e);
                      })
                      .catch(function (e) {
                        'function' == typeof i && i(e);
                      })
                  : i(null);
              } else console.log('Please provide valid order data!');
            },
          },
          {
            key: 'placeOrderWithUrl',
            value: function (e, t, i, n) {
              if (t && '' !== t) {
                this.isTest &&
                  (e.indexOf('?') > 0
                    ? (e += '&behaviorId=2')
                    : (e += '?behaviorId=2'));
                var r = this._beforeSubmitMainOrder(t, i);
                null != r
                  ? s.default
                      .callAjax(e, { cid: this.cid, method: 'POST', data: r })
                      .then(function (e) {
                        'function' == typeof n && n(e);
                      })
                      .catch(function (e) {
                        'function' == typeof n && n(e);
                      })
                  : n(null);
              } else console.log('Please provide valid order data!');
            },
          },
          {
            key: 'placeUpsellOrder',
            value: function (e, t, i) {
              if (e && '' !== e) {
                var n = this.baseAPIEndpoint + '/orders/' + t;
                this.isTest &&
                  (n.indexOf('?') > 0
                    ? (n += '&behaviorId=2')
                    : (n += '?behaviorId=2'));
                var r = this._beforeSubmitUpsellOrder(e);
                null != r
                  ? s.default
                      .callAjax(n, { cid: this.cid, method: 'POST', data: r })
                      .then(function (e) {
                        'function' == typeof i && i(e);
                      })
                      .catch(function (e) {
                        'function' == typeof i && i(e);
                      })
                  : i(null);
              } else console.log('Please provide valid order data!');
            },
          },
          {
            key: 'getRelatedOrders',
            value: function (e, t, i) {
              if (e && '' !== e.toString().trim()) {
                var n =
                  this.baseAPIEndpoint + '/orders/' + e + '/relatedorders';
                s.default
                  .callAjax(n, { cid: this.cid, token: i })
                  .then(function (e) {
                    'function' == typeof t && t(e);
                  })
                  .catch(function (e) {
                    'function' == typeof t && t(e);
                  });
              } else console.log('Please enter a valid number order!');
            },
          },
          {
            key: 'updateUpsellsStatus',
            value: function (e, t) {
              if (e && '' !== e.toString().trim()) {
                var i = this.baseAPIEndpoint + '/orders/upsell/' + e;
                s.default
                  .callAjax(i, { cid: this.cid, method: 'POST' })
                  .then(function (e) {
                    'function' == typeof t && t(e);
                  })
                  .catch(function (e) {
                    'function' == typeof t && t(e);
                  });
              } else console.log('Please enter a valid number order!');
            },
          },
          {
            key: '_isNullOrEmpty',
            value: function (e) {
              return void 0 == e || null == e || '' == e.toString();
            },
          },
          {
            key: '_beforeSubmitMainOrder',
            value: function (e, t) {
              var i = this,
                n = void 0;
              try {
                n = JSON.parse(s.default.localStorage().get('antiFraud'));
              } catch (e) {
                console.log(e), (n = null);
              }
              var r = {
                  couponCode: '',
                  shippingMethodId: '',
                  comment: '',
                  useShippingAddressForBilling: !0,
                  productId: '',
                  customer: {},
                  payment: {},
                  shippingAddress: {},
                  billingAddress: null,
                  analyticsV2: s.default.makeClientFingerPrint(),
                  funnelBoxId: '',
                  antiFraud: { sessionId: n ? n.sessionId : '' },
                  fingerPrintId: window._EA_ID ? window._EA_ID : '',
                },
                o = Object.assign(r, e);
              try {
                var a = window.localStorage.getItem('campproducts');
                if (a) {
                  var l = (a = JSON.parse(a)).camps.filter(function (e) {
                    return e[i.webkey];
                  });
                  if (l && l.length > 0) {
                    var u = l[0][this.webkey].location;
                    o.customer.IP || (o.customer.IP = u.ip),
                      o.customer.Location ||
                        (o.customer.Location = {
                          CountryCode: u.countryCode,
                          RegionCode: u.regionCode,
                          City: u.city,
                          ZipCode: u.zipCode,
                        });
                  }
                }
              } catch (e) {
                console.log('can not get location: ', e);
              }
              return s.default.validateOrderData(o, t);
            },
          },
          {
            key: '_beforeSubmitUpsellOrder',
            value: function (e) {
              var t = void 0;
              try {
                t = JSON.parse(s.default.localStorage().get('antiFraud'));
              } catch (e) {
                console.log(e), (t = null);
              }
              var i = {
                  campaignUpsell: {
                    webKey: this.webkey,
                    relatedOrderNumber: '',
                  },
                  shippingMethodId: '',
                  comment: '',
                  useShippingAddressForBilling: !0,
                  productId: '',
                  customer: {},
                  payment: {},
                  shippingAddress: {},
                  funnelBoxId: '',
                  antiFraud: { sessionId: t ? t.sessionId : '' },
                },
                n = Object.assign(i, e);
              try {
                var r = window.localStorage.getItem('campproducts'),
                  o = window.localStorage.getItem('mainWebKey');
                if (r && o) {
                  var a = (r = JSON.parse(r)).camps.filter(function (e) {
                    return e[o];
                  });
                  if (a && a.length > 0) {
                    var l = a[0][o].location;
                    n.customer.IP || (n.customer.IP = l.ip),
                      n.customer.Location ||
                        (n.customer.Location = {
                          CountryCode: l.countryCode,
                          RegionCode: l.regionCode,
                          City: l.city,
                          ZipCode: l.zipCode,
                        });
                  }
                }
              } catch (e) {
                console.log('can not get location: ', e);
              }
              return n.productId && '' !== n.productId && 0 !== n.productId
                ? n
                : null;
            },
          },
          {
            key: 'checkPaypalApprove',
            value: function (e, t, i) {
              if (e && '' !== e)
                if (t && '' !== t) {
                  var n =
                    this.baseAPIEndpoint +
                    '/orders/' +
                    this.webkey +
                    '?trackingNumber=' +
                    e;
                  this.isTest &&
                    (n.indexOf('?') > 0
                      ? (n += '&isTest=true')
                      : (n += '?isTest=true')),
                    s.default
                      .callAjax(n, { cid: this.cid, method: 'PUT', data: t })
                      .then(function (e) {
                        'function' == typeof i && i(e);
                      })
                      .catch(function (e) {
                        'function' == typeof i && i(e);
                      });
                } else console.log('Please provide valid post data!');
              else console.log('Please provide valid tracking number!');
            },
          },
          {
            key: 'checkAfterpayApprove',
            value: function (e, t, i) {
              if (e && '' !== e)
                if (t && '' !== t) {
                  var n =
                    this.baseAPIEndpoint +
                    '/orders/' +
                    this.webkey +
                    '?trackingNumber=' +
                    e;
                  this.isTest &&
                    (n.indexOf('?') > 0
                      ? (n += '&isTest=true')
                      : (n += '?isTest=true')),
                    s.default
                      .callAjax(n, { cid: this.cid, method: 'PUT', data: t })
                      .then(function (e) {
                        'function' == typeof i && i(e);
                      })
                      .catch(function (e) {
                        'function' == typeof i && i(e);
                      });
                } else console.log('Please provide valid post data!');
              else console.log('Please provide valid tracking number!');
            },
          },
          {
            key: 'confirmGoogleApplePay',
            value: function (e, t, i, n) {
              if (e && '' !== e)
                if (t && '' !== t)
                  if (i && '' !== i) {
                    var r =
                      'https://sales-prod.tryemanagecrm.com/api/orders/' +
                      this.webkey +
                      '?source=' +
                      t +
                      '&trackingNumber=' +
                      e +
                      '&midId=' +
                      i;
                    this.isTest &&
                      (r.indexOf('?') > 0
                        ? (r += '&isTest=true')
                        : (r += '?isTest=true')),
                      s.default
                        .callAjax(r, {
                          cid: this.cid,
                          method: 'PUT',
                          data: { PaymentProcessorId: 54 },
                        })
                        .then(function (e) {
                          'function' == typeof n && n(e);
                        })
                        .catch(function (e) {
                          'function' == typeof n && n(e);
                        });
                  } else console.log('Please provide valid midId!');
                else console.log('Please provide valid source id!');
              else console.log('Please provide valid tracking number!');
            },
          },
          {
            key: 'submitEmailToServerFp',
            value: function (e) {
              var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : '',
                i =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 4,
                n = arguments[3],
                r = this.baseAPIEndpoint + '/customers/' + this.webkey,
                o = {
                  email: e,
                  customerIdentificationTypeId: i,
                  customerIdentificationValue: t,
                  analyticsV2: s.default.makeClientFingerPrint(),
                };
              s.default
                .callAjax(r, { cid: this.cid, method: 'POST', data: o })
                .then(function (e) {
                  'function' == typeof n && n(null, e);
                })
                .catch(function (e) {
                  'function' == typeof n && n(e, null);
                });
            },
          },
          {
            key: 'submitEmailToLeadgen',
            value: function (e, t) {
              if (e && void 0 !== e.email) {
                var i = this.baseAPIEndpoint + '/leadgens/' + this.webkey;
                (e.analyticsV2 = s.default.makeClientFingerPrint()),
                  s.default
                    .callAjax(i, { cid: this.cid, method: 'POST', data: e })
                    .then(function (e) {
                      'function' == typeof t && t(null, e);
                    })
                    .catch(function (e) {
                      'function' == typeof t && t(e, null);
                    });
              }
            },
          },
          {
            key: 'getMidAndPrn',
            value: function (e) {
              var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 54,
                i =
                  this.baseAPIEndpoint +
                  '/campaigns/' +
                  this.webkey +
                  '/' +
                  t +
                  '/mid';
              this.isTest &&
                (i.indexOf('?') > 0
                  ? (i += '&isTest=true')
                  : (i += '?isTest=true')),
                s.default
                  .callAjax(i, { cid: this.cid })
                  .then(function (t) {
                    'function' == typeof e && e(t);
                  })
                  .catch(function (t) {
                    'function' == typeof e && e(t);
                  });
            },
          },
        ]),
        e
      );
    })();
    t.default = a;
  },
  function (e, t, i) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
    var n,
      r = (function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function (t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t;
        };
      })(),
      o = i(0),
      s = (n = o) && n.__esModule ? n : { default: n };
    var a = (function () {
      function e() {
        var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
          i =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
          n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          r = arguments[3];
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, e),
          (this.webkey = t),
          (this.cid = i),
          (this.isTest = n),
          (this.baseAPIEndpoint =
            void 0 !== r ? r : 'https://websales-api.tryemanagecrm.com/api');
      }
      return (
        r(e, [
          {
            key: 'getUpsells',
            value: function (e) {
              s.default
                .callAjax(
                  this.baseAPIEndpoint +
                    '/campaigns/' +
                    this.webkey +
                    '/upsells',
                  { cid: this.cid }
                )
                .then(function (t) {
                  'function' == typeof e && e(t);
                })
                .catch(function (t) {
                  'function' == typeof e && e(t);
                });
            },
          },
          {
            key: 'getLocation',
            value: function (e) {
              s.default
                .callAjax(
                  this.baseAPIEndpoint +
                    '/campaigns/' +
                    this.webkey +
                    '/customers/location',
                  { cid: this.cid }
                )
                .then(function (t) {
                  'function' == typeof e && e(t);
                })
                .catch(function (t) {
                  'function' == typeof e && e(t);
                });
            },
          },
          {
            key: 'getCountries',
            value: function (e) {
              var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : null,
                i =
                  t && '' !== t
                    ? this.baseAPIEndpoint +
                      '/campaigns/' +
                      this.webkey +
                      '/countries/' +
                      t
                    : this.baseAPIEndpoint +
                      '/campaigns/' +
                      this.webkey +
                      '/countries';
              s.default
                .callAjax(i, { cid: this.cid })
                .then(function (t) {
                  'function' == typeof e && e(t);
                })
                .catch(function (t) {
                  'function' == typeof e && e(t);
                });
            },
          },
          {
            key: 'getCountryStates',
            value: function (e, t) {
              var i =
                'https://cdn-sgn.dfowebsys-h01.com/states/' +
                e.toLowerCase() +
                '.json';
              fetch(i)
                .then(function (e) {
                  if (e.ok) return e.json();
                })
                .then(function (e) {
                  'function' == typeof t && t(e);
                })
                .catch(function (e) {
                  'function' == typeof t && t(e);
                });
            },
          },
          {
            key: 'getProducts',
            value: function (e) {
              var t =
                this.baseAPIEndpoint +
                '/campaigns/' +
                this.webkey +
                '/products/prices';
              s.default
                .callAjax(t, { cid: this.cid })
                .then(function (t) {
                  'function' == typeof e && e(t);
                })
                .catch(function (t) {
                  'function' == typeof e && e(t);
                });
            },
          },
          {
            key: 'getAllMiniUpsells',
            value: function (e) {
              var t =
                'https://sales-api.tryemanagecrm.com/api/campaigns/' +
                this.webkey +
                '/products/all/miniupsells';
              s.default
                .callAjax(t, { cid: this.cid })
                .then(function (t) {
                  'function' == typeof e && e(t);
                })
                .catch(function (t) {
                  'function' == typeof e && e(t);
                });
            },
          },
          {
            key: 'getMiniUpsellsByProductId',
            value: function (e, t) {
              var i =
                'https://sales-api.tryemanagecrm.com/api/campaigns/' +
                this.webkey +
                '/products/' +
                e +
                '/miniupsells';
              s.default
                .callAjax(i, { cid: this.cid })
                .then(function (e) {
                  'function' == typeof t && t(e);
                })
                .catch(function (e) {
                  'function' == typeof t && t(e);
                });
            },
          },
        ]),
        e
      );
    })();
    t.default = a;
  },
  function (e, t, i) {
    'use strict';
    i.r(t),
      i.d(t, 'Headers', function () {
        return u;
      }),
      i.d(t, 'Request', function () {
        return g;
      }),
      i.d(t, 'Response', function () {
        return y;
      }),
      i.d(t, 'DOMException', function () {
        return w;
      }),
      i.d(t, 'fetch', function () {
        return A;
      });
    var n = {
      searchParams: 'URLSearchParams' in self,
      iterable: 'Symbol' in self && 'iterator' in Symbol,
      blob:
        'FileReader' in self &&
        'Blob' in self &&
        (function () {
          try {
            return new Blob(), !0;
          } catch (e) {
            return !1;
          }
        })(),
      formData: 'FormData' in self,
      arrayBuffer: 'ArrayBuffer' in self,
    };
    if (n.arrayBuffer)
      var r = [
          '[object Int8Array]',
          '[object Uint8Array]',
          '[object Uint8ClampedArray]',
          '[object Int16Array]',
          '[object Uint16Array]',
          '[object Int32Array]',
          '[object Uint32Array]',
          '[object Float32Array]',
          '[object Float64Array]',
        ],
        o =
          ArrayBuffer.isView ||
          function (e) {
            return e && r.indexOf(Object.prototype.toString.call(e)) > -1;
          };
    function s(e) {
      if (
        ('string' != typeof e && (e = String(e)),
        /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))
      )
        throw new TypeError('Invalid character in header field name');
      return e.toLowerCase();
    }
    function a(e) {
      return 'string' != typeof e && (e = String(e)), e;
    }
    function l(e) {
      var t = {
        next: function () {
          var t = e.shift();
          return { done: void 0 === t, value: t };
        },
      };
      return (
        n.iterable &&
          (t[Symbol.iterator] = function () {
            return t;
          }),
        t
      );
    }
    function u(e) {
      (this.map = {}),
        e instanceof u
          ? e.forEach(function (e, t) {
              this.append(t, e);
            }, this)
          : Array.isArray(e)
          ? e.forEach(function (e) {
              this.append(e[0], e[1]);
            }, this)
          : e &&
            Object.getOwnPropertyNames(e).forEach(function (t) {
              this.append(t, e[t]);
            }, this);
    }
    function c(e) {
      if (e.bodyUsed) return Promise.reject(new TypeError('Already read'));
      e.bodyUsed = !0;
    }
    function d(e) {
      return new Promise(function (t, i) {
        (e.onload = function () {
          t(e.result);
        }),
          (e.onerror = function () {
            i(e.error);
          });
      });
    }
    function h(e) {
      var t = new FileReader(),
        i = d(t);
      return t.readAsArrayBuffer(e), i;
    }
    function f(e) {
      if (e.slice) return e.slice(0);
      var t = new Uint8Array(e.byteLength);
      return t.set(new Uint8Array(e)), t.buffer;
    }
    function p() {
      return (
        (this.bodyUsed = !1),
        (this._initBody = function (e) {
          var t;
          (this._bodyInit = e),
            e
              ? 'string' == typeof e
                ? (this._bodyText = e)
                : n.blob && Blob.prototype.isPrototypeOf(e)
                ? (this._bodyBlob = e)
                : n.formData && FormData.prototype.isPrototypeOf(e)
                ? (this._bodyFormData = e)
                : n.searchParams && URLSearchParams.prototype.isPrototypeOf(e)
                ? (this._bodyText = e.toString())
                : n.arrayBuffer &&
                  n.blob &&
                  (t = e) &&
                  DataView.prototype.isPrototypeOf(t)
                ? ((this._bodyArrayBuffer = f(e.buffer)),
                  (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                : n.arrayBuffer &&
                  (ArrayBuffer.prototype.isPrototypeOf(e) || o(e))
                ? (this._bodyArrayBuffer = f(e))
                : (this._bodyText = e = Object.prototype.toString.call(e))
              : (this._bodyText = ''),
            this.headers.get('content-type') ||
              ('string' == typeof e
                ? this.headers.set('content-type', 'text/plain;charset=UTF-8')
                : this._bodyBlob && this._bodyBlob.type
                ? this.headers.set('content-type', this._bodyBlob.type)
                : n.searchParams &&
                  URLSearchParams.prototype.isPrototypeOf(e) &&
                  this.headers.set(
                    'content-type',
                    'application/x-www-form-urlencoded;charset=UTF-8'
                  ));
        }),
        n.blob &&
          ((this.blob = function () {
            var e = c(this);
            if (e) return e;
            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData)
              throw new Error('could not read FormData body as blob');
            return Promise.resolve(new Blob([this._bodyText]));
          }),
          (this.arrayBuffer = function () {
            return this._bodyArrayBuffer
              ? c(this) || Promise.resolve(this._bodyArrayBuffer)
              : this.blob().then(h);
          })),
        (this.text = function () {
          var e,
            t,
            i,
            n = c(this);
          if (n) return n;
          if (this._bodyBlob)
            return (
              (e = this._bodyBlob),
              (t = new FileReader()),
              (i = d(t)),
              t.readAsText(e),
              i
            );
          if (this._bodyArrayBuffer)
            return Promise.resolve(
              (function (e) {
                for (
                  var t = new Uint8Array(e), i = new Array(t.length), n = 0;
                  n < t.length;
                  n++
                )
                  i[n] = String.fromCharCode(t[n]);
                return i.join('');
              })(this._bodyArrayBuffer)
            );
          if (this._bodyFormData)
            throw new Error('could not read FormData body as text');
          return Promise.resolve(this._bodyText);
        }),
        n.formData &&
          (this.formData = function () {
            return this.text().then(v);
          }),
        (this.json = function () {
          return this.text().then(JSON.parse);
        }),
        this
      );
    }
    (u.prototype.append = function (e, t) {
      (e = s(e)), (t = a(t));
      var i = this.map[e];
      this.map[e] = i ? i + ', ' + t : t;
    }),
      (u.prototype.delete = function (e) {
        delete this.map[s(e)];
      }),
      (u.prototype.get = function (e) {
        return (e = s(e)), this.has(e) ? this.map[e] : null;
      }),
      (u.prototype.has = function (e) {
        return this.map.hasOwnProperty(s(e));
      }),
      (u.prototype.set = function (e, t) {
        this.map[s(e)] = a(t);
      }),
      (u.prototype.forEach = function (e, t) {
        for (var i in this.map)
          this.map.hasOwnProperty(i) && e.call(t, this.map[i], i, this);
      }),
      (u.prototype.keys = function () {
        var e = [];
        return (
          this.forEach(function (t, i) {
            e.push(i);
          }),
          l(e)
        );
      }),
      (u.prototype.values = function () {
        var e = [];
        return (
          this.forEach(function (t) {
            e.push(t);
          }),
          l(e)
        );
      }),
      (u.prototype.entries = function () {
        var e = [];
        return (
          this.forEach(function (t, i) {
            e.push([i, t]);
          }),
          l(e)
        );
      }),
      n.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries);
    var m = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
    function g(e, t) {
      var i,
        n,
        r = (t = t || {}).body;
      if (e instanceof g) {
        if (e.bodyUsed) throw new TypeError('Already read');
        (this.url = e.url),
          (this.credentials = e.credentials),
          t.headers || (this.headers = new u(e.headers)),
          (this.method = e.method),
          (this.mode = e.mode),
          (this.signal = e.signal),
          r || null == e._bodyInit || ((r = e._bodyInit), (e.bodyUsed = !0));
      } else this.url = String(e);
      if (
        ((this.credentials =
          t.credentials || this.credentials || 'same-origin'),
        (!t.headers && this.headers) || (this.headers = new u(t.headers)),
        (this.method =
          ((i = t.method || this.method || 'GET'),
          (n = i.toUpperCase()),
          m.indexOf(n) > -1 ? n : i)),
        (this.mode = t.mode || this.mode || null),
        (this.signal = t.signal || this.signal),
        (this.referrer = null),
        ('GET' === this.method || 'HEAD' === this.method) && r)
      )
        throw new TypeError('Body not allowed for GET or HEAD requests');
      this._initBody(r);
    }
    function v(e) {
      var t = new FormData();
      return (
        e
          .trim()
          .split('&')
          .forEach(function (e) {
            if (e) {
              var i = e.split('='),
                n = i.shift().replace(/\+/g, ' '),
                r = i.join('=').replace(/\+/g, ' ');
              t.append(decodeURIComponent(n), decodeURIComponent(r));
            }
          }),
        t
      );
    }
    function y(e, t) {
      t || (t = {}),
        (this.type = 'default'),
        (this.status = void 0 === t.status ? 200 : t.status),
        (this.ok = this.status >= 200 && this.status < 300),
        (this.statusText = 'statusText' in t ? t.statusText : 'OK'),
        (this.headers = new u(t.headers)),
        (this.url = t.url || ''),
        this._initBody(e);
    }
    (g.prototype.clone = function () {
      return new g(this, { body: this._bodyInit });
    }),
      p.call(g.prototype),
      p.call(y.prototype),
      (y.prototype.clone = function () {
        return new y(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new u(this.headers),
          url: this.url,
        });
      }),
      (y.error = function () {
        var e = new y(null, { status: 0, statusText: '' });
        return (e.type = 'error'), e;
      });
    var b = [301, 302, 303, 307, 308];
    y.redirect = function (e, t) {
      if (-1 === b.indexOf(t)) throw new RangeError('Invalid status code');
      return new y(null, { status: t, headers: { location: e } });
    };
    var w = self.DOMException;
    try {
      new w();
    } catch (e) {
      ((w = function (e, t) {
        (this.message = e), (this.name = t);
        var i = Error(e);
        this.stack = i.stack;
      }).prototype = Object.create(Error.prototype)),
        (w.prototype.constructor = w);
    }
    function A(e, t) {
      return new Promise(function (i, r) {
        var o = new g(e, t);
        if (o.signal && o.signal.aborted)
          return r(new w('Aborted', 'AbortError'));
        var s = new XMLHttpRequest();
        function a() {
          s.abort();
        }
        (s.onload = function () {
          var e,
            t,
            n = {
              status: s.status,
              statusText: s.statusText,
              headers:
                ((e = s.getAllResponseHeaders() || ''),
                (t = new u()),
                e
                  .replace(/\r?\n[\t ]+/g, ' ')
                  .split(/\r?\n/)
                  .forEach(function (e) {
                    var i = e.split(':'),
                      n = i.shift().trim();
                    if (n) {
                      var r = i.join(':').trim();
                      t.append(n, r);
                    }
                  }),
                t),
            };
          n.url =
            'responseURL' in s ? s.responseURL : n.headers.get('X-Request-URL');
          var r = 'response' in s ? s.response : s.responseText;
          i(new y(r, n));
        }),
          (s.onerror = function () {
            r(new TypeError('Network request failed'));
          }),
          (s.ontimeout = function () {
            r(new TypeError('Network request failed'));
          }),
          (s.onabort = function () {
            r(new w('Aborted', 'AbortError'));
          }),
          s.open(o.method, o.url, !0),
          'include' === o.credentials
            ? (s.withCredentials = !0)
            : 'omit' === o.credentials && (s.withCredentials = !1),
          'responseType' in s && n.blob && (s.responseType = 'blob'),
          o.headers.forEach(function (e, t) {
            s.setRequestHeader(t, e);
          }),
          o.signal &&
            (o.signal.addEventListener('abort', a),
            (s.onreadystatechange = function () {
              4 === s.readyState && o.signal.removeEventListener('abort', a);
            })),
          s.send(void 0 === o._bodyInit ? null : o._bodyInit);
      });
    }
    (A.polyfill = !0),
      self.fetch ||
        ((self.fetch = A),
        (self.Headers = u),
        (self.Request = g),
        (self.Response = y));
  },
  function (e, t, i) {
    i(4), (e.exports = self.fetch.bind(self));
  },
  function (e, t) {
    var i;
    i = (function () {
      return this;
    })();
    try {
      i = i || Function('return this')() || (0, eval)('this');
    } catch (e) {
      'object' == typeof window && (i = window);
    }
    e.exports = i;
  },
  function (e, t) {
    var i,
      n,
      r = (e.exports = {});
    function o() {
      throw new Error('setTimeout has not been defined');
    }
    function s() {
      throw new Error('clearTimeout has not been defined');
    }
    function a(e) {
      if (i === setTimeout) return setTimeout(e, 0);
      if ((i === o || !i) && setTimeout)
        return (i = setTimeout), setTimeout(e, 0);
      try {
        return i(e, 0);
      } catch (t) {
        try {
          return i.call(null, e, 0);
        } catch (t) {
          return i.call(this, e, 0);
        }
      }
    }
    !(function () {
      try {
        i = 'function' == typeof setTimeout ? setTimeout : o;
      } catch (e) {
        i = o;
      }
      try {
        n = 'function' == typeof clearTimeout ? clearTimeout : s;
      } catch (e) {
        n = s;
      }
    })();
    var l,
      u = [],
      c = !1,
      d = -1;
    function h() {
      c &&
        l &&
        ((c = !1), l.length ? (u = l.concat(u)) : (d = -1), u.length && f());
    }
    function f() {
      if (!c) {
        var e = a(h);
        c = !0;
        for (var t = u.length; t; ) {
          for (l = u, u = []; ++d < t; ) l && l[d].run();
          (d = -1), (t = u.length);
        }
        (l = null),
          (c = !1),
          (function (e) {
            if (n === clearTimeout) return clearTimeout(e);
            if ((n === s || !n) && clearTimeout)
              return (n = clearTimeout), clearTimeout(e);
            try {
              n(e);
            } catch (t) {
              try {
                return n.call(null, e);
              } catch (t) {
                return n.call(this, e);
              }
            }
          })(e);
      }
    }
    function p(e, t) {
      (this.fun = e), (this.array = t);
    }
    function m() {}
    (r.nextTick = function (e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
      u.push(new p(e, t)), 1 !== u.length || c || a(f);
    }),
      (p.prototype.run = function () {
        this.fun.apply(null, this.array);
      }),
      (r.title = 'browser'),
      (r.browser = !0),
      (r.env = {}),
      (r.argv = []),
      (r.version = ''),
      (r.versions = {}),
      (r.on = m),
      (r.addListener = m),
      (r.once = m),
      (r.off = m),
      (r.removeListener = m),
      (r.removeAllListeners = m),
      (r.emit = m),
      (r.prependListener = m),
      (r.prependOnceListener = m),
      (r.listeners = function (e) {
        return [];
      }),
      (r.binding = function (e) {
        throw new Error('process.binding is not supported');
      }),
      (r.cwd = function () {
        return '/';
      }),
      (r.chdir = function (e) {
        throw new Error('process.chdir is not supported');
      }),
      (r.umask = function () {
        return 0;
      });
  },
  function (e, t, i) {
    (function (t, i) {
      /*!
       * @overview es6-promise - a tiny implementation of Promises/A+.
       * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
       * @license   Licensed under MIT license
       *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
       * @version   v4.2.5+7f2b526d
       */ var n;
      (n = function () {
        'use strict';
        function e(e) {
          return 'function' == typeof e;
        }
        var n = Array.isArray
            ? Array.isArray
            : function (e) {
                return '[object Array]' === Object.prototype.toString.call(e);
              },
          r = 0,
          o = void 0,
          s = void 0,
          a = function (e, t) {
            (p[r] = e), (p[r + 1] = t), 2 === (r += 2) && (s ? s(m) : w());
          };
        var l = 'undefined' != typeof window ? window : void 0,
          u = l || {},
          c = u.MutationObserver || u.WebKitMutationObserver,
          d =
            'undefined' == typeof self &&
            void 0 !== t &&
            '[object process]' === {}.toString.call(t),
          h =
            'undefined' != typeof Uint8ClampedArray &&
            'undefined' != typeof importScripts &&
            'undefined' != typeof MessageChannel;
        function f() {
          var e = setTimeout;
          return function () {
            return e(m, 1);
          };
        }
        var p = new Array(1e3);
        function m() {
          for (var e = 0; e < r; e += 2) {
            (0, p[e])(p[e + 1]), (p[e] = void 0), (p[e + 1] = void 0);
          }
          r = 0;
        }
        var g,
          v,
          y,
          b,
          w = void 0;
        function A(e, t) {
          var i = this,
            n = new this.constructor(S);
          void 0 === n[P] && F(n);
          var r = i._state;
          if (r) {
            var o = arguments[r - 1];
            a(function () {
              return U(r, n, o, i._result);
            });
          } else j(i, n, e, t);
          return n;
        }
        function E(e) {
          if (e && 'object' == typeof e && e.constructor === this) return e;
          var t = new this(S);
          return x(t, e), t;
        }
        d
          ? (w = function () {
              return t.nextTick(m);
            })
          : c
          ? ((v = 0),
            (y = new c(m)),
            (b = document.createTextNode('')),
            y.observe(b, { characterData: !0 }),
            (w = function () {
              b.data = v = ++v % 2;
            }))
          : h
          ? (((g = new MessageChannel()).port1.onmessage = m),
            (w = function () {
              return g.port2.postMessage(0);
            }))
          : (w =
              void 0 === l
                ? (function () {
                    try {
                      var e = Function('return this')().require('vertx');
                      return void 0 !== (o = e.runOnLoop || e.runOnContext)
                        ? function () {
                            o(m);
                          }
                        : f();
                    } catch (e) {
                      return f();
                    }
                  })()
                : f());
        var P = Math.random().toString(36).substring(2);
        function S() {}
        var C = void 0,
          T = 1,
          k = 2,
          I = { error: null };
        function _(e) {
          try {
            return e.then;
          } catch (e) {
            return (I.error = e), I;
          }
        }
        function O(t, i, n) {
          i.constructor === t.constructor &&
          n === A &&
          i.constructor.resolve === E
            ? (function (e, t) {
                t._state === T
                  ? M(e, t._result)
                  : t._state === k
                  ? B(e, t._result)
                  : j(
                      t,
                      void 0,
                      function (t) {
                        return x(e, t);
                      },
                      function (t) {
                        return B(e, t);
                      }
                    );
              })(t, i)
            : n === I
            ? (B(t, I.error), (I.error = null))
            : void 0 === n
            ? M(t, i)
            : e(n)
            ? (function (e, t, i) {
                a(function (e) {
                  var n = !1,
                    r = (function (e, t, i, n) {
                      try {
                        e.call(t, i, n);
                      } catch (e) {
                        return e;
                      }
                    })(
                      i,
                      t,
                      function (i) {
                        n || ((n = !0), t !== i ? x(e, i) : M(e, i));
                      },
                      function (t) {
                        n || ((n = !0), B(e, t));
                      },
                      e._label
                    );
                  !n && r && ((n = !0), B(e, r));
                }, e);
              })(t, i, n)
            : M(t, i);
        }
        function x(e, t) {
          var i, n;
          e === t
            ? B(e, new TypeError('You cannot resolve a promise with itself'))
            : ((n = typeof (i = t)),
              null === i || ('object' !== n && 'function' !== n)
                ? M(e, t)
                : O(e, t, _(t)));
        }
        function N(e) {
          e._onerror && e._onerror(e._result), L(e);
        }
        function M(e, t) {
          e._state === C &&
            ((e._result = t),
            (e._state = T),
            0 !== e._subscribers.length && a(L, e));
        }
        function B(e, t) {
          e._state === C && ((e._state = k), (e._result = t), a(N, e));
        }
        function j(e, t, i, n) {
          var r = e._subscribers,
            o = r.length;
          (e._onerror = null),
            (r[o] = t),
            (r[o + T] = i),
            (r[o + k] = n),
            0 === o && e._state && a(L, e);
        }
        function L(e) {
          var t = e._subscribers,
            i = e._state;
          if (0 !== t.length) {
            for (
              var n = void 0, r = void 0, o = e._result, s = 0;
              s < t.length;
              s += 3
            )
              (n = t[s]), (r = t[s + i]), n ? U(i, n, r, o) : r(o);
            e._subscribers.length = 0;
          }
        }
        function U(t, i, n, r) {
          var o = e(n),
            s = void 0,
            a = void 0,
            l = void 0,
            u = void 0;
          if (o) {
            if (
              ((s = (function (e, t) {
                try {
                  return e(t);
                } catch (e) {
                  return (I.error = e), I;
                }
              })(n, r)) === I
                ? ((u = !0), (a = s.error), (s.error = null))
                : (l = !0),
              i === s)
            )
              return void B(
                i,
                new TypeError(
                  'A promises callback cannot return that same promise.'
                )
              );
          } else (s = r), (l = !0);
          i._state !== C ||
            (o && l
              ? x(i, s)
              : u
              ? B(i, a)
              : t === T
              ? M(i, s)
              : t === k && B(i, s));
        }
        var D = 0;
        function F(e) {
          (e[P] = D++),
            (e._state = void 0),
            (e._result = void 0),
            (e._subscribers = []);
        }
        var R = (function () {
          function e(e, t) {
            (this._instanceConstructor = e),
              (this.promise = new e(S)),
              this.promise[P] || F(this.promise),
              n(t)
                ? ((this.length = t.length),
                  (this._remaining = t.length),
                  (this._result = new Array(this.length)),
                  0 === this.length
                    ? M(this.promise, this._result)
                    : ((this.length = this.length || 0),
                      this._enumerate(t),
                      0 === this._remaining && M(this.promise, this._result)))
                : B(
                    this.promise,
                    new Error('Array Methods must be provided an Array')
                  );
          }
          return (
            (e.prototype._enumerate = function (e) {
              for (var t = 0; this._state === C && t < e.length; t++)
                this._eachEntry(e[t], t);
            }),
            (e.prototype._eachEntry = function (e, t) {
              var i = this._instanceConstructor,
                n = i.resolve;
              if (n === E) {
                var r = _(e);
                if (r === A && e._state !== C)
                  this._settledAt(e._state, t, e._result);
                else if ('function' != typeof r)
                  this._remaining--, (this._result[t] = e);
                else if (i === V) {
                  var o = new i(S);
                  O(o, e, r), this._willSettleAt(o, t);
                } else
                  this._willSettleAt(
                    new i(function (t) {
                      return t(e);
                    }),
                    t
                  );
              } else this._willSettleAt(n(e), t);
            }),
            (e.prototype._settledAt = function (e, t, i) {
              var n = this.promise;
              n._state === C &&
                (this._remaining--, e === k ? B(n, i) : (this._result[t] = i)),
                0 === this._remaining && M(n, this._result);
            }),
            (e.prototype._willSettleAt = function (e, t) {
              var i = this;
              j(
                e,
                void 0,
                function (e) {
                  return i._settledAt(T, t, e);
                },
                function (e) {
                  return i._settledAt(k, t, e);
                }
              );
            }),
            e
          );
        })();
        var V = (function () {
          function t(e) {
            (this[P] = D++),
              (this._result = this._state = void 0),
              (this._subscribers = []),
              S !== e &&
                ('function' != typeof e &&
                  (function () {
                    throw new TypeError(
                      'You must pass a resolver function as the first argument to the promise constructor'
                    );
                  })(),
                this instanceof t
                  ? (function (e, t) {
                      try {
                        t(
                          function (t) {
                            x(e, t);
                          },
                          function (t) {
                            B(e, t);
                          }
                        );
                      } catch (t) {
                        B(e, t);
                      }
                    })(this, e)
                  : (function () {
                      throw new TypeError(
                        "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
                      );
                    })());
          }
          return (
            (t.prototype.catch = function (e) {
              return this.then(null, e);
            }),
            (t.prototype.finally = function (t) {
              var i = this.constructor;
              return e(t)
                ? this.then(
                    function (e) {
                      return i.resolve(t()).then(function () {
                        return e;
                      });
                    },
                    function (e) {
                      return i.resolve(t()).then(function () {
                        throw e;
                      });
                    }
                  )
                : this.then(t, t);
            }),
            t
          );
        })();
        return (
          (V.prototype.then = A),
          (V.all = function (e) {
            return new R(this, e).promise;
          }),
          (V.race = function (e) {
            var t = this;
            return n(e)
              ? new t(function (i, n) {
                  for (var r = e.length, o = 0; o < r; o++)
                    t.resolve(e[o]).then(i, n);
                })
              : new t(function (e, t) {
                  return t(new TypeError('You must pass an array to race.'));
                });
          }),
          (V.resolve = E),
          (V.reject = function (e) {
            var t = new this(S);
            return B(t, e), t;
          }),
          (V._setScheduler = function (e) {
            s = e;
          }),
          (V._setAsap = function (e) {
            a = e;
          }),
          (V._asap = a),
          (V.polyfill = function () {
            var e = void 0;
            if (void 0 !== i) e = i;
            else if ('undefined' != typeof self) e = self;
            else
              try {
                e = Function('return this')();
              } catch (e) {
                throw new Error(
                  'polyfill failed because global object is unavailable in this environment'
                );
              }
            var t = e.Promise;
            if (t) {
              var n = null;
              try {
                n = Object.prototype.toString.call(t.resolve());
              } catch (e) {}
              if ('[object Promise]' === n && !t.cast) return;
            }
            e.Promise = V;
          }),
          (V.Promise = V),
          V
        );
      }),
        (e.exports = n());
    }.call(this, i(7), i(6)));
  },
  function (e, t, i) {
    var n, r, o, a;
    (n = window),
      ((a = function () {
        return (
          (r = new (window.UAParser || t.UAParser)().getResult()),
          (o = new u()),
          this
        );
      }).prototype = {
        getSoftwareVersion: function () {
          return '0.1.11';
        },
        getBrowserData: function () {
          return r;
        },
        getFingerprint: function () {
          return c(
            r.ua +
              '|' +
              this.getScreenPrint() +
              '|' +
              this.getPlugins() +
              '|' +
              this.getFonts() +
              '|' +
              this.isLocalStorage() +
              '|' +
              this.isSessionStorage() +
              '|' +
              this.getTimeZone() +
              '|' +
              this.getLanguage() +
              '|' +
              this.getSystemLanguage() +
              '|' +
              this.isCookie() +
              '|' +
              this.getCanvasPrint(),
            256
          );
        },
        getCustomFingerprint: function () {
          for (var e = '', t = 0; t < arguments.length; t++)
            e += arguments[t] + '|';
          return c(e, 256);
        },
        getUserAgent: function () {
          return r.ua;
        },
        getUserAgentLowerCase: function () {
          return r.ua.toLowerCase();
        },
        getBrowser: function () {
          return r.browser.name;
        },
        getBrowserVersion: function () {
          return r.browser.version;
        },
        getBrowserMajorVersion: function () {
          return r.browser.major;
        },
        isIE: function () {
          return /IE/i.test(r.browser.name);
        },
        isChrome: function () {
          return /Chrome/i.test(r.browser.name);
        },
        isFirefox: function () {
          return /Firefox/i.test(r.browser.name);
        },
        isSafari: function () {
          return /Safari/i.test(r.browser.name);
        },
        isMobileSafari: function () {
          return /Mobile\sSafari/i.test(r.browser.name);
        },
        isOpera: function () {
          return /Opera/i.test(r.browser.name);
        },
        getEngine: function () {
          return r.engine.name;
        },
        getEngineVersion: function () {
          return r.engine.version;
        },
        getOS: function () {
          return r.os.name;
        },
        getOSVersion: function () {
          return r.os.version;
        },
        isWindows: function () {
          return /Windows/i.test(r.os.name);
        },
        isMac: function () {
          return /Mac/i.test(r.os.name);
        },
        isLinux: function () {
          return /Linux/i.test(r.os.name);
        },
        isUbuntu: function () {
          return /Ubuntu/i.test(r.os.name);
        },
        isSolaris: function () {
          return /Solaris/i.test(r.os.name);
        },
        getDevice: function () {
          return r.device.model;
        },
        getDeviceType: function () {
          return r.device.type;
        },
        getDeviceVendor: function () {
          return r.device.vendor;
        },
        getCPU: function () {
          return r.cpu.architecture;
        },
        isMobile: function () {
          var e = r.ua || navigator.vendor || window.opera;
          return (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
              e
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              e.substr(0, 4)
            )
          );
        },
        isMobileMajor: function () {
          return (
            this.isMobileAndroid() ||
            this.isMobileBlackBerry() ||
            this.isMobileIOS() ||
            this.isMobileOpera() ||
            this.isMobileWindows()
          );
        },
        isMobileAndroid: function () {
          return !!r.ua.match(/Android/i);
        },
        isMobileOpera: function () {
          return !!r.ua.match(/Opera Mini/i);
        },
        isMobileWindows: function () {
          return !!r.ua.match(/IEMobile/i);
        },
        isMobileBlackBerry: function () {
          return !!r.ua.match(/BlackBerry/i);
        },
        isMobileIOS: function () {
          return !!r.ua.match(/iPhone|iPad|iPod/i);
        },
        isIphone: function () {
          return !!r.ua.match(/iPhone/i);
        },
        isIpad: function () {
          return !!r.ua.match(/iPad/i);
        },
        isIpod: function () {
          return !!r.ua.match(/iPod/i);
        },
        getScreenPrint: function () {
          return (
            'Current Resolution: ' +
            this.getCurrentResolution() +
            ', Available Resolution: ' +
            this.getAvailableResolution() +
            ', Color Depth: ' +
            this.getColorDepth() +
            ', Device XDPI: ' +
            this.getDeviceXDPI() +
            ', Device YDPI: ' +
            this.getDeviceYDPI()
          );
        },
        getColorDepth: function () {
          return screen.colorDepth;
        },
        getCurrentResolution: function () {
          return screen.width + 'x' + screen.height;
        },
        getAvailableResolution: function () {
          return screen.availWidth + 'x' + screen.availHeight;
        },
        getDeviceXDPI: function () {
          return screen.deviceXDPI;
        },
        getDeviceYDPI: function () {
          return screen.deviceYDPI;
        },
        getPlugins: function () {
          for (var e = '', t = 0; t < navigator.plugins.length; t++)
            e =
              t == navigator.plugins.length - 1
                ? e + navigator.plugins[t].name
                : e + (navigator.plugins[t].name + ', ');
          return e;
        },
        isJava: function () {
          return navigator.javaEnabled();
        },
        getJavaVersion: function () {
          return l.getJREs().toString();
        },
        isFlash: function () {
          return !!navigator.plugins['Shockwave Flash'];
        },
        getFlashVersion: function () {
          return this.isFlash()
            ? ((objPlayerVersion = d.getFlashPlayerVersion()),
              objPlayerVersion.major +
                '.' +
                objPlayerVersion.minor +
                '.' +
                objPlayerVersion.release)
            : '';
        },
        isSilverlight: function () {
          return !!navigator.plugins['Silverlight Plug-In'];
        },
        getSilverlightVersion: function () {
          return this.isSilverlight()
            ? navigator.plugins['Silverlight Plug-In'].description
            : '';
        },
        isMimeTypes: function () {
          return !!navigator.mimeTypes.length;
        },
        getMimeTypes: function () {
          for (var e = '', t = 0; t < navigator.mimeTypes.length; t++)
            e =
              t == navigator.mimeTypes.length - 1
                ? e + navigator.mimeTypes[t].description
                : e + (navigator.mimeTypes[t].description + ', ');
          return e;
        },
        isFont: function (e) {
          return o.detect(e);
        },
        getFonts: function () {
          for (
            var e =
                'Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Aharoni;Andalus;Angsana New;AngsanaUPC;Aparajita;Arab;Arabic Transparent;Arabic Typesetting;Arial Baltic;Arial Black;Arial CE;Arial CYR;Arial Greek;Arial TUR;Arial;Batang;BatangChe;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Browallia New;BrowalliaUPC;Calibri Light;Calibri;Californian FB;Cambria Math;Cambria;Candara;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Comic Sans MS;Consolas;Constantia;Copperplate Gothic Light;Corbel;Cordia New;CordiaUPC;Courier New Baltic;Courier New CE;Courier New CYR;Courier New Greek;Courier New TUR;Courier New;DFKai-SB;DaunPenh;David;DejaVu LGC Sans Mono;Desdemona;DilleniaUPC;DokChampa;Dotum;DotumChe;Ebrima;Engravers MT;Eras Bold ITC;Estrangelo Edessa;EucrosiaUPC;Euphemia;Eurostile;FangSong;Forte;FrankRuehl;Franklin Gothic Heavy;Franklin Gothic Medium;FreesiaUPC;French Script MT;Gabriola;Gautami;Georgia;Gigi;Gisha;Goudy Old Style;Gulim;GulimChe;GungSeo;Gungsuh;GungsuhChe;Haettenschweiler;Harrington;Hei S;HeiT;Heisei Kaku Gothic;Hiragino Sans GB;Impact;Informal Roman;IrisUPC;Iskoola Pota;JasmineUPC;KacstOne;KaiTi;Kalinga;Kartika;Khmer UI;Kino MT;KodchiangUPC;Kokila;Kozuka Gothic Pr6N;Lao UI;Latha;Leelawadee;Levenim MT;LilyUPC;Lohit Gujarati;Loma;Lucida Bright;Lucida Console;Lucida Fax;Lucida Sans Unicode;MS Gothic;MS Mincho;MS PGothic;MS PMincho;MS Reference Sans Serif;MS UI Gothic;MV Boli;Magneto;Malgun Gothic;Mangal;Marlett;Matura MT Script Capitals;Meiryo UI;Meiryo;Menlo;Microsoft Himalaya;Microsoft JhengHei;Microsoft New Tai Lue;Microsoft PhagsPa;Microsoft Sans Serif;Microsoft Tai Le;Microsoft Uighur;Microsoft YaHei;Microsoft Yi Baiti;MingLiU;MingLiU-ExtB;MingLiU_HKSCS;MingLiU_HKSCS-ExtB;Miriam Fixed;Miriam;Mongolian Baiti;MoolBoran;NSimSun;Narkisim;News Gothic MT;Niagara Solid;Nyala;PMingLiU;PMingLiU-ExtB;Palace Script MT;Palatino Linotype;Papyrus;Perpetua;Plantagenet Cherokee;Playbill;Prelude Bold;Prelude Condensed Bold;Prelude Condensed Medium;Prelude Medium;PreludeCompressedWGL Black;PreludeCompressedWGL Bold;PreludeCompressedWGL Light;PreludeCompressedWGL Medium;PreludeCondensedWGL Black;PreludeCondensedWGL Bold;PreludeCondensedWGL Light;PreludeCondensedWGL Medium;PreludeWGL Black;PreludeWGL Bold;PreludeWGL Light;PreludeWGL Medium;Raavi;Rachana;Rockwell;Rod;Sakkal Majalla;Sawasdee;Script MT Bold;Segoe Print;Segoe Script;Segoe UI Light;Segoe UI Semibold;Segoe UI Symbol;Segoe UI;Shonar Bangla;Showcard Gothic;Shruti;SimHei;SimSun;SimSun-ExtB;Simplified Arabic Fixed;Simplified Arabic;Snap ITC;Sylfaen;Symbol;Tahoma;Times New Roman Baltic;Times New Roman CE;Times New Roman CYR;Times New Roman Greek;Times New Roman TUR;Times New Roman;TlwgMono;Traditional Arabic;Trebuchet MS;Tunga;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Utsaah;Vani;Verdana;Vijaya;Vladimir Script;Vrinda;Webdings;Wide Latin;Wingdings'.split(
                  ';'
                ),
              t = '',
              i = 0;
            i < e.length;
            i++
          )
            o.detect(e[i]) &&
              (t = i == e.length - 1 ? t + e[i] : t + (e[i] + ', '));
          return t;
        },
        isLocalStorage: function () {
          try {
            return !!n.localStorage;
          } catch (e) {
            return !0;
          }
        },
        isSessionStorage: function () {
          try {
            return !!n.sessionStorage;
          } catch (e) {
            return !0;
          }
        },
        isCookie: function () {
          return navigator.cookieEnabled;
        },
        getTimeZone: function () {
          return String(String(new Date()).split('(')[1]).split(')')[0];
        },
        getLanguage: function () {
          return navigator.language;
        },
        getSystemLanguage: function () {
          return navigator.systemLanguage;
        },
        isCanvas: function () {
          var e = document.createElement('canvas');
          try {
            return !(!e.getContext || !e.getContext('2d'));
          } catch (e) {
            return !1;
          }
        },
        getCanvasPrint: function () {
          var e,
            t = document.createElement('canvas');
          try {
            e = t.getContext('2d');
          } catch (e) {
            return '';
          }
          return (
            (e.textBaseline = 'top'),
            (e.font = "14px 'Arial'"),
            (e.textBaseline = 'alphabetic'),
            (e.fillStyle = '#f60'),
            e.fillRect(125, 1, 62, 20),
            (e.fillStyle = '#069'),
            e.fillText('ClientJS,org <canvas> 1.0', 2, 15),
            (e.fillStyle = 'rgba(102, 204, 0, 0.7)'),
            e.fillText('ClientJS,org <canvas> 1.0', 4, 17),
            t.toDataURL()
          );
        },
      }),
      'object' == typeof e && void 0 !== t && (e.exports = a),
      (n.ClientJS = a);
    var l = (function () {
        function e(e) {
          o.debug && (console.log ? console.log(e) : alert(e));
        }
        function t(e) {
          return null == e || 0 == e.length
            ? 'http://java.com/dt-redirect'
            : ('&' == e.charAt(0) && (e = e.substring(1, e.length)),
              'http://java.com/dt-redirect?' + e);
        }
        var i = ['id', 'class', 'title', 'style'];
        'classid codebase codetype data type archive declare standby height width usemap name tabindex align border hspace vspace'
          .split(' ')
          .concat(
            i,
            ['lang', 'dir'],
            'onclick ondblclick onmousedown onmouseup onmouseover onmousemove onmouseout onkeypress onkeydown onkeyup'.split(
              ' '
            )
          );
        var n,
          r =
            'codebase code name archive object width height alt align hspace vspace'
              .split(' ')
              .concat(i);
        try {
          n =
            -1 != document.location.protocol.indexOf('http')
              ? '//java.com/js/webstart.png'
              : 'http://java.com/js/webstart.png';
        } catch (e) {
          n = 'http://java.com/js/webstart.png';
        }
        var o = {
          debug: null,
          version: '20120801',
          firefoxJavaVersion: null,
          myInterval: null,
          preInstallJREList: null,
          returnPage: null,
          brand: null,
          locale: null,
          installType: null,
          EAInstallEnabled: !1,
          EarlyAccessURL: null,
          oldMimeType:
            'application/npruntime-scriptable-plugin;DeploymentToolkit',
          mimeType: 'application/java-deployment-toolkit',
          launchButtonPNG: n,
          browserName: null,
          browserName2: null,
          getJREs: function () {
            var t = [];
            if (this.isPluginInstalled())
              for (var i = this.getPlugin().jvms, n = 0; n < i.getLength(); n++)
                t[n] = i.get(n).version;
            else
              'MSIE' == (i = this.getBrowser())
                ? this.testUsingActiveX('1.7.0')
                  ? (t[0] = '1.7.0')
                  : this.testUsingActiveX('1.6.0')
                  ? (t[0] = '1.6.0')
                  : this.testUsingActiveX('1.5.0')
                  ? (t[0] = '1.5.0')
                  : this.testUsingActiveX('1.4.2')
                  ? (t[0] = '1.4.2')
                  : this.testForMSVM() && (t[0] = '1.1')
                : 'Netscape Family' == i &&
                  (this.getJPIVersionUsingMimeType(),
                  null != this.firefoxJavaVersion
                    ? (t[0] = this.firefoxJavaVersion)
                    : this.testUsingMimeTypes('1.7')
                    ? (t[0] = '1.7.0')
                    : this.testUsingMimeTypes('1.6')
                    ? (t[0] = '1.6.0')
                    : this.testUsingMimeTypes('1.5')
                    ? (t[0] = '1.5.0')
                    : this.testUsingMimeTypes('1.4.2')
                    ? (t[0] = '1.4.2')
                    : 'Safari' == this.browserName2 &&
                      (this.testUsingPluginsArray('1.7.0')
                        ? (t[0] = '1.7.0')
                        : this.testUsingPluginsArray('1.6')
                        ? (t[0] = '1.6.0')
                        : this.testUsingPluginsArray('1.5')
                        ? (t[0] = '1.5.0')
                        : this.testUsingPluginsArray('1.4.2') &&
                          (t[0] = '1.4.2')));
            if (this.debug)
              for (n = 0; n < t.length; ++n)
                e('[getJREs()] We claim to have detected Java SE ' + t[n]);
            return t;
          },
          installJRE: function (e, t) {
            if (this.isPluginInstalled() && this.isAutoInstallEnabled(e)) {
              var i;
              return (
                (i = this.isCallbackSupported()
                  ? this.getPlugin().installJRE(e, t)
                  : this.getPlugin().installJRE(e)) &&
                  (this.refresh(),
                  null != this.returnPage &&
                    (document.location = this.returnPage)),
                i
              );
            }
            return this.installLatestJRE();
          },
          isAutoInstallEnabled: function (e) {
            if (!this.isPluginInstalled()) return !1;
            if (
              (void 0 === e && (e = null),
              'MSIE' != l.browserName ||
                l.compareVersionToPattern(
                  l.getPlugin().version,
                  ['10', '0', '0'],
                  !1,
                  !0
                ))
            )
              e = !0;
            else if (null == e) e = !1;
            else {
              var t = '1.6.0_33+';
              if (null == t || 0 == t.length) e = !0;
              else {
                var i = t.charAt(t.length - 1);
                if (
                  ('+' != i &&
                    '*' != i &&
                    -1 != t.indexOf('_') &&
                    '_' != i &&
                    ((t += '*'), (i = '*')),
                  0 < (t = t.substring(0, t.length - 1)).length)
                ) {
                  var n = t.charAt(t.length - 1);
                  ('.' != n && '_' != n) || (t = t.substring(0, t.length - 1));
                }
                e = '*' == i ? 0 == e.indexOf(t) : '+' == i && t <= e;
              }
              e = !e;
            }
            return e;
          },
          isCallbackSupported: function () {
            return (
              this.isPluginInstalled() &&
              this.compareVersionToPattern(
                this.getPlugin().version,
                ['10', '2', '0'],
                !1,
                !0
              )
            );
          },
          installLatestJRE: function (e) {
            if (this.isPluginInstalled() && this.isAutoInstallEnabled()) {
              var i = !1;
              return (
                (i = this.isCallbackSupported()
                  ? this.getPlugin().installLatestJRE(e)
                  : this.getPlugin().installLatestJRE()) &&
                  (this.refresh(),
                  null != this.returnPage &&
                    (document.location = this.returnPage)),
                i
              );
            }
            if (
              ((e = this.getBrowser()),
              (i = navigator.platform.toLowerCase()),
              'true' == this.EAInstallEnabled &&
                -1 != i.indexOf('win') &&
                null != this.EarlyAccessURL)
            )
              (this.preInstallJREList = this.getJREs()),
                null != this.returnPage &&
                  (this.myInterval = setInterval('deployJava.poll()', 3e3)),
                (location.href = this.EarlyAccessURL);
            else {
              if ('MSIE' == e) return this.IEInstall();
              if ('Netscape Family' == e && -1 != i.indexOf('win32'))
                return this.FFInstall();
              location.href = t(
                (null != this.returnPage
                  ? '&returnPage=' + this.returnPage
                  : '') +
                  (null != this.locale ? '&locale=' + this.locale : '') +
                  (null != this.brand ? '&brand=' + this.brand : '')
              );
            }
            return !1;
          },
          runApplet: function (t, i, n) {
            ('undefined' != n && null != n) || (n = '1.1');
            var r = n.match('^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$');
            null == this.returnPage && (this.returnPage = document.location),
              null != r
                ? '?' != this.getBrowser()
                  ? this.versionCheck(n + '+')
                    ? this.writeAppletTag(t, i)
                    : this.installJRE(n + '+') &&
                      (this.refresh(),
                      (location.href = document.location),
                      this.writeAppletTag(t, i))
                  : this.writeAppletTag(t, i)
                : e(
                    '[runApplet()] Invalid minimumVersion argument to runApplet():' +
                      n
                  );
          },
          writeAppletTag: function (e, t) {
            var i = '<applet ',
              n = '',
              o = !0;
            for (var s in ((null != t && 'object' == typeof t) || (t = {}),
            e)) {
              var a;
              e: {
                a = s.toLowerCase();
                for (var l = r.length, u = 0; u < l; u++)
                  if (r[u] === a) {
                    a = !0;
                    break e;
                  }
                a = !1;
              }
              a
                ? ((i += ' ' + s + '="' + e[s] + '"'), 'code' == s && (o = !1))
                : (t[s] = e[s]);
            }
            for (var c in ((s = !1), t))
              'codebase_lookup' == c && (s = !0),
                ('object' != c && 'java_object' != c && 'java_code' != c) ||
                  (o = !1),
                (n += '<param name="' + c + '" value="' + t[c] + '"/>');
            s || (n += '<param name="codebase_lookup" value="false"/>'),
              o && (i += ' code="dummy"'),
              document.write(i + '>\n' + n + '\n</applet>');
          },
          versionCheck: function (t) {
            var i = 0,
              n = t.match(
                '^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?(\\*|\\+)?$'
              );
            if (null != n) {
              for (var r = (t = !1), o = [], s = 1; s < n.length; ++s)
                'string' == typeof n[s] && '' != n[s] && ((o[i] = n[s]), i++);
              for (
                '+' == o[o.length - 1]
                  ? ((r = !0), (t = !1), o.length--)
                  : '*' == o[o.length - 1]
                  ? ((r = !1), (t = !0), o.length--)
                  : 4 > o.length && ((r = !1), (t = !0)),
                  i = this.getJREs(),
                  s = 0;
                s < i.length;
                ++s
              )
                if (this.compareVersionToPattern(i[s], o, t, r)) return !0;
            } else
              e(
                '[versionCheck()] ' +
                  (i = 'Invalid versionPattern passed to versionCheck: ' + t)
              ),
                alert(i);
            return !1;
          },
          isWebStartInstalled: function (t) {
            if ('?' == this.getBrowser()) return !0;
            ('undefined' != t && null != t) || (t = '1.4.2');
            var i = !1;
            return (
              null !=
              t.match('^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$')
                ? (i = this.versionCheck(t + '+'))
                : (e(
                    '[isWebStartInstaller()] Invalid minimumVersion argument to isWebStartInstalled(): ' +
                      t
                  ),
                  (i = this.versionCheck('1.4.2+'))),
              i
            );
          },
          getJPIVersionUsingMimeType: function () {
            for (var e = 0; e < navigator.mimeTypes.length; ++e) {
              var t = navigator.mimeTypes[e].type.match(
                /^application\/x-java-applet;jpi-version=(.*)$/
              );
              if (
                null != t &&
                ((this.firefoxJavaVersion = t[1]), 'Opera' != this.browserName2)
              )
                break;
            }
          },
          launchWebStartApplication: function (e) {
            if (
              (navigator.userAgent.toLowerCase(),
              this.getJPIVersionUsingMimeType(),
              0 == this.isWebStartInstalled('1.7.0') &&
                (0 == this.installJRE('1.7.0+') ||
                  0 == this.isWebStartInstalled('1.7.0')))
            )
              return !1;
            var t = null;
            document.documentURI && (t = document.documentURI),
              null == t && (t = document.URL);
            var i,
              n = this.getBrowser();
            'MSIE' == n
              ? (i =
                  '<object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" width="0" height="0"><PARAM name="launchjnlp" value="' +
                  e +
                  '"><PARAM name="docbase" value="' +
                  t +
                  '"></object>')
              : 'Netscape Family' == n &&
                (i =
                  '<embed type="application/x-java-applet;jpi-version=' +
                  this.firefoxJavaVersion +
                  '" width="0" height="0" launchjnlp="' +
                  e +
                  '"docbase="' +
                  t +
                  '" />'),
              'undefined' == document.body || null == document.body
                ? (document.write(i), (document.location = t))
                : (((e = document.createElement('div')).id = 'div1'),
                  (e.style.position = 'relative'),
                  (e.style.left = '-10000px'),
                  (e.style.margin = '0px auto'),
                  (e.className = 'dynamicDiv'),
                  (e.innerHTML = i),
                  document.body.appendChild(e));
          },
          createWebStartLaunchButtonEx: function (e, t) {
            null == this.returnPage && (this.returnPage = e),
              document.write(
                '<a href="javascript:deployJava.launchWebStartApplication(\'' +
                  e +
                  '\');" onMouseOver="window.status=\'\'; return true;"><img src="' +
                  this.launchButtonPNG +
                  '" border="0" /></a>'
              );
          },
          createWebStartLaunchButton: function (e, t) {
            null == this.returnPage && (this.returnPage = e),
              document.write(
                '<a href="javascript:if (!deployJava.isWebStartInstalled(&quot;' +
                  t +
                  '&quot;)) {if (deployJava.installLatestJRE()) {if (deployJava.launch(&quot;' +
                  e +
                  '&quot;)) {}}} else {if (deployJava.launch(&quot;' +
                  e +
                  '&quot;)) {}}" onMouseOver="window.status=\'\'; return true;"><img src="' +
                  this.launchButtonPNG +
                  '" border="0" /></a>'
              );
          },
          launch: function (e) {
            return (document.location = e), !0;
          },
          isPluginInstalled: function () {
            var e = this.getPlugin();
            return !(!e || !e.jvms);
          },
          isAutoUpdateEnabled: function () {
            return (
              !!this.isPluginInstalled() &&
              this.getPlugin().isAutoUpdateEnabled()
            );
          },
          setAutoUpdateEnabled: function () {
            return (
              !!this.isPluginInstalled() &&
              this.getPlugin().setAutoUpdateEnabled()
            );
          },
          setInstallerType: function (e) {
            return (
              (this.installType = e),
              !!this.isPluginInstalled() && this.getPlugin().setInstallerType(e)
            );
          },
          setAdditionalPackages: function (e) {
            return (
              !!this.isPluginInstalled() &&
              this.getPlugin().setAdditionalPackages(e)
            );
          },
          setEarlyAccess: function (e) {
            this.EAInstallEnabled = e;
          },
          isPlugin2: function () {
            if (this.isPluginInstalled() && this.versionCheck('1.6.0_10+'))
              try {
                return this.getPlugin().isPlugin2();
              } catch (e) {}
            return !1;
          },
          allowPlugin: function () {
            return (
              this.getBrowser(),
              'Safari' != this.browserName2 && 'Opera' != this.browserName2
            );
          },
          getPlugin: function () {
            this.refresh();
            var e = null;
            return (
              this.allowPlugin() &&
                (e = document.getElementById('deployJavaPlugin')),
              e
            );
          },
          compareVersionToPattern: function (e, t, i, n) {
            if (void 0 == e || void 0 == t) return !1;
            var r = e.match('^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$');
            if (null != r) {
              var o = 0;
              e = [];
              for (var s = 1; s < r.length; ++s)
                'string' == typeof r[s] && '' != r[s] && ((e[o] = r[s]), o++);
              if (((r = Math.min(e.length, t.length)), n)) {
                for (s = 0; s < r; ++s) {
                  if (e[s] < t[s]) return !1;
                  if (e[s] > t[s]) break;
                }
                return !0;
              }
              for (s = 0; s < r; ++s) if (e[s] != t[s]) return !1;
              return !!i || e.length == t.length;
            }
            return !1;
          },
          getBrowser: function () {
            if (null == this.browserName) {
              var t = navigator.userAgent.toLowerCase();
              e('[getBrowser()] navigator.userAgent.toLowerCase() -> ' + t),
                -1 != t.indexOf('msie') && -1 == t.indexOf('opera')
                  ? (this.browserName2 = this.browserName = 'MSIE')
                  : -1 != t.indexOf('iphone')
                  ? ((this.browserName = 'Netscape Family'),
                    (this.browserName2 = 'iPhone'))
                  : -1 != t.indexOf('firefox') && -1 == t.indexOf('opera')
                  ? ((this.browserName = 'Netscape Family'),
                    (this.browserName2 = 'Firefox'))
                  : -1 != t.indexOf('chrome')
                  ? ((this.browserName = 'Netscape Family'),
                    (this.browserName2 = 'Chrome'))
                  : -1 != t.indexOf('safari')
                  ? ((this.browserName = 'Netscape Family'),
                    (this.browserName2 = 'Safari'))
                  : -1 != t.indexOf('mozilla') && -1 == t.indexOf('opera')
                  ? ((this.browserName = 'Netscape Family'),
                    (this.browserName2 = 'Other'))
                  : -1 != t.indexOf('opera')
                  ? ((this.browserName = 'Netscape Family'),
                    (this.browserName2 = 'Opera'))
                  : ((this.browserName = '?'), (this.browserName2 = 'unknown')),
                e(
                  '[getBrowser()] Detected browser name:' +
                    this.browserName +
                    ', ' +
                    this.browserName2
                );
            }
            return this.browserName;
          },
          testUsingActiveX: function (t) {
            if (
              ((t = 'JavaWebStart.isInstalled.' + t + '.0'),
              'undefined' == typeof ActiveXObject || !ActiveXObject)
            )
              return (
                e(
                  '[testUsingActiveX()] Browser claims to be IE, but no ActiveXObject object?'
                ),
                !1
              );
            try {
              return null != new ActiveXObject(t);
            } catch (e) {
              return !1;
            }
          },
          testForMSVM: function () {
            if ('undefined' != typeof oClientCaps) {
              var e = oClientCaps.getComponentVersion(
                '{08B0E5C0-4FCB-11CF-AAA5-00401C608500}',
                'ComponentID'
              );
              return '' != e && '5,0,5000,0' != e;
            }
            return !1;
          },
          testUsingMimeTypes: function (t) {
            if (!navigator.mimeTypes)
              return (
                e(
                  '[testUsingMimeTypes()] Browser claims to be Netscape family, but no mimeTypes[] array?'
                ),
                !1
              );
            for (var i = 0; i < navigator.mimeTypes.length; ++i) {
              s = navigator.mimeTypes[i].type;
              var n = s.match(
                /^application\/x-java-applet\x3Bversion=(1\.8|1\.7|1\.6|1\.5|1\.4\.2)$/
              );
              if (null != n && this.compareVersions(n[1], t)) return !0;
            }
            return !1;
          },
          testUsingPluginsArray: function (e) {
            if (!navigator.plugins || !navigator.plugins.length) return !1;
            for (
              var t = navigator.platform.toLowerCase(), i = 0;
              i < navigator.plugins.length;
              ++i
            )
              if (
                ((s = navigator.plugins[i].description),
                -1 != s.search(/^Java Switchable Plug-in (Cocoa)/))
              ) {
                if (this.compareVersions('1.5.0', e)) return !0;
              } else if (
                -1 != s.search(/^Java/) &&
                -1 != t.indexOf('win') &&
                (this.compareVersions('1.5.0', e) ||
                  this.compareVersions('1.6.0', e))
              )
                return !0;
            return !!this.compareVersions('1.5.0', e);
          },
          IEInstall: function () {
            return (
              (location.href = t(
                (null != this.returnPage
                  ? '&returnPage=' + this.returnPage
                  : '') +
                  (null != this.locale ? '&locale=' + this.locale : '') +
                  (null != this.brand ? '&brand=' + this.brand : '')
              )),
              !1
            );
          },
          done: function (e, t) {},
          FFInstall: function () {
            return (
              (location.href = t(
                (null != this.returnPage
                  ? '&returnPage=' + this.returnPage
                  : '') +
                  (null != this.locale ? '&locale=' + this.locale : '') +
                  (null != this.brand ? '&brand=' + this.brand : '') +
                  (null != this.installType ? '&type=' + this.installType : '')
              )),
              !1
            );
          },
          compareVersions: function (e, t) {
            for (
              var i = e.split('.'), n = t.split('.'), r = 0;
              r < i.length;
              ++r
            )
              i[r] = Number(i[r]);
            for (r = 0; r < n.length; ++r) n[r] = Number(n[r]);
            return (
              2 == i.length && (i[2] = 0),
              i[0] > n[0] ||
                (!(i[0] < n[0]) &&
                  (i[1] > n[1] ||
                    (!(i[1] < n[1]) && (i[2] > n[2] || !(i[2] < n[2])))))
            );
          },
          enableAlerts: function () {
            (this.browserName = null), (this.debug = !0);
          },
          poll: function () {
            this.refresh();
            var e = this.getJREs();
            0 == this.preInstallJREList.length &&
              0 != e.length &&
              (clearInterval(this.myInterval),
              null != this.returnPage && (location.href = this.returnPage)),
              0 != this.preInstallJREList.length &&
                0 != e.length &&
                this.preInstallJREList[0] != e[0] &&
                (clearInterval(this.myInterval),
                null != this.returnPage && (location.href = this.returnPage));
          },
          writePluginTag: function () {
            var e = this.getBrowser();
            'MSIE' == e
              ? document.write(
                  '<object classid="clsid:CAFEEFAC-DEC7-0000-0001-ABCDEFFEDCBA" id="deployJavaPlugin" width="0" height="0"></object>'
                )
              : 'Netscape Family' == e &&
                this.allowPlugin() &&
                this.writeEmbedTag();
          },
          refresh: function () {
            navigator.plugins.refresh(!1),
              'Netscape Family' == this.getBrowser() &&
                this.allowPlugin() &&
                null == document.getElementById('deployJavaPlugin') &&
                this.writeEmbedTag();
          },
          writeEmbedTag: function () {
            var e = !1;
            if (null != navigator.mimeTypes) {
              for (var t = 0; t < navigator.mimeTypes.length; t++)
                navigator.mimeTypes[t].type == this.mimeType &&
                  navigator.mimeTypes[t].enabledPlugin &&
                  (document.write(
                    '<embed id="deployJavaPlugin" type="' +
                      this.mimeType +
                      '" hidden="true" />'
                  ),
                  (e = !0));
              if (!e)
                for (t = 0; t < navigator.mimeTypes.length; t++)
                  navigator.mimeTypes[t].type == this.oldMimeType &&
                    navigator.mimeTypes[t].enabledPlugin &&
                    document.write(
                      '<embed id="deployJavaPlugin" type="' +
                        this.oldMimeType +
                        '" hidden="true" />'
                    );
            }
          },
        };
        if ((o.writePluginTag(), null == o.locale)) {
          if (null == (i = null))
            try {
              i = navigator.userLanguage;
            } catch (e) {}
          if (null == i)
            try {
              i = navigator.systemLanguage;
            } catch (e) {}
          if (null == i)
            try {
              i = navigator.language;
            } catch (e) {}
          null != i && (i.replace('-', '_'), (o.locale = i));
        }
        return o;
      })(),
      u = function () {
        var e = ['monospace', 'sans-serif', 'serif'],
          t = document.getElementsByTagName('body')[0],
          i = document.createElement('span');
        (i.style.fontSize = '72px'), (i.innerHTML = 'mmmmmmmmmmlli');
        var n,
          r = {},
          o = {};
        for (n in e)
          (i.style.fontFamily = e[n]),
            t.appendChild(i),
            (r[e[n]] = i.offsetWidth),
            (o[e[n]] = i.offsetHeight),
            t.removeChild(i);
        this.detect = function (n) {
          var s,
            a = !1;
          for (s in e) {
            (i.style.fontFamily = n + ',' + e[s]), t.appendChild(i);
            var l = i.offsetWidth != r[e[s]] || i.offsetHeight != o[e[s]];
            t.removeChild(i), (a = a || l);
          }
          return a;
        };
      };
    function c(e, t) {
      var i, n, r, o, s;
      for (i = 3 & e.length, n = e.length - i, r = t, s = 0; s < n; )
        (o =
          (255 & e.charCodeAt(s)) |
          ((255 & e.charCodeAt(++s)) << 8) |
          ((255 & e.charCodeAt(++s)) << 16) |
          ((255 & e.charCodeAt(++s)) << 24)),
          ++s,
          (r =
            27492 +
            (65535 &
              (r =
                (5 *
                  (65535 &
                    (r =
                      ((r ^= o =
                        (461845907 *
                          (65535 &
                            (o =
                              ((o =
                                (3432918353 * (65535 & o) +
                                  (((3432918353 * (o >>> 16)) & 65535) << 16)) &
                                4294967295) <<
                                15) |
                              (o >>> 17))) +
                          (((461845907 * (o >>> 16)) & 65535) << 16)) &
                        4294967295) <<
                        13) |
                      (r >>> 19))) +
                  (((5 * (r >>> 16)) & 65535) << 16)) &
                4294967295)) +
            (((58964 + (r >>> 16)) & 65535) << 16));
      switch (((o = 0), i)) {
        case 3:
          o ^= (255 & e.charCodeAt(s + 2)) << 16;
        case 2:
          o ^= (255 & e.charCodeAt(s + 1)) << 8;
        case 1:
          r ^=
            (461845907 *
              (65535 &
                (o =
                  ((o =
                    (3432918353 * (65535 & (o ^= 255 & e.charCodeAt(s))) +
                      (((3432918353 * (o >>> 16)) & 65535) << 16)) &
                    4294967295) <<
                    15) |
                  (o >>> 17))) +
              (((461845907 * (o >>> 16)) & 65535) << 16)) &
            4294967295;
      }
      return (
        (r ^= e.length),
        (r =
          (2246822507 * (65535 & (r ^= r >>> 16)) +
            (((2246822507 * (r >>> 16)) & 65535) << 16)) &
          4294967295),
        ((r =
          (3266489909 * (65535 & (r ^= r >>> 13)) +
            (((3266489909 * (r >>> 16)) & 65535) << 16)) &
          4294967295) ^
          (r >>> 16)) >>>
          0
      );
    }
    var d = (function () {
      function e() {
        if (!x) {
          try {
            (e = S.getElementsByTagName('body')[0].appendChild(
              S.createElement('span')
            )).parentNode.removeChild(e);
          } catch (e) {
            return;
          }
          x = !0;
          for (var e = k.length, t = 0; t < e; t++) k[t]();
        }
      }
      function t(e) {
        x ? e() : (k[k.length] = e);
      }
      function i(e) {
        if (void 0 !== P.addEventListener) P.addEventListener('load', e, !1);
        else if (void 0 !== S.addEventListener)
          S.addEventListener('load', e, !1);
        else if (void 0 !== P.attachEvent)
          !(function (e, t, i) {
            e.attachEvent(t, i), (O[O.length] = [e, t, i]);
          })(P, 'onload', e);
        else if ('function' == typeof P.onload) {
          var t = P.onload;
          P.onload = function () {
            t(), e();
          };
        } else P.onload = e;
      }
      function n() {
        var e = I.length;
        if (0 < e)
          for (var t = 0; t < e; t++) {
            var i = I[t].id,
              n = I[t].callbackFn,
              l = { success: !1, id: i };
            if (0 < B.pv[0]) {
              if ((u = h(i)))
                if (!f(I[t].swfVersion) || (B.wk && 312 > B.wk))
                  if (I[t].expressInstall && o()) {
                    ((l = {}).data = I[t].expressInstall),
                      (l.width = u.getAttribute('width') || '0'),
                      (l.height = u.getAttribute('height') || '0'),
                      u.getAttribute('class') &&
                        (l.styleclass = u.getAttribute('class')),
                      u.getAttribute('align') &&
                        (l.align = u.getAttribute('align'));
                    for (
                      var u,
                        c = {},
                        d = (u = u.getElementsByTagName('param')).length,
                        p = 0;
                      p < d;
                      p++
                    )
                      'movie' != u[p].getAttribute('name').toLowerCase() &&
                        (c[u[p].getAttribute('name')] =
                          u[p].getAttribute('value'));
                    s(l, c, i, n);
                  } else a(u), n && n(l);
                else m(i, !0), n && ((l.success = !0), (l.ref = r(i)), n(l));
            } else
              m(i, !0),
                n &&
                  ((i = r(i)) &&
                    void 0 !== i.SetVariable &&
                    ((l.success = !0), (l.ref = i)),
                  n(l));
          }
      }
      function r(e) {
        var t = null;
        return (
          (e = h(e)) &&
            'OBJECT' == e.nodeName &&
            (void 0 !== e.SetVariable
              ? (t = e)
              : (e = e.getElementsByTagName('object')[0]) && (t = e)),
          t
        );
      }
      function o() {
        return !N && f('6.0.65') && (B.win || B.mac) && !(B.wk && 312 > B.wk);
      }
      function s(e, t, i, n) {
        (N = !0), (b = n || null), (w = { success: !1, id: i });
        var r = h(i);
        r &&
          ('OBJECT' == r.nodeName
            ? ((v = l(r)), (y = null))
            : ((v = r), (y = i)),
          (e.id = 'SWFObjectExprInst'),
          (void 0 === e.width ||
            (!/%$/.test(e.width) && 310 > parseInt(e.width, 10))) &&
            (e.width = '310'),
          (void 0 === e.height ||
            (!/%$/.test(e.height) && 137 > parseInt(e.height, 10))) &&
            (e.height = '137'),
          (S.title = S.title.slice(0, 47) + ' - Flash Player Installation'),
          (n = B.ie && B.win ? 'ActiveX' : 'PlugIn'),
          (n =
            'MMredirectURL=' +
            P.location.toString().replace(/&/g, '%26') +
            '&MMplayerType=' +
            n +
            '&MMdoctitle=' +
            S.title),
          (t.flashvars = void 0 !== t.flashvars ? t.flashvars + '&' + n : n),
          B.ie &&
            B.win &&
            4 != r.readyState &&
            ((i += 'SWFObjectNew'),
            (n = S.createElement('div')).setAttribute('id', i),
            r.parentNode.insertBefore(n, r),
            (r.style.display = 'none'),
            (function () {
              4 == r.readyState
                ? r.parentNode.removeChild(r)
                : setTimeout(arguments.callee, 10);
            })()),
          u(e, t, i));
      }
      function a(e) {
        if (B.ie && B.win && 4 != e.readyState) {
          var t = S.createElement('div');
          e.parentNode.insertBefore(t, e),
            t.parentNode.replaceChild(l(e), t),
            (e.style.display = 'none'),
            (function () {
              4 == e.readyState
                ? e.parentNode.removeChild(e)
                : setTimeout(arguments.callee, 10);
            })();
        } else e.parentNode.replaceChild(l(e), e);
      }
      function l(e) {
        var t = S.createElement('div');
        if (B.win && B.ie) t.innerHTML = e.innerHTML;
        else if (
          (e = e.getElementsByTagName('object')[0]) &&
          (e = e.childNodes)
        )
          for (var i = e.length, n = 0; n < i; n++)
            (1 == e[n].nodeType && 'PARAM' == e[n].nodeName) ||
              8 == e[n].nodeType ||
              t.appendChild(e[n].cloneNode(!0));
        return t;
      }
      function u(e, t, i) {
        var n,
          r = h(i);
        if (B.wk && 312 > B.wk) return n;
        if (r)
          if ((void 0 === e.id && (e.id = i), B.ie && B.win)) {
            var o,
              s = '';
            for (o in e)
              e[o] != Object.prototype[o] &&
                ('data' == o.toLowerCase()
                  ? (t.movie = e[o])
                  : 'styleclass' == o.toLowerCase()
                  ? (s += ' class="' + e[o] + '"')
                  : 'classid' != o.toLowerCase() &&
                    (s += ' ' + o + '="' + e[o] + '"'));
            for (var a in ((o = ''), t))
              t[a] != Object.prototype[a] &&
                (o += '<param name="' + a + '" value="' + t[a] + '" />');
            (r.outerHTML =
              '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
              s +
              '>' +
              o +
              '</object>'),
              (_[_.length] = e.id),
              (n = h(e.id));
          } else {
            for (var l in ((a = S.createElement('object')).setAttribute(
              'type',
              'application/x-shockwave-flash'
            ),
            e))
              e[l] != Object.prototype[l] &&
                ('styleclass' == l.toLowerCase()
                  ? a.setAttribute('class', e[l])
                  : 'classid' != l.toLowerCase() && a.setAttribute(l, e[l]));
            for (s in t)
              t[s] != Object.prototype[s] &&
                'movie' != s.toLowerCase() &&
                ((e = a),
                (o = s),
                (l = t[s]),
                (i = S.createElement('param')).setAttribute('name', o),
                i.setAttribute('value', l),
                e.appendChild(i));
            r.parentNode.replaceChild(a, r), (n = a);
          }
        return n;
      }
      function c(e) {
        var t = h(e);
        t &&
          'OBJECT' == t.nodeName &&
          (B.ie && B.win
            ? ((t.style.display = 'none'),
              (function () {
                if (4 == t.readyState) {
                  var i = h(e);
                  if (i) {
                    for (var n in i) 'function' == typeof i[n] && (i[n] = null);
                    i.parentNode.removeChild(i);
                  }
                } else setTimeout(arguments.callee, 10);
              })())
            : t.parentNode.removeChild(t));
      }
      function h(e) {
        var t = null;
        try {
          t = S.getElementById(e);
        } catch (e) {}
        return t;
      }
      function f(e) {
        var t = B.pv;
        return (
          ((e = e.split('.'))[0] = parseInt(e[0], 10)),
          (e[1] = parseInt(e[1], 10) || 0),
          (e[2] = parseInt(e[2], 10) || 0),
          t[0] > e[0] ||
            (t[0] == e[0] && t[1] > e[1]) ||
            (t[0] == e[0] && t[1] == e[1] && t[2] >= e[2])
        );
      }
      function p(e, t, i, n) {
        if (!B.ie || !B.mac) {
          var r = S.getElementsByTagName('head')[0];
          r &&
            ((i = i && 'string' == typeof i ? i : 'screen'),
            n && (E = A = null),
            (A && E == i) ||
              ((n = S.createElement('style')).setAttribute('type', 'text/css'),
              n.setAttribute('media', i),
              (A = r.appendChild(n)),
              B.ie &&
                B.win &&
                void 0 !== S.styleSheets &&
                0 < S.styleSheets.length &&
                (A = S.styleSheets[S.styleSheets.length - 1]),
              (E = i)),
            B.ie && B.win
              ? A && 'object' == typeof A.addRule && A.addRule(e, t)
              : A &&
                void 0 !== S.createTextNode &&
                A.appendChild(S.createTextNode(e + ' {' + t + '}')));
        }
      }
      function m(e, t) {
        if (M) {
          var i = t ? 'visible' : 'hidden';
          x && h(e)
            ? (h(e).style.visibility = i)
            : p('#' + e, 'visibility:' + i);
        }
      }
      function g(e) {
        return null != /[\\\"<>\.;]/.exec(e) &&
          'undefined' != typeof encodeURIComponent
          ? encodeURIComponent(e)
          : e;
      }
      var v,
        y,
        b,
        w,
        A,
        E,
        P = window,
        S = document,
        C = navigator,
        T = !1,
        k = [
          function () {
            T
              ? (function () {
                  var e = S.getElementsByTagName('body')[0],
                    t = S.createElement('object');
                  t.setAttribute('type', 'application/x-shockwave-flash');
                  var i = e.appendChild(t);
                  if (i) {
                    var r = 0;
                    !(function () {
                      if (void 0 !== i.GetVariable) {
                        var o = i.GetVariable('$version');
                        o &&
                          ((o = o.split(' ')[1].split(',')),
                          (B.pv = [
                            parseInt(o[0], 10),
                            parseInt(o[1], 10),
                            parseInt(o[2], 10),
                          ]));
                      } else if (10 > r)
                        return r++, void setTimeout(arguments.callee, 10);
                      e.removeChild(t), (i = null), n();
                    })();
                  } else n();
                })()
              : n();
          },
        ],
        I = [],
        _ = [],
        O = [],
        x = !1,
        N = !1,
        M = !0,
        B = (function () {
          var e =
              void 0 !== S.getElementById &&
              void 0 !== S.getElementsByTagName &&
              void 0 !== S.createElement,
            t = C.userAgent.toLowerCase(),
            i = C.platform.toLowerCase(),
            n = /win/.test(i || t),
            r =
              ((i = /mac/.test(i || t)),
              (t =
                !!/webkit/.test(t) &&
                parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, '$1'))),
              !1),
            o = [0, 0, 0],
            s = null;
          if (
            void 0 !== C.plugins &&
            'object' == typeof C.plugins['Shockwave Flash']
          )
            !(s = C.plugins['Shockwave Flash'].description) ||
              (void 0 !== C.mimeTypes &&
                C.mimeTypes['application/x-shockwave-flash'] &&
                !C.mimeTypes['application/x-shockwave-flash'].enabledPlugin) ||
              ((T = !0),
              (r = !1),
              (s = s.replace(/^.*\s+(\S+\s+\S+$)/, '$1')),
              (o[0] = parseInt(s.replace(/^(.*)\..*$/, '$1'), 10)),
              (o[1] = parseInt(s.replace(/^.*\.(.*)\s.*$/, '$1'), 10)),
              (o[2] = /[a-zA-Z]/.test(s)
                ? parseInt(s.replace(/^.*[a-zA-Z]+(.*)$/, '$1'), 10)
                : 0));
          else if (void 0 !== P.ActiveXObject)
            try {
              var a = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
              a &&
                (s = a.GetVariable('$version')) &&
                ((r = !0),
                (s = s.split(' ')[1].split(',')),
                (o = [
                  parseInt(s[0], 10),
                  parseInt(s[1], 10),
                  parseInt(s[2], 10),
                ]));
            } catch (e) {}
          return { w3: e, pv: o, wk: t, ie: r, win: n, mac: i };
        })();
      return (
        B.w3 &&
          (((void 0 !== S.readyState && 'complete' == S.readyState) ||
            (void 0 === S.readyState &&
              (S.getElementsByTagName('body')[0] || S.body))) &&
            e(),
          x ||
            (void 0 !== S.addEventListener &&
              S.addEventListener('DOMContentLoaded', e, !1),
            B.ie &&
              B.win &&
              (S.attachEvent('onreadystatechange', function () {
                'complete' == S.readyState &&
                  (S.detachEvent('onreadystatechange', arguments.callee), e());
              }),
              P == top &&
                (function () {
                  if (!x) {
                    try {
                      S.documentElement.doScroll('left');
                    } catch (e) {
                      return void setTimeout(arguments.callee, 0);
                    }
                    e();
                  }
                })()),
            B.wk &&
              (function () {
                x ||
                  (/loaded|complete/.test(S.readyState)
                    ? e()
                    : setTimeout(arguments.callee, 0));
              })(),
            i(e))),
        B.ie &&
          B.win &&
          window.attachEvent('onunload', function () {
            for (var e = O.length, t = 0; t < e; t++)
              O[t][0].detachEvent(O[t][1], O[t][2]);
            for (e = _.length, t = 0; t < e; t++) c(_[t]);
            for (var i in B) B[i] = null;
            for (var n in ((B = null), d)) d[n] = null;
            d = null;
          }),
        {
          registerObject: function (e, t, i, n) {
            if (B.w3 && e && t) {
              var r = {};
              (r.id = e),
                (r.swfVersion = t),
                (r.expressInstall = i),
                (r.callbackFn = n),
                (I[I.length] = r),
                m(e, !1);
            } else n && n({ success: !1, id: e });
          },
          getObjectById: function (e) {
            if (B.w3) return r(e);
          },
          embedSWF: function (e, i, n, r, a, l, c, d, h, p) {
            var g = { success: !1, id: i };
            B.w3 && !(B.wk && 312 > B.wk) && e && i && n && r && a
              ? (m(i, !1),
                t(function () {
                  (n += ''), (r += '');
                  var t = {};
                  if (h && 'object' == typeof h) for (var v in h) t[v] = h[v];
                  if (
                    ((t.data = e),
                    (t.width = n),
                    (t.height = r),
                    (v = {}),
                    d && 'object' == typeof d)
                  )
                    for (var y in d) v[y] = d[y];
                  if (c && 'object' == typeof c)
                    for (var b in c)
                      v.flashvars =
                        void 0 !== v.flashvars
                          ? v.flashvars + '&' + b + '=' + c[b]
                          : b + '=' + c[b];
                  if (f(a))
                    (y = u(t, v, i)),
                      t.id == i && m(i, !0),
                      (g.success = !0),
                      (g.ref = y);
                  else {
                    if (l && o()) return (t.data = l), void s(t, v, i, p);
                    m(i, !0);
                  }
                  p && p(g);
                }))
              : p && p(g);
          },
          switchOffAutoHideShow: function () {
            M = !1;
          },
          ua: B,
          getFlashPlayerVersion: function () {
            return { major: B.pv[0], minor: B.pv[1], release: B.pv[2] };
          },
          hasFlashPlayerVersion: f,
          createSWF: function (e, t, i) {
            if (B.w3) return u(e, t, i);
          },
          showExpressInstall: function (e, t, i, n) {
            B.w3 && o() && s(e, t, i, n);
          },
          removeSWF: function (e) {
            B.w3 && c(e);
          },
          createCSS: function (e, t, i, n) {
            B.w3 && p(e, t, i, n);
          },
          addDomLoadEvent: t,
          addLoadEvent: i,
          getQueryParamValue: function (e) {
            if ((t = S.location.search || S.location.hash)) {
              if ((/\?/.test(t) && (t = t.split('?')[1]), null == e))
                return g(t);
              for (var t = t.split('&'), i = 0; i < t.length; i++)
                if (t[i].substring(0, t[i].indexOf('=')) == e)
                  return g(t[i].substring(t[i].indexOf('=') + 1));
            }
            return '';
          },
          expressInstallCallback: function () {
            if (N) {
              var e = h('SWFObjectExprInst');
              e &&
                v &&
                (e.parentNode.replaceChild(v, e),
                y && (m(y, !0), B.ie && B.win && (v.style.display = 'block')),
                b && b(w)),
                (N = !1);
            }
          },
        }
      );
    })();
    !(function (i, n) {
      var r = {
          extend: function (e, t) {
            for (var i in t)
              -1 !== 'browser cpu device engine os'.indexOf(i) &&
                0 == t[i].length % 2 &&
                (e[i] = t[i].concat(e[i]));
            return e;
          },
          has: function (e, t) {
            return (
              'string' == typeof e &&
              -1 !== t.toLowerCase().indexOf(e.toLowerCase())
            );
          },
          lowerize: function (e) {
            return e.toLowerCase();
          },
          major: function (e) {
            return 'string' == typeof e ? e.split('.')[0] : n;
          },
        },
        o = function () {
          for (
            var e, t, i, r, o, s, a, l = 0, u = arguments;
            l < u.length && !s;

          ) {
            var c = u[l],
              d = u[l + 1];
            if (void 0 === e)
              for (r in ((e = {}), d))
                d.hasOwnProperty(r) &&
                  ('object' == typeof (o = d[r]) ? (e[o[0]] = n) : (e[o] = n));
            for (t = i = 0; t < c.length && !s; )
              if ((s = c[t++].exec(this.getUA())))
                for (r = 0; r < d.length; r++)
                  (a = s[++i]),
                    'object' == typeof (o = d[r]) && 0 < o.length
                      ? 2 == o.length
                        ? (e[o[0]] =
                            'function' == typeof o[1]
                              ? o[1].call(this, a)
                              : o[1])
                        : 3 == o.length
                        ? (e[o[0]] =
                            'function' != typeof o[1] ||
                            (o[1].exec && o[1].test)
                              ? a
                                ? a.replace(o[1], o[2])
                                : n
                              : a
                              ? o[1].call(this, a, o[2])
                              : n)
                        : 4 == o.length &&
                          (e[o[0]] = a
                            ? o[3].call(this, a.replace(o[1], o[2]))
                            : n)
                      : (e[o] = a || n);
            l += 2;
          }
          return e;
        },
        s = function (e, t) {
          for (var i in t)
            if ('object' == typeof t[i] && 0 < t[i].length) {
              for (var o = 0; o < t[i].length; o++)
                if (r.has(t[i][o], e)) return '?' === i ? n : i;
            } else if (r.has(t[i], e)) return '?' === i ? n : i;
          return e;
        },
        a = {
          ME: '4.90',
          'NT 3.11': 'NT3.51',
          'NT 4.0': 'NT4.0',
          2000: 'NT 5.0',
          XP: ['NT 5.1', 'NT 5.2'],
          Vista: 'NT 6.0',
          7: 'NT 6.1',
          8: 'NT 6.2',
          8.1: 'NT 6.3',
          10: ['NT 6.4', 'NT 10.0'],
          RT: 'ARM',
        },
        l = {
          browser: [
            [
              /(opera\smini)\/([\w\.-]+)/i,
              /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,
              /(opera).+version\/([\w\.]+)/i,
              /(opera)[\/\s]+([\w\.]+)/i,
            ],
            ['name', 'version'],
            [/\s(opr)\/([\w\.]+)/i],
            [['name', 'Opera'], 'version'],
            [
              /(kindle)\/([\w\.]+)/i,
              /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
              /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
              /(?:ms|\()(ie)\s([\w\.]+)/i,
              /(rekonq)\/([\w\.]+)*/i,
              /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i,
            ],
            ['name', 'version'],
            [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
            [['name', 'IE'], 'version'],
            [/(edge)\/((\d+)?[\w\.]+)/i],
            ['name', 'version'],
            [/(yabrowser)\/([\w\.]+)/i],
            [['name', 'Yandex'], 'version'],
            [/(comodo_dragon)\/([\w\.]+)/i],
            [['name', /_/g, ' '], 'version'],
            [
              /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,
              /(qqbrowser)[\/\s]?([\w\.]+)/i,
            ],
            ['name', 'version'],
            [
              /(uc\s?browser)[\/\s]?([\w\.]+)/i,
              /ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i,
              /JUC.+(ucweb)[\/\s]?([\w\.]+)/i,
            ],
            [['name', 'UCBrowser'], 'version'],
            [/(dolfin)\/([\w\.]+)/i],
            [['name', 'Dolphin'], 'version'],
            [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
            [['name', 'Chrome'], 'version'],
            [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],
            ['version', ['name', 'MIUI Browser']],
            [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],
            ['version', ['name', 'Android Browser']],
            [/FBAV\/([\w\.]+);/i],
            ['version', ['name', 'Facebook']],
            [/fxios\/([\w\.-]+)/i],
            ['version', ['name', 'Firefox']],
            [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
            ['version', ['name', 'Mobile Safari']],
            [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
            ['version', 'name'],
            [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
            [
              'name',
              [
                'version',
                s,
                {
                  '1.0': '/8',
                  1.2: '/1',
                  1.3: '/3',
                  '2.0': '/412',
                  '2.0.2': '/416',
                  '2.0.3': '/417',
                  '2.0.4': '/419',
                  '?': '/',
                },
              ],
            ],
            [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
            ['name', 'version'],
            [/(navigator|netscape)\/([\w\.-]+)/i],
            [['name', 'Netscape'], 'version'],
            [
              /(swiftfox)/i,
              /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
              /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
              /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,
              /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
              /(links)\s\(([\w\.]+)/i,
              /(gobrowser)\/?([\w\.]+)*/i,
              /(ice\s?browser)\/v?([\w\._]+)/i,
              /(mosaic)[\/\s]([\w\.]+)/i,
            ],
            ['name', 'version'],
          ],
          cpu: [
            [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
            [['architecture', 'amd64']],
            [/(ia32(?=;))/i],
            [['architecture', r.lowerize]],
            [/((?:i[346]|x)86)[;\)]/i],
            [['architecture', 'ia32']],
            [/windows\s(ce|mobile);\sppc;/i],
            [['architecture', 'arm']],
            [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
            [['architecture', /ower/, '', r.lowerize]],
            [/(sun4\w)[;\)]/i],
            [['architecture', 'sparc']],
            [
              /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i,
            ],
            [['architecture', r.lowerize]],
          ],
          device: [
            [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
            ['model', 'vendor', ['type', 'tablet']],
            [/applecoremedia\/[\w\.]+ \((ipad)/],
            ['model', ['vendor', 'Apple'], ['type', 'tablet']],
            [/(apple\s{0,1}tv)/i],
            [
              ['model', 'Apple TV'],
              ['vendor', 'Apple'],
            ],
            [
              /(archos)\s(gamepad2?)/i,
              /(hp).+(touchpad)/i,
              /(kindle)\/([\w\.]+)/i,
              /\s(nook)[\w\s]+build\/(\w+)/i,
              /(dell)\s(strea[kpr\s\d]*[\dko])/i,
            ],
            ['vendor', 'model', ['type', 'tablet']],
            [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],
            ['model', ['vendor', 'Amazon'], ['type', 'tablet']],
            [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],
            [
              ['model', s, { 'Fire Phone': ['SD', 'KF'] }],
              ['vendor', 'Amazon'],
              ['type', 'mobile'],
            ],
            [/\((ip[honed|\s\w*]+);.+(apple)/i],
            ['model', 'vendor', ['type', 'mobile']],
            [/\((ip[honed|\s\w*]+);/i],
            ['model', ['vendor', 'Apple'], ['type', 'mobile']],
            [
              /(blackberry)[\s-]?(\w+)/i,
              /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
              /(hp)\s([\w\s]+\w)/i,
              /(asus)-?(\w+)/i,
            ],
            ['vendor', 'model', ['type', 'mobile']],
            [/\(bb10;\s(\w+)/i],
            ['model', ['vendor', 'BlackBerry'], ['type', 'mobile']],
            [
              /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i,
            ],
            ['model', ['vendor', 'Asus'], ['type', 'tablet']],
            [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
            [
              ['vendor', 'Sony'],
              ['model', 'Xperia Tablet'],
              ['type', 'tablet'],
            ],
            [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],
            [
              ['vendor', 'Sony'],
              ['model', 'Xperia Phone'],
              ['type', 'mobile'],
            ],
            [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
            ['vendor', 'model', ['type', 'console']],
            [/android.+;\s(shield)\sbuild/i],
            ['model', ['vendor', 'Nvidia'], ['type', 'console']],
            [/(playstation\s[34portablevi]+)/i],
            ['model', ['vendor', 'Sony'], ['type', 'console']],
            [/(sprint\s(\w+))/i],
            [
              ['vendor', s, { HTC: 'APA', Sprint: 'Sprint' }],
              ['model', s, { 'Evo Shift 4G': '7373KT' }],
              ['type', 'mobile'],
            ],
            [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
            ['vendor', 'model', ['type', 'tablet']],
            [
              /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,
              /(zte)-(\w+)*/i,
              /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i,
            ],
            ['vendor', ['model', /_/g, ' '], ['type', 'mobile']],
            [/(nexus\s9)/i],
            ['model', ['vendor', 'HTC'], ['type', 'tablet']],
            [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
            ['model', ['vendor', 'Microsoft'], ['type', 'console']],
            [/(kin\.[onetw]{3})/i],
            [
              ['model', /\./g, ' '],
              ['vendor', 'Microsoft'],
              ['type', 'mobile'],
            ],
            [
              /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,
              /mot[\s-]?(\w+)*/i,
              /(XT\d{3,4}) build\//i,
              /(nexus\s[6])/i,
            ],
            ['model', ['vendor', 'Motorola'], ['type', 'mobile']],
            [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
            ['model', ['vendor', 'Motorola'], ['type', 'tablet']],
            [
              /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i,
              /((SM-T\w+))/i,
            ],
            [['vendor', 'Samsung'], 'model', ['type', 'tablet']],
            [
              /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i,
              /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
              /sec-((sgh\w+))/i,
            ],
            [['vendor', 'Samsung'], 'model', ['type', 'mobile']],
            [/(samsung);smarttv/i],
            ['vendor', 'model', ['type', 'smarttv']],
            [/\(dtv[\);].+(aquos)/i],
            ['model', ['vendor', 'Sharp'], ['type', 'smarttv']],
            [/sie-(\w+)*/i],
            ['model', ['vendor', 'Siemens'], ['type', 'mobile']],
            [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i],
            [['vendor', 'Nokia'], 'model', ['type', 'mobile']],
            [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
            ['model', ['vendor', 'Acer'], ['type', 'tablet']],
            [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
            [['vendor', 'LG'], 'model', ['type', 'tablet']],
            [/(lg) netcast\.tv/i],
            ['vendor', 'model', ['type', 'smarttv']],
            [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i],
            ['model', ['vendor', 'LG'], ['type', 'mobile']],
            [/android.+(ideatab[a-z0-9\-\s]+)/i],
            ['model', ['vendor', 'Lenovo'], ['type', 'tablet']],
            [/linux;.+((jolla));/i],
            ['vendor', 'model', ['type', 'mobile']],
            [/((pebble))app\/[\d\.]+\s/i],
            ['vendor', 'model', ['type', 'wearable']],
            [/android.+;\s(glass)\s\d/i],
            ['model', ['vendor', 'Google'], ['type', 'wearable']],
            [
              /android.+(\w+)\s+build\/hm\1/i,
              /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,
              /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i,
            ],
            [
              ['model', /_/g, ' '],
              ['vendor', 'Xiaomi'],
              ['type', 'mobile'],
            ],
            [/\s(tablet)[;\/\s]/i, /\s(mobile)[;\/\s]/i],
            [['type', r.lowerize], 'vendor', 'model'],
          ],
          engine: [
            [/windows.+\sedge\/([\w\.]+)/i],
            ['version', ['name', 'EdgeHTML']],
            [
              /(presto)\/([\w\.]+)/i,
              /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,
              /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
              /(icab)[\/\s]([23]\.[\d\.]+)/i,
            ],
            ['name', 'version'],
            [/rv\:([\w\.]+).*(gecko)/i],
            ['version', 'name'],
          ],
          os: [
            [/microsoft\s(windows)\s(vista|xp)/i],
            ['name', 'version'],
            [
              /(windows)\snt\s6\.2;\s(arm)/i,
              /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i,
            ],
            ['name', ['version', s, a]],
            [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
            [
              ['name', 'Windows'],
              ['version', s, a],
            ],
            [/\((bb)(10);/i],
            [['name', 'BlackBerry'], 'version'],
            [
              /(blackberry)\w*\/?([\w\.]+)*/i,
              /(tizen)[\/\s]([\w\.]+)/i,
              /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
              /linux;.+(sailfish);/i,
            ],
            ['name', 'version'],
            [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
            [['name', 'Symbian'], 'version'],
            [/\((series40);/i],
            ['name'],
            [/mozilla.+\(mobile;.+gecko.+firefox/i],
            [['name', 'Firefox OS'], 'version'],
            [
              /(nintendo|playstation)\s([wids34portablevu]+)/i,
              /(mint)[\/\s\(]?(\w+)*/i,
              /(mageia|vectorlinux)[;\s]/i,
              /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,
              /(hurd|linux)\s?([\w\.]+)*/i,
              /(gnu)\s?([\w\.]+)*/i,
            ],
            ['name', 'version'],
            [/(cros)\s[\w]+\s([\w\.]+\w)/i],
            [['name', 'Chromium OS'], 'version'],
            [/(sunos)\s?([\w\.]+\d)*/i],
            [['name', 'Solaris'], 'version'],
            [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
            ['name', 'version'],
            [/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i],
            [
              ['name', 'iOS'],
              ['version', /_/g, '.'],
            ],
            [
              /(mac\sos\sx)\s?([\w\s\.]+\w)*/i,
              /(macintosh|mac(?=_powerpc)\s)/i,
            ],
            [
              ['name', 'Mac OS'],
              ['version', /_/g, '.'],
            ],
            [
              /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,
              /(haiku)\s(\w+)/i,
              /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,
              /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
              /(unix)\s?([\w\.]+)*/i,
            ],
            ['name', 'version'],
          ],
        },
        u = function (e, t) {
          if (!(this instanceof u)) return new u(e, t).getResult();
          var n =
              e ||
              (i && i.navigator && i.navigator.userAgent
                ? i.navigator.userAgent
                : ''),
            s = t ? r.extend(l, t) : l;
          return (
            (this.getBrowser = function () {
              var e = o.apply(this, s.browser);
              return (e.major = r.major(e.version)), e;
            }),
            (this.getCPU = function () {
              return o.apply(this, s.cpu);
            }),
            (this.getDevice = function () {
              return o.apply(this, s.device);
            }),
            (this.getEngine = function () {
              return o.apply(this, s.engine);
            }),
            (this.getOS = function () {
              return o.apply(this, s.os);
            }),
            (this.getResult = function () {
              return {
                ua: this.getUA(),
                browser: this.getBrowser(),
                engine: this.getEngine(),
                os: this.getOS(),
                device: this.getDevice(),
                cpu: this.getCPU(),
              };
            }),
            (this.getUA = function () {
              return n;
            }),
            (this.setUA = function (e) {
              return (n = e), this;
            }),
            this.setUA(n),
            this
          );
        };
      (u.VERSION = '0.7.10'),
        (u.BROWSER = { NAME: 'name', MAJOR: 'major', VERSION: 'version' }),
        (u.CPU = { ARCHITECTURE: 'architecture' }),
        (u.DEVICE = {
          MODEL: 'model',
          VENDOR: 'vendor',
          TYPE: 'type',
          CONSOLE: 'console',
          MOBILE: 'mobile',
          SMARTTV: 'smarttv',
          TABLET: 'tablet',
          WEARABLE: 'wearable',
          EMBEDDED: 'embedded',
        }),
        (u.ENGINE = { NAME: 'name', VERSION: 'version' }),
        (u.OS = { NAME: 'name', VERSION: 'version' }),
        void 0 !== e && e.exports && (t = e.exports = u),
        (t.UAParser = u);
      var c = i.jQuery || i.Zepto;
      if (void 0 !== c) {
        var d = new u();
        (c.ua = d.getResult()),
          (c.ua.get = function () {
            return d.getUA();
          }),
          (c.ua.set = function (e) {
            for (var t in (d.setUA(e), (e = d.getResult()))) c.ua[t] = e[t];
          });
      }
    })('object' == typeof window ? window : this);
  },
  function (e, t, i) {
    'use strict';
    var n,
      r = a(i(0)),
      o = a(i(3)),
      s = a(i(2));
    function a(e) {
      return e && e.__esModule ? e : { default: e };
    }
    void 0 === (n = window).EmanageCRMJS &&
      (n.EmanageCRMJS = function e() {
        var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, e),
          (this.webkey = void 0 === t.webkey ? '' : t.webkey),
          (this.cid = void 0 === t.cid ? '' : t.cid),
          (this.lang = void 0 === t.lang ? '' : t.lang),
          (this.successUrl = void 0 === t.successUrl ? '' : t.successUrl),
          (this.declineUrl = void 0 === t.declineUrl ? '' : t.declineUrl),
          (this.isTest = void 0 !== t.isTest && t.isTest),
          (this.utils = {
            getPaymentTypes: r.default.getPaymentTypes,
            getParameter: r.default.getParameter,
          }),
          (this.Campaign = new o.default(
            this.webkey,
            this.cid,
            this.isTest,
            t.baseGetAPIEndpoint
          )),
          (this.Order = new s.default(
            this.webkey,
            this.cid,
            this.isTest,
            t.basePostAPIEndpoint
          ));
      });
  },
  function (e, t, i) {
    e.exports = i(10);
  },
]);
//# sourceMappingURL=emanagecrmjs.1.0.min.js.map
