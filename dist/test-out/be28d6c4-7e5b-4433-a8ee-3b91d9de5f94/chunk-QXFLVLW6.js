import {
  GlobalService,
  init_global_service
} from "./chunk-DWAKSAT2.js";
import {
  IonContent,
  ModalController,
  init_lazy
} from "./chunk-BLEMCJOU.js";
import {
  TranslateService,
  init_ngx_translate_core
} from "./chunk-DRVLPRFI.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_tslib_es6
} from "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  __toESM
} from "./chunk-PKPTYHZH.js";

// node_modules/venn.js/node_modules/d3-selection/src/namespaces.js
var xhtml, namespaces_default;
var init_namespaces = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/namespaces.js"() {
    xhtml = "http://www.w3.org/1999/xhtml";
    namespaces_default = {
      svg: "http://www.w3.org/2000/svg",
      xhtml,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
}
var init_namespace = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/namespace.js"() {
    init_namespaces();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
var init_creator = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/creator.js"() {
    init_namespace();
    init_namespaces();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}
var init_selector = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selector.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function") select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}
var init_select = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/select.js"() {
    init_selection();
    init_selector();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}
var init_selectorAll = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selectorAll.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/selectAll.js
function selectAll_default(select) {
  if (typeof select !== "function") select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}
var init_selectAll = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/selectAll.js"() {
    init_selection();
    init_selectorAll();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
var init_matcher = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/matcher.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}
var init_filter = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/filter.js"() {
    init_selection();
    init_matcher();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}
var init_sparse = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/sparse.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
var init_enter = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/enter.js"() {
    init_sparse();
    init_selection();
    EnterNode.prototype = {
      constructor: EnterNode,
      appendChild: function(child) {
        return this._parent.insertBefore(child, this._next);
      },
      insertBefore: function(child, next) {
        return this._parent.insertBefore(child, next);
      },
      querySelector: function(selector) {
        return this._parent.querySelector(selector);
      },
      querySelectorAll: function(selector) {
        return this._parent.querySelectorAll(selector);
      }
    };
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/constant.js
function constant_default(x) {
  return function() {
    return x;
  };
}
var init_constant = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/constant.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = {}, groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
      exit[i] = node;
    }
  }
}
function data_default(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) {
      data[++j] = d;
    });
    return data;
  }
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = constant_default(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = value.call(parent, parent && parent.__data__, j, parents), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
var keyPrefix;
var init_data = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/data.js"() {
    init_selection();
    init_enter();
    init_constant();
    keyPrefix = "$";
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}
var init_exit = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/exit.js"() {
    init_sparse();
    init_selection();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
var init_join = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/join.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/merge.js
function merge_default(selection3) {
  for (var groups0 = this._groups, groups1 = selection3._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}
var init_merge = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/merge.js"() {
    init_selection();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
var init_order = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/order.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
var init_sort = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/sort.js"() {
    init_selection();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
var init_call = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/call.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() {
    nodes[++i] = this;
  });
  return nodes;
}
var init_nodes = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/nodes.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}
var init_node = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/node.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/size.js
function size_default() {
  var size = 0;
  this.each(function() {
    ++size;
  });
  return size;
}
var init_size = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/size.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}
var init_empty = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/empty.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
var init_each = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/each.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/attr.js
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default(name, value) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
var init_attr = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/attr.js"() {
    init_namespace();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
var init_window = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/window.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}
var init_style = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/style.js"() {
    init_window();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
var init_property = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/property.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
var init_classed = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/classed.js"() {
    ClassList.prototype = {
      add: function(name) {
        var i = this._names.indexOf(name);
        if (i < 0) {
          this._names.push(name);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      remove: function(name) {
        var i = this._names.indexOf(name);
        if (i >= 0) {
          this._names.splice(i, 1);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      contains: function(name) {
        return this._names.indexOf(name) >= 0;
      }
    };
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
var init_text = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/text.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
var init_html = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/html.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}
var init_raise = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/raise.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}
var init_lower = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/lower.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create3 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create3.apply(this, arguments));
  });
}
var init_append = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/append.js"() {
    init_creator();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create3 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create3.apply(this, arguments), select.apply(this, arguments) || null);
  });
}
var init_insert = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/insert.js"() {
    init_creator();
    init_selector();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}
var init_remove = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/remove.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
var init_clone = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/clone.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
var init_datum = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/datum.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/on.js
function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event2) {
    var related = event2.relatedTarget;
    if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
      listener.call(this, event2);
    }
  };
}
function contextListener(listener, index, group) {
  return function(event1) {
    var event0 = event;
    event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      event = event0;
    }
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}
function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = { type: typename.type, name: typename.name, value, listener, capture };
    if (!on) this.__on = [o];
    else on.push(o);
  };
}
function on_default(typename, value, capture) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
}
function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    event = event0;
  }
}
var filterEvents, event, element;
var init_on = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/on.js"() {
    filterEvents = {};
    event = null;
    if (typeof document !== "undefined") {
      element = document.documentElement;
      if (!("onmouseenter" in element)) {
        filterEvents = { mouseenter: "mouseover", mouseleave: "mouseout" };
      }
    }
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event2 = window2.CustomEvent;
  if (typeof event2 === "function") {
    event2 = new event2(type2, params);
  } else {
    event2 = window2.document.createEvent("Event");
    if (params) event2.initEvent(type2, params.bubbles, params.cancelable), event2.detail = params.detail;
    else event2.initEvent(type2, false, false);
  }
  node.dispatchEvent(event2);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}
var init_dispatch = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/dispatch.js"() {
    init_window();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selection/index.js
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
var root, selection_default;
var init_selection = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selection/index.js"() {
    init_select();
    init_selectAll();
    init_filter();
    init_data();
    init_enter();
    init_exit();
    init_join();
    init_merge();
    init_order();
    init_sort();
    init_call();
    init_nodes();
    init_node();
    init_size();
    init_empty();
    init_each();
    init_attr();
    init_style();
    init_property();
    init_classed();
    init_text();
    init_html();
    init_raise();
    init_lower();
    init_append();
    init_insert();
    init_remove();
    init_clone();
    init_datum();
    init_on();
    init_dispatch();
    root = [null];
    Selection.prototype = selection.prototype = {
      constructor: Selection,
      select: select_default,
      selectAll: selectAll_default,
      filter: filter_default,
      data: data_default,
      enter: enter_default,
      exit: exit_default,
      join: join_default,
      merge: merge_default,
      order: order_default,
      sort: sort_default,
      call: call_default,
      nodes: nodes_default,
      node: node_default,
      size: size_default,
      empty: empty_default,
      each: each_default,
      attr: attr_default,
      style: style_default,
      property: property_default,
      classed: classed_default,
      text: text_default,
      html: html_default,
      raise: raise_default,
      lower: lower_default,
      append: append_default,
      insert: insert_default,
      remove: remove_default,
      clone: clone_default,
      datum: datum_default,
      on: on_default,
      dispatch: dispatch_default
    };
    selection_default = selection;
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/select.js
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}
var init_select2 = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/select.js"() {
    init_selection();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/create.js
function create_default(name) {
  return select_default2(creator_default(name).call(document.documentElement));
}
var init_create = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/create.js"() {
    init_creator();
    init_select2();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/local.js
function local() {
  return new Local();
}
function Local() {
  this._ = "@" + (++nextId).toString(36);
}
var nextId;
var init_local = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/local.js"() {
    nextId = 0;
    Local.prototype = local.prototype = {
      constructor: Local,
      get: function(node) {
        var id3 = this._;
        while (!(id3 in node)) if (!(node = node.parentNode)) return;
        return node[id3];
      },
      set: function(node, value) {
        return node[this._] = value;
      },
      remove: function(node) {
        return this._ in node && delete node[this._];
      },
      toString: function() {
        return this._;
      }
    };
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/sourceEvent.js
function sourceEvent_default() {
  var current = event, source;
  while (source = current.sourceEvent) current = source;
  return current;
}
var init_sourceEvent = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/sourceEvent.js"() {
    init_on();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/point.js
function point_default(node, event2) {
  var svg = node.ownerSVGElement || node;
  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event2.clientX, point.y = event2.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }
  var rect = node.getBoundingClientRect();
  return [event2.clientX - rect.left - node.clientLeft, event2.clientY - rect.top - node.clientTop];
}
var init_point = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/point.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/mouse.js
function mouse_default(node) {
  var event2 = sourceEvent_default();
  if (event2.changedTouches) event2 = event2.changedTouches[0];
  return point_default(node, event2);
}
var init_mouse = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/mouse.js"() {
    init_sourceEvent();
    init_point();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/selectAll.js
function selectAll_default2(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([selector == null ? [] : selector], root);
}
var init_selectAll2 = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/selectAll.js"() {
    init_selection();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/touch.js
function touch_default(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = sourceEvent_default().changedTouches;
  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return point_default(node, touch);
    }
  }
  return null;
}
var init_touch = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/touch.js"() {
    init_sourceEvent();
    init_point();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/touches.js
function touches_default(node, touches) {
  if (touches == null) touches = sourceEvent_default().touches;
  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = point_default(node, touches[i]);
  }
  return points;
}
var init_touches = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/touches.js"() {
    init_sourceEvent();
    init_point();
  }
});

// node_modules/venn.js/node_modules/d3-selection/src/index.js
var src_exports = {};
__export(src_exports, {
  clientPoint: () => point_default,
  create: () => create_default,
  creator: () => creator_default,
  customEvent: () => customEvent,
  event: () => event,
  local: () => local,
  matcher: () => matcher_default,
  mouse: () => mouse_default,
  namespace: () => namespace_default,
  namespaces: () => namespaces_default,
  select: () => select_default2,
  selectAll: () => selectAll_default2,
  selection: () => selection_default,
  selector: () => selector_default,
  selectorAll: () => selectorAll_default,
  style: () => styleValue,
  touch: () => touch_default,
  touches: () => touches_default,
  window: () => window_default
});
var init_src = __esm({
  "node_modules/venn.js/node_modules/d3-selection/src/index.js"() {
    init_create();
    init_creator();
    init_local();
    init_matcher();
    init_mouse();
    init_namespace();
    init_namespaces();
    init_point();
    init_select2();
    init_selectAll2();
    init_selection();
    init_selector();
    init_selectorAll();
    init_style();
    init_touch();
    init_touches();
    init_window();
    init_on();
  }
});

// node_modules/venn.js/node_modules/d3-dispatch/src/dispatch.js
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames2(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
function get(type2, name) {
  for (var i = 0, n = type2.length, c; i < n; ++i) {
    if ((c = type2[i]).name === name) {
      return c.value;
    }
  }
}
function set(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null) type2.push({ name, value: callback });
  return type2;
}
var noop, dispatch_default2;
var init_dispatch2 = __esm({
  "node_modules/venn.js/node_modules/d3-dispatch/src/dispatch.js"() {
    noop = { value: function() {
    } };
    Dispatch.prototype = dispatch.prototype = {
      constructor: Dispatch,
      on: function(typename, callback) {
        var _ = this._, T = parseTypenames2(typename + "", _), t, i = -1, n = T.length;
        if (arguments.length < 2) {
          while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
          return;
        }
        if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
        while (++i < n) {
          if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
          else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
        }
        return this;
      },
      copy: function() {
        var copy = {}, _ = this._;
        for (var t in _) copy[t] = _[t].slice();
        return new Dispatch(copy);
      },
      call: function(type2, that) {
        if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
        for (t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      },
      apply: function(type2, that, args) {
        if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
        for (var t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      }
    };
    dispatch_default2 = dispatch;
  }
});

// node_modules/venn.js/node_modules/d3-dispatch/src/index.js
var init_src2 = __esm({
  "node_modules/venn.js/node_modules/d3-dispatch/src/index.js"() {
    init_dispatch2();
  }
});

// node_modules/venn.js/node_modules/d3-timer/src/timer.js
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now3 = clock.now(), delay = now3 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now3;
}
function nap() {
  var t02, t12 = taskHead, t22, time = Infinity;
  while (t12) {
    if (t12._call) {
      if (time > t12._time) time = t12._time;
      t02 = t12, t12 = t12._next;
    } else {
      t22 = t12._next, t12._next = null;
      t12 = t02 ? t02._next = t22 : taskHead = t22;
    }
  }
  taskTail = t02;
  sleep(time);
}
function sleep(time) {
  if (frame) return;
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
var frame, timeout, interval, pokeDelay, taskHead, taskTail, clockLast, clockNow, clockSkew, clock, setFrame;
var init_timer = __esm({
  "node_modules/venn.js/node_modules/d3-timer/src/timer.js"() {
    frame = 0;
    timeout = 0;
    interval = 0;
    pokeDelay = 1e3;
    clockLast = 0;
    clockNow = 0;
    clockSkew = 0;
    clock = typeof performance === "object" && performance.now ? performance : Date;
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
      setTimeout(f, 17);
    };
    Timer.prototype = timer.prototype = {
      constructor: Timer,
      restart: function(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
          if (taskTail) taskTail._next = this;
          else taskHead = this;
          taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
      },
      stop: function() {
        if (this._call) {
          this._call = null;
          this._time = Infinity;
          sleep();
        }
      }
    };
  }
});

// node_modules/venn.js/node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}
var init_timeout = __esm({
  "node_modules/venn.js/node_modules/d3-timer/src/timeout.js"() {
    init_timer();
  }
});

// node_modules/venn.js/node_modules/d3-timer/src/index.js
var init_src3 = __esm({
  "node_modules/venn.js/node_modules/d3-timer/src/index.js"() {
    init_timer();
    init_timeout();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/schedule.js
function schedule_default(node, name, id3, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id3 in schedules) return;
  create(node, id3, {
    name,
    index,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id3) {
  var schedule = get2(node, id3);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id3) {
  var schedule = get2(node, id3);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}
function get2(node, id3) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id3])) throw new Error("transition not found");
  return schedule;
}
function create(node, id3, self) {
  var schedules = node.__transition, tween;
  schedules[id3] = self;
  self.timer = timer(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start3, self.delay, self.time);
    if (self.delay <= elapsed) start3(elapsed - self.delay);
  }
  function start3(elapsed) {
    var i, j, n, o;
    if (self.state !== SCHEDULED) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;
      if (o.state === STARTED) return timeout_default(start3);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id3) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return;
    self.state = STARTED;
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id3];
    for (var i in schedules) return;
    delete node.__transition;
  }
}
var emptyOn, emptyTween, CREATED, SCHEDULED, STARTING, STARTED, RUNNING, ENDING, ENDED;
var init_schedule = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/schedule.js"() {
    init_src2();
    init_src3();
    emptyOn = dispatch_default2("start", "end", "cancel", "interrupt");
    emptyTween = [];
    CREATED = 0;
    SCHEDULED = 1;
    STARTING = 2;
    STARTED = 3;
    RUNNING = 4;
    ENDING = 5;
    ENDED = 6;
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty3 = true, i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty3 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty3) delete node.__transition;
}
var init_interrupt = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/interrupt.js"() {
    init_schedule();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}
var init_interrupt2 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/selection/interrupt.js"() {
    init_interrupt();
  }
});

