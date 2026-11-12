import { d as o } from "./chunk-G5VSNPDD.mjs";
import { a as C } from "./chunk-PBG357LN.mjs";
import { a as z } from "./chunk-CVPCFDSR.mjs";
import { a as J } from "./chunk-G7RZZ2HZ.mjs";
import { b as e, c as b } from "./chunk-OO3TPEBQ.mjs";
import {
  K as O,
  P as g,
  S as X,
  T as G,
  V,
  Z as R,
  c as K,
  g as A,
  j as P,
  l as q,
  la as U,
  n as B,
  o as T,
  pa as Z,
  r as F,
  t as r,
  v as L,
  va as Y,
  wa as w,
} from "./chunk-QEUFNCD2.mjs";
var oe = w(C),
  le = w(o),
  de = w(z),
  ce = w(J),
  j = G(z),
  me = ["J7TtQthx_", "onuwv4s61", "z45OQZKmF"],
  se = "framer-QM750",
  fe = {
    J7TtQthx_: "framer-v-1pmqjcu",
    onuwv4s61: "framer-v-w2rvpf",
    z45OQZKmF: "framer-v-1nw1we0",
  };
function E(i, ...n) {
  let d = {};
  return (n?.forEach((m) => m && Object.assign(d, i[m])), d);
}
var pe = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  ue = ({ value: i, children: n }) => {
    let d = P(F),
      m = i ?? d.transition,
      Q = B(() => ({ ...d, transition: m }), [JSON.stringify(m)]);
    return e(F.Provider, { value: Q, children: n });
  },
  he = r(K),
  ye = {
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
  ve = { "Phone Open": "z45OQZKmF", Desktop: "J7TtQthx_", Phone: "onuwv4s61" },
  xe = ({
    background: i,
    backgroundBlur: n,
    button: d,
    height: m,
    id: Q,
    text: f,
    width: I,
    ...c
  }) => {
    var t, p, u, h, y, l, v;
    return {
      ...c,
      JU5116W8C:
        (u =
          (p = (t = ye[d]) !== null && t !== void 0 ? t : d) !== null && p !== void 0
            ? p
            : c.JU5116W8C) !== null && u !== void 0
          ? u
          : "PqgBulBPi",
      LylWg8UG8: n ?? c.LylWg8UG8,
      oqrd6d5I6: (h = i ?? c.oqrd6d5I6) !== null && h !== void 0 ? h : "rgb(255, 255, 255)",
      Tyvh_HtHO: (y = f ?? c.Tyvh_HtHO) !== null && y !== void 0 ? y : "rgb(0, 0, 0)",
      variant:
        (v = (l = ve[c.variant]) !== null && l !== void 0 ? l : c.variant) !== null && v !== void 0
          ? v
          : "J7TtQthx_",
    };
  },
  ge = (i, n) => n.join("-") + i.layoutDependency,
  we = A(function (i, n) {
    let { activeLocale: d, setLocale: m } = O(),
      {
        style: Q,
        className: f,
        layoutId: I,
        variant: c,
        Tyvh_HtHO: t,
        oqrd6d5I6: p,
        JU5116W8C: u,
        LylWg8UG8: h,
        ...y
      } = xe(i),
      {
        baseVariant: l,
        classNames: v,
        gestureVariant: H,
        setGestureState: x,
        setVariant: D,
        transition: S,
        variants: N,
      } = Z({
        cycleOrder: me,
        defaultVariant: "J7TtQthx_",
        transitions: pe,
        variant: c,
        variantClassNames: fe,
      }),
      a = ge(i, N),
      { activeVariantCallback: k, delay: Me } = U(l),
      W = k(async (..._) => {
        D("vZNkcdFXx");
      }),
      $ = k(async (..._) => {
        D("z45OQZKmF");
      }),
      ee = k(async (..._) => {
        D("onuwv4s61");
      }),
      re = T(null),
      s = () => !["onuwv4s61", "z45OQZKmF"].includes(l),
      ae = () => !!["onuwv4s61", "z45OQZKmF"].includes(l),
      te = () => l === "z45OQZKmF",
      ne = q(),
      ie = [];
    return e(L, {
      id: I ?? ne,
      children: e(he, {
        animate: N,
        initial: !1,
        children: e(ue, {
          value: S,
          children: b(r.div, {
            ...y,
            className: V(se, ...ie, "framer-1pmqjcu", f, v),
            "data-framer-name": "Desktop",
            layoutDependency: a,
            layoutId: "J7TtQthx_",
            onHoverEnd: () => x({ isHovered: !1 }),
            onHoverStart: () => x({ isHovered: !0 }),
            onTap: () => x({ isPressed: !1 }),
            onTapCancel: () => x({ isPressed: !1 }),
            onTapStart: () => x({ isPressed: !0 }),
            ref: n ?? re,
            style: { backdropFilter: `blur(${h}px)`, backgroundColor: p, ...Q },
            ...E(
              {
                onuwv4s61: { "data-framer-name": "Phone" },
                z45OQZKmF: { "data-framer-name": "Phone Open" },
              },
              l,
              H
            ),
            children: [
              b(r.div, {
                className: "framer-1aas860",
                layoutDependency: a,
                layoutId: "OmPYeV0DI",
                children: [
                  e(r.div, {
                    className: "framer-1x9f04c-container",
                    layoutDependency: a,
                    layoutId: "q9a0IJNz_-container",
                    children: e(C, {
                      height: "100%",
                      id: "q9a0IJNz_",
                      layoutId: "q9a0IJNz_",
                      QPpn2xZty: "rgb(0, 0, 0)",
                      style: { height: "100%", width: "100%" },
                      variant: "eEZGnfswo",
                      width: "100%",
                    }),
                  }),
                  b(r.div, {
                    className: "framer-1brz4np",
                    layoutDependency: a,
                    layoutId: "g3TWzsekv",
                    children: [
                      s() &&
                        e(r.div, {
                          className: "framer-1x7v7kr-container",
                          layoutDependency: a,
                          layoutId: "d7cFF4JU3-container",
                          children: e(o, {
                            Dl6AiX37G: t,
                            height: "100%",
                            id: "d7cFF4JU3",
                            kcKdHX2wm: "Säle & Technik",
                            layoutId: "d7cFF4JU3",
                            variant: "AY2iJjz0z",
                            width: "100%",
                          }),
                        }),
                      s() &&
                        e(r.div, {
                          className: "framer-1kmxmw3-container",
                          layoutDependency: a,
                          layoutId: "LjtMPnfry-container",
                          children: e(o, {
                            Dl6AiX37G: t,
                            height: "100%",
                            id: "LjtMPnfry",
                            kcKdHX2wm: "Funktionen",
                            layoutId: "LjtMPnfry",
                            variant: "AY2iJjz0z",
                            width: "100%",
                          }),
                        }),
                      s() &&
                        e(r.div, {
                          className: "framer-1xby698-container",
                          layoutDependency: a,
                          layoutId: "c6wveJwuu-container",
                          children: e(o, {
                            Dl6AiX37G: t,
                            height: "100%",
                            id: "c6wveJwuu",
                            kcKdHX2wm: "Standorte",
                            layoutId: "c6wveJwuu",
                            variant: "AY2iJjz0z",
                            width: "100%",
                          }),
                        }),
                      s() &&
                        e(r.div, {
                          className: "framer-1ojogp6-container",
                          layoutDependency: a,
                          layoutId: "NuIFDphEY-container",
                          children: e(o, {
                            Dl6AiX37G: t,
                            height: "100%",
                            id: "NuIFDphEY",
                            kcKdHX2wm: "Schichtbuch",
                            layoutId: "NuIFDphEY",
                            variant: "AY2iJjz0z",
                            width: "100%",
                          }),
                        }),
                      s() &&
                        e(r.div, {
                          className: "framer-1fjd1h1-container",
                          layoutDependency: a,
                          layoutId: "T3EQ_Yj1D-container",
                          children: e(o, {
                            Dl6AiX37G: t,
                            height: "100%",
                            id: "T3EQ_Yj1D",
                            kcKdHX2wm: "Analytics",
                            layoutId: "T3EQ_Yj1D",
                            variant: "AY2iJjz0z",
                            width: "100%",
                          }),
                        }),
                      s() &&
                        e(r.div, {
                          className: "framer-149sc7l-container",
                          layoutDependency: a,
                          layoutId: "E4pihRaKD-container",
                          children: e(z, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "E4pihRaKD",
                            ik9I5qIGz: !1,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get for free",
                            layoutId: "E4pihRaKD",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: u,
                            width: "100%",
                            yTZZaFOb3: "https://framer.link/ZQ2l2Kk",
                          }),
                        }),
                      ae() &&
                        e(r.div, {
                          className: "framer-17lc3dw-container",
                          "data-framer-name": "Menu",
                          layoutDependency: a,
                          layoutId: "rJ6U1Akpz-container",
                          name: "Menu",
                          children: e(J, {
                            color: "rgb(0, 0, 0)",
                            height: "100%",
                            iconSearch: "House",
                            iconSelection: "List",
                            id: "rJ6U1Akpz",
                            layoutId: "rJ6U1Akpz",
                            mirrored: !1,
                            name: "Menu",
                            onClick: W,
                            selectByList: !0,
                            style: { height: "100%", width: "100%" },
                            weight: "regular",
                            width: "100%",
                            ...E(
                              {
                                onuwv4s61: { color: t, onClick: $ },
                                z45OQZKmF: { color: t, iconSelection: "X", onClick: ee },
                              },
                              l,
                              H
                            ),
                          }),
                        }),
                    ],
                  }),
                ],
              }),
              te() &&
                e(r.div, {
                  className: "framer-4bjjip",
                  layoutDependency: a,
                  layoutId: "tNLARxRIT",
                  children: b(r.div, {
                    className: "framer-6yy0gv",
                    layoutDependency: a,
                    layoutId: "NXfxn_d7T",
                    children: [
                      e(r.div, {
                        className: "framer-u5m3t1-container",
                        layoutDependency: a,
                        layoutId: "wWIMrMmun-container",
                        children: e(o, {
                          Dl6AiX37G: t,
                          height: "100%",
                          id: "wWIMrMmun",
                          kcKdHX2wm: "Säle & Technik",
                          layoutId: "wWIMrMmun",
                          variant: "AY2iJjz0z",
                          width: "100%",
                        }),
                      }),
                      e(r.div, {
                        className: "framer-9umz9z-container",
                        layoutDependency: a,
                        layoutId: "Tod8CxkAF-container",
                        children: e(o, {
                          Dl6AiX37G: t,
                          height: "100%",
                          id: "Tod8CxkAF",
                          kcKdHX2wm: "Funktionen",
                          layoutId: "Tod8CxkAF",
                          variant: "AY2iJjz0z",
                          width: "100%",
                        }),
                      }),
                      e(r.div, {
                        className: "framer-fg9ufa-container",
                        layoutDependency: a,
                        layoutId: "fu5cBaheb-container",
                        children: e(o, {
                          Dl6AiX37G: t,
                          height: "100%",
                          id: "fu5cBaheb",
                          kcKdHX2wm: "Standorte",
                          layoutId: "fu5cBaheb",
                          variant: "AY2iJjz0z",
                          width: "100%",
                        }),
                      }),
                      e(r.div, {
                        className: "framer-1b2qzsy-container",
                        layoutDependency: a,
                        layoutId: "npCz3e9qK-container",
                        children: e(o, {
                          Dl6AiX37G: t,
                          height: "100%",
                          id: "npCz3e9qK",
                          kcKdHX2wm: "Schichtbuch",
                          layoutId: "npCz3e9qK",
                          variant: "AY2iJjz0z",
                          width: "100%",
                        }),
                      }),
                      e(r.div, {
                        className: "framer-7k0h94-container",
                        layoutDependency: a,
                        layoutId: "HvMJIxe3K-container",
                        children: e(o, {
                          Dl6AiX37G: t,
                          height: "100%",
                          id: "HvMJIxe3K",
                          kcKdHX2wm: "Analytics",
                          layoutId: "HvMJIxe3K",
                          variant: "AY2iJjz0z",
                          width: "100%",
                        }),
                      }),
                    ],
                  }),
                }),
            ],
          }),
        }),
      }),
    });
  }),
  be = [
    '.framer-QM750[data-border="true"]::after, .framer-QM750 [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-QM750.framer-1977ihu, .framer-QM750 .framer-1977ihu { display: block; }",
    ".framer-QM750.framer-1pmqjcu { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 1120px; }",
    ".framer-QM750 .framer-1aas860 { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; max-width: 1600px; overflow: visible; padding: 20px 20px 20px 20px; position: relative; width: 1px; z-index: 0; }",
    ".framer-QM750 .framer-1x9f04c-container { flex: none; height: 40px; position: relative; width: 40px; }",
    ".framer-QM750 .framer-1brz4np { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 2; }",
    ".framer-QM750 .framer-1x7v7kr-container, .framer-QM750 .framer-1kmxmw3-container, .framer-QM750 .framer-1xby698-container, .framer-QM750 .framer-1ojogp6-container, .framer-QM750 .framer-1fjd1h1-container, .framer-QM750 .framer-149sc7l-container, .framer-QM750 .framer-u5m3t1-container, .framer-QM750 .framer-9umz9z-container, .framer-QM750 .framer-fg9ufa-container, .framer-QM750 .framer-1b2qzsy-container, .framer-QM750 .framer-7k0h94-container { flex: none; height: auto; position: relative; width: auto; }",
    ".framer-QM750 .framer-17lc3dw-container { flex: none; height: 28px; position: relative; width: 28px; }",
    ".framer-QM750 .framer-4bjjip { align-content: flex-start; align-items: flex-start; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: visible; padding: 20px 20px 20px 20px; position: relative; width: 1px; }",
    ".framer-QM750 .framer-6yy0gv { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-QM750.framer-1pmqjcu, .framer-QM750 .framer-1brz4np, .framer-QM750 .framer-4bjjip, .framer-QM750 .framer-6yy0gv { gap: 0px; } .framer-QM750.framer-1pmqjcu > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-QM750.framer-1pmqjcu > :first-child, .framer-QM750 .framer-1brz4np > :first-child { margin-left: 0px; } .framer-QM750.framer-1pmqjcu > :last-child, .framer-QM750 .framer-1brz4np > :last-child { margin-right: 0px; } .framer-QM750 .framer-1brz4np > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } .framer-QM750 .framer-4bjjip > * { margin: 0px; margin-bottom: calc(0px / 2); margin-top: calc(0px / 2); } .framer-QM750 .framer-4bjjip > :first-child, .framer-QM750 .framer-6yy0gv > :first-child { margin-top: 0px; } .framer-QM750 .framer-4bjjip > :last-child, .framer-QM750 .framer-6yy0gv > :last-child { margin-bottom: 0px; } .framer-QM750 .framer-6yy0gv > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } }",
    ".framer-QM750.framer-v-w2rvpf.framer-1pmqjcu { width: 390px; }",
    ".framer-QM750.framer-v-1nw1we0.framer-1pmqjcu { flex-direction: column; justify-content: flex-start; min-height: calc(var(--framer-viewport-height, 100vh) * 1); width: 390px; }",
    ".framer-QM750.framer-v-1nw1we0 .framer-1aas860, .framer-QM750.framer-v-1nw1we0 .framer-4bjjip { flex: none; width: 100%; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-QM750.framer-v-1nw1we0.framer-1pmqjcu { gap: 0px; } .framer-QM750.framer-v-1nw1we0.framer-1pmqjcu > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-QM750.framer-v-1nw1we0.framer-1pmqjcu > :first-child { margin-top: 0px; } .framer-QM750.framer-v-1nw1we0.framer-1pmqjcu > :last-child { margin-bottom: 0px; } }",
  ],
  M = R(we, be, "framer-QM750"),
  _e = M;
M.displayName = "Nav Simple";
M.defaultProps = { height: 80, width: 1120 };
X(M, {
  variant: {
    options: ["J7TtQthx_", "onuwv4s61", "z45OQZKmF"],
    optionTitles: ["Desktop", "Phone", "Phone Open"],
    title: "Variant",
    type: g.Enum,
  },
  Tyvh_HtHO: { defaultValue: "rgb(0, 0, 0)", title: "Text", type: g.Color },
  oqrd6d5I6: { defaultValue: "rgb(255, 255, 255)", title: "Background", type: g.Color },
  JU5116W8C: j?.variant && {
    ...j.variant,
    defaultValue: "PqgBulBPi",
    description: void 0,
    hidden: void 0,
    title: "Button",
  },
  LylWg8UG8: { defaultValue: 0, max: 7, title: "Background Blur", type: g.Number },
});
Y(M, [...oe, ...le, ...de, ...ce]);
export { _e as a };
//# sourceMappingURL=chunk-APG5SWKV.mjs.map
