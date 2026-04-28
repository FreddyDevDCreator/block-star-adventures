var nwsapi$1 = { exports: {} };
var nwsapi = nwsapi$1.exports;
var hasRequiredNwsapi;
function requireNwsapi() {
  if (hasRequiredNwsapi) return nwsapi$1.exports;
  hasRequiredNwsapi = 1;
  (function(module, exports$1) {
    (function Export(global, factory) {
      {
        module.exports = factory;
      }
    })(nwsapi, function Factory(global, Export) {
      var version = "nwsapi-2.2.23", doc = global.document, root = doc.documentElement, slice = Array.prototype.slice, VSP = "[\\r\\n\\f]", WSP = "[\\x20\\t\\r\\n\\f]", CFG = {
        // extensions
        operators: "[~*^$|]=|=",
        combinators: "[\\x20\\t>+~](?=[^>+~])"
      }, NOT = {
        // not enclosed in double/single/parens/square
        double_enc: '(?=(?:[^"]*["][^"]*["])*[^"]*$)',
        single_enc: "(?=(?:[^']*['][^']*['])*[^']*$)",
        parens_enc: "(?![^\\x28]*\\x29)",
        square_enc: "(?![^\\x5b]*\\x5d)"
      }, REX = {
        // regular expressions
        HasEscapes: RegExp("\\\\"),
        HexNumbers: RegExp("^[0-9a-fA-F]"),
        EscOrQuote: RegExp("^\\\\|[\\x22\\x27]"),
        RegExpChar: RegExp("(?!\\\\)[\\\\^$.,*+?()[\\]{}|\\/]", "g"),
        TrimSpaces: RegExp("^" + WSP + "+|" + WSP + "+$|" + VSP, "g"),
        SplitGroup: RegExp("(\\([^)]*\\)|\\[[^[]*\\]|\\\\.|[^,])+", "g"),
        CommaGroup: RegExp("(\\s*,\\s*)" + NOT.square_enc + NOT.parens_enc, "g"),
        FixEscapes: RegExp("\\\\([0-9a-fA-F]{1,6}" + WSP + "?|.)|([\\x22\\x27])", "g"),
        CombineWSP: RegExp("[\\n\\r\\f\\x20]+" + NOT.single_enc + NOT.double_enc, "g"),
        TabCharWSP: RegExp("(\\x20?\\t+\\x20?)" + NOT.single_enc + NOT.double_enc, "g"),
        PseudosWSP: RegExp("\\s+([-+])\\s+" + NOT.square_enc, "g")
      }, STD = {
        combinator: RegExp("\\s?([>+~])\\s?", "g"),
        apimethods: RegExp("^(?:\\w+|\\*)\\|"),
        namespaces: RegExp("(\\*|\\w+)\\|[\\w-]+")
      }, GROUPS = {
        // pseudo-classes requiring parameters
        linguistic: "(dir|lang)(?:\\x28\\s?([-\\w]{2,})\\s?\\x29)",
        logicalsel: "(is|where|matches|not|has)(?:\\x28\\s?([^()]*|.*)\\s?\\x29)",
        treestruct: "(nth(?:-last)?(?:-child|-of\\-type))(?:\\x28\\s?(even|odd|(?:[-+]?\\d*)(?:n\\s?[-+]?\\s?\\d*)?)\\s?\\x29)",
        // pseudo-classes not requiring parameters
        locationpc: "(any\\-link|link|visited|target|defined)\\b",
        useraction: "(hover|active|focus\\-within|focus\\-visible|focus)\\b",
        structural: "(scope|root|empty|(?:(?:first|last|only)(?:-child|\\-of\\-type)))\\b",
        inputstate: "(enabled|disabled|read\\-only|read\\-write|placeholder\\-shown|default)\\b",
        inputvalue: "(checked|indeterminate|required|optional|valid|invalid|in\\-range|out\\-of\\-range)\\b",
        // pseudo-classes not requiring parameters and describing functional state
        rsrc_state: "(playing|paused|seeking|buffering|stalled|muted|volume-locked)\\b",
        // pseudo-classes for parsing only selectors
        pseudo_nop: "(autofill|-webkit\\-autofill)\\b",
        // pseudo-elements starting with single colon (:)
        pseudo_sng: "(after|before|first\\-letter|first\\-line)\\b",
        // pseudo-elements starting with double colon (::)
        pseudo_dbl: ":(after|before|first\\-letter|first\\-line|selection|placeholder|-webkit-[-a-zA-Z0-9]{2,})\\b"
      }, Patterns = {
        // pseudo-classes
        treestruct: RegExp("^:(?:" + GROUPS.treestruct + ")(.*)", "i"),
        structural: RegExp("^:(?:" + GROUPS.structural + ")(.*)", "i"),
        linguistic: RegExp("^:(?:" + GROUPS.linguistic + ")(.*)", "i"),
        useraction: RegExp("^:(?:" + GROUPS.useraction + ")(.*)", "i"),
        inputstate: RegExp("^:(?:" + GROUPS.inputstate + ")(.*)", "i"),
        inputvalue: RegExp("^:(?:" + GROUPS.inputvalue + ")(.*)", "i"),
        rsrc_state: RegExp("^:(?:" + GROUPS.rsrc_state + ")(.*)", "i"),
        locationpc: RegExp("^:(?:" + GROUPS.locationpc + ")(.*)", "i"),
        logicalsel: RegExp("^:(?:" + GROUPS.logicalsel + ")(.*)", "i"),
        pseudo_nop: RegExp("^:(?:" + GROUPS.pseudo_nop + ")(.*)", "i"),
        pseudo_sng: RegExp("^:(?:" + GROUPS.pseudo_sng + ")(.*)", "i"),
        pseudo_dbl: RegExp("^:(?:" + GROUPS.pseudo_dbl + ")(.*)", "i"),
        // combinator symbols
        children: RegExp("^" + WSP + "?\\>" + WSP + "?(.*)"),
        adjacent: RegExp("^" + WSP + "?\\+" + WSP + "?(.*)"),
        relative: RegExp("^" + WSP + "?\\~" + WSP + "?(.*)"),
        ancestor: RegExp("^" + WSP + "+(.*)"),
        // universal & namespace
        universal: RegExp("^(\\*)(.*)"),
        namespace: RegExp("^(\\*|[\\w-]+)?\\|(.*)")
      }, RTL = RegExp("^(?:[\\u0627-\\u064a]|[\\u0591-\\u08ff]|[\\ufb1d-\\ufdfd]|[\\ufe70-\\ufefc])+$"), qsNotArgs = "Not enough arguments", qsInvalid = " is not a valid selector", reNthElem = RegExp("(:nth(?:-last)?-child)", "i"), reNthType = RegExp("(:nth(?:-last)?-of-type)", "i"), reOptimizer, reValidator, Config = {
        IDS_DUPES: true,
        FORGIVING: true,
        NODE_LIST: false,
        LOGERRORS: true,
        USR_EVENT: true,
        VERBOSITY: true
      }, NAMESPACE, QUIRKS_MODE, HTML_DOCUMENT, ATTR_STD_OPS = {
        "=": 1,
        "^=": 1,
        "$=": 1,
        "|=": 1,
        "*=": 1,
        "~=": 1
      }, HTML_TABLE = {
        "accept": 1,
        "accept-charset": 1,
        "align": 1,
        "alink": 1,
        "axis": 1,
        "bgcolor": 1,
        "charset": 1,
        "checked": 1,
        "clear": 1,
        "codetype": 1,
        "color": 1,
        "compact": 1,
        "declare": 1,
        "defer": 1,
        "dir": 1,
        "direction": 1,
        "disabled": 1,
        "enctype": 1,
        "face": 1,
        "frame": 1,
        "hreflang": 1,
        "http-equiv": 1,
        "lang": 1,
        "language": 1,
        "link": 1,
        "media": 1,
        "method": 1,
        "multiple": 1,
        "nohref": 1,
        "noresize": 1,
        "noshade": 1,
        "nowrap": 1,
        "readonly": 1,
        "rel": 1,
        "rev": 1,
        "rules": 1,
        "scope": 1,
        "scrolling": 1,
        "selected": 1,
        "shape": 1,
        "target": 1,
        "text": 1,
        "type": 1,
        "valign": 1,
        "valuetype": 1,
        "vlink": 1
      }, Combinators = {}, Selectors = {}, Operators = {
        "=": {
          p1: "^",
          p2: "$",
          p3: "true"
        },
        "^=": {
          p1: "^",
          p2: "",
          p3: "true"
        },
        "$=": {
          p1: "",
          p2: "$",
          p3: "true"
        },
        "*=": {
          p1: "",
          p2: "",
          p3: "true"
        },
        "|=": {
          p1: "^",
          p2: "(-|$)",
          p3: "true"
        },
        "~=": {
          p1: "(^|\\s)",
          p2: "(\\s|$)",
          p3: "true"
        }
      }, concatCall = function(nodes, callback) {
        var i = 0, l = nodes.length, list = Array(l);
        while (l > i) {
          if (false === callback(list[i] = nodes[i])) break;
          ++i;
        }
        return list;
      }, concatList = function(list, nodes) {
        var i = -1, l = nodes.length;
        while (l--) {
          list[list.length] = nodes[++i];
        }
        return list;
      }, toNodeList = Config.NODE_LIST == false ? function(x) {
        return x;
      } : (function() {
        var emptyNL = doc.createDocumentFragment().childNodes;
        return function(nodeArray) {
          if (isInstanceOf(nodeArray)) return nodeArray;
          if (!Array.isArray(nodeArray)) nodeArray = [nodeArray];
          var fakeNL = Object.create(emptyNL, {
            "length": {
              value: nodeArray.length,
              enumerable: false
            },
            "item": {
              "value": function(i) {
                return this[+i || 0];
              },
              enumerable: false
            }
          });
          nodeArray.forEach(function(v, i) {
            fakeNL[i] = v;
          });
          return fakeNL;
        };
      })(), isInstanceOf = function(nodes) {
        return nodes instanceof global.NodeList;
      }, documentOrder = function(a, b) {
        if (!hasDupes && a === b) {
          hasDupes = true;
          return 0;
        }
        return a.compareDocumentPosition(b) & 4 ? -1 : 1;
      }, hasDupes = false, unique = function(nodes) {
        var i = 0, j = -1, l = nodes.length + 1, list = [];
        while (--l) {
          if (nodes[i++] === nodes[i]) continue;
          list[++j] = nodes[i - 1];
        }
        hasDupes = false;
        return list;
      }, switchContext = function(context, force) {
        var oldDoc = doc;
        doc = context.ownerDocument || context;
        if (force || oldDoc !== doc) {
          root = doc.documentElement;
          HTML_DOCUMENT = isHTML(doc);
          QUIRKS_MODE = HTML_DOCUMENT && doc.compatMode.indexOf("CSS") < 0;
          NAMESPACE = root && root.namespaceURI;
          Snapshot.doc = doc;
          Snapshot.root = root;
        }
        return Snapshot.from = context;
      }, codePointToUTF16 = function(codePoint) {
        if (codePoint < 1 || codePoint > 1114111 || codePoint > 55295 && codePoint < 57344) {
          return "\\ufffd";
        }
        if (codePoint < 65536) {
          var lowHex = "000" + codePoint.toString(16);
          return "\\u" + lowHex.substr(lowHex.length - 4);
        }
        return "\\u" + ((codePoint - 65536 >> 10) + 55296).toString(16) + "\\u" + ((codePoint - 65536) % 1024 + 56320).toString(16);
      }, stringFromCodePoint = function(codePoint) {
        if (codePoint < 1 || codePoint > 1114111 || codePoint > 55295 && codePoint < 57344) {
          return "�";
        }
        if (codePoint < 65536) {
          return String.fromCharCode(codePoint);
        }
        return String.fromCodePoint ? String.fromCodePoint(codePoint) : String.fromCharCode(
          (codePoint - 65536 >> 10) + 55296,
          (codePoint - 65536) % 1024 + 56320
        );
      }, convertEscapes = function(str) {
        return REX.HasEscapes.test(str) ? str.replace(
          REX.FixEscapes,
          function(substring, p1, p2) {
            return p2 ? "\\" + p2 : (
              // javascript strings are UTF-16 encoded
              REX.HexNumbers.test(p1) ? codePointToUTF16(parseInt(p1, 16)) : (
                // \' \"
                REX.EscOrQuote.test(p1) ? substring : (
                  // \g \h \. \# etc
                  p1
                )
              )
            );
          }
        ) : str;
      }, unescapeIdentifier = function(str) {
        return REX.HasEscapes.test(str) ? str.replace(
          REX.FixEscapes,
          function(substring, p1, p2) {
            return p2 ? p2 : (
              // javascript strings are UTF-16 encoded
              REX.HexNumbers.test(p1) ? stringFromCodePoint(parseInt(p1, 16)) : (
                // \' \"
                REX.EscOrQuote.test(p1) ? substring : (
                  // \g \h \. \# etc
                  p1
                )
              )
            );
          }
        ) : str;
      }, method = {
        "#": "getElementById",
        "*": "getElementsByTagName",
        ".": "getElementsByClassName"
      }, compat = {
        "#": (c, n) => (e, f) => byId(n, c),
        "*": (c, n) => (e, f) => byTag(n, c),
        "|": (c, n) => (e, f) => byTagNS(n, c),
        ".": (c, n) => (e, f) => byClass(n, c)
      }, byIdRaw = function(id, context) {
        var node = context, nodes = [], next = node.firstElementChild;
        while (node = next) {
          node.id == id && (nodes[nodes.length] = node);
          if (next = node.firstElementChild || node.nextElementSibling) continue;
          while (!next && (node = node.parentElement) && node !== context) {
            next = node.nextElementSibling;
          }
        }
        return nodes;
      }, byId = function(id, context) {
        var e, i, l, nodes, api = method["#"];
        if (Config.IDS_DUPES === false) {
          if (api in context) {
            return (e = context[api](id)) ? [e] : none;
          }
        } else {
          if ("all" in context) {
            if (e = context.all[id]) {
              if (e.nodeType == 1) return e.getAttribute("id") != id ? [] : [e];
              else if (id == "length") return (e = context[api](id)) ? [e] : none;
              for (i = 0, l = e.length, nodes = []; l > i; ++i) {
                if (e[i].id == id) nodes[nodes.length] = e[i];
              }
              return nodes && nodes.length ? nodes : [nodes];
            } else return none;
          }
        }
        return byIdRaw(id, context);
      }, byTagNS = function(context, tag) {
        return byTag(tag, context);
      }, byTag = function(tag, context) {
        var e, nodes, api = method["*"];
        if (api in context) {
          return slice.call(context[api](tag));
        } else {
          tag = tag.toLowerCase();
          if (e = context.firstElementChild) {
            if (!(e.nextElementSibling || tag == "*" || e.localName == tag)) {
              return slice.call(e[api](tag));
            } else {
              nodes = [];
              do {
                if (tag == "*" || e.localName == tag) nodes[nodes.length] = e;
                concatList(nodes, e[api](tag));
              } while (e = e.nextElementSibling);
            }
          } else nodes = none;
        }
        return !Config.NODE_LIST ? nodes : isInstanceOf(nodes) ? nodes : toNodeList(nodes);
      }, byClass = function(cls, context) {
        var e, nodes, api = method["."], reCls;
        if (api in context) {
          return slice.call(context[api](cls));
        } else {
          if (e = context.firstElementChild) {
            reCls = RegExp("(^|\\s)" + cls + "(\\s|$)", QUIRKS_MODE ? "i" : "");
            if (!(e.nextElementSibling || reCls.test(e.className))) {
              return slice.call(e[api](cls));
            } else {
              nodes = [];
              do {
                if (reCls.test(e.className)) nodes[nodes.length] = e;
                concatList(nodes, e[api](cls));
              } while (e = e.nextElementSibling);
            }
          } else nodes = none;
        }
        return !Config.NODE_LIST ? nodes : isInstanceof(nodes) ? nodes : toNodeList(nodes);
      }, hasAttributeNS = function(e, name) {
        var i, l, attr = e.getAttributeNames();
        name = RegExp(":?" + name + "$", HTML_DOCUMENT ? "i" : "");
        for (i = 0, l = attr.length; l > i; ++i) {
          if (name.test(attr[i])) return true;
        }
        return false;
      }, nthElement = (function() {
        var idx = 0, len = 0, set = 0, parent = void 0, parents = Array(), nodes = Array();
        return function(element, dir) {
          if (dir == 2) {
            idx = 0;
            len = 0;
            set = 0;
            nodes.length = 0;
            parents.length = 0;
            parent = void 0;
            return -1;
          }
          var e, i, j, k, l;
          if (parent === element.parentElement) {
            i = set;
            j = idx;
            l = len;
          } else {
            l = parents.length;
            parent = element.parentElement;
            for (i = -1, j = 0, k = l - 1; l > j; ++j, --k) {
              if (parents[j] === parent) {
                i = j;
                break;
              }
              if (parents[k] === parent) {
                i = k;
                break;
              }
            }
            if (i < 0) {
              parents[i = l] = parent;
              l = 0;
              nodes[i] = Array();
              e = parent && parent.firstElementChild || element;
              while (e) {
                nodes[i][l] = e;
                if (e === element) j = l;
                e = e.nextElementSibling;
                ++l;
              }
              set = i;
              idx = 0;
              len = l;
              if (l < 2) return l;
            } else {
              l = nodes[i].length;
              set = i;
            }
          }
          if (element !== nodes[i][j] && element !== nodes[i][j = 0]) {
            for (j = 0, e = nodes[i], k = l - 1; l > j; ++j, --k) {
              if (e[j] === element) {
                break;
              }
              if (e[k] === element) {
                j = k;
                break;
              }
            }
          }
          idx = j + 1;
          len = l;
          return dir ? l - j : idx;
        };
      })(), nthOfType = (function() {
        var idx = 0, len = 0, set = 0, parent = void 0, parents = Array(), nodes = Array();
        return function(element, dir) {
          if (dir == 2) {
            idx = 0;
            len = 0;
            set = 0;
            nodes.length = 0;
            parents.length = 0;
            parent = void 0;
            return -1;
          }
          var e, i, j, k, l, name = element.localName;
          if (nodes[set] && nodes[set][name] && parent === element.parentElement) {
            i = set;
            j = idx;
            l = len;
          } else {
            l = parents.length;
            parent = element.parentElement;
            for (i = -1, j = 0, k = l - 1; l > j; ++j, --k) {
              if (parents[j] === parent) {
                i = j;
                break;
              }
              if (parents[k] === parent) {
                i = k;
                break;
              }
            }
            if (i < 0 || !nodes[i][name]) {
              parents[i = l] = parent;
              nodes[i] || (nodes[i] = Object());
              l = 0;
              nodes[i][name] = Array();
              e = parent && parent.firstElementChild || element;
              while (e) {
                if (e === element) j = l;
                if (e.localName == name) {
                  nodes[i][name][l] = e;
                  ++l;
                }
                e = e.nextElementSibling;
              }
              set = i;
              idx = j;
              len = l;
              if (l < 2) return l;
            } else {
              l = nodes[i][name].length;
              set = i;
            }
          }
          if (element !== nodes[i][name][j] && element !== nodes[i][name][j = 0]) {
            for (j = 0, e = nodes[i][name], k = l - 1; l > j; ++j, --k) {
              if (e[j] === element) {
                break;
              }
              if (e[k] === element) {
                j = k;
                break;
              }
            }
          }
          idx = j + 1;
          len = l;
          return dir ? l - j : idx;
        };
      })(), isHTML = function(node) {
        var doc2 = node.ownerDocument || node;
        return doc2.nodeType == 9 && // contentType not in IE <= 11
        "contentType" in doc2 ? doc2.contentType.indexOf("/html") > 0 : doc2.createElement("DiV").localName == "div";
      }, isFocusable = function(node) {
        var doc2 = node.ownerDocument;
        if (node.contentDocument && node.localName == "iframe") {
          return false;
        }
        if (doc2.hasFocus() && node === doc2.activeElement) {
          if (node.type || node.href || typeof node.tabIndex == "number") {
            return node;
          }
        }
        return false;
      }, isContentEditable = function(node) {
        var attrValue = "inherit";
        if (node.hasAttribute("contenteditable")) {
          attrValue = node.getAttribute("contenteditable");
        }
        switch (attrValue) {
          case "":
          case "plaintext-only":
          case "true":
            return true;
          case "false":
            return false;
          default:
            if (node.parentNode && node.parentNode.nodeType === 1) {
              return isContentEditable(node.parentNode);
            }
            return false;
        }
      }, configure = function(option, clear) {
        if (typeof option == "string") {
          return !!Config[option];
        }
        if (typeof option != "object") {
          return Config;
        }
        for (var i in option) {
          Config[i] = !!option[i];
        }
        if (clear) {
          matchResolvers = {};
          selectResolvers = {};
        }
        setIdentifierSyntax();
        return true;
      }, emit = function(message, proto) {
        var err;
        if (Config.VERBOSITY) {
          if (proto) {
            err = new proto(message);
          } else {
            err = new global.DOMException(message, "SyntaxError");
          }
          throw err;
        }
        if (Config.LOGERRORS && console && console.log) {
          console.log(message);
        }
      }, initialize = function(doc2) {
        setIdentifierSyntax();
        lastContext = switchContext(doc2, true);
      }, setIdentifierSyntax = function() {
        var noascii = "[^\\x00-\\x9f]", escaped = "\\\\[^\\r\\n\\f0-9a-fA-F]", unicode = "\\\\[0-9a-fA-F]{1,6}(?:\\r\\n|\\s)?", identifier = "-?(?:[a-zA-Z_-]|" + noascii + "|" + escaped + "|" + unicode + ")(?:-{2}|[0-9]|[a-zA-Z_-]|" + noascii + "|" + escaped + "|" + unicode + ")*", pseudonames = "[-\\w]+", pseudoparms = "(?:[-+]?\\d*)(?:n\\s?[-+]?\\s?\\d*)", doublequote = '"[^"\\\\]*(?:\\\\.[^"\\\\]*)*(?:"|$)', singlequote = "'[^'\\\\]*(?:\\\\.[^'\\\\]*)*(?:'|$)", attrparser = identifier + "|" + doublequote + "|" + singlequote, attrvalues = "([\\x22\\x27]?)((?!\\3)*|(?:\\\\?.)*?)(?:\\3|$)", attributes = "\\[(?:\\*\\|)?" + WSP + "?(" + identifier + "(?::" + identifier + ")?)" + WSP + "?(?:(" + CFG.operators + ")" + WSP + "?(?:" + attrparser + "))?(?:" + WSP + "?\\b(i))?" + WSP + "?(?:\\]|$)", attrmatcher = attributes.replace(attrparser, attrvalues), pseudoclass = "(?:\\x28" + WSP + "*(?:" + pseudoparms + "?)?|(?:\\*|\\*\\|)|(?:(?::" + pseudonames + "(?:\\x28" + pseudoparms + "?(?:\\x29|$))?|)|(?:[.#]?" + identifier + ")|(?:" + attributes + "))+|(?:" + WSP + "?[>+~][^>+~]" + WSP + "?)|(?:" + WSP + "?," + WSP + "?)|(?:" + WSP + "?)|(?:\\x29|$))*", standardValidator = "(?=" + WSP + "?[^>+~(){}<>])(?:(?:\\*|\\*\\|)|(?:[.#]?" + identifier + ")+|(?:" + attributes + ")+|(?:::?" + pseudonames + pseudoclass + ")|(?:" + WSP + "?" + CFG.combinators + WSP + "?)|(?:" + WSP + "?," + WSP + "?)|(?:" + WSP + "?))+";
        reOptimizer = RegExp(
          "(?:([.:#*]?)(" + identifier + ")(?::[-\\w]+|\\[[^\\]]+(?:\\]|$)|\\x28[^\\x29]+(?:\\x29|$))*)$"
        );
        reValidator = RegExp(standardValidator, "g");
        Patterns.id = RegExp("^#(" + identifier + ")(.*)");
        Patterns.tagName = RegExp("^(" + identifier + ")(.*)");
        Patterns.className = RegExp("^\\.(" + identifier + ")(.*)");
        Patterns.attribute = RegExp("^(?:" + attrmatcher + ")(.*)");
      }, F_INIT = '"use strict";return function Resolver(c,f,x,r)', S_HEAD = "var e,n,o,j=r.length-1,k=-1", M_HEAD = "var e,n,o", N_HEAD = "var e,n,o", S_LOOP = "main:while((e=c[++k]))", M_LOOP = "e=c;", N_LOOP = "main:while((e=c.item(++k)))", S_BODY = "r[++j]=c[k];", M_BODY = "", N_BODY = "r[++j]=c.item(k);", S_TAIL = "continue main;", M_TAIL = "r=true;", N_TAIL = "r=true;", S_TEST = "if(f(c[k])){break main;}", M_TEST = "f(c);", N_TEST = "if(f(c.item(k))){break main;}", S_VARS = [], M_VARS = [], N_VARS = [], S_TEST = "if(f(c[k])){break main;}", M_TEST = "f(c);", N_TEST = "if(f(c.item(k))){break main;}", S_VARS = [], M_VARS = [], N_VARS = [], compile = function(selector, mode, callback) {
        var factory, head = "", loop = "", macro = "", source = "", vars = "";
        switch (mode) {
          case true:
            if (selectLambdas[selector]) {
              return selectLambdas[selector];
            }
            macro = S_BODY + (callback ? S_TEST : "") + S_TAIL;
            head = S_HEAD;
            loop = S_LOOP;
            break;
          case false:
            if (matchLambdas[selector]) {
              return matchLambdas[selector];
            }
            macro = M_BODY + (callback ? M_TEST : "") + M_TAIL;
            head = M_HEAD;
            loop = M_LOOP;
            break;
          case null:
            if (selectLambdas[selector]) {
              return selectLambdas[selector];
            }
            macro = N_BODY + (callback ? N_TEST : "") + N_TAIL;
            head = N_HEAD;
            loop = N_LOOP;
            break;
        }
        source = compileSelector(selector, macro, mode, callback);
        loop += mode || mode === null ? "{" + source + "}" : source;
        if (mode || mode === null && selector.includes(":nth")) {
          loop += reNthElem.test(selector) ? "s.nthElement(null, 2);" : "";
          loop += reNthType.test(selector) ? "s.nthOfType(null, 2);" : "";
        }
        if (S_VARS[0] || M_VARS[0] || N_VARS[0]) {
          vars = "," + (S_VARS.join(",") || M_VARS.join(",") || N_VARS[0]);
          S_VARS.length = 0;
          M_VARS.length = 0;
          N_VARS.length = 0;
        }
        factory = Function("s", F_INIT + "{" + head + vars + ";" + loop + "return r;}")(Snapshot);
        return mode || mode === null ? selectLambdas[selector] = factory : matchLambdas[selector] = factory;
      }, compileSelector = function(expression, source, mode, callback) {
        var a, b, n, f, name, NS, compat2, expr, match2, result, status, symbol, test, type, selector = expression, vars;
        selector = selector.replace(STD.combinator, "$1");
        selector_recursion_label:
          while (selector) {
            symbol = STD.apimethods.test(selector) ? "|" : selector[0];
            switch (symbol) {
              // universal resolver
              case "*":
                match2 = selector.match(Patterns.universal);
                break;
              // id resolver
              case "#":
                match2 = selector.match(Patterns.id);
                source = "if((/^" + match2[1] + '$/.test(e.getAttribute("id")))){' + source + "}";
                break;
              // class name resolver
              case ".":
                match2 = selector.match(Patterns.className);
                compat2 = (QUIRKS_MODE ? "i" : "") + '.test(e.getAttribute("class"))';
                source = "if((/(^|\\s)" + match2[1] + "(\\s|$)/" + compat2 + ")){" + source + "}";
                break;
              // tag name resolver
              case (/[_a-z]/i.test(symbol) ? symbol : void 0):
                match2 = selector.match(Patterns.tagName);
                source = 'if((e.localName=="' + match2[1] + '")){' + source + "}";
                break;
              // namespace resolver
              case "|":
                match2 = selector.match(Patterns.namespace);
                if (match2[1] == "*") {
                  source = "if(true){" + source + "}";
                } else if (!match2[1]) {
                  source = "if((!e.namespaceURI)){" + source + "}";
                } else if (typeof match2[1] == "string" && root.prefix == match2[1]) {
                  source = 'if((e.namespaceURI=="' + NAMESPACE + '")){' + source + "}";
                } else {
                  emit("'" + expression + "'" + qsInvalid);
                }
                break;
              // attributes resolver
              case "[":
                match2 = selector.match(Patterns.attribute);
                NS = match2[0].match(STD.namespaces);
                name = match2[1];
                expr = name.split(":");
                expr = expr.length == 2 ? expr[1] : expr[0];
                if (match2[2] && !(test = Operators[match2[2]])) {
                  emit("'" + expression + "'" + qsInvalid);
                  return "";
                }
                if (match2[4] === "") {
                  test = match2[2] == "~=" ? { p1: "^\\s", p2: "+$", p3: "true" } : match2[2] in ATTR_STD_OPS && match2[2] != "~=" ? { p1: "^", p2: "$", p3: "true" } : test;
                } else if (match2[2] == "~=" && match2[4].includes(" ")) {
                  break;
                } else if (match2[4]) {
                  match2[4] = convertEscapes(match2[4]).replace(REX.RegExpChar, "\\$&");
                }
                type = match2[5] == "i" || HTML_DOCUMENT && HTML_TABLE[expr.toLowerCase()] ? "i" : "";
                source = "if((" + (!match2[2] ? NS ? 's.hasAttributeNS(e,"' + name + '")' : 'e.hasAttribute&&e.hasAttribute("' + name + '")' : !match2[4] && ATTR_STD_OPS[match2[2]] && match2[2] != "~=" ? 'e.getAttribute&&e.getAttribute("' + name + '")==""' : "(/" + test.p1 + match2[4] + test.p2 + "/" + type + ').test(e.getAttribute&&e.getAttribute("' + name + '"))==' + test.p3) + ")){" + source + "}";
                break;
              // *** General sibling combinator
              // E ~ F (F relative sibling of E)
              case "~":
                match2 = selector.match(Patterns.relative);
                source = "while(e&&(e=e.previousElementSibling)){" + source + "}";
                break;
              // *** Adjacent sibling combinator
              // E + F (F adiacent sibling of E)
              case "+":
                match2 = selector.match(Patterns.adjacent);
                source = "if(e&&(e=e.previousElementSibling)){" + source + "}";
                break;
              // *** Descendant combinator
              // E F (E ancestor of F)
              case "	":
              case " ":
                match2 = selector.match(Patterns.ancestor);
                source = "while(e&&(e=e.parentElement)){" + source + "}";
                break;
              // *** Child combinator
              // E > F (F children of E)
              case ">":
                match2 = selector.match(Patterns.children);
                source = "if(e&&(e=e.parentElement)){" + source + "}";
                break;
              // *** user supplied combinators extensions
              case (symbol in Combinators ? symbol : void 0):
                match2[match2.length - 1] = "*";
                source = Combinators[symbol](match2) + source;
                break;
              // *** tree-structural pseudo-classes
              // :root, :empty, :first-child, :last-child, :only-child, :first-of-type, :last-of-type, :only-of-type
              case ":":
                if (match2 = selector.match(Patterns.structural)) {
                  match2[1] = match2[1].toLowerCase();
                  switch (match2[1]) {
                    case "scope":
                      source = "if(e===(s.from.nodeType===9?s.root:s.from)){" + source + "}";
                      break;
                    case "root":
                      source = "if((e===s.root)){" + source + (mode ? "break main;" : "") + "}";
                      break;
                    case "empty":
                      source = "n=e.firstChild;while(n&&!(/1|3/).test(n.nodeType)){n=n.nextSibling}if(!n){" + source + "}";
                      break;
                    // *** child-indexed pseudo-classes
                    // :first-child, :last-child, :only-child
                    case "only-child":
                      source = "if((!e.nextElementSibling&&!e.previousElementSibling)){" + source + "}";
                      break;
                    case "last-child":
                      source = "if((!e.nextElementSibling)){" + source + "}";
                      break;
                    case "first-child":
                      source = "if((!e.previousElementSibling)){" + source + "}";
                      break;
                    // *** typed child-indexed pseudo-classes
                    // :only-of-type, :last-of-type, :first-of-type
                    case "only-of-type":
                      source = "o=e.localName;n=e;while((n=n.nextElementSibling)&&n.localName!=o);if(!n){n=e;while((n=n.previousElementSibling)&&n.localName!=o);}if(!n){" + source + "}";
                      break;
                    case "last-of-type":
                      source = "n=e;o=e.localName;while((n=n.nextElementSibling)&&n.localName!=o);if(!n){" + source + "}";
                      break;
                    case "first-of-type":
                      source = "n=e;o=e.localName;while((n=n.previousElementSibling)&&n.localName!=o);if(!n){" + source + "}";
                      break;
                    default:
                      emit("'" + expression + "'" + qsInvalid);
                      break;
                  }
                } else if (match2 = selector.match(Patterns.treestruct)) {
                  match2[1] = match2[1].toLowerCase();
                  switch (match2[1]) {
                    case "nth-child":
                    case "nth-of-type":
                    case "nth-last-child":
                    case "nth-last-of-type":
                      expr = /-of-type/i.test(match2[1]);
                      if (match2[1] && match2[2]) {
                        type = /last/i.test(match2[1]);
                        if (match2[2] == "n") {
                          source = "if(true){" + source + "}";
                          break;
                        } else if (match2[2] == "1") {
                          test = type ? "next" : "previous";
                          source = expr ? "n=e;o=e.localName;while((n=n." + test + "ElementSibling)&&n.localName!=o);if(!n){" + source + "}" : "if(!e." + test + "ElementSibling){" + source + "}";
                          break;
                        } else if (match2[2] == "even" || match2[2] == "2n0" || match2[2] == "2n+0" || match2[2] == "2n") {
                          test = "n%2==0";
                        } else if (match2[2] == "odd" || match2[2] == "2n1" || match2[2] == "2n+1") {
                          test = "n%2==1";
                        } else {
                          f = /n/i.test(match2[2]);
                          n = match2[2].split("n");
                          a = parseInt(n[0], 10) || 0;
                          b = parseInt(n[1], 10) || 0;
                          if (n[0] == "-") {
                            a = -1;
                          }
                          if (n[0] == "+") {
                            a = 1;
                          }
                          test = (b ? "(n" + (b > 0 ? "-" : "+") + Math.abs(b) + ")" : "n") + "%" + a + "==0";
                          test = a >= 1 ? f ? "n>" + (b - 1) + (Math.abs(a) != 1 ? "&&" + test : "") : "n==" + a : a <= -1 ? f ? "n<" + (b + 1) + (Math.abs(a) != 1 ? "&&" + test : "") : "n==" + a : a === 0 ? n[0] ? "n==" + b : "n>" + (b - 1) : "false";
                        }
                        expr = expr ? "OfType" : "Element";
                        type = type ? "true" : "false";
                        source = "n=s.nth" + expr + "(e," + type + ");if((" + test + ")){" + source + "}";
                      } else {
                        emit("'" + expression + "'" + qsInvalid);
                      }
                      break;
                    default:
                      emit("'" + expression + "'" + qsInvalid);
                      break;
                  }
                } else if (match2 = selector.match(Patterns.logicalsel)) {
                  match2[1] = match2[1].toLowerCase();
                  expr = match2[2].replace(REX.CommaGroup, ",").replace(REX.TrimSpaces, "").replace(/\x22/g, '\\"');
                  switch (match2[1]) {
                    case "is":
                    case "where":
                      if (Config.FORGIVING) {
                        source = 'try{if(s.match("' + expr + '",e)){' + source + "}}catch(E){}";
                      } else {
                        source = 'if(s.match("' + expr + '",e)){' + source + "}";
                      }
                      break;
                    case "matches":
                      source = 'if(s.match("' + expr + '",e)){' + source + "}";
                      break;
                    case "not":
                      source = 'if(!s.match("' + expr + '",e)){' + source + "}";
                      break;
                    case "has":
                      if (/^\s*(\+|\~)/.test(match2[2])) {
                        source = "if(e.parentElement&&Array.from(e.parentElement" + (/^\s*[+]/.test(match2[2]) ? '.querySelectorAll("*' + expr + '")' : ".children") + ").includes(e.nextElementSibling)){" + source + "}";
                      } else {
                        source = 'if(e.querySelector(":scope ' + expr + '")){' + source + "}";
                      }
                      break;
                    default:
                      emit("'" + expression + "'" + qsInvalid);
                      break;
                  }
                } else if (match2 = selector.match(Patterns.linguistic)) {
                  match2[1] = match2[1].toLowerCase();
                  switch (match2[1]) {
                    case "dir":
                      source = "var p;if(((/" + match2[2] + '/i.test(e.dir))||(p=s.ancestor("[dir]", e))&&(/' + match2[2] + '/i.test(p.dir))||(e.dir==""||e.dir=="auto")&&(' + (match2[2] == "ltr" ? "!" : "") + RTL + ".test(e.textContent)))){" + source + "};";
                      break;
                    case "lang":
                      expr = "(?:^|-)" + match2[2] + "(?:-|$)";
                      source = 'var p;if(((e.isConnected&&(e.lang==""&&(p=s.ancestor("[lang]",e)))&&(p.lang=="' + match2[2] + '")||/' + expr + "/i.test(e.lang)))){" + source + "};";
                      break;
                    default:
                      emit("'" + expression + "'" + qsInvalid);
                      break;
                  }
                } else if (match2 = selector.match(Patterns.locationpc)) {
                  match2[1] = match2[1].toLowerCase();
                  switch (match2[1]) {
                    case "any-link":
                      source = 'if((/^a|area$/i.test(e.localName)&&e.hasAttribute("href")||e.visited)){' + source + "}";
                      break;
                    case "link":
                      source = 'if((/^a|area$/i.test(e.localName)&&e.hasAttribute("href"))){' + source + "}";
                      break;
                    case "visited":
                      source = 'if((/^a|area$/i.test(e.localName)&&e.hasAttribute("href")&&e.visited)){' + source + "}";
                      break;
                    case "target":
                      source = "if(((s.doc.compareDocumentPosition(e)&16)&&s.doc.location.hash&&e.id==s.doc.location.hash.slice(1))){" + source + "}";
                      break;
                    case "defined":
                      source = "n=s.doc.defaultView.customElements.get(e.localName);if(n&&e instanceof n){" + source + "}";
                      break;
                    default:
                      emit("'" + expression + "'" + qsInvalid);
                      break;
                  }
                } else if (match2 = selector.match(Patterns.useraction)) {
                  match2[1] = match2[1].toLowerCase();
                  switch (match2[1]) {
                    case "hover":
                      source = "if(e===s.HOVER){" + source + "}";
                      break;
                    case "active":
                      source = "if(e===s.doc.activeElement){" + source + "}";
                      break;
                    case "focus":
                      source = "if(s.isFocusable(e)){" + source + "}";
                      break;
                    case "focus-visible":
                      source = "if(n=s.isFocusable(e)){if(e!==n){while(e){e=e.parentElement;if(e===n)break;}}}if((e===n||e.autofocus)){" + source + "}";
                      break;
                    case "focus-within":
                      source = "if(n=s.isFocusable(e)){if(n!==e){while(n){n=n.parentElement;if(n===e)break;}}}if((n===e||n.autofocus)){" + source + "}";
                      break;
                    default:
                      emit("'" + expression + "'" + qsInvalid);
                      break;
                  }
                } else if (match2 = selector.match(Patterns.inputstate)) {
                  match2[1] = match2[1].toLowerCase();
                  switch (match2[1]) {
                    case "enabled":
                      source = 'if((("form" in e||/^optgroup$/i.test(e.localName))&&"disabled" in e &&e.disabled===false)){' + source + "}";
                      break;
                    case "disabled":
                      source = 'if((("form" in e||/^optgroup$/i.test(e.localName))&&"disabled" in e)){var x=0,N=[],F=false,L=false;if(!(/^(optgroup|option)$/i.test(e.localName))){n=e.parentElement;while(n){if(n.localName=="fieldset"){N[x++]=n;if(n.disabled===true){F=true;break;}}n=n.parentElement;}for(var x=0;x<N.length;x++){if((n=s.first("legend",N[x]))&&n.contains(e)){L=true;break;}}}if(e.disabled===true||(F&&!L)){' + source + "}}";
                      break;
                    case "read-only":
                      source = 'if((/^textarea$/i.test(e.localName)&&(e.readOnly||e.disabled))||(/^input$/i.test(e.localName)&&("|date|datetime-local|email|month|number|password|search|tel|text|time|url|week|".includes("|"+e.type+"|")?(e.readOnly||e.disabled):true))||(!/^(?:input|textarea)$/i.test(e.localName) && !s.isContentEditable(e))){' + source + "}";
                      break;
                    case "read-write":
                      source = 'if((/^textarea$/i.test(e.localName)&&!e.readOnly&&!e.disabled)||(/^input$/i.test(e.localName)&&"|date|datetime-local|email|month|number|password|search|tel|text|time|url|week|".includes("|"+e.type+"|")&&!e.readOnly&&!e.disabled)||(!/^(?:input|textarea)$/i.test(e.localName) && s.isContentEditable(e))){' + source + "}";
                      break;
                    case "placeholder-shown":
                      source = 'if(((/^input|textarea$/i.test(e.localName))&&e.hasAttribute("placeholder")&&("|textarea|password|number|search|email|text|tel|url|".includes("|"+e.type+"|"))&&(!s.match(":focus",e)))){' + source + "}";
                      break;
                    case "default":
                      source = 'if(("form" in e && e.form)){var x=0;n=[];if(e.type=="image")n=e.form.getElementsByTagName("input");if(e.type=="submit")n=e.form.elements;while(n[x]&&e!==n[x]){if(n[x].type=="image")break;if(n[x].type=="submit")break;x++;}}if((e.form&&(e===n[x]&&"|image|submit|".includes("|"+e.type+"|"))||((/^option$/i.test(e.localName))&&e.defaultSelected)||(("|radio|checkbox|".includes("|"+e.type+"|"))&&e.defaultChecked))){' + source + "}";
                      break;
                    default:
                      emit("'" + expression + "'" + qsInvalid);
                      break;
                  }
                } else if (match2 = selector.match(Patterns.inputvalue)) {
                  match2[1] = match2[1].toLowerCase();
                  switch (match2[1]) {
                    case "checked":
                      source = 'if((/^input$/i.test(e.localName)&&("|radio|checkbox|".includes("|"+e.type+"|")&&e.checked)||(/^option$/i.test(e.localName)&&(e.selected||e.checked)))){' + source + "}";
                      break;
                    case "indeterminate":
                      source = 'if((/^progress$/i.test(e.localName)&&!e.hasAttribute("value"))||(/^input$/i.test(e.localName)&&("checkbox"==e.type&&e.indeterminate)||("radio"==e.type&&e.name&&!s.first("input[name="+e.name+"]:checked",e.form)))){' + source + "}";
                      break;
                    case "required":
                      source = "if((/^input|select|textarea$/i.test(e.localName)&&e.required)){" + source + "}";
                      break;
                    case "optional":
                      source = "if((/^input|select|textarea$/i.test(e.localName)&&!e.required)){" + source + "}";
                      break;
                    case "invalid":
                      source = 'if((((/^form$/i.test(e.localName)&&!e.noValidate)||(e.willValidate&&!e.formNoValidate))&&!e.checkValidity())||(/^fieldset$/i.test(e.localName)&&s.first(":invalid",e))){' + source + "}";
                      break;
                    case "valid":
                      source = 'if((((/^form$/i.test(e.localName)&&!e.noValidate)||(e.willValidate&&!e.formNoValidate))&&e.checkValidity())||(/^fieldset$/i.test(e.localName)&&s.first(":valid",e))){' + source + "}";
                      break;
                    case "in-range":
                      source = 'if((/^input$/i.test(e.localName))&&(e.willValidate&&!e.formNoValidate)&&(!e.validity.rangeUnderflow&&!e.validity.rangeOverflow)&&("|date|datetime-local|month|number|range|time|week|".includes("|"+e.type+"|"))&&("range"==e.type||e.getAttribute("min")||e.getAttribute("max"))){' + source + "}";
                      break;
                    case "out-of-range":
                      source = 'if((/^input$/i.test(e.localName))&&(e.willValidate&&!e.formNoValidate)&&(e.validity.rangeUnderflow||e.validity.rangeOverflow)&&("|date|datetime-local|month|number|range|time|week|".includes("|"+e.type+"|"))&&("range"==e.type||e.getAttribute("min")||e.getAttribute("max"))){' + source + "}";
                      break;
                    default:
                      emit("'" + expression + "'" + qsInvalid);
                      break;
                  }
                } else if (match2 = selector.match(Patterns.rsrc_state)) {
                  match2[1] = match2[1].toLowerCase();
                  switch (match2[1]) {
                    case "playing":
                      source = "if(s.isPlaying(e)){" + source + "}";
                      break;
                    case "paused":
                      source = "if(!s.isPlaying(e)){" + source + "}";
                      break;
                    case "seeking":
                      source = "if(!s.isPlaying(e)){" + source + "}";
                      break;
                    case "buffering":
                      break;
                    case "stalled":
                      break;
                    case "muted":
                      source = 'if(e.localName=="audio"&&e.getAttribute("muted")){' + source + "}";
                      break;
                  }
                } else if (match2 = selector.match(Patterns.pseudo_nop)) {
                  break;
                } else if (match2 = selector.match(Patterns.pseudo_sng)) {
                  source = 'if(e.element&&e.type.toLowerCase()==":' + match2[0].toLowerCase() + '"){e=e.element;' + source + "}";
                } else if (match2 = selector.match(Patterns.pseudo_dbl)) {
                  source = 'if(e.element&&e.type.toLowerCase()=="' + match2[0].toLowerCase() + '"){e=e.element;' + source + "}";
                } else {
                  expr = false;
                  status = false;
                  for (expr in Selectors) {
                    if (match2 = selector.match(Selectors[expr].Expression)) {
                      result = Selectors[expr].Callback(match2, source, mode, callback);
                      if ("match" in result) {
                        match2 = result.match;
                      }
                      vars = result.modvar;
                      if (mode) {
                        vars && S_VARS.indexOf(vars) < 0 && (S_VARS[S_VARS.length] = vars);
                      } else {
                        vars && M_VARS.indexOf(vars) < 0 && (M_VARS[M_VARS.length] = vars);
                      }
                      source = result.source;
                      status = result.status;
                      if (status) {
                        break;
                      }
                    }
                  }
                  if (!status) {
                    if (Config.FORGIVING && selector.match(/(:(?:is|where)\x28)/)) {
                      return "";
                    }
                    emit("unknown pseudo-class selector '" + selector + "'");
                    return "";
                  }
                  if (!expr) {
                    if (Config.FORGIVING && selector.match(/(:(?:is|where)\x28)/)) {
                      return "";
                    }
                    emit("unknown token in selector '" + selector + "'");
                    return "";
                  }
                }
                break;
              default:
                emit("'" + expression + "'" + qsInvalid);
                break selector_recursion_label;
            }
            if (!match2) {
              if (Config.FORGIVING && selector.match(/(:(?:is|where)\x28)/)) {
                return "";
              }
              emit("'" + expression + "'" + qsInvalid);
              return "";
            }
            selector = match2.pop();
          }
        return source;
      }, makeref = function(selectors, element) {
        if (element.nodeType === 9) {
          element = element.documentElement;
        }
        return selectors.replace(
          /:scope/i,
          element.localName + (element.id ? "#" + escape(element.id) : "") + (element.className ? "." + escape(element.classList[0]) : "")
        );
      }, ancestor = function _closest2(selectors, element, callback) {
        parse(selectors, true);
        selectors = makeref(selectors, element);
        while (element) {
          if (match(selectors, element, callback)) break;
          element = element.parentElement;
        }
        return element;
      }, match_assert = function(f, element, callback) {
        for (var i = 0, l = f.length, r = false; l > i; ++i)
          f[i](element, callback, null, false) && (r = true);
        return r;
      }, match_collect = function(selectors, callback) {
        for (var i = 0, l = selectors.length, f = []; l > i; ++i)
          f[i] = compile(selectors[i], false, callback);
        return { factory: f };
      }, parse = function(selectors, type) {
        var parsed;
        if (arguments.length === 0) {
          emit(qsNotArgs, TypeError);
          return Config.VERBOSITY ? void 0 : type ? none : false;
        } else if (arguments[0] === "") {
          emit("''" + qsInvalid);
          return Config.VERBOSITY ? void 0 : type ? none : false;
        }
        if (typeof selectors != "string") {
          selectors = "" + selectors;
        }
        if (/:scope/i.test(selectors)) {
          selectors = makeref(selectors, Snapshot.from);
        }
        parsed = unescape(selectors).replace(/\x00|\\$/g, "�").replace(REX.CombineWSP, " ").replace(REX.PseudosWSP, "$1").replace(REX.TabCharWSP, "	").replace(REX.CommaGroup, ",").replace(REX.TrimSpaces, "");
        if ((selectors = parsed.match(reValidator)) && selectors.join("") == parsed) {
          selectors = parsed.match(REX.SplitGroup);
          if (parsed[parsed.length - 1] == ",") {
            emit(qsInvalid);
            return Config.VERBOSITY ? void 0 : type ? none : false;
          }
        } else {
          if (Config.FORGIVING) {
            if (!(parsed.includes(":is(") || parsed.includes(":where("))) {
              emit("'" + selectors + "'" + qsInvalid);
              return Config.VERBOSITY ? void 0 : type ? none : false;
            }
          }
        }
        return selectors;
      }, match = function _matches2(selectors, element, callback) {
        if (element && matchResolvers[selectors]) {
          return match_assert(matchResolvers[selectors].factory, element, callback);
        }
        matchResolvers[selectors] = match_collect(parse(selectors, false), callback);
        return match_assert(matchResolvers[selectors].factory, element, callback);
      }, first = function _querySelector2(selectors, context, callback) {
        return select(
          selectors,
          context,
          typeof callback == "function" ? function firstMatch(element) {
            callback(element);
            return false;
          } : function firstMatch() {
            return false;
          }
        )[0] || null;
      }, select = function _querySelectorAll(selectors, context, callback) {
        var nodes = [], resolver;
        arguments.length == 0 && emit(qsNotArgs, TypeError);
        context || (context = doc);
        lastContext !== context && (lastContext = switchContext(context));
        if (selectors) {
          if (resolver = selectResolvers[selectors]) {
            if (resolver.context === context && resolver.callback === callback) {
              var i, l, list, f = resolver.factory, h = resolver.htmlset, n = resolver.nodeset;
              if (n.length > 1) {
                for (i = 0, l = n.length; l > i; ++i) {
                  list = compat[n[i][0]](context, n[i].slice(1))();
                  if (f[i] !== null) {
                    f[i](list, callback, context, nodes);
                  } else {
                    nodes = nodes.concat(list);
                  }
                }
                if (l > 1 && nodes.length > 1) {
                  nodes.sort(documentOrder);
                  hasDupes && (nodes = unique(nodes));
                }
              } else {
                if (f[0]) {
                  nodes = f[0](h[0](), callback, context, nodes);
                } else {
                  nodes = h[0]();
                }
              }
              if (typeof callback == "function") {
                nodes = concatCall(nodes, callback);
              }
              return !Config.NODE_LIST ? nodes : isInstanceOf(nodes) ? nodes : toNodeList(nodes);
            }
          }
        }
        selectResolvers[selectors] = collect(parse(selectors, true), context, callback);
        nodes = selectResolvers[selectors].results;
        if (typeof callback == "function") {
          nodes = concatCall(nodes, callback);
        }
        return !Config.NODE_LIST ? nodes : isInstanceOf(nodes) ? nodes : toNodeList(nodes);
      }, optimize = function(selector, token) {
        var index = token.index, length = token[1].length + token[2].length;
        return selector.slice(0, index) + (" >+~".indexOf(selector.charAt(index - 1)) > -1 ? ":[".indexOf(selector.charAt(index + length + 1)) > -1 ? "*" : "" : "") + selector.slice(index + length - (token[1] == "*" ? 1 : 0));
      }, collect = function(selectors, context, callback) {
        var i, l, seen = {}, token = ["", "*", "*"], optimized = selectors, factory = [], htmlset = [], nodeset = [], results = [], type;
        for (i = 0, l = selectors.length; l > i; ++i) {
          if (!seen[selectors[i]] && (seen[selectors[i]] = true)) {
            type = selectors[i].match(reOptimizer);
            if (type && type[1] != ":" && (token = type)) {
              token[1] || (token[1] = "*");
              optimized[i] = optimize(optimized[i], token);
            } else {
              token = ["", "*", "*"];
            }
          }
          nodeset[i] = token[1] + token[2];
          token[2] = unescapeIdentifier(token[2]);
          htmlset[i] = compat[token[1]](context, token[2]);
          factory[i] = compile(optimized[i], true, null);
          factory[i] ? factory[i](htmlset[i](), callback, context, results) : results.concat(htmlset[i]());
        }
        if (l > 1) {
          results.sort(documentOrder);
          hasDupes && (results = unique(results));
        }
        return {
          callback,
          context,
          factory,
          htmlset,
          nodeset,
          results
        };
      };
      (function() {
        doc.addEventListener("mouseover", function(e) {
          Snapshot.HOVER = e.target;
        }, true);
        doc.addEventListener("mouseout", function(e) {
          Snapshot.HOVER = null;
        }, true);
      })();
      var _closest, _matches, _querySelector, _querySelectorDoc, _querySelectorAllDoc, install = function(all) {
        _closest = Element.prototype.closest;
        _matches = Element.prototype.matches;
        _querySelector = Element.prototype.querySelector;
        _querySelectorDoc = Document.prototype.querySelector;
        _querySelectorAllDoc = Document.prototype.querySelectorAll;
        function parseQSArgs() {
          var method2 = arguments[arguments.length - 1];
          return arguments.length < 2 ? method2.apply(this, []) : arguments.length < 3 ? method2.apply(this, [arguments[0], this]) : method2.apply(this, [
            arguments[0],
            this,
            typeof arguments[1] == "function" ? arguments[1] : void 0
          ]);
        }
        Element.prototype.closest = HTMLElement.prototype.closest = function closest() {
          return parseQSArgs.apply(this, [].slice.call(arguments).concat(ancestor));
        };
        Element.prototype.matches = HTMLElement.prototype.matches = function matches() {
          return parseQSArgs.apply(this, [].slice.call(arguments).concat(match));
        };
        Element.prototype.querySelector = HTMLElement.prototype.querySelector = function querySelector() {
          return parseQSArgs.apply(this, [].slice.call(arguments).concat(first));
        };
        Element.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll = function querySelectorAll() {
          return parseQSArgs.apply(this, [].slice.call(arguments).concat(select));
        };
        Document.prototype.querySelector = DocumentFragment.prototype.querySelector = function querySelector() {
          return parseQSArgs.apply(this, [].slice.call(arguments).concat(first));
        };
        Document.prototype.querySelectorAll = DocumentFragment.prototype.querySelectorAll = function querySelectorAll() {
          return parseQSArgs.apply(this, [].slice.call(arguments).concat(select));
        };
        if (all) {
          doc.addEventListener("load", function(e) {
            var c, d, r, s, t = e.target;
            if (/iframe/i.test(t.localName)) {
              c = "(" + Export + ")(this, " + Factory + ");";
              d = t.ownerDocument;
              s = d.createElement("script");
              s.textContent = c + "NW.Dom.install(true)";
              r = d.documentElement;
              r.removeChild(r.insertBefore(s, r.firstChild));
            }
          }, true);
        }
      }, uninstall = function() {
        if (_closest) {
          Element.prototype.closest = _closest;
          HTMLElement.prototype.closest = _closest;
        }
        if (_matches) {
          Element.prototype.matches = _matches;
          HTMLElement.prototype.matches = _matches;
        }
        if (_querySelector) {
          Element.prototype.querySelector = HTMLElement.prototype.querySelector = _querySelector;
          Element.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll = _querySelector;
        }
        if (_querySelectorAllDoc) {
          Document.prototype.querySelector = DocumentFragment.prototype.querySelector = _querySelectorDoc;
          Document.prototype.querySelectorAll = DocumentFragment.prototype.querySelectorAll = _querySelectorAllDoc;
        }
      }, none = Array(), lastContext, matchLambdas = {}, selectLambdas = {}, matchResolvers = {}, selectResolvers = {}, Snapshot = {
        doc,
        from: doc,
        root,
        byTag,
        first,
        match,
        ancestor,
        nthOfType,
        nthElement,
        isFocusable,
        isContentEditable,
        hasAttributeNS
      }, Dom = {
        // exported cache objects
        matchLambdas,
        selectLambdas,
        matchResolvers,
        selectResolvers,
        // exported compiler macros
        CFG,
        S_BODY,
        M_BODY,
        N_BODY: M_BODY,
        S_TEST,
        M_TEST,
        N_TEST,
        // exported engine methods
        byId,
        byTag,
        byClass,
        match,
        first,
        select,
        closest: ancestor,
        compile,
        configure,
        emit,
        Config,
        Snapshot,
        Version: version,
        install,
        uninstall,
        Operators,
        Selectors,
        // register a new selector combinator symbol and its related function resolver
        registerCombinator: function(combinator, resolver) {
          var i = 0, l = combinator.length, symbol;
          for (; l > i; ++i) {
            if (combinator[i] != "=") {
              symbol = combinator[i];
              break;
            }
          }
          if (CFG.combinators.indexOf(symbol) < 0) {
            CFG.combinators = CFG.combinators.replace("](", symbol + "](");
            CFG.combinators = CFG.combinators.replace("])", symbol + "])");
            Combinators[combinator] = resolver;
            setIdentifierSyntax();
          } else {
            console.warn("Warning: the '" + combinator + "' combinator is already registered.");
          }
        },
        // register a new attribute operator symbol and its related function resolver
        registerOperator: function(operator, resolver) {
          var i = 0, l = operator.length, symbol;
          for (; l > i; ++i) {
            if (operator[i] != "=") {
              symbol = operator[i];
              break;
            }
          }
          if (CFG.operators.indexOf(symbol) < 0 && !Operators[operator]) {
            CFG.operators = CFG.operators.replace("]=", symbol + "]=");
            Operators[operator] = resolver;
            setIdentifierSyntax();
          } else {
            console.warn("Warning: the '" + operator + "' operator is already registered.");
          }
        },
        // register a new selector symbol and its related function resolver
        registerSelector: function(name, rexp, func) {
          Selectors[name] || (Selectors[name] = {
            Expression: rexp,
            Callback: func
          });
        }
      };
      initialize(doc);
      return Dom;
    });
  })(nwsapi$1);
  return nwsapi$1.exports;
}
export {
  requireNwsapi as r
};
