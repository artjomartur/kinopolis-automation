import { a as P } from "./chunk-MLYPFAXL.mjs";
import { a as re, b as te, c as ae } from "./chunk-3H53UPLQ.mjs";
import { a as oe, b as ne, c as ie } from "./chunk-D5CSMFZ4.mjs";
import { a as z } from "./chunk-2GNE24G3.mjs";
import { a as ee } from "./chunk-G7RZZ2HZ.mjs";
import { b as e, c as N } from "./chunk-OO3TPEBQ.mjs";
import {
  K as W,
  P as n,
  S as A,
  T as H,
  V as J,
  Z as U,
  c as l,
  g as M,
  j as V,
  l as q,
  n as E,
  o as O,
  pa as Y,
  r as G,
  t as o,
  ta as Z,
  ua as j,
  v as B,
  va as $,
  wa as D,
} from "./chunk-QEUFNCD2.mjs";
var fe = D(P),
  me = D(z),
  S = H(ee),
  pe = ["s4zc08oCU", "FGm07QIce", "Gp4GjxKpI", "EsJzlpnfQ"],
  ue = "framer-FsXuI",
  he = {
    EsJzlpnfQ: "framer-v-ku9xom",
    FGm07QIce: "framer-v-1iom2qn",
    Gp4GjxKpI: "framer-v-i118qm",
    s4zc08oCU: "framer-v-x9hesa",
  };