// node_modules/venn.js/node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
var init_define = __esm({
  "node_modules/venn.js/node_modules/d3-color/src/define.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-color/src/color.js
function Color() {
}
function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1)) : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
  if (s) {
    if (r === max2) h = (g - b) / s + (g < b) * 6;
    else if (g === max2) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
var darker, brighter, reHex3, reHex6, reRgbInteger, reRgbPercent, reRgbaInteger, reRgbaPercent, reHslPercent, reHslaPercent, named;
var init_color = __esm({
  "node_modules/venn.js/node_modules/d3-color/src/color.js"() {
    init_define();
    darker = 0.7;
    brighter = 1 / darker;
    reHex3 = /^#([0-9a-f]{3})$/;
    reHex6 = /^#([0-9a-f]{6})$/;
    reRgbInteger = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/;
    reRgbPercent = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
    reRgbaInteger = /^rgba\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
    reRgbaPercent = /^rgba\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
    reHslPercent = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
    reHslaPercent = /^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
    named = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074
    };
    define_default(Color, color, {
      displayable: function() {
        return this.rgb().displayable();
      },
      toString: function() {
        return this.rgb() + "";
      }
    });
    define_default(Rgb, rgb, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb: function() {
        return this;
      },
      displayable: function() {
        return 0 <= this.r && this.r <= 255 && (0 <= this.g && this.g <= 255) && (0 <= this.b && this.b <= 255) && (0 <= this.opacity && this.opacity <= 1);
      },
      toString: function() {
        var a = this.opacity;
        a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
      }
    }));
    define_default(Hsl, hsl, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
      }
    }));
  }
});

// node_modules/venn.js/node_modules/d3-color/src/math.js
var deg2rad, rad2deg;
var init_math = __esm({
  "node_modules/venn.js/node_modules/d3-color/src/math.js"() {
    deg2rad = Math.PI / 180;
    rad2deg = 180 / Math.PI;
  }
});

// node_modules/venn.js/node_modules/d3-color/src/lab.js
function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) {
    var h = o.h * deg2rad;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var b = rgb2xyz(o.r), a = rgb2xyz(o.g), l = rgb2xyz(o.b), x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn), y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.072175 * l) / Yn), z = xyz2lab((0.0193339 * b + 0.119192 * a + 0.9503041 * l) / Zn);
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}
function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}
function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}
function xyz2rgb(x) {
  return 255 * (x <= 31308e-7 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2xyz(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  var h = Math.atan2(o.b, o.a) * rad2deg;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}
var Kn, Xn, Yn, Zn, t0, t1, t2, t3;
var init_lab = __esm({
  "node_modules/venn.js/node_modules/d3-color/src/lab.js"() {
    init_define();
    init_color();
    init_math();
    Kn = 18;
    Xn = 0.95047;
    Yn = 1;
    Zn = 1.08883;
    t0 = 4 / 29;
    t1 = 6 / 29;
    t2 = 3 * t1 * t1;
    t3 = t1 * t1 * t1;
    define_default(Lab, lab, extend(Color, {
      brighter: function(k) {
        return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
      },
      darker: function(k) {
        return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
      },
      rgb: function() {
        var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
        y = Yn * lab2xyz(y);
        x = Xn * lab2xyz(x);
        z = Zn * lab2xyz(z);
        return new Rgb(
          xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z),
          // D65 -> sRGB
          xyz2rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z),
          xyz2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
          this.opacity
        );
      }
    }));
    define_default(Hcl, hcl, extend(Color, {
      brighter: function(k) {
        return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
      },
      darker: function(k) {
        return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
      },
      rgb: function() {
        return labConvert(this).rgb();
      }
    }));
  }
});

// node_modules/venn.js/node_modules/d3-color/src/cubehelix.js
function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
var A, B, C, D, E, ED, EB, BC_DA;
var init_cubehelix = __esm({
  "node_modules/venn.js/node_modules/d3-color/src/cubehelix.js"() {
    init_define();
    init_color();
    init_math();
    A = -0.14861;
    B = 1.78277;
    C = -0.29227;
    D = -0.90649;
    E = 1.97294;
    ED = E * D;
    EB = E * B;
    BC_DA = B * C - D * A;
    define_default(Cubehelix, cubehelix, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function() {
        var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
        return new Rgb(
          255 * (l + a * (A * cosh + B * sinh)),
          255 * (l + a * (C * cosh + D * sinh)),
          255 * (l + a * (E * cosh)),
          this.opacity
        );
      }
    }));
  }
});

// node_modules/venn.js/node_modules/d3-color/index.js
var init_d3_color = __esm({
  "node_modules/venn.js/node_modules/d3-color/index.js"() {
    init_color();
    init_lab();
    init_cubehelix();
  }
});

// node_modules/venn.js/node_modules/d3-interpolate/src/basis.js
function basis(t12, v0, v1, v2, v3) {
  var t22 = t12 * t12, t32 = t22 * t12;
  return ((1 - 3 * t12 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t12 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
var init_basis = __esm({
  "node_modules/venn.js/node_modules/d3-interpolate/src/basis.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
var init_basisClosed = __esm({
  "node_modules/venn.js/node_modules/d3-interpolate/src/basisClosed.js"() {
    init_basis();
  }
});

// node_modules/venn.js/node_modules/d3-interpolate/src/constant.js
function constant_default2(x) {
  return function() {
    return x;
  };
}
var init_constant2 = __esm({
  "node_modules/venn.js/node_modules/d3-interpolate/src/constant.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant_default2(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default2(isNaN(a) ? b : a);
}
var init_color2 = __esm({
  "node_modules/venn.js/node_modules/d3-interpolate/src/color.js"() {
    init_constant2();
  }
});

// node_modules/venn.js/node_modules/d3-interpolate/src/rgb.js
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color3;
    for (i = 0; i < n; ++i) {
      color3 = rgb(colors[i]);
      r[i] = color3.r || 0;
      g[i] = color3.g || 0;
      b[i] = color3.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color3.opacity = 1;
    return function(t) {
      color3.r = r(t);
      color3.g = g(t);
      color3.b = b(t);
      return color3 + "";
    };
  };
}
var rgb_default, rgbBasis, rgbBasisClosed;
var init_rgb = __esm({
  "node_modules/venn.js/node_modules/d3-interpolate/src/rgb.js"() {
    init_d3_color();
    init_basis();
    init_basisClosed();
    init_color2();
    rgb_default = (function rgbGamma(y) {
      var color3 = gamma(y);
      function rgb3(start3, end) {
        var r = color3((start3 = rgb(start3)).r, (end = rgb(end)).r), g = color3(start3.g, end.g), b = color3(start3.b, end.b), opacity = nogamma(start3.opacity, end.opacity);
        return function(t) {
          start3.r = r(t);
          start3.g = g(t);
          start3.b = b(t);
          start3.opacity = opacity(t);
          return start3 + "";
        };
      }
      rgb3.gamma = rgbGamma;
      return rgb3;
    })(1);
    rgbBasis = rgbSpline(basis_default);
    rgbBasisClosed = rgbSpline(basisClosed_default);
  }
});

// node_modules/venn.js/node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}
var init_number = __esm({
  "node_modules/venn.js/node_modules/d3-interpolate/src/number.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-interpolate/src/string.js
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}
var reA, reB;
var init_string = __esm({
  "node_modules/venn.js/node_modules/d3-interpolate/src/string.js"() {
    init_number();
    reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    reB = new RegExp(reA.source, "g");
  }
});

// node_modules/venn.js/node_modules/d3-interpolate/src/transform/decompose.js
function decompose_default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}
var degrees, identity;
var init_decompose = __esm({
  "node_modules/venn.js/node_modules/d3-interpolate/src/transform/decompose.js"() {
    degrees = 180 / Math.PI;
    identity = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };
  }
});

// node_modules/venn.js/node_modules/d3-interpolate/src/transform/parse.js
function parseCss(value) {
  if (value === "none") return identity;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return decompose_default(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}
function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}
var cssNode, cssRoot, cssView, svgNode;
var init_parse = __esm({
  "node_modules/venn.js/node_modules/d3-interpolate/src/transform/parse.js"() {
    init_decompose();
  }
});

// node_modules/venn.js/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss, interpolateTransformSvg;
var init_transform = __esm({
  "node_modules/venn.js/node_modules/d3-interpolate/src/transform/index.js"() {
    init_number();
    init_parse();
    interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
    interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
  }
});

// node_modules/venn.js/node_modules/d3-interpolate/src/index.js
var init_src4 = __esm({
  "node_modules/venn.js/node_modules/d3-interpolate/src/index.js"() {
    init_number();
    init_string();
    init_transform();
    init_rgb();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id3, name) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id3), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id3, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule = set2(this, id3), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id3 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id3).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id3, name, value));
}
function tweenValue(transition3, name, value) {
  var id3 = transition3._id;
  transition3.each(function() {
    var schedule = set2(this, id3);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id3).value[name];
  };
}
var init_tween = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/tween.js"() {
    init_schedule();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a, b) {
  var c;
  return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
}
var init_interpolate = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/interpolate.js"() {
    init_d3_color();
    init_src4();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value) {
  var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}
var init_attr2 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/attr.js"() {
    init_src4();
    init_src();
    init_tween();
    init_interpolate();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t02 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t02 = (i0 = i) && attrInterpolate(name, i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
var init_attrTween = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/attrTween.js"() {
    init_src();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/delay.js
function delayFunction(id3, value) {
  return function() {
    init(this, id3).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id3, value) {
  return value = +value, function() {
    init(this, id3).delay = value;
  };
}
function delay_default(value) {
  var id3 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id3, value)) : get2(this.node(), id3).delay;
}
var init_delay = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/delay.js"() {
    init_schedule();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/duration.js
function durationFunction(id3, value) {
  return function() {
    set2(this, id3).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id3, value) {
  return value = +value, function() {
    set2(this, id3).duration = value;
  };
}
function duration_default(value) {
  var id3 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id3, value)) : get2(this.node(), id3).duration;
}
var init_duration = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/duration.js"() {
    init_schedule();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/ease.js
function easeConstant(id3, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set2(this, id3).ease = value;
  };
}
function ease_default(value) {
  var id3 = this._id;
  return arguments.length ? this.each(easeConstant(id3, value)) : get2(this.node(), id3).ease;
}
var init_ease = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/ease.js"() {
    init_schedule();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}
var init_filter2 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/filter.js"() {
    init_src();
    init_transition2();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition3) {
  if (transition3._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition3._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}
var init_merge2 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/merge.js"() {
    init_transition2();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id3, name, listener) {
  var on0, on1, sit = start(name) ? init : set2;
  return function() {
    var schedule = sit(this, id3), on = schedule.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id3 = this._id;
  return arguments.length < 2 ? get2(this.node(), id3).on.on(name) : this.each(onFunction(id3, name, listener));
}
var init_on2 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/on.js"() {
    init_schedule();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/remove.js
function removeFunction(id3) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id3) return;
    if (parent) parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}
var init_remove2 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/remove.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/select.js
function select_default3(select) {
  var name = this._name, id3 = this._id;
  if (typeof select !== "function") select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name, id3, i, subgroup, get2(node, id3));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id3);
}
var init_select3 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/select.js"() {
    init_src();
    init_transition2();
    init_schedule();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default3(select) {
  var name = this._name, id3 = this._id;
  if (typeof select !== "function") select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children2 = select.call(node, node.__data__, i, group), child, inherit3 = get2(node, id3), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule_default(child, name, id3, k, children2, inherit3);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id3);
}
var init_selectAll3 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/selectAll.js"() {
    init_src();
    init_transition2();
    init_schedule();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/selection.js
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}
var Selection2;
var init_selection2 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/selection.js"() {
    init_src();
    Selection2 = selection_default.prototype.constructor;
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id3, name) {
  var on0, on1, listener0, key = "style." + name, event2 = "end." + key, remove3;
  return function() {
    var schedule = set2(this, id3), on = schedule.on, listener = schedule.value[key] == null ? remove3 || (remove3 = styleRemove2(name)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event2, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
}
var init_style2 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/style.js"() {
    init_src4();
    init_src();
    init_schedule();
    init_tween();
    init_interpolate();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
var init_styleTween = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/styleTween.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}
var init_text2 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/text.js"() {
    init_tween();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t02 = (i0 = i) && textInterpolate(i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}
var init_textTween = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/textTween.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit3 = get2(node, id0);
        schedule_default(node, name, id1, i, group, {
          time: inherit3.time + inherit3.delay + inherit3.duration,
          delay: 0,
          duration: inherit3.duration,
          ease: inherit3.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}
var init_transition = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/transition.js"() {
    init_transition2();
    init_schedule();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id3 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0) resolve();
    } };
    that.each(function() {
      var schedule = set2(this, id3), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
  });
}
var init_end = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/end.js"() {
    init_schedule();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/transition/index.js
function Transition(groups, parents, name, id3) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id3;
}
function transition(name) {
  return selection_default().transition(name);
}
function newId() {
  return ++id;
}
var id, selection_prototype;
var init_transition2 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/transition/index.js"() {
    init_src();
    init_attr2();
    init_attrTween();
    init_delay();
    init_duration();
    init_ease();
    init_filter2();
    init_merge2();
    init_on2();
    init_remove2();
    init_select3();
    init_selectAll3();
    init_selection2();
    init_style2();
    init_styleTween();
    init_text2();
    init_textTween();
    init_transition();
    init_tween();
    init_end();
    id = 0;
    selection_prototype = selection_default.prototype;
    Transition.prototype = transition.prototype = {
      constructor: Transition,
      select: select_default3,
      selectAll: selectAll_default3,
      filter: filter_default2,
      merge: merge_default2,
      selection: selection_default2,
      transition: transition_default,
      call: selection_prototype.call,
      nodes: selection_prototype.nodes,
      node: selection_prototype.node,
      size: selection_prototype.size,
      empty: selection_prototype.empty,
      each: selection_prototype.each,
      on: on_default2,
      attr: attr_default2,
      attrTween: attrTween_default,
      style: style_default2,
      styleTween: styleTween_default,
      text: text_default2,
      textTween: textTween_default,
      remove: remove_default2,
      tween: tween_default,
      delay: delay_default,
      duration: duration_default,
      ease: ease_default,
      end: end_default
    };
  }
});

// node_modules/venn.js/node_modules/d3-ease/src/cubic.js
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var init_cubic = __esm({
  "node_modules/venn.js/node_modules/d3-ease/src/cubic.js"() {
  }
});

// node_modules/venn.js/node_modules/d3-ease/src/index.js
var init_src5 = __esm({
  "node_modules/venn.js/node_modules/d3-ease/src/index.js"() {
    init_cubic();
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/selection/transition.js
function inherit(node, id3) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id3])) {
    if (!(node = node.parentNode)) {
      return defaultTiming.time = now(), defaultTiming;
    }
  }
  return timing;
}
function transition_default2(name) {
  var id3, timing;
  if (name instanceof Transition) {
    id3 = name._id, name = name._name;
  } else {
    id3 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule_default(node, name, id3, i, group, timing || inherit(node, id3));
      }
    }
  }
  return new Transition(groups, this._parents, name, id3);
}
var defaultTiming;
var init_transition3 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/selection/transition.js"() {
    init_transition2();
    init_schedule();
    init_src5();
    init_src3();
    defaultTiming = {
      time: null,
      // Set on use.
      delay: 0,
      duration: 250,
      ease: cubicInOut
    };
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/selection/index.js
var init_selection3 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/selection/index.js"() {
    init_src();
    init_interrupt2();
    init_transition3();
    selection_default.prototype.interrupt = interrupt_default2;
    selection_default.prototype.transition = transition_default2;
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/active.js
function active_default(node, name) {
  var schedules = node.__transition, schedule, i;
  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > SCHEDULED && schedule.name === name) {
        return new Transition([[node]], root2, name, +i);
      }
    }
  }
  return null;
}
var root2;
var init_active = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/active.js"() {
    init_transition2();
    init_schedule();
    root2 = [null];
  }
});

