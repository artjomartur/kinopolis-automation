import { a as Bc, b as Ye, c as F } from "./chunk-ELYU6EKT.mjs";
var Ke = {};
Bc(Ke, {
  Children: () => mo,
  Component: () => ke,
  Fragment: () => ai,
  Profiler: () => Vw,
  PureComponent: () => Aw,
  StrictMode: () => Dw,
  Suspense: () => Bw,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => zw,
  cloneElement: () => Er,
  createContext: () => he,
  createElement: () => ne,
  createFactory: () => Hw,
  createRef: () => Op,
  default: () => p,
  forwardRef: () => Ne,
  isValidElement: () => si,
  lazy: () => Nw,
  memo: () => $w,
  startTransition: () => li,
  unstable_act: () => Ww,
  useCallback: () => ae,
  useContext: () => O,
  useDebugValue: () => Uw,
  useDeferredValue: () => jw,
  useEffect: () => X,
  useId: () => Tr,
  useImperativeHandle: () => Xw,
  useInsertionEffect: () => dt,
  useLayoutEffect: () => Ir,
  useMemo: () => se,
  useReducer: () => Gw,
  useRef: () => B,
  useState: () => ht,
  useSyncExternalStore: () => Yw,
  useTransition: () => Kw,
  version: () => qw,
});
var p = {},
  po = Symbol.for("react.element"),
  xw = Symbol.for("react.portal"),
  Sw = Symbol.for("react.fragment"),
  ww = Symbol.for("react.strict_mode"),
  kw = Symbol.for("react.profiler"),
  Cw = Symbol.for("react.provider"),
  Ew = Symbol.for("react.context"),
  Tw = Symbol.for("react.forward_ref"),
  Iw = Symbol.for("react.suspense"),
  Rw = Symbol.for("react.memo"),
  Pw = Symbol.for("react.lazy"),
  Cp = Symbol.iterator;
function _w(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Cp && e[Cp]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var Ip = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Rp = Object.assign,
  Pp = {};
function oi(e, t, n) {
  ((this.props = e), (this.context = t), (this.refs = Pp), (this.updater = n || Ip));
}
oi.prototype.isReactComponent = {};
oi.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
oi.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function _p() {}
_p.prototype = oi.prototype;
function Nc(e, t, n) {
  ((this.props = e), (this.context = t), (this.refs = Pp), (this.updater = n || Ip));
}
var $c = (Nc.prototype = new _p());
$c.constructor = Nc;
Rp($c, oi.prototype);
$c.isPureReactComponent = !0;
var Ep = Array.isArray,
  Fp = Object.prototype.hasOwnProperty,
  Wc = { current: null },
  Lp = { key: !0, ref: !0, __self: !0, __source: !0 };
function Mp(e, t, n) {
  var r,
    i = {},
    o = null,
    a = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t))
      Fp.call(t, r) && !Lp.hasOwnProperty(r) && (i[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) i.children = n;
  else if (1 < s) {
    for (var l = Array(s), c = 0; c < s; c++) l[c] = arguments[c + 2];
    i.children = l;
  }
  if (e && e.defaultProps) for (r in ((s = e.defaultProps), s)) i[r] === void 0 && (i[r] = s[r]);
  return { $$typeof: po, type: e, key: o, ref: a, props: i, _owner: Wc.current };
}
function Fw(e, t) {
  return { $$typeof: po, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Uc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === po;
}
function Lw(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Tp = /\/+/g;
function zc(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Lw("" + e.key) : t.toString(36);
}
function Qa(e, t, n, r, i) {
  var o = typeof e;
  (o !== "undefined" && o !== "boolean") || (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (o) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case po:
          case xw:
            a = !0;
        }
    }
  if (a)
    return (
      (a = e),
      (i = i(a)),
      (e = r === "" ? "." + zc(a, 0) : r),
      Ep(i)
        ? ((n = ""),
          e != null && (n = e.replace(Tp, "$&/") + "/"),
          Qa(i, t, n, "", function (c) {
            return c;
          }))
        : i != null &&
          (Uc(i) &&
            (i = Fw(
              i,
              n +
                (!i.key || (a && a.key === i.key) ? "" : ("" + i.key).replace(Tp, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((a = 0), (r = r === "" ? "." : r + ":"), Ep(e)))
    for (var s = 0; s < e.length; s++) {
      o = e[s];
      var l = r + zc(o, s);
      a += Qa(o, t, n, l, i);
    }
  else if (((l = _w(e)), typeof l == "function"))
    for (e = l.call(e), s = 0; !(o = e.next()).done;)
      ((o = o.value), (l = r + zc(o, s++)), (a += Qa(o, t, n, l, i)));
  else if (o === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) +
          "). If you meant to render a collection of children, use an array instead."
      )
    );
  return a;
}
function qa(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Qa(e, r, "", "", function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function Mw(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status !== 0 && e._status !== -1) || ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status !== 0 && e._status !== -1) || ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ot = { current: null },
  Za = { transition: null },
  Ow = { ReactCurrentDispatcher: ot, ReactCurrentBatchConfig: Za, ReactCurrentOwner: Wc };
p.Children = {
  map: qa,
  forEach: function (e, t, n) {
    qa(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      qa(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      qa(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Uc(e))
      throw Error("React.Children.only expected to receive a single React element child.");
    return e;
  },
};
p.Component = oi;
p.Fragment = Sw;
p.Profiler = kw;
p.PureComponent = Nc;
p.StrictMode = ww;
p.Suspense = Iw;
p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ow;
p.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " + e + "."
    );
  var r = Rp({}, e.props),
    i = e.key,
    o = e.ref,
    a = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (a = Wc.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (l in t)
      Fp.call(t, l) &&
        !Lp.hasOwnProperty(l) &&
        (r[l] = t[l] === void 0 && s !== void 0 ? s[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    s = Array(l);
    for (var c = 0; c < l; c++) s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: po, type: e.type, key: i, ref: o, props: r, _owner: a };
};
p.createContext = function (e) {
  return (
    (e = {
      $$typeof: Ew,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Cw, _context: e }),
    (e.Consumer = e)
  );
};
p.createElement = Mp;
p.createFactory = function (e) {
  var t = Mp.bind(null, e);
  return ((t.type = e), t);
};
p.createRef = function () {
  return { current: null };
};
p.forwardRef = function (e) {
  return { $$typeof: Tw, render: e };
};
p.isValidElement = Uc;
p.lazy = function (e) {
  return { $$typeof: Pw, _payload: { _status: -1, _result: e }, _init: Mw };
};
p.memo = function (e, t) {
  return { $$typeof: Rw, type: e, compare: t === void 0 ? null : t };
};
p.startTransition = function (e) {
  var t = Za.transition;
  Za.transition = {};
  try {
    e();
  } finally {
    Za.transition = t;
  }
};
p.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
p.useCallback = function (e, t) {
  return ot.current.useCallback(e, t);
};
p.useContext = function (e) {
  return ot.current.useContext(e);
};
p.useDebugValue = function () {};
p.useDeferredValue = function (e) {
  return ot.current.useDeferredValue(e);
};
p.useEffect = function (e, t) {
  return ot.current.useEffect(e, t);
};
p.useId = function () {
  return ot.current.useId();
};
p.useImperativeHandle = function (e, t, n) {
  return ot.current.useImperativeHandle(e, t, n);
};
p.useInsertionEffect = function (e, t) {
  return ot.current.useInsertionEffect(e, t);
};
p.useLayoutEffect = function (e, t) {
  return ot.current.useLayoutEffect(e, t);
};
p.useMemo = function (e, t) {
  return ot.current.useMemo(e, t);
};
p.useReducer = function (e, t, n) {
  return ot.current.useReducer(e, t, n);
};
p.useRef = function (e) {
  return ot.current.useRef(e);
};
p.useState = function (e) {
  return ot.current.useState(e);
};
p.useSyncExternalStore = function (e, t, n) {
  return ot.current.useSyncExternalStore(e, t, n);
};
p.useTransition = function () {
  return ot.current.useTransition();
};
p.version = "18.2.0";
var mo = p.Children,
  ke = p.Component,
  ai = p.Fragment,
  Vw = p.Profiler,
  Aw = p.PureComponent,
  Dw = p.StrictMode,
  Bw = p.Suspense,
  zw = p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Er = p.cloneElement,
  he = p.createContext,
  ne = p.createElement,
  Hw = p.createFactory,
  Op = p.createRef,
  Ne = p.forwardRef,
  si = p.isValidElement,
  Nw = p.lazy,
  $w = p.memo,
  li = p.startTransition,
  Ww = p.unstable_act,
  ae = p.useCallback,
  O = p.useContext,
  Uw = p.useDebugValue,
  jw = p.useDeferredValue,
  X = p.useEffect,
  Tr = p.useId,
  Xw = p.useImperativeHandle,
  dt = p.useInsertionEffect,
  Ir = p.useLayoutEffect,
  se = p.useMemo,
  Gw = p.useReducer,
  B = p.useRef,
  ht = p.useState,
  Yw = p.useSyncExternalStore,
  Kw = p.useTransition,
  qw = p.version;
var Qw = Object.create,
  bu = Object.defineProperty,
  Zw = Object.getOwnPropertyDescriptor,
  Qm = Object.getOwnPropertyNames,
  Jw = Object.getPrototypeOf,
  ek = Object.prototype.hasOwnProperty,
  tk = (e, t, n) =>
    t in e ? bu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n),
  an = (e, t) =>
    function () {
      return (t || (0, e[Qm(e)[0]])((t = { exports: {} }).exports, t), t.exports);
    },
  nk = (e, t, n, r) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let i of Qm(t))
        !ek.call(e, i) &&
          i !== n &&
          bu(e, i, { get: () => t[i], enumerable: !(r = Zw(t, i)) || r.enumerable });
    return e;
  },
  jt = (e, t, n) => (
    (n = e != null ? Qw(Jw(e)) : {}),
    nk(t || !e || !e.__esModule ? bu(n, "default", { value: e, enumerable: !0 }) : n, e)
  ),
  R = (e, t, n) => (tk(e, typeof t != "symbol" ? t + "" : t, n), n),
  Zm = (e, t, n) => {
    if (!t.has(e)) throw TypeError("Cannot " + n);
  },
  mt = (e, t, n) => (Zm(e, t, "read from private field"), n ? n.call(e) : t.get(e)),
  _o = (e, t, n) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, n);
  },
  xu = (e, t, n, r) => (Zm(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n),
  rk = an({
    "../../../node_modules/@emotion/memoize/dist/memoize.browser.cjs.js"(e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      function t(n) {
        var r = {};
        return function (i) {
          return (r[i] === void 0 && (r[i] = n(i)), r[i]);
        };
      }
      e.default = t;
    },
  }),
  ik = an({
    "../../../node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.cjs.js"(e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      function t(o) {
        return o && typeof o == "object" && "default" in o ? o.default : o;
      }
      var n = t(rk()),
        r =
          /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
        i = n(function (o) {
          return (
            r.test(o) ||
            (o.charCodeAt(0) === 111 && o.charCodeAt(1) === 110 && o.charCodeAt(2) < 91)
          );
        });
      e.default = i;
    },
  }),
  Sn = he({ transformPagePoint: (e) => e, isStatic: !1, reducedMotion: "never" }),
  Fo = he({}),
  mi = he(null),
  Lo = typeof document < "u",
  Xn = Lo ? Ir : X,
  Su = (e) => e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
  ok = "framerAppearId",
  gs = "data-" + Su(ok),
  ys = { skipAnimations: !1, useManualTiming: !1 },
  Io = he({}),
  bs = he({}),
  Jm = he({ strict: !1 }),
  Vp = class {
    constructor() {
      ((this.order = []), (this.scheduled = new Set()));
    }
    add(e) {
      if (!this.scheduled.has(e)) return (this.scheduled.add(e), this.order.push(e), !0);
    }
    remove(e) {
      let t = this.order.indexOf(e);
      t !== -1 && (this.order.splice(t, 1), this.scheduled.delete(e));
    }
    clear() {
      ((this.order.length = 0), this.scheduled.clear());
    }
  };
function ak(e) {
  let t = new Vp(),
    n = new Vp(),
    r = 0,
    i = !1,
    o = !1,
    a = new WeakSet(),
    s = {
      schedule: (l, c = !1, u = !1) => {
        let f = u && i,
          d = f ? t : n;
        return (c && a.add(l), d.add(l) && f && i && (r = t.order.length), l);
      },
      cancel: (l) => {
        (n.remove(l), a.delete(l));
      },
      process: (l) => {
        if (i) {
          o = !0;
          return;
        }
        if (((i = !0), ([t, n] = [n, t]), n.clear(), (r = t.order.length), r))
          for (let c = 0; c < r; c++) {
            let u = t.order[c];
            (a.has(u) && (s.schedule(u), e()), u(l));
          }
        ((i = !1), o && ((o = !1), s.process(l)));
      },
    };
  return s;
}
var bo = ["prepare", "read", "update", "preRender", "render", "postRender"],
  sk = 40;
function ev(e, t) {
  let n = !1,
    r = !0,
    i = { delta: 0, timestamp: 0, isProcessing: !1 },
    o = bo.reduce((f, d) => ((f[d] = ak(() => (n = !0))), f), {}),
    a = (f) => {
      o[f].process(i);
    },
    s = () => {
      let f = ys.useManualTiming ? i.timestamp : performance.now();
      ((n = !1),
        (i.delta = r ? 1e3 / 60 : Math.max(Math.min(f - i.timestamp, sk), 1)),
        (i.timestamp = f),
        (i.isProcessing = !0),
        bo.forEach(a),
        (i.isProcessing = !1),
        n && t && ((r = !1), e(s)));
    },
    l = () => {
      ((n = !0), (r = !0), i.isProcessing || e(s));
    };
  return {
    schedule: bo.reduce((f, d) => {
      let m = o[d];
      return ((f[d] = (y, b = !1, S = !1) => (n || l(), m.schedule(y, b, S))), f);
    }, {}),
    cancel: (f) => bo.forEach((d) => o[d].cancel(f)),
    state: i,
    steps: o,
  };
}
var { schedule: wu, cancel: g3 } = ev(queueMicrotask, !1);
function lk(e, t, n, r) {
  let { visualElement: i } = O(Fo),
    o = O(Jm),
    a = O(mi),
    s = O(Sn).reducedMotion,
    l = B();
  ((r = r || o.renderer),
    !l.current &&
      r &&
      (l.current = r(e, {
        visualState: t,
        parent: i,
        props: n,
        presenceContext: a,
        blockInitialAnimation: a ? a.initial === !1 : !1,
        reducedMotionConfig: s,
      })));
  let c = l.current;
  dt(() => {
    c && c.update(n, a);
  });
  let u = B(!!(n[gs] && !F.HandoffComplete));
  return (
    Xn(() => {
      c &&
        (wu.postRender(c.render),
        u.current && c.animationState && c.animationState.animateChanges());
    }),
    X(() => {
      c &&
        (c.updateFeatures(),
        !u.current && c.animationState && c.animationState.animateChanges(),
        u.current && ((u.current = !1), (F.HandoffComplete = !0)));
    }),
    c
  );
}
function ci(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function ck(e, t, n) {
  return ae(
    (r) => {
      (r && e.mount && e.mount(r),
        t && (r ? t.mount(r) : t.unmount()),
        n && (typeof n == "function" ? n(r) : ci(n) && (n.current = r)));
    },
    [t]
  );
}
function Ro(e) {
  return typeof e == "string" || Array.isArray(e);
}
function xs(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
var ku = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"],
  Cu = ["initial", ...ku];
function Ss(e) {
  return xs(e.animate) || Cu.some((t) => Ro(e[t]));
}
function tv(e) {
  return !!(Ss(e) || e.variants);
}
function uk(e, t) {
  if (Ss(e)) {
    let { initial: n, animate: r } = e;
    return { initial: n === !1 || Ro(n) ? n : void 0, animate: Ro(r) ? r : void 0 };
  }
  return e.inherit !== !1 ? t : {};
}
function fk(e) {
  let { initial: t, animate: n } = uk(e, O(Fo));
  return se(() => ({ initial: t, animate: n }), [Ap(t), Ap(n)]);
}
function Ap(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
var Dp = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  Po = {};
for (let e in Dp) Po[e] = { isEnabled: (t) => Dp[e].some((n) => !!t[n]) };
function dk(e) {
  for (let t in e) Po[t] = { ...Po[t], ...e[t] };
}
var Eu = Symbol.for("motionComponentSymbol");
function nv({
  preloadedFeatures: e,
  createVisualElement: t,
  useRender: n,
  useVisualState: r,
  Component: i,
}) {
  e && dk(e);
  function o(s, l) {
    let c,
      u = { ...O(Sn), ...s, layoutId: hk(s) },
      { isStatic: f } = u,
      d = fk(s),
      m = r(s, f);
    if (!f && Lo) {
      d.visualElement = lk(i, m, u, t);
      let y = O(bs),
        b = O(Jm).strict;
      d.visualElement && (c = d.visualElement.loadFeatures(u, b, e, y));
    }
    return ne(
      Fo.Provider,
      { value: d },
      c && d.visualElement ? ne(c, { visualElement: d.visualElement, ...u }) : null,
      n(i, s, ck(m, d.visualElement, l), m, f, d.visualElement)
    );
  }
  let a = Ne(o);
  return ((a[Eu] = i), a);
}
function hk({ layoutId: e }) {
  let t = O(Io).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
var ls = {};
function Tu(e) {
  Object.assign(ls, e);
}
var me = (e) => !!(e && e.getVelocity),
  Mo = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  Ar = new Set(Mo),
  pk = { x: "translateX", y: "translateY", z: "translateZ", transformPerspective: "perspective" },
  mk = Mo.length;
function rv(e, { enableHardwareAcceleration: t = !0, allowTransformNone: n = !0 }, r, i) {
  let o = "";
  for (let a = 0; a < mk; a++) {
    let s = Mo[a];
    if (e[s] !== void 0) {
      let l = pk[s] || s;
      o += `${l}(${e[s]}) `;
    }
  }
  return (
    t && !e.z && (o += "translateZ(0)"),
    (o = o.trim()),
    i ? (o = i(e, r ? "" : o)) : n && r && (o = "none"),
    o
  );
}
var wn = (e, t, n) => (n > t ? t : n < e ? e : n),
  So = (e) => Math.round(e * 1e5) / 1e5,
  Iu = /(-)?([\d]*\.?[\d])+/g,
  vk =
    /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,
  gk =
    /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function Oo(e) {
  return typeof e == "string";
}
var Vo = (e) => ({
    test: (t) => Oo(t) && t.endsWith(e) && t.split(" ").length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  Nn = Vo("deg"),
  tn = Vo("%"),
  U = Vo("px"),
  yk = Vo("vh"),
  bk = Vo("vw"),
  Bp = { ...tn, parse: (e) => tn.parse(e) / 100, transform: (e) => tn.transform(e * 100) },
  xk = new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "ignoreStrict",
    "viewport",
  ]);
function hi(e) {
  return (
    e.startsWith("while") ||
    (e.startsWith("drag") && e !== "draggable") ||
    e.startsWith("layout") ||
    e.startsWith("onTap") ||
    e.startsWith("onPan") ||
    e.startsWith("onLayout") ||
    xk.has(e)
  );
}
var iv = (e) => !hi(e);
function ov(e) {
  e && (iv = (t) => (t.startsWith("on") ? !hi(t) : e(t)));
}
try {
  ov(ik().default);
} catch {}
function av(e, t, n) {
  let r = {};
  for (let i in e)
    (i === "values" && typeof e.values == "object") ||
      ((iv(i) ||
        (n === !0 && hi(i)) ||
        (!t && !hi(i)) ||
        (e.draggable && i.startsWith("onDrag"))) &&
        (r[i] = e[i]));
  return r;
}
var cs = (e) => Array.isArray(e),
  Sk = (e) => !!(e && typeof e == "object" && e.mix && e.toValue),
  wk = (e) => (cs(e) ? e[e.length - 1] || 0 : e);
function qe(e) {
  let t = me(e) ? e.get() : e;
  return Sk(t) ? t.toValue() : t;
}
function Ru(e, t, n, r = {}, i = {}) {
  return (
    typeof t == "function" && (t = t(n !== void 0 ? n : e.custom, r, i)),
    typeof t == "string" && (t = e.variants && e.variants[t]),
    typeof t == "function" && (t = t(n !== void 0 ? n : e.custom, r, i)),
    t
  );
}
function Cn(e) {
  let t = B(null);
  return (t.current === null && (t.current = e()), t.current);
}
function kk({ scrapeMotionValuesFromProps: e, createRenderState: t, onMount: n }, r, i, o) {
  let a = { latestValues: Ck(r, i, o, e), renderState: t() };
  return (n && (a.mount = (s) => n(r, s, a)), a);
}
var ws = (e) => (t, n) => {
  let r = O(Fo),
    i = O(mi),
    o = () => kk(e, t, r, i);
  return n ? o() : Cn(o);
};
function Ck(e, t, n, r) {
  let i = {},
    o = r(e, {});
  for (let d in o) i[d] = qe(o[d]);
  let { initial: a, animate: s } = e,
    l = Ss(e),
    c = tv(e);
  t &&
    c &&
    !l &&
    e.inherit !== !1 &&
    (a === void 0 && (a = t.initial), s === void 0 && (s = t.animate));
  let u = n ? n.initial === !1 : !1;
  u = u || a === !1;
  let f = u ? s : a;
  return (
    f &&
      typeof f != "boolean" &&
      !xs(f) &&
      (Array.isArray(f) ? f : [f]).forEach((m) => {
        let y = Ru(e, m);
        if (!y) return;
        let { transitionEnd: b, transition: S, ...h } = y;
        for (let v in h) {
          let g = h[v];
          if (Array.isArray(g)) {
            let x = u ? g.length - 1 : 0;
            g = g[x];
          }
          g !== null && (i[v] = g);
        }
        for (let v in b) i[v] = b[v];
      }),
    i
  );
}
var Ce = (e) => e,
  {
    schedule: q,
    cancel: Qe,
    state: xe,
    steps: rs,
  } = ev(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Ce, !0),
  sv = (e) =>
    e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1;
function ks(e, t = "page") {
  return { point: { x: e[t + "X"], y: e[t + "Y"] } };
}
var lv = (e) => (t) => sv(t) && e(t, ks(t));
function bn(e, t, n, r = { passive: !0 }) {
  return (e.addEventListener(t, n, r), () => e.removeEventListener(t, n));
}
function nn(e, t, n, r) {
  return bn(e, t, lv(n), r);
}
var Ek = (e, t) => (n) => t(e(n)),
  rn = (...e) => e.reduce(Ek);
function cv(e) {
  let t = null;
  return () => {
    let n = () => {
      t = null;
    };
    return t === null ? ((t = e), n) : !1;
  };
}
var zp = cv("dragHorizontal"),
  Hp = cv("dragVertical");
function uv(e) {
  let t = !1;
  if (e === "y") t = Hp();
  else if (e === "x") t = zp();
  else {
    let n = zp(),
      r = Hp();
    n && r
      ? (t = () => {
          (n(), r());
        })
      : (n && n(), r && r());
  }
  return t;
}
function Pu() {
  let e = uv(!0);
  return e ? (e(), !1) : !0;
}
var Ao = Ce,
  Ze = Ce,
  fv = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  Tk = 1e-7,
  Ik = 12;
function Rk(e, t, n, r, i) {
  let o,
    a,
    s = 0;
  do ((a = t + (n - t) / 2), (o = fv(a, r, i) - e), o > 0 ? (n = a) : (t = a));
  while (Math.abs(o) > Tk && ++s < Ik);
  return a;
}
function vi(e, t, n, r) {
  if (e === t && n === r) return Ce;
  let i = (o) => Rk(o, 0, 1, e, n);
  return (o) => (o === 0 || o === 1 ? o : fv(i(o), t, r));
}
var dv = vi(0.42, 0, 1, 1),
  hv = vi(0, 0, 0.58, 1),
  _u = vi(0.42, 0, 0.58, 1),
  Fu = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
  Lu = (e) => (t) => 1 - e(1 - t),
  Cs = (e) => 1 - Math.sin(Math.acos(e)),
  Mu = Lu(Cs),
  pv = Fu(Cs),
  Ou = vi(0.33, 1.53, 0.69, 0.99),
  Es = Lu(Ou),
  mv = Fu(Es),
  vv = (e) => ((e *= 2) < 1 ? 0.5 * Es(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1)))),
  Un = (e, t, n) => {
    let r = t - e;
    return r === 0 ? 1 : (n - e) / r;
  },
  gi = { test: (e) => typeof e == "number", parse: parseFloat, transform: (e) => e },
  wo = { ...gi, transform: (e) => wn(0, 1, e) },
  Ja = { ...gi, default: 1 },
  Vu = (e, t) => (n) =>
    !!(
      (Oo(n) && gk.test(n) && n.startsWith(e)) ||
      (t && Object.prototype.hasOwnProperty.call(n, t))
    ),
  gv = (e, t, n) => (r) => {
    if (!Oo(r)) return r;
    let [i, o, a, s] = r.match(Iu);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(o),
      [n]: parseFloat(a),
      alpha: s !== void 0 ? parseFloat(s) : 1,
    };
  },
  Pk = (e) => wn(0, 255, e),
  jc = { ...gi, transform: (e) => Math.round(Pk(e)) },
  Lr = {
    test: Vu("rgb", "red"),
    parse: gv("red", "green", "blue"),
    transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
      "rgba(" +
      jc.transform(e) +
      ", " +
      jc.transform(t) +
      ", " +
      jc.transform(n) +
      ", " +
      So(wo.transform(r)) +
      ")",
  };
function _k(e) {
  let t = "",
    n = "",
    r = "",
    i = "";
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (n = e.substring(3, 5)),
        (r = e.substring(5, 7)),
        (i = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (i = e.substring(4, 5)),
        (t += t),
        (n += n),
        (r += r),
        (i += i)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(r, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
var nu = { test: Vu("#"), parse: _k, transform: Lr.transform },
  ui = {
    test: Vu("hsl", "hue"),
    parse: gv("hue", "saturation", "lightness"),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
      "hsla(" +
      Math.round(e) +
      ", " +
      tn.transform(So(t)) +
      ", " +
      tn.transform(So(n)) +
      ", " +
      So(wo.transform(r)) +
      ")",
  },
  $e = {
    test: (e) => Lr.test(e) || nu.test(e) || ui.test(e),
    parse: (e) => (Lr.test(e) ? Lr.parse(e) : ui.test(e) ? ui.parse(e) : nu.parse(e)),
    transform: (e) => (Oo(e) ? e : e.hasOwnProperty("red") ? Lr.transform(e) : ui.transform(e)),
  };
function Fk(e) {
  var t, n;
  return (
    isNaN(e) &&
    Oo(e) &&
    (((t = e.match(Iu)) === null || t === void 0 ? void 0 : t.length) || 0) +
      (((n = e.match(vk)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  );
}
var yv = "number",
  bv = "color",
  Lk = "var",
  Mk = "var(",
  Np = "${}",
  $p =
    /(var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\))|(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))|((-)?([\d]*\.?[\d])+)/gi;
function us(e) {
  let t = e.toString(),
    n = t.match($p) || [],
    r = [],
    i = { color: [], number: [], var: [] },
    o = [];
  for (let l = 0; l < n.length; l++) {
    let c = n[l];
    $e.test(c)
      ? (i.color.push(l), o.push(bv), r.push($e.parse(c)))
      : c.startsWith(Mk)
        ? (i.var.push(l), o.push(Lk), r.push(c))
        : (i.number.push(l), o.push(yv), r.push(parseFloat(c)));
  }
  let s = t.replace($p, Np).split(Np);
  return { values: r, split: s, indexes: i, types: o };
}
function xv(e) {
  return us(e).values;
}
function Sv(e) {
  let { split: t, types: n } = us(e),
    r = t.length;
  return (i) => {
    let o = "";
    for (let a = 0; a < r; a++)
      if (((o += t[a]), i[a] !== void 0)) {
        let s = n[a];
        s === yv ? (o += So(i[a])) : s === bv ? (o += $e.transform(i[a])) : (o += i[a]);
      }
    return o;
  };
}
var Ok = (e) => (typeof e == "number" ? 0 : e);
function Vk(e) {
  let t = xv(e);
  return Sv(e)(t.map(Ok));
}
var kn = { test: Fk, parse: xv, createTransformer: Sv, getAnimatableNone: Vk },
  le = (e, t, n) => e + (t - e) * n;
function Xc(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
  );
}
function Ak({ hue: e, saturation: t, lightness: n, alpha: r }) {
  ((e /= 360), (t /= 100), (n /= 100));
  let i = 0,
    o = 0,
    a = 0;
  if (!t) i = o = a = n;
  else {
    let s = n < 0.5 ? n * (1 + t) : n + t - n * t,
      l = 2 * n - s;
    ((i = Xc(l, s, e + 1 / 3)), (o = Xc(l, s, e)), (a = Xc(l, s, e - 1 / 3)));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(a * 255),
    alpha: r,
  };
}
var Gc = (e, t, n) => {
    let r = e * e,
      i = n * (t * t - r) + r;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  Dk = [nu, Lr, ui],
  Bk = (e) => Dk.find((t) => t.test(e));
function Wp(e) {
  let t = Bk(e);
  Ze(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`);
  let n = t.parse(e);
  return (t === ui && (n = Ak(n)), n);
}
var Up = (e, t) => {
    let n = Wp(e),
      r = Wp(t),
      i = { ...n };
    return (o) => (
      (i.red = Gc(n.red, r.red, o)),
      (i.green = Gc(n.green, r.green, o)),
      (i.blue = Gc(n.blue, r.blue, o)),
      (i.alpha = le(n.alpha, r.alpha, o)),
      Lr.transform(i)
    );
  },
  wv = (e) => (t) => typeof t == "string" && t.startsWith(e),
  kv = wv("--"),
  zk = wv("var(--"),
  fs = (e) => (zk(e) ? Hk.test(e.split("/*")[0].trim()) : !1),
  Hk = /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)$/i;
function ru(e, t) {
  return (n) => (n > 0 ? t : e);
}
function Nk(e, t) {
  return (n) => le(e, t, n);
}
function Au(e) {
  return typeof e == "number"
    ? Nk
    : typeof e == "string"
      ? fs(e)
        ? ru
        : $e.test(e)
          ? Up
          : Uk
      : Array.isArray(e)
        ? Cv
        : typeof e == "object"
          ? $e.test(e)
            ? Up
            : $k
          : ru;
}
function Cv(e, t) {
  let n = [...e],
    r = n.length,
    i = e.map((o, a) => Au(o)(o, t[a]));
  return (o) => {
    for (let a = 0; a < r; a++) n[a] = i[a](o);
    return n;
  };
}
function $k(e, t) {
  let n = { ...e, ...t },
    r = {};
  for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = Au(e[i])(e[i], t[i]));
  return (i) => {
    for (let o in r) n[o] = r[o](i);
    return n;
  };
}
function Wk(e, t) {
  var n;
  let r = [],
    i = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < t.values.length; o++) {
    let a = t.types[o],
      s = e.indexes[a][i[a]],
      l = (n = e.values[s]) !== null && n !== void 0 ? n : 0;
    ((r[o] = l), i[a]++);
  }
  return r;
}
var Uk = (e, t) => {
  let n = kn.createTransformer(t),
    r = us(e),
    i = us(t);
  return r.indexes.var.length === i.indexes.var.length &&
    r.indexes.color.length === i.indexes.color.length &&
    r.indexes.number.length >= i.indexes.number.length
    ? rn(Cv(Wk(r, i), i.values), n)
    : (Ao(
        !0,
        `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`
      ),
      ru(e, t));
};
function Du(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number"
    ? le(e, t, n)
    : Au(e)(e, t);
}
function jk(e, t, n) {
  let r = [],
    i = n || Du,
    o = e.length - 1;
  for (let a = 0; a < o; a++) {
    let s = i(e[a], e[a + 1]);
    if (t) {
      let l = Array.isArray(t) ? t[a] || Ce : t;
      s = rn(l, s);
    }
    r.push(s);
  }
  return r;
}
function yi(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  let o = e.length;
  if ((Ze(o === t.length, "Both input and output ranges must be the same length"), o === 1))
    return () => t[0];
  e[0] > e[o - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  let a = jk(t, r, i),
    s = a.length,
    l = (c) => {
      let u = 0;
      if (s > 1) for (; u < e.length - 2 && !(c < e[u + 1]); u++);
      let f = Un(e[u], e[u + 1], c);
      return a[u](f);
    };
  return n ? (c) => l(wn(e[0], e[o - 1], c)) : l;
}
var xn = (e) => e * 1e3,
  on = (e) => e / 1e3;
function Bu(e, t) {
  return t ? e * (1e3 / t) : 0;
}
var Xk = 5;
function Ev(e, t, n) {
  let r = Math.max(t - Xk, 0);
  return Bu(n - e(r), t - r);
}
var Yc = 0.001,
  Gk = 0.01,
  jp = 10,
  Yk = 0.05,
  Kk = 1;
function qk({ duration: e = 800, bounce: t = 0.25, velocity: n = 0, mass: r = 1 }) {
  let i, o;
  Ao(e <= xn(jp), "Spring duration must be 10 seconds or less");
  let a = 1 - t;
  ((a = wn(Yk, Kk, a)),
    (e = wn(Gk, jp, on(e))),
    a < 1
      ? ((i = (c) => {
          let u = c * a,
            f = u * e,
            d = u - n,
            m = iu(c, a),
            y = Math.exp(-f);
          return Yc - (d / m) * y;
        }),
        (o = (c) => {
          let f = c * a * e,
            d = f * n + n,
            m = Math.pow(a, 2) * Math.pow(c, 2) * e,
            y = Math.exp(-f),
            b = iu(Math.pow(c, 2), a);
          return ((-i(c) + Yc > 0 ? -1 : 1) * ((d - m) * y)) / b;
        }))
      : ((i = (c) => {
          let u = Math.exp(-c * e),
            f = (c - n) * e + 1;
          return -Yc + u * f;
        }),
        (o = (c) => {
          let u = Math.exp(-c * e),
            f = (n - c) * (e * e);
          return u * f;
        })));
  let s = 5 / e,
    l = Zk(i, o, s);
  if (((e = xn(e)), isNaN(l))) return { stiffness: 100, damping: 10, duration: e };
  {
    let c = Math.pow(l, 2) * r;
    return { stiffness: c, damping: a * 2 * Math.sqrt(r * c), duration: e };
  }
}
var Qk = 12;
function Zk(e, t, n) {
  let r = n;
  for (let i = 1; i < Qk; i++) r = r - e(r) / t(r);
  return r;
}
function iu(e, t) {
  return e * Math.sqrt(1 - t * t);
}
var Jk = ["duration", "bounce"],
  eC = ["stiffness", "damping", "mass"];
function Xp(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function tC(e) {
  let t = { velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: !1, ...e };
  if (!Xp(e, eC) && Xp(e, Jk)) {
    let n = qk(e);
    ((t = { ...t, ...n, mass: 1 }), (t.isResolvedFromDuration = !0));
  }
  return t;
}
function Do({ keyframes: e, restDelta: t, restSpeed: n, ...r }) {
  let i = e[0],
    o = e[e.length - 1],
    a = { done: !1, value: i },
    {
      stiffness: s,
      damping: l,
      mass: c,
      duration: u,
      velocity: f,
      isResolvedFromDuration: d,
    } = tC({ ...r, velocity: -on(r.velocity || 0) }),
    m = f || 0,
    y = l / (2 * Math.sqrt(s * c)),
    b = o - i,
    S = on(Math.sqrt(s / c)),
    h = Math.abs(b) < 5;
  (n || (n = h ? 0.01 : 2), t || (t = h ? 0.005 : 0.5));
  let v;
  if (y < 1) {
    let g = iu(S, y);
    v = (x) => {
      let k = Math.exp(-y * S * x);
      return o - k * (((m + y * S * b) / g) * Math.sin(g * x) + b * Math.cos(g * x));
    };
  } else if (y === 1) v = (g) => o - Math.exp(-S * g) * (b + (m + S * b) * g);
  else {
    let g = S * Math.sqrt(y * y - 1);
    v = (x) => {
      let k = Math.exp(-y * S * x),
        w = Math.min(g * x, 300);
      return o - (k * ((m + y * S * b) * Math.sinh(w) + g * b * Math.cosh(w))) / g;
    };
  }
  return {
    calculatedDuration: (d && u) || null,
    next: (g) => {
      let x = v(g);
      if (d) a.done = g >= u;
      else {
        let k = m;
        g !== 0 && (y < 1 ? (k = Ev(v, g, x)) : (k = 0));
        let w = Math.abs(k) <= n,
          E = Math.abs(o - x) <= t;
        a.done = w && E;
      }
      return ((a.value = a.done ? o : x), a);
    },
  };
}
var Tv = (e) => Array.isArray(e) && typeof e[0] != "number",
  Gp = {
    linear: Ce,
    easeIn: dv,
    easeInOut: _u,
    easeOut: hv,
    circIn: Cs,
    circInOut: pv,
    circOut: Mu,
    backIn: Es,
    backInOut: mv,
    backOut: Ou,
    anticipate: vv,
  },
  Yp = (e) => {
    if (Array.isArray(e)) {
      Ze(e.length === 4, "Cubic bezier arrays must contain four numerical values.");
      let [t, n, r, i] = e;
      return vi(t, n, r, i);
    } else if (typeof e == "string")
      return (Ze(Gp[e] !== void 0, `Invalid easing type '${e}'`), Gp[e]);
    return e;
  };
function Iv(e, t) {
  let n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    let i = Un(0, t, r);
    e.push(le(n, 1, i));
  }
}
function zu(e) {
  let t = [0];
  return (Iv(t, e.length - 1), t);
}
function nC(e, t) {
  return e.map((n) => n * t);
}
function rC(e, t) {
  return e.map(() => t || _u).splice(0, e.length - 1);
}
function ds({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
  let i = Tv(r) ? r.map(Yp) : Yp(r),
    o = { done: !1, value: t[0] },
    a = nC(n && n.length === t.length ? n : zu(t), e),
    s = yi(a, t, { ease: Array.isArray(i) ? i : rC(t, i) });
  return { calculatedDuration: e, next: (l) => ((o.value = s(l)), (o.done = l >= e), o) };
}
function Kp({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: o = 500,
  modifyTarget: a,
  min: s,
  max: l,
  restDelta: c = 0.5,
  restSpeed: u,
}) {
  let f = e[0],
    d = { done: !1, value: f },
    m = (C) => (s !== void 0 && C < s) || (l !== void 0 && C > l),
    y = (C) => (s === void 0 ? l : l === void 0 || Math.abs(s - C) < Math.abs(l - C) ? s : l),
    b = n * t,
    S = f + b,
    h = a === void 0 ? S : a(S);
  h !== S && (b = h - f);
  let v = (C) => -b * Math.exp(-C / r),
    g = (C) => h + v(C),
    x = (C) => {
      let I = v(C),
        T = g(C);
      ((d.done = Math.abs(I) <= c), (d.value = d.done ? h : T));
    },
    k,
    w,
    E = (C) => {
      m(d.value) &&
        ((k = C),
        (w = Do({
          keyframes: [d.value, y(d.value)],
          velocity: Ev(g, C, d.value),
          damping: i,
          stiffness: o,
          restDelta: c,
          restSpeed: u,
        })));
    };
  return (
    E(0),
    {
      calculatedDuration: null,
      next: (C) => {
        let I = !1;
        return (
          !w && k === void 0 && ((I = !0), x(C), E(C)),
          k !== void 0 && C > k ? w.next(C - k) : (!I && x(C), d)
        );
      },
    }
  );
}
var is;
function iC() {
  is = void 0;
}
var Mr = {
    now: () => (
      is === void 0 &&
        Mr.set(xe.isProcessing || ys.useManualTiming ? xe.timestamp : performance.now()),
      is
    ),
    set: (e) => {
      ((is = e), queueMicrotask(iC));
    },
  },
  oC = (e) => {
    let t = ({ timestamp: n }) => e(n);
    return {
      start: () => q.update(t, !0),
      stop: () => Qe(t),
      now: () => (xe.isProcessing ? xe.timestamp : Mr.now()),
    };
  },
  ou = 2e4;
function au(e) {
  let t = 0,
    n = 50,
    r = e.next(t);
  for (; !r.done && t < ou;) ((t += n), (r = e.next(t)));
  return t >= ou ? 1 / 0 : t;
}
var aC = { decay: Kp, inertia: Kp, tween: ds, keyframes: ds, spring: Do },
  sC = (e) => e / 100;
function Vr({
  autoplay: e = !0,
  delay: t = 0,
  driver: n = oC,
  keyframes: r,
  type: i = "keyframes",
  repeat: o = 0,
  repeatDelay: a = 0,
  repeatType: s = "loop",
  onPlay: l,
  onStop: c,
  onComplete: u,
  onUpdate: f,
  ...d
}) {
  let m = 1,
    y = !1,
    b,
    S,
    h = () => {
      S = new Promise(($) => {
        b = $;
      });
    };
  h();
  let v,
    g = aC[i] || ds,
    x;
  g !== ds && typeof r[0] != "number" && ((x = rn(sC, Du(r[0], r[1]))), (r = [0, 100]));
  let k = g({ ...d, keyframes: r }),
    w;
  s === "mirror" && (w = g({ ...d, keyframes: [...r].reverse(), velocity: -(d.velocity || 0) }));
  let E = "idle",
    C = null,
    I = null,
    T = null;
  k.calculatedDuration === null && o && (k.calculatedDuration = au(k));
  let { calculatedDuration: z } = k,
    A = 1 / 0,
    H = 1 / 0;
  z !== null && ((A = z + a), (H = A * (o + 1) - a));
  let L = 0,
    M = ($) => {
      if (I === null) return;
      (m > 0 && (I = Math.min(I, $)),
        m < 0 && (I = Math.min($ - H / m, I)),
        C !== null ? (L = C) : (L = Math.round($ - I) * m));
      let ie = L - t * (m >= 0 ? 1 : -1),
        Q = m >= 0 ? ie < 0 : ie > H;
      ((L = Math.max(ie, 0)), E === "finished" && C === null && (L = H));
      let Z = L,
        ze = k;
      if (o) {
        let J = Math.min(L, H) / A,
          Ut = Math.floor(J),
          Fe = J % 1;
        (!Fe && J >= 1 && (Fe = 1),
          Fe === 1 && Ut--,
          (Ut = Math.min(Ut, o + 1)),
          !!(Ut % 2) &&
            (s === "reverse" ? ((Fe = 1 - Fe), a && (Fe -= a / A)) : s === "mirror" && (ze = w)),
          (Z = wn(0, 1, Fe) * A));
      }
      let Xe = Q ? { done: !1, value: r[0] } : ze.next(Z);
      x && (Xe.value = x(Xe.value));
      let { done: He } = Xe;
      !Q && z !== null && (He = m >= 0 ? L >= H : L <= 0);
      let Ge = C === null && (E === "finished" || (E === "running" && He));
      return (f && f(Xe.value), Ge && j(), Xe);
    },
    D = () => {
      (v && v.stop(), (v = void 0));
    },
    P = () => {
      ((E = "idle"), D(), b(), h(), (I = T = null));
    },
    j = () => {
      ((E = "finished"), u && u(), D(), b());
    },
    K = () => {
      if (y) return;
      v || (v = n(M));
      let $ = v.now();
      (l && l(),
        C !== null ? (I = $ - C) : (!I || E === "finished") && (I = $),
        E === "finished" && h(),
        (T = I),
        (C = null),
        (E = "running"),
        v.start());
    };
  e && K();
  let N = {
    then($, ie) {
      return S.then($, ie);
    },
    get time() {
      return on(L);
    },
    set time($) {
      (($ = xn($)), (L = $), C !== null || !v || m === 0 ? (C = $) : (I = v.now() - $ / m));
    },
    get duration() {
      let $ = k.calculatedDuration === null ? au(k) : k.calculatedDuration;
      return on($);
    },
    get speed() {
      return m;
    },
    set speed($) {
      $ === m || !v || ((m = $), (N.time = on(L)));
    },
    get state() {
      return E;
    },
    play: K,
    pause: () => {
      ((E = "paused"), (C = L));
    },
    stop: () => {
      ((y = !0), E !== "idle" && ((E = "idle"), c && c(), P()));
    },
    cancel: () => {
      (T !== null && M(T), P());
    },
    complete: () => {
      E = "finished";
    },
    sample: ($) => ((I = 0), M($)),
  };
  return N;
}
function Hu(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Ts(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
function lC([...e], t, n) {
  let r = t < 0 ? e.length + t : t;
  if (r >= 0 && r < e.length) {
    let i = n < 0 ? e.length + n : n,
      [o] = e.splice(t, 1);
    e.splice(i, 0, o);
  }
  return e;
}
var Nu = class {
    constructor() {
      this.subscriptions = [];
    }
    add(e) {
      return (Hu(this.subscriptions, e), () => Ts(this.subscriptions, e));
    }
    notify(e, t, n) {
      let r = this.subscriptions.length;
      if (r)
        if (r === 1) this.subscriptions[0](e, t, n);
        else
          for (let i = 0; i < r; i++) {
            let o = this.subscriptions[i];
            o && o(e, t, n);
          }
    }
    getSize() {
      return this.subscriptions.length;
    }
    clear() {
      this.subscriptions.length = 0;
    }
  },
  qp = 30,
  cC = (e) => !isNaN(parseFloat(e)),
  ko = { current: void 0 },
  Is = class {
    constructor(e, t = {}) {
      ((this.version = "11.0.7"),
        (this.canTrackVelocity = !1),
        (this.events = {}),
        (this.updateAndNotify = (n, r = !0) => {
          let i = Mr.now();
          (this.updatedAt !== i && this.setPrevFrameValue(),
            (this.prev = this.current),
            this.setCurrent(n),
            this.current !== this.prev &&
              this.events.change &&
              this.events.change.notify(this.current),
            r && this.events.renderRequest && this.events.renderRequest.notify(this.current));
        }),
        (this.hasAnimated = !1),
        this.setCurrent(e),
        (this.canTrackVelocity = cC(this.current)),
        (this.owner = t.owner));
    }
    setCurrent(e) {
      ((this.current = e), (this.updatedAt = Mr.now()));
    }
    setPrevFrameValue(e = this.current) {
      ((this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt));
    }
    onChange(e) {
      return this.on("change", e);
    }
    on(e, t) {
      this.events[e] || (this.events[e] = new Nu());
      let n = this.events[e].add(t);
      return e === "change"
        ? () => {
            (n(),
              q.read(() => {
                this.events.change.getSize() || this.stop();
              }));
          }
        : n;
    }
    clearListeners() {
      for (let e in this.events) this.events[e].clear();
    }
    attach(e, t) {
      ((this.passiveEffect = e), (this.stopPassiveEffect = t));
    }
    set(e, t = !0) {
      !t || !this.passiveEffect
        ? this.updateAndNotify(e, t)
        : this.passiveEffect(e, this.updateAndNotify);
    }
    setWithVelocity(e, t, n) {
      (this.set(t),
        (this.prev = void 0),
        (this.prevFrameValue = e),
        (this.prevUpdatedAt = this.updatedAt - n));
    }
    jump(e) {
      (this.updateAndNotify(e),
        (this.prev = e),
        (this.prevUpdatedAt = this.prevFrameValue = void 0),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect());
    }
    get() {
      return (ko.current && ko.current.push(this), this.current);
    }
    getPrevious() {
      return this.prev;
    }
    getVelocity() {
      let e = Mr.now();
      if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > qp)
        return 0;
      let t = Math.min(this.updatedAt - this.prevUpdatedAt, qp);
      return Bu(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
    }
    start(e) {
      return (
        this.stop(),
        new Promise((t) => {
          ((this.hasAnimated = !0),
            (this.animation = e(t)),
            this.events.animationStart && this.events.animationStart.notify());
        }).then(() => {
          (this.events.animationComplete && this.events.animationComplete.notify(),
            this.clearAnimation());
        })
      );
    }
    stop() {
      (this.animation &&
        (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation());
    }
    isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      delete this.animation;
    }
    destroy() {
      (this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect());
    }
  };
function pe(e, t) {
  return new Is(e, t);
}
var Rv = (e) => /^\-?\d*\.?\d+$/.test(e),
  Pv = (e) => /^0[^.\s]+$/.test(e),
  uC = new Set(["brightness", "contrast", "saturate", "opacity"]);
function fC(e) {
  let [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow") return e;
  let [r] = n.match(Iu) || [];
  if (!r) return e;
  let i = n.replace(r, ""),
    o = uC.has(t) ? 1 : 0;
  return (r !== n && (o *= 100), t + "(" + o + i + ")");
}
var dC = /([a-z-]*)\(.*?\)/g,
  su = {
    ...kn,
    getAnimatableNone: (e) => {
      let t = e.match(dC);
      return t ? t.map(fC).join(" ") : e;
    },
  },
  Qp = { ...gi, transform: Math.round },
  _v = {
    borderWidth: U,
    borderTopWidth: U,
    borderRightWidth: U,
    borderBottomWidth: U,
    borderLeftWidth: U,
    borderRadius: U,
    radius: U,
    borderTopLeftRadius: U,
    borderTopRightRadius: U,
    borderBottomRightRadius: U,
    borderBottomLeftRadius: U,
    width: U,
    maxWidth: U,
    height: U,
    maxHeight: U,
    size: U,
    top: U,
    right: U,
    bottom: U,
    left: U,
    padding: U,
    paddingTop: U,
    paddingRight: U,
    paddingBottom: U,
    paddingLeft: U,
    margin: U,
    marginTop: U,
    marginRight: U,
    marginBottom: U,
    marginLeft: U,
    rotate: Nn,
    rotateX: Nn,
    rotateY: Nn,
    rotateZ: Nn,
    scale: Ja,
    scaleX: Ja,
    scaleY: Ja,
    scaleZ: Ja,
    skew: Nn,
    skewX: Nn,
    skewY: Nn,
    distance: U,
    translateX: U,
    translateY: U,
    translateZ: U,
    x: U,
    y: U,
    z: U,
    perspective: U,
    transformPerspective: U,
    opacity: wo,
    originX: Bp,
    originY: Bp,
    originZ: U,
    zIndex: Qp,
    fillOpacity: wo,
    strokeOpacity: wo,
    numOctaves: Qp,
  },
  hC = {
    ..._v,
    color: $e,
    backgroundColor: $e,
    outlineColor: $e,
    fill: $e,
    stroke: $e,
    borderColor: $e,
    borderTopColor: $e,
    borderRightColor: $e,
    borderBottomColor: $e,
    borderLeftColor: $e,
    filter: su,
    WebkitFilter: su,
  },
  $u = (e) => hC[e];
function Fv(e, t) {
  let n = $u(e);
  return (n !== su && (n = kn), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0);
}
var Lv = (e) => (t) => t.test(e),
  pC = { test: (e) => e === "auto", parse: (e) => e },
  Mv = [gi, U, tn, Nn, bk, yk, pC],
  vo = (e) => Mv.find(Lv(e)),
  mC = [...Mv, $e, kn],
  vC = (e) => mC.find(Lv(e));
function gC(e) {
  let t = {};
  return (e.values.forEach((n, r) => (t[r] = n.get())), t);
}
function yC(e) {
  let t = {};
  return (e.values.forEach((n, r) => (t[r] = n.getVelocity())), t);
}
function Rs(e, t, n) {
  let r = e.getProps();
  return Ru(r, t, n !== void 0 ? n : r.custom, gC(e), yC(e));
}
function bC(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, pe(n));
}
function Wu(e, t) {
  let n = Rs(e, t),
    { transitionEnd: r = {}, transition: i = {}, ...o } = n ? e.makeTargetAnimatable(n, !1) : {};
  o = { ...o, ...r };
  for (let a in o) {
    let s = wk(o[a]);
    bC(e, a, s);
  }
}
function lu(e, t) {
  [...t].reverse().forEach((r) => {
    let i = e.getVariant(r);
    (i && Wu(e, i),
      e.variantChildren &&
        e.variantChildren.forEach((o) => {
          lu(o, t);
        }));
  });
}
function xC(e, t) {
  if (Array.isArray(t)) return lu(e, t);
  if (typeof t == "string") return lu(e, [t]);
  Wu(e, t);
}
function Ov(e, t, n) {
  var r, i;
  let o = Object.keys(t).filter((s) => !e.hasValue(s)),
    a = o.length;
  if (a)
    for (let s = 0; s < a; s++) {
      let l = o[s],
        c = t[l],
        u = null;
      (Array.isArray(c) && (u = c[0]),
        u === null &&
          (u =
            (i = (r = n[l]) !== null && r !== void 0 ? r : e.readValue(l)) !== null && i !== void 0
              ? i
              : t[l]),
        u != null &&
          (typeof u == "string" && (Rv(u) || Pv(u))
            ? (u = parseFloat(u))
            : !vC(u) && kn.test(c) && (u = Fv(l, c)),
          e.addValue(l, pe(u, { owner: e })),
          n[l] === void 0 && (n[l] = u),
          u !== null && e.setBaseTarget(l, u)));
    }
}
function SC(e, t) {
  return t ? (t[e] || t.default || t).from : void 0;
}
function wC(e, t, n) {
  let r = {};
  for (let i in e) {
    let o = SC(i, t);
    if (o !== void 0) r[i] = o;
    else {
      let a = n.getValue(i);
      a && (r[i] = a.get());
    }
  }
  return r;
}
var hs = { current: !1 },
  Vv = (e) => Array.isArray(e) && typeof e[0] == "number";
function Av(e) {
  return !!(!e || (typeof e == "string" && Dv[e]) || Vv(e) || (Array.isArray(e) && e.every(Av)));
}
var xo = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  Dv = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: xo([0, 0.65, 0.55, 1]),
    circOut: xo([0.55, 0, 1, 0.45]),
    backIn: xo([0.31, 0.01, 0.66, -0.59]),
    backOut: xo([0.33, 1.53, 0.69, 0.99]),
  };
function Bv(e) {
  if (e) return Vv(e) ? xo(e) : Array.isArray(e) ? e.map(Bv) : Dv[e];
}
function kC(
  e,
  t,
  n,
  { delay: r = 0, duration: i, repeat: o = 0, repeatType: a = "loop", ease: s, times: l } = {}
) {
  let c = { [t]: n };
  l && (c.offset = l);
  let u = Bv(s);
  return (
    Array.isArray(u) && (c.easing = u),
    e.animate(c, {
      delay: r,
      duration: i,
      easing: Array.isArray(u) ? "linear" : u,
      fill: "both",
      iterations: o + 1,
      direction: a === "reverse" ? "alternate" : "normal",
    })
  );
}
function CC(e, { repeat: t, repeatType: n = "loop" }) {
  let r = t && n !== "loop" && t % 2 === 1 ? 0 : e.length - 1;
  return e[r];
}
function zv(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
var EC = zv(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
  TC = new Set(["opacity", "clipPath", "filter", "transform"]),
  es = 10,
  IC = 2e4,
  RC = (e, t) => t.type === "spring" || e === "backgroundColor" || !Av(t.ease);
function PC(e, t, { onUpdate: n, onComplete: r, ...i }) {
  if (!(
    EC() &&
    TC.has(t) &&
    !i.repeatDelay &&
    i.repeatType !== "mirror" &&
    i.damping !== 0 &&
    i.type !== "inertia"
  ))
    return !1;
  let a = !1,
    s,
    l,
    c = !1,
    u = () => {
      l = new Promise((g) => {
        s = g;
      });
    };
  u();
  let { keyframes: f, duration: d = 300, ease: m, times: y } = i;
  if (RC(t, i)) {
    let g = Vr({ ...i, repeat: 0, delay: 0 }),
      x = { done: !1, value: f[0] },
      k = [],
      w = 0;
    for (; !x.done && w < IC;) ((x = g.sample(w)), k.push(x.value), (w += es));
    ((y = void 0), (f = k), (d = w - es), (m = "linear"));
  }
  let b = kC(e.owner.current, t, f, { ...i, duration: d, ease: m, times: y }),
    S = () => {
      ((c = !1), b.cancel());
    },
    h = () => {
      ((c = !0), q.update(S), s(), u());
    };
  return (
    (b.onfinish = () => {
      c || (e.set(CC(f, i)), r && r(), h());
    }),
    {
      then(g, x) {
        return l.then(g, x);
      },
      attachTimeline(g) {
        return ((b.timeline = g), (b.onfinish = null), Ce);
      },
      get time() {
        return on(b.currentTime || 0);
      },
      set time(g) {
        b.currentTime = xn(g);
      },
      get speed() {
        return b.playbackRate;
      },
      set speed(g) {
        b.playbackRate = g;
      },
      get duration() {
        return on(d);
      },
      play: () => {
        a || (b.play(), Qe(S));
      },
      pause: () => b.pause(),
      stop: () => {
        if (((a = !0), b.playState === "idle")) return;
        let { currentTime: g } = b;
        if (g) {
          let x = Vr({ ...i, autoplay: !1 });
          e.setWithVelocity(x.sample(g - es).value, x.sample(g).value, es);
        }
        h();
      },
      complete: () => {
        c || b.finish();
      },
      cancel: h,
    }
  );
}
function _C({ keyframes: e, delay: t, onUpdate: n, onComplete: r }) {
  let i = () => (
    n && n(e[e.length - 1]),
    r && r(),
    {
      time: 0,
      speed: 1,
      duration: 0,
      play: Ce,
      pause: Ce,
      stop: Ce,
      then: (o) => (o(), Promise.resolve()),
      cancel: Ce,
      complete: Ce,
    }
  );
  return t ? Vr({ keyframes: [0, 1], duration: 0, delay: t, onComplete: i }) : i();
}
var FC = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  LC = (e) => ({
    type: "spring",
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  MC = { type: "keyframes", duration: 0.8 },
  OC = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  VC = (e, { keyframes: t }) =>
    t.length > 2 ? MC : Ar.has(e) ? (e.startsWith("scale") ? LC(t[1]) : FC) : OC,
  cu = (e, t) =>
    e === "zIndex"
      ? !1
      : !!(
          typeof t == "number" ||
          Array.isArray(t) ||
          (typeof t == "string" && (kn.test(t) || t === "0") && !t.startsWith("url("))
        );
function AC(e) {
  if (typeof e == "number") return e === 0;
  if (e !== null) return e === "none" || e === "0" || Pv(e);
}
function DC(e, t, n, r) {
  let i = cu(t, n),
    o;
  Array.isArray(n) ? (o = [...n]) : (o = [null, n]);
  let a = r.from !== void 0 ? r.from : e.get(),
    s,
    l = [];
  for (let c = 0; c < o.length; c++)
    (o[c] === null && (o[c] = c === 0 ? a : o[c - 1]),
      AC(o[c]) && l.push(c),
      typeof o[c] == "string" && o[c] !== "none" && o[c] !== "0" && (s = o[c]));
  if (i && l.length && s)
    for (let c = 0; c < l.length; c++) {
      let u = l[c];
      o[u] = Fv(t, s);
    }
  return o;
}
function BC({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: r,
  staggerDirection: i,
  repeat: o,
  repeatType: a,
  repeatDelay: s,
  from: l,
  elapsed: c,
  ...u
}) {
  return !!Object.keys(u).length;
}
function Uu(e, t) {
  return e[t] || e.default || e;
}
var ju =
  (e, t, n, r = {}) =>
  (i) => {
    let o = Uu(r, e) || {},
      a = o.delay || r.delay || 0,
      { elapsed: s = 0 } = r;
    s = s - xn(a);
    let l = DC(t, e, n, o),
      c = l[0],
      u = l[l.length - 1],
      f = cu(e, c),
      d = cu(e, u);
    Ao(
      f === d,
      `You are trying to animate ${e} from "${c}" to "${u}". ${c} is not an animatable value - to enable this animation set ${c} to a value animatable to ${u} via the \`style\` property.`
    );
    let m = {
      keyframes: l,
      velocity: t.getVelocity(),
      ease: "easeOut",
      ...o,
      delay: -s,
      onUpdate: (y) => {
        (t.set(y), o.onUpdate && o.onUpdate(y));
      },
      onComplete: () => {
        (i(), o.onComplete && o.onComplete());
      },
    };
    if (
      (BC(o) || (m = { ...m, ...VC(e, m) }),
      m.duration && (m.duration = xn(m.duration)),
      m.repeatDelay && (m.repeatDelay = xn(m.repeatDelay)),
      !f || !d || hs.current || o.type === !1 || ys.skipAnimations)
    )
      return _C(hs.current ? { ...m, delay: 0 } : m);
    if (
      !r.isHandoff &&
      t.owner &&
      t.owner.current instanceof HTMLElement &&
      !t.owner.getProps().onUpdate
    ) {
      let y = PC(t, e, m);
      if (y) return y;
    }
    return Vr(m);
  };
function ps(e) {
  return !!(me(e) && e.add);
}
function zC({ protectedKeys: e, needsAnimating: t }, n) {
  let r = e.hasOwnProperty(n) && t[n] !== !0;
  return ((t[n] = !1), r);
}
function HC(e, t) {
  let n = e.get();
  if (Array.isArray(t)) {
    for (let r = 0; r < t.length; r++) if (t[r] !== n) return !0;
  } else return n !== t;
}
function Xu(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  let {
      transition: o = e.getDefaultTransition(),
      transitionEnd: a,
      ...s
    } = e.makeTargetAnimatable(t),
    l = e.getValue("willChange");
  r && (o = r);
  let c = [],
    u = i && e.animationState && e.animationState.getState()[i];
  for (let f in s) {
    let d = e.getValue(f),
      m = s[f];
    if (!d || m === void 0 || (u && zC(u, f))) continue;
    let y = { delay: n, elapsed: 0, ...Uu(o || {}, f) };
    if (F.HandoffAppearAnimations) {
      let h = e.getProps()[gs];
      if (h) {
        let v = F.HandoffAppearAnimations(h, f, d, q);
        v !== null && ((y.elapsed = v), (y.isHandoff = !0));
      }
    }
    let b = !y.isHandoff && !HC(d, m);
    if (
      (y.type === "spring" && (d.getVelocity() || y.velocity) && (b = !1),
      d.animation && (b = !1),
      b)
    )
      continue;
    d.start(ju(f, d, m, e.shouldReduceMotion && Ar.has(f) ? { type: !1 } : y));
    let S = d.animation;
    (ps(l) && (l.add(f), S.then(() => l.remove(f))), c.push(S));
  }
  return (
    a &&
      Promise.all(c).then(() => {
        a && Wu(e, a);
      }),
    c
  );
}
function uu(e, t, n = {}) {
  let r = Rs(e, t, n.custom),
    { transition: i = e.getDefaultTransition() || {} } = r || {};
  n.transitionOverride && (i = n.transitionOverride);
  let o = r ? () => Promise.all(Xu(e, r, n)) : () => Promise.resolve(),
    a =
      e.variantChildren && e.variantChildren.size
        ? (l = 0) => {
            let { delayChildren: c = 0, staggerChildren: u, staggerDirection: f } = i;
            return NC(e, t, c + l, u, f, n);
          }
        : () => Promise.resolve(),
    { when: s } = i;
  if (s) {
    let [l, c] = s === "beforeChildren" ? [o, a] : [a, o];
    return l().then(() => c());
  } else return Promise.all([o(), a(n.delay)]);
}
function NC(e, t, n = 0, r = 0, i = 1, o) {
  let a = [],
    s = (e.variantChildren.size - 1) * r,
    l = i === 1 ? (c = 0) => c * r : (c = 0) => s - c * r;
  return (
    Array.from(e.variantChildren)
      .sort($C)
      .forEach((c, u) => {
        (c.notify("AnimationStart", t),
          a.push(uu(c, t, { ...o, delay: n + l(u) }).then(() => c.notify("AnimationComplete", t))));
      }),
    Promise.all(a)
  );
}
function $C(e, t) {
  return e.sortNodePosition(t);
}
function Gu(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let r;
  if (Array.isArray(t)) {
    let i = t.map((o) => uu(e, o, n));
    r = Promise.all(i);
  } else if (typeof t == "string") r = uu(e, t, n);
  else {
    let i = typeof t == "function" ? Rs(e, t, n.custom) : t;
    r = Promise.all(Xu(e, i, n));
  }
  return r.then(() => e.notify("AnimationComplete", t));
}
function Hv(e, t) {
  if (!Array.isArray(t)) return !1;
  let n = t.length;
  if (n !== e.length) return !1;
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
  return !0;
}
var WC = [...ku].reverse(),
  UC = ku.length;
function jC(e) {
  return (t) => Promise.all(t.map(({ animation: n, options: r }) => Gu(e, n, r)));
}
function XC(e) {
  let t = jC(e),
    n = YC(),
    r = !0,
    i = (l, c) => {
      let u = Rs(e, c);
      if (u) {
        let { transition: f, transitionEnd: d, ...m } = u;
        l = { ...l, ...m, ...d };
      }
      return l;
    };
  function o(l) {
    t = l(e);
  }
  function a(l, c) {
    let u = e.getProps(),
      f = e.getVariantContext(!0) || {},
      d = [],
      m = new Set(),
      y = {},
      b = 1 / 0;
    for (let h = 0; h < UC; h++) {
      let v = WC[h],
        g = n[v],
        x = u[v] !== void 0 ? u[v] : f[v],
        k = Ro(x),
        w = v === c ? g.isActive : null;
      w === !1 && (b = h);
      let E = x === f[v] && x !== u[v] && k;
      if (
        (E && r && e.manuallyAnimateOnMount && (E = !1),
        (g.protectedKeys = { ...y }),
        (!g.isActive && w === null) || (!x && !g.prevProp) || xs(x) || typeof x == "boolean")
      )
        continue;
      let I = GC(g.prevProp, x) || (v === c && g.isActive && !E && k) || (h > b && k),
        T = !1,
        z = Array.isArray(x) ? x : [x],
        A = z.reduce(i, {});
      w === !1 && (A = {});
      let { prevResolvedValues: H = {} } = g,
        L = { ...H, ...A },
        M = (D) => {
          ((I = !0), m.has(D) && ((T = !0), m.delete(D)), (g.needsAnimating[D] = !0));
        };
      for (let D in L) {
        let P = A[D],
          j = H[D];
        if (y.hasOwnProperty(D)) continue;
        let K = !1;
        (cs(P) && cs(j) ? (K = !Hv(P, j)) : (K = P !== j),
          K
            ? P !== void 0
              ? M(D)
              : m.add(D)
            : P !== void 0 && m.has(D)
              ? M(D)
              : (g.protectedKeys[D] = !0));
      }
      ((g.prevProp = x),
        (g.prevResolvedValues = A),
        g.isActive && (y = { ...y, ...A }),
        r && e.blockInitialAnimation && (I = !1),
        I && (!E || T) && d.push(...z.map((D) => ({ animation: D, options: { type: v, ...l } }))));
    }
    if (m.size) {
      let h = {};
      (m.forEach((v) => {
        let g = e.getBaseTarget(v);
        g !== void 0 && (h[v] = g);
      }),
        d.push({ animation: h }));
    }
    let S = !!d.length;
    return (
      r && (u.initial === !1 || u.initial === u.animate) && !e.manuallyAnimateOnMount && (S = !1),
      (r = !1),
      S ? t(d) : Promise.resolve()
    );
  }
  function s(l, c, u) {
    var f;
    if (n[l].isActive === c) return Promise.resolve();
    ((f = e.variantChildren) === null ||
      f === void 0 ||
      f.forEach((m) => {
        var y;
        return (y = m.animationState) === null || y === void 0 ? void 0 : y.setActive(l, c);
      }),
      (n[l].isActive = c));
    let d = a(u, l);
    for (let m in n) n[m].protectedKeys = {};
    return d;
  }
  return { animateChanges: a, setActive: s, setAnimateFunction: o, getState: () => n };
}
function GC(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !Hv(t, e) : !1;
}
function Rr(e = !1) {
  return { isActive: e, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
}
function YC() {
  return {
    animate: Rr(!0),
    whileInView: Rr(),
    whileHover: Rr(),
    whileTap: Rr(),
    whileDrag: Rr(),
    whileFocus: Rr(),
    exit: Rr(),
  };
}
var Gn = class {
    constructor(e) {
      ((this.isMounted = !1), (this.node = e));
    }
    update() {}
  },
  KC = class extends Gn {
    constructor(e) {
      (super(e), e.animationState || (e.animationState = XC(e)));
    }
    updateAnimationControlsSubscription() {
      let { animate: e } = this.node.getProps();
      (this.unmount(), xs(e) && (this.unmount = e.subscribe(this.node)));
    }
    mount() {
      this.updateAnimationControlsSubscription();
    }
    update() {
      let { animate: e } = this.node.getProps(),
        { animate: t } = this.node.prevProps || {};
      e !== t && this.updateAnimationControlsSubscription();
    }
    unmount() {}
  },
  qC = 0,
  QC = class extends Gn {
    constructor() {
      (super(...arguments), (this.id = qC++));
    }
    update() {
      if (!this.node.presenceContext) return;
      let { isPresent: e, onExitComplete: t, custom: n } = this.node.presenceContext,
        { isPresent: r } = this.node.prevPresenceContext || {};
      if (!this.node.animationState || e === r) return;
      let i = this.node.animationState.setActive("exit", !e, {
        custom: n ?? this.node.getProps().custom,
      });
      t && !e && i.then(() => t(this.id));
    }
    mount() {
      let { register: e } = this.node.presenceContext || {};
      e && (this.unmount = e(this.id));
    }
    unmount() {}
  },
  Yu = { animation: { Feature: KC }, exit: { Feature: QC } },
  fu = (e, t) => Math.abs(e - t);
function Nv(e, t) {
  let n = fu(e.x, t.x),
    r = fu(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
function pt(e) {
  return e.max - e.min;
}
function du(e, t = 0, n = 0.01) {
  return Math.abs(e - t) <= n;
}
function Zp(e, t, n, r = 0.5) {
  ((e.origin = r),
    (e.originPoint = le(t.min, t.max, e.origin)),
    (e.scale = pt(n) / pt(t)),
    (du(e.scale, 1, 1e-4) || isNaN(e.scale)) && (e.scale = 1),
    (e.translate = le(n.min, n.max, e.origin) - e.originPoint),
    (du(e.translate) || isNaN(e.translate)) && (e.translate = 0));
}
function Co(e, t, n, r) {
  (Zp(e.x, t.x, n.x, r ? r.originX : void 0), Zp(e.y, t.y, n.y, r ? r.originY : void 0));
}
function Jp(e, t, n) {
  ((e.min = n.min + t.min), (e.max = e.min + pt(t)));
}
function ZC(e, t, n) {
  (Jp(e.x, t.x, n.x), Jp(e.y, t.y, n.y));
}
function em(e, t, n) {
  ((e.min = t.min - n.min), (e.max = e.min + pt(t)));
}
function Eo(e, t, n) {
  (em(e.x, t.x, n.x), em(e.y, t.y, n.y));
}
var tm = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  fi = () => ({ x: tm(), y: tm() }),
  nm = () => ({ min: 0, max: 0 }),
  be = () => ({ x: nm(), y: nm() });
function Ps() {
  let e = O(mi);
  if (e === null) return [!0, null];
  let { isPresent: t, onExitComplete: n, register: r } = e,
    i = Tr();
  return (X(() => r(i), []), !t && n ? [!1, () => n && n(i)] : [!0]);
}
var JC = (e, t) => e.depth - t.depth,
  $v = class {
    constructor() {
      ((this.children = []), (this.isDirty = !1));
    }
    add(e) {
      (Hu(this.children, e), (this.isDirty = !0));
    }
    remove(e) {
      (Ts(this.children, e), (this.isDirty = !0));
    }
    forEach(e) {
      (this.isDirty && this.children.sort(JC), (this.isDirty = !1), this.children.forEach(e));
    }
  };
function Wv(e, t) {
  let n = Mr.now(),
    r = ({ timestamp: i }) => {
      let o = i - n;
      o >= t && (Qe(r), e(o - t));
    };
  return (q.read(r, !0), () => Qe(r));
}
var jn = new WeakMap(),
  ms = { current: null },
  Ku = { current: !1 };
function Uv() {
  if (((Ku.current = !0), !!Lo))
    if (F.matchMedia) {
      let e = F.matchMedia("(prefers-reduced-motion)"),
        t = () => (ms.current = e.matches);
      (e.addListener(t), t());
    } else ms.current = !1;
}
function eE(e, t, n) {
  let { willChange: r } = t;
  for (let i in t) {
    let o = t[i],
      a = n[i];
    if (me(o)) (e.addValue(i, o), ps(r) && r.add(i));
    else if (me(a)) (e.addValue(i, pe(o, { owner: e })), ps(r) && r.remove(i));
    else if (a !== o)
      if (e.hasValue(i)) {
        let s = e.getValue(i);
        !s.hasAnimated && s.set(o);
      } else {
        let s = e.getStaticValue(i);
        e.addValue(i, pe(s !== void 0 ? s : o, { owner: e }));
      }
  }
  for (let i in n) t[i] === void 0 && e.removeValue(i);
  return t;
}
var jv = Object.keys(Po),
  tE = jv.length,
  rm = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete",
  ],
  nE = Cu.length,
  Xv = class {
    constructor(
      { parent: e, props: t, presenceContext: n, reducedMotionConfig: r, visualState: i },
      o = {}
    ) {
      ((this.current = null),
        (this.children = new Set()),
        (this.isVariantNode = !1),
        (this.isControllingVariants = !1),
        (this.shouldReduceMotion = null),
        (this.values = new Map()),
        (this.features = {}),
        (this.valueSubscriptions = new Map()),
        (this.prevMotionValues = {}),
        (this.events = {}),
        (this.propEventSubscriptions = {}),
        (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
        (this.render = () => {
          this.current &&
            (this.triggerBuild(),
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
        }),
        (this.scheduleRender = () => q.render(this.render, !1, !0)));
      let { latestValues: a, renderState: s } = i;
      ((this.latestValues = a),
        (this.baseTarget = { ...a }),
        (this.initialValues = t.initial ? { ...a } : {}),
        (this.renderState = s),
        (this.parent = e),
        (this.props = t),
        (this.presenceContext = n),
        (this.depth = e ? e.depth + 1 : 0),
        (this.reducedMotionConfig = r),
        (this.options = o),
        (this.isControllingVariants = Ss(t)),
        (this.isVariantNode = tv(t)),
        this.isVariantNode && (this.variantChildren = new Set()),
        (this.manuallyAnimateOnMount = !!(e && e.current)));
      let { willChange: l, ...c } = this.scrapeMotionValuesFromProps(t, {});
      for (let u in c) {
        let f = c[u];
        a[u] !== void 0 && me(f) && (f.set(a[u], !1), ps(l) && l.add(u));
      }
    }
    scrapeMotionValuesFromProps(e, t) {
      return {};
    }
    mount(e) {
      ((this.current = e),
        jn.set(e, this),
        this.projection && !this.projection.instance && this.projection.mount(e),
        this.parent &&
          this.isVariantNode &&
          !this.isControllingVariants &&
          (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach((t, n) => this.bindToMotionValue(n, t)),
        Ku.current || Uv(),
        (this.shouldReduceMotion =
          this.reducedMotionConfig === "never"
            ? !1
            : this.reducedMotionConfig === "always"
              ? !0
              : ms.current),
        this.parent && this.parent.children.add(this),
        this.update(this.props, this.presenceContext));
    }
    unmount() {
      (jn.delete(this.current),
        this.projection && this.projection.unmount(),
        Qe(this.notifyUpdate),
        Qe(this.render),
        this.valueSubscriptions.forEach((e) => e()),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent && this.parent.children.delete(this));
      for (let e in this.events) this.events[e].clear();
      for (let e in this.features) this.features[e].unmount();
      this.current = null;
    }
    bindToMotionValue(e, t) {
      let n = Ar.has(e),
        r = t.on("change", (o) => {
          ((this.latestValues[e] = o),
            this.props.onUpdate && q.update(this.notifyUpdate, !1, !0),
            n && this.projection && (this.projection.isTransformDirty = !0));
        }),
        i = t.on("renderRequest", this.scheduleRender);
      this.valueSubscriptions.set(e, () => {
        (r(), i());
      });
    }
    sortNodePosition(e) {
      return !this.current || !this.sortInstanceNodePosition || this.type !== e.type
        ? 0
        : this.sortInstanceNodePosition(this.current, e.current);
    }
    loadFeatures({ children: e, ...t }, n, r, i) {
      let o, a;
      for (let s = 0; s < tE; s++) {
        let l = jv[s],
          { isEnabled: c, Feature: u, ProjectionNode: f, MeasureLayout: d } = Po[l];
        (f && (o = f),
          c(t) && (!this.features[l] && u && (this.features[l] = new u(this)), d && (a = d)));
      }
      if ((this.type === "html" || this.type === "svg") && !this.projection && o) {
        this.projection = new o(this.latestValues, this.parent && this.parent.projection);
        let {
          layoutId: s,
          layout: l,
          drag: c,
          dragConstraints: u,
          layoutScroll: f,
          layoutRoot: d,
        } = t;
        this.projection.setOptions({
          layoutId: s,
          layout: l,
          alwaysMeasureLayout: !!c || (u && ci(u)),
          visualElement: this,
          scheduleRender: () => this.scheduleRender(),
          animationType: typeof l == "string" ? l : "both",
          initialPromotionConfig: i,
          layoutScroll: f,
          layoutRoot: d,
        });
      }
      return a;
    }
    updateFeatures() {
      for (let e in this.features) {
        let t = this.features[e];
        t.isMounted ? t.update() : (t.mount(), (t.isMounted = !0));
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.options, this.props);
    }
    measureViewportBox() {
      return this.current ? this.measureInstanceViewportBox(this.current, this.props) : be();
    }
    getStaticValue(e) {
      return this.latestValues[e];
    }
    setStaticValue(e, t) {
      this.latestValues[e] = t;
    }
    makeTargetAnimatable(e, t = !0) {
      return this.makeTargetAnimatableFromInstance(e, t);
    }
    update(e, t) {
      ((e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
        (this.prevProps = this.props),
        (this.props = e),
        (this.prevPresenceContext = this.presenceContext),
        (this.presenceContext = t));
      for (let n = 0; n < rm.length; n++) {
        let r = rm[n];
        this.propEventSubscriptions[r] &&
          (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
        let i = e["on" + r];
        i && (this.propEventSubscriptions[r] = this.on(r, i));
      }
      ((this.prevMotionValues = eE(
        this,
        this.scrapeMotionValuesFromProps(e, this.prevProps),
        this.prevMotionValues
      )),
        this.handleChildMotionValue && this.handleChildMotionValue());
    }
    getProps() {
      return this.props;
    }
    getVariant(e) {
      return this.props.variants ? this.props.variants[e] : void 0;
    }
    getDefaultTransition() {
      return this.props.transition;
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
      return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
    }
    getVariantContext(e = !1) {
      if (e) return this.parent ? this.parent.getVariantContext() : void 0;
      if (!this.isControllingVariants) {
        let n = this.parent ? this.parent.getVariantContext() || {} : {};
        return (this.props.initial !== void 0 && (n.initial = this.props.initial), n);
      }
      let t = {};
      for (let n = 0; n < nE; n++) {
        let r = Cu[n],
          i = this.props[r];
        (Ro(i) || i === !1) && (t[r] = i);
      }
      return t;
    }
    addVariantChild(e) {
      let t = this.getClosestVariantNode();
      if (t)
        return (t.variantChildren && t.variantChildren.add(e), () => t.variantChildren.delete(e));
    }
    addValue(e, t) {
      (t !== this.values.get(e) && (this.removeValue(e), this.bindToMotionValue(e, t)),
        this.values.set(e, t),
        (this.latestValues[e] = t.get()));
    }
    removeValue(e) {
      this.values.delete(e);
      let t = this.valueSubscriptions.get(e);
      (t && (t(), this.valueSubscriptions.delete(e)),
        delete this.latestValues[e],
        this.removeValueFromRenderState(e, this.renderState));
    }
    hasValue(e) {
      return this.values.has(e);
    }
    getValue(e, t) {
      if (this.props.values && this.props.values[e]) return this.props.values[e];
      let n = this.values.get(e);
      return (
        n === void 0 && t !== void 0 && ((n = pe(t, { owner: this })), this.addValue(e, n)),
        n
      );
    }
    readValue(e) {
      var t;
      return this.latestValues[e] !== void 0 || !this.current
        ? this.latestValues[e]
        : (t = this.getBaseTargetFromProps(this.props, e)) !== null && t !== void 0
          ? t
          : this.readValueFromInstance(this.current, e, this.options);
    }
    setBaseTarget(e, t) {
      this.baseTarget[e] = t;
    }
    getBaseTarget(e) {
      var t;
      let { initial: n } = this.props,
        r =
          typeof n == "string" || typeof n == "object"
            ? (t = Ru(this.props, n)) === null || t === void 0
              ? void 0
              : t[e]
            : void 0;
      if (n && r !== void 0) return r;
      let i = this.getBaseTargetFromProps(this.props, e);
      return i !== void 0 && !me(i)
        ? i
        : this.initialValues[e] !== void 0 && r === void 0
          ? void 0
          : this.baseTarget[e];
    }
    on(e, t) {
      return (this.events[e] || (this.events[e] = new Nu()), this.events[e].add(t));
    }
    notify(e, ...t) {
      this.events[e] && this.events[e].notify(...t);
    }
  };
function Gv(e) {
  function t(r, i = {}) {
    return nv(e(r, i));
  }
  if (typeof Proxy > "u") return t;
  let n = new Map();
  return new Proxy(t, { get: (r, i) => (n.has(i) || n.set(i, t(i)), n.get(i)) });
}
var rE = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function qu(e) {
  return typeof e != "string" || e.includes("-") ? !1 : !!(rE.indexOf(e) > -1 || /[A-Z]/.test(e));
}
function Yv(e, { layout: t, layoutId: n }) {
  return (
    Ar.has(e) || e.startsWith("origin") || ((t || n !== void 0) && (!!ls[e] || e === "opacity"))
  );
}
var iE = (e, t) => (t && typeof e == "number" ? t.transform(e) : e);
function Qu(e, t, n, r) {
  let { style: i, vars: o, transform: a, transformOrigin: s } = e,
    l = !1,
    c = !1,
    u = !0;
  for (let f in t) {
    let d = t[f];
    if (kv(f)) {
      o[f] = d;
      continue;
    }
    let m = _v[f],
      y = iE(d, m);
    if (Ar.has(f)) {
      if (((l = !0), (a[f] = y), !u)) continue;
      d !== (m.default || 0) && (u = !1);
    } else f.startsWith("origin") ? ((c = !0), (s[f] = y)) : (i[f] = y);
  }
  if (
    (t.transform ||
      (l || r ? (i.transform = rv(e.transform, n, u, r)) : i.transform && (i.transform = "none")),
    c)
  ) {
    let { originX: f = "50%", originY: d = "50%", originZ: m = 0 } = s;
    i.transformOrigin = `${f} ${d} ${m}`;
  }
}
var Zu = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function Kv(e, t, n) {
  for (let r in t) !me(t[r]) && !Yv(r, n) && (e[r] = t[r]);
}
function oE({ transformTemplate: e }, t, n) {
  return se(() => {
    let r = Zu();
    return (Qu(r, t, { enableHardwareAcceleration: !n }, e), Object.assign({}, r.vars, r.style));
  }, [t]);
}
function aE(e, t, n) {
  let r = e.style || {},
    i = {};
  return (Kv(i, r, e), Object.assign(i, oE(e, t, n)), i);
}
function sE(e, t, n) {
  let r = {},
    i = aE(e, t, n);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((r.draggable = !1),
      (i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none"),
      (i.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`)),
    e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (r.tabIndex = 0),
    (r.style = i),
    r
  );
}
function im(e, t, n) {
  return typeof e == "string" ? e : U.transform(t + n * e);
}
function lE(e, t, n) {
  let r = im(t, e.x, e.width),
    i = im(n, e.y, e.height);
  return `${r} ${i}`;
}
var cE = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  uE = { offset: "strokeDashoffset", array: "strokeDasharray" };
function fE(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  let o = i ? cE : uE;
  e[o.offset] = U.transform(-r);
  let a = U.transform(t),
    s = U.transform(n);
  e[o.array] = `${a} ${s}`;
}
function Ju(
  e,
  {
    attrX: t,
    attrY: n,
    attrScale: r,
    originX: i,
    originY: o,
    pathLength: a,
    pathSpacing: s = 1,
    pathOffset: l = 0,
    ...c
  },
  u,
  f,
  d
) {
  if ((Qu(e, c, u, d), f)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  ((e.attrs = e.style), (e.style = {}));
  let { attrs: m, style: y, dimensions: b } = e;
  (m.transform && (b && (y.transform = m.transform), delete m.transform),
    b &&
      (i !== void 0 || o !== void 0 || y.transform) &&
      (y.transformOrigin = lE(b, i !== void 0 ? i : 0.5, o !== void 0 ? o : 0.5)),
    t !== void 0 && (m.x = t),
    n !== void 0 && (m.y = n),
    r !== void 0 && (m.scale = r),
    a !== void 0 && fE(m, a, s, l, !1));
}
var qv = () => ({ ...Zu(), attrs: {} }),
  ef = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function dE(e, t, n, r) {
  let i = se(() => {
    let o = qv();
    return (
      Ju(o, t, { enableHardwareAcceleration: !1 }, ef(r), e.transformTemplate),
      { ...o.attrs, style: { ...o.style } }
    );
  }, [t]);
  if (e.style) {
    let o = {};
    (Kv(o, e.style, e), (i.style = { ...o, ...i.style }));
  }
  return i;
}
function hE(e = !1) {
  return (n, r, i, { latestValues: o }, a) => {
    let l = (qu(n) ? dE : sE)(r, o, a, n),
      c = av(r, typeof n == "string", e),
      u = n !== ai ? { ...c, ...l, ref: i } : {},
      { children: f } = r,
      d = se(() => (me(f) ? f.get() : f), [f]);
    return ne(n, { ...u, children: d });
  };
}
function Qv(e, { style: t, vars: n }, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r));
  for (let o in n) e.style.setProperty(o, n[o]);
}
var Zv = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function Jv(e, t, n, r) {
  Qv(e, t, void 0, r);
  for (let i in t.attrs) e.setAttribute(Zv.has(i) ? i : Su(i), t.attrs[i]);
}
function tf(e, t) {
  let { style: n } = e,
    r = {};
  for (let i in n) (me(n[i]) || (t.style && me(t.style[i])) || Yv(i, e)) && (r[i] = n[i]);
  return r;
}
function eg(e, t) {
  let n = tf(e, t);
  for (let r in e)
    if (me(e[r]) || me(t[r])) {
      let i = Mo.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      n[i] = e[r];
    }
  return n;
}
var pE = {
    useVisualState: ws({
      scrapeMotionValuesFromProps: eg,
      createRenderState: qv,
      onMount: (e, t, { renderState: n, latestValues: r }) => {
        (q.read(() => {
          try {
            n.dimensions = typeof t.getBBox == "function" ? t.getBBox() : t.getBoundingClientRect();
          } catch {
            n.dimensions = { x: 0, y: 0, width: 0, height: 0 };
          }
        }),
          q.render(() => {
            (Ju(n, r, { enableHardwareAcceleration: !1 }, ef(t.tagName), e.transformTemplate),
              Jv(t, n));
          }));
      },
    }),
  },
  mE = { useVisualState: ws({ scrapeMotionValuesFromProps: tf, createRenderState: Zu }) };
function tg(e, { forwardMotionProps: t = !1 }, n, r) {
  return {
    ...(qu(e) ? pE : mE),
    preloadedFeatures: n,
    useRender: hE(t),
    createVisualElement: r,
    Component: e,
  };
}
function om(e, t) {
  let n = "pointer" + (t ? "enter" : "leave"),
    r = "onHover" + (t ? "Start" : "End"),
    i = (o, a) => {
      if (o.pointerType === "touch" || Pu()) return;
      let s = e.getProps();
      (e.animationState && s.whileHover && e.animationState.setActive("whileHover", t),
        s[r] && q.update(() => s[r](o, a)));
    };
  return nn(e.current, n, i, { passive: !e.getProps()[r] });
}
var vE = class extends Gn {
    mount() {
      this.unmount = rn(om(this.node, !0), om(this.node, !1));
    }
    unmount() {}
  },
  gE = class extends Gn {
    constructor() {
      (super(...arguments), (this.isActive = !1));
    }
    onFocus() {
      let e = !1;
      try {
        e = this.node.current.matches(":focus-visible");
      } catch {
        e = !0;
      }
      !e ||
        !this.node.animationState ||
        (this.node.animationState.setActive("whileFocus", !0), (this.isActive = !0));
    }
    onBlur() {
      !this.isActive ||
        !this.node.animationState ||
        (this.node.animationState.setActive("whileFocus", !1), (this.isActive = !1));
    }
    mount() {
      this.unmount = rn(
        bn(this.node.current, "focus", () => this.onFocus()),
        bn(this.node.current, "blur", () => this.onBlur())
      );
    }
    unmount() {}
  },
  ng = (e, t) => (t ? (e === t ? !0 : ng(e, t.parentElement)) : !1);
function Kc(e, t) {
  if (!t) return;
  let n = new PointerEvent("pointer" + e);
  t(n, ks(n));
}
var yE = class extends Gn {
    constructor() {
      (super(...arguments),
        (this.removeStartListeners = Ce),
        (this.removeEndListeners = Ce),
        (this.removeAccessibleListeners = Ce),
        (this.startPointerPress = (e, t) => {
          if (this.isPressing) return;
          this.removeEndListeners();
          let n = this.node.getProps(),
            i = nn(
              F,
              "pointerup",
              (a, s) => {
                if (!this.checkPressEnd()) return;
                let { onTap: l, onTapCancel: c, globalTapTarget: u } = this.node.getProps();
                q.update(() => {
                  !u && !ng(this.node.current, a.target) ? c && c(a, s) : l && l(a, s);
                });
              },
              { passive: !(n.onTap || n.onPointerUp) }
            ),
            o = nn(F, "pointercancel", (a, s) => this.cancelPress(a, s), {
              passive: !(n.onTapCancel || n.onPointerCancel),
            });
          ((this.removeEndListeners = rn(i, o)), this.startPress(e, t));
        }),
        (this.startAccessiblePress = () => {
          let e = (i) => {
              if (i.key !== "Enter" || this.isPressing) return;
              let o = (a) => {
                a.key !== "Enter" ||
                  !this.checkPressEnd() ||
                  Kc("up", (s, l) => {
                    let { onTap: c } = this.node.getProps();
                    c && q.update(() => c(s, l));
                  });
              };
              (this.removeEndListeners(),
                (this.removeEndListeners = bn(this.node.current, "keyup", o)),
                Kc("down", (a, s) => {
                  this.startPress(a, s);
                }));
            },
            t = bn(this.node.current, "keydown", e),
            n = () => {
              this.isPressing && Kc("cancel", (i, o) => this.cancelPress(i, o));
            },
            r = bn(this.node.current, "blur", n);
          this.removeAccessibleListeners = rn(t, r);
        }));
    }
    startPress(e, t) {
      this.isPressing = !0;
      let { onTapStart: n, whileTap: r } = this.node.getProps();
      (r && this.node.animationState && this.node.animationState.setActive("whileTap", !0),
        n && q.update(() => n(e, t)));
    }
    checkPressEnd() {
      return (
        this.removeEndListeners(),
        (this.isPressing = !1),
        this.node.getProps().whileTap &&
          this.node.animationState &&
          this.node.animationState.setActive("whileTap", !1),
        !Pu()
      );
    }
    cancelPress(e, t) {
      if (!this.checkPressEnd()) return;
      let { onTapCancel: n } = this.node.getProps();
      n && q.update(() => n(e, t));
    }
    mount() {
      let e = this.node.getProps(),
        t = nn(e.globalTapTarget ? F : this.node.current, "pointerdown", this.startPointerPress, {
          passive: !(e.onTapStart || e.onPointerStart),
        }),
        n = bn(this.node.current, "focus", this.startAccessiblePress);
      this.removeStartListeners = rn(t, n);
    }
    unmount() {
      (this.removeStartListeners(), this.removeEndListeners(), this.removeAccessibleListeners());
    }
  },
  hu = new WeakMap(),
  qc = new WeakMap(),
  bE = (e) => {
    let t = hu.get(e.target);
    t && t(e);
  },
  xE = (e) => {
    e.forEach(bE);
  };
function SE({ root: e, ...t }) {
  let n = e || document;
  qc.has(n) || qc.set(n, {});
  let r = qc.get(n),
    i = JSON.stringify(t);
  return (r[i] || (r[i] = new IntersectionObserver(xE, { root: e, ...t })), r[i]);
}
function wE(e, t, n) {
  let r = SE(t);
  return (
    hu.set(e, n),
    r.observe(e),
    () => {
      (hu.delete(e), r.unobserve(e));
    }
  );
}
var kE = { some: 0, all: 1 },
  CE = class extends Gn {
    constructor() {
      (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
    }
    startObserver() {
      this.unmount();
      let { viewport: e = {} } = this.node.getProps(),
        { root: t, margin: n, amount: r = "some", once: i } = e,
        o = {
          root: t ? t.current : void 0,
          rootMargin: n,
          threshold: typeof r == "number" ? r : kE[r],
        },
        a = (s) => {
          let { isIntersecting: l } = s;
          if (this.isInView === l || ((this.isInView = l), i && !l && this.hasEnteredView)) return;
          (l && (this.hasEnteredView = !0),
            this.node.animationState && this.node.animationState.setActive("whileInView", l));
          let { onViewportEnter: c, onViewportLeave: u } = this.node.getProps(),
            f = l ? c : u;
          f && f(s);
        };
      return wE(this.node.current, o, a);
    }
    mount() {
      this.startObserver();
    }
    update() {
      if (typeof IntersectionObserver > "u") return;
      let { props: e, prevProps: t } = this.node;
      ["amount", "margin", "root"].some(EE(e, t)) && this.startObserver();
    }
    unmount() {}
  };
function EE({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
var rg = {
    inView: { Feature: CE },
    tap: { Feature: yE },
    focus: { Feature: gE },
    hover: { Feature: vE },
  },
  ig = class {
    constructor(e, t, { transformPagePoint: n, contextWindow: r, dragSnapToOrigin: i = !1 } = {}) {
      if (
        ((this.startEvent = null),
        (this.lastMoveEvent = null),
        (this.lastMoveEventInfo = null),
        (this.handlers = {}),
        (this.contextWindow = F),
        (this.updatePoint = () => {
          if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
          let u = Zc(this.lastMoveEventInfo, this.history),
            f = this.startEvent !== null,
            d = Nv(u.offset, { x: 0, y: 0 }) >= 3;
          if (!f && !d) return;
          let { point: m } = u,
            { timestamp: y } = xe;
          this.history.push({ ...m, timestamp: y });
          let { onStart: b, onMove: S } = this.handlers;
          (f || (b && b(this.lastMoveEvent, u), (this.startEvent = this.lastMoveEvent)),
            S && S(this.lastMoveEvent, u));
        }),
        (this.handlePointerMove = (u, f) => {
          ((this.lastMoveEvent = u),
            (this.lastMoveEventInfo = Qc(f, this.transformPagePoint)),
            q.update(this.updatePoint, !0));
        }),
        (this.handlePointerUp = (u, f) => {
          this.end();
          let { onEnd: d, onSessionEnd: m, resumeAnimation: y } = this.handlers;
          if ((this.dragSnapToOrigin && y && y(), !(this.lastMoveEvent && this.lastMoveEventInfo)))
            return;
          let b = Zc(
            u.type === "pointercancel" ? this.lastMoveEventInfo : Qc(f, this.transformPagePoint),
            this.history
          );
          (this.startEvent && d && d(u, b), m && m(u, b));
        }),
        !sv(e))
      )
        return;
      ((this.dragSnapToOrigin = i),
        (this.handlers = t),
        (this.transformPagePoint = n),
        (this.contextWindow = r || F));
      let o = ks(e),
        a = Qc(o, this.transformPagePoint),
        { point: s } = a,
        { timestamp: l } = xe;
      this.history = [{ ...s, timestamp: l }];
      let { onSessionStart: c } = t;
      (c && c(e, Zc(a, this.history)),
        (this.removeListeners = rn(
          nn(this.contextWindow, "pointermove", this.handlePointerMove),
          nn(this.contextWindow, "pointerup", this.handlePointerUp),
          nn(this.contextWindow, "pointercancel", this.handlePointerUp)
        )));
    }
    updateHandlers(e) {
      this.handlers = e;
    }
    end() {
      (this.removeListeners && this.removeListeners(), Qe(this.updatePoint));
    }
  };
function Qc(e, t) {
  return t ? { point: t(e.point) } : e;
}
function am(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Zc({ point: e }, t) {
  return { point: e, delta: am(e, og(t)), offset: am(e, TE(t)), velocity: IE(t, 0.1) };
}
function TE(e) {
  return e[0];
}
function og(e) {
  return e[e.length - 1];
}
function IE(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let n = e.length - 1,
    r = null,
    i = og(e);
  for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > xn(t)));) n--;
  if (!r) return { x: 0, y: 0 };
  let o = on(i.timestamp - r.timestamp);
  if (o === 0) return { x: 0, y: 0 };
  let a = { x: (i.x - r.x) / o, y: (i.y - r.y) / o };
  return (a.x === 1 / 0 && (a.x = 0), a.y === 1 / 0 && (a.y = 0), a);
}
function RE(e, { min: t, max: n }, r) {
  return (
    t !== void 0 && e < t
      ? (e = r ? le(t, e, r.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = r ? le(n, e, r.max) : Math.min(e, n)),
    e
  );
}
function sm(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
  };
}
function PE(e, { top: t, left: n, bottom: r, right: i }) {
  return { x: sm(e.x, n, i), y: sm(e.y, t, r) };
}
function lm(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max;
  return (t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r });
}
function _E(e, t) {
  return { x: lm(e.x, t.x), y: lm(e.y, t.y) };
}
function FE(e, t) {
  let n = 0.5,
    r = pt(e),
    i = pt(t);
  return (
    i > r ? (n = Un(t.min, t.max - r, e.min)) : r > i && (n = Un(e.min, e.max - i, t.min)),
    wn(0, 1, n)
  );
}
function LE(e, t) {
  let n = {};
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  );
}
var pu = 0.35;
function ME(e = pu) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = pu),
    { x: cm(e, "left", "right"), y: cm(e, "top", "bottom") }
  );
}
function cm(e, t, n) {
  return { min: um(e, t), max: um(e, n) };
}
function um(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
function Vt(e) {
  return [e("x"), e("y")];
}
function ag({ top: e, left: t, right: n, bottom: r }) {
  return { x: { min: t, max: n }, y: { min: e, max: r } };
}
function OE({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function VE(e, t) {
  if (!t) return e;
  let n = t({ x: e.left, y: e.top }),
    r = t({ x: e.right, y: e.bottom });
  return { top: n.y, left: n.x, bottom: r.y, right: r.x };
}
function Jc(e) {
  return e === void 0 || e === 1;
}
function mu({ scale: e, scaleX: t, scaleY: n }) {
  return !Jc(e) || !Jc(t) || !Jc(n);
}
function Pr(e) {
  return mu(e) || sg(e) || e.z || e.rotate || e.rotateX || e.rotateY;
}
function sg(e) {
  return fm(e.x) || fm(e.y);
}
function fm(e) {
  return e && e !== "0%";
}
function vs(e, t, n) {
  let r = e - n,
    i = t * r;
  return n + i;
}
function dm(e, t, n, r, i) {
  return (i !== void 0 && (e = vs(e, i, r)), vs(e, n, r) + t);
}
function vu(e, t = 0, n = 1, r, i) {
  ((e.min = dm(e.min, t, n, r, i)), (e.max = dm(e.max, t, n, r, i)));
}
function lg(e, { x: t, y: n }) {
  (vu(e.x, t.translate, t.scale, t.originPoint), vu(e.y, n.translate, n.scale, n.originPoint));
}
function AE(e, t, n, r = !1) {
  let i = n.length;
  if (!i) return;
  t.x = t.y = 1;
  let o, a;
  for (let s = 0; s < i; s++) {
    ((o = n[s]), (a = o.projectionDelta));
    let l = o.instance;
    (l && l.style && l.style.display === "contents") ||
      (r &&
        o.options.layoutScroll &&
        o.scroll &&
        o !== o.root &&
        di(e, { x: -o.scroll.offset.x, y: -o.scroll.offset.y }),
      a && ((t.x *= a.x.scale), (t.y *= a.y.scale), lg(e, a)),
      r && Pr(o.latestValues) && di(e, o.latestValues));
  }
  ((t.x = hm(t.x)), (t.y = hm(t.y)));
}
function hm(e) {
  return Number.isInteger(e) || e > 1.0000000000001 || e < 0.999999999999 ? e : 1;
}
function Wn(e, t) {
  ((e.min = e.min + t), (e.max = e.max + t));
}
function pm(e, t, [n, r, i]) {
  let o = t[i] !== void 0 ? t[i] : 0.5,
    a = le(e.min, e.max, o);
  vu(e, t[n], t[r], a, t.scale);
}
var DE = ["x", "scaleX", "originX"],
  BE = ["y", "scaleY", "originY"];
function di(e, t) {
  (pm(e.x, t, DE), pm(e.y, t, BE));
}
function cg(e, t) {
  return ag(VE(e.getBoundingClientRect(), t));
}
function zE(e, t, n) {
  let r = cg(e, n),
    { scroll: i } = t;
  return (i && (Wn(r.x, i.offset.x), Wn(r.y, i.offset.y)), r);
}
var ug = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  HE = new WeakMap(),
  NE = class {
    constructor(e) {
      ((this.openGlobalLock = null),
        (this.isDragging = !1),
        (this.currentDirection = null),
        (this.originPoint = { x: 0, y: 0 }),
        (this.constraints = !1),
        (this.hasMutatedConstraints = !1),
        (this.elastic = be()),
        (this.visualElement = e));
    }
    start(e, { snapToCursor: t = !1 } = {}) {
      let { presenceContext: n } = this.visualElement;
      if (n && n.isPresent === !1) return;
      let r = (c) => {
          let { dragSnapToOrigin: u } = this.getProps();
          (u ? this.pauseAnimation() : this.stopAnimation(),
            t && this.snapToCursor(ks(c, "page").point));
        },
        i = (c, u) => {
          let { drag: f, dragPropagation: d, onDragStart: m } = this.getProps();
          if (
            f &&
            !d &&
            (this.openGlobalLock && this.openGlobalLock(),
            (this.openGlobalLock = uv(f)),
            !this.openGlobalLock)
          )
            return;
          ((this.isDragging = !0),
            (this.currentDirection = null),
            this.resolveConstraints(),
            this.visualElement.projection &&
              ((this.visualElement.projection.isAnimationBlocked = !0),
              (this.visualElement.projection.target = void 0)),
            Vt((b) => {
              let S = this.getAxisMotionValue(b).get() || 0;
              if (tn.test(S)) {
                let { projection: h } = this.visualElement;
                if (h && h.layout) {
                  let v = h.layout.layoutBox[b];
                  v && (S = pt(v) * (parseFloat(S) / 100));
                }
              }
              this.originPoint[b] = S;
            }),
            m && q.update(() => m(c, u), !1, !0));
          let { animationState: y } = this.visualElement;
          y && y.setActive("whileDrag", !0);
        },
        o = (c, u) => {
          let {
            dragPropagation: f,
            dragDirectionLock: d,
            onDirectionLock: m,
            onDrag: y,
          } = this.getProps();
          if (!f && !this.openGlobalLock) return;
          let { offset: b } = u;
          if (d && this.currentDirection === null) {
            ((this.currentDirection = $E(b)),
              this.currentDirection !== null && m && m(this.currentDirection));
            return;
          }
          (this.updateAxis("x", u.point, b),
            this.updateAxis("y", u.point, b),
            this.visualElement.render(),
            y && y(c, u));
        },
        a = (c, u) => this.stop(c, u),
        s = () =>
          Vt((c) => {
            var u;
            return (
              this.getAnimationState(c) === "paused" &&
              ((u = this.getAxisMotionValue(c).animation) === null || u === void 0
                ? void 0
                : u.play())
            );
          }),
        { dragSnapToOrigin: l } = this.getProps();
      this.panSession = new ig(
        e,
        { onSessionStart: r, onStart: i, onMove: o, onSessionEnd: a, resumeAnimation: s },
        {
          transformPagePoint: this.visualElement.getTransformPagePoint(),
          dragSnapToOrigin: l,
          contextWindow: ug(this.visualElement),
        }
      );
    }
    stop(e, t) {
      let n = this.isDragging;
      if ((this.cancel(), !n)) return;
      let { velocity: r } = t;
      this.startAnimation(r);
      let { onDragEnd: i } = this.getProps();
      i && q.update(() => i(e, t));
    }
    cancel() {
      this.isDragging = !1;
      let { projection: e, animationState: t } = this.visualElement;
      (e && (e.isAnimationBlocked = !1),
        this.panSession && this.panSession.end(),
        (this.panSession = void 0));
      let { dragPropagation: n } = this.getProps();
      (!n && this.openGlobalLock && (this.openGlobalLock(), (this.openGlobalLock = null)),
        t && t.setActive("whileDrag", !1));
    }
    updateAxis(e, t, n) {
      let { drag: r } = this.getProps();
      if (!n || !ts(e, r, this.currentDirection)) return;
      let i = this.getAxisMotionValue(e),
        o = this.originPoint[e] + n[e];
      (this.constraints && this.constraints[e] && (o = RE(o, this.constraints[e], this.elastic[e])),
        i.set(o));
    }
    resolveConstraints() {
      var e;
      let { dragConstraints: t, dragElastic: n } = this.getProps(),
        r =
          this.visualElement.projection && !this.visualElement.projection.layout
            ? this.visualElement.projection.measure(!1)
            : (e = this.visualElement.projection) === null || e === void 0
              ? void 0
              : e.layout,
        i = this.constraints;
      (t && ci(t)
        ? this.constraints || (this.constraints = this.resolveRefConstraints())
        : t && r
          ? (this.constraints = PE(r.layoutBox, t))
          : (this.constraints = !1),
        (this.elastic = ME(n)),
        i !== this.constraints &&
          r &&
          this.constraints &&
          !this.hasMutatedConstraints &&
          Vt((o) => {
            this.getAxisMotionValue(o) &&
              (this.constraints[o] = LE(r.layoutBox[o], this.constraints[o]));
          }));
    }
    resolveRefConstraints() {
      let { dragConstraints: e, onMeasureDragConstraints: t } = this.getProps();
      if (!e || !ci(e)) return !1;
      let n = e.current;
      Ze(
        n !== null,
        "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."
      );
      let { projection: r } = this.visualElement;
      if (!r || !r.layout) return !1;
      let i = zE(n, r.root, this.visualElement.getTransformPagePoint()),
        o = _E(r.layout.layoutBox, i);
      if (t) {
        let a = t(OE(o));
        ((this.hasMutatedConstraints = !!a), a && (o = ag(a)));
      }
      return o;
    }
    startAnimation(e) {
      let {
          drag: t,
          dragMomentum: n,
          dragElastic: r,
          dragTransition: i,
          dragSnapToOrigin: o,
          onDragTransitionEnd: a,
        } = this.getProps(),
        s = this.constraints || {},
        l = Vt((c) => {
          if (!ts(c, t, this.currentDirection)) return;
          let u = (s && s[c]) || {};
          o && (u = { min: 0, max: 0 });
          let f = r ? 200 : 1e6,
            d = r ? 40 : 1e7,
            m = {
              type: "inertia",
              velocity: n ? e[c] : 0,
              bounceStiffness: f,
              bounceDamping: d,
              timeConstant: 750,
              restDelta: 1,
              restSpeed: 10,
              ...i,
              ...u,
            };
          return this.startAxisValueAnimation(c, m);
        });
      return Promise.all(l).then(a);
    }
    startAxisValueAnimation(e, t) {
      let n = this.getAxisMotionValue(e);
      return n.start(ju(e, n, 0, t));
    }
    stopAnimation() {
      Vt((e) => this.getAxisMotionValue(e).stop());
    }
    pauseAnimation() {
      Vt((e) => {
        var t;
        return (t = this.getAxisMotionValue(e).animation) === null || t === void 0
          ? void 0
          : t.pause();
      });
    }
    getAnimationState(e) {
      var t;
      return (t = this.getAxisMotionValue(e).animation) === null || t === void 0 ? void 0 : t.state;
    }
    getAxisMotionValue(e) {
      let t = "_drag" + e.toUpperCase(),
        n = this.visualElement.getProps(),
        r = n[t];
      return r || this.visualElement.getValue(e, (n.initial ? n.initial[e] : void 0) || 0);
    }
    snapToCursor(e) {
      Vt((t) => {
        let { drag: n } = this.getProps();
        if (!ts(t, n, this.currentDirection)) return;
        let { projection: r } = this.visualElement,
          i = this.getAxisMotionValue(t);
        if (r && r.layout) {
          let { min: o, max: a } = r.layout.layoutBox[t];
          i.set(e[t] - le(o, a, 0.5));
        }
      });
    }
    scalePositionWithinConstraints() {
      if (!this.visualElement.current) return;
      let { drag: e, dragConstraints: t } = this.getProps(),
        { projection: n } = this.visualElement;
      if (!ci(t) || !n || !this.constraints) return;
      this.stopAnimation();
      let r = { x: 0, y: 0 };
      Vt((o) => {
        let a = this.getAxisMotionValue(o);
        if (a) {
          let s = a.get();
          r[o] = FE({ min: s, max: s }, this.constraints[o]);
        }
      });
      let { transformTemplate: i } = this.visualElement.getProps();
      ((this.visualElement.current.style.transform = i ? i({}, "") : "none"),
        n.root && n.root.updateScroll(),
        n.updateLayout(),
        this.resolveConstraints(),
        Vt((o) => {
          if (!ts(o, e, null)) return;
          let a = this.getAxisMotionValue(o),
            { min: s, max: l } = this.constraints[o];
          a.set(le(s, l, r[o]));
        }));
    }
    addListeners() {
      if (!this.visualElement.current) return;
      HE.set(this.visualElement, this);
      let e = this.visualElement.current,
        t = nn(e, "pointerdown", (s) => {
          let { drag: l, dragListener: c = !0 } = this.getProps();
          l && c && this.start(s);
        }),
        n = () => {
          let { dragConstraints: s } = this.getProps();
          ci(s) && (this.constraints = this.resolveRefConstraints());
        },
        { projection: r } = this.visualElement,
        i = r.addEventListener("measure", n);
      (r && !r.layout && (r.root && r.root.updateScroll(), r.updateLayout()), n());
      let o = bn(F, "resize", () => this.scalePositionWithinConstraints()),
        a = r.addEventListener("didUpdate", ({ delta: s, hasLayoutChanged: l }) => {
          this.isDragging &&
            l &&
            (Vt((c) => {
              let u = this.getAxisMotionValue(c);
              u && ((this.originPoint[c] += s[c].translate), u.set(u.get() + s[c].translate));
            }),
            this.visualElement.render());
        });
      return () => {
        (o(), t(), i(), a && a());
      };
    }
    getProps() {
      let e = this.visualElement.getProps(),
        {
          drag: t = !1,
          dragDirectionLock: n = !1,
          dragPropagation: r = !1,
          dragConstraints: i = !1,
          dragElastic: o = pu,
          dragMomentum: a = !0,
        } = e;
      return {
        ...e,
        drag: t,
        dragDirectionLock: n,
        dragPropagation: r,
        dragConstraints: i,
        dragElastic: o,
        dragMomentum: a,
      };
    }
  };
function ts(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function $E(e, t = 10) {
  let n = null;
  return (Math.abs(e.y) > t ? (n = "y") : Math.abs(e.x) > t && (n = "x"), n);
}
var WE = class extends Gn {
    constructor(e) {
      (super(e),
        (this.removeGroupControls = Ce),
        (this.removeListeners = Ce),
        (this.controls = new NE(e)));
    }
    mount() {
      let { dragControls: e } = this.node.getProps();
      (e && (this.removeGroupControls = e.subscribe(this.controls)),
        (this.removeListeners = this.controls.addListeners() || Ce));
    }
    unmount() {
      (this.removeGroupControls(), this.removeListeners());
    }
  },
  mm = (e) => (t, n) => {
    e && q.update(() => e(t, n));
  },
  UE = class extends Gn {
    constructor() {
      (super(...arguments), (this.removePointerDownListener = Ce));
    }
    onPointerDown(e) {
      this.session = new ig(e, this.createPanHandlers(), {
        transformPagePoint: this.node.getTransformPagePoint(),
        contextWindow: ug(this.node),
      });
    }
    createPanHandlers() {
      let { onPanSessionStart: e, onPanStart: t, onPan: n, onPanEnd: r } = this.node.getProps();
      return {
        onSessionStart: mm(e),
        onStart: mm(t),
        onMove: n,
        onEnd: (i, o) => {
          (delete this.session, r && q.update(() => r(i, o)));
        },
      };
    }
    mount() {
      this.removePointerDownListener = nn(this.node.current, "pointerdown", (e) =>
        this.onPointerDown(e)
      );
    }
    update() {
      this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
      (this.removePointerDownListener(), this.session && this.session.end());
    }
  },
  os = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function vm(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
var go = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == "string")
        if (U.test(e)) e = parseFloat(e);
        else return e;
      let n = vm(e, t.target.x),
        r = vm(e, t.target.y);
      return `${n}% ${r}%`;
    },
  },
  jE = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      let r = e,
        i = kn.parse(e);
      if (i.length > 5) return r;
      let o = kn.createTransformer(e),
        a = typeof i[0] != "number" ? 1 : 0,
        s = n.x.scale * t.x,
        l = n.y.scale * t.y;
      ((i[0 + a] /= s), (i[1 + a] /= l));
      let c = le(s, l, 0.5);
      return (
        typeof i[2 + a] == "number" && (i[2 + a] /= c),
        typeof i[3 + a] == "number" && (i[3 + a] /= c),
        o(i)
      );
    },
  },
  XE = class extends p.Component {
    componentDidMount() {
      let { visualElement: e, layoutGroup: t, switchLayoutGroup: n, layoutId: r } = this.props,
        { projection: i } = e;
      (Tu(GE),
        i &&
          (t.group && t.group.add(i),
          n && n.register && r && n.register(i),
          i.root.didUpdate(),
          i.addEventListener("animationComplete", () => {
            this.safeToRemove();
          }),
          i.setOptions({ ...i.options, onExitComplete: () => this.safeToRemove() })),
        (os.hasEverUpdated = !0));
    }
    getSnapshotBeforeUpdate(e) {
      let { layoutDependency: t, visualElement: n, drag: r, isPresent: i } = this.props,
        o = n.projection;
      return (
        o &&
          ((o.isPresent = i),
          r || e.layoutDependency !== t || t === void 0 ? o.willUpdate() : this.safeToRemove(),
          e.isPresent !== i &&
            (i
              ? o.promote()
              : o.relegate() ||
                q.postRender(() => {
                  let a = o.getStack();
                  (!a || !a.members.length) && this.safeToRemove();
                }))),
        null
      );
    }
    componentDidUpdate() {
      let { projection: e } = this.props.visualElement;
      e &&
        (e.root.didUpdate(),
        wu.postRender(() => {
          !e.currentAnimation && e.isLead() && this.safeToRemove();
        }));
    }
    componentWillUnmount() {
      let { visualElement: e, layoutGroup: t, switchLayoutGroup: n } = this.props,
        { projection: r } = e;
      r &&
        (r.scheduleCheckAfterUnmount(),
        t && t.group && t.group.remove(r),
        n && n.deregister && n.deregister(r));
    }
    safeToRemove() {
      let { safeToRemove: e } = this.props;
      e && e();
    }
    render() {
      return null;
    }
  };
function fg(e) {
  let [t, n] = Ps(),
    r = O(Io);
  return p.createElement(XE, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: O(bs),
    isPresent: t,
    safeToRemove: n,
  });
}
var GE = {
    borderRadius: {
      ...go,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ],
    },
    borderTopLeftRadius: go,
    borderTopRightRadius: go,
    borderBottomLeftRadius: go,
    borderBottomRightRadius: go,
    boxShadow: jE,
  },
  dg = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  YE = dg.length,
  gm = (e) => (typeof e == "string" ? parseFloat(e) : e),
  ym = (e) => typeof e == "number" || U.test(e);
function KE(e, t, n, r, i, o) {
  i
    ? ((e.opacity = le(0, n.opacity !== void 0 ? n.opacity : 1, qE(r))),
      (e.opacityExit = le(t.opacity !== void 0 ? t.opacity : 1, 0, QE(r))))
    : o &&
      (e.opacity = le(
        t.opacity !== void 0 ? t.opacity : 1,
        n.opacity !== void 0 ? n.opacity : 1,
        r
      ));
  for (let a = 0; a < YE; a++) {
    let s = `border${dg[a]}Radius`,
      l = bm(t, s),
      c = bm(n, s);
    if (l === void 0 && c === void 0) continue;
    (l || (l = 0),
      c || (c = 0),
      l === 0 || c === 0 || ym(l) === ym(c)
        ? ((e[s] = Math.max(le(gm(l), gm(c), r), 0)), (tn.test(c) || tn.test(l)) && (e[s] += "%"))
        : (e[s] = c));
  }
  (t.rotate || n.rotate) && (e.rotate = le(t.rotate || 0, n.rotate || 0, r));
}
function bm(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
var qE = hg(0, 0.5, Mu),
  QE = hg(0.5, 0.95, Ce);
function hg(e, t, n) {
  return (r) => (r < e ? 0 : r > t ? 1 : n(Un(e, t, r)));
}
function xm(e, t) {
  ((e.min = t.min), (e.max = t.max));
}
function Ot(e, t) {
  (xm(e.x, t.x), xm(e.y, t.y));
}
function Sm(e, t, n, r, i) {
  return ((e -= t), (e = vs(e, 1 / n, r)), i !== void 0 && (e = vs(e, 1 / i, r)), e);
}
function ZE(e, t = 0, n = 1, r = 0.5, i, o = e, a = e) {
  if (
    (tn.test(t) && ((t = parseFloat(t)), (t = le(a.min, a.max, t / 100) - a.min)),
    typeof t != "number")
  )
    return;
  let s = le(o.min, o.max, r);
  (e === o && (s -= t), (e.min = Sm(e.min, t, n, s, i)), (e.max = Sm(e.max, t, n, s, i)));
}
function wm(e, t, [n, r, i], o, a) {
  ZE(e, t[n], t[r], t[i], t.scale, o, a);
}
var JE = ["x", "scaleX", "originX"],
  eT = ["y", "scaleY", "originY"];
function km(e, t, n, r) {
  (wm(e.x, t, JE, n ? n.x : void 0, r ? r.x : void 0),
    wm(e.y, t, eT, n ? n.y : void 0, r ? r.y : void 0));
}
function Cm(e) {
  return e.translate === 0 && e.scale === 1;
}
function pg(e) {
  return Cm(e.x) && Cm(e.y);
}
function tT(e, t) {
  return e.x.min === t.x.min && e.x.max === t.x.max && e.y.min === t.y.min && e.y.max === t.y.max;
}
function mg(e, t) {
  return (
    Math.round(e.x.min) === Math.round(t.x.min) &&
    Math.round(e.x.max) === Math.round(t.x.max) &&
    Math.round(e.y.min) === Math.round(t.y.min) &&
    Math.round(e.y.max) === Math.round(t.y.max)
  );
}
function Em(e) {
  return pt(e.x) / pt(e.y);
}
var nT = class {
  constructor() {
    this.members = [];
  }
  add(e) {
    (Hu(this.members, e), e.scheduleRender());
  }
  remove(e) {
    if ((Ts(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead)) {
      let t = this.members[this.members.length - 1];
      t && this.promote(t);
    }
  }
  relegate(e) {
    let t = this.members.findIndex((r) => e === r);
    if (t === 0) return !1;
    let n;
    for (let r = t; r >= 0; r--) {
      let i = this.members[r];
      if (i.isPresent !== !1) {
        n = i;
        break;
      }
    }
    return n ? (this.promote(n), !0) : !1;
  }
  promote(e, t) {
    let n = this.lead;
    if (e !== n && ((this.prevLead = n), (this.lead = e), e.show(), n)) {
      (n.instance && n.scheduleRender(),
        e.scheduleRender(),
        (e.resumeFrom = n),
        t && (e.resumeFrom.preserveOpacity = !0),
        n.snapshot &&
          ((e.snapshot = n.snapshot),
          (e.snapshot.latestValues = n.animationValues || n.latestValues)),
        e.root && e.root.isUpdating && (e.isLayoutDirty = !0));
      let { crossfade: r } = e.options;
      r === !1 && n.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      let { options: t, resumingFrom: n } = e;
      (t.onExitComplete && t.onExitComplete(),
        n && n.options.onExitComplete && n.options.onExitComplete());
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
};
function Tm(e, t, n) {
  let r = "",
    i = e.x.translate / t.x,
    o = e.y.translate / t.y;
  if (
    ((i || o) && (r = `translate3d(${i}px, ${o}px, 0) `),
    (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    let { rotate: l, rotateX: c, rotateY: u } = n;
    (l && (r += `rotate(${l}deg) `),
      c && (r += `rotateX(${c}deg) `),
      u && (r += `rotateY(${u}deg) `));
  }
  let a = e.x.scale * t.x,
    s = e.y.scale * t.y;
  return ((a !== 1 || s !== 1) && (r += `scale(${a}, ${s})`), r || "none");
}
function rT(e) {
  F.MotionDebug && F.MotionDebug.record(e);
}
function vg(e) {
  return e instanceof SVGElement && e.tagName !== "svg";
}
function nf(e, t, n) {
  let r = me(e) ? e : pe(e);
  return (r.start(ju("", r, t, n)), r.animation);
}
var Im = ["", "X", "Y", "Z"],
  iT = { visibility: "hidden" },
  Rm = 1e3,
  oT = 0,
  _r = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  };
function gg({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i,
}) {
  return class {
    constructor(a = {}, s = t?.()) {
      ((this.id = oT++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            (_r.totalNodes = _r.resolvedTargetDeltas = _r.recalculatedProjection = 0),
            this.nodes.forEach(lT),
            this.nodes.forEach(hT),
            this.nodes.forEach(pT),
            this.nodes.forEach(cT),
            rT(_r));
        }),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = a),
        (this.root = s ? s.root || s : this),
        (this.path = s ? [...s.path, s] : []),
        (this.parent = s),
        (this.depth = s ? s.depth + 1 : 0));
      for (let l = 0; l < this.path.length; l++) this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new $v());
    }
    addEventListener(a, s) {
      return (
        this.eventHandlers.has(a) || this.eventHandlers.set(a, new Nu()),
        this.eventHandlers.get(a).add(s)
      );
    }
    notifyListeners(a, ...s) {
      let l = this.eventHandlers.get(a);
      l && l.notify(...s);
    }
    hasListeners(a) {
      return this.eventHandlers.has(a);
    }
    mount(a, s = this.root.hasTreeAnimated) {
      if (this.instance) return;
      ((this.isSVG = vg(a)), (this.instance = a));
      let { layoutId: l, layout: c, visualElement: u } = this.options;
      if (
        (u && !u.current && u.mount(a),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        s && (c || l) && (this.isLayoutDirty = !0),
        e)
      ) {
        let f,
          d = () => (this.root.updateBlockedByResize = !1);
        e(a, () => {
          ((this.root.updateBlockedByResize = !0),
            f && f(),
            (f = Wv(d, 250)),
            os.hasAnimatedSinceResize &&
              ((os.hasAnimatedSinceResize = !1), this.nodes.forEach(_m)));
        });
      }
      (l && this.root.registerSharedNode(l, this),
        this.options.animate !== !1 &&
          u &&
          (l || c) &&
          this.addEventListener(
            "didUpdate",
            ({ delta: f, hasLayoutChanged: d, hasRelativeTargetChanged: m, layout: y }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              let b = this.options.transition || u.getDefaultTransition() || bT,
                { onLayoutAnimationStart: S, onLayoutAnimationComplete: h } = u.getProps(),
                v = !this.targetLayout || !mg(this.targetLayout, y) || m,
                g = !d && m;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                g ||
                (d && (v || !this.currentAnimation))
              ) {
                (this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(f, g));
                let x = { ...Uu(b, "layout"), onPlay: S, onComplete: h };
                ((u.shouldReduceMotion || this.options.layoutRoot) &&
                  ((x.delay = 0), (x.type = !1)),
                  this.startAnimation(x));
              } else
                (d || _m(this),
                  this.isLead() && this.options.onExitComplete && this.options.onExitComplete());
              this.targetLayout = y;
            }
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this));
      let a = this.getStack();
      (a && a.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        Qe(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1;
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0), this.nodes && this.nodes.forEach(mT), this.animationId++);
    }
    getTransformTemplate() {
      let { visualElement: a } = this.options;
      return a && a.getProps().transformTemplate;
    }
    willUpdate(a = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if ((!this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)) return;
      this.isLayoutDirty = !0;
      for (let u = 0; u < this.path.length; u++) {
        let f = this.path[u];
        ((f.shouldResetTransform = !0),
          f.updateScroll("snapshot"),
          f.options.layoutRoot && f.willUpdate(!1));
      }
      let { layoutId: s, layout: l } = this.options;
      if (s === void 0 && !l) return;
      let c = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = c ? c(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        a && this.notifyListeners("willUpdate"));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Pm));
        return;
      }
      (this.isUpdating || this.nodes.forEach(fT),
        (this.isUpdating = !1),
        this.nodes.forEach(dT),
        this.nodes.forEach(aT),
        this.nodes.forEach(sT),
        this.clearAllSnapshots());
      let s = Mr.now();
      ((xe.delta = wn(0, 1e3 / 60, s - xe.timestamp)),
        (xe.timestamp = s),
        (xe.isProcessing = !0),
        rs.update.process(xe),
        rs.preRender.process(xe),
        rs.render.process(xe),
        (xe.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), wu.read(() => this.update()));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(uT), this.sharedNodes.forEach(vT));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), q.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      q.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll();
      let a = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = be()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox));
      let { visualElement: s } = this.options;
      s && s.notify("LayoutMeasure", this.layout.layoutBox, a ? a.layoutBox : void 0);
    }
    updateScroll(a = "measure") {
      let s = !!(this.options.layoutScroll && this.instance);
      (this.scroll &&
        this.scroll.animationId === this.root.animationId &&
        this.scroll.phase === a &&
        (s = !1),
        s &&
          (this.scroll = {
            animationId: this.root.animationId,
            phase: a,
            isRoot: r(this.instance),
            offset: n(this.instance),
          }));
    }
    resetTransform() {
      if (!i) return;
      let a = this.isLayoutDirty || this.shouldResetTransform,
        s = this.projectionDelta && !pg(this.projectionDelta),
        l = this.getTransformTemplate(),
        c = l ? l(this.latestValues, "") : void 0,
        u = c !== this.prevTransformTemplateValue;
      a &&
        (s || Pr(this.latestValues) || u) &&
        (i(this.instance, c), (this.shouldResetTransform = !1), this.scheduleRender());
    }
    measure(a = !0) {
      let s = this.measurePageBox(),
        l = this.removeElementScroll(s);
      return (
        a && (l = this.removeTransform(l)),
        xT(l),
        {
          animationId: this.root.animationId,
          measuredBox: s,
          layoutBox: l,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      let { visualElement: a } = this.options;
      if (!a) return be();
      let s = a.measureViewportBox(),
        { scroll: l } = this.root;
      return (l && (Wn(s.x, l.offset.x), Wn(s.y, l.offset.y)), s);
    }
    removeElementScroll(a) {
      let s = be();
      Ot(s, a);
      for (let l = 0; l < this.path.length; l++) {
        let c = this.path[l],
          { scroll: u, options: f } = c;
        if (c !== this.root && u && f.layoutScroll) {
          if (u.isRoot) {
            Ot(s, a);
            let { scroll: d } = this.root;
            d && (Wn(s.x, -d.offset.x), Wn(s.y, -d.offset.y));
          }
          (Wn(s.x, u.offset.x), Wn(s.y, u.offset.y));
        }
      }
      return s;
    }
    applyTransform(a, s = !1) {
      let l = be();
      Ot(l, a);
      for (let c = 0; c < this.path.length; c++) {
        let u = this.path[c];
        (!s &&
          u.options.layoutScroll &&
          u.scroll &&
          u !== u.root &&
          di(l, { x: -u.scroll.offset.x, y: -u.scroll.offset.y }),
          Pr(u.latestValues) && di(l, u.latestValues));
      }
      return (Pr(this.latestValues) && di(l, this.latestValues), l);
    }
    removeTransform(a) {
      let s = be();
      Ot(s, a);
      for (let l = 0; l < this.path.length; l++) {
        let c = this.path[l];
        if (!c.instance || !Pr(c.latestValues)) continue;
        mu(c.latestValues) && c.updateSnapshot();
        let u = be(),
          f = c.measurePageBox();
        (Ot(u, f), km(s, c.latestValues, c.snapshot ? c.snapshot.layoutBox : void 0, u));
      }
      return (Pr(this.latestValues) && km(s, this.latestValues), s);
    }
    setTargetDelta(a) {
      ((this.targetDelta = a), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0));
    }
    setOptions(a) {
      this.options = {
        ...this.options,
        ...a,
        crossfade: a.crossfade !== void 0 ? a.crossfade : !0,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== xe.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(a = !1) {
      var s;
      let l = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = l.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = l.isTransformDirty),
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = l.isSharedProjectionDirty));
      let c = !!this.resumingFrom || this !== l;
      if (!(
        a ||
        (c && this.isSharedProjectionDirty) ||
        this.isProjectionDirty ||
        (!((s = this.parent) === null || s === void 0) && s.isProjectionDirty) ||
        this.attemptToResolveRelativeTarget
      ))
        return;
      let { layout: f, layoutId: d } = this.options;
      if (!(!this.layout || !(f || d))) {
        if (
          ((this.resolvedRelativeTargetAt = xe.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          let m = this.getClosestProjectingParent();
          m && m.layout && this.animationProgress !== 1
            ? ((this.relativeParent = m),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = be()),
              (this.relativeTargetOrigin = be()),
              Eo(this.relativeTargetOrigin, this.layout.layoutBox, m.layout.layoutBox),
              Ot(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target || ((this.target = be()), (this.targetWithTransforms = be())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                ZC(this.target, this.relativeTarget, this.relativeParent.target))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : Ot(this.target, this.layout.layoutBox),
                  lg(this.target, this.targetDelta))
                : Ot(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            let m = this.getClosestProjectingParent();
            m &&
            !!m.resumingFrom == !!this.resumingFrom &&
            !m.options.layoutScroll &&
            m.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = m),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = be()),
                (this.relativeTargetOrigin = be()),
                Eo(this.relativeTargetOrigin, this.target, m.target),
                Ot(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          _r.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || mu(this.parent.latestValues) || sg(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var a;
      let s = this.getLead(),
        l = !!this.resumingFrom || this !== s,
        c = !0;
      if (
        ((this.isProjectionDirty ||
          (!((a = this.parent) === null || a === void 0) && a.isProjectionDirty)) &&
          (c = !1),
        l && (this.isSharedProjectionDirty || this.isTransformDirty) && (c = !1),
        this.resolvedRelativeTargetAt === xe.timestamp && (c = !1),
        c)
      )
        return;
      let { layout: u, layoutId: f } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(u || f))
      )
        return;
      Ot(this.layoutCorrected, this.layout.layoutBox);
      let d = this.treeScale.x,
        m = this.treeScale.y;
      (AE(this.layoutCorrected, this.treeScale, this.path, l),
        s.layout &&
          !s.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((s.target = s.layout.layoutBox), (s.targetWithTransforms = be())));
      let { target: y } = s;
      if (!y) {
        this.projectionTransform &&
          ((this.projectionDelta = fi()),
          (this.projectionTransform = "none"),
          this.scheduleRender());
        return;
      }
      this.projectionDelta ||
        ((this.projectionDelta = fi()), (this.projectionDeltaWithTransform = fi()));
      let b = this.projectionTransform;
      (Co(this.projectionDelta, this.layoutCorrected, y, this.latestValues),
        (this.projectionTransform = Tm(this.projectionDelta, this.treeScale)),
        (this.projectionTransform !== b || this.treeScale.x !== d || this.treeScale.y !== m) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", y)),
        _r.recalculatedProjection++);
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(a = !0) {
      if ((this.options.scheduleRender && this.options.scheduleRender(), a)) {
        let s = this.getStack();
        s && s.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    setAnimationOrigin(a, s = !1) {
      let l = this.snapshot,
        c = l ? l.latestValues : {},
        u = { ...this.latestValues },
        f = fi();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !s));
      let d = be(),
        m = l ? l.source : void 0,
        y = this.layout ? this.layout.source : void 0,
        b = m !== y,
        S = this.getStack(),
        h = !S || S.members.length <= 1,
        v = !!(b && !h && this.options.crossfade === !0 && !this.path.some(yT));
      this.animationProgress = 0;
      let g;
      ((this.mixTargetDelta = (x) => {
        let k = x / 1e3;
        (Fm(f.x, a.x, k),
          Fm(f.y, a.y, k),
          this.setTargetDelta(f),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Eo(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            gT(this.relativeTarget, this.relativeTargetOrigin, d, k),
            g && tT(this.relativeTarget, g) && (this.isProjectionDirty = !1),
            g || (g = be()),
            Ot(g, this.relativeTarget)),
          b && ((this.animationValues = u), KE(u, c, this.latestValues, k, v, h)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = k));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(a) {
      (this.notifyListeners("animationStart"),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation && (Qe(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = q.update(() => {
          ((os.hasAnimatedSinceResize = !0),
            (this.currentAnimation = nf(0, Rm, {
              ...a,
              onUpdate: (s) => {
                (this.mixTargetDelta(s), a.onUpdate && a.onUpdate(s));
              },
              onComplete: () => {
                (a.onComplete && a.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      let a = this.getStack();
      (a && a.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners("animationComplete"));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(Rm), this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      let a = this.getLead(),
        { targetWithTransforms: s, target: l, layout: c, latestValues: u } = a;
      if (!(!s || !l || !c)) {
        if (
          this !== a &&
          this.layout &&
          c &&
          yg(this.options.animationType, this.layout.layoutBox, c.layoutBox)
        ) {
          l = this.target || be();
          let f = pt(this.layout.layoutBox.x);
          ((l.x.min = a.target.x.min), (l.x.max = l.x.min + f));
          let d = pt(this.layout.layoutBox.y);
          ((l.y.min = a.target.y.min), (l.y.max = l.y.min + d));
        }
        (Ot(s, l), di(s, u), Co(this.projectionDeltaWithTransform, this.layoutCorrected, s, u));
      }
    }
    registerSharedNode(a, s) {
      (this.sharedNodes.has(a) || this.sharedNodes.set(a, new nT()),
        this.sharedNodes.get(a).add(s));
      let c = s.options.initialPromotionConfig;
      s.promote({
        transition: c ? c.transition : void 0,
        preserveFollowOpacity:
          c && c.shouldPreserveFollowOpacity ? c.shouldPreserveFollowOpacity(s) : void 0,
      });
    }
    isLead() {
      let a = this.getStack();
      return a ? a.lead === this : !0;
    }
    getLead() {
      var a;
      let { layoutId: s } = this.options;
      return s ? ((a = this.getStack()) === null || a === void 0 ? void 0 : a.lead) || this : this;
    }
    getPrevLead() {
      var a;
      let { layoutId: s } = this.options;
      return s ? ((a = this.getStack()) === null || a === void 0 ? void 0 : a.prevLead) : void 0;
    }
    getStack() {
      let { layoutId: a } = this.options;
      if (a) return this.root.sharedNodes.get(a);
    }
    promote({ needsReset: a, transition: s, preserveFollowOpacity: l } = {}) {
      let c = this.getStack();
      (c && c.promote(this, l),
        a && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        s && this.setOptions({ transition: s }));
    }
    relegate() {
      let a = this.getStack();
      return a ? a.relegate(this) : !1;
    }
    resetRotation() {
      let { visualElement: a } = this.options;
      if (!a) return;
      let s = !1,
        { latestValues: l } = a;
      if (((l.rotate || l.rotateX || l.rotateY || l.rotateZ) && (s = !0), !s)) return;
      let c = {};
      for (let u = 0; u < Im.length; u++) {
        let f = "rotate" + Im[u];
        l[f] && ((c[f] = l[f]), a.setStaticValue(f, 0));
      }
      a.render();
      for (let u in c) a.setStaticValue(u, c[u]);
      a.scheduleRender();
    }
    getProjectionStyles(a) {
      var s, l;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return iT;
      let c = { visibility: "" },
        u = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (c.opacity = ""),
          (c.pointerEvents = qe(a?.pointerEvents) || ""),
          (c.transform = u ? u(this.latestValues, "") : "none"),
          c
        );
      let f = this.getLead();
      if (!this.projectionDelta || !this.layout || !f.target) {
        let b = {};
        return (
          this.options.layoutId &&
            ((b.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1),
            (b.pointerEvents = qe(a?.pointerEvents) || "")),
          this.hasProjected &&
            !Pr(this.latestValues) &&
            ((b.transform = u ? u({}, "") : "none"), (this.hasProjected = !1)),
          b
        );
      }
      let d = f.animationValues || f.latestValues;
      (this.applyTransformsToTarget(),
        (c.transform = Tm(this.projectionDeltaWithTransform, this.treeScale, d)),
        u && (c.transform = u(d, c.transform)));
      let { x: m, y } = this.projectionDelta;
      ((c.transformOrigin = `${m.origin * 100}% ${y.origin * 100}% 0`),
        f.animationValues
          ? (c.opacity =
              f === this
                ? (l = (s = d.opacity) !== null && s !== void 0 ? s : this.latestValues.opacity) !==
                    null && l !== void 0
                  ? l
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : d.opacityExit)
          : (c.opacity =
              f === this
                ? d.opacity !== void 0
                  ? d.opacity
                  : ""
                : d.opacityExit !== void 0
                  ? d.opacityExit
                  : 0));
      for (let b in ls) {
        if (d[b] === void 0) continue;
        let { correct: S, applyTo: h } = ls[b],
          v = c.transform === "none" ? d[b] : S(d[b], f);
        if (h) {
          let g = h.length;
          for (let x = 0; x < g; x++) c[h[x]] = v;
        } else c[b] = v;
      }
      return (
        this.options.layoutId &&
          (c.pointerEvents = f === this ? qe(a?.pointerEvents) || "" : "none"),
        c
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((a) => {
        var s;
        return (s = a.currentAnimation) === null || s === void 0 ? void 0 : s.stop();
      }),
        this.root.nodes.forEach(Pm),
        this.root.sharedNodes.clear());
    }
  };
}
function aT(e) {
  e.updateLayout();
}
function sT(e) {
  var t;
  let n = ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners("didUpdate")) {
    let { layoutBox: r, measuredBox: i } = e.layout,
      { animationType: o } = e.options,
      a = n.source !== e.layout.source;
    o === "size"
      ? Vt((f) => {
          let d = a ? n.measuredBox[f] : n.layoutBox[f],
            m = pt(d);
          ((d.min = r[f].min), (d.max = d.min + m));
        })
      : yg(o, n.layoutBox, r) &&
        Vt((f) => {
          let d = a ? n.measuredBox[f] : n.layoutBox[f],
            m = pt(r[f]);
          ((d.max = d.min + m),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[f].max = e.relativeTarget[f].min + m)));
        });
    let s = fi();
    Co(s, r, n.layoutBox);
    let l = fi();
    a ? Co(l, e.applyTransform(i, !0), n.measuredBox) : Co(l, r, n.layoutBox);
    let c = !pg(s),
      u = !1;
    if (!e.resumeFrom) {
      let f = e.getClosestProjectingParent();
      if (f && !f.resumeFrom) {
        let { snapshot: d, layout: m } = f;
        if (d && m) {
          let y = be();
          Eo(y, n.layoutBox, d.layoutBox);
          let b = be();
          (Eo(b, r, m.layoutBox),
            mg(y, b) || (u = !0),
            f.options.layoutRoot &&
              ((e.relativeTarget = b), (e.relativeTargetOrigin = y), (e.relativeParent = f)));
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: r,
      snapshot: n,
      delta: l,
      layoutDelta: s,
      hasLayoutChanged: c,
      hasRelativeTargetChanged: u,
    });
  } else if (e.isLead()) {
    let { onExitComplete: r } = e.options;
    r && r();
  }
  e.options.transition = void 0;
}
function lT(e) {
  (_r.totalNodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      e.isSharedProjectionDirty ||
        (e.isSharedProjectionDirty = !!(
          e.isProjectionDirty ||
          e.parent.isProjectionDirty ||
          e.parent.isSharedProjectionDirty
        )),
      e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty)));
}
function cT(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function uT(e) {
  e.clearSnapshot();
}
function Pm(e) {
  e.clearMeasurements();
}
function fT(e) {
  e.isLayoutDirty = !1;
}
function dT(e) {
  let { visualElement: t } = e.options;
  (t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform());
}
function _m(e) {
  (e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0));
}
function hT(e) {
  e.resolveTargetDelta();
}
function pT(e) {
  e.calcProjection();
}
function mT(e) {
  e.resetRotation();
}
function vT(e) {
  e.removeLeadSnapshot();
}
function Fm(e, t, n) {
  ((e.translate = le(t.translate, 0, n)),
    (e.scale = le(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint));
}
function Lm(e, t, n, r) {
  ((e.min = le(t.min, n.min, r)), (e.max = le(t.max, n.max, r)));
}
function gT(e, t, n, r) {
  (Lm(e.x, t.x, n.x, r), Lm(e.y, t.y, n.y, r));
}
function yT(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
var bT = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  Mm = (e) => typeof Ye < "u" && Ye.userAgent && Ye.userAgent.toLowerCase().includes(e),
  Om = Mm("applewebkit/") && !Mm("chrome/") ? Math.round : Ce;
function Vm(e) {
  ((e.min = Om(e.min)), (e.max = Om(e.max)));
}
function xT(e) {
  (Vm(e.x), Vm(e.y));
}
function yg(e, t, n) {
  return e === "position" || (e === "preserve-aspect" && !du(Em(t), Em(n), 0.2));
}
var ST = gg({
    attachResizeListener: (e, t) => bn(e, "resize", t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  Or = { current: void 0 },
  bg = gg({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!Or.current) {
        let e = new ST({});
        (e.mount(F), e.setOptions({ layoutScroll: !0 }), (Or.current = e));
      }
      return Or.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : "none";
    },
    checkIsScrollRoot: (e) => F.getComputedStyle(e).position === "fixed",
  }),
  xg = { pan: { Feature: UE }, drag: { Feature: WE, ProjectionNode: bg, MeasureLayout: fg } },
  wT = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function kT(e) {
  let t = wT.exec(e);
  if (!t) return [,];
  let [, n, r] = t;
  return [n, r];
}
var CT = 4;
function gu(e, t, n = 1) {
  Ze(
    n <= CT,
    `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`
  );
  let [r, i] = kT(e);
  if (!r) return;
  let o = F.getComputedStyle(t).getPropertyValue(r);
  if (o) {
    let a = o.trim();
    return Rv(a) ? parseFloat(a) : a;
  } else return fs(i) ? gu(i, t, n + 1) : i;
}
function ET(e, { ...t }, n) {
  let r = e.current;
  if (!(r instanceof Element)) return { target: t, transitionEnd: n };
  (n && (n = { ...n }),
    e.values.forEach((i) => {
      let o = i.get();
      if (!fs(o)) return;
      let a = gu(o, r);
      a && i.set(a);
    }));
  for (let i in t) {
    let o = t[i];
    if (!fs(o)) continue;
    let a = gu(o, r);
    a && ((t[i] = a), n || (n = {}), n[i] === void 0 && (n[i] = o));
  }
  return { target: t, transitionEnd: n };
}
var TT = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "x",
    "y",
    "translateX",
    "translateY",
  ]),
  Sg = (e) => TT.has(e),
  IT = (e) => Object.keys(e).some(Sg),
  ns = (e) => e === gi || e === U,
  Am = (e, t) => parseFloat(e.split(", ")[t]),
  Dm =
    (e, t) =>
    (n, { transform: r }) => {
      if (r === "none" || !r) return 0;
      let i = r.match(/^matrix3d\((.+)\)$/);
      if (i) return Am(i[1], t);
      {
        let o = r.match(/^matrix\((.+)\)$/);
        return o ? Am(o[1], e) : 0;
      }
    },
  RT = new Set(["x", "y", "z"]),
  PT = Mo.filter((e) => !RT.has(e));
function _T(e) {
  let t = [];
  return (
    PT.forEach((n) => {
      let r = e.getValue(n);
      r !== void 0 && (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0));
    }),
    t.length && e.render(),
    t
  );
}
var pi = {
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: Dm(4, 13),
  y: Dm(5, 14),
};
pi.translateX = pi.x;
pi.translateY = pi.y;
var FT = (e, t, n) => {
    let r = t.measureViewportBox(),
      i = t.current,
      o = getComputedStyle(i),
      { display: a } = o,
      s = {};
    (a === "none" && t.setStaticValue("display", e.display || "block"),
      n.forEach((c) => {
        s[c] = pi[c](r, o);
      }),
      t.render());
    let l = t.measureViewportBox();
    return (
      n.forEach((c) => {
        let u = t.getValue(c);
        (u && u.jump(s[c]), (e[c] = pi[c](l, o)));
      }),
      e
    );
  },
  LT = (e, t, n = {}, r = {}) => {
    ((t = { ...t }), (r = { ...r }));
    let i = Object.keys(t).filter(Sg),
      o = [],
      a = !1,
      s = [];
    if (
      (i.forEach((l) => {
        let c = e.getValue(l);
        if (!e.hasValue(l)) return;
        let u = n[l],
          f = vo(u),
          d = t[l],
          m;
        if (cs(d)) {
          let y = d.length,
            b = d[0] === null ? 1 : 0;
          ((u = d[b]), (f = vo(u)));
          for (let S = b; S < y && d[S] !== null; S++)
            m
              ? Ze(vo(d[S]) === m, "All keyframes must be of the same type")
              : ((m = vo(d[S])),
                Ze(
                  m === f || (ns(f) && ns(m)),
                  "Keyframes must be of the same dimension as the current value"
                ));
        } else m = vo(d);
        if (f !== m)
          if (ns(f) && ns(m)) {
            let y = c.get();
            (typeof y == "string" && c.set(parseFloat(y)),
              typeof d == "string"
                ? (t[l] = parseFloat(d))
                : Array.isArray(d) && m === U && (t[l] = d.map(parseFloat)));
          } else
            f?.transform && m?.transform && (u === 0 || d === 0)
              ? u === 0
                ? c.set(m.transform(u))
                : (t[l] = f.transform(d))
              : (a || ((o = _T(e)), (a = !0)),
                s.push(l),
                (r[l] = r[l] !== void 0 ? r[l] : t[l]),
                c.jump(d));
      }),
      s.length)
    ) {
      let l = s.indexOf("height") >= 0 ? F.pageYOffset : null,
        c = FT(t, e, s);
      return (
        o.length &&
          o.forEach(([u, f]) => {
            e.getValue(u).set(f);
          }),
        e.render(),
        Lo && l !== null && F.scrollTo({ top: l }),
        { target: c, transitionEnd: r }
      );
    } else return { target: t, transitionEnd: r };
  };
function MT(e, t, n, r) {
  return IT(t) ? LT(e, t, n, r) : { target: t, transitionEnd: r };
}
var OT = (e, t, n, r) => {
    let i = ET(e, t, r);
    return ((t = i.target), (r = i.transitionEnd), MT(e, t, n, r));
  },
  wg = class extends Xv {
    sortInstanceNodePosition(e, t) {
      return e.compareDocumentPosition(t) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(e, t) {
      return e.style ? e.style[t] : void 0;
    }
    removeValueFromRenderState(e, { vars: t, style: n }) {
      (delete t[e], delete n[e]);
    }
    makeTargetAnimatableFromInstance({ transition: e, transitionEnd: t, ...n }, r) {
      let i = wC(n, e || {}, this);
      if (r) {
        Ov(this, n, i);
        let o = OT(this, n, i, t);
        ((t = o.transitionEnd), (n = o.target));
      }
      return { transition: e, transitionEnd: t, ...n };
    }
  };
function VT(e) {
  return F.getComputedStyle(e);
}
var kg = class extends wg {
    constructor() {
      (super(...arguments), (this.type = "html"));
    }
    readValueFromInstance(e, t) {
      if (Ar.has(t)) {
        let n = $u(t);
        return (n && n.default) || 0;
      } else {
        let n = VT(e),
          r = (kv(t) ? n.getPropertyValue(t) : n[t]) || 0;
        return typeof r == "string" ? r.trim() : r;
      }
    }
    measureInstanceViewportBox(e, { transformPagePoint: t }) {
      return cg(e, t);
    }
    build(e, t, n, r) {
      Qu(e, t, n, r.transformTemplate);
    }
    scrapeMotionValuesFromProps(e, t) {
      return tf(e, t);
    }
    handleChildMotionValue() {
      this.childSubscription && (this.childSubscription(), delete this.childSubscription);
      let { children: e } = this.props;
      me(e) &&
        (this.childSubscription = e.on("change", (t) => {
          this.current && (this.current.textContent = `${t}`);
        }));
    }
    renderInstance(e, t, n, r) {
      Qv(e, t, n, r);
    }
  },
  Cg = class extends wg {
    constructor() {
      (super(...arguments), (this.type = "svg"), (this.isSVGTag = !1));
    }
    getBaseTargetFromProps(e, t) {
      return e[t];
    }
    readValueFromInstance(e, t) {
      if (Ar.has(t)) {
        let n = $u(t);
        return (n && n.default) || 0;
      }
      return ((t = Zv.has(t) ? t : Su(t)), e.getAttribute(t));
    }
    measureInstanceViewportBox() {
      return be();
    }
    scrapeMotionValuesFromProps(e, t) {
      return eg(e, t);
    }
    build(e, t, n, r) {
      Ju(e, t, n, this.isSVGTag, r.transformTemplate);
    }
    renderInstance(e, t, n, r) {
      Jv(e, t, n, r);
    }
    mount(e) {
      ((this.isSVGTag = ef(e.tagName)), super.mount(e));
    }
  },
  Eg = (e, t) =>
    qu(e)
      ? new Cg(t, { enableHardwareAcceleration: !1 })
      : new kg(t, { enableHardwareAcceleration: !0 }),
  Tg = { layout: { ProjectionNode: bg, MeasureLayout: fg } },
  AT = { ...Yu, ...rg, ...xg, ...Tg },
  wt = Gv((e, t) => tg(e, t, AT, Eg));
var DT = Gv(tg);
function Ig() {
  let e = B(!1);
  return (
    Xn(
      () => (
        (e.current = !0),
        () => {
          e.current = !1;
        }
      ),
      []
    ),
    e
  );
}
function _s() {
  let e = Ig(),
    [t, n] = ht(0),
    r = ae(() => {
      e.current && n(t + 1);
    }, [t]);
  return [ae(() => q.postRender(r), [r]), t];
}
function Rg(e) {
  return X(() => () => e(), []);
}
var BT = class extends ke {
  getSnapshotBeforeUpdate(e) {
    let t = this.props.childRef.current;
    if (t && e.isPresent && !this.props.isPresent) {
      let n = this.props.sizeRef.current;
      ((n.height = t.offsetHeight || 0),
        (n.width = t.offsetWidth || 0),
        (n.top = t.offsetTop),
        (n.left = t.offsetLeft));
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
};
function zT({ children: e, isPresent: t }) {
  let n = Tr(),
    r = B(null),
    i = B({ width: 0, height: 0, top: 0, left: 0 });
  return (
    dt(() => {
      let { width: o, height: a, top: s, left: l } = i.current;
      if (t || !r.current || !o || !a) return;
      r.current.dataset.motionPopId = n;
      let c = document.createElement("style");
      return (
        document.head.appendChild(c),
        c.sheet &&
          c.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${o}px !important;
            height: ${a}px !important;
            top: ${s}px !important;
            left: ${l}px !important;
          }
        `),
        () => {
          document.head.removeChild(c);
        }
      );
    }, [t]),
    ne(BT, { isPresent: t, childRef: r, sizeRef: i }, Er(e, { ref: r }))
  );
}
var eu = ({
  children: e,
  initial: t,
  isPresent: n,
  onExitComplete: r,
  custom: i,
  presenceAffectsLayout: o,
  mode: a,
}) => {
  let s = Cn(HT),
    l = Tr(),
    c = se(
      () => ({
        id: l,
        initial: t,
        isPresent: n,
        custom: i,
        onExitComplete: (u) => {
          s.set(u, !0);
          for (let f of s.values()) if (!f) return;
          r && r();
        },
        register: (u) => (s.set(u, !1), () => s.delete(u)),
      }),
      o ? void 0 : [n]
    );
  return (
    se(() => {
      s.forEach((u, f) => s.set(f, !1));
    }, [n]),
    X(() => {
      !n && !s.size && r && r();
    }, [n]),
    a === "popLayout" && (e = ne(zT, { isPresent: n }, e)),
    ne(mi.Provider, { value: c }, e)
  );
};
function HT() {
  return new Map();
}
var Fr = (e) => e.key || "";
function NT(e, t) {
  e.forEach((n) => {
    let r = Fr(n);
    t.set(r, n);
  });
}
function $T(e) {
  let t = [];
  return (
    mo.forEach(e, (n) => {
      si(n) && t.push(n);
    }),
    t
  );
}
var rf = ({
  children: e,
  custom: t,
  initial: n = !0,
  onExitComplete: r,
  exitBeforeEnter: i,
  presenceAffectsLayout: o = !0,
  mode: a = "sync",
}) => {
  Ze(!i, "Replace exitBeforeEnter with mode='wait'");
  let s = O(Io).forceRender || _s()[0],
    l = Ig(),
    c = $T(e),
    u = c,
    f = B(new Map()).current,
    d = B(u),
    m = B(new Map()).current,
    y = B(!0);
  if (
    (Xn(() => {
      ((y.current = !1), NT(c, m), (d.current = u));
    }),
    Rg(() => {
      ((y.current = !0), m.clear(), f.clear());
    }),
    y.current)
  )
    return ne(
      ai,
      null,
      u.map((v) =>
        ne(
          eu,
          {
            key: Fr(v),
            isPresent: !0,
            initial: n ? void 0 : !1,
            presenceAffectsLayout: o,
            mode: a,
          },
          v
        )
      )
    );
  u = [...u];
  let b = d.current.map(Fr),
    S = c.map(Fr),
    h = b.length;
  for (let v = 0; v < h; v++) {
    let g = b[v];
    S.indexOf(g) === -1 && !f.has(g) && f.set(g, void 0);
  }
  return (
    a === "wait" && f.size && (u = []),
    f.forEach((v, g) => {
      if (S.indexOf(g) !== -1) return;
      let x = m.get(g);
      if (!x) return;
      let k = b.indexOf(g),
        w = v;
      if (!w) {
        let E = () => {
          f.delete(g);
          let C = Array.from(m.keys()).filter((I) => !S.includes(I));
          if (
            (C.forEach((I) => m.delete(I)),
            (d.current = c.filter((I) => {
              let T = Fr(I);
              return T === g || C.includes(T);
            })),
            !f.size)
          ) {
            if (l.current === !1) return;
            (s(), r && r());
          }
        };
        ((w = ne(
          eu,
          {
            key: Fr(x),
            isPresent: !1,
            onExitComplete: E,
            custom: t,
            presenceAffectsLayout: o,
            mode: a,
          },
          x
        )),
          f.set(g, w));
      }
      u.splice(k, 0, w);
    }),
    (u = u.map((v) => {
      let g = v.key;
      return f.has(g)
        ? v
        : ne(eu, { key: Fr(v), isPresent: !0, presenceAffectsLayout: o, mode: a }, v);
    })),
    ne(ai, null, f.size ? u : u.map((v) => Er(v)))
  );
};
function Pg({ children: e, isValidProp: t, ...n }) {
  (t && ov(t), (n = { ...O(Sn), ...n }), (n.isStatic = Cn(() => n.isStatic)));
  let r = se(() => n, [JSON.stringify(n.transition), n.transformPagePoint, n.reducedMotion]);
  return ne(Sn.Provider, { value: r }, e);
}
var _g = he(null),
  WT = (e) => !e.isLayoutDirty && e.willUpdate(!1);
function Bm() {
  let e = new Set(),
    t = new WeakMap(),
    n = () => e.forEach(WT);
  return {
    add: (r) => {
      (e.add(r), t.set(r, r.addEventListener("willUpdate", n)));
    },
    remove: (r) => {
      e.delete(r);
      let i = t.get(r);
      (i && (i(), t.delete(r)), n());
    },
    dirty: n,
  };
}
var Fg = (e) => e === !0,
  UT = (e) => Fg(e === !0) || e === "id",
  Lg = ({ children: e, id: t, inherit: n = !0 }) => {
    let r = O(Io),
      i = O(_g),
      [o, a] = _s(),
      s = B(null),
      l = r.id || i;
    s.current === null &&
      (UT(n) && l && (t = t ? l + "-" + t : l),
      (s.current = { id: t, group: (Fg(n) && r.group) || Bm() }));
    let c = se(() => ({ ...s.current, forceRender: o }), [a]);
    return ne(Io.Provider, { value: c }, e);
  };
function sn(e) {
  let t = Cn(() => pe(e)),
    { isStatic: n } = O(Sn);
  if (n) {
    let [, r] = ht(e);
    X(() => t.on("change", r), []);
  }
  return t;
}
var jT = (e) => e && typeof e == "object" && e.mix,
  XT = (e) => (jT(e) ? e.mix : void 0);
function Bo(...e) {
  let t = !Array.isArray(e[0]),
    n = t ? 0 : -1,
    r = e[0 + n],
    i = e[1 + n],
    o = e[2 + n],
    a = e[3 + n],
    s = yi(i, o, { mixer: XT(o[0]), ...a });
  return t ? s(r) : s;
}
function Mg(e, t) {
  let n = sn(t()),
    r = () => n.set(t());
  return (
    r(),
    Xn(() => {
      let i = () => q.update(r, !1, !0),
        o = e.map((a) => a.on("change", i));
      return () => {
        (o.forEach((a) => a()), Qe(r));
      };
    }),
    n
  );
}
function GT(e) {
  ((ko.current = []), e());
  let t = Mg(ko.current, e);
  return ((ko.current = void 0), t);
}
function kt(e, t, n, r) {
  if (typeof e == "function") return GT(e);
  let i = typeof t == "function" ? t : Bo(t, n, r);
  return Array.isArray(e) ? zm(e, i) : zm([e], ([o]) => i(o));
}
function zm(e, t) {
  let n = Cn(() => []);
  return Mg(e, () => {
    n.length = 0;
    let r = e.length;
    for (let i = 0; i < r; i++) n[i] = e[i].get();
    return t(n);
  });
}
var Og = he(null);
function YT(e, t, n, r) {
  if (!r) return e;
  let i = e.findIndex((u) => u.value === t);
  if (i === -1) return e;
  let o = r > 0 ? 1 : -1,
    a = e[i + o];
  if (!a) return e;
  let s = e[i],
    l = a.layout,
    c = le(l.min, l.max, 0.5);
  return (o === 1 && s.layout.max + n > c) || (o === -1 && s.layout.min + n < c)
    ? lC(e, i, i + o)
    : e;
}
function KT({ children: e, as: t = "ul", axis: n = "y", onReorder: r, values: i, ...o }, a) {
  let s = Cn(() => wt(t)),
    l = [],
    c = B(!1);
  Ze(!!i, "Reorder.Group must be provided a values prop");
  let u = {
    axis: n,
    registerItem: (f, d) => {
      let m = l.findIndex((y) => f === y.value);
      (m !== -1 ? (l[m].layout = d[n]) : l.push({ value: f, layout: d[n] }), l.sort(QT));
    },
    updateOrder: (f, d, m) => {
      if (c.current) return;
      let y = YT(l, f, d, m);
      l !== y && ((c.current = !0), r(y.map(qT).filter((b) => i.indexOf(b) !== -1)));
    },
  };
  return (
    X(() => {
      c.current = !1;
    }),
    ne(s, { ...o, ref: a, ignoreStrict: !0 }, ne(Og.Provider, { value: u }, e))
  );
}
var N3 = Ne(KT);
function qT(e) {
  return e.value;
}
function QT(e, t) {
  return e.layout.min - t.layout.min;
}
function Hm(e, t = 0) {
  return me(e) ? e : sn(t);
}
function ZT(
  { children: e, style: t = {}, value: n, as: r = "li", onDrag: i, layout: o = !0, ...a },
  s
) {
  let l = Cn(() => wt(r)),
    c = O(Og),
    u = { x: Hm(t.x), y: Hm(t.y) },
    f = kt([u.x, u.y], ([b, S]) => (b || S ? 1 : "unset"));
  Ze(!!c, "Reorder.Item must be a child of Reorder.Group");
  let { axis: d, registerItem: m, updateOrder: y } = c;
  return ne(
    l,
    {
      drag: d,
      ...a,
      dragSnapToOrigin: !0,
      style: { ...t, x: u.x, y: u.y, zIndex: f },
      layout: o,
      onDrag: (b, S) => {
        let { velocity: h } = S;
        (h[d] && y(n, u[d].get(), h[d]), i && i(b, S));
      },
      onLayoutMeasure: (b) => m(n, b),
      ref: s,
      ignoreStrict: !0,
    },
    e
  );
}
var W3 = Ne(ZT);
var Vg = { renderer: Eg, ...Yu, ...rg },
  JT = { ...Vg, ...xg, ...Tg };
function of(e, t = {}) {
  let { isStatic: n } = O(Sn),
    r = B(null),
    i = sn(me(e) ? e.get() : e),
    o = () => {
      r.current && r.current.stop();
    };
  return (
    dt(
      () =>
        i.attach((a, s) => {
          if (n) return s(a);
          let l = r.current;
          return (
            l && l.time === 0 && l.sample(xe.delta),
            o(),
            (r.current = Vr({
              keyframes: [i.get(), a],
              velocity: i.getVelocity(),
              type: "spring",
              restDelta: 0.001,
              restSpeed: 0.01,
              ...t,
              onUpdate: s,
            })),
            i.get()
          );
        }, o),
      [JSON.stringify(t)]
    ),
    Xn(() => {
      if (me(e)) return e.on("change", (a) => i.set(parseFloat(a)));
    }, [i]),
    i
  );
}
function Fs(e, t, n) {
  var r;
  if (typeof e == "string") {
    let i = document;
    (t && (Ze(!!t.current, "Scope provided, but no element detected."), (i = t.current)),
      n
        ? (((r = n[e]) !== null && r !== void 0) || (n[e] = i.querySelectorAll(e)), (e = n[e]))
        : (e = i.querySelectorAll(e)));
  } else e instanceof Element && (e = [e]);
  return Array.from(e || []);
}
var as = new WeakMap(),
  $n;
function eI(e, t) {
  if (t) {
    let { inlineSize: n, blockSize: r } = t[0];
    return { width: n, height: r };
  } else
    return e instanceof SVGElement && "getBBox" in e
      ? e.getBBox()
      : { width: e.offsetWidth, height: e.offsetHeight };
}
function tI({ target: e, contentRect: t, borderBoxSize: n }) {
  var r;
  (r = as.get(e)) === null ||
    r === void 0 ||
    r.forEach((i) => {
      i({
        target: e,
        contentSize: t,
        get size() {
          return eI(e, n);
        },
      });
    });
}
function nI(e) {
  e.forEach(tI);
}
function rI() {
  typeof ResizeObserver > "u" || ($n = new ResizeObserver(nI));
}
function iI(e, t) {
  $n || rI();
  let n = Fs(e);
  return (
    n.forEach((r) => {
      let i = as.get(r);
      (i || ((i = new Set()), as.set(r, i)), i.add(t), $n?.observe(r));
    }),
    () => {
      n.forEach((r) => {
        let i = as.get(r);
        (i?.delete(t), i?.size || $n?.unobserve(r));
      });
    }
  );
}
var ss = new Set(),
  To;
function oI() {
  ((To = () => {
    let e = { width: F.innerWidth, height: F.innerHeight },
      t = { target: F, size: e, contentSize: e };
    ss.forEach((n) => n(t));
  }),
    F.addEventListener("resize", To));
}
function aI(e) {
  return (
    ss.add(e),
    To || oI(),
    () => {
      (ss.delete(e), !ss.size && To && (To = void 0));
    }
  );
}
function sI(e, t) {
  return typeof e == "function" ? aI(e) : iI(e, t);
}
var lI = 50,
  Nm = () => ({
    current: 0,
    offset: [],
    progress: 0,
    scrollLength: 0,
    targetOffset: 0,
    targetLength: 0,
    containerLength: 0,
    velocity: 0,
  }),
  cI = () => ({ time: 0, x: Nm(), y: Nm() }),
  uI = { x: { length: "Width", position: "Left" }, y: { length: "Height", position: "Top" } };
function $m(e, t, n, r) {
  let i = n[t],
    { length: o, position: a } = uI[t],
    s = i.current,
    l = n.time;
  ((i.current = e["scroll" + a]),
    (i.scrollLength = e["scroll" + o] - e["client" + o]),
    (i.offset.length = 0),
    (i.offset[0] = 0),
    (i.offset[1] = i.scrollLength),
    (i.progress = Un(0, i.scrollLength, i.current)));
  let c = r - l;
  i.velocity = c > lI ? 0 : Bu(i.current - s, c);
}
function fI(e, t, n) {
  ($m(e, "x", t, n), $m(e, "y", t, n), (t.time = n));
}
function dI(e, t) {
  let n = { x: 0, y: 0 },
    r = e;
  for (; r && r !== t;)
    if (r instanceof HTMLElement)
      ((n.x += r.offsetLeft), (n.y += r.offsetTop), (r = r.offsetParent));
    else if (r.tagName === "svg") {
      let i = r.getBoundingClientRect();
      r = r.parentElement;
      let o = r.getBoundingClientRect();
      ((n.x += i.left - o.left), (n.y += i.top - o.top));
    } else if (r instanceof SVGGraphicsElement) {
      let { x: i, y: o } = r.getBBox();
      ((n.x += i), (n.y += o));
      let a = null,
        s = r.parentNode;
      for (; !a;) (s.tagName === "svg" && (a = s), (s = r.parentNode));
      r = a;
    } else break;
  return n;
}
var hI = {
    Enter: [
      [0, 1],
      [1, 1],
    ],
    Exit: [
      [0, 0],
      [1, 0],
    ],
    Any: [
      [1, 0],
      [0, 1],
    ],
    All: [
      [0, 0],
      [1, 1],
    ],
  },
  yu = { start: 0, center: 0.5, end: 1 };
function Wm(e, t, n = 0) {
  let r = 0;
  if ((yu[e] !== void 0 && (e = yu[e]), typeof e == "string")) {
    let i = parseFloat(e);
    e.endsWith("px")
      ? (r = i)
      : e.endsWith("%")
        ? (e = i / 100)
        : e.endsWith("vw")
          ? (r = (i / 100) * document.documentElement.clientWidth)
          : e.endsWith("vh")
            ? (r = (i / 100) * document.documentElement.clientHeight)
            : (e = i);
  }
  return (typeof e == "number" && (r = t * e), n + r);
}
var pI = [0, 0];
function mI(e, t, n, r) {
  let i = Array.isArray(e) ? e : pI,
    o = 0,
    a = 0;
  return (
    typeof e == "number"
      ? (i = [e, e])
      : typeof e == "string" &&
        ((e = e.trim()), e.includes(" ") ? (i = e.split(" ")) : (i = [e, yu[e] ? e : "0"])),
    (o = Wm(i[0], n, r)),
    (a = Wm(i[1], t)),
    o - a
  );
}
var vI = { x: 0, y: 0 };
function gI(e) {
  return "getBBox" in e && e.tagName !== "svg"
    ? e.getBBox()
    : { width: e.clientWidth, height: e.clientHeight };
}
function yI(e, t, n) {
  let { offset: r = hI.All } = n,
    { target: i = e, axis: o = "y" } = n,
    a = o === "y" ? "height" : "width",
    s = i !== e ? dI(i, e) : vI,
    l = i === e ? { width: e.scrollWidth, height: e.scrollHeight } : gI(i),
    c = { width: e.clientWidth, height: e.clientHeight };
  t[o].offset.length = 0;
  let u = !t[o].interpolate,
    f = r.length;
  for (let d = 0; d < f; d++) {
    let m = mI(r[d], c[a], l[a], s[o]);
    (!u && m !== t[o].interpolatorOffsets[d] && (u = !0), (t[o].offset[d] = m));
  }
  (u &&
    ((t[o].interpolate = yi(t[o].offset, zu(r))), (t[o].interpolatorOffsets = [...t[o].offset])),
    (t[o].progress = t[o].interpolate(t[o].current)));
}
function bI(e, t = e, n) {
  if (((n.x.targetOffset = 0), (n.y.targetOffset = 0), t !== e)) {
    let r = t;
    for (; r && r !== e;)
      ((n.x.targetOffset += r.offsetLeft), (n.y.targetOffset += r.offsetTop), (r = r.offsetParent));
  }
  ((n.x.targetLength = t === e ? t.scrollWidth : t.clientWidth),
    (n.y.targetLength = t === e ? t.scrollHeight : t.clientHeight),
    (n.x.containerLength = e.clientWidth),
    (n.y.containerLength = e.clientHeight));
}
function xI(e, t, n, r = {}) {
  return {
    measure: () => bI(e, r.target, n),
    update: (i) => {
      (fI(e, n, i), (r.offset || r.target) && yI(e, n, r));
    },
    notify: () => t(n),
  };
}
var yo = new WeakMap(),
  Um = new WeakMap(),
  tu = new WeakMap(),
  jm = (e) => (e === document.documentElement ? F : e);
function bi(e, { container: t = document.documentElement, ...n } = {}) {
  let r = tu.get(t);
  r || ((r = new Set()), tu.set(t, r));
  let i = cI(),
    o = xI(t, e, i, n);
  if ((r.add(o), !yo.has(t))) {
    let s = () => {
        for (let d of r) d.measure();
      },
      l = () => {
        for (let d of r) d.update(xe.timestamp);
      },
      c = () => {
        for (let d of r) d.notify();
      },
      u = () => {
        (q.read(s, !1, !0), q.read(l, !1, !0), q.update(c, !1, !0));
      };
    yo.set(t, u);
    let f = jm(t);
    (F.addEventListener("resize", u, { passive: !0 }),
      t !== document.documentElement && Um.set(t, sI(t, u)),
      f.addEventListener("scroll", u, { passive: !0 }));
  }
  let a = yo.get(t);
  return (
    q.read(a, !1, !0),
    () => {
      var s;
      Qe(a);
      let l = tu.get(t);
      if (!l || (l.delete(o), l.size)) return;
      let c = yo.get(t);
      (yo.delete(t),
        c &&
          (jm(t).removeEventListener("scroll", c),
          (s = Um.get(t)) === null || s === void 0 || s(),
          F.removeEventListener("resize", c)));
    }
  );
}
function Xm(e, t) {
  Ao(
    !!(!t || t.current),
    `You have defined a ${e} options but the provided ref is not yet hydrated, probably because it's defined higher up the tree. Try calling useScroll() in the same component as the ref, or setting its \`layoutEffect: false\` option.`
  );
}
var SI = () => ({ scrollX: pe(0), scrollY: pe(0), scrollXProgress: pe(0), scrollYProgress: pe(0) });
function Ag({ container: e, target: t, layoutEffect: n = !0, ...r } = {}) {
  let i = Cn(SI);
  return (
    (n ? Xn : X)(
      () => (
        Xm("target", t),
        Xm("container", e),
        bi(
          ({ x: a, y: s }) => {
            (i.scrollX.set(a.current),
              i.scrollXProgress.set(a.progress),
              i.scrollY.set(s.current),
              i.scrollYProgress.set(s.progress));
          },
          { ...r, container: e?.current || void 0, target: t?.current || void 0 }
        )
      ),
      [e, t, JSON.stringify(r.offset)]
    ),
    i
  );
}
function wI(e) {
  let t = B(0),
    { isStatic: n } = O(Sn);
  X(() => {
    if (n) return;
    let r = ({ timestamp: i, delta: o }) => {
      (t.current || (t.current = i), e(i - t.current, o));
    };
    return (q.update(r, !0), () => Qe(r));
  }, [e]);
}
function Dg() {
  !Ku.current && Uv();
  let [e] = ht(ms.current);
  return e;
}
function Dr() {
  let e = Dg(),
    { reducedMotion: t } = O(Sn);
  return t === "never" ? !1 : t === "always" ? !0 : e;
}
function kI(e) {
  e.values.forEach((t) => t.stop());
}
function Bg() {
  let e = !1,
    t = new Set(),
    n = {
      subscribe(r) {
        return (t.add(r), () => void t.delete(r));
      },
      start(r, i) {
        Ze(
          e,
          "controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook."
        );
        let o = [];
        return (
          t.forEach((a) => {
            o.push(Gu(a, r, { transitionOverride: i }));
          }),
          Promise.all(o)
        );
      },
      set(r) {
        return (
          Ze(
            e,
            "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook."
          ),
          t.forEach((i) => {
            xC(i, r);
          })
        );
      },
      stop() {
        t.forEach((r) => {
          kI(r);
        });
      },
      mount() {
        return (
          (e = !0),
          () => {
            ((e = !1), n.stop());
          }
        );
      },
    };
  return n;
}
var zg = (e, t, n) => {
  let r = t - e;
  return ((((n - e) % r) + r) % r) + e;
};
function CI(e, t) {
  let n,
    r = () => {
      let { currentTime: i } = t,
        a = (i === null ? 0 : i.value) / 100;
      (n !== a && e(a), (n = a));
    };
  return (q.update(r, !0), () => Qe(r));
}
var EI = zv(() => F.ScrollTimeline !== void 0),
  Hg = class {
    constructor(e) {
      this.animations = e.filter(Boolean);
    }
    then(e, t) {
      return Promise.all(this.animations).then(e).catch(t);
    }
    getAll(e) {
      return this.animations[0][e];
    }
    setAll(e, t) {
      for (let n = 0; n < this.animations.length; n++) this.animations[n][e] = t;
    }
    attachTimeline(e) {
      let t = this.animations.map((n) => {
        if (EI() && n.attachTimeline) n.attachTimeline(e);
        else
          return (
            n.pause(),
            CI((r) => {
              n.time = n.duration * r;
            }, e)
          );
      });
      return () => {
        t.forEach((n, r) => {
          (n && n(), this.animations[r].stop());
        });
      };
    }
    get time() {
      return this.getAll("time");
    }
    set time(e) {
      this.setAll("time", e);
    }
    get speed() {
      return this.getAll("speed");
    }
    set speed(e) {
      this.setAll("speed", e);
    }
    get duration() {
      let e = 0;
      for (let t = 0; t < this.animations.length; t++) e = Math.max(e, this.animations[t].duration);
      return e;
    }
    runAll(e) {
      this.animations.forEach((t) => t[e]());
    }
    play() {
      this.runAll("play");
    }
    pause() {
      this.runAll("pause");
    }
    stop() {
      this.runAll("stop");
    }
    cancel() {
      this.runAll("cancel");
    }
    complete() {
      this.runAll("complete");
    }
  };
function TI(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function II(e) {
  let t = {
      presenceContext: null,
      props: {},
      visualState: {
        renderState: { transform: {}, transformOrigin: {}, style: {}, vars: {}, attrs: {} },
        latestValues: {},
      },
    },
    n = vg(e)
      ? new Cg(t, { enableHardwareAcceleration: !1 })
      : new kg(t, { enableHardwareAcceleration: !0 });
  (n.mount(e), jn.set(e, n));
}
function RI(e, t = 100) {
  let n = Do({ keyframes: [0, t], ...e }),
    r = Math.min(au(n), ou);
  return { type: "keyframes", ease: (i) => n.next(r * i).value / t, duration: on(r) };
}
function Gm(e, t, n, r) {
  var i;
  return typeof t == "number"
    ? t
    : t.startsWith("-") || t.startsWith("+")
      ? Math.max(0, e + parseFloat(t))
      : t === "<"
        ? n
        : (i = r.get(t)) !== null && i !== void 0
          ? i
          : e;
}
function PI(e, t) {
  return Tv(e) ? e[zg(0, e.length, t)] : e;
}
function _I(e, t, n) {
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    i.at > t && i.at < n && (Ts(e, i), r--);
  }
}
function FI(e, t, n, r, i, o) {
  _I(e, i, o);
  for (let a = 0; a < t.length; a++) e.push({ value: t[a], at: le(i, o, r[a]), easing: PI(n, a) });
}
function LI(e, t) {
  return e.at === t.at ? (e.value === null ? 1 : t.value === null ? -1 : 0) : e.at - t.at;
}
var MI = "easeInOut";
function OI(e, { defaultTransition: t = {}, ...n } = {}, r) {
  let i = t.duration || 0.3,
    o = new Map(),
    a = new Map(),
    s = {},
    l = new Map(),
    c = 0,
    u = 0,
    f = 0;
  for (let d = 0; d < e.length; d++) {
    let m = e[d];
    if (typeof m == "string") {
      l.set(m, u);
      continue;
    } else if (!Array.isArray(m)) {
      l.set(m.name, Gm(u, m.at, c, l));
      continue;
    }
    let [y, b, S = {}] = m;
    S.at !== void 0 && (u = Gm(u, S.at, c, l));
    let h = 0,
      v = (g, x, k, w = 0, E = 0) => {
        let C = VI(g),
          { delay: I = 0, times: T = zu(C), type: z = "keyframes", ...A } = x,
          { ease: H = t.ease || "easeOut", duration: L } = x,
          M = typeof I == "function" ? I(w, E) : I,
          D = C.length;
        if (D <= 2 && z === "spring") {
          let N = 100;
          if (D === 2 && BI(C)) {
            let Q = C[1] - C[0];
            N = Math.abs(Q);
          }
          let $ = { ...A };
          L !== void 0 && ($.duration = xn(L));
          let ie = RI($, N);
          ((H = ie.ease), (L = ie.duration));
        }
        L ?? (L = i);
        let P = u + M,
          j = P + L;
        T.length === 1 && T[0] === 0 && (T[1] = 1);
        let K = T.length - C.length;
        (K > 0 && Iv(T, K),
          C.length === 1 && C.unshift(null),
          FI(k, C, H, T, P, j),
          (h = Math.max(M + L, h)),
          (f = Math.max(j, f)));
      };
    if (me(y)) {
      let g = Ym(y, a);
      v(b, S, Km("default", g));
    } else {
      let g = Fs(y, r, s),
        x = g.length;
      for (let k = 0; k < x; k++) {
        ((b = b), (S = S));
        let w = g[k],
          E = Ym(w, a);
        for (let C in b) v(b[C], AI(S, C), Km(C, E), k, x);
      }
    }
    ((c = u), (u += h));
  }
  return (
    a.forEach((d, m) => {
      for (let y in d) {
        let b = d[y];
        b.sort(LI);
        let S = [],
          h = [],
          v = [];
        for (let x = 0; x < b.length; x++) {
          let { at: k, value: w, easing: E } = b[x];
          (S.push(w), h.push(Un(0, f, k)), v.push(E || "easeOut"));
        }
        (h[0] !== 0 && (h.unshift(0), S.unshift(S[0]), v.unshift(MI)),
          h[h.length - 1] !== 1 && (h.push(1), S.push(null)),
          o.has(m) || o.set(m, { keyframes: {}, transition: {} }));
        let g = o.get(m);
        ((g.keyframes[y] = S), (g.transition[y] = { ...t, duration: f, ease: v, times: h, ...n }));
      }
    }),
    o
  );
}
function Ym(e, t) {
  return (!t.has(e) && t.set(e, {}), t.get(e));
}
function Km(e, t) {
  return (t[e] || (t[e] = []), t[e]);
}
function VI(e) {
  return Array.isArray(e) ? e : [e];
}
function AI(e, t) {
  return e[t] ? { ...e, ...e[t] } : { ...e };
}
var DI = (e) => typeof e == "number",
  BI = (e) => e.every(DI);
function Ng(e, t, n, r) {
  let i = Fs(e, r),
    o = i.length;
  Ze(!!o, "No valid element provided.");
  let a = [];
  for (let s = 0; s < o; s++) {
    let l = i[s];
    jn.has(l) || II(l);
    let c = jn.get(l),
      u = { ...n };
    (typeof u.delay == "function" && (u.delay = u.delay(s, o)),
      a.push(...Xu(c, { ...t, transition: u }, {})));
  }
  return new Hg(a);
}
var zI = (e) => Array.isArray(e) && Array.isArray(e[0]);
function HI(e, t, n) {
  let r = [];
  return (
    OI(e, t, n).forEach(({ keyframes: o, transition: a }, s) => {
      let l;
      (me(s) ? (l = nf(s, o.default, a.default)) : (l = Ng(s, o, a)), r.push(l));
    }),
    new Hg(r)
  );
}
var $g = (e) => {
    function t(n, r, i) {
      let o;
      return (
        zI(n) ? (o = HI(n, r, e)) : TI(r) ? (o = Ng(n, r, i, e)) : (o = nf(n, r, i)),
        e && e.animations.push(o),
        o
      );
    }
    return t;
  },
  xi = $g();
function Wg() {
  let e = Cn(Bg);
  return (Xn(e.mount, []), e);
}
var Ug = Wg;
var NI = { some: 0, all: 1 };
function jg(e, t, { root: n, margin: r, amount: i = "some" } = {}) {
  let o = Fs(e),
    a = new WeakMap(),
    s = (c) => {
      c.forEach((u) => {
        let f = a.get(u.target);
        if (u.isIntersecting !== !!f)
          if (u.isIntersecting) {
            let d = t(u);
            typeof d == "function" ? a.set(u.target, d) : l.unobserve(u.target);
          } else f && (f(u), a.delete(u.target));
      });
    },
    l = new IntersectionObserver(s, {
      root: n,
      rootMargin: r,
      threshold: typeof i == "number" ? i : NI[i],
    });
  return (o.forEach((c) => l.observe(c)), () => l.disconnect());
}
function $I(e, { root: t, margin: n, amount: r, once: i = !1 } = {}) {
  let [o, a] = ht(!1);
  return (
    X(() => {
      if (!e.current || (i && o)) return;
      let s = () => (a(!0), i ? void 0 : () => a(!1)),
        l = { root: (t && t.current) || void 0, margin: n, amount: r };
      return jg(e.current, s, l);
    }, [t, e, n, i, r]),
    o
  );
}
function af(e) {
  return e !== null && typeof e == "object" && Eu in e;
}
function Xg(e) {
  if (af(e)) return e[Eu];
}
function sf() {
  return WI;
}
function WI(e) {
  Or.current && ((Or.current.isUpdating = !1), Or.current.blockUpdate(), e && e());
}
function Gg() {
  let [e, t] = _s(),
    n = sf(),
    r = B();
  return (
    X(() => {
      q.postRender(() =>
        q.postRender(() => {
          t === r.current && (hs.current = !1);
        })
      );
    }, [t]),
    (i) => {
      n(() => {
        ((hs.current = !0), e(), i(), (r.current = t + 1));
      });
    }
  );
}
function Yg() {
  return ae(() => {
    let t = Or.current;
    t && t.resetTree();
  }, []);
}
var qm = () => ({});
var tB = ws({ scrapeMotionValuesFromProps: qm, createRenderState: qm });
var UI = q,
  jI = bo.reduce((e, t) => ((e[t] = (n) => Qe(n)), e), {});
var T_ = {};
Bc(T_, {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => p_,
  createPortal: () => m_,
  createRoot: () => v_,
  default: () => xh,
  findDOMNode: () => g_,
  flushSync: () => y_,
  hydrate: () => b_,
  hydrateRoot: () => x_,
  render: () => S_,
  unmountComponentAtNode: () => w_,
  unstable_batchedUpdates: () => k_,
  unstable_renderSubtreeIntoContainer: () => C_,
  version: () => E_,
});
var Ds = {};
Bc(Ds, {
  default: () => G,
  unstable_IdlePriority: () => YI,
  unstable_ImmediatePriority: () => KI,
  unstable_LowPriority: () => qI,
  unstable_NormalPriority: () => QI,
  unstable_Profiling: () => ZI,
  unstable_UserBlockingPriority: () => JI,
  unstable_cancelCallback: () => eR,
  unstable_continueExecution: () => tR,
  unstable_forceFrameRate: () => nR,
  unstable_getCurrentPriorityLevel: () => rR,
  unstable_getFirstCallbackNode: () => iR,
  unstable_next: () => oR,
  unstable_now: () => GI,
  unstable_pauseExecution: () => aR,
  unstable_requestPaint: () => sR,
  unstable_runWithPriority: () => lR,
  unstable_scheduleCallback: () => cR,
  unstable_shouldYield: () => uR,
  unstable_wrapCallback: () => fR,
});
var G = {};
function ff(e, t) {
  var n = e.length;
  e.push(t);
  e: for (; 0 < n;) {
    var r = (n - 1) >>> 1,
      i = e[r];
    if (!(0 < Ls(i, t))) break e;
    ((e[r] = t), (e[n] = i), (n = r));
  }
}
function Xt(e) {
  return e.length === 0 ? null : e[0];
}
function Os(e) {
  if (e.length === 0) return null;
  var t = e[0],
    n = e.pop();
  if (n !== t) {
    e[0] = n;
    e: for (var r = 0, i = e.length, o = i >>> 1; r < o;) {
      var a = 2 * (r + 1) - 1,
        s = e[a],
        l = a + 1,
        c = e[l];
      if (0 > Ls(s, n))
        l < i && 0 > Ls(c, s)
          ? ((e[r] = c), (e[l] = n), (r = l))
          : ((e[r] = s), (e[a] = n), (r = a));
      else {
        if (!(l < i && 0 > Ls(c, n))) break e;
        ((e[r] = c), (e[l] = n), (r = l));
      }
    }
  }
  return t;
}
function Ls(e, t) {
  var n = e.sortIndex - t.sortIndex;
  return n !== 0 ? n : e.id - t.id;
}
typeof performance == "object" && typeof performance.now == "function"
  ? ((Kg = performance),
    (G.unstable_now = function () {
      return Kg.now();
    }))
  : ((lf = Date),
    (qg = lf.now()),
    (G.unstable_now = function () {
      return lf.now() - qg;
    }));
var Kg,
  lf,
  qg,
  ln = [],
  Yn = [],
  XI = 1,
  At = null,
  Je = 3,
  Vs = !1,
  Br = !1,
  Ho = !1,
  Jg = typeof setTimeout == "function" ? setTimeout : null,
  ey = typeof clearTimeout == "function" ? clearTimeout : null,
  Qg = typeof setImmediate < "u" ? setImmediate : null;
typeof Ye < "u" &&
  Ye.scheduling !== void 0 &&
  Ye.scheduling.isInputPending !== void 0 &&
  Ye.scheduling.isInputPending.bind(Ye.scheduling);
function df(e) {
  for (var t = Xt(Yn); t !== null;) {
    if (t.callback === null) Os(Yn);
    else {
      if (!(t.startTime <= e)) break;
      (Os(Yn), (t.sortIndex = t.expirationTime), ff(ln, t));
    }
    t = Xt(Yn);
  }
}
function hf(e) {
  if (((Ho = !1), df(e), !Br))
    if (Xt(ln) !== null) ((Br = !0), mf(pf));
    else {
      var t = Xt(Yn);
      t !== null && vf(hf, t.startTime - e);
    }
}
function pf(e, t) {
  ((Br = !1), Ho && ((Ho = !1), ey(No), (No = -1)), (Vs = !0));
  var n = Je;
  try {
    for (df(t), At = Xt(ln); At !== null && (!(At.expirationTime > t) || (e && !ry()));) {
      var r = At.callback;
      if (typeof r == "function") {
        ((At.callback = null), (Je = At.priorityLevel));
        var i = r(At.expirationTime <= t);
        ((t = G.unstable_now()),
          typeof i == "function" ? (At.callback = i) : At === Xt(ln) && Os(ln),
          df(t));
      } else Os(ln);
      At = Xt(ln);
    }
    if (At !== null) var o = !0;
    else {
      var a = Xt(Yn);
      (a !== null && vf(hf, a.startTime - t), (o = !1));
    }
    return o;
  } finally {
    ((At = null), (Je = n), (Vs = !1));
  }
}
var As = !1,
  Ms = null,
  No = -1,
  ty = 5,
  ny = -1;
function ry() {
  return !(G.unstable_now() - ny < ty);
}
function cf() {
  if (Ms !== null) {
    var e = G.unstable_now();
    ny = e;
    var t = !0;
    try {
      t = Ms(!0, e);
    } finally {
      t ? zo() : ((As = !1), (Ms = null));
    }
  } else As = !1;
}
var zo;
typeof Qg == "function"
  ? (zo = function () {
      Qg(cf);
    })
  : typeof MessageChannel < "u"
    ? ((uf = new MessageChannel()),
      (Zg = uf.port2),
      (uf.port1.onmessage = cf),
      (zo = function () {
        Zg.postMessage(null);
      }))
    : (zo = function () {
        Jg(cf, 0);
      });
var uf, Zg;
function mf(e) {
  ((Ms = e), As || ((As = !0), zo()));
}
function vf(e, t) {
  No = Jg(function () {
    e(G.unstable_now());
  }, t);
}
G.unstable_IdlePriority = 5;
G.unstable_ImmediatePriority = 1;
G.unstable_LowPriority = 4;
G.unstable_NormalPriority = 3;
G.unstable_Profiling = null;
G.unstable_UserBlockingPriority = 2;
G.unstable_cancelCallback = function (e) {
  e.callback = null;
};
G.unstable_continueExecution = function () {
  Br || Vs || ((Br = !0), mf(pf));
};
G.unstable_forceFrameRate = function (e) {
  0 > e || 125 < e
    ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      )
    : (ty = 0 < e ? Math.floor(1e3 / e) : 5);
};
G.unstable_getCurrentPriorityLevel = function () {
  return Je;
};
G.unstable_getFirstCallbackNode = function () {
  return Xt(ln);
};
G.unstable_next = function (e) {
  switch (Je) {
    case 1:
    case 2:
    case 3:
      var t = 3;
      break;
    default:
      t = Je;
  }
  var n = Je;
  Je = t;
  try {
    return e();
  } finally {
    Je = n;
  }
};
G.unstable_pauseExecution = function () {};
G.unstable_requestPaint = function () {};
G.unstable_runWithPriority = function (e, t) {
  switch (e) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;
    default:
      e = 3;
  }
  var n = Je;
  Je = e;
  try {
    return t();
  } finally {
    Je = n;
  }
};
G.unstable_scheduleCallback = function (e, t, n) {
  var r = G.unstable_now();
  switch (
    (typeof n == "object" && n !== null
      ? ((n = n.delay), (n = typeof n == "number" && 0 < n ? r + n : r))
      : (n = r),
    e)
  ) {
    case 1:
      var i = -1;
      break;
    case 2:
      i = 250;
      break;
    case 5:
      i = 1073741823;
      break;
    case 4:
      i = 1e4;
      break;
    default:
      i = 5e3;
  }
  return (
    (i = n + i),
    (e = {
      id: XI++,
      callback: t,
      priorityLevel: e,
      startTime: n,
      expirationTime: i,
      sortIndex: -1,
    }),
    n > r
      ? ((e.sortIndex = n),
        ff(Yn, e),
        Xt(ln) === null && e === Xt(Yn) && (Ho ? (ey(No), (No = -1)) : (Ho = !0), vf(hf, n - r)))
      : ((e.sortIndex = i), ff(ln, e), Br || Vs || ((Br = !0), mf(pf))),
    e
  );
};
G.unstable_shouldYield = ry;
G.unstable_wrapCallback = function (e) {
  var t = Je;
  return function () {
    var n = Je;
    Je = t;
    try {
      return e.apply(this, arguments);
    } finally {
      Je = n;
    }
  };
};
var GI = G.unstable_now,
  YI = G.unstable_IdlePriority,
  KI = G.unstable_ImmediatePriority,
  qI = G.unstable_LowPriority,
  QI = G.unstable_NormalPriority,
  ZI = G.unstable_Profiling,
  JI = G.unstable_UserBlockingPriority,
  eR = G.unstable_cancelCallback,
  tR = G.unstable_continueExecution,
  nR = G.unstable_forceFrameRate,
  rR = G.unstable_getCurrentPriorityLevel,
  iR = G.unstable_getFirstCallbackNode,
  oR = G.unstable_next,
  aR = G.unstable_pauseExecution,
  sR = G.unstable_requestPaint,
  lR = G.unstable_runWithPriority,
  cR = G.unstable_scheduleCallback,
  uR = G.unstable_shouldYield,
  fR = G.unstable_wrapCallback;
var dR = "default" in Ke ? p : Ke,
  hR = "default" in Ds ? G : Ds,
  Rt = {},
  u0 = dR,
  It = hR;
function _(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var f0 = new Set(),
  ca = {};
function Qr(e, t) {
  (Ni(e, t), Ni(e + "Capture", t));
}
function Ni(e, t) {
  for (ca[e] = t, e = 0; e < t.length; e++) f0.add(t[e]);
}
var _n = !(typeof F > "u" || typeof F.document > "u" || typeof F.document.createElement > "u"),
  zf = Object.prototype.hasOwnProperty,
  pR =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  iy = {},
  oy = {};
function mR(e) {
  return zf.call(oy, e) ? !0 : zf.call(iy, e) ? !1 : pR.test(e) ? (oy[e] = !0) : ((iy[e] = !0), !1);
}
function vR(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function gR(e, t, n, r) {
  if (t === null || typeof t > "u" || vR(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function lt(e, t, n, r, i, o, a) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = a));
}
var je = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    je[e] = new lt(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  je[t] = new lt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  je[e] = new lt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
  je[e] = new lt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    je[e] = new lt(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  je[e] = new lt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  je[e] = new lt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  je[e] = new lt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  je[e] = new lt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var _d = /[\-:]([a-z])/g;
function Fd(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(_d, Fd);
    je[t] = new lt(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(_d, Fd);
    je[t] = new lt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(_d, Fd);
  je[t] = new lt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  je[e] = new lt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
je.xlinkHref = new lt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (e) {
  je[e] = new lt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ld(e, t, n, r) {
  var i = je.hasOwnProperty(t) ? je[t] : null;
  (i !== null
    ? i.type !== 0
    : r || !(2 < t.length) || (t[0] !== "o" && t[0] !== "O") || (t[1] !== "n" && t[1] !== "N")) &&
    (gR(t, n, i, r) && (n = null),
    r || i === null
      ? mR(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
        ? (e[i.propertyName] = n === null ? i.type !== 3 && "" : n)
        : ((t = i.attributeName),
          (r = i.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((i = i.type),
              (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var On = u0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Bs = Symbol.for("react.element"),
  ki = Symbol.for("react.portal"),
  Ci = Symbol.for("react.fragment"),
  Md = Symbol.for("react.strict_mode"),
  Hf = Symbol.for("react.profiler"),
  d0 = Symbol.for("react.provider"),
  h0 = Symbol.for("react.context"),
  Od = Symbol.for("react.forward_ref"),
  Nf = Symbol.for("react.suspense"),
  $f = Symbol.for("react.suspense_list"),
  Vd = Symbol.for("react.memo"),
  qn = Symbol.for("react.lazy");
Symbol.for("react.scope");
Symbol.for("react.debug_trace_mode");
var p0 = Symbol.for("react.offscreen");
Symbol.for("react.legacy_hidden");
Symbol.for("react.cache");
Symbol.for("react.tracing_marker");
var ay = Symbol.iterator;
function $o(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ay && e[ay]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var gf,
  ye = Object.assign;
function qo(e) {
  if (gf === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      gf = (t && t[1]) || "";
    }
  return (
    `
` +
    gf +
    e
  );
}
var yf = !1;
function bf(e, t) {
  if (!e || yf) return "";
  yf = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (c) {
          var r = c;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (c) {
          r = c;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (
        var i = c.stack.split(`
`),
          o = r.stack.split(`
`),
          a = i.length - 1,
          s = o.length - 1;
        1 <= a && 0 <= s && i[a] !== o[s];
      )
        s--;
      for (; 1 <= a && 0 <= s; a--, s--)
        if (i[a] !== o[s]) {
          if (a !== 1 || s !== 1)
            do
              if ((a--, s--, 0 > s || i[a] !== o[s])) {
                var l =
                  `
` + i[a].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    l.includes("<anonymous>") &&
                    (l = l.replace("<anonymous>", e.displayName)),
                  l
                );
              }
            while (1 <= a && 0 <= s);
          break;
        }
    }
  } finally {
    ((yf = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? qo(e) : "";
}
function yR(e) {
  switch (e.tag) {
    case 5:
      return qo(e.type);
    case 16:
      return qo("Lazy");
    case 13:
      return qo("Suspense");
    case 19:
      return qo("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = bf(e.type, !1)), e);
    case 11:
      return ((e = bf(e.type.render, !1)), e);
    case 1:
      return ((e = bf(e.type, !0)), e);
    default:
      return "";
  }
}
function Wf(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Ci:
      return "Fragment";
    case ki:
      return "Portal";
    case Hf:
      return "Profiler";
    case Md:
      return "StrictMode";
    case Nf:
      return "Suspense";
    case $f:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case h0:
        return (e.displayName || "Context") + ".Consumer";
      case d0:
        return (e._context.displayName || "Context") + ".Provider";
      case Od:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Vd:
        return ((t = e.displayName || null), t !== null ? t : Wf(e.type) || "Memo");
      case qn:
        ((t = e._payload), (e = e._init));
        try {
          return Wf(e(t));
        } catch {}
    }
  return null;
}
function bR(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Wf(t);
    case 8:
      return t === Md ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function ur(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function m0(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function xR(e) {
  var t = m0(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (a) {
          ((r = "" + a), o.call(this, a));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (a) {
          r = "" + a;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function zs(e) {
  e._valueTracker || (e._valueTracker = xR(e));
}
function v0(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = m0(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n && (t.setValue(e), !0)
  );
}
function hl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")) return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Uf(e, t) {
  var n = t.checked;
  return ye({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function sy(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = ur(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null,
    }));
}
function g0(e, t) {
  ((t = t.checked), t != null && Ld(e, "checked", t, !1));
}
function jf(e, t) {
  g0(e, t);
  var n = ur(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? Xf(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Xf(e, t.type, ur(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked));
}
function ly(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!((r !== "submit" && r !== "reset") || (t.value !== void 0 && t.value !== null))) return;
    ((t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n));
}
function Xf(e, t, n) {
  (t === "number" && hl(e.ownerDocument) === e) ||
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Qo = Array.isArray;
function Vi(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      ((i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + ur(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Gf(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(_(91));
  return ye({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function cy(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(_(92));
      if (Qo(n)) {
        if (1 < n.length) throw Error(_(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: ur(n) };
}
function y0(e, t) {
  var n = ur(t.value),
    r = ur(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function uy(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function b0(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Yf(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? b0(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Hs,
  x0 = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (
        Hs = Hs || document.createElement("div"),
          Hs.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Hs.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild;) e.appendChild(t.firstChild);
    }
  });
function ua(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var ea = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  SR = ["Webkit", "ms", "Moz", "O"];
Object.keys(ea).forEach(function (e) {
  SR.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ea[t] = ea[e]));
  });
});
function S0(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (ea.hasOwnProperty(e) && ea[e])
      ? ("" + t).trim()
      : t + "px";
}
function w0(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = S0(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i));
    }
}
var wR = ye(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Kf(e, t) {
  if (t) {
    if (wR[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(_(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(_(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
        throw Error(_(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(_(62));
  }
}
function qf(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Qf = null;
function Ad(e) {
  return (
    (e = e.target || e.srcElement || F),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Zf = null,
  Ai = null,
  Di = null;
function fy(e) {
  if ((e = Ra(e))) {
    if (typeof Zf != "function") throw Error(_(280));
    var t = e.stateNode;
    t && ((t = Nl(t)), Zf(e.stateNode, e.type, t));
  }
}
function k0(e) {
  Ai ? (Di ? Di.push(e) : (Di = [e])) : (Ai = e);
}
function C0() {
  if (Ai) {
    var e = Ai,
      t = Di;
    if (((Di = Ai = null), fy(e), t)) for (e = 0; e < t.length; e++) fy(t[e]);
  }
}
function E0(e, t) {
  return e(t);
}
function T0() {}
var xf = !1;
function I0(e, t, n) {
  if (xf) return e(t, n);
  xf = !0;
  try {
    return E0(e, t, n);
  } finally {
    ((xf = !1), (Ai !== null || Di !== null) && (T0(), C0()));
  }
}
function fa(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Nl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(e === "button" || e === "input" || e === "select" || e === "textarea"))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(_(231, t, typeof n));
  return n;
}
var Jf = !1;
if (_n)
  try {
    ((Si = {}),
      Object.defineProperty(Si, "passive", {
        get: function () {
          Jf = !0;
        },
      }),
      F.addEventListener("test", Si, Si),
      F.removeEventListener("test", Si, Si));
  } catch {
    Jf = !1;
  }
var Si;
function kR(e, t, n, r, i, o, a, s, l) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (u) {
    this.onError(u);
  }
}
var ta = !1,
  pl = null,
  ml = !1,
  ed = null,
  CR = {
    onError: function (e) {
      ((ta = !0), (pl = e));
    },
  };
function ER(e, t, n, r, i, o, a, s, l) {
  ((ta = !1), (pl = null), kR.apply(CR, arguments));
}
function TR(e, t, n, r, i, o, a, s, l) {
  if ((ER.apply(this, arguments), ta)) {
    if (!ta) throw Error(_(198));
    var c = pl;
    ((ta = !1), (pl = null), ml || ((ml = !0), (ed = c)));
  }
}
function Zr(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return;) t = t.return;
  else {
    e = t;
    do ((t = e), 4098 & t.flags && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function R0(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
      return t.dehydrated;
  }
  return null;
}
function dy(e) {
  if (Zr(e) !== e) throw Error(_(188));
}
function IR(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Zr(e)), t === null)) throw Error(_(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ;) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o;) {
        if (o === n) return (dy(i), e);
        if (o === r) return (dy(i), t);
        o = o.sibling;
      }
      throw Error(_(188));
    }
    if (n.return !== r.return) ((n = i), (r = o));
    else {
      for (var a = !1, s = i.child; s;) {
        if (s === n) {
          ((a = !0), (n = i), (r = o));
          break;
        }
        if (s === r) {
          ((a = !0), (r = i), (n = o));
          break;
        }
        s = s.sibling;
      }
      if (!a) {
        for (s = o.child; s;) {
          if (s === n) {
            ((a = !0), (n = o), (r = i));
            break;
          }
          if (s === r) {
            ((a = !0), (r = o), (n = i));
            break;
          }
          s = s.sibling;
        }
        if (!a) throw Error(_(189));
      }
    }
    if (n.alternate !== r) throw Error(_(190));
  }
  if (n.tag !== 3) throw Error(_(188));
  return n.stateNode.current === n ? e : t;
}
function P0(e) {
  return ((e = IR(e)), e !== null ? _0(e) : null);
}
function _0(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null;) {
    var t = _0(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var F0 = It.unstable_scheduleCallback,
  hy = It.unstable_cancelCallback,
  RR = It.unstable_shouldYield,
  PR = It.unstable_requestPaint,
  Ee = It.unstable_now,
  _R = It.unstable_getCurrentPriorityLevel,
  Dd = It.unstable_ImmediatePriority,
  L0 = It.unstable_UserBlockingPriority,
  vl = It.unstable_NormalPriority,
  FR = It.unstable_LowPriority,
  M0 = It.unstable_IdlePriority,
  Dl = null,
  dn = null;
function LR(e) {
  if (dn && typeof dn.onCommitFiberRoot == "function")
    try {
      dn.onCommitFiberRoot(Dl, e, void 0, (128 & e.current.flags) === 128);
    } catch {}
}
var Qt = Math.clz32 ? Math.clz32 : VR,
  MR = Math.log,
  OR = Math.LN2;
function VR(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((MR(e) / OR) | 0)) | 0);
}
var Ns = 64,
  $s = 4194304;
function Zo(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return 4194240 & e;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return 130023424 & e;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function gl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    a = 268435455 & n;
  if (a !== 0) {
    var s = a & ~i;
    s !== 0 ? (r = Zo(s)) : ((o &= a), o !== 0 && (r = Zo(o)));
  } else ((a = n & ~i), a !== 0 ? (r = Zo(a)) : o !== 0 && (r = Zo(o)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (4194240 & o) !== 0))
  )
    return t;
  if ((4 & r && (r |= 16 & n), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t;)
      ((n = 31 - Qt(t)), (i = 1 << n), (r |= e[n]), (t &= ~i));
  return r;
}
function AR(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function DR(e, t) {
  for (
    var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes;
    0 < o;
  ) {
    var a = 31 - Qt(o),
      s = 1 << a,
      l = i[a];
    (l === -1 ? (s & n && !(s & r)) || (i[a] = AR(s, t)) : l <= t && (e.expiredLanes |= s),
      (o &= ~s));
  }
}
function td(e) {
  return ((e = -1073741825 & e.pendingLanes), e !== 0 ? e : 1073741824 & e ? 1073741824 : 0);
}
function O0() {
  var e = Ns;
  return ((Ns <<= 1), !(4194240 & Ns) && (Ns = 64), e);
}
function Sf(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Ta(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Qt(t)),
    (e[t] = n));
}
function BR(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n;) {
    var i = 31 - Qt(n),
      o = 1 << i;
    ((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o));
  }
}
function Bd(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n;) {
    var r = 31 - Qt(n),
      i = 1 << r;
    ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
  }
}
var re = 0;
function V0(e) {
  return ((e &= -e), 1 < e ? (4 < e ? (268435455 & e ? 16 : 536870912) : 4) : 1);
}
var A0,
  zd,
  D0,
  B0,
  z0,
  nd = !1,
  Ws = [],
  nr = null,
  rr = null,
  ir = null,
  da = new Map(),
  ha = new Map(),
  Zn = [],
  zR =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function py(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      nr = null;
      break;
    case "dragenter":
    case "dragleave":
      rr = null;
      break;
    case "mouseover":
    case "mouseout":
      ir = null;
      break;
    case "pointerover":
    case "pointerout":
      da.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ha.delete(t.pointerId);
  }
}
function Wo(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = Ra(t)), t !== null && zd(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function HR(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return ((nr = Wo(nr, e, t, n, r, i)), !0);
    case "dragenter":
      return ((rr = Wo(rr, e, t, n, r, i)), !0);
    case "mouseover":
      return ((ir = Wo(ir, e, t, n, r, i)), !0);
    case "pointerover":
      var o = i.pointerId;
      return (da.set(o, Wo(da.get(o) || null, e, t, n, r, i)), !0);
    case "gotpointercapture":
      return ((o = i.pointerId), ha.set(o, Wo(ha.get(o) || null, e, t, n, r, i)), !0);
  }
  return !1;
}
function H0(e) {
  var t = Nr(e.target);
  if (t !== null) {
    var n = Zr(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = R0(n)), t !== null)) {
          ((e.blockedOn = t),
            z0(e.priority, function () {
              D0(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function rl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length;) {
    var n = rd(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n !== null) return ((t = Ra(n)), t !== null && zd(t), (e.blockedOn = n), !1);
    n = e.nativeEvent;
    var r = new n.constructor(n.type, n);
    ((Qf = r), n.target.dispatchEvent(r), (Qf = null), t.shift());
  }
  return !0;
}
function my(e, t, n) {
  rl(e) && n.delete(t);
}
function NR() {
  ((nd = !1),
    nr !== null && rl(nr) && (nr = null),
    rr !== null && rl(rr) && (rr = null),
    ir !== null && rl(ir) && (ir = null),
    da.forEach(my),
    ha.forEach(my));
}
function Uo(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    nd || ((nd = !0), It.unstable_scheduleCallback(It.unstable_NormalPriority, NR)));
}
function pa(e) {
  function t(i) {
    return Uo(i, e);
  }
  if (0 < Ws.length) {
    Uo(Ws[0], e);
    for (var n = 1; n < Ws.length; n++) {
      var r = Ws[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    nr !== null && Uo(nr, e),
      rr !== null && Uo(rr, e),
      ir !== null && Uo(ir, e),
      da.forEach(t),
      ha.forEach(t),
      n = 0;
    n < Zn.length;
    n++
  )
    ((r = Zn[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < Zn.length && ((n = Zn[0]), n.blockedOn === null);)
    (H0(n), n.blockedOn === null && Zn.shift());
}
var Bi = On.ReactCurrentBatchConfig,
  yl = !0;
function $R(e, t, n, r) {
  var i = re,
    o = Bi.transition;
  Bi.transition = null;
  try {
    ((re = 1), Hd(e, t, n, r));
  } finally {
    ((re = i), (Bi.transition = o));
  }
}
function WR(e, t, n, r) {
  var i = re,
    o = Bi.transition;
  Bi.transition = null;
  try {
    ((re = 4), Hd(e, t, n, r));
  } finally {
    ((re = i), (Bi.transition = o));
  }
}
function Hd(e, t, n, r) {
  if (yl) {
    var i = rd(e, t, n, r);
    if (i === null) (Rf(e, t, r, bl, n), py(e, r));
    else if (HR(i, e, t, n, r)) r.stopPropagation();
    else if ((py(e, r), 4 & t && -1 < zR.indexOf(e))) {
      for (; i !== null;) {
        var o = Ra(i);
        if ((o !== null && A0(o), (o = rd(e, t, n, r)), o === null && Rf(e, t, r, bl, n), o === i))
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else Rf(e, t, r, null, n);
  }
}
var bl = null;
function rd(e, t, n, r) {
  if (((bl = null), (e = Ad(r)), (e = Nr(e)), e !== null))
    if (((t = Zr(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = R0(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((bl = e), null);
}
function N0(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (_R()) {
        case Dd:
          return 1;
        case L0:
          return 4;
        case vl:
        case FR:
          return 16;
        case M0:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var er = null,
  Nd = null,
  il = null;
function $0() {
  if (il) return il;
  var e,
    t,
    n = Nd,
    r = n.length,
    i = "value" in er ? er.value : er.textContent,
    o = i.length;
  for (e = 0; e < r && n[e] === i[e]; e++);
  var a = r - e;
  for (t = 1; t <= a && n[r - t] === i[o - t]; t++);
  return (il = i.slice(e, 1 < t ? 1 - t : void 0));
}
function ol(e) {
  var t = e.keyCode;
  return (
    "charCode" in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Us() {
  return !0;
}
function vy() {
  return !1;
}
function Pt(e) {
  function t(n, r, i, o, a) {
    ((this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = a),
      (this.currentTarget = null));
    for (var s in e) e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(o) : o[s]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Us
        : vy),
      (this.isPropagationStopped = vy),
      this
    );
  }
  return (
    ye(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Us));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Us));
      },
      persist: function () {},
      isPersistent: Us,
    }),
    t
  );
}
var wf,
  kf,
  jo,
  Yi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  $d = Pt(Yi),
  Ia = ye({}, Yi, { view: 0, detail: 0 }),
  UR = Pt(Ia),
  Bl = ye({}, Ia, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Wd,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== jo &&
            (jo && e.type === "mousemove"
              ? ((wf = e.screenX - jo.screenX), (kf = e.screenY - jo.screenY))
              : (kf = wf = 0),
            (jo = e)),
          wf);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : kf;
    },
  }),
  gy = Pt(Bl),
  jR = ye({}, Bl, { dataTransfer: 0 }),
  XR = Pt(jR),
  GR = ye({}, Ia, { relatedTarget: 0 }),
  Cf = Pt(GR),
  YR = ye({}, Yi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  KR = Pt(YR),
  qR = ye({}, Yi, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : F.clipboardData;
    },
  }),
  QR = Pt(qR),
  ZR = ye({}, Yi, { data: 0 }),
  yy = Pt(ZR),
  JR = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  eP = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  tP = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function nP(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : !!(e = tP[e]) && !!t[e];
}
function Wd() {
  return nP;
}
var rP = ye({}, Ia, {
    key: function (e) {
      if (e.key) {
        var t = JR[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = ol(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? eP[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Wd,
    charCode: function (e) {
      return e.type === "keypress" ? ol(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? ol(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  iP = Pt(rP),
  oP = ye({}, Bl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  by = Pt(oP),
  aP = ye({}, Ia, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Wd,
  }),
  sP = Pt(aP),
  lP = ye({}, Yi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  cP = Pt(lP),
  uP = ye({}, Bl, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  fP = Pt(uP),
  dP = [9, 13, 27, 32],
  Ud = _n && "CompositionEvent" in F,
  na = null;
_n && "documentMode" in document && (na = document.documentMode);
var hP = _n && "TextEvent" in F && !na,
  W0 = _n && (!Ud || (na && 8 < na && 11 >= na)),
  xy = String.fromCharCode(32),
  Sy = !1;
function U0(e, t) {
  switch (e) {
    case "keyup":
      return dP.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function j0(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Ei = !1;
function pP(e, t) {
  switch (e) {
    case "compositionend":
      return j0(t);
    case "keypress":
      return t.which !== 32 ? null : ((Sy = !0), xy);
    case "textInput":
      return ((e = t.data), e === xy && Sy ? null : e);
    default:
      return null;
  }
}
function mP(e, t) {
  if (Ei)
    return e === "compositionend" || (!Ud && U0(e, t))
      ? ((e = $0()), (il = Nd = er = null), (Ei = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return W0 && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var vP = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function wy(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!vP[e.type] : t === "textarea";
}
function X0(e, t, n, r) {
  (k0(r),
    (t = xl(t, "onChange")),
    0 < t.length &&
      ((n = new $d("onChange", "change", null, n, r)), e.push({ event: n, listeners: t })));
}
var ra = null,
  ma = null;
function gP(e) {
  rb(e, 0);
}
function zl(e) {
  var t = Ri(e);
  if (v0(t)) return e;
}
function yP(e, t) {
  if (e === "change") return t;
}
var G0 = !1;
_n &&
  (_n
    ? ((Xs = "oninput" in document),
      Xs ||
        ((Ef = document.createElement("div")),
        Ef.setAttribute("oninput", "return;"),
        (Xs = typeof Ef.oninput == "function")),
      (js = Xs))
    : (js = !1),
  (G0 = js && (!document.documentMode || 9 < document.documentMode)));
var js, Xs, Ef;
function ky() {
  ra && (ra.detachEvent("onpropertychange", Y0), (ma = ra = null));
}
function Y0(e) {
  if (e.propertyName === "value" && zl(ma)) {
    var t = [];
    (X0(t, ma, e, Ad(e)), I0(gP, t));
  }
}
function bP(e, t, n) {
  e === "focusin"
    ? (ky(), (ra = t), (ma = n), ra.attachEvent("onpropertychange", Y0))
    : e === "focusout" && ky();
}
function xP(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return zl(ma);
}
function SP(e, t) {
  if (e === "click") return zl(t);
}
function wP(e, t) {
  if (e === "input" || e === "change") return zl(t);
}
function kP(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Jt = typeof Object.is == "function" ? Object.is : kP;
function va(e, t) {
  if (Jt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!zf.call(t, i) || !Jt(e[i], t[i])) return !1;
  }
  return !0;
}
function Cy(e) {
  for (; e && e.firstChild;) e = e.firstChild;
  return e;
}
function Ey(e, t) {
  var n = Cy(e);
  e = 0;
  for (var r; n;) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n;) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Cy(n);
  }
}
function K0(e, t) {
  return (
    !(!e || !t) &&
    (e === t ||
      ((!e || e.nodeType !== 3) &&
        (t && t.nodeType === 3
          ? K0(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t)))))
  );
}
function q0() {
  for (var e = F, t = hl(); t instanceof e.HTMLIFrameElement;) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (!n) break;
    ((e = t.contentWindow), (t = hl(e.document)));
  }
  return t;
}
function jd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function CP(e) {
  var t = q0(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && K0(n.ownerDocument.documentElement, n)) {
    if (r !== null && jd(n)) {
      if (((t = r.start), (e = r.end), e === void 0 && (e = t), "selectionStart" in n))
        ((n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length)));
      else if (((e = ((t = n.ownerDocument || document) && t.defaultView) || F), e.getSelection)) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        ((r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = Ey(n, o)));
        var a = Ey(n, r);
        i &&
          a &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== a.node ||
            e.focusOffset !== a.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(a.node, a.offset))
            : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode);)
      e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top));
  }
}
var EP = _n && "documentMode" in document && 11 >= document.documentMode,
  Ti = null,
  id = null,
  ia = null,
  od = !1;
function Ty(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  od ||
    Ti == null ||
    Ti !== hl(r) ||
    ((r = Ti),
    "selectionStart" in r && jd(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || F).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (ia && va(ia, r)) ||
      ((ia = r),
      (r = xl(id, "onSelect")),
      0 < r.length &&
        ((t = new $d("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Ti))));
}
function Gs(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Ii = {
    animationend: Gs("Animation", "AnimationEnd"),
    animationiteration: Gs("Animation", "AnimationIteration"),
    animationstart: Gs("Animation", "AnimationStart"),
    transitionend: Gs("Transition", "TransitionEnd"),
  },
  Tf = {},
  Q0 = {};
_n &&
  ((Q0 = document.createElement("div").style),
  "AnimationEvent" in F ||
    (delete Ii.animationend.animation,
    delete Ii.animationiteration.animation,
    delete Ii.animationstart.animation),
  "TransitionEvent" in F || delete Ii.transitionend.transition);
function Hl(e) {
  if (Tf[e]) return Tf[e];
  if (!Ii[e]) return e;
  var t,
    n = Ii[e];
  for (t in n) if (n.hasOwnProperty(t) && t in Q0) return (Tf[e] = n[t]);
  return e;
}
var Z0 = Hl("animationend"),
  J0 = Hl("animationiteration"),
  eb = Hl("animationstart"),
  tb = Hl("transitionend"),
  nb = new Map(),
  Iy =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function dr(e, t) {
  (nb.set(e, t), Qr(t, [e]));
}
for (Ys = 0; Ys < Iy.length; Ys++)
  ((Ks = Iy[Ys]),
    (Ry = Ks.toLowerCase()),
    (Py = Ks[0].toUpperCase() + Ks.slice(1)),
    dr(Ry, "on" + Py));
var Ks, Ry, Py, Ys;
dr(Z0, "onAnimationEnd");
dr(J0, "onAnimationIteration");
dr(eb, "onAnimationStart");
dr("dblclick", "onDoubleClick");
dr("focusin", "onFocus");
dr("focusout", "onBlur");
dr(tb, "onTransitionEnd");
Ni("onMouseEnter", ["mouseout", "mouseover"]);
Ni("onMouseLeave", ["mouseout", "mouseover"]);
Ni("onPointerEnter", ["pointerout", "pointerover"]);
Ni("onPointerLeave", ["pointerout", "pointerover"]);
Qr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Qr(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")
);
Qr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Qr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Qr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Qr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Jo =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  TP = new Set("cancel close invalid load scroll toggle".split(" ").concat(Jo));
function _y(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), TR(r, t, void 0, e), (e.currentTarget = null));
}
function rb(e, t) {
  t = (4 & t) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var a = r.length - 1; 0 <= a; a--) {
          var s = r[a],
            l = s.instance,
            c = s.currentTarget;
          if (((s = s.listener), l !== o && i.isPropagationStopped())) break e;
          (_y(i, s, c), (o = l));
        }
      else
        for (a = 0; a < r.length; a++) {
          if (
            ((s = r[a]),
            (l = s.instance),
            (c = s.currentTarget),
            (s = s.listener),
            l !== o && i.isPropagationStopped())
          )
            break e;
          (_y(i, s, c), (o = l));
        }
    }
  }
  if (ml) throw ((e = ed), (ml = !1), (ed = null), e);
}
function ce(e, t) {
  var n = t[ud];
  n === void 0 && (n = t[ud] = new Set());
  var r = e + "__bubble";
  n.has(r) || (ib(t, e, 2, !1), n.add(r));
}
function If(e, t, n) {
  var r = 0;
  (t && (r |= 4), ib(n, e, r, t));
}
var qs = "_reactListening" + Math.random().toString(36).slice(2);
function ga(e) {
  if (!e[qs]) {
    ((e[qs] = !0),
      f0.forEach(function (n) {
        n !== "selectionchange" && (TP.has(n) || If(n, !1, e), If(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[qs] || ((t[qs] = !0), If("selectionchange", !1, t));
  }
}
function ib(e, t, n, r) {
  switch (N0(t)) {
    case 1:
      var i = $R;
      break;
    case 4:
      i = WR;
      break;
    default:
      i = Hd;
  }
  ((n = i.bind(null, t, n, e)),
    (i = void 0),
    !Jf || (t !== "touchstart" && t !== "touchmove" && t !== "wheel") || (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
        ? e.addEventListener(t, n, { passive: i })
        : e.addEventListener(t, n, !1));
}
function Rf(e, t, n, r, i) {
  var o = r;
  if (!(1 & t) && !(2 & t) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var a = r.tag;
      if (a === 3 || a === 4) {
        var s = r.stateNode.containerInfo;
        if (s === i || (s.nodeType === 8 && s.parentNode === i)) break;
        if (a === 4)
          for (a = r.return; a !== null;) {
            var l = a.tag;
            if (
              (l === 3 || l === 4) &&
              ((l = a.stateNode.containerInfo), l === i || (l.nodeType === 8 && l.parentNode === i))
            )
              return;
            a = a.return;
          }
        for (; s !== null;) {
          if (((a = Nr(s)), a === null)) return;
          if (((l = a.tag), l === 5 || l === 6)) {
            r = o = a;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  I0(function () {
    var c = o,
      u = Ad(n),
      f = [];
    e: {
      var d = nb.get(e);
      if (d !== void 0) {
        var m = $d,
          y = e;
        switch (e) {
          case "keypress":
            if (ol(n) === 0) break e;
          case "keydown":
          case "keyup":
            m = iP;
            break;
          case "focusin":
            ((y = "focus"), (m = Cf));
            break;
          case "focusout":
            ((y = "blur"), (m = Cf));
            break;
          case "beforeblur":
          case "afterblur":
            m = Cf;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            m = gy;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = XR;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = sP;
            break;
          case Z0:
          case J0:
          case eb:
            m = KR;
            break;
          case tb:
            m = cP;
            break;
          case "scroll":
            m = UR;
            break;
          case "wheel":
            m = fP;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = QR;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = by;
        }
        var b = (4 & t) !== 0,
          S = !b && e === "scroll",
          h = b ? (d !== null ? d + "Capture" : null) : d;
        b = [];
        for (var v, g = c; g !== null;) {
          v = g;
          var x = v.stateNode;
          if (
            (v.tag === 5 &&
              x !== null &&
              ((v = x), h !== null && ((x = fa(g, h)), x != null && b.push(ya(g, x, v)))),
            S)
          )
            break;
          g = g.return;
        }
        0 < b.length && ((d = new m(d, y, null, n, u)), f.push({ event: d, listeners: b }));
      }
    }
    if (!(7 & t)) {
      if (
        ((d = e === "mouseover" || e === "pointerover"),
        (m = e === "mouseout" || e === "pointerout"),
        (!d || n === Qf || !(y = n.relatedTarget || n.fromElement) || (!Nr(y) && !y[Fn])) &&
          (m || d) &&
          ((d = u.window === u ? u : (d = u.ownerDocument) ? d.defaultView || d.parentWindow : F),
          m
            ? ((y = n.relatedTarget || n.toElement),
              (m = c),
              (y = y ? Nr(y) : null),
              y !== null && ((S = Zr(y)), y !== S || (y.tag !== 5 && y.tag !== 6)) && (y = null))
            : ((m = null), (y = c)),
          m !== y))
      ) {
        if (
          ((b = gy),
          (x = "onMouseLeave"),
          (h = "onMouseEnter"),
          (g = "mouse"),
          (e !== "pointerout" && e !== "pointerover") ||
            ((b = by), (x = "onPointerLeave"), (h = "onPointerEnter"), (g = "pointer")),
          (S = m == null ? d : Ri(m)),
          (v = y == null ? d : Ri(y)),
          (d = new b(x, g + "leave", m, n, u)),
          (d.target = S),
          (d.relatedTarget = v),
          (x = null),
          Nr(u) === c &&
            ((b = new b(h, g + "enter", y, n, u)), (b.target = v), (b.relatedTarget = S), (x = b)),
          (S = x),
          m && y)
        )
          e: {
            for (b = m, h = y, g = 0, v = b; v; v = wi(v)) g++;
            for (v = 0, x = h; x; x = wi(x)) v++;
            for (; 0 < g - v;) ((b = wi(b)), g--);
            for (; 0 < v - g;) ((h = wi(h)), v--);
            for (; g--;) {
              if (b === h || (h !== null && b === h.alternate)) break e;
              ((b = wi(b)), (h = wi(h)));
            }
            b = null;
          }
        else b = null;
        (m !== null && Fy(f, d, m, b, !1), y !== null && S !== null && Fy(f, S, y, b, !0));
      }
      if (
        ((d = c ? Ri(c) : F),
        (m = d.nodeName && d.nodeName.toLowerCase()),
        m === "select" || (m === "input" && d.type === "file"))
      )
        var k = yP;
      else if (wy(d))
        if (G0) k = wP;
        else {
          k = xP;
          var w = bP;
        }
      else
        (m = d.nodeName) &&
          m.toLowerCase() === "input" &&
          (d.type === "checkbox" || d.type === "radio") &&
          (k = SP);
      switch (
        (k && (k = k(e, c))
          ? X0(f, k, n, u)
          : (w && w(e, d, c),
            e === "focusout" &&
              (w = d._wrapperState) &&
              w.controlled &&
              d.type === "number" &&
              Xf(d, "number", d.value)),
        (w = c ? Ri(c) : F),
        e)
      ) {
        case "focusin":
          (wy(w) || w.contentEditable === "true") && ((Ti = w), (id = c), (ia = null));
          break;
        case "focusout":
          ia = id = Ti = null;
          break;
        case "mousedown":
          od = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((od = !1), Ty(f, n, u));
          break;
        case "selectionchange":
          if (EP) break;
        case "keydown":
        case "keyup":
          Ty(f, n, u);
      }
      var E;
      if (Ud)
        e: {
          switch (e) {
            case "compositionstart":
              var C = "onCompositionStart";
              break e;
            case "compositionend":
              C = "onCompositionEnd";
              break e;
            case "compositionupdate":
              C = "onCompositionUpdate";
              break e;
          }
          C = void 0;
        }
      else
        Ei
          ? U0(e, n) && (C = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      (C &&
        (W0 &&
          n.locale !== "ko" &&
          (Ei || C !== "onCompositionStart"
            ? C === "onCompositionEnd" && Ei && (E = $0())
            : ((er = u), (Nd = "value" in er ? er.value : er.textContent), (Ei = !0))),
        (w = xl(c, C)),
        0 < w.length &&
          ((C = new yy(C, e, null, n, u)),
          f.push({ event: C, listeners: w }),
          E ? (C.data = E) : ((E = j0(n)), E !== null && (C.data = E)))),
        (E = hP ? pP(e, n) : mP(e, n)) &&
          ((c = xl(c, "onBeforeInput")),
          0 < c.length &&
            ((u = new yy("onBeforeInput", "beforeinput", null, n, u)),
            f.push({ event: u, listeners: c }),
            (u.data = E))));
    }
    rb(f, t);
  });
}
function ya(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function xl(e, t) {
  for (var n = t + "Capture", r = []; e !== null;) {
    var i = e,
      o = i.stateNode;
    (i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = fa(e, n)),
      o != null && r.unshift(ya(e, o, i)),
      (o = fa(e, t)),
      o != null && r.push(ya(e, o, i))),
      (e = e.return));
  }
  return r;
}
function wi(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Fy(e, t, n, r, i) {
  for (var o = t._reactName, a = []; n !== null && n !== r;) {
    var s = n,
      l = s.alternate,
      c = s.stateNode;
    if (l !== null && l === r) break;
    (s.tag === 5 &&
      c !== null &&
      ((s = c),
      i
        ? ((l = fa(n, o)), l != null && a.unshift(ya(n, l, s)))
        : i || ((l = fa(n, o)), l != null && a.push(ya(n, l, s)))),
      (n = n.return));
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var IP = /\r\n?/g,
  RP = /\u0000|\uFFFD/g;
function Ly(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      IP,
      `
`
    )
    .replace(RP, "");
}
function Qs(e, t, n) {
  if (((t = Ly(t)), Ly(e) !== t && n)) throw Error(_(425));
}
function Sl() {}
var ad = null,
  sd = null;
function ld(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var cd = typeof setTimeout == "function" ? setTimeout : void 0,
  PP = typeof clearTimeout == "function" ? clearTimeout : void 0,
  My = typeof Promise == "function" ? Promise : void 0,
  _P =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof My < "u"
        ? function (e) {
            return My.resolve(null).then(e).catch(FP);
          }
        : cd;
function FP(e) {
  setTimeout(function () {
    throw e;
  });
}
function Pf(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(i), pa(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  pa(t);
}
function or(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Oy(e) {
  e = e.previousSibling;
  for (var t = 0; e;) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Ki = Math.random().toString(36).slice(2),
  fn = "__reactFiber$" + Ki,
  ba = "__reactProps$" + Ki,
  Fn = "__reactContainer$" + Ki,
  ud = "__reactEvents$" + Ki,
  LP = "__reactListeners$" + Ki,
  MP = "__reactHandles$" + Ki;
function Nr(e) {
  var t = e[fn];
  if (t) return t;
  for (var n = e.parentNode; n;) {
    if ((t = n[Fn] || n[fn])) {
      if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
        for (e = Oy(e); e !== null;) {
          if ((n = e[fn])) return n;
          e = Oy(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function Ra(e) {
  return (
    (e = e[fn] || e[Fn]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Ri(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(_(33));
}
function Nl(e) {
  return e[ba] || null;
}
var fd = [],
  Pi = -1;
function hr(e) {
  return { current: e };
}
function ue(e) {
  0 > Pi || ((e.current = fd[Pi]), (fd[Pi] = null), Pi--);
}
function oe(e, t) {
  (Pi++, (fd[Pi] = e.current), (e.current = t));
}
var fr = {},
  rt = hr(fr),
  yt = hr(!1),
  Xr = fr;
function $i(e, t) {
  var n = e.type.contextTypes;
  if (!n) return fr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i,
    o = {};
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function bt(e) {
  return ((e = e.childContextTypes), e != null);
}
function wl() {
  (ue(yt), ue(rt));
}
function Vy(e, t, n) {
  if (rt.current !== fr) throw Error(_(168));
  (oe(rt, t), oe(yt, n));
}
function ob(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function")) return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(_(108, bR(e) || "Unknown", i));
  return ye({}, n, r);
}
function kl(e) {
  return (
    (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || fr),
    (Xr = rt.current),
    oe(rt, e),
    oe(yt, yt.current),
    !0
  );
}
function Ay(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(_(169));
  (n
    ? ((e = ob(e, t, Xr)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      ue(yt),
      ue(rt),
      oe(rt, e))
    : ue(yt),
    oe(yt, n));
}
var Tn = null,
  $l = !1,
  _f = !1;
function ab(e) {
  Tn === null ? (Tn = [e]) : Tn.push(e);
}
function OP(e) {
  (($l = !0), ab(e));
}
function pr() {
  if (!_f && Tn !== null) {
    _f = !0;
    var e = 0,
      t = re;
    try {
      var n = Tn;
      for (re = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((Tn = null), ($l = !1));
    } catch (i) {
      throw (Tn !== null && (Tn = Tn.slice(e + 1)), F0(Dd, pr), i);
    } finally {
      ((re = t), (_f = !1));
    }
  }
  return null;
}
var _i = [],
  Fi = 0,
  Cl = null,
  El = 0,
  Dt = [],
  Bt = 0,
  Gr = null,
  In = 1,
  Rn = "";
function zr(e, t) {
  ((_i[Fi++] = El), (_i[Fi++] = Cl), (Cl = e), (El = t));
}
function sb(e, t, n) {
  ((Dt[Bt++] = In), (Dt[Bt++] = Rn), (Dt[Bt++] = Gr), (Gr = e));
  var r = In;
  e = Rn;
  var i = 32 - Qt(r) - 1;
  ((r &= ~(1 << i)), (n += 1));
  var o = 32 - Qt(t) + i;
  if (30 < o) {
    var a = i - (i % 5);
    ((o = (r & ((1 << a) - 1)).toString(32)),
      (r >>= a),
      (i -= a),
      (In = (1 << (32 - Qt(t) + i)) | (n << i) | r),
      (Rn = o + e));
  } else ((In = (1 << o) | (n << i) | r), (Rn = e));
}
function Xd(e) {
  e.return !== null && (zr(e, 1), sb(e, 1, 0));
}
function Gd(e) {
  for (; e === Cl;) ((Cl = _i[--Fi]), (_i[Fi] = null), (El = _i[--Fi]), (_i[Fi] = null));
  for (; e === Gr;)
    ((Gr = Dt[--Bt]),
      (Dt[Bt] = null),
      (Rn = Dt[--Bt]),
      (Dt[Bt] = null),
      (In = Dt[--Bt]),
      (Dt[Bt] = null));
}
var Tt = null,
  Et = null,
  de = !1,
  qt = null;
function lb(e, t) {
  var n = zt(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function Dy(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
        t !== null && ((e.stateNode = t), (Tt = e), (Et = or(t.firstChild)), !0)
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null && ((e.stateNode = t), (Tt = e), (Et = null), !0)
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null &&
          ((n = Gr !== null ? { id: In, overflow: Rn } : null),
          (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
          (n = zt(18, null, null, 0)),
          (n.stateNode = t),
          (n.return = e),
          (e.child = n),
          (Tt = e),
          (Et = null),
          !0)
      );
    default:
      return !1;
  }
}
function dd(e) {
  return (1 & e.mode) !== 0 && (128 & e.flags) === 0;
}
function hd(e) {
  if (de) {
    var t = Et;
    if (t) {
      var n = t;
      if (!Dy(e, t)) {
        if (dd(e)) throw Error(_(418));
        t = or(n.nextSibling);
        var r = Tt;
        t && Dy(e, t) ? lb(r, n) : ((e.flags = (-4097 & e.flags) | 2), (de = !1), (Tt = e));
      }
    } else {
      if (dd(e)) throw Error(_(418));
      ((e.flags = (-4097 & e.flags) | 2), (de = !1), (Tt = e));
    }
  }
}
function By(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
  Tt = e;
}
function Zs(e) {
  if (e !== Tt) return !1;
  if (!de) return (By(e), (de = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type), (t = t !== "head" && t !== "body" && !ld(e.type, e.memoizedProps))),
    t && (t = Et))
  ) {
    if (dd(e)) throw (cb(), Error(_(418)));
    for (; t;) (lb(e, t), (t = or(t.nextSibling)));
  }
  if ((By(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(_(317));
    e: {
      for (e = e.nextSibling, t = 0; e;) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Et = or(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Et = null;
    }
  } else Et = Tt ? or(e.stateNode.nextSibling) : null;
  return !0;
}
function cb() {
  for (var e = Et; e;) e = or(e.nextSibling);
}
function Wi() {
  ((Et = Tt = null), (de = !1));
}
function Yd(e) {
  qt === null ? (qt = [e]) : qt.push(e);
}
var VP = On.ReactCurrentBatchConfig;
function Yt(e, t) {
  if (e && e.defaultProps) {
    ((t = ye({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var Tl = hr(null),
  Il = null,
  Li = null,
  Kd = null;
function qd() {
  Kd = Li = Il = null;
}
function Qd(e) {
  var t = Tl.current;
  (ue(Tl), (e._currentValue = t));
}
function pd(e, t, n) {
  for (; e !== null;) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function zi(e, t) {
  ((Il = e),
    (Kd = Li = null),
    (e = e.dependencies),
    e !== null && e.firstContext !== null && (e.lanes & t && (gt = !0), (e.firstContext = null)));
}
function Nt(e) {
  var t = e._currentValue;
  if (Kd !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Li === null)) {
      if (Il === null) throw Error(_(308));
      ((Li = e), (Il.dependencies = { lanes: 0, firstContext: e }));
    } else Li = Li.next = e;
  return t;
}
var $r = null;
function Zd(e) {
  $r === null ? ($r = [e]) : $r.push(e);
}
function ub(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), Zd(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Ln(e, r)
  );
}
function Ln(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;)
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var Qn = !1;
function Jd(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function fb(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function Pn(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ar(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), 2 & ee)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      Ln(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), Zd(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Ln(e, n)
  );
}
function al(e, t, n) {
  if (((t = t.updateQueue), t !== null && ((t = t.shared), (4194240 & n) !== 0))) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Bd(e, n));
  }
}
function zy(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r === null || ((r = r.updateQueue), n !== r))
    ((e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t));
  else {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var a = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (o === null ? (i = o = a) : (o = o.next = a), (n = n.next));
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
  }
}
function Rl(e, t, n, r) {
  var i = e.updateQueue;
  Qn = !1;
  var o = i.firstBaseUpdate,
    a = i.lastBaseUpdate,
    s = i.shared.pending;
  if (s !== null) {
    i.shared.pending = null;
    var l = s,
      c = l.next;
    ((l.next = null), a === null ? (o = c) : (a.next = c), (a = l));
    var u = e.alternate;
    u !== null &&
      ((u = u.updateQueue),
      (s = u.lastBaseUpdate),
      s !== a && (s === null ? (u.firstBaseUpdate = c) : (s.next = c), (u.lastBaseUpdate = l)));
  }
  if (o !== null) {
    var f = i.baseState;
    ((a = 0), (u = c = l = null), (s = o));
    do {
      var d = s.lane,
        m = s.eventTime;
      if ((r & d) === d) {
        u !== null &&
          (u = u.next =
            {
              eventTime: m,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var y = e,
            b = s;
          switch (((d = t), (m = n), b.tag)) {
            case 1:
              if (((y = b.payload), typeof y == "function")) {
                f = y.call(m, f, d);
                break e;
              }
              f = y;
              break e;
            case 3:
              y.flags = (-65537 & y.flags) | 128;
            case 0:
              if (((y = b.payload), (d = typeof y == "function" ? y.call(m, f, d) : y), d == null))
                break e;
              f = ye({}, f, d);
              break e;
            case 2:
              Qn = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64), (d = i.effects), d === null ? (i.effects = [s]) : d.push(s));
      } else
        ((m = {
          eventTime: m,
          lane: d,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          u === null ? ((c = u = m), (l = f)) : (u = u.next = m),
          (a |= d));
      if (((s = s.next), s === null)) {
        if (((s = i.shared.pending), s === null)) break;
        ((d = s), (s = d.next), (d.next = null), (i.lastBaseUpdate = d), (i.shared.pending = null));
      }
    } while (1);
    if (
      (u === null && (l = f),
      (i.baseState = l),
      (i.firstBaseUpdate = c),
      (i.lastBaseUpdate = u),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do ((a |= i.lane), (i = i.next));
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    ((Kr |= a), (e.lanes = a), (e.memoizedState = f));
  }
}
function Hy(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function")) throw Error(_(191, i));
        i.call(r);
      }
    }
}
var db = new u0.Component().refs;
function md(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : ye({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Wl = {
  isMounted: function (e) {
    return !!(e = e._reactInternals) && Zr(e) === e;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = st(),
      i = lr(e),
      o = Pn(r, i);
    ((o.payload = t),
      n != null && (o.callback = n),
      (t = ar(e, o, i)),
      t !== null && (Zt(t, e, i, r), al(t, e, i)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = st(),
      i = lr(e),
      o = Pn(r, i);
    ((o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = ar(e, o, i)),
      t !== null && (Zt(t, e, i, r), al(t, e, i)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = st(),
      r = lr(e),
      i = Pn(n, r);
    ((i.tag = 2),
      t != null && (i.callback = t),
      (t = ar(e, i, r)),
      t !== null && (Zt(t, e, r, n), al(t, e, r)));
  },
};
function Ny(e, t, n, r, i, o, a) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, a)
      : !t.prototype || !t.prototype.isPureReactComponent || !va(n, r) || !va(i, o)
  );
}
function hb(e, t, n) {
  var r = !1,
    i = fr,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = Nt(o))
      : ((i = bt(t) ? Xr : rt.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? $i(e, i) : fr)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Wl),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function $y(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Wl.enqueueReplaceState(t, t.state, null));
}
function vd(e, t, n, r) {
  var i = e.stateNode;
  ((i.props = n), (i.state = e.memoizedState), (i.refs = db), Jd(e));
  var o = t.contextType;
  (typeof o == "object" && o !== null
    ? (i.context = Nt(o))
    : ((o = bt(t) ? Xr : rt.current), (i.context = $i(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (md(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(),
      t !== i.state && Wl.enqueueReplaceState(i, i.state, null),
      Rl(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308));
}
function Xo(e, t, n) {
  if (((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(_(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(_(147, e));
      var i = r,
        o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o
        ? t.ref
        : ((t = function (a) {
            var s = i.refs;
            (s === db && (s = i.refs = {}), a === null ? delete s[o] : (s[o] = a));
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(_(284));
    if (!n._owner) throw Error(_(290, e));
  }
  return e;
}
function Js(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      _(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)
    )
  );
}
function Wy(e) {
  var t = e._init;
  return t(e._payload);
}
function pb(e) {
  function t(h, v) {
    if (e) {
      var g = h.deletions;
      g === null ? ((h.deletions = [v]), (h.flags |= 16)) : g.push(v);
    }
  }
  function n(h, v) {
    if (!e) return null;
    for (; v !== null;) (t(h, v), (v = v.sibling));
    return null;
  }
  function r(h, v) {
    for (h = new Map(); v !== null;)
      (v.key !== null ? h.set(v.key, v) : h.set(v.index, v), (v = v.sibling));
    return h;
  }
  function i(h, v) {
    return ((h = cr(h, v)), (h.index = 0), (h.sibling = null), h);
  }
  function o(h, v, g) {
    return (
      (h.index = g),
      e
        ? ((g = h.alternate),
          g !== null ? ((g = g.index), g < v ? ((h.flags |= 2), v) : g) : ((h.flags |= 2), v))
        : ((h.flags |= 1048576), v)
    );
  }
  function a(h) {
    return (e && h.alternate === null && (h.flags |= 2), h);
  }
  function s(h, v, g, x) {
    return v === null || v.tag !== 6
      ? ((v = Df(g, h.mode, x)), (v.return = h), v)
      : ((v = i(v, g)), (v.return = h), v);
  }
  function l(h, v, g, x) {
    var k = g.type;
    return k === Ci
      ? u(h, v, g.props.children, x, g.key)
      : v !== null &&
          (v.elementType === k ||
            (typeof k == "object" && k !== null && k.$$typeof === qn && Wy(k) === v.type))
        ? ((x = i(v, g.props)), (x.ref = Xo(h, v, g)), (x.return = h), x)
        : ((x = dl(g.type, g.key, g.props, null, h.mode, x)),
          (x.ref = Xo(h, v, g)),
          (x.return = h),
          x);
  }
  function c(h, v, g, x) {
    return v === null ||
      v.tag !== 4 ||
      v.stateNode.containerInfo !== g.containerInfo ||
      v.stateNode.implementation !== g.implementation
      ? ((v = Bf(g, h.mode, x)), (v.return = h), v)
      : ((v = i(v, g.children || [])), (v.return = h), v);
  }
  function u(h, v, g, x, k) {
    return v === null || v.tag !== 7
      ? ((v = jr(g, h.mode, x, k)), (v.return = h), v)
      : ((v = i(v, g)), (v.return = h), v);
  }
  function f(h, v, g) {
    if ((typeof v == "string" && v !== "") || typeof v == "number")
      return ((v = Df("" + v, h.mode, g)), (v.return = h), v);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Bs:
          return (
            (g = dl(v.type, v.key, v.props, null, h.mode, g)),
            (g.ref = Xo(h, null, v)),
            (g.return = h),
            g
          );
        case ki:
          return ((v = Bf(v, h.mode, g)), (v.return = h), v);
        case qn:
          var x = v._init;
          return f(h, x(v._payload), g);
      }
      if (Qo(v) || $o(v)) return ((v = jr(v, h.mode, g, null)), (v.return = h), v);
      Js(h, v);
    }
    return null;
  }
  function d(h, v, g, x) {
    var k = v !== null ? v.key : null;
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return k !== null ? null : s(h, v, "" + g, x);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Bs:
          return g.key === k ? l(h, v, g, x) : null;
        case ki:
          return g.key === k ? c(h, v, g, x) : null;
        case qn:
          return ((k = g._init), d(h, v, k(g._payload), x));
      }
      if (Qo(g) || $o(g)) return k !== null ? null : u(h, v, g, x, null);
      Js(h, g);
    }
    return null;
  }
  function m(h, v, g, x, k) {
    if ((typeof x == "string" && x !== "") || typeof x == "number")
      return ((h = h.get(g) || null), s(v, h, "" + x, k));
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Bs:
          return ((h = h.get(x.key === null ? g : x.key) || null), l(v, h, x, k));
        case ki:
          return ((h = h.get(x.key === null ? g : x.key) || null), c(v, h, x, k));
        case qn:
          var w = x._init;
          return m(h, v, g, w(x._payload), k);
      }
      if (Qo(x) || $o(x)) return ((h = h.get(g) || null), u(v, h, x, k, null));
      Js(v, x);
    }
    return null;
  }
  function y(h, v, g, x) {
    for (var k = null, w = null, E = v, C = (v = 0), I = null; E !== null && C < g.length; C++) {
      E.index > C ? ((I = E), (E = null)) : (I = E.sibling);
      var T = d(h, E, g[C], x);
      if (T === null) {
        E === null && (E = I);
        break;
      }
      (e && E && T.alternate === null && t(h, E),
        (v = o(T, v, C)),
        w === null ? (k = T) : (w.sibling = T),
        (w = T),
        (E = I));
    }
    if (C === g.length) return (n(h, E), de && zr(h, C), k);
    if (E === null) {
      for (; C < g.length; C++)
        ((E = f(h, g[C], x)),
          E !== null && ((v = o(E, v, C)), w === null ? (k = E) : (w.sibling = E), (w = E)));
      return (de && zr(h, C), k);
    }
    for (E = r(h, E); C < g.length; C++)
      ((I = m(E, h, C, g[C], x)),
        I !== null &&
          (e && I.alternate !== null && E.delete(I.key === null ? C : I.key),
          (v = o(I, v, C)),
          w === null ? (k = I) : (w.sibling = I),
          (w = I)));
    return (
      e &&
        E.forEach(function (z) {
          return t(h, z);
        }),
      de && zr(h, C),
      k
    );
  }
  function b(h, v, g, x) {
    var k = $o(g);
    if (typeof k != "function") throw Error(_(150));
    if (((g = k.call(g)), g == null)) throw Error(_(151));
    for (
      var w = (k = null), E = v, C = (v = 0), I = null, T = g.next();
      E !== null && !T.done;
      C++, T = g.next()
    ) {
      E.index > C ? ((I = E), (E = null)) : (I = E.sibling);
      var z = d(h, E, T.value, x);
      if (z === null) {
        E === null && (E = I);
        break;
      }
      (e && E && z.alternate === null && t(h, E),
        (v = o(z, v, C)),
        w === null ? (k = z) : (w.sibling = z),
        (w = z),
        (E = I));
    }
    if (T.done) return (n(h, E), de && zr(h, C), k);
    if (E === null) {
      for (; !T.done; C++, T = g.next())
        ((T = f(h, T.value, x)),
          T !== null && ((v = o(T, v, C)), w === null ? (k = T) : (w.sibling = T), (w = T)));
      return (de && zr(h, C), k);
    }
    for (E = r(h, E); !T.done; C++, T = g.next())
      ((T = m(E, h, C, T.value, x)),
        T !== null &&
          (e && T.alternate !== null && E.delete(T.key === null ? C : T.key),
          (v = o(T, v, C)),
          w === null ? (k = T) : (w.sibling = T),
          (w = T)));
    return (
      e &&
        E.forEach(function (A) {
          return t(h, A);
        }),
      de && zr(h, C),
      k
    );
  }
  function S(h, v, g, x) {
    if (
      (typeof g == "object" &&
        g !== null &&
        g.type === Ci &&
        g.key === null &&
        (g = g.props.children),
      typeof g == "object" && g !== null)
    ) {
      switch (g.$$typeof) {
        case Bs:
          e: {
            for (var k = g.key, w = v; w !== null;) {
              if (w.key === k) {
                if (((k = g.type), k === Ci)) {
                  if (w.tag === 7) {
                    (n(h, w.sibling), (v = i(w, g.props.children)), (v.return = h), (h = v));
                    break e;
                  }
                } else if (
                  w.elementType === k ||
                  (typeof k == "object" && k !== null && k.$$typeof === qn && Wy(k) === w.type)
                ) {
                  (n(h, w.sibling),
                    (v = i(w, g.props)),
                    (v.ref = Xo(h, w, g)),
                    (v.return = h),
                    (h = v));
                  break e;
                }
                n(h, w);
                break;
              }
              (t(h, w), (w = w.sibling));
            }
            g.type === Ci
              ? ((v = jr(g.props.children, h.mode, x, g.key)), (v.return = h), (h = v))
              : ((x = dl(g.type, g.key, g.props, null, h.mode, x)),
                (x.ref = Xo(h, v, g)),
                (x.return = h),
                (h = x));
          }
          return a(h);
        case ki:
          e: {
            for (w = g.key; v !== null;) {
              if (v.key === w) {
                if (
                  v.tag === 4 &&
                  v.stateNode.containerInfo === g.containerInfo &&
                  v.stateNode.implementation === g.implementation
                ) {
                  (n(h, v.sibling), (v = i(v, g.children || [])), (v.return = h), (h = v));
                  break e;
                }
                n(h, v);
                break;
              }
              (t(h, v), (v = v.sibling));
            }
            ((v = Bf(g, h.mode, x)), (v.return = h), (h = v));
          }
          return a(h);
        case qn:
          return ((w = g._init), S(h, v, w(g._payload), x));
      }
      if (Qo(g)) return y(h, v, g, x);
      if ($o(g)) return b(h, v, g, x);
      Js(h, g);
    }
    return (typeof g == "string" && g !== "") || typeof g == "number"
      ? ((g = "" + g),
        v !== null && v.tag === 6
          ? (n(h, v.sibling), (v = i(v, g)), (v.return = h), (h = v))
          : (n(h, v), (v = Df(g, h.mode, x)), (v.return = h), (h = v)),
        a(h))
      : n(h, v);
  }
  return S;
}
var Ui = pb(!0),
  mb = pb(!1),
  Pa = {},
  hn = hr(Pa),
  xa = hr(Pa),
  Sa = hr(Pa);
function Wr(e) {
  if (e === Pa) throw Error(_(174));
  return e;
}
function eh(e, t) {
  switch ((oe(Sa, t), oe(xa, e), oe(hn, Pa), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Yf(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Yf(t, e)));
  }
  (ue(hn), oe(hn, t));
}
function ji() {
  (ue(hn), ue(xa), ue(Sa));
}
function vb(e) {
  Wr(Sa.current);
  var t = Wr(hn.current),
    n = Yf(t, e.type);
  t !== n && (oe(xa, e), oe(hn, n));
}
function th(e) {
  xa.current === e && (ue(hn), ue(xa));
}
var ve = hr(0);
function Pl(e) {
  for (var t = e; t !== null;) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!"))
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (128 & t.flags) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null;) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var Ff = [];
function nh() {
  for (var e = 0; e < Ff.length; e++) Ff[e]._workInProgressVersionPrimary = null;
  Ff.length = 0;
}
var sl = On.ReactCurrentDispatcher,
  Lf = On.ReactCurrentBatchConfig,
  Yr = 0,
  ge = null,
  Le = null,
  Ve = null,
  _l = !1,
  oa = !1,
  wa = 0,
  AP = 0;
function et() {
  throw Error(_(321));
}
function rh(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Jt(e[n], t[n])) return !1;
  return !0;
}
function ih(e, t, n, r, i, o) {
  if (
    ((Yr = o),
    (ge = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (sl.current = e === null || e.memoizedState === null ? HP : NP),
    (e = n(r, i)),
    oa)
  ) {
    o = 0;
    do {
      if (((oa = !1), (wa = 0), 25 <= o)) throw Error(_(301));
      ((o += 1), (Ve = Le = null), (t.updateQueue = null), (sl.current = $P), (e = n(r, i)));
    } while (oa);
  }
  if (
    ((sl.current = Fl),
    (t = Le !== null && Le.next !== null),
    (Yr = 0),
    (Ve = Le = ge = null),
    (_l = !1),
    t)
  )
    throw Error(_(300));
  return e;
}
function oh() {
  var e = wa !== 0;
  return ((wa = 0), e);
}
function un() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return (Ve === null ? (ge.memoizedState = Ve = e) : (Ve = Ve.next = e), Ve);
}
function $t() {
  if (Le === null) {
    var e = ge.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Le.next;
  var t = Ve === null ? ge.memoizedState : Ve.next;
  if (t !== null) ((Ve = t), (Le = e));
  else {
    if (e === null) throw Error(_(310));
    ((Le = e),
      (e = {
        memoizedState: Le.memoizedState,
        baseState: Le.baseState,
        baseQueue: Le.baseQueue,
        queue: Le.queue,
        next: null,
      }),
      Ve === null ? (ge.memoizedState = Ve = e) : (Ve = Ve.next = e));
  }
  return Ve;
}
function ka(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Mf(e) {
  var t = $t(),
    n = t.queue;
  if (n === null) throw Error(_(311));
  n.lastRenderedReducer = e;
  var r = Le,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var a = i.next;
      ((i.next = o.next), (o.next = a));
    }
    ((r.baseQueue = i = o), (n.pending = null));
  }
  if (i !== null) {
    ((o = i.next), (r = r.baseState));
    var s = (a = null),
      l = null,
      c = o;
    do {
      var u = c.lane;
      if ((Yr & u) === u)
        (l !== null &&
          (l = l.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (r = c.hasEagerState ? c.eagerState : e(r, c.action)));
      else {
        var f = {
          lane: u,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        (l === null ? ((s = l = f), (a = r)) : (l = l.next = f), (ge.lanes |= u), (Kr |= u));
      }
      c = c.next;
    } while (c !== null && c !== o);
    (l === null ? (a = r) : (l.next = s),
      Jt(r, t.memoizedState) || (gt = !0),
      (t.memoizedState = r),
      (t.baseState = a),
      (t.baseQueue = l),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do ((o = i.lane), (ge.lanes |= o), (Kr |= o), (i = i.next));
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Of(e) {
  var t = $t(),
    n = t.queue;
  if (n === null) throw Error(_(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var a = (i = i.next);
    do ((o = e(o, a.action)), (a = a.next));
    while (a !== i);
    (Jt(o, t.memoizedState) || (gt = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o));
  }
  return [o, r];
}
function gb() {}
function yb(e, t) {
  var n = ge,
    r = $t(),
    i = t(),
    o = !Jt(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (gt = !0)),
    (r = r.queue),
    ah(Sb.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (Ve !== null && 1 & Ve.memoizedState.tag))
  ) {
    if (((n.flags |= 2048), Ca(9, xb.bind(null, n, r, i, t), void 0, null), Ae === null))
      throw Error(_(349));
    30 & Yr || bb(n, t, i);
  }
  return i;
}
function bb(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = ge.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (ge.updateQueue = t), (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function xb(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), wb(t) && kb(e));
}
function Sb(e, t, n) {
  return n(function () {
    wb(t) && kb(e);
  });
}
function wb(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Jt(e, n);
  } catch {
    return !0;
  }
}
function kb(e) {
  var t = Ln(e, 1);
  t !== null && Zt(t, e, 1, -1);
}
function Uy(e) {
  var t = un();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ka,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = zP.bind(null, ge, e)),
    [t.memoizedState, e]
  );
}
function Ca(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = ge.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ge.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Cb() {
  return $t().memoizedState;
}
function ll(e, t, n, r) {
  var i = un();
  ((ge.flags |= e), (i.memoizedState = Ca(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Ul(e, t, n, r) {
  var i = $t();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (Le !== null) {
    var a = Le.memoizedState;
    if (((o = a.destroy), r !== null && rh(r, a.deps))) {
      i.memoizedState = Ca(t, n, o, r);
      return;
    }
  }
  ((ge.flags |= e), (i.memoizedState = Ca(1 | t, n, o, r)));
}
function jy(e, t) {
  return ll(8390656, 8, e, t);
}
function ah(e, t) {
  return Ul(2048, 8, e, t);
}
function Eb(e, t) {
  return Ul(4, 2, e, t);
}
function Tb(e, t) {
  return Ul(4, 4, e, t);
}
function Ib(e, t) {
  return typeof t == "function"
    ? ((e = e()),
      t(e),
      function () {
        t(null);
      })
    : t != null
      ? ((e = e()),
        (t.current = e),
        function () {
          t.current = null;
        })
      : void 0;
}
function Rb(e, t, n) {
  return ((n = n != null ? n.concat([e]) : null), Ul(4, 4, Ib.bind(null, t, e), n));
}
function sh() {}
function Pb(e, t) {
  var n = $t();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && rh(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function _b(e, t) {
  var n = $t();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && rh(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Fb(e, t, n) {
  return 21 & Yr
    ? (Jt(n, t) || ((n = O0()), (ge.lanes |= n), (Kr |= n), (e.baseState = !0)), t)
    : (e.baseState && ((e.baseState = !1), (gt = !0)), (e.memoizedState = n));
}
function DP(e, t) {
  var n = re;
  ((re = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = Lf.transition;
  Lf.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((re = n), (Lf.transition = r));
  }
}
function Lb() {
  return $t().memoizedState;
}
function BP(e, t, n) {
  var r = lr(e);
  if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), Mb(e)))
    Ob(t, n);
  else if (((n = ub(e, t, n, r)), n !== null)) {
    var i = st();
    (Zt(n, e, r, i), Vb(n, t, r));
  }
}
function zP(e, t, n) {
  var r = lr(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Mb(e)) Ob(t, i);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && ((o = t.lastRenderedReducer), o !== null))
      try {
        var a = t.lastRenderedState,
          s = o(a, n);
        if (((i.hasEagerState = !0), (i.eagerState = s), Jt(s, a))) {
          var l = t.interleaved;
          (l === null ? ((i.next = i), Zd(t)) : ((i.next = l.next), (l.next = i)),
            (t.interleaved = i));
          return;
        }
      } catch {}
    ((n = ub(e, t, i, r)), n !== null && ((i = st()), Zt(n, e, r, i), Vb(n, t, r)));
  }
}
function Mb(e) {
  var t = e.alternate;
  return e === ge || (t !== null && t === ge);
}
function Ob(e, t) {
  oa = _l = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t));
}
function Vb(e, t, n) {
  if (4194240 & n) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Bd(e, n));
  }
}
var Fl = {
    readContext: Nt,
    useCallback: et,
    useContext: et,
    useEffect: et,
    useImperativeHandle: et,
    useInsertionEffect: et,
    useLayoutEffect: et,
    useMemo: et,
    useReducer: et,
    useRef: et,
    useState: et,
    useDebugValue: et,
    useDeferredValue: et,
    useTransition: et,
    useMutableSource: et,
    useSyncExternalStore: et,
    useId: et,
    unstable_isNewReconciler: !1,
  },
  HP = {
    readContext: Nt,
    useCallback: function (e, t) {
      return ((un().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Nt,
    useEffect: jy,
    useImperativeHandle: function (e, t, n) {
      return ((n = n != null ? n.concat([e]) : null), ll(4194308, 4, Ib.bind(null, t, e), n));
    },
    useLayoutEffect: function (e, t) {
      return ll(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return ll(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = un();
      return ((t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e);
    },
    useReducer: function (e, t, n) {
      var r = un();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = BP.bind(null, ge, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = un();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: Uy,
    useDebugValue: sh,
    useDeferredValue: function (e) {
      return (un().memoizedState = e);
    },
    useTransition: function () {
      var e = Uy(!1),
        t = e[0];
      return ((e = DP.bind(null, e[1])), (un().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = ge,
        i = un();
      if (de) {
        if (n === void 0) throw Error(_(407));
        n = n();
      } else {
        if (((n = t()), Ae === null)) throw Error(_(349));
        30 & Yr || bb(r, t, n);
      }
      i.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (i.queue = o),
        jy(Sb.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        Ca(9, xb.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = un(),
        t = Ae.identifierPrefix;
      if (de) {
        var n = Rn,
          r = In;
        ((n = (r & ~(1 << (32 - Qt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = wa++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = AP++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  NP = {
    readContext: Nt,
    useCallback: Pb,
    useContext: Nt,
    useEffect: ah,
    useImperativeHandle: Rb,
    useInsertionEffect: Eb,
    useLayoutEffect: Tb,
    useMemo: _b,
    useReducer: Mf,
    useRef: Cb,
    useState: function () {
      return Mf(ka);
    },
    useDebugValue: sh,
    useDeferredValue: function (e) {
      var t = $t();
      return Fb(t, Le.memoizedState, e);
    },
    useTransition: function () {
      var e = Mf(ka)[0],
        t = $t().memoizedState;
      return [e, t];
    },
    useMutableSource: gb,
    useSyncExternalStore: yb,
    useId: Lb,
    unstable_isNewReconciler: !1,
  },
  $P = {
    readContext: Nt,
    useCallback: Pb,
    useContext: Nt,
    useEffect: ah,
    useImperativeHandle: Rb,
    useInsertionEffect: Eb,
    useLayoutEffect: Tb,
    useMemo: _b,
    useReducer: Of,
    useRef: Cb,
    useState: function () {
      return Of(ka);
    },
    useDebugValue: sh,
    useDeferredValue: function (e) {
      var t = $t();
      return Le === null ? (t.memoizedState = e) : Fb(t, Le.memoizedState, e);
    },
    useTransition: function () {
      var e = Of(ka)[0],
        t = $t().memoizedState;
      return [e, t];
    },
    useMutableSource: gb,
    useSyncExternalStore: yb,
    useId: Lb,
    unstable_isNewReconciler: !1,
  };
function Xi(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += yR(r)), (r = r.return));
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function Vf(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function gd(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var WP = typeof WeakMap == "function" ? WeakMap : Map;
function Ab(e, t, n) {
  ((n = Pn(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (Ml || ((Ml = !0), (Td = r)), gd(e, t));
    }),
    n
  );
}
function Db(e, t, n) {
  ((n = Pn(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    ((n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        gd(e, t);
      }));
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        (gd(e, t), typeof r != "function" && (sr === null ? (sr = new Set([this])) : sr.add(this)));
        var a = t.stack;
        this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
      }),
    n
  );
}
function Xy(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new WP();
    var i = new Set();
    r.set(t, i);
  } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
  i.has(n) || (i.add(n), (e = r_.bind(null, e, t, n)), t.then(e, e));
}
function Gy(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) && ((t = e.memoizedState), (t = t === null || t.dehydrated !== null)), t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Yy(e, t, n, r, i) {
  return 1 & e.mode
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null ? (n.tag = 17) : ((t = Pn(-1, 1)), (t.tag = 2), ar(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var UP = On.ReactCurrentOwner,
  gt = !1;
function at(e, t, n, r) {
  t.child = e === null ? mb(t, null, n, r) : Ui(t, e.child, n, r);
}
function Ky(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    zi(t, i),
    (r = ih(e, t, n, r, o, i)),
    (n = oh()),
    e !== null && !gt
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), Mn(e, t, i))
      : (de && n && Xd(t), (t.flags |= 1), at(e, t, r, i), t.child)
  );
}
function qy(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !mh(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), Bb(e, t, o, r, i))
      : ((e = dl(n.type, null, r, t, t.mode, i)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var a = o.memoizedProps;
    if (((n = n.compare), (n = n !== null ? n : va), n(a, r) && e.ref === t.ref))
      return Mn(e, t, i);
  }
  return ((t.flags |= 1), (e = cr(o, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
}
function Bb(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (va(o, r) && e.ref === t.ref) {
      if (((gt = !1), (t.pendingProps = r = o), (e.lanes & i) === 0))
        return ((t.lanes = e.lanes), Mn(e, t, i));
      131072 & e.flags && (gt = !0);
    }
  }
  return yd(e, t, n, r, i);
}
function zb(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(1 & t.mode))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        oe(Oi, Ct),
        (Ct |= n));
    else {
      if (!(1073741824 & n))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
          (t.updateQueue = null),
          oe(Oi, Ct),
          (Ct |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        oe(Oi, Ct),
        (Ct |= r));
    }
  else
    (o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      oe(Oi, Ct),
      (Ct |= r));
  return (at(e, t, i, n), t.child);
}
function Hb(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function yd(e, t, n, r, i) {
  var o = bt(n) ? Xr : rt.current;
  return (
    (o = $i(t, o)),
    zi(t, i),
    (n = ih(e, t, n, r, o, i)),
    (r = oh()),
    e !== null && !gt
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), Mn(e, t, i))
      : (de && r && Xd(t), (t.flags |= 1), at(e, t, n, i), t.child)
  );
}
function Qy(e, t, n, r, i) {
  if (bt(n)) {
    var o = !0;
    kl(t);
  } else o = !1;
  if ((zi(t, i), t.stateNode === null)) (cl(e, t), hb(t, n, r), vd(t, n, r, i), (r = !0));
  else if (e === null) {
    var a = t.stateNode,
      s = t.memoizedProps;
    a.props = s;
    var l = a.context,
      c = n.contextType;
    typeof c == "object" && c !== null
      ? (c = Nt(c))
      : ((c = bt(n) ? Xr : rt.current), (c = $i(t, c)));
    var u = n.getDerivedStateFromProps,
      f = typeof u == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    (f ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((s !== r || l !== c) && $y(t, a, r, c)),
      (Qn = !1));
    var d = t.memoizedState;
    ((a.state = d),
      Rl(t, r, a, i),
      (l = t.memoizedState),
      s !== r || d !== l || yt.current || Qn
        ? (typeof u == "function" && (md(t, n, u, r), (l = t.memoizedState)),
          (s = Qn || Ny(t, n, s, r, d, l, c))
            ? (f ||
                (typeof a.UNSAFE_componentWillMount != "function" &&
                  typeof a.componentWillMount != "function") ||
                (typeof a.componentWillMount == "function" && a.componentWillMount(),
                typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()),
              typeof a.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = l)),
          (a.props = r),
          (a.state = l),
          (a.context = c),
          (r = s))
        : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (r = !1)));
  } else {
    ((a = t.stateNode),
      fb(e, t),
      (s = t.memoizedProps),
      (c = t.type === t.elementType ? s : Yt(t.type, s)),
      (a.props = c),
      (f = t.pendingProps),
      (d = a.context),
      (l = n.contextType),
      typeof l == "object" && l !== null
        ? (l = Nt(l))
        : ((l = bt(n) ? Xr : rt.current), (l = $i(t, l))));
    var m = n.getDerivedStateFromProps;
    ((u = typeof m == "function" || typeof a.getSnapshotBeforeUpdate == "function") ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((s !== f || d !== l) && $y(t, a, r, l)),
      (Qn = !1),
      (d = t.memoizedState),
      (a.state = d),
      Rl(t, r, a, i));
    var y = t.memoizedState;
    s !== f || d !== y || yt.current || Qn
      ? (typeof m == "function" && (md(t, n, m, r), (y = t.memoizedState)),
        (c = Qn || Ny(t, n, c, r, d, y, l) || !1)
          ? (u ||
              (typeof a.UNSAFE_componentWillUpdate != "function" &&
                typeof a.componentWillUpdate != "function") ||
              (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, y, l),
              typeof a.UNSAFE_componentWillUpdate == "function" &&
                a.UNSAFE_componentWillUpdate(r, y, l)),
            typeof a.componentDidUpdate == "function" && (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof a.componentDidUpdate != "function" ||
              (s === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = y)),
        (a.props = r),
        (a.state = y),
        (a.context = l),
        (r = c))
      : (typeof a.componentDidUpdate != "function" ||
          (s === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return bd(e, t, n, r, o, i);
}
function bd(e, t, n, r, i, o) {
  Hb(e, t);
  var a = (128 & t.flags) !== 0;
  if (!r && !a) return (i && Ay(t, n, !1), Mn(e, t, o));
  ((r = t.stateNode), (UP.current = t));
  var s = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && a
      ? ((t.child = Ui(t, e.child, null, o)), (t.child = Ui(t, null, s, o)))
      : at(e, t, s, o),
    (t.memoizedState = r.state),
    i && Ay(t, n, !0),
    t.child
  );
}
function Nb(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? Vy(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Vy(e, t.context, !1),
    eh(e, t.containerInfo));
}
function Zy(e, t, n, r, i) {
  return (Wi(), Yd(i), (t.flags |= 256), at(e, t, n, r), t.child);
}
var xd = { dehydrated: null, treeContext: null, retryLane: 0 };
function Sd(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function $b(e, t, n) {
  var r,
    i = t.pendingProps,
    o = ve.current,
    a = !1,
    s = (128 & t.flags) !== 0;
  if (
    ((r = s) || (r = (e === null || e.memoizedState !== null) && (2 & o) !== 0),
    r ? ((a = !0), (t.flags &= -129)) : (e !== null && e.memoizedState === null) || (o |= 1),
    oe(ve, 1 & o),
    e === null)
  )
    return (
      hd(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (1 & t.mode ? (e.data === "$!" ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1),
          null)
        : ((s = i.children),
          (e = i.fallback),
          a
            ? ((i = t.mode),
              (a = t.child),
              (s = { mode: "hidden", children: s }),
              !(1 & i) && a !== null
                ? ((a.childLanes = 0), (a.pendingProps = s))
                : (a = Gl(s, i, 0, null)),
              (e = jr(e, i, n, null)),
              (a.return = t),
              (e.return = t),
              (a.sibling = e),
              (t.child = a),
              (t.child.memoizedState = Sd(n)),
              (t.memoizedState = xd),
              e)
            : lh(t, s))
    );
  if (((o = e.memoizedState), o !== null && ((r = o.dehydrated), r !== null)))
    return jP(e, t, s, i, r, o, n);
  if (a) {
    ((a = i.fallback), (s = t.mode), (o = e.child), (r = o.sibling));
    var l = { mode: "hidden", children: i.children };
    return (
      !(1 & s) && t.child !== o
        ? ((i = t.child), (i.childLanes = 0), (i.pendingProps = l), (t.deletions = null))
        : ((i = cr(o, l)), (i.subtreeFlags = 14680064 & o.subtreeFlags)),
      r !== null ? (a = cr(r, a)) : ((a = jr(a, s, n, null)), (a.flags |= 2)),
      (a.return = t),
      (i.return = t),
      (i.sibling = a),
      (t.child = i),
      (i = a),
      (a = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? Sd(n)
          : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }),
      (a.memoizedState = s),
      (a.childLanes = e.childLanes & ~n),
      (t.memoizedState = xd),
      i
    );
  }
  return (
    (a = e.child),
    (e = a.sibling),
    (i = cr(a, { mode: "visible", children: i.children })),
    !(1 & t.mode) && (i.lanes = n),
    (i.return = t),
    (i.sibling = null),
    e !== null &&
      ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = i),
    (t.memoizedState = null),
    i
  );
}
function lh(e, t) {
  return (
    (t = Gl({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function el(e, t, n, r) {
  return (
    r !== null && Yd(r),
    Ui(t, e.child, null, n),
    (e = lh(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function jP(e, t, n, r, i, o, a) {
  if (n)
    return 256 & t.flags
      ? ((t.flags &= -257), (r = Vf(Error(_(422)))), el(e, t, a, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = r.fallback),
          (i = t.mode),
          (r = Gl({ mode: "visible", children: r.children }, i, 0, null)),
          (o = jr(o, i, a, null)),
          (o.flags |= 2),
          (r.return = t),
          (o.return = t),
          (r.sibling = o),
          (t.child = r),
          1 & t.mode && Ui(t, e.child, null, a),
          (t.child.memoizedState = Sd(a)),
          (t.memoizedState = xd),
          o);
  if (!(1 & t.mode)) return el(e, t, a, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var s = r.dgst;
    return ((r = s), (o = Error(_(419))), (r = Vf(o, r, void 0)), el(e, t, a, r));
  }
  if (((s = (a & e.childLanes) !== 0), gt || s)) {
    if (((r = Ae), r !== null)) {
      switch (a & -a) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      ((i = i & (r.suspendedLanes | a) ? 0 : i),
        i !== 0 && i !== o.retryLane && ((o.retryLane = i), Ln(e, i), Zt(r, e, i, -1)));
    }
    return (ph(), (r = Vf(Error(_(421)))), el(e, t, a, r));
  }
  return i.data === "$?"
    ? ((t.flags |= 128), (t.child = e.child), (t = i_.bind(null, e)), (i._reactRetry = t), null)
    : ((e = o.treeContext),
      (Et = or(i.nextSibling)),
      (Tt = t),
      (de = !0),
      (qt = null),
      e !== null &&
        ((Dt[Bt++] = In),
        (Dt[Bt++] = Rn),
        (Dt[Bt++] = Gr),
        (In = e.id),
        (Rn = e.overflow),
        (Gr = t)),
      (t = lh(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Jy(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), pd(e.return, t, n));
}
function Af(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function Wb(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((at(e, t, r.children, n), (r = ve.current), 2 & r)) ((r = (1 & r) | 2), (t.flags |= 128));
  else {
    if (e !== null && 128 & e.flags)
      e: for (e = t.child; e !== null;) {
        if (e.tag === 13) e.memoizedState !== null && Jy(e, n, t);
        else if (e.tag === 19) Jy(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null;) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((oe(ve, r), !(1 & t.mode))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null;)
          ((e = n.alternate), e !== null && Pl(e) === null && (i = n), (n = n.sibling));
        ((n = i),
          n === null ? ((i = t.child), (t.child = null)) : ((i = n.sibling), (n.sibling = null)),
          Af(t, !1, i, n, o));
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null;) {
          if (((e = i.alternate), e !== null && Pl(e) === null)) {
            t.child = i;
            break;
          }
          ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
        }
        Af(t, !0, n, null, o);
        break;
      case "together":
        Af(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function cl(e, t) {
  !(1 & t.mode) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Mn(e, t, n) {
  if ((e !== null && (t.dependencies = e.dependencies), (Kr |= t.lanes), !(n & t.childLanes)))
    return null;
  if (e !== null && t.child !== e.child) throw Error(_(153));
  if (t.child !== null) {
    for (e = t.child, n = cr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;)
      ((e = e.sibling), (n = n.sibling = cr(e, e.pendingProps)), (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function XP(e, t, n) {
  switch (t.tag) {
    case 3:
      (Nb(t), Wi());
      break;
    case 5:
      vb(t);
      break;
    case 1:
      bt(t.type) && kl(t);
      break;
    case 4:
      eh(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      (oe(Tl, r._currentValue), (r._currentValue = i));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (oe(ve, 1 & ve.current), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? $b(e, t, n)
            : (oe(ve, 1 & ve.current), (e = Mn(e, t, n)), e !== null ? e.sibling : null);
      oe(ve, 1 & ve.current);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), 128 & e.flags)) {
        if (r) return Wb(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        oe(ve, ve.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), zb(e, t, n));
  }
  return Mn(e, t, n);
}
var Ub, wd, jb, Xb;
Ub = function (e, t) {
  for (var n = t.child; n !== null;) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null;) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
wd = function () {};
jb = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    ((e = t.stateNode), Wr(hn.current));
    var o = null;
    switch (n) {
      case "input":
        ((i = Uf(e, i)), (r = Uf(e, r)), (o = []));
        break;
      case "select":
        ((i = ye({}, i, { value: void 0 })), (r = ye({}, r, { value: void 0 })), (o = []));
        break;
      case "textarea":
        ((i = Gf(e, i)), (r = Gf(e, r)), (o = []));
        break;
      default:
        typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Sl);
    }
    Kf(n, r);
    var a;
    n = null;
    for (c in i)
      if (!r.hasOwnProperty(c) && i.hasOwnProperty(c) && i[c] != null)
        if (c === "style") {
          var s = i[c];
          for (a in s) s.hasOwnProperty(a) && (n || (n = {}), (n[a] = ""));
        } else
          c !== "dangerouslySetInnerHTML" &&
            c !== "children" &&
            c !== "suppressContentEditableWarning" &&
            c !== "suppressHydrationWarning" &&
            c !== "autoFocus" &&
            (ca.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var l = r[c];
      if (((s = i?.[c]), r.hasOwnProperty(c) && l !== s && (l != null || s != null)))
        if (c === "style")
          if (s) {
            for (a in s)
              !s.hasOwnProperty(a) || (l && l.hasOwnProperty(a)) || (n || (n = {}), (n[a] = ""));
            for (a in l) l.hasOwnProperty(a) && s[a] !== l[a] && (n || (n = {}), (n[a] = l[a]));
          } else (n || (o || (o = []), o.push(c, n)), (n = l));
        else
          c === "dangerouslySetInnerHTML"
            ? ((l = l ? l.__html : void 0),
              (s = s ? s.__html : void 0),
              l != null && s !== l && (o = o || []).push(c, l))
            : c === "children"
              ? (typeof l != "string" && typeof l != "number") || (o = o || []).push(c, "" + l)
              : c !== "suppressContentEditableWarning" &&
                c !== "suppressHydrationWarning" &&
                (ca.hasOwnProperty(c)
                  ? (l != null && c === "onScroll" && ce("scroll", e), o || s === l || (o = []))
                  : (o = o || []).push(c, l));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
Xb = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Go(e, t) {
  if (!de)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null;) (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null;) (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function tt(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null;)
      ((n |= i.lanes | i.childLanes),
        (r |= 14680064 & i.subtreeFlags),
        (r |= 14680064 & i.flags),
        (i.return = e),
        (i = i.sibling));
  else
    for (i = e.child; i !== null;)
      ((n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function GP(e, t, n) {
  var r = t.pendingProps;
  switch ((Gd(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (tt(t), null);
    case 1:
      return (bt(t.type) && wl(), tt(t), null);
    case 3:
      return (
        (r = t.stateNode),
        ji(),
        ue(yt),
        ue(rt),
        nh(),
        r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e !== null && e.child !== null) ||
          (Zs(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(256 & t.flags)) ||
              ((t.flags |= 1024), qt !== null && (Pd(qt), (qt = null)))),
        wd(e, t),
        tt(t),
        null
      );
    case 5:
      th(t);
      var i = Wr(Sa.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (jb(e, t, n, r, i), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(_(166));
          return (tt(t), null);
        }
        if (((e = Wr(hn.current)), Zs(t))) {
          ((r = t.stateNode), (n = t.type));
          var o = t.memoizedProps;
          switch (((r[fn] = t), (r[ba] = o), (e = (1 & t.mode) !== 0), n)) {
            case "dialog":
              (ce("cancel", r), ce("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              ce("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Jo.length; i++) ce(Jo[i], r);
              break;
            case "source":
              ce("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (ce("error", r), ce("load", r));
              break;
            case "details":
              ce("toggle", r);
              break;
            case "input":
              (sy(r, o), ce("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!o.multiple }), ce("invalid", r));
              break;
            case "textarea":
              (cy(r, o), ce("invalid", r));
          }
          (Kf(n, o), (i = null));
          for (var a in o)
            if (o.hasOwnProperty(a)) {
              var s = o[a];
              a === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (o.suppressHydrationWarning !== !0 && Qs(r.textContent, s, e),
                    (i = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (o.suppressHydrationWarning !== !0 && Qs(r.textContent, s, e),
                    (i = ["children", "" + s]))
                : ca.hasOwnProperty(a) && s != null && a === "onScroll" && ce("scroll", r);
            }
          switch (n) {
            case "input":
              (zs(r), ly(r, o, !0));
              break;
            case "textarea":
              (zs(r), uy(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Sl);
          }
          ((r = i), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((a = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = b0(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = a.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = a.createElement(n, { is: r.is }))
                  : ((e = a.createElement(n)),
                    n === "select" &&
                      ((a = e), r.multiple ? (a.multiple = !0) : r.size && (a.size = r.size)))
              : (e = a.createElementNS(e, n)),
            (e[fn] = t),
            (e[ba] = r),
            Ub(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((a = qf(n, r)), n)) {
              case "dialog":
                (ce("cancel", e), ce("close", e), (i = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (ce("load", e), (i = r));
                break;
              case "video":
              case "audio":
                for (i = 0; i < Jo.length; i++) ce(Jo[i], e);
                i = r;
                break;
              case "source":
                (ce("error", e), (i = r));
                break;
              case "img":
              case "image":
              case "link":
                (ce("error", e), ce("load", e), (i = r));
                break;
              case "details":
                (ce("toggle", e), (i = r));
                break;
              case "input":
                (sy(e, r), (i = Uf(e, r)), ce("invalid", e));
                break;
              case "option":
                i = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = ye({}, r, { value: void 0 })),
                  ce("invalid", e));
                break;
              case "textarea":
                (cy(e, r), (i = Gf(e, r)), ce("invalid", e));
                break;
              default:
                i = r;
            }
            (Kf(n, i), (s = i));
            for (o in s)
              if (s.hasOwnProperty(o)) {
                var l = s[o];
                o === "style"
                  ? w0(e, l)
                  : o === "dangerouslySetInnerHTML"
                    ? ((l = l ? l.__html : void 0), l != null && x0(e, l))
                    : o === "children"
                      ? typeof l == "string"
                        ? (n !== "textarea" || l !== "") && ua(e, l)
                        : typeof l == "number" && ua(e, "" + l)
                      : o !== "suppressContentEditableWarning" &&
                        o !== "suppressHydrationWarning" &&
                        o !== "autoFocus" &&
                        (ca.hasOwnProperty(o)
                          ? l != null && o === "onScroll" && ce("scroll", e)
                          : l != null && Ld(e, o, l, a));
              }
            switch (n) {
              case "input":
                (zs(e), ly(e, r, !1));
                break;
              case "textarea":
                (zs(e), uy(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + ur(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? Vi(e, !!r.multiple, o, !1)
                    : r.defaultValue != null && Vi(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Sl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (tt(t), null);
    case 6:
      if (e && t.stateNode != null) Xb(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(_(166));
        if (((n = Wr(Sa.current)), Wr(hn.current), Zs(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[fn] = t),
            (o = r.nodeValue !== n) && ((e = Tt), e !== null))
          )
            switch (e.tag) {
              case 3:
                Qs(r.nodeValue, n, (1 & e.mode) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Qs(r.nodeValue, n, (1 & e.mode) !== 0);
            }
          o && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[fn] = t),
            (t.stateNode = r));
      }
      return (tt(t), null);
    case 13:
      if (
        (ue(ve),
        (r = t.memoizedState),
        e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (de && Et !== null && 1 & t.mode && !(128 & t.flags))
          (cb(), Wi(), (t.flags |= 98560), (o = !1));
        else if (((o = Zs(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(_(318));
            if (((o = t.memoizedState), (o = o !== null ? o.dehydrated : null), !o))
              throw Error(_(317));
            o[fn] = t;
          } else (Wi(), !(128 & t.flags) && (t.memoizedState = null), (t.flags |= 4));
          (tt(t), (o = !1));
        } else (qt !== null && (Pd(qt), (qt = null)), (o = !0));
        if (!o) return 65536 & t.flags ? t : null;
      }
      return 128 & t.flags
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            1 & t.mode && (e === null || 1 & ve.current ? Me === 0 && (Me = 3) : ph())),
          t.updateQueue !== null && (t.flags |= 4),
          tt(t),
          null);
    case 4:
      return (ji(), wd(e, t), e === null && ga(t.stateNode.containerInfo), tt(t), null);
    case 10:
      return (Qd(t.type._context), tt(t), null);
    case 17:
      return (bt(t.type) && wl(), tt(t), null);
    case 19:
      if ((ue(ve), (o = t.memoizedState), o === null)) return (tt(t), null);
      if (((r = (128 & t.flags) !== 0), (a = o.rendering), a === null))
        if (r) Go(o, !1);
        else {
          if (Me !== 0 || (e !== null && 128 & e.flags))
            for (e = t.child; e !== null;) {
              if (((a = Pl(e)), a !== null)) {
                for (
                  t.flags |= 128,
                    Go(o, !1),
                    r = a.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (a = o.alternate),
                    a === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = a.childLanes),
                        (o.lanes = a.lanes),
                        (o.child = a.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = a.memoizedProps),
                        (o.memoizedState = a.memoizedState),
                        (o.updateQueue = a.updateQueue),
                        (o.type = a.type),
                        (e = a.dependencies),
                        (o.dependencies =
                          e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                    (n = n.sibling));
                return (oe(ve, (1 & ve.current) | 2), t.child);
              }
              e = e.sibling;
            }
          o.tail !== null &&
            Ee() > Gi &&
            ((t.flags |= 128), (r = !0), Go(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Pl(a)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Go(o, !0),
              o.tail === null && o.tailMode === "hidden" && !a.alternate && !de)
            )
              return (tt(t), null);
          } else
            2 * Ee() - o.renderingStartTime > Gi &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Go(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((a.sibling = t.child), (t.child = a))
          : ((n = o.last), n !== null ? (n.sibling = a) : (t.child = a), (o.last = a));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = Ee()),
          (t.sibling = null),
          (n = ve.current),
          oe(ve, r ? (1 & n) | 2 : 1 & n),
          t)
        : (tt(t), null);
    case 22:
    case 23:
      return (
        hh(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && 1 & t.mode
          ? 1073741824 & Ct && (tt(t), 6 & t.subtreeFlags && (t.flags |= 8192))
          : tt(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(_(156, t.tag));
}
function YP(e, t) {
  switch ((Gd(t), t.tag)) {
    case 1:
      return (
        bt(t.type) && wl(),
        (e = t.flags),
        65536 & e ? ((t.flags = (-65537 & e) | 128), t) : null
      );
    case 3:
      return (
        ji(),
        ue(yt),
        ue(rt),
        nh(),
        (e = t.flags),
        65536 & e && !(128 & e) ? ((t.flags = (-65537 & e) | 128), t) : null
      );
    case 5:
      return (th(t), null);
    case 13:
      if ((ue(ve), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(_(340));
        Wi();
      }
      return ((e = t.flags), 65536 & e ? ((t.flags = (-65537 & e) | 128), t) : null);
    case 19:
      return (ue(ve), null);
    case 4:
      return (ji(), null);
    case 10:
      return (Qd(t.type._context), null);
    case 22:
    case 23:
      return (hh(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var tl = !1,
  nt = !1,
  KP = typeof WeakSet == "function" ? WeakSet : Set,
  V = null;
function Mi(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Se(e, t, r);
      }
    else n.current = null;
}
function Gb(e, t, n) {
  try {
    n();
  } catch (r) {
    Se(e, t, r);
  }
}
var e0 = !1;
function qP(e, t) {
  if (((ad = yl), (e = q0()), jd(e))) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || F;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, o.nodeType);
          } catch {
            n = null;
            break e;
          }
          var a = 0,
            s = -1,
            l = -1,
            c = 0,
            u = 0,
            f = e,
            d = null;
          t: for (;;) {
            for (
              var m;
              f !== n || (i !== 0 && f.nodeType !== 3) || (s = a + i),
                f !== o || (r !== 0 && f.nodeType !== 3) || (l = a + r),
                f.nodeType === 3 && (a += f.nodeValue.length),
                (m = f.firstChild) !== null;
            )
              ((d = f), (f = m));
            for (;;) {
              if (f === e) break t;
              if (
                (d === n && ++c === i && (s = a),
                d === o && ++u === r && (l = a),
                (m = f.nextSibling) !== null)
              )
                break;
              ((f = d), (d = f.parentNode));
            }
            f = m;
          }
          n = s === -1 || l === -1 ? null : { start: s, end: l };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (sd = { focusedElem: e, selectionRange: n }, yl = !1, V = t; V !== null;)
    if (((t = V), (e = t.child), (1028 & t.subtreeFlags) !== 0 && e !== null))
      ((e.return = t), (V = e));
    else
      for (; V !== null;) {
        t = V;
        try {
          var y = t.alternate;
          if (1024 & t.flags)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (y !== null) {
                  var b = y.memoizedProps,
                    S = y.memoizedState,
                    h = t.stateNode,
                    v = h.getSnapshotBeforeUpdate(t.elementType === t.type ? b : Yt(t.type, b), S);
                  h.__reactInternalSnapshotBeforeUpdate = v;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1
                  ? (g.textContent = "")
                  : g.nodeType === 9 && g.documentElement && g.removeChild(g.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(_(163));
            }
        } catch (x) {
          Se(t, t.return, x);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (V = e));
          break;
        }
        V = t.return;
      }
  return ((y = e0), (e0 = !1), y);
}
function aa(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        ((i.destroy = void 0), o !== void 0 && Gb(t, n, o));
      }
      i = i.next;
    } while (i !== r);
  }
}
function jl(e, t) {
  if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function kd(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Yb(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), Yb(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null && (delete t[fn], delete t[ba], delete t[ud], delete t[LP], delete t[MP])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function Kb(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function t0(e) {
  e: for (;;) {
    for (; e.sibling === null;) {
      if (e.return === null || Kb(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
      if (2 & e.flags || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(2 & e.flags)) return e.stateNode;
  }
}
function Cd(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Sl)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Cd(e, t, n), e = e.sibling; e !== null;) (Cd(e, t, n), (e = e.sibling));
}
function Ed(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Ed(e, t, n), e = e.sibling; e !== null;) (Ed(e, t, n), (e = e.sibling));
}
var We = null,
  Kt = !1;
function Kn(e, t, n) {
  for (n = n.child; n !== null;) (qb(e, t, n), (n = n.sibling));
}
function qb(e, t, n) {
  if (dn && typeof dn.onCommitFiberUnmount == "function")
    try {
      dn.onCommitFiberUnmount(Dl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      nt || Mi(n, t);
    case 6:
      var r = We,
        i = Kt;
      ((We = null),
        Kn(e, t, n),
        (We = r),
        (Kt = i),
        We !== null &&
          (Kt
            ? ((e = We),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : We.removeChild(n.stateNode)));
      break;
    case 18:
      We !== null &&
        (Kt
          ? ((e = We),
            (n = n.stateNode),
            e.nodeType === 8 ? Pf(e.parentNode, n) : e.nodeType === 1 && Pf(e, n),
            pa(e))
          : Pf(We, n.stateNode));
      break;
    case 4:
      ((r = We),
        (i = Kt),
        (We = n.stateNode.containerInfo),
        (Kt = !0),
        Kn(e, t, n),
        (We = r),
        (Kt = i));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!nt && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
        i = r = r.next;
        do {
          var o = i,
            a = o.destroy;
          ((o = o.tag), a !== void 0 && (2 & o || 4 & o) && Gb(n, t, a), (i = i.next));
        } while (i !== r);
      }
      Kn(e, t, n);
      break;
    case 1:
      if (!nt && (Mi(n, t), (r = n.stateNode), typeof r.componentWillUnmount == "function"))
        try {
          ((r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount());
        } catch (s) {
          Se(n, t, s);
        }
      Kn(e, t, n);
      break;
    case 21:
      Kn(e, t, n);
      break;
    case 22:
      1 & n.mode
        ? ((nt = (r = nt) || n.memoizedState !== null), Kn(e, t, n), (nt = r))
        : Kn(e, t, n);
      break;
    default:
      Kn(e, t, n);
  }
}
function n0(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new KP()),
      t.forEach(function (r) {
        var i = o_.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      }));
  }
}
function Gt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          a = t,
          s = a;
        e: for (; s !== null;) {
          switch (s.tag) {
            case 5:
              ((We = s.stateNode), (Kt = !1));
              break e;
            case 3:
              ((We = s.stateNode.containerInfo), (Kt = !0));
              break e;
            case 4:
              ((We = s.stateNode.containerInfo), (Kt = !0));
              break e;
          }
          s = s.return;
        }
        if (We === null) throw Error(_(160));
        (qb(o, a, i), (We = null), (Kt = !1));
        var l = i.alternate;
        (l !== null && (l.return = null), (i.return = null));
      } catch (c) {
        Se(i, t, c);
      }
    }
  if (12854 & t.subtreeFlags) for (t = t.child; t !== null;) (Qb(t, e), (t = t.sibling));
}
function Qb(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Gt(t, e), cn(e), 4 & r)) {
        try {
          (aa(3, e, e.return), jl(3, e));
        } catch (b) {
          Se(e, e.return, b);
        }
        try {
          aa(5, e, e.return);
        } catch (b) {
          Se(e, e.return, b);
        }
      }
      break;
    case 1:
      (Gt(t, e), cn(e), 512 & r && n !== null && Mi(n, n.return));
      break;
    case 5:
      if ((Gt(t, e), cn(e), 512 & r && n !== null && Mi(n, n.return), 32 & e.flags)) {
        var i = e.stateNode;
        try {
          ua(i, "");
        } catch (b) {
          Se(e, e.return, b);
        }
      }
      if (4 & r && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          a = n !== null ? n.memoizedProps : o,
          s = e.type,
          l = e.updateQueue;
        if (((e.updateQueue = null), l !== null))
          try {
            (s === "input" && o.type === "radio" && o.name != null && g0(i, o), qf(s, a));
            var c = qf(s, o);
            for (a = 0; a < l.length; a += 2) {
              var u = l[a],
                f = l[a + 1];
              u === "style"
                ? w0(i, f)
                : u === "dangerouslySetInnerHTML"
                  ? x0(i, f)
                  : u === "children"
                    ? ua(i, f)
                    : Ld(i, u, f, c);
            }
            switch (s) {
              case "input":
                jf(i, o);
                break;
              case "textarea":
                y0(i, o);
                break;
              case "select":
                var d = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var m = o.value;
                m != null
                  ? Vi(i, !!o.multiple, m, !1)
                  : d !== !!o.multiple &&
                    (o.defaultValue != null
                      ? Vi(i, !!o.multiple, o.defaultValue, !0)
                      : Vi(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[ba] = o;
          } catch (b) {
            Se(e, e.return, b);
          }
      }
      break;
    case 6:
      if ((Gt(t, e), cn(e), 4 & r)) {
        if (e.stateNode === null) throw Error(_(162));
        ((i = e.stateNode), (o = e.memoizedProps));
        try {
          i.nodeValue = o;
        } catch (b) {
          Se(e, e.return, b);
        }
      }
      break;
    case 3:
      if ((Gt(t, e), cn(e), 4 & r && n !== null && n.memoizedState.isDehydrated))
        try {
          pa(t.containerInfo);
        } catch (b) {
          Se(e, e.return, b);
        }
      break;
    case 4:
      (Gt(t, e), cn(e));
      break;
    case 13:
      (Gt(t, e),
        cn(e),
        (i = e.child),
        8192 & i.flags &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o || (i.alternate !== null && i.alternate.memoizedState !== null) || (fh = Ee())),
        4 & r && n0(e));
      break;
    case 22:
      if (
        ((u = n !== null && n.memoizedState !== null),
        1 & e.mode ? ((nt = (c = nt) || u), Gt(t, e), (nt = c)) : Gt(t, e),
        cn(e),
        8192 & r)
      ) {
        if (((c = e.memoizedState !== null), (e.stateNode.isHidden = c) && !u && 1 & e.mode))
          for (V = e, u = e.child; u !== null;) {
            for (f = V = u; V !== null;) {
              switch (((d = V), (m = d.child), d.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  aa(4, d, d.return);
                  break;
                case 1:
                  Mi(d, d.return);
                  var y = d.stateNode;
                  if (typeof y.componentWillUnmount == "function") {
                    ((r = d), (n = d.return));
                    try {
                      ((t = r),
                        (y.props = t.memoizedProps),
                        (y.state = t.memoizedState),
                        y.componentWillUnmount());
                    } catch (b) {
                      Se(r, n, b);
                    }
                  }
                  break;
                case 5:
                  Mi(d, d.return);
                  break;
                case 22:
                  if (d.memoizedState !== null) {
                    i0(f);
                    continue;
                  }
              }
              m !== null ? ((m.return = d), (V = m)) : i0(f);
            }
            u = u.sibling;
          }
        e: for (u = null, f = e; ;) {
          if (f.tag === 5) {
            if (u === null) {
              u = f;
              try {
                ((i = f.stateNode),
                  c
                    ? ((o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((s = f.stateNode),
                      (l = f.memoizedProps.style),
                      (a = l != null && l.hasOwnProperty("display") ? l.display : null),
                      (s.style.display = S0("display", a))));
              } catch (b) {
                Se(e, e.return, b);
              }
            }
          } else if (f.tag === 6) {
            if (u === null)
              try {
                f.stateNode.nodeValue = c ? "" : f.memoizedProps;
              } catch (b) {
                Se(e, e.return, b);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) || f.memoizedState === null || f === e) &&
            f.child !== null
          ) {
            ((f.child.return = f), (f = f.child));
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null;) {
            if (f.return === null || f.return === e) break e;
            (u === f && (u = null), (f = f.return));
          }
          (u === f && (u = null), (f.sibling.return = f.return), (f = f.sibling));
        }
      }
      break;
    case 19:
      (Gt(t, e), cn(e), 4 & r && n0(e));
      break;
    case 21:
      break;
    default:
      (Gt(t, e), cn(e));
  }
}
function cn(e) {
  var t = e.flags;
  if (2 & t) {
    try {
      e: {
        for (var n = e.return; n !== null;) {
          if (Kb(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(_(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          32 & r.flags && (ua(i, ""), (r.flags &= -33));
          var o = t0(e);
          Ed(e, o, i);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo,
            s = t0(e);
          Cd(e, s, a);
          break;
        default:
          throw Error(_(161));
      }
    } catch (l) {
      Se(e, e.return, l);
    }
    e.flags &= -3;
  }
  4096 & t && (e.flags &= -4097);
}
function QP(e, t, n) {
  ((V = e), Zb(e, t, n));
}
function Zb(e, t, n) {
  for (var r = (1 & e.mode) !== 0; V !== null;) {
    var i = V,
      o = i.child;
    if (i.tag === 22 && r) {
      var a = i.memoizedState !== null || tl;
      if (!a) {
        var s = i.alternate,
          l = (s !== null && s.memoizedState !== null) || nt;
        s = tl;
        var c = nt;
        if (((tl = a), (nt = l) && !c))
          for (V = i; V !== null;)
            ((a = V),
              (l = a.child),
              a.tag === 22 && a.memoizedState !== null
                ? o0(i)
                : l !== null
                  ? ((l.return = a), (V = l))
                  : o0(i));
        for (; o !== null;) ((V = o), Zb(o, t, n), (o = o.sibling));
        ((V = i), (tl = s), (nt = c));
      }
      r0(e, t, n);
    } else 8772 & i.subtreeFlags && o !== null ? ((o.return = i), (V = o)) : r0(e, t, n);
  }
}
function r0(e) {
  for (; V !== null;) {
    var t = V;
    if (8772 & t.flags) {
      var n = t.alternate;
      try {
        if (8772 & t.flags)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              nt || jl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (4 & t.flags && !nt)
                if (n === null) r.componentDidMount();
                else {
                  var i = t.elementType === t.type ? n.memoizedProps : Yt(t.type, n.memoizedProps);
                  r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var o = t.updateQueue;
              o !== null && Hy(t, o, r);
              break;
            case 3:
              var a = t.updateQueue;
              if (a !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Hy(t, a, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && 4 & t.flags) {
                n = s;
                var l = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    l.autoFocus && n.focus();
                    break;
                  case "img":
                    l.src && (n.src = l.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var c = t.alternate;
                if (c !== null) {
                  var u = c.memoizedState;
                  if (u !== null) {
                    var f = u.dehydrated;
                    f !== null && pa(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(_(163));
          }
        nt || (512 & t.flags && kd(t));
      } catch (d) {
        Se(t, t.return, d);
      }
    }
    if (t === e) {
      V = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (V = n));
      break;
    }
    V = t.return;
  }
}
function i0(e) {
  for (; V !== null;) {
    var t = V;
    if (t === e) {
      V = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (V = n));
      break;
    }
    V = t.return;
  }
}
function o0(e) {
  for (; V !== null;) {
    var t = V;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            jl(4, t);
          } catch (l) {
            Se(t, n, l);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (l) {
              Se(t, i, l);
            }
          }
          var o = t.return;
          try {
            kd(t);
          } catch (l) {
            Se(t, o, l);
          }
          break;
        case 5:
          var a = t.return;
          try {
            kd(t);
          } catch (l) {
            Se(t, a, l);
          }
      }
    } catch (l) {
      Se(t, t.return, l);
    }
    if (t === e) {
      V = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      ((s.return = t.return), (V = s));
      break;
    }
    V = t.return;
  }
}
var ZP = Math.ceil,
  Ll = On.ReactCurrentDispatcher,
  ch = On.ReactCurrentOwner,
  Ht = On.ReactCurrentBatchConfig,
  ee = 0,
  Ae = null,
  Pe = null,
  Ue = 0,
  Ct = 0,
  Oi = hr(0),
  Me = 0,
  Ea = null,
  Kr = 0,
  Xl = 0,
  uh = 0,
  sa = null,
  vt = null,
  fh = 0,
  Gi = 1 / 0,
  En = null,
  Ml = !1,
  Td = null,
  sr = null,
  nl = !1,
  tr = null,
  Ol = 0,
  la = 0,
  Id = null,
  ul = -1,
  fl = 0;
function st() {
  return 6 & ee ? Ee() : ul !== -1 ? ul : (ul = Ee());
}
function lr(e) {
  return 1 & e.mode
    ? 2 & ee && Ue !== 0
      ? Ue & -Ue
      : VP.transition !== null
        ? (fl === 0 && (fl = O0()), fl)
        : ((e = re), e !== 0 || ((e = F.event), (e = e === void 0 ? 16 : N0(e.type))), e)
    : 1;
}
function Zt(e, t, n, r) {
  if (50 < la) throw ((la = 0), (Id = null), Error(_(185)));
  (Ta(e, n, r),
    (2 & ee && e === Ae) ||
      (e === Ae && (!(2 & ee) && (Xl |= n), Me === 4 && Jn(e, Ue)),
      xt(e, r),
      n === 1 && ee === 0 && !(1 & t.mode) && ((Gi = Ee() + 500), $l && pr())));
}
function xt(e, t) {
  var n = e.callbackNode;
  DR(e, t);
  var r = gl(e, e === Ae ? Ue : 0);
  if (r === 0) (n !== null && hy(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && hy(n), t === 1))
      (e.tag === 0 ? OP(a0.bind(null, e)) : ab(a0.bind(null, e)),
        _P(function () {
          !(6 & ee) && pr();
        }),
        (n = null));
    else {
      switch (V0(r)) {
        case 1:
          n = Dd;
          break;
        case 4:
          n = L0;
          break;
        case 16:
          n = vl;
          break;
        case 536870912:
          n = M0;
          break;
        default:
          n = vl;
      }
      n = ax(n, Jb.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function Jb(e, t) {
  if (((ul = -1), (fl = 0), 6 & ee)) throw Error(_(327));
  var n = e.callbackNode;
  if (Hi() && e.callbackNode !== n) return null;
  var r = gl(e, e === Ae ? Ue : 0);
  if (r === 0) return null;
  if (30 & r || r & e.expiredLanes || t) t = Vl(e, r);
  else {
    t = r;
    var i = ee;
    ee |= 2;
    var o = tx();
    (Ae === e && Ue === t) || ((En = null), (Gi = Ee() + 500), Ur(e, t));
    do
      try {
        t_();
        break;
      } catch (s) {
        ex(e, s);
      }
    while (1);
    (qd(), (Ll.current = o), (ee = i), Pe !== null ? (t = 0) : ((Ae = null), (Ue = 0), (t = Me)));
  }
  if (t !== 0) {
    if ((t === 2 && ((i = td(e)), i !== 0 && ((r = i), (t = Rd(e, i)))), t === 1))
      throw ((n = Ea), Ur(e, 0), Jn(e, r), xt(e, Ee()), n);
    if (t === 6) Jn(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(30 & r) &&
          !JP(i) &&
          ((t = Vl(e, r)), t === 2 && ((o = td(e)), o !== 0 && ((r = o), (t = Rd(e, o)))), t === 1))
      )
        throw ((n = Ea), Ur(e, 0), Jn(e, r), xt(e, Ee()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(_(345));
        case 2:
          Hr(e, vt, En);
          break;
        case 3:
          if ((Jn(e, r), (130023424 & r) === r && ((t = fh + 500 - Ee()), 10 < t))) {
            if (gl(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              (st(), (e.pingedLanes |= e.suspendedLanes & i));
              break;
            }
            e.timeoutHandle = cd(Hr.bind(null, e, vt, En), t);
            break;
          }
          Hr(e, vt, En);
          break;
        case 4:
          if ((Jn(e, r), (4194240 & r) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r;) {
            var a = 31 - Qt(r);
            ((o = 1 << a), (a = t[a]), a > i && (i = a), (r &= ~o));
          }
          if (
            ((r = i),
            (r = Ee() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * ZP(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = cd(Hr.bind(null, e, vt, En), r);
            break;
          }
          Hr(e, vt, En);
          break;
        case 5:
          Hr(e, vt, En);
          break;
        default:
          throw Error(_(329));
      }
    }
  }
  return (xt(e, Ee()), e.callbackNode === n ? Jb.bind(null, e) : null);
}
function Rd(e, t) {
  var n = sa;
  return (
    e.current.memoizedState.isDehydrated && (Ur(e, t).flags |= 256),
    (e = Vl(e, t)),
    e !== 2 && ((t = vt), (vt = n), t !== null && Pd(t)),
    e
  );
}
function Pd(e) {
  vt === null ? (vt = e) : vt.push.apply(vt, e);
}
function JP(e) {
  for (var t = e; ;) {
    if (16384 & t.flags) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!Jt(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), 16384 & t.subtreeFlags && n !== null)) ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function Jn(e, t) {
  for (
    t &= ~uh, t &= ~Xl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
    0 < t;
  ) {
    var n = 31 - Qt(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function a0(e) {
  if (6 & ee) throw Error(_(327));
  Hi();
  var t = gl(e, 0);
  if (!(1 & t)) return (xt(e, Ee()), null);
  var n = Vl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = td(e);
    r !== 0 && ((t = r), (n = Rd(e, r)));
  }
  if (n === 1) throw ((n = Ea), Ur(e, 0), Jn(e, t), xt(e, Ee()), n);
  if (n === 6) throw Error(_(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Hr(e, vt, En),
    xt(e, Ee()),
    null
  );
}
function dh(e, t) {
  var n = ee;
  ee |= 1;
  try {
    return e(t);
  } finally {
    ((ee = n), ee === 0 && ((Gi = Ee() + 500), $l && pr()));
  }
}
function qr(e) {
  tr !== null && tr.tag === 0 && !(6 & ee) && Hi();
  var t = ee;
  ee |= 1;
  var n = Ht.transition,
    r = re;
  try {
    if (((Ht.transition = null), (re = 1), e)) return e();
  } finally {
    ((re = r), (Ht.transition = n), (ee = t), !(6 & ee) && pr());
  }
}
function hh() {
  ((Ct = Oi.current), ue(Oi));
}
function Ur(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), PP(n)), Pe !== null))
    for (n = Pe.return; n !== null;) {
      var r = n;
      switch ((Gd(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && wl());
          break;
        case 3:
          (ji(), ue(yt), ue(rt), nh());
          break;
        case 5:
          th(r);
          break;
        case 4:
          ji();
          break;
        case 13:
          ue(ve);
          break;
        case 19:
          ue(ve);
          break;
        case 10:
          Qd(r.type._context);
          break;
        case 22:
        case 23:
          hh();
      }
      n = n.return;
    }
  if (
    ((Ae = e),
    (Pe = e = cr(e.current, null)),
    (Ue = Ct = t),
    (Me = 0),
    (Ea = null),
    (uh = Xl = Kr = 0),
    (vt = sa = null),
    $r !== null)
  ) {
    for (t = 0; t < $r.length; t++)
      if (((n = $r[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var a = o.next;
          ((o.next = i), (r.next = a));
        }
        n.pending = r;
      }
    $r = null;
  }
  return e;
}
function ex(e, t) {
  do {
    var n = Pe;
    try {
      if ((qd(), (sl.current = Fl), _l)) {
        for (var r = ge.memoizedState; r !== null;) {
          var i = r.queue;
          (i !== null && (i.pending = null), (r = r.next));
        }
        _l = !1;
      }
      if (
        ((Yr = 0),
        (Ve = Le = ge = null),
        (oa = !1),
        (wa = 0),
        (ch.current = null),
        n === null || n.return === null)
      ) {
        ((Me = 1), (Ea = t), (Pe = null));
        break;
      }
      e: {
        var o = e,
          a = n.return,
          s = n,
          l = t;
        if (
          ((t = Ue),
          (s.flags |= 32768),
          l !== null && typeof l == "object" && typeof l.then == "function")
        ) {
          var c = l,
            u = s,
            f = u.tag;
          if (!(1 & u.mode) && (f === 0 || f === 11 || f === 15)) {
            var d = u.alternate;
            d
              ? ((u.updateQueue = d.updateQueue),
                (u.memoizedState = d.memoizedState),
                (u.lanes = d.lanes))
              : ((u.updateQueue = null), (u.memoizedState = null));
          }
          var m = Gy(a);
          if (m !== null) {
            ((m.flags &= -257), Yy(m, a, s, o, t), 1 & m.mode && Xy(o, c, t), (t = m), (l = c));
            var y = t.updateQueue;
            if (y === null) {
              var b = new Set();
              (b.add(l), (t.updateQueue = b));
            } else y.add(l);
            break e;
          }
          if (!(1 & t)) {
            (Xy(o, c, t), ph());
            break e;
          }
          l = Error(_(426));
        } else if (de && 1 & s.mode) {
          var S = Gy(a);
          if (S !== null) {
            (!(65536 & S.flags) && (S.flags |= 256), Yy(S, a, s, o, t), Yd(Xi(l, s)));
            break e;
          }
        }
        ((o = l = Xi(l, s)), Me !== 4 && (Me = 2), sa === null ? (sa = [o]) : sa.push(o), (o = a));
        do {
          switch (o.tag) {
            case 3:
              ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
              var h = Ab(o, l, t);
              zy(o, h);
              break e;
            case 1:
              s = l;
              var v = o.type,
                g = o.stateNode;
              if (
                !(128 & o.flags) &&
                (typeof v.getDerivedStateFromError == "function" ||
                  (g !== null &&
                    typeof g.componentDidCatch == "function" &&
                    (sr === null || !sr.has(g))))
              ) {
                ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                var x = Db(o, s, t);
                zy(o, x);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      rx(n);
    } catch (k) {
      ((t = k), Pe === n && n !== null && (Pe = n = n.return));
      continue;
    }
    break;
  } while (1);
}
function tx() {
  var e = Ll.current;
  return ((Ll.current = Fl), e === null ? Fl : e);
}
function ph() {
  ((Me !== 0 && Me !== 3 && Me !== 2) || (Me = 4),
    Ae === null || (!(268435455 & Kr) && !(268435455 & Xl)) || Jn(Ae, Ue));
}
function Vl(e, t) {
  var n = ee;
  ee |= 2;
  var r = tx();
  (Ae === e && Ue === t) || ((En = null), Ur(e, t));
  do
    try {
      e_();
      break;
    } catch (i) {
      ex(e, i);
    }
  while (1);
  if ((qd(), (ee = n), (Ll.current = r), Pe !== null)) throw Error(_(261));
  return ((Ae = null), (Ue = 0), Me);
}
function e_() {
  for (; Pe !== null;) nx(Pe);
}
function t_() {
  for (; Pe !== null && !RR();) nx(Pe);
}
function nx(e) {
  var t = ox(e.alternate, e, Ct);
  ((e.memoizedProps = e.pendingProps), t === null ? rx(e) : (Pe = t), (ch.current = null));
}
function rx(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), 32768 & t.flags)) {
      if (((n = YP(n, t)), n !== null)) {
        ((n.flags &= 32767), (Pe = n));
        return;
      }
      if (e === null) {
        ((Me = 6), (Pe = null));
        return;
      }
      ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
    } else if (((n = GP(n, t, Ct)), n !== null)) {
      Pe = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Pe = t;
      return;
    }
    Pe = t = e;
  } while (t !== null);
  Me === 0 && (Me = 5);
}
function Hr(e, t, n) {
  var r = re,
    i = Ht.transition;
  try {
    ((Ht.transition = null), (re = 1), n_(e, t, n, r));
  } finally {
    ((Ht.transition = i), (re = r));
  }
  return null;
}
function n_(e, t, n, r) {
  do Hi();
  while (tr !== null);
  if (6 & ee) throw Error(_(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(_(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var o = n.lanes | n.childLanes;
  if (
    (BR(e, o),
    e === Ae && ((Pe = Ae = null), (Ue = 0)),
    (!(2064 & n.subtreeFlags) && !(2064 & n.flags)) ||
      nl ||
      ((nl = !0),
      ax(vl, function () {
        return (Hi(), null);
      })),
    (o = (15990 & n.flags) !== 0),
    15990 & n.subtreeFlags || o)
  ) {
    ((o = Ht.transition), (Ht.transition = null));
    var a = re;
    re = 1;
    var s = ee;
    ((ee |= 4),
      (ch.current = null),
      qP(e, n),
      Qb(n, e),
      CP(sd),
      (yl = !!ad),
      (sd = ad = null),
      (e.current = n),
      QP(n, e, i),
      PR(),
      (ee = s),
      (re = a),
      (Ht.transition = o));
  } else e.current = n;
  if (
    (nl && ((nl = !1), (tr = e), (Ol = i)),
    (o = e.pendingLanes),
    o === 0 && (sr = null),
    LR(n.stateNode, r),
    xt(e, Ee()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest }));
  if (Ml) throw ((Ml = !1), (e = Td), (Td = null), e);
  return (
    1 & Ol && e.tag !== 0 && Hi(),
    (o = e.pendingLanes),
    1 & o ? (e === Id ? la++ : ((la = 0), (Id = e))) : (la = 0),
    pr(),
    null
  );
}
function Hi() {
  if (tr !== null) {
    var e = V0(Ol),
      t = Ht.transition,
      n = re;
    try {
      if (((Ht.transition = null), (re = 16 > e ? 16 : e), tr === null)) var r = !1;
      else {
        if (((e = tr), (tr = null), (Ol = 0), 6 & ee)) throw Error(_(331));
        var i = ee;
        for (ee |= 4, V = e.current; V !== null;) {
          var o = V,
            a = o.child;
          if (16 & V.flags) {
            var s = o.deletions;
            if (s !== null) {
              for (var l = 0; l < s.length; l++) {
                var c = s[l];
                for (V = c; V !== null;) {
                  var u = V;
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      aa(8, u, o);
                  }
                  var f = u.child;
                  if (f !== null) ((f.return = u), (V = f));
                  else
                    for (; V !== null;) {
                      u = V;
                      var d = u.sibling,
                        m = u.return;
                      if ((Yb(u), u === c)) {
                        V = null;
                        break;
                      }
                      if (d !== null) {
                        ((d.return = m), (V = d));
                        break;
                      }
                      V = m;
                    }
                }
              }
              var y = o.alternate;
              if (y !== null) {
                var b = y.child;
                if (b !== null) {
                  y.child = null;
                  do {
                    var S = b.sibling;
                    ((b.sibling = null), (b = S));
                  } while (b !== null);
                }
              }
              V = o;
            }
          }
          if (2064 & o.subtreeFlags && a !== null) ((a.return = o), (V = a));
          else
            e: for (; V !== null;) {
              if (((o = V), 2048 & o.flags))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    aa(9, o, o.return);
                }
              var h = o.sibling;
              if (h !== null) {
                ((h.return = o.return), (V = h));
                break e;
              }
              V = o.return;
            }
        }
        var v = e.current;
        for (V = v; V !== null;) {
          a = V;
          var g = a.child;
          if (2064 & a.subtreeFlags && g !== null) ((g.return = a), (V = g));
          else
            e: for (a = v; V !== null;) {
              if (((s = V), 2048 & s.flags))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      jl(9, s);
                  }
                } catch (k) {
                  Se(s, s.return, k);
                }
              if (s === a) {
                V = null;
                break e;
              }
              var x = s.sibling;
              if (x !== null) {
                ((x.return = s.return), (V = x));
                break e;
              }
              V = s.return;
            }
        }
        if (((ee = i), pr(), dn && typeof dn.onPostCommitFiberRoot == "function"))
          try {
            dn.onPostCommitFiberRoot(Dl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((re = n), (Ht.transition = t));
    }
  }
  return !1;
}
function s0(e, t, n) {
  ((t = Xi(n, t)),
    (t = Ab(e, t, 1)),
    (e = ar(e, t, 1)),
    (t = st()),
    e !== null && (Ta(e, 1, t), xt(e, t)));
}
function Se(e, t, n) {
  if (e.tag === 3) s0(e, e, n);
  else
    for (; t !== null;) {
      if (t.tag === 3) {
        s0(t, e, n);
        break;
      }
      if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" && (sr === null || !sr.has(r)))
        ) {
          ((e = Xi(n, e)),
            (e = Db(t, e, 1)),
            (t = ar(t, e, 1)),
            (e = st()),
            t !== null && (Ta(t, 1, e), xt(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function r_(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = st()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Ae === e &&
      (Ue & n) === n &&
      (Me === 4 || (Me === 3 && (130023424 & Ue) === Ue && 500 > Ee() - fh) ? Ur(e, 0) : (uh |= n)),
    xt(e, t));
}
function ix(e, t) {
  t === 0 && (1 & e.mode ? ((t = $s), ($s <<= 1), !(130023424 & $s) && ($s = 4194304)) : (t = 1));
  var n = st();
  ((e = Ln(e, t)), e !== null && (Ta(e, t, n), xt(e, n)));
}
function i_(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), ix(e, n));
}
function o_(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(_(314));
  }
  (r !== null && r.delete(t), ix(e, n));
}
var ox;
ox = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || yt.current) gt = !0;
    else {
      if (!(e.lanes & n) && !(128 & t.flags)) return ((gt = !1), XP(e, t, n));
      gt = (131072 & e.flags) !== 0;
    }
  else ((gt = !1), de && 1048576 & t.flags && sb(t, El, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (cl(e, t), (e = t.pendingProps));
      var i = $i(t, rt.current);
      (zi(t, n), (i = ih(null, t, r, e, i, n)));
      var o = oh();
      return (
        (t.flags |= 1),
        typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            bt(r) ? ((o = !0), kl(t)) : (o = !1),
            (t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
            Jd(t),
            (i.updater = Wl),
            (t.stateNode = i),
            (i._reactInternals = t),
            vd(t, r, e, n),
            (t = bd(null, t, r, !0, o, n)))
          : ((t.tag = 0), de && o && Xd(t), at(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (cl(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = s_(r)),
          (e = Yt(r, e)),
          i)
        ) {
          case 0:
            t = yd(null, t, r, e, n);
            break e;
          case 1:
            t = Qy(null, t, r, e, n);
            break e;
          case 11:
            t = Ky(null, t, r, e, n);
            break e;
          case 14:
            t = qy(null, t, r, Yt(r.type, e), n);
            break e;
        }
        throw Error(_(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Yt(r, i)),
        yd(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Yt(r, i)),
        Qy(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((Nb(t), e === null)) throw Error(_(387));
        ((r = t.pendingProps), (o = t.memoizedState), (i = o.element), fb(e, t), Rl(t, r, null, n));
        var a = t.memoizedState;
        if (((r = a.element), o.isDehydrated)) {
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: a.cache,
              pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
              transitions: a.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            256 & t.flags)
          ) {
            ((i = Xi(Error(_(423)), t)), (t = Zy(e, t, r, n, i)));
            break e;
          }
          if (r !== i) {
            ((i = Xi(Error(_(424)), t)), (t = Zy(e, t, r, n, i)));
            break e;
          }
          for (
            Et = or(t.stateNode.containerInfo.firstChild),
              Tt = t,
              de = !0,
              qt = null,
              n = mb(t, null, r, n),
              t.child = n;
            n;
          )
            ((n.flags = (-3 & n.flags) | 4096), (n = n.sibling));
        } else {
          if ((Wi(), r === i)) {
            t = Mn(e, t, n);
            break e;
          }
          at(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        vb(t),
        e === null && hd(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (a = i.children),
        ld(r, i) ? (a = null) : o !== null && ld(r, o) && (t.flags |= 32),
        Hb(e, t),
        at(e, t, a, n),
        t.child
      );
    case 6:
      return (e === null && hd(t), null);
    case 13:
      return $b(e, t, n);
    case 4:
      return (
        eh(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Ui(t, null, r, n)) : at(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Yt(r, i)),
        Ky(e, t, r, i, n)
      );
    case 7:
      return (at(e, t, t.pendingProps, n), t.child);
    case 8:
      return (at(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (at(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (a = i.value),
          oe(Tl, r._currentValue),
          (r._currentValue = a),
          o !== null)
        )
          if (Jt(o.value, a)) {
            if (o.children === i.children && !yt.current) {
              t = Mn(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null;) {
              var s = o.dependencies;
              if (s !== null) {
                a = o.child;
                for (var l = s.firstContext; l !== null;) {
                  if (l.context === r) {
                    if (o.tag === 1) {
                      ((l = Pn(-1, n & -n)), (l.tag = 2));
                      var c = o.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var u = c.pending;
                        (u === null ? (l.next = l) : ((l.next = u.next), (u.next = l)),
                          (c.pending = l));
                      }
                    }
                    ((o.lanes |= n),
                      (l = o.alternate),
                      l !== null && (l.lanes |= n),
                      pd(o.return, n, t),
                      (s.lanes |= n));
                    break;
                  }
                  l = l.next;
                }
              } else if (o.tag === 10) a = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((a = o.return), a === null)) throw Error(_(341));
                ((a.lanes |= n),
                  (s = a.alternate),
                  s !== null && (s.lanes |= n),
                  pd(a, n, t),
                  (a = o.sibling));
              } else a = o.child;
              if (a !== null) a.return = o;
              else
                for (a = o; a !== null;) {
                  if (a === t) {
                    a = null;
                    break;
                  }
                  if (((o = a.sibling), o !== null)) {
                    ((o.return = a.return), (a = o));
                    break;
                  }
                  a = a.return;
                }
              o = a;
            }
        (at(e, t, i.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        zi(t, n),
        (i = Nt(i)),
        (r = r(i)),
        (t.flags |= 1),
        at(e, t, r, n),
        t.child
      );
    case 14:
      return ((r = t.type), (i = Yt(r, t.pendingProps)), (i = Yt(r.type, i)), qy(e, t, r, i, n));
    case 15:
      return Bb(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Yt(r, i)),
        cl(e, t),
        (t.tag = 1),
        bt(r) ? ((e = !0), kl(t)) : (e = !1),
        zi(t, n),
        hb(t, r, i),
        vd(t, r, i, n),
        bd(null, t, r, !0, e, n)
      );
    case 19:
      return Wb(e, t, n);
    case 22:
      return zb(e, t, n);
  }
  throw Error(_(156, t.tag));
};
function ax(e, t) {
  return F0(e, t);
}
function a_(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function zt(e, t, n, r) {
  return new a_(e, t, n, r);
}
function mh(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function s_(e) {
  if (typeof e == "function") return mh(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Od)) return 11;
    if (e === Vd) return 14;
  }
  return 2;
}
function cr(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = zt(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = 14680064 & e.flags),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function dl(e, t, n, r, i, o) {
  var a = 2;
  if (((r = e), typeof e == "function")) mh(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else
    e: switch (e) {
      case Ci:
        return jr(n.children, i, o, t);
      case Md:
        ((a = 8), (i |= 8));
        break;
      case Hf:
        return ((e = zt(12, n, t, 2 | i)), (e.elementType = Hf), (e.lanes = o), e);
      case Nf:
        return ((e = zt(13, n, t, i)), (e.elementType = Nf), (e.lanes = o), e);
      case $f:
        return ((e = zt(19, n, t, i)), (e.elementType = $f), (e.lanes = o), e);
      case p0:
        return Gl(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case d0:
              a = 10;
              break e;
            case h0:
              a = 9;
              break e;
            case Od:
              a = 11;
              break e;
            case Vd:
              a = 14;
              break e;
            case qn:
              ((a = 16), (r = null));
              break e;
          }
        throw Error(_(130, e == null ? e : typeof e, ""));
    }
  return ((t = zt(a, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t);
}
function jr(e, t, n, r) {
  return ((e = zt(7, e, r, t)), (e.lanes = n), e);
}
function Gl(e, t, n, r) {
  return (
    (e = zt(22, e, r, t)),
    (e.elementType = p0),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Df(e, t, n) {
  return ((e = zt(6, e, null, t)), (e.lanes = n), e);
}
function Bf(e, t, n) {
  return (
    (t = zt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function l_(e, t, n, r, i) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Sf(0)),
    (this.expirationTimes = Sf(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Sf(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null));
}
function vh(e, t, n, r, i, o, a, s, l) {
  return (
    (e = new l_(e, t, n, s, l)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = zt(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Jd(o),
    e
  );
}
function c_(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: ki,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function sx(e) {
  if (!e) return fr;
  e = e._reactInternals;
  e: {
    if (Zr(e) !== e || e.tag !== 1) throw Error(_(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (bt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(_(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (bt(n)) return ob(e, n, t);
  }
  return t;
}
function lx(e, t, n, r, i, o, a, s, l) {
  return (
    (e = vh(n, r, !0, e, i, o, a, s, l)),
    (e.context = sx(null)),
    (n = e.current),
    (r = st()),
    (i = lr(n)),
    (o = Pn(r, i)),
    (o.callback = t ?? null),
    ar(n, o, i),
    (e.current.lanes = i),
    Ta(e, i, r),
    xt(e, r),
    e
  );
}
function Yl(e, t, n, r) {
  var i = t.current,
    o = st(),
    a = lr(i);
  return (
    (n = sx(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Pn(o, a)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = ar(i, t, a)),
    e !== null && (Zt(e, i, a, o), al(e, i, a)),
    a
  );
}
function Al(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function l0(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function gh(e, t) {
  (l0(e, t), (e = e.alternate) && l0(e, t));
}
function u_() {
  return null;
}
var cx =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function yh(e) {
  this._internalRoot = e;
}
Kl.prototype.render = yh.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(_(409));
  Yl(e, t, null, null);
};
Kl.prototype.unmount = yh.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (qr(function () {
      Yl(null, e, null, null);
    }),
      (t[Fn] = null));
  }
};
function Kl(e) {
  this._internalRoot = e;
}
Kl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = B0();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Zn.length && t !== 0 && t < Zn[n].priority; n++);
    (Zn.splice(n, 0, e), n === 0 && H0(e));
  }
};
function bh(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ql(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function c0() {}
function f_(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var c = Al(a);
        o.call(c);
      };
    }
    var a = lx(t, r, e, 0, null, !1, !1, "", c0);
    return (
      (e._reactRootContainer = a),
      (e[Fn] = a.current),
      ga(e.nodeType === 8 ? e.parentNode : e),
      qr(),
      a
    );
  }
  for (; (i = e.lastChild);) e.removeChild(i);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var c = Al(l);
      s.call(c);
    };
  }
  var l = vh(e, 0, !1, null, null, !1, !1, "", c0);
  return (
    (e._reactRootContainer = l),
    (e[Fn] = l.current),
    ga(e.nodeType === 8 ? e.parentNode : e),
    qr(function () {
      Yl(t, l, n, r);
    }),
    l
  );
}
function Ql(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof i == "function") {
      var s = i;
      i = function () {
        var l = Al(a);
        s.call(l);
      };
    }
    Yl(t, a, e, i);
  } else a = f_(n, t, e, i, r);
  return Al(a);
}
A0 = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Zo(t.pendingLanes);
        n !== 0 && (Bd(t, 1 | n), xt(t, Ee()), !(6 & ee) && ((Gi = Ee() + 500), pr()));
      }
      break;
    case 13:
      (qr(function () {
        var r = Ln(e, 1);
        if (r !== null) {
          var i = st();
          Zt(r, e, 1, i);
        }
      }),
        gh(e, 1));
  }
};
zd = function (e) {
  if (e.tag === 13) {
    var t = Ln(e, 134217728);
    if (t !== null) {
      var n = st();
      Zt(t, e, 134217728, n);
    }
    gh(e, 134217728);
  }
};
D0 = function (e) {
  if (e.tag === 13) {
    var t = lr(e),
      n = Ln(e, t);
    if (n !== null) {
      var r = st();
      Zt(n, e, t, r);
    }
    gh(e, t);
  }
};
B0 = function () {
  return re;
};
z0 = function (e, t) {
  var n = re;
  try {
    return ((re = e), t());
  } finally {
    re = n;
  }
};
Zf = function (e, t, n) {
  switch (t) {
    case "input":
      if ((jf(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode;) n = n.parentNode;
        for (
          n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Nl(r);
            if (!i) throw Error(_(90));
            (v0(r), jf(r, i));
          }
        }
      }
      break;
    case "textarea":
      y0(e, n);
      break;
    case "select":
      ((t = n.value), t != null && Vi(e, !!n.multiple, t, !1));
  }
};
E0 = dh;
T0 = qr;
var d_ = { usingClientEntryPoint: !1, Events: [Ra, Ri, Nl, k0, C0, dh] },
  Yo = {
    findFiberByHostInstance: Nr,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  h_ = {
    bundleType: Yo.bundleType,
    version: Yo.version,
    rendererPackageName: Yo.rendererPackageName,
    rendererConfig: Yo.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: On.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = P0(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Yo.findFiberByHostInstance || u_,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
  ((Ko = __REACT_DEVTOOLS_GLOBAL_HOOK__), !Ko.isDisabled && Ko.supportsFiber)
)
  try {
    ((Dl = Ko.inject(h_)), (dn = Ko));
  } catch {}
var Ko;
Rt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = d_;
Rt.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!bh(t)) throw Error(_(200));
  return c_(e, t, null, n);
};
Rt.createRoot = function (e, t) {
  if (!bh(e)) throw Error(_(299));
  var n = !1,
    r = "",
    i = cx;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = vh(e, 1, !1, null, null, n, !1, r, i)),
    (e[Fn] = t.current),
    ga(e.nodeType === 8 ? e.parentNode : e),
    new yh(t)
  );
};
Rt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(_(188))
      : ((e = Object.keys(e).join(",")), Error(_(268, e)));
  return ((e = P0(t)), (e = e === null ? null : e.stateNode), e);
};
Rt.flushSync = function (e) {
  return qr(e);
};
Rt.hydrate = function (e, t, n) {
  if (!ql(t)) throw Error(_(200));
  return Ql(null, e, t, !0, n);
};
Rt.hydrateRoot = function (e, t, n) {
  if (!bh(e)) throw Error(_(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = "",
    a = cx;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
    (t = lx(t, null, e, 1, n ?? null, i, !1, o, a)),
    (e[Fn] = t.current),
    ga(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i));
  return new Kl(t);
};
Rt.render = function (e, t, n) {
  if (!ql(t)) throw Error(_(200));
  return Ql(null, e, t, !1, n);
};
Rt.unmountComponentAtNode = function (e) {
  if (!ql(e)) throw Error(_(40));
  return (
    !!e._reactRootContainer &&
    (qr(function () {
      Ql(null, null, e, !1, function () {
        ((e._reactRootContainer = null), (e[Fn] = null));
      });
    }),
    !0)
  );
};
Rt.unstable_batchedUpdates = dh;
Rt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!ql(n)) throw Error(_(200));
  if (e == null || e._reactInternals === void 0) throw Error(_(38));
  return Ql(e, t, n, !1, r);
};
Rt.version = "18.2.0-next-9e3b772b8-20220608";
function ux() {
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function"
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ux);
    } catch (e) {
      console.error(e);
    }
}
ux();
var _t = Rt,
  xh = _t,
  p_ = _t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  m_ = _t.createPortal,
  v_ = _t.createRoot,
  g_ = _t.findDOMNode,
  y_ = _t.flushSync,
  b_ = _t.hydrate,
  x_ = _t.hydrateRoot,
  S_ = _t.render,
  w_ = _t.unmountComponentAtNode,
  k_ = _t.unstable_batchedUpdates,
  C_ = _t.unstable_renderSubtreeIntoContainer,
  E_ = _t.version;
var I_ = an({
    "../../../node_modules/hsluv/hsluv.js"(e, t) {
      var n = n || {};
      ((n.Geometry = function () {}),
        (n.Geometry.intersectLineLine = function (i, o) {
          var a = (i.intercept - o.intercept) / (o.slope - i.slope),
            s = i.slope * a + i.intercept;
          return { x: a, y: s };
        }),
        (n.Geometry.distanceFromOrigin = function (i) {
          return Math.sqrt(Math.pow(i.x, 2) + Math.pow(i.y, 2));
        }),
        (n.Geometry.distanceLineFromOrigin = function (i) {
          return Math.abs(i.intercept) / Math.sqrt(Math.pow(i.slope, 2) + 1);
        }),
        (n.Geometry.perpendicularThroughPoint = function (i, o) {
          var a = -1 / i.slope,
            s = o.y - a * o.x;
          return { slope: a, intercept: s };
        }),
        (n.Geometry.angleFromOrigin = function (i) {
          return Math.atan2(i.y, i.x);
        }),
        (n.Geometry.normalizeAngle = function (i) {
          var o = 2 * Math.PI;
          return ((i % o) + o) % o;
        }),
        (n.Geometry.lengthOfRayUntilIntersect = function (i, o) {
          return o.intercept / (Math.sin(i) - o.slope * Math.cos(i));
        }),
        (n.Hsluv = function () {}),
        (n.Hsluv.getBounds = function (i) {
          for (
            var o = [],
              a = Math.pow(i + 16, 3) / 1560896,
              s = a > n.Hsluv.epsilon ? a : i / n.Hsluv.kappa,
              l = 0;
            l < 3;
          )
            for (
              var c = l++, u = n.Hsluv.m[c][0], f = n.Hsluv.m[c][1], d = n.Hsluv.m[c][2], m = 0;
              m < 2;
            ) {
              var y = m++,
                b = (284517 * u - 94839 * d) * s,
                S = (838422 * d + 769860 * f + 731718 * u) * i * s - 769860 * y * i,
                h = (632260 * d - 126452 * f) * s + 126452 * y;
              o.push({ slope: b / h, intercept: S / h });
            }
          return o;
        }),
        (n.Hsluv.maxSafeChromaForL = function (i) {
          for (var o = n.Hsluv.getBounds(i), a = 1 / 0, s = 0; s < o.length;) {
            var l = o[s];
            ++s;
            var c = n.Geometry.distanceLineFromOrigin(l);
            a = Math.min(a, c);
          }
          return a;
        }),
        (n.Hsluv.maxChromaForLH = function (i, o) {
          for (
            var a = (o / 360) * Math.PI * 2, s = n.Hsluv.getBounds(i), l = 1 / 0, c = 0;
            c < s.length;
          ) {
            var u = s[c];
            ++c;
            var f = n.Geometry.lengthOfRayUntilIntersect(a, u);
            f >= 0 && (l = Math.min(l, f));
          }
          return l;
        }),
        (n.Hsluv.dotProduct = function (i, o) {
          for (var a = 0, s = 0, l = i.length; s < l;) {
            var c = s++;
            a += i[c] * o[c];
          }
          return a;
        }),
        (n.Hsluv.fromLinear = function (i) {
          return i <= 0.0031308 ? 12.92 * i : 1.055 * Math.pow(i, 0.4166666666666667) - 0.055;
        }),
        (n.Hsluv.toLinear = function (i) {
          return i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92;
        }),
        (n.Hsluv.xyzToRgb = function (i) {
          return [
            n.Hsluv.fromLinear(n.Hsluv.dotProduct(n.Hsluv.m[0], i)),
            n.Hsluv.fromLinear(n.Hsluv.dotProduct(n.Hsluv.m[1], i)),
            n.Hsluv.fromLinear(n.Hsluv.dotProduct(n.Hsluv.m[2], i)),
          ];
        }),
        (n.Hsluv.rgbToXyz = function (i) {
          var o = [n.Hsluv.toLinear(i[0]), n.Hsluv.toLinear(i[1]), n.Hsluv.toLinear(i[2])];
          return [
            n.Hsluv.dotProduct(n.Hsluv.minv[0], o),
            n.Hsluv.dotProduct(n.Hsluv.minv[1], o),
            n.Hsluv.dotProduct(n.Hsluv.minv[2], o),
          ];
        }),
        (n.Hsluv.yToL = function (i) {
          return i <= n.Hsluv.epsilon
            ? (i / n.Hsluv.refY) * n.Hsluv.kappa
            : 116 * Math.pow(i / n.Hsluv.refY, 0.3333333333333333) - 16;
        }),
        (n.Hsluv.lToY = function (i) {
          return i <= 8
            ? (n.Hsluv.refY * i) / n.Hsluv.kappa
            : n.Hsluv.refY * Math.pow((i + 16) / 116, 3);
        }),
        (n.Hsluv.xyzToLuv = function (i) {
          var o = i[0],
            a = i[1],
            s = i[2],
            l = o + 15 * a + 3 * s,
            c = 4 * o,
            u = 9 * a;
          l != 0 ? ((c /= l), (u /= l)) : ((c = NaN), (u = NaN));
          var f = n.Hsluv.yToL(a);
          if (f == 0) return [0, 0, 0];
          var d = 13 * f * (c - n.Hsluv.refU),
            m = 13 * f * (u - n.Hsluv.refV);
          return [f, d, m];
        }),
        (n.Hsluv.luvToXyz = function (i) {
          var o = i[0],
            a = i[1],
            s = i[2];
          if (o == 0) return [0, 0, 0];
          var l = a / (13 * o) + n.Hsluv.refU,
            c = s / (13 * o) + n.Hsluv.refV,
            u = n.Hsluv.lToY(o),
            f = 0 - (9 * u * l) / ((l - 4) * c - l * c),
            d = (9 * u - 15 * c * u - c * f) / (3 * c);
          return [f, u, d];
        }),
        (n.Hsluv.luvToLch = function (i) {
          var o = i[0],
            a = i[1],
            s = i[2],
            l = Math.sqrt(a * a + s * s),
            c;
          if (l < 1e-8) c = 0;
          else {
            var u = Math.atan2(s, a);
            ((c = (u * 180) / Math.PI), c < 0 && (c = 360 + c));
          }
          return [o, l, c];
        }),
        (n.Hsluv.lchToLuv = function (i) {
          var o = i[0],
            a = i[1],
            s = i[2],
            l = (s / 360) * 2 * Math.PI,
            c = Math.cos(l) * a,
            u = Math.sin(l) * a;
          return [o, c, u];
        }),
        (n.Hsluv.hsluvToLch = function (i) {
          var o = i[0],
            a = i[1],
            s = i[2];
          if (s > 99.9999999) return [100, 0, o];
          if (s < 1e-8) return [0, 0, o];
          var l = n.Hsluv.maxChromaForLH(s, o),
            c = (l / 100) * a;
          return [s, c, o];
        }),
        (n.Hsluv.lchToHsluv = function (i) {
          var o = i[0],
            a = i[1],
            s = i[2];
          if (o > 99.9999999) return [s, 0, 100];
          if (o < 1e-8) return [s, 0, 0];
          var l = n.Hsluv.maxChromaForLH(o, s),
            c = (a / l) * 100;
          return [s, c, o];
        }),
        (n.Hsluv.hpluvToLch = function (i) {
          var o = i[0],
            a = i[1],
            s = i[2];
          if (s > 99.9999999) return [100, 0, o];
          if (s < 1e-8) return [0, 0, o];
          var l = n.Hsluv.maxSafeChromaForL(s),
            c = (l / 100) * a;
          return [s, c, o];
        }),
        (n.Hsluv.lchToHpluv = function (i) {
          var o = i[0],
            a = i[1],
            s = i[2];
          if (o > 99.9999999) return [s, 0, 100];
          if (o < 1e-8) return [s, 0, 0];
          var l = n.Hsluv.maxSafeChromaForL(o),
            c = (a / l) * 100;
          return [s, c, o];
        }),
        (n.Hsluv.rgbToHex = function (i) {
          for (var o = "#", a = 0; a < 3;) {
            var s = a++,
              l = i[s],
              c = Math.round(l * 255),
              u = c % 16,
              f = ((c - u) / 16) | 0;
            o += n.Hsluv.hexChars.charAt(f) + n.Hsluv.hexChars.charAt(u);
          }
          return o;
        }),
        (n.Hsluv.hexToRgb = function (i) {
          i = i.toLowerCase();
          for (var o = [], a = 0; a < 3;) {
            var s = a++,
              l = n.Hsluv.hexChars.indexOf(i.charAt(s * 2 + 1)),
              c = n.Hsluv.hexChars.indexOf(i.charAt(s * 2 + 2)),
              u = l * 16 + c;
            o.push(u / 255);
          }
          return o;
        }),
        (n.Hsluv.lchToRgb = function (i) {
          return n.Hsluv.xyzToRgb(n.Hsluv.luvToXyz(n.Hsluv.lchToLuv(i)));
        }),
        (n.Hsluv.rgbToLch = function (i) {
          return n.Hsluv.luvToLch(n.Hsluv.xyzToLuv(n.Hsluv.rgbToXyz(i)));
        }),
        (n.Hsluv.hsluvToRgb = function (i) {
          return n.Hsluv.lchToRgb(n.Hsluv.hsluvToLch(i));
        }),
        (n.Hsluv.rgbToHsluv = function (i) {
          return n.Hsluv.lchToHsluv(n.Hsluv.rgbToLch(i));
        }),
        (n.Hsluv.hpluvToRgb = function (i) {
          return n.Hsluv.lchToRgb(n.Hsluv.hpluvToLch(i));
        }),
        (n.Hsluv.rgbToHpluv = function (i) {
          return n.Hsluv.lchToHpluv(n.Hsluv.rgbToLch(i));
        }),
        (n.Hsluv.hsluvToHex = function (i) {
          return n.Hsluv.rgbToHex(n.Hsluv.hsluvToRgb(i));
        }),
        (n.Hsluv.hpluvToHex = function (i) {
          return n.Hsluv.rgbToHex(n.Hsluv.hpluvToRgb(i));
        }),
        (n.Hsluv.hexToHsluv = function (i) {
          return n.Hsluv.rgbToHsluv(n.Hsluv.hexToRgb(i));
        }),
        (n.Hsluv.hexToHpluv = function (i) {
          return n.Hsluv.rgbToHpluv(n.Hsluv.hexToRgb(i));
        }),
        (n.Hsluv.m = [
          [3.240969941904521, -1.537383177570093, -0.498610760293],
          [-0.96924363628087, 1.87596750150772, 0.041555057407175],
          [0.055630079696993, -0.20397695888897, 1.056971514242878],
        ]),
        (n.Hsluv.minv = [
          [0.41239079926595, 0.35758433938387, 0.18048078840183],
          [0.21263900587151, 0.71516867876775, 0.072192315360733],
          [0.019330818715591, 0.11919477979462, 0.95053215224966],
        ]),
        (n.Hsluv.refY = 1),
        (n.Hsluv.refU = 0.19783000664283),
        (n.Hsluv.refV = 0.46831999493879),
        (n.Hsluv.kappa = 903.2962962),
        (n.Hsluv.epsilon = 0.0088564516),
        (n.Hsluv.hexChars = "0123456789abcdef"));
      var r = {
        hsluvToRgb: n.Hsluv.hsluvToRgb,
        rgbToHsluv: n.Hsluv.rgbToHsluv,
        hpluvToRgb: n.Hsluv.hpluvToRgb,
        rgbToHpluv: n.Hsluv.rgbToHpluv,
        hsluvToHex: n.Hsluv.hsluvToHex,
        hexToHsluv: n.Hsluv.hexToHsluv,
        hpluvToHex: n.Hsluv.hpluvToHex,
        hexToHpluv: n.Hsluv.hexToHpluv,
        lchToHpluv: n.Hsluv.lchToHpluv,
        hpluvToLch: n.Hsluv.hpluvToLch,
        lchToHsluv: n.Hsluv.lchToHsluv,
        hsluvToLch: n.Hsluv.hsluvToLch,
        lchToLuv: n.Hsluv.lchToLuv,
        luvToLch: n.Hsluv.luvToLch,
        xyzToLuv: n.Hsluv.xyzToLuv,
        luvToXyz: n.Hsluv.luvToXyz,
        xyzToRgb: n.Hsluv.xyzToRgb,
        rgbToXyz: n.Hsluv.rgbToXyz,
        lchToRgb: n.Hsluv.lchToRgb,
        rgbToLch: n.Hsluv.rgbToLch,
      };
      t.exports = r;
    },
  }),
  R_ = an({
    "../../../node_modules/eventemitter3/index.js"(e, t) {
      "use strict";
      var n = Object.prototype.hasOwnProperty,
        r = "~";
      function i() {}
      Object.create && ((i.prototype = Object.create(null)), new i().__proto__ || (r = !1));
      function o(c, u, f) {
        ((this.fn = c), (this.context = u), (this.once = f || !1));
      }
      function a(c, u, f, d, m) {
        if (typeof f != "function") throw new TypeError("The listener must be a function");
        var y = new o(f, d || c, m),
          b = r ? r + u : u;
        return (
          c._events[b]
            ? c._events[b].fn
              ? (c._events[b] = [c._events[b], y])
              : c._events[b].push(y)
            : ((c._events[b] = y), c._eventsCount++),
          c
        );
      }
      function s(c, u) {
        --c._eventsCount === 0 ? (c._events = new i()) : delete c._events[u];
      }
      function l() {
        ((this._events = new i()), (this._eventsCount = 0));
      }
      ((l.prototype.eventNames = function () {
        var u = [],
          f,
          d;
        if (this._eventsCount === 0) return u;
        for (d in (f = this._events)) n.call(f, d) && u.push(r ? d.slice(1) : d);
        return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(f)) : u;
      }),
        (l.prototype.listeners = function (u) {
          var f = r ? r + u : u,
            d = this._events[f];
          if (!d) return [];
          if (d.fn) return [d.fn];
          for (var m = 0, y = d.length, b = new Array(y); m < y; m++) b[m] = d[m].fn;
          return b;
        }),
        (l.prototype.listenerCount = function (u) {
          var f = r ? r + u : u,
            d = this._events[f];
          return d ? (d.fn ? 1 : d.length) : 0;
        }),
        (l.prototype.emit = function (u, f, d, m, y, b) {
          var S = r ? r + u : u;
          if (!this._events[S]) return !1;
          var h = this._events[S],
            v = arguments.length,
            g,
            x;
          if (h.fn) {
            switch ((h.once && this.removeListener(u, h.fn, void 0, !0), v)) {
              case 1:
                return (h.fn.call(h.context), !0);
              case 2:
                return (h.fn.call(h.context, f), !0);
              case 3:
                return (h.fn.call(h.context, f, d), !0);
              case 4:
                return (h.fn.call(h.context, f, d, m), !0);
              case 5:
                return (h.fn.call(h.context, f, d, m, y), !0);
              case 6:
                return (h.fn.call(h.context, f, d, m, y, b), !0);
            }
            for (x = 1, g = new Array(v - 1); x < v; x++) g[x - 1] = arguments[x];
            h.fn.apply(h.context, g);
          } else {
            var k = h.length,
              w;
            for (x = 0; x < k; x++)
              switch ((h[x].once && this.removeListener(u, h[x].fn, void 0, !0), v)) {
                case 1:
                  h[x].fn.call(h[x].context);
                  break;
                case 2:
                  h[x].fn.call(h[x].context, f);
                  break;
                case 3:
                  h[x].fn.call(h[x].context, f, d);
                  break;
                case 4:
                  h[x].fn.call(h[x].context, f, d, m);
                  break;
                default:
                  if (!g) for (w = 1, g = new Array(v - 1); w < v; w++) g[w - 1] = arguments[w];
                  h[x].fn.apply(h[x].context, g);
              }
          }
          return !0;
        }),
        (l.prototype.on = function (u, f, d) {
          return a(this, u, f, d, !1);
        }),
        (l.prototype.once = function (u, f, d) {
          return a(this, u, f, d, !0);
        }),
        (l.prototype.removeListener = function (u, f, d, m) {
          var y = r ? r + u : u;
          if (!this._events[y]) return this;
          if (!f) return (s(this, y), this);
          var b = this._events[y];
          if (b.fn) b.fn === f && (!m || b.once) && (!d || b.context === d) && s(this, y);
          else {
            for (var S = 0, h = [], v = b.length; S < v; S++)
              (b[S].fn !== f || (m && !b[S].once) || (d && b[S].context !== d)) && h.push(b[S]);
            h.length ? (this._events[y] = h.length === 1 ? h[0] : h) : s(this, y);
          }
          return this;
        }),
        (l.prototype.removeAllListeners = function (u) {
          var f;
          return (
            u
              ? ((f = r ? r + u : u), this._events[f] && s(this, f))
              : ((this._events = new i()), (this._eventsCount = 0)),
            this
          );
        }),
        (l.prototype.off = l.prototype.removeListener),
        (l.prototype.addListener = l.prototype.on),
        (l.prefixed = r),
        (l.EventEmitter = l),
        typeof t < "u" && (t.exports = l));
    },
  }),
  Zh = an({
    "../../../node_modules/process/browser.js"(e, t) {
      var n = (t.exports = {}),
        r,
        i;
      function o() {
        throw new Error("setTimeout has not been defined");
      }
      function a() {
        throw new Error("clearTimeout has not been defined");
      }
      (function () {
        try {
          typeof setTimeout == "function" ? (r = setTimeout) : (r = o);
        } catch {
          r = o;
        }
        try {
          typeof clearTimeout == "function" ? (i = clearTimeout) : (i = a);
        } catch {
          i = a;
        }
      })();
      function s(h) {
        if (r === setTimeout) return setTimeout(h, 0);
        if ((r === o || !r) && setTimeout) return ((r = setTimeout), setTimeout(h, 0));
        try {
          return r(h, 0);
        } catch {
          try {
            return r.call(null, h, 0);
          } catch {
            return r.call(this, h, 0);
          }
        }
      }
      function l(h) {
        if (i === clearTimeout) return clearTimeout(h);
        if ((i === a || !i) && clearTimeout) return ((i = clearTimeout), clearTimeout(h));
        try {
          return i(h);
        } catch {
          try {
            return i.call(null, h);
          } catch {
            return i.call(this, h);
          }
        }
      }
      var c = [],
        u = !1,
        f,
        d = -1;
      function m() {
        !u || !f || ((u = !1), f.length ? (c = f.concat(c)) : (d = -1), c.length && y());
      }
      function y() {
        if (!u) {
          var h = s(m);
          u = !0;
          for (var v = c.length; v;) {
            for (f = c, c = []; ++d < v;) f && f[d].run();
            ((d = -1), (v = c.length));
          }
          ((f = null), (u = !1), l(h));
        }
      }
      n.nextTick = function (h) {
        var v = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var g = 1; g < arguments.length; g++) v[g - 1] = arguments[g];
        (c.push(new b(h, v)), c.length === 1 && !u && s(y));
      };
      function b(h, v) {
        ((this.fun = h), (this.array = v));
      }
      ((b.prototype.run = function () {
        this.fun.apply(null, this.array);
      }),
        (n.title = "browser"),
        (n.browser = !0),
        (n.env = {}),
        (n.argv = []),
        (n.version = ""),
        (n.versions = {}));
      function S() {}
      ((n.on = S),
        (n.addListener = S),
        (n.once = S),
        (n.off = S),
        (n.removeListener = S),
        (n.removeAllListeners = S),
        (n.emit = S),
        (n.prependListener = S),
        (n.prependOnceListener = S),
        (n.listeners = function (h) {
          return [];
        }),
        (n.binding = function (h) {
          throw new Error("process.binding is not supported");
        }),
        (n.cwd = function () {
          return "/";
        }),
        (n.chdir = function (h) {
          throw new Error("process.chdir is not supported");
        }),
        (n.umask = function () {
          return 0;
        }));
    },
  }),
  P_ = an({
    "../../../node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.production.min.js"(
      e
    ) {
      "use strict";
      var t = typeof Symbol == "function" && Symbol.for,
        n = t ? Symbol.for("react.element") : 60103,
        r = t ? Symbol.for("react.portal") : 60106,
        i = t ? Symbol.for("react.fragment") : 60107,
        o = t ? Symbol.for("react.strict_mode") : 60108,
        a = t ? Symbol.for("react.profiler") : 60114,
        s = t ? Symbol.for("react.provider") : 60109,
        l = t ? Symbol.for("react.context") : 60110,
        c = t ? Symbol.for("react.async_mode") : 60111,
        u = t ? Symbol.for("react.concurrent_mode") : 60111,
        f = t ? Symbol.for("react.forward_ref") : 60112,
        d = t ? Symbol.for("react.suspense") : 60113,
        m = t ? Symbol.for("react.suspense_list") : 60120,
        y = t ? Symbol.for("react.memo") : 60115,
        b = t ? Symbol.for("react.lazy") : 60116,
        S = t ? Symbol.for("react.block") : 60121,
        h = t ? Symbol.for("react.fundamental") : 60117,
        v = t ? Symbol.for("react.responder") : 60118,
        g = t ? Symbol.for("react.scope") : 60119;
      function x(w) {
        if (typeof w == "object" && w !== null) {
          var E = w.$$typeof;
          switch (E) {
            case n:
              switch (((w = w.type), w)) {
                case c:
                case u:
                case i:
                case a:
                case o:
                case d:
                  return w;
                default:
                  switch (((w = w && w.$$typeof), w)) {
                    case l:
                    case f:
                    case b:
                    case y:
                    case s:
                      return w;
                    default:
                      return E;
                  }
              }
            case r:
              return E;
          }
        }
      }
      function k(w) {
        return x(w) === u;
      }
      ((e.AsyncMode = c),
        (e.ConcurrentMode = u),
        (e.ContextConsumer = l),
        (e.ContextProvider = s),
        (e.Element = n),
        (e.ForwardRef = f),
        (e.Fragment = i),
        (e.Lazy = b),
        (e.Memo = y),
        (e.Portal = r),
        (e.Profiler = a),
        (e.StrictMode = o),
        (e.Suspense = d),
        (e.isAsyncMode = function (w) {
          return k(w) || x(w) === c;
        }),
        (e.isConcurrentMode = k),
        (e.isContextConsumer = function (w) {
          return x(w) === l;
        }),
        (e.isContextProvider = function (w) {
          return x(w) === s;
        }),
        (e.isElement = function (w) {
          return typeof w == "object" && w !== null && w.$$typeof === n;
        }),
        (e.isForwardRef = function (w) {
          return x(w) === f;
        }),
        (e.isFragment = function (w) {
          return x(w) === i;
        }),
        (e.isLazy = function (w) {
          return x(w) === b;
        }),
        (e.isMemo = function (w) {
          return x(w) === y;
        }),
        (e.isPortal = function (w) {
          return x(w) === r;
        }),
        (e.isProfiler = function (w) {
          return x(w) === a;
        }),
        (e.isStrictMode = function (w) {
          return x(w) === o;
        }),
        (e.isSuspense = function (w) {
          return x(w) === d;
        }),
        (e.isValidElementType = function (w) {
          return (
            typeof w == "string" ||
            typeof w == "function" ||
            w === i ||
            w === u ||
            w === a ||
            w === o ||
            w === d ||
            w === m ||
            (typeof w == "object" &&
              w !== null &&
              (w.$$typeof === b ||
                w.$$typeof === y ||
                w.$$typeof === s ||
                w.$$typeof === l ||
                w.$$typeof === f ||
                w.$$typeof === h ||
                w.$$typeof === v ||
                w.$$typeof === g ||
                w.$$typeof === S))
          );
        }),
        (e.typeOf = x));
    },
  }),
  __ = an({
    "../../../node_modules/hoist-non-react-statics/node_modules/react-is/index.js"(e, t) {
      "use strict";
      t.exports = P_();
    },
  }),
  Ic = an({
    "../../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"(e, t) {
      "use strict";
      var n = __(),
        r = {
          childContextTypes: !0,
          contextType: !0,
          contextTypes: !0,
          defaultProps: !0,
          displayName: !0,
          getDefaultProps: !0,
          getDerivedStateFromError: !0,
          getDerivedStateFromProps: !0,
          mixins: !0,
          propTypes: !0,
          type: !0,
        },
        i = {
          name: !0,
          length: !0,
          prototype: !0,
          caller: !0,
          callee: !0,
          arguments: !0,
          arity: !0,
        },
        o = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 },
        a = {
          $$typeof: !0,
          compare: !0,
          defaultProps: !0,
          displayName: !0,
          propTypes: !0,
          type: !0,
        },
        s = {};
      ((s[n.ForwardRef] = o), (s[n.Memo] = a));
      function l(S) {
        return n.isMemo(S) ? a : s[S.$$typeof] || r;
      }
      var c = Object.defineProperty,
        u = Object.getOwnPropertyNames,
        f = Object.getOwnPropertySymbols,
        d = Object.getOwnPropertyDescriptor,
        m = Object.getPrototypeOf,
        y = Object.prototype;
      function b(S, h, v) {
        if (typeof h != "string") {
          if (y) {
            var g = m(h);
            g && g !== y && b(S, g, v);
          }
          var x = u(h);
          f && (x = x.concat(f(h)));
          for (var k = l(S), w = l(h), E = 0; E < x.length; ++E) {
            var C = x[E];
            if (!i[C] && !(v && v[C]) && !(w && w[C]) && !(k && k[C])) {
              var I = d(h, C);
              try {
                c(S, C, I);
              } catch {}
            }
          }
        }
        return S;
      }
      t.exports = b;
    },
  }),
  F_ = an({
    "../../../node_modules/fontfaceobserver/fontfaceobserver.standalone.js"(e, t) {
      (function () {
        function n(h, v) {
          document.addEventListener
            ? h.addEventListener("scroll", v, !1)
            : h.attachEvent("scroll", v);
        }
        function r(h) {
          document.body
            ? h()
            : document.addEventListener
              ? document.addEventListener("DOMContentLoaded", function v() {
                  (document.removeEventListener("DOMContentLoaded", v), h());
                })
              : document.attachEvent("onreadystatechange", function v() {
                  (document.readyState == "interactive" || document.readyState == "complete") &&
                    (document.detachEvent("onreadystatechange", v), h());
                });
        }
        function i(h) {
          ((this.a = document.createElement("div")),
            this.a.setAttribute("aria-hidden", "true"),
            this.a.appendChild(document.createTextNode(h)),
            (this.b = document.createElement("span")),
            (this.c = document.createElement("span")),
            (this.h = document.createElement("span")),
            (this.f = document.createElement("span")),
            (this.g = -1),
            (this.b.style.cssText =
              "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;"),
            (this.c.style.cssText =
              "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;"),
            (this.f.style.cssText =
              "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;"),
            (this.h.style.cssText =
              "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;"),
            this.b.appendChild(this.h),
            this.c.appendChild(this.f),
            this.a.appendChild(this.b),
            this.a.appendChild(this.c));
        }
        function o(h, v) {
          h.a.style.cssText =
            "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:" +
            v +
            ";";
        }
        function a(h) {
          var v = h.a.offsetWidth,
            g = v + 100;
          return (
            (h.f.style.width = g + "px"),
            (h.c.scrollLeft = g),
            (h.b.scrollLeft = h.b.scrollWidth + 100),
            h.g !== v ? ((h.g = v), !0) : !1
          );
        }
        function s(h, v) {
          function g() {
            var k = x;
            a(k) && k.a.parentNode && v(k.g);
          }
          var x = h;
          (n(h.b, g), n(h.c, g), a(h));
        }
        function l(h, v) {
          var g = v || {};
          ((this.family = h),
            (this.style = g.style || "normal"),
            (this.weight = g.weight || "normal"),
            (this.stretch = g.stretch || "normal"));
        }
        var c = null,
          u = null,
          f = null,
          d = null;
        function m() {
          if (u === null)
            if (y() && /Apple/.test(F.navigator.vendor)) {
              var h = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(
                F.navigator.userAgent
              );
              u = !!h && 603 > parseInt(h[1], 10);
            } else u = !1;
          return u;
        }
        function y() {
          return (d === null && (d = !!document.fonts), d);
        }
        function b() {
          if (f === null) {
            var h = document.createElement("div");
            try {
              h.style.font = "condensed 100px sans-serif";
            } catch {}
            f = h.style.font !== "";
          }
          return f;
        }
        function S(h, v) {
          return [h.style, h.weight, b() ? h.stretch : "", "100px", v].join(" ");
        }
        ((l.prototype.load = function (h, v) {
          var g = this,
            x = h || "BESbswy",
            k = 0,
            w = v || 3e3,
            E = new Date().getTime();
          return new Promise(function (C, I) {
            if (y() && !m()) {
              var T = new Promise(function (A, H) {
                  function L() {
                    new Date().getTime() - E >= w
                      ? H(Error("" + w + "ms timeout exceeded"))
                      : document.fonts.load(S(g, '"' + g.family + '"'), x).then(function (M) {
                          1 <= M.length ? A() : setTimeout(L, 25);
                        }, H);
                  }
                  L();
                }),
                z = new Promise(function (A, H) {
                  k = setTimeout(function () {
                    H(Error("" + w + "ms timeout exceeded"));
                  }, w);
                });
              Promise.race([z, T]).then(function () {
                (clearTimeout(k), C(g));
              }, I);
            } else
              r(function () {
                function A() {
                  var Z;
                  ((Z = (P != -1 && j != -1) || (P != -1 && K != -1) || (j != -1 && K != -1)) &&
                    ((Z = P != j && P != K && j != K) ||
                      (c === null &&
                        ((Z = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(F.navigator.userAgent)),
                        (c =
                          !!Z &&
                          (536 > parseInt(Z[1], 10) ||
                            (parseInt(Z[1], 10) === 536 && 11 >= parseInt(Z[2], 10))))),
                      (Z =
                        c &&
                        ((P == N && j == N && K == N) ||
                          (P == $ && j == $ && K == $) ||
                          (P == ie && j == ie && K == ie)))),
                    (Z = !Z)),
                    Z && (Q.parentNode && Q.parentNode.removeChild(Q), clearTimeout(k), C(g)));
                }
                function H() {
                  if (new Date().getTime() - E >= w)
                    (Q.parentNode && Q.parentNode.removeChild(Q),
                      I(Error("" + w + "ms timeout exceeded")));
                  else {
                    var Z = document.hidden;
                    ((Z === !0 || Z === void 0) &&
                      ((P = L.a.offsetWidth), (j = M.a.offsetWidth), (K = D.a.offsetWidth), A()),
                      (k = setTimeout(H, 50)));
                  }
                }
                var L = new i(x),
                  M = new i(x),
                  D = new i(x),
                  P = -1,
                  j = -1,
                  K = -1,
                  N = -1,
                  $ = -1,
                  ie = -1,
                  Q = document.createElement("div");
                ((Q.dir = "ltr"),
                  o(L, S(g, "sans-serif")),
                  o(M, S(g, "serif")),
                  o(D, S(g, "monospace")),
                  Q.appendChild(L.a),
                  Q.appendChild(M.a),
                  Q.appendChild(D.a),
                  document.body.appendChild(Q),
                  (N = L.a.offsetWidth),
                  ($ = M.a.offsetWidth),
                  (ie = D.a.offsetWidth),
                  H(),
                  s(L, function (Z) {
                    ((P = Z), A());
                  }),
                  o(L, S(g, '"' + g.family + '",sans-serif')),
                  s(M, function (Z) {
                    ((j = Z), A());
                  }),
                  o(M, S(g, '"' + g.family + '",serif')),
                  s(D, function (Z) {
                    ((K = Z), A());
                  }),
                  o(D, S(g, '"' + g.family + '",monospace')));
              });
          });
        }),
          typeof t == "object"
            ? (t.exports = l)
            : ((F.FontFaceObserver = l), (F.FontFaceObserver.prototype.load = l.prototype.load)));
      })();
    },
  });
function Hh(e, t = {}) {
  return p.isValidElement(e) ? p.cloneElement(e, { style: t }) : p.createElement(e, { style: t });
}
var L_ = class extends Error {},
  M_ = class extends ke {
    constructor(e) {
      (super(e), (this.state = { error: void 0, forceUpdateKey: e.forceUpdateKey }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      if (e.forceUpdateKey !== t.forceUpdateKey) {
        let n = { forceUpdateKey: e.forceUpdateKey };
        return (t.error && (n.error = void 0), n);
      }
      return null;
    }
    render() {
      if (this.state.error === void 0) return this.props.children;
      if (!(this.state.error instanceof L_)) throw this.state.error;
      let { notFoundPage: e, defaultPageStyle: t } = this.props;
      if (!e) throw this.state.error;
      return Hh(e, t);
    }
  };
function A1(e) {
  return p.useCallback((t) => e[t], [e]);
}
var Jh = p.createContext({});
function O_({ api: e, children: t }) {
  return p.createElement(Jh.Provider, { value: e }, t);
}
function lo() {
  return p.useContext(Jh);
}
function V_({ routes: e, children: t }) {
  let n = A1(e);
  return p.createElement(Jh.Provider, { value: { getRoute: n } }, t);
}
var A_ = ":([a-zA-Z][a-zA-Z0-9_]*)",
  ni = new RegExp(A_, "g");
function D1(e, t) {
  return e.replace(ni, (n, r) => {
    let i = t[r];
    return typeof i != "string" || i.length === 0 ? n : encodeURIComponent(i);
  });
}
function B1(e, t) {
  if (!e.startsWith("/") || !t.startsWith("/"))
    throw new Error("from/to paths are expected to be absolute");
  let [n] = fx(e),
    [r, i] = fx(t),
    o = D_(n, r);
  return (
    o === "" && (o = "."),
    !o.startsWith(".") && !o.startsWith("/") && (o = "./" + o),
    o + "/" + i
  );
}
function fx(e) {
  let t = e.lastIndexOf("/");
  return [e.substring(0, t + 1), e.substring(t + 1)];
}
var Sh = 46,
  Ji = 47,
  wr = (e, t) => e.charCodeAt(t),
  dx = (e, t) => e.lastIndexOf(t),
  to = (e, t, n) => e.slice(t, n);
function D_(e, t) {
  if (e === t || ((e = "/" + px(e)), (t = "/" + px(t)), e === t)) return "";
  let n = 1,
    r = e.length,
    i = r - n,
    o = 1,
    a = t.length - o,
    s = i < a ? i : a,
    l = -1,
    c = 0;
  for (; c < s; c++) {
    let f = wr(e, n + c);
    if (f !== wr(t, o + c)) break;
    f === Ji && (l = c);
  }
  if (c === s)
    if (a > s) {
      if (wr(t, o + c) === Ji) return to(t, o + c + 1);
      if (c === 0) return to(t, o + c);
    } else i > s && (wr(e, n + c) === Ji ? (l = c) : c === 0 && (l = 0));
  let u = "";
  for (c = n + l + 1; c <= r; ++c)
    (c === r || wr(e, c) === Ji) && (u += u.length === 0 ? ".." : "/..");
  return `${u}${to(t, o + l)}`;
}
var B_ = !1,
  Zl = "/",
  hx = (e) => e === Ji;
function px(e) {
  let t = "",
    n = 0,
    r = -1,
    i = 0,
    o = 0;
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length) o = wr(e, a);
    else {
      if (hx(o)) break;
      o = Ji;
    }
    if (hx(o)) {
      if (!(r === a - 1 || i === 1))
        if (i === 2) {
          if (t.length < 2 || n !== 2 || wr(t, t.length - 1) !== Sh || wr(t, t.length - 2) !== Sh) {
            if (t.length > 2) {
              let s = dx(t, Zl);
              (s === -1 ? ((t = ""), (n = 0)) : ((t = to(t, 0, s)), (n = t.length - 1 - dx(t, Zl))),
                (r = a),
                (i = 0));
              continue;
            } else if (t.length !== 0) {
              ((t = ""), (n = 0), (r = a), (i = 0));
              continue;
            }
          }
          B_ && ((t += t.length > 0 ? `${Zl}..` : ".."), (n = 2));
        } else
          (t.length > 0 ? (t += `${Zl}${to(e, r + 1, a)}`) : (t = to(e, r + 1, a)),
            (n = a - r - 1));
      ((r = a), (i = 0));
    } else o === Sh && i !== -1 ? ++i : (i = -1);
  }
  return t;
}
function z1(e) {
  let t = typeof F < "u" ? F.location.search : "";
  return t ? z_(t, e) : e;
}
function z_(e, t) {
  let n = t.indexOf("#"),
    r = n === -1 ? t : t.substring(0, n),
    i = n === -1 ? "" : t.substring(n),
    o = r.indexOf("?");
  if (o === -1) return r + e + i;
  let a = new URLSearchParams(e),
    s = r.substring(o + 1),
    l = new URLSearchParams(s);
  for (let [c, u] of a) l.has(c) || l.append(c, u);
  return r.substring(0, o + 1) + l.toString() + i;
}
function bc(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Va(e) {
  return typeof e == "string";
}
var H_ = "preload";
function H1(e) {
  return typeof e == "object" && e !== null && !p.isValidElement(e) && H_ in e;
}
function s4(e) {
  let t = p.lazy(e),
    n,
    r,
    i = p.forwardRef(function (a, s) {
      return p.createElement(r ?? t, Object.assign(s ? { ref: s } : {}, a));
    });
  return ((i.preload = () => (n || (n = e().then((o) => ((r = o.default), r))), n)), i);
}
function Rc(e, t) {
  if (t && e) return e.elements && t in e.elements ? e.elements[t] : t;
}
function N_(e) {
  return /bot|Mediapartners-Google|Google-PageRenderer|yandex|ia_archiver/i.test(e);
}
async function $_(e, t, n, r, i, o, a) {
  var s, l, c;
  let u = e,
    f = !1,
    d = { ...o },
    m = Array.from(u.matchAll(ni)),
    y = await Promise.all(
      m.map(async (v) => {
        var g;
        let x = v?.[0],
          k = v?.[1];
        if (!x || !k)
          throw new Error("Failed to replace path variables: unexpected regex match group");
        let w = o[k];
        if (!w || !Va(w)) throw new Error(`No slug found for path variable ${k}`);
        let E = await ((g = a?.[i]) === null || g === void 0 ? void 0 : g.call(a));
        if (!E || !t) return w;
        let C = await E.getRecordIdBySlug(w, t);
        if (!C) return w;
        let I = await E.getSlugByRecordId(C, n);
        if (!I) {
          f = !0;
          let T = await E.getSlugByRecordId(C, r);
          return (T && (d[k] = T), T ?? w);
        }
        return ((d[k] = I), I);
      })
    ),
    b = 0,
    S = "",
    h = !1;
  for (let v = 0; v < m.length; v++) {
    let g = m[v],
      x = y[v];
    !g ||
      !x ||
      ((S += u.substring(b, g.index)),
      (b =
        ((s = g.index) !== null && s !== void 0 ? s : 0) +
        ((c = (l = g[0]) === null || l === void 0 ? void 0 : l.length) !== null && c !== void 0
          ? c
          : 0)),
      (S += y[v]),
      (h = !0));
  }
  return (h && (u = S), { path: u, pathVariables: d, isMissingInLocale: f });
}
async function W_({
  currentLocale: e,
  nextLocale: t,
  defaultLocale: n,
  route: r,
  pathVariables: i,
  collectionUtils: o,
  preserveQueryParams: a,
}) {
  let { path: s } = r,
    l = { path: s, pathVariables: i, isMissingInLocale: !1 };
  if (!s) return l;
  if (i && r.collectionId)
    try {
      l = await $_(s, e, t, n, r.collectionId, i, o);
    } catch {}
  return (t.slug && (l.path = "/" + t.slug + l.path), a && l.path && (l.path = z1(l.path)), l);
}
var U_ = { global: void 0, routes: {} },
  N1 = p.createContext(U_);
function u4({ children: e, value: t }) {
  return p.createElement(N1.Provider, { value: t }, e);
}
function j_() {
  return p.useContext(N1);
}
function X_(e, t, { global: n, routes: r }) {
  var i;
  return ((i = r[e]) === null || i === void 0 ? void 0 : i[t]) || n;
}
var wh = 10,
  G_ = 1e4;
function Y_(e) {
  let t = wh,
    n = e.next(0),
    r = [n.value];
  for (; !n.done && t < G_;) ((n = e.next(t)), r.push(n.value), (t += wh));
  return (
    r.length === 1 && r.push(n.value),
    { easing: `linear(${r.join(",")})`, duration: t - wh }
  );
}
var Dn = (e) => `--view-transition-${e}`;
function Nh(e) {
  return [parseFloat(e), e.endsWith("px") ? "px" : "%"];
}
function $1(e) {
  let { innerWidth: t, innerHeight: n } = F,
    [r, i] = Nh(e.x),
    [o, a] = Nh(e.y);
  return { x: i === "px" ? r : t * (r / 100), y: a === "px" ? o : n * (o / 100) };
}
var K_ = {
    makeKeyframe: (e, t, n) => {
      let r = 0;
      return (
        ((n === "exit" && e.angularDirection === "clockwise" && t === "start") ||
          (n === "exit" && e.angularDirection === "counter-clockwise" && t === "end") ||
          (n === "enter" && e.angularDirection === "counter-clockwise" && t === "start") ||
          (n === "enter" && e.angularDirection === "clockwise" && t === "end")) &&
          (r = (e.sweepAngle / 360) * 100),
        `${Dn("conic-offset")}: ${r}%;`
      );
    },
    makeStyles: (e, t) => {
      let n = `var(${Dn("conic-offset")})`,
        r =
          (t === "exit" && e.angularDirection === "clockwise") ||
          (t === "enter" && e.angularDirection === "counter-clockwise"),
        i = r ? "transparent" : "black",
        o = r ? "black" : "transparent",
        a = "conic-gradient(from ";
      return (
        (a += `${e.angle}deg at ${e.x} ${e.y}, `),
        (a += `${i} 0%, ${i} ${n}, `),
        (a += `${o} ${n}, ${o} 100%)`),
        `mask-image: ${a}; -webkit-mask-image: ${a};`
      );
    },
    makePropertyRules: () => `
        @property ${Dn("conic-offset")} {
            syntax: '<percentage>';
            initial-value: 0%;
            inherits: false;
        }
    `,
  },
  q_ = {
    makeKeyframe: (e, t) => {
      let { x: n, y: r } = $1(e);
      return t === "start"
        ? `clip-path: circle(0 at ${n}px ${r}px);`
        : `clip-path: circle(${Math.hypot(Math.max(n, F.innerWidth - n), Math.max(r, F.innerHeight - r))}px at ${n}px ${r}px);`;
    },
  },
  Q_ = {
    makeKeyframe: (e, t) => {
      let { x: n, y: r } = $1(e),
        i = F.innerHeight - r,
        o = F.innerWidth - n;
      return t === "start"
        ? `clip-path: inset(${r}px ${o}px ${i}px ${n}px round ${e.round}px);`
        : "clip-path: inset(0 round 0);";
    },
  },
  Z_ = {
    makeKeyframe: (e, t, n) => {
      let [, r] = Nh(e.width),
        i = `0${r}`;
      return (
        ((t === "start" && n === "exit") || (t === "end" && n === "enter")) && (i = e.width),
        `${Dn("blinds-width")}: ${i};`
      );
    },
    makeStyles: (e, t) => {
      let n = `var(${Dn("blinds-width")})`,
        r = t === "exit" ? "transparent" : "black",
        i = t === "exit" ? "black" : "transparent",
        o = "repeating-linear-gradient(";
      return (
        (o += e.angle + 90 + "deg, "),
        (o += `${r} 0px, ${r} ${n}, `),
        (o += `${i} ${n}, ${i} ${e.width})`),
        `mask-image: ${o}; -webkit-mask-image: ${o};`
      );
    },
    makePropertyRules: () => `
            @property ${Dn("blinds-width")} {
                syntax: '<length-percentage>';
                initial-value: 0px;
                inherits: false;
            }
        `,
  },
  J_ = {
    makeKeyframe: (e, t, n) => {
      let r = (t === "start" && n === "exit") || (t === "end" && n === "enter") ? 1 : 0;
      return `${Dn("wipe-offset")}: ${r};`;
    },
    makeStyles: (e, t) => {
      let n = `var(${Dn("wipe-offset")})`,
        r = t === "exit" ? "transparent" : "black",
        i = t === "exit" ? "black" : "transparent",
        o = "linear-gradient(";
      return (
        (o += e.angle + 90 + "deg, "),
        (o += `${r} calc(calc(0% - ${e.width}) + calc(calc(100% + ${e.width}) * ${n})), `),
        (o += `${i} calc(calc(100% + ${e.width}) * ${n}))`),
        `mask-image: ${o}; -webkit-mask-image: ${o};`
      );
    },
    makePropertyRules: () => `
            @property ${Dn("wipe-offset")} {
                syntax: '<number>';
                initial-value: 0;
                inherits: false;
            }
        `,
  },
  eF = { circle: q_, conic: K_, inset: Q_, blinds: Z_, wipe: J_ },
  tF = {
    opacity: 1,
    x: "0px",
    y: "0px",
    scale: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    mask: void 0,
  };
function mx(e, t, n, r) {
  var i;
  let o = `
      opacity: ${e.opacity};
      transform: translate(${e.x}, ${e.y}) scale(${e.scale}) rotateX(${e.rotateX}deg) rotateY(${e.rotateY}deg) rotateZ(${e.rotate}deg);
    `;
  return (
    e.mask &&
      (o +=
        ((i = r?.makeKeyframe) === null || i === void 0 ? void 0 : i.call(r, e.mask, t, n)) || ""),
    o
  );
}
function nF(e) {
  return e ? eF[e] : void 0;
}
function vx(e, { transition: t, ...n }) {
  var r;
  let i = "view-transition-" + e,
    o = { duration: "0s", easing: "linear" };
  if (t.type === "tween")
    ((o.duration = t.duration + "s"), (o.easing = `cubic-bezier(${t.ease.join(",")})`));
  else if (t.type === "spring") {
    let { easing: c, duration: u } = Y_(
      Do({
        keyframes: [0, 1],
        stiffness: t.stiffness,
        damping: t.damping,
        mass: t.mass,
        restDelta: 0.001,
        restSpeed: 1e-4,
      })
    );
    ((o.duration = u + "ms"), (o.easing = c));
  }
  let a = nF((r = n?.mask) === null || r === void 0 ? void 0 : r.type),
    s = mx(n, "start", e, a),
    l = mx({ ...tF, mask: n.mask }, "end", e, a);
  return (
    e === "exit" && ([s, l] = [l, s]),
    `
        ${n.mask && a?.makePropertyRules ? a.makePropertyRules(n.mask) : ""}

        @keyframes ${i} {
            0% {
                ${s}
            }

            100% {
                ${l}
            }
        }

        ::view-transition-${e === "enter" ? "new" : "old"}(root) {
            animation-name: ${i};
            animation-duration: ${o.duration};
            animation-delay: ${t.delay}s;
            animation-timing-function: ${o.easing};
            animation-fill-mode: both;
            ${n.mask && a?.makeStyles ? a.makeStyles(n.mask, e) : ""}
        }
    `
  );
}
var W1 = "view-transition-styles",
  rF = {
    x: "0px",
    y: "0px",
    scale: 1,
    opacity: 1,
    rotate3d: !1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    mask: void 0,
    transition: {
      type: "tween",
      delay: 0,
      duration: 0.2,
      ease: [0.27, 0, 0.51, 1],
      stiffness: 400,
      damping: 30,
      mass: 1,
    },
  };
function iF({ exit: e = rF, enter: t }) {
  let n = document.createElement("style");
  n.id = W1;
  let r = `
        @media (prefers-reduced-motion) {
            ::view-transition-group(*),
            ::view-transition-old(*),
            ::view-transition-new(*) {
                animation: none !important;
            }
        }
    `;
  ((e.mask || t.mask || e.opacity || t.opacity || e.transition.delay || t.transition.delay) &&
    (r += `
            ::view-transition-old(*),
            ::view-transition-new(*) {
                mix-blend-mode: normal;
            }
        `),
    (r += `
        ::view-transition-old(*),
        ::view-transition-new(*) {
            backface-visibility: hidden;
        }
    `),
    (r += vx("exit", e)),
    (r += vx("enter", t)),
    (n.textContent = r),
    document.head.appendChild(n));
}
function oF() {
  q.render(() => {
    let e = document.getElementById(W1);
    e && document.head.removeChild(e);
  });
}
function aF() {
  return !!document.startViewTransition;
}
function sF(e, t) {
  if (!aF()) return void e();
  iF(t);
  let n = document.startViewTransition(e);
  return (
    Promise.all([n.ready, n.finished])
      .then(oF)
      .catch(() => {}),
    n
  );
}
function U1() {
  let e = j_(),
    t = B(void 0);
  return (
    X(() => {
      t.current && (t.current(), (t.current = void 0));
    }),
    ae(
      (n, r, i) => {
        let o = X_(n, r, e);
        if (o) {
          let a = new Promise((l) => {
            t.current = l;
          });
          return sF(async () => {
            (i(), await a);
          }, o);
        } else return i();
      },
      [e]
    )
  );
}
function gx(
  e,
  t,
  {
    currentRoutePath: n,
    currentPathVariables: r,
    hash: i,
    pathVariables: o,
    localeId: a,
    preserveQueryParams: s,
  }
) {
  let { path: l } = t;
  if (l)
    try {
      let c = Pc(t, {
        currentRoutePath: n,
        currentPathVariables: r,
        hash: i,
        pathVariables: o,
        preserveQueryParams: s,
      });
      j1({ routeId: e, hash: i, pathVariables: o, localeId: a }, c);
    } catch {}
}
function lF(e, t) {
  F.history.replaceState(e, "", t);
}
function j1(e, t) {
  F.history.pushState(e, "", t);
}
function cF({ disabled: e, routeId: t, initialPathVariables: n, initialLocaleId: r }) {
  p.useEffect(() => {
    e || lF({ routeId: t, pathVariables: n, localeId: r });
  }, []);
}
function uF(e, t) {
  let n = U1(),
    r = p.useRef(void 0),
    i = p.useCallback(
      ({ state: a }) => {
        var s, l, c;
        if (!bc(a)) return;
        let { routeId: u, hash: f, pathVariables: d, localeId: m } = a;
        if (!Va(u)) return;
        let y = () => {
            t(u, Va(m) ? m : void 0, Va(f) ? f : void 0, bc(d) ? d : void 0, !1, !0);
          },
          b = n(e.current, u, y);
        b
          ? b.updateCallbackDone
              .then((s = r.current) === null || s === void 0 ? void 0 : s.resolve)
              .catch((l = r.current) === null || l === void 0 ? void 0 : l.reject)
          : (c = r.current) === null || c === void 0 || c.resolve();
      },
      [e, t, n]
    ),
    o = ae((a) => {
      a.navigationType === "traverse" &&
        a.intercept({
          async handler() {
            await new Promise((s, l) => {
              r.current = { resolve: s, reject: l };
            });
          },
          scroll: "after-transition",
        });
    }, []);
  p.useEffect(() => {
    var a;
    return (
      F.addEventListener("popstate", i),
      (a = F.navigation) === null || a === void 0 || a.addEventListener("navigate", o),
      () => {
        var s;
        (F.removeEventListener("popstate", i),
          (s = F.navigation) === null || s === void 0 || s.removeEventListener("navigate", o));
      }
    );
  }, [i, o]);
}
function fF(e, t, n) {
  let r = Rc(t, e);
  if (!r) return;
  let i = Object.assign({}, t?.elements, n);
  return r.replace(ni, (o, a) => {
    var s;
    return String((s = i[a]) !== null && s !== void 0 ? s : o);
  });
}
function Pc(
  e,
  {
    currentRoutePath: t,
    currentPathVariables: n,
    hash: r,
    pathVariables: i,
    hashVariables: o,
    relative: a = !0,
    preserveQueryParams: s,
  }
) {
  var l;
  let c = t ?? "/";
  n &&
    (c = c.replace(ni, (y, b) => {
      var S;
      return String((S = n[b]) !== null && S !== void 0 ? S : y);
    }));
  let f = (l = e?.path) !== null && l !== void 0 ? l : "/";
  i &&
    (f = f.replace(ni, (y, b) => {
      var S;
      return String((S = i[b]) !== null && S !== void 0 ? S : y);
    }));
  let d = fF(r, e, o),
    m = c === f && d;
  return (a && (f = B1(c, f)), (s || m) && (f = z1(f)), d && (f = `${f}#${d}`), f);
}
async function dF(e, t, n) {
  if (!e.path || !t) return !1;
  let i = `${n.slug ? `/${n.slug}` : ""}${D1(e.path, t)}`;
  return (await fetch(i, { method: "HEAD", redirect: "manual" })).type === "opaqueredirect"
    ? ((F.location.href = F.location.origin + i), !0)
    : !1;
}
async function hF(e) {
  let t = await W_(e);
  if (t) {
    try {
      localStorage.setItem("preferredLocale", e.nextLocale.code);
    } catch {}
    try {
      if (typeof t.path != "string") throw new Error("Expected result.path to be a string");
      if (t.isMissingInLocale && (await dF(e.route, t.pathVariables, e.nextLocale))) return;
      j1({ routeId: e.routeId, pathVariables: t.pathVariables, localeId: e.nextLocale.id }, t.path);
    } catch {}
    return t;
  }
}
function pF(e, t) {
  if (e.routeId !== t.routeId) return !1;
  if (e.pathVariables === t.pathVariables) return !0;
  let n = e.pathVariables || {},
    r = t.pathVariables || {};
  return n.length === r.length && Object.keys(n).every((i) => n[i] === r[i]);
}
var yx = "default";
function mF() {
  let [e, t] = p.useState(0);
  return [e, p.useCallback(() => t((n) => n + 1), [])];
}
var vF = async () => {},
  gF = { activeLocale: null, locales: [], setLocale: vF },
  X1 = p.createContext(gF);
function G1() {
  return p.useContext(X1);
}
function bx(e, t, n) {
  let r = e && document.getElementById(e);
  if (r) {
    xF(r, t);
    return;
  }
  n || F.scrollTo(0, 0);
}
function yF(e) {
  let t = p.useRef([]);
  return (
    p.useLayoutEffect(() => {
      var n;
      !((n = t.current) === null || n === void 0) &&
        n.length &&
        (t.current.forEach((r) => r()), (t.current = []));
    }, [e]),
    p.useCallback((n) => {
      t.current.push(n);
    }, [])
  );
}
function bF({
  defaultPageStyle: e,
  disableHistory: t,
  initialPathVariables: n,
  initialRoute: r,
  notFoundPage: i,
  collectionUtils: o,
  routes: a,
  initialLocaleId: s,
  locales: l = [],
  preserveQueryParams: c = !1,
}) {
  cF({ disabled: t, routeId: r, initialPathVariables: n, initialLocaleId: s });
  let u = U1(),
    f = p.useRef(r),
    d = p.useRef(n),
    m = p.useRef(s),
    y = m.current,
    b = p.useMemo(() => {
      var L;
      return (L = l.find(({ id: M }) => (y ? M === y : M === yx))) !== null && L !== void 0
        ? L
        : null;
    }, [y, l]),
    [S, h] = mF(),
    v = p.useMemo(
      () => ({
        activeLocale: b,
        locales: l,
        setLocale: async (L) => {
          let M;
          Va(L) ? (M = L) : bc(L) && (M = L.id);
          let D = l.find(({ id: N }) => N === yx),
            P = l.find(({ id: N }) => N === M);
          if (!P) return;
          let j = f.current,
            K = a[j];
          if (K)
            try {
              let N = await hF({
                currentLocale: b,
                nextLocale: P,
                route: K,
                routeId: j,
                defaultLocale: D,
                pathVariables: d.current,
                collectionUtils: o,
                preserveQueryParams: c,
              });
              if (!N) return;
              ((d.current = N.pathVariables), (m.current = P.id), u(f.current, j, () => li(h)));
            } catch {}
        },
      }),
      [b, o, h, l, a, u, c]
    ),
    g = yF(S),
    x = p.useCallback(
      (L, M, D, P, j = !1, K = !1) => {
        ((f.current = L),
          (d.current = P),
          (m.current = M),
          g(() => {
            bx(D, j, K);
          }),
          h());
      },
      [h, g]
    );
  uF(f, x);
  let k = p.useCallback(
      (L, M, D, P) => {
        var j, K;
        let N = a[L];
        if (D) {
          let Q = new Set(),
            Z = (j = N?.path) !== null && j !== void 0 ? j : "/";
          for (let ze of Z.matchAll(ni)) {
            let Xe = ze[1];
            if (Xe === void 0) throw new Error("A matching path variable should not be undefined");
            Q.add(Xe);
          }
          D = Object.fromEntries(Object.entries(D).filter(([ze]) => Q.has(ze)));
        }
        let $ = Rc(N, M);
        if (
          pF({ routeId: f.current, pathVariables: d.current }, { routeId: L, pathVariables: D })
        ) {
          if (((K = F.history.state) === null || K === void 0 ? void 0 : K.hash) !== M && !t) {
            let Q = a[L];
            Q &&
              gx(L, Q, {
                currentRoutePath: Q.path,
                currentPathVariables: d.current,
                pathVariables: D,
                hash: M,
                localeId: m.current,
                preserveQueryParams: c,
              });
          }
          bx($, P, !1);
          return;
        }
        if (!N) return;
        if (!t) {
          let Q = a[f.current];
          gx(L, N, {
            currentRoutePath: Q?.path,
            currentPathVariables: d.current,
            hash: M,
            pathVariables: D,
            localeId: m.current,
            preserveQueryParams: c,
          });
        }
        let ie = () => x(L, m.current, $, D, P, !1);
        u(f.current, L, () => li(ie));
      },
      [a, t, x, u, c]
    ),
    w = A1(a),
    E = f.current,
    C = d.current,
    I = p.useMemo(
      () => ({
        navigate: k,
        getRoute: w,
        currentRouteId: E,
        currentPathVariables: C,
        routes: a,
        collectionUtils: o,
        preserveQueryParams: c,
      }),
      [k, w, E, C, a, o, c]
    ),
    T = a[f.current];
  if (!T) throw new Error(`Router cannot find route for ${f.current}`);
  let z = !b || !T.includedLocales || T.includedLocales.includes(b.id),
    A = T.path && C ? D1(T.path, C) : T.path,
    H = String(y) + A;
  return p.createElement(
    O_,
    { api: I },
    p.createElement(
      X1.Provider,
      { value: v },
      p.createElement(
        p.Suspense,
        { fallback: null },
        p.createElement(
          M_,
          { notFoundPage: i, defaultPageStyle: e, forceUpdateKey: S },
          p.createElement(p.Fragment, { key: H }, z ? Hh(T.page, e) : i && Hh(i, e))
        )
      )
    )
  );
}
function xF(e, t) {
  let n = t ? { behavior: "smooth", block: "start", inline: "nearest" } : void 0;
  e.scrollIntoView(n);
}
var Jl, kh, xx;
function SF(e) {
  if (xx !== e) {
    Jl = {};
    for (let [t, { path: n }] of Object.entries(e))
      n && (Jl[n] = { path: n, depth: kF(n), routeId: t });
    ((kh = Object.values(Jl)), kh.sort(({ depth: t }, { depth: n }) => n - t), (xx = e));
  }
  return [Jl, kh];
}
function wF(e, t, n = !0, r = []) {
  let [i, o] = SF(e),
    a,
    s,
    l = t;
  if (r.length > 0) {
    let d = l.split("/").find(Boolean);
    if (
      (d &&
        ((a = r.find(({ slug: m }) => m === d)),
        a && ((s = a.id), (l = l.substring(a.slug.length + 1)))),
      !s)
    ) {
      let m = r.find(({ slug: y }) => y === "");
      m && (s = m.id);
    }
  }
  let c = i[l];
  if (c) {
    let d = Sx(l, c.path);
    if (d.isMatch) return { routeId: c.routeId, localeId: s, pathVariables: d.pathVariables };
  }
  for (let { path: d, routeId: m } of o) {
    let y = Sx(l, d);
    if (y.isMatch) return { routeId: m, localeId: s, pathVariables: y.pathVariables };
  }
  if (!n) throw new Error("No exact match found for path");
  let u = i["/"];
  if (u) return { routeId: u.routeId, localeId: s };
  let f = Object.keys(e)[0];
  if (!f) throw new Error("Router should not have undefined routes");
  return { routeId: f, localeId: s };
}
function kF(e) {
  let t = e.replace(/(?:^\/|\/$)/g, "");
  return t === "" ? 0 : t.split("/").length;
}
function Sx(e, t) {
  let n = [],
    i = CF(t).replace(ni, (c, u) => (n.push(u), "([^/]+)")),
    o = new RegExp(i + "$"),
    a = e.match(o);
  if (!a) return { isMatch: !1 };
  if (a.length === 1) return { isMatch: !0 };
  let s = {},
    l = a.slice(1);
  for (let c = 0; c < n.length; ++c) {
    let u = n[c];
    if (u === void 0) continue;
    let f = l[c],
      d = s[u];
    if (d) {
      if (d !== f) return { isMatch: !1 };
      continue;
    }
    if (f === void 0) throw new Error("Path variable values cannot be undefined");
    s[u] = f;
  }
  return { isMatch: !0, pathVariables: s };
}
function CF(e) {
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var EF = "page";
function wx(e) {
  return bc(e) && EF in e && e.page !== void 0;
}
var TF = p.createContext(void 0);
function _c() {
  var e;
  let t = lo(),
    n = O(TF),
    r = n ?? t.currentRouteId;
  if (!r) return;
  let i = (e = t.getRoute) === null || e === void 0 ? void 0 : e.call(t, r);
  if (i) return { ...i, id: r, pathVariables: n ? void 0 : t.currentPathVariables };
}
function IF(e) {
  var t;
  let n = lo();
  if (e) return (t = n.getRoute) === null || t === void 0 ? void 0 : t.call(n, e);
}
var Y1 = typeof F < "u" && !N_(Ye.userAgent);
function RF(e, t = !0) {
  let { getRoute: n } = lo();
  p.useEffect(() => {
    if (!(!n || !t || !Y1))
      for (let r of e) {
        let i = n(r);
        i?.page && ep(i.page);
      }
  }, [e, n, t]);
}
function ep(e) {
  Y1 && H1(e) && e.preload();
}
function g4(e, t) {
  var n;
  let r = _c(),
    i = (n = IF(t)) !== null && n !== void 0 ? n : r;
  return p.useMemo(() => (i ? Rc(i, e) : e), [e, i]);
}
var kx = new Set();
function Ba(e, ...t) {
  kx.has(e) || (kx.add(e), console.warn(e, ...t));
}
function PF(e, t, n) {
  let r = n ? `, use ${n} instead` : "",
    i = `Deprecation warning: ${e} will be removed in version ${t}${r}.`;
  Ba(i);
}
var K1 = class {
    constructor() {
      (R(this, "observers", new Set()), R(this, "transactions", {}));
    }
    add(e) {
      this.observers.add(e);
      let t = !1;
      return () => {
        t || ((t = !0), this.remove(e));
      };
    }
    remove(e) {
      this.observers.delete(e);
    }
    notify(e, t) {
      if (t) {
        let n = this.transactions[t] || e;
        ((n.value = e.value), (this.transactions[t] = n));
      } else this.callObservers(e);
    }
    finishTransaction(e) {
      let t = this.transactions[e];
      return (delete this.transactions[e], this.callObservers(t, e));
    }
    callObservers(e, t) {
      let n = [];
      return (
        new Set(this.observers).forEach((r) => {
          typeof r == "function" ? r(e, t) : (r.update(e, t), n.push(r.finish));
        }),
        n
      );
    }
  },
  _e = (() => {
    function e(t) {
      return (
        PF(
          "Animatable()",
          "2.0.0",
          "the new animation API (https://www.framer.com/api/animation/)"
        ),
        en(t) ? t : new FF(t)
      );
    }
    return (
      (e.transaction = (t) => {
        let n = Math.random(),
          r = new Set();
        t((a, s) => {
          (a.set(s, n), r.add(a));
        }, n);
        let o = [];
        (r.forEach((a) => {
          o.push(...a.finishTransaction(n));
        }),
          o.forEach((a) => {
            a(n);
          }));
      }),
      (e.getNumber = (t, n = 0) => e.get(t, n)),
      (e.get = (t, n) => (t == null ? n : en(t) ? t.get() : t)),
      (e.objectToValues = (t) => {
        if (!t) return t;
        let n = {};
        for (let r in t) {
          let i = t[r];
          en(i) ? (n[r] = i.get()) : (n[r] = i);
        }
        return n;
      }),
      e
    );
  })(),
  Cx = "onUpdate",
  Ex = "finishTransaction";
function en(e) {
  return (
    e !== null &&
    typeof e == "object" &&
    Cx in e &&
    e[Cx] instanceof Function &&
    Ex in e &&
    e[Ex] instanceof Function
  );
}
function _F(e, t) {
  return {
    interpolate(n, r) {
      let i = n.get(),
        o = r.get(),
        a = _e(i);
      return (s) => {
        let l = t.interpolate(i, o)(s);
        return (a.set(l), a);
      };
    },
    difference(n, r) {
      let i = n.get();
      return t.difference(i, r.get());
    },
  };
}
var FF = class {
  constructor(e) {
    ((this.value = e), R(this, "observers", new K1()));
  }
  static interpolationFor(e, t) {
    if (en(e)) return _F(e, t);
  }
  get() {
    return this.value;
  }
  set(e, t) {
    let n = this.value;
    (en(e) && (e = e.get()), (this.value = e));
    let r = { value: e, oldValue: n };
    this.observers.notify(r, t);
  }
  finishTransaction(e) {
    return this.observers.finishTransaction(e);
  }
  onUpdate(e) {
    return this.observers.add(e);
  }
};
function ec(e, t) {
  let n = Math.round(Math.abs(t)),
    r = Math.pow(10, n);
  return Math.round(e * r) / r;
}
function Tx(e, t) {
  return t === 0 ? Math.round(e) : ((t -= t | 0), t < 0 && (t = 1 - t), Math.round(e - t) + t);
}
function ct(e, t) {
  return { x: e, y: t };
}
((e) => {
  ((e.add = (...r) => r.reduce((i, o) => ({ x: i.x + o.x, y: i.y + o.y }), { x: 0, y: 0 })),
    (e.subtract = (r, i) => ({ x: r.x - i.x, y: r.y - i.y })),
    (e.multiply = (r, i) => ({ x: r.x * i, y: r.y * i })),
    (e.divide = (r, i) => ({ x: r.x / i, y: r.y / i })),
    (e.absolute = (r) => ({ x: Math.abs(r.x), y: Math.abs(r.y) })),
    (e.reverse = (r) => ({ x: r.x * -1, y: r.y * -1 })),
    (e.pixelAligned = (r, i = { x: 0, y: 0 }) => ({ x: Tx(r.x, i.x), y: Tx(r.y, i.y) })),
    (e.distance = (r, i) => {
      let o = Math.abs(r.x - i.x),
        a = Math.abs(r.y - i.y);
      return Math.sqrt(o * o + a * a);
    }),
    (e.angle = (r, i) => (Math.atan2(i.y - r.y, i.x - r.x) * 180) / Math.PI - 90),
    (e.isEqual = (r, i) => r.x === i.x && r.y === i.y),
    (e.rotationNormalizer = () => {
      let r;
      return (i) => {
        typeof r != "number" && (r = i);
        let o = r - i,
          a = Math.abs(o) + 180,
          s = Math.floor(a / 360);
        return (o < 180 && (i -= s * 360), o > 180 && (i += s * 360), (r = i), i);
      };
    }));
  function t(r, i) {
    return { x: (r.x + i.x) / 2, y: (r.y + i.y) / 2 };
  }
  e.center = t;
  function n(r, i) {
    var o, a, s, l, c, u, f, d;
    let m = r.x,
      y = r.y,
      b = !1;
    for (let S = 0, h = i.length - 1; S < i.length; h = S++) {
      let v = (a = (o = i[S]) == null ? void 0 : o.x) != null ? a : 0,
        g = (l = (s = i[S]) == null ? void 0 : s.y) != null ? l : 0,
        x = (u = (c = i[h]) == null ? void 0 : c.x) != null ? u : 0,
        k = (d = (f = i[h]) == null ? void 0 : f.y) != null ? d : 0;
      g > y != k > y && m < ((x - v) * (y - g)) / (k - g) + v && (b = !b);
    }
    return b;
  }
  e.insidePoints = n;
})(ct || (ct = {}));
var b4 = Number.MIN_VALUE;
var x4 = { tension: 500, friction: 10, tolerance: 1 / 1e4, velocity: 0 };
var LF = jt(I_(), 1),
  $h = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32",
  };
function mr(e, t, n, r = !1) {
  let [i, o] = t,
    [a, s] = n,
    l = o - i;
  if (l === 0) return (s + a) / 2;
  let c = s - a;
  if (c === 0) return a;
  let u = a + ((e - i) / l) * c;
  if (r === !0)
    if (a < s) {
      if (u < a) return a;
      if (u > s) return s;
    } else {
      if (u > a) return a;
      if (u < s) return s;
    }
  return u;
}
function no(e) {
  return !isNaN(e) && isFinite(e);
}
function vr(e) {
  let t = Wh(e);
  return t !== void 0 ? (e.includes("%") ? t / 100 : t) : 0;
}
function Wh(e) {
  let t = e.match(/\d?\.?\d+/);
  return t ? Number(t[0]) : void 0;
}
var { hsluvToRgb: MF, rgbToHsluv: OF } = LF.default;
function VF(e, t, n) {
  let [r, i, o] = OF([e / 255, t / 255, n / 255]);
  return { h: r, s: i, l: o };
}
function AF(e, t, n, r = 1) {
  let i = MF([e, t, n]);
  return { r: i[0] * 255, g: i[1] * 255, b: i[2] * 255, a: r };
}
function tc(e, t, n, r) {
  let i = Math.round(e),
    o = Math.round(t * 100),
    a = Math.round(n * 100);
  return r === void 0 || r === 1
    ? "hsv(" + i + ", " + o + "%, " + a + "%)"
    : "hsva(" + i + ", " + o + "%, " + a + "%, " + r + ")";
}
function DF(e, t, n) {
  return {
    r: no(e) ? ut(e, 255) * 255 : 0,
    g: no(t) ? ut(t, 255) * 255 : 0,
    b: no(n) ? ut(n, 255) * 255 : 0,
  };
}
function Ix(e, t, n, r) {
  let i = [
    Eh(Math.round(e).toString(16)),
    Eh(Math.round(t).toString(16)),
    Eh(Math.round(n).toString(16)),
  ];
  return r &&
    i[0].charAt(0) === i[0].charAt(1) &&
    i[1].charAt(0) === i[1].charAt(1) &&
    i[2].charAt(0) === i[2].charAt(1)
    ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0)
    : i.join("");
}
function tp(e, t, n) {
  let r,
    i,
    o = ut(e, 255),
    a = ut(t, 255),
    s = ut(n, 255),
    l = Math.max(o, a, s),
    c = Math.min(o, a, s),
    u = (i = r = (l + c) / 2);
  if (l === c) u = i = 0;
  else {
    let f = l - c;
    switch (((i = r > 0.5 ? f / (2 - l - c) : f / (l + c)), l)) {
      case o:
        u = (a - s) / f + (a < s ? 6 : 0);
        break;
      case a:
        u = (s - o) / f + 2;
        break;
      case s:
        u = (o - a) / f + 4;
        break;
    }
    u /= 6;
  }
  return { h: u * 360, s: i, l: r };
}
function Ch(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
  );
}
function BF(e, t, n) {
  let r, i, o;
  if (((e = ut(e, 360)), (t = ut(t * 100, 100)), (n = ut(n * 100, 100)), t === 0)) r = i = o = n;
  else {
    let a = n < 0.5 ? n * (1 + t) : n + t - n * t,
      s = 2 * n - a;
    ((r = Ch(s, a, e + 1 / 3)), (i = Ch(s, a, e)), (o = Ch(s, a, e - 1 / 3)));
  }
  return { r: r * 255, g: i * 255, b: o * 255 };
}
function Rx(e, t, n) {
  ((e = ut(e, 255)), (t = ut(t, 255)), (n = ut(n, 255)));
  let r = Math.max(e, t, n),
    i = Math.min(e, t, n),
    o = r - i,
    a,
    s = r === 0 ? 0 : o / r,
    l = r;
  if (r === i) a = 0;
  else {
    switch (r) {
      case e:
        a = (t - n) / o + (t < n ? 6 : 0);
        break;
      case t:
        a = (n - e) / o + 2;
        break;
      case n:
        a = (e - t) / o + 4;
        break;
    }
    a /= 6;
  }
  return { h: a, s, v: l };
}
function zF(e, t, n) {
  ((e = ut(e, 360) * 6), (t = ut(t * 100, 100)), (n = ut(n * 100, 100)));
  let r = Math.floor(e),
    i = e - r,
    o = n * (1 - t),
    a = n * (1 - i * t),
    s = n * (1 - (1 - i) * t),
    l = r % 6,
    c = [n, a, o, o, s, n][l],
    u = [s, n, n, a, o, o][l],
    f = [o, o, s, n, n, a][l];
  return { r: c * 255, g: u * 255, b: f * 255 };
}
function ut(e, t) {
  let n, r;
  if ((typeof t == "string" ? (n = parseFloat(t)) : (n = t), typeof e == "string")) {
    HF(e) && (e = "100%");
    let i = NF(e);
    ((r = Math.min(n, Math.max(0, parseFloat(e)))), i && (r = Math.floor(r * n) / 100));
  } else r = e;
  return Math.abs(r - n) < 1e-6 ? 1 : (r % n) / n;
}
function HF(e) {
  return typeof e == "string" && e.includes(".") && parseFloat(e) === 1;
}
function NF(e) {
  return typeof e == "string" && e.includes("%");
}
function Eh(e) {
  return e.length === 1 ? "0" + e : "" + e;
}
var pn = (function () {
  let e = "[-\\+]?\\d+%?",
    n = "(?:" + "[-\\+]?\\d*\\.\\d+%?" + ")|(?:" + e + ")",
    r = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?",
    i = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?";
  return {
    rgb: new RegExp("rgb" + r),
    rgba: new RegExp("rgba" + i),
    hsl: new RegExp("hsl" + r),
    hsla: new RegExp("hsla" + i),
    hsv: new RegExp("hsv" + r),
    hsva: new RegExp("hsva" + i),
    hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };
})();
function np(e) {
  var t, n, r, i, o, a, s, l, c, u, f, d, m, y, b, S, h, v, g, x, k, w, E, C, I, T, z, A;
  if (e.includes("gradient(") || e.includes("var(")) return !1;
  let H = /^[\s,#]+/,
    L = /\s+$/,
    M = e.replace(H, "").replace(L, "").toLowerCase(),
    D = $h[M];
  if ((D && (M = D), M === "transparent")) return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  let P;
  return (P = pn.rgb.exec(M))
    ? {
        r: parseInt((t = P[1]) != null ? t : ""),
        g: parseInt((n = P[2]) != null ? n : ""),
        b: parseInt((r = P[3]) != null ? r : ""),
        a: 1,
        format: "rgb",
      }
    : (P = pn.rgba.exec(M))
      ? {
          r: parseInt((i = P[1]) != null ? i : ""),
          g: parseInt((o = P[2]) != null ? o : ""),
          b: parseInt((a = P[3]) != null ? a : ""),
          a: parseFloat((s = P[4]) != null ? s : ""),
          format: "rgb",
        }
      : (P = pn.hsl.exec(M))
        ? {
            h: parseInt((l = P[1]) != null ? l : ""),
            s: vr((c = P[2]) != null ? c : ""),
            l: vr((u = P[3]) != null ? u : ""),
            a: 1,
            format: "hsl",
          }
        : (P = pn.hsla.exec(M))
          ? {
              h: parseInt((f = P[1]) != null ? f : ""),
              s: vr((d = P[2]) != null ? d : ""),
              l: vr((m = P[3]) != null ? m : ""),
              a: parseFloat((y = P[4]) != null ? y : ""),
              format: "hsl",
            }
          : (P = pn.hsv.exec(M))
            ? {
                h: parseInt((b = P[1]) != null ? b : ""),
                s: vr((S = P[2]) != null ? S : ""),
                v: vr((h = P[3]) != null ? h : ""),
                a: 1,
                format: "hsv",
              }
            : (P = pn.hsva.exec(M))
              ? {
                  h: parseInt((v = P[1]) != null ? v : ""),
                  s: vr((g = P[2]) != null ? g : ""),
                  v: vr((x = P[3]) != null ? x : ""),
                  a: parseFloat((k = P[4]) != null ? k : ""),
                  format: "hsv",
                }
              : (P = pn.hex8.exec(M))
                ? {
                    r: Ft((w = P[1]) != null ? w : ""),
                    g: Ft((E = P[2]) != null ? E : ""),
                    b: Ft((C = P[3]) != null ? C : ""),
                    a: Px((I = P[4]) != null ? I : ""),
                    format: D ? "name" : "hex",
                  }
                : (P = pn.hex6.exec(M))
                  ? {
                      r: Ft((T = P[1]) != null ? T : ""),
                      g: Ft((z = P[2]) != null ? z : ""),
                      b: Ft((A = P[3]) != null ? A : ""),
                      a: 1,
                      format: D ? "name" : "hex",
                    }
                  : (P = pn.hex4.exec(M))
                    ? {
                        r: Ft(`${P[1]}${P[1]}`),
                        g: Ft(`${P[2]}${P[2]}`),
                        b: Ft(`${P[3]}${P[3]}`),
                        a: Px(P[4] + "" + P[4]),
                        format: D ? "name" : "hex",
                      }
                    : (P = pn.hex3.exec(M))
                      ? {
                          r: Ft(`${P[1]}${P[1]}`),
                          g: Ft(`${P[2]}${P[2]}`),
                          b: Ft(`${P[3]}${P[3]}`),
                          a: 1,
                          format: D ? "name" : "hex",
                        }
                      : !1;
}
function Ft(e) {
  return parseInt(e, 16);
}
function Px(e) {
  return Ft(e) / 255;
}
var _x = new Map(),
  W = (() => {
    function e(o, a, s, l) {
      if (typeof o == "string") {
        let u = _x.get(o);
        return u || ((u = t(o)), u === void 0 ? { ...e("black"), isValid: !1 } : (_x.set(o, u), u));
      }
      let c = t(o, a, s, l);
      return c !== void 0 ? c : { ...e("black"), isValid: !1 };
    }
    function t(o, a, s, l) {
      if (o === "") return;
      let c = $F(o, a, s, l);
      if (c) {
        let u = {
          r: c.r,
          g: c.g,
          b: c.b,
          a: c.a,
          h: c.h,
          s: c.s,
          l: c.l,
          initialValue: typeof o == "string" && c.format !== "hsv" ? o : void 0,
          roundA: Math.round(100 * c.a) / 100,
          format: c.format,
          mix: e.mix,
          toValue: () => e.toRgbString(u),
        };
        return u;
      } else return;
    }
    let n = {
      isRGB(o) {
        return o === "rgb" || o === "rgba";
      },
      isHSL(o) {
        return o === "hsl" || o === "hsla";
      },
    };
    ((e.inspect = (o, a) =>
      o.format === "hsl"
        ? `<${o.constructor.name} h:${o.h} s:${o.s} l:${o.l} a:${o.a}>`
        : o.format === "hex" || o.format === "name"
          ? `<${o.constructor.name} "${a}">`
          : `<${o.constructor.name} r:${o.r} g:${o.g} b:${o.b} a:${o.a}>`),
      (e.isColor = (o) => (typeof o == "string" ? e.isColorString(o) : e.isColorObject(o))),
      (e.isColorString = (o) => (typeof o == "string" ? np(o) !== !1 : !1)),
      (e.isColorObject = (o) =>
        o &&
        typeof o != "string" &&
        typeof o.r == "number" &&
        typeof o.g == "number" &&
        typeof o.b == "number" &&
        typeof o.h == "number" &&
        typeof o.s == "number" &&
        typeof o.l == "number" &&
        typeof o.a == "number" &&
        typeof o.roundA == "number" &&
        typeof o.format == "string"),
      (e.toString = (o) => e.toRgbString(o)),
      (e.toHex = (o, a = !1) => Ix(o.r, o.g, o.b, a)),
      (e.toHexString = (o, a = !1) => `#${e.toHex(o, a)}`),
      (e.toRgbString = (o) =>
        o.a === 1
          ? "rgb(" + Math.round(o.r) + ", " + Math.round(o.g) + ", " + Math.round(o.b) + ")"
          : "rgba(" +
            Math.round(o.r) +
            ", " +
            Math.round(o.g) +
            ", " +
            Math.round(o.b) +
            ", " +
            o.roundA +
            ")"),
      (e.toHusl = (o) => ({ ...VF(o.r, o.g, o.b), a: o.roundA })),
      (e.toHslString = (o) => {
        let a = e.toHsl(o),
          s = Math.round(a.h),
          l = Math.round(a.s * 100),
          c = Math.round(a.l * 100);
        return o.a === 1
          ? "hsl(" + s + ", " + l + "%, " + c + "%)"
          : "hsla(" + s + ", " + l + "%, " + c + "%, " + o.roundA + ")";
      }),
      (e.toHsv = (o) => {
        let a = Rx(o.r, o.g, o.b);
        return { h: a.h * 360, s: a.s, v: a.v, a: o.a };
      }),
      (e.toHsvString = (o) => {
        let a = Rx(o.r, o.g, o.b),
          s = Math.round(a.h * 360),
          l = Math.round(a.s * 100),
          c = Math.round(a.v * 100);
        return o.a === 1
          ? "hsv(" + s + ", " + l + "%, " + c + "%)"
          : "hsva(" + s + ", " + l + "%, " + c + "%, " + o.roundA + ")";
      }),
      (e.toName = (o) => {
        if (o.a === 0) return "transparent";
        if (o.a < 1) return !1;
        let a = Ix(o.r, o.g, o.b, !0);
        for (let s of Object.keys($h)) if ($h[s] === a) return s;
        return !1;
      }),
      (e.toHsl = (o) => ({ h: Math.round(o.h), s: o.s, l: o.l, a: o.a })),
      (e.toRgb = (o) => ({ r: Math.round(o.r), g: Math.round(o.g), b: Math.round(o.b), a: o.a })),
      (e.brighten = (o, a = 10) => {
        let s = e.toRgb(o);
        return (
          (s.r = Math.max(0, Math.min(255, s.r - Math.round(255 * -(a / 100))))),
          (s.g = Math.max(0, Math.min(255, s.g - Math.round(255 * -(a / 100))))),
          (s.b = Math.max(0, Math.min(255, s.b - Math.round(255 * -(a / 100))))),
          e(s)
        );
      }),
      (e.lighten = (o, a = 10) => {
        let s = e.toHsl(o);
        return ((s.l += a / 100), (s.l = Math.min(1, Math.max(0, s.l))), e(s));
      }),
      (e.darken = (o, a = 10) => {
        let s = e.toHsl(o);
        return ((s.l -= a / 100), (s.l = Math.min(1, Math.max(0, s.l))), e(s));
      }),
      (e.saturate = (o, a = 10) => {
        let s = e.toHsl(o);
        return ((s.s += a / 100), (s.s = Math.min(1, Math.max(0, s.s))), e(s));
      }),
      (e.desaturate = (o, a = 10) => {
        let s = e.toHsl(o);
        return ((s.s -= a / 100), (s.s = Math.min(1, Math.max(0, s.s))), e(s));
      }),
      (e.grayscale = (o) => e.desaturate(o, 100)),
      (e.hueRotate = (o, a) => {
        let s = e.toHsl(o);
        return ((s.h += a), (s.h = s.h > 360 ? s.h - 360 : s.h), e(s));
      }),
      (e.alpha = (o, a = 1) => e({ r: o.r, g: o.g, b: o.b, a })),
      (e.transparent = (o) => e.alpha(o, 0)),
      (e.multiplyAlpha = (o, a = 1) => e({ r: o.r, g: o.g, b: o.b, a: o.a * a })),
      (e.interpolate = (o, a, s = "rgb") => {
        if (!e.isColorObject(o) || !e.isColorObject(a))
          throw new TypeError("Both arguments for Color.interpolate must be Color objects");
        return (l) => e.mixAsColor(o, a, l, !1, s);
      }),
      (e.mix = (o, a, { model: s = "rgb" } = {}) => {
        let l = typeof o == "string" ? e(o) : o,
          c = e.interpolate(l, a, s);
        return (u) => e.toRgbString(c(u));
      }),
      (e.mixAsColor = (o, a, s = 0.5, l = !1, c = "rgb") => {
        let u = null;
        if (n.isRGB(c))
          u = e({
            r: mr(s, [0, 1], [o.r, a.r], l),
            g: mr(s, [0, 1], [o.g, a.g], l),
            b: mr(s, [0, 1], [o.b, a.b], l),
            a: mr(s, [0, 1], [o.a, a.a], l),
          });
        else {
          let f, d;
          (n.isHSL(c)
            ? ((f = e.toHsl(o)), (d = e.toHsl(a)))
            : ((f = e.toHusl(o)), (d = e.toHusl(a))),
            f.s === 0 ? (f.h = d.h) : d.s === 0 && (d.h = f.h));
          let m = f.h,
            y = d.h,
            b = y - m;
          b > 180 ? (b = y - 360 - m) : b < -180 && (b = y + 360 - m);
          let S = {
            h: mr(s, [0, 1], [m, m + b], l),
            s: mr(s, [0, 1], [f.s, d.s], l),
            l: mr(s, [0, 1], [f.l, d.l], l),
            a: mr(s, [0, 1], [o.a, a.a], l),
          };
          n.isHSL(c) ? (u = e(S)) : (u = e(AF(S.h, S.s, S.l, S.a)));
        }
        return u;
      }),
      (e.random = (o = 1) => {
        function a() {
          return Math.floor(Math.random() * 255);
        }
        return e("rgba(" + a() + ", " + a() + ", " + a() + ", " + o + ")");
      }),
      (e.grey = (o = 0.5, a = 1) => (
        (o = Math.floor(o * 255)),
        e("rgba(" + o + ", " + o + ", " + o + ", " + a + ")")
      )),
      (e.gray = e.grey),
      (e.rgbToHsl = (o, a, s) => tp(o, a, s)),
      (e.isValidColorProperty = (o, a) =>
        !!(
          (o.toLowerCase().slice(-5) === "color" || o === "fill" || o === "stroke") &&
          typeof a == "string" &&
          e.isColorString(a)
        )),
      (e.difference = (o, a) => {
        let s = (o.r + a.r) / 2,
          l = o.r - a.r,
          c = o.g - a.g,
          u = o.b - a.b,
          f = Math.pow(l, 2),
          d = Math.pow(c, 2),
          m = Math.pow(u, 2);
        return Math.sqrt(2 * f + 4 * d + 3 * m + (s * (f - m)) / 256);
      }),
      (e.equal = (o, a, s = 0.1) =>
        !(
          Math.abs(o.r - a.r) >= s ||
          Math.abs(o.g - a.g) >= s ||
          Math.abs(o.b - a.b) >= s ||
          Math.abs(o.a - a.a) * 256 >= s
        )));
    let r = yi([0, 255], [0, 1]);
    function i(o) {
      o = r(o);
      let a = Math.abs(o);
      return a < 0.04045 ? o / 12.92 : (Math.sign(o) || 1) * Math.pow((a + 0.055) / 1.055, 2.4);
    }
    return (
      (e.luminance = (o) => {
        let { r: a, g: s, b: l } = e.toRgb(o);
        return 0.2126 * i(a) + 0.7152 * i(s) + 0.0722 * i(l);
      }),
      (e.contrast = (o, a) => {
        let s = e.luminance(o),
          l = e.luminance(a);
        return (Math.max(s, l) + 0.05) / (Math.min(s, l) + 0.05);
      }),
      e
    );
  })();
function $F(e, t, n, r = 1) {
  let i;
  return (
    typeof e == "number" &&
    !Number.isNaN(e) &&
    typeof t == "number" &&
    !Number.isNaN(t) &&
    typeof n == "number" &&
    !Number.isNaN(n)
      ? (i = Uh({ r: e, g: t, b: n, a: r }))
      : typeof e == "string"
        ? (i = WF(e))
        : typeof e == "object" &&
          (e.hasOwnProperty("r") && e.hasOwnProperty("g") && e.hasOwnProperty("b")
            ? (i = Uh(e))
            : (i = q1(e))),
    i
  );
}
function WF(e) {
  let t = np(e);
  if (t) return t.format === "hsl" ? q1(t) : t.format === "hsv" ? UF(t) : Uh(t);
}
function UF(e) {
  let t = zF(e.h, e.s, e.v);
  return { ...tp(t.r, t.g, t.b), ...t, format: "rgb", a: e.a !== void 0 ? Q1(e.a) : 1 };
}
function Uh(e) {
  let t = DF(e.r, e.g, e.b);
  return { ...tp(t.r, t.g, t.b), ...t, format: "rgb", a: e.a !== void 0 ? Q1(e.a) : 1 };
}
function q1(e) {
  let t,
    n,
    r,
    i = { r: 0, g: 0, b: 0 },
    o = { h: 0, s: 0, l: 0 };
  return (
    (t = no(e.h) ? e.h : 0),
    (t = (t + 360) % 360),
    (n = no(e.s) ? e.s : 1),
    typeof e.s == "string" && (n = Wh(e.s)),
    (r = no(e.l) ? e.l : 0.5),
    typeof e.l == "string" && (r = Wh(e.l)),
    (i = BF(t, n, r)),
    (o = { h: t, s: n, l: r }),
    { ...i, ...o, a: e.a === void 0 ? 1 : e.a, format: "hsl" }
  );
}
function Q1(e) {
  return ((e = parseFloat(e)), e < 0 && (e = 0), (isNaN(e) || e > 1) && (e = 1), e);
}
var Fx = (e) => e instanceof Is,
  S4 = { delta: 1 / 60, maxValues: 1e4 };
var jF = {
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => !1,
    ResizeObserver: void 0,
    onpointerdown: !1,
    onpointermove: !1,
    onpointerup: !1,
    ontouchstart: !1,
    ontouchmove: !1,
    ontouchend: !1,
    onmousedown: !1,
    onmousemove: !1,
    onmouseup: !1,
    devicePixelRatio: 1,
    scrollX: 0,
    scrollY: 0,
    location: { href: "" },
    setTimeout: () => 0,
    clearTimeout: () => {},
    setInterval: () => 0,
    clearInterval: () => {},
    requestAnimationFrame: () => 0,
    cancelAnimationFrame: () => {},
    getSelection: () => null,
    matchMedia: (e) => ({
      matches: !1,
      media: e,
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => !1,
    }),
    innerHeight: 0,
    innerWidth: 0,
    SVGSVGElement: {},
  },
  Te = typeof F > "u" ? jF : F,
  XF = (e) => {
    setTimeout(e, 1 / 60);
  },
  GF = Te.requestAnimationFrame || XF,
  Lx = (e) => GF(e),
  YF = jt(R_(), 1),
  { EventEmitter: KF } = YF.default,
  qF = class {
    constructor() {
      R(this, "_emitter", new KF());
    }
    eventNames() {
      return this._emitter.eventNames();
    }
    eventListeners() {
      let e = {};
      for (let t of this._emitter.eventNames()) e[t] = this._emitter.listeners(t);
      return e;
    }
    on(e, t) {
      this.addEventListener(e, t, !1, !1, this);
    }
    off(e, t) {
      this.removeEventListeners(e, t);
    }
    once(e, t) {
      this.addEventListener(e, t, !0, !1, this);
    }
    unique(e, t) {
      this.addEventListener(e, t, !1, !0, this);
    }
    addEventListener(e, t, n, r, i) {
      if (r) {
        for (let o of this._emitter.eventNames()) if (t === this._emitter.listeners(o)) return;
      }
      n === !0 ? this._emitter.once(e, t, i) : this._emitter.addListener(e, t, i);
    }
    removeEventListeners(e, t) {
      e ? this._emitter.removeListener(e, t) : this.removeAllEventListeners();
    }
    removeAllEventListeners() {
      this._emitter.removeAllListeners();
    }
    countEventListeners(e, t) {
      if (e) return this._emitter.listeners(e).length;
      {
        let n = 0;
        for (let r of this._emitter.eventNames()) n += this._emitter.listeners(r).length;
        return n;
      }
    }
    emit(e, ...t) {
      this._emitter.emit(e, ...t);
    }
  },
  _a = 1 / 60,
  QF = class extends qF {
    constructor(e = !1) {
      (super(),
        R(this, "_started", !1),
        R(this, "_frame", 0),
        R(this, "_frameTasks", []),
        R(this, "tick", () => {
          this._started &&
            (Lx(this.tick),
            this.emit("update", this._frame, _a),
            this.emit("render", this._frame, _a),
            this._processFrameTasks(),
            this._frame++);
        }),
        e && this.start());
    }
    addFrameTask(e) {
      this._frameTasks.push(e);
    }
    _processFrameTasks() {
      var e;
      let t = this._frameTasks,
        n = t.length;
      if (n !== 0) {
        for (let r = 0; r < n; r++) (e = t[r]) == null || e.call(t);
        t.length = 0;
      }
    }
    static set TimeStep(e) {
      _a = e;
    }
    static get TimeStep() {
      return _a;
    }
    start() {
      return this._started ? this : ((this._frame = 0), (this._started = !0), Lx(this.tick), this);
    }
    stop() {
      return ((this._started = !1), this);
    }
    get frame() {
      return this._frame;
    }
    get time() {
      return this._frame * _a;
    }
  },
  Z1 = new QF(),
  we = ((e) => (
    (e.canvas = "CANVAS"),
    (e.export = "EXPORT"),
    (e.thumbnail = "THUMBNAIL"),
    (e.preview = "PREVIEW"),
    e
  ))(we || {}),
  xc = { target: "PREVIEW", zoom: 1 };
((e) => {
  function t() {
    return xc.target;
  }
  e.current = t;
  function n() {
    let r = xc.target;
    return r === "CANVAS" || r === "EXPORT";
  }
  e.hasRestrictions = n;
})(we || (we = {}));
var nc = (e) => ({
  correct: (t, { delta: n, treeScale: r }) => {
    if ((typeof t == "string" && (t = parseFloat(t)), t === 0)) return "0px";
    let i = t;
    return (n && r && ((i = Math.round(t / n[e].scale / r[e])), (i = Math.max(i, 1))), i + "px");
  },
});
Tu({
  borderTopWidth: nc("y"),
  borderLeftWidth: nc("x"),
  borderRightWidth: nc("x"),
  borderBottomWidth: nc("y"),
});
function Oe(e, ...t) {
  var n, r;
  if (e) return;
  let i = Error("Assertion Error" + (t.length > 0 ? ": " + t.join(" ") : ""));
  if (i.stack)
    try {
      let o = i.stack.split(`
`);
      (n = o[1]) != null && n.includes("assert")
        ? (o.splice(1, 1),
          (i.stack = o.join(`
`)))
        : (r = o[0]) != null &&
          r.includes("assert") &&
          (o.splice(0, 1),
          (i.stack = o.join(`
`)));
    } catch {}
  throw i;
}
function St(e, t) {
  throw t || new Error(e ? `Unexpected value: ${e}` : "Application entered invalid state");
}
var ao = p.createContext({
  getLayoutId: (e) => null,
  persistLayoutIdCache: () => {},
  top: !1,
  enabled: !0,
});
function ZF({ children: e }) {
  if (O(ao).top) return p.createElement(p.Fragment, null, e);
  let n = B({
      byId: {},
      byName: {},
      byLastId: {},
      byPossibleId: {},
      byLastName: {},
      byLayoutId: {},
      count: { byId: {}, byName: {} },
    }),
    r = B({ byId: {}, byName: {}, byLastId: {}, byPossibleId: {}, byLastName: {}, byLayoutId: {} }),
    i = B(new Set()).current,
    o = ae(({ id: l, name: c, duplicatedFrom: u }) => {
      var f;
      if (!l) return null;
      let d = c ? "byName" : "byId",
        m = n.current[d][l];
      if (m) return m;
      let y = c || l;
      if (!u && !i.has(y) && (!n.current.byLayoutId[y] || n.current.byLayoutId[y] === y))
        return (
          n.current.count[d][y] === void 0 &&
            ((n.current.count[d][y] = 0), (n.current.byLayoutId[y] = y), (r.current[d][l] = y)),
          i.add(y),
          y
        );
      let b;
      if (u?.length)
        for (let E = u.length - 1; E >= 0; E--) {
          let C = u[E];
          Oe(!!C, "duplicatedId must be defined");
          let I = n.current[d][C],
            T = n.current.byLastId[C];
          if (T && !b) {
            let H = n.current.byLayoutId[T],
              L = !H || H === c;
            T && !i.has(T) && (!c || L) && (b = [T, C]);
          }
          let z = I ? n.current.byLayoutId[I] : void 0,
            A = !z || z === c;
          if (I && !i.has(I) && (!c || A))
            return ((r.current[d][l] = I), (r.current.byLastId[C] = I), i.add(I), I);
        }
      let S = n.current.byLastId[l];
      if (S && !i.has(S)) return (i.add(S), (r.current.byId[l] = S), S);
      if (b) {
        let [E, C] = b;
        return ((r.current[d][l] = E), (r.current.byLastId[C] = E), i.add(E), E);
      }
      let h = n.current.byPossibleId[l];
      if (h && !i.has(h)) return (i.add(h), (r.current.byId[l] = h), h);
      let v = u?.[0],
        g = c || v || l,
        x = ((f = n.current.count[d][g]) != null ? f : -1) + 1,
        { layoutId: k, value: w } = JF(g, x, i);
      if (((n.current.count[d][g] = w), (r.current[d][l] = k), u?.length && !c)) {
        let E = u[u.length - 1];
        if ((E && (r.current.byLastId[E] = k), u.length > 1))
          for (let C = 0; C < u.length - 1; C++) {
            let I = u[C];
            I !== void 0 && (r.current.byPossibleId[I] || (r.current.byPossibleId[I] = k));
          }
      }
      return ((r.current.byLayoutId[k] = y), i.add(k), k);
    }, []),
    a = ae(() => {
      ((n.current = {
        byId: { ...n.current.byId, ...r.current.byId },
        byLastId: { ...n.current.byLastId, ...r.current.byLastId },
        byPossibleId: { ...n.current.byPossibleId, ...r.current.byPossibleId },
        byName: { ...n.current.byName, ...r.current.byName },
        byLastName: { ...n.current.byLastName, ...r.current.byLastName },
        byLayoutId: { ...n.current.byLayoutId, ...r.current.byLayoutId },
        count: { ...n.current.count, byName: {} },
      }),
        (r.current = {
          byId: {},
          byName: {},
          byLastId: {},
          byPossibleId: {},
          byLastName: {},
          byLayoutId: {},
        }),
        i.clear());
    }, []),
    s = B({ getLayoutId: o, persistLayoutIdCache: a, top: !0, enabled: !0 }).current;
  return p.createElement(ao.Provider, { value: s }, e);
}
function JF(e, t, n) {
  let r = t,
    i = r ? `${e}-${r}` : e;
  for (; n.has(i);) (r++, (i = `${e}-${r}`));
  return { layoutId: i, value: r };
}
function e2({ enabled: e = !0, ...t }) {
  let n = O(ao),
    r = se(() => ({ ...n, enabled: e }), [e]);
  return p.createElement(ao.Provider, { ...t, value: r });
}
function Mt(e) {
  let t = B(null);
  return (t.current === null && (t.current = e()), t.current);
}
var t2 = {
    background: void 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "1.4em",
    textOverflow: "ellipsis",
    overflow: "hidden",
    minHeight: 0,
    width: "100%",
    height: "100%",
  },
  n2 = {
    ...t2,
    border: "1px solid rgba(149, 149, 149, 0.15)",
    borderRadius: 6,
    fontSize: "12px",
    backgroundColor: "rgba(149, 149, 149, 0.1)",
    color: "#a5a5a5",
  },
  J1 = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "100%",
    flexShrink: 0,
    padding: "0 10px",
  },
  r2 = { ...J1, fontWeight: 500 },
  i2 = {
    ...J1,
    whiteSpace: "pre",
    maxHeight:
      "calc(50% - calc(20px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1)))",
    WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
  };
function I4(e) {
  let { error: t, file: n } = e,
    r = n ? `Error in ${o2(n)}` : "Error",
    i = t instanceof Error ? t.message : "" + t;
  return p.createElement(
    "div",
    { style: n2 },
    p.createElement("div", { className: "text", style: r2 }, r),
    i && p.createElement("div", { className: "text", style: i2 }, i)
  );
}
function o2(e) {
  return e.startsWith("./") ? e.replace("./", "") : e;
}
var R4 = 992 - 5;
function Y(e) {
  return typeof e == "number" && isFinite(e);
}
function a2(e) {
  return !e || (!Object.keys(e).length && e.constructor === Object);
}
function ro(e) {
  return typeof e != "string" && typeof e != "number";
}
function io(e) {
  return e !== null && typeof e < "u" && typeof e != "boolean" && !a2(e);
}
var Bn;
((e) => {
  function t(i, o) {
    return i === o
      ? !0
      : !i || !o
        ? !1
        : i.x === o.x && i.y === o.y && i.width === o.width && i.height === o.height;
  }
  ((e.equals = t),
    (e.atOrigin = (i) => ({ ...i, x: 0, y: 0 })),
    (e.fromTwoPoints = (i, o) => ({
      x: Math.min(i.x, o.x),
      y: Math.min(i.y, o.y),
      width: Math.abs(i.x - o.x),
      height: Math.abs(i.y - o.y),
    })),
    (e.fromRect = (i) => ({
      x: i.left,
      y: i.top,
      width: i.right - i.left,
      height: i.bottom - i.top,
    })),
    (e.multiply = (i, o) => ({ x: i.x * o, y: i.y * o, width: i.width * o, height: i.height * o })),
    (e.divide = (i, o) => (0, e.multiply)(i, 1 / o)),
    (e.offset = (i, o) => {
      let a = typeof o.x == "number" ? o.x : 0,
        s = typeof o.y == "number" ? o.y : 0;
      return { ...i, x: i.x + a, y: i.y + s };
    }));
  function n(i, o) {
    if (o === 0) return i;
    let a = 2 * o;
    return { x: i.x - o, y: i.y - o, width: i.width + a, height: i.height + a };
  }
  ((e.inflate = n),
    (e.pixelAligned = (i) => {
      let o = Math.round(i.x),
        a = Math.round(i.y),
        s = Math.round(i.x + i.width),
        l = Math.round(i.y + i.height),
        c = Math.max(s - o, 0),
        u = Math.max(l - a, 0);
      return { x: o, y: a, width: c, height: u };
    }),
    (e.halfPixelAligned = (i) => {
      let o = Math.round(i.x * 2) / 2,
        a = Math.round(i.y * 2) / 2,
        s = Math.round((i.x + i.width) * 2) / 2,
        l = Math.round((i.y + i.height) * 2) / 2,
        c = Math.max(s - o, 1),
        u = Math.max(l - a, 1);
      return { x: o, y: a, width: c, height: u };
    }),
    (e.round = (i, o = 0) => {
      let a = ec(i.x, o),
        s = ec(i.y, o),
        l = ec(i.width, o),
        c = ec(i.height, o);
      return { x: a, y: s, width: l, height: c };
    }),
    (e.roundToOutside = (i) => {
      let o = Math.floor(i.x),
        a = Math.floor(i.y),
        s = Math.ceil(i.x + i.width),
        l = Math.ceil(i.y + i.height),
        c = Math.max(s - o, 0),
        u = Math.max(l - a, 0);
      return { x: o, y: a, width: c, height: u };
    }),
    (e.minX = (i) => i.x),
    (e.maxX = (i) => i.x + i.width),
    (e.minY = (i) => i.y),
    (e.maxY = (i) => i.y + i.height),
    (e.positions = (i) => ({
      minX: i.x,
      midX: i.x + i.width / 2,
      maxX: (0, e.maxX)(i),
      minY: i.y,
      midY: i.y + i.height / 2,
      maxY: (0, e.maxY)(i),
    })),
    (e.center = (i) => ({ x: i.x + i.width / 2, y: i.y + i.height / 2 })),
    (e.fromPoints = (i) => {
      let o = i.map((f) => f.x),
        a = i.map((f) => f.y),
        s = Math.min(...o),
        l = Math.min(...a),
        c = Math.max(...o) - s,
        u = Math.max(...a) - l;
      return { x: s, y: l, width: c, height: u };
    }),
    (e.merge = (...i) => {
      let o = { x: Math.min(...i.map(e.minX)), y: Math.min(...i.map(e.minY)) },
        a = { x: Math.max(...i.map(e.maxX)), y: Math.max(...i.map(e.maxY)) };
      return (0, e.fromTwoPoints)(o, a);
    }),
    (e.intersection = (i, o) => {
      let a = Math.max(i.x, o.x),
        s = Math.min(i.x + i.width, o.x + o.width),
        l = Math.max(i.y, o.y),
        c = Math.min(i.y + i.height, o.y + o.height);
      return { x: a, y: l, width: s - a, height: c - l };
    }),
    (e.points = (i) => [
      { x: (0, e.minX)(i), y: (0, e.minY)(i) },
      { x: (0, e.minX)(i), y: (0, e.maxY)(i) },
      { x: (0, e.maxX)(i), y: (0, e.minY)(i) },
      { x: (0, e.maxX)(i), y: (0, e.maxY)(i) },
    ]),
    (e.transform = (i, o) => {
      let { x: a, y: s } = o.transformPoint({ x: i.x, y: i.y }),
        { x: l, y: c } = o.transformPoint({ x: i.x + i.width, y: i.y }),
        { x: u, y: f } = o.transformPoint({ x: i.x + i.width, y: i.y + i.height }),
        { x: d, y: m } = o.transformPoint({ x: i.x, y: i.y + i.height }),
        y = Math.min(a, l, u, d),
        b = Math.max(a, l, u, d) - y,
        S = Math.min(s, c, f, m),
        h = Math.max(s, c, f, m) - S;
      return { x: y, y: S, width: b, height: h };
    }),
    (e.containsPoint = (i, o) =>
      !(
        o.x < (0, e.minX)(i) ||
        o.x > (0, e.maxX)(i) ||
        o.y < (0, e.minY)(i) ||
        o.y > (0, e.maxY)(i) ||
        isNaN(i.x) ||
        isNaN(i.y)
      )),
    (e.containsRect = (i, o) => {
      for (let a of (0, e.points)(o)) if (!(0, e.containsPoint)(i, a)) return !1;
      return !0;
    }),
    (e.toCSS = (i) => ({
      display: "block",
      transform: `translate(${i.x}px, ${i.y}px)`,
      width: `${i.width}px`,
      height: `${i.height}px`,
    })),
    (e.inset = (i, o) => ({
      x: i.x + o,
      y: i.y + o,
      width: Math.max(0, i.width - 2 * o),
      height: Math.max(0, i.height - 2 * o),
    })),
    (e.intersects = (i, o) =>
      !(
        o.x >= (0, e.maxX)(i) ||
        (0, e.maxX)(o) <= i.x ||
        o.y >= (0, e.maxY)(i) ||
        (0, e.maxY)(o) <= i.y
      )),
    (e.overlapHorizontally = (i, o) => {
      let a = e.maxX(i),
        s = e.maxX(o);
      return a > o.x && s > i.x;
    }),
    (e.overlapVertically = (i, o) => {
      let a = e.maxY(i),
        s = e.maxY(o);
      return a > o.y && s > i.y;
    }),
    (e.doesNotIntersect = (i, o) => o.find((a) => e.intersects(a, i)) === void 0),
    (e.isEqual = (i, o) => e.equals(i, o)),
    (e.cornerPoints = (i) => {
      let o = i.x,
        a = i.x + i.width,
        s = i.y,
        l = i.y + i.height;
      return [
        { x: o, y: s },
        { x: a, y: s },
        { x: a, y: l },
        { x: o, y: l },
      ];
    }),
    (e.midPoints = (i) => {
      let o = i.x,
        a = i.x + i.width / 2,
        s = i.x + i.width,
        l = i.y,
        c = i.y + i.height / 2,
        u = i.y + i.height;
      return [
        { x: a, y: l },
        { x: s, y: c },
        { x: a, y: u },
        { x: o, y: c },
      ];
    }),
    (e.pointDistance = (i, o) => {
      let a = 0,
        s = 0;
      return (
        o.x < i.x ? (a = i.x - o.x) : o.x > e.maxX(i) && (a = o.x - e.maxX(i)),
        o.y < i.y ? (s = i.y - o.y) : o.y > e.maxY(i) && (s = o.y - e.maxY(i)),
        ct.distance({ x: a, y: s }, { x: 0, y: 0 })
      );
    }));
  let r = { x: 0, y: 0, width: 0, height: 0 };
  ((e.fromAny = (i, o = r) => ({
    x: i.x || o.x,
    y: i.y || o.y,
    width: i.width || o.width,
    height: i.height || o.height,
  })),
    (e.delta = (i, o) => {
      let a = { x: (0, e.minX)(i), y: (0, e.minY)(i) },
        s = { x: (0, e.minX)(o), y: (0, e.minY)(o) };
      return { x: a.x - s.x, y: a.y - s.y };
    }),
    (e.withMinSize = (i, o) => {
      let { width: a, height: s } = o,
        l = i.width - a,
        c = i.height - s;
      return {
        width: Math.max(i.width, a),
        height: Math.max(i.height, s),
        x: i.width < a ? i.x + l / 2 : i.x,
        y: i.height < s ? i.y + c / 2 : i.y,
      };
    }),
    (e.rebaseRectOnto = (i, o, a, s) => {
      let l = { ...i };
      switch (a) {
        case "bottom":
        case "top":
          switch (s) {
            case "start":
              l.x = o.x;
              break;
            case "center":
              l.x = o.x + o.width / 2 - i.width / 2;
              break;
            case "end":
              l.x = o.x + o.width - i.width;
              break;
            default:
              St(s);
          }
          break;
        case "left":
          l.x = o.x - i.width;
          break;
        case "right":
          l.x = o.x + o.width;
          break;
        default:
          St(a);
      }
      switch (a) {
        case "left":
        case "right":
          switch (s) {
            case "start":
              l.y = o.y;
              break;
            case "center":
              l.y = o.y + o.height / 2 - i.height / 2;
              break;
            case "end":
              l.y = o.y + o.height - i.height;
              break;
            default:
              St(s);
          }
          break;
        case "top":
          l.y = o.y - i.height;
          break;
        case "bottom":
          l.y = o.y + o.height;
          break;
        default:
          St(a);
      }
      return l;
    }));
})(Bn || (Bn = {}));
var Sc;
((e) => {
  e.quickfix = (t) => (
    (t.widthType === 2 || t.heightType === 2) && (t.aspectRatio = null),
    Y(t.aspectRatio) &&
      (t.left && t.right && (t.widthType = 0),
      t.top && t.bottom && (t.heightType = 0),
      t.left && t.right && t.top && t.bottom && (t.bottom = !1),
      t.widthType !== 0 && t.heightType !== 0 && (t.heightType = 0)),
    t.left &&
      t.right &&
      ((t.fixedSize || t.widthType === 2 || Y(t.maxWidth)) && (t.right = !1), (t.widthType = 0)),
    t.top &&
      t.bottom &&
      ((t.fixedSize || t.heightType === 2 || Y(t.maxHeight)) && (t.bottom = !1),
      (t.heightType = 0)),
    t
  );
})(Sc || (Sc = {}));
function wc(e) {
  if (typeof e == "string") {
    let t = e.trim();
    if (t === "auto") return 2;
    if (t.endsWith("fr")) return 3;
    if (t.endsWith("%")) return 1;
    if (t.endsWith("vw") || t.endsWith("vh")) return 4;
  }
  return 0;
}
var jh;
((e) => {
  ((e.fromProperties = (t) => {
    let {
        left: n,
        right: r,
        top: i,
        bottom: o,
        width: a,
        height: s,
        centerX: l,
        centerY: c,
        aspectRatio: u,
        autoSize: f,
      } = t,
      d = Sc.quickfix({
        left: Y(n) || en(n),
        right: Y(r) || en(r),
        top: Y(i) || en(i),
        bottom: Y(o) || en(o),
        widthType: wc(a),
        heightType: wc(s),
        aspectRatio: u || null,
        fixedSize: f === !0,
      }),
      m = null,
      y = null,
      b = 0,
      S = 0;
    if (d.widthType !== 0 && typeof a == "string") {
      let g = parseFloat(a);
      a.endsWith("fr") ? ((b = 3), (m = g)) : a === "auto" ? (b = 2) : ((b = 1), (m = g / 100));
    } else a !== void 0 && typeof a != "string" && (m = _e.getNumber(a));
    if (d.heightType !== 0 && typeof s == "string") {
      let g = parseFloat(s);
      s.endsWith("fr")
        ? ((S = 3), (y = g))
        : s === "auto"
          ? (S = 2)
          : ((S = 1), (y = parseFloat(s) / 100));
    } else s !== void 0 && typeof s != "string" && (y = _e.getNumber(s));
    let h = 0.5,
      v = 0.5;
    return (
      l && (h = parseFloat(l) / 100),
      c && (v = parseFloat(c) / 100),
      {
        left: d.left ? _e.getNumber(n) : null,
        right: d.right ? _e.getNumber(r) : null,
        top: d.top ? _e.getNumber(i) : null,
        bottom: d.bottom ? _e.getNumber(o) : null,
        widthType: b,
        heightType: S,
        width: m,
        height: y,
        aspectRatio: d.aspectRatio || null,
        centerAnchorX: h,
        centerAnchorY: v,
      }
    );
  }),
    (e.toSize = (t, n, r, i) => {
      let o = null,
        a = null,
        s = n?.sizing ? _e.getNumber(n?.sizing.width) : null,
        l = n?.sizing ? _e.getNumber(n?.sizing.height) : null,
        c = Mx(t.left, t.right);
      if (s && Y(c)) o = s - c;
      else if (r && t.widthType === 2) o = r.width;
      else if (Y(t.width))
        switch (t.widthType) {
          case 0:
            o = t.width;
            break;
          case 3:
            o = i ? (i.freeSpaceInParent.width / i.freeSpaceUnitDivisor.width) * t.width : null;
            break;
          case 1:
          case 4:
            s && (o = s * t.width);
            break;
          case 2:
            break;
          default:
            St(t.widthType);
        }
      let u = Mx(t.top, t.bottom);
      if (l && Y(u)) a = l - u;
      else if (r && t.heightType === 2) a = r.height;
      else if (Y(t.height))
        switch (t.heightType) {
          case 0:
            a = t.height;
            break;
          case 3:
            a = i ? (i.freeSpaceInParent.height / i.freeSpaceUnitDivisor.height) * t.height : null;
            break;
          case 1:
          case 4:
            l && (a = l * t.height);
            break;
          case 2:
            break;
          default:
            St(t.heightType);
        }
      return f2(o, a, t, { height: l ?? 0, width: s ?? 0 }, n?.viewport);
    }),
    (e.toRect = (t, n = null, r = null, i = !1, o = null) => {
      var a;
      let s = t.left || 0,
        l = t.top || 0,
        { width: c, height: u } = e.toSize(t, n, r, o),
        f = (a = n?.positioning) != null ? a : null,
        d = f ? _e.getNumber(f.width) : null,
        m = f ? _e.getNumber(f.height) : null;
      (t.left !== null
        ? (s = t.left)
        : d && t.right !== null
          ? (s = d - t.right - c)
          : d && (s = t.centerAnchorX * d - c / 2),
        t.top !== null
          ? (l = t.top)
          : m && t.bottom !== null
            ? (l = m - t.bottom - u)
            : m && (l = t.centerAnchorY * m - u / 2));
      let y = { x: s, y: l, width: c, height: u };
      return i ? Bn.pixelAligned(y) : y;
    }));
})(jh || (jh = {}));
var s2 = 200,
  l2 = 200;
function kc(e, t, n, r) {
  if (typeof t == "string") {
    if (t.endsWith("%") && n)
      switch (e) {
        case "maxWidth":
        case "minWidth":
          return (parseFloat(t) / 100) * n.width;
        case "maxHeight":
        case "minHeight":
          return (parseFloat(t) / 100) * n.height;
        default:
          break;
      }
    if (t.endsWith("vh") && r)
      switch (e) {
        case "maxWidth":
        case "minWidth":
          return (parseFloat(t) / 100) * r.width;
        case "maxHeight":
        case "minHeight":
          return (parseFloat(t) / 100) * r.height;
        default:
          break;
      }
    return parseFloat(t);
  }
  return t;
}
function c2(e, t, n, r) {
  return (
    t.minHeight && (e = Math.max(kc("minHeight", t.minHeight, n, r), e)),
    t.maxHeight && (e = Math.min(kc("maxHeight", t.maxHeight, n, r), e)),
    e
  );
}
function u2(e, t, n, r) {
  return (
    t.minWidth && (e = Math.max(kc("minWidth", t.minWidth, n, r), e)),
    t.maxWidth && (e = Math.min(kc("maxWidth", t.maxWidth, n, r), e)),
    e
  );
}
function f2(e, t, n, r, i) {
  let o = u2(Y(e) ? e : s2, n, r, i),
    a = c2(Y(t) ? t : l2, n, r, i);
  return (
    Y(n.aspectRatio) &&
      n.aspectRatio > 0 &&
      (Y(n.left) && Y(n.right)
        ? (a = o / n.aspectRatio)
        : Y(n.top) && Y(n.bottom)
          ? (o = a * n.aspectRatio)
          : n.widthType !== 0
            ? (a = o / n.aspectRatio)
            : (o = a * n.aspectRatio)),
    { width: o, height: a }
  );
}
function Mx(e, t) {
  return !Y(e) || !Y(t) ? null : e + t;
}
function d2(e) {
  return (
    typeof e.right == "string" ||
    typeof e.bottom == "string" ||
    (typeof e.left == "string" && (!e.center || e.center === "y")) ||
    (typeof e.top == "string" && (!e.center || e.center === "x"))
  );
}
function Ua(e) {
  return !e._constraints || d2(e) ? !1 : e._constraints.enabled;
}
function h2(e) {
  let { size: t } = e,
    { width: n, height: r } = e;
  return (
    Y(t) && (n === void 0 && (n = t), r === void 0 && (r = t)),
    Y(n) && Y(r) ? { width: n, height: r } : null
  );
}
function p2(e) {
  let t = h2(e);
  if (t === null) return null;
  let { left: n, top: r } = e;
  return Y(n) && Y(r) ? { x: n, y: r, ...t } : null;
}
function za(e, t, n = !0) {
  if (e.positionFixed || e.positionAbsolute) return null;
  let r = t === 1 || t === 2;
  if (!Ua(e) || r) return p2(e);
  let i = m2(e),
    o = v2(t),
    a = o ? { sizing: o, positioning: o, viewport: null } : null;
  return jh.toRect(i, a, null, n, null);
}
function m2(e) {
  let { left: t, right: n, top: r, bottom: i, center: o, _constraints: a, size: s } = e,
    { width: l, height: c } = e;
  (l === void 0 && (l = s), c === void 0 && (c = s));
  let { aspectRatio: u, autoSize: f } = a,
    d = Sc.quickfix({
      left: Y(t),
      right: Y(n),
      top: Y(r),
      bottom: Y(i),
      widthType: wc(l),
      heightType: wc(c),
      aspectRatio: u || null,
      fixedSize: f === !0,
    }),
    m = null,
    y = null,
    b = 0,
    S = 0;
  if (d.widthType !== 0 && typeof l == "string") {
    let g = parseFloat(l);
    l.endsWith("fr") ? ((b = 3), (m = g)) : l === "auto" ? (b = 2) : ((b = 1), (m = g / 100));
  } else l !== void 0 && typeof l != "string" && (m = l);
  if (d.heightType !== 0 && typeof c == "string") {
    let g = parseFloat(c);
    c.endsWith("fr")
      ? ((S = 3), (y = g))
      : c === "auto"
        ? (S = 2)
        : ((S = 1), (y = parseFloat(c) / 100));
  } else c !== void 0 && typeof c != "string" && (y = c);
  let h = 0.5,
    v = 0.5;
  return (
    (o === !0 || o === "x") && ((d.left = !1), typeof t == "string" && (h = parseFloat(t) / 100)),
    (o === !0 || o === "y") && ((d.top = !1), typeof r == "string" && (v = parseFloat(r) / 100)),
    {
      left: d.left ? t : null,
      right: d.right ? n : null,
      top: d.top ? r : null,
      bottom: d.bottom ? i : null,
      widthType: b,
      heightType: S,
      width: m,
      height: y,
      aspectRatio: d.aspectRatio || null,
      centerAnchorX: h,
      centerAnchorY: v,
      minHeight: e.minHeight,
      maxHeight: e.maxHeight,
      minWidth: e.minWidth,
      maxWidth: e.maxWidth,
    }
  );
}
var rp = p.createContext({ parentSize: 0 });
function v2(e) {
  return e === 0 || e === 1 || e === 2 ? null : e;
}
function ja() {
  return p.useContext(rp).parentSize;
}
function eS(e) {
  return typeof e == "object";
}
var g2 = (e) => {
  let t = ja(),
    { parentSize: n, children: r } = e,
    i = p.useMemo(() => ({ parentSize: n }), [y2(n), b2(n)]);
  return t === 1
    ? r
      ? p.createElement(p.Fragment, null, r)
      : null
    : p.createElement(rp.Provider, { value: i }, r);
};
function y2(e) {
  return eS(e) ? e.width : e;
}
function b2(e) {
  return eS(e) ? e.height : e;
}
var F4 = rp.Consumer;
function x2(e, t) {
  return p.createElement(g2, { parentSize: t }, e);
}
function S2(e) {
  let t = ja();
  return za(e, t, !0);
}
var w2 = ((e) => (
    (e.Boolean = "boolean"),
    (e.Number = "number"),
    (e.String = "string"),
    (e.RichText = "richtext"),
    (e.FusedNumber = "fusednumber"),
    (e.Enum = "enum"),
    (e.SegmentedEnum = "segmentedenum"),
    (e.Color = "color"),
    (e.Image = "image"),
    (e.ResponsiveImage = "responsiveimage"),
    (e.File = "file"),
    (e.ComponentInstance = "componentinstance"),
    (e.Array = "array"),
    (e.EventHandler = "eventhandler"),
    (e.Transition = "transition"),
    (e.Link = "link"),
    (e.Date = "date"),
    (e.Object = "object"),
    (e.Font = "font"),
    (e.PageScope = "pagescope"),
    (e.ScrollSectionRef = "scrollsectionref"),
    (e.CustomCursor = "customcursor"),
    e
  ))(w2 || {}),
  Th;
function k2() {
  if (Th !== void 0) return Th;
  let e = document.createElement("div");
  (Object.assign(e.style, {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    rowGap: "1px",
  }),
    e.appendChild(document.createElement("div")),
    e.appendChild(document.createElement("div")),
    document.body.appendChild(e));
  let t = e.scrollHeight === 1;
  return (e.parentNode && e.parentNode.removeChild(e), (Th = t), t);
}
var ri = "flexbox-gap-not-supported",
  Ox = !1;
function L4() {
  Ox || ((Ox = !0), !k2() && document.body.classList.add(ri));
}
var C2 = `
[data-framer-component-type="DeprecatedRichText"] p,
[data-framer-component-type="DeprecatedRichText"] div,
[data-framer-component-type="DeprecatedRichText"] h1,
[data-framer-component-type="DeprecatedRichText"] h2,
[data-framer-component-type="DeprecatedRichText"] h3,
[data-framer-component-type="DeprecatedRichText"] h4,
[data-framer-component-type="DeprecatedRichText"] h5,
[data-framer-component-type="DeprecatedRichText"] h6,
[data-framer-component-type="DeprecatedRichText"] li,
[data-framer-component-type="DeprecatedRichText"] ol,
[data-framer-component-type="DeprecatedRichText"] ul,
[data-framer-component-type="DeprecatedRichText"] span:not([data-text-fill]) {
    font-family: var(--framer-font-family, Inter, Inter Placeholder, sans-serif);
    font-style: var(--framer-font-style, normal);
    font-weight: var(--framer-font-weight, 400);
    color: var(--framer-text-color, #000);
    font-size: var(--framer-font-size, 16px);
    letter-spacing: var(--framer-letter-spacing, 0);
    text-transform: var(--framer-text-transform, none);
    text-decoration: var(--framer-text-decoration, none);
    line-height: var(--framer-line-height, 1.2em);
    text-align: var(--framer-text-alignment, start);
}
`,
  E2 = `
[data-framer-component-type="DeprecatedRichText"] p:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] div:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] h1:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] h2:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] h3:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] h4:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] h5:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] h6:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] ol:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] ul:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] .framer-image:not(:first-child) {
    margin-top: var(--framer-paragraph-spacing, 0);
}
`,
  T2 = `
[data-framer-component-type="DeprecatedRichText"] span[data-text-fill] {
    display: inline-block;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
`,
  I2 = `
[data-framer-component-type="DeprecatedRichText"] a,
[data-framer-component-type="DeprecatedRichText"] a span:not([data-text-fill]) {
    font-family: var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
    font-style: var(--framer-link-font-style, var(--framer-font-style, normal));
    font-weight: var(--framer-link-font-weight, var(--framer-font-weight, 400));
    color: var(--framer-link-text-color, var(--framer-text-color, #000));
    font-size: var(--framer-link-font-size, var(--framer-font-size, 16px));
    text-transform: var(--framer-link-text-transform, var(--framer-text-transform, none));
    text-decoration: var(--framer-link-text-decoration, var(--framer-text-decoration, none));
}
`,
  R2 = `
[data-framer-component-type="DeprecatedRichText"] a:hover,
[data-framer-component-type="DeprecatedRichText"] a:hover span:not([data-text-fill]) {
    font-family: var(--framer-link-hover-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif)));
    font-style: var(--framer-link-hover-font-style, var(--framer-link-font-style, var(--framer-font-style, normal)));
    font-weight: var(--framer-link-hover-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400)));
    color: var(--framer-link-hover-text-color, var(--framer-link-text-color, var(--framer-text-color, #000)));
    font-size: var(--framer-link-hover-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px)));
    text-transform: var(--framer-link-hover-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none)));
    text-decoration: var(--framer-link-hover-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, none)));
}
`,
  P2 = `
a[data-framer-page-link-current],
a[data-framer-page-link-current] span:not([data-text-fill]) {
    font-family: var(--framer-link-current-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif)));
    font-style: var(--framer-link-current-font-style, var(--framer-link-font-style, var(--framer-font-style, normal)));
    font-weight: var(--framer-link-current-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400)));
    color: var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-text-color, #000)));
    font-size: var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px)));
    text-transform: var(--framer-link-current-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none)));
    text-decoration: var(--framer-link-current-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, none)));
}
`,
  _2 = `
a[data-framer-page-link-current]:hover,
a[data-framer-page-link-current]:hover span:not([data-text-fill]) {
    font-family: var(--framer-link-hover-font-family, var(--framer-link-current-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif))));
    font-style: var(--framer-link-hover-font-style, var(--framer-link-current-font-style, var(--framer-link-font-style, var(--framer-font-style, normal))));
    font-weight: var(--framer-link-hover-font-weight, var(--framer-link-current-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400))));
    color: var(--framer-link-hover-text-color, var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-text-color, #000))));
    font-size: var(--framer-link-hover-font-size, var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px))));
    text-transform: var(--framer-link-hover-text-transform, var(--framer-link-current-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none))));
    text-decoration: var(--framer-link-hover-text-decoration, var(--framer-link-current-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, none))));
}
`,
  F2 = `
[data-framer-component-type="DeprecatedRichText"] strong {
    font-weight: bolder;
}
`,
  L2 = `
[data-framer-component-type="DeprecatedRichText"] em {
    font-style: italic;
}
`,
  M2 = `
[data-framer-component-type="DeprecatedRichText"] .framer-image {
    display: block;
    max-width: 100%;
    height: auto;
}
`,
  O2 = `
[data-framer-component-type="DeprecatedRichText"] p,
[data-framer-component-type="DeprecatedRichText"] div,
[data-framer-component-type="DeprecatedRichText"] h1,
[data-framer-component-type="DeprecatedRichText"] h2,
[data-framer-component-type="DeprecatedRichText"] h3,
[data-framer-component-type="DeprecatedRichText"] h4,
[data-framer-component-type="DeprecatedRichText"] h5,
[data-framer-component-type="DeprecatedRichText"] h6 {
    margin: 0;
    padding: 0;
}
`,
  V2 = `
[data-framer-component-type="DeprecatedRichText"] .text-styles-preset-reset {
    --framer-font-family: Inter, Inter Placeholder, sans-serif;
    --framer-font-style: normal;
    --framer-font-weight: 500;
    --framer-text-color: #000;
    --framer-font-size: 16px;
    --framer-letter-spacing: 0;
    --framer-text-transform: none;
    --framer-text-decoration: none;
    --framer-line-height: 1.2em;
    --framer-text-alignment: start;
}
`,
  A2 = `
[data-framer-component-type="DeprecatedRichText"] ul,
[data-framer-component-type="DeprecatedRichText"] ol {
    display: table;
    width: 100%;
    padding-left: 0;
    margin: 0;
}
`,
  D2 = `
[data-framer-component-type="DeprecatedRichText"] li {
    display: table-row;
    counter-increment: list-item;
    list-style: none;
}
`,
  B2 = `
[data-framer-component-type="DeprecatedRichText"] ol > li::before {
    display: table-cell;
    width: 2.25ch;
    box-sizing: border-box;
    padding-right: 0.75ch;
    content: counter(list-item) ".";
    white-space: nowrap;
}
`,
  z2 = `
[data-framer-component-type="DeprecatedRichText"] ul > li::before {
    display: table-cell;
    width: 2.25ch;
    box-sizing: border-box;
    padding-right: 0.75ch;
    content: "\u2022";
}
`,
  H2 = [
    '[data-framer-component-type="DeprecatedRichText"] { cursor: inherit; }',
    V2,
    O2,
    C2,
    E2,
    T2,
    I2,
    R2,
    P2,
    _2,
    F2,
    L2,
    M2,
    A2,
    D2,
    B2,
    z2,
  ],
  N2 = [
    `
        p.framer-text,
        div.framer-text,
        h1.framer-text,
        h2.framer-text,
        h3.framer-text,
        h4.framer-text,
        h5.framer-text,
        h6.framer-text,
        ol.framer-text,
        ul.framer-text {
            margin: 0;
            padding: 0;
        }
    `,
    `
        p.framer-text,
        div.framer-text,
        h1.framer-text,
        h2.framer-text,
        h3.framer-text,
        h4.framer-text,
        h5.framer-text,
        h6.framer-text,
        li.framer-text,
        ol.framer-text,
        ul.framer-text,
        span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-font-family, Inter, Inter Placeholder, sans-serif);
            font-style: var(--framer-font-style, normal);
            font-weight: var(--framer-font-weight, 400);
            color: var(--framer-text-color, #000);
            font-size: calc(var(--framer-font-size, 16px) * var(--framer-font-size-scale, 1));
            letter-spacing: var(--framer-letter-spacing, 0);
            text-transform: var(--framer-text-transform, none);
            text-decoration: var(--framer-text-decoration, none);
            line-height: var(--framer-line-height, 1.2em);
            text-align: var(--framer-text-alignment, start);
        }
    `,
    `
        .framer-fit-text .framer-text {
            white-space: nowrap;
        }
    `,
    `
        strong.framer-text {
            font-family: var(--framer-font-family-bold);
            font-style: var(--framer-font-style-bold);
            font-weight: var(--framer-font-weight-bold, bolder);
        }
    `,
    `
        em.framer-text {
            font-family: var(--framer-font-family-italic);
            font-style: var(--framer-font-style-italic, italic);
            font-weight: var(--framer-font-weight-italic);
        }
    `,
    `
        em.framer-text > strong.framer-text {
            font-family: var(--framer-font-family-bold-italic);
            font-style: var(--framer-font-style-bold-italic, italic);
            font-weight: var(--framer-font-weight-bold-italic, bolder);
        }
    `,
    `
        p.framer-text:not(:first-child),
        div.framer-text:not(:first-child),
        h1.framer-text:not(:first-child),
        h2.framer-text:not(:first-child),
        h3.framer-text:not(:first-child),
        h4.framer-text:not(:first-child),
        h5.framer-text:not(:first-child),
        h6.framer-text:not(:first-child),
        ol.framer-text:not(:first-child),
        ul.framer-text:not(:first-child),
        .framer-image.framer-text:not(:first-child) {
            margin-top: var(--framer-paragraph-spacing, 0);
        }
    `,
    `
        li.framer-text > ul.framer-text:nth-child(2),
        li.framer-text > ol.framer-text:nth-child(2) {
            margin-top: 0;
        }
    `,
    `
        .framer-text[data-text-fill] {
            display: inline-block;
            background-clip: text;
            -webkit-background-clip: text;
            /* make this a transparent color if you want to visualise the clipping  */
            -webkit-text-fill-color: transparent;
            padding: max(0em, calc(calc(1.3em - var(--framer-line-height, 1.3em)) / 2));
            margin: min(0em, calc(calc(1.3em - var(--framer-line-height, 1.3em)) / -2));
        }
    `,
    `
        code.framer-text,
        code.framer-text span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-code-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
            font-style: var(--framer-code-font-style, var(--framer-font-style, normal));
            font-weight: var(--framer-code-font-weight, var(--framer-font-weight, 400));
            color: var(--framer-code-text-color, var(--framer-text-color, #000));
            font-size: calc(var(--framer-font-size, 16px) * var(--framer-font-size-scale, 1));
            letter-spacing: var(--framer-letter-spacing, 0);
            line-height: var(--framer-line-height, 1.2em);
        }
    `,
    `
        a.framer-text,
        a.framer-text span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
            font-style: var(--framer-link-font-style, var(--framer-font-style, normal));
            font-weight: var(--framer-link-font-weight, var(--framer-font-weight, 400));
            color: var(--framer-link-text-color, var(--framer-text-color, #000));
            font-size: calc(var(--framer-link-font-size, var(--framer-font-size, 16px)) * var(--framer-font-size-scale, 1));
            text-transform: var(--framer-link-text-transform, var(--framer-text-transform, none));
            text-decoration: var(--framer-link-text-decoration, var(--framer-text-decoration, none));
            /* Cursor inherit to overwrite the user agent stylesheet on rich text links. */
            cursor: var(--framer-custom-cursors, pointer);
        }
    `,
    `
        code.framer-text a.framer-text,
        code.framer-text a.framer-text span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-code-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
            font-style: var(--framer-code-font-style, var(--framer-font-style, normal));
            font-weight: var(--framer-code-font-weight, var(--framer-font-weight, 400));
            color: var(--framer-link-text-color, var(--framer-code-text-color, var(--framer-text-color, #000)));
            font-size: calc(var(--framer-link-font-size, var(--framer-font-size, 16px)) * var(--framer-font-size-scale, 1));
        }
    `,
    `
        a.framer-text:hover,
        a.framer-text:hover span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-link-hover-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif)));
            font-style: var(--framer-link-hover-font-style, var(--framer-link-font-style, var(--framer-font-style, normal)));
            font-weight: var(--framer-link-hover-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400)));
            color: var(--framer-link-hover-text-color, var(--framer-link-text-color, var(--framer-text-color, #000)));
            font-size: calc(var(--framer-link-hover-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px))) * var(--framer-font-size-scale, 1));
            text-transform: var(--framer-link-hover-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none)));
            text-decoration: var(--framer-link-hover-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, none)));
        }
    `,
    `
        code.framer-text a.framer-text:hover,
        code.framer-text a.framer-text:hover span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-code-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
            font-style: var(--framer-code-font-style, var(--framer-font-style, normal));
            font-weight: var(--framer-code-font-weight, var(--framer-font-weight, 400));
            color: var(--framer-link-hover-text-color, var(--framer-link-text-color, var(--framer-code-text-color, var(--framer-text-color, #000))));
            font-size: calc(var(--framer-link-hover-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px))) * var(--framer-font-size-scale, 1));
        }
    `,
    `
        a.framer-text[data-framer-page-link-current],
        a.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-link-current-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif)));
            font-style: var(--framer-link-current-font-style, var(--framer-link-font-style, var(--framer-font-style, normal)));
            font-weight: var(--framer-link-current-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400)));
            color: var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-text-color, #000)));
            font-size: calc(var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px))) * var(--framer-font-size-scale, 1));
            text-transform: var(--framer-link-current-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none)));
            text-decoration: var(--framer-link-current-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, none)));
        }
    `,
    `
        code.framer-text a.framer-text[data-framer-page-link-current],
        code.framer-text a.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-code-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
            font-style: var(--framer-code-font-style, var(--framer-font-style, normal));
            font-weight: var(--framer-code-font-weight, var(--framer-font-weight, 400));
            color: var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-code-text-color, var(--framer-text-color, #000))));
            font-size: calc(var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px))) * var(--framer-font-size-scale, 1));
        }
    `,
    `
        a.framer-text[data-framer-page-link-current]:hover,
        a.framer-text[data-framer-page-link-current]:hover span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-link-hover-font-family, var(--framer-link-current-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif))));
            font-style: var(--framer-link-hover-font-style, var(--framer-link-current-font-style, var(--framer-link-font-style, var(--framer-font-style, normal))));
            font-weight: var(--framer-link-hover-font-weight, var(--framer-link-current-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400))));
            color: var(--framer-link-hover-text-color, var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-text-color, #000))));
            font-size: calc(var(--framer-link-hover-font-size, var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px)))) * var(--framer-font-size-scale, 1));
            text-transform: var(--framer-link-hover-text-transform, var(--framer-link-current-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none))));
            text-decoration: var(--framer-link-hover-text-decoration, var(--framer-link-current-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, none))));
        }
    `,
    `
        code.framer-text a.framer-text[data-framer-page-link-current]:hover,
        code.framer-text a.framer-text[data-framer-page-link-current]:hover span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-code-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
            font-style: var(--framer-code-font-style, var(--framer-font-style, normal));
            font-weight: var(--framer-code-font-weight, var(--framer-font-weight, 400));
            color: var(--framer-link-hover-text-color, var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-code-text-color, var(--framer-text-color, #000)))));
            font-size: calc(var(--framer-link-hover-font-size, var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px)))) * var(--framer-font-size-scale, 1));
        }
    `,
    `
        .framer-image.framer-text {
            display: block;
            max-width: 100%;
            height: auto;
        }
    `,
    `
        .text-styles-preset-reset.framer-text {
            --framer-font-family: Inter, Inter Placeholder, sans-serif;
            --framer-font-style: normal;
            --framer-font-weight: 500;
            --framer-text-color: #000;
            --framer-font-size: 16px;
            --framer-letter-spacing: 0;
            --framer-text-transform: none;
            --framer-text-decoration: none;
            --framer-line-height: 1.2em;
            --framer-text-alignment: start;
        }
    `,
    `
        ol.framer-text {
            --list-style-type: decimal;
        }
    `,
    `
        ul.framer-text,
        ol.framer-text {
            display: table;
            width: 100%;
        }
    `,
    `
        li.framer-text {
            display: table-row;
            counter-increment: list-item;
            list-style: none;
        }
    `,
    `
        ol.framer-text > li.framer-text::before {
            display: table-cell;
            width: 2.25ch;
            box-sizing: border-box;
            padding-inline-end: 0.75ch;
            content: counter(list-item, var(--list-style-type)) ".";
            white-space: nowrap;
        }
    `,
    `
        ul.framer-text > li.framer-text::before {
            display: table-cell;
            width: 2.25ch;
            box-sizing: border-box;
            padding-inline-end: 0.75ch;
            content: "\u2022";
        }
    `,
    `
        .framer-text-module[style*="aspect-ratio"] > :first-child {
            width: 100%;
        }
    `,
    `
        @supports not (aspect-ratio: 1) {
            .framer-text-module[style*="aspect-ratio"] {
                position: relative;
            }
        }
    `,
    `
        @supports not (aspect-ratio: 1) {
            .framer-text-module[style*="aspect-ratio"]::before {
                content: "";
                display: block;
                padding-bottom: calc(100% / calc(var(--aspect-ratio)));
            }
        }
    `,
    `
        @supports not (aspect-ratio: 1) {
            .framer-text-module[style*="aspect-ratio"] > :first-child {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
            }
        }
    `,
  ],
  $2 = new Set(),
  Ih;
function tS(e, t, n = $2) {
  if (!(!e || n.has(e) || typeof document > "u")) {
    if ((n.add(e), !t)) {
      if (!Ih) {
        let r = document.createElement("style");
        if (
          (r.setAttribute("type", "text/css"),
          r.setAttribute("data-framer-css", "true"),
          !document.head)
        ) {
          console.warn("not injecting CSS: the document is missing a <head> element");
          return;
        }
        if ((document.head.appendChild(r), r.sheet)) Ih = r.sheet;
        else {
          console.warn("not injecting CSS: injected <style> element does not have a sheet", r);
          return;
        }
      }
      t = Ih;
    }
    try {
      t.insertRule(e, t.cssRules.length);
    } catch {}
  }
}
var W2 = ["[data-framer-component-type] { position: absolute; }"],
  U2 = `
[data-framer-component-type="Text"] > * {
    text-align: var(--framer-text-alignment, start);
}`,
  j2 = `
[data-framer-component-type="Text"] span span,
[data-framer-component-type="Text"] p span,
[data-framer-component-type="Text"] h1 span,
[data-framer-component-type="Text"] h2 span,
[data-framer-component-type="Text"] h3 span,
[data-framer-component-type="Text"] h4 span,
[data-framer-component-type="Text"] h5 span,
[data-framer-component-type="Text"] h6 span {
    display: block;
}`,
  X2 = `
[data-framer-component-type="Text"] span span span,
[data-framer-component-type="Text"] p span span,
[data-framer-component-type="Text"] h1 span span,
[data-framer-component-type="Text"] h2 span span,
[data-framer-component-type="Text"] h3 span span,
[data-framer-component-type="Text"] h4 span span,
[data-framer-component-type="Text"] h5 span span,
[data-framer-component-type="Text"] h6 span span {
    display: unset;
}`,
  G2 = `
[data-framer-component-type="Text"] div div span,
[data-framer-component-type="Text"] a div span,
[data-framer-component-type="Text"] span span span,
[data-framer-component-type="Text"] p span span,
[data-framer-component-type="Text"] h1 span span,
[data-framer-component-type="Text"] h2 span span,
[data-framer-component-type="Text"] h3 span span,
[data-framer-component-type="Text"] h4 span span,
[data-framer-component-type="Text"] h5 span span,
[data-framer-component-type="Text"] h6 span span,
[data-framer-component-type="Text"] a {
    font-family: var(--font-family);
    font-style: var(--font-style);
    font-weight: min(calc(var(--framer-font-weight-increase, 0) + var(--font-weight, 400)), 900);
    color: var(--text-color);
    letter-spacing: var(--letter-spacing);
    font-size: var(--font-size);
    text-transform: var(--text-transform);
    text-decoration: var(--text-decoration);
    line-height: var(--line-height);
}`,
  Y2 = `
[data-framer-component-type="Text"] div div span,
[data-framer-component-type="Text"] a div span,
[data-framer-component-type="Text"] span span span,
[data-framer-component-type="Text"] p span span,
[data-framer-component-type="Text"] h1 span span,
[data-framer-component-type="Text"] h2 span span,
[data-framer-component-type="Text"] h3 span span,
[data-framer-component-type="Text"] h4 span span,
[data-framer-component-type="Text"] h5 span span,
[data-framer-component-type="Text"] h6 span span,
[data-framer-component-type="Text"] a {
    --font-family: var(--framer-font-family);
    --font-style: var(--framer-font-style);
    --font-weight: var(--framer-font-weight);
    --text-color: var(--framer-text-color);
    --letter-spacing: var(--framer-letter-spacing);
    --font-size: var(--framer-font-size);
    --text-transform: var(--framer-text-transform);
    --text-decoration: var(--framer-text-decoration);
    --line-height: var(--framer-line-height);
}`,
  K2 = `
[data-framer-component-type="Text"] a,
[data-framer-component-type="Text"] a div span,
[data-framer-component-type="Text"] a span span span,
[data-framer-component-type="Text"] a p span span,
[data-framer-component-type="Text"] a h1 span span,
[data-framer-component-type="Text"] a h2 span span,
[data-framer-component-type="Text"] a h3 span span,
[data-framer-component-type="Text"] a h4 span span,
[data-framer-component-type="Text"] a h5 span span,
[data-framer-component-type="Text"] a h6 span span {
    --font-family: var(--framer-link-font-family, var(--framer-font-family));
    --font-style: var(--framer-link-font-style, var(--framer-font-style));
    --font-weight: var(--framer-link-font-weight, var(--framer-font-weight));
    --text-color: var(--framer-link-text-color, var(--framer-text-color));
    --font-size: var(--framer-link-font-size, var(--framer-font-size));
    --text-transform: var(--framer-link-text-transform, var(--framer-text-transform));
    --text-decoration: var(--framer-link-text-decoration, var(--framer-text-decoration));
}`,
  q2 = `
[data-framer-component-type="Text"] a:hover,
[data-framer-component-type="Text"] a div span:hover,
[data-framer-component-type="Text"] a span span span:hover,
[data-framer-component-type="Text"] a p span span:hover,
[data-framer-component-type="Text"] a h1 span span:hover,
[data-framer-component-type="Text"] a h2 span span:hover,
[data-framer-component-type="Text"] a h3 span span:hover,
[data-framer-component-type="Text"] a h4 span span:hover,
[data-framer-component-type="Text"] a h5 span span:hover,
[data-framer-component-type="Text"] a h6 span span:hover {
    --font-family: var(--framer-link-hover-font-family, var(--framer-link-font-family, var(--framer-font-family)));
    --font-style: var(--framer-link-hover-font-style, var(--framer-link-font-style, var(--framer-font-style)));
    --font-weight: var(--framer-link-hover-font-weight, var(--framer-link-font-weight, var(--framer-font-weight)));
    --text-color: var(--framer-link-hover-text-color, var(--framer-link-text-color, var(--framer-text-color)));
    --font-size: var(--framer-link-hover-font-size, var(--framer-link-font-size, var(--framer-font-size)));
    --text-transform: var(--framer-link-hover-text-transform, var(--framer-link-text-transform, var(--framer-text-transform)));
    --text-decoration: var(--framer-link-hover-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration)));
}`,
  Q2 = `
[data-framer-component-type="Text"].isCurrent a,
[data-framer-component-type="Text"].isCurrent a div span,
[data-framer-component-type="Text"].isCurrent a span span span,
[data-framer-component-type="Text"].isCurrent a p span span,
[data-framer-component-type="Text"].isCurrent a h1 span span,
[data-framer-component-type="Text"].isCurrent a h2 span span,
[data-framer-component-type="Text"].isCurrent a h3 span span,
[data-framer-component-type="Text"].isCurrent a h4 span span,
[data-framer-component-type="Text"].isCurrent a h5 span span,
[data-framer-component-type="Text"].isCurrent a h6 span span {
    --font-family: var(--framer-link-current-font-family, var(--framer-link-font-family, var(--framer-font-family)));
    --font-style: var(--framer-link-current-font-style, var(--framer-link-font-style, var(--framer-font-style)));
    --font-weight: var(--framer-link-current-font-weight, var(--framer-link-font-weight, var(--framer-font-weight)));
    --text-color: var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-text-color)));
    --font-size: var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size)));
    --text-transform: var(--framer-link-current-text-transform, var(--framer-link-text-transform, var(--framer-text-transform)));
    --text-decoration: var(--framer-link-current-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration)));
}`,
  Z2 = [
    '[data-framer-component-type="Text"] { cursor: inherit; }',
    "[data-framer-component-text-autosized] * { white-space: pre; }",
    U2,
    j2,
    X2,
    G2,
    Y2,
    K2,
    q2,
    Q2,
  ],
  J2 = `
:not([data-framer-generated]) > [data-framer-stack-content-wrapper] > *,
:not([data-framer-generated]) > [data-framer-stack-content-wrapper] > [data-framer-component-type],
:not([data-framer-generated]) > [data-framer-stack-content-wrapper] > [data-framer-legacy-stack-gap-enabled] > *,
:not([data-framer-generated]) > [data-framer-stack-content-wrapper] > [data-framer-legacy-stack-gap-enabled] > [data-framer-component-type] {
    position: relative;
}`,
  eL = [
    `[data-framer-stack-content-wrapper][data-framer-stack-gap-enabled="true"] {
        row-gap: var(--stack-native-row-gap);
        column-gap: var(--stack-native-column-gap);
    }`,
    `.${ri} [data-framer-stack-content-wrapper][data-framer-stack-gap-enabled="true"] {
        row-gap: unset;
        column-gap: unset;
    }`,
  ],
  tL = `
.${ri} [data-framer-legacy-stack-gap-enabled="true"] > *, [data-framer-legacy-stack-gap-enabled="true"][data-framer-stack-flexbox-gap="false"] {
    margin-top: calc(var(--stack-gap-y) / 2);
    margin-bottom: calc(var(--stack-gap-y) / 2);
    margin-right: calc(var(--stack-gap-x) / 2);
    margin-left: calc(var(--stack-gap-x) / 2);
}
`,
  nL = `
.${ri}
[data-framer-stack-direction-reverse="false"]
[data-framer-legacy-stack-gap-enabled="true"]
> *:first-child,
[data-framer-stack-direction-reverse="false"]
[data-framer-legacy-stack-gap-enabled="true"][data-framer-stack-flexbox-gap="false"]
> *:first-child,
.${ri}
[data-framer-stack-direction-reverse="true"]
[data-framer-legacy-stack-gap-enabled="true"]
> *:last-child,
[data-framer-stack-direction-reverse="true"]
[data-framer-legacy-stack-gap-enabled="true"][data-framer-stack-flexbox-gap="false"]
> *:last-child {
    margin-top: 0;
    margin-left: 0;
}`,
  rL = `
.${ri}
[data-framer-stack-direction-reverse="false"]
[data-framer-legacy-stack-gap-enabled="true"]
> *:last-child,
[data-framer-stack-direction-reverse="false"]
[data-framer-legacy-stack-gap-enabled="true"][data-framer-stack-flexbox-gap="false"]
> *:last-child,
.${ri}
[data-framer-stack-direction-reverse="true"]
[data-framer-legacy-stack-gap-enabled="true"]
> *:first-child,
[data-framer-stack-direction-reverse="true"]
[data-framer-legacy-stack-gap-enabled="true"][data-framer-stack-flexbox-gap="false"]
> *:first-child {
    margin-right: 0;
    margin-bottom: 0;
}`,
  iL = [J2, tL, ...eL, nL, rL],
  oL = [
    `
NavigationContainer
[data-framer-component-type="NavigationContainer"] > *,
[data-framer-component-type="NavigationContainer"] > [data-framer-component-type] {
    position: relative;
}`,
  ],
  aL = [
    '[data-framer-component-type="Scroll"]::-webkit-scrollbar { display: none; }',
    '[data-framer-component-type="ScrollContentWrapper"] > * { position: relative; }',
  ],
  sL = [
    '[data-framer-component-type="NativeScroll"] { -webkit-overflow-scrolling: touch; }',
    '[data-framer-component-type="NativeScroll"] > * { position: relative; }',
    '[data-framer-component-type="NativeScroll"].direction-both { overflow-x: scroll; overflow-y: scroll; }',
    '[data-framer-component-type="NativeScroll"].direction-vertical { overflow-x: hidden; overflow-y: scroll; }',
    '[data-framer-component-type="NativeScroll"].direction-horizontal { overflow-x: scroll; overflow-y: hidden; }',
    '[data-framer-component-type="NativeScroll"].direction-vertical > * { width: 100% !important; }',
    '[data-framer-component-type="NativeScroll"].direction-horizontal > * { height: 100% !important; }',
    '[data-framer-component-type="NativeScroll"].scrollbar-hidden::-webkit-scrollbar { display: none; }',
  ],
  lL = [
    '[data-framer-component-type="DeviceComponent"].no-device > * { width: 100% !important; height: 100% !important; }',
  ],
  cL = [
    '[data-framer-component-type="PageContentWrapper"] > *, [data-framer-component-type="PageContentWrapper"] > [data-framer-component-type] { position: relative; }',
  ],
  uL = [
    '[data-is-present="false"], [data-is-present="false"] * { pointer-events: none !important; }',
  ],
  fL = [
    '[data-framer-cursor="pointer"] { cursor: pointer; }',
    '[data-framer-cursor="grab"] { cursor: grab; }',
    '[data-framer-cursor="grab"]:active { cursor: grabbing; }',
  ],
  dL = [
    '[data-framer-component-type="Frame"] *, [data-framer-component-type="Stack"] * { pointer-events: auto; }',
    "[data-framer-generated] * { pointer-events: unset }",
  ],
  hL = [
    `[data-reset="button"] {
        border-width: 0;
        padding: 0;
        background: none;
}`,
  ],
  pL = [
    '[data-hide-scrollbars="true"]::-webkit-scrollbar { width: 0px; height: 0px; }',
    '[data-hide-scrollbars="true"]::-webkit-scrollbar-thumb { background: transparent; }',
  ],
  mL = (e) => (e ? dL : []),
  vL = [".svgContainer svg { display: block; }"],
  nS = (e) => [
    ...W2,
    ...Z2,
    ...N2,
    ...H2,
    ...iL,
    ...oL,
    ...aL,
    ...sL,
    ...cL,
    ...lL,
    ...uL,
    ...fL,
    ...mL(e),
    ...vL,
    ...hL,
    ...pL,
  ],
  gL = nS(!1),
  yL = nS(!0),
  Vx = !1;
function Xa() {
  if (Vx) return;
  Vx = !0;
  let e = we.current() === "PREVIEW" ? yL : gL;
  for (let t of e) tS(t, void 0, void 0);
}
function rS(e) {
  return typeof e == "function";
}
function bL(e) {
  return typeof e == "boolean";
}
function Ie(e) {
  return typeof e == "string";
}
function zn(e) {
  return typeof e == "number" && Number.isFinite(e);
}
function ip(e) {
  return Array.isArray(e);
}
function it(e) {
  return e !== null && typeof e == "object" && !ip(e);
}
function so(e) {
  return typeof e > "u";
}
function xL(e) {
  return it(e) || rS(e);
}
var Ax = "optional";
function SL(e) {
  return !!e && Ax in e && e[Ax] === !0;
}
function wL(e) {
  try {
    switch (e.type) {
      case "string":
      case "color":
      case "date":
      case "link":
        return Ie(e.defaultValue) ? e.defaultValue : void 0;
      case "boolean":
        return bL(e.defaultValue) ? e.defaultValue : void 0;
      case "enum":
        return so(e.defaultValue)
          ? void 0
          : e.options.includes(e.defaultValue)
            ? e.defaultValue
            : void 0;
      case "fusednumber":
      case "number":
        return zn(e.defaultValue) ? e.defaultValue : void 0;
      case "transition":
        return it(e.defaultValue) ? e.defaultValue : void 0;
      case "font":
        return it(e.defaultValue) ? e.defaultValue : void 0;
      case "object": {
        let t = it(e.defaultValue) ? e.defaultValue : {};
        return (it(e.controls) && iS(t, e.controls), t);
      }
      case "array":
        return ip(e.defaultValue) ? e.defaultValue : void 0;
      case "file":
      case "image":
      case "richtext":
      case "pagescope":
      case "eventhandler":
      case "segmentedenum":
      case "responsiveimage":
      case "componentinstance":
      case "scrollsectionref":
      case "customcursor":
        return;
      default:
        return;
    }
  } catch {
    return;
  }
}
function iS(e, t) {
  for (let n in t) {
    let r = t[n];
    if (!r) continue;
    let i = e[n];
    if (!so(i) || SL(r)) continue;
    let o = wL(r);
    so(o) || (e[n] = o);
  }
}
function kL(e) {
  if (it(e.defaultProps)) return e.defaultProps;
  let t = {};
  return ((e.defaultProps = t), t);
}
function CL(e, t) {
  if (!xL(e)) return;
  let n = kL(e);
  iS(n, t);
}
function M4(e, t) {
  (Object.assign(e, { propertyControls: t }), CL(e, t));
}
function O4(e) {
  return e.propertyControls;
}
var mn = {
    iPhonePro: {
      screenRadius: 0,
      clayBezelLeft: 21,
      clayBezelRight: 21,
      clayBezelTop: 21,
      clayBezelBottom: 21,
      clayBezelRadius: 38 + 21,
    },
    iPhone8: {
      screenRadius: 0,
      clayBezelLeft: 24,
      clayBezelRight: 24,
      clayBezelTop: 96,
      clayBezelBottom: 96,
      clayBezelRadius: 38 * 1.5,
    },
    iPadPro: {
      screenRadius: 25,
      clayBezelLeft: 38,
      clayBezelRight: 38,
      clayBezelTop: 38,
      clayBezelBottom: 38,
      clayBezelRadius: 25 + 38,
    },
    desktop: {
      clayBezelLeft: 20,
      clayBezelRight: 20,
      clayBezelTop: 20,
      clayBezelBottom: 20,
      clayBezelRadius: 20,
    },
  },
  EL = [
    {
      id: "iphone-12",
      title: "iPhone 12",
      screenRadius: 0,
      clayBezelLeft: 22,
      clayBezelRight: 22,
      clayBezelTop: 22,
      clayBezelBottom: 22,
      clayBezelRadius: 66,
      screenWidth: 390,
      screenHeight: 844,
      externalClay: { width: 500, height: 974, screenOffsetTop: 65, screenOffsetLeft: 55 },
      screenMask:
        '<g style="transform: scale(0.5);"><path d="M171.2 0c2.3 0 4 .5 5.4 1.3 1.6 1 2.8 2.2 3.7 3.8.8 1.6 1.2 2.3 1.2 4.9 0 12 2.2 19 6.2 26.5s9.8 13.3 17.3 17.4c7.5 4 15.8 6.1 30.6 6.1h311.5c14.3 0 22.5-2.2 29.9-6.1 7.5-4 13.3-10 17.3-17.4 4-7.5 6.2-14.5 6.2-26.5 0-2.6.4-3.2 1.1-4.9.8-1.6 2-2.9 3.4-3.8 1.4-.8 3.2-1.3 5.4-1.3h54.2c40.1 0 54.7 4.2 69.4 12a81.8 81.8 0 0134 34c7.8 14.7 12 29.3 12 69.4v1457.2c0 40.1-4.2 54.7-12 69.4a81.8 81.8 0 01-34 34c-14.7 7.8-29.3 12-69.4 12H115.4c-40.1 0-54.7-4.2-69.4-12a81.8 81.8 0 01-34-34c-7.8-14.7-12-29.3-12-69.4V115.4C0 75.3 4.2 60.7 12 46a81.8 81.8 0 0134-34C60.7 4.2 75.3 0 115.4 0h55.4z" fill="#000" fill-rule="evenodd"/></g>',
      realisticImage: {
        width: 490,
        height: 944,
        screenOffsetLeft: 50,
        screenOffsetTop: 50,
        availableColors: [
          { id: "black", title: "Black", colorValue: "#2E2C36" },
          { id: "white", title: "White", colorValue: "#F7F3F0" },
          { id: "blue", title: "Blue", colorValue: "#14496D" },
          { id: "green", title: "Green", colorValue: "#DAF0D9" },
          { id: "red", title: "Red", colorValue: "#DB4141" },
        ],
        handOffset: { left: 29, right: 29, bottom: 29 },
      },
    },
    {
      id: "iphone-12-mini",
      title: "iPhone 12 Mini",
      screenRadius: 0,
      clayBezelLeft: 22,
      clayBezelRight: 22,
      clayBezelTop: 22,
      clayBezelBottom: 22,
      clayBezelRadius: 66,
      screenWidth: 360,
      screenHeight: 780,
      externalClay: { width: 450, height: 890, screenOffsetTop: 55, screenOffsetLeft: 45 },
      screenMask:
        '<g style="transform: scale(0.5);"><path d="M142 18c0 19 14 47 43 48h349c31 0 44-29 44-48 0-12 4-18 14-18h18c38 0 52 4 66 11 14 8 25 19 33 33v1c7 14 11 28 11 65v1340c0 38-4 52-11 66-8 14-19 25-33 33h-1c-14 7-28 11-65 11H110c-38 0-52-4-66-11-14-8-25-19-33-33v-1c-7-13-11-27-11-64V110c0-38 4-52 11-66 8-14 19-25 33-33h1C58 4 72 0 109 0h16c11 0 17 6 17 18z" fill="#000" fill-rule="evenodd"/></g>',
      realisticImage: {
        width: 460,
        height: 880,
        screenOffsetLeft: 50,
        screenOffsetTop: 50,
        availableColors: [
          { id: "black", title: "Black", colorValue: "#2E2C36" },
          { id: "white", title: "White", colorValue: "#F7F3F0" },
          { id: "blue", title: "Blue", colorValue: "#14496D" },
          { id: "green", title: "Green", colorValue: "#DAF0D9" },
          { id: "red", title: "Red", colorValue: "#DB4141" },
        ],
        handOffset: { left: 31.5, right: 30.5, bottom: 30 },
      },
    },
    {
      id: "iphone-12-pro",
      title: "iPhone 12 Pro",
      screenRadius: 0,
      clayBezelLeft: 22,
      clayBezelRight: 22,
      clayBezelTop: 22,
      clayBezelBottom: 22,
      clayBezelRadius: 66,
      screenWidth: 390,
      screenHeight: 844,
      externalClay: { width: 494, height: 968, screenOffsetTop: 62, screenOffsetLeft: 52 },
      screenMask:
        '<g style="transform: scale(0.5);"><path d="M171.2 0c2.3 0 4 .5 5.4 1.3 1.6 1 2.8 2.2 3.7 3.8.8 1.6 1.2 2.3 1.2 4.9 0 12 2.2 19 6.2 26.5s9.8 13.3 17.3 17.4c7.5 4 15.8 6.1 30.6 6.1h311.5c14.3 0 22.5-2.2 29.9-6.1 7.5-4 13.3-10 17.3-17.4 4-7.5 6.2-14.5 6.2-26.5 0-2.6.4-3.2 1.1-4.9.8-1.6 2-2.9 3.4-3.8 1.4-.8 3.2-1.3 5.4-1.3h54.2c40.1 0 54.7 4.2 69.4 12a81.8 81.8 0 0134 34c7.8 14.7 12 29.3 12 69.4v1457.2c0 40.1-4.2 54.7-12 69.4a81.8 81.8 0 01-34 34c-14.7 7.8-29.3 12-69.4 12H115.4c-40.1 0-54.7-4.2-69.4-12a81.8 81.8 0 01-34-34c-7.8-14.7-12-29.3-12-69.4V115.4C0 75.3 4.2 60.7 12 46a81.8 81.8 0 0134-34C60.7 4.2 75.3 0 115.4 0h55.4z" fill="#000" fill-rule="evenodd"/></g>',
      realisticImage: {
        width: 490,
        height: 944,
        screenOffsetLeft: 50,
        screenOffsetTop: 50,
        availableColors: [
          { id: "graphite", title: "Graphite", colorValue: "#585753" },
          { id: "silver", title: "Silver", colorValue: "#E5E6E1" },
          { id: "pacific-blue", title: "Pacific Blue", colorValue: "#415D6C" },
          { id: "gold", title: "Gold", colorValue: "#FCECD5" },
        ],
        handOffset: { left: 29, right: 29, bottom: 29 },
      },
    },
    {
      id: "iphone-12-pro-max",
      title: "iPhone 12 Pro Max",
      screenRadius: 50,
      clayBezelLeft: 22,
      clayBezelRight: 22,
      clayBezelTop: 22,
      clayBezelBottom: 22,
      clayBezelRadius: 66,
      screenWidth: 428,
      screenHeight: 926,
      externalClay: { width: 532, height: 1050, screenOffsetTop: 62, screenOffsetLeft: 52 },
      screenMask:
        '<path d="M102 0c6 0 7 3 7 9 0 10 7 23 24 23h164c13 0 22-12 22-23 0-6 1-9 7-9h34c24 0 32 2 41 7s15 11 20 20 7 17 7 41v790c0 24-2 32-7 41s-11 15-20 20-17 7-41 7H68c-24 0-32-2-41-7s-15-11-20-20-7-17-7-41V68c0-24 2-32 7-41S18 12 27 7s17-7 41-7h34z" fill="#000" fill-rule="evenodd"/>',
      realisticImage: {
        width: 528,
        height: 1026,
        screenOffsetLeft: 50,
        screenOffsetTop: 50,
        availableColors: [
          { id: "graphite", title: "Graphite", colorValue: "#585753" },
          { id: "silver", title: "Silver", colorValue: "#E5E6E1" },
          { id: "pacific-blue", title: "Pacific Blue", colorValue: "#415D6C" },
          { id: "gold", title: "Gold", colorValue: "#FCECD5" },
        ],
        handOffset: { left: 28.5, right: 28, bottom: 29 },
      },
    },
    {
      id: "iphone-11",
      title: "iPhone 11",
      screenRadius: 0,
      clayBezelLeft: 35.5,
      clayBezelRight: 35.5,
      clayBezelTop: 35.5,
      clayBezelBottom: 35.5,
      clayBezelRadius: 77,
      screenWidth: 414,
      screenHeight: 896,
      externalClay: { width: 524, height: 1026, screenOffsetTop: 65, screenOffsetLeft: 55 },
      screenMask:
        '<path d="M85.5 0C89.1 0 92 3 92 6.5c.3 6 1.5 10 3.4 13.5 2.2 4.1 5.5 7.4 9.6 9.6 4.2 2.2 8.9 3.4 17 3.4h170c8.1 0 12.8-1.2 17-3.4 4.1-2.2 7.4-5.5 9.6-9.6A31 31 0 00322 6.5c0-3.6 3-6.5 6.5-6.5h32.3c18.5 0 25.2 2 32 5.5 6.7 3.7 12 9 15.7 15.7 3.6 6.8 5.5 13.5 5.5 32v789.6c0 18.5-2 25.2-5.5 32-3.7 6.7-9 12-15.7 15.7-6.8 3.6-13.5 5.5-32 5.5H53.2c-18.5 0-25.2-2-32-5.5-6.7-3.7-12-9-15.7-15.7C2 868 0 861.3 0 842.8V53.2c0-18.5 2-25.2 5.5-32 3.7-6.7 9-12 15.7-15.7C28 2 34.7 0 53.2 0h32.3z" fill="#000" fill-rule="nonzero"/>',
      realisticImage: {
        width: 514,
        height: 996,
        screenOffsetLeft: 50,
        screenOffsetTop: 50,
        availableColors: [
          { id: "black", title: "Black", colorValue: "#202120" },
          { id: "white", title: "White", colorValue: "#F9F6EF" },
          { id: "purple", title: "Purple", colorValue: "#D1CDDB" },
          { id: "green", title: "Green", colorValue: "#ADE0CD" },
          { id: "red", title: "Red", colorValue: "#B90D2E" },
          { id: "yellow", title: "Yellow", colorValue: "#FFE680" },
        ],
        handOffset: { left: 14.5, right: 14.5, bottom: 14.5 },
      },
    },
    {
      id: "iphone-11-pro",
      title: "iPhone 11 Pro",
      ...mn.iPhonePro,
      screenWidth: 375,
      screenHeight: 812,
      externalClay: { width: 485, height: 942, screenOffsetTop: 65, screenOffsetLeft: 55 },
      screenMask:
        '<path d="M292 8.668V9c0 9.266-7.07 21-23.332 21h-162C90.402 30 83.332 18.266 83.332 9v-.332c0-4.285 0-8.668-7.664-8.668H43.332C16.312 0 0 16.313 0 43.332v725.336C0 795.688 16.313 812 43.332 812h288.336c27.02 0 43.332-16.313 43.332-43.332V43.332C375 16.312 358.687 0 331.668 0h-32C292 0 292 4.383 292 8.668zm0 0"/>',
      realisticImage: {
        width: 475,
        height: 912,
        screenOffsetLeft: 50,
        screenOffsetTop: 50,
        availableColors: [
          { id: "space-grey", title: "Space Grey", colorValue: "#52514F" },
          { id: "silver", title: "Silver", colorValue: "#EBEBE3" },
          { id: "gold", title: "Gold", colorValue: "#FBD7BD" },
          { id: "midnight-green", title: "Midnight Green", colorValue: "#4F5850" },
        ],
        handOffset: { left: 24.5, right: 24.5, bottom: 23.5 },
      },
    },
    {
      id: "iphone-11-pro-max",
      title: "iPhone 11 Pro Max",
      ...mn.iPhonePro,
      screenWidth: 414,
      screenHeight: 896,
      externalClay: { width: 524, height: 1026, screenOffsetTop: 65, screenOffsetLeft: 55 },
      screenMask:
        '<path d="M96 0c3.313 0 5.91 2.688 6 6 .18 6.645 1.191 10.148 2.938 13.41 1.917 3.586 4.73 6.402 8.316 8.317 3.586 1.918 7.441 2.941 15.445 2.941h156.602c8.004 0 11.86-1.023 15.445-2.941 3.586-1.915 6.399-4.73 8.317-8.317 1.746-3.265 2.746-6.758 2.937-13.41.094-3.313 2.688-6 6-6h46.004c17.387 0 23.687 1.809 30.043 5.21 6.355 3.4 11.344 8.388 14.742 14.743C412.191 26.31 414 32.61 414 49.996v796.008c0 17.387-1.809 23.687-5.21 30.043-3.4 6.355-8.388 11.344-14.743 14.742-6.356 3.402-12.656 5.211-30.043 5.211H49.996c-17.387 0-23.687-1.809-30.043-5.21-6.355-3.4-11.344-8.388-14.742-14.743C1.809 869.69 0 863.39 0 846.004V49.996C0 32.61 1.809 26.31 5.21 19.953c3.4-6.355 8.388-11.344 14.743-14.742C26.31 1.809 32.61 0 49.996 0zm0 0"/>',
      realisticImage: {
        width: 514,
        height: 996,
        screenOffsetLeft: 50,
        screenOffsetTop: 50,
        availableColors: [
          { id: "space-grey", title: "Space Grey", colorValue: "#52514F" },
          { id: "silver", title: "Silver", colorValue: "#EBEBE3" },
          { id: "gold", title: "Gold", colorValue: "#FBD7BD" },
          { id: "midnight-green", title: "Midnight Green", colorValue: "#4F5850" },
        ],
        handOffset: { left: 23.5, right: 24.5, bottom: 24 },
      },
    },
    {
      id: "iphone-8",
      title: "iPhone 8",
      ...mn.iPhone8,
      screenWidth: 375,
      screenHeight: 667,
      externalClay: { width: 491, height: 971, screenOffsetLeft: 58, screenOffsetTop: 152 },
      realisticImage: {
        width: 475,
        height: 927,
        screenOffsetLeft: 50,
        screenOffsetTop: 130,
        availableColors: [
          { id: "space-grey", title: "Space Grey", colorValue: "#28282A" },
          { id: "silver", title: "Silver", colorValue: "#DFE1E2" },
          { id: "gold", title: "Gold", colorValue: "#F6E6DB" },
        ],
        handOffset: { left: 22, right: 22, bottom: 18.5 },
      },
    },
    {
      id: "iphone-8-plus",
      title: "iPhone 8 Plus",
      ...mn.iPhone8,
      screenWidth: 414,
      screenHeight: 736,
      externalClay: { width: 530, height: 1064, screenOffsetLeft: 58, screenOffsetTop: 164 },
      realisticImage: {
        width: 514,
        height: 996,
        screenOffsetLeft: 50,
        screenOffsetTop: 130,
        availableColors: [
          { id: "space-grey", title: "Space Grey", colorValue: "#28282A" },
          { id: "silver", title: "Silver", colorValue: "#DFE1E2" },
          { id: "gold", title: "Gold", colorValue: "#F6E6DB" },
        ],
        handOffset: { left: 21, right: 20.5, bottom: 19 },
      },
    },
    {
      id: "iphone-se",
      title: "iPhone SE",
      screenWidth: 320,
      screenHeight: 568,
      screenRadius: 0,
      clayBezelLeft: 20,
      clayBezelRight: 20,
      clayBezelTop: 112,
      clayBezelBottom: 112,
      clayBezelRadius: 38 * 1.5,
      externalClay: { width: 436, height: 872, screenOffsetLeft: 58, screenOffsetTop: 152 },
      realisticImage: {
        width: 420,
        height: 828,
        screenOffsetLeft: 50,
        screenOffsetTop: 130,
        availableColors: [
          { id: "space-grey", title: "Space Grey", colorValue: "#C3C4C8" },
          { id: "silver", title: "Silver", colorValue: "#E1E2E4" },
          { id: "gold", title: "Gold", colorValue: "#EFD8BD" },
          { id: "rose-gold", title: "Rose Gold", colorValue: "#F7CFCA" },
        ],
        handOffset: { left: 22, right: 22, bottom: 26.5 },
      },
    },
    {
      id: "samsung-galaxy-s7",
      title: "Samsung Galaxy S7",
      screenRadius: 0,
      clayBezelLeft: 22,
      clayBezelRight: 22,
      clayBezelTop: 22,
      clayBezelBottom: 22,
      clayBezelRadius: 66,
      screenWidth: 360,
      screenHeight: 640,
      externalClay: { width: 454, height: 880, screenOffsetTop: 120, screenOffsetLeft: 47 },
      realisticImage: {
        width: 440,
        height: 860,
        screenOffsetLeft: 40,
        screenOffsetTop: 110,
        availableColors: [
          { id: "black", title: "Black", colorValue: "#2E2C36" },
          { id: "white", title: "White", colorValue: "#F7F3F0" },
          { id: "silver", title: "Silver", colorValue: "#E5E6E1" },
          { id: "gold", title: "Gold", colorValue: "#FCECD5" },
        ],
        handOffset: { left: 26, right: 25.5, bottom: 32 },
      },
    },
    {
      id: "samsung-note-10",
      title: "Samsung Note 10",
      screenWidth: 360,
      screenHeight: 760,
      screenRadius: 10,
      clayBezelLeft: 7,
      clayBezelRight: 7,
      clayBezelTop: 15,
      clayBezelBottom: 15,
      clayBezelRadius: 15,
    },
    {
      id: "pixel-5",
      title: "Google Pixel 5",
      screenRadius: 31,
      clayBezelLeft: 22,
      clayBezelRight: 22,
      clayBezelTop: 22,
      clayBezelBottom: 22,
      clayBezelRadius: 66,
      screenWidth: 360,
      screenHeight: 780,
      externalClay: { width: 460, height: 900, screenOffsetTop: 60, screenOffsetLeft: 50 },
      realisticImage: {
        width: 920 / 2,
        height: 1760 / 2,
        screenOffsetLeft: 100 / 2,
        screenOffsetTop: 100 / 2,
        availableColors: [
          { id: "just-black", title: "Just Black", colorValue: "#2E2C36" },
          { id: "sorta-sage", title: "Sorta Sage", colorValue: "#B7C9C0" },
        ],
        handOffset: { left: 31.5, right: 31, bottom: 31 },
      },
    },
    {
      id: "pixel-4",
      title: "Google Pixel 4",
      screenWidth: 360,
      screenHeight: 760,
      screenRadius: 34,
      clayBezelLeft: 10,
      clayBezelRight: 10,
      clayBezelTop: 50,
      clayBezelBottom: 25,
      clayBezelRadius: 50,
      externalClay: { width: 460, height: 938, screenOffsetLeft: 50, screenOffsetTop: 89 },
      realisticImage: {
        width: 460,
        height: 920,
        screenOffsetLeft: 50,
        screenOffsetTop: 80,
        availableColors: [
          { id: "clearly-white", title: "Clearly White", colorValue: "#EAEDF2" },
          { id: "just-black", title: "Just Black", colorValue: "#1A1A1A" },
          { id: "oh-so-orange", title: "Oh So Orange", colorValue: "#FF7A68" },
        ],
        handOffset: { left: 35.5, right: 35.5, bottom: 57 },
      },
    },
    {
      id: "macbook-air",
      title: "MacBook Air",
      screenWidth: 1440,
      screenHeight: 900,
      disableRotation: !0,
      externalClay: { width: 1890, height: 1125, screenOffsetLeft: 225, screenOffsetTop: 98 },
      realisticImage: {
        width: 3848 / 2,
        height: 2240 / 2,
        screenOffsetLeft: 484 / 2,
        screenOffsetTop: 196 / 2,
        availableColors: [
          { id: "silver", title: "Silver", colorValue: "#E5E6E1" },
          { id: "space-grey", title: "Space Grey", colorValue: "#B1B5B7" },
          { id: "gold", title: "Gold", colorValue: "#FCECD5" },
        ],
      },
    },
    {
      id: "macbook-pro-13",
      title: 'MacBook Pro 13"',
      screenWidth: 1440,
      screenHeight: 900,
      disableRotation: !0,
      externalClay: { width: 1914, height: 1169, screenOffsetLeft: 236, screenOffsetTop: 109 },
      realisticImage: {
        width: 3916 / 2,
        height: 2330 / 2,
        screenOffsetLeft: 518 / 2,
        screenOffsetTop: 218 / 2,
        availableColors: [
          { id: "silver", title: "Silver", colorValue: "#E5E6E1" },
          { id: "space-grey", title: "Space Grey", colorValue: "#B1B5B7" },
        ],
      },
    },
    {
      id: "macbook-pro-16",
      title: 'MacBook Pro 16"',
      screenWidth: 1536,
      screenHeight: 960,
      disableRotation: !0,
      externalClay: { width: 1984, height: 1179, screenOffsetLeft: 225, screenOffsetTop: 78 },
      realisticImage: {
        width: 4032 / 2,
        height: 2348 / 2,
        screenOffsetLeft: 480 / 2,
        screenOffsetTop: 148 / 2,
        availableColors: [
          { id: "silver", title: "Silver", colorValue: "#E5E6E1" },
          { id: "space-grey", title: "Space Grey", colorValue: "#B1B5B7" },
        ],
      },
    },
    {
      id: "imac-21-5",
      title: 'iMac 21.5"',
      screenWidth: 2048,
      screenHeight: 1152,
      disableRotation: !0,
      externalClay: { width: 2288, height: 1892, screenOffsetLeft: 120, screenOffsetTop: 120 },
      realisticImage: {
        width: 4562 / 2,
        height: 3796 / 2,
        screenOffsetLeft: 232 / 2,
        screenOffsetTop: 244 / 2,
      },
    },
    {
      id: "imac-27",
      title: 'iMac 27"',
      screenWidth: 2560,
      screenHeight: 1440,
      disableRotation: !0,
      externalClay: { width: 2848, height: 2351, screenOffsetLeft: 144, screenOffsetTop: 151 },
      realisticImage: {
        width: 5676 / 2,
        height: 4720 / 2,
        screenOffsetLeft: 278 / 2,
        screenOffsetTop: 292 / 2,
        availableColors: [
          { id: "silver", title: "Silver", colorValue: "#E5E6E1" },
          { id: "pro", title: "Pro", colorValue: "#5F5E63" },
        ],
      },
    },
    {
      id: "pro-display-xdr",
      title: "Pro Display XDR",
      screenWidth: 3008,
      screenHeight: 1692,
      disableRotation: !0,
      externalClay: { width: 3148, height: 2325, screenOffsetLeft: 70, screenOffsetTop: 60 },
      realisticImage: {
        width: 6276 / 2,
        height: 4695 / 2,
        screenOffsetLeft: 130 / 2,
        screenOffsetTop: 130 / 2,
      },
    },
    {
      id: "dell-xps",
      title: "Dell XPS",
      screenWidth: 1920,
      screenHeight: 1080,
      disableRotation: !0,
      externalClay: { width: 2624, height: 1381, screenOffsetLeft: 352, screenOffsetTop: 57 },
      realisticImage: {
        width: 5412 / 2,
        height: 2746 / 2,
        screenOffsetLeft: 786 / 2,
        screenOffsetTop: 108 / 2,
      },
    },
    {
      id: "surface-book",
      title: "Microsoft Surface Book",
      screenWidth: 1500,
      screenHeight: 1e3,
      disableRotation: !0,
      externalClay: { width: 2089, height: 1234, screenOffsetLeft: 296, screenOffsetTop: 93 },
      realisticImage: {
        width: 4200 / 2,
        height: 2508 / 2,
        screenOffsetLeft: 600 / 2,
        screenOffsetTop: 210 / 2,
      },
    },
    {
      id: "ipad",
      title: "iPad",
      screenRadius: 0,
      screenWidth: 810,
      screenHeight: 1080,
      clayBezelLeft: 30,
      clayBezelRight: 30,
      clayBezelTop: 95,
      clayBezelBottom: 95,
      clayBezelRadius: 0,
      externalClay: { width: 966, height: 1378, screenOffsetLeft: 78, screenOffsetTop: 149 },
      realisticImage: {
        width: 1920 / 2,
        height: 2720 / 2,
        screenOffsetLeft: 75,
        screenOffsetTop: 140,
        availableColors: [
          { id: "space-grey", title: "Space Grey", colorValue: "#C3C4C8" },
          { id: "silver", title: "Silver", colorValue: "#E1E2E4" },
          { id: "gold", title: "Gold", colorValue: "#EFD8BD" },
        ],
      },
    },
    {
      id: "ipad-mini",
      title: "iPad Mini",
      screenRadius: 0,
      clayBezelLeft: 49,
      clayBezelRight: 49,
      clayBezelTop: 49,
      clayBezelBottom: 49,
      clayBezelRadius: 49,
      screenWidth: 768,
      screenHeight: 1024,
      externalClay: { width: 924, height: 1384, screenOffsetLeft: 78, screenOffsetTop: 180 },
      realisticImage: {
        width: 1856 / 2,
        height: 2728 / 2,
        screenOffsetLeft: 160 / 2,
        screenOffsetTop: 340 / 2,
        availableColors: [
          { id: "space-grey", title: "Space Grey", colorValue: "#C3C4C8" },
          { id: "silver", title: "Silver", colorValue: "#E1E2E4" },
          { id: "gold", title: "Gold", colorValue: "#EFD8BD" },
        ],
      },
    },
    {
      id: "ipad-air",
      title: "iPad Air",
      screenRadius: 18,
      clayBezelLeft: 49,
      clayBezelRight: 49,
      clayBezelTop: 49,
      clayBezelBottom: 49,
      clayBezelRadius: 49,
      screenWidth: 820,
      screenHeight: 1180,
      externalClay: { width: 994, height: 1374, screenOffsetLeft: 87, screenOffsetTop: 97 },
      realisticImage: {
        width: 1960 / 2,
        height: 2680 / 2,
        screenOffsetLeft: 160 / 2,
        screenOffsetTop: 160 / 2,
        availableColors: [
          { id: "space-grey", title: "Space Grey", colorValue: "#C3C4C8" },
          { id: "silver", title: "Silver", colorValue: "#E1E2E4" },
          { id: "rose-gold", title: "Rose Gold", colorValue: "#ECCBC4" },
          { id: "blue", title: "Blue", colorValue: "#CBDAE6" },
          { id: "green", title: "Green", colorValue: "#DAF0D9" },
        ],
      },
    },
    {
      id: "ipad-pro-11",
      title: "iPad Pro 11\u2033",
      screenRadius: 17,
      clayBezelLeft: 49,
      clayBezelRight: 49,
      clayBezelTop: 49,
      clayBezelBottom: 49,
      clayBezelRadius: 49,
      screenWidth: 834,
      screenHeight: 1194,
      externalClay: { width: 990, height: 1370, screenOffsetLeft: 78, screenOffsetTop: 88 },
      realisticImage: {
        width: 1968 / 2,
        height: 2688 / 2,
        screenOffsetLeft: 75,
        screenOffsetTop: 75,
        availableColors: [
          { id: "space-grey", title: "Space Grey", colorValue: "#C3C4C8" },
          { id: "silver", title: "Silver", colorValue: "#E1E2E4" },
        ],
      },
    },
    {
      id: "ipad-pro-12-9",
      title: "iPad Pro 12.9\u2033",
      ...mn.iPadPro,
      screenRadius: 17,
      screenWidth: 1024,
      screenHeight: 1366,
      externalClay: { width: 1180, height: 1542, screenOffsetLeft: 78, screenOffsetTop: 88 },
      realisticImage: {
        width: 2348 / 2,
        height: 3032 / 2,
        screenOffsetLeft: 75,
        screenOffsetTop: 75,
        availableColors: [
          { id: "space-grey", title: "Space Grey", colorValue: "#C3C4C8" },
          { id: "silver", title: "Silver", colorValue: "#E1E2E4" },
        ],
      },
    },
    {
      id: "surface-3",
      title: "Microsoft Surface 3",
      screenRadius: 0,
      clayBezelLeft: 49,
      clayBezelRight: 49,
      clayBezelTop: 49,
      clayBezelBottom: 49,
      clayBezelRadius: 49,
      screenWidth: 960,
      screenHeight: 640,
      externalClay: { width: 1184, height: 864, screenOffsetLeft: 112, screenOffsetTop: 112 },
      realisticImage: {
        width: 2280 / 2,
        height: 1580 / 2,
        screenOffsetLeft: 180 / 2,
        screenOffsetTop: 150 / 2,
      },
    },
    {
      id: "surface-pro-4",
      title: "Microsoft Surface Pro 4",
      screenRadius: 0,
      clayBezelLeft: 49,
      clayBezelRight: 49,
      clayBezelTop: 49,
      clayBezelBottom: 49,
      clayBezelRadius: 49,
      screenWidth: 1368,
      screenHeight: 912,
      externalClay: { width: 1592, height: 1136, screenOffsetLeft: 112, screenOffsetTop: 112 },
      realisticImage: {
        width: 3176 / 2,
        height: 2224 / 2,
        screenOffsetLeft: 220 / 2,
        screenOffsetTop: 200 / 2,
      },
    },
    {
      id: "apple-watch-44",
      title: "Apple Watch 44mm",
      screenRadius: 33,
      screenWidth: 184,
      screenHeight: 224,
      disableRotation: !0,
      externalClay: { width: 298, height: 502, screenOffsetLeft: 57, screenOffsetTop: 129 },
      realisticImage: {
        width: 548 / 2,
        height: 908 / 2,
        screenOffsetLeft: 90 / 2,
        screenOffsetTop: 230 / 2,
        availableColors: [
          { id: "black", title: "Black", colorValue: "#2E2C36" },
          { id: "white", title: "White", colorValue: "#F7F3F0" },
          { id: "yellow", title: "Yellow", colorValue: "#FDDC6C" },
          { id: "orange", title: "Orange", colorValue: "#F35C56" },
        ],
      },
    },
    {
      id: "apple-watch-40",
      title: "Apple Watch 40mm",
      screenRadius: 27,
      screenWidth: 162,
      screenHeight: 197,
      disableRotation: !0,
      externalClay: { width: 280, height: 463, screenOffsetLeft: 59, screenOffsetTop: 124 },
      realisticImage: {
        width: 504 / 2,
        height: 854 / 2,
        screenOffsetLeft: 90 / 2,
        screenOffsetTop: 230 / 2,
        availableColors: [
          { id: "black", title: "Black", colorValue: "#2E2C36" },
          { id: "white", title: "White", colorValue: "#F7F3F0" },
          { id: "yellow", title: "Yellow", colorValue: "#FDDC6C" },
          { id: "orange", title: "Orange", colorValue: "#F35C56" },
        ],
      },
    },
    {
      id: "tv-full-hd",
      title: "Full HD",
      screenRadius: 0,
      screenWidth: 1920,
      screenHeight: 1080,
      externalClay: { width: 1968, height: 1168, screenOffsetLeft: 24, screenOffsetTop: 12 },
      realisticImage: {
        width: 4040 / 2,
        height: 2360 / 2,
        screenOffsetLeft: 100 / 2,
        screenOffsetTop: 100 / 2,
      },
    },
    {
      id: "tv-4k",
      title: "4K",
      screenRadius: 0,
      screenWidth: 3840,
      screenHeight: 2160,
      externalClay: { width: 3908, height: 2308, screenOffsetLeft: 34, screenOffsetTop: 24 },
      realisticImage: {
        width: 7960 / 2,
        height: 4600 / 2,
        screenOffsetLeft: 140 / 2,
        screenOffsetTop: 140 / 2,
      },
    },
    { id: "720p", title: "720p", ...mn.desktop, screenWidth: 720, screenHeight: 1280 },
    { id: "900p", title: "900p", ...mn.desktop, screenWidth: 900, screenHeight: 1440 },
    { id: "1080p", title: "1080p", ...mn.desktop, screenWidth: 1080, screenHeight: 1920 },
    { id: "1440p", title: "1440p", ...mn.desktop, screenWidth: 1440, screenHeight: 2560 },
    { id: "4k", title: "4K", ...mn.desktop, screenWidth: 2160, screenHeight: 3840 },
  ];
var V4 = EL.reduce((e, t) => ((e[t.id] = t), e), {});
var Re = (e) => e;
function TL(e) {
  let t = Object.create(Object.prototype);
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
var IL =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  RL = TL(
    (e) =>
      IL.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
  ),
  oS = p.createContext(void 0),
  N4 = oS.Provider,
  PL = () => {
    let e = p.useContext(oS);
    return e ?? {};
  },
  _L = jt(Zh(), 1),
  Wt = typeof Ye < "u" ? Ye : void 0,
  Hn = () => typeof document == "object";
var FL = () => {
    let e = -1,
      n = Wt && /Version\/([\d.]+)/.exec(Wt.userAgent);
    return (n && n[1] && (e = parseFloat(n[1])), e);
  },
  LL = () => Wt && /Chrome/.test(Wt.userAgent) && /Google Inc/.test(Wt.vendor) && !OL(),
  aS = () => Wt && /Safari/.test(Wt.userAgent) && /Apple Computer/.test(Wt.vendor);
var ML = () => Wt && /FramerX/.test(Wt.userAgent),
  OL = () => Wt && /Edg\//.test(Wt.userAgent);
var sS = () => _L.default.env.NODE_ENV === "test";
var Dx = (e) => () => {
    Ba(e);
  },
  VL = {
    useImageSource(e) {
      var t;
      return (t = e.src) != null ? t : "";
    },
    useImageElement(e, t, n) {
      let r = new Image();
      return ((r.src = Lt.useImageSource(e, t, n)), e.srcSet && (r.srcset = e.srcSet), r);
    },
    canRenderOptimizedCanvasImage() {
      return !1;
    },
  },
  AL = !1,
  DL = {
    get(e, t, n) {
      return Reflect.has(e, t)
        ? Reflect.get(e, t, n)
        : Dx(
            AL
              ? `${String(t)} is not available in this version of Framer.`
              : `${String(t)} is only available inside of Framer. https://www.framer.com/`
          );
    },
  },
  Lt = new Proxy(VL, DL);
function BL(e, t, n = 1) {
  var r, i, o, a;
  let { width: s, height: l } = t,
    c = (i = (r = e.pixelWidth) != null ? r : e.intrinsicWidth) != null ? i : 0,
    u = (a = (o = e.pixelHeight) != null ? o : e.intrinsicHeight) != null ? a : 0;
  if (s < 1 || l < 1 || c < 1 || u < 1) return;
  ((s *= n), (l *= n));
  let f = s / l,
    d = c / u;
  switch (e.fit) {
    case "fill":
      return d > f ? u / l : c / s;
    case "fit":
    case "stretch":
      return Math.max(c / s, u / l);
  }
}
function Bx(e, t) {
  return t && Math.max(1, e) > t ? "pixelated" : "auto";
}
var zx = { position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 },
  zL = {
    backgroundSize: "16px 16px",
    backgroundImage:
      "repeating-linear-gradient(45deg, rgba(180, 180, 180, 0.8) 0, rgba(180, 180, 180, 0.8) 1px, rgba(255, 255, 255, 0.2) 0, rgba(255, 255, 255, 0.2) 50%)",
    border: "1px solid #c4c4c4",
  };
function HL(e) {
  switch (e) {
    case "fit":
      return "contain";
    case "stretch":
      return "fill";
    default:
      return "cover";
  }
}
function lS(e, t) {
  let n = e ?? "center",
    r = t ?? "center";
  return n === "center" && r === "center" ? "center" : n + " " + r;
}
function NL(e, t) {
  if (!t) return "auto";
  let n = we.current() === "CANVAS" ? Te.devicePixelRatio : 1,
    r = BL(e, t, n);
  return we.current() === "CANVAS" ? Bx(1, r) : Bx(xc.zoom, r);
}
function op(e, t) {
  return {
    display: "block",
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    objectPosition: lS(e.positionX, e.positionY),
    objectFit: HL(e.fit),
    imageRendering: NL(e, t),
  };
}
function $L({ image: e, containerSize: t, nodeId: n, alt: r }) {
  let i = Lt.useImageSource(e, t, n),
    o = op(e, t),
    [a, s] = p.useState(),
    l = p.useRef(null),
    c = PL();
  return (
    p.useEffect(() => {
      if (!c.imgSizesWorkaroundEnabled) return;
      let u = l.current;
      if (!u || sS() || !e.sizes || !u.closest("[data-framer-name]")) return;
      let d = u.clientWidth,
        m = Number(e.sizes.replace("px", ""));
      (!isNaN(m) && d < m) || s(d + "px");
    }, [e.sizes]),
    p.createElement("img", {
      ref: l,
      src: i,
      alt: r ?? e.alt,
      srcSet: e.srcSet,
      sizes: a ?? e.sizes,
      style: o,
      loading: e.loading,
    })
  );
}
function WL({ image: e, containerSize: t, nodeId: n }) {
  let r = p.useRef(null),
    i = Lt.useImageElement(e, t, n),
    o = op(e, t);
  return (
    p.useLayoutEffect(() => {
      let a = r.current;
      if (a !== null)
        return (
          a.appendChild(i),
          () => {
            a.removeChild(i);
          }
        );
    }, [i]),
    Object.assign(i.style, o),
    p.createElement("div", { ref: r, style: { display: "contents", borderRadius: "inherit" } })
  );
}
function UL({ nodeId: e, image: t, containerSize: n }) {
  let r = p.useRef(null),
    i = Lt.useImageSource(t, n, e);
  return (
    p.useLayoutEffect(() => {
      let o = r.current;
      if (o === null) return;
      let a = op(t, n);
      Lt.renderOptimizedCanvasImage(o, i, a, e);
    }, [e, t, i, n]),
    p.createElement("div", { ref: r, style: { display: "contents", borderRadius: "inherit" } })
  );
}
function cS({ layoutId: e, image: t, ...n }) {
  e && (e = e + "-background");
  let r = { ...zx, ...zL },
    i = null;
  if (Ie(t.src))
    if (t.fit === "tile" && t.pixelWidth && t.pixelHeight) {
      let o = zn(t.backgroundSize) ? t.backgroundSize : 1,
        a = { width: Math.round(o * t.pixelWidth), height: Math.round(o * t.pixelHeight) },
        s = Lt.useImageSource(t, a);
      ((r.backgroundImage = `url(${s})`),
        (r.backgroundRepeat = "repeat"),
        (r.backgroundPosition = lS(t.positionX, t.positionY)),
        t.pixelWidth && (r.backgroundSize = `${(o * (t.pixelWidth / 2)).toFixed(2)}px auto`),
        (r.border = 0),
        (i = null));
    } else
      we.current() !== "CANVAS"
        ? (i = p.createElement($L, { image: t, ...n }))
        : Lt.canRenderOptimizedCanvasImage(Lt.useImageSource(t))
          ? (i = p.createElement(UL, { image: t, ...n }))
          : (i = p.createElement(WL, { image: t, ...n }));
  return p.createElement(
    wt.div,
    { layoutId: e, style: i ? zx : r, "data-framer-background-image-wrapper": !0 },
    i
  );
}
var jL = "src",
  An;
((e) => {
  e.isImageObject = function (t) {
    return !t || typeof t == "string" ? !1 : jL in t;
  };
})(An || (An = {}));
function XL(e, t) {
  let { _forwardedOverrideId: n, _forwardedOverrides: r, id: i } = t,
    o = n ?? i,
    a = r && o ? r[o] : void 0;
  return (a && typeof a == "string" && (e = { ...e, src: a }), e);
}
function GL(e) {
  let { background: t, image: n } = e;
  if (n !== void 0 && t && !An.isImageObject(t)) return;
  let r = null;
  if ((Ie(n) ? (r = { alt: "", src: n }) : (r = _e.get(t, null)), !!An.isImageObject(r)))
    return XL(r, e);
}
function YL(e, t, n = !0) {
  let { borderWidth: r, borderStyle: i, borderColor: o } = e;
  if (!r) return;
  let a, s, l, c;
  if (
    (typeof r == "number"
      ? (a = s = l = c = r)
      : ((a = r.top || 0), (s = r.bottom || 0), (l = r.left || 0), (c = r.right || 0)),
    !(a === 0 && s === 0 && l === 0 && c === 0))
  ) {
    if (n && a === s && a === l && a === c) {
      t.border = `${a}px ${i} ${o}`;
      return;
    }
    ((t.borderStyle = e.borderStyle),
      (t.borderColor = e.borderColor),
      (t.borderTopWidth = `${a}px`),
      (t.borderBottomWidth = `${s}px`),
      (t.borderLeftWidth = `${l}px`),
      (t.borderRightWidth = `${c}px`));
  }
}
function KL(e) {
  let t = e.layoutId ? `${e.layoutId}-border` : void 0;
  if (!e.borderWidth) return null;
  let n = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: "inherit",
    pointerEvents: "none",
  };
  return e.border
    ? ((n.border = e.border), p.createElement(wt.div, { style: n }))
    : (YL(e, n, !1), p.createElement(wt.div, { "data-frame-border": !0, style: n, layoutId: t }));
}
function Fc(e) {
  return e && e !== "search" && e !== "slot" && e !== "template" ? wt[e] : wt.div;
}
var qL = LL();
function uS(e) {
  let t = {};
  return (
    !qL ||
      we.current() !== "CANVAS" ||
      ((e === !0 || e === "x") && (t["data-framer-layout-hint-center-x"] = !0),
      (e === !0 || e === "y") && (t["data-framer-layout-hint-center-y"] = !0)),
    t
  );
}
function ap(e) {
  return e.replace(/^id_/, "").replace(/\\/g, "");
}
function QL(e, t) {
  if (!t && ((t = e.children), !t)) return { props: e, children: t };
  let n = e._forwardedOverrides,
    r = e._overrideForwardingDescription;
  if (r) {
    n = void 0;
    for (let i in r) {
      let o = r[i];
      e[o] !== void 0 && (n || ((n = {}), (e = { ...e })), (n[i] = e[o]), delete e[o]);
    }
  }
  return n
    ? ((t = p.Children.map(t, (i) =>
        p.isValidElement(i) ? p.cloneElement(i, { _forwardedOverrides: n }) : i
      )),
      { props: e, children: t })
    : { props: e, children: t };
}
function Lc(e) {
  return (t, n) =>
    e === !0
      ? `translate(-50%, -50%) ${n}`
      : e === "x"
        ? `translateX(-50%) ${n}`
        : e === "y"
          ? `translateY(-50%) ${n}`
          : n || "none";
}
function Ga(e, { specificLayoutId: t, postfix: n } = {}) {
  let { name: r, layoutIdKey: i, duplicatedFrom: o, __fromCodeComponentNode: a = !1, drag: s } = e,
    { getLayoutId: l, enabled: c } = O(ao);
  return se(() => {
    if (!c) return e.layoutId;
    let u = t || e.layoutId;
    if (!u && (s || !i || a)) return;
    let f = u || l({ id: i, name: r, duplicatedFrom: o });
    if (f) return n ? `${f}-${n}` : f;
  }, [c]);
}
var fS = typeof document < "u" ? Ir : X,
  co = p.createContext(!1),
  ei = [],
  ZL = function () {
    return ei.some(function (e) {
      return e.activeTargets.length > 0;
    });
  },
  JL = function () {
    return ei.some(function (e) {
      return e.skippedTargets.length > 0;
    });
  },
  Hx = "ResizeObserver loop completed with undelivered notifications.",
  eM = function () {
    var e;
    (typeof ErrorEvent == "function"
      ? (e = new ErrorEvent("error", { message: Hx }))
      : ((e = document.createEvent("Event")), e.initEvent("error", !1, !1), (e.message = Hx)),
      F.dispatchEvent(e));
  },
  Ha;
(function (e) {
  ((e.BORDER_BOX = "border-box"),
    (e.CONTENT_BOX = "content-box"),
    (e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box"));
})(Ha || (Ha = {}));
var ti = function (e) {
    return Object.freeze(e);
  },
  tM = (function () {
    function e(t, n) {
      ((this.inlineSize = t), (this.blockSize = n), ti(this));
    }
    return e;
  })(),
  dS = (function () {
    function e(t, n, r, i) {
      return (
        (this.x = t),
        (this.y = n),
        (this.width = r),
        (this.height = i),
        (this.top = this.y),
        (this.left = this.x),
        (this.bottom = this.top + this.height),
        (this.right = this.left + this.width),
        ti(this)
      );
    }
    return (
      (e.prototype.toJSON = function () {
        var t = this,
          n = t.x,
          r = t.y,
          i = t.top,
          o = t.right,
          a = t.bottom,
          s = t.left,
          l = t.width,
          c = t.height;
        return { x: n, y: r, top: i, right: o, bottom: a, left: s, width: l, height: c };
      }),
      (e.fromRect = function (t) {
        return new e(t.x, t.y, t.width, t.height);
      }),
      e
    );
  })(),
  sp = function (e) {
    return e instanceof SVGElement && "getBBox" in e;
  },
  hS = function (e) {
    if (sp(e)) {
      var t = e.getBBox(),
        n = t.width,
        r = t.height;
      return !n && !r;
    }
    var i = e,
      o = i.offsetWidth,
      a = i.offsetHeight;
    return !(o || a || e.getClientRects().length);
  },
  Nx = function (e) {
    var t, n;
    if (e instanceof Element) return !0;
    var r =
      (n = (t = e) === null || t === void 0 ? void 0 : t.ownerDocument) === null || n === void 0
        ? void 0
        : n.defaultView;
    return !!(r && e instanceof r.Element);
  },
  nM = function (e) {
    switch (e.tagName) {
      case "INPUT":
        if (e.type !== "image") break;
      case "VIDEO":
      case "AUDIO":
      case "EMBED":
      case "OBJECT":
      case "CANVAS":
      case "IFRAME":
      case "IMG":
        return !0;
    }
    return !1;
  },
  Aa = typeof F < "u" ? F : {},
  rc = new WeakMap(),
  $x = /auto|scroll/,
  rM = /^tb|vertical/,
  iM = /msie|trident/i.test(Aa.navigator && Aa.navigator.userAgent),
  vn = function (e) {
    return parseFloat(e || "0");
  },
  oo = function (e, t, n) {
    return (
      e === void 0 && (e = 0),
      t === void 0 && (t = 0),
      n === void 0 && (n = !1),
      new tM((n ? t : e) || 0, (n ? e : t) || 0)
    );
  },
  Wx = ti({
    devicePixelContentBoxSize: oo(),
    borderBoxSize: oo(),
    contentBoxSize: oo(),
    contentRect: new dS(0, 0, 0, 0),
  }),
  pS = function (e, t) {
    if ((t === void 0 && (t = !1), rc.has(e) && !t)) return rc.get(e);
    if (hS(e)) return (rc.set(e, Wx), Wx);
    var n = getComputedStyle(e),
      r = sp(e) && e.ownerSVGElement && e.getBBox(),
      i = !iM && n.boxSizing === "border-box",
      o = rM.test(n.writingMode || ""),
      a = !r && $x.test(n.overflowY || ""),
      s = !r && $x.test(n.overflowX || ""),
      l = r ? 0 : vn(n.paddingTop),
      c = r ? 0 : vn(n.paddingRight),
      u = r ? 0 : vn(n.paddingBottom),
      f = r ? 0 : vn(n.paddingLeft),
      d = r ? 0 : vn(n.borderTopWidth),
      m = r ? 0 : vn(n.borderRightWidth),
      y = r ? 0 : vn(n.borderBottomWidth),
      b = r ? 0 : vn(n.borderLeftWidth),
      S = f + c,
      h = l + u,
      v = b + m,
      g = d + y,
      x = s ? e.offsetHeight - g - e.clientHeight : 0,
      k = a ? e.offsetWidth - v - e.clientWidth : 0,
      w = i ? S + v : 0,
      E = i ? h + g : 0,
      C = r ? r.width : vn(n.width) - w - k,
      I = r ? r.height : vn(n.height) - E - x,
      T = C + S + k + v,
      z = I + h + x + g,
      A = ti({
        devicePixelContentBoxSize: oo(
          Math.round(C * devicePixelRatio),
          Math.round(I * devicePixelRatio),
          o
        ),
        borderBoxSize: oo(T, z, o),
        contentBoxSize: oo(C, I, o),
        contentRect: new dS(f, l, C, I),
      });
    return (rc.set(e, A), A);
  },
  mS = function (e, t, n) {
    var r = pS(e, n),
      i = r.borderBoxSize,
      o = r.contentBoxSize,
      a = r.devicePixelContentBoxSize;
    switch (t) {
      case Ha.DEVICE_PIXEL_CONTENT_BOX:
        return a;
      case Ha.BORDER_BOX:
        return i;
      default:
        return o;
    }
  },
  oM = (function () {
    function e(t) {
      var n = pS(t);
      ((this.target = t),
        (this.contentRect = n.contentRect),
        (this.borderBoxSize = ti([n.borderBoxSize])),
        (this.contentBoxSize = ti([n.contentBoxSize])),
        (this.devicePixelContentBoxSize = ti([n.devicePixelContentBoxSize])));
    }
    return e;
  })(),
  vS = function (e) {
    if (hS(e)) return 1 / 0;
    for (var t = 0, n = e.parentNode; n;) ((t += 1), (n = n.parentNode));
    return t;
  },
  aM = function () {
    var e = 1 / 0,
      t = [];
    ei.forEach(function (a) {
      if (a.activeTargets.length !== 0) {
        var s = [];
        (a.activeTargets.forEach(function (c) {
          var u = new oM(c.target),
            f = vS(c.target);
          (s.push(u), (c.lastReportedSize = mS(c.target, c.observedBox)), f < e && (e = f));
        }),
          t.push(function () {
            a.callback.call(a.observer, s, a.observer);
          }),
          a.activeTargets.splice(0, a.activeTargets.length));
      }
    });
    for (var n = 0, r = t; n < r.length; n++) {
      var i = r[n];
      i();
    }
    return e;
  },
  Ux = function (e) {
    ei.forEach(function (n) {
      (n.activeTargets.splice(0, n.activeTargets.length),
        n.skippedTargets.splice(0, n.skippedTargets.length),
        n.observationTargets.forEach(function (i) {
          i.isActive() && (vS(i.target) > e ? n.activeTargets.push(i) : n.skippedTargets.push(i));
        }));
    });
  },
  sM = function () {
    var e = 0;
    for (Ux(e); ZL();) ((e = aM()), Ux(e));
    return (JL() && eM(), e > 0);
  },
  Rh,
  gS = [],
  lM = function () {
    return gS.splice(0).forEach(function (e) {
      return e();
    });
  },
  cM = function (e) {
    if (!Rh) {
      var t = 0,
        n = document.createTextNode(""),
        r = { characterData: !0 };
      (new MutationObserver(function () {
        return lM();
      }).observe(n, r),
        (Rh = function () {
          n.textContent = "" + (t ? t-- : t++);
        }));
    }
    (gS.push(e), Rh());
  },
  uM = function (e) {
    cM(function () {
      requestAnimationFrame(e);
    });
  },
  hc = 0,
  fM = function () {
    return !!hc;
  },
  dM = 250,
  hM = { attributes: !0, characterData: !0, childList: !0, subtree: !0 },
  jx = [
    "resize",
    "load",
    "transitionend",
    "animationend",
    "animationstart",
    "animationiteration",
    "keyup",
    "keydown",
    "mouseup",
    "mousedown",
    "mouseover",
    "mouseout",
    "blur",
    "focus",
  ],
  Xx = function (e) {
    return (e === void 0 && (e = 0), Date.now() + e);
  },
  Ph = !1,
  pM = (function () {
    function e() {
      var t = this;
      ((this.stopped = !0),
        (this.listener = function () {
          return t.schedule();
        }));
    }
    return (
      (e.prototype.run = function (t) {
        var n = this;
        if ((t === void 0 && (t = dM), !Ph)) {
          Ph = !0;
          var r = Xx(t);
          uM(function () {
            var i = !1;
            try {
              i = sM();
            } finally {
              if (((Ph = !1), (t = r - Xx()), !fM())) return;
              i ? n.run(1e3) : t > 0 ? n.run(t) : n.start();
            }
          });
        }
      }),
      (e.prototype.schedule = function () {
        (this.stop(), this.run());
      }),
      (e.prototype.observe = function () {
        var t = this,
          n = function () {
            return t.observer && t.observer.observe(document.body, hM);
          };
        document.body ? n() : Aa.addEventListener("DOMContentLoaded", n);
      }),
      (e.prototype.start = function () {
        var t = this;
        this.stopped &&
          ((this.stopped = !1),
          (this.observer = new MutationObserver(this.listener)),
          this.observe(),
          jx.forEach(function (n) {
            return Aa.addEventListener(n, t.listener, !0);
          }));
      }),
      (e.prototype.stop = function () {
        var t = this;
        this.stopped ||
          (this.observer && this.observer.disconnect(),
          jx.forEach(function (n) {
            return Aa.removeEventListener(n, t.listener, !0);
          }),
          (this.stopped = !0));
      }),
      e
    );
  })(),
  Xh = new pM(),
  Gx = function (e) {
    (!hc && e > 0 && Xh.start(), (hc += e), !hc && Xh.stop());
  },
  mM = function (e) {
    return !sp(e) && !nM(e) && getComputedStyle(e).display === "inline";
  },
  vM = (function () {
    function e(t, n) {
      ((this.target = t),
        (this.observedBox = n || Ha.CONTENT_BOX),
        (this.lastReportedSize = { inlineSize: 0, blockSize: 0 }));
    }
    return (
      (e.prototype.isActive = function () {
        var t = mS(this.target, this.observedBox, !0);
        return (
          mM(this.target) && (this.lastReportedSize = t),
          this.lastReportedSize.inlineSize !== t.inlineSize ||
            this.lastReportedSize.blockSize !== t.blockSize
        );
      }),
      e
    );
  })(),
  gM = (function () {
    function e(t, n) {
      ((this.activeTargets = []),
        (this.skippedTargets = []),
        (this.observationTargets = []),
        (this.observer = t),
        (this.callback = n));
    }
    return e;
  })(),
  ic = new WeakMap(),
  Yx = function (e, t) {
    for (var n = 0; n < e.length; n += 1) if (e[n].target === t) return n;
    return -1;
  },
  oc = (function () {
    function e() {}
    return (
      (e.connect = function (t, n) {
        var r = new gM(t, n);
        ic.set(t, r);
      }),
      (e.observe = function (t, n, r) {
        var i = ic.get(t),
          o = i.observationTargets.length === 0;
        Yx(i.observationTargets, n) < 0 &&
          (o && ei.push(i), i.observationTargets.push(new vM(n, r && r.box)), Gx(1), Xh.schedule());
      }),
      (e.unobserve = function (t, n) {
        var r = ic.get(t),
          i = Yx(r.observationTargets, n),
          o = r.observationTargets.length === 1;
        i >= 0 && (o && ei.splice(ei.indexOf(r), 1), r.observationTargets.splice(i, 1), Gx(-1));
      }),
      (e.disconnect = function (t) {
        var n = this,
          r = ic.get(t);
        (r.observationTargets.slice().forEach(function (i) {
          return n.unobserve(t, i.target);
        }),
          r.activeTargets.splice(0, r.activeTargets.length));
      }),
      e
    );
  })(),
  yM = (function () {
    function e(t) {
      if (arguments.length === 0)
        throw new TypeError(
          "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present."
        );
      if (typeof t != "function")
        throw new TypeError(
          "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function."
        );
      oc.connect(this, t);
    }
    return (
      (e.prototype.observe = function (t, n) {
        if (arguments.length === 0)
          throw new TypeError(
            "Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present."
          );
        if (!Nx(t))
          throw new TypeError(
            "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element"
          );
        oc.observe(this, t, n);
      }),
      (e.prototype.unobserve = function (t) {
        if (arguments.length === 0)
          throw new TypeError(
            "Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present."
          );
        if (!Nx(t))
          throw new TypeError(
            "Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element"
          );
        oc.unobserve(this, t);
      }),
      (e.prototype.disconnect = function () {
        oc.disconnect(this);
      }),
      (e.toString = function () {
        return "function ResizeObserver () { [polyfill code] }";
      }),
      e
    );
  })();
function Mc() {
  let [e, t] = p.useState(0);
  return p.useCallback(() => t((n) => n + 1), []);
}
var La,
  Ma,
  bM = class {
    constructor() {
      (_o(this, La, void 0), _o(this, Ma, new WeakMap()));
      var e;
      let t = (e = Te.ResizeObserver) != null ? e : yM;
      xu(this, La, new t(this.updateResizedElements.bind(this)));
    }
    updateResizedElements(e) {
      for (let t of e) {
        let n = mt(this, Ma).get(t.target);
        n && n(t.contentRect);
      }
    }
    observeElementWithCallback(e, t) {
      (mt(this, La).observe(e), mt(this, Ma).set(e, t));
    }
    unobserve(e) {
      (mt(this, La).unobserve(e), mt(this, Ma).delete(e));
    }
  };
La = new WeakMap();
Ma = new WeakMap();
var ac = Hn() ? new bM() : void 0;
function xM(e) {
  let t = Mc();
  X(() => {
    let n = e?.current;
    if (n)
      return (
        ac?.observeElementWithCallback(e.current, t),
        () => {
          ac?.unobserve(n);
        }
      );
  }, [e, t]);
}
var SM = "data-framer-size-compatibility-wrapper";
function wM(e) {
  return [
    ...(e.firstElementChild && e.firstElementChild.hasAttribute(SM)
      ? e.firstElementChild.children
      : e.children),
  ]
    .filter(yS)
    .map(bS);
}
function yS(e) {
  return e instanceof HTMLBaseElement ||
    e instanceof HTMLHeadElement ||
    e instanceof HTMLLinkElement ||
    e instanceof HTMLMetaElement ||
    e instanceof HTMLScriptElement ||
    e instanceof HTMLStyleElement ||
    e instanceof HTMLTitleElement
    ? !1
    : e instanceof HTMLElement || e instanceof SVGElement;
}
function bS(e) {
  if (!(e instanceof HTMLElement) || e.children.length === 0 || e.style.display !== "contents")
    return e;
  let t = [...e.children].find(yS);
  return t ? bS(t) : e;
}
function Oc(e, t, n = () => [], r = {}) {
  let { id: i, visible: o, _needsMeasure: a } = e,
    { skipHook: s = !1 } = r,
    l = !!O(co),
    c = we.current() === "CANVAS";
  fS(() => {
    !c ||
      l ||
      s ||
      (t.current && i && o && a && Lt.queueMeasureRequest(ap(i), t.current, n(t.current)));
  });
}
function kM(e) {
  let t = e.closest("[data-framer-component-container]");
  t && Lt.queueMeasureRequest(ap(t.id), t, wM(t));
}
var ii = Object.keys;
function Na(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Kx(e) {
  return Na(e, "equals") ? typeof e.equals == "function" : !1;
}
function lp(e, t) {
  return e === t ? !0 : e !== e && t !== t;
}
function CM(e, t) {
  let n = e.length;
  if (n !== t.length) return !1;
  for (let r = n; r-- !== 0;) if (!lp(e[r], t[r])) return !1;
  return !0;
}
function EM(e, t) {
  let n = e.length;
  if (n !== t.length) return !1;
  for (let r = n; r-- !== 0;) if (!Vc(e[r], t[r], !0)) return !1;
  return !0;
}
function TM(e, t) {
  if (e.size !== t.size) return !1;
  for (let [n, r] of e.entries()) if (!lp(r, t.get(n))) return !1;
  return !0;
}
function IM(e, t) {
  if (e.size !== t.size) return !1;
  for (let [n, r] of e.entries()) if (!Vc(r, t.get(n), !0)) return !1;
  return !0;
}
function RM(e, t) {
  if (e.size !== t.size) return !1;
  for (let n of e.keys()) if (!t.has(n)) return !1;
  return !0;
}
function PM(e, t) {
  let n = ii(e);
  if (n.length !== ii(t).length) return !1;
  for (let r of n) {
    if (!Na(t, r)) return !1;
    if (!(r === "_owner" && Na(e, "$$typeof") && e.$$typeof) && !lp(e[r], t[r])) return !1;
  }
  return !0;
}
function _M(e, t) {
  let n = ii(e);
  if (n.length !== ii(t).length) return !1;
  for (let r of n) {
    if (!Na(t, r)) return !1;
    if (!(r === "_owner" && Na(e, "$$typeof") && e.$$typeof) && !Vc(e[r], t[r], !0)) return !1;
  }
  return !0;
}
function Vc(e, t, n) {
  if (e === t) return !0;
  if (!e || !t) return e !== e && t !== t;
  let r = typeof e;
  if (r !== typeof t || r !== "object") return !1;
  let o = Array.isArray(e),
    a = Array.isArray(t);
  if (o && a) return n ? EM(e, t) : CM(e, t);
  if (o !== a) return !1;
  let s = e instanceof Map,
    l = t instanceof Map;
  if (s && l) return n ? IM(e, t) : TM(e, t);
  if (s !== l) return !1;
  let c = e instanceof Set,
    u = t instanceof Set;
  if (c && u) return RM(e, t);
  if (c !== u) return !1;
  let f = e instanceof Date,
    d = t instanceof Date;
  if (f && d) return e.getTime() === t.getTime();
  if (f !== d) return !1;
  let m = e instanceof RegExp,
    y = t instanceof RegExp;
  return m && y
    ? e.toString() === t.toString()
    : m !== y
      ? !1
      : Kx(e) && Kx(t)
        ? e.equals(t)
        : n
          ? _M(e, t)
          : PM(e, t);
}
function xS(e, t, n = !0) {
  try {
    return Vc(e, t, n);
  } catch (r) {
    if (r instanceof Error && r.message.match(/stack|recursion/i))
      return (
        console.warn("Warning: isEqual does not handle circular references.", r.name, r.message),
        !1
      );
    throw r;
  }
}
var SS = "0.000001px",
  _h = ` translateZ(${SS})`,
  wS = ML() || aS() || sS();
function FM(e) {
  e.willChange = "transform";
  let t = we.current() === "CANVAS";
  wS && t && (e.translateZ = SS);
}
function cp(e) {
  ((e.willChange = "transform"), LM(e, !0));
}
function LM(e, t) {
  let n = we.current() === "CANVAS";
  if (!wS || !n) return;
  let r = e.transform || "";
  t ? r.includes(_h) || (e.transform = r + _h) : (e.transform = r.replace(_h, ""));
}
function kS(e, t, n, r = !0) {
  if (!e) return;
  let i = Re(e.style),
    o = n || i[t],
    a = () => {
      i[t] = o;
    };
  ((i[t] = null), r ? Promise.resolve().then(a) : setTimeout(a, 0));
}
var Da = class extends ke {
  constructor() {
    (super(...arguments),
      R(this, "layerElement", null),
      R(this, "setLayerElement", (e) => {
        this.layerElement = e;
      }));
  }
  static applyWillChange(e, t, n) {
    e.willChangeTransform && (n ? FM(t) : cp(t));
  }
  shouldComponentUpdate(e, t) {
    return e._needsMeasure || this.state !== t || !xS(this.props, e);
  }
  componentDidUpdate(e) {
    Re(this.props).clip &&
      Re(this.props).radius === 0 &&
      Re(e).radius !== 0 &&
      kS(this.layerElement, "overflow", "hidden", !1);
  }
};
R(Da, "defaultProps", {});
function MM(e, t) {
  if (e.size < t) return;
  let r = Math.round(Math.random());
  for (let i of e.keys()) (++r & 1) !== 1 && e.delete(i);
}
function OM(e, t, n, r) {
  let i = t.get(n);
  if (i) return i;
  MM(t, e);
  let o = r(n);
  return (t.set(n, o), o);
}
var CS = (e) => {
    let t = 0,
      n,
      r;
    if (e.length === 0) return t;
    for (n = 0; n < e.length; n++) ((r = e.charCodeAt(n)), (t = (t << 5) - t + r), (t |= 0));
    return t;
  },
  up = {
    hueRotate: (e, t) => W.toHslString(W.hueRotate(W(e), t)),
    setAlpha: (e, t) => W.toRgbString(W.alpha(W(e), t)),
    getAlpha: (e) => {
      let t = np(e);
      return t ? t.a : 1;
    },
    multiplyAlpha: (e, t) => W.toRgbString(W.multiplyAlpha(W(e), t)),
    toHex: (e) => W.toHexString(W(e)).toUpperCase(),
    toRgb: (e) => W.toRgb(W(e)),
    toRgbString: (e) => W.toRgbString(W(e)),
    toHSV: (e) => W.toHsv(W(e)),
    toHSL: (e) => W.toHsl(W(e)),
    toHslString: (e) => W.toHslString(W(e)),
    toHsvString: (e) => W.toHsvString(W(e)),
    hsvToHSLString: (e) => W.toHslString(W(tc(e.h, e.s, e.v, e.a))),
    hsvToHex: (e) => W.toHexString(W(tc(e.h, e.s, e.v, e.a))).toUpperCase(),
    hsvToRgbString: (e) => W.toRgbString(W(tc(e.h, e.s, e.v, e.a))),
    hsvToString: (e) => tc(e.h, e.s, e.v),
    rgbaToString: (e) => W.toRgbString(W(e)),
    rgbToHexString: (e) => W.toHexString(W(e)),
    hslToString: (e) => W.toHslString(W(e)),
    hslToRgbString: (e) => W.toRgbString(W(e)),
    toColorPickerSquare: (e) => W.toRgbString(W({ h: e, s: 1, l: 0.5, a: 1 })),
    isValid: (e) => W(e).isValid !== !1,
    equals: (e, t) => (
      typeof e == "string" && (e = W(e)),
      typeof t == "string" && (t = W(t)),
      W.equal(e, t)
    ),
    toHexOrRgbaString: (e) => {
      let t = W(e);
      return t.a !== 1 ? W.toRgbString(t) : W.toHexString(t);
    },
  },
  VM = /var\(.+\)/,
  AM = new Map();
function DM(e, t) {
  let n = [e, t];
  return VM.test(e) ? e : OM(1e3, AM, n, () => up.multiplyAlpha(e, t));
}
function Ya(e, t = 1) {
  let n;
  return (
    "stops" in e
      ? (n = e.stops)
      : (n = [
          { value: e.start, position: 0 },
          { value: e.end, position: 1 },
        ]),
    t === 1 ? n : n.map((r) => ({ ...r, value: DM(r.value, t) }))
  );
}
function ES(e, t) {
  let n = 0;
  return (
    Ya(e, t).forEach((r) => {
      n ^= CS(r.value) ^ r.position;
    }),
    n
  );
}
var BM = ["stops"];
function TS(e) {
  return e && BM.every((t) => t in e);
}
var zM = ["start", "end"];
function IS(e) {
  return e && zM.every((t) => t in e);
}
var HM = ["angle", "alpha"],
  $a = {
    isLinearGradient: (e) => e && HM.every((t) => t in e) && (IS(e) || TS(e)),
    hash: (e) => e.angle ^ ES(e, e.alpha),
    toCSS: (e, t) => {
      let n = Ya(e, e.alpha),
        r = t !== void 0 ? t : e.angle,
        i = n.map((o) => `${o.value} ${o.position * 100}%`);
      return `linear-gradient(${r}deg, ${i.join(", ")})`;
    },
  },
  NM = ["widthFactor", "heightFactor", "centerAnchorX", "centerAnchorY", "alpha"],
  Wa = {
    isRadialGradient: (e) => e && NM.every((t) => t in e) && (IS(e) || TS(e)),
    hash: (e) =>
      e.centerAnchorX ^ e.centerAnchorY ^ e.widthFactor ^ e.heightFactor ^ ES(e, e.alpha),
    toCSS: (e) => {
      let { alpha: t, widthFactor: n, heightFactor: r, centerAnchorX: i, centerAnchorY: o } = e,
        s = Ya(e, t).map((l) => `${l.value} ${l.position * 100}%`);
      return `radial-gradient(${n * 100}% ${r * 100}% at ${i * 100}% ${o * 100}%, ${s.join(", ")})`;
    },
  };
function $M({ background: e, backgroundColor: t }, n) {
  t
    ? typeof t == "string" || Fx(t)
      ? (n.backgroundColor = t)
      : W.isColorObject(e) && (n.backgroundColor = e.initialValue || W.toRgbString(e))
    : e &&
      ((e = _e.get(e, null)),
      typeof e == "string" || Fx(e)
        ? (n.background = e)
        : $a.isLinearGradient(e)
          ? (n.background = $a.toCSS(e))
          : Wa.isRadialGradient(e)
            ? (n.background = Wa.toCSS(e))
            : W.isColorObject(e) && (n.backgroundColor = e.initialValue || W.toRgbString(e)));
}
function te(e, t, n, r) {
  if ((r === void 0 && (r = t), e[t] !== void 0)) {
    n[r] = e[t];
    return;
  }
}
function WM(e) {
  return e ? e.left !== void 0 && e.right !== void 0 : !1;
}
function UM(e) {
  return e ? e.top !== void 0 && e.bottom !== void 0 : !1;
}
function jM(e) {
  if (!e) return {};
  let t = {};
  return (
    e.preserve3d === !0
      ? (t.transformStyle = "preserve-3d")
      : e.preserve3d === !1 && (t.transformStyle = "flat"),
    e.backfaceVisible === !0
      ? (t.backfaceVisibility = "visible")
      : e.backfaceVisible === !1 && (t.backfaceVisibility = "hidden"),
    t.backfaceVisibility && (t.WebkitBackfaceVisibility = t.backfaceVisibility),
    e.perspective !== void 0 && (t.perspective = t.WebkitPerspective = e.perspective),
    e.__fromCanvasComponent ||
      (e.center === !0
        ? ((t.left = "50%"), (t.top = "50%"))
        : e.center === "x"
          ? (t.left = "50%")
          : e.center === "y" && (t.top = "50%")),
    te(e, "size", t),
    te(e, "width", t),
    te(e, "height", t),
    te(e, "minWidth", t),
    te(e, "minHeight", t),
    te(e, "top", t),
    te(e, "right", t),
    te(e, "bottom", t),
    te(e, "left", t),
    te(e, "position", t),
    te(e, "overflow", t),
    te(e, "opacity", t),
    (!e._border || !e._border.borderWidth) && te(e, "border", t),
    te(e, "borderRadius", t),
    te(e, "radius", t, "borderRadius"),
    te(e, "color", t),
    te(e, "shadow", t, "boxShadow"),
    te(e, "x", t),
    te(e, "y", t),
    te(e, "z", t),
    te(e, "rotate", t),
    te(e, "rotateX", t),
    te(e, "rotateY", t),
    te(e, "rotateZ", t),
    te(e, "scale", t),
    te(e, "scaleX", t),
    te(e, "scaleY", t),
    te(e, "skew", t),
    te(e, "skewX", t),
    te(e, "skewY", t),
    te(e, "originX", t),
    te(e, "originY", t),
    te(e, "originZ", t),
    $M(e, t),
    t
  );
}
function XM(e) {
  for (let t in e)
    if (
      t === "drag" ||
      t.startsWith("while") ||
      (typeof Re(e)[t] == "function" && t.startsWith("on") && !t.includes("Animation"))
    )
      return !0;
  return !1;
}
var qx = [
    "onClick",
    "onDoubleClick",
    "onMouse",
    "onMouseDown",
    "onMouseUp",
    "onTapDown",
    "onTap",
    "onTapUp",
    "onPointer",
    "onPointerDown",
    "onPointerUp",
    "onTouch",
    "onTouchDown",
    "onTouchUp",
  ],
  GM = new Set([...qx, ...qx.map((e) => `${e}Capture`)]);
function YM(e) {
  if (e.drag) return "grab";
  for (let t in e) if (GM.has(t)) return "pointer";
}
var Fh = "overflow";
function KM(e) {
  return Qx(e) ? !0 : e.style ? !!Qx(e.style) : !1;
}
function Qx(e) {
  return Fh in e && (e[Fh] === "scroll" || e[Fh] === "auto");
}
function RS(e) {
  let {
      left: t,
      top: n,
      bottom: r,
      right: i,
      width: o,
      height: a,
      center: s,
      _constraints: l,
      size: c,
      widthType: u,
      heightType: f,
      positionFixed: d,
      positionAbsolute: m,
    } = e,
    y = qe(e.minWidth),
    b = qe(e.minHeight),
    S = qe(e.maxWidth),
    h = qe(e.maxHeight);
  return {
    top: qe(n),
    left: qe(t),
    bottom: qe(r),
    right: qe(i),
    width: qe(o),
    height: qe(a),
    size: qe(c),
    center: s,
    _constraints: l,
    widthType: u,
    heightType: f,
    positionFixed: d,
    positionAbsolute: m,
    minWidth: y,
    minHeight: b,
    maxWidth: S,
    maxHeight: h,
  };
}
var Zx = { x: 0, y: 0, width: 200, height: 200 };
function qM(e) {
  var t, n, r;
  p.useInsertionEffect(() => {
    Xa();
  }, []);
  let i = !!O(co),
    { style: o, _initialStyle: a, __fromCanvasComponent: s, size: l } = e,
    c = RS(e),
    u = S2(c),
    f = {
      display: "block",
      flex: (t = o?.flex) != null ? t : "0 0 auto",
      userSelect: we.current() !== "PREVIEW" ? "none" : void 0,
    };
  e.__fromCanvasComponent ||
    (f.backgroundColor = e.background === void 0 ? "rgba(0, 170, 255, 0.3)" : void 0);
  let d = !XM(e) && !e.__fromCanvasComponent && !KM(e),
    m = e.style ? !("pointerEvents" in e.style) : !0;
  d && m && (f.pointerEvents = "none");
  let b = p.Children.count(e.children) > 0 &&
      p.Children.toArray(e.children).every((x) => typeof x == "string" || typeof x == "number") && {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      },
    S = jM(e);
  (l === void 0 && !s && (WM(S) || (f.width = Zx.width), UM(S) || (f.height = Zx.height)),
    c.minWidth !== void 0 && (f.minWidth = c.minWidth),
    c.minHeight !== void 0 && (f.minHeight = c.minHeight));
  let h = {};
  (Ua(c) &&
    u &&
    !PS(e) &&
    (h = { left: u.x, top: u.y, width: u.width, height: u.height, right: void 0, bottom: void 0 }),
    Object.assign(f, b, a, S, h, o),
    Object.assign(f, {
      overflowX: (n = f.overflowX) != null ? n : f.overflow,
      overflowY: (r = f.overflowY) != null ? r : f.overflow,
      overflow: void 0,
    }),
    Da.applyWillChange(e, f, !0));
  let v = f;
  f.transform || (v = { x: 0, y: 0, ...f });
  let g = we.current() === "CANVAS";
  return (
    e.positionSticky
      ? (!g || i) &&
        ((v.position = "sticky"),
        (v.willChange = "transform"),
        (v.zIndex = 1),
        (v.top = e.positionStickyTop),
        (v.right = e.positionStickyRight),
        (v.bottom = e.positionStickyBottom),
        (v.left = e.positionStickyLeft))
      : g && (e.positionFixed || e.positionAbsolute) && (v.position = "absolute"),
    "rotate" in v && v.rotate === void 0 && delete v.rotate,
    [v, u]
  );
}
var QM = new Set([
  "width",
  "height",
  "opacity",
  "overflow",
  "radius",
  "background",
  "color",
  "x",
  "y",
  "z",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scale",
  "scaleX",
  "scaleY",
  "skew",
  "skewX",
  "skewY",
  "originX",
  "originY",
  "originZ",
]);
function ZM(e) {
  let t = {};
  for (let n in e)
    (hi(n) || RL(n)) && !QM.has(n)
      ? (t[n] = Re(e)[n])
      : (n === "positionTransition" || n === "layoutTransition") &&
        ((t.layout = !0),
        typeof Re(e)[n] != "boolean" && !e.transition && (t.transition = Re(e)[n]));
  return t;
}
function JM(e) {
  return "data-framer-name" in e;
}
var eO = Ne(function (t, n) {
    var r;
    let { name: i, center: o, border: a, _border: s, __portal: l } = t,
      { props: c, children: u } = QL(t),
      f = ZM(c),
      d = Ga(t),
      m = YM(t),
      y = B(null),
      b = n ?? y,
      S = {
        "data-framer-component-type": "Frame",
        "data-framer-cursor": m,
        "data-framer-highlight": m === "pointer" ? !0 : void 0,
        "data-layoutid": d,
        "data-framer-offset-parent-id": Re(t)["data-framer-offset-parent-id"],
      };
    !JM(t) && i && (Re(S)["data-framer-name"] = i);
    let [h, v] = qM(c),
      g = RS(c),
      x = PS(g);
    (o && !(v && !x && Ua(g))
      ? (f.transformTemplate || (f.transformTemplate = Lc(o)), Object.assign(S, uS(o)))
      : f.transformTemplate || (f.transformTemplate = void 0),
      Oc(t, b));
    let k = GL(t),
      w = !!O(co),
      E = tO(c, g, v, w),
      C = x2(
        p.createElement(
          p.Fragment,
          null,
          k
            ? p.createElement(cS, {
                alt: (r = t.alt) != null ? r : "",
                image: k,
                containerSize: v ?? void 0,
                nodeId: t.id && ap(t.id),
                layoutId: d,
              })
            : null,
          u,
          p.createElement(KL, { ...s, border: a, layoutId: d })
        ),
        E
      ),
      I = Fc(t.as),
      { size: T, radius: z, shadow: A } = h;
    return (
      T !== void 0 &&
        (delete h.size, h.height === void 0 && (h.height = T), h.width === void 0 && (h.width = T)),
      z !== void 0 && (delete h.radius, (h.borderRadius = z)),
      A !== void 0 && (delete h.shadow, (h.boxShadow = A)),
      p.createElement(I, { ...S, ...f, layoutId: d, style: h, ref: b }, C, l)
    );
  }),
  pc = Ne(function (t, n) {
    let { visible: r = !0 } = t;
    return r ? p.createElement(eO, { ...t, ref: n }) : null;
  });
function tO(e, t, n, r) {
  if (r) return n ? { width: n.width, height: n.height } : 1;
  let { _usesDOMRect: i } = e,
    { widthType: o = 0, heightType: a = 0, width: s, height: l } = t;
  return n && !i
    ? n
    : o === 0 && a === 0 && typeof s == "number" && typeof l == "number"
      ? { width: s, height: l }
      : i || e.positionFixed || e.positionAbsolute
        ? 2
        : 0;
}
function PS({ width: e, height: t }) {
  return e === "auto" || e === "min-content" || t === "auto" || t === "min-content";
}
var fp = "__LAYOUT_TREE_ROOT",
  _S = p.createContext({
    schedulePromoteTree: () => {},
    scheduleProjectionDidUpdate: () => {},
    initLead: () => {},
  }),
  nO = class extends ke {
    constructor() {
      (super(...arguments),
        R(this, "shouldAnimate", !1),
        R(this, "transition"),
        R(this, "lead"),
        R(this, "follow"),
        R(this, "scheduledPromotion", !1),
        R(this, "scheduledDidUpdate", !1),
        R(this, "scheduleProjectionDidUpdate", () => {
          this.scheduledDidUpdate = !0;
        }),
        R(this, "schedulePromoteTree", (e, t, n) => {
          ((this.follow = this.lead),
            (this.shouldAnimate = n),
            (this.lead = e),
            (this.transition = t),
            (this.scheduledPromotion = !0));
        }),
        R(this, "initLead", (e, t) => {
          ((this.follow = this.lead),
            (this.lead = e),
            this.follow && t && (this.follow.layoutMaybeMutated = !0));
        }),
        R(this, "sharedLayoutContext", {
          schedulePromoteTree: this.schedulePromoteTree,
          scheduleProjectionDidUpdate: this.scheduleProjectionDidUpdate,
          initLead: this.initLead,
        }));
    }
    getSnapshotBeforeUpdate() {
      var e;
      if (!this.scheduledPromotion || !this.lead || !this.follow) return null;
      let t = !!((e = this.lead) != null && e.layoutMaybeMutated) && !this.shouldAnimate;
      return (
        this.lead.projectionNodes.forEach((n) => {
          var r;
          n?.promote({
            needsReset: t,
            transition: this.shouldAnimate ? this.transition : void 0,
            preserveFollowOpacity:
              n.options.layoutId === fp && !((r = this.follow) != null && r.isExiting),
          });
        }),
        this.shouldAnimate
          ? (this.follow.layoutMaybeMutated = !0)
          : this.scheduleProjectionDidUpdate(),
        (this.lead.layoutMaybeMutated = !1),
        (this.transition = void 0),
        (this.scheduledPromotion = !1),
        null
      );
    }
    componentDidUpdate() {
      var e, t;
      if (!this.lead) return null;
      this.scheduledDidUpdate &&
        ((t = (e = this.lead.rootProjectionNode) == null ? void 0 : e.root) == null ||
          t.didUpdate(),
        (this.scheduledDidUpdate = !1));
    }
    render() {
      return p.createElement(_S.Provider, { value: this.sharedLayoutContext }, this.props.children);
    }
  },
  rO = { width: "100%", height: "100%", backgroundColor: "none" };
function iO(e) {
  return p.createElement(wt.div, { layoutId: fp, style: rO }, e.children);
}
var yr,
  Oa,
  oO = class {
    constructor(e) {
      (_o(this, yr, void 0),
        _o(this, Oa, new WeakMap()),
        document &&
          xu(this, yr, new IntersectionObserver(this.resizeObserverCallback.bind(this), e)));
    }
    resizeObserverCallback(e, t) {
      for (let n of e) {
        let r = mt(this, Oa).get(n.target);
        r && r([n], t);
      }
    }
    observeElementWithCallback(e, t) {
      mt(this, yr) && (mt(this, yr).observe(e), mt(this, Oa).set(e, t));
    }
    unobserve(e) {
      mt(this, yr) && (mt(this, yr).unobserve(e), mt(this, Oa).delete(e));
    }
    get root() {
      var e;
      return (e = mt(this, yr)) == null ? void 0 : e.root;
    }
  };
yr = new WeakMap();
Oa = new WeakMap();
var aO = p.createContext(new Map());
function sO(e, t, n) {
  if (typeof IntersectionObserver > "u") return;
  let r = Mt(() => `${n.rootMargin}`),
    i = p.useContext(aO),
    { enabled: o } = n;
  p.useEffect(() => {
    var a;
    let s = e.current;
    if (!o || !s) return;
    let l = i.get(r);
    if (!l || l.root !== ((a = n.root) == null ? void 0 : a.current)) {
      let { root: c, ...u } = n;
      ((l = new oO({ ...u, root: c?.current })), i.set(r, l));
    }
    return (l.observeElementWithCallback(s, t), () => l?.unobserve(s));
  }, [o]);
}
var lO = new Array(100).fill(void 0).map((e, t) => t * 0.01),
  cO = p.createContext(null);
function uO(e, t, n) {
  let r = p.useRef({ isInView: !1, hasAnimatedOnce: !1 }),
    { enabled: i, animateOnce: o, threshold: a, rootMargin: s = "0px 0px 0px 0px" } = n,
    l = p.useCallback(
      ([c]) => {
        var u;
        if (!c) return;
        let { isInView: f, hasAnimatedOnce: d } = r.current,
          m = dO(c, (u = a?.y) != null ? u : 0);
        if (m && !f) {
          if (o && d) return;
          ((r.current.hasAnimatedOnce = !0), (r.current.isInView = !0), t(!0));
          return;
        }
        if (!m && f) {
          if (((r.current.isInView = !1), o)) return;
          t(!1);
          return;
        }
      },
      [o, a?.y, t]
    );
  sO(e, l, { threshold: lO, rootMargin: s, enabled: i ?? !0 });
}
function fO(e, t) {
  return t.height === 0 ? 0 : e.height / Math.min(t.height, Te.innerHeight);
}
function dO({ boundingClientRect: e, intersectionRect: t, isIntersecting: n }, r) {
  return e.height === 0 ? n : n && fO(t, e) >= r;
}
var a5 = jt(Ic(), 1);
var l5 = jt(Ic(), 1);
var u5 = p.createContext({ dragging: !1 });
var hO = { onMouseEnter: "mouseenter", onMouseLeave: "mouseleave" },
  f5 = Object.keys(hO);
var Jx = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
  Vn = Symbol("private"),
  Lh = (() => {
    function e(t = {}, n = !1, r = !0) {
      let i = {
          [Vn]: {
            makeAnimatables: n,
            observeAnimatables: r,
            observers: new K1(),
            reset() {
              for (let a in o)
                if (Jx(o, a)) {
                  let s = Jx(t, a) ? Re(t)[a] : void 0;
                  s !== void 0 ? (o[a] = s) : delete o[a];
                }
            },
            transactions: new Set(),
          },
        },
        o = new Proxy(i, mO);
      return (Object.assign(o, t), o);
    }
    return (
      (e.resetObject = (t) => t[Vn].reset()),
      (e.addObserver = (t, n) => t[Vn].observers.add(n)),
      e
    );
  })(),
  pO = class {
    constructor() {
      (R(this, "set", (e, t, n, r) => {
        if (t === Vn) return !1;
        let i = e[Vn],
          o,
          a;
        if (
          (en(n) ? ((o = n), (a = o.get())) : (a = n),
          i.makeAnimatables && typeof n != "function" && typeof n != "object" && !o && (o = _e(n)),
          i.observeAnimatables && o)
        ) {
          let u = i.transactions;
          o.onUpdate({
            update: (f, d) => {
              (d && u.add(d), i.observers.notify({ value: r }, d));
            },
            finish: (f) => {
              u.delete(f) && i.observers.finishTransaction(f);
            },
          });
        }
        let s = !1,
          l = !0,
          c = Re(e)[t];
        if (c !== void 0) {
          en(c) ? ((l = c.get() !== a), c.set(a)) : ((l = c !== a), (Re(e)[t] = a));
          let u = a !== null && typeof a == "object";
          ((Array.isArray(a) || u) && (l = !0), (s = !0));
        } else (o && (n = o), (s = Reflect.set(e, t, n)));
        return (l && i.observers.notify({ value: r }), s);
      }),
        R(this, "get", (e, t, n) => {
          if (t === Vn) return Re(e)[t];
          let r = Reflect.get(e, t, n);
          return typeof r == "function" ? r.bind(n) : r;
        }));
    }
    deleteProperty(e, t) {
      let n = Reflect.deleteProperty(e, t);
      return (e[Vn].observers.notify({ value: e }), n);
    }
    ownKeys(e) {
      let t = Reflect.ownKeys(e),
        n = t.indexOf(Vn);
      return (n !== -1 && t.splice(n, 1), t);
    }
    getOwnPropertyDescriptor(e, t) {
      if (t !== Vn) return Reflect.getOwnPropertyDescriptor(e, t);
    }
  },
  mO = new pO();
var vO = "opacity";
function gO(e) {
  return vO in e;
}
function yO(e, t) {
  if (!gO(e)) return;
  let n = _e.getNumber(e.opacity);
  n !== 1 && (t.opacity = n);
}
function bO(e) {
  let t = [];
  if (e && e.length) {
    let n = e.map((r) => `drop-shadow(${r.x}px ${r.y}px ${r.blur}px ${r.color})`);
    t.push(...n);
  }
  return t;
}
function FS(e, t) {
  if (!e.shadows || e.shadows.length === 0) return;
  let n = e.shadows.map((r) => `${r.x}px ${r.y}px ${r.blur}px ${r.color}`).join(", ");
  n && (t.textShadow = n);
}
function xO(e, t) {
  let n = [];
  (Y(e.brightness) && n.push(`brightness(${e.brightness / 100})`),
    Y(e.contrast) && n.push(`contrast(${e.contrast / 100})`),
    Y(e.grayscale) && n.push(`grayscale(${e.grayscale / 100})`),
    Y(e.hueRotate) && n.push(`hue-rotate(${e.hueRotate}deg)`),
    Y(e.invert) && n.push(`invert(${e.invert / 100})`),
    Y(e.saturate) && n.push(`saturate(${e.saturate / 100})`),
    Y(e.sepia) && n.push(`sepia(${e.sepia / 100})`),
    Y(e.blur) && n.push(`blur(${e.blur}px)`),
    e.dropShadows && n.push(...bO(e.dropShadows)),
    n.length !== 0 && (t.filter = t.WebkitFilter = n.join(" ")));
}
function SO(e, t) {
  Y(e.backgroundBlur) &&
    (t.backdropFilter = t.WebkitBackdropFilter = `blur(${e.backgroundBlur}px)`);
}
function dp(e, t) {
  (SO(e, t), xO(e, t));
}
var { getNumber: p5 } = _e;
var wO = class extends ke {
    constructor() {
      (super(...arguments),
        R(this, "layoutMaybeMutated"),
        R(this, "projectionNodes", new Map()),
        R(this, "rootProjectionNode"),
        R(this, "isExiting"),
        R(
          this,
          "shouldPreserveFollowOpacity",
          (e) => e.options.layoutId === fp && !this.props.isExiting
        ),
        R(this, "switchLayoutGroupContext", {
          register: (e) => this.addChild(e),
          deregister: (e) => this.removeChild(e),
          transition:
            this.props.isLead !== void 0 && this.props.animatesLayout
              ? this.props.transition
              : void 0,
          shouldPreserveFollowOpacity: this.shouldPreserveFollowOpacity,
        }));
    }
    componentDidMount() {
      this.props.isLead &&
        this.props.sharedLayoutContext.initLead(this, !!this.props.animatesLayout);
    }
    shouldComponentUpdate(e) {
      let {
        isLead: t,
        isExiting: n,
        isOverlayed: r,
        animatesLayout: i,
        transition: o,
        sharedLayoutContext: a,
      } = e;
      if (((this.isExiting = n), t === void 0)) return !0;
      let s = !this.props.isLead && !!t,
        l = this.props.isExiting && !n,
        c = s || l,
        u = !!this.props.isLead && !t,
        f = this.props.isOverlayed !== r;
      return (
        (c || u) && this.projectionNodes.forEach((d) => d?.willUpdate()),
        c ? a.schedulePromoteTree(this, o, !!i) : f && a.scheduleProjectionDidUpdate(),
        !!c && !!i
      );
    }
    addChild(e) {
      let t = e.options.layoutId;
      t && (this.projectionNodes.set(t, e), this.setRootChild(e));
    }
    setRootChild(e) {
      if (!this.rootProjectionNode) return (this.rootProjectionNode = e);
      this.rootProjectionNode =
        this.rootProjectionNode.depth < e.depth ? this.rootProjectionNode : e;
    }
    removeChild(e) {
      let t = e.options.layoutId;
      t && this.projectionNodes.delete(t);
    }
    render() {
      return p.createElement(
        bs.Provider,
        { value: this.switchLayoutGroupContext },
        this.props.children
      );
    }
  },
  kO = (e) => {
    let t = p.useContext(_S);
    return p.createElement(wO, { ...e, sharedLayoutContext: t });
  },
  CO = p.createContext(!0);
function EO() {
  return new Map();
}
function TO() {
  return Mt(EO);
}
var LS = he({ register: () => {}, deregister: () => {} }),
  IO = ({ isCurrent: e, isOverlayed: t, children: n }) => {
    let r = TO(),
      i = ae(
        (s) => {
          if (r.has(s)) {
            console.warn("NavigationTargetWrapper: already registered");
            return;
          }
          r.set(s, void 0);
        },
        [r]
      ),
      o = ae(
        (s) => {
          let l = r.get(s);
          (l?.(), r.delete(s));
        },
        [r]
      ),
      a = B({ register: i, deregister: o }).current;
    return (
      X(
        () => (
          r.forEach((s, l) => {
            let c = l(e, t);
            r.set(l, rS(c) ? c : void 0);
          }),
          () => {
            r.forEach((s, l) => {
              s && (s(), r.set(l, void 0));
            });
          }
        ),
        [e, t, r]
      ),
      p.createElement(LS.Provider, { value: a }, n)
    );
  };
function MS(e, t = []) {
  let { register: n, deregister: r } = O(LS);
  X(() => {
    if (e) return (n(e), () => r(e));
  }, [n, r, ...t]);
}
var Mh = p.memo(function ({
  isLayeredContainer: t,
  isCurrent: n,
  isPrevious: r,
  isOverlayed: i = !1,
  visible: o,
  transitionProps: a,
  children: s,
  backdropColor: l,
  onTapBackdrop: c,
  backfaceVisible: u,
  exitBackfaceVisible: f,
  animation: d,
  exitAnimation: m,
  instant: y,
  initialProps: b,
  exitProps: S,
  position: h = { top: 0, right: 0, bottom: 0, left: 0 },
  withMagicMotion: v,
  index: g,
  areMagicMotionLayersPresent: x,
  id: k,
  isInitial: w,
}) {
  let E = Ug(),
    C = O(mi),
    { persistLayoutIdCache: I } = O(ao),
    T = B({
      wasCurrent: void 0,
      wasPrevious: !1,
      wasBeingRemoved: !1,
      wasReset: !0,
      origins: e1({}, b, a),
    }),
    z = B(null),
    A = C !== null && !C.isPresent;
  (n && T.current.wasCurrent === void 0 && I(),
    X(() => {
      if (t || !E) return;
      if (A) {
        T.current = { ...T.current, wasBeingRemoved: A };
        return;
      }
      let { wasPrevious: Q, wasCurrent: Z } = T.current,
        ze = (n && !Z) || (!A && T.current.wasBeingRemoved && n),
        Xe = r && !Q,
        He = e1(T.current.origins, b, a),
        Ge = T.current.wasReset;
      (ze || Xe
        ? (E.stop(), E.start({ zIndex: g, ...He, ...a }), (Ge = !1))
        : Ge === !1 && (E.stop(), E.set({ zIndex: g, ...Jr, opacity: 0 }), (Ge = !0)),
        (T.current = {
          wasCurrent: !!n,
          wasPrevious: !!r,
          wasBeingRemoved: !1,
          wasReset: Ge,
          origins: He,
        }));
    }, [n, r, A]));
  let H = y ? { type: !1 } : "velocity" in d ? { ...d, velocity: 0 } : d,
    L = y ? { type: !1 } : m || d,
    M = { ...h };
  ((M.left === void 0 || M.right === void 0) && (M.width = "auto"),
    (M.top === void 0 || M.bottom === void 0) && (M.height = "auto"));
  let P = (t1(a) || t1(b)) && (t || n || r) ? 1200 : void 0,
    j = { ...Jr, ...T.current.origins },
    K = t
      ? {
          initial: { ...j, ...b },
          animate: { ...j, ...a, transition: H },
          exit: { ...j, ...S, transition: d },
        }
      : { animate: E, exit: { ...j, ...S, transition: L } },
    N = !(A || x === !1),
    $ = !!n && N,
    ie = n && w;
  return p.createElement(
    pc,
    {
      "data-framer-component-type": "NavigationContainerWrapper",
      width: "100%",
      height: "100%",
      style: {
        position: "absolute",
        transformStyle: "flat",
        backgroundColor: "transparent",
        overflow: "hidden",
        zIndex: t || A || (n && v) ? g : void 0,
        pointerEvents: void 0,
        visibility: o ? "visible" : "hidden",
        perspective: P,
      },
    },
    t &&
      p.createElement(pc, {
        width: "100%",
        height: "100%",
        "data-framer-component-type": "NavigationContainerBackdrop",
        transition: d,
        initial: { opacity: y && o ? 1 : 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        backgroundColor: l || "transparent",
        onTap: A ? void 0 : c,
      }),
    p.createElement(
      pc,
      {
        ...M,
        ...K,
        transition: {
          default: H,
          originX: { type: !1 },
          originY: { type: !1 },
          originZ: { type: !1 },
        },
        backgroundColor: "transparent",
        backfaceVisible: A ? f : u,
        "data-framer-component-type": "NavigationContainer",
        "data-framer-is-current-navigation-target": !!n,
        style: { pointerEvents: void 0, opacity: ie || t || (n && v) ? 1 : 0 },
        "data-is-present": N ? void 0 : !1,
        ref: z,
      },
      p.createElement(
        cO.Provider,
        { value: z },
        p.createElement(
          CO.Provider,
          { value: $ },
          p.createElement(
            IO,
            { isCurrent: $, isOverlayed: i },
            p.createElement(
              kO,
              {
                isLead: n,
                animatesLayout: !!v,
                transition: H,
                isExiting: !N,
                isOverlayed: i,
                id: k,
              },
              s
            )
          )
        )
      )
    )
  );
}, RO);
function RO(e, t) {
  return !(
    t.isCurrent === void 0 ||
    e.isCurrent !== t.isCurrent ||
    e.isPrevious !== t.isPrevious ||
    (t.isCurrent && e.isOverlayed !== t.isOverlayed)
  );
}
function e1(e, t, n) {
  let r = { ...e };
  return (
    t &&
      (Y(t.originX) && (r.originX = t.originX),
      Y(t.originY) && (r.originY = t.originY),
      Y(t.originZ) && (r.originZ = t.originZ)),
    n &&
      (Y(n.originX) && (r.originX = n.originX),
      Y(n.originY) && (r.originY = n.originY),
      Y(n.originZ) && (r.originZ = n.originZ)),
    r
  );
}
function t1(e) {
  var t, n, r;
  if (!e || !("rotateX" in e || "rotateY" in e || "z" in e)) return !1;
  let o = e.rotateX !== 0 || e.rotateY !== 0 || e.z !== 0,
    a =
      ((t = e?.transition) == null ? void 0 : t.rotateX.from) !== 0 ||
      ((n = e?.transition) == null ? void 0 : n.rotateY.from) !== 0 ||
      ((r = e?.transition) == null ? void 0 : r.z.from) !== 0;
  return o || a;
}
var Jr = {
    x: 0,
    y: 0,
    z: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    skew: 0,
    skewX: 0,
    skewY: 0,
    originX: 0.5,
    originY: 0.5,
    originZ: 0,
    opacity: 1,
  },
  PO = class {
    constructor() {
      (R(this, "warning", () => {
        Ba("The Navigator API is only available inside of Framer: https://www.framer.com/");
      }),
        R(this, "goBack", () => this.warning()),
        R(this, "instant", () => this.warning()),
        R(this, "fade", () => this.warning()),
        R(this, "push", () => this.warning()),
        R(this, "modal", () => this.warning()),
        R(this, "overlay", () => this.warning()),
        R(this, "flip", () => this.warning()),
        R(this, "customTransition", () => this.warning()),
        R(this, "magicMotion", () => this.warning()));
    }
  },
  _O = new PO(),
  OS = he(_O),
  Be = {
    Fade: { exit: { opacity: 0 }, enter: { opacity: 0 } },
    PushLeft: { exit: { x: "-30%" }, enter: { x: "100%" } },
    PushRight: { exit: { x: "30%" }, enter: { x: "-100%" } },
    PushUp: { exit: { y: "-30%" }, enter: { y: "100%" } },
    PushDown: { exit: { y: "30%" }, enter: { y: "-100%" } },
    Instant: { animation: { type: !1 }, enter: { opacity: 0 } },
    Modal: {
      overCurrentContext: !0,
      goBackOnTapOutside: !0,
      position: { center: !0 },
      enter: { opacity: 0, scale: 1.2 },
    },
    OverlayLeft: {
      overCurrentContext: !0,
      goBackOnTapOutside: !0,
      position: { right: 0, top: 0, bottom: 0 },
      enter: { x: "100%" },
    },
    OverlayRight: {
      overCurrentContext: !0,
      goBackOnTapOutside: !0,
      position: { left: 0, top: 0, bottom: 0 },
      enter: { x: "-100%" },
    },
    OverlayUp: {
      overCurrentContext: !0,
      goBackOnTapOutside: !0,
      position: { bottom: 0, left: 0, right: 0 },
      enter: { y: "100%" },
    },
    OverlayDown: {
      overCurrentContext: !0,
      goBackOnTapOutside: !0,
      position: { top: 0, left: 0, right: 0 },
      enter: { y: "-100%" },
    },
    FlipLeft: { backfaceVisible: !1, exit: { rotateY: -180 }, enter: { rotateY: 180 } },
    FlipRight: { backfaceVisible: !1, exit: { rotateY: 180 }, enter: { rotateY: -180 } },
    FlipUp: { backfaceVisible: !1, exit: { rotateX: 180 }, enter: { rotateX: -180 } },
    FlipDown: { backfaceVisible: !1, exit: { rotateX: -180 }, enter: { rotateX: 180 } },
    MagicMotion: { withMagicMotion: !0 },
  };
function FO(e) {
  switch (e && e.appearsFrom ? e.appearsFrom : "right") {
    case "right":
      return Be.PushLeft;
    case "left":
      return Be.PushRight;
    case "bottom":
      return Be.PushUp;
    case "top":
      return Be.PushDown;
  }
}
function LO(e) {
  switch (e && e.appearsFrom ? e.appearsFrom : "bottom") {
    case "right":
      return Be.OverlayLeft;
    case "left":
      return Be.OverlayRight;
    case "bottom":
      return Be.OverlayUp;
    case "top":
      return Be.OverlayDown;
  }
}
function MO(e) {
  switch (e && e.appearsFrom ? e.appearsFrom : "bottom") {
    case "right":
      return Be.FlipLeft;
    case "left":
      return Be.FlipRight;
    case "bottom":
      return Be.FlipUp;
    case "top":
      return Be.FlipDown;
  }
}
var OO = () => ({
  current: -1,
  previous: -1,
  currentOverlay: -1,
  previousOverlay: -1,
  visualIndex: 0,
  overlayItemId: 0,
  historyItemId: 0,
  history: [],
  overlayStack: [],
  containers: {},
  containerIndex: {},
  containerVisualIndex: {},
  containerIsRemoved: {},
  transitionForContainer: {},
  previousTransition: null,
});
function n1(e, t) {
  switch (t.type) {
    case "addOverlay":
      return AO(e, t.transition, t.component);
    case "removeOverlay":
      return DO(e);
    case "add":
      return VS(e, t.key, t.transition, t.component);
    case "remove":
      return AS(e);
    case "update":
      return VO(e, t.key, t.component);
    case "back":
      return BO(e);
    case "forward":
      return zO(e);
    default:
      return;
  }
}
function VO(e, t, n) {
  return { ...e, containers: { ...e.containers, [t]: n } };
}
function AO(e, t, n) {
  let r = e.overlayStack[e.currentOverlay];
  if (r && r.component === n) return;
  let i = e.overlayItemId + 1,
    o = [...e.overlayStack, { key: `stack-${i}`, component: n, transition: t }];
  return {
    ...e,
    overlayStack: o,
    overlayItemId: i,
    currentOverlay: Math.max(0, Math.min(e.currentOverlay + 1, o.length - 1)),
    previousOverlay: e.currentOverlay,
  };
}
function DO(e) {
  return { ...e, overlayStack: [], currentOverlay: -1, previousOverlay: e.currentOverlay };
}
function VS(e, t, n, r) {
  (e.containers[t] || (e.containers[t] = r),
    (e.history = e.history.slice(0, e.current + 1)),
    (e.visualIndex = Math.max(e.history.length, 0)));
  let i = e.history[e.history.length - 1],
    o = i && i.key === t;
  if (((e.overlayStack = []), o && e.currentOverlay > -1))
    return { ...e, currentOverlay: -1, previousOverlay: e.currentOverlay };
  if (o) return;
  let a = e.containerVisualIndex[t],
    s = e.containerIsRemoved[t],
    l = i?.key && n.withMagicMotion ? WO(t, a, s, e.history) : !0;
  e.history.push({
    key: t,
    transition: n,
    visualIndex: l ? Math.max(e.visualIndex, 0) : e.containerVisualIndex[t],
  });
  let c = e.current + 1,
    u = e.current;
  for (let y in e.containerIndex)
    e.containerIndex[y] === c && (e.containerIndex[y] = $O(y, e.history));
  e.containerIndex[t] = c;
  let { containerVisualIndex: f, containerIsRemoved: d } = HO(e, t, l),
    m = DS(c, u, e.history, e.containerIndex, e.transitionForContainer);
  return {
    ...e,
    current: c,
    previous: u,
    containerVisualIndex: f,
    containerIsRemoved: d,
    transitionForContainer: m,
    previousTransition: null,
    currentOverlay: -1,
    historyItemId: e.historyItemId + 1,
    previousOverlay: e.currentOverlay,
  };
}
function BO(e) {
  let t = { ...e.containers },
    n = AS(e);
  if (n) return ((n.containers = t), n);
}
function zO(e) {
  let t = e.history[e.current + 1];
  if (!t) return;
  let { key: n, transition: r, component: i } = t,
    o = [...e.history],
    a = VS(e, n, r, i);
  if (a) return ((a.history = o), a);
}
function AS(e) {
  let t = [...e.history.slice(0, e.current + 1)];
  if (t.length === 1) return;
  let n = t.pop();
  if (!n) return;
  let r = t[t.length - 1];
  (Oe(r, "The navigation history must have at least one component"),
    (e.containerIndex[r.key] = t.length - 1),
    t.every((d) => d.key !== n.key) && delete e.containers[n.key]);
  let o = e.current - 1,
    a = e.current,
    {
      containerIsRemoved: s,
      containerVisualIndex: l,
      previousTransition: c,
      visualIndex: u,
    } = NO(e, r, n),
    f = DS(o, a, e.history, e.containerIndex, e.transitionForContainer);
  return {
    ...e,
    current: o,
    previous: a,
    containerIsRemoved: s,
    containerVisualIndex: l,
    previousTransition: c,
    visualIndex: u,
    transitionForContainer: f,
  };
}
function HO(e, t, n) {
  let r = {
    containerVisualIndex: { ...e.containerVisualIndex },
    containerIsRemoved: { ...e.containerIsRemoved },
  };
  if (n) ((r.containerVisualIndex[t] = e.history.length - 1), (r.containerIsRemoved[t] = !1));
  else {
    let i = e.containerVisualIndex[t];
    for (let [o, a] of Object.entries(e.containerVisualIndex))
      i !== void 0 && a > i && (r.containerIsRemoved[o] = !0);
  }
  return r;
}
function NO(e, t, n) {
  let r = [t.key, n.key],
    i = e.history[e.history.length - 2],
    o = e.previousTransition === null ? null : { ...e.previousTransition },
    a = {
      containerIsRemoved: { ...e.containerIsRemoved },
      containerVisualIndex: { ...e.containerVisualIndex },
      previousTransition: o,
      visualIndex: e.visualIndex,
    };
  i && r.push(i.key);
  let s = e.containerVisualIndex[t.key],
    l = e.containerVisualIndex[n.key],
    c =
      (s !== void 0 && l !== void 0 && s <= l) ||
      (t.visualIndex !== void 0 && t.visualIndex < e.history.length - 1),
    u = t.visualIndex;
  return (
    c
      ? ((a.containerIsRemoved[n.key] = !0),
        (a.containerVisualIndex[t.key] = u !== void 0 ? u : e.history.length - 1))
      : ((a.visualIndex = e.visualIndex + 1), (a.containerVisualIndex[t.key] = e.visualIndex + 1)),
    n.transition.withMagicMotion && (a.previousTransition = n.transition || null),
    (e.containerIsRemoved[t.key] = !1),
    a
  );
}
function $O(e, t) {
  var n;
  for (let r = t.length; r > t.length; r--)
    if (((n = t[r]) == null ? void 0 : n.key) === e) return r;
  return -1;
}
function DS(e, t, n, r, i) {
  let o = { ...i };
  for (let [a, s] of Object.entries(r)) {
    let l = UO(s, { current: e, previous: t, history: n });
    l && (o[a] = l);
  }
  return o;
}
function WO(e, t, n, r) {
  return n || t === void 0
    ? !0
    : t === 0
      ? !1
      : r.slice(t, r.length).findIndex((a) => a.key === e) > -1
        ? !0
        : !(r.slice(0, t - 1).findIndex((a) => a.key === e) > -1);
}
function UO(e, t) {
  let { current: n, previous: r, history: i } = t;
  if (!(e !== n && e !== r)) {
    if (e === n && n > r) {
      let o = i[e];
      return sc("enter", o?.transition.enter, o?.transition.animation);
    }
    if (e === r && n > r) {
      let o = i[e + 1];
      return sc("exit", o?.transition.exit, o?.transition.animation);
    }
    if (e === n && n < r) {
      let o = i[e + 1];
      return sc("enter", o?.transition.exit, o?.transition.animation);
    }
    if (e === r && n < r) {
      let o = i[e];
      return sc("exit", o?.transition.enter, o?.transition.animation);
    }
  }
}
var jO = ii(Jr);
function sc(e, t, n) {
  let r = {},
    i = {};
  return (
    jO.forEach((o) => {
      ((r[o] = Jr[o]), (i[o] = { ...n, from: Jr[o] }));
    }),
    t &&
      Object.keys(t).forEach((o) => {
        if (t[o] === void 0) return;
        let a = t[o],
          s = typeof t[o] == "string" ? `${Re(Jr)[o]}%` : Re(Jr)[o];
        ((Re(r)[o] = e === "enter" ? s : a),
          (i[o] = { ...n, from: e === "enter" ? a : s, velocity: 0 }));
      }),
    { ...r, transition: { ...i } }
  );
}
var b5 = OS.Consumer,
  BS = p.createContext(void 0),
  x5 = BS.Provider,
  zS = p.createContext(void 0),
  hp = class extends ke {
    constructor(e) {
      var t;
      (super(e),
        R(this, "lastEventTimeStamp", null),
        R(this, "state", OO()),
        R(this, "navigationAction", (s) => {
          if (!this.props.enabled && this.state.history.length > 0) return;
          let l = n1(this.state, s);
          if (!l) return;
          let { skipLayoutAnimation: c } = this.props,
            u = l.history[l.current],
            f =
              (s.type === "add" && s.transition.withMagicMotion) ||
              (s.type === "forward" && u?.transition.withMagicMotion) ||
              (s.type === "remove" && !!l.previousTransition),
            d = () => {
              var m;
              (this.setState(l), u?.key && ((m = this.context) == null || m.call(this, u.key)));
            };
          c && !f ? c(d) : d();
        }),
        R(this, "goBack", () => {
          var s;
          if (!this.isSameEventTransition())
            return (
              (this.lastEventTimeStamp =
                ((s = globalThis.event) == null ? void 0 : s.timeStamp) || null),
              this.state.currentOverlay !== -1
                ? this.navigationAction({ type: "removeOverlay" })
                : this.navigationAction({ type: "remove" })
            );
        }));
      let n = this.props.children;
      if (!n || !io(n) || !ro(n)) return;
      let r = { ...Be.Instant },
        o = {
          type: "add",
          key:
            ((t = n.key) == null ? void 0 : t.toString()) ||
            `stack-${this.state.historyItemId + 1}`,
          transition: r,
          component: n,
        },
        a = n1(this.state, o);
      a && (this.state = a);
    }
    componentDidMount() {
      var e;
      let t = this.state.history[this.state.current];
      t && ((e = this.context) == null || e.call(this, t.key));
    }
    UNSAFE_componentWillReceiveProps(e) {
      var t;
      let n = e.children;
      if (!io(n) || !ro(n)) return;
      let r = (t = n.key) == null ? void 0 : t.toString();
      r &&
        (this.state.history.length === 0
          ? this.transition(n, Be.Instant)
          : this.navigationAction({ type: "update", key: r, component: n }));
    }
    componentWillUnmount() {
      var e, t;
      (t = (e = this.props).resetProjection) == null || t.call(e);
    }
    getStackState(e) {
      let { current: t, previous: n, currentOverlay: r, previousOverlay: i } = this.state;
      return e.overCurrentContext
        ? { current: r, previous: i, history: this.state.overlayStack }
        : { current: t, previous: n, history: this.state.history };
    }
    isSameEventTransition() {
      return globalThis.event ? this.lastEventTimeStamp === globalThis.event.timeStamp : !1;
    }
    transition(e, t, n) {
      var r, i;
      if (
        this.isSameEventTransition() ||
        ((this.lastEventTimeStamp =
          ((r = globalThis.event) == null ? void 0 : r.timeStamp) || null),
        !e || !io(e) || !ro(e))
      )
        return;
      let o = { ...t, ...n };
      if (!!o.overCurrentContext)
        return this.navigationAction({ type: "addOverlay", transition: o, component: e });
      let s =
        ((i = e.key) == null ? void 0 : i.toString()) || `stack-${this.state.historyItemId + 1}`;
      this.navigationAction({ type: "add", key: s, transition: o, component: e });
    }
    instant(e) {
      this.transition(e, Be.Instant, void 0);
    }
    fade(e, t) {
      this.transition(e, Be.Fade, t);
    }
    push(e, t) {
      this.transition(e, FO(t), t);
    }
    modal(e, t) {
      this.transition(e, Be.Modal, t);
    }
    overlay(e, t) {
      this.transition(e, LO(t), t);
    }
    flip(e, t) {
      this.transition(e, MO(t), t);
    }
    magicMotion(e, t) {
      this.transition(e, Be.MagicMotion, t);
    }
    customTransition(e, t) {
      this.transition(e, t);
    }
    render() {
      var e, t, n, r, i;
      let o = this.getStackState({ overCurrentContext: !1 }),
        a = this.getStackState({ overCurrentContext: !0 }),
        s = XO(a),
        l = a.current > -1,
        c = this.state.history.length === 1,
        u = [];
      for (let [d, m] of Object.entries(this.state.containers)) {
        let y = this.state.containerIndex[d];
        Oe(y !== void 0, "Container's index must be registered");
        let b = this.state.containerVisualIndex[d];
        Oe(b !== void 0, "Container's visual index must be registered");
        let S = this.state.containerIsRemoved[d],
          h = this.state.history[y],
          v = this.state.transitionForContainer[d],
          g = y === this.state.current,
          x = y === this.state.previous,
          k = g ? !1 : S,
          w =
            ((e = h?.transition) == null ? void 0 : e.withMagicMotion) ||
            (g && !!this.state.previousTransition);
        u.push(
          p.createElement(
            Mh,
            {
              key: d,
              id: d,
              index: b,
              isInitial: c,
              isCurrent: g,
              isPrevious: x,
              isOverlayed: l,
              visible: g || x,
              position: (t = h?.transition) == null ? void 0 : t.position,
              instant: i1(y, o),
              transitionProps: v,
              animation: r1(y, o),
              backfaceVisible: JO(y, o),
              exitAnimation: (n = h?.transition) == null ? void 0 : n.animation,
              exitBackfaceVisible: (r = h?.transition) == null ? void 0 : r.backfaceVisible,
              exitProps: (i = h?.transition) == null ? void 0 : i.enter,
              withMagicMotion: w,
              areMagicMotionLayersPresent: k ? !1 : void 0,
            },
            p.createElement(iO, null, o1({ component: m, transition: h?.transition }))
          )
        );
      }
      let f = this.state.overlayStack.map((d, m) =>
        p.createElement(
          Mh,
          {
            isLayeredContainer: !0,
            key: d.key,
            isCurrent: m === this.state.currentOverlay,
            position: d.transition.position,
            initialProps: ZO(m, a),
            transitionProps: eV(m, a),
            instant: i1(m, a, !0),
            animation: r1(m, a),
            exitProps: d.transition.enter,
            visible: tV(m, a),
            backdropColor: qO(d.transition),
            backfaceVisible: QO(m, a),
            onTapBackdrop: nV(d.transition, this.goBack),
            index: this.state.current + 1 + m,
          },
          o1({ component: d.component, transition: d.transition })
        )
      );
      return p.createElement(
        pc,
        {
          "data-framer-component-type": "NavigationRoot",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "relative",
          style: {
            overflow: "hidden",
            backgroundColor: "unset",
            pointerEvents: void 0,
            ...this.props.style,
          },
        },
        p.createElement(
          OS.Provider,
          { value: this },
          p.createElement(
            zS.Provider,
            { value: c },
            p.createElement(
              Mh,
              {
                isLayeredContainer: !0,
                position: void 0,
                initialProps: {},
                instant: !1,
                transitionProps: GO(s),
                animation: YO(s),
                backfaceVisible: KO(s),
                visible: !0,
                backdropColor: void 0,
                onTapBackdrop: void 0,
                index: 0,
              },
              p.createElement(
                ZF,
                null,
                p.createElement(nO, null, p.createElement(rf, { presenceAffectsLayout: !1 }, u))
              )
            ),
            p.createElement(rf, null, f)
          )
        )
      );
    }
  };
R(hp, "defaultProps", { enabled: !0 });
R(hp, "contextType", BS);
var HS = { stiffness: 500, damping: 50, restDelta: 1, type: "spring" };
function XO(e) {
  let t, n;
  return (
    e.current !== -1 ? (t = e.history[e.current]) : (n = e.history[e.previous]),
    { currentOverlayItem: t, previousOverlayItem: n }
  );
}
function GO({ currentOverlayItem: e }) {
  return e && e.transition.exit;
}
function YO({ currentOverlayItem: e, previousOverlayItem: t }) {
  return e && e.transition.animation
    ? e.transition.animation
    : t && t.transition.animation
      ? t.transition.animation
      : HS;
}
function KO({ currentOverlayItem: e, previousOverlayItem: t }) {
  return e ? e.transition.backfaceVisible : t && t.transition.backfaceVisible;
}
function qO(e) {
  if (e.backdropColor) return e.backdropColor;
  if (e.overCurrentContext) return "rgba(4,4,15,.4)";
}
function QO(e, t) {
  let { current: n, history: r } = t;
  if (e === n) {
    let i = r[e];
    return i && i.transition ? i.transition.backfaceVisible : !0;
  } else if (e < n) {
    let i = r[e + 1];
    return i && i.transition ? i.transition.backfaceVisible : !0;
  } else {
    let i = r[e];
    return i && i.transition ? i.transition.backfaceVisible : !0;
  }
}
function ZO(e, t) {
  let n = t.history[e];
  if (n) return n.transition.enter;
}
function JO(e, t) {
  var n, r, i, o;
  let { current: a, previous: s, history: l } = t;
  return (e === s && a > s) || (e === a && a < s)
    ? (r = (n = l[e + 1]) == null ? void 0 : n.transition) == null
      ? void 0
      : r.backfaceVisible
    : (o = (i = l[e]) == null ? void 0 : i.transition) == null
      ? void 0
      : o.backfaceVisible;
}
function eV(e, t) {
  let { current: n, history: r } = t;
  if (e !== n)
    if (e < n) {
      let i = r[e + 1];
      if (i && i.transition) return i.transition.exit;
    } else {
      let i = r[e];
      if (i && i.transition) return i.transition.enter;
    }
}
function r1(e, t) {
  let { current: n, previous: r, history: i } = t,
    o = r > n ? r : n;
  if (e < o) {
    let a = i[e + 1];
    if (a && a.transition.animation) return a.transition.animation;
  } else if (e !== o) {
    let a = i[e];
    if (a && a.transition.animation) return a.transition.animation;
  } else {
    let a = i[e];
    if (a?.transition.animation) return a.transition.animation;
  }
  return HS;
}
function i1(e, t, n) {
  let { current: r, previous: i, history: o } = t;
  return !!((n && o.length > 1) || (e !== i && e !== r) || r === i);
}
function tV(e, t) {
  let { current: n, previous: r } = t;
  return e > n && e > r ? !1 : e === n;
}
function o1(e) {
  return p.Children.map(e.component, (n) => {
    var r, i;
    if (!io(n) || !ro(n) || !n.props) return n;
    let o = { style: (r = n.props.style) != null ? r : {} },
      a = (i = e?.transition) == null ? void 0 : i.position,
      s = !a || (a.left !== void 0 && a.right !== void 0),
      l = !a || (a.top !== void 0 && a.bottom !== void 0),
      c = "style" in n.props ? it(n.props.style) : !0;
    return (
      s && ("width" in n.props && (o.width = "100%"), c && (o.style.width = "100%")),
      l && ("height" in n.props && (o.height = "100%"), c && (o.style.height = "100%")),
      p.cloneElement(n, o)
    );
  });
}
function nV(e, t) {
  if (e.goBackOnTapOutside !== !1) return t;
}
function rV() {
  return (
    p.useInsertionEffect(() => {
      Xa();
    }, []),
    null
  );
}
function iV(e) {
  let t = Yg(),
    n = sf();
  return p.createElement(
    hp,
    { ...e, resetProjection: t, skipLayoutAnimation: n },
    e.children,
    p.createElement(rV, null)
  );
}
var S5 = jt(Ic(), 1);
var k5 = jt(Zh(), 1);
var P5 = !!(aS() && FL() < 15.4);
function pp(...e) {
  return e.filter(Boolean).join(" ");
}
var oV = {};
Object.freeze(oV);
var z5 = (4 / 60) * 1e3;
var aV = (() => {
    function e(t = {}) {
      let n = Lh(t, !1, !1);
      return (e.addData(n), n);
    }
    return (
      (e._stores = []),
      (e.addData = (t) => {
        e._stores.push(t);
      }),
      (e.reset = () => {
        e._stores.forEach((t) => Lh.resetObject(t));
      }),
      (e.addObserver = (t, n) => Lh.addObserver(t, n)),
      e
    );
  })(),
  Oh = aV;
var sV = { update: 0 },
  lV = p.createContext({ update: NaN });
var cV = class extends ke {
    constructor() {
      (super(...arguments),
        R(this, "observers", []),
        R(this, "state", sV),
        R(this, "taskAdded", !1),
        R(this, "frameTask", () => {
          (this.setState({ update: this.state.update + 1 }), (this.taskAdded = !1));
        }),
        R(this, "observer", () => {
          this.taskAdded || ((this.taskAdded = !0), Z1.addFrameTask(this.frameTask));
        }));
    }
    componentWillUnmount() {
      (this.observers.map((e) => e()), Oh.reset());
    }
    render() {
      let { children: e } = this.props;
      return (
        this.observers.map((t) => t()),
        (this.observers = []),
        Oh._stores.forEach((t) => {
          let n = Oh.addObserver(t, this.observer);
          this.observers.push(n);
        }),
        p.createElement(lV.Provider, { value: { ...this.state } }, e)
      );
    }
  },
  W5 = jt(Ic(), 1);
var NS = "__framer__",
  uV = NS.length;
function fV(e) {
  if (e.startsWith(NS)) return e.substr(uV);
}
var gn = ["opacity", "x", "y", "scale", "rotate", "rotateX", "rotateY", "transformPerspective"],
  Cc = (e) => {
    var t, n, r, i, o, a, s, l;
    return {
      x: pe((t = e?.x) != null ? t : 0),
      y: pe((n = e?.y) != null ? n : 0),
      opacity: pe((r = e?.opacity) != null ? r : 1),
      scale: pe((i = e?.scale) != null ? i : 1),
      rotate: pe((o = e?.rotate) != null ? o : 0),
      rotateX: pe((a = e?.rotateX) != null ? a : 0),
      rotateY: pe((s = e?.rotateY) != null ? s : 0),
      transformPerspective: pe((l = e?.transformPerspective) != null ? l : 0),
    };
  },
  De = {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    transformPerspective: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
  };
function $S(e, t) {
  let n = Mt(() => ({ values: Cc(t ? e : void 0) }));
  return (
    p.useEffect(() => {
      if (!t)
        for (let r of gn) {
          let i = De[r];
          so(i) || n.values[r].set(i);
        }
    }, [n, t]),
    n
  );
}
var dV = new Set([
    "loopEffectEnabled",
    "loopTransition",
    "loop",
    "loopRepeatType",
    "loopRepeatDelay",
  ]),
  hV = () => {
    let e = B();
    return (
      X(
        () => () => {
          clearTimeout(e.current);
        },
        []
      ),
      async (t) =>
        new Promise((n) => {
          e.current = setTimeout(() => {
            n(!0);
          }, t * 1e3);
        })
    );
  };
function pV({
  loopEffectEnabled: e,
  loopRepeatDelay: t,
  loopTransition: n,
  loopRepeatType: r,
  loop: i,
}) {
  let o = Dr(),
    a = Mt(() => ({ values: Cc() })),
    s = p.useRef(!1),
    l = hV(),
    c = async () => {
      if (!i) return;
      let d = n || void 0,
        m = s.current && r === "mirror",
        y = m ? De : i,
        b = m ? i : De;
      return (
        (s.current = !s.current),
        Promise.all(
          gn.map((S) => {
            var h;
            if (!(o && S !== "opacity"))
              return (
                a.values[S].set((h = b[S]) != null ? h : De[S]),
                new Promise((v) => {
                  var g;
                  let x = { ...d, onComplete: () => v() };
                  xi(a.values[S], (g = y[S]) != null ? g : b[S], x);
                })
              );
          })
        )
      );
    },
    u = async () => {
      e && (await c(), await l(t ?? 0), await u());
    },
    f = ae(() => {
      (gn.forEach((d) => {
        a.values[d].stop();
      }),
        gn.forEach((d) => {
          a.values[d].set(De[d]);
        }),
        (s.current = !1));
    }, [a]);
  return (p.useEffect(() => (e && i ? u() : f(), () => f()), [e]), a);
}
function mV(e, t, n, r, i) {
  let o = n / 100 - 1,
    a = i ? (t - r) * o : 0,
    s = -e * o;
  return a + s;
}
var vV = new Set(["speed", "adjustPosition", "offset", "parallaxTransformEnabled"]);
function gV(e, t, n) {
  let { speed: r = 100, offset: i = 0, adjustPosition: o = !1, parallaxTransformEnabled: a } = e,
    s = p.useRef(null),
    l = Dr(),
    c = p.useCallback(
      (y) => (s.current === null || r === 100 ? 0 : mV(y, s.current, r, i, o)),
      [s, r, i, o]
    );
  p.useLayoutEffect(() => {
    (q.read(() => {
      var y, b, S;
      s.current =
        (S =
          (b = (y = t.current) == null ? void 0 : y.getBoundingClientRect()) == null
            ? void 0
            : b.top) != null
          ? S
          : 0;
    }),
      q.update(() => {
        (f.set(c(u.get())), o && d.set(n ?? "initial"));
      }));
  }, [t, s, o]);
  let { scrollY: u } = Ag(),
    f = kt(u, c),
    d = sn(o && s.current === null ? "hidden" : n),
    m = sn(0);
  return { values: { y: l || !a ? m : f }, style: a ? { visibility: d } : void 0 };
}
function yV(e) {
  if (!(Ie(e) || !it(e))) return e?.transition;
}
async function a1(e, t, n, r, i) {
  let o = yV(e);
  return Promise.all(
    gn.map(
      (a) =>
        new Promise((s) => {
          var l;
          if (n && a !== "opacity") return s();
          let c = t.values[a];
          c.stop();
          let u = it(e) && (l = e?.[a]) != null ? l : De[a];
          if ((me(u) && (u = u.get()), !zn(u))) return s();
          let f = jn.get(r.current);
          f && f.setBaseTarget(a, u);
          let d =
              Ie(i) && !c?.hasAnimated && Te.HandoffAppearAnimations
                ? { elapsed: Te.HandoffAppearAnimations(i, a, c, q) }
                : void 0,
            m = { ...o, velocity: 0, elapsed: 0, ...d, onComplete: () => s() };
          xi(c, u, m);
        })
    )
  );
}
var bV = new Set(["presenceInitial", "presenceAnimate", "presenceExit"]);
function xV(
  { initial: e, animate: t, exit: n, presenceInitial: r, presenceAnimate: i, presenceExit: o },
  a,
  s,
  l
) {
  let c = r ?? e,
    u = i ?? t,
    f = o ?? n,
    d = Mt(() => {
      var S;
      if (!it(c)) return { values: Cc() };
      let h = {};
      for (let v in c) {
        let g = it(c) ? ((S = Re(c)) == null ? void 0 : S[v]) : void 0;
        (me(g) && (g = g.get()), zn(g) && (h[v] = g));
      }
      return { values: Cc(h) };
    }),
    [m, y] = Ps(),
    b = Dr();
  return (
    Ir(() => {
      if (!s) {
        y?.();
        return;
      }
      m ? c && u && a1(u, d, b, a, l) : f ? a1(f, d, b, a).then(() => y()) : y();
    }, [m]),
    d
  );
}
function SV(e, t) {
  let n = 0,
    r = e;
  for (; r && r !== t && r instanceof HTMLElement;) ((n += r.offsetTop), (r = r.offsetParent));
  return n;
}
var wV = 1;
function WS(e, t = 0, n) {
  var r, i, o;
  let a = [],
    s = [];
  for (let l = e.length; l >= 0; l--) {
    let { ref: c, offset: u } = (r = e[l]) != null ? r : {};
    if (!c || !c.current) continue;
    let d = SV(c.current, document.documentElement) - wV - (u ?? 0) - t,
      m = (o = (i = c.current) == null ? void 0 : i.clientHeight) != null ? o : 0,
      y = a[a.length - 1],
      b = Math.max(d + m, 0);
    (a.push(d),
      s.unshift(Math.max(d, 0), y === void 0 ? b : Math.min(b, Math.max(y - 1, 0))),
      n?.(l));
  }
  return s;
}
function kV(e, t = 0) {
  return e < t ? "up" : "down";
}
var CV = 4;
function EV(e, t, n = {}) {
  let { direction: r, target: i } = e ?? {},
    { repeat: o = !0, enabled: a = !0 } = n;
  p.useEffect(() => {
    if (!r || !a) return;
    let s,
      l = 0,
      c,
      u;
    return bi(({ y: f }) => {
      if ((!o && u === i) || f.current > f.scrollLength || f.current < 0) return;
      let d = kV(f.current, s);
      s = f.current;
      let m = d !== c;
      if (((c = d), m)) l = f.current;
      else {
        if (Math.abs(f.current - l) < CV) return;
        let b = d === r ? i : void 0;
        (b !== u && t(b), (u = b));
      }
    });
  }, [r, o, i, a, t]);
}
var TV = new Set([
    "threshold",
    "animateOnce",
    "opacity",
    "targetOpacity",
    "x",
    "y",
    "scale",
    "transition",
    "rotate",
    "rotateX",
    "rotateY",
    "perspective",
    "enter",
    "exit",
    "animate",
    "styleAppearEffectEnabled",
    "targets",
    "scrollDirection",
  ]),
  IV = ["animate", "animate"],
  s1 = { inputRange: [], outputRange: [] };
function RV(e, t, n) {
  let r = WS(e, t),
    i = [...IV],
    o = r[0];
  if (!zn(o)) return s1;
  if ((o > 1 && (r.unshift(0, o - 1), i.unshift("initial", "initial")), n)) {
    let a = r.length - 1,
      s = r[a];
    if (!zn(s)) return s1;
    (r.push(s + 1), i.push("exit"));
  }
  return { inputRange: r, outputRange: i };
}
function Vh(e) {
  var t, n, r, i, o, a, s, l, c;
  return {
    x: (t = e?.x) != null ? t : De.x,
    y: (n = e?.y) != null ? n : De.y,
    scale: (r = e?.scale) != null ? r : De.scale,
    opacity: (i = e?.opacity) != null ? i : De.opacity,
    transformPerspective: (o = e?.transformPerspective) != null ? o : De.transformPerspective,
    rotate: (a = e?.rotate) != null ? a : De.rotate,
    rotateX: (s = e?.rotateX) != null ? s : De.rotateX,
    rotateY: (l = e?.rotateY) != null ? l : De.rotateY,
    transition: (c = e?.transition) != null ? c : void 0,
  };
}
function PV({ opacity: e, targetOpacity: t, perspective: n, enter: r, exit: i, animate: o, ...a }) {
  return p.useMemo(() => {
    var s;
    return {
      initial: r ?? Vh({ ...a, opacity: (s = e ?? t) != null ? s : 1, transformPerspective: n }),
      animate: o ?? Vh({ opacity: t }),
      exit: i ?? Vh(),
    };
  }, [o, a, r, i, e, t, n]);
}
function _V(e, t) {
  let n = Dr(),
    r = PV(e),
    i = e.styleAppearEffectEnabled,
    o = $S(i ? r.initial : r.animate, i),
    a = p.useRef({
      isPlaying: !1,
      scheduledAppearState: void 0,
      lastAppearState: !e.styleAppearEffectEnabled,
    }),
    s = p.useRef(),
    l = p.useCallback(async ({ transition: d, ...m }, y) => {
      var b;
      let S = (b = d ?? r.animate.transition) != null ? b : e.transition;
      (await s.current,
        (s.current = Promise.all(
          gn.map((h) => {
            var v, g;
            y && o.values[h].set((v = r.initial[h]) != null ? v : De[h]);
            let x = (g = m[h]) != null ? g : De[h],
              k = jn.get(t.current);
            return (
              k && typeof x != "object" && k.setBaseTarget(h, x),
              new Promise((w) => {
                if (n && h !== "opacity") w();
                else {
                  let E = {
                    restDelta: h === "scale" ? 0.001 : void 0,
                    ...S,
                    onComplete: () => w(),
                  };
                  xi(o.values[h], x, E);
                }
              })
            );
          })
        )));
    }, []),
    c = e.animateOnce && a.current.lastAppearState === !0,
    u = !e.targets && e.styleAppearEffectEnabled && !e.scrollDirection && !c;
  uO(
    t,
    (d) => {
      let { isPlaying: m, lastAppearState: y } = a.current;
      if (m) {
        a.current.scheduledAppearState = d;
        return;
      }
      ((a.current.scheduledAppearState = void 0),
        (a.current.lastAppearState = d),
        y !== d && l(d ? r.animate : r.exit, d));
    },
    { enabled: u, animateOnce: !!e.animateOnce, threshold: { y: e.threshold } }
  );
  let f = e.targets && i && !e.scrollDirection;
  return (
    p.useEffect(() => {
      if (!f) return;
      let d = { initial: !0 },
        m = "initial";
      return bi(({ y }) => {
        var b;
        let { targets: S } = e;
        if (!S || !S[0] || (S[0].ref && !S[0].ref.current)) return;
        let { inputRange: h, outputRange: v } = RV(
          S,
          ((b = e.threshold) != null ? b : 0) * y.containerLength,
          !!e.exit
        );
        if (h.length === 0 || h.length !== v.length) return;
        let g = Bo(y.current, h, v);
        if ((e.animateOnce && d[g]) || ((d[g] = !0), m === g)) return;
        m = g;
        let x = Re(r)[g];
        x && l(x);
      });
    }, [f]),
    EV(e.scrollDirection, (d) => l(d ?? r.animate), { enabled: i, repeat: !e.animateOnce }),
    o
  );
}
var FV = new Set([
    "transformViewportThreshold",
    "styleTransformEffectEnabled",
    "transformTargets",
    "spring",
    "transformTrigger",
  ]),
  LV = (e, t) => {
    var n, r;
    let i = (n = e?.[0]) == null ? void 0 : n.target;
    return t ? { opacity: (r = i?.opacity) != null ? r : 1 } : i;
  },
  US = () => ({
    opacity: [],
    x: [],
    y: [],
    scale: [],
    rotate: [],
    rotateX: [],
    rotateY: [],
    transformPerspective: [],
  });
function MV(e, t) {
  let n = p.useRef({});
  p.useEffect(() => {
    if (t !== void 0)
      for (let r of ii(e)) {
        let i = e[r];
        i.attach((o, a) => {
          let s = n.current[r];
          if (
            (s && s.stop(),
            (n.current[r] = Vr({
              keyframes: [i.get(), o],
              velocity: i.getVelocity(),
              ...t,
              restDelta: 0.001,
              onUpdate: a,
            })),
            !xe.isProcessing)
          ) {
            let l = performance.now() - xe.timestamp;
            l < 40 && (n.current[r].time = l / 1e3);
          }
          return i.get();
        });
      }
  }, [JSON.stringify(t)]);
}
function OV(e, t) {
  let n = US();
  return {
    inputRange: WS(e, t, (i) => {
      var o, a, s, l, c;
      let u = (o = e[i - 1]) == null ? void 0 : o.target,
        f = (a = e[i]) == null ? void 0 : a.target;
      for (let d of gn)
        (c = n[d]) == null || c.unshift((s = u?.[d]) != null ? s : 0, (l = f?.[d]) != null ? l : 0);
    }),
    effectKeyOutputRange: n,
  };
}
function VV(e) {
  var t;
  let n = US();
  for (let { target: r } of e) for (let i of gn) (t = n[i]) == null || t.push(r[i]);
  return n;
}
var l1 = [0, 1];
function AV(
  {
    transformTrigger: e,
    styleTransformEffectEnabled: t,
    transformTargets: n,
    spring: r,
    transformViewportThreshold: i = 0,
  },
  o
) {
  let a = Dr(),
    s = $S(LV(n, a), t);
  return (
    p.useLayoutEffect(() => {
      var l;
      if (!(!t || !n))
        if (e !== "onScrollTarget") {
          let c = VV(n);
          return bi(
            ({ y: u }) => {
              for (let f of gn)
                (a && f !== "opacity") ||
                  (l1.length === c[f].length && s.values[f].set(Bo(u.progress, l1, c[f])));
            },
            e === "onInView"
              ? { target: (l = o.current) != null ? l : void 0, offset: ["start end", "end end"] }
              : void 0
          );
        } else
          return bi(({ y: c }) => {
            if (!n[0] || (n[0].ref && !n[0].ref.current)) return;
            let { inputRange: u, effectKeyOutputRange: f } = OV(n, i * c.containerLength);
            if (u.length !== 0)
              for (let d of gn)
                (a && d !== "opacity") ||
                  (u.length === f[d].length && s.values[d].set(Bo(c.current, u, f[d])));
          });
    }, [a, e, o, i, t, s, n]),
    MV(s.values, r),
    s
  );
}
var jS = { parallax: vV, styleAppear: TV, styleTransform: FV, loop: dV, presence: bV },
  DV = ii(jS);
function c1(e, t, n) {
  return (!(e in n) && t in n) || n[e] === !0;
}
function BV(e) {
  let t = {
    parallax: {},
    styleAppear: {},
    styleTransform: {},
    presence: { animate: e.animate, initial: e.initial, exit: e.exit },
    loop: {},
    forwardedProps: {},
  };
  for (let n in e) {
    let r = fV(n);
    if (r)
      for (let i of DV) {
        let o = jS[i];
        if (o?.has(r)) {
          t[i][r] = Re(e)[n];
          break;
        }
      }
    else t.forwardedProps[n] = Re(e)[n];
  }
  return (
    (t.parallax.parallaxTransformEnabled = c1("parallaxTransformEnabled", "speed", t.parallax)),
    (t.styleAppear.styleAppearEffectEnabled = c1(
      "styleAppearEffectEnabled",
      "animateOnce",
      t.styleAppear
    )),
    t
  );
}
var qi = (e) => e.reduce((t, n) => (t += n), 0),
  u1 = (e) => e.reduce((t, n) => (t = t * n), 1),
  zV = "current";
function HV(e) {
  return it(e) && zV in e;
}
function NV(e, t) {
  if (!e || !it(e)) return t;
  for (let n in e) {
    let r = e[n];
    !me(r) || !$V(n) || (zn(r.get()) && t[n].push(r));
  }
}
function Fa(e) {
  return Ie(e) || Array.isArray(e);
}
function $V(e) {
  return e in De;
}
var J5 = (e) =>
  p.forwardRef((t, n) => {
    if (t.__withFX)
      return p.createElement(e, { ...t, animate: void 0, initial: void 0, exit: void 0, ref: n });
    if (we.current() === "CANVAS") {
      let $ = Fa(t.animate) ? t.animate : void 0,
        ie = Fa(t.initial) ? t.initial : void 0;
      return p.createElement(e, { ...t, animate: $, initial: ie, exit: void 0, ref: n });
    }
    let r = p.useRef(null),
      i = n ?? r,
      {
        parallax: o = {},
        styleAppear: a = {},
        styleTransform: s = {},
        presence: l = {},
        loop: c = {},
        forwardedProps: u,
      } = BV(t),
      { __targetOpacity: f, __perspectiveFX: d, __smartComponentFX: m = !1 } = t,
      y = sn(f ?? 1),
      { values: b } = xV(l, i, m, t[gs]),
      { values: S, style: h } = gV(o, i),
      { values: v } = AV(s, i),
      { values: g } = _V(a, i),
      { values: x } = pV(c),
      k = p.useMemo(
        () => ({
          scale: [g.scale, x.scale, b.scale, v.scale],
          opacity: [g.opacity, x.opacity, b.opacity, y, v.opacity],
          x: [g.x, x.x, b.x, v.x],
          y: [g.y, x.y, S.y, b.y, v.y],
          rotate: [g.rotate, x.rotate, b.rotate, v.rotate],
          rotateX: [g.rotateX, x.rotateX, b.rotateX, v.rotateX],
          rotateY: [g.rotateY, x.rotateY, b.rotateY, v.rotateY],
          transformPerspective: [v.transformPerspective, g.transformPerspective],
        }),
        [y, v, S, g, x, b]
      );
    NV(t.style, k);
    let w = kt(k.scale, u1),
      E = kt(k.opacity, u1),
      C = kt(k.x, qi),
      I = kt(k.y, qi),
      T = kt(k.rotate, qi),
      z = kt(k.rotateX, qi),
      A = kt(k.rotateY, qi),
      H = kt(k.transformPerspective, qi),
      { drag: L, dragConstraints: M } = u;
    xM(L && HV(M) ? M : void 0);
    let D = { opacity: E, scale: w, x: C, y: I, rotate: T, rotateX: z, rotateY: A };
    so(d) && (D.transformPerspective = H);
    let P = Fa(t.animate) ? t.animate : void 0,
      j = Fa(t.initial) ? t.initial : void 0,
      K = Fa(t.exit) ? t.exit : void 0,
      N = m && !l.presenceInitial ? { initial: j, animate: P, exit: K } : {};
    return p.createElement(e, {
      ...u,
      ...N,
      __withFX: !0,
      style: { ...t.style, ...h, ...D },
      values: b,
      ref: i,
    });
  });
var WV = (e) =>
    p.forwardRef((t, n) => {
      let r = Ga(t);
      return p.createElement(e, {
        layoutId: r,
        ...t,
        layoutIdKey: void 0,
        duplicatedFrom: void 0,
        ref: n,
      });
    }),
  UV = p.forwardRef(({ children: e, layoutId: t, ...n }, r) => {
    let i = Mt(() => (t ? `${t}-container` : void 0));
    return p.createElement(
      wt.div,
      { layoutId: i, ...n, ref: r },
      p.createElement(
        co.Provider,
        { value: !0 },
        p.createElement(
          e2,
          { enabled: !1 },
          p.createElement(
            Lg,
            { id: t ?? "", inherit: "id" },
            p.Children.map(e, (o) => (p.isValidElement(o) ? p.cloneElement(o, { layoutId: t }) : o))
          )
        )
      )
    );
  }),
  rz = WV(UV),
  jV = p.createContext(void 0);
if (Hn())
  for (let e of document.querySelectorAll("style[data-framer-css-ssr]"))
    document.head.appendChild(e);
var XV = (() => {
    var e;
    if (!Hn()) return new Set();
    let t =
      (e = document.querySelector("style[data-framer-css-ssr-minified]")) == null
        ? void 0
        : e.getAttribute("data-framer-components");
    return t ? new Set(t.split(" ")) : new Set();
  })(),
  XS = { "data-framer-css-ssr": !0 },
  GV = (e, t, n) =>
    p.forwardRef((r, i) => {
      var o;
      let { sheet: a, cache: s } = (o = p.useContext(jV)) != null ? o : {};
      if (!Hn()) {
        let l = Array.isArray(t)
          ? t.join(`
`)
          : t;
        return p.createElement(
          p.Fragment,
          null,
          p.createElement("style", {
            ...XS,
            "data-framer-component": n,
            dangerouslySetInnerHTML: { __html: l },
          }),
          p.createElement(e, { ...r, ref: i })
        );
      }
      return (
        p.useInsertionEffect(() => {
          if (n && XV.has(n)) return;
          (Array.isArray(t)
            ? t
            : t.split(`
`)
          ).forEach((c) => c && tS(c, a, s));
        }, []),
        p.createElement(e, { ...r, ref: i })
      );
    }),
  mp = p.createContext({ onRegisterCursors: () => () => {}, registerCursors: () => {} }),
  Ec = "framer-cursor-none",
  Gh = "framer-pointer-events-none",
  YV = p.memo(function ({ children: t }) {
    let n = Mt(() => {
        let i = new Set(),
          o = {};
        return {
          onRegisterCursors: (a) => (a(o), i.add(a), () => i.delete(a)),
          registerCursors: (a) => {
            var s;
            let l = {};
            for (let c in a) {
              let u = (s = o[c]) != null ? s : a[c];
              u && (l[c] = u);
            }
            o = l;
            for (let c of i) c(o);
          },
        };
      }),
      r = Dr();
    return p.createElement(mp.Provider, { value: n }, t, !r && p.createElement(eA, null));
  }),
  KV = GV(YV, [
    `.${Ec}, .${Ec} * { cursor: none !important; }`,
    `.${Gh}, .${Gh} * { pointer-events: none !important; }`,
  ]),
  qV = { position: "fixed", top: 0, left: 0, zIndex: 12 + 1, pointerEvents: "none" };
function QV(e) {
  return !(!e || e.placement || e.alignment);
}
function lc(e) {
  switch (e) {
    case "start":
      return "0%";
    case "center":
      return "-50%";
    case "end":
      return "-100%";
    default:
      St(e);
  }
}
function ZV(e, t = "center") {
  switch (e) {
    case "top":
      return `${lc(t)}, -100%`;
    case "right":
      return `0%, ${lc(t)}`;
    case "bottom":
      return `${lc(t)}, 0%`;
    case "left":
      return `-100%, ${lc(t)}`;
    default:
      return "-50%, -50%";
  }
}
var f1 = "data-framer-portal-id";
function d1(e, t) {
  var n;
  let r = document.elementFromPoint(e, t);
  for (; r;) {
    if (r === document.body) return;
    let i = r.getAttribute("data-framer-cursor");
    if (i) return i;
    if (r.hasAttribute(f1)) {
      let o = r.getAttribute(f1);
      ((r = r.parentElement), o && (r = (n = document.getElementById(o)) != null ? n : r));
    } else r = r.parentElement;
  }
}
function JV(e) {
  for (let t in e) return !1;
  return !0;
}
var eA = p.memo(function () {
  var t;
  let { onRegisterCursors: n } = O(mp),
    r = sn(0),
    i = sn(0),
    o = sn(0),
    a = p.useRef(null),
    s = p.useRef({ cursors: {}, cursorHash: void 0 }),
    l = Mc(),
    c = !JV(s.current.cursors);
  (p.useEffect(() => {
    let E = 0,
      C = 0;
    function I() {
      (r.set(E), i.set(C), xi(o, 1, { type: "tween", duration: 0.2 }));
    }
    function T(H) {
      H.pointerType !== "touch" && ((E = H.clientX), (C = H.clientY), q.update(I));
    }
    let z = () => {
      if (!c) return;
      let H = d1(E, C);
      H !== s.current.cursorHash && ((s.current.cursorHash = H), q.update(() => l()));
    };
    q.read(z, !0);
    function A(H) {
      if (H.target === a.current || !a.current) return;
      let L = new PointerEvent(H.type, {
        bubbles: !0,
        cancelable: H.cancelable,
        pointerType: H.pointerType,
        pointerId: H.pointerId,
        composed: H.composed,
        isPrimary: H.isPrimary,
        buttons: H.buttons,
        button: H.button,
      });
      q.update(() => {
        var M;
        (M = a.current) == null || M.dispatchEvent(L);
      });
    }
    return (
      Te.addEventListener("pointermove", T),
      document.addEventListener("pointerdown", A),
      document.addEventListener("pointerup", A),
      () => {
        (Te.removeEventListener("pointermove", T),
          document.removeEventListener("pointerdown", A),
          document.removeEventListener("pointerup", A),
          Qe(z));
      }
    );
  }, [o, r, i, c, l]),
    p.useEffect(() => {
      function E() {
        xi(o, 0, { type: "tween", duration: 0.2 });
      }
      return (
        document.addEventListener("mouseleave", E),
        Te.addEventListener("blur", E),
        () => {
          (document.removeEventListener("mouseleave", E), Te.removeEventListener("blur", E));
        }
      );
    }, [o]),
    p.useLayoutEffect(() => {
      function E(I) {
        ((s.current.cursors = I), (s.current.cursorHash = d1(r.get(), i.get())), l());
      }
      let C = n(E);
      return () => {
        (C(), document.body.classList.toggle(Ec, !1));
      };
    }, [r, i, n, l]));
  let { cursors: u, cursorHash: f } = s.current,
    d = f ? u[f] : null,
    m = QV(d);
  p.useLayoutEffect(() => {
    document.body.classList.toggle(Ec, m);
  }, [m]);
  let y = d?.component,
    b = (t = d?.transition) != null ? t : { duration: 0 },
    S = of(r, b),
    h = of(i, b),
    v = kt(() => {
      var E, C;
      return S.get() + ((C = (E = d?.offset) == null ? void 0 : E.x) != null ? C : 0);
    }),
    g = kt(() => {
      var E, C;
      return h.get() + ((C = (E = d?.offset) == null ? void 0 : E.y) != null ? C : 0);
    }),
    x = d?.alignment,
    k = d?.placement,
    w = p.useCallback((E, C) => `translate(${ZV(k, x)}) ${C}`, [x, k]);
  return !d || !y
    ? null
    : p.createElement(y, {
        transformTemplate: w,
        style: { ...qV, x: v, y: g, opacity: o },
        globalTapTarget: !0,
        variant: d?.variant,
        ref: a,
        className: Gh,
      });
});
function sz(e) {
  let { registerCursors: t } = O(mp),
    n = Mt(() => e);
  p.useLayoutEffect(() => {
    t(n);
  }, [n, t]);
}
function h1(e) {
  switch (e) {
    case "top":
      return "bottom";
    case "right":
      return "left";
    case "bottom":
      return "top";
    case "left":
      return "right";
    default:
      St(e);
  }
}
function p1(e, t, n, r = 0) {
  let i = Math.max(e, r);
  if (e < i) return i;
  let o = t + r;
  return i + o > n ? n - o : i;
}
function tA(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return t.y < 0 || t.y + t.height > n.height ? "y" : void 0;
    case "left":
    case "right":
      return t.x < 0 || t.x + t.width > n.width ? "x" : void 0;
    default:
      St(e);
  }
}
function nA(e, t, n, r) {
  switch (tA(t, e, r)) {
    case "x":
      return { placement: h1(t), x: n.x * -1, y: n.y };
    case "y":
      return { placement: h1(t), x: n.x, y: n.y * -1 };
    default:
      return { placement: t, x: n.x, y: n.y };
  }
}
function rA(e, t, n, r, i, o, a) {
  let s = Bn.rebaseRectOnto(t, e, n, r),
    l = { x: s.x + i.x, y: s.y + i.y, width: t.width, height: t.height };
  if (!o) return [n, l];
  let { x: c, y: u, placement: f } = nA(l, n, i, o),
    d = Bn.rebaseRectOnto(t, e, f, r);
  return [
    f,
    {
      x: p1(d.x + c, t.width, o.width, a),
      y: p1(d.y + u, t.height, o.height, a),
      width: t.width,
      height: t.height,
    },
  ];
}
function gr(e, t, n) {
  return ct.insidePoints(e, [t, ...n]) ? t : e;
}
var cc = 5;
function iA(e) {
  return {
    constrainX: (t) => Math.min(Math.max(t, e.x + cc), e.x + e.width - cc),
    constrainY: (t) => Math.min(Math.max(t, e.y + cc), e.y + e.height - cc),
  };
}
var uc = 4;
function oA({ x: e, y: t }, n, r, { constrainX: i, constrainY: o }) {
  let [a, s, l, c] = Bn.points(r);
  switch (n) {
    case "left": {
      let u = { x: i(e - uc), y: t };
      return [u, gr(c, s, [u, l]), gr(l, a, [u, c])];
    }
    case "right": {
      let u = { x: i(e + uc), y: t };
      return [u, gr(s, c, [u, a]), gr(a, l, [u, s])];
    }
    case "top": {
      let u = { x: e, y: o(t - uc) };
      return [u, gr(s, a, [u, c]), gr(c, l, [u, s])];
    }
    case "bottom": {
      let u = { x: e, y: o(t + uc) };
      return [u, gr(a, s, [u, l]), gr(l, c, [u, a])];
    }
    default:
      St(n);
  }
}
function aA(e, t) {
  switch (e) {
    case "left":
      return `${Math.min(t.y, 0)}px auto auto 0px`;
    case "right":
      return `${Math.min(t.y, 0)}px 0px auto auto`;
    case "top":
      return `0px auto auto ${Math.min(t.x, 0)}px`;
    case "bottom":
      return `auto auto 0px ${Math.min(t.x, 0)}px`;
    default:
      St(e);
  }
}
function sA(e, t, n, r, i) {
  let o = Math.min(i.x, r.x),
    a = Math.min(i.y, r.y),
    s = Bn.merge(r, i),
    l = oA({ x: e, y: t }, n, i, iA(r))
      .map((c) => `${c.x - o}px ${c.y - a}px`)
      .join(", ");
  return {
    height: `${s.height}px`,
    width: `${s.width}px`,
    clipPath: `polygon(${l})`,
    inset: aA(n, Bn.delta(r, i)),
  };
}
function fc(e) {
  switch (e) {
    case "start":
      return 0;
    case "center":
      return 0.5;
    case "end":
      return 1;
    default:
      St(e);
  }
}
function m1(e = "bottom", t = "center") {
  switch (e) {
    case "top":
      return { originX: fc(t), originY: 1 };
    case "right":
      return { originX: 0, originY: fc(t) };
    case "bottom":
      return { originX: fc(t), originY: 0 };
    case "left":
      return { originX: 1, originY: fc(t) };
    default:
      St(e);
  }
}
function lA(e) {
  return it(e) && "current" in e;
}
function cA(e) {
  var t;
  let n = e.current,
    r = { position: "absolute", scrolls: !1 };
  for (; n;) {
    if (
      n?.tagName === "BODY" ||
      (((t = getComputedStyle(n)) == null ? void 0 : t.position) === "fixed" &&
        (r.position = "fixed"),
      (n.scrollWidth > n.clientWidth || n.scrollHeight > n.clientHeight) && (r.scrolls = !0),
      r.scrolls && r.position === "fixed")
    )
      return r;
    n = n.parentElement;
  }
  return r;
}
function uA(e) {
  let t;
  function n() {
    t = requestAnimationFrame(() => {
      (e(), n());
    });
  }
  return [n, () => cancelAnimationFrame(t)];
}
function fA(e) {
  let t = 0,
    n = 0;
  return (r, i, o, a) => {
    var s, l, c;
    (s = e.current) != null &&
      s.style &&
      ((t = (l = a?.clientX) != null ? l : t),
      (n = (c = a?.clientY) != null ? c : n),
      Object.assign(e.current.style, sA(t, n, o, r, i)));
  };
}
function v1(e, t, n) {
  var r, i;
  e.current &&
    Object.assign(e.current.style, {
      position: t,
      visibility: "visible",
      left: ((r = n?.x) != null ? r : 0) + (t === "fixed" ? 0 : Te.scrollX) + "px",
      top: ((i = n?.y) != null ? i : 0) + (t === "fixed" ? 0 : Te.scrollY) + "px",
    });
}
var GS = p.createContext(new Set());
function dA(e, t, n, { safeArea: r, onDismiss: i }) {
  let o = Mt(() => new Set()),
    a = p.useContext(GS),
    [s, l] = Ps();
  return (
    p.useEffect(() => {
      if (s) {
        if (!t.current) return;
        ((t.current.style.pointerEvents = ""), a.add(t.current));
      } else {
        if (!t.current) return;
        ((t.current.style.pointerEvents = "none"), a.delete(t.current), l());
      }
    }, [s, t, a]),
    p.useEffect(() => {
      if (!r) {
        let u = (f) => {
          f.key === "Escape" && i();
        };
        return (Te.addEventListener("keyup", u), () => Te.removeEventListener("keyup", u));
      }
      function c(u) {
        if (o.size === 0) {
          for (let f of document.elementsFromPoint(u.x, u.y))
            if (f === e.current || f === t.current || f === n.current) return;
          i();
        }
      }
      return (
        Te.addEventListener("mousemove", c),
        () => {
          Te.removeEventListener("mousemove", c);
        }
      );
    }, [i, r, e, n, t, l, a, o]),
    o
  );
}
function hA({
  placement: e,
  alignment: t,
  offset: n,
  collisionDetectionSize: r,
  collisionDetectionPadding: i,
}) {
  return (o, a) => rA(o, a, e, t, n, r, i);
}
function pA(e, t) {
  return Mt(() => {
    let { originX: n, originY: r } = m1(e, t),
      i = { x: pe(n), y: pe(r) };
    return [
      i,
      (o) => {
        let a = m1(o, t);
        (i.x.set(a.originX), i.y.set(a.originY));
      },
    ];
  });
}
function mA(e, { x: t, y: n }) {
  if (!e || !io(e) || !ro(e) || (!it(e.props.style) && !so(e.props.style))) return null;
  let r = { ...e.props.style, originX: t, originY: n };
  return p.cloneElement(e, { style: r });
}
function uz({
  alignment: e,
  placement: t,
  safeArea: n,
  offsetX: r,
  offsetY: i,
  anchorRef: o,
  className: a,
  children: s,
  portalSelector: l,
  zIndex: c,
  collisionDetection: u = !1,
  collisionDetectionPadding: f,
  onDismiss: d,
  ...m
}) {
  var y;
  let b = p.useRef(null),
    S = p.useRef(null),
    h = p.useRef(null),
    [v, g] = pA(t, e);
  p.useLayoutEffect(() => {
    if (!lA(o) || !h.current || !t || !e) return;
    let { position: k, scrolls: w } = cA(o),
      E = h.current.getBoundingClientRect(),
      C = o.current.getBoundingClientRect(),
      T = hA({
        placement: t,
        alignment: e,
        offset: { x: r ?? 0, y: i ?? 0 },
        collisionDetectionSize: u ? { width: Te.innerWidth, height: Te.innerHeight } : void 0,
        collisionDetectionPadding: f,
      }),
      [z, A] = T(C, E);
    (v1(b, k, A), g(z));
    let H = fA(S),
      [L, M] = uA(() => {
        let j = o.current.getBoundingClientRect(),
          [K, N] = T(j, E);
        (v1(b, k, N), g(K), n && H(j, N, K));
      });
    if ((w && L?.(), !n)) return () => M?.();
    let D = (j) => {
        let K = o.current.getBoundingClientRect(),
          [N, $] = T(K, E);
        H(K, $, N, j);
      },
      P = o.current;
    return (
      P.addEventListener("mousemove", D),
      () => {
        (M?.(), P.removeEventListener("mousemove", D));
      }
    );
  }, [n, t, e, r, i, o, u, f, g]);
  let x = dA(o, b, S, { safeArea: n, onDismiss: d });
  return xh.createPortal(
    p.createElement(
      "div",
      {
        ref: b,
        className: a,
        style: {
          visibility: "hidden",
          width: "auto",
          height: "auto",
          position: "absolute",
          zIndex: c,
        },
        ...m,
      },
      n
        ? p.createElement("div", { ref: S, style: { position: "absolute" }, "data-safearea": !0 })
        : p.createElement("div", {
            style: { position: "fixed", inset: 0 },
            "aria-hidden": !0,
            onMouseDown: d,
          }),
      p.createElement(GS.Provider, { value: x }, p.createElement("div", { ref: h }, mA(s, v)))
    ),
    (y = document.querySelector(l)) != null ? y : document.body
  );
}
var vA = p.createContext(void 0),
  YS = class {
    constructor(e) {
      ((this.resolver = e), R(this, "status"));
    }
    static is(e) {
      return e instanceof YS;
    }
    preload() {
      if (this.status) {
        let t = this.status;
        return t.type !== "pending" ? void 0 : t.promise;
      }
      let e = this.resolver().then(
        (t) => {
          this.status = { type: "fulfilled", value: t };
        },
        (t) => {
          this.status = { type: "rejected", error: t };
        }
      );
      return ((this.status = { type: "pending", promise: e }), e);
    }
    read() {
      let e = this.status;
      if (!e) throw new Error("Need to call preload() before read()");
      switch (e.type) {
        case "pending":
          throw new Error("Need to wait for preload() to resolve");
        case "fulfilled":
          return e.value;
        case "rejected":
          throw e.error;
        default:
          St(e);
      }
    }
  };
function vp(e, t) {
  return e instanceof HTMLAnchorElement
    ? e
    : e instanceof Element
      ? e === t
        ? null
        : vp(e.parentElement, t)
      : null;
}
var g1 = "element",
  gA = "collection",
  yA = "collectionItemId",
  bA = "pathVariables",
  KS = "framer/page-link,";
function qS(e) {
  return Ie(e) && e.startsWith(`data:${KS}`);
}
function gp(e) {
  if (qS(e))
    try {
      let t = new URL(e),
        n = t.pathname.substring(KS.length),
        r = t.searchParams,
        i = r.has(g1) ? r.get(g1) : void 0,
        o,
        a = r.get(gA),
        s = r.get(yA),
        l = r.get(bA);
      if (a && s && l) {
        let c = Object.fromEntries(new URLSearchParams(l).entries());
        o = { collection: a, collectionItemId: s, pathVariables: c };
      }
      return {
        target: n === "none" ? null : n,
        element: i === "none" ? void 0 : i,
        collectionItem: o,
      };
    } catch {
      return;
    }
}
function xA(e, t, n) {
  var r, i, o;
  let a = t.getAttribute("data-framer-page-link-target"),
    s,
    l;
  if (a) {
    s = (r = t.getAttribute("data-framer-page-link-element")) != null ? r : void 0;
    let u = t.getAttribute("data-framer-page-link-path-variables");
    u && (l = Object.fromEntries(new URLSearchParams(u).entries()));
  } else {
    let u = t.getAttribute("href");
    if (!u) return !1;
    let f = gp(u);
    if (!f || !f.target) return !1;
    ((a = f.target),
      (s = (i = f.element) != null ? i : void 0),
      (l = (o = f.collectionItem) == null ? void 0 : o.pathVariables));
  }
  let c = s ? t.dataset.framerSmoothScroll !== void 0 : void 0;
  return (e(a, s, Object.assign({}, n, l), c), !0);
}
var Ah = {},
  dc = new WeakMap();
function QS(e, t, n) {
  var r, i, o, a;
  let s =
    (i = (r = dc?.get(n ?? Ah)) == null ? void 0 : r.get(e.collectionId)) == null
      ? void 0
      : i.get(e.collectionItemId);
  if (s) return s;
  let l = (o = dc.get(n ?? Ah)) != null ? o : new Map();
  dc.set(n ?? Ah, l);
  let c = (a = l.get(e.collectionId)) != null ? a : new Map();
  l.set(e.collectionId, c);
  let u = new YS(async () => {
    try {
      let f = t[e.collectionId];
      if (!f)
        throw new Error(`Key not found in collection utils for collection id: "${e.collectionId}`);
      let d = await f();
      if (!d) throw new Error("Collection does not contain utility functions");
      return await d.getSlugByRecordId(e.collectionItemId, n ?? void 0);
    } catch (f) {
      console.warn(`Failed to resolve slug: ${f instanceof Error ? f.message : "Unknown error"}`);
      return;
    }
  });
  return (c.set(e.collectionItemId, u), u);
}
var SA = "webPageId";
function Yh(e) {
  return !!(e && typeof e == "object" && SA in e);
}
function wA(e) {
  if (!e) return;
  let t = {};
  for (let n in e.pathVariables) {
    let r = e.pathVariables[n];
    r && (t[n] = r);
  }
  return t;
}
function yp(e) {
  if (!qS(e)) return e;
  let t = gp(e);
  if (!t) return;
  let { target: n, element: r, collectionItem: i } = t;
  if (n) return { webPageId: n, hash: r ?? void 0, pathVariables: wA(i) };
}
var ZS = /:([a-zA-Z][a-zA-Z0-9_]*)/g,
  kA = p.createContext(void 0);
function JS() {
  var e;
  let t = p.useContext(kA),
    n = (e = _c()) == null ? void 0 : e.pathVariables;
  return t || n;
}
function ew(e, { webPageId: t, hash: n, pathVariables: r }, i) {
  if (t !== e.id || n) return !1;
  if (e.path && e.pathVariables) {
    let o = Object.assign({}, i, r);
    for (let [, a] of e.path.matchAll(ZS)) if (!a || e.pathVariables[a] !== o[a]) return !1;
  }
  return !0;
}
function tw(e) {
  return e === void 0 ? !1 : !!(e.startsWith("#") || e.startsWith("/") || e.startsWith("."));
}
function CA(e, t) {
  try {
    return !!new URL(e).protocol;
  } catch {}
  return t;
}
function bp(e, t) {
  return e !== void 0 ? (e ? "_blank" : void 0) : t ? void 0 : "_blank";
}
function Kh(e, t = void 0) {
  let n = tw(e),
    r = bp(t, n);
  return { href: CA(e, n) ? e : `https://${e}`, target: r, rel: n ? void 0 : "noopener" };
}
function nw(e, t, n, r, i) {
  return async (o) => {
    var a, s;
    if (o.metaKey) return;
    let l = vp(o.target);
    if (!l || l.getAttribute("target") === "_blank") return;
    o.preventDefault();
    let c = (a = e.getRoute) == null ? void 0 : a.call(e, t);
    (c && H1(c?.page) && (await c.page.preload()),
      (s = e.navigate) == null || s.call(e, t, n, r, i));
  };
}
function EA(e, t, n, r, i, o) {
  let a = tw(e);
  if (!n.routes || !n.getRoute || !r || !a) return Kh(e, t);
  try {
    let [s, l] = e.split("#", 2);
    Oe(s !== void 0, "A href must have a defined pathname.");
    let { routeId: c, pathVariables: u } = wF(n.routes, s),
      f = n.getRoute(c);
    if (f) {
      ep(f.page);
      let d = Object.assign({}, i, u),
        m = Pc(f, {
          currentRoutePath: r.path,
          currentPathVariables: r.pathVariables,
          hash: l || void 0,
          pathVariables: d,
          preserveQueryParams: n.preserveQueryParams,
        }),
        y = bp(t, !0);
      return { href: m, target: y, onClick: nw(n, c, l || void 0, d, o) };
    }
  } catch {}
  return Kh(e, t);
}
function TA(e, t, n, r) {
  let i = [];
  function o(s) {
    if (!s || !n) return;
    let l = {};
    for (let c in s) {
      let u = s[c];
      Oe(u, "unresolvedSlug should be defined");
      let f = QS(u, n, r),
        d = f.preload();
      if (d) i.push(d);
      else {
        let m = f.read();
        m && (l[c] = m);
      }
    }
    return l;
  }
  let a = { path: o(e), hash: o(t) };
  if (i.length) throw Promise.allSettled(i);
  return a;
}
var hz = p.forwardRef(({ children: e, href: t, openInNewTab: n, smoothScroll: r, ...i }, o) => {
  let a = lo(),
    s = _c(),
    l = JS(),
    { activeLocale: c } = G1(),
    u = p.useMemo(() => {
      var d;
      if (!t) return {};
      let m = Yh(t) ? t : yp(t);
      if (!m) return {};
      if (Ie(m)) return EA(m, n, a, s, l, r);
      let {
          webPageId: y,
          hash: b,
          pathVariables: S,
          hashVariables: h,
          unresolvedHashSlugs: v,
          unresolvedPathSlugs: g,
        } = m,
        x = (d = a.getRoute) == null ? void 0 : d.call(a, y),
        k = TA(g, v, a.collectionUtils, c);
      x && ep(x.page);
      let w = Object.assign({}, l, S, k?.path),
        E = Object.assign({}, l, h, k?.hash),
        C = bp(n, !0),
        I = Pc(x, {
          currentRoutePath: s?.path,
          currentPathVariables: s?.pathVariables,
          hash: b,
          pathVariables: w,
          hashVariables: E,
          preserveQueryParams: a.preserveQueryParams,
        }),
        T = I.split("#", 2)[1];
      return {
        href: I,
        target: C,
        onClick: nw(a, y, T, w, r),
        "data-framer-page-link-current": (s && ew(s, m, l)) || void 0,
      };
    }, [t, a, c, l, n, s, r]);
  if (!e) return null;
  let f = p.Children.only(e);
  return p.isValidElement(f) ? p.cloneElement(f, { ...i, ...u, ref: o ?? i.ref }) : null;
});
function IA(e, t, n, r) {
  let i = Yh(e) ? e : yp(e);
  if (!Yh(i)) return Ie(e) ? Kh(e).href : void 0;
  if (!t.getRoute || !t.currentRouteId) return;
  let o = t.getRoute(t.currentRouteId),
    {
      webPageId: a,
      hash: s,
      pathVariables: l,
      hashVariables: c,
      unresolvedHashSlugs: u,
      unresolvedPathSlugs: f,
    } = i,
    d = t.getRoute(a),
    m = f || u ? r?.(f, u) : void 0,
    y = Object.assign({}, t.currentPathVariables, n, l, m?.path),
    b = Object.assign({}, t.currentPathVariables, n, c, m?.hash);
  return Pc(d, {
    currentRoutePath: o?.path,
    currentPathVariables: t.currentPathVariables,
    hash: s,
    pathVariables: y,
    hashVariables: b,
    relative: !1,
    preserveQueryParams: t.preserveQueryParams,
  });
}
function mz({
  RootComponent: e,
  isWebsite: t,
  routeId: n,
  pathVariables: r,
  routes: i,
  collectionUtils: o,
  notFoundPage: a,
  isReducedMotion: s = !1,
  includeDataObserver: l = !1,
  localeId: c,
  locales: u,
  preserveQueryParams: f,
}) {
  if (
    (p.useEffect(() => {
      t || Z1.start();
    }, []),
    t)
  )
    return p.createElement(
      Pg,
      { reducedMotion: s ? "user" : "never" },
      p.createElement(
        KV,
        null,
        p.createElement(bF, {
          initialRoute: n,
          initialPathVariables: r,
          initialLocaleId: c,
          routes: i,
          collectionUtils: o,
          notFoundPage: a,
          locales: u,
          defaultPageStyle: { minHeight: "100vh", width: "auto" },
          preserveQueryParams: f,
        })
      )
    );
  {
    let d = l ? cV : p.Fragment;
    return p.createElement(
      d,
      null,
      p.createElement(
        V_,
        { routes: i },
        p.createElement(iV, null, p.isValidElement(e) ? e : p.createElement(e, { key: n }))
      )
    );
  }
}
var rw = p.createContext(void 0),
  y1 = "ssr-variant";
function RA(e, t, n) {
  var r;
  return "ref" in e ? { ...t, ref: (r = e.ref) != null ? r : n } : { ...t, ref: n };
}
function qh(e, t, n) {
  return p.createElement(
    p.Fragment,
    null,
    p.Children.map(e, (r) => (!r || !io(r) || !ro(r) ? null : p.cloneElement(r, RA(r, t, n))))
  );
}
function PA(e, t, n, r, i, o, a, s) {
  let l = p.Children.toArray(t),
    c = l[0];
  if (l.length !== 1 || !p.isValidElement(c))
    return (console.warn(s + ": expected exactly one React element for a child", t), qh(t, n, r));
  let u = [],
    f = [];
  for (let [b] of Object.entries(i)) {
    if (b === o) continue;
    let S = e[b];
    if (!S || !LA(c.props, S)) {
      f.push(b);
      continue;
    }
    let h = b1([b], a);
    h.length && u.push({ variants: h, propOverrides: S });
  }
  if (u.length === 0) return p.cloneElement(c, { ...n, ref: r });
  let d = [o, ...f],
    m = b1(d, a);
  m.length && u.unshift({ variants: m });
  let y = `.${y1} { display: contents }`;
  return p.createElement(
    p.Fragment,
    null,
    !a && p.createElement("style", { ...XS }, y),
    u.map(({ variants: b, propOverrides: S }) => {
      let h = b.join("+"),
        v = p.createElement(
          rw.Provider,
          { key: h, value: new Set(b) },
          p.cloneElement(c, { ...n, ...S, ref: r })
        ),
        g = _A(b, a, i);
      return (
        g.length
          ? (Oe(u.length > 1, "Must branch out when there are hiddenClassNames"),
            (v = p.createElement("div", { key: h, className: `${y1} ${g.join(" ")}` }, v)))
          : Oe(u.length === 1, "Cannot branch out when hiddenClassNames is empty"),
        v
      );
    })
  );
}
function _A(e, t, n) {
  let r = [];
  for (let [i, o] of Object.entries(n)) {
    let a = t && !t.has(i);
    if (e.includes(i) || a) continue;
    let s = o.split("-")[2];
    r.push(`hidden-${s}`);
  }
  return r;
}
function b1(e, t) {
  return t ? e.filter((n) => t.has(n)) : e;
}
function FA(e) {
  switch (e) {
    case "transformTemplate":
      return !1;
    default:
      return !1;
  }
}
function LA(e, t) {
  for (let n of Object.keys(t)) if (!FA(n) && !xS(e[n], t[n], !0)) return !0;
  return !1;
}
function MA(e, t, n) {
  return !n || !e ? t : { ...t, ...n[e] };
}
var gz = p.forwardRef(function ({ breakpoint: t, overrides: n, children: r, ...i }, o) {
  if (Hn()) return qh(r, MA(t, i, n), o);
  let a = p.useContext(vA);
  if (!a)
    return (console.warn("PropertyOverrides is missing GeneratedComponentContext"), qh(r, i, o));
  let { primaryVariantId: s, variantClassNames: l } = a,
    c = p.useContext(rw);
  return PA(n, r, i, o, l, s, c, "PropertyOverrides");
});
function yz({ links: e, children: t }) {
  let n = lo(),
    { activeLocale: r } = G1(),
    i = [],
    o = e.map((a) =>
      IA(a.href, n, a.implicitPathVariables, (s, l) => {
        function c(u) {
          let f = {};
          for (let d in u) {
            let m = u[d];
            (Oe(n.collectionUtils, "collectionUtils should be defined"),
              Oe(m, "unresolvedSlug be defined"));
            let y = QS(m, n.collectionUtils, r),
              b = y.preload();
            if (b) i.push(b);
            else {
              let S = y.read();
              S && (f[d] = S);
            }
          }
          return f;
        }
        return { path: c(s), hash: c(l) };
      })
    );
  if (i.length > 0) throw Promise.allSettled(i);
  return t(o);
}
var OA = class {
    constructor() {
      R(this, "entries", new Map());
    }
    set(e, t, n, r) {
      let i = this.entries.get(e);
      switch (t) {
        case "transformTemplate": {
          (Oe(typeof n == "string", `transformTemplate must be a string, received: ${n}`),
            i ? (i.transformTemplate = n) : this.entries.set(e, { transformTemplate: n }));
          break;
        }
        case "initial":
        case "animate": {
          (Oe(typeof n == "object", `${t} must be a valid object, received: ${n}`),
            i
              ? ((i[t] = n), i.variantHash || (i.variantHash = r))
              : this.entries.set(e, { [t]: n, variantHash: r }));
          break;
        }
        default:
          break;
      }
    }
    clear() {
      this.entries.clear();
    }
    toObject() {
      return Object.fromEntries(this.entries);
    }
  },
  iw = new OA(),
  bz = (e, t, n, r) => (Hn() || iw.set(t, e, n, r), n),
  VA = "__Appear_Animation_Transform__",
  xz = (e, t) => {
    if (!Hn()) {
      let n = t?.({}, VA);
      if (n === void 0) return t;
      iw.set(e, "transformTemplate", n);
    }
    return t;
  },
  Sz = "data-framer-appear-id",
  wz = "data-framer-appear-animation";
function Dh(e, t) {
  (e.forEach((n) => clearTimeout(n)),
    e.clear(),
    t.forEach((n) => n && n("Callback cancelled by variant change")),
    t.clear());
}
function x1() {
  return new Set();
}
function Cz(e) {
  let t = Mt(x1),
    n = Mt(x1);
  return (
    MS(() => () => Dh(n, t)),
    p.useEffect(() => () => Dh(n, t), [t, n]),
    p.useEffect(() => {
      Dh(n, t);
    }, [e, t, n]),
    p.useRef({
      activeVariantCallback:
        (r) =>
        (...i) =>
          new Promise((o, a) => (t.add(a), r(...i).then(o))).catch(() => {}),
      delay: async (r, i) => {
        (await new Promise((o) => n.add(globalThis.setTimeout(() => o(!0), i))), r());
      },
    }).current
  );
}
function AA(e, t, n) {
  return p.useCallback(
    (r) => {
      var i, o, a;
      return n
        ? e
          ? t
            ? Object.assign(
                {},
                (i = n[e]) == null ? void 0 : i[r],
                (o = n[t]) == null ? void 0 : o[r]
              )
            : ((a = n[e]) == null ? void 0 : a[r]) || {}
          : {}
        : {};
    },
    [e, t, n]
  );
}
function DA(e) {
  for (let [t, n] of Object.entries(e)) if (Te.matchMedia(n).matches) return t;
}
function Iz(e, t, n = !0) {
  var r;
  let i = O(zS),
    o = B(Hn() && (r = DA(t)) != null ? r : e),
    a = B(n && i ? e : o.current),
    s = Mc(),
    l = Gg(),
    c = ae(
      (u) => {
        (u !== o.current || u !== a.current) &&
          l(() => {
            ((o.current = a.current = u),
              li(() => {
                s();
              }));
          });
      },
      [l, s]
    );
  return (
    fS(() => {
      !n || i !== !0 || c(o.current);
    }, []),
    X(() => {
      let u = [];
      for (let [f, d] of Object.entries(t)) {
        let m = Te.matchMedia(d),
          y = (b) => {
            b.matches && c(f);
          };
        (BA(m, y), u.push([m, y]));
      }
      return () => u.forEach(([f, d]) => zA(f, d));
    }, [t, c]),
    [o.current, a.current]
  );
}
function BA(e, t) {
  e.addEventListener ? e.addEventListener("change", t) : e.addListener(t);
}
function zA(e, t) {
  e.removeEventListener ? e.removeEventListener("change", t) : e.removeListener(t);
}
function xp() {
  return we.current() === "CANVAS";
}
function S1(e, t) {
  if (e[t]) return e[t];
  if (!(t in e)) return e.default;
}
function HA(e, t) {
  if (xp()) return;
  let r = p.useRef(!0),
    i = p.useRef(t);
  (MS((o, a) => {
    let s = o && !a;
    if (!r.current && s) {
      let l = S1(i.current, e);
      l && l();
    }
    r.current = s;
  }, []),
    p.useEffect(() => {
      if (r.current) {
        let o = S1(i.current, e);
        o && o();
      }
    }, [e]));
}
function Mz(e) {
  HA("default", { default: e });
}
function Vz({ blockDocumentScrolling: e = !0 } = {}) {
  let [t, n] = p.useState(!1),
    r = p.useCallback(
      (i) => {
        (n(i),
          e !== !1 &&
            (i
              ? document.documentElement.style.setProperty("overflow", "hidden")
              : document.documentElement.style.removeProperty("overflow")));
      },
      [e]
    );
  return (
    p.useEffect(
      () => () => {
        e !== !1 && document.documentElement.style.removeProperty("overflow");
      },
      [e]
    ),
    [t, r]
  );
}
function NA(e, t) {
  return `${e}-${t}`;
}
function $A(e, t) {
  let r = e.indexOf(t) + 1;
  r >= e.length && (r = 0);
  let i = e[r];
  return (Oe(i !== void 0, "nextVariant should be defined"), i);
}
function WA(e, t) {
  if (e) {
    if (t) {
      let n = e[t];
      if (n) return n;
    }
    return e.default;
  }
}
function w1(e, t, n) {
  let { hover: r, pressed: i } = e || {};
  if (i && n) return "pressed";
  if (r && t) return "hover";
}
function UA(e, t) {
  let n = t[e];
  return n || `framer-v-${e}`;
}
function k1(e, t, n) {
  return e && n.has(e) ? e : t;
}
var jA = Symbol("cycle");
function zz({
  variant: e,
  defaultVariant: t,
  transitions: n,
  enabledGestures: r,
  cycleOrder: i = [],
  variantProps: o = {},
  variantClassNames: a = {},
}) {
  let s = Mc(),
    l = Mt(() => new Set(i)),
    c = p.useRef({
      isHovered: !1,
      isPressed: !1,
      baseVariant: k1(e, t, l),
      lastVariant: e,
      gestureVariant: void 0,
      defaultVariant: t,
      enabledGestures: r,
      cycleOrder: i,
      transitions: n,
    }),
    u = p.useCallback(
      (x) => {
        let { isHovered: k, isPressed: w, enabledGestures: E, defaultVariant: C } = c.current,
          I = k1(x, C, l),
          T = w1(E?.[I], k, w),
          z = T ? NA(I, T) : void 0;
        return [I, z];
      },
      [l]
    ),
    f = p.useCallback(
      ({ isHovered: x, isPressed: k }) => {
        (x !== void 0 && (c.current.isHovered = x), k !== void 0 && (c.current.isPressed = k));
        let { baseVariant: w, gestureVariant: E, defaultVariant: C } = c.current,
          [I, T] = u(w);
        (I !== w || T !== E) &&
          ((c.current.baseVariant = I || C), (c.current.gestureVariant = T), s());
      },
      [u, s]
    ),
    d = p.useCallback(
      (x) => {
        let { defaultVariant: k, cycleOrder: w, baseVariant: E, gestureVariant: C } = c.current,
          I = x === jA ? $A(w || [], E || k) : x,
          [T, z] = u(I);
        (T !== E || z !== C) &&
          ((c.current.baseVariant = T || k), (c.current.gestureVariant = z), s());
      },
      [u, s]
    );
  if (e !== c.current.lastVariant) {
    let [x, k] = u(e);
    ((c.current.lastVariant = x),
      (x !== c.current.baseVariant || k !== c.current.gestureVariant) &&
        ((c.current.baseVariant = x), (c.current.gestureVariant = k)));
  }
  let {
      baseVariant: m,
      gestureVariant: y,
      defaultVariant: b,
      enabledGestures: S,
      isHovered: h,
      isPressed: v,
    } = c.current,
    g = AA(c.current.baseVariant, c.current.gestureVariant, o);
  return p.useMemo(() => {
    let x = [];
    return (
      m !== b && x.push(m),
      y && x.push(y),
      {
        variants: x,
        baseVariant: m,
        gestureVariant: y,
        transition: WA(c.current.transitions, m),
        setVariant: d,
        setGestureState: f,
        addVariantProps: g,
        classNames: pp(UA(m, a), w1(S?.[m], h, v)),
      }
    );
  }, [m, y, h, v, g, d, b, S, f, a]);
}
var XA = p.createContext(void 0),
  GA = () => p.useContext(XA),
  br = (() => {
    function e(t, n) {
      return { a: t, b: n };
    }
    return (
      (e.intersection = (t, n) => {
        let r = t.a.x,
          i = t.a.y,
          o = t.b.x,
          a = t.b.y,
          s = n.a.x,
          l = n.a.y,
          c = n.b.x,
          u = n.b.y,
          f = (r - o) * (l - u) - (i - a) * (s - c);
        if (f === 0) return null;
        let d = ((s - c) * (r * a - i * o) - (r - o) * (s * u - l * c)) / f,
          m = ((l - u) * (r * a - i * o) - (i - a) * (s * u - l * c)) / f;
        return { x: d, y: m };
      }),
      (e.intersectionAngle = (t, n) => {
        let r = t.b.x - t.a.x,
          i = t.b.y - t.a.y,
          o = n.b.x - n.a.x,
          a = n.b.y - n.a.y;
        return Math.atan2(r * a - i * o, r * o + i * a) * (180 / Math.PI);
      }),
      (e.isOrthogonal = (t) => t.a.x === t.b.x || t.a.y === t.b.y),
      (e.perpendicular = (t, n) => {
        let r = t.a.x - t.b.x,
          i = t.a.y - t.b.y,
          o = ct(n.x - i, n.y + r);
        return e(o, n);
      }),
      (e.projectPoint = (t, n) => {
        let r = e.perpendicular(t, n);
        return e.intersection(t, r);
      }),
      (e.pointAtPercentDistance = (t, n) => {
        let r = e.distance(t),
          i = (n * r) / r;
        return { x: i * t.b.x + (1 - i) * t.a.x, y: i * t.b.y + (1 - i) * t.a.y };
      }),
      (e.distance = (t) => ct.distance(t.a, t.b)),
      e
    );
  })();
function YA(e) {
  var t, n;
  let r = (e * Math.PI) / 180,
    i = { x: -Math.sin(r) * 100, y: Math.cos(r) * 100 },
    o = ct(i.x, i.y),
    a = br(ct(0.5, 0.5), o),
    s = Bn.points({ x: 0, y: 0, width: 1, height: 1 }),
    l = s
      .map((b) => ({ point: b, distance: ct.distance(o, b) }))
      .sort((b, S) => b.distance - S.distance),
    c = (t = l[0]) == null ? void 0 : t.point,
    u = (n = l[1]) == null ? void 0 : n.point;
  Oe(c && u, "linearGradientLine: Must have 2 closest points.");
  let [f, d] = s.filter((b) => !ct.isEqual(b, c) && !ct.isEqual(b, u));
  Oe(f && d, "linearGradientLine: Must have 2 opposing points.");
  let m = br.intersection(a, br(c, u)),
    y = br.intersection(a, br(f, d));
  return (Oe(m && y, "linearGradientLine: Must have a start and end point."), br(m, y));
}
function KA(e, t) {
  var n, r, i, o;
  let a = YA(e.angle),
    s = Ya(e),
    l = (r = (n = s[0]) == null ? void 0 : n.position) != null ? r : 0,
    c = (o = (i = s[s.length - 1]) == null ? void 0 : i.position) != null ? o : 1,
    u = br.pointAtPercentDistance(a, l),
    f = br.pointAtPercentDistance(a, c),
    d = yi([l, c], [0, 1]);
  return {
    id: `id${t}g${$a.hash(e)}`,
    x1: u.x,
    y1: u.y,
    x2: f.x,
    y2: f.y,
    stops: s.map((m) => ({
      color: m.value,
      alpha: up.getAlpha(m.value) * e.alpha,
      position: d(m.position),
    })),
  };
}
function qA(e, t) {
  return {
    id: `id${t}g${Wa.hash(e)}`,
    widthFactor: e.widthFactor,
    heightFactor: e.heightFactor,
    centerAnchorX: e.centerAnchorX,
    centerAnchorY: e.centerAnchorY,
    stops: Ya(e).map((n) => ({
      color: n.value,
      alpha: up.getAlpha(n.value) * e.alpha,
      position: n.position,
    })),
  };
}
function ow(e) {
  if (!Ie(e) || e.charAt(e.length - 1) !== "%") return !1;
  let n = e.slice(0, -1),
    r = parseFloat(n);
  return zn(r);
}
function aw(e) {
  let t = e.slice(0, -1),
    n = parseFloat(t);
  return zn(n) ? n : 50;
}
function C1(e) {
  return ow(e) ? aw(e) / 100 : e === "left" ? 0 : e === "right" ? 1 : 0.5;
}
function E1(e) {
  return ow(e) ? aw(e) / 100 : e === "top" ? 0 : e === "bottom" ? 1 : 0.5;
}
function QA(e, t, n, r) {
  var i, o, a, s;
  if (((e = _e.get(e, "#09F")), !An.isImageObject(e) || !e.pixelWidth || !e.pixelHeight)) return;
  let l = e.pixelWidth,
    c = e.pixelHeight,
    u,
    { fit: f } = e,
    d = 1,
    m = 1,
    y = 0,
    b = 0;
  if (f === "fill" || f === "fit" || f === "tile" || !f) {
    let h = 1,
      v = 1,
      g = l / c,
      x = t.height * g,
      k = t.width / g,
      w = x / t.width,
      E = k / t.height;
    if (f === "tile") {
      ((i = e.backgroundSize) != null || (e.backgroundSize = 1),
        (d = Math.round(e.backgroundSize * (l / 2))),
        (m = Math.round(e.backgroundSize * (c / 2))));
      let C = (o = t.x) != null ? o : 0,
        I = (a = t.y) != null ? a : 0,
        T = 0,
        z = 0;
      (r && ((T = C), (z = I)),
        (y = (t.width - d) * C1(e.positionX) + T),
        (b = (t.height - m) * E1(e.positionY) + z),
        (u = `translate(${y + C}, ${b + I})`));
    } else
      ((f === "fill" || !f ? E > w : E < w)
        ? ((v = E), (b = (1 - E) * E1(e.positionY)))
        : ((h = w), (y = (1 - w) * C1(e.positionX))),
        (u = `translate(${y}, ${b}) scale(${h}, ${v})`));
  }
  return {
    id: `id${n}g-fillImage`,
    path: (s = e.src) != null ? s : "",
    transform: u,
    width: d,
    height: m,
    offsetX: y,
    offsetY: b,
  };
}
var ZA = "framer/asset-reference,";
function JA(e) {
  return e.startsWith(`data:${ZA}`);
}
function eD(e, t) {
  var n;
  if (/^\w+:/.test(e) && !JA(e)) return e;
  typeof t != "number"
    ? (t = void 0)
    : t <= 512
      ? (t = 512)
      : t <= 1024
        ? (t = 1024)
        : t <= 2048
          ? (t = 2048)
          : (t = 4096);
  let r = we.current() === "EXPORT";
  return (n = Lt.assetResolver(e, { pixelSize: t, isExport: r })) != null ? n : "";
}
var tD = ({
    id: e,
    path: t,
    transform: n,
    repeat: r,
    width: i,
    height: o,
    offsetX: a,
    offsetY: s,
  }) => {
    let l = eD(t);
    return p.createElement(
      "pattern",
      {
        id: e,
        width: r ? i : "100%",
        height: r ? o : "100%",
        patternContentUnits: r ? void 0 : "objectBoundingBox",
        patternUnits: r ? "userSpaceOnUse" : void 0,
        x: r ? a : void 0,
        y: r ? s : void 0,
      },
      p.createElement("image", {
        key: l,
        width: r ? i : 1,
        height: r ? o : 1,
        href: l,
        preserveAspectRatio: "none",
        transform: r ? void 0 : n,
        x: r ? 0 : void 0,
        y: r ? 0 : void 0,
      })
    );
  },
  T1 = Hn(),
  nD = class {
    constructor(e, t, n, r, i = 0) {
      ((this.id = e), (this.svg = t), (this.innerHTML = n), (this.viewBox = r), (this.count = i));
    }
  },
  rD = class {
    constructor() {
      R(this, "entries", new Map());
    }
    debugGetEntries() {
      return this.entries;
    }
    subscribe(e, t, n) {
      if (!e || e === "") return "";
      let r = this.entries.get(e);
      if (!r) {
        n || (n = "svg" + String(CS(e)) + "_" + String(e.length));
        let i = e,
          o,
          a = iD(e);
        (a && (t && oD(a, n), (a.id = n), (o = cD(a)), (i = a.outerHTML)),
          (r = this.createDOMElementFor(i, n, o)),
          this.entries.set(e, r));
      }
      return ((r.count += 1), r.innerHTML);
    }
    getViewBox(e) {
      if (!e || e === "") return;
      let t = this.entries.get(e);
      return t?.viewBox;
    }
    unsubscribe(e) {
      if (!e || e === "") return;
      let t = this.entries.get(e);
      t && ((t.count -= 1), !(t.count > 0) && setTimeout(() => this.maybeRemoveEntry(e), 5e3));
    }
    maybeRemoveEntry(e) {
      let t = this.entries.get(e);
      t && (t.count > 0 || (this.entries.delete(e), this.removeDOMElement(t)));
    }
    removeDOMElement(e) {
      let t = "container_" + e.id;
      if (T1) {
        let n = document?.querySelector("#" + t);
        n?.remove();
      }
    }
    createDOMElementFor(e, t, n) {
      let r = "container_" + t;
      if (T1) {
        let s = document.querySelector("#svg-templates");
        if (
          (s ||
            ((s = document.createElement("div")),
            (s.id = "svg-templates"),
            (s.style.position = "absolute"),
            (s.style.top = "0"),
            (s.style.left = "0"),
            (s.style.width = "0"),
            (s.style.height = "0"),
            (s.style.overflow = "hidden"),
            document.body.appendChild(s)),
          !document.querySelector("#" + r))
        ) {
          let l = document.createElement("div");
          ((l.id = r),
            (l.innerHTML = e),
            l.firstElementChild && (l.firstElementChild.id = t),
            s.appendChild(l));
        }
      }
      let i = n ? `0 0 ${n.width} ${n.height}` : void 0,
        a = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width: 100%; height: 100%"${i ? ` viewBox="${i}"` : ""}><use href="#${t}"></use></svg>`;
      return new nD(t, e, a, i);
    }
    clear() {
      this.entries.clear();
    }
    generateTemplates() {
      let e = [],
        t = "position: absolute; overflow: hidden; top: 0; left: 0; width: 0; height: 0";
      e.push(`<div id="svg-templates" style="${t}">`);
      for (let n of this.entries.values()) {
        let r = "container_" + n.id;
        (e.push(`  <div id="${r}">`), e.push(`    ${n.svg}`), e.push("  </div>"));
      }
      return (
        e.push("</div>"),
        e.join(`
`)
      );
    }
  },
  Qi = new rD();
function iD(e) {
  if (typeof DOMParser > "u") {
    console.warn("unable to find DOMParser");
    return;
  }
  try {
    let r = new DOMParser().parseFromString(e, "text/html").getElementsByTagName("svg")[0];
    if (!r) throw Error("no svg element found");
    return r;
  } catch {
    return;
  }
}
function oD(e, t) {
  let n = aD(t);
  sw(e, n);
}
function aD(e) {
  return e.replace(/[^a-z0-9\-_:.]|^[^a-z]+/gi, "");
}
function sw(e, t) {
  (sD(e, t),
    Array.from(e.children).forEach((r) => {
      sw(r, t);
    }));
}
function sD(e, t) {
  e.getAttributeNames().forEach((r) => {
    let i = e.getAttribute(r);
    if (!i) return;
    if ((r === "id" && e.setAttribute(r, `${t}_${i}`), r === "href" || r === "xlink:href")) {
      let [a, s] = i.split("#");
      if (a) return;
      e.setAttribute(r, `#${t}_${s}`);
      return;
    }
    let o = "url(#";
    if (i.includes(o)) {
      let a = i.replace(o, `${o}${t}_`);
      e.setAttribute(r, a);
    }
  });
}
var lD = {
  cm: 96 / 2.54,
  mm: 96 / 2.54 / 10,
  Q: 96 / 2.54 / 40,
  in: 96,
  pc: 96 / 6,
  pt: 96 / 72,
  px: 1,
  em: 16,
  ex: 8,
  ch: 8,
  rem: 16,
};
function I1(e) {
  var t;
  if (!e) return;
  let n = /(-?[0-9.]+)([a-z%]*)/.exec(e);
  if (!(n?.[1] === void 0 || n?.[2] === void 0) && !((t = n[2]) != null && t.startsWith("%")))
    return Math.round(parseFloat(n[1]) * (lD[n[2]] || 1));
}
function cD(e) {
  let t = I1(e.getAttribute("width")),
    n = I1(e.getAttribute("height"));
  if (!(typeof t != "number" || typeof n != "number") && !(t <= 0 || n <= 0))
    return { width: t, height: n };
}
function Yz(e) {
  let t = ja(),
    n = Ga(e),
    r = p.useRef(null),
    i = GA();
  return (
    Oc(e, r),
    p.createElement(mD, { ...e, innerRef: r, parentSize: t, layoutId: n, providedWindow: i })
  );
}
var uD = 5e4;
function fD(e) {
  return e.indexOf("image") >= 0;
}
function dD(e) {
  return e.indexOf("var(--") >= 0;
}
function hD(e) {
  return !!(
    e.borderRadius ||
    e.borderBottomLeftRadius ||
    e.borderBottomRightRadius ||
    e.borderTopLeftRadius ||
    e.borderTopRightRadius
  );
}
function R1(e, t) {
  var n, r, i;
  let o = e.current;
  if (!o) return;
  let a = (n = t.providedWindow) != null ? n : Te,
    s = o.firstElementChild;
  if (!s || !(s instanceof a.SVGSVGElement)) return;
  if (!s.getAttribute("viewBox")) {
    let y = Qi.getViewBox(t.svg);
    y && s.setAttribute("viewBox", y);
  }
  let { withExternalLayout: l, parentSize: c } = t;
  if (!l && Ua(t) && c !== 1 && c !== 2) return;
  let { intrinsicWidth: f, intrinsicHeight: d, _constraints: m } = t;
  (((r = s.viewBox.baseVal) == null ? void 0 : r.width) === 0 &&
    ((i = s.viewBox.baseVal) == null ? void 0 : i.height) === 0 &&
    Y(f) &&
    Y(d) &&
    s.setAttribute("viewBox", `0 0 ${f} ${d}`),
    m && m.aspectRatio
      ? s.setAttribute("preserveAspectRatio", "")
      : s.setAttribute("preserveAspectRatio", "none"),
    s.setAttribute("width", "100%"),
    s.setAttribute("height", "100%"));
}
function pD() {
  return (
    p.useInsertionEffect(() => {
      Xa();
    }, []),
    null
  );
}
var mD = (() => {
    var e;
    return (
      (e = class extends Da {
        constructor() {
          (super(...arguments),
            R(this, "container", p.createRef()),
            R(this, "svgElement", null),
            R(this, "setSVGElement", (t) => {
              ((this.svgElement = t), this.setLayerElement(t));
            }),
            R(this, "previouslyRenderedSVG", ""),
            R(this, "unmountedSVG", ""));
        }
        static frame(t) {
          return za(t, t.parentSize || 0);
        }
        get frame() {
          return za(this.props, this.props.parentSize || 0);
        }
        componentDidMount() {
          if (this.unmountedSVG) {
            let { svgContentId: t } = this.props,
              n = t ? "svg" + t : null;
            (Qi.subscribe(this.unmountedSVG, !t, n),
              (this.previouslyRenderedSVG = this.unmountedSVG));
          }
          this.props.svgContentId || R1(this.container, this.props);
        }
        componentWillUnmount() {
          (Qi.unsubscribe(this.previouslyRenderedSVG),
            (this.unmountedSVG = this.previouslyRenderedSVG),
            (this.previouslyRenderedSVG = ""));
        }
        componentDidUpdate(t) {
          if ((super.componentDidUpdate(t), this.props.svgContentId)) return;
          let { fill: n } = this.props;
          (An.isImageObject(n) &&
            An.isImageObject(t.fill) &&
            n.src !== t.fill.src &&
            kS(this.svgElement, "fill", null, !1),
            R1(this.container, this.props));
        }
        collectLayout(t, n) {
          if (this.props.withExternalLayout) {
            ((n.width = "100%"), (n.height = "100%"), (n.aspectRatio = "inherit"));
            return;
          }
          let r = this.frame,
            {
              rotation: i,
              intrinsicWidth: o,
              intrinsicHeight: a,
              width: s,
              height: l,
            } = this.props,
            c = _e.getNumber(i);
          if (
            ((t.opacity = Y(this.props.opacity) ? this.props.opacity : 1),
            we.hasRestrictions() && r)
          ) {
            (Object.assign(t, {
              transform: `translate(${r.x}px, ${r.y}px) rotate(${c.toFixed(4)}deg)`,
              width: `${r.width}px`,
              height: `${r.height}px`,
            }),
              Ua(this.props) && (t.position = "absolute"));
            let u = r.width / (o || 1),
              f = r.height / (a || 1);
            n.transformOrigin = "top left";
            let { zoom: d, target: m } = xc;
            if (m === "EXPORT") {
              let y = d > 1 ? d : 1;
              ((n.transform = `scale(${u * y}, ${f * y})`), (n.zoom = 1 / y));
            } else n.transform = `scale(${u}, ${f})`;
            o && a && ((n.width = o), (n.height = a));
          } else {
            let { left: u, right: f, top: d, bottom: m } = this.props;
            (Object.assign(t, {
              left: u,
              right: f,
              top: d,
              bottom: m,
              width: s,
              height: l,
              rotate: c,
            }),
              Object.assign(n, { left: 0, top: 0, bottom: 0, right: 0, position: "absolute" }));
          }
        }
        render() {
          var t;
          let {
            id: n,
            visible: r,
            style: i,
            fill: o,
            svg: a,
            intrinsicHeight: s,
            intrinsicWidth: l,
            title: c,
            description: u,
            layoutId: f,
            className: d,
            variants: m,
            withExternalLayout: y,
            innerRef: b,
            svgContentId: S,
            height: h,
            opacity: v,
            width: g,
            ...x
          } = this.props;
          if (!y && (!r || !n)) return null;
          let k = (t = n ?? f) != null ? t : "svg",
            w = this.frame,
            E = w || { width: l || 100, height: s || 100 },
            C = { ...i, imageRendering: "pixelated", flexShrink: 0 },
            I = {};
          (this.collectLayout(C, I),
            yO(this.props, C),
            dp(this.props, C),
            Da.applyWillChange(this.props, C, !1));
          let T = null;
          if (typeof o == "string" || W.isColorObject(o)) {
            let N = W.isColorObject(o) ? o.initialValue || W.toRgbString(o) : o;
            ((C.fill = N), (C.color = N));
          } else if ($a.isLinearGradient(o)) {
            let N = o,
              $ = `${encodeURI(n || "")}g${$a.hash(N)}`;
            C.fill = `url(#${$})`;
            let { stops: ie, x1: Q, x2: Z, y1: ze, y2: Xe } = KA(N, k);
            T = p.createElement(
              "svg",
              {
                ref: this.setSVGElement,
                xmlns: "http://www.w3.org/2000/svg",
                width: "100%",
                height: "100%",
                style: { position: "absolute" },
              },
              p.createElement(
                "linearGradient",
                { id: $, x1: Q, x2: Z, y1: ze, y2: Xe },
                ie.map((He, Ge) =>
                  p.createElement("stop", {
                    key: Ge,
                    offset: He.position,
                    stopColor: He.color,
                    stopOpacity: He.alpha,
                  })
                )
              )
            );
          } else if (Wa.isRadialGradient(o)) {
            let N = o,
              $ = `${encodeURI(n || "")}g${Wa.hash(N)}`;
            C.fill = `url(#${$})`;
            let ie = qA(N, k);
            T = p.createElement(
              "svg",
              {
                ref: this.setSVGElement,
                xmlns: "http://www.w3.org/2000/svg",
                width: "100%",
                height: "100%",
                style: { position: "absolute" },
              },
              p.createElement(
                "radialGradient",
                { id: $, cy: N.centerAnchorY, cx: N.centerAnchorX, r: N.widthFactor },
                ie.stops.map((Q, Z) =>
                  p.createElement("stop", {
                    key: Z,
                    offset: Q.position,
                    stopColor: Q.color,
                    stopOpacity: Q.alpha,
                  })
                )
              )
            );
          } else if (An.isImageObject(o)) {
            let N = QA(o, E, k);
            N &&
              ((C.fill = `url(#${N.id})`),
              (T = p.createElement(
                "svg",
                {
                  ref: this.setSVGElement,
                  xmlns: "http://www.w3.org/2000/svg",
                  xmlnsXlink: "http://www.w3.org/1999/xlink",
                  width: "100%",
                  height: "100%",
                  style: { position: "absolute" },
                },
                p.createElement("defs", null, p.createElement(tD, { ...N }))
              )));
          }
          let z = { "data-framer-component-type": "SVG" },
            A = !w;
          A && Object.assign(z, uS(this.props.center));
          let H =
              !T &&
              !C.fill &&
              !C.background &&
              !C.backgroundImage &&
              a.length < uD &&
              !fD(a) &&
              !dD(a),
            L = null;
          if (H)
            ((C.backgroundSize = "100% 100%"),
              (C.backgroundImage = `url('data:image/svg+xml;utf8,${encodeURIComponent(a)}')`),
              Qi.unsubscribe(this.previouslyRenderedSVG),
              (this.previouslyRenderedSVG = ""));
          else {
            let N = S ? "svg" + S : null,
              $ = Qi.subscribe(a, !S, N);
            (Qi.unsubscribe(this.previouslyRenderedSVG),
              (this.previouslyRenderedSVG = a),
              hD(C) && (C.overflow = "hidden"),
              (L = p.createElement(
                p.Fragment,
                null,
                T,
                p.createElement("div", {
                  key: An.isImageObject(o) ? o.src : "",
                  className: "svgContainer",
                  style: I,
                  ref: this.container,
                  dangerouslySetInnerHTML: { __html: $ },
                })
              )));
          }
          let M = Fc(this.props.as),
            { href: D, target: P, rel: j, onClick: K } = this.props;
          return p.createElement(
            M,
            {
              ...z,
              ...x,
              layoutId: f,
              transformTemplate: A ? Lc(this.props.center) : void 0,
              id: n,
              ref: b,
              style: C,
              className: d,
              variants: m,
              tabIndex: this.props.tabIndex,
              role: c || u ? "img" : void 0,
              "aria-label": c,
              "aria-description": u,
              href: D,
              target: P,
              rel: j,
              onClick: K,
            },
            L,
            p.createElement(pD, null)
          );
        }
      }),
      R(e, "supportsConstraints", !0),
      R(e, "defaultSVGProps", {
        left: void 0,
        right: void 0,
        top: void 0,
        bottom: void 0,
        style: void 0,
        _constraints: { enabled: !0, aspectRatio: null },
        parentSize: 0,
        rotation: 0,
        visible: !0,
        svg: "",
        shadows: [],
      }),
      R(e, "defaultProps", { ...Da.defaultProps, ...e.defaultSVGProps }),
      e
    );
  })(),
  vD = /[&<>'"]/g,
  gD = (e) =>
    e.replace(
      vD,
      (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[t] || t
    ),
  yD =
    /(<([a-z]+)(?:\s+(?!href[\s=])[^=\s]+=(?:'[^']*'|"[^"]*"))*)(?:(\s+href\s*=)(?:'([^']*)'|"([^"]*)"))?((?:\s+[^=\s]+=(?:'[^']*'|"[^"]*"))*>)/gi;
function bD(e, t, n, r) {
  return e.replace(yD, (i, o, a, s, l, c, u) => {
    var f, d, m;
    if (a.toLowerCase() !== "a") return i;
    let y = l || c,
      b = gp(y.replace(/&amp;/g, "&"));
    if (!b || !b.target) return i;
    let S = t(b.target);
    if (!wx(S) || !wx(n)) return i;
    let h = S.path,
      v = n.path;
    if (!h || !v) return i;
    let g = ` data-framer-page-link-target="${b.target}"`,
      x = Rc(S, (f = b.element) != null ? f : void 0);
    x && (g += ` data-framer-page-link-element="${b.element}"`);
    let k = yp(y);
    if (!k || Ie(k)) return i;
    ew(n, k, r) && (g += " data-framer-page-link-current");
    let w = h,
      E = Object.assign({}, r, (d = b.collectionItem) == null ? void 0 : d.pathVariables);
    if (
      (Object.keys(E).length > 0 && (w = w.replace(ZS, (C, I) => "" + E[I])),
      (m = b.collectionItem) != null && m.pathVariables)
    ) {
      let C = new URLSearchParams(b.collectionItem.pathVariables);
      g += ` data-framer-page-link-path-variables="${C}"`;
    }
    return ((w = B1(v, w)), o + s + `"${gD(w + (x ? `#${x}` : ""))}"` + g + u);
  });
}
var xD = jt(Zh(), 1);
var eo = "CUSTOM;";
function SD(e, t) {
  if (!t) return e.substring(0, e.lastIndexOf("."));
  let n = t.font.preferredFamily === "" ? t.font.fontFamily : t.font.preferredFamily,
    r = t.font.preferredSubFamily === "" ? t.font.fontSubFamily : t.font.preferredSubFamily;
  return `${n} ${r}`;
}
var wD = class {
  constructor() {
    (R(this, "name", "custom"),
      R(this, "fontFamilies", []),
      R(this, "byFamilyName", new Map()),
      R(this, "assetsByFamily", new Map()));
  }
  importFonts(e) {
    ((this.fontFamilies.length = 0), this.byFamilyName.clear(), this.assetsByFamily.clear());
    let t = [];
    return (
      e.forEach((n) => {
        var r;
        if (!this.isValidCustomFontAsset(n)) return;
        let i = SD(n.name, n.properties),
          o = this.createFontFamily(i),
          a = {
            family: o,
            selector: `${eo}${i}`,
            variant: this.inferVariantName(i),
            postscriptName: (r = n.properties) == null ? void 0 : r.font.postscriptName,
            file: n.url,
          };
        (o.fonts.push(a),
          (o.owner = n.ownerType === "team" ? "team" : "project"),
          this.assetsByFamily.set(i, n),
          t.push(...o.fonts));
      }),
      t
    );
  }
  isValidCustomFontAsset(e) {
    var t;
    return !e.mimeType.startsWith("font/") ||
      ((t = e.properties) == null ? void 0 : t.kind) !== "font" ||
      !e.properties.font
      ? !1
      : "fontFamily" in e.properties.font;
  }
  inferVariantName(e) {
    let t = [
        "thin",
        "ultra light",
        "extra light",
        "light",
        "normal",
        "medium",
        "semi bold",
        "bold",
        "extra bold",
        "black",
      ],
      n = [...t.map((a) => `${a} italic`), ...t],
      r = e.toLowerCase(),
      i = [...r.split(" "), ...r.split("-"), ...r.split("_")],
      o = n.find((a) => i.includes(a) || i.includes(a.replace(/\s+/g, "")));
    return o ? o.replace(/(^\w|\s\w)/g, (a) => a.toUpperCase()) : "Regular";
  }
  createFontFamily(e) {
    let t = this.byFamilyName.get(e);
    if (t) return t;
    let n = { source: this.name, name: e, fonts: [] };
    return (this.addFontFamily(n), n);
  }
  addFontFamily(e) {
    (this.fontFamilies.push(e), this.byFamilyName.set(e.name, e));
  }
  parseSelector(e) {
    if (!e.startsWith(eo)) return null;
    let t = e.split(eo);
    return t[1] === void 0 ? null : { source: "custom", name: t[1] };
  }
  getFontBySelector(e, t = !0) {
    let n = this.parseSelector(e);
    if (!n || (!t && !this.byFamilyName.get(n.name))) return;
    let r = this.getFontFamilyByName(n.name).fonts;
    return (
      r.find((o) => {
        var a;
        return (a = o.file) == null ? void 0 : a.endsWith(".woff2");
      }) || r[0]
    );
  }
  getFontFamilyByName(e) {
    let t = this.byFamilyName.get(e);
    if (t) return t;
    let n = { source: "custom", name: e, fonts: [] };
    return (
      n.fonts.push({ selector: `${eo}${e}`, variant: this.inferVariantName(e), family: n }),
      n
    );
  }
};
function lw(e, t, n) {
  var r, i, o, a, s, l, c, u, f, d, m;
  if (t.length === 0) return {};
  let y = n(e);
  if (!y) return {};
  let { weight: b, style: S } = y,
    h = new Map(),
    v = new Map();
  t.forEach((w) => {
    let E = Ie(w) ? w : w.name.toLocaleLowerCase(),
      C = n(E);
    C &&
      (h.set(`${C.weight}-${C.style}`, E),
      !(C.weight <= b) && (v.has(C.style) || v.set(C.style, E)));
  });
  let g = v.get(S),
    x = (r = v.get("italic")) != null ? r : v.get("oblique");
  y.weight <= 300
    ? ((g = (i = h.get(`400-${S}`)) != null ? i : g),
      (x = (a = (o = h.get("400-italic")) != null ? o : h.get("400-oblique")) != null ? a : x))
    : y.weight <= 500
      ? ((g = (s = h.get(`700-${S}`)) != null ? s : g),
        (x = (c = (l = h.get("700-italic")) != null ? l : h.get("700-oblique")) != null ? c : x))
      : ((g = (u = h.get(`900-${S}`)) != null ? u : g),
        (x = (d = (f = h.get("900-italic")) != null ? f : h.get("900-oblique")) != null ? d : x));
  let k = (m = h.get(`${b}-italic`)) != null ? m : h.get(`${b}-oblique`);
  return { variantBold: g, variantItalic: k, variantBoldItalic: x };
}
var kD = ["display", "sans", "serif", "slab", "handwritten", "script"];
function CD(e) {
  return e
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(ED);
}
function ED(e) {
  return kD.includes(e);
}
var mc = "FS;",
  cw = {
    thin: 100,
    hairline: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    ultra: 800,
    black: 900,
    heavy: 900,
  },
  uw = Object.keys(cw),
  TD = new RegExp(`^(${[...uw, "italic"].join("|")})`),
  xr = class {
    constructor() {
      (R(this, "name", "fontshare"),
        R(this, "fontFamilies", []),
        R(this, "byFamilyName", new Map()));
    }
    getFontFamilyByName(e) {
      var t;
      return (t = this.byFamilyName.get(e)) != null ? t : null;
    }
    static parseVariant(e) {
      let t = e.split(" "),
        n = uw.find((a) => t.includes(a)),
        r = e.includes("italic") ? "italic" : "normal";
      return { weight: (n && cw[n]) || 400, style: r === "italic" ? r : "normal" };
    }
    parseSelector(e) {
      if (!e.startsWith(mc)) return null;
      let t = e.split("-");
      if (t.length !== 2) return null;
      let [n, r] = t;
      return !n || !r ? null : { name: n.replace(mc, ""), variant: r, source: this.name };
    }
    static createSelector(e, t) {
      return `${mc}${e}-${t}`;
    }
    addFontFamily(e) {
      (this.fontFamilies.push(e), this.byFamilyName.set(e.name, e));
    }
    importFonts(e) {
      ((this.fontFamilies.length = 0), this.byFamilyName.clear());
      let t = [];
      for (let n of e) {
        let r = n.font_styles.filter((i) => {
          let o = i.name.toLowerCase();
          return !(!TD.exec(o) || o.endsWith("wide"));
        });
        for (let i of r) {
          let { name: o } = n,
            a = i.name.toLowerCase(),
            s = this.getFontFamilyByName(o);
          s || ((s = { name: o, fonts: [], source: this.name }), this.addFontFamily(s));
          let l = xr.createSelector(o, a),
            c = xr.parseVariant(a) || { weight: void 0, style: void 0 },
            { weight: u, style: f } = c,
            { variantBold: d, variantBoldItalic: m, variantItalic: y } = lw(a, r, xr.parseVariant),
            b = {
              family: s,
              variant: a,
              selector: l,
              selectorBold: d ? xr.createSelector(o, d) : void 0,
              selectorBoldItalic: m ? xr.createSelector(o, m) : void 0,
              selectorItalic: y ? xr.createSelector(o, y) : void 0,
              weight: u,
              style: f,
              file: i.file,
              category: ID(n.category),
            };
          (s.fonts.push(b), t.push(b));
        }
      }
      return t;
    }
  };
function ID(e) {
  let t = {
      serif: "serif",
      sans: "sans-serif",
      slab: "slab",
      display: "display",
      handwritten: "handwriting",
      script: "handwriting",
    },
    n = CD(e)[0];
  return n && t[n];
}
var vc = "GF;",
  Sr = class {
    constructor() {
      (R(this, "name", "google"), R(this, "fontFamilies", []), R(this, "byFamilyName", new Map()));
    }
    getFontFamilyByName(e) {
      var t;
      return (t = this.byFamilyName.get(e)) != null ? t : null;
    }
    static parseVariant(e) {
      if (e === "regular") return { style: "normal", weight: 400 };
      let t = /([0-9]*)(normal|italic)?/.exec(e);
      if (!t) return null;
      let n = parseInt(t[1] || "400"),
        r = t[2] === "italic" ? "italic" : "normal";
      return { weight: n, style: r };
    }
    parseSelector(e) {
      if (!e.startsWith(vc)) return null;
      let t = e.split("-");
      if (t.length !== 2) return null;
      let [n, r] = t;
      return !n || !r ? null : { name: n.replace(vc, ""), variant: r, source: this.name };
    }
    static createSelector(e, t) {
      return `${vc}${e}-${t}`;
    }
    addFontFamily(e) {
      let t = { name: e, fonts: [], source: this.name };
      return (this.fontFamilies.push(t), this.byFamilyName.set(t.name, t), t);
    }
    importFonts(e) {
      ((this.fontFamilies.length = 0), this.byFamilyName.clear());
      let t = [];
      return (
        e.forEach((n) => {
          n.variants.forEach((r) => {
            var i, o;
            let a = n.family,
              s = this.getFontFamilyByName(a);
            s || (s = this.addFontFamily(a));
            let l = (i = Sr.parseVariant(r)) != null ? i : {},
              { weight: c, style: u } = l,
              f = Sr.createSelector(a, r),
              {
                variantBold: d,
                variantItalic: m,
                variantBoldItalic: y,
              } = lw(r, n.variants, Sr.parseVariant),
              b = {
                family: s,
                variant: r,
                selector: f,
                selectorBold: d ? Sr.createSelector(a, d) : void 0,
                selectorBoldItalic: y ? Sr.createSelector(a, y) : void 0,
                selectorItalic: m ? Sr.createSelector(a, m) : void 0,
                weight: c,
                style: u,
                category: RD(n.category),
                file: (o = n.files[r]) == null ? void 0 : o.replace("http://", "https://"),
              };
            (s.fonts.push(b), t.push(b));
          });
        }),
        t
      );
    }
  };
function RD(e) {
  let t = {
    serif: "serif",
    "sans-serif": "sans-serif",
    display: "display",
    handwriting: "handwriting",
    monospace: "monospace",
  };
  if (e) return t[e];
}
var PD = jt(F_(), 1),
  P1 = 5e3,
  _D = 3,
  fw = class extends Error {
    constructor(e) {
      (super(e), (this.name = "FontLoadingError"));
    }
  },
  Bh = new Map(),
  zh = new Map(),
  FD = (e, t) => dw(e, t);
async function dw(e, t, n = 0) {
  let { family: r, url: i, stretch: o, unicodeRange: a } = e,
    s = e.weight || 500,
    l = e.style || "normal",
    c = `${r}-${l}-${s}-${i}`;
  if (!Bh.has(c) || n > 0) {
    let u = new FontFace(r, `url(${i})`, {
        weight: Ie(s) ? s : s?.toString(),
        style: l,
        stretch: o,
        unicodeRange: a,
      }),
      f = u
        .load()
        .then(() => (t.fonts.add(u), hw(r, l, s)))
        .catch((d) => {
          if (d.name !== "NetworkError") throw d;
          if (n < _D) return dw(e, t, n + 1);
          throw new fw(
            `Font loading failed after ${n} retries due to network error: ${JSON.stringify({ family: r, style: l, weight: s, url: i, stretch: o, unicodeRange: a })}`
          );
        });
    Bh.set(c, f);
  }
  await Bh.get(c);
}
async function hw(e, t, n) {
  let r = `${e}-${t}-${n}`;
  if (!zh.has(r)) {
    let o = new PD.default(e, { style: t, weight: n }).load(null, P1);
    zh.set(r, o);
  }
  try {
    await zh.get(r);
  } catch {
    throw new fw(
      `Failed to check if font is ready (${P1}ms timeout exceeded): ${JSON.stringify({ family: e, style: t, weight: n })}`
    );
  }
}
var LD = {
    Arial: {
      Regular: { selector: "Arial", weight: void 0 },
      Black: { selector: "Arial-Black", weight: void 0 },
      Narrow: { selector: "Arial Narrow", weight: void 0 },
      "Rounded Bold": { selector: "Arial Rounded MT Bold", weight: void 0 },
    },
    Avenir: {
      Book: { selector: "Avenir", weight: void 0 },
      Light: { selector: "Avenir-Light", weight: void 0 },
      Medium: { selector: "Avenir-Medium", weight: void 0 },
      Heavy: { selector: "Avenir-Heavy", weight: void 0 },
      Black: { selector: "Avenir-Black", weight: void 0 },
    },
    "Avenir Next": {
      Regular: { selector: "Avenir Next", weight: void 0 },
      "Ultra Light": { selector: "AvenirNext-UltraLight", weight: void 0 },
      Medium: { selector: "AvenirNext-Medium", weight: void 0 },
      "Demi Bold": { selector: "AvenirNext-DemiBold", weight: void 0 },
      Heavy: { selector: "AvenirNext-Heavy", weight: void 0 },
    },
    "Avenir Next Condensed": {
      Regular: { selector: "Avenir Next Condensed", weight: void 0 },
      "Ultra Light": { selector: "AvenirNextCondensed-UltraLight", weight: void 0 },
      Medium: { selector: "AvenirNextCondensed-Medium", weight: void 0 },
      "Demi Bold": { selector: "AvenirNextCondensed-DemiBold", weight: void 0 },
      Heavy: { selector: "AvenirNextCondensed-Heavy", weight: void 0 },
    },
    Baskerville: {
      Regular: { selector: "Baskerville", weight: void 0 },
      "Semi Bold": { selector: "Baskerville-SemiBold", weight: void 0 },
    },
    "Bodoni 72": {
      Book: { selector: "Bodoni 72", weight: void 0 },
      Oldstyle: { selector: "Bodoni 72 Oldstyle", weight: void 0 },
      Smallcaps: { selector: "Bodoni 72 Smallcaps", weight: void 0 },
    },
    Courier: { Regular: { selector: "Courier", weight: void 0 } },
    "Courier New": { Regular: { selector: "Courier New", weight: void 0 } },
    Futura: {
      Medium: { selector: "Futura", weight: void 0 },
      Condensed: { selector: "Futura-CondensedMedium", weight: void 0 },
      "Condensed ExtraBold": { selector: "Futura-CondensedExtraBold", weight: void 0 },
    },
    Georgia: { Regular: { selector: "Georgia", weight: void 0 } },
    "Gill Sans": {
      Regular: { selector: "Gill Sans", weight: void 0 },
      Light: { selector: "GillSans-Light", weight: void 0 },
      SemiBold: { selector: "GillSans-SemiBold", weight: void 0 },
      UltraBold: { selector: "GillSans-UltraBold", weight: void 0 },
    },
    Helvetica: {
      Regular: { selector: "Helvetica", weight: void 0 },
      Light: { selector: "Helvetica-Light", weight: void 0 },
      Bold: { selector: "Helvetica-Bold", weight: void 0 },
      Oblique: { selector: "Helvetica-Oblique", weight: void 0 },
      "Light Oblique": { selector: "Helvetica-LightOblique", weight: void 0 },
      "Bold Oblique": { selector: "Helvetica-BoldOblique", weight: void 0 },
    },
    "Helvetica Neue": {
      Regular: { selector: "Helvetica Neue", weight: void 0 },
      UltraLight: { selector: "HelveticaNeue-UltraLight", weight: void 0 },
      Thin: { selector: "HelveticaNeue-Thin", weight: void 0 },
      Light: { selector: "HelveticaNeue-Light", weight: void 0 },
      Medium: { selector: "HelveticaNeue-Medium", weight: void 0 },
      Bold: { selector: "HelveticaNeue-Bold", weight: void 0 },
      Italic: { selector: "HelveticaNeue-Italic", weight: void 0 },
      "UltraLight Italic": { selector: "HelveticaNeue-UltraLightItalic", weight: void 0 },
      "Thin Italic": { selector: "HelveticaNeue-ThinItalic", weight: void 0 },
      "Light Italic": { selector: "HelveticaNeue-LightItalic", weight: void 0 },
      "Medium Italic": { selector: "HelveticaNeue-MediumItalic", weight: void 0 },
      "Bold Italic": { selector: "HelveticaNeue-BoldItalic", weight: void 0 },
      "Condensed Bold": { selector: "HelveticaNeue-CondensedBold", weight: void 0 },
      "Condensed Black": { selector: "HelveticaNeue-CondensedBlack", weight: void 0 },
    },
    "Hoefler Text": { Regular: { selector: "Hoefler Text", weight: void 0 } },
    Impact: { Regular: { selector: "Impact", weight: void 0 } },
    "Lucida Grande": { Regular: { selector: "Lucida Grande", weight: void 0 } },
    Menlo: { Regular: { selector: "Menlo", weight: void 0 } },
    Monaco: { Regular: { selector: "Monaco", weight: void 0 } },
    Optima: {
      Regular: { selector: "Optima", weight: void 0 },
      ExtraBlack: { selector: "Optima-ExtraBlack", weight: void 0 },
    },
    Palatino: { Regular: { selector: "Palatino", weight: void 0 } },
    "SF Pro Display": {
      Regular: { selector: "__SF-UI-Display-Regular__", weight: 400 },
      Ultralight: { selector: "__SF-UI-Display-Ultralight__", weight: 100 },
      Thin: { selector: "__SF-UI-Display-Thin__", weight: 200 },
      Light: { selector: "__SF-UI-Display-Light__", weight: 300 },
      Medium: { selector: "__SF-UI-Display-Medium__", weight: 500 },
      Semibold: { selector: "__SF-UI-Display-Semibold__", weight: 600 },
      Bold: { selector: "__SF-UI-Display-Bold__", weight: 700 },
      Heavy: { selector: "__SF-UI-Display-Heavy__", weight: 800 },
      Black: { selector: "__SF-UI-Display-Black__", weight: 900 },
      Italic: { selector: "__SF-UI-Display-Italic__", weight: 400 },
      "Ultralight Italic": { selector: "__SF-UI-Display-Ultralight-Italic__", weight: 100 },
      "Thin Italic": { selector: "__SF-UI-Display-Thin-Italic__", weight: 200 },
      "Light Italic": { selector: "__SF-UI-Display-Light-Italic__", weight: 300 },
      "Medium Italic": { selector: "__SF-UI-Display-Medium-Italic__", weight: 500 },
      "Semibold Italic": { selector: "__SF-UI-Display-Semibold-Italic__", weight: 600 },
      "Bold Italic": { selector: "__SF-UI-Display-Bold-Italic__", weight: 700 },
      "Heavy Italic": { selector: "__SF-UI-Display-Heavy-Italic__", weight: 800 },
      "Black Italic": { selector: "__SF-UI-Display-Black-Italic__", weight: 900 },
    },
    "SF Pro Display Condensed": {
      Regular: { selector: "__SF-UI-Display-Condensed-Regular__", weight: 400 },
      Ultralight: { selector: "__SF-UI-Display-Condensed-Ultralight__", weight: 100 },
      Thin: { selector: "__SF-UI-Display-Condensed-Thin__", weight: 200 },
      Light: { selector: "__SF-UI-Display-Condensed-Light__", weight: 300 },
      Medium: { selector: "__SF-UI-Display-Condensed-Medium__", weight: 500 },
      Semibold: { selector: "__SF-UI-Display-Condensed-Semibold__", weight: 600 },
      Bold: { selector: "__SF-UI-Display-Condensed-Bold__", weight: 700 },
      Heavy: { selector: "__SF-UI-Display-Condensed-Heavy__", weight: 800 },
      Black: { selector: "__SF-UI-Display-Condensed-Black__", weight: 900 },
    },
    "SF Pro Text": {
      Regular: { selector: "__SF-UI-Text-Regular__", weight: 400 },
      Light: { selector: "__SF-UI-Text-Light__", weight: 200 },
      Medium: { selector: "__SF-UI-Text-Medium__", weight: 500 },
      Semibold: { selector: "__SF-UI-Text-Semibold__", weight: 600 },
      Bold: { selector: "__SF-UI-Text-Bold__", weight: 700 },
      Heavy: { selector: "__SF-UI-Text-Heavy__", weight: 800 },
      Italic: { selector: "__SF-UI-Text-Italic__", weight: 400 },
      "Light Italic": { selector: "__SF-UI-Text-Light-Italic__", weight: 200 },
      "Medium Italic": { selector: "__SF-UI-Text-Medium-Italic__", weight: 500 },
      "Semibold Italic": { selector: "__SF-UI-Text-Semibold-Italic__", weight: 600 },
      "Bold Italic": { selector: "__SF-UI-Text-Bold-Italic__", weight: 700 },
      "Heavy Italic": { selector: "__SF-UI-Text-Heavy-Italic__", weight: 800 },
    },
    "SF Pro Text Condensed": {
      Regular: { selector: "__SF-UI-Text-Condensed-Regular__", weight: 400 },
      Light: { selector: "__SF-UI-Text-Condensed-Light__", weight: 200 },
      Medium: { selector: "__SF-UI-Text-Condensed-Medium__", weight: 500 },
      Semibold: { selector: "__SF-UI-Text-Condensed-Semibold__", weight: 600 },
      Bold: { selector: "__SF-UI-Text-Condensed-Bold__", weight: 700 },
      Heavy: { selector: "__SF-UI-Text-Condensed-Heavy__", weight: 800 },
    },
    Tahoma: { Regular: { selector: "Tahoma", weight: void 0 } },
    Times: { Regular: { selector: "Times", weight: void 0 } },
    "Times New Roman": { Regular: { selector: "Times New Roman", weight: void 0 } },
    Trebuchet: { Regular: { selector: "Trebuchet MS", weight: void 0 } },
    Verdana: { Regular: { selector: "Verdana", weight: void 0 } },
  },
  MD = {
    "__SF-Compact-Display-Regular__": "SFCompactDisplay-Regular|.SFCompactDisplay-Regular",
    "__SF-Compact-Display-Ultralight__": "SFCompactDisplay-Ultralight|.SFCompactDisplay-Ultralight",
    "__SF-Compact-Display-Thin__": "SFCompactDisplay-Thin|.SFCompactDisplay-Thin",
    "__SF-Compact-Display-Light__": "SFCompactDisplay-Light|.SFCompactDisplay-Light",
    "__SF-Compact-Display-Medium__": "SFCompactDisplay-Medium|.SFCompactDisplay-Medium",
    "__SF-Compact-Display-Semibold__": "SFCompactDisplay-Semibold|.SFCompactDisplay-Semibold",
    "__SF-Compact-Display-Heavy__": "SFCompactDisplay-Heavy|.SFCompactDisplay-Heavy",
    "__SF-Compact-Display-Black__": "SFCompactDisplay-Black|.SFCompactDisplay-Black",
    "__SF-Compact-Display-Bold__": "SFCompactDisplay-Bold|.SFCompactDisplay-Bold",
    "__SF-UI-Text-Regular__": ".SFNSText|SFProText-Regular|SFUIText-Regular|.SFUIText",
    "__SF-UI-Text-Light__": ".SFNSText-Light|SFProText-Light|SFUIText-Light|.SFUIText-Light",
    "__SF-UI-Text-Medium__": ".SFNSText-Medium|SFProText-Medium|SFUIText-Medium|.SFUIText-Medium",
    "__SF-UI-Text-Semibold__":
      ".SFNSText-Semibold|SFProText-Semibold|SFUIText-Semibold|.SFUIText-Semibold",
    "__SF-UI-Text-Bold__": ".SFNSText-Bold|SFProText-Bold|SFUIText-Bold|.SFUIText-Bold",
    "__SF-UI-Text-Heavy__": ".SFNSText-Heavy|SFProText-Heavy|.SFUIText-Heavy",
    "__SF-UI-Text-Italic__": ".SFNSText-Italic|SFProText-Italic|SFUIText-Italic|.SFUIText-Italic",
    "__SF-UI-Text-Light-Italic__":
      ".SFNSText-LightItalic|SFProText-LightItalic|SFUIText-LightItalic|.SFUIText-LightItalic",
    "__SF-UI-Text-Medium-Italic__":
      ".SFNSText-MediumItalic|SFProText-MediumItalic|SFUIText-MediumItalic|.SFUIText-MediumItalic",
    "__SF-UI-Text-Semibold-Italic__":
      ".SFNSText-SemiboldItalic|SFProText-SemiboldItalic|SFUIText-SemiboldItalic|.SFUIText-SemiboldItalic",
    "__SF-UI-Text-Bold-Italic__":
      ".SFNSText-BoldItalic|SFProText-BoldItalic|SFUIText-BoldItalic|.SFUIText-BoldItalic",
    "__SF-UI-Text-Heavy-Italic__":
      ".SFNSText-HeavyItalic|SFProText-HeavyItalic|.SFUIText-HeavyItalic",
    "__SF-Compact-Text-Regular__": "SFCompactText-Regular|.SFCompactText-Regular",
    "__SF-Compact-Text-Light__": "SFCompactText-Light|.SFCompactText-Light",
    "__SF-Compact-Text-Medium__": "SFCompactText-Medium|.SFCompactText-Medium",
    "__SF-Compact-Text-Semibold__": "SFCompactText-Semibold|.SFCompactText-Semibold",
    "__SF-Compact-Text-Bold__": "SFCompactText-Bold|.SFCompactText-Bold",
    "__SF-Compact-Text-Heavy__": "SFCompactText-Heavy|.SFCompactText-Heavy",
    "__SF-Compact-Text-Italic__": "SFCompactText-Italic|.SFCompactText-Italic",
    "__SF-Compact-Text-Light-Italic__": "SFCompactText-LightItalic|.SFCompactText-LightItalic",
    "__SF-Compact-Text-Medium-Italic__": "SFCompactText-MediumItalic|.SFCompactText-MediumItalic",
    "__SF-Compact-Text-Semibold-Italic__":
      "SFCompactText-SemiboldItalic|.SFCompactText-SemiboldItalic",
    "__SF-Compact-Text-Bold-Italic__": "SFCompactText-BoldItalic|.SFCompactText-BoldItalic",
    "__SF-Compact-Text-Heavy-Italic__": "SFCompactText-HeavyItalic|.SFCompactText-HeavyItalic",
    "__SF-UI-Display-Condensed-Regular__":
      ".SFNSDisplayCondensed-Regular|SFUIDisplayCondensed-Regular|.SFUIDisplayCondensed-Regular",
    "__SF-UI-Display-Condensed-Ultralight__":
      ".SFNSDisplayCondensed-Ultralight|SFUIDisplayCondensed-Ultralight|.SFUIDisplayCondensed-Ultralight",
    "__SF-UI-Display-Condensed-Thin__":
      ".SFNSDisplayCondensed-Thin|SFUIDisplayCondensed-Thin|.SFUIDisplayCondensed-Thin",
    "__SF-UI-Display-Condensed-Light__":
      ".SFNSDisplayCondensed-Light|SFUIDisplayCondensed-Light|.SFUIDisplayCondensed-Light",
    "__SF-UI-Display-Condensed-Medium__":
      ".SFNSDisplayCondensed-Medium|SFUIDisplayCondensed-Medium|.SFUIDisplayCondensed-Medium",
    "__SF-UI-Display-Condensed-Semibold__":
      ".SFNSDisplayCondensed-Semibold|SFUIDisplayCondensed-Semibold|.SFUIDisplayCondensed-Semibold",
    "__SF-UI-Display-Condensed-Bold__":
      ".SFNSDisplayCondensed-Bold|SFUIDisplayCondensed-Bold|.SFUIDisplayCondensed-Bold",
    "__SF-UI-Display-Condensed-Heavy__":
      ".SFNSDisplayCondensed-Heavy|SFUIDisplayCondensed-Heavy|.SFUIDisplayCondensed-Heavy",
    "__SF-UI-Display-Condensed-Black__": ".SFNSDisplayCondensed-Black|.SFUIDisplayCondensed-Black",
    "__SF-UI-Display-Regular__":
      ".SFNSDisplay|SFProDisplay-Regular|SFUIDisplay-Regular|.SFUIDisplay",
    "__SF-UI-Display-Ultralight__":
      ".SFNSDisplay-Ultralight|SFProDisplay-Ultralight|SFUIDisplay-Ultralight|.SFUIDisplay-Ultralight",
    "__SF-UI-Display-Thin__":
      ".SFNSDisplay-Thin|SFProDisplay-Thin|SFUIDisplay-Thin|.SFUIDisplay-Thin",
    "__SF-UI-Display-Light__":
      ".SFNSDisplay-Light|SFProDisplay-Light|SFUIDisplay-Light|.SFUIDisplay-Light",
    "__SF-UI-Display-Medium__":
      ".SFNSDisplay-Medium|SFProDisplay-Medium|SFUIDisplay-Medium|.SFUIDisplay-Medium",
    "__SF-UI-Display-Semibold__":
      ".SFNSDisplay-Semibold|SFProDisplay-Semibold|SFUIDisplay-Semibold|.SFUIDisplay-Semibold",
    "__SF-UI-Display-Bold__":
      ".SFNSDisplay-Bold|SFProDisplay-Bold|SFUIDisplay-Bold|.SFUIDisplay-Bold",
    "__SF-UI-Display-Heavy__":
      ".SFNSDisplay-Heavy|SFProDisplay-Heavy|SFUIDisplay-Heavy|.SFUIDisplay-Heavy",
    "__SF-UI-Display-Black__": ".SFNSDisplay-Black|SFProDisplay-Black|.SFUIDisplay-Black",
    "__SF-UI-Display-Italic__": ".SFNSDisplay-Italic|SFProDisplay-Italic|SFUIDisplay-Italic",
    "__SF-UI-Display-Ultralight-Italic__":
      ".SFNSDisplay-UltralightItalic|SFProDisplay-UltralightItalic|SFUIDisplay-UltralightItalic|.SFUIDisplay-UltralightItalic",
    "__SF-UI-Display-Thin-Italic__":
      ".SFNSDisplay-ThinItalic|SFProDisplay-ThinItalic|SFUIDisplay-ThinItalic|.SFUIDisplay-ThinItalic",
    "__SF-UI-Display-Light-Italic__":
      ".SFNSDisplay-LightItalic|SFProDisplay-LightItalic|SFUIDisplay-LightItalic|.SFUIDisplay-LightItalic",
    "__SF-UI-Display-Medium-Italic__":
      ".SFNSDisplay-MediumItalic|SFProDisplay-MediumItalic|SFUIDisplay-MediumItalic|.SFUIDisplay-MediumItalic",
    "__SF-UI-Display-Semibold-Italic__":
      ".SFNSDisplay-SemiboldItalic|SFProDisplay-SemiboldItalic|SFUIDisplay-SemiboldItalic|.SFUIDisplay-SemiboldItalic",
    "__SF-UI-Display-Bold-Italic__":
      ".SFNSDisplay-BoldItalic|SFProDisplay-BoldItalic|SFUIDisplay-BoldItalic|.SFUIDisplay-BoldItalic",
    "__SF-UI-Display-Heavy-Italic__":
      ".SFNSDisplay-HeavyItalic|SFProDisplay-HeavyItalic|SFUIDisplay-HeavyItalic|.SFUIDisplay-HeavyItalic",
    "__SF-UI-Display-Black-Italic__":
      ".SFNSDisplay-BlackItalic|SFProDisplay-BlackItalic|.SFUIDisplay-BlackItalic",
    "__SF-UI-Text-Condensed-Regular__":
      ".SFNSTextCondensed-Regular|SFUITextCondensed-Regular|.SFUITextCondensed-Regular",
    "__SF-UI-Text-Condensed-Light__":
      ".SFNSTextCondensed-Light|SFUITextCondensed-Light|.SFUITextCondensed-Light",
    "__SF-UI-Text-Condensed-Medium__":
      ".SFNSTextCondensed-Medium|SFUITextCondensed-Medium|.SFUITextCondensed-Medium",
    "__SF-UI-Text-Condensed-Semibold__":
      ".SFNSTextCondensed-Semibold|SFUITextCondensed-Semibold|.SFUITextCondensed-Semibold",
    "__SF-UI-Text-Condensed-Bold__":
      ".SFNSTextCondensed-Bold|SFUITextCondensed-Bold|.SFUITextCondensed-Bold",
    "__SF-UI-Text-Condensed-Heavy__": ".SFNSTextCondensed-Heavy|.SFUITextCondensed-Heavy",
    "__SF-Compact-Rounded-Regular__": "SFCompactRounded-Regular|.SFCompactRounded-Regular",
    "__SF-Compact-Rounded-Ultralight__": "SFCompactRounded-Ultralight|.SFCompactRounded-Ultralight",
    "__SF-Compact-Rounded-Thin__": "SFCompactRounded-Thin|.SFCompactRounded-Thin",
    "__SF-Compact-Rounded-Light__": "SFCompactRounded-Light|.SFCompactRounded-Light",
    "__SF-Compact-Rounded-Medium__": "SFCompactRounded-Medium|.SFCompactRounded-Medium",
    "__SF-Compact-Rounded-Semibold__": "SFCompactRounded-Semibold|.SFCompactRounded-Semibold",
    "__SF-Compact-Rounded-Bold__": "SFCompactRounded-Bold|.SFCompactRounded-Bold",
    "__SF-Compact-Rounded-Heavy__": "SFCompactRounded-Heavy|.SFCompactRounded-Heavy",
    "__SF-Compact-Rounded-Black__": "SFCompactRounded-Black|.SFCompactRounded-Black",
  },
  _1 = LD,
  OD = "System Default",
  VD = class {
    constructor() {
      (R(this, "name", "local"),
        R(this, "fontFamilies", []),
        R(this, "byFamilyName", new Map()),
        R(this, "fontAliasBySelector", new Map()),
        R(this, "fontAliases", new Map()),
        R(this, "interFontSelectors", new Set()));
    }
    getFontFamilyByName(e) {
      var t;
      return (t = this.byFamilyName.get(e)) != null ? t : null;
    }
    createFontFamily(e) {
      let t = { name: e, fonts: [], source: this.name };
      return (this.addFontFamily(t), t);
    }
    addFontFamily(e) {
      (this.fontFamilies.push(e), this.byFamilyName.set(e.name, e));
    }
    importFonts() {
      let e = [];
      for (let i of Object.keys(_1)) {
        let o = _1[i];
        if (!o) continue;
        let a = this.createFontFamily(i);
        for (let s of Object.keys(o)) {
          let l = o[s];
          if (!l) continue;
          let { selector: c, weight: u } = l,
            f = { variant: s, selector: c, weight: u, family: a };
          a.fonts.push(f);
        }
        e.push(...a.fonts);
      }
      for (let [i, o] of Object.entries(MD)) this.addFontAlias(i, o);
      let { fontFamily: t, aliases: n } = this.getSystemFontFamily();
      this.addFontFamily(t);
      for (let [i, o] of n) this.addFontAlias(i, o);
      e.push(...t.fonts);
      let r = this.importInterFontFamily();
      return (e.push(...r.fonts), e);
    }
    importInterFontFamily() {
      let e = [
          {
            variant: "Regular",
            selector: "Inter",
            weight: 400,
            selectorBold: "Inter-Bold",
            selectorBoldItalic: "Inter-BoldItalic",
            selectorItalic: "Inter-Italic",
          },
          {
            variant: "Thin",
            selector: "Inter-Thin",
            weight: 100,
            selectorBold: "Inter",
            selectorBoldItalic: "Inter-Italic",
            selectorItalic: "Inter-ThinItalic",
          },
          {
            variant: "Extra Light",
            selector: "Inter-ExtraLight",
            weight: 200,
            selectorBold: "Inter",
            selectorBoldItalic: "Inter-Italic",
            selectorItalic: "Inter-ExtraLightItalic",
          },
          {
            variant: "Light",
            selector: "Inter-Light",
            weight: 300,
            selectorBold: "Inter",
            selectorBoldItalic: "Inter-Italic",
            selectorItalic: "Inter-LightItalic",
          },
          {
            variant: "Medium",
            selector: "Inter-Medium",
            weight: 500,
            selectorBold: "Inter-Bold",
            selectorBoldItalic: "Inter-BoldItalic",
            selectorItalic: "Inter-MediumItalic",
          },
          {
            variant: "Semibold",
            selector: "Inter-SemiBold",
            weight: 600,
            selectorBold: "Inter-Black",
            selectorBoldItalic: "Inter-BlackItalic",
            selectorItalic: "Inter-SemiBoldItalic",
          },
          {
            variant: "Bold",
            selector: "Inter-Bold",
            weight: 700,
            selectorBold: "Inter-Black",
            selectorBoldItalic: "Inter-BlackItalic",
            selectorItalic: "Inter-BoldItalic",
          },
          {
            variant: "Extra Bold",
            selector: "Inter-ExtraBold",
            weight: 800,
            selectorBold: "Inter-Black",
            selectorBoldItalic: "Inter-BlackItalic",
            selectorItalic: "Inter-ExtraBoldItalic",
          },
          {
            variant: "Black",
            selector: "Inter-Black",
            weight: 900,
            selectorBold: void 0,
            selectorBoldItalic: "Inter-BlackItalic",
            selectorItalic: void 0,
          },
          {
            variant: "Thin Italic",
            selector: "Inter-ThinItalic",
            weight: 100,
            selectorBold: "Inter-Italic",
            selectorBoldItalic: "Inter-Italic",
            selectorItalic: "Inter-ThinItalic",
          },
          {
            variant: "Extra Light Italic",
            selector: "Inter-ExtraLightItalic",
            weight: 200,
            selectorBold: "Inter-Italic",
            selectorBoldItalic: "Inter-Italic",
            selectorItalic: "Inter-ExtraLightItalic",
          },
          {
            variant: "Light Italic",
            selector: "Inter-LightItalic",
            weight: 300,
            selectorBold: "Inter-Italic",
            selectorBoldItalic: "Inter-Italic",
            selectorItalic: "Inter-LightItalic",
          },
          {
            variant: "Italic",
            selector: "Inter-Italic",
            weight: 400,
            selectorBold: "Inter-BoldItalic",
            selectorBoldItalic: "Inter-BoldItalic",
            selectorItalic: "Inter-Italic",
          },
          {
            variant: "Medium Italic",
            selector: "Inter-MediumItalic",
            weight: 500,
            selectorBold: "Inter-BoldItalic",
            selectorBoldItalic: "Inter-BoldItalic",
            selectorItalic: "Inter-MediumItalic",
          },
          {
            variant: "Semibold Italic",
            selector: "Inter-SemiBoldItalic",
            weight: 600,
            selectorBold: "Inter-BoldItalic",
            selectorBoldItalic: "Inter-BoldItalic",
            selectorItalic: "Inter-SemiBoldItalic",
          },
          {
            variant: "Bold Italic",
            selector: "Inter-BoldItalic",
            weight: 700,
            selectorBold: "Inter-BlackItalic",
            selectorBoldItalic: "Inter-BlackItalic",
            selectorItalic: "Inter-BoldItalic",
          },
          {
            variant: "Extra Bold Italic",
            selector: "Inter-ExtraBoldItalic",
            weight: 800,
            selectorBold: "Inter-BlackItalic",
            selectorBoldItalic: "Inter-BlackItalic",
            selectorItalic: "Inter-ExtraBoldItalic",
          },
          {
            variant: "Black Italic",
            selector: "Inter-BlackItalic",
            weight: 900,
            selectorBold: void 0,
            selectorBoldItalic: void 0,
            selectorItalic: "Inter-BlackItalic",
          },
        ],
        t = this.createFontFamily("Inter");
      for (let n of e) {
        let {
            variant: r,
            selector: i,
            weight: o,
            selectorBold: a,
            selectorBoldItalic: s,
            selectorItalic: l,
          } = n,
          c = {
            variant: r,
            selector: i,
            selectorBold: a,
            selectorBoldItalic: s,
            selectorItalic: l,
            weight: o,
            family: t,
            style: /italic/i.test(i) ? "italic" : "normal",
          };
        t.fonts.push(c);
      }
      return (t.fonts.forEach((n) => this.interFontSelectors.add(n.selector)), t);
    }
    addFontAlias(e, t) {
      (this.fontAliases.set(e, t), this.fontAliasBySelector.set(t, e));
    }
    getSystemFontFamily() {
      let e =
          "system-ui|-apple-system|BlinkMacSystemFont|Segoe UI|Roboto|Oxygen|Ubuntu|Cantarell|Fira Sans|Droid Sans|Helvetica Neue|sans-serif",
        t = { name: OD, fonts: [], source: this.name },
        n = new Map(),
        r = [400, 100, 200, 300, 500, 600, 700, 800, 900],
        i = ["normal", "italic"];
      for (let o of i)
        for (let a of r) {
          let s = AD(a, o),
            l = `__SystemDefault-${a}-${o}__`,
            c = { variant: s, selector: l, style: o, weight: a, family: t };
          (t.fonts.push(c), n.set(l, e));
        }
      return { fontFamily: t, aliases: n };
    }
    getFontAliasBySelector(e) {
      return this.fontAliasBySelector.get(e) || null;
    }
    getFontSelectorByAlias(e) {
      return this.fontAliases.get(e) || null;
    }
    isFontFamilyAlias(e) {
      return !!(e && e.match(/^__.*__$/));
    }
  },
  F1 = {
    100: "Thin",
    200: "Extra Light",
    300: "Light",
    400: "Normal",
    500: "Medium",
    600: "Semi Bold",
    700: "Bold",
    800: "Extra Bold",
    900: "Black",
  };
function AD(e, t) {
  let n = t === "normal" ? "Regular" : "Italic";
  return e === 400 ? n : t !== "normal" ? `${F1[e]} ${n}` : `${F1[e]}`;
}
var DD = class {
    constructor() {
      (R(this, "enabled", !1),
        R(this, "bySelector", new Map()),
        R(this, "getGoogleFontsListPromise"),
        R(this, "getFontshareFontsListPromise"),
        R(this, "loadedSelectors", new Set()),
        R(this, "googleFamilyNames", new Set()),
        R(this, "defaultFont"),
        R(this, "local"),
        R(this, "google"),
        R(this, "fontshare"),
        R(this, "custom"),
        (this.local = new VD()),
        (this.google = new Sr()),
        (this.fontshare = new xr()),
        (this.custom = new wD()),
        (this.bySelector = new Map()),
        this.importLocalFonts());
      let e = this.getFontBySelector("Inter");
      (Oe(e, "Can\u2019t find Inter font"), (this.defaultFont = e));
    }
    addFont(e) {
      this.bySelector.set(e.selector, e);
    }
    getAvailableFonts() {
      return Array.from(this.bySelector.values());
    }
    importLocalFonts() {
      this.local.importFonts().forEach((e) => {
        (this.addFont(e), this.local.interFontSelectors.has(e.selector) || this.loadFont(e));
      });
    }
    async importGoogleFonts() {
      if (!this.getGoogleFontsListPromise) {
        this.getGoogleFontsListPromise = Lt.fetchGoogleFontsList();
        let e = await this.getGoogleFontsListPromise;
        this.google.importFonts(e).forEach((t) => {
          (this.googleFamilyNames.add(t.family.name.toLowerCase()), this.addFont(t));
        });
      }
      return this.getGoogleFontsListPromise;
    }
    async importFontshareFonts() {
      if (!this.getFontshareFontsListPromise) {
        this.getFontshareFontsListPromise = Lt.fetchFontshareFontsList();
        let e = await this.getFontshareFontsListPromise;
        this.fontshare.importFonts(e).forEach((t) => {
          this.googleFamilyNames.has(t.family.name.toLowerCase()) || this.addFont(t);
        });
      }
      return this.getFontshareFontsListPromise;
    }
    importCustomFonts(e) {
      (this.bySelector.forEach((t, n) => {
        n.startsWith(eo) && this.bySelector.delete(n);
      }),
        this.custom.importFonts(e).forEach((t) => this.addFont(t)));
    }
    getFontFamily(e) {
      return this[e.source].getFontFamilyByName(e.name);
    }
    getFontBySelector(e, t = !0) {
      return e.startsWith(eo) ? this.custom.getFontBySelector(e, t) : this.bySelector.get(e);
    }
    getDraftPropertiesBySelector(e) {
      let t = this.getFontBySelector(e);
      if (t)
        return {
          style: t.style,
          weight: t.weight,
          variant: t.variant,
          family: t.family.name,
          source: t.family.source,
          category: t.category,
        };
      let n = this.google.parseSelector(e);
      if (n) {
        let i = Sr.parseVariant(n.variant);
        if (i)
          return {
            style: i.style,
            weight: i.weight,
            variant: n.variant,
            family: n.name,
            source: "google",
            category: void 0,
          };
      }
      let r = this.fontshare.parseSelector(e);
      if (r) {
        let i = xr.parseVariant(r.variant);
        if (i)
          return {
            style: i.style,
            weight: i.weight,
            variant: r.variant,
            family: r.name,
            source: "fontshare",
            category: void 0,
          };
      }
      return null;
    }
    isSelectorLoaded(e) {
      return this.loadedSelectors.has(e);
    }
    async loadFont(e) {
      return this.isSelectorLoaded(e.selector)
        ? 0
        : e.family.source === "local"
          ? (this.local.interFontSelectors.has(e.selector) &&
              xD.default.env.NODE_ENV !== "test" &&
              (await hw(e.family.name, e.style, e.weight)),
            this.loadedSelectors.add(e.selector),
            1)
          : e.file
            ? (await FD(
                { family: e.family.name, url: e.file, weight: e.weight, style: e.style },
                document
              ),
              this.loadedSelectors.add(e.selector),
              1)
            : Promise.reject(`Unable to load font: ${e.selector}`);
    }
    async loadFontsFromSelectors(e) {
      if (!this.enabled) return [];
      let t = e.some((i) => i.startsWith(vc)),
        n = e.some((i) => i.startsWith(mc));
      if (t || n) {
        try {
          await this.importGoogleFonts();
        } catch (i) {
          Ba("Failed to load Google fonts:", i);
        }
        try {
          await this.importFontshareFonts();
        } catch (i) {
          Ba("Failed to load Fontshare fonts:", i);
        }
      }
      let r = e.map((i) => this.bySelector.get(i)).filter((i) => !!i);
      return Promise.allSettled(r.map((i) => this.loadFont(i)));
    }
    async loadFonts(e) {
      return {
        newlyLoadedFontCount: (await this.loadFontsFromSelectors(e)).filter(
          (r) => r.status === "fulfilled" && r.value === 1
        ).length,
      };
    }
    async loadMissingFonts(e, t) {
      let n = e.filter((i) => !gc.isSelectorLoaded(i));
      if (n.length === 0) return;
      (await gc.loadWebFontsFromSelectors(n), n.every((i) => gc.isSelectorLoaded(i)) && t && t());
    }
    async loadWebFontsFromSelectors(e) {
      return this.loadFontsFromSelectors(e);
    }
  },
  gc = new DD();
Promise.allSettled =
  Promise.allSettled ||
  ((e) =>
    Promise.all(
      e.map((t) =>
        t
          .then((n) => ({ status: "fulfilled", value: n }))
          .catch((n) => ({ status: "rejected", reason: n }))
      )
    ));
function BD(e, t) {
  return e.length === t.length && e.every((n, r) => n === t[r]);
}
var zD = "(?:<a[^>]*>)?",
  HD = "(?:</a>)?",
  ND = "<[^>]+>",
  $D = "</[^>]+>",
  WD = "<(?:div|span)[^>]*>",
  UD = "</(?:div|span)>",
  jD = "<[^>]+>",
  XD = "</[^>]+>",
  Qz = new RegExp(`^(${zD}${ND}${WD}${jD}).*?(${XD}).*?(${UD}${$D}${HD})$`, "s");
var Tc = class {
  constructor(e) {
    (R(this, "__class", "PathSegment"),
      R(this, "x", 0),
      R(this, "y", 0),
      R(this, "handleMirroring", "straight"),
      R(this, "handleOutX", 0),
      R(this, "handleOutY", 0),
      R(this, "handleInX", 0),
      R(this, "handleInY", 0),
      R(this, "radius", 0),
      e && Object.assign(this, e));
  }
  merge(e) {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this, e);
  }
};
R(Tc, "displayName", "WithClassDiscriminatorMixin(PathSegment)");
Tc.prototype.__class = "PathSegment";
((e) => {
  ((e.point = (t) => ({ x: t.x, y: t.y })),
    (e.handleOut = (t) => ({ x: t.handleOutX, y: t.handleOutY })),
    (e.handleIn = (t) => ({ x: t.handleInX, y: t.handleInY })),
    (e.calculatedHandleOut = (t) => {
      switch (t.handleMirroring) {
        case "symmetric":
        case "disconnected":
        case "asymmetric":
          return ct.add((0, e.point)(t), (0, e.handleOut)(t));
        default:
          return { x: t.x, y: t.y };
      }
    }),
    (e.calculatedHandleIn = (t) => {
      switch (t.handleMirroring) {
        case "symmetric":
          return ct.subtract((0, e.point)(t), (0, e.handleOut)(t));
        case "disconnected":
        case "asymmetric":
          return ct.add((0, e.point)(t), (0, e.handleIn)(t));
        default:
          return (0, e.point)(t);
      }
    }),
    (e.curveDefault = (t, n) => {
      if (t.length > 2) {
        let r, i;
        (n === 0 ? (r = t[t.length - 1]) : (r = t[n - 1]),
          n === t.length - 1 ? (i = t[0]) : (i = t[n + 1]),
          Oe(r, "pointBefore should be defined"),
          Oe(i, "pointAfter should be defined"));
        let o = ct.subtract((0, e.point)(i), (0, e.point)(r));
        return { x: o.x / 4, y: o.y / 4 };
      }
      return { x: 10, y: 10 };
    }));
})(Tc || (Tc = {}));
var Zi = class {
    constructor() {
      (R(this, "canvas", { children: [] }), R(this, "listeners", []), R(this, "ids", []));
    }
    static shared(e) {
      if (e) {
        let t = new Zi();
        return (t.setCanvas(e), t);
      }
      return (Zi.__shared || (Zi.__shared = new Zi()), Zi.__shared);
    }
    updateNode(e) {
      let t = e.props.id,
        n = this.canvas.children;
      n || (this.canvas.children = n = []);
      let r = !1;
      for (let i = 0; i < n.length; i++) {
        let o = n[i];
        if (o?.props.id === t) {
          ((r = !0), (n[i] = e));
          break;
        }
      }
      (r || n.push(e), this.setCanvas(this.canvas));
    }
    setCanvas(e) {
      e.children &&
        ((this.canvas = e),
        this.listeners.forEach((t, n) => {
          let r = this.ids[n];
          if (!r) return;
          let i = Qh(e, r);
          t.setState({ data: i });
        }));
    }
    registerListener(e, t) {
      return (this.listeners.push(e), this.ids.push(t), Qh(this.canvas, t));
    }
    removeListener(e) {
      let t = this.listeners.indexOf(e);
      t !== -1 && (this.listeners.splice(t, 1), this.ids.splice(t, 1));
    }
  },
  GD = Zi;
R(GD, "__shared", null);
function L1(e, t) {
  let { name: n, props: r } = t;
  return (r && r.id === e) || n === e;
}
function Qh(e, t) {
  if (!e) return null;
  if (L1(t, e)) return e;
  let { children: n } = e;
  if (!n || !ip(n)) return null;
  for (let r of n) if (L1(t, r)) return r;
  for (let r of n) {
    let i = Qh(r, t);
    if (i) return i;
  }
  return null;
}
var YD = p.createContext(null),
  nH = YD.Provider;
var oH = p.forwardRef(function (t, n) {
  let { background: r, children: i, alt: o, ...a } = t,
    s = { ...a.style };
  r && delete s.background;
  let l = Fc(t.as);
  return p.createElement(
    l,
    { ...a, style: s, ref: n },
    r && p.createElement(cS, { image: r, alt: o }),
    i
  );
});
var KD = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
  pw = /[&<>"']/g,
  qD = RegExp(pw.source);
function M1(e) {
  return e && qD.test(e)
    ? e.replace(pw, (t) => {
        var n;
        return (n = KD[t]) != null ? n : "";
      })
    : e || "";
}
var O1 = "{{ text-placeholder }}",
  QD = "rich-text-wrapper",
  ZD = Ne(function (t, n) {
    var r, i;
    let {
        id: o,
        name: a,
        html: s,
        htmlFromDesign: l,
        text: c,
        textFromDesign: u,
        fonts: f = [],
        width: d,
        height: m,
        left: y,
        right: b,
        top: S,
        bottom: h,
        center: v,
        className: g,
        stylesPresetsClassName: x,
        visible: k = !0,
        opacity: w,
        rotation: E = 0,
        verticalAlignment: C = "top",
        isEditable: I = !1,
        willChangeTransform: T,
        environment: z = we.current,
        withExternalLayout: A = !1,
        positionSticky: H,
        positionStickyTop: L,
        positionStickyRight: M,
        positionStickyBottom: D,
        positionStickyLeft: P,
        __htmlStructure: j,
        __fromCanvasComponent: K = !1,
        _forwardedOverrideId: N,
        _forwardedOverrides: $,
        _usesDOMRect: ie,
        children: Q,
        ...Z
      } = t,
      ze = ja(),
      Xe = Ga(t),
      He = B(null),
      Ge = n ?? He,
      { navigate: J, getRoute: Ut } = lo(),
      Fe = _c();
    (RF((r = t.preload) != null ? r : []), Oc(t, Ge));
    let uo = O(co),
      fo = xp(),
      kr = c,
      ho = N ?? o;
    if (ho && $) {
      let ft = $[ho];
      typeof ft == "string" && (kr = ft);
    }
    let yn = "";
    if (kr) {
      let ft = M1(kr);
      yn = j ? j.replace(O1, ft) : `<p>${ft}</p>`;
    } else if (s) yn = s;
    else if (u) {
      let ft = M1(u);
      yn = j ? j.replace(O1, ft) : `<p>${ft}</p>`;
    } else l && (yn = l);
    let Ka = JS(),
      gw = se(() => (fo || !Ut || !Fe ? yn : bD(yn, Ut, Fe, Ka)), [fo, yn, Ut, Fe, Ka]);
    if (
      (X(() => {
        let ft = Ge.current;
        if (ft === null) return;
        function kp(Ac) {
          let Dc = vp(Ac.target, Ge.current);
          if (Ac.metaKey || !J || !Dc || Dc.getAttribute("target") === "_blank") return;
          xA(J, Dc, Ka) && Ac.preventDefault();
        }
        return (
          ft.addEventListener("click", kp),
          () => {
            ft.removeEventListener("click", kp);
          }
        );
      }, [J, Ka]),
      vw(f, K, Ge),
      dt(() => {
        Xa();
      }, []),
      !k)
    )
      return null;
    let yw = I && z() === "CANVAS",
      fe = {
        outline: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: mw(C),
        opacity: yw ? 0 : w,
        flexShrink: 0,
      },
      Sp = we.hasRestrictions(),
      Cr = za(t, ze || 0, !1),
      wp = ie && (d === "auto" || m === "auto"),
      bw =
        !!t.transformTemplate || !Cr || !Sp || K || wp
          ? (i = t.transformTemplate) != null
            ? i
            : Lc(v)
          : void 0;
    if (!A) {
      if (Cr && Sp && !wp) {
        let ft = _e.getNumber(E).toFixed(4);
        ((fe.transform = `translate(${Cr.x}px, ${Cr.y}px) rotate(${ft}deg)`),
          (fe.width = Cr.width),
          (fe.minWidth = Cr.width),
          (fe.height = Cr.height));
      } else
        ((fe.left = y),
          (fe.right = b),
          (fe.top = S),
          (fe.bottom = h),
          (fe.width = d),
          (fe.height = m),
          (fe.rotate = E));
      H
        ? (!fo || uo) &&
          ((fe.position = "sticky"),
          (fe.willChange = "transform"),
          (fe.zIndex = 1),
          (fe.top = L),
          (fe.right = M),
          (fe.bottom = D),
          (fe.left = P))
        : fo && (t.positionFixed || t.positionAbsolute) && (fe.position = "absolute");
    }
    return (
      dp(t, fe),
      FS(t, fe),
      T && cp(fe),
      Object.assign(fe, t.style),
      ne(wt.div, {
        id: o,
        ref: Ge,
        ...Z,
        style: fe,
        layoutId: Xe,
        "data-framer-name": a,
        "data-framer-component-type": "DeprecatedRichText",
        "data-center": v,
        className: pp(g, x, QD),
        transformTemplate: bw,
        dangerouslySetInnerHTML: { __html: gw },
      })
    );
  });
function mw(e) {
  switch (e) {
    case "top":
      return "flex-start";
    case "center":
      return "center";
    case "bottom":
      return "flex-end";
  }
}
function vw(e, t, n) {
  let r = B([]);
  BD(r.current, e) ||
    ((r.current = e),
    gc.loadFonts(e).then(({ newlyLoadedFontCount: i }) => {
      !t || !n.current || we.current() !== "CANVAS" || (i > 0 && kM(n.current));
    }));
}
var V1 = Ne(({ viewBoxScale: e, viewBox: t, children: n, ...r }, i) =>
    p.createElement(
      wt.svg,
      { ref: i, ...r, viewBox: t },
      p.createElement(
        wt.foreignObject,
        {
          width: "100%",
          height: "100%",
          className: "framer-fit-text",
          transform: `scale(${e})`,
          style: { overflow: "visible", transformOrigin: "center center" },
        },
        n
      )
    )
  ),
  JD = Ne((e, t) => {
    var n;
    let {
        __fromCanvasComponent: r = !1,
        _forwardedOverrideId: i,
        _forwardedOverrides: o,
        _usesDOMRect: a,
        as: s,
        bottom: l,
        center: c,
        children: u,
        environment: f = we.current,
        fonts: d = [],
        height: m,
        isEditable: y = !1,
        left: b,
        name: S,
        opacity: h,
        positionSticky: v,
        positionStickyBottom: g,
        positionStickyLeft: x,
        positionStickyRight: k,
        positionStickyTop: w,
        right: E,
        rotation: C = 0,
        style: I,
        _initialStyle: T,
        stylesPresetsClassNames: z,
        text: A,
        top: H,
        verticalAlignment: L = "top",
        visible: M = !0,
        width: D,
        willChangeTransform: P,
        withExternalLayout: j = !1,
        viewBox: K,
        viewBoxScale: N = 1,
        ...$
      } = e,
      ie = ja(),
      Q = xp(),
      Z = O(co),
      ze = Ga(e),
      Xe = B(null),
      He = t ?? Xe;
    if (
      (Oc(e, He),
      vw(d, r, He),
      dt(() => {
        Xa();
      }, []),
      !M)
    )
      return null;
    let Ge = y && f() === "CANVAS",
      J = {
        outline: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: mw(L),
        opacity: Ge ? 0 : h,
        flexShrink: 0,
      },
      Ut = we.hasRestrictions(),
      Fe = za(e, ie || 0, !1),
      uo = a && (D === "auto" || m === "auto"),
      kr =
        !!e.transformTemplate || !Fe || !Ut || r || uo
          ? (n = e.transformTemplate) != null
            ? n
            : Lc(c)
          : void 0;
    if (!j) {
      if (Fe && Ut && !uo) {
        let yn = _e.getNumber(C).toFixed(4);
        ((J.transform = `translate(${Fe.x}px, ${Fe.y}px) rotate(${yn}deg)`),
          (J.width = Fe.width),
          (J.minWidth = Fe.width),
          (J.height = Fe.height));
      } else
        ((J.left = b),
          (J.right = E),
          (J.top = H),
          (J.bottom = l),
          (J.width = D),
          (J.height = m),
          (J.rotate = C));
      v
        ? (!Q || Z) &&
          ((J.position = "sticky"),
          (J.willChange = "transform"),
          (J.zIndex = 1),
          (J.top = w),
          (J.right = k),
          (J.bottom = g),
          (J.left = x))
        : Q && (e.positionFixed || e.positionAbsolute) && (J.position = "absolute");
    }
    (dp(e, J), FS(e, J), P && cp(J), Object.assign(J, T, I), ze && ($.layout = "preserve-aspect"));
    let ho = Fc(e.as);
    return Ie(e.viewBox)
      ? e.as !== void 0
        ? p.createElement(
            ho,
            {
              ...$,
              ref: He,
              style: J,
              layoutId: ze,
              transformTemplate: kr,
              "data-framer-name": S,
              "data-framer-component-type": "RichTextContainer",
            },
            p.createElement(
              V1,
              { viewBox: K, viewBoxScale: N, style: { width: "100%", height: "100%" } },
              u && yc(u, z, A)
            )
          )
        : p.createElement(
            V1,
            {
              ...$,
              ref: He,
              style: J,
              layoutId: ze,
              viewBox: K,
              viewBoxScale: N,
              transformTemplate: kr,
              "data-framer-name": S,
              "data-framer-component-type": "RichTextContainer",
            },
            u && yc(u, z, A)
          )
      : p.createElement(
          ho,
          {
            ...$,
            ref: He,
            style: J,
            layoutId: ze,
            transformTemplate: kr,
            "data-framer-name": S,
            "data-framer-component-type": "RichTextContainer",
          },
          u && yc(u, z, A)
        );
  });
function yc(e, t, n) {
  let r = mo.toArray(e.props.children);
  (Ie(n) && (r = r.slice(0, 1)), (r = r.map((a) => (si(a) ? yc(a, t, n) : Ie(n) ? n : a))));
  let { ["data-preset-tag"]: i, ...o } = e.props;
  if (Ie(e.type) || af(e.type)) {
    let a = i || Xg(e.type) || e.type,
      s = Ie(a) ? t?.[a] : void 0;
    o.className = pp("framer-text", o.className, s);
  }
  return Er(e, o, ...r);
}
var lH = Ne(({ children: e, html: t, htmlFromDesign: n, ...r }, i) => {
  let o = t || e || n;
  if (Ie(o)) {
    !r.stylesPresetsClassName &&
      it(r.stylesPresetsClassNames) &&
      (r.stylesPresetsClassName = Object.values(r.stylesPresetsClassNames).join(" "));
    let a = { [Ie(t) ? "html" : "htmlFromDesign"]: o };
    return p.createElement(ZD, { ...r, ...a, ref: i });
  }
  if (!r.stylesPresetsClassNames && Ie(r.stylesPresetsClassName)) {
    let [a, s, l, c, u] = r.stylesPresetsClassName.split(" ");
    a === void 0 || s === void 0 || l === void 0 || c === void 0 || u === void 0
      ? console.warn(`Encountered invalid stylesPresetsClassNames: ${r.stylesPresetsClassNames}`)
      : (r.stylesPresetsClassNames = { h1: a, h2: s, h3: l, p: c, a: u });
  }
  return p.createElement(JD, { ...r, ref: i }, si(o) ? o : void 0);
});
function cH(e, t, n) {
  let r = e3(t);
  (!n?.supportsExplicitInterCodegen &&
    !r.some((i) => i.explicitInter === !1) &&
    r.push({ explicitInter: !1, fonts: [] }),
    Object.assign(e, { fonts: r }));
}
function uH(e) {
  let t = e.fonts;
  return t ?? [];
}
function e3(e) {
  let t = { explicitInter: !1, fonts: [] },
    n = [];
  for (let r of e) n3(r) ? n.push(r) : t.fonts.push(r3(r));
  return (t.fonts.length > 0 && n.push(t), n);
}
var t3 = "explicitInter";
function n3(e) {
  return t3 in e;
}
function r3(e) {
  let t;
  return (
    e.url.startsWith("https://fonts.gstatic.com/s/")
      ? (t = "google")
      : e.url.startsWith("https://framerusercontent.com/third-party-assets/fontshare/")
        ? (t = "fontshare")
        : (t = "custom"),
    { ...e, source: t }
  );
}
var i3 = {
    name: "framer",
    version: "2.4.1",
    main: "build/index.js",
    type: "module",
    exports: { ".": "./build/index.js", "./package.json": "./package.json", "./*": "./build/*" },
    files: ["build", "CHANGELOG.md", "README.md", "LICENSE.md", "postinstall.cjs"],
    types: "./build/index.d.ts",
    author: "Framer",
    license: "MIT",
    scripts: {
      prepublishOnly: "make build",
      coverage: "yarn :jest --coverage",
      lint: "yarn :eslint ./src --ext .ts,.tsx --format codeframe --quiet",
      "lint:fix": "yarn lint --fix",
      test: "yarn :jest",
      watch: "yarn :jest --watch",
      postinstall: "node postinstall.cjs",
    },
    dependencies: {
      "@framerjs/router": "workspace:*",
      "@juggle/resize-observer": "^3.3.1",
      eventemitter3: "^3.1.0",
      fontfaceobserver: "^2.1.0",
      "hoist-non-react-statics": "^3.3.2",
      hsluv: "^0.0.3",
    },
    devDependencies: {
      "@microsoft/api-extractor": "^7.40.6",
      "@testing-library/dom": "^8.19.1",
      "@testing-library/jest-dom": "^5.16.5",
      "@testing-library/react": "^13.4.0",
      "@testing-library/user-event": "^14.4.3",
      "@types/google.fonts": "1.0.3",
      "@types/hsluv": "https://github.com/framer/typed_hsluv#bump",
      "@types/node": "^18.17.15",
      "@types/react": "^18.0.26",
      "@types/react-dom": "^18.0.10",
      "@types/yargs": "^17.0.19",
      "@typescript-eslint/eslint-plugin": "^6.16.0",
      "@typescript-eslint/parser": "^6.16.0",
      chalk: "^4.1.2",
      eslint: "^8.56.0",
      immutable: "^3.8.2",
      "jest-diff": "^29.3.1",
      "jest-junit": "^15.0.0",
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      semver: "^7.5.2",
      typescript: "^5.3.3",
      yargs: "^17.6.2",
    },
    peerDependencies: { "framer-motion": "11.0.7", react: "^18.2.0", "react-dom": "^18.2.0" },
    tsdoc: { tsdocFlavor: "AEDoc" },
    framer: {
      components: [
        {
          name: "Scroll",
          children: !0,
          properties: [
            {
              key: "direction",
              title: "Direction",
              kind: "enum",
              options: ["horizontal", "vertical", "both"],
            },
          ],
        },
        { name: "Page" },
      ],
    },
  },
  { version: dH } = i3;
Is.prototype.addChild = function ({ transformer: e = (t) => t }) {
  let t = pe(e(this.get()));
  return (this.onChange((n) => t.set(e(n))), t);
};
/**
 * @license Emotion v11.0.0
 * MIT License
 *
 * Copyright (c) Emotion team and other contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */ /*! Bundled license information:

react-is/cjs/react-is.production.min.js:
  (** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/ export {
  p as a,
  mo as b,
  ai as c,
  Er as d,
  ne as e,
  Op as f,
  Ne as g,
  li as h,
  ae as i,
  O as j,
  X as k,
  Tr as l,
  Ir as m,
  se as n,
  B as o,
  ht as p,
  Ke as q,
  Sn as r,
  q as s,
  wt as t,
  rf as u,
  Lg as v,
  sn as w,
  kt as x,
  wI as y,
  Dg as z,
  zg as A,
  xi as B,
  Wg as C,
  $I as D,
  UI as E,
  xh as F,
  T_ as G,
  lo as H,
  s4 as I,
  u4 as J,
  G1 as K,
  wF as L,
  g4 as M,
  we as N,
  I4 as O,
  w2 as P,
  L4 as Q,
  yL as R,
  M4 as S,
  O4 as T,
  N4 as U,
  pp as V,
  J5 as W,
  WV as X,
  rz as Y,
  GV as Z,
  sz as _,
  uz as $,
  vA as aa,
  hz as ba,
  mz as ca,
  gz as da,
  yz as ea,
  iw as fa,
  bz as ga,
  VA as ha,
  xz as ia,
  Sz as ja,
  wz as ka,
  Cz as la,
  Iz as ma,
  Mz as na,
  Vz as oa,
  zz as pa,
  Qi as qa,
  Yz as ra,
  gc as sa,
  oH as ta,
  lH as ua,
  cH as va,
  uH as wa,
};
//# sourceMappingURL=chunk-QEUFNCD2.mjs.map
