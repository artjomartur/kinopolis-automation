import { a as b } from "./chunk-HXFAAQTA.mjs";
import { a as y } from "./chunk-FXC2Z23U.mjs";
import "./chunk-APGM2C5T.mjs";
import { a as d } from "./chunk-CVPCFDSR.mjs";
import "./chunk-G7RZZ2HZ.mjs";
import "./chunk-D5FMDQUG.mjs";
import { a as q, b as I, c as P } from "./chunk-5SAWWLB7.mjs";
import { b as e, c as t } from "./chunk-OO3TPEBQ.mjs";
import {
  K as _,
  V as w,
  Y as s,
  Z as R,
  _ as L,
  aa as j,
  c as r,
  g as k,
  l as N,
  m as C,
  ma as A,
  o as S,
  t as u,
  ua as a,
  v as F,
  va as G,
  wa as v,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var M = v(d),
  D = v(y);
var U = {
    nwx_9nuf1: "(min-width: 1200px)",
    UZ26gbbTA: "(max-width: 809px)",
    yHCrN4drZ: "(min-width: 810px) and (max-width: 1199px)",
  },
  J = () => typeof document < "u",
  W = "framer-fBHo8",
  K = {
    nwx_9nuf1: "framer-v-1992l3v",
    UZ26gbbTA: "framer-v-17nnmie",
    yHCrN4drZ: "framer-v-5f6494",
  },
  O = { default: { duration: 0 } },
  he = b(),
  X = { Desktop: "nwx_9nuf1", Phone: "UZ26gbbTA", Tablet: "yHCrN4drZ" },
  Q = ({ height: B, id: f, width: p, ...m }) => {
    var i, o;
    return {
      ...m,
      variant:
        (o = (i = X[m.variant]) !== null && i !== void 0 ? i : m.variant) !== null && o !== void 0
          ? o
          : "nwx_9nuf1",
    };
  },
  Y = k(function (B, f) {
    let { activeLocale: p, setLocale: m } = _(),
      { style: i, className: o, layoutId: h, variant: Z, ...z } = Q(B);
    C(() => {
      let n = b(void 0, p);
      if (((document.title = n.title || ""), n.viewport)) {
        var x;
        (x = document.querySelector('meta[name="viewport"]')) === null ||
          x === void 0 ||
          x.setAttribute("content", n.viewport);
      }
      if (n.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((g) => g.startsWith("framer-body-"))
            .map((g) => document.body.classList.remove(g)),
          document.body.classList.add(`${n.bodyClassName}-framer-fBHo8`),
          () => {
            document.body.classList.remove(`${n.bodyClassName}-framer-fBHo8`);
          }
        );
    }, [void 0, p]);
    let [E, ee] = A(Z, U, !1),
      re = void 0,
      ae = O.default,
      T = S(null),
      l = () => (E === "UZ26gbbTA" ? !J() : !0),
      V = N(),
      H = [P];
    return (
      L({}),
      e(j.Provider, {
        value: { primaryVariantId: "nwx_9nuf1", variantClassNames: K },
        children: t(F, {
          id: h ?? V,
          children: [
            e(u.div, {
              ...z,
              className: w(W, ...H, "framer-1992l3v", o),
              "data-border": !0,
              ref: f ?? T,
              style: { ...i },
              children: t("div", {
                className: "framer-1it7u3e",
                "data-framer-name": "Wrapper",
                name: "Wrapper",
                children: [
                  e("div", {
                    className: "framer-1wdwrwk",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: t("div", {
                      className: "framer-wym9e3",
                      "data-framer-name": "Banner",
                      name: "Banner",
                      children: [
                        t("div", {
                          className: "framer-1ihiw8",
                          children: [
                            e(a, {
                              __fromCanvasComponent: !0,
                              children: e(r, {
                                children: e("p", {
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
                                  children: "SaaS Conf 2024",
                                }),
                              }),
                              className: "framer-1usvcrk",
                              fonts: ["FS;Satoshi-bold"],
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            l() &&
                              e(a, {
                                __fromCanvasComponent: !0,
                                children: e(r, {
                                  children: e("p", {
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
                                    children: "\u30FB",
                                  }),
                                }),
                                className: "framer-84sylj hidden-17nnmie",
                                fonts: ["FS;Satoshi-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            l() &&
                              e(a, {
                                __fromCanvasComponent: !0,
                                children: e(r, {
                                  children: e("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                    children: "Dive into the Future of SaaS",
                                  }),
                                }),
                                className: "framer-1f5fcfo hidden-17nnmie",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                          ],
                        }),
                        e(s, {
                          className: "framer-1kkdnvu-container",
                          children: e(d, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "G4iofKEhm",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Register now",
                            layoutId: "G4iofKEhm",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "tbk3Yo42H",
                            width: "100%",
                          }),
                        }),
                      ],
                    }),
                  }),
                  e("div", {
                    className: "framer-1tkinle",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: t("div", {
                      className: "framer-1v7x9kl",
                      "data-framer-name": "Banner",
                      name: "Banner",
                      children: [
                        t("div", {
                          className: "framer-6lrgmn",
                          children: [
                            e(a, {
                              __fromCanvasComponent: !0,
                              children: e(r, {
                                children: e("p", {
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
                                  children: "SaaS Conf 2024",
                                }),
                              }),
                              className: "framer-1unoym2",
                              fonts: ["FS;Satoshi-bold"],
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            l() &&
                              e(a, {
                                __fromCanvasComponent: !0,
                                children: e(r, {
                                  children: e("p", {
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
                                    children: "\u30FB",
                                  }),
                                }),
                                className: "framer-3niuyp hidden-17nnmie",
                                fonts: ["FS;Satoshi-bold"],
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                            l() &&
                              e(a, {
                                __fromCanvasComponent: !0,
                                children: e(r, {
                                  children: e("p", {
                                    className: "framer-styles-preset-1dts917",
                                    "data-styles-preset": "hgKudGhZ5",
                                    style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                    children: "Dive into the Future of SaaS",
                                  }),
                                }),
                                className: "framer-1s7v7jw hidden-17nnmie",
                                verticalAlignment: "top",
                                withExternalLayout: !0,
                              }),
                          ],
                        }),
                        e(s, {
                          className: "framer-2htobu-container",
                          children: e(d, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "nH7qeWsdQ",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Register now",
                            layoutId: "nH7qeWsdQ",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "nupapQLqg",
                            width: "100%",
                          }),
                        }),
                        e("div", {
                          className: "framer-1gpg6yn",
                          "data-framer-name": "Gradient",
                          name: "Gradient",
                        }),
                      ],
                    }),
                  }),
                  e("div", {
                    className: "framer-1ky7qq2",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: e("div", {
                      className: "framer-j5vrfl",
                      "data-framer-name": "Banner",
                      name: "Banner",
                      children: e(s, {
                        className: "framer-1evmaev-container",
                        children: e(y, {
                          alignment: "center",
                          direction: "left",
                          fadeOptions: {
                            fadeAlpha: 0,
                            fadeContent: !0,
                            fadeInset: 0,
                            fadeWidth: 25,
                            overflow: !1,
                          },
                          gap: 0,
                          height: "100%",
                          hoverFactor: 0.4,
                          id: "WM0yhqJJi",
                          layoutId: "WM0yhqJJi",
                          padding: 0,
                          paddingBottom: 0,
                          paddingLeft: 0,
                          paddingPerSide: !1,
                          paddingRight: 0,
                          paddingTop: 0,
                          sizingOptions: { heightType: !0, widthType: !0 },
                          slots: [
                            t(u.div, {
                              className: "framer-2h6f98",
                              children: [
                                e(a, {
                                  __fromCanvasComponent: !0,
                                  children: e(r, {
                                    children: e("p", {
                                      className: "framer-styles-preset-1dts917",
                                      "data-styles-preset": "hgKudGhZ5",
                                      style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                      children: "50% off all plans",
                                    }),
                                  }),
                                  className: "framer-1tp0fj7",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                e(a, {
                                  __fromCanvasComponent: !0,
                                  children: e(r, {
                                    children: e("p", {
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
                                      children: "\u30FB",
                                    }),
                                  }),
                                  className: "framer-1qiudyn",
                                  fonts: ["FS;Satoshi-bold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                e(a, {
                                  __fromCanvasComponent: !0,
                                  children: e(r, {
                                    children: e("p", {
                                      className: "framer-styles-preset-1dts917",
                                      "data-styles-preset": "hgKudGhZ5",
                                      style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                      children: "Limited time only",
                                    }),
                                  }),
                                  className: "framer-17xtr20",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                e(a, {
                                  __fromCanvasComponent: !0,
                                  children: e(r, {
                                    children: e("p", {
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
                                      children: "\u30FB",
                                    }),
                                  }),
                                  className: "framer-1efeo5s",
                                  fonts: ["FS;Satoshi-bold"],
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                          ],
                          speed: 30,
                          style: { height: "100%", width: "100%" },
                          width: "100%",
                        }),
                      }),
                    }),
                  }),
                ],
              }),
            }),
            e("div", { className: w(W, ...H), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  $ = [
    '.framer-fBHo8[data-border="true"]::after, .framer-fBHo8 [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-fBHo8.framer-141z4ld, .framer-fBHo8 .framer-141z4ld { display: block; }",
    ".framer-fBHo8.framer-1992l3v { --border-bottom-width: 1px; --border-color: rgba(173, 173, 173, 0.4); --border-left-width: 1px; --border-right-width: 1px; --border-style: dashed; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-fBHo8 .framer-1it7u3e { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; max-width: 1600px; overflow: hidden; padding: 20px 20px 20px 20px; position: relative; width: 100%; }",
    ".framer-fBHo8 .framer-1wdwrwk, .framer-fBHo8 .framer-1tkinle, .framer-fBHo8 .framer-1ky7qq2 { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; background-color: #ffffff; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 0px 0px 80px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }",
    ".framer-fBHo8 .framer-wym9e3 { align-content: center; align-items: center; background-color: #000000; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: 46px; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-fBHo8 .framer-1ihiw8 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 5px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; }",
    ".framer-fBHo8 .framer-1usvcrk, .framer-fBHo8 .framer-84sylj, .framer-fBHo8 .framer-1f5fcfo, .framer-fBHo8 .framer-1unoym2, .framer-fBHo8 .framer-3niuyp, .framer-fBHo8 .framer-1s7v7jw, .framer-fBHo8 .framer-1tp0fj7, .framer-fBHo8 .framer-1qiudyn, .framer-fBHo8 .framer-17xtr20, .framer-fBHo8 .framer-1efeo5s { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-fBHo8 .framer-1kkdnvu-container { flex: none; height: auto; position: relative; width: auto; }",
    ".framer-fBHo8 .framer-1v7x9kl { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: 46px; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-fBHo8 .framer-6lrgmn { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 5px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 2; }",
    ".framer-fBHo8 .framer-2htobu-container { flex: none; height: auto; position: relative; width: auto; z-index: 2; }",
    ".framer-fBHo8 .framer-1gpg6yn { background: linear-gradient(270deg, #fcd6ff 0%, rgb(41, 216, 255) 26.576576576576578%, rgb(255, 253, 130) 50%, rgb(242, 54, 255) 71.4527027027027%, rgb(252, 214, 255) 100%); flex: none; height: 100%; opacity: 0.2; overflow: hidden; pointer-events: none; position: absolute; right: -1px; top: calc(50.00000000000002% - 100% / 2); width: 100%; z-index: 1; }",
    ".framer-fBHo8 .framer-j5vrfl { align-content: center; align-items: center; background-color: #000000; cursor: pointer; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: 46px; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-fBHo8 .framer-1evmaev-container { flex: 1 0 0px; height: 100%; position: relative; width: 1px; }",
    ".framer-fBHo8 .framer-2h6f98 { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 5px; height: min-content; justify-content: center; overflow: visible; padding: 0px 5px 0px 0px; position: relative; width: min-content; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-fBHo8.framer-1992l3v, .framer-fBHo8 .framer-1it7u3e, .framer-fBHo8 .framer-1wdwrwk, .framer-fBHo8 .framer-wym9e3, .framer-fBHo8 .framer-1ihiw8, .framer-fBHo8 .framer-1tkinle, .framer-fBHo8 .framer-1v7x9kl, .framer-fBHo8 .framer-6lrgmn, .framer-fBHo8 .framer-1ky7qq2, .framer-fBHo8 .framer-j5vrfl, .framer-fBHo8 .framer-2h6f98 { gap: 0px; } .framer-fBHo8.framer-1992l3v > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-fBHo8.framer-1992l3v > :first-child, .framer-fBHo8 .framer-1it7u3e > :first-child, .framer-fBHo8 .framer-1wdwrwk > :first-child, .framer-fBHo8 .framer-1tkinle > :first-child, .framer-fBHo8 .framer-1ky7qq2 > :first-child { margin-top: 0px; } .framer-fBHo8.framer-1992l3v > :last-child, .framer-fBHo8 .framer-1it7u3e > :last-child, .framer-fBHo8 .framer-1wdwrwk > :last-child, .framer-fBHo8 .framer-1tkinle > :last-child, .framer-fBHo8 .framer-1ky7qq2 > :last-child { margin-bottom: 0px; } .framer-fBHo8 .framer-1it7u3e > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-fBHo8 .framer-1wdwrwk > *, .framer-fBHo8 .framer-1tkinle > *, .framer-fBHo8 .framer-1ky7qq2 > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-fBHo8 .framer-wym9e3 > *, .framer-fBHo8 .framer-1v7x9kl > *, .framer-fBHo8 .framer-j5vrfl > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } .framer-fBHo8 .framer-wym9e3 > :first-child, .framer-fBHo8 .framer-1ihiw8 > :first-child, .framer-fBHo8 .framer-1v7x9kl > :first-child, .framer-fBHo8 .framer-6lrgmn > :first-child, .framer-fBHo8 .framer-j5vrfl > :first-child, .framer-fBHo8 .framer-2h6f98 > :first-child { margin-left: 0px; } .framer-fBHo8 .framer-wym9e3 > :last-child, .framer-fBHo8 .framer-1ihiw8 > :last-child, .framer-fBHo8 .framer-1v7x9kl > :last-child, .framer-fBHo8 .framer-6lrgmn > :last-child, .framer-fBHo8 .framer-j5vrfl > :last-child, .framer-fBHo8 .framer-2h6f98 > :last-child { margin-right: 0px; } .framer-fBHo8 .framer-1ihiw8 > *, .framer-fBHo8 .framer-6lrgmn > *, .framer-fBHo8 .framer-2h6f98 > * { margin: 0px; margin-left: calc(5px / 2); margin-right: calc(5px / 2); } }",
    "@media (min-width: 1200px) { .framer-fBHo8 .hidden-1992l3v { display: none !important; } }",
    "@media (min-width: 810px) and (max-width: 1199px) { .framer-fBHo8 .hidden-5f6494 { display: none !important; } .framer-fBHo8.framer-1992l3v { width: 810px; }}",
    "@media (max-width: 809px) { .framer-fBHo8 .hidden-17nnmie { display: none !important; } .framer-fBHo8.framer-1992l3v { width: 390px; }}",
    ...I,
  ],
  c = R(Y, $, "framer-fBHo8"),
  xe = c;
c.displayName = "Page";
c.defaultProps = { height: 458, width: 1200 };
G(c, [
  {
    family: "Satoshi",
    source: "fontshare",
    style: "normal",
    url: "../../assets/misc/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2",
    weight: "700",
  },
  ...M,
  ...D,
  ...q,
]);
var ge = {
  exports: {
    default: {
      type: "reactComponent",
      name: "FramerfimN5_XOF",
      slots: [],
      annotations: {
        framerIntrinsicWidth: "1200",
        framerContractVersion: "1",
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"yHCrN4drZ":{"layout":["fixed","auto"]},"UZ26gbbTA":{"layout":["fixed","auto"]}}}',
        framerIntrinsicHeight: "458",
        framerResponsiveScreen: "",
        framerImmutableVariables: "true",
        framerDisplayContentsDiv: "false",
      },
    },
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    __FramerMetadata__: { type: "variable" },
  },
};
export { ge as __FramerMetadata__, xe as default };
//# sourceMappingURL=xreiFDp-h5jsRikHDnS0ctU4DmnFvKrN0qkW48TEfrc.M7SVHXMA.mjs.map
