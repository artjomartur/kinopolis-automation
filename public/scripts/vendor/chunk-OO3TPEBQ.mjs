import { a as l, q as i } from "./chunk-QEUFNCD2.mjs";
var f = "default" in i ? l : i,
  o = {},
  y = f,
  C = Symbol.for("react.element"),
  g = Symbol.for("react.fragment"),
  S = Object.prototype.hasOwnProperty,
  x = y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  I = { key: !0, ref: !0, __self: !0, __source: !0 };
function c(n, e, s) {
  var t,
    a = {},
    r = null,
    u = null;
  (s !== void 0 && (r = "" + s),
    e.key !== void 0 && (r = "" + e.key),
    e.ref !== void 0 && (u = e.ref));
  for (t in e) S.call(e, t) && !I.hasOwnProperty(t) && (a[t] = e[t]);
  if (n && n.defaultProps) for (t in ((e = n.defaultProps), e)) a[t] === void 0 && (a[t] = e[t]);
  return { $$typeof: C, type: n, key: r, ref: u, props: a, _owner: x.current };
}
o.Fragment = g;
o.jsx = c;
o.jsxs = c;
var M = o.Fragment,
  v = o.jsx,
  E = o.jsxs;
export { M as a, v as b, E as c };
//# sourceMappingURL=chunk-OO3TPEBQ.mjs.map