function L(r, ...a) {
  let c = {};
  return (a?.forEach((i) => i && Object.assign(c, r[i])), c);
}
var ge = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  ye = (r) =>
    typeof r == "object" && r !== null && typeof r.src == "string"
      ? r
      : typeof r == "string"
        ? { src: r }
        : void 0,
  xe = ({ value: r, children: a }) => {
    let c = V(G),
      i = r ?? c.transition,
      f = E(() => ({ ...c, transition: i }), [JSON.stringify(i)]);
    return e(G.Provider, { value: f, children: a });
  },
  ve = o(l),
  be = {
    "\u26AA\uFE0F Day Left": "FGm07QIce",
    "\u26AA\uFE0F Day Middle": "s4zc08oCU",
    "\u26AB\uFE0F Night Left": "EsJzlpnfQ",
    "\u26AB\uFE0F Night Middle": "Gp4GjxKpI",
  },
  we = ({
    cTA: r,
    cTA1: a,
    height: c,
    icon: i,
    icon1: f,
    icon2: h,
    iconBackground: m,
    id: T,
    image: g,
    image1: y,
    link: x,
    text: v,
    title: b,
    width: Q,
    ...t
  }) => {
    var w, I, F, k, C, p, X, u, s, R;
    return {
      ...t,
      aa5hKvvkV: (w = f ?? t.aa5hKvvkV) !== null && w !== void 0 ? w : "Leaf",
      BFuTBK47u:
        (I = v ?? t.BFuTBK47u) !== null && I !== void 0
          ? I
          : "Enhance your productivity by connecting with your favorite tools, keeping all your essentials in one place.",
      cX1P9xQse: x ?? t.cX1P9xQse,
      jFgwazo_q: (F = h ?? t.jFgwazo_q) !== null && F !== void 0 ? F : "rgb(255, 255, 255)",
      oc_8kOa9a: (k = b ?? t.oc_8kOa9a) !== null && k !== void 0 ? k : "Integration ecosystem",
      OLqpcuIeL: g ?? t.OLqpcuIeL,
      PFec_i8Ff:
        (C = y ?? t.PFec_i8Ff) !== null && C !== void 0
          ? C
          : {
              src: "https://framerusercontent.com/images/WwuSEtN77IMXeoOP6vheQadgDRA.jpg?scale-down-to=512",
              srcSet:
                "https://framerusercontent.com/images/WwuSEtN77IMXeoOP6vheQadgDRA.jpg?scale-down-to=512 512w,https://framerusercontent.com/images/WwuSEtN77IMXeoOP6vheQadgDRA.jpg?scale-down-to=1024 1024w,https://framerusercontent.com/images/WwuSEtN77IMXeoOP6vheQadgDRA.jpg?scale-down-to=2048 2048w,https://framerusercontent.com/images/WwuSEtN77IMXeoOP6vheQadgDRA.jpg?scale-down-to=4096 4096w,https://framerusercontent.com/images/WwuSEtN77IMXeoOP6vheQadgDRA.jpg 9600w",
            },
      qkbS0bCx8: (p = a ?? t.qkbS0bCx8) !== null && p !== void 0 ? p : "Learn more",
      UaS05r1yh: (X = m ?? t.UaS05r1yh) !== null && X !== void 0 ? X : "rgb(0, 0, 0)",
      variant:
        (s = (u = be[t.variant]) !== null && u !== void 0 ? u : t.variant) !== null && s !== void 0
          ? s
          : "s4zc08oCU",
      Y3X4CKI40: (R = i ?? t.Y3X4CKI40) !== null && R !== void 0 ? R : !0,
      ZA2T3dGW4: r ?? t.ZA2T3dGW4,
    };
  },
  Ie = (r, a) => a.join("-") + r.layoutDependency,
  Fe = M(function (r, a) {
    let { activeLocale: c, setLocale: i } = W(),
      {
        style: f,
        className: h,
        layoutId: m,
        variant: T,
        OLqpcuIeL: g,
        PFec_i8Ff: y,
        Y3X4CKI40: x,
        aa5hKvvkV: v,
        UaS05r1yh: b,
        jFgwazo_q: Q,
        oc_8kOa9a: t,
        BFuTBK47u: w,
        ZA2T3dGW4: I,
        qkbS0bCx8: F,
        cX1P9xQse: k,
        ...C
      } = we(r),
      {
        baseVariant: p,
        classNames: X,
        gestureVariant: u,
        setGestureState: s,
        setVariant: R,
        transition: le,
        variants: K,
      } = Y({
        cycleOrder: pe,
        defaultVariant: "s4zc08oCU",
        transitions: ge,
        variant: T,
        variantClassNames: he,
      }),
      d = Ie(r, K),
      se = O(null),
      de = q(),
      ce = [ae, ie];
    return e(B, {
      id: m ?? de,
      children: e(ve, {
        animate: K,
        initial: !1,
        children: e(xe, {
          value: le,
          children: N(o.div, {
            ...C,
            className: J(ue, ...ce, "framer-x9hesa", h, X),
            "data-border": !0,
            "data-framer-name": "\u26AA\uFE0F Day Middle",
            layoutDependency: d,
            layoutId: "s4zc08oCU",
            onHoverEnd: () => s({ isHovered: !1 }),
            onHoverStart: () => s({ isHovered: !0 }),
            onTap: () => s({ isPressed: !1 }),
            onTapCancel: () => s({ isPressed: !1 }),
            onTapStart: () => s({ isPressed: !0 }),
            ref: a ?? se,
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
              boxShadow: "0px 10px 20px 0px rgba(0, 0, 0, 0.1)",
              ...f,
            },
            variants: {
              EsJzlpnfQ: {
                "--border-color":
                  'var(--token-58a904ff-197a-49b3-8356-adaa464e1642, rgba(255, 255, 255, 0.12)) /* {"name":"Border Night"} */',
                backgroundColor:
                  "var(--token-fae2c128-35fb-45de-a6c2-32169f920c68, rgb(13, 13, 13))",
              },
              Gp4GjxKpI: {
                "--border-color":
                  'var(--token-58a904ff-197a-49b3-8356-adaa464e1642, rgba(255, 255, 255, 0.12)) /* {"name":"Border Night"} */',
                backgroundColor:
                  "var(--token-fae2c128-35fb-45de-a6c2-32169f920c68, rgb(13, 13, 13))",
              },
            },
            ...L(
              {
                EsJzlpnfQ: { "data-framer-name": "\u26AB\uFE0F Night Left" },
                FGm07QIce: { "data-framer-name": "\u26AA\uFE0F Day Left" },
                Gp4GjxKpI: { "data-framer-name": "\u26AB\uFE0F Night Middle" },
              },
              p,
              u
            ),
            children: [
              g &&
                e(Z, {
                  background: {
                    alt: "",
                    fit: "fill",
                    intrinsicHeight: 5400,
                    intrinsicWidth: 9600,
                    pixelHeight: 5400,
                    pixelWidth: 9600,
                    sizes: "calc(min(360px, 100vw) - 80px)",
                    ...ye(y),
                  },
                  className: "framer-1vknc1w",
                  "data-border": !0,
                  layoutDependency: d,
                  layoutId: "MR2TfNxSa",
                  style: {
                    "--border-bottom-width": "1px",
                    "--border-color":
                      'var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */',
                    "--border-left-width": "1px",
                    "--border-right-width": "1px",
                    "--border-style": "solid",
                    "--border-top-width": "1px",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  },
                }),
              x &&
                e(o.div, {
                  className: "framer-1hypwoz",
                  "data-framer-name": "Icon",
                  layoutDependency: d,
                  layoutId: "w1rINmHsZ",
                  style: {
                    backgroundColor: b,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  },
                  children: e(o.div, {
                    className: "framer-5o30rf-container",
                    layoutDependency: d,
                    layoutId: "eGjgS4oFq-container",
                    children: e(P, {
                      color: Q,
                      height: "100%",
                      iconSearch: "House",
                      iconSelection: v,
                      id: "eGjgS4oFq",
                      layoutId: "eGjgS4oFq",
                      mirrored: !1,
                      selectByList: !0,
                      style: { height: "100%", width: "100%" },
                      weight: "regular",
                      width: "100%",
                    }),
                  }),
                }),
              N(o.div, {
                className: "framer-2bn85y",
                layoutDependency: d,
                layoutId: "WrCPpjaHj",
                children: [
                  e(j, {
                    __fromCanvasComponent: !0,
                    children: e(l, {
                      children: e(o.h5, {
                        className: "framer-styles-preset-13rf66x",
                        "data-styles-preset": "GPDKd6Ic6",
                        style: {
                          "--framer-text-color": "var(--extracted-1lwpl3i, hsl(0, 0%, 0%))",
                        },
                        children: "Integration ecosystem",
                      }),
                    }),
                    className: "framer-1qfo9mb",
                    layoutDependency: d,
                    layoutId: "VDM1CnOXu",
                    style: {
                      "--extracted-1lwpl3i": "hsl(0, 0%, 0%)",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                    },
                    text: t,
                    variants: {
                      EsJzlpnfQ: { "--extracted-1lwpl3i": "rgb(255, 255, 255)" },
                      FGm07QIce: { "--extracted-1lwpl3i": "rgb(0, 0, 0)" },
                      Gp4GjxKpI: { "--extracted-1lwpl3i": "rgb(255, 255, 255)" },
                    },
                    verticalAlignment: "top",
                    withExternalLayout: !0,
                    ...L(
                      {
                        EsJzlpnfQ: {
                          children: e(l, {
                            children: e(o.h5, {
                              className: "framer-styles-preset-13rf66x",
                              "data-styles-preset": "GPDKd6Ic6",
                              style: {
                                "--framer-text-alignment": "left",
                                "--framer-text-color":
                                  "var(--extracted-1lwpl3i, rgb(255, 255, 255))",
                              },
                              children: "Integration ecosystem",
                            }),
                          }),
                        },
                        FGm07QIce: {
                          children: e(l, {
                            children: e(o.h5, {
                              className: "framer-styles-preset-13rf66x",
                              "data-styles-preset": "GPDKd6Ic6",
                              style: {
                                "--framer-text-alignment": "left",
                                "--framer-text-color": "var(--extracted-1lwpl3i, rgb(0, 0, 0))",
                              },
                              children: "Integration ecosystem",
                            }),
                          }),
                        },
                        Gp4GjxKpI: {
                          children: e(l, {
                            children: e(o.h5, {
                              className: "framer-styles-preset-13rf66x",
                              "data-styles-preset": "GPDKd6Ic6",
                              style: {
                                "--framer-text-color":
                                  "var(--extracted-1lwpl3i, rgb(255, 255, 255))",
                              },
                              children: "Integration ecosystem",
                            }),
                          }),
                        },
                      },
                      p,
                      u
                    ),
                  }),
                  e(j, {
                    __fromCanvasComponent: !0,
                    children: e(l, {
                      children: e(o.p, {
                        className: "framer-styles-preset-1cc56zh",
                        "data-styles-preset": "PWn1k_MD2",
                        style: {
                          "--framer-text-alignment": "center",
                          "--framer-text-color": "var(--extracted-r6o4lv, hsl(0, 0%, 0%))",
                        },
                        children:
                          "Enhance your productivity by connecting with your favorite tools, keeping all your essentials in one place.",
                      }),
                    }),
                    className: "framer-mz35j0",
                    layoutDependency: d,
                    layoutId: "DKc1gyg4g",
                    style: {
                      "--extracted-r6o4lv": "hsl(0, 0%, 0%)",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                      opacity: 0.8,
                    },
                    text: w,
                    variants: {
                      EsJzlpnfQ: { "--extracted-r6o4lv": "rgb(255, 255, 255)" },
                      FGm07QIce: { "--extracted-r6o4lv": "rgb(0, 0, 0)" },
                      Gp4GjxKpI: { "--extracted-r6o4lv": "rgb(255, 255, 255)" },
                    },
                    verticalAlignment: "top",
                    withExternalLayout: !0,
                    ...L(
                      {
                        EsJzlpnfQ: {
                          children: e(l, {
                            children: e(o.p, {
                              className: "framer-styles-preset-1cc56zh",
                              "data-styles-preset": "PWn1k_MD2",
                              style: {
                                "--framer-text-alignment": "left",
                                "--framer-text-color":
                                  "var(--extracted-r6o4lv, rgb(255, 255, 255))",
                              },
                              children:
                                "Enhance your productivity by connecting with your favorite tools, keeping all your essentials in one place.",
                            }),
                          }),
                        },
                        FGm07QIce: {
                          children: e(l, {
                            children: e(o.p, {
                              className: "framer-styles-preset-1cc56zh",
                              "data-styles-preset": "PWn1k_MD2",
                              style: {
                                "--framer-text-alignment": "left",
                                "--framer-text-color": "var(--extracted-r6o4lv, rgb(0, 0, 0))",
                              },
                              children:
                                "Enhance your productivity by connecting with your favorite tools, keeping all your essentials in one place.",
                            }),
                          }),
                        },
                        Gp4GjxKpI: {
                          children: e(l, {
                            children: e(o.p, {
                              className: "framer-styles-preset-1cc56zh",
                              "data-styles-preset": "PWn1k_MD2",
                              style: {
                                "--framer-text-alignment": "center",
                                "--framer-text-color":
                                  "var(--extracted-r6o4lv, rgb(255, 255, 255))",
                              },
                              children:
                                "Enhance your productivity by connecting with your favorite tools, keeping all your essentials in one place.",
                            }),
                          }),
                        },
                      },
                      p,
                      u
                    ),
                  }),
                  I &&
                    e(o.div, {
                      className: "framer-14ygfl1-container",
                      layoutDependency: d,
                      layoutId: "hqHfwdps7-container",
                      children: e(z, {
                        bVToBLBTS: F,
                        height: "100%",
                        id: "hqHfwdps7",
                        KqeH5xil_: "rgb(0, 0, 0)",
                        layoutId: "hqHfwdps7",
                        MJWWsEY26: k,
                        variant: "uvXz5tOXs",
                        width: "100%",
                      }),
                    }),
                ],
              }),
            ],
          }),
        }),
      }),
    });
  }),
  ke = [
    '.framer-FsXuI[data-border="true"]::after, .framer-FsXuI [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-FsXuI.framer-qu831b, .framer-FsXuI .framer-qu831b { display: block; }",
    ".framer-FsXuI.framer-x9hesa { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; max-width: 400px; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 360px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-FsXuI .framer-1vknc1w { flex: none; height: 200px; overflow: hidden; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }",
    ".framer-FsXuI .framer-1hypwoz { align-content: center; align-items: center; aspect-ratio: 1 / 1; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: var(--framer-aspect-ratio-supported, 56px); justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 56px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-FsXuI .framer-5o30rf-container { flex: none; height: 32px; position: relative; width: 32px; }",
    ".framer-FsXuI .framer-2bn85y { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-FsXuI .framer-1qfo9mb { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-FsXuI .framer-mz35j0 { flex: none; height: auto; max-width: 400px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-FsXuI .framer-14ygfl1-container { flex: none; height: auto; position: relative; width: auto; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-FsXuI.framer-x9hesa, .framer-FsXuI .framer-1hypwoz, .framer-FsXuI .framer-2bn85y { gap: 0px; } .framer-FsXuI.framer-x9hesa > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-FsXuI.framer-x9hesa > :first-child, .framer-FsXuI .framer-2bn85y > :first-child { margin-top: 0px; } .framer-FsXuI.framer-x9hesa > :last-child, .framer-FsXuI .framer-2bn85y > :last-child { margin-bottom: 0px; } .framer-FsXuI .framer-1hypwoz > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-FsXuI .framer-1hypwoz > :first-child { margin-left: 0px; } .framer-FsXuI .framer-1hypwoz > :last-child { margin-right: 0px; } .framer-FsXuI .framer-2bn85y > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } }",
    ".framer-FsXuI.framer-v-1iom2qn.framer-x9hesa, .framer-FsXuI.framer-v-1iom2qn .framer-2bn85y, .framer-FsXuI.framer-v-ku9xom.framer-x9hesa, .framer-FsXuI.framer-v-ku9xom .framer-2bn85y { align-content: flex-start; align-items: flex-start; }",
    ...te,
    ...ne,
  ],
  _ = U(Fe, ke, "framer-FsXuI"),
  Te = _;
