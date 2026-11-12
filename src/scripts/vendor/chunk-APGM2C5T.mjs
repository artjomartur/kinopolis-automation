import { c as m } from "./chunk-ELYU6EKT.mjs";
var E = (t) => t;
var R = { ms: (t) => 1e3 * t, s: (t) => t / 1e3 };
function V(t, e) {
  return e ? t * (1e3 / e) : 0;
}
var H = (t, e, r) => (((1 - 3 * r + 3 * e) * t + (3 * r - 6 * e)) * t + 3 * e) * t,
  it = 1e-7,
  st = 12;
function at(t, e, r, n, o) {
  let i,
    s,
    d = 0;
  do ((s = e + (r - e) / 2), (i = H(s, n, o) - t), i > 0 ? (r = s) : (e = s));
  while (Math.abs(i) > it && ++d < st);
  return s;
}
function D(t, e, r, n) {
  if (t === e && r === n) return E;
  let o = (i) => at(i, 0, 1, t, r);
  return (i) => (i === 0 || i === 1 ? i : H(o(i), e, n));
}
var Zt = {
  ease: D(0.25, 0.1, 0.25, 1),
  "ease-in": D(0.42, 0, 1, 1),
  "ease-in-out": D(0.42, 0, 0.58, 1),
  "ease-out": D(0, 0, 0.58, 1),
};
function N(t, e) {
  var r = {};
  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function") {
    var o = 0;
    for (n = Object.getOwnPropertySymbols(t); o < n.length; o++)
      e.indexOf(n[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(t, n[o]) &&
        (r[n[o]] = t[n[o]]);
  }
  return r;
}
var A = {};
Object.defineProperty(A, "__esModule", { value: !0 });
A.warning = function () {};
A.invariant = function () {};
var ee = A.__esModule,
  ne = A.warning,
  ht = A.invariant;
var pt = 5;
function B(t, e, r) {
  let n = Math.max(e - pt, 0);
  return V(r - t(n), e - n);
}
var M = { stiffness: 100, damping: 10, mass: 1 },
  mt = (t = M.stiffness, e = M.damping, r = M.mass) => e / (2 * Math.sqrt(t * r));
function gt(t, e, r) {
  return (t < e && r >= e) || (t > e && r <= e);
}
var F = ({
    stiffness: t = M.stiffness,
    damping: e = M.damping,
    mass: r = M.mass,
    from: n = 0,
    to: o = 1,
    velocity: i = 0,
    restSpeed: s = 2,
    restDistance: d = 0.5,
  } = {}) => {
    i = i ? R.s(i) : 0;
    let u = { done: !1, hasReachedTarget: !1, current: n, target: o },
      f = o - n,
      a = Math.sqrt(t / r) / 1e3,
      l = mt(t, e, r),
      g;
    if (l < 1) {
      let h = a * Math.sqrt(1 - l * l);
      g = (p) =>
        o - Math.exp(-l * a * p) * (((l * a * f - i) / h) * Math.sin(h * p) + f * Math.cos(h * p));
    } else g = (h) => o - Math.exp(-a * h) * (f + (a * f - i) * h);
    return (h) => {
      u.current = g(h);
      let p = h === 0 ? i : B(g, h, u.current),
        S = Math.abs(p) <= s,
        y = Math.abs(o - u.current) <= d;
      return ((u.done = S && y), (u.hasReachedTarget = gt(n, o, u.current)), u);
    };
  },
  K = ({
    from: t = 0,
    velocity: e = 0,
    power: r = 0.8,
    decay: n = 0.325,
    bounceDamping: o,
    bounceStiffness: i,
    changeTarget: s,
    min: d,
    max: u,
    restDistance: f = 0.5,
    restSpeed: a,
  }) => {
    n = R.ms(n);
    let l = { hasReachedTarget: !1, done: !1, current: t, target: t },
      g = (c) => (d !== void 0 && c < d) || (u !== void 0 && c > u),
      h = (c) => (d === void 0 ? u : u === void 0 || Math.abs(d - c) < Math.abs(u - c) ? d : u),
      p = r * e,
      S = t + p,
      y = s === void 0 ? S : s(S);
    ((l.target = y), y !== S && (p = y - t));
    let j = (c) => -p * Math.exp(-c / n),
      P = (c) => y + j(c),
      x = (c) => {
        let T = j(c),
          W = P(c);
        ((l.done = Math.abs(T) <= f), (l.current = l.done ? y : W));
      },
      v,
      _,
      L = (c) => {
        g(l.current) &&
          ((v = c),
          (_ = F({
            from: l.current,
            to: h(l.current),
            velocity: B(P, c, l.current),
            damping: o,
            stiffness: i,
            restDistance: f,
            restSpeed: a,
          })));
      };
    return (
      L(0),
      (c) => {
        let T = !1;
        return (
          !_ && v === void 0 && ((T = !0), x(c), L(c)),
          v !== void 0 && c > v
            ? ((l.hasReachedTarget = !0), _(c - v))
            : ((l.hasReachedTarget = !1), !T && x(c), l)
        );
      }
    );
  },
  C = 10,
  yt = 1e4;
function X(t, e = E) {
  let r,
    n = C,
    o = t(0),
    i = [e(o.current)];
  for (; !o.done && n < yt;)
    ((o = t(n)),
      i.push(e(o.done ? o.target : o.current)),
      r === void 0 && o.hasReachedTarget && (r = n),
      (n += C));
  let s = n - C;
  return (
    i.length === 1 && i.push(o.current),
    { keyframes: i, duration: s / 1e3, overshootDuration: (r ?? s) / 1e3 }
  );
}
var vt = ["", "X", "Y", "Z"],
  bt = ["translate", "scale", "rotate", "skew"];
var Z = { syntax: "<angle>", initialValue: "0deg", toDefaultUnit: (t) => t + "deg" },
  wt = {
    translate: {
      syntax: "<length-percentage>",
      initialValue: "0px",
      toDefaultUnit: (t) => t + "px",
    },
    rotate: Z,
    scale: { syntax: "<number>", initialValue: 1, toDefaultUnit: E },
    skew: Z,
  },
  Ot = new Map(),
  Et = (t) => `--motion-${t}`,
  et = ["x", "y", "z"];
bt.forEach((t) => {
  vt.forEach((e) => {
    (et.push(t + e), Ot.set(Et(t + e), wt[t]));
  });
});
var Ae = new Set(et);
var Y = (t) => document.createElement("div").animate(t, { duration: 0.001 }),
  J = {
    cssRegisterProperty: () =>
      typeof CSS < "u" && Object.hasOwnProperty.call(CSS, "registerProperty"),
    waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
    partialKeyframes: () => {
      try {
        Y({ opacity: [1] });
      } catch {
        return !1;
      }
      return !0;
    },
    finished: () => !!Y({ opacity: [0, 1] }).finished,
  },
  q = {},
  St = {};
for (let t in J) St[t] = () => (q[t] === void 0 && (q[t] = J[t]()), q[t]);
function nt(t, e) {
  var r;
  return (
    typeof t == "string"
      ? e
        ? (((r = e[t]) !== null && r !== void 0) || (e[t] = document.querySelectorAll(t)),
          (t = e[t]))
        : (t = document.querySelectorAll(t))
      : t instanceof Element && (t = [t]),
    Array.from(t || [])
  );
}
function rt(t) {
  let e = new WeakMap();
  return (r = {}) => {
    let n = new Map(),
      o = (s = 0, d = 100, u = 0, f = !1) => {
        let a = `${s}-${d}-${u}-${f}`;
        return (
          n.has(a) ||
            n.set(
              a,
              t(
                Object.assign(
                  {
                    from: s,
                    to: d,
                    velocity: u,
                    restSpeed: f ? 0.05 : 2,
                    restDistance: f ? 0.01 : 0.5,
                  },
                  r
                )
              )
            ),
          n.get(a)
        );
      },
      i = (s) => (e.has(s) || e.set(s, X(s)), e.get(s));
    return {
      createAnimation: (s, d, u, f, a) => {
        var l, g;
        let h,
          p = s.length;
        if (u && p <= 2 && s.every(xt)) {
          let y = s[p - 1],
            j = p === 1 ? null : s[0],
            P = 0,
            x = 0,
            v = a?.generator;
          if (v) {
            let { animation: c, generatorStartTime: T } = a,
              W = c?.startTime || T || 0,
              $ = c?.currentTime || performance.now() - W,
              U = v($).current;
            ((x = (l = j) !== null && l !== void 0 ? l : U),
              (p === 1 || (p === 2 && s[0] === null)) && (P = B((ot) => v(ot).current, $, U)));
          } else x = (g = j) !== null && g !== void 0 ? g : parseFloat(d());
          let _ = o(x, y, P, f?.includes("scale")),
            L = i(_);
          ((h = Object.assign(Object.assign({}, L), { easing: "linear" })),
            a && ((a.generator = _), (a.generatorStartTime = performance.now())));
        } else h = { easing: "ease", duration: i(o(0, 100)).overshootDuration };
        return h;
      },
    };
  };
}
var xt = (t) => typeof t != "string",
  Me = rt(F),
  je = rt(K),
  _t = { any: 0, all: 1 };
function Tt(t, e, { root: r, margin: n, amount: o = "any" } = {}) {
  if (typeof IntersectionObserver > "u") return () => {};
  let i = nt(t),
    s = new WeakMap(),
    d = (f) => {
      f.forEach((a) => {
        let l = s.get(a.target);
        if (a.isIntersecting !== !!l)
          if (a.isIntersecting) {
            let g = e(a);
            typeof g == "function" ? s.set(a.target, g) : u.unobserve(a.target);
          } else l && (l(a), s.delete(a.target));
      });
    },
    u = new IntersectionObserver(d, {
      root: r,
      rootMargin: n,
      threshold: typeof o == "number" ? o : _t[o],
    });
  return (i.forEach((f) => u.observe(f)), () => u.disconnect());
}
var z = new WeakMap(),
  b;
function At(t, e) {
  if (e) {
    let { inlineSize: r, blockSize: n } = e[0];
    return { width: r, height: n };
  }
  return t instanceof SVGElement && "getBBox" in t
    ? t.getBBox()
    : { width: t.offsetWidth, height: t.offsetHeight };
}
function Mt({ target: t, contentRect: e, borderBoxSize: r }) {
  var n;
  (n = z.get(t)) === null ||
    n === void 0 ||
    n.forEach((o) => {
      o({
        target: t,
        contentSize: e,
        get size() {
          return At(t, r);
        },
      });
    });
}
function jt(t) {
  t.forEach(Mt);
}
function Pt() {
  typeof ResizeObserver < "u" && (b = new ResizeObserver(jt));
}
function Dt(t, e) {
  b || Pt();
  let r = nt(t);
  return (
    r.forEach((n) => {
      let o = z.get(n);
      (o || ((o = new Set()), z.set(n, o)), o.add(e), b?.observe(n));
    }),
    () => {
      r.forEach((n) => {
        let o = z.get(n);
        (o?.delete(e), o?.size || b?.unobserve(n));
      });
    }
  );
}
var I = new Set(),
  k;
function kt() {
  ((k = () => {
    let t = { width: m.innerWidth, height: m.innerHeight },
      e = { target: m, size: t, contentSize: t };
    I.forEach((r) => r(e));
  }),
    m.addEventListener("resize", k));
}
function Lt(t) {
  return (
    I.add(t),
    k || kt(),
    () => {
      (I.delete(t), !I.size && k && (k = void 0));
    }
  );
}
function Pe(t, e) {
  return typeof t == "function" ? Lt(t) : Dt(t, e);
}
function G(t, e, r) {
  t.dispatchEvent(new CustomEvent(e, { detail: { originalEvent: r } }));
}
function Q(t, e, r) {
  t.dispatchEvent(new CustomEvent(e, { detail: { originalEntry: r } }));
}
var Rt = {
    isActive: (t) => !!t.inView,
    subscribe: (t, { enable: e, disable: r }, { inViewOptions: n = {} }) => {
      let { once: o } = n,
        i = N(n, ["once"]);
      return Tt(
        t,
        (s) => {
          if ((e(), Q(t, "viewenter", s), !o))
            return (d) => {
              (r(), Q(t, "viewleave", d));
            };
        },
        i
      );
    },
  },
  tt = (t, e, r) => (n) => {
    (!n.pointerType || n.pointerType === "mouse") && (r(), G(t, e, n));
  },
  Bt = {
    isActive: (t) => !!t.hover,
    subscribe: (t, { enable: e, disable: r }) => {
      let n = tt(t, "hoverstart", e),
        o = tt(t, "hoverend", r);
      return (
        t.addEventListener("pointerenter", n),
        t.addEventListener("pointerleave", o),
        () => {
          (t.removeEventListener("pointerenter", n), t.removeEventListener("pointerleave", o));
        }
      );
    },
  },
  zt = {
    isActive: (t) => !!t.press,
    subscribe: (t, { enable: e, disable: r }) => {
      let n = (i) => {
          (r(), G(t, "pressend", i), m.removeEventListener("pointerup", n));
        },
        o = (i) => {
          (e(), G(t, "pressstart", i), m.addEventListener("pointerup", n));
        };
      return (
        t.addEventListener("pointerdown", o),
        () => {
          (t.removeEventListener("pointerdown", o), m.removeEventListener("pointerup", n));
        }
      );
    },
  },
  It = { inView: Rt, hover: Bt, press: zt },
  De = ["initial", "animate", ...Object.keys(It), "exit"];
export { Pe as a };
//# sourceMappingURL=chunk-APGM2C5T.mjs.map
