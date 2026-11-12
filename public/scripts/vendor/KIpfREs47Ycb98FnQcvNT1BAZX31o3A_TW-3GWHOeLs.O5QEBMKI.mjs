import { a as S } from "./chunk-UFT7EOAB.mjs";
import { a as ee, b as re, c as te } from "./chunk-D5CSMFZ4.mjs";
import { a as $, b as K, c as Y } from "./chunk-5SAWWLB7.mjs";
import { b as r, c as g } from "./chunk-OO3TPEBQ.mjs";
import {
  K as N,
  P as R,
  S as P,
  V as u,
  Y as q,
  Z as j,
  _ as z,
  aa as M,
  ba as G,
  c as x,
  g as y,
  j as D,
  l as w,
  m as W,
  ma as O,
  n as T,
  o as I,
  pa as Q,
  r as _,
  ra as X,
  t as c,
  ua as C,
  v as J,
  va as V,
  wa as Z,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var fe = { AfjFoJmBL: { hover: !0 } },
  ce = ["AfjFoJmBL"],
  pe = "framer-UdsHe",
  he = { AfjFoJmBL: "framer-v-sxdelj" };
function xe(t, ...e) {
  let i = {};
  return (e?.forEach((a) => a && Object.assign(i, t[a])), i);
}
var ue = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  ge = (t, e) => `translateX(-50%) ${e}`,
  be = ({ value: t, children: e }) => {
    let i = D(_),
      a = t ?? i.transition,
      o = T(() => ({ ...i, transition: a }), [JSON.stringify(a)]);
    return r(_.Provider, { value: o, children: e });
  },
  ve = c(x),
  ye = ({ height: t, icon: e, id: i, link: a, title: o, width: s, ...n }) => {
    var l, m;
    return {
      ...n,
      hvrag8cVa: a ?? n.hvrag8cVa,
      QExBi9uhq: (l = e ?? n.QExBi9uhq) !== null && l !== void 0 ? l : !0,
      WjgARN1E2:
        (m = o ?? n.WjgARN1E2) !== null && m !== void 0
          ? m
          : "Slack channel and dedicated account manager",
    };
  },
  we = (t, e) => e.join("-") + t.layoutDependency,
  Ie = y(function (t, e) {
    let { activeLocale: i, setLocale: a } = N(),
      {
        style: o,
        className: s,
        layoutId: n,
        variant: l,
        WjgARN1E2: m,
        QExBi9uhq: B,
        hvrag8cVa: H,
        ...E
      } = ye(t),
      {
        baseVariant: F,
        classNames: A,
        gestureVariant: k,
        setGestureState: d,
        setVariant: f,
        transition: h,
        variants: p,
      } = Q({
        cycleOrder: ce,
        defaultVariant: "AfjFoJmBL",
        enabledGestures: fe,
        transitions: ue,
        variant: l,
        variantClassNames: he,
      }),
      v = we(t, p),
      oe = I(null),
      ne = w(),
      ie = [Y];
    return r(J, {
      id: n ?? ne,
      children: r(ve, {
        animate: p,
        initial: !1,
        children: r(be, {
          value: h,
          children: r(G, {
            href: H,
            children: g(c.a, {
              ...E,
              className: `${u(pe, ...ie, "framer-sxdelj", s, A)} framer-z7l5fs`,
              "data-framer-name": "Variant 1",
              layoutDependency: v,
              layoutId: "AfjFoJmBL",
              onHoverEnd: () => d({ isHovered: !1 }),
              onHoverStart: () => d({ isHovered: !0 }),
              onTap: () => d({ isPressed: !1 }),
              onTapCancel: () => d({ isPressed: !1 }),
              onTapStart: () => d({ isPressed: !0 }),
              ref: e ?? oe,
              style: { ...o },
              ...xe({ "AfjFoJmBL-hover": { "data-framer-name": void 0 } }, F, k),
              children: [
                B &&
                  r(X, {
                    className: "framer-1vg3e4z",
                    "data-framer-name": "Question",
                    fill: "black",
                    intrinsicHeight: 256,
                    intrinsicWidth: 256,
                    layoutDependency: v,
                    layoutId: "DGswaeu81",
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="none" d="M0 0h256v256H0z"/><path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12 12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z"/></svg>',
                    withExternalLayout: !0,
                  }),
                r(c.div, {
                  className: "framer-d69sis",
                  "data-border": !0,
                  layoutDependency: v,
                  layoutId: "nppZKad84",
                  style: {
                    "--border-bottom-width": "1px",
                    "--border-color":
                      'var(--token-fae2c128-35fb-45de-a6c2-32169f920c68, rgb(13, 13, 13)) /* {"name":"Surface Night"} */',
                    "--border-left-width": "1px",
                    "--border-right-width": "1px",
                    "--border-style": "solid",
                    "--border-top-width": "1px",
                    backgroundColor:
                      "var(--token-fae2c128-35fb-45de-a6c2-32169f920c68, rgb(13, 13, 13))",
                    borderBottomLeftRadius: 7,
                    borderBottomRightRadius: 7,
                    borderTopLeftRadius: 7,
                    borderTopRightRadius: 7,
                    opacity: 0,
                  },
                  transformTemplate: ge,
                  variants: { "AfjFoJmBL-hover": { opacity: 1 } },
                  children: r(C, {
                    __fromCanvasComponent: !0,
                    children: r(x, {
                      children: r(c.p, {
                        className: "framer-styles-preset-1dts917",
                        "data-styles-preset": "hgKudGhZ5",
                        style: {
                          "--framer-text-color": "var(--extracted-r6o4lv, rgb(255, 255, 255))",
                        },
                        children: "Slack channel and dedicated account manager",
                      }),
                    }),
                    className: "framer-bbxt32",
                    layoutDependency: v,
                    layoutId: "CiiIqGVRg",
                    style: {
                      "--extracted-r6o4lv": "rgb(255, 255, 255)",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                    },
                    text: m,
                    verticalAlignment: "top",
                    withExternalLayout: !0,
                  }),
                }),
              ],
            }),
          }),
        }),
      }),
    });
  }),
  Je = [
    '.framer-UdsHe[data-border="true"]::after, .framer-UdsHe [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-UdsHe.framer-z7l5fs, .framer-UdsHe .framer-z7l5fs { display: block; }",
    ".framer-UdsHe.framer-sxdelj { cursor: pointer; height: 20px; overflow: visible; position: relative; text-decoration: none; width: 20px; }",
    ".framer-UdsHe .framer-1vg3e4z { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 20px); left: 0px; position: absolute; right: 0px; top: 0px; }",
    ".framer-UdsHe .framer-d69sis { align-content: center; align-items: center; bottom: 10px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: auto; justify-content: center; left: 40%; overflow: hidden; padding: 6px 10px 6px 10px; position: absolute; width: auto; will-change: var(--framer-will-change-override, transform); }",
    ".framer-UdsHe .framer-bbxt32 { flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-UdsHe .framer-d69sis { gap: 0px; } .framer-UdsHe .framer-d69sis > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-UdsHe .framer-d69sis > :first-child { margin-left: 0px; } .framer-UdsHe .framer-d69sis > :last-child { margin-right: 0px; } }",
    ".framer-UdsHe.framer-v-sxdelj.hover .framer-d69sis { bottom: unset; height: 32px; top: -41px; }",
    ...K,
  ],
  b = j(Ie, Je, "framer-UdsHe"),
  U = b;
b.displayName = "Tooltip";
b.defaultProps = { height: 20, width: 20 };
P(b, {
  WjgARN1E2: {
    defaultValue: "Slack channel and dedicated account manager",
    displayTextArea: !1,
    title: "Title",
    type: R.String,
  },
  QExBi9uhq: { defaultValue: !0, title: "Icon", type: R.Boolean },
  hvrag8cVa: { title: "Link", type: R.Link },
});
V(b, [...$]);
var Ne = Z(U);
var Re = {
  VDN6vAmUw: "(min-width: 810px) and (max-width: 1199px)",
  wBAA0ERJ1: "(max-width: 809px)",
  WtwlL7X8U: "(min-width: 1200px)",
};
var ae = "framer-6I4Jn",
  je = { VDN6vAmUw: "framer-v-x9g9m3", wBAA0ERJ1: "framer-v-d7vjjc", WtwlL7X8U: "framer-v-91gsa4" },
  Ce = { default: { duration: 0 } },
  ze = S(),
  Ve = { Desktop: "WtwlL7X8U", Phone: "wBAA0ERJ1", Tablet: "VDN6vAmUw" },
  Le = ({ height: t, id: e, width: i, ...a }) => {
    var o, s;
    return {
      ...a,
      variant:
        (s = (o = Ve[a.variant]) !== null && o !== void 0 ? o : a.variant) !== null && s !== void 0
          ? s
          : "WtwlL7X8U",
    };
  },
  Ae = y(function (t, e) {
    let { activeLocale: i, setLocale: a } = N(),
      { style: o, className: s, layoutId: n, variant: l, ...m } = Le(t);
    W(() => {
      let f = S(void 0, i);
      if (((document.title = f.title || ""), f.viewport)) {
        var h;
        (h = document.querySelector('meta[name="viewport"]')) === null ||
          h === void 0 ||
          h.setAttribute("content", f.viewport);
      }
      if (f.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((p) => p.startsWith("framer-body-"))
            .map((p) => document.body.classList.remove(p)),
          document.body.classList.add(`${f.bodyClassName}-framer-6I4Jn`),
          () => {
            document.body.classList.remove(`${f.bodyClassName}-framer-6I4Jn`);
          }
        );
    }, [void 0, i]);
    let [B, H] = O(l, Re, !1),
      E = void 0,
      F = Ce.default,
      A = I(null),
      k = w(),
      d = [te];
    return (
      z({}),
      r(M.Provider, {
        value: { primaryVariantId: "WtwlL7X8U", variantClassNames: je },
        children: g(J, {
          id: n ?? k,
          children: [
            r(c.div, {
              ...m,
              className: u(ae, ...d, "framer-91gsa4", s),
              "data-border": !0,
              ref: e ?? A,
              style: { ...o },
              children: r("div", {
                className: "framer-nyplxt",
                "data-framer-name": "Wrapper",
                name: "Wrapper",
                children: r("div", {
                  className: "framer-1o1mljg",
                  "data-border": !0,
                  "data-framer-name": "Wrapper",
                  name: "Wrapper",
                  children: g("div", {
                    className: "framer-1ba16kr",
                    children: [
                      r(C, {
                        __fromCanvasComponent: !0,
                        children: r(x, {
                          children: r("p", {
                            className: "framer-styles-preset-1cc56zh",
                            "data-styles-preset": "PWn1k_MD2",
                            children: "Dedicated support",
                          }),
                        }),
                        className: "framer-1wqixr9",
                        verticalAlignment: "top",
                        withExternalLayout: !0,
                      }),
                      r(q, {
                        className: "framer-hwllwx-container",
                        children: r(U, {
                          height: "100%",
                          id: "q796R6fL0",
                          layoutId: "q796R6fL0",
                          QExBi9uhq: !0,
                          style: { height: "100%", width: "100%" },
                          width: "100%",
                          WjgARN1E2: "Slack channel and dedicated account manager",
                        }),
                      }),
                    ],
                  }),
                }),
              }),
            }),
            r("div", { className: u(ae, ...d), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  ke = [
    '.framer-6I4Jn[data-border="true"]::after, .framer-6I4Jn [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-6I4Jn.framer-1os06i1, .framer-6I4Jn .framer-1os06i1 { display: block; }",
    ".framer-6I4Jn.framer-91gsa4 { --border-bottom-width: 1px; --border-color: rgba(173, 173, 173, 0.4); --border-left-width: 1px; --border-right-width: 1px; --border-style: dashed; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-6I4Jn .framer-nyplxt { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; max-width: 1600px; overflow: hidden; padding: 20px 20px 20px 20px; position: relative; width: 100%; }",
    ".framer-6I4Jn .framer-1o1mljg { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; background-color: #ffffff; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-6I4Jn .framer-1ba16kr { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-6I4Jn .framer-1wqixr9 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-6I4Jn .framer-hwllwx-container { flex: none; height: 20px; position: relative; width: 20px; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-6I4Jn.framer-91gsa4, .framer-6I4Jn .framer-nyplxt, .framer-6I4Jn .framer-1o1mljg, .framer-6I4Jn .framer-1ba16kr { gap: 0px; } .framer-6I4Jn.framer-91gsa4 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-6I4Jn.framer-91gsa4 > :first-child, .framer-6I4Jn .framer-nyplxt > :first-child, .framer-6I4Jn .framer-1o1mljg > :first-child { margin-top: 0px; } .framer-6I4Jn.framer-91gsa4 > :last-child, .framer-6I4Jn .framer-nyplxt > :last-child, .framer-6I4Jn .framer-1o1mljg > :last-child { margin-bottom: 0px; } .framer-6I4Jn .framer-nyplxt > *, .framer-6I4Jn .framer-1o1mljg > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-6I4Jn .framer-1ba16kr > * { margin: 0px; margin-left: calc(6px / 2); margin-right: calc(6px / 2); } .framer-6I4Jn .framer-1ba16kr > :first-child { margin-left: 0px; } .framer-6I4Jn .framer-1ba16kr > :last-child { margin-right: 0px; } }",
    "@media (min-width: 1200px) { .framer-6I4Jn .hidden-91gsa4 { display: none !important; } }",
    "@media (min-width: 810px) and (max-width: 1199px) { .framer-6I4Jn .hidden-x9g9m3 { display: none !important; } .framer-6I4Jn.framer-91gsa4 { width: 810px; }}",
    "@media (max-width: 809px) { .framer-6I4Jn .hidden-d7vjjc { display: none !important; } .framer-6I4Jn.framer-91gsa4 { width: 390px; } .framer-6I4Jn .framer-1o1mljg { padding: 40px 40px 40px 40px; }}",
    ...re,
  ],
  L = j(Ae, ke, "framer-6I4Jn"),
  Me = L;
L.displayName = "Navigation";
L.defaultProps = { height: 224, width: 1200 };
V(L, [...Ne, ...ee]);
var Ge = {
  exports: {
    default: {
      type: "reactComponent",
      name: "FramerOVYpNUqS_",
      slots: [],
      annotations: {
        framerIntrinsicWidth: "1200",
        framerDisplayContentsDiv: "false",
        framerImmutableVariables: "true",
        framerResponsiveScreen: "",
        framerContractVersion: "1",
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"VDN6vAmUw":{"layout":["fixed","auto"]},"wBAA0ERJ1":{"layout":["fixed","auto"]}}}',
        framerIntrinsicHeight: "224",
      },
    },
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    __FramerMetadata__: { type: "variable" },
  },
};
export { Ge as __FramerMetadata__, Me as default };
//# sourceMappingURL=KIpfREs47Ycb98FnQcvNT1BAZX31o3A_TW-3GWHOeLs.O5QEBMKI.mjs.map
