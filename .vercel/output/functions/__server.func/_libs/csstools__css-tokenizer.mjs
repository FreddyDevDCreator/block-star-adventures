var dist = {};
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  (function(exports$1) {
    class ParseError extends Error {
      sourceStart;
      sourceEnd;
      parserState;
      constructor(e2, n2, o2, t2) {
        super(e2), this.name = "ParseError", this.sourceStart = n2, this.sourceEnd = o2, this.parserState = t2;
      }
    }
    class ParseErrorWithToken extends ParseError {
      token;
      constructor(e2, n2, o2, t2, r2) {
        super(e2, n2, o2, t2), this.token = r2;
      }
    }
    const e = { UnexpectedNewLineInString: "Unexpected newline while consuming a string token.", UnexpectedEOFInString: "Unexpected EOF while consuming a string token.", UnexpectedEOFInComment: "Unexpected EOF while consuming a comment.", UnexpectedEOFInURL: "Unexpected EOF while consuming a url token.", UnexpectedEOFInEscapedCodePoint: "Unexpected EOF while consuming an escaped code point.", UnexpectedCharacterInURL: "Unexpected character while consuming a url token.", InvalidEscapeSequenceInURL: "Invalid escape sequence while consuming a url token.", InvalidEscapeSequenceAfterBackslash: 'Invalid escape sequence after "\\"' }, n = "undefined" != typeof globalThis && "structuredClone" in globalThis;
    const o = 13, t = 45, r = 10, s = 43, i = 65533;
    function checkIfFourCodePointsWouldStartCDO(e2) {
      return 60 === e2.source.codePointAt(e2.cursor) && 33 === e2.source.codePointAt(e2.cursor + 1) && e2.source.codePointAt(e2.cursor + 2) === t && e2.source.codePointAt(e2.cursor + 3) === t;
    }
    function isDigitCodePoint(e2) {
      return e2 >= 48 && e2 <= 57;
    }
    function isUppercaseLetterCodePoint(e2) {
      return e2 >= 65 && e2 <= 90;
    }
    function isLowercaseLetterCodePoint(e2) {
      return e2 >= 97 && e2 <= 122;
    }
    function isHexDigitCodePoint(e2) {
      return e2 >= 48 && e2 <= 57 || e2 >= 97 && e2 <= 102 || e2 >= 65 && e2 <= 70;
    }
    function isLetterCodePoint(e2) {
      return isLowercaseLetterCodePoint(e2) || isUppercaseLetterCodePoint(e2);
    }
    function isIdentStartCodePoint(e2) {
      return isLetterCodePoint(e2) || isNonASCII_IdentCodePoint(e2) || 95 === e2;
    }
    function isIdentCodePoint(e2) {
      return isIdentStartCodePoint(e2) || isDigitCodePoint(e2) || e2 === t;
    }
    function isNonASCII_IdentCodePoint(e2) {
      return 183 === e2 || 8204 === e2 || 8205 === e2 || 8255 === e2 || 8256 === e2 || 8204 === e2 || (192 <= e2 && e2 <= 214 || 216 <= e2 && e2 <= 246 || 248 <= e2 && e2 <= 893 || 895 <= e2 && e2 <= 8191 || 8304 <= e2 && e2 <= 8591 || 11264 <= e2 && e2 <= 12271 || 12289 <= e2 && e2 <= 55295 || 63744 <= e2 && e2 <= 64975 || 65008 <= e2 && e2 <= 65533 || (0 === e2 || (!!isSurrogate(e2) || e2 >= 65536)));
    }
    function isNewLine(e2) {
      return e2 === r || e2 === o || 12 === e2;
    }
    function isWhitespace(e2) {
      return 32 === e2 || e2 === r || 9 === e2 || e2 === o || 12 === e2;
    }
    function isSurrogate(e2) {
      return e2 >= 55296 && e2 <= 57343;
    }
    function checkIfTwoCodePointsAreAValidEscape(e2) {
      return 92 === e2.source.codePointAt(e2.cursor) && !isNewLine(e2.source.codePointAt(e2.cursor + 1) ?? -1);
    }
    function checkIfThreeCodePointsWouldStartAnIdentSequence(e2, n2) {
      return n2.source.codePointAt(n2.cursor) === t ? n2.source.codePointAt(n2.cursor + 1) === t || (!!isIdentStartCodePoint(n2.source.codePointAt(n2.cursor + 1) ?? -1) || 92 === n2.source.codePointAt(n2.cursor + 1) && !isNewLine(n2.source.codePointAt(n2.cursor + 2) ?? -1)) : !!isIdentStartCodePoint(n2.source.codePointAt(n2.cursor) ?? -1) || checkIfTwoCodePointsAreAValidEscape(n2);
    }
    function checkIfThreeCodePointsWouldStartANumber(e2) {
      return e2.source.codePointAt(e2.cursor) === s || e2.source.codePointAt(e2.cursor) === t ? !!isDigitCodePoint(e2.source.codePointAt(e2.cursor + 1) ?? -1) || 46 === e2.source.codePointAt(e2.cursor + 1) && isDigitCodePoint(e2.source.codePointAt(e2.cursor + 2) ?? -1) : 46 === e2.source.codePointAt(e2.cursor) ? isDigitCodePoint(e2.source.codePointAt(e2.cursor + 1) ?? -1) : isDigitCodePoint(e2.source.codePointAt(e2.cursor) ?? -1);
    }
    function checkIfTwoCodePointsStartAComment(e2) {
      return 47 === e2.source.codePointAt(e2.cursor) && 42 === e2.source.codePointAt(e2.cursor + 1);
    }
    function checkIfThreeCodePointsWouldStartCDC(e2) {
      return e2.source.codePointAt(e2.cursor) === t && e2.source.codePointAt(e2.cursor + 1) === t && 62 === e2.source.codePointAt(e2.cursor + 2);
    }
    var c, a, u;
    function consumeComment(n2, o2) {
      for (o2.advanceCodePoint(2); ; ) {
        const t2 = o2.readCodePoint();
        if (void 0 === t2) {
          const t3 = [exports$1.TokenType.Comment, o2.source.slice(o2.representationStart, o2.representationEnd + 1), o2.representationStart, o2.representationEnd, void 0];
          return n2.onParseError(new ParseErrorWithToken(e.UnexpectedEOFInComment, o2.representationStart, o2.representationEnd, ["4.3.2. Consume comments", "Unexpected EOF"], t3)), t3;
        }
        if (42 === t2 && (void 0 !== o2.source.codePointAt(o2.cursor) && 47 === o2.source.codePointAt(o2.cursor))) {
          o2.advanceCodePoint();
          break;
        }
      }
      return [exports$1.TokenType.Comment, o2.source.slice(o2.representationStart, o2.representationEnd + 1), o2.representationStart, o2.representationEnd, void 0];
    }
    function consumeEscapedCodePoint(n2, t2) {
      const s2 = t2.readCodePoint();
      if (void 0 === s2) return n2.onParseError(new ParseError(e.UnexpectedEOFInEscapedCodePoint, t2.representationStart, t2.representationEnd, ["4.3.7. Consume an escaped code point", "Unexpected EOF"])), i;
      if (isHexDigitCodePoint(s2)) {
        const e2 = [s2];
        let n3;
        for (; void 0 !== (n3 = t2.source.codePointAt(t2.cursor)) && isHexDigitCodePoint(n3) && e2.length < 6; ) e2.push(n3), t2.advanceCodePoint();
        isWhitespace(t2.source.codePointAt(t2.cursor) ?? -1) && (t2.source.codePointAt(t2.cursor) === o && t2.source.codePointAt(t2.cursor + 1) === r && t2.advanceCodePoint(), t2.advanceCodePoint());
        const c2 = parseInt(String.fromCodePoint(...e2), 16);
        return 0 === c2 || isSurrogate(c2) || c2 > 1114111 ? i : c2;
      }
      return 0 === s2 || isSurrogate(s2) ? i : s2;
    }
    function consumeIdentSequence(e2, n2) {
      const o2 = [];
      for (; ; ) {
        const t2 = n2.source.codePointAt(n2.cursor) ?? -1;
        if (0 === t2 || isSurrogate(t2)) o2.push(i), n2.advanceCodePoint(+(t2 > 65535) + 1);
        else if (isIdentCodePoint(t2)) o2.push(t2), n2.advanceCodePoint(+(t2 > 65535) + 1);
        else {
          if (!checkIfTwoCodePointsAreAValidEscape(n2)) return o2;
          n2.advanceCodePoint(), o2.push(consumeEscapedCodePoint(e2, n2));
        }
      }
    }
    function consumeHashToken(e2, n2) {
      n2.advanceCodePoint();
      const o2 = n2.source.codePointAt(n2.cursor);
      if (void 0 !== o2 && (isIdentCodePoint(o2) || checkIfTwoCodePointsAreAValidEscape(n2))) {
        let o3 = exports$1.HashType.Unrestricted;
        checkIfThreeCodePointsWouldStartAnIdentSequence(0, n2) && (o3 = exports$1.HashType.ID);
        const t2 = consumeIdentSequence(e2, n2);
        return [exports$1.TokenType.Hash, n2.source.slice(n2.representationStart, n2.representationEnd + 1), n2.representationStart, n2.representationEnd, { value: String.fromCodePoint(...t2), type: o3 }];
      }
      return [exports$1.TokenType.Delim, "#", n2.representationStart, n2.representationEnd, { value: "#" }];
    }
    function consumeNumber(e2, n2) {
      let o2 = exports$1.NumberType.Integer;
      for (n2.source.codePointAt(n2.cursor) !== s && n2.source.codePointAt(n2.cursor) !== t || n2.advanceCodePoint(); isDigitCodePoint(n2.source.codePointAt(n2.cursor) ?? -1); ) n2.advanceCodePoint();
      if (46 === n2.source.codePointAt(n2.cursor) && isDigitCodePoint(n2.source.codePointAt(n2.cursor + 1) ?? -1)) for (n2.advanceCodePoint(2), o2 = exports$1.NumberType.Number; isDigitCodePoint(n2.source.codePointAt(n2.cursor) ?? -1); ) n2.advanceCodePoint();
      if (101 === n2.source.codePointAt(n2.cursor) || 69 === n2.source.codePointAt(n2.cursor)) {
        if (isDigitCodePoint(n2.source.codePointAt(n2.cursor + 1) ?? -1)) n2.advanceCodePoint(2);
        else {
          if (n2.source.codePointAt(n2.cursor + 1) !== t && n2.source.codePointAt(n2.cursor + 1) !== s || !isDigitCodePoint(n2.source.codePointAt(n2.cursor + 2) ?? -1)) return o2;
          n2.advanceCodePoint(3);
        }
        for (o2 = exports$1.NumberType.Number; isDigitCodePoint(n2.source.codePointAt(n2.cursor) ?? -1); ) n2.advanceCodePoint();
      }
      return o2;
    }
    function consumeNumericToken(e2, n2) {
      let o2;
      {
        const e3 = n2.source.codePointAt(n2.cursor);
        e3 === t ? o2 = "-" : e3 === s && (o2 = "+");
      }
      const r2 = consumeNumber(0, n2), i2 = parseFloat(n2.source.slice(n2.representationStart, n2.representationEnd + 1));
      if (checkIfThreeCodePointsWouldStartAnIdentSequence(0, n2)) {
        const t2 = consumeIdentSequence(e2, n2);
        return [exports$1.TokenType.Dimension, n2.source.slice(n2.representationStart, n2.representationEnd + 1), n2.representationStart, n2.representationEnd, { value: i2, signCharacter: o2, type: r2, unit: String.fromCodePoint(...t2) }];
      }
      return 37 === n2.source.codePointAt(n2.cursor) ? (n2.advanceCodePoint(), [exports$1.TokenType.Percentage, n2.source.slice(n2.representationStart, n2.representationEnd + 1), n2.representationStart, n2.representationEnd, { value: i2, signCharacter: o2 }]) : [exports$1.TokenType.Number, n2.source.slice(n2.representationStart, n2.representationEnd + 1), n2.representationStart, n2.representationEnd, { value: i2, signCharacter: o2, type: r2 }];
    }
    function consumeWhiteSpace(e2) {
      for (; isWhitespace(e2.source.codePointAt(e2.cursor) ?? -1); ) e2.advanceCodePoint();
      return [exports$1.TokenType.Whitespace, e2.source.slice(e2.representationStart, e2.representationEnd + 1), e2.representationStart, e2.representationEnd, void 0];
    }
    exports$1.TokenType = void 0, (c = exports$1.TokenType || (exports$1.TokenType = {})).Comment = "comment", c.AtKeyword = "at-keyword-token", c.BadString = "bad-string-token", c.BadURL = "bad-url-token", c.CDC = "CDC-token", c.CDO = "CDO-token", c.Colon = "colon-token", c.Comma = "comma-token", c.Delim = "delim-token", c.Dimension = "dimension-token", c.EOF = "EOF-token", c.Function = "function-token", c.Hash = "hash-token", c.Ident = "ident-token", c.Number = "number-token", c.Percentage = "percentage-token", c.Semicolon = "semicolon-token", c.String = "string-token", c.URL = "url-token", c.Whitespace = "whitespace-token", c.OpenParen = "(-token", c.CloseParen = ")-token", c.OpenSquare = "[-token", c.CloseSquare = "]-token", c.OpenCurly = "{-token", c.CloseCurly = "}-token", c.UnicodeRange = "unicode-range-token", exports$1.NumberType = void 0, (a = exports$1.NumberType || (exports$1.NumberType = {})).Integer = "integer", a.Number = "number", exports$1.HashType = void 0, (u = exports$1.HashType || (exports$1.HashType = {})).Unrestricted = "unrestricted", u.ID = "id";
    class Reader {
      cursor = 0;
      source = "";
      representationStart = 0;
      representationEnd = -1;
      constructor(e2) {
        this.source = e2;
      }
      advanceCodePoint(e2 = 1) {
        this.cursor = this.cursor + e2, this.representationEnd = this.cursor - 1;
      }
      readCodePoint() {
        const e2 = this.source.codePointAt(this.cursor);
        if (void 0 !== e2) return this.cursor = this.cursor + 1, this.representationEnd = this.cursor - 1, e2;
      }
      unreadCodePoint(e2 = 1) {
        this.cursor = this.cursor - e2, this.representationEnd = this.cursor - 1;
      }
      resetRepresentation() {
        this.representationStart = this.cursor, this.representationEnd = -1;
      }
    }
    function consumeStringToken(n2, t2) {
      let s2 = "";
      const c2 = t2.readCodePoint();
      for (; ; ) {
        const a2 = t2.readCodePoint();
        if (void 0 === a2) {
          const o2 = [exports$1.TokenType.String, t2.source.slice(t2.representationStart, t2.representationEnd + 1), t2.representationStart, t2.representationEnd, { value: s2 }];
          return n2.onParseError(new ParseErrorWithToken(e.UnexpectedEOFInString, t2.representationStart, t2.representationEnd, ["4.3.5. Consume a string token", "Unexpected EOF"], o2)), o2;
        }
        if (isNewLine(a2)) {
          t2.unreadCodePoint();
          const s3 = [exports$1.TokenType.BadString, t2.source.slice(t2.representationStart, t2.representationEnd + 1), t2.representationStart, t2.representationEnd, void 0];
          return n2.onParseError(new ParseErrorWithToken(e.UnexpectedNewLineInString, t2.representationStart, t2.source.codePointAt(t2.cursor) === o && t2.source.codePointAt(t2.cursor + 1) === r ? t2.representationEnd + 2 : t2.representationEnd + 1, ["4.3.5. Consume a string token", "Unexpected newline"], s3)), s3;
        }
        if (a2 === c2) return [exports$1.TokenType.String, t2.source.slice(t2.representationStart, t2.representationEnd + 1), t2.representationStart, t2.representationEnd, { value: s2 }];
        if (92 !== a2) 0 === a2 || isSurrogate(a2) ? s2 += String.fromCodePoint(i) : s2 += String.fromCodePoint(a2);
        else {
          if (void 0 === t2.source.codePointAt(t2.cursor)) continue;
          if (isNewLine(t2.source.codePointAt(t2.cursor) ?? -1)) {
            t2.source.codePointAt(t2.cursor) === o && t2.source.codePointAt(t2.cursor + 1) === r && t2.advanceCodePoint(), t2.advanceCodePoint();
            continue;
          }
          s2 += String.fromCodePoint(consumeEscapedCodePoint(n2, t2));
        }
      }
    }
    function checkIfCodePointsMatchURLIdent(e2) {
      return !(3 !== e2.length || 117 !== e2[0] && 85 !== e2[0] || 114 !== e2[1] && 82 !== e2[1] || 108 !== e2[2] && 76 !== e2[2]);
    }
    function consumeBadURL(e2, n2) {
      for (; ; ) {
        const o2 = n2.source.codePointAt(n2.cursor);
        if (void 0 === o2) return;
        if (41 === o2) return void n2.advanceCodePoint();
        checkIfTwoCodePointsAreAValidEscape(n2) ? (n2.advanceCodePoint(), consumeEscapedCodePoint(e2, n2)) : n2.advanceCodePoint();
      }
    }
    function consumeUrlToken(n2, o2) {
      for (; isWhitespace(o2.source.codePointAt(o2.cursor) ?? -1); ) o2.advanceCodePoint();
      let t2 = "";
      for (; ; ) {
        if (void 0 === o2.source.codePointAt(o2.cursor)) {
          const r3 = [exports$1.TokenType.URL, o2.source.slice(o2.representationStart, o2.representationEnd + 1), o2.representationStart, o2.representationEnd, { value: t2 }];
          return n2.onParseError(new ParseErrorWithToken(e.UnexpectedEOFInURL, o2.representationStart, o2.representationEnd, ["4.3.6. Consume a url token", "Unexpected EOF"], r3)), r3;
        }
        if (41 === o2.source.codePointAt(o2.cursor)) return o2.advanceCodePoint(), [exports$1.TokenType.URL, o2.source.slice(o2.representationStart, o2.representationEnd + 1), o2.representationStart, o2.representationEnd, { value: t2 }];
        if (isWhitespace(o2.source.codePointAt(o2.cursor) ?? -1)) {
          for (o2.advanceCodePoint(); isWhitespace(o2.source.codePointAt(o2.cursor) ?? -1); ) o2.advanceCodePoint();
          if (void 0 === o2.source.codePointAt(o2.cursor)) {
            const r3 = [exports$1.TokenType.URL, o2.source.slice(o2.representationStart, o2.representationEnd + 1), o2.representationStart, o2.representationEnd, { value: t2 }];
            return n2.onParseError(new ParseErrorWithToken(e.UnexpectedEOFInURL, o2.representationStart, o2.representationEnd, ["4.3.6. Consume a url token", "Consume as much whitespace as possible", "Unexpected EOF"], r3)), r3;
          }
          return 41 === o2.source.codePointAt(o2.cursor) ? (o2.advanceCodePoint(), [exports$1.TokenType.URL, o2.source.slice(o2.representationStart, o2.representationEnd + 1), o2.representationStart, o2.representationEnd, { value: t2 }]) : (consumeBadURL(n2, o2), [exports$1.TokenType.BadURL, o2.source.slice(o2.representationStart, o2.representationEnd + 1), o2.representationStart, o2.representationEnd, void 0]);
        }
        const s2 = o2.source.codePointAt(o2.cursor);
        if (34 === s2 || 39 === s2 || 40 === s2 || (11 === (r2 = s2 ?? -1) || 127 === r2 || 0 <= r2 && r2 <= 8 || 14 <= r2 && r2 <= 31)) {
          consumeBadURL(n2, o2);
          const t3 = [exports$1.TokenType.BadURL, o2.source.slice(o2.representationStart, o2.representationEnd + 1), o2.representationStart, o2.representationEnd, void 0];
          return n2.onParseError(new ParseErrorWithToken(e.UnexpectedCharacterInURL, o2.representationStart, o2.representationEnd, ["4.3.6. Consume a url token", `Unexpected U+0022 QUOTATION MARK ("), U+0027 APOSTROPHE ('), U+0028 LEFT PARENTHESIS (() or non-printable code point`], t3)), t3;
        }
        if (92 === s2) {
          if (checkIfTwoCodePointsAreAValidEscape(o2)) {
            o2.advanceCodePoint(), t2 += String.fromCodePoint(consumeEscapedCodePoint(n2, o2));
            continue;
          }
          consumeBadURL(n2, o2);
          const r3 = [exports$1.TokenType.BadURL, o2.source.slice(o2.representationStart, o2.representationEnd + 1), o2.representationStart, o2.representationEnd, void 0];
          return n2.onParseError(new ParseErrorWithToken(e.InvalidEscapeSequenceInURL, o2.representationStart, o2.representationEnd, ["4.3.6. Consume a url token", "U+005C REVERSE SOLIDUS (\\)", "The input stream does not start with a valid escape sequence"], r3)), r3;
        }
        0 === o2.source.codePointAt(o2.cursor) || isSurrogate(o2.source.codePointAt(o2.cursor) ?? -1) ? (t2 += String.fromCodePoint(i), o2.advanceCodePoint()) : (t2 += o2.source[o2.cursor], o2.advanceCodePoint());
      }
      var r2;
    }
    function consumeIdentLikeToken(e2, n2) {
      const o2 = consumeIdentSequence(e2, n2);
      if (40 !== n2.source.codePointAt(n2.cursor)) return [exports$1.TokenType.Ident, n2.source.slice(n2.representationStart, n2.representationEnd + 1), n2.representationStart, n2.representationEnd, { value: String.fromCodePoint(...o2) }];
      if (checkIfCodePointsMatchURLIdent(o2)) {
        n2.advanceCodePoint();
        let t2 = 0;
        for (; ; ) {
          const e3 = isWhitespace(n2.source.codePointAt(n2.cursor) ?? -1), r2 = isWhitespace(n2.source.codePointAt(n2.cursor + 1) ?? -1);
          if (e3 && r2) {
            t2 += 1, n2.advanceCodePoint(1);
            continue;
          }
          const s2 = e3 ? n2.source.codePointAt(n2.cursor + 1) : n2.source.codePointAt(n2.cursor);
          if (34 === s2 || 39 === s2) return t2 > 0 && n2.unreadCodePoint(t2), [exports$1.TokenType.Function, n2.source.slice(n2.representationStart, n2.representationEnd + 1), n2.representationStart, n2.representationEnd, { value: String.fromCodePoint(...o2) }];
          break;
        }
        return consumeUrlToken(e2, n2);
      }
      return n2.advanceCodePoint(), [exports$1.TokenType.Function, n2.source.slice(n2.representationStart, n2.representationEnd + 1), n2.representationStart, n2.representationEnd, { value: String.fromCodePoint(...o2) }];
    }
    function checkIfThreeCodePointsWouldStartAUnicodeRange(e2) {
      return !(117 !== e2.source.codePointAt(e2.cursor) && 85 !== e2.source.codePointAt(e2.cursor) || e2.source.codePointAt(e2.cursor + 1) !== s || 63 !== e2.source.codePointAt(e2.cursor + 2) && !isHexDigitCodePoint(e2.source.codePointAt(e2.cursor + 2) ?? -1));
    }
    function consumeUnicodeRangeToken(e2, n2) {
      n2.advanceCodePoint(2);
      const o2 = [], r2 = [];
      let s2;
      for (; void 0 !== (s2 = n2.source.codePointAt(n2.cursor)) && o2.length < 6 && isHexDigitCodePoint(s2); ) o2.push(s2), n2.advanceCodePoint();
      for (; void 0 !== (s2 = n2.source.codePointAt(n2.cursor)) && o2.length < 6 && 63 === s2; ) 0 === r2.length && r2.push(...o2), o2.push(48), r2.push(70), n2.advanceCodePoint();
      if (!r2.length && n2.source.codePointAt(n2.cursor) === t && isHexDigitCodePoint(n2.source.codePointAt(n2.cursor + 1) ?? -1)) for (n2.advanceCodePoint(); void 0 !== (s2 = n2.source.codePointAt(n2.cursor)) && r2.length < 6 && isHexDigitCodePoint(s2); ) r2.push(s2), n2.advanceCodePoint();
      if (!r2.length) {
        const e3 = parseInt(String.fromCodePoint(...o2), 16);
        return [exports$1.TokenType.UnicodeRange, n2.source.slice(n2.representationStart, n2.representationEnd + 1), n2.representationStart, n2.representationEnd, { startOfRange: e3, endOfRange: e3 }];
      }
      const i2 = parseInt(String.fromCodePoint(...o2), 16), c2 = parseInt(String.fromCodePoint(...r2), 16);
      return [exports$1.TokenType.UnicodeRange, n2.source.slice(n2.representationStart, n2.representationEnd + 1), n2.representationStart, n2.representationEnd, { startOfRange: i2, endOfRange: c2 }];
    }
    function tokenizer(n2, i2) {
      const c2 = n2.css.valueOf(), a2 = n2.unicodeRangesAllowed ?? false, u2 = new Reader(c2), d2 = { onParseError: i2?.onParseError ?? noop };
      return { nextToken: function nextToken() {
        u2.resetRepresentation();
        const n3 = u2.source.codePointAt(u2.cursor);
        if (void 0 === n3) return [exports$1.TokenType.EOF, "", -1, -1, void 0];
        if (47 === n3 && checkIfTwoCodePointsStartAComment(u2)) return consumeComment(d2, u2);
        if (a2 && (117 === n3 || 85 === n3) && checkIfThreeCodePointsWouldStartAUnicodeRange(u2)) return consumeUnicodeRangeToken(0, u2);
        if (isIdentStartCodePoint(n3)) return consumeIdentLikeToken(d2, u2);
        if (isDigitCodePoint(n3)) return consumeNumericToken(d2, u2);
        switch (n3) {
          case 44:
            return u2.advanceCodePoint(), [exports$1.TokenType.Comma, ",", u2.representationStart, u2.representationEnd, void 0];
          case 58:
            return u2.advanceCodePoint(), [exports$1.TokenType.Colon, ":", u2.representationStart, u2.representationEnd, void 0];
          case 59:
            return u2.advanceCodePoint(), [exports$1.TokenType.Semicolon, ";", u2.representationStart, u2.representationEnd, void 0];
          case 40:
            return u2.advanceCodePoint(), [exports$1.TokenType.OpenParen, "(", u2.representationStart, u2.representationEnd, void 0];
          case 41:
            return u2.advanceCodePoint(), [exports$1.TokenType.CloseParen, ")", u2.representationStart, u2.representationEnd, void 0];
          case 91:
            return u2.advanceCodePoint(), [exports$1.TokenType.OpenSquare, "[", u2.representationStart, u2.representationEnd, void 0];
          case 93:
            return u2.advanceCodePoint(), [exports$1.TokenType.CloseSquare, "]", u2.representationStart, u2.representationEnd, void 0];
          case 123:
            return u2.advanceCodePoint(), [exports$1.TokenType.OpenCurly, "{", u2.representationStart, u2.representationEnd, void 0];
          case 125:
            return u2.advanceCodePoint(), [exports$1.TokenType.CloseCurly, "}", u2.representationStart, u2.representationEnd, void 0];
          case 39:
          case 34:
            return consumeStringToken(d2, u2);
          case 35:
            return consumeHashToken(d2, u2);
          case s:
          case 46:
            return checkIfThreeCodePointsWouldStartANumber(u2) ? consumeNumericToken(d2, u2) : (u2.advanceCodePoint(), [exports$1.TokenType.Delim, u2.source[u2.representationStart], u2.representationStart, u2.representationEnd, { value: u2.source[u2.representationStart] }]);
          case r:
          case o:
          case 12:
          case 9:
          case 32:
            return consumeWhiteSpace(u2);
          case t:
            return checkIfThreeCodePointsWouldStartANumber(u2) ? consumeNumericToken(d2, u2) : checkIfThreeCodePointsWouldStartCDC(u2) ? (u2.advanceCodePoint(3), [exports$1.TokenType.CDC, "-->", u2.representationStart, u2.representationEnd, void 0]) : checkIfThreeCodePointsWouldStartAnIdentSequence(0, u2) ? consumeIdentLikeToken(d2, u2) : (u2.advanceCodePoint(), [exports$1.TokenType.Delim, "-", u2.representationStart, u2.representationEnd, { value: "-" }]);
          case 60:
            return checkIfFourCodePointsWouldStartCDO(u2) ? (u2.advanceCodePoint(4), [exports$1.TokenType.CDO, "<!--", u2.representationStart, u2.representationEnd, void 0]) : (u2.advanceCodePoint(), [exports$1.TokenType.Delim, "<", u2.representationStart, u2.representationEnd, { value: "<" }]);
          case 64:
            if (u2.advanceCodePoint(), checkIfThreeCodePointsWouldStartAnIdentSequence(0, u2)) {
              const e2 = consumeIdentSequence(d2, u2);
              return [exports$1.TokenType.AtKeyword, u2.source.slice(u2.representationStart, u2.representationEnd + 1), u2.representationStart, u2.representationEnd, { value: String.fromCodePoint(...e2) }];
            }
            return [exports$1.TokenType.Delim, "@", u2.representationStart, u2.representationEnd, { value: "@" }];
          case 92: {
            if (checkIfTwoCodePointsAreAValidEscape(u2)) return consumeIdentLikeToken(d2, u2);
            u2.advanceCodePoint();
            const n4 = [exports$1.TokenType.Delim, "\\", u2.representationStart, u2.representationEnd, { value: "\\" }];
            return d2.onParseError(new ParseErrorWithToken(e.InvalidEscapeSequenceAfterBackslash, u2.representationStart, u2.representationEnd, ["4.3.1. Consume a token", "U+005C REVERSE SOLIDUS (\\)", "The input stream does not start with a valid escape sequence"], n4)), n4;
          }
        }
        return u2.advanceCodePoint(), [exports$1.TokenType.Delim, u2.source[u2.representationStart], u2.representationStart, u2.representationEnd, { value: u2.source[u2.representationStart] }];
      }, endOfFile: function endOfFile() {
        return void 0 === u2.source.codePointAt(u2.cursor);
      } };
    }
    function noop() {
    }
    function serializeIdent(e2) {
      let n2 = 0;
      if (0 === e2[0]) e2.splice(0, 1, i), n2 = 1;
      else if (e2[0] === t && e2[1] === t) n2 = 2;
      else if (e2[0] === t && e2[1]) n2 = 2, isIdentStartCodePoint(e2[1]) || (n2 += insertEscapedCodePoint(e2, 1, e2[1]));
      else {
        if (e2[0] === t && !e2[1]) return [92, e2[0]];
        isIdentStartCodePoint(e2[0]) ? n2 = 1 : (n2 = 1, n2 += insertEscapedCodePoint(e2, 0, e2[0]));
      }
      for (let o2 = n2; o2 < e2.length; o2++) 0 !== e2[o2] ? isIdentCodePoint(e2[o2]) || (o2 += insertEscapedCharacter(e2, o2, e2[o2])) : (e2.splice(o2, 1, i), o2++);
      return e2;
    }
    function insertEscapedCharacter(e2, n2, o2) {
      return e2.splice(n2, 1, 92, o2), 1;
    }
    function insertEscapedCodePoint(e2, n2, o2) {
      const t2 = o2.toString(16), r2 = [];
      for (const e3 of t2) r2.push(e3.codePointAt(0));
      return e2.splice(n2, 1, 92, ...r2, 32), 1 + r2.length;
    }
    const d = Object.values(exports$1.TokenType);
    exports$1.ParseError = ParseError, exports$1.ParseErrorMessage = e, exports$1.ParseErrorWithToken = ParseErrorWithToken, exports$1.cloneTokens = function cloneTokens(e2) {
      return n ? structuredClone(e2) : JSON.parse(JSON.stringify(e2));
    }, exports$1.isToken = function isToken(e2) {
      return !!Array.isArray(e2) && (!(e2.length < 4) && (!!d.includes(e2[0]) && ("string" == typeof e2[1] && ("number" == typeof e2[2] && "number" == typeof e2[3]))));
    }, exports$1.isTokenAtKeyword = function isTokenAtKeyword(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.AtKeyword;
    }, exports$1.isTokenBadString = function isTokenBadString(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.BadString;
    }, exports$1.isTokenBadURL = function isTokenBadURL(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.BadURL;
    }, exports$1.isTokenCDC = function isTokenCDC(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.CDC;
    }, exports$1.isTokenCDO = function isTokenCDO(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.CDO;
    }, exports$1.isTokenCloseCurly = function isTokenCloseCurly(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.CloseCurly;
    }, exports$1.isTokenCloseParen = function isTokenCloseParen(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.CloseParen;
    }, exports$1.isTokenCloseSquare = function isTokenCloseSquare(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.CloseSquare;
    }, exports$1.isTokenColon = function isTokenColon(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.Colon;
    }, exports$1.isTokenComma = function isTokenComma(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.Comma;
    }, exports$1.isTokenComment = function isTokenComment(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.Comment;
    }, exports$1.isTokenDelim = function isTokenDelim(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.Delim;
    }, exports$1.isTokenDimension = function isTokenDimension(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.Dimension;
    }, exports$1.isTokenEOF = function isTokenEOF(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.EOF;
    }, exports$1.isTokenFunction = function isTokenFunction(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.Function;
    }, exports$1.isTokenHash = function isTokenHash(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.Hash;
    }, exports$1.isTokenIdent = function isTokenIdent(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.Ident;
    }, exports$1.isTokenNumber = function isTokenNumber(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.Number;
    }, exports$1.isTokenNumeric = function isTokenNumeric(e2) {
      if (!e2) return false;
      switch (e2[0]) {
        case exports$1.TokenType.Dimension:
        case exports$1.TokenType.Number:
        case exports$1.TokenType.Percentage:
          return true;
        default:
          return false;
      }
    }, exports$1.isTokenOpenCurly = function isTokenOpenCurly(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.OpenCurly;
    }, exports$1.isTokenOpenParen = function isTokenOpenParen(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.OpenParen;
    }, exports$1.isTokenOpenSquare = function isTokenOpenSquare(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.OpenSquare;
    }, exports$1.isTokenPercentage = function isTokenPercentage(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.Percentage;
    }, exports$1.isTokenSemicolon = function isTokenSemicolon(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.Semicolon;
    }, exports$1.isTokenString = function isTokenString(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.String;
    }, exports$1.isTokenURL = function isTokenURL(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.URL;
    }, exports$1.isTokenUnicodeRange = function isTokenUnicodeRange(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.UnicodeRange;
    }, exports$1.isTokenWhiteSpaceOrComment = function isTokenWhiteSpaceOrComment(e2) {
      if (!e2) return false;
      switch (e2[0]) {
        case exports$1.TokenType.Whitespace:
        case exports$1.TokenType.Comment:
          return true;
        default:
          return false;
      }
    }, exports$1.isTokenWhitespace = function isTokenWhitespace(e2) {
      return !!e2 && e2[0] === exports$1.TokenType.Whitespace;
    }, exports$1.mirrorVariant = function mirrorVariant(e2) {
      switch (e2[0]) {
        case exports$1.TokenType.OpenParen:
          return [exports$1.TokenType.CloseParen, ")", -1, -1, void 0];
        case exports$1.TokenType.CloseParen:
          return [exports$1.TokenType.OpenParen, "(", -1, -1, void 0];
        case exports$1.TokenType.OpenCurly:
          return [exports$1.TokenType.CloseCurly, "}", -1, -1, void 0];
        case exports$1.TokenType.CloseCurly:
          return [exports$1.TokenType.OpenCurly, "{", -1, -1, void 0];
        case exports$1.TokenType.OpenSquare:
          return [exports$1.TokenType.CloseSquare, "]", -1, -1, void 0];
        case exports$1.TokenType.CloseSquare:
          return [exports$1.TokenType.OpenSquare, "[", -1, -1, void 0];
        default:
          return null;
      }
    }, exports$1.mirrorVariantType = function mirrorVariantType(e2) {
      switch (e2) {
        case exports$1.TokenType.OpenParen:
          return exports$1.TokenType.CloseParen;
        case exports$1.TokenType.CloseParen:
          return exports$1.TokenType.OpenParen;
        case exports$1.TokenType.OpenCurly:
          return exports$1.TokenType.CloseCurly;
        case exports$1.TokenType.CloseCurly:
          return exports$1.TokenType.OpenCurly;
        case exports$1.TokenType.OpenSquare:
          return exports$1.TokenType.CloseSquare;
        case exports$1.TokenType.CloseSquare:
          return exports$1.TokenType.OpenSquare;
        default:
          return null;
      }
    }, exports$1.mutateIdent = function mutateIdent(e2, n2) {
      const o2 = [];
      for (const e3 of n2) o2.push(e3.codePointAt(0));
      const t2 = String.fromCodePoint(...serializeIdent(o2));
      e2[1] = t2, e2[4].value = n2;
    }, exports$1.mutateUnit = function mutateUnit(e2, n2) {
      const o2 = [];
      for (const e3 of n2) o2.push(e3.codePointAt(0));
      const t2 = serializeIdent(o2);
      101 === t2[0] && insertEscapedCodePoint(t2, 0, t2[0]);
      const r2 = String.fromCodePoint(...t2), s2 = "+" === e2[4].signCharacter ? e2[4].signCharacter : "", i2 = e2[4].value.toString();
      e2[1] = `${s2}${i2}${r2}`, e2[4].unit = n2;
    }, exports$1.stringify = function stringify(...e2) {
      let n2 = "";
      for (let o2 = 0; o2 < e2.length; o2++) n2 += e2[o2][1];
      return n2;
    }, exports$1.tokenize = function tokenize(e2, n2) {
      const o2 = tokenizer(e2, n2), t2 = [];
      for (; !o2.endOfFile(); ) t2.push(o2.nextToken());
      return t2.push(o2.nextToken()), t2;
    }, exports$1.tokenizer = tokenizer;
  })(dist);
  return dist;
}
export {
  requireDist as r
};
