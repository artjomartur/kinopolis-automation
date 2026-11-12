import { a as U, b as L, c as W } from "./chunk-D5CSMFZ4.mjs";
import { b as e, c as D } from "./chunk-OO3TPEBQ.mjs";
import {
  K as N,
  P as m,
  S as K,
  V as S,
  Z as V,
  c as d,
  g as B,
  j as I,
  l as k,
  n as M,
  o as _,
  pa as T,
  r as J,
  t as o,
  ta as P,
  ua as A,
  v as C,
  va as z,
} from "./chunk-QEUFNCD2.mjs";
var G = ["UpZj3qjIx", "FDBOJ17H7"],
  Q = "framer-AOj5K",
  X = { FDBOJ17H7: "framer-v-vy5ve0", UpZj3qjIx: "framer-v-12ont83" };
function F(t, ...r) {
  let n = {};
  return (r?.forEach((i) => i && Object.assign(n, t[i])), n);
}
var $ = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  ee = (t) =>
    typeof t == "object" && t !== null && typeof t.src == "string"
      ? t
      : typeof t == "string"
        ? { src: t }
        : void 0,
  te = ({ value: t, children: r }) => {
    let n = I(J),
      i = t ?? n.transition,
      c = M(() => ({ ...n, transition: i }), [JSON.stringify(i)]);
    return e(J.Provider, { value: c, children: r });
  },
  re = o(d),
  ae = { "\u26AA\uFE0F Day": "UpZj3qjIx", "\u26AB\uFE0F Night": "FDBOJ17H7" },
  oe = ({
    height: t,
    id: r,
    image: n,
    image1: i,
    name1: c,
    quote: u,
    subtitle: f,
    subtitle1: h,
    width: H,
    ...a
  }) => {
    var g, y, x, b, v, l, w, s;
    return {
      ...a,
      aY3NDFicr:
        (g = i ?? a.aY3NDFicr) !== null && g !== void 0
          ? g
          : {
              src: "https://framerusercontent.com/images/sMqVvBfBl5KcmlBwot3cCOu0u6c.jpg?scale-down-to=512",
              srcSet:
                "https://framerusercontent.com/images/sMqVvBfBl5KcmlBwot3cCOu0u6c.jpg?scale-down-to=1024 819w,https://framerusercontent.com/images/sMqVvBfBl5KcmlBwot3cCOu0u6c.jpg?scale-down-to=2048 1638w,https://framerusercontent.com/images/sMqVvBfBl5KcmlBwot3cCOu0u6c.jpg 2160w",
            },
      bErIHJkdI:
        (y = u ?? a.bErIHJkdI) !== null && y !== void 0
          ? y
          : "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention. This powerful web design platform is more than just a design tool - it's a complete ecosystem.",
      iblTMwOmJ: (x = h ?? a.iblTMwOmJ) !== null && x !== void 0 ? x : "@mariac3203094",
      oVU8J_Br4: (b = c ?? a.oVU8J_Br4) !== null && b !== void 0 ? b : "Maria Cortez",
      tbHzgMiO7: (v = n ?? a.tbHzgMiO7) !== null && v !== void 0 ? v : !0,
      variant:
        (w = (l = ae[a.variant]) !== null && l !== void 0 ? l : a.variant) !== null && w !== void 0
          ? w
          : "UpZj3qjIx",
      yhkvJJf0e: (s = f ?? a.yhkvJJf0e) !== null && s !== void 0 ? s : !0,
    };
  },
  ne = (t, r) => r.join("-") + t.layoutDependency,
  ie = B(function (t, r) {
    let { activeLocale: n, setLocale: i } = N(),
      {
        style: c,
        className: u,
        layoutId: f,
        variant: h,
        bErIHJkdI: H,
        tbHzgMiO7: a,
        aY3NDFicr: g,
        oVU8J_Br4: y,
        yhkvJJf0e: x,
        iblTMwOmJ: b,
        ...v
      } = oe(t),
      {
        baseVariant: l,
        classNames: w,
        gestureVariant: s,
        setGestureState: j,
        setVariant: se,
        transition: Z,
        variants: R,
      } = T({
        cycleOrder: G,
        defaultVariant: "UpZj3qjIx",
        transitions: $,
        variant: h,
        variantClassNames: X,
      }),
      p = ne(t, R),
      E = _(null),
      q = k(),
      Y = [W];
    return e(C, {
      id: f ?? q,
      children: e(re, {
        animate: R,
        initial: !1,
        children: e(te, {
          value: Z,
          children: D(o.div, {
            ...v,
            className: S(Q, ...Y, "framer-12ont83", u, w),
            "data-border": !0,
            "data-framer-name": "\u26AA\uFE0F Day",
            layoutDependency: p,
            layoutId: "UpZj3qjIx",
            onHoverEnd: () => j({ isHovered: !1 }),
            onHoverStart: () => j({ isHovered: !0 }),
            onTap: () => j({ isPressed: !1 }),
            onTapCancel: () => j({ isPressed: !1 }),
            onTapStart: () => j({ isPressed: !0 }),
            ref: r ?? E,
            style: {
              "--border-bottom-width": "1px",
              "--border-color":
                "var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1))",
              "--border-left-width": "1px",
              "--border-right-width": "1px",
              "--border-style": "solid",
              "--border-top-width": "1px",
              backgroundColor:
                "var(--token-8c47652b-dea5-4767-a9f2-5d952dcce49a, rgb(255, 255, 255))",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              boxShadow: "0px 10px 15px 0px rgba(0, 0, 0, 0.08)",
              ...c,
            },
            variants: {
              FDBOJ17H7: {
                "--border-color":
                  "var(--token-58a904ff-197a-49b3-8356-adaa464e1642, rgba(255, 255, 255, 0.12))",
                backgroundColor:
                  "var(--token-fae2c128-35fb-45de-a6c2-32169f920c68, rgb(20, 20, 20))",
              },
            },
            ...F({ FDBOJ17H7: { "data-framer-name": "\u26AB\uFE0F Night" } }, l, s),
            children: [
              e(A, {
                __fromCanvasComponent: !0,
                children: e(d, {
                  children: e(o.p, {
                    className: "framer-styles-preset-1cc56zh",
                    "data-styles-preset": "PWn1k_MD2",
                    style: { "--framer-text-alignment": "left" },
                    children:
                      "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention. This powerful web design platform is more than just a design tool - it's a complete ecosystem.",
                  }),
                }),
                className: "framer-1veht45",
                layoutDependency: p,
                layoutId: "Fu9aLXsGP",
                style: {
                  "--framer-link-text-color": "rgb(0, 153, 255)",
                  "--framer-link-text-decoration": "underline",
                },
                text: H,
                variants: { FDBOJ17H7: { "--extracted-r6o4lv": "rgb(255, 255, 255)" } },
                verticalAlignment: "top",
                withExternalLayout: !0,
                ...F(
                  {
                    FDBOJ17H7: {
                      children: e(d, {
                        children: e(o.p, {
                          className: "framer-styles-preset-1cc56zh",
                          "data-styles-preset": "PWn1k_MD2",
                          style: {
                            "--framer-text-alignment": "left",
                            "--framer-text-color": "var(--extracted-r6o4lv, rgb(255, 255, 255))",
                          },
                          children:
                            "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention. This powerful web design platform is more than just a design tool - it's a complete ecosystem.",
                        }),
                      }),
                    },
                  },
                  l,
                  s
                ),
              }),
              D(o.div, {
                className: "framer-1rejftm",
                layoutDependency: p,
                layoutId: "Vpy7ENGFc",
                children: [
                  a &&
                    e(P, {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 2700,
                        intrinsicWidth: 2160,
                        pixelHeight: 2700,
                        pixelWidth: 2160,
                        sizes: "42px",
                        ...ee(g),
                      },
                      className: "framer-1lfd3bb",
                      layoutDependency: p,
                      layoutId: "GEOuw0Xf_",
                      style: {
                        borderBottomLeftRadius: "100%",
                        borderBottomRightRadius: "100%",
                        borderTopLeftRadius: "100%",
                        borderTopRightRadius: "100%",
                      },
                    }),
                  D(o.div, {
                    className: "framer-1wbodma",
                    layoutDependency: p,
                    layoutId: "YUYP_Q4kt",
                    children: [
                      e(A, {
                        __fromCanvasComponent: !0,
                        children: e(d, {
                          children: e(o.p, {
                            style: {
                              "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                              "--framer-font-family":
                                '"Satoshi", "Satoshi Placeholder", sans-serif',
                              "--framer-font-weight": "500",
                              "--framer-letter-spacing": "0px",
                              "--framer-text-alignment": "left",
                            },
                            children: "Maria Cortez",
                          }),
                        }),
                        className: "framer-1j4hf56",
                        fonts: ["FS;Satoshi-medium"],
                        layoutDependency: p,
                        layoutId: "YMicFbRCr",
                        style: {
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                        },
                        text: y,
                        variants: { FDBOJ17H7: { "--extracted-r6o4lv": "rgb(255, 255, 255)" } },
                        verticalAlignment: "top",
                        withExternalLayout: !0,
                        ...F(
                          {
                            FDBOJ17H7: {
                              children: e(d, {
                                children: e(o.p, {
                                  style: {
                                    "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                    "--framer-font-family":
                                      '"Satoshi", "Satoshi Placeholder", sans-serif',
                                    "--framer-font-weight": "500",
                                    "--framer-letter-spacing": "0px",
                                    "--framer-text-alignment": "left",
                                    "--framer-text-color":
                                      "var(--extracted-r6o4lv, rgb(255, 255, 255))",
                                  },
                                  children: "Maria Cortez",
                                }),
                              }),
                            },
                          },
                          l,
                          s
                        ),
                      }),
                      x &&
                        e(A, {
                          __fromCanvasComponent: !0,
                          children: e(d, {
                            children: e(o.p, {
                              className: "framer-styles-preset-1cc56zh",
                              "data-styles-preset": "PWn1k_MD2",
                              style: { "--framer-text-alignment": "left" },
                              children: "@mariac3203094",
                            }),
                          }),
                          className: "framer-13rlq12",
                          layoutDependency: p,
                          layoutId: "VUTRNWRgC",
                          style: {
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            opacity: 0.8,
                          },
                          text: b,
                          variants: { FDBOJ17H7: { "--extracted-r6o4lv": "rgb(255, 255, 255)" } },
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                          ...F(
                            {
                              FDBOJ17H7: {
                                children: e(d, {
                                  children: e(o.p, {
                                    className: "framer-styles-preset-1cc56zh",
                                    "data-styles-preset": "PWn1k_MD2",
                                    style: {
                                      "--framer-text-alignment": "left",
                                      "--framer-text-color":
                                        "var(--extracted-r6o4lv, rgb(255, 255, 255))",
                                    },
                                    children: "@mariac3203094",
                                  }),
                                }),
                              },
                            },
                            l,
                            s
                          ),
                        }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
    });
  }),
  le = [
    '.framer-AOj5K[data-border="true"]::after, .framer-AOj5K [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-AOj5K.framer-huaf87, .framer-AOj5K .framer-huaf87 { display: block; }",
    ".framer-AOj5K.framer-12ont83 { align-content: flex-start; align-items: flex-start; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 340px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-AOj5K .framer-1veht45 { flex: none; height: auto; max-width: 400px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-AOj5K .framer-1rejftm { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-AOj5K .framer-1lfd3bb { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 42px); overflow: hidden; position: relative; width: 42px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-AOj5K .framer-1wbodma { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-AOj5K .framer-1j4hf56, .framer-AOj5K .framer-13rlq12 { flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-AOj5K.framer-12ont83, .framer-AOj5K .framer-1rejftm, .framer-AOj5K .framer-1wbodma { gap: 0px; } .framer-AOj5K.framer-12ont83 > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-AOj5K.framer-12ont83 > :first-child, .framer-AOj5K .framer-1wbodma > :first-child { margin-top: 0px; } .framer-AOj5K.framer-12ont83 > :last-child, .framer-AOj5K .framer-1wbodma > :last-child { margin-bottom: 0px; } .framer-AOj5K .framer-1rejftm > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-AOj5K .framer-1rejftm > :first-child { margin-left: 0px; } .framer-AOj5K .framer-1rejftm > :last-child { margin-right: 0px; } .framer-AOj5K .framer-1wbodma > * { margin: 0px; margin-bottom: calc(0px / 2); margin-top: calc(0px / 2); } }",
    ...L,
  ],
  O = V(ie, le, "framer-AOj5K"),
  ye = O;
O.displayName = "Testimonial Card";
O.defaultProps = { height: 287, width: 340 };
K(O, {
  variant: {
    options: ["UpZj3qjIx", "FDBOJ17H7"],
    optionTitles: ["\u26AA\uFE0F Day", "\u26AB\uFE0F Night"],
    title: "Variant",
    type: m.Enum,
  },
  bErIHJkdI: {
    defaultValue:
      "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention. This powerful web design platform is more than just a design tool - it's a complete ecosystem.",
    displayTextArea: !0,
    title: "Quote",
    type: m.String,
  },
  tbHzgMiO7: { defaultValue: !0, title: "Image", type: m.Boolean },
  aY3NDFicr: {
    __defaultAssetReference:
      "data:framer/asset-reference,sMqVvBfBl5KcmlBwot3cCOu0u6c.jpg?originalFilename=photo-1694106348181-7738c01407b4%3Fcrop%3Dentropy%26cs%3Dsrgb%26fm%3Djpg%26ixid%3DM3wxMzc5NjJ8MHwxfHNlYXJjaHwzNHx8cGVyc29uJTIwM2R8ZW58MHx8fHwxNzA4NzAxMzgwfDA%26ixlib%3Drb-4.0.jpg&preferredSize=auto",
    title: "Image",
    type: m.ResponsiveImage,
  },
  oVU8J_Br4: { defaultValue: "Maria Cortez", displayTextArea: !1, title: "Name", type: m.String },
  yhkvJJf0e: { defaultValue: !0, title: "Subtitle", type: m.Boolean },
  iblTMwOmJ: {
    defaultValue: "@mariac3203094",
    displayTextArea: !1,
    title: "Subtitle",
    type: m.String,
  },
});
z(O, [
  {
    family: "Satoshi",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2",
    weight: "500",
  },
  ...U,
]);
export { ye as a };
//# sourceMappingURL=chunk-OLXWMHQS.mjs.map
