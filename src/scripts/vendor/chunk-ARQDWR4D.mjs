import { a as $, b as ee, c as re, d as te } from "./chunk-G5VSNPDD.mjs";
import { a as me } from "./chunk-PBG357LN.mjs";
import { a as ae } from "./chunk-CVPCFDSR.mjs";
import { a as N } from "./chunk-G7RZZ2HZ.mjs";
import { a as be, b as ke, c as Ie } from "./chunk-5SAWWLB7.mjs";
import { a as ce, b as e, c as p } from "./chunk-OO3TPEBQ.mjs";
import {
  $ as de,
  K as J,
  P as m,
  S as Q,
  T as Z,
  V as j,
  W as xe,
  Z as G,
  ba as ge,
  c as R,
  g as z,
  j as q,
  l as Y,
  la as ve,
  n as M,
  o as O,
  oa as we,
  pa as E,
  r as S,
  t,
  u as fe,
  ua as L,
  v as A,
  va as H,
  wa as B,
} from "./chunk-QEUFNCD2.mjs";
var We = B(N),
  ne = Z(N),
  Xe = { lhQ1aBKvy: { hover: !0 } },
  ze = ["lhQ1aBKvy", "LkD2tCl2M"],
  qe = "framer-heyIq",
  Ye = { lhQ1aBKvy: "framer-v-1ksnws5", LkD2tCl2M: "framer-v-15k4cm6" };
