import { a as k } from "./chunk-W6IPIGDZ.mjs";
import { a as P } from "./chunk-EBNSP2JA.mjs";
import { a as u } from "./chunk-K7M2XYUE.mjs";
import { a as Z } from "./chunk-JZJ3Z6GM.mjs";
import { a as H } from "./chunk-ARQDWR4D.mjs";
import "./chunk-MLYPFAXL.mjs";
import "./chunk-G5VSNPDD.mjs";
import "./chunk-PBG357LN.mjs";
import "./chunk-3H53UPLQ.mjs";
import { a as lr, b as sr, c as fr } from "./chunk-D5CSMFZ4.mjs";
import { a as I } from "./chunk-HBMRKKOJ.mjs";
import { a as M } from "./chunk-2GNE24G3.mjs";
import { a as R } from "./chunk-CVPCFDSR.mjs";
import "./chunk-G7RZZ2HZ.mjs";
import "./chunk-D5FMDQUG.mjs";
import { a as hr, b as gr, c as xr } from "./chunk-MNHRXVGF.mjs";
import { a as pr, b as cr, c as dr } from "./chunk-ALFWC2ON.mjs";
import { a as nr, b as or, c as mr } from "./chunk-5SAWWLB7.mjs";
import { b as r, c as t } from "./chunk-OO3TPEBQ.mjs";
import {
  K as D,
  M as O,
  V as j,
  W as K,
  Y as f,
  Z as $,
  _ as rr,
  aa as er,
  ba as x,
  c as a,
  da as s,
  g as G,
  ga as e,
  ia as n,
  l as V,
  m as U,
  ma as tr,
  o as W,
  ra as c,
  t as h,
  ta as ar,
  ua as i,
  v as Q,
  va as ir,
  wa as g,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var Mr = g(M),
  Ir = g(H),
  Rr = g(I),
  L = K(ar),
  Pr = g(R),
  Hr = g(k),
  Zr = g(u),
  Xr = g(P);
var Br = {
    CXwbxB_Ju: "(min-width: 810px) and (max-width: 1199px)",
    p2mxjPBFT: "(min-width: 1200px)",
    VHyp2vXPo: "(max-width: 809px)",
  },
  Ar = () => typeof document < "u",
  wr = "framer-E58rt",
  Jr = {
    CXwbxB_Ju: "framer-v-11hy0g5",
    p2mxjPBFT: "framer-v-1exbyug",
    VHyp2vXPo: "framer-v-15gyq9a",
  },
  qr = { default: { duration: 0 } },
  kr = { delay: 0.2, duration: 0.2, ease: [0, 0.89, 0.39, 1], type: "tween" },
  Yr = { opacity: 0, rotate: 0, scale: 1, transition: kr, x: 0, y: 50 },
  o = (d, p) => `perspective(1200px) ${p}`,
  X = { opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, transition: kr, x: 0, y: 0 },
  m = { opacity: 0.001, rotate: 0, scale: 1, x: 0, y: 50 },
  Lr = { delay: 0.2, duration: 0.7, ease: [0, 0.89, 0.39, 1], type: "tween" },
  ur = { opacity: 0, rotate: 0, scale: 1, transition: Lr, x: 0, y: 50 },
  y = { opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, transition: Lr, x: 0, y: 0 },
  yr = { bounceDamping: 30, bounceStiffness: 400, delay: 0, type: "inertia" },
  br = (d) => d.preventDefault(),
  vr = { cursor: "grabbing" },
  Cr = (d, p) => `${p} rotate(-8deg)`,
  Er = (d, p) => `${p} rotate(9deg)`,
  Gr = (d, p) => `translateY(-50%) ${p} rotate(9deg)`,
  _r = { delay: 0.4, duration: 0.7, ease: [0, 0.89, 0.39, 1], type: "tween" },
  Vr = { opacity: 0, rotate: 0, scale: 1, transition: _r, x: 0, y: 50 },
  B = { opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, transition: _r, x: 0, y: 0 },
  zr = { delay: 0.6, duration: 0.7, ease: [0, 0.89, 0.39, 1], type: "tween" },
  Ur = { opacity: 0, rotate: 0, scale: 1, transition: zr, x: 0, y: 50 },
  A = { opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, transition: zr, x: 0, y: 0 },
  Qr = { opacity: 1, rotate: 0, rotateX: 20, rotateY: 0, scale: 1, x: 0, y: 120 },
  Sr = { delay: 0, duration: 1, ease: [0, 0.88, 0.23, 1.01], type: "tween" },
  Dr = { opacity: 1, rotate: 0, rotateX: 20, rotateY: 0, scale: 1, transition: Sr, x: 0, y: 120 },
  Or = { damping: 30, delay: 0, mass: 1, stiffness: 400, type: "spring" },
  b = { opacity: 0.3, rotate: 0, scale: 1, transition: Or },
  J = Z(),
  Kr = { Desktop: "p2mxjPBFT", Phone: "VHyp2vXPo", Tablet: "CXwbxB_Ju" },
  $r = ({ height: d, id: p, width: S, ..._ }) => {
    var v, C;
    return {
      ..._,
      variant:
        (C = (v = Kr[_.variant]) !== null && v !== void 0 ? v : _.variant) !== null && C !== void 0
          ? C
          : "p2mxjPBFT",
    };
  },
  re = G(function (d, p) {
    let { activeLocale: S, setLocale: _ } = D(),
      { style: v, className: C, layoutId: N, variant: Nr, ...Tr } = $r(d);
    U(() => {
      let w = Z(void 0, S);
      if (((document.title = w.title || ""), w.viewport)) {
        var T;
        (T = document.querySelector('meta[name="viewport"]')) === null ||
          T === void 0 ||
          T.setAttribute("content", w.viewport);
      }
      if (w.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((F) => F.startsWith("framer-body-"))
            .map((F) => document.body.classList.remove(F)),
          document.body.classList.add(`${w.bodyClassName}-framer-E58rt`),
          () => {
            document.body.classList.remove(`${w.bodyClassName}-framer-E58rt`);
          }
        );
    }, [void 0, S]);
    let [l, te] = tr(Nr, Br, !1),
      ae = void 0,
      ie = qr.default,
      Fr = W(null),
      E = () => (l === "VHyp2vXPo" ? !Ar() : !0),
      Wr = O("eva67EI0j"),
      q = W(null),
      jr = V(),
      Y = [mr, xr, dr, fr];
    return (
      rr({}),
      r(er.Provider, {
        value: { primaryVariantId: "p2mxjPBFT", variantClassNames: Jr },
        children: t(Q, {
          id: N ?? jr,
          children: [
            t(h.div, {
              ...Tr,
              className: j(wr, ...Y, "framer-1exbyug", C),
              ref: p ?? Fr,
              style: { ...v },
              children: [
                t("div", {
                  className: "framer-lcma6w",
                  "data-framer-name": "Banner",
                  name: "Banner",
                  children: [
                    E() &&
                      r(i, {
                        __fromCanvasComponent: !0,
                        children: r(a, {
                          children: r("p", {
                            className: "framer-styles-preset-1dts917",
                            "data-styles-preset": "hgKudGhZ5",
                            style: { "--framer-text-color": "rgb(0, 0, 0)" },
                            children: "Kinopolis Automation Suite • Live-Saalüberwachung, Vorführ-Checks & Popcorn-Prognose",
                          }),
                        }),
                        className: "framer-1pjuc9a hidden-15gyq9a",
                        verticalAlignment: "top",
                        withExternalLayout: !0,
                      }),
                    r(f, {
                      className: "framer-19vmq59-container",
                      children: r(M, {
                        bVToBLBTS: "Dashboard starten →",
                        height: "100%",
                        id: "JVkJRs3Ww",
                        KqeH5xil_: "rgb(0, 0, 0)",
                        layoutId: "JVkJRs3Ww",
                        MJWWsEY26: "/dashboard",
                        variant: "I27BjI0db",
                        width: "100%",
                      }),
                    }),
                    r("div", {
                      className: "framer-14w83fj",
                      "data-framer-name": "Gradient",
                      name: "Gradient",
                    }),
                  ],
                }),
                r(f, {
                  className: "framer-15w9v7j-container",
                  layoutScroll: !0,
                  children: r(s, {
                    breakpoint: l,
                    overrides: {
                      CXwbxB_Ju: { variant: "DlpJpKBvt" },
                      VHyp2vXPo: { variant: "DlpJpKBvt" },
                    },
                    children: r(H, {
                      G7Ppt7M52: "rgb(36, 36, 36)",
                      height: "100%",
                      icf8yPK44: 0,
                      id: "tUHF1TcZu",
                      layoutId: "tUHF1TcZu",
                      O2GRK6A3O: "zb8n5Cev9",
                      style: { height: "100%", width: "100%" },
                      upiCzNseE: "rgb(255, 255, 255)",
                      variant: "yIJukhzj6",
                      width: "100%",
                      XRn7LO2VY: "rgb(0, 0, 0)",
                    }),
                  }),
                }),
                t("div", {
                  className: "framer-197izbp",
                  "data-framer-name": "Hero",
                  name: "Hero",
                  children: [
                    r("div", {
                      className: "framer-1bo4vrz",
                      "data-framer-name": "Oval Outline",
                      name: "Oval Outline",
                    }),
                    r("div", {
                      className: "framer-1ax6d5t",
                      "data-framer-name": "Oval",
                      name: "Oval",
                    }),
                    t("div", {
                      className: "framer-70mgqz",
                      children: [
                        r(s, {
                          breakpoint: l,
                          overrides: {
                            CXwbxB_Ju: {
                              "data-framer-appear-id": "1by2ofq",
                              animate: e("animate", "1by2ofq", X, "11hy0g5"),
                              initial: e("initial", "1by2ofq", m, "11hy0g5"),
                              transformTemplate: n("1by2ofq", o),
                            },
                            VHyp2vXPo: {
                              "data-framer-appear-id": "1jb1x2k",
                              animate: e("animate", "1jb1x2k", X, "15gyq9a"),
                              initial: e("initial", "1jb1x2k", m, "15gyq9a"),
                              transformTemplate: n("1jb1x2k", o),
                            },
                          },
                          children: r(f, {
                            animate: e("animate", "5v3iq3", X, "1exbyug"),
                            className: "framer-5v3iq3-container",
                            "data-framer-appear-id": "5v3iq3",
                            exit: Yr,
                            initial: e("initial", "5v3iq3", m, "1exbyug"),
                            transformTemplate: n("5v3iq3", o),
                            children: r(I, {
                              GmAhv_WVa: 0.5,
                              height: "100%",
                              hSgW9f2ir: "Announcing series C.",
                              id: "PtQbJdf6R",
                              layoutId: "PtQbJdf6R",
                              p2xmGpLux: "Read more",
                              ToKaS18SW: !0,
                              variant: "Nq1uWl93W",
                              width: "100%",
                              Z69PPXt7v: !1,
                            }),
                          }),
                        }),
                        t("div", {
                          className: "framer-1c7twfw",
                          children: [
                            r(s, {
                              breakpoint: l,
                              overrides: {
                                CXwbxB_Ju: {
                                  "data-framer-appear-id": "11quaoz",
                                  animate: e("animate", "11quaoz", y, "11hy0g5"),
                                  children: r(a, {
                                    children: r("p", {
                                      style: {
                                        "--font-selector": "RlM7U3dpdHplci1zZW1pYm9sZA==",
                                        "--framer-font-family":
                                          '"Switzer", "Switzer Placeholder", sans-serif',
                                        "--framer-font-size": "110px",
                                        "--framer-font-weight": "600",
                                        "--framer-letter-spacing": "-3.5px",
                                        "--framer-line-height": "0.8em",
                                        "--framer-text-alignment": "center",
                                        "--framer-text-color": "rgb(255, 255, 255)",
                                      },
                                      children: "One Task",
                                    }),
                                  }),
                                  initial: e("initial", "11quaoz", m, "11hy0g5"),
                                  transformTemplate: n("11quaoz", o),
                                },
                                VHyp2vXPo: {
                                  "data-framer-appear-id": "8prss4",
                                  animate: e("animate", "8prss4", y, "15gyq9a"),
                                  children: r(a, {
                                    children: r("p", {
                                      style: {
                                        "--font-selector": "RlM7U3dpdHplci1zZW1pYm9sZA==",
                                        "--framer-font-family":
                                          '"Switzer", "Switzer Placeholder", sans-serif',
                                        "--framer-font-size": "58px",
                                        "--framer-font-weight": "600",
                                        "--framer-letter-spacing": "-1px",
                                        "--framer-line-height": "0.8em",
                                        "--framer-text-alignment": "center",
                                        "--framer-text-color": "rgb(255, 255, 255)",
                                      },
                                      children: "One Task",
                                    }),
                                  }),
                                  initial: e("initial", "8prss4", m, "15gyq9a"),
                                  transformTemplate: n("8prss4", o),
                                },
                              },
                              children: r(i, {
                                __fromCanvasComponent: !0,
                                animate: e("animate", "19j5x41", y, "1exbyug"),
                                children: r(a, {
                                  children: r("p", {
                                    style: {
                                      "--font-selector": "RlM7U3dpdHplci1zZW1pYm9sZA==",
                                      "--framer-font-family":
                                        '"Switzer", "Switzer Placeholder", sans-serif',
                                      "--framer-font-size": "154px",
                                      "--framer-font-weight": "600",
                                      "--framer-letter-spacing": "-3.5px",
                                      "--framer-line-height": "0.8em",
                                      "--framer-text-alignment": "center",
                                      "--framer-text-color": "rgb(255, 255, 255)",
                                    },
                                    children: "One Task",
                                  }),
                                }),
                                className: "framer-19j5x41",
                                "data-framer-appear-id": "19j5x41",
                                exit: ur,
                                fonts: ["FS;Switzer-semibold"],
                                initial: e("initial", "19j5x41", m, "1exbyug"),
                                transformTemplate: n("19j5x41", o),
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            }),
                            E() &&
                              r(s, {
                                breakpoint: l,
                                overrides: {
                                  CXwbxB_Ju: {
                                    background: {
                                      alt: "",
                                      fit: "fill",
                                      intrinsicHeight: 1500,
                                      intrinsicWidth: 1500,
                                      pixelHeight: 1500,
                                      pixelWidth: 1500,
                                      sizes: "163px",
                                      src: "https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png",
                                      srcSet:
                                        "https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png?scale-down-to=512 512w, https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png 1500w",
                                    },
                                  },
                                },
                                children: r(L, {
                                  __perspectiveFX: !1,
                                  __targetOpacity: 1,
                                  background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "211px",
                                    src: "https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png",
                                    srcSet:
                                      "https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png?scale-down-to=512 512w, https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/TMSU7EEn6tWu1bXQjXJoGO6p1rA.png 1500w",
                                  },
                                  className: "framer-2gmskv hidden-15gyq9a",
                                  "data-framer-name": "Shape Icon",
                                  drag: !0,
                                  dragMomentum: !1,
                                  dragSnapToOrigin: !0,
                                  dragTransition: yr,
                                  name: "Shape Icon",
                                  onMouseDown: br,
                                  transformTemplate: Cr,
                                  whileTap: vr,
                                }),
                              }),
                            E() &&
                              r(s, {
                                breakpoint: l,
                                overrides: {
                                  CXwbxB_Ju: {
                                    background: {
                                      alt: "",
                                      fit: "fill",
                                      intrinsicHeight: 1500,
                                      intrinsicWidth: 1500,
                                      pixelHeight: 1500,
                                      pixelWidth: 1500,
                                      sizes: "170.3398px",
                                      src: "https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png",
                                      srcSet:
                                        "https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png?scale-down-to=512 512w, https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png 1500w",
                                    },
                                    transformTemplate: Gr,
                                  },
                                },
                                children: r(L, {
                                  __perspectiveFX: !1,
                                  __targetOpacity: 1,
                                  background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "211px",
                                    src: "https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png",
                                    srcSet:
                                      "https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png?scale-down-to=512 512w, https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/6uMPQdAY2MfmgnMc11g8IK2WiMQ.png 1500w",
                                  },
                                  className: "framer-zcvspw hidden-15gyq9a",
                                  "data-framer-name": "Shape Icon",
                                  drag: !0,
                                  dragMomentum: !1,
                                  dragSnapToOrigin: !0,
                                  dragTransition: yr,
                                  name: "Shape Icon",
                                  onMouseDown: br,
                                  transformTemplate: Er,
                                  whileTap: vr,
                                }),
                              }),
                            r(s, {
                              breakpoint: l,
                              overrides: {
                                CXwbxB_Ju: {
                                  "data-framer-appear-id": "1adh3rl",
                                  animate: e("animate", "1adh3rl", y, "11hy0g5"),
                                  children: r(a, {
                                    children: r("p", {
                                      style: {
                                        "--font-selector": "RlM7U3dpdHplci1zZW1pYm9sZA==",
                                        "--framer-font-family":
                                          '"Switzer", "Switzer Placeholder", sans-serif',
                                        "--framer-font-size": "110px",
                                        "--framer-font-weight": "600",
                                        "--framer-letter-spacing": "-3.5px",
                                        "--framer-line-height": "0.8em",
                                        "--framer-text-color": "rgb(255, 255, 255)",
                                      },
                                      children: "at a Time",
                                    }),
                                  }),
                                  initial: e("initial", "1adh3rl", m, "11hy0g5"),
                                  transformTemplate: n("1adh3rl", o),
                                },
                                VHyp2vXPo: {
                                  "data-framer-appear-id": "tfnefr",
                                  animate: e("animate", "tfnefr", y, "15gyq9a"),
                                  children: r(a, {
                                    children: r("p", {
                                      style: {
                                        "--font-selector": "RlM7U3dpdHplci1zZW1pYm9sZA==",
                                        "--framer-font-family":
                                          '"Switzer", "Switzer Placeholder", sans-serif',
                                        "--framer-font-size": "58px",
                                        "--framer-font-weight": "600",
                                        "--framer-letter-spacing": "-1px",
                                        "--framer-line-height": "0.8em",
                                        "--framer-text-color": "rgb(255, 255, 255)",
                                      },
                                      children: "at a Time",
                                    }),
                                  }),
                                  initial: e("initial", "tfnefr", m, "15gyq9a"),
                                  transformTemplate: n("tfnefr", o),
                                },
                              },
                              children: r(i, {
                                __fromCanvasComponent: !0,
                                animate: e("animate", "1ri568a", y, "1exbyug"),
                                children: r(a, {
                                  children: r("p", {
                                    style: {
                                      "--font-selector": "RlM7U3dpdHplci1zZW1pYm9sZA==",
                                      "--framer-font-family":
                                        '"Switzer", "Switzer Placeholder", sans-serif',
                                      "--framer-font-size": "154px",
                                      "--framer-font-weight": "600",
                                      "--framer-letter-spacing": "-3.5px",
                                      "--framer-line-height": "0.8em",
                                      "--framer-text-color": "rgb(255, 255, 255)",
                                    },
                                    children: "at a Time",
                                  }),
                                }),
                                className: "framer-1ri568a",
                                "data-framer-appear-id": "1ri568a",
                                exit: ur,
                                fonts: ["FS;Switzer-semibold"],
                                initial: e("initial", "1ri568a", m, "1exbyug"),
                                transformTemplate: n("1ri568a", o),
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            }),
                          ],
                        }),
                        r(s, {
                          breakpoint: l,
                          overrides: {
                            CXwbxB_Ju: {
                              "data-framer-appear-id": "7uac30",
                              animate: e("animate", "7uac30", B, "11hy0g5"),
                              initial: e("initial", "7uac30", m, "11hy0g5"),
                              transformTemplate: n("7uac30", o),
                            },
                            VHyp2vXPo: {
                              "data-framer-appear-id": "uf2l6c",
                              animate: e("animate", "uf2l6c", B, "15gyq9a"),
                              initial: e("initial", "uf2l6c", m, "15gyq9a"),
                              transformTemplate: n("uf2l6c", o),
                            },
                          },
                          children: r(i, {
                            __fromCanvasComponent: !0,
                            animate: e("animate", "13awvk3", B, "1exbyug"),
                            children: r(a, {
                              children: r("p", {
                                className: "framer-styles-preset-sxuwop",
                                "data-styles-preset": "dGJYq65Lz",
                                style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                children:
                                  "Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your successes, one task at a time.",
                              }),
                            }),
                            className: "framer-13awvk3",
                            "data-framer-appear-id": "13awvk3",
                            exit: Vr,
                            initial: e("initial", "13awvk3", m, "1exbyug"),
                            transformTemplate: n("13awvk3", o),
                            verticalAlignment: "top",
                            withExternalLayout: !0,
                          }),
                        }),
                        r(s, {
                          breakpoint: l,
                          overrides: {
                            CXwbxB_Ju: {
                              "data-framer-appear-id": "1lix26p",
                              animate: e("animate", "1lix26p", A, "11hy0g5"),
                              initial: e("initial", "1lix26p", m, "11hy0g5"),
                              transformTemplate: n("1lix26p", o),
                            },
                            VHyp2vXPo: {
                              "data-framer-appear-id": "1y2mdnn",
                              animate: e("animate", "1y2mdnn", A, "15gyq9a"),
                              initial: e("initial", "1y2mdnn", m, "15gyq9a"),
                              transformTemplate: n("1y2mdnn", o),
                            },
                          },
                          children: r(f, {
                            animate: e("animate", "1xczehv", A, "1exbyug"),
                            className: "framer-1xczehv-container",
                            "data-framer-appear-id": "1xczehv",
                            exit: Ur,
                            initial: e("initial", "1xczehv", m, "1exbyug"),
                            transformTemplate: n("1xczehv", o),
                            children: r(s, {
                              breakpoint: l,
                              overrides: {
                                CXwbxB_Ju: { variant: "zb8n5Cev9" },
                                VHyp2vXPo: { variant: "zb8n5Cev9" },
                              },
                              children: r(R, {
                                eszixBaDA: 10,
                                height: "100%",
                                id: "VcQ6nEsZd",
                                ik9I5qIGz: !1,
                                J0LC2FGV8: !1,
                                KJK1sV1GB: "Get started",
                                layoutId: "VcQ6nEsZd",
                                RmkZjgJwi: "ArrowRight",
                                UsLusPFRg: "rgb(0, 0, 0)",
                                variant: "ohXdB0YgU",
                                width: "100%",
                                yTZZaFOb3: "https://framer.link/ZQ2l2Kk",
                              }),
                            }),
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                t("div", {
                  className: "framer-8mbxf2",
                  "data-framer-name": "Logo Strip",
                  name: "Logo Strip",
                  children: [
                    r(i, {
                      __fromCanvasComponent: !0,
                      children: r(a, {
                        children: r("p", {
                          className: "framer-styles-preset-1dts917",
                          "data-styles-preset": "hgKudGhZ5",
                          style: { "--framer-text-color": "rgb(255, 255, 255)" },
                          children: "Trusted by the world\u2019s most innovative teams",
                        }),
                      }),
                      className: "framer-1giz6yt",
                      verticalAlignment: "top",
                      withExternalLayout: !0,
                    }),
                    t("div", {
                      className: "framer-1yylfb2",
                      children: [
                        t("div", {
                          className: "framer-77k2i6",
                          children: [
                            r(c, {
                              className: "framer-1q8jwqx",
                              "data-framer-name": "graphic",
                              layout: "position",
                              name: "graphic",
                              opacity: 1,
                              radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                              svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss130635346_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 6.5 L 13 0 L 26 6.5 L 26 19.5 L 13 26 L 13 19.5 L 0 26 L 0 19.5 L 13 13 L 0 6.5 L 0 0 Z M 13 6.5 L 13 19.5 L 26 13 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                              svgContentId: 130635346,
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
                                    "--framer-text-color": "rgb(255, 255, 255)",
                                  },
                                  children: "Acme Corp",
                                }),
                              }),
                              className: "framer-1lv8dns",
                              fonts: ["FS;Satoshi-bold"],
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          ],
                        }),
                        t("div", {
                          className: "framer-601rc8",
                          children: [
                            r(c, {
                              className: "framer-w7kgo6",
                              "data-framer-name": "graphic",
                              layout: "position",
                              name: "graphic",
                              opacity: 1,
                              radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                              svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss2103996054_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 26 C 12.142 26 11.352 25.786 10.63 25.357 C 9.931 24.951 9.366 24.398 8.938 23.698 C 8.531 22.976 8.328 22.186 8.328 21.328 C 8.328 20.245 8.576 19.342 9.073 18.62 C 9.57 17.898 10.337 17.051 11.375 16.081 C 12.142 15.381 12.526 14.715 12.526 14.083 L 12.526 13.474 L 11.917 13.474 C 11.217 13.474 10.258 14.174 9.039 15.573 C 7.843 16.972 6.387 17.672 4.672 17.672 C 3.814 17.672 3.024 17.469 2.302 17.063 C 1.602 16.634 1.038 16.069 0.609 15.37 C 0.203 14.648 0 13.858 0 13 C 0 12.142 0.203 11.364 0.609 10.664 C 1.038 9.942 1.602 9.378 2.302 8.971 C 3.024 8.542 3.814 8.328 4.672 8.328 C 6.365 8.328 7.809 9.017 9.005 10.393 C 10.201 11.77 11.172 12.458 11.917 12.458 L 12.526 12.458 L 12.526 11.917 C 12.526 11.285 12.142 10.619 11.375 9.919 L 10.596 9.208 C 10.032 8.689 9.513 8.069 9.039 7.346 C 8.565 6.602 8.328 5.71 8.328 4.672 C 8.328 3.814 8.531 3.036 8.938 2.336 C 9.366 1.614 9.931 1.049 10.63 0.643 C 11.353 0.214 12.143 0 13 0 C 13.858 0 14.636 0.214 15.336 0.643 C 16.058 1.072 16.622 1.636 17.029 2.336 C 17.457 3.036 17.672 3.814 17.672 4.672 C 17.672 6.365 16.983 7.809 15.607 9.005 C 14.23 10.201 13.542 11.172 13.542 11.917 L 13.542 12.458 L 14.083 12.458 C 14.851 12.458 15.821 11.77 16.995 10.393 C 18.146 9.017 19.59 8.328 21.328 8.328 C 22.186 8.328 22.964 8.543 23.664 8.971 C 24.386 9.378 24.951 9.931 25.357 10.63 C 25.786 11.33 26 12.12 26 13 C 26 13.858 25.786 14.648 25.357 15.37 C 24.951 16.069 24.386 16.634 23.664 17.063 C 22.964 17.469 22.186 17.672 21.328 17.672 C 20.267 17.672 19.353 17.412 18.586 16.893 C 17.841 16.374 17.006 15.618 16.081 14.625 C 15.381 13.858 14.715 13.474 14.083 13.474 L 13.542 13.474 L 13.542 14.083 C 13.542 14.918 14.23 15.889 15.607 16.995 C 16.983 18.101 17.672 19.545 17.672 21.328 C 17.672 22.186 17.457 22.976 17.029 23.698 C 16.622 24.398 16.069 24.951 15.37 25.357 C 14.67 25.786 13.88 26 13 26 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                              svgContentId: 2103996054,
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
                                    "--framer-text-color": "rgb(255, 255, 255)",
                                  },
                                  children: "Quantum",
                                }),
                              }),
                              className: "framer-lw2puc",
                              fonts: ["FS;Switzer-bold"],
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          ],
                        }),
                        t("div", {
                          className: "framer-1qxnvr4",
                          children: [
                            r(c, {
                              className: "framer-1v0g47y",
                              "data-framer-name": "graphic",
                              layout: "position",
                              name: "graphic",
                              opacity: 1,
                              radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                              svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22"><g id="ss3274348696_1"><path d="M 0 0 L 22 0 L 22 22 L 0 22 Z" fill="transparent"></path><path d="M 11.043 10.104 C 10.587 4.448 5.852 0 0.079 0 C 0.079 5.747 4.485 10.464 10.104 10.957 C 4.448 11.413 0 16.148 0 21.921 C 5.747 21.921 10.464 17.515 10.957 11.896 C 11.413 17.552 16.148 22 21.921 22 C 21.921 16.253 17.515 11.536 11.896 11.043 C 17.552 10.587 22 5.852 22 0.079 C 16.253 0.079 11.536 4.485 11.043 10.104 Z M 11 11 L 11 11 L 11 11 L 11 11 L 11 11 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                              svgContentId: 3274348696,
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
                                    "--framer-text-color": "rgb(255, 255, 255)",
                                  },
                                  children: "Echo Valley",
                                }),
                              }),
                              className: "framer-1cd3xbg",
                              fonts: ["FS;Chillax-semibold"],
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          ],
                        }),
                        r("div", {
                          className: "framer-kjmxhi",
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
                                  "--framer-text-color": "rgb(255, 255, 255)",
                                },
                                children: "PULSE",
                              }),
                            }),
                            className: "framer-9ktlw9",
                            fonts: ["FS;Panchang-bold"],
                            verticalAlignment: "top",
                            withExternalLayout: !0,
                          }),
                        }),
                        t("div", {
                          className: "framer-172hkg1",
                          children: [
                            r(c, {
                              className: "framer-v5pqtt",
                              "data-framer-name": "graphic",
                              layout: "position",
                              name: "graphic",
                              opacity: 1,
                              radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                              svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g transform="translate(-0 -0)" id="ss3193510824_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 20.849 C 2.924 28.433 -4.433 21.076 3.151 12 C -4.433 2.924 2.924 -4.433 12 3.151 C 21.075 -4.433 28.433 2.924 20.849 12 C 28.433 21.069 21.075 28.433 12 20.849 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                              svgContentId: 3193510824,
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
                                    "--framer-text-color": "rgb(255, 255, 255)",
                                  },
                                  children: "APEX",
                                }),
                              }),
                              className: "framer-1185fjc",
                              fonts: ["FS;Chillax-bold"],
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          ],
                        }),
                        t("div", {
                          className: "framer-1bpf6pb",
                          children: [
                            r(c, {
                              className: "framer-1fiekaw",
                              "data-framer-name": "graphic",
                              layout: "position",
                              name: "graphic",
                              opacity: 1,
                              radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                              svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g id="ss2259763762_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 12 C 12 12 13.5 7.983 13.5 5.143 C 13.5 2.302 12.828 0 12 0 C 11.172 0 10.5 2.303 10.5 5.143 C 10.5 7.983 12 12 12 12 Z M 12 12 C 12 12 13.78 15.901 15.788 17.909 C 17.796 19.918 19.899 21.071 20.485 20.485 C 21.071 19.899 19.918 17.796 17.909 15.788 C 15.901 13.78 12 12 12 12 Z M 12 12 C 12 12 16.017 10.5 18.857 10.5 C 21.697 10.5 24 11.172 24 12 C 24 12.828 21.697 13.5 18.857 13.5 C 16.017 13.5 12 12 12 12 Z M 12 12 C 12 12 8.099 13.78 6.091 15.788 C 4.082 17.796 2.929 19.899 3.515 20.485 C 4.101 21.071 6.204 19.918 8.212 17.909 C 10.22 15.901 12 12 12 12 Z M 12 12 C 12.003 12.009 13.5 16.02 13.5 18.857 C 13.5 21.697 12.828 24 12 24 C 11.172 24 10.5 21.697 10.5 18.857 C 10.5 16.017 12 12 12 12 Z M 12 12 C 12 12 7.983 10.5 5.143 10.5 C 2.302 10.5 0 11.172 0 12 C 0 12.828 2.303 13.5 5.143 13.5 C 7.983 13.5 12 12 12 12 Z M 12 12 C 12 12 15.901 10.22 17.909 8.212 C 19.918 6.204 21.071 4.101 20.485 3.515 C 19.899 2.929 17.796 4.082 15.788 6.091 C 13.78 8.099 12 12 12 12 Z M 8.212 6.091 C 10.22 8.099 12 12 12 12 C 12 12 8.099 10.22 6.091 8.212 C 4.082 6.204 2.929 4.1 3.515 3.515 C 4.101 2.929 6.204 4.082 8.212 6.091 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                              svgContentId: 2259763762,
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
                                    "--framer-text-color": "rgb(255, 255, 255)",
                                  },
                                  children: "Celestial",
                                }),
                              }),
                              className: "framer-1ablar2",
                              fonts: ["FS;Satoshi-bold"],
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                t("div", {
                  className: "framer-d07anj",
                  "data-framer-name": "Features",
                  name: "Features",
                  children: [
                    t("div", {
                      className: "framer-g5d0di",
                      children: [
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("h2", {
                              className: "framer-styles-preset-4m6e0d",
                              "data-styles-preset": "Bgl_uNKYX",
                              style: { "--framer-text-color": "rgb(255, 255, 255)" },
                              children: "Everything you need",
                            }),
                          }),
                          className: "framer-140lial",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("p", {
                              className: "framer-styles-preset-sxuwop",
                              "data-styles-preset": "dGJYq65Lz",
                              style: { "--framer-text-color": "rgb(255, 255, 255)" },
                              children:
                                "Enjoy customizable lists, team work tools, and smart tracking all in one place. Set tasks, get reminders, and see your progress simply and quickly.",
                            }),
                          }),
                          className: "framer-1m0k7iw",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                      ],
                    }),
                    t("div", {
                      className: "framer-149y6fu",
                      children: [
                        r(f, {
                          className: "framer-zl324i-container",
                          children: r(k, {
                            aa5hKvvkV: "Leaf",
                            BFuTBK47u:
                              "Enhance your productivity by connecting with your favorite tools, keeping all your essentials in one place.",
                            height: "100%",
                            id: "hLuxnaicL",
                            jFgwazo_q: "rgb(0, 0, 0)",
                            layoutId: "hLuxnaicL",
                            oc_8kOa9a: "Integration ecosystem",
                            OLqpcuIeL: !1,
                            qkbS0bCx8: "Learn more",
                            style: { width: "100%" },
                            UaS05r1yh: "rgb(255, 255, 255)",
                            variant: "Gp4GjxKpI",
                            width: "100%",
                            Y3X4CKI40: !0,
                            ZA2T3dGW4: !1,
                          }),
                        }),
                        r(f, {
                          className: "framer-1s2upx-container",
                          children: r(k, {
                            aa5hKvvkV: "Target",
                            BFuTBK47u:
                              "Define and track your goals, breaking down objectives into achievable tasks to keep your targets in sight.",
                            height: "100%",
                            id: "VahTJ9Vco",
                            jFgwazo_q: "rgb(0, 0, 0)",
                            layoutId: "VahTJ9Vco",
                            oc_8kOa9a: "Goal setting and tracking",
                            OLqpcuIeL: !1,
                            qkbS0bCx8: "Learn more",
                            style: { width: "100%" },
                            UaS05r1yh: "rgb(255, 255, 255)",
                            variant: "Gp4GjxKpI",
                            width: "100%",
                            Y3X4CKI40: !0,
                            ZA2T3dGW4: !1,
                          }),
                        }),
                        r(f, {
                          className: "framer-1ihlzld-container",
                          children: r(k, {
                            aa5hKvvkV: "Lock",
                            BFuTBK47u:
                              "With end-to-end encryption, your data is securely stored and protected from unauthorized access.",
                            height: "100%",
                            id: "rAWUY5Rzi",
                            jFgwazo_q: "rgb(0, 0, 0)",
                            layoutId: "rAWUY5Rzi",
                            oc_8kOa9a: "Secure data encryption",
                            OLqpcuIeL: !1,
                            qkbS0bCx8: "Learn more",
                            style: { width: "100%" },
                            UaS05r1yh: "rgb(255, 255, 255)",
                            variant: "Gp4GjxKpI",
                            width: "100%",
                            Y3X4CKI40: !0,
                            ZA2T3dGW4: !1,
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                t("div", {
                  className: "framer-1j2ishi",
                  "data-framer-name": "Product",
                  id: Wr,
                  name: "Product",
                  ref: q,
                  children: [
                    t("div", {
                      className: "framer-jw8c1w",
                      children: [
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("h2", {
                              className: "framer-styles-preset-4m6e0d",
                              "data-styles-preset": "Bgl_uNKYX",
                              style: { "--framer-text-color": "rgb(255, 255, 255)" },
                              children: "Intuitive interface",
                            }),
                          }),
                          className: "framer-1nx5t56",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("p", {
                              className: "framer-styles-preset-sxuwop",
                              "data-styles-preset": "dGJYq65Lz",
                              style: { "--framer-text-color": "rgb(255, 255, 255)" },
                              children:
                                "Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your successes, one task at a time.",
                            }),
                          }),
                          className: "framer-1jwwgib",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                      ],
                    }),
                    r("div", {
                      className: "framer-1h765w7",
                      "data-framer-name": "Wrapper",
                      name: "Wrapper",
                      children: r(s, {
                        breakpoint: l,
                        overrides: {
                          VHyp2vXPo: {
                            background: {
                              alt: "",
                              fit: "fill",
                              intrinsicHeight: 1414,
                              intrinsicWidth: 2280,
                              pixelHeight: 1414,
                              pixelWidth: 2280,
                              sizes: "min(100vw - 40px, 1200px)",
                              src: "https://framerusercontent.com/images/iZizFJCoHSvGRW3Z7RxzWxHQJDg.png",
                              srcSet:
                                "https://framerusercontent.com/images/iZizFJCoHSvGRW3Z7RxzWxHQJDg.png?scale-down-to=512 512w, https://framerusercontent.com/images/iZizFJCoHSvGRW3Z7RxzWxHQJDg.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/iZizFJCoHSvGRW3Z7RxzWxHQJDg.png?scale-down-to=2048 2048w, https://framerusercontent.com/images/iZizFJCoHSvGRW3Z7RxzWxHQJDg.png 2280w",
                            },
                          },
                        },
                        children: r(L, {
                          __framer__animate: { transition: Sr },
                          __framer__animateOnce: !1,
                          __framer__enter: Qr,
                          __framer__exit: Dr,
                          __framer__styleAppearEffectEnabled: !0,
                          __framer__targets: [{ ref: q, target: "animate" }],
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
                            src: "https://framerusercontent.com/images/iZizFJCoHSvGRW3Z7RxzWxHQJDg.png",
                            srcSet:
                              "https://framerusercontent.com/images/iZizFJCoHSvGRW3Z7RxzWxHQJDg.png?scale-down-to=512 512w, https://framerusercontent.com/images/iZizFJCoHSvGRW3Z7RxzWxHQJDg.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/iZizFJCoHSvGRW3Z7RxzWxHQJDg.png?scale-down-to=2048 2048w, https://framerusercontent.com/images/iZizFJCoHSvGRW3Z7RxzWxHQJDg.png 2280w",
                          },
                          className: "framer-1c8ybpm",
                          "data-border": !0,
                          "data-framer-name": "App_2x",
                          name: "App_2x",
                          transformTemplate: o,
                        }),
                      }),
                    }),
                  ],
                }),
                t("div", {
                  className: "framer-j4jkam",
                  "data-framer-name": "FAQ",
                  name: "FAQ",
                  children: [
                    r(i, {
                      __fromCanvasComponent: !0,
                      children: r(a, {
                        children: r("h2", {
                          className: "framer-styles-preset-4m6e0d",
                          "data-styles-preset": "Bgl_uNKYX",
                          style: { "--framer-text-color": "rgb(255, 255, 255)" },
                          children: "Frequently asked questions",
                        }),
                      }),
                      className: "framer-1l6yacq",
                      verticalAlignment: "top",
                      withExternalLayout: !0,
                    }),
                    t("div", {
                      className: "framer-1ui1dk5",
                      children: [
                        r(f, {
                          className: "framer-am3lcd-container",
                          children: r(u, {
                            CM1C23HdI: "rgb(255, 255, 255)",
                            height: "100%",
                            id: "QqXQQnt3_",
                            layoutId: "QqXQQnt3_",
                            m1wBZJAoM:
                              "We accept all major credit cards, PayPal, and various other payment methods depending on your location. Please contact our support team for more information on accepted payment methods in your region.",
                            style: { width: "100%" },
                            variant: "T5CrfWy_o",
                            vd59XDbg4: "What payment methods do you accept?",
                            width: "100%",
                          }),
                        }),
                        r("div", {
                          className: "framer-qq5a2q",
                          "data-framer-name": "Line Bottom",
                          name: "Line Bottom",
                        }),
                        r(f, {
                          className: "framer-pocmwx-container",
                          children: r(u, {
                            CM1C23HdI: "rgb(255, 255, 255)",
                            height: "100%",
                            id: "RK8rE1CLc",
                            layoutId: "RK8rE1CLc",
                            m1wBZJAoM:
                              "Our pricing is per user, per month. This means you only pay for the number of team members you have on your account. Discounts are available for larger teams and annual subscriptions.",
                            style: { width: "100%" },
                            variant: "yPX8xspWY",
                            vd59XDbg4: "How does the pricing work for teams?",
                            width: "100%",
                          }),
                        }),
                        r("div", {
                          className: "framer-z44lb7",
                          "data-framer-name": "Line Bottom",
                          name: "Line Bottom",
                        }),
                        r(f, {
                          className: "framer-ap5dz6-container",
                          children: r(u, {
                            CM1C23HdI: "rgb(255, 255, 255)",
                            height: "100%",
                            id: "LpYF3F6TJ",
                            layoutId: "LpYF3F6TJ",
                            m1wBZJAoM:
                              "Yes, you can upgrade or downgrade your plan at any time. Changes to your plan will be prorated and reflected in your next billing cycle.",
                            style: { width: "100%" },
                            variant: "yPX8xspWY",
                            vd59XDbg4: "Can I change my plan later?",
                            width: "100%",
                          }),
                        }),
                        r("div", {
                          className: "framer-xggprw",
                          "data-framer-name": "Line Bottom",
                          name: "Line Bottom",
                        }),
                        r(f, {
                          className: "framer-v50y06-container",
                          children: r(u, {
                            CM1C23HdI: "rgb(255, 255, 255)",
                            height: "100%",
                            id: "DRGt1xKTe",
                            layoutId: "DRGt1xKTe",
                            m1wBZJAoM:
                              "Security is our top priority. We use state-of-the-art encryption and comply with the best industry practices to ensure that your data is stored securely and accessed only by authorized users.",
                            style: { width: "100%" },
                            variant: "yPX8xspWY",
                            vd59XDbg4: "Is my data secure?",
                            width: "100%",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                t("div", {
                  className: "framer-ibkr2k",
                  "data-framer-name": "CTA",
                  name: "CTA",
                  children: [
                    t("div", {
                      className: "framer-1dlwscv",
                      children: [
                        r(i, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("h2", {
                              className: "framer-styles-preset-4m6e0d",
                              "data-styles-preset": "Bgl_uNKYX",
                              style: { "--framer-text-color": "rgb(255, 255, 255)" },
                              children: "Get instant access",
                            }),
                          }),
                          className: "framer-1vjy97h",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        r(i, {
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
                                "Celebrate the joy of accomplishment with an app designed to track your progress and motivate your efforts.",
                            }),
                          }),
                          className: "framer-1yif1xr",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        E() &&
                          r(s, {
                            breakpoint: l,
                            overrides: {
                              CXwbxB_Ju: {
                                background: {
                                  alt: "",
                                  fit: "fill",
                                  intrinsicHeight: 1500,
                                  intrinsicWidth: 1500,
                                  loading: "lazy",
                                  pixelHeight: 1500,
                                  pixelWidth: 1500,
                                  sizes: "163px",
                                  src: "https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png",
                                  srcSet:
                                    "https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png?scale-down-to=512 512w, https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png 1500w",
                                },
                              },
                            },
                            children: r(L, {
                              __framer__adjustPosition: !0,
                              __framer__offset: 300,
                              __framer__parallaxTransformEnabled: !0,
                              __framer__speed: 90,
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
                                sizes: "222px",
                                src: "https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png",
                                srcSet:
                                  "https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png?scale-down-to=512 512w, https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/Fp46nb3MuYLCtzfqGUU5HF6VaQ.png 1500w",
                              },
                              className: "framer-1x7xvst hidden-15gyq9a",
                              "data-framer-name": "Shape Icon",
                              name: "Shape Icon",
                              transformTemplate: Cr,
                            }),
                          }),
                        E() &&
                          r(s, {
                            breakpoint: l,
                            overrides: {
                              CXwbxB_Ju: {
                                background: {
                                  alt: "",
                                  fit: "fill",
                                  intrinsicHeight: 1500,
                                  intrinsicWidth: 1500,
                                  loading: "lazy",
                                  pixelHeight: 1500,
                                  pixelWidth: 1500,
                                  sizes: "170.3398px",
                                  src: "https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png",
                                  srcSet:
                                    "https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png?scale-down-to=512 512w, https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png 1500w",
                                },
                              },
                            },
                            children: r(L, {
                              __framer__adjustPosition: !0,
                              __framer__offset: 300,
                              __framer__parallaxTransformEnabled: !0,
                              __framer__speed: 90,
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
                                sizes: "221px",
                                src: "https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png",
                                srcSet:
                                  "https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png?scale-down-to=512 512w, https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/WvYT1SIXywE2VJDWhU6W0BdhjfU.png 1500w",
                              },
                              className: "framer-68o1ks hidden-15gyq9a",
                              "data-framer-name": "Shape Icon",
                              name: "Shape Icon",
                              transformTemplate: Er,
                            }),
                          }),
                      ],
                    }),
                    r(f, {
                      className: "framer-1mbmh0h-container",
                      children: r(s, {
                        breakpoint: l,
                        overrides: {
                          CXwbxB_Ju: { style: { maxWidth: "100%", width: "100%" } },
                          VHyp2vXPo: { layout: "vertical" },
                        },
                        children: r(P, {
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
                          id: "nIvObhywM",
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
                          layoutId: "nIvObhywM",
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
                r("div", {
                  className: "framer-10wxafp",
                  "data-framer-name": "Footer",
                  name: "Footer",
                  children: t("div", {
                    className: "framer-ikla13",
                    "data-border": !0,
                    children: [
                      r(i, {
                        __fromCanvasComponent: !0,
                        children: r(a, {
                          children: r("p", {
                            style: {
                              "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                              "--framer-font-family":
                                '"Satoshi", "Satoshi Placeholder", sans-serif',
                              "--framer-font-size": "13px",
                              "--framer-font-weight": "500",
                              "--framer-letter-spacing": "-0.2px",
                              "--framer-text-alignment": "center",
                              "--framer-text-color": "rgb(255, 255, 255)",
                            },
                            children: "\xA9 2024 Your Company, Inc. All rights reserved.",
                          }),
                        }),
                        className: "framer-10jqxko",
                        fonts: ["FS;Satoshi-medium"],
                        verticalAlignment: "top",
                        withExternalLayout: !0,
                      }),
                      t("div", {
                        className: "framer-l8lfvx",
                        children: [
                          r(x, {
                            href: "x.com/framer",
                            children: r(h.a, {
                              className: "framer-1a7w7jp framer-100nnl8",
                              "data-framer-name": "X",
                              name: "X",
                              whileHover: b,
                              children: r(c, {
                                className: "framer-1mxpfe2",
                                "data-framer-name": "graphic",
                                layout: "position",
                                name: "graphic",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 16.641 5 L 19.095 5 L 13.735 10.93 L 20.041 19 L 15.103 19 L 11.236 14.106 L 6.811 19 L 4.356 19 L 10.09 12.657 L 4.041 5 L 9.103 5 L 12.599 9.474 Z" fill="rgb(255, 255, 255)"></path></svg>',
                                svgContentId: 2583673128,
                                withExternalLayout: !0,
                              }),
                            }),
                          }),
                          r(x, {
                            href: "https://www.instagram.com/framer/",
                            children: r(h.a, {
                              className: "framer-1rwg9i4 framer-100nnl8",
                              "data-framer-name": "Instagram",
                              name: "Instagram",
                              whileHover: b,
                              children: r(c, {
                                className: "framer-apdw8s",
                                "data-framer-name": "Instagram",
                                layout: "position",
                                name: "Instagram",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 4 8.667 C 4 6.089 6.089 4 8.667 4 L 15.333 4 C 17.911 4 20 6.089 20 8.667 L 20 15.333 C 20 17.911 17.911 20 15.333 20 L 8.667 20 C 6.089 20 4 17.911 4 15.333 Z M 15.333 7.333 C 15.322 7.817 15.574 8.268 15.991 8.513 C 16.408 8.758 16.924 8.758 17.341 8.513 C 17.758 8.269 18.01 7.817 17.999 7.334 C 17.983 6.609 17.391 6.03 16.667 6.03 C 15.942 6.03 15.35 6.609 15.333 7.333 Z M 8.667 12 C 8.667 13.841 10.16 15.334 12.001 15.333 C 13.842 15.333 15.334 13.84 15.334 11.999 C 15.334 10.158 13.841 8.666 12 8.666 C 10.159 8.666 8.666 10.159 8.667 12 Z" fill="rgb(255, 255, 255)"></path></svg>',
                                svgContentId: 3367443515,
                                withExternalLayout: !0,
                              }),
                            }),
                          }),
                          r(x, {
                            href: "pinterest.com/framer_app/",
                            children: r(h.a, {
                              className: "framer-eeda9d framer-100nnl8",
                              "data-framer-name": "Pinterest",
                              name: "Pinterest",
                              whileHover: b,
                              children: r(c, {
                                className: "framer-ssxuf7",
                                "data-framer-name": "Pinterest",
                                layout: "position",
                                name: "Pinterest",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 12.001 4 C 7.582 4 4 7.582 4 11.999 C 4 15.276 5.97 18.09 8.789 19.327 C 8.765 18.768 8.784 18.098 8.927 17.491 C 9.082 16.841 9.957 13.131 9.957 13.131 C 9.957 13.131 9.702 12.62 9.702 11.865 C 9.702 10.679 10.389 9.794 11.244 9.794 C 11.973 9.794 12.323 10.341 12.323 10.995 C 12.323 11.726 11.857 12.821 11.618 13.834 C 11.417 14.683 12.043 15.375 12.879 15.375 C 14.396 15.375 15.417 13.428 15.417 11.122 C 15.417 9.369 14.236 8.056 12.088 8.056 C 9.661 8.056 8.15 9.866 8.15 11.887 C 8.15 12.584 8.354 13.076 8.677 13.456 C 8.824 13.631 8.845 13.702 8.791 13.902 C 8.753 14.049 8.665 14.404 8.628 14.544 C 8.575 14.747 8.411 14.819 8.228 14.745 C 7.11 14.288 6.59 13.065 6.59 11.688 C 6.59 9.416 8.507 6.691 12.307 6.691 C 15.362 6.691 17.373 8.901 17.373 11.273 C 17.373 14.412 15.627 16.757 13.055 16.757 C 12.191 16.757 11.379 16.289 11.101 15.759 C 11.101 15.759 10.636 17.603 10.538 17.958 C 10.368 18.574 10.036 19.192 9.733 19.672 C 10.469 19.89 11.233 20 12.001 20 C 16.419 20 20 16.418 20 11.999 C 20 7.582 16.419 4 12.001 4 Z" fill="rgb(255, 255, 255)"></path></svg>',
                                svgContentId: 2053117942,
                                withExternalLayout: !0,
                              }),
                            }),
                          }),
                          r(x, {
                            href: "https://www.linkedin.com/company/framer",
                            children: r(h.a, {
                              className: "framer-1pgabsy framer-100nnl8",
                              "data-framer-name": "LinkedIn",
                              name: "LinkedIn",
                              whileHover: b,
                              children: r(c, {
                                className: "framer-16zl9gm",
                                "data-framer-name": "LinkedIn",
                                layout: "position",
                                name: "LinkedIn",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 4 7 C 4 5.343 5.343 4 7 4 L 17 4 C 18.657 4 20 5.343 20 7 L 20 17 C 20 18.657 18.657 20 17 20 L 7 20 C 5.343 20 4 18.657 4 17 Z M 8.85 17.393 L 8.85 10.169 L 6.434 10.169 L 6.434 17.393 Z M 7.642 9.182 C 8.484 9.182 9.009 8.628 9.009 7.934 C 8.993 7.225 8.484 6.686 7.658 6.686 C 6.831 6.686 6.291 7.225 6.291 7.934 C 6.291 8.628 6.815 9.182 7.626 9.182 Z M 10.187 17.394 C 10.187 17.394 10.187 17.394 10.187 17.393 L 10.187 17.393 Z M 12.604 17.393 L 12.604 13.359 C 12.604 13.143 12.62 12.928 12.683 12.773 C 12.858 12.342 13.256 11.895 13.923 11.895 C 14.798 11.895 15.148 12.557 15.148 13.529 L 15.148 17.393 L 17.564 17.393 L 17.564 13.251 C 17.564 11.032 16.372 9.999 14.782 9.999 C 13.5 9.999 12.925 10.699 12.604 11.192 L 12.604 10.169 L 10.187 10.169 C 10.219 10.844 10.188 17.351 10.187 17.393 Z" fill="rgb(255, 255, 255)"></path></svg>',
                                svgContentId: 3273537083,
                                withExternalLayout: !0,
                              }),
                            }),
                          }),
                          r(x, {
                            href: "https://www.tiktok.com/@framer",
                            children: r(h.a, {
                              className: "framer-3l5kj3 framer-100nnl8",
                              "data-framer-name": "TikTok",
                              name: "TikTok",
                              whileHover: b,
                              children: r(c, {
                                className: "framer-zhb0nu",
                                "data-framer-name": "TikTok",
                                layout: "position",
                                name: "TikTok",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 17.631 7.136 C 17.514 7.077 17.401 7.012 17.29 6.941 C 16.97 6.733 16.676 6.488 16.415 6.211 C 15.763 5.478 15.519 4.734 15.429 4.213 L 15.433 4.213 C 15.358 3.78 15.389 3.501 15.394 3.501 L 12.421 3.501 L 12.421 14.79 C 12.421 14.942 12.421 15.092 12.415 15.24 C 12.415 15.258 12.413 15.275 12.412 15.295 C 12.412 15.303 12.412 15.311 12.41 15.32 L 12.41 15.326 C 12.346 16.149 11.87 16.886 11.14 17.294 C 10.765 17.503 10.342 17.613 9.91 17.613 C 8.526 17.613 7.403 16.503 7.403 15.134 C 7.403 13.764 8.526 12.655 9.91 12.655 C 10.173 12.654 10.433 12.695 10.682 12.775 L 10.686 9.802 C 9.156 9.608 7.614 10.051 6.432 11.024 C 5.919 11.462 5.489 11.983 5.159 12.566 C 5.033 12.779 4.56 13.632 4.503 15.018 C 4.467 15.805 4.707 16.62 4.822 16.956 L 4.822 16.964 C 4.894 17.162 5.173 17.839 5.629 18.409 C 5.996 18.867 6.43 19.269 6.916 19.602 L 6.916 19.595 L 6.923 19.602 C 8.362 20.563 9.958 20.5 9.958 20.5 C 10.234 20.489 11.159 20.5 12.21 20.011 C 13.375 19.468 14.038 18.661 14.038 18.661 C 14.462 18.178 14.799 17.628 15.035 17.034 C 15.304 16.34 15.394 15.507 15.394 15.174 L 15.394 9.184 C 15.43 9.206 15.91 9.518 15.91 9.518 C 15.91 9.518 16.602 9.953 17.681 10.237 C 18.456 10.439 19.499 10.481 19.499 10.481 L 19.499 7.583 C 19.133 7.622 18.391 7.508 17.631 7.136 Z" fill="rgb(255, 255, 255)"></path></svg>',
                                svgContentId: 4042805854,
                                withExternalLayout: !0,
                              }),
                            }),
                          }),
                          r(x, {
                            href: "https://www.youtube.com/channel/UCW5gUZ7lKGrAbLOkHv2xfbw",
                            children: r(h.a, {
                              className: "framer-wx8u2r framer-100nnl8",
                              "data-framer-name": "YouTube",
                              name: "YouTube",
                              whileHover: b,
                              children: r(c, {
                                className: "framer-11oxks",
                                "data-framer-name": "Youtube",
                                layout: "position",
                                name: "Youtube",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
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
                }),
              ],
            }),
            r("div", { className: j(wr, ...Y), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  ee = [
    '.framer-E58rt[data-border="true"]::after, .framer-E58rt [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    `.${J.bodyClassName}-framer-E58rt { background: rgb(0, 0, 0); }`,
    ".framer-E58rt.framer-100nnl8, .framer-E58rt .framer-100nnl8 { display: block; }",
    ".framer-E58rt.framer-1exbyug { align-content: center; align-items: center; background-color: #000000; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; }",
    ".framer-E58rt .framer-lcma6w { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: 46px; justify-content: center; left: 0px; overflow: hidden; padding: 0px 0px 0px 0px; position: fixed; right: 0px; top: 0px; z-index: 10; }",
    ".framer-E58rt .framer-1pjuc9a { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; opacity: 0.8; position: relative; white-space: pre; width: auto; z-index: 2; }",
    ".framer-E58rt .framer-19vmq59-container { flex: none; height: auto; position: relative; width: auto; z-index: 2; }",
    ".framer-E58rt .framer-14w83fj { background: linear-gradient(270deg, #fcd6ff 0%, rgb(41, 216, 255) 26.576576576576578%, rgb(255, 253, 130) 50%, rgb(242, 54, 255) 71.4527027027027%, rgb(252, 214, 255) 100%); flex: none; height: 100%; opacity: 0.4; overflow: hidden; pointer-events: none; position: absolute; right: -1px; top: calc(50.00000000000002% - 100% / 2); width: 100%; z-index: 1; }",
    ".framer-E58rt .framer-15w9v7j-container { flex: none; height: 70px; left: calc(50.00000000000002% - 100% / 2); position: fixed; top: 46px; width: 100%; z-index: 10; }",
    ".framer-E58rt .framer-197izbp { background: linear-gradient(180deg, #000000 15.000000000000002%, rgba(89, 38, 182, 1) 78.64935247747748%, rgb(230, 169, 253) 100%); flex: none; height: 898px; overflow: hidden; position: relative; width: 100%; }",
    ".framer-E58rt .framer-1bo4vrz { background: radial-gradient(33.7% 50% at 50% 0%, #ffffff 0%, rgba(255, 255, 255, 0) 68.44911317567568%); border-bottom-left-radius: 100%; border-bottom-right-radius: 100%; border-top-left-radius: 100%; border-top-right-radius: 100%; bottom: -592px; flex: none; height: 783px; left: calc(50.00000000000002% - 160% / 2); overflow: hidden; position: absolute; width: 160%; will-change: var(--framer-will-change-override, transform); }",
    ".framer-E58rt .framer-1ax6d5t { background: radial-gradient(64.4% 50% at 50% 50%, #000000 77.98599380630633%, rgb(160, 104, 252) 100%); border-bottom-left-radius: 100%; border-bottom-right-radius: 100%; border-top-left-radius: 100%; border-top-right-radius: 100%; bottom: -593px; box-shadow: 0px 0px 250px 0px rgba(230, 169, 251, 0.6); flex: none; height: 783px; left: calc(50.00000000000002% - 160% / 2); overflow: hidden; position: absolute; width: 160%; will-change: var(--framer-will-change-override, transform); }",
    ".framer-E58rt .framer-70mgqz { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 40px; height: min-content; justify-content: center; left: 50%; overflow: visible; padding: 0px 0px 0px 0px; position: absolute; top: 50%; transform: translate(-50%, -50%); width: min-content; }",
    ".framer-E58rt .framer-5v3iq3-container, .framer-E58rt .framer-1xczehv-container { flex: none; height: auto; position: relative; transform: perspective(1200px); width: auto; }",
    ".framer-E58rt .framer-1c7twfw { align-content: center; align-items: center; align-self: stretch; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: auto; }",
    ".framer-E58rt .framer-19j5x41, .framer-E58rt .framer-1ri568a { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; transform: perspective(1200px); white-space: pre; width: auto; }",
    ".framer-E58rt .framer-2gmskv { -webkit-filter: drop-shadow(-10px 20px 10px rgba(0, 0, 0, 0.5)); aspect-ratio: 1 / 1; cursor: grab; filter: drop-shadow(-10px 20px 10px rgba(0, 0, 0, 0.5)); flex: none; height: var(--framer-aspect-ratio-supported, 211px); overflow: visible; position: absolute; right: -170px; top: 43px; transform: rotate(-8deg); width: 211px; z-index: 1; }",
    ".framer-E58rt .framer-zcvspw { -webkit-filter: drop-shadow(10px -19px 10px rgba(0, 0, 0, 0.5)); aspect-ratio: 1 / 1; bottom: -83px; cursor: grab; filter: drop-shadow(10px -19px 10px rgba(0, 0, 0, 0.5)); flex: none; height: var(--framer-aspect-ratio-supported, 211px); left: -160px; overflow: visible; position: absolute; transform: rotate(9deg); width: 211px; z-index: 1; }",
    ".framer-E58rt .framer-13awvk3 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; align-self: stretch; flex: none; height: auto; position: relative; transform: perspective(1200px); white-space: pre-wrap; width: auto; word-break: break-word; word-wrap: break-word; }",
    ".framer-E58rt .framer-8mbxf2 { align-content: center; align-items: center; background-color: #000000; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-1giz6yt { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 480px; opacity: 0.5; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-E58rt .framer-1yylfb2 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 50px; height: min-content; justify-content: center; max-width: 1200px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-77k2i6, .framer-E58rt .framer-1qxnvr4 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; opacity: 0.5; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-E58rt .framer-1q8jwqx, .framer-E58rt .framer-w7kgo6 { flex: none; height: 26px; position: relative; width: 26px; }",
    ".framer-E58rt .framer-1lv8dns, .framer-E58rt .framer-lw2puc, .framer-E58rt .framer-1cd3xbg, .framer-E58rt .framer-9ktlw9, .framer-E58rt .framer-1185fjc, .framer-E58rt .framer-1ablar2 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-E58rt .framer-601rc8, .framer-E58rt .framer-kjmxhi, .framer-E58rt .framer-172hkg1, .framer-E58rt .framer-1bpf6pb { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: min-content; justify-content: center; opacity: 0.5; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-E58rt .framer-1v0g47y { flex: none; height: 22px; position: relative; width: 22px; }",
    ".framer-E58rt .framer-v5pqtt, .framer-E58rt .framer-1fiekaw { flex: none; height: 24px; position: relative; width: 24px; }",
    ".framer-E58rt .framer-d07anj { align-content: center; align-items: center; background-color: #000000; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-g5d0di { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-140lial, .framer-E58rt .framer-1nx5t56, .framer-E58rt .framer-1l6yacq, .framer-E58rt .framer-1vjy97h { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 690px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-E58rt .framer-1m0k7iw { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 510px; opacity: 0.8; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-E58rt .framer-149y6fu { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; max-width: 1200px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-zl324i-container, .framer-E58rt .framer-1s2upx-container, .framer-E58rt .framer-1ihlzld-container { flex: 1 0 0px; height: auto; position: relative; width: 1px; }",
    ".framer-E58rt .framer-1j2ishi { align-content: center; align-items: center; background: linear-gradient(180deg, #000000 0%, rgb(93, 44, 169) 100%); display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 40px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-jw8c1w { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-1jwwgib { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 520px; opacity: 0.8; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-E58rt .framer-1h765w7 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; max-width: 1200px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-1c8ybpm { --border-bottom-width: 1px; --border-color: var(--token-58a904ff-197a-49b3-8356-adaa464e1642, rgba(255, 255, 255, 0.12)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; aspect-ratio: 1.6124469589816124 / 1; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; border-top-left-radius: 10px; border-top-right-radius: 10px; box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.25); flex: none; height: var(--framer-aspect-ratio-supported, 695px); overflow: visible; position: relative; transform: perspective(1200px); width: 100%; }",
    ".framer-E58rt .framer-j4jkam { align-content: center; align-items: center; background: linear-gradient(0deg, #000000 0%, rgb(93, 44, 169) 100%); display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-1ui1dk5 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; max-width: 660px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-am3lcd-container, .framer-E58rt .framer-pocmwx-container, .framer-E58rt .framer-ap5dz6-container, .framer-E58rt .framer-v50y06-container { flex: none; height: auto; position: relative; width: 100%; }",
    ".framer-E58rt .framer-qq5a2q, .framer-E58rt .framer-z44lb7, .framer-E58rt .framer-xggprw { background-color: var(--token-58a904ff-197a-49b3-8356-adaa464e1642, rgba(255, 255, 255, 0.12)); flex: none; height: 1px; overflow: hidden; position: relative; width: 100%; }",
    ".framer-E58rt .framer-ibkr2k { align-content: center; align-items: center; background-color: #000000; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 120px 40px 120px 40px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-1dlwscv { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; max-width: 760px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; z-index: 1; }",
    ".framer-E58rt .framer-1yif1xr { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 420px; opacity: 0.8; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-E58rt .framer-1x7xvst { aspect-ratio: 1 / 1; bottom: -137px; flex: none; height: var(--framer-aspect-ratio-supported, 222px); overflow: visible; position: absolute; right: -136px; transform: rotate(-8deg); width: 222px; z-index: 1; }",
    ".framer-E58rt .framer-68o1ks { aspect-ratio: 1 / 1; bottom: -53px; flex: none; left: -110px; overflow: visible; position: absolute; top: -71px; transform: rotate(9deg); width: var(--framer-aspect-ratio-supported, 241px); z-index: 1; }",
    ".framer-E58rt .framer-1mbmh0h-container { flex: none; height: auto; position: relative; width: 420px; }",
    ".framer-E58rt .framer-10wxafp { align-content: center; align-items: center; background-color: #000000; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 80px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-ikla13 { --border-bottom-width: 0px; --border-color: rgba(255, 255, 255, 0.15); --border-left-width: 0px; --border-right-width: 0px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; max-width: 1600px; overflow: hidden; padding: 40px 20px 40px 20px; position: relative; width: 100%; }",
    ".framer-E58rt .framer-10jqxko { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; opacity: 0.5; position: relative; white-space: pre; width: auto; }",
    ".framer-E58rt .framer-l8lfvx { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 2; }",
    ".framer-E58rt .framer-1a7w7jp { flex: none; height: 24px; opacity: 0.5; overflow: visible; position: relative; text-decoration: none; width: 24px; }",
    ".framer-E58rt .framer-1mxpfe2, .framer-E58rt .framer-apdw8s, .framer-E58rt .framer-ssxuf7, .framer-E58rt .framer-11oxks { flex: none; height: 24px; left: calc(50.00000000000002% - 24px / 2); position: absolute; top: calc(50.00000000000002% - 24px / 2); width: 24px; }",
    ".framer-E58rt .framer-1rwg9i4, .framer-E58rt .framer-eeda9d, .framer-E58rt .framer-1pgabsy, .framer-E58rt .framer-3l5kj3, .framer-E58rt .framer-wx8u2r { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 24px); opacity: 0.5; overflow: visible; position: relative; text-decoration: none; width: 24px; }",
    ".framer-E58rt .framer-16zl9gm { flex: none; height: 24px; position: absolute; right: 0px; top: calc(50.00000000000002% - 24px / 2); width: 24px; }",
    ".framer-E58rt .framer-zhb0nu { flex: none; height: 24px; left: calc(54.166666666666686% - 24px / 2); position: absolute; top: calc(50.00000000000002% - 24px / 2); width: 24px; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-E58rt.framer-1exbyug, .framer-E58rt .framer-lcma6w, .framer-E58rt .framer-70mgqz, .framer-E58rt .framer-1c7twfw, .framer-E58rt .framer-8mbxf2, .framer-E58rt .framer-1yylfb2, .framer-E58rt .framer-77k2i6, .framer-E58rt .framer-601rc8, .framer-E58rt .framer-1qxnvr4, .framer-E58rt .framer-kjmxhi, .framer-E58rt .framer-172hkg1, .framer-E58rt .framer-1bpf6pb, .framer-E58rt .framer-d07anj, .framer-E58rt .framer-g5d0di, .framer-E58rt .framer-149y6fu, .framer-E58rt .framer-1j2ishi, .framer-E58rt .framer-jw8c1w, .framer-E58rt .framer-1h765w7, .framer-E58rt .framer-j4jkam, .framer-E58rt .framer-1ui1dk5, .framer-E58rt .framer-ibkr2k, .framer-E58rt .framer-1dlwscv, .framer-E58rt .framer-10wxafp, .framer-E58rt .framer-l8lfvx { gap: 0px; } .framer-E58rt.framer-1exbyug > * { margin: 0px; margin-bottom: calc(0px / 2); margin-top: calc(0px / 2); } .framer-E58rt.framer-1exbyug > :first-child, .framer-E58rt .framer-70mgqz > :first-child, .framer-E58rt .framer-1c7twfw > :first-child, .framer-E58rt .framer-8mbxf2 > :first-child, .framer-E58rt .framer-d07anj > :first-child, .framer-E58rt .framer-g5d0di > :first-child, .framer-E58rt .framer-1j2ishi > :first-child, .framer-E58rt .framer-jw8c1w > :first-child, .framer-E58rt .framer-1h765w7 > :first-child, .framer-E58rt .framer-j4jkam > :first-child, .framer-E58rt .framer-1ui1dk5 > :first-child, .framer-E58rt .framer-ibkr2k > :first-child, .framer-E58rt .framer-1dlwscv > :first-child, .framer-E58rt .framer-10wxafp > :first-child { margin-top: 0px; } .framer-E58rt.framer-1exbyug > :last-child, .framer-E58rt .framer-70mgqz > :last-child, .framer-E58rt .framer-1c7twfw > :last-child, .framer-E58rt .framer-8mbxf2 > :last-child, .framer-E58rt .framer-d07anj > :last-child, .framer-E58rt .framer-g5d0di > :last-child, .framer-E58rt .framer-1j2ishi > :last-child, .framer-E58rt .framer-jw8c1w > :last-child, .framer-E58rt .framer-1h765w7 > :last-child, .framer-E58rt .framer-j4jkam > :last-child, .framer-E58rt .framer-1ui1dk5 > :last-child, .framer-E58rt .framer-ibkr2k > :last-child, .framer-E58rt .framer-1dlwscv > :last-child, .framer-E58rt .framer-10wxafp > :last-child { margin-bottom: 0px; } .framer-E58rt .framer-lcma6w > *, .framer-E58rt .framer-601rc8 > *, .framer-E58rt .framer-kjmxhi > *, .framer-E58rt .framer-172hkg1 > *, .framer-E58rt .framer-1bpf6pb > * { margin: 0px; margin-left: calc(6px / 2); margin-right: calc(6px / 2); } .framer-E58rt .framer-lcma6w > :first-child, .framer-E58rt .framer-1yylfb2 > :first-child, .framer-E58rt .framer-77k2i6 > :first-child, .framer-E58rt .framer-601rc8 > :first-child, .framer-E58rt .framer-1qxnvr4 > :first-child, .framer-E58rt .framer-kjmxhi > :first-child, .framer-E58rt .framer-172hkg1 > :first-child, .framer-E58rt .framer-1bpf6pb > :first-child, .framer-E58rt .framer-149y6fu > :first-child, .framer-E58rt .framer-l8lfvx > :first-child { margin-left: 0px; } .framer-E58rt .framer-lcma6w > :last-child, .framer-E58rt .framer-1yylfb2 > :last-child, .framer-E58rt .framer-77k2i6 > :last-child, .framer-E58rt .framer-601rc8 > :last-child, .framer-E58rt .framer-1qxnvr4 > :last-child, .framer-E58rt .framer-kjmxhi > :last-child, .framer-E58rt .framer-172hkg1 > :last-child, .framer-E58rt .framer-1bpf6pb > :last-child, .framer-E58rt .framer-149y6fu > :last-child, .framer-E58rt .framer-l8lfvx > :last-child { margin-right: 0px; } .framer-E58rt .framer-70mgqz > *, .framer-E58rt .framer-1j2ishi > * { margin: 0px; margin-bottom: calc(40px / 2); margin-top: calc(40px / 2); } .framer-E58rt .framer-1c7twfw > *, .framer-E58rt .framer-1h765w7 > *, .framer-E58rt .framer-1dlwscv > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-E58rt .framer-8mbxf2 > *, .framer-E58rt .framer-1ui1dk5 > *, .framer-E58rt .framer-ibkr2k > *, .framer-E58rt .framer-10wxafp > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-E58rt .framer-1yylfb2 > * { margin: 0px; margin-left: calc(50px / 2); margin-right: calc(50px / 2); } .framer-E58rt .framer-77k2i6 > *, .framer-E58rt .framer-1qxnvr4 > * { margin: 0px; margin-left: calc(8px / 2); margin-right: calc(8px / 2); } .framer-E58rt .framer-d07anj > *, .framer-E58rt .framer-j4jkam > * { margin: 0px; margin-bottom: calc(60px / 2); margin-top: calc(60px / 2); } .framer-E58rt .framer-g5d0di > *, .framer-E58rt .framer-jw8c1w > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-E58rt .framer-149y6fu > *, .framer-E58rt .framer-l8lfvx > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } }",
    "@media (min-width: 1200px) { .framer-E58rt .hidden-1exbyug { display: none !important; } }",
    `@media (min-width: 810px) and (max-width: 1199px) { .framer-E58rt .hidden-11hy0g5 { display: none !important; } .${J.bodyClassName}-framer-E58rt { background: rgb(0, 0, 0); } .framer-E58rt.framer-1exbyug { width: 810px; } .framer-E58rt .framer-197izbp { height: 760px; } .framer-E58rt .framer-1bo4vrz { height: unset; left: calc(50.00000000000002% - 200% / 2); top: 587px; width: 200%; } .framer-E58rt .framer-1ax6d5t { height: unset; left: calc(50.00000000000002% - 200% / 2); top: 588px; width: 200%; } .framer-E58rt .framer-70mgqz { top: 49%; width: 450px; } .framer-E58rt .framer-1c7twfw, .framer-E58rt .framer-13awvk3 { align-self: unset; width: 100%; } .framer-E58rt .framer-2gmskv { height: var(--framer-aspect-ratio-supported, 163px); right: -130px; top: 40px; width: 163px; } .framer-E58rt .framer-zcvspw { bottom: unset; height: var(--framer-aspect-ratio-supported, 170px); left: -131px; top: 49%; transform: translateY(-50%) rotate(9deg); width: 170px; } .framer-E58rt .framer-1yylfb2 { flex-wrap: wrap; gap: 20px; max-width: 470px; } .framer-E58rt .framer-149y6fu { flex-direction: column; } .framer-E58rt .framer-zl324i-container, .framer-E58rt .framer-1s2upx-container, .framer-E58rt .framer-1ihlzld-container { flex: none; width: auto; } .framer-E58rt .framer-1c8ybpm { height: var(--framer-aspect-ratio-supported, 453px); } .framer-E58rt .framer-1x7xvst { height: unset; right: -130px; top: 40px; width: var(--framer-aspect-ratio-supported, 207px); } .framer-E58rt .framer-68o1ks { bottom: unset; height: var(--framer-aspect-ratio-supported, 170px); left: -131px; width: 170px; } .framer-E58rt .framer-1mbmh0h-container { max-width: 420px; width: 100%; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-E58rt .framer-1yylfb2, .framer-E58rt .framer-149y6fu { gap: 0px; } .framer-E58rt .framer-1yylfb2 > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } .framer-E58rt .framer-1yylfb2 > :first-child { margin-left: 0px; } .framer-E58rt .framer-1yylfb2 > :last-child { margin-right: 0px; } .framer-E58rt .framer-149y6fu > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-E58rt .framer-149y6fu > :first-child { margin-top: 0px; } .framer-E58rt .framer-149y6fu > :last-child { margin-bottom: 0px; } }}`,
    `@media (max-width: 809px) { .framer-E58rt .hidden-15gyq9a { display: none !important; } .${J.bodyClassName}-framer-E58rt { background: rgb(0, 0, 0); } .framer-E58rt.framer-1exbyug { width: 390px; } .framer-E58rt .framer-197izbp { height: 706px; } .framer-E58rt .framer-1bo4vrz, .framer-E58rt .framer-1ax6d5t { left: calc(50.00000000000002% - 432.90322580645164% / 2); width: 433%; } .framer-E58rt .framer-70mgqz { gap: 30px; padding: 0px 20px 0px 20px; width: 100%; } .framer-E58rt .framer-1c7twfw { align-self: unset; width: 100%; } .framer-E58rt .framer-13awvk3 { align-self: unset; max-width: 310px; width: 100%; } .framer-E58rt .framer-8mbxf2, .framer-E58rt .framer-1j2ishi, .framer-E58rt .framer-10wxafp { padding: 40px 20px 40px 20px; } .framer-E58rt .framer-1giz6yt { max-width: 200px; } .framer-E58rt .framer-1yylfb2 { flex-wrap: wrap; gap: 20px; } .framer-E58rt .framer-d07anj { gap: 40px; padding: 40px 20px 40px 20px; } .framer-E58rt .framer-149y6fu { flex-direction: column; } .framer-E58rt .framer-zl324i-container, .framer-E58rt .framer-1s2upx-container, .framer-E58rt .framer-1ihlzld-container { flex: none; width: 100%; } .framer-E58rt .framer-1c8ybpm { height: var(--framer-aspect-ratio-supported, 124px); } .framer-E58rt .framer-1mbmh0h-container { width: 100%; } .framer-E58rt .framer-ikla13 { flex-direction: column; gap: 30px; justify-content: flex-start; } .framer-E58rt .framer-10jqxko { max-width: 170px; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; } .framer-E58rt .framer-l8lfvx { flex-wrap: wrap; gap: 10px; width: 100%; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-E58rt .framer-70mgqz, .framer-E58rt .framer-1yylfb2, .framer-E58rt .framer-d07anj, .framer-E58rt .framer-149y6fu, .framer-E58rt .framer-ikla13, .framer-E58rt .framer-l8lfvx { gap: 0px; } .framer-E58rt .framer-70mgqz > *, .framer-E58rt .framer-ikla13 > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-E58rt .framer-70mgqz > :first-child, .framer-E58rt .framer-d07anj > :first-child, .framer-E58rt .framer-149y6fu > :first-child, .framer-E58rt .framer-ikla13 > :first-child { margin-top: 0px; } .framer-E58rt .framer-70mgqz > :last-child, .framer-E58rt .framer-d07anj > :last-child, .framer-E58rt .framer-149y6fu > :last-child, .framer-E58rt .framer-ikla13 > :last-child { margin-bottom: 0px; } .framer-E58rt .framer-1yylfb2 > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } .framer-E58rt .framer-1yylfb2 > :first-child, .framer-E58rt .framer-l8lfvx > :first-child { margin-left: 0px; } .framer-E58rt .framer-1yylfb2 > :last-child, .framer-E58rt .framer-l8lfvx > :last-child { margin-right: 0px; } .framer-E58rt .framer-d07anj > * { margin: 0px; margin-bottom: calc(40px / 2); margin-top: calc(40px / 2); } .framer-E58rt .framer-149y6fu > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-E58rt .framer-l8lfvx > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } }}`,
    ...or,
    ...gr,
    ...cr,
    ...sr,
  ],
  z = $(re, ee, "framer-E58rt"),
  ke = z;
z.displayName = "Page";
z.defaultProps = { height: 4139, width: 1200 };
ir(z, [
  {
    family: "Switzer",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/YS3VPNVO4B3TOJMEXDGFZQ4TLZGGSRZC.woff2",
    weight: "600",
  },
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
  ...Mr,
  ...Ir,
  ...Rr,
  ...Pr,
  ...Hr,
  ...Zr,
  ...Xr,
  ...nr,
  ...hr,
  ...pr,
  ...lr,
]);
var Le = {
  exports: {
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    default: {
      type: "reactComponent",
      name: "Frameri7Jor1cUs",
      slots: [],
      annotations: {
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"CXwbxB_Ju":{"layout":["fixed","auto"]},"VHyp2vXPo":{"layout":["fixed","auto"]}}}',
        framerContractVersion: "1",
        framerIntrinsicWidth: "1200",
        framerImmutableVariables: "true",
        framerResponsiveScreen: "",
        framerIntrinsicHeight: "4139",
        framerDisplayContentsDiv: "false",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
export { Le as __FramerMetadata__, ke as default };
//# sourceMappingURL=pRuXItxmVBd65VTCviCwc873CE8_Uprj8AhOOeCCLjk.FTQO4AZZ.mjs.map
