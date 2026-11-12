import { a as w } from "./chunk-G7RZZ2HZ.mjs";
import { b as t, c as E } from "./chunk-OO3TPEBQ.mjs";
import {
  K as S,
  P as f,
  S as z,
  V as L,
  Z as D,
  ba as R,
  c as x,
  g as j,
  j as k,
  l as M,
  la as V,
  n as _,
  o as A,
  pa as P,
  r as g,
  sa as T,
  t as d,
  ua as q,
  v as H,
  va as X,
  wa as J,
} from "./chunk-QEUFNCD2.mjs";
T.loadFonts(["FS;Satoshi-medium", "Inter-Bold", "Inter-BoldItalic", "Inter-Italic"]);
var G = [
    {
      family: "Satoshi",
      source: "fontshare",
      style: "normal",
      url: "../../assets/misc/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2",
      weight: "500",
    },
  ],
  K = [
    '.framer-ORjCh .framer-styles-preset-1liy3mn:not(.rich-text-wrapper), .framer-ORjCh .framer-styles-preset-1liy3mn.rich-text-wrapper p { --framer-font-family: "Satoshi", "Satoshi Placeholder", sans-serif; --framer-font-family-bold: "Inter-Bold", "Inter", "Inter Placeholder", sans-serif; --framer-font-family-bold-italic: "Inter-BoldItalic", "Inter", "Inter Placeholder", sans-serif; --framer-font-family-italic: "Inter-Italic", "Inter", "Inter Placeholder", sans-serif; --framer-font-size: 16px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-weight: 500; --framer-font-weight-bold: 700; --framer-font-weight-bold-italic: 700; --framer-font-weight-italic: 400; --framer-letter-spacing: 0px; --framer-line-height: 1.5em; --framer-paragraph-spacing: 20px; --framer-text-alignment: left; --framer-text-color: #000000; --framer-text-decoration: none; --framer-text-transform: none; }',
  ],
  Y = "framer-ORjCh";
var se = J(w),
  le = { AY2iJjz0z: { hover: !0 } },
  de = ["pulFlqedB", "TuI1FkLhZ", "AY2iJjz0z"],
  fe = "framer-bsMNF",
  ce = {
    AY2iJjz0z: "framer-v-162iq3o",
    pulFlqedB: "framer-v-1wdy4ks",
    TuI1FkLhZ: "framer-v-baarrv",
  };