// node_modules/venn.js/node_modules/d3-transition/src/index.js
var src_exports2 = {};
__export(src_exports2, {
  active: () => active_default,
  interrupt: () => interrupt_default,
  transition: () => transition
});
var init_src6 = __esm({
  "node_modules/venn.js/node_modules/d3-transition/src/index.js"() {
    init_selection3();
    init_transition2();
    init_active();
    init_interrupt();
  }
});

// node_modules/venn.js/build/venn.js
var require_venn = __commonJS({
  "node_modules/venn.js/build/venn.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, (init_src(), __toCommonJS(src_exports)), (init_src6(), __toCommonJS(src_exports2))) : typeof define === "function" && define.amd ? define(["exports", "d3-selection", "d3-transition"], factory) : factory(global.venn = {}, global.d3, global.d3);
    })(exports, (function(exports2, d3Selection, d3Transition) {
      "use strict";
      var SMALL = 1e-10;
      function intersectionArea(circles, stats) {
        var intersectionPoints = getIntersectionPoints(circles);
        var innerPoints = intersectionPoints.filter(function(p3) {
          return containedInCircles(p3, circles);
        });
        var arcArea = 0, polygonArea = 0, arcs = [], i;
        if (innerPoints.length > 1) {
          var center = getCenter(innerPoints);
          for (i = 0; i < innerPoints.length; ++i) {
            var p = innerPoints[i];
            p.angle = Math.atan2(p.x - center.x, p.y - center.y);
          }
          innerPoints.sort(function(a3, b) {
            return b.angle - a3.angle;
          });
          var p2 = innerPoints[innerPoints.length - 1];
          for (i = 0; i < innerPoints.length; ++i) {
            var p1 = innerPoints[i];
            polygonArea += (p2.x + p1.x) * (p1.y - p2.y);
            var midPoint = {
              x: (p1.x + p2.x) / 2,
              y: (p1.y + p2.y) / 2
            }, arc = null;
            for (var j = 0; j < p1.parentIndex.length; ++j) {
              if (p2.parentIndex.indexOf(p1.parentIndex[j]) > -1) {
                var circle = circles[p1.parentIndex[j]], a1 = Math.atan2(p1.x - circle.x, p1.y - circle.y), a2 = Math.atan2(p2.x - circle.x, p2.y - circle.y);
                var angleDiff = a2 - a1;
                if (angleDiff < 0) {
                  angleDiff += 2 * Math.PI;
                }
                var a = a2 - angleDiff / 2, width = distance(midPoint, {
                  x: circle.x + circle.radius * Math.sin(a),
                  y: circle.y + circle.radius * Math.cos(a)
                });
                if (width > circle.radius * 2) {
                  width = circle.radius * 2;
                }
                if (arc === null || arc.width > width) {
                  arc = {
                    circle,
                    width,
                    p1,
                    p2
                  };
                }
              }
            }
            if (arc !== null) {
              arcs.push(arc);
              arcArea += circleArea(arc.circle.radius, arc.width);
              p2 = p1;
            }
          }
        } else {
          var smallest = circles[0];
          for (i = 1; i < circles.length; ++i) {
            if (circles[i].radius < smallest.radius) {
              smallest = circles[i];
            }
          }
          var disjoint = false;
          for (i = 0; i < circles.length; ++i) {
            if (distance(circles[i], smallest) > Math.abs(smallest.radius - circles[i].radius)) {
              disjoint = true;
              break;
            }
          }
          if (disjoint) {
            arcArea = polygonArea = 0;
          } else {
            arcArea = smallest.radius * smallest.radius * Math.PI;
            arcs.push({
              circle: smallest,
              p1: { x: smallest.x, y: smallest.y + smallest.radius },
              p2: { x: smallest.x - SMALL, y: smallest.y + smallest.radius },
              width: smallest.radius * 2
            });
          }
        }
        polygonArea /= 2;
        if (stats) {
          stats.area = arcArea + polygonArea;
          stats.arcArea = arcArea;
          stats.polygonArea = polygonArea;
          stats.arcs = arcs;
          stats.innerPoints = innerPoints;
          stats.intersectionPoints = intersectionPoints;
        }
        return arcArea + polygonArea;
      }
      function containedInCircles(point, circles) {
        for (var i = 0; i < circles.length; ++i) {
          if (distance(point, circles[i]) > circles[i].radius + SMALL) {
            return false;
          }
        }
        return true;
      }
      function getIntersectionPoints(circles) {
        var ret = [];
        for (var i = 0; i < circles.length; ++i) {
          for (var j = i + 1; j < circles.length; ++j) {
            var intersect = circleCircleIntersection(
              circles[i],
              circles[j]
            );
            for (var k = 0; k < intersect.length; ++k) {
              var p = intersect[k];
              p.parentIndex = [i, j];
              ret.push(p);
            }
          }
        }
        return ret;
      }
      function circleArea(r, width) {
        return r * r * Math.acos(1 - width / r) - (r - width) * Math.sqrt(width * (2 * r - width));
      }
      function distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
      }
      function circleOverlap(r1, r2, d) {
        if (d >= r1 + r2) {
          return 0;
        }
        if (d <= Math.abs(r1 - r2)) {
          return Math.PI * Math.min(r1, r2) * Math.min(r1, r2);
        }
        var w1 = r1 - (d * d - r2 * r2 + r1 * r1) / (2 * d), w2 = r2 - (d * d - r1 * r1 + r2 * r2) / (2 * d);
        return circleArea(r1, w1) + circleArea(r2, w2);
      }
      function circleCircleIntersection(p1, p2) {
        var d = distance(p1, p2), r1 = p1.radius, r2 = p2.radius;
        if (d >= r1 + r2 || d <= Math.abs(r1 - r2)) {
          return [];
        }
        var a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(r1 * r1 - a * a), x0 = p1.x + a * (p2.x - p1.x) / d, y0 = p1.y + a * (p2.y - p1.y) / d, rx = -(p2.y - p1.y) * (h / d), ry = -(p2.x - p1.x) * (h / d);
        return [
          { x: x0 + rx, y: y0 - ry },
          { x: x0 - rx, y: y0 + ry }
        ];
      }
      function getCenter(points) {
        var center = { x: 0, y: 0 };
        for (var i = 0; i < points.length; ++i) {
          center.x += points[i].x;
          center.y += points[i].y;
        }
        center.x /= points.length;
        center.y /= points.length;
        return center;
      }
      function bisect(f, a, b, parameters) {
        parameters = parameters || {};
        var maxIterations = parameters.maxIterations || 100, tolerance = parameters.tolerance || 1e-10, fA = f(a), fB = f(b), delta = b - a;
        if (fA * fB > 0) {
          throw "Initial bisect points must have opposite signs";
        }
        if (fA === 0) return a;
        if (fB === 0) return b;
        for (var i = 0; i < maxIterations; ++i) {
          delta /= 2;
          var mid = a + delta, fMid = f(mid);
          if (fMid * fA >= 0) {
            a = mid;
          }
          if (Math.abs(delta) < tolerance || fMid === 0) {
            return mid;
          }
        }
        return a + delta;
      }
      function zeros(x) {
        var r = new Array(x);
        for (var i = 0; i < x; ++i) {
          r[i] = 0;
        }
        return r;
      }
      function zerosM(x, y) {
        return zeros(x).map(function() {
          return zeros(y);
        });
      }
      function dot(a, b) {
        var ret = 0;
        for (var i = 0; i < a.length; ++i) {
          ret += a[i] * b[i];
        }
        return ret;
      }
      function norm2(a) {
        return Math.sqrt(dot(a, a));
      }
      function scale(ret, value, c) {
        for (var i = 0; i < value.length; ++i) {
          ret[i] = value[i] * c;
        }
      }
      function weightedSum(ret, w1, v1, w2, v2) {
        for (var j = 0; j < ret.length; ++j) {
          ret[j] = w1 * v1[j] + w2 * v2[j];
        }
      }
      function nelderMead(f, x0, parameters) {
        parameters = parameters || {};
        var maxIterations = parameters.maxIterations || x0.length * 200, nonZeroDelta = parameters.nonZeroDelta || 1.05, zeroDelta = parameters.zeroDelta || 1e-3, minErrorDelta = parameters.minErrorDelta || 1e-6, minTolerance = parameters.minErrorDelta || 1e-5, rho = parameters.rho !== void 0 ? parameters.rho : 1, chi = parameters.chi !== void 0 ? parameters.chi : 2, psi = parameters.psi !== void 0 ? parameters.psi : -0.5, sigma = parameters.sigma !== void 0 ? parameters.sigma : 0.5, maxDiff;
        var N = x0.length, simplex = new Array(N + 1);
        simplex[0] = x0;
        simplex[0].fx = f(x0);
        simplex[0].id = 0;
        for (var i = 0; i < N; ++i) {
          var point = x0.slice();
          point[i] = point[i] ? point[i] * nonZeroDelta : zeroDelta;
          simplex[i + 1] = point;
          simplex[i + 1].fx = f(point);
          simplex[i + 1].id = i + 1;
        }
        function updateSimplex(value) {
          for (var i2 = 0; i2 < value.length; i2++) {
            simplex[N][i2] = value[i2];
          }
          simplex[N].fx = value.fx;
        }
        var sortOrder = function(a, b) {
          return a.fx - b.fx;
        };
        var centroid = x0.slice(), reflected = x0.slice(), contracted = x0.slice(), expanded = x0.slice();
        for (var iteration = 0; iteration < maxIterations; ++iteration) {
          simplex.sort(sortOrder);
          if (parameters.history) {
            var sortedSimplex = simplex.map(function(x) {
              var state = x.slice();
              state.fx = x.fx;
              state.id = x.id;
              return state;
            });
            sortedSimplex.sort(function(a, b) {
              return a.id - b.id;
            });
            parameters.history.push({
              x: simplex[0].slice(),
              fx: simplex[0].fx,
              simplex: sortedSimplex
            });
          }
          maxDiff = 0;
          for (i = 0; i < N; ++i) {
            maxDiff = Math.max(maxDiff, Math.abs(simplex[0][i] - simplex[1][i]));
          }
          if (Math.abs(simplex[0].fx - simplex[N].fx) < minErrorDelta && maxDiff < minTolerance) {
            break;
          }
          for (i = 0; i < N; ++i) {
            centroid[i] = 0;
            for (var j = 0; j < N; ++j) {
              centroid[i] += simplex[j][i];
            }
            centroid[i] /= N;
          }
          var worst = simplex[N];
          weightedSum(reflected, 1 + rho, centroid, -rho, worst);
          reflected.fx = f(reflected);
          if (reflected.fx < simplex[0].fx) {
            weightedSum(expanded, 1 + chi, centroid, -chi, worst);
            expanded.fx = f(expanded);
            if (expanded.fx < reflected.fx) {
              updateSimplex(expanded);
            } else {
              updateSimplex(reflected);
            }
          } else if (reflected.fx >= simplex[N - 1].fx) {
            var shouldReduce = false;
            if (reflected.fx > worst.fx) {
              weightedSum(contracted, 1 + psi, centroid, -psi, worst);
              contracted.fx = f(contracted);
              if (contracted.fx < worst.fx) {
                updateSimplex(contracted);
              } else {
                shouldReduce = true;
              }
            } else {
              weightedSum(contracted, 1 - psi * rho, centroid, psi * rho, worst);
              contracted.fx = f(contracted);
              if (contracted.fx < reflected.fx) {
                updateSimplex(contracted);
              } else {
                shouldReduce = true;
              }
            }
            if (shouldReduce) {
              if (sigma >= 1) break;
              for (i = 1; i < simplex.length; ++i) {
                weightedSum(simplex[i], 1 - sigma, simplex[0], sigma, simplex[i]);
                simplex[i].fx = f(simplex[i]);
              }
            }
          } else {
            updateSimplex(reflected);
          }
        }
        simplex.sort(sortOrder);
        return {
          fx: simplex[0].fx,
          x: simplex[0]
        };
      }
      function wolfeLineSearch(f, pk, current, next, a, c1, c2) {
        var phi0 = current.fx, phiPrime0 = dot(current.fxprime, pk), phi = phi0, phi_old = phi0, phiPrime = phiPrime0, a0 = 0;
        a = a || 1;
        c1 = c1 || 1e-6;
        c2 = c2 || 0.1;
        function zoom(a_lo, a_high, phi_lo) {
          for (var iteration2 = 0; iteration2 < 16; ++iteration2) {
            a = (a_lo + a_high) / 2;
            weightedSum(next.x, 1, current.x, a, pk);
            phi = next.fx = f(next.x, next.fxprime);
            phiPrime = dot(next.fxprime, pk);
            if (phi > phi0 + c1 * a * phiPrime0 || phi >= phi_lo) {
              a_high = a;
            } else {
              if (Math.abs(phiPrime) <= -c2 * phiPrime0) {
                return a;
              }
              if (phiPrime * (a_high - a_lo) >= 0) {
                a_high = a_lo;
              }
              a_lo = a;
              phi_lo = phi;
            }
          }
          return 0;
        }
        for (var iteration = 0; iteration < 10; ++iteration) {
          weightedSum(next.x, 1, current.x, a, pk);
          phi = next.fx = f(next.x, next.fxprime);
          phiPrime = dot(next.fxprime, pk);
          if (phi > phi0 + c1 * a * phiPrime0 || iteration && phi >= phi_old) {
            return zoom(a0, a, phi_old);
          }
          if (Math.abs(phiPrime) <= -c2 * phiPrime0) {
            return a;
          }
          if (phiPrime >= 0) {
            return zoom(a, a0, phi);
          }
          phi_old = phi;
          a0 = a;
          a *= 2;
        }
        return a;
      }
      function conjugateGradient(f, initial, params) {
        var current = { x: initial.slice(), fx: 0, fxprime: initial.slice() }, next = { x: initial.slice(), fx: 0, fxprime: initial.slice() }, yk = initial.slice(), pk, temp, a = 1, maxIterations;
        params = params || {};
        maxIterations = params.maxIterations || initial.length * 20;
        current.fx = f(current.x, current.fxprime);
        pk = current.fxprime.slice();
        scale(pk, current.fxprime, -1);
        for (var i = 0; i < maxIterations; ++i) {
          a = wolfeLineSearch(f, pk, current, next, a);
          if (params.history) {
            params.history.push({
              x: current.x.slice(),
              fx: current.fx,
              fxprime: current.fxprime.slice(),
              alpha: a
            });
          }
          if (!a) {
            scale(pk, current.fxprime, -1);
          } else {
            weightedSum(yk, 1, next.fxprime, -1, current.fxprime);
            var delta_k = dot(current.fxprime, current.fxprime), beta_k = Math.max(0, dot(yk, next.fxprime) / delta_k);
            weightedSum(pk, beta_k, pk, -1, next.fxprime);
            temp = current;
            current = next;
            next = temp;
          }
          if (norm2(current.fxprime) <= 1e-5) {
            break;
          }
        }
        if (params.history) {
          params.history.push({
            x: current.x.slice(),
            fx: current.fx,
            fxprime: current.fxprime.slice(),
            alpha: a
          });
        }
        return current;
      }
      function venn2(areas, parameters) {
        parameters = parameters || {};
        parameters.maxIterations = parameters.maxIterations || 500;
        var initialLayout = parameters.initialLayout || bestInitialLayout;
        var loss = parameters.lossFunction || lossFunction;
        areas = addMissingAreas(areas);
        var circles = initialLayout(areas, parameters);
        var initial = [], setids = [], setid;
        for (setid in circles) {
          if (circles.hasOwnProperty(setid)) {
            initial.push(circles[setid].x);
            initial.push(circles[setid].y);
            setids.push(setid);
          }
        }
        var solution = nelderMead(
          function(values) {
            var current = {};
            for (var i2 = 0; i2 < setids.length; ++i2) {
              var setid2 = setids[i2];
              current[setid2] = {
                x: values[2 * i2],
                y: values[2 * i2 + 1],
                radius: circles[setid2].radius
                // size : circles[setid].size
              };
            }
            return loss(current, areas);
          },
          initial,
          parameters
        );
        var positions = solution.x;
        for (var i = 0; i < setids.length; ++i) {
          setid = setids[i];
          circles[setid].x = positions[2 * i];
          circles[setid].y = positions[2 * i + 1];
        }
        return circles;
      }
      var SMALL$1 = 1e-10;
      function distanceFromIntersectArea(r1, r2, overlap) {
        if (Math.min(r1, r2) * Math.min(r1, r2) * Math.PI <= overlap + SMALL$1) {
          return Math.abs(r1 - r2);
        }
        return bisect(function(distance$$1) {
          return circleOverlap(r1, r2, distance$$1) - overlap;
        }, 0, r1 + r2);
      }
      function addMissingAreas(areas) {
        areas = areas.slice();
        var ids = [], pairs = {}, i, j, a, b;
        for (i = 0; i < areas.length; ++i) {
          var area = areas[i];
          if (area.sets.length == 1) {
            ids.push(area.sets[0]);
          } else if (area.sets.length == 2) {
            a = area.sets[0];
            b = area.sets[1];
            pairs[[a, b]] = true;
            pairs[[b, a]] = true;
          }
        }
        ids.sort(function(a2, b2) {
          return a2 > b2;
        });
        for (i = 0; i < ids.length; ++i) {
          a = ids[i];
          for (j = i + 1; j < ids.length; ++j) {
            b = ids[j];
            if (!([a, b] in pairs)) {
              areas.push({
                "sets": [a, b],
                "size": 0
              });
            }
          }
        }
        return areas;
      }
      function getDistanceMatrices(areas, sets, setids) {
        var distances = zerosM(sets.length, sets.length), constraints = zerosM(sets.length, sets.length);
        areas.filter(function(x) {
          return x.sets.length == 2;
        }).map(function(current) {
          var left = setids[current.sets[0]], right = setids[current.sets[1]], r1 = Math.sqrt(sets[left].size / Math.PI), r2 = Math.sqrt(sets[right].size / Math.PI), distance$$1 = distanceFromIntersectArea(r1, r2, current.size);
          distances[left][right] = distances[right][left] = distance$$1;
          var c = 0;
          if (current.size + 1e-10 >= Math.min(
            sets[left].size,
            sets[right].size
          )) {
            c = 1;
          } else if (current.size <= 1e-10) {
            c = -1;
          }
          constraints[left][right] = constraints[right][left] = c;
        });
        return { distances, constraints };
      }
      function constrainedMDSGradient(x, fxprime, distances, constraints) {
        var loss = 0, i;
        for (i = 0; i < fxprime.length; ++i) {
          fxprime[i] = 0;
        }
        for (i = 0; i < distances.length; ++i) {
          var xi = x[2 * i], yi = x[2 * i + 1];
          for (var j = i + 1; j < distances.length; ++j) {
            var xj = x[2 * j], yj = x[2 * j + 1], dij = distances[i][j], constraint = constraints[i][j];
            var squaredDistance = (xj - xi) * (xj - xi) + (yj - yi) * (yj - yi), distance$$1 = Math.sqrt(squaredDistance), delta = squaredDistance - dij * dij;
            if (constraint > 0 && distance$$1 <= dij || constraint < 0 && distance$$1 >= dij) {
              continue;
            }
            loss += 2 * delta * delta;
            fxprime[2 * i] += 4 * delta * (xi - xj);
            fxprime[2 * i + 1] += 4 * delta * (yi - yj);
            fxprime[2 * j] += 4 * delta * (xj - xi);
            fxprime[2 * j + 1] += 4 * delta * (yj - yi);
          }
        }
        return loss;
      }
      function bestInitialLayout(areas, params) {
        var initial = greedyLayout(areas, params);
        var loss = params.lossFunction || lossFunction;
        if (areas.length >= 8) {
          var constrained = constrainedMDSLayout(areas, params), constrainedLoss = loss(constrained, areas), greedyLoss = loss(initial, areas);
          if (constrainedLoss + 1e-8 < greedyLoss) {
            initial = constrained;
          }
        }
        return initial;
      }
      function constrainedMDSLayout(areas, params) {
        params = params || {};
        var restarts = params.restarts || 10;
        var sets = [], setids = {}, i;
        for (i = 0; i < areas.length; ++i) {
          var area = areas[i];
          if (area.sets.length == 1) {
            setids[area.sets[0]] = sets.length;
            sets.push(area);
          }
        }
        var matrices = getDistanceMatrices(areas, sets, setids), distances = matrices.distances, constraints = matrices.constraints;
        var norm = norm2(distances.map(norm2)) / distances.length;
        distances = distances.map(function(row) {
          return row.map(function(value) {
            return value / norm;
          });
        });
        var obj = function(x, fxprime) {
          return constrainedMDSGradient(x, fxprime, distances, constraints);
        };
        var best, current;
        for (i = 0; i < restarts; ++i) {
          var initial = zeros(distances.length * 2).map(Math.random);
          current = conjugateGradient(obj, initial, params);
          if (!best || current.fx < best.fx) {
            best = current;
          }
        }
        var positions = best.x;
        var circles = {};
        for (i = 0; i < sets.length; ++i) {
          var set5 = sets[i];
          circles[set5.sets[0]] = {
            x: positions[2 * i] * norm,
            y: positions[2 * i + 1] * norm,
            radius: Math.sqrt(set5.size / Math.PI)
          };
        }
        if (params.history) {
          for (i = 0; i < params.history.length; ++i) {
            scale(params.history[i].x, norm);
          }
        }
        return circles;
      }
      function greedyLayout(areas, params) {
        var loss = params && params.lossFunction ? params.lossFunction : lossFunction;
        var circles = {}, setOverlaps = {}, set5;
        for (var i = 0; i < areas.length; ++i) {
          var area = areas[i];
          if (area.sets.length == 1) {
            set5 = area.sets[0];
            circles[set5] = {
              x: 1e10,
              y: 1e10,
              rowid: circles.length,
              size: area.size,
              radius: Math.sqrt(area.size / Math.PI)
            };
            setOverlaps[set5] = [];
          }
        }
        areas = areas.filter(function(a) {
          return a.sets.length == 2;
        });
        for (i = 0; i < areas.length; ++i) {
          var current = areas[i];
          var weight = current.hasOwnProperty("weight") ? current.weight : 1;
          var left = current.sets[0], right = current.sets[1];
          if (current.size + SMALL$1 >= Math.min(
            circles[left].size,
            circles[right].size
          )) {
            weight = 0;
          }
          setOverlaps[left].push({ set: right, size: current.size, weight });
          setOverlaps[right].push({ set: left, size: current.size, weight });
        }
        var mostOverlapped = [];
        for (set5 in setOverlaps) {
          if (setOverlaps.hasOwnProperty(set5)) {
            var size = 0;
            for (i = 0; i < setOverlaps[set5].length; ++i) {
              size += setOverlaps[set5][i].size * setOverlaps[set5][i].weight;
            }
            mostOverlapped.push({ set: set5, size });
          }
        }
        function sortOrder(a, b) {
          return b.size - a.size;
        }
        mostOverlapped.sort(sortOrder);
        var positioned = {};
        function isPositioned(element2) {
          return element2.set in positioned;
        }
        function positionSet(point, index) {
          circles[index].x = point.x;
          circles[index].y = point.y;
          positioned[index] = true;
        }
        positionSet({ x: 0, y: 0 }, mostOverlapped[0].set);
        for (i = 1; i < mostOverlapped.length; ++i) {
          var setIndex = mostOverlapped[i].set, overlap = setOverlaps[setIndex].filter(isPositioned);
          set5 = circles[setIndex];
          overlap.sort(sortOrder);
          if (overlap.length === 0) {
            throw "ERROR: missing pairwise overlap information";
          }
          var points = [];
          for (var j = 0; j < overlap.length; ++j) {
            var p1 = circles[overlap[j].set], d1 = distanceFromIntersectArea(
              set5.radius,
              p1.radius,
              overlap[j].size
            );
            points.push({ x: p1.x + d1, y: p1.y });
            points.push({ x: p1.x - d1, y: p1.y });
            points.push({ y: p1.y + d1, x: p1.x });
            points.push({ y: p1.y - d1, x: p1.x });
            for (var k = j + 1; k < overlap.length; ++k) {
              var p2 = circles[overlap[k].set], d2 = distanceFromIntersectArea(
                set5.radius,
                p2.radius,
                overlap[k].size
              );
              var extraPoints = circleCircleIntersection(
                { x: p1.x, y: p1.y, radius: d1 },
                { x: p2.x, y: p2.y, radius: d2 }
              );
              for (var l = 0; l < extraPoints.length; ++l) {
                points.push(extraPoints[l]);
              }
            }
          }
          var bestLoss = 1e50, bestPoint = points[0];
          for (j = 0; j < points.length; ++j) {
            circles[setIndex].x = points[j].x;
            circles[setIndex].y = points[j].y;
            var localLoss = loss(circles, areas);
            if (localLoss < bestLoss) {
              bestLoss = localLoss;
              bestPoint = points[j];
            }
          }
          positionSet(bestPoint, setIndex);
        }
        return circles;
      }
      function lossFunction(sets, overlaps) {
        var output = 0;
        function getCircles(indices) {
          return indices.map(function(i2) {
            return sets[i2];
          });
        }
        for (var i = 0; i < overlaps.length; ++i) {
          var area = overlaps[i], overlap;
          if (area.sets.length == 1) {
            continue;
          } else if (area.sets.length == 2) {
            var left = sets[area.sets[0]], right = sets[area.sets[1]];
            overlap = circleOverlap(
              left.radius,
              right.radius,
              distance(left, right)
            );
          } else {
            overlap = intersectionArea(getCircles(area.sets));
          }
          var weight = area.hasOwnProperty("weight") ? area.weight : 1;
          output += weight * (overlap - area.size) * (overlap - area.size);
        }
        return output;
      }
      function orientateCircles(circles, orientation, orientationOrder) {
        if (orientationOrder === null) {
          circles.sort(function(a, b) {
            return b.radius - a.radius;
          });
        } else {
          circles.sort(orientationOrder);
        }
        var i;
        if (circles.length > 0) {
          var largestX = circles[0].x, largestY = circles[0].y;
          for (i = 0; i < circles.length; ++i) {
            circles[i].x -= largestX;
            circles[i].y -= largestY;
          }
        }
        if (circles.length == 2) {
          var dist = distance(circles[0], circles[1]);
          if (dist < Math.abs(circles[1].radius - circles[0].radius)) {
            circles[1].x = circles[0].x + circles[0].radius - circles[1].radius - 1e-10;
            circles[1].y = circles[0].y;
          }
        }
        if (circles.length > 1) {
          var rotation = Math.atan2(circles[1].x, circles[1].y) - orientation, c = Math.cos(rotation), s = Math.sin(rotation), x, y;
          for (i = 0; i < circles.length; ++i) {
            x = circles[i].x;
            y = circles[i].y;
            circles[i].x = c * x - s * y;
            circles[i].y = s * x + c * y;
          }
        }
        if (circles.length > 2) {
          var angle = Math.atan2(circles[2].x, circles[2].y) - orientation;
          while (angle < 0) {
            angle += 2 * Math.PI;
          }
          while (angle > 2 * Math.PI) {
            angle -= 2 * Math.PI;
          }
          if (angle > Math.PI) {
            var slope = circles[1].y / (1e-10 + circles[1].x);
            for (i = 0; i < circles.length; ++i) {
              var d = (circles[i].x + slope * circles[i].y) / (1 + slope * slope);
              circles[i].x = 2 * d - circles[i].x;
              circles[i].y = 2 * d * slope - circles[i].y;
            }
          }
        }
      }
      function disjointCluster(circles) {
        circles.map(function(circle) {
          circle.parent = circle;
        });
        function find2(circle) {
          if (circle.parent !== circle) {
            circle.parent = find2(circle.parent);
          }
          return circle.parent;
        }
        function union(x, y) {
          var xRoot = find2(x), yRoot = find2(y);
          xRoot.parent = yRoot;
        }
        for (var i = 0; i < circles.length; ++i) {
          for (var j = i + 1; j < circles.length; ++j) {
            var maxDistance = circles[i].radius + circles[j].radius;
            if (distance(circles[i], circles[j]) + 1e-10 < maxDistance) {
              union(circles[j], circles[i]);
            }
          }
        }
        var disjointClusters = {}, setid;
        for (i = 0; i < circles.length; ++i) {
          setid = find2(circles[i]).parent.setid;
          if (!(setid in disjointClusters)) {
            disjointClusters[setid] = [];
          }
          disjointClusters[setid].push(circles[i]);
        }
        circles.map(function(circle) {
          delete circle.parent;
        });
        var ret = [];
        for (setid in disjointClusters) {
          if (disjointClusters.hasOwnProperty(setid)) {
            ret.push(disjointClusters[setid]);
          }
        }
        return ret;
      }
      function getBoundingBox(circles) {
        var minMax = function(d) {
          var hi = Math.max.apply(null, circles.map(
            function(c) {
              return c[d] + c.radius;
            }
          )), lo = Math.min.apply(null, circles.map(
            function(c) {
              return c[d] - c.radius;
            }
          ));
          return { max: hi, min: lo };
        };
        return { xRange: minMax("x"), yRange: minMax("y") };
      }
      function normalizeSolution(solution, orientation, orientationOrder) {
        if (orientation === null) {
          orientation = Math.PI / 2;
        }
        var circles = [], i, setid;
        for (setid in solution) {
          if (solution.hasOwnProperty(setid)) {
            var previous = solution[setid];
            circles.push({
              x: previous.x,
              y: previous.y,
              radius: previous.radius,
              setid
            });
          }
        }
        var clusters = disjointCluster(circles);
        for (i = 0; i < clusters.length; ++i) {
          orientateCircles(clusters[i], orientation, orientationOrder);
          var bounds = getBoundingBox(clusters[i]);
          clusters[i].size = (bounds.xRange.max - bounds.xRange.min) * (bounds.yRange.max - bounds.yRange.min);
          clusters[i].bounds = bounds;
        }
        clusters.sort(function(a, b) {
          return b.size - a.size;
        });
        circles = clusters[0];
        var returnBounds = circles.bounds;
        var spacing = (returnBounds.xRange.max - returnBounds.xRange.min) / 50;
        function addCluster(cluster, right, bottom) {
          if (!cluster) return;
          var bounds2 = cluster.bounds, xOffset, yOffset, centreing;
          if (right) {
            xOffset = returnBounds.xRange.max - bounds2.xRange.min + spacing;
          } else {
            xOffset = returnBounds.xRange.max - bounds2.xRange.max;
            centreing = (bounds2.xRange.max - bounds2.xRange.min) / 2 - (returnBounds.xRange.max - returnBounds.xRange.min) / 2;
            if (centreing < 0) xOffset += centreing;
          }
          if (bottom) {
            yOffset = returnBounds.yRange.max - bounds2.yRange.min + spacing;
          } else {
            yOffset = returnBounds.yRange.max - bounds2.yRange.max;
            centreing = (bounds2.yRange.max - bounds2.yRange.min) / 2 - (returnBounds.yRange.max - returnBounds.yRange.min) / 2;
            if (centreing < 0) yOffset += centreing;
          }
          for (var j = 0; j < cluster.length; ++j) {
            cluster[j].x += xOffset;
            cluster[j].y += yOffset;
            circles.push(cluster[j]);
          }
        }
        var index = 1;
        while (index < clusters.length) {
          addCluster(clusters[index], true, false);
          addCluster(clusters[index + 1], false, true);
          addCluster(clusters[index + 2], true, true);
          index += 3;
          returnBounds = getBoundingBox(circles);
        }
        var ret = {};
        for (i = 0; i < circles.length; ++i) {
          ret[circles[i].setid] = circles[i];
        }
        return ret;
      }
      function scaleSolution(solution, width, height, padding) {
        var circles = [], setids = [];
        for (var setid in solution) {
          if (solution.hasOwnProperty(setid)) {
            setids.push(setid);
            circles.push(solution[setid]);
          }
        }
        width -= 2 * padding;
        height -= 2 * padding;
        var bounds = getBoundingBox(circles), xRange = bounds.xRange, yRange = bounds.yRange;
        if (xRange.max == xRange.min || yRange.max == yRange.min) {
          console.log("not scaling solution: zero size detected");
          return solution;
        }
        var xScaling = width / (xRange.max - xRange.min), yScaling = height / (yRange.max - yRange.min), scaling = Math.min(yScaling, xScaling), xOffset = (width - (xRange.max - xRange.min) * scaling) / 2, yOffset = (height - (yRange.max - yRange.min) * scaling) / 2;
        var scaled = {};
        for (var i = 0; i < circles.length; ++i) {
          var circle = circles[i];
          scaled[setids[i]] = {
            radius: scaling * circle.radius,
            x: padding + xOffset + (circle.x - xRange.min) * scaling,
            y: padding + yOffset + (circle.y - yRange.min) * scaling
          };
        }
        return scaled;
      }
      function VennDiagram2() {
        var width = 600, height = 350, padding = 15, duration = 1e3, orientation = Math.PI / 2, normalize = true, wrap = true, styled = true, fontSize = null, orientationOrder = null, colourMap = {}, colourScheme = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"], colourIndex = 0, colours = function(key) {
          if (key in colourMap) {
            return colourMap[key];
          }
          var ret = colourMap[key] = colourScheme[colourIndex];
          colourIndex += 1;
          if (colourIndex >= colourScheme.length) {
            colourIndex = 0;
          }
          return ret;
        }, layoutFunction = venn2, loss = lossFunction;
        function chart(selection3) {
          var data = selection3.datum();
          var toremove = {};
          data.forEach(function(datum2) {
            if (datum2.size == 0 && datum2.sets.length == 1) {
              toremove[datum2.sets[0]] = 1;
            }
          });
          data = data.filter(function(datum2) {
            return !datum2.sets.some(function(set5) {
              return set5 in toremove;
            });
          });
          var circles = {};
          var textCentres = {};
          if (data.length > 0) {
            var solution = layoutFunction(data, { lossFunction: loss });
            if (normalize) {
              solution = normalizeSolution(
                solution,
                orientation,
                orientationOrder
              );
            }
            circles = scaleSolution(solution, width, height, padding);
            textCentres = computeTextCentres(circles, data);
          }
          var labels = {};
          data.forEach(function(datum2) {
            if (datum2.label) {
              labels[datum2.sets] = datum2.label;
            }
          });
          function label(d) {
            if (d.sets in labels) {
              return labels[d.sets];
            }
            if (d.sets.length == 1) {
              return "" + d.sets[0];
            }
          }
          selection3.selectAll("svg").data([circles]).enter().append("svg");
          var svg = selection3.select("svg").attr("width", width).attr("height", height);
          var previous = {}, hasPrevious = false;
          svg.selectAll(".venn-area path").each(function(d) {
            var path = d3Selection.select(this).attr("d");
            if (d.sets.length == 1 && path) {
              hasPrevious = true;
              previous[d.sets[0]] = circleFromPath(path);
            }
          });
          var pathTween = function(d) {
            return function(t) {
              var c = d.sets.map(function(set5) {
                var start3 = previous[set5], end = circles[set5];
                if (!start3) {
                  start3 = { x: width / 2, y: height / 2, radius: 1 };
                }
                if (!end) {
                  end = { x: width / 2, y: height / 2, radius: 1 };
                }
                return {
                  "x": start3.x * (1 - t) + end.x * t,
                  "y": start3.y * (1 - t) + end.y * t,
                  "radius": start3.radius * (1 - t) + end.radius * t
                };
              });
              return intersectionAreaPath(c);
            };
          };
          var nodes = svg.selectAll(".venn-area").data(data, function(d) {
            return d.sets;
          });
          var enter = nodes.enter().append("g").attr("class", function(d) {
            return "venn-area venn-" + (d.sets.length == 1 ? "circle" : "intersection");
          }).attr("data-venn-sets", function(d) {
            return d.sets.join("_");
          });
          var enterPath = enter.append("path"), enterText = enter.append("text").attr("class", "label").text(function(d) {
            return label(d);
          }).attr("text-anchor", "middle").attr("dy", ".35em").attr("x", width / 2).attr("y", height / 2);
          if (styled) {
            enterPath.style("fill-opacity", "0").filter(function(d) {
              return d.sets.length == 1;
            }).style("fill", function(d) {
              return colours(d.sets);
            }).style("fill-opacity", ".25");
            enterText.style("fill", function(d) {
              return d.sets.length == 1 ? colours(d.sets) : "#444";
            });
          }
          var update = selection3;
          if (hasPrevious) {
            update = selection3.transition("venn").duration(duration);
            update.selectAll("path").attrTween("d", pathTween);
          } else {
            update.selectAll("path").attr("d", function(d) {
              return intersectionAreaPath(d.sets.map(function(set5) {
                return circles[set5];
              }));
            });
          }
          var updateText = update.selectAll("text").filter(function(d) {
            return d.sets in textCentres;
          }).text(function(d) {
            return label(d);
          }).attr("x", function(d) {
            return Math.floor(textCentres[d.sets].x);
          }).attr("y", function(d) {
            return Math.floor(textCentres[d.sets].y);
          });
          if (wrap) {
            if (hasPrevious) {
              if ("on" in updateText) {
                updateText.on("end", wrapText(circles, label));
              } else {
                updateText.each("end", wrapText(circles, label));
              }
            } else {
              updateText.each(wrapText(circles, label));
            }
          }
          var exit = nodes.exit().transition("venn").duration(duration).remove();
          exit.selectAll("path").attrTween("d", pathTween);
          var exitText = exit.selectAll("text").attr("x", width / 2).attr("y", height / 2);
          if (fontSize !== null) {
            enterText.style("font-size", "0px");
            updateText.style("font-size", fontSize);
            exitText.style("font-size", "0px");
          }
          return {
            "circles": circles,
            "textCentres": textCentres,
            "nodes": nodes,
            "enter": enter,
            "update": update,
            "exit": exit
          };
        }
        chart.wrap = function(_) {
          if (!arguments.length) return wrap;
          wrap = _;
          return chart;
        };
        chart.width = function(_) {
          if (!arguments.length) return width;
          width = _;
          return chart;
        };
        chart.height = function(_) {
          if (!arguments.length) return height;
          height = _;
          return chart;
        };
        chart.padding = function(_) {
          if (!arguments.length) return padding;
          padding = _;
          return chart;
        };
        chart.colours = function(_) {
          if (!arguments.length) return colours;
          colours = _;
          return chart;
        };
        chart.fontSize = function(_) {
          if (!arguments.length) return fontSize;
          fontSize = _;
          return chart;
        };
        chart.duration = function(_) {
          if (!arguments.length) return duration;
          duration = _;
          return chart;
        };
        chart.layoutFunction = function(_) {
          if (!arguments.length) return layoutFunction;
          layoutFunction = _;
          return chart;
        };
        chart.normalize = function(_) {
          if (!arguments.length) return normalize;
          normalize = _;
          return chart;
        };
        chart.styled = function(_) {
          if (!arguments.length) return styled;
          styled = _;
          return chart;
        };
        chart.orientation = function(_) {
          if (!arguments.length) return orientation;
          orientation = _;
          return chart;
        };
        chart.orientationOrder = function(_) {
          if (!arguments.length) return orientationOrder;
          orientationOrder = _;
          return chart;
        };
        chart.lossFunction = function(_) {
          if (!arguments.length) return loss;
          loss = _;
          return chart;
        };
        return chart;
      }
      function wrapText(circles, labeller) {
        return function() {
          var text = d3Selection.select(this), data = text.datum(), width = circles[data.sets[0]].radius || 50, label = labeller(data) || "";
          var words = label.split(/\s+/).reverse(), maxLines = 3, minChars = (label.length + words.length) / maxLines, word = words.pop(), line = [word], joined, lineNumber = 0, lineHeight = 1.1, tspan = text.text(null).append("tspan").text(word);
          while (true) {
            word = words.pop();
            if (!word) break;
            line.push(word);
            joined = line.join(" ");
            tspan.text(joined);
            if (joined.length > minChars && tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").text(word);
              lineNumber++;
            }
          }
          var initial = 0.35 - lineNumber * lineHeight / 2, x = text.attr("x"), y = text.attr("y");
          text.selectAll("tspan").attr("x", x).attr("y", y).attr("dy", function(d, i) {
            return initial + i * lineHeight + "em";
          });
        };
      }
      function circleMargin(current, interior, exterior) {
        var margin = interior[0].radius - distance(interior[0], current), i, m;
        for (i = 1; i < interior.length; ++i) {
          m = interior[i].radius - distance(interior[i], current);
          if (m <= margin) {
            margin = m;
          }
        }
        for (i = 0; i < exterior.length; ++i) {
          m = distance(exterior[i], current) - exterior[i].radius;
          if (m <= margin) {
            margin = m;
          }
        }
        return margin;
      }
      function computeTextCentre(interior, exterior) {
        var points = [], i;
        for (i = 0; i < interior.length; ++i) {
          var c = interior[i];
          points.push({ x: c.x, y: c.y });
          points.push({ x: c.x + c.radius / 2, y: c.y });
          points.push({ x: c.x - c.radius / 2, y: c.y });
          points.push({ x: c.x, y: c.y + c.radius / 2 });
          points.push({ x: c.x, y: c.y - c.radius / 2 });
        }
        var initial = points[0], margin = circleMargin(points[0], interior, exterior);
        for (i = 1; i < points.length; ++i) {
          var m = circleMargin(points[i], interior, exterior);
          if (m >= margin) {
            initial = points[i];
            margin = m;
          }
        }
        var solution = nelderMead(
          function(p) {
            return -1 * circleMargin({ x: p[0], y: p[1] }, interior, exterior);
          },
          [initial.x, initial.y],
          { maxIterations: 500, minErrorDelta: 1e-10 }
        ).x;
        var ret = { x: solution[0], y: solution[1] };
        var valid = true;
        for (i = 0; i < interior.length; ++i) {
          if (distance(ret, interior[i]) > interior[i].radius) {
            valid = false;
            break;
          }
        }
        for (i = 0; i < exterior.length; ++i) {
          if (distance(ret, exterior[i]) < exterior[i].radius) {
            valid = false;
            break;
          }
        }
        if (!valid) {
          if (interior.length == 1) {
            ret = { x: interior[0].x, y: interior[0].y };
          } else {
            var areaStats = {};
            intersectionArea(interior, areaStats);
            if (areaStats.arcs.length === 0) {
              ret = { "x": 0, "y": -1e3, disjoint: true };
            } else if (areaStats.arcs.length == 1) {
              ret = {
                "x": areaStats.arcs[0].circle.x,
                "y": areaStats.arcs[0].circle.y
              };
            } else if (exterior.length) {
              ret = computeTextCentre(interior, []);
            } else {
              ret = getCenter(areaStats.arcs.map(function(a) {
                return a.p1;
              }));
            }
          }
        }
        return ret;
      }
      function getOverlappingCircles(circles) {
        var ret = {}, circleids = [];
        for (var circleid in circles) {
          circleids.push(circleid);
          ret[circleid] = [];
        }
        for (var i = 0; i < circleids.length; i++) {
          var a = circles[circleids[i]];
          for (var j = i + 1; j < circleids.length; ++j) {
            var b = circles[circleids[j]], d = distance(a, b);
            if (d + b.radius <= a.radius + 1e-10) {
              ret[circleids[j]].push(circleids[i]);
            } else if (d + a.radius <= b.radius + 1e-10) {
              ret[circleids[i]].push(circleids[j]);
            }
          }
        }
        return ret;
      }
      function computeTextCentres(circles, areas) {
        var ret = {}, overlapped = getOverlappingCircles(circles);
        for (var i = 0; i < areas.length; ++i) {
          var area = areas[i].sets, areaids = {}, exclude = {};
          for (var j = 0; j < area.length; ++j) {
            areaids[area[j]] = true;
            var overlaps = overlapped[area[j]];
            for (var k = 0; k < overlaps.length; ++k) {
              exclude[overlaps[k]] = true;
            }
          }
          var interior = [], exterior = [];
          for (var setid in circles) {
            if (setid in areaids) {
              interior.push(circles[setid]);
            } else if (!(setid in exclude)) {
              exterior.push(circles[setid]);
            }
          }
          var centre = computeTextCentre(interior, exterior);
          ret[area] = centre;
          if (centre.disjoint && areas[i].size > 0) {
            console.log("WARNING: area " + area + " not represented on screen");
          }
        }
        return ret;
      }
      function sortAreas(div, relativeTo) {
        var overlaps = getOverlappingCircles(div.selectAll("svg").datum());
        var exclude = {};
        for (var i = 0; i < relativeTo.sets.length; ++i) {
          var check = relativeTo.sets[i];
          for (var setid in overlaps) {
            var overlap = overlaps[setid];
            for (var j = 0; j < overlap.length; ++j) {
              if (overlap[j] == check) {
                exclude[setid] = true;
                break;
              }
            }
          }
        }
        function shouldExclude(sets) {
          for (var i2 = 0; i2 < sets.length; ++i2) {
            if (!(sets[i2] in exclude)) {
              return false;
            }
          }
          return true;
        }
        div.selectAll("g").sort(function(a, b) {
          if (a.sets.length != b.sets.length) {
            return a.sets.length - b.sets.length;
          }
          if (a == relativeTo) {
            return shouldExclude(b.sets) ? -1 : 1;
          }
          if (b == relativeTo) {
            return shouldExclude(a.sets) ? 1 : -1;
          }
          return b.size - a.size;
        });
      }
      function circlePath(x, y, r) {
        var ret = [];
        ret.push("\nM", x, y);
        ret.push("\nm", -r, 0);
        ret.push("\na", r, r, 0, 1, 0, r * 2, 0);
        ret.push("\na", r, r, 0, 1, 0, -r * 2, 0);
        return ret.join(" ");
      }
      function circleFromPath(path) {
        var tokens = path.split(" ");
        return {
          "x": parseFloat(tokens[1]),
          "y": parseFloat(tokens[2]),
          "radius": -parseFloat(tokens[4])
        };
      }
      function intersectionAreaPath(circles) {
        var stats = {};
        intersectionArea(circles, stats);
        var arcs = stats.arcs;
        if (arcs.length === 0) {
          return "M 0 0";
        } else if (arcs.length == 1) {
          var circle = arcs[0].circle;
          return circlePath(circle.x, circle.y, circle.radius);
        } else {
          var ret = ["\nM", arcs[0].p2.x, arcs[0].p2.y];
          for (var i = 0; i < arcs.length; ++i) {
            var arc = arcs[i], r = arc.circle.radius, wide = arc.width > r;
            ret.push(
              "\nA",
              r,
              r,
              0,
              wide ? 1 : 0,
              1,
              arc.p1.x,
              arc.p1.y
            );
          }
          return ret.join(" ");
        }
      }
      exports2.intersectionArea = intersectionArea;
      exports2.circleCircleIntersection = circleCircleIntersection;
      exports2.circleOverlap = circleOverlap;
      exports2.circleArea = circleArea;
      exports2.distance = distance;
      exports2.venn = venn2;
      exports2.greedyLayout = greedyLayout;
      exports2.scaleSolution = scaleSolution;
      exports2.normalizeSolution = normalizeSolution;
      exports2.bestInitialLayout = bestInitialLayout;
      exports2.lossFunction = lossFunction;
      exports2.disjointCluster = disjointCluster;
      exports2.distanceFromIntersectArea = distanceFromIntersectArea;
      exports2.VennDiagram = VennDiagram2;
      exports2.wrapText = wrapText;
      exports2.computeTextCentres = computeTextCentres;
      exports2.computeTextCentre = computeTextCentre;
      exports2.sortAreas = sortAreas;
      exports2.circlePath = circlePath;
      exports2.circleFromPath = circleFromPath;
      exports2.intersectionAreaPath = intersectionAreaPath;
      Object.defineProperty(exports2, "__esModule", { value: true });
    }));
  }
});

