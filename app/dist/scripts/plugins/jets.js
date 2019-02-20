/* global define, document, Element, window */

/* ! Jets.js - v0.14.1 - 2018-06-22
* http://NeXTs.github.com/Jets.js/
* Copyright (c) 2015 Denis Lukov; Refactored 2018 Paul Anthony Webb; Licensed MIT */

(function(root, definition) {
  if (typeof module !== "undefined") module.exports = definition();
  else if (typeof define === "function" && typeof define.amd === "object") define(definition);
  else root["Jets"] = definition();
}(this, function() {
  "use strict";

  function Jets(opts) {
    if (!(this instanceof Jets)) return new Jets(opts);

    const defaults = {
      diacriticsMap: {},
      hideBy: "display: none",
      searchSelector: "*AND"
    };

    const self = this;

    self.options = {};

    [
      "addImportant",
      "callSearchManually",
      "columns",
      "diacriticsMap",
      "didSearch",
      "hideBy",
      "invert",
      "manualContentHandling",
      "searchInSpecificColumn",
      "searchSelector"
    ].forEach(name => self.options[name] = opts[name] || defaults[name]);

    if (this.options.searchSelector.length > 1) {
      const searchSelector = self.options["searchSelector"].trim();

      self.options.searchSelector = searchSelector.substr(0, 1);
      self.options.searchSelectorMode = searchSelector.substr(1).toUpperCase();
    }

    self.content_tag = document.querySelectorAll(opts.contentTag);
    if (!self.content_tag) throw new Error("Error! Could not find contentTag element");
    self.content_param = opts.contentTag;
    self.search_tag = document.querySelector(opts.searchTag);

    if (
      !self.search_tag &&
      !self.options.callSearchManually
    ) throw new Error("Error! Provide one of search methods: searchTag or callSearchManually and call .search(\"phrase\") manually");

    let last_search_query = self.search_tag && self.search_tag.value || "";

    self.search = (search_query, optional_column) => {
      const new_search_query =
        self.options.callSearchManually &&
        typeof search_query !== "undefined" ?
          search_query :
          self.search_tag ?
            self.search_tag.value :
            "";

      if (last_search_query === (last_search_query = new_search_query)) return;
      (0, self._applyCSS(last_search_query, optional_column));
      self.options.didSearch && self.options.didSearch(last_search_query);
    };

    self._onSearch = function(event) {
      if (event.type === "keydown") return setTimeout(self.search, 0);
      self.search();
    };

    self.destroy = function() {
      if (!self.options.callSearchManually) self._processEventListeners("remove");
      self._destroy();
    };

    if (!self.options.callSearchManually) self._processEventListeners("add");

    self._addStyleTag();
    self._setJets();
    self._applyCSS(last_search_query);
  }

  Jets.prototype = {
    constructor: Jets,
    _processEventListeners: function(action) {
      [
        "change",
        "input",
        "keydown"
      ].forEach(function(event_type) {
        this.search_tag[action + "EventListener"](event_type, this._onSearch);
      }.bind(this));
    },

    _applyCSS: function(search_query, optional_column) {
      const options = this.options;

      const search_phrase = this.replaceDiacritics(
        search_query
          .trim()
          .toLowerCase()
          .replace(/\s\s+/g, " ")
      ).replace(/\\/g, "\\\\");

      const words = options.searchSelectorMode ?
        search_phrase.split(" ").filter((item, pos, arr) => arr.indexOf(item) === pos) :
        [search_phrase];

      const is_strict_selector = options.searchSelectorMode === "AND";
      const selectors = new Array(words.length);

      for (let i = 0, ii = words.length; i < ii; i++) {
        selectors[i] =
          (is_strict_selector ? this.content_param + ">" : "") +
          (options.invert ? "" : ":not(") +
          "[data-jets" + (typeof optional_column !== "undefined" ? "-col-" + optional_column : "") + options.searchSelector + `="${words[i]}"]` +
          (options.invert ? "" : ")");
      }

      const hide_rules =
        options.hideBy
          .split(";")
          .filter(Boolean)
          .map(rule => rule + (options.addImportant ? "!important" : ""));

      const css_rule = (is_strict_selector ? "" : this.content_param + ">") + selectors.join(is_strict_selector ? "," : "") + "{" + hide_rules.join(";") + "}";

      this.styleTag.innerHTML = search_phrase.length ? css_rule : "";
    },

    _addStyleTag: function() {
      this.styleTag = document.createElement("style");
      document.head.appendChild(this.styleTag);
    },

    _getText: function(tag) {
      return tag && (tag.textContent || tag.innerText) || "";
    },

    _sanitize: function(text) {
      return this.replaceDiacritics(text).trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
    },

    _getContentTags: function(query) {
      return Array.prototype.slice.call(this.content_tag).reduce((all, elem) => {
        return all.concat(Array.prototype.slice.call(elem.querySelectorAll(query || ":scope > *")));
      }, []);
    },

    _handleSpecificColumns: function(tag, set) {
      const self = this;

      if (!self.options.searchInSpecificColumn) return;

      Array.prototype.slice.call(tag.children).map((children, i) => {
        if (
          self.options.columns &&
          self.options.columns.length &&
          self.options.columns.indexOf(i) === -1
        ) return;

        tag[(set || "remove") + "Attribute"]("data-jets-col-" + i, set && self._sanitize(self._getText(children)));
      });
    },

    _setJets: function(query, force) {
      const self = this;
      const tags = self._getContentTags(force ? "" : query);
      let text;

      for (const tag of tags) {
        if (tag.hasAttribute("data-jets") && !force) continue;

        text = this.options.manualContentHandling ?
          this.options.manualContentHandling(tag) :
          self.options.columns &&
            self.options.columns.length ?
            self.options.columns.map(column => self._getText(tag.children[column])).join(" ") :
            self._getText(tag);

        tag.setAttribute("data-jets", self._sanitize(text));
        self._handleSpecificColumns(tag, "set");
      }
    },

    replaceDiacritics: function(text) {
      const diacritics = this.options.diacriticsMap;

      for (const letter in diacritics) if (diacritics.hasOwnProperty(letter)) {
        for (let i = 0, ii = diacritics[letter].length; i < ii; i++) {
          text = text.replace(new RegExp(diacritics[letter][i], "g"), letter);
        }
      }

      return text;
    },

    update: function(force) {
      this._setJets(":scope > :not([data-jets])", force);
    },

    _destroy: function() {
      this.styleTag.parentNode && document.head.removeChild(this.styleTag);
      const tags = this._getContentTags();

      for (const tag of tags) {
        tag.removeAttribute("data-jets");
        this._handleSpecificColumns(tag);
      }
    }
  }

  // :scope polyfill
  // https://stackoverflow.com/a/17989803/1221082
  ;(function(doc, proto) {
    try {
      doc.querySelector(":scope body");
    } catch(err) {
      ["querySelector", "querySelectorAll"].forEach(method => {
        const nativ = proto[method];

        proto[method] = function(selectors) {
          if (/(^|,)\s*:scope/.test(selectors)) {
            const id = this.getAttribute("id");

            this.id = "ID_" + Date.now();
            selectors = selectors.replace(/((^|,)\s*):scope/g, "$1#" + this.getAttribute("id"));

            const result = doc[method](selectors);

            this.id = id;

            return result;
          }

          return nativ.call(this, selectors);
        };
      });
    }
  })(window.document, Element.prototype);

  return Jets;
}));
