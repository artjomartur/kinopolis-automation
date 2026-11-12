import { a as m } from "./chunk-BCJR3627.mjs";
import { a as y } from "./chunk-OLXWMHQS.mjs";
import { a as Q } from "./chunk-5CGDZOPC.mjs";
import { a as qr } from "./chunk-FXC2Z23U.mjs";
import { a as he } from "./chunk-APGM2C5T.mjs";
import { a as Ir } from "./chunk-APG5SWKV.mjs";
import { a as Fe, b as Te, c as We } from "./chunk-A7EV4P55.mjs";
import { a as qe, b as ze, c as Ie } from "./chunk-XNS7SOC6.mjs";
import { a as Fr } from "./chunk-22MXRO7T.mjs";
import "./chunk-MLYPFAXL.mjs";
import "./chunk-G5VSNPDD.mjs";
import { a as zr } from "./chunk-PBG357LN.mjs";
import { a as ue, b as we, c as ye } from "./chunk-3H53UPLQ.mjs";
import { a as ve, b as Ze, c as Ce } from "./chunk-D5CSMFZ4.mjs";
import { a as H } from "./chunk-HBMRKKOJ.mjs";
import { a as ar } from "./chunk-2GNE24G3.mjs";
import { a as J } from "./chunk-CVPCFDSR.mjs";
import "./chunk-G7RZZ2HZ.mjs";
import "./chunk-D5FMDQUG.mjs";
import { a as Se, b as Le, c as je } from "./chunk-MNHRXVGF.mjs";
import { a as ke, b as _e, c as Ne } from "./chunk-ALFWC2ON.mjs";
import { a as ge, b as xe, c as be } from "./chunk-5SAWWLB7.mjs";
import { b as r, c as e } from "./chunk-OO3TPEBQ.mjs";
import {
  A as ie,
  D as ne,
  K as oe,
  N as Lr,
  P as c,
  S as me,
  V as jr,
  W as se,
  Y as t,
  Z as le,
  _ as fe,
  aa as de,
  b as or,
  ba as A,
  c as a,
  d as kr,
  da as u,
  f as _r,
  g as Dr,
  ga as d,
  i as Or,
  ia as C,
  k as Nr,
  l as Qr,
  m as Vr,
  ma as ce,
  n as Yr,
  o as b,
  p as $r,
  ra as g,
  s as Sr,
  t as f,
  ta as mr,
  ua as i,
  v as er,
  va as pe,
  w as re,
  wa as w,
  x as ee,
  y as ae,
  z as te,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var ra = 100,
  ea = {
    left: (n) => `translateX(-${n}px)`,
    right: (n) => `translateX(${n}px)`,
    top: (n) => `translateY(-${n}px)`,
    bottom: (n) => `translateY(${n}px)`,
  },
  Tr = typeof Animation < "u" && typeof Animation.prototype.updatePlaybackRate == "function";
function z(n) {
  let {
      slots: s,
      gap: L,
      padding: M,
      paddingPerSide: F,
      paddingTop: T,
      paddingRight: Y,
      paddingBottom: lr,
      paddingLeft: fr,
      speed: p,
      hoverFactor: tr,
      direction: j,
      alignment: Pr,
      sizingOptions: dr,
      fadeOptions: x,
      style: cr,
    } = n,
    { fadeContent: X, overflow: q, fadeWidth: G, fadeInset: K, fadeAlpha: Ar } = x,
    { widthType: pr, heightType: hr } = dr,
    Me = F ? `${T}px ${Y}px ${lr}px ${fr}px` : `${M}px`,
    W = Lr.current() === Lr.canvas,
    gr = or.count(s),
    ir = gr > 0;
  j === !0 && (j = "left");
  let $ = j === "left" || j === "right",
    Hr = re(0),
    xr = ea[j],
    Xe = ee(Hr, xr),
    U = b(null),
    v = Yr(() => [_r(), _r()], []),
    [E, Ge] = $r({ parent: null, children: null }),
    Jr = [],
    br = [],
    rr = 0,
    ur = 0;
  (W && ((rr = gr ? Math.floor(10 / gr) : 0), (ur = 1)),
    !W &&
      ir &&
      E.parent &&
      ((rr = Math.round((E.parent / E.children) * 2) + 1), (rr = Math.min(rr, ra)), (ur = 1)));
  let Mr = Or(() => {
      if (ir && U.current) {
        let l = $ ? U.current.offsetWidth : U.current.offsetHeight,
          o = v[0].current ? ($ ? v[0].current.offsetLeft : v[0].current.offsetTop) : 0,
          h =
            (v[1].current
              ? $
                ? v[1].current.offsetLeft + v[1].current.offsetWidth
                : v[1].current.offsetTop + v[1].current.offsetHeight
              : 0) -
            o +
            L;
        Ge({ parent: l, children: h });
      }
    }, []),
    Xr = W ? { contentVisibility: "auto" } : {};
  if (ir) {
    if (!W) {
      let l = b(!0);
      Nr(
        () => (
          Sr.read(Mr),
          he(U.current, ({ contentSize: o }) => {
            (!l.current && (o.width || o.height) && Sr.read(Mr), (l.current = !1));
          })
        ),
        []
      );
    }
    Jr = or.map(s, (l, o) => {
      var _, h, B, R;
      let P;
      (o === 0 && (P = v[0]), o === s.length - 1 && (P = v[1]));
      let O = {
        width: pr ? ((_ = l.props) === null || _ === void 0 ? void 0 : _.width) : "100%",
        height: hr ? ((h = l.props) === null || h === void 0 ? void 0 : h.height) : "100%",
      };
      return r(er, {
        inherit: "id",
        children: r("li", {
          ref: P,
          style: O,
          children: kr(
            l,
            {
              style: {
                ...((B = l.props) === null || B === void 0 ? void 0 : B.style),
                ...O,
                flexShrink: 0,
                ...Xr,
              },
              layoutId: l.props.layoutId ? l.props.layoutId + "-original-" + o : void 0,
            },
            (R = l.props) === null || R === void 0 ? void 0 : R.children
          ),
        }),
      });
    });
  }
  if (!W)
    for (let l = 0; l < rr; l++)
      br = [
        ...br,
        ...or.map(s, (o, _) => {
          var h, B, R, P, O, Cr;
          let Qe = {
            width: pr ? ((h = o.props) === null || h === void 0 ? void 0 : h.width) : "100%",
            height: hr ? ((B = o.props) === null || B === void 0 ? void 0 : B.height) : "100%",
          };
          return r(
            er,
            {
              inherit: "id",
              children: r(
                "li",
                {
                  style: Qe,
                  "aria-hidden": !0,
                  children: kr(
                    o,
                    {
                      key: l + " " + _,
                      style: {
                        ...((R = o.props) === null || R === void 0 ? void 0 : R.style),
                        width: pr
                          ? (P = o.props) === null || P === void 0
                            ? void 0
                            : P.width
                          : "100%",
                        height: hr
                          ? (O = o.props) === null || O === void 0
                            ? void 0
                            : O.height
                          : "100%",
                        flexShrink: 0,
                        ...Xr,
                      },
                      layoutId: o.props.layoutId ? o.props.layoutId + "-dupe-" + l : void 0,
                    },
                    (Cr = o.props) === null || Cr === void 0 ? void 0 : Cr.children
                  ),
                },
                l + "li" + _
              ),
            },
            l + "lg" + _
          );
        }),
      ];
  let Z = E.children + E.children * Math.round(E.parent / E.children),
    wr = b(null),
    yr = b(null),
    nr = b(0),
    vr = b(!1),
    Gr = te(),
    Kr = b(null),
    D = b(null);
  if (!W) {
    let l = ne(U);
    Tr
      ? Nr(() => {
          if (!(Gr || !Z || !p))
            return (
              (D.current = Kr.current.animate(
                { transform: [xr(0), xr(Z)] },
                { duration: (Math.abs(Z) / p) * 1e3, iterations: 1 / 0, easing: "linear" }
              )),
              () => D.current.cancel()
            );
        }, [tr, Z, p])
      : ae((o) => {
          if (!Z || Gr || Tr) return;
          (wr.current === null && (wr.current = o), (o = o - wr.current));
          let h = (yr.current === null ? 0 : o - yr.current) * (p / 1e3);
          (vr.current && (h *= tr),
            (nr.current += h),
            (nr.current = ie(0, Z, nr.current)),
            (yr.current = o),
            l && Hr.set(nr.current));
        });
  }
  let Ke = $ ? "to right" : "to bottom",
    Ur = G / 2,
    Ue = 100 - G / 2,
    De = oa(K, 0, Ur),
    Oe = 100 - K,
    Zr = `linear-gradient(${Ke}, rgba(0, 0, 0, ${Ar}) ${De}%, rgba(0, 0, 0, 1) ${Ur}%, rgba(0, 0, 0, 1) ${Ue}%, rgba(0, 0, 0, ${Ar}) ${Oe}%)`;
  return ir
    ? r("section", {
        style: {
          ...Ee,
          opacity: ur,
          WebkitMaskImage: X ? Zr : void 0,
          MozMaskImage: X ? Zr : void 0,
          maskImage: X ? Zr : void 0,
          overflow: q ? "visible" : "hidden",
          padding: Me,
        },
        ref: U,
        children: e(f.ul, {
          ref: Kr,
          style: {
            ...Ee,
            gap: L,
            top: j === "bottom" && Be(Z) ? -Z : void 0,
            left: j === "right" && Be(Z) ? -Z : void 0,
            placeItems: Pr,
            position: "relative",
            flexDirection: $ ? "row" : "column",
            ...cr,
            transform: Tr ? void 0 : Xe,
            willChange: W ? "auto" : "transform",
          },
          onMouseEnter: () => {
            ((vr.current = !0), D.current && (D.current.playbackRate = tr));
          },
          onMouseLeave: () => {
            ((vr.current = !1), D.current && (D.current.playbackRate = 1));
          },
          children: [Jr, br],
        }),
      })
    : e("section", {
        style: aa,
        children: [
          r("div", { style: ta, children: "\u2728" }),
          r("p", { style: ia, children: "Connect to Content" }),
          r("p", {
            style: na,
            children: "Add layers or components to infinitely loop on your page.",
          }),
        ],
      });
}
z.defaultProps = {
  gap: 10,
  padding: 10,
  sizingOptions: { widthType: !0, heightType: !0 },
  fadeOptions: { fadeContent: !0, overflow: !1, fadeWidth: 25, fadeAlpha: 0, fadeInset: 0 },
  direction: !0,
};
me(z, {
  slots: { type: c.Array, title: "Children", control: { type: c.ComponentInstance } },
  speed: {
    type: c.Number,
    title: "Speed",
    min: 0,
    max: 1e3,
    defaultValue: 100,
    unit: "%",
    displayStepper: !0,
    step: 5,
  },
  direction: {
    type: c.Enum,
    title: "Direction",
    options: ["left", "right", "top", "bottom"],
    optionIcons: ["direction-left", "direction-right", "direction-up", "direction-down"],
    optionTitles: ["Left", "Right", "Top", "Bottom"],
    defaultValue: "left",
    displaySegmentedControl: !0,
  },
  alignment: {
    type: c.Enum,
    title: "Align",
    options: ["flex-start", "center", "flex-end"],
    optionIcons: {
      direction: {
        right: ["align-top", "align-middle", "align-bottom"],
        left: ["align-top", "align-middle", "align-bottom"],
        top: ["align-left", "align-center", "align-right"],
        bottom: ["align-left", "align-center", "align-right"],
      },
    },
    defaultValue: "center",
    displaySegmentedControl: !0,
  },
  gap: { type: c.Number, title: "Gap" },
  padding: {
    title: "Padding",
    type: c.FusedNumber,
    toggleKey: "paddingPerSide",
    toggleTitles: ["Padding", "Padding per side"],
    valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
    valueLabels: ["T", "R", "B", "L"],
    min: 0,
  },
  sizingOptions: {
    type: c.Object,
    title: "Sizing",
    controls: {
      widthType: {
        type: c.Boolean,
        title: "Width",
        enabledTitle: "Auto",
        disabledTitle: "Stretch",
        defaultValue: !0,
      },
      heightType: {
        type: c.Boolean,
        title: "Height",
        enabledTitle: "Auto",
        disabledTitle: "Stretch",
        defaultValue: !0,
      },
    },
  },
  fadeOptions: {
    type: c.Object,
    title: "Clipping",
    controls: {
      fadeContent: { type: c.Boolean, title: "Fade", defaultValue: !0 },
      overflow: {
        type: c.Boolean,
        title: "Overflow",
        enabledTitle: "Show",
        disabledTitle: "Hide",
        defaultValue: !1,
        hidden(n) {
          return n.fadeContent === !0;
        },
      },
      fadeWidth: {
        type: c.Number,
        title: "Width",
        defaultValue: 25,
        min: 0,
        max: 100,
        unit: "%",
        hidden(n) {
          return n.fadeContent === !1;
        },
      },
      fadeInset: {
        type: c.Number,
        title: "Inset",
        defaultValue: 0,
        min: 0,
        max: 100,
        unit: "%",
        hidden(n) {
          return n.fadeContent === !1;
        },
      },
      fadeAlpha: {
        type: c.Number,
        title: "Opacity",
        defaultValue: 0,
        min: 0,
        max: 1,
        step: 0.05,
        hidden(n) {
          return n.fadeContent === !1;
        },
      },
    },
  },
  hoverFactor: {
    type: c.Number,
    title: "Hover",
    min: 0,
    max: 1,
    unit: "x",
    defaultValue: 1,
    step: 0.1,
    displayStepper: !0,
    description: "Slows down the speed while you are hovering.",
  },
});
var Ee = {
    display: "flex",
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    placeItems: "center",
    margin: 0,
    padding: 0,
    listStyleType: "none",
    textIndent: "none",
  },
  aa = {
    display: "flex",
    width: "100%",
    height: "100%",
    placeContent: "center",
    placeItems: "center",
    flexDirection: "column",
    color: "#96F",
    background: "rgba(136, 85, 255, 0.1)",
    fontSize: 11,
    overflow: "hidden",
    padding: "20px 20px 30px 20px",
  },
  ta = { fontSize: 32, marginBottom: 10 },
  ia = { margin: 0, marginBottom: 10, fontWeight: 600, textAlign: "center" },
  na = { margin: 0, opacity: 0.7, maxWidth: 150, lineHeight: 1.5, textAlign: "center" },
  oa = (n, s, L) => Math.min(Math.max(n, s), L),
  Be = (n) => typeof n == "number" && !isNaN(n);
var ma = w(ar),
  sa = w(Ir),
  la = w(H),
  fa = w(J),
  I = se(mr),
  da = w(qr),
  ca = w(Q),
  pa = w(m),
  ha = w(y),
  ga = w(z),
  xa = w(zr);
var ba = {
    Hw_19DBJP: "(max-width: 809px)",
    IhsBlG76f: "(min-width: 1200px)",
    JSHnK5hFh: "(min-width: 810px) and (max-width: 1199px)",
  },
  ua = () => typeof document < "u",
  Re = "framer-Zrdb3",
  wa = {
    Hw_19DBJP: "framer-v-1sysy87",
    IhsBlG76f: "framer-v-6t96s3",
    JSHnK5hFh: "framer-v-1cam4o5",
  },
  ya = { default: { duration: 0 } },
  Pe = { delay: 0.2, duration: 0.7, ease: [0, 0.89, 0.39, 1], type: "tween" },
  va = { opacity: 0, rotate: 0, scale: 1, transition: Pe, x: 0, y: 50 },
  k = (n, s) => `perspective(1200px) ${s}`,
  Wr = { opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, transition: Pe, x: 0, y: 0 },
  N = { opacity: 0.001, rotate: 0, scale: 1, x: 0, y: 50 },
  Ae = { delay: 0.4, duration: 0.7, ease: [0, 0.89, 0.39, 1], type: "tween" },
  Za = { opacity: 0, rotate: 0, scale: 1, transition: Ae, x: 0, y: 50 },
  Er = { opacity: 0.8, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, transition: Ae, x: 0, y: 0 },
  He = { delay: 0.6, duration: 0.7, ease: [0, 0.89, 0.39, 1], type: "tween" },
  Ca = { opacity: 0, rotate: 0, scale: 1, transition: He, x: 0, y: 50 },
  Br = { opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, transition: He, x: 0, y: 0 },
  ka = { delay: 0, duration: 3.5, ease: [0.44, 0, 0.56, 1], type: "tween" },
  _a = { opacity: 1, rotate: 0, scale: 1, x: 0, y: -30 },
  Na = (n, s) => `${s} rotate(-163deg)`,
  Sa = (n, s) => `translateY(-50%) ${s} rotate(-163deg)`,
  La = (n, s) => `${s} rotate(35deg)`,
  ja = { opacity: 1, rotate: 0, rotateX: 20, rotateY: 0, scale: 1, x: 0, y: 120 },
  Je = { delay: 0, duration: 1, ease: [0, 0.88, 0.23, 1.01], type: "tween" },
  qa = { opacity: 1, rotate: 0, rotateX: 20, rotateY: 0, scale: 1, transition: Je, x: 0, y: 120 },
  S = (n, s) => {
    if (!(!n || typeof n != "object")) return { ...n, alt: s };
  },
  za = { damping: 30, delay: 0, mass: 1, stiffness: 400, type: "spring" },
  V = { opacity: 0.3, rotate: 0, scale: 1, transition: za },
  Rr = Fr(),
  Ia = { Desktop: "IhsBlG76f", Phone: "Hw_19DBJP", Tablet: "JSHnK5hFh" },
  Fa = ({ height: n, id: s, width: L, ...M }) => {
    var F, T;
    return {
      ...M,
      variant:
        (T = (F = Ia[M.variant]) !== null && F !== void 0 ? F : M.variant) !== null && T !== void 0
          ? T
          : "IhsBlG76f",
    };
  },
  Ta = Dr(function (n, s) {
    let { activeLocale: L, setLocale: M } = oe(),
      { style: F, className: T, layoutId: Y, variant: lr, ...fr } = Fa(n);
    Vr(() => {
      let q = Fr(void 0, L);
      if (((document.title = q.title || ""), q.viewport)) {
        var G;
        (G = document.querySelector('meta[name="viewport"]')) === null ||
          G === void 0 ||
          G.setAttribute("content", q.viewport);
      }
      if (q.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((K) => K.startsWith("framer-body-"))
            .map((K) => document.body.classList.remove(K)),
          document.body.classList.add(`${q.bodyClassName}-framer-Zrdb3`),
          () => {
            document.body.classList.remove(`${q.bodyClassName}-framer-Zrdb3`);
          }
        );
    }, [void 0, L]);
    let [p, tr] = ce(lr, ba, !1),
      j = void 0,
      Pr = ya.default,
      dr = b(null),
      x = () => (p === "Hw_19DBJP" ? !ua() : !0),
      cr = Qr(),
      X = [be, We, je, Ne, Ie, Ce, ye];
    return (
      fe({}),
      r(de.Provider, {
        value: { primaryVariantId: "IhsBlG76f", variantClassNames: wa },
        children: e(er, {
          id: Y ?? cr,
          children: [
            e(f.div, {
              ...fr,
              className: jr(Re, ...X, "framer-6t96s3", T),
              ref: s ?? dr,
              style: { ...F },
              children: [
                e("div", {
                  className: "framer-4ope2u",
                  "data-framer-name": "Banner Top",
                  name: "Banner Top",
                  children: [
                    x() &&
                      r(i, {
                        __fromCanvasComponent: !0,
                        children: r(a, {
                          children: r("p", {
                            className: "framer-styles-preset-1dts917",
                            "data-styles-preset": "hgKudGhZ5",
                            style: { "--framer-text-color": "rgb(255, 255, 255)" },
                            children: "Kinopolis Automation Suite • Live-Saalüberwachung, Vorführ-Checks & Popcorn-Prognose",
                          }),
                        }),
                        className: "framer-13vje9k hidden-1sysy87",
                        verticalAlignment: "top",
                        withExternalLayout: !0,
                      }),
                    r(t, {
                      className: "framer-1gdtu54-container",
                      children: r(ar, {
                        bVToBLBTS: "Dashboard starten →",
                        height: "100%",
                        id: "GZQZyH_4n",
                        KqeH5xil_: "rgb(255, 255, 255)",
                        layoutId: "GZQZyH_4n",
                        MJWWsEY26: "/dashboard",
                        variant: "I27BjI0db",
                        width: "100%",
                      }),
                    }),
                  ],
                }),
                r(t, {
                  className: "framer-2o5tlt-container",
                  layoutScroll: !0,
                  children: r(u, {
                    breakpoint: p,
                    overrides: { Hw_19DBJP: { variant: "onuwv4s61" } },
                    children: r(Ir, {
                      height: "100%",
                      id: "pQv_dMl8J",
                      JU5116W8C: "PqgBulBPi",
                      layoutId: "pQv_dMl8J",
                      LylWg8UG8: 5,
                      oqrd6d5I6: "rgba(255, 255, 255, 0)",
                      style: { height: "100%", width: "100%" },
                      Tyvh_HtHO: "rgb(0, 0, 0)",
                      variant: "J7TtQthx_",
                      width: "100%",
                    }),
                  }),
                }),
                r("div", {
                  className: "framer-cx3k8l",
                  "data-framer-name": "Hero",
                  name: "Hero",
                  children: e("div", {
                    className: "framer-1mrulq4",
                    children: [
                      e("div", {
                        className: "framer-woqt8f",
                        children: [
                          r(t, {
                            className: "framer-1laqlns-container",
                            children: r(H, {
                              GmAhv_WVa: 1,
                              height: "100%",
                              hSgW9f2ir: "Version 2.0 is here!",
                              id: "qpysqZ1E6",
                              layoutId: "qpysqZ1E6",
                              p2xmGpLux: "Read more",
                              ToKaS18SW: !1,
                              variant: "Z2wjynIFK",
                              width: "100%",
                              Z69PPXt7v: !1,
                            }),
                          }),
                          r(u, {
                            breakpoint: p,
                            overrides: {
                              Hw_19DBJP: {
                                "data-framer-appear-id": "qy1290",
                                animate: d("animate", "qy1290", Wr, "1sysy87"),
                                initial: d("initial", "qy1290", N, "1sysy87"),
                                transformTemplate: C("qy1290", k),
                              },
                              JSHnK5hFh: {
                                "data-framer-appear-id": "hzklf3",
                                animate: d("animate", "hzklf3", Wr, "1cam4o5"),
                                initial: d("initial", "hzklf3", N, "1cam4o5"),
                                transformTemplate: C("hzklf3", k),
                              },
                            },
                            children: r(i, {
                              __fromCanvasComponent: !0,
                              animate: d("animate", "13fr10g", Wr, "6t96s3"),
                              children: r(a, {
                                children: r("h1", {
                                  className: "framer-styles-preset-187puy7",
                                  "data-styles-preset": "uUM82aRhQ",
                                  style: {
                                    "--framer-text-alignment": "left",
                                    "--framer-text-color": "rgb(0, 0, 0)",
                                  },
                                  children: r("span", {
                                    "data-text-fill": "true",
                                    style: {
                                      backgroundImage:
                                        "linear-gradient(179deg, rgb(0, 0, 0) 52.8294%, rgb(34, 64, 171) 100%)",
                                    },
                                    children: "Pathway to productivity",
                                  }),
                                }),
                              }),
                              className: "framer-13fr10g",
                              "data-framer-appear-id": "13fr10g",
                              exit: va,
                              initial: d("initial", "13fr10g", N, "6t96s3"),
                              transformTemplate: C("13fr10g", k),
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          }),
                          r(u, {
                            breakpoint: p,
                            overrides: {
                              Hw_19DBJP: {
                                "data-framer-appear-id": "1blx9a",
                                animate: d("animate", "1blx9a", Er, "1sysy87"),
                                initial: d("initial", "1blx9a", N, "1sysy87"),
                                transformTemplate: C("1blx9a", k),
                              },
                              JSHnK5hFh: {
                                "data-framer-appear-id": "1vrpmza",
                                animate: d("animate", "1vrpmza", Er, "1cam4o5"),
                                initial: d("initial", "1vrpmza", N, "1cam4o5"),
                                transformTemplate: C("1vrpmza", k),
                              },
                            },
                            children: r(i, {
                              __fromCanvasComponent: !0,
                              animate: d("animate", "1dqfp2f", Er, "6t96s3"),
                              children: r(a, {
                                children: r("p", {
                                  className: "framer-styles-preset-sxuwop",
                                  "data-styles-preset": "dGJYq65Lz",
                                  style: { "--framer-text-alignment": "left" },
                                  children:
                                    "Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your successes.",
                                }),
                              }),
                              className: "framer-1dqfp2f",
                              "data-framer-appear-id": "1dqfp2f",
                              exit: Za,
                              initial: d("initial", "1dqfp2f", N, "6t96s3"),
                              transformTemplate: C("1dqfp2f", k),
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          }),
                          r(u, {
                            breakpoint: p,
                            overrides: {
                              Hw_19DBJP: {
                                "data-framer-appear-id": "z0woqt",
                                animate: d("animate", "z0woqt", Br, "1sysy87"),
                                initial: d("initial", "z0woqt", N, "1sysy87"),
                                transformTemplate: C("z0woqt", k),
                              },
                              JSHnK5hFh: {
                                "data-framer-appear-id": "8aur8n",
                                animate: d("animate", "8aur8n", Br, "1cam4o5"),
                                initial: d("initial", "8aur8n", N, "1cam4o5"),
                                transformTemplate: C("8aur8n", k),
                              },
                            },
                            children: e(f.div, {
                              animate: d("animate", "wxlu6y", Br, "6t96s3"),
                              className: "framer-wxlu6y",
                              "data-framer-appear-id": "wxlu6y",
                              exit: Ca,
                              initial: d("initial", "wxlu6y", N, "6t96s3"),
                              transformTemplate: C("wxlu6y", k),
                              children: [
                                r(t, {
                                  className: "framer-qswvzz-container",
                                  children: r(J, {
                                    eszixBaDA: 10,
                                    height: "100%",
                                    id: "pdyaKsG2h",
                                    ik9I5qIGz: !1,
                                    J0LC2FGV8: !1,
                                    KJK1sV1GB: "Get started",
                                    layoutId: "pdyaKsG2h",
                                    RmkZjgJwi: "ArrowRight",
                                    UsLusPFRg: "rgb(0, 0, 0)",
                                    variant: "PqgBulBPi",
                                    width: "100%",
                                    yTZZaFOb3: "https://framer.link/ZQ2l2Kk",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-ubuo1q-container",
                                  children: r(ar, {
                                    bVToBLBTS: "Learn more",
                                    height: "100%",
                                    id: "fJnvEX01P",
                                    KqeH5xil_: "rgb(0, 0, 0)",
                                    layoutId: "fJnvEX01P",
                                    variant: "uvXz5tOXs",
                                    width: "100%",
                                  }),
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      e("div", {
                        className: "framer-11y2b10",
                        children: [
                          r(u, {
                            breakpoint: p,
                            overrides: {
                              Hw_19DBJP: {
                                background: {
                                  alt: "",
                                  fit: "fill",
                                  intrinsicHeight: 1500,
                                  intrinsicWidth: 1500,
                                  pixelHeight: 1500,
                                  pixelWidth: 1500,
                                  sizes: "min(min(100vw - 40px, 1200px), 600px)",
                                  src: "../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-144585.png",
                                  srcSet:
                                    "../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-1bb8f5.png 512w, ../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8.png 1024w, ../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-144585.png 1500w",
                                },
                              },
                              JSHnK5hFh: {
                                background: {
                                  alt: "",
                                  fit: "fill",
                                  intrinsicHeight: 1500,
                                  intrinsicWidth: 1500,
                                  pixelHeight: 1500,
                                  pixelWidth: 1500,
                                  sizes: "561px",
                                  src: "../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-144585.png",
                                  srcSet:
                                    "../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-1bb8f5.png 512w, ../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8.png 1024w, ../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-144585.png 1500w",
                                },
                                transformTemplate: Sa,
                              },
                            },
                            children: r(I, {
                              __framer__loop: _a,
                              __framer__loopEffectEnabled: !0,
                              __framer__loopRepeatDelay: 0,
                              __framer__loopRepeatType: "mirror",
                              __framer__loopTransition: ka,
                              __perspectiveFX: !1,
                              __targetOpacity: 1,
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes:
                                  "calc(min(max((min(max(100vw - 80px, 0px), 1200px) - 10px) / 2, 0px), 600px) + 147px)",
                                src: "../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-144585.png",
                                srcSet:
                                  "../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-1bb8f5.png 512w, ../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8.png 1024w, ../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-144585.png 1500w",
                              },
                              className: "framer-1f7jeqz",
                              "data-framer-name": "Shape Holo",
                              name: "Shape Holo",
                              transformTemplate: Na,
                            }),
                          }),
                          x() &&
                            r(u, {
                              breakpoint: p,
                              overrides: {
                                JSHnK5hFh: {
                                  background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "214.1243px",
                                    src: "../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw-181bc6.png",
                                    srcSet:
                                      "../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw.png 512w, ../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw-fe9e96.png 1024w, ../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw-181bc6.png 1500w",
                                  },
                                },
                              },
                              children: r(I, {
                                __framer__adjustPosition: !1,
                                __framer__offset: 0,
                                __framer__parallaxTransformEnabled: !0,
                                __framer__speed: 120,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                  alt: "",
                                  fit: "fill",
                                  intrinsicHeight: 1500,
                                  intrinsicWidth: 1500,
                                  pixelHeight: 1500,
                                  pixelWidth: 1500,
                                  sizes: "236px",
                                  src: "../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw-181bc6.png",
                                  srcSet:
                                    "../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw.png 512w, ../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw-fe9e96.png 1024w, ../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw-181bc6.png 1500w",
                                },
                                className: "framer-1of1rfa hidden-1sysy87",
                                "data-framer-name": "Shape Holo",
                                name: "Shape Holo",
                              }),
                            }),
                          x() &&
                            r(u, {
                              breakpoint: p,
                              overrides: {
                                JSHnK5hFh: {
                                  background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "220px",
                                    src: "../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE-ac239d.png",
                                    srcSet:
                                      "../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE.png 512w, ../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE-14ec06.png 1024w, ../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE-ac239d.png 1500w",
                                  },
                                },
                              },
                              children: r(I, {
                                __framer__adjustPosition: !1,
                                __framer__offset: 0,
                                __framer__parallaxTransformEnabled: !0,
                                __framer__speed: 120,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                  alt: "",
                                  fit: "fill",
                                  intrinsicHeight: 1500,
                                  intrinsicWidth: 1500,
                                  pixelHeight: 1500,
                                  pixelWidth: 1500,
                                  sizes: "243px",
                                  src: "../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE-ac239d.png",
                                  srcSet:
                                    "../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE.png 512w, ../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE-14ec06.png 1024w, ../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE-ac239d.png 1500w",
                                },
                                className: "framer-fzqp3k hidden-1sysy87",
                                "data-framer-name": "Shape Holo",
                                name: "Shape Holo",
                                transformTemplate: La,
                              }),
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                r("div", {
                  className: "framer-dg5e1x",
                  "data-framer-name": "Logo Strip",
                  name: "Logo Strip",
                  children: r(t, {
                    className: "framer-brdwsi-container",
                    children: r(qr, {
                      alignment: "center",
                      direction: "left",
                      fadeOptions: {
                        fadeAlpha: 0,
                        fadeContent: !0,
                        fadeInset: 0,
                        fadeWidth: 25,
                        overflow: !1,
                      },
                      gap: 20,
                      height: "100%",
                      hoverFactor: 1,
                      id: "BqXkMYnSD",
                      layoutId: "BqXkMYnSD",
                      padding: 0,
                      paddingBottom: 0,
                      paddingLeft: 0,
                      paddingPerSide: !1,
                      paddingRight: 0,
                      paddingTop: 0,
                      sizingOptions: { heightType: !0, widthType: !0 },
                      slots: [
                        e(f.div, {
                          className: "framer-1c3xe56",
                          "data-framer-name": "Logo Day",
                          name: "Logo Day",
                          children: [
                            e(f.div, {
                              className: "framer-mhhymn",
                              children: [
                                r(g, {
                                  className: "framer-1d9uxb5",
                                  "data-framer-name": "graphic",
                                  layout: "position",
                                  name: "graphic",
                                  opacity: 1,
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss1475588813_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 6.5 L 13 0 L 26 6.5 L 26 19.5 L 13 26 L 13 19.5 L 0 26 L 0 19.5 L 13 13 L 0 6.5 L 0 0 Z M 13 6.5 L 13 19.5 L 26 13 Z" fill="rgb(NaN,NaN,NaN)"></path></g></svg>',
                                  svgContentId: 1475588813,
                                  withExternalLayout: !0,
                                }),
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("p", {
                                      style: {
                                        "--font-selector": "RlM7U2F0b3NoaS1ib2xk",
                                        "--framer-font-family":
                                          '"Satoshi", "Satoshi Placeholder", sans-serif',
                                        "--framer-font-weight": "700",
                                        "--framer-letter-spacing": "0px",
                                        "--framer-text-alignment": "left",
                                      },
                                      children: "Acme Corp",
                                    }),
                                  }),
                                  className: "framer-aunv8c",
                                  fonts: ["FS;Satoshi-bold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            e(f.div, {
                              className: "framer-ht6ktm",
                              children: [
                                r(g, {
                                  className: "framer-1ulmtb3",
                                  "data-framer-name": "graphic",
                                  layout: "position",
                                  name: "graphic",
                                  opacity: 1,
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss1944354112_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 26 C 12.142 26 11.352 25.786 10.63 25.357 C 9.931 24.951 9.366 24.398 8.938 23.698 C 8.531 22.976 8.328 22.186 8.328 21.328 C 8.328 20.245 8.576 19.342 9.073 18.62 C 9.57 17.898 10.337 17.051 11.375 16.081 C 12.142 15.381 12.526 14.715 12.526 14.083 L 12.526 13.474 L 11.917 13.474 C 11.217 13.474 10.258 14.174 9.039 15.573 C 7.843 16.972 6.387 17.672 4.672 17.672 C 3.814 17.672 3.024 17.469 2.302 17.063 C 1.602 16.634 1.038 16.069 0.609 15.37 C 0.203 14.648 0 13.858 0 13 C 0 12.142 0.203 11.364 0.609 10.664 C 1.038 9.942 1.602 9.378 2.302 8.971 C 3.024 8.542 3.814 8.328 4.672 8.328 C 6.365 8.328 7.809 9.017 9.005 10.393 C 10.201 11.77 11.172 12.458 11.917 12.458 L 12.526 12.458 L 12.526 11.917 C 12.526 11.285 12.142 10.619 11.375 9.919 L 10.596 9.208 C 10.032 8.689 9.513 8.069 9.039 7.346 C 8.565 6.602 8.328 5.71 8.328 4.672 C 8.328 3.814 8.531 3.036 8.938 2.336 C 9.366 1.614 9.931 1.049 10.63 0.643 C 11.353 0.214 12.143 0 13 0 C 13.858 0 14.636 0.214 15.336 0.643 C 16.058 1.072 16.622 1.636 17.029 2.336 C 17.457 3.036 17.672 3.814 17.672 4.672 C 17.672 6.365 16.983 7.809 15.607 9.005 C 14.23 10.201 13.542 11.172 13.542 11.917 L 13.542 12.458 L 14.083 12.458 C 14.851 12.458 15.821 11.77 16.995 10.393 C 18.146 9.017 19.59 8.328 21.328 8.328 C 22.186 8.328 22.964 8.543 23.664 8.971 C 24.386 9.378 24.951 9.931 25.357 10.63 C 25.786 11.33 26 12.12 26 13 C 26 13.858 25.786 14.648 25.357 15.37 C 24.951 16.069 24.386 16.634 23.664 17.063 C 22.964 17.469 22.186 17.672 21.328 17.672 C 20.267 17.672 19.353 17.412 18.586 16.893 C 17.841 16.374 17.006 15.618 16.081 14.625 C 15.381 13.858 14.715 13.474 14.083 13.474 L 13.542 13.474 L 13.542 14.083 C 13.542 14.918 14.23 15.889 15.607 16.995 C 16.983 18.101 17.672 19.545 17.672 21.328 C 17.672 22.186 17.457 22.976 17.029 23.698 C 16.622 24.398 16.069 24.951 15.37 25.357 C 14.67 25.786 13.88 26 13 26 Z" fill="rgb(NaN,NaN,NaN)"></path></g></svg>',
                                  svgContentId: 1944354112,
                                  withExternalLayout: !0,
                                }),
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("p", {
                                      style: {
                                        "--font-selector": "RlM7U3dpdHplci1ib2xk",
                                        "--framer-font-family":
                                          '"Switzer", "Switzer Placeholder", sans-serif',
                                        "--framer-font-weight": "700",
                                        "--framer-letter-spacing": "0px",
                                        "--framer-text-alignment": "left",
                                      },
                                      children: "Quantum",
                                    }),
                                  }),
                                  className: "framer-1v6x3a4",
                                  fonts: ["FS;Switzer-bold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            e(f.div, {
                              className: "framer-1han8ud",
                              children: [
                                r(g, {
                                  className: "framer-12vlngi",
                                  "data-framer-name": "graphic",
                                  layout: "position",
                                  name: "graphic",
                                  opacity: 1,
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22"><g id="ss3557942534_1"><path d="M 0 0 L 22 0 L 22 22 L 0 22 Z" fill="transparent"></path><path d="M 11.043 10.104 C 10.587 4.448 5.852 0 0.079 0 C 0.079 5.747 4.485 10.464 10.104 10.957 C 4.448 11.413 0 16.148 0 21.921 C 5.747 21.921 10.464 17.515 10.957 11.896 C 11.413 17.552 16.148 22 21.921 22 C 21.921 16.253 17.515 11.536 11.896 11.043 C 17.552 10.587 22 5.852 22 0.079 C 16.253 0.079 11.536 4.485 11.043 10.104 Z M 11 11 L 11 11 L 11 11 L 11 11 L 11 11 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                  svgContentId: 3557942534,
                                  withExternalLayout: !0,
                                }),
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("p", {
                                      style: {
                                        "--font-selector": "RlM7Q2hpbGxheC1zZW1pYm9sZA==",
                                        "--framer-font-family":
                                          '"Chillax", "Chillax Placeholder", sans-serif',
                                        "--framer-font-weight": "600",
                                        "--framer-letter-spacing": "-0.4px",
                                        "--framer-text-alignment": "left",
                                      },
                                      children: "Echo Valley",
                                    }),
                                  }),
                                  className: "framer-157slf4",
                                  fonts: ["FS;Chillax-semibold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            r(f.div, {
                              className: "framer-noqn37",
                              children: r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    style: {
                                      "--font-selector": "RlM7UGFuY2hhbmctYm9sZA==",
                                      "--framer-font-family":
                                        '"Panchang", "Panchang Placeholder", sans-serif',
                                      "--framer-font-weight": "700",
                                      "--framer-letter-spacing": "0px",
                                      "--framer-text-alignment": "left",
                                    },
                                    children: "PULSE",
                                  }),
                                }),
                                className: "framer-udyub8",
                                fonts: ["FS;Panchang-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            }),
                            e(f.div, {
                              className: "framer-18i8gm7",
                              children: [
                                r(g, {
                                  className: "framer-1mg4ciy",
                                  "data-framer-name": "graphic",
                                  layout: "position",
                                  name: "graphic",
                                  opacity: 1,
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g transform="translate(-0 -0)" id="ss2707685231_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 20.849 C 2.924 28.433 -4.433 21.076 3.151 12 C -4.433 2.924 2.924 -4.433 12 3.151 C 21.075 -4.433 28.433 2.924 20.849 12 C 28.433 21.069 21.075 28.433 12 20.849 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                  svgContentId: 2707685231,
                                  withExternalLayout: !0,
                                }),
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("p", {
                                      style: {
                                        "--font-selector": "RlM7Q2hpbGxheC1ib2xk",
                                        "--framer-font-family":
                                          '"Chillax", "Chillax Placeholder", sans-serif',
                                        "--framer-font-weight": "700",
                                        "--framer-letter-spacing": "0px",
                                        "--framer-text-alignment": "left",
                                      },
                                      children: "APEX",
                                    }),
                                  }),
                                  className: "framer-1gnogs9",
                                  fonts: ["FS;Chillax-bold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            e(f.div, {
                              className: "framer-1bidf82",
                              children: [
                                r(g, {
                                  className: "framer-vwucm1",
                                  "data-framer-name": "graphic",
                                  layout: "position",
                                  name: "graphic",
                                  opacity: 1,
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g id="ss3193219635_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 12 C 12 12 13.5 7.983 13.5 5.143 C 13.5 2.302 12.828 0 12 0 C 11.172 0 10.5 2.303 10.5 5.143 C 10.5 7.983 12 12 12 12 Z M 12 12 C 12 12 13.78 15.901 15.788 17.909 C 17.796 19.918 19.899 21.071 20.485 20.485 C 21.071 19.899 19.918 17.796 17.909 15.788 C 15.901 13.78 12 12 12 12 Z M 12 12 C 12 12 16.017 10.5 18.857 10.5 C 21.697 10.5 24 11.172 24 12 C 24 12.828 21.697 13.5 18.857 13.5 C 16.017 13.5 12 12 12 12 Z M 12 12 C 12 12 8.099 13.78 6.091 15.788 C 4.082 17.796 2.929 19.899 3.515 20.485 C 4.101 21.071 6.204 19.918 8.212 17.909 C 10.22 15.901 12 12 12 12 Z M 12 12 C 12.003 12.009 13.5 16.02 13.5 18.857 C 13.5 21.697 12.828 24 12 24 C 11.172 24 10.5 21.697 10.5 18.857 C 10.5 16.017 12 12 12 12 Z M 12 12 C 12 12 7.983 10.5 5.143 10.5 C 2.302 10.5 0 11.172 0 12 C 0 12.828 2.303 13.5 5.143 13.5 C 7.983 13.5 12 12 12 12 Z M 12 12 C 12 12 15.901 10.22 17.909 8.212 C 19.918 6.204 21.071 4.101 20.485 3.515 C 19.899 2.929 17.796 4.082 15.788 6.091 C 13.78 8.099 12 12 12 12 Z M 8.212 6.091 C 10.22 8.099 12 12 12 12 C 12 12 8.099 10.22 6.091 8.212 C 4.082 6.204 2.929 4.1 3.515 3.515 C 4.101 2.929 6.204 4.082 8.212 6.091 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                  svgContentId: 3193219635,
                                  withExternalLayout: !0,
                                }),
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("p", {
                                      style: {
                                        "--font-selector": "RlM7U2F0b3NoaS1ib2xk",
                                        "--framer-font-family":
                                          '"Satoshi", "Satoshi Placeholder", sans-serif',
                                        "--framer-font-weight": "700",
                                        "--framer-letter-spacing": "0px",
                                        "--framer-text-alignment": "left",
                                      },
                                      children: "Celestial",
                                    }),
                                  }),
                                  className: "framer-1q51diu",
                                  fonts: ["FS;Satoshi-bold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                      speed: 30,
                      style: { height: "100%", maxWidth: "100%", width: "100%" },
                      width: "100%",
                    }),
                  }),
                }),
                e("div", {
                  className: "framer-q09ih6",
                  "data-framer-name": "Features Product",
                  name: "Features Product",
                  children: [
                    e("div", {
                      className: "framer-1c1ypq0",
                      children: [
                        r(t, {
                          className: "framer-tczmqq-container",
                          children: r(H, {
                            GmAhv_WVa: 1,
                            height: "100%",
                            hSgW9f2ir: "Boost your productivity",
                            id: "mTmknDgpL",
                            layoutId: "mTmknDgpL",
                            p2xmGpLux: "Read more",
                            ToKaS18SW: !1,
                            variant: "Z2wjynIFK",
                            width: "100%",
                            Z69PPXt7v: !1,
                          }),
                        }),
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("h2", {
                              className: "framer-styles-preset-4m6e0d",
                              "data-styles-preset": "Bgl_uNKYX",
                              children: "A more effective way to track progress",
                            }),
                          }),
                          className: "framer-qvtamp",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("p", {
                              className: "framer-styles-preset-sxuwop",
                              "data-styles-preset": "dGJYq65Lz",
                              style: { "--framer-text-alignment": "center" },
                              children:
                                "Effortlessly turn your ideas into a fully functional, responsive, no-code SaaS website in just minutes with the set of free components for Framer.",
                            }),
                          }),
                          className: "framer-19akkxu",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                      ],
                    }),
                    e("div", {
                      className: "framer-5dhk5c",
                      "data-framer-name": "Wrapper",
                      name: "Wrapper",
                      children: [
                        r(u, {
                          breakpoint: p,
                          overrides: {
                            Hw_19DBJP: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1414,
                                intrinsicWidth: 2280,
                                pixelHeight: 1414,
                                pixelWidth: 2280,
                                sizes: "min(100vw - 40px, 1200px)",
                                src: "../../assets/images/jAdX8uaR6A5HyXv1vyMU2C0Ufw-240085.png",
                                srcSet:
                                  "../../assets/images/jAdX8uaR6A5HyXv1vyMU2C0Ufw-225f9e.png 512w, ../../assets/images/jAdX8uaR6A5HyXv1vyMU2C0Ufw-da59da.png 1024w, ../../assets/images/jAdX8uaR6A5HyXv1vyMU2C0Ufw.png 2048w, ../../assets/images/jAdX8uaR6A5HyXv1vyMU2C0Ufw-240085.png 2280w",
                              },
                            },
                          },
                          children: r(I, {
                            __framer__animate: { transition: Je },
                            __framer__animateOnce: !1,
                            __framer__enter: ja,
                            __framer__exit: qa,
                            __framer__styleAppearEffectEnabled: !0,
                            __framer__threshold: 0,
                            __perspectiveFX: !1,
                            __targetOpacity: 1,
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1414,
                              intrinsicWidth: 2280,
                              loading: "lazy",
                              pixelHeight: 1414,
                              pixelWidth: 2280,
                              sizes: "min(100vw - 80px, 1200px)",
                              src: "../../assets/images/jAdX8uaR6A5HyXv1vyMU2C0Ufw-240085.png",
                              srcSet:
                                "../../assets/images/jAdX8uaR6A5HyXv1vyMU2C0Ufw-225f9e.png 512w, ../../assets/images/jAdX8uaR6A5HyXv1vyMU2C0Ufw-da59da.png 1024w, ../../assets/images/jAdX8uaR6A5HyXv1vyMU2C0Ufw.png 2048w, ../../assets/images/jAdX8uaR6A5HyXv1vyMU2C0Ufw-240085.png 2280w",
                            },
                            className: "framer-19nvram",
                            "data-border": !0,
                            "data-framer-name": "App_2x",
                            name: "App_2x",
                            transformTemplate: k,
                          }),
                        }),
                        x() &&
                          r(I, {
                            __framer__adjustPosition: !0,
                            __framer__offset: 0,
                            __framer__parallaxTransformEnabled: !0,
                            __framer__speed: 110,
                            __perspectiveFX: !1,
                            __targetOpacity: 1,
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "252px",
                              src: "../../assets/images/mIeiiFyiLX8guUCulp8nzYRde7s-aacfcd.png",
                              srcSet:
                                "../../assets/images/mIeiiFyiLX8guUCulp8nzYRde7s.png 512w, ../../assets/images/mIeiiFyiLX8guUCulp8nzYRde7s-b170eb.png 1024w, ../../assets/images/mIeiiFyiLX8guUCulp8nzYRde7s-aacfcd.png 1500w",
                            },
                            className: "framer-1gjb52s hidden-1sysy87",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        x() &&
                          r(I, {
                            __framer__adjustPosition: !0,
                            __framer__offset: 0,
                            __framer__parallaxTransformEnabled: !0,
                            __framer__speed: 110,
                            __perspectiveFX: !1,
                            __targetOpacity: 1,
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "252px",
                              src: "../../assets/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg-ae16e1.png",
                              srcSet:
                                "../../assets/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg.png 512w, ../../assets/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg-b2299c.png 1024w, ../../assets/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg-ae16e1.png 1500w",
                            },
                            className: "framer-pnoogb hidden-1sysy87",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                      ],
                    }),
                    e("div", {
                      className: "framer-15swlg5",
                      children: [
                        r(t, {
                          className: "framer-11tfarj-container",
                          children: r(Q, {
                            ET3uJSa1F: "Leaf",
                            height: "100%",
                            id: "QYwoe1yxa",
                            iHqIagJOF: "Learn more",
                            layoutId: "QYwoe1yxa",
                            Pzs4GcH4x: "rgb(0, 0, 0)",
                            style: { width: "100%" },
                            width: "100%",
                            Z6hiuC6BW: "Integration ecosystem",
                            ZdZM7np2V: !0,
                            ZfP85W1Qa: "Track your progress and motivate your efforts everyday.",
                          }),
                        }),
                        r(t, {
                          className: "framer-18clc0z-container",
                          children: r(Q, {
                            ET3uJSa1F: "Target",
                            height: "100%",
                            id: "UyDQg0nUy",
                            iHqIagJOF: "Learn more",
                            layoutId: "UyDQg0nUy",
                            Pzs4GcH4x: "rgb(0, 0, 0)",
                            style: { width: "100%" },
                            width: "100%",
                            Z6hiuC6BW: "Goal setting and tracking",
                            ZdZM7np2V: !0,
                            ZfP85W1Qa: "Set and track goals with manageable task breakdowns.",
                          }),
                        }),
                        r(t, {
                          className: "framer-pvpjnr-container",
                          children: r(Q, {
                            ET3uJSa1F: "Lock",
                            height: "100%",
                            id: "ikcl932d7",
                            iHqIagJOF: "Learn more",
                            layoutId: "ikcl932d7",
                            Pzs4GcH4x: "rgb(0, 0, 0)",
                            style: { width: "100%" },
                            width: "100%",
                            Z6hiuC6BW: "Secure data encryption",
                            ZdZM7np2V: !0,
                            ZfP85W1Qa: "Ensure your data\u2019s safety with top-tier encryption.",
                          }),
                        }),
                        r(t, {
                          className: "framer-pmhhkg-container",
                          children: r(Q, {
                            ET3uJSa1F: "Bell",
                            height: "100%",
                            id: "JDr42gMMp",
                            iHqIagJOF: "Learn more",
                            layoutId: "JDr42gMMp",
                            Pzs4GcH4x: "rgb(0, 0, 0)",
                            style: { width: "100%" },
                            width: "100%",
                            Z6hiuC6BW: "Customizable notifications",
                            ZdZM7np2V: !0,
                            ZfP85W1Qa: "Get alerts on tasks and deadlines that matter most.",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                e("div", {
                  className: "framer-4ycmxk",
                  "data-framer-name": "Features",
                  name: "Features",
                  children: [
                    e("div", {
                      className: "framer-1h02tdf",
                      children: [
                        r(t, {
                          className: "framer-1qbjvbr-container",
                          children: r(H, {
                            GmAhv_WVa: 1,
                            height: "100%",
                            hSgW9f2ir: "Everything you need",
                            id: "kzO5HAo0P",
                            layoutId: "kzO5HAo0P",
                            p2xmGpLux: "Read more",
                            ToKaS18SW: !1,
                            variant: "Z2wjynIFK",
                            width: "100%",
                            Z69PPXt7v: !1,
                          }),
                        }),
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("h2", {
                              className: "framer-styles-preset-4m6e0d",
                              "data-styles-preset": "Bgl_uNKYX",
                              children: "Streamlined for easy management",
                            }),
                          }),
                          className: "framer-1sqkc6y",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("p", {
                              className: "framer-styles-preset-sxuwop",
                              "data-styles-preset": "dGJYq65Lz",
                              style: { "--framer-text-alignment": "center" },
                              children:
                                "Enjoy customizable lists, team work tools, and smart tracking all in one place. Set tasks, get reminders, and see your progress simply and quickly. ",
                            }),
                          }),
                          className: "framer-19o51up",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                      ],
                    }),
                    e("div", {
                      className: "framer-hjwtzt",
                      children: [
                        e("div", {
                          className: "framer-acg8fm",
                          "data-border": !0,
                          children: [
                            r("div", {
                              className: "framer-1f54332",
                              children: r(u, {
                                breakpoint: p,
                                overrides: {
                                  Hw_19DBJP: {
                                    background: {
                                      alt: "",
                                      fit: "fill",
                                      intrinsicHeight: 1500,
                                      intrinsicWidth: 1500,
                                      pixelHeight: 1500,
                                      pixelWidth: 1500,
                                      sizes: "317px",
                                      src: "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png",
                                      srcSet:
                                        "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4.png 512w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-98c1fc.png 1024w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png 1500w",
                                    },
                                  },
                                },
                                children: r(mr, {
                                  background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    loading: "lazy",
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "317px",
                                    src: "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png",
                                    srcSet:
                                      "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4.png 512w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-98c1fc.png 1024w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png 1500w",
                                  },
                                  className: "framer-hljstx",
                                  "data-framer-name": "cube",
                                  name: "cube",
                                }),
                              }),
                            }),
                            e("div", {
                              className: "framer-12dg66y",
                              children: [
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("h4", {
                                      className: "framer-styles-preset-1cx401f",
                                      "data-styles-preset": "UkYay4GtR",
                                      children: "Integration ecosystem",
                                    }),
                                  }),
                                  className: "framer-tp20y0",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("p", {
                                      className: "framer-styles-preset-1cc56zh",
                                      "data-styles-preset": "PWn1k_MD2",
                                      style: { "--framer-text-alignment": "center" },
                                      children:
                                        "Enhance your productivity by connecting with your favorite tools, keeping all your essentials in one place.",
                                    }),
                                  }),
                                  className: "framer-14wk7eh",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                          ],
                        }),
                        e("div", {
                          className: "framer-1pw6z08",
                          "data-border": !0,
                          children: [
                            r("div", {
                              className: "framer-1dd0hkt",
                              children: r(u, {
                                breakpoint: p,
                                overrides: {
                                  Hw_19DBJP: {
                                    background: {
                                      alt: "",
                                      fit: "fill",
                                      intrinsicHeight: 1500,
                                      intrinsicWidth: 1500,
                                      pixelHeight: 1500,
                                      pixelWidth: 1500,
                                      sizes: "317px",
                                      src: "../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-ccdb64.png",
                                      srcSet:
                                        "../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws.png 512w, ../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-83763e.png 1024w, ../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-ccdb64.png 1500w",
                                    },
                                  },
                                },
                                children: r(mr, {
                                  background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    loading: "lazy",
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "317px",
                                    src: "../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-ccdb64.png",
                                    srcSet:
                                      "../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws.png 512w, ../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-83763e.png 1024w, ../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-ccdb64.png 1500w",
                                  },
                                  className: "framer-1vwy77n",
                                  "data-framer-name": "star",
                                  name: "star",
                                }),
                              }),
                            }),
                            e("div", {
                              className: "framer-1g75qq1",
                              children: [
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("h4", {
                                      className: "framer-styles-preset-1cx401f",
                                      "data-styles-preset": "UkYay4GtR",
                                      children: "Goal setting and tracking",
                                    }),
                                  }),
                                  className: "framer-ezsv8l",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("p", {
                                      className: "framer-styles-preset-1cc56zh",
                                      "data-styles-preset": "PWn1k_MD2",
                                      style: { "--framer-text-alignment": "center" },
                                      children:
                                        "Define and track your goals, breaking down objectives into achievable tasks to keep your targets in sight.",
                                    }),
                                  }),
                                  className: "framer-1ipewts",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                e("div", {
                  className: "framer-3ek2ar",
                  "data-framer-name": "Pricing",
                  name: "Pricing",
                  children: [
                    e("div", {
                      className: "framer-1i4qayq",
                      children: [
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("h2", {
                              className: "framer-styles-preset-4m6e0d",
                              "data-styles-preset": "Bgl_uNKYX",
                              children: "Pricing",
                            }),
                          }),
                          className: "framer-3sqizy",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("p", {
                              className: "framer-styles-preset-sxuwop",
                              "data-styles-preset": "dGJYq65Lz",
                              style: { "--framer-text-alignment": "center" },
                              children:
                                "Free forever. Upgrade for unlimited tasks, better security, and exclusive features.",
                            }),
                          }),
                          className: "framer-kw4ubu",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                      ],
                    }),
                    e("div", {
                      className: "framer-1r3nvrv",
                      children: [
                        e("div", {
                          className: "framer-1xfoud",
                          "data-border": !0,
                          children: [
                            r(i, {
                              __fromCanvasComponent: !0,
                              children: r(a, {
                                children: r("h5", {
                                  className: "framer-styles-preset-13rf66x",
                                  "data-styles-preset": "GPDKd6Ic6",
                                  children: "Free",
                                }),
                              }),
                              className: "framer-17pqp7d",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            e("div", {
                              className: "framer-1utt5jd",
                              children: [
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("h2", {
                                      className: "framer-styles-preset-4m6e0d",
                                      "data-styles-preset": "Bgl_uNKYX",
                                      children: "$0",
                                    }),
                                  }),
                                  className: "framer-1r0v4rz",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("h5", {
                                      className: "framer-styles-preset-13rf66x",
                                      "data-styles-preset": "GPDKd6Ic6",
                                      children: "/month",
                                    }),
                                  }),
                                  className: "framer-nxhcxe",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            r(t, {
                              className: "framer-1x6a63l-container",
                              children: r(J, {
                                eszixBaDA: 10,
                                height: "100%",
                                id: "bwsUd__yU",
                                ik9I5qIGz: !1,
                                J0LC2FGV8: !1,
                                KJK1sV1GB: "Get started for free",
                                layoutId: "bwsUd__yU",
                                RmkZjgJwi: "ArrowRight",
                                style: { width: "100%" },
                                UsLusPFRg: "rgb(0, 0, 0)",
                                variant: "PqgBulBPi",
                                width: "100%",
                              }),
                            }),
                            e("div", {
                              className: "framer-xzfbyn",
                              children: [
                                r(t, {
                                  className: "framer-1b502r4-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "nlTaVIloN",
                                    jTcf_EQ_W: "Up to 5 project members",
                                    layoutId: "nlTaVIloN",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-1xwuato-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "XlCeGT5tB",
                                    jTcf_EQ_W: "Unlimited tasks and projects",
                                    layoutId: "XlCeGT5tB",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-ikpzww-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "PkYcdICDV",
                                    jTcf_EQ_W: "2GB storage",
                                    layoutId: "PkYcdICDV",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-1nzjae9-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "xOEYX2nfW",
                                    jTcf_EQ_W: "Integrations",
                                    layoutId: "xOEYX2nfW",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-1p0itr-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "MYvF_cXod",
                                    jTcf_EQ_W: "Basic support",
                                    layoutId: "MYvF_cXod",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                        e("div", {
                          className: "framer-rttdj0",
                          "data-border": !0,
                          children: [
                            e("div", {
                              className: "framer-1x5rbd",
                              children: [
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("h5", {
                                      className: "framer-styles-preset-13rf66x",
                                      "data-styles-preset": "GPDKd6Ic6",
                                      style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                      children: "Pro",
                                    }),
                                  }),
                                  className: "framer-43pc7z",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                r(t, {
                                  className: "framer-hwsf3f-container",
                                  children: r(H, {
                                    GmAhv_WVa: 1,
                                    height: "100%",
                                    hSgW9f2ir: "Most popular",
                                    id: "p0Ln7ezJS",
                                    layoutId: "p0Ln7ezJS",
                                    p2xmGpLux: "Read more",
                                    ToKaS18SW: !1,
                                    variant: "Nq1uWl93W",
                                    width: "100%",
                                    Z69PPXt7v: !0,
                                  }),
                                }),
                              ],
                            }),
                            e("div", {
                              className: "framer-gq7wpd",
                              children: [
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("h2", {
                                      className: "framer-styles-preset-4m6e0d",
                                      "data-styles-preset": "Bgl_uNKYX",
                                      style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                      children: "$9",
                                    }),
                                  }),
                                  className: "framer-8ahn3w",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("h5", {
                                      className: "framer-styles-preset-13rf66x",
                                      "data-styles-preset": "GPDKd6Ic6",
                                      style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                      children: "/month",
                                    }),
                                  }),
                                  className: "framer-ebs76m",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            r(t, {
                              className: "framer-i4an7y-container",
                              children: r(J, {
                                eszixBaDA: 10,
                                height: "100%",
                                id: "kfKfNAxcm",
                                ik9I5qIGz: !1,
                                J0LC2FGV8: !1,
                                KJK1sV1GB: "Sign up now",
                                layoutId: "kfKfNAxcm",
                                RmkZjgJwi: "ArrowRight",
                                style: { width: "100%" },
                                UsLusPFRg: "rgb(0, 0, 0)",
                                variant: "zb8n5Cev9",
                                width: "100%",
                              }),
                            }),
                            e("div", {
                              className: "framer-1k8g8t",
                              children: [
                                r(t, {
                                  className: "framer-kd89ir-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "zArhObp7u",
                                    jTcf_EQ_W: "Up to 50 project members",
                                    layoutId: "zArhObp7u",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(255, 255, 255)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-gz8zo3-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "i1VZIESPV",
                                    jTcf_EQ_W: "Unlimited tasks and projects",
                                    layoutId: "i1VZIESPV",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(255, 255, 255)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-13e2w58-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "Sa63eVG3I",
                                    jTcf_EQ_W: "50GB storage",
                                    layoutId: "Sa63eVG3I",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(255, 255, 255)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-dc76z5-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "UBohRpNuW",
                                    jTcf_EQ_W: "Integrations",
                                    layoutId: "UBohRpNuW",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(255, 255, 255)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-i0df75-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "ucHdUUtHd",
                                    jTcf_EQ_W: "Priority support",
                                    layoutId: "ucHdUUtHd",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(255, 255, 255)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-v4a3mw-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "BL26jOEIs",
                                    jTcf_EQ_W: "Advanced analytics",
                                    layoutId: "BL26jOEIs",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(255, 255, 255)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-47cr9t-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "WtgD8MWC0",
                                    jTcf_EQ_W: "Export capabilities",
                                    layoutId: "WtgD8MWC0",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(255, 255, 255)",
                                    width: "100%",
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                        e("div", {
                          className: "framer-1kpsy9i",
                          "data-border": !0,
                          children: [
                            r(i, {
                              __fromCanvasComponent: !0,
                              children: r(a, {
                                children: r("h5", {
                                  className: "framer-styles-preset-13rf66x",
                                  "data-styles-preset": "GPDKd6Ic6",
                                  children: "Business",
                                }),
                              }),
                              className: "framer-b19vqz",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            e("div", {
                              className: "framer-3a6ypp",
                              children: [
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("h2", {
                                      className: "framer-styles-preset-4m6e0d",
                                      "data-styles-preset": "Bgl_uNKYX",
                                      children: "$19",
                                    }),
                                  }),
                                  className: "framer-1kj4fnt",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                r(i, {
                                  __fromCanvasComponent: !0,
                                  children: r(a, {
                                    children: r("h5", {
                                      className: "framer-styles-preset-13rf66x",
                                      "data-styles-preset": "GPDKd6Ic6",
                                      children: "/month",
                                    }),
                                  }),
                                  className: "framer-1rayqi8",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            r(t, {
                              className: "framer-f7shzs-container",
                              children: r(J, {
                                eszixBaDA: 10,
                                height: "100%",
                                id: "P9_doeQeN",
                                ik9I5qIGz: !1,
                                J0LC2FGV8: !1,
                                KJK1sV1GB: "Sign up now",
                                layoutId: "P9_doeQeN",
                                RmkZjgJwi: "ArrowRight",
                                style: { width: "100%" },
                                UsLusPFRg: "rgb(0, 0, 0)",
                                variant: "PqgBulBPi",
                                width: "100%",
                              }),
                            }),
                            e("div", {
                              className: "framer-1hjtlqe",
                              children: [
                                r(t, {
                                  className: "framer-10e0826-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "Pr1q5fCea",
                                    jTcf_EQ_W: "Unlimited project members",
                                    layoutId: "Pr1q5fCea",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-19y6094-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "w35fccrCz",
                                    jTcf_EQ_W: "Unlimited tasks and projects",
                                    layoutId: "w35fccrCz",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-my4e6i-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "MdLdKGcGh",
                                    jTcf_EQ_W: "200GB storage",
                                    layoutId: "MdLdKGcGh",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-35vlxj-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "jTRXfDZQg",
                                    jTcf_EQ_W: "Integrations",
                                    layoutId: "jTRXfDZQg",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-17xoy27-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "Wc_k768jW",
                                    jTcf_EQ_W: "Dedicated account manager",
                                    layoutId: "Wc_k768jW",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-kqdmur-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "ejsaN9pgD",
                                    jTcf_EQ_W: "Custom fields",
                                    layoutId: "ejsaN9pgD",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-qx4kro-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "SnF2MmwFJ",
                                    jTcf_EQ_W: "Advanced analytics",
                                    layoutId: "SnF2MmwFJ",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-1w95i6b-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "P7hXd9doh",
                                    jTcf_EQ_W: "Export capabilities",
                                    layoutId: "P7hXd9doh",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-qqugi3-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "gCQjHDQqc",
                                    jTcf_EQ_W: "API access",
                                    layoutId: "gCQjHDQqc",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
                                  }),
                                }),
                                r(t, {
                                  className: "framer-tua2m7-container",
                                  children: r(m, {
                                    height: "100%",
                                    id: "sGkHVP6E5",
                                    jTcf_EQ_W: "Advanced security features",
                                    layoutId: "sGkHVP6E5",
                                    pbavLymla: "Check",
                                    T2CsNbFcm: "rgb(0, 0, 0)",
                                    width: "100%",
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
                e("div", {
                  className: "framer-1x7lfs8",
                  "data-framer-name": "Testimonials",
                  name: "Testimonials",
                  children: [
                    e("div", {
                      className: "framer-123gfcs",
                      children: [
                        r(t, {
                          className: "framer-1xhi7ba-container",
                          children: r(H, {
                            GmAhv_WVa: 1,
                            height: "100%",
                            hSgW9f2ir: "Testimonials",
                            id: "PgCP0BWuC",
                            layoutId: "PgCP0BWuC",
                            p2xmGpLux: "Read more",
                            ToKaS18SW: !1,
                            variant: "Z2wjynIFK",
                            width: "100%",
                            Z69PPXt7v: !1,
                          }),
                        }),
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("h2", {
                              className: "framer-styles-preset-4m6e0d",
                              "data-styles-preset": "Bgl_uNKYX",
                              style: { "--framer-text-color": "rgb(0, 0, 0)" },
                              children: "What our users say",
                            }),
                          }),
                          className: "framer-evujq6",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                      ],
                    }),
                    e("div", {
                      className: "framer-1tuuztk",
                      children: [
                        x() &&
                          r(t, {
                            className: "framer-18brw3d-container hidden-1sysy87",
                            children: r(z, {
                              alignment: "center",
                              direction: "top",
                              fadeOptions: {
                                fadeAlpha: 0,
                                fadeContent: !1,
                                fadeInset: 0,
                                fadeWidth: 25,
                                overflow: !0,
                              },
                              gap: 0,
                              height: "100%",
                              hoverFactor: 1,
                              id: "sPlCK_JWr",
                              layoutId: "sPlCK_JWr",
                              padding: 0,
                              paddingBottom: 0,
                              paddingLeft: 0,
                              paddingPerSide: !1,
                              paddingRight: 0,
                              paddingTop: 0,
                              sizingOptions: { heightType: !0, widthType: !0 },
                              slots: [
                                e(f.div, {
                                  className: "framer-mmmpg2",
                                  children: [
                                    r(t, {
                                      className: "framer-1tgruun-container",
                                      children: r(y, {
                                        aY3NDFicr: S(
                                          {
                                            src: "../../assets/images/xfpZdEkllcJogTOUKAbP3Wde1Q.png",
                                          },
                                          ""
                                        ),
                                        bErIHJkdI:
                                          "This app has completely transformed how I manage my projects and deadlines.",
                                        height: "100%",
                                        iblTMwOmJ: "@jamietechguru00",
                                        id: "NGcpgKcb2",
                                        layoutId: "NGcpgKcb2",
                                        oVU8J_Br4: "Jamie Teller",
                                        style: { width: "100%" },
                                        tbHzgMiO7: !0,
                                        variant: "UpZj3qjIx",
                                        width: "100%",
                                        yhkvJJf0e: !0,
                                      }),
                                    }),
                                    r(t, {
                                      className: "framer-tebbei-container",
                                      children: r(y, {
                                        aY3NDFicr: S(
                                          {
                                            src: "../../assets/images/Q6Uhycj3JpWbL2X82AeTSpMX47w-772160.png",
                                            srcSet:
                                              "../../assets/images/Q6Uhycj3JpWbL2X82AeTSpMX47w.png 512w, ../../assets/images/Q6Uhycj3JpWbL2X82AeTSpMX47w-772160.png 1019w",
                                          },
                                          ""
                                        ),
                                        bErIHJkdI:
                                          "Our team\u2019s productivity has skyrocketed since we started using this tool. ",
                                        height: "100%",
                                        iblTMwOmJ: "@alexinnovates",
                                        id: "f1S_oiTxI",
                                        layoutId: "f1S_oiTxI",
                                        oVU8J_Br4: "Alex Rivera",
                                        style: { width: "100%" },
                                        tbHzgMiO7: !0,
                                        variant: "UpZj3qjIx",
                                        width: "100%",
                                        yhkvJJf0e: !0,
                                      }),
                                    }),
                                    r(t, {
                                      className: "framer-12rhsw0-container",
                                      children: r(y, {
                                        aY3NDFicr: S(
                                          {
                                            src: "../../assets/images/ZH32UpSO1tvXxr1NY9a51GDeVI.png",
                                            srcSet:
                                              "../../assets/images/ZH32UpSO1tvXxr1NY9a51GDeVI.png 516w",
                                          },
                                          ""
                                        ),
                                        bErIHJkdI:
                                          "The ability to collaborate in real-time, combined with powerful project tracking features, has made it indispensable for our daily operations.",
                                        height: "100%",
                                        iblTMwOmJ: "@morganleewhiz",
                                        id: "AqAV7mm8D",
                                        layoutId: "AqAV7mm8D",
                                        oVU8J_Br4: "Morgan Lee ",
                                        style: { width: "100%" },
                                        tbHzgMiO7: !0,
                                        variant: "UpZj3qjIx",
                                        width: "100%",
                                        yhkvJJf0e: !0,
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                              speed: 25,
                              style: { height: "100%", width: "100%" },
                              width: "100%",
                            }),
                          }),
                        r(t, {
                          className: "framer-ehuljc-container",
                          children: r(z, {
                            alignment: "center",
                            direction: "top",
                            fadeOptions: {
                              fadeAlpha: 0,
                              fadeContent: !1,
                              fadeInset: 0,
                              fadeWidth: 25,
                              overflow: !0,
                            },
                            gap: 0,
                            height: "100%",
                            hoverFactor: 1,
                            id: "zgBk9SYEG",
                            layoutId: "zgBk9SYEG",
                            padding: 0,
                            paddingBottom: 0,
                            paddingLeft: 0,
                            paddingPerSide: !1,
                            paddingRight: 0,
                            paddingTop: 0,
                            sizingOptions: { heightType: !0, widthType: !0 },
                            slots: [
                              e(f.div, {
                                className: "framer-66ftot",
                                children: [
                                  r(t, {
                                    className: "framer-p9trvb-container",
                                    children: r(y, {
                                      aY3NDFicr: S(
                                        {
                                          src: "../../assets/images/fQ49j4qCQ0znA55jDxwRf6YCY.png",
                                          srcSet:
                                            "../../assets/images/fQ49j4qCQ0znA55jDxwRf6YCY.png 500w",
                                        },
                                        ""
                                      ),
                                      bErIHJkdI:
                                        "I was amazed at how quickly we were able to integrate this app into our workflow.",
                                      height: "100%",
                                      iblTMwOmJ: "@caseyj",
                                      id: "DAkM4XPGb",
                                      layoutId: "DAkM4XPGb",
                                      oVU8J_Br4: "Casey Jordan",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "UpZj3qjIx",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
                                  }),
                                  r(t, {
                                    className: "framer-181ke4c-container",
                                    children: r(y, {
                                      aY3NDFicr: S(
                                        {
                                          src: "../../assets/images/XilZd34usNa99pSJgB5veq7gr8E-66bc7c.png",
                                          srcSet:
                                            "../../assets/images/XilZd34usNa99pSJgB5veq7gr8E.png 512w, ../../assets/images/XilZd34usNa99pSJgB5veq7gr8E-66bc7c.png 1003w",
                                        },
                                        ""
                                      ),
                                      bErIHJkdI:
                                        "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
                                      height: "100%",
                                      iblTMwOmJ: "@taykimm",
                                      id: "ZHYSGxSRY",
                                      layoutId: "ZHYSGxSRY",
                                      oVU8J_Br4: "Taylor Kim",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "UpZj3qjIx",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
                                  }),
                                  r(t, {
                                    className: "framer-1nubmcl-container",
                                    children: r(y, {
                                      aY3NDFicr: S(
                                        {
                                          src: "../../assets/images/2ocGPytBkELnTT9wbPbMdBn6HT0.png",
                                        },
                                        ""
                                      ),
                                      bErIHJkdI:
                                        "The customizability and integration capabilities of this app are top-notch.",
                                      height: "100%",
                                      iblTMwOmJ: "@rileysmith1",
                                      id: "qoxDyDq43",
                                      layoutId: "qoxDyDq43",
                                      oVU8J_Br4: "Riley Smith",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "UpZj3qjIx",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
                                  }),
                                ],
                              }),
                            ],
                            speed: 35,
                            style: { height: "100%", width: "100%" },
                            width: "100%",
                          }),
                        }),
                        x() &&
                          r(t, {
                            className: "framer-sqbk9x-container hidden-1sysy87",
                            children: r(z, {
                              alignment: "center",
                              direction: "top",
                              fadeOptions: {
                                fadeAlpha: 0,
                                fadeContent: !1,
                                fadeInset: 0,
                                fadeWidth: 25,
                                overflow: !0,
                              },
                              gap: 0,
                              height: "100%",
                              hoverFactor: 1,
                              id: "Xx7el7x7c",
                              layoutId: "Xx7el7x7c",
                              padding: 0,
                              paddingBottom: 0,
                              paddingLeft: 0,
                              paddingPerSide: !1,
                              paddingRight: 0,
                              paddingTop: 0,
                              sizingOptions: { heightType: !0, widthType: !0 },
                              slots: [
                                e(f.div, {
                                  className: "framer-1rwayw9",
                                  children: [
                                    r(t, {
                                      className: "framer-1glix58-container",
                                      children: r(y, {
                                        aY3NDFicr: S(
                                          {
                                            src: "../../assets/images/KzPCxcCNNsNcLrXuaue6BreIY.jpg",
                                            srcSet:
                                              "../../assets/images/KzPCxcCNNsNcLrXuaue6BreIY.jpg 964w",
                                          },
                                          ""
                                        ),
                                        bErIHJkdI:
                                          "Adopting this app for our team has streamlined our project management and improved communication across the board. ",
                                        height: "100%",
                                        iblTMwOmJ: "@jpatelsdesign",
                                        id: "qrI_ElRUa",
                                        layoutId: "qrI_ElRUa",
                                        oVU8J_Br4: "Jordan Patels",
                                        style: { width: "100%" },
                                        tbHzgMiO7: !0,
                                        variant: "UpZj3qjIx",
                                        width: "100%",
                                        yhkvJJf0e: !0,
                                      }),
                                    }),
                                    r(t, {
                                      className: "framer-1fjfldz-container",
                                      children: r(y, {
                                        aY3NDFicr: S(
                                          {
                                            src: "../../assets/images/YvAgqeFHbVFjbeBlkFOrYz9HcjU.png",
                                          },
                                          ""
                                        ),
                                        bErIHJkdI:
                                          "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
                                        height: "100%",
                                        iblTMwOmJ: "@dawsontechtips",
                                        id: "FVhsNfQ7P",
                                        layoutId: "FVhsNfQ7P",
                                        oVU8J_Br4: "Sam Dawson",
                                        style: { width: "100%" },
                                        tbHzgMiO7: !0,
                                        variant: "UpZj3qjIx",
                                        width: "100%",
                                        yhkvJJf0e: !0,
                                      }),
                                    }),
                                    r(t, {
                                      className: "framer-mo155o-container",
                                      children: r(y, {
                                        aY3NDFicr: S(
                                          {
                                            src: "../../assets/images/nHriSM7CMKJ2KsdXD2MIZk3KI.png",
                                          },
                                          ""
                                        ),
                                        bErIHJkdI:
                                          " Its user-friendly interface and robust features support our diverse needs.",
                                        height: "100%",
                                        iblTMwOmJ: "@casey09",
                                        id: "pvNZc4rRk",
                                        layoutId: "pvNZc4rRk",
                                        oVU8J_Br4: "Casey Harper",
                                        style: { width: "100%" },
                                        tbHzgMiO7: !0,
                                        variant: "UpZj3qjIx",
                                        width: "100%",
                                        yhkvJJf0e: !0,
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                              speed: 25,
                              style: { height: "100%", width: "100%" },
                              width: "100%",
                            }),
                          }),
                        r("div", { className: "framer-10scesw" }),
                        r("div", { className: "framer-1st1yan" }),
                      ],
                    }),
                  ],
                }),
                e("div", {
                  className: "framer-1kgs4b4",
                  "data-framer-name": "CTA Day",
                  name: "CTA Day",
                  children: [
                    e("div", {
                      className: "framer-16qjhe3",
                      children: [
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("h2", {
                              className: "framer-styles-preset-4m6e0d",
                              "data-styles-preset": "Bgl_uNKYX",
                              style: { "--framer-text-color": "rgb(0, 0, 0)" },
                              children: "Sign up for free today",
                            }),
                          }),
                          className: "framer-4ej3zy",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("p", {
                              className: "framer-styles-preset-1cc56zh",
                              "data-styles-preset": "PWn1k_MD2",
                              style: { "--framer-text-alignment": "center" },
                              children:
                                "Celebrate the joy of accomplishment with an app designed to track your progress and motivate your efforts.",
                            }),
                          }),
                          className: "framer-ogz8qk",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        x() &&
                          r(I, {
                            __framer__adjustPosition: !0,
                            __framer__offset: 300,
                            __framer__parallaxTransformEnabled: !0,
                            __framer__speed: 110,
                            __perspectiveFX: !1,
                            __targetOpacity: 1,
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "360px",
                              src: "../../assets/images/F95XtBuIu9yRJpVFOQe6khYgo.png",
                              srcSet:
                                "../../assets/images/F95XtBuIu9yRJpVFOQe6khYgo-aac526.png 512w, ../../assets/images/F95XtBuIu9yRJpVFOQe6khYgo-49685a.png 1024w, ../../assets/images/F95XtBuIu9yRJpVFOQe6khYgo.png 1500w",
                            },
                            className: "framer-laag1y hidden-1sysy87",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        x() &&
                          r(I, {
                            __framer__adjustPosition: !0,
                            __framer__offset: 300,
                            __framer__parallaxTransformEnabled: !0,
                            __framer__speed: 110,
                            __perspectiveFX: !1,
                            __targetOpacity: 1,
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "359.5px",
                              src: "../../assets/images/fTvRR9UO6UHLEJxbKleRMkrgzgo.png",
                              srcSet:
                                "../../assets/images/fTvRR9UO6UHLEJxbKleRMkrgzgo-ce4d2b.png 512w, ../../assets/images/fTvRR9UO6UHLEJxbKleRMkrgzgo-1a8429.png 1024w, ../../assets/images/fTvRR9UO6UHLEJxbKleRMkrgzgo.png 1500w",
                            },
                            className: "framer-19h8uav hidden-1sysy87",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                      ],
                    }),
                    e("div", {
                      className: "framer-b4s9ye",
                      children: [
                        r(t, {
                          className: "framer-16x8bp0-container",
                          children: r(J, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "O5yyzh1UG",
                            ik9I5qIGz: !1,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "O5yyzh1UG",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "PqgBulBPi",
                            width: "100%",
                            yTZZaFOb3: "https://framer.link/ZQ2l2Kk",
                          }),
                        }),
                        r(t, {
                          className: "framer-klxiqt-container",
                          children: r(ar, {
                            bVToBLBTS: "Learn more",
                            height: "100%",
                            id: "LJqpS7S6t",
                            KqeH5xil_: "rgb(0, 0, 0)",
                            layoutId: "LJqpS7S6t",
                            variant: "uvXz5tOXs",
                            width: "100%",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                r("div", {
                  className: "framer-lpuq9d",
                  "data-framer-name": "Footer Complete Night",
                  name: "Footer Complete Night",
                  children: e("div", {
                    className: "framer-1brorf1",
                    children: [
                      e("div", {
                        className: "framer-15wq09l",
                        children: [
                          e("div", {
                            className: "framer-1ws7gm8",
                            children: [
                              r(t, {
                                className: "framer-1986kyw-container",
                                children: r(zr, {
                                  height: "100%",
                                  id: "gGHxzINS5",
                                  layoutId: "gGHxzINS5",
                                  QPpn2xZty: "rgb(0, 0, 0)",
                                  style: { height: "100%", width: "100%" },
                                  variant: "eEZGnfswo",
                                  width: "100%",
                                }),
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: {
                                      "--framer-text-alignment": "left",
                                      "--framer-text-color": "rgb(255, 255, 255)",
                                    },
                                    children:
                                      "Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your successes.",
                                  }),
                                }),
                                className: "framer-1x49ivz",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                          e("div", {
                            className: "framer-co6105",
                            children: [
                              r(A, {
                                href: "x.com/framer",
                                children: r(f.a, {
                                  className: "framer-qx87jz framer-6rh4wo",
                                  "data-framer-name": "X",
                                  name: "X",
                                  whileHover: V,
                                  children: r(g, {
                                    className: "framer-1kf1vvj",
                                    "data-framer-name": "graphic",
                                    layout: "position",
                                    name: "graphic",
                                    opacity: 1,
                                    radius: {
                                      bottomLeft: 0,
                                      bottomRight: 0,
                                      topLeft: 0,
                                      topRight: 0,
                                    },
                                    svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 16.641 5 L 19.095 5 L 13.735 10.93 L 20.041 19 L 15.103 19 L 11.236 14.106 L 6.811 19 L 4.356 19 L 10.09 12.657 L 4.041 5 L 9.103 5 L 12.599 9.474 Z" fill="rgb(255, 255, 255)"></path></svg>',
                                    svgContentId: 2583673128,
                                    withExternalLayout: !0,
                                  }),
                                }),
                              }),
                              r(A, {
                                href: "https://www.instagram.com/framer/",
                                children: r(f.a, {
                                  className: "framer-1ld69fm framer-6rh4wo",
                                  "data-framer-name": "Instagram",
                                  name: "Instagram",
                                  whileHover: V,
                                  children: r(g, {
                                    className: "framer-1orp4ym",
                                    "data-framer-name": "Instagram",
                                    layout: "position",
                                    name: "Instagram",
                                    opacity: 1,
                                    radius: {
                                      bottomLeft: 0,
                                      bottomRight: 0,
                                      topLeft: 0,
                                      topRight: 0,
                                    },
                                    svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 4 8.667 C 4 6.089 6.089 4 8.667 4 L 15.333 4 C 17.911 4 20 6.089 20 8.667 L 20 15.333 C 20 17.911 17.911 20 15.333 20 L 8.667 20 C 6.089 20 4 17.911 4 15.333 Z M 15.333 7.333 C 15.322 7.817 15.574 8.268 15.991 8.513 C 16.408 8.758 16.924 8.758 17.341 8.513 C 17.758 8.269 18.01 7.817 17.999 7.334 C 17.983 6.609 17.391 6.03 16.667 6.03 C 15.942 6.03 15.35 6.609 15.333 7.333 Z M 8.667 12 C 8.667 13.841 10.16 15.334 12.001 15.333 C 13.842 15.333 15.334 13.84 15.334 11.999 C 15.334 10.158 13.841 8.666 12 8.666 C 10.159 8.666 8.666 10.159 8.667 12 Z" fill="rgb(255, 255, 255)"></path></svg>',
                                    svgContentId: 3367443515,
                                    withExternalLayout: !0,
                                  }),
                                }),
                              }),
                              r(A, {
                                href: "pinterest.com/framer_app/",
                                children: r(f.a, {
                                  className: "framer-9m8owv framer-6rh4wo",
                                  "data-framer-name": "Pinterest",
                                  name: "Pinterest",
                                  whileHover: V,
                                  children: r(g, {
                                    className: "framer-62macw",
                                    "data-framer-name": "Pinterest",
                                    layout: "position",
                                    name: "Pinterest",
                                    opacity: 1,
                                    radius: {
                                      bottomLeft: 0,
                                      bottomRight: 0,
                                      topLeft: 0,
                                      topRight: 0,
                                    },
                                    svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 12.001 4 C 7.582 4 4 7.582 4 11.999 C 4 15.276 5.97 18.09 8.789 19.327 C 8.765 18.768 8.784 18.098 8.927 17.491 C 9.082 16.841 9.957 13.131 9.957 13.131 C 9.957 13.131 9.702 12.62 9.702 11.865 C 9.702 10.679 10.389 9.794 11.244 9.794 C 11.973 9.794 12.323 10.341 12.323 10.995 C 12.323 11.726 11.857 12.821 11.618 13.834 C 11.417 14.683 12.043 15.375 12.879 15.375 C 14.396 15.375 15.417 13.428 15.417 11.122 C 15.417 9.369 14.236 8.056 12.088 8.056 C 9.661 8.056 8.15 9.866 8.15 11.887 C 8.15 12.584 8.354 13.076 8.677 13.456 C 8.824 13.631 8.845 13.702 8.791 13.902 C 8.753 14.049 8.665 14.404 8.628 14.544 C 8.575 14.747 8.411 14.819 8.228 14.745 C 7.11 14.288 6.59 13.065 6.59 11.688 C 6.59 9.416 8.507 6.691 12.307 6.691 C 15.362 6.691 17.373 8.901 17.373 11.273 C 17.373 14.412 15.627 16.757 13.055 16.757 C 12.191 16.757 11.379 16.289 11.101 15.759 C 11.101 15.759 10.636 17.603 10.538 17.958 C 10.368 18.574 10.036 19.192 9.733 19.672 C 10.469 19.89 11.233 20 12.001 20 C 16.419 20 20 16.418 20 11.999 C 20 7.582 16.419 4 12.001 4 Z" fill="rgb(255, 255, 255)"></path></svg>',
                                    svgContentId: 2053117942,
                                    withExternalLayout: !0,
                                  }),
                                }),
                              }),
                              r(A, {
                                href: "https://www.linkedin.com/company/framer",
                                children: r(f.a, {
                                  className: "framer-15ddgct framer-6rh4wo",
                                  "data-framer-name": "LinkedIn",
                                  name: "LinkedIn",
                                  whileHover: V,
                                  children: r(g, {
                                    className: "framer-9w351h",
                                    "data-framer-name": "LinkedIn",
                                    layout: "position",
                                    name: "LinkedIn",
                                    opacity: 1,
                                    radius: {
                                      bottomLeft: 0,
                                      bottomRight: 0,
                                      topLeft: 0,
                                      topRight: 0,
                                    },
                                    svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 4 7 C 4 5.343 5.343 4 7 4 L 17 4 C 18.657 4 20 5.343 20 7 L 20 17 C 20 18.657 18.657 20 17 20 L 7 20 C 5.343 20 4 18.657 4 17 Z M 8.85 17.393 L 8.85 10.169 L 6.434 10.169 L 6.434 17.393 Z M 7.642 9.182 C 8.484 9.182 9.009 8.628 9.009 7.934 C 8.993 7.225 8.484 6.686 7.658 6.686 C 6.831 6.686 6.291 7.225 6.291 7.934 C 6.291 8.628 6.815 9.182 7.626 9.182 Z M 10.187 17.394 C 10.187 17.394 10.187 17.394 10.187 17.393 L 10.187 17.393 Z M 12.604 17.393 L 12.604 13.359 C 12.604 13.143 12.62 12.928 12.683 12.773 C 12.858 12.342 13.256 11.895 13.923 11.895 C 14.798 11.895 15.148 12.557 15.148 13.529 L 15.148 17.393 L 17.564 17.393 L 17.564 13.251 C 17.564 11.032 16.372 9.999 14.782 9.999 C 13.5 9.999 12.925 10.699 12.604 11.192 L 12.604 10.169 L 10.187 10.169 C 10.219 10.844 10.188 17.351 10.187 17.393 Z" fill="rgb(255, 255, 255)"></path></svg>',
                                    svgContentId: 3273537083,
                                    withExternalLayout: !0,
                                  }),
                                }),
                              }),
                              r(A, {
                                href: "https://www.tiktok.com/@framer",
                                children: r(f.a, {
                                  className: "framer-1h92yyb framer-6rh4wo",
                                  "data-framer-name": "TikTok",
                                  name: "TikTok",
                                  whileHover: V,
                                  children: r(g, {
                                    className: "framer-1f86jge",
                                    "data-framer-name": "TikTok",
                                    layout: "position",
                                    name: "TikTok",
                                    opacity: 1,
                                    radius: {
                                      bottomLeft: 0,
                                      bottomRight: 0,
                                      topLeft: 0,
                                      topRight: 0,
                                    },
                                    svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 17.631 7.136 C 17.514 7.077 17.401 7.012 17.29 6.941 C 16.97 6.733 16.676 6.488 16.415 6.211 C 15.763 5.478 15.519 4.734 15.429 4.213 L 15.433 4.213 C 15.358 3.78 15.389 3.501 15.394 3.501 L 12.421 3.501 L 12.421 14.79 C 12.421 14.942 12.421 15.092 12.415 15.24 C 12.415 15.258 12.413 15.275 12.412 15.295 C 12.412 15.303 12.412 15.311 12.41 15.32 L 12.41 15.326 C 12.346 16.149 11.87 16.886 11.14 17.294 C 10.765 17.503 10.342 17.613 9.91 17.613 C 8.526 17.613 7.403 16.503 7.403 15.134 C 7.403 13.764 8.526 12.655 9.91 12.655 C 10.173 12.654 10.433 12.695 10.682 12.775 L 10.686 9.802 C 9.156 9.608 7.614 10.051 6.432 11.024 C 5.919 11.462 5.489 11.983 5.159 12.566 C 5.033 12.779 4.56 13.632 4.503 15.018 C 4.467 15.805 4.707 16.62 4.822 16.956 L 4.822 16.964 C 4.894 17.162 5.173 17.839 5.629 18.409 C 5.996 18.867 6.43 19.269 6.916 19.602 L 6.916 19.595 L 6.923 19.602 C 8.362 20.563 9.958 20.5 9.958 20.5 C 10.234 20.489 11.159 20.5 12.21 20.011 C 13.375 19.468 14.038 18.661 14.038 18.661 C 14.462 18.178 14.799 17.628 15.035 17.034 C 15.304 16.34 15.394 15.507 15.394 15.174 L 15.394 9.184 C 15.43 9.206 15.91 9.518 15.91 9.518 C 15.91 9.518 16.602 9.953 17.681 10.237 C 18.456 10.439 19.499 10.481 19.499 10.481 L 19.499 7.583 C 19.133 7.622 18.391 7.508 17.631 7.136 Z" fill="rgb(255, 255, 255)"></path></svg>',
                                    svgContentId: 4042805854,
                                    withExternalLayout: !0,
                                  }),
                                }),
                              }),
                              r(A, {
                                href: "https://www.youtube.com/channel/UCW5gUZ7lKGrAbLOkHv2xfbw",
                                children: r(f.a, {
                                  className: "framer-b0rly framer-6rh4wo",
                                  "data-framer-name": "YouTube",
                                  name: "YouTube",
                                  whileHover: V,
                                  children: r(g, {
                                    className: "framer-2bwtrl",
                                    "data-framer-name": "Youtube",
                                    layout: "position",
                                    name: "Youtube",
                                    opacity: 1,
                                    radius: {
                                      bottomLeft: 0,
                                      bottomRight: 0,
                                      topLeft: 0,
                                      topRight: 0,
                                    },
                                    svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 23 12 C 23 12 23 15.487 22.54 17.158 C 22.285 18.082 21.544 18.804 20.595 19.052 C 18.88 19.5 12 19.5 12 19.5 C 12 19.5 5.12 19.5 3.405 19.052 C 2.456 18.803 1.715 18.082 1.46 17.158 C 1 15.487 1 12 1 12 C 1 12 1 8.513 1.46 6.842 C 1.715 5.918 2.456 5.197 3.405 4.948 C 5.12 4.5 12 4.5 12 4.5 C 12 4.5 18.88 4.5 20.595 4.948 C 21.544 5.197 22.285 5.918 22.54 6.842 C 22.998 8.513 23 12 23 12 Z M 9.798 14.359 C 9.798 14.742 10.21 14.983 10.543 14.795 L 14.738 12.436 C 15.078 12.245 15.078 11.756 14.738 11.564 L 10.543 9.205 C 10.21 9.018 9.798 9.259 9.798 9.641 Z" fill="rgb(255, 255, 255)"></path></svg>',
                                    svgContentId: 3656042367,
                                    withExternalLayout: !0,
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      e("div", {
                        className: "framer-kfd6as",
                        children: [
                          e("div", {
                            className: "framer-namtvw",
                            children: [
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    style: {
                                      "--font-selector": "RlM7U2F0b3NoaS1ib2xk",
                                      "--framer-font-family":
                                        '"Satoshi", "Satoshi Placeholder", sans-serif',
                                      "--framer-font-size": "14px",
                                      "--framer-font-weight": "700",
                                      "--framer-letter-spacing": "-0.2px",
                                      "--framer-line-height": "1em",
                                      "--framer-text-alignment": "center",
                                      "--framer-text-color": "rgb(255, 255, 255)",
                                    },
                                    children: "Product",
                                  }),
                                }),
                                className: "framer-ueongf",
                                fonts: ["FS;Satoshi-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Features",
                                  }),
                                }),
                                className: "framer-x3xyn5",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Integrations",
                                  }),
                                }),
                                className: "framer-1wyc5ac",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Updates",
                                  }),
                                }),
                                className: "framer-1igqzxz",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "FAQ",
                                  }),
                                }),
                                className: "framer-1vw21xq",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Pricing",
                                  }),
                                }),
                                className: "framer-11392hq",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                          e("div", {
                            className: "framer-1pvmw9q",
                            children: [
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    style: {
                                      "--font-selector": "RlM7U2F0b3NoaS1ib2xk",
                                      "--framer-font-family":
                                        '"Satoshi", "Satoshi Placeholder", sans-serif',
                                      "--framer-font-size": "14px",
                                      "--framer-font-weight": "700",
                                      "--framer-letter-spacing": "-0.2px",
                                      "--framer-line-height": "1em",
                                      "--framer-text-alignment": "center",
                                      "--framer-text-color": "rgb(255, 255, 255)",
                                    },
                                    children: "Company",
                                  }),
                                }),
                                className: "framer-xqar4z",
                                fonts: ["FS;Satoshi-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "About",
                                  }),
                                }),
                                className: "framer-80nlvc",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Blog",
                                  }),
                                }),
                                className: "framer-3w13jl",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Careers",
                                  }),
                                }),
                                className: "framer-m9djku",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Manifesto",
                                  }),
                                }),
                                className: "framer-4ttkoj",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Press",
                                  }),
                                }),
                                className: "framer-11yhzjp",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Contact",
                                  }),
                                }),
                                className: "framer-1h911lu",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                          e("div", {
                            className: "framer-947wac",
                            children: [
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    style: {
                                      "--font-selector": "RlM7U2F0b3NoaS1ib2xk",
                                      "--framer-font-family":
                                        '"Satoshi", "Satoshi Placeholder", sans-serif',
                                      "--framer-font-size": "14px",
                                      "--framer-font-weight": "700",
                                      "--framer-letter-spacing": "-0.2px",
                                      "--framer-line-height": "1em",
                                      "--framer-text-alignment": "center",
                                      "--framer-text-color": "rgb(255, 255, 255)",
                                    },
                                    children: "Resources",
                                  }),
                                }),
                                className: "framer-1fs7dng",
                                fonts: ["FS;Satoshi-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Examples",
                                  }),
                                }),
                                className: "framer-1szo09a",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Community",
                                  }),
                                }),
                                className: "framer-1fj9snu",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Guides",
                                  }),
                                }),
                                className: "framer-b5wxw4",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Docs",
                                  }),
                                }),
                                className: "framer-1rwo1jm",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                          e("div", {
                            className: "framer-vgf1ku",
                            children: [
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    style: {
                                      "--font-selector": "RlM7U2F0b3NoaS1ib2xk",
                                      "--framer-font-family":
                                        '"Satoshi", "Satoshi Placeholder", sans-serif',
                                      "--framer-font-size": "14px",
                                      "--framer-font-weight": "700",
                                      "--framer-letter-spacing": "-0.2px",
                                      "--framer-line-height": "1em",
                                      "--framer-text-alignment": "center",
                                      "--framer-text-color": "rgb(255, 255, 255)",
                                    },
                                    children: "Legal",
                                  }),
                                }),
                                className: "framer-14utkn3",
                                fonts: ["FS;Satoshi-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Privacy",
                                  }),
                                }),
                                className: "framer-7t3bjx",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Terms",
                                  }),
                                }),
                                className: "framer-xjk24o",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                              r(i, {
                                __fromCanvasComponent: !0,
                                children: r(a, {
                                  children: r("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Security",
                                  }),
                                }),
                                className: "framer-1qweskb",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
            r("div", { className: jr(Re, ...X), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  Wa = [
    '.framer-Zrdb3[data-border="true"]::after, .framer-Zrdb3 [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    `.${Rr.bodyClassName}-framer-Zrdb3 { background: white; }`,
    ".framer-Zrdb3.framer-6rh4wo, .framer-Zrdb3 .framer-6rh4wo { display: block; }",
    ".framer-Zrdb3.framer-6t96s3 { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; }",
    ".framer-Zrdb3 .framer-4ope2u { align-content: center; align-items: center; background-color: #000000; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: 46px; justify-content: center; left: 0px; overflow: hidden; padding: 0px 0px 0px 0px; position: fixed; right: 0px; top: 0px; z-index: 10; }",
    ".framer-Zrdb3 .framer-13vje9k { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; opacity: 0.6; position: relative; white-space: pre; width: auto; }",
    ".framer-Zrdb3 .framer-1gdtu54-container, .framer-Zrdb3 .framer-1laqlns-container, .framer-Zrdb3 .framer-qswvzz-container, .framer-Zrdb3 .framer-ubuo1q-container, .framer-Zrdb3 .framer-tczmqq-container, .framer-Zrdb3 .framer-1qbjvbr-container, .framer-Zrdb3 .framer-1b502r4-container, .framer-Zrdb3 .framer-1xwuato-container, .framer-Zrdb3 .framer-ikpzww-container, .framer-Zrdb3 .framer-1nzjae9-container, .framer-Zrdb3 .framer-1p0itr-container, .framer-Zrdb3 .framer-hwsf3f-container, .framer-Zrdb3 .framer-kd89ir-container, .framer-Zrdb3 .framer-gz8zo3-container, .framer-Zrdb3 .framer-13e2w58-container, .framer-Zrdb3 .framer-dc76z5-container, .framer-Zrdb3 .framer-i0df75-container, .framer-Zrdb3 .framer-v4a3mw-container, .framer-Zrdb3 .framer-47cr9t-container, .framer-Zrdb3 .framer-10e0826-container, .framer-Zrdb3 .framer-19y6094-container, .framer-Zrdb3 .framer-my4e6i-container, .framer-Zrdb3 .framer-35vlxj-container, .framer-Zrdb3 .framer-17xoy27-container, .framer-Zrdb3 .framer-kqdmur-container, .framer-Zrdb3 .framer-qx4kro-container, .framer-Zrdb3 .framer-1w95i6b-container, .framer-Zrdb3 .framer-qqugi3-container, .framer-Zrdb3 .framer-tua2m7-container, .framer-Zrdb3 .framer-1xhi7ba-container, .framer-Zrdb3 .framer-16x8bp0-container, .framer-Zrdb3 .framer-klxiqt-container { flex: none; height: auto; position: relative; width: auto; }",
    ".framer-Zrdb3 .framer-2o5tlt-container { flex: none; height: 71px; left: calc(50.00000000000002% - 100% / 2); position: fixed; top: 46px; width: 100%; z-index: 10; }",
    ".framer-Zrdb3 .framer-cx3k8l { align-content: center; align-items: center; background: radial-gradient(101.4% 61.3% at 12.4% 100%, #0832bd 0%, rgb(189, 204, 255) 86.29293355855856%, rgb(235, 239, 255) 100%); display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 260px 40px 120px 40px; position: relative; width: 100%; z-index: 1; }",
    ".framer-Zrdb3 .framer-1mrulq4 { align-content: flex-start; align-items: flex-start; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; max-width: 1200px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 1px; }",
    ".framer-Zrdb3 .framer-woqt8f { align-content: flex-start; align-items: flex-start; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 1px; }",
    ".framer-Zrdb3 .framer-13fr10g { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 560px; position: relative; transform: perspective(1200px); white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-Zrdb3 .framer-1dqfp2f { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 460px; opacity: 0.8; position: relative; transform: perspective(1200px); white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-Zrdb3 .framer-wxlu6y { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; transform: perspective(1200px); width: min-content; }",
    ".framer-Zrdb3 .framer-11y2b10 { flex: 1 0 0px; height: 552px; max-width: 600px; overflow: visible; position: relative; width: 1px; }",
    ".framer-Zrdb3 .framer-1f7jeqz { -webkit-filter: drop-shadow(-30px -90px 26px rgba(28, 51, 128, 0.25)); aspect-ratio: 1 / 1; filter: drop-shadow(-30px -90px 26px rgba(28, 51, 128, 0.25)); flex: none; height: var(--framer-aspect-ratio-supported, 707px); left: -73px; overflow: visible; position: absolute; right: -74px; top: -87px; transform: rotate(-163deg); }",
    ".framer-Zrdb3 .framer-1of1rfa { -webkit-filter: drop-shadow(-30px 90px 26px rgba(28, 52, 130, 0.15)); aspect-ratio: 1 / 1; filter: drop-shadow(-30px 90px 26px rgba(28, 52, 130, 0.15)); flex: none; height: var(--framer-aspect-ratio-supported, 236px); left: -205px; overflow: visible; position: absolute; top: -153px; width: 236px; }",
    ".framer-Zrdb3 .framer-fzqp3k { -webkit-filter: drop-shadow(-30px 90px 26px rgba(28, 52, 130, 0.15)); aspect-ratio: 1 / 1; bottom: -212px; filter: drop-shadow(-30px 90px 26px rgba(28, 52, 130, 0.15)); flex: none; height: var(--framer-aspect-ratio-supported, 243px); overflow: visible; position: absolute; right: -101px; transform: rotate(35deg); width: 243px; }",
    ".framer-Zrdb3 .framer-dg5e1x { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-brdwsi-container { flex: none; height: 82px; max-width: 1200px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-1c3xe56 { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 50px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-Zrdb3 .framer-mhhymn, .framer-Zrdb3 .framer-1han8ud { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; opacity: 0.5; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-Zrdb3 .framer-1d9uxb5, .framer-Zrdb3 .framer-1ulmtb3 { flex: none; height: 26px; position: relative; width: 26px; }",
    ".framer-Zrdb3 .framer-aunv8c, .framer-Zrdb3 .framer-1v6x3a4, .framer-Zrdb3 .framer-157slf4, .framer-Zrdb3 .framer-udyub8, .framer-Zrdb3 .framer-1gnogs9, .framer-Zrdb3 .framer-1q51diu, .framer-Zrdb3 .framer-1r0v4rz, .framer-Zrdb3 .framer-8ahn3w, .framer-Zrdb3 .framer-1kj4fnt, .framer-Zrdb3 .framer-ueongf, .framer-Zrdb3 .framer-xqar4z, .framer-Zrdb3 .framer-1fs7dng, .framer-Zrdb3 .framer-14utkn3 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-Zrdb3 .framer-ht6ktm, .framer-Zrdb3 .framer-noqn37, .framer-Zrdb3 .framer-18i8gm7, .framer-Zrdb3 .framer-1bidf82 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: min-content; justify-content: center; opacity: 0.5; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-Zrdb3 .framer-12vlngi { flex: none; height: 22px; position: relative; width: 22px; }",
    ".framer-Zrdb3 .framer-1mg4ciy, .framer-Zrdb3 .framer-vwucm1 { flex: none; height: 24px; position: relative; width: 24px; }",
    ".framer-Zrdb3 .framer-q09ih6 { align-content: center; align-items: center; background: linear-gradient(180deg, #ffffff 40.132271171941866%, rgb(209, 220, 255) 100%); display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 40px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-1c1ypq0, .framer-Zrdb3 .framer-1h02tdf, .framer-Zrdb3 .framer-1i4qayq, .framer-Zrdb3 .framer-123gfcs { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-qvtamp, .framer-Zrdb3 .framer-19akkxu, .framer-Zrdb3 .framer-19o51up { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 550px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-Zrdb3 .framer-5dhk5c { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; max-width: 1200px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-19nvram { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; aspect-ratio: 1.6124469589816124 / 1; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; border-top-left-radius: 10px; border-top-right-radius: 10px; box-shadow: 0px 20px 40px 0px rgba(10, 23, 61, 0.2); flex: none; height: var(--framer-aspect-ratio-supported, 695px); overflow: visible; position: relative; transform: perspective(1200px); width: 100%; }",
    ".framer-Zrdb3 .framer-1gjb52s { -webkit-filter: drop-shadow(0px 60px 26px rgba(20, 36, 94, 0.2)); aspect-ratio: 1 / 1; bottom: 341px; filter: drop-shadow(0px 60px 26px rgba(20, 36, 94, 0.2)); flex: none; height: var(--framer-aspect-ratio-supported, 252px); overflow: visible; position: absolute; right: -135px; width: 252px; z-index: 1; }",
    ".framer-Zrdb3 .framer-pnoogb { -webkit-filter: drop-shadow(0px 60px 26px rgba(20, 36, 94, 0.2)); aspect-ratio: 1 / 1; bottom: 89px; filter: drop-shadow(0px 60px 26px rgba(20, 36, 94, 0.2)); flex: none; height: var(--framer-aspect-ratio-supported, 252px); left: -133px; overflow: visible; position: absolute; width: 252px; z-index: 1; }",
    ".framer-Zrdb3 .framer-15swlg5 { display: grid; flex: none; gap: 40px; grid-auto-rows: min-content; grid-template-columns: repeat(4, minmax(200px, 1fr)); grid-template-rows: repeat(2, min-content); height: min-content; justify-content: center; max-width: 1200px; overflow: visible; padding: 60px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-11tfarj-container, .framer-Zrdb3 .framer-18clc0z-container, .framer-Zrdb3 .framer-pvpjnr-container, .framer-Zrdb3 .framer-pmhhkg-container { align-self: start; flex: none; height: auto; justify-self: start; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-4ycmxk { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-1sqkc6y { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 490px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-Zrdb3 .framer-hjwtzt { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; max-width: 1200px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-acg8fm { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; background-color: var(--token-8c47652b-dea5-4767-a9f2-5d952dcce49a, #ffffff); border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1); display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 1px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-Zrdb3 .framer-1f54332, .framer-Zrdb3 .framer-1dd0hkt { align-content: center; align-items: center; aspect-ratio: 1.303030303030303 / 1; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: var(--framer-aspect-ratio-supported, 361px); justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-hljstx { -webkit-filter: hue-rotate(0deg); aspect-ratio: 1.0497512437810945 / 1; filter: hue-rotate(0deg); flex: none; height: 100%; overflow: visible; position: relative; width: var(--framer-aspect-ratio-supported, 379px); }",
    ".framer-Zrdb3 .framer-12dg66y, .framer-Zrdb3 .framer-1g75qq1 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-tp20y0, .framer-Zrdb3 .framer-ezsv8l { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-Zrdb3 .framer-14wk7eh, .framer-Zrdb3 .framer-1ipewts { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 300px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-Zrdb3 .framer-1pw6z08 { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; background-color: var(--token-b984212c-6b21-4967-bb54-ce90369391ae, #ffffff); border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1); display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 1px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-Zrdb3 .framer-1vwy77n { -webkit-filter: hue-rotate(0deg); aspect-ratio: 1.0496688741721854 / 1; filter: hue-rotate(0deg); flex: none; height: 100%; overflow: visible; position: relative; width: var(--framer-aspect-ratio-supported, 379px); }",
    ".framer-Zrdb3 .framer-3ek2ar { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 40px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-3sqizy { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 510px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-Zrdb3 .framer-kw4ubu { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 450px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-Zrdb3 .framer-1r3nvrv { align-content: flex-end; align-items: flex-end; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-1xfoud, .framer-Zrdb3 .framer-1kpsy9i { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: flex-start; align-items: flex-start; background-color: var(--token-8c47652b-dea5-4767-a9f2-5d952dcce49a, #ffffff); border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1); display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; max-width: 320px; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 1px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-Zrdb3 .framer-17pqp7d, .framer-Zrdb3 .framer-nxhcxe, .framer-Zrdb3 .framer-43pc7z, .framer-Zrdb3 .framer-ebs76m, .framer-Zrdb3 .framer-b19vqz, .framer-Zrdb3 .framer-1rayqi8, .framer-Zrdb3 .framer-x3xyn5, .framer-Zrdb3 .framer-1wyc5ac, .framer-Zrdb3 .framer-1igqzxz, .framer-Zrdb3 .framer-1vw21xq, .framer-Zrdb3 .framer-11392hq, .framer-Zrdb3 .framer-80nlvc, .framer-Zrdb3 .framer-3w13jl, .framer-Zrdb3 .framer-m9djku, .framer-Zrdb3 .framer-4ttkoj, .framer-Zrdb3 .framer-11yhzjp, .framer-Zrdb3 .framer-1h911lu, .framer-Zrdb3 .framer-1szo09a, .framer-Zrdb3 .framer-1fj9snu, .framer-Zrdb3 .framer-b5wxw4, .framer-Zrdb3 .framer-1rwo1jm, .framer-Zrdb3 .framer-7t3bjx, .framer-Zrdb3 .framer-xjk24o, .framer-Zrdb3 .framer-1qweskb { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; opacity: 0.5; position: relative; white-space: pre; width: auto; }",
    ".framer-Zrdb3 .framer-1utt5jd, .framer-Zrdb3 .framer-gq7wpd, .framer-Zrdb3 .framer-3a6ypp { align-content: flex-end; align-items: flex-end; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 4px; height: min-content; justify-content: flex-start; max-width: 100%; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-1x6a63l-container, .framer-Zrdb3 .framer-i4an7y-container, .framer-Zrdb3 .framer-f7shzs-container { flex: none; height: auto; position: relative; width: 100%; z-index: 2; }",
    ".framer-Zrdb3 .framer-xzfbyn, .framer-Zrdb3 .framer-1k8g8t, .framer-Zrdb3 .framer-1hjtlqe { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-rttdj0 { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: flex-start; align-items: flex-start; background-color: #000000; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1); display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; max-width: 320px; overflow: visible; padding: 40px 40px 40px 40px; position: relative; width: 1px; }",
    ".framer-Zrdb3 .framer-1x5rbd { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-1x7lfs8 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-evujq6 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 660px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-Zrdb3 .framer-1tuuztk { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; max-width: 1200px; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 160%; }",
    ".framer-Zrdb3 .framer-18brw3d-container, .framer-Zrdb3 .framer-sqbk9x-container { flex: none; height: 795px; position: relative; width: 362px; }",
    ".framer-Zrdb3 .framer-mmmpg2, .framer-Zrdb3 .framer-66ftot, .framer-Zrdb3 .framer-1rwayw9 { align-content: flex-start; align-items: flex-start; display: flex; flex-direction: column; flex-wrap: wrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 40px 40px 40px; position: relative; width: 420px; }",
    ".framer-Zrdb3 .framer-1tgruun-container, .framer-Zrdb3 .framer-tebbei-container, .framer-Zrdb3 .framer-12rhsw0-container, .framer-Zrdb3 .framer-p9trvb-container, .framer-Zrdb3 .framer-181ke4c-container, .framer-Zrdb3 .framer-1nubmcl-container, .framer-Zrdb3 .framer-1glix58-container, .framer-Zrdb3 .framer-1fjfldz-container, .framer-Zrdb3 .framer-mo155o-container { flex: none; height: auto; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-ehuljc-container { flex: none; height: 795px; position: relative; width: 363px; }",
    ".framer-Zrdb3 .framer-10scesw { background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%); flex: none; height: 150px; left: calc(50.00000000000002% - 100% / 2); overflow: hidden; position: absolute; top: 0px; width: 100%; z-index: 1; }",
    ".framer-Zrdb3 .framer-1st1yan { background: linear-gradient(0deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%); bottom: 0px; flex: none; height: 150px; left: calc(50.00000000000002% - 100% / 2); overflow: hidden; position: absolute; width: 100%; z-index: 1; }",
    ".framer-Zrdb3 .framer-1kgs4b4 { align-content: center; align-items: center; background: radial-gradient(84.6% 67.10000000000001% at 50% 100%, #bdccff 0%, rgb(255, 255, 255) 100%); display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 40px; height: min-content; justify-content: center; overflow: visible; padding: 120px 40px 120px 40px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-16qjhe3 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; max-width: 800px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; z-index: 1; }",
    ".framer-Zrdb3 .framer-4ej3zy { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 690px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-Zrdb3 .framer-ogz8qk { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 420px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-Zrdb3 .framer-laag1y { -webkit-filter: drop-shadow(0px 60px 26px rgba(20, 36, 94, 0.2)); aspect-ratio: 1 / 1; bottom: -210px; filter: drop-shadow(0px 60px 26px rgba(20, 36, 94, 0.2)); flex: none; height: var(--framer-aspect-ratio-supported, 360px); overflow: visible; position: absolute; right: -204px; width: 360px; z-index: 1; }",
    ".framer-Zrdb3 .framer-19h8uav { -webkit-filter: drop-shadow(0px 60px 26px rgba(20, 36, 94, 0.2)); aspect-ratio: 1 / 1; filter: drop-shadow(0px 60px 26px rgba(20, 36, 94, 0.2)); flex: none; height: var(--framer-aspect-ratio-supported, 360px); left: -244px; overflow: visible; position: absolute; top: -142px; width: 360px; z-index: 1; }",
    ".framer-Zrdb3 .framer-b4s9ye { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 1; }",
    ".framer-Zrdb3 .framer-lpuq9d { align-content: flex-start; align-items: flex-start; background-color: #000000; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-Zrdb3 .framer-1brorf1 { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; max-width: 1600px; overflow: visible; padding: 80px 80px 80px 20px; position: relative; width: 1px; }",
    ".framer-Zrdb3 .framer-15wq09l { align-content: flex-start; align-items: flex-start; align-self: stretch; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; height: auto; justify-content: space-between; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-Zrdb3 .framer-1ws7gm8 { align-content: flex-start; align-items: flex-start; align-self: stretch; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: auto; }",
    ".framer-Zrdb3 .framer-1986kyw-container { flex: none; height: 40px; position: relative; width: 40px; }",
    ".framer-Zrdb3 .framer-1x49ivz { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; opacity: 0.8; position: relative; white-space: pre-wrap; width: 290px; word-break: break-word; word-wrap: break-word; }",
    ".framer-Zrdb3 .framer-co6105 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 2; }",
    ".framer-Zrdb3 .framer-qx87jz { flex: none; height: 24px; opacity: 0.5; overflow: visible; position: relative; text-decoration: none; width: 24px; }",
    ".framer-Zrdb3 .framer-1kf1vvj, .framer-Zrdb3 .framer-1orp4ym, .framer-Zrdb3 .framer-62macw, .framer-Zrdb3 .framer-2bwtrl { flex: none; height: 24px; left: calc(50.00000000000002% - 24px / 2); position: absolute; top: calc(50.00000000000002% - 24px / 2); width: 24px; }",
    ".framer-Zrdb3 .framer-1ld69fm, .framer-Zrdb3 .framer-9m8owv, .framer-Zrdb3 .framer-15ddgct, .framer-Zrdb3 .framer-1h92yyb, .framer-Zrdb3 .framer-b0rly { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 24px); opacity: 0.5; overflow: visible; position: relative; text-decoration: none; width: 24px; }",
    ".framer-Zrdb3 .framer-9w351h { flex: none; height: 24px; position: absolute; right: 0px; top: calc(50.00000000000002% - 24px / 2); width: 24px; }",
    ".framer-Zrdb3 .framer-1f86jge { flex: none; height: 24px; left: calc(54.166666666666686% - 24px / 2); position: absolute; top: calc(50.00000000000002% - 24px / 2); width: 24px; }",
    ".framer-Zrdb3 .framer-kfd6as { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 80px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-Zrdb3 .framer-namtvw, .framer-Zrdb3 .framer-1pvmw9q, .framer-Zrdb3 .framer-947wac, .framer-Zrdb3 .framer-vgf1ku { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 2; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-Zrdb3.framer-6t96s3, .framer-Zrdb3 .framer-4ope2u, .framer-Zrdb3 .framer-cx3k8l, .framer-Zrdb3 .framer-woqt8f, .framer-Zrdb3 .framer-wxlu6y, .framer-Zrdb3 .framer-dg5e1x, .framer-Zrdb3 .framer-1c3xe56, .framer-Zrdb3 .framer-mhhymn, .framer-Zrdb3 .framer-ht6ktm, .framer-Zrdb3 .framer-1han8ud, .framer-Zrdb3 .framer-noqn37, .framer-Zrdb3 .framer-18i8gm7, .framer-Zrdb3 .framer-1bidf82, .framer-Zrdb3 .framer-q09ih6, .framer-Zrdb3 .framer-1c1ypq0, .framer-Zrdb3 .framer-5dhk5c, .framer-Zrdb3 .framer-4ycmxk, .framer-Zrdb3 .framer-1h02tdf, .framer-Zrdb3 .framer-hjwtzt, .framer-Zrdb3 .framer-acg8fm, .framer-Zrdb3 .framer-1f54332, .framer-Zrdb3 .framer-12dg66y, .framer-Zrdb3 .framer-1pw6z08, .framer-Zrdb3 .framer-1dd0hkt, .framer-Zrdb3 .framer-1g75qq1, .framer-Zrdb3 .framer-3ek2ar, .framer-Zrdb3 .framer-1i4qayq, .framer-Zrdb3 .framer-1r3nvrv, .framer-Zrdb3 .framer-1xfoud, .framer-Zrdb3 .framer-1utt5jd, .framer-Zrdb3 .framer-xzfbyn, .framer-Zrdb3 .framer-rttdj0, .framer-Zrdb3 .framer-gq7wpd, .framer-Zrdb3 .framer-1k8g8t, .framer-Zrdb3 .framer-1kpsy9i, .framer-Zrdb3 .framer-3a6ypp, .framer-Zrdb3 .framer-1hjtlqe, .framer-Zrdb3 .framer-1x7lfs8, .framer-Zrdb3 .framer-123gfcs, .framer-Zrdb3 .framer-1tuuztk, .framer-Zrdb3 .framer-mmmpg2, .framer-Zrdb3 .framer-66ftot, .framer-Zrdb3 .framer-1rwayw9, .framer-Zrdb3 .framer-1kgs4b4, .framer-Zrdb3 .framer-16qjhe3, .framer-Zrdb3 .framer-b4s9ye, .framer-Zrdb3 .framer-lpuq9d, .framer-Zrdb3 .framer-1ws7gm8, .framer-Zrdb3 .framer-co6105, .framer-Zrdb3 .framer-kfd6as, .framer-Zrdb3 .framer-namtvw, .framer-Zrdb3 .framer-1pvmw9q, .framer-Zrdb3 .framer-947wac, .framer-Zrdb3 .framer-vgf1ku { gap: 0px; } .framer-Zrdb3.framer-6t96s3 > * { margin: 0px; margin-bottom: calc(0px / 2); margin-top: calc(0px / 2); } .framer-Zrdb3.framer-6t96s3 > :first-child, .framer-Zrdb3 .framer-woqt8f > :first-child, .framer-Zrdb3 .framer-dg5e1x > :first-child, .framer-Zrdb3 .framer-q09ih6 > :first-child, .framer-Zrdb3 .framer-1c1ypq0 > :first-child, .framer-Zrdb3 .framer-5dhk5c > :first-child, .framer-Zrdb3 .framer-4ycmxk > :first-child, .framer-Zrdb3 .framer-1h02tdf > :first-child, .framer-Zrdb3 .framer-acg8fm > :first-child, .framer-Zrdb3 .framer-12dg66y > :first-child, .framer-Zrdb3 .framer-1pw6z08 > :first-child, .framer-Zrdb3 .framer-1g75qq1 > :first-child, .framer-Zrdb3 .framer-3ek2ar > :first-child, .framer-Zrdb3 .framer-1i4qayq > :first-child, .framer-Zrdb3 .framer-1xfoud > :first-child, .framer-Zrdb3 .framer-xzfbyn > :first-child, .framer-Zrdb3 .framer-rttdj0 > :first-child, .framer-Zrdb3 .framer-1k8g8t > :first-child, .framer-Zrdb3 .framer-1kpsy9i > :first-child, .framer-Zrdb3 .framer-1hjtlqe > :first-child, .framer-Zrdb3 .framer-1x7lfs8 > :first-child, .framer-Zrdb3 .framer-123gfcs > :first-child, .framer-Zrdb3 .framer-mmmpg2 > :first-child, .framer-Zrdb3 .framer-66ftot > :first-child, .framer-Zrdb3 .framer-1rwayw9 > :first-child, .framer-Zrdb3 .framer-1kgs4b4 > :first-child, .framer-Zrdb3 .framer-16qjhe3 > :first-child, .framer-Zrdb3 .framer-1ws7gm8 > :first-child, .framer-Zrdb3 .framer-namtvw > :first-child, .framer-Zrdb3 .framer-1pvmw9q > :first-child, .framer-Zrdb3 .framer-947wac > :first-child, .framer-Zrdb3 .framer-vgf1ku > :first-child { margin-top: 0px; } .framer-Zrdb3.framer-6t96s3 > :last-child, .framer-Zrdb3 .framer-woqt8f > :last-child, .framer-Zrdb3 .framer-dg5e1x > :last-child, .framer-Zrdb3 .framer-q09ih6 > :last-child, .framer-Zrdb3 .framer-1c1ypq0 > :last-child, .framer-Zrdb3 .framer-5dhk5c > :last-child, .framer-Zrdb3 .framer-4ycmxk > :last-child, .framer-Zrdb3 .framer-1h02tdf > :last-child, .framer-Zrdb3 .framer-acg8fm > :last-child, .framer-Zrdb3 .framer-12dg66y > :last-child, .framer-Zrdb3 .framer-1pw6z08 > :last-child, .framer-Zrdb3 .framer-1g75qq1 > :last-child, .framer-Zrdb3 .framer-3ek2ar > :last-child, .framer-Zrdb3 .framer-1i4qayq > :last-child, .framer-Zrdb3 .framer-1xfoud > :last-child, .framer-Zrdb3 .framer-xzfbyn > :last-child, .framer-Zrdb3 .framer-rttdj0 > :last-child, .framer-Zrdb3 .framer-1k8g8t > :last-child, .framer-Zrdb3 .framer-1kpsy9i > :last-child, .framer-Zrdb3 .framer-1hjtlqe > :last-child, .framer-Zrdb3 .framer-1x7lfs8 > :last-child, .framer-Zrdb3 .framer-123gfcs > :last-child, .framer-Zrdb3 .framer-mmmpg2 > :last-child, .framer-Zrdb3 .framer-66ftot > :last-child, .framer-Zrdb3 .framer-1rwayw9 > :last-child, .framer-Zrdb3 .framer-1kgs4b4 > :last-child, .framer-Zrdb3 .framer-16qjhe3 > :last-child, .framer-Zrdb3 .framer-1ws7gm8 > :last-child, .framer-Zrdb3 .framer-namtvw > :last-child, .framer-Zrdb3 .framer-1pvmw9q > :last-child, .framer-Zrdb3 .framer-947wac > :last-child, .framer-Zrdb3 .framer-vgf1ku > :last-child { margin-bottom: 0px; } .framer-Zrdb3 .framer-4ope2u > *, .framer-Zrdb3 .framer-ht6ktm > *, .framer-Zrdb3 .framer-noqn37 > *, .framer-Zrdb3 .framer-18i8gm7 > *, .framer-Zrdb3 .framer-1bidf82 > * { margin: 0px; margin-left: calc(6px / 2); margin-right: calc(6px / 2); } .framer-Zrdb3 .framer-4ope2u > :first-child, .framer-Zrdb3 .framer-cx3k8l > :first-child, .framer-Zrdb3 .framer-wxlu6y > :first-child, .framer-Zrdb3 .framer-1c3xe56 > :first-child, .framer-Zrdb3 .framer-mhhymn > :first-child, .framer-Zrdb3 .framer-ht6ktm > :first-child, .framer-Zrdb3 .framer-1han8ud > :first-child, .framer-Zrdb3 .framer-noqn37 > :first-child, .framer-Zrdb3 .framer-18i8gm7 > :first-child, .framer-Zrdb3 .framer-1bidf82 > :first-child, .framer-Zrdb3 .framer-hjwtzt > :first-child, .framer-Zrdb3 .framer-1f54332 > :first-child, .framer-Zrdb3 .framer-1dd0hkt > :first-child, .framer-Zrdb3 .framer-1r3nvrv > :first-child, .framer-Zrdb3 .framer-1utt5jd > :first-child, .framer-Zrdb3 .framer-gq7wpd > :first-child, .framer-Zrdb3 .framer-3a6ypp > :first-child, .framer-Zrdb3 .framer-1tuuztk > :first-child, .framer-Zrdb3 .framer-b4s9ye > :first-child, .framer-Zrdb3 .framer-lpuq9d > :first-child, .framer-Zrdb3 .framer-co6105 > :first-child, .framer-Zrdb3 .framer-kfd6as > :first-child { margin-left: 0px; } .framer-Zrdb3 .framer-4ope2u > :last-child, .framer-Zrdb3 .framer-cx3k8l > :last-child, .framer-Zrdb3 .framer-wxlu6y > :last-child, .framer-Zrdb3 .framer-1c3xe56 > :last-child, .framer-Zrdb3 .framer-mhhymn > :last-child, .framer-Zrdb3 .framer-ht6ktm > :last-child, .framer-Zrdb3 .framer-1han8ud > :last-child, .framer-Zrdb3 .framer-noqn37 > :last-child, .framer-Zrdb3 .framer-18i8gm7 > :last-child, .framer-Zrdb3 .framer-1bidf82 > :last-child, .framer-Zrdb3 .framer-hjwtzt > :last-child, .framer-Zrdb3 .framer-1f54332 > :last-child, .framer-Zrdb3 .framer-1dd0hkt > :last-child, .framer-Zrdb3 .framer-1r3nvrv > :last-child, .framer-Zrdb3 .framer-1utt5jd > :last-child, .framer-Zrdb3 .framer-gq7wpd > :last-child, .framer-Zrdb3 .framer-3a6ypp > :last-child, .framer-Zrdb3 .framer-1tuuztk > :last-child, .framer-Zrdb3 .framer-b4s9ye > :last-child, .framer-Zrdb3 .framer-lpuq9d > :last-child, .framer-Zrdb3 .framer-co6105 > :last-child, .framer-Zrdb3 .framer-kfd6as > :last-child { margin-right: 0px; } .framer-Zrdb3 .framer-cx3k8l > *, .framer-Zrdb3 .framer-wxlu6y > *, .framer-Zrdb3 .framer-1f54332 > *, .framer-Zrdb3 .framer-1dd0hkt > *, .framer-Zrdb3 .framer-b4s9ye > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-Zrdb3 .framer-woqt8f > *, .framer-Zrdb3 .framer-dg5e1x > *, .framer-Zrdb3 .framer-acg8fm > *, .framer-Zrdb3 .framer-1pw6z08 > *, .framer-Zrdb3 .framer-1xfoud > *, .framer-Zrdb3 .framer-rttdj0 > *, .framer-Zrdb3 .framer-1kpsy9i > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-Zrdb3 .framer-1c3xe56 > * { margin: 0px; margin-left: calc(50px / 2); margin-right: calc(50px / 2); } .framer-Zrdb3 .framer-mhhymn > *, .framer-Zrdb3 .framer-1han8ud > * { margin: 0px; margin-left: calc(8px / 2); margin-right: calc(8px / 2); } .framer-Zrdb3 .framer-q09ih6 > *, .framer-Zrdb3 .framer-3ek2ar > *, .framer-Zrdb3 .framer-1kgs4b4 > * { margin: 0px; margin-bottom: calc(40px / 2); margin-top: calc(40px / 2); } .framer-Zrdb3 .framer-1c1ypq0 > *, .framer-Zrdb3 .framer-1h02tdf > *, .framer-Zrdb3 .framer-1i4qayq > *, .framer-Zrdb3 .framer-xzfbyn > *, .framer-Zrdb3 .framer-1k8g8t > *, .framer-Zrdb3 .framer-1hjtlqe > *, .framer-Zrdb3 .framer-123gfcs > *, .framer-Zrdb3 .framer-mmmpg2 > *, .framer-Zrdb3 .framer-66ftot > *, .framer-Zrdb3 .framer-1rwayw9 > *, .framer-Zrdb3 .framer-16qjhe3 > *, .framer-Zrdb3 .framer-1ws7gm8 > *, .framer-Zrdb3 .framer-namtvw > *, .framer-Zrdb3 .framer-1pvmw9q > *, .framer-Zrdb3 .framer-947wac > *, .framer-Zrdb3 .framer-vgf1ku > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-Zrdb3 .framer-5dhk5c > *, .framer-Zrdb3 .framer-12dg66y > *, .framer-Zrdb3 .framer-1g75qq1 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-Zrdb3 .framer-4ycmxk > *, .framer-Zrdb3 .framer-1x7lfs8 > * { margin: 0px; margin-bottom: calc(60px / 2); margin-top: calc(60px / 2); } .framer-Zrdb3 .framer-hjwtzt > *, .framer-Zrdb3 .framer-1r3nvrv > *, .framer-Zrdb3 .framer-co6105 > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } .framer-Zrdb3 .framer-1utt5jd > *, .framer-Zrdb3 .framer-gq7wpd > *, .framer-Zrdb3 .framer-3a6ypp > * { margin: 0px; margin-left: calc(4px / 2); margin-right: calc(4px / 2); } .framer-Zrdb3 .framer-1tuuztk > * { margin: 0px; margin-left: calc(0px / 2); margin-right: calc(0px / 2); } .framer-Zrdb3 .framer-lpuq9d > * { margin: 0px; margin-left: calc(60px / 2); margin-right: calc(60px / 2); } .framer-Zrdb3 .framer-kfd6as > * { margin: 0px; margin-left: calc(80px / 2); margin-right: calc(80px / 2); } }",
    "@media (min-width: 1200px) { .framer-Zrdb3 .hidden-6t96s3 { display: none !important; } }",
    `@media (min-width: 810px) and (max-width: 1199px) { .framer-Zrdb3 .hidden-1cam4o5 { display: none !important; } .${Rr.bodyClassName}-framer-Zrdb3 { background: white; } .framer-Zrdb3.framer-6t96s3 { width: 810px; } .framer-Zrdb3 .framer-cx3k8l { padding: 170px 40px 120px 40px; } .framer-Zrdb3 .framer-1mrulq4 { align-content: center; align-items: center; gap: 40px; justify-content: flex-start; } .framer-Zrdb3 .framer-11y2b10 { flex: none; width: 35%; } .framer-Zrdb3 .framer-1f7jeqz { height: var(--framer-aspect-ratio-supported, 561px); left: unset; right: -220px; top: 51%; transform: translateY(-50%) rotate(-163deg); width: 561px; } .framer-Zrdb3 .framer-1of1rfa { height: var(--framer-aspect-ratio-supported, 214px); left: -148px; top: -128px; width: 214px; } .framer-Zrdb3 .framer-fzqp3k { bottom: -182px; height: var(--framer-aspect-ratio-supported, 220px); right: -176px; width: 220px; } .framer-Zrdb3 .framer-19nvram { height: var(--framer-aspect-ratio-supported, 453px); } .framer-Zrdb3 .framer-15swlg5 { grid-template-columns: repeat(2, minmax(200px, 1fr)); } .framer-Zrdb3 .framer-1f54332, .framer-Zrdb3 .framer-1dd0hkt { height: var(--framer-aspect-ratio-supported, 211px); } .framer-Zrdb3 .framer-hljstx, .framer-Zrdb3 .framer-1vwy77n { width: var(--framer-aspect-ratio-supported, 222px); } .framer-Zrdb3 .framer-kw4ubu { max-width: 340px; } .framer-Zrdb3 .framer-1r3nvrv { align-content: center; align-items: center; flex-direction: column; } .framer-Zrdb3 .framer-1xfoud, .framer-Zrdb3 .framer-rttdj0, .framer-Zrdb3 .framer-1kpsy9i { flex: none; width: 100%; } .framer-Zrdb3 .framer-1brorf1 { align-content: flex-start; align-items: flex-start; flex-direction: column; gap: 40px; justify-content: flex-start; } .framer-Zrdb3 .framer-15wq09l { align-self: unset; gap: 30px; height: min-content; justify-content: flex-start; width: 100%; } .framer-Zrdb3 .framer-1ws7gm8 { align-self: unset; width: 288px; } .framer-Zrdb3 .framer-kfd6as { gap: unset; justify-content: space-between; width: 100%; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-Zrdb3 .framer-1mrulq4, .framer-Zrdb3 .framer-1r3nvrv, .framer-Zrdb3 .framer-1brorf1, .framer-Zrdb3 .framer-15wq09l, .framer-Zrdb3 .framer-kfd6as { gap: 0px; } .framer-Zrdb3 .framer-1mrulq4 > * { margin: 0px; margin-left: calc(40px / 2); margin-right: calc(40px / 2); } .framer-Zrdb3 .framer-1mrulq4 > :first-child { margin-left: 0px; } .framer-Zrdb3 .framer-1mrulq4 > :last-child { margin-right: 0px; } .framer-Zrdb3 .framer-1r3nvrv > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-Zrdb3 .framer-1r3nvrv > :first-child, .framer-Zrdb3 .framer-1brorf1 > :first-child, .framer-Zrdb3 .framer-15wq09l > :first-child { margin-top: 0px; } .framer-Zrdb3 .framer-1r3nvrv > :last-child, .framer-Zrdb3 .framer-1brorf1 > :last-child, .framer-Zrdb3 .framer-15wq09l > :last-child { margin-bottom: 0px; } .framer-Zrdb3 .framer-1brorf1 > * { margin: 0px; margin-bottom: calc(40px / 2); margin-top: calc(40px / 2); } .framer-Zrdb3 .framer-15wq09l > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-Zrdb3 .framer-kfd6as > *, .framer-Zrdb3 .framer-kfd6as > :first-child, .framer-Zrdb3 .framer-kfd6as > :last-child { margin: 0px; } }}`,
    `@media (max-width: 809px) { .framer-Zrdb3 .hidden-1sysy87 { display: none !important; } .${Rr.bodyClassName}-framer-Zrdb3 { background: white; } .framer-Zrdb3.framer-6t96s3 { width: 390px; } .framer-Zrdb3 .framer-cx3k8l { flex-direction: column; padding: 150px 20px 80px 20px; } .framer-Zrdb3 .framer-1mrulq4 { flex: none; flex-direction: column; gap: 60px; justify-content: flex-start; width: 100%; } .framer-Zrdb3 .framer-woqt8f, .framer-Zrdb3 .framer-1xfoud, .framer-Zrdb3 .framer-rttdj0, .framer-Zrdb3 .framer-1kpsy9i { flex: none; width: 100%; } .framer-Zrdb3 .framer-11y2b10 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; padding: 0px 0px 0px 0px; width: 100%; } .framer-Zrdb3 .framer-1f7jeqz { height: var(--framer-aspect-ratio-supported, 200px); left: unset; position: relative; right: unset; top: unset; width: 100%; } .framer-Zrdb3 .framer-q09ih6, .framer-Zrdb3 .framer-3ek2ar, .framer-Zrdb3 .framer-1kgs4b4 { padding: 40px 20px 40px 20px; } .framer-Zrdb3 .framer-19nvram { height: var(--framer-aspect-ratio-supported, 124px); } .framer-Zrdb3 .framer-15swlg5 { grid-template-columns: repeat(1, minmax(200px, 1fr)); } .framer-Zrdb3 .framer-4ycmxk, .framer-Zrdb3 .framer-1x7lfs8 { gap: 40px; padding: 40px 20px 40px 20px; } .framer-Zrdb3 .framer-hjwtzt, .framer-Zrdb3 .framer-1r3nvrv { flex-direction: column; } .framer-Zrdb3 .framer-acg8fm, .framer-Zrdb3 .framer-1pw6z08 { flex: none; padding: 20px 20px 20px 20px; width: 100%; } .framer-Zrdb3 .framer-1f54332, .framer-Zrdb3 .framer-1dd0hkt { height: var(--framer-aspect-ratio-supported, 153px); } .framer-Zrdb3 .framer-hljstx, .framer-Zrdb3 .framer-1vwy77n { width: var(--framer-aspect-ratio-supported, 210px); } .framer-Zrdb3 .framer-lpuq9d { padding: 20px 20px 20px 20px; } .framer-Zrdb3 .framer-1brorf1 { flex-direction: column; gap: 40px; justify-content: flex-start; } .framer-Zrdb3 .framer-15wq09l { align-self: unset; gap: 20px; height: min-content; justify-content: flex-start; width: 100%; } .framer-Zrdb3 .framer-1ws7gm8 { align-self: unset; width: 100%; } .framer-Zrdb3 .framer-1x49ivz { width: 100%; } .framer-Zrdb3 .framer-kfd6as { flex-direction: column; gap: 30px; width: 100%; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-Zrdb3 .framer-cx3k8l, .framer-Zrdb3 .framer-1mrulq4, .framer-Zrdb3 .framer-11y2b10, .framer-Zrdb3 .framer-4ycmxk, .framer-Zrdb3 .framer-hjwtzt, .framer-Zrdb3 .framer-1r3nvrv, .framer-Zrdb3 .framer-1x7lfs8, .framer-Zrdb3 .framer-1brorf1, .framer-Zrdb3 .framer-15wq09l, .framer-Zrdb3 .framer-kfd6as { gap: 0px; } .framer-Zrdb3 .framer-cx3k8l > *, .framer-Zrdb3 .framer-11y2b10 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-Zrdb3 .framer-cx3k8l > :first-child, .framer-Zrdb3 .framer-1mrulq4 > :first-child, .framer-Zrdb3 .framer-11y2b10 > :first-child, .framer-Zrdb3 .framer-4ycmxk > :first-child, .framer-Zrdb3 .framer-hjwtzt > :first-child, .framer-Zrdb3 .framer-1r3nvrv > :first-child, .framer-Zrdb3 .framer-1x7lfs8 > :first-child, .framer-Zrdb3 .framer-1brorf1 > :first-child, .framer-Zrdb3 .framer-15wq09l > :first-child, .framer-Zrdb3 .framer-kfd6as > :first-child { margin-top: 0px; } .framer-Zrdb3 .framer-cx3k8l > :last-child, .framer-Zrdb3 .framer-1mrulq4 > :last-child, .framer-Zrdb3 .framer-11y2b10 > :last-child, .framer-Zrdb3 .framer-4ycmxk > :last-child, .framer-Zrdb3 .framer-hjwtzt > :last-child, .framer-Zrdb3 .framer-1r3nvrv > :last-child, .framer-Zrdb3 .framer-1x7lfs8 > :last-child, .framer-Zrdb3 .framer-1brorf1 > :last-child, .framer-Zrdb3 .framer-15wq09l > :last-child, .framer-Zrdb3 .framer-kfd6as > :last-child { margin-bottom: 0px; } .framer-Zrdb3 .framer-1mrulq4 > * { margin: 0px; margin-bottom: calc(60px / 2); margin-top: calc(60px / 2); } .framer-Zrdb3 .framer-4ycmxk > *, .framer-Zrdb3 .framer-1x7lfs8 > *, .framer-Zrdb3 .framer-1brorf1 > * { margin: 0px; margin-bottom: calc(40px / 2); margin-top: calc(40px / 2); } .framer-Zrdb3 .framer-hjwtzt > *, .framer-Zrdb3 .framer-1r3nvrv > *, .framer-Zrdb3 .framer-15wq09l > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-Zrdb3 .framer-kfd6as > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } }}`,
    ...xe,
    ...Te,
    ...Le,
    ..._e,
    ...ze,
    ...Ze,
    ...we,
  ],
  sr = le(Ta, Wa, "framer-Zrdb3"),
  dt = sr;
sr.displayName = "Page";
sr.defaultProps = { height: 6656.5, width: 1200 };
pe(sr, [
  {
    family: "Satoshi",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2",
    weight: "700",
  },
  {
    family: "Switzer",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/Y7SCNZJOT2MW5ADSGOFLDGH4TNL4JCQY.woff2",
    weight: "700",
  },
  {
    family: "Chillax",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/THF5L6EHVL4N4NNE3GYDZNZSHABL5CH5.woff2",
    weight: "600",
  },
  {
    family: "Panchang",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/EE3DYKUPHF3W5SWXFO53CRP5KMNTTNTH.woff2",
    weight: "700",
  },
  {
    family: "Chillax",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/T2KA2X72VGASVXFVB7QCOIFYVH5GZJTW.woff2",
    weight: "700",
  },
  ...ma,
  ...sa,
  ...la,
  ...fa,
  ...da,
  ...ca,
  ...pa,
  ...ha,
  ...ga,
  ...xa,
  ...ge,
  ...Fe,
  ...Se,
  ...ke,
  ...qe,
  ...ve,
  ...ue,
]);
var ct = {
  exports: {
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    default: {
      type: "reactComponent",
      name: "FramerIilknqsQI",
      slots: [],
      annotations: {
        framerContractVersion: "1",
        framerIntrinsicHeight: "6656.5",
        framerResponsiveScreen: "",
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"JSHnK5hFh":{"layout":["fixed","auto"]},"Hw_19DBJP":{"layout":["fixed","auto"]}}}',
        framerIntrinsicWidth: "1200",
        framerImmutableVariables: "true",
        framerDisplayContentsDiv: "false",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
export { ct as __FramerMetadata__, dt as default };
//# sourceMappingURL=JmSSfF7yGld6eTQ6-xWo7jC98GeP0Bso_oxFSkrp-Vw.76K4NQNL.mjs.map
