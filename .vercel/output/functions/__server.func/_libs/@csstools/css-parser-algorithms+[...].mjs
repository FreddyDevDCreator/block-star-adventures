import { r as requireDist$1 } from "../csstools__css-tokenizer.mjs";
var dist = {};
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  (function(exports$1) {
    var e, n = requireDist$1();
    function walkerIndexGenerator(e2) {
      let n2 = e2.slice();
      return (e3, o, t) => {
        let s = -1;
        for (let i = n2.indexOf(o); i < n2.length && (s = e3.indexOf(n2[i]), -1 === s || s < t); i++) ;
        return -1 === s || s === t && o === e3[t] && (s++, s >= e3.length) ? -1 : (n2 = e3.slice(), s);
      };
    }
    function consumeComponentValue(e2, o) {
      const t = o[0];
      if (n.isTokenOpenParen(t) || n.isTokenOpenCurly(t) || n.isTokenOpenSquare(t)) {
        const n2 = consumeSimpleBlock(e2, o);
        return { advance: n2.advance, node: n2.node };
      }
      if (n.isTokenFunction(t)) {
        const n2 = consumeFunction(e2, o);
        return { advance: n2.advance, node: n2.node };
      }
      if (n.isTokenWhitespace(t)) {
        const n2 = consumeWhitespace(e2, o);
        return { advance: n2.advance, node: n2.node };
      }
      if (n.isTokenComment(t)) {
        const n2 = consumeComment(e2, o);
        return { advance: n2.advance, node: n2.node };
      }
      return { advance: 1, node: new TokenNode(t) };
    }
    exports$1.ComponentValueType = void 0, (e = exports$1.ComponentValueType || (exports$1.ComponentValueType = {})).Function = "function", e.SimpleBlock = "simple-block", e.Whitespace = "whitespace", e.Comment = "comment", e.Token = "token";
    class ContainerNodeBaseClass {
      value = [];
      indexOf(e2) {
        return this.value.indexOf(e2);
      }
      at(e2) {
        if ("number" == typeof e2) return e2 < 0 && (e2 = this.value.length + e2), this.value[e2];
      }
      forEach(e2, n2) {
        if (0 === this.value.length) return;
        const o = walkerIndexGenerator(this.value);
        let t = 0;
        for (; t < this.value.length; ) {
          const s = this.value[t];
          let i;
          if (n2 && (i = { ...n2 }), false === e2({ node: s, parent: this, state: i }, t)) return false;
          if (t = o(this.value, s, t), -1 === t) break;
        }
      }
      walk(e2, n2) {
        0 !== this.value.length && this.forEach(((n3, o) => false !== e2(n3, o) && ((!("walk" in n3.node) || !this.value.includes(n3.node) || false !== n3.node.walk(e2, n3.state)) && void 0)), n2);
      }
    }
    class FunctionNode extends ContainerNodeBaseClass {
      type = exports$1.ComponentValueType.Function;
      name;
      endToken;
      constructor(e2, n2, o) {
        super(), this.name = e2, this.endToken = n2, this.value = o;
      }
      getName() {
        return this.name[4].value;
      }
      normalize() {
        n.isTokenEOF(this.endToken) && (this.endToken = [n.TokenType.CloseParen, ")", -1, -1, void 0]);
      }
      tokens() {
        return n.isTokenEOF(this.endToken) ? [this.name, ...this.value.flatMap(((e2) => e2.tokens()))] : [this.name, ...this.value.flatMap(((e2) => e2.tokens())), this.endToken];
      }
      toString() {
        const e2 = this.value.map(((e3) => n.isToken(e3) ? n.stringify(e3) : e3.toString())).join("");
        return n.stringify(this.name) + e2 + n.stringify(this.endToken);
      }
      toJSON() {
        return { type: this.type, name: this.getName(), tokens: this.tokens(), value: this.value.map(((e2) => e2.toJSON())) };
      }
      isFunctionNode() {
        return FunctionNode.isFunctionNode(this);
      }
      static isFunctionNode(e2) {
        return !!e2 && (e2 instanceof FunctionNode && e2.type === exports$1.ComponentValueType.Function);
      }
    }
    function consumeFunction(e2, o) {
      const t = [];
      let s = 1;
      for (; ; ) {
        const i = o[s];
        if (!i || n.isTokenEOF(i)) return e2.onParseError(new n.ParseError("Unexpected EOF while consuming a function.", o[0][2], o[o.length - 1][3], ["5.4.9. Consume a function", "Unexpected EOF"])), { advance: o.length, node: new FunctionNode(o[0], i, t) };
        if (n.isTokenCloseParen(i)) return { advance: s + 1, node: new FunctionNode(o[0], i, t) };
        if (n.isTokenWhiteSpaceOrComment(i)) {
          const n2 = consumeAllCommentsAndWhitespace(e2, o.slice(s));
          s += n2.advance, t.push(...n2.nodes);
          continue;
        }
        const r = consumeComponentValue(e2, o.slice(s));
        s += r.advance, t.push(r.node);
      }
    }
    class SimpleBlockNode extends ContainerNodeBaseClass {
      type = exports$1.ComponentValueType.SimpleBlock;
      startToken;
      endToken;
      constructor(e2, n2, o) {
        super(), this.startToken = e2, this.endToken = n2, this.value = o;
      }
      normalize() {
        if (n.isTokenEOF(this.endToken)) {
          const e2 = n.mirrorVariant(this.startToken);
          e2 && (this.endToken = e2);
        }
      }
      tokens() {
        return n.isTokenEOF(this.endToken) ? [this.startToken, ...this.value.flatMap(((e2) => e2.tokens()))] : [this.startToken, ...this.value.flatMap(((e2) => e2.tokens())), this.endToken];
      }
      toString() {
        const e2 = this.value.map(((e3) => n.isToken(e3) ? n.stringify(e3) : e3.toString())).join("");
        return n.stringify(this.startToken) + e2 + n.stringify(this.endToken);
      }
      toJSON() {
        return { type: this.type, startToken: this.startToken, tokens: this.tokens(), value: this.value.map(((e2) => e2.toJSON())) };
      }
      isSimpleBlockNode() {
        return SimpleBlockNode.isSimpleBlockNode(this);
      }
      static isSimpleBlockNode(e2) {
        return !!e2 && (e2 instanceof SimpleBlockNode && e2.type === exports$1.ComponentValueType.SimpleBlock);
      }
    }
    function consumeSimpleBlock(e2, o) {
      const t = n.mirrorVariantType(o[0][0]);
      if (!t) throw new Error("Failed to parse, a mirror variant must exist for all block open tokens.");
      const s = [];
      let i = 1;
      for (; ; ) {
        const r = o[i];
        if (!r || n.isTokenEOF(r)) return e2.onParseError(new n.ParseError("Unexpected EOF while consuming a simple block.", o[0][2], o[o.length - 1][3], ["5.4.8. Consume a simple block", "Unexpected EOF"])), { advance: o.length, node: new SimpleBlockNode(o[0], r, s) };
        if (r[0] === t) return { advance: i + 1, node: new SimpleBlockNode(o[0], r, s) };
        if (n.isTokenWhiteSpaceOrComment(r)) {
          const n2 = consumeAllCommentsAndWhitespace(e2, o.slice(i));
          i += n2.advance, s.push(...n2.nodes);
          continue;
        }
        const a = consumeComponentValue(e2, o.slice(i));
        i += a.advance, s.push(a.node);
      }
    }
    class WhitespaceNode {
      type = exports$1.ComponentValueType.Whitespace;
      value;
      constructor(e2) {
        this.value = e2;
      }
      tokens() {
        return this.value;
      }
      toString() {
        return n.stringify(...this.value);
      }
      toJSON() {
        return { type: this.type, tokens: this.tokens() };
      }
      isWhitespaceNode() {
        return WhitespaceNode.isWhitespaceNode(this);
      }
      static isWhitespaceNode(e2) {
        return !!e2 && (e2 instanceof WhitespaceNode && e2.type === exports$1.ComponentValueType.Whitespace);
      }
    }
    function consumeWhitespace(e2, o) {
      let t = 0;
      for (; ; ) {
        const e3 = o[t];
        if (!n.isTokenWhitespace(e3)) return { advance: t, node: new WhitespaceNode(o.slice(0, t)) };
        t++;
      }
    }
    class CommentNode {
      type = exports$1.ComponentValueType.Comment;
      value;
      constructor(e2) {
        this.value = e2;
      }
      tokens() {
        return [this.value];
      }
      toString() {
        return n.stringify(this.value);
      }
      toJSON() {
        return { type: this.type, tokens: this.tokens() };
      }
      isCommentNode() {
        return CommentNode.isCommentNode(this);
      }
      static isCommentNode(e2) {
        return !!e2 && (e2 instanceof CommentNode && e2.type === exports$1.ComponentValueType.Comment);
      }
    }
    function consumeComment(e2, n2) {
      return { advance: 1, node: new CommentNode(n2[0]) };
    }
    function consumeAllCommentsAndWhitespace(e2, o) {
      const t = [];
      let s = 0;
      for (; ; ) if (n.isTokenWhitespace(o[s])) {
        const e3 = consumeWhitespace(0, o.slice(s));
        s += e3.advance, t.push(e3.node);
      } else {
        if (!n.isTokenComment(o[s])) return { advance: s, nodes: t };
        t.push(new CommentNode(o[s])), s++;
      }
    }
    class TokenNode {
      type = exports$1.ComponentValueType.Token;
      value;
      constructor(e2) {
        this.value = e2;
      }
      tokens() {
        return [this.value];
      }
      toString() {
        return this.value[1];
      }
      toJSON() {
        return { type: this.type, tokens: this.tokens() };
      }
      isTokenNode() {
        return TokenNode.isTokenNode(this);
      }
      static isTokenNode(e2) {
        return !!e2 && (e2 instanceof TokenNode && e2.type === exports$1.ComponentValueType.Token);
      }
    }
    function forEach(e2, n2, o) {
      if (0 === e2.length) return;
      const t = walkerIndexGenerator(e2);
      let s = 0;
      for (; s < e2.length; ) {
        const i = e2[s];
        let r;
        if (o && (r = { ...o }), false === n2({ node: i, parent: { value: e2 }, state: r }, s)) return false;
        if (s = t(e2, i, s), -1 === s) break;
      }
    }
    function walk(e2, n2, o) {
      0 !== e2.length && forEach(e2, ((o2, t) => false !== n2(o2, t) && ((!("walk" in o2.node) || !e2.includes(o2.node) || false !== o2.node.walk(n2, o2.state)) && void 0)), o);
    }
    function isWhitespaceNode(e2) {
      return WhitespaceNode.isWhitespaceNode(e2);
    }
    function isCommentNode(e2) {
      return CommentNode.isCommentNode(e2);
    }
    exports$1.CommentNode = CommentNode, exports$1.ContainerNodeBaseClass = ContainerNodeBaseClass, exports$1.FunctionNode = FunctionNode, exports$1.SimpleBlockNode = SimpleBlockNode, exports$1.TokenNode = TokenNode, exports$1.WhitespaceNode = WhitespaceNode, exports$1.forEach = forEach, exports$1.gatherNodeAncestry = function gatherNodeAncestry(e2) {
      const n2 = /* @__PURE__ */ new Map();
      return e2.walk(((e3) => {
        Array.isArray(e3.node) ? e3.node.forEach(((o) => {
          n2.set(o, e3.parent);
        })) : n2.set(e3.node, e3.parent);
      })), n2;
    }, exports$1.isCommentNode = isCommentNode, exports$1.isFunctionNode = function isFunctionNode(e2) {
      return FunctionNode.isFunctionNode(e2);
    }, exports$1.isSimpleBlockNode = function isSimpleBlockNode(e2) {
      return SimpleBlockNode.isSimpleBlockNode(e2);
    }, exports$1.isTokenNode = function isTokenNode(e2) {
      return TokenNode.isTokenNode(e2);
    }, exports$1.isWhiteSpaceOrCommentNode = function isWhiteSpaceOrCommentNode(e2) {
      return isWhitespaceNode(e2) || isCommentNode(e2);
    }, exports$1.isWhitespaceNode = isWhitespaceNode, exports$1.parseCommaSeparatedListOfComponentValues = function parseCommaSeparatedListOfComponentValues(e2, o) {
      const t = { onParseError: o?.onParseError ?? (() => {
      }) }, s = [...e2];
      if (0 === e2.length) return [];
      n.isTokenEOF(s[s.length - 1]) && s.push([n.TokenType.EOF, "", s[s.length - 1][2], s[s.length - 1][3], void 0]);
      const i = [];
      let r = [], a = 0;
      for (; ; ) {
        if (!s[a] || n.isTokenEOF(s[a])) return r.length && i.push(r), i;
        if (n.isTokenComma(s[a])) {
          i.push(r), r = [], a++;
          continue;
        }
        const o2 = consumeComponentValue(t, e2.slice(a));
        r.push(o2.node), a += o2.advance;
      }
    }, exports$1.parseComponentValue = function parseComponentValue(e2, o) {
      const t = { onParseError: o?.onParseError ?? (() => {
      }) }, s = [...e2];
      n.isTokenEOF(s[s.length - 1]) && s.push([n.TokenType.EOF, "", s[s.length - 1][2], s[s.length - 1][3], void 0]);
      const i = consumeComponentValue(t, s);
      if (n.isTokenEOF(s[Math.min(i.advance, s.length - 1)])) return i.node;
      t.onParseError(new n.ParseError("Expected EOF after parsing a component value.", e2[0][2], e2[e2.length - 1][3], ["5.3.9. Parse a component value", "Expected EOF"]));
    }, exports$1.parseListOfComponentValues = function parseListOfComponentValues(e2, o) {
      const t = { onParseError: o?.onParseError ?? (() => {
      }) }, s = [...e2];
      n.isTokenEOF(s[s.length - 1]) && s.push([n.TokenType.EOF, "", s[s.length - 1][2], s[s.length - 1][3], void 0]);
      const i = [];
      let r = 0;
      for (; ; ) {
        if (!s[r] || n.isTokenEOF(s[r])) return i;
        const e3 = consumeComponentValue(t, s.slice(r));
        i.push(e3.node), r += e3.advance;
      }
    }, exports$1.replaceComponentValues = function replaceComponentValues(e2, n2) {
      for (let o = 0; o < e2.length; o++) {
        walk(e2[o], ((e3, o2) => {
          if ("number" != typeof o2) return;
          const t = n2(e3.node);
          t && (Array.isArray(t) ? e3.parent.value.splice(o2, 1, ...t) : e3.parent.value.splice(o2, 1, t));
        }));
      }
      return e2;
    }, exports$1.sourceIndices = function sourceIndices(e2) {
      if (Array.isArray(e2)) {
        const n3 = e2[0];
        if (!n3) return [0, 0];
        const o2 = e2[e2.length - 1] || n3;
        return [sourceIndices(n3)[0], sourceIndices(o2)[1]];
      }
      const n2 = e2.tokens(), o = n2[0], t = n2[n2.length - 1];
      return o && t ? [o[2], t[3]] : [0, 0];
    }, exports$1.stringify = function stringify(e2) {
      return e2.map(((e3) => e3.map(((e4) => n.stringify(...e4.tokens()))).join(""))).join(",");
    }, exports$1.walk = walk, exports$1.walkerIndexGenerator = walkerIndexGenerator;
  })(dist);
  return dist;
}
export {
  requireDist as r
};