function Me(i, ...n) {
  let l = {};
  return (n?.forEach((s) => s && Object.assign(l, i[s])), l);
}
var Ae = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  Je = ({ value: i, children: n }) => {
    let l = q(S),
      s = i ?? l.transition,
      y = M(() => ({ ...l, transition: s }), [JSON.stringify(s)]);
    return e(S.Provider, { value: y, children: n });
  },
  Qe = t(R),
  Ze = { Desktop: "lhQ1aBKvy", Mobile: "LkD2tCl2M" },
  Ge = ({
    background: i,
    backgroundHover: n,
    description: l,
    description1: s,
    height: y,
    icon: U,
    icon1: d,
    id: P,
    link: a,
    text: o,
    title: w,
    width: h,
    ...f
  }) => {
    var b, c, x, v, k, C, _, D, r;
    return {
      ...f,
      BFhC6pNFP: a ?? f.BFhC6pNFP,
      gXnn4SgRT: (b = w ?? f.gXnn4SgRT) !== null && b !== void 0 ? b : "Tasks",
      p6O1w1br3: (c = i ?? f.p6O1w1br3) !== null && c !== void 0 ? c : "rgb(255, 255, 255)",
      QR8348iKk: (x = o ?? f.QR8348iKk) !== null && x !== void 0 ? x : "rgb(0, 0, 0)",
      SJLTlehwU: l ?? f.SJLTlehwU,
      u7j9AUUWB: (v = U ?? f.u7j9AUUWB) !== null && v !== void 0 ? v : !0,
      V7_OfYtD0: (k = s ?? f.V7_OfYtD0) !== null && k !== void 0 ? k : "Organize tasks",
      variant:
        (_ = (C = Ze[f.variant]) !== null && C !== void 0 ? C : f.variant) !== null && _ !== void 0
          ? _
          : "lhQ1aBKvy",
      WCeYfOaIw: (D = d ?? f.WCeYfOaIw) !== null && D !== void 0 ? D : "CheckCircle",
      wy_5ghmrW: (r = n ?? f.wy_5ghmrW) !== null && r !== void 0 ? r : "rgb(247, 247, 247)",
    };
  },
  Ee = (i, n) => n.join("-") + i.layoutDependency,
  He = z(function (i, n) {
    let { activeLocale: l, setLocale: s } = J(),
      {
        style: y,
        className: U,
        layoutId: d,
        variant: P,
        u7j9AUUWB: a,
        WCeYfOaIw: o,
        gXnn4SgRT: w,
        SJLTlehwU: h,
        V7_OfYtD0: f,
        BFhC6pNFP: b,
        QR8348iKk: c,
        p6O1w1br3: x,
        wy_5ghmrW: v,
        ...k
      } = Ge(i),
      {
        baseVariant: C,
        classNames: _,
        gestureVariant: D,
        setGestureState: r,
        setVariant: W,
        transition: ue,
        variants: T,
      } = E({
        cycleOrder: ze,
        defaultVariant: "lhQ1aBKvy",
        enabledGestures: Xe,
        transitions: Ae,
        variant: P,
        variantClassNames: Ye,
      }),
      I = Ee(i, T),
      oe = O(null),
      le = Y(),
      F = [re, Ie];
    return e(A, {
      id: d ?? le,
      children: e(Qe, {
        animate: T,
        initial: !1,
        children: e(Je, {
          value: ue,
          children: e(ge, {
            href: b,
            children: p(t.a, {
              ...k,
              className: `${j(qe, ...F, "framer-1ksnws5", U, _)} framer-4bl8o9`,
              "data-framer-name": "Desktop",
              layoutDependency: I,
              layoutId: "lhQ1aBKvy",
              onHoverEnd: () => r({ isHovered: !1 }),
              onHoverStart: () => r({ isHovered: !0 }),
              onTap: () => r({ isPressed: !1 }),
              onTapCancel: () => r({ isPressed: !1 }),
              onTapStart: () => r({ isPressed: !0 }),
              ref: n ?? oe,
              style: {
                backgroundColor: x,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                ...y,
              },
              variants: {
                "lhQ1aBKvy-hover": { backgroundColor: v },
                LkD2tCl2M: {
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                },
              },
              ...Me(
                {
                  "lhQ1aBKvy-hover": { "data-framer-name": void 0 },
                  LkD2tCl2M: { "data-framer-name": "Mobile" },
                },
                C,
                D
              ),
              children: [
                p(t.div, {
                  className: "framer-1t1sfuu",
                  layoutDependency: I,
                  layoutId: "FCixxM3f0",
                  children: [
                    a &&
                      e(t.div, {
                        className: "framer-tu5r1j",
                        "data-border": !0,
                        layoutDependency: I,
                        layoutId: "D7UfDRpON",
                        style: {
                          "--border-bottom-width": "1px",
                          "--border-color":
                            "var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1))",
                          "--border-left-width": "1px",
                          "--border-right-width": "1px",
                          "--border-style": "solid",
                          "--border-top-width": "1px",
                          borderBottomLeftRadius: 8,
                          borderBottomRightRadius: 8,
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                        },
                        variants: {
                          LkD2tCl2M: {
                            "--border-bottom-width": "0px",
                            "--border-left-width": "0px",
                            "--border-right-width": "0px",
                            "--border-top-width": "0px",
                          },
                        },
                        children: e(t.div, {
                          className: "framer-19qlg5h-container",
                          layoutDependency: I,
                          layoutId: "roPNA5PoL-container",
                          style: { opacity: 0.5 },
                          children: e(N, {
                            color: c,
                            height: "100%",
                            iconSearch: "House",
                            iconSelection: o,
                            id: "roPNA5PoL",
                            layoutId: "roPNA5PoL",
                            mirrored: !1,
                            selectByList: !0,
                            style: { height: "100%", width: "100%" },
                            weight: "bold",
                            width: "100%",
                          }),
                        }),
                      }),
                    e(L, {
                      __fromCanvasComponent: !0,
                      children: e(R, {
                        children: e(t.p, {
                          className: "framer-styles-preset-1liy3mn",
                          "data-styles-preset": "sWDjdymW6",
                          style: {
                            "--framer-text-color":
                              "var(--extracted-r6o4lv, var(--variable-reference-QR8348iKk-M1GgOVuN5))",
                          },
                          children: "Tasks",
                        }),
                      }),
                      className: "framer-15u8aap",
                      layoutDependency: I,
                      layoutId: "ZPHAXVHUX",
                      style: {
                        "--extracted-r6o4lv": "var(--variable-reference-QR8348iKk-M1GgOVuN5)",
                        "--framer-link-text-color": "rgb(0, 153, 255)",
                        "--framer-link-text-decoration": "underline",
                        "--variable-reference-QR8348iKk-M1GgOVuN5": c,
                      },
                      text: w,
                      verticalAlignment: "top",
                      withExternalLayout: !0,
                    }),
                  ],
                }),
                h &&
                  e(t.div, {
                    className: "framer-1tteik7",
                    layoutDependency: I,
                    layoutId: "RvmsAWmu4",
                    children: e(L, {
                      __fromCanvasComponent: !0,
                      children: e(R, {
                        children: e(t.p, {
                          className: "framer-styles-preset-1dts917",
                          "data-styles-preset": "hgKudGhZ5",
                          children: "Organize tasks",
                        }),
                      }),
                      className: "framer-17yqnt",
                      layoutDependency: I,
                      layoutId: "BLcKaREoy",
                      style: {
                        "--framer-link-text-color": "rgb(0, 153, 255)",
                        "--framer-link-text-decoration": "underline",
                        opacity: 0.5,
                      },
                      text: f,
                      verticalAlignment: "top",
                      withExternalLayout: !0,
                    }),
                  }),
              ],
            }),
          }),
        }),
      }),
    });
  }),
  $e = [
    '.framer-heyIq[data-border="true"]::after, .framer-heyIq [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-heyIq.framer-4bl8o9, .framer-heyIq .framer-4bl8o9 { display: block; }",
    ".framer-heyIq.framer-1ksnws5 { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: auto; justify-content: flex-start; overflow: visible; padding: 10px 10px 10px 10px; position: relative; text-decoration: none; width: 190px; }",
    ".framer-heyIq .framer-1t1sfuu { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-heyIq .framer-tu5r1j { align-content: center; align-items: center; aspect-ratio: 1 / 1; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: var(--framer-aspect-ratio-supported, 32px); justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 32px; }",
    ".framer-heyIq .framer-19qlg5h-container { flex: none; height: 18px; position: relative; width: 18px; }",
    ".framer-heyIq .framer-15u8aap, .framer-heyIq .framer-17yqnt { flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-heyIq .framer-1tteik7 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 42px; position: relative; width: 100%; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-heyIq.framer-1ksnws5, .framer-heyIq .framer-1t1sfuu, .framer-heyIq .framer-tu5r1j, .framer-heyIq .framer-1tteik7 { gap: 0px; } .framer-heyIq.framer-1ksnws5 > * { margin: 0px; margin-bottom: calc(0px / 2); margin-top: calc(0px / 2); } .framer-heyIq.framer-1ksnws5 > :first-child, .framer-heyIq .framer-1tteik7 > :first-child { margin-top: 0px; } .framer-heyIq.framer-1ksnws5 > :last-child, .framer-heyIq .framer-1tteik7 > :last-child { margin-bottom: 0px; } .framer-heyIq .framer-1t1sfuu > *, .framer-heyIq .framer-tu5r1j > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-heyIq .framer-1t1sfuu > :first-child, .framer-heyIq .framer-tu5r1j > :first-child { margin-left: 0px; } .framer-heyIq .framer-1t1sfuu > :last-child, .framer-heyIq .framer-tu5r1j > :last-child { margin-right: 0px; } .framer-heyIq .framer-1tteik7 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } }",
    ".framer-heyIq.framer-v-15k4cm6.framer-1ksnws5 { padding: 10px 0px 10px 0px; }",
    ".framer-heyIq.framer-v-15k4cm6 .framer-tu5r1j { aspect-ratio: unset; height: auto; width: auto; }",
    ...ee,
    ...ke,
  ],
  V = G(He, $e, "framer-heyIq"),
  u = V;
