/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Associates a UI element and an array of cards. The UI element
// represents the location of the card on the screen
var CardPile = (function () {
    function CardPile(domId) {
        this.domId = domId;
        this.cards = new Array();
        this.uiElement = document.getElementById(domId);
        this.uiElement['cardPile'] = this;
    }
    CardPile.prototype.push = function (card) {
        this.cards.push(card);
        this.uiElement.appendChild(card.uiElement);
    };
    CardPile.prototype.pop = function () {
        if (this.cards.length == 0)
            return null;
        var card = this.cards.pop();
        // dragula removes the child element from our uiElement's list
        // of children
        // this.uiElement.removeChild(card.uiElement);
        return card;
    };
    CardPile.prototype.popMulti = function (count) {
        if (count > this.cards.length)
            return null;
        var result = this.cards.slice(this.cards.length - count - 1, count);
        // dragula removes the child element from our uiElement's list
        // of children
        // for(let popped of result){
        //     this.uiElement.removeChild(popped.uiElement);
        // }
    };
    CardPile.prototype.showTopCard = function () {
        if (this.cards.length == 0)
            return;
        this.cards[this.cards.length - 1].showFace();
    };
    CardPile.prototype.getTopCard = function () {
        if (this.cards.length == 0)
            return;
        return this.cards[this.cards.length - 1];
    };
    return CardPile;
}());
exports.CardPile = CardPile;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Suite_1 = __webpack_require__(3);
// associates a card suite and value with a UI element
// that represents the card
var Card = (function () {
    function Card(Suite, Value, ImageFile, ShowFace, ShowingFace) {
        if (ShowFace === void 0) { ShowFace = false; }
        if (ShowingFace === void 0) { ShowingFace = false; }
        this.Suite = Suite;
        this.Value = Value;
        this.ImageFile = ImageFile;
        this.ShowFace = ShowFace;
        this.ShowingFace = ShowingFace;
        this.uiElement = document.createElement("img");
        this.uiElement.id = "card-" + this.Suite + "-" + this.Value;
        this.uiElement.setAttribute('class', 'card');
        this.uiElement['card'] = this;
        if (this.ShowFace) {
            this.showFace();
        }
        else {
            this.showBack();
        }
    }
    Card.prototype.showFace = function () {
        this.ShowingFace = true;
        this.uiElement.setAttribute('src', "./SVG-cards-1.3/" + this.ImageFile);
    };
    Card.prototype.showBack = function () {
        this.ShowingFace = false;
        this.uiElement.setAttribute('src', './SVG-cards-1.3/card-back-assets/card-back.png');
    };
    Card.prototype.setFanOffset = function (offsetInPx) {
        this.uiElement.style['top'] = offsetInPx + "px";
    };
    Card.isRed = function (suite) {
        return suite != Suite_1.Suite.Clubs && suite != Suite_1.Suite.Spades;
    };
    Card.isBlack = function (suite) {
        return suite != Suite_1.Suite.Diamonds && suite != Suite_1.Suite.Hearts;
    };
    return Card;
}());
exports.Card = Card;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Suite;
(function (Suite) {
    Suite[Suite["Clubs"] = 0] = "Clubs";
    Suite[Suite["Diamonds"] = 1] = "Diamonds";
    Suite[Suite["Hearts"] = 2] = "Hearts";
    Suite[Suite["Spades"] = 3] = "Spades";
})(Suite = exports.Suite || (exports.Suite = {}));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CardDeck_1 = __webpack_require__(14);
var CardPile_1 = __webpack_require__(1);
var FoundationCardPile_1 = __webpack_require__(15);
var TableauCardPile_1 = __webpack_require__(16);
var Suite_1 = __webpack_require__(3);
var dragulaExp = __webpack_require__(12);
var Game = (function () {
    function Game() {
        this.cardDeck = new CardDeck_1.CardDeck();
        this.stock = new CardPile_1.CardPile("stock");
        this.waste = new CardPile_1.CardPile("waste");
        this.foundations = new Array();
        this.foundations.push(new FoundationCardPile_1.FoundationCardPile(Suite_1.Suite.Hearts, "foundation-hearts"));
        this.foundations.push(new FoundationCardPile_1.FoundationCardPile(Suite_1.Suite.Diamonds, "foundation-diamonds"));
        this.foundations.push(new FoundationCardPile_1.FoundationCardPile(Suite_1.Suite.Clubs, "foundation-clubs"));
        this.foundations.push(new FoundationCardPile_1.FoundationCardPile(Suite_1.Suite.Spades, "foundation-spades"));
        this.tableau = new Array();
        for (var i = 0; i < 7; i++)
            this.tableau.push(new TableauCardPile_1.TableauCardPile("tableau-" + (i + 1)));
        this.deal();
    }
    Game.prototype.deal = function () {
        var _this = this;
        // deal cards into the right piles
        var tableauIdx = 0;
        var tableauCounts = [1, 2, 3, 4, 5, 6, 7];
        for (var i = 0; i < 52; i++) {
            if (tableauIdx < 7) {
                this.tableau[tableauIdx].push(this.cardDeck.Cards[i]);
                tableauCounts[tableauIdx]--;
                if (tableauCounts[tableauIdx] == 0)
                    tableauIdx++;
            }
            else {
                this.stock.push(this.cardDeck.Cards[i]);
            }
        }
        // set up drag and drop
        var ar = [
            document.getElementById(this.stock.domId),
            document.getElementById(this.waste.domId),
            document.getElementById(this.foundations[0].domId),
            document.getElementById(this.foundations[1].domId),
            document.getElementById(this.foundations[2].domId),
            document.getElementById(this.foundations[3].domId),
            document.getElementById(this.tableau[0].domId),
            document.getElementById(this.tableau[1].domId),
            document.getElementById(this.tableau[2].domId),
            document.getElementById(this.tableau[3].domId),
            document.getElementById(this.tableau[4].domId),
            document.getElementById(this.tableau[5].domId),
            document.getElementById(this.tableau[6].domId)
        ];
        this.dragula = dragulaExp(ar, {
            accepts: function (el, target, source, sibling) { return _this.accepts(el, target, source, sibling); }
        });
        this.dragula.on('drop', function (el, target, source, sibling) { return _this.handleDropped(el, target, source, sibling); });
        this.stock.showTopCard();
        for (var i = 0; i < 7; i++) {
            this.tableau[i].showTopCard();
        }
    };
    Game.prototype.handleDropped = function (el, target, source, sibling) {
        var removed = this.removeCardFromPile(el, source);
        this.addCardToPile(removed, target);
    };
    // Check called during drag to see if drop will be allowed
    Game.prototype.accepts = function (el, target, source, sibling) {
        var card = Game.cardFromEl(el);
        var result = false;
        result = card != null &&
            ((Game.isTableau(target) && this.canDropOnTableau(card, target)) ||
                (Game.isFoundation(target) && this.canDropOnFoundation(card, target)) ||
                (Game.isStock(source) && Game.isWaste(target)));
        this.printAcceptsDiagnostic(result, card, target, source);
        return result;
    };
    Game.prototype.removeCardFromPile = function (cardEl, pileEl) {
        var srcCard = Game.cardFromEl(cardEl);
        var pile = this.cardPileFromEl(pileEl);
        if (pile && srcCard) {
            var result = pile.pop();
            pile.showTopCard();
            return result;
        }
        return null;
    };
    Game.prototype.addCardToPile = function (card, pileEl) {
        var cardPile = this.cardPileFromEl(pileEl);
        if (cardPile) {
            cardPile.push(card);
        }
    };
    Game.prototype.canDropOnTableau = function (card, targ) {
        var cardPile = this.tableauFromEl(targ);
        if (!cardPile)
            return false;
        return cardPile.canAcceptCard(card);
    };
    Game.prototype.cardPileFromEl = function (pileEl) {
        var pile = this.foundationFromEl(pileEl);
        if (pile)
            return pile;
        pile = this.tableauFromEl(pileEl);
        if (pile)
            return pile;
        pile = this.stockFromEl(pileEl);
        if (pile)
            return pile;
        return this.wasteFromEl(pileEl);
    };
    Game.prototype.foundationFromEl = function (el) {
        var els = el.id.split("-");
        var id = -1;
        switch (els[1]) {
            case "hearts":
                id = 0;
                break;
            case "diamonds":
                id = 1;
                break;
            case "clubs":
                id = 2;
                break;
            case "spades":
                id = 3;
                break;
        }
        if (id == -1)
            return null;
        return this.foundations[id];
    };
    Game.prototype.tableauFromEl = function (el) {
        var els = el.id.split("-");
        var id = parseInt(els[1]);
        id -= 1;
        if (id < 0 || id > 6)
            return null;
        var cardPile = this.tableau[id];
        return cardPile;
    };
    Game.prototype.stockFromEl = function (el) {
        if (Game.isStock(el)) {
            return this.stock;
        }
    };
    Game.prototype.wasteFromEl = function (el) {
        if (Game.isWaste(el)) {
            return this.waste;
        }
    };
    Game.prototype.canDropOnFoundation = function (card, targ) {
        var cardPile = this.foundationFromEl(targ);
        if (!cardPile)
            return false;
        return cardPile.canAcceptCard(card);
    };
    Game.isTableau = function (el) {
        return Game.isElOfType(el, "tableau");
    };
    Game.isFoundation = function (el) {
        return Game.isElOfType(el, "foundation");
    };
    Game.isStock = function (el) {
        return Game.isElOfType(el, "stock");
    };
    Game.isWaste = function (el) {
        return Game.isElOfType(el, "waste");
    };
    Game.isElOfType = function (el, type) {
        if (el.id) {
            var els = el.id.split("-");
            return els[0] === type;
        }
        return false;
    };
    Game.cardFromEl = function (el) {
        var els = el.id.split("-");
        if (els[0] === 'card') {
            return el['card'];
        }
        return null;
    };
    Game.prototype.printAcceptsDiagnostic = function (result, card, target, source) {
        var targetPile = this.cardPileFromEl(target);
        var targetTop = targetPile ? targetPile.getTopCard() : null;
        var topString = targetTop ? targetTop.Suite + ":" + targetTop.Value : "null";
        console.log((result ? 'can' : 'cannot') + " drop " + card.Suite + ":" + card.Value + " on " + target.id + " " + topString + " from " + source.id);
    };
    return Game;
}());
exports.Game = Game;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function atoa (a, n) { return Array.prototype.slice.call(a, n); }


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ticky = __webpack_require__(13);

