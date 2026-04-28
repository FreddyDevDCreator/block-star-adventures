import require$$1 from "tls";
import require$$5 from "url";
import require$$0 from "net";
import { r as requireSrc } from "./debug.mjs";
import require$$0$1 from "events";
import { r as requireDist$1 } from "./agent-base.mjs";
var dist = {};
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  var __createBinding = dist && dist.__createBinding || (Object.create ? (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  }));
  var __setModuleDefault = dist && dist.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = dist && dist.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __importDefault = dist && dist.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(dist, "__esModule", { value: true });
  dist.HttpProxyAgent = void 0;
  const net = __importStar(require$$0);
  const tls = __importStar(require$$1);
  const debug_1 = __importDefault(requireSrc());
  const events_1 = require$$0$1;
  const agent_base_1 = requireDist$1();
  const url_1 = require$$5;
  const debug = (0, debug_1.default)("http-proxy-agent");
  class HttpProxyAgent extends agent_base_1.Agent {
    constructor(proxy, opts) {
      super(opts);
      this.proxy = typeof proxy === "string" ? new url_1.URL(proxy) : proxy;
      this.proxyHeaders = opts?.headers ?? {};
      debug("Creating new HttpProxyAgent instance: %o", this.proxy.href);
      const host = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, "");
      const port = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
      this.connectOpts = {
        ...opts ? omit(opts, "headers") : null,
        host,
        port
      };
    }
    addRequest(req, opts) {
      req._header = null;
      this.setRequestProps(req, opts);
      super.addRequest(req, opts);
    }
    setRequestProps(req, opts) {
      const { proxy } = this;
      const protocol = opts.secureEndpoint ? "https:" : "http:";
      const hostname = req.getHeader("host") || "localhost";
      const base = `${protocol}//${hostname}`;
      const url = new url_1.URL(req.path, base);
      if (opts.port !== 80) {
        url.port = String(opts.port);
      }
      req.path = String(url);
      const headers = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : { ...this.proxyHeaders };
      if (proxy.username || proxy.password) {
        const auth = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
        headers["Proxy-Authorization"] = `Basic ${Buffer.from(auth).toString("base64")}`;
      }
      if (!headers["Proxy-Connection"]) {
        headers["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
      }
      for (const name of Object.keys(headers)) {
        const value = headers[name];
        if (value) {
          req.setHeader(name, value);
        }
      }
    }
    async connect(req, opts) {
      req._header = null;
      if (!req.path.includes("://")) {
        this.setRequestProps(req, opts);
      }
      let first;
      let endOfHeaders;
      debug("Regenerating stored HTTP header string for request");
      req._implicitHeader();
      if (req.outputData && req.outputData.length > 0) {
        debug("Patching connection write() output buffer with updated header");
        first = req.outputData[0].data;
        endOfHeaders = first.indexOf("\r\n\r\n") + 4;
        req.outputData[0].data = req._header + first.substring(endOfHeaders);
        debug("Output buffer: %o", req.outputData[0].data);
      }
      let socket;
      if (this.proxy.protocol === "https:") {
        debug("Creating `tls.Socket`: %o", this.connectOpts);
        socket = tls.connect(this.connectOpts);
      } else {
        debug("Creating `net.Socket`: %o", this.connectOpts);
        socket = net.connect(this.connectOpts);
      }
      await (0, events_1.once)(socket, "connect");
      return socket;
    }
  }
  HttpProxyAgent.protocols = ["http", "https"];
  dist.HttpProxyAgent = HttpProxyAgent;
  function omit(obj, ...keys) {
    const ret = {};
    let key;
    for (key in obj) {
      if (!keys.includes(key)) {
        ret[key] = obj[key];
      }
    }
    return ret;
  }
  return dist;
}
export {
  requireDist as r
};
