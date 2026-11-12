import { a as F } from "./chunk-G7RZZ2HZ.mjs";
import { b as r, c as K } from "./chunk-OO3TPEBQ.mjs";
import {
  K as Z,
  P as s,
  S as T,
  T as N,
  V,
  Z as D,
  ba as A,
  c as l,
  g as C,
  j as G,
  l as U,
  n as S,
  o as q,
  pa as J,
  r as I,
  t as o,
  ua as Q,
  v as H,
  va as j,
  wa as Y,
} from "./chunk-QEUFNCD2.mjs";
var $ = Y(F),
  w = N(F),
  rr = {
    cQxCGXnZN: { hover: !0 },
    lHDIKfs8W: { hover: !0 },
    LimbupE7m: { hover: !0 },
    nGeT6PtR1: { hover: !0 },
    nupapQLqg: { hover: !0 },
    ohXdB0YgU: { hover: !0 },
    okzTquwJH: { hover: !0 },
    oZAhUs9Fy: { hover: !0 },
    Pith7zUB4: { hover: !0 },
    PqgBulBPi: { hover: !0 },
    tbk3Yo42H: { hover: !0 },
    zb8n5Cev9: { hover: !0 },
  },
  er = [
    "okzTquwJH",
    "nGeT6PtR1",
    "PqgBulBPi",
    "oZAhUs9Fy",
    "nupapQLqg",
    "lHDIKfs8W",
    "ohXdB0YgU",
    "cQxCGXnZN",
    "zb8n5Cev9",
    "LimbupE7m",
    "tbk3Yo42H",
    "Pith7zUB4",
  ],
  tr = "framer-LWxof",
  ar = {
    cQxCGXnZN: "framer-v-19jvi0m",
    lHDIKfs8W: "framer-v-1nzcq3a",
    LimbupE7m: "framer-v-j5gger",
    nGeT6PtR1: "framer-v-hdfurg",
    nupapQLqg: "framer-v-19uv7sv",
    ohXdB0YgU: "framer-v-1iqbtzx",
    okzTquwJH: "framer-v-trc6xm",
    oZAhUs9Fy: "framer-v-1jrk9r3",
    Pith7zUB4: "framer-v-751d3h",
    PqgBulBPi: "framer-v-1ttxvkm",
    tbk3Yo42H: "framer-v-64i6ry",
    zb8n5Cev9: "framer-v-1xhrgec",
  };
