(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
var arrays = require("./arrays");
var LinkedList = /** @class */ (function () {
    /**
    * Creates an empty Linked List.
    * @class A linked list is a data structure consisting of a group of nodes
    * which together represent a sequence.
    * @constructor
    */
    function LinkedList() {
        /**
        * First node in the list
        * @type {Object}
        * @private
        */
        this.firstNode = null;
        /**
        * Last node in the list
        * @type {Object}
        * @private
        */
        this.lastNode = null;
        /**
        * Number of elements in the list
        * @type {number}
        * @private
        */
        this.nElements = 0;
    }
    /**
    * Adds an element to this list.
    * @param {Object} item element to be added.
    * @param {number=} index optional index to add the element. If no index is specified
    * the element is added to the end of this list.
    * @return {boolean} true if the element was added or false if the index is invalid
    * or if the element is undefined.
    */
    LinkedList.prototype.add = function (item, index) {
        if (util.isUndefined(index)) {
            index = this.nElements;
        }
        if (index < 0 || index > this.nElements || util.isUndefined(item)) {
            return false;
        }
        var newNode = this.createNode(item);
        if (this.nElements === 0 || this.lastNode === null) {
            // First node in the list.
            this.firstNode = newNode;
            this.lastNode = newNode;
        }
        else if (index === this.nElements) {
            // Insert at the end.
            this.lastNode.next = newNode;
            this.lastNode = newNode;
        }
        else if (index === 0) {
            // Change first node.
            newNode.next = this.firstNode;
            this.firstNode = newNode;
        }
        else {
            var prev = this.nodeAtIndex(index - 1);
            if (prev == null) {
                return false;
            }
            newNode.next = prev.next;
            prev.next = newNode;
        }
        this.nElements++;
        return true;
    };
    /**
    * Returns the first element in this list.
    * @return {*} the first element of the list or undefined if the list is
    * empty.
    */
    LinkedList.prototype.first = function () {
        if (this.firstNode !== null) {
            return this.firstNode.element;
        }
        return undefined;
    };
    /**
    * Returns the last element in this list.
    * @return {*} the last element in the list or undefined if the list is
    * empty.
    */
    LinkedList.prototype.last = function () {
        if (this.lastNode !== null) {
            return this.lastNode.element;
        }
        return undefined;
    };
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index desired index.
     * @return {*} the element at the given index or undefined if the index is
     * out of bounds.
     */
    LinkedList.prototype.elementAtIndex = function (index) {
        var node = this.nodeAtIndex(index);
        if (node === null) {
            return undefined;
        }
        return node.element;
    };
    /**
     * Returns the index in this list of the first occurrence of the
     * specified element, or -1 if the List does not contain this element.
     * <p>If the elements inside this list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function used to check if two elements are equal.
     * @return {number} the index in this list of the first occurrence
     * of the specified element, or -1 if this list does not contain the
     * element.
     */
    LinkedList.prototype.indexOf = function (item, equalsFunction) {
        var equalsF = equalsFunction || util.defaultEquals;
        if (util.isUndefined(item)) {
            return -1;
        }
        var currentNode = this.firstNode;
        var index = 0;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                return index;
            }
            index++;
            currentNode = currentNode.next;
        }
        return -1;
    };
    /**
       * Returns true if this list contains the specified element.
       * <p>If the elements inside the list are
       * not comparable with the === operator a custom equals function should be
       * provided to perform searches, the function must receive two arguments and
       * return true if they are equal, false otherwise. Example:</p>
       *
       * <pre>
       * const petsAreEqualByName = function(pet1, pet2) {
       *  return pet1.name === pet2.name;
       * }
       * </pre>
       * @param {Object} item element to search for.
       * @param {function(Object,Object):boolean=} equalsFunction Optional
       * function used to check if two elements are equal.
       * @return {boolean} true if this list contains the specified element, false
       * otherwise.
       */
    LinkedList.prototype.contains = function (item, equalsFunction) {
        return (this.indexOf(item, equalsFunction) >= 0);
    };
    /**
     * Removes the first occurrence of the specified element in this list.
     * <p>If the elements inside the list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to be removed from this list, if present.
     * @return {boolean} true if the list contained the specified element.
     */
    LinkedList.prototype.remove = function (item, equalsFunction) {
        var equalsF = equalsFunction || util.defaultEquals;
        if (this.nElements < 1 || util.isUndefined(item)) {
            return false;
        }
        var previous = null;
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                if (previous == null) {
                    this.firstNode = currentNode.next;
                    if (currentNode === this.lastNode) {
                        this.lastNode = null;
                    }
                }
                else if (currentNode === this.lastNode) {
                    this.lastNode = previous;
                    previous.next = currentNode.next;
                    currentNode.next = null;
                }
                else {
                    previous.next = currentNode.next;
                    currentNode.next = null;
                }
                this.nElements--;
                return true;
            }
            previous = currentNode;
            currentNode = currentNode.next;
        }
        return false;
    };
    /**
     * Removes all of the elements from this list.
     */
    LinkedList.prototype.clear = function () {
        this.firstNode = null;
        this.lastNode = null;
        this.nElements = 0;
    };
    /**
     * Returns true if this list is equal to the given list.
     * Two lists are equal if they have the same elements in the same order.
     * @param {LinkedList} other the other list.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function used to check if two elements are equal. If the elements in the lists
     * are custom objects you should provide a function, otherwise
     * the === operator is used to check equality between elements.
     * @return {boolean} true if this list is equal to the given list.
     */
    LinkedList.prototype.equals = function (other, equalsFunction) {
        var eqF = equalsFunction || util.defaultEquals;
        if (!(other instanceof LinkedList)) {
            return false;
        }
        if (this.size() !== other.size()) {
            return false;
        }
        return this.equalsAux(this.firstNode, other.firstNode, eqF);
    };
    /**
    * @private
    */
    LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
        while (n1 !== null && n2 !== null) {
            if (!eqF(n1.element, n2.element)) {
                return false;
            }
            n1 = n1.next;
            n2 = n2.next;
        }
        return true;
    };
    /**
     * Removes the element at the specified position in this list.
     * @param {number} index given index.
     * @return {*} removed element or undefined if the index is out of bounds.
     */
    LinkedList.prototype.removeElementAtIndex = function (index) {
        if (index < 0 || index >= this.nElements || this.firstNode === null || this.lastNode === null) {
            return undefined;
        }
        var element;
        if (this.nElements === 1) {
            //First node in the list.
            element = this.firstNode.element;
            this.firstNode = null;
            this.lastNode = null;
        }
        else {
            var previous = this.nodeAtIndex(index - 1);
            if (previous === null) {
                element = this.firstNode.element;
                this.firstNode = this.firstNode.next;
            }
            else if (previous.next === this.lastNode) {
                element = this.lastNode.element;
                this.lastNode = previous;
            }
            if (previous !== null && previous.next !== null) {
                element = previous.next.element;
                previous.next = previous.next.next;
            }
        }
        this.nElements--;
        return element;
    };
    /**
     * Executes the provided function once for each element present in this list in order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    LinkedList.prototype.forEach = function (callback) {
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            if (callback(currentNode.element) === false) {
                break;
            }
            currentNode = currentNode.next;
        }
    };
    /**
     * Reverses the order of the elements in this linked list (makes the last
     * element first, and the first element last).
     */
    LinkedList.prototype.reverse = function () {
        var previous = null;
        var current = this.firstNode;
        var temp = null;
        while (current !== null) {
            temp = current.next;
            current.next = previous;
            previous = current;
            current = temp;
        }
        temp = this.firstNode;
        this.firstNode = this.lastNode;
        this.lastNode = temp;
    };
    /**
     * Returns an array containing all of the elements in this list in proper
     * sequence.
     * @return {Array.<*>} an array containing all of the elements in this list,
     * in proper sequence.
     */
    LinkedList.prototype.toArray = function () {
        var array = [];
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            array.push(currentNode.element);
            currentNode = currentNode.next;
        }
        return array;
    };
    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list.
     */
    LinkedList.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements.
     */
    LinkedList.prototype.isEmpty = function () {
        return this.nElements <= 0;
    };
    LinkedList.prototype.toString = function () {
        return arrays.toString(this.toArray());
    };
    /**
     * @private
     */
    LinkedList.prototype.nodeAtIndex = function (index) {
        if (index < 0 || index >= this.nElements) {
            return null;
        }
        if (index === (this.nElements - 1)) {
            return this.lastNode;
        }
        var node = this.firstNode;
        for (var i = 0; i < index && node != null; i++) {
            node = node.next;
        }
        return node;
    };
    /**
     * @private
     */
    LinkedList.prototype.createNode = function (item) {
        return {
            element: item,
            next: null
        };
    };
    return LinkedList;
}()); // End of linked list
exports.default = LinkedList;

},{"./arrays":3,"./util":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkedList_1 = require("./LinkedList");
var Queue = /** @class */ (function () {
    /**
     * Creates an empty queue.
     * @class A queue is a First-In-First-Out (FIFO) data structure, the first
     * element added to the queue will be the first one to be removed. This
     * implementation uses a linked list as a container.
     * @constructor
     */
    function Queue() {
        this.list = new LinkedList_1.default();
    }
    /**
     * Inserts the specified element into the end of this queue.
     * @param {Object} elem the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    Queue.prototype.enqueue = function (elem) {
        return this.list.add(elem);
    };
    /**
     * Inserts the specified element into the end of this queue.
     * @param {Object} elem the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    Queue.prototype.add = function (elem) {
        return this.list.add(elem);
    };
    /**
     * Retrieves and removes the head of this queue.
     * @return {*} the head of this queue, or undefined if this queue is empty.
     */
    Queue.prototype.dequeue = function () {
        if (this.list.size() !== 0) {
            var el = this.list.first();
            this.list.removeElementAtIndex(0);
            return el;
        }
        return undefined;
    };
    /**
     * Retrieves, but does not remove, the head of this queue.
     * @return {*} the head of this queue, or undefined if this queue is empty.
     */
    Queue.prototype.peek = function () {
        if (this.list.size() !== 0) {
            return this.list.first();
        }
        return undefined;
    };
    /**
     * Returns the number of elements in this queue.
     * @return {number} the number of elements in this queue.
     */
    Queue.prototype.size = function () {
        return this.list.size();
    };
    /**
     * Returns true if this queue contains the specified element.
     * <p>If the elements inside this stack are
     * not comparable with the === operator, a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName (pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} elem element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function to check if two elements are equal.
     * @return {boolean} true if this queue contains the specified element,
     * false otherwise.
     */
    Queue.prototype.contains = function (elem, equalsFunction) {
        return this.list.contains(elem, equalsFunction);
    };
    /**
     * Checks if this queue is empty.
     * @return {boolean} true if and only if this queue contains no items; false
     * otherwise.
     */
    Queue.prototype.isEmpty = function () {
        return this.list.size() <= 0;
    };
    /**
     * Removes all of the elements from this queue.
     */
    Queue.prototype.clear = function () {
        this.list.clear();
    };
    /**
     * Executes the provided function once for each element present in this queue in
     * FIFO order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    Queue.prototype.forEach = function (callback) {
        this.list.forEach(callback);
    };
    return Queue;
}()); // End of queue
exports.default = Queue;

},{"./LinkedList":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
/**
 * Returns the position of the first occurrence of the specified item
 * within the specified array.4
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the position of the first occurrence of the specified element
 * within the specified array, or -1 if not found.
 */
function indexOf(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.indexOf = indexOf;
/**
 * Returns the position of the last occurrence of the specified element
 * within the specified array.
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the position of the last occurrence of the specified element
 * within the specified array or -1 if not found.
 */
function lastIndexOf(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    for (var i = length - 1; i >= 0; i--) {
        if (equals(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.lastIndexOf = lastIndexOf;
/**
 * Returns true if the specified array contains the specified element.
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function to
 * check equality between 2 elements.
 * @return {boolean} true if the specified array contains the specified element.
 */
function contains(array, item, equalsFunction) {
    return indexOf(array, item, equalsFunction) >= 0;
}
exports.contains = contains;
/**
 * Removes the first ocurrence of the specified element from the specified array.
 * @param {*} array the array in which to search element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function to
 * check equality between 2 elements.
 * @return {boolean} true if the array changed after this call.
 */
function remove(array, item, equalsFunction) {
    var index = indexOf(array, item, equalsFunction);
    if (index < 0) {
        return false;
    }
    array.splice(index, 1);
    return true;
}
exports.remove = remove;
/**
 * Returns the number of elements in the specified array equal
 * to the specified object.
 * @param {Array} array the array in which to determine the frequency of the element.
 * @param {Object} item the element whose frequency is to be determined.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the number of elements in the specified array
 * equal to the specified object.
 */
function frequency(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    var freq = 0;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], item)) {
            freq++;
        }
    }
    return freq;
}
exports.frequency = frequency;
/**
 * Returns true if the two specified arrays are equal to one another.
 * Two arrays are considered equal if both arrays contain the same number
 * of elements, and all corresponding pairs of elements in the two
 * arrays are equal and are in the same order.
 * @param {Array} array1 one array to be tested for equality.
 * @param {Array} array2 the other array to be tested for equality.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between elemements in the arrays.
 * @return {boolean} true if the two arrays are equal
 */
function equals(array1, array2, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    if (array1.length !== array2.length) {
        return false;
    }
    var length = array1.length;
    for (var i = 0; i < length; i++) {
        if (!equals(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
}
exports.equals = equals;
/**
 * Returns shallow a copy of the specified array.
 * @param {*} array the array to copy.
 * @return {Array} a copy of the specified array
 */
function copy(array) {
    return array.concat();
}
exports.copy = copy;
/**
 * Swaps the elements at the specified positions in the specified array.
 * @param {Array} array The array in which to swap elements.
 * @param {number} i the index of one element to be swapped.
 * @param {number} j the index of the other element to be swapped.
 * @return {boolean} true if the array is defined and the indexes are valid.
 */
function swap(array, i, j) {
    if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
        return false;
    }
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return true;
}
exports.swap = swap;
function toString(array) {
    return '[' + array.toString() + ']';
}
exports.toString = toString;
/**
 * Executes the provided function once for each element present in this array
 * starting from index 0 to length - 1.
 * @param {Array} array The array in which to iterate.
 * @param {function(Object):*} callback function to execute, it is
 * invoked with one argument: the element value, to break the iteration you can
 * optionally return false.
 */
function forEach(array, callback) {
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var ele = array_1[_i];
        if (callback(ele) === false) {
            return;
        }
    }
}
exports.forEach = forEach;

},{"./util":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _hasOwnProperty = Object.prototype.hasOwnProperty;
exports.has = function (obj, prop) {
    return _hasOwnProperty.call(obj, prop);
};
/**
 * Default function to compare element order.
 * @function
 */
function defaultCompare(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a === b) {
        return 0;
    }
    else {
        return 1;
    }
}
exports.defaultCompare = defaultCompare;
/**
 * Default function to test equality.
 * @function
 */
function defaultEquals(a, b) {
    return a === b;
}
exports.defaultEquals = defaultEquals;
/**
 * Default function to convert an object to a string.
 * @function
 */
function defaultToString(item) {
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return '$s' + item;
    }
    else {
        return '$o' + item.toString();
    }
}
exports.defaultToString = defaultToString;
/**
* Joins all the properies of the object using the provided join string
*/
function makeString(item, join) {
    if (join === void 0) { join = ','; }
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return item.toString();
    }
    else {
        var toret = '{';
        var first = true;
        for (var prop in item) {
            if (exports.has(item, prop)) {
                if (first) {
                    first = false;
                }
                else {
                    toret = toret + join;
                }
                toret = toret + prop + ':' + item[prop];
            }
        }
        return toret + '}';
    }
}
exports.makeString = makeString;
/**
 * Checks if the given argument is a function.
 * @function
 */
function isFunction(func) {
    return (typeof func) === 'function';
}
exports.isFunction = isFunction;
/**
 * Checks if the given argument is undefined.
 * @function
 */
function isUndefined(obj) {
    return (typeof obj) === 'undefined';
}
exports.isUndefined = isUndefined;
/**
 * Checks if the given argument is a string.
 * @function
 */
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}
exports.isString = isString;
/**
 * Reverses a compare function.
 * @function
 */
function reverseCompareFunction(compareFunction) {
    if (isUndefined(compareFunction) || !isFunction(compareFunction)) {
        return function (a, b) {
            if (a < b) {
                return 1;
            }
            else if (a === b) {
                return 0;
            }
            else {
                return -1;
            }
        };
    }
    else {
        return function (d, v) {
            return compareFunction(d, v) * -1;
        };
    }
}
exports.reverseCompareFunction = reverseCompareFunction;
/**
 * Returns an equal function given a compare function.
 * @function
 */
function compareToEquals(compareFunction) {
    return function (a, b) {
        return compareFunction(a, b) === 0;
    };
}
exports.compareToEquals = compareToEquals;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* /// <reference path="scripting.ts"/> */
var scripting_1 = require("./scripting");
var util_1 = require("typescript-collections/dist/lib/util");
// 1. Define State
// locations
var START = "START";
var BC_CORRIDOR = "BC_CORRIDOR";
var BL_CORRIDOR = "BL_CORRIDOR";
var BR_CORRIDOR = "BR_CORRIDOR";
var ML_CORRIDOR = "ML_CORRIDOR";
var TL_CORRIDOR = "TL_CORRIDOR";
var TC_CORRIDOR = "TC_CORRIDOR";
var TR_CORRIDOR = "TR_CORRIDOR";
var MR_CORRIDOR = "MR_CORRIDOR";
var LAB = "LAB";
var STORAGE = "STORAGE";
var MEDICAL = "MEDICAL";
var QUARTERS1 = "QUARTERS1";
var QUARTERS2 = "QUARTERS2";
var EXIT_ELEVATOR = "EXIT_ELEVATOR";
var ENGINES = "ENGINES";
var COCKPIT = "COCKPIT";
var COMMS = "COMMS";
scripting_1.addLocation(START, [BC_CORRIDOR]);
scripting_1.addLocation(BC_CORRIDOR, [BL_CORRIDOR, BR_CORRIDOR, LAB]);
scripting_1.addLocation(BL_CORRIDOR, [ML_CORRIDOR]);
scripting_1.addLocation(ML_CORRIDOR, [STORAGE, TL_CORRIDOR]);
scripting_1.addLocation(TL_CORRIDOR, [TC_CORRIDOR, ENGINES, COMMS]);
scripting_1.addLocation(ENGINES, [COCKPIT]);
scripting_1.addLocation(COCKPIT, [COMMS]);
scripting_1.addLocation(TC_CORRIDOR, [EXIT_ELEVATOR, MEDICAL, TR_CORRIDOR]);
scripting_1.addLocation(TR_CORRIDOR, [MR_CORRIDOR]);
scripting_1.addLocation(MR_CORRIDOR, [MEDICAL, QUARTERS2, BR_CORRIDOR]);
scripting_1.addLocation(BR_CORRIDOR, [QUARTERS1]);
// agents
var alien = scripting_1.addAgent("Alien");
// items
var crewCard1 = scripting_1.addItem("Crew card1");
var crewCard2 = scripting_1.addItem("Crew card2");
scripting_1.setItemVariable(crewCard1, "currentLocation", LAB);
scripting_1.setItemVariable(crewCard2, "currentLocation", MEDICAL);
// variables
//alien
scripting_1.setAgentVariable(alien, "currentLocation", COCKPIT);
//player
var playerLocation = scripting_1.setVariable("playerLocation", START);
var crewCardsCollected = scripting_1.setVariable("crewCardsCollected", 0);
// 2. Define BTs
// create ground actions
var setRandNumber = scripting_1.action(function () { return true; }, function () { return scripting_1.setVariable("randNumber", scripting_1.getRandNumber(1, 18)); }, {}, 0);
var chooseSTART = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 1; }, function () { return scripting_1.setVariable("destination", START); }, {}, 0);
var chooseBC_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 2; }, function () { return scripting_1.setVariable("destination", BC_CORRIDOR); }, {}, 0);
var chooseBL_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 3; }, function () { return scripting_1.setVariable("destination", BL_CORRIDOR); }, {}, 0);
var chooseBR_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 4; }, function () { return scripting_1.setVariable("destination", BR_CORRIDOR); }, {}, 0);
var chooseML_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 5; }, function () { return scripting_1.setVariable("destination", ML_CORRIDOR); }, {}, 0);
var chooseTL_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 6; }, function () { return scripting_1.setVariable("destination", TL_CORRIDOR); }, {}, 0);
var chooseTC_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 7; }, function () { return scripting_1.setVariable("destination", TC_CORRIDOR); }, {}, 0);
var chooseTR_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 8; }, function () { return scripting_1.setVariable("destination", TR_CORRIDOR); }, {}, 0);
var chooseMR_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 9; }, function () { return scripting_1.setVariable("destination", MR_CORRIDOR); }, {}, 0);
var chooseLAB = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 10; }, function () { return scripting_1.setVariable("destination", LAB); }, {}, 0);
var chooseSTORAGE = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 11; }, function () { return scripting_1.setVariable("destination", STORAGE); }, {}, 0);
var chooseMEDICAL = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 12; }, function () { return scripting_1.setVariable("destination", MEDICAL); }, {}, 0);
var chooseQUARTERS1 = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 13; }, function () { return scripting_1.setVariable("destination", QUARTERS1); }, {}, 0);
var chooseQUARTERS2 = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 14; }, function () { return scripting_1.setVariable("destination", QUARTERS2); }, {}, 0);
var chooseEXIT_ELEVATOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 15; }, function () { return scripting_1.setVariable("destination", EXIT_ELEVATOR); }, {}, 0);
var chooseENGINES = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 16; }, function () { return scripting_1.setVariable("destination", ENGINES); }, {}, 0);
var chooseCOCKPIT = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 17; }, function () { return scripting_1.setVariable("destination", COCKPIT); }, {}, 0);
var chooseCOMMS = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 18; }, function () { return scripting_1.setVariable("destination", COMMS); }, {}, 0);
var atDestination = function (params) { return scripting_1.getVariable("destination") == scripting_1.getAgentVariable(params.agent, "currentLocation"); };
var setDestinationPrecond = function (params) { return scripting_1.isVariableNotSet("destination") || atDestination(params); };
// create behavior trees
var setNextDestination = scripting_1.sequence([
    setRandNumber,
    scripting_1.selector([
        chooseSTART,
        chooseBC_CORRIDOR,
        chooseBL_CORRIDOR,
        chooseBR_CORRIDOR,
        chooseML_CORRIDOR,
        chooseTL_CORRIDOR,
        chooseTC_CORRIDOR,
        chooseTR_CORRIDOR,
        chooseMR_CORRIDOR,
        chooseLAB,
        chooseSTORAGE,
        chooseMEDICAL,
        chooseQUARTERS1,
        chooseQUARTERS2,
        chooseEXIT_ELEVATOR,
        chooseENGINES,
        chooseCOCKPIT,
        chooseCOMMS
    ])
]);
var gotoNextLocation = scripting_1.action(function () { return true; }, function () {
    scripting_1.setAgentVariable(alien, "currentLocation", scripting_1.getNextLocation(scripting_1.getAgentVariable(alien, "currentLocation"), scripting_1.getVariable("destination")));
    console.log("Alien is at: " + scripting_1.getAgentVariable(alien, "currentLocation"));
}, {}, 0);
var eatPlayer = scripting_1.action(function () { return scripting_1.getAgentVariable(alien, "currentLocation") == scripting_1.getVariable(playerLocation); }, function () {
    scripting_1.setVariable("endGame", "lose");
    scripting_1.setVariable(playerLocation, "NA");
}, {}, 0);
/*let search = selector([
    eatPlayer,
    sequence([
        selector([
            guard(setDestinationPrecond, {}, setNextDestination),
            action(() => true, () => {
            }, {}, 0)
        ]),
        gotoNextLocation,
        eatPlayer
    ])
]);*/
var search = scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(setDestinationPrecond, {}, setNextDestination),
        scripting_1.action(function () { return true; }, function () {
        }, {}, 0)
    ]),
    gotoNextLocation,
]);
var alienBT = scripting_1.selector([
    eatPlayer,
    scripting_1.sequence([
        search, eatPlayer
    ])
]);
scripting_1.attachTreeToAgent(alien, alienBT);
/*var blackboard = {};
console.log("Destination: " + getVariable("destination"));
console.log("Current location: " + getAgentVariable(alien, "currentLocation"));
execute(search, alien, blackboard);
console.log("Destination: " + getVariable("destination"));
console.log("Current location: " + getAgentVariable(alien, "currentLocation"));
execute(search, alien, blackboard);
console.log("Destination: " + getVariable("destination"));
console.log("Current location: " + getAgentVariable(alien, "currentLocation"));
execute(search, alien, blackboard);
console.log("Destination: " + getVariable("destination"));
console.log("Current location: " + getAgentVariable(alien, "currentLocation"));
execute(search, alien, blackboard);*/
//attach behaviour trees to agents
// 3. Construct story
// create user actions
var startStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == START; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the docking station."),
    scripting_1.userAction("Go forward to enter the corridor", function () { return scripting_1.setVariable(playerLocation, BC_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(startStateBT);
var bcStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BC_CORRIDOR; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the corridor."),
    scripting_1.userAction("Head west in the corridor", function () { return scripting_1.setVariable(playerLocation, BL_CORRIDOR); }),
    scripting_1.userAction("Enter the lab", function () { return scripting_1.setVariable(playerLocation, LAB); }),
    scripting_1.userAction("Head east in the corridor", function () { return scripting_1.setVariable(playerLocation, BR_CORRIDOR); }),
    scripting_1.userAction("Go back to the start", function () { return scripting_1.setVariable(playerLocation, START); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(bcStateBT);
var brStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BR_CORRIDOR; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.userAction("Enter the staff quarters", function () { return scripting_1.setVariable(playerLocation, QUARTERS1); }),
    scripting_1.userAction("Move north in the corridor", function () { return scripting_1.setVariable(playerLocation, MR_CORRIDOR); }),
    scripting_1.userAction("Head west in the corridor", function () { return scripting_1.setVariable(playerLocation, BC_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(brStateBT);
var quarters1BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == QUARTERS1; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the staff quarters."),
    scripting_1.userAction("Exit the staff quarters", function () { return scripting_1.setVariable(playerLocation, BR_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(quarters1BT);
var mrStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MR_CORRIDOR; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.userAction("Enter the captain's quarters on the east", function () { return scripting_1.setVariable(playerLocation, QUARTERS2); }),
    scripting_1.userAction("Enter the medical room on the west", function () { return scripting_1.setVariable(playerLocation, MEDICAL); }),
    scripting_1.userAction("Move north in the corridor", function () { return scripting_1.setVariable(playerLocation, TR_CORRIDOR); }),
    scripting_1.userAction("Move south in the corridor", function () { return scripting_1.setVariable(playerLocation, BR_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(mrStateBT);
var quarters2BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == QUARTERS2; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the captain's quarters."),
    scripting_1.userAction("Exit the captain's quarters", function () { return scripting_1.setVariable(playerLocation, MR_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(quarters2BT);
var medicalBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MEDICAL; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the medical room."),
    scripting_1.userAction("Exit to the north", function () { return scripting_1.setVariable(playerLocation, TC_CORRIDOR); }),
    scripting_1.userAction("Exit to the east", function () { return scripting_1.setVariable(playerLocation, MR_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(medicalBT);
var labBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == LAB; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the lab."),
    scripting_1.userAction("Exit the lab", function () { return scripting_1.setVariable(playerLocation, BC_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(labBT);
var trStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == TR_CORRIDOR; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.userAction("Move to the west", function () { return scripting_1.setVariable(playerLocation, TC_CORRIDOR); }),
    scripting_1.userAction("Move to the south", function () { return scripting_1.setVariable(playerLocation, MR_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(trStateBT);
var tcStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == TC_CORRIDOR; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.userAction("Move to the west", function () { return scripting_1.setVariable(playerLocation, TL_CORRIDOR); }),
    scripting_1.userAction("Enter the medical room", function () { return scripting_1.setVariable(playerLocation, MEDICAL); }),
    scripting_1.userAction("Move towards the elevator", function () { return scripting_1.setVariable(playerLocation, EXIT_ELEVATOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(tcStateBT);
var elevatorBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == EXIT_ELEVATOR; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You reach the exit elevator."),
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable(crewCardsCollected) >= 2; }, {}, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You can now activate the exit and flee!"),
            scripting_1.userAction("Activate and get out!", function () {
                scripting_1.setVariable("endGame", "win");
                scripting_1.setVariable(playerLocation, "NA");
            })
        ])),
        scripting_1.displayDescriptionAction("You need 2 crew cards to activate the exit elevator system.")
    ]),
    scripting_1.userAction("Move back in the corridor", function () { return scripting_1.setVariable(playerLocation, TC_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(elevatorBT);
var tlStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == TL_CORRIDOR; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.userAction("Enter the engines room to the north", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
    scripting_1.userAction("Enter the communications room to the east", function () { return scripting_1.setVariable(playerLocation, COMMS); }),
    scripting_1.userAction("Move to the east in the corridor", function () { return scripting_1.setVariable(playerLocation, TC_CORRIDOR); }),
    scripting_1.userAction("Move to the south", function () { return scripting_1.setVariable(playerLocation, ML_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(tlStateBT);
var blStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BL_CORRIDOR; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.userAction("Move to the north in the corridor", function () { return scripting_1.setVariable(playerLocation, ML_CORRIDOR); }),
    scripting_1.userAction("Move to the east in the corridor", function () { return scripting_1.setVariable(playerLocation, BC_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(blStateBT);
var mlStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ML_CORRIDOR; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.userAction("Enter the storage room", function () { return scripting_1.setVariable(playerLocation, STORAGE); }),
    scripting_1.userAction("Move to the north in the corridor", function () { return scripting_1.setVariable(playerLocation, TL_CORRIDOR); }),
    scripting_1.userAction("Move to the south", function () { return scripting_1.setVariable(playerLocation, BL_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(mlStateBT);
var storageBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == STORAGE; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the storage."),
    scripting_1.userAction("Exit the storage room", function () { return scripting_1.setVariable(playerLocation, ML_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(storageBT);
var commsBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == COMMS; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the communications room."),
    scripting_1.userAction("Enter the cockpit", function () { return scripting_1.setVariable(playerLocation, COCKPIT); }),
    scripting_1.userAction("Exit the communications room into the corridor", function () { return scripting_1.setVariable(playerLocation, TL_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(commsBT);
var cockpitBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == COCKPIT; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the cockpit."),
    scripting_1.userAction("Enter the engines room to the east", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
    scripting_1.userAction("Enter the communications room to the south", function () { return scripting_1.setVariable(playerLocation, COMMS); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(cockpitBT);
var enginesBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ENGINES; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the engines room."),
    scripting_1.userAction("Enter the cockpit to the east", function () { return scripting_1.setVariable(playerLocation, COCKPIT); }),
    scripting_1.userAction("Enter the corridor to the south", function () { return scripting_1.setVariable(playerLocation, TL_CORRIDOR); }),
    scripting_1.userAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(enginesBT);
var crewCard1BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == scripting_1.getItemVariable(crewCard1, "currentLocation"); }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You notice a crew card lying around."),
    scripting_1.userAction("Pick up the crew card", function () {
        console.log("pickedup");
        scripting_1.displayActionEffectText("You pick up the crew card.");
        scripting_1.setItemVariable(crewCard1, "currentLocation", "player");
        scripting_1.setVariable(crewCardsCollected, scripting_1.getVariable(crewCardsCollected) + 1);
    })
]));
var crewCard2BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == scripting_1.getItemVariable(crewCard2, "currentLocation"); }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You notice a crew card lying around."),
    scripting_1.userAction("Pick up the crew card", function () {
        console.log("pickedup");
        scripting_1.displayActionEffectText("You pick up the crew card.");
        scripting_1.setItemVariable(crewCard2, "currentLocation", "player");
        scripting_1.setVariable(crewCardsCollected, scripting_1.getVariable(crewCardsCollected) + 1);
    })
]));
scripting_1.addUserInteractionTree(crewCard1BT);
scripting_1.addUserInteractionTree(crewCard2BT);
var alienNearby = scripting_1.guard(function () { return scripting_1.areAdjacent(scripting_1.getVariable(playerLocation), scripting_1.getAgentVariable(alien, "currentLocation")); }, {}, scripting_1.displayDescriptionAction("You hear a thumping sound. The alien is nearby."));
scripting_1.addUserInteractionTree(alienNearby);
var gameOver = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == "NA"; }, {}, scripting_1.selector([
    scripting_1.guard(function () { return scripting_1.getVariable("endGame") == "win"; }, {}, scripting_1.displayDescriptionAction("You have managed to escape!")),
    scripting_1.guard(function () { return scripting_1.getVariable("endGame") == "lose"; }, {}, scripting_1.displayDescriptionAction("The creature grabs you before you can react! You struggle for a bit before realising it's all over.."))
]));
scripting_1.addUserInteractionTree(gameOver);
// create scenes
// map scenes to state (could use BT?)
//4. Run the world
scripting_1.initialize();
var userInteractionObject = scripting_1.getUserInteractionObject();
//Rendering-----
var displayPanel = { x: 500, y: 0 };
var textPanel = { x: 500, y: 350 };
var actionsPanel = { x: 520, y: 425 };
var canvas = document.getElementById('display');
var context = canvas.getContext('2d');
var spaceshipImage = new Image();
spaceshipImage.onload = render;
var playerImage = new Image();
var alienImage = new Image();
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(spaceshipImage, displayPanel.x, displayPanel.y, 500, 300);
    displayPlayer();
    displayAlien();
    displayTextAndActions();
}
var mapPositions = {
    "START": { x: 230, y: 235 },
    "BC_CORRIDOR": { x: 240, y: 210 },
    "BR_CORRIDOR": { x: 300, y: 190 },
    "MR_CORRIDOR": { x: 305, y: 150 },
    "QUARTERS2": { x: 340, y: 155 },
    "QUARTERS1": { x: 340, y: 190 },
    "TR_CORRIDOR": { x: 300, y: 100 },
    "TC_CORRIDOR": { x: 230, y: 100 },
    "TL_CORRIDOR": { x: 170, y: 100 },
    "EXIT_ELEVATOR": { x: 230, y: 60 },
    "LAB": { x: 240, y: 170 },
    "ML_CORRIDOR": { x: 160, y: 150 },
    "BL_CORRIDOR": { x: 160, y: 200 },
    "ENGINES": { x: 170, y: 60 },
    "COCKPIT": { x: 120, y: 60 },
    "COMMS": { x: 120, y: 100 },
    "MEDICAL": { x: 250, y: 130 },
    "STORAGE": { x: 200, y: 150 }
};
function displayPlayer() {
    var currLocation = scripting_1.getVariable(playerLocation);
    if (!util_1.isUndefined(mapPositions[currLocation]))
        context.drawImage(playerImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 16, 16);
}
function displayAlien() {
    var currLocation = scripting_1.getAgentVariable(alien, "currentLocation");
    context.drawImage(alienImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 24, 24);
}
spaceshipImage.src = "../images/isolation_map.png";
playerImage.src = "../images/player2.png";
alienImage.src = "../images/xenomorph.png";
var currentSelection;
var yOffset = actionsPanel.y + 25;
var yOffsetIncrement = 50;
function displayTextAndActions() {
    context.clearRect(textPanel.x, textPanel.y, 500, 1000);
    yOffset = actionsPanel.y + 25;
    context.font = "15pt Calibri";
    context.fillStyle = 'white';
    console.log("Actions effect text: " + userInteractionObject.actionEffectsText);
    var textToDisplay = userInteractionObject.actionEffectsText.length != 0 ? userInteractionObject.actionEffectsText : userInteractionObject.text;
    context.fillText(textToDisplay, textPanel.x, textPanel.y + 20);
    context.font = "15pt Calibri";
    context.fillStyle = 'white';
    for (var i = 0; i < userInteractionObject.userActionsText.length; i++) {
        var userActionText = userInteractionObject.userActionsText[i];
        context.fillText(userActionText, actionsPanel.x + 20, yOffset);
        if (i == 0) {
            currentSelection = i;
        }
        yOffset += yOffsetIncrement;
    }
    displayArrow();
    console.log("Crew cards: " + scripting_1.getVariable(crewCardsCollected));
}
function displayArrow() {
    if (userInteractionObject.userActionsText.length != 0) {
        context.clearRect(actionsPanel.x, actionsPanel.y, 20, 1000);
        context.fillText("> ", 520, actionsPanel.y + 25 + (currentSelection * yOffsetIncrement));
    }
}
//User input
function keyPress(e) {
    if (e.keyCode == 13) {
        var selectedAction = userInteractionObject.userActionsText[currentSelection];
        scripting_1.executeUserAction(selectedAction);
        scripting_1.worldTick();
        render();
    }
}
function keyDown(e) {
    if (e.keyCode == 40) {
        if (userInteractionObject.userActionsText.length != 0) {
            currentSelection++;
            currentSelection = currentSelection % userInteractionObject.userActionsText.length;
            displayArrow();
        }
    }
    else if (e.keyCode == 38) {
        if (userInteractionObject.userActionsText.length != 0) {
            currentSelection--;
            if (currentSelection < 0)
                currentSelection = userInteractionObject.userActionsText.length - 1;
            displayArrow();
        }
    }
}
document.addEventListener("keypress", keyPress, false);
document.addEventListener("keydown", keyDown, false);
},{"./scripting":6,"typescript-collections/dist/lib/util":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue_1 = require("typescript-collections/dist/lib/Queue");
var util_1 = require("typescript-collections/dist/lib/util");
var Status;
(function (Status) {
    Status[Status["RUNNING"] = 0] = "RUNNING";
    Status[Status["SUCCESS"] = 1] = "SUCCESS";
    Status[Status["FAILURE"] = 2] = "FAILURE";
})(Status = exports.Status || (exports.Status = {}));
function terminateAndReturn(id, blackboard, status) {
    delete blackboard[id];
    return status;
}
function getActionTick(id) {
    return function (precondition, effect, parameters, ticksRequired) {
        if (parameters === void 0) { parameters = {}; }
        if (ticksRequired === void 0) { ticksRequired = 1; }
        return function (agent, blackboard) {
            parameters.agent = agent;
            parameters.blackboard = blackboard;
            if (precondition(parameters)) {
                if (!blackboard[id]) {
                    blackboard[id] = {};
                    blackboard[id].ticksDone = ticksRequired;
                }
                if (blackboard[id].ticksDone > 0) {
                    blackboard[id].ticksDone--;
                    return Status.RUNNING;
                }
                else {
                    effect(parameters);
                    return terminateAndReturn(id, blackboard, Status.SUCCESS);
                }
            }
            else {
                return Status.FAILURE;
            }
        };
    };
}
function getGuardTick() {
    return function (precondition, parameters, astTick, negate) {
        if (negate === void 0) { negate = false; }
        return function (agent, blackboard) {
            parameters.agent = agent;
            parameters.blackboard = blackboard;
            var proceed = negate ? !precondition(parameters) : precondition(parameters);
            return proceed ? execute(astTick, agent, blackboard) : Status.FAILURE;
        };
    };
}
function getSequenceTick(id) {
    return function (astTicks) {
        return function (agent, blackboard) {
            if (!blackboard[id]) {
                blackboard[id] = {};
                blackboard[id].currentIndex = 0;
            }
            while (blackboard[id].currentIndex < astTicks.length) {
                var childStatus = execute(astTicks[blackboard[id].currentIndex], agent, blackboard);
                if (childStatus == Status.RUNNING)
                    return Status.RUNNING;
                else if (childStatus == Status.FAILURE)
                    return terminateAndReturn(id, blackboard, Status.FAILURE);
                else if (childStatus == Status.SUCCESS)
                    blackboard[id].currentIndex += 1;
            }
            return terminateAndReturn(id, blackboard, Status.SUCCESS);
        };
    };
}
function getSelectorTick(id) {
    return function (astTicks) {
        return function (agent, blackboard) {
            if (!blackboard[id]) {
                blackboard[id] = {};
                blackboard[id].currentIndex = 0;
            }
            while (blackboard[id].currentIndex < astTicks.length) {
                var childStatus = execute(astTicks[blackboard[id].currentIndex], agent, blackboard);
                if (childStatus == Status.RUNNING)
                    return Status.RUNNING;
                else if (childStatus == Status.SUCCESS)
                    return terminateAndReturn(id, blackboard, Status.SUCCESS);
                else if (childStatus == Status.FAILURE)
                    blackboard[id].currentIndex += 1;
            }
            return terminateAndReturn(id, blackboard, Status.FAILURE);
        };
    };
}
function execute(astTick, agent, blackboard) {
    return astTick(agent, blackboard);
}
exports.execute = execute;
var globalIdCounter = 0;
function action(precondition, effect, params, ticksRequired) {
    return getActionTick(globalIdCounter++)(precondition, effect, params, ticksRequired);
}
exports.action = action;
function guard(precondition, params, astTick) {
    return getGuardTick()(precondition, params, astTick);
}
exports.guard = guard;
function neg_guard(precondition, params, astTick) {
    return getGuardTick()(precondition, params, astTick, true);
}
exports.neg_guard = neg_guard;
/**
 * Cycles over its children: iterates to the next child on success of a child
 * Succeeds if all succeed, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
function sequence(astTicks) {
    return getSequenceTick(globalIdCounter++)(astTicks);
}
exports.sequence = sequence;
/**
 * Cycles over its children: iterates to the next child on failure of a child(think of it as if-else blocks)
 * Succeeds if even one succeeds, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
function selector(astTicks) {
    return getSelectorTick(globalIdCounter++)(astTicks);
}
exports.selector = selector;
/*--------------- API --------------- */
//0. utilities
// min and max are inclusive
function getRandNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandNumber = getRandNumber;
//1. story instance
//1.1 locations
var locationGraph = {};
//add to both sides
function addLocation(locationName, adjacentLocations) {
    if (locationGraph[locationName] == undefined)
        locationGraph[locationName] = [];
    locationGraph[locationName] = locationGraph[locationName].concat(adjacentLocations);
    for (var i = 0; i < adjacentLocations.length; i++) {
        if (locationGraph[adjacentLocations[i]] == undefined)
            locationGraph[adjacentLocations[i]] = [];
        locationGraph[adjacentLocations[i]].push(locationName);
    }
}
exports.addLocation = addLocation;
function areAdjacent(location1, location2) {
    console.log("Are adjacent: " + location1 + ", " + location2);
    if (locationGraph[location1] == undefined || locationGraph[location2] == undefined) {
        console.log("Either one/both locations undefined");
        return false;
    }
    for (var i = 0; i < locationGraph[location1].length; i++) {
        if (locationGraph[location1][i] == location2) {
            return true;
        }
    }
    return false;
}
exports.areAdjacent = areAdjacent;
//pathfinding primitives
function getNextLocation(start, destination) {
    var visited = {};
    var previous = {};
    for (var key in locationGraph) {
        visited[key] = false;
    }
    visited[start] = true;
    var myQueue = new Queue_1.default();
    myQueue.enqueue(start);
    while (!myQueue.isEmpty()) {
        var current = myQueue.dequeue();
        if (current === destination) {
            break;
        }
        var neighbors = locationGraph[current];
        for (var i = 0; i < neighbors.length; i++) {
            if (!visited[neighbors[i]]) {
                myQueue.enqueue(neighbors[i]);
                visited[neighbors[i]] = true;
                previous[neighbors[i]] = current;
            }
        }
    }
    var current = destination;
    if (current == start)
        return current;
    while (previous[current] != start) {
        current = previous[current];
    }
    return current;
}
exports.getNextLocation = getNextLocation;
//1.2 agents
var agents = [];
function addAgent(agentName) {
    agents.push(agentName);
    return agentName;
}
exports.addAgent = addAgent;
//1.3 items
var items = [];
function addItem(itemName) {
    items.push(itemName);
    return itemName;
}
exports.addItem = addItem;
//1.4 variables
var variables = {};
var agentVariables = {};
var itemVariables = {};
function setVariable(varName, value) {
    variables[varName] = value;
    return varName;
}
exports.setVariable = setVariable;
function setAgentVariable(agent, varName, value) {
    if (util_1.isUndefined(agentVariables[agent]))
        agentVariables[agent] = {};
    agentVariables[agent][varName] = value;
    return value;
}
exports.setAgentVariable = setAgentVariable;
function getVariable(varName) {
    if (util_1.isUndefined(variables[varName])) {
        console.log("Variable " + varName + " not set!");
        return;
    }
    return variables[varName];
}
exports.getVariable = getVariable;
function getAgentVariable(agent, varName) {
    if (util_1.isUndefined(agentVariables[agent]) || util_1.isUndefined(agentVariables[agent][varName])) {
        console.log("Variable " + varName + " for agent " + agent + " not set!");
        return;
    }
    return agentVariables[agent][varName];
}
exports.getAgentVariable = getAgentVariable;
function isVariableNotSet(varName) {
    return util_1.isUndefined(variables[varName]);
}
exports.isVariableNotSet = isVariableNotSet;
function isAgentVariableNotSet(agent, varName) {
    return util_1.isUndefined(agentVariables[agent]) || util_1.isUndefined(agentVariables[agent][varName]);
}
exports.isAgentVariableNotSet = isAgentVariableNotSet;
function setItemVariable(item, varName, value) {
    if (util_1.isUndefined(itemVariables[item]))
        itemVariables[item] = {};
    itemVariables[item][varName] = value;
    return value;
}
exports.setItemVariable = setItemVariable;
function getItemVariable(item, varName) {
    if (util_1.isUndefined(itemVariables[item]) || util_1.isUndefined(itemVariables[item][varName])) {
        console.log("Variable " + varName + " for item " + item + " not set!");
        return;
    }
    return itemVariables[item][varName];
}
exports.getItemVariable = getItemVariable;
//2
//agent-behavior tree mapping
var agentTrees = {};
function attachTreeToAgent(agent, tree) {
    agentTrees[agent] = tree;
}
exports.attachTreeToAgent = attachTreeToAgent;
//3.1
//user actions
//TODO add variables to user action texts
var userInteractionObject = {
    text: "",
    userActionsText: [],
    actionEffectsText: ""
};
var userInteractionTrees = [];
var userActions = {};
function runUserInteractionTrees(blackboard) {
    userInteractionObject.text = "";
    userInteractionObject.userActionsText = [];
    userActions = {}; //{"Go to location X" : effect
    //TODO run the display trees
    for (var i = 0; i < userInteractionTrees.length; i++) {
        execute(userInteractionTrees[i], "interactionAgent", blackboard);
    }
    //TODO replace variables in text of description from variable set
}
function addUserAction(text, effect) {
    //TODO replace variables in text of user actions from variable set (this could be done via user too)
    userActions[text] = effect;
    userInteractionObject.userActionsText.push(text);
}
exports.displayDescriptionAction = function (text) {
    return action(function () { return true; }, function () { return userInteractionObject.text += "\n" + text; }, {}, 0);
};
exports.displayActionEffectText = function (text) { return userInteractionObject.actionEffectsText += "\n" + text; };
exports.userAction = function (text, effect) {
    return action(function () { return true; }, function () { return addUserAction(text, effect); }, {}, 0);
};
function addUserInteractionTree(tick) {
    userInteractionTrees.push(tick);
}
exports.addUserInteractionTree = addUserInteractionTree;
function executeUserAction(text) {
    //execute the user action
    userInteractionObject.actionEffectsText = "";
    var userAction = userActions[text];
    userAction();
}
exports.executeUserAction = executeUserAction;
//4.
var blackboard = {};
function initialize() {
    runUserInteractionTrees(blackboard);
}
exports.initialize = initialize;
function getUserInteractionObject() {
    return userInteractionObject;
}
exports.getUserInteractionObject = getUserInteractionObject;
function worldTick(userActionText) {
    //all agent ticks
    for (var i = 0; i < agents.length; i++) {
        var tree = agentTrees[agents[i]];
        if (!util_1.isUndefined(tree)) {
            execute(tree, agents[i], blackboard);
        }
    }
    runUserInteractionTrees(blackboard);
}
exports.worldTick = worldTick;
},{"typescript-collections/dist/lib/Queue":2,"typescript-collections/dist/lib/util":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL2lzb2xhdGlvbi50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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VUFBVSxFQUFFLENBQUM7QUFDakIsQ0FBQztBQUxELDhDQUtDO0FBRUQsSUFBSTtBQUNKLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUVwQjtJQUNJLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFGRCxnQ0FFQztBQUVEO0lBQ0ksTUFBTSxDQUFDLHFCQUFxQixDQUFDO0FBQ2pDLENBQUM7QUFGRCw0REFFQztBQUVELG1CQUEwQixjQUF1QjtJQUM3QyxpQkFBaUI7SUFDakIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDckMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDekMsQ0FBQztJQUNMLENBQUM7SUFDRCx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBVEQsOEJBU0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xudmFyIGFycmF5cyA9IHJlcXVpcmUoXCIuL2FycmF5c1wiKTtcbnZhciBMaW5rZWRMaXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICogQ3JlYXRlcyBhbiBlbXB0eSBMaW5rZWQgTGlzdC5cbiAgICAqIEBjbGFzcyBBIGxpbmtlZCBsaXN0IGlzIGEgZGF0YSBzdHJ1Y3R1cmUgY29uc2lzdGluZyBvZiBhIGdyb3VwIG9mIG5vZGVzXG4gICAgKiB3aGljaCB0b2dldGhlciByZXByZXNlbnQgYSBzZXF1ZW5jZS5cbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICovXG4gICAgZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICogRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdFxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICogQHByaXZhdGVcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgKiBMYXN0IG5vZGUgaW4gdGhlIGxpc3RcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICovXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgKiBOdW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIGxpc3RcbiAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICovXG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBBZGRzIGFuIGVsZW1lbnQgdG8gdGhpcyBsaXN0LlxuICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSBhZGRlZC5cbiAgICAqIEBwYXJhbSB7bnVtYmVyPX0gaW5kZXggb3B0aW9uYWwgaW5kZXggdG8gYWRkIHRoZSBlbGVtZW50LiBJZiBubyBpbmRleCBpcyBzcGVjaWZpZWRcbiAgICAqIHRoZSBlbGVtZW50IGlzIGFkZGVkIHRvIHRoZSBlbmQgb2YgdGhpcyBsaXN0LlxuICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgYWRkZWQgb3IgZmFsc2UgaWYgdGhlIGluZGV4IGlzIGludmFsaWRcbiAgICAqIG9yIGlmIHRoZSBlbGVtZW50IGlzIHVuZGVmaW5lZC5cbiAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpbmRleCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5uRWxlbWVudHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMubkVsZW1lbnRzIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3Tm9kZSA9IHRoaXMuY3JlYXRlTm9kZShpdGVtKTtcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAwIHx8IHRoaXMubGFzdE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIEZpcnN0IG5vZGUgaW4gdGhlIGxpc3QuXG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gdGhpcy5uRWxlbWVudHMpIHtcbiAgICAgICAgICAgIC8vIEluc2VydCBhdCB0aGUgZW5kLlxuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZS5uZXh0ID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAvLyBDaGFuZ2UgZmlyc3Qgbm9kZS5cbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHByZXYgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4IC0gMSk7XG4gICAgICAgICAgICBpZiAocHJldiA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gcHJldi5uZXh0O1xuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5FbGVtZW50cysrO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXG4gICAgKiBAcmV0dXJuIHsqfSB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbGlzdCBvciB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXNcbiAgICAqIGVtcHR5LlxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpcnN0Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICogUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAqIEByZXR1cm4geyp9IHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXG4gICAgKiBlbXB0eS5cbiAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3ROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50IGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhpcyBsaXN0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBkZXNpcmVkIGluZGV4LlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleCBvciB1bmRlZmluZWQgaWYgdGhlIGluZGV4IGlzXG4gICAgICogb3V0IG9mIGJvdW5kcy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXgpO1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZS5lbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZVxuICAgICAqIHNwZWNpZmllZCBlbGVtZW50LCBvciAtMSBpZiB0aGUgTGlzdCBkb2VzIG5vdCBjb250YWluIHRoaXMgZWxlbWVudC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgbGlzdCBhcmVcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgKlxuICAgICAqIDxwcmU+XG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2VcbiAgICAgKiBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoaXMgbGlzdCBkb2VzIG5vdCBjb250YWluIHRoZVxuICAgICAqIGVsZW1lbnQuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXG4gICAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICAgKlxuICAgICAgICogPHByZT5cbiAgICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcbiAgICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICAgKiB9XG4gICAgICAgKiA8L3ByZT5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXG4gICAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIGZhbHNlXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gKHRoaXMuaW5kZXhPZihpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbiB0aGlzIGxpc3QuXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgKlxuICAgICAqIDxwcmU+XG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoaXMgbGlzdCwgaWYgcHJlc2VudC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBsaXN0IGNvbnRhaW5lZCB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPCAxIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjdXJyZW50Tm9kZSA9PT0gdGhpcy5sYXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gcHJldmlvdXM7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5uZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5uZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5uRWxlbWVudHMtLTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudE5vZGU7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgb2YgdGhlIGVsZW1lbnRzIGZyb20gdGhpcyBsaXN0LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBsaXN0LlxuICAgICAqIFR3byBsaXN0cyBhcmUgZXF1YWwgaWYgdGhleSBoYXZlIHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7TGlua2VkTGlzdH0gb3RoZXIgdGhlIG90aGVyIGxpc3QuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuIElmIHRoZSBlbGVtZW50cyBpbiB0aGUgbGlzdHNcbiAgICAgKiBhcmUgY3VzdG9tIG9iamVjdHMgeW91IHNob3VsZCBwcm92aWRlIGEgZnVuY3Rpb24sIG90aGVyd2lzZVxuICAgICAqIHRoZSA9PT0gb3BlcmF0b3IgaXMgdXNlZCB0byBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbnRzLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBsaXN0LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlciwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIGVxRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICAgICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBMaW5rZWRMaXN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXIuc2l6ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZXF1YWxzQXV4KHRoaXMuZmlyc3ROb2RlLCBvdGhlci5maXJzdE5vZGUsIGVxRik7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBwcml2YXRlXG4gICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lcXVhbHNBdXggPSBmdW5jdGlvbiAobjEsIG4yLCBlcUYpIHtcbiAgICAgICAgd2hpbGUgKG4xICE9PSBudWxsICYmIG4yICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoIWVxRihuMS5lbGVtZW50LCBuMi5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG4xID0gbjEubmV4dDtcbiAgICAgICAgICAgIG4yID0gbjIubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IGdpdmVuIGluZGV4LlxuICAgICAqIEByZXR1cm4geyp9IHJlbW92ZWQgZWxlbWVudCBvciB1bmRlZmluZWQgaWYgdGhlIGluZGV4IGlzIG91dCBvZiBib3VuZHMuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmVtb3ZlRWxlbWVudEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLm5FbGVtZW50cyB8fCB0aGlzLmZpcnN0Tm9kZSA9PT0gbnVsbCB8fCB0aGlzLmxhc3ROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbGVtZW50O1xuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDEpIHtcbiAgICAgICAgICAgIC8vRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJldmlvdXMgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4IC0gMSk7XG4gICAgICAgICAgICBpZiAocHJldmlvdXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IHRoaXMuZmlyc3ROb2RlLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcmV2aW91cy5uZXh0ID09PSB0aGlzLmxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMubGFzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gcHJldmlvdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJldmlvdXMgIT09IG51bGwgJiYgcHJldmlvdXMubmV4dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBwcmV2aW91cy5uZXh0LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IHByZXZpb3VzLm5leHQubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIGxpc3QgaW4gb3JkZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICAgICAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGN1cnJlbnROb2RlLmVsZW1lbnQpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXZlcnNlcyB0aGUgb3JkZXIgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlua2VkIGxpc3QgKG1ha2VzIHRoZSBsYXN0XG4gICAgICogZWxlbWVudCBmaXJzdCwgYW5kIHRoZSBmaXJzdCBlbGVtZW50IGxhc3QpLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHZhciB0ZW1wID0gbnVsbDtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRlbXAgPSBjdXJyZW50Lm5leHQ7XG4gICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBwcmV2aW91cztcbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICAgIHRlbXAgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmxhc3ROb2RlO1xuICAgICAgICB0aGlzLmxhc3ROb2RlID0gdGVtcDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlzdCBpbiBwcm9wZXJcbiAgICAgKiBzZXF1ZW5jZS5cbiAgICAgKiBAcmV0dXJuIHtBcnJheS48Kj59IGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QsXG4gICAgICogaW4gcHJvcGVyIHNlcXVlbmNlLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBhcnJheS5wdXNoKGN1cnJlbnROb2RlLmVsZW1lbnQpO1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIG5vIGVsZW1lbnRzLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIG5vIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cyA8PSAwO1xuICAgIH07XG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcnJheXMudG9TdHJpbmcodGhpcy50b0FycmF5KCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5ub2RlQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT09ICh0aGlzLm5FbGVtZW50cyAtIDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGV4ICYmIG5vZGUgIT0gbnVsbDsgaSsrKSB7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jcmVhdGVOb2RlID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGl0ZW0sXG4gICAgICAgICAgICBuZXh0OiBudWxsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gTGlua2VkTGlzdDtcbn0oKSk7IC8vIEVuZCBvZiBsaW5rZWQgbGlzdFxuZXhwb3J0cy5kZWZhdWx0ID0gTGlua2VkTGlzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbmtlZExpc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTGlua2VkTGlzdF8xID0gcmVxdWlyZShcIi4vTGlua2VkTGlzdFwiKTtcbnZhciBRdWV1ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IHF1ZXVlLlxuICAgICAqIEBjbGFzcyBBIHF1ZXVlIGlzIGEgRmlyc3QtSW4tRmlyc3QtT3V0IChGSUZPKSBkYXRhIHN0cnVjdHVyZSwgdGhlIGZpcnN0XG4gICAgICogZWxlbWVudCBhZGRlZCB0byB0aGUgcXVldWUgd2lsbCBiZSB0aGUgZmlyc3Qgb25lIHRvIGJlIHJlbW92ZWQuIFRoaXNcbiAgICAgKiBpbXBsZW1lbnRhdGlvbiB1c2VzIGEgbGlua2VkIGxpc3QgYXMgYSBjb250YWluZXIuXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgZnVuY3Rpb24gUXVldWUoKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IG5ldyBMaW5rZWRMaXN0XzEuZGVmYXVsdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSB0aGUgZWxlbWVudCB0byBpbnNlcnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuZW5xdWV1ZSA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuYWRkKGVsZW0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW50byB0aGUgZW5kIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuYWRkKGVsZW0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIGFuZCByZW1vdmVzIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmRlcXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3Quc2l6ZSgpICE9PSAwKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSB0aGlzLmxpc3QuZmlyc3QoKTtcbiAgICAgICAgICAgIHRoaXMubGlzdC5yZW1vdmVFbGVtZW50QXRJbmRleCgwKTtcbiAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzLCBidXQgZG9lcyBub3QgcmVtb3ZlLCB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5maXJzdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBxdWV1ZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGlzIHN0YWNrIGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciwgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgKlxuICAgICAqIDxwcmU+XG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lIChwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgcXVldWUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LFxuICAgICAqIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoZWxlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5jb250YWlucyhlbGVtLCBlcXVhbHNGdW5jdGlvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGFuZCBvbmx5IGlmIHRoaXMgcXVldWUgY29udGFpbnMgbm8gaXRlbXM7IGZhbHNlXG4gICAgICogb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKSA8PSAwO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgb2YgdGhlIGVsZW1lbnRzIGZyb20gdGhpcyBxdWV1ZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubGlzdC5jbGVhcigpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgcXVldWUgaW5cbiAgICAgKiBGSUZPIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmxpc3QuZm9yRWFjaChjYWxsYmFjayk7XG4gICAgfTtcbiAgICByZXR1cm4gUXVldWU7XG59KCkpOyAvLyBFbmQgb2YgcXVldWVcbmV4cG9ydHMuZGVmYXVsdCA9IFF1ZXVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UXVldWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgaXRlbVxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXkuNFxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSwgb3IgLTEgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5leHBvcnRzLmluZGV4T2YgPSBpbmRleE9mO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXkgb3IgLTEgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBsYXN0SW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5leHBvcnRzLmxhc3RJbmRleE9mID0gbGFzdEluZGV4T2Y7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICovXG5mdW5jdGlvbiBjb250YWlucyhhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDA7XG59XG5leHBvcnRzLmNvbnRhaW5zID0gY29udGFpbnM7XG4vKipcbiAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgZnJvbSB0aGUgc3BlY2lmaWVkIGFycmF5LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgY2hhbmdlZCBhZnRlciB0aGlzIGNhbGwuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZShhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbik7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLnJlbW92ZSA9IHJlbW92ZTtcbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXkgZXF1YWxcbiAqIHRvIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIGRldGVybWluZSB0aGUgZnJlcXVlbmN5IG9mIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgd2hvc2UgZnJlcXVlbmN5IGlzIHRvIGJlIGRldGVybWluZWQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheVxuICogZXF1YWwgdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGZyZXF1ZW5jeShhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgdmFyIGZyZXEgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIGZyZXErKztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnJlcTtcbn1cbmV4cG9ydHMuZnJlcXVlbmN5ID0gZnJlcXVlbmN5O1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBzcGVjaWZpZWQgYXJyYXlzIGFyZSBlcXVhbCB0byBvbmUgYW5vdGhlci5cbiAqIFR3byBhcnJheXMgYXJlIGNvbnNpZGVyZWQgZXF1YWwgaWYgYm90aCBhcnJheXMgY29udGFpbiB0aGUgc2FtZSBudW1iZXJcbiAqIG9mIGVsZW1lbnRzLCBhbmQgYWxsIGNvcnJlc3BvbmRpbmcgcGFpcnMgb2YgZWxlbWVudHMgaW4gdGhlIHR3b1xuICogYXJyYXlzIGFyZSBlcXVhbCBhbmQgYXJlIGluIHRoZSBzYW1lIG9yZGVyLlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIG9uZSBhcnJheSB0byBiZSB0ZXN0ZWQgZm9yIGVxdWFsaXR5LlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIHRoZSBvdGhlciBhcnJheSB0byBiZSB0ZXN0ZWQgZm9yIGVxdWFsaXR5LlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiBlbGVtZW1lbnRzIGluIHRoZSBhcnJheXMuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSB0d28gYXJyYXlzIGFyZSBlcXVhbFxuICovXG5mdW5jdGlvbiBlcXVhbHMoYXJyYXkxLCBhcnJheTIsIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBhcnJheTEubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFlcXVhbHMoYXJyYXkxW2ldLCBhcnJheTJbaV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLmVxdWFscyA9IGVxdWFscztcbi8qKlxuICogUmV0dXJucyBzaGFsbG93IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgdG8gY29weS5cbiAqIEByZXR1cm4ge0FycmF5fSBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheVxuICovXG5mdW5jdGlvbiBjb3B5KGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5LmNvbmNhdCgpO1xufVxuZXhwb3J0cy5jb3B5ID0gY29weTtcbi8qKlxuICogU3dhcHMgdGhlIGVsZW1lbnRzIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb25zIGluIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgaW4gd2hpY2ggdG8gc3dhcCBlbGVtZW50cy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpIHRoZSBpbmRleCBvZiBvbmUgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxuICogQHBhcmFtIHtudW1iZXJ9IGogdGhlIGluZGV4IG9mIHRoZSBvdGhlciBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBpcyBkZWZpbmVkIGFuZCB0aGUgaW5kZXhlcyBhcmUgdmFsaWQuXG4gKi9cbmZ1bmN0aW9uIHN3YXAoYXJyYXksIGksIGopIHtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBhcnJheS5sZW5ndGggfHwgaiA8IDAgfHwgaiA+PSBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgdGVtcCA9IGFycmF5W2ldO1xuICAgIGFycmF5W2ldID0gYXJyYXlbal07XG4gICAgYXJyYXlbal0gPSB0ZW1wO1xuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5zd2FwID0gc3dhcDtcbmZ1bmN0aW9uIHRvU3RyaW5nKGFycmF5KSB7XG4gICAgcmV0dXJuICdbJyArIGFycmF5LnRvU3RyaW5nKCkgKyAnXSc7XG59XG5leHBvcnRzLnRvU3RyaW5nID0gdG9TdHJpbmc7XG4vKipcbiAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIGFycmF5XG4gKiBzdGFydGluZyBmcm9tIGluZGV4IDAgdG8gbGVuZ3RoIC0gMS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBpdGVyYXRlLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXG4gKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChhcnJheSwgY2FsbGJhY2spIHtcbiAgICBmb3IgKHZhciBfaSA9IDAsIGFycmF5XzEgPSBhcnJheTsgX2kgPCBhcnJheV8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgZWxlID0gYXJyYXlfMVtfaV07XG4gICAgICAgIGlmIChjYWxsYmFjayhlbGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5mb3JFYWNoID0gZm9yRWFjaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuZXhwb3J0cy5oYXMgPSBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG4gICAgcmV0dXJuIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59O1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbXBhcmUgZWxlbWVudCBvcmRlci5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZShhLCBiKSB7XG4gICAgaWYgKGEgPCBiKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdENvbXBhcmUgPSBkZWZhdWx0Q29tcGFyZTtcbi8qKlxuICogRGVmYXVsdCBmdW5jdGlvbiB0byB0ZXN0IGVxdWFsaXR5LlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRFcXVhbHMoYSwgYikge1xuICAgIHJldHVybiBhID09PSBiO1xufVxuZXhwb3J0cy5kZWZhdWx0RXF1YWxzID0gZGVmYXVsdEVxdWFscztcbi8qKlxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb252ZXJ0IGFuIG9iamVjdCB0byBhIHN0cmluZy5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWZhdWx0VG9TdHJpbmcoaXRlbSkge1xuICAgIGlmIChpdGVtID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9OVUxMJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX1VOREVGSU5FRCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiAnJHMnICsgaXRlbTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAnJG8nICsgaXRlbS50b1N0cmluZygpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdFRvU3RyaW5nID0gZGVmYXVsdFRvU3RyaW5nO1xuLyoqXG4qIEpvaW5zIGFsbCB0aGUgcHJvcGVyaWVzIG9mIHRoZSBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIGpvaW4gc3RyaW5nXG4qL1xuZnVuY3Rpb24gbWFrZVN0cmluZyhpdGVtLCBqb2luKSB7XG4gICAgaWYgKGpvaW4gPT09IHZvaWQgMCkgeyBqb2luID0gJywnOyB9XG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0udG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciB0b3JldCA9ICd7JztcbiAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBpdGVtKSB7XG4gICAgICAgICAgICBpZiAoZXhwb3J0cy5oYXMoaXRlbSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBqb2luO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b3JldCA9IHRvcmV0ICsgcHJvcCArICc6JyArIGl0ZW1bcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvcmV0ICsgJ30nO1xuICAgIH1cbn1cbmV4cG9ydHMubWFrZVN0cmluZyA9IG1ha2VTdHJpbmc7XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBmdW5jdGlvbi5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmMpIHtcbiAgICByZXR1cm4gKHR5cGVvZiBmdW5jKSA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgdW5kZWZpbmVkLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xuICAgIHJldHVybiAodHlwZW9mIG9iaikgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgc3RyaW5nLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG4vKipcbiAqIFJldmVyc2VzIGEgY29tcGFyZSBmdW5jdGlvbi5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uKGNvbXBhcmVGdW5jdGlvbikge1xuICAgIGlmIChpc1VuZGVmaW5lZChjb21wYXJlRnVuY3Rpb24pIHx8ICFpc0Z1bmN0aW9uKGNvbXBhcmVGdW5jdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZCwgdikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihkLCB2KSAqIC0xO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMucmV2ZXJzZUNvbXBhcmVGdW5jdGlvbiA9IHJldmVyc2VDb21wYXJlRnVuY3Rpb247XG4vKipcbiAqIFJldHVybnMgYW4gZXF1YWwgZnVuY3Rpb24gZ2l2ZW4gYSBjb21wYXJlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVUb0VxdWFscyhjb21wYXJlRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihhLCBiKSA9PT0gMDtcbiAgICB9O1xufVxuZXhwb3J0cy5jb21wYXJlVG9FcXVhbHMgPSBjb21wYXJlVG9FcXVhbHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsIi8qIC8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzY3JpcHRpbmcudHNcIi8+ICovXHJcbmltcG9ydCB7XHJcbiAgICBhZGRBZ2VudCwgc2V0QWdlbnRWYXJpYWJsZSwgYWRkSXRlbSwgYWRkTG9jYXRpb24sIHNldFZhcmlhYmxlLCBnZXROZXh0TG9jYXRpb24sIGFjdGlvbixcclxuICAgIGdldFJhbmROdW1iZXIsIGdldFZhcmlhYmxlLCBzZXF1ZW5jZSwgc2VsZWN0b3IsIGV4ZWN1dGUsIFByZWNvbmRpdGlvbiwgZ2V0QWdlbnRWYXJpYWJsZSwgbmVnX2d1YXJkLCBndWFyZCxcclxuICAgIGlzVmFyaWFibGVOb3RTZXQsIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiwgdXNlckFjdGlvbiwgYWRkVXNlckludGVyYWN0aW9uVHJlZSwgaW5pdGlhbGl6ZSxcclxuICAgIGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCwgZXhlY3V0ZVVzZXJBY3Rpb24sIHdvcmxkVGljaywgYXR0YWNoVHJlZVRvQWdlbnQsIHNldEl0ZW1WYXJpYWJsZSwgZ2V0SXRlbVZhcmlhYmxlLFxyXG4gICAgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQsIGFyZUFkamFjZW50XHJcbn0gZnJvbSBcIi4vc2NyaXB0aW5nXCI7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcclxuXHJcbi8vIDEuIERlZmluZSBTdGF0ZVxyXG4vLyBsb2NhdGlvbnNcclxudmFyIFNUQVJUID0gXCJTVEFSVFwiO1xyXG52YXIgQkNfQ09SUklET1IgPSBcIkJDX0NPUlJJRE9SXCI7XHJcbnZhciBCTF9DT1JSSURPUiA9IFwiQkxfQ09SUklET1JcIjtcclxudmFyIEJSX0NPUlJJRE9SID0gXCJCUl9DT1JSSURPUlwiO1xyXG52YXIgTUxfQ09SUklET1IgPSBcIk1MX0NPUlJJRE9SXCI7XHJcbnZhciBUTF9DT1JSSURPUiA9IFwiVExfQ09SUklET1JcIjtcclxudmFyIFRDX0NPUlJJRE9SID0gXCJUQ19DT1JSSURPUlwiO1xyXG52YXIgVFJfQ09SUklET1IgPSBcIlRSX0NPUlJJRE9SXCI7XHJcbnZhciBNUl9DT1JSSURPUiA9IFwiTVJfQ09SUklET1JcIjtcclxudmFyIExBQiA9IFwiTEFCXCI7XHJcbnZhciBTVE9SQUdFID0gXCJTVE9SQUdFXCI7XHJcbnZhciBNRURJQ0FMID0gXCJNRURJQ0FMXCI7XHJcbnZhciBRVUFSVEVSUzEgPSBcIlFVQVJURVJTMVwiO1xyXG52YXIgUVVBUlRFUlMyID0gXCJRVUFSVEVSUzJcIjtcclxudmFyIEVYSVRfRUxFVkFUT1IgPSBcIkVYSVRfRUxFVkFUT1JcIjtcclxudmFyIEVOR0lORVMgPSBcIkVOR0lORVNcIjtcclxudmFyIENPQ0tQSVQgPSBcIkNPQ0tQSVRcIjtcclxudmFyIENPTU1TID0gXCJDT01NU1wiO1xyXG5cclxuYWRkTG9jYXRpb24oU1RBUlQsIFtCQ19DT1JSSURPUl0pO1xyXG5hZGRMb2NhdGlvbihCQ19DT1JSSURPUiwgW0JMX0NPUlJJRE9SLCBCUl9DT1JSSURPUiwgTEFCXSk7XHJcbmFkZExvY2F0aW9uKEJMX0NPUlJJRE9SLCBbTUxfQ09SUklET1JdKTtcclxuYWRkTG9jYXRpb24oTUxfQ09SUklET1IsIFtTVE9SQUdFLCBUTF9DT1JSSURPUl0pO1xyXG5hZGRMb2NhdGlvbihUTF9DT1JSSURPUiwgW1RDX0NPUlJJRE9SLCBFTkdJTkVTLCBDT01NU10pO1xyXG5hZGRMb2NhdGlvbihFTkdJTkVTLCBbQ09DS1BJVF0pO1xyXG5hZGRMb2NhdGlvbihDT0NLUElULCBbQ09NTVNdKTtcclxuYWRkTG9jYXRpb24oVENfQ09SUklET1IsIFtFWElUX0VMRVZBVE9SLCBNRURJQ0FMLCBUUl9DT1JSSURPUl0pO1xyXG5hZGRMb2NhdGlvbihUUl9DT1JSSURPUiwgW01SX0NPUlJJRE9SXSk7XHJcbmFkZExvY2F0aW9uKE1SX0NPUlJJRE9SLCBbTUVESUNBTCwgUVVBUlRFUlMyLCBCUl9DT1JSSURPUl0pO1xyXG5hZGRMb2NhdGlvbihCUl9DT1JSSURPUiwgW1FVQVJURVJTMV0pO1xyXG5cclxuLy8gYWdlbnRzXHJcbnZhciBhbGllbiA9IGFkZEFnZW50KFwiQWxpZW5cIik7XHJcblxyXG4vLyBpdGVtc1xyXG52YXIgY3Jld0NhcmQxID0gYWRkSXRlbShcIkNyZXcgY2FyZDFcIik7XHJcbnZhciBjcmV3Q2FyZDIgPSBhZGRJdGVtKFwiQ3JldyBjYXJkMlwiKTtcclxuc2V0SXRlbVZhcmlhYmxlKGNyZXdDYXJkMSwgXCJjdXJyZW50TG9jYXRpb25cIiwgTEFCKTtcclxuc2V0SXRlbVZhcmlhYmxlKGNyZXdDYXJkMiwgXCJjdXJyZW50TG9jYXRpb25cIiwgTUVESUNBTCk7XHJcblxyXG4vLyB2YXJpYWJsZXNcclxuLy9hbGllblxyXG5zZXRBZ2VudFZhcmlhYmxlKGFsaWVuLCBcImN1cnJlbnRMb2NhdGlvblwiLCBDT0NLUElUKTtcclxuLy9wbGF5ZXJcclxudmFyIHBsYXllckxvY2F0aW9uID0gc2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiLCBTVEFSVCk7XHJcbnZhciBjcmV3Q2FyZHNDb2xsZWN0ZWQgPSBzZXRWYXJpYWJsZShcImNyZXdDYXJkc0NvbGxlY3RlZFwiLCAwKTtcclxuXHJcbi8vIDIuIERlZmluZSBCVHNcclxuLy8gY3JlYXRlIGdyb3VuZCBhY3Rpb25zXHJcbmxldCBzZXRSYW5kTnVtYmVyID0gYWN0aW9uKFxyXG4gICAgKCkgPT4gdHJ1ZSxcclxuICAgICgpID0+IHNldFZhcmlhYmxlKFwicmFuZE51bWJlclwiLCBnZXRSYW5kTnVtYmVyKDEsIDE4KSksXHJcbiAgICB7fSwgMFxyXG4pO1xyXG5sZXQgY2hvb3NlU1RBUlQgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDEsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgU1RBUlQpLCB7fSwgMCk7XHJcbmxldCBjaG9vc2VCQ19DT1JSSURPUiA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMiwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBCQ19DT1JSSURPUiksIHt9LCAwKTtcclxubGV0IGNob29zZUJMX0NPUlJJRE9SID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAzLCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIEJMX0NPUlJJRE9SKSwge30sIDApO1xyXG5sZXQgY2hvb3NlQlJfQ09SUklET1IgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDQsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgQlJfQ09SUklET1IpLCB7fSwgMCk7XHJcbmxldCBjaG9vc2VNTF9DT1JSSURPUiA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gNSwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBNTF9DT1JSSURPUiksIHt9LCAwKTtcclxubGV0IGNob29zZVRMX0NPUlJJRE9SID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSA2LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIFRMX0NPUlJJRE9SKSwge30sIDApO1xyXG5sZXQgY2hvb3NlVENfQ09SUklET1IgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDcsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgVENfQ09SUklET1IpLCB7fSwgMCk7XHJcbmxldCBjaG9vc2VUUl9DT1JSSURPUiA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gOCwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBUUl9DT1JSSURPUiksIHt9LCAwKTtcclxubGV0IGNob29zZU1SX0NPUlJJRE9SID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSA5LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIE1SX0NPUlJJRE9SKSwge30sIDApO1xyXG5sZXQgY2hvb3NlTEFCID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxMCwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBMQUIpLCB7fSwgMCk7XHJcbmxldCBjaG9vc2VTVE9SQUdFID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxMSwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBTVE9SQUdFKSwge30sIDApO1xyXG5sZXQgY2hvb3NlTUVESUNBTCA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMTIsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgTUVESUNBTCksIHt9LCAwKTtcclxubGV0IGNob29zZVFVQVJURVJTMSA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMTMsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgUVVBUlRFUlMxKSwge30sIDApO1xyXG5sZXQgY2hvb3NlUVVBUlRFUlMyID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxNCwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBRVUFSVEVSUzIpLCB7fSwgMCk7XHJcbmxldCBjaG9vc2VFWElUX0VMRVZBVE9SID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxNSwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBFWElUX0VMRVZBVE9SKSwge30sIDApO1xyXG5sZXQgY2hvb3NlRU5HSU5FUyA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMTYsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgRU5HSU5FUyksIHt9LCAwKTtcclxubGV0IGNob29zZUNPQ0tQSVQgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDE3LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIENPQ0tQSVQpLCB7fSwgMCk7XHJcbmxldCBjaG9vc2VDT01NUyA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMTgsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgQ09NTVMpLCB7fSwgMCk7XHJcblxyXG5sZXQgYXREZXN0aW5hdGlvbjogUHJlY29uZGl0aW9uID0gKHBhcmFtcykgPT4gZ2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiKSA9PSBnZXRBZ2VudFZhcmlhYmxlKHBhcmFtcy5hZ2VudCwgXCJjdXJyZW50TG9jYXRpb25cIik7XHJcbmxldCBzZXREZXN0aW5hdGlvblByZWNvbmQ6IFByZWNvbmRpdGlvbiA9IChwYXJhbXMpID0+IGlzVmFyaWFibGVOb3RTZXQoXCJkZXN0aW5hdGlvblwiKSB8fCBhdERlc3RpbmF0aW9uKHBhcmFtcyk7XHJcblxyXG4vLyBjcmVhdGUgYmVoYXZpb3IgdHJlZXNcclxubGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlcXVlbmNlKFtcclxuICAgIHNldFJhbmROdW1iZXIsXHJcbiAgICBzZWxlY3RvcihbXHJcbiAgICAgICAgY2hvb3NlU1RBUlQsXHJcbiAgICAgICAgY2hvb3NlQkNfQ09SUklET1IsXHJcbiAgICAgICAgY2hvb3NlQkxfQ09SUklET1IsXHJcbiAgICAgICAgY2hvb3NlQlJfQ09SUklET1IsXHJcbiAgICAgICAgY2hvb3NlTUxfQ09SUklET1IsXHJcbiAgICAgICAgY2hvb3NlVExfQ09SUklET1IsXHJcbiAgICAgICAgY2hvb3NlVENfQ09SUklET1IsXHJcbiAgICAgICAgY2hvb3NlVFJfQ09SUklET1IsXHJcbiAgICAgICAgY2hvb3NlTVJfQ09SUklET1IsXHJcbiAgICAgICAgY2hvb3NlTEFCLFxyXG4gICAgICAgIGNob29zZVNUT1JBR0UsXHJcbiAgICAgICAgY2hvb3NlTUVESUNBTCxcclxuICAgICAgICBjaG9vc2VRVUFSVEVSUzEsXHJcbiAgICAgICAgY2hvb3NlUVVBUlRFUlMyLFxyXG4gICAgICAgIGNob29zZUVYSVRfRUxFVkFUT1IsXHJcbiAgICAgICAgY2hvb3NlRU5HSU5FUyxcclxuICAgICAgICBjaG9vc2VDT0NLUElULFxyXG4gICAgICAgIGNob29zZUNPTU1TXHJcbiAgICBdKVxyXG5dKTtcclxuXHJcbmxldCBnb3RvTmV4dExvY2F0aW9uID0gYWN0aW9uKFxyXG4gICAgKCkgPT4gdHJ1ZSxcclxuICAgICgpID0+IHtcclxuICAgICAgICBzZXRBZ2VudFZhcmlhYmxlKGFsaWVuLCBcImN1cnJlbnRMb2NhdGlvblwiLCBnZXROZXh0TG9jYXRpb24oZ2V0QWdlbnRWYXJpYWJsZShhbGllbiwgXCJjdXJyZW50TG9jYXRpb25cIiksIGdldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIikpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFsaWVuIGlzIGF0OiBcIiArIGdldEFnZW50VmFyaWFibGUoYWxpZW4sIFwiY3VycmVudExvY2F0aW9uXCIpKVxyXG4gICAgfSxcclxuICAgIHt9LCAwXHJcbik7XHJcblxyXG5sZXQgZWF0UGxheWVyID0gYWN0aW9uKCgpID0+IGdldEFnZW50VmFyaWFibGUoYWxpZW4sIFwiY3VycmVudExvY2F0aW9uXCIpID09IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSxcclxuICAgICgpID0+IHtcclxuICAgICAgICBzZXRWYXJpYWJsZShcImVuZEdhbWVcIiwgXCJsb3NlXCIpO1xyXG4gICAgICAgIHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBcIk5BXCIpO1xyXG4gICAgfSwge30sIDBcclxuKTtcclxuXHJcbi8qbGV0IHNlYXJjaCA9IHNlbGVjdG9yKFtcclxuICAgIGVhdFBsYXllcixcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICBzZWxlY3RvcihbXHJcbiAgICAgICAgICAgIGd1YXJkKHNldERlc3RpbmF0aW9uUHJlY29uZCwge30sIHNldE5leHREZXN0aW5hdGlvbiksXHJcbiAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIH0sIHt9LCAwKVxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIGdvdG9OZXh0TG9jYXRpb24sXHJcbiAgICAgICAgZWF0UGxheWVyXHJcbiAgICBdKVxyXG5dKTsqL1xyXG5cclxubGV0IHNlYXJjaCA9IHNlcXVlbmNlKFtcclxuICAgICAgICBzZWxlY3RvcihbXHJcbiAgICAgICAgICAgIGd1YXJkKHNldERlc3RpbmF0aW9uUHJlY29uZCwge30sIHNldE5leHREZXN0aW5hdGlvbiksXHJcbiAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIH0sIHt9LCAwKVxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIGdvdG9OZXh0TG9jYXRpb24sXHJcbiAgICBdKTtcclxuXHJcbmxldCBhbGllbkJUID0gc2VsZWN0b3IoW1xyXG4gICAgZWF0UGxheWVyLFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgIHNlYXJjaCwgZWF0UGxheWVyXHJcbiAgICBdKVxyXG5dKTtcclxuXHJcbmF0dGFjaFRyZWVUb0FnZW50KGFsaWVuLCBhbGllbkJUKTtcclxuXHJcbi8qdmFyIGJsYWNrYm9hcmQgPSB7fTtcclxuY29uc29sZS5sb2coXCJEZXN0aW5hdGlvbjogXCIgKyBnZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIpKTtcclxuY29uc29sZS5sb2coXCJDdXJyZW50IGxvY2F0aW9uOiBcIiArIGdldEFnZW50VmFyaWFibGUoYWxpZW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuZXhlY3V0ZShzZWFyY2gsIGFsaWVuLCBibGFja2JvYXJkKTtcclxuY29uc29sZS5sb2coXCJEZXN0aW5hdGlvbjogXCIgKyBnZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIpKTtcclxuY29uc29sZS5sb2coXCJDdXJyZW50IGxvY2F0aW9uOiBcIiArIGdldEFnZW50VmFyaWFibGUoYWxpZW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuZXhlY3V0ZShzZWFyY2gsIGFsaWVuLCBibGFja2JvYXJkKTtcclxuY29uc29sZS5sb2coXCJEZXN0aW5hdGlvbjogXCIgKyBnZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIpKTtcclxuY29uc29sZS5sb2coXCJDdXJyZW50IGxvY2F0aW9uOiBcIiArIGdldEFnZW50VmFyaWFibGUoYWxpZW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuZXhlY3V0ZShzZWFyY2gsIGFsaWVuLCBibGFja2JvYXJkKTtcclxuY29uc29sZS5sb2coXCJEZXN0aW5hdGlvbjogXCIgKyBnZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIpKTtcclxuY29uc29sZS5sb2coXCJDdXJyZW50IGxvY2F0aW9uOiBcIiArIGdldEFnZW50VmFyaWFibGUoYWxpZW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuZXhlY3V0ZShzZWFyY2gsIGFsaWVuLCBibGFja2JvYXJkKTsqL1xyXG5cclxuLy9hdHRhY2ggYmVoYXZpb3VyIHRyZWVzIHRvIGFnZW50c1xyXG5cclxuXHJcbi8vIDMuIENvbnN0cnVjdCBzdG9yeVxyXG4vLyBjcmVhdGUgdXNlciBhY3Rpb25zXHJcblxyXG52YXIgc3RhcnRTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IFNUQVJULCB7fSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBkb2NraW5nIHN0YXRpb24uXCIpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiR28gZm9yd2FyZCB0byBlbnRlciB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJDX0NPUlJJRE9SKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxyXG4gICAgICAgIF1cclxuICAgICkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHN0YXJ0U3RhdGVCVCk7XHJcbnZhciBiY1N0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gQkNfQ09SUklET1IsIHt9LFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGNvcnJpZG9yLlwiKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIkhlYWQgd2VzdCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJMX0NPUlJJRE9SKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJFbnRlciB0aGUgbGFiXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBMQUIpKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIkhlYWQgZWFzdCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJSX0NPUlJJRE9SKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJHbyBiYWNrIHRvIHRoZSBzdGFydFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgU1RBUlQpKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXHJcbiAgICAgICAgXVxyXG4gICAgKSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoYmNTdGF0ZUJUKTtcclxudmFyIGJyU3RhdGVCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBCUl9DT1JSSURPUiwge30sXHJcbiAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGZvcndhcmQgaW4gdGhlIGNvcnJpZG9yLlwiKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIkVudGVyIHRoZSBzdGFmZiBxdWFydGVyc1wiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgUVVBUlRFUlMxKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJNb3ZlIG5vcnRoIGluIHRoZSBjb3JyaWRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTVJfQ09SUklET1IpKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIkhlYWQgd2VzdCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJDX0NPUlJJRE9SKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxyXG4gICAgICAgIF1cclxuICAgICkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGJyU3RhdGVCVCk7XHJcbnZhciBxdWFydGVyczFCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBRVUFSVEVSUzEsIHt9LFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHN0YWZmIHF1YXJ0ZXJzLlwiKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIkV4aXQgdGhlIHN0YWZmIHF1YXJ0ZXJzXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCUl9DT1JSSURPUikpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShxdWFydGVyczFCVCk7XHJcbnZhciBtclN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTVJfQ09SUklET1IsIHt9LFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGluIHRoZSBjb3JyaWRvci5cIiksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJFbnRlciB0aGUgY2FwdGFpbidzIHF1YXJ0ZXJzIG9uIHRoZSBlYXN0XCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBRVUFSVEVSUzIpKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIkVudGVyIHRoZSBtZWRpY2FsIHJvb20gb24gdGhlIHdlc3RcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1FRElDQUwpKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIk1vdmUgbm9ydGggaW4gdGhlIGNvcnJpZG9yXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUUl9DT1JSSURPUikpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiTW92ZSBzb3V0aCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJSX0NPUlJJRE9SKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxyXG4gICAgICAgIF1cclxuICAgICkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKG1yU3RhdGVCVCk7XHJcbnZhciBxdWFydGVyczJCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBRVUFSVEVSUzIsIHt9LFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGNhcHRhaW4ncyBxdWFydGVycy5cIiksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJFeGl0IHRoZSBjYXB0YWluJ3MgcXVhcnRlcnNcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1SX0NPUlJJRE9SKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxyXG4gICAgICAgIF1cclxuICAgICkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHF1YXJ0ZXJzMkJUKTtcclxudmFyIG1lZGljYWxCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBNRURJQ0FMLCB7fSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBtZWRpY2FsIHJvb20uXCIpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiRXhpdCB0byB0aGUgbm9ydGhcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRDX0NPUlJJRE9SKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJFeGl0IHRvIHRoZSBlYXN0XCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNUl9DT1JSSURPUikpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShtZWRpY2FsQlQpO1xyXG52YXIgbGFiQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTEFCLCB7fSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBsYWIuXCIpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiRXhpdCB0aGUgbGFiXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCQ19DT1JSSURPUikpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShsYWJCVCk7XHJcbnZhciB0clN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gVFJfQ09SUklET1IsIHt9LFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGluIHRoZSBjb3JyaWRvci5cIiksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJNb3ZlIHRvIHRoZSB3ZXN0XCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUQ19DT1JSSURPUikpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgc291dGhcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1SX0NPUlJJRE9SKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxyXG4gICAgICAgIF1cclxuICAgICkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHRyU3RhdGVCVCk7XHJcbnZhciB0Y1N0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gVENfQ09SUklET1IsIHt9LFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGluIHRoZSBjb3JyaWRvci5cIiksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJNb3ZlIHRvIHRoZSB3ZXN0XCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUTF9DT1JSSURPUikpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiRW50ZXIgdGhlIG1lZGljYWwgcm9vbVwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUVESUNBTCkpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiTW92ZSB0b3dhcmRzIHRoZSBlbGV2YXRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRVhJVF9FTEVWQVRPUikpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZSh0Y1N0YXRlQlQpO1xyXG52YXIgZWxldmF0b3JCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBFWElUX0VMRVZBVE9SLCB7fSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IHJlYWNoIHRoZSBleGl0IGVsZXZhdG9yLlwiKSxcclxuICAgICAgICAgICAgc2VsZWN0b3IoW1xyXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoY3Jld0NhcmRzQ29sbGVjdGVkKSA+PSAyLCB7fSxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBjYW4gbm93IGFjdGl2YXRlIHRoZSBleGl0IGFuZCBmbGVlIVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckFjdGlvbihcIkFjdGl2YXRlIGFuZCBnZXQgb3V0IVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcImVuZEdhbWVcIiwgXCJ3aW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgXCJOQVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIDIgY3JldyBjYXJkcyB0byBhY3RpdmF0ZSB0aGUgZXhpdCBlbGV2YXRvciBzeXN0ZW0uXCIpXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiTW92ZSBiYWNrIGluIHRoZSBjb3JyaWRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVENfQ09SUklET1IpKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXHJcbiAgICAgICAgXVxyXG4gICAgKSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoZWxldmF0b3JCVCk7XHJcbnZhciB0bFN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gVExfQ09SUklET1IsIHt9LFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGluIHRoZSBjb3JyaWRvci5cIiksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJFbnRlciB0aGUgZW5naW5lcyByb29tIHRvIHRoZSBub3J0aFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRU5HSU5FUykpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiRW50ZXIgdGhlIGNvbW11bmljYXRpb25zIHJvb20gdG8gdGhlIGVhc3RcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIENPTU1TKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJNb3ZlIHRvIHRoZSBlYXN0IGluIHRoZSBjb3JyaWRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVENfQ09SUklET1IpKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIk1vdmUgdG8gdGhlIHNvdXRoXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNTF9DT1JSSURPUikpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZSh0bFN0YXRlQlQpO1xyXG52YXIgYmxTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEJMX0NPUlJJRE9SLCB7fSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgZm9yd2FyZCBpbiB0aGUgY29ycmlkb3IuXCIpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgbm9ydGggaW4gdGhlIGNvcnJpZG9yXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNTF9DT1JSSURPUikpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgZWFzdCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJDX0NPUlJJRE9SKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxyXG4gICAgICAgIF1cclxuICAgICkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGJsU3RhdGVCVCk7XHJcbnZhciBtbFN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTUxfQ09SUklET1IsIHt9LFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGluIHRoZSBjb3JyaWRvci5cIiksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJFbnRlciB0aGUgc3RvcmFnZSByb29tXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBTVE9SQUdFKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJNb3ZlIHRvIHRoZSBub3J0aCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRMX0NPUlJJRE9SKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJNb3ZlIHRvIHRoZSBzb3V0aFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkxfQ09SUklET1IpKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXHJcbiAgICAgICAgXVxyXG4gICAgKSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUobWxTdGF0ZUJUKTtcclxudmFyIHN0b3JhZ2VCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBTVE9SQUdFLCB7fSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBzdG9yYWdlLlwiKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIkV4aXQgdGhlIHN0b3JhZ2Ugcm9vbVwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUxfQ09SUklET1IpKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXHJcbiAgICAgICAgXVxyXG4gICAgKSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoc3RvcmFnZUJUKTtcclxudmFyIGNvbW1zQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gQ09NTVMsIHt9LFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGNvbW11bmljYXRpb25zIHJvb20uXCIpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiRW50ZXIgdGhlIGNvY2twaXRcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIENPQ0tQSVQpKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIkV4aXQgdGhlIGNvbW11bmljYXRpb25zIHJvb20gaW50byB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRMX0NPUlJJRE9SKSksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxyXG4gICAgICAgIF1cclxuICAgICkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGNvbW1zQlQpO1xyXG52YXIgY29ja3BpdEJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IENPQ0tQSVQsIHt9LFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGNvY2twaXQuXCIpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiRW50ZXIgdGhlIGVuZ2luZXMgcm9vbSB0byB0aGUgZWFzdFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRU5HSU5FUykpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiRW50ZXIgdGhlIGNvbW11bmljYXRpb25zIHJvb20gdG8gdGhlIHNvdXRoXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBDT01NUykpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShjb2NrcGl0QlQpO1xyXG52YXIgZW5naW5lc0JUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEVOR0lORVMsIHt9LFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGVuZ2luZXMgcm9vbS5cIiksXHJcbiAgICAgICAgICAgIHVzZXJBY3Rpb24oXCJFbnRlciB0aGUgY29ja3BpdCB0byB0aGUgZWFzdFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQ09DS1BJVCkpLFxyXG4gICAgICAgICAgICB1c2VyQWN0aW9uKFwiRW50ZXIgdGhlIGNvcnJpZG9yIHRvIHRoZSBzb3V0aFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVExfQ09SUklET1IpKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXHJcbiAgICAgICAgXVxyXG4gICAgKSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoZW5naW5lc0JUKTtcclxuXHJcbnZhciBjcmV3Q2FyZDFCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBnZXRJdGVtVmFyaWFibGUoY3Jld0NhcmQxLCBcImN1cnJlbnRMb2NhdGlvblwiKSwge30sXHJcbiAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBub3RpY2UgYSBjcmV3IGNhcmQgbHlpbmcgYXJvdW5kLlwiKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIlBpY2sgdXAgdGhlIGNyZXcgY2FyZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBpY2tlZHVwXCIpO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJZb3UgcGljayB1cCB0aGUgY3JldyBjYXJkLlwiKTtcclxuICAgICAgICAgICAgICAgIHNldEl0ZW1WYXJpYWJsZShjcmV3Q2FyZDEsIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoY3Jld0NhcmRzQ29sbGVjdGVkLCBnZXRWYXJpYWJsZShjcmV3Q2FyZHNDb2xsZWN0ZWQpICsgMSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXVxyXG4gICAgKSk7XHJcbnZhciBjcmV3Q2FyZDJCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBnZXRJdGVtVmFyaWFibGUoY3Jld0NhcmQyLCBcImN1cnJlbnRMb2NhdGlvblwiKSwge30sXHJcbiAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBub3RpY2UgYSBjcmV3IGNhcmQgbHlpbmcgYXJvdW5kLlwiKSxcclxuICAgICAgICAgICAgdXNlckFjdGlvbihcIlBpY2sgdXAgdGhlIGNyZXcgY2FyZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBpY2tlZHVwXCIpO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJZb3UgcGljayB1cCB0aGUgY3JldyBjYXJkLlwiKTtcclxuICAgICAgICAgICAgICAgIHNldEl0ZW1WYXJpYWJsZShjcmV3Q2FyZDIsIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoY3Jld0NhcmRzQ29sbGVjdGVkLCBnZXRWYXJpYWJsZShjcmV3Q2FyZHNDb2xsZWN0ZWQpICsgMSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXVxyXG4gICAgKSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoY3Jld0NhcmQxQlQpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGNyZXdDYXJkMkJUKTtcclxuXHJcbnZhciBhbGllbk5lYXJieSA9IGd1YXJkKCgpID0+IGFyZUFkamFjZW50KGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSwgZ2V0QWdlbnRWYXJpYWJsZShhbGllbiwgXCJjdXJyZW50TG9jYXRpb25cIikpLCB7fSxcclxuICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBoZWFyIGEgdGh1bXBpbmcgc291bmQuIFRoZSBhbGllbiBpcyBuZWFyYnkuXCIpKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShhbGllbk5lYXJieSk7XHJcblxyXG52YXIgZ2FtZU92ZXIgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gXCJOQVwiLCB7fSxcclxuICAgIHNlbGVjdG9yKFtcclxuICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJlbmRHYW1lXCIpID09IFwid2luXCIsIHt9LFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGhhdmUgbWFuYWdlZCB0byBlc2NhcGUhXCIpKSxcclxuICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJlbmRHYW1lXCIpID09IFwibG9zZVwiLCB7fSxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBjcmVhdHVyZSBncmFicyB5b3UgYmVmb3JlIHlvdSBjYW4gcmVhY3QhIFlvdSBzdHJ1Z2dsZSBmb3IgYSBiaXQgYmVmb3JlIHJlYWxpc2luZyBpdCdzIGFsbCBvdmVyLi5cIikpXHJcbiAgICAgICAgXVxyXG4gICAgKSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoZ2FtZU92ZXIpO1xyXG5cclxuXHJcbi8vIGNyZWF0ZSBzY2VuZXNcclxuXHJcbi8vIG1hcCBzY2VuZXMgdG8gc3RhdGUgKGNvdWxkIHVzZSBCVD8pXHJcblxyXG4vLzQuIFJ1biB0aGUgd29ybGRcclxuaW5pdGlhbGl6ZSgpO1xyXG52YXIgdXNlckludGVyYWN0aW9uT2JqZWN0ID0gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCk7XHJcblxyXG4vL1JlbmRlcmluZy0tLS0tXHJcbnZhciBkaXNwbGF5UGFuZWwgPSB7eDogNTAwLCB5OiAwfTtcclxudmFyIHRleHRQYW5lbCA9IHt4OiA1MDAsIHk6IDM1MH07XHJcbnZhciBhY3Rpb25zUGFuZWwgPSB7eDogNTIwLCB5OiA0MjV9O1xyXG5cclxudmFyIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXknKTtcclxudmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbnZhciBzcGFjZXNoaXBJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5zcGFjZXNoaXBJbWFnZS5vbmxvYWQgPSByZW5kZXI7XHJcbnZhciBwbGF5ZXJJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG52YXIgYWxpZW5JbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKHNwYWNlc2hpcEltYWdlLCBkaXNwbGF5UGFuZWwueCwgZGlzcGxheVBhbmVsLnksIDUwMCwgMzAwKTtcclxuICAgIGRpc3BsYXlQbGF5ZXIoKTtcclxuICAgIGRpc3BsYXlBbGllbigpO1xyXG4gICAgZGlzcGxheVRleHRBbmRBY3Rpb25zKCk7XHJcbn1cclxuXHJcbnZhciBtYXBQb3NpdGlvbnMgPSB7XHJcbiAgICBcIlNUQVJUXCI6IHt4OiAyMzAsIHk6IDIzNX0sXHJcbiAgICBcIkJDX0NPUlJJRE9SXCI6IHt4OiAyNDAsIHk6IDIxMH0sXHJcbiAgICBcIkJSX0NPUlJJRE9SXCI6IHt4OiAzMDAsIHk6IDE5MH0sXHJcbiAgICBcIk1SX0NPUlJJRE9SXCI6IHt4OiAzMDUsIHk6IDE1MH0sXHJcbiAgICBcIlFVQVJURVJTMlwiOiB7eDogMzQwLCB5OiAxNTV9LFxyXG4gICAgXCJRVUFSVEVSUzFcIjoge3g6IDM0MCwgeTogMTkwfSxcclxuICAgIFwiVFJfQ09SUklET1JcIjoge3g6IDMwMCwgeTogMTAwfSxcclxuICAgIFwiVENfQ09SUklET1JcIjoge3g6IDIzMCwgeTogMTAwfSxcclxuICAgIFwiVExfQ09SUklET1JcIjoge3g6IDE3MCwgeTogMTAwfSxcclxuICAgIFwiRVhJVF9FTEVWQVRPUlwiOiB7eDogMjMwLCB5OiA2MH0sXHJcbiAgICBcIkxBQlwiOiB7eDogMjQwLCB5OiAxNzB9LFxyXG4gICAgXCJNTF9DT1JSSURPUlwiOiB7eDogMTYwLCB5OiAxNTB9LFxyXG4gICAgXCJCTF9DT1JSSURPUlwiOiB7eDogMTYwLCB5OiAyMDB9LFxyXG4gICAgXCJFTkdJTkVTXCI6IHt4OiAxNzAsIHk6IDYwfSxcclxuICAgIFwiQ09DS1BJVFwiOiB7eDogMTIwLCB5OiA2MH0sXHJcbiAgICBcIkNPTU1TXCI6IHt4OiAxMjAsIHk6IDEwMH0sXHJcbiAgICBcIk1FRElDQUxcIjoge3g6IDI1MCwgeTogMTMwfSxcclxuICAgIFwiU1RPUkFHRVwiOiB7eDogMjAwLCB5OiAxNTB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5UGxheWVyKCkge1xyXG4gICAgdmFyIGN1cnJMb2NhdGlvbiA9IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKTtcclxuICAgIGlmICghaXNVbmRlZmluZWQobWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0pKVxyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHBsYXllckltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgMTYsIDE2KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheUFsaWVuKCkge1xyXG4gICAgdmFyIGN1cnJMb2NhdGlvbiA9IGdldEFnZW50VmFyaWFibGUoYWxpZW4sIFwiY3VycmVudExvY2F0aW9uXCIpO1xyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UoYWxpZW5JbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDI0LCAyNCk7XHJcbn1cclxuXHJcbnNwYWNlc2hpcEltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL2lzb2xhdGlvbl9tYXAucG5nXCI7XHJcbnBsYXllckltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL3BsYXllcjIucG5nXCI7XHJcbmFsaWVuSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMveGVub21vcnBoLnBuZ1wiO1xyXG5cclxudmFyIGN1cnJlbnRTZWxlY3Rpb247XHJcbnZhciB5T2Zmc2V0ID0gYWN0aW9uc1BhbmVsLnkgKyAyNTtcclxudmFyIHlPZmZzZXRJbmNyZW1lbnQgPSA1MDtcclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlUZXh0QW5kQWN0aW9ucygpIHtcclxuICAgIGNvbnRleHQuY2xlYXJSZWN0KHRleHRQYW5lbC54LCB0ZXh0UGFuZWwueSwgNTAwLCAxMDAwKTtcclxuICAgIHlPZmZzZXQgPSBhY3Rpb25zUGFuZWwueSArIDI1O1xyXG5cclxuICAgIGNvbnRleHQuZm9udCA9IFwiMTVwdCBDYWxpYnJpXCI7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFjdGlvbnMgZWZmZWN0IHRleHQ6IFwiICsgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0KTtcclxuICAgIHZhciB0ZXh0VG9EaXNwbGF5ID0gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0Lmxlbmd0aCAhPSAwID8gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0IDogdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQ7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHRleHRUb0Rpc3BsYXksIHRleHRQYW5lbC54LCB0ZXh0UGFuZWwueSArIDIwKTtcclxuXHJcbiAgICBjb250ZXh0LmZvbnQgPSBcIjE1cHQgQ2FsaWJyaVwiO1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHVzZXJBY3Rpb25UZXh0ID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dFtpXTtcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHVzZXJBY3Rpb25UZXh0LCBhY3Rpb25zUGFuZWwueCArIDIwLCB5T2Zmc2V0KTtcclxuICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24gPSBpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB5T2Zmc2V0ICs9IHlPZmZzZXRJbmNyZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUFycm93KCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNyZXcgY2FyZHM6IFwiICsgZ2V0VmFyaWFibGUoY3Jld0NhcmRzQ29sbGVjdGVkKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlBcnJvdygpIHtcclxuICAgIGlmKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApe1xyXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KGFjdGlvbnNQYW5lbC54LCBhY3Rpb25zUGFuZWwueSwgMjAsIDEwMDApO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoXCI+IFwiLCA1MjAsIGFjdGlvbnNQYW5lbC55ICsgMjUgKyAoY3VycmVudFNlbGVjdGlvbiAqIHlPZmZzZXRJbmNyZW1lbnQpKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9Vc2VyIGlucHV0XHJcbmZ1bmN0aW9uIGtleVByZXNzKGUpIHtcclxuICAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRBY3Rpb24gPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0W2N1cnJlbnRTZWxlY3Rpb25dO1xyXG4gICAgICAgIGV4ZWN1dGVVc2VyQWN0aW9uKHNlbGVjdGVkQWN0aW9uKTtcclxuICAgICAgICB3b3JsZFRpY2soKTtcclxuICAgICAgICByZW5kZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24ga2V5RG93bihlKSB7XHJcbiAgICBpZiAoZS5rZXlDb2RlID09IDQwKSB7Ly9kb3duXHJcbiAgICAgICAgaWYgKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbisrO1xyXG4gICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uID0gY3VycmVudFNlbGVjdGlvbiAlIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICBkaXNwbGF5QXJyb3coKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzOCkgey8vdXBcclxuICAgICAgICBpZiAodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uLS07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50U2VsZWN0aW9uIDwgMClcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24gPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGRpc3BsYXlBcnJvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGtleVByZXNzLCBmYWxzZSk7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleURvd24sIGZhbHNlKTsiLCJpbXBvcnQgUXVldWUgZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWVcIjtcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvdXRpbFwiO1xyXG5cclxuZXhwb3J0IGVudW0gU3RhdHVzIHtcclxuICAgIFJVTk5JTkcsXHJcbiAgICBTVUNDRVNTLFxyXG4gICAgRkFJTFVSRVxyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQ6IG51bWJlciwgYmxhY2tib2FyZDogYW55LCBzdGF0dXM6IFN0YXR1cykge1xyXG4gICAgZGVsZXRlIGJsYWNrYm9hcmRbaWRdO1xyXG4gICAgcmV0dXJuIHN0YXR1cztcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgRWZmZWN0ID0gKHBhcmFtczogYW55KSA9PiB2b2lkXHJcbmV4cG9ydCB0eXBlIFByZWNvbmRpdGlvbiA9IChwYXJhbXM6IGFueSkgPT4gYm9vbGVhblxyXG5leHBvcnQgdHlwZSBUaWNrID0gKGFnZW50OiBzdHJpbmcsIGJsYWNrYm9hcmQ6IGFueSkgPT4gU3RhdHVzXHJcbmV4cG9ydCB0eXBlIEFjdGlvblRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCBwYXJhbWV0ZXJzPzogYW55LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBUaGUgZ3VhcmQgdGljayBpcyB0byBhZGQgYSBwcmVjb25kaXRpb24gdG8gdGhlIGNvbXBvc2l0ZSB0aWNrc1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgR3VhcmRUaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBwYXJhbWV0ZXJzOiBhbnksIGFzdFRpY2s6IFRpY2ssIG5lZ2F0ZT86IGJvb2xlYW4pID0+IFRpY2tcclxuLyoqXHJcbiAqIFNlcXVlbmNlL1NlbGVjdG9yXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBDb21wb3NpdGVUaWNrID0gKGFzdFRpY2tzOiBUaWNrW10pID0+IFRpY2tcclxuXHJcbmZ1bmN0aW9uIGdldEFjdGlvblRpY2soaWQ6IG51bWJlcik6IEFjdGlvblRpY2sge1xyXG4gICAgcmV0dXJuIChwcmVjb25kaXRpb24sIGVmZmVjdCwgcGFyYW1ldGVycyA9IHt9LCB0aWNrc1JlcXVpcmVkID0gMSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoYWdlbnQsIGJsYWNrYm9hcmQpID0+IHtcclxuICAgICAgICAgICAgcGFyYW1ldGVycy5hZ2VudCA9IGFnZW50O1xyXG4gICAgICAgICAgICBwYXJhbWV0ZXJzLmJsYWNrYm9hcmQgPSBibGFja2JvYXJkO1xyXG4gICAgICAgICAgICBpZiAocHJlY29uZGl0aW9uKHBhcmFtZXRlcnMpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS50aWNrc0RvbmUgPSB0aWNrc1JlcXVpcmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChibGFja2JvYXJkW2lkXS50aWNrc0RvbmUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lLS07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3QocGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5GQUlMVVJFO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRHdWFyZFRpY2soKTogR3VhcmRUaWNrIHtcclxuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBwYXJhbWV0ZXJzLCBhc3RUaWNrLCBuZWdhdGUgPSBmYWxzZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoYWdlbnQsIGJsYWNrYm9hcmQpID0+IHtcclxuICAgICAgICAgICAgcGFyYW1ldGVycy5hZ2VudCA9IGFnZW50O1xyXG4gICAgICAgICAgICBwYXJhbWV0ZXJzLmJsYWNrYm9hcmQgPSBibGFja2JvYXJkO1xyXG4gICAgICAgICAgICBsZXQgcHJvY2VlZCA9IG5lZ2F0ZSA/ICFwcmVjb25kaXRpb24ocGFyYW1ldGVycykgOiBwcmVjb25kaXRpb24ocGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZWVkID8gZXhlY3V0ZShhc3RUaWNrLCBhZ2VudCwgYmxhY2tib2FyZCkgOiBTdGF0dXMuRkFJTFVSRTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNlcXVlbmNlVGljayhpZDogbnVtYmVyKTogQ29tcG9zaXRlVGljayB7XHJcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChhZ2VudCwgYmxhY2tib2FyZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdLCBhZ2VudCwgYmxhY2tib2FyZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5TVUNDRVNTKVxyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNlbGVjdG9yVGljayhpZDogbnVtYmVyKTogQ29tcG9zaXRlVGljayB7XHJcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChhZ2VudCwgYmxhY2tib2FyZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdLCBhZ2VudCwgYmxhY2tib2FyZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5TVUNDRVNTKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlKGFzdFRpY2s6IFRpY2ssIGFnZW50OiBzdHJpbmcsIGJsYWNrYm9hcmQ6IGFueSk6IFN0YXR1cyB7XHJcbiAgICByZXR1cm4gYXN0VGljayhhZ2VudCwgYmxhY2tib2FyZCk7XHJcbn1cclxuXHJcbnZhciBnbG9iYWxJZENvdW50ZXIgPSAwO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjdGlvbihwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgZWZmZWN0OiBFZmZlY3QsIHBhcmFtcz86IGFueSwgdGlja3NSZXF1aXJlZD86IG51bWJlcik6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldEFjdGlvblRpY2soZ2xvYmFsSWRDb3VudGVyKyspKHByZWNvbmRpdGlvbiwgZWZmZWN0LCBwYXJhbXMsIHRpY2tzUmVxdWlyZWQpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgcGFyYW1zOiBhbnksIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIHBhcmFtcywgYXN0VGljayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZWdfZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIHBhcmFtczogYW55LCBhc3RUaWNrOiBUaWNrKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0R3VhcmRUaWNrKCkocHJlY29uZGl0aW9uLCBwYXJhbXMsIGFzdFRpY2ssIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBzdWNjZXNzIG9mIGEgY2hpbGRcclxuICogU3VjY2VlZHMgaWYgYWxsIHN1Y2NlZWQsIGVsc2UgZmFpbHNcclxuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXHJcbiAqIEByZXR1cm5zIHtUaWNrfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRTZXF1ZW5jZVRpY2soZ2xvYmFsSWRDb3VudGVyKyspKGFzdFRpY2tzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gZmFpbHVyZSBvZiBhIGNoaWxkKHRoaW5rIG9mIGl0IGFzIGlmLWVsc2UgYmxvY2tzKVxyXG4gKiBTdWNjZWVkcyBpZiBldmVuIG9uZSBzdWNjZWVkcywgZWxzZSBmYWlsc1xyXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcclxuICogQHJldHVybnMge1RpY2t9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0b3IoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldFNlbGVjdG9yVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xyXG59XHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0gQVBJIC0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuLy8wLiB1dGlsaXRpZXNcclxuLy8gbWluIGFuZCBtYXggYXJlIGluY2x1c2l2ZVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZE51bWJlcihtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuXHJcbi8vMS4gc3RvcnkgaW5zdGFuY2VcclxuXHJcbi8vMS4xIGxvY2F0aW9uc1xyXG52YXIgbG9jYXRpb25HcmFwaCA9IHt9O1xyXG5cclxuLy9hZGQgdG8gYm90aCBzaWRlc1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkTG9jYXRpb24obG9jYXRpb25OYW1lOiBzdHJpbmcsIGFkamFjZW50TG9jYXRpb25zOiBzdHJpbmdbXSkge1xyXG4gICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gW107XHJcbiAgICBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPSBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0uY29uY2F0KGFkamFjZW50TG9jYXRpb25zKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkamFjZW50TG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgbG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0gPSBbXTtcclxuXHJcbiAgICAgICAgbG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0ucHVzaChsb2NhdGlvbk5hbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXJlQWRqYWNlbnQobG9jYXRpb24xOiBzdHJpbmcsIGxvY2F0aW9uMjogc3RyaW5nKTpib29sZWFuIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQXJlIGFkamFjZW50OiBcIiArIGxvY2F0aW9uMSArIFwiLCBcIitsb2NhdGlvbjIpO1xyXG4gICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXSA9PSB1bmRlZmluZWQgfHwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjJdID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFaXRoZXIgb25lL2JvdGggbG9jYXRpb25zIHVuZGVmaW5lZFwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdW2ldID09IGxvY2F0aW9uMil7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuLy9wYXRoZmluZGluZyBwcmltaXRpdmVzXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXh0TG9jYXRpb24oc3RhcnQ6IHN0cmluZywgZGVzdGluYXRpb246IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICB2YXIgdmlzaXRlZCA9IHt9O1xyXG4gICAgdmFyIHByZXZpb3VzID0ge307XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gbG9jYXRpb25HcmFwaCkge1xyXG4gICAgICAgIHZpc2l0ZWRba2V5XSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmlzaXRlZFtzdGFydF0gPSB0cnVlO1xyXG5cclxuICAgIHZhciBteVF1ZXVlID0gbmV3IFF1ZXVlPHN0cmluZz4oKTtcclxuICAgIG15UXVldWUuZW5xdWV1ZShzdGFydCk7XHJcblxyXG4gICAgd2hpbGUgKCFteVF1ZXVlLmlzRW1wdHkoKSkge1xyXG4gICAgICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBteVF1ZXVlLmRlcXVldWUoKTtcclxuICAgICAgICBpZiAoY3VycmVudCA9PT0gZGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSBsb2NhdGlvbkdyYXBoW2N1cnJlbnRdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXZpc2l0ZWRbbmVpZ2hib3JzW2ldXSkge1xyXG4gICAgICAgICAgICAgICAgbXlRdWV1ZS5lbnF1ZXVlKG5laWdoYm9yc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB2aXNpdGVkW25laWdoYm9yc1tpXV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNbbmVpZ2hib3JzW2ldXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGN1cnJlbnQ6IHN0cmluZyA9IGRlc3RpbmF0aW9uO1xyXG4gICAgaWYgKGN1cnJlbnQgPT0gc3RhcnQpXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XHJcbiAgICB3aGlsZSAocHJldmlvdXNbY3VycmVudF0gIT0gc3RhcnQpIHtcclxuICAgICAgICBjdXJyZW50ID0gcHJldmlvdXNbY3VycmVudF07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnQ7XHJcbn1cclxuXHJcbi8vMS4yIGFnZW50c1xyXG52YXIgYWdlbnRzID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQWdlbnQoYWdlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgIGFnZW50cy5wdXNoKGFnZW50TmFtZSk7XHJcbiAgICByZXR1cm4gYWdlbnROYW1lO1xyXG59XHJcblxyXG4vLzEuMyBpdGVtc1xyXG52YXIgaXRlbXMgPSBbXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRJdGVtKGl0ZW1OYW1lOiBzdHJpbmcpIHtcclxuICAgIGl0ZW1zLnB1c2goaXRlbU5hbWUpO1xyXG4gICAgcmV0dXJuIGl0ZW1OYW1lO1xyXG59XHJcblxyXG4vLzEuNCB2YXJpYWJsZXNcclxudmFyIHZhcmlhYmxlcyA9IHt9O1xyXG52YXIgYWdlbnRWYXJpYWJsZXMgPSB7fTtcclxudmFyIGl0ZW1WYXJpYWJsZXMgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIHZhcmlhYmxlc1t2YXJOYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHZhck5hbWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkpXHJcbiAgICAgICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdID0ge307XHJcblxyXG4gICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIG5vdCBzZXQhXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiB2YXJpYWJsZXNbdmFyTmFtZV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGFnZW50IFwiICsgYWdlbnQgKyBcIiBub3Qgc2V0IVwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhcmlhYmxlTm90U2V0KHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FnZW50VmFyaWFibGVOb3RTZXQoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSB8fCBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SXRlbVZhcmlhYmxlKGl0ZW06IHN0cmluZywgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXSkpXHJcbiAgICAgICAgaXRlbVZhcmlhYmxlc1tpdGVtXSA9IHt9O1xyXG5cclxuICAgIGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV0pIHx8IGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV0pKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgaXRlbSBcIiArIGl0ZW0gKyBcIiBub3Qgc2V0IVwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdO1xyXG59XHJcblxyXG5cclxuLy8yXHJcbi8vYWdlbnQtYmVoYXZpb3IgdHJlZSBtYXBwaW5nXHJcbnZhciBhZ2VudFRyZWVzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoVHJlZVRvQWdlbnQoYWdlbnQ6IHN0cmluZywgdHJlZTogVGljaykge1xyXG4gICAgYWdlbnRUcmVlc1thZ2VudF0gPSB0cmVlO1xyXG59XHJcblxyXG4vLzMuMVxyXG4vL3VzZXIgYWN0aW9uc1xyXG4vL1RPRE8gYWRkIHZhcmlhYmxlcyB0byB1c2VyIGFjdGlvbiB0ZXh0c1xyXG52YXIgdXNlckludGVyYWN0aW9uT2JqZWN0ID0ge1xyXG4gICAgdGV4dDogXCJcIixcclxuICAgIHVzZXJBY3Rpb25zVGV4dDogW10sXHJcbiAgICBhY3Rpb25FZmZlY3RzVGV4dDogXCJcIlxyXG59XHJcbnZhciB1c2VySW50ZXJhY3Rpb25UcmVlcyA9IFtdO1xyXG52YXIgdXNlckFjdGlvbnMgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKGJsYWNrYm9hcmQpIHtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ID0gXCJcIjtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQgPSBbXTtcclxuICAgIHVzZXJBY3Rpb25zID0ge307Ly97XCJHbyB0byBsb2NhdGlvbiBYXCIgOiBlZmZlY3RcclxuICAgIC8vVE9ETyBydW4gdGhlIGRpc3BsYXkgdHJlZXNcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uVHJlZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBleGVjdXRlKHVzZXJJbnRlcmFjdGlvblRyZWVzW2ldLCBcImludGVyYWN0aW9uQWdlbnRcIiwgYmxhY2tib2FyZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIHJlcGxhY2UgdmFyaWFibGVzIGluIHRleHQgb2YgZGVzY3JpcHRpb24gZnJvbSB2YXJpYWJsZSBzZXRcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkVXNlckFjdGlvbih0ZXh0OiBzdHJpbmcsIGVmZmVjdDogKCkgPT4gYW55KSB7XHJcbiAgICAvL1RPRE8gcmVwbGFjZSB2YXJpYWJsZXMgaW4gdGV4dCBvZiB1c2VyIGFjdGlvbnMgZnJvbSB2YXJpYWJsZSBzZXQgKHRoaXMgY291bGQgYmUgZG9uZSB2aWEgdXNlciB0b28pXHJcbiAgICB1c2VyQWN0aW9uc1t0ZXh0XSA9IGVmZmVjdDtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQucHVzaCh0ZXh0KTtcclxufVxyXG5cclxuZXhwb3J0IGxldCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24gPSAodGV4dDogc3RyaW5nKSA9PlxyXG4gICAgYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRydWUsXHJcbiAgICAgICAgKCkgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgKz0gXCJcXG5cIiArIHRleHQsIHt9LCAwXHJcbiAgICApO1xyXG5leHBvcnQgbGV0IGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0ID0gKHRleHQ6IHN0cmluZykgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ICs9IFwiXFxuXCIgKyB0ZXh0O1xyXG5cclxuZXhwb3J0IGxldCB1c2VyQWN0aW9uID0gKHRleHQ6IHN0cmluZywgZWZmZWN0OiAoKSA9PiBhbnkpID0+XHJcbiAgICBhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4gdHJ1ZSxcclxuICAgICAgICAoKSA9PiBhZGRVc2VyQWN0aW9uKHRleHQsIGVmZmVjdCksIHt9LCAwXHJcbiAgICApO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGljazogVGljaykge1xyXG4gICAgdXNlckludGVyYWN0aW9uVHJlZXMucHVzaCh0aWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVVc2VyQWN0aW9uKHRleHQ6IHN0cmluZykge1xyXG4gICAgLy9leGVjdXRlIHRoZSB1c2VyIGFjdGlvblxyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ID0gXCJcIjtcclxuICAgIHZhciB1c2VyQWN0aW9uID0gdXNlckFjdGlvbnNbdGV4dF07XHJcbiAgICB1c2VyQWN0aW9uKCk7XHJcbn1cclxuXHJcbi8vNC5cclxudmFyIGJsYWNrYm9hcmQgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoYmxhY2tib2FyZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QoKSB7XHJcbiAgICByZXR1cm4gdXNlckludGVyYWN0aW9uT2JqZWN0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd29ybGRUaWNrKHVzZXJBY3Rpb25UZXh0Pzogc3RyaW5nKSB7XHJcbiAgICAvL2FsbCBhZ2VudCB0aWNrc1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdHJlZSA9IGFnZW50VHJlZXNbYWdlbnRzW2ldXTtcclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRyZWUpKSB7XHJcbiAgICAgICAgICAgIGV4ZWN1dGUodHJlZSwgYWdlbnRzW2ldLCBibGFja2JvYXJkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcyhibGFja2JvYXJkKTtcclxufSJdfQ==
