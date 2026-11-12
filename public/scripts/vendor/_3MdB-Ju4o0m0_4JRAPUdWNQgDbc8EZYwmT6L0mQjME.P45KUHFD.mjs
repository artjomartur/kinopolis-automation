import { a as _ } from "./chunk-VBD3ARC4.mjs";
import { a as y } from "./chunk-HBMRKKOJ.mjs";
import "./chunk-2GNE24G3.mjs";
import { a as w } from "./chunk-CVPCFDSR.mjs";
import "./chunk-G7RZZ2HZ.mjs";
import "./chunk-D5FMDQUG.mjs";
import { a as Q, b as J, c as A } from "./chunk-MNHRXVGF.mjs";
import { a as B, b as O, c as Z } from "./chunk-ALFWC2ON.mjs";
import "./chunk-5SAWWLB7.mjs";
import { b as e, c as g } from "./chunk-OO3TPEBQ.mjs";
import {
  H as N,
  K as T,
  V as c,
  W as V,
  Y as x,
  Z as P,
  _ as W,
  aa as X,
  c as f,
  da as F,
  ea as E,
  g as Y,
  l as k,
  m as C,
  ma as K,
  o as L,
  t as q,
  ta as z,
  ua as h,
  v as R,
  va as G,
  wa as u,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var ae = u(y),
  te = u(w),
  n = V(z);
var ie = {
    f1ETNyLap: "(min-width: 810px) and (max-width: 1199px)",
    HlrYeo1L3: "(min-width: 1200px)",
    yQS3wCS5i: "(max-width: 809px)",
  },
  oe = () => typeof document < "u",
  U = "framer-YH3xI",
  ne = {
    f1ETNyLap: "framer-v-3mns6i",
    HlrYeo1L3: "framer-v-1a97qx5",
    yQS3wCS5i: "framer-v-12r9sqa",
  },
  se = { default: { duration: 0 } },
  me = { delay: 0, duration: 3.5, ease: [0.44, 0, 0.56, 1], type: "tween" },
  D = { opacity: 1, rotate: 0, scale: 1, x: 0, y: 30 },
  le = { delay: 0.2, duration: 3.5, ease: [0.44, 0, 0.56, 1], type: "tween" },
  pe = { delay: 0.1, duration: 3.7, ease: [0.44, 0, 0.56, 1], type: "tween" },
  j = { opacity: 1, rotate: 0, scale: 1, x: 0, y: -30 },
  de = { delay: 0.3, duration: 3.7, ease: [0.44, 0, 0.56, 1], type: "tween" },
  b = _(),
  fe = { Desktop: "HlrYeo1L3", Phone: "yQS3wCS5i", Tablet: "f1ETNyLap" },
  ce = ({ height: v, id: i, width: m, ...o }) => {
    var a, t;
    return {
      ...o,
      variant:
        (t = (a = fe[o.variant]) !== null && a !== void 0 ? a : o.variant) !== null && t !== void 0
          ? t
          : "HlrYeo1L3",
    };
  },
  xe = Y(function (v, i) {
    let { activeLocale: m, setLocale: o } = T(),
      { style: a, className: t, layoutId: l, variant: $, ...M } = ce(v);
    C(() => {
      let r = _(void 0, m);
      if (((document.title = r.title || ""), r.viewport)) {
        var p;
        (p = document.querySelector('meta[name="viewport"]')) === null ||
          p === void 0 ||
          p.setAttribute("content", r.viewport);
      }
      if (r.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((d) => d.startsWith("framer-body-"))
            .map((d) => document.body.classList.remove(d)),
          document.body.classList.add(`${r.bodyClassName}-framer-YH3xI`),
          () => {
            document.body.classList.remove(`${r.bodyClassName}-framer-YH3xI`);
          }
        );
    }, [void 0, m]);
    let [I, ue] = K($, ie, !1),
      ge = void 0,
      ye = se.default,
      ee = L(null),
      we = N(),
      H = () => (I === "yQS3wCS5i" ? !oe() : !0),
      re = k(),
      S = [Z, A];
    return (
      W({}),
      e(X.Provider, {
        value: { primaryVariantId: "HlrYeo1L3", variantClassNames: ne },
        children: g(R, {
          id: l ?? re,
          children: [
            e(q.div, {
              ...M,
              className: c(U, ...S, "framer-1a97qx5", t),
              ref: i ?? ee,
              style: { ...a },
              children: e("div", {
                className: "framer-9ehyc8",
                children: g("div", {
                  className: "framer-dqruyg",
                  children: [
                    e(x, {
                      className: "framer-16lags-container",
                      children: e(y, {
                        GmAhv_WVa: 1,
                        height: "100%",
                        hSgW9f2ir: "404",
                        id: "oRmI5G3nU",
                        layoutId: "oRmI5G3nU",
                        p2xmGpLux: "Read more",
                        ToKaS18SW: !1,
                        variant: "Z2wjynIFK",
                        width: "100%",
                        Z69PPXt7v: !0,
                      }),
                    }),
                    e(h, {
                      __fromCanvasComponent: !0,
                      children: e(f, {
                        children: e("h2", {
                          className: "framer-styles-preset-4m6e0d",
                          "data-styles-preset": "Bgl_uNKYX",
                          style: { "--framer-text-alignment": "center" },
                          children: "Page not found",
                        }),
                      }),
                      className: "framer-162ymhq",
                      verticalAlignment: "top",
                      withExternalLayout: !0,
                    }),
                    e(h, {
                      __fromCanvasComponent: !0,
                      children: e(f, {
                        children: e("p", {
                          className: "framer-styles-preset-sxuwop",
                          "data-styles-preset": "dGJYq65Lz",
                          style: { "--framer-text-alignment": "center" },
                          children:
                            "Sorry, we couldn\u2019t find the page you\u2019re looking for.",
                        }),
                      }),
                      className: "framer-101czr2",
                      verticalAlignment: "top",
                      withExternalLayout: !0,
                    }),
                    e(E, {
                      links: [
                        { href: { webPageId: "IilknqsQI" }, implicitPathVariables: void 0 },
                        { href: { webPageId: "IilknqsQI" }, implicitPathVariables: void 0 },
                        { href: { webPageId: "IilknqsQI" }, implicitPathVariables: void 0 },
                      ],
                      children: (r) =>
                        e(x, {
                          className: "framer-190nh66-container",
                          children: e(F, {
                            breakpoint: I,
                            overrides: {
                              f1ETNyLap: { yTZZaFOb3: r[1] },
                              yQS3wCS5i: { yTZZaFOb3: r[2] },
                            },
                            children: e(w, {
                              eszixBaDA: 10,
                              height: "100%",
                              id: "S90tRo4C8",
                              ik9I5qIGz: !1,
                              J0LC2FGV8: !1,
                              KJK1sV1GB: "Go back home",
                              layoutId: "S90tRo4C8",
                              RmkZjgJwi: "ArrowRight",
                              UsLusPFRg: "rgb(0, 0, 0)",
                              variant: "PqgBulBPi",
                              width: "100%",
                              yTZZaFOb3: r[0],
                            }),
                          }),
                        }),
                    }),
                    e(n, {
                      __framer__loop: D,
                      __framer__loopEffectEnabled: !0,
                      __framer__loopRepeatDelay: 0,
                      __framer__loopRepeatType: "mirror",
                      __framer__loopTransition: me,
                      __perspectiveFX: !1,
                      __targetOpacity: 1,
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 1500,
                        intrinsicWidth: 1500,
                        pixelHeight: 1500,
                        pixelWidth: 1500,
                        sizes: "267px",
                        src: "https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png",
                        srcSet:
                          "https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png?scale-down-to=512 512w, https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png 1500w",
                      },
                      className: "framer-1d98pvu",
                      "data-framer-name": "Shape Simple",
                      name: "Shape Simple",
                    }),
                    H() &&
                      e(n, {
                        __framer__loop: D,
                        __framer__loopEffectEnabled: !0,
                        __framer__loopRepeatDelay: 0,
                        __framer__loopRepeatType: "mirror",
                        __framer__loopTransition: le,
                        __perspectiveFX: !1,
                        __targetOpacity: 1,
                        background: {
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 1500,
                          intrinsicWidth: 1500,
                          pixelHeight: 1500,
                          pixelWidth: 1500,
                          sizes: "278px",
                          src: "https://framerusercontent.com/images/tB4sZllT0CUA8PIXYSHGQox5E.png",
                          srcSet:
                            "https://framerusercontent.com/images/tB4sZllT0CUA8PIXYSHGQox5E.png?scale-down-to=512 512w, https://framerusercontent.com/images/tB4sZllT0CUA8PIXYSHGQox5E.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/tB4sZllT0CUA8PIXYSHGQox5E.png 1500w",
                        },
                        className: "framer-14fat9t hidden-12r9sqa",
                        "data-framer-name": "Shape Simple",
                        name: "Shape Simple",
                      }),
                    H() &&
                      e(n, {
                        __framer__loop: j,
                        __framer__loopEffectEnabled: !0,
                        __framer__loopRepeatDelay: 0,
                        __framer__loopRepeatType: "mirror",
                        __framer__loopTransition: pe,
                        __perspectiveFX: !1,
                        __targetOpacity: 1,
                        background: {
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 1500,
                          intrinsicWidth: 1500,
                          pixelHeight: 1500,
                          pixelWidth: 1500,
                          sizes: "92px",
                          src: "https://framerusercontent.com/images/kKltvqeoXSVKnc1KWOkxuZx4VI.png",
                          srcSet:
                            "https://framerusercontent.com/images/kKltvqeoXSVKnc1KWOkxuZx4VI.png?scale-down-to=512 512w, https://framerusercontent.com/images/kKltvqeoXSVKnc1KWOkxuZx4VI.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/kKltvqeoXSVKnc1KWOkxuZx4VI.png 1500w",
                        },
                        className: "framer-1k11drh hidden-12r9sqa",
                        "data-framer-name": "Shape Simple",
                        name: "Shape Simple",
                      }),
                    e(n, {
                      __framer__loop: j,
                      __framer__loopEffectEnabled: !0,
                      __framer__loopRepeatDelay: 0,
                      __framer__loopRepeatType: "mirror",
                      __framer__loopTransition: de,
                      __perspectiveFX: !1,
                      __targetOpacity: 1,
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 1500,
                        intrinsicWidth: 1500,
                        pixelHeight: 1500,
                        pixelWidth: 1500,
                        sizes: "116px",
                        src: "https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png",
                        srcSet:
                          "https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png?scale-down-to=512 512w, https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png 1500w",
                      },
                      className: "framer-a9q96v",
                      "data-framer-name": "Shape Simple",
                      name: "Shape Simple",
                    }),
                  ],
                }),
              }),
            }),
            e("div", { className: c(U, ...S), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  he = [
    '.framer-YH3xI[data-border="true"]::after, .framer-YH3xI [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    `.${b.bodyClassName}-framer-YH3xI { background: white; }`,
    ".framer-YH3xI.framer-ukkwhs, .framer-YH3xI .framer-ukkwhs { display: block; }",
    ".framer-YH3xI.framer-1a97qx5 { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; }",
    ".framer-YH3xI .framer-9ehyc8 { align-content: center; align-items: center; background: radial-gradient(90.4% 50% at 50% 100%, rgba(217, 142, 254, 0.2) 0%, rgba(171, 171, 171, 0) 100%); display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 100vh; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-YH3xI .framer-dqruyg { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; max-width: 800px; overflow: visible; padding: 30px 30px 30px 30px; position: relative; width: 100%; }",
    ".framer-YH3xI .framer-16lags-container, .framer-YH3xI .framer-190nh66-container { flex: none; height: auto; position: relative; width: auto; }",
    ".framer-YH3xI .framer-162ymhq, .framer-YH3xI .framer-101czr2 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 510px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-YH3xI .framer-1d98pvu { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 267px); left: -105px; overflow: visible; position: absolute; top: -168px; width: 267px; z-index: 1; }",
    ".framer-YH3xI .framer-14fat9t { aspect-ratio: 1 / 1; bottom: -132px; flex: none; height: var(--framer-aspect-ratio-supported, 278px); overflow: visible; position: absolute; right: -92px; width: 278px; z-index: 1; }",
    ".framer-YH3xI .framer-1k11drh { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 92px); overflow: visible; position: absolute; right: 124px; top: -51px; width: 92px; z-index: 1; }",
    ".framer-YH3xI .framer-a9q96v { aspect-ratio: 1 / 1; bottom: -54px; flex: none; height: var(--framer-aspect-ratio-supported, 116px); left: 44px; overflow: visible; position: absolute; width: 116px; z-index: 1; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-YH3xI.framer-1a97qx5, .framer-YH3xI .framer-9ehyc8, .framer-YH3xI .framer-dqruyg { gap: 0px; } .framer-YH3xI.framer-1a97qx5 > * { margin: 0px; margin-bottom: calc(0px / 2); margin-top: calc(0px / 2); } .framer-YH3xI.framer-1a97qx5 > :first-child, .framer-YH3xI .framer-9ehyc8 > :first-child, .framer-YH3xI .framer-dqruyg > :first-child { margin-top: 0px; } .framer-YH3xI.framer-1a97qx5 > :last-child, .framer-YH3xI .framer-9ehyc8 > :last-child, .framer-YH3xI .framer-dqruyg > :last-child { margin-bottom: 0px; } .framer-YH3xI .framer-9ehyc8 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-YH3xI .framer-dqruyg > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } }",
    "@media (min-width: 1200px) { .framer-YH3xI .hidden-1a97qx5 { display: none !important; } }",
    `@media (min-width: 810px) and (max-width: 1199px) { .framer-YH3xI .hidden-3mns6i { display: none !important; } .${b.bodyClassName}-framer-YH3xI { background: white; } .framer-YH3xI.framer-1a97qx5 { width: 810px; }}`,
    `@media (max-width: 809px) { .framer-YH3xI .hidden-12r9sqa { display: none !important; } .${b.bodyClassName}-framer-YH3xI { background: white; } .framer-YH3xI.framer-1a97qx5 { width: 390px; } .framer-YH3xI .framer-101czr2 { max-width: 250px; }}`,
    ...O,
    ...J,
  ],
  s = P(xe, he, "framer-YH3xI"),
  Ne = s;
s.displayName = "Page";
s.defaultProps = { height: 800, width: 1200 };
G(s, [...ae, ...te, ...B, ...Q]);
var Te = {
  exports: {
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    default: {
      type: "reactComponent",
      name: "FramerCTyNb9C1r",
      slots: [],
      annotations: {
        framerContractVersion: "1",
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"f1ETNyLap":{"layout":["fixed","auto"]},"yQS3wCS5i":{"layout":["fixed","auto"]}}}',
        framerDisplayContentsDiv: "false",
        framerImmutableVariables: "true",
        framerResponsiveScreen: "",
        framerIntrinsicHeight: "800",
        framerIntrinsicWidth: "1200",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
export { Te as __FramerMetadata__, Ne as default };
//# sourceMappingURL=_3MdB-Ju4o0m0_4JRAPUdWNQgDbc8EZYwmT6L0mQjME.P45KUHFD.mjs.map
