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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
var CardDeck_1 = __webpack_require__(5);
var CardPile_1 = __webpack_require__(0);
var FoundationCardPile_1 = __webpack_require__(6);
var TableauCardPile_1 = __webpack_require__(7);
var Suite_1 = __webpack_require__(3);
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
        Game.Current = this;
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
    Game.prototype.moveCard = function (cardMove) {
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Suite_1 = __webpack_require__(3);
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
var Game_1 = __webpack_require__(1);
window["game"] = new Game_1.Game();
//process.exit(); 


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = __webpack_require__(2);
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
var Card_1 = __webpack_require__(2);
var Game_1 = __webpack_require__(1);
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
                    Game_1.Game.Current.moveCard({
                        cardSuite: dropData.cardSuite,
                        cardValue: dropData.cardValue,
                        sourcePileId: dropData.sourcePile,
                        destPileId: this.domId
                    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTE4MmMxOWFjMzEyNTg4NmIyZGEiLCJ3ZWJwYWNrOi8vLy4vQ2FyZFBpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vR2FtZS50cyIsIndlYnBhY2s6Ly8vLi9DYXJkLnRzIiwid2VicGFjazovLy8uL1N1aXRlLnRzIiwid2VicGFjazovLy8uL01haW4udHMiLCJ3ZWJwYWNrOi8vLy4vQ2FyZERlY2sudHMiLCJ3ZWJwYWNrOi8vLy4vRm91bmRhdGlvbkNhcmRQaWxlLnRzIiwid2VicGFjazovLy8uL1RhYmxlYXVDYXJkUGlsZS50cyIsIndlYnBhY2s6Ly8vLi9EcmFnQW5kRHJvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUMzREEsZ0VBQWdFO0FBQ2hFLG9EQUFvRDtBQUNwRDtJQUlJLGtCQUEwQixLQUFZLEVBQUUsY0FBNEIsRUFBRSxVQUF3QjtRQUFwRSxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxV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QUcsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLGtDQUFRLEdBQWY7UUFDSSxJQUFJLE1BQU0sR0FBVSxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUM7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM3QixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQ0F2RW9DLG1CQUFRLEdBdUU1QztBQXZFWSwwQ0FBZTs7Ozs7Ozs7OztBQ0w1QjtJQUNJO0lBQ0EsQ0FBQztJQUVNLHFDQUFlLEdBQXRCLFVBQXVCLENBQVc7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDO0FBUFksa0NBQVciLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTE4MmMxOWFjMzEyNTg4NmIyZGEiLCJpbXBvcnQge0NhcmR9IGZyb20gXCIuL0NhcmRcIlxuXG4vLyBBc3NvY2lhdGVzIGEgVUkgZWxlbWVudCBhbmQgYW4gYXJyYXkgb2YgY2FyZHMuIFRoZSBVSSBlbGVtZW50XG4vLyByZXByZXNlbnRzIHRoZSBsb2NhdGlvbiBvZiB0aGUgY2FyZCBvbiB0aGUgc2NyZWVuXG5leHBvcnQgY2xhc3MgQ2FyZFBpbGUge1xuICAgIHByb3RlY3RlZCBjYXJkczpBcnJheTxDYXJkPjtcbiAgICBwdWJsaWMgdWlFbGVtZW50OkhUTUxFbGVtZW50O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyBkb21JZDpzdHJpbmcsIGhhbmRsZURyYWdPdmVyOkV2ZW50TGlzdGVuZXIsIGhhbmRsZURyb3A6RXZlbnRMaXN0ZW5lcil7XG4gICAgICAgIHRoaXMuY2FyZHMgPSBuZXcgQXJyYXk8Q2FyZD4oKTtcbiAgICAgICAgdGhpcy51aUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkb21JZCk7XG4gICAgICAgIHRoaXMudWlFbGVtZW50WydjYXJkUGlsZSddID0gdGhpcztcblxuICAgICAgICBpZiAoaGFuZGxlRHJhZ092ZXIpXG4gICAgICAgIHRoaXMudWlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgaGFuZGxlRHJhZ092ZXIpXG5cbiAgICAgICAgaWYgKGhhbmRsZURyb3ApXG4gICAgICAgIHRoaXMudWlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBoYW5kbGVEcm9wKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHB1c2goY2FyZDpDYXJkKXtcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKGNhcmQpO1xuICAgICAgICB0aGlzLnVpRWxlbWVudC5hcHBlbmRDaGlsZChjYXJkLnVpRWxlbWVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHBvcCgpOkNhcmR7XG4gICAgICAgIGlmICh0aGlzLmNhcmRzLmxlbmd0aCA9PSAwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICB2YXIgY2FyZCA9IHRoaXMuY2FyZHMucG9wKCk7XG5cbiAgICAgICAgLy8gZHJhZ3VsYSByZW1vdmVzIHRoZSBjaGlsZCBlbGVtZW50IGZyb20gb3VyIHVpRWxlbWVudCdzIGxpc3RcbiAgICAgICAgLy8gb2YgY2hpbGRyZW5cbiAgICAgICAgLy8gdGhpcy51aUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2FyZC51aUVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9wTXVsdGkoY291bnQ6bnVtYmVyKTpBcnJheTxDYXJkPntcbiAgICAgICAgaWYgKGNvdW50ID4gdGhpcy5jYXJkcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5jYXJkcy5zbGljZSh0aGlzLmNhcmRzLmxlbmd0aC1jb3VudC0xLCBjb3VudCk7XG5cbiAgICAgICAgLy8gZHJhZ3VsYSByZW1vdmVzIHRoZSBjaGlsZCBlbGVtZW50IGZyb20gb3VyIHVpRWxlbWVudCdzIGxpc3RcbiAgICAgICAgLy8gb2YgY2hpbGRyZW5cbiAgICAgICAgLy8gZm9yKGxldCBwb3BwZWQgb2YgcmVzdWx0KXtcbiAgICAgICAgLy8gICAgIHRoaXMudWlFbGVtZW50LnJlbW92ZUNoaWxkKHBvcHBlZC51aUVsZW1lbnQpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dUb3BDYXJkKCl7XG4gICAgICAgIGlmICh0aGlzLmNhcmRzLmxlbmd0aCA9PTApIHJldHVybjtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzLmxlbmd0aC0xXS5zaG93RmFjZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUb3BDYXJkKCk6Q2FyZHtcbiAgICAgICAgaWYgKHRoaXMuY2FyZHMubGVuZ3RoID09MCkgcmV0dXJuO1xuICAgICAgICByZXR1cm4gdGhpcy5jYXJkc1t0aGlzLmNhcmRzLmxlbmd0aC0xXTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2FyZFBpbGUudHMiLCJpbXBvcnQge0NhcmREZWNrfSBmcm9tICcuL0NhcmREZWNrJ1xuaW1wb3J0IHtDYXJkUGlsZX0gZnJvbSAnLi9DYXJkUGlsZSdcbmltcG9ydCB7Rm91bmRhdGlvbkNhcmRQaWxlfSBmcm9tICcuL0ZvdW5kYXRpb25DYXJkUGlsZSdcbmltcG9ydCB7VGFibGVhdUNhcmRQaWxlfSBmcm9tICcuL1RhYmxlYXVDYXJkUGlsZSdcbmltcG9ydCB7Q2FyZH0gZnJvbSAnLi9DYXJkJ1xuaW1wb3J0IHtTdWl0ZX0gZnJvbSAnLi9TdWl0ZSdcbmltcG9ydCB7RHJhZ0FuZERyb3B9IGZyb20gJy4vRHJhZ0FuZERyb3AnXG5cbmV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgICBwcml2YXRlIGNhcmREZWNrOiBDYXJkRGVjaztcbiAgICBwcml2YXRlIHN0b2NrOiBDYXJkUGlsZTtcbiAgICBwcml2YXRlIHdhc3RlOiBDYXJkUGlsZTtcbiAgICBwcml2YXRlIGZvdW5kYXRpb25zOiBBcnJheTxGb3VuZGF0aW9uQ2FyZFBpbGU+O1xuICAgIHByaXZhdGUgdGFibGVhdTogQXJyYXk8VGFibGVhdUNhcmRQaWxlPjtcbiAgICBwcml2YXRlIGRyYWdBbmREcm9wOkRyYWdBbmREcm9wO1xuICAgIHB1YmxpYyBzdGF0aWMgQ3VycmVudDpHYW1lO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuZHJhZ0FuZERyb3AgPSBuZXcgRHJhZ0FuZERyb3AoKTtcbiAgICAgICAgdGhpcy5jYXJkRGVjayA9IG5ldyBDYXJkRGVjayh0aGlzLmRyYWdBbmREcm9wKTtcbiAgICAgICAgdGhpcy5zdG9jayA9IG5ldyBDYXJkUGlsZShcInN0b2NrXCIsIG51bGwsIG51bGwpO1xuICAgICAgICB0aGlzLndhc3RlID0gbmV3IENhcmRQaWxlKFwid2FzdGVcIiwgbnVsbCwgbnVsbCk7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbnMgPSBuZXcgQXJyYXk8Rm91bmRhdGlvbkNhcmRQaWxlPigpO1xuICAgICAgICB0aGlzLmZvdW5kYXRpb25zLnB1c2gobmV3IEZvdW5kYXRpb25DYXJkUGlsZShTdWl0ZS5IZWFydHMsIFwiZm91bmRhdGlvbi1oZWFydHNcIikpO1xuICAgICAgICB0aGlzLmZvdW5kYXRpb25zLnB1c2gobmV3IEZvdW5kYXRpb25DYXJkUGlsZShTdWl0ZS5EaWFtb25kcyxcImZvdW5kYXRpb24tZGlhbW9uZHNcIikpO1xuICAgICAgICB0aGlzLmZvdW5kYXRpb25zLnB1c2gobmV3IEZvdW5kYXRpb25DYXJkUGlsZShTdWl0ZS5DbHVicyxcImZvdW5kYXRpb24tY2x1YnNcIikpO1xuICAgICAgICB0aGlzLmZvdW5kYXRpb25zLnB1c2gobmV3IEZvdW5kYXRpb25DYXJkUGlsZShTdWl0ZS5TcGFkZXMsIFwiZm91bmRhdGlvbi1zcGFkZXNcIikpO1xuICAgICAgICB0aGlzLnRhYmxlYXUgPSBuZXcgQXJyYXk8VGFibGVhdUNhcmRQaWxlPigpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaTw3OyBpKyspIHRoaXMudGFibGVhdS5wdXNoKG5ldyBUYWJsZWF1Q2FyZFBpbGUoYHRhYmxlYXUtJHtpKzF9YCkpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5kZWFsKCk7XG4gICAgICAgIEdhbWUuQ3VycmVudCA9IHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgZGVhbCgpe1xuICAgICAgICAvLyBkZWFsIGNhcmRzIGludG8gdGhlIHJpZ2h0IHBpbGVzXG4gICAgICAgIGxldCB0YWJsZWF1SWR4ID0gMDtcbiAgICAgICAgbGV0IHRhYmxlYXVDb3VudHMgPSBbMSwyLDMsNCw1LDYsN11cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8NTI7IGkrKyl7XG4gICAgICAgICAgICBpZiAodGFibGVhdUlkeCA8IDcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlYXVbdGFibGVhdUlkeF0ucHVzaCh0aGlzLmNhcmREZWNrLkNhcmRzW2ldKTtcbiAgICAgICAgICAgICAgICB0YWJsZWF1Q291bnRzW3RhYmxlYXVJZHhdLS07XG5cbiAgICAgICAgICAgICAgICBpZih0YWJsZWF1Q291bnRzW3RhYmxlYXVJZHhdPT0wKSB0YWJsZWF1SWR4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvY2sucHVzaCh0aGlzLmNhcmREZWNrLkNhcmRzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgdGhpcy5zdG9jay5zaG93VG9wQ2FyZCgpO1xuICAgICAgIGZvciAodmFyIGkgPSAwOyBpPDc7IGkrKykge1xuICAgICAgICAgICB0aGlzLnRhYmxlYXVbaV0uc2hvd1RvcENhcmQoKTtcbiAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmVDYXJkKGNhcmRNb3ZlKXtcblxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHJlbW92ZUNhcmRGcm9tUGlsZShjYXJkRWw6SFRNTEVsZW1lbnQsIHBpbGVFbDpIVE1MRWxlbWVudCk6Q2FyZFxuICAgIHtcbiAgICAgICAgdmFyIHNyY0NhcmQgPSBHYW1lLmNhcmRGcm9tRWwoY2FyZEVsKTtcbiAgICAgICAgdmFyIHBpbGUgPSB0aGlzLmNhcmRQaWxlRnJvbUVsKHBpbGVFbCk7XG4gICAgICAgIGlmIChwaWxlICYmIHNyY0NhcmQpe1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHBpbGUucG9wKCk7XG4gICAgICAgICAgICBwaWxlLnNob3dUb3BDYXJkKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ2FyZFRvUGlsZShjYXJkOkNhcmQsIHBpbGVFbDpIVE1MRWxlbWVudClcbiAgICB7XG4gICAgICAgIHZhciBjYXJkUGlsZSA9IHRoaXMuY2FyZFBpbGVGcm9tRWwocGlsZUVsKTtcbiAgICAgICAgaWYgKGNhcmRQaWxlKXsgY2FyZFBpbGUucHVzaChjYXJkKTsgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FuRHJvcE9uVGFibGVhdShjYXJkOkNhcmQsIHRhcmc6SFRNTEVsZW1lbnQpOkJvb2xlYW57XG4gICAgICAgIHZhciBjYXJkUGlsZSA9IHRoaXMudGFibGVhdUZyb21FbCh0YXJnKTtcbiAgICAgICAgaWYgKCFjYXJkUGlsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gY2FyZFBpbGUuY2FuQWNjZXB0Q2FyZChjYXJkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhcmRQaWxlRnJvbUVsKHBpbGVFbDpIVE1MRWxlbWVudCk6Q2FyZFBpbGV7XG4gICAgICAgIGxldCBwaWxlOkNhcmRQaWxlID0gdGhpcy5mb3VuZGF0aW9uRnJvbUVsKHBpbGVFbCk7XG4gICAgICAgIGlmIChwaWxlKSByZXR1cm4gcGlsZTtcblxuICAgICAgICBwaWxlID0gIHRoaXMudGFibGVhdUZyb21FbChwaWxlRWwpO1xuICAgICAgICBpZiAocGlsZSkgcmV0dXJuIHBpbGU7XG5cbiAgICAgICAgcGlsZSA9IHRoaXMuc3RvY2tGcm9tRWwocGlsZUVsKTtcbiAgICAgICAgaWYgKHBpbGUpIHJldHVybiBwaWxlO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMud2FzdGVGcm9tRWwocGlsZUVsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvdW5kYXRpb25Gcm9tRWwoZWw6SFRNTEVsZW1lbnQpOkZvdW5kYXRpb25DYXJkUGlsZVxuICAgIHtcbiAgICAgICAgdmFyIGVscyA9IGVsLmlkLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgbGV0IGlkOm51bWJlciA9IC0xO1xuICAgICAgICBzd2l0Y2goZWxzWzFdKXtcbiAgICAgICAgICAgIGNhc2UgXCJoZWFydHNcIjpcbiAgICAgICAgICAgICAgICBpZD0wO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRpYW1vbmRzXCI6XG4gICAgICAgICAgICAgICAgaWQ9MTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjbHVic1wiOlxuICAgICAgICAgICAgICAgIGlkPTI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3BhZGVzXCI6XG4gICAgICAgICAgICAgICAgaWQ9MztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkID09IC0xKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm91bmRhdGlvbnNbaWRdOyBcbiAgICB9XG5cbiAgICBwcml2YXRlIHRhYmxlYXVGcm9tRWwoZWw6SFRNTEVsZW1lbnQpOlRhYmxlYXVDYXJkUGlsZVxuICAgIHtcbiAgICAgICAgdmFyIGVscyA9IGVsLmlkLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgdmFyIGlkID0gcGFyc2VJbnQoZWxzWzFdKTtcbiAgICAgICAgaWQgLT0gMTtcbiAgICAgICAgaWYgKGlkIDwgMCB8fCBpZCA+IDYpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciBjYXJkUGlsZSA9IHRoaXMudGFibGVhdVtpZF07XG4gICAgICAgIHJldHVybiBjYXJkUGlsZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b2NrRnJvbUVsKGVsOkhUTUxFbGVtZW50KTpDYXJkUGlsZXtcbiAgICAgICAgaWYgKEdhbWUuaXNTdG9jayhlbCkpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvY2s7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAgcHJpdmF0ZSB3YXN0ZUZyb21FbChlbDpIVE1MRWxlbWVudCk6Q2FyZFBpbGV7XG4gICAgICAgIGlmIChHYW1lLmlzV2FzdGUoZWwpKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndhc3RlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYW5Ecm9wT25Gb3VuZGF0aW9uKGNhcmQ6Q2FyZCwgdGFyZzpIVE1MRWxlbWVudCk6Qm9vbGVhbntcbiAgICAgICAgdmFyIGNhcmRQaWxlID0gdGhpcy5mb3VuZGF0aW9uRnJvbUVsKHRhcmcpO1xuICAgICAgICBpZiAoIWNhcmRQaWxlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIGNhcmRQaWxlLmNhbkFjY2VwdENhcmQoY2FyZCk7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIGlzVGFibGVhdShlbDpIVE1MRWxlbWVudCk6Qm9vbGVhbntcbiAgICAgICAgcmV0dXJuIEdhbWUuaXNFbE9mVHlwZShlbCwgXCJ0YWJsZWF1XCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGlzRm91bmRhdGlvbihlbDpIVE1MRWxlbWVudCk6Qm9vbGVhbntcbiAgICAgICAgcmV0dXJuIEdhbWUuaXNFbE9mVHlwZShlbCwgXCJmb3VuZGF0aW9uXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGlzU3RvY2soZWw6SFRNTEVsZW1lbnQpOkJvb2xlYW57XG4gICAgICAgIHJldHVybiBHYW1lLmlzRWxPZlR5cGUoZWwsIFwic3RvY2tcIik7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc3RhdGljIGlzV2FzdGUoZWw6SFRNTEVsZW1lbnQpOkJvb2xlYW57XG4gICAgICAgIHJldHVybiBHYW1lLmlzRWxPZlR5cGUoZWwsIFwid2FzdGVcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNFbE9mVHlwZShlbDpIVE1MRWxlbWVudCwgdHlwZTpzdHJpbmcpOkJvb2xlYW57XG4gICAgICAgICAgICBpZiAoZWwuaWQpe1xuICAgICAgICAgICAgdmFyIGVscyA9IGVsLmlkLnNwbGl0KFwiLVwiKVxuICAgICAgICAgICAgcmV0dXJuIGVsc1swXT09PXR5cGU7IFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjYXJkRnJvbUVsKGVsOkhUTUxFbGVtZW50KTpDYXJke1xuICAgICAgICB2YXIgZWxzID0gZWwuaWQuc3BsaXQoXCItXCIpO1xuICAgICAgICBpZiAoZWxzWzBdPT09J2NhcmQnKXtcbiAgICAgICAgICAgIHJldHVybiBlbFsnY2FyZCddO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJpbnRBY2NlcHRzRGlhZ25vc3RpYyhyZXN1bHQ6Qm9vbGVhbiwgY2FyZDpDYXJkLCB0YXJnZXQ6SFRNTEVsZW1lbnQsIHNvdXJjZTpIVE1MRWxlbWVudCl7XG4gICAgICAgIHZhciB0YXJnZXRQaWxlID0gdGhpcy5jYXJkUGlsZUZyb21FbCh0YXJnZXQpO1xuICAgICAgICB2YXIgdGFyZ2V0VG9wID0gdGFyZ2V0UGlsZSA/IHRhcmdldFBpbGUuZ2V0VG9wQ2FyZCgpIDogbnVsbDtcbiAgICAgICAgdmFyIHRvcFN0cmluZyA9IHRhcmdldFRvcCA/IGAke3RhcmdldFRvcC5TdWl0ZX06JHt0YXJnZXRUb3AuVmFsdWV9YDpcIm51bGxcIjtcbiAgICAgICAgY29uc29sZS5sb2cgKGAke3Jlc3VsdD8nY2FuJzonY2Fubm90J30gZHJvcCAke2NhcmQuU3VpdGV9OiR7Y2FyZC5WYWx1ZX0gb24gJHt0YXJnZXQuaWR9ICR7dG9wU3RyaW5nfSBmcm9tICR7c291cmNlLmlkfWApO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9HYW1lLnRzIiwiaW1wb3J0IHtTdWl0ZX0gZnJvbSBcIi4vU3VpdGVcIlxuaW1wb3J0IHtEcmFnQW5kRHJvcH0gZnJvbSBcIi4vRHJhZ0FuZERyb3BcIlxuXG4vLyBhc3NvY2lhdGVzIGEgY2FyZCBzdWl0ZSBhbmQgdmFsdWUgd2l0aCBhIFVJIGVsZW1lbnRcbi8vIHRoYXQgcmVwcmVzZW50cyB0aGUgY2FyZFxuZXhwb3J0IGNsYXNzIENhcmR7XG4gICAgcHVibGljIHVpRWxlbWVudDpIVE1MRWxlbWVudDtcbiAgICBcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBTdWl0ZTpTdWl0ZSwgXG4gICAgICAgIHB1YmxpYyBWYWx1ZTpudW1iZXIsXG4gICAgICAgIHB1YmxpYyBJbWFnZUZpbGU6c3RyaW5nLFxuICAgICAgICBwdWJsaWMgRHJhZ0FuZERyb3A6RHJhZ0FuZERyb3AsXG4gICAgICAgIHB1YmxpYyBTaG93RmFjZTpib29sZWFuPWZhbHNlLFxuICAgICAgICBwdWJsaWMgU2hvd2luZ0ZhY2U6Ym9vbGVhbj1mYWxzZSl7XG4gICAgICAgICAgICB0aGlzLnVpRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICB0aGlzLnVpRWxlbWVudC5pZCA9IGBjYXJkLSR7dGhpcy5TdWl0ZX0tJHt0aGlzLlZhbHVlfWA7XG4gICAgICAgICAgICB0aGlzLnVpRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NhcmQnKTtcbiAgICAgICAgICAgIHRoaXMudWlFbGVtZW50WydjYXJkJ10gPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy51aUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgXG4gICAgICAgICAgICAgICAgKGU6RHJhZ0V2ZW50KT0+dGhpcy5oYW5kbGVEcmFnU3RhcnQoZSkpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5TaG93RmFjZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RmFjZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dCYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVEcmFnU3RhcnQoZTpEcmFnRXZlbnQpe1xuICAgICAgICBpZiAodGhpcy5TaG93aW5nRmFjZT09ZmFsc2UpIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIHBhcmVudElkID0gdGhpcy5nZXRQYXJlbnRQaWxlSWQodGhpcy51aUVsZW1lbnQpO1xuICAgICAgICBcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgY2FyZFN1aXRlOiB0aGlzLlN1aXRlLFxuICAgICAgICAgICAgY2FyZFZhbHVlOiB0aGlzLlZhbHVlLFxuICAgICAgICAgICAgc291cmNlUGlsZTogcGFyZW50SWRcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBwdWJsaWMgc2hvd0ZhY2UoKXtcbiAgICAgICAgdGhpcy5TaG93aW5nRmFjZSA9IHRydWU7XG4gICAgICAgIHRoaXMudWlFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgYC4vU1ZHLWNhcmRzLTEuMy8ke3RoaXMuSW1hZ2VGaWxlfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93QmFjaygpe1xuICAgICAgICB0aGlzLlNob3dpbmdGYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudWlFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vU1ZHLWNhcmRzLTEuMy9jYXJkLWJhY2stYXNzZXRzL2NhcmQtYmFjay5wbmcnKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHNldEZhbk9mZnNldChvZmZzZXRJblB4Om51bWJlcil7XG4gICAgICAgIHRoaXMudWlFbGVtZW50LnN0eWxlWyd0b3AnXSA9IGAke29mZnNldEluUHh9cHhgO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNSZWQoc3VpdGU6U3VpdGUpOmJvb2xlYW57XG4gICAgICAgIHJldHVybiBzdWl0ZSE9U3VpdGUuQ2x1YnMgJiYgc3VpdGUgIT0gU3VpdGUuU3BhZGVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNCbGFjayhzdWl0ZTpTdWl0ZSk6Ym9vbGVhbntcbiAgICAgICAgcmV0dXJuIHN1aXRlICE9IFN1aXRlLkRpYW1vbmRzICYmIHN1aXRlICE9IFN1aXRlLkhlYXJ0cztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBhcmVudFBpbGVJZCh1aUVsZW1lbnQ6SFRNTEVsZW1lbnQpOnN0cmluZ3tcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudWlFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHdoaWxlKHBhcmVudCl7XG4gICAgICAgICAgICBpZiAocGFyZW50LmlkID09PSAnc3RvY2snIHx8XG4gICAgICAgICAgICAgICAgcGFyZW50LmlkID09PSAnd2FzdGUnIHx8XG4gICAgICAgICAgICAgICAgcGFyZW50LmlkLmluZGV4T2YoJ2ZvdW5kYXRpb24nKSA+PSAwIHx8XG4gICAgICAgICAgICAgICAgcGFyZW50LmlkLmluZGV4T2YoJ3RhYmxlYXUnKSA+PSAwKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyZW50KSByZXR1cm4gcGFyZW50LmlkO1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NhcmQudHMiLCJleHBvcnQgZW51bSBTdWl0ZXtcbiAgICBDbHVicz0wLFxuICAgIERpYW1vbmRzLFxuICAgIEhlYXJ0cyxcbiAgICBTcGFkZXNcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9TdWl0ZS50cyIsImltcG9ydCB7R2FtZX0gZnJvbSBcIi4vR2FtZVwiXG5cbndpbmRvd1tcImdhbWVcIl0gPSBuZXcgR2FtZSgpO1xuLy9wcm9jZXNzLmV4aXQoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9NYWluLnRzIiwiaW1wb3J0IHtDYXJkfSBmcm9tIFwiLi9DYXJkXCJcbmltcG9ydCB7U3VpdGV9IGZyb20gXCIuL1N1aXRlXCJcbmltcG9ydCB7RHJhZ0FuZERyb3B9IGZyb20gXCIuL0RyYWdBbmREcm9wXCJcblxuZXhwb3J0IGNsYXNzIENhcmREZWNre1xuICAgIHB1YmxpYyBDYXJkczogQXJyYXk8Q2FyZD5cbiAgICBjb25zdHJ1Y3RvcihkcmFnQW5kRHJvcDpEcmFnQW5kRHJvcCl7XG4gICAgICAgIHRoaXMuQ2FyZHMgPSBuZXcgQXJyYXk8Q2FyZD4oNTIpO1xuICAgICAgICB2YXIgdmFsdWU9MTtcbiAgICAgICAgdmFyIHN1aXRlID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8NTI7IGkrKyl7XG4gICAgICAgICAgICB2YXIgZmlsZSA9IHRoaXMuY2FyZEZpbGVzW3N1aXRlXVt2YWx1ZS0xXTtcbiAgICAgICAgICAgIHRoaXMuQ2FyZHNbaV0gPSBuZXcgQ2FyZChzdWl0ZSwgdmFsdWUrKywgZmlsZSwgZHJhZ0FuZERyb3ApO1xuICAgICAgICAgICAgaWYgKHZhbHVlPT0xNCl7XG4gICAgICAgICAgICAgICAgc3VpdGUrKztcbiAgICAgICAgICAgICAgICB2YWx1ZT0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2k8NTI7aSsrKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuQ2FyZHNbaV0uU3VpdGV9ICR7dGhpcy5DYXJkc1tpXS5WYWx1ZX1gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNodWZmbGUoKTtcblxuICAgICAgICB0aGlzLnZlcmlmeSgpO1xuICAgIH1cblxuLy8gRmlzaGVyLVlhdGVzIGFsZ29yaXRobVxuICAgIHByaXZhdGUgc2h1ZmZsZSgpe1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaTx0aGlzLkNhcmRzLmxlbmd0aC0xOyBpKyspe1xuICAgICAgICAgICAgdmFyIHJhbmQgPSB0aGlzLmdldFJhbmRvbUludChpLHRoaXMuQ2FyZHMubGVuZ3RoKTtcbiAgICAgICAgICAgIGxldCB0ZW1wOkNhcmQgPSB0aGlzLkNhcmRzW2ldO1xuICAgICAgICAgICAgdGhpcy5DYXJkc1tpXSA9IHRoaXMuQ2FyZHNbcmFuZF07XG4gICAgICAgICAgICB0aGlzLkNhcmRzW3JhbmRdID0gdGVtcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdmVyaWZ5KCl7XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2k8NTI7aSsrKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuQ2FyZHNbaV0uU3VpdGV9ICR7dGhpcy5DYXJkc1tpXS5WYWx1ZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB2YWx1ZXMgPSB7XG4gICAgICAgICAgICB6ZXJvOltdLFxuICAgICAgICAgICAgb25lOltdLFxuICAgICAgICAgICAgdHdvOltdLFxuICAgICAgICAgICAgdGhyZWU6W11cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaTw1MjsgaSsrKXtcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLkNhcmRzW2ldLlN1aXRlKXtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy56ZXJvLnB1c2godGhpcy5DYXJkc1tpXS5WYWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMub25lLnB1c2godGhpcy5DYXJkc1tpXS5WYWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMudHdvLnB1c2godGhpcy5DYXJkc1tpXS5WYWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMudGhyZWUucHVzaCh0aGlzLkNhcmRzW2ldLlZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgY2x1YnNbJHt2YWx1ZXMuemVyby5sZW5ndGh9XSAke3ZhbHVlcy56ZXJvfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgZGlhbW9uZHNbJHt2YWx1ZXMub25lLmxlbmd0aH1dICR7dmFsdWVzLm9uZX1gKTtcbiAgICAgICAgY29uc29sZS5sb2coYGhlYXJ0c1ske3ZhbHVlcy50d28ubGVuZ3RofV0gJHt2YWx1ZXMudHdvfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgc3BhZGVzWyR7dmFsdWVzLnRocmVlLmxlbmd0aH1dICR7dmFsdWVzLnRocmVlfWApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmFuZG9tSW50KG1pbjpudW1iZXIsIG1heDpudW1iZXIpIHtcbiAgICAgICAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gICAgICAgIG1heCA9IE1hdGguZmxvb3IobWF4KTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjsgLy9UaGUgbWF4aW11bSBpcyBleGNsdXNpdmUgYW5kIHRoZSBtaW5pbXVtIGlzIGluY2x1c2l2ZVxuICAgIH1cbiAgICBwcml2YXRlIGNhcmRGaWxlcyA9IFtbXG4gICAgICAgIFwiYWNlX29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcIjJfb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwiM19vZl9jbHVicy5zdmdcIixcbiAgICAgICAgXCI0X29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcIjVfb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwiNl9vZl9jbHVicy5zdmdcIixcbiAgICAgICAgXCI3X29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcIjhfb2ZfY2x1YnMuc3ZnXCIsXG4gICAgICAgIFwiOV9vZl9jbHVicy5zdmdcIixcbiAgICAgICAgXCIxMF9vZl9jbHVicy5zdmdcIixcbiAgICAgICAgXCJqYWNrX29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcInF1ZWVuX29mX2NsdWJzLnN2Z1wiLFxuICAgICAgICBcImtpbmdfb2ZfY2x1YnMuc3ZnXCJdLFxuXG4gICAgICAgIFtcImFjZV9vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCIyX29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcIjNfb2ZfZGlhbW9uZHMuc3ZnXCIsXG4gICAgICAgIFwiNF9vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCI1X29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcIjZfb2ZfZGlhbW9uZHMuc3ZnXCIsXG4gICAgICAgIFwiN19vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCI4X29mX2RpYW1vbmRzLnN2Z1wiLFxuICAgICAgICBcIjlfb2ZfZGlhbW9uZHMuc3ZnXCIsXG4gICAgICAgIFwiMTBfb2ZfZGlhbW9uZHMuc3ZnXCIsXG4gICAgICAgIFwiamFja19vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCJxdWVlbl9vZl9kaWFtb25kcy5zdmdcIixcbiAgICAgICAgXCJraW5nX29mX2RpYW1vbmRzLnN2Z1wiXSxcblxuICAgICAgICBbXCJhY2Vfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcIjJfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcIjNfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcIjRfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcIjVfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcIjZfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcIjdfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcIjhfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcIjlfb2ZfaGVhcnRzLnN2Z1wiLFxuICAgICAgICBcIjEwX29mX2hlYXJ0cy5zdmdcIixcbiAgICAgICAgXCJqYWNrX29mX2hlYXJ0cy5zdmdcIixcbiAgICAgICAgXCJxdWVlbl9vZl9oZWFydHMuc3ZnXCIsXG4gICAgICAgIFwia2luZ19vZl9oZWFydHMuc3ZnXCJdLFxuXG4gICAgICAgIFtcImFjZV9vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwiMl9vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwiM19vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwiNF9vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwiNV9vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwiNl9vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwiN19vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwiOF9vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwiOV9vZl9zcGFkZXMuc3ZnXCIsXG4gICAgICAgIFwiMTBfb2Zfc3BhZGVzLnN2Z1wiLFxuICAgICAgICBcImphY2tfb2Zfc3BhZGVzLnN2Z1wiLFxuICAgICAgICBcInF1ZWVuX29mX3NwYWRlcy5zdmdcIixcbiAgICAgICAgXCJraW5nX29mX3NwYWRlcy5zdmdcIl1dO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NhcmREZWNrLnRzIiwiaW1wb3J0IHtDYXJkUGlsZX0gZnJvbSBcIi4vQ2FyZFBpbGVcIlxuaW1wb3J0IHtTdWl0ZX0gZnJvbSBcIi4vU3VpdGVcIlxuaW1wb3J0IHtDYXJkfSBmcm9tIFwiLi9DYXJkXCJcblxuZXhwb3J0IGNsYXNzIEZvdW5kYXRpb25DYXJkUGlsZSBleHRlbmRzIENhcmRQaWxlXG57XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCBwdWJsaWMgc3VpdGU6U3VpdGUsIGRvbUlkOnN0cmluZyApeyBcbiAgICAgICAgc3VwZXIoZG9tSWQsIFxuICAgICAgICAoZTpEcmFnRXZlbnQpPT57IFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3VuZGF0aW9uIGRyYWdvdmVyXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgICAgICB9LCBcbiAgICAgICAgKGU6RHJhZ0V2ZW50KT0+e1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTsgXG4gICAgfVxuXG4gICAgcHVibGljIHB1c2goY2FyZDpDYXJkKXtcbiAgICAgICAgY2FyZC5zZXRGYW5PZmZzZXQoMCk7XG4gICAgICAgIHN1cGVyLnB1c2goY2FyZCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBjYW5BY2NlcHRDYXJkKGNhcmQ6Q2FyZCk6Ym9vbGVhbiB7XG4gICAgICAgIGlmIChjYXJkLlN1aXRlICE9IHRoaXMuc3VpdGUpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvLyBubyBjYXJkcyBvbiB0aGUgcGlsZSBhbmQgdGhlIG5ldyBjYXJkIGlzIGFuIEFjZVxuICAgICAgICBpZiAodGhpcy5jYXJkcy5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICByZXR1cm4gY2FyZC5WYWx1ZSA9PSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ3JlYXRlciB0aGFuIDAgY2FyZHMgb24gdGhlIHBpbGUgYW5kIHRoZSBuZXcgY2FyZCdzXG4gICAgICAgIC8vIHZhbHVlIGlzIG9uZSBncmVhdGVyIHRoYW4gdGhlIGxhc3QgY2FyZFxuICAgICAgICByZXR1cm4gdGhpcy5jYXJkcy5sZW5ndGggPiAwICYmIHRoaXMuY2FyZHNbdGhpcy5jYXJkcy5sZW5ndGgtMV0uVmFsdWUgPT0gY2FyZC5WYWx1ZS0xXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0ZvdW5kYXRpb25DYXJkUGlsZS50cyIsImltcG9ydCB7Q2FyZFBpbGV9IGZyb20gXCIuL0NhcmRQaWxlXCJcbmltcG9ydCB7U3VpdGV9IGZyb20gXCIuL1N1aXRlXCJcbmltcG9ydCB7Q2FyZH0gZnJvbSBcIi4vQ2FyZFwiXG5pbXBvcnQge0dhbWV9IGZyb20gXCIuL0dhbWVcIlxuXG5leHBvcnQgY2xhc3MgVGFibGVhdUNhcmRQaWxlIGV4dGVuZHMgQ2FyZFBpbGUge1xuICAgIFxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciggXG4gICAgICAgIGRvbUlkOnN0cmluZyxcbiAgICAgICAgcHJpdmF0ZSBmYW5PZmZzZXQ6bnVtYmVyID0gMzAgKXsgXG5cbiAgICAgICAgc3VwZXIoZG9tSWQsIFxuICAgICAgICAoZTpEcmFnRXZlbnQpPT57IFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0YWJsZWF1IGRyYWcgb3ZlclwiKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgXG4gICAgICAgIH0sXG4gICAgICAgIChlOkRyYWdFdmVudCk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFibGVhdSBkcm9wXCIpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDYXJkRHJvcChlKTtcbiAgICAgICAgfSk7IFxuICAgICAgICB0aGlzLmZhbkNhcmRzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHB1c2goY2FyZDpDYXJkKXtcbiAgICAgICAgc3VwZXIucHVzaChjYXJkKTtcbiAgICAgICAgdGhpcy5mYW5DYXJkcygpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGhhbmRsZUNhcmREcm9wKGU6RHJhZ0V2ZW50KXtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8ZS5kYXRhVHJhbnNmZXIudHlwZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYgKGUuZGF0YVRyYW5zZmVyLnR5cGVzW2ldPT09XCJ0ZXh0L3BsYWluXCIpe1xuICAgICAgICAgICAgICAgIHZhciBkYXRhU3RyID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvcGxhaW5cIik7XG4gICAgICAgICAgICAgICAgdmFyIGRyb3BEYXRhID0gSlNPTi5wYXJzZShkYXRhU3RyKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW5BY2NlcHRDYXJkKGRyb3BEYXRhKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FyZCBhY2NlcHRlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5DdXJyZW50Lm1vdmVDYXJkKFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRTdWl0ZTogZHJvcERhdGEuY2FyZFN1aXRlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkVmFsdWU6IGRyb3BEYXRhLmNhcmRWYWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlUGlsZUlkOiBkcm9wRGF0YS5zb3VyY2VQaWxlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0UGlsZUlkOiB0aGlzLmRvbUlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBjb25zb2xlLmxvZyhcImNhcmQgcmVqZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2FuQWNjZXB0Q2FyZChkcm9wRGF0YSk6Ym9vbGVhbiB7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBjYXJkcyBvbiB0aGUgcGlsZSB0aGVuIGEgS2luZyBjYW4gYmUgZHJvcHBlZFxuICAgICAgICBpZiAodGhpcy5jYXJkcy5sZW5ndGggPT0gMCkgcmV0dXJuIGRyb3BEYXRhLnZhbHVlID09IDEzOyBcblxuICAgICAgICB2YXIgbGFzdENhcmQgPSB0aGlzLmNhcmRzW3RoaXMuY2FyZHMubGVuZ3RoLTFdO1xuXG4gICAgICAgIC8vIHJldHVybiBvcHBvc2l0ZSBjb2xvcnMgYW5kIG5ldyBjYXJkcyB2YWx1ZSBpcyBvbmUgbW9yZVxuICAgICAgICAvLyB0aGFuIGxhc3QgY2FyZCdzIHZhbHVlXG4gICAgICAgIHJldHVybiAoQ2FyZC5pc1JlZChsYXN0Q2FyZC5TdWl0ZSkgJiYgXG4gICAgICAgICAgICAgICAgQ2FyZC5pc0JsYWNrKGRyb3BEYXRhLmNhcmRTdWl0ZSkgJiYgXG4gICAgICAgICAgICAgICAgZHJvcERhdGEuY2FyZFZhbHVlID09IGxhc3RDYXJkLlZhbHVlIC0gMSkgXG4gICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIChDYXJkLmlzQmxhY2sobGFzdENhcmQuU3VpdGUpICYmIFxuICAgICAgICAgICAgICAgICBDYXJkLmlzUmVkKGRyb3BEYXRhLmNhcmRTdWl0ZSkgJiZcbiAgICAgICAgICAgICAgICAgZHJvcERhdGEuY2FyZFZhbHVlID09IGxhc3RDYXJkLlZhbHVlIC0gMSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZhbkNhcmRzKCl7XG4gICAgICAgIGxldCBvZmZzZXQ6bnVtYmVyID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8dGhpcy5jYXJkcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZiAodGhpcy5jYXJkc1tpXS5TaG93aW5nRmFjZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJkc1tpXS5zZXRGYW5PZmZzZXQob2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gdGhpcy5mYW5PZmZzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vVGFibGVhdUNhcmRQaWxlLnRzIiwiZXhwb3J0IGNsYXNzIERyYWdBbmREcm9we1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoKXtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlRHJhZ1N0YXJ0KGU6RHJhZ0V2ZW50KTphbnl7XG4gICAgICAgIGNvbnNvbGUubG9nKGBkcmFnc3RhcnRgKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vRHJhZ0FuZERyb3AudHMiXSwic291cmNlUm9vdCI6IiJ9