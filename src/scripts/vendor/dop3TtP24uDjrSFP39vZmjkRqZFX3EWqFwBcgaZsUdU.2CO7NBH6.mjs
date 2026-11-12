import { a as Be } from "./chunk-XXG5K7CH.mjs";
import { a as Hr, b as Jr, c as Or } from "./chunk-UD35GX3A.mjs";
import { a as h } from "./chunk-OLXWMHQS.mjs";
import { a as Cr } from "./chunk-APGM2C5T.mjs";
import { a as Nr, b as Sr, c as Ir } from "./chunk-D5CSMFZ4.mjs";
import { a as Pr, b as Lr, c as jr } from "./chunk-ALFWC2ON.mjs";
import { b as e, c as a } from "./chunk-OO3TPEBQ.mjs";
import {
  A as ie,
  B as wr,
  E as xr,
  K as yr,
  N as De,
  P as t,
  S as kr,
  V as Fe,
  Y as p,
  Z as vr,
  _ as br,
  aa as Mr,
  b as Te,
  c as s,
  d as dr,
  f as cr,
  g as ye,
  i as pr,
  k as E,
  l as hr,
  m as me,
  ma as zr,
  n as ur,
  o as ae,
  p as H,
  ra as W,
  t as n,
  ta as A,
  ua as l,
  v as ke,
  va as Zr,
  w as gr,
  wa as Re,
  x as _,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var ve = () => typeof document == "object";
function St() {
  if (ve()) {
    if (typeof document.hidden < "u") return "visibilitychange";
    if (typeof document.msHidden < "u") return "msvisibilitychange";
    if (typeof document.webkitHidden < "u") return "webkitvisibilitychange";
  }
}
function It() {
  if (ve()) {
    if (typeof document.hidden < "u") return "hidden";
    if (typeof document.msHidden < "u") return "msHidden";
    if (typeof document.webkitHidden < "u") return "webkitHidden";
  }
}
function Tr() {
  if (ve()) return !document[It()];
}
function Br() {
  if (!ve()) return;
  let [r, o] = H(Tr()),
    g = () => o(Tr());
  return (
    E(() => {
      let f = St();
      return (
        document.addEventListener(f, g, !1),
        () => {
          document.removeEventListener(f, g);
        }
      );
    }),
    r
  );
}
function u(r) {
  let {
      slots: o,
      startFrom: g,
      direction: f,
      effectsOptions: b,
      autoPlayControl: Z,
      dragControl: P,
      alignment: q,
      gap: w,
      padding: m,
      paddingPerSide: L,
      paddingTop: C,
      paddingRight: ne,
      paddingBottom: R,
      paddingLeft: k,
      itemAmount: N,
      fadeOptions: B,
      intervalControl: J,
      transitionControl: v,
      arrowOptions: j,
      borderRadius: U,
      progressOptions: fe,
      style: Me,
    } = r,
    {
      effectsOpacity: O,
      effectsScale: ze,
      effectsRotate: de,
      effectsPerspective: Ze,
      effectsHover: ce,
    } = b,
    { fadeContent: Y, overflow: pe, fadeWidth: T, fadeInset: X, fadeAlpha: _e } = B,
    {
      showMouseControls: qe,
      arrowSize: V,
      arrowRadius: Ee,
      arrowFill: We,
      leftArrow: Er,
      rightArrow: Wr,
      arrowShouldSpace: Q = !0,
      arrowShouldFadeIn: Ae = !1,
      arrowPosition: M,
      arrowPadding: oe,
      arrowGap: Ar,
      arrowPaddingTop: Ur,
      arrowPaddingRight: Yr,
      arrowPaddingBottom: Xr,
      arrowPaddingLeft: Qr,
    } = j,
    {
      showProgressDots: Gr,
      dotSize: Ue,
      dotsInset: Ye,
      dotsRadius: Kr,
      dotsPadding: $r,
      dotsGap: et,
      dotsFill: rt,
      dotsBackground: tt,
      dotsActiveOpacity: at,
      dotsOpacity: it,
      dotsBlur: Xe,
    } = fe,
    nt = L ? `${C}px ${ne}px ${R}px ${k}px` : `${m}px`,
    D = De.current() === De.canvas,
    G = Te.count(o) > 0,
    d = f === "left" || f === "right",
    he = f === "right" || f === "bottom";
  if (!G)
    return a("section", {
      style: Pt,
      children: [
        e("div", { style: Lt, children: "\u2B50\uFE0F" }),
        e("p", { style: jt, children: "Connect to Content" }),
        e("p", {
          style: Ht,
          children: "Add layers or components to make infinite auto-playing slideshows.",
        }),
      ],
    });
  let se = ae(null),
    x = ur(() => o.map((i) => cr()), [o]),
    Ce = ae(void 0),
    [c, ot] = H({ parent: null, children: null, item: null, itemWidth: null, itemHeight: null }),
    [st, Qe] = H(!1),
    [lt, Ge] = H(Z),
    [mt, Ke] = H(!1),
    [K, $e] = H(!1),
    Ne = [],
    er = 4;
  D && (er = 1);
  let rr = pr(() => {
    xr.read(() => {
      if (G && se.current) {
        let i = o.length - 1,
          I = d ? se.current.offsetWidth : se.current.offsetHeight,
          z = x[0].current ? (d ? x[0].current.offsetLeft : x[0].current.offsetTop) : 0,
          te =
            (x[i].current
              ? d
                ? x[i].current.offsetLeft + x[i].current.offsetWidth
                : x[i].current.offsetTop + x[i].current.offsetHeight
              : 0) -
            z +
            w,
          we = x[0].current ? (d ? x[0].current.offsetWidth : x[0].current.offsetHeight) : 0,
          Je = x[0].current ? x[0].current.offsetWidth : 0,
          Oe = x[0].current ? x[0].current.offsetHeight : 0;
        ot({ parent: I, children: te, item: we, itemWidth: Je, itemHeight: Oe });
      }
    });
  }, [G]);
  me(() => {
    G && rr();
  }, [G, N]);
  let Se = ae(!0);
  (E(
    () =>
      Cr(se.current, ({ contentSize: i }) => {
        (!Se.current && (i.width || i.height) && (rr(), $e(!0)), (Se.current = !1));
      }),
    []
  ),
    E(() => {
      if (K) {
        let i = setTimeout(() => $e(!1), 500);
        return () => clearTimeout(i);
      }
    }, [K]));
  let $ = o?.length,
    ue = D ? 0 : c?.children,
    Ie = c?.item + w,
    ft = g * Ie,
    [S, le] = H(g + $),
    [dt, tr] = H(!1),
    ar = Br(),
    ir = he ? 1 : -1,
    ee = gr(ue),
    nr = d ? -g * (c?.itemWidth + w) : -g * (c?.itemHeight + w),
    Pe = () => ir * S * Ie,
    Le = D
      ? 0
      : _(ee, (i) => {
          let I = ie(-ue, -ue * 2, i);
          return isNaN(I) ? 0 : I;
        }),
    ct = ie(0, $, S),
    pt = ie(0, -$, S);
  me(() => {
    c?.children !== null && !Se.current && K && ee.set(Pe());
  }, [c, ue, ir, ft, S, Ie, K]);
  let or = () => {
      D ||
        !G ||
        !c.parent ||
        dt ||
        (ee.get() !== Pe() && wr(ee, Pe(), v),
        Z &&
          lt &&
          (Ce.current = setTimeout(() => {
            (le(S + 1), or());
          }, J * 1e3)));
    },
    re = (i) => {
      le(he ? S - i : S + i);
    },
    ht = (i) => {
      let I = ie(0, $, S),
        z = ie(0, -$, S),
        F = i - I,
        te = i - Math.abs(z);
      le(he ? S - te : S + F);
    },
    ut = () => {
      tr(!0);
    },
    gt = (i, { offset: I, velocity: z }) => {
      tr(!1);
      let F = d ? I.x : I.y,
        te = 200,
        we = d ? z.x : z.y,
        Je = F < -c.item / 2,
        Oe = F > c.item / 2,
        Nt = Math.abs(F),
        xe = Math.round(Nt / c.item),
        fr = xe === 0 ? 1 : xe;
      we > te ? re(-fr) : we < -te ? re(fr) : (Je && re(xe), Oe && re(-xe));
    };
  E(() => {
    if (!(!ar || K)) return (or(), () => Ce.current && clearTimeout(Ce.current));
  }, [Ne, ar, K]);
  let wt = 0,
    sr = `calc(${100 / N}% - ${w}px + ${w / N}px)`;
  for (let i = 0; i < er; i++)
    Ne.push(
      ...Te.map(o, (I, z) => {
        let F;
        return (
          z === 0 && (F = x[0]),
          z === o.length - 1 && (F = x[1]),
          e(
            Tt,
            {
              ref: x[z],
              slideKey: i + z + "lg",
              index: i,
              width: d && N > 1 ? sr : "100%",
              height: d ? "100%" : N > 1 ? sr : "100%",
              size: c,
              child: I,
              numChildren: o?.length,
              wrappedValue: Le,
              childCounter: wt++,
              gap: w,
              isCanvas: D,
              isHorizontal: d,
              effectsOpacity: O,
              effectsScale: ze,
              effectsRotate: de,
              children: i + z,
            },
            i + z + "lg"
          )
        );
      })
    );
  let xt = d ? "to right" : "to bottom",
    lr = T / 2,
    yt = 100 - T / 2,
    kt = Ot(X, 0, lr),
    vt = 100 - X,
    je = `linear-gradient(${xt}, rgba(0, 0, 0, ${_e}) ${kt}%, rgba(0, 0, 0, 1) ${lr}%, rgba(0, 0, 0, 1) ${yt}%, rgba(0, 0, 0, ${_e}) ${vt}%)`,
    He = [],
    ge = {};
  if (Gr) {
    for (let i = 0; i < o?.length; i++)
      He.push(
        e(
          Dt,
          {
            dotStyle: { ...Rt, width: Ue, height: Ue, backgroundColor: rt },
            buttonStyle: Ve,
            selectedOpacity: at,
            opacity: it,
            onClick: () => ht(i),
            wrappedIndex: ct,
            wrappedIndexInverted: pt,
            total: $,
            index: i,
            gap: et,
            padding: $r,
            isHorizontal: d,
            isInverted: he,
          },
          i
        )
      );
    Xe > 0 &&
      (ge.backdropFilter = ge.WebkitBackdropFilter = ge.MozBackdropFilter = `blur(${Xe}px)`);
  }
  let bt = P
      ? {
          drag: d ? "x" : "y",
          onDragStart: ut,
          onDragEnd: gt,
          dragDirectionLock: !0,
          values: { x: ee, y: ee },
          dragMomentum: !1,
        }
      : {},
    Mt = M === "top-left" || M === "top-mid" || M === "top-right",
    zt = M === "bottom-left" || M === "bottom-mid" || M === "bottom-right",
    Zt = M === "top-left" || M === "bottom-left",
    Ct = M === "top-right" || M === "bottom-right",
    mr = M === "top-mid" || M === "bottom-mid" || M === "auto";
  return a("section", {
    style: {
      ...Vr,
      padding: nt,
      WebkitMaskImage: Y ? je : void 0,
      MozMaskImage: Y ? je : void 0,
      maskImage: Y ? je : void 0,
      opacity: c?.item !== null ? 1 : 0,
      userSelect: "none",
    },
    onMouseEnter: () => {
      (Qe(!0), ce || Ge(!1));
    },
    onMouseLeave: () => {
      (Qe(!1), ce || Ge(!0));
    },
    onMouseDown: (i) => {
      (i.preventDefault(), Ke(!0));
    },
    onMouseUp: () => Ke(!1),
    children: [
      e("div", {
        style: {
          width: "100%",
          height: "100%",
          margin: 0,
          padding: "inherit",
          position: "absolute",
          inset: 0,
          overflow: pe ? "visible" : "hidden",
          borderRadius: U,
          userSelect: "none",
          perspective: D ? "none" : Ze,
        },
        children: e(n.ul, {
          ref: se,
          ...bt,
          style: {
            ...Vr,
            gap: w,
            placeItems: q,
            x: d ? (D ? nr : Le) : 0,
            y: d ? 0 : D ? nr : Le,
            flexDirection: d ? "row" : "column",
            transformStyle: de !== 0 && !D ? "preserve-3d" : void 0,
            cursor: P ? (mt ? "grabbing" : "grab") : "auto",
            userSelect: "none",
            ...Me,
          },
          children: Ne,
        }),
      }),
      a("fieldset", {
        style: { ...Jt },
        "aria-label": "Slideshow pagination controls",
        className: "framer--slideshow-controls",
        children: [
          a(n.div, {
            style: {
              position: "absolute",
              display: "flex",
              flexDirection: d ? "row" : "column",
              justifyContent: Q ? "space-between" : "center",
              gap: Q ? "unset" : Ar,
              opacity: Ae ? 0 : 1,
              alignItems: "center",
              inset: oe,
              top: Q ? oe : Mt ? Ur : "unset",
              left: Q ? oe : Zt ? Qr : mr ? 0 : "unset",
              right: Q ? oe : Ct ? Yr : mr ? 0 : "unset",
              bottom: Q ? oe : zt ? Xr : "unset",
            },
            animate: Ae && { opacity: st ? 1 : 0 },
            transition: v,
            children: [
              e(n.button, {
                type: "button",
                style: {
                  ...Ve,
                  backgroundColor: We,
                  width: V,
                  height: V,
                  borderRadius: Ee,
                  rotate: d ? 0 : 90,
                  display: qe ? "block" : "none",
                  pointerEvents: "auto",
                },
                onClick: () => re(-1),
                "aria-label": "Previous",
                whileTap: { scale: 0.9 },
                transition: { duration: 0.15 },
                children: e("img", {
                  width: V,
                  height: V,
                  src: Er || "https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg",
                  alt: "Back Arrow",
                }),
              }),
              e(n.button, {
                type: "button",
                style: {
                  ...Ve,
                  backgroundColor: We,
                  width: V,
                  height: V,
                  borderRadius: Ee,
                  rotate: d ? 0 : 90,
                  display: qe ? "block" : "none",
                  pointerEvents: "auto",
                },
                onClick: () => re(1),
                "aria-label": "Next",
                whileTap: { scale: 0.9 },
                transition: { duration: 0.15 },
                children: e("img", {
                  width: V,
                  height: V,
                  src: Wr || "https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg",
                  alt: "Next Arrow",
                }),
              }),
            ],
          }),
          He.length > 1
            ? e("div", {
                style: {
                  ...Ft,
                  left: d ? "50%" : Ye,
                  top: d ? "unset" : "50%",
                  transform: d ? "translateX(-50%)" : "translateY(-50%)",
                  flexDirection: d ? "row" : "column",
                  bottom: d ? Ye : "unset",
                  borderRadius: Kr,
                  backgroundColor: tt,
                  userSelect: "none",
                  ...ge,
                },
                children: He,
              })
            : null,
        ],
      }),
    ],
  });
}
u.defaultProps = {
  direction: "left",
  dragControl: !1,
  startFrom: 0,
  itemAmount: 1,
  infinity: !0,
  gap: 10,
  padding: 10,
  autoPlayControl: !0,
  effectsOptions: {
    effectsOpacity: 1,
    effectsScale: 1,
    effectsRotate: 0,
    effectsPerspective: 1200,
    effectsHover: !0,
  },
  transitionControl: { type: "spring", stiffness: 200, damping: 40 },
  fadeOptions: { fadeContent: !1, overflow: !1, fadeWidth: 25, fadeAlpha: 0, fadeInset: 0 },
  arrowOptions: {
    showMouseControls: !0,
    arrowShouldFadeIn: !1,
    arrowShouldSpace: !0,
    arrowFill: "rgba(0,0,0,0.2)",
    arrowSize: 40,
  },
  progressOptions: { showProgressDots: !0 },
};
kr(u, {
  slots: { type: t.Array, title: "Content", control: { type: t.ComponentInstance } },
  direction: {
    type: t.Enum,
    title: "Direction",
    options: ["left", "right", "top", "bottom"],
    optionIcons: ["direction-left", "direction-right", "direction-up", "direction-down"],
    optionTitles: ["Left", "Right", "Top", "Bottom"],
    displaySegmentedControl: !0,
    defaultValue: u.defaultProps.direction,
  },
  autoPlayControl: { type: t.Boolean, title: "Auto Play", defaultValue: !0 },
  intervalControl: {
    type: t.Number,
    title: "Interval",
    defaultValue: 1.5,
    min: 0.5,
    max: 10,
    step: 0.1,
    displayStepper: !0,
    unit: "s",
    hidden: (r) => !r.autoPlayControl,
  },
  dragControl: { type: t.Boolean, title: "Draggable", defaultValue: !1 },
  startFrom: {
    type: t.Number,
    title: "Current",
    min: 0,
    max: 10,
    displayStepper: !0,
    defaultValue: u.defaultProps.startFrom,
  },
  effectsOptions: {
    type: t.Object,
    title: "Effects",
    controls: {
      effectsOpacity: {
        type: t.Number,
        title: "Opacity",
        defaultValue: u.defaultProps.effectsOptions.effectsOpacity,
        min: 0,
        max: 1,
        step: 0.01,
        displayStepper: !0,
      },
      effectsScale: {
        type: t.Number,
        title: "Scale",
        defaultValue: u.defaultProps.effectsOptions.effectsScale,
        min: 0,
        max: 1,
        step: 0.01,
        displayStepper: !0,
      },
      effectsPerspective: {
        type: t.Number,
        title: "Perspective",
        defaultValue: u.defaultProps.effectsOptions.effectsPerspective,
        min: 200,
        max: 2e3,
        step: 1,
      },
      effectsRotate: {
        type: t.Number,
        title: "Rotate",
        defaultValue: u.defaultProps.effectsOptions.effectsRotate,
        min: -180,
        max: 180,
        step: 1,
      },
      effectsHover: {
        type: t.Boolean,
        title: "On Hover",
        enabledTitle: "Play",
        disabledTitle: "Pause",
        defaultValue: u.defaultProps.effectsOptions.effectsHover,
      },
    },
  },
  alignment: {
    type: t.Enum,
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
  itemAmount: {
    type: t.Number,
    title: "Items",
    min: 1,
    max: 10,
    displayStepper: !0,
    defaultValue: u.defaultProps.itemAmount,
  },
  gap: { type: t.Number, title: "Gap", min: 0 },
  padding: {
    title: "Padding",
    type: t.FusedNumber,
    toggleKey: "paddingPerSide",
    toggleTitles: ["Padding", "Padding per side"],
    defaultValue: 0,
    valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
    valueLabels: ["T", "R", "B", "L"],
    min: 0,
  },
  borderRadius: {
    type: t.Number,
    title: "Radius",
    min: 0,
    max: 500,
    displayStepper: !0,
    defaultValue: 0,
  },
  transitionControl: {
    type: t.Transition,
    defaultValue: u.defaultProps.transitionControl,
    title: "Transition",
  },
  fadeOptions: {
    type: t.Object,
    title: "Clipping",
    controls: {
      fadeContent: { type: t.Boolean, title: "Fade", defaultValue: !1 },
      overflow: {
        type: t.Boolean,
        title: "Overflow",
        enabledTitle: "Show",
        disabledTitle: "Hide",
        defaultValue: !1,
        hidden(r) {
          return r.fadeContent === !0;
        },
      },
      fadeWidth: {
        type: t.Number,
        title: "Width",
        defaultValue: 25,
        min: 0,
        max: 100,
        unit: "%",
        hidden(r) {
          return r.fadeContent === !1;
        },
      },
      fadeInset: {
        type: t.Number,
        title: "Inset",
        defaultValue: 0,
        min: 0,
        max: 100,
        unit: "%",
        hidden(r) {
          return r.fadeContent === !1;
        },
      },
      fadeAlpha: {
        type: t.Number,
        title: "Opacity",
        defaultValue: 0,
        min: 0,
        max: 1,
        step: 0.05,
        hidden(r) {
          return r.fadeContent === !1;
        },
      },
    },
  },
  arrowOptions: {
    type: t.Object,
    title: "Arrows",
    controls: {
      showMouseControls: {
        type: t.Boolean,
        title: "Show",
        defaultValue: u.defaultProps.arrowOptions.showMouseControls,
      },
      arrowFill: {
        type: t.Color,
        title: "Fill",
        hidden: (r) => !r.showMouseControls,
        defaultValue: u.defaultProps.arrowOptions.arrowFill,
      },
      leftArrow: { type: t.Image, title: "Previous", hidden: (r) => !r.showMouseControls },
      rightArrow: { type: t.Image, title: "Next", hidden: (r) => !r.showMouseControls },
      arrowSize: {
        type: t.Number,
        title: "Size",
        min: 0,
        max: 200,
        displayStepper: !0,
        defaultValue: u.defaultProps.arrowOptions.arrowSize,
        hidden: (r) => !r.showMouseControls,
      },
      arrowRadius: {
        type: t.Number,
        title: "Radius",
        min: 0,
        max: 500,
        defaultValue: 40,
        hidden: (r) => !r.showMouseControls,
      },
      arrowShouldFadeIn: {
        type: t.Boolean,
        title: "Fade In",
        defaultValue: !1,
        hidden: (r) => !r.showMouseControls,
      },
      arrowShouldSpace: {
        type: t.Boolean,
        title: "Distance",
        enabledTitle: "Space",
        disabledTitle: "Group",
        defaultValue: u.defaultProps.arrowOptions.arrowShouldSpace,
        hidden: (r) => !r.showMouseControls,
      },
      arrowPosition: {
        type: t.Enum,
        title: "Position",
        options: [
          "auto",
          "top-left",
          "top-mid",
          "top-right",
          "bottom-left",
          "bottom-mid",
          "bottom-right",
        ],
        optionTitles: [
          "Center",
          "Top Left",
          "Top Middle",
          "Top Right",
          "Bottom Left",
          "Bottom Middle",
          "Bottom Right",
        ],
        hidden: (r) => !r.showMouseControls || r.arrowShouldSpace,
      },
      arrowPadding: {
        type: t.Number,
        title: "Inset",
        min: -100,
        max: 100,
        defaultValue: 20,
        displayStepper: !0,
        hidden: (r) => !r.showMouseControls || !r.arrowShouldSpace,
      },
      arrowPaddingTop: {
        type: t.Number,
        title: "Top",
        min: -500,
        max: 500,
        defaultValue: 0,
        displayStepper: !0,
        hidden: (r) =>
          !r.showMouseControls ||
          r.arrowShouldSpace ||
          r.arrowPosition === "auto" ||
          r.arrowPosition === "bottom-mid" ||
          r.arrowPosition === "bottom-left" ||
          r.arrowPosition === "bottom-right",
      },
      arrowPaddingBottom: {
        type: t.Number,
        title: "Bottom",
        min: -500,
        max: 500,
        defaultValue: 0,
        displayStepper: !0,
        hidden: (r) =>
          !r.showMouseControls ||
          r.arrowShouldSpace ||
          r.arrowPosition === "auto" ||
          r.arrowPosition === "top-mid" ||
          r.arrowPosition === "top-left" ||
          r.arrowPosition === "top-right",
      },
      arrowPaddingRight: {
        type: t.Number,
        title: "Right",
        min: -500,
        max: 500,
        defaultValue: 0,
        displayStepper: !0,
        hidden: (r) =>
          !r.showMouseControls ||
          r.arrowShouldSpace ||
          r.arrowPosition === "auto" ||
          r.arrowPosition === "top-left" ||
          r.arrowPosition === "top-mid" ||
          r.arrowPosition === "bottom-left" ||
          r.arrowPosition === "bottom-mid",
      },
      arrowPaddingLeft: {
        type: t.Number,
        title: "Left",
        min: -500,
        max: 500,
        defaultValue: 0,
        displayStepper: !0,
        hidden: (r) =>
          !r.showMouseControls ||
          r.arrowShouldSpace ||
          r.arrowPosition === "auto" ||
          r.arrowPosition === "top-right" ||
          r.arrowPosition === "top-mid" ||
          r.arrowPosition === "bottom-right" ||
          r.arrowPosition === "bottom-mid",
      },
      arrowGap: {
        type: t.Number,
        title: "Gap",
        min: 0,
        max: 100,
        defaultValue: 10,
        displayStepper: !0,
        hidden: (r) => !r.showMouseControls || r.arrowShouldSpace,
      },
    },
  },
  progressOptions: {
    type: t.Object,
    title: "Dots",
    controls: {
      showProgressDots: { type: t.Boolean, title: "Show", defaultValue: !1 },
      dotSize: {
        type: t.Number,
        title: "Size",
        min: 1,
        max: 100,
        defaultValue: 10,
        displayStepper: !0,
        hidden: (r) => !r.showProgressDots || r.showScrollbar,
      },
      dotsInset: {
        type: t.Number,
        title: "Inset",
        min: -100,
        max: 100,
        defaultValue: 10,
        displayStepper: !0,
        hidden: (r) => !r.showProgressDots || r.showScrollbar,
      },
      dotsGap: {
        type: t.Number,
        title: "Gap",
        min: 0,
        max: 100,
        defaultValue: 10,
        displayStepper: !0,
        hidden: (r) => !r.showProgressDots || r.showScrollbar,
      },
      dotsPadding: {
        type: t.Number,
        title: "Padding",
        min: 0,
        max: 100,
        defaultValue: 10,
        displayStepper: !0,
        hidden: (r) => !r.showProgressDots || r.showScrollbar,
      },
      dotsFill: {
        type: t.Color,
        title: "Fill",
        defaultValue: "#fff",
        hidden: (r) => !r.showProgressDots || r.showScrollbar,
      },
      dotsBackground: {
        type: t.Color,
        title: "Backdrop",
        defaultValue: "rgba(0,0,0,0.2)",
        hidden: (r) => !r.showProgressDots || r.showScrollbar,
      },
      dotsRadius: {
        type: t.Number,
        title: "Radius",
        min: 0,
        max: 200,
        defaultValue: 50,
        hidden: (r) => !r.showProgressDots || r.showScrollbar,
      },
      dotsOpacity: {
        type: t.Number,
        title: "Opacity",
        min: 0,
        max: 1,
        defaultValue: 0.5,
        step: 0.1,
        displayStepper: !0,
        hidden: (r) => !r.showProgressDots || r.showScrollbar,
      },
      dotsActiveOpacity: {
        type: t.Number,
        title: "Current",
        min: 0,
        max: 1,
        defaultValue: 1,
        step: 0.1,
        displayStepper: !0,
        hidden: (r) => !r.showProgressDots || r.showScrollbar,
      },
      dotsBlur: {
        type: t.Number,
        title: "Blur",
        min: 0,
        max: 50,
        defaultValue: 0,
        step: 1,
        hidden: (r) => !r.showProgressDots || r.showScrollbar,
      },
    },
  },
});
var Vr = {
    display: "flex",
    flexDirection: "row",
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
  Pt = {
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
  Lt = { fontSize: 32, marginBottom: 10 },
  jt = { margin: 0, marginBottom: 10, fontWeight: 600, textAlign: "center" },
  Ht = { margin: 0, opacity: 0.7, maxWidth: 180, lineHeight: 1.5, textAlign: "center" },
  Ve = {
    border: "none",
    display: "flex",
    placeContent: "center",
    placeItems: "center",
    overflow: "hidden",
    background: "transparent",
    cursor: "pointer",
    margin: 0,
    padding: 0,
  },
  Jt = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    pointerEvents: "none",
    userSelect: "none",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 0,
    padding: 0,
    margin: 0,
  },
  Ot = (r, o, g) => Math.min(Math.max(r, o), g),
  Tt = ye(function (o, g) {
    var f, b;
    let {
        slideKey: Z,
        width: P,
        height: q,
        child: w,
        size: m,
        gap: L,
        wrappedValue: C,
        numChildren: ne,
        childCounter: R,
        isCanvas: k,
        effects: N,
        effectsOpacity: B,
        effectsScale: J,
        effectsRotate: v,
        isHorizontal: j,
        isLast: U,
        index: fe,
      } = o,
      Me = (m?.item + L) * R,
      O = [-m?.item, 0, m?.parent - m?.item + L, m?.parent].map((T) => T - Me),
      ze = !k && _(C, O, [-v, 0, 0, v]),
      de = !k && _(C, O, [v, 0, 0, -v]),
      Ze = !k && _(C, O, [B, 1, 1, B]),
      ce = !k && _(C, O, [J, 1, 1, J]),
      Y = !k && _(C, O, [1, 1, 0, 0]),
      pe = !k && _(C, (T) => T >= O[1] && T <= O[2]);
    return (
      E(() => {
        if (pe)
          return pe.onChange((T) => {
            var X;
            (X = g.current) === null || X === void 0 || X.setAttribute("aria-hidden", !T);
          });
      }, []),
      e(ke, {
        inherit: "id",
        children: e("li", {
          style: { display: "contents" },
          "aria-hidden": fe !== 0,
          children: dr(
            w,
            {
              ref: g,
              key: Z + "child",
              style: {
                ...((f = w.props) === null || f === void 0 ? void 0 : f.style),
                flexShrink: 0,
                userSelect: "none",
                width: P,
                height: q,
                opacity: Ze,
                scale: ce,
                originX: j ? Y : 0.5,
                originY: j ? 0.5 : Y,
                rotateY: j ? ze : 0,
                rotateX: j ? 0 : de,
              },
              layoutId: w.props.layoutId ? w.props.layoutId + "-original-" + fe : void 0,
            },
            (b = w.props) === null || b === void 0 ? void 0 : b.children
          ),
        }),
      })
    );
  });
function Dt({
  selectedOpacity: r,
  opacity: o,
  total: g,
  index: f,
  wrappedIndex: b,
  wrappedIndexInverted: Z,
  dotStyle: P,
  buttonStyle: q,
  gap: w,
  padding: m,
  isHorizontal: L,
  isInverted: C,
  ...ne
}) {
  let R = b === f;
  C && (R = Math.abs(Z) === f);
  let k = w / 2,
    N = !L && f > 0 ? k : m,
    B = !L && f !== g - 1 ? k : m,
    J = L && f !== g - 1 ? k : m,
    v = L && f > 0 ? k : m;
  return e("button", {
    "aria-label": `Scroll to page ${f + 1}`,
    type: "button",
    ...ne,
    style: { ...q, padding: `${N}px ${J}px ${B}px ${v}px` },
    children: e(n.div, {
      style: { ...P },
      initial: !1,
      animate: { opacity: R ? r : o },
      transition: { duration: 0.3 },
    }),
  });
}
var Ft = {
    display: "flex",
    placeContent: "center",
    placeItems: "center",
    overflow: "hidden",
    position: "absolute",
    pointerEvents: "auto",
  },
  Rt = {
    borderRadius: "50%",
    background: "white",
    cursor: "pointer",
    border: "none",
    placeContent: "center",
    placeItems: "center",
    padding: 0,
  };
var Bt = Re(u),
  Vt = Re(h);
var _t = {
    NIsnR4e8j: "(min-width: 810px) and (max-width: 1199px)",
    P2LjDfHJZ: "(max-width: 809px)",
    QvDZtOWTx: "(min-width: 1200px)",
  },
  _r = () => typeof document < "u",
  qr = "framer-MzakZ",
  qt = {
    NIsnR4e8j: "framer-v-vqva33",
    P2LjDfHJZ: "framer-v-1amnja6",
    QvDZtOWTx: "framer-v-1j9dkv1",
  },
  Et = { default: { duration: 0 } },
  y = (r, o) => {
    if (!(!r || typeof r != "object")) return { ...r, alt: o };
  },
  ga = Be(),
  Wt = { Desktop: "QvDZtOWTx", Phone: "P2LjDfHJZ", Tablet: "NIsnR4e8j" },
  At = ({ height: r, id: o, width: g, ...f }) => {
    var b, Z;
    return {
      ...f,
      variant:
        (Z = (b = Wt[f.variant]) !== null && b !== void 0 ? b : f.variant) !== null && Z !== void 0
          ? Z
          : "QvDZtOWTx",
    };
  },
  Ut = ye(function (r, o) {
    let { activeLocale: g, setLocale: f } = yr(),
      { style: b, className: Z, layoutId: P, variant: q, ...w } = At(r);
    me(() => {
      let v = Be(void 0, g);
      if (((document.title = v.title || ""), v.viewport)) {
        var j;
        (j = document.querySelector('meta[name="viewport"]')) === null ||
          j === void 0 ||
          j.setAttribute("content", v.viewport);
      }
      if (v.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((U) => U.startsWith("framer-body-"))
            .map((U) => document.body.classList.remove(U)),
          document.body.classList.add(`${v.bodyClassName}-framer-MzakZ`),
          () => {
            document.body.classList.remove(`${v.bodyClassName}-framer-MzakZ`);
          }
        );
    }, [void 0, g]);
    let [m, L] = zr(q, _t, !1),
      C = void 0,
      ne = Et.default,
      R = ae(null),
      k = () => (m === "P2LjDfHJZ" ? !_r() : !0),
      N = () => (["NIsnR4e8j", "P2LjDfHJZ"].includes(m) ? !_r() : !0),
      B = hr(),
      J = [Or, Ir, jr];
    return (
      br({}),
      e(Mr.Provider, {
        value: { primaryVariantId: "QvDZtOWTx", variantClassNames: qt },
        children: a(ke, {
          id: P ?? B,
          children: [
            e(n.div, {
              ...w,
              className: Fe(qr, ...J, "framer-1j9dkv1", Z),
              "data-border": !0,
              ref: o ?? R,
              style: { ...b },
              children: a("div", {
                className: "framer-mdjzx8",
                "data-framer-name": "Wrapper",
                name: "Wrapper",
                children: [
                  e("div", {
                    className: "framer-14b4dt1",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: e("div", {
                      className: "framer-1ctm8wc",
                      "data-framer-name": "Testimonial Day",
                      name: "Testimonial Day",
                      children: e(p, {
                        className: "framer-13o2ph7-container",
                        children: e(u, {
                          alignment: "center",
                          arrowOptions: {
                            arrowFill:
                              "var(--token-fae2c128-35fb-45de-a6c2-32169f920c68, rgb(20, 20, 20))",
                            arrowGap: 10,
                            arrowPadding: 20,
                            arrowPaddingBottom: 0,
                            arrowPaddingLeft: 0,
                            arrowPaddingRight: 0,
                            arrowPaddingTop: 0,
                            arrowPosition: "auto",
                            arrowRadius: 40,
                            arrowShouldFadeIn: !1,
                            arrowShouldSpace: !0,
                            arrowSize: 30,
                            showMouseControls: !0,
                          },
                          autoPlayControl: !0,
                          borderRadius: 0,
                          direction: "left",
                          dragControl: !0,
                          effectsOptions: {
                            effectsHover: !0,
                            effectsOpacity: 1,
                            effectsPerspective: 1200,
                            effectsRotate: 0,
                            effectsScale: 1,
                          },
                          fadeOptions: {
                            fadeAlpha: 0,
                            fadeContent: !1,
                            fadeInset: 0,
                            fadeWidth: 25,
                            overflow: !1,
                          },
                          gap: 10,
                          height: "100%",
                          id: "Swsn2dHXN",
                          intervalControl: 1.5,
                          itemAmount: 1,
                          layoutId: "Swsn2dHXN",
                          padding: 0,
                          paddingBottom: 0,
                          paddingLeft: 0,
                          paddingPerSide: !1,
                          paddingRight: 0,
                          paddingTop: 0,
                          progressOptions: {
                            dotsActiveOpacity: 1,
                            dotsBackground: "rgba(0, 0, 0, 0)",
                            dotsBlur: 0,
                            dotsFill: "rgb(0, 0, 0)",
                            dotsGap: 10,
                            dotsInset: 10,
                            dotSize: 8,
                            dotsOpacity: 0.5,
                            dotsPadding: 10,
                            dotsRadius: 50,
                            showProgressDots: !0,
                          },
                          slots: [
                            a(n.div, {
                              className: "framer-w42y8w",
                              "data-framer-name": "Testimonial Day 1",
                              name: "Testimonial Day 1",
                              children: [
                                a(n.div, {
                                  className: "framer-1q4gp3m",
                                  children: [
                                    e(W, {
                                      className: "framer-1x35iwd",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss1475588813_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 6.5 L 13 0 L 26 6.5 L 26 19.5 L 13 26 L 13 19.5 L 0 26 L 0 19.5 L 13 13 L 0 6.5 L 0 0 Z M 13 6.5 L 13 19.5 L 26 13 Z" fill="rgb(NaN,NaN,NaN)"></path></g></svg>',
                                      svgContentId: 1475588813,
                                      withExternalLayout: !0,
                                    }),
                                    e(l, {
                                      __fromCanvasComponent: !0,
                                      children: e(s, {
                                        children: e("p", {
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
                                      className: "framer-tn4bfl",
                                      fonts: ["FS;Satoshi-bold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                e(l, {
                                  __fromCanvasComponent: !0,
                                  children: e(s, {
                                    children: e("h4", {
                                      className: "framer-styles-preset-1fdfrmg",
                                      "data-styles-preset": "UhPHvInIp",
                                      children:
                                        "\u201CThis app has completely transformed how I manage my projects and deadlines.\u201D",
                                    }),
                                  }),
                                  className: "framer-nr970w",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                a(n.div, {
                                  className: "framer-1iuxpqk",
                                  children: [
                                    e(A, {
                                      background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 210,
                                        intrinsicWidth: 230,
                                        pixelHeight: 210,
                                        pixelWidth: 230,
                                        src: "../../assets/images/xfpZdEkllcJogTOUKAbP3Wde1Q.png",
                                      },
                                      className: "framer-1g5mu1m",
                                    }),
                                    a(n.div, {
                                      className: "framer-16ivokv",
                                      children: [
                                        e(l, {
                                          __fromCanvasComponent: !0,
                                          children: e(s, {
                                            children: e("p", {
                                              style: {
                                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                                "--framer-font-family":
                                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "0px",
                                                "--framer-text-alignment": "left",
                                              },
                                              children: "Jamie Teller",
                                            }),
                                          }),
                                          className: "framer-5vo2xw",
                                          fonts: ["FS;Satoshi-medium"],
                                          verticalAlignment: "top",
                                          withExternalLayout: !0,
                                        }),
                                        e(l, {
                                          __fromCanvasComponent: !0,
                                          children: e(s, {
                                            children: e("p", {
                                              className: "framer-styles-preset-1cc56zh",
                                              "data-styles-preset": "PWn1k_MD2",
                                              style: { "--framer-text-alignment": "left" },
                                              children: "CEO & Founder",
                                            }),
                                          }),
                                          className: "framer-1v73fh5",
                                          verticalAlignment: "top",
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            a(n.div, {
                              className: "framer-1gbfuf6",
                              "data-framer-name": "Testimonial Day 2",
                              name: "Testimonial Day 2",
                              children: [
                                a(n.div, {
                                  className: "framer-1qc0vdg",
                                  children: [
                                    e(W, {
                                      className: "framer-1lqwaj6",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss1944354112_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 26 C 12.142 26 11.352 25.786 10.63 25.357 C 9.931 24.951 9.366 24.398 8.938 23.698 C 8.531 22.976 8.328 22.186 8.328 21.328 C 8.328 20.245 8.576 19.342 9.073 18.62 C 9.57 17.898 10.337 17.051 11.375 16.081 C 12.142 15.381 12.526 14.715 12.526 14.083 L 12.526 13.474 L 11.917 13.474 C 11.217 13.474 10.258 14.174 9.039 15.573 C 7.843 16.972 6.387 17.672 4.672 17.672 C 3.814 17.672 3.024 17.469 2.302 17.063 C 1.602 16.634 1.038 16.069 0.609 15.37 C 0.203 14.648 0 13.858 0 13 C 0 12.142 0.203 11.364 0.609 10.664 C 1.038 9.942 1.602 9.378 2.302 8.971 C 3.024 8.542 3.814 8.328 4.672 8.328 C 6.365 8.328 7.809 9.017 9.005 10.393 C 10.201 11.77 11.172 12.458 11.917 12.458 L 12.526 12.458 L 12.526 11.917 C 12.526 11.285 12.142 10.619 11.375 9.919 L 10.596 9.208 C 10.032 8.689 9.513 8.069 9.039 7.346 C 8.565 6.602 8.328 5.71 8.328 4.672 C 8.328 3.814 8.531 3.036 8.938 2.336 C 9.366 1.614 9.931 1.049 10.63 0.643 C 11.353 0.214 12.143 0 13 0 C 13.858 0 14.636 0.214 15.336 0.643 C 16.058 1.072 16.622 1.636 17.029 2.336 C 17.457 3.036 17.672 3.814 17.672 4.672 C 17.672 6.365 16.983 7.809 15.607 9.005 C 14.23 10.201 13.542 11.172 13.542 11.917 L 13.542 12.458 L 14.083 12.458 C 14.851 12.458 15.821 11.77 16.995 10.393 C 18.146 9.017 19.59 8.328 21.328 8.328 C 22.186 8.328 22.964 8.543 23.664 8.971 C 24.386 9.378 24.951 9.931 25.357 10.63 C 25.786 11.33 26 12.12 26 13 C 26 13.858 25.786 14.648 25.357 15.37 C 24.951 16.069 24.386 16.634 23.664 17.063 C 22.964 17.469 22.186 17.672 21.328 17.672 C 20.267 17.672 19.353 17.412 18.586 16.893 C 17.841 16.374 17.006 15.618 16.081 14.625 C 15.381 13.858 14.715 13.474 14.083 13.474 L 13.542 13.474 L 13.542 14.083 C 13.542 14.918 14.23 15.889 15.607 16.995 C 16.983 18.101 17.672 19.545 17.672 21.328 C 17.672 22.186 17.457 22.976 17.029 23.698 C 16.622 24.398 16.069 24.951 15.37 25.357 C 14.67 25.786 13.88 26 13 26 Z" fill="rgb(NaN,NaN,NaN)"></path></g></svg>',
                                      svgContentId: 1944354112,
                                      withExternalLayout: !0,
                                    }),
                                    e(l, {
                                      __fromCanvasComponent: !0,
                                      children: e(s, {
                                        children: e("p", {
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
                                      className: "framer-m8qcnu",
                                      fonts: ["FS;Switzer-bold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                e(l, {
                                  __fromCanvasComponent: !0,
                                  children: e(s, {
                                    children: e("h4", {
                                      className: "framer-styles-preset-1fdfrmg",
                                      "data-styles-preset": "UhPHvInIp",
                                      children:
                                        "\u201COur team\u2019s productivity has skyrocketed since we started using this tool. \u201D",
                                    }),
                                  }),
                                  className: "framer-1yxghgw",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                a(n.div, {
                                  className: "framer-nrk72",
                                  children: [
                                    e(A, {
                                      background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 986,
                                        intrinsicWidth: 821,
                                        pixelHeight: 986,
                                        pixelWidth: 821,
                                        sizes: "42px",
                                        src: "https://framerusercontent.com/images/9s0r0foiM35KiLQOLX72Ud7Dpk.jpg",
                                        srcSet:
                                          "https://framerusercontent.com/images/9s0r0foiM35KiLQOLX72Ud7Dpk.jpg 821w",
                                      },
                                      className: "framer-1m2rtcm",
                                    }),
                                    a(n.div, {
                                      className: "framer-1tuxnws",
                                      children: [
                                        e(l, {
                                          __fromCanvasComponent: !0,
                                          children: e(s, {
                                            children: e("p", {
                                              style: {
                                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                                "--framer-font-family":
                                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "0px",
                                                "--framer-text-alignment": "left",
                                              },
                                              children: "Jordan Patels",
                                            }),
                                          }),
                                          className: "framer-f10tru",
                                          fonts: ["FS;Satoshi-medium"],
                                          verticalAlignment: "top",
                                          withExternalLayout: !0,
                                        }),
                                        e(l, {
                                          __fromCanvasComponent: !0,
                                          children: e(s, {
                                            children: e("p", {
                                              className: "framer-styles-preset-1cc56zh",
                                              "data-styles-preset": "PWn1k_MD2",
                                              style: { "--framer-text-alignment": "left" },
                                              children: "Marketing Designer",
                                            }),
                                          }),
                                          className: "framer-h7hu5s",
                                          verticalAlignment: "top",
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            a(n.div, {
                              className: "framer-1kvtyk0",
                              "data-framer-name": "Testimonial Day 3",
                              name: "Testimonial Day 3",
                              children: [
                                a(n.div, {
                                  className: "framer-njvqvx",
                                  children: [
                                    e(W, {
                                      className: "framer-1xr2ml5",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22"><g id="ss3557942534_1"><path d="M 0 0 L 22 0 L 22 22 L 0 22 Z" fill="transparent"></path><path d="M 11.043 10.104 C 10.587 4.448 5.852 0 0.079 0 C 0.079 5.747 4.485 10.464 10.104 10.957 C 4.448 11.413 0 16.148 0 21.921 C 5.747 21.921 10.464 17.515 10.957 11.896 C 11.413 17.552 16.148 22 21.921 22 C 21.921 16.253 17.515 11.536 11.896 11.043 C 17.552 10.587 22 5.852 22 0.079 C 16.253 0.079 11.536 4.485 11.043 10.104 Z M 11 11 L 11 11 L 11 11 L 11 11 L 11 11 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                      svgContentId: 3557942534,
                                      withExternalLayout: !0,
                                    }),
                                    e(l, {
                                      __fromCanvasComponent: !0,
                                      children: e(s, {
                                        children: e("p", {
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
                                      className: "framer-6xuowv",
                                      fonts: ["FS;Chillax-semibold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                e(l, {
                                  __fromCanvasComponent: !0,
                                  children: e(s, {
                                    children: e("h4", {
                                      className: "framer-styles-preset-1fdfrmg",
                                      "data-styles-preset": "UhPHvInIp",
                                      children:
                                        "\u201CThe customizability and integration capabilities of this app are top-notch.\u201D",
                                    }),
                                  }),
                                  className: "framer-87608j",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                a(n.div, {
                                  className: "framer-17r5nxi",
                                  children: [
                                    e(A, {
                                      background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 486,
                                        intrinsicWidth: 458,
                                        pixelHeight: 486,
                                        pixelWidth: 458,
                                        src: "../../assets/images/YvAgqeFHbVFjbeBlkFOrYz9HcjU.png",
                                      },
                                      className: "framer-1h2tm9v",
                                    }),
                                    a(n.div, {
                                      className: "framer-1m5778o",
                                      children: [
                                        e(l, {
                                          __fromCanvasComponent: !0,
                                          children: e(s, {
                                            children: e("p", {
                                              style: {
                                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                                "--framer-font-family":
                                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "0px",
                                                "--framer-text-alignment": "left",
                                              },
                                              children: "Taylor Kim",
                                            }),
                                          }),
                                          className: "framer-kf1e6y",
                                          fonts: ["FS;Satoshi-medium"],
                                          verticalAlignment: "top",
                                          withExternalLayout: !0,
                                        }),
                                        e(l, {
                                          __fromCanvasComponent: !0,
                                          children: e(s, {
                                            children: e("p", {
                                              className: "framer-styles-preset-1cc56zh",
                                              "data-styles-preset": "PWn1k_MD2",
                                              style: { "--framer-text-alignment": "left" },
                                              children: "Marketing Designer",
                                            }),
                                          }),
                                          className: "framer-5y4lep",
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
                          startFrom: 0,
                          style: { height: "100%", maxWidth: "100%", width: "100%" },
                          transitionControl: { damping: 40, stiffness: 200, type: "spring" },
                          width: "100%",
                        }),
                      }),
                    }),
                  }),
                  e("div", {
                    className: "framer-qfwrdk",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: e("div", {
                      className: "framer-1dyd4ui",
                      "data-framer-name": "Testimonial Night",
                      name: "Testimonial Night",
                      children: e(p, {
                        className: "framer-1o4vaib-container",
                        children: e(u, {
                          alignment: "center",
                          arrowOptions: {
                            arrowFill:
                              "var(--token-fae2c128-35fb-45de-a6c2-32169f920c68, rgb(20, 20, 20))",
                            arrowGap: 10,
                            arrowPadding: 20,
                            arrowPaddingBottom: 0,
                            arrowPaddingLeft: 0,
                            arrowPaddingRight: 0,
                            arrowPaddingTop: 0,
                            arrowPosition: "auto",
                            arrowRadius: 40,
                            arrowShouldFadeIn: !1,
                            arrowShouldSpace: !0,
                            arrowSize: 30,
                            showMouseControls: !0,
                          },
                          autoPlayControl: !0,
                          borderRadius: 0,
                          direction: "left",
                          dragControl: !0,
                          effectsOptions: {
                            effectsHover: !0,
                            effectsOpacity: 1,
                            effectsPerspective: 1200,
                            effectsRotate: 0,
                            effectsScale: 1,
                          },
                          fadeOptions: {
                            fadeAlpha: 0,
                            fadeContent: !1,
                            fadeInset: 0,
                            fadeWidth: 25,
                            overflow: !1,
                          },
                          gap: 10,
                          height: "100%",
                          id: "Q7FEshWTM",
                          intervalControl: 1.5,
                          itemAmount: 1,
                          layoutId: "Q7FEshWTM",
                          padding: 0,
                          paddingBottom: 0,
                          paddingLeft: 0,
                          paddingPerSide: !1,
                          paddingRight: 0,
                          paddingTop: 0,
                          progressOptions: {
                            dotsActiveOpacity: 1,
                            dotsBackground: "rgba(0, 0, 0, 0)",
                            dotsBlur: 0,
                            dotsFill: "rgb(255, 255, 255)",
                            dotsGap: 10,
                            dotsInset: 10,
                            dotSize: 8,
                            dotsOpacity: 0.5,
                            dotsPadding: 10,
                            dotsRadius: 50,
                            showProgressDots: !0,
                          },
                          slots: [
                            a(n.div, {
                              className: "framer-iwb9va",
                              "data-framer-name": "Testimonial Night 1",
                              name: "Testimonial Night 1",
                              children: [
                                a(n.div, {
                                  className: "framer-oq2qhf",
                                  children: [
                                    e(W, {
                                      className: "framer-l0pn0p",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss3145335152_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 6.5 L 13 0 L 26 6.5 L 26 19.5 L 13 26 L 13 19.5 L 0 26 L 0 19.5 L 13 13 L 0 6.5 L 0 0 Z M 13 6.5 L 13 19.5 L 26 13 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                      svgContentId: 3145335152,
                                      withExternalLayout: !0,
                                    }),
                                    e(l, {
                                      __fromCanvasComponent: !0,
                                      children: e(s, {
                                        children: e("p", {
                                          style: {
                                            "--font-selector": "RlM7U2F0b3NoaS1ib2xk",
                                            "--framer-font-family":
                                              '"Satoshi", "Satoshi Placeholder", sans-serif',
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-text-alignment": "left",
                                            "--framer-text-color": "rgb(255, 255, 255)",
                                          },
                                          children: "Acme Corp",
                                        }),
                                      }),
                                      className: "framer-1776fkr",
                                      fonts: ["FS;Satoshi-bold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                e(l, {
                                  __fromCanvasComponent: !0,
                                  children: e(s, {
                                    children: e("h4", {
                                      className: "framer-styles-preset-1fdfrmg",
                                      "data-styles-preset": "UhPHvInIp",
                                      style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                      children:
                                        "\u201CThis app has completely transformed how I manage my projects and deadlines.\u201D",
                                    }),
                                  }),
                                  className: "framer-1v2948p",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                a(n.div, {
                                  className: "framer-1a6iv65",
                                  children: [
                                    e(A, {
                                      background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 210,
                                        intrinsicWidth: 230,
                                        pixelHeight: 210,
                                        pixelWidth: 230,
                                        src: "../../assets/images/xfpZdEkllcJogTOUKAbP3Wde1Q.png",
                                      },
                                      className: "framer-203ddh",
                                    }),
                                    a(n.div, {
                                      className: "framer-gsdjmb",
                                      children: [
                                        e(l, {
                                          __fromCanvasComponent: !0,
                                          children: e(s, {
                                            children: e("p", {
                                              style: {
                                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                                "--framer-font-family":
                                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "0px",
                                                "--framer-text-alignment": "left",
                                                "--framer-text-color": "rgb(255, 255, 255)",
                                              },
                                              children: "Jamie Teller",
                                            }),
                                          }),
                                          className: "framer-jxnlrw",
                                          fonts: ["FS;Satoshi-medium"],
                                          verticalAlignment: "top",
                                          withExternalLayout: !0,
                                        }),
                                        e(l, {
                                          __fromCanvasComponent: !0,
                                          children: e(s, {
                                            children: e("p", {
                                              className: "framer-styles-preset-1cc56zh",
                                              "data-styles-preset": "PWn1k_MD2",
                                              style: {
                                                "--framer-text-alignment": "left",
                                                "--framer-text-color": "rgb(255, 255, 255)",
                                              },
                                              children: "CEO & Founder",
                                            }),
                                          }),
                                          className: "framer-7uuura",
                                          verticalAlignment: "top",
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            a(n.div, {
                              className: "framer-1l1p46e",
                              "data-framer-name": "Testimonial Night 2",
                              name: "Testimonial Night 2",
                              children: [
                                a(n.div, {
                                  className: "framer-1xnheva",
                                  children: [
                                    e(W, {
                                      className: "framer-isgbax",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss884649816_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 26 C 12.142 26 11.352 25.786 10.63 25.357 C 9.931 24.951 9.366 24.398 8.938 23.698 C 8.531 22.976 8.328 22.186 8.328 21.328 C 8.328 20.245 8.576 19.342 9.073 18.62 C 9.57 17.898 10.337 17.051 11.375 16.081 C 12.142 15.381 12.526 14.715 12.526 14.083 L 12.526 13.474 L 11.917 13.474 C 11.217 13.474 10.258 14.174 9.039 15.573 C 7.843 16.972 6.387 17.672 4.672 17.672 C 3.814 17.672 3.024 17.469 2.302 17.063 C 1.602 16.634 1.038 16.069 0.609 15.37 C 0.203 14.648 0 13.858 0 13 C 0 12.142 0.203 11.364 0.609 10.664 C 1.038 9.942 1.602 9.378 2.302 8.971 C 3.024 8.542 3.814 8.328 4.672 8.328 C 6.365 8.328 7.809 9.017 9.005 10.393 C 10.201 11.77 11.172 12.458 11.917 12.458 L 12.526 12.458 L 12.526 11.917 C 12.526 11.285 12.142 10.619 11.375 9.919 L 10.596 9.208 C 10.032 8.689 9.513 8.069 9.039 7.346 C 8.565 6.602 8.328 5.71 8.328 4.672 C 8.328 3.814 8.531 3.036 8.938 2.336 C 9.366 1.614 9.931 1.049 10.63 0.643 C 11.353 0.214 12.143 0 13 0 C 13.858 0 14.636 0.214 15.336 0.643 C 16.058 1.072 16.622 1.636 17.029 2.336 C 17.457 3.036 17.672 3.814 17.672 4.672 C 17.672 6.365 16.983 7.809 15.607 9.005 C 14.23 10.201 13.542 11.172 13.542 11.917 L 13.542 12.458 L 14.083 12.458 C 14.851 12.458 15.821 11.77 16.995 10.393 C 18.146 9.017 19.59 8.328 21.328 8.328 C 22.186 8.328 22.964 8.543 23.664 8.971 C 24.386 9.378 24.951 9.931 25.357 10.63 C 25.786 11.33 26 12.12 26 13 C 26 13.858 25.786 14.648 25.357 15.37 C 24.951 16.069 24.386 16.634 23.664 17.063 C 22.964 17.469 22.186 17.672 21.328 17.672 C 20.267 17.672 19.353 17.412 18.586 16.893 C 17.841 16.374 17.006 15.618 16.081 14.625 C 15.381 13.858 14.715 13.474 14.083 13.474 L 13.542 13.474 L 13.542 14.083 C 13.542 14.918 14.23 15.889 15.607 16.995 C 16.983 18.101 17.672 19.545 17.672 21.328 C 17.672 22.186 17.457 22.976 17.029 23.698 C 16.622 24.398 16.069 24.951 15.37 25.357 C 14.67 25.786 13.88 26 13 26 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                      svgContentId: 884649816,
                                      withExternalLayout: !0,
                                    }),
                                    e(l, {
                                      __fromCanvasComponent: !0,
                                      children: e(s, {
                                        children: e("p", {
                                          style: {
                                            "--font-selector": "RlM7U3dpdHplci1ib2xk",
                                            "--framer-font-family":
                                              '"Switzer", "Switzer Placeholder", sans-serif',
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-text-alignment": "left",
                                            "--framer-text-color": "rgb(255, 255, 255)",
                                          },
                                          children: "Quantum",
                                        }),
                                      }),
                                      className: "framer-qv9th7",
                                      fonts: ["FS;Switzer-bold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                e(l, {
                                  __fromCanvasComponent: !0,
                                  children: e(s, {
                                    children: e("h4", {
                                      className: "framer-styles-preset-1fdfrmg",
                                      "data-styles-preset": "UhPHvInIp",
                                      style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                      children:
                                        "\u201COur team\u2019s productivity has skyrocketed since we started using this tool. \u201D",
                                    }),
                                  }),
                                  className: "framer-fgq1qz",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                a(n.div, {
                                  className: "framer-gn0sai",
                                  children: [
                                    e(A, {
                                      background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 986,
                                        intrinsicWidth: 821,
                                        pixelHeight: 986,
                                        pixelWidth: 821,
                                        sizes: "42px",
                                        src: "https://framerusercontent.com/images/9s0r0foiM35KiLQOLX72Ud7Dpk.jpg",
                                        srcSet:
                                          "https://framerusercontent.com/images/9s0r0foiM35KiLQOLX72Ud7Dpk.jpg 821w",
                                      },
                                      className: "framer-tt79i3",
                                    }),
                                    a(n.div, {
                                      className: "framer-mjizyt",
                                      children: [
                                        e(l, {
                                          __fromCanvasComponent: !0,
                                          children: e(s, {
                                            children: e("p", {
                                              style: {
                                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                                "--framer-font-family":
                                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "0px",
                                                "--framer-text-alignment": "left",
                                                "--framer-text-color": "rgb(255, 255, 255)",
                                              },
                                              children: "Jordan Patels",
                                            }),
                                          }),
                                          className: "framer-1d4vadg",
                                          fonts: ["FS;Satoshi-medium"],
                                          verticalAlignment: "top",
                                          withExternalLayout: !0,
                                        }),
                                        e(l, {
                                          __fromCanvasComponent: !0,
                                          children: e(s, {
                                            children: e("p", {
                                              className: "framer-styles-preset-1cc56zh",
                                              "data-styles-preset": "PWn1k_MD2",
                                              style: {
                                                "--framer-text-alignment": "left",
                                                "--framer-text-color": "rgb(255, 255, 255)",
                                              },
                                              children: "Marketing Designer",
                                            }),
                                          }),
                                          className: "framer-o40eol",
                                          verticalAlignment: "top",
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            a(n.div, {
                              className: "framer-1fb01i6",
                              "data-framer-name": "Testimonial Night 3",
                              name: "Testimonial Night 3",
                              children: [
                                a(n.div, {
                                  className: "framer-dvfcz4",
                                  children: [
                                    e(W, {
                                      className: "framer-1dochud",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22"><g id="ss3359952632_1"><path d="M 0 0 L 22 0 L 22 22 L 0 22 Z" fill="transparent"></path><path d="M 11.043 10.104 C 10.587 4.448 5.852 0 0.079 0 C 0.079 5.747 4.485 10.464 10.104 10.957 C 4.448 11.413 0 16.148 0 21.921 C 5.747 21.921 10.464 17.515 10.957 11.896 C 11.413 17.552 16.148 22 21.921 22 C 21.921 16.253 17.515 11.536 11.896 11.043 C 17.552 10.587 22 5.852 22 0.079 C 16.253 0.079 11.536 4.485 11.043 10.104 Z M 11 11 L 11 11 L 11 11 L 11 11 L 11 11 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                      svgContentId: 3359952632,
                                      withExternalLayout: !0,
                                    }),
                                    e(l, {
                                      __fromCanvasComponent: !0,
                                      children: e(s, {
                                        children: e("p", {
                                          style: {
                                            "--font-selector": "RlM7Q2hpbGxheC1zZW1pYm9sZA==",
                                            "--framer-font-family":
                                              '"Chillax", "Chillax Placeholder", sans-serif',
                                            "--framer-font-weight": "600",
                                            "--framer-letter-spacing": "-0.4px",
                                            "--framer-text-alignment": "left",
                                            "--framer-text-color": "rgb(255, 255, 255)",
                                          },
                                          children: "Echo Valley",
                                        }),
                                      }),
                                      className: "framer-dp2oki",
                                      fonts: ["FS;Chillax-semibold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                e(l, {
                                  __fromCanvasComponent: !0,
                                  children: e(s, {
                                    children: e("h4", {
                                      className: "framer-styles-preset-1fdfrmg",
                                      "data-styles-preset": "UhPHvInIp",
                                      style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                      children:
                                        "\u201CThe customizability and integration capabilities of this app are top-notch.\u201D",
                                    }),
                                  }),
                                  className: "framer-mi8gzx",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                a(n.div, {
                                  className: "framer-1ny8wog",
                                  children: [
                                    e(A, {
                                      background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 486,
                                        intrinsicWidth: 458,
                                        pixelHeight: 486,
                                        pixelWidth: 458,
                                        src: "../../assets/images/YvAgqeFHbVFjbeBlkFOrYz9HcjU.png",
                                      },
                                      className: "framer-qacoau",
                                    }),
                                    a(n.div, {
                                      className: "framer-vaj1ua",
                                      children: [
                                        e(l, {
                                          __fromCanvasComponent: !0,
                                          children: e(s, {
                                            children: e("p", {
                                              style: {
                                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                                "--framer-font-family":
                                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "0px",
                                                "--framer-text-alignment": "left",
                                                "--framer-text-color": "rgb(255, 255, 255)",
                                              },
                                              children: "Taylor Kim",
                                            }),
                                          }),
                                          className: "framer-1xdx8f6",
                                          fonts: ["FS;Satoshi-medium"],
                                          verticalAlignment: "top",
                                          withExternalLayout: !0,
                                        }),
                                        e(l, {
                                          __fromCanvasComponent: !0,
                                          children: e(s, {
                                            children: e("p", {
                                              className: "framer-styles-preset-1cc56zh",
                                              "data-styles-preset": "PWn1k_MD2",
                                              style: {
                                                "--framer-text-alignment": "left",
                                                "--framer-text-color": "rgb(255, 255, 255)",
                                              },
                                              children: "Marketing Designer",
                                            }),
                                          }),
                                          className: "framer-ul79jh",
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
                          startFrom: 0,
                          style: { height: "100%", maxWidth: "100%", width: "100%" },
                          transitionControl: { damping: 40, stiffness: 200, type: "spring" },
                          width: "100%",
                        }),
                      }),
                    }),
                  }),
                  e("div", {
                    className: "framer-14xafeo",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: a("div", {
                      className: "framer-1iiq0pd",
                      "data-framer-name": "Testimonials Day",
                      name: "Testimonials Day",
                      children: [
                        e(l, {
                          __fromCanvasComponent: !0,
                          children: e(s, {
                            children: e("h2", {
                              className: "framer-styles-preset-4m6e0d",
                              "data-styles-preset": "Bgl_uNKYX",
                              style: { "--framer-text-color": "rgb(0, 0, 0)" },
                              children: "We have worked with hundreds of amazing people",
                            }),
                          }),
                          className: "framer-1fmgwai",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        a("div", {
                          className: "framer-15h9i9h",
                          children: [
                            a("div", {
                              className: "framer-1c3idk1",
                              children: [
                                e(p, {
                                  className: "framer-cw09cz-container",
                                  children: e(h, {
                                    aY3NDFicr: y(
                                      { src: "../../assets/images/xfpZdEkllcJogTOUKAbP3Wde1Q.png" },
                                      ""
                                    ),
                                    bErIHJkdI:
                                      "This app has completely transformed how I manage my projects and deadlines.",
                                    height: "100%",
                                    iblTMwOmJ: "@jamietechguru00",
                                    id: "ZUF9GUObI",
                                    layoutId: "ZUF9GUObI",
                                    oVU8J_Br4: "Jamie Teller",
                                    style: { width: "100%" },
                                    tbHzgMiO7: !0,
                                    variant: "UpZj3qjIx",
                                    width: "100%",
                                    yhkvJJf0e: !0,
                                  }),
                                }),
                                e(p, {
                                  className: "framer-f0to37-container",
                                  children: e(h, {
                                    aY3NDFicr: y(
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
                                    id: "xaiqdbIso",
                                    layoutId: "xaiqdbIso",
                                    oVU8J_Br4: "Alex Rivera",
                                    style: { width: "100%" },
                                    tbHzgMiO7: !0,
                                    variant: "UpZj3qjIx",
                                    width: "100%",
                                    yhkvJJf0e: !0,
                                  }),
                                }),
                                e(p, {
                                  className: "framer-9x9tsu-container",
                                  children: e(h, {
                                    aY3NDFicr: y(
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
                                    id: "W_x5prNmp",
                                    layoutId: "W_x5prNmp",
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
                            k() &&
                              a("div", {
                                className: "framer-rwm3bf hidden-1amnja6",
                                children: [
                                  e(p, {
                                    className: "framer-1uwruct-container",
                                    children: e(h, {
                                      aY3NDFicr: y(
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
                                      id: "xMwVznGKB",
                                      layoutId: "xMwVznGKB",
                                      oVU8J_Br4: "Casey Jordan",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "UpZj3qjIx",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
                                  }),
                                  e(p, {
                                    className: "framer-oq0vcx-container",
                                    children: e(h, {
                                      aY3NDFicr: y(
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
                                      id: "Zyo4hzi5P",
                                      layoutId: "Zyo4hzi5P",
                                      oVU8J_Br4: "Taylor Kim",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "UpZj3qjIx",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
                                  }),
                                  e(p, {
                                    className: "framer-mq58ck-container",
                                    children: e(h, {
                                      aY3NDFicr: y(
                                        {
                                          src: "../../assets/images/2ocGPytBkELnTT9wbPbMdBn6HT0.png",
                                        },
                                        ""
                                      ),
                                      bErIHJkdI:
                                        "The customizability and integration capabilities of this app are top-notch.",
                                      height: "100%",
                                      iblTMwOmJ: "@rileysmith1",
                                      id: "BUl0D4f7V",
                                      layoutId: "BUl0D4f7V",
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
                            N() &&
                              a("div", {
                                className: "framer-86uoh4 hidden-vqva33 hidden-1amnja6",
                                children: [
                                  e(p, {
                                    className: "framer-qyk4fx-container",
                                    children: e(h, {
                                      aY3NDFicr: y(
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
                                      id: "e7l0vrbZR",
                                      layoutId: "e7l0vrbZR",
                                      oVU8J_Br4: "Jordan Patels",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "UpZj3qjIx",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
                                  }),
                                  e(p, {
                                    className: "framer-ewnfi8-container",
                                    children: e(h, {
                                      aY3NDFicr: y(
                                        {
                                          src: "../../assets/images/YvAgqeFHbVFjbeBlkFOrYz9HcjU.png",
                                        },
                                        ""
                                      ),
                                      bErIHJkdI:
                                        "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
                                      height: "100%",
                                      iblTMwOmJ: "@dawsontechtips",
                                      id: "ExVCXyhIw",
                                      layoutId: "ExVCXyhIw",
                                      oVU8J_Br4: "Sam Dawson",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "UpZj3qjIx",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
                                  }),
                                  e(p, {
                                    className: "framer-uedbli-container",
                                    children: e(h, {
                                      aY3NDFicr: y(
                                        {
                                          src: "../../assets/images/nHriSM7CMKJ2KsdXD2MIZk3KI.png",
                                        },
                                        ""
                                      ),
                                      bErIHJkdI:
                                        " Its user-friendly interface and robust features support our diverse needs.",
                                      height: "100%",
                                      iblTMwOmJ: "@casey09",
                                      id: "aNZXMoaQQ",
                                      layoutId: "aNZXMoaQQ",
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
                        }),
                      ],
                    }),
                  }),
                  e("div", {
                    className: "framer-17ywyd",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: a("div", {
                      className: "framer-h3ogmi",
                      "data-framer-name": "Testimonials Night",
                      name: "Testimonials Night",
                      children: [
                        e(l, {
                          __fromCanvasComponent: !0,
                          children: e(s, {
                            children: e("h2", {
                              className: "framer-styles-preset-4m6e0d",
                              "data-styles-preset": "Bgl_uNKYX",
                              style: { "--framer-text-color": "rgb(255, 255, 255)" },
                              children: "We have worked with hundreds of amazing people",
                            }),
                          }),
                          className: "framer-1c8isoi",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        a("div", {
                          className: "framer-qvhup0",
                          children: [
                            a("div", {
                              className: "framer-7e3ato",
                              children: [
                                e(p, {
                                  className: "framer-1pn2i5m-container",
                                  children: e(h, {
                                    aY3NDFicr: y(
                                      { src: "../../assets/images/xfpZdEkllcJogTOUKAbP3Wde1Q.png" },
                                      ""
                                    ),
                                    bErIHJkdI:
                                      "This app has completely transformed how I manage my projects and deadlines.",
                                    height: "100%",
                                    iblTMwOmJ: "@jamietechguru00",
                                    id: "agNp8m9B5",
                                    layoutId: "agNp8m9B5",
                                    oVU8J_Br4: "Jamie Teller",
                                    style: { width: "100%" },
                                    tbHzgMiO7: !0,
                                    variant: "FDBOJ17H7",
                                    width: "100%",
                                    yhkvJJf0e: !0,
                                  }),
                                }),
                                e(p, {
                                  className: "framer-rmzjy6-container",
                                  children: e(h, {
                                    aY3NDFicr: y(
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
                                    id: "r62ilBBR6",
                                    layoutId: "r62ilBBR6",
                                    oVU8J_Br4: "Alex Rivera",
                                    style: { width: "100%" },
                                    tbHzgMiO7: !0,
                                    variant: "FDBOJ17H7",
                                    width: "100%",
                                    yhkvJJf0e: !0,
                                  }),
                                }),
                                e(p, {
                                  className: "framer-1flrb7j-container",
                                  children: e(h, {
                                    aY3NDFicr: y(
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
                                    id: "SXq_wSTEo",
                                    layoutId: "SXq_wSTEo",
                                    oVU8J_Br4: "Morgan Lee ",
                                    style: { width: "100%" },
                                    tbHzgMiO7: !0,
                                    variant: "FDBOJ17H7",
                                    width: "100%",
                                    yhkvJJf0e: !0,
                                  }),
                                }),
                              ],
                            }),
                            k() &&
                              a("div", {
                                className: "framer-u6oxgx hidden-1amnja6",
                                children: [
                                  e(p, {
                                    className: "framer-1dmkg08-container",
                                    children: e(h, {
                                      aY3NDFicr: y(
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
                                      id: "EQb5wkB7H",
                                      layoutId: "EQb5wkB7H",
                                      oVU8J_Br4: "Casey Jordan",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "FDBOJ17H7",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
                                  }),
                                  e(p, {
                                    className: "framer-1dfrj8u-container",
                                    children: e(h, {
                                      aY3NDFicr: y(
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
                                      id: "rPoSJK5zY",
                                      layoutId: "rPoSJK5zY",
                                      oVU8J_Br4: "Taylor Kim",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "FDBOJ17H7",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
                                  }),
                                  e(p, {
                                    className: "framer-1w8s3qf-container",
                                    children: e(h, {
                                      aY3NDFicr: y(
                                        {
                                          src: "../../assets/images/2ocGPytBkELnTT9wbPbMdBn6HT0.png",
                                        },
                                        ""
                                      ),
                                      bErIHJkdI:
                                        "The customizability and integration capabilities of this app are top-notch.",
                                      height: "100%",
                                      iblTMwOmJ: "@rileysmith1",
                                      id: "mxTyMlVyw",
                                      layoutId: "mxTyMlVyw",
                                      oVU8J_Br4: "Riley Smith",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "FDBOJ17H7",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
                                  }),
                                ],
                              }),
                            N() &&
                              a("div", {
                                className: "framer-13i15z3 hidden-vqva33 hidden-1amnja6",
                                children: [
                                  e(p, {
                                    className: "framer-1mgge6w-container",
                                    children: e(h, {
                                      aY3NDFicr: y(
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
                                      id: "ddz29tuEE",
                                      layoutId: "ddz29tuEE",
                                      oVU8J_Br4: "Jordan Patels",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "FDBOJ17H7",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
                                  }),
                                  e(p, {
                                    className: "framer-164dpel-container",
                                    children: e(h, {
                                      aY3NDFicr: y(
                                        {
                                          src: "../../assets/images/YvAgqeFHbVFjbeBlkFOrYz9HcjU.png",
                                        },
                                        ""
                                      ),
                                      bErIHJkdI:
                                        "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
                                      height: "100%",
                                      iblTMwOmJ: "@dawsontechtips",
                                      id: "jgeu6AzJr",
                                      layoutId: "jgeu6AzJr",
                                      oVU8J_Br4: "Sam Dawson",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "FDBOJ17H7",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
                                  }),
                                  e(p, {
                                    className: "framer-wwvxvg-container",
                                    children: e(h, {
                                      aY3NDFicr: y(
                                        {
                                          src: "../../assets/images/nHriSM7CMKJ2KsdXD2MIZk3KI.png",
                                        },
                                        ""
                                      ),
                                      bErIHJkdI:
                                        " Its user-friendly interface and robust features support our diverse needs.",
                                      height: "100%",
                                      iblTMwOmJ: "@casey09",
                                      id: "WUTypX80v",
                                      layoutId: "WUTypX80v",
                                      oVU8J_Br4: "Casey Harper",
                                      style: { width: "100%" },
                                      tbHzgMiO7: !0,
                                      variant: "FDBOJ17H7",
                                      width: "100%",
                                      yhkvJJf0e: !0,
                                    }),
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
            }),
            e("div", { className: Fe(qr, ...J), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  Yt = [
    '.framer-MzakZ[data-border="true"]::after, .framer-MzakZ [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-MzakZ.framer-lmvkr7, .framer-MzakZ .framer-lmvkr7 { display: block; }",
    ".framer-MzakZ.framer-1j9dkv1 { --border-bottom-width: 1px; --border-color: rgba(173, 173, 173, 0.4); --border-left-width: 1px; --border-right-width: 1px; --border-style: dashed; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-MzakZ .framer-mdjzx8 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; max-width: 1600px; overflow: hidden; padding: 20px 20px 20px 20px; position: relative; width: 100%; }",
    '.framer-MzakZ .framer-14b4dt1, .framer-MzakZ .framer-qfwrdk { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }',
    ".framer-MzakZ .framer-1ctm8wc { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 1px; }",
    ".framer-MzakZ .framer-13o2ph7-container, .framer-MzakZ .framer-1o4vaib-container { flex: none; height: 377px; max-width: 720px; position: relative; width: 100%; }",
    ".framer-MzakZ .framer-w42y8w, .framer-MzakZ .framer-1gbfuf6, .framer-MzakZ .framer-1kvtyk0, .framer-MzakZ .framer-iwb9va, .framer-MzakZ .framer-1l1p46e, .framer-MzakZ .framer-1fb01i6 { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; overflow: visible; padding: 40px 40px 40px 40px; position: relative; width: 727px; }",
    ".framer-MzakZ .framer-1q4gp3m, .framer-MzakZ .framer-njvqvx, .framer-MzakZ .framer-oq2qhf, .framer-MzakZ .framer-dvfcz4 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; opacity: 0.5; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-MzakZ .framer-1x35iwd, .framer-MzakZ .framer-1lqwaj6, .framer-MzakZ .framer-l0pn0p, .framer-MzakZ .framer-isgbax { flex: none; height: 26px; position: relative; width: 26px; }",
    ".framer-MzakZ .framer-tn4bfl, .framer-MzakZ .framer-5vo2xw, .framer-MzakZ .framer-m8qcnu, .framer-MzakZ .framer-f10tru, .framer-MzakZ .framer-6xuowv, .framer-MzakZ .framer-kf1e6y, .framer-MzakZ .framer-1776fkr, .framer-MzakZ .framer-jxnlrw, .framer-MzakZ .framer-qv9th7, .framer-MzakZ .framer-1d4vadg, .framer-MzakZ .framer-dp2oki, .framer-MzakZ .framer-1xdx8f6 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-MzakZ .framer-nr970w, .framer-MzakZ .framer-1v2948p { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 480px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-MzakZ .framer-1iuxpqk, .framer-MzakZ .framer-nrk72, .framer-MzakZ .framer-17r5nxi, .framer-MzakZ .framer-1a6iv65, .framer-MzakZ .framer-gn0sai, .framer-MzakZ .framer-1ny8wog { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-MzakZ .framer-1g5mu1m, .framer-MzakZ .framer-1m2rtcm, .framer-MzakZ .framer-1h2tm9v, .framer-MzakZ .framer-203ddh, .framer-MzakZ .framer-tt79i3, .framer-MzakZ .framer-qacoau { aspect-ratio: 1 / 1; border-bottom-left-radius: 100%; border-bottom-right-radius: 100%; border-top-left-radius: 100%; border-top-right-radius: 100%; flex: none; height: var(--framer-aspect-ratio-supported, 42px); overflow: hidden; position: relative; width: 42px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-MzakZ .framer-16ivokv, .framer-MzakZ .framer-1tuxnws, .framer-MzakZ .framer-1m5778o, .framer-MzakZ .framer-gsdjmb, .framer-MzakZ .framer-mjizyt, .framer-MzakZ .framer-vaj1ua { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-MzakZ .framer-1v73fh5, .framer-MzakZ .framer-h7hu5s, .framer-MzakZ .framer-5y4lep, .framer-MzakZ .framer-7uuura, .framer-MzakZ .framer-o40eol, .framer-MzakZ .framer-ul79jh { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; opacity: 0.8; position: relative; white-space: pre; width: auto; }",
    ".framer-MzakZ .framer-1qc0vdg, .framer-MzakZ .framer-1xnheva { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: min-content; justify-content: center; opacity: 0.5; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-MzakZ .framer-1yxghgw, .framer-MzakZ .framer-fgq1qz { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 430px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-MzakZ .framer-1xr2ml5, .framer-MzakZ .framer-1dochud { flex: none; height: 22px; position: relative; width: 22px; }",
    ".framer-MzakZ .framer-87608j, .framer-MzakZ .framer-mi8gzx { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 360px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-MzakZ .framer-1dyd4ui { align-content: center; align-items: center; background-color: #000000; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 1px; }",
    '.framer-MzakZ .framer-14xafeo, .framer-MzakZ .framer-17ywyd { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }',
    ".framer-MzakZ .framer-1iiq0pd { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-MzakZ .framer-1fmgwai, .framer-MzakZ .framer-1c8isoi { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 750px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-MzakZ .framer-15h9i9h, .framer-MzakZ .framer-qvhup0 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; max-width: 1200px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-MzakZ .framer-1c3idk1, .framer-MzakZ .framer-rwm3bf, .framer-MzakZ .framer-86uoh4, .framer-MzakZ .framer-7e3ato, .framer-MzakZ .framer-u6oxgx, .framer-MzakZ .framer-13i15z3 { align-content: flex-start; align-items: flex-start; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: wrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 1px; }",
    ".framer-MzakZ .framer-cw09cz-container, .framer-MzakZ .framer-f0to37-container, .framer-MzakZ .framer-9x9tsu-container, .framer-MzakZ .framer-1uwruct-container, .framer-MzakZ .framer-oq0vcx-container, .framer-MzakZ .framer-mq58ck-container, .framer-MzakZ .framer-qyk4fx-container, .framer-MzakZ .framer-ewnfi8-container, .framer-MzakZ .framer-uedbli-container, .framer-MzakZ .framer-1pn2i5m-container, .framer-MzakZ .framer-rmzjy6-container, .framer-MzakZ .framer-1flrb7j-container, .framer-MzakZ .framer-1dmkg08-container, .framer-MzakZ .framer-1dfrj8u-container, .framer-MzakZ .framer-1w8s3qf-container, .framer-MzakZ .framer-1mgge6w-container, .framer-MzakZ .framer-164dpel-container, .framer-MzakZ .framer-wwvxvg-container { flex: none; height: auto; position: relative; width: 100%; }",
    ".framer-MzakZ .framer-h3ogmi { align-content: center; align-items: center; background-color: #000000; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-MzakZ.framer-1j9dkv1, .framer-MzakZ .framer-mdjzx8, .framer-MzakZ .framer-14b4dt1, .framer-MzakZ .framer-1ctm8wc, .framer-MzakZ .framer-w42y8w, .framer-MzakZ .framer-1q4gp3m, .framer-MzakZ .framer-1iuxpqk, .framer-MzakZ .framer-16ivokv, .framer-MzakZ .framer-1gbfuf6, .framer-MzakZ .framer-1qc0vdg, .framer-MzakZ .framer-nrk72, .framer-MzakZ .framer-1tuxnws, .framer-MzakZ .framer-1kvtyk0, .framer-MzakZ .framer-njvqvx, .framer-MzakZ .framer-17r5nxi, .framer-MzakZ .framer-1m5778o, .framer-MzakZ .framer-qfwrdk, .framer-MzakZ .framer-1dyd4ui, .framer-MzakZ .framer-iwb9va, .framer-MzakZ .framer-oq2qhf, .framer-MzakZ .framer-1a6iv65, .framer-MzakZ .framer-gsdjmb, .framer-MzakZ .framer-1l1p46e, .framer-MzakZ .framer-1xnheva, .framer-MzakZ .framer-gn0sai, .framer-MzakZ .framer-mjizyt, .framer-MzakZ .framer-1fb01i6, .framer-MzakZ .framer-dvfcz4, .framer-MzakZ .framer-1ny8wog, .framer-MzakZ .framer-vaj1ua, .framer-MzakZ .framer-14xafeo, .framer-MzakZ .framer-1iiq0pd, .framer-MzakZ .framer-15h9i9h, .framer-MzakZ .framer-1c3idk1, .framer-MzakZ .framer-rwm3bf, .framer-MzakZ .framer-86uoh4, .framer-MzakZ .framer-17ywyd, .framer-MzakZ .framer-h3ogmi, .framer-MzakZ .framer-qvhup0, .framer-MzakZ .framer-7e3ato, .framer-MzakZ .framer-u6oxgx, .framer-MzakZ .framer-13i15z3 { gap: 0px; } .framer-MzakZ.framer-1j9dkv1 > *, .framer-MzakZ .framer-1iuxpqk > *, .framer-MzakZ .framer-nrk72 > *, .framer-MzakZ .framer-17r5nxi > *, .framer-MzakZ .framer-1a6iv65 > *, .framer-MzakZ .framer-gn0sai > *, .framer-MzakZ .framer-1ny8wog > *, .framer-MzakZ .framer-14xafeo > *, .framer-MzakZ .framer-17ywyd > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-MzakZ.framer-1j9dkv1 > :first-child, .framer-MzakZ .framer-mdjzx8 > :first-child, .framer-MzakZ .framer-1ctm8wc > :first-child, .framer-MzakZ .framer-w42y8w > :first-child, .framer-MzakZ .framer-1iuxpqk > :first-child, .framer-MzakZ .framer-16ivokv > :first-child, .framer-MzakZ .framer-1gbfuf6 > :first-child, .framer-MzakZ .framer-nrk72 > :first-child, .framer-MzakZ .framer-1tuxnws > :first-child, .framer-MzakZ .framer-1kvtyk0 > :first-child, .framer-MzakZ .framer-17r5nxi > :first-child, .framer-MzakZ .framer-1m5778o > :first-child, .framer-MzakZ .framer-1dyd4ui > :first-child, .framer-MzakZ .framer-iwb9va > :first-child, .framer-MzakZ .framer-1a6iv65 > :first-child, .framer-MzakZ .framer-gsdjmb > :first-child, .framer-MzakZ .framer-1l1p46e > :first-child, .framer-MzakZ .framer-gn0sai > :first-child, .framer-MzakZ .framer-mjizyt > :first-child, .framer-MzakZ .framer-1fb01i6 > :first-child, .framer-MzakZ .framer-1ny8wog > :first-child, .framer-MzakZ .framer-vaj1ua > :first-child, .framer-MzakZ .framer-14xafeo > :first-child, .framer-MzakZ .framer-1iiq0pd > :first-child, .framer-MzakZ .framer-1c3idk1 > :first-child, .framer-MzakZ .framer-rwm3bf > :first-child, .framer-MzakZ .framer-86uoh4 > :first-child, .framer-MzakZ .framer-17ywyd > :first-child, .framer-MzakZ .framer-h3ogmi > :first-child, .framer-MzakZ .framer-7e3ato > :first-child, .framer-MzakZ .framer-u6oxgx > :first-child, .framer-MzakZ .framer-13i15z3 > :first-child { margin-top: 0px; } .framer-MzakZ.framer-1j9dkv1 > :last-child, .framer-MzakZ .framer-mdjzx8 > :last-child, .framer-MzakZ .framer-1ctm8wc > :last-child, .framer-MzakZ .framer-w42y8w > :last-child, .framer-MzakZ .framer-1iuxpqk > :last-child, .framer-MzakZ .framer-16ivokv > :last-child, .framer-MzakZ .framer-1gbfuf6 > :last-child, .framer-MzakZ .framer-nrk72 > :last-child, .framer-MzakZ .framer-1tuxnws > :last-child, .framer-MzakZ .framer-1kvtyk0 > :last-child, .framer-MzakZ .framer-17r5nxi > :last-child, .framer-MzakZ .framer-1m5778o > :last-child, .framer-MzakZ .framer-1dyd4ui > :last-child, .framer-MzakZ .framer-iwb9va > :last-child, .framer-MzakZ .framer-1a6iv65 > :last-child, .framer-MzakZ .framer-gsdjmb > :last-child, .framer-MzakZ .framer-1l1p46e > :last-child, .framer-MzakZ .framer-gn0sai > :last-child, .framer-MzakZ .framer-mjizyt > :last-child, .framer-MzakZ .framer-1fb01i6 > :last-child, .framer-MzakZ .framer-1ny8wog > :last-child, .framer-MzakZ .framer-vaj1ua > :last-child, .framer-MzakZ .framer-14xafeo > :last-child, .framer-MzakZ .framer-1iiq0pd > :last-child, .framer-MzakZ .framer-1c3idk1 > :last-child, .framer-MzakZ .framer-rwm3bf > :last-child, .framer-MzakZ .framer-86uoh4 > :last-child, .framer-MzakZ .framer-17ywyd > :last-child, .framer-MzakZ .framer-h3ogmi > :last-child, .framer-MzakZ .framer-7e3ato > :last-child, .framer-MzakZ .framer-u6oxgx > :last-child, .framer-MzakZ .framer-13i15z3 > :last-child { margin-bottom: 0px; } .framer-MzakZ .framer-mdjzx8 > *, .framer-MzakZ .framer-w42y8w > *, .framer-MzakZ .framer-1gbfuf6 > *, .framer-MzakZ .framer-1kvtyk0 > *, .framer-MzakZ .framer-iwb9va > *, .framer-MzakZ .framer-1l1p46e > *, .framer-MzakZ .framer-1fb01i6 > *, .framer-MzakZ .framer-1c3idk1 > *, .framer-MzakZ .framer-rwm3bf > *, .framer-MzakZ .framer-86uoh4 > *, .framer-MzakZ .framer-7e3ato > *, .framer-MzakZ .framer-u6oxgx > *, .framer-MzakZ .framer-13i15z3 > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-MzakZ .framer-14b4dt1 > *, .framer-MzakZ .framer-qfwrdk > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-MzakZ .framer-14b4dt1 > :first-child, .framer-MzakZ .framer-1q4gp3m > :first-child, .framer-MzakZ .framer-1qc0vdg > :first-child, .framer-MzakZ .framer-njvqvx > :first-child, .framer-MzakZ .framer-qfwrdk > :first-child, .framer-MzakZ .framer-oq2qhf > :first-child, .framer-MzakZ .framer-1xnheva > :first-child, .framer-MzakZ .framer-dvfcz4 > :first-child, .framer-MzakZ .framer-15h9i9h > :first-child, .framer-MzakZ .framer-qvhup0 > :first-child { margin-left: 0px; } .framer-MzakZ .framer-14b4dt1 > :last-child, .framer-MzakZ .framer-1q4gp3m > :last-child, .framer-MzakZ .framer-1qc0vdg > :last-child, .framer-MzakZ .framer-njvqvx > :last-child, .framer-MzakZ .framer-qfwrdk > :last-child, .framer-MzakZ .framer-oq2qhf > :last-child, .framer-MzakZ .framer-1xnheva > :last-child, .framer-MzakZ .framer-dvfcz4 > :last-child, .framer-MzakZ .framer-15h9i9h > :last-child, .framer-MzakZ .framer-qvhup0 > :last-child { margin-right: 0px; } .framer-MzakZ .framer-1ctm8wc > *, .framer-MzakZ .framer-1dyd4ui > *, .framer-MzakZ .framer-1iiq0pd > *, .framer-MzakZ .framer-h3ogmi > * { margin: 0px; margin-bottom: calc(60px / 2); margin-top: calc(60px / 2); } .framer-MzakZ .framer-1q4gp3m > *, .framer-MzakZ .framer-njvqvx > *, .framer-MzakZ .framer-oq2qhf > *, .framer-MzakZ .framer-dvfcz4 > * { margin: 0px; margin-left: calc(8px / 2); margin-right: calc(8px / 2); } .framer-MzakZ .framer-16ivokv > *, .framer-MzakZ .framer-1tuxnws > *, .framer-MzakZ .framer-1m5778o > *, .framer-MzakZ .framer-gsdjmb > *, .framer-MzakZ .framer-mjizyt > *, .framer-MzakZ .framer-vaj1ua > * { margin: 0px; margin-bottom: calc(0px / 2); margin-top: calc(0px / 2); } .framer-MzakZ .framer-1qc0vdg > *, .framer-MzakZ .framer-1xnheva > * { margin: 0px; margin-left: calc(6px / 2); margin-right: calc(6px / 2); } .framer-MzakZ .framer-15h9i9h > *, .framer-MzakZ .framer-qvhup0 > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } }",
    "@media (min-width: 1200px) { .framer-MzakZ .hidden-1j9dkv1 { display: none !important; } }",
    "@media (min-width: 810px) and (max-width: 1199px) { .framer-MzakZ .hidden-vqva33 { display: none !important; } .framer-MzakZ.framer-1j9dkv1 { width: 810px; } .framer-MzakZ .framer-13o2ph7-container, .framer-MzakZ .framer-1o4vaib-container { height: 310px; }}",
    "@media (max-width: 809px) { .framer-MzakZ .hidden-1amnja6 { display: none !important; } .framer-MzakZ.framer-1j9dkv1 { width: 390px; } .framer-MzakZ .framer-1ctm8wc, .framer-MzakZ .framer-1dyd4ui { padding: 20px 20px 20px 20px; } .framer-MzakZ .framer-1iiq0pd, .framer-MzakZ .framer-h3ogmi { gap: 40px; padding: 40px 20px 40px 20px; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-MzakZ .framer-1iiq0pd, .framer-MzakZ .framer-h3ogmi { gap: 0px; } .framer-MzakZ .framer-1iiq0pd > *, .framer-MzakZ .framer-h3ogmi > * { margin: 0px; margin-bottom: calc(40px / 2); margin-top: calc(40px / 2); } .framer-MzakZ .framer-1iiq0pd > :first-child, .framer-MzakZ .framer-h3ogmi > :first-child { margin-top: 0px; } .framer-MzakZ .framer-1iiq0pd > :last-child, .framer-MzakZ .framer-h3ogmi > :last-child { margin-bottom: 0px; } }}",
    ...Jr,
    ...Sr,
    ...Lr,
  ],
  be = vr(Ut, Yt, "framer-MzakZ"),
  wa = be;
be.displayName = "Logo";
be.defaultProps = { height: 3111, width: 1200 };
Zr(be, [
  {
    family: "Satoshi",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2",
    weight: "700",
  },
  {
    family: "Satoshi",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2",
    weight: "500",
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
  ...Bt,
  ...Vt,
  ...Hr,
  ...Nr,
  ...Pr,
]);
var xa = {
  exports: {
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    default: {
      type: "reactComponent",
      name: "FramerKc75hJ0SQ",
      slots: [],
      annotations: {
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"NIsnR4e8j":{"layout":["fixed","auto"]},"P2LjDfHJZ":{"layout":["fixed","auto"]}}}',
        framerIntrinsicHeight: "3111",
        framerIntrinsicWidth: "1200",
        framerContractVersion: "1",
        framerImmutableVariables: "true",
        framerResponsiveScreen: "",
        framerDisplayContentsDiv: "false",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
export { xa as __FramerMetadata__, wa as default };
//# sourceMappingURL=dop3TtP24uDjrSFP39vZmjkRqZFX3EWqFwBcgaZsUdU.2CO7NBH6.mjs.map
