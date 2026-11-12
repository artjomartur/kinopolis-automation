import { a as H } from "./chunk-MM6F6CF6.mjs";
import { a as s } from "./chunk-APG5SWKV.mjs";
import { a as p } from "./chunk-ARQDWR4D.mjs";
import { d as a } from "./chunk-G5VSNPDD.mjs";
import "./chunk-PBG357LN.mjs";
import { a as v } from "./chunk-CVPCFDSR.mjs";
import "./chunk-G7RZZ2HZ.mjs";
import "./chunk-D5FMDQUG.mjs";
import "./chunk-5SAWWLB7.mjs";
import { b as r, c } from "./chunk-OO3TPEBQ.mjs";
import {
  K as C,
  V as u,
  Y as e,
  Z as U,
  _ as q,
  aa as L,
  da as d,
  g as N,
  l as k,
  m as I,
  ma as W,
  o as P,
  t as D,
  ta as _,
  v as z,
  va as G,
  wa as m,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var A = m(s),
  F = m(p),
  X = m(a),
  K = m(v);
var M = {
    dDig19UHR: "(max-width: 809px)",
    Mbf1_hgfc: "(min-width: 1200px)",
    peuk17qsa: "(min-width: 810px) and (max-width: 1199px)",
  },
  E = () => typeof document < "u",
  R = "framer-wH5cx",
  T = { dDig19UHR: "framer-v-3i4mum", Mbf1_hgfc: "framer-v-uno1a6", peuk17qsa: "framer-v-sjjj9v" },
  S = { default: { duration: 0 } },
  wr = H(),
  Z = { Desktop: "Mbf1_hgfc", Phone: "dDig19UHR", Tablet: "peuk17qsa" },
  Q = ({ height: y, id: f, width: h, ...l }) => {
    var i, o;
    return {
      ...l,
      variant:
        (o = (i = Z[l.variant]) !== null && i !== void 0 ? i : l.variant) !== null && o !== void 0
          ? o
          : "Mbf1_hgfc",
    };
  },
  $ = N(function (y, f) {
    let { activeLocale: h, setLocale: l } = C(),
      { style: i, className: o, layoutId: w, variant: B, ...V } = Q(y);
    I(() => {
      let t = H(void 0, h);
      if (((document.title = t.title || ""), t.viewport)) {
        var g;
        (g = document.querySelector('meta[name="viewport"]')) === null ||
          g === void 0 ||
          g.setAttribute("content", t.viewport);
      }
      if (t.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((b) => b.startsWith("framer-body-"))
            .map((b) => document.body.classList.remove(b)),
          document.body.classList.add(`${t.bodyClassName}-framer-wH5cx`),
          () => {
            document.body.classList.remove(`${t.bodyClassName}-framer-wH5cx`);
          }
        );
    }, [void 0, h]);
    let [n, er] = W(B, M, !1),
      ar = void 0,
      tr = S.default,
      O = P(null),
      Y = () => (n === "dDig19UHR" ? !E() : !0),
      J = k(),
      j = [];
    return (
      q({}),
      r(L.Provider, {
        value: { primaryVariantId: "Mbf1_hgfc", variantClassNames: T },
        children: c(z, {
          id: w ?? J,
          children: [
            r(D.div, {
              ...V,
              className: u(R, ...j, "framer-uno1a6", o),
              "data-border": !0,
              ref: f ?? O,
              style: { ...i },
              children: c("div", {
                className: "framer-1vjeuuu",
                "data-framer-name": "Wrapper",
                name: "Wrapper",
                children: [
                  c("div", {
                    className: "framer-1dbrwt5",
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: [
                      r("div", {
                        className: "framer-1mgj4t8",
                        "data-border": !0,
                        "data-framer-name": "Border",
                        name: "Border",
                      }),
                      r(e, {
                        className: "framer-1b778m6-container",
                        children: r(d, {
                          breakpoint: n,
                          overrides: { dDig19UHR: { variant: "onuwv4s61" } },
                          children: r(s, {
                            height: "100%",
                            id: "qBKUWGhZL",
                            JU5116W8C: "PqgBulBPi",
                            layoutId: "qBKUWGhZL",
                            LylWg8UG8: 0,
                            oqrd6d5I6: "rgb(255, 255, 255)",
                            style: { width: "100%" },
                            Tyvh_HtHO: "rgb(0, 0, 0)",
                            variant: "J7TtQthx_",
                            width: "100%",
                          }),
                        }),
                      }),
                    ],
                  }),
                  r("div", {
                    className: "framer-1nstv4n",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: r(e, {
                      className: "framer-1ea530u-container",
                      children: r(d, {
                        breakpoint: n,
                        overrides: { dDig19UHR: { variant: "onuwv4s61" } },
                        children: r(s, {
                          height: "100%",
                          id: "n_U31Pcgi",
                          JU5116W8C: "zb8n5Cev9",
                          layoutId: "n_U31Pcgi",
                          LylWg8UG8: 0,
                          oqrd6d5I6: "rgb(0, 0, 0)",
                          style: { width: "100%" },
                          Tyvh_HtHO: "rgb(255, 255, 255)",
                          variant: "J7TtQthx_",
                          width: "100%",
                        }),
                      }),
                    }),
                  }),
                  r("div", {
                    className: "framer-1x359t5",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: r(e, {
                      className: "framer-1aqb3ty-container",
                      children: r(d, {
                        breakpoint: n,
                        overrides: { dDig19UHR: { variant: "DlpJpKBvt" } },
                        children: r(p, {
                          G7Ppt7M52: "rgb(247, 247, 247)",
                          height: "100%",
                          icf8yPK44: 0,
                          id: "VD_eVz1Yi",
                          layoutId: "VD_eVz1Yi",
                          O2GRK6A3O: "PqgBulBPi",
                          style: { width: "100%" },
                          upiCzNseE: "rgb(0, 0, 0)",
                          variant: "yIJukhzj6",
                          width: "100%",
                          XRn7LO2VY: "rgb(255, 255, 255)",
                        }),
                      }),
                    }),
                  }),
                  r("div", {
                    className: "framer-m0h3wm",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: r(e, {
                      className: "framer-r67h3b-container",
                      children: r(d, {
                        breakpoint: n,
                        overrides: { dDig19UHR: { variant: "DlpJpKBvt" } },
                        children: r(p, {
                          G7Ppt7M52: "rgb(36, 36, 36)",
                          height: "100%",
                          icf8yPK44: 0,
                          id: "cl6_c3NU8",
                          layoutId: "cl6_c3NU8",
                          O2GRK6A3O: "zb8n5Cev9",
                          style: { width: "100%" },
                          upiCzNseE: "rgb(255, 255, 255)",
                          variant: "yIJukhzj6",
                          width: "100%",
                          XRn7LO2VY: "rgb(0, 0, 0)",
                        }),
                      }),
                    }),
                  }),
                  Y() &&
                    r(_, {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 4e3,
                        intrinsicWidth: 6e3,
                        pixelHeight: 4e3,
                        pixelWidth: 6e3,
                        sizes: "calc(min(100vw, 1600px) - 40px)",
                        src: "https://framerusercontent.com/images/3WEvGDPYIjPq0U4mObtmvw89eo.jpg",
                        srcSet:
                          "https://framerusercontent.com/images/3WEvGDPYIjPq0U4mObtmvw89eo.jpg?scale-down-to=512 512w, https://framerusercontent.com/images/3WEvGDPYIjPq0U4mObtmvw89eo.jpg?scale-down-to=1024 1024w, https://framerusercontent.com/images/3WEvGDPYIjPq0U4mObtmvw89eo.jpg?scale-down-to=2048 2048w, https://framerusercontent.com/images/3WEvGDPYIjPq0U4mObtmvw89eo.jpg?scale-down-to=4096 4096w, https://framerusercontent.com/images/3WEvGDPYIjPq0U4mObtmvw89eo.jpg 6000w",
                      },
                      className: "framer-bkh26a hidden-3i4mum",
                      "data-border": !0,
                      "data-framer-name": "Wrapper",
                      name: "Wrapper",
                      children: r("div", {
                        className: "framer-3j4xv5",
                        "data-framer-name": "Nav Floating",
                        name: "Nav Floating",
                        children: c("div", {
                          className: "framer-1ht9dl7",
                          children: [
                            r(e, {
                              className: "framer-lrb1zy-container",
                              children: r(a, {
                                Dl6AiX37G: "rgb(0, 0, 0)",
                                height: "100%",
                                id: "JeGHVLsXE",
                                kcKdHX2wm: "Säle & Technik",
                                layoutId: "JeGHVLsXE",
                                variant: "AY2iJjz0z",
                                width: "100%",
                              }),
                            }),
                            r(e, {
                              className: "framer-1qxn4gp-container",
                              children: r(a, {
                                Dl6AiX37G: "rgb(0, 0, 0)",
                                height: "100%",
                                id: "nUt3LXnEa",
                                kcKdHX2wm: "Funktionen",
                                layoutId: "nUt3LXnEa",
                                variant: "AY2iJjz0z",
                                width: "100%",
                              }),
                            }),
                            r(e, {
                              className: "framer-1mnv8cz-container",
                              children: r(a, {
                                Dl6AiX37G: "rgb(0, 0, 0)",
                                height: "100%",
                                id: "xYNgqrdeO",
                                kcKdHX2wm: "Standorte",
                                layoutId: "xYNgqrdeO",
                                variant: "AY2iJjz0z",
                                width: "100%",
                              }),
                            }),
                            r(e, {
                              className: "framer-q535xw-container",
                              children: r(a, {
                                Dl6AiX37G: "rgb(0, 0, 0)",
                                height: "100%",
                                id: "fFO8ZslsI",
                                kcKdHX2wm: "Schichtbuch",
                                layoutId: "fFO8ZslsI",
                                variant: "AY2iJjz0z",
                                width: "100%",
                              }),
                            }),
                            r(e, {
                              className: "framer-mwrjnr-container",
                              children: r(a, {
                                Dl6AiX37G: "rgb(0, 0, 0)",
                                height: "100%",
                                id: "sfBpiv3Lt",
                                kcKdHX2wm: "Analytics",
                                layoutId: "sfBpiv3Lt",
                                variant: "AY2iJjz0z",
                                width: "100%",
                              }),
                            }),
                            r(e, {
                              className: "framer-t3a0t6-container",
                              children: r(v, {
                                eszixBaDA: 10,
                                height: "100%",
                                id: "QLCe4P1ow",
                                ik9I5qIGz: !1,
                                J0LC2FGV8: !1,
                                KJK1sV1GB: "Get for free",
                                layoutId: "QLCe4P1ow",
                                RmkZjgJwi: "ArrowRight",
                                UsLusPFRg: "rgb(0, 0, 0)",
                                variant: "PqgBulBPi",
                                width: "100%",
                              }),
                            }),
                          ],
                        }),
                      }),
                    }),
                ],
              }),
            }),
            r("div", { className: u(R, ...j), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  rr = [
    '.framer-wH5cx[data-border="true"]::after, .framer-wH5cx [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-wH5cx.framer-quk8h1, .framer-wH5cx .framer-quk8h1 { display: block; }",
    ".framer-wH5cx.framer-uno1a6 { --border-bottom-width: 1px; --border-color: rgba(173, 173, 173, 0.4); --border-left-width: 1px; --border-right-width: 1px; --border-style: dashed; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-wH5cx .framer-1vjeuuu { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; max-width: 1600px; overflow: hidden; padding: 20px 20px 20px 20px; position: relative; width: 100%; }",
    ".framer-wH5cx .framer-1dbrwt5 { align-content: center; align-items: center; background-color: #ffffff; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 0px 0px 80px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }",
    ".framer-wH5cx .framer-1mgj4t8 { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: 100%; justify-content: flex-start; left: calc(50.00000000000002% - 100% / 2); overflow: hidden; padding: 0px 0px 80px 0px; position: absolute; top: 0px; width: 100%; will-change: var(--framer-will-change-override, transform); z-index: 4; }",
    ".framer-wH5cx .framer-1b778m6-container, .framer-wH5cx .framer-1ea530u-container, .framer-wH5cx .framer-r67h3b-container { flex: none; height: auto; position: relative; width: 100%; z-index: 3; }",
    ".framer-wH5cx .framer-1nstv4n, .framer-wH5cx .framer-m0h3wm { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; background-color: #000000; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 0px 0px 80px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }",
    ".framer-wH5cx .framer-1x359t5 { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; background-color: #ffffff; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 0px 0px 80px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }",
    ".framer-wH5cx .framer-1aqb3ty-container { flex: none; height: auto; position: relative; width: 100%; z-index: 0; }",
    ".framer-wH5cx .framer-bkh26a { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: 160px; justify-content: flex-start; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }",
    ".framer-wH5cx .framer-3j4xv5 { align-content: center; align-items: center; background-color: #ffffff; border-bottom-left-radius: 18px; border-bottom-right-radius: 18px; border-top-left-radius: 18px; border-top-right-radius: 18px; bottom: 20px; box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.25); display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 30px; height: auto; justify-content: center; left: 50%; overflow: hidden; padding: 20px 20px 20px 20px; position: absolute; transform: translateX(-50%); width: auto; will-change: var(--framer-will-change-override, transform); z-index: 3; }",
    ".framer-wH5cx .framer-1ht9dl7 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 2; }",
    ".framer-wH5cx .framer-lrb1zy-container, .framer-wH5cx .framer-1qxn4gp-container, .framer-wH5cx .framer-1mnv8cz-container, .framer-wH5cx .framer-q535xw-container, .framer-wH5cx .framer-mwrjnr-container, .framer-wH5cx .framer-t3a0t6-container { flex: none; height: auto; position: relative; width: auto; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-wH5cx.framer-uno1a6, .framer-wH5cx .framer-1vjeuuu, .framer-wH5cx .framer-1dbrwt5, .framer-wH5cx .framer-1mgj4t8, .framer-wH5cx .framer-1nstv4n, .framer-wH5cx .framer-1x359t5, .framer-wH5cx .framer-m0h3wm, .framer-wH5cx .framer-bkh26a, .framer-wH5cx .framer-3j4xv5, .framer-wH5cx .framer-1ht9dl7 { gap: 0px; } .framer-wH5cx.framer-uno1a6 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-wH5cx.framer-uno1a6 > :first-child, .framer-wH5cx .framer-1vjeuuu > :first-child, .framer-wH5cx .framer-1dbrwt5 > :first-child, .framer-wH5cx .framer-1mgj4t8 > :first-child, .framer-wH5cx .framer-1nstv4n > :first-child, .framer-wH5cx .framer-1x359t5 > :first-child, .framer-wH5cx .framer-m0h3wm > :first-child, .framer-wH5cx .framer-bkh26a > :first-child { margin-top: 0px; } .framer-wH5cx.framer-uno1a6 > :last-child, .framer-wH5cx .framer-1vjeuuu > :last-child, .framer-wH5cx .framer-1dbrwt5 > :last-child, .framer-wH5cx .framer-1mgj4t8 > :last-child, .framer-wH5cx .framer-1nstv4n > :last-child, .framer-wH5cx .framer-1x359t5 > :last-child, .framer-wH5cx .framer-m0h3wm > :last-child, .framer-wH5cx .framer-bkh26a > :last-child { margin-bottom: 0px; } .framer-wH5cx .framer-1vjeuuu > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-wH5cx .framer-1dbrwt5 > *, .framer-wH5cx .framer-1mgj4t8 > *, .framer-wH5cx .framer-1nstv4n > *, .framer-wH5cx .framer-1x359t5 > *, .framer-wH5cx .framer-m0h3wm > *, .framer-wH5cx .framer-bkh26a > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-wH5cx .framer-3j4xv5 > * { margin: 0px; margin-left: calc(30px / 2); margin-right: calc(30px / 2); } .framer-wH5cx .framer-3j4xv5 > :first-child, .framer-wH5cx .framer-1ht9dl7 > :first-child { margin-left: 0px; } .framer-wH5cx .framer-3j4xv5 > :last-child, .framer-wH5cx .framer-1ht9dl7 > :last-child { margin-right: 0px; } .framer-wH5cx .framer-1ht9dl7 > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } }",
    "@media (min-width: 1200px) { .framer-wH5cx .hidden-uno1a6 { display: none !important; } }",
    "@media (min-width: 810px) and (max-width: 1199px) { .framer-wH5cx .hidden-sjjj9v { display: none !important; } .framer-wH5cx.framer-uno1a6 { width: 810px; }}",
    "@media (max-width: 809px) { .framer-wH5cx .hidden-3i4mum { display: none !important; } .framer-wH5cx.framer-uno1a6 { width: 390px; }}",
  ],
  x = U($, rr, "framer-wH5cx"),
  gr = x;
x.displayName = "Banner";
x.defaultProps = { height: 920, width: 1200 };
G(x, [...A, ...F, ...X, ...K]);
var br = {
  exports: {
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    default: {
      type: "reactComponent",
      name: "FramerYC_gL3ITH",
      slots: [],
      annotations: {
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"peuk17qsa":{"layout":["fixed","auto"]},"dDig19UHR":{"layout":["fixed","auto"]}}}',
        framerDisplayContentsDiv: "false",
        framerResponsiveScreen: "",
        framerImmutableVariables: "true",
        framerIntrinsicWidth: "1200",
        framerIntrinsicHeight: "920",
        framerContractVersion: "1",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
export { br as __FramerMetadata__, gr as default };
//# sourceMappingURL=xGd8wm50oiChpLSlcSLZEgDPk1m8f_ab0V3ToEzAY-c.EJN5FFF2.mjs.map