module.exports = function debounce (fn, args, ctx) {
  if (!fn) { return; }
  ticky(function run () {
    fn.apply(ctx || null, args || []);
  });
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atoa = __webpack_require__(5);
var debounce = __webpack_require__(6);

module.exports = function emitter (thing, options) {
  var opts = options || {};
  var evt = {};
  if (thing === undefined) { thing = {}; }
  thing.on = function (type, fn) {
    if (!evt[type]) {
      evt[type] = [fn];
    } else {
      evt[type].push(fn);
    }
    return thing;
  };
  thing.once = function (type, fn) {
    fn._once = true; // thing.off(fn) still works!
    thing.on(type, fn);
    return thing;
  };
  thing.off = function (type, fn) {
    var c = arguments.length;
    if (c === 1) {
      delete evt[type];
    } else if (c === 0) {
      evt = {};
    } else {
      var et = evt[type];
      if (!et) { return thing; }
      et.splice(et.indexOf(fn), 1);
    }
    return thing;
  };
  thing.emit = function () {
    var args = atoa(arguments);
    return thing.emitterSnapshot(args.shift()).apply(this, args);
  };
  thing.emitterSnapshot = function (type) {
    var et = (evt[type] || []).slice(0);
    return function () {
      var args = atoa(arguments);
      var ctx = this || thing;
      if (type === 'error' && opts.throws !== false && !et.length) { throw args.length === 1 ? args[0] : args; }
      et.forEach(function emitter (listen) {
        if (opts.async) { debounce(listen, args, ctx); } else { listen.apply(ctx, args); }
        if (listen._once) { thing.off(type, listen); }
      });
      return thing;
    };
  };
  return thing;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var customEvent = __webpack_require__(10);
var eventmap = __webpack_require__(9);
var doc = global.document;
var addEvent = addEventEasy;
var removeEvent = removeEventEasy;
var hardCache = [];

if (!global.addEventListener) {
  addEvent = addEventHard;
  removeEvent = removeEventHard;
}

module.exports = {
  add: addEvent,
  remove: removeEvent,
  fabricate: fabricateEvent
};

function addEventEasy (el, type, fn, capturing) {
  return el.addEventListener(type, fn, capturing);
}

function addEventHard (el, type, fn) {
  return el.attachEvent('on' + type, wrap(el, type, fn));
}

function removeEventEasy (el, type, fn, capturing) {
  return el.removeEventListener(type, fn, capturing);
}

function removeEventHard (el, type, fn) {
  var listener = unwrap(el, type, fn);
  if (listener) {
    return el.detachEvent('on' + type, listener);
  }
}

function fabricateEvent (el, type, model) {
  var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
  if (el.dispatchEvent) {
    el.dispatchEvent(e);
  } else {
    el.fireEvent('on' + type, e);
  }
  function makeClassicEvent () {
    var e;
    if (doc.createEvent) {
      e = doc.createEvent('Event');
      e.initEvent(type, true, true);
    } else if (doc.createEventObject) {
      e = doc.createEventObject();
    }
    return e;
  }
  function makeCustomEvent () {
    return new customEvent(type, { detail: model });
  }
}

function wrapperFactory (el, type, fn) {
  return function wrapper (originalEvent) {
    var e = originalEvent || global.event;
    e.target = e.target || e.srcElement;
    e.preventDefault = e.preventDefault || function preventDefault () { e.returnValue = false; };
    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
    e.which = e.which || e.keyCode;
    fn.call(el, e);
  };
}

function wrap (el, type, fn) {
  var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
  hardCache.push({
    wrapper: wrapper,
    element: el,
    type: type,
    fn: fn
  });
  return wrapper;
}

function unwrap (el, type, fn) {
  var i = find(el, type, fn);
  if (i) {
    var wrapper = hardCache[i].wrapper;
    hardCache.splice(i, 1); // free up a tad of memory
    return wrapper;
  }
}

function find (el, type, fn) {
  var i, item;
  for (i = 0; i < hardCache.length; i++) {
    item = hardCache[i];
    if (item.element === el && item.type === type && item.fn === fn) {
      return i;
    }
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var eventmap = [];
var eventname = '';
var ron = /^on/;

for (eventname in global) {
  if (ron.test(eventname)) {
    eventmap.push(eventname.slice(2));
  }
}

module.exports = eventmap;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var NativeCustomEvent = global.CustomEvent;

function useNative () {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
    return  'cat' === p.type && 'bar' === p.detail.foo;
  } catch (e) {
  }
  return false;
}

/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */

module.exports = useNative() ? NativeCustomEvent :

// IE >= 9
'function' === typeof document.createEvent ? function CustomEvent (type, params) {
  var e = document.createEvent('CustomEvent');
  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, void 0);
  }
  return e;
} :

// IE <= 8
function CustomEvent (type, params) {
  var e = document.createEventObject();
  e.type = type;
  if (params) {
    e.bubbles = Boolean(params.bubbles);
    e.cancelable = Boolean(params.cancelable);
    e.detail = params.detail;
  } else {
    e.bubbles = false;
    e.cancelable = false;
    e.detail = void 0;
  }
  return e;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cache = {};
var start = '(?:^|\\s)';
var end = '(?:\\s|$)';

function lookupClass (className) {
  var cached = cache[className];
  if (cached) {
    cached.lastIndex = 0;
  } else {
    cache[className] = cached = new RegExp(start + className + end, 'g');
  }
  return cached;
}

function addClass (el, className) {
  var current = el.className;
  if (!current.length) {
    el.className = className;
  } else if (!lookupClass(className).test(current)) {
    el.className += ' ' + className;
  }
}

function rmClass (el, className) {
  el.className = el.className.replace(lookupClass(className), ' ').trim();
}

module.exports = {
  add: addClass,
  rm: rmClass
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var emitter = __webpack_require__(7);
var crossvent = __webpack_require__(8);
var classes = __webpack_require__(11);
var doc = document;
var documentElement = doc.documentElement;

function dragula (initialContainers, options) {
  var len = arguments.length;
  if (len === 1 && Array.isArray(initialContainers) === false) {
    options = initialContainers;
    initialContainers = [];
  }
  var _mirror; // mirror image
  var _source; // source container
  var _item; // item being dragged
  var _offsetX; // reference x
  var _offsetY; // reference y
  var _moveX; // reference move x
  var _moveY; // reference move y
  var _initialSibling; // reference sibling when grabbed
  var _currentSibling; // reference sibling now
  var _copy; // item used for copying
  var _renderTimer; // timer for setTimeout renderMirrorImage
  var _lastDropTarget = null; // last container item was over
  var _grabbed; // holds mousedown context until first mousemove

  var o = options || {};
  if (o.moves === void 0) { o.moves = always; }
  if (o.accepts === void 0) { o.accepts = always; }
  if (o.invalid === void 0) { o.invalid = invalidTarget; }
  if (o.containers === void 0) { o.containers = initialContainers || []; }
  if (o.isContainer === void 0) { o.isContainer = never; }
  if (o.copy === void 0) { o.copy = false; }
  if (o.copySortSource === void 0) { o.copySortSource = false; }
  if (o.revertOnSpill === void 0) { o.revertOnSpill = false; }
  if (o.removeOnSpill === void 0) { o.removeOnSpill = false; }
  if (o.direction === void 0) { o.direction = 'vertical'; }
  if (o.ignoreInputTextSelection === void 0) { o.ignoreInputTextSelection = true; }
  if (o.mirrorContainer === void 0) { o.mirrorContainer = doc.body; }

  var drake = emitter({
    containers: o.containers,
    start: manualStart,
    end: end,
    cancel: cancel,
    remove: remove,
    destroy: destroy,
    canMove: canMove,
    dragging: false
  });

  if (o.removeOnSpill === true) {
    drake.on('over', spillOver).on('out', spillOut);
  }

  events();

  return drake;

  function isContainer (el) {
    return drake.containers.indexOf(el) !== -1 || o.isContainer(el);
  }

  function events (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousedown', grab);
    touchy(documentElement, op, 'mouseup', release);
  }

  function eventualMovements (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousemove', startBecauseMouseMoved);
  }

  function movements (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](documentElement, 'selectstart', preventGrabbed); // IE8
    crossvent[op](documentElement, 'click', preventGrabbed);
  }

  function destroy () {
    events(true);
    release({});
  }

  function preventGrabbed (e) {
    if (_grabbed) {
      e.preventDefault();
    }
  }

  function grab (e) {
    _moveX = e.clientX;
    _moveY = e.clientY;

    var ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey;
    if (ignore) {
      return; // we only care about honest-to-god left clicks and touch events
    }
    var item = e.target;
    var context = canStart(item);
    if (!context) {
      return;
    }
    _grabbed = context;
    eventualMovements();
    if (e.type === 'mousedown') {
      if (isInput(item)) { // see also: https://github.com/bevacqua/dragula/issues/208
        item.focus(); // fixes https://github.com/bevacqua/dragula/issues/176
      } else {
        e.preventDefault(); // fixes https://github.com/bevacqua/dragula/issues/155
      }
    }
  }

  function startBecauseMouseMoved (e) {
    if (!_grabbed) {
      return;
    }
    if (whichMouseButton(e) === 0) {
      release({});
      return; // when text is selected on an input and then dragged, mouseup doesn't fire. this is our only hope
    }
    // truthy check fixes #239, equality fixes #207
    if (e.clientX !== void 0 && e.clientX === _moveX && e.clientY !== void 0 && e.clientY === _moveY) {
      return;
    }
    if (o.ignoreInputTextSelection) {
      var clientX = getCoord('clientX', e);
      var clientY = getCoord('clientY', e);
      var elementBehindCursor = doc.elementFromPoint(clientX, clientY);
      if (isInput(elementBehindCursor)) {
        return;
      }
    }

    var grabbed = _grabbed; // call to end() unsets _grabbed
    eventualMovements(true);
    movements();
    end();
    start(grabbed);

    var offset = getOffset(_item);
    _offsetX = getCoord('pageX', e) - offset.left;
    _offsetY = getCoord('pageY', e) - offset.top;

    classes.add(_copy || _item, 'gu-transit');
    renderMirrorImage();
    drag(e);
  }

  function canStart (item) {
    if (drake.dragging && _mirror) {
      return;
    }
    if (isContainer(item)) {
      return; // don't drag container itself
    }
    var handle = item;
    while (getParent(item) && isContainer(getParent(item)) === false) {
      if (o.invalid(item, handle)) {
        return;
      }
      item = getParent(item); // drag target should be a top element
      if (!item) {
        return;
      }
    }
    var source = getParent(item);
    if (!source) {
      return;
    }
    if (o.invalid(item, handle)) {
      return;
    }

    var movable = o.moves(item, source, handle, nextEl(item));
    if (!movable) {
      return;
    }

    return {
      item: item,
      source: source
    };
  }

  function canMove (item) {
    return !!canStart(item);
  }

  function manualStart (item) {
    var context = canStart(item);
    if (context) {
      start(context);
    }
  }

  function start (context) {
    if (isCopy(context.item, context.source)) {
      _copy = context.item.cloneNode(true);
      drake.emit('cloned', _copy, context.item, 'copy');
    }

    _source = context.source;
    _item = context.item;
    _initialSibling = _currentSibling = nextEl(context.item);

    drake.dragging = true;
    drake.emit('drag', _item, _source);
  }

  function invalidTarget () {
    return false;
  }

  function end () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    drop(item, getParent(item));
  }

  function ungrab () {
    _grabbed = false;
    eventualMovements(true);
    movements(true);
  }

  function release (e) {
    ungrab();

    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    if (dropTarget && ((_copy && o.copySortSource) || (!_copy || dropTarget !== _source))) {
      drop(item, dropTarget);
    } else if (o.removeOnSpill) {
      remove();
    } else {
      cancel();
    }
  }

  function drop (item, target) {
    var parent = getParent(item);
    if (_copy && o.copySortSource && target === _source) {
      parent.removeChild(_item);
    }
    if (isInitialPlacement(target)) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, target, _source, _currentSibling);
    }
    cleanup();
  }

  function remove () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var parent = getParent(item);
    if (parent) {
      parent.removeChild(item);
    }
    drake.emit(_copy ? 'cancel' : 'remove', item, parent, _source);
    cleanup();
  }

  function cancel (revert) {
    if (!drake.dragging) {
      return;
    }
    var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
    var item = _copy || _item;
    var parent = getParent(item);
    var initial = isInitialPlacement(parent);
    if (initial === false && reverts) {
      if (_copy) {
        if (parent) {
          parent.removeChild(_copy);
        }
      } else {
        _source.insertBefore(item, _initialSibling);
      }
    }
    if (initial || reverts) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, parent, _source, _currentSibling);
    }
    cleanup();
  }

  function cleanup () {
    var item = _copy || _item;
    ungrab();
    removeMirrorImage();
    if (item) {
      classes.rm(item, 'gu-transit');
    }
    if (_renderTimer) {
      clearTimeout(_renderTimer);
    }
    drake.dragging = false;
    if (_lastDropTarget) {
      drake.emit('out', item, _lastDropTarget, _source);
    }
    drake.emit('dragend', item);
    _source = _item = _copy = _initialSibling = _currentSibling = _renderTimer = _lastDropTarget = null;
  }

  function isInitialPlacement (target, s) {
    var sibling;
    if (s !== void 0) {
      sibling = s;
    } else if (_mirror) {
      sibling = _currentSibling;
    } else {
      sibling = nextEl(_copy || _item);
    }
    return target === _source && sibling === _initialSibling;
  }

  function findDropTarget (elementBehindCursor, clientX, clientY) {
    var target = elementBehindCursor;
    while (target && !accepted()) {
      target = getParent(target);
    }
    return target;

    function accepted () {
      var droppable = isContainer(target);
      if (droppable === false) {
        return false;
      }

      var immediate = getImmediateChild(target, elementBehindCursor);
      var reference = getReference(target, immediate, clientX, clientY);
      var initial = isInitialPlacement(target, reference);
      if (initial) {
        return true; // should always be able to drop it right back where it was
      }
      return o.accepts(_item, target, _source, reference);
    }
  }

  function drag (e) {
    if (!_mirror) {
      return;
    }
    e.preventDefault();

    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var x = clientX - _offsetX;
    var y = clientY - _offsetY;

    _mirror.style.left = x + 'px';
    _mirror.style.top = y + 'px';

    var item = _copy || _item;
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    var changed = dropTarget !== null && dropTarget !== _lastDropTarget;
    if (changed || dropTarget === null) {
      out();
      _lastDropTarget = dropTarget;
      over();
    }
    var parent = getParent(item);
    if (dropTarget === _source && _copy && !o.copySortSource) {
      if (parent) {
        parent.removeChild(item);
      }
      return;
    }
    var reference;
    var immediate = getImmediateChild(dropTarget, elementBehindCursor);
    if (immediate !== null) {
      reference = getReference(dropTarget, immediate, clientX, clientY);
    } else if (o.revertOnSpill === true && !_copy) {
      reference = _initialSibling;
      dropTarget = _source;
    } else {
      if (_copy && parent) {
        parent.removeChild(item);
      }
      return;
    }
    if (
      (reference === null && changed) ||
      reference !== item &&
      reference !== nextEl(item)
    ) {
      _currentSibling = reference;
      dropTarget.insertBefore(item, reference);
      drake.emit('shadow', item, dropTarget, _source);
    }
    function moved (type) { drake.emit(type, item, _lastDropTarget, _source); }
    function over () { if (changed) { moved('over'); } }
    function out () { if (_lastDropTarget) { moved('out'); } }
  }

  function spillOver (el) {
    classes.rm(el, 'gu-hide');
  }

  function spillOut (el) {
    if (drake.dragging) { classes.add(el, 'gu-hide'); }
  }

  function renderMirrorImage () {
    if (_mirror) {
      return;
    }
    var rect = _item.getBoundingClientRect();
    _mirror = _item.cloneNode(true);
    _mirror.style.width = getRectWidth(rect) + 'px';
    _mirror.style.height = getRectHeight(rect) + 'px';
    classes.rm(_mirror, 'gu-transit');
    classes.add(_mirror, 'gu-mirror');
    o.mirrorContainer.appendChild(_mirror);
    touchy(documentElement, 'add', 'mousemove', drag);
    classes.add(o.mirrorContainer, 'gu-unselectable');
    drake.emit('cloned', _mirror, _item, 'mirror');
  }

  function removeMirrorImage () {
    if (_mirror) {
      classes.rm(o.mirrorContainer, 'gu-unselectable');
      touchy(documentElement, 'remove', 'mousemove', drag);
      getParent(_mirror).removeChild(_mirror);
      _mirror = null;
    }
  }

  function getImmediateChild (dropTarget, target) {
    var immediate = target;
    while (immediate !== dropTarget && getParent(immediate) !== dropTarget) {
      immediate = getParent(immediate);
    }
    if (immediate === documentElement) {
      return null;
    }
    return immediate;
  }

  function getReference (dropTarget, target, x, y) {
    var horizontal = o.direction === 'horizontal';
    var reference = target !== dropTarget ? inside() : outside();
    return reference;

    function outside () { // slower, but able to figure out any position
      var len = dropTarget.children.length;
      var i;
      var el;
      var rect;
      for (i = 0; i < len; i++) {
        el = dropTarget.children[i];
        rect = el.getBoundingClientRect();
        if (horizontal && (rect.left + rect.width / 2) > x) { return el; }
        if (!horizontal && (rect.top + rect.height / 2) > y) { return el; }
      }
      return null;
    }

    function inside () { // faster, but only available if dropped inside a child element
      var rect = target.getBoundingClientRect();
      if (horizontal) {
        return resolve(x > rect.left + getRectWidth(rect) / 2);
      }
      return resolve(y > rect.top + getRectHeight(rect) / 2);
    }

    function resolve (after) {
      return after ? nextEl(target) : target;
    }
  }

  function isCopy (item, container) {
    return typeof o.copy === 'boolean' ? o.copy : o.copy(item, container);
  }
}

function touchy (el, op, type, fn) {
  var touch = {
    mouseup: 'touchend',
    mousedown: 'touchstart',
    mousemove: 'touchmove'
  };
  var pointers = {
    mouseup: 'pointerup',
    mousedown: 'pointerdown',
    mousemove: 'pointermove'
  };
  var microsoft = {
    mouseup: 'MSPointerUp',
    mousedown: 'MSPointerDown',
    mousemove: 'MSPointerMove'
  };
  if (global.navigator.pointerEnabled) {
    crossvent[op](el, pointers[type], fn);
  } else if (global.navigator.msPointerEnabled) {
    crossvent[op](el, microsoft[type], fn);
  } else {
    crossvent[op](el, touch[type], fn);
    crossvent[op](el, type, fn);
  }
}

function whichMouseButton (e) {
  if (e.touches !== void 0) { return e.touches.length; }
  if (e.which !== void 0 && e.which !== 0) { return e.which; } // see https://github.com/bevacqua/dragula/issues/261
  if (e.buttons !== void 0) { return e.buttons; }
  var button = e.button;
  if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
    return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
  }
}

function getOffset (el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
    top: rect.top + getScroll('scrollTop', 'pageYOffset')
  };
}

function getScroll (scrollProp, offsetProp) {
  if (typeof global[offsetProp] !== 'undefined') {
    return global[offsetProp];
  }
  if (documentElement.clientHeight) {
    return documentElement[scrollProp];
  }
  return doc.body[scrollProp];
}

function getElementBehindPoint (point, x, y) {
  var p = point || {};
  var state = p.className;
  var el;
  p.className += ' gu-hide';
  el = doc.elementFromPoint(x, y);
  p.className = state;
  return el;
}

function never () { return false; }
function always () { return true; }
function getRectWidth (rect) { return rect.width || (rect.right - rect.left); }
function getRectHeight (rect) { return rect.height || (rect.bottom - rect.top); }
function getParent (el) { return el.parentNode === doc ? null : el.parentNode; }
function isInput (el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || isEditable(el); }
function isEditable (el) {
  if (!el) { return false; } // no parents were editable
  if (el.contentEditable === 'false') { return false; } // stop the lookup
  if (el.contentEditable === 'true') { return true; } // found a contentEditable element in the chain
  return isEditable(getParent(el)); // contentEditable is set to 'inherit'
}

function nextEl (el) {
  return el.nextElementSibling || manually();
  function manually () {
    var sibling = el;
    do {
      sibling = sibling.nextSibling;
    } while (sibling && sibling.nodeType !== 1);
    return sibling;
  }
}

