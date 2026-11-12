import { a as k, b as E } from "./chunk-KPBI24UR.mjs";
import {
  I as e,
  J as F,
  L as f,
  O as y,
  Q as _,
  U as R,
  ca as z,
  e as n,
  h,
} from "./chunk-QEUFNCD2.mjs";
import { c as r } from "./chunk-ELYU6EKT.mjs";
r.__framer_importFromPackage = (t, m) => () =>
  n(y, { error: 'Package component not supported: "' + m + '" in "' + t + '"' });
r.process = {
  ...r.process,
  env: { ...(r.process ? r.process.env : void 0), NODE_ENV: "production" },
};
_();
(async () => {
  let t = {
      IilknqsQI: {
        elements: {},
        page: e(() => import("./JmSSfF7yGld6eTQ6-xWo7jC98GeP0Bso_oxFSkrp-Vw.76K4NQNL.mjs")),
        path: "/",
      },
      CTyNb9C1r: {
        elements: {},
        page: e(() => import("./_3MdB-Ju4o0m0_4JRAPUdWNQgDbc8EZYwmT6L0mQjME.P45KUHFD.mjs")),
        path: "/404",
      },
      i7Jor1cUs: {
        elements: { eva67EI0j: "product" },
        page: e(() => import("./pRuXItxmVBd65VTCviCwc873CE8_Uprj8AhOOeCCLjk.FTQO4AZZ.mjs")),
        path: "/example-page-dark",
      },
      Rk9u34P9g: {
        elements: {},
        page: e(() => import("./Zs96ZiVMrEgHJ9Yz9onUj19fK1mVdbiEmTktP19he4k.LFS3EZRM.mjs")),
        path: "/3D-assets",
      },
      fimN5_XOF: {
        elements: {},
        page: e(() => import("./xreiFDp-h5jsRikHDnS0ctU4DmnFvKrN0qkW48TEfrc.M7SVHXMA.mjs")),
        path: "/banner",
      },
      YC_gL3ITH: {
        elements: {},
        page: e(() => import("./xGd8wm50oiChpLSlcSLZEgDPk1m8f_ab0V3ToEzAY-c.EJN5FFF2.mjs")),
        path: "/navigation",
      },
      DI6hFjZo0: {
        elements: {},
        page: e(() => import("./DnVSpYwIaiJViw220aej_NiEVH3HV4vCc4TVpjtGamk.MYLRET3H.mjs")),
        path: "/typography",
      },
      CuGpkj3X2: {
        elements: {},
        page: e(() => import("./WZi6r9auUu1a0208Um8YrOaGJZj9RDV15_AypGIJegM.NO3VRWTA.mjs")),
        path: "/footer",
      },
      OVYpNUqS_: {
        elements: {},
        page: e(() => import("./KIpfREs47Ycb98FnQcvNT1BAZX31o3A_TW-3GWHOeLs.O5QEBMKI.mjs")),
        path: "/tooltip",
      },
      EgBJHf15F: {
        elements: {},
        page: e(() => import("./amYiYuMzvG-ZsuINZubO8xIX0icNaR2a_2ejuXoMcmA.I5V65P2F.mjs")),
        path: "/cta",
      },
      WHqHmjRS0: {
        elements: {},
        page: e(() => import("./9mQS_ZEMMw15GGbzhX3tnpL8hOk-yIlFFRmStrQfQhs.HBONBTF6.mjs")),
        path: "/faq",
      },
      ALRtiMDBi: {
        elements: {},
        page: e(() => import("./WCywW0NYcfPB_Ivh57ZODn_DoKIWj16TvmtzEFwqm04.MQ2DZP2D.mjs")),
        path: "/pricing",
      },
      RHSPyjf_h: {
        elements: {},
        page: e(() => import("./N1YrEC7ZMbJ6Ky1IHyF23vxYvsx3aWUi99wdhV7GrOE.F3W5R54W.mjs")),
        path: "/logo",
      },
      Kc75hJ0SQ: {
        elements: {},
        page: e(() => import("./dop3TtP24uDjrSFP39vZmjkRqZFX3EWqFwBcgaZsUdU.2CO7NBH6.mjs")),
        path: "/testimonials",
      },
      dO1AcHSbQ: {
        elements: {},
        page: e(() => import("./10xJm-JWqXt65ycpp2qL0ymyZir7Ud1CA0HAiUPAmH4.XPY5I727.mjs")),
        path: "/features",
      },
      snktofd0B: {
        elements: {},
        page: e(() => import("./MGln7DF0ntkGfX3CGHIxmzA6j0v4Acc_9Kt6mOTU9H8.KQUDHSMX.mjs")),
        path: "/hero",
      },
      tKjvz8mqn: {
        elements: {},
        page: e(() => import("./nj6Hcnagv1G8ancZe00KtF-iqFMvTm7W_eLgYJ7WEA0.53XSRC7N.mjs")),
        path: "/button",
      },
      ldBmnwYzh: { page: e(() => import("./ldBmnwYzh-KNVIZ2Y3.mjs")) },
    },
    m = {},
    i = [{ code: "en", id: "default", name: "English", slug: "" }],
    b = e(() => import("./_3MdB-Ju4o0m0_4JRAPUdWNQgDbc8EZYwmT6L0mQjME.P45KUHFD.mjs")),
    s = document.getElementById("main"),
    o,
    l,
    p,
    c = !1;
  if ("framerHydrateV2" in s.dataset) {
    let a = JSON.parse(s.dataset.framerHydrateV2);
    ((o = a.routeId), (l = a.localeId), (p = a.pathVariables), (c = !0));
  } else {
    let a = f(t, decodeURIComponent(location.pathname), !0, i);
    ((o = a.routeId), (l = a.localeId), (p = a.pathVariables));
  }
  let d = await t[o].page.preload();
  t[o].page = d;
  let v = n(z, {
      RootComponent: d,
      isWebsite: !0,
      routeId: o,
      pathVariables: p,
      routes: t,
      collectionUtils: m,
      notFoundPage: b,
      isReducedMotion: void 0,
      localeId: l,
      locales: i,
      preserveQueryParams: void 0,
    }),
    I = n(R, { children: v, value: { imgSizesWorkaroundEnabled: !1 } }),
    g = n(F, { children: I, value: { routes: {} } });
  r.__framer_events = r.__framer_events || [];
  function P() {
    r.__framer_events.push(arguments);
  }
  function u(a, { componentStack: S }) {
    (P("published_site_load_recoverable_error", {
      message: String(a),
      stack: a instanceof Error && typeof a.stack == "string" ? a.stack : null,
      componentStack: S,
    }),
      console.error(a));
  }
  c
    ? h(() => {
        E(s, g, { onRecoverableError: u });
      })
    : k(s, { onRecoverableError: u }).render(g);
})().catch((t) => {
  throw (
    track("published_site_load_error", {
      message: String(t),
      stack: t instanceof Error && typeof t.stack == "string" ? t.stack : null,
    }),
    t
  );
});
//# sourceMappingURL=default_script0.OH6F7DCX.mjs.map
