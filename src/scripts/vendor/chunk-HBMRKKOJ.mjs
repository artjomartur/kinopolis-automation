import { a as R } from "./chunk-2GNE24G3.mjs";
import { a as Z, b as B, c as O } from "./chunk-5SAWWLB7.mjs";
import { b as a, c as K } from "./chunk-OO3TPEBQ.mjs";
import {
  K as j,
  P as f,
  S as I,
  V as P,
  Z as q,
  c as x,
  g as H,
  j as _,
  l as V,
  n as C,
  o as F,
  pa as A,
  r as W,
  t as s,
  ua as G,
  v as k,
  va as L,
  wa as D,
} from "./chunk-QEUFNCD2.mjs";
var U = D(R),
  J = ["Z2wjynIFK", "Nq1uWl93W"],
  Y = "framer-11Hp4",
  $ = { Nq1uWl93W: "framer-v-6pc3bg", Z2wjynIFK: "framer-v-1ldpw1v" };
function N(r, ...e) {
  let o = {};
  return (e?.forEach((i) => i && Object.assign(o, r[i])), o);
}
var ee = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  re = ({ value: r, children: e }) => {
    let o = _(W),
      i = r ?? o.transition,
      n = C(() => ({ ...o, transition: i }), [JSON.stringify(i)]);
    return a(W.Provider, { value: n, children: e });
  },
  ae = s(x),
  te = { "\u26AA\uFE0F Day": "Z2wjynIFK", "\u26AB\uFE0F Night": "Nq1uWl93W" },
  oe = ({
    cTA: r,
    cTA1: e,
    height: o,
    id: i,
    rainbow: n,
    title: c,
    titleOpacity: l,
    width: S,
    ...t
  }) => {
    var m, p, u, h, v, d;
    return {
      ...t,
      GmAhv_WVa: (m = l ?? t.GmAhv_WVa) !== null && m !== void 0 ? m : 1,
      hSgW9f2ir: (p = c ?? t.hSgW9f2ir) !== null && p !== void 0 ? p : "Official Framer Resource",
      p2xmGpLux: (u = e ?? t.p2xmGpLux) !== null && u !== void 0 ? u : "Read more",
      ToKaS18SW: r ?? t.ToKaS18SW,
      variant:
        (v = (h = te[t.variant]) !== null && h !== void 0 ? h : t.variant) !== null && v !== void 0
          ? v
          : "Z2wjynIFK",
      Z69PPXt7v: (d = n ?? t.Z69PPXt7v) !== null && d !== void 0 ? d : !0,
    };
  },
  ie = (r, e) => e.join("-") + r.layoutDependency,
  ne = H(function (r, e) {
    let { activeLocale: o, setLocale: i } = j(),
      {
        style: n,
        className: c,
        layoutId: l,
        variant: S,
        GmAhv_WVa: t,
        hSgW9f2ir: m,
        ToKaS18SW: p,
        p2xmGpLux: u,
        Z69PPXt7v: h,
        ...v
      } = oe(r),
      {
        baseVariant: d,
        classNames: z,
        gestureVariant: w,
        setGestureState: g,
        setVariant: de,
        transition: E,
        variants: T,
      } = A({
        cycleOrder: J,
        defaultVariant: "Z2wjynIFK",
        transitions: ee,
        variant: S,
        variantClassNames: $,
      }),
      b = ie(r, T),
      M = F(null),
      X = V(),
      Q = [O];
    return a(k, {
      id: l ?? X,
      children: a(ae, {
        animate: T,
        initial: !1,
        children: a(re, {
          value: E,
          children: K(s.div, {
            ...v,
            className: P(Y, ...Q, "framer-1ldpw1v", c, z),
            "data-border": !0,
            "data-framer-name": "\u26AA\uFE0F Day",
            layoutDependency: b,
            layoutId: "Z2wjynIFK",
            onHoverEnd: () => g({ isHovered: !1 }),
            onHoverStart: () => g({ isHovered: !0 }),
            onTap: () => g({ isPressed: !1 }),
            onTapCancel: () => g({ isPressed: !1 }),
            onTapStart: () => g({ isPressed: !0 }),
            ref: e ?? M,
            style: {
              "--border-bottom-width": "1px",
              "--border-color":
                "var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1))",
              "--border-left-width": "1px",
              "--border-right-width": "1px",
              "--border-style": "solid",
              "--border-top-width": "1px",
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              WebkitBackdropFilter: "blur(5px)",
              ...n,
            },
            variants: {
              Nq1uWl93W: {
                "--border-color":
                  'var(--token-58a904ff-197a-49b3-8356-adaa464e1642, rgba(255, 255, 255, 0.17)) /* {"name":"Border Night"} */',
                backgroundColor:
                  "var(--token-fae2c128-35fb-45de-a6c2-32169f920c68, rgb(13, 13, 13))",
              },
            },
            ...N({ Nq1uWl93W: { "data-framer-name": "\u26AB\uFE0F Night" } }, d, w),
            children: [
              a(G, {
                __fromCanvasComponent: !0,
                children: a(x, {
                  children: a(s.p, {
                    className: "framer-styles-preset-1dts917",
                    "data-styles-preset": "hgKudGhZ5",
                    style: { "--framer-text-color": "var(--extracted-r6o4lv, rgb(0, 0, 0))" },
                    children: "Official Framer Resource",
                  }),
                }),
                className: "framer-1itjikp",
                layoutDependency: b,
                layoutId: "jftQ16Q74",
                style: {
                  "--extracted-r6o4lv": "rgb(0, 0, 0)",
                  "--framer-link-text-color": "rgb(0, 153, 255)",
                  "--framer-link-text-decoration": "underline",
                  opacity: t,
                },
                text: m,
                variants: { Nq1uWl93W: { "--extracted-r6o4lv": "rgb(255, 255, 255)" } },
                verticalAlignment: "top",
                withExternalLayout: !0,
                ...N(
                  {
                    Nq1uWl93W: {
                      children: a(x, {
                        children: a(s.p, {
                          className: "framer-styles-preset-1dts917",
                          "data-styles-preset": "hgKudGhZ5",
                          style: {
                            "--framer-text-color": "var(--extracted-r6o4lv, rgb(255, 255, 255))",
                          },
                          children: "Official Framer Resource",
                        }),
                      }),
                    },
                  },
                  d,
                  w
                ),
              }),
              p &&
                a(s.div, {
                  className: "framer-1qaf68g-container",
                  layoutDependency: b,
                  layoutId: "vuATD2HAu-container",
                  children: a(R, {
                    bVToBLBTS: u,
                    height: "100%",
                    id: "vuATD2HAu",
                    KqeH5xil_: "rgb(0, 0, 0)",
                    layoutId: "vuATD2HAu",
                    variant: "I27BjI0db",
                    width: "100%",
                    ...N({ Nq1uWl93W: { KqeH5xil_: "rgb(255, 255, 255)" } }, d, w),
                  }),
                }),
              h &&
                a(s.div, {
                  className: "framer-1tfk0cl",
                  "data-framer-name": "Gradient",
                  layoutDependency: b,
                  layoutId: "rAkevoeY7",
                  style: {
                    background:
                      "linear-gradient(270deg, rgb(41, 216, 255) 0%, rgb(173, 255, 188) 36.75922015765766%, rgb(255, 253, 130) 66.67546452702703%, rgb(245, 105, 255) 100%)",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    opacity: 0.3,
                  },
                  variants: { Nq1uWl93W: { opacity: 0.9 } },
                }),
            ],
          }),
        }),
      }),
    });
  }),
  le = [
    '.framer-11Hp4[data-border="true"]::after, .framer-11Hp4 [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-11Hp4.framer-1mqm9wz, .framer-11Hp4 .framer-1mqm9wz { display: block; }",
    ".framer-11Hp4.framer-1ldpw1v { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: auto; justify-content: center; overflow: hidden; padding: 8px 13px 8px 13px; position: relative; width: auto; will-change: var(--framer-will-change-override, transform); }",
    ".framer-11Hp4 .framer-1itjikp { flex: none; height: auto; position: relative; white-space: pre; width: auto; z-index: 2; }",
    ".framer-11Hp4 .framer-1qaf68g-container { flex: none; height: auto; position: relative; width: auto; z-index: 2; }",
    ".framer-11Hp4 .framer-1tfk0cl { flex: none; height: 101%; left: calc(49.2917847025496% - 100.56657223796034% / 2); overflow: hidden; position: absolute; top: calc(50.7042253521127% - 101.40845070422534% / 2); width: 101%; will-change: var(--framer-will-change-override, transform); }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-11Hp4.framer-1ldpw1v { gap: 0px; } .framer-11Hp4.framer-1ldpw1v > * { margin: 0px; margin-left: calc(6px / 2); margin-right: calc(6px / 2); } .framer-11Hp4.framer-1ldpw1v > :first-child { margin-left: 0px; } .framer-11Hp4.framer-1ldpw1v > :last-child { margin-right: 0px; } }",
    ".framer-11Hp4.framer-v-6pc3bg .framer-1itjikp, .framer-11Hp4.framer-v-6pc3bg .framer-1qaf68g-container { z-index: 0; }",
    ".framer-11Hp4.framer-v-6pc3bg .framer-1tfk0cl { left: 0px; mix-blend-mode: multiply; top: 0px; }",
    ...B,
  ],
  y = q(ne, le, "framer-11Hp4"),
  ye = y;
y.displayName = "Tag";
y.defaultProps = { height: 34, width: 176.5 };
I(y, {
  variant: {
    options: ["Z2wjynIFK", "Nq1uWl93W"],
    optionTitles: ["\u26AA\uFE0F Day", "\u26AB\uFE0F Night"],
    title: "Variant",
    type: f.Enum,
  },
  GmAhv_WVa: {
    defaultValue: 1,
    max: 1,
    min: 0,
    step: 0.01,
    title: "Title Opacity",
    type: f.Number,
  },
  hSgW9f2ir: {
    defaultValue: "Official Framer Resource",
    displayTextArea: !0,
    title: "Title",
    type: f.String,
  },
  ToKaS18SW: { defaultValue: !1, title: "CTA", type: f.Boolean },
  p2xmGpLux: { defaultValue: "Read more", displayTextArea: !1, title: "CTA", type: f.String },
  Z69PPXt7v: { defaultValue: !0, title: "Rainbow", type: f.Boolean },
});
L(y, [...U, ...Z]);
export { ye as a };
//# sourceMappingURL=chunk-HBMRKKOJ.mjs.map
