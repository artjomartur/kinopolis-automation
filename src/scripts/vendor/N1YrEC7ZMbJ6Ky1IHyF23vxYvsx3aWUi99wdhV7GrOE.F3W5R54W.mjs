import { a as v } from "./chunk-QHBVESDH.mjs";
import { a as p } from "./chunk-FXC2Z23U.mjs";
import "./chunk-APGM2C5T.mjs";
import { a as P, b as q, c as z } from "./chunk-5SAWWLB7.mjs";
import { b as r, c as e } from "./chunk-OO3TPEBQ.mjs";
import {
  K as M,
  V as C,
  Y as w,
  Z,
  _ as S,
  aa as R,
  c as a,
  g as y,
  l as L,
  m as J,
  ma as _,
  o as N,
  ra as m,
  t as i,
  ua as t,
  v as k,
  va as F,
  wa as E,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var T = E(p);
var U = {
  b8JvTBtLK: "(max-width: 809px)",
  CUGfOngqq: "(min-width: 810px) and (max-width: 1199px)",
  SeibED9vk: "(min-width: 1200px)",
};
var j = "framer-J64rr",
  W = {
    b8JvTBtLK: "framer-v-m3fm3r",
    CUGfOngqq: "framer-v-10k0yv7",
    SeibED9vk: "framer-v-1133p9t",
  },
  D = { default: { duration: 0 } },
  sr = v(),
  V = { Desktop: "SeibED9vk", Phone: "b8JvTBtLK", Tablet: "CUGfOngqq" },
  Y = ({ height: u, id: o, width: d, ...s }) => {
    var n, l;
    return {
      ...s,
      variant:
        (l = (n = V[s.variant]) !== null && n !== void 0 ? n : s.variant) !== null && l !== void 0
          ? l
          : "SeibED9vk",
    };
  },
  Q = y(function (u, o) {
    let { activeLocale: d, setLocale: s } = M(),
      { style: n, className: l, layoutId: c, variant: A, ...I } = Y(u);
    J(() => {
      let f = v(void 0, d);
      if (((document.title = f.title || ""), f.viewport)) {
        var g;
        (g = document.querySelector('meta[name="viewport"]')) === null ||
          g === void 0 ||
          g.setAttribute("content", f.viewport);
      }
      if (f.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((x) => x.startsWith("framer-body-"))
            .map((x) => document.body.classList.remove(x)),
          document.body.classList.add(`${f.bodyClassName}-framer-J64rr`),
          () => {
            document.body.classList.remove(`${f.bodyClassName}-framer-J64rr`);
          }
        );
    }, [void 0, d]);
    let [O, X] = _(A, U, !1),
      K = void 0,
      $ = D.default,
      B = N(null),
      G = L(),
      b = [z];
    return (
      S({}),
      r(R.Provider, {
        value: { primaryVariantId: "SeibED9vk", variantClassNames: W },
        children: e(k, {
          id: c ?? G,
          children: [
            r(i.div, {
              ...I,
              className: C(j, ...b, "framer-1133p9t", l),
              "data-border": !0,
              ref: o ?? B,
              style: { ...n },
              children: e("div", {
                className: "framer-q9dgti",
                "data-framer-name": "Wrapper",
                name: "Wrapper",
                children: [
                  r("div", {
                    className: "framer-131745k",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: e("div", {
                      className: "framer-ooierv",
                      "data-framer-name": "Logo Stip Day",
                      name: "Logo Stip Day",
                      children: [
                        r(t, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("p", {
                              className: "framer-styles-preset-1dts917",
                              "data-styles-preset": "hgKudGhZ5",
                              children: "Trusted by the world\u2019s most innovative teams",
                            }),
                          }),
                          className: "framer-1lvabf8",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        e("div", {
                          className: "framer-12ppyge",
                          children: [
                            e("div", {
                              className: "framer-1e39gmt",
                              children: [
                                r(m, {
                                  className: "framer-5l0obr",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss1228411944_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 6.5 L 13 0 L 26 6.5 L 26 19.5 L 13 26 L 13 19.5 L 0 26 L 0 19.5 L 13 13 L 0 6.5 L 0 0 Z M 13 6.5 L 13 19.5 L 26 13 Z" fill="rgb(NaN,NaN,NaN)"></path></g></svg>',
                                  svgContentId: 1228411944,
                                  withExternalLayout: !0,
                                }),
                                r(t, {
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
                                  className: "framer-181qujg",
                                  fonts: ["FS;Satoshi-bold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            e("div", {
                              className: "framer-moj5r1",
                              children: [
                                r(m, {
                                  className: "framer-xho3m5",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss128491260_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 26 C 12.142 26 11.352 25.786 10.63 25.357 C 9.931 24.951 9.366 24.398 8.938 23.698 C 8.531 22.976 8.328 22.186 8.328 21.328 C 8.328 20.245 8.576 19.342 9.073 18.62 C 9.57 17.898 10.337 17.051 11.375 16.081 C 12.142 15.381 12.526 14.715 12.526 14.083 L 12.526 13.474 L 11.917 13.474 C 11.217 13.474 10.258 14.174 9.039 15.573 C 7.843 16.972 6.387 17.672 4.672 17.672 C 3.814 17.672 3.024 17.469 2.302 17.063 C 1.602 16.634 1.038 16.069 0.609 15.37 C 0.203 14.648 0 13.858 0 13 C 0 12.142 0.203 11.364 0.609 10.664 C 1.038 9.942 1.602 9.378 2.302 8.971 C 3.024 8.542 3.814 8.328 4.672 8.328 C 6.365 8.328 7.809 9.017 9.005 10.393 C 10.201 11.77 11.172 12.458 11.917 12.458 L 12.526 12.458 L 12.526 11.917 C 12.526 11.285 12.142 10.619 11.375 9.919 L 10.596 9.208 C 10.032 8.689 9.513 8.069 9.039 7.346 C 8.565 6.602 8.328 5.71 8.328 4.672 C 8.328 3.814 8.531 3.036 8.938 2.336 C 9.366 1.614 9.931 1.049 10.63 0.643 C 11.353 0.214 12.143 0 13 0 C 13.858 0 14.636 0.214 15.336 0.643 C 16.058 1.072 16.622 1.636 17.029 2.336 C 17.457 3.036 17.672 3.814 17.672 4.672 C 17.672 6.365 16.983 7.809 15.607 9.005 C 14.23 10.201 13.542 11.172 13.542 11.917 L 13.542 12.458 L 14.083 12.458 C 14.851 12.458 15.821 11.77 16.995 10.393 C 18.146 9.017 19.59 8.328 21.328 8.328 C 22.186 8.328 22.964 8.543 23.664 8.971 C 24.386 9.378 24.951 9.931 25.357 10.63 C 25.786 11.33 26 12.12 26 13 C 26 13.858 25.786 14.648 25.357 15.37 C 24.951 16.069 24.386 16.634 23.664 17.063 C 22.964 17.469 22.186 17.672 21.328 17.672 C 20.267 17.672 19.353 17.412 18.586 16.893 C 17.841 16.374 17.006 15.618 16.081 14.625 C 15.381 13.858 14.715 13.474 14.083 13.474 L 13.542 13.474 L 13.542 14.083 C 13.542 14.918 14.23 15.889 15.607 16.995 C 16.983 18.101 17.672 19.545 17.672 21.328 C 17.672 22.186 17.457 22.976 17.029 23.698 C 16.622 24.398 16.069 24.951 15.37 25.357 C 14.67 25.786 13.88 26 13 26 Z" fill="rgb(NaN,NaN,NaN)"></path></g></svg>',
                                  svgContentId: 128491260,
                                  withExternalLayout: !0,
                                }),
                                r(t, {
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
                                  className: "framer-iwccgy",
                                  fonts: ["FS;Switzer-bold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            e("div", {
                              className: "framer-1uk4l29",
                              children: [
                                r(m, {
                                  className: "framer-1ewdk98",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22"><g id="ss2093193520_1"><path d="M 0 0 L 22 0 L 22 22 L 0 22 Z" fill="transparent"></path><path d="M 11.043 10.104 C 10.587 4.448 5.852 0 0.079 0 C 0.079 5.747 4.485 10.464 10.104 10.957 C 4.448 11.413 0 16.148 0 21.921 C 5.747 21.921 10.464 17.515 10.957 11.896 C 11.413 17.552 16.148 22 21.921 22 C 21.921 16.253 17.515 11.536 11.896 11.043 C 17.552 10.587 22 5.852 22 0.079 C 16.253 0.079 11.536 4.485 11.043 10.104 Z M 11 11 L 11 11 L 11 11 L 11 11 L 11 11 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                  svgContentId: 2093193520,
                                  withExternalLayout: !0,
                                }),
                                r(t, {
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
                                  className: "framer-r0sr5u",
                                  fonts: ["FS;Chillax-semibold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            r("div", {
                              className: "framer-qfed37",
                              children: r(t, {
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
                                className: "framer-1y56u6a",
                                fonts: ["FS;Panchang-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            }),
                            e("div", {
                              className: "framer-1nuhdbe",
                              children: [
                                r(m, {
                                  className: "framer-7eyf06",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g transform="translate(-0 -0)" id="ss3179953828_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 20.849 C 2.924 28.433 -4.433 21.076 3.151 12 C -4.433 2.924 2.924 -4.433 12 3.151 C 21.075 -4.433 28.433 2.924 20.849 12 C 28.433 21.069 21.075 28.433 12 20.849 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                  svgContentId: 3179953828,
                                  withExternalLayout: !0,
                                }),
                                r(t, {
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
                                  className: "framer-13bkbar",
                                  fonts: ["FS;Chillax-bold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            e("div", {
                              className: "framer-3zmqbo",
                              children: [
                                r(m, {
                                  className: "framer-dfjk7t",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g id="ss2688495123_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 12 C 12 12 13.5 7.983 13.5 5.143 C 13.5 2.302 12.828 0 12 0 C 11.172 0 10.5 2.303 10.5 5.143 C 10.5 7.983 12 12 12 12 Z M 12 12 C 12 12 13.78 15.901 15.788 17.909 C 17.796 19.918 19.899 21.071 20.485 20.485 C 21.071 19.899 19.918 17.796 17.909 15.788 C 15.901 13.78 12 12 12 12 Z M 12 12 C 12 12 16.017 10.5 18.857 10.5 C 21.697 10.5 24 11.172 24 12 C 24 12.828 21.697 13.5 18.857 13.5 C 16.017 13.5 12 12 12 12 Z M 12 12 C 12 12 8.099 13.78 6.091 15.788 C 4.082 17.796 2.929 19.899 3.515 20.485 C 4.101 21.071 6.204 19.918 8.212 17.909 C 10.22 15.901 12 12 12 12 Z M 12 12 C 12.003 12.009 13.5 16.02 13.5 18.857 C 13.5 21.697 12.828 24 12 24 C 11.172 24 10.5 21.697 10.5 18.857 C 10.5 16.017 12 12 12 12 Z M 12 12 C 12 12 7.983 10.5 5.143 10.5 C 2.302 10.5 0 11.172 0 12 C 0 12.828 2.303 13.5 5.143 13.5 C 7.983 13.5 12 12 12 12 Z M 12 12 C 12 12 15.901 10.22 17.909 8.212 C 19.918 6.204 21.071 4.101 20.485 3.515 C 19.899 2.929 17.796 4.082 15.788 6.091 C 13.78 8.099 12 12 12 12 Z M 8.212 6.091 C 10.22 8.099 12 12 12 12 C 12 12 8.099 10.22 6.091 8.212 C 4.082 6.204 2.929 4.1 3.515 3.515 C 4.101 2.929 6.204 4.082 8.212 6.091 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                  svgContentId: 2688495123,
                                  withExternalLayout: !0,
                                }),
                                r(t, {
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
                                  className: "framer-gfcj9z",
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
                  }),
                  r("div", {
                    className: "framer-1djitif",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: e("div", {
                      className: "framer-14r7t85",
                      "data-framer-name": "Logo Stip Night",
                      name: "Logo Stip Night",
                      children: [
                        r(t, {
                          __fromCanvasComponent: !0,
                          children: r(a, {
                            children: r("p", {
                              className: "framer-styles-preset-1dts917",
                              "data-styles-preset": "hgKudGhZ5",
                              style: { "--framer-text-color": "rgb(255, 255, 255)" },
                              children: "Trusted by the world\u2019s most innovative teams",
                            }),
                          }),
                          className: "framer-1rv52td",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        e("div", {
                          className: "framer-12t2xpv",
                          children: [
                            e("div", {
                              className: "framer-g9ffje",
                              children: [
                                r(m, {
                                  className: "framer-18o4d7t",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss130635346_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 6.5 L 13 0 L 26 6.5 L 26 19.5 L 13 26 L 13 19.5 L 0 26 L 0 19.5 L 13 13 L 0 6.5 L 0 0 Z M 13 6.5 L 13 19.5 L 26 13 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                  svgContentId: 130635346,
                                  withExternalLayout: !0,
                                }),
                                r(t, {
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
                                  className: "framer-caj1ol",
                                  fonts: ["FS;Satoshi-bold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            e("div", {
                              className: "framer-1xrfft4",
                              children: [
                                r(m, {
                                  className: "framer-1uj19kw",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss2103996054_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 26 C 12.142 26 11.352 25.786 10.63 25.357 C 9.931 24.951 9.366 24.398 8.938 23.698 C 8.531 22.976 8.328 22.186 8.328 21.328 C 8.328 20.245 8.576 19.342 9.073 18.62 C 9.57 17.898 10.337 17.051 11.375 16.081 C 12.142 15.381 12.526 14.715 12.526 14.083 L 12.526 13.474 L 11.917 13.474 C 11.217 13.474 10.258 14.174 9.039 15.573 C 7.843 16.972 6.387 17.672 4.672 17.672 C 3.814 17.672 3.024 17.469 2.302 17.063 C 1.602 16.634 1.038 16.069 0.609 15.37 C 0.203 14.648 0 13.858 0 13 C 0 12.142 0.203 11.364 0.609 10.664 C 1.038 9.942 1.602 9.378 2.302 8.971 C 3.024 8.542 3.814 8.328 4.672 8.328 C 6.365 8.328 7.809 9.017 9.005 10.393 C 10.201 11.77 11.172 12.458 11.917 12.458 L 12.526 12.458 L 12.526 11.917 C 12.526 11.285 12.142 10.619 11.375 9.919 L 10.596 9.208 C 10.032 8.689 9.513 8.069 9.039 7.346 C 8.565 6.602 8.328 5.71 8.328 4.672 C 8.328 3.814 8.531 3.036 8.938 2.336 C 9.366 1.614 9.931 1.049 10.63 0.643 C 11.353 0.214 12.143 0 13 0 C 13.858 0 14.636 0.214 15.336 0.643 C 16.058 1.072 16.622 1.636 17.029 2.336 C 17.457 3.036 17.672 3.814 17.672 4.672 C 17.672 6.365 16.983 7.809 15.607 9.005 C 14.23 10.201 13.542 11.172 13.542 11.917 L 13.542 12.458 L 14.083 12.458 C 14.851 12.458 15.821 11.77 16.995 10.393 C 18.146 9.017 19.59 8.328 21.328 8.328 C 22.186 8.328 22.964 8.543 23.664 8.971 C 24.386 9.378 24.951 9.931 25.357 10.63 C 25.786 11.33 26 12.12 26 13 C 26 13.858 25.786 14.648 25.357 15.37 C 24.951 16.069 24.386 16.634 23.664 17.063 C 22.964 17.469 22.186 17.672 21.328 17.672 C 20.267 17.672 19.353 17.412 18.586 16.893 C 17.841 16.374 17.006 15.618 16.081 14.625 C 15.381 13.858 14.715 13.474 14.083 13.474 L 13.542 13.474 L 13.542 14.083 C 13.542 14.918 14.23 15.889 15.607 16.995 C 16.983 18.101 17.672 19.545 17.672 21.328 C 17.672 22.186 17.457 22.976 17.029 23.698 C 16.622 24.398 16.069 24.951 15.37 25.357 C 14.67 25.786 13.88 26 13 26 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                  svgContentId: 2103996054,
                                  withExternalLayout: !0,
                                }),
                                r(t, {
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
                                  className: "framer-1kudk7w",
                                  fonts: ["FS;Switzer-bold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            e("div", {
                              className: "framer-18g39dx",
                              children: [
                                r(m, {
                                  className: "framer-17gibjv",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22"><g id="ss3274348696_1"><path d="M 0 0 L 22 0 L 22 22 L 0 22 Z" fill="transparent"></path><path d="M 11.043 10.104 C 10.587 4.448 5.852 0 0.079 0 C 0.079 5.747 4.485 10.464 10.104 10.957 C 4.448 11.413 0 16.148 0 21.921 C 5.747 21.921 10.464 17.515 10.957 11.896 C 11.413 17.552 16.148 22 21.921 22 C 21.921 16.253 17.515 11.536 11.896 11.043 C 17.552 10.587 22 5.852 22 0.079 C 16.253 0.079 11.536 4.485 11.043 10.104 Z M 11 11 L 11 11 L 11 11 L 11 11 L 11 11 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                  svgContentId: 3274348696,
                                  withExternalLayout: !0,
                                }),
                                r(t, {
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
                                  className: "framer-s8599b",
                                  fonts: ["FS;Chillax-semibold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            r("div", {
                              className: "framer-1o6m4gy",
                              children: r(t, {
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
                                className: "framer-1dfuca5",
                                fonts: ["FS;Panchang-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            }),
                            e("div", {
                              className: "framer-1v9yhnl",
                              children: [
                                r(m, {
                                  className: "framer-tuqb69",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g transform="translate(-0 -0)" id="ss3193510824_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 20.849 C 2.924 28.433 -4.433 21.076 3.151 12 C -4.433 2.924 2.924 -4.433 12 3.151 C 21.075 -4.433 28.433 2.924 20.849 12 C 28.433 21.069 21.075 28.433 12 20.849 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                  svgContentId: 3193510824,
                                  withExternalLayout: !0,
                                }),
                                r(t, {
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
                                  className: "framer-1l1kst0",
                                  fonts: ["FS;Chillax-bold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                            e("div", {
                              className: "framer-1wmtd0a",
                              children: [
                                r(m, {
                                  className: "framer-9l53iu",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g id="ss2259763762_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 12 C 12 12 13.5 7.983 13.5 5.143 C 13.5 2.302 12.828 0 12 0 C 11.172 0 10.5 2.303 10.5 5.143 C 10.5 7.983 12 12 12 12 Z M 12 12 C 12 12 13.78 15.901 15.788 17.909 C 17.796 19.918 19.899 21.071 20.485 20.485 C 21.071 19.899 19.918 17.796 17.909 15.788 C 15.901 13.78 12 12 12 12 Z M 12 12 C 12 12 16.017 10.5 18.857 10.5 C 21.697 10.5 24 11.172 24 12 C 24 12.828 21.697 13.5 18.857 13.5 C 16.017 13.5 12 12 12 12 Z M 12 12 C 12 12 8.099 13.78 6.091 15.788 C 4.082 17.796 2.929 19.899 3.515 20.485 C 4.101 21.071 6.204 19.918 8.212 17.909 C 10.22 15.901 12 12 12 12 Z M 12 12 C 12.003 12.009 13.5 16.02 13.5 18.857 C 13.5 21.697 12.828 24 12 24 C 11.172 24 10.5 21.697 10.5 18.857 C 10.5 16.017 12 12 12 12 Z M 12 12 C 12 12 7.983 10.5 5.143 10.5 C 2.302 10.5 0 11.172 0 12 C 0 12.828 2.303 13.5 5.143 13.5 C 7.983 13.5 12 12 12 12 Z M 12 12 C 12 12 15.901 10.22 17.909 8.212 C 19.918 6.204 21.071 4.101 20.485 3.515 C 19.899 2.929 17.796 4.082 15.788 6.091 C 13.78 8.099 12 12 12 12 Z M 8.212 6.091 C 10.22 8.099 12 12 12 12 C 12 12 8.099 10.22 6.091 8.212 C 4.082 6.204 2.929 4.1 3.515 3.515 C 4.101 2.929 6.204 4.082 8.212 6.091 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                  svgContentId: 2259763762,
                                  withExternalLayout: !0,
                                }),
                                r(t, {
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
                                  className: "framer-16ynzut",
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
                  }),
                  r("div", {
                    className: "framer-14zfwn4",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: r("div", {
                      className: "framer-glfxx4",
                      "data-framer-name": "Logo Ticker Day",
                      name: "Logo Ticker Day",
                      children: r(w, {
                        className: "framer-ej1q8m-container",
                        children: r(p, {
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
                          id: "cFiMkRa10",
                          layoutId: "cFiMkRa10",
                          padding: 0,
                          paddingBottom: 0,
                          paddingLeft: 0,
                          paddingPerSide: !1,
                          paddingRight: 0,
                          paddingTop: 0,
                          sizingOptions: { heightType: !0, widthType: !0 },
                          slots: [
                            e(i.div, {
                              className: "framer-1k9d4ov",
                              "data-framer-name": "Logo Day",
                              name: "Logo Day",
                              children: [
                                e(i.div, {
                                  className: "framer-i8u3rw",
                                  children: [
                                    r(m, {
                                      className: "framer-na2tu7",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss1475588813_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 6.5 L 13 0 L 26 6.5 L 26 19.5 L 13 26 L 13 19.5 L 0 26 L 0 19.5 L 13 13 L 0 6.5 L 0 0 Z M 13 6.5 L 13 19.5 L 26 13 Z" fill="rgb(NaN,NaN,NaN)"></path></g></svg>',
                                      svgContentId: 1475588813,
                                      withExternalLayout: !0,
                                    }),
                                    r(t, {
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
                                      className: "framer-1pzz0fa",
                                      fonts: ["FS;Satoshi-bold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                e(i.div, {
                                  className: "framer-1r1qvh1",
                                  children: [
                                    r(m, {
                                      className: "framer-o1oi1g",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss1944354112_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 26 C 12.142 26 11.352 25.786 10.63 25.357 C 9.931 24.951 9.366 24.398 8.938 23.698 C 8.531 22.976 8.328 22.186 8.328 21.328 C 8.328 20.245 8.576 19.342 9.073 18.62 C 9.57 17.898 10.337 17.051 11.375 16.081 C 12.142 15.381 12.526 14.715 12.526 14.083 L 12.526 13.474 L 11.917 13.474 C 11.217 13.474 10.258 14.174 9.039 15.573 C 7.843 16.972 6.387 17.672 4.672 17.672 C 3.814 17.672 3.024 17.469 2.302 17.063 C 1.602 16.634 1.038 16.069 0.609 15.37 C 0.203 14.648 0 13.858 0 13 C 0 12.142 0.203 11.364 0.609 10.664 C 1.038 9.942 1.602 9.378 2.302 8.971 C 3.024 8.542 3.814 8.328 4.672 8.328 C 6.365 8.328 7.809 9.017 9.005 10.393 C 10.201 11.77 11.172 12.458 11.917 12.458 L 12.526 12.458 L 12.526 11.917 C 12.526 11.285 12.142 10.619 11.375 9.919 L 10.596 9.208 C 10.032 8.689 9.513 8.069 9.039 7.346 C 8.565 6.602 8.328 5.71 8.328 4.672 C 8.328 3.814 8.531 3.036 8.938 2.336 C 9.366 1.614 9.931 1.049 10.63 0.643 C 11.353 0.214 12.143 0 13 0 C 13.858 0 14.636 0.214 15.336 0.643 C 16.058 1.072 16.622 1.636 17.029 2.336 C 17.457 3.036 17.672 3.814 17.672 4.672 C 17.672 6.365 16.983 7.809 15.607 9.005 C 14.23 10.201 13.542 11.172 13.542 11.917 L 13.542 12.458 L 14.083 12.458 C 14.851 12.458 15.821 11.77 16.995 10.393 C 18.146 9.017 19.59 8.328 21.328 8.328 C 22.186 8.328 22.964 8.543 23.664 8.971 C 24.386 9.378 24.951 9.931 25.357 10.63 C 25.786 11.33 26 12.12 26 13 C 26 13.858 25.786 14.648 25.357 15.37 C 24.951 16.069 24.386 16.634 23.664 17.063 C 22.964 17.469 22.186 17.672 21.328 17.672 C 20.267 17.672 19.353 17.412 18.586 16.893 C 17.841 16.374 17.006 15.618 16.081 14.625 C 15.381 13.858 14.715 13.474 14.083 13.474 L 13.542 13.474 L 13.542 14.083 C 13.542 14.918 14.23 15.889 15.607 16.995 C 16.983 18.101 17.672 19.545 17.672 21.328 C 17.672 22.186 17.457 22.976 17.029 23.698 C 16.622 24.398 16.069 24.951 15.37 25.357 C 14.67 25.786 13.88 26 13 26 Z" fill="rgb(NaN,NaN,NaN)"></path></g></svg>',
                                      svgContentId: 1944354112,
                                      withExternalLayout: !0,
                                    }),
                                    r(t, {
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
                                      className: "framer-ht2hzh",
                                      fonts: ["FS;Switzer-bold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                e(i.div, {
                                  className: "framer-1ns2ist",
                                  children: [
                                    r(m, {
                                      className: "framer-bwu4y4",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22"><g id="ss3557942534_1"><path d="M 0 0 L 22 0 L 22 22 L 0 22 Z" fill="transparent"></path><path d="M 11.043 10.104 C 10.587 4.448 5.852 0 0.079 0 C 0.079 5.747 4.485 10.464 10.104 10.957 C 4.448 11.413 0 16.148 0 21.921 C 5.747 21.921 10.464 17.515 10.957 11.896 C 11.413 17.552 16.148 22 21.921 22 C 21.921 16.253 17.515 11.536 11.896 11.043 C 17.552 10.587 22 5.852 22 0.079 C 16.253 0.079 11.536 4.485 11.043 10.104 Z M 11 11 L 11 11 L 11 11 L 11 11 L 11 11 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                      svgContentId: 3557942534,
                                      withExternalLayout: !0,
                                    }),
                                    r(t, {
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
                                      className: "framer-bezgxs",
                                      fonts: ["FS;Chillax-semibold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                r(i.div, {
                                  className: "framer-1eu6t60",
                                  children: r(t, {
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
                                    className: "framer-sg0buz",
                                    fonts: ["FS;Panchang-bold"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                }),
                                e(i.div, {
                                  className: "framer-17ejys3",
                                  children: [
                                    r(m, {
                                      className: "framer-1lmssit",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g transform="translate(-0 -0)" id="ss2707685231_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 20.849 C 2.924 28.433 -4.433 21.076 3.151 12 C -4.433 2.924 2.924 -4.433 12 3.151 C 21.075 -4.433 28.433 2.924 20.849 12 C 28.433 21.069 21.075 28.433 12 20.849 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                      svgContentId: 2707685231,
                                      withExternalLayout: !0,
                                    }),
                                    r(t, {
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
                                      className: "framer-1u689mo",
                                      fonts: ["FS;Chillax-bold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                e(i.div, {
                                  className: "framer-xxmsaz",
                                  children: [
                                    r(m, {
                                      className: "framer-i7jnhi",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g id="ss3193219635_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 12 C 12 12 13.5 7.983 13.5 5.143 C 13.5 2.302 12.828 0 12 0 C 11.172 0 10.5 2.303 10.5 5.143 C 10.5 7.983 12 12 12 12 Z M 12 12 C 12 12 13.78 15.901 15.788 17.909 C 17.796 19.918 19.899 21.071 20.485 20.485 C 21.071 19.899 19.918 17.796 17.909 15.788 C 15.901 13.78 12 12 12 12 Z M 12 12 C 12 12 16.017 10.5 18.857 10.5 C 21.697 10.5 24 11.172 24 12 C 24 12.828 21.697 13.5 18.857 13.5 C 16.017 13.5 12 12 12 12 Z M 12 12 C 12 12 8.099 13.78 6.091 15.788 C 4.082 17.796 2.929 19.899 3.515 20.485 C 4.101 21.071 6.204 19.918 8.212 17.909 C 10.22 15.901 12 12 12 12 Z M 12 12 C 12.003 12.009 13.5 16.02 13.5 18.857 C 13.5 21.697 12.828 24 12 24 C 11.172 24 10.5 21.697 10.5 18.857 C 10.5 16.017 12 12 12 12 Z M 12 12 C 12 12 7.983 10.5 5.143 10.5 C 2.302 10.5 0 11.172 0 12 C 0 12.828 2.303 13.5 5.143 13.5 C 7.983 13.5 12 12 12 12 Z M 12 12 C 12 12 15.901 10.22 17.909 8.212 C 19.918 6.204 21.071 4.101 20.485 3.515 C 19.899 2.929 17.796 4.082 15.788 6.091 C 13.78 8.099 12 12 12 12 Z M 8.212 6.091 C 10.22 8.099 12 12 12 12 C 12 12 8.099 10.22 6.091 8.212 C 4.082 6.204 2.929 4.1 3.515 3.515 C 4.101 2.929 6.204 4.082 8.212 6.091 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                      svgContentId: 3193219635,
                                      withExternalLayout: !0,
                                    }),
                                    r(t, {
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
                                      className: "framer-155j1gm",
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
                  }),
                  r("div", {
                    className: "framer-qmqm4l",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: r("div", {
                      className: "framer-11g3gcb",
                      "data-framer-name": "Logo Ticker Night",
                      name: "Logo Ticker Night",
                      children: r(w, {
                        className: "framer-z6eoms-container",
                        children: r(p, {
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
                          id: "I1LZWPJWf",
                          layoutId: "I1LZWPJWf",
                          padding: 0,
                          paddingBottom: 0,
                          paddingLeft: 0,
                          paddingPerSide: !1,
                          paddingRight: 0,
                          paddingTop: 0,
                          sizingOptions: { heightType: !0, widthType: !0 },
                          slots: [
                            e(i.div, {
                              className: "framer-k2tyrl",
                              "data-framer-name": "Logo Night",
                              name: "Logo Night",
                              children: [
                                e(i.div, {
                                  className: "framer-fm5ovx",
                                  children: [
                                    r(m, {
                                      className: "framer-t22k3l",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss3145335152_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 6.5 L 13 0 L 26 6.5 L 26 19.5 L 13 26 L 13 19.5 L 0 26 L 0 19.5 L 13 13 L 0 6.5 L 0 0 Z M 13 6.5 L 13 19.5 L 26 13 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                      svgContentId: 3145335152,
                                      withExternalLayout: !0,
                                    }),
                                    r(t, {
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
                                      className: "framer-13iq5uk",
                                      fonts: ["FS;Satoshi-bold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                e(i.div, {
                                  className: "framer-17mcxnz",
                                  children: [
                                    r(m, {
                                      className: "framer-2sr5tl",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss884649816_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 26 C 12.142 26 11.352 25.786 10.63 25.357 C 9.931 24.951 9.366 24.398 8.938 23.698 C 8.531 22.976 8.328 22.186 8.328 21.328 C 8.328 20.245 8.576 19.342 9.073 18.62 C 9.57 17.898 10.337 17.051 11.375 16.081 C 12.142 15.381 12.526 14.715 12.526 14.083 L 12.526 13.474 L 11.917 13.474 C 11.217 13.474 10.258 14.174 9.039 15.573 C 7.843 16.972 6.387 17.672 4.672 17.672 C 3.814 17.672 3.024 17.469 2.302 17.063 C 1.602 16.634 1.038 16.069 0.609 15.37 C 0.203 14.648 0 13.858 0 13 C 0 12.142 0.203 11.364 0.609 10.664 C 1.038 9.942 1.602 9.378 2.302 8.971 C 3.024 8.542 3.814 8.328 4.672 8.328 C 6.365 8.328 7.809 9.017 9.005 10.393 C 10.201 11.77 11.172 12.458 11.917 12.458 L 12.526 12.458 L 12.526 11.917 C 12.526 11.285 12.142 10.619 11.375 9.919 L 10.596 9.208 C 10.032 8.689 9.513 8.069 9.039 7.346 C 8.565 6.602 8.328 5.71 8.328 4.672 C 8.328 3.814 8.531 3.036 8.938 2.336 C 9.366 1.614 9.931 1.049 10.63 0.643 C 11.353 0.214 12.143 0 13 0 C 13.858 0 14.636 0.214 15.336 0.643 C 16.058 1.072 16.622 1.636 17.029 2.336 C 17.457 3.036 17.672 3.814 17.672 4.672 C 17.672 6.365 16.983 7.809 15.607 9.005 C 14.23 10.201 13.542 11.172 13.542 11.917 L 13.542 12.458 L 14.083 12.458 C 14.851 12.458 15.821 11.77 16.995 10.393 C 18.146 9.017 19.59 8.328 21.328 8.328 C 22.186 8.328 22.964 8.543 23.664 8.971 C 24.386 9.378 24.951 9.931 25.357 10.63 C 25.786 11.33 26 12.12 26 13 C 26 13.858 25.786 14.648 25.357 15.37 C 24.951 16.069 24.386 16.634 23.664 17.063 C 22.964 17.469 22.186 17.672 21.328 17.672 C 20.267 17.672 19.353 17.412 18.586 16.893 C 17.841 16.374 17.006 15.618 16.081 14.625 C 15.381 13.858 14.715 13.474 14.083 13.474 L 13.542 13.474 L 13.542 14.083 C 13.542 14.918 14.23 15.889 15.607 16.995 C 16.983 18.101 17.672 19.545 17.672 21.328 C 17.672 22.186 17.457 22.976 17.029 23.698 C 16.622 24.398 16.069 24.951 15.37 25.357 C 14.67 25.786 13.88 26 13 26 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                      svgContentId: 884649816,
                                      withExternalLayout: !0,
                                    }),
                                    r(t, {
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
                                      className: "framer-fsyfqm",
                                      fonts: ["FS;Switzer-bold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                e(i.div, {
                                  className: "framer-kn7vgn",
                                  children: [
                                    r(m, {
                                      className: "framer-32vt4f",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22"><g id="ss3359952632_1"><path d="M 0 0 L 22 0 L 22 22 L 0 22 Z" fill="transparent"></path><path d="M 11.043 10.104 C 10.587 4.448 5.852 0 0.079 0 C 0.079 5.747 4.485 10.464 10.104 10.957 C 4.448 11.413 0 16.148 0 21.921 C 5.747 21.921 10.464 17.515 10.957 11.896 C 11.413 17.552 16.148 22 21.921 22 C 21.921 16.253 17.515 11.536 11.896 11.043 C 17.552 10.587 22 5.852 22 0.079 C 16.253 0.079 11.536 4.485 11.043 10.104 Z M 11 11 L 11 11 L 11 11 L 11 11 L 11 11 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                      svgContentId: 3359952632,
                                      withExternalLayout: !0,
                                    }),
                                    r(t, {
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
                                      className: "framer-13h1852",
                                      fonts: ["FS;Chillax-semibold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                r(i.div, {
                                  className: "framer-elxbti",
                                  children: r(t, {
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
                                    className: "framer-168hmew",
                                    fonts: ["FS;Panchang-bold"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                }),
                                e(i.div, {
                                  className: "framer-v1605t",
                                  children: [
                                    r(m, {
                                      className: "framer-1j3v7rt",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g transform="translate(-0 -0)" id="ss2057356817_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 20.849 C 2.924 28.433 -4.433 21.076 3.151 12 C -4.433 2.924 2.924 -4.433 12 3.151 C 21.075 -4.433 28.433 2.924 20.849 12 C 28.433 21.069 21.075 28.433 12 20.849 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                      svgContentId: 2057356817,
                                      withExternalLayout: !0,
                                    }),
                                    r(t, {
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
                                      className: "framer-2xnd9y",
                                      fonts: ["FS;Chillax-bold"],
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                e(i.div, {
                                  className: "framer-fotgvi",
                                  children: [
                                    r(m, {
                                      className: "framer-1e4o9fq",
                                      "data-framer-name": "graphic",
                                      layout: "position",
                                      name: "graphic",
                                      opacity: 1,
                                      svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g id="ss1799580062_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 12 C 12 12 13.5 7.983 13.5 5.143 C 13.5 2.302 12.828 0 12 0 C 11.172 0 10.5 2.303 10.5 5.143 C 10.5 7.983 12 12 12 12 Z M 12 12 C 12 12 13.78 15.901 15.788 17.909 C 17.796 19.918 19.899 21.071 20.485 20.485 C 21.071 19.899 19.918 17.796 17.909 15.788 C 15.901 13.78 12 12 12 12 Z M 12 12 C 12 12 16.017 10.5 18.857 10.5 C 21.697 10.5 24 11.172 24 12 C 24 12.828 21.697 13.5 18.857 13.5 C 16.017 13.5 12 12 12 12 Z M 12 12 C 12 12 8.099 13.78 6.091 15.788 C 4.082 17.796 2.929 19.899 3.515 20.485 C 4.101 21.071 6.204 19.918 8.212 17.909 C 10.22 15.901 12 12 12 12 Z M 12 12 C 12.003 12.009 13.5 16.02 13.5 18.857 C 13.5 21.697 12.828 24 12 24 C 11.172 24 10.5 21.697 10.5 18.857 C 10.5 16.017 12 12 12 12 Z M 12 12 C 12 12 7.983 10.5 5.143 10.5 C 2.302 10.5 0 11.172 0 12 C 0 12.828 2.303 13.5 5.143 13.5 C 7.983 13.5 12 12 12 12 Z M 12 12 C 12 12 15.901 10.22 17.909 8.212 C 19.918 6.204 21.071 4.101 20.485 3.515 C 19.899 2.929 17.796 4.082 15.788 6.091 C 13.78 8.099 12 12 12 12 Z M 8.212 6.091 C 10.22 8.099 12 12 12 12 C 12 12 8.099 10.22 6.091 8.212 C 4.082 6.204 2.929 4.1 3.515 3.515 C 4.101 2.929 6.204 4.082 8.212 6.091 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                      svgContentId: 1799580062,
                                      withExternalLayout: !0,
                                    }),
                                    r(t, {
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
                                      className: "framer-mo8zem",
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
                  }),
                  r("div", {
                    className: "framer-ae1dqx",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: r("div", {
                      className: "framer-qj2a9r",
                      "data-framer-name": "Logo Grid Day",
                      name: "Logo Grid Day",
                      children: e("div", {
                        className: "framer-1sdexlf",
                        children: [
                          e("div", {
                            className: "framer-1jon22b",
                            children: [
                              r(m, {
                                className: "framer-xqut9p",
                                "data-framer-name": "graphic",
                                layout: "position",
                                name: "graphic",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss1228411944_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 6.5 L 13 0 L 26 6.5 L 26 19.5 L 13 26 L 13 19.5 L 0 26 L 0 19.5 L 13 13 L 0 6.5 L 0 0 Z M 13 6.5 L 13 19.5 L 26 13 Z" fill="rgb(NaN,NaN,NaN)"></path></g></svg>',
                                svgContentId: 1228411944,
                                withExternalLayout: !0,
                              }),
                              r(t, {
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
                                className: "framer-17uyzgz",
                                fonts: ["FS;Satoshi-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                          e("div", {
                            className: "framer-7fgawr",
                            children: [
                              r(m, {
                                className: "framer-cq8ezb",
                                "data-framer-name": "graphic",
                                layout: "position",
                                name: "graphic",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss128491260_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 26 C 12.142 26 11.352 25.786 10.63 25.357 C 9.931 24.951 9.366 24.398 8.938 23.698 C 8.531 22.976 8.328 22.186 8.328 21.328 C 8.328 20.245 8.576 19.342 9.073 18.62 C 9.57 17.898 10.337 17.051 11.375 16.081 C 12.142 15.381 12.526 14.715 12.526 14.083 L 12.526 13.474 L 11.917 13.474 C 11.217 13.474 10.258 14.174 9.039 15.573 C 7.843 16.972 6.387 17.672 4.672 17.672 C 3.814 17.672 3.024 17.469 2.302 17.063 C 1.602 16.634 1.038 16.069 0.609 15.37 C 0.203 14.648 0 13.858 0 13 C 0 12.142 0.203 11.364 0.609 10.664 C 1.038 9.942 1.602 9.378 2.302 8.971 C 3.024 8.542 3.814 8.328 4.672 8.328 C 6.365 8.328 7.809 9.017 9.005 10.393 C 10.201 11.77 11.172 12.458 11.917 12.458 L 12.526 12.458 L 12.526 11.917 C 12.526 11.285 12.142 10.619 11.375 9.919 L 10.596 9.208 C 10.032 8.689 9.513 8.069 9.039 7.346 C 8.565 6.602 8.328 5.71 8.328 4.672 C 8.328 3.814 8.531 3.036 8.938 2.336 C 9.366 1.614 9.931 1.049 10.63 0.643 C 11.353 0.214 12.143 0 13 0 C 13.858 0 14.636 0.214 15.336 0.643 C 16.058 1.072 16.622 1.636 17.029 2.336 C 17.457 3.036 17.672 3.814 17.672 4.672 C 17.672 6.365 16.983 7.809 15.607 9.005 C 14.23 10.201 13.542 11.172 13.542 11.917 L 13.542 12.458 L 14.083 12.458 C 14.851 12.458 15.821 11.77 16.995 10.393 C 18.146 9.017 19.59 8.328 21.328 8.328 C 22.186 8.328 22.964 8.543 23.664 8.971 C 24.386 9.378 24.951 9.931 25.357 10.63 C 25.786 11.33 26 12.12 26 13 C 26 13.858 25.786 14.648 25.357 15.37 C 24.951 16.069 24.386 16.634 23.664 17.063 C 22.964 17.469 22.186 17.672 21.328 17.672 C 20.267 17.672 19.353 17.412 18.586 16.893 C 17.841 16.374 17.006 15.618 16.081 14.625 C 15.381 13.858 14.715 13.474 14.083 13.474 L 13.542 13.474 L 13.542 14.083 C 13.542 14.918 14.23 15.889 15.607 16.995 C 16.983 18.101 17.672 19.545 17.672 21.328 C 17.672 22.186 17.457 22.976 17.029 23.698 C 16.622 24.398 16.069 24.951 15.37 25.357 C 14.67 25.786 13.88 26 13 26 Z" fill="rgb(NaN,NaN,NaN)"></path></g></svg>',
                                svgContentId: 128491260,
                                withExternalLayout: !0,
                              }),
                              r(t, {
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
                                className: "framer-1k0vbuo",
                                fonts: ["FS;Switzer-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                          e("div", {
                            className: "framer-k2c0n8",
                            children: [
                              r(m, {
                                className: "framer-1b6rwxe",
                                "data-framer-name": "graphic",
                                layout: "position",
                                name: "graphic",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22"><g id="ss2093193520_1"><path d="M 0 0 L 22 0 L 22 22 L 0 22 Z" fill="transparent"></path><path d="M 11.043 10.104 C 10.587 4.448 5.852 0 0.079 0 C 0.079 5.747 4.485 10.464 10.104 10.957 C 4.448 11.413 0 16.148 0 21.921 C 5.747 21.921 10.464 17.515 10.957 11.896 C 11.413 17.552 16.148 22 21.921 22 C 21.921 16.253 17.515 11.536 11.896 11.043 C 17.552 10.587 22 5.852 22 0.079 C 16.253 0.079 11.536 4.485 11.043 10.104 Z M 11 11 L 11 11 L 11 11 L 11 11 L 11 11 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                svgContentId: 2093193520,
                                withExternalLayout: !0,
                              }),
                              r(t, {
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
                                className: "framer-181w8ot",
                                fonts: ["FS;Chillax-semibold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                          r("div", {
                            className: "framer-ncrmmm",
                            children: r(t, {
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
                              className: "framer-ozhjt5",
                              fonts: ["FS;Panchang-bold"],
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          }),
                          e("div", {
                            className: "framer-w8w3ly",
                            children: [
                              r(m, {
                                className: "framer-xn1n4d",
                                "data-framer-name": "graphic",
                                layout: "position",
                                name: "graphic",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g transform="translate(-0 -0)" id="ss3179953828_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 20.849 C 2.924 28.433 -4.433 21.076 3.151 12 C -4.433 2.924 2.924 -4.433 12 3.151 C 21.075 -4.433 28.433 2.924 20.849 12 C 28.433 21.069 21.075 28.433 12 20.849 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                svgContentId: 3179953828,
                                withExternalLayout: !0,
                              }),
                              r(t, {
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
                                className: "framer-qsqwt8",
                                fonts: ["FS;Chillax-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                          e("div", {
                            className: "framer-xvkcta",
                            children: [
                              r(m, {
                                className: "framer-9by05g",
                                "data-framer-name": "graphic",
                                layout: "position",
                                name: "graphic",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g id="ss2688495123_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 12 C 12 12 13.5 7.983 13.5 5.143 C 13.5 2.302 12.828 0 12 0 C 11.172 0 10.5 2.303 10.5 5.143 C 10.5 7.983 12 12 12 12 Z M 12 12 C 12 12 13.78 15.901 15.788 17.909 C 17.796 19.918 19.899 21.071 20.485 20.485 C 21.071 19.899 19.918 17.796 17.909 15.788 C 15.901 13.78 12 12 12 12 Z M 12 12 C 12 12 16.017 10.5 18.857 10.5 C 21.697 10.5 24 11.172 24 12 C 24 12.828 21.697 13.5 18.857 13.5 C 16.017 13.5 12 12 12 12 Z M 12 12 C 12 12 8.099 13.78 6.091 15.788 C 4.082 17.796 2.929 19.899 3.515 20.485 C 4.101 21.071 6.204 19.918 8.212 17.909 C 10.22 15.901 12 12 12 12 Z M 12 12 C 12.003 12.009 13.5 16.02 13.5 18.857 C 13.5 21.697 12.828 24 12 24 C 11.172 24 10.5 21.697 10.5 18.857 C 10.5 16.017 12 12 12 12 Z M 12 12 C 12 12 7.983 10.5 5.143 10.5 C 2.302 10.5 0 11.172 0 12 C 0 12.828 2.303 13.5 5.143 13.5 C 7.983 13.5 12 12 12 12 Z M 12 12 C 12 12 15.901 10.22 17.909 8.212 C 19.918 6.204 21.071 4.101 20.485 3.515 C 19.899 2.929 17.796 4.082 15.788 6.091 C 13.78 8.099 12 12 12 12 Z M 8.212 6.091 C 10.22 8.099 12 12 12 12 C 12 12 8.099 10.22 6.091 8.212 C 4.082 6.204 2.929 4.1 3.515 3.515 C 4.101 2.929 6.204 4.082 8.212 6.091 Z" fill="rgb(0, 0, 0)"></path></g></svg>',
                                svgContentId: 2688495123,
                                withExternalLayout: !0,
                              }),
                              r(t, {
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
                                className: "framer-n8k906",
                                fonts: ["FS;Satoshi-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  }),
                  r("div", {
                    className: "framer-2tnuyb",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: r("div", {
                      className: "framer-1dqz82r",
                      "data-framer-name": "Logo Grid Night",
                      name: "Logo Grid Night",
                      children: e("div", {
                        className: "framer-1kwmv35",
                        children: [
                          e("div", {
                            className: "framer-1trhbbt",
                            children: [
                              r(m, {
                                className: "framer-1yxfzya",
                                "data-framer-name": "graphic",
                                layout: "position",
                                name: "graphic",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss130635346_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 6.5 L 13 0 L 26 6.5 L 26 19.5 L 13 26 L 13 19.5 L 0 26 L 0 19.5 L 13 13 L 0 6.5 L 0 0 Z M 13 6.5 L 13 19.5 L 26 13 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                svgContentId: 130635346,
                                withExternalLayout: !0,
                              }),
                              r(t, {
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
                                className: "framer-hm99b2",
                                fonts: ["FS;Satoshi-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                          e("div", {
                            className: "framer-1bbg45x",
                            children: [
                              r(m, {
                                className: "framer-17mrrmp",
                                "data-framer-name": "graphic",
                                layout: "position",
                                name: "graphic",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><g id="ss2103996054_1"><path d="M 0 0 L 26 0 L 26 26 L 0 26 Z" fill="transparent"></path><path d="M 13 26 C 12.142 26 11.352 25.786 10.63 25.357 C 9.931 24.951 9.366 24.398 8.938 23.698 C 8.531 22.976 8.328 22.186 8.328 21.328 C 8.328 20.245 8.576 19.342 9.073 18.62 C 9.57 17.898 10.337 17.051 11.375 16.081 C 12.142 15.381 12.526 14.715 12.526 14.083 L 12.526 13.474 L 11.917 13.474 C 11.217 13.474 10.258 14.174 9.039 15.573 C 7.843 16.972 6.387 17.672 4.672 17.672 C 3.814 17.672 3.024 17.469 2.302 17.063 C 1.602 16.634 1.038 16.069 0.609 15.37 C 0.203 14.648 0 13.858 0 13 C 0 12.142 0.203 11.364 0.609 10.664 C 1.038 9.942 1.602 9.378 2.302 8.971 C 3.024 8.542 3.814 8.328 4.672 8.328 C 6.365 8.328 7.809 9.017 9.005 10.393 C 10.201 11.77 11.172 12.458 11.917 12.458 L 12.526 12.458 L 12.526 11.917 C 12.526 11.285 12.142 10.619 11.375 9.919 L 10.596 9.208 C 10.032 8.689 9.513 8.069 9.039 7.346 C 8.565 6.602 8.328 5.71 8.328 4.672 C 8.328 3.814 8.531 3.036 8.938 2.336 C 9.366 1.614 9.931 1.049 10.63 0.643 C 11.353 0.214 12.143 0 13 0 C 13.858 0 14.636 0.214 15.336 0.643 C 16.058 1.072 16.622 1.636 17.029 2.336 C 17.457 3.036 17.672 3.814 17.672 4.672 C 17.672 6.365 16.983 7.809 15.607 9.005 C 14.23 10.201 13.542 11.172 13.542 11.917 L 13.542 12.458 L 14.083 12.458 C 14.851 12.458 15.821 11.77 16.995 10.393 C 18.146 9.017 19.59 8.328 21.328 8.328 C 22.186 8.328 22.964 8.543 23.664 8.971 C 24.386 9.378 24.951 9.931 25.357 10.63 C 25.786 11.33 26 12.12 26 13 C 26 13.858 25.786 14.648 25.357 15.37 C 24.951 16.069 24.386 16.634 23.664 17.063 C 22.964 17.469 22.186 17.672 21.328 17.672 C 20.267 17.672 19.353 17.412 18.586 16.893 C 17.841 16.374 17.006 15.618 16.081 14.625 C 15.381 13.858 14.715 13.474 14.083 13.474 L 13.542 13.474 L 13.542 14.083 C 13.542 14.918 14.23 15.889 15.607 16.995 C 16.983 18.101 17.672 19.545 17.672 21.328 C 17.672 22.186 17.457 22.976 17.029 23.698 C 16.622 24.398 16.069 24.951 15.37 25.357 C 14.67 25.786 13.88 26 13 26 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                svgContentId: 2103996054,
                                withExternalLayout: !0,
                              }),
                              r(t, {
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
                                className: "framer-1ndp15n",
                                fonts: ["FS;Switzer-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                          e("div", {
                            className: "framer-163f2qk",
                            children: [
                              r(m, {
                                className: "framer-1bwkqze",
                                "data-framer-name": "graphic",
                                layout: "position",
                                name: "graphic",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22"><g id="ss3274348696_1"><path d="M 0 0 L 22 0 L 22 22 L 0 22 Z" fill="transparent"></path><path d="M 11.043 10.104 C 10.587 4.448 5.852 0 0.079 0 C 0.079 5.747 4.485 10.464 10.104 10.957 C 4.448 11.413 0 16.148 0 21.921 C 5.747 21.921 10.464 17.515 10.957 11.896 C 11.413 17.552 16.148 22 21.921 22 C 21.921 16.253 17.515 11.536 11.896 11.043 C 17.552 10.587 22 5.852 22 0.079 C 16.253 0.079 11.536 4.485 11.043 10.104 Z M 11 11 L 11 11 L 11 11 L 11 11 L 11 11 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                svgContentId: 3274348696,
                                withExternalLayout: !0,
                              }),
                              r(t, {
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
                                className: "framer-1o2yxaw",
                                fonts: ["FS;Chillax-semibold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                          r("div", {
                            className: "framer-171lpvg",
                            children: r(t, {
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
                              className: "framer-6lborx",
                              fonts: ["FS;Panchang-bold"],
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          }),
                          e("div", {
                            className: "framer-1gko9o4",
                            children: [
                              r(m, {
                                className: "framer-18sknvv",
                                "data-framer-name": "graphic",
                                layout: "position",
                                name: "graphic",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g transform="translate(-0 -0)" id="ss3193510824_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 20.849 C 2.924 28.433 -4.433 21.076 3.151 12 C -4.433 2.924 2.924 -4.433 12 3.151 C 21.075 -4.433 28.433 2.924 20.849 12 C 28.433 21.069 21.075 28.433 12 20.849 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                svgContentId: 3193510824,
                                withExternalLayout: !0,
                              }),
                              r(t, {
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
                                className: "framer-18eyl7n",
                                fonts: ["FS;Chillax-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                          e("div", {
                            className: "framer-mhx5hs",
                            children: [
                              r(m, {
                                className: "framer-i4uq31",
                                "data-framer-name": "graphic",
                                layout: "position",
                                name: "graphic",
                                opacity: 1,
                                radius: { bottomLeft: 0, bottomRight: 0, topLeft: 0, topRight: 0 },
                                svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g id="ss2259763762_1"><path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path><path d="M 12 12 C 12 12 13.5 7.983 13.5 5.143 C 13.5 2.302 12.828 0 12 0 C 11.172 0 10.5 2.303 10.5 5.143 C 10.5 7.983 12 12 12 12 Z M 12 12 C 12 12 13.78 15.901 15.788 17.909 C 17.796 19.918 19.899 21.071 20.485 20.485 C 21.071 19.899 19.918 17.796 17.909 15.788 C 15.901 13.78 12 12 12 12 Z M 12 12 C 12 12 16.017 10.5 18.857 10.5 C 21.697 10.5 24 11.172 24 12 C 24 12.828 21.697 13.5 18.857 13.5 C 16.017 13.5 12 12 12 12 Z M 12 12 C 12 12 8.099 13.78 6.091 15.788 C 4.082 17.796 2.929 19.899 3.515 20.485 C 4.101 21.071 6.204 19.918 8.212 17.909 C 10.22 15.901 12 12 12 12 Z M 12 12 C 12.003 12.009 13.5 16.02 13.5 18.857 C 13.5 21.697 12.828 24 12 24 C 11.172 24 10.5 21.697 10.5 18.857 C 10.5 16.017 12 12 12 12 Z M 12 12 C 12 12 7.983 10.5 5.143 10.5 C 2.302 10.5 0 11.172 0 12 C 0 12.828 2.303 13.5 5.143 13.5 C 7.983 13.5 12 12 12 12 Z M 12 12 C 12 12 15.901 10.22 17.909 8.212 C 19.918 6.204 21.071 4.101 20.485 3.515 C 19.899 2.929 17.796 4.082 15.788 6.091 C 13.78 8.099 12 12 12 12 Z M 8.212 6.091 C 10.22 8.099 12 12 12 12 C 12 12 8.099 10.22 6.091 8.212 C 4.082 6.204 2.929 4.1 3.515 3.515 C 4.101 2.929 6.204 4.082 8.212 6.091 Z" fill="rgb(255, 255, 255)"></path></g></svg>',
                                svgContentId: 2259763762,
                                withExternalLayout: !0,
                              }),
                              r(t, {
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
                                className: "framer-1eys9a0",
                                fonts: ["FS;Satoshi-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
            }),
            r("div", { className: C(j, ...b), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  H = [
    '.framer-J64rr[data-border="true"]::after, .framer-J64rr [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-J64rr.framer-z6u42w, .framer-J64rr .framer-z6u42w { display: block; }",
    ".framer-J64rr.framer-1133p9t { --border-bottom-width: 1px; --border-color: rgba(173, 173, 173, 0.4); --border-left-width: 1px; --border-right-width: 1px; --border-style: dashed; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-J64rr .framer-q9dgti { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; max-width: 1600px; overflow: hidden; padding: 20px 20px 20px 20px; position: relative; width: 100%; }",
    '.framer-J64rr .framer-131745k, .framer-J64rr .framer-1djitif, .framer-J64rr .framer-14zfwn4, .framer-J64rr .framer-qmqm4l, .framer-J64rr .framer-ae1dqx, .framer-J64rr .framer-2tnuyb { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }',
    ".framer-J64rr .framer-ooierv, .framer-J64rr .framer-qj2a9r { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 1px; }",
    ".framer-J64rr .framer-1lvabf8, .framer-J64rr .framer-1rv52td { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 480px; opacity: 0.5; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-J64rr .framer-12ppyge, .framer-J64rr .framer-12t2xpv { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 50px; height: min-content; justify-content: center; max-width: 1200px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-J64rr .framer-1e39gmt, .framer-J64rr .framer-1uk4l29, .framer-J64rr .framer-g9ffje, .framer-J64rr .framer-18g39dx, .framer-J64rr .framer-i8u3rw, .framer-J64rr .framer-1ns2ist, .framer-J64rr .framer-fm5ovx, .framer-J64rr .framer-kn7vgn { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; opacity: 0.5; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-J64rr .framer-5l0obr, .framer-J64rr .framer-xho3m5, .framer-J64rr .framer-18o4d7t, .framer-J64rr .framer-1uj19kw, .framer-J64rr .framer-na2tu7, .framer-J64rr .framer-o1oi1g, .framer-J64rr .framer-t22k3l, .framer-J64rr .framer-2sr5tl, .framer-J64rr .framer-xqut9p, .framer-J64rr .framer-cq8ezb, .framer-J64rr .framer-1yxfzya, .framer-J64rr .framer-17mrrmp { flex: none; height: 26px; position: relative; width: 26px; }",
    ".framer-J64rr .framer-181qujg, .framer-J64rr .framer-iwccgy, .framer-J64rr .framer-r0sr5u, .framer-J64rr .framer-1y56u6a, .framer-J64rr .framer-13bkbar, .framer-J64rr .framer-gfcj9z, .framer-J64rr .framer-caj1ol, .framer-J64rr .framer-1kudk7w, .framer-J64rr .framer-s8599b, .framer-J64rr .framer-1dfuca5, .framer-J64rr .framer-1l1kst0, .framer-J64rr .framer-16ynzut, .framer-J64rr .framer-1pzz0fa, .framer-J64rr .framer-ht2hzh, .framer-J64rr .framer-bezgxs, .framer-J64rr .framer-sg0buz, .framer-J64rr .framer-1u689mo, .framer-J64rr .framer-155j1gm, .framer-J64rr .framer-13iq5uk, .framer-J64rr .framer-fsyfqm, .framer-J64rr .framer-13h1852, .framer-J64rr .framer-168hmew, .framer-J64rr .framer-2xnd9y, .framer-J64rr .framer-mo8zem, .framer-J64rr .framer-17uyzgz, .framer-J64rr .framer-1k0vbuo, .framer-J64rr .framer-181w8ot, .framer-J64rr .framer-ozhjt5, .framer-J64rr .framer-qsqwt8, .framer-J64rr .framer-n8k906, .framer-J64rr .framer-hm99b2, .framer-J64rr .framer-1ndp15n, .framer-J64rr .framer-1o2yxaw, .framer-J64rr .framer-6lborx, .framer-J64rr .framer-18eyl7n, .framer-J64rr .framer-1eys9a0 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-J64rr .framer-moj5r1, .framer-J64rr .framer-qfed37, .framer-J64rr .framer-1nuhdbe, .framer-J64rr .framer-3zmqbo, .framer-J64rr .framer-1xrfft4, .framer-J64rr .framer-1o6m4gy, .framer-J64rr .framer-1v9yhnl, .framer-J64rr .framer-1wmtd0a, .framer-J64rr .framer-1r1qvh1, .framer-J64rr .framer-1eu6t60, .framer-J64rr .framer-17ejys3, .framer-J64rr .framer-xxmsaz, .framer-J64rr .framer-17mcxnz, .framer-J64rr .framer-elxbti, .framer-J64rr .framer-v1605t, .framer-J64rr .framer-fotgvi { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: min-content; justify-content: center; opacity: 0.5; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-J64rr .framer-1ewdk98, .framer-J64rr .framer-17gibjv, .framer-J64rr .framer-bwu4y4, .framer-J64rr .framer-32vt4f, .framer-J64rr .framer-1b6rwxe, .framer-J64rr .framer-1bwkqze { flex: none; height: 22px; position: relative; width: 22px; }",
    ".framer-J64rr .framer-7eyf06, .framer-J64rr .framer-dfjk7t, .framer-J64rr .framer-tuqb69, .framer-J64rr .framer-9l53iu, .framer-J64rr .framer-1lmssit, .framer-J64rr .framer-i7jnhi, .framer-J64rr .framer-1j3v7rt, .framer-J64rr .framer-1e4o9fq, .framer-J64rr .framer-xn1n4d, .framer-J64rr .framer-9by05g, .framer-J64rr .framer-18sknvv, .framer-J64rr .framer-i4uq31 { flex: none; height: 24px; position: relative; width: 24px; }",
    ".framer-J64rr .framer-14r7t85, .framer-J64rr .framer-1dqz82r { align-content: center; align-items: center; background-color: #000000; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 1px; }",
    ".framer-J64rr .framer-glfxx4 { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 1px; }",
    ".framer-J64rr .framer-ej1q8m-container, .framer-J64rr .framer-z6eoms-container { flex: none; height: 82px; max-width: 1200px; position: relative; width: 100%; }",
    ".framer-J64rr .framer-1k9d4ov, .framer-J64rr .framer-k2tyrl { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 50px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-J64rr .framer-11g3gcb { align-content: center; align-items: center; background-color: #000000; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 1px; }",
    ".framer-J64rr .framer-1sdexlf, .framer-J64rr .framer-1kwmv35 { display: grid; flex: none; gap: 4px; grid-auto-rows: min-content; grid-template-columns: repeat(3, minmax(200px, 1fr)); grid-template-rows: repeat(2, min-content); height: min-content; justify-content: center; max-width: 800px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-J64rr .framer-1jon22b, .framer-J64rr .framer-k2c0n8 { align-content: center; align-items: center; align-self: start; background-color: rgba(163, 163, 163, 0.1); border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; border-top-left-radius: 6px; border-top-right-radius: 6px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: 100%; justify-content: center; justify-self: start; overflow: visible; padding: 40px 40px 40px 40px; position: relative; width: 100%; }",
    ".framer-J64rr .framer-7fgawr, .framer-J64rr .framer-ncrmmm, .framer-J64rr .framer-w8w3ly, .framer-J64rr .framer-xvkcta { align-content: center; align-items: center; align-self: start; background-color: rgba(163, 163, 163, 0.1); border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; border-top-left-radius: 6px; border-top-right-radius: 6px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: 100%; justify-content: center; justify-self: start; overflow: visible; padding: 40px 40px 40px 40px; position: relative; width: 100%; }",
    ".framer-J64rr .framer-1trhbbt, .framer-J64rr .framer-163f2qk { align-content: center; align-items: center; align-self: start; background-color: var(--token-fae2c128-35fb-45de-a6c2-32169f920c68, #141414); border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; border-top-left-radius: 6px; border-top-right-radius: 6px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: 100%; justify-content: center; justify-self: start; overflow: visible; padding: 40px 40px 40px 40px; position: relative; width: 100%; }",
    ".framer-J64rr .framer-1bbg45x, .framer-J64rr .framer-171lpvg, .framer-J64rr .framer-1gko9o4, .framer-J64rr .framer-mhx5hs { align-content: center; align-items: center; align-self: start; background-color: var(--token-fae2c128-35fb-45de-a6c2-32169f920c68, #141414); border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; border-top-left-radius: 6px; border-top-right-radius: 6px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: 100%; justify-content: center; justify-self: start; overflow: visible; padding: 40px 40px 40px 40px; position: relative; width: 100%; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-J64rr.framer-1133p9t, .framer-J64rr .framer-q9dgti, .framer-J64rr .framer-131745k, .framer-J64rr .framer-ooierv, .framer-J64rr .framer-12ppyge, .framer-J64rr .framer-1e39gmt, .framer-J64rr .framer-moj5r1, .framer-J64rr .framer-1uk4l29, .framer-J64rr .framer-qfed37, .framer-J64rr .framer-1nuhdbe, .framer-J64rr .framer-3zmqbo, .framer-J64rr .framer-1djitif, .framer-J64rr .framer-14r7t85, .framer-J64rr .framer-12t2xpv, .framer-J64rr .framer-g9ffje, .framer-J64rr .framer-1xrfft4, .framer-J64rr .framer-18g39dx, .framer-J64rr .framer-1o6m4gy, .framer-J64rr .framer-1v9yhnl, .framer-J64rr .framer-1wmtd0a, .framer-J64rr .framer-14zfwn4, .framer-J64rr .framer-glfxx4, .framer-J64rr .framer-1k9d4ov, .framer-J64rr .framer-i8u3rw, .framer-J64rr .framer-1r1qvh1, .framer-J64rr .framer-1ns2ist, .framer-J64rr .framer-1eu6t60, .framer-J64rr .framer-17ejys3, .framer-J64rr .framer-xxmsaz, .framer-J64rr .framer-qmqm4l, .framer-J64rr .framer-11g3gcb, .framer-J64rr .framer-k2tyrl, .framer-J64rr .framer-fm5ovx, .framer-J64rr .framer-17mcxnz, .framer-J64rr .framer-kn7vgn, .framer-J64rr .framer-elxbti, .framer-J64rr .framer-v1605t, .framer-J64rr .framer-fotgvi, .framer-J64rr .framer-ae1dqx, .framer-J64rr .framer-qj2a9r, .framer-J64rr .framer-1jon22b, .framer-J64rr .framer-7fgawr, .framer-J64rr .framer-k2c0n8, .framer-J64rr .framer-ncrmmm, .framer-J64rr .framer-w8w3ly, .framer-J64rr .framer-xvkcta, .framer-J64rr .framer-2tnuyb, .framer-J64rr .framer-1dqz82r, .framer-J64rr .framer-1trhbbt, .framer-J64rr .framer-1bbg45x, .framer-J64rr .framer-163f2qk, .framer-J64rr .framer-171lpvg, .framer-J64rr .framer-1gko9o4, .framer-J64rr .framer-mhx5hs { gap: 0px; } .framer-J64rr.framer-1133p9t > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-J64rr.framer-1133p9t > :first-child, .framer-J64rr .framer-q9dgti > :first-child, .framer-J64rr .framer-ooierv > :first-child, .framer-J64rr .framer-14r7t85 > :first-child, .framer-J64rr .framer-glfxx4 > :first-child, .framer-J64rr .framer-11g3gcb > :first-child, .framer-J64rr .framer-qj2a9r > :first-child, .framer-J64rr .framer-1dqz82r > :first-child { margin-top: 0px; } .framer-J64rr.framer-1133p9t > :last-child, .framer-J64rr .framer-q9dgti > :last-child, .framer-J64rr .framer-ooierv > :last-child, .framer-J64rr .framer-14r7t85 > :last-child, .framer-J64rr .framer-glfxx4 > :last-child, .framer-J64rr .framer-11g3gcb > :last-child, .framer-J64rr .framer-qj2a9r > :last-child, .framer-J64rr .framer-1dqz82r > :last-child { margin-bottom: 0px; } .framer-J64rr .framer-q9dgti > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-J64rr .framer-131745k > *, .framer-J64rr .framer-1djitif > *, .framer-J64rr .framer-14zfwn4 > *, .framer-J64rr .framer-qmqm4l > *, .framer-J64rr .framer-ae1dqx > *, .framer-J64rr .framer-2tnuyb > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-J64rr .framer-131745k > :first-child, .framer-J64rr .framer-12ppyge > :first-child, .framer-J64rr .framer-1e39gmt > :first-child, .framer-J64rr .framer-moj5r1 > :first-child, .framer-J64rr .framer-1uk4l29 > :first-child, .framer-J64rr .framer-qfed37 > :first-child, .framer-J64rr .framer-1nuhdbe > :first-child, .framer-J64rr .framer-3zmqbo > :first-child, .framer-J64rr .framer-1djitif > :first-child, .framer-J64rr .framer-12t2xpv > :first-child, .framer-J64rr .framer-g9ffje > :first-child, .framer-J64rr .framer-1xrfft4 > :first-child, .framer-J64rr .framer-18g39dx > :first-child, .framer-J64rr .framer-1o6m4gy > :first-child, .framer-J64rr .framer-1v9yhnl > :first-child, .framer-J64rr .framer-1wmtd0a > :first-child, .framer-J64rr .framer-14zfwn4 > :first-child, .framer-J64rr .framer-1k9d4ov > :first-child, .framer-J64rr .framer-i8u3rw > :first-child, .framer-J64rr .framer-1r1qvh1 > :first-child, .framer-J64rr .framer-1ns2ist > :first-child, .framer-J64rr .framer-1eu6t60 > :first-child, .framer-J64rr .framer-17ejys3 > :first-child, .framer-J64rr .framer-xxmsaz > :first-child, .framer-J64rr .framer-qmqm4l > :first-child, .framer-J64rr .framer-k2tyrl > :first-child, .framer-J64rr .framer-fm5ovx > :first-child, .framer-J64rr .framer-17mcxnz > :first-child, .framer-J64rr .framer-kn7vgn > :first-child, .framer-J64rr .framer-elxbti > :first-child, .framer-J64rr .framer-v1605t > :first-child, .framer-J64rr .framer-fotgvi > :first-child, .framer-J64rr .framer-ae1dqx > :first-child, .framer-J64rr .framer-1jon22b > :first-child, .framer-J64rr .framer-7fgawr > :first-child, .framer-J64rr .framer-k2c0n8 > :first-child, .framer-J64rr .framer-ncrmmm > :first-child, .framer-J64rr .framer-w8w3ly > :first-child, .framer-J64rr .framer-xvkcta > :first-child, .framer-J64rr .framer-2tnuyb > :first-child, .framer-J64rr .framer-1trhbbt > :first-child, .framer-J64rr .framer-1bbg45x > :first-child, .framer-J64rr .framer-163f2qk > :first-child, .framer-J64rr .framer-171lpvg > :first-child, .framer-J64rr .framer-1gko9o4 > :first-child, .framer-J64rr .framer-mhx5hs > :first-child { margin-left: 0px; } .framer-J64rr .framer-131745k > :last-child, .framer-J64rr .framer-12ppyge > :last-child, .framer-J64rr .framer-1e39gmt > :last-child, .framer-J64rr .framer-moj5r1 > :last-child, .framer-J64rr .framer-1uk4l29 > :last-child, .framer-J64rr .framer-qfed37 > :last-child, .framer-J64rr .framer-1nuhdbe > :last-child, .framer-J64rr .framer-3zmqbo > :last-child, .framer-J64rr .framer-1djitif > :last-child, .framer-J64rr .framer-12t2xpv > :last-child, .framer-J64rr .framer-g9ffje > :last-child, .framer-J64rr .framer-1xrfft4 > :last-child, .framer-J64rr .framer-18g39dx > :last-child, .framer-J64rr .framer-1o6m4gy > :last-child, .framer-J64rr .framer-1v9yhnl > :last-child, .framer-J64rr .framer-1wmtd0a > :last-child, .framer-J64rr .framer-14zfwn4 > :last-child, .framer-J64rr .framer-1k9d4ov > :last-child, .framer-J64rr .framer-i8u3rw > :last-child, .framer-J64rr .framer-1r1qvh1 > :last-child, .framer-J64rr .framer-1ns2ist > :last-child, .framer-J64rr .framer-1eu6t60 > :last-child, .framer-J64rr .framer-17ejys3 > :last-child, .framer-J64rr .framer-xxmsaz > :last-child, .framer-J64rr .framer-qmqm4l > :last-child, .framer-J64rr .framer-k2tyrl > :last-child, .framer-J64rr .framer-fm5ovx > :last-child, .framer-J64rr .framer-17mcxnz > :last-child, .framer-J64rr .framer-kn7vgn > :last-child, .framer-J64rr .framer-elxbti > :last-child, .framer-J64rr .framer-v1605t > :last-child, .framer-J64rr .framer-fotgvi > :last-child, .framer-J64rr .framer-ae1dqx > :last-child, .framer-J64rr .framer-1jon22b > :last-child, .framer-J64rr .framer-7fgawr > :last-child, .framer-J64rr .framer-k2c0n8 > :last-child, .framer-J64rr .framer-ncrmmm > :last-child, .framer-J64rr .framer-w8w3ly > :last-child, .framer-J64rr .framer-xvkcta > :last-child, .framer-J64rr .framer-2tnuyb > :last-child, .framer-J64rr .framer-1trhbbt > :last-child, .framer-J64rr .framer-1bbg45x > :last-child, .framer-J64rr .framer-163f2qk > :last-child, .framer-J64rr .framer-171lpvg > :last-child, .framer-J64rr .framer-1gko9o4 > :last-child, .framer-J64rr .framer-mhx5hs > :last-child { margin-right: 0px; } .framer-J64rr .framer-ooierv > *, .framer-J64rr .framer-14r7t85 > *, .framer-J64rr .framer-glfxx4 > *, .framer-J64rr .framer-11g3gcb > *, .framer-J64rr .framer-qj2a9r > *, .framer-J64rr .framer-1dqz82r > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-J64rr .framer-12ppyge > *, .framer-J64rr .framer-12t2xpv > *, .framer-J64rr .framer-1k9d4ov > *, .framer-J64rr .framer-k2tyrl > * { margin: 0px; margin-left: calc(50px / 2); margin-right: calc(50px / 2); } .framer-J64rr .framer-1e39gmt > *, .framer-J64rr .framer-1uk4l29 > *, .framer-J64rr .framer-g9ffje > *, .framer-J64rr .framer-18g39dx > *, .framer-J64rr .framer-i8u3rw > *, .framer-J64rr .framer-1ns2ist > *, .framer-J64rr .framer-fm5ovx > *, .framer-J64rr .framer-kn7vgn > *, .framer-J64rr .framer-1jon22b > *, .framer-J64rr .framer-k2c0n8 > *, .framer-J64rr .framer-1trhbbt > *, .framer-J64rr .framer-163f2qk > * { margin: 0px; margin-left: calc(8px / 2); margin-right: calc(8px / 2); } .framer-J64rr .framer-moj5r1 > *, .framer-J64rr .framer-qfed37 > *, .framer-J64rr .framer-1nuhdbe > *, .framer-J64rr .framer-3zmqbo > *, .framer-J64rr .framer-1xrfft4 > *, .framer-J64rr .framer-1o6m4gy > *, .framer-J64rr .framer-1v9yhnl > *, .framer-J64rr .framer-1wmtd0a > *, .framer-J64rr .framer-1r1qvh1 > *, .framer-J64rr .framer-1eu6t60 > *, .framer-J64rr .framer-17ejys3 > *, .framer-J64rr .framer-xxmsaz > *, .framer-J64rr .framer-17mcxnz > *, .framer-J64rr .framer-elxbti > *, .framer-J64rr .framer-v1605t > *, .framer-J64rr .framer-fotgvi > *, .framer-J64rr .framer-7fgawr > *, .framer-J64rr .framer-ncrmmm > *, .framer-J64rr .framer-w8w3ly > *, .framer-J64rr .framer-xvkcta > *, .framer-J64rr .framer-1bbg45x > *, .framer-J64rr .framer-171lpvg > *, .framer-J64rr .framer-1gko9o4 > *, .framer-J64rr .framer-mhx5hs > * { margin: 0px; margin-left: calc(6px / 2); margin-right: calc(6px / 2); } }",
    "@media (min-width: 1200px) { .framer-J64rr .hidden-1133p9t { display: none !important; } }",
    "@media (min-width: 810px) and (max-width: 1199px) { .framer-J64rr .hidden-10k0yv7 { display: none !important; } .framer-J64rr.framer-1133p9t { width: 810px; } .framer-J64rr .framer-12ppyge, .framer-J64rr .framer-12t2xpv { flex-wrap: wrap; gap: 20px; max-width: 470px; } .framer-J64rr .framer-1sdexlf, .framer-J64rr .framer-1kwmv35 { grid-template-columns: repeat(2, minmax(200px, 1fr)); } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-J64rr .framer-12ppyge, .framer-J64rr .framer-12t2xpv { gap: 0px; } .framer-J64rr .framer-12ppyge > *, .framer-J64rr .framer-12t2xpv > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } .framer-J64rr .framer-12ppyge > :first-child, .framer-J64rr .framer-12t2xpv > :first-child { margin-left: 0px; } .framer-J64rr .framer-12ppyge > :last-child, .framer-J64rr .framer-12t2xpv > :last-child { margin-right: 0px; } }}",
    "@media (max-width: 809px) { .framer-J64rr .hidden-m3fm3r { display: none !important; } .framer-J64rr.framer-1133p9t { width: 390px; } .framer-J64rr .framer-ooierv, .framer-J64rr .framer-14r7t85 { padding: 40px 20px 40px 20px; } .framer-J64rr .framer-1lvabf8, .framer-J64rr .framer-1rv52td { max-width: 200px; } .framer-J64rr .framer-12ppyge, .framer-J64rr .framer-12t2xpv { flex-wrap: wrap; gap: 20px; } .framer-J64rr .framer-qj2a9r, .framer-J64rr .framer-1dqz82r { padding: 20px 20px 20px 20px; } .framer-J64rr .framer-1sdexlf, .framer-J64rr .framer-1kwmv35 { grid-template-columns: repeat(1, minmax(200px, 1fr)); } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-J64rr .framer-12ppyge, .framer-J64rr .framer-12t2xpv { gap: 0px; } .framer-J64rr .framer-12ppyge > *, .framer-J64rr .framer-12t2xpv > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } .framer-J64rr .framer-12ppyge > :first-child, .framer-J64rr .framer-12t2xpv > :first-child { margin-left: 0px; } .framer-J64rr .framer-12ppyge > :last-child, .framer-J64rr .framer-12t2xpv > :last-child { margin-right: 0px; } }}",
    ...q,
  ],
  h = Z(Q, H, "framer-J64rr"),
  pr = h;
h.displayName = "Pricing";
h.defaultProps = { height: 1680.5, width: 1200 };
F(h, [
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
  ...T,
  ...P,
]);
var hr = {
  exports: {
    default: {
      type: "reactComponent",
      name: "FramerRHSPyjf_h",
      slots: [],
      annotations: {
        framerIntrinsicWidth: "1200",
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"CUGfOngqq":{"layout":["fixed","auto"]},"b8JvTBtLK":{"layout":["fixed","auto"]}}}',
        framerDisplayContentsDiv: "false",
        framerImmutableVariables: "true",
        framerIntrinsicHeight: "1680.5",
        framerContractVersion: "1",
        framerResponsiveScreen: "",
      },
    },
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    __FramerMetadata__: { type: "variable" },
  },
};
export { hr as __FramerMetadata__, pr as default };
//# sourceMappingURL=N1YrEC7ZMbJ6Ky1IHyF23vxYvsx3aWUi99wdhV7GrOE.F3W5R54W.mjs.map
