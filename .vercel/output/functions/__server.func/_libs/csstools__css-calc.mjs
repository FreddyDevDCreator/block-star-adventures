import { r as requireDist$1 } from "./@csstools/css-parser-algorithms+[...].mjs";
import { r as requireDist$2 } from "./csstools__css-tokenizer.mjs";
var dist = {};
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  var e = requireDist$1(), n = requireDist$2();
  const t = /[A-Z]/g;
  function toLowerCaseAZ(e2) {
    return e2.replace(t, ((e3) => String.fromCharCode(e3.charCodeAt(0) + 32)));
  }
  const o = { cm: "px", in: "px", mm: "px", pc: "px", pt: "px", px: "px", q: "px", deg: "deg", grad: "deg", rad: "deg", turn: "deg", ms: "s", s: "s", hz: "hz", khz: "hz" }, r = /* @__PURE__ */ new Map([["cm", (e2) => e2], ["mm", (e2) => 10 * e2], ["q", (e2) => 40 * e2], ["in", (e2) => e2 / 2.54], ["pc", (e2) => e2 / 2.54 * 6], ["pt", (e2) => e2 / 2.54 * 72], ["px", (e2) => e2 / 2.54 * 96]]), i = /* @__PURE__ */ new Map([["deg", (e2) => e2], ["grad", (e2) => e2 / 0.9], ["rad", (e2) => e2 / 180 * Math.PI], ["turn", (e2) => e2 / 360]]), u = /* @__PURE__ */ new Map([["deg", (e2) => 0.9 * e2], ["grad", (e2) => e2], ["rad", (e2) => 0.9 * e2 / 180 * Math.PI], ["turn", (e2) => 0.9 * e2 / 360]]), a = /* @__PURE__ */ new Map([["hz", (e2) => e2], ["khz", (e2) => e2 / 1e3]]), s = /* @__PURE__ */ new Map([["cm", (e2) => 2.54 * e2], ["mm", (e2) => 25.4 * e2], ["q", (e2) => 25.4 * e2 * 4], ["in", (e2) => e2], ["pc", (e2) => 6 * e2], ["pt", (e2) => 72 * e2], ["px", (e2) => 96 * e2]]), l = /* @__PURE__ */ new Map([["hz", (e2) => 1e3 * e2], ["khz", (e2) => e2]]), c = /* @__PURE__ */ new Map([["cm", (e2) => e2 / 10], ["mm", (e2) => e2], ["q", (e2) => 4 * e2], ["in", (e2) => e2 / 25.4], ["pc", (e2) => e2 / 25.4 * 6], ["pt", (e2) => e2 / 25.4 * 72], ["px", (e2) => e2 / 25.4 * 96]]), m = /* @__PURE__ */ new Map([["ms", (e2) => e2], ["s", (e2) => e2 / 1e3]]), v = /* @__PURE__ */ new Map([["cm", (e2) => e2 / 6 * 2.54], ["mm", (e2) => e2 / 6 * 25.4], ["q", (e2) => e2 / 6 * 25.4 * 4], ["in", (e2) => e2 / 6], ["pc", (e2) => e2], ["pt", (e2) => e2 / 6 * 72], ["px", (e2) => e2 / 6 * 96]]), T = /* @__PURE__ */ new Map([["cm", (e2) => e2 / 72 * 2.54], ["mm", (e2) => e2 / 72 * 25.4], ["q", (e2) => e2 / 72 * 25.4 * 4], ["in", (e2) => e2 / 72], ["pc", (e2) => e2 / 72 * 6], ["pt", (e2) => e2], ["px", (e2) => e2 / 72 * 96]]), p = /* @__PURE__ */ new Map([["cm", (e2) => e2 / 96 * 2.54], ["mm", (e2) => e2 / 96 * 25.4], ["q", (e2) => e2 / 96 * 25.4 * 4], ["in", (e2) => e2 / 96], ["pc", (e2) => e2 / 96 * 6], ["pt", (e2) => e2 / 96 * 72], ["px", (e2) => e2]]), N = /* @__PURE__ */ new Map([["cm", (e2) => e2 / 4 / 10], ["mm", (e2) => e2 / 4], ["q", (e2) => e2], ["in", (e2) => e2 / 4 / 25.4], ["pc", (e2) => e2 / 4 / 25.4 * 6], ["pt", (e2) => e2 / 4 / 25.4 * 72], ["px", (e2) => e2 / 4 / 25.4 * 96]]), f = /* @__PURE__ */ new Map([["deg", (e2) => 180 * e2 / Math.PI], ["grad", (e2) => 180 * e2 / Math.PI / 0.9], ["rad", (e2) => e2], ["turn", (e2) => 180 * e2 / Math.PI / 360]]), d = /* @__PURE__ */ new Map([["ms", (e2) => 1e3 * e2], ["s", (e2) => e2]]), k = /* @__PURE__ */ new Map([["deg", (e2) => 360 * e2], ["grad", (e2) => 360 * e2 / 0.9], ["rad", (e2) => 360 * e2 / 180 * Math.PI], ["turn", (e2) => e2]]), C = /* @__PURE__ */ new Map([["cm", r], ["mm", c], ["q", N], ["in", s], ["pc", v], ["pt", T], ["px", p], ["ms", m], ["s", d], ["deg", i], ["grad", u], ["rad", f], ["turn", k], ["hz", a], ["khz", l]]);
  function convertUnit(e2, t2) {
    if (!n.isTokenDimension(e2)) return t2;
    if (!n.isTokenDimension(t2)) return t2;
    const o2 = toLowerCaseAZ(e2[4].unit), r2 = toLowerCaseAZ(t2[4].unit);
    if (o2 === r2) return t2;
    const i2 = C.get(r2);
    if (!i2) return t2;
    const u2 = i2.get(o2);
    if (!u2) return t2;
    const a2 = u2(t2[4].value), s2 = [n.TokenType.Dimension, "", t2[2], t2[3], { ...t2[4], signCharacter: a2 < 0 ? "-" : void 0, type: Number.isInteger(a2) ? n.NumberType.Integer : n.NumberType.Number, value: a2 }];
    return n.mutateUnit(s2, e2[4].unit), s2;
  }
  function toCanonicalUnit(e2) {
    if (!n.isTokenDimension(e2)) return e2;
    const t2 = toLowerCaseAZ(e2[4].unit), r2 = o[t2];
    if (t2 === r2) return e2;
    const i2 = C.get(t2);
    if (!i2) return e2;
    const u2 = i2.get(r2);
    if (!u2) return e2;
    const a2 = u2(e2[4].value), s2 = [n.TokenType.Dimension, "", e2[2], e2[3], { ...e2[4], signCharacter: a2 < 0 ? "-" : void 0, type: Number.isInteger(a2) ? n.NumberType.Integer : n.NumberType.Number, value: a2 }];
    return n.mutateUnit(s2, r2), s2;
  }
  function addition(t2) {
    if (2 !== t2.length) return -1;
    const o2 = t2[0].value;
    let r2 = t2[1].value;
    if (n.isTokenNumber(o2) && n.isTokenNumber(r2)) {
      const t3 = o2[4].value + r2[4].value;
      return new e.TokenNode([n.TokenType.Number, t3.toString(), o2[2], r2[3], { value: t3, type: o2[4].type === n.NumberType.Integer && r2[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number }]);
    }
    if (n.isTokenPercentage(o2) && n.isTokenPercentage(r2)) {
      const t3 = o2[4].value + r2[4].value;
      return new e.TokenNode([n.TokenType.Percentage, t3.toString() + "%", o2[2], r2[3], { value: t3 }]);
    }
    if (n.isTokenDimension(o2) && n.isTokenDimension(r2) && (r2 = convertUnit(o2, r2), toLowerCaseAZ(o2[4].unit) === toLowerCaseAZ(r2[4].unit))) {
      const t3 = o2[4].value + r2[4].value;
      return new e.TokenNode([n.TokenType.Dimension, t3.toString() + o2[4].unit, o2[2], r2[3], { value: t3, type: o2[4].type === n.NumberType.Integer && r2[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number, unit: o2[4].unit }]);
    }
    return -1;
  }
  function division(t2) {
    if (2 !== t2.length) return -1;
    const o2 = t2[0].value, r2 = t2[1].value;
    if (n.isTokenNumber(o2) && n.isTokenNumber(r2)) {
      const t3 = o2[4].value / r2[4].value;
      return new e.TokenNode([n.TokenType.Number, t3.toString(), o2[2], r2[3], { value: t3, type: Number.isInteger(t3) ? n.NumberType.Integer : n.NumberType.Number }]);
    }
    if (n.isTokenPercentage(o2) && n.isTokenNumber(r2)) {
      const t3 = o2[4].value / r2[4].value;
      return new e.TokenNode([n.TokenType.Percentage, t3.toString() + "%", o2[2], r2[3], { value: t3 }]);
    }
    if (n.isTokenDimension(o2) && n.isTokenNumber(r2)) {
      const t3 = o2[4].value / r2[4].value;
      return new e.TokenNode([n.TokenType.Dimension, t3.toString() + o2[4].unit, o2[2], r2[3], { value: t3, type: Number.isInteger(t3) ? n.NumberType.Integer : n.NumberType.Number, unit: o2[4].unit }]);
    }
    return -1;
  }
  function isCalculation(e2) {
    return !!e2 && "object" == typeof e2 && "inputs" in e2 && Array.isArray(e2.inputs) && "operation" in e2;
  }
  function solve(n2) {
    if (-1 === n2) return -1;
    const t2 = [];
    for (let o2 = 0; o2 < n2.inputs.length; o2++) {
      const r2 = n2.inputs[o2];
      if (e.isTokenNode(r2)) {
        t2.push(r2);
        continue;
      }
      const i2 = solve(r2);
      if (-1 === i2) return -1;
      t2.push(i2);
    }
    return n2.operation(t2);
  }
  function multiplication(t2) {
    if (2 !== t2.length) return -1;
    const o2 = t2[0].value, r2 = t2[1].value;
    if (n.isTokenNumber(o2) && n.isTokenNumber(r2)) {
      const t3 = o2[4].value * r2[4].value;
      return new e.TokenNode([n.TokenType.Number, t3.toString(), o2[2], r2[3], { value: t3, type: o2[4].type === n.NumberType.Integer && r2[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number }]);
    }
    if (n.isTokenPercentage(o2) && n.isTokenNumber(r2)) {
      const t3 = o2[4].value * r2[4].value;
      return new e.TokenNode([n.TokenType.Percentage, t3.toString() + "%", o2[2], r2[3], { value: t3 }]);
    }
    if (n.isTokenNumber(o2) && n.isTokenPercentage(r2)) {
      const t3 = o2[4].value * r2[4].value;
      return new e.TokenNode([n.TokenType.Percentage, t3.toString() + "%", o2[2], r2[3], { value: t3 }]);
    }
    if (n.isTokenDimension(o2) && n.isTokenNumber(r2)) {
      const t3 = o2[4].value * r2[4].value;
      return new e.TokenNode([n.TokenType.Dimension, t3.toString() + o2[4].unit, o2[2], r2[3], { value: t3, type: o2[4].type === n.NumberType.Integer && r2[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number, unit: o2[4].unit }]);
    }
    if (n.isTokenNumber(o2) && n.isTokenDimension(r2)) {
      const t3 = o2[4].value * r2[4].value;
      return new e.TokenNode([n.TokenType.Dimension, t3.toString() + r2[4].unit, o2[2], r2[3], { value: t3, type: o2[4].type === n.NumberType.Integer && r2[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number, unit: r2[4].unit }]);
    }
    return -1;
  }
  function resolveGlobalsAndConstants(t2, o2) {
    for (let r2 = 0; r2 < t2.length; r2++) {
      const i2 = t2[r2];
      if (!e.isTokenNode(i2)) continue;
      const u2 = i2.value;
      if (!n.isTokenIdent(u2)) continue;
      const a2 = toLowerCaseAZ(u2[4].value);
      switch (a2) {
        case "e":
          t2.splice(r2, 1, new e.TokenNode([n.TokenType.Number, Math.E.toString(), u2[2], u2[3], { value: Math.E, type: n.NumberType.Number }]));
          break;
        case "pi":
          t2.splice(r2, 1, new e.TokenNode([n.TokenType.Number, Math.PI.toString(), u2[2], u2[3], { value: Math.PI, type: n.NumberType.Number }]));
          break;
        case "infinity":
          t2.splice(r2, 1, new e.TokenNode([n.TokenType.Number, "infinity", u2[2], u2[3], { value: 1 / 0, type: n.NumberType.Number }]));
          break;
        case "-infinity":
          t2.splice(r2, 1, new e.TokenNode([n.TokenType.Number, "-infinity", u2[2], u2[3], { value: -1 / 0, type: n.NumberType.Number }]));
          break;
        case "nan":
          t2.splice(r2, 1, new e.TokenNode([n.TokenType.Number, "NaN", u2[2], u2[3], { value: Number.NaN, type: n.NumberType.Number }]));
          break;
        default:
          if (o2.has(a2)) {
            const n2 = o2.get(a2);
            t2.splice(r2, 1, new e.TokenNode(n2));
          }
      }
    }
    return t2;
  }
  function unary(e2) {
    if (1 !== e2.length) return -1;
    const t2 = e2[0].value;
    return n.isTokenNumeric(t2) ? e2[0] : -1;
  }
  function resultToCalculation(e2, t2, o2) {
    return n.isTokenDimension(t2) ? dimensionToCalculation(e2, t2[4].unit, o2) : n.isTokenPercentage(t2) ? percentageToCalculation(e2, o2) : n.isTokenNumber(t2) ? numberToCalculation(e2, o2) : -1;
  }
  function dimensionToCalculation(t2, o2, r2) {
    const i2 = t2.tokens();
    return { inputs: [new e.TokenNode([n.TokenType.Dimension, r2.toString() + o2, i2[0][2], i2[i2.length - 1][3], { value: r2, type: Number.isInteger(r2) ? n.NumberType.Integer : n.NumberType.Number, unit: o2 }])], operation: unary };
  }
  function percentageToCalculation(t2, o2) {
    const r2 = t2.tokens();
    return { inputs: [new e.TokenNode([n.TokenType.Percentage, o2.toString() + "%", r2[0][2], r2[r2.length - 1][3], { value: o2 }])], operation: unary };
  }
  function numberToCalculation(t2, o2) {
    const r2 = t2.tokens();
    return { inputs: [new e.TokenNode([n.TokenType.Number, o2.toString(), r2[0][2], r2[r2.length - 1][3], { value: o2, type: Number.isInteger(o2) ? n.NumberType.Integer : n.NumberType.Number }])], operation: unary };
  }
  function solveACos(e2, t2) {
    const o2 = t2.value;
    if (!n.isTokenNumber(o2)) return -1;
    return dimensionToCalculation(e2, "rad", Math.acos(o2[4].value));
  }
  function solveASin(e2, t2) {
    const o2 = t2.value;
    if (!n.isTokenNumber(o2)) return -1;
    return dimensionToCalculation(e2, "rad", Math.asin(o2[4].value));
  }
  function solveATan(e2, t2) {
    const o2 = t2.value;
    if (!n.isTokenNumber(o2)) return -1;
    return dimensionToCalculation(e2, "rad", Math.atan(o2[4].value));
  }
  function isDimensionOrNumber(e2) {
    return n.isTokenDimension(e2) || n.isTokenNumber(e2);
  }
  function arrayOfSameNumeric(e2) {
    if (0 === e2.length) return true;
    const t2 = e2[0];
    if (!n.isTokenNumeric(t2)) return false;
    if (1 === e2.length) return true;
    if (n.isTokenDimension(t2)) {
      const n2 = toLowerCaseAZ(t2[4].unit);
      for (let o2 = 1; o2 < e2.length; o2++) {
        const r2 = e2[o2];
        if (t2[0] !== r2[0]) return false;
        if (n2 !== toLowerCaseAZ(r2[4].unit)) return false;
      }
      return true;
    }
    for (let n2 = 1; n2 < e2.length; n2++) {
      const o2 = e2[n2];
      if (t2[0] !== o2[0]) return false;
    }
    return true;
  }
  function twoOfSameNumeric(e2, t2) {
    return !!n.isTokenNumeric(e2) && (n.isTokenDimension(e2) ? e2[0] === t2[0] && toLowerCaseAZ(e2[4].unit) === toLowerCaseAZ(t2[4].unit) : e2[0] === t2[0]);
  }
  function solveATan2(e2, n2, t2) {
    const o2 = n2.value;
    if (!isDimensionOrNumber(o2)) return -1;
    const r2 = convertUnit(o2, t2.value);
    if (!twoOfSameNumeric(o2, r2)) return -1;
    return dimensionToCalculation(e2, "rad", Math.atan2(o2[4].value, r2[4].value));
  }
  function solveAbs(e2, t2, o2) {
    const r2 = t2.value;
    if (!n.isTokenNumeric(r2)) return -1;
    if (!o2.rawPercentages && n.isTokenPercentage(r2)) return -1;
    return resultToCalculation(e2, r2, Math.abs(r2[4].value));
  }
  function solveClamp(t2, o2, r2, i2, u2) {
    if (!e.isTokenNode(o2) || !e.isTokenNode(r2) || !e.isTokenNode(i2)) return -1;
    const a2 = o2.value;
    if (!n.isTokenNumeric(a2)) return -1;
    if (!u2.rawPercentages && n.isTokenPercentage(a2)) return -1;
    const s2 = convertUnit(a2, r2.value);
    if (!twoOfSameNumeric(a2, s2)) return -1;
    const l2 = convertUnit(a2, i2.value);
    if (!twoOfSameNumeric(a2, l2)) return -1;
    return resultToCalculation(t2, a2, Math.max(a2[4].value, Math.min(s2[4].value, l2[4].value)));
  }
  function solveCos(e2, t2) {
    const o2 = t2.value;
    if (!isDimensionOrNumber(o2)) return -1;
    let r2 = o2[4].value;
    if (n.isTokenDimension(o2)) switch (o2[4].unit.toLowerCase()) {
      case "rad":
        break;
      case "deg":
        r2 = i.get("rad")(o2[4].value);
        break;
      case "grad":
        r2 = u.get("rad")(o2[4].value);
        break;
      case "turn":
        r2 = k.get("rad")(o2[4].value);
        break;
      default:
        return -1;
    }
    return r2 = Math.cos(r2), numberToCalculation(e2, r2);
  }
  function solveExp(e2, t2) {
    const o2 = t2.value;
    if (!n.isTokenNumber(o2)) return -1;
    return numberToCalculation(e2, Math.exp(o2[4].value));
  }
  function solveHypot(t2, o2, r2) {
    if (!o2.every(e.isTokenNode)) return -1;
    const i2 = o2[0].value;
    if (!n.isTokenNumeric(i2)) return -1;
    if (!r2.rawPercentages && n.isTokenPercentage(i2)) return -1;
    const u2 = o2.map(((e2) => convertUnit(i2, e2.value)));
    if (!arrayOfSameNumeric(u2)) return -1;
    const a2 = u2.map(((e2) => e2[4].value)), s2 = Math.hypot(...a2);
    return resultToCalculation(t2, i2, s2);
  }
  function solveMax(t2, o2, r2) {
    if (!o2.every(e.isTokenNode)) return -1;
    const i2 = o2[0].value;
    if (!n.isTokenNumeric(i2)) return -1;
    if (!r2.rawPercentages && n.isTokenPercentage(i2)) return -1;
    const u2 = o2.map(((e2) => convertUnit(i2, e2.value)));
    if (!arrayOfSameNumeric(u2)) return -1;
    const a2 = u2.map(((e2) => e2[4].value)), s2 = Math.max(...a2);
    return resultToCalculation(t2, i2, s2);
  }
  function solveMin(t2, o2, r2) {
    if (!o2.every(e.isTokenNode)) return -1;
    const i2 = o2[0].value;
    if (!n.isTokenNumeric(i2)) return -1;
    if (!r2.rawPercentages && n.isTokenPercentage(i2)) return -1;
    const u2 = o2.map(((e2) => convertUnit(i2, e2.value)));
    if (!arrayOfSameNumeric(u2)) return -1;
    const a2 = u2.map(((e2) => e2[4].value)), s2 = Math.min(...a2);
    return resultToCalculation(t2, i2, s2);
  }
  function solveMod(e2, t2, o2) {
    const r2 = t2.value;
    if (!n.isTokenNumeric(r2)) return -1;
    const i2 = convertUnit(r2, o2.value);
    if (!twoOfSameNumeric(r2, i2)) return -1;
    let u2;
    return u2 = 0 === i2[4].value ? Number.NaN : Number.isFinite(r2[4].value) && (Number.isFinite(i2[4].value) || (i2[4].value !== Number.POSITIVE_INFINITY || r2[4].value !== Number.NEGATIVE_INFINITY && !Object.is(0 * r2[4].value, -0)) && (i2[4].value !== Number.NEGATIVE_INFINITY || r2[4].value !== Number.POSITIVE_INFINITY && !Object.is(0 * r2[4].value, 0))) ? Number.isFinite(i2[4].value) ? (r2[4].value % i2[4].value + i2[4].value) % i2[4].value : r2[4].value : Number.NaN, resultToCalculation(e2, r2, u2);
  }
  function solvePow(e2, t2, o2) {
    const r2 = t2.value, i2 = o2.value;
    if (!n.isTokenNumber(r2)) return -1;
    if (!twoOfSameNumeric(r2, i2)) return -1;
    return numberToCalculation(e2, Math.pow(r2[4].value, i2[4].value));
  }
  function solveRem(e2, t2, o2) {
    const r2 = t2.value;
    if (!n.isTokenNumeric(r2)) return -1;
    const i2 = convertUnit(r2, o2.value);
    if (!twoOfSameNumeric(r2, i2)) return -1;
    let u2;
    return u2 = 0 === i2[4].value ? Number.NaN : Number.isFinite(r2[4].value) ? Number.isFinite(i2[4].value) ? r2[4].value % i2[4].value : r2[4].value : Number.NaN, resultToCalculation(e2, r2, u2);
  }
  function solveRound(e2, t2, o2, r2, i2) {
    const u2 = o2.value;
    if (!n.isTokenNumeric(u2)) return -1;
    if (!i2.rawPercentages && n.isTokenPercentage(u2)) return -1;
    const a2 = convertUnit(u2, r2.value);
    if (!twoOfSameNumeric(u2, a2)) return -1;
    let s2;
    if (0 === a2[4].value) s2 = Number.NaN;
    else if (Number.isFinite(u2[4].value) || Number.isFinite(a2[4].value)) if (!Number.isFinite(u2[4].value) && Number.isFinite(a2[4].value)) s2 = u2[4].value;
    else if (Number.isFinite(u2[4].value) && !Number.isFinite(a2[4].value)) switch (t2) {
      case "down":
        s2 = u2[4].value < 0 ? -1 / 0 : Object.is(-0, 0 * u2[4].value) ? -0 : 0;
        break;
      case "up":
        s2 = u2[4].value > 0 ? 1 / 0 : Object.is(0, 0 * u2[4].value) ? 0 : -0;
        break;
      default:
        s2 = Object.is(0, 0 * u2[4].value) ? 0 : -0;
    }
    else if (Number.isFinite(a2[4].value)) switch (t2) {
      case "down":
        s2 = Math.floor(u2[4].value / a2[4].value) * a2[4].value;
        break;
      case "up":
        s2 = Math.ceil(u2[4].value / a2[4].value) * a2[4].value;
        break;
      case "to-zero":
        s2 = Math.trunc(u2[4].value / a2[4].value) * a2[4].value;
        break;
      default: {
        let e3 = Math.floor(u2[4].value / a2[4].value) * a2[4].value, n2 = Math.ceil(u2[4].value / a2[4].value) * a2[4].value;
        if (e3 > n2) {
          const t4 = e3;
          e3 = n2, n2 = t4;
        }
        const t3 = Math.abs(u2[4].value - e3), o3 = Math.abs(u2[4].value - n2);
        s2 = t3 === o3 ? n2 : t3 < o3 ? e3 : n2;
        break;
      }
    }
    else s2 = u2[4].value;
    else s2 = Number.NaN;
    return resultToCalculation(e2, u2, s2);
  }
  function solveSign(e2, t2, o2) {
    const r2 = t2.value;
    if (!n.isTokenNumeric(r2)) return -1;
    if (!o2.rawPercentages && n.isTokenPercentage(r2)) return -1;
    return numberToCalculation(e2, Math.sign(r2[4].value));
  }
  function solveSin(e2, t2) {
    const o2 = t2.value;
    if (!isDimensionOrNumber(o2)) return -1;
    let r2 = o2[4].value;
    if (n.isTokenDimension(o2)) switch (toLowerCaseAZ(o2[4].unit)) {
      case "rad":
        break;
      case "deg":
        r2 = i.get("rad")(o2[4].value);
        break;
      case "grad":
        r2 = u.get("rad")(o2[4].value);
        break;
      case "turn":
        r2 = k.get("rad")(o2[4].value);
        break;
      default:
        return -1;
    }
    return r2 = Math.sin(r2), numberToCalculation(e2, r2);
  }
  function solveSqrt(e2, t2) {
    const o2 = t2.value;
    if (!n.isTokenNumber(o2)) return -1;
    return numberToCalculation(e2, Math.sqrt(o2[4].value));
  }
  function solveTan(e2, t2) {
    const o2 = t2.value;
    if (!isDimensionOrNumber(o2)) return -1;
    const r2 = o2[4].value;
    let a2 = 0, s2 = o2[4].value;
    if (n.isTokenDimension(o2)) switch (toLowerCaseAZ(o2[4].unit)) {
      case "rad":
        a2 = f.get("deg")(r2);
        break;
      case "deg":
        a2 = r2, s2 = i.get("rad")(r2);
        break;
      case "grad":
        a2 = u.get("deg")(r2), s2 = u.get("rad")(r2);
        break;
      case "turn":
        a2 = k.get("deg")(r2), s2 = k.get("rad")(r2);
        break;
      default:
        return -1;
    }
    const l2 = a2 / 90;
    return s2 = a2 % 90 == 0 && l2 % 2 != 0 ? l2 > 0 ? 1 / 0 : -1 / 0 : Math.tan(s2), numberToCalculation(e2, s2);
  }
  function subtraction(t2) {
    if (2 !== t2.length) return -1;
    const o2 = t2[0].value;
    let r2 = t2[1].value;
    if (n.isTokenNumber(o2) && n.isTokenNumber(r2)) {
      const t3 = o2[4].value - r2[4].value;
      return new e.TokenNode([n.TokenType.Number, t3.toString(), o2[2], r2[3], { value: t3, type: o2[4].type === n.NumberType.Integer && r2[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number }]);
    }
    if (n.isTokenPercentage(o2) && n.isTokenPercentage(r2)) {
      const t3 = o2[4].value - r2[4].value;
      return new e.TokenNode([n.TokenType.Percentage, t3.toString() + "%", o2[2], r2[3], { value: t3 }]);
    }
    if (n.isTokenDimension(o2) && n.isTokenDimension(r2) && (r2 = convertUnit(o2, r2), toLowerCaseAZ(o2[4].unit) === toLowerCaseAZ(r2[4].unit))) {
      const t3 = o2[4].value - r2[4].value;
      return new e.TokenNode([n.TokenType.Dimension, t3.toString() + o2[4].unit, o2[2], r2[3], { value: t3, type: o2[4].type === n.NumberType.Integer && r2[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number, unit: o2[4].unit }]);
    }
    return -1;
  }
  function solveLog(t2, o2) {
    if (1 === o2.length) {
      const r2 = o2[0];
      if (!r2 || !e.isTokenNode(r2)) return -1;
      const i2 = r2.value;
      if (!n.isTokenNumber(i2)) return -1;
      return numberToCalculation(t2, Math.log(i2[4].value));
    }
    if (2 === o2.length) {
      const r2 = o2[0];
      if (!r2 || !e.isTokenNode(r2)) return -1;
      const i2 = r2.value;
      if (!n.isTokenNumber(i2)) return -1;
      const u2 = o2[1];
      if (!u2 || !e.isTokenNode(u2)) return -1;
      const a2 = u2.value;
      if (!n.isTokenNumber(a2)) return -1;
      return numberToCalculation(t2, Math.log(i2[4].value) / Math.log(a2[4].value));
    }
    return -1;
  }
  const g = /^none$/i;
  function isNone(t2) {
    if (Array.isArray(t2)) {
      const n2 = t2.filter(((n3) => !(e.isWhitespaceNode(n3) && e.isCommentNode(n3))));
      return 1 === n2.length && isNone(n2[0]);
    }
    if (!e.isTokenNode(t2)) return false;
    const o2 = t2.value;
    return !!n.isTokenIdent(o2) && g.test(o2[4].value);
  }
  const D = String.fromCodePoint(0);
  function solveRandom(e2, t2, o2, r2, i2, u2) {
    if (-1 === t2.fixed && !u2.randomCaching) return -1;
    u2.randomCaching || (u2.randomCaching = { propertyName: "", propertyN: 0, elementID: "", documentID: "" }), u2.randomCaching && !u2.randomCaching.propertyN && (u2.randomCaching.propertyN = 0);
    const a2 = o2.value;
    if (!n.isTokenNumeric(a2)) return -1;
    const s2 = convertUnit(a2, r2.value);
    if (!twoOfSameNumeric(a2, s2)) return -1;
    let l2 = null;
    if (i2 && (l2 = convertUnit(a2, i2.value), !twoOfSameNumeric(a2, l2))) return -1;
    if (!Number.isFinite(a2[4].value)) return resultToCalculation(e2, a2, Number.NaN);
    if (!Number.isFinite(s2[4].value)) return resultToCalculation(e2, a2, Number.NaN);
    if (!Number.isFinite(s2[4].value - a2[4].value)) return resultToCalculation(e2, a2, Number.NaN);
    if (l2 && !Number.isFinite(l2[4].value)) return resultToCalculation(e2, a2, a2[4].value);
    const c2 = -1 === t2.fixed ? sfc32(crc32([t2.dashedIdent ? t2.dashedIdent : `${u2.randomCaching?.propertyName} ${u2.randomCaching.propertyN++}`, t2.elementShared ? "" : u2.randomCaching.elementID, u2.randomCaching.documentID].join(D))) : () => t2.fixed;
    let m2 = a2[4].value, v2 = s2[4].value;
    if (m2 > v2 && ([m2, v2] = [v2, m2]), l2 && (l2[4].value <= 0 || Math.abs(m2 - v2) / l2[4].value > 1e10) && (l2 = null), l2) {
      const n2 = Math.max(l2[4].value / 1e3, 1e-9), t3 = [m2];
      let o3 = 0;
      for (; ; ) {
        o3 += l2[4].value;
        const e3 = m2 + o3;
        if (!(e3 + n2 < v2)) {
          t3.push(v2);
          break;
        }
        if (t3.push(e3), e3 + l2[4].value - n2 > v2) break;
      }
      const r3 = c2();
      return resultToCalculation(e2, a2, Number(t3[Math.floor(t3.length * r3)].toFixed(5)));
    }
    const T2 = c2();
    return resultToCalculation(e2, a2, Number((T2 * (v2 - m2) + m2).toFixed(5)));
  }
  function sfc32(e2 = 0.34944106645296036, n2 = 0.19228640875738723, t2 = 0.8784393832007205, o2 = 0.04850964319275053) {
    return () => {
      const r2 = ((e2 |= 0) + (n2 |= 0) | 0) + (o2 |= 0) | 0;
      return o2 = o2 + 1 | 0, e2 = n2 ^ n2 >>> 9, n2 = (t2 |= 0) + (t2 << 3) | 0, t2 = (t2 = t2 << 21 | t2 >>> 11) + r2 | 0, (r2 >>> 0) / 4294967296;
    };
  }
  function crc32(e2) {
    let n2 = 0, t2 = 0, o2 = 0;
    n2 ^= -1;
    for (let r2 = 0, i2 = e2.length; r2 < i2; r2++) o2 = 255 & (n2 ^ e2.charCodeAt(r2)), t2 = Number("0x" + "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".substring(9 * o2, 9 * o2 + 8)), n2 = n2 >>> 8 ^ t2;
    return (-1 ^ n2) >>> 0;
  }
  const b = /* @__PURE__ */ new Map([["abs", function abs(e2, n2, t2) {
    return singleNodeSolver(e2, n2, t2, solveAbs);
  }], ["acos", function acos(e2, n2, t2) {
    return singleNodeSolver(e2, n2, t2, solveACos);
  }], ["asin", function asin(e2, n2, t2) {
    return singleNodeSolver(e2, n2, t2, solveASin);
  }], ["atan", function atan(e2, n2, t2) {
    return singleNodeSolver(e2, n2, t2, solveATan);
  }], ["atan2", function atan2(e2, n2, t2) {
    return twoCommaSeparatedNodesSolver(e2, n2, t2, solveATan2);
  }], ["calc", calc$1], ["clamp", function clamp(t2, o2, r2) {
    const i2 = resolveGlobalsAndConstants([...t2.value.filter(((n2) => !e.isWhiteSpaceOrCommentNode(n2)))], o2), u2 = [], a2 = [], s2 = [];
    {
      let t3 = u2;
      for (let o3 = 0; o3 < i2.length; o3++) {
        const r3 = i2[o3];
        if (e.isTokenNode(r3) && n.isTokenComma(r3.value)) {
          if (t3 === s2) return -1;
          if (t3 === a2) {
            t3 = s2;
            continue;
          }
          if (t3 === u2) {
            t3 = a2;
            continue;
          }
          return -1;
        }
        t3.push(r3);
      }
    }
    const l2 = isNone(u2), c2 = isNone(s2);
    if (l2 && c2) return calc$1(calcWrapper(a2), o2, r2);
    const m2 = solve(calc$1(calcWrapper(a2), o2, r2));
    if (-1 === m2) return -1;
    if (l2) {
      const t3 = solve(calc$1(calcWrapper(s2), o2, r2));
      return -1 === t3 ? -1 : solveMin((v2 = m2, T2 = t3, new e.FunctionNode([n.TokenType.Function, "min(", -1, -1, { value: "min" }], [n.TokenType.CloseParen, ")", -1, -1, void 0], [v2, new e.TokenNode([n.TokenType.Comma, ",", -1, -1, void 0]), T2])), [m2, t3], r2);
    }
    if (c2) {
      const e2 = solve(calc$1(calcWrapper(u2), o2, r2));
      return -1 === e2 ? -1 : solveMax(maxWrapper(e2, m2), [e2, m2], r2);
    }
    var v2, T2;
    const p2 = solve(calc$1(calcWrapper(u2), o2, r2));
    if (-1 === p2) return -1;
    const N2 = solve(calc$1(calcWrapper(s2), o2, r2));
    if (-1 === N2) return -1;
    return solveClamp(t2, p2, m2, N2, r2);
  }], ["cos", function cos(e2, n2, t2) {
    return singleNodeSolver(e2, n2, t2, solveCos);
  }], ["exp", function exp(e2, n2, t2) {
    return singleNodeSolver(e2, n2, t2, solveExp);
  }], ["hypot", function hypot(e2, n2, t2) {
    return variadicNodesSolver(e2, e2.value, n2, t2, solveHypot);
  }], ["log", function log(e2, n2, t2) {
    return variadicNodesSolver(e2, e2.value, n2, t2, solveLog);
  }], ["max", function max(e2, n2, t2) {
    return variadicNodesSolver(e2, e2.value, n2, t2, solveMax);
  }], ["min", function min(e2, n2, t2) {
    return variadicNodesSolver(e2, e2.value, n2, t2, solveMin);
  }], ["mod", function mod(e2, n2, t2) {
    return twoCommaSeparatedNodesSolver(e2, n2, t2, solveMod);
  }], ["pow", function pow(e2, n2, t2) {
    return twoCommaSeparatedNodesSolver(e2, n2, t2, solvePow);
  }], ["random", function random(n2, t2, o2) {
    const r2 = parseRandomValueSharing(n2.value.filter(((n3) => !e.isWhiteSpaceOrCommentNode(n3))), t2, o2);
    if (-1 === r2) return -1;
    const [i2, u2] = r2, a2 = variadicArguments(u2, t2, o2);
    if (-1 === a2) return -1;
    const [s2, l2, c2] = a2;
    if (!s2 || !l2) return -1;
    return solveRandom(n2, i2, s2, l2, c2, o2);
  }], ["rem", function rem(e2, n2, t2) {
    return twoCommaSeparatedNodesSolver(e2, n2, t2, solveRem);
  }], ["round", function round(t2, o2, r2) {
    const i2 = resolveGlobalsAndConstants([...t2.value.filter(((n2) => !e.isWhiteSpaceOrCommentNode(n2)))], o2);
    let u2 = "", a2 = false;
    const s2 = [], l2 = [];
    {
      let t3 = s2;
      for (let o3 = 0; o3 < i2.length; o3++) {
        const r3 = i2[o3];
        if (!u2 && 0 === s2.length && 0 === l2.length && e.isTokenNode(r3) && n.isTokenIdent(r3.value)) {
          const e2 = r3.value[4].value.toLowerCase();
          if (y.has(e2)) {
            u2 = e2;
            continue;
          }
        }
        if (e.isTokenNode(r3) && n.isTokenComma(r3.value)) {
          if (t3 === l2) return -1;
          if (t3 === s2 && u2 && 0 === s2.length) continue;
          if (t3 === s2) {
            a2 = true, t3 = l2;
            continue;
          }
          return -1;
        }
        t3.push(r3);
      }
    }
    const c2 = solve(calc$1(calcWrapper(s2), o2, r2));
    if (-1 === c2) return -1;
    a2 || 0 !== l2.length || l2.push(new e.TokenNode([n.TokenType.Number, "1", -1, -1, { value: 1, type: n.NumberType.Integer }]));
    const m2 = solve(calc$1(calcWrapper(l2), o2, r2));
    if (-1 === m2) return -1;
    u2 || (u2 = "nearest");
    return solveRound(t2, u2, c2, m2, r2);
  }], ["sign", function sign(e2, n2, t2) {
    return singleNodeSolver(e2, n2, t2, solveSign);
  }], ["sin", function sin(e2, n2, t2) {
    return singleNodeSolver(e2, n2, t2, solveSin);
  }], ["sqrt", function sqrt(e2, n2, t2) {
    return singleNodeSolver(e2, n2, t2, solveSqrt);
  }], ["tan", function tan(e2, n2, t2) {
    return singleNodeSolver(e2, n2, t2, solveTan);
  }]]);
  function calc$1(t2, o2, r2) {
    const i2 = resolveGlobalsAndConstants([...t2.value.filter(((n2) => !e.isWhiteSpaceOrCommentNode(n2)))], o2);
    if (1 === i2.length && e.isTokenNode(i2[0])) return { inputs: [i2[0]], operation: unary };
    let u2 = 0;
    for (; u2 < i2.length; ) {
      const t3 = i2[u2];
      if (e.isSimpleBlockNode(t3) && n.isTokenOpenParen(t3.startToken)) {
        const e2 = calc$1(t3, o2, r2);
        if (-1 === e2) return -1;
        i2.splice(u2, 1, e2);
      } else if (e.isFunctionNode(t3)) {
        const e2 = b.get(t3.getName().toLowerCase());
        if (!e2) return -1;
        const n2 = e2(t3, o2, r2);
        if (-1 === n2) return -1;
        i2.splice(u2, 1, n2);
      } else u2++;
    }
    if (u2 = 0, 1 === i2.length && isCalculation(i2[0])) return i2[0];
    for (; u2 < i2.length; ) {
      const t3 = i2[u2];
      if (!t3 || !e.isTokenNode(t3) && !isCalculation(t3)) {
        u2++;
        continue;
      }
      const o3 = i2[u2 + 1];
      if (!o3 || !e.isTokenNode(o3)) {
        u2++;
        continue;
      }
      const r3 = o3.value;
      if (!n.isTokenDelim(r3) || "*" !== r3[4].value && "/" !== r3[4].value) {
        u2++;
        continue;
      }
      const a2 = i2[u2 + 2];
      if (!a2 || !e.isTokenNode(a2) && !isCalculation(a2)) return -1;
      "*" !== r3[4].value ? "/" !== r3[4].value ? u2++ : i2.splice(u2, 3, { inputs: [t3, a2], operation: division }) : i2.splice(u2, 3, { inputs: [t3, a2], operation: multiplication });
    }
    if (u2 = 0, 1 === i2.length && isCalculation(i2[0])) return i2[0];
    for (; u2 < i2.length; ) {
      const t3 = i2[u2];
      if (!t3 || !e.isTokenNode(t3) && !isCalculation(t3)) {
        u2++;
        continue;
      }
      const o3 = i2[u2 + 1];
      if (!o3 || !e.isTokenNode(o3)) {
        u2++;
        continue;
      }
      const r3 = o3.value;
      if (!n.isTokenDelim(r3) || "+" !== r3[4].value && "-" !== r3[4].value) {
        u2++;
        continue;
      }
      const a2 = i2[u2 + 2];
      if (!a2 || !e.isTokenNode(a2) && !isCalculation(a2)) return -1;
      "+" !== r3[4].value ? "-" !== r3[4].value ? u2++ : i2.splice(u2, 3, { inputs: [t3, a2], operation: subtraction }) : i2.splice(u2, 3, { inputs: [t3, a2], operation: addition });
    }
    return 1 === i2.length && isCalculation(i2[0]) ? i2[0] : -1;
  }
  function singleNodeSolver(e2, n2, t2, o2) {
    const r2 = singleArgument(e2.value, n2, t2);
    return -1 === r2 ? -1 : o2(e2, r2, t2);
  }
  function singleArgument(n2, t2, o2) {
    const r2 = solve(calc$1(calcWrapper(resolveGlobalsAndConstants([...n2.filter(((n3) => !e.isWhiteSpaceOrCommentNode(n3)))], t2)), t2, o2));
    return -1 === r2 ? -1 : r2;
  }
  function twoCommaSeparatedNodesSolver(e2, n2, t2, o2) {
    const r2 = twoCommaSeparatedArguments(e2.value, n2, t2);
    if (-1 === r2) return -1;
    const [i2, u2] = r2;
    return o2(e2, i2, u2, t2);
  }
  function twoCommaSeparatedArguments(t2, o2, r2) {
    const i2 = resolveGlobalsAndConstants([...t2.filter(((n2) => !e.isWhiteSpaceOrCommentNode(n2)))], o2), u2 = [], a2 = [];
    {
      let t3 = u2;
      for (let o3 = 0; o3 < i2.length; o3++) {
        const r3 = i2[o3];
        if (e.isTokenNode(r3) && n.isTokenComma(r3.value)) {
          if (t3 === a2) return -1;
          if (t3 === u2) {
            t3 = a2;
            continue;
          }
          return -1;
        }
        t3.push(r3);
      }
    }
    const s2 = solve(calc$1(calcWrapper(u2), o2, r2));
    if (-1 === s2) return -1;
    const l2 = solve(calc$1(calcWrapper(a2), o2, r2));
    return -1 === l2 ? -1 : [s2, l2];
  }
  function variadicNodesSolver(e2, n2, t2, o2, r2) {
    const i2 = variadicArguments(e2.value, t2, o2);
    return -1 === i2 ? -1 : r2(e2, i2, o2);
  }
  function variadicArguments(t2, o2, r2) {
    const i2 = resolveGlobalsAndConstants([...t2.filter(((n2) => !e.isWhiteSpaceOrCommentNode(n2)))], o2), u2 = [];
    {
      const t3 = [];
      let a2 = [];
      for (let o3 = 0; o3 < i2.length; o3++) {
        const r3 = i2[o3];
        e.isTokenNode(r3) && n.isTokenComma(r3.value) ? (t3.push(a2), a2 = []) : a2.push(r3);
      }
      t3.push(a2);
      for (let e2 = 0; e2 < t3.length; e2++) {
        if (0 === t3[e2].length) return -1;
        const n2 = solve(calc$1(calcWrapper(t3[e2]), o2, r2));
        if (-1 === n2) return -1;
        u2.push(n2);
      }
    }
    return u2;
  }
  const y = /* @__PURE__ */ new Set(["nearest", "up", "down", "to-zero"]);
  function parseRandomValueSharing(t2, o2, r2) {
    const i2 = { isAuto: false, dashedIdent: "", fixed: -1, elementShared: false }, u2 = t2[0];
    if (!e.isTokenNode(u2) || !n.isTokenIdent(u2.value)) return [i2, t2];
    for (let u3 = 0; u3 < t2.length; u3++) {
      const a2 = t2[u3];
      if (!e.isTokenNode(a2)) return -1;
      if (n.isTokenComma(a2.value)) return [i2, t2.slice(u3 + 1)];
      if (!n.isTokenIdent(a2.value)) return -1;
      const s2 = a2.value[4].value.toLowerCase();
      if ("element-shared" !== s2) if ("fixed" !== s2) if ("auto" !== s2) if (s2.startsWith("--")) {
        if (-1 !== i2.fixed || i2.isAuto) return -1;
        i2.dashedIdent = s2;
      } else ;
      else {
        if (-1 !== i2.fixed || i2.dashedIdent) return -1;
        i2.isAuto = true;
      }
      else {
        if (i2.elementShared || i2.dashedIdent || i2.isAuto) return -1;
        u3++;
        const e2 = t2[u3];
        if (!e2) return -1;
        const a3 = solve(calc$1(calcWrapper([e2]), o2, r2));
        if (-1 === a3) return -1;
        if (!n.isTokenNumber(a3.value)) return -1;
        if (a3.value[4].value < 0 || a3.value[4].value > 1) return -1;
        i2.fixed = Math.max(0, Math.min(a3.value[4].value, 1 - 1e-9));
      }
      else {
        if (-1 !== i2.fixed) return -1;
        i2.elementShared = true;
      }
    }
    return -1;
  }
  function calcWrapper(t2) {
    return new e.FunctionNode([n.TokenType.Function, "calc(", -1, -1, { value: "calc" }], [n.TokenType.CloseParen, ")", -1, -1, void 0], t2);
  }
  function maxWrapper(t2, o2) {
    return new e.FunctionNode([n.TokenType.Function, "max(", -1, -1, { value: "max" }], [n.TokenType.CloseParen, ")", -1, -1, void 0], [t2, new e.TokenNode([n.TokenType.Comma, ",", -1, -1, void 0]), o2]);
  }
  function patchNaN(t2) {
    if (-1 === t2) return -1;
    if (e.isFunctionNode(t2)) return t2;
    const o2 = t2.value;
    return n.isTokenNumeric(o2) && Number.isNaN(o2[4].value) ? n.isTokenNumber(o2) ? new e.FunctionNode([n.TokenType.Function, "calc(", o2[2], o2[3], { value: "calc" }], [n.TokenType.CloseParen, ")", o2[2], o2[3], void 0], [new e.TokenNode([n.TokenType.Ident, "NaN", o2[2], o2[3], { value: "NaN" }])]) : n.isTokenDimension(o2) ? new e.FunctionNode([n.TokenType.Function, "calc(", o2[2], o2[3], { value: "calc" }], [n.TokenType.CloseParen, ")", o2[2], o2[3], void 0], [new e.TokenNode([n.TokenType.Ident, "NaN", o2[2], o2[3], { value: "NaN" }]), new e.WhitespaceNode([[n.TokenType.Whitespace, " ", o2[2], o2[3], void 0]]), new e.TokenNode([n.TokenType.Delim, "*", o2[2], o2[3], { value: "*" }]), new e.WhitespaceNode([[n.TokenType.Whitespace, " ", o2[2], o2[3], void 0]]), new e.TokenNode([n.TokenType.Dimension, "1" + o2[4].unit, o2[2], o2[3], { value: 1, type: n.NumberType.Integer, unit: o2[4].unit }])]) : n.isTokenPercentage(o2) ? new e.FunctionNode([n.TokenType.Function, "calc(", o2[2], o2[3], { value: "calc" }], [n.TokenType.CloseParen, ")", o2[2], o2[3], void 0], [new e.TokenNode([n.TokenType.Ident, "NaN", o2[2], o2[3], { value: "NaN" }]), new e.WhitespaceNode([[n.TokenType.Whitespace, " ", o2[2], o2[3], void 0]]), new e.TokenNode([n.TokenType.Delim, "*", o2[2], o2[3], { value: "*" }]), new e.WhitespaceNode([[n.TokenType.Whitespace, " ", o2[2], o2[3], void 0]]), new e.TokenNode([n.TokenType.Percentage, "1%", o2[2], o2[3], { value: 1 }])]) : -1 : t2;
  }
  function patchInfinity(t2) {
    if (-1 === t2) return -1;
    if (e.isFunctionNode(t2)) return t2;
    const o2 = t2.value;
    if (!n.isTokenNumeric(o2)) return t2;
    if (Number.isFinite(o2[4].value) || Number.isNaN(o2[4].value)) return t2;
    let r2 = "";
    return Number.NEGATIVE_INFINITY === o2[4].value && (r2 = "-"), n.isTokenNumber(o2) ? new e.FunctionNode([n.TokenType.Function, "calc(", o2[2], o2[3], { value: "calc" }], [n.TokenType.CloseParen, ")", o2[2], o2[3], void 0], [new e.TokenNode([n.TokenType.Ident, r2 + "infinity", o2[2], o2[3], { value: r2 + "infinity" }])]) : n.isTokenDimension(o2) ? new e.FunctionNode([n.TokenType.Function, "calc(", o2[2], o2[3], { value: "calc" }], [n.TokenType.CloseParen, ")", o2[2], o2[3], void 0], [new e.TokenNode([n.TokenType.Ident, r2 + "infinity", o2[2], o2[3], { value: r2 + "infinity" }]), new e.WhitespaceNode([[n.TokenType.Whitespace, " ", o2[2], o2[3], void 0]]), new e.TokenNode([n.TokenType.Delim, "*", o2[2], o2[3], { value: "*" }]), new e.WhitespaceNode([[n.TokenType.Whitespace, " ", o2[2], o2[3], void 0]]), new e.TokenNode([n.TokenType.Dimension, "1" + o2[4].unit, o2[2], o2[3], { value: 1, type: n.NumberType.Integer, unit: o2[4].unit }])]) : new e.FunctionNode([n.TokenType.Function, "calc(", o2[2], o2[3], { value: "calc" }], [n.TokenType.CloseParen, ")", o2[2], o2[3], void 0], [new e.TokenNode([n.TokenType.Ident, r2 + "infinity", o2[2], o2[3], { value: r2 + "infinity" }]), new e.WhitespaceNode([[n.TokenType.Whitespace, " ", o2[2], o2[3], void 0]]), new e.TokenNode([n.TokenType.Delim, "*", o2[2], o2[3], { value: "*" }]), new e.WhitespaceNode([[n.TokenType.Whitespace, " ", o2[2], o2[3], void 0]]), new e.TokenNode([n.TokenType.Percentage, "1%", o2[2], o2[3], { value: 1 }])]);
  }
  function patchMinusZero(t2) {
    if (-1 === t2) return -1;
    if (e.isFunctionNode(t2)) return t2;
    const o2 = t2.value;
    return n.isTokenNumeric(o2) && Object.is(-0, o2[4].value) ? ("-0" === o2[1] || (n.isTokenPercentage(o2) ? o2[1] = "-0%" : n.isTokenDimension(o2) ? o2[1] = "-0" + o2[4].unit : o2[1] = "-0"), t2) : t2;
  }
  function patchPrecision(t2, o2 = 13) {
    if (-1 === t2) return -1;
    if (o2 <= 0) return t2;
    if (e.isFunctionNode(t2)) return t2;
    const r2 = t2.value;
    if (!n.isTokenNumeric(r2)) return t2;
    if (Number.isInteger(r2[4].value)) return t2;
    const i2 = Number(r2[4].value.toFixed(o2)).toString();
    return n.isTokenNumber(r2) ? r2[1] = i2 : n.isTokenPercentage(r2) ? r2[1] = i2 + "%" : n.isTokenDimension(r2) && (r2[1] = i2 + r2[4].unit), t2;
  }
  function patchCanonicalUnit(t2) {
    return -1 === t2 ? -1 : e.isFunctionNode(t2) ? t2 : n.isTokenDimension(t2.value) ? (t2.value = toCanonicalUnit(t2.value), t2) : t2;
  }
  function patchCalcResult(e2, n2) {
    let t2 = e2;
    return n2?.toCanonicalUnits && (t2 = patchCanonicalUnit(t2)), t2 = patchPrecision(t2, n2?.precision), t2 = patchMinusZero(t2), n2?.censorIntoStandardRepresentableValues || (t2 = patchNaN(t2), t2 = patchInfinity(t2)), t2;
  }
  function tokenizeGlobals(e2) {
    const t2 = /* @__PURE__ */ new Map();
    if (!e2) return t2;
    for (const [o2, r2] of e2) if (n.isToken(r2)) t2.set(o2, r2);
    else if ("string" != typeof r2) ;
    else {
      const e3 = n.tokenizer({ css: r2 }), i2 = e3.nextToken();
      if (e3.nextToken(), !e3.endOfFile()) continue;
      if (!n.isTokenNumeric(i2)) continue;
      t2.set(o2, i2);
    }
    return t2;
  }
  function calcFromComponentValues(n2, t2) {
    const o2 = tokenizeGlobals(t2?.globals);
    return e.replaceComponentValues(n2, ((n3) => {
      if (!e.isFunctionNode(n3)) return;
      const r2 = b.get(n3.getName().toLowerCase());
      if (!r2) return;
      const i2 = patchCalcResult(solve(r2(n3, o2, t2 ?? {})), t2);
      return -1 !== i2 ? i2 : void 0;
    }));
  }
  const h = new Set(b.keys());
  dist.calc = function calc(t2, o2) {
    return calcFromComponentValues(e.parseCommaSeparatedListOfComponentValues(n.tokenize({ css: t2 }), {}), o2).map(((e2) => e2.map(((e3) => n.stringify(...e3.tokens()))).join(""))).join(",");
  }, dist.calcFromComponentValues = calcFromComponentValues, dist.mathFunctionNames = h;
  return dist;
}
export {
  requireDist as r
};
