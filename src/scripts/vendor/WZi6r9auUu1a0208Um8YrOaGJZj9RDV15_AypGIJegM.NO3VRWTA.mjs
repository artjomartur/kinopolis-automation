import { a as N } from "./chunk-LZIPWTDY.mjs";
import { a as s } from "./chunk-PBG357LN.mjs";
import { a as A, b as G, c as P } from "./chunk-5SAWWLB7.mjs";
import { b as r, c as i } from "./chunk-OO3TPEBQ.mjs";
import {
  K as _,
  V as u,
  Y as c,
  Z as z,
  _ as E,
  aa as I,
  ba as m,
  c as e,
  g as b,
  l as L,
  m as k,
  ma as F,
  o as R,
  ra as o,
  t,
  ua as a,
  v as j,
  va as M,
  wa as q,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var W = q(s);
var Y = {
  IMqQGEBzu: "(min-width: 1200px)",
  PoN9_ILLv: "(min-width: 810px) and (max-width: 1199px)",
  uZogHe6Ps: "(max-width: 809px)",
};
var S = "framer-0ZNvo",
  U = { IMqQGEBzu: "framer-v-i5tjj4", PoN9_ILLv: "framer-v-1aithxi", uZogHe6Ps: "framer-v-qan2ri" },
  D = { default: { duration: 0 } },
  X = { damping: 30, delay: 0, mass: 1, stiffness: 400, type: "spring" },
  n = { opacity: 0.3, rotate: 0, scale: 1, transition: X },
  hr = N(),
  Q = { Desktop: "IMqQGEBzu", Phone: "uZogHe6Ps", Tablet: "PoN9_ILLv" },
  V = ({ height: y, id: h, width: v, ...p }) => {
    var f, d;
    return {
      ...p,
      variant:
        (d = (f = Q[p.variant]) !== null && f !== void 0 ? f : p.variant) !== null && d !== void 0
          ? d
          : "IMqQGEBzu",
    };
  },
  O = b(function (y, h) {
    let { activeLocale: v, setLocale: p } = _(),
      { style: f, className: d, layoutId: x, variant: T, ...H } = V(y);
    k(() => {
      let l = N(void 0, v);
      if (((document.title = l.title || ""), l.viewport)) {
        var w;
        (w = document.querySelector('meta[name="viewport"]')) === null ||
          w === void 0 ||
          w.setAttribute("content", l.viewport);
      }
      if (l.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((C) => C.startsWith("framer-body-"))
            .map((C) => document.body.classList.remove(C)),
          document.body.classList.add(`${l.bodyClassName}-framer-0ZNvo`),
          () => {
            document.body.classList.remove(`${l.bodyClassName}-framer-0ZNvo`);
          }
        );
    }, [void 0, v]);
    let [$, rr] = F(T, Y, !1),
      er = void 0,
      ar = D.default,
      K = R(null),
      B = L(),
      Z = [P];
    return (
      E({}),
      r(I.Provider, {
        value: { primaryVariantId: "IMqQGEBzu", variantClassNames: U },
        children: i(j, {
          id: x ?? B,
          children: [
            r(t.div, {
              ...H,
              className: u(S, ...Z, "framer-i5tjj4", d),
              "data-border": !0,
              ref: h ?? K,
              style: { ...f },
              children: i("div", {
                className: "framer-cmv53e",
                "data-framer-name": "Wrapper",
                name: "Wrapper",
                children: [
                  r("div", {
                    className: "framer-1wa4t1e",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: i("div", {
                      className: "framer-1xrndrm",
                      "data-framer-name": "Footer Day",
                      name: "Footer Day",
                      children: [
                        r(c, {
                          className: "framer-1su6jlt-container",
                          children: r(s, {
                            height: "100%",
                            id: "dtpAqn1PT",
                            layoutId: "dtpAqn1PT",
                            QPpn2xZty: "rgb(0, 0, 0)",
                            style: { height: "100%", width: "100%" },
                            variant: "eEZGnfswo",
                            width: "100%",
                          }),
                        }),
                        i("div", {
                          className: "framer-tzd3nb",
                          children: [
                            r(a, {
                              __fromCanvasComponent: !0,
                              children: r(e, {
                                children: r("p", {
                                  className: "framer-styles-preset-1dts917",
                                  "data-styles-preset": "hgKudGhZ5",
                                  style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                  children: "About",
                                }),
                              }),
                              className: "framer-bcoij7",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(a, {
                              __fromCanvasComponent: !0,
                              children: r(e, {
                                children: r("p", {
                                  className: "framer-styles-preset-1dts917",
                                  "data-styles-preset": "hgKudGhZ5",
                                  style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                  children: "Features",
                                }),
                              }),
                              className: "framer-10vrd7m",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(a, {
                              __fromCanvasComponent: !0,
                              children: r(e, {
                                children: r("p", {
                                  className: "framer-styles-preset-1dts917",
                                  "data-styles-preset": "hgKudGhZ5",
                                  style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                  children: "Customers",
                                }),
                              }),
                              className: "framer-iuscy8",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(a, {
                              __fromCanvasComponent: !0,
                              children: r(e, {
                                children: r("p", {
                                  className: "framer-styles-preset-1dts917",
                                  "data-styles-preset": "hgKudGhZ5",
                                  style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                  children: "Pricing",
                                }),
                              }),
                              className: "framer-1349gsx",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(a, {
                              __fromCanvasComponent: !0,
                              children: r(e, {
                                children: r("p", {
                                  className: "framer-styles-preset-1dts917",
                                  "data-styles-preset": "hgKudGhZ5",
                                  style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                  children: "Help",
                                }),
                              }),
                              className: "framer-yley2l",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(a, {
                              __fromCanvasComponent: !0,
                              children: r(e, {
                                children: r("p", {
                                  className: "framer-styles-preset-1dts917",
                                  "data-styles-preset": "hgKudGhZ5",
                                  style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                  children: "Careers",
                                }),
                              }),
                              className: "framer-4p5zij",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          ],
                        }),
                        i("div", {
                          className: "framer-1ax6aqa",
                          children: [
                            r(m, {
                              href: "x.com/framer",
                              children: r(t.a, {
                                className: "framer-ctrchz framer-188p3gy",
                                "data-framer-name": "X",
                                name: "X",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-1kxszn5",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 16.641 5 L 19.095 5 L 13.735 10.93 L 20.041 19 L 15.103 19 L 11.236 14.106 L 6.811 19 L 4.356 19 L 10.09 12.657 L 4.041 5 L 9.103 5 L 12.599 9.474 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                  svgContentId: 751603056,
                                  withExternalLayout: !0,
                                }),
                              }),
                            }),
                            r(m, {
                              href: "https://www.instagram.com/framer/",
                              children: r(t.a, {
                                className: "framer-1xtms84 framer-188p3gy",
                                "data-framer-name": "Instagram",
                                name: "Instagram",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-1u3eoid",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 4 8.667 C 4 6.089 6.089 4 8.667 4 L 15.333 4 C 17.911 4 20 6.089 20 8.667 L 20 15.333 C 20 17.911 17.911 20 15.333 20 L 8.667 20 C 6.089 20 4 17.911 4 15.333 Z M 15.333 7.333 C 15.322 7.817 15.574 8.268 15.991 8.513 C 16.408 8.758 16.924 8.758 17.341 8.513 C 17.758 8.269 18.01 7.817 17.999 7.334 C 17.983 6.609 17.391 6.03 16.667 6.03 C 15.942 6.03 15.35 6.609 15.333 7.333 Z M 8.667 12 C 8.667 13.841 10.16 15.334 12.001 15.333 C 13.842 15.333 15.334 13.84 15.334 11.999 C 15.334 10.158 13.841 8.666 12 8.666 C 10.159 8.666 8.666 10.159 8.667 12 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                  svgContentId: 1955731763,
                                  withExternalLayout: !0,
                                }),
                              }),
                            }),
                            r(m, {
                              href: "pinterest.com/framer_app/",
                              children: r(t.a, {
                                className: "framer-1mcok6k framer-188p3gy",
                                "data-framer-name": "Pinterest",
                                name: "Pinterest",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-182fpfn",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 12.001 4 C 7.582 4 4 7.582 4 11.999 C 4 15.276 5.97 18.09 8.789 19.327 C 8.765 18.768 8.784 18.098 8.927 17.491 C 9.082 16.841 9.957 13.131 9.957 13.131 C 9.957 13.131 9.702 12.62 9.702 11.865 C 9.702 10.679 10.389 9.794 11.244 9.794 C 11.973 9.794 12.323 10.341 12.323 10.995 C 12.323 11.726 11.857 12.821 11.618 13.834 C 11.417 14.683 12.043 15.375 12.879 15.375 C 14.396 15.375 15.417 13.428 15.417 11.122 C 15.417 9.369 14.236 8.056 12.088 8.056 C 9.661 8.056 8.15 9.866 8.15 11.887 C 8.15 12.584 8.354 13.076 8.677 13.456 C 8.824 13.631 8.845 13.702 8.791 13.902 C 8.753 14.049 8.665 14.404 8.628 14.544 C 8.575 14.747 8.411 14.819 8.228 14.745 C 7.11 14.288 6.59 13.065 6.59 11.688 C 6.59 9.416 8.507 6.691 12.307 6.691 C 15.362 6.691 17.373 8.901 17.373 11.273 C 17.373 14.412 15.627 16.757 13.055 16.757 C 12.191 16.757 11.379 16.289 11.101 15.759 C 11.101 15.759 10.636 17.603 10.538 17.958 C 10.368 18.574 10.036 19.192 9.733 19.672 C 10.469 19.89 11.233 20 12.001 20 C 16.419 20 20 16.418 20 11.999 C 20 7.582 16.419 4 12.001 4 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                  svgContentId: 2974317178,
                                  withExternalLayout: !0,
                                }),
                              }),
                            }),
                            r(m, {
                              href: "https://www.linkedin.com/company/framer",
                              children: r(t.a, {
                                className: "framer-1t5sjvk framer-188p3gy",
                                "data-framer-name": "LinkedIn",
                                name: "LinkedIn",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-ss1d9b",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 4 7 C 4 5.343 5.343 4 7 4 L 17 4 C 18.657 4 20 5.343 20 7 L 20 17 C 20 18.657 18.657 20 17 20 L 7 20 C 5.343 20 4 18.657 4 17 Z M 8.85 17.393 L 8.85 10.169 L 6.434 10.169 L 6.434 17.393 Z M 7.642 9.182 C 8.484 9.182 9.009 8.628 9.009 7.934 C 8.993 7.225 8.484 6.686 7.658 6.686 C 6.831 6.686 6.291 7.225 6.291 7.934 C 6.291 8.628 6.815 9.182 7.626 9.182 Z M 10.187 17.394 C 10.187 17.394 10.187 17.394 10.187 17.393 L 10.187 17.393 Z M 12.604 17.393 L 12.604 13.359 C 12.604 13.143 12.62 12.928 12.683 12.773 C 12.858 12.342 13.256 11.895 13.923 11.895 C 14.798 11.895 15.148 12.557 15.148 13.529 L 15.148 17.393 L 17.564 17.393 L 17.564 13.251 C 17.564 11.032 16.372 9.999 14.782 9.999 C 13.5 9.999 12.925 10.699 12.604 11.192 L 12.604 10.169 L 10.187 10.169 C 10.219 10.844 10.188 17.351 10.187 17.393 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                  svgContentId: 1509613750,
                                  withExternalLayout: !0,
                                }),
                              }),
                            }),
                            r(m, {
                              href: "https://www.tiktok.com/@framer",
                              children: r(t.a, {
                                className: "framer-u7m18r framer-188p3gy",
                                "data-framer-name": "TikTok",
                                name: "TikTok",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-1tcyaxq",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 17.631 7.136 C 17.514 7.077 17.401 7.012 17.29 6.941 C 16.97 6.733 16.676 6.488 16.415 6.211 C 15.763 5.478 15.519 4.734 15.429 4.213 L 15.433 4.213 C 15.358 3.78 15.389 3.501 15.394 3.501 L 12.421 3.501 L 12.421 14.79 C 12.421 14.942 12.421 15.092 12.415 15.24 C 12.415 15.258 12.413 15.275 12.412 15.295 C 12.412 15.303 12.412 15.311 12.41 15.32 L 12.41 15.326 C 12.346 16.149 11.87 16.886 11.14 17.294 C 10.765 17.503 10.342 17.613 9.91 17.613 C 8.526 17.613 7.403 16.503 7.403 15.134 C 7.403 13.764 8.526 12.655 9.91 12.655 C 10.173 12.654 10.433 12.695 10.682 12.775 L 10.686 9.802 C 9.156 9.608 7.614 10.051 6.432 11.024 C 5.919 11.462 5.489 11.983 5.159 12.566 C 5.033 12.779 4.56 13.632 4.503 15.018 C 4.467 15.805 4.707 16.62 4.822 16.956 L 4.822 16.964 C 4.894 17.162 5.173 17.839 5.629 18.409 C 5.996 18.867 6.43 19.269 6.916 19.602 L 6.916 19.595 L 6.923 19.602 C 8.362 20.563 9.958 20.5 9.958 20.5 C 10.234 20.489 11.159 20.5 12.21 20.011 C 13.375 19.468 14.038 18.661 14.038 18.661 C 14.462 18.178 14.799 17.628 15.035 17.034 C 15.304 16.34 15.394 15.507 15.394 15.174 L 15.394 9.184 C 15.43 9.206 15.91 9.518 15.91 9.518 C 15.91 9.518 16.602 9.953 17.681 10.237 C 18.456 10.439 19.499 10.481 19.499 10.481 L 19.499 7.583 C 19.133 7.622 18.391 7.508 17.631 7.136 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                  svgContentId: 3819758275,
                                  withExternalLayout: !0,
                                }),
                              }),
                            }),
                            r(m, {
                              href: "https://www.youtube.com/channel/UCW5gUZ7lKGrAbLOkHv2xfbw",
                              children: r(t.a, {
                                className: "framer-1tv5yu8 framer-188p3gy",
                                "data-framer-name": "YouTube",
                                name: "YouTube",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-169zkx7",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 23 12 C 23 12 23 15.487 22.54 17.158 C 22.285 18.082 21.544 18.804 20.595 19.052 C 18.88 19.5 12 19.5 12 19.5 C 12 19.5 5.12 19.5 3.405 19.052 C 2.456 18.803 1.715 18.082 1.46 17.158 C 1 15.487 1 12 1 12 C 1 12 1 8.513 1.46 6.842 C 1.715 5.918 2.456 5.197 3.405 4.948 C 5.12 4.5 12 4.5 12 4.5 C 12 4.5 18.88 4.5 20.595 4.948 C 21.544 5.197 22.285 5.918 22.54 6.842 C 22.998 8.513 23 12 23 12 Z M 9.798 14.359 C 9.798 14.742 10.21 14.983 10.543 14.795 L 14.738 12.436 C 15.078 12.245 15.078 11.756 14.738 11.564 L 10.543 9.205 C 10.21 9.018 9.798 9.259 9.798 9.641 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                  svgContentId: 3126663630,
                                  withExternalLayout: !0,
                                }),
                              }),
                            }),
                          ],
                        }),
                        r(a, {
                          __fromCanvasComponent: !0,
                          children: r(e, {
                            children: r("p", {
                              style: {
                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                "--framer-font-family":
                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                "--framer-font-size": "13px",
                                "--framer-font-weight": "500",
                                "--framer-letter-spacing": "-0.2px",
                                "--framer-text-alignment": "center",
                              },
                              children: "\xA9 2024 Your Company, Inc. All rights reserved.",
                            }),
                          }),
                          className: "framer-v4wv6d",
                          fonts: ["FS;Satoshi-medium"],
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                      ],
                    }),
                  }),
                  r("div", {
                    className: "framer-1dyem89",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: i("div", {
                      className: "framer-1kbsz1d",
                      "data-framer-name": "Footer Night",
                      name: "Footer Night",
                      children: [
                        r(c, {
                          className: "framer-v7sbwv-container",
                          children: r(s, {
                            height: "100%",
                            id: "veCBrXJCh",
                            layoutId: "veCBrXJCh",
                            QPpn2xZty: "rgb(0, 0, 0)",
                            style: { height: "100%", width: "100%" },
                            variant: "eEZGnfswo",
                            width: "100%",
                          }),
                        }),
                        i("div", {
                          className: "framer-ddsrol",
                          children: [
                            r(a, {
                              __fromCanvasComponent: !0,
                              children: r(e, {
                                children: r("p", {
                                  className: "framer-styles-preset-1dts917",
                                  "data-styles-preset": "hgKudGhZ5",
                                  style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                  children: "About",
                                }),
                              }),
                              className: "framer-1qo4fsd",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(a, {
                              __fromCanvasComponent: !0,
                              children: r(e, {
                                children: r("p", {
                                  className: "framer-styles-preset-1dts917",
                                  "data-styles-preset": "hgKudGhZ5",
                                  style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                  children: "Features",
                                }),
                              }),
                              className: "framer-15bqktz",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(a, {
                              __fromCanvasComponent: !0,
                              children: r(e, {
                                children: r("p", {
                                  className: "framer-styles-preset-1dts917",
                                  "data-styles-preset": "hgKudGhZ5",
                                  style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                  children: "Customers",
                                }),
                              }),
                              className: "framer-1ghze3g",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(a, {
                              __fromCanvasComponent: !0,
                              children: r(e, {
                                children: r("p", {
                                  className: "framer-styles-preset-1dts917",
                                  "data-styles-preset": "hgKudGhZ5",
                                  style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                  children: "Pricing",
                                }),
                              }),
                              className: "framer-126m4ng",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(a, {
                              __fromCanvasComponent: !0,
                              children: r(e, {
                                children: r("p", {
                                  className: "framer-styles-preset-1dts917",
                                  "data-styles-preset": "hgKudGhZ5",
                                  style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                  children: "Help",
                                }),
                              }),
                              className: "framer-4kadgj",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(a, {
                              __fromCanvasComponent: !0,
                              children: r(e, {
                                children: r("p", {
                                  className: "framer-styles-preset-1dts917",
                                  "data-styles-preset": "hgKudGhZ5",
                                  style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                  children: "Careers",
                                }),
                              }),
                              className: "framer-1tue64y",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          ],
                        }),
                        i("div", {
                          className: "framer-1xdwlka",
                          children: [
                            r(m, {
                              href: "x.com/framer",
                              children: r(t.a, {
                                className: "framer-17ootrj framer-188p3gy",
                                "data-framer-name": "X",
                                name: "X",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-17oehyp",
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
                            r(m, {
                              href: "https://www.instagram.com/framer/",
                              children: r(t.a, {
                                className: "framer-10g8zq1 framer-188p3gy",
                                "data-framer-name": "Instagram",
                                name: "Instagram",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-1mu4hu1",
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
                            r(m, {
                              href: "pinterest.com/framer_app/",
                              children: r(t.a, {
                                className: "framer-rxpdto framer-188p3gy",
                                "data-framer-name": "Pinterest",
                                name: "Pinterest",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-14m1zya",
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
                            r(m, {
                              href: "https://www.linkedin.com/company/framer",
                              children: r(t.a, {
                                className: "framer-1ajev33 framer-188p3gy",
                                "data-framer-name": "LinkedIn",
                                name: "LinkedIn",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-1bl8rwo",
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
                            r(m, {
                              href: "https://www.tiktok.com/@framer",
                              children: r(t.a, {
                                className: "framer-1etwa9t framer-188p3gy",
                                "data-framer-name": "TikTok",
                                name: "TikTok",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-5ra7qn",
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
                            r(m, {
                              href: "https://www.youtube.com/channel/UCW5gUZ7lKGrAbLOkHv2xfbw",
                              children: r(t.a, {
                                className: "framer-1ick7zd framer-188p3gy",
                                "data-framer-name": "YouTube",
                                name: "YouTube",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-1s9cv3i",
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
                        r(a, {
                          __fromCanvasComponent: !0,
                          children: r(e, {
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
                          className: "framer-2o2sak",
                          fonts: ["FS;Satoshi-medium"],
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                      ],
                    }),
                  }),
                  r("div", {
                    className: "framer-1tnrs0z",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: i("div", {
                      className: "framer-cbr82m",
                      "data-border": !0,
                      "data-framer-name": "Footer Day",
                      name: "Footer Day",
                      children: [
                        r(a, {
                          __fromCanvasComponent: !0,
                          children: r(e, {
                            children: r("p", {
                              style: {
                                "--font-selector": "RlM7U2F0b3NoaS1tZWRpdW0=",
                                "--framer-font-family":
                                  '"Satoshi", "Satoshi Placeholder", sans-serif',
                                "--framer-font-size": "13px",
                                "--framer-font-weight": "500",
                                "--framer-letter-spacing": "-0.2px",
                                "--framer-text-alignment": "center",
                              },
                              children: "\xA9 2024 Your Company, Inc. All rights reserved.",
                            }),
                          }),
                          className: "framer-17tdm64",
                          fonts: ["FS;Satoshi-medium"],
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        i("div", {
                          className: "framer-uvcmws",
                          children: [
                            r(m, {
                              href: "x.com/framer",
                              children: r(t.a, {
                                className: "framer-1ua6wql framer-188p3gy",
                                "data-framer-name": "X",
                                name: "X",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-1jb6qh3",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 16.641 5 L 19.095 5 L 13.735 10.93 L 20.041 19 L 15.103 19 L 11.236 14.106 L 6.811 19 L 4.356 19 L 10.09 12.657 L 4.041 5 L 9.103 5 L 12.599 9.474 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                  svgContentId: 751603056,
                                  withExternalLayout: !0,
                                }),
                              }),
                            }),
                            r(m, {
                              href: "https://www.instagram.com/framer/",
                              children: r(t.a, {
                                className: "framer-1afnzev framer-188p3gy",
                                "data-framer-name": "Instagram",
                                name: "Instagram",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-srzjpd",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 4 8.667 C 4 6.089 6.089 4 8.667 4 L 15.333 4 C 17.911 4 20 6.089 20 8.667 L 20 15.333 C 20 17.911 17.911 20 15.333 20 L 8.667 20 C 6.089 20 4 17.911 4 15.333 Z M 15.333 7.333 C 15.322 7.817 15.574 8.268 15.991 8.513 C 16.408 8.758 16.924 8.758 17.341 8.513 C 17.758 8.269 18.01 7.817 17.999 7.334 C 17.983 6.609 17.391 6.03 16.667 6.03 C 15.942 6.03 15.35 6.609 15.333 7.333 Z M 8.667 12 C 8.667 13.841 10.16 15.334 12.001 15.333 C 13.842 15.333 15.334 13.84 15.334 11.999 C 15.334 10.158 13.841 8.666 12 8.666 C 10.159 8.666 8.666 10.159 8.667 12 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                  svgContentId: 1955731763,
                                  withExternalLayout: !0,
                                }),
                              }),
                            }),
                            r(m, {
                              href: "pinterest.com/framer_app/",
                              children: r(t.a, {
                                className: "framer-60foie framer-188p3gy",
                                "data-framer-name": "Pinterest",
                                name: "Pinterest",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-1adjnaq",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 12.001 4 C 7.582 4 4 7.582 4 11.999 C 4 15.276 5.97 18.09 8.789 19.327 C 8.765 18.768 8.784 18.098 8.927 17.491 C 9.082 16.841 9.957 13.131 9.957 13.131 C 9.957 13.131 9.702 12.62 9.702 11.865 C 9.702 10.679 10.389 9.794 11.244 9.794 C 11.973 9.794 12.323 10.341 12.323 10.995 C 12.323 11.726 11.857 12.821 11.618 13.834 C 11.417 14.683 12.043 15.375 12.879 15.375 C 14.396 15.375 15.417 13.428 15.417 11.122 C 15.417 9.369 14.236 8.056 12.088 8.056 C 9.661 8.056 8.15 9.866 8.15 11.887 C 8.15 12.584 8.354 13.076 8.677 13.456 C 8.824 13.631 8.845 13.702 8.791 13.902 C 8.753 14.049 8.665 14.404 8.628 14.544 C 8.575 14.747 8.411 14.819 8.228 14.745 C 7.11 14.288 6.59 13.065 6.59 11.688 C 6.59 9.416 8.507 6.691 12.307 6.691 C 15.362 6.691 17.373 8.901 17.373 11.273 C 17.373 14.412 15.627 16.757 13.055 16.757 C 12.191 16.757 11.379 16.289 11.101 15.759 C 11.101 15.759 10.636 17.603 10.538 17.958 C 10.368 18.574 10.036 19.192 9.733 19.672 C 10.469 19.89 11.233 20 12.001 20 C 16.419 20 20 16.418 20 11.999 C 20 7.582 16.419 4 12.001 4 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                  svgContentId: 2974317178,
                                  withExternalLayout: !0,
                                }),
                              }),
                            }),
                            r(m, {
                              href: "https://www.linkedin.com/company/framer",
                              children: r(t.a, {
                                className: "framer-1o0izcp framer-188p3gy",
                                "data-framer-name": "LinkedIn",
                                name: "LinkedIn",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-73b812",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 4 7 C 4 5.343 5.343 4 7 4 L 17 4 C 18.657 4 20 5.343 20 7 L 20 17 C 20 18.657 18.657 20 17 20 L 7 20 C 5.343 20 4 18.657 4 17 Z M 8.85 17.393 L 8.85 10.169 L 6.434 10.169 L 6.434 17.393 Z M 7.642 9.182 C 8.484 9.182 9.009 8.628 9.009 7.934 C 8.993 7.225 8.484 6.686 7.658 6.686 C 6.831 6.686 6.291 7.225 6.291 7.934 C 6.291 8.628 6.815 9.182 7.626 9.182 Z M 10.187 17.394 C 10.187 17.394 10.187 17.394 10.187 17.393 L 10.187 17.393 Z M 12.604 17.393 L 12.604 13.359 C 12.604 13.143 12.62 12.928 12.683 12.773 C 12.858 12.342 13.256 11.895 13.923 11.895 C 14.798 11.895 15.148 12.557 15.148 13.529 L 15.148 17.393 L 17.564 17.393 L 17.564 13.251 C 17.564 11.032 16.372 9.999 14.782 9.999 C 13.5 9.999 12.925 10.699 12.604 11.192 L 12.604 10.169 L 10.187 10.169 C 10.219 10.844 10.188 17.351 10.187 17.393 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                  svgContentId: 1509613750,
                                  withExternalLayout: !0,
                                }),
                              }),
                            }),
                            r(m, {
                              href: "https://www.tiktok.com/@framer",
                              children: r(t.a, {
                                className: "framer-1mhn9hf framer-188p3gy",
                                "data-framer-name": "TikTok",
                                name: "TikTok",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-1bkn204",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 17.631 7.136 C 17.514 7.077 17.401 7.012 17.29 6.941 C 16.97 6.733 16.676 6.488 16.415 6.211 C 15.763 5.478 15.519 4.734 15.429 4.213 L 15.433 4.213 C 15.358 3.78 15.389 3.501 15.394 3.501 L 12.421 3.501 L 12.421 14.79 C 12.421 14.942 12.421 15.092 12.415 15.24 C 12.415 15.258 12.413 15.275 12.412 15.295 C 12.412 15.303 12.412 15.311 12.41 15.32 L 12.41 15.326 C 12.346 16.149 11.87 16.886 11.14 17.294 C 10.765 17.503 10.342 17.613 9.91 17.613 C 8.526 17.613 7.403 16.503 7.403 15.134 C 7.403 13.764 8.526 12.655 9.91 12.655 C 10.173 12.654 10.433 12.695 10.682 12.775 L 10.686 9.802 C 9.156 9.608 7.614 10.051 6.432 11.024 C 5.919 11.462 5.489 11.983 5.159 12.566 C 5.033 12.779 4.56 13.632 4.503 15.018 C 4.467 15.805 4.707 16.62 4.822 16.956 L 4.822 16.964 C 4.894 17.162 5.173 17.839 5.629 18.409 C 5.996 18.867 6.43 19.269 6.916 19.602 L 6.916 19.595 L 6.923 19.602 C 8.362 20.563 9.958 20.5 9.958 20.5 C 10.234 20.489 11.159 20.5 12.21 20.011 C 13.375 19.468 14.038 18.661 14.038 18.661 C 14.462 18.178 14.799 17.628 15.035 17.034 C 15.304 16.34 15.394 15.507 15.394 15.174 L 15.394 9.184 C 15.43 9.206 15.91 9.518 15.91 9.518 C 15.91 9.518 16.602 9.953 17.681 10.237 C 18.456 10.439 19.499 10.481 19.499 10.481 L 19.499 7.583 C 19.133 7.622 18.391 7.508 17.631 7.136 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                  svgContentId: 3819758275,
                                  withExternalLayout: !0,
                                }),
                              }),
                            }),
                            r(m, {
                              href: "https://www.youtube.com/channel/UCW5gUZ7lKGrAbLOkHv2xfbw",
                              children: r(t.a, {
                                className: "framer-1gwe339 framer-188p3gy",
                                "data-framer-name": "YouTube",
                                name: "YouTube",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-ygva3v",
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
                                  svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 23 12 C 23 12 23 15.487 22.54 17.158 C 22.285 18.082 21.544 18.804 20.595 19.052 C 18.88 19.5 12 19.5 12 19.5 C 12 19.5 5.12 19.5 3.405 19.052 C 2.456 18.803 1.715 18.082 1.46 17.158 C 1 15.487 1 12 1 12 C 1 12 1 8.513 1.46 6.842 C 1.715 5.918 2.456 5.197 3.405 4.948 C 5.12 4.5 12 4.5 12 4.5 C 12 4.5 18.88 4.5 20.595 4.948 C 21.544 5.197 22.285 5.918 22.54 6.842 C 22.998 8.513 23 12 23 12 Z M 9.798 14.359 C 9.798 14.742 10.21 14.983 10.543 14.795 L 14.738 12.436 C 15.078 12.245 15.078 11.756 14.738 11.564 L 10.543 9.205 C 10.21 9.018 9.798 9.259 9.798 9.641 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                  svgContentId: 3126663630,
                                  withExternalLayout: !0,
                                }),
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  r("div", {
                    className: "framer-1euxxti",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: i("div", {
                      className: "framer-1jwq8zx",
                      "data-border": !0,
                      "data-framer-name": "Footer Night",
                      name: "Footer Night",
                      children: [
                        r(a, {
                          __fromCanvasComponent: !0,
                          children: r(e, {
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
                          className: "framer-1x0l5fa",
                          fonts: ["FS;Satoshi-medium"],
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        i("div", {
                          className: "framer-1jo68ge",
                          children: [
                            r(m, {
                              href: "x.com/framer",
                              children: r(t.a, {
                                className: "framer-v0ezry framer-188p3gy",
                                "data-framer-name": "X",
                                name: "X",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-17xtpdc",
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
                            r(m, {
                              href: "https://www.instagram.com/framer/",
                              children: r(t.a, {
                                className: "framer-1py1npz framer-188p3gy",
                                "data-framer-name": "Instagram",
                                name: "Instagram",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-15115n6",
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
                            r(m, {
                              href: "pinterest.com/framer_app/",
                              children: r(t.a, {
                                className: "framer-whht22 framer-188p3gy",
                                "data-framer-name": "Pinterest",
                                name: "Pinterest",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-3oied0",
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
                            r(m, {
                              href: "https://www.linkedin.com/company/framer",
                              children: r(t.a, {
                                className: "framer-w9z5vu framer-188p3gy",
                                "data-framer-name": "LinkedIn",
                                name: "LinkedIn",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-1g31m5g",
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
                            r(m, {
                              href: "https://www.tiktok.com/@framer",
                              children: r(t.a, {
                                className: "framer-c090lx framer-188p3gy",
                                "data-framer-name": "TikTok",
                                name: "TikTok",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-344ywf",
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
                            r(m, {
                              href: "https://www.youtube.com/channel/UCW5gUZ7lKGrAbLOkHv2xfbw",
                              children: r(t.a, {
                                className: "framer-gg95be framer-188p3gy",
                                "data-framer-name": "YouTube",
                                name: "YouTube",
                                whileHover: n,
                                children: r(o, {
                                  className: "framer-144g9wf",
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
                  }),
                  r("div", {
                    className: "framer-12wu4dv",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: r("div", {
                      className: "framer-dzrj2n",
                      "data-framer-name": "Footer Complete Day",
                      name: "Footer Complete Day",
                      children: i("div", {
                        className: "framer-1p2dk03",
                        children: [
                          i("div", {
                            className: "framer-1n2n1ru",
                            children: [
                              i("div", {
                                className: "framer-lx8aev",
                                children: [
                                  r(c, {
                                    className: "framer-1pctykw-container",
                                    children: r(s, {
                                      height: "100%",
                                      id: "v7EWOfdeC",
                                      layoutId: "v7EWOfdeC",
                                      QPpn2xZty: "rgb(0, 0, 0)",
                                      style: { height: "100%", width: "100%" },
                                      variant: "eEZGnfswo",
                                      width: "100%",
                                    }),
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: {
                                          "--framer-text-alignment": "left",
                                          "--framer-text-color": "rgb(0, 0, 0)",
                                        },
                                        children:
                                          "Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your successes.",
                                      }),
                                    }),
                                    className: "framer-414qf4",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                ],
                              }),
                              i("div", {
                                className: "framer-fhvc5u",
                                children: [
                                  r(m, {
                                    href: "x.com/framer",
                                    children: r(t.a, {
                                      className: "framer-1v3h9o6 framer-188p3gy",
                                      "data-framer-name": "X",
                                      name: "X",
                                      whileHover: n,
                                      children: r(o, {
                                        className: "framer-al8d5e",
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
                                        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 16.641 5 L 19.095 5 L 13.735 10.93 L 20.041 19 L 15.103 19 L 11.236 14.106 L 6.811 19 L 4.356 19 L 10.09 12.657 L 4.041 5 L 9.103 5 L 12.599 9.474 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                        svgContentId: 751603056,
                                        withExternalLayout: !0,
                                      }),
                                    }),
                                  }),
                                  r(m, {
                                    href: "https://www.instagram.com/framer/",
                                    children: r(t.a, {
                                      className: "framer-l668p0 framer-188p3gy",
                                      "data-framer-name": "Instagram",
                                      name: "Instagram",
                                      whileHover: n,
                                      children: r(o, {
                                        className: "framer-1ljjrim",
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
                                        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 4 8.667 C 4 6.089 6.089 4 8.667 4 L 15.333 4 C 17.911 4 20 6.089 20 8.667 L 20 15.333 C 20 17.911 17.911 20 15.333 20 L 8.667 20 C 6.089 20 4 17.911 4 15.333 Z M 15.333 7.333 C 15.322 7.817 15.574 8.268 15.991 8.513 C 16.408 8.758 16.924 8.758 17.341 8.513 C 17.758 8.269 18.01 7.817 17.999 7.334 C 17.983 6.609 17.391 6.03 16.667 6.03 C 15.942 6.03 15.35 6.609 15.333 7.333 Z M 8.667 12 C 8.667 13.841 10.16 15.334 12.001 15.333 C 13.842 15.333 15.334 13.84 15.334 11.999 C 15.334 10.158 13.841 8.666 12 8.666 C 10.159 8.666 8.666 10.159 8.667 12 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                        svgContentId: 1955731763,
                                        withExternalLayout: !0,
                                      }),
                                    }),
                                  }),
                                  r(m, {
                                    href: "pinterest.com/framer_app/",
                                    children: r(t.a, {
                                      className: "framer-ntrs2v framer-188p3gy",
                                      "data-framer-name": "Pinterest",
                                      name: "Pinterest",
                                      whileHover: n,
                                      children: r(o, {
                                        className: "framer-1r5gfvz",
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
                                        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 12.001 4 C 7.582 4 4 7.582 4 11.999 C 4 15.276 5.97 18.09 8.789 19.327 C 8.765 18.768 8.784 18.098 8.927 17.491 C 9.082 16.841 9.957 13.131 9.957 13.131 C 9.957 13.131 9.702 12.62 9.702 11.865 C 9.702 10.679 10.389 9.794 11.244 9.794 C 11.973 9.794 12.323 10.341 12.323 10.995 C 12.323 11.726 11.857 12.821 11.618 13.834 C 11.417 14.683 12.043 15.375 12.879 15.375 C 14.396 15.375 15.417 13.428 15.417 11.122 C 15.417 9.369 14.236 8.056 12.088 8.056 C 9.661 8.056 8.15 9.866 8.15 11.887 C 8.15 12.584 8.354 13.076 8.677 13.456 C 8.824 13.631 8.845 13.702 8.791 13.902 C 8.753 14.049 8.665 14.404 8.628 14.544 C 8.575 14.747 8.411 14.819 8.228 14.745 C 7.11 14.288 6.59 13.065 6.59 11.688 C 6.59 9.416 8.507 6.691 12.307 6.691 C 15.362 6.691 17.373 8.901 17.373 11.273 C 17.373 14.412 15.627 16.757 13.055 16.757 C 12.191 16.757 11.379 16.289 11.101 15.759 C 11.101 15.759 10.636 17.603 10.538 17.958 C 10.368 18.574 10.036 19.192 9.733 19.672 C 10.469 19.89 11.233 20 12.001 20 C 16.419 20 20 16.418 20 11.999 C 20 7.582 16.419 4 12.001 4 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                        svgContentId: 2974317178,
                                        withExternalLayout: !0,
                                      }),
                                    }),
                                  }),
                                  r(m, {
                                    href: "https://www.linkedin.com/company/framer",
                                    children: r(t.a, {
                                      className: "framer-16diog7 framer-188p3gy",
                                      "data-framer-name": "LinkedIn",
                                      name: "LinkedIn",
                                      whileHover: n,
                                      children: r(o, {
                                        className: "framer-100k1v0",
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
                                        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 4 7 C 4 5.343 5.343 4 7 4 L 17 4 C 18.657 4 20 5.343 20 7 L 20 17 C 20 18.657 18.657 20 17 20 L 7 20 C 5.343 20 4 18.657 4 17 Z M 8.85 17.393 L 8.85 10.169 L 6.434 10.169 L 6.434 17.393 Z M 7.642 9.182 C 8.484 9.182 9.009 8.628 9.009 7.934 C 8.993 7.225 8.484 6.686 7.658 6.686 C 6.831 6.686 6.291 7.225 6.291 7.934 C 6.291 8.628 6.815 9.182 7.626 9.182 Z M 10.187 17.394 C 10.187 17.394 10.187 17.394 10.187 17.393 L 10.187 17.393 Z M 12.604 17.393 L 12.604 13.359 C 12.604 13.143 12.62 12.928 12.683 12.773 C 12.858 12.342 13.256 11.895 13.923 11.895 C 14.798 11.895 15.148 12.557 15.148 13.529 L 15.148 17.393 L 17.564 17.393 L 17.564 13.251 C 17.564 11.032 16.372 9.999 14.782 9.999 C 13.5 9.999 12.925 10.699 12.604 11.192 L 12.604 10.169 L 10.187 10.169 C 10.219 10.844 10.188 17.351 10.187 17.393 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                        svgContentId: 1509613750,
                                        withExternalLayout: !0,
                                      }),
                                    }),
                                  }),
                                  r(m, {
                                    href: "https://www.tiktok.com/@framer",
                                    children: r(t.a, {
                                      className: "framer-1bmrgnt framer-188p3gy",
                                      "data-framer-name": "TikTok",
                                      name: "TikTok",
                                      whileHover: n,
                                      children: r(o, {
                                        className: "framer-1ou6q0j",
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
                                        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 17.631 7.136 C 17.514 7.077 17.401 7.012 17.29 6.941 C 16.97 6.733 16.676 6.488 16.415 6.211 C 15.763 5.478 15.519 4.734 15.429 4.213 L 15.433 4.213 C 15.358 3.78 15.389 3.501 15.394 3.501 L 12.421 3.501 L 12.421 14.79 C 12.421 14.942 12.421 15.092 12.415 15.24 C 12.415 15.258 12.413 15.275 12.412 15.295 C 12.412 15.303 12.412 15.311 12.41 15.32 L 12.41 15.326 C 12.346 16.149 11.87 16.886 11.14 17.294 C 10.765 17.503 10.342 17.613 9.91 17.613 C 8.526 17.613 7.403 16.503 7.403 15.134 C 7.403 13.764 8.526 12.655 9.91 12.655 C 10.173 12.654 10.433 12.695 10.682 12.775 L 10.686 9.802 C 9.156 9.608 7.614 10.051 6.432 11.024 C 5.919 11.462 5.489 11.983 5.159 12.566 C 5.033 12.779 4.56 13.632 4.503 15.018 C 4.467 15.805 4.707 16.62 4.822 16.956 L 4.822 16.964 C 4.894 17.162 5.173 17.839 5.629 18.409 C 5.996 18.867 6.43 19.269 6.916 19.602 L 6.916 19.595 L 6.923 19.602 C 8.362 20.563 9.958 20.5 9.958 20.5 C 10.234 20.489 11.159 20.5 12.21 20.011 C 13.375 19.468 14.038 18.661 14.038 18.661 C 14.462 18.178 14.799 17.628 15.035 17.034 C 15.304 16.34 15.394 15.507 15.394 15.174 L 15.394 9.184 C 15.43 9.206 15.91 9.518 15.91 9.518 C 15.91 9.518 16.602 9.953 17.681 10.237 C 18.456 10.439 19.499 10.481 19.499 10.481 L 19.499 7.583 C 19.133 7.622 18.391 7.508 17.631 7.136 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                        svgContentId: 3819758275,
                                        withExternalLayout: !0,
                                      }),
                                    }),
                                  }),
                                  r(m, {
                                    href: "https://www.youtube.com/channel/UCW5gUZ7lKGrAbLOkHv2xfbw",
                                    children: r(t.a, {
                                      className: "framer-e8kby3 framer-188p3gy",
                                      "data-framer-name": "YouTube",
                                      name: "YouTube",
                                      whileHover: n,
                                      children: r(o, {
                                        className: "framer-1ldmmdx",
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
                                        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M 23 12 C 23 12 23 15.487 22.54 17.158 C 22.285 18.082 21.544 18.804 20.595 19.052 C 18.88 19.5 12 19.5 12 19.5 C 12 19.5 5.12 19.5 3.405 19.052 C 2.456 18.803 1.715 18.082 1.46 17.158 C 1 15.487 1 12 1 12 C 1 12 1 8.513 1.46 6.842 C 1.715 5.918 2.456 5.197 3.405 4.948 C 5.12 4.5 12 4.5 12 4.5 C 12 4.5 18.88 4.5 20.595 4.948 C 21.544 5.197 22.285 5.918 22.54 6.842 C 22.998 8.513 23 12 23 12 Z M 9.798 14.359 C 9.798 14.742 10.21 14.983 10.543 14.795 L 14.738 12.436 C 15.078 12.245 15.078 11.756 14.738 11.564 L 10.543 9.205 C 10.21 9.018 9.798 9.259 9.798 9.641 Z" fill="rgb(0, 0, 0)"></path></svg>',
                                        svgContentId: 3126663630,
                                        withExternalLayout: !0,
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          i("div", {
                            className: "framer-16iri5q",
                            children: [
                              i("div", {
                                className: "framer-6cyidk",
                                children: [
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
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
                                        },
                                        children: "Product",
                                      }),
                                    }),
                                    className: "framer-d3ff5u",
                                    fonts: ["FS;Satoshi-bold"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Features",
                                      }),
                                    }),
                                    className: "framer-15ohrsh",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Integrations",
                                      }),
                                    }),
                                    className: "framer-15uobu4",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Updates",
                                      }),
                                    }),
                                    className: "framer-1erwfql",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "FAQ",
                                      }),
                                    }),
                                    className: "framer-jua14l",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Pricing",
                                      }),
                                    }),
                                    className: "framer-13i6r7z",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                ],
                              }),
                              i("div", {
                                className: "framer-cm4cza",
                                children: [
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
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
                                        },
                                        children: "Company",
                                      }),
                                    }),
                                    className: "framer-1h5oztg",
                                    fonts: ["FS;Satoshi-bold"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "About",
                                      }),
                                    }),
                                    className: "framer-zl4be1",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Blog",
                                      }),
                                    }),
                                    className: "framer-5q6fb8",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Careers",
                                      }),
                                    }),
                                    className: "framer-140ms9q",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Manifesto",
                                      }),
                                    }),
                                    className: "framer-1ob98he",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Press",
                                      }),
                                    }),
                                    className: "framer-ljtk71",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Contact",
                                      }),
                                    }),
                                    className: "framer-8i6s6a",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                ],
                              }),
                              i("div", {
                                className: "framer-s1k8mw",
                                children: [
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
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
                                        },
                                        children: "Resources",
                                      }),
                                    }),
                                    className: "framer-fls5f6",
                                    fonts: ["FS;Satoshi-bold"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Examples",
                                      }),
                                    }),
                                    className: "framer-1vcsbuy",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Community",
                                      }),
                                    }),
                                    className: "framer-zbzaw1",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Guides",
                                      }),
                                    }),
                                    className: "framer-cquve8",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Docs",
                                      }),
                                    }),
                                    className: "framer-220a1k",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                ],
                              }),
                              i("div", {
                                className: "framer-1h9au2r",
                                children: [
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
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
                                        },
                                        children: "Legal",
                                      }),
                                    }),
                                    className: "framer-k9rxze",
                                    fonts: ["FS;Satoshi-bold"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Privacy",
                                      }),
                                    }),
                                    className: "framer-1e8x2iw",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Terms",
                                      }),
                                    }),
                                    className: "framer-1tqs3xg",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                        children: "Security",
                                      }),
                                    }),
                                    className: "framer-7wq0c",
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
                  }),
                  r("div", {
                    className: "framer-1lyl0w",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: r("div", {
                      className: "framer-1p80cxc",
                      "data-framer-name": "Footer Complete Night",
                      name: "Footer Complete Night",
                      children: i("div", {
                        className: "framer-1o5m4ld",
                        children: [
                          i("div", {
                            className: "framer-1rfwlh8",
                            children: [
                              i("div", {
                                className: "framer-1diqec3",
                                children: [
                                  r(c, {
                                    className: "framer-ec57vx-container",
                                    children: r(s, {
                                      height: "100%",
                                      id: "BTxtAHZz8",
                                      layoutId: "BTxtAHZz8",
                                      QPpn2xZty: "rgb(0, 0, 0)",
                                      style: { height: "100%", width: "100%" },
                                      variant: "eEZGnfswo",
                                      width: "100%",
                                    }),
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
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
                                    className: "framer-qpc2ma",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                ],
                              }),
                              i("div", {
                                className: "framer-49jwjv",
                                children: [
                                  r(m, {
                                    href: "x.com/framer",
                                    children: r(t.a, {
                                      className: "framer-4gj1ev framer-188p3gy",
                                      "data-framer-name": "X",
                                      name: "X",
                                      whileHover: n,
                                      children: r(o, {
                                        className: "framer-21zn92",
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
                                  r(m, {
                                    href: "https://www.instagram.com/framer/",
                                    children: r(t.a, {
                                      className: "framer-1n1b1j8 framer-188p3gy",
                                      "data-framer-name": "Instagram",
                                      name: "Instagram",
                                      whileHover: n,
                                      children: r(o, {
                                        className: "framer-ao8eow",
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
                                  r(m, {
                                    href: "pinterest.com/framer_app/",
                                    children: r(t.a, {
                                      className: "framer-12sh6y3 framer-188p3gy",
                                      "data-framer-name": "Pinterest",
                                      name: "Pinterest",
                                      whileHover: n,
                                      children: r(o, {
                                        className: "framer-5134d1",
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
                                  r(m, {
                                    href: "https://www.linkedin.com/company/framer",
                                    children: r(t.a, {
                                      className: "framer-diz2kx framer-188p3gy",
                                      "data-framer-name": "LinkedIn",
                                      name: "LinkedIn",
                                      whileHover: n,
                                      children: r(o, {
                                        className: "framer-e0z0rh",
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
                                  r(m, {
                                    href: "https://www.tiktok.com/@framer",
                                    children: r(t.a, {
                                      className: "framer-qcxpay framer-188p3gy",
                                      "data-framer-name": "TikTok",
                                      name: "TikTok",
                                      whileHover: n,
                                      children: r(o, {
                                        className: "framer-1vih93h",
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
                                  r(m, {
                                    href: "https://www.youtube.com/channel/UCW5gUZ7lKGrAbLOkHv2xfbw",
                                    children: r(t.a, {
                                      className: "framer-1qiig11 framer-188p3gy",
                                      "data-framer-name": "YouTube",
                                      name: "YouTube",
                                      whileHover: n,
                                      children: r(o, {
                                        className: "framer-jm10yl",
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
                          i("div", {
                            className: "framer-1hj4etg",
                            children: [
                              i("div", {
                                className: "framer-1e1idk3",
                                children: [
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
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
                                    className: "framer-10mnhxt",
                                    fonts: ["FS;Satoshi-bold"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Features",
                                      }),
                                    }),
                                    className: "framer-j34brc",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Integrations",
                                      }),
                                    }),
                                    className: "framer-12vaf62",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Updates",
                                      }),
                                    }),
                                    className: "framer-4gcxnn",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "FAQ",
                                      }),
                                    }),
                                    className: "framer-1utsbd7",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Pricing",
                                      }),
                                    }),
                                    className: "framer-mjp5wo",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                ],
                              }),
                              i("div", {
                                className: "framer-1053oz7",
                                children: [
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
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
                                    className: "framer-16ydcpv",
                                    fonts: ["FS;Satoshi-bold"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "About",
                                      }),
                                    }),
                                    className: "framer-1p809j9",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Blog",
                                      }),
                                    }),
                                    className: "framer-fmnuxl",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Careers",
                                      }),
                                    }),
                                    className: "framer-1ipfwq9",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Manifesto",
                                      }),
                                    }),
                                    className: "framer-c3nuq2",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Press",
                                      }),
                                    }),
                                    className: "framer-zpnqup",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Contact",
                                      }),
                                    }),
                                    className: "framer-137fiag",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                ],
                              }),
                              i("div", {
                                className: "framer-1bmut3z",
                                children: [
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
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
                                    className: "framer-2ovfk1",
                                    fonts: ["FS;Satoshi-bold"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Examples",
                                      }),
                                    }),
                                    className: "framer-15587ta",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Community",
                                      }),
                                    }),
                                    className: "framer-71oo99",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Guides",
                                      }),
                                    }),
                                    className: "framer-lq8lhr",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Docs",
                                      }),
                                    }),
                                    className: "framer-1l8mntx",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                ],
                              }),
                              i("div", {
                                className: "framer-1brqgcp",
                                children: [
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
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
                                    className: "framer-1k7kade",
                                    fonts: ["FS;Satoshi-bold"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Privacy",
                                      }),
                                    }),
                                    className: "framer-12p7dzb",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Terms",
                                      }),
                                    }),
                                    className: "framer-lugirt",
                                    verticalAlignment: "top",
                                    withExternalLayout: !0,
                                  }),
                                  r(a, {
                                    __fromCanvasComponent: !0,
                                    children: r(e, {
                                      children: r("p", {
                                        className: "framer-styles-preset-1dts917",
                                        "data-styles-preset": "hgKudGhZ5",
                                        style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                        children: "Security",
                                      }),
                                    }),
                                    className: "framer-1g8p6fo",
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
                  }),
                ],
              }),
            }),
            r("div", { className: u(S, ...Z), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  J = [
    '.framer-0ZNvo[data-border="true"]::after, .framer-0ZNvo [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-0ZNvo.framer-188p3gy, .framer-0ZNvo .framer-188p3gy { display: block; }",
    ".framer-0ZNvo.framer-i5tjj4 { --border-bottom-width: 1px; --border-color: rgba(173, 173, 173, 0.4); --border-left-width: 1px; --border-right-width: 1px; --border-style: dashed; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-0ZNvo .framer-cmv53e { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; max-width: 1600px; overflow: hidden; padding: 20px 20px 20px 20px; position: relative; width: 100%; }",
    '.framer-0ZNvo .framer-1wa4t1e, .framer-0ZNvo .framer-1dyem89, .framer-0ZNvo .framer-12wu4dv, .framer-0ZNvo .framer-1lyl0w { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }',
    ".framer-0ZNvo .framer-1xrndrm { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 1px; }",
    ".framer-0ZNvo .framer-1su6jlt-container, .framer-0ZNvo .framer-v7sbwv-container, .framer-0ZNvo .framer-1pctykw-container, .framer-0ZNvo .framer-ec57vx-container { flex: none; height: 40px; position: relative; width: 40px; }",
    ".framer-0ZNvo .framer-tzd3nb, .framer-0ZNvo .framer-ddsrol { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; opacity: 0.5; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 2; }",
    ".framer-0ZNvo .framer-bcoij7, .framer-0ZNvo .framer-10vrd7m, .framer-0ZNvo .framer-iuscy8, .framer-0ZNvo .framer-1349gsx, .framer-0ZNvo .framer-yley2l, .framer-0ZNvo .framer-4p5zij, .framer-0ZNvo .framer-1qo4fsd, .framer-0ZNvo .framer-15bqktz, .framer-0ZNvo .framer-1ghze3g, .framer-0ZNvo .framer-126m4ng, .framer-0ZNvo .framer-4kadgj, .framer-0ZNvo .framer-1tue64y, .framer-0ZNvo .framer-d3ff5u, .framer-0ZNvo .framer-1h5oztg, .framer-0ZNvo .framer-fls5f6, .framer-0ZNvo .framer-k9rxze, .framer-0ZNvo .framer-10mnhxt, .framer-0ZNvo .framer-16ydcpv, .framer-0ZNvo .framer-2ovfk1, .framer-0ZNvo .framer-1k7kade { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; cursor: pointer; flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-0ZNvo .framer-1ax6aqa, .framer-0ZNvo .framer-1xdwlka, .framer-0ZNvo .framer-uvcmws, .framer-0ZNvo .framer-1jo68ge, .framer-0ZNvo .framer-fhvc5u, .framer-0ZNvo .framer-49jwjv { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 2; }",
    ".framer-0ZNvo .framer-ctrchz, .framer-0ZNvo .framer-17ootrj, .framer-0ZNvo .framer-1ua6wql, .framer-0ZNvo .framer-v0ezry, .framer-0ZNvo .framer-1v3h9o6, .framer-0ZNvo .framer-4gj1ev { flex: none; height: 24px; opacity: 0.5; overflow: visible; position: relative; text-decoration: none; width: 24px; }",
    ".framer-0ZNvo .framer-1kxszn5, .framer-0ZNvo .framer-1u3eoid, .framer-0ZNvo .framer-182fpfn, .framer-0ZNvo .framer-169zkx7, .framer-0ZNvo .framer-17oehyp, .framer-0ZNvo .framer-1mu4hu1, .framer-0ZNvo .framer-14m1zya, .framer-0ZNvo .framer-1s9cv3i, .framer-0ZNvo .framer-1jb6qh3, .framer-0ZNvo .framer-srzjpd, .framer-0ZNvo .framer-1adjnaq, .framer-0ZNvo .framer-ygva3v, .framer-0ZNvo .framer-17xtpdc, .framer-0ZNvo .framer-15115n6, .framer-0ZNvo .framer-3oied0, .framer-0ZNvo .framer-144g9wf, .framer-0ZNvo .framer-al8d5e, .framer-0ZNvo .framer-1ljjrim, .framer-0ZNvo .framer-1r5gfvz, .framer-0ZNvo .framer-1ldmmdx, .framer-0ZNvo .framer-21zn92, .framer-0ZNvo .framer-ao8eow, .framer-0ZNvo .framer-5134d1, .framer-0ZNvo .framer-jm10yl { flex: none; height: 24px; left: calc(50.00000000000002% - 24px / 2); position: absolute; top: calc(50.00000000000002% - 24px / 2); width: 24px; }",
    ".framer-0ZNvo .framer-1xtms84, .framer-0ZNvo .framer-1mcok6k, .framer-0ZNvo .framer-1t5sjvk, .framer-0ZNvo .framer-u7m18r, .framer-0ZNvo .framer-1tv5yu8, .framer-0ZNvo .framer-10g8zq1, .framer-0ZNvo .framer-rxpdto, .framer-0ZNvo .framer-1ajev33, .framer-0ZNvo .framer-1etwa9t, .framer-0ZNvo .framer-1ick7zd, .framer-0ZNvo .framer-1afnzev, .framer-0ZNvo .framer-60foie, .framer-0ZNvo .framer-1o0izcp, .framer-0ZNvo .framer-1mhn9hf, .framer-0ZNvo .framer-1gwe339, .framer-0ZNvo .framer-1py1npz, .framer-0ZNvo .framer-whht22, .framer-0ZNvo .framer-w9z5vu, .framer-0ZNvo .framer-c090lx, .framer-0ZNvo .framer-gg95be, .framer-0ZNvo .framer-l668p0, .framer-0ZNvo .framer-ntrs2v, .framer-0ZNvo .framer-16diog7, .framer-0ZNvo .framer-1bmrgnt, .framer-0ZNvo .framer-e8kby3, .framer-0ZNvo .framer-1n1b1j8, .framer-0ZNvo .framer-12sh6y3, .framer-0ZNvo .framer-diz2kx, .framer-0ZNvo .framer-qcxpay, .framer-0ZNvo .framer-1qiig11 { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 24px); opacity: 0.5; overflow: visible; position: relative; text-decoration: none; width: 24px; }",
    ".framer-0ZNvo .framer-ss1d9b, .framer-0ZNvo .framer-1bl8rwo, .framer-0ZNvo .framer-73b812, .framer-0ZNvo .framer-1g31m5g, .framer-0ZNvo .framer-100k1v0, .framer-0ZNvo .framer-e0z0rh { flex: none; height: 24px; position: absolute; right: 0px; top: calc(50.00000000000002% - 24px / 2); width: 24px; }",
    ".framer-0ZNvo .framer-1tcyaxq, .framer-0ZNvo .framer-5ra7qn, .framer-0ZNvo .framer-1bkn204, .framer-0ZNvo .framer-344ywf, .framer-0ZNvo .framer-1ou6q0j, .framer-0ZNvo .framer-1vih93h { flex: none; height: 24px; left: calc(54.166666666666686% - 24px / 2); position: absolute; top: calc(50.00000000000002% - 24px / 2); width: 24px; }",
    ".framer-0ZNvo .framer-v4wv6d, .framer-0ZNvo .framer-2o2sak, .framer-0ZNvo .framer-17tdm64, .framer-0ZNvo .framer-1x0l5fa { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; opacity: 0.5; position: relative; white-space: pre; width: auto; }",
    ".framer-0ZNvo .framer-1kbsz1d { align-content: center; align-items: center; background-color: #000000; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 1px; }",
    '.framer-0ZNvo .framer-1tnrs0z { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; background-color: #ffffff; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 80px 0px 0px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }',
    '.framer-0ZNvo .framer-cbr82m { --border-bottom-width: 0px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */; --border-left-width: 0px; --border-right-width: 0px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; max-width: 1600px; overflow: hidden; padding: 40px 20px 40px 20px; position: relative; width: 100%; }',
    '.framer-0ZNvo .framer-1euxxti { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; background-color: #000000; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 80px 0px 0px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }',
    ".framer-0ZNvo .framer-1jwq8zx { --border-bottom-width: 0px; --border-color: rgba(255, 255, 255, 0.15); --border-left-width: 0px; --border-right-width: 0px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; max-width: 1600px; overflow: hidden; padding: 40px 20px 40px 20px; position: relative; width: 100%; }",
    ".framer-0ZNvo .framer-dzrj2n { align-content: flex-start; align-items: flex-start; background-color: #ffffff; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1px; }",
    ".framer-0ZNvo .framer-1p2dk03, .framer-0ZNvo .framer-1o5m4ld { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; max-width: 1600px; overflow: visible; padding: 80px 80px 80px 20px; position: relative; width: 1px; }",
    ".framer-0ZNvo .framer-1n2n1ru, .framer-0ZNvo .framer-1rfwlh8 { align-content: flex-start; align-items: flex-start; align-self: stretch; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; height: auto; justify-content: space-between; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-0ZNvo .framer-lx8aev, .framer-0ZNvo .framer-1diqec3 { align-content: flex-start; align-items: flex-start; align-self: stretch; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: auto; }",
    ".framer-0ZNvo .framer-414qf4, .framer-0ZNvo .framer-qpc2ma { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; opacity: 0.8; position: relative; white-space: pre-wrap; width: 290px; word-break: break-word; word-wrap: break-word; }",
    ".framer-0ZNvo .framer-16iri5q, .framer-0ZNvo .framer-1hj4etg { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 80px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-0ZNvo .framer-6cyidk, .framer-0ZNvo .framer-cm4cza, .framer-0ZNvo .framer-s1k8mw, .framer-0ZNvo .framer-1h9au2r, .framer-0ZNvo .framer-1e1idk3, .framer-0ZNvo .framer-1053oz7, .framer-0ZNvo .framer-1bmut3z, .framer-0ZNvo .framer-1brqgcp { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 2; }",
    ".framer-0ZNvo .framer-15ohrsh, .framer-0ZNvo .framer-15uobu4, .framer-0ZNvo .framer-1erwfql, .framer-0ZNvo .framer-jua14l, .framer-0ZNvo .framer-13i6r7z, .framer-0ZNvo .framer-zl4be1, .framer-0ZNvo .framer-5q6fb8, .framer-0ZNvo .framer-140ms9q, .framer-0ZNvo .framer-1ob98he, .framer-0ZNvo .framer-ljtk71, .framer-0ZNvo .framer-8i6s6a, .framer-0ZNvo .framer-1vcsbuy, .framer-0ZNvo .framer-zbzaw1, .framer-0ZNvo .framer-cquve8, .framer-0ZNvo .framer-220a1k, .framer-0ZNvo .framer-1e8x2iw, .framer-0ZNvo .framer-1tqs3xg, .framer-0ZNvo .framer-7wq0c, .framer-0ZNvo .framer-j34brc, .framer-0ZNvo .framer-12vaf62, .framer-0ZNvo .framer-4gcxnn, .framer-0ZNvo .framer-1utsbd7, .framer-0ZNvo .framer-mjp5wo, .framer-0ZNvo .framer-1p809j9, .framer-0ZNvo .framer-fmnuxl, .framer-0ZNvo .framer-1ipfwq9, .framer-0ZNvo .framer-c3nuq2, .framer-0ZNvo .framer-zpnqup, .framer-0ZNvo .framer-137fiag, .framer-0ZNvo .framer-15587ta, .framer-0ZNvo .framer-71oo99, .framer-0ZNvo .framer-lq8lhr, .framer-0ZNvo .framer-1l8mntx, .framer-0ZNvo .framer-12p7dzb, .framer-0ZNvo .framer-lugirt, .framer-0ZNvo .framer-1g8p6fo { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; cursor: pointer; flex: none; height: auto; opacity: 0.5; position: relative; white-space: pre; width: auto; }",
    ".framer-0ZNvo .framer-1p80cxc { align-content: flex-start; align-items: flex-start; background-color: #000000; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1px; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-0ZNvo.framer-i5tjj4, .framer-0ZNvo .framer-cmv53e, .framer-0ZNvo .framer-1wa4t1e, .framer-0ZNvo .framer-1xrndrm, .framer-0ZNvo .framer-tzd3nb, .framer-0ZNvo .framer-1ax6aqa, .framer-0ZNvo .framer-1dyem89, .framer-0ZNvo .framer-1kbsz1d, .framer-0ZNvo .framer-ddsrol, .framer-0ZNvo .framer-1xdwlka, .framer-0ZNvo .framer-1tnrs0z, .framer-0ZNvo .framer-uvcmws, .framer-0ZNvo .framer-1euxxti, .framer-0ZNvo .framer-1jo68ge, .framer-0ZNvo .framer-12wu4dv, .framer-0ZNvo .framer-dzrj2n, .framer-0ZNvo .framer-lx8aev, .framer-0ZNvo .framer-fhvc5u, .framer-0ZNvo .framer-16iri5q, .framer-0ZNvo .framer-6cyidk, .framer-0ZNvo .framer-cm4cza, .framer-0ZNvo .framer-s1k8mw, .framer-0ZNvo .framer-1h9au2r, .framer-0ZNvo .framer-1lyl0w, .framer-0ZNvo .framer-1p80cxc, .framer-0ZNvo .framer-1diqec3, .framer-0ZNvo .framer-49jwjv, .framer-0ZNvo .framer-1hj4etg, .framer-0ZNvo .framer-1e1idk3, .framer-0ZNvo .framer-1053oz7, .framer-0ZNvo .framer-1bmut3z, .framer-0ZNvo .framer-1brqgcp { gap: 0px; } .framer-0ZNvo.framer-i5tjj4 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-0ZNvo.framer-i5tjj4 > :first-child, .framer-0ZNvo .framer-cmv53e > :first-child, .framer-0ZNvo .framer-1xrndrm > :first-child, .framer-0ZNvo .framer-1kbsz1d > :first-child, .framer-0ZNvo .framer-1tnrs0z > :first-child, .framer-0ZNvo .framer-1euxxti > :first-child, .framer-0ZNvo .framer-lx8aev > :first-child, .framer-0ZNvo .framer-6cyidk > :first-child, .framer-0ZNvo .framer-cm4cza > :first-child, .framer-0ZNvo .framer-s1k8mw > :first-child, .framer-0ZNvo .framer-1h9au2r > :first-child, .framer-0ZNvo .framer-1diqec3 > :first-child, .framer-0ZNvo .framer-1e1idk3 > :first-child, .framer-0ZNvo .framer-1053oz7 > :first-child, .framer-0ZNvo .framer-1bmut3z > :first-child, .framer-0ZNvo .framer-1brqgcp > :first-child { margin-top: 0px; } .framer-0ZNvo.framer-i5tjj4 > :last-child, .framer-0ZNvo .framer-cmv53e > :last-child, .framer-0ZNvo .framer-1xrndrm > :last-child, .framer-0ZNvo .framer-1kbsz1d > :last-child, .framer-0ZNvo .framer-1tnrs0z > :last-child, .framer-0ZNvo .framer-1euxxti > :last-child, .framer-0ZNvo .framer-lx8aev > :last-child, .framer-0ZNvo .framer-6cyidk > :last-child, .framer-0ZNvo .framer-cm4cza > :last-child, .framer-0ZNvo .framer-s1k8mw > :last-child, .framer-0ZNvo .framer-1h9au2r > :last-child, .framer-0ZNvo .framer-1diqec3 > :last-child, .framer-0ZNvo .framer-1e1idk3 > :last-child, .framer-0ZNvo .framer-1053oz7 > :last-child, .framer-0ZNvo .framer-1bmut3z > :last-child, .framer-0ZNvo .framer-1brqgcp > :last-child { margin-bottom: 0px; } .framer-0ZNvo .framer-cmv53e > *, .framer-0ZNvo .framer-lx8aev > *, .framer-0ZNvo .framer-6cyidk > *, .framer-0ZNvo .framer-cm4cza > *, .framer-0ZNvo .framer-s1k8mw > *, .framer-0ZNvo .framer-1h9au2r > *, .framer-0ZNvo .framer-1diqec3 > *, .framer-0ZNvo .framer-1e1idk3 > *, .framer-0ZNvo .framer-1053oz7 > *, .framer-0ZNvo .framer-1bmut3z > *, .framer-0ZNvo .framer-1brqgcp > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-0ZNvo .framer-1wa4t1e > *, .framer-0ZNvo .framer-1dyem89 > *, .framer-0ZNvo .framer-12wu4dv > *, .framer-0ZNvo .framer-1lyl0w > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-0ZNvo .framer-1wa4t1e > :first-child, .framer-0ZNvo .framer-tzd3nb > :first-child, .framer-0ZNvo .framer-1ax6aqa > :first-child, .framer-0ZNvo .framer-1dyem89 > :first-child, .framer-0ZNvo .framer-ddsrol > :first-child, .framer-0ZNvo .framer-1xdwlka > :first-child, .framer-0ZNvo .framer-uvcmws > :first-child, .framer-0ZNvo .framer-1jo68ge > :first-child, .framer-0ZNvo .framer-12wu4dv > :first-child, .framer-0ZNvo .framer-dzrj2n > :first-child, .framer-0ZNvo .framer-fhvc5u > :first-child, .framer-0ZNvo .framer-16iri5q > :first-child, .framer-0ZNvo .framer-1lyl0w > :first-child, .framer-0ZNvo .framer-1p80cxc > :first-child, .framer-0ZNvo .framer-49jwjv > :first-child, .framer-0ZNvo .framer-1hj4etg > :first-child { margin-left: 0px; } .framer-0ZNvo .framer-1wa4t1e > :last-child, .framer-0ZNvo .framer-tzd3nb > :last-child, .framer-0ZNvo .framer-1ax6aqa > :last-child, .framer-0ZNvo .framer-1dyem89 > :last-child, .framer-0ZNvo .framer-ddsrol > :last-child, .framer-0ZNvo .framer-1xdwlka > :last-child, .framer-0ZNvo .framer-uvcmws > :last-child, .framer-0ZNvo .framer-1jo68ge > :last-child, .framer-0ZNvo .framer-12wu4dv > :last-child, .framer-0ZNvo .framer-dzrj2n > :last-child, .framer-0ZNvo .framer-fhvc5u > :last-child, .framer-0ZNvo .framer-16iri5q > :last-child, .framer-0ZNvo .framer-1lyl0w > :last-child, .framer-0ZNvo .framer-1p80cxc > :last-child, .framer-0ZNvo .framer-49jwjv > :last-child, .framer-0ZNvo .framer-1hj4etg > :last-child { margin-right: 0px; } .framer-0ZNvo .framer-1xrndrm > *, .framer-0ZNvo .framer-1kbsz1d > *, .framer-0ZNvo .framer-1tnrs0z > *, .framer-0ZNvo .framer-1euxxti > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-0ZNvo .framer-tzd3nb > *, .framer-0ZNvo .framer-ddsrol > * { margin: 0px; margin-left: calc(30px / 2); margin-right: calc(30px / 2); } .framer-0ZNvo .framer-1ax6aqa > *, .framer-0ZNvo .framer-1xdwlka > *, .framer-0ZNvo .framer-uvcmws > *, .framer-0ZNvo .framer-1jo68ge > *, .framer-0ZNvo .framer-fhvc5u > *, .framer-0ZNvo .framer-49jwjv > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } .framer-0ZNvo .framer-dzrj2n > *, .framer-0ZNvo .framer-1p80cxc > * { margin: 0px; margin-left: calc(60px / 2); margin-right: calc(60px / 2); } .framer-0ZNvo .framer-16iri5q > *, .framer-0ZNvo .framer-1hj4etg > * { margin: 0px; margin-left: calc(80px / 2); margin-right: calc(80px / 2); } }",
    "@media (min-width: 1200px) { .framer-0ZNvo .hidden-i5tjj4 { display: none !important; } }",
    "@media (min-width: 810px) and (max-width: 1199px) { .framer-0ZNvo .hidden-1aithxi { display: none !important; } .framer-0ZNvo.framer-i5tjj4 { width: 810px; } .framer-0ZNvo .framer-1p2dk03 { flex-direction: column; gap: 40px; justify-content: flex-start; } .framer-0ZNvo .framer-1n2n1ru, .framer-0ZNvo .framer-1rfwlh8 { align-self: unset; gap: 30px; height: min-content; justify-content: flex-start; width: 100%; } .framer-0ZNvo .framer-lx8aev { align-self: unset; width: 100%; } .framer-0ZNvo .framer-16iri5q, .framer-0ZNvo .framer-1hj4etg { gap: unset; justify-content: space-between; width: 100%; } .framer-0ZNvo .framer-1o5m4ld { align-content: flex-start; align-items: flex-start; flex-direction: column; gap: 40px; justify-content: flex-start; } .framer-0ZNvo .framer-1diqec3 { align-self: unset; width: 288px; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-0ZNvo .framer-1p2dk03, .framer-0ZNvo .framer-1n2n1ru, .framer-0ZNvo .framer-16iri5q, .framer-0ZNvo .framer-1o5m4ld, .framer-0ZNvo .framer-1rfwlh8, .framer-0ZNvo .framer-1hj4etg { gap: 0px; } .framer-0ZNvo .framer-1p2dk03 > *, .framer-0ZNvo .framer-1o5m4ld > * { margin: 0px; margin-bottom: calc(40px / 2); margin-top: calc(40px / 2); } .framer-0ZNvo .framer-1p2dk03 > :first-child, .framer-0ZNvo .framer-1n2n1ru > :first-child, .framer-0ZNvo .framer-1o5m4ld > :first-child, .framer-0ZNvo .framer-1rfwlh8 > :first-child { margin-top: 0px; } .framer-0ZNvo .framer-1p2dk03 > :last-child, .framer-0ZNvo .framer-1n2n1ru > :last-child, .framer-0ZNvo .framer-1o5m4ld > :last-child, .framer-0ZNvo .framer-1rfwlh8 > :last-child { margin-bottom: 0px; } .framer-0ZNvo .framer-1n2n1ru > *, .framer-0ZNvo .framer-1rfwlh8 > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-0ZNvo .framer-16iri5q > *, .framer-0ZNvo .framer-16iri5q > :first-child, .framer-0ZNvo .framer-16iri5q > :last-child, .framer-0ZNvo .framer-1hj4etg > *, .framer-0ZNvo .framer-1hj4etg > :first-child, .framer-0ZNvo .framer-1hj4etg > :last-child { margin: 0px; } }}",
    "@media (max-width: 809px) { .framer-0ZNvo .hidden-qan2ri { display: none !important; } .framer-0ZNvo.framer-i5tjj4 { width: 390px; } .framer-0ZNvo .framer-1xrndrm, .framer-0ZNvo .framer-1kbsz1d, .framer-0ZNvo .framer-1tnrs0z, .framer-0ZNvo .framer-1euxxti { padding: 40px 20px 40px 20px; } .framer-0ZNvo .framer-tzd3nb { flex-direction: column; flex-wrap: wrap; gap: 20px; width: 100%; } .framer-0ZNvo .framer-1ax6aqa, .framer-0ZNvo .framer-1xdwlka { flex-wrap: wrap; max-width: 190px; width: 100%; } .framer-0ZNvo .framer-ddsrol { flex-direction: column; gap: 20px; width: 100%; } .framer-0ZNvo .framer-cbr82m, .framer-0ZNvo .framer-1jwq8zx { flex-direction: column; gap: 30px; justify-content: flex-start; } .framer-0ZNvo .framer-17tdm64, .framer-0ZNvo .framer-1x0l5fa { max-width: 170px; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; } .framer-0ZNvo .framer-uvcmws, .framer-0ZNvo .framer-1jo68ge { flex-wrap: wrap; gap: 10px; width: 100%; } .framer-0ZNvo .framer-dzrj2n, .framer-0ZNvo .framer-1p80cxc { padding: 20px 20px 20px 20px; } .framer-0ZNvo .framer-1p2dk03, .framer-0ZNvo .framer-1o5m4ld { flex-direction: column; gap: 40px; justify-content: flex-start; } .framer-0ZNvo .framer-1n2n1ru { align-self: unset; gap: 20px; height: min-content; justify-content: center; width: 100%; } .framer-0ZNvo .framer-lx8aev, .framer-0ZNvo .framer-1diqec3 { align-self: unset; width: 100%; } .framer-0ZNvo .framer-414qf4, .framer-0ZNvo .framer-qpc2ma { width: 100%; } .framer-0ZNvo .framer-fhvc5u { flex-wrap: wrap; justify-content: flex-start; width: 100%; } .framer-0ZNvo .framer-16iri5q, .framer-0ZNvo .framer-1hj4etg { flex-direction: column; gap: 30px; width: 100%; } .framer-0ZNvo .framer-1rfwlh8 { align-self: unset; gap: 20px; height: min-content; justify-content: flex-start; width: 100%; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-0ZNvo .framer-tzd3nb, .framer-0ZNvo .framer-ddsrol, .framer-0ZNvo .framer-cbr82m, .framer-0ZNvo .framer-uvcmws, .framer-0ZNvo .framer-1jwq8zx, .framer-0ZNvo .framer-1jo68ge, .framer-0ZNvo .framer-1p2dk03, .framer-0ZNvo .framer-1n2n1ru, .framer-0ZNvo .framer-16iri5q, .framer-0ZNvo .framer-1o5m4ld, .framer-0ZNvo .framer-1rfwlh8, .framer-0ZNvo .framer-1hj4etg { gap: 0px; } .framer-0ZNvo .framer-tzd3nb > *, .framer-0ZNvo .framer-ddsrol > *, .framer-0ZNvo .framer-1n2n1ru > *, .framer-0ZNvo .framer-1rfwlh8 > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-0ZNvo .framer-tzd3nb > :first-child, .framer-0ZNvo .framer-ddsrol > :first-child, .framer-0ZNvo .framer-cbr82m > :first-child, .framer-0ZNvo .framer-1jwq8zx > :first-child, .framer-0ZNvo .framer-1p2dk03 > :first-child, .framer-0ZNvo .framer-1n2n1ru > :first-child, .framer-0ZNvo .framer-16iri5q > :first-child, .framer-0ZNvo .framer-1o5m4ld > :first-child, .framer-0ZNvo .framer-1rfwlh8 > :first-child, .framer-0ZNvo .framer-1hj4etg > :first-child { margin-top: 0px; } .framer-0ZNvo .framer-tzd3nb > :last-child, .framer-0ZNvo .framer-ddsrol > :last-child, .framer-0ZNvo .framer-cbr82m > :last-child, .framer-0ZNvo .framer-1jwq8zx > :last-child, .framer-0ZNvo .framer-1p2dk03 > :last-child, .framer-0ZNvo .framer-1n2n1ru > :last-child, .framer-0ZNvo .framer-16iri5q > :last-child, .framer-0ZNvo .framer-1o5m4ld > :last-child, .framer-0ZNvo .framer-1rfwlh8 > :last-child, .framer-0ZNvo .framer-1hj4etg > :last-child { margin-bottom: 0px; } .framer-0ZNvo .framer-cbr82m > *, .framer-0ZNvo .framer-1jwq8zx > *, .framer-0ZNvo .framer-16iri5q > *, .framer-0ZNvo .framer-1hj4etg > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-0ZNvo .framer-uvcmws > *, .framer-0ZNvo .framer-1jo68ge > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-0ZNvo .framer-uvcmws > :first-child, .framer-0ZNvo .framer-1jo68ge > :first-child { margin-left: 0px; } .framer-0ZNvo .framer-uvcmws > :last-child, .framer-0ZNvo .framer-1jo68ge > :last-child { margin-right: 0px; } .framer-0ZNvo .framer-1p2dk03 > *, .framer-0ZNvo .framer-1o5m4ld > * { margin: 0px; margin-bottom: calc(40px / 2); margin-top: calc(40px / 2); } }}",
    ...G,
  ],
  g = z(O, J, "framer-0ZNvo"),
  pr = g;
g.displayName = "Navigation";
g.defaultProps = { height: 2010, width: 1200 };
M(g, [
  {
    family: "Satoshi",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2",
    weight: "500",
  },
  {
    family: "Satoshi",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2",
    weight: "700",
  },
  ...W,
  ...A,
]);
var gr = {
  exports: {
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    default: {
      type: "reactComponent",
      name: "FramerCuGpkj3X2",
      slots: [],
      annotations: {
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"PoN9_ILLv":{"layout":["fixed","auto"]},"uZogHe6Ps":{"layout":["fixed","auto"]}}}',
        framerIntrinsicWidth: "1200",
        framerContractVersion: "1",
        framerDisplayContentsDiv: "false",
        framerImmutableVariables: "true",
        framerIntrinsicHeight: "2010",
        framerResponsiveScreen: "",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
export { gr as __FramerMetadata__, pr as default };
//# sourceMappingURL=WZi6r9auUu1a0208Um8YrOaGJZj9RDV15_AypGIJegM.NO3VRWTA.mjs.map