function me(e, ...r) {
  let a = {};
  return (r?.forEach((o) => o && Object.assign(a, e[o])), a);
}
var pe = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  ue = ({ value: e, children: r }) => {
    let a = k(g),
      o = e ?? a.transition,
      i = _(() => ({ ...a, transition: o }), [JSON.stringify(o)]);
    return t(g.Provider, { value: i, children: r });
  },
  ye = d(x),
  he = { Closed: "TuI1FkLhZ", Open: "pulFlqedB", Simple: "AY2iJjz0z" },
  ve = ({ color: e, height: r, hover: a, id: o, link: i, title: c, width: h, ...n }) => {
    var m, s, l, p;
    return {
      ...n,
      Dl6AiX37G: (m = e ?? n.Dl6AiX37G) !== null && m !== void 0 ? m : "rgb(0, 0, 0)",
      kcKdHX2wm: (s = c ?? n.kcKdHX2wm) !== null && s !== void 0 ? s : "Features",
      NKudH2mEX: i ?? n.NKudH2mEX,
      qe8e_sxRy: a ?? n.qe8e_sxRy,
      variant:
        (p = (l = he[n.variant]) !== null && l !== void 0 ? l : n.variant) !== null && p !== void 0
          ? p
          : "pulFlqedB",
    };
  },
  be = (e, r) => r.join("-") + e.layoutDependency,
  xe = j(function (e, r) {
    let { activeLocale: a, setLocale: o } = S(),
      {
        style: i,
        className: c,
        layoutId: h,
        variant: n,
        kcKdHX2wm: m,
        qe8e_sxRy: s,
        Dl6AiX37G: l,
        NKudH2mEX: p,
        ...Z
      } = ve(e),
      {
        baseVariant: b,
        classNames: B,
        gestureVariant: F,
        setGestureState: u,
        setVariant: O,
        transition: W,
        variants: C,
      } = P({
        cycleOrder: de,
        defaultVariant: "pulFlqedB",
        enabledGestures: le,
        transitions: pe,
        variant: n,
        variantClassNames: ce,
      }),
      v = be(e, C),
      { activeVariantCallback: I, delay: we } = V(b),
      Q = I(async (...N) => {
        if (s && (await s(...N)) === !1) return !1;
      }),
      U = I(async (...N) => {
        O("vZNkcdFXx");
      }),
      $ = A(null),
      ee = () => !(F === "AY2iJjz0z-hover" || b === "AY2iJjz0z"),
      re = M(),
      te = [Y];
    return t(H, {
      id: h ?? re,
      children: t(ye, {
        animate: C,
        initial: !1,
        children: t(ue, {
          value: W,
          children: t(R, {
            href: p,
            children: E(d.a, {
              ...Z,
              className: `${L(fe, ...te, "framer-1wdy4ks", c, B)} framer-roi0j8`,
              "data-framer-name": "Open",
              "data-highlight": !0,
              layoutDependency: v,
              layoutId: "pulFlqedB",
              onHoverEnd: () => u({ isHovered: !1 }),
              onHoverStart: () => u({ isHovered: !0 }),
              onMouseEnter: Q,
              onTap: () => u({ isPressed: !1 }),
              onTapCancel: () => u({ isPressed: !1 }),
              onTapStart: () => u({ isPressed: !0 }),
              ref: r ?? $,
              style: { ...i },
              ...me(
                {
                  "AY2iJjz0z-hover": {
                    "data-framer-name": void 0,
                    "data-highlight": void 0,
                    onMouseEnter: void 0,
                  },
                  AY2iJjz0z: {
                    "data-framer-name": "Simple",
                    "data-highlight": void 0,
                    onMouseEnter: void 0,
                  },
                  TuI1FkLhZ: { "data-framer-name": "Closed" },
                },
                b,
                F
              ),
              children: [
                t(q, {
                  __fromCanvasComponent: !0,
                  children: t(x, {
                    children: t(d.p, {
                      className: "framer-styles-preset-1liy3mn",
                      "data-styles-preset": "sWDjdymW6",
                      style: {
                        "--framer-text-color":
                          "var(--extracted-r6o4lv, var(--variable-reference-Dl6AiX37G-a7w3v2CCa))",
                      },
                      children: "Features",
                    }),
                  }),
                  className: "framer-b7fp7k",
                  layoutDependency: v,
                  layoutId: "mHiSIHdfP",
                  style: {
                    "--extracted-r6o4lv": "var(--variable-reference-Dl6AiX37G-a7w3v2CCa)",
                    "--variable-reference-Dl6AiX37G-a7w3v2CCa": l,
                    opacity: 0.6,
                  },
                  text: m,
                  variants: { "AY2iJjz0z-hover": { opacity: 1 }, TuI1FkLhZ: { opacity: 1 } },
                  verticalAlignment: "top",
                  withExternalLayout: !0,
                }),
                ee() &&
                  t(d.div, {
                    className: "framer-jyo5yj",
                    layoutDependency: v,
                    layoutId: "fLarbH1fh",
                    style: { rotate: 0 },
                    variants: { TuI1FkLhZ: { rotate: -180 } },
                    children: t(d.div, {
                      className: "framer-16uib3x-container",
                      layoutDependency: v,
                      layoutId: "ay1YqJbqw-container",
                      style: { opacity: 0.6 },
                      variants: { TuI1FkLhZ: { opacity: 1 } },
                      children: t(w, {
                        color: l,
                        height: "100%",
                        iconSearch: "House",
                        iconSelection: "CaretDown",
                        id: "ay1YqJbqw",
                        layoutId: "ay1YqJbqw",
                        mirrored: !1,
                        onClick: U,
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
  ge = [
    '.framer-bsMNF[data-border="true"]::after, .framer-bsMNF [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-bsMNF.framer-roi0j8, .framer-bsMNF .framer-roi0j8 { display: block; }",
    ".framer-bsMNF.framer-1wdy4ks { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 4px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; text-decoration: none; width: min-content; }",
    ".framer-bsMNF .framer-b7fp7k { flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-bsMNF .framer-jyo5yj { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 12px; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 12px; }",
    ".framer-bsMNF .framer-16uib3x-container { flex: none; height: 12px; position: relative; width: 12px; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-bsMNF.framer-1wdy4ks, .framer-bsMNF .framer-jyo5yj { gap: 0px; } .framer-bsMNF.framer-1wdy4ks > * { margin: 0px; margin-left: calc(4px / 2); margin-right: calc(4px / 2); } .framer-bsMNF.framer-1wdy4ks > :first-child, .framer-bsMNF .framer-jyo5yj > :first-child { margin-left: 0px; } .framer-bsMNF.framer-1wdy4ks > :last-child, .framer-bsMNF .framer-jyo5yj > :last-child { margin-right: 0px; } .framer-bsMNF .framer-jyo5yj > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } }",
    ".framer-bsMNF.framer-v-162iq3o.framer-1wdy4ks { cursor: pointer; }",
    ...K,
  ],
  y = D(xe, ge, "framer-bsMNF"),
  Ae = y;
y.displayName = "Nav/Menu";
y.defaultProps = { height: 24, width: 77 };
z(y, {
  variant: {
    options: ["pulFlqedB", "TuI1FkLhZ", "AY2iJjz0z"],
    optionTitles: ["Open", "Closed", "Simple"],
    title: "Variant",
    type: f.Enum,
  },
  kcKdHX2wm: { defaultValue: "Features", displayTextArea: !1, title: "Title", type: f.String },
  qe8e_sxRy: { title: "Hover", type: f.EventHandler },
  Dl6AiX37G: { defaultValue: "rgb(0, 0, 0)", title: "Color", type: f.Color },
  NKudH2mEX: { title: "Link", type: f.Link },
});
X(y, [...se, ...G]);
export { G as a, K as b, Y as c, Ae as d };
//# sourceMappingURL=chunk-G5VSNPDD.mjs.map
