var lib = {};
var CSSStyleDeclaration = {};
var parse = {};
var CSSStyleSheet = {};
var StyleSheet = {};
var hasRequiredStyleSheet;
function requireStyleSheet() {
  if (hasRequiredStyleSheet) return StyleSheet;
  hasRequiredStyleSheet = 1;
  var CSSOM = {};
  CSSOM.StyleSheet = function StyleSheet2() {
    this.parentStyleSheet = null;
  };
  StyleSheet.StyleSheet = CSSOM.StyleSheet;
  return StyleSheet;
}
var CSSStyleRule = {};
var CSSRule = {};
var hasRequiredCSSRule;
function requireCSSRule() {
  if (hasRequiredCSSRule) return CSSRule;
  hasRequiredCSSRule = 1;
  var CSSOM = {};
  CSSOM.CSSRule = function CSSRule2() {
    this.parentRule = null;
    this.parentStyleSheet = null;
  };
  CSSOM.CSSRule.UNKNOWN_RULE = 0;
  CSSOM.CSSRule.STYLE_RULE = 1;
  CSSOM.CSSRule.CHARSET_RULE = 2;
  CSSOM.CSSRule.IMPORT_RULE = 3;
  CSSOM.CSSRule.MEDIA_RULE = 4;
  CSSOM.CSSRule.FONT_FACE_RULE = 5;
  CSSOM.CSSRule.PAGE_RULE = 6;
  CSSOM.CSSRule.KEYFRAMES_RULE = 7;
  CSSOM.CSSRule.KEYFRAME_RULE = 8;
  CSSOM.CSSRule.MARGIN_RULE = 9;
  CSSOM.CSSRule.NAMESPACE_RULE = 10;
  CSSOM.CSSRule.COUNTER_STYLE_RULE = 11;
  CSSOM.CSSRule.SUPPORTS_RULE = 12;
  CSSOM.CSSRule.DOCUMENT_RULE = 13;
  CSSOM.CSSRule.FONT_FEATURE_VALUES_RULE = 14;
  CSSOM.CSSRule.VIEWPORT_RULE = 15;
  CSSOM.CSSRule.REGION_STYLE_RULE = 16;
  CSSOM.CSSRule.CONTAINER_RULE = 17;
  CSSOM.CSSRule.LAYER_BLOCK_RULE = 18;
  CSSOM.CSSRule.STARTING_STYLE_RULE = 1002;
  CSSOM.CSSRule.prototype = {
    constructor: CSSOM.CSSRule
    //FIXME
  };
  CSSRule.CSSRule = CSSOM.CSSRule;
  return CSSRule;
}
var hasRequiredCSSStyleRule;
function requireCSSStyleRule() {
  if (hasRequiredCSSStyleRule) return CSSStyleRule;
  hasRequiredCSSStyleRule = 1;
  var CSSOM = {
    CSSStyleDeclaration: requireCSSStyleDeclaration().CSSStyleDeclaration,
    CSSRule: requireCSSRule().CSSRule
  };
  CSSOM.CSSStyleRule = function CSSStyleRule2() {
    CSSOM.CSSRule.call(this);
    this.selectorText = "";
    this.style = new CSSOM.CSSStyleDeclaration();
    this.style.parentRule = this;
  };
  CSSOM.CSSStyleRule.prototype = new CSSOM.CSSRule();
  CSSOM.CSSStyleRule.prototype.constructor = CSSOM.CSSStyleRule;
  CSSOM.CSSStyleRule.prototype.type = 1;
  Object.defineProperty(CSSOM.CSSStyleRule.prototype, "cssText", {
    get: function() {
      var text;
      if (this.selectorText) {
        text = this.selectorText + " {" + this.style.cssText + "}";
      } else {
        text = "";
      }
      return text;
    },
    set: function(cssText) {
      var rule = CSSOM.CSSStyleRule.parse(cssText);
      this.style = rule.style;
      this.selectorText = rule.selectorText;
    }
  });
  CSSOM.CSSStyleRule.parse = function(ruleText) {
    var i = 0;
    var state = "selector";
    var index;
    var j = i;
    var buffer = "";
    var SIGNIFICANT_WHITESPACE = {
      "selector": true,
      "value": true
    };
    var styleRule = new CSSOM.CSSStyleRule();
    var name, priority = "";
    for (var character; character = ruleText.charAt(i); i++) {
      switch (character) {
        case " ":
        case "	":
        case "\r":
        case "\n":
        case "\f":
          if (SIGNIFICANT_WHITESPACE[state]) {
            switch (ruleText.charAt(i - 1)) {
              case " ":
              case "	":
              case "\r":
              case "\n":
              case "\f":
                break;
              default:
                buffer += " ";
                break;
            }
          }
          break;
        // String
        case '"':
          j = i + 1;
          index = ruleText.indexOf('"', j) + 1;
          if (!index) {
            throw '" is missing';
          }
          buffer += ruleText.slice(i, index);
          i = index - 1;
          break;
        case "'":
          j = i + 1;
          index = ruleText.indexOf("'", j) + 1;
          if (!index) {
            throw "' is missing";
          }
          buffer += ruleText.slice(i, index);
          i = index - 1;
          break;
        // Comment
        case "/":
          if (ruleText.charAt(i + 1) === "*") {
            i += 2;
            index = ruleText.indexOf("*/", i);
            if (index === -1) {
              throw new SyntaxError("Missing */");
            } else {
              i = index + 1;
            }
          } else {
            buffer += character;
          }
          break;
        case "{":
          if (state === "selector") {
            styleRule.selectorText = buffer.trim();
            buffer = "";
            state = "name";
          }
          break;
        case ":":
          if (state === "name") {
            name = buffer.trim();
            buffer = "";
            state = "value";
          } else {
            buffer += character;
          }
          break;
        case "!":
          if (state === "value" && ruleText.indexOf("!important", i) === i) {
            priority = "important";
            i += "important".length;
          } else {
            buffer += character;
          }
          break;
        case ";":
          if (state === "value") {
            styleRule.style.setProperty(name, buffer.trim(), priority);
            priority = "";
            buffer = "";
            state = "name";
          } else {
            buffer += character;
          }
          break;
        case "}":
          if (state === "value") {
            styleRule.style.setProperty(name, buffer.trim(), priority);
            priority = "";
            buffer = "";
          } else if (state === "name") {
            break;
          } else {
            buffer += character;
          }
          state = "selector";
          break;
        default:
          buffer += character;
          break;
      }
    }
    return styleRule;
  };
  CSSStyleRule.CSSStyleRule = CSSOM.CSSStyleRule;
  return CSSStyleRule;
}
var hasRequiredCSSStyleSheet;
function requireCSSStyleSheet() {
  if (hasRequiredCSSStyleSheet) return CSSStyleSheet;
  hasRequiredCSSStyleSheet = 1;
  var CSSOM = {
    StyleSheet: requireStyleSheet().StyleSheet,
    CSSStyleRule: requireCSSStyleRule().CSSStyleRule
  };
  CSSOM.CSSStyleSheet = function CSSStyleSheet2() {
    CSSOM.StyleSheet.call(this);
    this.cssRules = [];
  };
  CSSOM.CSSStyleSheet.prototype = new CSSOM.StyleSheet();
  CSSOM.CSSStyleSheet.prototype.constructor = CSSOM.CSSStyleSheet;
  CSSOM.CSSStyleSheet.prototype.insertRule = function(rule, index) {
    if (index < 0 || index > this.cssRules.length) {
      throw new RangeError("INDEX_SIZE_ERR");
    }
    var cssRule = CSSOM.parse(rule).cssRules[0];
    cssRule.parentStyleSheet = this;
    this.cssRules.splice(index, 0, cssRule);
    return index;
  };
  CSSOM.CSSStyleSheet.prototype.deleteRule = function(index) {
    if (index < 0 || index >= this.cssRules.length) {
      throw new RangeError("INDEX_SIZE_ERR");
    }
    this.cssRules.splice(index, 1);
  };
  CSSOM.CSSStyleSheet.prototype.toString = function() {
    var result = "";
    var rules = this.cssRules;
    for (var i = 0; i < rules.length; i++) {
      result += rules[i].cssText + "\n";
    }
    return result;
  };
  CSSStyleSheet.CSSStyleSheet = CSSOM.CSSStyleSheet;
  CSSOM.parse = requireParse().parse;
  return CSSStyleSheet;
}
var CSSImportRule = {};
var MediaList = {};
var hasRequiredMediaList;
function requireMediaList() {
  if (hasRequiredMediaList) return MediaList;
  hasRequiredMediaList = 1;
  var CSSOM = {};
  CSSOM.MediaList = function MediaList2() {
    this.length = 0;
  };
  CSSOM.MediaList.prototype = {
    constructor: CSSOM.MediaList,
    /**
     * @return {string}
     */
    get mediaText() {
      return Array.prototype.join.call(this, ", ");
    },
    /**
     * @param {string} value
     */
    set mediaText(value) {
      var values = value.split(",");
      var length = this.length = values.length;
      for (var i = 0; i < length; i++) {
        this[i] = values[i].trim();
      }
    },
    /**
     * @param {string} medium
     */
    appendMedium: function(medium) {
      if (Array.prototype.indexOf.call(this, medium) === -1) {
        this[this.length] = medium;
        this.length++;
      }
    },
    /**
     * @param {string} medium
     */
    deleteMedium: function(medium) {
      var index = Array.prototype.indexOf.call(this, medium);
      if (index !== -1) {
        Array.prototype.splice.call(this, index, 1);
      }
    }
  };
  MediaList.MediaList = CSSOM.MediaList;
  return MediaList;
}
var hasRequiredCSSImportRule;
function requireCSSImportRule() {
  if (hasRequiredCSSImportRule) return CSSImportRule;
  hasRequiredCSSImportRule = 1;
  var CSSOM = {
    CSSRule: requireCSSRule().CSSRule,
    CSSStyleSheet: requireCSSStyleSheet().CSSStyleSheet,
    MediaList: requireMediaList().MediaList
  };
  CSSOM.CSSImportRule = function CSSImportRule2() {
    CSSOM.CSSRule.call(this);
    this.href = "";
    this.media = new CSSOM.MediaList();
    this.styleSheet = new CSSOM.CSSStyleSheet();
  };
  CSSOM.CSSImportRule.prototype = new CSSOM.CSSRule();
  CSSOM.CSSImportRule.prototype.constructor = CSSOM.CSSImportRule;
  CSSOM.CSSImportRule.prototype.type = 3;
  Object.defineProperty(CSSOM.CSSImportRule.prototype, "cssText", {
    get: function() {
      var mediaText = this.media.mediaText;
      return "@import url(" + this.href + ")" + (mediaText ? " " + mediaText : "") + ";";
    },
    set: function(cssText) {
      var i = 0;
      var state = "";
      var buffer = "";
      var index;
      for (var character; character = cssText.charAt(i); i++) {
        switch (character) {
          case " ":
          case "	":
          case "\r":
          case "\n":
          case "\f":
            if (state === "after-import") {
              state = "url";
            } else {
              buffer += character;
            }
            break;
          case "@":
            if (!state && cssText.indexOf("@import", i) === i) {
              state = "after-import";
              i += "import".length;
              buffer = "";
            }
            break;
          case "u":
            if (state === "url" && cssText.indexOf("url(", i) === i) {
              index = cssText.indexOf(")", i + 1);
              if (index === -1) {
                throw i + ': ")" not found';
              }
              i += "url(".length;
              var url = cssText.slice(i, index);
              if (url[0] === url[url.length - 1]) {
                if (url[0] === '"' || url[0] === "'") {
                  url = url.slice(1, -1);
                }
              }
              this.href = url;
              i = index;
              state = "media";
            }
            break;
          case '"':
            if (state === "url") {
              index = cssText.indexOf('"', i + 1);
              if (!index) {
                throw i + `: '"' not found`;
              }
              this.href = cssText.slice(i + 1, index);
              i = index;
              state = "media";
            }
            break;
          case "'":
            if (state === "url") {
              index = cssText.indexOf("'", i + 1);
              if (!index) {
                throw i + `: "'" not found`;
              }
              this.href = cssText.slice(i + 1, index);
              i = index;
              state = "media";
            }
            break;
          case ";":
            if (state === "media") {
              if (buffer) {
                this.media.mediaText = buffer.trim();
              }
            }
            break;
          default:
            if (state === "media") {
              buffer += character;
            }
            break;
        }
      }
    }
  });
  CSSImportRule.CSSImportRule = CSSOM.CSSImportRule;
  return CSSImportRule;
}
var CSSGroupingRule = {};
var hasRequiredCSSGroupingRule;
function requireCSSGroupingRule() {
  if (hasRequiredCSSGroupingRule) return CSSGroupingRule;
  hasRequiredCSSGroupingRule = 1;
  var CSSOM = {
    CSSRule: requireCSSRule().CSSRule,
    parse: requireParse().parse
  };
  CSSOM.CSSGroupingRule = function CSSGroupingRule2() {
    CSSOM.CSSRule.call(this);
    this.cssRules = [];
  };
  CSSOM.CSSGroupingRule.prototype = new CSSOM.CSSRule();
  CSSOM.CSSGroupingRule.prototype.constructor = CSSOM.CSSGroupingRule;
  CSSOM.CSSGroupingRule.prototype.insertRule = function insertRule(rule, index) {
    if (index < 0 || index > this.cssRules.length) {
      throw new RangeError("INDEX_SIZE_ERR");
    }
    var cssRule = CSSOM.parse(rule).cssRules[0];
    cssRule.parentRule = this;
    this.cssRules.splice(index, 0, cssRule);
    return index;
  };
  CSSOM.CSSGroupingRule.prototype.deleteRule = function deleteRule(index) {
    if (index < 0 || index >= this.cssRules.length) {
      throw new RangeError("INDEX_SIZE_ERR");
    }
    this.cssRules.splice(index, 1)[0].parentRule = null;
  };
  CSSGroupingRule.CSSGroupingRule = CSSOM.CSSGroupingRule;
  return CSSGroupingRule;
}
var CSSMediaRule = {};
var CSSConditionRule = {};
var hasRequiredCSSConditionRule;
function requireCSSConditionRule() {
  if (hasRequiredCSSConditionRule) return CSSConditionRule;
  hasRequiredCSSConditionRule = 1;
  var CSSOM = {
    CSSRule: requireCSSRule().CSSRule,
    CSSGroupingRule: requireCSSGroupingRule().CSSGroupingRule
  };
  CSSOM.CSSConditionRule = function CSSConditionRule2() {
    CSSOM.CSSGroupingRule.call(this);
    this.cssRules = [];
  };
  CSSOM.CSSConditionRule.prototype = new CSSOM.CSSGroupingRule();
  CSSOM.CSSConditionRule.prototype.constructor = CSSOM.CSSConditionRule;
  CSSOM.CSSConditionRule.prototype.conditionText = "";
  CSSOM.CSSConditionRule.prototype.cssText = "";
  CSSConditionRule.CSSConditionRule = CSSOM.CSSConditionRule;
  return CSSConditionRule;
}
var hasRequiredCSSMediaRule;
function requireCSSMediaRule() {
  if (hasRequiredCSSMediaRule) return CSSMediaRule;
  hasRequiredCSSMediaRule = 1;
  var CSSOM = {
    CSSRule: requireCSSRule().CSSRule,
    CSSGroupingRule: requireCSSGroupingRule().CSSGroupingRule,
    CSSConditionRule: requireCSSConditionRule().CSSConditionRule,
    MediaList: requireMediaList().MediaList
  };
  CSSOM.CSSMediaRule = function CSSMediaRule2() {
    CSSOM.CSSConditionRule.call(this);
    this.media = new CSSOM.MediaList();
  };
  CSSOM.CSSMediaRule.prototype = new CSSOM.CSSConditionRule();
  CSSOM.CSSMediaRule.prototype.constructor = CSSOM.CSSMediaRule;
  CSSOM.CSSMediaRule.prototype.type = 4;
  Object.defineProperties(CSSOM.CSSMediaRule.prototype, {
    "conditionText": {
      get: function() {
        return this.media.mediaText;
      },
      set: function(value) {
        this.media.mediaText = value;
      },
      configurable: true,
      enumerable: true
    },
    "cssText": {
      get: function() {
        var cssTexts = [];
        for (var i = 0, length = this.cssRules.length; i < length; i++) {
          cssTexts.push(this.cssRules[i].cssText);
        }
        return "@media " + this.media.mediaText + " {" + cssTexts.join("") + "}";
      },
      configurable: true,
      enumerable: true
    }
  });
  CSSMediaRule.CSSMediaRule = CSSOM.CSSMediaRule;
  return CSSMediaRule;
}
var CSSContainerRule = {};
var hasRequiredCSSContainerRule;
function requireCSSContainerRule() {
  if (hasRequiredCSSContainerRule) return CSSContainerRule;
  hasRequiredCSSContainerRule = 1;
  var CSSOM = {
    CSSRule: requireCSSRule().CSSRule,
    CSSGroupingRule: requireCSSGroupingRule().CSSGroupingRule,
    CSSConditionRule: requireCSSConditionRule().CSSConditionRule
  };
  CSSOM.CSSContainerRule = function CSSContainerRule2() {
    CSSOM.CSSConditionRule.call(this);
  };
  CSSOM.CSSContainerRule.prototype = new CSSOM.CSSConditionRule();
  CSSOM.CSSContainerRule.prototype.constructor = CSSOM.CSSContainerRule;
  CSSOM.CSSContainerRule.prototype.type = 17;
  Object.defineProperties(CSSOM.CSSContainerRule.prototype, {
    "conditionText": {
      get: function() {
        return this.containerText;
      },
      set: function(value) {
        this.containerText = value;
      },
      configurable: true,
      enumerable: true
    },
    "cssText": {
      get: function() {
        var cssTexts = [];
        for (var i = 0, length = this.cssRules.length; i < length; i++) {
          cssTexts.push(this.cssRules[i].cssText);
        }
        return "@container " + this.containerText + " {" + cssTexts.join("") + "}";
      },
      configurable: true,
      enumerable: true
    }
  });
  CSSContainerRule.CSSContainerRule = CSSOM.CSSContainerRule;
  return CSSContainerRule;
}
var CSSSupportsRule = {};
var hasRequiredCSSSupportsRule;
function requireCSSSupportsRule() {
  if (hasRequiredCSSSupportsRule) return CSSSupportsRule;
  hasRequiredCSSSupportsRule = 1;
  var CSSOM = {
    CSSRule: requireCSSRule().CSSRule,
    CSSGroupingRule: requireCSSGroupingRule().CSSGroupingRule,
    CSSConditionRule: requireCSSConditionRule().CSSConditionRule
  };
  CSSOM.CSSSupportsRule = function CSSSupportsRule2() {
    CSSOM.CSSConditionRule.call(this);
  };
  CSSOM.CSSSupportsRule.prototype = new CSSOM.CSSConditionRule();
  CSSOM.CSSSupportsRule.prototype.constructor = CSSOM.CSSSupportsRule;
  CSSOM.CSSSupportsRule.prototype.type = 12;
  Object.defineProperty(CSSOM.CSSSupportsRule.prototype, "cssText", {
    get: function() {
      var cssTexts = [];
      for (var i = 0, length = this.cssRules.length; i < length; i++) {
        cssTexts.push(this.cssRules[i].cssText);
      }
      return "@supports " + this.conditionText + " {" + cssTexts.join("") + "}";
    }
  });
  CSSSupportsRule.CSSSupportsRule = CSSOM.CSSSupportsRule;
  return CSSSupportsRule;
}
var CSSFontFaceRule = {};
var hasRequiredCSSFontFaceRule;
function requireCSSFontFaceRule() {
  if (hasRequiredCSSFontFaceRule) return CSSFontFaceRule;
  hasRequiredCSSFontFaceRule = 1;
  var CSSOM = {
    CSSStyleDeclaration: requireCSSStyleDeclaration().CSSStyleDeclaration,
    CSSRule: requireCSSRule().CSSRule
  };
  CSSOM.CSSFontFaceRule = function CSSFontFaceRule2() {
    CSSOM.CSSRule.call(this);
    this.style = new CSSOM.CSSStyleDeclaration();
    this.style.parentRule = this;
  };
  CSSOM.CSSFontFaceRule.prototype = new CSSOM.CSSRule();
  CSSOM.CSSFontFaceRule.prototype.constructor = CSSOM.CSSFontFaceRule;
  CSSOM.CSSFontFaceRule.prototype.type = 5;
  Object.defineProperty(CSSOM.CSSFontFaceRule.prototype, "cssText", {
    get: function() {
      return "@font-face {" + this.style.cssText + "}";
    }
  });
  CSSFontFaceRule.CSSFontFaceRule = CSSOM.CSSFontFaceRule;
  return CSSFontFaceRule;
}
var CSSHostRule = {};
var hasRequiredCSSHostRule;
function requireCSSHostRule() {
  if (hasRequiredCSSHostRule) return CSSHostRule;
  hasRequiredCSSHostRule = 1;
  var CSSOM = {
    CSSRule: requireCSSRule().CSSRule
  };
  CSSOM.CSSHostRule = function CSSHostRule2() {
    CSSOM.CSSRule.call(this);
    this.cssRules = [];
  };
  CSSOM.CSSHostRule.prototype = new CSSOM.CSSRule();
  CSSOM.CSSHostRule.prototype.constructor = CSSOM.CSSHostRule;
  CSSOM.CSSHostRule.prototype.type = 1001;
  Object.defineProperty(CSSOM.CSSHostRule.prototype, "cssText", {
    get: function() {
      var cssTexts = [];
      for (var i = 0, length = this.cssRules.length; i < length; i++) {
        cssTexts.push(this.cssRules[i].cssText);
      }
      return "@host {" + cssTexts.join("") + "}";
    }
  });
  CSSHostRule.CSSHostRule = CSSOM.CSSHostRule;
  return CSSHostRule;
}
var CSSStartingStyleRule = {};
var hasRequiredCSSStartingStyleRule;
function requireCSSStartingStyleRule() {
  if (hasRequiredCSSStartingStyleRule) return CSSStartingStyleRule;
  hasRequiredCSSStartingStyleRule = 1;
  var CSSOM = {
    CSSRule: requireCSSRule().CSSRule
  };
  CSSOM.CSSStartingStyleRule = function CSSStartingStyleRule2() {
    CSSOM.CSSRule.call(this);
    this.cssRules = [];
  };
  CSSOM.CSSStartingStyleRule.prototype = new CSSOM.CSSRule();
  CSSOM.CSSStartingStyleRule.prototype.constructor = CSSOM.CSSStartingStyleRule;
  CSSOM.CSSStartingStyleRule.prototype.type = 1002;
  Object.defineProperty(CSSOM.CSSStartingStyleRule.prototype, "cssText", {
    get: function() {
      var cssTexts = [];
      for (var i = 0, length = this.cssRules.length; i < length; i++) {
        cssTexts.push(this.cssRules[i].cssText);
      }
      return "@starting-style {" + cssTexts.join("") + "}";
    }
  });
  CSSStartingStyleRule.CSSStartingStyleRule = CSSOM.CSSStartingStyleRule;
  return CSSStartingStyleRule;
}
var CSSKeyframeRule = {};
var hasRequiredCSSKeyframeRule;
function requireCSSKeyframeRule() {
  if (hasRequiredCSSKeyframeRule) return CSSKeyframeRule;
  hasRequiredCSSKeyframeRule = 1;
  var CSSOM = {
    CSSRule: requireCSSRule().CSSRule,
    CSSStyleDeclaration: requireCSSStyleDeclaration().CSSStyleDeclaration
  };
  CSSOM.CSSKeyframeRule = function CSSKeyframeRule2() {
    CSSOM.CSSRule.call(this);
    this.keyText = "";
    this.style = new CSSOM.CSSStyleDeclaration();
    this.style.parentRule = this;
  };
  CSSOM.CSSKeyframeRule.prototype = new CSSOM.CSSRule();
  CSSOM.CSSKeyframeRule.prototype.constructor = CSSOM.CSSKeyframeRule;
  CSSOM.CSSKeyframeRule.prototype.type = 8;
  Object.defineProperty(CSSOM.CSSKeyframeRule.prototype, "cssText", {
    get: function() {
      return this.keyText + " {" + this.style.cssText + "} ";
    }
  });
  CSSKeyframeRule.CSSKeyframeRule = CSSOM.CSSKeyframeRule;
  return CSSKeyframeRule;
}
var CSSKeyframesRule = {};
var hasRequiredCSSKeyframesRule;
function requireCSSKeyframesRule() {
  if (hasRequiredCSSKeyframesRule) return CSSKeyframesRule;
  hasRequiredCSSKeyframesRule = 1;
  var CSSOM = {
    CSSRule: requireCSSRule().CSSRule
  };
  CSSOM.CSSKeyframesRule = function CSSKeyframesRule2() {
    CSSOM.CSSRule.call(this);
    this.name = "";
    this.cssRules = [];
  };
  CSSOM.CSSKeyframesRule.prototype = new CSSOM.CSSRule();
  CSSOM.CSSKeyframesRule.prototype.constructor = CSSOM.CSSKeyframesRule;
  CSSOM.CSSKeyframesRule.prototype.type = 7;
  Object.defineProperty(CSSOM.CSSKeyframesRule.prototype, "cssText", {
    get: function() {
      var cssTexts = [];
      for (var i = 0, length = this.cssRules.length; i < length; i++) {
        cssTexts.push("  " + this.cssRules[i].cssText);
      }
      return "@" + (this._vendorPrefix || "") + "keyframes " + this.name + " { \n" + cssTexts.join("\n") + "\n}";
    }
  });
  CSSKeyframesRule.CSSKeyframesRule = CSSOM.CSSKeyframesRule;
  return CSSKeyframesRule;
}
var CSSValueExpression = {};
var CSSValue = {};
var hasRequiredCSSValue;
function requireCSSValue() {
  if (hasRequiredCSSValue) return CSSValue;
  hasRequiredCSSValue = 1;
  var CSSOM = {};
  CSSOM.CSSValue = function CSSValue2() {
  };
  CSSOM.CSSValue.prototype = {
    constructor: CSSOM.CSSValue,
    // @see: http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
    set cssText(text) {
      var name = this._getConstructorName();
      throw new Error('DOMException: property "cssText" of "' + name + '" is readonly and can not be replaced with "' + text + '"!');
    },
    get cssText() {
      var name = this._getConstructorName();
      throw new Error('getter "cssText" of "' + name + '" is not implemented!');
    },
    _getConstructorName: function() {
      var s = this.constructor.toString(), c = s.match(/function\s([^\(]+)/), name = c[1];
      return name;
    }
  };
  CSSValue.CSSValue = CSSOM.CSSValue;
  return CSSValue;
}
var hasRequiredCSSValueExpression;
function requireCSSValueExpression() {
  if (hasRequiredCSSValueExpression) return CSSValueExpression;
  hasRequiredCSSValueExpression = 1;
  var CSSOM = {
    CSSValue: requireCSSValue().CSSValue
  };
  CSSOM.CSSValueExpression = function CSSValueExpression2(token, idx) {
    this._token = token;
    this._idx = idx;
  };
  CSSOM.CSSValueExpression.prototype = new CSSOM.CSSValue();
  CSSOM.CSSValueExpression.prototype.constructor = CSSOM.CSSValueExpression;
  CSSOM.CSSValueExpression.prototype.parse = function() {
    var token = this._token, idx = this._idx;
    var character = "", expression = "", error = "", info, paren = [];
    for (; ; ++idx) {
      character = token.charAt(idx);
      if (character === "") {
        error = "css expression error: unfinished expression!";
        break;
      }
      switch (character) {
        case "(":
          paren.push(character);
          expression += character;
          break;
        case ")":
          paren.pop(character);
          expression += character;
          break;
        case "/":
          if (info = this._parseJSComment(token, idx)) {
            if (info.error) {
              error = "css expression error: unfinished comment in expression!";
            } else {
              idx = info.idx;
            }
          } else if (info = this._parseJSRexExp(token, idx)) {
            idx = info.idx;
            expression += info.text;
          } else {
            expression += character;
          }
          break;
        case "'":
        case '"':
          info = this._parseJSString(token, idx, character);
          if (info) {
            idx = info.idx;
            expression += info.text;
          } else {
            expression += character;
          }
          break;
        default:
          expression += character;
          break;
      }
      if (error) {
        break;
      }
      if (paren.length === 0) {
        break;
      }
    }
    var ret;
    if (error) {
      ret = {
        error
      };
    } else {
      ret = {
        idx,
        expression
      };
    }
    return ret;
  };
  CSSOM.CSSValueExpression.prototype._parseJSComment = function(token, idx) {
    var nextChar = token.charAt(idx + 1), text;
    if (nextChar === "/" || nextChar === "*") {
      var startIdx = idx, endIdx, commentEndChar;
      if (nextChar === "/") {
        commentEndChar = "\n";
      } else if (nextChar === "*") {
        commentEndChar = "*/";
      }
      endIdx = token.indexOf(commentEndChar, startIdx + 1 + 1);
      if (endIdx !== -1) {
        endIdx = endIdx + commentEndChar.length - 1;
        text = token.substring(idx, endIdx + 1);
        return {
          idx: endIdx,
          text
        };
      } else {
        var error = "css expression error: unfinished comment in expression!";
        return {
          error
        };
      }
    } else {
      return false;
    }
  };
  CSSOM.CSSValueExpression.prototype._parseJSString = function(token, idx, sep) {
    var endIdx = this._findMatchedIdx(token, idx, sep), text;
    if (endIdx === -1) {
      return false;
    } else {
      text = token.substring(idx, endIdx + sep.length);
      return {
        idx: endIdx,
        text
      };
    }
  };
  CSSOM.CSSValueExpression.prototype._parseJSRexExp = function(token, idx) {
    var before = token.substring(0, idx).replace(/\s+$/, ""), legalRegx = [
      /^$/,
      /\($/,
      /\[$/,
      /\!$/,
      /\+$/,
      /\-$/,
      /\*$/,
      /\/\s+/,
      /\%$/,
      /\=$/,
      /\>$/,
      /<$/,
      /\&$/,
      /\|$/,
      /\^$/,
      /\~$/,
      /\?$/,
      /\,$/,
      /delete$/,
      /in$/,
      /instanceof$/,
      /new$/,
      /typeof$/,
      /void$/
    ];
    var isLegal = legalRegx.some(function(reg) {
      return reg.test(before);
    });
    if (!isLegal) {
      return false;
    } else {
      var sep = "/";
      return this._parseJSString(token, idx, sep);
    }
  };
  CSSOM.CSSValueExpression.prototype._findMatchedIdx = function(token, idx, sep) {
    var startIdx = idx, endIdx;
    var NOT_FOUND = -1;
    while (true) {
      endIdx = token.indexOf(sep, startIdx + 1);
      if (endIdx === -1) {
        endIdx = NOT_FOUND;
        break;
      } else {
        var text = token.substring(idx + 1, endIdx), matched = text.match(/\\+$/);
        if (!matched || matched[0] % 2 === 0) {
          break;
        } else {
          startIdx = endIdx;
        }
      }
    }
    var nextNewLineIdx = token.indexOf("\n", idx + 1);
    if (nextNewLineIdx < endIdx) {
      endIdx = NOT_FOUND;
    }
    return endIdx;
  };
  CSSValueExpression.CSSValueExpression = CSSOM.CSSValueExpression;
  return CSSValueExpression;
}
var CSSDocumentRule = {};
var MatcherList = {};
var hasRequiredMatcherList;
function requireMatcherList() {
  if (hasRequiredMatcherList) return MatcherList;
  hasRequiredMatcherList = 1;
  var CSSOM = {};
  CSSOM.MatcherList = function MatcherList2() {
    this.length = 0;
  };
  CSSOM.MatcherList.prototype = {
    constructor: CSSOM.MatcherList,
    /**
     * @return {string}
     */
    get matcherText() {
      return Array.prototype.join.call(this, ", ");
    },
    /**
     * @param {string} value
     */
    set matcherText(value) {
      var values = value.split(",");
      var length = this.length = values.length;
      for (var i = 0; i < length; i++) {
        this[i] = values[i].trim();
      }
    },
    /**
     * @param {string} matcher
     */
    appendMatcher: function(matcher) {
      if (Array.prototype.indexOf.call(this, matcher) === -1) {
        this[this.length] = matcher;
        this.length++;
      }
    },
    /**
     * @param {string} matcher
     */
    deleteMatcher: function(matcher) {
      var index = Array.prototype.indexOf.call(this, matcher);
      if (index !== -1) {
        Array.prototype.splice.call(this, index, 1);
      }
    }
  };
  MatcherList.MatcherList = CSSOM.MatcherList;
  return MatcherList;
}
var hasRequiredCSSDocumentRule;
function requireCSSDocumentRule() {
  if (hasRequiredCSSDocumentRule) return CSSDocumentRule;
  hasRequiredCSSDocumentRule = 1;
  var CSSOM = {
    CSSRule: requireCSSRule().CSSRule,
    MatcherList: requireMatcherList().MatcherList
  };
  CSSOM.CSSDocumentRule = function CSSDocumentRule2() {
    CSSOM.CSSRule.call(this);
    this.matcher = new CSSOM.MatcherList();
    this.cssRules = [];
  };
  CSSOM.CSSDocumentRule.prototype = new CSSOM.CSSRule();
  CSSOM.CSSDocumentRule.prototype.constructor = CSSOM.CSSDocumentRule;
  CSSOM.CSSDocumentRule.prototype.type = 10;
  Object.defineProperty(CSSOM.CSSDocumentRule.prototype, "cssText", {
    get: function() {
      var cssTexts = [];
      for (var i = 0, length = this.cssRules.length; i < length; i++) {
        cssTexts.push(this.cssRules[i].cssText);
      }
      return "@-moz-document " + this.matcher.matcherText + " {" + cssTexts.join("") + "}";
    }
  });
  CSSDocumentRule.CSSDocumentRule = CSSOM.CSSDocumentRule;
  return CSSDocumentRule;
}
var CSSLayerBlockRule = {};
var hasRequiredCSSLayerBlockRule;
function requireCSSLayerBlockRule() {
  if (hasRequiredCSSLayerBlockRule) return CSSLayerBlockRule;
  hasRequiredCSSLayerBlockRule = 1;
  var CSSOM = {
    CSSRule: requireCSSRule().CSSRule,
    CSSGroupingRule: requireCSSGroupingRule().CSSGroupingRule
  };
  CSSOM.CSSLayerBlockRule = function CSSLayerBlockRule2() {
    CSSOM.CSSGroupingRule.call(this);
    this.layerName = "";
    this.cssRules = [];
  };
  CSSOM.CSSLayerBlockRule.prototype = new CSSOM.CSSGroupingRule();
  CSSOM.CSSLayerBlockRule.prototype.constructor = CSSOM.CSSLayerBlockRule;
  CSSOM.CSSLayerBlockRule.prototype.type = 18;
  Object.defineProperties(CSSOM.CSSLayerBlockRule.prototype, {
    layerNameText: {
      get: function() {
        return this.layerName;
      },
      set: function(value) {
        this.layerName = value;
      },
      configurable: true,
      enumerable: true
    },
    cssText: {
      get: function() {
        var cssTexts = [];
        for (var i = 0, length = this.cssRules.length; i < length; i++) {
          cssTexts.push(this.cssRules[i].cssText);
        }
        return "@layer " + this.layerNameText + " {" + cssTexts.join("") + "}";
      },
      configurable: true,
      enumerable: true
    }
  });
  CSSLayerBlockRule.CSSLayerBlockRule = CSSOM.CSSLayerBlockRule;
  return CSSLayerBlockRule;
}
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse;
  hasRequiredParse = 1;
  var CSSOM = {};
  CSSOM.parse = function parse2(token) {
    var i = 0;
    var state = "before-selector";
    var index;
    var buffer = "";
    var valueParenthesisDepth = 0;
    var SIGNIFICANT_WHITESPACE = {
      "selector": true,
      "value": true,
      "value-parenthesis": true,
      "atRule": true,
      "importRule-begin": true,
      "importRule": true,
      "atBlock": true,
      "containerBlock": true,
      "conditionBlock": true,
      "documentRule-begin": true,
      "layerBlock": true
    };
    var styleSheet = new CSSOM.CSSStyleSheet();
    var currentScope = styleSheet;
    var parentRule;
    var ancestorRules = [];
    var hasAncestors = false;
    var prevScope;
    var name, priority = "", styleRule, mediaRule, containerRule, supportsRule, importRule, fontFaceRule, keyframesRule, documentRule, hostRule, startingStyleRule, layerBlockRule;
    var atKeyframesRegExp = /@(-(?:\w+-)+)?keyframes/g;
    var parseError = function(message) {
      var lines = token.substring(0, i).split("\n");
      var lineCount = lines.length;
      var charCount = lines.pop().length + 1;
      var error = new Error(message + " (line " + lineCount + ", char " + charCount + ")");
      error.line = lineCount;
      error["char"] = charCount;
      error.styleSheet = styleSheet;
      throw error;
    };
    for (var character; character = token.charAt(i); i++) {
      switch (character) {
        case " ":
        case "	":
        case "\r":
        case "\n":
        case "\f":
          if (SIGNIFICANT_WHITESPACE[state]) {
            buffer += character;
          }
          break;
        // String
        case '"':
          index = i + 1;
          do {
            index = token.indexOf('"', index) + 1;
            if (!index) {
              parseError('Unmatched "');
            }
          } while (token[index - 2] === "\\");
          buffer += token.slice(i, index);
          i = index - 1;
          switch (state) {
            case "before-value":
              state = "value";
              break;
            case "importRule-begin":
              state = "importRule";
              break;
          }
          break;
        case "'":
          index = i + 1;
          do {
            index = token.indexOf("'", index) + 1;
            if (!index) {
              parseError("Unmatched '");
            }
          } while (token[index - 2] === "\\");
          buffer += token.slice(i, index);
          i = index - 1;
          switch (state) {
            case "before-value":
              state = "value";
              break;
            case "importRule-begin":
              state = "importRule";
              break;
          }
          break;
        // Comment
        case "/":
          if (token.charAt(i + 1) === "*") {
            i += 2;
            index = token.indexOf("*/", i);
            if (index === -1) {
              parseError("Missing */");
            } else {
              i = index + 1;
            }
          } else {
            buffer += character;
          }
          if (state === "importRule-begin") {
            buffer += " ";
            state = "importRule";
          }
          break;
        // At-rule
        case "@":
          if (token.indexOf("@-moz-document", i) === i) {
            state = "documentRule-begin";
            documentRule = new CSSOM.CSSDocumentRule();
            documentRule.__starts = i;
            i += "-moz-document".length;
            buffer = "";
            break;
          } else if (token.indexOf("@media", i) === i) {
            state = "atBlock";
            mediaRule = new CSSOM.CSSMediaRule();
            mediaRule.__starts = i;
            i += "media".length;
            buffer = "";
            break;
          } else if (token.indexOf("@container", i) === i) {
            state = "containerBlock";
            containerRule = new CSSOM.CSSContainerRule();
            containerRule.__starts = i;
            i += "container".length;
            buffer = "";
            break;
          } else if (token.indexOf("@layer", i) === i) {
            state = "layerBlock";
            layerBlockRule = new CSSOM.CSSLayerBlockRule();
            layerBlockRule.__starts = i;
            i += "layer".length;
            buffer = "";
            break;
          } else if (token.indexOf("@supports", i) === i) {
            state = "conditionBlock";
            supportsRule = new CSSOM.CSSSupportsRule();
            supportsRule.__starts = i;
            i += "supports".length;
            buffer = "";
            break;
          } else if (token.indexOf("@host", i) === i) {
            state = "hostRule-begin";
            i += "host".length;
            hostRule = new CSSOM.CSSHostRule();
            hostRule.__starts = i;
            buffer = "";
            break;
          } else if (token.indexOf("@starting-style", i) === i) {
            state = "startingStyleRule-begin";
            i += "starting-style".length;
            startingStyleRule = new CSSOM.CSSStartingStyleRule();
            startingStyleRule.__starts = i;
            buffer = "";
            break;
          } else if (token.indexOf("@import", i) === i) {
            state = "importRule-begin";
            i += "import".length;
            buffer += "@import";
            break;
          } else if (token.indexOf("@font-face", i) === i) {
            state = "fontFaceRule-begin";
            i += "font-face".length;
            fontFaceRule = new CSSOM.CSSFontFaceRule();
            fontFaceRule.__starts = i;
            buffer = "";
            break;
          } else {
            atKeyframesRegExp.lastIndex = i;
            var matchKeyframes = atKeyframesRegExp.exec(token);
            if (matchKeyframes && matchKeyframes.index === i) {
              state = "keyframesRule-begin";
              keyframesRule = new CSSOM.CSSKeyframesRule();
              keyframesRule.__starts = i;
              keyframesRule._vendorPrefix = matchKeyframes[1];
              i += matchKeyframes[0].length - 1;
              buffer = "";
              break;
            } else if (state === "selector") {
              state = "atRule";
            }
          }
          buffer += character;
          break;
        case "{":
          if (state === "selector" || state === "atRule") {
            styleRule.selectorText = buffer.trim();
            styleRule.style.__starts = i;
            buffer = "";
            state = "before-name";
          } else if (state === "atBlock") {
            mediaRule.media.mediaText = buffer.trim();
            if (parentRule) {
              ancestorRules.push(parentRule);
            }
            currentScope = parentRule = mediaRule;
            mediaRule.parentStyleSheet = styleSheet;
            buffer = "";
            state = "before-selector";
          } else if (state === "containerBlock") {
            containerRule.containerText = buffer.trim();
            if (parentRule) {
              ancestorRules.push(parentRule);
            }
            currentScope = parentRule = containerRule;
            containerRule.parentStyleSheet = styleSheet;
            buffer = "";
            state = "before-selector";
          } else if (state === "conditionBlock") {
            supportsRule.conditionText = buffer.trim();
            if (parentRule) {
              ancestorRules.push(parentRule);
            }
            currentScope = parentRule = supportsRule;
            supportsRule.parentStyleSheet = styleSheet;
            buffer = "";
            state = "before-selector";
          } else if (state === "layerBlock") {
            layerBlockRule.layerNameText = buffer.trim();
            if (parentRule) {
              ancestorRules.push(parentRule);
            }
            currentScope = parentRule = layerBlockRule;
            layerBlockRule.parentStyleSheet = styleSheet;
            buffer = "";
            state = "before-selector";
          } else if (state === "hostRule-begin") {
            if (parentRule) {
              ancestorRules.push(parentRule);
            }
            currentScope = parentRule = hostRule;
            hostRule.parentStyleSheet = styleSheet;
            buffer = "";
            state = "before-selector";
          } else if (state === "startingStyleRule-begin") {
            if (parentRule) {
              ancestorRules.push(parentRule);
            }
            currentScope = parentRule = startingStyleRule;
            startingStyleRule.parentStyleSheet = styleSheet;
            buffer = "";
            state = "before-selector";
          } else if (state === "fontFaceRule-begin") {
            if (parentRule) {
              fontFaceRule.parentRule = parentRule;
            }
            fontFaceRule.parentStyleSheet = styleSheet;
            styleRule = fontFaceRule;
            buffer = "";
            state = "before-name";
          } else if (state === "keyframesRule-begin") {
            keyframesRule.name = buffer.trim();
            if (parentRule) {
              ancestorRules.push(parentRule);
              keyframesRule.parentRule = parentRule;
            }
            keyframesRule.parentStyleSheet = styleSheet;
            currentScope = parentRule = keyframesRule;
            buffer = "";
            state = "keyframeRule-begin";
          } else if (state === "keyframeRule-begin") {
            styleRule = new CSSOM.CSSKeyframeRule();
            styleRule.keyText = buffer.trim();
            styleRule.__starts = i;
            buffer = "";
            state = "before-name";
          } else if (state === "documentRule-begin") {
            documentRule.matcher.matcherText = buffer.trim();
            if (parentRule) {
              ancestorRules.push(parentRule);
              documentRule.parentRule = parentRule;
            }
            currentScope = parentRule = documentRule;
            documentRule.parentStyleSheet = styleSheet;
            buffer = "";
            state = "before-selector";
          }
          break;
        case ":":
          if (state === "name") {
            name = buffer.trim();
            buffer = "";
            state = "before-value";
          } else {
            buffer += character;
          }
          break;
        case "(":
          if (state === "value") {
            if (buffer.trim() === "expression") {
              var info = new CSSOM.CSSValueExpression(token, i).parse();
              if (info.error) {
                parseError(info.error);
              } else {
                buffer += info.expression;
                i = info.idx;
              }
            } else {
              state = "value-parenthesis";
              valueParenthesisDepth = 1;
              buffer += character;
            }
          } else if (state === "value-parenthesis") {
            valueParenthesisDepth++;
            buffer += character;
          } else {
            buffer += character;
          }
          break;
        case ")":
          if (state === "value-parenthesis") {
            valueParenthesisDepth--;
            if (valueParenthesisDepth === 0) state = "value";
          }
          buffer += character;
          break;
        case "!":
          if (state === "value" && token.indexOf("!important", i) === i) {
            priority = "important";
            i += "important".length;
          } else {
            buffer += character;
          }
          break;
        case ";":
          switch (state) {
            case "value":
              styleRule.style.setProperty(name, buffer.trim(), priority);
              priority = "";
              buffer = "";
              state = "before-name";
              break;
            case "atRule":
              buffer = "";
              state = "before-selector";
              break;
            case "importRule":
              importRule = new CSSOM.CSSImportRule();
              importRule.parentStyleSheet = importRule.styleSheet.parentStyleSheet = styleSheet;
              importRule.cssText = buffer + character;
              styleSheet.cssRules.push(importRule);
              buffer = "";
              state = "before-selector";
              break;
            default:
              buffer += character;
              break;
          }
          break;
        case "}":
          switch (state) {
            case "value":
              styleRule.style.setProperty(name, buffer.trim(), priority);
              priority = "";
            /* falls through */
            case "before-name":
            case "name":
              styleRule.__ends = i + 1;
              if (parentRule) {
                styleRule.parentRule = parentRule;
              }
              styleRule.parentStyleSheet = styleSheet;
              currentScope.cssRules.push(styleRule);
              buffer = "";
              if (currentScope.constructor === CSSOM.CSSKeyframesRule) {
                state = "keyframeRule-begin";
              } else {
                state = "before-selector";
              }
              break;
            case "keyframeRule-begin":
            case "before-selector":
            case "selector":
              if (!parentRule) {
                parseError("Unexpected }");
              }
              hasAncestors = ancestorRules.length > 0;
              while (ancestorRules.length > 0) {
                parentRule = ancestorRules.pop();
                if (parentRule.constructor.name === "CSSMediaRule" || parentRule.constructor.name === "CSSSupportsRule" || parentRule.constructor.name === "CSSContainerRule" || parentRule.constructor.name === "CSSLayerBlockRule" || parentRule.constructor.name === "CSSStartingStyleRule") {
                  prevScope = currentScope;
                  currentScope = parentRule;
                  currentScope.cssRules.push(prevScope);
                  break;
                }
                if (ancestorRules.length === 0) {
                  hasAncestors = false;
                }
              }
              if (!hasAncestors) {
                currentScope.__ends = i + 1;
                styleSheet.cssRules.push(currentScope);
                currentScope = styleSheet;
                parentRule = null;
              }
              buffer = "";
              state = "before-selector";
              break;
          }
          break;
        default:
          switch (state) {
            case "before-selector":
              state = "selector";
              styleRule = new CSSOM.CSSStyleRule();
              styleRule.__starts = i;
              break;
            case "before-name":
              state = "name";
              break;
            case "before-value":
              state = "value";
              break;
            case "importRule-begin":
              state = "importRule";
              break;
          }
          buffer += character;
          break;
      }
    }
    return styleSheet;
  };
  parse.parse = CSSOM.parse;
  CSSOM.CSSStyleSheet = requireCSSStyleSheet().CSSStyleSheet;
  CSSOM.CSSStyleRule = requireCSSStyleRule().CSSStyleRule;
  CSSOM.CSSImportRule = requireCSSImportRule().CSSImportRule;
  CSSOM.CSSGroupingRule = requireCSSGroupingRule().CSSGroupingRule;
  CSSOM.CSSMediaRule = requireCSSMediaRule().CSSMediaRule;
  CSSOM.CSSContainerRule = requireCSSContainerRule().CSSContainerRule;
  CSSOM.CSSConditionRule = requireCSSConditionRule().CSSConditionRule;
  CSSOM.CSSSupportsRule = requireCSSSupportsRule().CSSSupportsRule;
  CSSOM.CSSFontFaceRule = requireCSSFontFaceRule().CSSFontFaceRule;
  CSSOM.CSSHostRule = requireCSSHostRule().CSSHostRule;
  CSSOM.CSSStartingStyleRule = requireCSSStartingStyleRule().CSSStartingStyleRule;
  CSSOM.CSSStyleDeclaration = requireCSSStyleDeclaration().CSSStyleDeclaration;
  CSSOM.CSSKeyframeRule = requireCSSKeyframeRule().CSSKeyframeRule;
  CSSOM.CSSKeyframesRule = requireCSSKeyframesRule().CSSKeyframesRule;
  CSSOM.CSSValueExpression = requireCSSValueExpression().CSSValueExpression;
  CSSOM.CSSDocumentRule = requireCSSDocumentRule().CSSDocumentRule;
  CSSOM.CSSLayerBlockRule = requireCSSLayerBlockRule().CSSLayerBlockRule;
  return parse;
}
var hasRequiredCSSStyleDeclaration;
function requireCSSStyleDeclaration() {
  if (hasRequiredCSSStyleDeclaration) return CSSStyleDeclaration;
  hasRequiredCSSStyleDeclaration = 1;
  var CSSOM = {};
  CSSOM.CSSStyleDeclaration = function CSSStyleDeclaration2() {
    this.length = 0;
    this.parentRule = null;
    this._importants = {};
  };
  CSSOM.CSSStyleDeclaration.prototype = {
    constructor: CSSOM.CSSStyleDeclaration,
    /**
     *
     * @param {string} name
     * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
     * @return {string} the value of the property if it has been explicitly set for this declaration block.
     * Returns the empty string if the property has not been set.
     */
    getPropertyValue: function(name) {
      return this[name] || "";
    },
    /**
     *
     * @param {string} name
     * @param {string} value
     * @param {string} [priority=null] "important" or null
     * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
     */
    setProperty: function(name, value, priority) {
      if (this[name]) {
        var index = Array.prototype.indexOf.call(this, name);
        if (index < 0) {
          this[this.length] = name;
          this.length++;
        }
      } else {
        this[this.length] = name;
        this.length++;
      }
      this[name] = value + "";
      this._importants[name] = priority;
    },
    /**
     *
     * @param {string} name
     * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
     * @return {string} the value of the property if it has been explicitly set for this declaration block.
     * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
     */
    removeProperty: function(name) {
      if (!(name in this)) {
        return "";
      }
      var index = Array.prototype.indexOf.call(this, name);
      if (index < 0) {
        return "";
      }
      var prevValue = this[name];
      this[name] = "";
      Array.prototype.splice.call(this, index, 1);
      return prevValue;
    },
    getPropertyCSSValue: function() {
    },
    /**
     *
     * @param {String} name
     */
    getPropertyPriority: function(name) {
      return this._importants[name] || "";
    },
    /**
     *   element.style.overflow = "auto"
     *   element.style.getPropertyShorthand("overflow-x")
     *   -> "overflow"
     */
    getPropertyShorthand: function() {
    },
    isPropertyImplicit: function() {
    },
    // Doesn't work in IE < 9
    get cssText() {
      var properties = [];
      for (var i = 0, length = this.length; i < length; ++i) {
        var name = this[i];
        var value = this.getPropertyValue(name);
        var priority = this.getPropertyPriority(name);
        if (priority) {
          priority = " !" + priority;
        }
        properties[i] = name + ": " + value + priority + ";";
      }
      return properties.join(" ");
    },
    set cssText(text) {
      var i, name;
      for (i = this.length; i--; ) {
        name = this[i];
        this[name] = "";
      }
      Array.prototype.splice.call(this, 0, this.length);
      this._importants = {};
      var dummyRule = CSSOM.parse("#bogus{" + text + "}").cssRules[0].style;
      var length = dummyRule.length;
      for (i = 0; i < length; ++i) {
        name = dummyRule[i];
        this.setProperty(dummyRule[i], dummyRule.getPropertyValue(name), dummyRule.getPropertyPriority(name));
      }
    }
  };
  CSSStyleDeclaration.CSSStyleDeclaration = CSSOM.CSSStyleDeclaration;
  CSSOM.parse = requireParse().parse;
  return CSSStyleDeclaration;
}
var clone = {};
var hasRequiredClone;
function requireClone() {
  if (hasRequiredClone) return clone;
  hasRequiredClone = 1;
  var CSSOM = {
    CSSStyleSheet: requireCSSStyleSheet().CSSStyleSheet,
    CSSRule: requireCSSRule().CSSRule,
    CSSStyleRule: requireCSSStyleRule().CSSStyleRule,
    CSSGroupingRule: requireCSSGroupingRule().CSSGroupingRule,
    CSSConditionRule: requireCSSConditionRule().CSSConditionRule,
    CSSMediaRule: requireCSSMediaRule().CSSMediaRule,
    CSSContainerRule: requireCSSContainerRule().CSSContainerRule,
    CSSSupportsRule: requireCSSSupportsRule().CSSSupportsRule,
    CSSStyleDeclaration: requireCSSStyleDeclaration().CSSStyleDeclaration,
    CSSKeyframeRule: requireCSSKeyframeRule().CSSKeyframeRule,
    CSSKeyframesRule: requireCSSKeyframesRule().CSSKeyframesRule,
    CSSLayerBlockRule: requireCSSLayerBlockRule().CSSLayerBlockRule
  };
  CSSOM.clone = function clone2(stylesheet) {
    var cloned = new CSSOM.CSSStyleSheet();
    var rules = stylesheet.cssRules;
    if (!rules) {
      return cloned;
    }
    for (var i = 0, rulesLength = rules.length; i < rulesLength; i++) {
      var rule = rules[i];
      var ruleClone = cloned.cssRules[i] = new rule.constructor();
      var style = rule.style;
      if (style) {
        var styleClone = ruleClone.style = new CSSOM.CSSStyleDeclaration();
        for (var j = 0, styleLength = style.length; j < styleLength; j++) {
          var name = styleClone[j] = style[j];
          styleClone[name] = style[name];
          styleClone._importants[name] = style.getPropertyPriority(name);
        }
        styleClone.length = style.length;
      }
      if (rule.hasOwnProperty("keyText")) {
        ruleClone.keyText = rule.keyText;
      }
      if (rule.hasOwnProperty("selectorText")) {
        ruleClone.selectorText = rule.selectorText;
      }
      if (rule.hasOwnProperty("mediaText")) {
        ruleClone.mediaText = rule.mediaText;
      }
      if (rule.hasOwnProperty("conditionText")) {
        ruleClone.conditionText = rule.conditionText;
      }
      if (rule.hasOwnProperty("layerName")) {
        ruleClone.layerName = rule.layerName;
      }
      if (rule.hasOwnProperty("cssRules")) {
        ruleClone.cssRules = clone2(rule).cssRules;
      }
    }
    return cloned;
  };
  clone.clone = CSSOM.clone;
  return clone;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  lib.CSSStyleDeclaration = requireCSSStyleDeclaration().CSSStyleDeclaration;
  lib.CSSRule = requireCSSRule().CSSRule;
  lib.CSSGroupingRule = requireCSSGroupingRule().CSSGroupingRule;
  lib.CSSConditionRule = requireCSSConditionRule().CSSConditionRule;
  lib.CSSStyleRule = requireCSSStyleRule().CSSStyleRule;
  lib.MediaList = requireMediaList().MediaList;
  lib.CSSMediaRule = requireCSSMediaRule().CSSMediaRule;
  lib.CSSContainerRule = requireCSSContainerRule().CSSContainerRule;
  lib.CSSSupportsRule = requireCSSSupportsRule().CSSSupportsRule;
  lib.CSSImportRule = requireCSSImportRule().CSSImportRule;
  lib.CSSFontFaceRule = requireCSSFontFaceRule().CSSFontFaceRule;
  lib.CSSHostRule = requireCSSHostRule().CSSHostRule;
  lib.CSSStartingStyleRule = requireCSSStartingStyleRule().CSSStartingStyleRule;
  lib.StyleSheet = requireStyleSheet().StyleSheet;
  lib.CSSStyleSheet = requireCSSStyleSheet().CSSStyleSheet;
  lib.CSSKeyframesRule = requireCSSKeyframesRule().CSSKeyframesRule;
  lib.CSSKeyframeRule = requireCSSKeyframeRule().CSSKeyframeRule;
  lib.MatcherList = requireMatcherList().MatcherList;
  lib.CSSDocumentRule = requireCSSDocumentRule().CSSDocumentRule;
  lib.CSSValue = requireCSSValue().CSSValue;
  lib.CSSValueExpression = requireCSSValueExpression().CSSValueExpression;
  lib.CSSLayerBlockRule = requireCSSLayerBlockRule().CSSLayerBlockRule;
  lib.parse = requireParse().parse;
  lib.clone = requireClone().clone;
  return lib;
}
export {
  requireLib as r
};
