import { a as b } from "./chunk-G7RZZ2HZ.mjs";
import { b as e, c as P } from "./chunk-OO3TPEBQ.mjs";
import {
  K as j,
  P as h,
  S as X,
  V as _,
  Z as F,
  ba as C,
  c as p,
  g as I,
  j as w,
  l as L,
  n as B,
  o as S,
  pa as H,
  r as y,
  t as n,
  ua as O,
  v as W,
  va as V,
  wa as z,
} from "./chunk-QEUFNCD2.mjs";
var E = z(b),
  Z = { d77WtBORe: { hover: !0 }, I27BjI0db: { hover: !0 }, uvXz5tOXs: { hover: !0 } },
  J = ["d77WtBORe", "uvXz5tOXs", "I27BjI0db"],
  G = "framer-TnArR",
  U = { d77WtBORe: "framer-v-os1iv6", I27BjI0db: "framer-v-1s908fg", uvXz5tOXs: "framer-v-2sp4oc" };
function R(r, ...t) {
  let i = {};
  return (t?.forEach((a) => a && Object.assign(i, r[a])), i);
}
var Y = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  Q = ({ value: r, children: t }) => {
    let i = w(y),
      a = r ?? i.transition,
      s = B(() => ({ ...i, transition: a }), [JSON.stringify(a)]);
    return e(y.Provider, { value: s, children: t });
  },
  $ = n(p),
  ee = { Large: "d77WtBORe", Medium: "uvXz5tOXs", Small: "I27BjI0db" },
  re = ({ color: r, height: t, id: i, link: a, title: s, width: T, ...o }) => {
    var m, d, l, f;
    return {
      ...o,
      bVToBLBTS: (m = s ?? o.bVToBLBTS) !== null && m !== void 0 ? m : "Learn more",
      KqeH5xil_: (d = r ?? o.KqeH5xil_) !== null && d !== void 0 ? d : "rgb(0, 0, 0)",
      MJWWsEY26: a ?? o.MJWWsEY26,
      variant:
        (f = (l = ee[o.variant]) !== null && l !== void 0 ? l : o.variant) !== null && f !== void 0
          ? f
          : "d77WtBORe",
    };
  },
  te = (r, t) => t.join("-") + r.layoutDependency,
  ae = I(function (r, t) {
    let { activeLocale: i, setLocale: a } = j(),
      {
        style: s,
        className: T,
        layoutId: o,
        variant: m,
        bVToBLBTS: d,
        KqeH5xil_: l,
        MJWWsEY26: f,
        ...M
      } = re(r),
      {
        baseVariant: g,
        classNames: q,
        gestureVariant: x,
        setGestureState: c,
        setVariant: ne,
        transition: k,
        variants: A,
      } = H({
        cycleOrder: J,
        defaultVariant: "d77WtBORe",
        enabledGestures: Z,
        transitions: Y,
        variant: m,
        variantClassNames: U,
      }),
      v = te(r, A),
      K = S(null),
      N = L(),
      D = [];
    return e(W, {
      id: o ?? N,
      children: e($, {
        animate: A,
        initial: !1,
        children: e(Q, {
          value: k,
          children: e(C, {
            ...R({ I27BjI0db: { href: f }, uvXz5tOXs: { href: f } }, g, x),
            children: P(n.a, {
              ...M,
              className: `${_(G, ...D, "framer-os1iv6", T, q)} framer-1o3ofrl`,
              "data-framer-name": "Large",
              layoutDependency: v,
              layoutId: "d77WtBORe",
              onHoverEnd: () => c({ isHovered: !1 }),
              onHoverStart: () => c({ isHovered: !0 }),
              onTap: () => c({ isPressed: !1 }),
              onTapCancel: () => c({ isPressed: !1 }),
              onTapStart: () => c({ isPressed: !0 }),
              ref: t ?? K,
              style: { opacity: 1, ...s },
              variants: {
                "d77WtBORe-hover": { opacity: 0.5 },
                "I27BjI0db-hover": { opacity: 0.5 },
                "uvXz5tOXs-hover": { opacity: 0.5 },
              },
              ...R(
                {
                  "d77WtBORe-hover": { "data-framer-name": void 0 },
                  "I27BjI0db-hover": { "data-framer-name": void 0 },
                  "uvXz5tOXs-hover": { "data-framer-name": void 0 },
                  I27BjI0db: { "data-framer-name": "Small" },
                  uvXz5tOXs: { "data-framer-name": "Medium" },
                },
                g,
                x
              ),
              children: [
                e(O, {
                  __fromCanvasComponent: !0,
                  children: e(p, {
                    children: e(n.p, {
                      style: {
                        "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                        "--framer-font-family": '"Satoshi", "Satoshi Placeholder", sans-serif',
                        "--framer-font-size": "20px",
                        "--framer-font-weight": "500",
                        "--framer-letter-spacing": "0px",
                        "--framer-line-height": "1.5em",
                        "--framer-text-alignment": "center",
                        "--framer-text-color":
                          "var(--extracted-r6o4lv, var(--variable-reference-KqeH5xil_-FLXzApIyg))",
                      },
                      children: "Learn more",
                    }),
                  }),
                  className: "framer-td2eub",
                  fonts: ["FS;Satoshi-medium"],
                  layoutDependency: v,
                  layoutId: "PdZp_BQW6",
                  style: {
                    "--extracted-r6o4lv": "var(--variable-reference-KqeH5xil_-FLXzApIyg)",
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                    "--variable-reference-KqeH5xil_-FLXzApIyg": l,
                  },
                  text: d,
                  verticalAlignment: "top",
                  withExternalLayout: !0,
                  ...R(
                    {
                      I27BjI0db: {
                        children: e(p, {
                          children: e(n.p, {
                            style: {
                              "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                              "--framer-font-family":
                                '"Satoshi", "Satoshi Placeholder", sans-serif',
                              "--framer-font-size": "14px",
                              "--framer-font-weight": "500",
                              "--framer-letter-spacing": "-0.2px",
                              "--framer-line-height": "1.4em",
                              "--framer-text-alignment": "center",
                              "--framer-text-color":
                                "var(--extracted-r6o4lv, var(--variable-reference-KqeH5xil_-FLXzApIyg))",
                            },
                            children: "Learn more",
                          }),
                        }),
                      },
                      uvXz5tOXs: {
                        children: e(p, {
                          children: e(n.p, {
                            style: {
                              "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                              "--framer-font-family":
                                '"Satoshi", "Satoshi Placeholder", sans-serif',
                              "--framer-font-weight": "500",
                              "--framer-letter-spacing": "0px",
                              "--framer-line-height": "1.5em",
                              "--framer-text-alignment": "center",
                              "--framer-text-color":
                                "var(--extracted-r6o4lv, var(--variable-reference-KqeH5xil_-FLXzApIyg))",
                            },
                            children: "Learn more",
                          }),
                        }),
                      },
                    },
                    g,
                    x
                  ),
                }),
                e(n.div, {
                  className: "framer-1xgmqj0",
                  "data-framer-name": "Icon",
                  layoutDependency: v,
                  layoutId: "btakL8rlb",
                  children: e(n.div, {
                    className: "framer-169dxvj-container",
                    layoutDependency: v,
                    layoutId: "VjoCq4H5g-container",
                    children: e(b, {
                      color: l,
                      height: "100%",
                      iconSearch: "House",
                      iconSelection: "ArrowRight",
                      id: "VjoCq4H5g",
                      layoutId: "VjoCq4H5g",
                      mirrored: !1,
                      selectByList: !0,
                      style: { height: "100%", width: "100%" },
                      weight: "bold",
                      width: "100%",
                    }),
                  }),
                }),
              ],
            }),
          }),
        }),
      }),
    });
  }),
  oe = [
    '.framer-TnArR[data-border="true"]::after, .framer-TnArR [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-TnArR.framer-1o3ofrl, .framer-TnArR .framer-1o3ofrl { display: block; }",
    ".framer-TnArR.framer-os1iv6 { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-TnArR .framer-td2eub { flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-TnArR .framer-1xgmqj0 { flex: none; height: 20px; overflow: visible; position: relative; width: 20px; }",
    ".framer-TnArR .framer-169dxvj-container { bottom: -1px; flex: none; height: 20px; left: 0px; position: absolute; right: 0px; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-TnArR.framer-os1iv6 { gap: 0px; } .framer-TnArR.framer-os1iv6 > * { margin: 0px; margin-left: calc(6px / 2); margin-right: calc(6px / 2); } .framer-TnArR.framer-os1iv6 > :first-child { margin-left: 0px; } .framer-TnArR.framer-os1iv6 > :last-child { margin-right: 0px; } }",
    ".framer-TnArR.framer-v-2sp4oc.framer-os1iv6 { gap: 4px; text-decoration: none; }",
    ".framer-TnArR.framer-v-2sp4oc .framer-169dxvj-container { bottom: 1px; height: 16px; right: unset; width: 16px; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-TnArR.framer-v-2sp4oc.framer-os1iv6 { gap: 0px; } .framer-TnArR.framer-v-2sp4oc.framer-os1iv6 > * { margin: 0px; margin-left: calc(4px / 2); margin-right: calc(4px / 2); } .framer-TnArR.framer-v-2sp4oc.framer-os1iv6 > :first-child { margin-left: 0px; } .framer-TnArR.framer-v-2sp4oc.framer-os1iv6 > :last-child { margin-right: 0px; } }",
    ".framer-TnArR.framer-v-1s908fg.framer-os1iv6 { gap: 2px; text-decoration: none; }",
    ".framer-TnArR.framer-v-1s908fg .framer-1xgmqj0 { height: 16px; width: 16px; }",
    ".framer-TnArR.framer-v-1s908fg .framer-169dxvj-container { bottom: 1px; height: 13px; left: calc(50.00000000000002% - 13px / 2); right: unset; width: 13px; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-TnArR.framer-v-1s908fg.framer-os1iv6 { gap: 0px; } .framer-TnArR.framer-v-1s908fg.framer-os1iv6 > * { margin: 0px; margin-left: calc(2px / 2); margin-right: calc(2px / 2); } .framer-TnArR.framer-v-1s908fg.framer-os1iv6 > :first-child { margin-left: 0px; } .framer-TnArR.framer-v-1s908fg.framer-os1iv6 > :last-child { margin-right: 0px; } }",
    ".framer-TnArR.framer-v-os1iv6.hover .framer-169dxvj-container { left: unset; right: -3px; width: 20px; }",
    ".framer-TnArR.framer-v-2sp4oc.hover .framer-169dxvj-container { left: calc(50.00000000000002% - 16px / 2); right: unset; }",
    ".framer-TnArR.framer-v-1s908fg.hover .framer-169dxvj-container { left: unset; right: 0px; }",
  ],
  u = F(ae, oe, "framer-TnArR"),
  he = u;
u.displayName = "CTA";
u.defaultProps = { height: 30, width: 128.5 };
X(u, {
  variant: {
    options: ["d77WtBORe", "uvXz5tOXs", "I27BjI0db"],
    optionTitles: ["Large", "Medium", "Small"],
    title: "Variant",
    type: h.Enum,
  },
  bVToBLBTS: { defaultValue: "Learn more", displayTextArea: !1, title: "Title", type: h.String },
  KqeH5xil_: { defaultValue: "rgb(0, 0, 0)", title: "Color", type: h.Color },
  MJWWsEY26: { title: "Link", type: h.Link },
});
V(u, [
  {
    family: "Satoshi",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2",
    weight: "500",
  },
  ...E,
]);
export { he as a };
//# sourceMappingURL=chunk-2GNE24G3.mjs.map
