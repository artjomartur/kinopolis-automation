import { a as p } from "./chunk-G7RZZ2HZ.mjs";
import { a as L, b as W, c as I } from "./chunk-5SAWWLB7.mjs";
import { b as t, c as B } from "./chunk-OO3TPEBQ.mjs";
import {
  K as z,
  P as b,
  S as N,
  T as V,
  V as k,
  Z as P,
  c as h,
  g as w,
  j as C,
  l as _,
  n as O,
  o as T,
  pa as F,
  r as v,
  t as d,
  ua as Q,
  v as j,
  va as R,
  wa as S,
} from "./chunk-QEUFNCD2.mjs";
var q = S(p),
  u = V(p),
  G = ["lWyVRztOt"],
  U = "framer-fyBQO",
  X = { lWyVRztOt: "framer-v-nkzyw3" };
var J = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  Z = ({ value: e, children: r }) => {
    let o = C(v),
      m = e ?? o.transition,
      n = O(() => ({ ...o, transition: m }), [JSON.stringify(m)]);
    return t(v.Provider, { value: n, children: r });
  },
  $ = d(h),
  ee = ({ color: e, height: r, icon: o, id: m, title: n, width: g, ...a }) => {
    var s, i, l;
    return {
      ...a,
      jTcf_EQ_W: (s = n ?? a.jTcf_EQ_W) !== null && s !== void 0 ? s : "Live-Saalbelegung & Einlassampel",
      pbavLymla: (i = o ?? a.pbavLymla) !== null && i !== void 0 ? i : "Check",
      T2CsNbFcm: (l = e ?? a.T2CsNbFcm) !== null && l !== void 0 ? l : "rgb(0, 0, 0)",
    };
  },
  te = (e, r) => r.join("-") + e.layoutDependency,
  re = w(function (e, r) {
    let { activeLocale: o, setLocale: m } = z(),
      {
        style: n,
        className: g,
        layoutId: a,
        variant: s,
        T2CsNbFcm: i,
        pbavLymla: l,
        jTcf_EQ_W: D,
        ...K
      } = ee(e),
      {
        baseVariant: oe,
        classNames: E,
        gestureVariant: ne,
        setGestureState: c,
        setVariant: ie,
        transition: H,
        variants: x,
      } = F({
        cycleOrder: G,
        defaultVariant: "lWyVRztOt",
        transitions: J,
        variant: s,
        variantClassNames: X,
      }),
      y = te(e, x),
      A = T(null),
      Y = _(),
      M = [I];
    return t(j, {
      id: a ?? Y,
      children: t($, {
        animate: x,
        initial: !1,
        children: t(Z, {
          value: H,
          children: B(d.div, {
            ...K,
            className: k(U, ...M, "framer-nkzyw3", g, E),
            "data-framer-name": "Variant 1",
            layoutDependency: y,
            layoutId: "lWyVRztOt",
            onHoverEnd: () => c({ isHovered: !1 }),
            onHoverStart: () => c({ isHovered: !0 }),
            onTap: () => c({ isPressed: !1 }),
            onTapCancel: () => c({ isPressed: !1 }),
            onTapStart: () => c({ isPressed: !0 }),
            ref: r ?? A,
            style: { ...n },
            children: [
              t(d.div, {
                className: "framer-68oigk-container",
                layoutDependency: y,
                layoutId: "eRWuqDgKX-container",
                children: t(p, {
                  color: i,
                  height: "100%",
                  iconSearch: "House",
                  iconSelection: l,
                  id: "eRWuqDgKX",
                  layoutId: "eRWuqDgKX",
                  mirrored: !1,
                  selectByList: !0,
                  style: { height: "100%", width: "100%" },
                  weight: "bold",
                  width: "100%",
                }),
              }),
              t(Q, {
                __fromCanvasComponent: !0,
                children: t(h, {
                  children: t(d.p, {
                    className: "framer-styles-preset-1dts917",
                    "data-styles-preset": "hgKudGhZ5",
                    style: {
                      "--framer-text-color":
                        "var(--extracted-r6o4lv, var(--variable-reference-T2CsNbFcm-PzjKYwnhA))",
                    },
                    children: "Live-Saalbelegung & Einlassampel",
                  }),
                }),
                className: "framer-12uzk4n",
                layoutDependency: y,
                layoutId: "W_33gstOH",
                style: {
                  "--extracted-r6o4lv": "var(--variable-reference-T2CsNbFcm-PzjKYwnhA)",
                  "--framer-link-text-color": "rgb(0, 153, 255)",
                  "--framer-link-text-decoration": "underline",
                  "--variable-reference-T2CsNbFcm-PzjKYwnhA": i,
                  opacity: 0.8,
                },
                text: D,
                verticalAlignment: "top",
                withExternalLayout: !0,
              }),
            ],
          }),
        }),
      }),
    });
  }),
  ae = [
    '.framer-fyBQO[data-border="true"]::after, .framer-fyBQO [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-fyBQO.framer-13mbx0g, .framer-fyBQO .framer-13mbx0g { display: block; }",
    ".framer-fyBQO.framer-nkzyw3 { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-fyBQO .framer-68oigk-container { flex: none; height: 16px; position: relative; width: 16px; }",
    ".framer-fyBQO .framer-12uzk4n { flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-fyBQO.framer-nkzyw3 { gap: 0px; } .framer-fyBQO.framer-nkzyw3 > * { margin: 0px; margin-left: calc(6px / 2); margin-right: calc(6px / 2); } .framer-fyBQO.framer-nkzyw3 > :first-child { margin-left: 0px; } .framer-fyBQO.framer-nkzyw3 > :last-child { margin-right: 0px; } }",
    ...W,
  ],
  f = P(re, ae, "framer-fyBQO"),
  he = f;
f.displayName = "Feature List";
f.defaultProps = { height: 19.5, width: 175 };
N(f, {
  T2CsNbFcm: { defaultValue: "rgb(0, 0, 0)", title: "Color", type: b.Color },
  pbavLymla: u?.iconSelection && {
    ...u.iconSelection,
    defaultValue: "Check",
    description: void 0,
    hidden: void 0,
    title: "Icon",
  },
  jTcf_EQ_W: {
    defaultValue: "Live-Saalbelegung & Einlassampel",
    displayTextArea: !0,
    title: "Title",
    type: b.String,
  },
});
R(f, [...q, ...L]);
export { he as a };
//# sourceMappingURL=chunk-BCJR3627.mjs.map