function getEventHost (e) {
  // on touchend event, we have to use `e.changedTouches`
  // see http://stackoverflow.com/questions/7192563/touchend-event-properties
  // see https://github.com/bevacqua/dragula/issues/34
  if (e.targetTouches && e.targetTouches.length) {
    return e.targetTouches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}

function getCoord (coord, e) {
  var host = getEventHost(e);
  var missMap = {
    pageX: 'clientX', // IE8
    pageY: 'clientY' // IE8
  };
  if (coord in missMap && !(coord in host) && missMap[coord] in host) {
    coord = missMap[coord];
  }
  return host[coord];
}

module.exports = dragula;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var si = typeof setImmediate === 'function', tick;
if (si) {
  tick = function (fn) { setImmediate(fn); };
} else {
  tick = function (fn) { setTimeout(fn, 0); };
}

module.exports = tick;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20).setImmediate))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = __webpack_require__(2);
var CardDeck = (function () {
    function CardDeck() {
        this.cardFiles = [[
                "ace_of_clubs.svg",
                "2_of_clubs.svg",
                "3_of_clubs.svg",
                "4_of_clubs.svg",
                "5_of_clubs.svg",
                "6_of_clubs.svg",
                "7_of_clubs.svg",
                "8_of_clubs.svg",
                "9_of_clubs.svg",
                "10_of_clubs.svg",
                "jack_of_clubs.svg",
                "queen_of_clubs.svg",
                "king_of_clubs.svg"
            ],
            ["ace_of_diamonds.svg",
                "2_of_diamonds.svg",
                "3_of_diamonds.svg",
                "4_of_diamonds.svg",
                "5_of_diamonds.svg",
                "6_of_diamonds.svg",
                "7_of_diamonds.svg",
                "8_of_diamonds.svg",
                "9_of_diamonds.svg",
                "10_of_diamonds.svg",
                "jack_of_diamonds.svg",
                "queen_of_diamonds.svg",
                "king_of_diamonds.svg"],
            ["ace_of_hearts.svg",
                "2_of_hearts.svg",
                "3_of_hearts.svg",
                "4_of_hearts.svg",
                "5_of_hearts.svg",
                "6_of_hearts.svg",
                "7_of_hearts.svg",
                "8_of_hearts.svg",
                "9_of_hearts.svg",
                "10_of_hearts.svg",
                "jack_of_hearts.svg",
                "queen_of_hearts.svg",
                "king_of_hearts.svg"],
            ["ace_of_spades.svg",
                "2_of_spades.svg",
                "3_of_spades.svg",
                "4_of_spades.svg",
                "5_of_spades.svg",
                "6_of_spades.svg",
                "7_of_spades.svg",
                "8_of_spades.svg",
                "9_of_spades.svg",
                "10_of_spades.svg",
                "jack_of_spades.svg",
                "queen_of_spades.svg",
                "king_of_spades.svg"]];
        this.Cards = new Array(52);
        var value = 1;
        var suite = 0;
        for (var i = 0; i < 52; i++) {
            var file = this.cardFiles[suite][value - 1];
            this.Cards[i] = new Card_1.Card(suite, value++, file);
            if (value == 14) {
                suite++;
                value = 1;
            }
        }
        for (var i = 0; i < 52; i++) {
            console.log(this.Cards[i].Suite + " " + this.Cards[i].Value);
        }
        this.shuffle();
        this.verify();
    }
    // Fisher-Yates algorithm
    CardDeck.prototype.shuffle = function () {
        for (var i = 0; i < this.Cards.length - 1; i++) {
            var rand = this.getRandomInt(i, this.Cards.length);
            var temp = this.Cards[i];
            this.Cards[i] = this.Cards[rand];
            this.Cards[rand] = temp;
        }
    };
    CardDeck.prototype.verify = function () {
        for (var i = 0; i < 52; i++) {
            console.log(this.Cards[i].Suite + " " + this.Cards[i].Value);
        }
        var values = {
            zero: [],
            one: [],
            two: [],
            three: []
        };
        for (var i = 0; i < 52; i++) {
            switch (this.Cards[i].Suite) {
                case 0:
                    values.zero.push(this.Cards[i].Value);
                    break;
                case 1:
                    values.one.push(this.Cards[i].Value);
                    break;
                case 2:
                    values.two.push(this.Cards[i].Value);
                    break;
                case 3:
                    values.three.push(this.Cards[i].Value);
                    break;
            }
        }
        console.log("clubs[" + values.zero.length + "] " + values.zero);
        console.log("diamonds[" + values.one.length + "] " + values.one);
        console.log("hearts[" + values.two.length + "] " + values.two);
        console.log("spades[" + values.three.length + "] " + values.three);
    };
    CardDeck.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    return CardDeck;
}());
exports.CardDeck = CardDeck;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CardPile_1 = __webpack_require__(1);
var FoundationCardPile = (function (_super) {
    __extends(FoundationCardPile, _super);
    function FoundationCardPile(suite, domId) {
        var _this = _super.call(this, domId) || this;
        _this.suite = suite;
        return _this;
    }
    FoundationCardPile.prototype.push = function (card) {
        card.setFanOffset(0);
        _super.prototype.push.call(this, card);
    };
    FoundationCardPile.prototype.canAcceptCard = function (card) {
        if (card.Suite != this.suite)
            return false;
        // no cards on the pile and the new card is an Ace
        if (this.cards.length == 0) {
            return card.Value == 1;
        }
        // greater than 0 cards on the pile and the new card's
        // value is one greater than the last card
        return this.cards.length > 0 && this.cards[this.cards.length - 1].Value == card.Value - 1;
    };
    return FoundationCardPile;
}(CardPile_1.CardPile));
exports.FoundationCardPile = FoundationCardPile;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CardPile_1 = __webpack_require__(1);
var Card_1 = __webpack_require__(2);
var TableauCardPile = (function (_super) {
    __extends(TableauCardPile, _super);
    function TableauCardPile(domId, fanOffset) {
        if (fanOffset === void 0) { fanOffset = 30; }
        var _this = _super.call(this, domId) || this;
        _this.fanOffset = fanOffset;
        _this.fanCards();
        return _this;
    }
    TableauCardPile.prototype.push = function (card) {
        _super.prototype.push.call(this, card);
        this.fanCards();
    };
    TableauCardPile.prototype.canAcceptCard = function (card) {
        // If there are no cards on the pile then a King can be dropped
        if (this.cards.length == 0)
            return card.Value == 13;
        var lastCard = this.cards[this.cards.length - 1];
        // return opposite colors and new cards value is one more
        // than last card's value
        return (Card_1.Card.isRed(lastCard.Suite) &&
            Card_1.Card.isBlack(card.Suite) &&
            card.Value == lastCard.Value - 1)
            ||
                (Card_1.Card.isBlack(lastCard.Suite) &&
                    Card_1.Card.isRed(card.Suite) &&
                    card.Value == lastCard.Value - 1);
    };
    TableauCardPile.prototype.fanCards = function () {
        var offset = 0;
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i].ShowingFace) {
                this.cards[i].setFanOffset(offset);
                offset += this.fanOffset;
            }
        }
    };
    return TableauCardPile;
}(CardPile_1.CardPile));
exports.TableauCardPile = TableauCardPile;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(4);
window["game"] = new Game_1.Game();
//process.exit(); 


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(18)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(19);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTQ1M2E5MTliZGYwOTIwMzEwOTAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9DYXJkUGlsZS50cyIsIndlYnBhY2s6Ly8vLi9DYXJkLnRzIiwid2VicGFjazovLy8uL1N1aXRlLnRzIiwid2VicGFjazovLy8uL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vfi9hdG9hL2F0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb250cmEvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb250cmEvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzIiwid2VicGFjazovLy8uL34vY3Jvc3N2ZW50L3NyYy9ldmVudG1hcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2N1c3RvbS1ldmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2RyYWd1bGEvY2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2RyYWd1bGEvZHJhZ3VsYS5qcyIsIndlYnBhY2s6Ly8vLi9+L3RpY2t5L3RpY2t5LWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vQ2FyZERlY2sudHMiLCJ3ZWJwYWNrOi8vLy4vRm91bmRhdGlvbkNhcmRQaWxlLnRzIiwid2VicGFjazovLy8uL1RhYmxlYXVDYXJkUGlsZS50cyIsIndlYnBhY2s6Ly8vLi9tYWluLnRzIiwid2VicGFjazovLy8od2VicGFjaykvfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUN6TEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxNDUzYTkxOWJkZjA5MjAzMTA5MCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge0NhcmR9IGZyb20gXCIuL0NhcmRcIlxuXG4vLyBBc3NvY2lhdGVzIGEgVUkgZWxlbWVudCBhbmQgYW4gYXJyYXkgb2YgY2FyZHMuIFRoZSBVSSBlbGVtZW50XG4vLyByZXByZXNlbnRzIHRoZSBsb2NhdGlvbiBvZiB0aGUgY2FyZCBvbiB0aGUgc2NyZWVuXG5leHBvcnQgY2xhc3MgQ2FyZFBpbGUge1xuICAgIHByb3RlY3RlZCBjYXJkczpBcnJheTxDYXJkPjtcbiAgICBwdWJsaWMgdWlFbGVtZW50OkhUTUxFbGVtZW50O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyBkb21JZDpzdHJpbmcpe1xuICAgICAgICB0aGlzLmNhcmRzID0gbmV3IEFycmF5PENhcmQ+KCk7XG4gICAgICAgIHRoaXMudWlFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9tSWQpO1xuICAgICAgICB0aGlzLnVpRWxlbWVudFsnY2FyZFBpbGUnXSA9IHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBwdXNoKGNhcmQ6Q2FyZCl7XG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChjYXJkKTtcbiAgICAgICAgdGhpcy51aUVsZW1lbnQuYXBwZW5kQ2hpbGQoY2FyZC51aUVsZW1lbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwb3AoKTpDYXJke1xuICAgICAgICBpZiAodGhpcy5jYXJkcy5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgdmFyIGNhcmQgPSB0aGlzLmNhcmRzLnBvcCgpO1xuXG4gICAgICAgIC8vIGRyYWd1bGEgcmVtb3ZlcyB0aGUgY2hpbGQgZWxlbWVudCBmcm9tIG91ciB1aUVsZW1lbnQncyBsaXN0XG4gICAgICAgIC8vIG9mIGNoaWxkcmVuXG4gICAgICAgIC8vIHRoaXMudWlFbGVtZW50LnJlbW92ZUNoaWxkKGNhcmQudWlFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuXG4gICAgcHVibGljIHBvcE11bHRpKGNvdW50Om51bWJlcik6QXJyYXk8Q2FyZD57XG4gICAgICAgIGlmIChjb3VudCA+IHRoaXMuY2FyZHMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuY2FyZHMuc2xpY2UodGhpcy5jYXJkcy5sZW5ndGgtY291bnQtMSwgY291bnQpO1xuXG4gICAgICAgIC8vIGRyYWd1bGEgcmVtb3ZlcyB0aGUgY2hpbGQgZWxlbWVudCBmcm9tIG91ciB1aUVsZW1lbnQncyBsaXN0XG4gICAgICAgIC8vIG9mIGNoaWxkcmVuXG4gICAgICAgIC8vIGZvcihsZXQgcG9wcGVkIG9mIHJlc3VsdCl7XG4gICAgICAgIC8vICAgICB0aGlzLnVpRWxlbWVudC5yZW1vdmVDaGlsZChwb3BwZWQudWlFbGVtZW50KTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93VG9wQ2FyZCgpe1xuICAgICAgICBpZiAodGhpcy5jYXJkcy5sZW5ndGggPT0wKSByZXR1cm47XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkcy5sZW5ndGgtMV0uc2hvd0ZhY2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VG9wQ2FyZCgpOkNhcmR7XG4gICAgICAgIGlmICh0aGlzLmNhcmRzLmxlbmd0aCA9PTApIHJldHVybjtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FyZHNbdGhpcy5jYXJkcy5sZW5ndGgtMV07XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NhcmRQaWxlLnRzIiwiaW1wb3J0IHtTdWl0ZX0gZnJvbSBcIi4vU3VpdGVcIlxuXG4vLyBhc3NvY2lhdGVzIGEgY2FyZCBzdWl0ZSBhbmQgdmFsdWUgd2l0aCBhIFVJIGVsZW1lbnRcbi8vIHRoYXQgcmVwcmVzZW50cyB0aGUgY2FyZFxuZXhwb3J0IGNsYXNzIENhcmR7XG4gICAgcHVibGljIHVpRWxlbWVudDpIVE1MRWxlbWVudDtcbiAgICBcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBTdWl0ZTpTdWl0ZSwgXG4gICAgICAgIHB1YmxpYyBWYWx1ZTpudW1iZXIsXG4gICAgICAgIHB1YmxpYyBJbWFnZUZpbGU6c3RyaW5nLFxuICAgICAgICBwdWJsaWMgU2hvd0ZhY2U6Ym9vbGVhbj1mYWxzZSxcbiAgICAgICAgcHVibGljIFNob3dpbmdGYWNlOmJvb2xlYW49ZmFsc2Upe1xuICAgICAgICAgICAgdGhpcy51aUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgdGhpcy51aUVsZW1lbnQuaWQgPSBgY2FyZC0ke3RoaXMuU3VpdGV9LSR7dGhpcy5WYWx1ZX1gO1xuICAgICAgICAgICAgdGhpcy51aUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjYXJkJyk7XG4gICAgICAgICAgICB0aGlzLnVpRWxlbWVudFsnY2FyZCddID0gdGhpcztcbiAgICAgICAgICAgIGlmICh0aGlzLlNob3dGYWNlKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGYWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0JhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0ZhY2UoKXtcbiAgICAgICAgdGhpcy5TaG93aW5nRmFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudWlFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgYC4vU1ZHLWNhcmRzLTEuMy8ke3RoaXMuSW1hZ2VGaWxlfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93QmFjaygpe1xuICAgICAgICB0aGlzLlNob3dpbmdGYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudWlFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vU1ZHLWNhcmRzLTEuMy9jYXJkLWJhY2stYXNzZXRzL2NhcmQtYmFjay5wbmcnKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHNldEZhbk9mZnNldChvZmZzZXRJblB4Om51bWJlcil7XG4gICAgICAgIHRoaXMudWlFbGVtZW50LnN0eWxlWyd0b3AnXSA9IGAke29mZnNldEluUHh9cHhgO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNSZWQoc3VpdGU6U3VpdGUpOmJvb2xlYW57XG4gICAgICAgIHJldHVybiBzdWl0ZSE9U3VpdGUuQ2x1YnMgJiYgc3VpdGUgIT0gU3VpdGUuU3BhZGVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNCbGFjayhzdWl0ZTpTdWl0ZSk6Ym9vbGVhbntcbiAgICAgICAgcmV0dXJuIHN1aXRlICE9IFN1aXRlLkRpYW1vbmRzICYmIHN1aXRlICE9IFN1aXRlLkhlYXJ0cztcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2FyZC50cyIsImV4cG9ydCBlbnVtIFN1aXRle1xuICAgIENsdWJzPTAsXG4gICAgRGlhbW9uZHMsXG4gICAgSGVhcnRzLFxuICAgIFNwYWRlc1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL1N1aXRlLnRzIiwiaW1wb3J0IHtDYXJkRGVja30gZnJvbSAnLi9DYXJkRGVjaydcbmltcG9ydCB7Q2FyZFBpbGV9IGZyb20gJy4vQ2FyZFBpbGUnXG5pbXBvcnQge0ZvdW5kYXRpb25DYXJkUGlsZX0gZnJvbSAnLi9Gb3VuZGF0aW9uQ2FyZFBpbGUnXG5pbXBvcnQge1RhYmxlYXVDYXJkUGlsZX0gZnJvbSAnLi9UYWJsZWF1Q2FyZFBpbGUnXG5pbXBvcnQge0NhcmR9IGZyb20gJy4vQ2FyZCdcbmltcG9ydCB7U3VpdGV9IGZyb20gJy4vU3VpdGUnXG5pbXBvcnQgKiBhcyBkcmFndWxhRXhwIGZyb20gJ2RyYWd1bGEnXG5cbmV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgICBwcml2YXRlIGNhcmREZWNrOiBDYXJkRGVjaztcbiAgICBwcml2YXRlIHN0b2NrOiBDYXJkUGlsZTtcbiAgICBwcml2YXRlIHdhc3RlOiBDYXJkUGlsZTtcbiAgICBwcml2YXRlIGZvdW5kYXRpb25zOiBBcnJheTxGb3VuZGF0aW9uQ2FyZFBpbGU+O1xuICAgIHByaXZhdGUgdGFibGVhdTogQXJyYXk8VGFibGVhdUNhcmRQaWxlPlxuICAgIHByaXZhdGUgZHJhZ3VsYTogZHJhZ3VsYUV4cC5EcmFrZTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmNhcmREZWNrID0gbmV3IENhcmREZWNrKCk7XG4gICAgICAgIHRoaXMuc3RvY2sgPSBuZXcgQ2FyZFBpbGUoXCJzdG9ja1wiKTtcbiAgICAgICAgdGhpcy53YXN0ZSA9IG5ldyBDYXJkUGlsZShcIndhc3RlXCIpO1xuICAgICAgICB0aGlzLmZvdW5kYXRpb25zID0gbmV3IEFycmF5PEZvdW5kYXRpb25DYXJkUGlsZT4oKTtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9ucy5wdXNoKG5ldyBGb3VuZGF0aW9uQ2FyZFBpbGUoU3VpdGUuSGVhcnRzLCBcImZvdW5kYXRpb24taGVhcnRzXCIpKTtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9ucy5wdXNoKG5ldyBGb3VuZGF0aW9uQ2FyZFBpbGUoU3VpdGUuRGlhbW9uZHMsXCJmb3VuZGF0aW9uLWRpYW1vbmRzXCIpKTtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9ucy5wdXNoKG5ldyBGb3VuZGF0aW9uQ2FyZFBpbGUoU3VpdGUuQ2x1YnMsXCJmb3VuZGF0aW9uLWNsdWJzXCIpKTtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9ucy5wdXNoKG5ldyBGb3VuZGF0aW9uQ2FyZFBpbGUoU3VpdGUuU3BhZGVzLCBcImZvdW5kYXRpb24tc3BhZGVzXCIpKTtcbiAgICAgICAgdGhpcy50YWJsZWF1ID0gbmV3IEFycmF5PFRhYmxlYXVDYXJkUGlsZT4oKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8NzsgaSsrKSB0aGlzLnRhYmxlYXUucHVzaChuZXcgVGFibGVhdUNhcmRQaWxlKGB0YWJsZWF1LSR7aSsxfWApKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGVhbCgpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGRlYWwoKXtcbiAgICAgICAgLy8gZGVhbCBjYXJkcyBpbnRvIHRoZSByaWdodCBwaWxlc1xuICAgICAgICBsZXQgdGFibGVhdUlkeCA9IDA7XG4gICAgICAgIGxldCB0YWJsZWF1Q291bnRzID0gWzEsMiwzLDQsNSw2LDddXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPDUyOyBpKyspe1xuICAgICAgICAgICAgaWYgKHRhYmxlYXVJZHggPCA3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZWF1W3RhYmxlYXVJZHhdLnB1c2godGhpcy5jYXJkRGVjay5DYXJkc1tpXSk7XG4gICAgICAgICAgICAgICAgdGFibGVhdUNvdW50c1t0YWJsZWF1SWR4XS0tO1xuXG4gICAgICAgICAgICAgICAgaWYodGFibGVhdUNvdW50c1t0YWJsZWF1SWR4XT09MCkgdGFibGVhdUlkeCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b2NrLnB1c2godGhpcy5jYXJkRGVjay5DYXJkc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgdXAgZHJhZyBhbmQgZHJvcFxuICAgICAgICB2YXIgYXIgPSBbXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnN0b2NrLmRvbUlkKSxcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMud2FzdGUuZG9tSWQpLFxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mb3VuZGF0aW9uc1swXS5kb21JZCksXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZvdW5kYXRpb25zWzFdLmRvbUlkKSxcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZm91bmRhdGlvbnNbMl0uZG9tSWQpLFxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mb3VuZGF0aW9uc1szXS5kb21JZCksXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnRhYmxlYXVbMF0uZG9tSWQpLFxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy50YWJsZWF1WzFdLmRvbUlkKSxcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudGFibGVhdVsyXS5kb21JZCksXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnRhYmxlYXVbM10uZG9tSWQpLFxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy50YWJsZWF1WzRdLmRvbUlkKSxcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudGFibGVhdVs1XS5kb21JZCksXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnRhYmxlYXVbNl0uZG9tSWQpXG4gICAgICAgXTtcbiAgICAgICAgdGhpcy5kcmFndWxhID0gZHJhZ3VsYUV4cChhciwge1xuICAgICAgICAgICBhY2NlcHRzOiAoZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nKSA9PiB0aGlzLmFjY2VwdHMoZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nKVxuICAgICAgIH0pO1xuXG4gICAgICAgdGhpcy5kcmFndWxhLm9uKCdkcm9wJywgKGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZykgPT4gdGhpcy5oYW5kbGVEcm9wcGVkKGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZykpO1xuXG4gICAgICAgdGhpcy5zdG9jay5zaG93VG9wQ2FyZCgpO1xuICAgICAgIGZvciAodmFyIGkgPSAwOyBpPDc7IGkrKykge1xuICAgICAgICAgICB0aGlzLnRhYmxlYXVbaV0uc2hvd1RvcENhcmQoKTtcbiAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVEcm9wcGVkKGVsOkhUTUxFbGVtZW50LCB0YXJnZXQ6SFRNTEVsZW1lbnQsIHNvdXJjZTpIVE1MRWxlbWVudCwgc2libGluZzpIVE1MRWxlbWVudCl7XG4gICAgICAgIGxldCByZW1vdmVkID0gdGhpcy5yZW1vdmVDYXJkRnJvbVBpbGUoZWwsIHNvdXJjZSk7XG4gICAgICAgIHRoaXMuYWRkQ2FyZFRvUGlsZShyZW1vdmVkLCB0YXJnZXQpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGNhbGxlZCBkdXJpbmcgZHJhZyB0byBzZWUgaWYgZHJvcCB3aWxsIGJlIGFsbG93ZWRcbiAgICBwcml2YXRlIGFjY2VwdHMoZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nKTpCb29sZWFue1xuICAgICAgICB2YXIgY2FyZCA9IEdhbWUuY2FyZEZyb21FbChlbCk7XG4gICAgICAgIGxldCByZXN1bHQ6Qm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgcmVzdWx0ID0gY2FyZCAhPSBudWxsICYmXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgKEdhbWUuaXNUYWJsZWF1KHRhcmdldCkgJiYgdGhpcy5jYW5Ecm9wT25UYWJsZWF1KGNhcmQsIHRhcmdldCkpIHx8XG4gICAgICAgICAgICAgICAgKEdhbWUuaXNGb3VuZGF0aW9uKHRhcmdldCkgJiYgdGhpcy5jYW5Ecm9wT25Gb3VuZGF0aW9uKGNhcmQsIHRhcmdldCkpIHx8XG4gICAgICAgICAgICAgICAgKEdhbWUuaXNTdG9jayhzb3VyY2UpICYmIEdhbWUuaXNXYXN0ZSh0YXJnZXQpKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnByaW50QWNjZXB0c0RpYWdub3N0aWMocmVzdWx0LCBjYXJkLCB0YXJnZXQsIHNvdXJjZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHJlbW92ZUNhcmRGcm9tUGlsZShjYXJkRWw6SFRNTEVsZW1lbnQsIHBpbGVFbDpIVE1MRWxlbWVudCk6Q2FyZFxuICAgIHtcbiAgICAgICAgdmFyIHNyY0NhcmQgPSBHYW1lLmNhcmRGcm9tRWwoY2FyZEVsKTtcbiAgICAgICAgdmFyIHBpbGUgPSB0aGlzLmNhcmRQaWxlRnJvbUVsKHBpbGVFbCk7XG4gICAgICAgIGlmIChwaWxlICYmIHNyY0NhcmQpe1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHBpbGUucG9wKCk7XG4gICAgICAgICAgICBwaWxlLnNob3dUb3BDYXJkKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ2FyZFRvUGlsZShjYXJkOkNhcmQsIHBpbGVFbDpIVE1MRWxlbWVudClcbiAgICB7XG4gICAgICAgIHZhciBjYXJkUGlsZSA9IHRoaXMuY2FyZFBpbGVGcm9tRWwocGlsZUVsKTtcbiAgICAgICAgaWYgKGNhcmRQaWxlKXsgY2FyZFBpbGUucHVzaChjYXJkKTsgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FuRHJvcE9uVGFibGVhdShjYXJkOkNhcmQsIHRhcmc6SFRNTEVsZW1lbnQpOkJvb2xlYW57XG4gICAgICAgIHZhciBjYXJkUGlsZSA9IHRoaXMudGFibGVhdUZyb21FbCh0YXJnKTtcbiAgICAgICAgaWYgKCFjYXJkUGlsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gY2FyZFBpbGUuY2FuQWNjZXB0Q2FyZChjYXJkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhcmRQaWxlRnJvbUVsKHBpbGVFbDpIVE1MRWxlbWVudCk6Q2FyZFBpbGV7XG4gICAgICAgIGxldCBwaWxlOkNhcmRQaWxlID0gdGhpcy5mb3VuZGF0aW9uRnJvbUVsKHBpbGVFbCk7XG4gICAgICAgIGlmIChwaWxlKSByZXR1cm4gcGlsZTtcblxuICAgICAgICBwaWxlID0gIHRoaXMudGFibGVhdUZyb21FbChwaWxlRWwpO1xuICAgICAgICBpZiAocGlsZSkgcmV0dXJuIHBpbGU7XG5cbiAgICAgICAgcGlsZSA9IHRoaXMuc3RvY2tGcm9tRWwocGlsZUVsKTtcbiAgICAgICAgaWYgKHBpbGUpIHJldHVybiBwaWxlO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMud2FzdGVGcm9tRWwocGlsZUVsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvdW5kYXRpb25Gcm9tRWwoZWw6SFRNTEVsZW1lbnQpOkZvdW5kYXRpb25DYXJkUGlsZVxuICAgIHtcbiAgICAgICAgdmFyIGVscyA9IGVsLmlkLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgbGV0IGlkOm51bWJlciA9IC0xO1xuICAgICAgICBzd2l0Y2goZWxzWzFdKXtcbiAgICAgICAgICAgIGNhc2UgXCJoZWFydHNcIjpcbiAgICAgICAgICAgICAgICBpZD0wO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRpYW1vbmRzXCI6XG4gICAgICAgICAgICAgICAgaWQ9MTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjbHVic1wiOlxuICAgICAgICAgICAgICAgIGlkPTI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3BhZGVzXCI6XG4gICAgICAgICAgICAgICAgaWQ9MztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkID09IC0xKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm91bmRhdGlvbnNbaWRdOyBcbiAgICB9XG5cbiAgICBwcml2YXRlIHRhYmxlYXVGcm9tRWwoZWw6SFRNTEVsZW1lbnQpOlRhYmxlYXVDYXJkUGlsZVxuICAgIHtcbiAgICAgICAgdmFyIGVscyA9IGVsLmlkLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgdmFyIGlkID0gcGFyc2VJbnQoZWxzWzFdKTtcbiAgICAgICAgaWQgLT0gMTtcbiAgICAgICAgaWYgKGlkIDwgMCB8fCBpZCA+IDYpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciBjYXJkUGlsZSA9IHRoaXMudGFibGVhdVtpZF07XG4gICAgICAgIHJldHVybiBjYXJkUGlsZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b2NrRnJvbUVsKGVsOkhUTUxFbGVtZW50KTpDYXJkUGlsZXtcbiAgICAgICAgaWYgKEdhbWUuaXNTdG9jayhlbCkpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvY2s7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAgcHJpdmF0ZSB3YXN0ZUZyb21FbChlbDpIVE1MRWxlbWVudCk6Q2FyZFBpbGV7XG4gICAgICAgIGlmIChHYW1lLmlzV2FzdGUoZWwpKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndhc3RlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYW5Ecm9wT25Gb3VuZGF0aW9uKGNhcmQ6Q2FyZCwgdGFyZzpIVE1MRWxlbWVudCk6Qm9vbGVhbntcbiAgICAgICAgdmFyIGNhcmRQaWxlID0gdGhpcy5mb3VuZGF0aW9uRnJvbUVsKHRhcmcpO1xuICAgICAgICBpZiAoIWNhcmRQaWxlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIGNhcmRQaWxlLmNhbkFjY2VwdENhcmQoY2FyZCk7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIGlzVGFibGVhdShlbDpIVE1MRWxlbWVudCk6Qm9vbGVhbntcbiAgICAgICAgcmV0dXJuIEdhbWUuaXNFbE9mVHlwZShlbCwgXCJ0YWJsZWF1XCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGlzRm91bmRhdGlvbihlbDpIVE1MRWxlbWVudCk6Qm9vbGVhbntcbiAgICAgICAgcmV0dXJuIEdhbWUuaXNFbE9mVHlwZShlbCwgXCJmb3VuZGF0aW9uXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGlzU3RvY2soZWw6SFRNTEVsZW1lbnQpOkJvb2xlYW57XG4gICAgICAgIHJldHVybiBHYW1lLmlzRWxPZlR5cGUoZWwsIFwic3RvY2tcIik7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc3RhdGljIGlzV2FzdGUoZWw6SFRNTEVsZW1lbnQpOkJvb2xlYW57XG4gICAgICAgIHJldHVybiBHYW1lLmlzRWxPZlR5cGUoZWwsIFwid2FzdGVcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNFbE9mVHlwZShlbDpIVE1MRWxlbWVudCwgdHlwZTpzdHJpbmcpOkJvb2xlYW57XG4gICAgICAgICAgICBpZiAoZWwuaWQpe1xuICAgICAgICAgICAgdmFyIGVscyA9IGVsLmlkLnNwbGl0KFwiLVwiKVxuICAgICAgICAgICAgcmV0dXJuIGVsc1swXT09PXR5cGU7IFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjYXJkRnJvbUVsKGVsOkhUTUxFbGVtZW50KTpDYXJke1xuICAgICAgICB2YXIgZWxzID0gZWwuaWQuc3BsaXQoXCItXCIpO1xuICAgICAgICBpZiAoZWxzWzBdPT09J2NhcmQnKXtcbiAgICAgICAgICAgIHJldHVybiBlbFsnY2FyZCddO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJpbnRBY2NlcHRzRGlhZ25vc3RpYyhyZXN1bHQ6Qm9vbGVhbiwgY2FyZDpDYXJkLCB0YXJnZXQ6SFRNTEVsZW1lbnQsIHNvdXJjZTpIVE1MRWxlbWVudCl7XG4gICAgICAgIHZhciB0YXJnZXRQaWxlID0gdGhpcy5jYXJkUGlsZUZyb21FbCh0YXJnZXQpO1xuICAgICAgICB2YXIgdGFyZ2V0VG9wID0gdGFyZ2V0UGlsZSA/IHRhcmdldFBpbGUuZ2V0VG9wQ2FyZCgpIDogbnVsbDtcbiAgICAgICAgdmFyIHRvcFN0cmluZyA9IHRhcmdldFRvcCA/IGAke3RhcmdldFRvcC5TdWl0ZX06JHt0YXJnZXRUb3AuVmFsdWV9YDpcIm51bGxcIjtcbiAgICAgICAgY29uc29sZS5sb2cgKGAke3Jlc3VsdD8nY2FuJzonY2Fubm90J30gZHJvcCAke2NhcmQuU3VpdGV9OiR7Y2FyZC5WYWx1ZX0gb24gJHt0YXJnZXQuaWR9ICR7dG9wU3RyaW5nfSBmcm9tICR7c291cmNlLmlkfWApO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9HYW1lLnRzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhdG9hIChhLCBuKSB7IHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhLCBuKTsgfVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F0b2EvYXRvYS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB0aWNreSA9IHJlcXVpcmUoJ3RpY2t5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVib3VuY2UgKGZuLCBhcmdzLCBjdHgpIHtcbiAgaWYgKCFmbikgeyByZXR1cm47IH1cbiAgdGlja3koZnVuY3Rpb24gcnVuICgpIHtcbiAgICBmbi5hcHBseShjdHggfHwgbnVsbCwgYXJncyB8fCBbXSk7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb250cmEvZGVib3VuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXRvYSA9IHJlcXVpcmUoJ2F0b2EnKTtcbnZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbWl0dGVyICh0aGluZywgb3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBldnQgPSB7fTtcbiAgaWYgKHRoaW5nID09PSB1bmRlZmluZWQpIHsgdGhpbmcgPSB7fTsgfVxuICB0aGluZy5vbiA9IGZ1bmN0aW9uICh0eXBlLCBmbikge1xuICAgIGlmICghZXZ0W3R5cGVdKSB7XG4gICAgICBldnRbdHlwZV0gPSBbZm5dO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnRbdHlwZV0ucHVzaChmbik7XG4gICAgfVxuICAgIHJldHVybiB0aGluZztcbiAgfTtcbiAgdGhpbmcub25jZSA9IGZ1bmN0aW9uICh0eXBlLCBmbikge1xuICAgIGZuLl9vbmNlID0gdHJ1ZTsgLy8gdGhpbmcub2ZmKGZuKSBzdGlsbCB3b3JrcyFcbiAgICB0aGluZy5vbih0eXBlLCBmbik7XG4gICAgcmV0dXJuIHRoaW5nO1xuICB9O1xuICB0aGluZy5vZmYgPSBmdW5jdGlvbiAodHlwZSwgZm4pIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGMgPT09IDEpIHtcbiAgICAgIGRlbGV0ZSBldnRbdHlwZV07XG4gICAgfSBlbHNlIGlmIChjID09PSAwKSB7XG4gICAgICBldnQgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGV0ID0gZXZ0W3R5cGVdO1xuICAgICAgaWYgKCFldCkgeyByZXR1cm4gdGhpbmc7IH1cbiAgICAgIGV0LnNwbGljZShldC5pbmRleE9mKGZuKSwgMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGluZztcbiAgfTtcbiAgdGhpbmcuZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IGF0b2EoYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdGhpbmcuZW1pdHRlclNuYXBzaG90KGFyZ3Muc2hpZnQoKSkuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG4gIHRoaW5nLmVtaXR0ZXJTbmFwc2hvdCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgdmFyIGV0ID0gKGV2dFt0eXBlXSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhcmdzID0gYXRvYShhcmd1bWVudHMpO1xuICAgICAgdmFyIGN0eCA9IHRoaXMgfHwgdGhpbmc7XG4gICAgICBpZiAodHlwZSA9PT0gJ2Vycm9yJyAmJiBvcHRzLnRocm93cyAhPT0gZmFsc2UgJiYgIWV0Lmxlbmd0aCkgeyB0aHJvdyBhcmdzLmxlbmd0aCA9PT0gMSA/IGFyZ3NbMF0gOiBhcmdzOyB9XG4gICAgICBldC5mb3JFYWNoKGZ1bmN0aW9uIGVtaXR0ZXIgKGxpc3Rlbikge1xuICAgICAgICBpZiAob3B0cy5hc3luYykgeyBkZWJvdW5jZShsaXN0ZW4sIGFyZ3MsIGN0eCk7IH0gZWxzZSB7IGxpc3Rlbi5hcHBseShjdHgsIGFyZ3MpOyB9XG4gICAgICAgIGlmIChsaXN0ZW4uX29uY2UpIHsgdGhpbmcub2ZmKHR5cGUsIGxpc3Rlbik7IH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaW5nO1xuICAgIH07XG4gIH07XG4gIHJldHVybiB0aGluZztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29udHJhL2VtaXR0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3VzdG9tRXZlbnQgPSByZXF1aXJlKCdjdXN0b20tZXZlbnQnKTtcbnZhciBldmVudG1hcCA9IHJlcXVpcmUoJy4vZXZlbnRtYXAnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgYWRkRXZlbnQgPSBhZGRFdmVudEVhc3k7XG52YXIgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEVhc3k7XG52YXIgaGFyZENhY2hlID0gW107XG5cbmlmICghZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgYWRkRXZlbnQgPSBhZGRFdmVudEhhcmQ7XG4gIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRIYXJkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRFdmVudCxcbiAgcmVtb3ZlOiByZW1vdmVFdmVudCxcbiAgZmFicmljYXRlOiBmYWJyaWNhdGVFdmVudFxufTtcblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgbGlzdGVuZXIgPSB1bndyYXAoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGxpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGVsLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlLCBtb2RlbCkge1xuICB2YXIgZSA9IGV2ZW50bWFwLmluZGV4T2YodHlwZSkgPT09IC0xID8gbWFrZUN1c3RvbUV2ZW50KCkgOiBtYWtlQ2xhc3NpY0V2ZW50KCk7XG4gIGlmIChlbC5kaXNwYXRjaEV2ZW50KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDbGFzc2ljRXZlbnQgKCkge1xuICAgIHZhciBlO1xuICAgIGlmIChkb2MuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ3VzdG9tRXZlbnQgKCkge1xuICAgIHJldHVybiBuZXcgY3VzdG9tRXZlbnQodHlwZSwgeyBkZXRhaWw6IG1vZGVsIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGUud2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBmbi5jYWxsKGVsLCBlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciB3cmFwcGVyID0gdW53cmFwKGVsLCB0eXBlLCBmbikgfHwgd3JhcHBlckZhY3RvcnkoZWwsIHR5cGUsIGZuKTtcbiAgaGFyZENhY2hlLnB1c2goe1xuICAgIHdyYXBwZXI6IHdyYXBwZXIsXG4gICAgZWxlbWVudDogZWwsXG4gICAgdHlwZTogdHlwZSxcbiAgICBmbjogZm5cbiAgfSk7XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiB1bndyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSA9IGZpbmQoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgd3JhcHBlciA9IGhhcmRDYWNoZVtpXS53cmFwcGVyO1xuICAgIGhhcmRDYWNoZS5zcGxpY2UoaSwgMSk7IC8vIGZyZWUgdXAgYSB0YWQgb2YgbWVtb3J5XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpLCBpdGVtO1xuICBmb3IgKGkgPSAwOyBpIDwgaGFyZENhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbSA9IGhhcmRDYWNoZVtpXTtcbiAgICBpZiAoaXRlbS5lbGVtZW50ID09PSBlbCAmJiBpdGVtLnR5cGUgPT09IHR5cGUgJiYgaXRlbS5mbiA9PT0gZm4pIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGV2ZW50bWFwID0gW107XG52YXIgZXZlbnRuYW1lID0gJyc7XG52YXIgcm9uID0gL15vbi87XG5cbmZvciAoZXZlbnRuYW1lIGluIGdsb2JhbCkge1xuICBpZiAocm9uLnRlc3QoZXZlbnRuYW1lKSkge1xuICAgIGV2ZW50bWFwLnB1c2goZXZlbnRuYW1lLnNsaWNlKDIpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV2ZW50bWFwO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nyb3NzdmVudC9zcmMvZXZlbnRtYXAuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG52YXIgTmF0aXZlQ3VzdG9tRXZlbnQgPSBnbG9iYWwuQ3VzdG9tRXZlbnQ7XG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZSAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHAgPSBuZXcgTmF0aXZlQ3VzdG9tRXZlbnQoJ2NhdCcsIHsgZGV0YWlsOiB7IGZvbzogJ2JhcicgfSB9KTtcbiAgICByZXR1cm4gICdjYXQnID09PSBwLnR5cGUgJiYgJ2JhcicgPT09IHAuZGV0YWlsLmZvbztcbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDcm9zcy1icm93c2VyIGBDdXN0b21FdmVudGAgY29uc3RydWN0b3IuXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50LkN1c3RvbUV2ZW50XG4gKlxuICogQHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdXNlTmF0aXZlKCkgPyBOYXRpdmVDdXN0b21FdmVudCA6XG5cbi8vIElFID49IDlcbidmdW5jdGlvbicgPT09IHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFdmVudCA/IGZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgaWYgKHBhcmFtcykge1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gIH0gZWxzZSB7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlLCB2b2lkIDApO1xuICB9XG4gIHJldHVybiBlO1xufSA6XG5cbi8vIElFIDw9IDhcbmZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICBlLnR5cGUgPSB0eXBlO1xuICBpZiAocGFyYW1zKSB7XG4gICAgZS5idWJibGVzID0gQm9vbGVhbihwYXJhbXMuYnViYmxlcyk7XG4gICAgZS5jYW5jZWxhYmxlID0gQm9vbGVhbihwYXJhbXMuY2FuY2VsYWJsZSk7XG4gICAgZS5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICB9IGVsc2Uge1xuICAgIGUuYnViYmxlcyA9IGZhbHNlO1xuICAgIGUuY2FuY2VsYWJsZSA9IGZhbHNlO1xuICAgIGUuZGV0YWlsID0gdm9pZCAwO1xuICB9XG4gIHJldHVybiBlO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2N1c3RvbS1ldmVudC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FjaGUgPSB7fTtcbnZhciBzdGFydCA9ICcoPzpefFxcXFxzKSc7XG52YXIgZW5kID0gJyg/OlxcXFxzfCQpJztcblxuZnVuY3Rpb24gbG9va3VwQ2xhc3MgKGNsYXNzTmFtZSkge1xuICB2YXIgY2FjaGVkID0gY2FjaGVbY2xhc3NOYW1lXTtcbiAgaWYgKGNhY2hlZCkge1xuICAgIGNhY2hlZC5sYXN0SW5kZXggPSAwO1xuICB9IGVsc2Uge1xuICAgIGNhY2hlW2NsYXNzTmFtZV0gPSBjYWNoZWQgPSBuZXcgUmVnRXhwKHN0YXJ0ICsgY2xhc3NOYW1lICsgZW5kLCAnZycpO1xuICB9XG4gIHJldHVybiBjYWNoZWQ7XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzIChlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBjdXJyZW50ID0gZWwuY2xhc3NOYW1lO1xuICBpZiAoIWN1cnJlbnQubGVuZ3RoKSB7XG4gICAgZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICB9IGVsc2UgaWYgKCFsb29rdXBDbGFzcyhjbGFzc05hbWUpLnRlc3QoY3VycmVudCkpIHtcbiAgICBlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJtQ2xhc3MgKGVsLCBjbGFzc05hbWUpIHtcbiAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobG9va3VwQ2xhc3MoY2xhc3NOYW1lKSwgJyAnKS50cmltKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZENsYXNzLFxuICBybTogcm1DbGFzc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9kcmFndWxhL2NsYXNzZXMuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVtaXR0ZXIgPSByZXF1aXJlKCdjb250cmEvZW1pdHRlcicpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL2NsYXNzZXMnKTtcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBkb2N1bWVudEVsZW1lbnQgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG5mdW5jdGlvbiBkcmFndWxhIChpbml0aWFsQ29udGFpbmVycywgb3B0aW9ucykge1xuICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgaWYgKGxlbiA9PT0gMSAmJiBBcnJheS5pc0FycmF5KGluaXRpYWxDb250YWluZXJzKSA9PT0gZmFsc2UpIHtcbiAgICBvcHRpb25zID0gaW5pdGlhbENvbnRhaW5lcnM7XG4gICAgaW5pdGlhbENvbnRhaW5lcnMgPSBbXTtcbiAgfVxuICB2YXIgX21pcnJvcjsgLy8gbWlycm9yIGltYWdlXG4gIHZhciBfc291cmNlOyAvLyBzb3VyY2UgY29udGFpbmVyXG4gIHZhciBfaXRlbTsgLy8gaXRlbSBiZWluZyBkcmFnZ2VkXG4gIHZhciBfb2Zmc2V0WDsgLy8gcmVmZXJlbmNlIHhcbiAgdmFyIF9vZmZzZXRZOyAvLyByZWZlcmVuY2UgeVxuICB2YXIgX21vdmVYOyAvLyByZWZlcmVuY2UgbW92ZSB4XG4gIHZhciBfbW92ZVk7IC8vIHJlZmVyZW5jZSBtb3ZlIHlcbiAgdmFyIF9pbml0aWFsU2libGluZzsgLy8gcmVmZXJlbmNlIHNpYmxpbmcgd2hlbiBncmFiYmVkXG4gIHZhciBfY3VycmVudFNpYmxpbmc7IC8vIHJlZmVyZW5jZSBzaWJsaW5nIG5vd1xuICB2YXIgX2NvcHk7IC8vIGl0ZW0gdXNlZCBmb3IgY29weWluZ1xuICB2YXIgX3JlbmRlclRpbWVyOyAvLyB0aW1lciBmb3Igc2V0VGltZW91dCByZW5kZXJNaXJyb3JJbWFnZVxuICB2YXIgX2xhc3REcm9wVGFyZ2V0ID0gbnVsbDsgLy8gbGFzdCBjb250YWluZXIgaXRlbSB3YXMgb3ZlclxuICB2YXIgX2dyYWJiZWQ7IC8vIGhvbGRzIG1vdXNlZG93biBjb250ZXh0IHVudGlsIGZpcnN0IG1vdXNlbW92ZVxuXG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKG8ubW92ZXMgPT09IHZvaWQgMCkgeyBvLm1vdmVzID0gYWx3YXlzOyB9XG4gIGlmIChvLmFjY2VwdHMgPT09IHZvaWQgMCkgeyBvLmFjY2VwdHMgPSBhbHdheXM7IH1cbiAgaWYgKG8uaW52YWxpZCA9PT0gdm9pZCAwKSB7IG8uaW52YWxpZCA9IGludmFsaWRUYXJnZXQ7IH1cbiAgaWYgKG8uY29udGFpbmVycyA9PT0gdm9pZCAwKSB7IG8uY29udGFpbmVycyA9IGluaXRpYWxDb250YWluZXJzIHx8IFtdOyB9XG4gIGlmIChvLmlzQ29udGFpbmVyID09PSB2b2lkIDApIHsgby5pc0NvbnRhaW5lciA9IG5ldmVyOyB9XG4gIGlmIChvLmNvcHkgPT09IHZvaWQgMCkgeyBvLmNvcHkgPSBmYWxzZTsgfVxuICBpZiAoby5jb3B5U29ydFNvdXJjZSA9PT0gdm9pZCAwKSB7IG8uY29weVNvcnRTb3VyY2UgPSBmYWxzZTsgfVxuICBpZiAoby5yZXZlcnRPblNwaWxsID09PSB2b2lkIDApIHsgby5yZXZlcnRPblNwaWxsID0gZmFsc2U7IH1cbiAgaWYgKG8ucmVtb3ZlT25TcGlsbCA9PT0gdm9pZCAwKSB7IG8ucmVtb3ZlT25TcGlsbCA9IGZhbHNlOyB9XG4gIGlmIChvLmRpcmVjdGlvbiA9PT0gdm9pZCAwKSB7IG8uZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJzsgfVxuICBpZiAoby5pZ25vcmVJbnB1dFRleHRTZWxlY3Rpb24gPT09IHZvaWQgMCkgeyBvLmlnbm9yZUlucHV0VGV4dFNlbGVjdGlvbiA9IHRydWU7IH1cbiAgaWYgKG8ubWlycm9yQ29udGFpbmVyID09PSB2b2lkIDApIHsgby5taXJyb3JDb250YWluZXIgPSBkb2MuYm9keTsgfVxuXG4gIHZhciBkcmFrZSA9IGVtaXR0ZXIoe1xuICAgIGNvbnRhaW5lcnM6IG8uY29udGFpbmVycyxcbiAgICBzdGFydDogbWFudWFsU3RhcnQsXG4gICAgZW5kOiBlbmQsXG4gICAgY2FuY2VsOiBjYW5jZWwsXG4gICAgcmVtb3ZlOiByZW1vdmUsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBjYW5Nb3ZlOiBjYW5Nb3ZlLFxuICAgIGRyYWdnaW5nOiBmYWxzZVxuICB9KTtcblxuICBpZiAoby5yZW1vdmVPblNwaWxsID09PSB0cnVlKSB7XG4gICAgZHJha2Uub24oJ292ZXInLCBzcGlsbE92ZXIpLm9uKCdvdXQnLCBzcGlsbE91dCk7XG4gIH1cblxuICBldmVudHMoKTtcblxuICByZXR1cm4gZHJha2U7XG5cbiAgZnVuY3Rpb24gaXNDb250YWluZXIgKGVsKSB7XG4gICAgcmV0dXJuIGRyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZihlbCkgIT09IC0xIHx8IG8uaXNDb250YWluZXIoZWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZXZlbnRzIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIHRvdWNoeShkb2N1bWVudEVsZW1lbnQsIG9wLCAnbW91c2Vkb3duJywgZ3JhYik7XG4gICAgdG91Y2h5KGRvY3VtZW50RWxlbWVudCwgb3AsICdtb3VzZXVwJywgcmVsZWFzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBldmVudHVhbE1vdmVtZW50cyAocmVtb3ZlKSB7XG4gICAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgICB0b3VjaHkoZG9jdW1lbnRFbGVtZW50LCBvcCwgJ21vdXNlbW92ZScsIHN0YXJ0QmVjYXVzZU1vdXNlTW92ZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZW1lbnRzIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0oZG9jdW1lbnRFbGVtZW50LCAnc2VsZWN0c3RhcnQnLCBwcmV2ZW50R3JhYmJlZCk7IC8vIElFOFxuICAgIGNyb3NzdmVudFtvcF0oZG9jdW1lbnRFbGVtZW50LCAnY2xpY2snLCBwcmV2ZW50R3JhYmJlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBldmVudHModHJ1ZSk7XG4gICAgcmVsZWFzZSh7fSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcmV2ZW50R3JhYmJlZCAoZSkge1xuICAgIGlmIChfZ3JhYmJlZCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdyYWIgKGUpIHtcbiAgICBfbW92ZVggPSBlLmNsaWVudFg7XG4gICAgX21vdmVZID0gZS5jbGllbnRZO1xuXG4gICAgdmFyIGlnbm9yZSA9IHdoaWNoTW91c2VCdXR0b24oZSkgIT09IDEgfHwgZS5tZXRhS2V5IHx8IGUuY3RybEtleTtcbiAgICBpZiAoaWdub3JlKSB7XG4gICAgICByZXR1cm47IC8vIHdlIG9ubHkgY2FyZSBhYm91dCBob25lc3QtdG8tZ29kIGxlZnQgY2xpY2tzIGFuZCB0b3VjaCBldmVudHNcbiAgICB9XG4gICAgdmFyIGl0ZW0gPSBlLnRhcmdldDtcbiAgICB2YXIgY29udGV4dCA9IGNhblN0YXJ0KGl0ZW0pO1xuICAgIGlmICghY29udGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBfZ3JhYmJlZCA9IGNvbnRleHQ7XG4gICAgZXZlbnR1YWxNb3ZlbWVudHMoKTtcbiAgICBpZiAoZS50eXBlID09PSAnbW91c2Vkb3duJykge1xuICAgICAgaWYgKGlzSW5wdXQoaXRlbSkpIHsgLy8gc2VlIGFsc286IGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhL2lzc3Vlcy8yMDhcbiAgICAgICAgaXRlbS5mb2N1cygpOyAvLyBmaXhlcyBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYS9pc3N1ZXMvMTc2XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIGZpeGVzIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhL2lzc3Vlcy8xNTVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEJlY2F1c2VNb3VzZU1vdmVkIChlKSB7XG4gICAgaWYgKCFfZ3JhYmJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAod2hpY2hNb3VzZUJ1dHRvbihlKSA9PT0gMCkge1xuICAgICAgcmVsZWFzZSh7fSk7XG4gICAgICByZXR1cm47IC8vIHdoZW4gdGV4dCBpcyBzZWxlY3RlZCBvbiBhbiBpbnB1dCBhbmQgdGhlbiBkcmFnZ2VkLCBtb3VzZXVwIGRvZXNuJ3QgZmlyZS4gdGhpcyBpcyBvdXIgb25seSBob3BlXG4gICAgfVxuICAgIC8vIHRydXRoeSBjaGVjayBmaXhlcyAjMjM5LCBlcXVhbGl0eSBmaXhlcyAjMjA3XG4gICAgaWYgKGUuY2xpZW50WCAhPT0gdm9pZCAwICYmIGUuY2xpZW50WCA9PT0gX21vdmVYICYmIGUuY2xpZW50WSAhPT0gdm9pZCAwICYmIGUuY2xpZW50WSA9PT0gX21vdmVZKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvLmlnbm9yZUlucHV0VGV4dFNlbGVjdGlvbikge1xuICAgICAgdmFyIGNsaWVudFggPSBnZXRDb29yZCgnY2xpZW50WCcsIGUpO1xuICAgICAgdmFyIGNsaWVudFkgPSBnZXRDb29yZCgnY2xpZW50WScsIGUpO1xuICAgICAgdmFyIGVsZW1lbnRCZWhpbmRDdXJzb3IgPSBkb2MuZWxlbWVudEZyb21Qb2ludChjbGllbnRYLCBjbGllbnRZKTtcbiAgICAgIGlmIChpc0lucHV0KGVsZW1lbnRCZWhpbmRDdXJzb3IpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZ3JhYmJlZCA9IF9ncmFiYmVkOyAvLyBjYWxsIHRvIGVuZCgpIHVuc2V0cyBfZ3JhYmJlZFxuICAgIGV2ZW50dWFsTW92ZW1lbnRzKHRydWUpO1xuICAgIG1vdmVtZW50cygpO1xuICAgIGVuZCgpO1xuICAgIHN0YXJ0KGdyYWJiZWQpO1xuXG4gICAgdmFyIG9mZnNldCA9IGdldE9mZnNldChfaXRlbSk7XG4gICAgX29mZnNldFggPSBnZXRDb29yZCgncGFnZVgnLCBlKSAtIG9mZnNldC5sZWZ0O1xuICAgIF9vZmZzZXRZID0gZ2V0Q29vcmQoJ3BhZ2VZJywgZSkgLSBvZmZzZXQudG9wO1xuXG4gICAgY2xhc3Nlcy5hZGQoX2NvcHkgfHwgX2l0ZW0sICdndS10cmFuc2l0Jyk7XG4gICAgcmVuZGVyTWlycm9ySW1hZ2UoKTtcbiAgICBkcmFnKGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuU3RhcnQgKGl0ZW0pIHtcbiAgICBpZiAoZHJha2UuZHJhZ2dpbmcgJiYgX21pcnJvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNDb250YWluZXIoaXRlbSkpIHtcbiAgICAgIHJldHVybjsgLy8gZG9uJ3QgZHJhZyBjb250YWluZXIgaXRzZWxmXG4gICAgfVxuICAgIHZhciBoYW5kbGUgPSBpdGVtO1xuICAgIHdoaWxlIChnZXRQYXJlbnQoaXRlbSkgJiYgaXNDb250YWluZXIoZ2V0UGFyZW50KGl0ZW0pKSA9PT0gZmFsc2UpIHtcbiAgICAgIGlmIChvLmludmFsaWQoaXRlbSwgaGFuZGxlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpdGVtID0gZ2V0UGFyZW50KGl0ZW0pOyAvLyBkcmFnIHRhcmdldCBzaG91bGQgYmUgYSB0b3AgZWxlbWVudFxuICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHNvdXJjZSA9IGdldFBhcmVudChpdGVtKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoby5pbnZhbGlkKGl0ZW0sIGhhbmRsZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbW92YWJsZSA9IG8ubW92ZXMoaXRlbSwgc291cmNlLCBoYW5kbGUsIG5leHRFbChpdGVtKSk7XG4gICAgaWYgKCFtb3ZhYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICBzb3VyY2U6IHNvdXJjZVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjYW5Nb3ZlIChpdGVtKSB7XG4gICAgcmV0dXJuICEhY2FuU3RhcnQoaXRlbSk7XG4gIH1cblxuICBmdW5jdGlvbiBtYW51YWxTdGFydCAoaXRlbSkge1xuICAgIHZhciBjb250ZXh0ID0gY2FuU3RhcnQoaXRlbSk7XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIHN0YXJ0KGNvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0IChjb250ZXh0KSB7XG4gICAgaWYgKGlzQ29weShjb250ZXh0Lml0ZW0sIGNvbnRleHQuc291cmNlKSkge1xuICAgICAgX2NvcHkgPSBjb250ZXh0Lml0ZW0uY2xvbmVOb2RlKHRydWUpO1xuICAgICAgZHJha2UuZW1pdCgnY2xvbmVkJywgX2NvcHksIGNvbnRleHQuaXRlbSwgJ2NvcHknKTtcbiAgICB9XG5cbiAgICBfc291cmNlID0gY29udGV4dC5zb3VyY2U7XG4gICAgX2l0ZW0gPSBjb250ZXh0Lml0ZW07XG4gICAgX2luaXRpYWxTaWJsaW5nID0gX2N1cnJlbnRTaWJsaW5nID0gbmV4dEVsKGNvbnRleHQuaXRlbSk7XG5cbiAgICBkcmFrZS5kcmFnZ2luZyA9IHRydWU7XG4gICAgZHJha2UuZW1pdCgnZHJhZycsIF9pdGVtLCBfc291cmNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGludmFsaWRUYXJnZXQgKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZCAoKSB7XG4gICAgaWYgKCFkcmFrZS5kcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgaXRlbSA9IF9jb3B5IHx8IF9pdGVtO1xuICAgIGRyb3AoaXRlbSwgZ2V0UGFyZW50KGl0ZW0pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuZ3JhYiAoKSB7XG4gICAgX2dyYWJiZWQgPSBmYWxzZTtcbiAgICBldmVudHVhbE1vdmVtZW50cyh0cnVlKTtcbiAgICBtb3ZlbWVudHModHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiByZWxlYXNlIChlKSB7XG4gICAgdW5ncmFiKCk7XG5cbiAgICBpZiAoIWRyYWtlLmRyYWdnaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpdGVtID0gX2NvcHkgfHwgX2l0ZW07XG4gICAgdmFyIGNsaWVudFggPSBnZXRDb29yZCgnY2xpZW50WCcsIGUpO1xuICAgIHZhciBjbGllbnRZID0gZ2V0Q29vcmQoJ2NsaWVudFknLCBlKTtcbiAgICB2YXIgZWxlbWVudEJlaGluZEN1cnNvciA9IGdldEVsZW1lbnRCZWhpbmRQb2ludChfbWlycm9yLCBjbGllbnRYLCBjbGllbnRZKTtcbiAgICB2YXIgZHJvcFRhcmdldCA9IGZpbmREcm9wVGFyZ2V0KGVsZW1lbnRCZWhpbmRDdXJzb3IsIGNsaWVudFgsIGNsaWVudFkpO1xuICAgIGlmIChkcm9wVGFyZ2V0ICYmICgoX2NvcHkgJiYgby5jb3B5U29ydFNvdXJjZSkgfHwgKCFfY29weSB8fCBkcm9wVGFyZ2V0ICE9PSBfc291cmNlKSkpIHtcbiAgICAgIGRyb3AoaXRlbSwgZHJvcFRhcmdldCk7XG4gICAgfSBlbHNlIGlmIChvLnJlbW92ZU9uU3BpbGwpIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW5jZWwoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkcm9wIChpdGVtLCB0YXJnZXQpIHtcbiAgICB2YXIgcGFyZW50ID0gZ2V0UGFyZW50KGl0ZW0pO1xuICAgIGlmIChfY29weSAmJiBvLmNvcHlTb3J0U291cmNlICYmIHRhcmdldCA9PT0gX3NvdXJjZSkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKF9pdGVtKTtcbiAgICB9XG4gICAgaWYgKGlzSW5pdGlhbFBsYWNlbWVudCh0YXJnZXQpKSB7XG4gICAgICBkcmFrZS5lbWl0KCdjYW5jZWwnLCBpdGVtLCBfc291cmNlLCBfc291cmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZHJha2UuZW1pdCgnZHJvcCcsIGl0ZW0sIHRhcmdldCwgX3NvdXJjZSwgX2N1cnJlbnRTaWJsaW5nKTtcbiAgICB9XG4gICAgY2xlYW51cCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlICgpIHtcbiAgICBpZiAoIWRyYWtlLmRyYWdnaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpdGVtID0gX2NvcHkgfHwgX2l0ZW07XG4gICAgdmFyIHBhcmVudCA9IGdldFBhcmVudChpdGVtKTtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoaXRlbSk7XG4gICAgfVxuICAgIGRyYWtlLmVtaXQoX2NvcHkgPyAnY2FuY2VsJyA6ICdyZW1vdmUnLCBpdGVtLCBwYXJlbnQsIF9zb3VyY2UpO1xuICAgIGNsZWFudXAoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCAocmV2ZXJ0KSB7XG4gICAgaWYgKCFkcmFrZS5kcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcmV2ZXJ0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwID8gcmV2ZXJ0IDogby5yZXZlcnRPblNwaWxsO1xuICAgIHZhciBpdGVtID0gX2NvcHkgfHwgX2l0ZW07XG4gICAgdmFyIHBhcmVudCA9IGdldFBhcmVudChpdGVtKTtcbiAgICB2YXIgaW5pdGlhbCA9IGlzSW5pdGlhbFBsYWNlbWVudChwYXJlbnQpO1xuICAgIGlmIChpbml0aWFsID09PSBmYWxzZSAmJiByZXZlcnRzKSB7XG4gICAgICBpZiAoX2NvcHkpIHtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChfY29weSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9zb3VyY2UuaW5zZXJ0QmVmb3JlKGl0ZW0sIF9pbml0aWFsU2libGluZyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpbml0aWFsIHx8IHJldmVydHMpIHtcbiAgICAgIGRyYWtlLmVtaXQoJ2NhbmNlbCcsIGl0ZW0sIF9zb3VyY2UsIF9zb3VyY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFrZS5lbWl0KCdkcm9wJywgaXRlbSwgcGFyZW50LCBfc291cmNlLCBfY3VycmVudFNpYmxpbmcpO1xuICAgIH1cbiAgICBjbGVhbnVwKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICB2YXIgaXRlbSA9IF9jb3B5IHx8IF9pdGVtO1xuICAgIHVuZ3JhYigpO1xuICAgIHJlbW92ZU1pcnJvckltYWdlKCk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGNsYXNzZXMucm0oaXRlbSwgJ2d1LXRyYW5zaXQnKTtcbiAgICB9XG4gICAgaWYgKF9yZW5kZXJUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KF9yZW5kZXJUaW1lcik7XG4gICAgfVxuICAgIGRyYWtlLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgaWYgKF9sYXN0RHJvcFRhcmdldCkge1xuICAgICAgZHJha2UuZW1pdCgnb3V0JywgaXRlbSwgX2xhc3REcm9wVGFyZ2V0LCBfc291cmNlKTtcbiAgICB9XG4gICAgZHJha2UuZW1pdCgnZHJhZ2VuZCcsIGl0ZW0pO1xuICAgIF9zb3VyY2UgPSBfaXRlbSA9IF9jb3B5ID0gX2luaXRpYWxTaWJsaW5nID0gX2N1cnJlbnRTaWJsaW5nID0gX3JlbmRlclRpbWVyID0gX2xhc3REcm9wVGFyZ2V0ID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSW5pdGlhbFBsYWNlbWVudCAodGFyZ2V0LCBzKSB7XG4gICAgdmFyIHNpYmxpbmc7XG4gICAgaWYgKHMgIT09IHZvaWQgMCkge1xuICAgICAgc2libGluZyA9IHM7XG4gICAgfSBlbHNlIGlmIChfbWlycm9yKSB7XG4gICAgICBzaWJsaW5nID0gX2N1cnJlbnRTaWJsaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaWJsaW5nID0gbmV4dEVsKF9jb3B5IHx8IF9pdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldCA9PT0gX3NvdXJjZSAmJiBzaWJsaW5nID09PSBfaW5pdGlhbFNpYmxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kRHJvcFRhcmdldCAoZWxlbWVudEJlaGluZEN1cnNvciwgY2xpZW50WCwgY2xpZW50WSkge1xuICAgIHZhciB0YXJnZXQgPSBlbGVtZW50QmVoaW5kQ3Vyc29yO1xuICAgIHdoaWxlICh0YXJnZXQgJiYgIWFjY2VwdGVkKCkpIHtcbiAgICAgIHRhcmdldCA9IGdldFBhcmVudCh0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuXG4gICAgZnVuY3Rpb24gYWNjZXB0ZWQgKCkge1xuICAgICAgdmFyIGRyb3BwYWJsZSA9IGlzQ29udGFpbmVyKHRhcmdldCk7XG4gICAgICBpZiAoZHJvcHBhYmxlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbW1lZGlhdGUgPSBnZXRJbW1lZGlhdGVDaGlsZCh0YXJnZXQsIGVsZW1lbnRCZWhpbmRDdXJzb3IpO1xuICAgICAgdmFyIHJlZmVyZW5jZSA9IGdldFJlZmVyZW5jZSh0YXJnZXQsIGltbWVkaWF0ZSwgY2xpZW50WCwgY2xpZW50WSk7XG4gICAgICB2YXIgaW5pdGlhbCA9IGlzSW5pdGlhbFBsYWNlbWVudCh0YXJnZXQsIHJlZmVyZW5jZSk7XG4gICAgICBpZiAoaW5pdGlhbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gc2hvdWxkIGFsd2F5cyBiZSBhYmxlIHRvIGRyb3AgaXQgcmlnaHQgYmFjayB3aGVyZSBpdCB3YXNcbiAgICAgIH1cbiAgICAgIHJldHVybiBvLmFjY2VwdHMoX2l0ZW0sIHRhcmdldCwgX3NvdXJjZSwgcmVmZXJlbmNlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkcmFnIChlKSB7XG4gICAgaWYgKCFfbWlycm9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBjbGllbnRYID0gZ2V0Q29vcmQoJ2NsaWVudFgnLCBlKTtcbiAgICB2YXIgY2xpZW50WSA9IGdldENvb3JkKCdjbGllbnRZJywgZSk7XG4gICAgdmFyIHggPSBjbGllbnRYIC0gX29mZnNldFg7XG4gICAgdmFyIHkgPSBjbGllbnRZIC0gX29mZnNldFk7XG5cbiAgICBfbWlycm9yLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICBfbWlycm9yLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuXG4gICAgdmFyIGl0ZW0gPSBfY29weSB8fCBfaXRlbTtcbiAgICB2YXIgZWxlbWVudEJlaGluZEN1cnNvciA9IGdldEVsZW1lbnRCZWhpbmRQb2ludChfbWlycm9yLCBjbGllbnRYLCBjbGllbnRZKTtcbiAgICB2YXIgZHJvcFRhcmdldCA9IGZpbmREcm9wVGFyZ2V0KGVsZW1lbnRCZWhpbmRDdXJzb3IsIGNsaWVudFgsIGNsaWVudFkpO1xuICAgIHZhciBjaGFuZ2VkID0gZHJvcFRhcmdldCAhPT0gbnVsbCAmJiBkcm9wVGFyZ2V0ICE9PSBfbGFzdERyb3BUYXJnZXQ7XG4gICAgaWYgKGNoYW5nZWQgfHwgZHJvcFRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgb3V0KCk7XG4gICAgICBfbGFzdERyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuICAgICAgb3ZlcigpO1xuICAgIH1cbiAgICB2YXIgcGFyZW50ID0gZ2V0UGFyZW50KGl0ZW0pO1xuICAgIGlmIChkcm9wVGFyZ2V0ID09PSBfc291cmNlICYmIF9jb3B5ICYmICFvLmNvcHlTb3J0U291cmNlKSB7XG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChpdGVtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHJlZmVyZW5jZTtcbiAgICB2YXIgaW1tZWRpYXRlID0gZ2V0SW1tZWRpYXRlQ2hpbGQoZHJvcFRhcmdldCwgZWxlbWVudEJlaGluZEN1cnNvcik7XG4gICAgaWYgKGltbWVkaWF0ZSAhPT0gbnVsbCkge1xuICAgICAgcmVmZXJlbmNlID0gZ2V0UmVmZXJlbmNlKGRyb3BUYXJnZXQsIGltbWVkaWF0ZSwgY2xpZW50WCwgY2xpZW50WSk7XG4gICAgfSBlbHNlIGlmIChvLnJldmVydE9uU3BpbGwgPT09IHRydWUgJiYgIV9jb3B5KSB7XG4gICAgICByZWZlcmVuY2UgPSBfaW5pdGlhbFNpYmxpbmc7XG4gICAgICBkcm9wVGFyZ2V0ID0gX3NvdXJjZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKF9jb3B5ICYmIHBhcmVudCkge1xuICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoaXRlbSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChyZWZlcmVuY2UgPT09IG51bGwgJiYgY2hhbmdlZCkgfHxcbiAgICAgIHJlZmVyZW5jZSAhPT0gaXRlbSAmJlxuICAgICAgcmVmZXJlbmNlICE9PSBuZXh0RWwoaXRlbSlcbiAgICApIHtcbiAgICAgIF9jdXJyZW50U2libGluZyA9IHJlZmVyZW5jZTtcbiAgICAgIGRyb3BUYXJnZXQuaW5zZXJ0QmVmb3JlKGl0ZW0sIHJlZmVyZW5jZSk7XG4gICAgICBkcmFrZS5lbWl0KCdzaGFkb3cnLCBpdGVtLCBkcm9wVGFyZ2V0LCBfc291cmNlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbW92ZWQgKHR5cGUpIHsgZHJha2UuZW1pdCh0eXBlLCBpdGVtLCBfbGFzdERyb3BUYXJnZXQsIF9zb3VyY2UpOyB9XG4gICAgZnVuY3Rpb24gb3ZlciAoKSB7IGlmIChjaGFuZ2VkKSB7IG1vdmVkKCdvdmVyJyk7IH0gfVxuICAgIGZ1bmN0aW9uIG91dCAoKSB7IGlmIChfbGFzdERyb3BUYXJnZXQpIHsgbW92ZWQoJ291dCcpOyB9IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNwaWxsT3ZlciAoZWwpIHtcbiAgICBjbGFzc2VzLnJtKGVsLCAnZ3UtaGlkZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3BpbGxPdXQgKGVsKSB7XG4gICAgaWYgKGRyYWtlLmRyYWdnaW5nKSB7IGNsYXNzZXMuYWRkKGVsLCAnZ3UtaGlkZScpOyB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJNaXJyb3JJbWFnZSAoKSB7XG4gICAgaWYgKF9taXJyb3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHJlY3QgPSBfaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBfbWlycm9yID0gX2l0ZW0uY2xvbmVOb2RlKHRydWUpO1xuICAgIF9taXJyb3Iuc3R5bGUud2lkdGggPSBnZXRSZWN0V2lkdGgocmVjdCkgKyAncHgnO1xuICAgIF9taXJyb3Iuc3R5bGUuaGVpZ2h0ID0gZ2V0UmVjdEhlaWdodChyZWN0KSArICdweCc7XG4gICAgY2xhc3Nlcy5ybShfbWlycm9yLCAnZ3UtdHJhbnNpdCcpO1xuICAgIGNsYXNzZXMuYWRkKF9taXJyb3IsICdndS1taXJyb3InKTtcbiAgICBvLm1pcnJvckNvbnRhaW5lci5hcHBlbmRDaGlsZChfbWlycm9yKTtcbiAgICB0b3VjaHkoZG9jdW1lbnRFbGVtZW50LCAnYWRkJywgJ21vdXNlbW92ZScsIGRyYWcpO1xuICAgIGNsYXNzZXMuYWRkKG8ubWlycm9yQ29udGFpbmVyLCAnZ3UtdW5zZWxlY3RhYmxlJyk7XG4gICAgZHJha2UuZW1pdCgnY2xvbmVkJywgX21pcnJvciwgX2l0ZW0sICdtaXJyb3InKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZU1pcnJvckltYWdlICgpIHtcbiAgICBpZiAoX21pcnJvcikge1xuICAgICAgY2xhc3Nlcy5ybShvLm1pcnJvckNvbnRhaW5lciwgJ2d1LXVuc2VsZWN0YWJsZScpO1xuICAgICAgdG91Y2h5KGRvY3VtZW50RWxlbWVudCwgJ3JlbW92ZScsICdtb3VzZW1vdmUnLCBkcmFnKTtcbiAgICAgIGdldFBhcmVudChfbWlycm9yKS5yZW1vdmVDaGlsZChfbWlycm9yKTtcbiAgICAgIF9taXJyb3IgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEltbWVkaWF0ZUNoaWxkIChkcm9wVGFyZ2V0LCB0YXJnZXQpIHtcbiAgICB2YXIgaW1tZWRpYXRlID0gdGFyZ2V0O1xuICAgIHdoaWxlIChpbW1lZGlhdGUgIT09IGRyb3BUYXJnZXQgJiYgZ2V0UGFyZW50KGltbWVkaWF0ZSkgIT09IGRyb3BUYXJnZXQpIHtcbiAgICAgIGltbWVkaWF0ZSA9IGdldFBhcmVudChpbW1lZGlhdGUpO1xuICAgIH1cbiAgICBpZiAoaW1tZWRpYXRlID09PSBkb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gaW1tZWRpYXRlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UmVmZXJlbmNlIChkcm9wVGFyZ2V0LCB0YXJnZXQsIHgsIHkpIHtcbiAgICB2YXIgaG9yaXpvbnRhbCA9IG8uZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCc7XG4gICAgdmFyIHJlZmVyZW5jZSA9IHRhcmdldCAhPT0gZHJvcFRhcmdldCA/IGluc2lkZSgpIDogb3V0c2lkZSgpO1xuICAgIHJldHVybiByZWZlcmVuY2U7XG5cbiAgICBmdW5jdGlvbiBvdXRzaWRlICgpIHsgLy8gc2xvd2VyLCBidXQgYWJsZSB0byBmaWd1cmUgb3V0IGFueSBwb3NpdGlvblxuICAgICAgdmFyIGxlbiA9IGRyb3BUYXJnZXQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgdmFyIGk7XG4gICAgICB2YXIgZWw7XG4gICAgICB2YXIgcmVjdDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlbCA9IGRyb3BUYXJnZXQuY2hpbGRyZW5baV07XG4gICAgICAgIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKGhvcml6b250YWwgJiYgKHJlY3QubGVmdCArIHJlY3Qud2lkdGggLyAyKSA+IHgpIHsgcmV0dXJuIGVsOyB9XG4gICAgICAgIGlmICghaG9yaXpvbnRhbCAmJiAocmVjdC50b3AgKyByZWN0LmhlaWdodCAvIDIpID4geSkgeyByZXR1cm4gZWw7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2lkZSAoKSB7IC8vIGZhc3RlciwgYnV0IG9ubHkgYXZhaWxhYmxlIGlmIGRyb3BwZWQgaW5zaWRlIGEgY2hpbGQgZWxlbWVudFxuICAgICAgdmFyIHJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSh4ID4gcmVjdC5sZWZ0ICsgZ2V0UmVjdFdpZHRoKHJlY3QpIC8gMik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzb2x2ZSh5ID4gcmVjdC50b3AgKyBnZXRSZWN0SGVpZ2h0KHJlY3QpIC8gMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZSAoYWZ0ZXIpIHtcbiAgICAgIHJldHVybiBhZnRlciA/IG5leHRFbCh0YXJnZXQpIDogdGFyZ2V0O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQ29weSAoaXRlbSwgY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvLmNvcHkgPT09ICdib29sZWFuJyA/IG8uY29weSA6IG8uY29weShpdGVtLCBjb250YWluZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvdWNoeSAoZWwsIG9wLCB0eXBlLCBmbikge1xuICB2YXIgdG91Y2ggPSB7XG4gICAgbW91c2V1cDogJ3RvdWNoZW5kJyxcbiAgICBtb3VzZWRvd246ICd0b3VjaHN0YXJ0JyxcbiAgICBtb3VzZW1vdmU6ICd0b3VjaG1vdmUnXG4gIH07XG4gIHZhciBwb2ludGVycyA9IHtcbiAgICBtb3VzZXVwOiAncG9pbnRlcnVwJyxcbiAgICBtb3VzZWRvd246ICdwb2ludGVyZG93bicsXG4gICAgbW91c2Vtb3ZlOiAncG9pbnRlcm1vdmUnXG4gIH07XG4gIHZhciBtaWNyb3NvZnQgPSB7XG4gICAgbW91c2V1cDogJ01TUG9pbnRlclVwJyxcbiAgICBtb3VzZWRvd246ICdNU1BvaW50ZXJEb3duJyxcbiAgICBtb3VzZW1vdmU6ICdNU1BvaW50ZXJNb3ZlJ1xuICB9O1xuICBpZiAoZ2xvYmFsLm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCkge1xuICAgIGNyb3NzdmVudFtvcF0oZWwsIHBvaW50ZXJzW3R5cGVdLCBmbik7XG4gIH0gZWxzZSBpZiAoZ2xvYmFsLm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkKSB7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgbWljcm9zb2Z0W3R5cGVdLCBmbik7XG4gIH0gZWxzZSB7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgdG91Y2hbdHlwZV0sIGZuKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCB0eXBlLCBmbik7XG4gIH1cbn1cblxuZnVuY3Rpb24gd2hpY2hNb3VzZUJ1dHRvbiAoZSkge1xuICBpZiAoZS50b3VjaGVzICE9PSB2b2lkIDApIHsgcmV0dXJuIGUudG91Y2hlcy5sZW5ndGg7IH1cbiAgaWYgKGUud2hpY2ggIT09IHZvaWQgMCAmJiBlLndoaWNoICE9PSAwKSB7IHJldHVybiBlLndoaWNoOyB9IC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYS9pc3N1ZXMvMjYxXG4gIGlmIChlLmJ1dHRvbnMgIT09IHZvaWQgMCkgeyByZXR1cm4gZS5idXR0b25zOyB9XG4gIHZhciBidXR0b24gPSBlLmJ1dHRvbjtcbiAgaWYgKGJ1dHRvbiAhPT0gdm9pZCAwKSB7IC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iLzk5ZThmZjFiYWE3YWUzNDFlOTRiYjg5YzNlODQ1NzBjN2MzYWQ5ZWEvc3JjL2V2ZW50LmpzI0w1NzMtTDU3NVxuICAgIHJldHVybiBidXR0b24gJiAxID8gMSA6IGJ1dHRvbiAmIDIgPyAzIDogKGJ1dHRvbiAmIDQgPyAyIDogMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0IChlbCkge1xuICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IHJlY3QubGVmdCArIGdldFNjcm9sbCgnc2Nyb2xsTGVmdCcsICdwYWdlWE9mZnNldCcpLFxuICAgIHRvcDogcmVjdC50b3AgKyBnZXRTY3JvbGwoJ3Njcm9sbFRvcCcsICdwYWdlWU9mZnNldCcpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFNjcm9sbCAoc2Nyb2xsUHJvcCwgb2Zmc2V0UHJvcCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFtvZmZzZXRQcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZ2xvYmFsW29mZnNldFByb3BdO1xuICB9XG4gIGlmIChkb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50RWxlbWVudFtzY3JvbGxQcm9wXTtcbiAgfVxuICByZXR1cm4gZG9jLmJvZHlbc2Nyb2xsUHJvcF07XG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRCZWhpbmRQb2ludCAocG9pbnQsIHgsIHkpIHtcbiAgdmFyIHAgPSBwb2ludCB8fCB7fTtcbiAgdmFyIHN0YXRlID0gcC5jbGFzc05hbWU7XG4gIHZhciBlbDtcbiAgcC5jbGFzc05hbWUgKz0gJyBndS1oaWRlJztcbiAgZWwgPSBkb2MuZWxlbWVudEZyb21Qb2ludCh4LCB5KTtcbiAgcC5jbGFzc05hbWUgPSBzdGF0ZTtcbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiBuZXZlciAoKSB7IHJldHVybiBmYWxzZTsgfVxuZnVuY3Rpb24gYWx3YXlzICgpIHsgcmV0dXJuIHRydWU7IH1cbmZ1bmN0aW9uIGdldFJlY3RXaWR0aCAocmVjdCkgeyByZXR1cm4gcmVjdC53aWR0aCB8fCAocmVjdC5yaWdodCAtIHJlY3QubGVmdCk7IH1cbmZ1bmN0aW9uIGdldFJlY3RIZWlnaHQgKHJlY3QpIHsgcmV0dXJuIHJlY3QuaGVpZ2h0IHx8IChyZWN0LmJvdHRvbSAtIHJlY3QudG9wKTsgfVxuZnVuY3Rpb24gZ2V0UGFyZW50IChlbCkgeyByZXR1cm4gZWwucGFyZW50Tm9kZSA9PT0gZG9jID8gbnVsbCA6IGVsLnBhcmVudE5vZGU7IH1cbmZ1bmN0aW9uIGlzSW5wdXQgKGVsKSB7IHJldHVybiBlbC50YWdOYW1lID09PSAnSU5QVVQnIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScgfHwgZWwudGFnTmFtZSA9PT0gJ1NFTEVDVCcgfHwgaXNFZGl0YWJsZShlbCk7IH1cbmZ1bmN0aW9uIGlzRWRpdGFibGUgKGVsKSB7XG4gIGlmICghZWwpIHsgcmV0dXJuIGZhbHNlOyB9IC8vIG5vIHBhcmVudHMgd2VyZSBlZGl0YWJsZVxuICBpZiAoZWwuY29udGVudEVkaXRhYmxlID09PSAnZmFsc2UnKSB7IHJldHVybiBmYWxzZTsgfSAvLyBzdG9wIHRoZSBsb29rdXBcbiAgaWYgKGVsLmNvbnRlbnRFZGl0YWJsZSA9PT0gJ3RydWUnKSB7IHJldHVybiB0cnVlOyB9IC8vIGZvdW5kIGEgY29udGVudEVkaXRhYmxlIGVsZW1lbnQgaW4gdGhlIGNoYWluXG4gIHJldHVybiBpc0VkaXRhYmxlKGdldFBhcmVudChlbCkpOyAvLyBjb250ZW50RWRpdGFibGUgaXMgc2V0IHRvICdpbmhlcml0J1xufVxuXG5mdW5jdGlvbiBuZXh0RWwgKGVsKSB7XG4gIHJldHVybiBlbC5uZXh0RWxlbWVudFNpYmxpbmcgfHwgbWFudWFsbHkoKTtcbiAgZnVuY3Rpb24gbWFudWFsbHkgKCkge1xuICAgIHZhciBzaWJsaW5nID0gZWw7XG4gICAgZG8ge1xuICAgICAgc2libGluZyA9IHNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgfSB3aGlsZSAoc2libGluZyAmJiBzaWJsaW5nLm5vZGVUeXBlICE9PSAxKTtcbiAgICByZXR1cm4gc2libGluZztcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFdmVudEhvc3QgKGUpIHtcbiAgLy8gb24gdG91Y2hlbmQgZXZlbnQsIHdlIGhhdmUgdG8gdXNlIGBlLmNoYW5nZWRUb3VjaGVzYFxuICAvLyBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83MTkyNTYzL3RvdWNoZW5kLWV2ZW50LXByb3BlcnRpZXNcbiAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhL2lzc3Vlcy8zNFxuICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZS50YXJnZXRUb3VjaGVzWzBdO1xuICB9XG4gIGlmIChlLmNoYW5nZWRUb3VjaGVzICYmIGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gIH1cbiAgcmV0dXJuIGU7XG59XG5cbmZ1bmN0aW9uIGdldENvb3JkIChjb29yZCwgZSkge1xuICB2YXIgaG9zdCA9IGdldEV2ZW50SG9zdChlKTtcbiAgdmFyIG1pc3NNYXAgPSB7XG4gICAgcGFnZVg6ICdjbGllbnRYJywgLy8gSUU4XG4gICAgcGFnZVk6ICdjbGllbnRZJyAvLyBJRThcbiAgfTtcbiAgaWYgKGNvb3JkIGluIG1pc3NNYXAgJiYgIShjb29yZCBpbiBob3N0KSAmJiBtaXNzTWFwW2Nvb3JkXSBpbiBob3N0KSB7XG4gICAgY29vcmQgPSBtaXNzTWFwW2Nvb3JkXTtcbiAgfVxuICByZXR1cm4gaG9zdFtjb29yZF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZHJhZ3VsYTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9kcmFndWxhL2RyYWd1bGEuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicsIHRpY2s7XG5pZiAoc2kpIHtcbiAgdGljayA9IGZ1bmN0aW9uIChmbikgeyBzZXRJbW1lZGlhdGUoZm4pOyB9O1xufSBlbHNlIHtcbiAgdGljayA9IGZ1bmN0aW9uIChmbikgeyBzZXRUaW1lb3V0KGZuLCAwKTsgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aWNrO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi90aWNreS90aWNreS1icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge0NhcmR9IGZyb20gXCIuL0NhcmRcIlxuaW1wb3J0IHtTdWl0ZX0gZnJvbSBcIi4vU3VpdGVcIlxuXG5leHBvcnQgY2xhc3MgQ2FyZERlY2t7XG4gICAgcHVibGljIENhcmRzOiBBcnJheTxDYXJkPlxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuQ2FyZHMgPSBuZXcgQXJyYXk8Q2FyZD4oNTIpO1xuICAgICAgICB2YXIgdmFsdWU9MTtcbiAgICAgICAgdmFyIHN1aXRlID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8NTI7IGkrKyl7XG4gICAgICAgICAgICB2YXIgZmlsZSA9IHRoaXMuY2FyZEZpbGVzW3N1aXRlXVt2YWx1ZS0xXTtcbiAgICAgICAgICAgIHRoaXMuQ2FyZHNbaV0gPSBuZXcgQ2FyZChzdWl0ZSwgdmFsdWUrKywgZmlsZSk7XG4gICAgICAgICAgICBpZiAodmFsdWU9PTE0KXtcbiAgICAgICAgICAgICAgICBzdWl0ZSsrO1xuICAgICAgICAgICAgICAgIHZhbHVlPTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aTw1MjtpKyspe1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5DYXJkc1tpXS5TdWl0ZX0gJHt0aGlzLkNhcmRzW2ldLlZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2h1ZmZsZSgpO1xuXG4gICAgICAgIHRoaXMudmVyaWZ5KCk7XG4gICAgfVxuXG4vLyBGaXNoZXItWWF0ZXMgYWxnb3JpdGhtXG4gICAgcHJpdmF0ZSBzaHVmZmxlKCl7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPHRoaXMuQ2FyZHMubGVuZ3RoLTE7IGkrKyl7XG4gICAgICAgICAgICB2YXIgcmFuZCA9IHRoaXMuZ2V0UmFuZG9tSW50KGksdGhpcy5DYXJkcy5sZW5ndGgpO1xuICAgICAgICAgICAgbGV0IHRlbXA6Q2FyZCA9IHRoaXMuQ2FyZHNbaV07XG4gICAgICAgICAgICB0aGlzLkNhcmRzW2ldID0gdGhpcy5DYXJkc1tyYW5kXTtcbiAgICAgICAgICAgIHRoaXMuQ2FyZHNbcmFuZF0gPSB0ZW1wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2ZXJpZnkoKXtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aTw1MjtpKyspe1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5DYXJkc1tpXS5TdWl0ZX0gJHt0aGlzLkNhcmRzW2ldLlZhbHVlfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHZhbHVlcyA9IHtcbiAgICAgICAgICAgIHplcm86W10sXG4gICAgICAgICAgICBvbmU6W10sXG4gICAgICAgICAgICB0d286W10sXG4gICAgICAgICAgICB0aHJlZTpbXVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPDUyOyBpKyspe1xuICAgICAgICAgICAgc3dpdGNoKHRoaXMuQ2FyZHNbaV0uU3VpdGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnplcm8ucHVzaCh0aGlzLkNhcmRzW2ldLlZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5vbmUucHVzaCh0aGlzLkNhcmRzW2ldLlZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy50d28ucHVzaCh0aGlzLkNhcmRzW2ldLlZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy50aHJlZS5wdXNoKHRoaXMuQ2FyZHNbaV0uVmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGBjbHVic1ske3ZhbHVlcy56ZXJvLmxlbmd0aH1dICR7dmFsdWVzLnplcm99YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBkaWFtb25kc1ske3ZhbHVlcy5vbmUubGVuZ3RofV0gJHt2YWx1ZXMub25lfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgaGVhcnRzWyR7dmFsdWVzLnR3by5sZW5ndGh9XSAke3ZhbHVlcy50d299YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzcGFkZXNbJHt2YWx1ZXMudGhyZWUubGVuZ3RofV0gJHt2YWx1ZXMudGhyZWV9YCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21JbnQobWluOm51bWJlciwgbWF4Om51bWJlcikge1xuICAgICAgICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgICAgICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluOyAvL1RoZSBtYXhpbXVtIGlzIGV4Y2x1c2l2ZSBhbmQgdGhlIG1pbmltdW0gaXMgaW5jbHVzaXZlXG4gICAgfVxuICAgIHByaXZhdGUgY2FyZEZpbGVzID0gW1tcbiAgICAgICAgXCJhY2Vfb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwiMl9vZl9jbHVicy5zdmdcIixcbiAgICAgICAgXCIzX29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcIjRfb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwiNV9vZl9jbHVicy5zdmdcIixcbiAgICAgICAgXCI2X29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcIjdfb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwiOF9vZl9jbHVicy5zdmdcIixcbiAgICAgICAgXCI5X29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcIjEwX29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcImphY2tfb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwicXVlZW5fb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwia2luZ19vZl9jbHVicy5zdmdcIl0sXG5cbiAgICAgICAgW1wiYWNlX29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcIjJfb2ZfZGlhbW9uZHMuc3ZnXCIsXG4gICAgICAgIFwiM19vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCI0X29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcIjVfb2ZfZGlhbW9uZHMuc3ZnXCIsXG4gICAgICAgIFwiNl9vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCI3X29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcIjhfb2ZfZGlhbW9uZHMuc3ZnXCIsXG4gICAgICAgIFwiOV9vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCIxMF9vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCJqYWNrX29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcInF1ZWVuX29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcImtpbmdfb2ZfZGlhbW9uZHMuc3ZnXCJdLFxuXG4gICAgICAgIFtcImFjZV9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiMl9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiM19vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiNF9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiNV9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiNl9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiN19vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiOF9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiOV9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiMTBfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcImphY2tfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcInF1ZWVuX29mX2hlYXJ0cy5zdmdcIixcbiAgICAgICAgXCJraW5nX29mX2hlYXJ0cy5zdmdcIl0sXG5cbiAgICAgICAgW1wiYWNlX29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCIyX29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCIzX29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCI0X29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCI1X29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCI2X29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCI3X29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCI4X29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCI5X29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCIxMF9vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwiamFja19vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwicXVlZW5fb2Zfc3BhZGVzLnN2Z1wiLFxuICAgICAgICBcImtpbmdfb2Zfc3BhZGVzLnN2Z1wiXV07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2FyZERlY2sudHMiLCJpbXBvcnQge0NhcmRQaWxlfSBmcm9tIFwiLi9DYXJkUGlsZVwiXG5pbXBvcnQge1N1aXRlfSBmcm9tIFwiLi9TdWl0ZVwiXG5pbXBvcnQge0NhcmR9IGZyb20gXCIuL0NhcmRcIlxuXG5leHBvcnQgY2xhc3MgRm91bmRhdGlvbkNhcmRQaWxlIGV4dGVuZHMgQ2FyZFBpbGVcbntcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoIHB1YmxpYyBzdWl0ZTpTdWl0ZSwgZG9tSWQ6c3RyaW5nICl7IHN1cGVyKGRvbUlkKTsgfVxuICAgIHB1YmxpYyBwdXNoKGNhcmQ6Q2FyZCl7XG4gICAgICAgIGNhcmQuc2V0RmFuT2Zmc2V0KDApO1xuICAgICAgICBzdXBlci5wdXNoKGNhcmQpO1xuICAgIH1cbiAgICBwdWJsaWMgY2FuQWNjZXB0Q2FyZChjYXJkOkNhcmQpOmJvb2xlYW4ge1xuICAgICAgICBpZiAoY2FyZC5TdWl0ZSAhPSB0aGlzLnN1aXRlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLy8gbm8gY2FyZHMgb24gdGhlIHBpbGUgYW5kIHRoZSBuZXcgY2FyZCBpcyBhbiBBY2VcbiAgICAgICAgaWYgKHRoaXMuY2FyZHMubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgcmV0dXJuIGNhcmQuVmFsdWUgPT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdyZWF0ZXIgdGhhbiAwIGNhcmRzIG9uIHRoZSBwaWxlIGFuZCB0aGUgbmV3IGNhcmQnc1xuICAgICAgICAvLyB2YWx1ZSBpcyBvbmUgZ3JlYXRlciB0aGFuIHRoZSBsYXN0IGNhcmRcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FyZHMubGVuZ3RoID4gMCAmJiB0aGlzLmNhcmRzW3RoaXMuY2FyZHMubGVuZ3RoLTFdLlZhbHVlID09IGNhcmQuVmFsdWUtMVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9Gb3VuZGF0aW9uQ2FyZFBpbGUudHMiLCJpbXBvcnQge0NhcmRQaWxlfSBmcm9tIFwiLi9DYXJkUGlsZVwiXG5pbXBvcnQge1N1aXRlfSBmcm9tIFwiLi9TdWl0ZVwiXG5pbXBvcnQge0NhcmR9IGZyb20gXCIuL0NhcmRcIlxuXG5leHBvcnQgY2xhc3MgVGFibGVhdUNhcmRQaWxlIGV4dGVuZHMgQ2FyZFBpbGUge1xuICAgIFxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciggXG4gICAgICAgIGRvbUlkOnN0cmluZyxcbiAgICAgICAgcHJpdmF0ZSBmYW5PZmZzZXQ6bnVtYmVyID0gMzAgKXsgXG5cbiAgICAgICAgc3VwZXIoZG9tSWQpOyBcbiAgICAgICAgdGhpcy5mYW5DYXJkcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwdXNoKGNhcmQ6Q2FyZCl7XG4gICAgICAgIHN1cGVyLnB1c2goY2FyZCk7XG4gICAgICAgIHRoaXMuZmFuQ2FyZHMoKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGNhbkFjY2VwdENhcmQoY2FyZDpDYXJkKTpib29sZWFuIHtcbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIGNhcmRzIG9uIHRoZSBwaWxlIHRoZW4gYSBLaW5nIGNhbiBiZSBkcm9wcGVkXG4gICAgICAgIGlmICh0aGlzLmNhcmRzLmxlbmd0aCA9PSAwKSByZXR1cm4gY2FyZC5WYWx1ZSA9PSAxMzsgXG5cbiAgICAgICAgdmFyIGxhc3RDYXJkID0gdGhpcy5jYXJkc1t0aGlzLmNhcmRzLmxlbmd0aC0xXTtcblxuICAgICAgICAvLyByZXR1cm4gb3Bwb3NpdGUgY29sb3JzIGFuZCBuZXcgY2FyZHMgdmFsdWUgaXMgb25lIG1vcmVcbiAgICAgICAgLy8gdGhhbiBsYXN0IGNhcmQncyB2YWx1ZVxuICAgICAgICByZXR1cm4gKENhcmQuaXNSZWQobGFzdENhcmQuU3VpdGUpICYmIFxuICAgICAgICAgICAgICAgIENhcmQuaXNCbGFjayhjYXJkLlN1aXRlKSAmJiBcbiAgICAgICAgICAgICAgICBjYXJkLlZhbHVlID09IGxhc3RDYXJkLlZhbHVlIC0gMSkgXG4gICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIChDYXJkLmlzQmxhY2sobGFzdENhcmQuU3VpdGUpICYmIFxuICAgICAgICAgICAgICAgICBDYXJkLmlzUmVkKGNhcmQuU3VpdGUpICYmXG4gICAgICAgICAgICAgICAgIGNhcmQuVmFsdWUgPT0gbGFzdENhcmQuVmFsdWUgLSAxKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZmFuQ2FyZHMoKXtcbiAgICAgICAgbGV0IG9mZnNldDpudW1iZXIgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaTx0aGlzLmNhcmRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzW2ldLlNob3dpbmdGYWNlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRzW2ldLnNldEZhbk9mZnNldChvZmZzZXQpO1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSB0aGlzLmZhbk9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9UYWJsZWF1Q2FyZFBpbGUudHMiLCJpbXBvcnQge0dhbWV9IGZyb20gXCIuL0dhbWVcIlxuXG53aW5kb3dbXCJnYW1lXCJdID0gbmV3IEdhbWUoKTtcbi8vcHJvY2Vzcy5leGl0KCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbWFpbi50cyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvfi9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9+L3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwod2luZG93LCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL34vdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==