// src/app/analysis/analysis.page.ts
init_tslib_es6();

// angular:jit:template:src/app/analysis/analysis.page.html
var analysis_page_default = `<!--
(C) Copyright 2015\u20132022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the
terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License
along with vodle. If not, see <https://www.gnu.org/licenses/>.
-->

<ion-header>

  <ion-item class="ion-no-margin ion-no-padding" style="--inner-padding-end:0px!important">
    <ion-toolbar style="padding-left: 16px;">

      <!--<ion-icon slot="start" name="analytics-outline"></ion-icon>&nbsp;-->
      <ion-text
        style="font-weight: bold; font-size: larger;"
        [innerHtml]="'analysis.-page-title' | translate">
      </ion-text>
      <ion-buttons slot="end">

        <!-- OFFLINE SIGN -- >
        <ng-container *ngIf="!window.navigator.onLine">
          <ion-icon name="cloud-offline-outline" color="grey"
            style="position: relative; bottom: -1px;">
          </ion-icon>
          <ion-icon name="alert-outline" color="grey">
          </ion-icon>
        </ng-container>
        <!---->

        <!-- SYNCING SIGN: -- >
        <ion-spinner *ngIf="!!P.p && P.p.syncing && window.navigator.onLine" name="crescent" color="grey"></ion-spinner>
        <!---->

        <!-- CLOSE BUTTON: -->
        <ion-button fill="clear" (click)="close()">
          <ion-icon slot="icon-only" name="close-outline"></ion-icon>
        </ion-button>

      </ion-buttons>
    </ion-toolbar>
  </ion-item>

</ion-header>

<!-- SCROLLABLE CONTENT: -->

@if (P.ready) {
  <ion-content>
    <div id="venn"></div>
    <ion-item class="ion-no-margin" lines="none">
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-no-padding ion-no-margin">
          <ion-col class="ion-no-padding ion-no-margin">
            <p>
            <span [innerHtml]="(P.p.T.n_not_abstaining > 100 
                                ? 'analysis.each-dot-percent' 
                                : 'analysis.each-dot-participant')|translate">
              </span>
              <!--
              <span [innerHtml]="'analysis.'|translate"></span>
              -->
              @if (!P.p.am_abstaining) {
                <span [innerHtml]="' '+('analysis.yellow-dot'|translate)"></span>
              }
            </p>
            <p [innerHtml]="'analysis.discs'|translate">
            </p>
            @if (!P.p.am_abstaining) {
              <small>
                <p>
                  <span [innerHtml]="'analysis.colors-before-red'|translate"></span>
                  <span style="color:var(--vodle-red)"><b [innerHtml]="'analysis.colors-red'|translate"></b></span>
                  <span [innerHtml]="'analysis.colors-between-red-and-blue'|translate"></span>
                  <span style="color:var(--vodle-blue)"><b [innerHtml]="'analysis.colors-blue'|translate"></b></span>
                  <span [innerHtml]="'analysis.colors-between-blue-and-green'|translate"></span>
                  <span style="color:var(--vodle-green)"><b [innerHtml]="'analysis.colors-green'|translate"></b></span>
                  <span [innerHtml]="'analysis.colors-after-green'|translate"></span>
                  <span [innerHtml]="'analysis.colors-before-dark-green'|translate"></span>
                  <span style="color:var(--vodle-darkgreen)"><b [innerHtml]="'analysis.colors-dark-green'|translate"></b></span>
                  <span [innerHtml]="'analysis.colors-after-dark-green'|translate"></span>
                </p></small>
              }
              <p [innerHtml]="'analysis.suggestion-general'|translate">
              </p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
    </ion-content>
  }
`;

