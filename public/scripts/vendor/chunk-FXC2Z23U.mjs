import { a as ge } from "./chunk-APGM2C5T.mjs";
import { b as p, c as Y } from "./chunk-OO3TPEBQ.mjs";
import {
  A as fe,
  D as he,
  N as X,
  P as i,
  S as me,
  b as I,
  d as P,
  f as F,
  i as oe,
  k as M,
  n as ae,
  o as s,
  p as le,
  s as j,
  t as de,
  v as D,
  w as se,
  x as pe,
  y as ue,
  z as ce,
} from "./chunk-QEUFNCD2.mjs";
var Oe = 100,
  Ne = {
    left: (n) => `translateX(-${n}px)`,
    right: (n) => `translateX(${n}px)`,
    top: (n) => `translateY(-${n}px)`,
    bottom: (n) => `translateY(${n}px)`,
  },
  G = typeof Animation < "u" && typeof Animation.prototype.updatePlaybackRate == "function";
function K(n) {
  let {
      slots: y,
      gap: T,
      padding: ve,
      paddingPerSide: xe,
      paddingTop: Se,
      paddingRight: Te,
      paddingBottom: _e,
      paddingLeft: we,
      speed: _,
      hoverFactor: V,
      direction: u,
      alignment: Ce,
      sizingOptions: Ie,
      fadeOptions: Me,
      style: Ve,
    } = n,
    { fadeContent: A, overflow: Ae, fadeWidth: U, fadeInset: q, fadeAlpha: J } = Me,
    { widthType: R, heightType: k } = Ie,
    Re = xe ? `${Se}px ${Te}px ${_e}px ${we}px` : `${ve}px`,
    c = X.current() === X.canvas,
    $ = I.count(y),
    w = $ > 0;
  u === !0 && (u = "left");
  let x = u === "left" || u === "right",
    Q = se(0),
    W = Ne[u],
    ke = pe(Q, W),
    b = s(null),
    a = ae(() => [F(), F()], []),
    [f, $e] = le({ parent: null, children: null }),
    Z = [],
    L = [],
    S = 0,
    z = 0;
  (c && ((S = $ ? Math.floor(10 / $) : 0), (z = 1)),
    !c &&
      w &&
      f.parent &&
      ((S = Math.round((f.parent / f.children) * 2) + 1), (S = Math.min(S, Oe)), (z = 1)));
  let ee = oe(() => {
      if (w && b.current) {
        let e = x ? b.current.offsetWidth : b.current.offsetHeight,
          t = a[0].current ? (x ? a[0].current.offsetLeft : a[0].current.offsetTop) : 0,
          r =
            (a[1].current
              ? x
                ? a[1].current.offsetLeft + a[1].current.offsetWidth
                : a[1].current.offsetTop + a[1].current.offsetHeight
              : 0) -
            t +
            T;
        $e({ parent: e, children: r });
      }
    }, []),
    te = c ? { contentVisibility: "auto" } : {};
  if (w) {
    if (!c) {
      let e = s(!0);
      M(
        () => (
          j.read(ee),
          ge(b.current, ({ contentSize: t }) => {
            (!e.current && (t.width || t.height) && j.read(ee), (e.current = !1));
          })
        ),
        []
      );
    }
    Z = I.map(y, (e, t) => {
      var d, r, h, m;
      let g;
      (t === 0 && (g = a[0]), t === y.length - 1 && (g = a[1]));
      let v = {
        width: R ? ((d = e.props) === null || d === void 0 ? void 0 : d.width) : "100%",
        height: k ? ((r = e.props) === null || r === void 0 ? void 0 : r.height) : "100%",
      };
      return p(D, {
        inherit: "id",
        children: p("li", {
          ref: g,
          style: v,
          children: P(
            e,
            {
              style: {
                ...((h = e.props) === null || h === void 0 ? void 0 : h.style),
                ...v,
                flexShrink: 0,
                ...te,
              },
              layoutId: e.props.layoutId ? e.props.layoutId + "-original-" + t : void 0,
            },
            (m = e.props) === null || m === void 0 ? void 0 : m.children
          ),
        }),
      });
    });
  }
  if (!c)
    for (let e = 0; e < S; e++)
      L = [
        ...L,
        ...I.map(y, (t, d) => {
          var r, h, m, g, v, E;
          let He = {
            width: R ? ((r = t.props) === null || r === void 0 ? void 0 : r.width) : "100%",
            height: k ? ((h = t.props) === null || h === void 0 ? void 0 : h.height) : "100%",
            willChange: "transform",
          };
          return p(
            D,
            {
              inherit: "id",
              children: p(
                "li",
                {
                  style: He,
                  "aria-hidden": !0,
                  children: P(
                    t,
                    {
                      key: e + " " + d,
                      style: {
                        ...((m = t.props) === null || m === void 0 ? void 0 : m.style),
                        width: R
                          ? (g = t.props) === null || g === void 0
                            ? void 0
                            : g.width
                          : "100%",
                        height: k
                          ? (v = t.props) === null || v === void 0
                            ? void 0
                            : v.height
                          : "100%",
                        flexShrink: 0,
                        ...te,
                      },
                      layoutId: t.props.layoutId ? t.props.layoutId + "-dupe-" + e : void 0,
                    },
                    (E = t.props) === null || E === void 0 ? void 0 : E.children
                  ),
                },
                e + "li" + d
              ),
            },
            e + "lg" + d
          );
        }),
      ];
  let l = f.children + f.children * Math.round(f.parent / f.children),
    B = s(null),
    H = s(null),
    C = s(0),
    O = s(!1),
    ne = ce(),
    ie = s(null),
    o = s(null);
  if (!c) {
    let e = he(b);
    G
      ? (M(() => {
          if (!(ne || !l || !_))
            return (
              (o.current = ie.current.animate(
                { transform: [W(0), W(l)] },
                { duration: (Math.abs(l) / _) * 1e3, iterations: 1 / 0, easing: "linear" }
              )),
              () => o.current.cancel()
            );
        }, [V, l, _]),
        M(() => {
          o.current &&
            (e && o.current.playState === "paused"
              ? o.current.play()
              : !e && o.current.playState === "running" && o.current.pause());
        }, [e]))
      : ue((t) => {
          if (!l || ne || G) return;
          (B.current === null && (B.current = t), (t = t - B.current));
          let r = (H.current === null ? 0 : t - H.current) * (_ / 1e3);
          (O.current && (r *= V),
            (C.current += r),
            (C.current = fe(0, l, C.current)),
            (H.current = t),
            e && Q.set(C.current));
        });
  }
  let We = x ? "to right" : "to bottom",
    re = U / 2,
    Le = 100 - U / 2,
    ze = De(q, 0, re),
    Be = 100 - q,
    N = `linear-gradient(${We}, rgba(0, 0, 0, ${J}) ${ze}%, rgba(0, 0, 0, 1) ${re}%, rgba(0, 0, 0, 1) ${Le}%, rgba(0, 0, 0, ${J}) ${Be}%)`;
  return w
    ? p("section", {
        style: {
          ...ye,
          opacity: z,
          WebkitMaskImage: A ? N : void 0,
          MozMaskImage: A ? N : void 0,
          maskImage: A ? N : void 0,
          overflow: Ae ? "visible" : "hidden",
          padding: Re,
        },
        ref: b,
        children: Y(de.ul, {
          ref: ie,
          style: {
            ...ye,
            gap: T,
            top: u === "bottom" && be(l) ? -l : void 0,
            left: u === "right" && be(l) ? -l : void 0,
            placeItems: Ce,
            position: "relative",
            flexDirection: x ? "row" : "column",
            ...Ve,
            transform: G ? void 0 : ke,
            willChange: c ? "auto" : "transform",
          },
          onMouseEnter: () => {
            ((O.current = !0), o.current && (o.current.playbackRate = V));
          },
          onMouseLeave: () => {
            ((O.current = !1), o.current && (o.current.playbackRate = 1));
          },
          children: [Z, L],
        }),
      })
    : Y("section", {
        style: Ee,
        children: [
          p("div", { style: Pe, children: "\u2728" }),
          p("p", { style: Fe, children: "Connect to Content" }),
          p("p", {
            style: je,
            children: "Add layers or components to infinitely loop on your page.",
          }),
        ],
      });
}
K.defaultProps = {
  gap: 10,
  padding: 10,
  sizingOptions: { widthType: !0, heightType: !0 },
  fadeOptions: { fadeContent: !0, overflow: !1, fadeWidth: 25, fadeAlpha: 0, fadeInset: 0 },
  direction: !0,
};
me(K, {
  slots: { type: i.Array, title: "Children", control: { type: i.ComponentInstance } },
  speed: {
    type: i.Number,
    title: "Speed",
    min: 0,
    max: 1e3,
    defaultValue: 100,
    unit: "%",
    displayStepper: !0,
    step: 5,
  },
  direction: {
    type: i.Enum,
    title: "Direction",
    options: ["left", "right", "top", "bottom"],
    optionIcons: ["direction-left", "direction-right", "direction-up", "direction-down"],
    optionTitles: ["Left", "Right", "Top", "Bottom"],
    defaultValue: "left",
    displaySegmentedControl: !0,
  },
  alignment: {
    type: i.Enum,
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
  gap: { type: i.Number, title: "Gap" },
  padding: {
    title: "Padding",
    type: i.FusedNumber,
    toggleKey: "paddingPerSide",
    toggleTitles: ["Padding", "Padding per side"],
    valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
    valueLabels: ["T", "R", "B", "L"],
    min: 0,
  },
  sizingOptions: {
    type: i.Object,
    title: "Sizing",
    controls: {
      widthType: {
        type: i.Boolean,
        title: "Width",
        enabledTitle: "Auto",
        disabledTitle: "Stretch",
        defaultValue: !0,
      },
      heightType: {
        type: i.Boolean,
        title: "Height",
        enabledTitle: "Auto",
        disabledTitle: "Stretch",
        defaultValue: !0,
      },
    },
  },
  fadeOptions: {
    type: i.Object,
    title: "Clipping",
    controls: {
      fadeContent: { type: i.Boolean, title: "Fade", defaultValue: !0 },
      overflow: {
        type: i.Boolean,
        title: "Overflow",
        enabledTitle: "Show",
        disabledTitle: "Hide",
        defaultValue: !1,
        hidden(n) {
          return n.fadeContent === !0;
        },
      },
      fadeWidth: {
        type: i.Number,
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
        type: i.Number,
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
        type: i.Number,
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
    type: i.Number,
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
var ye = {
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
  Ee = {
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
  Pe = { fontSize: 32, marginBottom: 10 },
  Fe = { margin: 0, marginBottom: 10, fontWeight: 600, textAlign: "center" },
  je = { margin: 0, opacity: 0.7, maxWidth: 150, lineHeight: 1.5, textAlign: "center" },
  De = (n, y, T) => Math.min(Math.max(n, y), T),
  be = (n) => typeof n == "number" && !isNaN(n);
export { K as a };
//# sourceMappingURL=chunk-FXC2Z23U.mjs.map
