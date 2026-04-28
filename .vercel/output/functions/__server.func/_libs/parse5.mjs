import { r as requireDecode, a as require_escape } from "./entities.mjs";
var cjs = {};
var parser = {};
var tokenizer = {};
var preprocessor = {};
var unicode = {};
var hasRequiredUnicode;
function requireUnicode() {
  if (hasRequiredUnicode) return unicode;
  hasRequiredUnicode = 1;
  Object.defineProperty(unicode, "__esModule", { value: true });
  unicode.SEQUENCES = unicode.CODE_POINTS = unicode.REPLACEMENT_CHARACTER = void 0;
  unicode.isSurrogate = isSurrogate;
  unicode.isSurrogatePair = isSurrogatePair;
  unicode.getSurrogatePairCodePoint = getSurrogatePairCodePoint;
  unicode.isControlCodePoint = isControlCodePoint;
  unicode.isUndefinedCodePoint = isUndefinedCodePoint;
  const UNDEFINED_CODE_POINTS = /* @__PURE__ */ new Set([
    65534,
    65535,
    131070,
    131071,
    196606,
    196607,
    262142,
    262143,
    327678,
    327679,
    393214,
    393215,
    458750,
    458751,
    524286,
    524287,
    589822,
    589823,
    655358,
    655359,
    720894,
    720895,
    786430,
    786431,
    851966,
    851967,
    917502,
    917503,
    983038,
    983039,
    1048574,
    1048575,
    1114110,
    1114111
  ]);
  unicode.REPLACEMENT_CHARACTER = "�";
  var CODE_POINTS;
  (function(CODE_POINTS2) {
    CODE_POINTS2[CODE_POINTS2["EOF"] = -1] = "EOF";
    CODE_POINTS2[CODE_POINTS2["NULL"] = 0] = "NULL";
    CODE_POINTS2[CODE_POINTS2["TABULATION"] = 9] = "TABULATION";
    CODE_POINTS2[CODE_POINTS2["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
    CODE_POINTS2[CODE_POINTS2["LINE_FEED"] = 10] = "LINE_FEED";
    CODE_POINTS2[CODE_POINTS2["FORM_FEED"] = 12] = "FORM_FEED";
    CODE_POINTS2[CODE_POINTS2["SPACE"] = 32] = "SPACE";
    CODE_POINTS2[CODE_POINTS2["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
    CODE_POINTS2[CODE_POINTS2["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
    CODE_POINTS2[CODE_POINTS2["AMPERSAND"] = 38] = "AMPERSAND";
    CODE_POINTS2[CODE_POINTS2["APOSTROPHE"] = 39] = "APOSTROPHE";
    CODE_POINTS2[CODE_POINTS2["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
    CODE_POINTS2[CODE_POINTS2["SOLIDUS"] = 47] = "SOLIDUS";
    CODE_POINTS2[CODE_POINTS2["DIGIT_0"] = 48] = "DIGIT_0";
    CODE_POINTS2[CODE_POINTS2["DIGIT_9"] = 57] = "DIGIT_9";
    CODE_POINTS2[CODE_POINTS2["SEMICOLON"] = 59] = "SEMICOLON";
    CODE_POINTS2[CODE_POINTS2["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
    CODE_POINTS2[CODE_POINTS2["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
    CODE_POINTS2[CODE_POINTS2["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
    CODE_POINTS2[CODE_POINTS2["QUESTION_MARK"] = 63] = "QUESTION_MARK";
    CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
    CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
    CODE_POINTS2[CODE_POINTS2["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
    CODE_POINTS2[CODE_POINTS2["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
    CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
    CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
  })(CODE_POINTS || (unicode.CODE_POINTS = CODE_POINTS = {}));
  unicode.SEQUENCES = {
    DASH_DASH: "--",
    CDATA_START: "[CDATA[",
    DOCTYPE: "doctype",
    SCRIPT: "script",
    PUBLIC: "public",
    SYSTEM: "system"
  };
  function isSurrogate(cp) {
    return cp >= 55296 && cp <= 57343;
  }
  function isSurrogatePair(cp) {
    return cp >= 56320 && cp <= 57343;
  }
  function getSurrogatePairCodePoint(cp1, cp2) {
    return (cp1 - 55296) * 1024 + 9216 + cp2;
  }
  function isControlCodePoint(cp) {
    return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
  }
  function isUndefinedCodePoint(cp) {
    return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.has(cp);
  }
  return unicode;
}
var errorCodes = {};
var hasRequiredErrorCodes;
function requireErrorCodes() {
  if (hasRequiredErrorCodes) return errorCodes;
  hasRequiredErrorCodes = 1;
  Object.defineProperty(errorCodes, "__esModule", { value: true });
  errorCodes.ERR = void 0;
  var ERR;
  (function(ERR2) {
    ERR2["controlCharacterInInputStream"] = "control-character-in-input-stream";
    ERR2["noncharacterInInputStream"] = "noncharacter-in-input-stream";
    ERR2["surrogateInInputStream"] = "surrogate-in-input-stream";
    ERR2["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
    ERR2["endTagWithAttributes"] = "end-tag-with-attributes";
    ERR2["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
    ERR2["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
    ERR2["unexpectedNullCharacter"] = "unexpected-null-character";
    ERR2["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
    ERR2["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
    ERR2["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
    ERR2["missingEndTagName"] = "missing-end-tag-name";
    ERR2["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
    ERR2["unknownNamedCharacterReference"] = "unknown-named-character-reference";
    ERR2["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
    ERR2["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
    ERR2["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
    ERR2["eofBeforeTagName"] = "eof-before-tag-name";
    ERR2["eofInTag"] = "eof-in-tag";
    ERR2["missingAttributeValue"] = "missing-attribute-value";
    ERR2["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
    ERR2["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
    ERR2["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
    ERR2["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
    ERR2["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
    ERR2["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
    ERR2["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
    ERR2["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
    ERR2["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
    ERR2["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
    ERR2["cdataInHtmlContent"] = "cdata-in-html-content";
    ERR2["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
    ERR2["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
    ERR2["eofInDoctype"] = "eof-in-doctype";
    ERR2["nestedComment"] = "nested-comment";
    ERR2["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
    ERR2["eofInComment"] = "eof-in-comment";
    ERR2["incorrectlyClosedComment"] = "incorrectly-closed-comment";
    ERR2["eofInCdata"] = "eof-in-cdata";
    ERR2["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
    ERR2["nullCharacterReference"] = "null-character-reference";
    ERR2["surrogateCharacterReference"] = "surrogate-character-reference";
    ERR2["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
    ERR2["controlCharacterReference"] = "control-character-reference";
    ERR2["noncharacterCharacterReference"] = "noncharacter-character-reference";
    ERR2["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
    ERR2["missingDoctypeName"] = "missing-doctype-name";
    ERR2["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
    ERR2["duplicateAttribute"] = "duplicate-attribute";
    ERR2["nonConformingDoctype"] = "non-conforming-doctype";
    ERR2["missingDoctype"] = "missing-doctype";
    ERR2["misplacedDoctype"] = "misplaced-doctype";
    ERR2["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
    ERR2["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
    ERR2["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
    ERR2["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
    ERR2["abandonedHeadElementChild"] = "abandoned-head-element-child";
    ERR2["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
    ERR2["nestedNoscriptInHead"] = "nested-noscript-in-head";
    ERR2["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
  })(ERR || (errorCodes.ERR = ERR = {}));
  return errorCodes;
}
var hasRequiredPreprocessor;
function requirePreprocessor() {
  if (hasRequiredPreprocessor) return preprocessor;
  hasRequiredPreprocessor = 1;
  Object.defineProperty(preprocessor, "__esModule", { value: true });
  preprocessor.Preprocessor = void 0;
  const unicode_js_1 = requireUnicode();
  const error_codes_js_1 = requireErrorCodes();
  const DEFAULT_BUFFER_WATERLINE = 1 << 16;
  class Preprocessor {
    constructor(handler) {
      this.handler = handler;
      this.html = "";
      this.pos = -1;
      this.lastGapPos = -2;
      this.gapStack = [];
      this.skipNextNewLine = false;
      this.lastChunkWritten = false;
      this.endOfChunkHit = false;
      this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
      this.isEol = false;
      this.lineStartPos = 0;
      this.droppedBufferSize = 0;
      this.line = 1;
      this.lastErrOffset = -1;
    }
    /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
    get col() {
      return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
    }
    get offset() {
      return this.droppedBufferSize + this.pos;
    }
    getError(code, cpOffset) {
      const { line, col, offset } = this;
      const startCol = col + cpOffset;
      const startOffset = offset + cpOffset;
      return {
        code,
        startLine: line,
        endLine: line,
        startCol,
        endCol: startCol,
        startOffset,
        endOffset: startOffset
      };
    }
    _err(code) {
      if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
        this.lastErrOffset = this.offset;
        this.handler.onParseError(this.getError(code, 0));
      }
    }
    _addGap() {
      this.gapStack.push(this.lastGapPos);
      this.lastGapPos = this.pos;
    }
    _processSurrogate(cp) {
      if (this.pos !== this.html.length - 1) {
        const nextCp = this.html.charCodeAt(this.pos + 1);
        if ((0, unicode_js_1.isSurrogatePair)(nextCp)) {
          this.pos++;
          this._addGap();
          return (0, unicode_js_1.getSurrogatePairCodePoint)(cp, nextCp);
        }
      } else if (!this.lastChunkWritten) {
        this.endOfChunkHit = true;
        return unicode_js_1.CODE_POINTS.EOF;
      }
      this._err(error_codes_js_1.ERR.surrogateInInputStream);
      return cp;
    }
    willDropParsedChunk() {
      return this.pos > this.bufferWaterline;
    }
    dropParsedChunk() {
      if (this.willDropParsedChunk()) {
        this.html = this.html.substring(this.pos);
        this.lineStartPos -= this.pos;
        this.droppedBufferSize += this.pos;
        this.pos = 0;
        this.lastGapPos = -2;
        this.gapStack.length = 0;
      }
    }
    write(chunk, isLastChunk) {
      if (this.html.length > 0) {
        this.html += chunk;
      } else {
        this.html = chunk;
      }
      this.endOfChunkHit = false;
      this.lastChunkWritten = isLastChunk;
    }
    insertHtmlAtCurrentPos(chunk) {
      this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
      this.endOfChunkHit = false;
    }
    startsWith(pattern, caseSensitive) {
      if (this.pos + pattern.length > this.html.length) {
        this.endOfChunkHit = !this.lastChunkWritten;
        return false;
      }
      if (caseSensitive) {
        return this.html.startsWith(pattern, this.pos);
      }
      for (let i = 0; i < pattern.length; i++) {
        const cp = this.html.charCodeAt(this.pos + i) | 32;
        if (cp !== pattern.charCodeAt(i)) {
          return false;
        }
      }
      return true;
    }
    peek(offset) {
      const pos = this.pos + offset;
      if (pos >= this.html.length) {
        this.endOfChunkHit = !this.lastChunkWritten;
        return unicode_js_1.CODE_POINTS.EOF;
      }
      const code = this.html.charCodeAt(pos);
      return code === unicode_js_1.CODE_POINTS.CARRIAGE_RETURN ? unicode_js_1.CODE_POINTS.LINE_FEED : code;
    }
    advance() {
      this.pos++;
      if (this.isEol) {
        this.isEol = false;
        this.line++;
        this.lineStartPos = this.pos;
      }
      if (this.pos >= this.html.length) {
        this.endOfChunkHit = !this.lastChunkWritten;
        return unicode_js_1.CODE_POINTS.EOF;
      }
      let cp = this.html.charCodeAt(this.pos);
      if (cp === unicode_js_1.CODE_POINTS.CARRIAGE_RETURN) {
        this.isEol = true;
        this.skipNextNewLine = true;
        return unicode_js_1.CODE_POINTS.LINE_FEED;
      }
      if (cp === unicode_js_1.CODE_POINTS.LINE_FEED) {
        this.isEol = true;
        if (this.skipNextNewLine) {
          this.line--;
          this.skipNextNewLine = false;
          this._addGap();
          return this.advance();
        }
      }
      this.skipNextNewLine = false;
      if ((0, unicode_js_1.isSurrogate)(cp)) {
        cp = this._processSurrogate(cp);
      }
      const isCommonValidRange = this.handler.onParseError === null || cp > 31 && cp < 127 || cp === unicode_js_1.CODE_POINTS.LINE_FEED || cp === unicode_js_1.CODE_POINTS.CARRIAGE_RETURN || cp > 159 && cp < 64976;
      if (!isCommonValidRange) {
        this._checkForProblematicCharacters(cp);
      }
      return cp;
    }
    _checkForProblematicCharacters(cp) {
      if ((0, unicode_js_1.isControlCodePoint)(cp)) {
        this._err(error_codes_js_1.ERR.controlCharacterInInputStream);
      } else if ((0, unicode_js_1.isUndefinedCodePoint)(cp)) {
        this._err(error_codes_js_1.ERR.noncharacterInInputStream);
      }
    }
    retreat(count) {
      this.pos -= count;
      while (this.pos < this.lastGapPos) {
        this.lastGapPos = this.gapStack.pop();
        this.pos--;
      }
      this.isEol = false;
    }
  }
  preprocessor.Preprocessor = Preprocessor;
  return preprocessor;
}
var token = {};
var hasRequiredToken;
function requireToken() {
  if (hasRequiredToken) return token;
  hasRequiredToken = 1;
  Object.defineProperty(token, "__esModule", { value: true });
  token.TokenType = void 0;
  token.getTokenAttr = getTokenAttr;
  var TokenType;
  (function(TokenType2) {
    TokenType2[TokenType2["CHARACTER"] = 0] = "CHARACTER";
    TokenType2[TokenType2["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
    TokenType2[TokenType2["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
    TokenType2[TokenType2["START_TAG"] = 3] = "START_TAG";
    TokenType2[TokenType2["END_TAG"] = 4] = "END_TAG";
    TokenType2[TokenType2["COMMENT"] = 5] = "COMMENT";
    TokenType2[TokenType2["DOCTYPE"] = 6] = "DOCTYPE";
    TokenType2[TokenType2["EOF"] = 7] = "EOF";
    TokenType2[TokenType2["HIBERNATION"] = 8] = "HIBERNATION";
  })(TokenType || (token.TokenType = TokenType = {}));
  function getTokenAttr(token2, attrName) {
    for (let i = token2.attrs.length - 1; i >= 0; i--) {
      if (token2.attrs[i].name === attrName) {
        return token2.attrs[i].value;
      }
    }
    return null;
  }
  return token;
}
var html = {};
var hasRequiredHtml;
function requireHtml() {
  if (hasRequiredHtml) return html;
  hasRequiredHtml = 1;
  Object.defineProperty(html, "__esModule", { value: true });
  html.NUMBERED_HEADERS = html.SPECIAL_ELEMENTS = html.TAG_ID = html.TAG_NAMES = html.DOCUMENT_MODE = html.ATTRS = html.NS = void 0;
  html.getTagID = getTagID;
  html.hasUnescapedText = hasUnescapedText;
  var NS;
  (function(NS2) {
    NS2["HTML"] = "http://www.w3.org/1999/xhtml";
    NS2["MATHML"] = "http://www.w3.org/1998/Math/MathML";
    NS2["SVG"] = "http://www.w3.org/2000/svg";
    NS2["XLINK"] = "http://www.w3.org/1999/xlink";
    NS2["XML"] = "http://www.w3.org/XML/1998/namespace";
    NS2["XMLNS"] = "http://www.w3.org/2000/xmlns/";
  })(NS || (html.NS = NS = {}));
  var ATTRS;
  (function(ATTRS2) {
    ATTRS2["TYPE"] = "type";
    ATTRS2["ACTION"] = "action";
    ATTRS2["ENCODING"] = "encoding";
    ATTRS2["PROMPT"] = "prompt";
    ATTRS2["NAME"] = "name";
    ATTRS2["COLOR"] = "color";
    ATTRS2["FACE"] = "face";
    ATTRS2["SIZE"] = "size";
  })(ATTRS || (html.ATTRS = ATTRS = {}));
  var DOCUMENT_MODE;
  (function(DOCUMENT_MODE2) {
    DOCUMENT_MODE2["NO_QUIRKS"] = "no-quirks";
    DOCUMENT_MODE2["QUIRKS"] = "quirks";
    DOCUMENT_MODE2["LIMITED_QUIRKS"] = "limited-quirks";
  })(DOCUMENT_MODE || (html.DOCUMENT_MODE = DOCUMENT_MODE = {}));
  var TAG_NAMES;
  (function(TAG_NAMES2) {
    TAG_NAMES2["A"] = "a";
    TAG_NAMES2["ADDRESS"] = "address";
    TAG_NAMES2["ANNOTATION_XML"] = "annotation-xml";
    TAG_NAMES2["APPLET"] = "applet";
    TAG_NAMES2["AREA"] = "area";
    TAG_NAMES2["ARTICLE"] = "article";
    TAG_NAMES2["ASIDE"] = "aside";
    TAG_NAMES2["B"] = "b";
    TAG_NAMES2["BASE"] = "base";
    TAG_NAMES2["BASEFONT"] = "basefont";
    TAG_NAMES2["BGSOUND"] = "bgsound";
    TAG_NAMES2["BIG"] = "big";
    TAG_NAMES2["BLOCKQUOTE"] = "blockquote";
    TAG_NAMES2["BODY"] = "body";
    TAG_NAMES2["BR"] = "br";
    TAG_NAMES2["BUTTON"] = "button";
    TAG_NAMES2["CAPTION"] = "caption";
    TAG_NAMES2["CENTER"] = "center";
    TAG_NAMES2["CODE"] = "code";
    TAG_NAMES2["COL"] = "col";
    TAG_NAMES2["COLGROUP"] = "colgroup";
    TAG_NAMES2["DD"] = "dd";
    TAG_NAMES2["DESC"] = "desc";
    TAG_NAMES2["DETAILS"] = "details";
    TAG_NAMES2["DIALOG"] = "dialog";
    TAG_NAMES2["DIR"] = "dir";
    TAG_NAMES2["DIV"] = "div";
    TAG_NAMES2["DL"] = "dl";
    TAG_NAMES2["DT"] = "dt";
    TAG_NAMES2["EM"] = "em";
    TAG_NAMES2["EMBED"] = "embed";
    TAG_NAMES2["FIELDSET"] = "fieldset";
    TAG_NAMES2["FIGCAPTION"] = "figcaption";
    TAG_NAMES2["FIGURE"] = "figure";
    TAG_NAMES2["FONT"] = "font";
    TAG_NAMES2["FOOTER"] = "footer";
    TAG_NAMES2["FOREIGN_OBJECT"] = "foreignObject";
    TAG_NAMES2["FORM"] = "form";
    TAG_NAMES2["FRAME"] = "frame";
    TAG_NAMES2["FRAMESET"] = "frameset";
    TAG_NAMES2["H1"] = "h1";
    TAG_NAMES2["H2"] = "h2";
    TAG_NAMES2["H3"] = "h3";
    TAG_NAMES2["H4"] = "h4";
    TAG_NAMES2["H5"] = "h5";
    TAG_NAMES2["H6"] = "h6";
    TAG_NAMES2["HEAD"] = "head";
    TAG_NAMES2["HEADER"] = "header";
    TAG_NAMES2["HGROUP"] = "hgroup";
    TAG_NAMES2["HR"] = "hr";
    TAG_NAMES2["HTML"] = "html";
    TAG_NAMES2["I"] = "i";
    TAG_NAMES2["IMG"] = "img";
    TAG_NAMES2["IMAGE"] = "image";
    TAG_NAMES2["INPUT"] = "input";
    TAG_NAMES2["IFRAME"] = "iframe";
    TAG_NAMES2["KEYGEN"] = "keygen";
    TAG_NAMES2["LABEL"] = "label";
    TAG_NAMES2["LI"] = "li";
    TAG_NAMES2["LINK"] = "link";
    TAG_NAMES2["LISTING"] = "listing";
    TAG_NAMES2["MAIN"] = "main";
    TAG_NAMES2["MALIGNMARK"] = "malignmark";
    TAG_NAMES2["MARQUEE"] = "marquee";
    TAG_NAMES2["MATH"] = "math";
    TAG_NAMES2["MENU"] = "menu";
    TAG_NAMES2["META"] = "meta";
    TAG_NAMES2["MGLYPH"] = "mglyph";
    TAG_NAMES2["MI"] = "mi";
    TAG_NAMES2["MO"] = "mo";
    TAG_NAMES2["MN"] = "mn";
    TAG_NAMES2["MS"] = "ms";
    TAG_NAMES2["MTEXT"] = "mtext";
    TAG_NAMES2["NAV"] = "nav";
    TAG_NAMES2["NOBR"] = "nobr";
    TAG_NAMES2["NOFRAMES"] = "noframes";
    TAG_NAMES2["NOEMBED"] = "noembed";
    TAG_NAMES2["NOSCRIPT"] = "noscript";
    TAG_NAMES2["OBJECT"] = "object";
    TAG_NAMES2["OL"] = "ol";
    TAG_NAMES2["OPTGROUP"] = "optgroup";
    TAG_NAMES2["OPTION"] = "option";
    TAG_NAMES2["P"] = "p";
    TAG_NAMES2["PARAM"] = "param";
    TAG_NAMES2["PLAINTEXT"] = "plaintext";
    TAG_NAMES2["PRE"] = "pre";
    TAG_NAMES2["RB"] = "rb";
    TAG_NAMES2["RP"] = "rp";
    TAG_NAMES2["RT"] = "rt";
    TAG_NAMES2["RTC"] = "rtc";
    TAG_NAMES2["RUBY"] = "ruby";
    TAG_NAMES2["S"] = "s";
    TAG_NAMES2["SCRIPT"] = "script";
    TAG_NAMES2["SEARCH"] = "search";
    TAG_NAMES2["SECTION"] = "section";
    TAG_NAMES2["SELECT"] = "select";
    TAG_NAMES2["SOURCE"] = "source";
    TAG_NAMES2["SMALL"] = "small";
    TAG_NAMES2["SPAN"] = "span";
    TAG_NAMES2["STRIKE"] = "strike";
    TAG_NAMES2["STRONG"] = "strong";
    TAG_NAMES2["STYLE"] = "style";
    TAG_NAMES2["SUB"] = "sub";
    TAG_NAMES2["SUMMARY"] = "summary";
    TAG_NAMES2["SUP"] = "sup";
    TAG_NAMES2["TABLE"] = "table";
    TAG_NAMES2["TBODY"] = "tbody";
    TAG_NAMES2["TEMPLATE"] = "template";
    TAG_NAMES2["TEXTAREA"] = "textarea";
    TAG_NAMES2["TFOOT"] = "tfoot";
    TAG_NAMES2["TD"] = "td";
    TAG_NAMES2["TH"] = "th";
    TAG_NAMES2["THEAD"] = "thead";
    TAG_NAMES2["TITLE"] = "title";
    TAG_NAMES2["TR"] = "tr";
    TAG_NAMES2["TRACK"] = "track";
    TAG_NAMES2["TT"] = "tt";
    TAG_NAMES2["U"] = "u";
    TAG_NAMES2["UL"] = "ul";
    TAG_NAMES2["SVG"] = "svg";
    TAG_NAMES2["VAR"] = "var";
    TAG_NAMES2["WBR"] = "wbr";
    TAG_NAMES2["XMP"] = "xmp";
  })(TAG_NAMES || (html.TAG_NAMES = TAG_NAMES = {}));
  var TAG_ID;
  (function(TAG_ID2) {
    TAG_ID2[TAG_ID2["UNKNOWN"] = 0] = "UNKNOWN";
    TAG_ID2[TAG_ID2["A"] = 1] = "A";
    TAG_ID2[TAG_ID2["ADDRESS"] = 2] = "ADDRESS";
    TAG_ID2[TAG_ID2["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
    TAG_ID2[TAG_ID2["APPLET"] = 4] = "APPLET";
    TAG_ID2[TAG_ID2["AREA"] = 5] = "AREA";
    TAG_ID2[TAG_ID2["ARTICLE"] = 6] = "ARTICLE";
    TAG_ID2[TAG_ID2["ASIDE"] = 7] = "ASIDE";
    TAG_ID2[TAG_ID2["B"] = 8] = "B";
    TAG_ID2[TAG_ID2["BASE"] = 9] = "BASE";
    TAG_ID2[TAG_ID2["BASEFONT"] = 10] = "BASEFONT";
    TAG_ID2[TAG_ID2["BGSOUND"] = 11] = "BGSOUND";
    TAG_ID2[TAG_ID2["BIG"] = 12] = "BIG";
    TAG_ID2[TAG_ID2["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
    TAG_ID2[TAG_ID2["BODY"] = 14] = "BODY";
    TAG_ID2[TAG_ID2["BR"] = 15] = "BR";
    TAG_ID2[TAG_ID2["BUTTON"] = 16] = "BUTTON";
    TAG_ID2[TAG_ID2["CAPTION"] = 17] = "CAPTION";
    TAG_ID2[TAG_ID2["CENTER"] = 18] = "CENTER";
    TAG_ID2[TAG_ID2["CODE"] = 19] = "CODE";
    TAG_ID2[TAG_ID2["COL"] = 20] = "COL";
    TAG_ID2[TAG_ID2["COLGROUP"] = 21] = "COLGROUP";
    TAG_ID2[TAG_ID2["DD"] = 22] = "DD";
    TAG_ID2[TAG_ID2["DESC"] = 23] = "DESC";
    TAG_ID2[TAG_ID2["DETAILS"] = 24] = "DETAILS";
    TAG_ID2[TAG_ID2["DIALOG"] = 25] = "DIALOG";
    TAG_ID2[TAG_ID2["DIR"] = 26] = "DIR";
    TAG_ID2[TAG_ID2["DIV"] = 27] = "DIV";
    TAG_ID2[TAG_ID2["DL"] = 28] = "DL";
    TAG_ID2[TAG_ID2["DT"] = 29] = "DT";
    TAG_ID2[TAG_ID2["EM"] = 30] = "EM";
    TAG_ID2[TAG_ID2["EMBED"] = 31] = "EMBED";
    TAG_ID2[TAG_ID2["FIELDSET"] = 32] = "FIELDSET";
    TAG_ID2[TAG_ID2["FIGCAPTION"] = 33] = "FIGCAPTION";
    TAG_ID2[TAG_ID2["FIGURE"] = 34] = "FIGURE";
    TAG_ID2[TAG_ID2["FONT"] = 35] = "FONT";
    TAG_ID2[TAG_ID2["FOOTER"] = 36] = "FOOTER";
    TAG_ID2[TAG_ID2["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
    TAG_ID2[TAG_ID2["FORM"] = 38] = "FORM";
    TAG_ID2[TAG_ID2["FRAME"] = 39] = "FRAME";
    TAG_ID2[TAG_ID2["FRAMESET"] = 40] = "FRAMESET";
    TAG_ID2[TAG_ID2["H1"] = 41] = "H1";
    TAG_ID2[TAG_ID2["H2"] = 42] = "H2";
    TAG_ID2[TAG_ID2["H3"] = 43] = "H3";
    TAG_ID2[TAG_ID2["H4"] = 44] = "H4";
    TAG_ID2[TAG_ID2["H5"] = 45] = "H5";
    TAG_ID2[TAG_ID2["H6"] = 46] = "H6";
    TAG_ID2[TAG_ID2["HEAD"] = 47] = "HEAD";
    TAG_ID2[TAG_ID2["HEADER"] = 48] = "HEADER";
    TAG_ID2[TAG_ID2["HGROUP"] = 49] = "HGROUP";
    TAG_ID2[TAG_ID2["HR"] = 50] = "HR";
    TAG_ID2[TAG_ID2["HTML"] = 51] = "HTML";
    TAG_ID2[TAG_ID2["I"] = 52] = "I";
    TAG_ID2[TAG_ID2["IMG"] = 53] = "IMG";
    TAG_ID2[TAG_ID2["IMAGE"] = 54] = "IMAGE";
    TAG_ID2[TAG_ID2["INPUT"] = 55] = "INPUT";
    TAG_ID2[TAG_ID2["IFRAME"] = 56] = "IFRAME";
    TAG_ID2[TAG_ID2["KEYGEN"] = 57] = "KEYGEN";
    TAG_ID2[TAG_ID2["LABEL"] = 58] = "LABEL";
    TAG_ID2[TAG_ID2["LI"] = 59] = "LI";
    TAG_ID2[TAG_ID2["LINK"] = 60] = "LINK";
    TAG_ID2[TAG_ID2["LISTING"] = 61] = "LISTING";
    TAG_ID2[TAG_ID2["MAIN"] = 62] = "MAIN";
    TAG_ID2[TAG_ID2["MALIGNMARK"] = 63] = "MALIGNMARK";
    TAG_ID2[TAG_ID2["MARQUEE"] = 64] = "MARQUEE";
    TAG_ID2[TAG_ID2["MATH"] = 65] = "MATH";
    TAG_ID2[TAG_ID2["MENU"] = 66] = "MENU";
    TAG_ID2[TAG_ID2["META"] = 67] = "META";
    TAG_ID2[TAG_ID2["MGLYPH"] = 68] = "MGLYPH";
    TAG_ID2[TAG_ID2["MI"] = 69] = "MI";
    TAG_ID2[TAG_ID2["MO"] = 70] = "MO";
    TAG_ID2[TAG_ID2["MN"] = 71] = "MN";
    TAG_ID2[TAG_ID2["MS"] = 72] = "MS";
    TAG_ID2[TAG_ID2["MTEXT"] = 73] = "MTEXT";
    TAG_ID2[TAG_ID2["NAV"] = 74] = "NAV";
    TAG_ID2[TAG_ID2["NOBR"] = 75] = "NOBR";
    TAG_ID2[TAG_ID2["NOFRAMES"] = 76] = "NOFRAMES";
    TAG_ID2[TAG_ID2["NOEMBED"] = 77] = "NOEMBED";
    TAG_ID2[TAG_ID2["NOSCRIPT"] = 78] = "NOSCRIPT";
    TAG_ID2[TAG_ID2["OBJECT"] = 79] = "OBJECT";
    TAG_ID2[TAG_ID2["OL"] = 80] = "OL";
    TAG_ID2[TAG_ID2["OPTGROUP"] = 81] = "OPTGROUP";
    TAG_ID2[TAG_ID2["OPTION"] = 82] = "OPTION";
    TAG_ID2[TAG_ID2["P"] = 83] = "P";
    TAG_ID2[TAG_ID2["PARAM"] = 84] = "PARAM";
    TAG_ID2[TAG_ID2["PLAINTEXT"] = 85] = "PLAINTEXT";
    TAG_ID2[TAG_ID2["PRE"] = 86] = "PRE";
    TAG_ID2[TAG_ID2["RB"] = 87] = "RB";
    TAG_ID2[TAG_ID2["RP"] = 88] = "RP";
    TAG_ID2[TAG_ID2["RT"] = 89] = "RT";
    TAG_ID2[TAG_ID2["RTC"] = 90] = "RTC";
    TAG_ID2[TAG_ID2["RUBY"] = 91] = "RUBY";
    TAG_ID2[TAG_ID2["S"] = 92] = "S";
    TAG_ID2[TAG_ID2["SCRIPT"] = 93] = "SCRIPT";
    TAG_ID2[TAG_ID2["SEARCH"] = 94] = "SEARCH";
    TAG_ID2[TAG_ID2["SECTION"] = 95] = "SECTION";
    TAG_ID2[TAG_ID2["SELECT"] = 96] = "SELECT";
    TAG_ID2[TAG_ID2["SOURCE"] = 97] = "SOURCE";
    TAG_ID2[TAG_ID2["SMALL"] = 98] = "SMALL";
    TAG_ID2[TAG_ID2["SPAN"] = 99] = "SPAN";
    TAG_ID2[TAG_ID2["STRIKE"] = 100] = "STRIKE";
    TAG_ID2[TAG_ID2["STRONG"] = 101] = "STRONG";
    TAG_ID2[TAG_ID2["STYLE"] = 102] = "STYLE";
    TAG_ID2[TAG_ID2["SUB"] = 103] = "SUB";
    TAG_ID2[TAG_ID2["SUMMARY"] = 104] = "SUMMARY";
    TAG_ID2[TAG_ID2["SUP"] = 105] = "SUP";
    TAG_ID2[TAG_ID2["TABLE"] = 106] = "TABLE";
    TAG_ID2[TAG_ID2["TBODY"] = 107] = "TBODY";
    TAG_ID2[TAG_ID2["TEMPLATE"] = 108] = "TEMPLATE";
    TAG_ID2[TAG_ID2["TEXTAREA"] = 109] = "TEXTAREA";
    TAG_ID2[TAG_ID2["TFOOT"] = 110] = "TFOOT";
    TAG_ID2[TAG_ID2["TD"] = 111] = "TD";
    TAG_ID2[TAG_ID2["TH"] = 112] = "TH";
    TAG_ID2[TAG_ID2["THEAD"] = 113] = "THEAD";
    TAG_ID2[TAG_ID2["TITLE"] = 114] = "TITLE";
    TAG_ID2[TAG_ID2["TR"] = 115] = "TR";
    TAG_ID2[TAG_ID2["TRACK"] = 116] = "TRACK";
    TAG_ID2[TAG_ID2["TT"] = 117] = "TT";
    TAG_ID2[TAG_ID2["U"] = 118] = "U";
    TAG_ID2[TAG_ID2["UL"] = 119] = "UL";
    TAG_ID2[TAG_ID2["SVG"] = 120] = "SVG";
    TAG_ID2[TAG_ID2["VAR"] = 121] = "VAR";
    TAG_ID2[TAG_ID2["WBR"] = 122] = "WBR";
    TAG_ID2[TAG_ID2["XMP"] = 123] = "XMP";
  })(TAG_ID || (html.TAG_ID = TAG_ID = {}));
  const TAG_NAME_TO_ID = /* @__PURE__ */ new Map([
    [TAG_NAMES.A, TAG_ID.A],
    [TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
    [TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
    [TAG_NAMES.APPLET, TAG_ID.APPLET],
    [TAG_NAMES.AREA, TAG_ID.AREA],
    [TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
    [TAG_NAMES.ASIDE, TAG_ID.ASIDE],
    [TAG_NAMES.B, TAG_ID.B],
    [TAG_NAMES.BASE, TAG_ID.BASE],
    [TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
    [TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
    [TAG_NAMES.BIG, TAG_ID.BIG],
    [TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
    [TAG_NAMES.BODY, TAG_ID.BODY],
    [TAG_NAMES.BR, TAG_ID.BR],
    [TAG_NAMES.BUTTON, TAG_ID.BUTTON],
    [TAG_NAMES.CAPTION, TAG_ID.CAPTION],
    [TAG_NAMES.CENTER, TAG_ID.CENTER],
    [TAG_NAMES.CODE, TAG_ID.CODE],
    [TAG_NAMES.COL, TAG_ID.COL],
    [TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
    [TAG_NAMES.DD, TAG_ID.DD],
    [TAG_NAMES.DESC, TAG_ID.DESC],
    [TAG_NAMES.DETAILS, TAG_ID.DETAILS],
    [TAG_NAMES.DIALOG, TAG_ID.DIALOG],
    [TAG_NAMES.DIR, TAG_ID.DIR],
    [TAG_NAMES.DIV, TAG_ID.DIV],
    [TAG_NAMES.DL, TAG_ID.DL],
    [TAG_NAMES.DT, TAG_ID.DT],
    [TAG_NAMES.EM, TAG_ID.EM],
    [TAG_NAMES.EMBED, TAG_ID.EMBED],
    [TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
    [TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
    [TAG_NAMES.FIGURE, TAG_ID.FIGURE],
    [TAG_NAMES.FONT, TAG_ID.FONT],
    [TAG_NAMES.FOOTER, TAG_ID.FOOTER],
    [TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
    [TAG_NAMES.FORM, TAG_ID.FORM],
    [TAG_NAMES.FRAME, TAG_ID.FRAME],
    [TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
    [TAG_NAMES.H1, TAG_ID.H1],
    [TAG_NAMES.H2, TAG_ID.H2],
    [TAG_NAMES.H3, TAG_ID.H3],
    [TAG_NAMES.H4, TAG_ID.H4],
    [TAG_NAMES.H5, TAG_ID.H5],
    [TAG_NAMES.H6, TAG_ID.H6],
    [TAG_NAMES.HEAD, TAG_ID.HEAD],
    [TAG_NAMES.HEADER, TAG_ID.HEADER],
    [TAG_NAMES.HGROUP, TAG_ID.HGROUP],
    [TAG_NAMES.HR, TAG_ID.HR],
    [TAG_NAMES.HTML, TAG_ID.HTML],
    [TAG_NAMES.I, TAG_ID.I],
    [TAG_NAMES.IMG, TAG_ID.IMG],
    [TAG_NAMES.IMAGE, TAG_ID.IMAGE],
    [TAG_NAMES.INPUT, TAG_ID.INPUT],
    [TAG_NAMES.IFRAME, TAG_ID.IFRAME],
    [TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
    [TAG_NAMES.LABEL, TAG_ID.LABEL],
    [TAG_NAMES.LI, TAG_ID.LI],
    [TAG_NAMES.LINK, TAG_ID.LINK],
    [TAG_NAMES.LISTING, TAG_ID.LISTING],
    [TAG_NAMES.MAIN, TAG_ID.MAIN],
    [TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
    [TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
    [TAG_NAMES.MATH, TAG_ID.MATH],
    [TAG_NAMES.MENU, TAG_ID.MENU],
    [TAG_NAMES.META, TAG_ID.META],
    [TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
    [TAG_NAMES.MI, TAG_ID.MI],
    [TAG_NAMES.MO, TAG_ID.MO],
    [TAG_NAMES.MN, TAG_ID.MN],
    [TAG_NAMES.MS, TAG_ID.MS],
    [TAG_NAMES.MTEXT, TAG_ID.MTEXT],
    [TAG_NAMES.NAV, TAG_ID.NAV],
    [TAG_NAMES.NOBR, TAG_ID.NOBR],
    [TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
    [TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
    [TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
    [TAG_NAMES.OBJECT, TAG_ID.OBJECT],
    [TAG_NAMES.OL, TAG_ID.OL],
    [TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
    [TAG_NAMES.OPTION, TAG_ID.OPTION],
    [TAG_NAMES.P, TAG_ID.P],
    [TAG_NAMES.PARAM, TAG_ID.PARAM],
    [TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
    [TAG_NAMES.PRE, TAG_ID.PRE],
    [TAG_NAMES.RB, TAG_ID.RB],
    [TAG_NAMES.RP, TAG_ID.RP],
    [TAG_NAMES.RT, TAG_ID.RT],
    [TAG_NAMES.RTC, TAG_ID.RTC],
    [TAG_NAMES.RUBY, TAG_ID.RUBY],
    [TAG_NAMES.S, TAG_ID.S],
    [TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
    [TAG_NAMES.SEARCH, TAG_ID.SEARCH],
    [TAG_NAMES.SECTION, TAG_ID.SECTION],
    [TAG_NAMES.SELECT, TAG_ID.SELECT],
    [TAG_NAMES.SOURCE, TAG_ID.SOURCE],
    [TAG_NAMES.SMALL, TAG_ID.SMALL],
    [TAG_NAMES.SPAN, TAG_ID.SPAN],
    [TAG_NAMES.STRIKE, TAG_ID.STRIKE],
    [TAG_NAMES.STRONG, TAG_ID.STRONG],
    [TAG_NAMES.STYLE, TAG_ID.STYLE],
    [TAG_NAMES.SUB, TAG_ID.SUB],
    [TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
    [TAG_NAMES.SUP, TAG_ID.SUP],
    [TAG_NAMES.TABLE, TAG_ID.TABLE],
    [TAG_NAMES.TBODY, TAG_ID.TBODY],
    [TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
    [TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
    [TAG_NAMES.TFOOT, TAG_ID.TFOOT],
    [TAG_NAMES.TD, TAG_ID.TD],
    [TAG_NAMES.TH, TAG_ID.TH],
    [TAG_NAMES.THEAD, TAG_ID.THEAD],
    [TAG_NAMES.TITLE, TAG_ID.TITLE],
    [TAG_NAMES.TR, TAG_ID.TR],
    [TAG_NAMES.TRACK, TAG_ID.TRACK],
    [TAG_NAMES.TT, TAG_ID.TT],
    [TAG_NAMES.U, TAG_ID.U],
    [TAG_NAMES.UL, TAG_ID.UL],
    [TAG_NAMES.SVG, TAG_ID.SVG],
    [TAG_NAMES.VAR, TAG_ID.VAR],
    [TAG_NAMES.WBR, TAG_ID.WBR],
    [TAG_NAMES.XMP, TAG_ID.XMP]
  ]);
  function getTagID(tagName) {
    var _a;
    return (_a = TAG_NAME_TO_ID.get(tagName)) !== null && _a !== void 0 ? _a : TAG_ID.UNKNOWN;
  }
  const $ = TAG_ID;
  html.SPECIAL_ELEMENTS = {
    [NS.HTML]: /* @__PURE__ */ new Set([
      $.ADDRESS,
      $.APPLET,
      $.AREA,
      $.ARTICLE,
      $.ASIDE,
      $.BASE,
      $.BASEFONT,
      $.BGSOUND,
      $.BLOCKQUOTE,
      $.BODY,
      $.BR,
      $.BUTTON,
      $.CAPTION,
      $.CENTER,
      $.COL,
      $.COLGROUP,
      $.DD,
      $.DETAILS,
      $.DIR,
      $.DIV,
      $.DL,
      $.DT,
      $.EMBED,
      $.FIELDSET,
      $.FIGCAPTION,
      $.FIGURE,
      $.FOOTER,
      $.FORM,
      $.FRAME,
      $.FRAMESET,
      $.H1,
      $.H2,
      $.H3,
      $.H4,
      $.H5,
      $.H6,
      $.HEAD,
      $.HEADER,
      $.HGROUP,
      $.HR,
      $.HTML,
      $.IFRAME,
      $.IMG,
      $.INPUT,
      $.LI,
      $.LINK,
      $.LISTING,
      $.MAIN,
      $.MARQUEE,
      $.MENU,
      $.META,
      $.NAV,
      $.NOEMBED,
      $.NOFRAMES,
      $.NOSCRIPT,
      $.OBJECT,
      $.OL,
      $.P,
      $.PARAM,
      $.PLAINTEXT,
      $.PRE,
      $.SCRIPT,
      $.SECTION,
      $.SELECT,
      $.SOURCE,
      $.STYLE,
      $.SUMMARY,
      $.TABLE,
      $.TBODY,
      $.TD,
      $.TEMPLATE,
      $.TEXTAREA,
      $.TFOOT,
      $.TH,
      $.THEAD,
      $.TITLE,
      $.TR,
      $.TRACK,
      $.UL,
      $.WBR,
      $.XMP
    ]),
    [NS.MATHML]: /* @__PURE__ */ new Set([$.MI, $.MO, $.MN, $.MS, $.MTEXT, $.ANNOTATION_XML]),
    [NS.SVG]: /* @__PURE__ */ new Set([$.TITLE, $.FOREIGN_OBJECT, $.DESC]),
    [NS.XLINK]: /* @__PURE__ */ new Set(),
    [NS.XML]: /* @__PURE__ */ new Set(),
    [NS.XMLNS]: /* @__PURE__ */ new Set()
  };
  html.NUMBERED_HEADERS = /* @__PURE__ */ new Set([$.H1, $.H2, $.H3, $.H4, $.H5, $.H6]);
  const UNESCAPED_TEXT = /* @__PURE__ */ new Set([
    TAG_NAMES.STYLE,
    TAG_NAMES.SCRIPT,
    TAG_NAMES.XMP,
    TAG_NAMES.IFRAME,
    TAG_NAMES.NOEMBED,
    TAG_NAMES.NOFRAMES,
    TAG_NAMES.PLAINTEXT
  ]);
  function hasUnescapedText(tn, scriptingEnabled) {
    return UNESCAPED_TEXT.has(tn) || scriptingEnabled && tn === TAG_NAMES.NOSCRIPT;
  }
  return html;
}
var hasRequiredTokenizer;
function requireTokenizer() {
  if (hasRequiredTokenizer) return tokenizer;
  hasRequiredTokenizer = 1;
  Object.defineProperty(tokenizer, "__esModule", { value: true });
  tokenizer.Tokenizer = tokenizer.TokenizerMode = void 0;
  const preprocessor_js_1 = requirePreprocessor();
  const unicode_js_1 = requireUnicode();
  const token_js_1 = requireToken();
  const decode_1 = /* @__PURE__ */ requireDecode();
  const error_codes_js_1 = requireErrorCodes();
  const html_js_1 = requireHtml();
  var State;
  (function(State2) {
    State2[State2["DATA"] = 0] = "DATA";
    State2[State2["RCDATA"] = 1] = "RCDATA";
    State2[State2["RAWTEXT"] = 2] = "RAWTEXT";
    State2[State2["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
    State2[State2["PLAINTEXT"] = 4] = "PLAINTEXT";
    State2[State2["TAG_OPEN"] = 5] = "TAG_OPEN";
    State2[State2["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
    State2[State2["TAG_NAME"] = 7] = "TAG_NAME";
    State2[State2["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
    State2[State2["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
    State2[State2["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
    State2[State2["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
    State2[State2["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
    State2[State2["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
    State2[State2["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
    State2[State2["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
    State2[State2["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
    State2[State2["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
    State2[State2["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
    State2[State2["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
    State2[State2["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
    State2[State2["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
    State2[State2["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
    State2[State2["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
    State2[State2["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
    State2[State2["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
    State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
    State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
    State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
    State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
    State2[State2["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
    State2[State2["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
    State2[State2["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
    State2[State2["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
    State2[State2["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
    State2[State2["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
    State2[State2["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
    State2[State2["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
    State2[State2["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
    State2[State2["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
    State2[State2["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
    State2[State2["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
    State2[State2["COMMENT_START"] = 42] = "COMMENT_START";
    State2[State2["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
    State2[State2["COMMENT"] = 44] = "COMMENT";
    State2[State2["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
    State2[State2["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
    State2[State2["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
    State2[State2["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
    State2[State2["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
    State2[State2["COMMENT_END"] = 50] = "COMMENT_END";
    State2[State2["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
    State2[State2["DOCTYPE"] = 52] = "DOCTYPE";
    State2[State2["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
    State2[State2["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
    State2[State2["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
    State2[State2["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
    State2[State2["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
    State2[State2["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
    State2[State2["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
    State2[State2["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
    State2[State2["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
    State2[State2["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
    State2[State2["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
    State2[State2["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
    State2[State2["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
    State2[State2["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
    State2[State2["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
    State2[State2["CDATA_SECTION"] = 68] = "CDATA_SECTION";
    State2[State2["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
    State2[State2["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
    State2[State2["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
    State2[State2["AMBIGUOUS_AMPERSAND"] = 72] = "AMBIGUOUS_AMPERSAND";
  })(State || (State = {}));
  tokenizer.TokenizerMode = {
    DATA: State.DATA,
    RCDATA: State.RCDATA,
    RAWTEXT: State.RAWTEXT,
    SCRIPT_DATA: State.SCRIPT_DATA,
    PLAINTEXT: State.PLAINTEXT,
    CDATA_SECTION: State.CDATA_SECTION
  };
  function isAsciiDigit(cp) {
    return cp >= unicode_js_1.CODE_POINTS.DIGIT_0 && cp <= unicode_js_1.CODE_POINTS.DIGIT_9;
  }
  function isAsciiUpper(cp) {
    return cp >= unicode_js_1.CODE_POINTS.LATIN_CAPITAL_A && cp <= unicode_js_1.CODE_POINTS.LATIN_CAPITAL_Z;
  }
  function isAsciiLower(cp) {
    return cp >= unicode_js_1.CODE_POINTS.LATIN_SMALL_A && cp <= unicode_js_1.CODE_POINTS.LATIN_SMALL_Z;
  }
  function isAsciiLetter(cp) {
    return isAsciiLower(cp) || isAsciiUpper(cp);
  }
  function isAsciiAlphaNumeric(cp) {
    return isAsciiLetter(cp) || isAsciiDigit(cp);
  }
  function toAsciiLower(cp) {
    return cp + 32;
  }
  function isWhitespace(cp) {
    return cp === unicode_js_1.CODE_POINTS.SPACE || cp === unicode_js_1.CODE_POINTS.LINE_FEED || cp === unicode_js_1.CODE_POINTS.TABULATION || cp === unicode_js_1.CODE_POINTS.FORM_FEED;
  }
  function isScriptDataDoubleEscapeSequenceEnd(cp) {
    return isWhitespace(cp) || cp === unicode_js_1.CODE_POINTS.SOLIDUS || cp === unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN;
  }
  function getErrorForNumericCharacterReference(code) {
    if (code === unicode_js_1.CODE_POINTS.NULL) {
      return error_codes_js_1.ERR.nullCharacterReference;
    } else if (code > 1114111) {
      return error_codes_js_1.ERR.characterReferenceOutsideUnicodeRange;
    } else if ((0, unicode_js_1.isSurrogate)(code)) {
      return error_codes_js_1.ERR.surrogateCharacterReference;
    } else if ((0, unicode_js_1.isUndefinedCodePoint)(code)) {
      return error_codes_js_1.ERR.noncharacterCharacterReference;
    } else if ((0, unicode_js_1.isControlCodePoint)(code) || code === unicode_js_1.CODE_POINTS.CARRIAGE_RETURN) {
      return error_codes_js_1.ERR.controlCharacterReference;
    }
    return null;
  }
  class Tokenizer {
    constructor(options, handler) {
      this.options = options;
      this.handler = handler;
      this.paused = false;
      this.inLoop = false;
      this.inForeignNode = false;
      this.lastStartTagName = "";
      this.active = false;
      this.state = State.DATA;
      this.returnState = State.DATA;
      this.entityStartPos = 0;
      this.consumedAfterSnapshot = -1;
      this.currentCharacterToken = null;
      this.currentToken = null;
      this.currentAttr = { name: "", value: "" };
      this.preprocessor = new preprocessor_js_1.Preprocessor(handler);
      this.currentLocation = this.getCurrentLocation(-1);
      this.entityDecoder = new decode_1.EntityDecoder(decode_1.htmlDecodeTree, (cp, consumed) => {
        this.preprocessor.pos = this.entityStartPos + consumed - 1;
        this._flushCodePointConsumedAsCharacterReference(cp);
      }, handler.onParseError ? {
        missingSemicolonAfterCharacterReference: () => {
          this._err(error_codes_js_1.ERR.missingSemicolonAfterCharacterReference, 1);
        },
        absenceOfDigitsInNumericCharacterReference: (consumed) => {
          this._err(error_codes_js_1.ERR.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + consumed);
        },
        validateNumericCharacterReference: (code) => {
          const error = getErrorForNumericCharacterReference(code);
          if (error)
            this._err(error, 1);
        }
      } : void 0);
    }
    //Errors
    _err(code, cpOffset = 0) {
      var _a, _b;
      (_b = (_a = this.handler).onParseError) === null || _b === void 0 ? void 0 : _b.call(_a, this.preprocessor.getError(code, cpOffset));
    }
    // NOTE: `offset` may never run across line boundaries.
    getCurrentLocation(offset) {
      if (!this.options.sourceCodeLocationInfo) {
        return null;
      }
      return {
        startLine: this.preprocessor.line,
        startCol: this.preprocessor.col - offset,
        startOffset: this.preprocessor.offset - offset,
        endLine: -1,
        endCol: -1,
        endOffset: -1
      };
    }
    _runParsingLoop() {
      if (this.inLoop)
        return;
      this.inLoop = true;
      while (this.active && !this.paused) {
        this.consumedAfterSnapshot = 0;
        const cp = this._consume();
        if (!this._ensureHibernation()) {
          this._callState(cp);
        }
      }
      this.inLoop = false;
    }
    //API
    pause() {
      this.paused = true;
    }
    resume(writeCallback) {
      if (!this.paused) {
        throw new Error("Parser was already resumed");
      }
      this.paused = false;
      if (this.inLoop)
        return;
      this._runParsingLoop();
      if (!this.paused) {
        writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
      }
    }
    write(chunk, isLastChunk, writeCallback) {
      this.active = true;
      this.preprocessor.write(chunk, isLastChunk);
      this._runParsingLoop();
      if (!this.paused) {
        writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
      }
    }
    insertHtmlAtCurrentPos(chunk) {
      this.active = true;
      this.preprocessor.insertHtmlAtCurrentPos(chunk);
      this._runParsingLoop();
    }
    //Hibernation
    _ensureHibernation() {
      if (this.preprocessor.endOfChunkHit) {
        this.preprocessor.retreat(this.consumedAfterSnapshot);
        this.consumedAfterSnapshot = 0;
        this.active = false;
        return true;
      }
      return false;
    }
    //Consumption
    _consume() {
      this.consumedAfterSnapshot++;
      return this.preprocessor.advance();
    }
    _advanceBy(count) {
      this.consumedAfterSnapshot += count;
      for (let i = 0; i < count; i++) {
        this.preprocessor.advance();
      }
    }
    _consumeSequenceIfMatch(pattern, caseSensitive) {
      if (this.preprocessor.startsWith(pattern, caseSensitive)) {
        this._advanceBy(pattern.length - 1);
        return true;
      }
      return false;
    }
    //Token creation
    _createStartTagToken() {
      this.currentToken = {
        type: token_js_1.TokenType.START_TAG,
        tagName: "",
        tagID: html_js_1.TAG_ID.UNKNOWN,
        selfClosing: false,
        ackSelfClosing: false,
        attrs: [],
        location: this.getCurrentLocation(1)
      };
    }
    _createEndTagToken() {
      this.currentToken = {
        type: token_js_1.TokenType.END_TAG,
        tagName: "",
        tagID: html_js_1.TAG_ID.UNKNOWN,
        selfClosing: false,
        ackSelfClosing: false,
        attrs: [],
        location: this.getCurrentLocation(2)
      };
    }
    _createCommentToken(offset) {
      this.currentToken = {
        type: token_js_1.TokenType.COMMENT,
        data: "",
        location: this.getCurrentLocation(offset)
      };
    }
    _createDoctypeToken(initialName) {
      this.currentToken = {
        type: token_js_1.TokenType.DOCTYPE,
        name: initialName,
        forceQuirks: false,
        publicId: null,
        systemId: null,
        location: this.currentLocation
      };
    }
    _createCharacterToken(type, chars) {
      this.currentCharacterToken = {
        type,
        chars,
        location: this.currentLocation
      };
    }
    //Tag attributes
    _createAttr(attrNameFirstCh) {
      this.currentAttr = {
        name: attrNameFirstCh,
        value: ""
      };
      this.currentLocation = this.getCurrentLocation(0);
    }
    _leaveAttrName() {
      var _a;
      var _b;
      const token2 = this.currentToken;
      if ((0, token_js_1.getTokenAttr)(token2, this.currentAttr.name) === null) {
        token2.attrs.push(this.currentAttr);
        if (token2.location && this.currentLocation) {
          const attrLocations = (_a = (_b = token2.location).attrs) !== null && _a !== void 0 ? _a : _b.attrs = /* @__PURE__ */ Object.create(null);
          attrLocations[this.currentAttr.name] = this.currentLocation;
          this._leaveAttrValue();
        }
      } else {
        this._err(error_codes_js_1.ERR.duplicateAttribute);
      }
    }
    _leaveAttrValue() {
      if (this.currentLocation) {
        this.currentLocation.endLine = this.preprocessor.line;
        this.currentLocation.endCol = this.preprocessor.col;
        this.currentLocation.endOffset = this.preprocessor.offset;
      }
    }
    //Token emission
    prepareToken(ct) {
      this._emitCurrentCharacterToken(ct.location);
      this.currentToken = null;
      if (ct.location) {
        ct.location.endLine = this.preprocessor.line;
        ct.location.endCol = this.preprocessor.col + 1;
        ct.location.endOffset = this.preprocessor.offset + 1;
      }
      this.currentLocation = this.getCurrentLocation(-1);
    }
    emitCurrentTagToken() {
      const ct = this.currentToken;
      this.prepareToken(ct);
      ct.tagID = (0, html_js_1.getTagID)(ct.tagName);
      if (ct.type === token_js_1.TokenType.START_TAG) {
        this.lastStartTagName = ct.tagName;
        this.handler.onStartTag(ct);
      } else {
        if (ct.attrs.length > 0) {
          this._err(error_codes_js_1.ERR.endTagWithAttributes);
        }
        if (ct.selfClosing) {
          this._err(error_codes_js_1.ERR.endTagWithTrailingSolidus);
        }
        this.handler.onEndTag(ct);
      }
      this.preprocessor.dropParsedChunk();
    }
    emitCurrentComment(ct) {
      this.prepareToken(ct);
      this.handler.onComment(ct);
      this.preprocessor.dropParsedChunk();
    }
    emitCurrentDoctype(ct) {
      this.prepareToken(ct);
      this.handler.onDoctype(ct);
      this.preprocessor.dropParsedChunk();
    }
    _emitCurrentCharacterToken(nextLocation) {
      if (this.currentCharacterToken) {
        if (nextLocation && this.currentCharacterToken.location) {
          this.currentCharacterToken.location.endLine = nextLocation.startLine;
          this.currentCharacterToken.location.endCol = nextLocation.startCol;
          this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
        }
        switch (this.currentCharacterToken.type) {
          case token_js_1.TokenType.CHARACTER: {
            this.handler.onCharacter(this.currentCharacterToken);
            break;
          }
          case token_js_1.TokenType.NULL_CHARACTER: {
            this.handler.onNullCharacter(this.currentCharacterToken);
            break;
          }
          case token_js_1.TokenType.WHITESPACE_CHARACTER: {
            this.handler.onWhitespaceCharacter(this.currentCharacterToken);
            break;
          }
        }
        this.currentCharacterToken = null;
      }
    }
    _emitEOFToken() {
      const location = this.getCurrentLocation(0);
      if (location) {
        location.endLine = location.startLine;
        location.endCol = location.startCol;
        location.endOffset = location.startOffset;
      }
      this._emitCurrentCharacterToken(location);
      this.handler.onEof({ type: token_js_1.TokenType.EOF, location });
      this.active = false;
    }
    //Characters emission
    //OPTIMIZATION: The specification uses only one type of character token (one token per character).
    //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
    //If we have a sequence of characters that belong to the same group, the parser can process it
    //as a single solid character token.
    //So, there are 3 types of character tokens in parse5:
    //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
    //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
    //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
    _appendCharToCurrentCharacterToken(type, ch) {
      if (this.currentCharacterToken) {
        if (this.currentCharacterToken.type === type) {
          this.currentCharacterToken.chars += ch;
          return;
        } else {
          this.currentLocation = this.getCurrentLocation(0);
          this._emitCurrentCharacterToken(this.currentLocation);
          this.preprocessor.dropParsedChunk();
        }
      }
      this._createCharacterToken(type, ch);
    }
    _emitCodePoint(cp) {
      const type = isWhitespace(cp) ? token_js_1.TokenType.WHITESPACE_CHARACTER : cp === unicode_js_1.CODE_POINTS.NULL ? token_js_1.TokenType.NULL_CHARACTER : token_js_1.TokenType.CHARACTER;
      this._appendCharToCurrentCharacterToken(type, String.fromCodePoint(cp));
    }
    //NOTE: used when we emit characters explicitly.
    //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
    _emitChars(ch) {
      this._appendCharToCurrentCharacterToken(token_js_1.TokenType.CHARACTER, ch);
    }
    // Character reference helpers
    _startCharacterReference() {
      this.returnState = this.state;
      this.state = State.CHARACTER_REFERENCE;
      this.entityStartPos = this.preprocessor.pos;
      this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? decode_1.DecodingMode.Attribute : decode_1.DecodingMode.Legacy);
    }
    _isCharacterReferenceInAttribute() {
      return this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED;
    }
    _flushCodePointConsumedAsCharacterReference(cp) {
      if (this._isCharacterReferenceInAttribute()) {
        this.currentAttr.value += String.fromCodePoint(cp);
      } else {
        this._emitCodePoint(cp);
      }
    }
    // Calling states this way turns out to be much faster than any other approach.
    _callState(cp) {
      switch (this.state) {
        case State.DATA: {
          this._stateData(cp);
          break;
        }
        case State.RCDATA: {
          this._stateRcdata(cp);
          break;
        }
        case State.RAWTEXT: {
          this._stateRawtext(cp);
          break;
        }
        case State.SCRIPT_DATA: {
          this._stateScriptData(cp);
          break;
        }
        case State.PLAINTEXT: {
          this._statePlaintext(cp);
          break;
        }
        case State.TAG_OPEN: {
          this._stateTagOpen(cp);
          break;
        }
        case State.END_TAG_OPEN: {
          this._stateEndTagOpen(cp);
          break;
        }
        case State.TAG_NAME: {
          this._stateTagName(cp);
          break;
        }
        case State.RCDATA_LESS_THAN_SIGN: {
          this._stateRcdataLessThanSign(cp);
          break;
        }
        case State.RCDATA_END_TAG_OPEN: {
          this._stateRcdataEndTagOpen(cp);
          break;
        }
        case State.RCDATA_END_TAG_NAME: {
          this._stateRcdataEndTagName(cp);
          break;
        }
        case State.RAWTEXT_LESS_THAN_SIGN: {
          this._stateRawtextLessThanSign(cp);
          break;
        }
        case State.RAWTEXT_END_TAG_OPEN: {
          this._stateRawtextEndTagOpen(cp);
          break;
        }
        case State.RAWTEXT_END_TAG_NAME: {
          this._stateRawtextEndTagName(cp);
          break;
        }
        case State.SCRIPT_DATA_LESS_THAN_SIGN: {
          this._stateScriptDataLessThanSign(cp);
          break;
        }
        case State.SCRIPT_DATA_END_TAG_OPEN: {
          this._stateScriptDataEndTagOpen(cp);
          break;
        }
        case State.SCRIPT_DATA_END_TAG_NAME: {
          this._stateScriptDataEndTagName(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPE_START: {
          this._stateScriptDataEscapeStart(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPE_START_DASH: {
          this._stateScriptDataEscapeStartDash(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED: {
          this._stateScriptDataEscaped(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_DASH: {
          this._stateScriptDataEscapedDash(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_DASH_DASH: {
          this._stateScriptDataEscapedDashDash(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
          this._stateScriptDataEscapedLessThanSign(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
          this._stateScriptDataEscapedEndTagOpen(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
          this._stateScriptDataEscapedEndTagName(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
          this._stateScriptDataDoubleEscapeStart(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPED: {
          this._stateScriptDataDoubleEscaped(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
          this._stateScriptDataDoubleEscapedDash(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
          this._stateScriptDataDoubleEscapedDashDash(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
          this._stateScriptDataDoubleEscapedLessThanSign(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
          this._stateScriptDataDoubleEscapeEnd(cp);
          break;
        }
        case State.BEFORE_ATTRIBUTE_NAME: {
          this._stateBeforeAttributeName(cp);
          break;
        }
        case State.ATTRIBUTE_NAME: {
          this._stateAttributeName(cp);
          break;
        }
        case State.AFTER_ATTRIBUTE_NAME: {
          this._stateAfterAttributeName(cp);
          break;
        }
        case State.BEFORE_ATTRIBUTE_VALUE: {
          this._stateBeforeAttributeValue(cp);
          break;
        }
        case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
          this._stateAttributeValueDoubleQuoted(cp);
          break;
        }
        case State.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
          this._stateAttributeValueSingleQuoted(cp);
          break;
        }
        case State.ATTRIBUTE_VALUE_UNQUOTED: {
          this._stateAttributeValueUnquoted(cp);
          break;
        }
        case State.AFTER_ATTRIBUTE_VALUE_QUOTED: {
          this._stateAfterAttributeValueQuoted(cp);
          break;
        }
        case State.SELF_CLOSING_START_TAG: {
          this._stateSelfClosingStartTag(cp);
          break;
        }
        case State.BOGUS_COMMENT: {
          this._stateBogusComment(cp);
          break;
        }
        case State.MARKUP_DECLARATION_OPEN: {
          this._stateMarkupDeclarationOpen(cp);
          break;
        }
        case State.COMMENT_START: {
          this._stateCommentStart(cp);
          break;
        }
        case State.COMMENT_START_DASH: {
          this._stateCommentStartDash(cp);
          break;
        }
        case State.COMMENT: {
          this._stateComment(cp);
          break;
        }
        case State.COMMENT_LESS_THAN_SIGN: {
          this._stateCommentLessThanSign(cp);
          break;
        }
        case State.COMMENT_LESS_THAN_SIGN_BANG: {
          this._stateCommentLessThanSignBang(cp);
          break;
        }
        case State.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
          this._stateCommentLessThanSignBangDash(cp);
          break;
        }
        case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
          this._stateCommentLessThanSignBangDashDash(cp);
          break;
        }
        case State.COMMENT_END_DASH: {
          this._stateCommentEndDash(cp);
          break;
        }
        case State.COMMENT_END: {
          this._stateCommentEnd(cp);
          break;
        }
        case State.COMMENT_END_BANG: {
          this._stateCommentEndBang(cp);
          break;
        }
        case State.DOCTYPE: {
          this._stateDoctype(cp);
          break;
        }
        case State.BEFORE_DOCTYPE_NAME: {
          this._stateBeforeDoctypeName(cp);
          break;
        }
        case State.DOCTYPE_NAME: {
          this._stateDoctypeName(cp);
          break;
        }
        case State.AFTER_DOCTYPE_NAME: {
          this._stateAfterDoctypeName(cp);
          break;
        }
        case State.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
          this._stateAfterDoctypePublicKeyword(cp);
          break;
        }
        case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
          this._stateBeforeDoctypePublicIdentifier(cp);
          break;
        }
        case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
          this._stateDoctypePublicIdentifierDoubleQuoted(cp);
          break;
        }
        case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
          this._stateDoctypePublicIdentifierSingleQuoted(cp);
          break;
        }
        case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
          this._stateAfterDoctypePublicIdentifier(cp);
          break;
        }
        case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
          this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
          break;
        }
        case State.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
          this._stateAfterDoctypeSystemKeyword(cp);
          break;
        }
        case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
          this._stateBeforeDoctypeSystemIdentifier(cp);
          break;
        }
        case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
          this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
          break;
        }
        case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
          this._stateDoctypeSystemIdentifierSingleQuoted(cp);
          break;
        }
        case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
          this._stateAfterDoctypeSystemIdentifier(cp);
          break;
        }
        case State.BOGUS_DOCTYPE: {
          this._stateBogusDoctype(cp);
          break;
        }
        case State.CDATA_SECTION: {
          this._stateCdataSection(cp);
          break;
        }
        case State.CDATA_SECTION_BRACKET: {
          this._stateCdataSectionBracket(cp);
          break;
        }
        case State.CDATA_SECTION_END: {
          this._stateCdataSectionEnd(cp);
          break;
        }
        case State.CHARACTER_REFERENCE: {
          this._stateCharacterReference();
          break;
        }
        case State.AMBIGUOUS_AMPERSAND: {
          this._stateAmbiguousAmpersand(cp);
          break;
        }
        default: {
          throw new Error("Unknown state");
        }
      }
    }
    // State machine
    // Data state
    //------------------------------------------------------------------
    _stateData(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.TAG_OPEN;
          break;
        }
        case unicode_js_1.CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this._emitCodePoint(cp);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    //  RCDATA state
    //------------------------------------------------------------------
    _stateRcdata(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.RCDATA_LESS_THAN_SIGN;
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this._emitChars(unicode_js_1.REPLACEMENT_CHARACTER);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // RAWTEXT state
    //------------------------------------------------------------------
    _stateRawtext(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.RAWTEXT_LESS_THAN_SIGN;
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this._emitChars(unicode_js_1.REPLACEMENT_CHARACTER);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data state
    //------------------------------------------------------------------
    _stateScriptData(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this._emitChars(unicode_js_1.REPLACEMENT_CHARACTER);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // PLAINTEXT state
    //------------------------------------------------------------------
    _statePlaintext(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this._emitChars(unicode_js_1.REPLACEMENT_CHARACTER);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // Tag open state
    //------------------------------------------------------------------
    _stateTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this._createStartTagToken();
        this.state = State.TAG_NAME;
        this._stateTagName(cp);
      } else
        switch (cp) {
          case unicode_js_1.CODE_POINTS.EXCLAMATION_MARK: {
            this.state = State.MARKUP_DECLARATION_OPEN;
            break;
          }
          case unicode_js_1.CODE_POINTS.SOLIDUS: {
            this.state = State.END_TAG_OPEN;
            break;
          }
          case unicode_js_1.CODE_POINTS.QUESTION_MARK: {
            this._err(error_codes_js_1.ERR.unexpectedQuestionMarkInsteadOfTagName);
            this._createCommentToken(1);
            this.state = State.BOGUS_COMMENT;
            this._stateBogusComment(cp);
            break;
          }
          case unicode_js_1.CODE_POINTS.EOF: {
            this._err(error_codes_js_1.ERR.eofBeforeTagName);
            this._emitChars("<");
            this._emitEOFToken();
            break;
          }
          default: {
            this._err(error_codes_js_1.ERR.invalidFirstCharacterOfTagName);
            this._emitChars("<");
            this.state = State.DATA;
            this._stateData(cp);
          }
        }
    }
    // End tag open state
    //------------------------------------------------------------------
    _stateEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this._createEndTagToken();
        this.state = State.TAG_NAME;
        this._stateTagName(cp);
      } else
        switch (cp) {
          case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
            this._err(error_codes_js_1.ERR.missingEndTagName);
            this.state = State.DATA;
            break;
          }
          case unicode_js_1.CODE_POINTS.EOF: {
            this._err(error_codes_js_1.ERR.eofBeforeTagName);
            this._emitChars("</");
            this._emitEOFToken();
            break;
          }
          default: {
            this._err(error_codes_js_1.ERR.invalidFirstCharacterOfTagName);
            this._createCommentToken(2);
            this.state = State.BOGUS_COMMENT;
            this._stateBogusComment(cp);
          }
        }
    }
    // Tag name state
    //------------------------------------------------------------------
    _stateTagName(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          break;
        }
        case unicode_js_1.CODE_POINTS.SOLIDUS: {
          this.state = State.SELF_CLOSING_START_TAG;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          token2.tagName += unicode_js_1.REPLACEMENT_CHARACTER;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          token2.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
        }
      }
    }
    // RCDATA less-than sign state
    //------------------------------------------------------------------
    _stateRcdataLessThanSign(cp) {
      if (cp === unicode_js_1.CODE_POINTS.SOLIDUS) {
        this.state = State.RCDATA_END_TAG_OPEN;
      } else {
        this._emitChars("<");
        this.state = State.RCDATA;
        this._stateRcdata(cp);
      }
    }
    // RCDATA end tag open state
    //------------------------------------------------------------------
    _stateRcdataEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this.state = State.RCDATA_END_TAG_NAME;
        this._stateRcdataEndTagName(cp);
      } else {
        this._emitChars("</");
        this.state = State.RCDATA;
        this._stateRcdata(cp);
      }
    }
    handleSpecialEndTag(_cp) {
      if (!this.preprocessor.startsWith(this.lastStartTagName, false)) {
        return !this._ensureHibernation();
      }
      this._createEndTagToken();
      const token2 = this.currentToken;
      token2.tagName = this.lastStartTagName;
      const cp = this.preprocessor.peek(this.lastStartTagName.length);
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          this._advanceBy(this.lastStartTagName.length);
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          return false;
        }
        case unicode_js_1.CODE_POINTS.SOLIDUS: {
          this._advanceBy(this.lastStartTagName.length);
          this.state = State.SELF_CLOSING_START_TAG;
          return false;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._advanceBy(this.lastStartTagName.length);
          this.emitCurrentTagToken();
          this.state = State.DATA;
          return false;
        }
        default: {
          return !this._ensureHibernation();
        }
      }
    }
    // RCDATA end tag name state
    //------------------------------------------------------------------
    _stateRcdataEndTagName(cp) {
      if (this.handleSpecialEndTag(cp)) {
        this._emitChars("</");
        this.state = State.RCDATA;
        this._stateRcdata(cp);
      }
    }
    // RAWTEXT less-than sign state
    //------------------------------------------------------------------
    _stateRawtextLessThanSign(cp) {
      if (cp === unicode_js_1.CODE_POINTS.SOLIDUS) {
        this.state = State.RAWTEXT_END_TAG_OPEN;
      } else {
        this._emitChars("<");
        this.state = State.RAWTEXT;
        this._stateRawtext(cp);
      }
    }
    // RAWTEXT end tag open state
    //------------------------------------------------------------------
    _stateRawtextEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this.state = State.RAWTEXT_END_TAG_NAME;
        this._stateRawtextEndTagName(cp);
      } else {
        this._emitChars("</");
        this.state = State.RAWTEXT;
        this._stateRawtext(cp);
      }
    }
    // RAWTEXT end tag name state
    //------------------------------------------------------------------
    _stateRawtextEndTagName(cp) {
      if (this.handleSpecialEndTag(cp)) {
        this._emitChars("</");
        this.state = State.RAWTEXT;
        this._stateRawtext(cp);
      }
    }
    // Script data less-than sign state
    //------------------------------------------------------------------
    _stateScriptDataLessThanSign(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SOLIDUS: {
          this.state = State.SCRIPT_DATA_END_TAG_OPEN;
          break;
        }
        case unicode_js_1.CODE_POINTS.EXCLAMATION_MARK: {
          this.state = State.SCRIPT_DATA_ESCAPE_START;
          this._emitChars("<!");
          break;
        }
        default: {
          this._emitChars("<");
          this.state = State.SCRIPT_DATA;
          this._stateScriptData(cp);
        }
      }
    }
    // Script data end tag open state
    //------------------------------------------------------------------
    _stateScriptDataEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this.state = State.SCRIPT_DATA_END_TAG_NAME;
        this._stateScriptDataEndTagName(cp);
      } else {
        this._emitChars("</");
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
    // Script data end tag name state
    //------------------------------------------------------------------
    _stateScriptDataEndTagName(cp) {
      if (this.handleSpecialEndTag(cp)) {
        this._emitChars("</");
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
    // Script data escape start state
    //------------------------------------------------------------------
    _stateScriptDataEscapeStart(cp) {
      if (cp === unicode_js_1.CODE_POINTS.HYPHEN_MINUS) {
        this.state = State.SCRIPT_DATA_ESCAPE_START_DASH;
        this._emitChars("-");
      } else {
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
    // Script data escape start dash state
    //------------------------------------------------------------------
    _stateScriptDataEscapeStartDash(cp) {
      if (cp === unicode_js_1.CODE_POINTS.HYPHEN_MINUS) {
        this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
        this._emitChars("-");
      } else {
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
    // Script data escaped state
    //------------------------------------------------------------------
    _stateScriptDataEscaped(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.SCRIPT_DATA_ESCAPED_DASH;
          this._emitChars("-");
          break;
        }
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this._emitChars(unicode_js_1.REPLACEMENT_CHARACTER);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data escaped dash state
    //------------------------------------------------------------------
    _stateScriptDataEscapedDash(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
          this._emitChars("-");
          break;
        }
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this.state = State.SCRIPT_DATA_ESCAPED;
          this._emitChars(unicode_js_1.REPLACEMENT_CHARACTER);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this.state = State.SCRIPT_DATA_ESCAPED;
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data escaped dash dash state
    //------------------------------------------------------------------
    _stateScriptDataEscapedDashDash(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.HYPHEN_MINUS: {
          this._emitChars("-");
          break;
        }
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.SCRIPT_DATA;
          this._emitChars(">");
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this.state = State.SCRIPT_DATA_ESCAPED;
          this._emitChars(unicode_js_1.REPLACEMENT_CHARACTER);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this.state = State.SCRIPT_DATA_ESCAPED;
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data escaped less-than sign state
    //------------------------------------------------------------------
    _stateScriptDataEscapedLessThanSign(cp) {
      if (cp === unicode_js_1.CODE_POINTS.SOLIDUS) {
        this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
      } else if (isAsciiLetter(cp)) {
        this._emitChars("<");
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
        this._stateScriptDataDoubleEscapeStart(cp);
      } else {
        this._emitChars("<");
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._stateScriptDataEscaped(cp);
      }
    }
    // Script data escaped end tag open state
    //------------------------------------------------------------------
    _stateScriptDataEscapedEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
        this._stateScriptDataEscapedEndTagName(cp);
      } else {
        this._emitChars("</");
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._stateScriptDataEscaped(cp);
      }
    }
    // Script data escaped end tag name state
    //------------------------------------------------------------------
    _stateScriptDataEscapedEndTagName(cp) {
      if (this.handleSpecialEndTag(cp)) {
        this._emitChars("</");
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._stateScriptDataEscaped(cp);
      }
    }
    // Script data double escape start state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapeStart(cp) {
      if (this.preprocessor.startsWith(unicode_js_1.SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(unicode_js_1.SEQUENCES.SCRIPT.length))) {
        this._emitCodePoint(cp);
        for (let i = 0; i < unicode_js_1.SEQUENCES.SCRIPT.length; i++) {
          this._emitCodePoint(this._consume());
        }
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
      } else if (!this._ensureHibernation()) {
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._stateScriptDataEscaped(cp);
      }
    }
    // Script data double escaped state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscaped(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
          this._emitChars("-");
          break;
        }
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
          this._emitChars("<");
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this._emitChars(unicode_js_1.REPLACEMENT_CHARACTER);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data double escaped dash state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapedDash(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
          this._emitChars("-");
          break;
        }
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
          this._emitChars("<");
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          this._emitChars(unicode_js_1.REPLACEMENT_CHARACTER);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data double escaped dash dash state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapedDashDash(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.HYPHEN_MINUS: {
          this._emitChars("-");
          break;
        }
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
          this._emitChars("<");
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.SCRIPT_DATA;
          this._emitChars(">");
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          this._emitChars(unicode_js_1.REPLACEMENT_CHARACTER);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data double escaped less-than sign state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapedLessThanSign(cp) {
      if (cp === unicode_js_1.CODE_POINTS.SOLIDUS) {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END;
        this._emitChars("/");
      } else {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._stateScriptDataDoubleEscaped(cp);
      }
    }
    // Script data double escape end state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapeEnd(cp) {
      if (this.preprocessor.startsWith(unicode_js_1.SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(unicode_js_1.SEQUENCES.SCRIPT.length))) {
        this._emitCodePoint(cp);
        for (let i = 0; i < unicode_js_1.SEQUENCES.SCRIPT.length; i++) {
          this._emitCodePoint(this._consume());
        }
        this.state = State.SCRIPT_DATA_ESCAPED;
      } else if (!this._ensureHibernation()) {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._stateScriptDataDoubleEscaped(cp);
      }
    }
    // Before attribute name state
    //------------------------------------------------------------------
    _stateBeforeAttributeName(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          break;
        }
        case unicode_js_1.CODE_POINTS.SOLIDUS:
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN:
        case unicode_js_1.CODE_POINTS.EOF: {
          this.state = State.AFTER_ATTRIBUTE_NAME;
          this._stateAfterAttributeName(cp);
          break;
        }
        case unicode_js_1.CODE_POINTS.EQUALS_SIGN: {
          this._err(error_codes_js_1.ERR.unexpectedEqualsSignBeforeAttributeName);
          this._createAttr("=");
          this.state = State.ATTRIBUTE_NAME;
          break;
        }
        default: {
          this._createAttr("");
          this.state = State.ATTRIBUTE_NAME;
          this._stateAttributeName(cp);
        }
      }
    }
    // Attribute name state
    //------------------------------------------------------------------
    _stateAttributeName(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED:
        case unicode_js_1.CODE_POINTS.SOLIDUS:
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN:
        case unicode_js_1.CODE_POINTS.EOF: {
          this._leaveAttrName();
          this.state = State.AFTER_ATTRIBUTE_NAME;
          this._stateAfterAttributeName(cp);
          break;
        }
        case unicode_js_1.CODE_POINTS.EQUALS_SIGN: {
          this._leaveAttrName();
          this.state = State.BEFORE_ATTRIBUTE_VALUE;
          break;
        }
        case unicode_js_1.CODE_POINTS.QUOTATION_MARK:
        case unicode_js_1.CODE_POINTS.APOSTROPHE:
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.unexpectedCharacterInAttributeName);
          this.currentAttr.name += String.fromCodePoint(cp);
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this.currentAttr.name += unicode_js_1.REPLACEMENT_CHARACTER;
          break;
        }
        default: {
          this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
        }
      }
    }
    // After attribute name state
    //------------------------------------------------------------------
    _stateAfterAttributeName(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          break;
        }
        case unicode_js_1.CODE_POINTS.SOLIDUS: {
          this.state = State.SELF_CLOSING_START_TAG;
          break;
        }
        case unicode_js_1.CODE_POINTS.EQUALS_SIGN: {
          this.state = State.BEFORE_ATTRIBUTE_VALUE;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this._createAttr("");
          this.state = State.ATTRIBUTE_NAME;
          this._stateAttributeName(cp);
        }
      }
    }
    // Before attribute value state
    //------------------------------------------------------------------
    _stateBeforeAttributeValue(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          break;
        }
        case unicode_js_1.CODE_POINTS.QUOTATION_MARK: {
          this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.APOSTROPHE: {
          this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.missingAttributeValue);
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        default: {
          this.state = State.ATTRIBUTE_VALUE_UNQUOTED;
          this._stateAttributeValueUnquoted(cp);
        }
      }
    }
    // Attribute value (double-quoted) state
    //------------------------------------------------------------------
    _stateAttributeValueDoubleQuoted(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.QUOTATION_MARK: {
          this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this.currentAttr.value += unicode_js_1.REPLACEMENT_CHARACTER;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this.currentAttr.value += String.fromCodePoint(cp);
        }
      }
    }
    // Attribute value (single-quoted) state
    //------------------------------------------------------------------
    _stateAttributeValueSingleQuoted(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.APOSTROPHE: {
          this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this.currentAttr.value += unicode_js_1.REPLACEMENT_CHARACTER;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this.currentAttr.value += String.fromCodePoint(cp);
        }
      }
    }
    // Attribute value (unquoted) state
    //------------------------------------------------------------------
    _stateAttributeValueUnquoted(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          this._leaveAttrValue();
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          break;
        }
        case unicode_js_1.CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._leaveAttrValue();
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          this.currentAttr.value += unicode_js_1.REPLACEMENT_CHARACTER;
          break;
        }
        case unicode_js_1.CODE_POINTS.QUOTATION_MARK:
        case unicode_js_1.CODE_POINTS.APOSTROPHE:
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN:
        case unicode_js_1.CODE_POINTS.EQUALS_SIGN:
        case unicode_js_1.CODE_POINTS.GRAVE_ACCENT: {
          this._err(error_codes_js_1.ERR.unexpectedCharacterInUnquotedAttributeValue);
          this.currentAttr.value += String.fromCodePoint(cp);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this.currentAttr.value += String.fromCodePoint(cp);
        }
      }
    }
    // After attribute value (quoted) state
    //------------------------------------------------------------------
    _stateAfterAttributeValueQuoted(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          this._leaveAttrValue();
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          break;
        }
        case unicode_js_1.CODE_POINTS.SOLIDUS: {
          this._leaveAttrValue();
          this.state = State.SELF_CLOSING_START_TAG;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._leaveAttrValue();
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(error_codes_js_1.ERR.missingWhitespaceBetweenAttributes);
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          this._stateBeforeAttributeName(cp);
        }
      }
    }
    // Self-closing start tag state
    //------------------------------------------------------------------
    _stateSelfClosingStartTag(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          const token2 = this.currentToken;
          token2.selfClosing = true;
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(error_codes_js_1.ERR.unexpectedSolidusInTag);
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          this._stateBeforeAttributeName(cp);
        }
      }
    }
    // Bogus comment state
    //------------------------------------------------------------------
    _stateBogusComment(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentComment(token2);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this.emitCurrentComment(token2);
          this._emitEOFToken();
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          token2.data += unicode_js_1.REPLACEMENT_CHARACTER;
          break;
        }
        default: {
          token2.data += String.fromCodePoint(cp);
        }
      }
    }
    // Markup declaration open state
    //------------------------------------------------------------------
    _stateMarkupDeclarationOpen(cp) {
      if (this._consumeSequenceIfMatch(unicode_js_1.SEQUENCES.DASH_DASH, true)) {
        this._createCommentToken(unicode_js_1.SEQUENCES.DASH_DASH.length + 1);
        this.state = State.COMMENT_START;
      } else if (this._consumeSequenceIfMatch(unicode_js_1.SEQUENCES.DOCTYPE, false)) {
        this.currentLocation = this.getCurrentLocation(unicode_js_1.SEQUENCES.DOCTYPE.length + 1);
        this.state = State.DOCTYPE;
      } else if (this._consumeSequenceIfMatch(unicode_js_1.SEQUENCES.CDATA_START, true)) {
        if (this.inForeignNode) {
          this.state = State.CDATA_SECTION;
        } else {
          this._err(error_codes_js_1.ERR.cdataInHtmlContent);
          this._createCommentToken(unicode_js_1.SEQUENCES.CDATA_START.length + 1);
          this.currentToken.data = "[CDATA[";
          this.state = State.BOGUS_COMMENT;
        }
      } else if (!this._ensureHibernation()) {
        this._err(error_codes_js_1.ERR.incorrectlyOpenedComment);
        this._createCommentToken(2);
        this.state = State.BOGUS_COMMENT;
        this._stateBogusComment(cp);
      }
    }
    // Comment start state
    //------------------------------------------------------------------
    _stateCommentStart(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.COMMENT_START_DASH;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.abruptClosingOfEmptyComment);
          this.state = State.DATA;
          const token2 = this.currentToken;
          this.emitCurrentComment(token2);
          break;
        }
        default: {
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment start dash state
    //------------------------------------------------------------------
    _stateCommentStartDash(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.COMMENT_END;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.abruptClosingOfEmptyComment);
          this.state = State.DATA;
          this.emitCurrentComment(token2);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInComment);
          this.emitCurrentComment(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          token2.data += "-";
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment state
    //------------------------------------------------------------------
    _stateComment(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.COMMENT_END_DASH;
          break;
        }
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          token2.data += "<";
          this.state = State.COMMENT_LESS_THAN_SIGN;
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          token2.data += unicode_js_1.REPLACEMENT_CHARACTER;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInComment);
          this.emitCurrentComment(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          token2.data += String.fromCodePoint(cp);
        }
      }
    }
    // Comment less-than sign state
    //------------------------------------------------------------------
    _stateCommentLessThanSign(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.EXCLAMATION_MARK: {
          token2.data += "!";
          this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
          break;
        }
        case unicode_js_1.CODE_POINTS.LESS_THAN_SIGN: {
          token2.data += "<";
          break;
        }
        default: {
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment less-than sign bang state
    //------------------------------------------------------------------
    _stateCommentLessThanSignBang(cp) {
      if (cp === unicode_js_1.CODE_POINTS.HYPHEN_MINUS) {
        this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH;
      } else {
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
    // Comment less-than sign bang dash state
    //------------------------------------------------------------------
    _stateCommentLessThanSignBangDash(cp) {
      if (cp === unicode_js_1.CODE_POINTS.HYPHEN_MINUS) {
        this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
      } else {
        this.state = State.COMMENT_END_DASH;
        this._stateCommentEndDash(cp);
      }
    }
    // Comment less-than sign bang dash dash state
    //------------------------------------------------------------------
    _stateCommentLessThanSignBangDashDash(cp) {
      if (cp !== unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN && cp !== unicode_js_1.CODE_POINTS.EOF) {
        this._err(error_codes_js_1.ERR.nestedComment);
      }
      this.state = State.COMMENT_END;
      this._stateCommentEnd(cp);
    }
    // Comment end dash state
    //------------------------------------------------------------------
    _stateCommentEndDash(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.COMMENT_END;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInComment);
          this.emitCurrentComment(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          token2.data += "-";
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment end state
    //------------------------------------------------------------------
    _stateCommentEnd(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentComment(token2);
          break;
        }
        case unicode_js_1.CODE_POINTS.EXCLAMATION_MARK: {
          this.state = State.COMMENT_END_BANG;
          break;
        }
        case unicode_js_1.CODE_POINTS.HYPHEN_MINUS: {
          token2.data += "-";
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInComment);
          this.emitCurrentComment(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          token2.data += "--";
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment end bang state
    //------------------------------------------------------------------
    _stateCommentEndBang(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.HYPHEN_MINUS: {
          token2.data += "--!";
          this.state = State.COMMENT_END_DASH;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.incorrectlyClosedComment);
          this.state = State.DATA;
          this.emitCurrentComment(token2);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInComment);
          this.emitCurrentComment(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          token2.data += "--!";
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // DOCTYPE state
    //------------------------------------------------------------------
    _stateDoctype(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          this.state = State.BEFORE_DOCTYPE_NAME;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.BEFORE_DOCTYPE_NAME;
          this._stateBeforeDoctypeName(cp);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          this._createDoctypeToken(null);
          const token2 = this.currentToken;
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(error_codes_js_1.ERR.missingWhitespaceBeforeDoctypeName);
          this.state = State.BEFORE_DOCTYPE_NAME;
          this._stateBeforeDoctypeName(cp);
        }
      }
    }
    // Before DOCTYPE name state
    //------------------------------------------------------------------
    _stateBeforeDoctypeName(cp) {
      if (isAsciiUpper(cp)) {
        this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
        this.state = State.DOCTYPE_NAME;
      } else
        switch (cp) {
          case unicode_js_1.CODE_POINTS.SPACE:
          case unicode_js_1.CODE_POINTS.LINE_FEED:
          case unicode_js_1.CODE_POINTS.TABULATION:
          case unicode_js_1.CODE_POINTS.FORM_FEED: {
            break;
          }
          case unicode_js_1.CODE_POINTS.NULL: {
            this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
            this._createDoctypeToken(unicode_js_1.REPLACEMENT_CHARACTER);
            this.state = State.DOCTYPE_NAME;
            break;
          }
          case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
            this._err(error_codes_js_1.ERR.missingDoctypeName);
            this._createDoctypeToken(null);
            const token2 = this.currentToken;
            token2.forceQuirks = true;
            this.emitCurrentDoctype(token2);
            this.state = State.DATA;
            break;
          }
          case unicode_js_1.CODE_POINTS.EOF: {
            this._err(error_codes_js_1.ERR.eofInDoctype);
            this._createDoctypeToken(null);
            const token2 = this.currentToken;
            token2.forceQuirks = true;
            this.emitCurrentDoctype(token2);
            this._emitEOFToken();
            break;
          }
          default: {
            this._createDoctypeToken(String.fromCodePoint(cp));
            this.state = State.DOCTYPE_NAME;
          }
        }
    }
    // DOCTYPE name state
    //------------------------------------------------------------------
    _stateDoctypeName(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          this.state = State.AFTER_DOCTYPE_NAME;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentDoctype(token2);
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          token2.name += unicode_js_1.REPLACEMENT_CHARACTER;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          token2.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
        }
      }
    }
    // After DOCTYPE name state
    //------------------------------------------------------------------
    _stateAfterDoctypeName(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentDoctype(token2);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          if (this._consumeSequenceIfMatch(unicode_js_1.SEQUENCES.PUBLIC, false)) {
            this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD;
          } else if (this._consumeSequenceIfMatch(unicode_js_1.SEQUENCES.SYSTEM, false)) {
            this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD;
          } else if (!this._ensureHibernation()) {
            this._err(error_codes_js_1.ERR.invalidCharacterSequenceAfterDoctypeName);
            token2.forceQuirks = true;
            this.state = State.BOGUS_DOCTYPE;
            this._stateBogusDoctype(cp);
          }
        }
      }
    }
    // After DOCTYPE public keyword state
    //------------------------------------------------------------------
    _stateAfterDoctypePublicKeyword(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        }
        case unicode_js_1.CODE_POINTS.QUOTATION_MARK: {
          this._err(error_codes_js_1.ERR.missingWhitespaceAfterDoctypePublicKeyword);
          token2.publicId = "";
          this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.APOSTROPHE: {
          this._err(error_codes_js_1.ERR.missingWhitespaceAfterDoctypePublicKeyword);
          token2.publicId = "";
          this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.missingDoctypePublicIdentifier);
          token2.forceQuirks = true;
          this.state = State.DATA;
          this.emitCurrentDoctype(token2);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(error_codes_js_1.ERR.missingQuoteBeforeDoctypePublicIdentifier);
          token2.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // Before DOCTYPE public identifier state
    //------------------------------------------------------------------
    _stateBeforeDoctypePublicIdentifier(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          break;
        }
        case unicode_js_1.CODE_POINTS.QUOTATION_MARK: {
          token2.publicId = "";
          this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.APOSTROPHE: {
          token2.publicId = "";
          this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.missingDoctypePublicIdentifier);
          token2.forceQuirks = true;
          this.state = State.DATA;
          this.emitCurrentDoctype(token2);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(error_codes_js_1.ERR.missingQuoteBeforeDoctypePublicIdentifier);
          token2.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // DOCTYPE public identifier (double-quoted) state
    //------------------------------------------------------------------
    _stateDoctypePublicIdentifierDoubleQuoted(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.QUOTATION_MARK: {
          this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          token2.publicId += unicode_js_1.REPLACEMENT_CHARACTER;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.abruptDoctypePublicIdentifier);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this.state = State.DATA;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          token2.publicId += String.fromCodePoint(cp);
        }
      }
    }
    // DOCTYPE public identifier (single-quoted) state
    //------------------------------------------------------------------
    _stateDoctypePublicIdentifierSingleQuoted(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.APOSTROPHE: {
          this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          token2.publicId += unicode_js_1.REPLACEMENT_CHARACTER;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.abruptDoctypePublicIdentifier);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this.state = State.DATA;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          token2.publicId += String.fromCodePoint(cp);
        }
      }
    }
    // After DOCTYPE public identifier state
    //------------------------------------------------------------------
    _stateAfterDoctypePublicIdentifier(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentDoctype(token2);
          break;
        }
        case unicode_js_1.CODE_POINTS.QUOTATION_MARK: {
          this._err(error_codes_js_1.ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
          token2.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.APOSTROPHE: {
          this._err(error_codes_js_1.ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
          token2.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(error_codes_js_1.ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          token2.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // Between DOCTYPE public and system identifiers state
    //------------------------------------------------------------------
    _stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.emitCurrentDoctype(token2);
          this.state = State.DATA;
          break;
        }
        case unicode_js_1.CODE_POINTS.QUOTATION_MARK: {
          token2.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.APOSTROPHE: {
          token2.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(error_codes_js_1.ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          token2.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // After DOCTYPE system keyword state
    //------------------------------------------------------------------
    _stateAfterDoctypeSystemKeyword(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        }
        case unicode_js_1.CODE_POINTS.QUOTATION_MARK: {
          this._err(error_codes_js_1.ERR.missingWhitespaceAfterDoctypeSystemKeyword);
          token2.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.APOSTROPHE: {
          this._err(error_codes_js_1.ERR.missingWhitespaceAfterDoctypeSystemKeyword);
          token2.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.missingDoctypeSystemIdentifier);
          token2.forceQuirks = true;
          this.state = State.DATA;
          this.emitCurrentDoctype(token2);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(error_codes_js_1.ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          token2.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // Before DOCTYPE system identifier state
    //------------------------------------------------------------------
    _stateBeforeDoctypeSystemIdentifier(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          break;
        }
        case unicode_js_1.CODE_POINTS.QUOTATION_MARK: {
          token2.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.APOSTROPHE: {
          token2.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.missingDoctypeSystemIdentifier);
          token2.forceQuirks = true;
          this.state = State.DATA;
          this.emitCurrentDoctype(token2);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(error_codes_js_1.ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          token2.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // DOCTYPE system identifier (double-quoted) state
    //------------------------------------------------------------------
    _stateDoctypeSystemIdentifierDoubleQuoted(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.QUOTATION_MARK: {
          this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          token2.systemId += unicode_js_1.REPLACEMENT_CHARACTER;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.abruptDoctypeSystemIdentifier);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this.state = State.DATA;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          token2.systemId += String.fromCodePoint(cp);
        }
      }
    }
    // DOCTYPE system identifier (single-quoted) state
    //------------------------------------------------------------------
    _stateDoctypeSystemIdentifierSingleQuoted(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.APOSTROPHE: {
          this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          token2.systemId += unicode_js_1.REPLACEMENT_CHARACTER;
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(error_codes_js_1.ERR.abruptDoctypeSystemIdentifier);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this.state = State.DATA;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          token2.systemId += String.fromCodePoint(cp);
        }
      }
    }
    // After DOCTYPE system identifier state
    //------------------------------------------------------------------
    _stateAfterDoctypeSystemIdentifier(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.SPACE:
        case unicode_js_1.CODE_POINTS.LINE_FEED:
        case unicode_js_1.CODE_POINTS.TABULATION:
        case unicode_js_1.CODE_POINTS.FORM_FEED: {
          break;
        }
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.emitCurrentDoctype(token2);
          this.state = State.DATA;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInDoctype);
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(error_codes_js_1.ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // Bogus DOCTYPE state
    //------------------------------------------------------------------
    _stateBogusDoctype(cp) {
      const token2 = this.currentToken;
      switch (cp) {
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.emitCurrentDoctype(token2);
          this.state = State.DATA;
          break;
        }
        case unicode_js_1.CODE_POINTS.NULL: {
          this._err(error_codes_js_1.ERR.unexpectedNullCharacter);
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
      }
    }
    // CDATA section state
    //------------------------------------------------------------------
    _stateCdataSection(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.RIGHT_SQUARE_BRACKET: {
          this.state = State.CDATA_SECTION_BRACKET;
          break;
        }
        case unicode_js_1.CODE_POINTS.EOF: {
          this._err(error_codes_js_1.ERR.eofInCdata);
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // CDATA section bracket state
    //------------------------------------------------------------------
    _stateCdataSectionBracket(cp) {
      if (cp === unicode_js_1.CODE_POINTS.RIGHT_SQUARE_BRACKET) {
        this.state = State.CDATA_SECTION_END;
      } else {
        this._emitChars("]");
        this.state = State.CDATA_SECTION;
        this._stateCdataSection(cp);
      }
    }
    // CDATA section end state
    //------------------------------------------------------------------
    _stateCdataSectionEnd(cp) {
      switch (cp) {
        case unicode_js_1.CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          break;
        }
        case unicode_js_1.CODE_POINTS.RIGHT_SQUARE_BRACKET: {
          this._emitChars("]");
          break;
        }
        default: {
          this._emitChars("]]");
          this.state = State.CDATA_SECTION;
          this._stateCdataSection(cp);
        }
      }
    }
    // Character reference state
    //------------------------------------------------------------------
    _stateCharacterReference() {
      let length = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
      if (length < 0) {
        if (this.preprocessor.lastChunkWritten) {
          length = this.entityDecoder.end();
        } else {
          this.active = false;
          this.preprocessor.pos = this.preprocessor.html.length - 1;
          this.consumedAfterSnapshot = 0;
          this.preprocessor.endOfChunkHit = true;
          return;
        }
      }
      if (length === 0) {
        this.preprocessor.pos = this.entityStartPos;
        this._flushCodePointConsumedAsCharacterReference(unicode_js_1.CODE_POINTS.AMPERSAND);
        this.state = !this._isCharacterReferenceInAttribute() && isAsciiAlphaNumeric(this.preprocessor.peek(1)) ? State.AMBIGUOUS_AMPERSAND : this.returnState;
      } else {
        this.state = this.returnState;
      }
    }
    // Ambiguos ampersand state
    //------------------------------------------------------------------
    _stateAmbiguousAmpersand(cp) {
      if (isAsciiAlphaNumeric(cp)) {
        this._flushCodePointConsumedAsCharacterReference(cp);
      } else {
        if (cp === unicode_js_1.CODE_POINTS.SEMICOLON) {
          this._err(error_codes_js_1.ERR.unknownNamedCharacterReference);
        }
        this.state = this.returnState;
        this._callState(cp);
      }
    }
  }
  tokenizer.Tokenizer = Tokenizer;
  return tokenizer;
}
var openElementStack = {};
var hasRequiredOpenElementStack;
function requireOpenElementStack() {
  if (hasRequiredOpenElementStack) return openElementStack;
  hasRequiredOpenElementStack = 1;
  Object.defineProperty(openElementStack, "__esModule", { value: true });
  openElementStack.OpenElementStack = void 0;
  const html_js_1 = requireHtml();
  const IMPLICIT_END_TAG_REQUIRED = /* @__PURE__ */ new Set([html_js_1.TAG_ID.DD, html_js_1.TAG_ID.DT, html_js_1.TAG_ID.LI, html_js_1.TAG_ID.OPTGROUP, html_js_1.TAG_ID.OPTION, html_js_1.TAG_ID.P, html_js_1.TAG_ID.RB, html_js_1.TAG_ID.RP, html_js_1.TAG_ID.RT, html_js_1.TAG_ID.RTC]);
  const IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = /* @__PURE__ */ new Set([
    ...IMPLICIT_END_TAG_REQUIRED,
    html_js_1.TAG_ID.CAPTION,
    html_js_1.TAG_ID.COLGROUP,
    html_js_1.TAG_ID.TBODY,
    html_js_1.TAG_ID.TD,
    html_js_1.TAG_ID.TFOOT,
    html_js_1.TAG_ID.TH,
    html_js_1.TAG_ID.THEAD,
    html_js_1.TAG_ID.TR
  ]);
  const SCOPING_ELEMENTS_HTML = /* @__PURE__ */ new Set([
    html_js_1.TAG_ID.APPLET,
    html_js_1.TAG_ID.CAPTION,
    html_js_1.TAG_ID.HTML,
    html_js_1.TAG_ID.MARQUEE,
    html_js_1.TAG_ID.OBJECT,
    html_js_1.TAG_ID.TABLE,
    html_js_1.TAG_ID.TD,
    html_js_1.TAG_ID.TEMPLATE,
    html_js_1.TAG_ID.TH
  ]);
  const SCOPING_ELEMENTS_HTML_LIST = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, html_js_1.TAG_ID.OL, html_js_1.TAG_ID.UL]);
  const SCOPING_ELEMENTS_HTML_BUTTON = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, html_js_1.TAG_ID.BUTTON]);
  const SCOPING_ELEMENTS_MATHML = /* @__PURE__ */ new Set([html_js_1.TAG_ID.ANNOTATION_XML, html_js_1.TAG_ID.MI, html_js_1.TAG_ID.MN, html_js_1.TAG_ID.MO, html_js_1.TAG_ID.MS, html_js_1.TAG_ID.MTEXT]);
  const SCOPING_ELEMENTS_SVG = /* @__PURE__ */ new Set([html_js_1.TAG_ID.DESC, html_js_1.TAG_ID.FOREIGN_OBJECT, html_js_1.TAG_ID.TITLE]);
  const TABLE_ROW_CONTEXT = /* @__PURE__ */ new Set([html_js_1.TAG_ID.TR, html_js_1.TAG_ID.TEMPLATE, html_js_1.TAG_ID.HTML]);
  const TABLE_BODY_CONTEXT = /* @__PURE__ */ new Set([html_js_1.TAG_ID.TBODY, html_js_1.TAG_ID.TFOOT, html_js_1.TAG_ID.THEAD, html_js_1.TAG_ID.TEMPLATE, html_js_1.TAG_ID.HTML]);
  const TABLE_CONTEXT = /* @__PURE__ */ new Set([html_js_1.TAG_ID.TABLE, html_js_1.TAG_ID.TEMPLATE, html_js_1.TAG_ID.HTML]);
  const TABLE_CELLS = /* @__PURE__ */ new Set([html_js_1.TAG_ID.TD, html_js_1.TAG_ID.TH]);
  class OpenElementStack {
    get currentTmplContentOrNode() {
      return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
    }
    constructor(document, treeAdapter, handler) {
      this.treeAdapter = treeAdapter;
      this.handler = handler;
      this.items = [];
      this.tagIDs = [];
      this.stackTop = -1;
      this.tmplCount = 0;
      this.currentTagId = html_js_1.TAG_ID.UNKNOWN;
      this.current = document;
    }
    //Index of element
    _indexOf(element) {
      return this.items.lastIndexOf(element, this.stackTop);
    }
    //Update current element
    _isInTemplate() {
      return this.currentTagId === html_js_1.TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === html_js_1.NS.HTML;
    }
    _updateCurrentElement() {
      this.current = this.items[this.stackTop];
      this.currentTagId = this.tagIDs[this.stackTop];
    }
    //Mutations
    push(element, tagID) {
      this.stackTop++;
      this.items[this.stackTop] = element;
      this.current = element;
      this.tagIDs[this.stackTop] = tagID;
      this.currentTagId = tagID;
      if (this._isInTemplate()) {
        this.tmplCount++;
      }
      this.handler.onItemPush(element, tagID, true);
    }
    pop() {
      const popped = this.current;
      if (this.tmplCount > 0 && this._isInTemplate()) {
        this.tmplCount--;
      }
      this.stackTop--;
      this._updateCurrentElement();
      this.handler.onItemPop(popped, true);
    }
    replace(oldElement, newElement) {
      const idx = this._indexOf(oldElement);
      this.items[idx] = newElement;
      if (idx === this.stackTop) {
        this.current = newElement;
      }
    }
    insertAfter(referenceElement, newElement, newElementID) {
      const insertionIdx = this._indexOf(referenceElement) + 1;
      this.items.splice(insertionIdx, 0, newElement);
      this.tagIDs.splice(insertionIdx, 0, newElementID);
      this.stackTop++;
      if (insertionIdx === this.stackTop) {
        this._updateCurrentElement();
      }
      if (this.current && this.currentTagId !== void 0) {
        this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
      }
    }
    popUntilTagNamePopped(tagName) {
      let targetIdx = this.stackTop + 1;
      do {
        targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
      } while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== html_js_1.NS.HTML);
      this.shortenToLength(Math.max(targetIdx, 0));
    }
    shortenToLength(idx) {
      while (this.stackTop >= idx) {
        const popped = this.current;
        if (this.tmplCount > 0 && this._isInTemplate()) {
          this.tmplCount -= 1;
        }
        this.stackTop--;
        this._updateCurrentElement();
        this.handler.onItemPop(popped, this.stackTop < idx);
      }
    }
    popUntilElementPopped(element) {
      const idx = this._indexOf(element);
      this.shortenToLength(Math.max(idx, 0));
    }
    popUntilPopped(tagNames, targetNS) {
      const idx = this._indexOfTagNames(tagNames, targetNS);
      this.shortenToLength(Math.max(idx, 0));
    }
    popUntilNumberedHeaderPopped() {
      this.popUntilPopped(html_js_1.NUMBERED_HEADERS, html_js_1.NS.HTML);
    }
    popUntilTableCellPopped() {
      this.popUntilPopped(TABLE_CELLS, html_js_1.NS.HTML);
    }
    popAllUpToHtmlElement() {
      this.tmplCount = 0;
      this.shortenToLength(1);
    }
    _indexOfTagNames(tagNames, namespace) {
      for (let i = this.stackTop; i >= 0; i--) {
        if (tagNames.has(this.tagIDs[i]) && this.treeAdapter.getNamespaceURI(this.items[i]) === namespace) {
          return i;
        }
      }
      return -1;
    }
    clearBackTo(tagNames, targetNS) {
      const idx = this._indexOfTagNames(tagNames, targetNS);
      this.shortenToLength(idx + 1);
    }
    clearBackToTableContext() {
      this.clearBackTo(TABLE_CONTEXT, html_js_1.NS.HTML);
    }
    clearBackToTableBodyContext() {
      this.clearBackTo(TABLE_BODY_CONTEXT, html_js_1.NS.HTML);
    }
    clearBackToTableRowContext() {
      this.clearBackTo(TABLE_ROW_CONTEXT, html_js_1.NS.HTML);
    }
    remove(element) {
      const idx = this._indexOf(element);
      if (idx >= 0) {
        if (idx === this.stackTop) {
          this.pop();
        } else {
          this.items.splice(idx, 1);
          this.tagIDs.splice(idx, 1);
          this.stackTop--;
          this._updateCurrentElement();
          this.handler.onItemPop(element, false);
        }
      }
    }
    //Search
    tryPeekProperlyNestedBodyElement() {
      return this.stackTop >= 1 && this.tagIDs[1] === html_js_1.TAG_ID.BODY ? this.items[1] : null;
    }
    contains(element) {
      return this._indexOf(element) > -1;
    }
    getCommonAncestor(element) {
      const elementIdx = this._indexOf(element) - 1;
      return elementIdx >= 0 ? this.items[elementIdx] : null;
    }
    isRootHtmlElementCurrent() {
      return this.stackTop === 0 && this.tagIDs[0] === html_js_1.TAG_ID.HTML;
    }
    //Element in scope
    hasInDynamicScope(tagName, htmlScope) {
      for (let i = this.stackTop; i >= 0; i--) {
        const tn = this.tagIDs[i];
        switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
          case html_js_1.NS.HTML: {
            if (tn === tagName)
              return true;
            if (htmlScope.has(tn))
              return false;
            break;
          }
          case html_js_1.NS.SVG: {
            if (SCOPING_ELEMENTS_SVG.has(tn))
              return false;
            break;
          }
          case html_js_1.NS.MATHML: {
            if (SCOPING_ELEMENTS_MATHML.has(tn))
              return false;
            break;
          }
        }
      }
      return true;
    }
    hasInScope(tagName) {
      return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML);
    }
    hasInListItemScope(tagName) {
      return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_LIST);
    }
    hasInButtonScope(tagName) {
      return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_BUTTON);
    }
    hasNumberedHeaderInScope() {
      for (let i = this.stackTop; i >= 0; i--) {
        const tn = this.tagIDs[i];
        switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
          case html_js_1.NS.HTML: {
            if (html_js_1.NUMBERED_HEADERS.has(tn))
              return true;
            if (SCOPING_ELEMENTS_HTML.has(tn))
              return false;
            break;
          }
          case html_js_1.NS.SVG: {
            if (SCOPING_ELEMENTS_SVG.has(tn))
              return false;
            break;
          }
          case html_js_1.NS.MATHML: {
            if (SCOPING_ELEMENTS_MATHML.has(tn))
              return false;
            break;
          }
        }
      }
      return true;
    }
    hasInTableScope(tagName) {
      for (let i = this.stackTop; i >= 0; i--) {
        if (this.treeAdapter.getNamespaceURI(this.items[i]) !== html_js_1.NS.HTML) {
          continue;
        }
        switch (this.tagIDs[i]) {
          case tagName: {
            return true;
          }
          case html_js_1.TAG_ID.TABLE:
          case html_js_1.TAG_ID.HTML: {
            return false;
          }
        }
      }
      return true;
    }
    hasTableBodyContextInTableScope() {
      for (let i = this.stackTop; i >= 0; i--) {
        if (this.treeAdapter.getNamespaceURI(this.items[i]) !== html_js_1.NS.HTML) {
          continue;
        }
        switch (this.tagIDs[i]) {
          case html_js_1.TAG_ID.TBODY:
          case html_js_1.TAG_ID.THEAD:
          case html_js_1.TAG_ID.TFOOT: {
            return true;
          }
          case html_js_1.TAG_ID.TABLE:
          case html_js_1.TAG_ID.HTML: {
            return false;
          }
        }
      }
      return true;
    }
    hasInSelectScope(tagName) {
      for (let i = this.stackTop; i >= 0; i--) {
        if (this.treeAdapter.getNamespaceURI(this.items[i]) !== html_js_1.NS.HTML) {
          continue;
        }
        switch (this.tagIDs[i]) {
          case tagName: {
            return true;
          }
          case html_js_1.TAG_ID.OPTION:
          case html_js_1.TAG_ID.OPTGROUP: {
            break;
          }
          default: {
            return false;
          }
        }
      }
      return true;
    }
    //Implied end tags
    generateImpliedEndTags() {
      while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) {
        this.pop();
      }
    }
    generateImpliedEndTagsThoroughly() {
      while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
        this.pop();
      }
    }
    generateImpliedEndTagsWithExclusion(exclusionId) {
      while (this.currentTagId !== void 0 && this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
        this.pop();
      }
    }
  }
  openElementStack.OpenElementStack = OpenElementStack;
  return openElementStack;
}
var formattingElementList = {};
var hasRequiredFormattingElementList;
function requireFormattingElementList() {
  if (hasRequiredFormattingElementList) return formattingElementList;
  hasRequiredFormattingElementList = 1;
  Object.defineProperty(formattingElementList, "__esModule", { value: true });
  formattingElementList.FormattingElementList = formattingElementList.EntryType = void 0;
  const NOAH_ARK_CAPACITY = 3;
  var EntryType;
  (function(EntryType2) {
    EntryType2[EntryType2["Marker"] = 0] = "Marker";
    EntryType2[EntryType2["Element"] = 1] = "Element";
  })(EntryType || (formattingElementList.EntryType = EntryType = {}));
  const MARKER = { type: EntryType.Marker };
  class FormattingElementList {
    constructor(treeAdapter) {
      this.treeAdapter = treeAdapter;
      this.entries = [];
      this.bookmark = null;
    }
    //Noah Ark's condition
    //OPTIMIZATION: at first we try to find possible candidates for exclusion using
    //lightweight heuristics without thorough attributes check.
    _getNoahArkConditionCandidates(newElement, neAttrs) {
      const candidates = [];
      const neAttrsLength = neAttrs.length;
      const neTagName = this.treeAdapter.getTagName(newElement);
      const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
      for (let i = 0; i < this.entries.length; i++) {
        const entry = this.entries[i];
        if (entry.type === EntryType.Marker) {
          break;
        }
        const { element } = entry;
        if (this.treeAdapter.getTagName(element) === neTagName && this.treeAdapter.getNamespaceURI(element) === neNamespaceURI) {
          const elementAttrs = this.treeAdapter.getAttrList(element);
          if (elementAttrs.length === neAttrsLength) {
            candidates.push({ idx: i, attrs: elementAttrs });
          }
        }
      }
      return candidates;
    }
    _ensureNoahArkCondition(newElement) {
      if (this.entries.length < NOAH_ARK_CAPACITY)
        return;
      const neAttrs = this.treeAdapter.getAttrList(newElement);
      const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
      if (candidates.length < NOAH_ARK_CAPACITY)
        return;
      const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
      let validCandidates = 0;
      for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
          validCandidates += 1;
          if (validCandidates >= NOAH_ARK_CAPACITY) {
            this.entries.splice(candidate.idx, 1);
          }
        }
      }
    }
    //Mutations
    insertMarker() {
      this.entries.unshift(MARKER);
    }
    pushElement(element, token2) {
      this._ensureNoahArkCondition(element);
      this.entries.unshift({
        type: EntryType.Element,
        element,
        token: token2
      });
    }
    insertElementAfterBookmark(element, token2) {
      const bookmarkIdx = this.entries.indexOf(this.bookmark);
      this.entries.splice(bookmarkIdx, 0, {
        type: EntryType.Element,
        element,
        token: token2
      });
    }
    removeEntry(entry) {
      const entryIndex = this.entries.indexOf(entry);
      if (entryIndex !== -1) {
        this.entries.splice(entryIndex, 1);
      }
    }
    /**
     * Clears the list of formatting elements up to the last marker.
     *
     * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
     */
    clearToLastMarker() {
      const markerIdx = this.entries.indexOf(MARKER);
      if (markerIdx === -1) {
        this.entries.length = 0;
      } else {
        this.entries.splice(0, markerIdx + 1);
      }
    }
    //Search
    getElementEntryInScopeWithTagName(tagName) {
      const entry = this.entries.find((entry2) => entry2.type === EntryType.Marker || this.treeAdapter.getTagName(entry2.element) === tagName);
      return entry && entry.type === EntryType.Element ? entry : null;
    }
    getElementEntry(element) {
      return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element);
    }
  }
  formattingElementList.FormattingElementList = FormattingElementList;
  return formattingElementList;
}
var _default = {};
var hasRequired_default;
function require_default() {
  if (hasRequired_default) return _default;
  hasRequired_default = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.defaultTreeAdapter = void 0;
    const html_js_1 = requireHtml();
    exports$1.defaultTreeAdapter = {
      //Node construction
      createDocument() {
        return {
          nodeName: "#document",
          mode: html_js_1.DOCUMENT_MODE.NO_QUIRKS,
          childNodes: []
        };
      },
      createDocumentFragment() {
        return {
          nodeName: "#document-fragment",
          childNodes: []
        };
      },
      createElement(tagName, namespaceURI, attrs) {
        return {
          nodeName: tagName,
          tagName,
          attrs,
          namespaceURI,
          childNodes: [],
          parentNode: null
        };
      },
      createCommentNode(data) {
        return {
          nodeName: "#comment",
          data,
          parentNode: null
        };
      },
      createTextNode(value) {
        return {
          nodeName: "#text",
          value,
          parentNode: null
        };
      },
      //Tree mutation
      appendChild(parentNode, newNode) {
        parentNode.childNodes.push(newNode);
        newNode.parentNode = parentNode;
      },
      insertBefore(parentNode, newNode, referenceNode) {
        const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
        parentNode.childNodes.splice(insertionIdx, 0, newNode);
        newNode.parentNode = parentNode;
      },
      setTemplateContent(templateElement, contentElement) {
        templateElement.content = contentElement;
      },
      getTemplateContent(templateElement) {
        return templateElement.content;
      },
      setDocumentType(document, name, publicId, systemId) {
        const doctypeNode = document.childNodes.find((node) => node.nodeName === "#documentType");
        if (doctypeNode) {
          doctypeNode.name = name;
          doctypeNode.publicId = publicId;
          doctypeNode.systemId = systemId;
        } else {
          const node = {
            nodeName: "#documentType",
            name,
            publicId,
            systemId,
            parentNode: null
          };
          exports$1.defaultTreeAdapter.appendChild(document, node);
        }
      },
      setDocumentMode(document, mode) {
        document.mode = mode;
      },
      getDocumentMode(document) {
        return document.mode;
      },
      detachNode(node) {
        if (node.parentNode) {
          const idx = node.parentNode.childNodes.indexOf(node);
          node.parentNode.childNodes.splice(idx, 1);
          node.parentNode = null;
        }
      },
      insertText(parentNode, text) {
        if (parentNode.childNodes.length > 0) {
          const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
          if (exports$1.defaultTreeAdapter.isTextNode(prevNode)) {
            prevNode.value += text;
            return;
          }
        }
        exports$1.defaultTreeAdapter.appendChild(parentNode, exports$1.defaultTreeAdapter.createTextNode(text));
      },
      insertTextBefore(parentNode, text, referenceNode) {
        const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
        if (prevNode && exports$1.defaultTreeAdapter.isTextNode(prevNode)) {
          prevNode.value += text;
        } else {
          exports$1.defaultTreeAdapter.insertBefore(parentNode, exports$1.defaultTreeAdapter.createTextNode(text), referenceNode);
        }
      },
      adoptAttributes(recipient, attrs) {
        const recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
        for (let j = 0; j < attrs.length; j++) {
          if (!recipientAttrsMap.has(attrs[j].name)) {
            recipient.attrs.push(attrs[j]);
          }
        }
      },
      //Tree traversing
      getFirstChild(node) {
        return node.childNodes[0];
      },
      getChildNodes(node) {
        return node.childNodes;
      },
      getParentNode(node) {
        return node.parentNode;
      },
      getAttrList(element) {
        return element.attrs;
      },
      //Node data
      getTagName(element) {
        return element.tagName;
      },
      getNamespaceURI(element) {
        return element.namespaceURI;
      },
      getTextNodeContent(textNode) {
        return textNode.value;
      },
      getCommentNodeContent(commentNode) {
        return commentNode.data;
      },
      getDocumentTypeNodeName(doctypeNode) {
        return doctypeNode.name;
      },
      getDocumentTypeNodePublicId(doctypeNode) {
        return doctypeNode.publicId;
      },
      getDocumentTypeNodeSystemId(doctypeNode) {
        return doctypeNode.systemId;
      },
      //Node types
      isTextNode(node) {
        return node.nodeName === "#text";
      },
      isCommentNode(node) {
        return node.nodeName === "#comment";
      },
      isDocumentTypeNode(node) {
        return node.nodeName === "#documentType";
      },
      isElementNode(node) {
        return Object.prototype.hasOwnProperty.call(node, "tagName");
      },
      // Source code location
      setNodeSourceCodeLocation(node, location) {
        node.sourceCodeLocation = location;
      },
      getNodeSourceCodeLocation(node) {
        return node.sourceCodeLocation;
      },
      updateNodeSourceCodeLocation(node, endLocation) {
        node.sourceCodeLocation = Object.assign(Object.assign({}, node.sourceCodeLocation), endLocation);
      }
    };
  })(_default);
  return _default;
}
var doctype = {};
var hasRequiredDoctype;
function requireDoctype() {
  if (hasRequiredDoctype) return doctype;
  hasRequiredDoctype = 1;
  Object.defineProperty(doctype, "__esModule", { value: true });
  doctype.isConforming = isConforming;
  doctype.getDocumentMode = getDocumentMode;
  const html_js_1 = requireHtml();
  const VALID_DOCTYPE_NAME = "html";
  const VALID_SYSTEM_ID = "about:legacy-compat";
  const QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
  const QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
    "+//silmaril//dtd html pro v0r11 19970101//",
    "-//as//dtd html 3.0 aswedit + extensions//",
    "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
    "-//ietf//dtd html 2.0 level 1//",
    "-//ietf//dtd html 2.0 level 2//",
    "-//ietf//dtd html 2.0 strict level 1//",
    "-//ietf//dtd html 2.0 strict level 2//",
    "-//ietf//dtd html 2.0 strict//",
    "-//ietf//dtd html 2.0//",
    "-//ietf//dtd html 2.1e//",
    "-//ietf//dtd html 3.0//",
    "-//ietf//dtd html 3.2 final//",
    "-//ietf//dtd html 3.2//",
    "-//ietf//dtd html 3//",
    "-//ietf//dtd html level 0//",
    "-//ietf//dtd html level 1//",
    "-//ietf//dtd html level 2//",
    "-//ietf//dtd html level 3//",
    "-//ietf//dtd html strict level 0//",
    "-//ietf//dtd html strict level 1//",
    "-//ietf//dtd html strict level 2//",
    "-//ietf//dtd html strict level 3//",
    "-//ietf//dtd html strict//",
    "-//ietf//dtd html//",
    "-//metrius//dtd metrius presentational//",
    "-//microsoft//dtd internet explorer 2.0 html strict//",
    "-//microsoft//dtd internet explorer 2.0 html//",
    "-//microsoft//dtd internet explorer 2.0 tables//",
    "-//microsoft//dtd internet explorer 3.0 html strict//",
    "-//microsoft//dtd internet explorer 3.0 html//",
    "-//microsoft//dtd internet explorer 3.0 tables//",
    "-//netscape comm. corp.//dtd html//",
    "-//netscape comm. corp.//dtd strict html//",
    "-//o'reilly and associates//dtd html 2.0//",
    "-//o'reilly and associates//dtd html extended 1.0//",
    "-//o'reilly and associates//dtd html extended relaxed 1.0//",
    "-//sq//dtd html 2.0 hotmetal + extensions//",
    "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
    "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
    "-//spyglass//dtd html 2.0 extended//",
    "-//sun microsystems corp.//dtd hotjava html//",
    "-//sun microsystems corp.//dtd hotjava strict html//",
    "-//w3c//dtd html 3 1995-03-24//",
    "-//w3c//dtd html 3.2 draft//",
    "-//w3c//dtd html 3.2 final//",
    "-//w3c//dtd html 3.2//",
    "-//w3c//dtd html 3.2s draft//",
    "-//w3c//dtd html 4.0 frameset//",
    "-//w3c//dtd html 4.0 transitional//",
    "-//w3c//dtd html experimental 19960712//",
    "-//w3c//dtd html experimental 970421//",
    "-//w3c//dtd w3 html//",
    "-//w3o//dtd w3 html 3.0//",
    "-//webtechs//dtd mozilla html 2.0//",
    "-//webtechs//dtd mozilla html//"
  ];
  const QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
    ...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
    "-//w3c//dtd html 4.01 frameset//",
    "-//w3c//dtd html 4.01 transitional//"
  ];
  const QUIRKS_MODE_PUBLIC_IDS = /* @__PURE__ */ new Set([
    "-//w3o//dtd w3 html strict 3.0//en//",
    "-/w3c/dtd html 4.0 transitional/en",
    "html"
  ]);
  const LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
  const LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
    ...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
    "-//w3c//dtd html 4.01 frameset//",
    "-//w3c//dtd html 4.01 transitional//"
  ];
  function hasPrefix(publicId, prefixes) {
    return prefixes.some((prefix) => publicId.startsWith(prefix));
  }
  function isConforming(token2) {
    return token2.name === VALID_DOCTYPE_NAME && token2.publicId === null && (token2.systemId === null || token2.systemId === VALID_SYSTEM_ID);
  }
  function getDocumentMode(token2) {
    if (token2.name !== VALID_DOCTYPE_NAME) {
      return html_js_1.DOCUMENT_MODE.QUIRKS;
    }
    const { systemId } = token2;
    if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) {
      return html_js_1.DOCUMENT_MODE.QUIRKS;
    }
    let { publicId } = token2;
    if (publicId !== null) {
      publicId = publicId.toLowerCase();
      if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) {
        return html_js_1.DOCUMENT_MODE.QUIRKS;
      }
      let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
      if (hasPrefix(publicId, prefixes)) {
        return html_js_1.DOCUMENT_MODE.QUIRKS;
      }
      prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
      if (hasPrefix(publicId, prefixes)) {
        return html_js_1.DOCUMENT_MODE.LIMITED_QUIRKS;
      }
    }
    return html_js_1.DOCUMENT_MODE.NO_QUIRKS;
  }
  return doctype;
}
var foreignContent = {};
var hasRequiredForeignContent;
function requireForeignContent() {
  if (hasRequiredForeignContent) return foreignContent;
  hasRequiredForeignContent = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.SVG_TAG_NAMES_ADJUSTMENT_MAP = void 0;
    exports$1.causesExit = causesExit;
    exports$1.adjustTokenMathMLAttrs = adjustTokenMathMLAttrs;
    exports$1.adjustTokenSVGAttrs = adjustTokenSVGAttrs;
    exports$1.adjustTokenXMLAttrs = adjustTokenXMLAttrs;
    exports$1.adjustTokenSVGTagName = adjustTokenSVGTagName;
    exports$1.isIntegrationPoint = isIntegrationPoint;
    const html_js_1 = requireHtml();
    const MIME_TYPES = {
      TEXT_HTML: "text/html",
      APPLICATION_XML: "application/xhtml+xml"
    };
    const DEFINITION_URL_ATTR = "definitionurl";
    const ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
    const SVG_ATTRS_ADJUSTMENT_MAP = new Map([
      "attributeName",
      "attributeType",
      "baseFrequency",
      "baseProfile",
      "calcMode",
      "clipPathUnits",
      "diffuseConstant",
      "edgeMode",
      "filterUnits",
      "glyphRef",
      "gradientTransform",
      "gradientUnits",
      "kernelMatrix",
      "kernelUnitLength",
      "keyPoints",
      "keySplines",
      "keyTimes",
      "lengthAdjust",
      "limitingConeAngle",
      "markerHeight",
      "markerUnits",
      "markerWidth",
      "maskContentUnits",
      "maskUnits",
      "numOctaves",
      "pathLength",
      "patternContentUnits",
      "patternTransform",
      "patternUnits",
      "pointsAtX",
      "pointsAtY",
      "pointsAtZ",
      "preserveAlpha",
      "preserveAspectRatio",
      "primitiveUnits",
      "refX",
      "refY",
      "repeatCount",
      "repeatDur",
      "requiredExtensions",
      "requiredFeatures",
      "specularConstant",
      "specularExponent",
      "spreadMethod",
      "startOffset",
      "stdDeviation",
      "stitchTiles",
      "surfaceScale",
      "systemLanguage",
      "tableValues",
      "targetX",
      "targetY",
      "textLength",
      "viewBox",
      "viewTarget",
      "xChannelSelector",
      "yChannelSelector",
      "zoomAndPan"
    ].map((attr) => [attr.toLowerCase(), attr]));
    const XML_ATTRS_ADJUSTMENT_MAP = /* @__PURE__ */ new Map([
      ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: html_js_1.NS.XLINK }],
      ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: html_js_1.NS.XLINK }],
      ["xlink:href", { prefix: "xlink", name: "href", namespace: html_js_1.NS.XLINK }],
      ["xlink:role", { prefix: "xlink", name: "role", namespace: html_js_1.NS.XLINK }],
      ["xlink:show", { prefix: "xlink", name: "show", namespace: html_js_1.NS.XLINK }],
      ["xlink:title", { prefix: "xlink", name: "title", namespace: html_js_1.NS.XLINK }],
      ["xlink:type", { prefix: "xlink", name: "type", namespace: html_js_1.NS.XLINK }],
      ["xml:lang", { prefix: "xml", name: "lang", namespace: html_js_1.NS.XML }],
      ["xml:space", { prefix: "xml", name: "space", namespace: html_js_1.NS.XML }],
      ["xmlns", { prefix: "", name: "xmlns", namespace: html_js_1.NS.XMLNS }],
      ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: html_js_1.NS.XMLNS }]
    ]);
    exports$1.SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
      "altGlyph",
      "altGlyphDef",
      "altGlyphItem",
      "animateColor",
      "animateMotion",
      "animateTransform",
      "clipPath",
      "feBlend",
      "feColorMatrix",
      "feComponentTransfer",
      "feComposite",
      "feConvolveMatrix",
      "feDiffuseLighting",
      "feDisplacementMap",
      "feDistantLight",
      "feFlood",
      "feFuncA",
      "feFuncB",
      "feFuncG",
      "feFuncR",
      "feGaussianBlur",
      "feImage",
      "feMerge",
      "feMergeNode",
      "feMorphology",
      "feOffset",
      "fePointLight",
      "feSpecularLighting",
      "feSpotLight",
      "feTile",
      "feTurbulence",
      "foreignObject",
      "glyphRef",
      "linearGradient",
      "radialGradient",
      "textPath"
    ].map((tn) => [tn.toLowerCase(), tn]));
    const EXITS_FOREIGN_CONTENT = /* @__PURE__ */ new Set([
      html_js_1.TAG_ID.B,
      html_js_1.TAG_ID.BIG,
      html_js_1.TAG_ID.BLOCKQUOTE,
      html_js_1.TAG_ID.BODY,
      html_js_1.TAG_ID.BR,
      html_js_1.TAG_ID.CENTER,
      html_js_1.TAG_ID.CODE,
      html_js_1.TAG_ID.DD,
      html_js_1.TAG_ID.DIV,
      html_js_1.TAG_ID.DL,
      html_js_1.TAG_ID.DT,
      html_js_1.TAG_ID.EM,
      html_js_1.TAG_ID.EMBED,
      html_js_1.TAG_ID.H1,
      html_js_1.TAG_ID.H2,
      html_js_1.TAG_ID.H3,
      html_js_1.TAG_ID.H4,
      html_js_1.TAG_ID.H5,
      html_js_1.TAG_ID.H6,
      html_js_1.TAG_ID.HEAD,
      html_js_1.TAG_ID.HR,
      html_js_1.TAG_ID.I,
      html_js_1.TAG_ID.IMG,
      html_js_1.TAG_ID.LI,
      html_js_1.TAG_ID.LISTING,
      html_js_1.TAG_ID.MENU,
      html_js_1.TAG_ID.META,
      html_js_1.TAG_ID.NOBR,
      html_js_1.TAG_ID.OL,
      html_js_1.TAG_ID.P,
      html_js_1.TAG_ID.PRE,
      html_js_1.TAG_ID.RUBY,
      html_js_1.TAG_ID.S,
      html_js_1.TAG_ID.SMALL,
      html_js_1.TAG_ID.SPAN,
      html_js_1.TAG_ID.STRONG,
      html_js_1.TAG_ID.STRIKE,
      html_js_1.TAG_ID.SUB,
      html_js_1.TAG_ID.SUP,
      html_js_1.TAG_ID.TABLE,
      html_js_1.TAG_ID.TT,
      html_js_1.TAG_ID.U,
      html_js_1.TAG_ID.UL,
      html_js_1.TAG_ID.VAR
    ]);
    function causesExit(startTagToken) {
      const tn = startTagToken.tagID;
      const isFontWithAttrs = tn === html_js_1.TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === html_js_1.ATTRS.COLOR || name === html_js_1.ATTRS.SIZE || name === html_js_1.ATTRS.FACE);
      return isFontWithAttrs || EXITS_FOREIGN_CONTENT.has(tn);
    }
    function adjustTokenMathMLAttrs(token2) {
      for (let i = 0; i < token2.attrs.length; i++) {
        if (token2.attrs[i].name === DEFINITION_URL_ATTR) {
          token2.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
          break;
        }
      }
    }
    function adjustTokenSVGAttrs(token2) {
      for (let i = 0; i < token2.attrs.length; i++) {
        const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token2.attrs[i].name);
        if (adjustedAttrName != null) {
          token2.attrs[i].name = adjustedAttrName;
        }
      }
    }
    function adjustTokenXMLAttrs(token2) {
      for (let i = 0; i < token2.attrs.length; i++) {
        const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token2.attrs[i].name);
        if (adjustedAttrEntry) {
          token2.attrs[i].prefix = adjustedAttrEntry.prefix;
          token2.attrs[i].name = adjustedAttrEntry.name;
          token2.attrs[i].namespace = adjustedAttrEntry.namespace;
        }
      }
    }
    function adjustTokenSVGTagName(token2) {
      const adjustedTagName = exports$1.SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token2.tagName);
      if (adjustedTagName != null) {
        token2.tagName = adjustedTagName;
        token2.tagID = (0, html_js_1.getTagID)(token2.tagName);
      }
    }
    function isMathMLTextIntegrationPoint(tn, ns) {
      return ns === html_js_1.NS.MATHML && (tn === html_js_1.TAG_ID.MI || tn === html_js_1.TAG_ID.MO || tn === html_js_1.TAG_ID.MN || tn === html_js_1.TAG_ID.MS || tn === html_js_1.TAG_ID.MTEXT);
    }
    function isHtmlIntegrationPoint(tn, ns, attrs) {
      if (ns === html_js_1.NS.MATHML && tn === html_js_1.TAG_ID.ANNOTATION_XML) {
        for (let i = 0; i < attrs.length; i++) {
          if (attrs[i].name === html_js_1.ATTRS.ENCODING) {
            const value = attrs[i].value.toLowerCase();
            return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
          }
        }
      }
      return ns === html_js_1.NS.SVG && (tn === html_js_1.TAG_ID.FOREIGN_OBJECT || tn === html_js_1.TAG_ID.DESC || tn === html_js_1.TAG_ID.TITLE);
    }
    function isIntegrationPoint(tn, ns, attrs, foreignNS) {
      return (!foreignNS || foreignNS === html_js_1.NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs) || (!foreignNS || foreignNS === html_js_1.NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns);
    }
  })(foreignContent);
  return foreignContent;
}
var hasRequiredParser;
function requireParser() {
  if (hasRequiredParser) return parser;
  hasRequiredParser = 1;
  Object.defineProperty(parser, "__esModule", { value: true });
  parser.Parser = void 0;
  const index_js_1 = requireTokenizer();
  const open_element_stack_js_1 = requireOpenElementStack();
  const formatting_element_list_js_1 = requireFormattingElementList();
  const default_js_1 = require_default();
  const doctype2 = requireDoctype();
  const foreignContent2 = requireForeignContent();
  const error_codes_js_1 = requireErrorCodes();
  const unicode2 = requireUnicode();
  const html_js_1 = requireHtml();
  const token_js_1 = requireToken();
  const HIDDEN_INPUT_TYPE = "hidden";
  const AA_OUTER_LOOP_ITER = 8;
  const AA_INNER_LOOP_ITER = 3;
  var InsertionMode;
  (function(InsertionMode2) {
    InsertionMode2[InsertionMode2["INITIAL"] = 0] = "INITIAL";
    InsertionMode2[InsertionMode2["BEFORE_HTML"] = 1] = "BEFORE_HTML";
    InsertionMode2[InsertionMode2["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
    InsertionMode2[InsertionMode2["IN_HEAD"] = 3] = "IN_HEAD";
    InsertionMode2[InsertionMode2["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
    InsertionMode2[InsertionMode2["AFTER_HEAD"] = 5] = "AFTER_HEAD";
    InsertionMode2[InsertionMode2["IN_BODY"] = 6] = "IN_BODY";
    InsertionMode2[InsertionMode2["TEXT"] = 7] = "TEXT";
    InsertionMode2[InsertionMode2["IN_TABLE"] = 8] = "IN_TABLE";
    InsertionMode2[InsertionMode2["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
    InsertionMode2[InsertionMode2["IN_CAPTION"] = 10] = "IN_CAPTION";
    InsertionMode2[InsertionMode2["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
    InsertionMode2[InsertionMode2["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
    InsertionMode2[InsertionMode2["IN_ROW"] = 13] = "IN_ROW";
    InsertionMode2[InsertionMode2["IN_CELL"] = 14] = "IN_CELL";
    InsertionMode2[InsertionMode2["IN_SELECT"] = 15] = "IN_SELECT";
    InsertionMode2[InsertionMode2["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
    InsertionMode2[InsertionMode2["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
    InsertionMode2[InsertionMode2["AFTER_BODY"] = 18] = "AFTER_BODY";
    InsertionMode2[InsertionMode2["IN_FRAMESET"] = 19] = "IN_FRAMESET";
    InsertionMode2[InsertionMode2["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
    InsertionMode2[InsertionMode2["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
    InsertionMode2[InsertionMode2["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
  })(InsertionMode || (InsertionMode = {}));
  const BASE_LOC = {
    startLine: -1,
    startCol: -1,
    startOffset: -1,
    endLine: -1,
    endCol: -1,
    endOffset: -1
  };
  const TABLE_STRUCTURE_TAGS = /* @__PURE__ */ new Set([html_js_1.TAG_ID.TABLE, html_js_1.TAG_ID.TBODY, html_js_1.TAG_ID.TFOOT, html_js_1.TAG_ID.THEAD, html_js_1.TAG_ID.TR]);
  const defaultParserOptions = {
    scriptingEnabled: true,
    sourceCodeLocationInfo: false,
    treeAdapter: default_js_1.defaultTreeAdapter,
    onParseError: null
  };
  class Parser {
    constructor(options, document, fragmentContext = null, scriptHandler = null) {
      this.fragmentContext = fragmentContext;
      this.scriptHandler = scriptHandler;
      this.currentToken = null;
      this.stopped = false;
      this.insertionMode = InsertionMode.INITIAL;
      this.originalInsertionMode = InsertionMode.INITIAL;
      this.headElement = null;
      this.formElement = null;
      this.currentNotInHTML = false;
      this.tmplInsertionModeStack = [];
      this.pendingCharacterTokens = [];
      this.hasNonWhitespacePendingCharacterToken = false;
      this.framesetOk = true;
      this.skipNextNewLine = false;
      this.fosterParentingEnabled = false;
      this.options = Object.assign(Object.assign({}, defaultParserOptions), options);
      this.treeAdapter = this.options.treeAdapter;
      this.onParseError = this.options.onParseError;
      if (this.onParseError) {
        this.options.sourceCodeLocationInfo = true;
      }
      this.document = document !== null && document !== void 0 ? document : this.treeAdapter.createDocument();
      this.tokenizer = new index_js_1.Tokenizer(this.options, this);
      this.activeFormattingElements = new formatting_element_list_js_1.FormattingElementList(this.treeAdapter);
      this.fragmentContextID = fragmentContext ? (0, html_js_1.getTagID)(this.treeAdapter.getTagName(fragmentContext)) : html_js_1.TAG_ID.UNKNOWN;
      this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
      this.openElements = new open_element_stack_js_1.OpenElementStack(this.document, this.treeAdapter, this);
    }
    // API
    static parse(html2, options) {
      const parser2 = new this(options);
      parser2.tokenizer.write(html2, true);
      return parser2.document;
    }
    static getFragmentParser(fragmentContext, options) {
      const opts = Object.assign(Object.assign({}, defaultParserOptions), options);
      fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : fragmentContext = opts.treeAdapter.createElement(html_js_1.TAG_NAMES.TEMPLATE, html_js_1.NS.HTML, []);
      const documentMock = opts.treeAdapter.createElement("documentmock", html_js_1.NS.HTML, []);
      const parser2 = new this(opts, documentMock, fragmentContext);
      if (parser2.fragmentContextID === html_js_1.TAG_ID.TEMPLATE) {
        parser2.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
      }
      parser2._initTokenizerForFragmentParsing();
      parser2._insertFakeRootElement();
      parser2._resetInsertionMode();
      parser2._findFormInFragmentContext();
      return parser2;
    }
    getFragment() {
      const rootElement = this.treeAdapter.getFirstChild(this.document);
      const fragment = this.treeAdapter.createDocumentFragment();
      this._adoptNodes(rootElement, fragment);
      return fragment;
    }
    //Errors
    /** @internal */
    _err(token2, code, beforeToken) {
      var _a;
      if (!this.onParseError)
        return;
      const loc = (_a = token2.location) !== null && _a !== void 0 ? _a : BASE_LOC;
      const err = {
        code,
        startLine: loc.startLine,
        startCol: loc.startCol,
        startOffset: loc.startOffset,
        endLine: beforeToken ? loc.startLine : loc.endLine,
        endCol: beforeToken ? loc.startCol : loc.endCol,
        endOffset: beforeToken ? loc.startOffset : loc.endOffset
      };
      this.onParseError(err);
    }
    //Stack events
    /** @internal */
    onItemPush(node, tid, isTop) {
      var _a, _b;
      (_b = (_a = this.treeAdapter).onItemPush) === null || _b === void 0 ? void 0 : _b.call(_a, node);
      if (isTop && this.openElements.stackTop > 0)
        this._setContextModes(node, tid);
    }
    /** @internal */
    onItemPop(node, isTop) {
      var _a, _b;
      if (this.options.sourceCodeLocationInfo) {
        this._setEndLocation(node, this.currentToken);
      }
      (_b = (_a = this.treeAdapter).onItemPop) === null || _b === void 0 ? void 0 : _b.call(_a, node, this.openElements.current);
      if (isTop) {
        let current;
        let currentTagId;
        if (this.openElements.stackTop === 0 && this.fragmentContext) {
          current = this.fragmentContext;
          currentTagId = this.fragmentContextID;
        } else {
          ({ current, currentTagId } = this.openElements);
        }
        this._setContextModes(current, currentTagId);
      }
    }
    _setContextModes(current, tid) {
      const isHTML = current === this.document || current && this.treeAdapter.getNamespaceURI(current) === html_js_1.NS.HTML;
      this.currentNotInHTML = !isHTML;
      this.tokenizer.inForeignNode = !isHTML && current !== void 0 && tid !== void 0 && !this._isIntegrationPoint(tid, current);
    }
    /** @protected */
    _switchToTextParsing(currentToken, nextTokenizerState) {
      this._insertElement(currentToken, html_js_1.NS.HTML);
      this.tokenizer.state = nextTokenizerState;
      this.originalInsertionMode = this.insertionMode;
      this.insertionMode = InsertionMode.TEXT;
    }
    switchToPlaintextParsing() {
      this.insertionMode = InsertionMode.TEXT;
      this.originalInsertionMode = InsertionMode.IN_BODY;
      this.tokenizer.state = index_js_1.TokenizerMode.PLAINTEXT;
    }
    //Fragment parsing
    /** @protected */
    _getAdjustedCurrentElement() {
      return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
    }
    /** @protected */
    _findFormInFragmentContext() {
      let node = this.fragmentContext;
      while (node) {
        if (this.treeAdapter.getTagName(node) === html_js_1.TAG_NAMES.FORM) {
          this.formElement = node;
          break;
        }
        node = this.treeAdapter.getParentNode(node);
      }
    }
    _initTokenizerForFragmentParsing() {
      if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== html_js_1.NS.HTML) {
        return;
      }
      switch (this.fragmentContextID) {
        case html_js_1.TAG_ID.TITLE:
        case html_js_1.TAG_ID.TEXTAREA: {
          this.tokenizer.state = index_js_1.TokenizerMode.RCDATA;
          break;
        }
        case html_js_1.TAG_ID.STYLE:
        case html_js_1.TAG_ID.XMP:
        case html_js_1.TAG_ID.IFRAME:
        case html_js_1.TAG_ID.NOEMBED:
        case html_js_1.TAG_ID.NOFRAMES:
        case html_js_1.TAG_ID.NOSCRIPT: {
          this.tokenizer.state = index_js_1.TokenizerMode.RAWTEXT;
          break;
        }
        case html_js_1.TAG_ID.SCRIPT: {
          this.tokenizer.state = index_js_1.TokenizerMode.SCRIPT_DATA;
          break;
        }
        case html_js_1.TAG_ID.PLAINTEXT: {
          this.tokenizer.state = index_js_1.TokenizerMode.PLAINTEXT;
          break;
        }
      }
    }
    //Tree mutation
    /** @protected */
    _setDocumentType(token2) {
      const name = token2.name || "";
      const publicId = token2.publicId || "";
      const systemId = token2.systemId || "";
      this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
      if (token2.location) {
        const documentChildren = this.treeAdapter.getChildNodes(this.document);
        const docTypeNode = documentChildren.find((node) => this.treeAdapter.isDocumentTypeNode(node));
        if (docTypeNode) {
          this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token2.location);
        }
      }
    }
    /** @protected */
    _attachElementToTree(element, location) {
      if (this.options.sourceCodeLocationInfo) {
        const loc = location && Object.assign(Object.assign({}, location), { startTag: location });
        this.treeAdapter.setNodeSourceCodeLocation(element, loc);
      }
      if (this._shouldFosterParentOnInsertion()) {
        this._fosterParentElement(element);
      } else {
        const parent = this.openElements.currentTmplContentOrNode;
        this.treeAdapter.appendChild(parent !== null && parent !== void 0 ? parent : this.document, element);
      }
    }
    /**
     * For self-closing tags. Add an element to the tree, but skip adding it
     * to the stack.
     */
    /** @protected */
    _appendElement(token2, namespaceURI) {
      const element = this.treeAdapter.createElement(token2.tagName, namespaceURI, token2.attrs);
      this._attachElementToTree(element, token2.location);
    }
    /** @protected */
    _insertElement(token2, namespaceURI) {
      const element = this.treeAdapter.createElement(token2.tagName, namespaceURI, token2.attrs);
      this._attachElementToTree(element, token2.location);
      this.openElements.push(element, token2.tagID);
    }
    /** @protected */
    _insertFakeElement(tagName, tagID) {
      const element = this.treeAdapter.createElement(tagName, html_js_1.NS.HTML, []);
      this._attachElementToTree(element, null);
      this.openElements.push(element, tagID);
    }
    /** @protected */
    _insertTemplate(token2) {
      const tmpl = this.treeAdapter.createElement(token2.tagName, html_js_1.NS.HTML, token2.attrs);
      const content = this.treeAdapter.createDocumentFragment();
      this.treeAdapter.setTemplateContent(tmpl, content);
      this._attachElementToTree(tmpl, token2.location);
      this.openElements.push(tmpl, token2.tagID);
      if (this.options.sourceCodeLocationInfo)
        this.treeAdapter.setNodeSourceCodeLocation(content, null);
    }
    /** @protected */
    _insertFakeRootElement() {
      const element = this.treeAdapter.createElement(html_js_1.TAG_NAMES.HTML, html_js_1.NS.HTML, []);
      if (this.options.sourceCodeLocationInfo)
        this.treeAdapter.setNodeSourceCodeLocation(element, null);
      this.treeAdapter.appendChild(this.openElements.current, element);
      this.openElements.push(element, html_js_1.TAG_ID.HTML);
    }
    /** @protected */
    _appendCommentNode(token2, parent) {
      const commentNode = this.treeAdapter.createCommentNode(token2.data);
      this.treeAdapter.appendChild(parent, commentNode);
      if (this.options.sourceCodeLocationInfo) {
        this.treeAdapter.setNodeSourceCodeLocation(commentNode, token2.location);
      }
    }
    /** @protected */
    _insertCharacters(token2) {
      let parent;
      let beforeElement;
      if (this._shouldFosterParentOnInsertion()) {
        ({ parent, beforeElement } = this._findFosterParentingLocation());
        if (beforeElement) {
          this.treeAdapter.insertTextBefore(parent, token2.chars, beforeElement);
        } else {
          this.treeAdapter.insertText(parent, token2.chars);
        }
      } else {
        parent = this.openElements.currentTmplContentOrNode;
        this.treeAdapter.insertText(parent, token2.chars);
      }
      if (!token2.location)
        return;
      const siblings = this.treeAdapter.getChildNodes(parent);
      const textNodeIdx = beforeElement ? siblings.lastIndexOf(beforeElement) : siblings.length;
      const textNode = siblings[textNodeIdx - 1];
      const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);
      if (tnLoc) {
        const { endLine, endCol, endOffset } = token2.location;
        this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
      } else if (this.options.sourceCodeLocationInfo) {
        this.treeAdapter.setNodeSourceCodeLocation(textNode, token2.location);
      }
    }
    /** @protected */
    _adoptNodes(donor, recipient) {
      for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
        this.treeAdapter.detachNode(child);
        this.treeAdapter.appendChild(recipient, child);
      }
    }
    /** @protected */
    _setEndLocation(element, closingToken) {
      if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
        const ctLoc = closingToken.location;
        const tn = this.treeAdapter.getTagName(element);
        const endLoc = (
          // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
          // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
          closingToken.type === token_js_1.TokenType.END_TAG && tn === closingToken.tagName ? {
            endTag: Object.assign({}, ctLoc),
            endLine: ctLoc.endLine,
            endCol: ctLoc.endCol,
            endOffset: ctLoc.endOffset
          } : {
            endLine: ctLoc.startLine,
            endCol: ctLoc.startCol,
            endOffset: ctLoc.startOffset
          }
        );
        this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
      }
    }
    //Token processing
    shouldProcessStartTagTokenInForeignContent(token2) {
      if (!this.currentNotInHTML)
        return false;
      let current;
      let currentTagId;
      if (this.openElements.stackTop === 0 && this.fragmentContext) {
        current = this.fragmentContext;
        currentTagId = this.fragmentContextID;
      } else {
        ({ current, currentTagId } = this.openElements);
      }
      if (token2.tagID === html_js_1.TAG_ID.SVG && this.treeAdapter.getTagName(current) === html_js_1.TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === html_js_1.NS.MATHML) {
        return false;
      }
      return (
        // Check that `current` is not an integration point for HTML or MathML elements.
        this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
        // integration point.
        (token2.tagID === html_js_1.TAG_ID.MGLYPH || token2.tagID === html_js_1.TAG_ID.MALIGNMARK) && currentTagId !== void 0 && !this._isIntegrationPoint(currentTagId, current, html_js_1.NS.HTML)
      );
    }
    /** @protected */
    _processToken(token2) {
      switch (token2.type) {
        case token_js_1.TokenType.CHARACTER: {
          this.onCharacter(token2);
          break;
        }
        case token_js_1.TokenType.NULL_CHARACTER: {
          this.onNullCharacter(token2);
          break;
        }
        case token_js_1.TokenType.COMMENT: {
          this.onComment(token2);
          break;
        }
        case token_js_1.TokenType.DOCTYPE: {
          this.onDoctype(token2);
          break;
        }
        case token_js_1.TokenType.START_TAG: {
          this._processStartTag(token2);
          break;
        }
        case token_js_1.TokenType.END_TAG: {
          this.onEndTag(token2);
          break;
        }
        case token_js_1.TokenType.EOF: {
          this.onEof(token2);
          break;
        }
        case token_js_1.TokenType.WHITESPACE_CHARACTER: {
          this.onWhitespaceCharacter(token2);
          break;
        }
      }
    }
    //Integration points
    /** @protected */
    _isIntegrationPoint(tid, element, foreignNS) {
      const ns = this.treeAdapter.getNamespaceURI(element);
      const attrs = this.treeAdapter.getAttrList(element);
      return foreignContent2.isIntegrationPoint(tid, ns, attrs, foreignNS);
    }
    //Active formatting elements reconstruction
    /** @protected */
    _reconstructActiveFormattingElements() {
      const listLength = this.activeFormattingElements.entries.length;
      if (listLength) {
        const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === formatting_element_list_js_1.EntryType.Marker || this.openElements.contains(entry.element));
        const unopenIdx = endIndex === -1 ? listLength - 1 : endIndex - 1;
        for (let i = unopenIdx; i >= 0; i--) {
          const entry = this.activeFormattingElements.entries[i];
          this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
          entry.element = this.openElements.current;
        }
      }
    }
    //Close elements
    /** @protected */
    _closeTableCell() {
      this.openElements.generateImpliedEndTags();
      this.openElements.popUntilTableCellPopped();
      this.activeFormattingElements.clearToLastMarker();
      this.insertionMode = InsertionMode.IN_ROW;
    }
    /** @protected */
    _closePElement() {
      this.openElements.generateImpliedEndTagsWithExclusion(html_js_1.TAG_ID.P);
      this.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.P);
    }
    //Insertion modes
    /** @protected */
    _resetInsertionMode() {
      for (let i = this.openElements.stackTop; i >= 0; i--) {
        switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
          case html_js_1.TAG_ID.TR: {
            this.insertionMode = InsertionMode.IN_ROW;
            return;
          }
          case html_js_1.TAG_ID.TBODY:
          case html_js_1.TAG_ID.THEAD:
          case html_js_1.TAG_ID.TFOOT: {
            this.insertionMode = InsertionMode.IN_TABLE_BODY;
            return;
          }
          case html_js_1.TAG_ID.CAPTION: {
            this.insertionMode = InsertionMode.IN_CAPTION;
            return;
          }
          case html_js_1.TAG_ID.COLGROUP: {
            this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
            return;
          }
          case html_js_1.TAG_ID.TABLE: {
            this.insertionMode = InsertionMode.IN_TABLE;
            return;
          }
          case html_js_1.TAG_ID.BODY: {
            this.insertionMode = InsertionMode.IN_BODY;
            return;
          }
          case html_js_1.TAG_ID.FRAMESET: {
            this.insertionMode = InsertionMode.IN_FRAMESET;
            return;
          }
          case html_js_1.TAG_ID.SELECT: {
            this._resetInsertionModeForSelect(i);
            return;
          }
          case html_js_1.TAG_ID.TEMPLATE: {
            this.insertionMode = this.tmplInsertionModeStack[0];
            return;
          }
          case html_js_1.TAG_ID.HTML: {
            this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
            return;
          }
          case html_js_1.TAG_ID.TD:
          case html_js_1.TAG_ID.TH: {
            if (i > 0) {
              this.insertionMode = InsertionMode.IN_CELL;
              return;
            }
            break;
          }
          case html_js_1.TAG_ID.HEAD: {
            if (i > 0) {
              this.insertionMode = InsertionMode.IN_HEAD;
              return;
            }
            break;
          }
        }
      }
      this.insertionMode = InsertionMode.IN_BODY;
    }
    /** @protected */
    _resetInsertionModeForSelect(selectIdx) {
      if (selectIdx > 0) {
        for (let i = selectIdx - 1; i > 0; i--) {
          const tn = this.openElements.tagIDs[i];
          if (tn === html_js_1.TAG_ID.TEMPLATE) {
            break;
          } else if (tn === html_js_1.TAG_ID.TABLE) {
            this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
            return;
          }
        }
      }
      this.insertionMode = InsertionMode.IN_SELECT;
    }
    //Foster parenting
    /** @protected */
    _isElementCausesFosterParenting(tn) {
      return TABLE_STRUCTURE_TAGS.has(tn);
    }
    /** @protected */
    _shouldFosterParentOnInsertion() {
      return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
    }
    /** @protected */
    _findFosterParentingLocation() {
      for (let i = this.openElements.stackTop; i >= 0; i--) {
        const openElement = this.openElements.items[i];
        switch (this.openElements.tagIDs[i]) {
          case html_js_1.TAG_ID.TEMPLATE: {
            if (this.treeAdapter.getNamespaceURI(openElement) === html_js_1.NS.HTML) {
              return { parent: this.treeAdapter.getTemplateContent(openElement), beforeElement: null };
            }
            break;
          }
          case html_js_1.TAG_ID.TABLE: {
            const parent = this.treeAdapter.getParentNode(openElement);
            if (parent) {
              return { parent, beforeElement: openElement };
            }
            return { parent: this.openElements.items[i - 1], beforeElement: null };
          }
        }
      }
      return { parent: this.openElements.items[0], beforeElement: null };
    }
    /** @protected */
    _fosterParentElement(element) {
      const location = this._findFosterParentingLocation();
      if (location.beforeElement) {
        this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
      } else {
        this.treeAdapter.appendChild(location.parent, element);
      }
    }
    //Special elements
    /** @protected */
    _isSpecialElement(element, id) {
      const ns = this.treeAdapter.getNamespaceURI(element);
      return html_js_1.SPECIAL_ELEMENTS[ns].has(id);
    }
    /** @internal */
    onCharacter(token2) {
      this.skipNextNewLine = false;
      if (this.tokenizer.inForeignNode) {
        characterInForeignContent(this, token2);
        return;
      }
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token2);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          tokenBeforeHtml(this, token2);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          tokenBeforeHead(this, token2);
          break;
        }
        case InsertionMode.IN_HEAD: {
          tokenInHead(this, token2);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          tokenInHeadNoScript(this, token2);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          tokenAfterHead(this, token2);
          break;
        }
        case InsertionMode.IN_BODY:
        case InsertionMode.IN_CAPTION:
        case InsertionMode.IN_CELL:
        case InsertionMode.IN_TEMPLATE: {
          characterInBody(this, token2);
          break;
        }
        case InsertionMode.TEXT:
        case InsertionMode.IN_SELECT:
        case InsertionMode.IN_SELECT_IN_TABLE: {
          this._insertCharacters(token2);
          break;
        }
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW: {
          characterInTable(this, token2);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          characterInTableText(this, token2);
          break;
        }
        case InsertionMode.IN_COLUMN_GROUP: {
          tokenInColumnGroup(this, token2);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          tokenAfterBody(this, token2);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY: {
          tokenAfterAfterBody(this, token2);
          break;
        }
      }
    }
    /** @internal */
    onNullCharacter(token2) {
      this.skipNextNewLine = false;
      if (this.tokenizer.inForeignNode) {
        nullCharacterInForeignContent(this, token2);
        return;
      }
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token2);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          tokenBeforeHtml(this, token2);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          tokenBeforeHead(this, token2);
          break;
        }
        case InsertionMode.IN_HEAD: {
          tokenInHead(this, token2);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          tokenInHeadNoScript(this, token2);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          tokenAfterHead(this, token2);
          break;
        }
        case InsertionMode.TEXT: {
          this._insertCharacters(token2);
          break;
        }
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW: {
          characterInTable(this, token2);
          break;
        }
        case InsertionMode.IN_COLUMN_GROUP: {
          tokenInColumnGroup(this, token2);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          tokenAfterBody(this, token2);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY: {
          tokenAfterAfterBody(this, token2);
          break;
        }
      }
    }
    /** @internal */
    onComment(token2) {
      this.skipNextNewLine = false;
      if (this.currentNotInHTML) {
        appendComment(this, token2);
        return;
      }
      switch (this.insertionMode) {
        case InsertionMode.INITIAL:
        case InsertionMode.BEFORE_HTML:
        case InsertionMode.BEFORE_HEAD:
        case InsertionMode.IN_HEAD:
        case InsertionMode.IN_HEAD_NO_SCRIPT:
        case InsertionMode.AFTER_HEAD:
        case InsertionMode.IN_BODY:
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_CAPTION:
        case InsertionMode.IN_COLUMN_GROUP:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW:
        case InsertionMode.IN_CELL:
        case InsertionMode.IN_SELECT:
        case InsertionMode.IN_SELECT_IN_TABLE:
        case InsertionMode.IN_TEMPLATE:
        case InsertionMode.IN_FRAMESET:
        case InsertionMode.AFTER_FRAMESET: {
          appendComment(this, token2);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token2);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          appendCommentToRootHtmlElement(this, token2);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY:
        case InsertionMode.AFTER_AFTER_FRAMESET: {
          appendCommentToDocument(this, token2);
          break;
        }
      }
    }
    /** @internal */
    onDoctype(token2) {
      this.skipNextNewLine = false;
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          doctypeInInitialMode(this, token2);
          break;
        }
        case InsertionMode.BEFORE_HEAD:
        case InsertionMode.IN_HEAD:
        case InsertionMode.IN_HEAD_NO_SCRIPT:
        case InsertionMode.AFTER_HEAD: {
          this._err(token2, error_codes_js_1.ERR.misplacedDoctype);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token2);
          break;
        }
      }
    }
    /** @internal */
    onStartTag(token2) {
      this.skipNextNewLine = false;
      this.currentToken = token2;
      this._processStartTag(token2);
      if (token2.selfClosing && !token2.ackSelfClosing) {
        this._err(token2, error_codes_js_1.ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
      }
    }
    /**
     * Processes a given start tag.
     *
     * `onStartTag` checks if a self-closing tag was recognized. When a token
     * is moved inbetween multiple insertion modes, this check for self-closing
     * could lead to false positives. To avoid this, `_processStartTag` is used
     * for nested calls.
     *
     * @param token The token to process.
     * @protected
     */
    _processStartTag(token2) {
      if (this.shouldProcessStartTagTokenInForeignContent(token2)) {
        startTagInForeignContent(this, token2);
      } else {
        this._startTagOutsideForeignContent(token2);
      }
    }
    /** @protected */
    _startTagOutsideForeignContent(token2) {
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token2);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          startTagBeforeHtml(this, token2);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          startTagBeforeHead(this, token2);
          break;
        }
        case InsertionMode.IN_HEAD: {
          startTagInHead(this, token2);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          startTagInHeadNoScript(this, token2);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          startTagAfterHead(this, token2);
          break;
        }
        case InsertionMode.IN_BODY: {
          startTagInBody(this, token2);
          break;
        }
        case InsertionMode.IN_TABLE: {
          startTagInTable(this, token2);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token2);
          break;
        }
        case InsertionMode.IN_CAPTION: {
          startTagInCaption(this, token2);
          break;
        }
        case InsertionMode.IN_COLUMN_GROUP: {
          startTagInColumnGroup(this, token2);
          break;
        }
        case InsertionMode.IN_TABLE_BODY: {
          startTagInTableBody(this, token2);
          break;
        }
        case InsertionMode.IN_ROW: {
          startTagInRow(this, token2);
          break;
        }
        case InsertionMode.IN_CELL: {
          startTagInCell(this, token2);
          break;
        }
        case InsertionMode.IN_SELECT: {
          startTagInSelect(this, token2);
          break;
        }
        case InsertionMode.IN_SELECT_IN_TABLE: {
          startTagInSelectInTable(this, token2);
          break;
        }
        case InsertionMode.IN_TEMPLATE: {
          startTagInTemplate(this, token2);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          startTagAfterBody(this, token2);
          break;
        }
        case InsertionMode.IN_FRAMESET: {
          startTagInFrameset(this, token2);
          break;
        }
        case InsertionMode.AFTER_FRAMESET: {
          startTagAfterFrameset(this, token2);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY: {
          startTagAfterAfterBody(this, token2);
          break;
        }
        case InsertionMode.AFTER_AFTER_FRAMESET: {
          startTagAfterAfterFrameset(this, token2);
          break;
        }
      }
    }
    /** @internal */
    onEndTag(token2) {
      this.skipNextNewLine = false;
      this.currentToken = token2;
      if (this.currentNotInHTML) {
        endTagInForeignContent(this, token2);
      } else {
        this._endTagOutsideForeignContent(token2);
      }
    }
    /** @protected */
    _endTagOutsideForeignContent(token2) {
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token2);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          endTagBeforeHtml(this, token2);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          endTagBeforeHead(this, token2);
          break;
        }
        case InsertionMode.IN_HEAD: {
          endTagInHead(this, token2);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          endTagInHeadNoScript(this, token2);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          endTagAfterHead(this, token2);
          break;
        }
        case InsertionMode.IN_BODY: {
          endTagInBody(this, token2);
          break;
        }
        case InsertionMode.TEXT: {
          endTagInText(this, token2);
          break;
        }
        case InsertionMode.IN_TABLE: {
          endTagInTable(this, token2);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token2);
          break;
        }
        case InsertionMode.IN_CAPTION: {
          endTagInCaption(this, token2);
          break;
        }
        case InsertionMode.IN_COLUMN_GROUP: {
          endTagInColumnGroup(this, token2);
          break;
        }
        case InsertionMode.IN_TABLE_BODY: {
          endTagInTableBody(this, token2);
          break;
        }
        case InsertionMode.IN_ROW: {
          endTagInRow(this, token2);
          break;
        }
        case InsertionMode.IN_CELL: {
          endTagInCell(this, token2);
          break;
        }
        case InsertionMode.IN_SELECT: {
          endTagInSelect(this, token2);
          break;
        }
        case InsertionMode.IN_SELECT_IN_TABLE: {
          endTagInSelectInTable(this, token2);
          break;
        }
        case InsertionMode.IN_TEMPLATE: {
          endTagInTemplate(this, token2);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          endTagAfterBody(this, token2);
          break;
        }
        case InsertionMode.IN_FRAMESET: {
          endTagInFrameset(this, token2);
          break;
        }
        case InsertionMode.AFTER_FRAMESET: {
          endTagAfterFrameset(this, token2);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY: {
          tokenAfterAfterBody(this, token2);
          break;
        }
      }
    }
    /** @internal */
    onEof(token2) {
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token2);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          tokenBeforeHtml(this, token2);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          tokenBeforeHead(this, token2);
          break;
        }
        case InsertionMode.IN_HEAD: {
          tokenInHead(this, token2);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          tokenInHeadNoScript(this, token2);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          tokenAfterHead(this, token2);
          break;
        }
        case InsertionMode.IN_BODY:
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_CAPTION:
        case InsertionMode.IN_COLUMN_GROUP:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW:
        case InsertionMode.IN_CELL:
        case InsertionMode.IN_SELECT:
        case InsertionMode.IN_SELECT_IN_TABLE: {
          eofInBody(this, token2);
          break;
        }
        case InsertionMode.TEXT: {
          eofInText(this, token2);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token2);
          break;
        }
        case InsertionMode.IN_TEMPLATE: {
          eofInTemplate(this, token2);
          break;
        }
        case InsertionMode.AFTER_BODY:
        case InsertionMode.IN_FRAMESET:
        case InsertionMode.AFTER_FRAMESET:
        case InsertionMode.AFTER_AFTER_BODY:
        case InsertionMode.AFTER_AFTER_FRAMESET: {
          stopParsing(this, token2);
          break;
        }
      }
    }
    /** @internal */
    onWhitespaceCharacter(token2) {
      if (this.skipNextNewLine) {
        this.skipNextNewLine = false;
        if (token2.chars.charCodeAt(0) === unicode2.CODE_POINTS.LINE_FEED) {
          if (token2.chars.length === 1) {
            return;
          }
          token2.chars = token2.chars.substr(1);
        }
      }
      if (this.tokenizer.inForeignNode) {
        this._insertCharacters(token2);
        return;
      }
      switch (this.insertionMode) {
        case InsertionMode.IN_HEAD:
        case InsertionMode.IN_HEAD_NO_SCRIPT:
        case InsertionMode.AFTER_HEAD:
        case InsertionMode.TEXT:
        case InsertionMode.IN_COLUMN_GROUP:
        case InsertionMode.IN_SELECT:
        case InsertionMode.IN_SELECT_IN_TABLE:
        case InsertionMode.IN_FRAMESET:
        case InsertionMode.AFTER_FRAMESET: {
          this._insertCharacters(token2);
          break;
        }
        case InsertionMode.IN_BODY:
        case InsertionMode.IN_CAPTION:
        case InsertionMode.IN_CELL:
        case InsertionMode.IN_TEMPLATE:
        case InsertionMode.AFTER_BODY:
        case InsertionMode.AFTER_AFTER_BODY:
        case InsertionMode.AFTER_AFTER_FRAMESET: {
          whitespaceCharacterInBody(this, token2);
          break;
        }
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW: {
          characterInTable(this, token2);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          whitespaceCharacterInTableText(this, token2);
          break;
        }
      }
    }
  }
  parser.Parser = Parser;
  function aaObtainFormattingElementEntry(p, token2) {
    let formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token2.tagName);
    if (formattingElementEntry) {
      if (!p.openElements.contains(formattingElementEntry.element)) {
        p.activeFormattingElements.removeEntry(formattingElementEntry);
        formattingElementEntry = null;
      } else if (!p.openElements.hasInScope(token2.tagID)) {
        formattingElementEntry = null;
      }
    } else {
      genericEndTagInBody(p, token2);
    }
    return formattingElementEntry;
  }
  function aaObtainFurthestBlock(p, formattingElementEntry) {
    let furthestBlock = null;
    let idx = p.openElements.stackTop;
    for (; idx >= 0; idx--) {
      const element = p.openElements.items[idx];
      if (element === formattingElementEntry.element) {
        break;
      }
      if (p._isSpecialElement(element, p.openElements.tagIDs[idx])) {
        furthestBlock = element;
      }
    }
    if (!furthestBlock) {
      p.openElements.shortenToLength(Math.max(idx, 0));
      p.activeFormattingElements.removeEntry(formattingElementEntry);
    }
    return furthestBlock;
  }
  function aaInnerLoop(p, furthestBlock, formattingElement) {
    let lastElement = furthestBlock;
    let nextElement = p.openElements.getCommonAncestor(furthestBlock);
    for (let i = 0, element = nextElement; element !== formattingElement; i++, element = nextElement) {
      nextElement = p.openElements.getCommonAncestor(element);
      const elementEntry = p.activeFormattingElements.getElementEntry(element);
      const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
      const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
      if (shouldRemoveFromOpenElements) {
        if (counterOverflow) {
          p.activeFormattingElements.removeEntry(elementEntry);
        }
        p.openElements.remove(element);
      } else {
        element = aaRecreateElementFromEntry(p, elementEntry);
        if (lastElement === furthestBlock) {
          p.activeFormattingElements.bookmark = elementEntry;
        }
        p.treeAdapter.detachNode(lastElement);
        p.treeAdapter.appendChild(element, lastElement);
        lastElement = element;
      }
    }
    return lastElement;
  }
  function aaRecreateElementFromEntry(p, elementEntry) {
    const ns = p.treeAdapter.getNamespaceURI(elementEntry.element);
    const newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
    p.openElements.replace(elementEntry.element, newElement);
    elementEntry.element = newElement;
    return newElement;
  }
  function aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement) {
    const tn = p.treeAdapter.getTagName(commonAncestor);
    const tid = (0, html_js_1.getTagID)(tn);
    if (p._isElementCausesFosterParenting(tid)) {
      p._fosterParentElement(lastElement);
    } else {
      const ns = p.treeAdapter.getNamespaceURI(commonAncestor);
      if (tid === html_js_1.TAG_ID.TEMPLATE && ns === html_js_1.NS.HTML) {
        commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor);
      }
      p.treeAdapter.appendChild(commonAncestor, lastElement);
    }
  }
  function aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry) {
    const ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element);
    const { token: token2 } = formattingElementEntry;
    const newElement = p.treeAdapter.createElement(token2.tagName, ns, token2.attrs);
    p._adoptNodes(furthestBlock, newElement);
    p.treeAdapter.appendChild(furthestBlock, newElement);
    p.activeFormattingElements.insertElementAfterBookmark(newElement, token2);
    p.activeFormattingElements.removeEntry(formattingElementEntry);
    p.openElements.remove(formattingElementEntry.element);
    p.openElements.insertAfter(furthestBlock, newElement, token2.tagID);
  }
  function callAdoptionAgency(p, token2) {
    for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
      const formattingElementEntry = aaObtainFormattingElementEntry(p, token2);
      if (!formattingElementEntry) {
        break;
      }
      const furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);
      if (!furthestBlock) {
        break;
      }
      p.activeFormattingElements.bookmark = formattingElementEntry;
      const lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element);
      const commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
      p.treeAdapter.detachNode(lastElement);
      if (commonAncestor)
        aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement);
      aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
    }
  }
  function appendComment(p, token2) {
    p._appendCommentNode(token2, p.openElements.currentTmplContentOrNode);
  }
  function appendCommentToRootHtmlElement(p, token2) {
    p._appendCommentNode(token2, p.openElements.items[0]);
  }
  function appendCommentToDocument(p, token2) {
    p._appendCommentNode(token2, p.document);
  }
  function stopParsing(p, token2) {
    p.stopped = true;
    if (token2.location) {
      const target = p.fragmentContext ? 0 : 2;
      for (let i = p.openElements.stackTop; i >= target; i--) {
        p._setEndLocation(p.openElements.items[i], token2);
      }
      if (!p.fragmentContext && p.openElements.stackTop >= 0) {
        const htmlElement = p.openElements.items[0];
        const htmlLocation = p.treeAdapter.getNodeSourceCodeLocation(htmlElement);
        if (htmlLocation && !htmlLocation.endTag) {
          p._setEndLocation(htmlElement, token2);
          if (p.openElements.stackTop >= 1) {
            const bodyElement = p.openElements.items[1];
            const bodyLocation = p.treeAdapter.getNodeSourceCodeLocation(bodyElement);
            if (bodyLocation && !bodyLocation.endTag) {
              p._setEndLocation(bodyElement, token2);
            }
          }
        }
      }
    }
  }
  function doctypeInInitialMode(p, token2) {
    p._setDocumentType(token2);
    const mode = token2.forceQuirks ? html_js_1.DOCUMENT_MODE.QUIRKS : doctype2.getDocumentMode(token2);
    if (!doctype2.isConforming(token2)) {
      p._err(token2, error_codes_js_1.ERR.nonConformingDoctype);
    }
    p.treeAdapter.setDocumentMode(p.document, mode);
    p.insertionMode = InsertionMode.BEFORE_HTML;
  }
  function tokenInInitialMode(p, token2) {
    p._err(token2, error_codes_js_1.ERR.missingDoctype, true);
    p.treeAdapter.setDocumentMode(p.document, html_js_1.DOCUMENT_MODE.QUIRKS);
    p.insertionMode = InsertionMode.BEFORE_HTML;
    p._processToken(token2);
  }
  function startTagBeforeHtml(p, token2) {
    if (token2.tagID === html_js_1.TAG_ID.HTML) {
      p._insertElement(token2, html_js_1.NS.HTML);
      p.insertionMode = InsertionMode.BEFORE_HEAD;
    } else {
      tokenBeforeHtml(p, token2);
    }
  }
  function endTagBeforeHtml(p, token2) {
    const tn = token2.tagID;
    if (tn === html_js_1.TAG_ID.HTML || tn === html_js_1.TAG_ID.HEAD || tn === html_js_1.TAG_ID.BODY || tn === html_js_1.TAG_ID.BR) {
      tokenBeforeHtml(p, token2);
    }
  }
  function tokenBeforeHtml(p, token2) {
    p._insertFakeRootElement();
    p.insertionMode = InsertionMode.BEFORE_HEAD;
    p._processToken(token2);
  }
  function startTagBeforeHead(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.HTML: {
        startTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.HEAD: {
        p._insertElement(token2, html_js_1.NS.HTML);
        p.headElement = p.openElements.current;
        p.insertionMode = InsertionMode.IN_HEAD;
        break;
      }
      default: {
        tokenBeforeHead(p, token2);
      }
    }
  }
  function endTagBeforeHead(p, token2) {
    const tn = token2.tagID;
    if (tn === html_js_1.TAG_ID.HEAD || tn === html_js_1.TAG_ID.BODY || tn === html_js_1.TAG_ID.HTML || tn === html_js_1.TAG_ID.BR) {
      tokenBeforeHead(p, token2);
    } else {
      p._err(token2, error_codes_js_1.ERR.endTagWithoutMatchingOpenElement);
    }
  }
  function tokenBeforeHead(p, token2) {
    p._insertFakeElement(html_js_1.TAG_NAMES.HEAD, html_js_1.TAG_ID.HEAD);
    p.headElement = p.openElements.current;
    p.insertionMode = InsertionMode.IN_HEAD;
    p._processToken(token2);
  }
  function startTagInHead(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.HTML: {
        startTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.BASE:
      case html_js_1.TAG_ID.BASEFONT:
      case html_js_1.TAG_ID.BGSOUND:
      case html_js_1.TAG_ID.LINK:
      case html_js_1.TAG_ID.META: {
        p._appendElement(token2, html_js_1.NS.HTML);
        token2.ackSelfClosing = true;
        break;
      }
      case html_js_1.TAG_ID.TITLE: {
        p._switchToTextParsing(token2, index_js_1.TokenizerMode.RCDATA);
        break;
      }
      case html_js_1.TAG_ID.NOSCRIPT: {
        if (p.options.scriptingEnabled) {
          p._switchToTextParsing(token2, index_js_1.TokenizerMode.RAWTEXT);
        } else {
          p._insertElement(token2, html_js_1.NS.HTML);
          p.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
        }
        break;
      }
      case html_js_1.TAG_ID.NOFRAMES:
      case html_js_1.TAG_ID.STYLE: {
        p._switchToTextParsing(token2, index_js_1.TokenizerMode.RAWTEXT);
        break;
      }
      case html_js_1.TAG_ID.SCRIPT: {
        p._switchToTextParsing(token2, index_js_1.TokenizerMode.SCRIPT_DATA);
        break;
      }
      case html_js_1.TAG_ID.TEMPLATE: {
        p._insertTemplate(token2);
        p.activeFormattingElements.insertMarker();
        p.framesetOk = false;
        p.insertionMode = InsertionMode.IN_TEMPLATE;
        p.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
        break;
      }
      case html_js_1.TAG_ID.HEAD: {
        p._err(token2, error_codes_js_1.ERR.misplacedStartTagForHeadElement);
        break;
      }
      default: {
        tokenInHead(p, token2);
      }
    }
  }
  function endTagInHead(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.HEAD: {
        p.openElements.pop();
        p.insertionMode = InsertionMode.AFTER_HEAD;
        break;
      }
      case html_js_1.TAG_ID.BODY:
      case html_js_1.TAG_ID.BR:
      case html_js_1.TAG_ID.HTML: {
        tokenInHead(p, token2);
        break;
      }
      case html_js_1.TAG_ID.TEMPLATE: {
        templateEndTagInHead(p, token2);
        break;
      }
      default: {
        p._err(token2, error_codes_js_1.ERR.endTagWithoutMatchingOpenElement);
      }
    }
  }
  function templateEndTagInHead(p, token2) {
    if (p.openElements.tmplCount > 0) {
      p.openElements.generateImpliedEndTagsThoroughly();
      if (p.openElements.currentTagId !== html_js_1.TAG_ID.TEMPLATE) {
        p._err(token2, error_codes_js_1.ERR.closingOfElementWithOpenChildElements);
      }
      p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.TEMPLATE);
      p.activeFormattingElements.clearToLastMarker();
      p.tmplInsertionModeStack.shift();
      p._resetInsertionMode();
    } else {
      p._err(token2, error_codes_js_1.ERR.endTagWithoutMatchingOpenElement);
    }
  }
  function tokenInHead(p, token2) {
    p.openElements.pop();
    p.insertionMode = InsertionMode.AFTER_HEAD;
    p._processToken(token2);
  }
  function startTagInHeadNoScript(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.HTML: {
        startTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.BASEFONT:
      case html_js_1.TAG_ID.BGSOUND:
      case html_js_1.TAG_ID.HEAD:
      case html_js_1.TAG_ID.LINK:
      case html_js_1.TAG_ID.META:
      case html_js_1.TAG_ID.NOFRAMES:
      case html_js_1.TAG_ID.STYLE: {
        startTagInHead(p, token2);
        break;
      }
      case html_js_1.TAG_ID.NOSCRIPT: {
        p._err(token2, error_codes_js_1.ERR.nestedNoscriptInHead);
        break;
      }
      default: {
        tokenInHeadNoScript(p, token2);
      }
    }
  }
  function endTagInHeadNoScript(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.NOSCRIPT: {
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_HEAD;
        break;
      }
      case html_js_1.TAG_ID.BR: {
        tokenInHeadNoScript(p, token2);
        break;
      }
      default: {
        p._err(token2, error_codes_js_1.ERR.endTagWithoutMatchingOpenElement);
      }
    }
  }
  function tokenInHeadNoScript(p, token2) {
    const errCode = token2.type === token_js_1.TokenType.EOF ? error_codes_js_1.ERR.openElementsLeftAfterEof : error_codes_js_1.ERR.disallowedContentInNoscriptInHead;
    p._err(token2, errCode);
    p.openElements.pop();
    p.insertionMode = InsertionMode.IN_HEAD;
    p._processToken(token2);
  }
  function startTagAfterHead(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.HTML: {
        startTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.BODY: {
        p._insertElement(token2, html_js_1.NS.HTML);
        p.framesetOk = false;
        p.insertionMode = InsertionMode.IN_BODY;
        break;
      }
      case html_js_1.TAG_ID.FRAMESET: {
        p._insertElement(token2, html_js_1.NS.HTML);
        p.insertionMode = InsertionMode.IN_FRAMESET;
        break;
      }
      case html_js_1.TAG_ID.BASE:
      case html_js_1.TAG_ID.BASEFONT:
      case html_js_1.TAG_ID.BGSOUND:
      case html_js_1.TAG_ID.LINK:
      case html_js_1.TAG_ID.META:
      case html_js_1.TAG_ID.NOFRAMES:
      case html_js_1.TAG_ID.SCRIPT:
      case html_js_1.TAG_ID.STYLE:
      case html_js_1.TAG_ID.TEMPLATE:
      case html_js_1.TAG_ID.TITLE: {
        p._err(token2, error_codes_js_1.ERR.abandonedHeadElementChild);
        p.openElements.push(p.headElement, html_js_1.TAG_ID.HEAD);
        startTagInHead(p, token2);
        p.openElements.remove(p.headElement);
        break;
      }
      case html_js_1.TAG_ID.HEAD: {
        p._err(token2, error_codes_js_1.ERR.misplacedStartTagForHeadElement);
        break;
      }
      default: {
        tokenAfterHead(p, token2);
      }
    }
  }
  function endTagAfterHead(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.BODY:
      case html_js_1.TAG_ID.HTML:
      case html_js_1.TAG_ID.BR: {
        tokenAfterHead(p, token2);
        break;
      }
      case html_js_1.TAG_ID.TEMPLATE: {
        templateEndTagInHead(p, token2);
        break;
      }
      default: {
        p._err(token2, error_codes_js_1.ERR.endTagWithoutMatchingOpenElement);
      }
    }
  }
  function tokenAfterHead(p, token2) {
    p._insertFakeElement(html_js_1.TAG_NAMES.BODY, html_js_1.TAG_ID.BODY);
    p.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p, token2);
  }
  function modeInBody(p, token2) {
    switch (token2.type) {
      case token_js_1.TokenType.CHARACTER: {
        characterInBody(p, token2);
        break;
      }
      case token_js_1.TokenType.WHITESPACE_CHARACTER: {
        whitespaceCharacterInBody(p, token2);
        break;
      }
      case token_js_1.TokenType.COMMENT: {
        appendComment(p, token2);
        break;
      }
      case token_js_1.TokenType.START_TAG: {
        startTagInBody(p, token2);
        break;
      }
      case token_js_1.TokenType.END_TAG: {
        endTagInBody(p, token2);
        break;
      }
      case token_js_1.TokenType.EOF: {
        eofInBody(p, token2);
        break;
      }
    }
  }
  function whitespaceCharacterInBody(p, token2) {
    p._reconstructActiveFormattingElements();
    p._insertCharacters(token2);
  }
  function characterInBody(p, token2) {
    p._reconstructActiveFormattingElements();
    p._insertCharacters(token2);
    p.framesetOk = false;
  }
  function htmlStartTagInBody(p, token2) {
    if (p.openElements.tmplCount === 0) {
      p.treeAdapter.adoptAttributes(p.openElements.items[0], token2.attrs);
    }
  }
  function bodyStartTagInBody(p, token2) {
    const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
    if (bodyElement && p.openElements.tmplCount === 0) {
      p.framesetOk = false;
      p.treeAdapter.adoptAttributes(bodyElement, token2.attrs);
    }
  }
  function framesetStartTagInBody(p, token2) {
    const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
    if (p.framesetOk && bodyElement) {
      p.treeAdapter.detachNode(bodyElement);
      p.openElements.popAllUpToHtmlElement();
      p._insertElement(token2, html_js_1.NS.HTML);
      p.insertionMode = InsertionMode.IN_FRAMESET;
    }
  }
  function addressStartTagInBody(p, token2) {
    if (p.openElements.hasInButtonScope(html_js_1.TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token2, html_js_1.NS.HTML);
  }
  function numberedHeaderStartTagInBody(p, token2) {
    if (p.openElements.hasInButtonScope(html_js_1.TAG_ID.P)) {
      p._closePElement();
    }
    if (p.openElements.currentTagId !== void 0 && html_js_1.NUMBERED_HEADERS.has(p.openElements.currentTagId)) {
      p.openElements.pop();
    }
    p._insertElement(token2, html_js_1.NS.HTML);
  }
  function preStartTagInBody(p, token2) {
    if (p.openElements.hasInButtonScope(html_js_1.TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token2, html_js_1.NS.HTML);
    p.skipNextNewLine = true;
    p.framesetOk = false;
  }
  function formStartTagInBody(p, token2) {
    const inTemplate = p.openElements.tmplCount > 0;
    if (!p.formElement || inTemplate) {
      if (p.openElements.hasInButtonScope(html_js_1.TAG_ID.P)) {
        p._closePElement();
      }
      p._insertElement(token2, html_js_1.NS.HTML);
      if (!inTemplate) {
        p.formElement = p.openElements.current;
      }
    }
  }
  function listItemStartTagInBody(p, token2) {
    p.framesetOk = false;
    const tn = token2.tagID;
    for (let i = p.openElements.stackTop; i >= 0; i--) {
      const elementId = p.openElements.tagIDs[i];
      if (tn === html_js_1.TAG_ID.LI && elementId === html_js_1.TAG_ID.LI || (tn === html_js_1.TAG_ID.DD || tn === html_js_1.TAG_ID.DT) && (elementId === html_js_1.TAG_ID.DD || elementId === html_js_1.TAG_ID.DT)) {
        p.openElements.generateImpliedEndTagsWithExclusion(elementId);
        p.openElements.popUntilTagNamePopped(elementId);
        break;
      }
      if (elementId !== html_js_1.TAG_ID.ADDRESS && elementId !== html_js_1.TAG_ID.DIV && elementId !== html_js_1.TAG_ID.P && p._isSpecialElement(p.openElements.items[i], elementId)) {
        break;
      }
    }
    if (p.openElements.hasInButtonScope(html_js_1.TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token2, html_js_1.NS.HTML);
  }
  function plaintextStartTagInBody(p, token2) {
    if (p.openElements.hasInButtonScope(html_js_1.TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token2, html_js_1.NS.HTML);
    p.tokenizer.state = index_js_1.TokenizerMode.PLAINTEXT;
  }
  function buttonStartTagInBody(p, token2) {
    if (p.openElements.hasInScope(html_js_1.TAG_ID.BUTTON)) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.BUTTON);
    }
    p._reconstructActiveFormattingElements();
    p._insertElement(token2, html_js_1.NS.HTML);
    p.framesetOk = false;
  }
  function aStartTagInBody(p, token2) {
    const activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(html_js_1.TAG_NAMES.A);
    if (activeElementEntry) {
      callAdoptionAgency(p, token2);
      p.openElements.remove(activeElementEntry.element);
      p.activeFormattingElements.removeEntry(activeElementEntry);
    }
    p._reconstructActiveFormattingElements();
    p._insertElement(token2, html_js_1.NS.HTML);
    p.activeFormattingElements.pushElement(p.openElements.current, token2);
  }
  function bStartTagInBody(p, token2) {
    p._reconstructActiveFormattingElements();
    p._insertElement(token2, html_js_1.NS.HTML);
    p.activeFormattingElements.pushElement(p.openElements.current, token2);
  }
  function nobrStartTagInBody(p, token2) {
    p._reconstructActiveFormattingElements();
    if (p.openElements.hasInScope(html_js_1.TAG_ID.NOBR)) {
      callAdoptionAgency(p, token2);
      p._reconstructActiveFormattingElements();
    }
    p._insertElement(token2, html_js_1.NS.HTML);
    p.activeFormattingElements.pushElement(p.openElements.current, token2);
  }
  function appletStartTagInBody(p, token2) {
    p._reconstructActiveFormattingElements();
    p._insertElement(token2, html_js_1.NS.HTML);
    p.activeFormattingElements.insertMarker();
    p.framesetOk = false;
  }
  function tableStartTagInBody(p, token2) {
    if (p.treeAdapter.getDocumentMode(p.document) !== html_js_1.DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope(html_js_1.TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token2, html_js_1.NS.HTML);
    p.framesetOk = false;
    p.insertionMode = InsertionMode.IN_TABLE;
  }
  function areaStartTagInBody(p, token2) {
    p._reconstructActiveFormattingElements();
    p._appendElement(token2, html_js_1.NS.HTML);
    p.framesetOk = false;
    token2.ackSelfClosing = true;
  }
  function isHiddenInput(token2) {
    const inputType = (0, token_js_1.getTokenAttr)(token2, html_js_1.ATTRS.TYPE);
    return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
  }
  function inputStartTagInBody(p, token2) {
    p._reconstructActiveFormattingElements();
    p._appendElement(token2, html_js_1.NS.HTML);
    if (!isHiddenInput(token2)) {
      p.framesetOk = false;
    }
    token2.ackSelfClosing = true;
  }
  function paramStartTagInBody(p, token2) {
    p._appendElement(token2, html_js_1.NS.HTML);
    token2.ackSelfClosing = true;
  }
  function hrStartTagInBody(p, token2) {
    if (p.openElements.hasInButtonScope(html_js_1.TAG_ID.P)) {
      p._closePElement();
    }
    p._appendElement(token2, html_js_1.NS.HTML);
    p.framesetOk = false;
    token2.ackSelfClosing = true;
  }
  function imageStartTagInBody(p, token2) {
    token2.tagName = html_js_1.TAG_NAMES.IMG;
    token2.tagID = html_js_1.TAG_ID.IMG;
    areaStartTagInBody(p, token2);
  }
  function textareaStartTagInBody(p, token2) {
    p._insertElement(token2, html_js_1.NS.HTML);
    p.skipNextNewLine = true;
    p.tokenizer.state = index_js_1.TokenizerMode.RCDATA;
    p.originalInsertionMode = p.insertionMode;
    p.framesetOk = false;
    p.insertionMode = InsertionMode.TEXT;
  }
  function xmpStartTagInBody(p, token2) {
    if (p.openElements.hasInButtonScope(html_js_1.TAG_ID.P)) {
      p._closePElement();
    }
    p._reconstructActiveFormattingElements();
    p.framesetOk = false;
    p._switchToTextParsing(token2, index_js_1.TokenizerMode.RAWTEXT);
  }
  function iframeStartTagInBody(p, token2) {
    p.framesetOk = false;
    p._switchToTextParsing(token2, index_js_1.TokenizerMode.RAWTEXT);
  }
  function rawTextStartTagInBody(p, token2) {
    p._switchToTextParsing(token2, index_js_1.TokenizerMode.RAWTEXT);
  }
  function selectStartTagInBody(p, token2) {
    p._reconstructActiveFormattingElements();
    p._insertElement(token2, html_js_1.NS.HTML);
    p.framesetOk = false;
    p.insertionMode = p.insertionMode === InsertionMode.IN_TABLE || p.insertionMode === InsertionMode.IN_CAPTION || p.insertionMode === InsertionMode.IN_TABLE_BODY || p.insertionMode === InsertionMode.IN_ROW || p.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
  }
  function optgroupStartTagInBody(p, token2) {
    if (p.openElements.currentTagId === html_js_1.TAG_ID.OPTION) {
      p.openElements.pop();
    }
    p._reconstructActiveFormattingElements();
    p._insertElement(token2, html_js_1.NS.HTML);
  }
  function rbStartTagInBody(p, token2) {
    if (p.openElements.hasInScope(html_js_1.TAG_ID.RUBY)) {
      p.openElements.generateImpliedEndTags();
    }
    p._insertElement(token2, html_js_1.NS.HTML);
  }
  function rtStartTagInBody(p, token2) {
    if (p.openElements.hasInScope(html_js_1.TAG_ID.RUBY)) {
      p.openElements.generateImpliedEndTagsWithExclusion(html_js_1.TAG_ID.RTC);
    }
    p._insertElement(token2, html_js_1.NS.HTML);
  }
  function mathStartTagInBody(p, token2) {
    p._reconstructActiveFormattingElements();
    foreignContent2.adjustTokenMathMLAttrs(token2);
    foreignContent2.adjustTokenXMLAttrs(token2);
    if (token2.selfClosing) {
      p._appendElement(token2, html_js_1.NS.MATHML);
    } else {
      p._insertElement(token2, html_js_1.NS.MATHML);
    }
    token2.ackSelfClosing = true;
  }
  function svgStartTagInBody(p, token2) {
    p._reconstructActiveFormattingElements();
    foreignContent2.adjustTokenSVGAttrs(token2);
    foreignContent2.adjustTokenXMLAttrs(token2);
    if (token2.selfClosing) {
      p._appendElement(token2, html_js_1.NS.SVG);
    } else {
      p._insertElement(token2, html_js_1.NS.SVG);
    }
    token2.ackSelfClosing = true;
  }
  function genericStartTagInBody(p, token2) {
    p._reconstructActiveFormattingElements();
    p._insertElement(token2, html_js_1.NS.HTML);
  }
  function startTagInBody(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.I:
      case html_js_1.TAG_ID.S:
      case html_js_1.TAG_ID.B:
      case html_js_1.TAG_ID.U:
      case html_js_1.TAG_ID.EM:
      case html_js_1.TAG_ID.TT:
      case html_js_1.TAG_ID.BIG:
      case html_js_1.TAG_ID.CODE:
      case html_js_1.TAG_ID.FONT:
      case html_js_1.TAG_ID.SMALL:
      case html_js_1.TAG_ID.STRIKE:
      case html_js_1.TAG_ID.STRONG: {
        bStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.A: {
        aStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.H1:
      case html_js_1.TAG_ID.H2:
      case html_js_1.TAG_ID.H3:
      case html_js_1.TAG_ID.H4:
      case html_js_1.TAG_ID.H5:
      case html_js_1.TAG_ID.H6: {
        numberedHeaderStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.P:
      case html_js_1.TAG_ID.DL:
      case html_js_1.TAG_ID.OL:
      case html_js_1.TAG_ID.UL:
      case html_js_1.TAG_ID.DIV:
      case html_js_1.TAG_ID.DIR:
      case html_js_1.TAG_ID.NAV:
      case html_js_1.TAG_ID.MAIN:
      case html_js_1.TAG_ID.MENU:
      case html_js_1.TAG_ID.ASIDE:
      case html_js_1.TAG_ID.CENTER:
      case html_js_1.TAG_ID.FIGURE:
      case html_js_1.TAG_ID.FOOTER:
      case html_js_1.TAG_ID.HEADER:
      case html_js_1.TAG_ID.HGROUP:
      case html_js_1.TAG_ID.DIALOG:
      case html_js_1.TAG_ID.DETAILS:
      case html_js_1.TAG_ID.ADDRESS:
      case html_js_1.TAG_ID.ARTICLE:
      case html_js_1.TAG_ID.SEARCH:
      case html_js_1.TAG_ID.SECTION:
      case html_js_1.TAG_ID.SUMMARY:
      case html_js_1.TAG_ID.FIELDSET:
      case html_js_1.TAG_ID.BLOCKQUOTE:
      case html_js_1.TAG_ID.FIGCAPTION: {
        addressStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.LI:
      case html_js_1.TAG_ID.DD:
      case html_js_1.TAG_ID.DT: {
        listItemStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.BR:
      case html_js_1.TAG_ID.IMG:
      case html_js_1.TAG_ID.WBR:
      case html_js_1.TAG_ID.AREA:
      case html_js_1.TAG_ID.EMBED:
      case html_js_1.TAG_ID.KEYGEN: {
        areaStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.HR: {
        hrStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.RB:
      case html_js_1.TAG_ID.RTC: {
        rbStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.RT:
      case html_js_1.TAG_ID.RP: {
        rtStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.PRE:
      case html_js_1.TAG_ID.LISTING: {
        preStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.XMP: {
        xmpStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.SVG: {
        svgStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.HTML: {
        htmlStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.BASE:
      case html_js_1.TAG_ID.LINK:
      case html_js_1.TAG_ID.META:
      case html_js_1.TAG_ID.STYLE:
      case html_js_1.TAG_ID.TITLE:
      case html_js_1.TAG_ID.SCRIPT:
      case html_js_1.TAG_ID.BGSOUND:
      case html_js_1.TAG_ID.BASEFONT:
      case html_js_1.TAG_ID.TEMPLATE: {
        startTagInHead(p, token2);
        break;
      }
      case html_js_1.TAG_ID.BODY: {
        bodyStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.FORM: {
        formStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.NOBR: {
        nobrStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.MATH: {
        mathStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.TABLE: {
        tableStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.INPUT: {
        inputStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.PARAM:
      case html_js_1.TAG_ID.TRACK:
      case html_js_1.TAG_ID.SOURCE: {
        paramStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.IMAGE: {
        imageStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.BUTTON: {
        buttonStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.APPLET:
      case html_js_1.TAG_ID.OBJECT:
      case html_js_1.TAG_ID.MARQUEE: {
        appletStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.IFRAME: {
        iframeStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.SELECT: {
        selectStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.OPTION:
      case html_js_1.TAG_ID.OPTGROUP: {
        optgroupStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.NOEMBED:
      case html_js_1.TAG_ID.NOFRAMES: {
        rawTextStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.FRAMESET: {
        framesetStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.TEXTAREA: {
        textareaStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.NOSCRIPT: {
        if (p.options.scriptingEnabled) {
          rawTextStartTagInBody(p, token2);
        } else {
          genericStartTagInBody(p, token2);
        }
        break;
      }
      case html_js_1.TAG_ID.PLAINTEXT: {
        plaintextStartTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.COL:
      case html_js_1.TAG_ID.TH:
      case html_js_1.TAG_ID.TD:
      case html_js_1.TAG_ID.TR:
      case html_js_1.TAG_ID.HEAD:
      case html_js_1.TAG_ID.FRAME:
      case html_js_1.TAG_ID.TBODY:
      case html_js_1.TAG_ID.TFOOT:
      case html_js_1.TAG_ID.THEAD:
      case html_js_1.TAG_ID.CAPTION:
      case html_js_1.TAG_ID.COLGROUP: {
        break;
      }
      default: {
        genericStartTagInBody(p, token2);
      }
    }
  }
  function bodyEndTagInBody(p, token2) {
    if (p.openElements.hasInScope(html_js_1.TAG_ID.BODY)) {
      p.insertionMode = InsertionMode.AFTER_BODY;
      if (p.options.sourceCodeLocationInfo) {
        const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
        if (bodyElement) {
          p._setEndLocation(bodyElement, token2);
        }
      }
    }
  }
  function htmlEndTagInBody(p, token2) {
    if (p.openElements.hasInScope(html_js_1.TAG_ID.BODY)) {
      p.insertionMode = InsertionMode.AFTER_BODY;
      endTagAfterBody(p, token2);
    }
  }
  function addressEndTagInBody(p, token2) {
    const tn = token2.tagID;
    if (p.openElements.hasInScope(tn)) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilTagNamePopped(tn);
    }
  }
  function formEndTagInBody(p) {
    const inTemplate = p.openElements.tmplCount > 0;
    const { formElement } = p;
    if (!inTemplate) {
      p.formElement = null;
    }
    if ((formElement || inTemplate) && p.openElements.hasInScope(html_js_1.TAG_ID.FORM)) {
      p.openElements.generateImpliedEndTags();
      if (inTemplate) {
        p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.FORM);
      } else if (formElement) {
        p.openElements.remove(formElement);
      }
    }
  }
  function pEndTagInBody(p) {
    if (!p.openElements.hasInButtonScope(html_js_1.TAG_ID.P)) {
      p._insertFakeElement(html_js_1.TAG_NAMES.P, html_js_1.TAG_ID.P);
    }
    p._closePElement();
  }
  function liEndTagInBody(p) {
    if (p.openElements.hasInListItemScope(html_js_1.TAG_ID.LI)) {
      p.openElements.generateImpliedEndTagsWithExclusion(html_js_1.TAG_ID.LI);
      p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.LI);
    }
  }
  function ddEndTagInBody(p, token2) {
    const tn = token2.tagID;
    if (p.openElements.hasInScope(tn)) {
      p.openElements.generateImpliedEndTagsWithExclusion(tn);
      p.openElements.popUntilTagNamePopped(tn);
    }
  }
  function numberedHeaderEndTagInBody(p) {
    if (p.openElements.hasNumberedHeaderInScope()) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilNumberedHeaderPopped();
    }
  }
  function appletEndTagInBody(p, token2) {
    const tn = token2.tagID;
    if (p.openElements.hasInScope(tn)) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilTagNamePopped(tn);
      p.activeFormattingElements.clearToLastMarker();
    }
  }
  function brEndTagInBody(p) {
    p._reconstructActiveFormattingElements();
    p._insertFakeElement(html_js_1.TAG_NAMES.BR, html_js_1.TAG_ID.BR);
    p.openElements.pop();
    p.framesetOk = false;
  }
  function genericEndTagInBody(p, token2) {
    const tn = token2.tagName;
    const tid = token2.tagID;
    for (let i = p.openElements.stackTop; i > 0; i--) {
      const element = p.openElements.items[i];
      const elementId = p.openElements.tagIDs[i];
      if (tid === elementId && (tid !== html_js_1.TAG_ID.UNKNOWN || p.treeAdapter.getTagName(element) === tn)) {
        p.openElements.generateImpliedEndTagsWithExclusion(tid);
        if (p.openElements.stackTop >= i)
          p.openElements.shortenToLength(i);
        break;
      }
      if (p._isSpecialElement(element, elementId)) {
        break;
      }
    }
  }
  function endTagInBody(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.A:
      case html_js_1.TAG_ID.B:
      case html_js_1.TAG_ID.I:
      case html_js_1.TAG_ID.S:
      case html_js_1.TAG_ID.U:
      case html_js_1.TAG_ID.EM:
      case html_js_1.TAG_ID.TT:
      case html_js_1.TAG_ID.BIG:
      case html_js_1.TAG_ID.CODE:
      case html_js_1.TAG_ID.FONT:
      case html_js_1.TAG_ID.NOBR:
      case html_js_1.TAG_ID.SMALL:
      case html_js_1.TAG_ID.STRIKE:
      case html_js_1.TAG_ID.STRONG: {
        callAdoptionAgency(p, token2);
        break;
      }
      case html_js_1.TAG_ID.P: {
        pEndTagInBody(p);
        break;
      }
      case html_js_1.TAG_ID.DL:
      case html_js_1.TAG_ID.UL:
      case html_js_1.TAG_ID.OL:
      case html_js_1.TAG_ID.DIR:
      case html_js_1.TAG_ID.DIV:
      case html_js_1.TAG_ID.NAV:
      case html_js_1.TAG_ID.PRE:
      case html_js_1.TAG_ID.MAIN:
      case html_js_1.TAG_ID.MENU:
      case html_js_1.TAG_ID.ASIDE:
      case html_js_1.TAG_ID.BUTTON:
      case html_js_1.TAG_ID.CENTER:
      case html_js_1.TAG_ID.FIGURE:
      case html_js_1.TAG_ID.FOOTER:
      case html_js_1.TAG_ID.HEADER:
      case html_js_1.TAG_ID.HGROUP:
      case html_js_1.TAG_ID.DIALOG:
      case html_js_1.TAG_ID.ADDRESS:
      case html_js_1.TAG_ID.ARTICLE:
      case html_js_1.TAG_ID.DETAILS:
      case html_js_1.TAG_ID.SEARCH:
      case html_js_1.TAG_ID.SECTION:
      case html_js_1.TAG_ID.SUMMARY:
      case html_js_1.TAG_ID.LISTING:
      case html_js_1.TAG_ID.FIELDSET:
      case html_js_1.TAG_ID.BLOCKQUOTE:
      case html_js_1.TAG_ID.FIGCAPTION: {
        addressEndTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.LI: {
        liEndTagInBody(p);
        break;
      }
      case html_js_1.TAG_ID.DD:
      case html_js_1.TAG_ID.DT: {
        ddEndTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.H1:
      case html_js_1.TAG_ID.H2:
      case html_js_1.TAG_ID.H3:
      case html_js_1.TAG_ID.H4:
      case html_js_1.TAG_ID.H5:
      case html_js_1.TAG_ID.H6: {
        numberedHeaderEndTagInBody(p);
        break;
      }
      case html_js_1.TAG_ID.BR: {
        brEndTagInBody(p);
        break;
      }
      case html_js_1.TAG_ID.BODY: {
        bodyEndTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.HTML: {
        htmlEndTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.FORM: {
        formEndTagInBody(p);
        break;
      }
      case html_js_1.TAG_ID.APPLET:
      case html_js_1.TAG_ID.OBJECT:
      case html_js_1.TAG_ID.MARQUEE: {
        appletEndTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.TEMPLATE: {
        templateEndTagInHead(p, token2);
        break;
      }
      default: {
        genericEndTagInBody(p, token2);
      }
    }
  }
  function eofInBody(p, token2) {
    if (p.tmplInsertionModeStack.length > 0) {
      eofInTemplate(p, token2);
    } else {
      stopParsing(p, token2);
    }
  }
  function endTagInText(p, token2) {
    var _a;
    if (token2.tagID === html_js_1.TAG_ID.SCRIPT) {
      (_a = p.scriptHandler) === null || _a === void 0 ? void 0 : _a.call(p, p.openElements.current);
    }
    p.openElements.pop();
    p.insertionMode = p.originalInsertionMode;
  }
  function eofInText(p, token2) {
    p._err(token2, error_codes_js_1.ERR.eofInElementThatCanContainOnlyText);
    p.openElements.pop();
    p.insertionMode = p.originalInsertionMode;
    p.onEof(token2);
  }
  function characterInTable(p, token2) {
    if (p.openElements.currentTagId !== void 0 && TABLE_STRUCTURE_TAGS.has(p.openElements.currentTagId)) {
      p.pendingCharacterTokens.length = 0;
      p.hasNonWhitespacePendingCharacterToken = false;
      p.originalInsertionMode = p.insertionMode;
      p.insertionMode = InsertionMode.IN_TABLE_TEXT;
      switch (token2.type) {
        case token_js_1.TokenType.CHARACTER: {
          characterInTableText(p, token2);
          break;
        }
        case token_js_1.TokenType.WHITESPACE_CHARACTER: {
          whitespaceCharacterInTableText(p, token2);
          break;
        }
      }
    } else {
      tokenInTable(p, token2);
    }
  }
  function captionStartTagInTable(p, token2) {
    p.openElements.clearBackToTableContext();
    p.activeFormattingElements.insertMarker();
    p._insertElement(token2, html_js_1.NS.HTML);
    p.insertionMode = InsertionMode.IN_CAPTION;
  }
  function colgroupStartTagInTable(p, token2) {
    p.openElements.clearBackToTableContext();
    p._insertElement(token2, html_js_1.NS.HTML);
    p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  }
  function colStartTagInTable(p, token2) {
    p.openElements.clearBackToTableContext();
    p._insertFakeElement(html_js_1.TAG_NAMES.COLGROUP, html_js_1.TAG_ID.COLGROUP);
    p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
    startTagInColumnGroup(p, token2);
  }
  function tbodyStartTagInTable(p, token2) {
    p.openElements.clearBackToTableContext();
    p._insertElement(token2, html_js_1.NS.HTML);
    p.insertionMode = InsertionMode.IN_TABLE_BODY;
  }
  function tdStartTagInTable(p, token2) {
    p.openElements.clearBackToTableContext();
    p._insertFakeElement(html_js_1.TAG_NAMES.TBODY, html_js_1.TAG_ID.TBODY);
    p.insertionMode = InsertionMode.IN_TABLE_BODY;
    startTagInTableBody(p, token2);
  }
  function tableStartTagInTable(p, token2) {
    if (p.openElements.hasInTableScope(html_js_1.TAG_ID.TABLE)) {
      p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.TABLE);
      p._resetInsertionMode();
      p._processStartTag(token2);
    }
  }
  function inputStartTagInTable(p, token2) {
    if (isHiddenInput(token2)) {
      p._appendElement(token2, html_js_1.NS.HTML);
    } else {
      tokenInTable(p, token2);
    }
    token2.ackSelfClosing = true;
  }
  function formStartTagInTable(p, token2) {
    if (!p.formElement && p.openElements.tmplCount === 0) {
      p._insertElement(token2, html_js_1.NS.HTML);
      p.formElement = p.openElements.current;
      p.openElements.pop();
    }
  }
  function startTagInTable(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.TD:
      case html_js_1.TAG_ID.TH:
      case html_js_1.TAG_ID.TR: {
        tdStartTagInTable(p, token2);
        break;
      }
      case html_js_1.TAG_ID.STYLE:
      case html_js_1.TAG_ID.SCRIPT:
      case html_js_1.TAG_ID.TEMPLATE: {
        startTagInHead(p, token2);
        break;
      }
      case html_js_1.TAG_ID.COL: {
        colStartTagInTable(p, token2);
        break;
      }
      case html_js_1.TAG_ID.FORM: {
        formStartTagInTable(p, token2);
        break;
      }
      case html_js_1.TAG_ID.TABLE: {
        tableStartTagInTable(p, token2);
        break;
      }
      case html_js_1.TAG_ID.TBODY:
      case html_js_1.TAG_ID.TFOOT:
      case html_js_1.TAG_ID.THEAD: {
        tbodyStartTagInTable(p, token2);
        break;
      }
      case html_js_1.TAG_ID.INPUT: {
        inputStartTagInTable(p, token2);
        break;
      }
      case html_js_1.TAG_ID.CAPTION: {
        captionStartTagInTable(p, token2);
        break;
      }
      case html_js_1.TAG_ID.COLGROUP: {
        colgroupStartTagInTable(p, token2);
        break;
      }
      default: {
        tokenInTable(p, token2);
      }
    }
  }
  function endTagInTable(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.TABLE: {
        if (p.openElements.hasInTableScope(html_js_1.TAG_ID.TABLE)) {
          p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.TABLE);
          p._resetInsertionMode();
        }
        break;
      }
      case html_js_1.TAG_ID.TEMPLATE: {
        templateEndTagInHead(p, token2);
        break;
      }
      case html_js_1.TAG_ID.BODY:
      case html_js_1.TAG_ID.CAPTION:
      case html_js_1.TAG_ID.COL:
      case html_js_1.TAG_ID.COLGROUP:
      case html_js_1.TAG_ID.HTML:
      case html_js_1.TAG_ID.TBODY:
      case html_js_1.TAG_ID.TD:
      case html_js_1.TAG_ID.TFOOT:
      case html_js_1.TAG_ID.TH:
      case html_js_1.TAG_ID.THEAD:
      case html_js_1.TAG_ID.TR: {
        break;
      }
      default: {
        tokenInTable(p, token2);
      }
    }
  }
  function tokenInTable(p, token2) {
    const savedFosterParentingState = p.fosterParentingEnabled;
    p.fosterParentingEnabled = true;
    modeInBody(p, token2);
    p.fosterParentingEnabled = savedFosterParentingState;
  }
  function whitespaceCharacterInTableText(p, token2) {
    p.pendingCharacterTokens.push(token2);
  }
  function characterInTableText(p, token2) {
    p.pendingCharacterTokens.push(token2);
    p.hasNonWhitespacePendingCharacterToken = true;
  }
  function tokenInTableText(p, token2) {
    let i = 0;
    if (p.hasNonWhitespacePendingCharacterToken) {
      for (; i < p.pendingCharacterTokens.length; i++) {
        tokenInTable(p, p.pendingCharacterTokens[i]);
      }
    } else {
      for (; i < p.pendingCharacterTokens.length; i++) {
        p._insertCharacters(p.pendingCharacterTokens[i]);
      }
    }
    p.insertionMode = p.originalInsertionMode;
    p._processToken(token2);
  }
  const TABLE_VOID_ELEMENTS = /* @__PURE__ */ new Set([html_js_1.TAG_ID.CAPTION, html_js_1.TAG_ID.COL, html_js_1.TAG_ID.COLGROUP, html_js_1.TAG_ID.TBODY, html_js_1.TAG_ID.TD, html_js_1.TAG_ID.TFOOT, html_js_1.TAG_ID.TH, html_js_1.TAG_ID.THEAD, html_js_1.TAG_ID.TR]);
  function startTagInCaption(p, token2) {
    const tn = token2.tagID;
    if (TABLE_VOID_ELEMENTS.has(tn)) {
      if (p.openElements.hasInTableScope(html_js_1.TAG_ID.CAPTION)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.CAPTION);
        p.activeFormattingElements.clearToLastMarker();
        p.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p, token2);
      }
    } else {
      startTagInBody(p, token2);
    }
  }
  function endTagInCaption(p, token2) {
    const tn = token2.tagID;
    switch (tn) {
      case html_js_1.TAG_ID.CAPTION:
      case html_js_1.TAG_ID.TABLE: {
        if (p.openElements.hasInTableScope(html_js_1.TAG_ID.CAPTION)) {
          p.openElements.generateImpliedEndTags();
          p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.CAPTION);
          p.activeFormattingElements.clearToLastMarker();
          p.insertionMode = InsertionMode.IN_TABLE;
          if (tn === html_js_1.TAG_ID.TABLE) {
            endTagInTable(p, token2);
          }
        }
        break;
      }
      case html_js_1.TAG_ID.BODY:
      case html_js_1.TAG_ID.COL:
      case html_js_1.TAG_ID.COLGROUP:
      case html_js_1.TAG_ID.HTML:
      case html_js_1.TAG_ID.TBODY:
      case html_js_1.TAG_ID.TD:
      case html_js_1.TAG_ID.TFOOT:
      case html_js_1.TAG_ID.TH:
      case html_js_1.TAG_ID.THEAD:
      case html_js_1.TAG_ID.TR: {
        break;
      }
      default: {
        endTagInBody(p, token2);
      }
    }
  }
  function startTagInColumnGroup(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.HTML: {
        startTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.COL: {
        p._appendElement(token2, html_js_1.NS.HTML);
        token2.ackSelfClosing = true;
        break;
      }
      case html_js_1.TAG_ID.TEMPLATE: {
        startTagInHead(p, token2);
        break;
      }
      default: {
        tokenInColumnGroup(p, token2);
      }
    }
  }
  function endTagInColumnGroup(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.COLGROUP: {
        if (p.openElements.currentTagId === html_js_1.TAG_ID.COLGROUP) {
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE;
        }
        break;
      }
      case html_js_1.TAG_ID.TEMPLATE: {
        templateEndTagInHead(p, token2);
        break;
      }
      case html_js_1.TAG_ID.COL: {
        break;
      }
      default: {
        tokenInColumnGroup(p, token2);
      }
    }
  }
  function tokenInColumnGroup(p, token2) {
    if (p.openElements.currentTagId === html_js_1.TAG_ID.COLGROUP) {
      p.openElements.pop();
      p.insertionMode = InsertionMode.IN_TABLE;
      p._processToken(token2);
    }
  }
  function startTagInTableBody(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.TR: {
        p.openElements.clearBackToTableBodyContext();
        p._insertElement(token2, html_js_1.NS.HTML);
        p.insertionMode = InsertionMode.IN_ROW;
        break;
      }
      case html_js_1.TAG_ID.TH:
      case html_js_1.TAG_ID.TD: {
        p.openElements.clearBackToTableBodyContext();
        p._insertFakeElement(html_js_1.TAG_NAMES.TR, html_js_1.TAG_ID.TR);
        p.insertionMode = InsertionMode.IN_ROW;
        startTagInRow(p, token2);
        break;
      }
      case html_js_1.TAG_ID.CAPTION:
      case html_js_1.TAG_ID.COL:
      case html_js_1.TAG_ID.COLGROUP:
      case html_js_1.TAG_ID.TBODY:
      case html_js_1.TAG_ID.TFOOT:
      case html_js_1.TAG_ID.THEAD: {
        if (p.openElements.hasTableBodyContextInTableScope()) {
          p.openElements.clearBackToTableBodyContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE;
          startTagInTable(p, token2);
        }
        break;
      }
      default: {
        startTagInTable(p, token2);
      }
    }
  }
  function endTagInTableBody(p, token2) {
    const tn = token2.tagID;
    switch (token2.tagID) {
      case html_js_1.TAG_ID.TBODY:
      case html_js_1.TAG_ID.TFOOT:
      case html_js_1.TAG_ID.THEAD: {
        if (p.openElements.hasInTableScope(tn)) {
          p.openElements.clearBackToTableBodyContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE;
        }
        break;
      }
      case html_js_1.TAG_ID.TABLE: {
        if (p.openElements.hasTableBodyContextInTableScope()) {
          p.openElements.clearBackToTableBodyContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE;
          endTagInTable(p, token2);
        }
        break;
      }
      case html_js_1.TAG_ID.BODY:
      case html_js_1.TAG_ID.CAPTION:
      case html_js_1.TAG_ID.COL:
      case html_js_1.TAG_ID.COLGROUP:
      case html_js_1.TAG_ID.HTML:
      case html_js_1.TAG_ID.TD:
      case html_js_1.TAG_ID.TH:
      case html_js_1.TAG_ID.TR: {
        break;
      }
      default: {
        endTagInTable(p, token2);
      }
    }
  }
  function startTagInRow(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.TH:
      case html_js_1.TAG_ID.TD: {
        p.openElements.clearBackToTableRowContext();
        p._insertElement(token2, html_js_1.NS.HTML);
        p.insertionMode = InsertionMode.IN_CELL;
        p.activeFormattingElements.insertMarker();
        break;
      }
      case html_js_1.TAG_ID.CAPTION:
      case html_js_1.TAG_ID.COL:
      case html_js_1.TAG_ID.COLGROUP:
      case html_js_1.TAG_ID.TBODY:
      case html_js_1.TAG_ID.TFOOT:
      case html_js_1.TAG_ID.THEAD:
      case html_js_1.TAG_ID.TR: {
        if (p.openElements.hasInTableScope(html_js_1.TAG_ID.TR)) {
          p.openElements.clearBackToTableRowContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE_BODY;
          startTagInTableBody(p, token2);
        }
        break;
      }
      default: {
        startTagInTable(p, token2);
      }
    }
  }
  function endTagInRow(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.TR: {
        if (p.openElements.hasInTableScope(html_js_1.TAG_ID.TR)) {
          p.openElements.clearBackToTableRowContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE_BODY;
        }
        break;
      }
      case html_js_1.TAG_ID.TABLE: {
        if (p.openElements.hasInTableScope(html_js_1.TAG_ID.TR)) {
          p.openElements.clearBackToTableRowContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE_BODY;
          endTagInTableBody(p, token2);
        }
        break;
      }
      case html_js_1.TAG_ID.TBODY:
      case html_js_1.TAG_ID.TFOOT:
      case html_js_1.TAG_ID.THEAD: {
        if (p.openElements.hasInTableScope(token2.tagID) || p.openElements.hasInTableScope(html_js_1.TAG_ID.TR)) {
          p.openElements.clearBackToTableRowContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE_BODY;
          endTagInTableBody(p, token2);
        }
        break;
      }
      case html_js_1.TAG_ID.BODY:
      case html_js_1.TAG_ID.CAPTION:
      case html_js_1.TAG_ID.COL:
      case html_js_1.TAG_ID.COLGROUP:
      case html_js_1.TAG_ID.HTML:
      case html_js_1.TAG_ID.TD:
      case html_js_1.TAG_ID.TH: {
        break;
      }
      default: {
        endTagInTable(p, token2);
      }
    }
  }
  function startTagInCell(p, token2) {
    const tn = token2.tagID;
    if (TABLE_VOID_ELEMENTS.has(tn)) {
      if (p.openElements.hasInTableScope(html_js_1.TAG_ID.TD) || p.openElements.hasInTableScope(html_js_1.TAG_ID.TH)) {
        p._closeTableCell();
        startTagInRow(p, token2);
      }
    } else {
      startTagInBody(p, token2);
    }
  }
  function endTagInCell(p, token2) {
    const tn = token2.tagID;
    switch (tn) {
      case html_js_1.TAG_ID.TD:
      case html_js_1.TAG_ID.TH: {
        if (p.openElements.hasInTableScope(tn)) {
          p.openElements.generateImpliedEndTags();
          p.openElements.popUntilTagNamePopped(tn);
          p.activeFormattingElements.clearToLastMarker();
          p.insertionMode = InsertionMode.IN_ROW;
        }
        break;
      }
      case html_js_1.TAG_ID.TABLE:
      case html_js_1.TAG_ID.TBODY:
      case html_js_1.TAG_ID.TFOOT:
      case html_js_1.TAG_ID.THEAD:
      case html_js_1.TAG_ID.TR: {
        if (p.openElements.hasInTableScope(tn)) {
          p._closeTableCell();
          endTagInRow(p, token2);
        }
        break;
      }
      case html_js_1.TAG_ID.BODY:
      case html_js_1.TAG_ID.CAPTION:
      case html_js_1.TAG_ID.COL:
      case html_js_1.TAG_ID.COLGROUP:
      case html_js_1.TAG_ID.HTML: {
        break;
      }
      default: {
        endTagInBody(p, token2);
      }
    }
  }
  function startTagInSelect(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.HTML: {
        startTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.OPTION: {
        if (p.openElements.currentTagId === html_js_1.TAG_ID.OPTION) {
          p.openElements.pop();
        }
        p._insertElement(token2, html_js_1.NS.HTML);
        break;
      }
      case html_js_1.TAG_ID.OPTGROUP: {
        if (p.openElements.currentTagId === html_js_1.TAG_ID.OPTION) {
          p.openElements.pop();
        }
        if (p.openElements.currentTagId === html_js_1.TAG_ID.OPTGROUP) {
          p.openElements.pop();
        }
        p._insertElement(token2, html_js_1.NS.HTML);
        break;
      }
      case html_js_1.TAG_ID.HR: {
        if (p.openElements.currentTagId === html_js_1.TAG_ID.OPTION) {
          p.openElements.pop();
        }
        if (p.openElements.currentTagId === html_js_1.TAG_ID.OPTGROUP) {
          p.openElements.pop();
        }
        p._appendElement(token2, html_js_1.NS.HTML);
        token2.ackSelfClosing = true;
        break;
      }
      case html_js_1.TAG_ID.INPUT:
      case html_js_1.TAG_ID.KEYGEN:
      case html_js_1.TAG_ID.TEXTAREA:
      case html_js_1.TAG_ID.SELECT: {
        if (p.openElements.hasInSelectScope(html_js_1.TAG_ID.SELECT)) {
          p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.SELECT);
          p._resetInsertionMode();
          if (token2.tagID !== html_js_1.TAG_ID.SELECT) {
            p._processStartTag(token2);
          }
        }
        break;
      }
      case html_js_1.TAG_ID.SCRIPT:
      case html_js_1.TAG_ID.TEMPLATE: {
        startTagInHead(p, token2);
        break;
      }
    }
  }
  function endTagInSelect(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.OPTGROUP: {
        if (p.openElements.stackTop > 0 && p.openElements.currentTagId === html_js_1.TAG_ID.OPTION && p.openElements.tagIDs[p.openElements.stackTop - 1] === html_js_1.TAG_ID.OPTGROUP) {
          p.openElements.pop();
        }
        if (p.openElements.currentTagId === html_js_1.TAG_ID.OPTGROUP) {
          p.openElements.pop();
        }
        break;
      }
      case html_js_1.TAG_ID.OPTION: {
        if (p.openElements.currentTagId === html_js_1.TAG_ID.OPTION) {
          p.openElements.pop();
        }
        break;
      }
      case html_js_1.TAG_ID.SELECT: {
        if (p.openElements.hasInSelectScope(html_js_1.TAG_ID.SELECT)) {
          p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.SELECT);
          p._resetInsertionMode();
        }
        break;
      }
      case html_js_1.TAG_ID.TEMPLATE: {
        templateEndTagInHead(p, token2);
        break;
      }
    }
  }
  function startTagInSelectInTable(p, token2) {
    const tn = token2.tagID;
    if (tn === html_js_1.TAG_ID.CAPTION || tn === html_js_1.TAG_ID.TABLE || tn === html_js_1.TAG_ID.TBODY || tn === html_js_1.TAG_ID.TFOOT || tn === html_js_1.TAG_ID.THEAD || tn === html_js_1.TAG_ID.TR || tn === html_js_1.TAG_ID.TD || tn === html_js_1.TAG_ID.TH) {
      p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.SELECT);
      p._resetInsertionMode();
      p._processStartTag(token2);
    } else {
      startTagInSelect(p, token2);
    }
  }
  function endTagInSelectInTable(p, token2) {
    const tn = token2.tagID;
    if (tn === html_js_1.TAG_ID.CAPTION || tn === html_js_1.TAG_ID.TABLE || tn === html_js_1.TAG_ID.TBODY || tn === html_js_1.TAG_ID.TFOOT || tn === html_js_1.TAG_ID.THEAD || tn === html_js_1.TAG_ID.TR || tn === html_js_1.TAG_ID.TD || tn === html_js_1.TAG_ID.TH) {
      if (p.openElements.hasInTableScope(tn)) {
        p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.SELECT);
        p._resetInsertionMode();
        p.onEndTag(token2);
      }
    } else {
      endTagInSelect(p, token2);
    }
  }
  function startTagInTemplate(p, token2) {
    switch (token2.tagID) {
      // First, handle tags that can start without a mode change
      case html_js_1.TAG_ID.BASE:
      case html_js_1.TAG_ID.BASEFONT:
      case html_js_1.TAG_ID.BGSOUND:
      case html_js_1.TAG_ID.LINK:
      case html_js_1.TAG_ID.META:
      case html_js_1.TAG_ID.NOFRAMES:
      case html_js_1.TAG_ID.SCRIPT:
      case html_js_1.TAG_ID.STYLE:
      case html_js_1.TAG_ID.TEMPLATE:
      case html_js_1.TAG_ID.TITLE: {
        startTagInHead(p, token2);
        break;
      }
      // Re-process the token in the appropriate mode
      case html_js_1.TAG_ID.CAPTION:
      case html_js_1.TAG_ID.COLGROUP:
      case html_js_1.TAG_ID.TBODY:
      case html_js_1.TAG_ID.TFOOT:
      case html_js_1.TAG_ID.THEAD: {
        p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
        p.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p, token2);
        break;
      }
      case html_js_1.TAG_ID.COL: {
        p.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
        p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
        startTagInColumnGroup(p, token2);
        break;
      }
      case html_js_1.TAG_ID.TR: {
        p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
        startTagInTableBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.TD:
      case html_js_1.TAG_ID.TH: {
        p.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
        p.insertionMode = InsertionMode.IN_ROW;
        startTagInRow(p, token2);
        break;
      }
      default: {
        p.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
        p.insertionMode = InsertionMode.IN_BODY;
        startTagInBody(p, token2);
      }
    }
  }
  function endTagInTemplate(p, token2) {
    if (token2.tagID === html_js_1.TAG_ID.TEMPLATE) {
      templateEndTagInHead(p, token2);
    }
  }
  function eofInTemplate(p, token2) {
    if (p.openElements.tmplCount > 0) {
      p.openElements.popUntilTagNamePopped(html_js_1.TAG_ID.TEMPLATE);
      p.activeFormattingElements.clearToLastMarker();
      p.tmplInsertionModeStack.shift();
      p._resetInsertionMode();
      p.onEof(token2);
    } else {
      stopParsing(p, token2);
    }
  }
  function startTagAfterBody(p, token2) {
    if (token2.tagID === html_js_1.TAG_ID.HTML) {
      startTagInBody(p, token2);
    } else {
      tokenAfterBody(p, token2);
    }
  }
  function endTagAfterBody(p, token2) {
    var _a;
    if (token2.tagID === html_js_1.TAG_ID.HTML) {
      if (!p.fragmentContext) {
        p.insertionMode = InsertionMode.AFTER_AFTER_BODY;
      }
      if (p.options.sourceCodeLocationInfo && p.openElements.tagIDs[0] === html_js_1.TAG_ID.HTML) {
        p._setEndLocation(p.openElements.items[0], token2);
        const bodyElement = p.openElements.items[1];
        if (bodyElement && !((_a = p.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a === void 0 ? void 0 : _a.endTag)) {
          p._setEndLocation(bodyElement, token2);
        }
      }
    } else {
      tokenAfterBody(p, token2);
    }
  }
  function tokenAfterBody(p, token2) {
    p.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p, token2);
  }
  function startTagInFrameset(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.HTML: {
        startTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.FRAMESET: {
        p._insertElement(token2, html_js_1.NS.HTML);
        break;
      }
      case html_js_1.TAG_ID.FRAME: {
        p._appendElement(token2, html_js_1.NS.HTML);
        token2.ackSelfClosing = true;
        break;
      }
      case html_js_1.TAG_ID.NOFRAMES: {
        startTagInHead(p, token2);
        break;
      }
    }
  }
  function endTagInFrameset(p, token2) {
    if (token2.tagID === html_js_1.TAG_ID.FRAMESET && !p.openElements.isRootHtmlElementCurrent()) {
      p.openElements.pop();
      if (!p.fragmentContext && p.openElements.currentTagId !== html_js_1.TAG_ID.FRAMESET) {
        p.insertionMode = InsertionMode.AFTER_FRAMESET;
      }
    }
  }
  function startTagAfterFrameset(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.HTML: {
        startTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.NOFRAMES: {
        startTagInHead(p, token2);
        break;
      }
    }
  }
  function endTagAfterFrameset(p, token2) {
    if (token2.tagID === html_js_1.TAG_ID.HTML) {
      p.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
    }
  }
  function startTagAfterAfterBody(p, token2) {
    if (token2.tagID === html_js_1.TAG_ID.HTML) {
      startTagInBody(p, token2);
    } else {
      tokenAfterAfterBody(p, token2);
    }
  }
  function tokenAfterAfterBody(p, token2) {
    p.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p, token2);
  }
  function startTagAfterAfterFrameset(p, token2) {
    switch (token2.tagID) {
      case html_js_1.TAG_ID.HTML: {
        startTagInBody(p, token2);
        break;
      }
      case html_js_1.TAG_ID.NOFRAMES: {
        startTagInHead(p, token2);
        break;
      }
    }
  }
  function nullCharacterInForeignContent(p, token2) {
    token2.chars = unicode2.REPLACEMENT_CHARACTER;
    p._insertCharacters(token2);
  }
  function characterInForeignContent(p, token2) {
    p._insertCharacters(token2);
    p.framesetOk = false;
  }
  function popUntilHtmlOrIntegrationPoint(p) {
    while (p.treeAdapter.getNamespaceURI(p.openElements.current) !== html_js_1.NS.HTML && p.openElements.currentTagId !== void 0 && !p._isIntegrationPoint(p.openElements.currentTagId, p.openElements.current)) {
      p.openElements.pop();
    }
  }
  function startTagInForeignContent(p, token2) {
    if (foreignContent2.causesExit(token2)) {
      popUntilHtmlOrIntegrationPoint(p);
      p._startTagOutsideForeignContent(token2);
    } else {
      const current = p._getAdjustedCurrentElement();
      const currentNs = p.treeAdapter.getNamespaceURI(current);
      if (currentNs === html_js_1.NS.MATHML) {
        foreignContent2.adjustTokenMathMLAttrs(token2);
      } else if (currentNs === html_js_1.NS.SVG) {
        foreignContent2.adjustTokenSVGTagName(token2);
        foreignContent2.adjustTokenSVGAttrs(token2);
      }
      foreignContent2.adjustTokenXMLAttrs(token2);
      if (token2.selfClosing) {
        p._appendElement(token2, currentNs);
      } else {
        p._insertElement(token2, currentNs);
      }
      token2.ackSelfClosing = true;
    }
  }
  function endTagInForeignContent(p, token2) {
    if (token2.tagID === html_js_1.TAG_ID.P || token2.tagID === html_js_1.TAG_ID.BR) {
      popUntilHtmlOrIntegrationPoint(p);
      p._endTagOutsideForeignContent(token2);
      return;
    }
    for (let i = p.openElements.stackTop; i > 0; i--) {
      const element = p.openElements.items[i];
      if (p.treeAdapter.getNamespaceURI(element) === html_js_1.NS.HTML) {
        p._endTagOutsideForeignContent(token2);
        break;
      }
      const tagName = p.treeAdapter.getTagName(element);
      if (tagName.toLowerCase() === token2.tagName) {
        token2.tagName = tagName;
        p.openElements.shortenToLength(i);
        break;
      }
    }
  }
  return parser;
}
var serializer = {};
var hasRequiredSerializer;
function requireSerializer() {
  if (hasRequiredSerializer) return serializer;
  hasRequiredSerializer = 1;
  Object.defineProperty(serializer, "__esModule", { value: true });
  serializer.serialize = serialize;
  serializer.serializeOuter = serializeOuter;
  const html_js_1 = requireHtml();
  const escape_1 = /* @__PURE__ */ require_escape();
  const default_js_1 = require_default();
  const VOID_ELEMENTS = /* @__PURE__ */ new Set([
    html_js_1.TAG_NAMES.AREA,
    html_js_1.TAG_NAMES.BASE,
    html_js_1.TAG_NAMES.BASEFONT,
    html_js_1.TAG_NAMES.BGSOUND,
    html_js_1.TAG_NAMES.BR,
    html_js_1.TAG_NAMES.COL,
    html_js_1.TAG_NAMES.EMBED,
    html_js_1.TAG_NAMES.FRAME,
    html_js_1.TAG_NAMES.HR,
    html_js_1.TAG_NAMES.IMG,
    html_js_1.TAG_NAMES.INPUT,
    html_js_1.TAG_NAMES.KEYGEN,
    html_js_1.TAG_NAMES.LINK,
    html_js_1.TAG_NAMES.META,
    html_js_1.TAG_NAMES.PARAM,
    html_js_1.TAG_NAMES.SOURCE,
    html_js_1.TAG_NAMES.TRACK,
    html_js_1.TAG_NAMES.WBR
  ]);
  function isVoidElement(node, options) {
    return options.treeAdapter.isElementNode(node) && options.treeAdapter.getNamespaceURI(node) === html_js_1.NS.HTML && VOID_ELEMENTS.has(options.treeAdapter.getTagName(node));
  }
  const defaultOpts = { treeAdapter: default_js_1.defaultTreeAdapter, scriptingEnabled: true };
  function serialize(node, options) {
    const opts = Object.assign(Object.assign({}, defaultOpts), options);
    if (isVoidElement(node, opts)) {
      return "";
    }
    return serializeChildNodes(node, opts);
  }
  function serializeOuter(node, options) {
    const opts = Object.assign(Object.assign({}, defaultOpts), options);
    return serializeNode(node, opts);
  }
  function serializeChildNodes(parentNode, options) {
    let html2 = "";
    const container = options.treeAdapter.isElementNode(parentNode) && options.treeAdapter.getTagName(parentNode) === html_js_1.TAG_NAMES.TEMPLATE && options.treeAdapter.getNamespaceURI(parentNode) === html_js_1.NS.HTML ? options.treeAdapter.getTemplateContent(parentNode) : parentNode;
    const childNodes = options.treeAdapter.getChildNodes(container);
    if (childNodes) {
      for (const currentNode of childNodes) {
        html2 += serializeNode(currentNode, options);
      }
    }
    return html2;
  }
  function serializeNode(node, options) {
    if (options.treeAdapter.isElementNode(node)) {
      return serializeElement(node, options);
    }
    if (options.treeAdapter.isTextNode(node)) {
      return serializeTextNode(node, options);
    }
    if (options.treeAdapter.isCommentNode(node)) {
      return serializeCommentNode(node, options);
    }
    if (options.treeAdapter.isDocumentTypeNode(node)) {
      return serializeDocumentTypeNode(node, options);
    }
    return "";
  }
  function serializeElement(node, options) {
    const tn = options.treeAdapter.getTagName(node);
    return `<${tn}${serializeAttributes(node, options)}>${isVoidElement(node, options) ? "" : `${serializeChildNodes(node, options)}</${tn}>`}`;
  }
  function serializeAttributes(node, { treeAdapter }) {
    let html2 = "";
    for (const attr of treeAdapter.getAttrList(node)) {
      html2 += " ";
      if (attr.namespace) {
        switch (attr.namespace) {
          case html_js_1.NS.XML: {
            html2 += `xml:${attr.name}`;
            break;
          }
          case html_js_1.NS.XMLNS: {
            if (attr.name !== "xmlns") {
              html2 += "xmlns:";
            }
            html2 += attr.name;
            break;
          }
          case html_js_1.NS.XLINK: {
            html2 += `xlink:${attr.name}`;
            break;
          }
          default: {
            html2 += `${attr.prefix}:${attr.name}`;
          }
        }
      } else {
        html2 += attr.name;
      }
      html2 += `="${(0, escape_1.escapeAttribute)(attr.value)}"`;
    }
    return html2;
  }
  function serializeTextNode(node, options) {
    const { treeAdapter } = options;
    const content = treeAdapter.getTextNodeContent(node);
    const parent = treeAdapter.getParentNode(node);
    const parentTn = parent && treeAdapter.isElementNode(parent) && treeAdapter.getTagName(parent);
    return parentTn && treeAdapter.getNamespaceURI(parent) === html_js_1.NS.HTML && (0, html_js_1.hasUnescapedText)(parentTn, options.scriptingEnabled) ? content : (0, escape_1.escapeText)(content);
  }
  function serializeCommentNode(node, { treeAdapter }) {
    return `<!--${treeAdapter.getCommentNodeContent(node)}-->`;
  }
  function serializeDocumentTypeNode(node, { treeAdapter }) {
    return `<!DOCTYPE ${treeAdapter.getDocumentTypeNodeName(node)}>`;
  }
  return serializer;
}
var hasRequiredCjs;
function requireCjs() {
  if (hasRequiredCjs) return cjs;
  hasRequiredCjs = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.TokenizerMode = exports$1.Tokenizer = exports$1.Token = exports$1.html = exports$1.foreignContent = exports$1.ErrorCodes = exports$1.serializeOuter = exports$1.serialize = exports$1.Parser = exports$1.defaultTreeAdapter = void 0;
    exports$1.parse = parse;
    exports$1.parseFragment = parseFragment;
    const index_js_1 = requireParser();
    var default_js_1 = require_default();
    Object.defineProperty(exports$1, "defaultTreeAdapter", { enumerable: true, get: function() {
      return default_js_1.defaultTreeAdapter;
    } });
    var index_js_2 = requireParser();
    Object.defineProperty(exports$1, "Parser", { enumerable: true, get: function() {
      return index_js_2.Parser;
    } });
    var index_js_3 = requireSerializer();
    Object.defineProperty(exports$1, "serialize", { enumerable: true, get: function() {
      return index_js_3.serialize;
    } });
    Object.defineProperty(exports$1, "serializeOuter", { enumerable: true, get: function() {
      return index_js_3.serializeOuter;
    } });
    var error_codes_js_1 = requireErrorCodes();
    Object.defineProperty(exports$1, "ErrorCodes", { enumerable: true, get: function() {
      return error_codes_js_1.ERR;
    } });
    exports$1.foreignContent = requireForeignContent();
    exports$1.html = requireHtml();
    exports$1.Token = requireToken();
    var index_js_4 = requireTokenizer();
    Object.defineProperty(exports$1, "Tokenizer", { enumerable: true, get: function() {
      return index_js_4.Tokenizer;
    } });
    Object.defineProperty(exports$1, "TokenizerMode", { enumerable: true, get: function() {
      return index_js_4.TokenizerMode;
    } });
    function parse(html2, options) {
      return index_js_1.Parser.parse(html2, options);
    }
    function parseFragment(fragmentContext, html2, options) {
      if (typeof fragmentContext === "string") {
        options = html2;
        html2 = fragmentContext;
        fragmentContext = null;
      }
      const parser2 = index_js_1.Parser.getFragmentParser(fragmentContext, options);
      parser2.tokenizer.write(html2, true);
      return parser2.getFragment();
    }
  })(cjs);
  return cjs;
}
export {
  requireCjs as r
};