// angular:jit:style:src/app/analysis/analysis.page.scss
var analysis_page_default2 = '@charset "UTF-8";\n\n/* src/app/analysis/analysis.page.scss */\n/*# sourceMappingURL=analysis.page.css.map */\n';

// src/app/analysis/analysis.page.ts
init_core();
init_lazy();
init_ngx_translate_core();
var venn = __toESM(require_venn());

// node_modules/d3-dispatch/src/dispatch.js
var noop2 = { value: () => {
} };
function dispatch2() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch2(_);
}
function Dispatch2(_) {
  this._ = _;
}
function parseTypenames3(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch2.prototype = dispatch2.prototype = {
  constructor: Dispatch2,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames3(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get3(_[t], typename.name))) return t;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set3(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set3(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch2(copy);
  },
  call: function(type2, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (var t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get3(type2, name) {
  for (var i = 0, n = type2.length, c; i < n; ++i) {
    if ((c = type2[i]).name === name) {
      return c.value;
    }
  }
}
function set3(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop2, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null) type2.push({ name, value: callback });
  return type2;
}
var dispatch_default3 = dispatch2;

// node_modules/d3-selection/src/namespaces.js
var xhtml2 = "http://www.w3.org/1999/xhtml";
var namespaces_default2 = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml2,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/d3-selection/src/namespace.js
function namespace_default2(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces_default2.hasOwnProperty(prefix) ? { space: namespaces_default2[prefix], local: name } : name;
}

// node_modules/d3-selection/src/creator.js
function creatorInherit2(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml2 && document2.documentElement.namespaceURI === xhtml2 ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed2(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default2(name) {
  var fullname = namespace_default2(name);
  return (fullname.local ? creatorFixed2 : creatorInherit2)(fullname);
}

// node_modules/d3-selection/src/selector.js
function none2() {
}
function selector_default2(selector) {
  return selector == null ? none2 : function() {
    return this.querySelector(selector);
  };
}

// node_modules/d3-selection/src/selection/select.js
function select_default4(select) {
  if (typeof select !== "function") select = selector_default2(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection3(subgroups, this._parents);
}

// node_modules/d3-selection/src/array.js
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

// node_modules/d3-selection/src/selectorAll.js
function empty2() {
  return [];
}
function selectorAll_default2(selector) {
  return selector == null ? empty2 : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}
function selectAll_default4(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll_default2(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection3(subgroups, parents);
}

// node_modules/d3-selection/src/matcher.js
function matcher_default2(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

// node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/filter.js
function filter_default3(match) {
  if (typeof match !== "function") match = matcher_default2(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection3(subgroups, this._parents);
}

// node_modules/d3-selection/src/selection/sparse.js
function sparse_default2(update) {
  return new Array(update.length);
}

// node_modules/d3-selection/src/selection/enter.js
function enter_default2() {
  return new Selection3(this._enter || this._groups.map(sparse_default2), this._parents);
}
function EnterNode2(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode2.prototype = {
  constructor: EnterNode2,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

// node_modules/d3-selection/src/constant.js
function constant_default3(x) {
  return function() {
    return x;
  };
}

// node_modules/d3-selection/src/selection/data.js
function bindIndex2(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode2(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey2(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode2(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default2(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey2 : bindIndex2, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = constant_default3(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection3(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}

// node_modules/d3-selection/src/selection/exit.js
function exit_default2() {
  return new Selection3(this._exit || this._groups.map(sparse_default2), this._parents);
}

// node_modules/d3-selection/src/selection/join.js
function join_default2(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/d3-selection/src/selection/merge.js
function merge_default3(context) {
  var selection3 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection3._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection3(merges, this._parents);
}

// node_modules/d3-selection/src/selection/order.js
function order_default2() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/sort.js
function sort_default2(compare) {
  if (!compare) compare = ascending2;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection3(sortgroups, this._parents).order();
}
function ascending2(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3-selection/src/selection/call.js
function call_default2() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/d3-selection/src/selection/nodes.js
function nodes_default2() {
  return Array.from(this);
}

// node_modules/d3-selection/src/selection/node.js
function node_default2() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}

// node_modules/d3-selection/src/selection/size.js
function size_default2() {
  let size = 0;
  for (const node of this) ++size;
  return size;
}

// node_modules/d3-selection/src/selection/empty.js
function empty_default2() {
  return !this.node();
}

// node_modules/d3-selection/src/selection/each.js
function each_default2(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/attr.js
function attrRemove3(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS3(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant3(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS3(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction3(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}
function attrFunctionNS3(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default3(name, value) {
  var fullname = namespace_default2(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS3 : attrRemove3 : typeof value === "function" ? fullname.local ? attrFunctionNS3 : attrFunction3 : fullname.local ? attrConstantNS3 : attrConstant3)(fullname, value));
}

// node_modules/d3-selection/src/window.js
function window_default2(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/d3-selection/src/selection/style.js
function styleRemove3(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant3(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction3(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}
function style_default3(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove3 : typeof value === "function" ? styleFunction3 : styleConstant3)(name, value, priority == null ? "" : priority)) : styleValue2(this.node(), name);
}
function styleValue2(node, name) {
  return node.style.getPropertyValue(name) || window_default2(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/d3-selection/src/selection/property.js
function propertyRemove2(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant2(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction2(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}
function property_default2(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove2 : typeof value === "function" ? propertyFunction2 : propertyConstant2)(name, value)) : this.node()[name];
}

// node_modules/d3-selection/src/selection/classed.js
function classArray2(string) {
  return string.trim().split(/^|\s+/);
}
function classList2(node) {
  return node.classList || new ClassList2(node);
}
function ClassList2(node) {
  this._node = node;
  this._names = classArray2(node.getAttribute("class") || "");
}
ClassList2.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd2(node, names) {
  var list = classList2(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove2(node, names) {
  var list = classList2(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue2(names) {
  return function() {
    classedAdd2(this, names);
  };
}
function classedFalse2(names) {
  return function() {
    classedRemove2(this, names);
  };
}
function classedFunction2(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd2 : classedRemove2)(this, names);
  };
}
function classed_default2(name, value) {
  var names = classArray2(name + "");
  if (arguments.length < 2) {
    var list = classList2(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction2 : value ? classedTrue2 : classedFalse2)(names, value));
}

// node_modules/d3-selection/src/selection/text.js
function textRemove2() {
  this.textContent = "";
}
function textConstant3(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction3(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default3(value) {
  return arguments.length ? this.each(value == null ? textRemove2 : (typeof value === "function" ? textFunction3 : textConstant3)(value)) : this.node().textContent;
}

// node_modules/d3-selection/src/selection/html.js
function htmlRemove2() {
  this.innerHTML = "";
}
function htmlConstant2(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction2(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default2(value) {
  return arguments.length ? this.each(value == null ? htmlRemove2 : (typeof value === "function" ? htmlFunction2 : htmlConstant2)(value)) : this.node().innerHTML;
}

// node_modules/d3-selection/src/selection/raise.js
function raise2() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default2() {
  return this.each(raise2);
}

// node_modules/d3-selection/src/selection/lower.js
function lower2() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default2() {
  return this.each(lower2);
}

// node_modules/d3-selection/src/selection/append.js
function append_default2(name) {
  var create3 = typeof name === "function" ? name : creator_default2(name);
  return this.select(function() {
    return this.appendChild(create3.apply(this, arguments));
  });
}

// node_modules/d3-selection/src/selection/insert.js
function constantNull2() {
  return null;
}
function insert_default2(name, before) {
  var create3 = typeof name === "function" ? name : creator_default2(name), select = before == null ? constantNull2 : typeof before === "function" ? before : selector_default2(before);
  return this.select(function() {
    return this.insertBefore(create3.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/d3-selection/src/selection/remove.js
function remove2() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function remove_default3() {
  return this.each(remove2);
}

// node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow2() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep2() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default2(deep) {
  return this.select(deep ? selection_cloneDeep2 : selection_cloneShallow2);
}

// node_modules/d3-selection/src/selection/datum.js
function datum_default2(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/d3-selection/src/selection/on.js
function contextListener2(listener) {
  return function(event2) {
    listener.call(this, event2, this.__data__);
  };
}
function parseTypenames4(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove2(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}
function onAdd2(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener2(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on) this.__on = [o];
    else on.push(o);
  };
}
function on_default3(typename, value, options) {
  var typenames = parseTypenames4(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd2 : onRemove2;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

// node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent2(node, type2, params) {
  var window2 = window_default2(node), event2 = window2.CustomEvent;
  if (typeof event2 === "function") {
    event2 = new event2(type2, params);
  } else {
    event2 = window2.document.createEvent("Event");
    if (params) event2.initEvent(type2, params.bubbles, params.cancelable), event2.detail = params.detail;
    else event2.initEvent(type2, false, false);
  }
  node.dispatchEvent(event2);
}
function dispatchConstant2(type2, params) {
  return function() {
    return dispatchEvent2(this, type2, params);
  };
}
function dispatchFunction2(type2, params) {
  return function() {
    return dispatchEvent2(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default4(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction2 : dispatchConstant2)(type2, params));
}

// node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

// node_modules/d3-selection/src/selection/index.js
var root3 = [null];
function Selection3(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection2() {
  return new Selection3([[document.documentElement]], root3);
}
function selection_selection() {
  return this;
}
Selection3.prototype = selection2.prototype = {
  constructor: Selection3,
  select: select_default4,
  selectAll: selectAll_default4,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default3,
  data: data_default2,
  enter: enter_default2,
  exit: exit_default2,
  join: join_default2,
  merge: merge_default3,
  selection: selection_selection,
  order: order_default2,
  sort: sort_default2,
  call: call_default2,
  nodes: nodes_default2,
  node: node_default2,
  size: size_default2,
  empty: empty_default2,
  each: each_default2,
  attr: attr_default3,
  style: style_default3,
  property: property_default2,
  classed: classed_default2,
  text: text_default3,
  html: html_default2,
  raise: raise_default2,
  lower: lower_default2,
  append: append_default2,
  insert: insert_default2,
  remove: remove_default3,
  clone: clone_default2,
  datum: datum_default2,
  on: on_default3,
  dispatch: dispatch_default4,
  [Symbol.iterator]: iterator_default
};
var selection_default3 = selection2;

// node_modules/d3-selection/src/select.js
function select_default5(selector) {
  return typeof selector === "string" ? new Selection3([[document.querySelector(selector)]], [document.documentElement]) : new Selection3([[selector]], root3);
}

// node_modules/d3-selection/src/selectAll.js
function selectAll_default5(selector) {
  return typeof selector === "string" ? new Selection3([document.querySelectorAll(selector)], [document.documentElement]) : new Selection3([array(selector)], root3);
}

// node_modules/d3-color/src/define.js
function define_default2(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend2(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color2() {
}
var darker2 = 0.7;
var brighter2 = 1 / darker2;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger2 = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent2 = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger2 = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent2 = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent2 = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent2 = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named2 = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default2(Color2, color2, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert2(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color2(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn2(m) : l === 3 ? new Rgb2(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba2(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba2(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger2.exec(format)) ? new Rgb2(m[1], m[2], m[3], 1) : (m = reRgbPercent2.exec(format)) ? new Rgb2(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger2.exec(format)) ? rgba2(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent2.exec(format)) ? rgba2(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent2.exec(format)) ? hsla2(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent2.exec(format)) ? hsla2(m[1], m[2] / 100, m[3] / 100, m[4]) : named2.hasOwnProperty(format) ? rgbn2(named2[format]) : format === "transparent" ? new Rgb2(NaN, NaN, NaN, 0) : null;
}
function rgbn2(n) {
  return new Rgb2(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba2(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb2(r, g, b, a);
}
function rgbConvert2(o) {
  if (!(o instanceof Color2)) o = color2(o);
  if (!o) return new Rgb2();
  o = o.rgb();
  return new Rgb2(o.r, o.g, o.b, o.opacity);
}
function rgb2(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert2(r) : new Rgb2(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb2(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default2(Rgb2, rgb2, extend2(Color2, {
  brighter(k) {
    k = k == null ? brighter2 : Math.pow(brighter2, k);
    return new Rgb2(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker2 : Math.pow(darker2, k);
    return new Rgb2(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb2(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla2(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl2(h, s, l, a);
}
function hslConvert2(o) {
  if (o instanceof Hsl2) return new Hsl2(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color2)) o = color2(o);
  if (!o) return new Hsl2();
  if (o instanceof Hsl2) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
  if (s) {
    if (r === max2) h = (g - b) / s + (g < b) * 6;
    else if (g === max2) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl2(h, s, l, o.opacity);
}
function hsl2(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert2(h) : new Hsl2(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl2(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default2(Hsl2, hsl2, extend2(Color2, {
  brighter(k) {
    k = k == null ? brighter2 : Math.pow(brighter2, k);
    return new Hsl2(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker2 : Math.pow(darker2, k);
    return new Hsl2(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb2(
      hsl2rgb2(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb2(h, m1, m2),
      hsl2rgb2(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl2(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb2(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-interpolate/src/basis.js
function basis2(t12, v0, v1, v2, v3) {
  var t22 = t12 * t12, t32 = t22 * t12;
  return ((1 - 3 * t12 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t12 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default2(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis2((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default2(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis2((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default4 = (x) => () => x;

// node_modules/d3-interpolate/src/color.js
function linear2(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential2(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function gamma2(y) {
  return (y = +y) === 1 ? nogamma2 : function(a, b) {
    return b - a ? exponential2(a, b, y) : constant_default4(isNaN(a) ? b : a);
  };
}
function nogamma2(a, b) {
  var d = b - a;
  return d ? linear2(a, d) : constant_default4(isNaN(a) ? b : a);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default2 = (function rgbGamma2(y) {
  var color3 = gamma2(y);
  function rgb3(start3, end) {
    var r = color3((start3 = rgb2(start3)).r, (end = rgb2(end)).r), g = color3(start3.g, end.g), b = color3(start3.b, end.b), opacity = nogamma2(start3.opacity, end.opacity);
    return function(t) {
      start3.r = r(t);
      start3.g = g(t);
      start3.b = b(t);
      start3.opacity = opacity(t);
      return start3 + "";
    };
  }
  rgb3.gamma = rgbGamma2;
  return rgb3;
})(1);
function rgbSpline2(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color3;
    for (i = 0; i < n; ++i) {
      color3 = rgb2(colors[i]);
      r[i] = color3.r || 0;
      g[i] = color3.g || 0;
      b[i] = color3.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color3.opacity = 1;
    return function(t) {
      color3.r = r(t);
      color3.g = g(t);
      color3.b = b(t);
      return color3 + "";
    };
  };
}
var rgbBasis2 = rgbSpline2(basis_default2);
var rgbBasisClosed2 = rgbSpline2(basisClosed_default2);

// node_modules/d3-interpolate/src/number.js
function number_default2(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA2 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB2 = new RegExp(reA2.source, "g");
function zero2(b) {
  return function() {
    return b;
  };
}
function one2(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default2(a, b) {
  var bi = reA2.lastIndex = reB2.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA2.exec(a)) && (bm = reB2.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default2(am, bm) });
    }
    bi = reB2.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one2(q[0].x) : zero2(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/transform/decompose.js
var degrees2 = 180 / Math.PI;
var identity2 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default2(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees2,
    skewX: Math.atan(skewX) * degrees2,
    scaleX,
    scaleY
  };
}

// node_modules/d3-interpolate/src/transform/parse.js
var svgNode2;
function parseCss2(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity2 : decompose_default2(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg2(value) {
  if (value == null) return identity2;
  if (!svgNode2) svgNode2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode2.setAttribute("transform", value);
  if (!(value = svgNode2.transform.baseVal.consolidate())) return identity2;
  value = value.matrix;
  return decompose_default2(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform2(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default2(xa, xb) }, { i: i - 2, x: number_default2(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default2(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default2(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default2(xa, xb) }, { i: i - 2, x: number_default2(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss2 = interpolateTransform2(parseCss2, "px, ", "px)", "deg)");
var interpolateTransformSvg2 = interpolateTransform2(parseSvg2, ", ", ")", ")");

// node_modules/d3-timer/src/timer.js
var frame2 = 0;
var timeout2 = 0;
var interval2 = 0;
var pokeDelay2 = 1e3;
var taskHead2;
var taskTail2;
var clockLast2 = 0;
var clockNow2 = 0;
var clockSkew2 = 0;
var clock2 = typeof performance === "object" && performance.now ? performance : Date;
var setFrame2 = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now2() {
  return clockNow2 || (setFrame2(clearNow2), clockNow2 = clock2.now() + clockSkew2);
}
function clearNow2() {
  clockNow2 = 0;
}
function Timer2() {
  this._call = this._time = this._next = null;
}
Timer2.prototype = timer2.prototype = {
  constructor: Timer2,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now2() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail2 !== this) {
      if (taskTail2) taskTail2._next = this;
      else taskHead2 = this;
      taskTail2 = this;
    }
    this._call = callback;
    this._time = time;
    sleep2();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep2();
    }
  }
};
function timer2(callback, delay, time) {
  var t = new Timer2();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush2() {
  now2();
  ++frame2;
  var t = taskHead2, e;
  while (t) {
    if ((e = clockNow2 - t._time) >= 0) t._call.call(void 0, e);
    t = t._next;
  }
  --frame2;
}
function wake2() {
  clockNow2 = (clockLast2 = clock2.now()) + clockSkew2;
  frame2 = timeout2 = 0;
  try {
    timerFlush2();
  } finally {
    frame2 = 0;
    nap2();
    clockNow2 = 0;
  }
}
function poke2() {
  var now3 = clock2.now(), delay = now3 - clockLast2;
  if (delay > pokeDelay2) clockSkew2 -= delay, clockLast2 = now3;
}
function nap2() {
  var t02, t12 = taskHead2, t22, time = Infinity;
  while (t12) {
    if (t12._call) {
      if (time > t12._time) time = t12._time;
      t02 = t12, t12 = t12._next;
    } else {
      t22 = t12._next, t12._next = null;
      t12 = t02 ? t02._next = t22 : taskHead2 = t22;
    }
  }
  taskTail2 = t02;
  sleep2(time);
}
function sleep2(time) {
  if (frame2) return;
  if (timeout2) timeout2 = clearTimeout(timeout2);
  var delay = time - clockNow2;
  if (delay > 24) {
    if (time < Infinity) timeout2 = setTimeout(wake2, time - clock2.now() - clockSkew2);
    if (interval2) interval2 = clearInterval(interval2);
  } else {
    if (!interval2) clockLast2 = clock2.now(), interval2 = setInterval(poke2, pokeDelay2);
    frame2 = 1, setFrame2(wake2);
  }
}

// node_modules/d3-timer/src/timeout.js
function timeout_default2(callback, delay, time) {
  var t = new Timer2();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

// node_modules/d3-transition/src/transition/schedule.js
var emptyOn2 = dispatch_default3("start", "end", "cancel", "interrupt");
var emptyTween2 = [];
var CREATED2 = 0;
var SCHEDULED2 = 1;
var STARTING2 = 2;
var STARTED2 = 3;
var RUNNING2 = 4;
var ENDING2 = 5;
var ENDED2 = 6;
function schedule_default2(node, name, id3, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id3 in schedules) return;
  create2(node, id3, {
    name,
    index,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn2,
    tween: emptyTween2,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED2
  });
}
function init2(node, id3) {
  var schedule = get4(node, id3);
  if (schedule.state > CREATED2) throw new Error("too late; already scheduled");
  return schedule;
}
function set4(node, id3) {
  var schedule = get4(node, id3);
  if (schedule.state > STARTED2) throw new Error("too late; already running");
  return schedule;
}
function get4(node, id3) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id3])) throw new Error("transition not found");
  return schedule;
}
function create2(node, id3, self) {
  var schedules = node.__transition, tween;
  schedules[id3] = self;
  self.timer = timer2(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED2;
    self.timer.restart(start3, self.delay, self.time);
    if (self.delay <= elapsed) start3(elapsed - self.delay);
  }
  function start3(elapsed) {
    var i, j, n, o;
    if (self.state !== SCHEDULED2) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;
      if (o.state === STARTED2) return timeout_default2(start3);
      if (o.state === RUNNING2) {
        o.state = ENDED2;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id3) {
        o.state = ENDED2;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default2(function() {
      if (self.state === STARTED2) {
        self.state = RUNNING2;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING2;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING2) return;
    self.state = STARTED2;
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING2, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING2) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED2;
    self.timer.stop();
    delete schedules[id3];
    for (var i in schedules) return;
    delete node.__transition;
  }
}

// node_modules/d3-transition/src/interrupt.js
function interrupt_default3(node, name) {
  var schedules = node.__transition, schedule, active, empty3 = true, i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty3 = false;
      continue;
    }
    active = schedule.state > STARTING2 && schedule.state < ENDING2;
    schedule.state = ENDED2;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty3) delete node.__transition;
}

// node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default4(name) {
  return this.each(function() {
    interrupt_default3(this, name);
  });
}

// node_modules/d3-transition/src/transition/tween.js
function tweenRemove2(id3, name) {
  var tween0, tween1;
  return function() {
    var schedule = set4(this, id3), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction2(id3, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule = set4(this, id3), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default2(name, value) {
  var id3 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get4(this.node(), id3).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove2 : tweenFunction2)(id3, name, value));
}
function tweenValue2(transition3, name, value) {
  var id3 = transition3._id;
  transition3.each(function() {
    var schedule = set4(this, id3);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get4(node, id3).value[name];
  };
}

// node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default2(a, b) {
  var c;
  return (typeof b === "number" ? number_default2 : b instanceof color2 ? rgb_default2 : (c = color2(b)) ? (b = c, rgb_default2) : string_default2)(a, b);
}

// node_modules/d3-transition/src/transition/attr.js
function attrRemove4(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS4(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant4(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS4(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction4(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS4(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default4(name, value) {
  var fullname = namespace_default2(name), i = fullname === "transform" ? interpolateTransformSvg2 : interpolate_default2;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS4 : attrFunction4)(fullname, i, tweenValue2(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS4 : attrRemove4)(fullname) : (fullname.local ? attrConstantNS4 : attrConstant4)(fullname, i, value));
}

// node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate2(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS2(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS2(fullname, value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t02 = (i0 = i) && attrInterpolateNS2(fullname, i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function attrTween2(name, value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t02 = (i0 = i) && attrInterpolate2(name, i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function attrTween_default2(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace_default2(name);
  return this.tween(key, (fullname.local ? attrTweenNS2 : attrTween2)(fullname, value));
}

// node_modules/d3-transition/src/transition/delay.js
function delayFunction2(id3, value) {
  return function() {
    init2(this, id3).delay = +value.apply(this, arguments);
  };
}
function delayConstant2(id3, value) {
  return value = +value, function() {
    init2(this, id3).delay = value;
  };
}
function delay_default2(value) {
  var id3 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction2 : delayConstant2)(id3, value)) : get4(this.node(), id3).delay;
}

// node_modules/d3-transition/src/transition/duration.js
function durationFunction2(id3, value) {
  return function() {
    set4(this, id3).duration = +value.apply(this, arguments);
  };
}
function durationConstant2(id3, value) {
  return value = +value, function() {
    set4(this, id3).duration = value;
  };
}
function duration_default2(value) {
  var id3 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction2 : durationConstant2)(id3, value)) : get4(this.node(), id3).duration;
}

// node_modules/d3-transition/src/transition/ease.js
function easeConstant2(id3, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set4(this, id3).ease = value;
  };
}
function ease_default2(value) {
  var id3 = this._id;
  return arguments.length ? this.each(easeConstant2(id3, value)) : get4(this.node(), id3).ease;
}

// node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id3, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error();
    set4(this, id3).ease = v;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}

// node_modules/d3-transition/src/transition/filter.js
function filter_default4(match) {
  if (typeof match !== "function") match = matcher_default2(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition2(subgroups, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/merge.js
function merge_default4(transition3) {
  if (transition3._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition3._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition2(merges, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/on.js
function start2(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction2(id3, name, listener) {
  var on0, on1, sit = start2(name) ? init2 : set4;
  return function() {
    var schedule = sit(this, id3), on = schedule.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default4(name, listener) {
  var id3 = this._id;
  return arguments.length < 2 ? get4(this.node(), id3).on.on(name) : this.each(onFunction2(id3, name, listener));
}

// node_modules/d3-transition/src/transition/remove.js
function removeFunction2(id3) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id3) return;
    if (parent) parent.removeChild(this);
  };
}
function remove_default4() {
  return this.on("end.remove", removeFunction2(this._id));
}

// node_modules/d3-transition/src/transition/select.js
function select_default6(select) {
  var name = this._name, id3 = this._id;
  if (typeof select !== "function") select = selector_default2(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default2(subgroup[i], name, id3, i, subgroup, get4(node, id3));
      }
    }
  }
  return new Transition2(subgroups, this._parents, name, id3);
}

// node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default6(select) {
  var name = this._name, id3 = this._id;
  if (typeof select !== "function") select = selectorAll_default2(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children2 = select.call(node, node.__data__, i, group), child, inherit3 = get4(node, id3), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule_default2(child, name, id3, k, children2, inherit3);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition2(subgroups, parents, name, id3);
}

// node_modules/d3-transition/src/transition/selection.js
var Selection4 = selection_default3.prototype.constructor;
function selection_default4() {
  return new Selection4(this._groups, this._parents);
}

// node_modules/d3-transition/src/transition/style.js
function styleNull2(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue2(this, name), string1 = (this.style.removeProperty(name), styleValue2(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove4(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant4(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue2(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction4(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue2(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue2(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove2(id3, name) {
  var on0, on1, listener0, key = "style." + name, event2 = "end." + key, remove3;
  return function() {
    var schedule = set4(this, id3), on = schedule.on, listener = schedule.value[key] == null ? remove3 || (remove3 = styleRemove4(name)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event2, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default4(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss2 : interpolate_default2;
  return value == null ? this.styleTween(name, styleNull2(name, i)).on("end.style." + name, styleRemove4(name)) : typeof value === "function" ? this.styleTween(name, styleFunction4(name, i, tweenValue2(this, "style." + name, value))).each(styleMaybeRemove2(this._id, name)) : this.styleTween(name, styleConstant4(name, i, value), priority).on("end.style." + name, null);
}

// node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate2(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween2(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate2(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default2(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween2(name, value, priority == null ? "" : priority));
}

// node_modules/d3-transition/src/transition/text.js
function textConstant4(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction4(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default4(value) {
  return this.tween("text", typeof value === "function" ? textFunction4(tweenValue2(this, "text", value)) : textConstant4(value == null ? "" : value + ""));
}

// node_modules/d3-transition/src/transition/textTween.js
function textInterpolate2(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween2(value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t02 = (i0 = i) && textInterpolate2(i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function textTween_default2(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween2(value));
}

// node_modules/d3-transition/src/transition/transition.js
function transition_default3() {
  var name = this._name, id0 = this._id, id1 = newId2();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit3 = get4(node, id0);
        schedule_default2(node, name, id1, i, group, {
          time: inherit3.time + inherit3.delay + inherit3.duration,
          delay: 0,
          duration: inherit3.duration,
          ease: inherit3.ease
        });
      }
    }
  }
  return new Transition2(groups, this._parents, name, id1);
}

// node_modules/d3-transition/src/transition/end.js
function end_default2() {
  var on0, on1, that = this, id3 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0) resolve();
    } };
    that.each(function() {
      var schedule = set4(this, id3), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size === 0) resolve();
  });
}

// node_modules/d3-transition/src/transition/index.js
var id2 = 0;
function Transition2(groups, parents, name, id3) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id3;
}
function transition2(name) {
  return selection_default3().transition(name);
}
function newId2() {
  return ++id2;
}
var selection_prototype2 = selection_default3.prototype;
Transition2.prototype = transition2.prototype = {
  constructor: Transition2,
  select: select_default6,
  selectAll: selectAll_default6,
  selectChild: selection_prototype2.selectChild,
  selectChildren: selection_prototype2.selectChildren,
  filter: filter_default4,
  merge: merge_default4,
  selection: selection_default4,
  transition: transition_default3,
  call: selection_prototype2.call,
  nodes: selection_prototype2.nodes,
  node: selection_prototype2.node,
  size: selection_prototype2.size,
  empty: selection_prototype2.empty,
  each: selection_prototype2.each,
  on: on_default4,
  attr: attr_default4,
  attrTween: attrTween_default2,
  style: style_default4,
  styleTween: styleTween_default2,
  text: text_default4,
  textTween: textTween_default2,
  remove: remove_default4,
  tween: tween_default2,
  delay: delay_default2,
  duration: duration_default2,
  ease: ease_default2,
  easeVarying: easeVarying_default,
  end: end_default2,
  [Symbol.iterator]: selection_prototype2[Symbol.iterator]
};

// node_modules/d3-ease/src/cubic.js
function cubicInOut2(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

// node_modules/d3-transition/src/selection/transition.js
var defaultTiming2 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut2
};
function inherit2(node, id3) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id3])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id3} not found`);
    }
  }
  return timing;
}
function transition_default4(name) {
  var id3, timing;
  if (name instanceof Transition2) {
    id3 = name._id, name = name._name;
  } else {
    id3 = newId2(), (timing = defaultTiming2).time = now2(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule_default2(node, name, id3, i, group, timing || inherit2(node, id3));
      }
    }
  }
  return new Transition2(groups, this._parents, name, id3);
}

// node_modules/d3-transition/src/selection/index.js
selection_default3.prototype.interrupt = interrupt_default4;
selection_default3.prototype.transition = transition_default4;

// node_modules/d3-brush/src/brush.js
var { abs, max, min } = Math;
function number1(e) {
  return [+e[0], +e[1]];
}
function number2(e) {
  return [number1(e[0]), number1(e[1])];
}
var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x, e) {
    return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]];
  },
  output: function(xy) {
    return xy && [xy[0][0], xy[1][0]];
  }
};
var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y, e) {
    return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]];
  },
  output: function(xy) {
    return xy && [xy[0][1], xy[1][1]];
  }
};
var XY = {
  name: "xy",
  handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
  input: function(xy) {
    return xy == null ? null : number2(xy);
  },
  output: function(xy) {
    return xy;
  }
};
function type(t) {
  return { type: t };
}

// node_modules/d3-zoom/src/transform.js
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity3 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return identity3;
  return node.__zoom;
}

// src/app/analysis/analysis.page.ts
init_environment();
init_global_service();
var svgcolors = {
  "vodlered": "var(--vodle-red)",
  "vodleblue": "var(--vodle-blue)",
  "vodlegreen": "var(--vodle-green)",
  "vodledarkgreen": "var(--vodle-darkgreen)"
};
var r_avatar = 7;
var AnalysisPage = class AnalysisPage2 {
  // LIFECYCLE:
  constructor(translate, modalController, G) {
    this.translate = translate;
    this.modalController = modalController;
    this.G = G;
    this.Array = Array;
    this.Math = Math;
    this.Object = Object;
    this.window = window;
    this.document = document;
    this.environment = environment;
    this.JSON = JSON;
    this.page = "analysis";
    this.G.L.entry("AnalysisPage.constructor");
  }
  ngOnInit() {
    this.G.L.entry("AnalysisPage.ngOnInit");
  }
  ionViewWillEnter() {
    this.G.L.entry("AnalysisPage.ionViewWillEnter");
    this.G.D.page = this;
  }
  ionViewDidEnter() {
    this.G.L.entry("AnalysisPage.ionViewDidEnter");
    this.show_venn();
  }
  onDataReady() {
    this.G.L.entry("AnalysisPage.onDataReady");
  }
  onDataChange() {
    this.G.L.entry("AnalysisPage.onDataChange");
  }
  ionViewWillLeave() {
    this.G.L.entry("AnalysisPage.ionViewWillLeave");
  }
  ionViewDidLeave() {
    this.G.L.entry("AnalysisPage.ionViewDidLeave");
  }
  // UI:
  close() {
    this.modalController.dismiss();
  }
  // logics:
  show_venn() {
    const T = this.P.p.T, shares_map = T.shares_map, our_oids = [], colors = [], myvote = T.votes_map.get(this.P.p.myvid);
    for (const [i, oid] of T.oids_descending.entries()) {
      if (i == 10) {
        break;
      }
      if (shares_map.has(oid) && shares_map.get(oid) > 0) {
        our_oids.push(oid);
        colors.push(this.P.slidercolor[oid]);
      }
    }
    this.G.L.info("colors", colors, svgcolors[colors[0]]);
    const exact_combi_counts = {}, approvals_map = T.approvals_map, chars = "abcdefghij";
    for (const vid of this.P.p.T.all_vids_set) {
      let combi = "";
      for (const [i, oid] of our_oids.entries()) {
        const amo = approvals_map.get(oid);
        if (amo.has(vid) && amo.get(vid)) {
          combi += chars[i];
        }
      }
      if (combi in exact_combi_counts) {
        exact_combi_counts[combi] += 1;
      } else {
        exact_combi_counts[combi] = 1;
      }
    }
    this.G.L.info("exact_combi_counts", exact_combi_counts);
    const subset_counts = {};
    for (const [combi, size] of Object.entries(exact_combi_counts)) {
      const l = combi.length, n_subsets = 1 << l;
      for (let mask = 1; mask < n_subsets; mask++) {
        let subset = "";
        for (let i = 0; i < l; i++) {
          if ((mask & 1 << i) !== 0) {
            subset += combi[i];
          }
        }
        if (subset in subset_counts) {
          subset_counts[subset] += size;
        } else {
          subset_counts[subset] = size;
        }
      }
    }
    this.G.L.info("subset_counts", subset_counts);
    const sets_array = [], n_not_abstaining = T.n_not_abstaining;
    for (const [i, oid] of our_oids.entries()) {
      sets_array.push({
        sets: [chars[i]],
        size: subset_counts[chars[i]],
        label: this.P.p.options[oid].name
        // + ": " + (shares_map.get(oid) * 100).toFixed(1) + "%" 
      });
    }
    for (const [subset, size] of Object.entries(subset_counts)) {
      if (subset.length > 1) {
        sets_array.push({
          sets: [...subset],
          size,
          weight: subset.length > 2 ? 0 : 1
        });
      }
    }
    this.G.L.info("sets_array", sets_array);
    sets_array.reverse();
    const div = select_default5("#venn"), div_bbox = div.node().getBoundingClientRect(), div_width = div_bbox.width;
    var chart = venn.VennDiagram().width(div_width).height(0.9 * div_width);
    select_default5("#venn").datum(sets_array).call(chart);
    selectAll_default5("#venn .venn-circle path").style("fill-opacity", 0).style("fill", function(d, i) {
      return svgcolors[colors[our_oids.length - 1 - i]];
    }).style("stroke-width", 1).style("stroke-opacity", 0).style("stroke", "white");
    selectAll_default5("#venn .venn-circle text").style("fill", "white").style("fill-opacity", 0).style("stroke-width", 0).style("font-size", "14px").style("font-style", "italic").style("font-weight", "bold");
    const circle_data = [], svg = select_default5("#venn > svg"), svg_gs = [];
    for (const [i, oid] of our_oids.entries()) {
      const svg_g0 = select_default5('g[data-venn-sets="' + chars[i] + '"]'), svg_circle = svg_g0.select("path"), bbox = svg_circle.node().getBBox(), R = bbox.width / 2, cx = bbox.x + R, cy = bbox.y + R, n = n_not_abstaining <= 100 ? T.n_votes_map.get(oid) : Math.round(T.shares_map.get(oid) * 100), svg_g = svg.append("g"), positions = [];
      var cx0, cy0;
      let fine = false;
      circle_data.push({ cx, cy, R });
      svg_gs.push(svg_g);
      for (let k = 0; k < n; k++) {
        var x, y, color3 = k == 0 && myvote == oid ? "yellow" : "var(--ion-text-color, currentColor)";
        for (let it = 0; it < 100; it++) {
          const r = (R - 1.5 * r_avatar) * Math.sqrt(Math.random()), phi = 2 * Math.PI * Math.random();
          x = cx + r * Math.sin(phi);
          y = cy + r * Math.cos(phi);
          fine = true;
          for (let j = 0; j < k; j++) {
            const pos = positions[j], d2 = (x - pos[0]) ** 2 + (y - pos[1]) ** 2;
            if (d2 < (3 * r_avatar) ** 2) {
              fine = false;
              break;
            }
          }
          if (fine) {
            for (let j = 0; j < i; j++) {
              const c = circle_data[j], d2 = (x - c.cx) ** 2 + (y - c.cy) ** 2;
              if (d2 < (c.R + 1.5 * r_avatar) ** 2) {
                fine = false;
                break;
              }
            }
          }
          if (fine)
            break;
        }
        positions.push([x, y]);
        if (fine) {
          svg_g.append("circle").style("stroke", color3).style("stroke-opacity", 0).style("fill", color3).style("fill-opacity", 0).attr("r", r_avatar).attr("cx", x).attr("cy", y);
        }
      }
    }
    for (const [i, oid] of our_oids.entries()) {
      const svg_g0 = select_default5('g[data-venn-sets="' + chars[i] + '"]'), svg_circle = svg_g0.select("path"), svg_text = svg_g0.select("text"), svg_g = svg_gs[i];
      svg.append(() => svg_text.node());
      const cloned_text = svg_text.clone(true);
      svg_text.style("stroke-width", 2).style("stroke", "black").style("stroke-opacity", 0);
      svg_circle.transition().duration(2e3).delay(1e3 * i).style("fill-opacity", 0.95 - 0.05 * i).style("stroke-opacity", 1);
      svg_text.transition().duration(2e3).delay(1e3 * i).style("stroke-opacity", 0.75);
      cloned_text.transition().duration(2e3).delay(1e3 * i).style("fill-opacity", 1);
      svg_g.selectAll("circle").transition().duration(2e3).delay(1e3 * i).style("fill-opacity", 0.3);
    }
  }
  static {
    this.ctorParameters = () => [
      { type: TranslateService },
      { type: ModalController },
      { type: GlobalService }
    ];
  }
  static {
    this.propDecorators = {
      P: [{ type: Input }],
      content: [{ type: ViewChild, args: [IonContent, { static: false }] }]
    };
  }
};
AnalysisPage = __decorate([
  Component({
    selector: "app-analysis",
    template: analysis_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [analysis_page_default2]
  })
], AnalysisPage);

export {
  AnalysisPage
};
//# debugId=9e31169c-7149-52ca-a0af-e1b5631f7cb5
//# sourceMappingURL=chunk-QXFLVLW6.js.map
