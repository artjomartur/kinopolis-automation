import { a as L, b as K, c as U } from "./chunk-3H53UPLQ.mjs";
import { a as B, b as J, c as z } from "./chunk-D5CSMFZ4.mjs";
import { a as C } from "./chunk-G7RZZ2HZ.mjs";
import { b as a, c as b } from "./chunk-OO3TPEBQ.mjs";
import {
  K as H,
  P as h,
  S as X,
  V as Y,
  Z as N,
  c as v,
  g as T,
  j as P,
  l as M,
  la as A,
  n as S,
  o as W,
  pa as j,
  r as w,
  t as n,
  ua as g,
  v as D,
  va as O,
  wa as F,
} from "./chunk-QEUFNCD2.mjs";
var ne = F(C),
  oe = ["T5CrfWy_o", "yPX8xspWY"],
  ie = "framer-9rRVn",
  le = { T5CrfWy_o: "framer-v-14k8rn3", yPX8xspWY: "framer-v-3m90k0" };
function E(r, ...e) {
  let o = {};
  return (e?.forEach((i) => i && Object.assign(o, r[i])), o);
}
var se = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  de = ({ value: r, children: e }) => {
    let o = P(w),
      i = r ?? o.transition,
      l = S(() => ({ ...o, transition: i }), [JSON.stringify(i)]);
    return a(w.Provider, { value: l, children: e });
  },
  ce = n(v),
  pe = { Closed: "yPX8xspWY", Open: "T5CrfWy_o" },
  fe = ({ answer: r, color: e, height: o, id: i, question: l, width: V, ...t }) => {
    var p, s, f, m, u;
    return {
      ...t,
      CM1C23HdI: (p = e ?? t.CM1C23HdI) !== null && p !== void 0 ? p : "rgb(0, 0, 0)",
      m1wBZJAoM:
        (s = r ?? t.m1wBZJAoM) !== null && s !== void 0
          ? s
          : "You can cancel your plan whenever you\u2019d like. You\u2019ll be downgraded to the free plan. You won\u2019t be locked out of any projects that have paid plans.",
      variant:
        (m = (f = pe[t.variant]) !== null && f !== void 0 ? f : t.variant) !== null && m !== void 0
          ? m
          : "T5CrfWy_o",
      vd59XDbg4:
        (u = l ?? t.vd59XDbg4) !== null && u !== void 0 ? u : "Which pricing plan is right for me?",
    };
  },
  me = (r, e) => e.join("-") + r.layoutDependency,
  ue = T(function (r, e) {
    let { activeLocale: o, setLocale: i } = H(),
      {
        style: l,
        className: V,
        layoutId: t,
        variant: p,
        CM1C23HdI: s,
        vd59XDbg4: f,
        m1wBZJAoM: m,
        ...u
      } = fe(r),
      {
        baseVariant: x,
        classNames: Z,
        gestureVariant: I,
        setGestureState: d,
        setVariant: R,
        transition: G,
        variants: k,
      } = j({
        cycleOrder: oe,
        defaultVariant: "T5CrfWy_o",
        transitions: se,
        variant: p,
        variantClassNames: le,
      }),
      c = me(r, k),
      { activeVariantCallback: _, delay: ye } = A(x),
      Q = _(async (...te) => {
        (d({ isPressed: !1 }), R("yPX8xspWY"));
      }),
      q = _(async (...te) => {
        (d({ isPressed: !1 }), R("T5CrfWy_o"));
      }),
      $ = W(null),
      ee = () => x !== "yPX8xspWY",
      re = M(),
      ae = [U, z];
    return a(D, {
      id: t ?? re,
      children: a(ce, {
        animate: k,
        initial: !1,
        children: a(de, {
          value: G,
          children: b(n.div, {
            ...u,
            className: Y(ie, ...ae, "framer-14k8rn3", V, Z),
            "data-framer-name": "Open",
            "data-highlight": !0,
            layoutDependency: c,
            layoutId: "T5CrfWy_o",
            onHoverEnd: () => d({ isHovered: !1 }),
            onHoverStart: () => d({ isHovered: !0 }),
            onTap: Q,
            onTapCancel: () => d({ isPressed: !1 }),
            onTapStart: () => d({ isPressed: !0 }),
            ref: e ?? $,
            style: { ...l },
            ...E({ yPX8xspWY: { "data-framer-name": "Closed", onTap: q } }, x, I),
            children: [
              b(n.div, {
                className: "framer-wf4vzb",
                layoutDependency: c,
                layoutId: "PsdCDkf0b",
                children: [
                  a(g, {
                    __fromCanvasComponent: !0,
                    children: a(v, {
                      children: a(n.h5, {
                        className: "framer-styles-preset-13rf66x",
                        "data-styles-preset": "GPDKd6Ic6",
                        style: {
                          "--framer-text-alignment": "left",
                          "--framer-text-color":
                            "var(--extracted-1lwpl3i, var(--variable-reference-CM1C23HdI-pK7Tv7wIU))",
                        },
                        children: "Which pricing plan is right for me?",
                      }),
                    }),
                    className: "framer-10dl5x2",
                    layoutDependency: c,
                    layoutId: "SMsuS8tAl",
                    style: {
                      "--extracted-1lwpl3i": "var(--variable-reference-CM1C23HdI-pK7Tv7wIU)",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                      "--variable-reference-CM1C23HdI-pK7Tv7wIU": s,
                    },
                    text: f,
                    verticalAlignment: "top",
                    withExternalLayout: !0,
                  }),
                  a(n.div, {
                    className: "framer-n744wx",
                    layoutDependency: c,
                    layoutId: "ww7P_jnya",
                    children: a(n.div, {
                      className: "framer-pefwu9-container",
                      layoutDependency: c,
                      layoutId: "HAOnwCwhX-container",
                      children: a(C, {
                        color: s,
                        height: "100%",
                        iconSearch: "House",
                        iconSelection: "Minus",
                        id: "HAOnwCwhX",
                        layoutId: "HAOnwCwhX",
                        mirrored: !1,
                        selectByList: !0,
                        style: { height: "100%", width: "100%" },
                        weight: "bold",
                        width: "100%",
                        ...E({ yPX8xspWY: { iconSelection: "Plus" } }, x, I),
                      }),
                    }),
                  }),
                ],
              }),
              ee() &&
                a(g, {
                  __fromCanvasComponent: !0,
                  children: a(v, {
                    children: a(n.p, {
                      className: "framer-styles-preset-1cc56zh",
                      "data-styles-preset": "PWn1k_MD2",
                      style: {
                        "--framer-text-color":
                          "var(--extracted-r6o4lv, var(--variable-reference-CM1C23HdI-pK7Tv7wIU))",
                      },
                      children:
                        "You can cancel your plan whenever you\u2019d like. You\u2019ll be downgraded to the free plan. You won\u2019t be locked out of any projects that have paid plans.",
                    }),
                  }),
                  className: "framer-1wueld1",
                  layoutDependency: c,
                  layoutId: "Xoa1O0ULo",
                  style: {
                    "--extracted-r6o4lv": "var(--variable-reference-CM1C23HdI-pK7Tv7wIU)",
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                    "--variable-reference-CM1C23HdI-pK7Tv7wIU": s,
                    opacity: 0.8,
                  },
                  text: m,
                  verticalAlignment: "top",
                  withExternalLayout: !0,
                }),
            ],
          }),
        }),
      }),
    });
  }),
  he = [
    '.framer-9rRVn[data-border="true"]::after, .framer-9rRVn [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-9rRVn.framer-125ow2n, .framer-9rRVn .framer-125ow2n { display: block; }",
    ".framer-9rRVn.framer-14k8rn3 { align-content: flex-start; align-items: flex-start; cursor: pointer; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 617px; }",
    ".framer-9rRVn .framer-wf4vzb { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; height: 24px; justify-content: space-between; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-9rRVn .framer-10dl5x2 { flex: 1 0 0px; height: auto; max-width: 90%; overflow: hidden; position: relative; white-space: pre-wrap; width: 1px; word-break: break-word; word-wrap: break-word; }",
    ".framer-9rRVn .framer-n744wx { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-9rRVn .framer-pefwu9-container { flex: none; height: 16px; position: relative; width: 16px; }",
    ".framer-9rRVn .framer-1wueld1 { flex: none; height: auto; max-width: 460px; overflow: hidden; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-9rRVn.framer-14k8rn3, .framer-9rRVn .framer-n744wx { gap: 0px; } .framer-9rRVn.framer-14k8rn3 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-9rRVn.framer-14k8rn3 > :first-child { margin-top: 0px; } .framer-9rRVn.framer-14k8rn3 > :last-child { margin-bottom: 0px; } .framer-9rRVn .framer-n744wx > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-9rRVn .framer-n744wx > :first-child { margin-left: 0px; } .framer-9rRVn .framer-n744wx > :last-child { margin-right: 0px; } }",
    ...K,
    ...J,
  ],
  y = N(ue, he, "framer-9rRVn"),
  _e = y;
y.displayName = "FAQ";
y.defaultProps = { height: 106, width: 617 };
X(y, {
  variant: {
    options: ["T5CrfWy_o", "yPX8xspWY"],
    optionTitles: ["Open", "Closed"],
    title: "Variant",
    type: h.Enum,
  },
  CM1C23HdI: { defaultValue: "rgb(0, 0, 0)", title: "Color", type: h.Color },
  vd59XDbg4: {
    defaultValue: "Which pricing plan is right for me?",
    displayTextArea: !0,
    title: "Question",
    type: h.String,
  },
  m1wBZJAoM: {
    defaultValue:
      "You can cancel your plan whenever you\u2019d like. You\u2019ll be downgraded to the free plan. You won\u2019t be locked out of any projects that have paid plans.",
    displayTextArea: !0,
    title: "Answer",
    type: h.String,
  },
});
O(y, [...ne, ...L, ...B]);
export { _e as a };
//# sourceMappingURL=chunk-K7M2XYUE.mjs.map
