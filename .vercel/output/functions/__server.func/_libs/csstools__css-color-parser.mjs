import { r as requireDist$1 } from "./csstools__css-tokenizer.mjs";
import { r as requireDist$4 } from "./csstools__color-helpers.mjs";
import { r as requireDist$2 } from "./@csstools/css-parser-algorithms+[...].mjs";
import { r as requireDist$3 } from "./csstools__css-calc.mjs";
var dist = {};
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  (function(exports$1) {
    var e, o, a = requireDist$1(), n = requireDist$4(), t = requireDist$2(), r = requireDist$3();
    function convertNaNToZero(e2) {
      return [Number.isNaN(e2[0]) ? 0 : e2[0], Number.isNaN(e2[1]) ? 0 : e2[1], Number.isNaN(e2[2]) ? 0 : e2[2]];
    }
    function colorData_to_XYZ_D50(e2) {
      switch (e2.colorNotation) {
        case exports$1.ColorNotation.HEX:
        case exports$1.ColorNotation.RGB:
        case exports$1.ColorNotation.sRGB:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.sRGB_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.Linear_sRGB:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.lin_sRGB_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.Display_P3:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.P3_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.Linear_Display_P3:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.lin_P3_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.Rec2020:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.rec_2020_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.A98_RGB:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.a98_RGB_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.ProPhoto_RGB:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.ProPhoto_RGB_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.HSL:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.HSL_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.HWB:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.HWB_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.Lab:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.Lab_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.OKLab:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.OKLab_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.LCH:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.LCH_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.OKLCH:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.OKLCH_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.XYZ_D50:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.XYZ_D50_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        case exports$1.ColorNotation.XYZ_D65:
          return { ...e2, colorNotation: exports$1.ColorNotation.XYZ_D50, channels: n.XYZ_D65_to_XYZ_D50(convertNaNToZero(e2.channels)) };
        default:
          throw new Error("Unsupported color notation");
      }
    }
    exports$1.ColorNotation = void 0, (e = exports$1.ColorNotation || (exports$1.ColorNotation = {})).A98_RGB = "a98-rgb", e.Display_P3 = "display-p3", e.Linear_Display_P3 = "display-p3-linear", e.HEX = "hex", e.HSL = "hsl", e.HWB = "hwb", e.LCH = "lch", e.Lab = "lab", e.Linear_sRGB = "srgb-linear", e.OKLCH = "oklch", e.OKLab = "oklab", e.ProPhoto_RGB = "prophoto-rgb", e.RGB = "rgb", e.sRGB = "srgb", e.Rec2020 = "rec2020", e.XYZ_D50 = "xyz-d50", e.XYZ_D65 = "xyz-d65", exports$1.SyntaxFlag = void 0, (o = exports$1.SyntaxFlag || (exports$1.SyntaxFlag = {})).ColorKeyword = "color-keyword", o.HasAlpha = "has-alpha", o.HasDimensionValues = "has-dimension-values", o.HasNoneKeywords = "has-none-keywords", o.HasNumberValues = "has-number-values", o.HasPercentageAlpha = "has-percentage-alpha", o.HasPercentageValues = "has-percentage-values", o.HasVariableAlpha = "has-variable-alpha", o.Hex = "hex", o.LegacyHSL = "legacy-hsl", o.LegacyRGB = "legacy-rgb", o.NamedColor = "named-color", o.RelativeColorSyntax = "relative-color-syntax", o.ColorMix = "color-mix", o.ColorMixVariadic = "color-mix-variadic", o.ContrastColor = "contrast-color", o.RelativeAlphaSyntax = "relative-alpha-syntax", o.Experimental = "experimental";
    const l = /* @__PURE__ */ new Set([exports$1.ColorNotation.A98_RGB, exports$1.ColorNotation.Display_P3, exports$1.ColorNotation.Linear_Display_P3, exports$1.ColorNotation.HEX, exports$1.ColorNotation.Linear_sRGB, exports$1.ColorNotation.ProPhoto_RGB, exports$1.ColorNotation.RGB, exports$1.ColorNotation.sRGB, exports$1.ColorNotation.Rec2020, exports$1.ColorNotation.XYZ_D50, exports$1.ColorNotation.XYZ_D65]);
    function colorDataTo(e2, o2) {
      const a2 = { ...e2 };
      if (e2.colorNotation !== o2) {
        const e3 = colorData_to_XYZ_D50(a2);
        switch (o2) {
          case exports$1.ColorNotation.HEX:
          case exports$1.ColorNotation.RGB:
            a2.colorNotation = exports$1.ColorNotation.RGB, a2.channels = n.XYZ_D50_to_sRGB(e3.channels);
            break;
          case exports$1.ColorNotation.sRGB:
            a2.colorNotation = exports$1.ColorNotation.sRGB, a2.channels = n.XYZ_D50_to_sRGB(e3.channels);
            break;
          case exports$1.ColorNotation.Linear_sRGB:
            a2.colorNotation = exports$1.ColorNotation.Linear_sRGB, a2.channels = n.XYZ_D50_to_lin_sRGB(e3.channels);
            break;
          case exports$1.ColorNotation.Display_P3:
            a2.colorNotation = exports$1.ColorNotation.Display_P3, a2.channels = n.XYZ_D50_to_P3(e3.channels);
            break;
          case exports$1.ColorNotation.Linear_Display_P3:
            a2.colorNotation = exports$1.ColorNotation.Linear_Display_P3, a2.channels = n.XYZ_D50_to_lin_P3(e3.channels);
            break;
          case exports$1.ColorNotation.Rec2020:
            a2.colorNotation = exports$1.ColorNotation.Rec2020, a2.channels = n.XYZ_D50_to_rec_2020(e3.channels);
            break;
          case exports$1.ColorNotation.ProPhoto_RGB:
            a2.colorNotation = exports$1.ColorNotation.ProPhoto_RGB, a2.channels = n.XYZ_D50_to_ProPhoto(e3.channels);
            break;
          case exports$1.ColorNotation.A98_RGB:
            a2.colorNotation = exports$1.ColorNotation.A98_RGB, a2.channels = n.XYZ_D50_to_a98_RGB(e3.channels);
            break;
          case exports$1.ColorNotation.HSL:
            a2.colorNotation = exports$1.ColorNotation.HSL, a2.channels = n.XYZ_D50_to_HSL(e3.channels);
            break;
          case exports$1.ColorNotation.HWB:
            a2.colorNotation = exports$1.ColorNotation.HWB, a2.channels = n.XYZ_D50_to_HWB(e3.channels);
            break;
          case exports$1.ColorNotation.Lab:
            a2.colorNotation = exports$1.ColorNotation.Lab, a2.channels = n.XYZ_D50_to_Lab(e3.channels);
            break;
          case exports$1.ColorNotation.LCH:
            a2.colorNotation = exports$1.ColorNotation.LCH, a2.channels = n.XYZ_D50_to_LCH(e3.channels);
            break;
          case exports$1.ColorNotation.OKLCH:
            a2.colorNotation = exports$1.ColorNotation.OKLCH, a2.channels = n.XYZ_D50_to_OKLCH(e3.channels);
            break;
          case exports$1.ColorNotation.OKLab:
            a2.colorNotation = exports$1.ColorNotation.OKLab, a2.channels = n.XYZ_D50_to_OKLab(e3.channels);
            break;
          case exports$1.ColorNotation.XYZ_D50:
            a2.colorNotation = exports$1.ColorNotation.XYZ_D50, a2.channels = n.XYZ_D50_to_XYZ_D50(e3.channels);
            break;
          case exports$1.ColorNotation.XYZ_D65:
            a2.colorNotation = exports$1.ColorNotation.XYZ_D65, a2.channels = n.XYZ_D50_to_XYZ_D65(e3.channels);
            break;
          default:
            throw new Error("Unsupported color notation");
        }
      } else a2.channels = convertNaNToZero(e2.channels);
      if (o2 === e2.colorNotation) a2.channels = carryForwardMissingComponents(e2.channels, [0, 1, 2], a2.channels, [0, 1, 2]);
      else if (l.has(o2) && l.has(e2.colorNotation)) a2.channels = carryForwardMissingComponents(e2.channels, [0, 1, 2], a2.channels, [0, 1, 2]);
      else switch (o2) {
        case exports$1.ColorNotation.HSL:
          switch (e2.colorNotation) {
            case exports$1.ColorNotation.HWB:
              a2.channels = carryForwardMissingComponents(e2.channels, [0], a2.channels, [0]);
              break;
            case exports$1.ColorNotation.Lab:
            case exports$1.ColorNotation.OKLab:
              a2.channels = carryForwardMissingComponents(e2.channels, [2], a2.channels, [0]);
              break;
            case exports$1.ColorNotation.LCH:
            case exports$1.ColorNotation.OKLCH:
              a2.channels = carryForwardMissingComponents(e2.channels, [0, 1, 2], a2.channels, [2, 1, 0]);
          }
          break;
        case exports$1.ColorNotation.HWB:
          switch (e2.colorNotation) {
            case exports$1.ColorNotation.HSL:
              a2.channels = carryForwardMissingComponents(e2.channels, [0], a2.channels, [0]);
              break;
            case exports$1.ColorNotation.LCH:
            case exports$1.ColorNotation.OKLCH:
              a2.channels = carryForwardMissingComponents(e2.channels, [0], a2.channels, [2]);
          }
          break;
        case exports$1.ColorNotation.Lab:
        case exports$1.ColorNotation.OKLab:
          switch (e2.colorNotation) {
            case exports$1.ColorNotation.HSL:
              a2.channels = carryForwardMissingComponents(e2.channels, [0], a2.channels, [2]);
              break;
            case exports$1.ColorNotation.Lab:
            case exports$1.ColorNotation.OKLab:
              a2.channels = carryForwardMissingComponents(e2.channels, [0, 1, 2], a2.channels, [0, 1, 2]);
              break;
            case exports$1.ColorNotation.LCH:
            case exports$1.ColorNotation.OKLCH:
              a2.channels = carryForwardMissingComponents(e2.channels, [0], a2.channels, [0]);
          }
          break;
        case exports$1.ColorNotation.LCH:
        case exports$1.ColorNotation.OKLCH:
          switch (e2.colorNotation) {
            case exports$1.ColorNotation.HSL:
              a2.channels = carryForwardMissingComponents(e2.channels, [0, 1, 2], a2.channels, [2, 1, 0]);
              break;
            case exports$1.ColorNotation.HWB:
              a2.channels = carryForwardMissingComponents(e2.channels, [0], a2.channels, [2]);
              break;
            case exports$1.ColorNotation.Lab:
            case exports$1.ColorNotation.OKLab:
              a2.channels = carryForwardMissingComponents(e2.channels, [0], a2.channels, [0]);
              break;
            case exports$1.ColorNotation.LCH:
            case exports$1.ColorNotation.OKLCH:
              a2.channels = carryForwardMissingComponents(e2.channels, [0, 1, 2], a2.channels, [0, 1, 2]);
          }
      }
      return a2.channels = convertPowerlessComponentsToMissingComponents(a2.channels, o2), a2;
    }
    function convertPowerlessComponentsToMissingComponents(e2, o2) {
      const a2 = [...e2];
      switch (o2) {
        case exports$1.ColorNotation.HSL:
          !Number.isNaN(a2[1]) && reducePrecision(a2[1], 4) <= 0 && (a2[0] = Number.NaN);
          break;
        case exports$1.ColorNotation.HWB:
          Math.max(0, reducePrecision(a2[1], 4)) + Math.max(0, reducePrecision(a2[2], 4)) >= 100 && (a2[0] = Number.NaN);
          break;
        case exports$1.ColorNotation.LCH:
          !Number.isNaN(a2[1]) && reducePrecision(a2[1], 4) <= 0 && (a2[2] = Number.NaN);
          break;
        case exports$1.ColorNotation.OKLCH:
          !Number.isNaN(a2[1]) && reducePrecision(a2[1], 6) <= 0 && (a2[2] = Number.NaN);
      }
      return a2;
    }
    function convertPowerlessComponentsToZeroValuesForDisplay(e2, o2) {
      const a2 = [...e2];
      switch (o2) {
        case exports$1.ColorNotation.HSL:
          (reducePrecision(a2[2]) <= 0 || reducePrecision(a2[2]) >= 100) && (a2[0] = Number.NaN, a2[1] = Number.NaN), reducePrecision(a2[1]) <= 0 && (a2[0] = Number.NaN);
          break;
        case exports$1.ColorNotation.HWB:
          Math.max(0, reducePrecision(a2[1])) + Math.max(0, reducePrecision(a2[2])) >= 100 && (a2[0] = Number.NaN);
          break;
        case exports$1.ColorNotation.Lab:
          (reducePrecision(a2[0]) <= 0 || reducePrecision(a2[0]) >= 100) && (a2[1] = Number.NaN, a2[2] = Number.NaN);
          break;
        case exports$1.ColorNotation.LCH:
          reducePrecision(a2[1]) <= 0 && (a2[2] = Number.NaN), (reducePrecision(a2[0]) <= 0 || reducePrecision(a2[0]) >= 100) && (a2[1] = Number.NaN, a2[2] = Number.NaN);
          break;
        case exports$1.ColorNotation.OKLab:
          (reducePrecision(a2[0]) <= 0 || reducePrecision(a2[0]) >= 1) && (a2[1] = Number.NaN, a2[2] = Number.NaN);
          break;
        case exports$1.ColorNotation.OKLCH:
          reducePrecision(a2[1]) <= 0 && (a2[2] = Number.NaN), (reducePrecision(a2[0]) <= 0 || reducePrecision(a2[0]) >= 1) && (a2[1] = Number.NaN, a2[2] = Number.NaN);
      }
      return a2;
    }
    function carryForwardMissingComponents(e2, o2, a2, n2) {
      const t2 = [...a2];
      for (const a3 of o2) Number.isNaN(e2[o2[a3]]) && (t2[n2[a3]] = Number.NaN);
      return t2;
    }
    function normalizeRelativeColorDataChannels(e2) {
      const o2 = /* @__PURE__ */ new Map();
      switch (e2.colorNotation) {
        case exports$1.ColorNotation.RGB:
        case exports$1.ColorNotation.HEX:
          o2.set("r", dummyNumberToken(255 * e2.channels[0])), o2.set("g", dummyNumberToken(255 * e2.channels[1])), o2.set("b", dummyNumberToken(255 * e2.channels[2])), "number" == typeof e2.alpha && o2.set("alpha", dummyNumberToken(e2.alpha));
          break;
        case exports$1.ColorNotation.HSL:
          o2.set("h", dummyNumberToken(e2.channels[0])), o2.set("s", dummyNumberToken(e2.channels[1])), o2.set("l", dummyNumberToken(e2.channels[2])), "number" == typeof e2.alpha && o2.set("alpha", dummyNumberToken(e2.alpha));
          break;
        case exports$1.ColorNotation.HWB:
          o2.set("h", dummyNumberToken(e2.channels[0])), o2.set("w", dummyNumberToken(e2.channels[1])), o2.set("b", dummyNumberToken(e2.channels[2])), "number" == typeof e2.alpha && o2.set("alpha", dummyNumberToken(e2.alpha));
          break;
        case exports$1.ColorNotation.Lab:
        case exports$1.ColorNotation.OKLab:
          o2.set("l", dummyNumberToken(e2.channels[0])), o2.set("a", dummyNumberToken(e2.channels[1])), o2.set("b", dummyNumberToken(e2.channels[2])), "number" == typeof e2.alpha && o2.set("alpha", dummyNumberToken(e2.alpha));
          break;
        case exports$1.ColorNotation.LCH:
        case exports$1.ColorNotation.OKLCH:
          o2.set("l", dummyNumberToken(e2.channels[0])), o2.set("c", dummyNumberToken(e2.channels[1])), o2.set("h", dummyNumberToken(e2.channels[2])), "number" == typeof e2.alpha && o2.set("alpha", dummyNumberToken(e2.alpha));
          break;
        case exports$1.ColorNotation.sRGB:
        case exports$1.ColorNotation.A98_RGB:
        case exports$1.ColorNotation.Display_P3:
        case exports$1.ColorNotation.Linear_Display_P3:
        case exports$1.ColorNotation.Rec2020:
        case exports$1.ColorNotation.Linear_sRGB:
        case exports$1.ColorNotation.ProPhoto_RGB:
          o2.set("r", dummyNumberToken(e2.channels[0])), o2.set("g", dummyNumberToken(e2.channels[1])), o2.set("b", dummyNumberToken(e2.channels[2])), "number" == typeof e2.alpha && o2.set("alpha", dummyNumberToken(e2.alpha));
          break;
        case exports$1.ColorNotation.XYZ_D50:
        case exports$1.ColorNotation.XYZ_D65:
          o2.set("x", dummyNumberToken(e2.channels[0])), o2.set("y", dummyNumberToken(e2.channels[1])), o2.set("z", dummyNumberToken(e2.channels[2])), "number" == typeof e2.alpha && o2.set("alpha", dummyNumberToken(e2.alpha));
      }
      return o2;
    }
    function noneToZeroInRelativeColorDataChannels(e2) {
      const o2 = new Map(e2);
      for (const [a2, n2] of e2) Number.isNaN(n2[4].value) && o2.set(a2, dummyNumberToken(0));
      return o2;
    }
    function dummyNumberToken(e2) {
      return Number.isNaN(e2) ? [a.TokenType.Number, "none", -1, -1, { value: Number.NaN, type: a.NumberType.Number }] : [a.TokenType.Number, e2.toString(), -1, -1, { value: e2, type: a.NumberType.Number }];
    }
    function reducePrecision(e2, o2 = 7) {
      if (Number.isNaN(e2)) return 0;
      const a2 = Math.pow(10, o2);
      return Math.round(e2 * a2) / a2;
    }
    function normalize(e2, o2, a2, n2) {
      return Math.min(Math.max(e2 / o2, a2), n2);
    }
    const s = /[A-Z]/g;
    function toLowerCaseAZ(e2) {
      return e2.replace(s, (e3) => String.fromCharCode(e3.charCodeAt(0) + 32));
    }
    function normalize_Color_ChannelValues(e2, o2, n2) {
      if (a.isTokenIdent(e2) && "none" === toLowerCaseAZ(e2[4].value)) return n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNoneKeywords), [a.TokenType.Number, "none", e2[2], e2[3], { value: Number.NaN, type: a.NumberType.Number }];
      if (a.isTokenPercentage(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageValues);
        let t2 = normalize(e2[4].value, 100, -2147483647, 2147483647);
        return 3 === o2 && (t2 = normalize(e2[4].value, 100, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      if (a.isTokenNumber(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNumberValues);
        let t2 = normalize(e2[4].value, 1, -2147483647, 2147483647);
        return 3 === o2 && (t2 = normalize(e2[4].value, 1, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      return false;
    }
    const i = /* @__PURE__ */ new Set(["srgb", "srgb-linear", "display-p3", "display-p3-linear", "a98-rgb", "prophoto-rgb", "rec2020", "xyz", "xyz-d50", "xyz-d65"]);
    function color$1(e2, o2) {
      const n2 = [], l2 = [], s2 = [], u2 = [];
      let c2, p2, N2 = false, m = false;
      const h = { colorNotation: exports$1.ColorNotation.sRGB, channels: [0, 0, 0], alpha: 1, syntaxFlags: /* @__PURE__ */ new Set([]) };
      let x = n2;
      for (let y2 = 0; y2 < e2.value.length; y2++) {
        let b2 = e2.value[y2];
        if (t.isWhitespaceNode(b2) || t.isCommentNode(b2)) for (; t.isWhitespaceNode(e2.value[y2 + 1]) || t.isCommentNode(e2.value[y2 + 1]); ) y2++;
        else if (x === n2 && n2.length && (x = l2), x === l2 && l2.length && (x = s2), t.isTokenNode(b2) && a.isTokenDelim(b2.value) && "/" === b2.value[4].value) {
          if (x === u2) return false;
          x = u2;
        } else {
          if (t.isFunctionNode(b2)) {
            if (x === u2 && "var" === toLowerCaseAZ(b2.getName())) {
              h.syntaxFlags.add(exports$1.SyntaxFlag.HasVariableAlpha), x.push(b2);
              continue;
            }
            if (!r.mathFunctionNames.has(toLowerCaseAZ(b2.getName()))) return false;
            const [[e3]] = r.calcFromComponentValues([[b2]], { censorIntoStandardRepresentableValues: true, globals: p2, precision: -1, toCanonicalUnits: true, rawPercentages: true });
            if (!e3 || !t.isTokenNode(e3) || !a.isTokenNumeric(e3.value)) return false;
            Number.isNaN(e3.value[4].value) && (e3.value[4].value = 0), b2 = e3;
          }
          if (x === n2 && 0 === n2.length && t.isTokenNode(b2) && a.isTokenIdent(b2.value) && i.has(toLowerCaseAZ(b2.value[4].value))) {
            if (N2) return false;
            N2 = toLowerCaseAZ(b2.value[4].value), h.colorNotation = colorSpaceNameToColorNotation(N2), m && (m.colorNotation !== h.colorNotation && (m = colorDataTo(m, h.colorNotation)), c2 = normalizeRelativeColorDataChannels(m), p2 = noneToZeroInRelativeColorDataChannels(c2));
          } else if (x === n2 && 0 === n2.length && t.isTokenNode(b2) && a.isTokenIdent(b2.value) && "from" === toLowerCaseAZ(b2.value[4].value)) {
            if (m) return false;
            if (N2) return false;
            for (; t.isWhitespaceNode(e2.value[y2 + 1]) || t.isCommentNode(e2.value[y2 + 1]); ) y2++;
            if (y2++, b2 = e2.value[y2], m = o2(b2), false === m) return false;
            m.syntaxFlags.has(exports$1.SyntaxFlag.Experimental) && h.syntaxFlags.add(exports$1.SyntaxFlag.Experimental), h.syntaxFlags.add(exports$1.SyntaxFlag.RelativeColorSyntax);
          } else {
            if (!t.isTokenNode(b2)) return false;
            if (a.isTokenIdent(b2.value) && c2 && c2.has(toLowerCaseAZ(b2.value[4].value))) {
              x.push(new t.TokenNode(c2.get(toLowerCaseAZ(b2.value[4].value))));
              continue;
            }
            x.push(b2);
          }
        }
      }
      if (!N2) return false;
      if (1 !== x.length) return false;
      if (1 !== n2.length || 1 !== l2.length || 1 !== s2.length) return false;
      if (!t.isTokenNode(n2[0]) || !t.isTokenNode(l2[0]) || !t.isTokenNode(s2[0])) return false;
      if (c2 && !c2.has("alpha")) return false;
      const y = normalize_Color_ChannelValues(n2[0].value, 0, h);
      if (!y || !a.isTokenNumber(y)) return false;
      const b = normalize_Color_ChannelValues(l2[0].value, 1, h);
      if (!b || !a.isTokenNumber(b)) return false;
      const C = normalize_Color_ChannelValues(s2[0].value, 2, h);
      if (!C || !a.isTokenNumber(C)) return false;
      const d = [y, b, C];
      if (1 === u2.length) if (h.syntaxFlags.add(exports$1.SyntaxFlag.HasAlpha), t.isTokenNode(u2[0])) {
        const e3 = normalize_Color_ChannelValues(u2[0].value, 3, h);
        if (!e3 || !a.isTokenNumber(e3)) return false;
        d.push(e3);
      } else h.alpha = u2[0];
      else if (c2 && c2.has("alpha")) {
        const e3 = normalize_Color_ChannelValues(c2.get("alpha"), 3, h);
        if (!e3 || !a.isTokenNumber(e3)) return false;
        d.push(e3);
      }
      return h.channels = [d[0][4].value, d[1][4].value, d[2][4].value], 4 === d.length && (h.alpha = d[3][4].value), h;
    }
    function colorSpaceNameToColorNotation(e2) {
      switch (e2) {
        case "srgb":
          return exports$1.ColorNotation.sRGB;
        case "srgb-linear":
          return exports$1.ColorNotation.Linear_sRGB;
        case "display-p3":
          return exports$1.ColorNotation.Display_P3;
        case "display-p3-linear":
          return exports$1.ColorNotation.Linear_Display_P3;
        case "a98-rgb":
          return exports$1.ColorNotation.A98_RGB;
        case "prophoto-rgb":
          return exports$1.ColorNotation.ProPhoto_RGB;
        case "rec2020":
          return exports$1.ColorNotation.Rec2020;
        case "xyz":
        case "xyz-d65":
          return exports$1.ColorNotation.XYZ_D65;
        case "xyz-d50":
          return exports$1.ColorNotation.XYZ_D50;
        default:
          throw new Error("Unknown color space name: " + e2);
      }
    }
    const u = /* @__PURE__ */ new Set(["srgb", "srgb-linear", "display-p3", "display-p3-linear", "a98-rgb", "prophoto-rgb", "rec2020", "lab", "oklab", "xyz", "xyz-d50", "xyz-d65"]), c = /* @__PURE__ */ new Set(["hsl", "hwb", "lch", "oklch"]), p = /* @__PURE__ */ new Set(["shorter", "longer", "increasing", "decreasing"]);
    function colorMix(e2, o2) {
      let n2 = null, r2 = null, l2 = null, s2 = false;
      for (let i2 = 0; i2 < e2.value.length; i2++) {
        const N2 = e2.value[i2];
        if (!t.isWhiteSpaceOrCommentNode(N2)) {
          if (!(n2 || t.isTokenNode(N2) && a.isTokenIdent(N2.value) && "in" === toLowerCaseAZ(N2.value[4].value))) return colorMixRectangular("oklab", colorMixComponents(e2.value, o2));
          if (t.isTokenNode(N2) && a.isTokenIdent(N2.value)) {
            if (!n2 && "in" === toLowerCaseAZ(N2.value[4].value)) {
              n2 = N2;
              continue;
            }
            if (n2 && !r2) {
              r2 = toLowerCaseAZ(N2.value[4].value);
              continue;
            }
            if (n2 && r2 && !l2 && c.has(r2)) {
              l2 = toLowerCaseAZ(N2.value[4].value);
              continue;
            }
            if (n2 && r2 && l2 && !s2 && "hue" === toLowerCaseAZ(N2.value[4].value)) {
              s2 = true;
              continue;
            }
            return false;
          }
          return !(!t.isTokenNode(N2) || !a.isTokenComma(N2.value)) && (!!r2 && (l2 || s2 ? !!(r2 && l2 && s2 && c.has(r2) && p.has(l2)) && colorMixPolar(r2, l2, colorMixComponents(e2.value.slice(i2 + 1), o2)) : u.has(r2) ? colorMixRectangular(r2, colorMixComponents(e2.value.slice(i2 + 1), o2)) : !!c.has(r2) && colorMixPolar(r2, "shorter", colorMixComponents(e2.value.slice(i2 + 1), o2))));
        }
      }
      return false;
    }
    function colorMixComponents(e2, o2) {
      const n2 = [];
      let l2 = 1, s2 = false, i2 = false;
      for (let l3 = 0; l3 < e2.length; l3++) {
        let u3 = e2[l3];
        if (!t.isWhiteSpaceOrCommentNode(u3)) {
          if (!t.isTokenNode(u3) || !a.isTokenComma(u3.value)) {
            if (!s2) {
              const e3 = o2(u3);
              if (e3) {
                s2 = e3;
                continue;
              }
            }
            if (!i2) {
              if (t.isFunctionNode(u3) && r.mathFunctionNames.has(toLowerCaseAZ(u3.getName()))) {
                if ([[u3]] = r.calcFromComponentValues([[u3]], { censorIntoStandardRepresentableValues: true, precision: -1, toCanonicalUnits: true, rawPercentages: true }), !u3 || !t.isTokenNode(u3) || !a.isTokenNumeric(u3.value)) return false;
                Number.isNaN(u3.value[4].value) && (u3.value[4].value = 0);
              }
              if (t.isTokenNode(u3) && a.isTokenPercentage(u3.value) && u3.value[4].value >= 0) {
                i2 = u3.value[4].value;
                continue;
              }
            }
            return false;
          }
          if (!s2) return false;
          n2.push({ color: s2, percentage: i2 }), s2 = false, i2 = false;
        }
      }
      if (!s2) return false;
      n2.push({ color: s2, percentage: i2 });
      let u2 = 0, c2 = 0;
      for (let e3 = 0; e3 < n2.length; e3++) {
        const o3 = n2[e3].percentage;
        if (false !== o3) {
          if (o3 < 0 || o3 > 100) return false;
          u2 += o3;
        } else c2++;
      }
      const p2 = Math.max(0, 100 - u2);
      u2 = 0;
      for (let e3 = 0; e3 < n2.length; e3++) false === n2[e3].percentage && (n2[e3].percentage = p2 / c2), u2 += n2[e3].percentage;
      if (0 === u2) return { colors: [{ color: { channels: [0, 0, 0], colorNotation: exports$1.ColorNotation.sRGB, alpha: 0, syntaxFlags: /* @__PURE__ */ new Set() }, percentage: 0 }], alphaMultiplier: 0 };
      if (u2 > 100) for (let e3 = 0; e3 < n2.length; e3++) {
        let o3 = n2[e3].percentage;
        o3 = o3 / u2 * 100, n2[e3].percentage = o3;
      }
      if (u2 < 100) {
        l2 = u2 / 100;
        for (let e3 = 0; e3 < n2.length; e3++) {
          let o3 = n2[e3].percentage;
          o3 = o3 / u2 * 100, n2[e3].percentage = o3;
        }
      }
      return { colors: n2, alphaMultiplier: l2 };
    }
    function colorMixRectangular(e2, o2) {
      if (!o2 || !o2.colors.length) return false;
      const a2 = o2.colors.slice();
      a2.reverse();
      let n2 = exports$1.ColorNotation.RGB;
      switch (e2) {
        case "srgb":
          n2 = exports$1.ColorNotation.RGB;
          break;
        case "srgb-linear":
          n2 = exports$1.ColorNotation.Linear_sRGB;
          break;
        case "display-p3":
          n2 = exports$1.ColorNotation.Display_P3;
          break;
        case "display-p3-linear":
          n2 = exports$1.ColorNotation.Linear_Display_P3;
          break;
        case "a98-rgb":
          n2 = exports$1.ColorNotation.A98_RGB;
          break;
        case "prophoto-rgb":
          n2 = exports$1.ColorNotation.ProPhoto_RGB;
          break;
        case "rec2020":
          n2 = exports$1.ColorNotation.Rec2020;
          break;
        case "lab":
          n2 = exports$1.ColorNotation.Lab;
          break;
        case "oklab":
          n2 = exports$1.ColorNotation.OKLab;
          break;
        case "xyz-d50":
          n2 = exports$1.ColorNotation.XYZ_D50;
          break;
        case "xyz":
        case "xyz-d65":
          n2 = exports$1.ColorNotation.XYZ_D65;
          break;
        default:
          return false;
      }
      if (1 === a2.length) {
        const e3 = colorDataTo(a2[0].color, n2);
        return e3.colorNotation = n2, e3.syntaxFlags.add(exports$1.SyntaxFlag.ColorMixVariadic), "number" != typeof e3.alpha ? false : (e3.alpha = e3.alpha * o2.alphaMultiplier, e3);
      }
      for (; a2.length >= 2; ) {
        const e3 = a2.pop(), o3 = a2.pop();
        if (!e3 || !o3) return false;
        const t3 = colorMixRectangularPair(n2, e3.color, e3.percentage, o3.color, o3.percentage);
        if (!t3) return false;
        a2.push({ color: t3, percentage: e3.percentage + o3.percentage });
      }
      const t2 = a2[0]?.color;
      return !!t2 && (o2.colors.some((e3) => e3.color.syntaxFlags.has(exports$1.SyntaxFlag.Experimental)) && t2.syntaxFlags.add(exports$1.SyntaxFlag.Experimental), "number" == typeof t2.alpha && (t2.alpha = t2.alpha * o2.alphaMultiplier, 2 !== o2.colors.length && t2.syntaxFlags.add(exports$1.SyntaxFlag.ColorMixVariadic), t2));
    }
    function colorMixRectangularPair(e2, o2, a2, n2, t2) {
      const r2 = a2 / (a2 + t2);
      let l2 = o2.alpha;
      if ("number" != typeof l2) return false;
      let s2 = n2.alpha;
      if ("number" != typeof s2) return false;
      l2 = Number.isNaN(l2) ? s2 : l2, s2 = Number.isNaN(s2) ? l2 : s2;
      const i2 = colorDataTo(o2, e2).channels, u2 = colorDataTo(n2, e2).channels;
      i2[0] = fillInMissingComponent(i2[0], u2[0]), u2[0] = fillInMissingComponent(u2[0], i2[0]), i2[1] = fillInMissingComponent(i2[1], u2[1]), u2[1] = fillInMissingComponent(u2[1], i2[1]), i2[2] = fillInMissingComponent(i2[2], u2[2]), u2[2] = fillInMissingComponent(u2[2], i2[2]), i2[0] = premultiply(i2[0], l2), i2[1] = premultiply(i2[1], l2), i2[2] = premultiply(i2[2], l2), u2[0] = premultiply(u2[0], s2), u2[1] = premultiply(u2[1], s2), u2[2] = premultiply(u2[2], s2);
      const c2 = interpolate(l2, s2, r2);
      return { colorNotation: e2, channels: [un_premultiply(interpolate(i2[0], u2[0], r2), c2), un_premultiply(interpolate(i2[1], u2[1], r2), c2), un_premultiply(interpolate(i2[2], u2[2], r2), c2)], alpha: c2, syntaxFlags: /* @__PURE__ */ new Set([exports$1.SyntaxFlag.ColorMix]) };
    }
    function colorMixPolar(e2, o2, a2) {
      if (!a2 || !a2.colors.length) return false;
      const n2 = a2.colors.slice();
      n2.reverse();
      let t2 = exports$1.ColorNotation.HSL;
      switch (e2) {
        case "hsl":
          t2 = exports$1.ColorNotation.HSL;
          break;
        case "hwb":
          t2 = exports$1.ColorNotation.HWB;
          break;
        case "lch":
          t2 = exports$1.ColorNotation.LCH;
          break;
        case "oklch":
          t2 = exports$1.ColorNotation.OKLCH;
          break;
        default:
          return false;
      }
      if (1 === n2.length) {
        const e3 = colorDataTo(n2[0].color, t2);
        return e3.colorNotation = t2, e3.syntaxFlags.add(exports$1.SyntaxFlag.ColorMixVariadic), "number" != typeof e3.alpha ? false : (e3.alpha = e3.alpha * a2.alphaMultiplier, e3);
      }
      for (; n2.length >= 2; ) {
        const e3 = n2.pop(), a3 = n2.pop();
        if (!e3 || !a3) return false;
        const r3 = colorMixPolarPair(t2, o2, e3.color, e3.percentage, a3.color, a3.percentage);
        if (!r3) return false;
        n2.push({ color: r3, percentage: e3.percentage + a3.percentage });
      }
      const r2 = n2[0]?.color;
      return !!r2 && (a2.colors.some((e3) => e3.color.syntaxFlags.has(exports$1.SyntaxFlag.Experimental)) && r2.syntaxFlags.add(exports$1.SyntaxFlag.Experimental), "number" == typeof r2.alpha && (r2.alpha = r2.alpha * a2.alphaMultiplier, 2 !== a2.colors.length && r2.syntaxFlags.add(exports$1.SyntaxFlag.ColorMixVariadic), r2));
    }
    function colorMixPolarPair(e2, o2, a2, n2, t2, r2) {
      const l2 = n2 / (n2 + r2);
      let s2 = 0, i2 = 0, u2 = 0, c2 = 0, p2 = 0, N2 = 0, m = a2.alpha;
      if ("number" != typeof m) return false;
      let h = t2.alpha;
      if ("number" != typeof h) return false;
      m = Number.isNaN(m) ? h : m, h = Number.isNaN(h) ? m : h;
      const x = colorDataTo(a2, e2).channels, y = colorDataTo(t2, e2).channels;
      switch (e2) {
        case exports$1.ColorNotation.HSL:
        case exports$1.ColorNotation.HWB:
          s2 = x[0], i2 = y[0], u2 = x[1], c2 = y[1], p2 = x[2], N2 = y[2];
          break;
        case exports$1.ColorNotation.LCH:
        case exports$1.ColorNotation.OKLCH:
          u2 = x[0], c2 = y[0], p2 = x[1], N2 = y[1], s2 = x[2], i2 = y[2];
      }
      s2 = fillInMissingComponent(s2, i2), Number.isNaN(s2) && (s2 = 0), i2 = fillInMissingComponent(i2, s2), Number.isNaN(i2) && (i2 = 0), u2 = fillInMissingComponent(u2, c2), c2 = fillInMissingComponent(c2, u2), p2 = fillInMissingComponent(p2, N2), N2 = fillInMissingComponent(N2, p2);
      const b = i2 - s2;
      switch (o2) {
        case "shorter":
          b > 180 ? s2 += 360 : b < -180 && (i2 += 360);
          break;
        case "longer":
          -180 < b && b < 180 && (b > 0 ? s2 += 360 : i2 += 360);
          break;
        case "increasing":
          b < 0 && (i2 += 360);
          break;
        case "decreasing":
          b > 0 && (s2 += 360);
          break;
        default:
          throw new Error("Unknown hue interpolation method");
      }
      u2 = premultiply(u2, m), p2 = premultiply(p2, m), c2 = premultiply(c2, h), N2 = premultiply(N2, h);
      let C = [0, 0, 0];
      const d = interpolate(m, h, l2);
      switch (e2) {
        case exports$1.ColorNotation.HSL:
        case exports$1.ColorNotation.HWB:
          C = [interpolate(s2, i2, l2), un_premultiply(interpolate(u2, c2, l2), d), un_premultiply(interpolate(p2, N2, l2), d)];
          break;
        case exports$1.ColorNotation.LCH:
        case exports$1.ColorNotation.OKLCH:
          C = [un_premultiply(interpolate(u2, c2, l2), d), un_premultiply(interpolate(p2, N2, l2), d), interpolate(s2, i2, l2)];
      }
      return { colorNotation: e2, channels: C, alpha: d, syntaxFlags: /* @__PURE__ */ new Set([exports$1.SyntaxFlag.ColorMix]) };
    }
    function fillInMissingComponent(e2, o2) {
      return Number.isNaN(e2) ? o2 : e2;
    }
    function interpolate(e2, o2, a2) {
      return e2 * a2 + o2 * (1 - a2);
    }
    function premultiply(e2, o2) {
      return Number.isNaN(o2) ? e2 : Number.isNaN(e2) ? Number.NaN : e2 * o2;
    }
    function un_premultiply(e2, o2) {
      return 0 === o2 || Number.isNaN(o2) ? e2 : Number.isNaN(e2) ? Number.NaN : e2 / o2;
    }
    function hex(e2) {
      const o2 = toLowerCaseAZ(e2[4].value);
      if (o2.match(/[^a-f0-9]/)) return false;
      const a2 = { colorNotation: exports$1.ColorNotation.HEX, channels: [0, 0, 0], alpha: 1, syntaxFlags: /* @__PURE__ */ new Set([exports$1.SyntaxFlag.Hex]) }, n2 = o2.length;
      if (3 === n2) {
        const e3 = o2[0], n3 = o2[1], t2 = o2[2];
        return a2.channels = [parseInt(e3 + e3, 16) / 255, parseInt(n3 + n3, 16) / 255, parseInt(t2 + t2, 16) / 255], a2;
      }
      if (6 === n2) {
        const e3 = o2[0] + o2[1], n3 = o2[2] + o2[3], t2 = o2[4] + o2[5];
        return a2.channels = [parseInt(e3, 16) / 255, parseInt(n3, 16) / 255, parseInt(t2, 16) / 255], a2;
      }
      if (4 === n2) {
        const e3 = o2[0], n3 = o2[1], t2 = o2[2], r2 = o2[3];
        return a2.channels = [parseInt(e3 + e3, 16) / 255, parseInt(n3 + n3, 16) / 255, parseInt(t2 + t2, 16) / 255], a2.alpha = parseInt(r2 + r2, 16) / 255, a2.syntaxFlags.add(exports$1.SyntaxFlag.HasAlpha), a2;
      }
      if (8 === n2) {
        const e3 = o2[0] + o2[1], n3 = o2[2] + o2[3], t2 = o2[4] + o2[5], r2 = o2[6] + o2[7];
        return a2.channels = [parseInt(e3, 16) / 255, parseInt(n3, 16) / 255, parseInt(t2, 16) / 255], a2.alpha = parseInt(r2, 16) / 255, a2.syntaxFlags.add(exports$1.SyntaxFlag.HasAlpha), a2;
      }
      return false;
    }
    function normalizeHue(e2) {
      if (a.isTokenNumber(e2)) return e2[4].value = e2[4].value % 360, e2[1] = e2[4].value.toString(), e2;
      if (a.isTokenDimension(e2)) {
        let o2 = e2[4].value;
        switch (toLowerCaseAZ(e2[4].unit)) {
          case "deg":
            break;
          case "rad":
            o2 = 180 * e2[4].value / Math.PI;
            break;
          case "grad":
            o2 = 0.9 * e2[4].value;
            break;
          case "turn":
            o2 = 360 * e2[4].value;
            break;
          default:
            return false;
        }
        return o2 %= 360, [a.TokenType.Number, o2.toString(), e2[2], e2[3], { value: o2, type: a.NumberType.Number }];
      }
      return false;
    }
    function normalize_legacy_HSL_ChannelValues(e2, o2, n2) {
      if (0 === o2) {
        const o3 = normalizeHue(e2);
        return false !== o3 && (a.isTokenDimension(e2) && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasDimensionValues), o3);
      }
      if (a.isTokenPercentage(e2)) {
        3 === o2 ? n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageAlpha) : n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageValues);
        let t2 = normalize(e2[4].value, 1, 0, 100);
        return 3 === o2 && (t2 = normalize(e2[4].value, 100, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      if (a.isTokenNumber(e2)) {
        if (3 !== o2) return false;
        let n3 = normalize(e2[4].value, 1, 0, 100);
        return 3 === o2 && (n3 = normalize(e2[4].value, 1, 0, 1)), [a.TokenType.Number, n3.toString(), e2[2], e2[3], { value: n3, type: a.NumberType.Number }];
      }
      return false;
    }
    function normalize_modern_HSL_ChannelValues(e2, o2, n2) {
      if (a.isTokenIdent(e2) && "none" === toLowerCaseAZ(e2[4].value)) return n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNoneKeywords), [a.TokenType.Number, "none", e2[2], e2[3], { value: Number.NaN, type: a.NumberType.Number }];
      if (0 === o2) {
        const o3 = normalizeHue(e2);
        return false !== o3 && (a.isTokenDimension(e2) && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasDimensionValues), o3);
      }
      if (a.isTokenPercentage(e2)) {
        3 === o2 ? n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageAlpha) : n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageValues);
        let t2 = e2[4].value;
        return 3 === o2 ? t2 = normalize(e2[4].value, 100, 0, 1) : 1 === o2 && (t2 = normalize(e2[4].value, 1, 0, 2147483647)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      if (a.isTokenNumber(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNumberValues);
        let t2 = e2[4].value;
        return 3 === o2 ? t2 = normalize(e2[4].value, 1, 0, 1) : 1 === o2 && (t2 = normalize(e2[4].value, 1, 0, 2147483647)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      return false;
    }
    function threeChannelLegacySyntax(e2, o2, n2, l2) {
      const s2 = [], i2 = [], u2 = [], c2 = [], p2 = { colorNotation: n2, channels: [0, 0, 0], alpha: 1, syntaxFlags: new Set(l2) };
      let N2 = s2;
      for (let o3 = 0; o3 < e2.value.length; o3++) {
        let n3 = e2.value[o3];
        if (!t.isWhitespaceNode(n3) && !t.isCommentNode(n3)) {
          if (t.isTokenNode(n3) && a.isTokenComma(n3.value)) {
            if (N2 === s2) {
              N2 = i2;
              continue;
            }
            if (N2 === i2) {
              N2 = u2;
              continue;
            }
            if (N2 === u2) {
              N2 = c2;
              continue;
            }
            if (N2 === c2) return false;
          }
          if (t.isFunctionNode(n3)) {
            if (N2 === c2 && "var" === n3.getName().toLowerCase()) {
              p2.syntaxFlags.add(exports$1.SyntaxFlag.HasVariableAlpha), N2.push(n3);
              continue;
            }
            if (!r.mathFunctionNames.has(n3.getName().toLowerCase())) return false;
            const [[e3]] = r.calcFromComponentValues([[n3]], { censorIntoStandardRepresentableValues: true, precision: -1, toCanonicalUnits: true, rawPercentages: true });
            if (!e3 || !t.isTokenNode(e3) || !a.isTokenNumeric(e3.value)) return false;
            Number.isNaN(e3.value[4].value) && (e3.value[4].value = 0), n3 = e3;
          }
          if (!t.isTokenNode(n3)) return false;
          N2.push(n3);
        }
      }
      if (1 !== N2.length) return false;
      if (1 !== s2.length || 1 !== i2.length || 1 !== u2.length) return false;
      if (!t.isTokenNode(s2[0]) || !t.isTokenNode(i2[0]) || !t.isTokenNode(u2[0])) return false;
      const m = o2(s2[0].value, 0, p2);
      if (!m || !a.isTokenNumber(m)) return false;
      const h = o2(i2[0].value, 1, p2);
      if (!h || !a.isTokenNumber(h)) return false;
      const x = o2(u2[0].value, 2, p2);
      if (!x || !a.isTokenNumber(x)) return false;
      const y = [m, h, x];
      if (1 === c2.length) if (p2.syntaxFlags.add(exports$1.SyntaxFlag.HasAlpha), t.isTokenNode(c2[0])) {
        const e3 = o2(c2[0].value, 3, p2);
        if (!e3 || !a.isTokenNumber(e3)) return false;
        y.push(e3);
      } else p2.alpha = c2[0];
      return p2.channels = [y[0][4].value, y[1][4].value, y[2][4].value], 4 === y.length && (p2.alpha = y[3][4].value), p2;
    }
    function threeChannelSpaceSeparated(e2, o2, n2, l2, s2) {
      const i2 = [], u2 = [], c2 = [], p2 = [];
      let N2, m, h = false;
      const x = { colorNotation: n2, channels: [0, 0, 0], alpha: 1, syntaxFlags: new Set(l2) };
      let y = i2;
      for (let o3 = 0; o3 < e2.value.length; o3++) {
        let l3 = e2.value[o3];
        if (t.isWhitespaceNode(l3) || t.isCommentNode(l3)) for (; t.isWhitespaceNode(e2.value[o3 + 1]) || t.isCommentNode(e2.value[o3 + 1]); ) o3++;
        else if (y === i2 && i2.length && (y = u2), y === u2 && u2.length && (y = c2), t.isTokenNode(l3) && a.isTokenDelim(l3.value) && "/" === l3.value[4].value) {
          if (y === p2) return false;
          y = p2;
        } else {
          if (t.isFunctionNode(l3)) {
            if (y === p2 && "var" === l3.getName().toLowerCase()) {
              x.syntaxFlags.add(exports$1.SyntaxFlag.HasVariableAlpha), y.push(l3);
              continue;
            }
            if (!r.mathFunctionNames.has(l3.getName().toLowerCase())) return false;
            const [[e3]] = r.calcFromComponentValues([[l3]], { censorIntoStandardRepresentableValues: true, globals: m, precision: -1, toCanonicalUnits: true, rawPercentages: true });
            if (!e3 || !t.isTokenNode(e3) || !a.isTokenNumeric(e3.value)) return false;
            Number.isNaN(e3.value[4].value) && (e3.value[4].value = 0), l3 = e3;
          }
          if (y === i2 && 0 === i2.length && t.isTokenNode(l3) && a.isTokenIdent(l3.value) && "from" === l3.value[4].value.toLowerCase()) {
            if (h) return false;
            for (; t.isWhitespaceNode(e2.value[o3 + 1]) || t.isCommentNode(e2.value[o3 + 1]); ) o3++;
            if (o3++, l3 = e2.value[o3], h = s2(l3), false === h) return false;
            h.syntaxFlags.has(exports$1.SyntaxFlag.Experimental) && x.syntaxFlags.add(exports$1.SyntaxFlag.Experimental), x.syntaxFlags.add(exports$1.SyntaxFlag.RelativeColorSyntax), h.colorNotation !== n2 && (h = colorDataTo(h, n2)), N2 = normalizeRelativeColorDataChannels(h), m = noneToZeroInRelativeColorDataChannels(N2);
          } else {
            if (!t.isTokenNode(l3)) return false;
            if (a.isTokenIdent(l3.value) && N2) {
              const e3 = l3.value[4].value.toLowerCase();
              if (N2.has(e3)) {
                y.push(new t.TokenNode(N2.get(e3)));
                continue;
              }
            }
            y.push(l3);
          }
        }
      }
      if (1 !== y.length) return false;
      if (1 !== i2.length || 1 !== u2.length || 1 !== c2.length) return false;
      if (!t.isTokenNode(i2[0]) || !t.isTokenNode(u2[0]) || !t.isTokenNode(c2[0])) return false;
      if (N2 && !N2.has("alpha")) return false;
      const b = o2(i2[0].value, 0, x);
      if (!b || !a.isTokenNumber(b)) return false;
      const C = o2(u2[0].value, 1, x);
      if (!C || !a.isTokenNumber(C)) return false;
      const d = o2(c2[0].value, 2, x);
      if (!d || !a.isTokenNumber(d)) return false;
      const g = [b, C, d];
      if (1 === p2.length) if (x.syntaxFlags.add(exports$1.SyntaxFlag.HasAlpha), t.isTokenNode(p2[0])) {
        const e3 = o2(p2[0].value, 3, x);
        if (!e3 || !a.isTokenNumber(e3)) return false;
        g.push(e3);
      } else x.alpha = p2[0];
      else if (N2 && N2.has("alpha")) {
        const e3 = o2(N2.get("alpha"), 3, x);
        if (!e3 || !a.isTokenNumber(e3)) return false;
        g.push(e3);
      }
      return x.channels = [g[0][4].value, g[1][4].value, g[2][4].value], 4 === g.length && (x.alpha = g[3][4].value), x;
    }
    function hsl(e2, o2) {
      if (e2.value.some((e3) => t.isTokenNode(e3) && a.isTokenComma(e3.value))) {
        const o3 = hslCommaSeparated(e2);
        if (false !== o3) return o3;
      }
      {
        const a2 = hslSpaceSeparated(e2, o2);
        if (false !== a2) return a2;
      }
      return false;
    }
    function hslCommaSeparated(e2) {
      return threeChannelLegacySyntax(e2, normalize_legacy_HSL_ChannelValues, exports$1.ColorNotation.HSL, [exports$1.SyntaxFlag.LegacyHSL]);
    }
    function hslSpaceSeparated(e2, o2) {
      return threeChannelSpaceSeparated(e2, normalize_modern_HSL_ChannelValues, exports$1.ColorNotation.HSL, [], o2);
    }
    function normalize_HWB_ChannelValues(e2, o2, n2) {
      if (a.isTokenIdent(e2) && "none" === toLowerCaseAZ(e2[4].value)) return n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNoneKeywords), [a.TokenType.Number, "none", e2[2], e2[3], { value: Number.NaN, type: a.NumberType.Number }];
      if (0 === o2) {
        const o3 = normalizeHue(e2);
        return false !== o3 && (a.isTokenDimension(e2) && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasDimensionValues), o3);
      }
      if (a.isTokenPercentage(e2)) {
        3 === o2 ? n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageAlpha) : n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageValues);
        let t2 = e2[4].value;
        return 3 === o2 && (t2 = normalize(e2[4].value, 100, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      if (a.isTokenNumber(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNumberValues);
        let t2 = e2[4].value;
        return 3 === o2 && (t2 = normalize(e2[4].value, 1, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      return false;
    }
    function normalize_Lab_ChannelValues(e2, o2, n2) {
      if (a.isTokenIdent(e2) && "none" === toLowerCaseAZ(e2[4].value)) return n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNoneKeywords), [a.TokenType.Number, "none", e2[2], e2[3], { value: Number.NaN, type: a.NumberType.Number }];
      if (a.isTokenPercentage(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageValues);
        let t2 = normalize(e2[4].value, 1, 0, 100);
        return 1 === o2 || 2 === o2 ? t2 = normalize(e2[4].value, 0.8, -2147483647, 2147483647) : 3 === o2 && (t2 = normalize(e2[4].value, 100, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      if (a.isTokenNumber(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNumberValues);
        let t2 = normalize(e2[4].value, 1, 0, 100);
        return 1 === o2 || 2 === o2 ? t2 = normalize(e2[4].value, 1, -2147483647, 2147483647) : 3 === o2 && (t2 = normalize(e2[4].value, 1, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      return false;
    }
    function lab(e2, o2) {
      return threeChannelSpaceSeparated(e2, normalize_Lab_ChannelValues, exports$1.ColorNotation.Lab, [], o2);
    }
    function normalize_LCH_ChannelValues(e2, o2, n2) {
      if (a.isTokenIdent(e2) && "none" === toLowerCaseAZ(e2[4].value)) return n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNoneKeywords), [a.TokenType.Number, "none", e2[2], e2[3], { value: Number.NaN, type: a.NumberType.Number }];
      if (2 === o2) {
        const o3 = normalizeHue(e2);
        return false !== o3 && (a.isTokenDimension(e2) && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasDimensionValues), o3);
      }
      if (a.isTokenPercentage(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageValues);
        let t2 = normalize(e2[4].value, 1, 0, 100);
        return 1 === o2 ? t2 = normalize(e2[4].value, 100 / 150, 0, 2147483647) : 3 === o2 && (t2 = normalize(e2[4].value, 100, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      if (a.isTokenNumber(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNumberValues);
        let t2 = normalize(e2[4].value, 1, 0, 100);
        return 1 === o2 ? t2 = normalize(e2[4].value, 1, 0, 2147483647) : 3 === o2 && (t2 = normalize(e2[4].value, 1, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      return false;
    }
    function lch(e2, o2) {
      return threeChannelSpaceSeparated(e2, normalize_LCH_ChannelValues, exports$1.ColorNotation.LCH, [], o2);
    }
    const N = /* @__PURE__ */ new Map();
    for (const [e2, o2] of Object.entries(n.namedColors)) N.set(e2, o2);
    function namedColor(e2) {
      const o2 = N.get(toLowerCaseAZ(e2));
      return !!o2 && { colorNotation: exports$1.ColorNotation.RGB, channels: [o2[0] / 255, o2[1] / 255, o2[2] / 255], alpha: 1, syntaxFlags: /* @__PURE__ */ new Set([exports$1.SyntaxFlag.ColorKeyword, exports$1.SyntaxFlag.NamedColor]) };
    }
    function normalize_OKLab_ChannelValues(e2, o2, n2) {
      if (a.isTokenIdent(e2) && "none" === toLowerCaseAZ(e2[4].value)) return n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNoneKeywords), [a.TokenType.Number, "none", e2[2], e2[3], { value: Number.NaN, type: a.NumberType.Number }];
      if (a.isTokenPercentage(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageValues);
        let t2 = normalize(e2[4].value, 100, 0, 1);
        return 1 === o2 || 2 === o2 ? t2 = normalize(e2[4].value, 250, -2147483647, 2147483647) : 3 === o2 && (t2 = normalize(e2[4].value, 100, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      if (a.isTokenNumber(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNumberValues);
        let t2 = normalize(e2[4].value, 1, 0, 1);
        return 1 === o2 || 2 === o2 ? t2 = normalize(e2[4].value, 1, -2147483647, 2147483647) : 3 === o2 && (t2 = normalize(e2[4].value, 1, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      return false;
    }
    function oklab(e2, o2) {
      return threeChannelSpaceSeparated(e2, normalize_OKLab_ChannelValues, exports$1.ColorNotation.OKLab, [], o2);
    }
    function normalize_OKLCH_ChannelValues(e2, o2, n2) {
      if (a.isTokenIdent(e2) && "none" === toLowerCaseAZ(e2[4].value)) return n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNoneKeywords), [a.TokenType.Number, "none", e2[2], e2[3], { value: Number.NaN, type: a.NumberType.Number }];
      if (2 === o2) {
        const o3 = normalizeHue(e2);
        return false !== o3 && (a.isTokenDimension(e2) && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasDimensionValues), o3);
      }
      if (a.isTokenPercentage(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageValues);
        let t2 = normalize(e2[4].value, 100, 0, 1);
        return 1 === o2 ? t2 = normalize(e2[4].value, 250, 0, 2147483647) : 3 === o2 && (t2 = normalize(e2[4].value, 100, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      if (a.isTokenNumber(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNumberValues);
        let t2 = normalize(e2[4].value, 1, 0, 1);
        return 1 === o2 ? t2 = normalize(e2[4].value, 1, 0, 2147483647) : 3 === o2 && (t2 = normalize(e2[4].value, 1, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      return false;
    }
    function oklch(e2, o2) {
      return threeChannelSpaceSeparated(e2, normalize_OKLCH_ChannelValues, exports$1.ColorNotation.OKLCH, [], o2);
    }
    function normalize_legacy_sRGB_ChannelValues(e2, o2, n2) {
      if (a.isTokenPercentage(e2)) {
        3 === o2 ? n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageAlpha) : n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageValues);
        const t2 = normalize(e2[4].value, 100, 0, 1);
        return [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      if (a.isTokenNumber(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNumberValues);
        let t2 = normalize(e2[4].value, 255, 0, 1);
        return 3 === o2 && (t2 = normalize(e2[4].value, 1, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      return false;
    }
    function normalize_modern_sRGB_ChannelValues(e2, o2, n2) {
      if (a.isTokenIdent(e2) && "none" === e2[4].value.toLowerCase()) return n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNoneKeywords), [a.TokenType.Number, "none", e2[2], e2[3], { value: Number.NaN, type: a.NumberType.Number }];
      if (a.isTokenPercentage(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasPercentageValues);
        let t2 = normalize(e2[4].value, 100, -2147483647, 2147483647);
        return 3 === o2 && (t2 = normalize(e2[4].value, 100, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      if (a.isTokenNumber(e2)) {
        3 !== o2 && n2.syntaxFlags.add(exports$1.SyntaxFlag.HasNumberValues);
        let t2 = normalize(e2[4].value, 255, -2147483647, 2147483647);
        return 3 === o2 && (t2 = normalize(e2[4].value, 1, 0, 1)), [a.TokenType.Number, t2.toString(), e2[2], e2[3], { value: t2, type: a.NumberType.Number }];
      }
      return false;
    }
    function rgb(e2, o2) {
      if (e2.value.some((e3) => t.isTokenNode(e3) && a.isTokenComma(e3.value))) {
        const o3 = rgbCommaSeparated(e2);
        if (false !== o3) return (!o3.syntaxFlags.has(exports$1.SyntaxFlag.HasNumberValues) || !o3.syntaxFlags.has(exports$1.SyntaxFlag.HasPercentageValues)) && o3;
      } else {
        const a2 = rgbSpaceSeparated(e2, o2);
        if (false !== a2) return a2;
      }
      return false;
    }
    function rgbCommaSeparated(e2) {
      return threeChannelLegacySyntax(e2, normalize_legacy_sRGB_ChannelValues, exports$1.ColorNotation.RGB, [exports$1.SyntaxFlag.LegacyRGB]);
    }
    function rgbSpaceSeparated(e2, o2) {
      return threeChannelSpaceSeparated(e2, normalize_modern_sRGB_ChannelValues, exports$1.ColorNotation.RGB, [], o2);
    }
    function XYZ_D50_to_sRGB_Gamut(e2) {
      const o2 = n.XYZ_D50_to_sRGB(e2);
      if (n.inGamut(o2)) return n.clip(o2);
      let a2 = e2;
      return a2 = n.XYZ_D50_to_OKLCH(a2), a2[0] < 1e-6 && (a2 = [0, 0, 0]), a2[0] > 0.999999 && (a2 = [1, 0, 0]), n.gam_sRGB(n.mapGamutRayTrace(a2, oklch_to_lin_srgb, lin_srgb_to_oklch));
    }
    function oklch_to_lin_srgb(e2) {
      return e2 = n.OKLCH_to_OKLab(e2), e2 = n.OKLab_to_XYZ(e2), n.XYZ_to_lin_sRGB(e2);
    }
    function lin_srgb_to_oklch(e2) {
      return e2 = n.lin_sRGB_to_XYZ(e2), e2 = n.XYZ_to_OKLab(e2), n.OKLab_to_OKLCH(e2);
    }
    function contrastColor(e2, o2) {
      let a2 = false;
      for (let n2 = 0; n2 < e2.value.length; n2++) {
        const r3 = e2.value[n2];
        if (!t.isWhitespaceNode(r3) && !t.isCommentNode(r3) && (a2 || (a2 = o2(r3), !a2))) return false;
      }
      if (!a2) return false;
      a2.channels = convertNaNToZero(a2.channels), a2.channels = XYZ_D50_to_sRGB_Gamut(colorData_to_XYZ_D50(a2).channels), a2.colorNotation = exports$1.ColorNotation.sRGB;
      const r2 = { colorNotation: exports$1.ColorNotation.sRGB, channels: [0, 0, 0], alpha: 1, syntaxFlags: /* @__PURE__ */ new Set([exports$1.SyntaxFlag.ContrastColor, exports$1.SyntaxFlag.Experimental]) }, l2 = n.contrast_ratio_wcag_2_1(a2.channels, [1, 1, 1]), s2 = n.contrast_ratio_wcag_2_1(a2.channels, [0, 0, 0]);
      return r2.channels = l2 > s2 ? [1, 1, 1] : [0, 0, 0], r2;
    }
    function alpha(e2, o2) {
      let n2, l2, s2 = false, i2 = false, u2 = false;
      const c2 = { colorNotation: exports$1.ColorNotation.sRGB, channels: [0, 0, 0], alpha: 1, syntaxFlags: /* @__PURE__ */ new Set([]) };
      for (let p2 = 0; p2 < e2.value.length; p2++) {
        let N2 = e2.value[p2];
        if (t.isWhitespaceNode(N2) || t.isCommentNode(N2)) for (; t.isWhitespaceNode(e2.value[p2 + 1]) || t.isCommentNode(e2.value[p2 + 1]); ) p2++;
        else if (u2 && !s2 && !i2 && t.isTokenNode(N2) && a.isTokenDelim(N2.value) && "/" === N2.value[4].value) s2 = true;
        else {
          if (t.isFunctionNode(N2) && r.mathFunctionNames.has(toLowerCaseAZ(N2.getName()))) {
            const [[e3]] = r.calcFromComponentValues([[N2]], { censorIntoStandardRepresentableValues: true, globals: l2, precision: -1, toCanonicalUnits: true, rawPercentages: true });
            if (!e3 || !t.isTokenNode(e3) || !a.isTokenNumeric(e3.value)) return false;
            Number.isNaN(e3.value[4].value) && (e3.value[4].value = 0), N2 = e3;
          }
          if (s2 || i2 || !t.isTokenNode(N2) || !a.isTokenIdent(N2.value) || "from" !== toLowerCaseAZ(N2.value[4].value)) {
            if (!s2) return false;
            if (i2) return false;
            if (t.isTokenNode(N2)) {
              if (a.isTokenIdent(N2.value) && "alpha" === toLowerCaseAZ(N2.value[4].value) && n2 && n2.has("alpha")) {
                c2.alpha = n2.get("alpha")[4].value, i2 = true;
                continue;
              }
              const e3 = normalize_Color_ChannelValues(N2.value, 3, c2);
              if (!e3 || !a.isTokenNumber(e3)) return false;
              c2.alpha = new t.TokenNode(e3), i2 = true;
              continue;
            }
            if (t.isFunctionNode(N2)) {
              const e3 = t.replaceComponentValues([[N2]], (e4) => {
                if (t.isTokenNode(e4) && a.isTokenIdent(e4.value) && "alpha" === toLowerCaseAZ(e4.value[4].value) && n2 && n2.has("alpha")) return new t.TokenNode(n2.get("alpha"));
              });
              c2.alpha = e3[0][0], i2 = true;
              continue;
            }
            return false;
          }
          if (u2) return false;
          for (; t.isWhitespaceNode(e2.value[p2 + 1]) || t.isCommentNode(e2.value[p2 + 1]); ) p2++;
          if (p2++, N2 = e2.value[p2], u2 = o2(N2), false === u2) return false;
          n2 = normalizeRelativeColorDataChannels(u2), l2 = noneToZeroInRelativeColorDataChannels(n2), c2.syntaxFlags = new Set(u2.syntaxFlags), c2.syntaxFlags.add(exports$1.SyntaxFlag.RelativeAlphaSyntax), c2.channels = [...u2.channels], c2.colorNotation = u2.colorNotation, c2.alpha = u2.alpha;
        }
      }
      return !!n2 && c2;
    }
    function XYZ_D50_to_P3_Gamut(e2) {
      const o2 = n.XYZ_D50_to_P3(e2);
      if (n.inGamut(o2)) return n.clip(o2);
      let a2 = e2;
      return a2 = n.XYZ_D50_to_OKLCH(a2), a2[0] < 1e-6 && (a2 = [0, 0, 0]), a2[0] > 0.999999 && (a2 = [1, 0, 0]), n.gam_P3(n.mapGamutRayTrace(a2, oklch_to_lin_p3, lin_p3_to_oklch));
    }
    function oklch_to_lin_p3(e2) {
      return e2 = n.OKLCH_to_OKLab(e2), e2 = n.OKLab_to_XYZ(e2), n.XYZ_to_lin_P3(e2);
    }
    function lin_p3_to_oklch(e2) {
      return e2 = n.lin_P3_to_XYZ(e2), e2 = n.XYZ_to_OKLab(e2), n.OKLab_to_OKLCH(e2);
    }
    function toPrecision(e2, o2 = 7) {
      e2 = +e2, o2 = +o2;
      const a2 = (Math.floor(Math.abs(e2)) + "").length;
      if (o2 > a2) return +e2.toFixed(o2 - a2);
      {
        const n2 = 10 ** (a2 - o2);
        return Math.round(e2 / n2) * n2;
      }
    }
    function serializeWithAlpha(e2, o2, n2, r2) {
      const l2 = [a.TokenType.CloseParen, ")", -1, -1, void 0];
      if ("number" == typeof e2.alpha) {
        const s2 = Math.min(1, Math.max(0, toPrecision(Number.isNaN(e2.alpha) ? 0 : e2.alpha)));
        return 1 === toPrecision(s2, 4) ? new t.FunctionNode(o2, l2, r2) : new t.FunctionNode(o2, l2, [...r2, new t.WhitespaceNode([n2]), new t.TokenNode([a.TokenType.Delim, "/", -1, -1, { value: "/" }]), new t.WhitespaceNode([n2]), new t.TokenNode([a.TokenType.Number, toPrecision(s2, 4).toString(), -1, -1, { value: e2.alpha, type: a.NumberType.Integer }])]);
      }
      return new t.FunctionNode(o2, l2, [...r2, new t.WhitespaceNode([n2]), new t.TokenNode([a.TokenType.Delim, "/", -1, -1, { value: "/" }]), new t.WhitespaceNode([n2]), e2.alpha]);
    }
    exports$1.color = function color(e2) {
      if (t.isFunctionNode(e2)) {
        switch (toLowerCaseAZ(e2.getName())) {
          case "rgb":
          case "rgba":
            return rgb(e2, color);
          case "hsl":
          case "hsla":
            return hsl(e2, color);
          case "hwb":
            return o2 = color, threeChannelSpaceSeparated(e2, normalize_HWB_ChannelValues, exports$1.ColorNotation.HWB, [], o2);
          case "lab":
            return lab(e2, color);
          case "lch":
            return lch(e2, color);
          case "oklab":
            return oklab(e2, color);
          case "oklch":
            return oklch(e2, color);
          case "color":
            return color$1(e2, color);
          case "color-mix":
            return colorMix(e2, color);
          case "contrast-color":
            return contrastColor(e2, color);
          case "alpha":
            return alpha(e2, color);
        }
      }
      var o2;
      if (t.isTokenNode(e2)) {
        if (a.isTokenHash(e2.value)) return hex(e2.value);
        if (a.isTokenIdent(e2.value)) {
          const o3 = namedColor(e2.value[4].value);
          return false !== o3 ? o3 : "transparent" === toLowerCaseAZ(e2.value[4].value) && { colorNotation: exports$1.ColorNotation.RGB, channels: [0, 0, 0], alpha: 0, syntaxFlags: /* @__PURE__ */ new Set([exports$1.SyntaxFlag.ColorKeyword]) };
        }
      }
      return false;
    }, exports$1.colorDataFitsDisplayP3_Gamut = function colorDataFitsDisplayP3_Gamut(e2) {
      const o2 = { ...e2, channels: [...e2.channels] };
      return o2.channels = convertPowerlessComponentsToZeroValuesForDisplay(o2.channels, o2.colorNotation), !colorDataTo(o2, exports$1.ColorNotation.Display_P3).channels.find((e3) => e3 < -1e-5 || e3 > 1.00001);
    }, exports$1.colorDataFitsRGB_Gamut = function colorDataFitsRGB_Gamut(e2) {
      const o2 = { ...e2, channels: [...e2.channels] };
      return o2.channels = convertPowerlessComponentsToZeroValuesForDisplay(o2.channels, o2.colorNotation), !colorDataTo(o2, exports$1.ColorNotation.RGB).channels.find((e3) => e3 < -1e-5 || e3 > 1.00001);
    }, exports$1.serializeHSL = function serializeHSL(e2, o2 = true) {
      e2.channels = convertPowerlessComponentsToZeroValuesForDisplay(e2.channels, e2.colorNotation);
      let r2 = e2.channels.map((e3) => Number.isNaN(e3) ? 0 : e3);
      r2 = o2 ? n.XYZ_D50_to_HSL(n.sRGB_to_XYZ_D50(XYZ_D50_to_sRGB_Gamut(colorData_to_XYZ_D50(e2).channels))) : n.XYZ_D50_to_HSL(colorData_to_XYZ_D50(e2).channels), r2 = r2.map((e3) => Number.isNaN(e3) ? 0 : e3);
      const l2 = Math.min(360, Math.max(0, Math.round(toPrecision(r2[0])))), s2 = Math.min(100, Math.max(0, Math.round(toPrecision(r2[1])))), i2 = Math.min(100, Math.max(0, Math.round(toPrecision(r2[2])))), u2 = [a.TokenType.CloseParen, ")", -1, -1, void 0], c2 = [a.TokenType.Whitespace, " ", -1, -1, void 0], p2 = [a.TokenType.Comma, ",", -1, -1, void 0], N2 = [new t.TokenNode([a.TokenType.Number, l2.toString(), -1, -1, { value: r2[0], type: a.NumberType.Integer }]), new t.TokenNode(p2), new t.WhitespaceNode([c2]), new t.TokenNode([a.TokenType.Percentage, s2.toString() + "%", -1, -1, { value: r2[1] }]), new t.TokenNode(p2), new t.WhitespaceNode([c2]), new t.TokenNode([a.TokenType.Percentage, i2.toString() + "%", -1, -1, { value: r2[2] }])];
      if ("number" == typeof e2.alpha) {
        const o3 = Math.min(1, Math.max(0, toPrecision(Number.isNaN(e2.alpha) ? 0 : e2.alpha)));
        return 1 === toPrecision(o3, 4) ? new t.FunctionNode([a.TokenType.Function, "hsl(", -1, -1, { value: "hsl" }], u2, N2) : new t.FunctionNode([a.TokenType.Function, "hsla(", -1, -1, { value: "hsla" }], u2, [...N2, new t.TokenNode(p2), new t.WhitespaceNode([c2]), new t.TokenNode([a.TokenType.Number, toPrecision(o3, 4).toString(), -1, -1, { value: e2.alpha, type: a.NumberType.Number }])]);
      }
      return new t.FunctionNode([a.TokenType.Function, "hsla(", -1, -1, { value: "hsla" }], u2, [...N2, new t.TokenNode(p2), new t.WhitespaceNode([c2]), e2.alpha]);
    }, exports$1.serializeOKLCH = function serializeOKLCH(e2) {
      e2.channels = convertPowerlessComponentsToZeroValuesForDisplay(e2.channels, e2.colorNotation);
      let o2 = e2.channels.map((e3) => Number.isNaN(e3) ? 0 : e3);
      e2.colorNotation !== exports$1.ColorNotation.OKLCH && (o2 = n.XYZ_D50_to_OKLCH(colorData_to_XYZ_D50(e2).channels));
      const r2 = toPrecision(o2[0], 6), l2 = toPrecision(o2[1], 6), s2 = toPrecision(o2[2], 6), i2 = [a.TokenType.Function, "oklch(", -1, -1, { value: "oklch" }], u2 = [a.TokenType.Whitespace, " ", -1, -1, void 0];
      return serializeWithAlpha(e2, i2, u2, [new t.TokenNode([a.TokenType.Number, r2.toString(), -1, -1, { value: o2[0], type: a.NumberType.Number }]), new t.WhitespaceNode([u2]), new t.TokenNode([a.TokenType.Number, l2.toString(), -1, -1, { value: o2[1], type: a.NumberType.Number }]), new t.WhitespaceNode([u2]), new t.TokenNode([a.TokenType.Number, s2.toString(), -1, -1, { value: o2[2], type: a.NumberType.Number }])]);
    }, exports$1.serializeP3 = function serializeP3(e2, o2 = true) {
      e2.channels = convertPowerlessComponentsToZeroValuesForDisplay(e2.channels, e2.colorNotation);
      let r2 = e2.channels.map((e3) => Number.isNaN(e3) ? 0 : e3);
      o2 ? r2 = XYZ_D50_to_P3_Gamut(colorData_to_XYZ_D50(e2).channels) : e2.colorNotation !== exports$1.ColorNotation.Display_P3 && (r2 = n.XYZ_D50_to_P3(colorData_to_XYZ_D50(e2).channels));
      const l2 = o2 ? Math.min(1, Math.max(0, toPrecision(r2[0], 6))) : toPrecision(r2[0], 6), s2 = o2 ? Math.min(1, Math.max(0, toPrecision(r2[1], 6))) : toPrecision(r2[1], 6), i2 = o2 ? Math.min(1, Math.max(0, toPrecision(r2[2], 6))) : toPrecision(r2[2], 6), u2 = [a.TokenType.Function, "color(", -1, -1, { value: "color" }], c2 = [a.TokenType.Whitespace, " ", -1, -1, void 0];
      return serializeWithAlpha(e2, u2, c2, [new t.TokenNode([a.TokenType.Ident, "display-p3", -1, -1, { value: "display-p3" }]), new t.WhitespaceNode([c2]), new t.TokenNode([a.TokenType.Number, l2.toString(), -1, -1, { value: r2[0], type: a.NumberType.Number }]), new t.WhitespaceNode([c2]), new t.TokenNode([a.TokenType.Number, s2.toString(), -1, -1, { value: r2[1], type: a.NumberType.Number }]), new t.WhitespaceNode([c2]), new t.TokenNode([a.TokenType.Number, i2.toString(), -1, -1, { value: r2[2], type: a.NumberType.Number }])]);
    }, exports$1.serializeRGB = function serializeRGB(e2, o2 = true) {
      e2.channels = convertPowerlessComponentsToZeroValuesForDisplay(e2.channels, e2.colorNotation);
      let r2 = e2.channels.map((e3) => Number.isNaN(e3) ? 0 : e3);
      r2 = o2 ? XYZ_D50_to_sRGB_Gamut(colorData_to_XYZ_D50(e2).channels) : n.XYZ_D50_to_sRGB(colorData_to_XYZ_D50(e2).channels);
      const l2 = Math.min(255, Math.max(0, Math.round(255 * toPrecision(r2[0])))), s2 = Math.min(255, Math.max(0, Math.round(255 * toPrecision(r2[1])))), i2 = Math.min(255, Math.max(0, Math.round(255 * toPrecision(r2[2])))), u2 = [a.TokenType.CloseParen, ")", -1, -1, void 0], c2 = [a.TokenType.Whitespace, " ", -1, -1, void 0], p2 = [a.TokenType.Comma, ",", -1, -1, void 0], N2 = [new t.TokenNode([a.TokenType.Number, l2.toString(), -1, -1, { value: Math.min(255, 255 * Math.max(0, r2[0])), type: a.NumberType.Integer }]), new t.TokenNode(p2), new t.WhitespaceNode([c2]), new t.TokenNode([a.TokenType.Number, s2.toString(), -1, -1, { value: Math.min(255, 255 * Math.max(0, r2[1])), type: a.NumberType.Integer }]), new t.TokenNode(p2), new t.WhitespaceNode([c2]), new t.TokenNode([a.TokenType.Number, i2.toString(), -1, -1, { value: Math.min(255, 255 * Math.max(0, r2[2])), type: a.NumberType.Integer }])];
      if ("number" == typeof e2.alpha) {
        const o3 = Math.min(1, Math.max(0, toPrecision(Number.isNaN(e2.alpha) ? 0 : e2.alpha)));
        return 1 === toPrecision(o3, 4) ? new t.FunctionNode([a.TokenType.Function, "rgb(", -1, -1, { value: "rgb" }], u2, N2) : new t.FunctionNode([a.TokenType.Function, "rgba(", -1, -1, { value: "rgba" }], u2, [...N2, new t.TokenNode(p2), new t.WhitespaceNode([c2]), new t.TokenNode([a.TokenType.Number, toPrecision(o3, 4).toString(), -1, -1, { value: e2.alpha, type: a.NumberType.Number }])]);
      }
      return new t.FunctionNode([a.TokenType.Function, "rgba(", -1, -1, { value: "rgba" }], u2, [...N2, new t.TokenNode(p2), new t.WhitespaceNode([c2]), e2.alpha]);
    };
  })(dist);
  return dist;
}
export {
  requireDist as r
};
