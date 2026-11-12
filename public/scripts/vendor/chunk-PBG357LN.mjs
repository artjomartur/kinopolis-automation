import { b as t, c as g } from "./chunk-OO3TPEBQ.mjs";
import {
  K as O,
  P as v,
  S as D,
  V as M,
  Z as V,
  ba as Z,
  c as h,
  g as R,
  j as T,
  l as C,
  n as k,
  o as L,
  pa as P,
  r as x,
  t as o,
  ua as j,
  v as J,
  va as G,
} from "./chunk-QEUFNCD2.mjs";
var Q = { eEZGnfswo: { hover: !0 }, WM0yTCkne: { hover: !0 } },
  H = ["eEZGnfswo", "WM0yTCkne"],
  U = "framer-JOeno",
  Y = { eEZGnfswo: "framer-v-9jrmwf", WM0yTCkne: "framer-v-igx568" };
function b(r, ...e) {
  let a = {};
  return (e?.forEach((s) => s && Object.assign(a, r[s])), a);
}
var A = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  I = (r, e) => `translateY(-50%) ${e}`,
  y = (r, e) => `translate(-50%, -50%) ${e}`,
  q = ({ value: r, children: e }) => {
    let a = T(x),
      s = r ?? a.transition,
      n = k(() => ({ ...a, transition: s }), [JSON.stringify(s)]);
    return t(x.Provider, { value: n, children: e });
  },
  K = o(h),
  $ = { "Logo Full": "WM0yTCkne", Logo: "eEZGnfswo" },
  X = ({ height: r, id: e, textColor: a, width: s, ...n }) => {
    var d, l, f;
    return {
      ...n,
      QPpn2xZty: (d = a ?? n.QPpn2xZty) !== null && d !== void 0 ? d : "rgb(0, 0, 0)",
      variant:
        (f = (l = $[n.variant]) !== null && l !== void 0 ? l : n.variant) !== null && f !== void 0
          ? f
          : "eEZGnfswo",
    };
  },
  ee = (r, e) => e.join("-") + r.layoutDependency,
  re = R(function (r, e) {
    let { activeLocale: a, setLocale: s } = O(),
      { style: n, className: d, layoutId: l, variant: f, QPpn2xZty: S, ...W } = X(r),
      {
        baseVariant: c,
        classNames: _,
        gestureVariant: u,
        setGestureState: m,
        setVariant: ae,
        transition: N,
        variants: w,
      } = P({
        cycleOrder: H,
        defaultVariant: "eEZGnfswo",
        enabledGestures: Q,
        transitions: A,
        variant: f,
        variantClassNames: Y,
      }),
      i = ee(r, w),
      E = L(null),
      F = () => u === "WM0yTCkne-hover" || c === "WM0yTCkne",
      B = C(),
      z = [];
    return t(J, {
      id: l ?? B,
      children: t(K, {
        animate: w,
        initial: !1,
        children: t(q, {
          value: N,
          children: t(Z, {
            href: { webPageId: "VJAzs2Sv4" },
            openInNewTab: !1,
            children: g(o.a, {
              ...W,
              className: `${M(U, ...z, "framer-9jrmwf", d, _)} framer-1oddkp4`,
              "data-framer-name": "Logo",
              layoutDependency: i,
              layoutId: "eEZGnfswo",
              onHoverEnd: () => m({ isHovered: !1 }),
              onHoverStart: () => m({ isHovered: !0 }),
              onTap: () => m({ isPressed: !1 }),
              onTapCancel: () => m({ isPressed: !1 }),
              onTapStart: () => m({ isPressed: !0 }),
              ref: e ?? E,
              style: { ...n },
              ...b(
                {
                  "eEZGnfswo-hover": { "data-framer-name": void 0 },
                  "WM0yTCkne-hover": { "data-framer-name": void 0 },
                  WM0yTCkne: { "data-framer-name": "Logo Full" },
                },
                c,
                u
              ),
              children: [
                g(o.div, {
                  className: "framer-vx2wjf",
                  layoutDependency: i,
                  layoutId: "Gs5LpymwD",
                  children: [
                    t(o.div, {
                      className: "framer-25j4m7",
                      layoutDependency: i,
                      layoutId: "JzqsJlEpw",
                      style: {
                        background:
                          "conic-gradient(from 0deg at 50% 50%, rgb(252, 214, 255) 0deg, rgb(41, 216, 255) 95.67567567567568deg, rgb(255, 253, 130) 180deg, rgb(242, 54, 255) 257.2297297297297deg, rgb(252, 214, 255) 360deg)",
                        borderBottomLeftRadius: 9,
                        borderBottomRightRadius: 9,
                        borderTopLeftRadius: 9,
                        borderTopRightRadius: 9,
                        boxShadow: "-2px 2px 20px 0px rgba(241, 56, 255, 0.3)",
                        filter: "blur(8px)",
                        opacity: 0.5,
                        WebkitFilter: "blur(8px)",
                      },
                      variants: {
                        "eEZGnfswo-hover": { opacity: 0.9 },
                        "WM0yTCkne-hover": { opacity: 0.9 },
                      },
                    }),
                    g(o.div, {
                      className: "framer-ltiz0n",
                      layoutDependency: i,
                      layoutId: "fvMGUddAD",
                      style: {
                        backgroundColor: "rgb(0, 0, 0)",
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      },
                      ...b({ WM0yTCkne: { transformTemplate: I } }, c, u),
                      children: [
                        t(o.div, {
                          className: "framer-7yvrq2",
                          "data-framer-name": "Blur",
                          layoutDependency: i,
                          layoutId: "yCiJNa0Ut",
                          style: {
                            background:
                              "conic-gradient(from 0deg at 50% 50%, rgb(252, 214, 255) 0deg, rgb(41, 216, 255) 95.67567567567568deg, rgb(255, 253, 130) 180deg, rgb(242, 54, 255) 257.2297297297297deg, rgb(252, 214, 255) 360deg)",
                            borderBottomLeftRadius: 2,
                            borderBottomRightRadius: 2,
                            borderTopLeftRadius: 2,
                            borderTopRightRadius: 2,
                            filter: "blur(6px)",
                            rotate: -45,
                            WebkitFilter: "blur(6px)",
                          },
                          transformTemplate: y,
                        }),
                        t(o.div, {
                          className: "framer-uw95ga",
                          layoutDependency: i,
                          layoutId: "hDMmYPs5p",
                          style: {
                            background:
                              "conic-gradient(from 0deg at 50% 50%, rgb(252, 214, 255) 0deg, rgb(41, 216, 255) 95.67567567567568deg, rgb(255, 253, 130) 180deg, rgb(242, 54, 255) 257.2297297297297deg, rgb(252, 214, 255) 360deg)",
                            borderBottomLeftRadius: 2,
                            borderBottomRightRadius: 2,
                            borderTopLeftRadius: 2,
                            borderTopRightRadius: 2,
                            boxShadow: "-2px 2px 20px 0px rgba(241, 56, 255, 0.3)",
                            rotate: -45,
                          },
                          transformTemplate: y,
                        }),
                        t(o.div, {
                          className: "framer-1ofxkp",
                          layoutDependency: i,
                          layoutId: "pLNzpII55",
                          style: {
                            backgroundColor: "rgb(0, 0, 0)",
                            borderBottomLeftRadius: 1,
                            borderBottomRightRadius: 1,
                            borderTopLeftRadius: 1,
                            borderTopRightRadius: 1,
                            rotate: -45,
                          },
                          transformTemplate: y,
                        }),
                      ],
                    }),
                  ],
                }),
                F() &&
                  t(j, {
                    __fromCanvasComponent: !0,
                    children: t(h, {
                      children: t(o.p, {
                        style: {
                          "--font-selector": "RlM7U3dpdHplci1zZW1pYm9sZA==",
                          "--framer-font-family": '"Switzer", "Switzer Placeholder", sans-serif',
                          "--framer-font-size": "18px",
                          "--framer-font-weight": "600",
                          "--framer-letter-spacing": "-0.7px",
                          "--framer-line-height": "0.9em",
                          "--framer-text-alignment": "left",
                          "--framer-text-color":
                            "var(--extracted-r6o4lv, var(--variable-reference-QPpn2xZty-DtRGLx0ml))",
                        },
                        children: "SaaS Website Kit",
                      }),
                    }),
                    className: "framer-3bw603",
                    fonts: ["FS;Switzer-semibold"],
                    layoutDependency: i,
                    layoutId: "BFAkf_Adx",
                    style: {
                      "--extracted-r6o4lv": "var(--variable-reference-QPpn2xZty-DtRGLx0ml)",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                      "--variable-reference-QPpn2xZty-DtRGLx0ml": S,
                      opacity: 1,
                    },
                    transformTemplate: I,
                    variants: { "WM0yTCkne-hover": { opacity: 0.7 } },
                    verticalAlignment: "top",
                    withExternalLayout: !0,
                    ...b(
                      {
                        "WM0yTCkne-hover": { transformTemplate: void 0 },
                        WM0yTCkne: { transformTemplate: void 0 },
                      },
                      c,
                      u
                    ),
                  }),
              ],
            }),
          }),
        }),
      }),
    });
  }),
  te = [
    '.framer-JOeno[data-border="true"]::after, .framer-JOeno [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-JOeno.framer-1oddkp4, .framer-JOeno .framer-1oddkp4 { display: block; }",
    ".framer-JOeno.framer-9jrmwf { cursor: pointer; height: 40px; overflow: visible; position: relative; text-decoration: none; width: 40px; }",
    ".framer-JOeno .framer-vx2wjf { bottom: -5px; flex: none; left: 0px; overflow: visible; position: absolute; right: 0px; top: 0px; }",
    ".framer-JOeno .framer-25j4m7 { aspect-ratio: 1 / 1; bottom: 0px; flex: none; height: var(--framer-aspect-ratio-supported, 40px); left: 0px; overflow: hidden; position: absolute; right: 0px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-JOeno .framer-ltiz0n { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 40px); left: 0px; overflow: hidden; position: absolute; right: 0px; top: 0px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-JOeno .framer-7yvrq2 { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 18px); left: 50%; overflow: hidden; position: absolute; top: 53%; width: 18px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-JOeno .framer-uw95ga { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 16px); left: 50%; overflow: hidden; position: absolute; top: 50%; width: 16px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-JOeno .framer-1ofxkp { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 8px); left: 50%; overflow: hidden; position: absolute; top: 50%; width: 8px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-JOeno .framer-3bw603 { flex: none; height: auto; position: absolute; right: -70px; top: 50%; white-space: pre; width: auto; }",
    ".framer-JOeno.framer-v-igx568.framer-9jrmwf { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; justify-content: center; padding: 0px 0px 0px 0px; width: min-content; }",
    ".framer-JOeno.framer-v-igx568 .framer-vx2wjf { bottom: unset; height: 45px; left: unset; position: relative; right: unset; top: unset; width: 40px; }",
    ".framer-JOeno.framer-v-igx568 .framer-25j4m7 { bottom: -2px; }",
    ".framer-JOeno.framer-v-igx568 .framer-ltiz0n { top: 49%; }",
    ".framer-JOeno.framer-v-igx568 .framer-3bw603 { position: relative; right: unset; top: unset; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-JOeno.framer-v-igx568.framer-9jrmwf { gap: 0px; } .framer-JOeno.framer-v-igx568.framer-9jrmwf > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-JOeno.framer-v-igx568.framer-9jrmwf > :first-child { margin-left: 0px; } .framer-JOeno.framer-v-igx568.framer-9jrmwf > :last-child { margin-right: 0px; } }",
    ".framer-JOeno.framer-v-igx568.hover .framer-vx2wjf { bottom: unset; left: unset; right: unset; top: unset; }",
    ".framer-JOeno.framer-v-igx568.hover .framer-3bw603 { right: unset; top: unset; }",
  ],
  p = V(re, te, "framer-JOeno"),
  me = p;
p.displayName = "Logo";
p.defaultProps = { height: 40, width: 40 };
D(p, {
  variant: {
    options: ["eEZGnfswo", "WM0yTCkne"],
    optionTitles: ["Logo", "Logo Full"],
    title: "Variant",
    type: v.Enum,
  },
  QPpn2xZty: { defaultValue: "rgb(0, 0, 0)", title: "Text Color", type: v.Color },
});
G(p, [
  {
    family: "Switzer",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/YS3VPNVO4B3TOJMEXDGFZQ4TLZGGSRZC.woff2",
    weight: "600",
  },
]);
export { me as a };
//# sourceMappingURL=chunk-PBG357LN.mjs.map
