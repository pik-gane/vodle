(() => {
  // src/compiler/polyfills.ts
  globalThis.self = globalThis;
  globalThis.Node = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11
  };

  // node_modules/@ampproject/bento-compiler/dist/index.js
  var mapping = {
    __proto__: null,
    UNKNOWN: 0,
    A: 1,
    ABBR: 2,
    ACRONYM: 3,
    ADDRESS: 4,
    APPLET: 5,
    AREA: 6,
    B: 7,
    BASE: 8,
    BASEFONT: 9,
    BDO: 10,
    BIG: 11,
    BLOCKQUOTE: 12,
    BODY: 13,
    BR: 14,
    BUTTON: 15,
    CAPTION: 16,
    CENTER: 17,
    CITE: 18,
    CODE: 19,
    COL: 20,
    COLGROUP: 21,
    DD: 22,
    DEL: 23,
    DFN: 24,
    DIR: 25,
    DIV: 26,
    DL: 27,
    DT: 28,
    EM: 29,
    FIELDSET: 30,
    FONT: 31,
    FORM: 32,
    FRAME: 33,
    FRAMESET: 34,
    H1: 35,
    H2: 36,
    H3: 37,
    H4: 38,
    H5: 39,
    H6: 40,
    HEAD: 41,
    HR: 42,
    HTML: 43,
    I: 44,
    IFRAME: 45,
    IMG: 46,
    INPUT: 47,
    INS: 48,
    ISINDEX: 49,
    KBD: 50,
    LABEL: 51,
    LEGEND: 52,
    LI: 53,
    LINK: 54,
    MAP: 55,
    MENU: 56,
    META: 57,
    NOFRAMES: 58,
    NOSCRIPT: 59,
    OBJECT: 60,
    OL: 61,
    OPTGROUP: 62,
    OPTION: 63,
    P: 64,
    PARAM: 65,
    PRE: 66,
    Q: 67,
    S: 68,
    SAMP: 69,
    SCRIPT: 70,
    SELECT: 71,
    SMALL: 72,
    SPAN: 73,
    STRIKE: 74,
    STRONG: 75,
    STYLE: 76,
    SUB: 77,
    SUP: 78,
    TABLE: 79,
    TBODY: 80,
    TD: 81,
    TEXTAREA: 82,
    TFOOT: 83,
    TH: 84,
    THEAD: 85,
    TITLE: 86,
    TR: 87,
    TT: 88,
    U: 89,
    UL: 90,
    VAR: 91,
    ZERO_LENGTH: 92,
    BANG_DASH_DASH: 93,
    BLINK: 94,
    EMBED: 95,
    MARQUEE: 96,
    NOBR: 97,
    WBR: 98,
    BGSOUND: 99,
    IMAGE: 100,
    LISTING: 101,
    NOEMBED: 102,
    PLAINTEXT: 103,
    SPACER: 104,
    XMP: 105,
    ILAYER: 106,
    KEYGEN: 107,
    LAYER: 108,
    MULTICOL: 109,
    NOLAYER: 110,
    SERVER: 111,
    BANG_DOCTYPE: 112,
    NOINDEX: 113,
    BOGUS_COMMENT: 114,
    ARTICLE: 115,
    ASIDE: 116,
    AUDIO: 117,
    BDI: 118,
    CANVAS: 119,
    COMMAND: 120,
    DATALIST: 121,
    DETAILS: 122,
    FIGCAPTION: 123,
    FIGURE: 124,
    FOOTER: 125,
    HEADER: 126,
    HGROUP: 127,
    MARK: 128,
    METER: 129,
    NAV: 130,
    OUTPUT: 131,
    PROGRESS: 132,
    RP: 133,
    RT: 134,
    RUBY: 135,
    SECTION: 136,
    SOURCE: 137,
    SUMMARY: 138,
    TIME: 139,
    TRACK: 140,
    VIDEO: 141,
    DATA: 142,
    MAIN: 143,
    RB: 144,
    RTC: 145,
    TEMPLATE: 146,
    PICTURE: 147,
    DIALOG: 148,
    MENUITEM: 149,
    SVG: 150,
    FOREIGNOBJECT: 151,
    DESC: 152
  };
  function getTagId(tagName) {
    return mapping[tagName.toUpperCase()] ?? mapping.UNKNOWN;
  }
  function isElementNode(node) {
    return node.tagid !== void 0;
  }
  function fromDocument(doc) {
    const children = Array.from(doc.childNodes).map(fromNode);
    return {
      quirks_mode: doc.compatMode === "BackCompat",
      tree: [{ tagid: 92, children }],
      root: 0
    };
  }
  function fromNode(node) {
    if (node.nodeType !== 1 && node.nodeType !== 3) {
      throw new Error(`Unsupported nodeType: ${node.nodeType}`);
    }
    if (node.nodeType === 3) {
      const value = node.textContent;
      return { value, num_terms: getNumTerms(value) };
    }
    const elementNode = node;
    const protoNode = {
      tagid: getTagId(elementNode.tagName),
      value: elementNode.tagName.toLowerCase()
    };
    if (elementNode.attributes?.length) {
      protoNode.attributes = Array.from(elementNode.attributes).map(({ name, value }) => {
        if (value === "") {
          return { name };
        }
        return { name, value };
      });
    }
    if (node.childNodes?.length) {
      protoNode.children = Array.from(node.childNodes).map(fromNode);
    }
    return protoNode;
  }
  var termRegex = /[\w-]+/gm;
  function getNumTerms(str) {
    return str?.match(termRegex)?.length ?? 0;
  }
  var toLower = (value) => value.toLowerCase();
  var toUpper = (value) => value.toUpperCase();
  var containsIndexOf = (pos) => pos !== -1;
  var keyValueString = (key, value) => `${key}="${value}"`;
  var tagNameConditionPredicate = (tagNames) => (element) => {
    return tagNames.includes(element.tagName);
  };
  var elementPredicate = (node) => node.nodeType === 1;
  var matchChildrenElements = (node, conditionPredicate) => {
    const matchingElements = [];
    node.childNodes.forEach((child) => {
      if (elementPredicate(child)) {
        if (conditionPredicate(child)) {
          matchingElements.push(child);
        }
        matchingElements.push(...matchChildrenElements(child, conditionPredicate));
      }
    });
    return matchingElements;
  };
  var matchChildElement = (element, conditionPredicate) => {
    let returnValue = null;
    element.children.some((child) => {
      if (conditionPredicate(child)) {
        returnValue = child;
        return true;
      }
      const grandChildMatch = matchChildElement(child, conditionPredicate);
      if (grandChildMatch !== null) {
        returnValue = grandChildMatch;
        return true;
      }
      return false;
    });
    return returnValue;
  };
  var matchNearestParent = (element, conditionPredicate) => {
    while (element = element.parentNode) {
      if (conditionPredicate(element)) {
        return element;
      }
    }
    return null;
  };
  var matchAttrReference = (attrSelector, element) => {
    if (!attrSelector) {
      return false;
    }
    const equalPos = attrSelector.indexOf("=");
    const selectorLength = attrSelector.length;
    const caseInsensitive = attrSelector.charAt(selectorLength - 2) === "i";
    const endPos = caseInsensitive ? selectorLength - 3 : selectorLength - 1;
    if (equalPos !== -1) {
      const equalSuffix = attrSelector.charAt(equalPos - 1);
      const possibleSuffixes = ["~", "|", "$", "^", "*"];
      const attrString = possibleSuffixes.includes(equalSuffix) ? attrSelector.substring(1, equalPos - 1) : attrSelector.substring(1, equalPos);
      const rawValue = attrSelector.substring(equalPos + 1, endPos);
      const rawAttrValue = element.getAttribute(attrString);
      if (rawAttrValue) {
        const casedValue = caseInsensitive ? toLower(rawValue) : rawValue;
        const casedAttrValue = caseInsensitive ? toLower(rawAttrValue) : rawAttrValue;
        switch (equalSuffix) {
          case "~":
            return casedAttrValue.split(" ").indexOf(casedValue) !== -1;
          case "|":
            return casedAttrValue === casedValue || casedAttrValue === `${casedValue}-`;
          case "^":
            return casedAttrValue.startsWith(casedValue);
          case "$":
            return casedAttrValue.endsWith(casedValue);
          case "*":
            return casedAttrValue.indexOf(casedValue) !== -1;
          default:
            return casedAttrValue === casedValue;
        }
      }
      return false;
    } else {
      return element.hasAttribute(attrSelector.substring(1, endPos));
    }
  };
  var mapping2 = /* @__PURE__ */ new Map();
  function get(index) {
    return !!index && mapping2.get(index) || null;
  }
  function store(value) {
    {
      return 0;
    }
  }
  function transfer(document, mutation) {
    {
      return;
    }
  }
  var observers = [];
  var pendingMutations = false;
  var matchesIndex = (observerTarget, target) => {
    return !!observerTarget && observerTarget[7] === target[7];
  };
  var pushMutation = (observer, record) => {
    observer.pushRecord(record);
    if (!pendingMutations) {
      pendingMutations = true;
      Promise.resolve().then(() => {
        pendingMutations = false;
        observers.forEach((observer2) => observer2.callback(observer2.takeRecords()));
      });
    }
  };
  function mutate(document, record, transferable) {
    observers.forEach((observer) => {
      for (let t = record.target; t; t = t.parentNode) {
        if (matchesIndex(observer.target, t)) {
          pushMutation(observer, record);
          break;
        }
      }
    });
  }
  var propagate$3 = (node, property, value) => {
    node[property] = value;
    node.childNodes.forEach((child) => propagate$3(child, property, value));
  };
  var Node2 = class {
    constructor(nodeType, nodeName, ownerDocument, overrideIndex) {
      this.ownerDocument = void 0;
      this[45] = void 0;
      this.nodeType = void 0;
      this.nodeName = void 0;
      this.childNodes = [];
      this.parentNode = null;
      this.isConnected = false;
      this[7] = void 0;
      this[9] = void 0;
      this[8] = void 0;
      this[10] = {};
      this.nodeType = nodeType;
      this.nodeName = nodeName;
      this.ownerDocument = ownerDocument || this;
      this[45] = this;
      {
        return;
      }
    }
    get textContent() {
      return this.getTextContent();
    }
    getTextContent() {
      let textContent = "";
      const childNodes2 = this.childNodes;
      if (childNodes2.length) {
        childNodes2.forEach((childNode) => textContent += childNode.textContent);
        return textContent;
      }
      return "";
    }
    get firstChild() {
      return this.childNodes[0] || null;
    }
    get lastChild() {
      return this.childNodes[this.childNodes.length - 1] || null;
    }
    get nextSibling() {
      if (this.parentNode === null) {
        return null;
      }
      const parentChildNodes = this.parentNode.childNodes;
      return parentChildNodes[parentChildNodes.indexOf(this) + 1] || null;
    }
    get previousSibling() {
      if (this.parentNode === null) {
        return null;
      }
      const parentChildNodes = this.parentNode.childNodes;
      return parentChildNodes[parentChildNodes.indexOf(this) - 1] || null;
    }
    hasChildNodes() {
      return this.childNodes.length > 0;
    }
    contains(otherNode) {
      if (otherNode === this) {
        return true;
      }
      if (this.childNodes.length > 0) {
        if (this.childNodes.includes(this)) {
          return true;
        }
        return this.childNodes.some((child) => child.contains(otherNode));
      }
      return false;
    }
    insertBefore(child, referenceNode) {
      if (child === null || child === this) {
        return child;
      }
      if (child.nodeType === 11) {
        child.childNodes.slice().forEach((node) => this.insertBefore(node, referenceNode));
      } else if (referenceNode == null) {
        return this.appendChild(child);
      } else if (this.childNodes.indexOf(referenceNode) >= 0) {
        child.remove();
        this.childNodes.splice(this.childNodes.indexOf(referenceNode), 0, child);
        this[56](child);
        mutate(this.ownerDocument, {
          addedNodes: [child],
          nextSibling: referenceNode,
          type: 2,
          target: this
        }, [
          2,
          this[7],
          referenceNode[7],
          0,
          1,
          0,
          child[7]
        ]);
        return child;
      }
      return null;
    }
    [56](child) {
      child.parentNode = this;
      propagate$3(child, "isConnected", this.isConnected);
      propagate$3(child, 45, this[45]);
    }
    [57](child) {
      child.parentNode = null;
      propagate$3(child, "isConnected", false);
      propagate$3(child, 45, child);
    }
    appendChild(child) {
      if (child.nodeType === 11) {
        child.childNodes.slice().forEach(this.appendChild, this);
      } else {
        child.remove();
        this.childNodes.push(child);
        this[56](child);
        const previousSibling = this.childNodes[this.childNodes.length - 2];
        mutate(this.ownerDocument, {
          addedNodes: [child],
          previousSibling,
          type: 2,
          target: this
        }, [
          2,
          this[7],
          0,
          previousSibling ? previousSibling[7] : 0,
          1,
          0,
          child[7]
        ]);
      }
      return child;
    }
    removeChild(child) {
      const index = this.childNodes.indexOf(child);
      const exists = index >= 0;
      if (exists) {
        this.childNodes.splice(index, 1);
        this[57](child);
        mutate(this.ownerDocument, {
          removedNodes: [child],
          type: 2,
          target: this
        }, [
          2,
          this[7],
          0,
          0,
          0,
          1,
          child[7]
        ]);
        return child;
      }
      return null;
    }
    replaceChild(newChild, oldChild) {
      if (newChild === oldChild || oldChild.parentNode !== this || newChild.contains(this)) {
        return oldChild;
      }
      newChild.remove();
      const index = this.childNodes.indexOf(oldChild);
      this.childNodes.splice(index, 1, newChild);
      this[57](oldChild);
      this[56](newChild);
      mutate(this.ownerDocument, {
        addedNodes: [newChild],
        removedNodes: [oldChild],
        type: 2,
        nextSibling: this.childNodes[index + 1],
        target: this
      }, [
        2,
        this[7],
        this.childNodes[index + 1] ? this.childNodes[index + 1][7] : 0,
        0,
        1,
        1,
        newChild[7],
        oldChild[7]
      ]);
      return oldChild;
    }
    replaceWith(...nodes) {
      const parent = this.parentNode;
      let nodeIterator = nodes.length;
      let currentNode;
      if (!parent) {
        return;
      }
      if (!nodeIterator) {
        parent.removeChild(this);
      }
      while (nodeIterator--) {
        currentNode = nodes[nodeIterator];
        if (typeof currentNode !== "object") {
          currentNode = this.ownerDocument.createTextNode(currentNode);
        }
        if (!nodeIterator) {
          parent.replaceChild(currentNode, this);
        } else {
          parent.insertBefore(currentNode, this.nextSibling);
        }
      }
    }
    remove() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    }
    addEventListener(type, handler, options = {}) {
      const lowerType = toLower(type);
      const storedType = store();
      const handlers = this[10][lowerType];
      let index = 0;
      if (handlers) {
        index = handlers.push(handler);
      } else {
        this[10][lowerType] = [handler];
      }
      transfer(this.ownerDocument, [
        4,
        this[7],
        0,
        1,
        storedType,
        index,
        Number(Boolean(options.capture)),
        Number(Boolean(options.once)),
        Number(Boolean(options.passive)),
        Number(Boolean(options.workerDOMPreventDefault))
      ]);
    }
    removeEventListener(type, handler) {
      const lowerType = toLower(type);
      const handlers = this[10][lowerType];
      const index = !!handlers ? handlers.indexOf(handler) : -1;
      if (index >= 0) {
        handlers.splice(index, 1);
        transfer(this.ownerDocument, [
          4,
          this[7],
          1,
          0,
          store(),
          index
        ]);
      }
    }
    dispatchEvent(event) {
      let target = event.currentTarget = this;
      let handlers;
      let iterator;
      do {
        handlers = target && target[10] && target[10][toLower(event.type)];
        if (handlers) {
          for (iterator = handlers.length; iterator--; ) {
            if ((handlers[iterator].call(target, event) === false || event[51]) && event.cancelable) {
              break;
            }
          }
        }
      } while (event.bubbles && !(event.cancelable && event[50]) && (target = target && target.parentNode));
      return !event.defaultPrevented;
    }
  };
  var ParentNode = class extends Node2 {
    get children() {
      return this.childNodes.filter(elementPredicate);
    }
    get childElementCount() {
      return this.children.length;
    }
    get firstElementChild() {
      return this.childNodes.find(elementPredicate) || null;
    }
    get lastElementChild() {
      const children = this.children;
      return children[children.length - 1] || null;
    }
    querySelector(selector) {
      const matches2 = querySelectorAll(this, selector);
      return matches2 ? matches2[0] : null;
    }
    querySelectorAll(selector) {
      return querySelectorAll(this, selector);
    }
  };
  function querySelectorAll(node, selector) {
    const selectorBracketIndexes = [selector.indexOf("["), selector.indexOf("]")];
    const selectorHasAttr = containsIndexOf(selectorBracketIndexes[0]) && containsIndexOf(selectorBracketIndexes[1]);
    const elementSelector = selectorHasAttr ? selector.substring(0, selectorBracketIndexes[0]) : selector;
    const attrSelector = selectorHasAttr ? selector.substring(selectorBracketIndexes[0], selectorBracketIndexes[1] + 1) : null;
    let matcher;
    if (selector[0] === "[") {
      matcher = (element) => matchAttrReference(selector, element);
    } else if (elementSelector[0] === "#") {
      matcher = selectorHasAttr ? (element) => element.id === elementSelector.substr(1) && matchAttrReference(attrSelector, element) : (element) => element.id === elementSelector.substr(1);
    } else if (elementSelector[0] === ".") {
      matcher = selectorHasAttr ? (element) => element.classList.contains(elementSelector.substr(1)) && matchAttrReference(attrSelector, element) : (element) => element.classList.contains(elementSelector.substr(1));
    } else {
      matcher = selectorHasAttr ? (element) => element.localName === toLower(elementSelector) && matchAttrReference(attrSelector, element) : (element) => element.localName === toLower(elementSelector);
    }
    return matcher ? matchChildrenElements(node[45], matcher).filter((element) => node !== element && node.contains(element)) : [];
  }
  var WHITESPACE_REGEX = /\s/;
  function synchronizedAccessor(defineOn, accessorKey, propertyName) {
    Object.defineProperty(defineOn.prototype, propertyName, {
      enumerable: true,
      configurable: true,
      get() {
        return this[accessorKey].value;
      },
      set(value) {
        this[accessorKey].value = value;
      }
    });
  }
  var DOMTokenList = class {
    constructor(target, attributeName) {
      this[43] = [];
      this[13] = void 0;
      this[18] = void 0;
      this[44] = void 0;
      this[13] = target;
      this[18] = attributeName;
      this[44] = target[44].bind(target);
    }
    get value() {
      return this[43].join(" ");
    }
    get length() {
      return this[43].length;
    }
    set value(collection) {
      const oldValue = this.value;
      const newValue = collection.trim();
      this[43].splice(0, this[43].length, ...newValue !== "" ? newValue.split(/\s+/) : "");
      this[67](oldValue, newValue);
    }
    item(index) {
      return this[43][index];
    }
    contains(token) {
      return this[43].includes(token);
    }
    add(...tokens) {
      const oldValue = this.value;
      this[43].splice(0, this[43].length, ...Array.from(new Set(this[43].concat(tokens))));
      this[67](oldValue, this.value);
    }
    remove(...tokens) {
      const oldValue = this.value;
      this[43].splice(0, this[43].length, ...Array.from(new Set(this[43].filter((token) => !tokens.includes(token)))));
      this[67](oldValue, this.value);
    }
    replace(token, newToken) {
      if (!this[43].includes(token)) {
        return;
      }
      const oldValue = this.value;
      const set = new Set(this[43]);
      if (token !== newToken) {
        set.delete(token);
        if (newToken !== "") {
          set.add(newToken);
        }
      }
      this[43].splice(0, this[43].length, ...Array.from(set));
      this[67](oldValue, this.value);
    }
    toggle(token, force) {
      if (WHITESPACE_REGEX.test(token)) {
        throw new TypeError("Uncaught DOMException");
      }
      if (!this[43].includes(token)) {
        if (force === void 0 || !!force) {
          this.add(token);
        }
        return true;
      } else if (!force) {
        this.remove(token);
        return false;
      }
      return true;
    }
    [67](oldValue, value) {
      this[44](this[13].namespaceURI, this[18], value);
      mutate(this[13].ownerDocument, {
        type: 0,
        target: this[13],
        attributeName: this[18],
        value,
        oldValue
      }, [
        0,
        this[13][7],
        store(this[18]),
        0,
        value !== null ? store() + 1 : 0
      ]);
    }
  };
  var toString = (attributes) => attributes.map((attr) => keyValueString(attr.name, attr.value)).join(" ");
  var matchPredicate = (namespaceURI, name) => (attr) => attr.namespaceURI === namespaceURI && attr.name === name;
  var CSSStyleDeclaration = class {
    constructor(target) {
      this[3] = {};
      this[44] = void 0;
      this[13] = void 0;
      this[44] = target[44].bind(target);
      this[13] = target;
    }
    getPropertyValue(key) {
      return this[3][key] || "";
    }
    removeProperty(key) {
      const oldValue = this.getPropertyValue(key);
      this[3][key] = null;
      this.mutated(this.cssText);
      return oldValue;
    }
    setProperty(key, value) {
      this[3][key] = value;
      this.mutated(this.cssText);
    }
    get cssText() {
      let value;
      let returnValue = "";
      for (const key in this[3]) {
        if ((value = this.getPropertyValue(key)) !== "") {
          returnValue += `${key}: ${value}; `;
        }
      }
      return returnValue.trim();
    }
    set cssText(value) {
      const stringValue = typeof value === "string" ? value : "";
      this[3] = {};
      const values = stringValue.split(/[:;]/);
      const length = values.length;
      for (let index = 0; index + 1 < length; index += 2) {
        this[3][toLower(values[index].trim())] = values[index + 1].trim();
      }
      this.mutated(this.cssText);
    }
    mutated(value) {
      const oldValue = this[44](this[13].namespaceURI, "style", value);
      mutate(this[13].ownerDocument, {
        type: 0,
        target: this[13],
        attributeName: "style",
        value,
        oldValue
      }, [
        0,
        this[13][7],
        store(),
        0,
        value !== null ? store() + 1 : 0
      ]);
    }
  };
  var reflectProperties = (properties, defineOn) => {
    properties.forEach((pair) => {
      for (const property in pair) {
        const {
          0: defaultValue,
          1: attributeName = toLower(property),
          2: keywords
        } = pair[property];
        const isBooleanAttribute = typeof defaultValue === "boolean";
        Object.defineProperty(defineOn.prototype, property, {
          enumerable: true,
          get() {
            const element = this;
            const attributeValue = element.getAttribute(attributeName);
            if (keywords) {
              return element.hasAttribute(attributeName) ? attributeValue === keywords[0] : defaultValue;
            }
            if (isBooleanAttribute) {
              return element.hasAttribute(attributeName);
            }
            const castableValue = attributeValue || defaultValue;
            return typeof defaultValue === "number" ? Number(castableValue) : String(castableValue);
          },
          set(value) {
            const element = this;
            if (keywords) {
              element.setAttribute(attributeName, value ? keywords[0] : keywords[1]);
            } else if (isBooleanAttribute) {
              value ? element.setAttribute(attributeName, "") : element.removeAttribute(attributeName);
            } else {
              element.setAttribute(attributeName, String(value));
            }
          }
        });
      }
    });
  };
  var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  function arr_back(arr) {
    return arr[arr.length - 1];
  }
  var kMarkupPattern = /<!--([^]*)-->|<(\/?)([a-z][-.0-9_a-z]*)([^>]*?)(\/?)>/gi;
  var kAttributePattern = /(^|\s)([^\s"'>\/=]+)\s*=\s*("([^"]+)"|'([^']+)'|(\S+))/gi;
  var kSelfClosingElements = {
    AREA: true,
    BASE: true,
    BR: true,
    COL: true,
    HR: true,
    IMG: true,
    INPUT: true,
    LINK: true,
    META: true,
    PARAM: true,
    SOURCE: true,
    TRACK: true,
    WBR: true
  };
  var kElementsClosedByOpening = {
    LI: {
      LI: true
    },
    DT: {
      DT: true,
      DD: true
    },
    DD: {
      DD: true,
      DT: true
    },
    P: {
      ADDRESS: true,
      ARTICLE: true,
      ASIDE: true,
      BLOCKQUOTE: true,
      DETAILS: true,
      DIV: true,
      DL: true,
      FIELDSET: true,
      FIGCAPTION: true,
      FIGURE: true,
      FOOTER: true,
      FORM: true,
      H1: true,
      H2: true,
      H3: true,
      H4: true,
      H5: true,
      H6: true,
      HEADER: true,
      HR: true,
      MAIN: true,
      NAV: true,
      OL: true,
      P: true,
      PRE: true,
      SECTION: true,
      TABLE: true,
      UL: true
    },
    RT: {
      RT: true,
      RP: true
    },
    RP: {
      RT: true,
      RP: true
    },
    OPTGROUP: {
      OPTGROUP: true
    },
    OPTION: {
      OPTION: true,
      OPTGROUP: true
    },
    THEAD: {
      TBODY: true,
      TFOOT: true
    },
    TBODY: {
      TBODY: true,
      TFOOT: true
    },
    TR: {
      TR: true
    },
    TD: {
      TD: true,
      TH: true
    },
    TH: {
      TD: true,
      TH: true
    }
  };
  var kElementsClosedByClosing = {
    LI: {
      UL: true,
      OL: true
    },
    A: {
      DIV: true
    },
    B: {
      DIV: true
    },
    I: {
      DIV: true
    },
    P: {
      DIV: true
    },
    TD: {
      TR: true,
      TABLE: true
    },
    TH: {
      TR: true,
      TABLE: true
    }
  };
  var kBlockTextElements = {
    SCRIPT: true,
    NOSCRIPT: true,
    STYLE: true,
    PRE: true
  };
  function parse(data, rootElement) {
    const ownerDocument = rootElement.ownerDocument;
    const root = ownerDocument.createElementNS(rootElement.namespaceURI, rootElement.localName);
    let currentParent = root;
    let currentNamespace = root.namespaceURI;
    const stack = [root];
    let lastTextPos = 0;
    let match;
    data = "<q>" + data + "</q>";
    const tagsClosed = [];
    if (currentNamespace !== SVG_NAMESPACE && currentNamespace !== HTML_NAMESPACE) {
      throw new Error("Namespace not supported: " + currentNamespace);
    }
    while (match = kMarkupPattern.exec(data)) {
      const commentContents = match[1];
      const beginningSlash = match[2];
      const tagName = match[3];
      const matchAttributes = match[4];
      const endSlash = match[5];
      if (lastTextPos < match.index) {
        const text = data.slice(lastTextPos, match.index);
        currentParent.appendChild(ownerDocument.createTextNode(decodeEntities(text)));
      }
      lastTextPos = kMarkupPattern.lastIndex;
      if (commentContents !== void 0) {
        currentParent.appendChild(ownerDocument.createComment(commentContents));
        continue;
      }
      const normalizedTagName = toUpper(tagName);
      if (normalizedTagName === "SVG") {
        currentNamespace = beginningSlash ? HTML_NAMESPACE : SVG_NAMESPACE;
      }
      if (!beginningSlash) {
        if (!endSlash && kElementsClosedByOpening[currentParent.tagName]) {
          if (kElementsClosedByOpening[currentParent.tagName][normalizedTagName]) {
            stack.pop();
            currentParent = arr_back(stack);
          }
        }
        const childToAppend = ownerDocument.createElementNS(currentNamespace, currentNamespace === HTML_NAMESPACE ? toLower(tagName) : tagName);
        for (let attMatch; attMatch = kAttributePattern.exec(matchAttributes); ) {
          const attrName = attMatch[2];
          const attrValue = attMatch[4] || attMatch[5] || attMatch[6];
          childToAppend.setAttribute(attrName, attrValue);
        }
        currentParent = currentParent.appendChild(childToAppend);
        stack.push(currentParent);
        if (kBlockTextElements[normalizedTagName]) {
          const closeMarkup = "</" + toLower(normalizedTagName) + ">";
          const index = data.indexOf(closeMarkup, kMarkupPattern.lastIndex);
          if (index == -1) {
            throw new Error("Close markup not found.");
          } else {
            kMarkupPattern.lastIndex = index;
          }
        }
      }
      if (tagName === "foreignObject") {
        currentNamespace = beginningSlash ? SVG_NAMESPACE : HTML_NAMESPACE;
      }
      if (beginningSlash || endSlash || kSelfClosingElements[normalizedTagName]) {
        while (true) {
          if (stack.length <= 1) {
            break;
          }
          if (toUpper(currentParent.nodeName) == normalizedTagName) {
            stack.pop();
            currentParent = arr_back(stack);
            break;
          } else {
            if (kElementsClosedByClosing[currentParent.tagName]) {
              if (kElementsClosedByClosing[currentParent.tagName][normalizedTagName]) {
                stack.pop();
                currentParent = arr_back(stack);
                continue;
              }
            }
            break;
          }
        }
      }
    }
    for (const node of stack) {
      if (tagsClosed[tagsClosed.length - 1] == node.nodeName) {
        stack.pop();
        tagsClosed.pop();
        currentParent = arr_back(stack);
      } else
        break;
    }
    const valid = stack.length === 1;
    if (!valid) {
      throw new Error("Attempting to parse invalid HTML content.");
    }
    const wrapper = root.firstChild;
    if (wrapper) {
      wrapper.parentNode = null;
      wrapper.childNodes.forEach((node) => {
        node.parentNode = null;
      });
      return wrapper;
    }
    throw new Error("Attempting to parse invalid HTML.");
  }
  var RESERVED_CHARACTERS = {
    __proto__: null,
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"'
  };
  function decodeEntities(html2) {
    return html2.replace(/&(?:(#x?[\da-f]+)|([\w]+));?/gi, function(s, numericEntity, namedEntity) {
      if (numericEntity) {
        let code = numericEntity.charAt(1).toLowerCase() === "x" ? parseInt(numericEntity.substr(2), 16) : parseInt(numericEntity.substr(1), 10);
        if (isNaN(code) || code > 1114111) {
          return s;
        }
        return String.fromCodePoint(code) || s;
      }
      if (namedEntity) {
        return RESERVED_CHARACTERS[namedEntity.toLowerCase()] || s;
      }
      return s;
    });
  }
  var Event$1 = class {
    constructor(type, opts) {
      this.bubbles = void 0;
      this.cancelable = void 0;
      this.cancelBubble = void 0;
      this.currentTarget = void 0;
      this.defaultPrevented = void 0;
      this.eventPhase = void 0;
      this.isTrusted = void 0;
      this.returnValue = void 0;
      this.target = void 0;
      this.timeStamp = void 0;
      this.type = void 0;
      this.scoped = void 0;
      this[50] = false;
      this[51] = false;
      this.pageX = void 0;
      this.pageY = void 0;
      this.offsetX = void 0;
      this.offsetY = void 0;
      this.touches = void 0;
      this.changedTouches = void 0;
      this.type = type;
      this.bubbles = !!opts.bubbles;
      this.cancelable = !!opts.cancelable;
    }
    stopPropagation() {
      this[50] = true;
    }
    stopImmediatePropagation() {
      this[51] = this[50] = true;
    }
    preventDefault() {
      this.defaultPrevented = true;
    }
    initEvent(type, bubbles, cancelable) {
      this.type = type;
      this.bubbles = bubbles;
      this.cancelable = cancelable;
    }
  };
  var targetFromTransfer = (document, event) => {
    if (event[13] !== null) {
      const index = event[13][0];
      return get(index !== 0 ? index : document[7]);
    }
    return null;
  };
  var touchListFromTransfer = (document, event, key) => {
    if (event[key] !== void 0) {
      const touchListKeys = Object.keys(event[key]);
      const list = {
        length: touchListKeys.length,
        item(index) {
          return this[index] || null;
        }
      };
      touchListKeys.forEach((touchListKey) => {
        const numericKey = Number(touchListKey);
        const transferredTouch = event[key][numericKey];
        list[numericKey] = {
          identifier: transferredTouch[0],
          screenX: transferredTouch[1],
          screenY: transferredTouch[2],
          clientX: transferredTouch[3],
          clientY: transferredTouch[4],
          pageX: transferredTouch[5],
          pageY: transferredTouch[6],
          target: get(transferredTouch[7] !== 0 ? transferredTouch[7] : document[7])
        };
      });
      return list;
    }
    return void 0;
  };
  function propagate$2(global) {
    const document = global.document;
    if (!document.addGlobalEventListener) {
      return;
    }
    document.addGlobalEventListener("message", ({
      data
    }) => {
      if (data[12] !== 1) {
        return;
      }
      const event = data[39];
      const node = get(event[7]);
      if (node !== null) {
        node.dispatchEvent(Object.assign(new Event$1(event[12], {
          bubbles: event[25],
          cancelable: event[26]
        }), {
          cancelBubble: event[27],
          defaultPrevented: event[29],
          eventPhase: event[30],
          isTrusted: event[31],
          returnValue: event[32],
          target: targetFromTransfer(global.document, event),
          timeStamp: event[33],
          scoped: event[34],
          keyCode: event[35],
          pageX: event[60],
          pageY: event[61],
          offsetX: event[65],
          offsetY: event[66],
          touches: touchListFromTransfer(global.document, event, 62),
          changedTouches: touchListFromTransfer(global.document, event, 63)
        }));
      }
    });
  }
  function getPreviousElementSibling(node) {
    let parentNodes = node.parentNode && node.parentNode.childNodes;
    if (!parentNodes) {
      return null;
    }
    for (let i = parentNodes.indexOf(node) - 1; i >= 0; i--) {
      let _node = parentNodes[i];
      if (_node.nodeType === 1) {
        return _node;
      }
    }
    return null;
  }
  function getNextElementSibling(node) {
    let parentNodes = node.parentNode && node.parentNode.childNodes;
    if (!parentNodes) {
      return null;
    }
    for (let i = parentNodes.indexOf(node) + 1; i < parentNodes.length; i++) {
      let _node2 = parentNodes[i];
      if (_node2.nodeType === 1) {
        return _node2;
      }
    }
    return null;
  }
  var NS_NAME_TO_CLASS = {};
  var registerSubclass = (localName, subclass, namespace = HTML_NAMESPACE) => NS_NAME_TO_CLASS[`${namespace}:${localName}`] = subclass;
  function definePropertyBackedAttributes(defineOn, attributes) {
    const sub = Object.create(defineOn[46]);
    defineOn[46] = Object.assign(sub, attributes);
  }
  var ElementKind;
  (function(ElementKind2) {
    ElementKind2[ElementKind2["NORMAL"] = 0] = "NORMAL";
    ElementKind2[ElementKind2["VOID"] = 1] = "VOID";
  })(ElementKind || (ElementKind = {}));
  var VOID_ELEMENTS = ["AREA", "BASE", "BR", "COL", "EMBED", "HR", "IMG", "INPUT", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];
  var Element = class extends ParentNode {
    constructor(nodeType, localName, namespaceURI, ownerDocument, overrideIndex) {
      super(nodeType, toUpper(localName), ownerDocument, overrideIndex);
      this._classList = void 0;
      this.localName = void 0;
      this.attributes = [];
      this.namespaceURI = void 0;
      this.style_ = void 0;
      this.kind = void 0;
      this.namespaceURI = namespaceURI || HTML_NAMESPACE;
      this.localName = localName;
      this.kind = VOID_ELEMENTS.includes(this.tagName) ? ElementKind.VOID : ElementKind.NORMAL;
      this[8] = [this[7], this.nodeType, store(this.localName), 0, this.namespaceURI === null ? 0 : store(this.namespaceURI)];
    }
    get style() {
      if (!this.style_) {
        this.style_ = new CSSStyleDeclaration(this);
      }
      return this.style_;
    }
    get previousElementSibling() {
      return getPreviousElementSibling(this);
    }
    get nextElementSibling() {
      return getNextElementSibling(this);
    }
    get outerHTML() {
      const tag = this.localName || this.tagName;
      const start = `<${[tag, toString(this.attributes)].join(" ").trim()}>`;
      const contents = this.innerHTML;
      if (!contents) {
        if (this.kind === ElementKind.VOID) {
          return start;
        }
      }
      return start + contents + `</${tag}>`;
    }
    get innerHTML() {
      const childNodes2 = this.childNodes;
      if (childNodes2.length) {
        return childNodes2.map((child) => {
          switch (child.nodeType) {
            case 3:
              return child.textContent;
            case 8:
              return `<!--${child.textContent}-->`;
            default:
              return child.outerHTML;
          }
        }).join("");
      }
      return "";
    }
    set innerHTML(html2) {
      const root = parse(html2, this);
      this.childNodes.forEach((n) => {
        propagate$3(n, "isConnected", false);
        propagate$3(n, 45, n);
      });
      mutate(this.ownerDocument, {
        removedNodes: this.childNodes,
        type: 2,
        target: this
      }, [
        2,
        this[7],
        0,
        0,
        0,
        this.childNodes.length,
        ...this.childNodes.map((node) => node[7])
      ]);
      this.childNodes = [];
      root.childNodes.forEach((child) => this.appendChild(child));
    }
    set textContent(text) {
      this.childNodes.slice().forEach((child) => child.remove());
      this.appendChild(this.ownerDocument.createTextNode(text));
    }
    get textContent() {
      return this.getTextContent();
    }
    get tagName() {
      return this.nodeName;
    }
    setAttribute(name, value) {
      this.setAttributeNS(HTML_NAMESPACE, name, value);
    }
    getAttribute(name) {
      return this.getAttributeNS(HTML_NAMESPACE, name);
    }
    removeAttribute(name) {
      this.removeAttributeNS(HTML_NAMESPACE, name);
    }
    hasAttribute(name) {
      return this.hasAttributeNS(HTML_NAMESPACE, name);
    }
    hasAttributes() {
      return this.attributes.length > 0;
    }
    setAttributeNS(namespaceURI, name, value) {
      const valueAsString = String(value);
      const propertyBacked = this.constructor[46][name];
      if (propertyBacked !== void 0) {
        if (!this.attributes.find(matchPredicate(namespaceURI, name))) {
          this.attributes.push({
            namespaceURI,
            name,
            value: valueAsString
          });
        }
        propertyBacked[1](this, valueAsString);
        return;
      }
      const oldValue = this[44](namespaceURI, name, valueAsString);
      mutate(this.ownerDocument, {
        type: 0,
        target: this,
        attributeName: name,
        attributeNamespace: namespaceURI,
        value: valueAsString,
        oldValue
      }, [
        0,
        this[7],
        store(),
        store(),
        value !== null ? store() + 1 : 0
      ]);
    }
    [44](namespaceURI, name, value) {
      const attr = this.attributes.find(matchPredicate(namespaceURI, name));
      const oldValue = attr && attr.value || "";
      if (attr) {
        attr.value = value;
      } else {
        this.attributes.push({
          namespaceURI,
          name,
          value
        });
      }
      return oldValue;
    }
    getAttributeNS(namespaceURI, name) {
      const attr = this.attributes.find(matchPredicate(namespaceURI, name));
      if (attr) {
        const propertyBacked = this.constructor[46][name];
        return propertyBacked !== void 0 ? propertyBacked[0](this) : attr.value;
      }
      return null;
    }
    removeAttributeNS(namespaceURI, name) {
      const index = this.attributes.findIndex(matchPredicate(namespaceURI, name));
      if (index >= 0) {
        const oldValue = this.attributes[index].value;
        this.attributes.splice(index, 1);
        mutate(this.ownerDocument, {
          type: 0,
          target: this,
          attributeName: name,
          attributeNamespace: namespaceURI,
          oldValue
        }, [
          0,
          this[7],
          store(),
          store(),
          0
        ]);
      }
    }
    hasAttributeNS(namespaceURI, name) {
      return this.attributes.some(matchPredicate(namespaceURI, name));
    }
    getElementsByClassName(names) {
      const inputClassList = names.split(" ");
      return matchChildrenElements(this, (element) => inputClassList.some((inputClassName) => element.classList.contains(inputClassName)));
    }
    getElementsByTagName(tagName) {
      const lowerTagName = toLower(tagName);
      return matchChildrenElements(this, tagName === "*" ? (_) => true : (element) => element.namespaceURI === HTML_NAMESPACE ? element.localName === lowerTagName : element.tagName === tagName);
    }
    getElementsByName(name) {
      const stringName = "" + name;
      return matchChildrenElements(this, (element) => element.getAttribute("name") === stringName);
    }
    cloneNode(deep = false) {
      const clone = this.ownerDocument.createElementNS(this.namespaceURI, this.namespaceURI === HTML_NAMESPACE ? toLower(this.tagName) : this.tagName);
      this.attributes.forEach((attr) => clone.setAttribute(attr.name, attr.value));
      if (deep) {
        this.childNodes.forEach((child) => clone.appendChild(child.cloneNode(deep)));
      }
      return clone;
    }
    getBoundingClientRectAsync() {
      const defaultValue = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      return new Promise((resolve) => {
        const messageHandler = ({
          data
        }) => {
          if (data[12] === 6 && data[13][0] === this[7]) {
            this.ownerDocument.removeGlobalEventListener("message", messageHandler);
            const transferredBoundingClientRect = data[38];
            resolve({
              top: transferredBoundingClientRect[0],
              right: transferredBoundingClientRect[1],
              bottom: transferredBoundingClientRect[2],
              left: transferredBoundingClientRect[3],
              width: transferredBoundingClientRect[4],
              height: transferredBoundingClientRect[5],
              x: transferredBoundingClientRect[0],
              y: transferredBoundingClientRect[3]
            });
          }
        };
        if (!this.ownerDocument.addGlobalEventListener || !this.isConnected) {
          resolve(defaultValue);
        } else {
          this.ownerDocument.addGlobalEventListener("message", messageHandler);
          transfer(this.ownerDocument, [
            5,
            this[7]
          ]);
          setTimeout(resolve, 500, defaultValue);
        }
      });
    }
    click() {
      const event = new Event$1("click", {});
      event.target = this;
      this.dispatchEvent(event);
    }
    scrollIntoView() {
      if (this.isConnected) {
        transfer(this.ownerDocument, [
          14,
          this[7]
        ]);
      }
    }
    get classList() {
      return this._classList || (this._classList = new DOMTokenList(this, "class"));
    }
  };
  Element[46] = {
    class: [(el) => el.classList.value, (el, value) => el.classList.value = value],
    style: [(el) => el.cssText, (el, value) => el.cssText = value]
  };
  synchronizedAccessor(Element, "classList", "className");
  reflectProperties([{
    id: [""]
  }], Element);
  var HTMLElement = class extends Element {
    constructor(...args) {
      super(...args);
      this[76] = {};
    }
    get form() {
      return matchNearestParent(this, tagNameConditionPredicate(["FORM"]));
    }
    [68]() {
      return [
        7,
        this[7]
      ];
    }
  };
  reflectProperties([{
    accessKey: [""]
  }, {
    contentEditable: ["inherit"]
  }, {
    dir: [""]
  }, {
    lang: [""]
  }, {
    title: [""]
  }, {
    draggable: [
      false,
      void 0,
      ["true", "false"]
    ]
  }, {
    hidden: [
      false,
      void 0
    ]
  }, {
    noModule: [false]
  }, {
    spellcheck: [
      true,
      void 0,
      ["true", "false"]
    ]
  }, {
    translate: [
      true,
      void 0,
      ["yes", "no"]
    ]
  }], HTMLElement);
  var HTMLAnchorElement = class extends HTMLElement {
    constructor(...args) {
      super(...args);
      this._relList = void 0;
    }
    get relList() {
      return this._relList || (this._relList = new DOMTokenList(this, "rel"));
    }
    toString() {
      return this.href;
    }
    get text() {
      return this.textContent;
    }
    set text(text) {
      this.textContent = text;
    }
  };
  registerSubclass("a", HTMLAnchorElement);
  definePropertyBackedAttributes(HTMLAnchorElement, {
    rel: [(el) => el.relList.value, (el, value) => el.relList.value = value]
  });
  synchronizedAccessor(HTMLAnchorElement, "relList", "rel");
  reflectProperties([{
    href: [""]
  }, {
    hreflang: [""]
  }, {
    media: [""]
  }, {
    target: [""]
  }, {
    type: [""]
  }], HTMLAnchorElement);
  var HTMLButtonElement = class extends HTMLElement {
  };
  registerSubclass("button", HTMLButtonElement);
  reflectProperties([{
    formAction: [""]
  }, {
    formEnctype: [""]
  }, {
    formMethod: [""]
  }, {
    formTarget: [""]
  }, {
    name: [""]
  }, {
    type: ["submit"]
  }, {
    value: [""]
  }, {
    autofocus: [false]
  }, {
    disabled: [false]
  }], HTMLButtonElement);
  var f32 = new Float32Array(1);
  var u16 = new Uint16Array(f32.buffer);
  function isSmallInt(num) {
    u16[0] = num;
    return u16[0] === num;
  }
  function serializeTransferrableObject(args) {
    const serialized = [];
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (typeof arg === "number") {
        if (isSmallInt(arg)) {
          serialized.push(1, arg);
        } else {
          f32[0] = arg;
          serialized.push(2, u16[0], u16[1]);
        }
        continue;
      }
      if (typeof arg === "string") {
        serialized.push(3, store());
        continue;
      }
      if (Array.isArray(arg)) {
        serialized.push(4, arg.length);
        const serializedArray = serializeTransferrableObject(arg);
        for (let _i = 0; _i < serializedArray.length; _i++) {
          serialized.push(serializedArray[_i]);
        }
        continue;
      }
      if (typeof arg === "object") {
        const serializedObject = arg[68]();
        for (let _i2 = 0; _i2 < serializedObject.length; _i2++) {
          serialized.push(serializedObject[_i2]);
        }
        continue;
      }
      throw new Error("Cannot serialize argument.");
    }
    return serialized;
  }
  var CanvasGradient = class {
    constructor(id, document) {
      this.id = void 0;
      this.document = void 0;
      this.document = document;
      this.id = id;
    }
    addColorStop(offset, color) {
      transfer(this.document, [
        9,
        store(),
        2,
        ...this[68](),
        ...serializeTransferrableObject([...arguments])
      ]);
    }
    [68]() {
      return [
        5,
        this.id
      ];
    }
  };
  var CanvasPattern = class {
    constructor(id) {
      this.id = void 0;
      this.id = id;
    }
    setTransform() {
    }
    [68]() {
      return [
        5,
        this.id
      ];
    }
  };
  var OffscreenCanvasPolyfill = class {
    constructor(canvas) {
      this.canvas = void 0;
      this.context = void 0;
      this.canvas = canvas;
    }
    getContext(contextType) {
      if (!this.context) {
        if (toLower(contextType) === "2d") {
          this.context = new OffscreenCanvasRenderingContext2DPolyfill(this.canvas);
        } else {
          throw new Error("Context type not supported.");
        }
      }
      return this.context;
    }
  };
  var OffscreenCanvasRenderingContext2DPolyfill = class {
    constructor(canvas) {
      this.canvasElement = void 0;
      this.lineDash = void 0;
      this.objectIndex = 0;
      this.canvasElement = canvas;
      this.lineDash = [];
    }
    [67](fnName, args) {
      transfer(this.canvasElement.ownerDocument, [
        9,
        store(),
        args.length,
        ...this[68](),
        ...serializeTransferrableObject(args)
      ]);
    }
    [68]() {
      return [
        6,
        this.canvasElement[7]
      ];
    }
    createObjectReference(objectId, creationMethod, creationArgs) {
      transfer(this.canvasElement.ownerDocument, [
        10,
        store(),
        objectId,
        creationArgs.length,
        ...this[68](),
        ...serializeTransferrableObject(creationArgs)
      ]);
    }
    get canvas() {
      return this.canvasElement;
    }
    clearRect(x, y, w, h) {
      this[67]("clearRect", [...arguments]);
    }
    fillRect(x, y, w, h) {
      this[67]("fillRect", [...arguments]);
    }
    strokeRect(x, y, w, h) {
      this[67]("strokeRect", [...arguments]);
    }
    set lineWidth(value) {
      this[67]("lineWidth", [...arguments]);
    }
    fillText(text, x, y, maxWidth) {
      this[67]("fillText", [...arguments]);
    }
    moveTo(x, y) {
      this[67]("moveTo", [...arguments]);
    }
    lineTo(x, y) {
      this[67]("lineTo", [...arguments]);
    }
    closePath() {
      this[67]("closePath", []);
    }
    stroke() {
      this[67]("stroke", []);
    }
    restore() {
      this[67]("restore", []);
    }
    save() {
      this[67]("save", []);
    }
    resetTransform() {
      this[67]("resetTransform", []);
    }
    rotate(angle) {
      this[67]("rotate", [...arguments]);
    }
    transform(a, b, c, d, e, f) {
      this[67]("transform", [...arguments]);
    }
    translate(x, y) {
      this[67]("translate", [...arguments]);
    }
    scale(x, y) {
      this[67]("scale", [...arguments]);
    }
    set globalAlpha(value) {
      this[67]("globalAlpha", [...arguments]);
    }
    set globalCompositeOperation(value) {
      this[67]("globalCompositeOperation", [...arguments]);
    }
    set imageSmoothingQuality(value) {
      this[67]("imageSmoothingQuality", [...arguments]);
    }
    set fillStyle(value) {
      this[67]("fillStyle", [...arguments]);
    }
    set strokeStyle(value) {
      this[67]("strokeStyle", [...arguments]);
    }
    set shadowBlur(value) {
      this[67]("shadowBlur", [...arguments]);
    }
    set shadowColor(value) {
      this[67]("shadowColor", [...arguments]);
    }
    set shadowOffsetX(value) {
      this[67]("shadowOffsetX", [...arguments]);
    }
    set shadowOffsetY(value) {
      this[67]("shadowOffsetY", [...arguments]);
    }
    set filter(value) {
      this[67]("filter", [...arguments]);
    }
    beginPath() {
      this[67]("beginPath", []);
    }
    strokeText(text, x, y, maxWidth) {
      this[67]("strokeText", [...arguments]);
    }
    set textAlign(value) {
      this[67]("textAlign", [...arguments]);
    }
    set textBaseline(value) {
      this[67]("textBaseline", [...arguments]);
    }
    set lineCap(value) {
      this[67]("lineCap", [...arguments]);
    }
    set lineDashOffset(value) {
      this[67]("lineDashOffset", [...arguments]);
    }
    set lineJoin(value) {
      this[67]("lineJoin", [...arguments]);
    }
    set miterLimit(value) {
      this[67]("miterLimit", [...arguments]);
    }
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
      this[67]("arc", [...arguments]);
    }
    arcTo(x1, y1, x2, y2, radius) {
      this[67]("arcTo", [...arguments]);
    }
    set direction(value) {
      this[67]("direction", [...arguments]);
    }
    set font(value) {
      this[67]("font", [...arguments]);
    }
    ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
      this[67]("ellipse", [...arguments]);
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
      this[67]("bezierCurveTo", [...arguments]);
    }
    rect(x, y, width, height) {
      this[67]("rect", [...arguments]);
    }
    quadraticCurveTo(cpx, cpy, x, y) {
      this[67]("quadraticCurveTo", [...arguments]);
    }
    set imageSmoothingEnabled(value) {
      this[67]("imageSmoothingEnabled", [...arguments]);
    }
    setLineDash(lineDash) {
      lineDash = [...lineDash];
      if (lineDash.length % 2 !== 0) {
        lineDash = lineDash.concat(lineDash);
      }
      this.lineDash = lineDash;
      this[67]("setLineDash", [...arguments]);
    }
    getLineDash() {
      return [...this.lineDash];
    }
    clip(pathOrFillRule, fillRule) {
      if (typeof pathOrFillRule === "object") {
        throw new Error("clip(Path2D) is currently not supported!");
      }
      this[67]("clip", [...arguments]);
    }
    fill(pathOrFillRule, fillRule) {
      if (typeof pathOrFillRule === "object") {
        throw new Error("fill(Path2D) is currently not supported!");
      }
      this[67]("fill", [...arguments]);
    }
    setTransform(transformOrA, bOrC, cOrD, dOrE, eOrF, f) {
      if (typeof transformOrA === "object") {
        throw new Error("setTransform(DOMMatrix2DInit) is currently not supported!");
      }
      this[67]("setTransform", [...arguments]);
    }
    createLinearGradient(x0, y0, x1, y1) {
      const gradientId = this.objectIndex++;
      this.createObjectReference(gradientId, "createLinearGradient", [...arguments]);
      return new CanvasGradient(gradientId, this.canvasElement.ownerDocument);
    }
    createRadialGradient(x0, y0, r0, x1, y1, r1) {
      const gradientId = this.objectIndex++;
      this.createObjectReference(gradientId, "createRadialGradient", [...arguments]);
      return new CanvasGradient(gradientId, this.canvasElement.ownerDocument);
    }
    createPattern(image, repetition) {
      const patternId = this.objectIndex++;
      this.createObjectReference(patternId, "createPattern", [...arguments]);
      return new CanvasPattern(patternId);
    }
    drawImage(image, dx, dy) {
      this[67]("drawImage", [...arguments]);
    }
    createImageData() {
      return {};
    }
    getImageData() {
      return {};
    }
    putImageData() {
    }
    isPointInPath() {
      throw new Error("isPointInPath is not implemented.");
    }
    isPointInStroke() {
      throw new Error("isPointInStroke is not implemented.");
    }
    measureText() {
      throw new Error("measureText is not implemented.");
    }
  };
  var indexTracker = 0;
  function retrieveImageBitmap(image, canvas) {
    const callIndex = indexTracker++;
    const document = canvas.ownerDocument;
    return new Promise((resolve) => {
      const messageHandler = ({
        data
      }) => {
        if (data[12] === 10 && data[73] === callIndex) {
          document.removeGlobalEventListener("message", messageHandler);
          const transferredImageBitmap = data[38];
          resolve(transferredImageBitmap);
        }
      };
      if (!document.addGlobalEventListener) {
        throw new Error("addGlobalEventListener is not defined.");
      } else {
        document.addGlobalEventListener("message", messageHandler);
        transfer(canvas.ownerDocument, [
          11,
          image[7],
          callIndex
        ]);
      }
    });
  }
  var FakeNativeCanvasPattern = class {
    constructor() {
      this[70] = {};
      this[71] = false;
      this[72] = void 0;
    }
    [69](canvas, image, repetition) {
      this[72] = retrieveImageBitmap(image, canvas).then((instance) => {
        const pattern = canvas.getContext("2d").createPattern(instance, repetition);
        if (!pattern) {
          throw new Error("Pattern is null!");
        }
        this[70] = pattern;
        this[71] = true;
      });
      return this[72];
    }
    setTransform() {
    }
  };
  var deferredUpgrades = /* @__PURE__ */ new WeakMap();
  var CanvasRenderingContext2DShim = class {
    constructor(canvas) {
      this.queue = [];
      this.implementation = void 0;
      this.upgraded = false;
      this.canvasElement = void 0;
      this.polyfillUsed = void 0;
      this.unresolvedCalls = 0;
      this.goodImplementation = void 0;
      this.canvasElement = canvas;
      const OffscreenCanvas = canvas.ownerDocument.defaultView.OffscreenCanvas;
      if (typeof OffscreenCanvas === "undefined") {
        this.implementation = new OffscreenCanvasPolyfill(canvas).getContext("2d");
        this.upgraded = true;
        this.polyfillUsed = true;
      } else {
        this.implementation = new OffscreenCanvas(0, 0).getContext("2d");
        this.getOffscreenCanvasAsync(this.canvasElement);
        this.polyfillUsed = false;
      }
    }
    getOffscreenCanvasAsync(canvas) {
      this.unresolvedCalls++;
      const deferred = {};
      const document = this.canvasElement.ownerDocument;
      const isTestMode = !document.addGlobalEventListener;
      const upgradePromise = new Promise((resolve) => {
        const messageHandler = ({
          data
        }) => {
          if (data[12] === 9 && data[13][0] === canvas[7]) {
            document.removeGlobalEventListener("message", messageHandler);
            const transferredOffscreenCanvas = data[38];
            resolve(transferredOffscreenCanvas);
          }
        };
        if (!document.addGlobalEventListener) {
          if (isTestMode) {
            deferred.resolve = resolve;
          } else {
            throw new Error("addGlobalEventListener is not defined.");
          }
        } else {
          document.addGlobalEventListener("message", messageHandler);
          transfer(canvas.ownerDocument, [
            8,
            canvas[7]
          ]);
        }
      }).then((instance) => {
        this.goodImplementation = instance.getContext("2d");
        this.maybeUpgradeImplementation();
      });
      if (isTestMode) {
        deferred.upgradePromise = upgradePromise;
        deferredUpgrades.set(canvas, deferred);
      }
      return upgradePromise;
    }
    degradeImplementation() {
      this.upgraded = false;
      const OffscreenCanvas = this.canvasElement.ownerDocument.defaultView.OffscreenCanvas;
      this.implementation = new OffscreenCanvas(0, 0).getContext("2d");
      this.unresolvedCalls++;
    }
    maybeUpgradeImplementation() {
      this.unresolvedCalls--;
      if (this.unresolvedCalls === 0) {
        this.implementation = this.goodImplementation;
        this.upgraded = true;
        this.flushQueue();
      }
    }
    flushQueue() {
      for (const call of this.queue) {
        if (call.isSetter) {
          this[call.fnName] = call.args[0];
        } else {
          this[call.fnName](...call.args);
        }
      }
      this.queue.length = 0;
    }
    delegateFunc(name, args) {
      const returnValue = this.implementation[name](...args);
      if (!this.upgraded) {
        this.queue.push({
          fnName: name,
          args,
          isSetter: false
        });
      }
      return returnValue;
    }
    delegateSetter(name, args) {
      this.implementation[name] = args[0];
      if (!this.upgraded) {
        this.queue.push({
          fnName: name,
          args,
          isSetter: true
        });
      }
    }
    delegateGetter(name) {
      return this.implementation[name];
    }
    clearRect(x, y, width, height) {
      this.delegateFunc("clearRect", [...arguments]);
    }
    fillRect(x, y, width, height) {
      this.delegateFunc("fillRect", [...arguments]);
    }
    strokeRect(x, y, width, height) {
      this.delegateFunc("strokeRect", [...arguments]);
    }
    fillText(text, x, y, maxWidth) {
      this.delegateFunc("fillText", [...arguments]);
    }
    strokeText(text, x, y, maxWidth) {
      this.delegateFunc("strokeText", [...arguments]);
    }
    measureText(text) {
      return this.delegateFunc("measureText", [...arguments]);
    }
    set lineWidth(value) {
      this.delegateSetter("lineWidth", [...arguments]);
    }
    get lineWidth() {
      return this.delegateGetter("lineWidth");
    }
    set lineCap(value) {
      this.delegateSetter("lineCap", [...arguments]);
    }
    get lineCap() {
      return this.delegateGetter("lineCap");
    }
    set lineJoin(value) {
      this.delegateSetter("lineJoin", [...arguments]);
    }
    get lineJoin() {
      return this.delegateGetter("lineJoin");
    }
    set miterLimit(value) {
      this.delegateSetter("miterLimit", [...arguments]);
    }
    get miterLimit() {
      return this.delegateGetter("miterLimit");
    }
    getLineDash() {
      return this.delegateFunc("getLineDash", [...arguments]);
    }
    setLineDash(segments) {
      this.delegateFunc("setLineDash", [...arguments]);
    }
    set lineDashOffset(value) {
      this.delegateSetter("lineDashOffset", [...arguments]);
    }
    get lineDashOffset() {
      return this.delegateGetter("lineDashOffset");
    }
    set font(value) {
      this.delegateSetter("font", [...arguments]);
    }
    get font() {
      return this.delegateGetter("font");
    }
    set textAlign(value) {
      this.delegateSetter("textAlign", [...arguments]);
    }
    get textAlign() {
      return this.delegateGetter("textAlign");
    }
    set textBaseline(value) {
      this.delegateSetter("textBaseline", [...arguments]);
    }
    get textBaseline() {
      return this.delegateGetter("textBaseline");
    }
    set direction(value) {
      this.delegateSetter("direction", [...arguments]);
    }
    get direction() {
      return this.delegateGetter("direction");
    }
    set fillStyle(value) {
      if (value instanceof FakeNativeCanvasPattern && this.upgraded) {
        if (!value[71]) {
          this.queue.push({
            fnName: "fillStyle",
            args: [value],
            isSetter: true
          });
          this.degradeImplementation();
          value[72].then(() => {
            this.maybeUpgradeImplementation();
          });
        } else {
          this.delegateSetter("fillStyle", [value[70]]);
        }
      } else {
        this.delegateSetter("fillStyle", [...arguments]);
      }
    }
    get fillStyle() {
      return this.delegateGetter("fillStyle");
    }
    set strokeStyle(value) {
      if (value instanceof FakeNativeCanvasPattern && this.upgraded) {
        if (!value[71]) {
          this.queue.push({
            fnName: "strokeStyle",
            args: [value],
            isSetter: true
          });
          this.degradeImplementation();
          value[72].then(() => {
            this.maybeUpgradeImplementation();
          });
        } else {
          this.delegateSetter("strokeStyle", [value[70]]);
        }
      } else {
        this.delegateSetter("strokeStyle", [...arguments]);
      }
    }
    get strokeStyle() {
      return this.delegateGetter("strokeStyle");
    }
    createLinearGradient(x0, y0, x1, y1) {
      return this.delegateFunc("createLinearGradient", [...arguments]);
    }
    createRadialGradient(x0, y0, r0, x1, y1, r1) {
      return this.delegateFunc("createRadialGradient", [...arguments]);
    }
    createPattern(image, repetition) {
      const ImageBitmap = this.canvasElement.ownerDocument.defaultView.ImageBitmap;
      if (this.polyfillUsed || image instanceof ImageBitmap) {
        return this.delegateFunc("createPattern", [...arguments]);
      } else {
        this.degradeImplementation();
        const fakePattern = new FakeNativeCanvasPattern();
        fakePattern[69](this.canvas, image, repetition).then(() => {
          this.maybeUpgradeImplementation();
        });
        return fakePattern;
      }
    }
    drawImage(image, dx, dy) {
      const ImageBitmap = this.canvasElement.ownerDocument.defaultView.ImageBitmap;
      if (this.polyfillUsed || image instanceof ImageBitmap) {
        this.delegateFunc("drawImage", [...arguments]);
      } else {
        const args = [];
        this.queue.push({
          fnName: "drawImage",
          args,
          isSetter: false
        });
        this.degradeImplementation();
        retrieveImageBitmap(image, this.canvas).then((instance) => {
          args.push(instance, dx, dy);
          this.maybeUpgradeImplementation();
        });
      }
    }
    set shadowBlur(value) {
      this.delegateSetter("shadowBlur", [...arguments]);
    }
    get shadowBlur() {
      return this.delegateGetter("shadowBlur");
    }
    set shadowColor(value) {
      this.delegateSetter("shadowColor", [...arguments]);
    }
    get shadowColor() {
      return this.delegateGetter("shadowColor");
    }
    set shadowOffsetX(value) {
      this.delegateSetter("shadowOffsetX", [...arguments]);
    }
    get shadowOffsetX() {
      return this.delegateGetter("shadowOffsetX");
    }
    set shadowOffsetY(value) {
      this.delegateSetter("shadowOffsetY", [...arguments]);
    }
    get shadowOffsetY() {
      return this.delegateGetter("shadowOffsetY");
    }
    beginPath() {
      this.delegateFunc("beginPath", [...arguments]);
    }
    closePath() {
      this.delegateFunc("closePath", [...arguments]);
    }
    moveTo(x, y) {
      this.delegateFunc("moveTo", [...arguments]);
    }
    lineTo(x, y) {
      this.delegateFunc("lineTo", [...arguments]);
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
      this.delegateFunc("bezierCurveTo", [...arguments]);
    }
    quadraticCurveTo(cpx, cpy, x, y) {
      this.delegateFunc("quadraticCurveTo", [...arguments]);
    }
    arc(x, y, radius, startAngle, endAngle, antiClockwise) {
      this.delegateFunc("arc", [...arguments]);
    }
    arcTo(x1, y1, x2, y2, radius) {
      this.delegateFunc("arcTo", [...arguments]);
    }
    ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
      this.delegateFunc("ellipse", [...arguments]);
    }
    rect(x, y, width, height) {
      this.delegateFunc("rect", [...arguments]);
    }
    fill(pathOrFillRule, fillRule) {
      const args = [...arguments];
      this.delegateFunc("fill", args);
    }
    stroke(path) {
      const args = [...arguments];
      this.delegateFunc("stroke", args);
    }
    clip(pathOrFillRule, fillRule) {
      const args = [...arguments];
      this.delegateFunc("clip", args);
    }
    isPointInPath(pathOrX, xOrY, yOrFillRule, fillRule) {
      const args = [...arguments];
      return this.delegateFunc("isPointInPath", args);
    }
    isPointInStroke(pathOrX, xOrY, y) {
      const args = [...arguments];
      return this.delegateFunc("isPointInStroke", args);
    }
    rotate(angle) {
      this.delegateFunc("rotate", [...arguments]);
    }
    scale(x, y) {
      this.delegateFunc("scale", [...arguments]);
    }
    translate(x, y) {
      this.delegateFunc("translate", [...arguments]);
    }
    transform(a, b, c, d, e, f) {
      this.delegateFunc("transform", [...arguments]);
    }
    setTransform(transformOrA, bOrC, cOrD, dOrE, eOrF, f) {
      const args = [...arguments];
      this.delegateFunc("setTransform", args);
    }
    resetTransform() {
      this.delegateFunc("resetTransform", [...arguments]);
    }
    set globalAlpha(value) {
      this.delegateSetter("globalAlpha", [...arguments]);
    }
    get globalAlpha() {
      return this.delegateGetter("globalAlpha");
    }
    set globalCompositeOperation(value) {
      this.delegateSetter("globalCompositeOperation", [...arguments]);
    }
    get globalCompositeOperation() {
      return this.delegateGetter("globalCompositeOperation");
    }
    createImageData(imagedataOrWidth, height) {
      const args = [...arguments];
      return this.delegateFunc("createImageData", args);
    }
    getImageData(sx, sy, sw, sh) {
      return this.delegateFunc("getImageData", [...arguments]);
    }
    putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
      this.delegateFunc("putImageData", [...arguments]);
    }
    set imageSmoothingEnabled(value) {
      this.delegateSetter("imageSmoothingEnabled", [...arguments]);
    }
    get imageSmoothingEnabled() {
      return this.delegateGetter("imageSmoothingEnabled");
    }
    set imageSmoothingQuality(value) {
      this.delegateSetter("imageSmoothingQuality", [...arguments]);
    }
    get imageSmoothingQuality() {
      return this.delegateGetter("imageSmoothingQuality");
    }
    save() {
      this.delegateFunc("save", [...arguments]);
    }
    restore() {
      this.delegateFunc("restore", [...arguments]);
    }
    get canvas() {
      return this.canvasElement;
    }
    set filter(value) {
      this.delegateSetter("filter", [...arguments]);
    }
    get filter() {
      return this.delegateGetter("filter");
    }
  };
  var HTMLCanvasElement = class extends HTMLElement {
    constructor(...args) {
      super(...args);
      this.context = void 0;
    }
    getContext(contextType) {
      if (!this.context) {
        if (contextType === "2D" || contextType === "2d") {
          this.context = new CanvasRenderingContext2DShim(this);
        } else {
          throw new Error("Context type not supported.");
        }
      }
      return this.context;
    }
  };
  registerSubclass("canvas", HTMLCanvasElement);
  reflectProperties([{
    height: [0]
  }, {
    width: [0]
  }], HTMLCanvasElement);
  var HTMLDataElement = class extends HTMLElement {
  };
  registerSubclass("data", HTMLDataElement);
  reflectProperties([{
    value: [""]
  }], HTMLDataElement);
  var HTMLDataListElement = class extends HTMLElement {
    get options() {
      return this.childNodes.filter((node) => node.nodeName === "OPTION");
    }
  };
  registerSubclass("datalist", HTMLDataListElement);
  var HTMLEmbedElement = class extends HTMLElement {
  };
  registerSubclass("embed", HTMLEmbedElement);
  reflectProperties([{
    height: [""]
  }, {
    src: [""]
  }, {
    type: [""]
  }, {
    width: [""]
  }], HTMLEmbedElement);
  var MATCHING_CHILD_ELEMENT_TAGNAMES = "BUTTON FIELDSET INPUT OBJECT OUTPUT SELECT TEXTAREA".split(" ");
  var HTMLFormControlsCollectionMixin = (defineOn) => {
    Object.defineProperty(defineOn.prototype, "elements", {
      get() {
        return matchChildrenElements(this, tagNameConditionPredicate(MATCHING_CHILD_ELEMENT_TAGNAMES));
      }
    });
  };
  var HTMLFieldSetElement = class extends HTMLElement {
    get type() {
      return toLower(this.tagName);
    }
  };
  registerSubclass("fieldset", HTMLFieldSetElement);
  HTMLFormControlsCollectionMixin(HTMLFieldSetElement);
  reflectProperties([{
    name: [""]
  }, {
    disabled: [false]
  }], HTMLFieldSetElement);
  var HTMLFormElement = class extends HTMLElement {
    get length() {
      return this.elements.length;
    }
  };
  registerSubclass("form", HTMLFormElement);
  HTMLFormControlsCollectionMixin(HTMLFormElement);
  reflectProperties([{
    name: [""]
  }, {
    method: ["get"]
  }, {
    target: [""]
  }, {
    action: [""]
  }, {
    enctype: ["application/x-www-form-urlencoded"]
  }, {
    acceptCharset: [
      "",
      "accept-charset"
    ]
  }, {
    autocomplete: ["on"]
  }, {
    autocapitalize: ["sentences"]
  }], HTMLFormElement);
  var HTMLIFrameElement = class extends HTMLElement {
    constructor(...args) {
      super(...args);
      this._sandbox = void 0;
    }
    get sandbox() {
      return this._sandbox || (this._sandbox = new DOMTokenList(this, "sandbox"));
    }
  };
  registerSubclass("iframe", HTMLIFrameElement);
  definePropertyBackedAttributes(HTMLIFrameElement, {
    sandbox: [(el) => el.sandbox.value, (el, value) => el.sandbox.value = value]
  });
  reflectProperties([{
    allow: [""]
  }, {
    allowFullscreen: [false]
  }, {
    csp: [""]
  }, {
    height: [""]
  }, {
    name: [""]
  }, {
    referrerPolicy: [""]
  }, {
    src: [""]
  }, {
    srcdoc: [""]
  }, {
    width: [""]
  }], HTMLIFrameElement);
  var HTMLImageElement = class extends HTMLElement {
  };
  registerSubclass("img", HTMLImageElement);
  reflectProperties([{
    alt: [""]
  }, {
    crossOrigin: [""]
  }, {
    height: [0]
  }, {
    isMap: [false]
  }, {
    referrerPolicy: [""]
  }, {
    src: [""]
  }, {
    sizes: [""]
  }, {
    srcset: [""]
  }, {
    useMap: [""]
  }, {
    width: [0]
  }], HTMLImageElement);
  var HTMLInputLabelsMixin = (defineOn) => {
    Object.defineProperty(defineOn.prototype, "labels", {
      get() {
        return matchChildrenElements(this.ownerDocument || this, (element) => element.tagName === "LABEL" && element.for && element.for === this.id);
      }
    });
  };
  var HTMLInputElement = class extends HTMLElement {
    constructor(...args) {
      super(...args);
      this[21] = "";
      this.dirtyValue = false;
      this[47] = false;
    }
    get value() {
      return !this.dirtyValue ? this.getAttribute("value") || "" : this[21];
    }
    set value(value) {
      this[21] = String(value);
      this.dirtyValue = true;
      transfer(this.ownerDocument, [
        3,
        this[7],
        store(),
        0,
        store()
      ]);
    }
    get valueAsDate() {
      const date = this.stringToDate(this.value);
      const invalid = !date || isNaN(date.getTime());
      return invalid ? null : date;
    }
    set valueAsDate(value) {
      if (!(value instanceof Date)) {
        throw new TypeError("The provided value is not a Date.");
      }
      this.value = this.dateToString(value);
    }
    get valueAsNumber() {
      if (this.value.length === 0) {
        return NaN;
      }
      return Number(this.value);
    }
    set valueAsNumber(value) {
      if (typeof value === "number") {
        this.value = String(value);
      } else {
        this.value = "";
      }
    }
    get checked() {
      return this[47];
    }
    set checked(value) {
      if (this[47] === value) {
        return;
      }
      this[47] = !!value;
      transfer(this.ownerDocument, [
        3,
        this[7],
        store(),
        1,
        value === true ? 1 : 0
      ]);
    }
    dateToString(date) {
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      return `${y}-${m > 9 ? "" : "0"}${m}-${d > 9 ? "" : "0"}${d}`;
    }
    stringToDate(str) {
      const components = str.split("-");
      if (components.length !== 3) {
        return null;
      }
      const [y, m, d] = components;
      return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
    }
  };
  registerSubclass("input", HTMLInputElement);
  HTMLInputLabelsMixin(HTMLInputElement);
  reflectProperties([{
    accept: [""]
  }, {
    alt: [""]
  }, {
    autocapitalize: [""]
  }, {
    autocomplete: [""]
  }, {
    autofocus: [false]
  }, {
    defaultChecked: [
      false,
      "checked"
    ]
  }, {
    defaultValue: [
      "",
      "value"
    ]
  }, {
    dirName: [""]
  }, {
    disabled: [false]
  }, {
    formAction: [""]
  }, {
    formEncType: [""]
  }, {
    formMethod: [""]
  }, {
    formTarget: [""]
  }, {
    height: [0]
  }, {
    max: [""]
  }, {
    maxLength: [0]
  }, {
    min: [""]
  }, {
    multiple: [false]
  }, {
    name: [""]
  }, {
    pattern: [""]
  }, {
    placeholder: [""]
  }, {
    readOnly: [false]
  }, {
    required: [false]
  }, {
    size: [0]
  }, {
    src: [""]
  }, {
    step: [""]
  }, {
    type: ["text"]
  }, {
    width: [0]
  }], HTMLInputElement);
  var HTMLLabelElement = class extends HTMLElement {
    get control() {
      const htmlFor2 = this.getAttribute("for");
      if (htmlFor2 !== null) {
        return this.ownerDocument && this.ownerDocument.getElementById(htmlFor2);
      }
      return matchChildElement(this, tagNameConditionPredicate(["INPUT"]));
    }
  };
  registerSubclass("label", HTMLLabelElement);
  reflectProperties([{
    htmlFor: ["", "for"]
  }], HTMLLabelElement);
  var HTMLLinkElement = class extends HTMLElement {
    constructor(...args) {
      super(...args);
      this._relList = void 0;
    }
    get relList() {
      return this._relList || (this._relList = new DOMTokenList(this, "rel"));
    }
  };
  registerSubclass("link", HTMLLinkElement);
  definePropertyBackedAttributes(HTMLLinkElement, {
    rel: [(el) => el.relList.value, (el, value) => el.relList.value = value]
  });
  synchronizedAccessor(HTMLLinkElement, "relList", "rel");
  reflectProperties([{
    as: [""]
  }, {
    crossOrigin: [""]
  }, {
    disabled: [false]
  }, {
    href: [""]
  }, {
    hreflang: [""]
  }, {
    media: [""]
  }, {
    referrerPolicy: [""]
  }, {
    sizes: [""]
  }, {
    type: [""]
  }], HTMLLinkElement);
  var HTMLMapElement = class extends HTMLElement {
    get areas() {
      return matchChildrenElements(this, (element) => element.tagName === "AREA");
    }
  };
  registerSubclass("map", HTMLMapElement);
  reflectProperties([{
    name: [""]
  }], HTMLMapElement);
  var HTMLMeterElement = class extends HTMLElement {
  };
  registerSubclass("meter", HTMLMeterElement);
  HTMLInputLabelsMixin(HTMLMeterElement);
  reflectProperties([{
    high: [0]
  }, {
    low: [0]
  }, {
    max: [1]
  }, {
    min: [0]
  }, {
    optimum: [0]
  }, {
    value: [0]
  }], HTMLMeterElement);
  var HTMLModElement = class extends HTMLElement {
  };
  registerSubclass("del", HTMLModElement);
  registerSubclass("ins", HTMLModElement);
  reflectProperties([{
    cite: [""]
  }, {
    datetime: [""]
  }], HTMLModElement);
  var HTMLOListElement = class extends HTMLElement {
  };
  registerSubclass("ol", HTMLOListElement);
  reflectProperties([{
    reversed: [false]
  }, {
    start: [1]
  }, {
    type: [""]
  }], HTMLOListElement);
  var HTMLOptionElement = class extends HTMLElement {
    constructor(...args) {
      super(...args);
      this[52] = false;
    }
    get index() {
      return this.parentNode && this.parentNode.children.indexOf(this) || 0;
    }
    get label() {
      return this.getAttribute("label") || this.textContent;
    }
    set label(label) {
      this.setAttribute("label", label);
    }
    get selected() {
      return this[52];
    }
    set selected(value) {
      this[52] = !!value;
      transfer(this.ownerDocument, [
        3,
        this[7],
        store(),
        1,
        this[52] ? 1 : 0
      ]);
    }
    get text() {
      return this.textContent;
    }
    set text(text) {
      this.textContent = text;
    }
    get value() {
      return this.getAttribute("value") || this.textContent;
    }
    set value(value) {
      this.setAttribute("value", value);
    }
  };
  registerSubclass("option", HTMLOptionElement);
  definePropertyBackedAttributes(HTMLOptionElement, {
    selected: [(el) => String(el[52]), (el, value) => el.selected = value === "true"]
  });
  reflectProperties([{
    defaultSelected: [
      false,
      "selected"
    ]
  }, {
    disabled: [false]
  }, {
    type: [""]
  }], HTMLOptionElement);
  var HTMLProgressElement = class extends HTMLElement {
    constructor(...args) {
      super(...args);
      this[48] = true;
      this[21] = 0;
      this.dirtyValue = false;
    }
    get position() {
      return this[48] ? -1 : this.value / this.max;
    }
    get value() {
      return !this.dirtyValue ? Number(this.getAttribute("value")) || 0 : this[21];
    }
    set value(value) {
      this[48] = false;
      this[21] = value;
      this.dirtyValue = true;
    }
  };
  registerSubclass("progress", HTMLProgressElement);
  HTMLInputLabelsMixin(HTMLProgressElement);
  reflectProperties([{
    max: [1]
  }], HTMLProgressElement);
  var HTMLQuoteElement = class extends HTMLElement {
  };
  registerSubclass("blockquote", HTMLQuoteElement);
  registerSubclass("q", HTMLQuoteElement);
  reflectProperties([{
    cite: [""]
  }], HTMLQuoteElement);
  var HTMLScriptElement = class extends HTMLElement {
    get text() {
      return this.textContent;
    }
    set text(text) {
      this.textContent = text;
    }
  };
  registerSubclass("script", HTMLScriptElement);
  reflectProperties([{
    type: [""]
  }, {
    src: [""]
  }, {
    charset: [""]
  }, {
    async: [false]
  }, {
    defer: [false]
  }, {
    crossOrigin: [""]
  }, {
    noModule: [false]
  }], HTMLScriptElement);
  var isOptionPredicate = tagNameConditionPredicate(["OPTION"]);
  var isSelectedOptionPredicate = (element) => isOptionPredicate(element) && element.selected === true;
  var HTMLSelectElement = class extends HTMLElement {
    constructor(...args) {
      super(...args);
      this[49] = -1;
    }
    [56](child) {
      super[56](child);
      if (!this.multiple && isOptionPredicate(child) && child.selected || this.value === "") {
        this.value = child.value;
      }
    }
    [57](child) {
      super[57](child);
      if (!this.multiple && child.selected) {
        const options = this.options;
        if (options.length > 0) {
          this.value = options[0].value;
        }
      }
    }
    get length() {
      return this.options.length;
    }
    get options() {
      return this.children.filter(isOptionPredicate);
    }
    get selectedIndex() {
      const firstSelectedChild = matchChildElement(this, isSelectedOptionPredicate);
      return firstSelectedChild ? this.children.indexOf(firstSelectedChild) : -1;
    }
    set selectedIndex(selectedIndex) {
      this.children.forEach((element, index) => element.selected = index === selectedIndex);
    }
    get selectedOptions() {
      return matchChildrenElements(this, isSelectedOptionPredicate);
    }
    get size() {
      return this[49] === -1 ? this.multiple ? 4 : 1 : this[49];
    }
    set size(size) {
      this[49] = size > 0 ? size : this.multiple ? 4 : 1;
    }
    get type() {
      return this.multiple ? "select-one" : "select-multiple";
    }
    get value() {
      const firstSelectedChild = matchChildElement(this, isSelectedOptionPredicate);
      return firstSelectedChild ? firstSelectedChild.value : "";
    }
    set value(value) {
      const stringValue = String(value);
      this.children.forEach((element) => isOptionPredicate(element) && (element.selected = element.value === stringValue));
    }
  };
  registerSubclass("select", HTMLSelectElement);
  HTMLInputLabelsMixin(HTMLSelectElement);
  reflectProperties([{
    multiple: [false]
  }, {
    name: [""]
  }, {
    required: [false]
  }], HTMLSelectElement);
  var HTMLSourceElement = class extends HTMLElement {
  };
  registerSubclass("source", HTMLSourceElement);
  reflectProperties([{
    media: [""]
  }, {
    sizes: [""]
  }, {
    src: [""]
  }, {
    srcset: [""]
  }, {
    type: [""]
  }], HTMLSourceElement);
  var HTMLStyleElement = class extends HTMLElement {
  };
  registerSubclass("style", HTMLStyleElement);
  reflectProperties([{
    media: [""]
  }, {
    type: [""]
  }], HTMLStyleElement);
  var HTMLTableCellElement = class extends HTMLElement {
    constructor(...args) {
      super(...args);
      this._headers = void 0;
    }
    get headers() {
      return this._headers || (this._headers = new DOMTokenList(this, "headers"));
    }
    get cellIndex() {
      const parent = matchNearestParent(this, tagNameConditionPredicate(["TR"]));
      return parent !== null ? matchChildrenElements(parent, tagNameConditionPredicate(["TH", "TD"])).indexOf(this) : -1;
    }
  };
  registerSubclass("th", HTMLTableCellElement);
  registerSubclass("td", HTMLTableCellElement);
  definePropertyBackedAttributes(HTMLTableCellElement, {
    headers: [(el) => el.headers.value, (el, value) => el.headers.value = value]
  });
  reflectProperties([{
    abbr: [""]
  }, {
    colSpan: [1]
  }, {
    rowSpan: [1]
  }, {
    scope: [""]
  }], HTMLTableCellElement);
  var HTMLTableColElement = class extends HTMLElement {
  };
  registerSubclass("col", HTMLTableColElement);
  reflectProperties([{
    span: [1]
  }], HTMLTableColElement);
  var removeElement = (element) => element && element.remove();
  var insertBeforeElementsWithTagName = (parent, element, tagNames) => {
    const insertBeforeElement = matchChildElement(parent, (element2) => !tagNames.includes(element2.tagName));
    if (insertBeforeElement) {
      parent.insertBefore(element, insertBeforeElement);
    } else {
      parent.appendChild(element);
    }
  };
  var HTMLTableElement = class extends HTMLElement {
    get caption() {
      return matchChildElement(this, tagNameConditionPredicate(["CAPTION"]));
    }
    set caption(newElement) {
      if (newElement && newElement.tagName === "CAPTION") {
        removeElement(this.caption);
        this.insertBefore(newElement, this.firstElementChild);
      }
    }
    get tHead() {
      return matchChildElement(this, tagNameConditionPredicate(["THEAD"]));
    }
    set tHead(newElement) {
      if (newElement && newElement.tagName === "THEAD") {
        removeElement(this.tHead);
        insertBeforeElementsWithTagName(this, newElement, ["CAPTION", "COLGROUP"]);
      }
    }
    get tFoot() {
      return matchChildElement(this, tagNameConditionPredicate(["TFOOT"]));
    }
    set tFoot(newElement) {
      if (newElement && newElement.tagName === "TFOOT") {
        removeElement(this.tFoot);
        insertBeforeElementsWithTagName(this, newElement, ["CAPTION", "COLGROUP", "THEAD"]);
      }
    }
    get rows() {
      return matchChildrenElements(this, tagNameConditionPredicate(["TR"]));
    }
    get tBodies() {
      return matchChildrenElements(this, tagNameConditionPredicate(["TBODY"]));
    }
  };
  registerSubclass("table", HTMLTableElement);
  var TABLE_SECTION_TAGNAMES = "TABLE TBODY THEAD TFOOT".split(" ");
  var indexInAncestor = (element, isValidAncestor) => {
    const parent = matchNearestParent(element, isValidAncestor);
    return parent === null ? -1 : parent.rows.indexOf(element);
  };
  var HTMLTableRowElement = class extends HTMLElement {
    get cells() {
      return matchChildrenElements(this, tagNameConditionPredicate(["TD", "TH"]));
    }
    get rowIndex() {
      return indexInAncestor(this, tagNameConditionPredicate(["TABLE"]));
    }
    get sectionRowIndex() {
      return indexInAncestor(this, tagNameConditionPredicate(TABLE_SECTION_TAGNAMES));
    }
    deleteCell(index) {
      const cell = this.cells[index];
      if (cell) {
        cell.remove();
      }
    }
    insertCell(index) {
      const cells = this.cells;
      const td = this.ownerDocument.createElement("td");
      if (index < 0 || index >= cells.length) {
        this.appendChild(td);
      } else {
        this.insertBefore(td, this.children[index]);
      }
      return td;
    }
  };
  registerSubclass("tr", HTMLTableRowElement);
  var HTMLTableSectionElement = class extends HTMLElement {
    get rows() {
      return matchChildrenElements(this, tagNameConditionPredicate(["TR"]));
    }
    deleteRow(index) {
      const rows = this.rows;
      if (index >= 0 || index <= rows.length) {
        rows[index].remove();
      }
    }
    insertRow(index) {
      const rows = this.rows;
      const tr = this.ownerDocument.createElement("tr");
      if (index < 0 || index >= rows.length) {
        this.appendChild(tr);
      } else {
        this.insertBefore(tr, this.children[index]);
      }
      return tr;
    }
  };
  registerSubclass("thead", HTMLTableSectionElement);
  registerSubclass("tfoot", HTMLTableSectionElement);
  registerSubclass("tbody", HTMLTableSectionElement);
  var HTMLTimeElement = class extends HTMLElement {
  };
  registerSubclass("time", HTMLTimeElement);
  reflectProperties([{
    dateTime: [""]
  }], HTMLTimeElement);
  var CharacterData = class extends Node2 {
    constructor(data, nodeType, nodeName, ownerDocument, overrideIndex) {
      super(nodeType, nodeName, ownerDocument, overrideIndex);
      this[38] = void 0;
      this[38] = data;
      this[8] = [this[7], nodeType, store(), store(), 0];
    }
    get data() {
      return this[38];
    }
    set data(value) {
      const oldValue = this.data;
      this[38] = value;
      mutate(this.ownerDocument, {
        target: this,
        type: 1,
        value,
        oldValue
      }, [
        1,
        this[7],
        store()
      ]);
    }
    get length() {
      return this[38].length;
    }
    get nodeValue() {
      return this[38];
    }
    set nodeValue(value) {
      this.data = value;
    }
    get previousElementSibling() {
      return getPreviousElementSibling(this);
    }
    get nextElementSibling() {
      return getNextElementSibling(this);
    }
  };
  var Text = class extends CharacterData {
    constructor(data, ownerDocument, overrideIndex) {
      super(data, 3, "#text", ownerDocument, overrideIndex);
    }
    get textContent() {
      return this.data;
    }
    set textContent(value) {
      this.nodeValue = value;
    }
    cloneNode() {
      return this.ownerDocument.createTextNode(this.data);
    }
    splitText(offset) {
      const remainderTextNode = new Text(this.data.slice(offset, this.data.length), this.ownerDocument);
      const parentNode = this.parentNode;
      this.nodeValue = this.data.slice(0, offset);
      if (parentNode !== null) {
        const parentChildNodes = parentNode.childNodes;
        const insertBeforePosition = parentChildNodes.indexOf(this) + 1;
        const insertBeforeNode = parentChildNodes.length >= insertBeforePosition ? parentChildNodes[insertBeforePosition] : null;
        return parentNode.insertBefore(remainderTextNode, insertBeforeNode);
      }
      return remainderTextNode;
    }
  };
  var Comment = class extends CharacterData {
    constructor(data, ownerDocument, overrideIndex) {
      super(data, 8, "#comment", ownerDocument, overrideIndex);
    }
    get textContent() {
      return this.data;
    }
    set textContent(value) {
      this.nodeValue = value;
    }
    cloneNode() {
      return this.ownerDocument.createComment(this.data);
    }
  };
  var DocumentFragment = class extends ParentNode {
    constructor(ownerDocument, overrideIndex) {
      super(11, "#document-fragment", ownerDocument, overrideIndex);
      this[8] = [
        this[7],
        11,
        store(this.nodeName),
        0,
        0
      ];
    }
    cloneNode(deep = false) {
      const clone = this.ownerDocument.createDocumentFragment();
      if (deep) {
        this.childNodes.forEach((child) => clone.appendChild(child.cloneNode(deep)));
      }
      return clone;
    }
  };
  function propagate$1(global) {
    const document = global.document;
    if (!document.addGlobalEventListener) {
      return;
    }
    document.addGlobalEventListener("message", ({
      data
    }) => {
      if (data[12] !== 4) {
        return;
      }
      const sync = data[40];
      const node = get(sync[7]);
      if (node) {
        node.ownerDocument[58] = false;
        node.value = sync[21];
        node.ownerDocument[58] = true;
      }
    });
  }
  function propagate(global) {
    const document = global.document;
    if (!document.addGlobalEventListener) {
      return;
    }
    document.addGlobalEventListener("message", ({
      data
    }) => {
      if (data[12] !== 5) {
        return;
      }
      const sync = data[40];
      if (sync) {
        global.innerWidth = sync[0];
        global.innerHeight = sync[1];
      }
    });
  }
  var DOCUMENT_NAME = "#document";
  var Document = class extends Element {
    constructor(global) {
      super(9, DOCUMENT_NAME, HTML_NAMESPACE, null);
      this.defaultView = void 0;
      this.documentElement = void 0;
      this.body = void 0;
      this.postMessage = void 0;
      this.addGlobalEventListener = void 0;
      this.removeGlobalEventListener = void 0;
      this[58] = true;
      this.nodeName = DOCUMENT_NAME;
      this.documentElement = this;
      this.defaultView = Object.assign(global, {
        document: this,
        addEventListener: this.addEventListener.bind(this),
        removeEventListener: this.removeEventListener.bind(this)
      });
    }
    [59]() {
      propagate$2(this.defaultView);
      propagate$1(this.defaultView);
      propagate(this.defaultView);
    }
    [64](strings, skeleton) {
      switch (skeleton[0]) {
        case 3:
          return new Text(strings[skeleton[5]], this, skeleton[7]);
        case 8:
          return new Comment(strings[skeleton[5]], this, skeleton[7]);
        default:
          const namespaceURI = strings[skeleton[6]] || HTML_NAMESPACE;
          const localName = strings[skeleton[1]];
          const constructor = NS_NAME_TO_CLASS[`${namespaceURI}:${localName}`] || HTMLElement;
          const node = new constructor(1, localName, namespaceURI, this, skeleton[7]);
          (skeleton[2] || []).forEach((attribute) => node.setAttributeNS(strings[attribute[0]] !== "null" ? strings[attribute[0]] : HTML_NAMESPACE, strings[attribute[1]], strings[attribute[2]]));
          (skeleton[4] || []).forEach((child) => node.appendChild(this[64](strings, child)));
          return node;
      }
    }
    createElement(name) {
      return this.createElementNS(HTML_NAMESPACE, toLower(name));
    }
    createElementNS(namespaceURI, localName) {
      const constructor = NS_NAME_TO_CLASS[`${namespaceURI}:${localName}`] || HTMLElement;
      return new constructor(1, localName, namespaceURI, this);
    }
    createEvent(type) {
      return new Event(type, {
        bubbles: false,
        cancelable: false
      });
    }
    createTextNode(text) {
      return new Text(text, this);
    }
    createComment(text) {
      return new Comment(text, this);
    }
    createDocumentFragment() {
      return new DocumentFragment(this);
    }
    getElementById(id) {
      return matchChildElement(this.body, (element) => element.id === id);
    }
  };
  function createDocument() {
    const win = {};
    return new Document(win);
  }
  function fromTreeProto(ast) {
    const doc = createDocument();
    Object.defineProperties(doc, {
      compatMode: {
        value: ast.quirks_mode ? "BackCompat" : "CSS1Compat"
      }
    });
    const firstNodeTagId = ast.tree?.[0]?.tagid;
    if (firstNodeTagId !== getTagId("ZERO_LENGTH")) {
      throw new Error(`HTML must begin with a #document tag, found: ${firstNodeTagId}`);
    }
    fromTreeProtoHelper(ast.tree[0].children, doc, doc);
    return doc;
  }
  function fromNodeProto(node) {
    const doc = createDocument();
    fromTreeProtoHelper([node], doc, doc);
    return doc.children[0];
  }
  function fromTreeProtoHelper(nodes, doc, parent) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (!isElementNode(node)) {
        if (node.value) {
          parent.appendChild(doc.createTextNode(node.value));
        }
        continue;
      }
      if (node.tagid === getTagId("ZERO_LENGTH")) {
        throw new Error(`Found a #document in a non-root position`);
      }
      const domNode = doc.createElement(node.value);
      if (node.attributes) {
        for (const { name, value } of node.attributes) {
          if (typeof value === "undefined") {
            domNode.setAttribute(name, "");
          } else {
            domNode.setAttribute(name, value);
          }
        }
      }
      parent.appendChild(domNode);
      if (node.children) {
        fromTreeProtoHelper(node.children, doc, domNode);
      }
    }
  }
  function defaultHandleError(tagName, e) {
    throw new Error(`[${tagName}]: ${e.stack}`);
  }
  function renderAstDocument(tree, instructions, { handleError = defaultHandleError } = {}) {
    const doc = fromTreeProto(tree);
    renderNodeDeep(doc, instructions, { handleError });
    return {
      ...fromDocument(doc),
      root: tree.root,
      quirks_mode: tree.quirks_mode
    };
  }
  function renderAstNodes(nodes, instructions, { handleError = defaultHandleError } = {}) {
    return nodes.map((astNode) => {
      const domNode = fromNodeProto(astNode);
      renderNodeDeep(domNode, instructions, { handleError });
      return fromNode(domNode);
    });
  }
  function renderNodeDeep(node, instructions, { handleError = defaultHandleError } = {}) {
    if (node.tagName.toLowerCase() in instructions) {
      const buildDom4 = instructions[node.tagName.toLowerCase()];
      buildDom4(node);
    }
    for (let [tagName, buildDom4] of Object.entries(instructions)) {
      const elements = Array.from(node.querySelectorAll(tagName));
      for (const element of elements) {
        if (isInTemplate(element)) {
          continue;
        }
        try {
          buildDom4(element);
        } catch (e) {
          handleError(tagName, e);
        }
      }
    }
  }
  function isInTemplate(node) {
    while (node.parentNode) {
      if (node.parentNode.nodeName === "TEMPLATE") {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  // src/core/mode/prod.js
  function isProd() {
    return true;
  }

  // src/core/mode/minified.js
  function isMinified() {
    return false;
  }

  // src/core/mode/esm.js
  function isEsm() {
    if (isProd()) {
      return false;
    }
    return self?.__AMP_MODE?.esm ?? false;
  }

  // src/core/types/array.js
  var { isArray } = Array;
  function remove(array, shouldRemove) {
    const removed = [];
    let index = 0;
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (shouldRemove(item, i, array)) {
        removed.push(item);
      } else {
        if (index < i) {
          array[index] = item;
        }
        index++;
      }
    }
    if (index < array.length) {
      array.length = index;
    }
    return removed;
  }

  // src/core/types/enum.js
  function isEnumValue(enumObj, val) {
    for (const k in enumObj) {
      if (enumObj[k] === val) {
        return true;
      }
    }
    return false;
  }

  // src/core/types/string/index.js
  function isString(s) {
    return typeof s == "string";
  }

  // src/core/types/object/index.js
  var { hasOwnProperty: hasOwn_, toString: toString_ } = Object.prototype;
  function map(opt_initial) {
    const obj = Object.create(null);
    if (opt_initial) {
      Object.assign(obj, opt_initial);
    }
    return obj;
  }

  // src/core/types/index.js
  function isElement(value) {
    return value?.nodeType == 1;
  }
  function isFiniteNumber(value) {
    return typeof value === "number" && isFinite(value);
  }

  // src/core/error/message-helpers.js
  var USER_ERROR_SENTINEL = "\u200B\u200B\u200B";
  function elementStringOrPassThru(val) {
    if (isElement(val)) {
      val = val;
      return val.tagName.toLowerCase() + (val.id ? `#${val.id}` : "");
    }
    return val;
  }

  // src/core/assert/base.js
  function assert(sentinel, shouldBeTruthy, opt_message = "Assertion failed", var_args) {
    if (shouldBeTruthy) {
      return shouldBeTruthy;
    }
    if (sentinel && opt_message.indexOf(sentinel) == -1) {
      opt_message += sentinel;
    }
    let i = 3;
    const splitMessage = opt_message.split("%s");
    let message = splitMessage.shift();
    const messageArray = [message];
    while (splitMessage.length) {
      const subValue = arguments[i++];
      const nextConstant = splitMessage.shift();
      message += elementStringOrPassThru(subValue) + nextConstant;
      messageArray.push(subValue, nextConstant.trim());
    }
    const error = new Error(message);
    error.messageArray = remove(messageArray, (x) => x !== "");
    self.__AMP_REPORT_ERROR?.(error);
    throw error;
  }
  function assertType_(assertFn, subject, shouldBeTruthy, defaultMessage, opt_message) {
    if (isArray(opt_message)) {
      assertFn(shouldBeTruthy, opt_message.concat([subject]));
    } else {
      assertFn(shouldBeTruthy, `${opt_message || defaultMessage}: %s`, subject);
    }
    return subject;
  }
  function assertElement(assertFn, shouldBeElement, opt_message) {
    return assertType_(assertFn, shouldBeElement, isElement(shouldBeElement), "Element expected", opt_message);
  }
  function assertString(assertFn, shouldBeString, opt_message) {
    return assertType_(assertFn, shouldBeString, isString(shouldBeString), "String expected", opt_message);
  }
  function assertNumber(assertFn, shouldBeNumber, opt_message) {
    return assertType_(assertFn, shouldBeNumber, typeof shouldBeNumber == "number", "Number expected", opt_message);
  }

  // src/core/assert/dev.js
  function devAssertDceCheck() {
    if (self.__AMP_ASSERTION_CHECK) {
      console.log("__devAssert_sentinel__");
    }
  }
  function devAssert(shouldBeTruthy, opt_message, opt_1, opt_2, opt_3, opt_4, opt_5, opt_6, opt_7, opt_8, opt_9) {
    if (isMinified()) {
      return shouldBeTruthy;
    }
    devAssertDceCheck();
    return assert("", shouldBeTruthy, opt_message, opt_1, opt_2, opt_3, opt_4, opt_5, opt_6, opt_7, opt_8, opt_9);
  }
  function devAssertElement(shouldBeElement, opt_message) {
    if (isMinified()) {
      return shouldBeElement;
    }
    devAssertDceCheck();
    return assertElement(devAssert, shouldBeElement, opt_message);
  }
  function devAssertString(shouldBeString, opt_message) {
    if (isMinified()) {
      return shouldBeString;
    }
    devAssertDceCheck();
    return assertString(devAssert, shouldBeString, opt_message);
  }
  function devAssertNumber(shouldBeNumber, opt_message) {
    if (isMinified()) {
      return shouldBeNumber;
    }
    devAssertDceCheck();
    return assertNumber(devAssert, shouldBeNumber, opt_message);
  }

  // src/core/assert/user.js
  function userAssert(shouldBeTruthy, opt_message, opt_1, opt_2, opt_3, opt_4, opt_5, opt_6, opt_7, opt_8, opt_9) {
    return assert(USER_ERROR_SENTINEL, shouldBeTruthy, opt_message, opt_1, opt_2, opt_3, opt_4, opt_5, opt_6, opt_7, opt_8, opt_9);
  }

  // third_party/css-escape/css-escape.js
  var regex = /(\0)|^(-)$|([\x01-\x1f\x7f]|^-?[0-9])|([\x80-\uffff0-9a-zA-Z_-]+)|[^]/g;
  function escaper(match, nil, dash, hexEscape, chars) {
    if (chars) {
      return chars;
    }
    if (nil) {
      return "\uFFFD";
    }
    if (hexEscape) {
      return match.slice(0, -1) + "\\" + match.slice(-1).charCodeAt(0).toString(16) + " ";
    }
    return "\\" + match;
  }
  function cssEscape(value) {
    return String(value).replace(regex, escaper);
  }

  // src/core/dom/css-selectors.js
  function escapeCssSelectorIdent(ident) {
    if (isEsm()) {
      return CSS.escape(ident);
    }
    return cssEscape(ident);
  }

  // src/core/dom/query.js
  function childElements(parent, callback) {
    const children = [];
    for (let child = parent.firstElementChild; child; child = child.nextElementSibling) {
      if (callback(child)) {
        children.push(child);
      }
    }
    return children;
  }
  function childNodes(parent, callback) {
    const nodes = [];
    for (let child = parent.firstChild; child; child = child.nextSibling) {
      if (callback(child)) {
        nodes.push(child);
      }
    }
    return nodes;
  }
  function realChildNodes(element) {
    return childNodes(element, (node) => !isInternalOrServiceNode(node));
  }
  function realChildElements(element) {
    return childElements(element, (element2) => !isInternalOrServiceNode(element2));
  }
  function isInternalOrServiceNode(node) {
    if (isInternalElement(node)) {
      return true;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }
    devAssertElement(node);
    return node.hasAttribute("placeholder") || node.hasAttribute("fallback") || node.hasAttribute("overflow");
  }
  function isInternalElement(nodeOrTagName) {
    let tagName;
    if (isString(nodeOrTagName)) {
      tagName = nodeOrTagName;
    } else if (isElement(nodeOrTagName)) {
      tagName = nodeOrTagName.tagName;
    }
    return !!tagName && tagName.toLowerCase().startsWith("i-");
  }

  // src/core/dom/index.js
  function removeChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  function copyChildren(from, to) {
    const frag = to.ownerDocument.createDocumentFragment();
    for (let n = from.firstChild; n; n = n.nextSibling) {
      frag.appendChild(n.cloneNode(true));
    }
    to.appendChild(frag);
  }
  function isServerRendered(element) {
    return element.hasAttribute("i-amphtml-ssr");
  }

  // src/core/dom/layout/index.js
  var Layout_Enum = {
    NODISPLAY: "nodisplay",
    FIXED: "fixed",
    FIXED_HEIGHT: "fixed-height",
    RESPONSIVE: "responsive",
    CONTAINER: "container",
    FILL: "fill",
    FLEX_ITEM: "flex-item",
    FLUID: "fluid",
    INTRINSIC: "intrinsic"
  };
  function parseLayout(s) {
    if (isEnumValue(Layout_Enum, s)) {
      return s;
    }
    return void 0;
  }
  function getLayoutClass(layout) {
    return "i-amphtml-layout-" + layout;
  }
  function isLayoutSizeDefined(layout) {
    return layout == Layout_Enum.FIXED || layout == Layout_Enum.FIXED_HEIGHT || layout == Layout_Enum.RESPONSIVE || layout == Layout_Enum.FILL || layout == Layout_Enum.FLEX_ITEM || layout == Layout_Enum.FLUID || layout == Layout_Enum.INTRINSIC;
  }
  function parseLength(s) {
    if (typeof s == "number") {
      return s + "px";
    }
    if (!s) {
      return void 0;
    }
    if (!/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)?$/.test(s)) {
      return void 0;
    }
    if (/^\d+(\.\d+)?$/.test(s)) {
      return s + "px";
    }
    return s;
  }
  function assertLength(length) {
    userAssert(/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)$/.test(length ?? ""), "Invalid length value: %s", length);
    return length;
  }
  function getLengthUnits(length) {
    assertLength(length);
    const m = /[a-z]+/i.exec(length ?? "");
    userAssert(m, "Failed to read units from %s", length);
    return m[0];
  }
  function getLengthNumeral(length) {
    const res = parseFloat(length);
    return isFiniteNumber(res) ? res : void 0;
  }
  function applyFillContent(element, opt_replacedContent) {
    element.classList.add("i-amphtml-fill-content");
    if (opt_replacedContent) {
      element.classList.add("i-amphtml-replaced-content");
    }
  }

  // src/core/dom/static-template.js
  var htmlContainer;
  function htmlFor(nodeOrDoc) {
    const doc = nodeOrDoc.ownerDocument || nodeOrDoc;
    if (!htmlContainer || htmlContainer.ownerDocument !== doc) {
      htmlContainer = doc.createElement("div");
    }
    return html;
  }
  function html(strings) {
    return createNode(htmlContainer, strings);
  }
  function createNode(container, strings) {
    devAssert(strings.length === 1, "Improper html template tag usage.");
    container.innerHTML = strings[0];
    const el = container.firstElementChild;
    devAssert(el, "No elements in template");
    devAssert(!el.nextElementSibling, "Too many root elements in template");
    container.removeChild(el);
    return el;
  }

  // src/core/dom/style.js
  var propertyNameCache;
  var vendorPrefixes = ["Webkit", "webkit", "Moz", "moz", "ms", "O", "o"];
  function camelCaseToTitleCase(camelCase) {
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  }
  function camelCaseToHyphenCase(camelCase) {
    const hyphenated = camelCase.replace(/[A-Z]/g, (match) => "-" + match.toLowerCase());
    if (vendorPrefixes.some((prefix) => hyphenated.startsWith(prefix + "-"))) {
      return `-${hyphenated}`;
    }
    return hyphenated;
  }
  function getVendorJsPropertyName_(style, titleCase) {
    for (let i = 0; i < vendorPrefixes.length; i++) {
      const propertyName = vendorPrefixes[i] + titleCase;
      if (style[propertyName] !== void 0) {
        return propertyName;
      }
    }
    return "";
  }
  function getVendorJsPropertyName(style, camelCase, opt_bypassCache) {
    if (isVar(camelCase)) {
      return camelCase;
    }
    if (!propertyNameCache) {
      propertyNameCache = map();
    }
    let propertyName = propertyNameCache[camelCase];
    if (!propertyName || opt_bypassCache) {
      propertyName = camelCase;
      if (style[camelCase] === void 0) {
        const titleCase = camelCaseToTitleCase(camelCase);
        const prefixedPropertyName = getVendorJsPropertyName_(style, titleCase);
        if (style[prefixedPropertyName] !== void 0) {
          propertyName = prefixedPropertyName;
        }
      }
      if (!opt_bypassCache) {
        propertyNameCache[camelCase] = propertyName;
      }
    }
    return propertyName;
  }
  function setStyle(element, property, value, opt_units, opt_bypassCache) {
    const propertyName = getVendorJsPropertyName(element.style, property, opt_bypassCache);
    if (!propertyName) {
      return;
    }
    const styleValue = opt_units ? value + opt_units : value;
    element.style.setProperty(camelCaseToHyphenCase(propertyName), styleValue);
  }
  function setStyles(element, styles) {
    for (const k in styles) {
      setStyle(element, k, styles[k]);
    }
  }
  function toggle(element, opt_display) {
    if (opt_display === void 0) {
      opt_display = element.hasAttribute("hidden");
    }
    if (opt_display) {
      element.removeAttribute("hidden");
    } else {
      element.setAttribute("hidden", "");
    }
  }
  function isVar(property) {
    return property.startsWith("--");
  }

  // src/core/static-layout.js
  var naturalDimensions_ = {
    "AMP-PIXEL": { width: "0px", height: "0px" },
    "AMP-ANALYTICS": { width: "1px", height: "1px" },
    "AMP-AUDIO": null,
    "AMP-SOCIAL-SHARE": { width: "60px", height: "44px" }
  };
  function hasNaturalDimensions(tagName) {
    tagName = tagName.toUpperCase();
    return naturalDimensions_[tagName] !== void 0;
  }
  function getNaturalDimensions(element) {
    const tagName = element.tagName.toUpperCase();
    devAssert(naturalDimensions_[tagName] !== void 0);
    if (!naturalDimensions_[tagName]) {
      const doc = element.ownerDocument;
      const naturalTagName = tagName.replace(/^AMP\-/, "");
      const temp = doc.createElement(naturalTagName);
      temp.controls = true;
      setStyles(temp, {
        position: "absolute",
        visibility: "hidden"
      });
      doc.body.appendChild(temp);
      naturalDimensions_[tagName] = {
        width: (temp.offsetWidth || 1) + "px",
        height: (temp.offsetHeight || 1) + "px"
      };
      doc.body.removeChild(temp);
    }
    return naturalDimensions_[tagName];
  }
  function applyStaticLayout(element) {
    const completedLayoutAttr = element.getAttribute("i-amphtml-layout");
    if (completedLayoutAttr) {
      const layout2 = parseLayout(completedLayoutAttr);
      devAssert(layout2);
      if ((layout2 == Layout_Enum.RESPONSIVE || layout2 == Layout_Enum.INTRINSIC) && element.firstElementChild) {
        element.sizerElement = element.querySelector("i-amphtml-sizer") || void 0;
        element.sizerElement?.setAttribute("slot", "i-amphtml-svc");
      } else if (layout2 == Layout_Enum.NODISPLAY) {
        toggle(element, false);
      }
      return layout2;
    }
    const { height, layout, width } = getEffectiveLayoutInternal(element);
    element.classList.add(getLayoutClass(layout));
    if (isLayoutSizeDefined(layout)) {
      element.classList.add("i-amphtml-layout-size-defined");
    }
    if (layout == Layout_Enum.NODISPLAY) {
      toggle(element, false);
    } else if (layout == Layout_Enum.FIXED) {
      setStyles(element, {
        width: devAssertString(width),
        height: devAssertString(height)
      });
    } else if (layout == Layout_Enum.FIXED_HEIGHT) {
      setStyle(element, "height", devAssertString(height));
    } else if (layout == Layout_Enum.RESPONSIVE) {
      const sizer = element.ownerDocument.createElement("i-amphtml-sizer");
      sizer.setAttribute("slot", "i-amphtml-svc");
      const heightNumeral = getLengthNumeral(height);
      const widthNumeral = getLengthNumeral(width);
      devAssertNumber(heightNumeral);
      devAssertNumber(widthNumeral);
      setStyles(sizer, {
        paddingTop: heightNumeral / widthNumeral * 100 + "%"
      });
      element.insertBefore(sizer, element.firstChild);
      element.sizerElement = sizer;
    } else if (layout == Layout_Enum.INTRINSIC) {
      const sizer = htmlFor(element)`
      <i-amphtml-sizer class="i-amphtml-sizer" slot="i-amphtml-svc">
        <img alt="" role="presentation" aria-hidden="true"
             class="i-amphtml-intrinsic-sizer" />
      </i-amphtml-sizer>`;
      const intrinsicSizer = sizer.firstElementChild;
      devAssertElement(intrinsicSizer);
      intrinsicSizer.setAttribute("src", `data:image/svg+xml;charset=utf-8,<svg height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`);
      element.insertBefore(sizer, element.firstChild);
      element.sizerElement = sizer;
    } else if (layout == Layout_Enum.FILL) {
    } else if (layout == Layout_Enum.CONTAINER) {
    } else if (layout == Layout_Enum.FLEX_ITEM) {
      if (width) {
        setStyle(element, "width", width);
      }
      if (height) {
        setStyle(element, "height", height);
      }
    } else if (layout == Layout_Enum.FLUID) {
      element.classList.add("i-amphtml-layout-awaiting-size");
      if (width) {
        setStyle(element, "width", width);
      }
      setStyle(element, "height", 0);
    }
    element.setAttribute("i-amphtml-layout", layout);
    return layout;
  }
  function getEffectiveLayout(element) {
    const completedLayout = parseLayout(element.getAttribute("layout") ?? "");
    if (completedLayout) {
      return completedLayout;
    }
    return getEffectiveLayoutInternal(element).layout;
  }
  function getEffectiveLayoutInternal(element) {
    const layoutAttr = element.getAttribute("layout");
    const widthAttr = element.getAttribute("width");
    const heightAttr = element.getAttribute("height");
    const sizesAttr = element.getAttribute("sizes");
    const heightsAttr = element.getAttribute("heights");
    const inputLayout = layoutAttr ? parseLayout(layoutAttr) : null;
    userAssert(inputLayout !== void 0, 'Invalid "layout" value: %s, %s', layoutAttr, element);
    const inputWidth = widthAttr && widthAttr != "auto" ? parseLength(widthAttr) : widthAttr;
    userAssert(inputWidth !== void 0, 'Invalid "width" value: %s, %s', widthAttr, element);
    const inputHeight = heightAttr && heightAttr != "fluid" ? parseLength(heightAttr) : heightAttr;
    userAssert(inputHeight !== void 0, 'Invalid "height" value: %s, %s', heightAttr, element);
    let width;
    let height;
    let layout;
    if ((!inputLayout || inputLayout == Layout_Enum.FIXED || inputLayout == Layout_Enum.FIXED_HEIGHT) && (!inputWidth || !inputHeight) && hasNaturalDimensions(element.tagName)) {
      const dimensions = getNaturalDimensions(element);
      width = inputWidth || inputLayout == Layout_Enum.FIXED_HEIGHT ? inputWidth : dimensions.width;
      height = inputHeight || dimensions.height;
    } else {
      width = inputWidth;
      height = inputHeight;
    }
    if (inputLayout) {
      layout = inputLayout;
    } else if (!width && !height) {
      layout = Layout_Enum.CONTAINER;
    } else if (height == "fluid") {
      layout = Layout_Enum.FLUID;
    } else if (height && (!width || width == "auto")) {
      layout = Layout_Enum.FIXED_HEIGHT;
    } else if (height && width && (sizesAttr || heightsAttr)) {
      layout = Layout_Enum.RESPONSIVE;
    } else {
      layout = Layout_Enum.FIXED;
    }
    if (layout == Layout_Enum.FIXED || layout == Layout_Enum.FIXED_HEIGHT || layout == Layout_Enum.RESPONSIVE || layout == Layout_Enum.INTRINSIC) {
      userAssert(height, 'The "height" attribute is missing: %s', element);
    }
    if (layout == Layout_Enum.FIXED_HEIGHT) {
      userAssert(!width || width == "auto", 'The "width" attribute must be missing or "auto": %s', element);
    }
    if (layout == Layout_Enum.FIXED || layout == Layout_Enum.RESPONSIVE || layout == Layout_Enum.INTRINSIC) {
      userAssert(width && width != "auto", 'The "width" attribute must be present and not "auto": %s', element);
    }
    if (layout == Layout_Enum.RESPONSIVE || layout == Layout_Enum.INTRINSIC) {
      userAssert(getLengthUnits(width) == getLengthUnits(height), 'Length units should be the same for "width" and "height": %s, %s, %s', widthAttr, heightAttr, element);
    } else {
      userAssert(heightsAttr === null, '"heights" attribute must be missing: %s', element);
    }
    return { layout, width, height };
  }

  // src/builtins/amp-layout/build-dom.js
  function buildDom(element) {
    if (isServerRendered(element)) {
      return;
    }
    const layout = getEffectiveLayout(element);
    if (layout == Layout_Enum.CONTAINER) {
      return;
    }
    const doc = element.ownerDocument;
    const container = doc.createElement("div");
    applyFillContent(container);
    realChildNodes(element).forEach((child) => {
      container.appendChild(child);
    });
    element.appendChild(container);
  }

  // src/core/document/format.js
  function isAmpFormatType(formats, doc) {
    const html2 = doc.documentElement;
    const isFormatType = formats.some((format) => html2.hasAttribute(format));
    return isFormatType;
  }
  function isAmp4Email(doc) {
    return isAmpFormatType(["\u26A14email", "amp4email"], doc);
  }

  // extensions/amp-carousel/0.1/build-dom.js
  var ClassNames = {
    BUTTON: "amp-carousel-button",
    PREV_BUTTON: "amp-carousel-button-prev",
    NEXT_BUTTON: "amp-carousel-button-next",
    HAS_CONTROL: "i-amphtml-carousel-has-controls",
    CONTROL_HIDE_ATTRIBUTE: "i-amphtml-carousel-hide-buttons",
    SLIDE: "amp-carousel-slide",
    SHOW_SLIDE: "amp-carousel-slide",
    SLIDESCROLL_CAROUSEL: "i-amphtml-slidescroll",
    SLIDE_WRAPPER: "i-amphtml-slide-item",
    SLIDES_CONTAINER: "i-amphtml-slides-container",
    SLIDES_CONTAINER_NOSNAP: "i-amphtml-slidescroll-no-snap",
    SLIDES_ITEM_SHOW: "i-amphtml-slide-item-show",
    SCROLLABLE_CONTAINER: "i-amphtml-scrollable-carousel-container",
    SCROLLABLE_SLIDE: "amp-scrollable-carousel-slide"
  };
  function assertDomQueryResults() {
    for (let i = 0; i < arguments.length; i++) {
      if (!arguments[i]) {
        throw new Error("Invalid server render");
      }
    }
  }
  function buildButton(element, { className, enabled, title }) {
    const ariaRole = isScrollable(element) ? "presentation" : "button";
    const button = element.ownerDocument.createElement("div");
    button.setAttribute("tabindex", "0");
    button.classList.add(ClassNames.BUTTON, className);
    button.setAttribute("role", ariaRole);
    button.setAttribute("title", title);
    setButtonState(button, enabled);
    element.appendChild(button);
    return button;
  }
  function setButtonState(button, enabled) {
    button.classList.toggle("amp-disabled", !enabled);
    button.setAttribute("aria-disabled", String(!enabled));
    button.setAttribute("tabindex", String(enabled ? 0 : -1));
  }
  function buildCarouselControls(element, slideCount) {
    if (isServerRendered(element)) {
      return queryCarouselControls(element);
    }
    const doc = element.ownerDocument;
    if (isAmp4Email(doc) || element.hasAttribute("controls")) {
      element.classList.add(ClassNames.HAS_CONTROL);
    }
    const hasLoop = element.hasAttribute("loop");
    const prevIndex = hasLoop ? slideCount : 0;
    const nextIndex = slideCount > 1 ? 2 : hasLoop ? 0 : 1;
    const prevButton = buildButton(element, {
      className: ClassNames.PREV_BUTTON,
      title: getPrevButtonTitle(element, {
        index: String(prevIndex),
        total: String(slideCount)
      }),
      enabled: element.hasAttribute("loop")
    });
    const nextButton = buildButton(element, {
      className: ClassNames.NEXT_BUTTON,
      title: getNextButtonTitle(element, {
        index: String(nextIndex),
        total: String(slideCount)
      }),
      enabled: slideCount > 1
    });
    return { prevButton, nextButton };
  }
  function queryCarouselControls(element) {
    const prevButton = element.querySelector(`.${escapeCssSelectorIdent(ClassNames.PREV_BUTTON)}`);
    const nextButton = element.querySelector(`.${escapeCssSelectorIdent(ClassNames.NEXT_BUTTON)}`);
    assertDomQueryResults(prevButton, nextButton);
    return { prevButton, nextButton };
  }
  function buildScrollableCarousel(element) {
    if (isServerRendered(element)) {
      return queryScrollableCarousel(element);
    }
    const doc = element.ownerDocument;
    const cells = realChildElements(element);
    const container = doc.createElement("div");
    container.classList.add(ClassNames.SCROLLABLE_CONTAINER);
    container.setAttribute("tabindex", "-1");
    element.appendChild(container);
    cells.forEach((cell) => {
      cell.classList.add(ClassNames.SLIDE, ClassNames.SCROLLABLE_SLIDE);
      container.appendChild(cell);
    });
    return { cells, container };
  }
  function queryScrollableCarousel(element) {
    const container = element.querySelector(`.${escapeCssSelectorIdent(ClassNames.SCROLLABLE_CONTAINER)}`);
    const cells = Array.from(element.querySelectorAll(`.${escapeCssSelectorIdent(ClassNames.SLIDE)}`));
    assertDomQueryResults(container, cells);
    return { container, cells };
  }
  function buildSlideScrollCarousel(element) {
    if (isServerRendered(element)) {
      return querySlideScrollCarousel(element);
    }
    const doc = element.ownerDocument;
    const slides = realChildElements(element);
    element.classList.add(ClassNames.SLIDESCROLL_CAROUSEL);
    const slidesContainer = doc.createElement("div");
    slidesContainer.setAttribute("tabindex", "-1");
    slidesContainer.classList.add(ClassNames.SLIDES_CONTAINER, ClassNames.SLIDES_CONTAINER_NOSNAP);
    slidesContainer.setAttribute("aria-live", "polite");
    element.appendChild(slidesContainer);
    const slideWrappers = [];
    slides.forEach((slide) => {
      slide.classList.add(ClassNames.SLIDE);
      const slideWrapper = doc.createElement("div");
      slideWrapper.classList.add(ClassNames.SLIDE_WRAPPER);
      slideWrapper.appendChild(slide);
      slidesContainer.appendChild(slideWrapper);
      slideWrappers.push(slideWrapper);
    });
    slideWrappers[0]?.classList.add(ClassNames.SLIDES_ITEM_SHOW);
    return { slidesContainer, slides, slideWrappers };
  }
  function querySlideScrollCarousel(element) {
    const slidesContainer = element.querySelector(`.${escapeCssSelectorIdent(ClassNames.SLIDES_CONTAINER)}`);
    const slideWrappers = Array.from(element.querySelectorAll(`.${escapeCssSelectorIdent(ClassNames.SLIDE_WRAPPER)}`));
    const slides = Array.from(element.querySelectorAll(`.${escapeCssSelectorIdent(ClassNames.SLIDE)}`));
    assertDomQueryResults(slidesContainer, slideWrappers, slides);
    return { slides, slidesContainer, slideWrappers };
  }
  function buildDom2(element) {
    const slideCount = realChildElements(element).length;
    const slidesDom = isScrollable(element) ? buildScrollableCarousel(element) : buildSlideScrollCarousel(element);
    const controlsDom = buildCarouselControls(element, slideCount);
    return { ...controlsDom, ...slidesDom };
  }
  function getNextButtonTitle(element, options) {
    const prefix = element.getAttribute("data-next-button-aria-label") || "Next item in carousel";
    const { index, total } = options;
    return getButtonTitle(element, { prefix, index, total });
  }
  function getPrevButtonTitle(element, options) {
    const prefix = element.getAttribute("data-prev-button-aria-label") || "Previous item in carousel";
    const { index, total } = options;
    return getButtonTitle(element, { prefix, index, total });
  }
  function getButtonTitle(element, { index, prefix, total }) {
    if (isScrollable(element)) {
      return prefix;
    }
    const suffixFormat = element.getAttribute("data-button-count-format") || "(%s of %s)";
    const suffix = suffixFormat.replace("%s", index).replace("%s", total);
    return `${prefix} ${suffix}`;
  }
  function isScrollable(element) {
    return element.getAttribute("type") !== "slides";
  }

  // extensions/amp-fit-text/0.1/build-dom.js
  var MEASURER_CLASS = "i-amphtml-fit-text-measurer";
  var CONTENT_CLASS = "i-amphtml-fit-text-content";
  var CONTENT_WRAPPER_CLASS = "i-amphtml-fit-text-content-wrapper";
  function buildDom3(element) {
    if (isServerRendered(element)) {
      return queryDom(element);
    }
    const doc = element.ownerDocument;
    const content = doc.createElement("div");
    applyFillContent(content);
    content.classList.add(CONTENT_CLASS);
    const contentWrapper = doc.createElement("div");
    contentWrapper.classList.add(CONTENT_WRAPPER_CLASS);
    content.appendChild(contentWrapper);
    const measurer = doc.createElement("div");
    measurer.classList.add(MEASURER_CLASS);
    realChildNodes(element).forEach((node) => contentWrapper.appendChild(node));
    mirrorNode(contentWrapper, measurer);
    element.appendChild(content);
    element.appendChild(measurer);
    return { content, contentWrapper, measurer };
  }
  function queryDom(element) {
    const content = element.querySelector(`.${escapeCssSelectorIdent(CONTENT_CLASS)}`);
    const contentWrapper = element.querySelector(`.${escapeCssSelectorIdent(CONTENT_WRAPPER_CLASS)}`);
    const measurer = element.querySelector(`.${escapeCssSelectorIdent(MEASURER_CLASS)}`);
    if (!content || !contentWrapper || !measurer) {
      throw new Error("Invalid server render");
    }
    return { content, contentWrapper, measurer };
  }
  function mirrorNode(from, to) {
    removeChildren(to);
    copyChildren(from, to);
  }

  // src/compiler/builders.ts
  var versionedBuilderMap = {
    "v0": {
      "amp-layout": buildDom
    },
    "0.1": {
      "amp-fit-text": buildDom3,
      "amp-carousel": buildDom2
    }
  };
  function wrap(buildDom4) {
    return function wrapper(element) {
      applyStaticLayout(element);
      buildDom4(element);
      element.setAttribute("i-amphtml-ssr", "");
      element.classList.add("i-amphtml-element");
    };
  }
  function getBuilders(versions, builderMap = versionedBuilderMap) {
    const builders = {};
    for (const { component, version: version2 } of versions) {
      const builder = builderMap?.[version2]?.[component];
      if (builder) {
        builders[component] = wrap(builder);
      }
    }
    return builders;
  }

  // src/compiler/compile.ts
  var missingPropErrorMsg = "Must provide component_versions and either document or nodes";
  function compile(request) {
    const { component_versions: versions, document, nodes } = request ?? {};
    if (!versions) {
      throw new Error(missingPropErrorMsg);
    }
    const builders = getBuilders(versions);
    if (document) {
      return { document: renderAstDocument(document, builders) };
    } else if (nodes) {
      return { nodes: renderAstNodes(nodes, builders) };
    } else {
      throw new Error(missingPropErrorMsg);
    }
  }

  // src/compiler/index.ts
  globalThis.compile = compile;
})();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
