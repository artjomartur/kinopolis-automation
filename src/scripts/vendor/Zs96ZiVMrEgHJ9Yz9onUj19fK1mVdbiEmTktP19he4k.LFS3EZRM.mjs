import { a as x } from "./chunk-EWQIW4FJ.mjs";
import { b as e, c as s } from "./chunk-OO3TPEBQ.mjs";
import {
  K as b,
  V as w,
  Z as z,
  _ as J,
  aa as y,
  da as r,
  g as W,
  l as k,
  m as H,
  ma as O,
  o as v,
  t as E,
  ta as i,
  v as q,
  va as N,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var M = {
    A6JKbGNPN: "(min-width: 1200px)",
    EqOeOa8fx: "(max-width: 809px)",
    Ikqpyq2iO: "(min-width: 810px) and (max-width: 1199px)",
  },
  Y = () => typeof document < "u",
  U = "framer-5NtJE",
  j = { A6JKbGNPN: "framer-v-pyn0mh", EqOeOa8fx: "framer-v-1f11iu", Ikqpyq2iO: "framer-v-123xlxy" },
  X = { default: { duration: 0 } },
  re = x(),
  Q = { Desktop: "A6JKbGNPN", Phone: "EqOeOa8fx", Tablet: "Ikqpyq2iO" },
  B = ({ height: u, id: c, width: l, ...p }) => {
    var m, o;
    return {
      ...p,
      variant:
        (o = (m = Q[p.variant]) !== null && m !== void 0 ? m : p.variant) !== null && o !== void 0
          ? o
          : "A6JKbGNPN",
    };
  },
  R = W(function (u, c) {
    let { activeLocale: l, setLocale: p } = b(),
      { style: m, className: o, layoutId: f, variant: I, ...L } = B(u);
    H(() => {
      let n = x(void 0, l);
      if (((document.title = n.title || ""), n.viewport)) {
        var h;
        (h = document.querySelector('meta[name="viewport"]')) === null ||
          h === void 0 ||
          h.setAttribute("content", n.viewport);
      }
      if (n.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((d) => d.startsWith("framer-body-"))
            .map((d) => document.body.classList.remove(d)),
          document.body.classList.add(`${n.bodyClassName}-framer-5NtJE`),
          () => {
            document.body.classList.remove(`${n.bodyClassName}-framer-5NtJE`);
          }
        );
    }, [void 0, l]);
    let [t, T] = O(I, M, !1),
      A = void 0,
      G = X.default,
      K = v(null),
      a = () => (t === "EqOeOa8fx" ? !Y() : !0),
      C = k(),
      S = [];
    return (
      J({}),
      e(y.Provider, {
        value: { primaryVariantId: "A6JKbGNPN", variantClassNames: j },
        children: s(q, {
          id: f ?? C,
          children: [
            e(E.div, {
              ...L,
              className: w(U, ...S, "framer-pyn0mh", o),
              "data-border": !0,
              ref: c ?? K,
              style: { ...m },
              children: s("div", {
                className: "framer-x0i3ra",
                "data-framer-name": "Wrapper",
                name: "Wrapper",
                children: [
                  s("div", {
                    className: "framer-pl5l3e",
                    "data-border": !0,
                    "data-framer-name": "3D Purple Shapes",
                    name: "3D Purple Shapes",
                    children: [
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 750,
                              intrinsicWidth: 750,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/5Ld0qv0X57oT2RZ0kygHJOt91IA.png?scale-down-to=1024",
                              srcSet:
                                "https://framerusercontent.com/images/5Ld0qv0X57oT2RZ0kygHJOt91IA.png?scale-down-to=512 512w, https://framerusercontent.com/images/5Ld0qv0X57oT2RZ0kygHJOt91IA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/5Ld0qv0X57oT2RZ0kygHJOt91IA.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 750,
                              intrinsicWidth: 750,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/5Ld0qv0X57oT2RZ0kygHJOt91IA.png?scale-down-to=1024",
                              srcSet:
                                "https://framerusercontent.com/images/5Ld0qv0X57oT2RZ0kygHJOt91IA.png?scale-down-to=512 512w, https://framerusercontent.com/images/5Ld0qv0X57oT2RZ0kygHJOt91IA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/5Ld0qv0X57oT2RZ0kygHJOt91IA.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 750,
                            intrinsicWidth: 750,
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/5Ld0qv0X57oT2RZ0kygHJOt91IA.png?scale-down-to=1024",
                            srcSet:
                              "https://framerusercontent.com/images/5Ld0qv0X57oT2RZ0kygHJOt91IA.png?scale-down-to=512 512w, https://framerusercontent.com/images/5Ld0qv0X57oT2RZ0kygHJOt91IA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/5Ld0qv0X57oT2RZ0kygHJOt91IA.png 1500w",
                          },
                          className: "framer-19b7u2t",
                          "data-framer-name": "Shape Simple",
                          name: "Shape Simple",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/MlzqIJS0Goq7O3Y8kcQdEpnlYzw.png",
                              srcSet:
                                "https://framerusercontent.com/images/MlzqIJS0Goq7O3Y8kcQdEpnlYzw.png?scale-down-to=512 512w, https://framerusercontent.com/images/MlzqIJS0Goq7O3Y8kcQdEpnlYzw.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/MlzqIJS0Goq7O3Y8kcQdEpnlYzw.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/MlzqIJS0Goq7O3Y8kcQdEpnlYzw.png",
                              srcSet:
                                "https://framerusercontent.com/images/MlzqIJS0Goq7O3Y8kcQdEpnlYzw.png?scale-down-to=512 512w, https://framerusercontent.com/images/MlzqIJS0Goq7O3Y8kcQdEpnlYzw.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/MlzqIJS0Goq7O3Y8kcQdEpnlYzw.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/MlzqIJS0Goq7O3Y8kcQdEpnlYzw.png",
                            srcSet:
                              "https://framerusercontent.com/images/MlzqIJS0Goq7O3Y8kcQdEpnlYzw.png?scale-down-to=512 512w, https://framerusercontent.com/images/MlzqIJS0Goq7O3Y8kcQdEpnlYzw.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/MlzqIJS0Goq7O3Y8kcQdEpnlYzw.png 1500w",
                          },
                          className: "framer-1sznpqe",
                          "data-framer-name": "Shape Simple",
                          name: "Shape Simple",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png",
                              srcSet:
                                "https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png?scale-down-to=512 512w, https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png",
                              srcSet:
                                "https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png?scale-down-to=512 512w, https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png",
                            srcSet:
                              "https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png?scale-down-to=512 512w, https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/ziX3xXWPTuwbJWBJqyUlYgkm4w.png 1500w",
                          },
                          className: "framer-12d5emw",
                          "data-framer-name": "Shape Simple",
                          name: "Shape Simple",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/aFCbUYdUmerMHuwa4x30RL9kQo8.png",
                              srcSet:
                                "https://framerusercontent.com/images/aFCbUYdUmerMHuwa4x30RL9kQo8.png?scale-down-to=512 512w, https://framerusercontent.com/images/aFCbUYdUmerMHuwa4x30RL9kQo8.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/aFCbUYdUmerMHuwa4x30RL9kQo8.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/aFCbUYdUmerMHuwa4x30RL9kQo8.png",
                              srcSet:
                                "https://framerusercontent.com/images/aFCbUYdUmerMHuwa4x30RL9kQo8.png?scale-down-to=512 512w, https://framerusercontent.com/images/aFCbUYdUmerMHuwa4x30RL9kQo8.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/aFCbUYdUmerMHuwa4x30RL9kQo8.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/aFCbUYdUmerMHuwa4x30RL9kQo8.png",
                            srcSet:
                              "https://framerusercontent.com/images/aFCbUYdUmerMHuwa4x30RL9kQo8.png?scale-down-to=512 512w, https://framerusercontent.com/images/aFCbUYdUmerMHuwa4x30RL9kQo8.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/aFCbUYdUmerMHuwa4x30RL9kQo8.png 1500w",
                          },
                          className: "framer-3j05wi",
                          "data-framer-name": "Shape Simple",
                          name: "Shape Simple",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png",
                              srcSet:
                                "https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png?scale-down-to=512 512w, https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png",
                              srcSet:
                                "https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png?scale-down-to=512 512w, https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png",
                            srcSet:
                              "https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png?scale-down-to=512 512w, https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png 1500w",
                          },
                          className: "framer-mnke1a",
                          "data-framer-name": "Shape Simple",
                          name: "Shape Simple",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/E2w1sSqy1wgCgwxqdqGU0qIljU8.png",
                              srcSet:
                                "https://framerusercontent.com/images/E2w1sSqy1wgCgwxqdqGU0qIljU8.png?scale-down-to=512 512w, https://framerusercontent.com/images/E2w1sSqy1wgCgwxqdqGU0qIljU8.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/E2w1sSqy1wgCgwxqdqGU0qIljU8.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/E2w1sSqy1wgCgwxqdqGU0qIljU8.png",
                              srcSet:
                                "https://framerusercontent.com/images/E2w1sSqy1wgCgwxqdqGU0qIljU8.png?scale-down-to=512 512w, https://framerusercontent.com/images/E2w1sSqy1wgCgwxqdqGU0qIljU8.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/E2w1sSqy1wgCgwxqdqGU0qIljU8.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/E2w1sSqy1wgCgwxqdqGU0qIljU8.png",
                            srcSet:
                              "https://framerusercontent.com/images/E2w1sSqy1wgCgwxqdqGU0qIljU8.png?scale-down-to=512 512w, https://framerusercontent.com/images/E2w1sSqy1wgCgwxqdqGU0qIljU8.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/E2w1sSqy1wgCgwxqdqGU0qIljU8.png 1500w",
                          },
                          className: "framer-1p42t0c",
                          "data-framer-name": "Shape Simple",
                          name: "Shape Simple",
                        }),
                      }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/tB4sZllT0CUA8PIXYSHGQox5E.png",
                                srcSet:
                                  "https://framerusercontent.com/images/tB4sZllT0CUA8PIXYSHGQox5E.png?scale-down-to=512 512w, https://framerusercontent.com/images/tB4sZllT0CUA8PIXYSHGQox5E.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/tB4sZllT0CUA8PIXYSHGQox5E.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/tB4sZllT0CUA8PIXYSHGQox5E.png",
                              srcSet:
                                "https://framerusercontent.com/images/tB4sZllT0CUA8PIXYSHGQox5E.png?scale-down-to=512 512w, https://framerusercontent.com/images/tB4sZllT0CUA8PIXYSHGQox5E.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/tB4sZllT0CUA8PIXYSHGQox5E.png 1500w",
                            },
                            className: "framer-nv22st hidden-1f11iu",
                            "data-framer-name": "Shape Simple",
                            name: "Shape Simple",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/Npaw8IM6UqGSdlkI86BdqasGU.png",
                                srcSet:
                                  "https://framerusercontent.com/images/Npaw8IM6UqGSdlkI86BdqasGU.png?scale-down-to=512 512w, https://framerusercontent.com/images/Npaw8IM6UqGSdlkI86BdqasGU.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/Npaw8IM6UqGSdlkI86BdqasGU.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/Npaw8IM6UqGSdlkI86BdqasGU.png",
                              srcSet:
                                "https://framerusercontent.com/images/Npaw8IM6UqGSdlkI86BdqasGU.png?scale-down-to=512 512w, https://framerusercontent.com/images/Npaw8IM6UqGSdlkI86BdqasGU.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/Npaw8IM6UqGSdlkI86BdqasGU.png 1500w",
                            },
                            className: "framer-r7663f hidden-1f11iu",
                            "data-framer-name": "Shape Simple",
                            name: "Shape Simple",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/Hi0HCeysKaPseTtOsCsCaw9aORg.png",
                                srcSet:
                                  "https://framerusercontent.com/images/Hi0HCeysKaPseTtOsCsCaw9aORg.png?scale-down-to=512 512w, https://framerusercontent.com/images/Hi0HCeysKaPseTtOsCsCaw9aORg.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/Hi0HCeysKaPseTtOsCsCaw9aORg.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/Hi0HCeysKaPseTtOsCsCaw9aORg.png",
                              srcSet:
                                "https://framerusercontent.com/images/Hi0HCeysKaPseTtOsCsCaw9aORg.png?scale-down-to=512 512w, https://framerusercontent.com/images/Hi0HCeysKaPseTtOsCsCaw9aORg.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/Hi0HCeysKaPseTtOsCsCaw9aORg.png 1500w",
                            },
                            className: "framer-129bouk hidden-1f11iu",
                            "data-framer-name": "Shape Simple",
                            name: "Shape Simple",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png",
                                srcSet:
                                  "https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png?scale-down-to=512 512w, https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png",
                              srcSet:
                                "https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png?scale-down-to=512 512w, https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png 1500w",
                            },
                            className: "framer-ieamw6 hidden-1f11iu",
                            "data-framer-name": "Shape Simple",
                            name: "Shape Simple",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/lOOpBoC9jvHxX1j7rdZHhTFXbt0.png",
                                srcSet:
                                  "https://framerusercontent.com/images/lOOpBoC9jvHxX1j7rdZHhTFXbt0.png?scale-down-to=512 512w, https://framerusercontent.com/images/lOOpBoC9jvHxX1j7rdZHhTFXbt0.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/lOOpBoC9jvHxX1j7rdZHhTFXbt0.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/lOOpBoC9jvHxX1j7rdZHhTFXbt0.png",
                              srcSet:
                                "https://framerusercontent.com/images/lOOpBoC9jvHxX1j7rdZHhTFXbt0.png?scale-down-to=512 512w, https://framerusercontent.com/images/lOOpBoC9jvHxX1j7rdZHhTFXbt0.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/lOOpBoC9jvHxX1j7rdZHhTFXbt0.png 1500w",
                            },
                            className: "framer-szl9nw hidden-1f11iu",
                            "data-framer-name": "Shape Simple",
                            name: "Shape Simple",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/uHvJyjZWiE8bKfHzoafpa8zzBM.png",
                                srcSet:
                                  "https://framerusercontent.com/images/uHvJyjZWiE8bKfHzoafpa8zzBM.png?scale-down-to=512 512w, https://framerusercontent.com/images/uHvJyjZWiE8bKfHzoafpa8zzBM.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/uHvJyjZWiE8bKfHzoafpa8zzBM.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/uHvJyjZWiE8bKfHzoafpa8zzBM.png",
                              srcSet:
                                "https://framerusercontent.com/images/uHvJyjZWiE8bKfHzoafpa8zzBM.png?scale-down-to=512 512w, https://framerusercontent.com/images/uHvJyjZWiE8bKfHzoafpa8zzBM.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/uHvJyjZWiE8bKfHzoafpa8zzBM.png 1500w",
                            },
                            className: "framer-1cc4mp1 hidden-1f11iu",
                            "data-framer-name": "Shape Simple",
                            name: "Shape Simple",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/kKltvqeoXSVKnc1KWOkxuZx4VI.png",
                                srcSet:
                                  "https://framerusercontent.com/images/kKltvqeoXSVKnc1KWOkxuZx4VI.png?scale-down-to=512 512w, https://framerusercontent.com/images/kKltvqeoXSVKnc1KWOkxuZx4VI.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/kKltvqeoXSVKnc1KWOkxuZx4VI.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/kKltvqeoXSVKnc1KWOkxuZx4VI.png",
                              srcSet:
                                "https://framerusercontent.com/images/kKltvqeoXSVKnc1KWOkxuZx4VI.png?scale-down-to=512 512w, https://framerusercontent.com/images/kKltvqeoXSVKnc1KWOkxuZx4VI.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/kKltvqeoXSVKnc1KWOkxuZx4VI.png 1500w",
                            },
                            className: "framer-26so6v hidden-1f11iu",
                            "data-framer-name": "Shape Simple",
                            name: "Shape Simple",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/zb9Lv91OTcOLIEct5XWx5DmdIw.png",
                                srcSet:
                                  "https://framerusercontent.com/images/zb9Lv91OTcOLIEct5XWx5DmdIw.png?scale-down-to=512 512w, https://framerusercontent.com/images/zb9Lv91OTcOLIEct5XWx5DmdIw.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/zb9Lv91OTcOLIEct5XWx5DmdIw.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/zb9Lv91OTcOLIEct5XWx5DmdIw.png",
                              srcSet:
                                "https://framerusercontent.com/images/zb9Lv91OTcOLIEct5XWx5DmdIw.png?scale-down-to=512 512w, https://framerusercontent.com/images/zb9Lv91OTcOLIEct5XWx5DmdIw.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/zb9Lv91OTcOLIEct5XWx5DmdIw.png 1500w",
                            },
                            className: "framer-1v3vwzn hidden-1f11iu",
                            "data-framer-name": "Shape Simple",
                            name: "Shape Simple",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/EAQMWeLgzh6dqj84mEgphc35Ms.png",
                                srcSet:
                                  "https://framerusercontent.com/images/EAQMWeLgzh6dqj84mEgphc35Ms.png?scale-down-to=512 512w, https://framerusercontent.com/images/EAQMWeLgzh6dqj84mEgphc35Ms.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/EAQMWeLgzh6dqj84mEgphc35Ms.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/EAQMWeLgzh6dqj84mEgphc35Ms.png",
                              srcSet:
                                "https://framerusercontent.com/images/EAQMWeLgzh6dqj84mEgphc35Ms.png?scale-down-to=512 512w, https://framerusercontent.com/images/EAQMWeLgzh6dqj84mEgphc35Ms.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/EAQMWeLgzh6dqj84mEgphc35Ms.png 1500w",
                            },
                            className: "framer-rnmwon hidden-1f11iu",
                            "data-framer-name": "Shape Simple",
                            name: "Shape Simple",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/UaehuySGbAQUD7LaqLmpmo71Y4.png",
                                srcSet:
                                  "https://framerusercontent.com/images/UaehuySGbAQUD7LaqLmpmo71Y4.png?scale-down-to=512 512w, https://framerusercontent.com/images/UaehuySGbAQUD7LaqLmpmo71Y4.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/UaehuySGbAQUD7LaqLmpmo71Y4.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/UaehuySGbAQUD7LaqLmpmo71Y4.png",
                              srcSet:
                                "https://framerusercontent.com/images/UaehuySGbAQUD7LaqLmpmo71Y4.png?scale-down-to=512 512w, https://framerusercontent.com/images/UaehuySGbAQUD7LaqLmpmo71Y4.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/UaehuySGbAQUD7LaqLmpmo71Y4.png 1500w",
                            },
                            className: "framer-vptm8w hidden-1f11iu",
                            "data-framer-name": "Shape Simple",
                            name: "Shape Simple",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/f3nIBf6BqjX3Wy0pQLuHh8ZRx0.png",
                                srcSet:
                                  "https://framerusercontent.com/images/f3nIBf6BqjX3Wy0pQLuHh8ZRx0.png?scale-down-to=512 512w, https://framerusercontent.com/images/f3nIBf6BqjX3Wy0pQLuHh8ZRx0.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/f3nIBf6BqjX3Wy0pQLuHh8ZRx0.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/f3nIBf6BqjX3Wy0pQLuHh8ZRx0.png",
                              srcSet:
                                "https://framerusercontent.com/images/f3nIBf6BqjX3Wy0pQLuHh8ZRx0.png?scale-down-to=512 512w, https://framerusercontent.com/images/f3nIBf6BqjX3Wy0pQLuHh8ZRx0.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/f3nIBf6BqjX3Wy0pQLuHh8ZRx0.png 1500w",
                            },
                            className: "framer-1xvak4i hidden-1f11iu",
                            "data-framer-name": "Shape Simple",
                            name: "Shape Simple",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/kuTB1xIS19Jagg01OsFHzQZL3c.png",
                                srcSet:
                                  "https://framerusercontent.com/images/kuTB1xIS19Jagg01OsFHzQZL3c.png?scale-down-to=512 512w, https://framerusercontent.com/images/kuTB1xIS19Jagg01OsFHzQZL3c.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/kuTB1xIS19Jagg01OsFHzQZL3c.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/kuTB1xIS19Jagg01OsFHzQZL3c.png",
                              srcSet:
                                "https://framerusercontent.com/images/kuTB1xIS19Jagg01OsFHzQZL3c.png?scale-down-to=512 512w, https://framerusercontent.com/images/kuTB1xIS19Jagg01OsFHzQZL3c.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/kuTB1xIS19Jagg01OsFHzQZL3c.png 1500w",
                            },
                            className: "framer-so80bb hidden-1f11iu",
                            "data-framer-name": "Shape Simple",
                            name: "Shape Simple",
                          }),
                        }),
                    ],
                  }),
                  s("div", {
                    className: "framer-1bp77ns",
                    "data-border": !0,
                    "data-framer-name": "3D Holo Shapes",
                    name: "3D Holo Shapes",
                    children: [
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/2aT8NM5D6n5Eiagt1uk2XS2VEvo.png",
                              srcSet:
                                "https://framerusercontent.com/images/2aT8NM5D6n5Eiagt1uk2XS2VEvo.png?scale-down-to=512 512w, https://framerusercontent.com/images/2aT8NM5D6n5Eiagt1uk2XS2VEvo.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/2aT8NM5D6n5Eiagt1uk2XS2VEvo.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/2aT8NM5D6n5Eiagt1uk2XS2VEvo.png",
                              srcSet:
                                "https://framerusercontent.com/images/2aT8NM5D6n5Eiagt1uk2XS2VEvo.png?scale-down-to=512 512w, https://framerusercontent.com/images/2aT8NM5D6n5Eiagt1uk2XS2VEvo.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/2aT8NM5D6n5Eiagt1uk2XS2VEvo.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/2aT8NM5D6n5Eiagt1uk2XS2VEvo.png",
                            srcSet:
                              "https://framerusercontent.com/images/2aT8NM5D6n5Eiagt1uk2XS2VEvo.png?scale-down-to=512 512w, https://framerusercontent.com/images/2aT8NM5D6n5Eiagt1uk2XS2VEvo.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/2aT8NM5D6n5Eiagt1uk2XS2VEvo.png 1500w",
                          },
                          className: "framer-1lv5u75",
                          "data-framer-name": "Shape Holo",
                          name: "Shape Holo",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/9U5SqSQTg0nYtzEWuxa3bJ4n5ls.png",
                              srcSet:
                                "https://framerusercontent.com/images/9U5SqSQTg0nYtzEWuxa3bJ4n5ls.png?scale-down-to=512 512w, https://framerusercontent.com/images/9U5SqSQTg0nYtzEWuxa3bJ4n5ls.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/9U5SqSQTg0nYtzEWuxa3bJ4n5ls.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/9U5SqSQTg0nYtzEWuxa3bJ4n5ls.png",
                              srcSet:
                                "https://framerusercontent.com/images/9U5SqSQTg0nYtzEWuxa3bJ4n5ls.png?scale-down-to=512 512w, https://framerusercontent.com/images/9U5SqSQTg0nYtzEWuxa3bJ4n5ls.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/9U5SqSQTg0nYtzEWuxa3bJ4n5ls.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/9U5SqSQTg0nYtzEWuxa3bJ4n5ls.png",
                            srcSet:
                              "https://framerusercontent.com/images/9U5SqSQTg0nYtzEWuxa3bJ4n5ls.png?scale-down-to=512 512w, https://framerusercontent.com/images/9U5SqSQTg0nYtzEWuxa3bJ4n5ls.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/9U5SqSQTg0nYtzEWuxa3bJ4n5ls.png 1500w",
                          },
                          className: "framer-wwwd6q",
                          "data-framer-name": "Shape Holo",
                          name: "Shape Holo",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png",
                              srcSet:
                                "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4.png 512w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-98c1fc.png 1024w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png",
                              srcSet:
                                "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4.png 512w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-98c1fc.png 1024w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png",
                            srcSet:
                              "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4.png 512w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-98c1fc.png 1024w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png 1500w",
                          },
                          className: "framer-1wb21nz",
                          "data-framer-name": "Shape Holo",
                          name: "Shape Holo",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/BVf8P4osWKSlvmWmgj4pyRMjYNk.png",
                              srcSet:
                                "https://framerusercontent.com/images/BVf8P4osWKSlvmWmgj4pyRMjYNk.png?scale-down-to=512 512w, https://framerusercontent.com/images/BVf8P4osWKSlvmWmgj4pyRMjYNk.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/BVf8P4osWKSlvmWmgj4pyRMjYNk.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/BVf8P4osWKSlvmWmgj4pyRMjYNk.png",
                              srcSet:
                                "https://framerusercontent.com/images/BVf8P4osWKSlvmWmgj4pyRMjYNk.png?scale-down-to=512 512w, https://framerusercontent.com/images/BVf8P4osWKSlvmWmgj4pyRMjYNk.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/BVf8P4osWKSlvmWmgj4pyRMjYNk.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/BVf8P4osWKSlvmWmgj4pyRMjYNk.png",
                            srcSet:
                              "https://framerusercontent.com/images/BVf8P4osWKSlvmWmgj4pyRMjYNk.png?scale-down-to=512 512w, https://framerusercontent.com/images/BVf8P4osWKSlvmWmgj4pyRMjYNk.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/BVf8P4osWKSlvmWmgj4pyRMjYNk.png 1500w",
                          },
                          className: "framer-1tmmzun",
                          "data-framer-name": "Shape Holo",
                          name: "Shape Holo",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-ccdb64.png",
                              srcSet:
                                "../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws.png 512w, ../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-83763e.png 1024w, ../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-ccdb64.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-ccdb64.png",
                              srcSet:
                                "../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws.png 512w, ../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-83763e.png 1024w, ../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-ccdb64.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-ccdb64.png",
                            srcSet:
                              "../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws.png 512w, ../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-83763e.png 1024w, ../../assets/images/QBkCPoeejpECqrXOviZdvDrmKws-ccdb64.png 1500w",
                          },
                          className: "framer-1qiuuxi",
                          "data-framer-name": "Shape Holo",
                          name: "Shape Holo",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/v3w3Ee0g7lOrlZtCW44t0Vafzs8.png",
                              srcSet:
                                "https://framerusercontent.com/images/v3w3Ee0g7lOrlZtCW44t0Vafzs8.png?scale-down-to=512 512w, https://framerusercontent.com/images/v3w3Ee0g7lOrlZtCW44t0Vafzs8.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/v3w3Ee0g7lOrlZtCW44t0Vafzs8.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/v3w3Ee0g7lOrlZtCW44t0Vafzs8.png",
                              srcSet:
                                "https://framerusercontent.com/images/v3w3Ee0g7lOrlZtCW44t0Vafzs8.png?scale-down-to=512 512w, https://framerusercontent.com/images/v3w3Ee0g7lOrlZtCW44t0Vafzs8.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/v3w3Ee0g7lOrlZtCW44t0Vafzs8.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/v3w3Ee0g7lOrlZtCW44t0Vafzs8.png",
                            srcSet:
                              "https://framerusercontent.com/images/v3w3Ee0g7lOrlZtCW44t0Vafzs8.png?scale-down-to=512 512w, https://framerusercontent.com/images/v3w3Ee0g7lOrlZtCW44t0Vafzs8.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/v3w3Ee0g7lOrlZtCW44t0Vafzs8.png 1500w",
                          },
                          className: "framer-1jezsl6",
                          "data-framer-name": "Shape Holo",
                          name: "Shape Holo",
                        }),
                      }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw-181bc6.png",
                                srcSet:
                                  "../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw.png 512w, ../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw-fe9e96.png 1024w, ../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw-181bc6.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw-181bc6.png",
                              srcSet:
                                "../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw.png 512w, ../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw-fe9e96.png 1024w, ../../assets/images/CoAe1eW9S1x6kWgYfFZw038Bw-181bc6.png 1500w",
                            },
                            className: "framer-1e4ev4e hidden-1f11iu",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "../../assets/images/mIeiiFyiLX8guUCulp8nzYRde7s-aacfcd.png",
                                srcSet:
                                  "../../assets/images/mIeiiFyiLX8guUCulp8nzYRde7s.png 512w, ../../assets/images/mIeiiFyiLX8guUCulp8nzYRde7s-b170eb.png 1024w, ../../assets/images/mIeiiFyiLX8guUCulp8nzYRde7s-aacfcd.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "../../assets/images/mIeiiFyiLX8guUCulp8nzYRde7s-aacfcd.png",
                              srcSet:
                                "../../assets/images/mIeiiFyiLX8guUCulp8nzYRde7s.png 512w, ../../assets/images/mIeiiFyiLX8guUCulp8nzYRde7s-b170eb.png 1024w, ../../assets/images/mIeiiFyiLX8guUCulp8nzYRde7s-aacfcd.png 1500w",
                            },
                            className: "framer-prxce5 hidden-1f11iu",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/xudOYsruk06wUBsG3fmiagigBw.png",
                                srcSet:
                                  "https://framerusercontent.com/images/xudOYsruk06wUBsG3fmiagigBw.png?scale-down-to=512 512w, https://framerusercontent.com/images/xudOYsruk06wUBsG3fmiagigBw.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/xudOYsruk06wUBsG3fmiagigBw.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/xudOYsruk06wUBsG3fmiagigBw.png",
                              srcSet:
                                "https://framerusercontent.com/images/xudOYsruk06wUBsG3fmiagigBw.png?scale-down-to=512 512w, https://framerusercontent.com/images/xudOYsruk06wUBsG3fmiagigBw.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/xudOYsruk06wUBsG3fmiagigBw.png 1500w",
                            },
                            className: "framer-ta7xx7 hidden-1f11iu",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/VcKoW6bgdvU8tkSgdHKKf2duo.png",
                                srcSet:
                                  "https://framerusercontent.com/images/VcKoW6bgdvU8tkSgdHKKf2duo.png?scale-down-to=512 512w, https://framerusercontent.com/images/VcKoW6bgdvU8tkSgdHKKf2duo.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/VcKoW6bgdvU8tkSgdHKKf2duo.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/VcKoW6bgdvU8tkSgdHKKf2duo.png",
                              srcSet:
                                "https://framerusercontent.com/images/VcKoW6bgdvU8tkSgdHKKf2duo.png?scale-down-to=512 512w, https://framerusercontent.com/images/VcKoW6bgdvU8tkSgdHKKf2duo.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/VcKoW6bgdvU8tkSgdHKKf2duo.png 1500w",
                            },
                            className: "framer-n2ss7l hidden-1f11iu",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE-ac239d.png",
                                srcSet:
                                  "../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE.png 512w, ../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE-14ec06.png 1024w, ../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE-ac239d.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE-ac239d.png",
                              srcSet:
                                "../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE.png 512w, ../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE-14ec06.png 1024w, ../../assets/images/MJeIlKDeZABMXLwJpB6Bztr0ofE-ac239d.png 1500w",
                            },
                            className: "framer-10ko8t9 hidden-1f11iu",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "../../assets/images/F95XtBuIu9yRJpVFOQe6khYgo.png",
                                srcSet:
                                  "../../assets/images/F95XtBuIu9yRJpVFOQe6khYgo-aac526.png 512w, ../../assets/images/F95XtBuIu9yRJpVFOQe6khYgo-49685a.png 1024w, ../../assets/images/F95XtBuIu9yRJpVFOQe6khYgo.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "../../assets/images/F95XtBuIu9yRJpVFOQe6khYgo.png",
                              srcSet:
                                "../../assets/images/F95XtBuIu9yRJpVFOQe6khYgo-aac526.png 512w, ../../assets/images/F95XtBuIu9yRJpVFOQe6khYgo-49685a.png 1024w, ../../assets/images/F95XtBuIu9yRJpVFOQe6khYgo.png 1500w",
                            },
                            className: "framer-16w2ex4 hidden-1f11iu",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/dEaupL763MnJZiT6aqccpLvHPjM.png",
                                srcSet:
                                  "https://framerusercontent.com/images/dEaupL763MnJZiT6aqccpLvHPjM.png?scale-down-to=512 512w, https://framerusercontent.com/images/dEaupL763MnJZiT6aqccpLvHPjM.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/dEaupL763MnJZiT6aqccpLvHPjM.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/dEaupL763MnJZiT6aqccpLvHPjM.png",
                              srcSet:
                                "https://framerusercontent.com/images/dEaupL763MnJZiT6aqccpLvHPjM.png?scale-down-to=512 512w, https://framerusercontent.com/images/dEaupL763MnJZiT6aqccpLvHPjM.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/dEaupL763MnJZiT6aqccpLvHPjM.png 1500w",
                            },
                            className: "framer-rdmtej hidden-1f11iu",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/CAk1L4pqXkjKbUPNirHLhL8MlfE.png",
                                srcSet:
                                  "https://framerusercontent.com/images/CAk1L4pqXkjKbUPNirHLhL8MlfE.png?scale-down-to=512 512w, https://framerusercontent.com/images/CAk1L4pqXkjKbUPNirHLhL8MlfE.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/CAk1L4pqXkjKbUPNirHLhL8MlfE.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/CAk1L4pqXkjKbUPNirHLhL8MlfE.png",
                              srcSet:
                                "https://framerusercontent.com/images/CAk1L4pqXkjKbUPNirHLhL8MlfE.png?scale-down-to=512 512w, https://framerusercontent.com/images/CAk1L4pqXkjKbUPNirHLhL8MlfE.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/CAk1L4pqXkjKbUPNirHLhL8MlfE.png 1500w",
                            },
                            className: "framer-1fe417o hidden-1f11iu",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-144585.png",
                                srcSet:
                                  "../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-1bb8f5.png 512w, ../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8.png 1024w, ../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-144585.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-144585.png",
                              srcSet:
                                "../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-1bb8f5.png 512w, ../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8.png 1024w, ../../assets/images/mS28QhWcSped7JSQ7vltnisa5c8-144585.png 1500w",
                            },
                            className: "framer-19q9yq3 hidden-1f11iu",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "../../assets/images/fTvRR9UO6UHLEJxbKleRMkrgzgo.png",
                                srcSet:
                                  "../../assets/images/fTvRR9UO6UHLEJxbKleRMkrgzgo-ce4d2b.png 512w, ../../assets/images/fTvRR9UO6UHLEJxbKleRMkrgzgo-1a8429.png 1024w, ../../assets/images/fTvRR9UO6UHLEJxbKleRMkrgzgo.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "../../assets/images/fTvRR9UO6UHLEJxbKleRMkrgzgo.png",
                              srcSet:
                                "../../assets/images/fTvRR9UO6UHLEJxbKleRMkrgzgo-ce4d2b.png 512w, ../../assets/images/fTvRR9UO6UHLEJxbKleRMkrgzgo-1a8429.png 1024w, ../../assets/images/fTvRR9UO6UHLEJxbKleRMkrgzgo.png 1500w",
                            },
                            className: "framer-1g9uu85 hidden-1f11iu",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/rVizRNaavCeQYKl1NwV92RQaskQ.png",
                                srcSet:
                                  "https://framerusercontent.com/images/rVizRNaavCeQYKl1NwV92RQaskQ.png?scale-down-to=512 512w, https://framerusercontent.com/images/rVizRNaavCeQYKl1NwV92RQaskQ.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/rVizRNaavCeQYKl1NwV92RQaskQ.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/rVizRNaavCeQYKl1NwV92RQaskQ.png",
                              srcSet:
                                "https://framerusercontent.com/images/rVizRNaavCeQYKl1NwV92RQaskQ.png?scale-down-to=512 512w, https://framerusercontent.com/images/rVizRNaavCeQYKl1NwV92RQaskQ.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/rVizRNaavCeQYKl1NwV92RQaskQ.png 1500w",
                            },
                            className: "framer-112aqop hidden-1f11iu",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "../../assets/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg-ae16e1.png",
                                srcSet:
                                  "../../assets/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg.png 512w, ../../assets/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg-b2299c.png 1024w, ../../assets/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg-ae16e1.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "../../assets/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg-ae16e1.png",
                              srcSet:
                                "../../assets/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg.png 512w, ../../assets/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg-b2299c.png 1024w, ../../assets/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg-ae16e1.png 1500w",
                            },
                            className: "framer-1ftl2mx hidden-1f11iu",
                            "data-framer-name": "Shape Holo",
                            name: "Shape Holo",
                          }),
                        }),
                    ],
                  }),
                  s("div", {
                    className: "framer-qbcnhs",
                    "data-border": !0,
                    "data-framer-name": "3D Icons",
                    name: "3D Icons",
                    children: [
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png",
                              srcSet:
                                "https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png?scale-down-to=512 512w, https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png",
                              srcSet:
                                "https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png?scale-down-to=512 512w, https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            loading: "lazy",
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png",
                            srcSet:
                              "https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png?scale-down-to=512 512w, https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png 1500w",
                          },
                          className: "framer-16czi45",
                          "data-framer-name": "Shape Icon",
                          name: "Shape Icon",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png",
                              srcSet:
                                "https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png?scale-down-to=512 512w, https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png",
                              srcSet:
                                "https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png?scale-down-to=512 512w, https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            loading: "lazy",
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png",
                            srcSet:
                              "https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png?scale-down-to=512 512w, https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png 1500w",
                          },
                          className: "framer-9ps63r",
                          "data-framer-name": "Shape Icon",
                          name: "Shape Icon",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png",
                              srcSet:
                                "https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png?scale-down-to=512 512w, https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png",
                              srcSet:
                                "https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png?scale-down-to=512 512w, https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            loading: "lazy",
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png",
                            srcSet:
                              "https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png?scale-down-to=512 512w, https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png 1500w",
                          },
                          className: "framer-h2xtrw",
                          "data-framer-name": "Shape Icon",
                          name: "Shape Icon",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/lRtwdKdABeedcQ8KAn8PYU2304.png",
                              srcSet:
                                "https://framerusercontent.com/images/lRtwdKdABeedcQ8KAn8PYU2304.png?scale-down-to=512 512w, https://framerusercontent.com/images/lRtwdKdABeedcQ8KAn8PYU2304.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/lRtwdKdABeedcQ8KAn8PYU2304.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/lRtwdKdABeedcQ8KAn8PYU2304.png",
                              srcSet:
                                "https://framerusercontent.com/images/lRtwdKdABeedcQ8KAn8PYU2304.png?scale-down-to=512 512w, https://framerusercontent.com/images/lRtwdKdABeedcQ8KAn8PYU2304.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/lRtwdKdABeedcQ8KAn8PYU2304.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            loading: "lazy",
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/lRtwdKdABeedcQ8KAn8PYU2304.png",
                            srcSet:
                              "https://framerusercontent.com/images/lRtwdKdABeedcQ8KAn8PYU2304.png?scale-down-to=512 512w, https://framerusercontent.com/images/lRtwdKdABeedcQ8KAn8PYU2304.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/lRtwdKdABeedcQ8KAn8PYU2304.png 1500w",
                          },
                          className: "framer-gzcc1u",
                          "data-framer-name": "Shape Icon",
                          name: "Shape Icon",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/SqHU6Ili7ACWk8dhvEPmdfXEPDA.png",
                              srcSet:
                                "https://framerusercontent.com/images/SqHU6Ili7ACWk8dhvEPmdfXEPDA.png?scale-down-to=512 512w, https://framerusercontent.com/images/SqHU6Ili7ACWk8dhvEPmdfXEPDA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/SqHU6Ili7ACWk8dhvEPmdfXEPDA.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/SqHU6Ili7ACWk8dhvEPmdfXEPDA.png",
                              srcSet:
                                "https://framerusercontent.com/images/SqHU6Ili7ACWk8dhvEPmdfXEPDA.png?scale-down-to=512 512w, https://framerusercontent.com/images/SqHU6Ili7ACWk8dhvEPmdfXEPDA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/SqHU6Ili7ACWk8dhvEPmdfXEPDA.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            loading: "lazy",
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/SqHU6Ili7ACWk8dhvEPmdfXEPDA.png",
                            srcSet:
                              "https://framerusercontent.com/images/SqHU6Ili7ACWk8dhvEPmdfXEPDA.png?scale-down-to=512 512w, https://framerusercontent.com/images/SqHU6Ili7ACWk8dhvEPmdfXEPDA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/SqHU6Ili7ACWk8dhvEPmdfXEPDA.png 1500w",
                          },
                          className: "framer-yiujtn",
                          "data-framer-name": "Shape Icon",
                          name: "Shape Icon",
                        }),
                      }),
                      e(r, {
                        breakpoint: t,
                        overrides: {
                          EqOeOa8fx: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 100px) / 2, 50px)",
                              src: "https://framerusercontent.com/images/juH3gG75mErF93kaXE68cRUTlGI.png",
                              srcSet:
                                "https://framerusercontent.com/images/juH3gG75mErF93kaXE68cRUTlGI.png?scale-down-to=512 512w, https://framerusercontent.com/images/juH3gG75mErF93kaXE68cRUTlGI.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/juH3gG75mErF93kaXE68cRUTlGI.png 1500w",
                            },
                          },
                          Ikqpyq2iO: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                              src: "https://framerusercontent.com/images/juH3gG75mErF93kaXE68cRUTlGI.png",
                              srcSet:
                                "https://framerusercontent.com/images/juH3gG75mErF93kaXE68cRUTlGI.png?scale-down-to=512 512w, https://framerusercontent.com/images/juH3gG75mErF93kaXE68cRUTlGI.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/juH3gG75mErF93kaXE68cRUTlGI.png 1500w",
                            },
                          },
                        },
                        children: e(i, {
                          background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 1500,
                            intrinsicWidth: 1500,
                            loading: "lazy",
                            pixelHeight: 1500,
                            pixelWidth: 1500,
                            sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                            src: "https://framerusercontent.com/images/juH3gG75mErF93kaXE68cRUTlGI.png",
                            srcSet:
                              "https://framerusercontent.com/images/juH3gG75mErF93kaXE68cRUTlGI.png?scale-down-to=512 512w, https://framerusercontent.com/images/juH3gG75mErF93kaXE68cRUTlGI.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/juH3gG75mErF93kaXE68cRUTlGI.png 1500w",
                          },
                          className: "framer-ninhaj",
                          "data-framer-name": "Shape Icon",
                          name: "Shape Icon",
                        }),
                      }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png",
                                srcSet:
                                  "https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png?scale-down-to=512 512w, https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png",
                              srcSet:
                                "https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png?scale-down-to=512 512w, https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png 1500w",
                            },
                            className: "framer-1ixqk4x hidden-1f11iu",
                            "data-framer-name": "Shape Icon",
                            name: "Shape Icon",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/CL3cgXEmvYhWpSRkbkhiyDsCitA.png",
                                srcSet:
                                  "https://framerusercontent.com/images/CL3cgXEmvYhWpSRkbkhiyDsCitA.png?scale-down-to=512 512w, https://framerusercontent.com/images/CL3cgXEmvYhWpSRkbkhiyDsCitA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/CL3cgXEmvYhWpSRkbkhiyDsCitA.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/CL3cgXEmvYhWpSRkbkhiyDsCitA.png",
                              srcSet:
                                "https://framerusercontent.com/images/CL3cgXEmvYhWpSRkbkhiyDsCitA.png?scale-down-to=512 512w, https://framerusercontent.com/images/CL3cgXEmvYhWpSRkbkhiyDsCitA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/CL3cgXEmvYhWpSRkbkhiyDsCitA.png 1500w",
                            },
                            className: "framer-73vjjm hidden-1f11iu",
                            "data-framer-name": "Shape Icon",
                            name: "Shape Icon",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/U8BliLSYurKQHRyLYQC9YGr3sHU.png",
                                srcSet:
                                  "https://framerusercontent.com/images/U8BliLSYurKQHRyLYQC9YGr3sHU.png?scale-down-to=512 512w, https://framerusercontent.com/images/U8BliLSYurKQHRyLYQC9YGr3sHU.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/U8BliLSYurKQHRyLYQC9YGr3sHU.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/U8BliLSYurKQHRyLYQC9YGr3sHU.png",
                              srcSet:
                                "https://framerusercontent.com/images/U8BliLSYurKQHRyLYQC9YGr3sHU.png?scale-down-to=512 512w, https://framerusercontent.com/images/U8BliLSYurKQHRyLYQC9YGr3sHU.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/U8BliLSYurKQHRyLYQC9YGr3sHU.png 1500w",
                            },
                            className: "framer-wz772v hidden-1f11iu",
                            "data-framer-name": "Shape Icon",
                            name: "Shape Icon",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/X5xgAqM8BgZsChKSq8CWqYkBJw.png",
                                srcSet:
                                  "https://framerusercontent.com/images/X5xgAqM8BgZsChKSq8CWqYkBJw.png?scale-down-to=512 512w, https://framerusercontent.com/images/X5xgAqM8BgZsChKSq8CWqYkBJw.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/X5xgAqM8BgZsChKSq8CWqYkBJw.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/X5xgAqM8BgZsChKSq8CWqYkBJw.png",
                              srcSet:
                                "https://framerusercontent.com/images/X5xgAqM8BgZsChKSq8CWqYkBJw.png?scale-down-to=512 512w, https://framerusercontent.com/images/X5xgAqM8BgZsChKSq8CWqYkBJw.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/X5xgAqM8BgZsChKSq8CWqYkBJw.png 1500w",
                            },
                            className: "framer-14hvh6l hidden-1f11iu",
                            "data-framer-name": "Shape Icon",
                            name: "Shape Icon",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/L1tjZjwsgD8ojRomNhZJRPPC9sg.png",
                                srcSet:
                                  "https://framerusercontent.com/images/L1tjZjwsgD8ojRomNhZJRPPC9sg.png?scale-down-to=512 512w, https://framerusercontent.com/images/L1tjZjwsgD8ojRomNhZJRPPC9sg.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/L1tjZjwsgD8ojRomNhZJRPPC9sg.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/L1tjZjwsgD8ojRomNhZJRPPC9sg.png",
                              srcSet:
                                "https://framerusercontent.com/images/L1tjZjwsgD8ojRomNhZJRPPC9sg.png?scale-down-to=512 512w, https://framerusercontent.com/images/L1tjZjwsgD8ojRomNhZJRPPC9sg.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/L1tjZjwsgD8ojRomNhZJRPPC9sg.png 1500w",
                            },
                            className: "framer-19sbmb1 hidden-1f11iu",
                            "data-framer-name": "Shape Icon",
                            name: "Shape Icon",
                          }),
                        }),
                      a() &&
                        e(r, {
                          breakpoint: t,
                          overrides: {
                            Ikqpyq2iO: {
                              background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                loading: "lazy",
                                pixelHeight: 1500,
                                pixelWidth: 1500,
                                sizes: "max((min(100vw, 1600px) - 140px) / 4, 50px)",
                                src: "https://framerusercontent.com/images/RGlqMOnJuS6K82HjTJYBjE74.png",
                                srcSet:
                                  "https://framerusercontent.com/images/RGlqMOnJuS6K82HjTJYBjE74.png?scale-down-to=512 512w, https://framerusercontent.com/images/RGlqMOnJuS6K82HjTJYBjE74.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/RGlqMOnJuS6K82HjTJYBjE74.png 1500w",
                              },
                            },
                          },
                          children: e(i, {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1500,
                              intrinsicWidth: 1500,
                              loading: "lazy",
                              pixelHeight: 1500,
                              pixelWidth: 1500,
                              sizes: "max((min(100vw, 1600px) - 180px) / 6, 50px)",
                              src: "https://framerusercontent.com/images/RGlqMOnJuS6K82HjTJYBjE74.png",
                              srcSet:
                                "https://framerusercontent.com/images/RGlqMOnJuS6K82HjTJYBjE74.png?scale-down-to=512 512w, https://framerusercontent.com/images/RGlqMOnJuS6K82HjTJYBjE74.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/RGlqMOnJuS6K82HjTJYBjE74.png 1500w",
                            },
                            className: "framer-16465vy hidden-1f11iu",
                            "data-framer-name": "Shape Icon",
                            name: "Shape Icon",
                          }),
                        }),
                    ],
                  }),
                ],
              }),
            }),
            e("div", { className: w(U, ...S), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  P = [
    '.framer-5NtJE[data-border="true"]::after, .framer-5NtJE [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-5NtJE.framer-t34bz7, .framer-5NtJE .framer-t34bz7 { display: block; }",
    ".framer-5NtJE.framer-pyn0mh { --border-bottom-width: 1px; --border-color: rgba(173, 173, 173, 0.4); --border-left-width: 1px; --border-right-width: 1px; --border-style: dashed; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-5NtJE .framer-x0i3ra { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; max-width: 1600px; overflow: hidden; padding: 20px 20px 20px 20px; position: relative; width: 100%; }",
    ".framer-5NtJE .framer-pl5l3e, .framer-5NtJE .framer-1bp77ns, .framer-5NtJE .framer-qbcnhs { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: grid; flex: none; gap: 20px; grid-auto-rows: min-content; grid-template-columns: repeat(6, minmax(50px, 1fr)); grid-template-rows: repeat(2, min-content); height: min-content; justify-content: center; overflow: hidden; padding: 20px 20px 20px 20px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }",
    ".framer-5NtJE .framer-19b7u2t, .framer-5NtJE .framer-1sznpqe, .framer-5NtJE .framer-12d5emw, .framer-5NtJE .framer-3j05wi, .framer-5NtJE .framer-mnke1a, .framer-5NtJE .framer-1p42t0c, .framer-5NtJE .framer-nv22st, .framer-5NtJE .framer-r7663f, .framer-5NtJE .framer-129bouk, .framer-5NtJE .framer-ieamw6, .framer-5NtJE .framer-szl9nw, .framer-5NtJE .framer-1cc4mp1, .framer-5NtJE .framer-26so6v, .framer-5NtJE .framer-1v3vwzn, .framer-5NtJE .framer-rnmwon, .framer-5NtJE .framer-vptm8w, .framer-5NtJE .framer-1xvak4i, .framer-5NtJE .framer-so80bb, .framer-5NtJE .framer-1lv5u75, .framer-5NtJE .framer-wwwd6q, .framer-5NtJE .framer-1wb21nz, .framer-5NtJE .framer-1tmmzun, .framer-5NtJE .framer-1qiuuxi, .framer-5NtJE .framer-1jezsl6, .framer-5NtJE .framer-1e4ev4e, .framer-5NtJE .framer-prxce5, .framer-5NtJE .framer-ta7xx7, .framer-5NtJE .framer-n2ss7l, .framer-5NtJE .framer-10ko8t9, .framer-5NtJE .framer-16w2ex4, .framer-5NtJE .framer-rdmtej, .framer-5NtJE .framer-1fe417o, .framer-5NtJE .framer-19q9yq3, .framer-5NtJE .framer-1g9uu85, .framer-5NtJE .framer-112aqop, .framer-5NtJE .framer-1ftl2mx, .framer-5NtJE .framer-16czi45, .framer-5NtJE .framer-9ps63r, .framer-5NtJE .framer-h2xtrw, .framer-5NtJE .framer-gzcc1u, .framer-5NtJE .framer-yiujtn, .framer-5NtJE .framer-ninhaj, .framer-5NtJE .framer-1ixqk4x, .framer-5NtJE .framer-73vjjm, .framer-5NtJE .framer-wz772v, .framer-5NtJE .framer-14hvh6l, .framer-5NtJE .framer-19sbmb1, .framer-5NtJE .framer-16465vy { -webkit-filter: hue-rotate(0deg); align-self: start; aspect-ratio: 1 / 1; filter: hue-rotate(0deg); flex: none; height: var(--framer-aspect-ratio-supported, 170px); justify-self: start; overflow: visible; position: relative; width: 100%; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-5NtJE.framer-pyn0mh, .framer-5NtJE .framer-x0i3ra { gap: 0px; } .framer-5NtJE.framer-pyn0mh > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-5NtJE.framer-pyn0mh > :first-child, .framer-5NtJE .framer-x0i3ra > :first-child { margin-top: 0px; } .framer-5NtJE.framer-pyn0mh > :last-child, .framer-5NtJE .framer-x0i3ra > :last-child { margin-bottom: 0px; } .framer-5NtJE .framer-x0i3ra > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } }",
    "@media (min-width: 1200px) { .framer-5NtJE .hidden-pyn0mh { display: none !important; } }",
    "@media (min-width: 810px) and (max-width: 1199px) { .framer-5NtJE .hidden-123xlxy { display: none !important; } .framer-5NtJE.framer-pyn0mh { width: 810px; } .framer-5NtJE .framer-pl5l3e, .framer-5NtJE .framer-1bp77ns, .framer-5NtJE .framer-qbcnhs { grid-template-columns: repeat(4, minmax(50px, 1fr)); } .framer-5NtJE .framer-19b7u2t, .framer-5NtJE .framer-1sznpqe, .framer-5NtJE .framer-12d5emw, .framer-5NtJE .framer-3j05wi, .framer-5NtJE .framer-mnke1a, .framer-5NtJE .framer-1p42t0c, .framer-5NtJE .framer-nv22st, .framer-5NtJE .framer-r7663f, .framer-5NtJE .framer-129bouk, .framer-5NtJE .framer-ieamw6, .framer-5NtJE .framer-szl9nw, .framer-5NtJE .framer-1cc4mp1, .framer-5NtJE .framer-26so6v, .framer-5NtJE .framer-1v3vwzn, .framer-5NtJE .framer-rnmwon, .framer-5NtJE .framer-vptm8w, .framer-5NtJE .framer-1xvak4i, .framer-5NtJE .framer-so80bb, .framer-5NtJE .framer-1lv5u75, .framer-5NtJE .framer-wwwd6q, .framer-5NtJE .framer-1wb21nz, .framer-5NtJE .framer-1tmmzun, .framer-5NtJE .framer-1qiuuxi, .framer-5NtJE .framer-1jezsl6, .framer-5NtJE .framer-1e4ev4e, .framer-5NtJE .framer-prxce5, .framer-5NtJE .framer-ta7xx7, .framer-5NtJE .framer-n2ss7l, .framer-5NtJE .framer-10ko8t9, .framer-5NtJE .framer-16w2ex4, .framer-5NtJE .framer-rdmtej, .framer-5NtJE .framer-1fe417o, .framer-5NtJE .framer-19q9yq3, .framer-5NtJE .framer-1g9uu85, .framer-5NtJE .framer-112aqop, .framer-5NtJE .framer-1ftl2mx, .framer-5NtJE .framer-16czi45, .framer-5NtJE .framer-9ps63r, .framer-5NtJE .framer-h2xtrw, .framer-5NtJE .framer-gzcc1u, .framer-5NtJE .framer-yiujtn, .framer-5NtJE .framer-ninhaj, .framer-5NtJE .framer-1ixqk4x, .framer-5NtJE .framer-73vjjm, .framer-5NtJE .framer-wz772v, .framer-5NtJE .framer-14hvh6l, .framer-5NtJE .framer-19sbmb1, .framer-5NtJE .framer-16465vy { height: var(--framer-aspect-ratio-supported, 168px); }}",
    "@media (max-width: 809px) { .framer-5NtJE .hidden-1f11iu { display: none !important; } .framer-5NtJE.framer-pyn0mh { width: 390px; } .framer-5NtJE .framer-pl5l3e, .framer-5NtJE .framer-1bp77ns, .framer-5NtJE .framer-qbcnhs { grid-template-columns: repeat(2, minmax(50px, 1fr)); } .framer-5NtJE .framer-19b7u2t, .framer-5NtJE .framer-1sznpqe, .framer-5NtJE .framer-12d5emw, .framer-5NtJE .framer-3j05wi, .framer-5NtJE .framer-mnke1a, .framer-5NtJE .framer-1p42t0c, .framer-5NtJE .framer-1lv5u75, .framer-5NtJE .framer-wwwd6q, .framer-5NtJE .framer-1wb21nz, .framer-5NtJE .framer-1tmmzun, .framer-5NtJE .framer-1qiuuxi, .framer-5NtJE .framer-1jezsl6, .framer-5NtJE .framer-16czi45, .framer-5NtJE .framer-9ps63r, .framer-5NtJE .framer-h2xtrw, .framer-5NtJE .framer-gzcc1u, .framer-5NtJE .framer-yiujtn, .framer-5NtJE .framer-ninhaj { height: var(--framer-aspect-ratio-supported, 200px); }}",
  ],
  g = z(R, P, "framer-5NtJE"),
  ie = g;
g.displayName = "Page";
g.defaultProps = { height: 1660, width: 1200 };
N(g, []);
var ae = {
  exports: {
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    default: {
      type: "reactComponent",
      name: "FramerRk9u34P9g",
      slots: [],
      annotations: {
        framerIntrinsicHeight: "1660",
        framerResponsiveScreen: "",
        framerImmutableVariables: "true",
        framerDisplayContentsDiv: "false",
        framerIntrinsicWidth: "1200",
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"Ikqpyq2iO":{"layout":["fixed","auto"]},"EqOeOa8fx":{"layout":["fixed","auto"]}}}',
        framerContractVersion: "1",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
export { ae as __FramerMetadata__, ie as default };
//# sourceMappingURL=Zs96ZiVMrEgHJ9Yz9onUj19fK1mVdbiEmTktP19he4k.LFS3EZRM.mjs.map
