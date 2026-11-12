import { a as I } from "./chunk-O5SY47LX.mjs";
import { a } from "./chunk-BCJR3627.mjs";
import { a as P, b as G, c as Q } from "./chunk-3H53UPLQ.mjs";
import { a as p } from "./chunk-HBMRKKOJ.mjs";
import "./chunk-2GNE24G3.mjs";
import { a as n } from "./chunk-CVPCFDSR.mjs";
import "./chunk-G7RZZ2HZ.mjs";
import "./chunk-D5FMDQUG.mjs";
import { a as J, b as K, c as S } from "./chunk-MNHRXVGF.mjs";
import { a as W, b as A, c as B } from "./chunk-ALFWC2ON.mjs";
import "./chunk-5SAWWLB7.mjs";
import { b as r, c as t } from "./chunk-OO3TPEBQ.mjs";
import {
  K as F,
  V as y,
  Y as e,
  Z as L,
  _ as E,
  aa as R,
  c as i,
  g as N,
  l as k,
  m as C,
  ma as z,
  o as _,
  t as j,
  ua as m,
  v as T,
  va as q,
  wa as d,
} from "./chunk-QEUFNCD2.mjs";
import "./chunk-2SKDHTP3.mjs";
import "./chunk-ELYU6EKT.mjs";
var X = d(n),
  O = d(a),
  Z = d(p);
