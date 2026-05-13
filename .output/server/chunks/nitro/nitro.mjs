import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { betterAuth } from 'better-auth';
import { phoneNumber } from 'better-auth/plugins';
import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { getIcons } from '@iconify/utils';
import { consola } from 'consola';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c$1=class c{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c$1.prototype,i$1.prototype),Object.assign(c$1.prototype,l$1.prototype),c$1}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}
function toWebRequest(event) {
  return event.web?.request || new Request(getRequestURL(event), {
    // @ts-ignore Undici option
    duplex: "half",
    method: event.method,
    headers: event.headers,
    body: getRequestWebStream(event)
  });
}
function getRequestIP(event, opts = {}) {
  if (event.context.clientAddress) {
    return event.context.clientAddress;
  }
  if (opts.xForwardedFor) {
    const xForwardedFor = getRequestHeader(event, "x-forwarded-for")?.split(",").shift()?.trim();
    if (xForwardedFor) {
      return xForwardedFor;
    }
  }
  if (event.node.req.socket.remoteAddress) {
    return event.node.req.socket.remoteAddress;
  }
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = _decodePath(event._path || event.node.req.url || "/");
    event._path = _reqPath;
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function _decodePath(url) {
  const qIndex = url.indexOf("?");
  const path = qIndex === -1 ? url : url.slice(0, qIndex);
  const query = qIndex === -1 ? "" : url.slice(qIndex);
  const decodedPath = path.includes("%25") ? decodePath(path.replace(/%25/g, "%2525")) : decodePath(path);
  return decodedPath + query;
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$1=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch$1 = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch({ fetch: fetch$1, Headers: Headers$1, AbortController });
const $fetch$1 = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function serialize$1(o){return typeof o=="string"?`'${o}'`:new c().serialize(o)}const c=/*@__PURE__*/function(){class o{#t=new Map;compare(t,r){const e=typeof t,n=typeof r;return e==="string"&&n==="string"?t.localeCompare(r):e==="number"&&n==="number"?t-r:String.prototype.localeCompare.call(this.serialize(t,true),this.serialize(r,true))}serialize(t,r){if(t===null)return "null";switch(typeof t){case "string":return r?t:`'${t}'`;case "bigint":return `${t}n`;case "object":return this.$object(t);case "function":return this.$function(t)}return String(t)}serializeObject(t){const r=Object.prototype.toString.call(t);if(r!=="[object Object]")return this.serializeBuiltInType(r.length<10?`unknown:${r}`:r.slice(8,-1),t);const e=t.constructor,n=e===Object||e===void 0?"":e.name;if(n!==""&&globalThis[n]===e)return this.serializeBuiltInType(n,t);if(typeof t.toJSON=="function"){const i=t.toJSON();return n+(i!==null&&typeof i=="object"?this.$object(i):`(${this.serialize(i)})`)}return this.serializeObjectEntries(n,Object.entries(t))}serializeBuiltInType(t,r){const e=this["$"+t];if(e)return e.call(this,r);if(typeof r?.entries=="function")return this.serializeObjectEntries(t,r.entries());throw new Error(`Cannot serialize ${t}`)}serializeObjectEntries(t,r){const e=Array.from(r).sort((i,a)=>this.compare(i[0],a[0]));let n=`${t}{`;for(let i=0;i<e.length;i++){const[a,l]=e[i];n+=`${this.serialize(a,true)}:${this.serialize(l)}`,i<e.length-1&&(n+=",");}return n+"}"}$object(t){let r=this.#t.get(t);return r===void 0&&(this.#t.set(t,`#${this.#t.size}`),r=this.serializeObject(t),this.#t.set(t,r)),r}$function(t){const r=Function.prototype.toString.call(t);return r.slice(-15)==="[native code] }"?`${t.name||""}()[native]`:`${t.name}(${t.length})${r.replace(/\s*\n\s*/g,"")}`}$Array(t){let r="[";for(let e=0;e<t.length;e++)r+=this.serialize(t[e]),e<t.length-1&&(r+=",");return r+"]"}$Date(t){try{return `Date(${t.toISOString()})`}catch{return "Date(null)"}}$ArrayBuffer(t){return `ArrayBuffer[${new Uint8Array(t).join(",")}]`}$Set(t){return `Set${this.$Array(Array.from(t).sort((r,e)=>this.compare(r,e)))}`}$Map(t){return this.serializeObjectEntries("Map",t.entries())}}for(const s of ["Error","RegExp","URL"])o.prototype["$"+s]=function(t){return `${s}(${t})`};for(const s of ["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join(",")}]`};for(const s of ["BigInt64Array","BigUint64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join("n,")}${t.length>0?"n":""}]`};return o}();

function isEqual(object1, object2) {
  if (object1 === object2) {
    return true;
  }
  if (serialize$1(object1) === serialize$1(object2)) {
    return true;
  }
  return false;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

function hash$1(input) {
  return digest(serialize$1(input));
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  ui: {
    colors: {
      primary: "violet",
      neutral: "slate"
    }
  }
});

const inlineAppConfig = {
  "nuxt": {},
  "ui": {
    "colors": {
      "primary": "green",
      "secondary": "blue",
      "success": "green",
      "info": "blue",
      "warning": "yellow",
      "error": "red",
      "neutral": "slate"
    },
    "icons": {
      "arrowDown": "i-lucide-arrow-down",
      "arrowLeft": "i-lucide-arrow-left",
      "arrowRight": "i-lucide-arrow-right",
      "arrowUp": "i-lucide-arrow-up",
      "caution": "i-lucide-circle-alert",
      "check": "i-lucide-check",
      "chevronDoubleLeft": "i-lucide-chevrons-left",
      "chevronDoubleRight": "i-lucide-chevrons-right",
      "chevronDown": "i-lucide-chevron-down",
      "chevronLeft": "i-lucide-chevron-left",
      "chevronRight": "i-lucide-chevron-right",
      "chevronUp": "i-lucide-chevron-up",
      "close": "i-lucide-x",
      "copy": "i-lucide-copy",
      "copyCheck": "i-lucide-copy-check",
      "dark": "i-lucide-moon",
      "drag": "i-lucide-grip-vertical",
      "ellipsis": "i-lucide-ellipsis",
      "error": "i-lucide-circle-x",
      "external": "i-lucide-arrow-up-right",
      "eye": "i-lucide-eye",
      "eyeOff": "i-lucide-eye-off",
      "file": "i-lucide-file",
      "folder": "i-lucide-folder",
      "folderOpen": "i-lucide-folder-open",
      "hash": "i-lucide-hash",
      "info": "i-lucide-info",
      "light": "i-lucide-sun",
      "loading": "i-lucide-loader-circle",
      "menu": "i-lucide-menu",
      "minus": "i-lucide-minus",
      "panelClose": "i-lucide-panel-left-close",
      "panelOpen": "i-lucide-panel-left-open",
      "plus": "i-lucide-plus",
      "reload": "i-lucide-rotate-ccw",
      "search": "i-lucide-search",
      "stop": "i-lucide-square",
      "success": "i-lucide-circle-check",
      "system": "i-lucide-monitor",
      "tip": "i-lucide-lightbulb",
      "upload": "i-lucide-upload",
      "warning": "i-lucide-triangle-alert"
    },
    "tv": {
      "twMergeConfig": {}
    }
  },
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "cssLayer": "base",
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codex",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "cuida",
      "dashicons",
      "devicon",
      "devicon-plain",
      "dinkie-icons",
      "duo-icons",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fa7-brands",
      "fa7-regular",
      "fa7-solid",
      "fad",
      "famicons",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-color",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "garden",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "ix",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "lineicons",
      "logos",
      "ls",
      "lsicon",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-icon-theme",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "meteor-icons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "nrk",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "picon",
      "pixel",
      "pixelarticons",
      "prime",
      "proicons",
      "ps",
      "qlementine-icons",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "roentgen",
      "si",
      "si-glyph",
      "sidekickicons",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "stash",
      "streamline",
      "streamline-block",
      "streamline-color",
      "streamline-cyber",
      "streamline-cyber-color",
      "streamline-emojis",
      "streamline-flex",
      "streamline-flex-color",
      "streamline-freehand",
      "streamline-freehand-color",
      "streamline-kameleon-color",
      "streamline-logos",
      "streamline-pixel",
      "streamline-plump",
      "streamline-plump-color",
      "streamline-sharp",
      "streamline-sharp-color",
      "streamline-stickies-color",
      "streamline-ultimate",
      "streamline-ultimate-color",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "temaki",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  }
};

const appConfig = defuFn(appConfig0, inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dd8c5a94-6b08-4e2e-92a2-c2b941ffb358",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/": {
        "prerender": true
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {},
  "notificore": {
    "apiKey": "",
    "apiBaseUrl": "https://api.notificore.ru",
    "oneApiBaseUrl": "https://one-api.notificore.ru",
    "sender": "",
    "otpTemplateId": "",
    "emailApiKey": "",
    "emailApiBaseUrl": "https://one-api.notificore.ru",
    "emailFrom": "",
    "confirmationEmailTemplateId": "",
    "codeDigits": 4,
    "codeLifetime": 60,
    "codeMaxTries": 3,
    "emailTimeout": 20000
  },
  "dadata": {
    "apiKey": "",
    "suggestUrl": "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party"
  },
  "vtbPayment": {
    "baseUrl": "https://vtb.rbsuat.com/payment/rest/",
    "token": "",
    "userName": "",
    "password": "",
    "returnUrl": "",
    "failUrl": "",
    "callbackUrl": "",
    "qrTtlSeconds": 900
  },
  "betterAuth": {
    "url": "",
    "secret": "",
    "trustedOrigins": "https://ra-indigo.com"
  },
  "icon": {
    "serverKnownCssClasses": []
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

/**
* Nitro internal functions extracted from https://github.com/nitrojs/nitro/blob/v2/src/runtime/internal/utils.ts
*/
function isJsonRequest(event) {
	// If the client specifically requests HTML, then avoid classifying as JSON.
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		// let Nitro handle JSON errors
		return;
	}
	// invoke default Nitro error handler (which will log appropriately if required)
	const defaultRes = await defaultHandler(error, event, { json: true });
	// let Nitro handle redirect if appropriate
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	const errorObject = defaultRes.body;
	// remove proto/hostname/port from URL
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	// add default server message (keep sanitized for unhandled errors)
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	// we will be rendering this error internally so we can pass along the error.data safely
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	// Access request headers
	const reqHeaders = getRequestHeaders(event);
	// Detect to avoid recursion in SSR rendering of errors
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	// HTML response (via SSR)
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	// Fallback to static rendered error page
	if (!res) {
		const { template } = await import('../_/error-500.mjs');
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"system\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _O2qIg3f2YyB9HHQnuGHLLmJMNhQPnQzGoaoof3P3t4 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _O2qIg3f2YyB9HHQnuGHLLmJMNhQPnQzGoaoof3P3t4
];

const assets = {
  "/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"45-7juSxNyQeTNmKF+8t9kCbJWe2dI\"",
    "mtime": "2026-05-13T19:45:16.764Z",
    "size": 69,
    "path": "../public/_payload.json"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2026-05-13T19:45:17.110Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"12dea-T0lNyTVKpEuFIrBOxft2H8CBw9g\"",
    "mtime": "2026-05-13T19:45:16.757Z",
    "size": 77290,
    "path": "../public/index.html"
  },
  "/sw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cf-Yaz0W3MuC8fvUl2UpJuR3JzbKX0\"",
    "mtime": "2026-05-13T19:45:17.110Z",
    "size": 207,
    "path": "../public/sw.js"
  },
  "/_fonts/6CXtQpr9VY5Z0zV1xogwmkWDzNR_19zN1NTGulEzmjg-kCRFKXhkCh0_kGLAckhVN3TP-F_bkwm7Ivy9TdKzUJg.woff2": {
    "type": "font/woff2",
    "etag": "\"6000-yOr+6GOlMYXr/a2M9DBWFj+PFP0\"",
    "mtime": "2026-05-13T19:45:16.843Z",
    "size": 24576,
    "path": "../public/_fonts/6CXtQpr9VY5Z0zV1xogwmkWDzNR_19zN1NTGulEzmjg-kCRFKXhkCh0_kGLAckhVN3TP-F_bkwm7Ivy9TdKzUJg.woff2"
  },
  "/_fonts/FPImowmXkU1aWgmKsxPu7Akj0JNowdsV90BaJJQN8Dw-_91jnewDEbv6Ft52Ae56infTiwcwq3HFAAhB_Y7h8Nw.woff2": {
    "type": "font/woff2",
    "etag": "\"212c-qyXMIA38lm8hz7dJ91nZrSUTpo8\"",
    "mtime": "2026-05-13T19:45:16.843Z",
    "size": 8492,
    "path": "../public/_fonts/FPImowmXkU1aWgmKsxPu7Akj0JNowdsV90BaJJQN8Dw-_91jnewDEbv6Ft52Ae56infTiwcwq3HFAAhB_Y7h8Nw.woff2"
  },
  "/_fonts/UnngOpW3QUFmW9ustR7f4iJ6HMtsBQrF8MRey6Urw8M-bdAyUOEhdSN8LU65JRDWYqdkUIYhM59ZKeszsiAgtAI.woff2": {
    "type": "font/woff2",
    "etag": "\"2490-lxxhduGHtEyKOfaXOsN0tycYxLo\"",
    "mtime": "2026-05-13T19:45:16.843Z",
    "size": 9360,
    "path": "../public/_fonts/UnngOpW3QUFmW9ustR7f4iJ6HMtsBQrF8MRey6Urw8M-bdAyUOEhdSN8LU65JRDWYqdkUIYhM59ZKeszsiAgtAI.woff2"
  },
  "/_fonts/bJM9t_QZ4-OukAilpAvXFzrpFWWgeGJ0mI4OoxeTBXA-T1gZRQnm_CyPlHs2G7o5lSEBc3-0yjeDI6MJ5h7RFr8.woff2": {
    "type": "font/woff2",
    "etag": "\"3b88-8PPUGEtSggUUaoWKHrBtMZpCcII\"",
    "mtime": "2026-05-13T19:45:16.843Z",
    "size": 15240,
    "path": "../public/_fonts/bJM9t_QZ4-OukAilpAvXFzrpFWWgeGJ0mI4OoxeTBXA-T1gZRQnm_CyPlHs2G7o5lSEBc3-0yjeDI6MJ5h7RFr8.woff2"
  },
  "/_fonts/Im8HkqQ00A1IGqihOqFViX4pj8D3DlxkfI6t6LTbZQg-jR4Prvz_J7I8oA8oUj3_1pTizDgpRYIEI5b7BlHPneU.woff2": {
    "type": "font/woff2",
    "etag": "\"a20-/mE2T1SnEVqacISsybF/22fJxpQ\"",
    "mtime": "2026-05-13T19:45:16.843Z",
    "size": 2592,
    "path": "../public/_fonts/Im8HkqQ00A1IGqihOqFViX4pj8D3DlxkfI6t6LTbZQg-jR4Prvz_J7I8oA8oUj3_1pTizDgpRYIEI5b7BlHPneU.woff2"
  },
  "/_nuxt/AppBreadcrumbs.D4A7nhcc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"33d-UT8XP1UjG1rgljHe0/Zqy1RSimc\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 829,
    "path": "../public/_nuxt/AppBreadcrumbs.D4A7nhcc.css"
  },
  "/_fonts/j2DQVh5iMWeAm2MqpLd4MwbmjfUsIAMYOc7Un8-q1oQ-5gkdZw7cVFs_x-rFm49rMnDT-AGGoIvy6_RxE2XbStA.woff2": {
    "type": "font/woff2",
    "etag": "\"38d0-N24h2Ga9QWdeZ+V28x7JcqD6is8\"",
    "mtime": "2026-05-13T19:45:16.843Z",
    "size": 14544,
    "path": "../public/_fonts/j2DQVh5iMWeAm2MqpLd4MwbmjfUsIAMYOc7Un8-q1oQ-5gkdZw7cVFs_x-rFm49rMnDT-AGGoIvy6_RxE2XbStA.woff2"
  },
  "/_nuxt/BK-h7QKq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"44a-YFv2Sh7gFGQ1RC6F+UYkC6ckaLI\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 1098,
    "path": "../public/_nuxt/BK-h7QKq.js"
  },
  "/_nuxt/BcScItuj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b88-W/mqPn0HSiXUZKjxGUJXxTfNwVo\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 7048,
    "path": "../public/_nuxt/BcScItuj.js"
  },
  "/_nuxt/AppButton.DUN3cgd3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d33-iLQovk+Qj/63/lNlV5X2a++Juls\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 3379,
    "path": "../public/_nuxt/AppButton.DUN3cgd3.css"
  },
  "/_nuxt/BqNwyTFt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e99-+ZF18QyVendA+1iZg/08gRUkeks\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 3737,
    "path": "../public/_nuxt/BqNwyTFt.js"
  },
  "/_nuxt/BecgY9kt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7550-aU7H5kjLpG8TvSC2CwhQLyQ2V5Q\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 30032,
    "path": "../public/_nuxt/BecgY9kt.js"
  },
  "/_nuxt/CI3gfbLA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f4-fc/dwvm+QuRKOAyTGSHFLnzCck4\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 756,
    "path": "../public/_nuxt/CI3gfbLA.js"
  },
  "/_nuxt/BtitBsHQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2dfe-fGTMANWeUB+tiGHJ//qizTbE8dk\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 11774,
    "path": "../public/_nuxt/BtitBsHQ.js"
  },
  "/_nuxt/CFrNBv7I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"809d-UQIdc92z0tVb8s1XbpbwdeQee9s\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 32925,
    "path": "../public/_nuxt/CFrNBv7I.js"
  },
  "/_nuxt/C4os-ucs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1456-7WZn/XRYMDz3e08eoAT9sqJTrx0\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 5206,
    "path": "../public/_nuxt/C4os-ucs.js"
  },
  "/_nuxt/CRJ8dIdX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d7b-0sb94axiZCBw/lTa4cpIf4mtFCU\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 3451,
    "path": "../public/_nuxt/CRJ8dIdX.js"
  },
  "/_nuxt/Cl2EVdsM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1273-e5T1FnYk1r1a1Rxzq9A86h18Eb8\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 4723,
    "path": "../public/_nuxt/Cl2EVdsM.js"
  },
  "/_nuxt/COjvezWC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d4f1-rcN1U/nY52cnFZUdNbSJxfQDu6g\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 54513,
    "path": "../public/_nuxt/COjvezWC.js"
  },
  "/_nuxt/Cy892vUk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"584-JtFrGVHZQ0WeXvvynAE35kwNPPg\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 1412,
    "path": "../public/_nuxt/Cy892vUk.js"
  },
  "/_nuxt/BTx7Md_E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"88b51-/WaYIEWkA/1rV48m+Gbjpjl23Fg\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 559953,
    "path": "../public/_nuxt/BTx7Md_E.js"
  },
  "/_nuxt/DHuU7Owa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21d9-tfTD75fqNjVNZQX/Gg4AnJBBApo\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 8665,
    "path": "../public/_nuxt/DHuU7Owa.js"
  },
  "/_nuxt/DirZH5kO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"64e-Yb3JH2xpOqMbDc8qn6EeiSs2di8\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 1614,
    "path": "../public/_nuxt/DirZH5kO.js"
  },
  "/_nuxt/DvHPYKzd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1699-75+mIk3Lv1rlgnCbV7qZLb06Efc\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 5785,
    "path": "../public/_nuxt/DvHPYKzd.js"
  },
  "/_nuxt/_orderId_.bC04XxWT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1aff-5cNi3z39flX6VM73sqXcb8ZFBN8\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 6911,
    "path": "../public/_nuxt/_orderId_.bC04XxWT.css"
  },
  "/_nuxt/DD1iyLbn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b1d-NNGmjbSNtM9HDQbgGhbrQmyz6+c\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 2845,
    "path": "../public/_nuxt/DD1iyLbn.js"
  },
  "/_nuxt/catalog.B6NB7DDW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"24fe-UHmeJ7o8VvZT6F5HOStIc4Cj19o\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 9470,
    "path": "../public/_nuxt/catalog.B6NB7DDW.css"
  },
  "/_nuxt/catalog-products.D-HW1Ud6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"332-9oj4F6Z+k9WBj+GEDxiMTsk1VZ0\"",
    "mtime": "2026-05-13T19:45:17.052Z",
    "size": 818,
    "path": "../public/_nuxt/catalog-products.D-HW1Ud6.css"
  },
  "/_nuxt/catalog_slider_2.BH45i3L8.png": {
    "type": "image/png",
    "etag": "\"5262d-4c8UpFC77yPLHqigal4rgiTKR4g\"",
    "mtime": "2026-05-13T19:45:17.056Z",
    "size": 337453,
    "path": "../public/_nuxt/catalog_slider_2.BH45i3L8.png"
  },
  "/_nuxt/cookie-policy.DbJ_Hgph.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"399-B/YQ46Eaho4o1o84/13G7uEWcnQ\"",
    "mtime": "2026-05-13T19:45:17.056Z",
    "size": 921,
    "path": "../public/_nuxt/cookie-policy.DbJ_Hgph.css"
  },
  "/_nuxt/catalog_slider_5.J76b3FyM.png": {
    "type": "image/png",
    "etag": "\"7ae65-13onMZeTGAYGPrS6zKQG05uoHKY\"",
    "mtime": "2026-05-13T19:45:17.056Z",
    "size": 503397,
    "path": "../public/_nuxt/catalog_slider_5.J76b3FyM.png"
  },
  "/_nuxt/delivery.eNplfU_M.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"89b-9um6TuALWIIUhtVK3c7zTL6Z3Ts\"",
    "mtime": "2026-05-13T19:45:17.056Z",
    "size": 2203,
    "path": "../public/_nuxt/delivery.eNplfU_M.css"
  },
  "/_nuxt/dense_polyester_grommets_60x90_double.za9T4eXU.png": {
    "type": "image/png",
    "etag": "\"c1c3c-WPXrPMYN1haE73E/bhw5EvrxsfM\"",
    "mtime": "2026-05-13T19:45:17.059Z",
    "size": 793660,
    "path": "../public/_nuxt/dense_polyester_grommets_60x90_double.za9T4eXU.png"
  },
  "/_nuxt/dense_polyester_grommets_60x90_single.DKCu2Fiq.png": {
    "type": "image/png",
    "etag": "\"974af-rFo4G91FF29VCRxG8Uj8Rd96c2I\"",
    "mtime": "2026-05-13T19:45:17.059Z",
    "size": 619695,
    "path": "../public/_nuxt/dense_polyester_grommets_60x90_single.DKCu2Fiq.png"
  },
  "/_nuxt/catalog_slider_3.qx5ywKHs.png": {
    "type": "image/png",
    "etag": "\"db421-XPTQRXfj0AwjWEXQjihfrMmx6Ok\"",
    "mtime": "2026-05-13T19:45:17.056Z",
    "size": 898081,
    "path": "../public/_nuxt/catalog_slider_3.qx5ywKHs.png"
  },
  "/_nuxt/catalog_slider_4.C0q_KMLO.png": {
    "type": "image/png",
    "etag": "\"da674-xfTbUkrpoLqvpDxyWfmtU63bZ8g\"",
    "mtime": "2026-05-13T19:45:17.056Z",
    "size": 894580,
    "path": "../public/_nuxt/catalog_slider_4.C0q_KMLO.png"
  },
  "/_nuxt/dense_polyester_grommets_60x90_double_fringe.CS_CY77A.png": {
    "type": "image/png",
    "etag": "\"e6c7e-BW6nR+IDPI88oNumjyYWhoVU+9w\"",
    "mtime": "2026-05-13T19:45:17.059Z",
    "size": 945278,
    "path": "../public/_nuxt/dense_polyester_grommets_60x90_double_fringe.CS_CY77A.png"
  },
  "/_nuxt/dense_polyester_grommets_90x135_double.Cd_hhpv8.png": {
    "type": "image/png",
    "etag": "\"afe45-+U/r8gotREKnoFkqjAXjFeAf3KU\"",
    "mtime": "2026-05-13T19:45:17.059Z",
    "size": 720453,
    "path": "../public/_nuxt/dense_polyester_grommets_90x135_double.Cd_hhpv8.png"
  },
  "/_nuxt/dense_polyester_grommets_90x135_single.BVUsePy3.png": {
    "type": "image/png",
    "etag": "\"b51dc-IQ1iRAmeZp+RV9y2TQ7Z4EVzeU0\"",
    "mtime": "2026-05-13T19:45:17.063Z",
    "size": 741852,
    "path": "../public/_nuxt/dense_polyester_grommets_90x135_single.BVUsePy3.png"
  },
  "/_nuxt/dense_polyester_sleeve_60x90_double.ACc-aKlY.png": {
    "type": "image/png",
    "etag": "\"b5adf-icXnosKHM1Dr7M9BqslsTjgtYTQ\"",
    "mtime": "2026-05-13T19:45:17.063Z",
    "size": 744159,
    "path": "../public/_nuxt/dense_polyester_sleeve_60x90_double.ACc-aKlY.png"
  },
  "/_nuxt/dense_polyester_grommets_60x90_single_fringe.mRkfvSRV.png": {
    "type": "image/png",
    "etag": "\"c6368-Ruf+t2JpbGOKa1TSV1RJZsdcexo\"",
    "mtime": "2026-05-13T19:45:17.059Z",
    "size": 811880,
    "path": "../public/_nuxt/dense_polyester_grommets_60x90_single_fringe.mRkfvSRV.png"
  },
  "/_nuxt/dense_polyester_grommets_90x135_double_fringe.De_EkLXt.png": {
    "type": "image/png",
    "etag": "\"cf2fd-rzZNc2ktEkMoKtGIWhp1nhObTzM\"",
    "mtime": "2026-05-13T19:45:17.059Z",
    "size": 848637,
    "path": "../public/_nuxt/dense_polyester_grommets_90x135_double_fringe.De_EkLXt.png"
  },
  "/_nuxt/dense_polyester_grommets_90x135_single_fringe.BvTafySI.png": {
    "type": "image/png",
    "etag": "\"d0274-TzhC58l3kLcrY4xJnFNFaKdyjJc\"",
    "mtime": "2026-05-13T19:45:17.063Z",
    "size": 852596,
    "path": "../public/_nuxt/dense_polyester_grommets_90x135_single_fringe.BvTafySI.png"
  },
  "/_nuxt/dense_polyester_sleeve_60x90_double_fringe.BUeuNOen.png": {
    "type": "image/png",
    "etag": "\"ad8bf-XqXSmL08NF69/BRtKJOyUXye1d8\"",
    "mtime": "2026-05-13T19:45:17.063Z",
    "size": 710847,
    "path": "../public/_nuxt/dense_polyester_sleeve_60x90_double_fringe.BUeuNOen.png"
  },
  "/_nuxt/dense_polyester_sleeve_60x90_single._p5eDjvq.png": {
    "type": "image/png",
    "etag": "\"af2e3-rHg7lA2xtgll8lyyR2els45M8WI\"",
    "mtime": "2026-05-13T19:45:17.063Z",
    "size": 717539,
    "path": "../public/_nuxt/dense_polyester_sleeve_60x90_single._p5eDjvq.png"
  },
  "/_nuxt/entry.DeImCydp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"51140-3wpPp8rSyOInKcu3O7ayIz0mY40\"",
    "mtime": "2026-05-13T19:45:17.066Z",
    "size": 332096,
    "path": "../public/_nuxt/entry.DeImCydp.css"
  },
  "/_nuxt/error-404.C-Ezrlz-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"97e-YLcQ2HBNLea0KJoUeqSqSCendIU\"",
    "mtime": "2026-05-13T19:45:17.066Z",
    "size": 2430,
    "path": "../public/_nuxt/error-404.C-Ezrlz-.css"
  },
  "/_nuxt/error-500.DBWf9FGj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"773-9MNIE+ztUss3x7HN62QKMFz0rhs\"",
    "mtime": "2026-05-13T19:45:17.066Z",
    "size": 1907,
    "path": "../public/_nuxt/error-500.DBWf9FGj.css"
  },
  "/_nuxt/footer-logo.CDJvr2uJ.svg": {
    "type": "image/svg+xml",
    "etag": "\"274f-FjEz6rXc88Q6g5nOTOnXiPXnJTI\"",
    "mtime": "2026-05-13T19:45:17.066Z",
    "size": 10063,
    "path": "../public/_nuxt/footer-logo.CDJvr2uJ.svg"
  },
  "/_nuxt/header-logo-text.B_a9knhz.svg": {
    "type": "image/svg+xml",
    "etag": "\"272f-YQkkTXHp4uPT4lIdOvHHm6SqpVM\"",
    "mtime": "2026-05-13T19:45:17.066Z",
    "size": 10031,
    "path": "../public/_nuxt/header-logo-text.B_a9knhz.svg"
  },
  "/_nuxt/index.D-gZelbG.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"116c-D29DNd9vcslimd3Wt19fg0qFa2c\"",
    "mtime": "2026-05-13T19:45:17.070Z",
    "size": 4460,
    "path": "../public/_nuxt/index.D-gZelbG.css"
  },
  "/_nuxt/dense_polyester_sleeve_90x135_double.BrJn4Xaq.png": {
    "type": "image/png",
    "etag": "\"94eed-tmHpVV5QnTclEjHqfn8Mt9DYv/Q\"",
    "mtime": "2026-05-13T19:45:17.066Z",
    "size": 610029,
    "path": "../public/_nuxt/dense_polyester_sleeve_90x135_double.BrJn4Xaq.png"
  },
  "/_nuxt/index.DN5FvX9A.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"20e7a-HwGab5ikUCG8DxoiganGlqPDKcM\"",
    "mtime": "2026-05-13T19:45:17.070Z",
    "size": 134778,
    "path": "../public/_nuxt/index.DN5FvX9A.css"
  },
  "/_nuxt/landing-hero-pattern.DfC6rtHl.svg": {
    "type": "image/svg+xml",
    "etag": "\"148e7-F5jHI/7VIhHnkT7/1QLmCvmMgAc\"",
    "mtime": "2026-05-13T19:45:17.070Z",
    "size": 84199,
    "path": "../public/_nuxt/landing-hero-pattern.DfC6rtHl.svg"
  },
  "/_nuxt/legal-information.Kzi_0WoB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"53d-48A/ngoy6yK+qzj/1RdrBKZ7O5c\"",
    "mtime": "2026-05-13T19:45:17.070Z",
    "size": 1341,
    "path": "../public/_nuxt/legal-information.Kzi_0WoB.css"
  },
  "/_nuxt/dense_polyester_sleeve_60x90_single_fringe.UEyS7zTb.png": {
    "type": "image/png",
    "etag": "\"c5922-DjKZ5tyA9pa7yb6LcHWW//vP69g\"",
    "mtime": "2026-05-13T19:45:17.066Z",
    "size": 809250,
    "path": "../public/_nuxt/dense_polyester_sleeve_60x90_single_fringe.UEyS7zTb.png"
  },
  "/_nuxt/dense_polyester_sleeve_90x135_single.051p5EBo.png": {
    "type": "image/png",
    "etag": "\"a4488-DIo4O1BbqcnbmdhJC5NNBCRkA3s\"",
    "mtime": "2026-05-13T19:45:17.066Z",
    "size": 672904,
    "path": "../public/_nuxt/dense_polyester_sleeve_90x135_single.051p5EBo.png"
  },
  "/_nuxt/dense_polyester_sleeve_90x135_double_fringe.Dk0vLEjX.png": {
    "type": "image/png",
    "etag": "\"e626d-DuxpsFNbK6xJ6y4ZD74yIqrYEhI\"",
    "mtime": "2026-05-13T19:45:17.066Z",
    "size": 942701,
    "path": "../public/_nuxt/dense_polyester_sleeve_90x135_double_fringe.Dk0vLEjX.png"
  },
  "/_nuxt/dense_polyester_sleeve_90x135_single_fringe.BAlleuEE.png": {
    "type": "image/png",
    "etag": "\"f7f0e-KLHb6o1ndMEUC0u9JIJpgj83K3k\"",
    "mtime": "2026-05-13T19:45:17.070Z",
    "size": 1015566,
    "path": "../public/_nuxt/dense_polyester_sleeve_90x135_single_fringe.BAlleuEE.png"
  },
  "/_nuxt/mesh_grommets_60x90_double.DUTuOgHv.png": {
    "type": "image/png",
    "etag": "\"ca2ab-7RE/t9akhiXfSecyDfP6rwzvxgM\"",
    "mtime": "2026-05-13T19:45:17.070Z",
    "size": 828075,
    "path": "../public/_nuxt/mesh_grommets_60x90_double.DUTuOgHv.png"
  },
  "/_nuxt/mesh_grommets_60x90_single.CQzq71gw.png": {
    "type": "image/png",
    "etag": "\"f4de3-SKSKAHzpvuwKtkxLyDWggYqq6sQ\"",
    "mtime": "2026-05-13T19:45:17.070Z",
    "size": 1002979,
    "path": "../public/_nuxt/mesh_grommets_60x90_single.CQzq71gw.png"
  },
  "/_nuxt/mesh_grommets_90x135_double.BtL6Voqz.png": {
    "type": "image/png",
    "etag": "\"f9d3b-7PaD5v3wiR9QBJa4kU5m3HCjD3Q\"",
    "mtime": "2026-05-13T19:45:17.070Z",
    "size": 1023291,
    "path": "../public/_nuxt/mesh_grommets_90x135_double.BtL6Voqz.png"
  },
  "/_nuxt/catalog_slider_1.BiVYIshC.png": {
    "type": "image/png",
    "etag": "\"3b66ed-8Fv6jlmmxiTrk+I5uuG29yjUS9o\"",
    "mtime": "2026-05-13T19:45:17.066Z",
    "size": 3892973,
    "path": "../public/_nuxt/catalog_slider_1.BiVYIshC.png"
  },
  "/_nuxt/mesh_grommets_60x90_double_fringe.C-pTSaox.png": {
    "type": "image/png",
    "etag": "\"10bc88-hDhg4NNq6kd1JyedBw7aLxQ0c6E\"",
    "mtime": "2026-05-13T19:45:17.070Z",
    "size": 1096840,
    "path": "../public/_nuxt/mesh_grommets_60x90_double_fringe.C-pTSaox.png"
  },
  "/_nuxt/mesh_grommets_60x90_single_fringe.DU2MNMvp.png": {
    "type": "image/png",
    "etag": "\"111fe9-QNxA0zMV3U5mePIStrhocShfGxM\"",
    "mtime": "2026-05-13T19:45:17.074Z",
    "size": 1122281,
    "path": "../public/_nuxt/mesh_grommets_60x90_single_fringe.DU2MNMvp.png"
  },
  "/_nuxt/mesh_grommets_90x135_double_fringe.B69a68ry.png": {
    "type": "image/png",
    "etag": "\"10ed3b-6YML+cTdF2zmed7JEItYq1Vq3cc\"",
    "mtime": "2026-05-13T19:45:17.074Z",
    "size": 1109307,
    "path": "../public/_nuxt/mesh_grommets_90x135_double_fringe.B69a68ry.png"
  },
  "/_nuxt/mesh_grommets_90x135_single.DPD0554Q.png": {
    "type": "image/png",
    "etag": "\"10309b-0UBE9mC6o4233B9fQYnITJDWJE4\"",
    "mtime": "2026-05-13T19:45:17.074Z",
    "size": 1061019,
    "path": "../public/_nuxt/mesh_grommets_90x135_single.DPD0554Q.png"
  },
  "/_nuxt/mesh_sleeve_60x90_double.AU-psE_l.png": {
    "type": "image/png",
    "etag": "\"106b6d-piT0AW5eiQK/BH5pmowglNu7wkk\"",
    "mtime": "2026-05-13T19:45:17.074Z",
    "size": 1076077,
    "path": "../public/_nuxt/mesh_sleeve_60x90_double.AU-psE_l.png"
  },
  "/_nuxt/mesh_grommets_90x135_single_fringe.DxWtrmVO.png": {
    "type": "image/png",
    "etag": "\"1131f7-HIEsvRixV3Fw1m9dqsNm9u5JLSQ\"",
    "mtime": "2026-05-13T19:45:17.074Z",
    "size": 1126903,
    "path": "../public/_nuxt/mesh_grommets_90x135_single_fringe.DxWtrmVO.png"
  },
  "/_nuxt/mesh_sleeve_60x90_double_fringe.SrC3VtWH.png": {
    "type": "image/png",
    "etag": "\"122924-XtwCzQHKGfBj4yjLa6Hs/n8f/PE\"",
    "mtime": "2026-05-13T19:45:17.074Z",
    "size": 1190180,
    "path": "../public/_nuxt/mesh_sleeve_60x90_double_fringe.SrC3VtWH.png"
  },
  "/_nuxt/payment.CPXVp06Q.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"845-yEGNzGX/dnxZ25aGy1uktx60CIE\"",
    "mtime": "2026-05-13T19:45:17.077Z",
    "size": 2117,
    "path": "../public/_nuxt/payment.CPXVp06Q.css"
  },
  "/_nuxt/mesh_sleeve_60x90_single.CmS-puQr.png": {
    "type": "image/png",
    "etag": "\"e41c2-gn3NuTZexL7pnIiYv/S3hN+WUwg\"",
    "mtime": "2026-05-13T19:45:17.074Z",
    "size": 934338,
    "path": "../public/_nuxt/mesh_sleeve_60x90_single.CmS-puQr.png"
  },
  "/_nuxt/mesh_sleeve_90x135_double.gzM_G-fO.png": {
    "type": "image/png",
    "etag": "\"f05f9-rTB5AQAPkQp9fWfDnP4xucGtV6U\"",
    "mtime": "2026-05-13T19:45:17.077Z",
    "size": 984569,
    "path": "../public/_nuxt/mesh_sleeve_90x135_double.gzM_G-fO.png"
  },
  "/_nuxt/mesh_sleeve_90x135_single.BF76aDEu.png": {
    "type": "image/png",
    "etag": "\"ef2e1-U1EIsAOt7xKod2tw9L328UEWxuo\"",
    "mtime": "2026-05-13T19:45:17.077Z",
    "size": 979681,
    "path": "../public/_nuxt/mesh_sleeve_90x135_single.BF76aDEu.png"
  },
  "/_nuxt/mesh_sleeve_60x90_single_fringe.C6ZFg3Lf.png": {
    "type": "image/png",
    "etag": "\"1381de-QdbAltqQNo9BrbZzxKU3JdN83jw\"",
    "mtime": "2026-05-13T19:45:17.077Z",
    "size": 1278430,
    "path": "../public/_nuxt/mesh_sleeve_60x90_single_fringe.C6ZFg3Lf.png"
  },
  "/_nuxt/polyester_grommets_60x90_double.D8jS7Lud.png": {
    "type": "image/png",
    "etag": "\"cb64d-AccAjd5fD6gzJAS6aRM3hWSO370\"",
    "mtime": "2026-05-13T19:45:17.081Z",
    "size": 833101,
    "path": "../public/_nuxt/polyester_grommets_60x90_double.D8jS7Lud.png"
  },
  "/_nuxt/polyester_grommets_60x90_double_fringe.DVWDASzD.png": {
    "type": "image/png",
    "etag": "\"ed5a8-3gqMT6SJwRA3CDK4rnqpeVvg9GU\"",
    "mtime": "2026-05-13T19:45:17.081Z",
    "size": 972200,
    "path": "../public/_nuxt/polyester_grommets_60x90_double_fringe.DVWDASzD.png"
  },
  "/_nuxt/polyester_grommets_60x90_single_fringe.4fPcYHcK.png": {
    "type": "image/png",
    "etag": "\"f32f6-Xz2DavSitbi8RxKBXOIINRhKSxk\"",
    "mtime": "2026-05-13T19:45:17.081Z",
    "size": 996086,
    "path": "../public/_nuxt/polyester_grommets_60x90_single_fringe.4fPcYHcK.png"
  },
  "/_nuxt/mesh_sleeve_90x135_single_fringe.BMSZa4Gp.png": {
    "type": "image/png",
    "etag": "\"102705-Kt6BfU8yL0+4ETJxCKuYg/g0Z/c\"",
    "mtime": "2026-05-13T19:45:17.081Z",
    "size": 1058565,
    "path": "../public/_nuxt/mesh_sleeve_90x135_single_fringe.BMSZa4Gp.png"
  },
  "/_nuxt/polyester_grommets_60x90_single.MOirczvX.png": {
    "type": "image/png",
    "etag": "\"f3975-ympc+goWybiiU2a/q6wZl8RxDuw\"",
    "mtime": "2026-05-13T19:45:17.081Z",
    "size": 997749,
    "path": "../public/_nuxt/polyester_grommets_60x90_single.MOirczvX.png"
  },
  "/_nuxt/mesh_sleeve_90x135_double_fringe.Pjsv4A4q.png": {
    "type": "image/png",
    "etag": "\"13fbdb-+T5Tu9sY6BR9fmMOHSmHyoUIC/s\"",
    "mtime": "2026-05-13T19:45:17.077Z",
    "size": 1309659,
    "path": "../public/_nuxt/mesh_sleeve_90x135_double_fringe.Pjsv4A4q.png"
  },
  "/_nuxt/polyester_grommets_90x135_double.Bc5E38oN.png": {
    "type": "image/png",
    "etag": "\"b8553-WzUniAyA7kugCNTak18gkF/lJ3E\"",
    "mtime": "2026-05-13T19:45:17.081Z",
    "size": 755027,
    "path": "../public/_nuxt/polyester_grommets_90x135_double.Bc5E38oN.png"
  },
  "/_nuxt/polyester_grommets_90x135_single.DSceDMP9.png": {
    "type": "image/png",
    "etag": "\"a6a05-zHQ5JUB5vQWBn4bmOkonjmrZ3Ac\"",
    "mtime": "2026-05-13T19:45:17.081Z",
    "size": 682501,
    "path": "../public/_nuxt/polyester_grommets_90x135_single.DSceDMP9.png"
  },
  "/_nuxt/polyester_grommets_90x135_double_fringe.C_votDlE.png": {
    "type": "image/png",
    "etag": "\"d86ae-GjS3RmAtTiTfefVL4c2CKd0Oqtk\"",
    "mtime": "2026-05-13T19:45:17.088Z",
    "size": 886446,
    "path": "../public/_nuxt/polyester_grommets_90x135_double_fringe.C_votDlE.png"
  },
  "/_nuxt/polyester_grommets_90x135_single_fringe.sevc2bgj.png": {
    "type": "image/png",
    "etag": "\"e9938-9Gcnas2YPWAro+VYRSG+O5aTQ9I\"",
    "mtime": "2026-05-13T19:45:17.088Z",
    "size": 956728,
    "path": "../public/_nuxt/polyester_grommets_90x135_single_fringe.sevc2bgj.png"
  },
  "/_nuxt/polyester_sleeve_60x90_double.CuU2f0Nk.png": {
    "type": "image/png",
    "etag": "\"a378f-4IYJ/g2b9b7+PdhoFv4LJCq3T4k\"",
    "mtime": "2026-05-13T19:45:17.088Z",
    "size": 669583,
    "path": "../public/_nuxt/polyester_sleeve_60x90_double.CuU2f0Nk.png"
  },
  "/_nuxt/privacy-policy.CyfpbZ6y.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e85-yQnd66mtqESRG8Jq1F31yV8ldFY\"",
    "mtime": "2026-05-13T19:45:17.092Z",
    "size": 3717,
    "path": "../public/_nuxt/privacy-policy.CyfpbZ6y.css"
  },
  "/_nuxt/polyester_sleeve_60x90_double_fringe.D5RRAdln.png": {
    "type": "image/png",
    "etag": "\"e5dfc-U+PIG4wh5pswa0Z2gkDBInftvYQ\"",
    "mtime": "2026-05-13T19:45:17.088Z",
    "size": 941564,
    "path": "../public/_nuxt/polyester_sleeve_60x90_double_fringe.D5RRAdln.png"
  },
  "/_nuxt/polyester_sleeve_60x90_single.C7RVHdnM.png": {
    "type": "image/png",
    "etag": "\"cb680-QMmugOdQscuZwV/uGJyrkbGwxas\"",
    "mtime": "2026-05-13T19:45:17.088Z",
    "size": 833152,
    "path": "../public/_nuxt/polyester_sleeve_60x90_single.C7RVHdnM.png"
  },
  "/_nuxt/polyester_sleeve_90x135_double.C2ikPQO1.png": {
    "type": "image/png",
    "etag": "\"d798d-y5DfsOIq6SvRIi4Prj4yfuFS0kQ\"",
    "mtime": "2026-05-13T19:45:17.092Z",
    "size": 883085,
    "path": "../public/_nuxt/polyester_sleeve_90x135_double.C2ikPQO1.png"
  },
  "/_nuxt/polyester_sleeve_90x135_double_fringe.UUtANBuN.png": {
    "type": "image/png",
    "etag": "\"ec8ce-bXDQpn+MKNkHul4Yrt4e08SOjTo\"",
    "mtime": "2026-05-13T19:45:17.092Z",
    "size": 968910,
    "path": "../public/_nuxt/polyester_sleeve_90x135_double_fringe.UUtANBuN.png"
  },
  "/_nuxt/polyester_sleeve_90x135_single.gck03kxQ.png": {
    "type": "image/png",
    "etag": "\"b90e9-iczceUWC1MO8ZH1l6cUVA8djbzo\"",
    "mtime": "2026-05-13T19:45:17.092Z",
    "size": 757993,
    "path": "../public/_nuxt/polyester_sleeve_90x135_single.gck03kxQ.png"
  },
  "/_nuxt/polyester_sleeve_90x135_single_fringe.BiFaViDN.png": {
    "type": "image/png",
    "etag": "\"def1b-MCtCC+FIb8bV9WljcuIAaEgFl9I\"",
    "mtime": "2026-05-13T19:45:17.095Z",
    "size": 913179,
    "path": "../public/_nuxt/polyester_sleeve_90x135_single_fringe.BiFaViDN.png"
  },
  "/_nuxt/polyester_sleeve_60x90_single_fringe.CtfDHoBx.png": {
    "type": "image/png",
    "etag": "\"10cdc4-mpGEmUNiqetuLz2SpKLVH89y5PY\"",
    "mtime": "2026-05-13T19:45:17.092Z",
    "size": 1101252,
    "path": "../public/_nuxt/polyester_sleeve_60x90_single_fringe.CtfDHoBx.png"
  },
  "/_nuxt/satin_grommets_60x90_double.C8GIQrJU.png": {
    "type": "image/png",
    "etag": "\"b0692-VvIhoC2HzI7kw087DdrXVw/1Q9w\"",
    "mtime": "2026-05-13T19:45:17.095Z",
    "size": 722578,
    "path": "../public/_nuxt/satin_grommets_60x90_double.C8GIQrJU.png"
  },
  "/_nuxt/satin_grommets_60x90_double_fringe.CRifW5D4.png": {
    "type": "image/png",
    "etag": "\"de611-yZCDteaYoLXqAlRBLeOwKC1Ll90\"",
    "mtime": "2026-05-13T19:45:17.095Z",
    "size": 910865,
    "path": "../public/_nuxt/satin_grommets_60x90_double_fringe.CRifW5D4.png"
  },
  "/_nuxt/satin_grommets_60x90_single_fringe.B2c9NQZ0.png": {
    "type": "image/png",
    "etag": "\"e51a3-nXlTU08nBJ0fBPqR5ZcwOnNN/Y4\"",
    "mtime": "2026-05-13T19:45:17.099Z",
    "size": 938403,
    "path": "../public/_nuxt/satin_grommets_60x90_single_fringe.B2c9NQZ0.png"
  },
  "/_nuxt/satin_grommets_60x90_single.-INYcgSl.png": {
    "type": "image/png",
    "etag": "\"ad2a5-6ZKaUShk7qklp1/ft90nm72W8ww\"",
    "mtime": "2026-05-13T19:45:17.095Z",
    "size": 709285,
    "path": "../public/_nuxt/satin_grommets_60x90_single.-INYcgSl.png"
  },
  "/_nuxt/satin_grommets_90x135_double.CeveyNnt.png": {
    "type": "image/png",
    "etag": "\"a2330-4hE9FreV+uTOOZ7zJLbwuFN8Ki8\"",
    "mtime": "2026-05-13T19:45:17.095Z",
    "size": 664368,
    "path": "../public/_nuxt/satin_grommets_90x135_double.CeveyNnt.png"
  },
  "/_nuxt/satin_grommets_90x135_single.DjgR8eU2.png": {
    "type": "image/png",
    "etag": "\"ba0bd-47+Amr5hWKSBzbQhribYCDZ77C4\"",
    "mtime": "2026-05-13T19:45:17.099Z",
    "size": 762045,
    "path": "../public/_nuxt/satin_grommets_90x135_single.DjgR8eU2.png"
  },
  "/_nuxt/satin_grommets_90x135_double_fringe.7Iinn9rA.png": {
    "type": "image/png",
    "etag": "\"e8927-Z7fFGSlVDw9VZaifLis437urM1o\"",
    "mtime": "2026-05-13T19:45:17.099Z",
    "size": 952615,
    "path": "../public/_nuxt/satin_grommets_90x135_double_fringe.7Iinn9rA.png"
  },
  "/_nuxt/satin_grommets_90x135_single_fringe.nyG-fLFQ.png": {
    "type": "image/png",
    "etag": "\"d0386-2eI7F0JMJ6QCK69GGZW02R/MTDI\"",
    "mtime": "2026-05-13T19:45:17.099Z",
    "size": 852870,
    "path": "../public/_nuxt/satin_grommets_90x135_single_fringe.nyG-fLFQ.png"
  },
  "/_nuxt/satin_sleeve_60x90_double.B-d5Istq.png": {
    "type": "image/png",
    "etag": "\"95a0a-fv885rf4Vx92DCE2vZrgPa19imM\"",
    "mtime": "2026-05-13T19:45:17.099Z",
    "size": 612874,
    "path": "../public/_nuxt/satin_sleeve_60x90_double.B-d5Istq.png"
  },
  "/_nuxt/satin_sleeve_60x90_single.ByUDhn4E.png": {
    "type": "image/png",
    "etag": "\"c5286-+GJiujJs0Ilt4OapGvHIUnU3TCs\"",
    "mtime": "2026-05-13T19:45:17.102Z",
    "size": 807558,
    "path": "../public/_nuxt/satin_sleeve_60x90_single.ByUDhn4E.png"
  },
  "/_nuxt/satin_sleeve_60x90_single_fringe.C2qvKlSZ.png": {
    "type": "image/png",
    "etag": "\"fe4b9-Ty8Joy7bz3xKgyQZislTdbT9ZPw\"",
    "mtime": "2026-05-13T19:45:17.102Z",
    "size": 1041593,
    "path": "../public/_nuxt/satin_sleeve_60x90_single_fringe.C2qvKlSZ.png"
  },
  "/_nuxt/satin_sleeve_90x135_double.Cat8n9H4.png": {
    "type": "image/png",
    "etag": "\"8ce33-/RIbujU9cWx3axHUtzDoiiSBPwA\"",
    "mtime": "2026-05-13T19:45:17.102Z",
    "size": 577075,
    "path": "../public/_nuxt/satin_sleeve_90x135_double.Cat8n9H4.png"
  },
  "/_nuxt/textile-caps.BA0R0Z1M.png": {
    "type": "image/png",
    "etag": "\"169a2-3zIcb2eXwveZXW70/E7uSKvAseM\"",
    "mtime": "2026-05-13T19:45:17.102Z",
    "size": 92578,
    "path": "../public/_nuxt/textile-caps.BA0R0Z1M.png"
  },
  "/_nuxt/satin_sleeve_90x135_double_fringe.DUYdMMof.png": {
    "type": "image/png",
    "etag": "\"d2f2e-SfgOjN2hCEydf47UXfFpFZKtJCA\"",
    "mtime": "2026-05-13T19:45:17.102Z",
    "size": 864046,
    "path": "../public/_nuxt/satin_sleeve_90x135_double_fringe.DUYdMMof.png"
  },
  "/_nuxt/satin_sleeve_90x135_single.BWcmz37Z.png": {
    "type": "image/png",
    "etag": "\"baef8-tAlxFs9fCrvQj0ErrKRF7uFzuSw\"",
    "mtime": "2026-05-13T19:45:17.102Z",
    "size": 765688,
    "path": "../public/_nuxt/satin_sleeve_90x135_single.BWcmz37Z.png"
  },
  "/_nuxt/textile-embroidery-clothes.DDD3s30Y.png": {
    "type": "image/png",
    "etag": "\"271a0-o3+Mh+dGgY+uae1hCzLZudYdwnE\"",
    "mtime": "2026-05-13T19:45:17.102Z",
    "size": 160160,
    "path": "../public/_nuxt/textile-embroidery-clothes.DDD3s30Y.png"
  },
  "/_nuxt/textile-embroidery-patches.BI_T9z9c.png": {
    "type": "image/png",
    "etag": "\"22c14-V1mIH5fJiFyynbkbJLSWiuKoqt0\"",
    "mtime": "2026-05-13T19:45:17.102Z",
    "size": 142356,
    "path": "../public/_nuxt/textile-embroidery-patches.BI_T9z9c.png"
  },
  "/_nuxt/satin_sleeve_60x90_double_fringe.mC-RM5cb.png": {
    "type": "image/png",
    "etag": "\"10f3fe-dAm0UZTUnnhtFzCmfzcKmt0nCqs\"",
    "mtime": "2026-05-13T19:45:17.102Z",
    "size": 1111038,
    "path": "../public/_nuxt/satin_sleeve_60x90_double_fringe.mC-RM5cb.png"
  },
  "/_nuxt/textile-flags.CpmamLaJ.png": {
    "type": "image/png",
    "etag": "\"1d82b-nn9sxwOLEuOWB0ly34dBcDZDkg8\"",
    "mtime": "2026-05-13T19:45:17.102Z",
    "size": 120875,
    "path": "../public/_nuxt/textile-flags.CpmamLaJ.png"
  },
  "/_nuxt/textile-print-pillow.BE0p2UrK.png": {
    "type": "image/png",
    "etag": "\"1f8e2-LETLl3mNK9vs6+jJhR9diK6HS7g\"",
    "mtime": "2026-05-13T19:45:17.106Z",
    "size": 129250,
    "path": "../public/_nuxt/textile-print-pillow.BE0p2UrK.png"
  },
  "/_nuxt/satin_sleeve_90x135_single_fringe.00B5d1PG.png": {
    "type": "image/png",
    "etag": "\"f5cee-FlH7q5JBu3V8Lb0CNG6EFAvEmOU\"",
    "mtime": "2026-05-13T19:45:17.102Z",
    "size": 1006830,
    "path": "../public/_nuxt/satin_sleeve_90x135_single_fringe.00B5d1PG.png"
  },
  "/_nuxt/textile-print-tshirt.DSQ8CFf8.png": {
    "type": "image/png",
    "etag": "\"1a6a8-iRWO/8odDtQKvAArnQ0ITOyz2Lk\"",
    "mtime": "2026-05-13T19:45:17.102Z",
    "size": 108200,
    "path": "../public/_nuxt/textile-print-tshirt.DSQ8CFf8.png"
  },
  "/_nuxt/textile-ribbon-print.-15G9hIc.png": {
    "type": "image/png",
    "etag": "\"134d6-MCOFnbNlAt6X7klT1339OcHhe1Y\"",
    "mtime": "2026-05-13T19:45:17.106Z",
    "size": 79062,
    "path": "../public/_nuxt/textile-ribbon-print.-15G9hIc.png"
  },
  "/_nuxt/textile-shopper.ITFXD2Li.png": {
    "type": "image/png",
    "etag": "\"1cc49-VBW9gIn00sdlFDYzHta3spK0M+Q\"",
    "mtime": "2026-05-13T19:45:17.106Z",
    "size": 117833,
    "path": "../public/_nuxt/textile-shopper.ITFXD2Li.png"
  },
  "/_nuxt/user-agreement.CCKUbKOn.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"be8-EJSDmWhZ2vUFBl2Y6se1vZVTzfs\"",
    "mtime": "2026-05-13T19:45:17.106Z",
    "size": 3048,
    "path": "../public/_nuxt/user-agreement.CCKUbKOn.css"
  },
  "/_nuxt/zhI6xgCd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c9-NCPPAcfwtvdWJ7P8IMavyj0EHME\"",
    "mtime": "2026-05-13T19:45:17.106Z",
    "size": 201,
    "path": "../public/_nuxt/zhI6xgCd.js"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-rrSvBAl/xTRk/D0jaQN/J906nsw\"",
    "mtime": "2026-05-13T19:45:16.836Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/dd8c5a94-6b08-4e2e-92a2-c2b941ffb358.json": {
    "type": "application/json",
    "etag": "\"5b-6IlFPk3o7mXSIUEPg3KTTCaq8/k\"",
    "mtime": "2026-05-13T19:45:16.825Z",
    "size": 91,
    "path": "../public/_nuxt/builds/meta/dd8c5a94-6b08-4e2e-92a2-c2b941ffb358.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};
const basename = function(p, extension) {
  const segments = normalizeWindowsPath(p).split("/");
  let lastSegment = "";
  for (let i = segments.length - 1; i >= 0; i--) {
    const val = segments[i];
    if (val) {
      lastSegment = val;
      break;
    }
  }
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_fonts/":{"maxAge":31536000},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _bqhKCW = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _SxA8c9 = defineEventHandler(() => {});

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

function baseURL() {
	// TODO: support passing event to `useRuntimeConfig`
	return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
	// TODO: support passing event to `useRuntimeConfig`
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	// TODO: support passing event to `useRuntimeConfig`
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,}$/;
function normalizePhoneDigits(value) {
  let digits = String(value != null ? value : "").replace(/\D/g, "");
  if (!digits) {
    return "";
  }
  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }
  if (!digits.startsWith("7")) {
    digits = `7${digits}`;
  }
  return digits.slice(0, 11);
}
function isPhoneLike(value) {
  const trimmed = String(value != null ? value : "").trim();
  if (!trimmed || /[A-Za-zА-Яа-я@]/.test(trimmed)) {
    return false;
  }
  return /^[+\d]/.test(trimmed);
}
function isAuthPhone(value) {
  return /^\+7\d{10}$/.test(String(value != null ? value : "").trim());
}
function formatAuthPhone(value) {
  const digits = normalizePhoneDigits(value);
  return digits ? `+${digits}` : "";
}
function formatPhone(value) {
  const text = String(value != null ? value : "");
  const digits = normalizePhoneDigits(text);
  if (!digits) {
    return text.trim().startsWith("+") ? "+7" : "";
  }
  const number = digits.slice(1);
  let formatted = "+7";
  if (number.length > 0) {
    formatted += ` (${number.slice(0, 3)}`;
  }
  if (number.length >= 3) {
    formatted += ")";
  }
  if (number.length > 3) {
    formatted += ` ${number.slice(3, 6)}`;
  }
  if (number.length > 6) {
    formatted += ` ${number.slice(6, 8)}`;
  }
  if (number.length > 8) {
    formatted += ` ${number.slice(8, 10)}`;
  }
  return formatted;
}
function formatCompactPhone(value) {
  const text = String(value != null ? value : "");
  const digits = normalizePhoneDigits(text);
  if (!digits) {
    return text.trim().startsWith("+") ? "+7" : "";
  }
  const number = digits.slice(1);
  let formatted = "+7";
  if (number.length > 0) {
    formatted += `(${number.slice(0, 3)}`;
  }
  if (number.length >= 3) {
    formatted += ")";
  }
  if (number.length > 3) {
    formatted += `-${number.slice(3, 6)}`;
  }
  if (number.length > 6) {
    formatted += `-${number.slice(6, 8)}`;
  }
  if (number.length > 8) {
    formatted += `-${number.slice(8, 10)}`;
  }
  return formatted;
}
function unmaskPhoneToEmail(value) {
  return String(value != null ? value : "").replace(/^\+7\s?\(?/, "").replace(/[()\s]/g, "");
}
function normalizeAuthIdentifier(value) {
  const trimmed = String(value != null ? value : "").trim();
  if (isPhoneLike(trimmed)) {
    const normalizedPhone = formatAuthPhone(trimmed);
    return {
      type: "phone",
      value: normalizedPhone,
      isValid: isAuthPhone(normalizedPhone)
    };
  }
  const email = trimmed.toLowerCase();
  return {
    type: "email",
    value: email,
    isValid: isValidEmail(email)
  };
}
function getIdentifierError(value) {
  const trimmed = String(value != null ? value : "").trim();
  if (!trimmed) {
    return "";
  }
  const identifier = normalizeAuthIdentifier(trimmed);
  return identifier.isValid ? "" : "\u041D\u0435 \u043F\u043E\u0445\u043E\u0436\u0435 \u043D\u0430 \u043D\u043E\u043C\u0435\u0440 \u0438\u043B\u0438 \u043F\u043E\u0447\u0442\u0443 :(";
}
function getRegistrationEmailError(value) {
  const trimmed = String(value != null ? value : "").trim();
  return isValidEmail(trimmed) ? "" : "\u041D\u0435 \u043F\u043E\u0445\u043E\u0436\u0435 \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 :(";
}
function isValidEmail(value) {
  const email = String(value != null ? value : "").trim();
  if (!EMAIL_PATTERN.test(email)) {
    return false;
  }
  const [localPart, domainPart] = email.split("@");
  if (!localPart || !domainPart) {
    return false;
  }
  if (localPart.startsWith(".") || localPart.endsWith(".") || localPart.includes("..")) {
    return false;
  }
  const domainLabels = domainPart.split(".");
  if (domainLabels.length < 2) {
    return false;
  }
  return domainLabels.every((label, index) => {
    if (!label || label.startsWith("-") || label.endsWith("-")) {
      return false;
    }
    if (index === domainLabels.length - 1) {
      return /^[A-Za-z]{2,}$/.test(label);
    }
    return /^[A-Za-z-]+$/.test(label);
  });
}

function getRussianSecondsWord(value) {
  const absoluteValue = Math.abs(value);
  const lastTwo = absoluteValue % 100;
  if (lastTwo >= 11 && lastTwo <= 14) {
    return "\u0441\u0435\u043A\u0443\u043D\u0434";
  }
  const lastDigit = absoluteValue % 10;
  if (lastDigit === 1) {
    return "\u0441\u0435\u043A\u0443\u043D\u0434\u0443";
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return "\u0441\u0435\u043A\u0443\u043D\u0434\u044B";
  }
  return "\u0441\u0435\u043A\u0443\u043D\u0434";
}

let database;
const readEnv$4 = (name) => {
  var _a, _b;
  return (_b = (_a = process.env[name]) == null ? void 0 : _a.trim()) != null ? _b : "";
};
const readNumberEnv = (name, fallback) => {
  const value = Number(readEnv$4(name));
  return Number.isFinite(value) ? value : fallback;
};
const DEFAULT_CONNECT_TIMEOUT = 5e3;
const DEFAULT_CONNECTION_LIMIT = 10;
const getDatabaseUrl = () => {
  const databaseUrl = readEnv$4("DATABASE_URL");
  if (!databaseUrl) {
    throw createError$1({
      statusCode: 500,
      statusMessage: "Database is not configured",
      message: "Missing DATABASE_URL"
    });
  }
  return databaseUrl;
};
const useDatabase = () => {
  if (!database) {
    database = new Kysely({
      dialect: new MysqlDialect({
        pool: createPool({
          uri: getDatabaseUrl(),
          waitForConnections: true,
          connectionLimit: readNumberEnv("DATABASE_CONNECTION_LIMIT", DEFAULT_CONNECTION_LIMIT),
          connectTimeout: readNumberEnv("DATABASE_CONNECT_TIMEOUT", DEFAULT_CONNECT_TIMEOUT)
        })
      })
    });
  }
  return database;
};

const DEFAULT_API_BASE_URL = "https://api.notificore.ru";
const DEFAULT_ONE_API_BASE_URL = "https://one-api.notificore.ru";
const DEFAULT_EMAIL_API_BASE_URL = DEFAULT_ONE_API_BASE_URL;
const DEFAULT_AUTH_TIMEOUT_MS = 2e4;
const DEFAULT_OTP_TIMEOUT_MS = 3e4;
const DEFAULT_VERIFY_TIMEOUT_MS = 2e4;
const DEFAULT_EMAIL_TIMEOUT_MS = 2e4;
const stripWrappingQuotes = (value) => value.length >= 2 && (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) ? value.slice(1, -1).trim() : value;
const readEnv$3 = (name) => {
  var _a, _b;
  return stripWrappingQuotes((_b = (_a = process.env[name]) == null ? void 0 : _a.trim()) != null ? _b : "");
};
const readNumber = (value, fallback) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};
const readPositiveNumber = (value, fallback) => {
  const numberValue = readNumber(value, fallback);
  return numberValue > 0 ? numberValue : fallback;
};
const getRuntimeString$1 = (value) => typeof value === "string" ? value.trim() : "";
const normalizeOneApiBaseUrl = (value) => value.replace(/^http:\/\/one-api\.notificore\.ru/i, "https://one-api.notificore.ru").replace(/\/$/, "");
const getNotificoreConfig = () => {
  var _a;
  const config = useRuntimeConfig();
  const notificore = (_a = config.notificore) != null ? _a : {};
  const apiKey = getRuntimeString$1(notificore.apiKey) || readEnv$3("NOTIFICORE_API_KEY");
  const sender = getRuntimeString$1(notificore.sender) || readEnv$3("NOTIFICORE_OTP_SENDER");
  const otpTemplateId = getRuntimeString$1(notificore.otpTemplateId) || readEnv$3("NOTIFICORE_OTP_TEMPLATE_ID");
  const templateId = readNumber(otpTemplateId, Number.NaN);
  const apiBaseUrl = (getRuntimeString$1(notificore.apiBaseUrl) || readEnv$3("NOTIFICORE_API_BASE_URL") || DEFAULT_API_BASE_URL).replace(/\/$/, "");
  const oneApiBaseUrl = normalizeOneApiBaseUrl(
    getRuntimeString$1(notificore.oneApiBaseUrl) || readEnv$3("NOTIFICORE_ONE_API_BASE_URL") || DEFAULT_ONE_API_BASE_URL
  );
  if (!apiKey) {
    throw createError$1({
      statusCode: 500,
      statusMessage: "Notificore is not configured",
      message: "Missing NOTIFICORE_API_KEY"
    });
  }
  if (!sender || !Number.isInteger(templateId)) {
    throw createError$1({
      statusCode: 500,
      statusMessage: "Notificore is not configured",
      message: "Missing NOTIFICORE_OTP_SENDER or integer NOTIFICORE_OTP_TEMPLATE_ID"
    });
  }
  return {
    apiKey,
    apiBaseUrl,
    oneApiBaseUrl,
    sender,
    otpTemplateId: templateId,
    codeDigits: readNumber(notificore.codeDigits || readEnv$3("NOTIFICORE_OTP_CODE_DIGITS"), 5),
    codeLifetime: readNumber(notificore.codeLifetime || readEnv$3("NOTIFICORE_OTP_CODE_LIFETIME"), 300),
    codeMaxTries: readNumber(notificore.codeMaxTries || readEnv$3("NOTIFICORE_OTP_CODE_MAX_TRIES"), 3),
    authTimeout: readPositiveNumber(
      notificore.authTimeout || readEnv$3("NOTIFICORE_AUTH_TIMEOUT_MS"),
      DEFAULT_AUTH_TIMEOUT_MS
    ),
    otpTimeout: readPositiveNumber(
      notificore.otpTimeout || readEnv$3("NOTIFICORE_OTP_TIMEOUT_MS"),
      DEFAULT_OTP_TIMEOUT_MS
    ),
    verifyTimeout: readPositiveNumber(
      notificore.verifyTimeout || readEnv$3("NOTIFICORE_VERIFY_TIMEOUT_MS"),
      DEFAULT_VERIFY_TIMEOUT_MS
    )
  };
};
const fetchNotificoreBearer = async ({ apiKey, apiBaseUrl, timeout, scope }) => {
  const response = await $fetch(`${apiBaseUrl}/api/auth/login`, {
    method: "POST",
    timeout,
    body: {
      api_key: apiKey
    }
  });
  if (!response.bearer) {
    throw createError$1({
      statusCode: 502,
      statusMessage: `Notificore ${scope} auth failed`,
      message: `Notificore ${scope} auth did not return bearer token`
    });
  }
  return response.bearer;
};
const parseMaybeJson = (value) => {
  if (typeof value !== "string") {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
const getNotificoreAuthenticationPayload = (result) => {
  var _a, _b, _c;
  const parsedResult = parseMaybeJson(result);
  return (_c = parseMaybeJson((_b = (_a = parsedResult == null ? void 0 : parsedResult.data) != null ? _a : parsedResult == null ? void 0 : parsedResult.result) != null ? _b : parsedResult)) != null ? _c : {};
};
const getNotificoreAuthenticationId = (data) => {
  var _a, _b, _c, _d, _e, _f;
  return (_f = (_e = (_d = (_c = (_b = (_a = data.id) != null ? _a : data.authenticationId) != null ? _b : data.authentication_id) != null ? _c : data.authId) != null ? _d : data.auth_id) != null ? _e : data.uuid) != null ? _f : null;
};
const assertSuccessfulNotificoreOtpResponse = (data) => {
  var _a;
  const error = String((_a = data.error) != null ? _a : "").trim();
  if (error && error !== "0") {
    throw createError$1({
      statusCode: 502,
      statusMessage: "Notificore request failed",
      message: data.errorDescription || data.error_description || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F"
    });
  }
  if (!getNotificoreAuthenticationId(data)) {
    console.error("[notificore/otp] Authentication id is missing in response:", data);
    throw createError$1({
      statusCode: 502,
      statusMessage: "Notificore request failed",
      message: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F"
    });
  }
};
const buildNotificoreOtpBody = ({ config, recipient, stringifyValues = false }) => {
  const formatValue = (value) => stringifyValues ? String(value) : value;
  return {
    recipient,
    channel: "sms",
    sender: config.sender,
    template_id: formatValue(config.otpTemplateId),
    code_digits: formatValue(config.codeDigits),
    code_lifetime: formatValue(config.codeLifetime),
    code_max_tries: formatValue(config.codeMaxTries)
  };
};
const sendNotificoreOneApiOtp = async ({ config, recipient }) => {
  const bearer = await fetchNotificoreBearer({
    apiKey: config.apiKey,
    apiBaseUrl: config.oneApiBaseUrl,
    timeout: config.authTimeout,
    scope: "otp"
  });
  const url = `${config.oneApiBaseUrl}/api/2fa/authentications/otp`;
  const body = buildNotificoreOtpBody({ config, recipient });
  console.info("[notificore/otp/one-api] Request:", {
    method: "POST",
    url,
    headers: {
      Authorization: "Bearer <redacted>",
      ContentType: "application/json"
    },
    body
  });
  try {
    const response = await $fetch.raw(url, {
      method: "POST",
      timeout: config.otpTimeout,
      headers: {
        "Authorization": `Bearer ${bearer}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body
    });
    const headers = Object.fromEntries(response.headers.entries());
    console.info("[notificore/otp/one-api] Response:", {
      status: response.status,
      statusText: response.statusText,
      headers: {
        contentType: headers["content-type"],
        contentLength: headers["content-length"]
      },
      data: response._data
    });
    return response._data;
  } catch (error) {
    console.error("[notificore/otp/one-api] Response error:", {
      status: (error == null ? void 0 : error.status) || (error == null ? void 0 : error.statusCode),
      statusMessage: error == null ? void 0 : error.statusMessage,
      data: error == null ? void 0 : error.data
    });
    throw error;
  }
};
const sendNotificoreLegacyOtp = async ({ config, recipient }) => {
  const url = `${config.apiBaseUrl}/api/2fa/authentications/otp`;
  const body = buildNotificoreOtpBody({ config, recipient, stringifyValues: true });
  console.info("[notificore/otp] Request:", {
    method: "POST",
    url,
    headers: {
      "X-API-KEY": config.apiKey,
      "ContentType": "application/json"
    },
    body
  });
  try {
    const response = await $fetch.raw(url, {
      method: "POST",
      timeout: config.otpTimeout,
      headers: {
        "X-API-KEY": config.apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body
    });
    const headers = Object.fromEntries(response.headers.entries());
    console.info("[notificore/otp] Response:", {
      status: response.status,
      statusText: response.statusText,
      headers: {
        contentType: headers["content-type"],
        contentLength: headers["content-length"]
      },
      data: response._data
    });
    return response._data;
  } catch (error) {
    console.error("[notificore/otp] Response error:", {
      status: (error == null ? void 0 : error.status) || (error == null ? void 0 : error.statusCode),
      statusMessage: error == null ? void 0 : error.statusMessage,
      data: error == null ? void 0 : error.data
    });
    throw error;
  }
};
const sendNotificoreOtp = async ({ phone }) => {
  const config = getNotificoreConfig();
  const recipient = String(phone != null ? phone : "").replace(/\D/g, "");
  try {
    return await sendNotificoreOneApiOtp({ config, recipient });
  } catch (error) {
    console.error("[notificore/otp] One API failed, falling back to legacy API:", {
      status: (error == null ? void 0 : error.status) || (error == null ? void 0 : error.statusCode),
      statusMessage: error == null ? void 0 : error.statusMessage,
      data: error == null ? void 0 : error.data
    });
  }
  return await sendNotificoreLegacyOtp({ config, recipient });
};
const verifyNotificoreOtp = async ({ authenticationId, code }) => {
  const config = getNotificoreConfig();
  try {
    const bearer = await fetchNotificoreBearer({
      apiKey: config.apiKey,
      apiBaseUrl: config.oneApiBaseUrl,
      timeout: config.authTimeout,
      scope: "otp"
    });
    return await $fetch(
      `${config.oneApiBaseUrl}/api/2fa/authentications/otp/${encodeURIComponent(authenticationId)}/verify`,
      {
        method: "POST",
        timeout: config.verifyTimeout,
        headers: {
          Authorization: `Bearer ${bearer}`
        },
        body: {
          access_code: code
        }
      }
    );
  } catch (error) {
    console.error("[notificore/otp/one-api/verify] Response error, falling back to legacy API:", {
      status: (error == null ? void 0 : error.status) || (error == null ? void 0 : error.statusCode),
      statusMessage: error == null ? void 0 : error.statusMessage,
      data: error == null ? void 0 : error.data
    });
  }
  return await $fetch(
    `${config.apiBaseUrl}/api/2fa/authentications/otp/${encodeURIComponent(authenticationId)}/verify`,
    {
      method: "POST",
      timeout: config.verifyTimeout,
      headers: {
        "X-API-KEY": config.apiKey
      },
      body: {
        access_code: code
      }
    }
  );
};
const getNotificoreEmailConfig = () => {
  var _a;
  const config = useRuntimeConfig();
  const notificore = (_a = config.notificore) != null ? _a : {};
  const apiKey = getRuntimeString$1(notificore.emailApiKey) || readEnv$3("NOTIFICORE_EMAIL_API_KEY") || getRuntimeString$1(notificore.apiKey) || readEnv$3("NOTIFICORE_API_KEY");
  const from = getRuntimeString$1(notificore.emailFrom) || readEnv$3("NOTIFICORE_EMAIL_FROM");
  const emailTemplateId = getRuntimeString$1(notificore.confirmationEmailTemplateId) || readEnv$3("NOTIFICORE_CONFIRMATION_EMAIL_TEMPLATE_ID") || getRuntimeString$1(notificore.emailTemplateId) || readEnv$3("NOTIFICORE_EMAIL_TEMPLATE_ID");
  const templateId = readNumber(emailTemplateId, Number.NaN);
  const apiBaseUrl = getRuntimeString$1(notificore.emailApiBaseUrl) || readEnv$3("NOTIFICORE_EMAIL_API_BASE_URL") || DEFAULT_EMAIL_API_BASE_URL;
  if (!apiKey || !from || !Number.isInteger(templateId)) {
    throw createError$1({
      statusCode: 500,
      statusMessage: "Notificore email is not configured",
      message: "Missing NOTIFICORE_EMAIL_API_KEY/NOTIFICORE_API_KEY, NOTIFICORE_EMAIL_FROM or integer NOTIFICORE_CONFIRMATION_EMAIL_TEMPLATE_ID"
    });
  }
  return {
    apiKey,
    from,
    templateId,
    apiBaseUrl: normalizeOneApiBaseUrl(apiBaseUrl),
    emailTimeout: readPositiveNumber(
      notificore.emailTimeout || readEnv$3("NOTIFICORE_EMAIL_TIMEOUT_MS"),
      DEFAULT_EMAIL_TIMEOUT_MS
    )
  };
};
const sendNotificoreEmail = async ({ to, subject, templateContent = {}, inlines = [] }) => {
  const config = getNotificoreEmailConfig();
  const bearer = await fetchNotificoreBearer({
    apiKey: config.apiKey,
    apiBaseUrl: config.apiBaseUrl,
    timeout: config.emailTimeout,
    scope: "email"
  });
  const recipients = Array.isArray(to) ? to : [to];
  const payload = {
    to: recipients,
    from: config.from,
    template_id: config.templateId,
    subject,
    template_content: templateContent
  };
  if (inlines.length) {
    payload.inlines = inlines;
  }
  const url = `${config.apiBaseUrl}/api/email/send-template-emails`;
  console.info("[notificore/email] Send request:", {
    method: "POST",
    url,
    headers: {
      Authorization: "Bearer <redacted>"
    },
    body: payload
  });
  let response;
  try {
    response = await $fetch.raw(url, {
      method: "POST",
      timeout: config.emailTimeout,
      headers: {
        Authorization: `Bearer ${bearer}`
      },
      body: payload
    });
  } catch (error) {
    console.error("[notificore/email] Send failed:", {
      status: (error == null ? void 0 : error.status) || (error == null ? void 0 : error.statusCode),
      statusMessage: error == null ? void 0 : error.statusMessage,
      data: error == null ? void 0 : error.data,
      request: {
        method: "POST",
        url,
        headers: {
          Authorization: "Bearer <redacted>"
        },
        body: payload
      }
    });
    throw error;
  }
  return {
    status: response.status,
    statusText: response.statusText,
    data: response._data,
    to: recipients,
    from: config.from,
    templateId: config.templateId
  };
};
const isNotificoreTimeoutError = (error) => {
  var _a, _b;
  return (error == null ? void 0 : error.name) === "TimeoutError" || (error == null ? void 0 : error.code) === 23 || ((_a = error == null ? void 0 : error.cause) == null ? void 0 : _a.name) === "TimeoutError" || ((_b = error == null ? void 0 : error.cause) == null ? void 0 : _b.code) === 23;
};

var _a, _b, _c;
const runtimeConfig = useRuntimeConfig();
const readEnv$2 = (name) => {
  var _a2;
  return ((_a2 = process.env[name]) == null ? void 0 : _a2.trim()) || "";
};
const betterAuthUrl = ((_a = runtimeConfig.betterAuth) == null ? void 0 : _a.url) || readEnv$2("BETTER_AUTH_URL");
const betterAuthSecret = ((_b = runtimeConfig.betterAuth) == null ? void 0 : _b.secret) || readEnv$2("BETTER_AUTH_SECRET");
const betterAuthTrustedOrigins = [
  "https://ra-indigo.com",
  String(((_c = runtimeConfig.betterAuth) == null ? void 0 : _c.trustedOrigins) || ""),
  readEnv$2("BETTER_AUTH_TRUSTED_ORIGINS")
].join(",").split(",").map((origin) => origin.trim().replace(/\/$/, "")).filter(Boolean);
const auth = betterAuth({
  database: {
    db: useDatabase(),
    type: "mysql"
  },
  basePath: "/api/auth",
  baseURL: betterAuthUrl || void 0,
  secret: betterAuthSecret || void 0,
  trustedOrigins: betterAuthTrustedOrigins,
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      const resetUrl = new URL("/profile", url);
      resetUrl.searchParams.set("passwordReset", "1");
      resetUrl.searchParams.set("token", token);
      await sendNotificoreEmail({
        to: [user.email],
        subject: "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F \u0418\u043D\u0434\u0438\u0433\u043E",
        templateContent: {
          confirmationUrl: resetUrl.href,
          profileUrl: resetUrl.href
        }
      });
    }
  },
  plugins: [
    phoneNumber({
      requireVerification: false,
      phoneNumberValidator: isAuthPhone,
      sendOTP: async () => {
      }
    })
  ],
  user: {
    deleteUser: {
      enabled: true
    },
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: false,
        unique: true,
        returned: true,
        input: true
      },
      phoneNumberVerified: {
        type: "boolean",
        required: false,
        defaultValue: false,
        returned: true,
        input: false
      }
    }
  }
});

const DEFAULT_SUGGEST_URL = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
const readEnv$1 = (name) => {
  var _a, _b;
  return (_b = (_a = process.env[name]) == null ? void 0 : _a.trim()) != null ? _b : "";
};
const getRuntimeString = (value) => typeof value === "string" ? value.trim() : "";
const getDadataConfig = () => {
  var _a;
  const config = useRuntimeConfig();
  const dadata = (_a = config.dadata) != null ? _a : {};
  const apiKey = getRuntimeString(dadata.apiKey) || readEnv$1("DADATA_API_KEY");
  const suggestUrl = getRuntimeString(dadata.suggestUrl) || readEnv$1("DADATA_SUGGEST_URL") || DEFAULT_SUGGEST_URL;
  if (!apiKey) {
    throw createError$1({
      statusCode: 500,
      statusMessage: "DaData is not configured",
      message: "Missing DADATA_API_KEY"
    });
  }
  return {
    apiKey,
    suggestUrl
  };
};
const mapPartySuggestion = (suggestion) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const data = (_a = suggestion.data) != null ? _a : {};
  const name = (_b = data.name) != null ? _b : {};
  const address = (_c = data.address) != null ? _c : {};
  const state = (_d = data.state) != null ? _d : {};
  return {
    value: (_e = suggestion.value) != null ? _e : "",
    unrestrictedValue: (_f = suggestion.unrestricted_value) != null ? _f : "",
    name: name.short_with_opf || name.full_with_opf || suggestion.value || "",
    inn: (_g = data.inn) != null ? _g : "",
    kpp: (_h = data.kpp) != null ? _h : "",
    ogrn: (_i = data.ogrn) != null ? _i : "",
    address: (_j = address.value) != null ? _j : "",
    type: (_k = data.type) != null ? _k : "",
    stateStatus: (_l = state.status) != null ? _l : ""
  };
};
const suggestDadataParties = async ({ query, count = 5 }) => {
  var _a;
  const config = getDadataConfig();
  const response = await $fetch(config.suggestUrl, {
    method: "POST",
    timeout: 1e4,
    headers: {
      "authorization": `Token ${config.apiKey}`,
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: {
      query,
      count
    }
  });
  return ((_a = response.suggestions) != null ? _a : []).map(mapPartySuggestion);
};

const PAYMENT_PROVIDER = "vtb_sbp";
function toJson(value) {
  return JSON.stringify(value != null ? value : null);
}
function normalizePaymentStatus(status) {
  return ["pending", "paid", "failed", "expired", "cancelled"].includes(status) ? status : "pending";
}
async function getOrderPayment(database, paymentId) {
  return database.selectFrom("order_payments").selectAll().where("id", "=", paymentId).executeTakeFirst();
}
async function updateOrderPaymentStatus(database, paymentId, status, patch = {}) {
  const normalizedStatus = normalizePaymentStatus(status);
  const now = /* @__PURE__ */ new Date();
  const update = {
    ...patch,
    status: normalizedStatus,
    last_checked_at: now,
    updated_at: now
  };
  if (normalizedStatus === "paid" && !patch.paid_at) {
    update.paid_at = now;
  }
  await database.updateTable("order_payments").set(update).where("id", "=", paymentId).execute();
}
async function saveVtbRegistration(database, paymentId, response) {
  var _a;
  await database.updateTable("order_payments").set({
    vtb_md_order: response.orderId,
    vtb_form_url: (_a = response.formUrl) != null ? _a : null,
    vtb_register_response: toJson(response),
    updated_at: /* @__PURE__ */ new Date()
  }).where("id", "=", paymentId).execute();
}
async function saveVtbQr(database, paymentId, response, expiresAt) {
  var _a, _b, _c, _d;
  await database.updateTable("order_payments").set({
    vtb_qr_id: response.qrId,
    vtb_qr_payload: (_a = response.payload) != null ? _a : null,
    vtb_qr_image: (_b = response.renderedQr) != null ? _b : null,
    vtb_qr_status: (_d = (_c = response.qrStatus) != null ? _c : response.status) != null ? _d : null,
    vtb_qr_response: toJson(response),
    expires_at: expiresAt,
    updated_at: /* @__PURE__ */ new Date()
  }).where("id", "=", paymentId).execute();
}
async function createPendingOrderPayment(database, { orderId, orderNumber, amount }) {
  const result = await database.insertInto("order_payments").values({
    order_id: orderId,
    provider: PAYMENT_PROVIDER,
    status: "pending",
    amount,
    currency: "RUB",
    order_number: orderNumber
  }).executeTakeFirst();
  return Number(result.insertId);
}

const ACTIVE_STATUS = "active";
const SUPPORTED_RULE_TYPES = /* @__PURE__ */ new Set([
  "base_price",
  "tier_price",
  "discount",
  "fixed_option",
  "percent_option",
  "multiplier"
]);
function toNullableString(value) {
  return value == null ? null : String(value);
}
function parseDecimalToMinorUnits(value) {
  if (value == null || value === "") {
    return null;
  }
  const normalized = String(value).trim().replace(",", ".");
  if (!/^-?\d+(\.\d{1,4})?$/.test(normalized)) {
    return null;
  }
  return Math.round(Number(normalized) * 100);
}
function parseFactor(value) {
  if (value == null || value === "") {
    return null;
  }
  const parsed = Number(String(value).trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}
function toMoneyResponse(minorUnits) {
  const amount = minorUnits / 100;
  return Number.isInteger(amount) ? amount : Number(amount.toFixed(2));
}
function assertProductsTableExists(error) {
  const tableMissingCodes = /* @__PURE__ */ new Set(["ER_NO_SUCH_TABLE", "ER_BAD_TABLE_ERROR"]);
  if (tableMissingCodes.has(error == null ? void 0 : error.code)) {
    throw createError$1({
      statusCode: 500,
      statusMessage: "Products table is not configured",
      message: "\u0412 \u0431\u0430\u0437\u0435 \u0435\u0449\u0451 \u043D\u0435\u0442 \u0442\u0430\u0431\u043B\u0438\u0446 products/product_price_rules. \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u0435 migration 003_create_product_tables.sql."
    });
  }
  throw error;
}
function mapPriceRule(rule) {
  var _a;
  return {
    id: Number(rule.id),
    type: rule.type,
    key: toNullableString(rule.key),
    label: rule.label,
    size: toNullableString(rule.size),
    min_quantity: rule.min_quantity == null ? null : Number(rule.min_quantity),
    max_quantity: rule.max_quantity == null ? null : Number(rule.max_quantity),
    price: rule.price == null ? null : String(rule.price),
    percent: rule.percent == null ? null : String(rule.percent),
    factor: rule.factor == null ? null : String(rule.factor),
    sort: Number((_a = rule.sort) != null ? _a : 0)
  };
}
function mapProduct(product, priceRules) {
  return {
    id: Number(product.id),
    category: product.category,
    name: product.name,
    slug: product.slug,
    status: product.status,
    price_from: toNullableString(product.price_from),
    price_unit: toNullableString(product.price_unit),
    min_circulation: toNullableString(product.min_circulation),
    production_time: toNullableString(product.production_time),
    formats_sizes: toNullableString(product.formats_sizes),
    materials: toNullableString(product.materials),
    additional_options: toNullableString(product.additional_options),
    short_description: toNullableString(product.short_description),
    photo_url: toNullableString(product.photo_url),
    seo: {
      title: toNullableString(product.seo_title),
      description: toNullableString(product.seo_description)
    },
    price_rules: priceRules.map(mapPriceRule)
  };
}
async function listProductRules(database, productIds) {
  var _a;
  if (!productIds.length) {
    return /* @__PURE__ */ new Map();
  }
  const rows = await database.selectFrom("product_price_rules").select([
    "id",
    "product_id",
    "type",
    "key",
    "label",
    "size",
    "min_quantity",
    "max_quantity",
    "price",
    "percent",
    "factor",
    "sort"
  ]).where("product_id", "in", productIds).orderBy("product_id", "asc").orderBy("sort", "asc").orderBy("id", "asc").execute();
  const grouped = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const key = Number(row.product_id);
    const current = (_a = grouped.get(key)) != null ? _a : [];
    current.push(row);
    grouped.set(key, current);
  }
  return grouped;
}
async function getProducts(database, category) {
  try {
    let query = database.selectFrom("products").select([
      "id",
      "category",
      "name",
      "slug",
      "status",
      "price_from",
      "price_unit",
      "min_circulation",
      "production_time",
      "formats_sizes",
      "materials",
      "additional_options",
      "short_description",
      "photo_url",
      "seo_title",
      "seo_description"
    ]).where("status", "=", ACTIVE_STATUS);
    if (category) {
      query = query.where("category", "=", category);
    }
    const products = await query.orderBy("category", "asc").orderBy("name", "asc").execute();
    const productIds = products.map((product) => Number(product.id));
    const rulesByProductId = await listProductRules(database, productIds);
    return products.map((product) => {
      var _a;
      return mapProduct(product, (_a = rulesByProductId.get(Number(product.id))) != null ? _a : []);
    });
  } catch (error) {
    assertProductsTableExists(error);
  }
}
async function getProductBySlug(database, slug) {
  var _a;
  try {
    const product = await database.selectFrom("products").select([
      "id",
      "category",
      "name",
      "slug",
      "status",
      "price_from",
      "price_unit",
      "min_circulation",
      "production_time",
      "formats_sizes",
      "materials",
      "additional_options",
      "short_description",
      "photo_url",
      "seo_title",
      "seo_description"
    ]).where("slug", "=", slug).where("status", "=", ACTIVE_STATUS).executeTakeFirst();
    if (!product) {
      return null;
    }
    const rulesByProductId = await listProductRules(database, [Number(product.id)]);
    return mapProduct(product, (_a = rulesByProductId.get(Number(product.id))) != null ? _a : []);
  } catch (error) {
    assertProductsTableExists(error);
  }
}
function matchesQuantity(rule, quantity) {
  const min = rule.min_quantity == null ? null : Number(rule.min_quantity);
  const max = rule.max_quantity == null ? null : Number(rule.max_quantity);
  if (min != null && quantity < min) {
    return false;
  }
  if (max != null && quantity > max) {
    return false;
  }
  return true;
}
function pickBasePriceRule(priceRules, quantity, size) {
  var _a, _b, _c;
  const baseRules = priceRules.filter((rule) => rule.type === "base_price");
  const tierRules = priceRules.filter((rule) => rule.type === "tier_price");
  const hasSizedBaseRules = baseRules.some((rule) => rule.size);
  let selectedBaseRule = null;
  if (hasSizedBaseRules) {
    if (!size) {
      throw createError$1({
        statusCode: 400,
        statusMessage: "Missing product size",
        message: "\u0414\u043B\u044F \u0440\u0430\u0441\u0447\u0451\u0442\u0430 \u044D\u0442\u043E\u0433\u043E \u0442\u043E\u0432\u0430\u0440\u0430 \u043D\u0443\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C size"
      });
    }
    selectedBaseRule = (_a = baseRules.find((rule) => rule.size === size)) != null ? _a : null;
  } else {
    selectedBaseRule = (_b = baseRules[0]) != null ? _b : null;
  }
  if (!selectedBaseRule) {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Missing base price rule",
      message: "\u0414\u043B\u044F \u0442\u043E\u0432\u0430\u0440\u0430 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u0430 \u0431\u0430\u0437\u043E\u0432\u0430\u044F \u0446\u0435\u043D\u0430"
    });
  }
  const basePrice = parseDecimalToMinorUnits(selectedBaseRule.price);
  if (basePrice == null) {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Invalid base price rule",
      message: "\u0423 \u0442\u043E\u0432\u0430\u0440\u0430 \u0443\u043A\u0430\u0437\u0430\u043D\u043E \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u043E \u0431\u0430\u0437\u043E\u0432\u043E\u0439 \u0446\u0435\u043D\u044B"
    });
  }
  const matchingTierRules = tierRules.filter((rule) => {
    if (rule.size && rule.size !== size) {
      return false;
    }
    if (rule.key && selectedBaseRule.key && rule.key !== selectedBaseRule.key) {
      return false;
    }
    return matchesQuantity(rule, quantity);
  });
  const selectedTierRule = (_c = matchingTierRules.sort((left, right) => {
    var _a2, _b2;
    const leftMin = left.min_quantity == null ? -1 : Number(left.min_quantity);
    const rightMin = right.min_quantity == null ? -1 : Number(right.min_quantity);
    if (leftMin !== rightMin) {
      return rightMin - leftMin;
    }
    return Number((_a2 = left.sort) != null ? _a2 : 0) - Number((_b2 = right.sort) != null ? _b2 : 0);
  })[0]) != null ? _c : null;
  const tierPrice = selectedTierRule ? parseDecimalToMinorUnits(selectedTierRule.price) : null;
  const unitPrice = tierPrice != null ? tierPrice : basePrice;
  const effectiveRule = selectedTierRule != null ? selectedTierRule : selectedBaseRule;
  return {
    effectiveRule,
    unitPrice
  };
}
function getSelectedOptionRules(priceRules, optionKeys) {
  const selectedKeys = new Set(optionKeys);
  return priceRules.filter((rule) => {
    if (!selectedKeys.has(rule.key)) {
      return false;
    }
    return ["fixed_option", "percent_option", "multiplier"].includes(rule.type);
  });
}
function assertKnownOptions(selectedOptionRules, optionKeys) {
  const configuredKeys = new Set(selectedOptionRules.map((rule) => rule.key));
  const unknownKeys = optionKeys.filter((key) => !configuredKeys.has(key));
  if (unknownKeys.length) {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Unknown product options",
      message: `\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0435 \u043E\u043F\u0446\u0438\u0438: ${unknownKeys.join(", ")}`
    });
  }
}
function calculateProductPrice(product, payload) {
  const quantity = Number(payload == null ? void 0 : payload.quantity);
  const size = (payload == null ? void 0 : payload.size) == null ? null : String(payload.size);
  const optionKeys = Array.isArray(payload == null ? void 0 : payload.options) ? payload.options.map((option) => String(option)) : [];
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Invalid quantity",
      message: "quantity \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0446\u0435\u043B\u044B\u043C \u0447\u0438\u0441\u043B\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u0435 0"
    });
  }
  const unsupportedRule = product.price_rules.find((rule) => !SUPPORTED_RULE_TYPES.has(rule.type));
  if (unsupportedRule) {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Unsupported price rule type",
      message: `\u041D\u0435\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043C\u044B\u0439 \u0442\u0438\u043F \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u0446\u0435\u043D\u044B: ${unsupportedRule.type}`
    });
  }
  const { effectiveRule, unitPrice } = pickBasePriceRule(product.price_rules, quantity, size);
  const lines = [];
  let subtotal = unitPrice * quantity;
  lines.push({
    label: effectiveRule.label,
    amount: toMoneyResponse(subtotal)
  });
  const selectedOptionRules = getSelectedOptionRules(product.price_rules, optionKeys);
  assertKnownOptions(selectedOptionRules, optionKeys);
  const fixedOptionRules = selectedOptionRules.filter((rule) => rule.type === "fixed_option");
  const percentOptionRules = selectedOptionRules.filter((rule) => rule.type === "percent_option");
  const multiplierRules = selectedOptionRules.filter((rule) => rule.type === "multiplier");
  const discountRules = product.price_rules.filter((rule) => rule.type === "discount" && matchesQuantity(rule, quantity));
  for (const rule of fixedOptionRules) {
    const optionPrice = parseDecimalToMinorUnits(rule.price);
    if (optionPrice == null) {
      throw createError$1({
        statusCode: 400,
        statusMessage: "Invalid fixed option rule",
        message: `\u0423 \u043E\u043F\u0446\u0438\u0438 "${rule.label}" \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u0430 \u0446\u0435\u043D\u0430`
      });
    }
    const amount = optionPrice * quantity;
    subtotal += amount;
    lines.push({
      label: rule.label,
      amount: toMoneyResponse(amount)
    });
  }
  for (const rule of percentOptionRules) {
    const percent = parseFactor(rule.percent);
    if (percent == null) {
      throw createError$1({
        statusCode: 400,
        statusMessage: "Invalid percent option rule",
        message: `\u0423 \u043E\u043F\u0446\u0438\u0438 "${rule.label}" \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D \u043F\u0440\u043E\u0446\u0435\u043D\u0442`
      });
    }
    const amount = Math.round(subtotal * (percent / 100));
    subtotal += amount;
    lines.push({
      label: rule.label,
      amount: toMoneyResponse(amount)
    });
  }
  for (const rule of multiplierRules) {
    const factor = parseFactor(rule.factor);
    if (factor == null) {
      throw createError$1({
        statusCode: 400,
        statusMessage: "Invalid multiplier rule",
        message: `\u0423 \u043E\u043F\u0446\u0438\u0438 "${rule.label}" \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D \u043C\u043D\u043E\u0436\u0438\u0442\u0435\u043B\u044C`
      });
    }
    const amount = Math.round(subtotal * (factor - 1));
    subtotal += amount;
    lines.push({
      label: rule.label,
      amount: toMoneyResponse(amount)
    });
  }
  for (const rule of discountRules) {
    const percent = parseFactor(rule.percent);
    if (percent == null) {
      throw createError$1({
        statusCode: 400,
        statusMessage: "Invalid discount rule",
        message: `\u0423 \u0441\u043A\u0438\u0434\u043A\u0438 "${rule.label}" \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D \u043F\u0440\u043E\u0446\u0435\u043D\u0442`
      });
    }
    const amount = -Math.round(subtotal * (percent / 100));
    subtotal += amount;
    lines.push({
      label: rule.label,
      amount: toMoneyResponse(amount)
    });
  }
  return {
    total: toMoneyResponse(subtotal),
    unit_price: toMoneyResponse(Math.round(subtotal / quantity)),
    quantity,
    currency: "RUB",
    lines
  };
}

const attempts = /* @__PURE__ */ new Map();
const CLEANUP_INTERVAL_MS = 5 * 60 * 1e3;
let lastCleanup = Date.now();
function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) {
    return;
  }
  const cutoff = now - CLEANUP_INTERVAL_MS;
  for (const [key, timestamp] of attempts) {
    if (timestamp < cutoff) {
      attempts.delete(key);
    }
  }
  lastCleanup = now;
}
function assertRateLimit(key, windowMs = 6e4) {
  cleanup();
  const now = Date.now();
  const last = attempts.get(key);
  if (last && now - last < windowMs) {
    throw createError$1({
      statusCode: 429,
      statusMessage: "Too many requests",
      message: "\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u043A\u043E\u0434\u0430 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u0430 \u043D\u0435 \u0447\u0430\u0449\u0435 \u0440\u0430\u0437\u0430 \u0432 \u043C\u0438\u043D\u0443\u0442\u0443"
    });
  }
  attempts.set(key, now);
}

const DEFAULT_BASE_URL = "https://vtb.rbsuat.com/payment/rest/";
const DEFAULT_QR_TTL_SECONDS = 900;
const PAID_QR_STATUSES = /* @__PURE__ */ new Set(["ACCEPTED", "ACWP"]);
const FAILED_QR_STATUSES = /* @__PURE__ */ new Set(["REJECTED", "RJCT", "REJECTED_BY_USER"]);
const readEnv = (name) => {
  var _a, _b;
  return (_b = (_a = process.env[name]) == null ? void 0 : _a.trim()) != null ? _b : "";
};
function readConfigValue(config, key, envName) {
  var _a;
  return readEnv(envName) || ((_a = config.vtbPayment) == null ? void 0 : _a[key]) || "";
}
function getVtbPaymentConfig() {
  const config = useRuntimeConfig();
  const baseUrl = readConfigValue(config, "baseUrl", "VTB_PAYMENT_BASE_URL") || DEFAULT_BASE_URL;
  const qrTtlSeconds = Number(readConfigValue(config, "qrTtlSeconds", "VTB_PAYMENT_QR_TTL_SECONDS"));
  return {
    baseUrl: baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`,
    token: readConfigValue(config, "token", "VTB_PAYMENT_TOKEN"),
    userName: readConfigValue(config, "userName", "VTB_PAYMENT_USERNAME"),
    password: readConfigValue(config, "password", "VTB_PAYMENT_PASSWORD"),
    returnUrl: readConfigValue(config, "returnUrl", "VTB_PAYMENT_RETURN_URL"),
    failUrl: readConfigValue(config, "failUrl", "VTB_PAYMENT_FAIL_URL"),
    callbackUrl: readConfigValue(config, "callbackUrl", "VTB_PAYMENT_CALLBACK_URL"),
    qrTtlSeconds: Number.isFinite(qrTtlSeconds) && qrTtlSeconds > 0 ? qrTtlSeconds : DEFAULT_QR_TTL_SECONDS
  };
}
function getAuthParams(config) {
  if (config.token) {
    return { token: config.token };
  }
  return getPasswordAuthParams(config);
}
function getPasswordAuthParams(config) {
  if (config.userName && config.password) {
    return {
      userName: config.userName,
      password: config.password
    };
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: "VTB payment is not configured",
    message: "\u041D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u044B \u0440\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u044B \u0412\u0422\u0411 \u0434\u043B\u044F \u043E\u043F\u043B\u0430\u0442\u044B"
  });
}
function assertReturnUrls(config) {
  if (!config.returnUrl) {
    throw createError$1({
      statusCode: 500,
      statusMessage: "VTB return URL is not configured",
      message: "\u041D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D VTB_PAYMENT_RETURN_URL"
    });
  }
}
async function requestVtb(method, params, options = {}) {
  const config = getVtbPaymentConfig();
  const body = new URLSearchParams();
  const authParams = options.requirePasswordAuth ? getPasswordAuthParams(config) : getAuthParams(config);
  for (const [key, value] of Object.entries({ ...authParams, ...params })) {
    if (value !== void 0 && value !== null && value !== "") {
      body.append(key, String(value));
    }
  }
  const response = await fetch(`${config.baseUrl}${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!response.ok) {
    throw createError$1({
      statusCode: 502,
      statusMessage: "VTB request failed",
      message: `\u0412\u0422\u0411 \u0432\u0435\u0440\u043D\u0443\u043B HTTP ${response.status}`,
      data
    });
  }
  return data;
}
function assertVtbSuccess(data, fallbackMessage) {
  const hasErrorCode = (data == null ? void 0 : data.errorCode) !== void 0 && (data == null ? void 0 : data.errorCode) !== null;
  const isError = (data == null ? void 0 : data.success) === false || hasErrorCode && String(data.errorCode) !== "0";
  if (isError) {
    throw createError$1({
      statusCode: 502,
      statusMessage: "VTB payment failed",
      message: (data == null ? void 0 : data.errorMessage) || fallbackMessage,
      data
    });
  }
}
function getPaymentStatusFromVtbQr(qrStatus, transactionState) {
  const normalizedQrStatus = String(qrStatus || "").toUpperCase();
  const normalizedTransactionState = String(transactionState || "").toUpperCase();
  if (PAID_QR_STATUSES.has(normalizedQrStatus) || normalizedTransactionState === "DEPOSITED") {
    return "paid";
  }
  if (FAILED_QR_STATUSES.has(normalizedQrStatus)) {
    return "failed";
  }
  return "pending";
}
function getVtbQrExpiresAt() {
  const config = getVtbPaymentConfig();
  return new Date(Date.now() + config.qrTtlSeconds * 1e3);
}
async function registerVtbOrder({ orderNumber, amountMinor, description, ip }) {
  const config = getVtbPaymentConfig();
  assertReturnUrls(config);
  const data = await requestVtb("register.do", {
    orderNumber,
    amount: amountMinor,
    currency: "643",
    returnUrl: config.returnUrl,
    failUrl: config.failUrl,
    dynamicCallbackUrl: config.callbackUrl,
    description,
    language: "ru",
    ip
  });
  assertVtbSuccess(data, "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0437\u0430\u043A\u0430\u0437 \u0432 \u0412\u0422\u0411");
  if (!data.orderId) {
    throw createError$1({
      statusCode: 502,
      statusMessage: "VTB order id is missing",
      message: "\u0412\u0422\u0411 \u043D\u0435 \u0432\u0435\u0440\u043D\u0443\u043B \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u043A\u0430\u0437\u0430",
      data
    });
  }
  return data;
}
async function getVtbDynamicQr(mdOrder) {
  const data = await requestVtb("sbp/c2b/qr/dynamic/get.do", {
    mdOrder,
    qrHeight: 512,
    qrWidth: 512,
    qrFormat: "image"
  }, {
    requirePasswordAuth: true
  });
  assertVtbSuccess(data, "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C QR-\u043A\u043E\u0434 \u0421\u0411\u041F");
  if (!data.qrId || !data.renderedQr && !data.payload) {
    throw createError$1({
      statusCode: 502,
      statusMessage: "VTB QR payload is missing",
      message: "\u0412\u0422\u0411 \u043D\u0435 \u0432\u0435\u0440\u043D\u0443\u043B \u0434\u0430\u043D\u043D\u044B\u0435 QR-\u043A\u043E\u0434\u0430",
      data
    });
  }
  return data;
}
async function getVtbDynamicQrStatus({ mdOrder, qrId }) {
  const data = await requestVtb("sbp/c2b/qr/status.do", {
    mdOrder,
    qrId
  }, {
    requirePasswordAuth: true
  });
  assertVtbSuccess(data, "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u0442\u0430\u0442\u0443\u0441 QR-\u043A\u043E\u0434\u0430 \u0421\u0411\u041F");
  return data;
}

const collections = {
  'lucide': () => import('../_/icons.mjs').then(m => m.default),
  'simple-icons': () => import('../_/icons2.mjs').then(m => m.default),
};

const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _nTbyxj = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError$1({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      consola.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    consola.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError$1({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola.error(e);
      if (e.status === 404)
        return createError$1({ status: 404 });
      else
        return createError$1({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError$1({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash$1(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _lazy_tcfQPD = () => import('../routes/api/auth-identifier.post.mjs');
const _lazy_7dwPcY = () => import('../routes/api/auth/_...all_.mjs');
const _lazy_x8S6Z5 = () => import('../routes/api/auth/password-recovery/request-code.post.mjs');
const _lazy_iM6PMI = () => import('../routes/api/auth/request-code.post.mjs');
const _lazy_7yraPe = () => import('../routes/api/auth/verify-code.post.mjs');
const _lazy_LBdnb_ = () => import('../routes/api/dadata/party-suggest.post.mjs');
const _lazy_v0T1U7 = () => import('../routes/api/organizations.post.mjs');
const _lazy_hYnqLN = () => import('../routes/api/organizations/_organizationId_.delete.mjs');
const _lazy_u6U_ey = () => import('../routes/api/organizations/_organizationId/active.patch.mjs');
const _lazy__RsLdI = () => import('../routes/api/payments/_paymentId/status.get.mjs');
const _lazy_mZH6FC = () => import('../routes/api/payments/vtb-sbp/callback.get.mjs');
const _lazy_LNpv6e = () => import('../routes/api/payments/vtb-sbp/start.post.mjs');
const _lazy_nUlvZH = () => import('../routes/api/products/_slug_.get.mjs');
const _lazy_grurLT = () => import('../routes/api/products/_slug/calculate.post.mjs');
const _lazy_vBnjRi = () => import('../routes/api/index.get.mjs');
const _lazy_9g1lXD = () => import('../routes/api/profile.get.mjs');
const _lazy_wG8ueg = () => import('../routes/api/profile.patch.mjs');
const _lazy_58UI9t = () => import('../routes/api/profile/email.patch.mjs');
const _lazy_SuV5P9 = () => import('../routes/api/profile/email/confirm.get.mjs');
const _lazy_5QpC0U = () => import('../routes/api/profile/email/confirmation.post.mjs');
const _lazy_GaJmRW = () => import('../routes/api/profile/phone.patch.mjs');
const _lazy_cPKJ1M = () => import('../routes/api/profile/phone/request-code.post.mjs');
const _lazy_w7b8m7 = () => import('../routes/api/profile/recipients.post.mjs');
const _lazy_xihqdX = () => import('../routes/api/profile/recipients/_recipientId_.delete.mjs');
const _lazy_0lYn3n = () => import('../routes/api/working-day.get.mjs');
const _lazy_Wx9lXO = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _bqhKCW, lazy: false, middleware: true, method: undefined },
  { route: '/api/auth-identifier', handler: _lazy_tcfQPD, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/**:all', handler: _lazy_7dwPcY, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/password-recovery/request-code', handler: _lazy_x8S6Z5, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/request-code', handler: _lazy_iM6PMI, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/verify-code', handler: _lazy_7yraPe, lazy: true, middleware: false, method: "post" },
  { route: '/api/dadata/party-suggest', handler: _lazy_LBdnb_, lazy: true, middleware: false, method: "post" },
  { route: '/api/organizations', handler: _lazy_v0T1U7, lazy: true, middleware: false, method: "post" },
  { route: '/api/organizations/:organizationId', handler: _lazy_hYnqLN, lazy: true, middleware: false, method: "delete" },
  { route: '/api/organizations/:organizationId/active', handler: _lazy_u6U_ey, lazy: true, middleware: false, method: "patch" },
  { route: '/api/payments/:paymentId/status', handler: _lazy__RsLdI, lazy: true, middleware: false, method: "get" },
  { route: '/api/payments/vtb-sbp/callback', handler: _lazy_mZH6FC, lazy: true, middleware: false, method: "get" },
  { route: '/api/payments/vtb-sbp/start', handler: _lazy_LNpv6e, lazy: true, middleware: false, method: "post" },
  { route: '/api/products/:slug', handler: _lazy_nUlvZH, lazy: true, middleware: false, method: "get" },
  { route: '/api/products/:slug/calculate', handler: _lazy_grurLT, lazy: true, middleware: false, method: "post" },
  { route: '/api/products', handler: _lazy_vBnjRi, lazy: true, middleware: false, method: "get" },
  { route: '/api/profile', handler: _lazy_9g1lXD, lazy: true, middleware: false, method: "get" },
  { route: '/api/profile', handler: _lazy_wG8ueg, lazy: true, middleware: false, method: "patch" },
  { route: '/api/profile/email', handler: _lazy_58UI9t, lazy: true, middleware: false, method: "patch" },
  { route: '/api/profile/email/confirm', handler: _lazy_SuV5P9, lazy: true, middleware: false, method: "get" },
  { route: '/api/profile/email/confirmation', handler: _lazy_5QpC0U, lazy: true, middleware: false, method: "post" },
  { route: '/api/profile/phone', handler: _lazy_GaJmRW, lazy: true, middleware: false, method: "patch" },
  { route: '/api/profile/phone/request-code', handler: _lazy_cPKJ1M, lazy: true, middleware: false, method: "post" },
  { route: '/api/profile/recipients', handler: _lazy_w7b8m7, lazy: true, middleware: false, method: "post" },
  { route: '/api/profile/recipients/:recipientId', handler: _lazy_xihqdX, lazy: true, middleware: false, method: "delete" },
  { route: '/api/working-day', handler: _lazy_0lYn3n, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_Wx9lXO, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _nTbyxj, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_Wx9lXO, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { hasProtocol as $, createPendingOrderPayment as A, registerVtbOrder as B, getRequestIP as C, saveVtbRegistration as D, getVtbDynamicQr as E, getVtbQrExpiresAt as F, saveVtbQr as G, getProductBySlug as H, calculateProductPrice as I, getProducts as J, getRegistrationEmailError as K, sendRedirect as L, getRequestURL as M, sendNotificoreEmail as N, isAuthPhone as O, defineCachedFunction as P, buildAssetsURL as Q, useRuntimeConfig as R, getResponseStatusText as S, getResponseStatus as T, defineRenderHandler as U, publicAssetsURL as V, destr as W, getRouteRules as X, joinURL as Y, useNitroApp as Z, serialize$1 as _, auth as a, isScriptProtocol as a0, parseQuery as a1, klona as a2, defu as a3, withQuery as a4, sanitizeStatusCode as a5, parseURL as a6, encodePath as a7, decodePath as a8, defuFn as a9, getContext as aa, isEqual as ab, withTrailingSlash as ac, withoutTrailingSlash as ad, $fetch$1 as ae, baseURL as af, hash$1 as ag, isPhoneLike as ah, getIdentifierError as ai, getRussianSecondsWord as aj, formatCompactPhone as ak, formatPhone as al, unmaskPhoneToEmail as am, executeAsync as an, nodeServer as ao, normalizePhoneDigits as b, createError$1 as c, defineEventHandler as d, assertRateLimit as e, formatAuthPhone as f, sendNotificoreOtp as g, getNotificoreAuthenticationPayload as h, assertSuccessfulNotificoreOtpResponse as i, setResponseStatus as j, getNotificoreAuthenticationId as k, isNotificoreTimeoutError as l, suggestDadataParties as m, normalizeAuthIdentifier as n, getRequestHeaders as o, getRouterParam as p, getOrderPayment as q, readBody as r, sendWebResponse as s, toWebRequest as t, useDatabase as u, verifyNotificoreOtp as v, updateOrderPaymentStatus as w, getVtbDynamicQrStatus as x, getPaymentStatusFromVtbQr as y, getQuery as z };
//# sourceMappingURL=nitro.mjs.map
