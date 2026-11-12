import { a as x } from "./chunk-27MHC7RC.mjs";
import { a as f } from "./chunk-2GNE24G3.mjs";
import { a } from "./chunk-CVPCFDSR.mjs";
import "./chunk-G7RZZ2HZ.mjs";
import "./chunk-D5FMDQUG.mjs";
import { b as r, c as t } from "./chunk-OO3TPEBQ.mjs";
import {
  K as I,
  V as g,
  Y as e,
  Z as R,
  _ as j,
  aa as L,
  g as b,
  l as v,
  m as H,
  ma as q,
  o as y,
  t as Q,
  v as k,
  va as B,
  wa as u,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var A = u(a),
  N = u(f);
var K = {
  ccS9uFqjg: "(min-width: 1200px)",
  fkWDPDyqx: "(max-width: 809px)",
  TmxOHn_j7: "(min-width: 810px) and (max-width: 1199px)",
};
var V = "framer-QlpHG",
  D = { ccS9uFqjg: "framer-v-6g9uk5", fkWDPDyqx: "framer-v-1909zfo", TmxOHn_j7: "framer-v-t9zi9l" },
  P = { default: { duration: 0 } },
  or = x(),
  _ = { Desktop: "ccS9uFqjg", Phone: "fkWDPDyqx", Tablet: "TmxOHn_j7" },
  U = ({ height: G, id: m, width: s, ...l }) => {
    var n, o;
    return {
      ...l,
      variant:
        (o = (n = _[l.variant]) !== null && n !== void 0 ? n : l.variant) !== null && o !== void 0
          ? o
          : "ccS9uFqjg",
    };
  },
  T = b(function (G, m) {
    let { activeLocale: s, setLocale: l } = I(),
      { style: n, className: o, layoutId: p, variant: F, ...J } = U(G);
    H(() => {
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
            .filter((h) => h.startsWith("framer-body-"))
            .map((h) => document.body.classList.remove(h)),
          document.body.classList.add(`${i.bodyClassName}-framer-QlpHG`),
          () => {
            document.body.classList.remove(`${i.bodyClassName}-framer-QlpHG`);
          }
        );
    }, [void 0, s]);
    let [X, Z] = q(F, K, !1),
      O = void 0,
      W = P.default,
      C = y(null),
      z = v(),
      w = [];
    return (
      j({}),
      r(L.Provider, {
        value: { primaryVariantId: "ccS9uFqjg", variantClassNames: D },
        children: t(k, {
          id: p ?? z,
          children: [
            r(Q.div, {
              ...J,
              className: g(V, ...w, "framer-6g9uk5", o),
              "data-border": !0,
              ref: m ?? C,
              style: { ...n },
              children: r("div", {
                className: "framer-l3fvlc",
                "data-framer-name": "Wrapper",
                name: "Wrapper",
                children: t("div", {
                  className: "framer-1pff2hf",
                  "data-border": !0,
                  children: [
                    t("div", {
                      className: "framer-e2m3t4",
                      children: [
                        r(e, {
                          className: "framer-2ajswv-container",
                          children: r(a, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "Hw6AyvMcO",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "Hw6AyvMcO",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "okzTquwJH",
                            width: "100%",
                          }),
                        }),
                        r(e, {
                          className: "framer-13dfpll-container",
                          children: r(a, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "MLGtDPE_t",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "MLGtDPE_t",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "nGeT6PtR1",
                            width: "100%",
                          }),
                        }),
                        r(e, {
                          className: "framer-16e2z1w-container",
                          children: r(a, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "XfEheO5uY",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "XfEheO5uY",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "ohXdB0YgU",
                            width: "100%",
                          }),
                        }),
                        r(e, {
                          className: "framer-lghnu0-container",
                          children: r(a, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "wyRdV3m0C",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "wyRdV3m0C",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "cQxCGXnZN",
                            width: "100%",
                          }),
                        }),
                      ],
                    }),
                    t("div", {
                      className: "framer-1g7pi07",
                      children: [
                        r(e, {
                          className: "framer-158wbpx-container",
                          children: r(a, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "AwuohXtnK",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "AwuohXtnK",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "PqgBulBPi",
                            width: "100%",
                          }),
                        }),
                        r(e, {
                          className: "framer-1bbmby5-container",
                          children: r(a, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "IBZr70kGw",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "IBZr70kGw",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "oZAhUs9Fy",
                            width: "100%",
                          }),
                        }),
                        r(e, {
                          className: "framer-1wey1aw-container",
                          children: r(a, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "DHL27NRnP",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "DHL27NRnP",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "zb8n5Cev9",
                            width: "100%",
                          }),
                        }),
                        r(e, {
                          className: "framer-xxfrf-container",
                          children: r(a, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "fFJgYiqSA",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "fFJgYiqSA",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "LimbupE7m",
                            width: "100%",
                          }),
                        }),
                      ],
                    }),
                    t("div", {
                      className: "framer-155jkle",
                      children: [
                        r(e, {
                          className: "framer-1vijcip-container",
                          children: r(a, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "CnbGiiSL5",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "CnbGiiSL5",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "nupapQLqg",
                            width: "100%",
                          }),
                        }),
                        r(e, {
                          className: "framer-1r6sdjt-container",
                          children: r(a, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "fUJegV0mX",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "fUJegV0mX",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "lHDIKfs8W",
                            width: "100%",
                          }),
                        }),
                        r(e, {
                          className: "framer-16ykd3b-container",
                          children: r(a, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "I0FXkYn_s",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "I0FXkYn_s",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "tbk3Yo42H",
                            width: "100%",
                          }),
                        }),
                        r(e, {
                          className: "framer-dt4qcs-container",
                          children: r(a, {
                            eszixBaDA: 10,
                            height: "100%",
                            id: "voecKy6X4",
                            ik9I5qIGz: !0,
                            J0LC2FGV8: !1,
                            KJK1sV1GB: "Get started",
                            layoutId: "voecKy6X4",
                            RmkZjgJwi: "ArrowRight",
                            UsLusPFRg: "rgb(0, 0, 0)",
                            variant: "Pith7zUB4",
                            width: "100%",
                          }),
                        }),
                      ],
                    }),
                    t("div", {
                      className: "framer-vtq4df",
                      children: [
                        r(e, {
                          className: "framer-1fx1fxm-container",
                          children: r(f, {
                            bVToBLBTS: "Learn more",
                            height: "100%",
                            id: "ahsRCokHJ",
                            KqeH5xil_: "rgb(0, 0, 0)",
                            layoutId: "ahsRCokHJ",
                            variant: "d77WtBORe",
                            width: "100%",
                          }),
                        }),
                        r(e, {
                          className: "framer-1y70blv-container",
                          children: r(f, {
                            bVToBLBTS: "Learn more",
                            height: "100%",
                            id: "lX1Vm1UaQ",
                            KqeH5xil_: "rgb(0, 0, 0)",
                            layoutId: "lX1Vm1UaQ",
                            variant: "uvXz5tOXs",
                            width: "100%",
                          }),
                        }),
                        r(e, {
                          className: "framer-6jvr34-container",
                          children: r(f, {
                            bVToBLBTS: "Learn more",
                            height: "100%",
                            id: "QQwwIf5cj",
                            KqeH5xil_: "rgb(0, 0, 0)",
                            layoutId: "QQwwIf5cj",
                            variant: "I27BjI0db",
                            width: "100%",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            r("div", { className: g(V, ...w), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  S = [
    '.framer-QlpHG[data-border="true"]::after, .framer-QlpHG [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-QlpHG.framer-1ifai45, .framer-QlpHG .framer-1ifai45 { display: block; }",
    ".framer-QlpHG.framer-6g9uk5 { --border-bottom-width: 1px; --border-color: rgba(173, 173, 173, 0.4); --border-left-width: 1px; --border-right-width: 1px; --border-style: dashed; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-QlpHG .framer-l3fvlc { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; max-width: 1600px; overflow: hidden; padding: 20px 20px 20px 20px; position: relative; width: 100%; }",
    '.framer-QlpHG .framer-1pff2hf { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; background-color: #ffffff; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }',
    ".framer-QlpHG .framer-e2m3t4, .framer-QlpHG .framer-1g7pi07, .framer-QlpHG .framer-155jkle, .framer-QlpHG .framer-vtq4df { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: min-content; z-index: 2; }",
    ".framer-QlpHG .framer-2ajswv-container, .framer-QlpHG .framer-13dfpll-container, .framer-QlpHG .framer-16e2z1w-container, .framer-QlpHG .framer-lghnu0-container, .framer-QlpHG .framer-158wbpx-container, .framer-QlpHG .framer-1bbmby5-container, .framer-QlpHG .framer-1wey1aw-container, .framer-QlpHG .framer-xxfrf-container, .framer-QlpHG .framer-1vijcip-container, .framer-QlpHG .framer-1r6sdjt-container, .framer-QlpHG .framer-16ykd3b-container, .framer-QlpHG .framer-dt4qcs-container, .framer-QlpHG .framer-1fx1fxm-container, .framer-QlpHG .framer-1y70blv-container, .framer-QlpHG .framer-6jvr34-container { flex: none; height: auto; position: relative; width: auto; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-QlpHG.framer-6g9uk5, .framer-QlpHG .framer-l3fvlc, .framer-QlpHG .framer-1pff2hf, .framer-QlpHG .framer-e2m3t4, .framer-QlpHG .framer-1g7pi07, .framer-QlpHG .framer-155jkle, .framer-QlpHG .framer-vtq4df { gap: 0px; } .framer-QlpHG.framer-6g9uk5 > *, .framer-QlpHG .framer-1pff2hf > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-QlpHG.framer-6g9uk5 > :first-child, .framer-QlpHG .framer-l3fvlc > :first-child, .framer-QlpHG .framer-1pff2hf > :first-child { margin-top: 0px; } .framer-QlpHG.framer-6g9uk5 > :last-child, .framer-QlpHG .framer-l3fvlc > :last-child, .framer-QlpHG .framer-1pff2hf > :last-child { margin-bottom: 0px; } .framer-QlpHG .framer-l3fvlc > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-QlpHG .framer-e2m3t4 > *, .framer-QlpHG .framer-1g7pi07 > *, .framer-QlpHG .framer-155jkle > *, .framer-QlpHG .framer-vtq4df > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } .framer-QlpHG .framer-e2m3t4 > :first-child, .framer-QlpHG .framer-1g7pi07 > :first-child, .framer-QlpHG .framer-155jkle > :first-child, .framer-QlpHG .framer-vtq4df > :first-child { margin-left: 0px; } .framer-QlpHG .framer-e2m3t4 > :last-child, .framer-QlpHG .framer-1g7pi07 > :last-child, .framer-QlpHG .framer-155jkle > :last-child, .framer-QlpHG .framer-vtq4df > :last-child { margin-right: 0px; } }",
    "@media (min-width: 1200px) { .framer-QlpHG .hidden-6g9uk5 { display: none !important; } }",
    "@media (min-width: 810px) and (max-width: 1199px) { .framer-QlpHG .hidden-t9zi9l { display: none !important; } .framer-QlpHG.framer-6g9uk5 { width: 810px; }}",
    "@media (max-width: 809px) { .framer-QlpHG .hidden-1909zfo { display: none !important; } .framer-QlpHG.framer-6g9uk5 { width: 390px; } .framer-QlpHG .framer-1pff2hf { gap: 20px; } .framer-QlpHG .framer-e2m3t4, .framer-QlpHG .framer-1g7pi07, .framer-QlpHG .framer-155jkle { flex-wrap: wrap; width: 100%; } .framer-QlpHG .framer-vtq4df { flex-direction: column; flex-wrap: wrap; width: 100%; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-QlpHG .framer-1pff2hf, .framer-QlpHG .framer-vtq4df { gap: 0px; } .framer-QlpHG .framer-1pff2hf > *, .framer-QlpHG .framer-vtq4df > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-QlpHG .framer-1pff2hf > :first-child, .framer-QlpHG .framer-vtq4df > :first-child { margin-top: 0px; } .framer-QlpHG .framer-1pff2hf > :last-child, .framer-QlpHG .framer-vtq4df > :last-child { margin-bottom: 0px; } }}",
  ],
  d = R(T, S, "framer-QlpHG"),
  fr = d;
d.displayName = "Navigation";
d.defaultProps = { height: 384, width: 1200 };
B(d, [...A, ...N]);
var mr = {
  exports: {
    default: {
      type: "reactComponent",
      name: "FramertKjvz8mqn",
      slots: [],
      annotations: {
        framerIntrinsicHeight: "384",
        framerIntrinsicWidth: "1200",
        framerResponsiveScreen: "",
        framerContractVersion: "1",
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"TmxOHn_j7":{"layout":["fixed","auto"]},"fkWDPDyqx":{"layout":["fixed","auto"]}}}',
        framerImmutableVariables: "true",
        framerDisplayContentsDiv: "false",
      },
    },
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    __FramerMetadata__: { type: "variable" },
  },
};
export { mr as __FramerMetadata__, fr as default };
//# sourceMappingURL=nj6Hcnagv1G8ancZe00KtF-iqFMvTm7W_eLgYJ7WEA0.53XSRC7N.mjs.map