var H = {
  jMgiJyfMY: "(max-width: 809px)",
  O9GJJf5Q3: "(min-width: 810px) and (max-width: 1199px)",
  x81J5jtfi: "(min-width: 1200px)",
};
var D = "framer-7rp5I",
  $ = {
    jMgiJyfMY: "framer-v-pdtu13",
    O9GJJf5Q3: "framer-v-1hq76bk",
    x81J5jtfi: "framer-v-15p23cf",
  },
  rr = { default: { duration: 0 } },
  Nr = I(),
  er = { Desktop: "x81J5jtfi", Phone: "jMgiJyfMY", Tablet: "O9GJJf5Q3" },
  ar = ({ height: w, id: o, width: x, ...s }) => {
    var l, c;
    return {
      ...s,
      variant:
        (c = (l = er[s.variant]) !== null && l !== void 0 ? l : s.variant) !== null && c !== void 0
          ? c
          : "x81J5jtfi",
    };
  },
  tr = N(function (w, o) {
    let { activeLocale: x, setLocale: s } = F(),
      { style: l, className: c, layoutId: g, variant: V, ...Y } = ar(w);
    C(() => {
      let f = I(void 0, x);
      if (((document.title = f.title || ""), f.viewport)) {
        var b;
        (b = document.querySelector('meta[name="viewport"]')) === null ||
          b === void 0 ||
          b.setAttribute("content", f.viewport);
      }
      if (f.bodyClassName)
        return (
          Array.from(document.body.classList)
            .filter((u) => u.startsWith("framer-body-"))
            .map((u) => document.body.classList.remove(u)),
          document.body.classList.add(`${f.bodyClassName}-framer-7rp5I`),
          () => {
            document.body.classList.remove(`${f.bodyClassName}-framer-7rp5I`);
          }
        );
    }, [void 0, x]);
    let [mr, nr] = z(V, H, !1),
      fr = void 0,
      lr = rr.default,
      M = _(null),
      U = k(),
      v = [B, S, Q];
    return (
      E({}),
      r(R.Provider, {
        value: { primaryVariantId: "x81J5jtfi", variantClassNames: $ },
        children: t(T, {
          id: g ?? U,
          children: [
            r(j.div, {
              ...Y,
              className: y(D, ...v, "framer-15p23cf", c),
              "data-border": !0,
              ref: o ?? M,
              style: { ...l },
              children: t("div", {
                className: "framer-96qs98",
                "data-framer-name": "Wrapper",
                name: "Wrapper",
                children: [
                  r("div", {
                    className: "framer-1hmh6th",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: t("div", {
                      className: "framer-1mawi7y",
                      "data-framer-name": "Pricing Day",
                      name: "Pricing Day",
                      children: [
                        t("div", {
                          className: "framer-10or1dx",
                          children: [
                            r(m, {
                              __fromCanvasComponent: !0,
                              children: r(i, {
                                children: r("h2", {
                                  className: "framer-styles-preset-4m6e0d",
                                  "data-styles-preset": "Bgl_uNKYX",
                                  children: "Pricing",
                                }),
                              }),
                              className: "framer-bndhqp",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(m, {
                              __fromCanvasComponent: !0,
                              children: r(i, {
                                children: r("p", {
                                  className: "framer-styles-preset-sxuwop",
                                  "data-styles-preset": "dGJYq65Lz",
                                  style: { "--framer-text-alignment": "center" },
                                  children:
                                    "Von der Einlasskontrolle am Foyer bis zur zentralen Theaterleitung und technischen Vorführraum-Automation.",
                                }),
                              }),
                              className: "framer-wna4qu",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          ],
                        }),
                        t("div", {
                          className: "framer-1v8ki7o",
                          children: [
                            t("div", {
                              className: "framer-1832ih9",
                              "data-border": !0,
                              children: [
                                r(m, {
                                  __fromCanvasComponent: !0,
                                  children: r(i, {
                                    children: r("h5", {
                                      className: "framer-styles-preset-13rf66x",
                                      "data-styles-preset": "GPDKd6Ic6",
                                      children: "Free",
                                    }),
                                  }),
                                  className: "framer-1gj65np",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                t("div", {
                                  className: "framer-1lpznfy",
                                  children: [
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h2", {
                                          className: "framer-styles-preset-4m6e0d",
                                          "data-styles-preset": "Bgl_uNKYX",
                                          children: "$0",
                                        }),
                                      }),
                                      className: "framer-2icbh1",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h5", {
                                          className: "framer-styles-preset-13rf66x",
                                          "data-styles-preset": "GPDKd6Ic6",
                                          children: "/month",
                                        }),
                                      }),
                                      className: "framer-1wyeeit",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                r(e, {
                                  className: "framer-1a57vmt-container",
                                  children: r(n, {
                                    eszixBaDA: 10,
                                    height: "100%",
                                    id: "hDEXbppoM",
                                    ik9I5qIGz: !1,
                                    J0LC2FGV8: !1,
                                    KJK1sV1GB: "Modul öffnen →",
                                    layoutId: "hDEXbppoM",
                                    RmkZjgJwi: "ArrowRight",
                                    style: { width: "100%" },
                                    UsLusPFRg: "rgb(0, 0, 0)",
                                    variant: "PqgBulBPi",
                                    width: "100%",
                                  }),
                                }),
                                t("div", {
                                  className: "framer-1t3o3kw",
                                  children: [
                                    r(e, {
                                      className: "framer-8y1j0h-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "xOu1sdYcn",
                                        jTcf_EQ_W: "Live-Saalbelegung & Einlassampel",
                                        layoutId: "xOu1sdYcn",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-jcadlt-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "XwaqtGaOk",
                                        jTcf_EQ_W: "Vorstellungs-Countdowns & Spielzeiten",
                                        layoutId: "XwaqtGaOk",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-16mbcmc-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "ro8zhMpFJ",
                                        jTcf_EQ_W: "Popcorn-Portionsrechner",
                                        layoutId: "ro8zhMpFJ",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1cgsff4-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "eEdtSAu35",
                                        jTcf_EQ_W: "Service-Funkruf & Walkie",
                                        layoutId: "eEdtSAu35",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-wakelz-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "XTPKAlvRr",
                                        jTcf_EQ_W: "Standard-Checklisten & Saal-Walk",
                                        layoutId: "XTPKAlvRr",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            t("div", {
                              className: "framer-1tbb8ib",
                              "data-border": !0,
                              children: [
                                t("div", {
                                  className: "framer-1r5ijq3",
                                  children: [
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h5", {
                                          className: "framer-styles-preset-13rf66x",
                                          "data-styles-preset": "GPDKd6Ic6",
                                          style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                          children: "Pro",
                                        }),
                                      }),
                                      className: "framer-dadwc",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                    r(e, {
                                      className: "framer-pps98f-container",
                                      children: r(p, {
                                        GmAhv_WVa: 1,
                                        height: "100%",
                                        hSgW9f2ir: "Empfohlen für Schichtleiter",
                                        id: "yEwSavUpP",
                                        layoutId: "yEwSavUpP",
                                        p2xmGpLux: "Read more",
                                        ToKaS18SW: !1,
                                        variant: "Nq1uWl93W",
                                        width: "100%",
                                        Z69PPXt7v: !0,
                                      }),
                                    }),
                                  ],
                                }),
                                t("div", {
                                  className: "framer-wygnpu",
                                  children: [
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h2", {
                                          className: "framer-styles-preset-4m6e0d",
                                          "data-styles-preset": "Bgl_uNKYX",
                                          style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                          children: "$9",
                                        }),
                                      }),
                                      className: "framer-1vxihr5",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h5", {
                                          className: "framer-styles-preset-13rf66x",
                                          "data-styles-preset": "GPDKd6Ic6",
                                          style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                          children: "/month",
                                        }),
                                      }),
                                      className: "framer-70fs8t",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                r(e, {
                                  className: "framer-fungp1-container",
                                  children: r(n, {
                                    eszixBaDA: 10,
                                    height: "100%",
                                    id: "pl_8OsYT1",
                                    ik9I5qIGz: !1,
                                    J0LC2FGV8: !1,
                                    KJK1sV1GB: "Dashboard starten →",
                                    layoutId: "pl_8OsYT1",
                                    RmkZjgJwi: "ArrowRight",
                                    style: { width: "100%" },
                                    UsLusPFRg: "rgb(0, 0, 0)",
                                    variant: "zb8n5Cev9",
                                    width: "100%",
                                  }),
                                }),
                                t("div", {
                                  className: "framer-13qez00",
                                  children: [
                                    r(e, {
                                      className: "framer-1140vgc-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "b4pTYFjxb",
                                        jTcf_EQ_W: "Digitales Übergabebuch (persistent)",
                                        layoutId: "b4pTYFjxb",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-xtib0w-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "y3kHjg3tl",
                                        jTcf_EQ_W: "Vorstellungs-Countdowns & Spielzeiten",
                                        layoutId: "y3kHjg3tl",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1qgz6ak-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "RPbZP8TGd",
                                        jTcf_EQ_W: "Reinigungs- & Einlass-Alerts",
                                        layoutId: "RPbZP8TGd",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-vpb8kk-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "lUAPxNPKY",
                                        jTcf_EQ_W: "Multi-Kino Synchronisation",
                                        layoutId: "lUAPxNPKY",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1yu4owb-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "ApGcpVzGr",
                                        jTcf_EQ_W: "Prioritäts-Funkruf an alle Bereiche",
                                        layoutId: "ApGcpVzGr",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-wo2xbw-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "Lln4VDl_3",
                                        jTcf_EQ_W: "Concession-Bedarfsoptimierung",
                                        layoutId: "Lln4VDl_3",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1v7kwv8-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "LoAUZ_ZVC",
                                        jTcf_EQ_W: "Schicht-Export & Tagesberichte",
                                        layoutId: "LoAUZ_ZVC",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            t("div", {
                              className: "framer-170icb3",
                              "data-border": !0,
                              children: [
                                r(m, {
                                  __fromCanvasComponent: !0,
                                  children: r(i, {
                                    children: r("h5", {
                                      className: "framer-styles-preset-13rf66x",
                                      "data-styles-preset": "GPDKd6Ic6",
                                      children: "Business",
                                    }),
                                  }),
                                  className: "framer-mc6b1j",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                t("div", {
                                  className: "framer-dew1uu",
                                  children: [
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h2", {
                                          className: "framer-styles-preset-4m6e0d",
                                          "data-styles-preset": "Bgl_uNKYX",
                                          children: "$19",
                                        }),
                                      }),
                                      className: "framer-1dtaq7x",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h5", {
                                          className: "framer-styles-preset-13rf66x",
                                          "data-styles-preset": "GPDKd6Ic6",
                                          children: "/month",
                                        }),
                                      }),
                                      className: "framer-193d3jw",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                r(e, {
                                  className: "framer-1nal9d1-container",
                                  children: r(n, {
                                    eszixBaDA: 10,
                                    height: "100%",
                                    id: "OEMu_ZIIg",
                                    ik9I5qIGz: !1,
                                    J0LC2FGV8: !1,
                                    KJK1sV1GB: "Dashboard starten →",
                                    layoutId: "OEMu_ZIIg",
                                    RmkZjgJwi: "ArrowRight",
                                    style: { width: "100%" },
                                    UsLusPFRg: "rgb(0, 0, 0)",
                                    variant: "PqgBulBPi",
                                    width: "100%",
                                  }),
                                }),
                                t("div", {
                                  className: "framer-1yjtyhp",
                                  children: [
                                    r(e, {
                                      className: "framer-1ml1ts-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "JLQwSJUFu",
                                        jTcf_EQ_W: "Barco & Christie Laser-Telemetrie",
                                        layoutId: "JLQwSJUFu",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1hlxfin-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "pCizQeMhe",
                                        jTcf_EQ_W: "Vorstellungs-Countdowns & Spielzeiten",
                                        layoutId: "pCizQeMhe",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-hh8ady-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "NbThaeuD2",
                                        jTcf_EQ_W: "DMX-Lichtautomation (Einlass/Show/Pause)",
                                        layoutId: "NbThaeuD2",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-bopy08-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "TrPgOnqWy",
                                        jTcf_EQ_W: "TMS & Barco/Christie Schnittstelle",
                                        layoutId: "TrPgOnqWy",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-3ozxur-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "ET_gn_BAi",
                                        jTcf_EQ_W: "18 Standorte Multisite-Monitoring",
                                        layoutId: "ET_gn_BAi",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-64n9lq-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "Nlls3bRoc",
                                        jTcf_EQ_W: "TMS & CPL Playlisten-Abgleich",
                                        layoutId: "Nlls3bRoc",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-vgxn3o-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "QBjzp0PjU",
                                        jTcf_EQ_W: "Concession-Bedarfsoptimierung",
                                        layoutId: "QBjzp0PjU",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1htukl6-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "HTmqxS6yf",
                                        jTcf_EQ_W: "Schicht-Export & Tagesberichte",
                                        layoutId: "HTmqxS6yf",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-16ccwbw-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "XdilF8Oxi",
                                        jTcf_EQ_W: "API & TMS-Schnittstelle",
                                        layoutId: "XdilF8Oxi",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1kuh6g6-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "KgRPX0YXY",
                                        jTcf_EQ_W: "Ausfallsichere Notfall-Steuerung",
                                        layoutId: "KgRPX0YXY",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  r("div", {
                    className: "framer-pa2d6",
                    "data-border": !0,
                    "data-framer-name": "Wrapper",
                    name: "Wrapper",
                    children: t("div", {
                      className: "framer-1h1u4xj",
                      "data-framer-name": "Pricing Night",
                      name: "Pricing Night",
                      children: [
                        t("div", {
                          className: "framer-vv33pt",
                          children: [
                            r(m, {
                              __fromCanvasComponent: !0,
                              children: r(i, {
                                children: r("h2", {
                                  className: "framer-styles-preset-4m6e0d",
                                  "data-styles-preset": "Bgl_uNKYX",
                                  style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                  children: "Pricing",
                                }),
                              }),
                              className: "framer-18742n6",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                            r(m, {
                              __fromCanvasComponent: !0,
                              children: r(i, {
                                children: r("p", {
                                  className: "framer-styles-preset-sxuwop",
                                  "data-styles-preset": "dGJYq65Lz",
                                  style: {
                                    "--framer-text-alignment": "center",
                                    "--framer-text-color": "rgb(255, 255, 255)",
                                  },
                                  children:
                                    "Von der Einlasskontrolle am Foyer bis zur zentralen Theaterleitung und technischen Vorführraum-Automation.",
                                }),
                              }),
                              className: "framer-1f0iq0g",
                              verticalAlignment: "top",
                              withExternalLayout: !0,
                            }),
                          ],
                        }),
                        t("div", {
                          className: "framer-1c8mr4n",
                          children: [
                            t("div", {
                              className: "framer-1c7kul5",
                              "data-border": !0,
                              children: [
                                r(m, {
                                  __fromCanvasComponent: !0,
                                  children: r(i, {
                                    children: r("h5", {
                                      className: "framer-styles-preset-13rf66x",
                                      "data-styles-preset": "GPDKd6Ic6",
                                      style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                      children: "Free",
                                    }),
                                  }),
                                  className: "framer-1i9c9zt",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                t("div", {
                                  className: "framer-1ykw32r",
                                  children: [
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h2", {
                                          className: "framer-styles-preset-4m6e0d",
                                          "data-styles-preset": "Bgl_uNKYX",
                                          style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                          children: "$0",
                                        }),
                                      }),
                                      className: "framer-rfaek0",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h5", {
                                          className: "framer-styles-preset-13rf66x",
                                          "data-styles-preset": "GPDKd6Ic6",
                                          style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                          children: "/month",
                                        }),
                                      }),
                                      className: "framer-1236qr9",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                r(e, {
                                  className: "framer-1r8fhx2-container",
                                  children: r(n, {
                                    eszixBaDA: 10,
                                    height: "100%",
                                    id: "DVxRCxC2L",
                                    ik9I5qIGz: !1,
                                    J0LC2FGV8: !1,
                                    KJK1sV1GB: "Modul öffnen →",
                                    layoutId: "DVxRCxC2L",
                                    RmkZjgJwi: "ArrowRight",
                                    style: { width: "100%" },
                                    UsLusPFRg: "rgb(0, 0, 0)",
                                    variant: "zb8n5Cev9",
                                    width: "100%",
                                  }),
                                }),
                                t("div", {
                                  className: "framer-1tcs239",
                                  children: [
                                    r(e, {
                                      className: "framer-aidpri-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "bFCac0mGs",
                                        jTcf_EQ_W: "Live-Saalbelegung & Einlassampel",
                                        layoutId: "bFCac0mGs",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1xtapi3-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "n7BluYfch",
                                        jTcf_EQ_W: "Vorstellungs-Countdowns & Spielzeiten",
                                        layoutId: "n7BluYfch",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-zi46yq-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "MTcz1oEnA",
                                        jTcf_EQ_W: "Popcorn-Portionsrechner",
                                        layoutId: "MTcz1oEnA",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-lo7evc-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "IDlJCzyFj",
                                        jTcf_EQ_W: "Service-Funkruf & Walkie",
                                        layoutId: "IDlJCzyFj",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1hnag3h-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "vMGpHRmpV",
                                        jTcf_EQ_W: "Standard-Checklisten & Saal-Walk",
                                        layoutId: "vMGpHRmpV",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            t("div", {
                              className: "framer-c6my8k",
                              "data-border": !0,
                              children: [
                                t("div", {
                                  className: "framer-t69qsl",
                                  children: [
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h5", {
                                          className: "framer-styles-preset-13rf66x",
                                          "data-styles-preset": "GPDKd6Ic6",
                                          style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                          children: "Pro",
                                        }),
                                      }),
                                      className: "framer-49rd25",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                    r(e, {
                                      className: "framer-1yo4dv0-container",
                                      children: r(p, {
                                        GmAhv_WVa: 1,
                                        height: "100%",
                                        hSgW9f2ir: "Empfohlen für Schichtleiter",
                                        id: "snncrr4S4",
                                        layoutId: "snncrr4S4",
                                        p2xmGpLux: "Read more",
                                        ToKaS18SW: !1,
                                        variant: "Z2wjynIFK",
                                        width: "100%",
                                        Z69PPXt7v: !0,
                                      }),
                                    }),
                                  ],
                                }),
                                t("div", {
                                  className: "framer-1jauy5p",
                                  children: [
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h2", {
                                          className: "framer-styles-preset-4m6e0d",
                                          "data-styles-preset": "Bgl_uNKYX",
                                          style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                          children: "$9",
                                        }),
                                      }),
                                      className: "framer-13b9e0p",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h5", {
                                          className: "framer-styles-preset-13rf66x",
                                          "data-styles-preset": "GPDKd6Ic6",
                                          style: { "--framer-text-color": "rgb(0, 0, 0)" },
                                          children: "/month",
                                        }),
                                      }),
                                      className: "framer-1pslssx",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                r(e, {
                                  className: "framer-m8i5g4-container",
                                  children: r(n, {
                                    eszixBaDA: 10,
                                    height: "100%",
                                    id: "fYL2CjEIK",
                                    ik9I5qIGz: !1,
                                    J0LC2FGV8: !1,
                                    KJK1sV1GB: "Dashboard starten →",
                                    layoutId: "fYL2CjEIK",
                                    RmkZjgJwi: "ArrowRight",
                                    style: { width: "100%" },
                                    UsLusPFRg: "rgb(0, 0, 0)",
                                    variant: "PqgBulBPi",
                                    width: "100%",
                                  }),
                                }),
                                t("div", {
                                  className: "framer-14czvy8",
                                  children: [
                                    r(e, {
                                      className: "framer-e1t0nt-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "z5j5hsnyq",
                                        jTcf_EQ_W: "Digitales Übergabebuch (persistent)",
                                        layoutId: "z5j5hsnyq",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-fhbveo-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "QTR8MKVRl",
                                        jTcf_EQ_W: "Vorstellungs-Countdowns & Spielzeiten",
                                        layoutId: "QTR8MKVRl",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1t1kkh9-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "yvtfJNTwH",
                                        jTcf_EQ_W: "Reinigungs- & Einlass-Alerts",
                                        layoutId: "yvtfJNTwH",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-13xlsht-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "iHfQeFSCa",
                                        jTcf_EQ_W: "Multi-Kino Synchronisation",
                                        layoutId: "iHfQeFSCa",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-alftci-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "ZO09PpygT",
                                        jTcf_EQ_W: "Prioritäts-Funkruf an alle Bereiche",
                                        layoutId: "ZO09PpygT",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-656r2f-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "UFiV_4uzE",
                                        jTcf_EQ_W: "Concession-Bedarfsoptimierung",
                                        layoutId: "UFiV_4uzE",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1qf2t0l-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "QjJ3dhYIy",
                                        jTcf_EQ_W: "Schicht-Export & Tagesberichte",
                                        layoutId: "QjJ3dhYIy",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(0, 0, 0)",
                                        width: "100%",
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            t("div", {
                              className: "framer-yxu5a8",
                              "data-border": !0,
                              children: [
                                r(m, {
                                  __fromCanvasComponent: !0,
                                  children: r(i, {
                                    children: r("h5", {
                                      className: "framer-styles-preset-13rf66x",
                                      "data-styles-preset": "GPDKd6Ic6",
                                      style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                      children: "Business",
                                    }),
                                  }),
                                  className: "framer-1qtn2ed",
                                  verticalAlignment: "top",
                                  withExternalLayout: !0,
                                }),
                                t("div", {
                                  className: "framer-fmdvdh",
                                  children: [
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h2", {
                                          className: "framer-styles-preset-4m6e0d",
                                          "data-styles-preset": "Bgl_uNKYX",
                                          style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                          children: "$19",
                                        }),
                                      }),
                                      className: "framer-kg0d02",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                    r(m, {
                                      __fromCanvasComponent: !0,
                                      children: r(i, {
                                        children: r("h5", {
                                          className: "framer-styles-preset-13rf66x",
                                          "data-styles-preset": "GPDKd6Ic6",
                                          style: { "--framer-text-color": "rgb(255, 255, 255)" },
                                          children: "/month",
                                        }),
                                      }),
                                      className: "framer-17izozl",
                                      verticalAlignment: "top",
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                                r(e, {
                                  className: "framer-da2466-container",
                                  children: r(n, {
                                    eszixBaDA: 10,
                                    height: "100%",
                                    id: "abh9YXngC",
                                    ik9I5qIGz: !1,
                                    J0LC2FGV8: !1,
                                    KJK1sV1GB: "Dashboard starten →",
                                    layoutId: "abh9YXngC",
                                    RmkZjgJwi: "ArrowRight",
                                    style: { width: "100%" },
                                    UsLusPFRg: "rgb(0, 0, 0)",
                                    variant: "zb8n5Cev9",
                                    width: "100%",
                                  }),
                                }),
                                t("div", {
                                  className: "framer-hliwkq",
                                  children: [
                                    r(e, {
                                      className: "framer-c5mjv0-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "BzhwHdd5x",
                                        jTcf_EQ_W: "Barco & Christie Laser-Telemetrie",
                                        layoutId: "BzhwHdd5x",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-152ai5s-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "B2aoboGiq",
                                        jTcf_EQ_W: "Vorstellungs-Countdowns & Spielzeiten",
                                        layoutId: "B2aoboGiq",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-5g4dw0-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "GYEXmynuc",
                                        jTcf_EQ_W: "DMX-Lichtautomation (Einlass/Show/Pause)",
                                        layoutId: "GYEXmynuc",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-wsyrqj-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "m3Ggjo6Nr",
                                        jTcf_EQ_W: "TMS & Barco/Christie Schnittstelle",
                                        layoutId: "m3Ggjo6Nr",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1f7xbt0-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "SXxmRj4Mf",
                                        jTcf_EQ_W: "18 Standorte Multisite-Monitoring",
                                        layoutId: "SXxmRj4Mf",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-16vo756-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "WRb0S3LQf",
                                        jTcf_EQ_W: "TMS & CPL Playlisten-Abgleich",
                                        layoutId: "WRb0S3LQf",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-s21453-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "DC4vj2RwP",
                                        jTcf_EQ_W: "Concession-Bedarfsoptimierung",
                                        layoutId: "DC4vj2RwP",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1fqedok-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "H0Pp0wBl2",
                                        jTcf_EQ_W: "Schicht-Export & Tagesberichte",
                                        layoutId: "H0Pp0wBl2",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-1yx4uuk-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "L9S0tza5J",
                                        jTcf_EQ_W: "API & TMS-Schnittstelle",
                                        layoutId: "L9S0tza5J",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                    r(e, {
                                      className: "framer-sihan6-container",
                                      children: r(a, {
                                        height: "100%",
                                        id: "QmMNCbea1",
                                        jTcf_EQ_W: "Ausfallsichere Notfall-Steuerung",
                                        layoutId: "QmMNCbea1",
                                        pbavLymla: "Check",
                                        T2CsNbFcm: "rgb(255, 255, 255)",
                                        width: "100%",
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            r("div", { className: y(D, ...v), id: "overlay" }),
          ],
        }),
      })
    );
  }),
  ir = [
    '.framer-7rp5I[data-border="true"]::after, .framer-7rp5I [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
    "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
    ".framer-7rp5I.framer-lblowy, .framer-7rp5I .framer-lblowy { display: block; }",
    ".framer-7rp5I.framer-15p23cf { --border-bottom-width: 1px; --border-color: rgba(173, 173, 173, 0.4); --border-left-width: 1px; --border-right-width: 1px; --border-style: dashed; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 1200px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-7rp5I .framer-96qs98 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; max-width: 1600px; overflow: hidden; padding: 20px 20px 20px 20px; position: relative; width: 100%; }",
    '.framer-7rp5I .framer-1hmh6th, .framer-7rp5I .framer-pa2d6 { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)) /* {"name":"Border Day"} */; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; border-top-left-radius: 15px; border-top-right-radius: 15px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }',
    ".framer-7rp5I .framer-1mawi7y { align-content: center; align-items: center; background-color: #ffffff; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 40px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 1px; }",
    ".framer-7rp5I .framer-10or1dx, .framer-7rp5I .framer-vv33pt { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-7rp5I .framer-bndhqp, .framer-7rp5I .framer-18742n6 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 510px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-7rp5I .framer-wna4qu, .framer-7rp5I .framer-1f0iq0g { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; max-width: 450px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
    ".framer-7rp5I .framer-1v8ki7o, .framer-7rp5I .framer-1c8mr4n { align-content: flex-end; align-items: flex-end; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: visible; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-7rp5I .framer-1832ih9, .framer-7rp5I .framer-170icb3 { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: flex-start; align-items: flex-start; background-color: var(--token-8c47652b-dea5-4767-a9f2-5d952dcce49a, #ffffff); border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1); display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; max-width: 320px; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 1px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-7rp5I .framer-1gj65np, .framer-7rp5I .framer-1wyeeit, .framer-7rp5I .framer-dadwc, .framer-7rp5I .framer-70fs8t, .framer-7rp5I .framer-mc6b1j, .framer-7rp5I .framer-193d3jw, .framer-7rp5I .framer-1i9c9zt, .framer-7rp5I .framer-1236qr9, .framer-7rp5I .framer-49rd25, .framer-7rp5I .framer-1pslssx, .framer-7rp5I .framer-1qtn2ed, .framer-7rp5I .framer-17izozl { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; opacity: 0.5; position: relative; white-space: pre; width: auto; }",
    ".framer-7rp5I .framer-1lpznfy, .framer-7rp5I .framer-wygnpu, .framer-7rp5I .framer-dew1uu, .framer-7rp5I .framer-1ykw32r, .framer-7rp5I .framer-1jauy5p, .framer-7rp5I .framer-fmdvdh { align-content: flex-end; align-items: flex-end; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 4px; height: min-content; justify-content: flex-start; max-width: 100%; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-7rp5I .framer-2icbh1, .framer-7rp5I .framer-1vxihr5, .framer-7rp5I .framer-1dtaq7x, .framer-7rp5I .framer-rfaek0, .framer-7rp5I .framer-13b9e0p, .framer-7rp5I .framer-kg0d02 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
    ".framer-7rp5I .framer-1a57vmt-container, .framer-7rp5I .framer-fungp1-container, .framer-7rp5I .framer-1nal9d1-container, .framer-7rp5I .framer-1r8fhx2-container, .framer-7rp5I .framer-m8i5g4-container, .framer-7rp5I .framer-da2466-container { flex: none; height: auto; position: relative; width: 100%; z-index: 2; }",
    ".framer-7rp5I .framer-1t3o3kw, .framer-7rp5I .framer-13qez00, .framer-7rp5I .framer-1yjtyhp, .framer-7rp5I .framer-1tcs239, .framer-7rp5I .framer-14czvy8, .framer-7rp5I .framer-hliwkq { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-7rp5I .framer-8y1j0h-container, .framer-7rp5I .framer-jcadlt-container, .framer-7rp5I .framer-16mbcmc-container, .framer-7rp5I .framer-1cgsff4-container, .framer-7rp5I .framer-wakelz-container, .framer-7rp5I .framer-pps98f-container, .framer-7rp5I .framer-1140vgc-container, .framer-7rp5I .framer-xtib0w-container, .framer-7rp5I .framer-1qgz6ak-container, .framer-7rp5I .framer-vpb8kk-container, .framer-7rp5I .framer-1yu4owb-container, .framer-7rp5I .framer-wo2xbw-container, .framer-7rp5I .framer-1v7kwv8-container, .framer-7rp5I .framer-1ml1ts-container, .framer-7rp5I .framer-1hlxfin-container, .framer-7rp5I .framer-hh8ady-container, .framer-7rp5I .framer-bopy08-container, .framer-7rp5I .framer-3ozxur-container, .framer-7rp5I .framer-64n9lq-container, .framer-7rp5I .framer-vgxn3o-container, .framer-7rp5I .framer-1htukl6-container, .framer-7rp5I .framer-16ccwbw-container, .framer-7rp5I .framer-1kuh6g6-container, .framer-7rp5I .framer-aidpri-container, .framer-7rp5I .framer-1xtapi3-container, .framer-7rp5I .framer-zi46yq-container, .framer-7rp5I .framer-lo7evc-container, .framer-7rp5I .framer-1hnag3h-container, .framer-7rp5I .framer-1yo4dv0-container, .framer-7rp5I .framer-e1t0nt-container, .framer-7rp5I .framer-fhbveo-container, .framer-7rp5I .framer-1t1kkh9-container, .framer-7rp5I .framer-13xlsht-container, .framer-7rp5I .framer-alftci-container, .framer-7rp5I .framer-656r2f-container, .framer-7rp5I .framer-1qf2t0l-container, .framer-7rp5I .framer-c5mjv0-container, .framer-7rp5I .framer-152ai5s-container, .framer-7rp5I .framer-5g4dw0-container, .framer-7rp5I .framer-wsyrqj-container, .framer-7rp5I .framer-1f7xbt0-container, .framer-7rp5I .framer-16vo756-container, .framer-7rp5I .framer-s21453-container, .framer-7rp5I .framer-1fqedok-container, .framer-7rp5I .framer-1yx4uuk-container, .framer-7rp5I .framer-sihan6-container { flex: none; height: auto; position: relative; width: auto; }",
    ".framer-7rp5I .framer-1tbb8ib { --border-bottom-width: 1px; --border-color: var(--token-700a1961-c2b8-4f37-ad37-e3c28ea0fc93, rgba(34, 34, 34, 0.1)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: flex-start; align-items: flex-start; background-color: #000000; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1); display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; max-width: 320px; overflow: visible; padding: 40px 40px 40px 40px; position: relative; width: 1px; }",
    ".framer-7rp5I .framer-1r5ijq3, .framer-7rp5I .framer-t69qsl { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; overflow: hidden; padding: 0px 0px 0px 0px; position: relative; width: 100%; }",
    ".framer-7rp5I .framer-1h1u4xj { align-content: center; align-items: center; background-color: #000000; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 40px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 40px 80px 40px; position: relative; width: 1px; }",
    ".framer-7rp5I .framer-1c7kul5, .framer-7rp5I .framer-yxu5a8 { --border-bottom-width: 1px; --border-color: var(--token-58a904ff-197a-49b3-8356-adaa464e1642, rgba(255, 255, 255, 0.12)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: flex-start; align-items: flex-start; background-color: var(--token-fae2c128-35fb-45de-a6c2-32169f920c68, #141414); border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; max-width: 320px; overflow: hidden; padding: 40px 40px 40px 40px; position: relative; width: 1px; will-change: var(--framer-will-change-override, transform); }",
    ".framer-7rp5I .framer-c6my8k { --border-bottom-width: 1px; --border-color: var(--token-58a904ff-197a-49b3-8356-adaa464e1642, rgba(255, 255, 255, 0.12)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-content: flex-start; align-items: flex-start; background-color: #ffffff; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; max-width: 320px; overflow: visible; padding: 40px 40px 40px 40px; position: relative; width: 1px; }",
    "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-7rp5I.framer-15p23cf, .framer-7rp5I .framer-96qs98, .framer-7rp5I .framer-1hmh6th, .framer-7rp5I .framer-1mawi7y, .framer-7rp5I .framer-10or1dx, .framer-7rp5I .framer-1v8ki7o, .framer-7rp5I .framer-1832ih9, .framer-7rp5I .framer-1lpznfy, .framer-7rp5I .framer-1t3o3kw, .framer-7rp5I .framer-1tbb8ib, .framer-7rp5I .framer-wygnpu, .framer-7rp5I .framer-13qez00, .framer-7rp5I .framer-170icb3, .framer-7rp5I .framer-dew1uu, .framer-7rp5I .framer-1yjtyhp, .framer-7rp5I .framer-pa2d6, .framer-7rp5I .framer-1h1u4xj, .framer-7rp5I .framer-vv33pt, .framer-7rp5I .framer-1c8mr4n, .framer-7rp5I .framer-1c7kul5, .framer-7rp5I .framer-1ykw32r, .framer-7rp5I .framer-1tcs239, .framer-7rp5I .framer-c6my8k, .framer-7rp5I .framer-1jauy5p, .framer-7rp5I .framer-14czvy8, .framer-7rp5I .framer-yxu5a8, .framer-7rp5I .framer-fmdvdh, .framer-7rp5I .framer-hliwkq { gap: 0px; } .framer-7rp5I.framer-15p23cf > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-7rp5I.framer-15p23cf > :first-child, .framer-7rp5I .framer-96qs98 > :first-child, .framer-7rp5I .framer-1mawi7y > :first-child, .framer-7rp5I .framer-10or1dx > :first-child, .framer-7rp5I .framer-1832ih9 > :first-child, .framer-7rp5I .framer-1t3o3kw > :first-child, .framer-7rp5I .framer-1tbb8ib > :first-child, .framer-7rp5I .framer-13qez00 > :first-child, .framer-7rp5I .framer-170icb3 > :first-child, .framer-7rp5I .framer-1yjtyhp > :first-child, .framer-7rp5I .framer-1h1u4xj > :first-child, .framer-7rp5I .framer-vv33pt > :first-child, .framer-7rp5I .framer-1c7kul5 > :first-child, .framer-7rp5I .framer-1tcs239 > :first-child, .framer-7rp5I .framer-c6my8k > :first-child, .framer-7rp5I .framer-14czvy8 > :first-child, .framer-7rp5I .framer-yxu5a8 > :first-child, .framer-7rp5I .framer-hliwkq > :first-child { margin-top: 0px; } .framer-7rp5I.framer-15p23cf > :last-child, .framer-7rp5I .framer-96qs98 > :last-child, .framer-7rp5I .framer-1mawi7y > :last-child, .framer-7rp5I .framer-10or1dx > :last-child, .framer-7rp5I .framer-1832ih9 > :last-child, .framer-7rp5I .framer-1t3o3kw > :last-child, .framer-7rp5I .framer-1tbb8ib > :last-child, .framer-7rp5I .framer-13qez00 > :last-child, .framer-7rp5I .framer-170icb3 > :last-child, .framer-7rp5I .framer-1yjtyhp > :last-child, .framer-7rp5I .framer-1h1u4xj > :last-child, .framer-7rp5I .framer-vv33pt > :last-child, .framer-7rp5I .framer-1c7kul5 > :last-child, .framer-7rp5I .framer-1tcs239 > :last-child, .framer-7rp5I .framer-c6my8k > :last-child, .framer-7rp5I .framer-14czvy8 > :last-child, .framer-7rp5I .framer-yxu5a8 > :last-child, .framer-7rp5I .framer-hliwkq > :last-child { margin-bottom: 0px; } .framer-7rp5I .framer-96qs98 > *, .framer-7rp5I .framer-10or1dx > *, .framer-7rp5I .framer-1t3o3kw > *, .framer-7rp5I .framer-13qez00 > *, .framer-7rp5I .framer-1yjtyhp > *, .framer-7rp5I .framer-vv33pt > *, .framer-7rp5I .framer-1tcs239 > *, .framer-7rp5I .framer-14czvy8 > *, .framer-7rp5I .framer-hliwkq > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-7rp5I .framer-1hmh6th > *, .framer-7rp5I .framer-pa2d6 > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-7rp5I .framer-1hmh6th > :first-child, .framer-7rp5I .framer-1v8ki7o > :first-child, .framer-7rp5I .framer-1lpznfy > :first-child, .framer-7rp5I .framer-wygnpu > :first-child, .framer-7rp5I .framer-dew1uu > :first-child, .framer-7rp5I .framer-pa2d6 > :first-child, .framer-7rp5I .framer-1c8mr4n > :first-child, .framer-7rp5I .framer-1ykw32r > :first-child, .framer-7rp5I .framer-1jauy5p > :first-child, .framer-7rp5I .framer-fmdvdh > :first-child { margin-left: 0px; } .framer-7rp5I .framer-1hmh6th > :last-child, .framer-7rp5I .framer-1v8ki7o > :last-child, .framer-7rp5I .framer-1lpznfy > :last-child, .framer-7rp5I .framer-wygnpu > :last-child, .framer-7rp5I .framer-dew1uu > :last-child, .framer-7rp5I .framer-pa2d6 > :last-child, .framer-7rp5I .framer-1c8mr4n > :last-child, .framer-7rp5I .framer-1ykw32r > :last-child, .framer-7rp5I .framer-1jauy5p > :last-child, .framer-7rp5I .framer-fmdvdh > :last-child { margin-right: 0px; } .framer-7rp5I .framer-1mawi7y > *, .framer-7rp5I .framer-1h1u4xj > * { margin: 0px; margin-bottom: calc(40px / 2); margin-top: calc(40px / 2); } .framer-7rp5I .framer-1v8ki7o > *, .framer-7rp5I .framer-1c8mr4n > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } .framer-7rp5I .framer-1832ih9 > *, .framer-7rp5I .framer-1tbb8ib > *, .framer-7rp5I .framer-170icb3 > *, .framer-7rp5I .framer-1c7kul5 > *, .framer-7rp5I .framer-c6my8k > *, .framer-7rp5I .framer-yxu5a8 > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-7rp5I .framer-1lpznfy > *, .framer-7rp5I .framer-wygnpu > *, .framer-7rp5I .framer-dew1uu > *, .framer-7rp5I .framer-1ykw32r > *, .framer-7rp5I .framer-1jauy5p > *, .framer-7rp5I .framer-fmdvdh > * { margin: 0px; margin-left: calc(4px / 2); margin-right: calc(4px / 2); } }",
    "@media (min-width: 1200px) { .framer-7rp5I .hidden-15p23cf { display: none !important; } }",
    "@media (min-width: 810px) and (max-width: 1199px) { .framer-7rp5I .hidden-1hq76bk { display: none !important; } .framer-7rp5I.framer-15p23cf { width: 810px; } .framer-7rp5I .framer-wna4qu, .framer-7rp5I .framer-1f0iq0g { max-width: 340px; } .framer-7rp5I .framer-1v8ki7o, .framer-7rp5I .framer-1c8mr4n { align-content: center; align-items: center; flex-direction: column; } .framer-7rp5I .framer-1832ih9, .framer-7rp5I .framer-1tbb8ib, .framer-7rp5I .framer-170icb3, .framer-7rp5I .framer-1c7kul5, .framer-7rp5I .framer-c6my8k, .framer-7rp5I .framer-yxu5a8 { flex: none; width: 100%; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-7rp5I .framer-1v8ki7o, .framer-7rp5I .framer-1c8mr4n { gap: 0px; } .framer-7rp5I .framer-1v8ki7o > *, .framer-7rp5I .framer-1c8mr4n > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-7rp5I .framer-1v8ki7o > :first-child, .framer-7rp5I .framer-1c8mr4n > :first-child { margin-top: 0px; } .framer-7rp5I .framer-1v8ki7o > :last-child, .framer-7rp5I .framer-1c8mr4n > :last-child { margin-bottom: 0px; } }}",
    "@media (max-width: 809px) { .framer-7rp5I .hidden-pdtu13 { display: none !important; } .framer-7rp5I.framer-15p23cf { width: 390px; } .framer-7rp5I .framer-1mawi7y, .framer-7rp5I .framer-1h1u4xj { padding: 40px 20px 40px 20px; } .framer-7rp5I .framer-1v8ki7o, .framer-7rp5I .framer-1c8mr4n { flex-direction: column; } .framer-7rp5I .framer-1832ih9, .framer-7rp5I .framer-1tbb8ib, .framer-7rp5I .framer-170icb3, .framer-7rp5I .framer-1c7kul5, .framer-7rp5I .framer-c6my8k, .framer-7rp5I .framer-yxu5a8 { flex: none; width: 100%; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-7rp5I .framer-1v8ki7o, .framer-7rp5I .framer-1c8mr4n { gap: 0px; } .framer-7rp5I .framer-1v8ki7o > *, .framer-7rp5I .framer-1c8mr4n > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-7rp5I .framer-1v8ki7o > :first-child, .framer-7rp5I .framer-1c8mr4n > :first-child { margin-top: 0px; } .framer-7rp5I .framer-1v8ki7o > :last-child, .framer-7rp5I .framer-1c8mr4n > :last-child { margin-bottom: 0px; } }}",
    ...A,
    ...K,
    ...G,
  ],
  h = L(tr, ir, "framer-7rp5I"),
  kr = h;
h.displayName = "Navigation";
h.defaultProps = { height: 2050, width: 1200 };
q(h, [...X, ...O, ...Z, ...W, ...J, ...P]);
var Cr = {
  exports: {
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    default: {
      type: "reactComponent",
      name: "FramerALRtiMDBi",
      slots: [],
      annotations: {
        framerCanvasComponentVariantDetails:
          '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"O9GJJf5Q3":{"layout":["fixed","auto"]},"jMgiJyfMY":{"layout":["fixed","auto"]}}}',
        framerDisplayContentsDiv: "false",
        framerImmutableVariables: "true",
        framerIntrinsicHeight: "2050",
        framerResponsiveScreen: "",
        framerContractVersion: "1",
        framerIntrinsicWidth: "1200",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
export { Cr as __FramerMetadata__, kr as default };
//# sourceMappingURL=WCywW0NYcfPB_Ivh57ZODn_DoKIWj16TvmtzEFwqm04.MQ2DZP2D.mjs.map
