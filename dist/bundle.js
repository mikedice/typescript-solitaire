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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Associates a UI element and an array of cards. The UI element
// represents the location of the card on the screen
var CardPile = (function () {
    function CardPile(domId, handleDragOver, handleDrop) {
        this.domId = domId;
        this.cards = new Array();
        this.uiElement = document.getElementById(domId);
        this.uiElement['cardPile'] = this;
        if (handleDragOver)
            this.uiElement.addEventListener('dragover', handleDragOver);
        if (handleDrop)
            this.uiElement.addEventListener('drop', handleDrop);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Suite_1 = __webpack_require__(2);
// associates a card suite and value with a UI element
// that represents the card
var Card = (function () {
    function Card(Suite, Value, ImageFile, DragAndDrop, ShowFace, ShowingFace) {
        if (ShowFace === void 0) { ShowFace = false; }
        if (ShowingFace === void 0) { ShowingFace = false; }
        var _this = this;
        this.Suite = Suite;
        this.Value = Value;
        this.ImageFile = ImageFile;
        this.DragAndDrop = DragAndDrop;
        this.ShowFace = ShowFace;
        this.ShowingFace = ShowingFace;
        this.uiElement = document.createElement("img");
        this.uiElement.id = "card-" + this.Suite + "-" + this.Value;
        this.uiElement.setAttribute('class', 'card');
        this.uiElement['card'] = this;
        this.uiElement.addEventListener('dragstart', function (e) { return _this.handleDragStart(e); });
        if (this.ShowFace) {
            this.showFace();
        }
        else {
            this.showBack();
        }
    }
    Card.prototype.handleDragStart = function (e) {
        if (this.ShowingFace == false)
            return e.preventDefault();
        var parentId = this.getParentPileId(this.uiElement);
        e.dataTransfer.setData("text/plain", JSON.stringify({
            cardSuite: this.Suite,
            cardValue: this.Value,
            sourcePile: parentId
        }));
    };
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
    Card.prototype.getParentPileId = function (uiElement) {
        var parent = this.uiElement.parentElement;
        while (parent) {
            if (parent.id === 'stock' ||
                parent.id === 'waste' ||
                parent.id.indexOf('foundation') >= 0 ||
                parent.id.indexOf('tableau') >= 0)
                break;
            parent = parent.parentElement;
        }
        if (parent)
            return parent.id;
        return '';
    };
    return Card;
}());
exports.Card = Card;


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(4);
window["game"] = new Game_1.Game();
//process.exit(); 


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CardDeck_1 = __webpack_require__(5);
var CardPile_1 = __webpack_require__(0);
var FoundationCardPile_1 = __webpack_require__(6);
var TableauCardPile_1 = __webpack_require__(7);
var Suite_1 = __webpack_require__(2);
var DragAndDrop_1 = __webpack_require__(8);
var Game = (function () {
    function Game() {
        this.dragAndDrop = new DragAndDrop_1.DragAndDrop();
        this.cardDeck = new CardDeck_1.CardDeck(this.dragAndDrop);
        this.stock = new CardPile_1.CardPile("stock", null, null);
        this.waste = new CardPile_1.CardPile("waste", null, null);
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
        this.stock.showTopCard();
        for (var i = 0; i < 7; i++) {
            this.tableau[i].showTopCard();
        }
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = __webpack_require__(1);
var CardDeck = (function () {
    function CardDeck(dragAndDrop) {
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
            this.Cards[i] = new Card_1.Card(suite, value++, file, dragAndDrop);
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
/* 6 */
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
var CardPile_1 = __webpack_require__(0);
var FoundationCardPile = (function (_super) {
    __extends(FoundationCardPile, _super);
    function FoundationCardPile(suite, domId) {
        var _this = _super.call(this, domId, function (e) {
            console.log("foundation dragover");
            return true;
        }, function (e) {
            return false;
        }) || this;
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
/* 7 */
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
var CardPile_1 = __webpack_require__(0);
var Card_1 = __webpack_require__(1);
var TableauCardPile = (function (_super) {
    __extends(TableauCardPile, _super);
    function TableauCardPile(domId, fanOffset) {
        if (fanOffset === void 0) { fanOffset = 30; }
        var _this = _super.call(this, domId, function (e) {
            console.log("tableau drag over");
            e.preventDefault();
        }, function (e) {
            console.log("tableau drop");
            e.preventDefault();
            _this.handleCardDrop(e);
        }) || this;
        _this.fanOffset = fanOffset;
        _this.fanCards();
        return _this;
    }
    TableauCardPile.prototype.push = function (card) {
        _super.prototype.push.call(this, card);
        this.fanCards();
    };
    TableauCardPile.prototype.handleCardDrop = function (e) {
        for (var i = 0; i < e.dataTransfer.types.length; i++) {
            if (e.dataTransfer.types[i] === "text/plain") {
                var dataStr = e.dataTransfer.getData("text/plain");
                var dropData = JSON.parse(dataStr);
                if (this.canAcceptCard(dropData)) {
                    console.log("card accepted");
                }
                else
                    console.log("card rejected");
                break;
            }
        }
    };
    TableauCardPile.prototype.canAcceptCard = function (dropData) {
        // If there are no cards on the pile then a King can be dropped
        if (this.cards.length == 0)
            return dropData.value == 13;
        var lastCard = this.cards[this.cards.length - 1];
        // return opposite colors and new cards value is one more
        // than last card's value
        return (Card_1.Card.isRed(lastCard.Suite) &&
            Card_1.Card.isBlack(dropData.cardSuite) &&
            dropData.cardValue == lastCard.Value - 1)
            ||
                (Card_1.Card.isBlack(lastCard.Suite) &&
                    Card_1.Card.isRed(dropData.cardSuite) &&
                    dropData.cardValue == lastCard.Value - 1);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DragAndDrop = (function () {
    function DragAndDrop() {
    }
    DragAndDrop.prototype.handleDragStart = function (e) {
        console.log("dragstart");
    };
    return DragAndDrop;
}());
exports.DragAndDrop = DragAndDrop;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTQ0MzMwNGExNjhmZDc3MjE1ZDYiLCJ3ZWJwYWNrOi8vLy4vQ2FyZFBpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9TdWl0ZS50cyIsIndlYnBhY2s6Ly8vLi9tYWluLnRzIiwid2VicGFjazovLy8uL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vQ2FyZERlY2sudHMiLCJ3ZWJwYWNrOi8vLy4vRm91bmRhdGlvbkNhcmRQaWxlLnRzIiwid2VicGFjazovLy8uL1RhYmxlYXVDYXJkUGlsZS50cyIsIndlYnBhY2s6Ly8vLi9EcmFnQW5kRHJvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUMzREEsZ0VBQWdFO0FBQ2hFLG9EQUFvRDtBQUNwRDtJQUlJLGtCQUEwQixLQUFZLEVBQUUsY0FBNEIsRUFBRSxVQUF3QjtRQUFwRSxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxV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SyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDN0IsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLENBaEVvQyxtQkFBUSxHQWdFNUM7QUFoRVksMENBQWU7Ozs7Ozs7Ozs7QUNKNUI7SUFDSTtJQUNBLENBQUM7SUFFTSxxQ0FBZSxHQUF0QixVQUF1QixDQUFXO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQztBQVBZLGtDQUFXIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU0NDMzMDRhMTY4ZmQ3NzIxNWQ2IiwiaW1wb3J0IHtDYXJkfSBmcm9tIFwiLi9DYXJkXCJcblxuLy8gQXNzb2NpYXRlcyBhIFVJIGVsZW1lbnQgYW5kIGFuIGFycmF5IG9mIGNhcmRzLiBUaGUgVUkgZWxlbWVudFxuLy8gcmVwcmVzZW50cyB0aGUgbG9jYXRpb24gb2YgdGhlIGNhcmQgb24gdGhlIHNjcmVlblxuZXhwb3J0IGNsYXNzIENhcmRQaWxlIHtcbiAgICBwcm90ZWN0ZWQgY2FyZHM6QXJyYXk8Q2FyZD47XG4gICAgcHVibGljIHVpRWxlbWVudDpIVE1MRWxlbWVudDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgZG9tSWQ6c3RyaW5nLCBoYW5kbGVEcmFnT3ZlcjpFdmVudExpc3RlbmVyLCBoYW5kbGVEcm9wOkV2ZW50TGlzdGVuZXIpe1xuICAgICAgICB0aGlzLmNhcmRzID0gbmV3IEFycmF5PENhcmQ+KCk7XG4gICAgICAgIHRoaXMudWlFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9tSWQpO1xuICAgICAgICB0aGlzLnVpRWxlbWVudFsnY2FyZFBpbGUnXSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKGhhbmRsZURyYWdPdmVyKVxuICAgICAgICB0aGlzLnVpRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGhhbmRsZURyYWdPdmVyKVxuXG4gICAgICAgIGlmIChoYW5kbGVEcm9wKVxuICAgICAgICB0aGlzLnVpRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgaGFuZGxlRHJvcCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBwdXNoKGNhcmQ6Q2FyZCl7XG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChjYXJkKTtcbiAgICAgICAgdGhpcy51aUVsZW1lbnQuYXBwZW5kQ2hpbGQoY2FyZC51aUVsZW1lbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwb3AoKTpDYXJke1xuICAgICAgICBpZiAodGhpcy5jYXJkcy5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgdmFyIGNhcmQgPSB0aGlzLmNhcmRzLnBvcCgpO1xuXG4gICAgICAgIC8vIGRyYWd1bGEgcmVtb3ZlcyB0aGUgY2hpbGQgZWxlbWVudCBmcm9tIG91ciB1aUVsZW1lbnQncyBsaXN0XG4gICAgICAgIC8vIG9mIGNoaWxkcmVuXG4gICAgICAgIC8vIHRoaXMudWlFbGVtZW50LnJlbW92ZUNoaWxkKGNhcmQudWlFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuXG4gICAgcHVibGljIHBvcE11bHRpKGNvdW50Om51bWJlcik6QXJyYXk8Q2FyZD57XG4gICAgICAgIGlmIChjb3VudCA+IHRoaXMuY2FyZHMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuY2FyZHMuc2xpY2UodGhpcy5jYXJkcy5sZW5ndGgtY291bnQtMSwgY291bnQpO1xuXG4gICAgICAgIC8vIGRyYWd1bGEgcmVtb3ZlcyB0aGUgY2hpbGQgZWxlbWVudCBmcm9tIG91ciB1aUVsZW1lbnQncyBsaXN0XG4gICAgICAgIC8vIG9mIGNoaWxkcmVuXG4gICAgICAgIC8vIGZvcihsZXQgcG9wcGVkIG9mIHJlc3VsdCl7XG4gICAgICAgIC8vICAgICB0aGlzLnVpRWxlbWVudC5yZW1vdmVDaGlsZChwb3BwZWQudWlFbGVtZW50KTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93VG9wQ2FyZCgpe1xuICAgICAgICBpZiAodGhpcy5jYXJkcy5sZW5ndGggPT0wKSByZXR1cm47XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkcy5sZW5ndGgtMV0uc2hvd0ZhY2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VG9wQ2FyZCgpOkNhcmR7XG4gICAgICAgIGlmICh0aGlzLmNhcmRzLmxlbmd0aCA9PTApIHJldHVybjtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FyZHNbdGhpcy5jYXJkcy5sZW5ndGgtMV07XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NhcmRQaWxlLnRzIiwiaW1wb3J0IHtTdWl0ZX0gZnJvbSBcIi4vU3VpdGVcIlxuaW1wb3J0IHtEcmFnQW5kRHJvcH0gZnJvbSBcIi4vRHJhZ0FuZERyb3BcIlxuXG4vLyBhc3NvY2lhdGVzIGEgY2FyZCBzdWl0ZSBhbmQgdmFsdWUgd2l0aCBhIFVJIGVsZW1lbnRcbi8vIHRoYXQgcmVwcmVzZW50cyB0aGUgY2FyZFxuZXhwb3J0IGNsYXNzIENhcmR7XG4gICAgcHVibGljIHVpRWxlbWVudDpIVE1MRWxlbWVudDtcbiAgICBcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBTdWl0ZTpTdWl0ZSwgXG4gICAgICAgIHB1YmxpYyBWYWx1ZTpudW1iZXIsXG4gICAgICAgIHB1YmxpYyBJbWFnZUZpbGU6c3RyaW5nLFxuICAgICAgICBwdWJsaWMgRHJhZ0FuZERyb3A6RHJhZ0FuZERyb3AsXG4gICAgICAgIHB1YmxpYyBTaG93RmFjZTpib29sZWFuPWZhbHNlLFxuICAgICAgICBwdWJsaWMgU2hvd2luZ0ZhY2U6Ym9vbGVhbj1mYWxzZSl7XG4gICAgICAgICAgICB0aGlzLnVpRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICB0aGlzLnVpRWxlbWVudC5pZCA9IGBjYXJkLSR7dGhpcy5TdWl0ZX0tJHt0aGlzLlZhbHVlfWA7XG4gICAgICAgICAgICB0aGlzLnVpRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NhcmQnKTtcbiAgICAgICAgICAgIHRoaXMudWlFbGVtZW50WydjYXJkJ10gPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy51aUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgXG4gICAgICAgICAgICAgICAgKGU6RHJhZ0V2ZW50KT0+dGhpcy5oYW5kbGVEcmFnU3RhcnQoZSkpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5TaG93RmFjZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RmFjZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dCYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVEcmFnU3RhcnQoZTpEcmFnRXZlbnQpe1xuICAgICAgICBpZiAodGhpcy5TaG93aW5nRmFjZT09ZmFsc2UpIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIHBhcmVudElkID0gdGhpcy5nZXRQYXJlbnRQaWxlSWQodGhpcy51aUVsZW1lbnQpO1xuICAgICAgICBcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgY2FyZFN1aXRlOiB0aGlzLlN1aXRlLFxuICAgICAgICAgICAgY2FyZFZhbHVlOiB0aGlzLlZhbHVlLFxuICAgICAgICAgICAgc291cmNlUGlsZTogcGFyZW50SWRcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBwdWJsaWMgc2hvd0ZhY2UoKXtcbiAgICAgICAgdGhpcy5TaG93aW5nRmFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudWlFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgYC4vU1ZHLWNhcmRzLTEuMy8ke3RoaXMuSW1hZ2VGaWxlfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93QmFjaygpe1xuICAgICAgICB0aGlzLlNob3dpbmdGYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudWlFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vU1ZHLWNhcmRzLTEuMy9jYXJkLWJhY2stYXNzZXRzL2NhcmQtYmFjay5wbmcnKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHNldEZhbk9mZnNldChvZmZzZXRJblB4Om51bWJlcil7XG4gICAgICAgIHRoaXMudWlFbGVtZW50LnN0eWxlWyd0b3AnXSA9IGAke29mZnNldEluUHh9cHhgO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNSZWQoc3VpdGU6U3VpdGUpOmJvb2xlYW57XG4gICAgICAgIHJldHVybiBzdWl0ZSE9U3VpdGUuQ2x1YnMgJiYgc3VpdGUgIT0gU3VpdGUuU3BhZGVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNCbGFjayhzdWl0ZTpTdWl0ZSk6Ym9vbGVhbntcbiAgICAgICAgcmV0dXJuIHN1aXRlICE9IFN1aXRlLkRpYW1vbmRzICYmIHN1aXRlICE9IFN1aXRlLkhlYXJ0cztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBhcmVudFBpbGVJZCh1aUVsZW1lbnQ6SFRNTEVsZW1lbnQpOnN0cmluZ3tcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudWlFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHdoaWxlKHBhcmVudCl7XG4gICAgICAgICAgICBpZiAocGFyZW50LmlkID09PSAnc3RvY2snIHx8XG4gICAgICAgICAgICAgICAgcGFyZW50LmlkID09PSAnd2FzdGUnIHx8XG4gICAgICAgICAgICAgICAgcGFyZW50LmlkLmluZGV4T2YoJ2ZvdW5kYXRpb24nKSA+PSAwIHx8XG4gICAgICAgICAgICAgICAgcGFyZW50LmlkLmluZGV4T2YoJ3RhYmxlYXUnKSA+PSAwKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyZW50KSByZXR1cm4gcGFyZW50LmlkO1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NhcmQudHMiLCJleHBvcnQgZW51bSBTdWl0ZXtcbiAgICBDbHVicz0wLFxuICAgIERpYW1vbmRzLFxuICAgIEhlYXJ0cyxcbiAgICBTcGFkZXNcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9TdWl0ZS50cyIsImltcG9ydCB7R2FtZX0gZnJvbSBcIi4vR2FtZVwiXG5cbndpbmRvd1tcImdhbWVcIl0gPSBuZXcgR2FtZSgpO1xuLy9wcm9jZXNzLmV4aXQoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9tYWluLnRzIiwiaW1wb3J0IHtDYXJkRGVja30gZnJvbSAnLi9DYXJkRGVjaydcbmltcG9ydCB7Q2FyZFBpbGV9IGZyb20gJy4vQ2FyZFBpbGUnXG5pbXBvcnQge0ZvdW5kYXRpb25DYXJkUGlsZX0gZnJvbSAnLi9Gb3VuZGF0aW9uQ2FyZFBpbGUnXG5pbXBvcnQge1RhYmxlYXVDYXJkUGlsZX0gZnJvbSAnLi9UYWJsZWF1Q2FyZFBpbGUnXG5pbXBvcnQge0NhcmR9IGZyb20gJy4vQ2FyZCdcbmltcG9ydCB7U3VpdGV9IGZyb20gJy4vU3VpdGUnXG5pbXBvcnQge0RyYWdBbmREcm9wfSBmcm9tICcuL0RyYWdBbmREcm9wJ1xuXG5leHBvcnQgY2xhc3MgR2FtZSB7XG4gICAgcHJpdmF0ZSBjYXJkRGVjazogQ2FyZERlY2s7XG4gICAgcHJpdmF0ZSBzdG9jazogQ2FyZFBpbGU7XG4gICAgcHJpdmF0ZSB3YXN0ZTogQ2FyZFBpbGU7XG4gICAgcHJpdmF0ZSBmb3VuZGF0aW9uczogQXJyYXk8Rm91bmRhdGlvbkNhcmRQaWxlPjtcbiAgICBwcml2YXRlIHRhYmxlYXU6IEFycmF5PFRhYmxlYXVDYXJkUGlsZT47XG4gICAgcHJpdmF0ZSBkcmFnQW5kRHJvcDpEcmFnQW5kRHJvcDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmRyYWdBbmREcm9wID0gbmV3IERyYWdBbmREcm9wKCk7XG4gICAgICAgIHRoaXMuY2FyZERlY2sgPSBuZXcgQ2FyZERlY2sodGhpcy5kcmFnQW5kRHJvcCk7XG4gICAgICAgIHRoaXMuc3RvY2sgPSBuZXcgQ2FyZFBpbGUoXCJzdG9ja1wiLCBudWxsLCBudWxsKTtcbiAgICAgICAgdGhpcy53YXN0ZSA9IG5ldyBDYXJkUGlsZShcIndhc3RlXCIsIG51bGwsIG51bGwpO1xuICAgICAgICB0aGlzLmZvdW5kYXRpb25zID0gbmV3IEFycmF5PEZvdW5kYXRpb25DYXJkUGlsZT4oKTtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9ucy5wdXNoKG5ldyBGb3VuZGF0aW9uQ2FyZFBpbGUoU3VpdGUuSGVhcnRzLCBcImZvdW5kYXRpb24taGVhcnRzXCIpKTtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9ucy5wdXNoKG5ldyBGb3VuZGF0aW9uQ2FyZFBpbGUoU3VpdGUuRGlhbW9uZHMsXCJmb3VuZGF0aW9uLWRpYW1vbmRzXCIpKTtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9ucy5wdXNoKG5ldyBGb3VuZGF0aW9uQ2FyZFBpbGUoU3VpdGUuQ2x1YnMsXCJmb3VuZGF0aW9uLWNsdWJzXCIpKTtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9ucy5wdXNoKG5ldyBGb3VuZGF0aW9uQ2FyZFBpbGUoU3VpdGUuU3BhZGVzLCBcImZvdW5kYXRpb24tc3BhZGVzXCIpKTtcbiAgICAgICAgdGhpcy50YWJsZWF1ID0gbmV3IEFycmF5PFRhYmxlYXVDYXJkUGlsZT4oKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8NzsgaSsrKSB0aGlzLnRhYmxlYXUucHVzaChuZXcgVGFibGVhdUNhcmRQaWxlKGB0YWJsZWF1LSR7aSsxfWApKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGVhbCgpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGRlYWwoKXtcbiAgICAgICAgLy8gZGVhbCBjYXJkcyBpbnRvIHRoZSByaWdodCBwaWxlc1xuICAgICAgICBsZXQgdGFibGVhdUlkeCA9IDA7XG4gICAgICAgIGxldCB0YWJsZWF1Q291bnRzID0gWzEsMiwzLDQsNSw2LDddXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPDUyOyBpKyspe1xuICAgICAgICAgICAgaWYgKHRhYmxlYXVJZHggPCA3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZWF1W3RhYmxlYXVJZHhdLnB1c2godGhpcy5jYXJkRGVjay5DYXJkc1tpXSk7XG4gICAgICAgICAgICAgICAgdGFibGVhdUNvdW50c1t0YWJsZWF1SWR4XS0tO1xuXG4gICAgICAgICAgICAgICAgaWYodGFibGVhdUNvdW50c1t0YWJsZWF1SWR4XT09MCkgdGFibGVhdUlkeCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b2NrLnB1c2godGhpcy5jYXJkRGVjay5DYXJkc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgIHRoaXMuc3RvY2suc2hvd1RvcENhcmQoKTtcbiAgICAgICBmb3IgKHZhciBpID0gMDsgaTw3OyBpKyspIHtcbiAgICAgICAgICAgdGhpcy50YWJsZWF1W2ldLnNob3dUb3BDYXJkKCk7XG4gICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlQ2FyZEZyb21QaWxlKGNhcmRFbDpIVE1MRWxlbWVudCwgcGlsZUVsOkhUTUxFbGVtZW50KTpDYXJkXG4gICAge1xuICAgICAgICB2YXIgc3JjQ2FyZCA9IEdhbWUuY2FyZEZyb21FbChjYXJkRWwpO1xuICAgICAgICB2YXIgcGlsZSA9IHRoaXMuY2FyZFBpbGVGcm9tRWwocGlsZUVsKTtcbiAgICAgICAgaWYgKHBpbGUgJiYgc3JjQ2FyZCl7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gcGlsZS5wb3AoKTtcbiAgICAgICAgICAgIHBpbGUuc2hvd1RvcENhcmQoKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRDYXJkVG9QaWxlKGNhcmQ6Q2FyZCwgcGlsZUVsOkhUTUxFbGVtZW50KVxuICAgIHtcbiAgICAgICAgdmFyIGNhcmRQaWxlID0gdGhpcy5jYXJkUGlsZUZyb21FbChwaWxlRWwpO1xuICAgICAgICBpZiAoY2FyZFBpbGUpeyBjYXJkUGlsZS5wdXNoKGNhcmQpOyB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYW5Ecm9wT25UYWJsZWF1KGNhcmQ6Q2FyZCwgdGFyZzpIVE1MRWxlbWVudCk6Qm9vbGVhbntcbiAgICAgICAgdmFyIGNhcmRQaWxlID0gdGhpcy50YWJsZWF1RnJvbUVsKHRhcmcpO1xuICAgICAgICBpZiAoIWNhcmRQaWxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBjYXJkUGlsZS5jYW5BY2NlcHRDYXJkKGNhcmQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FyZFBpbGVGcm9tRWwocGlsZUVsOkhUTUxFbGVtZW50KTpDYXJkUGlsZXtcbiAgICAgICAgbGV0IHBpbGU6Q2FyZFBpbGUgPSB0aGlzLmZvdW5kYXRpb25Gcm9tRWwocGlsZUVsKTtcbiAgICAgICAgaWYgKHBpbGUpIHJldHVybiBwaWxlO1xuXG4gICAgICAgIHBpbGUgPSAgdGhpcy50YWJsZWF1RnJvbUVsKHBpbGVFbCk7XG4gICAgICAgIGlmIChwaWxlKSByZXR1cm4gcGlsZTtcblxuICAgICAgICBwaWxlID0gdGhpcy5zdG9ja0Zyb21FbChwaWxlRWwpO1xuICAgICAgICBpZiAocGlsZSkgcmV0dXJuIHBpbGU7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy53YXN0ZUZyb21FbChwaWxlRWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm91bmRhdGlvbkZyb21FbChlbDpIVE1MRWxlbWVudCk6Rm91bmRhdGlvbkNhcmRQaWxlXG4gICAge1xuICAgICAgICB2YXIgZWxzID0gZWwuaWQuc3BsaXQoXCItXCIpO1xuICAgICAgICBsZXQgaWQ6bnVtYmVyID0gLTE7XG4gICAgICAgIHN3aXRjaChlbHNbMV0pe1xuICAgICAgICAgICAgY2FzZSBcImhlYXJ0c1wiOlxuICAgICAgICAgICAgICAgIGlkPTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZGlhbW9uZHNcIjpcbiAgICAgICAgICAgICAgICBpZD0xO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNsdWJzXCI6XG4gICAgICAgICAgICAgICAgaWQ9MjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzcGFkZXNcIjpcbiAgICAgICAgICAgICAgICBpZD0zO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoaWQgPT0gLTEpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uc1tpZF07IFxuICAgIH1cblxuICAgIHByaXZhdGUgdGFibGVhdUZyb21FbChlbDpIVE1MRWxlbWVudCk6VGFibGVhdUNhcmRQaWxlXG4gICAge1xuICAgICAgICB2YXIgZWxzID0gZWwuaWQuc3BsaXQoXCItXCIpO1xuICAgICAgICB2YXIgaWQgPSBwYXJzZUludChlbHNbMV0pO1xuICAgICAgICBpZCAtPSAxO1xuICAgICAgICBpZiAoaWQgPCAwIHx8IGlkID4gNikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgdmFyIGNhcmRQaWxlID0gdGhpcy50YWJsZWF1W2lkXTtcbiAgICAgICAgcmV0dXJuIGNhcmRQaWxlO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvY2tGcm9tRWwoZWw6SFRNTEVsZW1lbnQpOkNhcmRQaWxle1xuICAgICAgICBpZiAoR2FtZS5pc1N0b2NrKGVsKSl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9jaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgICBwcml2YXRlIHdhc3RlRnJvbUVsKGVsOkhUTUxFbGVtZW50KTpDYXJkUGlsZXtcbiAgICAgICAgaWYgKEdhbWUuaXNXYXN0ZShlbCkpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2FzdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbkRyb3BPbkZvdW5kYXRpb24oY2FyZDpDYXJkLCB0YXJnOkhUTUxFbGVtZW50KTpCb29sZWFue1xuICAgICAgICB2YXIgY2FyZFBpbGUgPSB0aGlzLmZvdW5kYXRpb25Gcm9tRWwodGFyZyk7XG4gICAgICAgIGlmICghY2FyZFBpbGUpIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gY2FyZFBpbGUuY2FuQWNjZXB0Q2FyZChjYXJkKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNUYWJsZWF1KGVsOkhUTUxFbGVtZW50KTpCb29sZWFue1xuICAgICAgICByZXR1cm4gR2FtZS5pc0VsT2ZUeXBlKGVsLCBcInRhYmxlYXVcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNGb3VuZGF0aW9uKGVsOkhUTUxFbGVtZW50KTpCb29sZWFue1xuICAgICAgICByZXR1cm4gR2FtZS5pc0VsT2ZUeXBlKGVsLCBcImZvdW5kYXRpb25cIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNTdG9jayhlbDpIVE1MRWxlbWVudCk6Qm9vbGVhbntcbiAgICAgICAgcmV0dXJuIEdhbWUuaXNFbE9mVHlwZShlbCwgXCJzdG9ja1wiKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNXYXN0ZShlbDpIVE1MRWxlbWVudCk6Qm9vbGVhbntcbiAgICAgICAgcmV0dXJuIEdhbWUuaXNFbE9mVHlwZShlbCwgXCJ3YXN0ZVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpc0VsT2ZUeXBlKGVsOkhUTUxFbGVtZW50LCB0eXBlOnN0cmluZyk6Qm9vbGVhbntcbiAgICAgICAgICAgIGlmIChlbC5pZCl7XG4gICAgICAgICAgICB2YXIgZWxzID0gZWwuaWQuc3BsaXQoXCItXCIpXG4gICAgICAgICAgICByZXR1cm4gZWxzWzBdPT09dHlwZTsgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGNhcmRGcm9tRWwoZWw6SFRNTEVsZW1lbnQpOkNhcmR7XG4gICAgICAgIHZhciBlbHMgPSBlbC5pZC5zcGxpdChcIi1cIik7XG4gICAgICAgIGlmIChlbHNbMF09PT0nY2FyZCcpe1xuICAgICAgICAgICAgcmV0dXJuIGVsWydjYXJkJ107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmludEFjY2VwdHNEaWFnbm9zdGljKHJlc3VsdDpCb29sZWFuLCBjYXJkOkNhcmQsIHRhcmdldDpIVE1MRWxlbWVudCwgc291cmNlOkhUTUxFbGVtZW50KXtcbiAgICAgICAgdmFyIHRhcmdldFBpbGUgPSB0aGlzLmNhcmRQaWxlRnJvbUVsKHRhcmdldCk7XG4gICAgICAgIHZhciB0YXJnZXRUb3AgPSB0YXJnZXRQaWxlID8gdGFyZ2V0UGlsZS5nZXRUb3BDYXJkKCkgOiBudWxsO1xuICAgICAgICB2YXIgdG9wU3RyaW5nID0gdGFyZ2V0VG9wID8gYCR7dGFyZ2V0VG9wLlN1aXRlfToke3RhcmdldFRvcC5WYWx1ZX1gOlwibnVsbFwiO1xuICAgICAgICBjb25zb2xlLmxvZyAoYCR7cmVzdWx0PydjYW4nOidjYW5ub3QnfSBkcm9wICR7Y2FyZC5TdWl0ZX06JHtjYXJkLlZhbHVlfSBvbiAke3RhcmdldC5pZH0gJHt0b3BTdHJpbmd9IGZyb20gJHtzb3VyY2UuaWR9YCk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0dhbWUudHMiLCJpbXBvcnQge0NhcmR9IGZyb20gXCIuL0NhcmRcIlxuaW1wb3J0IHtTdWl0ZX0gZnJvbSBcIi4vU3VpdGVcIlxuaW1wb3J0IHtEcmFnQW5kRHJvcH0gZnJvbSBcIi4vRHJhZ0FuZERyb3BcIlxuXG5leHBvcnQgY2xhc3MgQ2FyZERlY2t7XG4gICAgcHVibGljIENhcmRzOiBBcnJheTxDYXJkPlxuICAgIGNvbnN0cnVjdG9yKGRyYWdBbmREcm9wOkRyYWdBbmREcm9wKXtcbiAgICAgICAgdGhpcy5DYXJkcyA9IG5ldyBBcnJheTxDYXJkPig1Mik7XG4gICAgICAgIHZhciB2YWx1ZT0xO1xuICAgICAgICB2YXIgc3VpdGUgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaTw1MjsgaSsrKXtcbiAgICAgICAgICAgIHZhciBmaWxlID0gdGhpcy5jYXJkRmlsZXNbc3VpdGVdW3ZhbHVlLTFdO1xuICAgICAgICAgICAgdGhpcy5DYXJkc1tpXSA9IG5ldyBDYXJkKHN1aXRlLCB2YWx1ZSsrLCBmaWxlLCBkcmFnQW5kRHJvcCk7XG4gICAgICAgICAgICBpZiAodmFsdWU9PTE0KXtcbiAgICAgICAgICAgICAgICBzdWl0ZSsrO1xuICAgICAgICAgICAgICAgIHZhbHVlPTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aTw1MjtpKyspe1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5DYXJkc1tpXS5TdWl0ZX0gJHt0aGlzLkNhcmRzW2ldLlZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2h1ZmZsZSgpO1xuXG4gICAgICAgIHRoaXMudmVyaWZ5KCk7XG4gICAgfVxuXG4vLyBGaXNoZXItWWF0ZXMgYWxnb3JpdGhtXG4gICAgcHJpdmF0ZSBzaHVmZmxlKCl7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPHRoaXMuQ2FyZHMubGVuZ3RoLTE7IGkrKyl7XG4gICAgICAgICAgICB2YXIgcmFuZCA9IHRoaXMuZ2V0UmFuZG9tSW50KGksdGhpcy5DYXJkcy5sZW5ndGgpO1xuICAgICAgICAgICAgbGV0IHRlbXA6Q2FyZCA9IHRoaXMuQ2FyZHNbaV07XG4gICAgICAgICAgICB0aGlzLkNhcmRzW2ldID0gdGhpcy5DYXJkc1tyYW5kXTtcbiAgICAgICAgICAgIHRoaXMuQ2FyZHNbcmFuZF0gPSB0ZW1wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2ZXJpZnkoKXtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aTw1MjtpKyspe1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5DYXJkc1tpXS5TdWl0ZX0gJHt0aGlzLkNhcmRzW2ldLlZhbHVlfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHZhbHVlcyA9IHtcbiAgICAgICAgICAgIHplcm86W10sXG4gICAgICAgICAgICBvbmU6W10sXG4gICAgICAgICAgICB0d286W10sXG4gICAgICAgICAgICB0aHJlZTpbXVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPDUyOyBpKyspe1xuICAgICAgICAgICAgc3dpdGNoKHRoaXMuQ2FyZHNbaV0uU3VpdGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnplcm8ucHVzaCh0aGlzLkNhcmRzW2ldLlZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5vbmUucHVzaCh0aGlzLkNhcmRzW2ldLlZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy50d28ucHVzaCh0aGlzLkNhcmRzW2ldLlZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy50aHJlZS5wdXNoKHRoaXMuQ2FyZHNbaV0uVmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGBjbHVic1ske3ZhbHVlcy56ZXJvLmxlbmd0aH1dICR7dmFsdWVzLnplcm99YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBkaWFtb25kc1ske3ZhbHVlcy5vbmUubGVuZ3RofV0gJHt2YWx1ZXMub25lfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgaGVhcnRzWyR7dmFsdWVzLnR3by5sZW5ndGh9XSAke3ZhbHVlcy50d299YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzcGFkZXNbJHt2YWx1ZXMudGhyZWUubGVuZ3RofV0gJHt2YWx1ZXMudGhyZWV9YCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21JbnQobWluOm51bWJlciwgbWF4Om51bWJlcikge1xuICAgICAgICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgICAgICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluOyAvL1RoZSBtYXhpbXVtIGlzIGV4Y2x1c2l2ZSBhbmQgdGhlIG1pbmltdW0gaXMgaW5jbHVzaXZlXG4gICAgfVxuICAgIHByaXZhdGUgY2FyZEZpbGVzID0gW1tcbiAgICAgICAgXCJhY2Vfb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwiMl9vZl9jbHVicy5zdmdcIixcbiAgICAgICAgXCIzX29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcIjRfb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwiNV9vZl9jbHVicy5zdmdcIixcbiAgICAgICAgXCI2X29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcIjdfb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwiOF9vZl9jbHVicy5zdmdcIixcbiAgICAgICAgXCI5X29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcIjEwX29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcImphY2tfb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwicXVlZW5fb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwia2luZ19vZl9jbHVicy5zdmdcIl0sXG5cbiAgICAgICAgW1wiYWNlX29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcIjJfb2ZfZGlhbW9uZHMuc3ZnXCIsXG4gICAgICAgIFwiM19vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCI0X29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcIjVfb2ZfZGlhbW9uZHMuc3ZnXCIsXG4gICAgICAgIFwiNl9vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCI3X29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcIjhfb2ZfZGlhbW9uZHMuc3ZnXCIsXG4gICAgICAgIFwiOV9vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCIxMF9vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCJqYWNrX29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcInF1ZWVuX29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcImtpbmdfb2ZfZGlhbW9uZHMuc3ZnXCJdLFxuXG4gICAgICAgIFtcImFjZV9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiMl9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiM19vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiNF9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiNV9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiNl9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiN19vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiOF9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiOV9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwiMTBfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcImphY2tfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcInF1ZWVuX29mX2hlYXJ0cy5zdmdcIixcbiAgICAgICAgXCJraW5nX29mX2hlYXJ0cy5zdmdcIl0sXG5cbiAgICAgICAgW1wiYWNlX29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCIyX29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCIzX29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCI0X29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCI1X29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCI2X29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCI3X29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCI4X29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCI5X29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCIxMF9vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwiamFja19vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwicXVlZW5fb2Zfc3BhZGVzLnN2Z1wiLFxuICAgICAgICBcImtpbmdfb2Zfc3BhZGVzLnN2Z1wiXV07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2FyZERlY2sudHMiLCJpbXBvcnQge0NhcmRQaWxlfSBmcm9tIFwiLi9DYXJkUGlsZVwiXG5pbXBvcnQge1N1aXRlfSBmcm9tIFwiLi9TdWl0ZVwiXG5pbXBvcnQge0NhcmR9IGZyb20gXCIuL0NhcmRcIlxuXG5leHBvcnQgY2xhc3MgRm91bmRhdGlvbkNhcmRQaWxlIGV4dGVuZHMgQ2FyZFBpbGVcbntcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoIHB1YmxpYyBzdWl0ZTpTdWl0ZSwgZG9tSWQ6c3RyaW5nICl7IFxuICAgICAgICBzdXBlcihkb21JZCwgXG4gICAgICAgIChlOkRyYWdFdmVudCk9PnsgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kYXRpb24gZHJhZ292ZXJcIik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgXG4gICAgICAgIH0sIFxuICAgICAgICAoZTpEcmFnRXZlbnQpPT57XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pOyBcbiAgICB9XG5cbiAgICBwdWJsaWMgcHVzaChjYXJkOkNhcmQpe1xuICAgICAgICBjYXJkLnNldEZhbk9mZnNldCgwKTtcbiAgICAgICAgc3VwZXIucHVzaChjYXJkKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGNhbkFjY2VwdENhcmQoY2FyZDpDYXJkKTpib29sZWFuIHtcbiAgICAgICAgaWYgKGNhcmQuU3VpdGUgIT0gdGhpcy5zdWl0ZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIG5vIGNhcmRzIG9uIHRoZSBwaWxlIGFuZCB0aGUgbmV3IGNhcmQgaXMgYW4gQWNlXG4gICAgICAgIGlmICh0aGlzLmNhcmRzLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgIHJldHVybiBjYXJkLlZhbHVlID09IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBncmVhdGVyIHRoYW4gMCBjYXJkcyBvbiB0aGUgcGlsZSBhbmQgdGhlIG5ldyBjYXJkJ3NcbiAgICAgICAgLy8gdmFsdWUgaXMgb25lIGdyZWF0ZXIgdGhhbiB0aGUgbGFzdCBjYXJkXG4gICAgICAgIHJldHVybiB0aGlzLmNhcmRzLmxlbmd0aCA+IDAgJiYgdGhpcy5jYXJkc1t0aGlzLmNhcmRzLmxlbmd0aC0xXS5WYWx1ZSA9PSBjYXJkLlZhbHVlLTFcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vRm91bmRhdGlvbkNhcmRQaWxlLnRzIiwiaW1wb3J0IHtDYXJkUGlsZX0gZnJvbSBcIi4vQ2FyZFBpbGVcIlxuaW1wb3J0IHtTdWl0ZX0gZnJvbSBcIi4vU3VpdGVcIlxuaW1wb3J0IHtDYXJkfSBmcm9tIFwiLi9DYXJkXCJcblxuZXhwb3J0IGNsYXNzIFRhYmxlYXVDYXJkUGlsZSBleHRlbmRzIENhcmRQaWxlIHtcbiAgICBcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoIFxuICAgICAgICBkb21JZDpzdHJpbmcsXG4gICAgICAgIHByaXZhdGUgZmFuT2Zmc2V0Om51bWJlciA9IDMwICl7IFxuXG4gICAgICAgIHN1cGVyKGRvbUlkLCBcbiAgICAgICAgKGU6RHJhZ0V2ZW50KT0+eyBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFibGVhdSBkcmFnIG92ZXJcIik7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IFxuICAgICAgICB9LFxuICAgICAgICAoZTpEcmFnRXZlbnQpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRhYmxlYXUgZHJvcFwiKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FyZERyb3AoZSk7XG4gICAgICAgIH0pOyBcbiAgICAgICAgdGhpcy5mYW5DYXJkcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwdXNoKGNhcmQ6Q2FyZCl7XG4gICAgICAgIHN1cGVyLnB1c2goY2FyZCk7XG4gICAgICAgIHRoaXMuZmFuQ2FyZHMoKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBoYW5kbGVDYXJkRHJvcChlOkRyYWdFdmVudCl7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPGUuZGF0YVRyYW5zZmVyLnR5cGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmIChlLmRhdGFUcmFuc2Zlci50eXBlc1tpXT09PVwidGV4dC9wbGFpblwiKXtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YVN0ciA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpO1xuICAgICAgICAgICAgICAgIHZhciBkcm9wRGF0YSA9IEpTT04ucGFyc2UoZGF0YVN0cik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuQWNjZXB0Q2FyZChkcm9wRGF0YSkpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhcmQgYWNjZXB0ZWRcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBjb25zb2xlLmxvZyhcImNhcmQgcmVqZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2FuQWNjZXB0Q2FyZChkcm9wRGF0YSk6Ym9vbGVhbiB7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBjYXJkcyBvbiB0aGUgcGlsZSB0aGVuIGEgS2luZyBjYW4gYmUgZHJvcHBlZFxuICAgICAgICBpZiAodGhpcy5jYXJkcy5sZW5ndGggPT0gMCkgcmV0dXJuIGRyb3BEYXRhLnZhbHVlID09IDEzOyBcblxuICAgICAgICB2YXIgbGFzdENhcmQgPSB0aGlzLmNhcmRzW3RoaXMuY2FyZHMubGVuZ3RoLTFdO1xuXG4gICAgICAgIC8vIHJldHVybiBvcHBvc2l0ZSBjb2xvcnMgYW5kIG5ldyBjYXJkcyB2YWx1ZSBpcyBvbmUgbW9yZVxuICAgICAgICAvLyB0aGFuIGxhc3QgY2FyZCdzIHZhbHVlXG4gICAgICAgIHJldHVybiAoQ2FyZC5pc1JlZChsYXN0Q2FyZC5TdWl0ZSkgJiYgXG4gICAgICAgICAgICAgICAgQ2FyZC5pc0JsYWNrKGRyb3BEYXRhLmNhcmRTdWl0ZSkgJiYgXG4gICAgICAgICAgICAgICAgZHJvcERhdGEuY2FyZFZhbHVlID09IGxhc3RDYXJkLlZhbHVlIC0gMSkgXG4gICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIChDYXJkLmlzQmxhY2sobGFzdENhcmQuU3VpdGUpICYmIFxuICAgICAgICAgICAgICAgICBDYXJkLmlzUmVkKGRyb3BEYXRhLmNhcmRTdWl0ZSkgJiZcbiAgICAgICAgICAgICAgICAgZHJvcERhdGEuY2FyZFZhbHVlID09IGxhc3RDYXJkLlZhbHVlIC0gMSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZhbkNhcmRzKCl7XG4gICAgICAgIGxldCBvZmZzZXQ6bnVtYmVyID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8dGhpcy5jYXJkcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZiAodGhpcy5jYXJkc1tpXS5TaG93aW5nRmFjZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJkc1tpXS5zZXRGYW5PZmZzZXQob2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gdGhpcy5mYW5PZmZzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vVGFibGVhdUNhcmRQaWxlLnRzIiwiZXhwb3J0IGNsYXNzIERyYWdBbmREcm9we1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoKXtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlRHJhZ1N0YXJ0KGU6RHJhZ0V2ZW50KTphbnl7XG4gICAgICAgIGNvbnNvbGUubG9nKGBkcmFnc3RhcnRgKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vRHJhZ0FuZERyb3AudHMiXSwic291cmNlUm9vdCI6IiJ9