_.displayName = "Feature Card";
_.defaultProps = { height: 271.5, width: 360 };
A(_, {
  variant: {
    options: ["s4zc08oCU", "FGm07QIce", "Gp4GjxKpI", "EsJzlpnfQ"],
    optionTitles: [
      "\u26AA\uFE0F Day Middle",
      "\u26AA\uFE0F Day Left",
      "\u26AB\uFE0F Night Middle",
      "\u26AB\uFE0F Night Left",
    ],
    title: "Variant",
    type: n.Enum,
  },
  OLqpcuIeL: { defaultValue: !1, title: "Image", type: n.Boolean },
  PFec_i8Ff: {
    __defaultAssetReference:
      "data:framer/asset-reference,WwuSEtN77IMXeoOP6vheQadgDRA.jpg?originalFilename=photo-1709274296402-f6e96caaa1eb%3Fcrop%3Dentropy%26cs%3Dsrgb%26fm%3Djpg%26ixid%3DM3wxMzc5NjJ8MHwxfGFsbHwzfHx8fHx8Mnx8MTcwOTI4OTA5OXw%26ixlib%3Drb-4.0.jpg&preferredSize=auto",
    title: "Image",
    type: n.ResponsiveImage,
  },
  Y3X4CKI40: { defaultValue: !0, title: "Icon", type: n.Boolean },
  aa5hKvvkV: S?.iconSelection && {
    ...S.iconSelection,
    defaultValue: "Leaf",
    description: void 0,
    hidden: void 0,
    title: "Icon",
  },
  UaS05r1yh: { defaultValue: "rgb(0, 0, 0)", title: "Icon Background", type: n.Color },
  jFgwazo_q: { defaultValue: "rgb(255, 255, 255)", title: "Icon", type: n.Color },
  oc_8kOa9a: {
    defaultValue: "Integration ecosystem",
    displayTextArea: !0,
    title: "Title",
    type: n.String,
  },
  BFuTBK47u: {
    defaultValue:
      "Enhance your productivity by connecting with your favorite tools, keeping all your essentials in one place.",
    displayTextArea: !0,
    title: "Text",
    type: n.String,
  },
  ZA2T3dGW4: { defaultValue: !1, title: "CTA", type: n.Boolean },
  qkbS0bCx8: { defaultValue: "Learn more", displayTextArea: !1, title: "CTA", type: n.String },
  cX1P9xQse: { title: "Link", type: n.Link },
});
$(_, [...fe, ...me, ...re, ...oe]);
export { Te as a };
//# sourceMappingURL=chunk-W6IPIGDZ.mjs.map