function P(e, ...t) {
  let n = {};
  return (t?.forEach((i) => i && Object.assign(n, e[i])), n);
}
var or = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  nr = ({ value: e, children: t }) => {
    let n = G(I),
      i = e ?? n.transition,
      k = S(() => ({ ...n, transition: i }), [JSON.stringify(i)]);
    return r(I.Provider, { value: k, children: t });
  },
  ir = o(l),
  fr = {
    "\u2B1B\uFE0F L Button Fill": "okzTquwJH",
    "\u2B1B\uFE0F L Icon Fill": "nGeT6PtR1",
    "\u2B1B\uFE0F M Button Fill": "PqgBulBPi",
    "\u2B1B\uFE0F M Icon FIll": "oZAhUs9Fy",
    "\u2B1B\uFE0F S Button Fill": "nupapQLqg",
    "\u2B1B\uFE0F S Icon Fill ": "lHDIKfs8W",
    "\u{1F532} L Button Border": "ohXdB0YgU",
    "\u{1F532} L Icon Border": "cQxCGXnZN",
    "\u{1F532} M Button Border": "zb8n5Cev9",
    "\u{1F532} M Icon Border": "LimbupE7m",
    "\u{1F532} S Button Border": "tbk3Yo42H",
    "\u{1F532} S Icon Border": "Pith7zUB4",
  },
  mr = ({
    background: e,
    height: t,
    icon: n,
    icon1: i,
    id: k,
    link: c,
    newTab: d,
    radius: x,
    title: m,
    width: R,
    ...a
  }) => {
    var p, u, h, g, b, f, v;
    return {
      ...a,
      eszixBaDA: (p = x ?? a.eszixBaDA) !== null && p !== void 0 ? p : 10,
      ik9I5qIGz: (u = n ?? a.ik9I5qIGz) !== null && u !== void 0 ? u : !0,
      J0LC2FGV8: d ?? a.J0LC2FGV8,
      KJK1sV1GB: (h = m ?? a.KJK1sV1GB) !== null && h !== void 0 ? h : "Get started",
      RmkZjgJwi: (g = i ?? a.RmkZjgJwi) !== null && g !== void 0 ? g : "ArrowRight",
      UsLusPFRg: (b = e ?? a.UsLusPFRg) !== null && b !== void 0 ? b : "rgb(0, 0, 0)",
      variant:
        (v = (f = fr[a.variant]) !== null && f !== void 0 ? f : a.variant) !== null && v !== void 0
          ? v
          : "okzTquwJH",
      yTZZaFOb3: c ?? a.yTZZaFOb3,
    };
  },
  lr = (e, t) => t.join("-") + e.layoutDependency,
  sr = C(function (e, t) {
    let { activeLocale: n, setLocale: i } = Z(),
      {
        style: k,
        className: c,
        layoutId: d,
        variant: x,
        eszixBaDA: m,
        KJK1sV1GB: R,
        UsLusPFRg: a,
        ik9I5qIGz: p,
        RmkZjgJwi: u,
        yTZZaFOb3: h,
        J0LC2FGV8: g,
        ...b
      } = mr(e),
      {
        baseVariant: f,
        classNames: v,
        gestureVariant: L,
        setGestureState: y,
        setVariant: cr,
        transition: M,
        variants: z,
      } = J({
        cycleOrder: er,
        defaultVariant: "okzTquwJH",
        enabledGestures: rr,
        transitions: or,
        variant: x,
        variantClassNames: ar,
      }),
      B = lr(e, z),
      X = q(null),
      _ = () =>
        !(
          [
            "nGeT6PtR1-hover",
            "oZAhUs9Fy-hover",
            "lHDIKfs8W-hover",
            "cQxCGXnZN-hover",
            "LimbupE7m-hover",
            "Pith7zUB4-hover",
          ].includes(L) ||
          ["nGeT6PtR1", "oZAhUs9Fy", "lHDIKfs8W", "cQxCGXnZN", "LimbupE7m", "Pith7zUB4"].includes(f)
        ),
      E = U(),
      O = [];
    return r(H, {
      id: d ?? E,
      children: r(ir, {
        animate: z,
        initial: !1,
        children: r(nr, {
          value: M,
          children: r(A, {
            href: h,
            openInNewTab: !1,
            smoothScroll: !0,
            ...P({ tbk3Yo42H: { openInNewTab: g } }, f, L),
            children: K(o.a, {
              ...b,
              className: `${V(tr, ...O, "framer-trc6xm", c, v)} framer-7afab6`,
              "data-border": !0,
              "data-framer-name": "\u2B1B\uFE0F L Button Fill",
              layoutDependency: B,
              layoutId: "okzTquwJH",
              onHoverEnd: () => y({ isHovered: !1 }),
              onHoverStart: () => y({ isHovered: !0 }),
              onTap: () => y({ isPressed: !1 }),
              onTapCancel: () => y({ isPressed: !1 }),
              onTapStart: () => y({ isPressed: !0 }),
              ref: t ?? X,
              style: {
                "--border-bottom-width": "1px",
                "--border-color":
                  "var(--token-58a904ff-197a-49b3-8356-adaa464e1642, rgba(255, 255, 255, 0.12))",
                "--border-left-width": "1px",
                "--border-right-width": "1px",
                "--border-style": "solid",
                "--border-top-width": "1px",
                backgroundColor: a,
                borderBottomLeftRadius: m,
                borderBottomRightRadius: m,
                borderTopLeftRadius: m,
                borderTopRightRadius: m,
                boxShadow:
                  "0px 0.6021873017743928px 1.8065619053231785px -1.25px rgba(0, 0, 0, 0.07199), 0px 2.288533303243457px 6.8655999097303715px -2.5px rgba(0, 0, 0, 0.06356), 0px 10px 30px -3.75px rgba(0, 0, 0, 0.025)",
                filter: "brightness(1)",
                WebkitFilter: "brightness(1)",
                ...k,
              },
              variants: {
                "cQxCGXnZN-hover": { filter: "brightness(0.9)", WebkitFilter: "brightness(0.9)" },
                "lHDIKfs8W-hover": { filter: "brightness(0.8)", WebkitFilter: "brightness(0.8)" },
                "LimbupE7m-hover": { filter: "brightness(0.9)", WebkitFilter: "brightness(0.9)" },
                "nGeT6PtR1-hover": { filter: "brightness(0.8)", WebkitFilter: "brightness(0.8)" },
                "nupapQLqg-hover": { filter: "brightness(0.8)", WebkitFilter: "brightness(0.8)" },
                "ohXdB0YgU-hover": { filter: "brightness(0.9)", WebkitFilter: "brightness(0.9)" },
                "okzTquwJH-hover": { filter: "brightness(0.8)", WebkitFilter: "brightness(0.8)" },
                "oZAhUs9Fy-hover": { filter: "brightness(0.8)", WebkitFilter: "brightness(0.8)" },
                "Pith7zUB4-hover": { filter: "brightness(0.9)", WebkitFilter: "brightness(0.9)" },
                "PqgBulBPi-hover": { filter: "brightness(0.8)", WebkitFilter: "brightness(0.8)" },
                "tbk3Yo42H-hover": { filter: "brightness(0.9)", WebkitFilter: "brightness(0.9)" },
                "zb8n5Cev9-hover": { filter: "brightness(0.9)", WebkitFilter: "brightness(0.9)" },
                cQxCGXnZN: {
                  "--border-color":
                    "var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1))",
                  backgroundColor: "rgb(255, 255, 255)",
                },
                LimbupE7m: {
                  "--border-color":
                    "var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1))",
                  backgroundColor: "rgb(255, 255, 255)",
                },
                ohXdB0YgU: {
                  "--border-color":
                    "var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1))",
                  backgroundColor: "rgb(255, 255, 255)",
                },
                Pith7zUB4: {
                  "--border-color":
                    "var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1))",
                  backgroundColor: "rgb(255, 255, 255)",
                },
                tbk3Yo42H: {
                  "--border-color":
                    "var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1))",
                  backgroundColor: "rgb(255, 255, 255)",
                },
                zb8n5Cev9: {
                  "--border-color":
                    "var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1))",
                  backgroundColor: "rgb(255, 255, 255)",
                },
              },
              ...P(
                {
                  "cQxCGXnZN-hover": { "data-framer-name": void 0 },
                  "lHDIKfs8W-hover": { "data-framer-name": void 0 },
                  "LimbupE7m-hover": { "data-framer-name": void 0 },
                  "nGeT6PtR1-hover": { "data-framer-name": void 0 },
                  "nupapQLqg-hover": { "data-framer-name": void 0 },
                  "ohXdB0YgU-hover": { "data-framer-name": void 0 },
                  "okzTquwJH-hover": { "data-framer-name": void 0 },
                  "oZAhUs9Fy-hover": { "data-framer-name": void 0 },
                  "Pith7zUB4-hover": { "data-framer-name": void 0 },
                  "PqgBulBPi-hover": { "data-framer-name": void 0 },
                  "tbk3Yo42H-hover": { "data-framer-name": void 0 },
                  "zb8n5Cev9-hover": { "data-framer-name": void 0 },
                  cQxCGXnZN: { "data-framer-name": "\u{1F532} L Icon Border" },
                  lHDIKfs8W: { "data-framer-name": "\u2B1B\uFE0F S Icon Fill " },
                  LimbupE7m: { "data-framer-name": "\u{1F532} M Icon Border" },
                  nGeT6PtR1: { "data-framer-name": "\u2B1B\uFE0F L Icon Fill" },
                  nupapQLqg: { "data-framer-name": "\u2B1B\uFE0F S Button Fill" },
                  ohXdB0YgU: { "data-framer-name": "\u{1F532} L Button Border" },
                  oZAhUs9Fy: { "data-framer-name": "\u2B1B\uFE0F M Icon FIll" },
                  Pith7zUB4: { "data-framer-name": "\u{1F532} S Icon Border" },
                  PqgBulBPi: { "data-framer-name": "\u2B1B\uFE0F M Button Fill" },
                  tbk3Yo42H: { "data-framer-name": "\u{1F532} S Button Border" },
                  zb8n5Cev9: { "data-framer-name": "\u{1F532} M Button Border" },
                },
                f,
                L
              ),
              children: [
                _() &&
                  r(Q, {
                    __fromCanvasComponent: !0,
                    children: r(l, {
                      children: r(o.p, {
                        style: {
                          "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                          "--framer-font-family": '"Satoshi", "Satoshi Placeholder", sans-serif',
                          "--framer-font-size": "20px",
                          "--framer-font-weight": "500",
                          "--framer-letter-spacing": "-0.6px",
                          "--framer-text-alignment": "center",
                          "--framer-text-color": "var(--extracted-r6o4lv, rgb(255, 255, 255))",
                        },
                        children: "Get started",
                      }),
                    }),
                    className: "framer-kdqdg",
                    fonts: ["FS;Satoshi-medium"],
                    layoutDependency: B,
                    layoutId: "RRK5rFIwW",
                    style: {
                      "--extracted-r6o4lv": "rgb(255, 255, 255)",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                    },
                    text: R,
                    verticalAlignment: "top",
                    withExternalLayout: !0,
                    ...P(
                      {
                        nupapQLqg: {
                          children: r(l, {
                            children: r(o.p, {
                              style: {
                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                "--framer-font-family":
                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                "--framer-font-size": "14px",
                                "--framer-font-weight": "500",
                                "--framer-letter-spacing": "-0.3px",
                                "--framer-text-alignment": "center",
                                "--framer-text-color":
                                  "var(--extracted-r6o4lv, rgb(255, 255, 255))",
                              },
                              children: "Get started",
                            }),
                          }),
                        },
                        ohXdB0YgU: {
                          children: r(l, {
                            children: r(o.p, {
                              style: {
                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                "--framer-font-family":
                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                "--framer-font-size": "20px",
                                "--framer-font-weight": "500",
                                "--framer-letter-spacing": "-0.6px",
                                "--framer-text-alignment": "center",
                              },
                              children: "Get started",
                            }),
                          }),
                        },
                        PqgBulBPi: {
                          children: r(l, {
                            children: r(o.p, {
                              style: {
                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                "--framer-font-family":
                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                "--framer-font-weight": "500",
                                "--framer-letter-spacing": "-0.3px",
                                "--framer-text-alignment": "center",
                                "--framer-text-color":
                                  "var(--extracted-r6o4lv, rgb(255, 255, 255))",
                              },
                              children: "Get started",
                            }),
                          }),
                        },
                        tbk3Yo42H: {
                          children: r(l, {
                            children: r(o.p, {
                              style: {
                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                "--framer-font-family":
                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                "--framer-font-size": "14px",
                                "--framer-font-weight": "500",
                                "--framer-letter-spacing": "-0.6px",
                                "--framer-text-alignment": "center",
                              },
                              children: "Get started",
                            }),
                          }),
                        },
                        zb8n5Cev9: {
                          children: r(l, {
                            children: r(o.p, {
                              style: {
                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                "--framer-font-family":
                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                "--framer-font-weight": "500",
                                "--framer-letter-spacing": "-0.6px",
                                "--framer-text-alignment": "center",
                              },
                              children: "Get started",
                            }),
                          }),
                        },
                      },
                      f,
                      L
                    ),
                  }),
                p &&
                  r(o.div, {
                    className: "framer-jx45ay",
                    "data-framer-name": "Icon",
                    layoutDependency: B,
                    layoutId: "C3IhYOJkn",
                    children: r(o.div, {
                      className: "framer-bgtu78-container",
                      layoutDependency: B,
                      layoutId: "oiNIpttWa-container",
                      children: r(F, {
                        color: "rgb(255, 255, 255)",
                        height: "100%",
                        iconSearch: "House",
                        iconSelection: u,
                        id: "oiNIpttWa",
                        layoutId: "oiNIpttWa",
                        mirrored: !1,
                        selectByList: !0,
                        style: { height: "100%", width: "100%" },
                        weight: "bold",
                        width: "100%",
                        ...P(
                          {
                            cQxCGXnZN: { color: "rgb(0, 0, 0)" },
                            LimbupE7m: { color: "rgb(0, 0, 0)" },
                            ohXdB0YgU: { color: "rgb(0, 0, 0)" },
                            Pith7zUB4: { color: "rgb(0, 0, 0)" },
                            tbk3Yo42H: { color: "rgb(0, 0, 0)" },
                            zb8n5Cev9: { color: "rgb(0, 0, 0)" },
                          },
                          f,
                          L
                        ),
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
  dr = [
    '.framer-LWxof[data-border="true"]::after, .framer-LWxof [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-LWxof.framer-7afab6, .framer-LWxof .framer-7afab6 { display: block; }",
    ".framer-LWxof.framer-trc6xm { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: auto; justify-content: center; overflow: hidden; padding: 15px 20px 15px 20px; position: relative; text-decoration: none; width: auto; will-change: var(--framer-will-change-override, transform); }",
    ".framer-LWxof .framer-kdqdg { flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-LWxof .framer-jx45ay { flex: none; height: 20px; overflow: visible; position: relative; width: 20px; }",
    ".framer-LWxof .framer-bgtu78-container { bottom: 0px; flex: none; left: 0px; position: absolute; right: 0px; top: 0px; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-LWxof.framer-trc6xm { gap: 0px; } .framer-LWxof.framer-trc6xm > * { margin: 0px; margin-left: calc(8px / 2); margin-right: calc(8px / 2); } .framer-LWxof.framer-trc6xm > :first-child { margin-left: 0px; } .framer-LWxof.framer-trc6xm > :last-child { margin-right: 0px; } }",
    ".framer-LWxof.framer-v-hdfurg.framer-trc6xm, .framer-LWxof.framer-v-19jvi0m.framer-trc6xm { aspect-ratio: 1 / 1; height: var(--framer-aspect-ratio-supported, 54px); padding: 20px 20px 20px 20px; width: 54px; }",
    ".framer-LWxof.framer-v-1ttxvkm.framer-trc6xm, .framer-LWxof.framer-v-1xhrgec.framer-trc6xm { gap: 4px; padding: 10px 15px 10px 15px; }",
    ".framer-LWxof.framer-v-1ttxvkm .framer-bgtu78-container { bottom: 1px; height: 16px; left: calc(50.00000000000002% - 16px / 2); right: unset; top: unset; width: 16px; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-LWxof.framer-v-1ttxvkm.framer-trc6xm { gap: 0px; } .framer-LWxof.framer-v-1ttxvkm.framer-trc6xm > * { margin: 0px; margin-left: calc(4px / 2); margin-right: calc(4px / 2); } .framer-LWxof.framer-v-1ttxvkm.framer-trc6xm > :first-child { margin-left: 0px; } .framer-LWxof.framer-v-1ttxvkm.framer-trc6xm > :last-child { margin-right: 0px; } }",
    ".framer-LWxof.framer-v-1jrk9r3.framer-trc6xm, .framer-LWxof.framer-v-j5gger.framer-trc6xm { aspect-ratio: 1 / 1; height: var(--framer-aspect-ratio-supported, 40px); padding: 10px 10px 10px 10px; width: 40px; }",
    ".framer-LWxof.framer-v-1jrk9r3 .framer-bgtu78-container, .framer-LWxof.framer-v-j5gger .framer-bgtu78-container { bottom: unset; height: 16px; left: calc(50.00000000000002% - 16px / 2); right: unset; top: calc(50.00000000000002% - 16px / 2); width: 16px; }",
    ".framer-LWxof.framer-v-19uv7sv.framer-trc6xm, .framer-LWxof.framer-v-64i6ry.framer-trc6xm { gap: 0px; padding: 5px 10px 5px 10px; }",
    ".framer-LWxof.framer-v-19uv7sv .framer-bgtu78-container { bottom: 2px; height: 14px; left: calc(50.00000000000002% - 14px / 2); right: unset; top: unset; width: 14px; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-LWxof.framer-v-19uv7sv.framer-trc6xm { gap: 0px; } .framer-LWxof.framer-v-19uv7sv.framer-trc6xm > * { margin: 0px; margin-left: calc(0px / 2); margin-right: calc(0px / 2); } .framer-LWxof.framer-v-19uv7sv.framer-trc6xm > :first-child { margin-left: 0px; } .framer-LWxof.framer-v-19uv7sv.framer-trc6xm > :last-child { margin-right: 0px; } }",
    ".framer-LWxof.framer-v-1nzcq3a.framer-trc6xm { aspect-ratio: 1 / 1; gap: 4px; height: var(--framer-aspect-ratio-supported, 30px); padding: 10px 15px 10px 15px; width: 30px; }",
    ".framer-LWxof.framer-v-1nzcq3a .framer-bgtu78-container, .framer-LWxof.framer-v-751d3h .framer-bgtu78-container { bottom: unset; height: 14px; left: calc(50.00000000000002% - 14px / 2); right: unset; top: calc(50.00000000000002% - 14px / 2); width: 14px; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-LWxof.framer-v-1nzcq3a.framer-trc6xm { gap: 0px; } .framer-LWxof.framer-v-1nzcq3a.framer-trc6xm > * { margin: 0px; margin-left: calc(4px / 2); margin-right: calc(4px / 2); } .framer-LWxof.framer-v-1nzcq3a.framer-trc6xm > :first-child { margin-left: 0px; } .framer-LWxof.framer-v-1nzcq3a.framer-trc6xm > :last-child { margin-right: 0px; } }",
    ".framer-LWxof.framer-v-1xhrgec .framer-bgtu78-container { bottom: 1px; height: 16px; right: unset; top: unset; width: 16px; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-LWxof.framer-v-1xhrgec.framer-trc6xm { gap: 0px; } .framer-LWxof.framer-v-1xhrgec.framer-trc6xm > * { margin: 0px; margin-left: calc(4px / 2); margin-right: calc(4px / 2); } .framer-LWxof.framer-v-1xhrgec.framer-trc6xm > :first-child { margin-left: 0px; } .framer-LWxof.framer-v-1xhrgec.framer-trc6xm > :last-child { margin-right: 0px; } }",
    ".framer-LWxof.framer-v-64i6ry .framer-bgtu78-container { bottom: 3px; height: 14px; left: calc(50.00000000000002% - 14px / 2); right: unset; top: unset; width: 14px; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-LWxof.framer-v-64i6ry.framer-trc6xm { gap: 0px; } .framer-LWxof.framer-v-64i6ry.framer-trc6xm > * { margin: 0px; margin-left: calc(0px / 2); margin-right: calc(0px / 2); } .framer-LWxof.framer-v-64i6ry.framer-trc6xm > :first-child { margin-left: 0px; } .framer-LWxof.framer-v-64i6ry.framer-trc6xm > :last-child { margin-right: 0px; } }",
    ".framer-LWxof.framer-v-751d3h.framer-trc6xm { aspect-ratio: 1 / 1; gap: 2px; height: var(--framer-aspect-ratio-supported, 30px); padding: 10px 15px 10px 15px; width: 30px; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-LWxof.framer-v-751d3h.framer-trc6xm { gap: 0px; } .framer-LWxof.framer-v-751d3h.framer-trc6xm > * { margin: 0px; margin-left: calc(2px / 2); margin-right: calc(2px / 2); } .framer-LWxof.framer-v-751d3h.framer-trc6xm > :first-child { margin-left: 0px; } .framer-LWxof.framer-v-751d3h.framer-trc6xm > :last-child { margin-right: 0px; } }",
    ".framer-LWxof.framer-v-1ttxvkm.hover .framer-bgtu78-container { left: unset; right: -1px; top: unset; }",
    ".framer-LWxof.framer-v-1jrk9r3.hover .framer-bgtu78-container, .framer-LWxof.framer-v-1nzcq3a.hover .framer-bgtu78-container, .framer-LWxof.framer-v-j5gger.hover .framer-bgtu78-container, .framer-LWxof.framer-v-751d3h.hover .framer-bgtu78-container { bottom: unset; right: unset; }",
    ".framer-LWxof.framer-v-19uv7sv.hover .framer-bgtu78-container, .framer-LWxof.framer-v-1xhrgec.hover .framer-bgtu78-container, .framer-LWxof.framer-v-64i6ry.hover .framer-bgtu78-container { left: unset; right: 1px; top: unset; }",
    ".framer-LWxof.framer-v-1iqbtzx.hover .framer-bgtu78-container { left: unset; right: -3px; width: 20px; }",
  ],
  W = D(sr, dr, "framer-LWxof"),
  yr = W;
W.displayName = "Button";
W.defaultProps = { height: 54, width: 162 };
T(W, {
  variant: {
    options: [
      "okzTquwJH",
      "nGeT6PtR1",
      "PqgBulBPi",
      "oZAhUs9Fy",
      "nupapQLqg",
      "lHDIKfs8W",
      "ohXdB0YgU",
      "cQxCGXnZN",
      "zb8n5Cev9",
      "LimbupE7m",
      "tbk3Yo42H",
      "Pith7zUB4",
    ],
    optionTitles: [
      "\u2B1B\uFE0F L Button Fill",
      "\u2B1B\uFE0F L Icon Fill",
      "\u2B1B\uFE0F M Button Fill",
      "\u2B1B\uFE0F M Icon FIll",
      "\u2B1B\uFE0F S Button Fill",
      "\u2B1B\uFE0F S Icon Fill ",
      "\u{1F532} L Button Border",
      "\u{1F532} L Icon Border",
      "\u{1F532} M Button Border",
      "\u{1F532} M Icon Border",
      "\u{1F532} S Button Border",
      "\u{1F532} S Icon Border",
    ],
    title: "Variant",
    type: s.Enum,
  },
  eszixBaDA: { defaultValue: 10, title: "Radius", type: s.Number },
  KJK1sV1GB: { defaultValue: "Get started", displayTextArea: !1, title: "Title", type: s.String },
  UsLusPFRg: {
    defaultValue: "rgb(0, 0, 0)",
    description: "Available for \u201DFill\u201D variants.",
    title: "Background",
    type: s.Color,
  },
  ik9I5qIGz: { defaultValue: !0, title: "Icon", type: s.Boolean },
  RmkZjgJwi: w?.iconSelection && {
    ...w.iconSelection,
    defaultValue: "ArrowRight",
    description: void 0,
    hidden: void 0,
    title: "Icon",
  },
  yTZZaFOb3: { title: "Link", type: s.Link },
  J0LC2FGV8: { defaultValue: !1, title: "New Tab", type: s.Boolean },
});
j(W, [
  {
    family: "Satoshi",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2",
    weight: "500",
  },
  ...$,
]);
export { yr as a };
//# sourceMappingURL=chunk-CVPCFDSR.mjs.map