V.displayName = "Nav/Dropdown Item";
V.defaultProps = { height: 52, width: 190 };
Q(V, {
  variant: {
    options: ["lhQ1aBKvy", "LkD2tCl2M"],
    optionTitles: ["Desktop", "Mobile"],
    title: "Variant",
    type: m.Enum,
  },
  u7j9AUUWB: { defaultValue: !0, title: "Icon", type: m.Boolean },
  WCeYfOaIw: ne?.iconSelection && {
    ...ne.iconSelection,
    defaultValue: "CheckCircle",
    description: void 0,
    hidden: void 0,
    title: "Icon",
  },
  gXnn4SgRT: { defaultValue: "Tasks", displayTextArea: !1, title: "Title", type: m.String },
  SJLTlehwU: { defaultValue: !1, title: "Description", type: m.Boolean },
  V7_OfYtD0: {
    defaultValue: "Organize tasks",
    displayTextArea: !0,
    title: "Description",
    type: m.String,
  },
  BFhC6pNFP: { title: "Link", type: m.Link },
  QR8348iKk: { defaultValue: "rgb(0, 0, 0)", title: "Text", type: m.Color },
  p6O1w1br3: { defaultValue: "rgb(255, 255, 255)", title: "Background", type: m.Color },
  wy_5ghmrW: { defaultValue: "rgb(247, 247, 247)", title: "Background Hover", type: m.Color },
});
H(V, [...We, ...$, ...be]);
var er = B(me),
  rr = B(te),
  tr = B(u),
  Ue = xe(t.div),
  ar = B(N),
  nr = B(ae),
  ie = Z(ae),
  ir = ["yIJukhzj6", "DlpJpKBvt", "vZNkcdFXx"],
  pe = "framer-Ufxt3",
  or = {
    DlpJpKBvt: "framer-v-w338sz",
    vZNkcdFXx: "framer-v-jg3fgl",
    yIJukhzj6: "framer-v-1551pr8",
  };
