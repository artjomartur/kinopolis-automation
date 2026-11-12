import { a as x } from "./chunk-C4FZLIAV.mjs";
import { a as e } from "./chunk-K7M2XYUE.mjs";
import "./chunk-3H53UPLQ.mjs";
import "./chunk-D5CSMFZ4.mjs";
import "./chunk-G7RZZ2HZ.mjs";
import "./chunk-D5FMDQUG.mjs";
import { a as H, b as D, c as M } from "./chunk-ALFWC2ON.mjs";
import { b as r, c as t } from "./chunk-OO3TPEBQ.mjs";
import {
  K as q,
  V as h,
  Y as a,
  Z as z,
  _ as I,
  aa as L,
  c as u,
  g as w,
  l as v,
  m as B,
  ma as W,
  o as k,
  t as C,
  ua as y,
  v as N,
  va as j,
  wa as P,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var F = P(e);
var V = {
  LQfHiSkck: "(max-width: 809px)",
  mOCct6VWG: "(min-width: 1200px)",
  Od1355q8P: "(min-width: 810px) and (max-width: 1199px)",
};
var A = "framer-uBiyf",
  Q = {
    LQfHiSkck: "framer-v-12d1bbl",
    mOCct6VWG: "framer-v-5mdzqb",
    Od1355q8P: "framer-v-1rgw0j9",
  },
  R = { default: { duration: 0 } },
  fr = x(),
  G = { Desktop: "mOCct6VWG", Phone: "LQfHiSkck", Tablet: "Od1355q8P" },
  J = ({ height: b, id: m, width: s, ...d }) => {
    var o, n;
    return {
      ...d,
      variant:
        (n = (o = G[d.variant]) !== null && o !== void 0 ? o : d.variant) !== null && n !== void 0
          ? n
          : "mOCct6VWG",
    };
  },
  Y = w(function (b, m) {
    let { activeLocale: s, setLocale: d } = q(),
      { style: o, className: n, layoutId: l, variant: S, ...X } = J(b);
    B(() => {
      let i = x(void 0, s);
      if (((document.title = i.title || ""), i.viewport)) {
        var c;
        (c = document.querySelector('meta[name="viewport"]')) === null ||
          c === void 0 ||
          c.setAttribute("content", i.viewport);
      }
      if (i.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((p) => p.startsWith("framer-body-"))
            .map((p) => document.body.classList.remove(p)),
          document.body.classList.add(`${i.bodyClassName}-framer-uBiyf`),
          () => {
            document.body.classList.remove(`${i.bodyClassName}-framer-uBiyf`);
          }
        );
    }, [void 0, s]);
    let [T, E] = W(S, V, !1),
      U = void 0,
      K = R.default,
      _ = k(null),
      O = v(),
      g = [M];
    return (
      I({}),
      r(L.Provider, {
        value: { primaryVariantId: "mOCct6VWG", variantClassNames: Q },
        children: t(N, {
          id: l ?? O,
          children: [
            r(C.div, {
              ...X,
              className: h(A, ...g, "framer-5mdzqb", n),
              "data-border": !0,
              ref: m ?? _,
              style: { ...o },
              children: t("div", {
                className: "framer-1ia1egc",
                "data-framer-name": "Wrapper",
                name: "Wrapper",
                children: [
                  r("div", {
                    className: "framer-1tcilkp",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: t("div", {
                      className: "framer-bano89",
                      "data-framer-name": "FAQ Day",
                      name: "FAQ Day",
                      children: [
                        r(y, {
                          __fromCanvasComponent: !0,
                          children: r(u, {
                            children: r("h2", {
                              className: "framer-styles-preset-4m6e0d",
                              "data-styles-preset": "Bgl_uNKYX",
                              style: { "--framer-text-color": "rgb(0, 0, 0)" },
                              children: "Frequently asked questions",
                            }),
                          }),
                          className: "framer-1gbqmhk",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        t("div", {
                          className: "framer-crzbmh",
                          children: [
                            r(a, {
                              className: "framer-1vpijzi-container",
                              children: r(e, {
                                CM1C23HdI: "rgb(0, 0, 0)",
                                height: "100%",
                                id: "xnkzgcSiY",
                                layoutId: "xnkzgcSiY",
                                m1wBZJAoM:
                                  "We accept all major credit cards, PayPal, and various other payment methods depending on your location. Please contact our support team for more information on accepted payment methods in your region.",
                                style: { width: "100%" },
                                variant: "T5CrfWy_o",
                                vd59XDbg4: "What payment methods do you accept?",
                                width: "100%",
                              }),
                            }),
                            r("div", {
                              className: "framer-5e2v0o",
                              "data-framer-name": "Line Bottom",
                              name: "Line Bottom",
                            }),
                            r(a, {
                              className: "framer-1ltx923-container",
                              children: r(e, {
                                CM1C23HdI: "rgb(0, 0, 0)",
                                height: "100%",
                                id: "lHXf24eBJ",
                                layoutId: "lHXf24eBJ",
                                m1wBZJAoM:
                                  "Our pricing is per user, per month. This means you only pay for the number of team members you have on your account. Discounts are available for larger teams and annual subscriptions.",
                                style: { width: "100%" },
                                variant: "yPX8xspWY",
                                vd59XDbg4: "How does the pricing work for teams?",
                                width: "100%",
                              }),
                            }),
                            r("div", {
                              className: "framer-1q0rpy",
                              "data-framer-name": "Line Bottom",
                              name: "Line Bottom",
                            }),
                            r(a, {
                              className: "framer-1kf7em8-container",
                              children: r(e, {
                                CM1C23HdI: "rgb(0, 0, 0)",
                                height: "100%",
                                id: "S10j0vkLp",
                                layoutId: "S10j0vkLp",
                                m1wBZJAoM:
                                  "Yes, you can upgrade or downgrade your plan at any time. Changes to your plan will be prorated and reflected in your next billing cycle.",
                                style: { width: "100%" },
                                variant: "yPX8xspWY",
                                vd59XDbg4: "Can I change my plan later?",
                                width: "100%",
                              }),
                            }),
                            r("div", {
                              className: "framer-gtdem3",
                              "data-framer-name": "Line Bottom",
                              name: "Line Bottom",
                            }),
                            r(a, {
                              className: "framer-1hniyvj-container",
                              children: r(e, {
                                CM1C23HdI: "rgb(0, 0, 0)",
                                height: "100%",
                                id: "UyBbEMyfT",
                                layoutId: "UyBbEMyfT",
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
                  }),
                  r("div", {
                    className: "framer-su1rkz",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: t("div", {
                      className: "framer-ay8bbk",
                      "data-framer-name": "FAQ Night",
                      name: "FAQ Night",
                      children: [
                        r(y, {
                          __fromCanvasComponent: !0,
                          children: r(u, {
                            children: r("h2", {
                              className: "framer-styles-preset-4m6e0d",
                              "data-styles-preset": "Bgl_uNKYX",
                              style: { "--framer-text-color": "rgb(255, 255, 255)" },
                              children: "Frequently asked questions",
                            }),
                          }),
                          className: "framer-1xcvqqq",
                          verticalAlignment: "top",
                          withExternalLayout: !0,
                        }),
                        t("div", {
                          className: "framer-m09eci",
                          children: [
                            r(a, {
                              className: "framer-15xpxhg-container",
                              children: r(e, {
                                CM1C23HdI: "rgb(255, 255, 255)",
                                height: "100%",
                                id: "fuoPUOi9q",
                                layoutId: "fuoPUOi9q",
                                m1wBZJAoM:
                                  "We accept all major credit cards, PayPal, and various other payment methods depending on your location. Please contact our support team for more information on accepted payment methods in your region.",
                                style: { width: "100%" },
                                variant: "T5CrfWy_o",
                                vd59XDbg4: "What payment methods do you accept?",
                                width: "100%",
                              }),
                            }),
                            r("div", {
                              className: "framer-mjserw",
                              "data-framer-name": "Line Bottom",
                              name: "Line Bottom",
                            }),
                            r(a, {
                              className: "framer-qxcizw-container",
                              children: r(e, {
                                CM1C23HdI: "rgb(255, 255, 255)",
                                height: "100%",
                                id: "POhfziQmD",
                                layoutId: "POhfziQmD",
                                m1wBZJAoM:
                                  "Our pricing is per user, per month. This means you only pay for the number of team members you have on your account. Discounts are available for larger teams and annual subscriptions.",
                                style: { width: "100%" },
                                variant: "yPX8xspWY",
                                vd59XDbg4: "How does the pricing work for teams?",
                                width: "100%",
                              }),
                            }),
                            r("div", {
                              className: "framer-cvgnwb",
                              "data-framer-name": "Line Bottom",
                              name: "Line Bottom",
                            }),
                            r(a, {
                              className: "framer-s3xnuc-container",
                              children: r(e, {
                                CM1C23HdI: "rgb(255, 255, 255)",
                                height: "100%",
                                id: "XcD_IZGvA",
                                layoutId: "XcD_IZGvA",
                                m1wBZJAoM:
                                  "Yes, you can upgrade or downgrade your plan at any time. Changes to your plan will be prorated and reflected in your next billing cycle.",
                                style: { width: "100%" },
                                variant: "yPX8xspWY",
                                vd59XDbg4: "Can I change my plan later?",
                                width: "100%",
                              }),
                            }),
                            r("div", {
                              className: "framer-yqz73w",
                              "data-framer-name": "Line Bottom",
                              name: "Line Bottom",
                            }),
                            r(a, {
                              className: "framer-a5maj-container",
                              children: r(e, {
                                CM1C23HdI: "rgb(255, 255, 255)",
                                height: "100%",
                                id: "IJrp0dGZQ",
                                layoutId: "IJrp0dGZQ",
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
                  }),
                ],
              }),
            }),
            r("div", { className: h(A, ...g), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  Z = [
    '.framer-uBiyf[data-border="true"]::after, .framer-uBiyf [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-uBiyf.framer-kudjwb, .framer-uBiyf .framer-kudjwb { display: block; }",
    ".framer-uBiyf.framer-5mdzqb { --border-bottom-width: 1px; --border-color: rgba(173, 173, 173, 0.4); --border-left-width: 1px; --border-right-width: 1px; --border-style: dashed; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-uBiyf .framer-1ia1egc { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; max-width: 1600px; overflow: hidden; padding: 20px 20px 20px 20px; position: relative; width: 100%; }",
    '.framer-uBiyf .framer-1tcilkp { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }',
    ".framer-uBiyf .framer-bano89 { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 1px; }",
    ".framer-uBiyf .framer-1gbqmhk, .framer-uBiyf .framer-1xcvqqq { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 690px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-uBiyf .framer-crzbmh, .framer-uBiyf .framer-m09eci { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; max-width: 660px; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-uBiyf .framer-1vpijzi-container, .framer-uBiyf .framer-1ltx923-container, .framer-uBiyf .framer-1kf7em8-container, .framer-uBiyf .framer-1hniyvj-container, .framer-uBiyf .framer-15xpxhg-container, .framer-uBiyf .framer-qxcizw-container, .framer-uBiyf .framer-s3xnuc-container, .framer-uBiyf .framer-a5maj-container { flex: none; height: auto; position: relative; width: 100%; }",
    ".framer-uBiyf .framer-5e2v0o, .framer-uBiyf .framer-1q0rpy, .framer-uBiyf .framer-gtdem3 { background-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); flex: none; height: 1px; overflow: hidden; position: relative; width: 100%; }",
    '.framer-uBiyf .framer-su1rkz { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }',
    ".framer-uBiyf .framer-ay8bbk { align-content: center; align-items: center; background-color: #000000; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 60px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; }",
    ".framer-uBiyf .framer-mjserw, .framer-uBiyf .framer-cvgnwb, .framer-uBiyf .framer-yqz73w { background-color: var(--token-58a904ff-197a-49b3-8356-adaa464e1642, rgba(255, 255, 255, 0.12)); flex: none; height: 1px; overflow: hidden; position: relative; width: 100%; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-uBiyf.framer-5mdzqb, .framer-uBiyf .framer-1ia1egc, .framer-uBiyf .framer-1tcilkp, .framer-uBiyf .framer-bano89, .framer-uBiyf .framer-crzbmh, .framer-uBiyf .framer-su1rkz, .framer-uBiyf .framer-ay8bbk, .framer-uBiyf .framer-m09eci { gap: 0px; } .framer-uBiyf.framer-5mdzqb > *, .framer-uBiyf .framer-su1rkz > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-uBiyf.framer-5mdzqb > :first-child, .framer-uBiyf .framer-1ia1egc > :first-child, .framer-uBiyf .framer-bano89 > :first-child, .framer-uBiyf .framer-crzbmh > :first-child, .framer-uBiyf .framer-su1rkz > :first-child, .framer-uBiyf .framer-ay8bbk > :first-child, .framer-uBiyf .framer-m09eci > :first-child { margin-top: 0px; } .framer-uBiyf.framer-5mdzqb > :last-child, .framer-uBiyf .framer-1ia1egc > :last-child, .framer-uBiyf .framer-bano89 > :last-child, .framer-uBiyf .framer-crzbmh > :last-child, .framer-uBiyf .framer-su1rkz > :last-child, .framer-uBiyf .framer-ay8bbk > :last-child, .framer-uBiyf .framer-m09eci > :last-child { margin-bottom: 0px; } .framer-uBiyf .framer-1ia1egc > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-uBiyf .framer-1tcilkp > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-uBiyf .framer-1tcilkp > :first-child { margin-left: 0px; } .framer-uBiyf .framer-1tcilkp > :last-child { margin-right: 0px; } .framer-uBiyf .framer-bano89 > *, .framer-uBiyf .framer-ay8bbk > * { margin: 0px; margin-bottom: calc(60px / 2); margin-top: calc(60px / 2); } .framer-uBiyf .framer-crzbmh > *, .framer-uBiyf .framer-m09eci > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } }",
    "@media (min-width: 1200px) { .framer-uBiyf .hidden-5mdzqb { display: none !important; } }",
    "@media (min-width: 810px) and (max-width: 1199px) { .framer-uBiyf .hidden-1rgw0j9 { display: none !important; } .framer-uBiyf.framer-5mdzqb { width: 810px; }}",
    "@media (max-width: 809px) { .framer-uBiyf .hidden-12d1bbl { display: none !important; } .framer-uBiyf.framer-5mdzqb { width: 390px; } .framer-uBiyf .framer-bano89 { gap: 40px; padding: 40px 20px 40px 20px; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-uBiyf .framer-bano89 { gap: 0px; } .framer-uBiyf .framer-bano89 > * { margin: 0px; margin-bottom: calc(40px / 2); margin-top: calc(40px / 2); } .framer-uBiyf .framer-bano89 > :first-child { margin-top: 0px; } .framer-uBiyf .framer-bano89 > :last-child { margin-bottom: 0px; } }}",
    ...D,
  ],
  f = z(Y, Z, "framer-uBiyf"),
  sr = f;
f.displayName = "Navigation";
f.defaultProps = { height: 1389, width: 1200 };
j(f, [...F, ...H]);
var lr = {
  exports: {
    default: {
      type: "reactComponent",
      name: "FramerWHqHmjRS0",
      slots: [],
      annotations: {
        framerImmutableVariables: "true",
        framerResponsiveScreen: "",
        framerDisplayContentsDiv: "false",
        framerContractVersion: "1",
        framerIntrinsicHeight: "1389",
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"Od1355q8P":{"layout":["fixed","auto"]},"LQfHiSkck":{"layout":["fixed","auto"]}}}',
        framerIntrinsicWidth: "1200",
      },
    },
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    __FramerMetadata__: { type: "variable" },
  },
};
export { lr as __FramerMetadata__, sr as default };
//# sourceMappingURL=9mQS_ZEMMw15GGbzhX3tnpL8hOk-yIlFFRmStrQfQhs.HBONBTF6.mjs.map
