import { a as W } from "./chunk-YMYSRBYO.mjs";
import { a as D, b as U, c as Y } from "./chunk-FHTGWS36.mjs";
import { a as u } from "./chunk-EBNSP2JA.mjs";
import { a as T, b as _, c as V } from "./chunk-D5CSMFZ4.mjs";
import { a as x } from "./chunk-2GNE24G3.mjs";
import { a as n } from "./chunk-CVPCFDSR.mjs";
import "./chunk-G7RZZ2HZ.mjs";
import "./chunk-D5FMDQUG.mjs";
import { a as O, b as G, c as H } from "./chunk-ALFWC2ON.mjs";
import { b as r, c as e } from "./chunk-OO3TPEBQ.mjs";
import {
  K as q,
  V as S,
  Y as i,
  Z as P,
  _ as I,
  aa as B,
  c as a,
  da as c,
  g as N,
  l as j,
  m as C,
  ma as F,
  o as L,
  t as K,
  ta as f,
  ua as t,
  v as R,
  va as A,
  wa as g,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var rr = g(n),
  er = g(x),
  ar = g(u);
var tr = {
    BC74vnBoT: "(min-width: 1200px)",
    I4MFroUE_: "(min-width: 810px) and (max-width: 1199px)",
    vVynqpYmd: "(max-width: 809px)",
  },
  ir = () => typeof document < "u",
  J = "framer-9f6Ea",
  nr = {
    BC74vnBoT: "framer-v-1jyda0q",
    I4MFroUE_: "framer-v-17n2qex",
    vVynqpYmd: "framer-v-17umf4t",
  },
  fr = { default: { duration: 0 } },
  Z = (b, o) => `${o} rotate(-13deg)`,
  jr = W(),
  or = { Desktop: "BC74vnBoT", Phone: "vVynqpYmd", Tablet: "I4MFroUE_" },
  mr = ({ height: b, id: o, width: y, ...h }) => {
    var l, d;
    return {
      ...h,
      variant:
        (d = (l = or[h.variant]) !== null && l !== void 0 ? l : h.variant) !== null && d !== void 0
          ? d
          : "BC74vnBoT",
    };
  },
  sr = N(function (b, o) {
    let { activeLocale: y, setLocale: h } = q(),
      { style: l, className: d, layoutId: v, variant: X, ...M } = mr(b);
    C(() => {
      let s = W(void 0, y);
      if (((document.title = s.title || ""), s.viewport)) {
        var E;
        (E = document.querySelector('meta[name="viewport"]')) === null ||
          E === void 0 ||
          E.setAttribute("content", s.viewport);
      }
      if (s.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((k) => k.startsWith("framer-body-"))
            .map((k) => document.body.classList.remove(k)),
          document.body.classList.add(`${s.bodyClassName}-framer-9f6Ea`),
          () => {
            document.body.classList.remove(`${s.bodyClassName}-framer-9f6Ea`);
          }
        );
    }, [void 0, y]);
    let [p, dr] = F(X, tr, !1),
      pr = void 0,
      cr = fr.default,
      Q = L(null),
      m = () => (p === "vVynqpYmd" ? !ir() : !0),
      $ = j(),
      z = [H, V, Y];
    return (
      I({}),
      r(B.Provider, {
        value: { primaryVariantId: "BC74vnBoT", variantClassNames: nr },
        children: e(R, {
          id: v ?? $,
          children: [
            r(K.div, {
              ...M,
              className: S(J, ...z, "framer-1jyda0q", d),
              "data-border": !0,
              ref: o ?? Q,
              style: { ...l },
              children: e("div", {
                className: "framer-1p5ywm2",
                "data-framer-name": "Wrapper",
                name: "Wrapper",
                children: [
                  r("div", {
                    className: "framer-1v9ftpf",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: e("div", {
                      className: "framer-154o85j",
                      "data-framer-name": "CTA Day",
                      name: "CTA Day",
                      children: [
                        e("div", {
                          className: "framer-hm2th2",
                          children: [
                            r(t, {
                              __fromCanvasComponent: !0,
                              children: r(a, {
                                children: r("h2", {
                                  className: "framer-styles-preset-4m6e0d",
                                  "data-styles-preset": "Bgl_uNKYX",
                                  style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                  children: "Bereit für modernes Kino-Management?",
                                }),
                              }),
                              className: "framer-lykh7h",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(t, {
                              __fromCanvasComponent: !0,
                              children: r(a, {
                                children: r("p", {
                                  className: "framer-styles-preset-1cc56zh",
                                  "data-styles-preset": "PWn1k_MD2",
                                  style: { "--framer-text-alignment": "center" },
                                  children:
                                    "Starte jetzt die Kinopolis Automation Suite und bringe Vorführtechnik, Einlass und Concession auf das nächste Level.",
                                }),
                              }),
                              className: "framer-ssk004",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            m() &&
                              r(f, {
                                background: {
                                  alt: "",
                                  fit: "fill",
                                  intrinsicHeight: 1500,
                                  intrinsicWidth: 1500,
                                  pixelHeight: 1500,
                                  pixelWidth: 1500,
                                  sizes: "255px",
                                  src: "https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png",
                                  srcSet:
                                    "https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png?scale-down-to=512 512w, https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png 1500w",
                                },
                                className: "framer-t0qhpz hidden-17umf4t",
                                "data-framer-name": "Shape Simple",
                                name: "Shape Simple",
                              }),
                            m() &&
                              r(f, {
                                background: {
                                  alt: "",
                                  fit: "fill",
                                  intrinsicHeight: 1500,
                                  intrinsicWidth: 1500,
                                  pixelHeight: 1500,
                                  pixelWidth: 1500,
                                  sizes: "276px",
                                  src: "https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png",
                                  srcSet:
                                    "https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png?scale-down-to=512 512w, https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png 1500w",
                                },
                                className: "framer-r8ty6z hidden-17umf4t",
                                "data-framer-name": "Shape Simple",
                                name: "Shape Simple",
                              }),
                          ],
                        }),
                        e("div", {
                          className: "framer-1jl0bgc",
                          children: [
                            r(i, {
                              className: "framer-tcntk5-container",
                              children: r(n, {
                                eszixBaDA: 10,
                                height: "100%",
                                id: "BYTrXLLr1",
                                ik9I5qIGz: !1,
                                J0LC2FGV8: !1,
                                KJK1sV1GB: "Dashboard starten →",
                                layoutId: "BYTrXLLr1",
                                RmkZjgJwi: "ArrowRight",
                                UsLusPFRg: "rgb(0, 0, 0)",
                                variant: "PqgBulBPi",
                                width: "100%",
                              }),
                            }),
                            r(i, {
                              className: "framer-63bs5l-container",
                              children: r(x, {
                                bVToBLBTS: "Funktionen entdecken",
                                height: "100%",
                                id: "MARBqmVk6",
                                KqeH5xil_: "rgb(0, 0, 0)",
                                layoutId: "MARBqmVk6",
                                variant: "uvXz5tOXs",
                                width: "100%",
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  r("div", {
                    className: "framer-14rpcf6",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: e("div", {
                      className: "framer-srbotj",
                      "data-framer-name": "CTA Night",
                      name: "CTA Night",
                      children: [
                        e("div", {
                          className: "framer-w81jkt",
                          children: [
                            r(t, {
                              __fromCanvasComponent: !0,
                              children: r(a, {
                                children: r("h2", {
                                  className: "framer-styles-preset-4m6e0d",
                                  "data-styles-preset": "Bgl_uNKYX",
                                  style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                  children: "Bereit für modernes Kino-Management?",
                                }),
                              }),
                              className: "framer-1floeoj",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(t, {
                              __fromCanvasComponent: !0,
                              children: r(a, {
                                children: r("p", {
                                  className: "framer-styles-preset-1cc56zh",
                                  "data-styles-preset": "PWn1k_MD2",
                                  style: {
                                    "--framer-text-alignment": "center",
                                    "--framer-text-color": "rgb(255, 255, 255)",
                                  },
                                  children:
                                    "Starte jetzt die Kinopolis Automation Suite und bringe Vorführtechnik, Einlass und Concession auf das nächste Level.",
                                }),
                              }),
                              className: "framer-1fsix3d",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            m() &&
                              r(f, {
                                background: {
                                  alt: "",
                                  fit: "fill",
                                  intrinsicHeight: 1500,
                                  intrinsicWidth: 1500,
                                  pixelHeight: 1500,
                                  pixelWidth: 1500,
                                  sizes: "255px",
                                  src: "https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png",
                                  srcSet:
                                    "https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png?scale-down-to=512 512w, https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png 1500w",
                                },
                                className: "framer-17a9l1u hidden-17umf4t",
                                "data-framer-name": "Shape Simple",
                                name: "Shape Simple",
                              }),
                            m() &&
                              r(f, {
                                background: {
                                  alt: "",
                                  fit: "fill",
                                  intrinsicHeight: 1500,
                                  intrinsicWidth: 1500,
                                  pixelHeight: 1500,
                                  pixelWidth: 1500,
                                  sizes: "276px",
                                  src: "https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png",
                                  srcSet:
                                    "https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png?scale-down-to=512 512w, https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png 1500w",
                                },
                                className: "framer-135z1af hidden-17umf4t",
                                "data-framer-name": "Shape Simple",
                                name: "Shape Simple",
                              }),
                          ],
                        }),
                        e("div", {
                          className: "framer-gnm8ds",
                          children: [
                            r(i, {
                              className: "framer-1lx1l4g-container",
                              children: r(n, {
                                eszixBaDA: 10,
                                height: "100%",
                                id: "K_tjFdKZ0",
                                ik9I5qIGz: !1,
                                J0LC2FGV8: !1,
                                KJK1sV1GB: "Dashboard starten →",
                                layoutId: "K_tjFdKZ0",
                                RmkZjgJwi: "ArrowRight",
                                UsLusPFRg: "rgb(0, 0, 0)",
                                variant: "zb8n5Cev9",
                                width: "100%",
                              }),
                            }),
                            r(i, {
                              className: "framer-3i5k2e-container",
                              children: r(x, {
                                bVToBLBTS: "Funktionen entdecken",
                                height: "100%",
                                id: "cPr_KAZ9T",
                                KqeH5xil_: "rgb(255, 255, 255)",
                                layoutId: "cPr_KAZ9T",
                                variant: "uvXz5tOXs",
                                width: "100%",
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  r("div", {
                    className: "framer-11mny0h",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: e("div", {
                      className: "framer-1nag5dq",
                      "data-framer-name": "CTA Input Day",
                      name: "CTA Input Day",
                      children: [
                        e("div", {
                          className: "framer-xsqzeo",
                          children: [
                            r(t, {
                              __fromCanvasComponent: !0,
                              children: r(a, {
                                children: r("h3", {
                                  className: "framer-styles-preset-a0prbo",
                                  "data-styles-preset": "BUi3OJxlT",
                                  style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                  children: "Get instant access",
                                }),
                              }),
                              className: "framer-sgormy",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(t, {
                              __fromCanvasComponent: !0,
                              children: r(a, {
                                children: r("p", {
                                  className: "framer-styles-preset-1cc56zh",
                                  "data-styles-preset": "PWn1k_MD2",
                                  style: { "--framer-text-alignment": "center" },
                                  children:
                                    "Starte jetzt die Kinopolis Automation Suite und bringe Vorführtechnik, Einlass und Concession auf das nächste Level.",
                                }),
                              }),
                              className: "framer-1db083s",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          ],
                        }),
                        r(i, {
                          className: "framer-12wvu2u-container",
                          children: r(c, {
                            breakpoint: p,
                            overrides: {
                              I4MFroUE_: { style: { maxWidth: "100%", width: "100%" } },
                              vVynqpYmd: { layout: "vertical" },
                            },
                            children: r(u, {
                              button: {
                                buttonFont: {
                                  fontFamily: '"Satoshi", "Satoshi Placeholder", sans-serif',
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  letterSpacing: "0em",
                                  lineHeight: "1em",
                                },
                                buttonPadding: 15,
                                buttonPaddingBottom: 10,
                                buttonPaddingLeft: 15,
                                buttonPaddingPerSide: !0,
                                buttonPaddingRight: 15,
                                buttonPaddingTop: 10,
                                color: "rgb(255, 255, 255)",
                                fill: "rgb(0, 0, 0)",
                                insetWhenDocked: 5,
                                isDocked: !1,
                                label: "Get access",
                                shouldAppear: !0,
                                widthWhenDocked: 100,
                              },
                              convertkitAPI: "",
                              convertkitFormID: "",
                              font: {
                                fontFamily: '"Satoshi", "Satoshi Placeholder", sans-serif',
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                letterSpacing: "0em",
                                lineHeight: "1em",
                              },
                              formsparkID: "",
                              gap: 10,
                              getwaitlistAPI: "",
                              height: "100%",
                              id: "Rokcpipzk",
                              input: {
                                borderObject: {
                                  borderColor:
                                    "var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1))",
                                  borderWidth: 1,
                                },
                                borderRadius: 10,
                                color: "rgb(0, 0, 0)",
                                fill: "rgb(245, 245, 245)",
                                fixedHeight: 50,
                                height: !0,
                                padding: 15,
                                paddingBottom: 10,
                                paddingLeft: 15,
                                paddingPerSide: !0,
                                paddingRight: 15,
                                paddingTop: 10,
                                placeholder: "name@email.com",
                                placeholderColor: "rgba(0, 0, 0, 0.5)",
                              },
                              layout: "horizontal",
                              layoutId: "Rokcpipzk",
                              loopsID: "",
                              loopsUserGroup: "",
                              mailchimpURL: "",
                              redirectAs: "link",
                              service: "loops",
                              style: { width: "100%" },
                              width: "100%",
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                  r("div", {
                    className: "framer-dvte8b",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: e("div", {
                      className: "framer-1zi35j",
                      "data-framer-name": "CTA Input Night",
                      name: "CTA Input Night",
                      children: [
                        e("div", {
                          className: "framer-ipr8bq",
                          children: [
                            r(t, {
                              __fromCanvasComponent: !0,
                              children: r(a, {
                                children: r("h3", {
                                  className: "framer-styles-preset-a0prbo",
                                  "data-styles-preset": "BUi3OJxlT",
                                  style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                  children: "Get instant access",
                                }),
                              }),
                              className: "framer-169wwh1",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(t, {
                              __fromCanvasComponent: !0,
                              children: r(a, {
                                children: r("p", {
                                  className: "framer-styles-preset-1cc56zh",
                                  "data-styles-preset": "PWn1k_MD2",
                                  style: {
                                    "--framer-text-alignment": "center",
                                    "--framer-text-color": "rgb(255, 255, 255)",
                                  },
                                  children:
                                    "Starte jetzt die Kinopolis Automation Suite und bringe Vorführtechnik, Einlass und Concession auf das nächste Level.",
                                }),
                              }),
                              className: "framer-h62mxd",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          ],
                        }),
                        r(i, {
                          className: "framer-18uaues-container",
                          children: r(c, {
                            breakpoint: p,
                            overrides: {
                              I4MFroUE_: { style: { maxWidth: "100%", width: "100%" } },
                              vVynqpYmd: { layout: "vertical" },
                            },
                            children: r(u, {
                              button: {
                                buttonFont: {
                                  fontFamily: '"Satoshi", "Satoshi Placeholder", sans-serif',
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  letterSpacing: "0em",
                                  lineHeight: "1em",
                                },
                                buttonPadding: 15,
                                buttonPaddingBottom: 10,
                                buttonPaddingLeft: 15,
                                buttonPaddingPerSide: !0,
                                buttonPaddingRight: 15,
                                buttonPaddingTop: 10,
                                color: "rgb(0, 0, 0)",
                                fill: "rgb(255, 255, 255)",
                                insetWhenDocked: 5,
                                isDocked: !1,
                                label: "Get access",
                                shouldAppear: !0,
                                widthWhenDocked: 100,
                              },
                              convertkitAPI: "",
                              convertkitFormID: "",
                              font: {
                                fontFamily: '"Satoshi", "Satoshi Placeholder", sans-serif',
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                letterSpacing: "0em",
                                lineHeight: "1em",
                              },
                              formsparkID: "",
                              gap: 10,
                              getwaitlistAPI: "",
                              height: "100%",
                              id: "RYVHdxYZ4",
                              input: {
                                borderObject: {
                                  borderColor:
                                    "var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1))",
                                  borderWidth: 1,
                                },
                                borderRadius: 10,
                                color: "rgb(0, 0, 0)",
                                fill: "rgba(255, 255, 255, 0.2)",
                                fixedHeight: 50,
                                height: !0,
                                padding: 15,
                                paddingBottom: 10,
                                paddingLeft: 15,
                                paddingPerSide: !0,
                                paddingRight: 15,
                                paddingTop: 10,
                                placeholder: "name@email.com",
                                placeholderColor: "rgba(255, 255, 255, 0.5)",
                              },
                              layout: "horizontal",
                              layoutId: "RYVHdxYZ4",
                              loopsID: "",
                              loopsUserGroup: "",
                              mailchimpURL: "",
                              redirectAs: "link",
                              service: "loops",
                              style: { width: "100%" },
                              width: "100%",
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                  r("div", {
                    className: "framer-1achkl9",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: r("div", {
                      className: "framer-1eb8rhs",
                      "data-framer-name": "CTA Day",
                      name: "CTA Day",
                      children: e("div", {
                        className: "framer-809sis",
                        children: [
                          e("div", {
                            className: "framer-1q5s4jm",
                            children: [
                              e("div", {
                                className: "framer-1c9hlob",
                                children: [
                                  r(t, {
                                    __fromCanvasComponent: !0,
                                    children: r(a, {
                                      children: r("h3", {
                                        className: "framer-styles-preset-a0prbo",
                                        "data-styles-preset": "BUi3OJxlT",
                                        style: {
                                          "--framer-text-alignment": "left",
                                          "--framer-text-color": "rgb(0, 0, 0)",
                                        },
                                        children: "Get instant access",
                                      }),
                                    }),
                                    className: "framer-ekfroe",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(t, {
                                    __fromCanvasComponent: !0,
                                    children: r(a, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1cc56zh",
                                        "data-styles-preset": "PWn1k_MD2",
                                        style: { "--framer-text-alignment": "left" },
                                        children:
                                          "Starte jetzt die Kinopolis Automation Suite und bringe Vorführtechnik, Einlass und Concession auf das nächste Level.",
                                      }),
                                    }),
                                    className: "framer-1ozy3zi",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                ],
                              }),
                              e("div", {
                                className: "framer-85ukf7",
                                children: [
                                  r(i, {
                                    className: "framer-3tdgtf-container",
                                    children: r(n, {
                                      eszixBaDA: 10,
                                      height: "100%",
                                      id: "dqdGwQ67D",
                                      ik9I5qIGz: !1,
                                      J0LC2FGV8: !1,
                                      KJK1sV1GB: "Dashboard starten →",
                                      layoutId: "dqdGwQ67D",
                                      RmkZjgJwi: "ArrowRight",
                                      UsLusPFRg: "rgb(0, 0, 0)",
                                      variant: "PqgBulBPi",
                                      width: "100%",
                                    }),
                                  }),
                                  r(i, {
                                    className: "framer-1ktzntv-container",
                                    children: r(n, {
                                      eszixBaDA: 10,
                                      height: "100%",
                                      id: "ywyc_1qaf",
                                      ik9I5qIGz: !1,
                                      J0LC2FGV8: !1,
                                      KJK1sV1GB: "Try demo",
                                      layoutId: "ywyc_1qaf",
                                      RmkZjgJwi: "ArrowRight",
                                      UsLusPFRg: "rgb(0, 0, 0)",
                                      variant: "zb8n5Cev9",
                                      width: "100%",
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          m() &&
                            r("div", {
                              className: "framer-btf3us hidden-17umf4t",
                              children: r(c, {
                                breakpoint: p,
                                overrides: {
                                  I4MFroUE_: {
                                    background: {
                                      alt: "",
                                      fit: "fill",
                                      intrinsicHeight: 1500,
                                      intrinsicWidth: 1500,
                                      loading: "lazy",
                                      pixelHeight: 1500,
                                      pixelWidth: 1500,
                                      sizes: "486px",
                                      src: "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png",
                                      srcSet:
                                        "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4.png 512w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-98c1fc.png 1024w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png 1500w",
                                    },
                                  },
                                },
                                children: r(f, {
                                  background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    loading: "lazy",
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "679px",
                                    src: "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png",
                                    srcSet:
                                      "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4.png 512w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-98c1fc.png 1024w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png 1500w",
                                  },
                                  className: "framer-ukxmvx",
                                  "data-framer-name": "image",
                                  name: "image",
                                  transformTemplate: Z,
                                }),
                              }),
                            }),
                        ],
                      }),
                    }),
                  }),
                  r("div", {
                    className: "framer-1bh67o8",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: r("div", {
                      className: "framer-1rniox8",
                      "data-framer-name": "CTA Night",
                      name: "CTA Night",
                      children: e("div", {
                        className: "framer-10uslgt",
                        children: [
                          e("div", {
                            className: "framer-dpvzyp",
                            children: [
                              e("div", {
                                className: "framer-le0v17",
                                children: [
                                  r(t, {
                                    __fromCanvasComponent: !0,
                                    children: r(a, {
                                      children: r("h3", {
                                        className: "framer-styles-preset-a0prbo",
                                        "data-styles-preset": "BUi3OJxlT",
                                        style: {
                                          "--framer-text-alignment": "left",
                                          "--framer-text-color": "rgb(255, 255, 255)",
                                        },
                                        children: "Get instant access",
                                      }),
                                    }),
                                    className: "framer-1kr718w",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(t, {
                                    __fromCanvasComponent: !0,
                                    children: r(a, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1cc56zh",
                                        "data-styles-preset": "PWn1k_MD2",
                                        style: {
                                          "--framer-text-alignment": "left",
                                          "--framer-text-color": "rgb(255, 255, 255)",
                                        },
                                        children:
                                          "Starte jetzt die Kinopolis Automation Suite und bringe Vorführtechnik, Einlass und Concession auf das nächste Level.",
                                      }),
                                    }),
                                    className: "framer-18d8owd",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                ],
                              }),
                              e("div", {
                                className: "framer-eqjphr",
                                children: [
                                  r(i, {
                                    className: "framer-wg1w9b-container",
                                    children: r(n, {
                                      eszixBaDA: 10,
                                      height: "100%",
                                      id: "t01RBLzVt",
                                      ik9I5qIGz: !1,
                                      J0LC2FGV8: !1,
                                      KJK1sV1GB: "Dashboard starten →",
                                      layoutId: "t01RBLzVt",
                                      RmkZjgJwi: "ArrowRight",
                                      UsLusPFRg: "rgb(0, 0, 0)",
                                      variant: "zb8n5Cev9",
                                      width: "100%",
                                    }),
                                  }),
                                  r(i, {
                                    className: "framer-u94x66-container",
                                    children: r(n, {
                                      eszixBaDA: 10,
                                      height: "100%",
                                      id: "vuN6p2hXM",
                                      ik9I5qIGz: !1,
                                      J0LC2FGV8: !1,
                                      KJK1sV1GB: "Try demo",
                                      layoutId: "vuN6p2hXM",
                                      RmkZjgJwi: "ArrowRight",
                                      UsLusPFRg: "rgba(255, 255, 255, 0.15)",
                                      variant: "PqgBulBPi",
                                      width: "100%",
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          m() &&
                            r("div", {
                              className: "framer-1n5n36p hidden-17umf4t",
                              children: r(c, {
                                breakpoint: p,
                                overrides: {
                                  I4MFroUE_: {
                                    background: {
                                      alt: "",
                                      fit: "fill",
                                      intrinsicHeight: 1500,
                                      intrinsicWidth: 1500,
                                      loading: "lazy",
                                      pixelHeight: 1500,
                                      pixelWidth: 1500,
                                      sizes: "486px",
                                      src: "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png",
                                      srcSet:
                                        "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4.png 512w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-98c1fc.png 1024w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png 1500w",
                                    },
                                  },
                                },
                                children: r(f, {
                                  background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    loading: "lazy",
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "679px",
                                    src: "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png",
                                    srcSet:
                                      "../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4.png 512w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-98c1fc.png 1024w, ../../assets/images/zrh9kSWXaKcO7lUaSip2SW6KdP4-5661f7.png 1500w",
                                  },
                                  className: "framer-1e9e45p",
                                  "data-framer-name": "image",
                                  name: "image",
                                  transformTemplate: Z,
                                }),
                              }),
                            }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
            }),
            r("div", { className: S(J, ...z), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  lr = [
    '.framer-9f6Ea[data-border="true"]::after, .framer-9f6Ea [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-9f6Ea.framer-vh9327, .framer-9f6Ea .framer-vh9327 { display: block; }",
    ".framer-9f6Ea.framer-1jyda0q { --border-bottom-width: 1px; --border-color: rgba(173, 173, 173, 0.4); --border-left-width: 1px; --border-right-width: 1px; --border-style: dashed; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-9f6Ea .framer-1p5ywm2 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; max-width: 1600px; overflow: hidden; padding: 20px 20px 20px 20px; position: relative; width: 100%; }",
    '.framer-9f6Ea .framer-1v9ftpf, .framer-9f6Ea .framer-14rpcf6, .framer-9f6Ea .framer-11mny0h, .framer-9f6Ea .framer-dvte8b, .framer-9f6Ea .framer-1achkl9, .framer-9f6Ea .framer-1bh67o8 { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }',
    ".framer-9f6Ea .framer-154o85j { align-content: center; align-items: center; background: radial-gradient(84.6% 67.10000000000001% at 50% 100%, #f7dbff 0%, rgb(255, 255, 255) 100%); display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 120px 40px 120px 40px; position: relative; width: 100%; }",
    ".framer-9f6Ea .framer-hm2th2, .framer-9f6Ea .framer-w81jkt { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; max-width: 800px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; z-index: 1; }",
    ".framer-9f6Ea .framer-lykh7h, .framer-9f6Ea .framer-1floeoj, .framer-9f6Ea .framer-sgormy, .framer-9f6Ea .framer-169wwh1, .framer-9f6Ea .framer-ekfroe, .framer-9f6Ea .framer-1kr718w { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 690px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-9f6Ea .framer-ssk004, .framer-9f6Ea .framer-1db083s { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 420px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-9f6Ea .framer-t0qhpz { -webkit-filter: drop-shadow(0px 50px 26px rgba(163, 71, 189, 0.4)); aspect-ratio: 1 / 1; bottom: -143px; filter: drop-shadow(0px 50px 26px rgba(163, 71, 189, 0.4)); flex: none; height: var(--framer-aspect-ratio-supported, 255px); left: -139px; overflow: visible; position: absolute; width: 255px; z-index: 1; }",
    ".framer-9f6Ea .framer-r8ty6z { -webkit-filter: drop-shadow(0px 50px 26px rgba(163, 71, 189, 0.4)); aspect-ratio: 1 / 1; bottom: -61px; filter: drop-shadow(0px 50px 26px rgba(163, 71, 189, 0.4)); flex: none; overflow: visible; position: absolute; right: -188px; top: -96px; width: var(--framer-aspect-ratio-supported, 285px); z-index: 1; }",
    ".framer-9f6Ea .framer-1jl0bgc, .framer-9f6Ea .framer-gnm8ds { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 1; }",
    ".framer-9f6Ea .framer-tcntk5-container, .framer-9f6Ea .framer-63bs5l-container, .framer-9f6Ea .framer-1lx1l4g-container, .framer-9f6Ea .framer-3i5k2e-container, .framer-9f6Ea .framer-3tdgtf-container, .framer-9f6Ea .framer-1ktzntv-container, .framer-9f6Ea .framer-wg1w9b-container, .framer-9f6Ea .framer-u94x66-container { flex: none; height: auto; position: relative; width: auto; }",
    ".framer-9f6Ea .framer-srbotj { align-content: center; align-items: center; background: radial-gradient(77.3% 69.3% at 50% 100%, #7b1cba 0%, rgb(0, 0, 0) 100%); display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 120px 40px 120px 40px; position: relative; width: 100%; }",
    ".framer-9f6Ea .framer-1fsix3d, .framer-9f6Ea .framer-h62mxd { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 420px; opacity: 0.8; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-9f6Ea .framer-17a9l1u { -webkit-filter: drop-shadow(0px 50px 26px rgba(49, 13, 59, 0.4)); aspect-ratio: 1 / 1; bottom: -143px; filter: drop-shadow(0px 50px 26px rgba(49, 13, 59, 0.4)); flex: none; height: var(--framer-aspect-ratio-supported, 255px); left: -139px; overflow: visible; position: absolute; width: 255px; z-index: 1; }",
    ".framer-9f6Ea .framer-135z1af { -webkit-filter: drop-shadow(0px 50px 26px rgba(49, 13, 59, 0.4)); aspect-ratio: 1 / 1; bottom: -61px; filter: drop-shadow(0px 50px 26px rgba(49, 13, 59, 0.4)); flex: none; overflow: visible; position: absolute; right: -188px; top: -96px; width: var(--framer-aspect-ratio-supported, 285px); z-index: 1; }",
    ".framer-9f6Ea .framer-1nag5dq { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 120px 40px 120px 40px; position: relative; width: 100%; }",
    ".framer-9f6Ea .framer-xsqzeo, .framer-9f6Ea .framer-ipr8bq { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; max-width: 800px; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; z-index: 1; }",
    ".framer-9f6Ea .framer-12wvu2u-container, .framer-9f6Ea .framer-18uaues-container { flex: none; height: auto; position: relative; width: 420px; }",
    ".framer-9f6Ea .framer-1zi35j { align-content: center; align-items: center; background-color: #000000; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 120px 40px 120px 40px; position: relative; width: 100%; }",
    ".framer-9f6Ea .framer-1eb8rhs { align-content: center; align-items: center; background: radial-gradient(77.7% 108.60000000000001% at 99.4% 100%, rgba(56, 103, 255, 0.5) 0%, rgb(255, 255, 255) 100%); display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-9f6Ea .framer-809sis, .framer-9f6Ea .framer-10uslgt { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; max-width: 1200px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 1px; }",
    ".framer-9f6Ea .framer-1q5s4jm, .framer-9f6Ea .framer-dpvzyp { align-content: flex-start; align-items: flex-start; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 1px; }",
    ".framer-9f6Ea .framer-1c9hlob, .framer-9f6Ea .framer-le0v17 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; z-index: 1; }",
    ".framer-9f6Ea .framer-1ozy3zi { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 410px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-9f6Ea .framer-85ukf7, .framer-9f6Ea .framer-eqjphr { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 1; }",
    ".framer-9f6Ea .framer-btf3us, .framer-9f6Ea .framer-1n5n36p { flex: none; height: 337px; overflow: visible; position: relative; width: 587px; }",
    ".framer-9f6Ea .framer-ukxmvx, .framer-9f6Ea .framer-1e9e45p { aspect-ratio: 1.0478395061728396 / 1; bottom: -176px; flex: none; overflow: visible; position: absolute; right: -156px; top: -135px; transform: rotate(-13deg); width: var(--framer-aspect-ratio-supported, 679px); }",
    ".framer-9f6Ea .framer-1rniox8 { align-content: center; align-items: center; background: radial-gradient(77.7% 108.60000000000001% at 99.4% 100%, #171aa6 0%, rgb(0, 0, 0) 100%); display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-9f6Ea .framer-18d8owd { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 410px; opacity: 0.9; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-9f6Ea.framer-1jyda0q, .framer-9f6Ea .framer-1p5ywm2, .framer-9f6Ea .framer-1v9ftpf, .framer-9f6Ea .framer-154o85j, .framer-9f6Ea .framer-hm2th2, .framer-9f6Ea .framer-1jl0bgc, .framer-9f6Ea .framer-14rpcf6, .framer-9f6Ea .framer-srbotj, .framer-9f6Ea .framer-w81jkt, .framer-9f6Ea .framer-gnm8ds, .framer-9f6Ea .framer-11mny0h, .framer-9f6Ea .framer-1nag5dq, .framer-9f6Ea .framer-xsqzeo, .framer-9f6Ea .framer-dvte8b, .framer-9f6Ea .framer-1zi35j, .framer-9f6Ea .framer-ipr8bq, .framer-9f6Ea .framer-1achkl9, .framer-9f6Ea .framer-1eb8rhs, .framer-9f6Ea .framer-809sis, .framer-9f6Ea .framer-1q5s4jm, .framer-9f6Ea .framer-1c9hlob, .framer-9f6Ea .framer-85ukf7, .framer-9f6Ea .framer-1bh67o8, .framer-9f6Ea .framer-1rniox8, .framer-9f6Ea .framer-10uslgt, .framer-9f6Ea .framer-dpvzyp, .framer-9f6Ea .framer-le0v17, .framer-9f6Ea .framer-eqjphr { gap: 0px; } .framer-9f6Ea.framer-1jyda0q > *, .framer-9f6Ea .framer-1v9ftpf > *, .framer-9f6Ea .framer-14rpcf6 > *, .framer-9f6Ea .framer-11mny0h > *, .framer-9f6Ea .framer-xsqzeo > *, .framer-9f6Ea .framer-dvte8b > *, .framer-9f6Ea .framer-ipr8bq > *, .framer-9f6Ea .framer-1achkl9 > *, .framer-9f6Ea .framer-1c9hlob > *, .framer-9f6Ea .framer-1bh67o8 > *, .framer-9f6Ea .framer-le0v17 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-9f6Ea.framer-1jyda0q > :first-child, .framer-9f6Ea .framer-1p5ywm2 > :first-child, .framer-9f6Ea .framer-1v9ftpf > :first-child, .framer-9f6Ea .framer-154o85j > :first-child, .framer-9f6Ea .framer-hm2th2 > :first-child, .framer-9f6Ea .framer-14rpcf6 > :first-child, .framer-9f6Ea .framer-srbotj > :first-child, .framer-9f6Ea .framer-w81jkt > :first-child, .framer-9f6Ea .framer-11mny0h > :first-child, .framer-9f6Ea .framer-1nag5dq > :first-child, .framer-9f6Ea .framer-xsqzeo > :first-child, .framer-9f6Ea .framer-dvte8b > :first-child, .framer-9f6Ea .framer-1zi35j > :first-child, .framer-9f6Ea .framer-ipr8bq > :first-child, .framer-9f6Ea .framer-1achkl9 > :first-child, .framer-9f6Ea .framer-1q5s4jm > :first-child, .framer-9f6Ea .framer-1c9hlob > :first-child, .framer-9f6Ea .framer-1bh67o8 > :first-child, .framer-9f6Ea .framer-dpvzyp > :first-child, .framer-9f6Ea .framer-le0v17 > :first-child { margin-top: 0px; } .framer-9f6Ea.framer-1jyda0q > :last-child, .framer-9f6Ea .framer-1p5ywm2 > :last-child, .framer-9f6Ea .framer-1v9ftpf > :last-child, .framer-9f6Ea .framer-154o85j > :last-child, .framer-9f6Ea .framer-hm2th2 > :last-child, .framer-9f6Ea .framer-14rpcf6 > :last-child, .framer-9f6Ea .framer-srbotj > :last-child, .framer-9f6Ea .framer-w81jkt > :last-child, .framer-9f6Ea .framer-11mny0h > :last-child, .framer-9f6Ea .framer-1nag5dq > :last-child, .framer-9f6Ea .framer-xsqzeo > :last-child, .framer-9f6Ea .framer-dvte8b > :last-child, .framer-9f6Ea .framer-1zi35j > :last-child, .framer-9f6Ea .framer-ipr8bq > :last-child, .framer-9f6Ea .framer-1achkl9 > :last-child, .framer-9f6Ea .framer-1q5s4jm > :last-child, .framer-9f6Ea .framer-1c9hlob > :last-child, .framer-9f6Ea .framer-1bh67o8 > :last-child, .framer-9f6Ea .framer-dpvzyp > :last-child, .framer-9f6Ea .framer-le0v17 > :last-child { margin-bottom: 0px; } .framer-9f6Ea .framer-1p5ywm2 > *, .framer-9f6Ea .framer-hm2th2 > *, .framer-9f6Ea .framer-w81jkt > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-9f6Ea .framer-154o85j > *, .framer-9f6Ea .framer-srbotj > *, .framer-9f6Ea .framer-1nag5dq > *, .framer-9f6Ea .framer-1zi35j > *, .framer-9f6Ea .framer-1q5s4jm > *, .framer-9f6Ea .framer-dpvzyp > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-9f6Ea .framer-1jl0bgc > *, .framer-9f6Ea .framer-gnm8ds > *, .framer-9f6Ea .framer-809sis > *, .framer-9f6Ea .framer-85ukf7 > *, .framer-9f6Ea .framer-10uslgt > *, .framer-9f6Ea .framer-eqjphr > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-9f6Ea .framer-1jl0bgc > :first-child, .framer-9f6Ea .framer-gnm8ds > :first-child, .framer-9f6Ea .framer-1eb8rhs > :first-child, .framer-9f6Ea .framer-809sis > :first-child, .framer-9f6Ea .framer-85ukf7 > :first-child, .framer-9f6Ea .framer-1rniox8 > :first-child, .framer-9f6Ea .framer-10uslgt > :first-child, .framer-9f6Ea .framer-eqjphr > :first-child { margin-left: 0px; } .framer-9f6Ea .framer-1jl0bgc > :last-child, .framer-9f6Ea .framer-gnm8ds > :last-child, .framer-9f6Ea .framer-1eb8rhs > :last-child, .framer-9f6Ea .framer-809sis > :last-child, .framer-9f6Ea .framer-85ukf7 > :last-child, .framer-9f6Ea .framer-1rniox8 > :last-child, .framer-9f6Ea .framer-10uslgt > :last-child, .framer-9f6Ea .framer-eqjphr > :last-child { margin-right: 0px; } .framer-9f6Ea .framer-1eb8rhs > *, .framer-9f6Ea .framer-1rniox8 > * { margin: 0px; margin-left: calc(30px / 2); margin-right: calc(30px / 2); } }",
    "@media (min-width: 1200px) { .framer-9f6Ea .hidden-1jyda0q { display: none !important; } }",
    "@media (min-width: 810px) and (max-width: 1199px) { .framer-9f6Ea .hidden-17n2qex { display: none !important; } .framer-9f6Ea.framer-1jyda0q { width: 810px; } .framer-9f6Ea .framer-r8ty6z, .framer-9f6Ea .framer-135z1af { width: var(--framer-aspect-ratio-supported, 276px); } .framer-9f6Ea .framer-12wvu2u-container, .framer-9f6Ea .framer-18uaues-container { max-width: 420px; width: 100%; } .framer-9f6Ea .framer-btf3us, .framer-9f6Ea .framer-1n5n36p { flex: 1 0 0px; width: 1px; } .framer-9f6Ea .framer-ukxmvx, .framer-9f6Ea .framer-1e9e45p { bottom: -64px; right: -207px; top: -63px; width: var(--framer-aspect-ratio-supported, 486px); }}",
    "@media (max-width: 809px) { .framer-9f6Ea .hidden-17umf4t { display: none !important; } .framer-9f6Ea.framer-1jyda0q { width: 390px; } .framer-9f6Ea .framer-154o85j, .framer-9f6Ea .framer-srbotj, .framer-9f6Ea .framer-1eb8rhs, .framer-9f6Ea .framer-1rniox8 { padding: 40px 20px 40px 20px; } .framer-9f6Ea .framer-12wvu2u-container, .framer-9f6Ea .framer-18uaues-container { width: 100%; } .framer-9f6Ea .framer-809sis, .framer-9f6Ea .framer-10uslgt { flex-direction: column; } .framer-9f6Ea .framer-1q5s4jm, .framer-9f6Ea .framer-dpvzyp { flex: none; width: 100%; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-9f6Ea .framer-809sis, .framer-9f6Ea .framer-10uslgt { gap: 0px; } .framer-9f6Ea .framer-809sis > *, .framer-9f6Ea .framer-10uslgt > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-9f6Ea .framer-809sis > :first-child, .framer-9f6Ea .framer-10uslgt > :first-child { margin-top: 0px; } .framer-9f6Ea .framer-809sis > :last-child, .framer-9f6Ea .framer-10uslgt > :last-child { margin-bottom: 0px; } }}",
    ...G,
    ..._,
    ...U,
  ],
  w = P(sr, lr, "framer-9f6Ea"),
  Cr = w;
w.displayName = "Navigation";
w.defaultProps = { height: 2825.5, width: 1200 };
A(w, [
  {
    family: "Satoshi",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff2",
    weight: "400",
  },
  {
    family: "Satoshi",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2",
    weight: "500",
  },
  ...rr,
  ...er,
  ...ar,
  ...O,
  ...T,
  ...D,
]);
var Lr = {
  exports: {
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    default: {
      type: "reactComponent",
      name: "FramerEgBJHf15F",
      slots: [],
      annotations: {
        framerDisplayContentsDiv: "false",
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"I4MFroUE_":{"layout":["fixed","auto"]},"vVynqpYmd":{"layout":["fixed","auto"]}}}',
        framerIntrinsicHeight: "2825.5",
        framerResponsiveScreen: "",
        framerContractVersion: "1",
        framerIntrinsicWidth: "1200",
        framerImmutableVariables: "true",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
export { Lr as __FramerMetadata__, Cr as default };
//# sourceMappingURL=amYiYuMzvG-ZsuINZubO8xIX0icNaR2a_2ejuXoMcmA.I5V65P2F.mjs.map