function Ce(i, ...n) {
  let l = {};
  return (n?.forEach((s) => s && Object.assign(l, i[s])), l);
}
var lr = { default: { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } },
  _e = { damping: 30, delay: 0, mass: 1, stiffness: 400, type: "spring" },
  De = { opacity: 0, rotate: 0, scale: 0.95, transition: _e, x: 0, y: 0 },
  Re = { opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, transition: _e, x: 0, y: 0 },
  Oe = { opacity: 0, rotate: 0, scale: 0.95, x: 0, y: 0 },
  Be = ({ children: i, blockDocumentScrolling: n, enabled: l = !0 }) => {
    let [s, y] = we({ blockDocumentScrolling: n });
    return i({ hide: () => y(!1), show: () => y(!0), toggle: () => y(!s), visible: l && s });
  },
  sr = ({ value: i, children: n }) => {
    let l = q(S),
      s = i ?? l.transition,
      y = M(() => ({ ...l, transition: s }), [JSON.stringify(s)]);
    return e(S.Provider, { value: y, children: n });
  },
  fr = t(R),
  dr = {
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
  cr = { "Phone Open": "vZNkcdFXx", Desktop: "yIJukhzj6", Phone: "DlpJpKBvt" },
  mr = ({
    background: i,
    backgroundBlur: n,
    bgSecondary: l,
    button: s,
    height: y,
    id: U,
    text: d,
    width: P,
    ...a
  }) => {
    var o, w, h, f, b, c, x, v;
    return {
      ...a,
      G7Ppt7M52: (o = l ?? a.G7Ppt7M52) !== null && o !== void 0 ? o : "rgb(247, 247, 247)",
      icf8yPK44: n ?? a.icf8yPK44,
      O2GRK6A3O:
        (f =
          (h = (w = dr[s]) !== null && w !== void 0 ? w : s) !== null && h !== void 0
            ? h
            : a.O2GRK6A3O) !== null && f !== void 0
          ? f
          : "PqgBulBPi",
      upiCzNseE: (b = d ?? a.upiCzNseE) !== null && b !== void 0 ? b : "rgb(0, 0, 0)",
      variant:
        (x = (c = cr[a.variant]) !== null && c !== void 0 ? c : a.variant) !== null && x !== void 0
          ? x
          : "yIJukhzj6",
      XRn7LO2VY: (v = i ?? a.XRn7LO2VY) !== null && v !== void 0 ? v : "rgb(255, 255, 255)",
    };
  },
  pr = (i, n) => n.join("-") + i.layoutDependency,
  ur = z(function (i, n) {
    let { activeLocale: l, setLocale: s } = J(),
      {
        style: y,
        className: U,
        layoutId: d,
        variant: P,
        upiCzNseE: a,
        XRn7LO2VY: o,
        O2GRK6A3O: w,
        G7Ppt7M52: h,
        icf8yPK44: f,
        ...b
      } = mr(i),
      {
        baseVariant: c,
        classNames: x,
        gestureVariant: v,
        setGestureState: k,
        setVariant: C,
        transition: _,
        variants: D,
      } = E({
        cycleOrder: ir,
        defaultVariant: "yIJukhzj6",
        transitions: lr,
        variant: P,
        variantClassNames: or,
      }),
      r = pr(i, D),
      { activeVariantCallback: W, delay: ue } = ve(c),
      T = (g) =>
        W(async (...yr) => {
          g.show();
        }),
      I = W(async (...g) => {
        C("vZNkcdFXx");
      }),
      oe = W(async (...g) => {
        C("DlpJpKBvt");
      }),
      le = O(null),
      F = () => !["DlpJpKBvt", "vZNkcdFXx"].includes(c),
      he = O(null),
      Ne = O(null),
      ye = O(null),
      Se = O(null),
      je = () => !!["DlpJpKBvt", "vZNkcdFXx"].includes(c),
      X = () => c === "vZNkcdFXx",
      Le = Y(),
      se = [re];
    return e(A, {
      id: d ?? Le,
      children: e(fr, {
        animate: D,
        initial: !1,
        children: e(sr, {
          value: _,
          children: p(t.div, {
            ...b,
            className: j(pe, ...se, "framer-1551pr8", U, x),
            "data-framer-name": "Desktop",
            layoutDependency: r,
            layoutId: "yIJukhzj6",
            onHoverEnd: () => k({ isHovered: !1 }),
            onHoverStart: () => k({ isHovered: !0 }),
            onTap: () => k({ isPressed: !1 }),
            onTapCancel: () => k({ isPressed: !1 }),
            onTapStart: () => k({ isPressed: !0 }),
            ref: n ?? le,
            style: { backdropFilter: `blur(${f}px)`, backgroundColor: o, ...y },
            ...Ce(
              {
                DlpJpKBvt: { "data-framer-name": "Phone" },
                vZNkcdFXx: { "data-framer-name": "Phone Open" },
              },
              c,
              v
            ),
            children: [
              p(t.div, {
                className: "framer-1veul4u",
                layoutDependency: r,
                layoutId: "ejv4hSthE",
                children: [
                  p(t.div, {
                    className: "framer-8ybx7l",
                    layoutDependency: r,
                    layoutId: "dkNQGbwoR",
                    children: [
                      e(t.div, {
                        className: "framer-xcvzs9-container",
                        layoutDependency: r,
                        layoutId: "mwlYbBD4i-container",
                        children: e(me, {
                          height: "100%",
                          id: "mwlYbBD4i",
                          layoutId: "mwlYbBD4i",
                          QPpn2xZty: "rgb(0, 0, 0)",
                          style: { height: "100%", width: "100%" },
                          variant: "eEZGnfswo",
                          width: "100%",
                        }),
                      }),
                      F() &&
                        e(Be, {
                          blockDocumentScrolling: !1,
                          children: (g) =>
                            e(ce, {
                              children: p(t.div, {
                                className: "framer-1yuh9y1-container",
                                id: `${d}-1yuh9y1`,
                                layoutDependency: r,
                                layoutId: "X4nZEiA6m-container",
                                ref: he,
                                children: [
                                  e(te, {
                                    Dl6AiX37G: a,
                                    height: "100%",
                                    id: "X4nZEiA6m",
                                    kcKdHX2wm: "Features",
                                    layoutId: "X4nZEiA6m",
                                    qe8e_sxRy: T(g),
                                    variant: g.visible ? "TuI1FkLhZ" : "pulFlqedB",
                                    width: "100%",
                                  }),
                                  e(fe, {
                                    children:
                                      g.visible &&
                                      e(de, {
                                        alignment: "center",
                                        anchorRef: he,
                                        className: j(pe, x, ...se),
                                        collisionDetection: !0,
                                        collisionDetectionPadding: 20,
                                        "data-framer-portal-id": `${d}-1yuh9y1`,
                                        offsetX: 62,
                                        offsetY: 10,
                                        onDismiss: g.hide,
                                        placement: "bottom",
                                        portalSelector: "#overlay",
                                        safeArea: !0,
                                        zIndex: 11,
                                        children: p(Ue, {
                                          __perspectiveFX: !1,
                                          __smartComponentFX: !0,
                                          __targetOpacity: 1,
                                          animate: Re,
                                          className: "framer-w3k0ox",
                                          exit: De,
                                          initial: Oe,
                                          layoutDependency: r,
                                          layoutId: "sO89aa1PZ",
                                          ref: Ne,
                                          role: "dialog",
                                          style: {
                                            backdropFilter: `blur(${f}px)`,
                                            backgroundColor: o,
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                            boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.05)",
                                          },
                                          children: [
                                            e(t.div, {
                                              className: "framer-2kh2z9-container",
                                              layoutDependency: r,
                                              layoutId: "I6TFCH0u1-container",
                                              children: e(u, {
                                                gXnn4SgRT: "Tasks",
                                                height: "100%",
                                                id: "I6TFCH0u1",
                                                layoutId: "I6TFCH0u1",
                                                p6O1w1br3: o,
                                                QR8348iKk: a,
                                                SJLTlehwU: !1,
                                                style: { width: "100%" },
                                                u7j9AUUWB: !0,
                                                V7_OfYtD0: "",
                                                variant: "lhQ1aBKvy",
                                                WCeYfOaIw: "CheckCircle",
                                                width: "100%",
                                                wy_5ghmrW: h,
                                              }),
                                            }),
                                            e(t.div, {
                                              className: "framer-936wut-container",
                                              layoutDependency: r,
                                              layoutId: "cJIpOl_t_-container",
                                              children: e(u, {
                                                gXnn4SgRT: "Dashboard",
                                                height: "100%",
                                                id: "cJIpOl_t_",
                                                layoutId: "cJIpOl_t_",
                                                p6O1w1br3: o,
                                                QR8348iKk: a,
                                                SJLTlehwU: !1,
                                                style: { width: "100%" },
                                                u7j9AUUWB: !0,
                                                V7_OfYtD0: "",
                                                variant: "lhQ1aBKvy",
                                                WCeYfOaIw: "Gauge",
                                                width: "100%",
                                                wy_5ghmrW: h,
                                              }),
                                            }),
                                            e(t.div, {
                                              className: "framer-rnu2qf-container",
                                              layoutDependency: r,
                                              layoutId: "Omx7UmMXh-container",
                                              children: e(u, {
                                                gXnn4SgRT: "Integrations",
                                                height: "100%",
                                                id: "Omx7UmMXh",
                                                layoutId: "Omx7UmMXh",
                                                p6O1w1br3: o,
                                                QR8348iKk: a,
                                                SJLTlehwU: !1,
                                                style: { width: "100%" },
                                                u7j9AUUWB: !0,
                                                V7_OfYtD0: "",
                                                variant: "lhQ1aBKvy",
                                                WCeYfOaIw: "PuzzlePiece",
                                                width: "100%",
                                                wy_5ghmrW: h,
                                              }),
                                            }),
                                            e(t.div, {
                                              className: "framer-11djqvi-container",
                                              layoutDependency: r,
                                              layoutId: "jMLZi0Phf-container",
                                              children: e(u, {
                                                gXnn4SgRT: "Calendar",
                                                height: "100%",
                                                id: "jMLZi0Phf",
                                                layoutId: "jMLZi0Phf",
                                                p6O1w1br3: o,
                                                QR8348iKk: a,
                                                SJLTlehwU: !1,
                                                style: { width: "100%" },
                                                u7j9AUUWB: !0,
                                                V7_OfYtD0: "",
                                                variant: "lhQ1aBKvy",
                                                WCeYfOaIw: "CalendarBlank",
                                                width: "100%",
                                                wy_5ghmrW: h,
                                              }),
                                            }),
                                          ],
                                        }),
                                      }),
                                  }),
                                ],
                              }),
                            }),
                        }),
                      F() &&
                        e(Be, {
                          blockDocumentScrolling: !1,
                          children: (g) =>
                            e(ce, {
                              children: p(t.div, {
                                className: "framer-oee8ge-container",
                                id: `${d}-oee8ge`,
                                layoutDependency: r,
                                layoutId: "dqPA5XJyz-container",
                                ref: ye,
                                children: [
                                  e(te, {
                                    Dl6AiX37G: a,
                                    height: "100%",
                                    id: "dqPA5XJyz",
                                    kcKdHX2wm: "Company",
                                    layoutId: "dqPA5XJyz",
                                    qe8e_sxRy: T(g),
                                    variant: g.visible ? "TuI1FkLhZ" : "pulFlqedB",
                                    width: "100%",
                                  }),
                                  e(fe, {
                                    children:
                                      g.visible &&
                                      e(de, {
                                        alignment: "center",
                                        anchorRef: ye,
                                        className: j(pe, x, ...se),
                                        collisionDetection: !0,
                                        collisionDetectionPadding: 20,
                                        "data-framer-portal-id": `${d}-oee8ge`,
                                        offsetX: 62,
                                        offsetY: 10,
                                        onDismiss: g.hide,
                                        placement: "bottom",
                                        portalSelector: "#overlay",
                                        safeArea: !0,
                                        zIndex: 11,
                                        children: p(Ue, {
                                          __perspectiveFX: !1,
                                          __smartComponentFX: !0,
                                          __targetOpacity: 1,
                                          animate: Re,
                                          className: "framer-j4odgc",
                                          exit: De,
                                          initial: Oe,
                                          layoutDependency: r,
                                          layoutId: "gCI9Da6sv",
                                          ref: Se,
                                          role: "dialog",
                                          style: {
                                            backdropFilter: `blur(${f}px)`,
                                            backgroundColor: o,
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                            boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.05)",
                                          },
                                          children: [
                                            e(t.div, {
                                              className: "framer-hg68wb-container",
                                              layoutDependency: r,
                                              layoutId: "kYGDPhQ2N-container",
                                              children: e(u, {
                                                gXnn4SgRT: "About",
                                                height: "100%",
                                                id: "kYGDPhQ2N",
                                                layoutId: "kYGDPhQ2N",
                                                p6O1w1br3: o,
                                                QR8348iKk: a,
                                                SJLTlehwU: !1,
                                                style: { width: "100%" },
                                                u7j9AUUWB: !0,
                                                V7_OfYtD0: "",
                                                variant: "lhQ1aBKvy",
                                                WCeYfOaIw: "UsersThree",
                                                width: "100%",
                                                wy_5ghmrW: h,
                                              }),
                                            }),
                                            e(t.div, {
                                              className: "framer-15iv76h-container",
                                              layoutDependency: r,
                                              layoutId: "wzyv05Pbc-container",
                                              children: e(u, {
                                                gXnn4SgRT: "Blog",
                                                height: "100%",
                                                id: "wzyv05Pbc",
                                                layoutId: "wzyv05Pbc",
                                                p6O1w1br3: o,
                                                QR8348iKk: a,
                                                SJLTlehwU: !1,
                                                style: { width: "100%" },
                                                u7j9AUUWB: !0,
                                                V7_OfYtD0: "",
                                                variant: "lhQ1aBKvy",
                                                WCeYfOaIw: "Article",
                                                width: "100%",
                                                wy_5ghmrW: h,
                                              }),
                                            }),
                                            e(t.div, {
                                              className: "framer-1jtjbcc-container",
                                              layoutDependency: r,
                                              layoutId: "ZLjYvHmrm-container",
                                              children: e(u, {
                                                gXnn4SgRT: "Careers",
                                                height: "100%",
                                                id: "ZLjYvHmrm",
                                                layoutId: "ZLjYvHmrm",
                                                p6O1w1br3: o,
                                                QR8348iKk: a,
                                                SJLTlehwU: !1,
                                                style: { width: "100%" },
                                                u7j9AUUWB: !0,
                                                V7_OfYtD0: "",
                                                variant: "lhQ1aBKvy",
                                                WCeYfOaIw: "Briefcase",
                                                width: "100%",
                                                wy_5ghmrW: h,
                                              }),
                                            }),
                                          ],
                                        }),
                                      }),
                                  }),
                                ],
                              }),
                            }),
                        }),
                    ],
                  }),
                  je() &&
                    e(t.div, {
                      className: "framer-lzbecx-container",
                      "data-framer-name": "Menu",
                      layoutDependency: r,
                      layoutId: "D7m18o3gW-container",
                      name: "Menu",
                      children: e(N, {
                        color: "rgb(0, 0, 0)",
                        height: "100%",
                        iconSearch: "House",
                        iconSelection: "List",
                        id: "D7m18o3gW",
                        layoutId: "D7m18o3gW",
                        mirrored: !1,
                        name: "Menu",
                        selectByList: !0,
                        style: { height: "100%", width: "100%" },
                        weight: "regular",
                        width: "100%",
                        ...Ce(
                          {
                            DlpJpKBvt: { color: a, onClick: I },
                            vZNkcdFXx: { color: a, iconSelection: "X", onClick: oe },
                          },
                          c,
                          v
                        ),
                      }),
                    }),
                  F() &&
                    e(t.div, {
                      className: "framer-2bpcd2-container",
                      layoutDependency: r,
                      layoutId: "laUbX75PQ-container",
                      children: e(ae, {
                        eszixBaDA: 10,
                        height: "100%",
                        id: "laUbX75PQ",
                        ik9I5qIGz: !1,
                        J0LC2FGV8: !1,
                        KJK1sV1GB: "Get for free",
                        layoutId: "laUbX75PQ",
                        RmkZjgJwi: "ArrowRight",
                        UsLusPFRg: "rgb(0, 0, 0)",
                        variant: w,
                        width: "100%",
                        yTZZaFOb3: "https://framer.link/ZQ2l2Kk",
                      }),
                    }),
                ],
              }),
              X() &&
                p(t.div, {
                  className: "framer-1exoxwd",
                  "data-framer-name": "Menu Phone",
                  layoutDependency: r,
                  layoutId: "u201zK_Jb",
                  children: [
                    X() &&
                      p(t.div, {
                        className: "framer-1o3qj7",
                        layoutDependency: r,
                        layoutId: "GWOSjXvJA",
                        children: [
                          X() &&
                            e(L, {
                              __fromCanvasComponent: !0,
                              children: e(R, {
                                children: e(t.p, {
                                  className: "framer-styles-preset-1liy3mn",
                                  "data-styles-preset": "sWDjdymW6",
                                  style: {
                                    "--framer-text-color":
                                      "var(--extracted-r6o4lv, var(--variable-reference-upiCzNseE-ltZuO6cFa))",
                                  },
                                  children: "Features",
                                }),
                              }),
                              className: "framer-18lpefl",
                              layoutDependency: r,
                              layoutId: "ZLnEESCIn",
                              style: {
                                "--extracted-r6o4lv":
                                  "var(--variable-reference-upiCzNseE-ltZuO6cFa)",
                                "--variable-reference-upiCzNseE-ltZuO6cFa": a,
                                opacity: 0.5,
                              },
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          p(t.div, {
                            className: "framer-bsxn7z",
                            layoutDependency: r,
                            layoutId: "rDWukgaOp",
                            children: [
                              e(t.div, {
                                className: "framer-96012r-container",
                                layoutDependency: r,
                                layoutId: "BFwq7SSKv-container",
                                children: e(u, {
                                  gXnn4SgRT: "Tasks",
                                  height: "100%",
                                  id: "BFwq7SSKv",
                                  layoutId: "BFwq7SSKv",
                                  p6O1w1br3: o,
                                  QR8348iKk: a,
                                  SJLTlehwU: !1,
                                  style: { width: "100%" },
                                  u7j9AUUWB: !0,
                                  V7_OfYtD0: "Organize tasks",
                                  variant: "LkD2tCl2M",
                                  WCeYfOaIw: "CheckCircle",
                                  width: "100%",
                                  wy_5ghmrW: "rgb(247, 247, 247)",
                                }),
                              }),
                              e(t.div, {
                                className: "framer-n4xckv-container",
                                layoutDependency: r,
                                layoutId: "wYXlCBPic-container",
                                children: e(u, {
                                  gXnn4SgRT: "Dashboard",
                                  height: "100%",
                                  id: "wYXlCBPic",
                                  layoutId: "wYXlCBPic",
                                  p6O1w1br3: o,
                                  QR8348iKk: a,
                                  SJLTlehwU: !1,
                                  style: { width: "100%" },
                                  u7j9AUUWB: !0,
                                  V7_OfYtD0: "Organize tasks",
                                  variant: "LkD2tCl2M",
                                  WCeYfOaIw: "Gauge",
                                  width: "100%",
                                  wy_5ghmrW: "rgb(247, 247, 247)",
                                }),
                              }),
                              e(t.div, {
                                className: "framer-119b5kn-container",
                                layoutDependency: r,
                                layoutId: "fDd3DyyL3-container",
                                children: e(u, {
                                  gXnn4SgRT: "Integrations",
                                  height: "100%",
                                  id: "fDd3DyyL3",
                                  layoutId: "fDd3DyyL3",
                                  p6O1w1br3: o,
                                  QR8348iKk: a,
                                  SJLTlehwU: !1,
                                  style: { width: "100%" },
                                  u7j9AUUWB: !0,
                                  V7_OfYtD0: "Organize tasks",
                                  variant: "LkD2tCl2M",
                                  WCeYfOaIw: "PuzzlePiece",
                                  width: "100%",
                                  wy_5ghmrW: "rgb(247, 247, 247)",
                                }),
                              }),
                              e(t.div, {
                                className: "framer-irvviw-container",
                                layoutDependency: r,
                                layoutId: "q0ICKwtKk-container",
                                children: e(u, {
                                  gXnn4SgRT: "Calendar",
                                  height: "100%",
                                  id: "q0ICKwtKk",
                                  layoutId: "q0ICKwtKk",
                                  p6O1w1br3: o,
                                  QR8348iKk: a,
                                  SJLTlehwU: !1,
                                  style: { width: "100%" },
                                  u7j9AUUWB: !0,
                                  V7_OfYtD0: "Organize tasks",
                                  variant: "LkD2tCl2M",
                                  WCeYfOaIw: "CalendarBlank",
                                  width: "100%",
                                  wy_5ghmrW: "rgb(247, 247, 247)",
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    X() &&
                      p(t.div, {
                        className: "framer-1o24y7m",
                        layoutDependency: r,
                        layoutId: "VkmuVB1oy",
                        children: [
                          e(L, {
                            __fromCanvasComponent: !0,
                            children: e(R, {
                              children: e(t.p, {
                                className: "framer-styles-preset-1liy3mn",
                                "data-styles-preset": "sWDjdymW6",
                                style: {
                                  "--framer-text-color":
                                    "var(--extracted-r6o4lv, var(--variable-reference-upiCzNseE-ltZuO6cFa))",
                                },
                                children: "Company",
                              }),
                            }),
                            className: "framer-12j8kk4",
                            layoutDependency: r,
                            layoutId: "M6d8jU47e",
                            style: {
                              "--extracted-r6o4lv": "var(--variable-reference-upiCzNseE-ltZuO6cFa)",
                              "--variable-reference-upiCzNseE-ltZuO6cFa": a,
                              opacity: 0.5,
                            },
                            verticalAlignment: "top",
                            withExternalLayout: !0,
                          }),
                          p(t.div, {
                            className: "framer-ohrwr",
                            layoutDependency: r,
                            layoutId: "FcCHA1csc",
                            children: [
                              e(t.div, {
                                className: "framer-3i51zh-container",
                                layoutDependency: r,
                                layoutId: "JmbQ3lxOk-container",
                                children: e(u, {
                                  gXnn4SgRT: "About",
                                  height: "100%",
                                  id: "JmbQ3lxOk",
                                  layoutId: "JmbQ3lxOk",
                                  p6O1w1br3: o,
                                  QR8348iKk: a,
                                  SJLTlehwU: !1,
                                  style: { width: "100%" },
                                  u7j9AUUWB: !0,
                                  V7_OfYtD0: "Organize tasks",
                                  variant: "LkD2tCl2M",
                                  WCeYfOaIw: "UsersThree",
                                  width: "100%",
                                  wy_5ghmrW: "rgb(247, 247, 247)",
                                }),
                              }),
                              e(t.div, {
                                className: "framer-1oxfoki-container",
                                layoutDependency: r,
                                layoutId: "yS9_SY5CL-container",
                                children: e(u, {
                                  gXnn4SgRT: "Blog",
                                  height: "100%",
                                  id: "yS9_SY5CL",
                                  layoutId: "yS9_SY5CL",
                                  p6O1w1br3: o,
                                  QR8348iKk: a,
                                  SJLTlehwU: !1,
                                  style: { width: "100%" },
                                  u7j9AUUWB: !0,
                                  V7_OfYtD0: "Organize tasks",
                                  variant: "LkD2tCl2M",
                                  WCeYfOaIw: "Article",
                                  width: "100%",
                                  wy_5ghmrW: "rgb(247, 247, 247)",
                                }),
                              }),
                              e(t.div, {
                                className: "framer-1u2074y-container",
                                layoutDependency: r,
                                layoutId: "TBNyXAr0T-container",
                                children: e(u, {
                                  gXnn4SgRT: "Careers",
                                  height: "100%",
                                  id: "TBNyXAr0T",
                                  layoutId: "TBNyXAr0T",
                                  p6O1w1br3: o,
                                  QR8348iKk: a,
                                  SJLTlehwU: !1,
                                  style: { width: "100%" },
                                  u7j9AUUWB: !0,
                                  V7_OfYtD0: "Organize tasks",
                                  variant: "LkD2tCl2M",
                                  WCeYfOaIw: "Briefcase",
                                  width: "100%",
                                  wy_5ghmrW: "rgb(247, 247, 247)",
                                }),
                              }),
                            ],
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
  hr = [
    '.framer-Ufxt3[data-border="true"]::after, .framer-Ufxt3 [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-Ufxt3.framer-1i7id74, .framer-Ufxt3 .framer-1i7id74 { display: block; }",
    ".framer-Ufxt3.framer-1551pr8 { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 1200px; }",
    ".framer-Ufxt3 .framer-1veul4u { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; max-width: 1600px; overflow: visible; padding: 20px 20px 20px 20px; position: relative; width: 1px; }",
    ".framer-Ufxt3 .framer-8ybx7l { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-Ufxt3 .framer-xcvzs9-container { flex: none; height: 40px; position: relative; width: 40px; }",
    ".framer-Ufxt3 .framer-1yuh9y1-container, .framer-Ufxt3 .framer-oee8ge-container { cursor: pointer; flex: none; height: auto; position: relative; width: auto; }",
    ".framer-Ufxt3 .framer-w3k0ox, .framer-Ufxt3 .framer-j4odgc { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 5px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 5px 5px 5px 5px; position: relative; width: 200px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-Ufxt3 .framer-2kh2z9-container, .framer-Ufxt3 .framer-936wut-container, .framer-Ufxt3 .framer-rnu2qf-container, .framer-Ufxt3 .framer-11djqvi-container, .framer-Ufxt3 .framer-hg68wb-container, .framer-Ufxt3 .framer-15iv76h-container, .framer-Ufxt3 .framer-1jtjbcc-container { flex: none; height: auto; position: relative; width: 100%; }",
    ".framer-Ufxt3 .framer-lzbecx-container { flex: none; height: 28px; position: relative; width: 28px; }",
    ".framer-Ufxt3 .framer-2bpcd2-container { flex: none; height: auto; position: relative; width: auto; }",
    ".framer-Ufxt3 .framer-1exoxwd { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; min-height: 481px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 1px; }",
    ".framer-Ufxt3 .framer-1o3qj7, .framer-Ufxt3 .framer-1o24y7m { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 20px 20px 20px 20px; position: relative; width: 100%; }",
    ".framer-Ufxt3 .framer-18lpefl, .framer-Ufxt3 .framer-12j8kk4 { flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-Ufxt3 .framer-bsxn7z, .framer-Ufxt3 .framer-ohrwr { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 5px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-Ufxt3 .framer-96012r-container, .framer-Ufxt3 .framer-n4xckv-container, .framer-Ufxt3 .framer-119b5kn-container, .framer-Ufxt3 .framer-irvviw-container, .framer-Ufxt3 .framer-3i51zh-container, .framer-Ufxt3 .framer-1oxfoki-container, .framer-Ufxt3 .framer-1u2074y-container { flex: none; height: auto; position: relative; width: 350px; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-Ufxt3.framer-1551pr8, .framer-Ufxt3 .framer-8ybx7l, .framer-Ufxt3 .framer-w3k0ox, .framer-Ufxt3 .framer-j4odgc, .framer-Ufxt3 .framer-1exoxwd, .framer-Ufxt3 .framer-1o3qj7, .framer-Ufxt3 .framer-bsxn7z, .framer-Ufxt3 .framer-1o24y7m, .framer-Ufxt3 .framer-ohrwr { gap: 0px; } .framer-Ufxt3.framer-1551pr8 > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-Ufxt3.framer-1551pr8 > :first-child, .framer-Ufxt3 .framer-8ybx7l > :first-child { margin-left: 0px; } .framer-Ufxt3.framer-1551pr8 > :last-child, .framer-Ufxt3 .framer-8ybx7l > :last-child { margin-right: 0px; } .framer-Ufxt3 .framer-8ybx7l > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } .framer-Ufxt3 .framer-w3k0ox > *, .framer-Ufxt3 .framer-j4odgc > *, .framer-Ufxt3 .framer-bsxn7z > *, .framer-Ufxt3 .framer-ohrwr > * { margin: 0px; margin-bottom: calc(5px / 2); margin-top: calc(5px / 2); } .framer-Ufxt3 .framer-w3k0ox > :first-child, .framer-Ufxt3 .framer-j4odgc > :first-child, .framer-Ufxt3 .framer-1exoxwd > :first-child, .framer-Ufxt3 .framer-1o3qj7 > :first-child, .framer-Ufxt3 .framer-bsxn7z > :first-child, .framer-Ufxt3 .framer-1o24y7m > :first-child, .framer-Ufxt3 .framer-ohrwr > :first-child { margin-top: 0px; } .framer-Ufxt3 .framer-w3k0ox > :last-child, .framer-Ufxt3 .framer-j4odgc > :last-child, .framer-Ufxt3 .framer-1exoxwd > :last-child, .framer-Ufxt3 .framer-1o3qj7 > :last-child, .framer-Ufxt3 .framer-bsxn7z > :last-child, .framer-Ufxt3 .framer-1o24y7m > :last-child, .framer-Ufxt3 .framer-ohrwr > :last-child { margin-bottom: 0px; } .framer-Ufxt3 .framer-1exoxwd > *, .framer-Ufxt3 .framer-1o3qj7 > *, .framer-Ufxt3 .framer-1o24y7m > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } }",
    ".framer-Ufxt3.framer-v-w338sz.framer-1551pr8 { flex-direction: column; width: 390px; }",
    ".framer-Ufxt3.framer-v-w338sz .framer-1veul4u, .framer-Ufxt3.framer-v-jg3fgl .framer-1veul4u { flex: none; width: 100%; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-Ufxt3.framer-v-w338sz.framer-1551pr8 { gap: 0px; } .framer-Ufxt3.framer-v-w338sz.framer-1551pr8 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-Ufxt3.framer-v-w338sz.framer-1551pr8 > :first-child { margin-top: 0px; } .framer-Ufxt3.framer-v-w338sz.framer-1551pr8 > :last-child { margin-bottom: 0px; } }",
    ".framer-Ufxt3.framer-v-jg3fgl.framer-1551pr8 { flex-direction: column; justify-content: flex-start; min-height: calc(var(--framer-viewport-height, 100vh) * 1); width: 390px; }",
    ".framer-Ufxt3.framer-v-jg3fgl .framer-1exoxwd { flex: none; min-height: unset; width: 100%; }",
    "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-Ufxt3.framer-v-jg3fgl.framer-1551pr8 { gap: 0px; } .framer-Ufxt3.framer-v-jg3fgl.framer-1551pr8 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-Ufxt3.framer-v-jg3fgl.framer-1551pr8 > :first-child { margin-top: 0px; } .framer-Ufxt3.framer-v-jg3fgl.framer-1551pr8 > :last-child { margin-bottom: 0px; } }",
    ...ee,
  ],
  K = G(ur, hr, "framer-Ufxt3"),
  Sr = K;
K.displayName = "Nav Dropdown";
K.defaultProps = { height: 80, width: 1200 };
Q(K, {
  variant: {
    options: ["yIJukhzj6", "DlpJpKBvt", "vZNkcdFXx"],
    optionTitles: ["Desktop", "Phone", "Phone Open"],
    title: "Variant",
    type: m.Enum,
  },
  upiCzNseE: { defaultValue: "rgb(0, 0, 0)", title: "Text", type: m.Color },
  XRn7LO2VY: { defaultValue: "rgb(255, 255, 255)", title: "Background", type: m.Color },
  O2GRK6A3O: ie?.variant && {
    ...ie.variant,
    defaultValue: "PqgBulBPi",
    description: void 0,
    hidden: void 0,
    title: "Button",
  },
  G7Ppt7M52: {
    defaultValue: "rgb(247, 247, 247)",
    description: "Background of hovered menu items.",
    title: "Bg Secondary",
    type: m.Color,
  },
  icf8yPK44: { defaultValue: 0, max: 7, title: "Background Blur", type: m.Number },
});
H(K, [...er, ...rr, ...tr, ...ar, ...nr, ...$]);
export { Sr as a };
//# sourceMappingURL=chunk-ARQDWR4D.mjs.map
