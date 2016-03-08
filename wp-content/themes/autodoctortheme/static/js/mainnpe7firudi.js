/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */"use strict";(function(global,factory){if(typeof module === "object" && typeof module.exports === "object"){ // For CommonJS and CommonJS-like environments where a proper `window`
// is present, execute the factory and get jQuery.
// For environments that do not have a `window` with a `document`
// (such as Node.js), expose a factory as module.exports.
// This accentuates the need for the creation of a real `window`.
// e.g. var jQuery = require("jquery")(window);
// See ticket #14549 for more info.
module.exports = global.document?factory(global,true):function(w){if(!w.document){throw new Error("jQuery requires a window with a document");}return factory(w);};}else {factory(global);} // Pass this if window is not defined yet
})(typeof window !== "undefined"?window:undefined,function(window,noGlobal){ // Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//
var arr=[];var _slice=arr.slice;var concat=arr.concat;var push=arr.push;var indexOf=arr.indexOf;var class2type={};var toString=class2type.toString;var hasOwn=class2type.hasOwnProperty;var support={};var  // Use the correct document accordingly with window argument (sandbox)
document=window.document,version="2.1.4", // Define a local copy of jQuery
jQuery=function jQuery(selector,context){ // The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new jQuery.fn.init(selector,context);}, // Support: Android<4.1
// Make sure we trim BOM and NBSP
rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, // Matches dashed string for camelizing
rmsPrefix=/^-ms-/,rdashAlpha=/-([\da-z])/gi, // Used by jQuery.camelCase as callback to replace()
fcamelCase=function fcamelCase(all,letter){return letter.toUpperCase();};jQuery.fn = jQuery.prototype = { // The current version of jQuery being used
jquery:version,constructor:jQuery, // Start with an empty selector
selector:"", // The default length of a jQuery object is 0
length:0,toArray:function toArray(){return _slice.call(this);}, // Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function get(num){return num != null? // Return just the one element from the set
num < 0?this[num + this.length]:this[num]: // Return all the elements in a clean array
_slice.call(this);}, // Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function pushStack(elems){ // Build a new jQuery matched element set
var ret=jQuery.merge(this.constructor(),elems); // Add the old object onto the stack (as a reference)
ret.prevObject = this;ret.context = this.context; // Return the newly-formed element set
return ret;}, // Execute a callback for every element in the matched set.
// (You can seed the arguments with an array of args, but this is
// only used internally.)
each:function each(callback,args){return jQuery.each(this,callback,args);},map:function map(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},slice:function slice(){return this.pushStack(_slice.apply(this,arguments));},first:function first(){return this.eq(0);},last:function last(){return this.eq(-1);},eq:function eq(i){var len=this.length,j=+i + (i < 0?len:0);return this.pushStack(j >= 0 && j < len?[this[j]]:[]);},end:function end(){return this.prevObject || this.constructor(null);}, // For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:push,sort:arr.sort,splice:arr.splice};jQuery.extend = jQuery.fn.extend = function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0] || {},i=1,length=arguments.length,deep=false; // Handle a deep copy situation
if(typeof target === "boolean"){deep = target; // Skip the boolean and the target
target = arguments[i] || {};i++;} // Handle case when target is a string or something (possible in deep copy)
if(typeof target !== "object" && !jQuery.isFunction(target)){target = {};} // Extend jQuery itself if only one argument is passed
if(i === length){target = this;i--;}for(;i < length;i++) { // Only deal with non-null/undefined values
if((options = arguments[i]) != null){ // Extend the base object
for(name in options) {src = target[name];copy = options[name]; // Prevent never-ending loop
if(target === copy){continue;} // Recurse if we're merging plain objects or arrays
if(deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))){if(copyIsArray){copyIsArray = false;clone = src && jQuery.isArray(src)?src:[];}else {clone = src && jQuery.isPlainObject(src)?src:{};} // Never move original objects, clone them
target[name] = jQuery.extend(deep,clone,copy); // Don't bring in undefined values
}else if(copy !== undefined){target[name] = copy;}}}} // Return the modified object
return target;};jQuery.extend({ // Unique for each copy of jQuery on the page
expando:"jQuery" + (version + Math.random()).replace(/\D/g,""), // Assume jQuery is ready without the ready module
isReady:true,error:function error(msg){throw new Error(msg);},noop:function noop(){},isFunction:function isFunction(obj){return jQuery.type(obj) === "function";},isArray:Array.isArray,isWindow:function isWindow(obj){return obj != null && obj === obj.window;},isNumeric:function isNumeric(obj){ // parseFloat NaNs numeric-cast false positives (null|true|false|"")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
// adding 1 corrects loss of precision from parseFloat (#15100)
return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;},isPlainObject:function isPlainObject(obj){ // Not plain objects:
// - Any object or value whose internal [[Class]] property is not "[object Object]"
// - DOM nodes
// - window
if(jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)){return false;}if(obj.constructor && !hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false;} // If the function hasn't returned already, we're confident that
// |obj| is a plain object, created by {} or constructed with new Object
return true;},isEmptyObject:function isEmptyObject(obj){var name;for(name in obj) {return false;}return true;},type:function type(obj){if(obj == null){return obj + "";} // Support: Android<4.0, iOS<6 (functionish RegExp)
return typeof obj === "object" || typeof obj === "function"?class2type[toString.call(obj)] || "object":typeof obj;}, // Evaluates a script in a global context
globalEval:function globalEval(code){var script,indirect=eval;code = jQuery.trim(code);if(code){ // If the code includes a valid, prologue position
// strict mode pragma, execute code by injecting a
// script tag into the document.
if(code.indexOf("use strict") === 1){script = document.createElement("script");script.text = code;document.head.appendChild(script).parentNode.removeChild(script);}else { // Otherwise, avoid the DOM node creation, insertion
// and removal by using an indirect global eval
indirect(code);}}}, // Convert dashed to camelCase; used by the css and data modules
// Support: IE9-11+
// Microsoft forgot to hump their vendor prefix (#9572)
camelCase:function camelCase(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);},nodeName:function nodeName(elem,name){return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();}, // args is for internal usage only
each:function each(obj,callback,args){var value,i=0,length=obj.length,isArray=isArraylike(obj);if(args){if(isArray){for(;i < length;i++) {value = callback.apply(obj[i],args);if(value === false){break;}}}else {for(i in obj) {value = callback.apply(obj[i],args);if(value === false){break;}}} // A special, fast, case for the most common use of each
}else {if(isArray){for(;i < length;i++) {value = callback.call(obj[i],i,obj[i]);if(value === false){break;}}}else {for(i in obj) {value = callback.call(obj[i],i,obj[i]);if(value === false){break;}}}}return obj;}, // Support: Android<4.1
trim:function trim(text){return text == null?"":(text + "").replace(rtrim,"");}, // results is for internal usage only
makeArray:function makeArray(arr,results){var ret=results || [];if(arr != null){if(isArraylike(Object(arr))){jQuery.merge(ret,typeof arr === "string"?[arr]:arr);}else {push.call(ret,arr);}}return ret;},inArray:function inArray(elem,arr,i){return arr == null?-1:indexOf.call(arr,elem,i);},merge:function merge(first,second){var len=+second.length,j=0,i=first.length;for(;j < len;j++) {first[i++] = second[j];}first.length = i;return first;},grep:function grep(elems,callback,invert){var callbackInverse,matches=[],i=0,length=elems.length,callbackExpect=!invert; // Go through the array, only saving the items
// that pass the validator function
for(;i < length;i++) {callbackInverse = !callback(elems[i],i);if(callbackInverse !== callbackExpect){matches.push(elems[i]);}}return matches;}, // arg is for internal usage only
map:function map(elems,callback,arg){var value,i=0,length=elems.length,isArray=isArraylike(elems),ret=[]; // Go through the array, translating each of the items to their new values
if(isArray){for(;i < length;i++) {value = callback(elems[i],i,arg);if(value != null){ret.push(value);}} // Go through every key on the object,
}else {for(i in elems) {value = callback(elems[i],i,arg);if(value != null){ret.push(value);}}} // Flatten any nested arrays
return concat.apply([],ret);}, // A global GUID counter for objects
guid:1, // Bind a function to a context, optionally partially applying any
// arguments.
proxy:function proxy(fn,context){var tmp,args,proxy;if(typeof context === "string"){tmp = fn[context];context = fn;fn = tmp;} // Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if(!jQuery.isFunction(fn)){return undefined;} // Simulated bind
args = _slice.call(arguments,2);proxy = function(){return fn.apply(context || this,args.concat(_slice.call(arguments)));}; // Set the guid of unique handler to the same of original handler, so it can be removed
proxy.guid = fn.guid = fn.guid || jQuery.guid++;return proxy;},now:Date.now, // jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:support}); // Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(i,name){class2type["[object " + name + "]"] = name.toLowerCase();});function isArraylike(obj){ // Support: iOS 8.2 (not reproducible in simulator)
// `in` check used to prevent JIT error (gh-2145)
// hasOwn isn't used here due to false negatives
// regarding Nodelist length in IE
var length="length" in obj && obj.length,type=jQuery.type(obj);if(type === "function" || jQuery.isWindow(obj)){return false;}if(obj.nodeType === 1 && length){return true;}return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;}var Sizzle= /*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */(function(window){var i,support,Expr,getText,isXML,tokenize,compile,select,outermostContext,sortInput,hasDuplicate, // Local document vars
setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains, // Instance-specific data
expando="sizzle" + 1 * new Date(),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),sortOrder=function sortOrder(a,b){if(a === b){hasDuplicate = true;}return 0;}, // General-purpose constants
MAX_NEGATIVE=1 << 31, // Instance methods
hasOwn=({}).hasOwnProperty,arr=[],pop=arr.pop,push_native=arr.push,push=arr.push,slice=arr.slice, // Use a stripped-down indexOf as it's faster than native
// http://jsperf.com/thor-indexof-vs-for/5
indexOf=function indexOf(list,elem){var i=0,len=list.length;for(;i < len;i++) {if(list[i] === elem){return i;}}return -1;},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", // Regular expressions
// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
whitespace="[\\x20\\t\\r\\n\\f]", // http://www.w3.org/TR/css3-syntax/#characters
characterEncoding="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", // Loosely modeled on CSS identifier characters
// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
identifier=characterEncoding.replace("w","w#"), // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
attributes="\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +  // Operator (capture 2)
"*([*^$|!~]?=)" + whitespace +  // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",pseudos=":(" + characterEncoding + ")(?:\\((" +  // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
// 1. quoted (capture 3; capture 4 or capture 5)
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +  // 2. simple (capture 6)
"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +  // 3. anything else (capture 2)
".*" + ")\\)|)", // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
rwhitespace=new RegExp(whitespace + "+","g"),rtrim=new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$","g"),rcomma=new RegExp("^" + whitespace + "*," + whitespace + "*"),rcombinators=new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),rattributeQuotes=new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]","g"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^" + identifier + "$"),matchExpr={"ID":new RegExp("^#(" + characterEncoding + ")"),"CLASS":new RegExp("^\\.(" + characterEncoding + ")"),"TAG":new RegExp("^(" + characterEncoding.replace("w","w*") + ")"),"ATTR":new RegExp("^" + attributes),"PSEUDO":new RegExp("^" + pseudos),"CHILD":new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)","i"),"bool":new RegExp("^(?:" + booleans + ")$","i"), // For use in libraries implementing .is()
// We use this for POS matching in `select`
"needsContext":new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)","i")},rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/, // Easily-parseable/retrievable ID or TAG or CLASS selectors
rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,rescape=/'|\\/g, // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
runescape=new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)","ig"),funescape=function funescape(_,escaped,escapedWhitespace){var high="0x" + escaped - 0x10000; // NaN means non-codepoint
// Support: Firefox<24
// Workaround erroneous numeric interpretation of +"0x"
return high !== high || escapedWhitespace?escaped:high < 0? // BMP codepoint
String.fromCharCode(high + 0x10000): // Supplemental Plane codepoint (surrogate pair)
String.fromCharCode(high >> 10 | 0xD800,high & 0x3FF | 0xDC00);}, // Used for iframes
// See setDocument()
// Removing the function wrapper causes a "Permission Denied"
// error in IE
unloadHandler=function unloadHandler(){setDocument();}; // Optimize for push.apply( _, NodeList )
try{push.apply(arr = slice.call(preferredDoc.childNodes),preferredDoc.childNodes); // Support: Android<4.0
// Detect silently failing push.apply
arr[preferredDoc.childNodes.length].nodeType;}catch(e) {push = {apply:arr.length? // Leverage slice if possible
function(target,els){push_native.apply(target,slice.call(els));}: // Support: IE<9
function(target,els){var j=target.length,i=0; // Can't trust NodeList.length
while(target[j++] = els[i++]) {}target.length = j - 1;}};}function Sizzle(selector,context,results,seed){var match,elem,m,nodeType, // QSA vars
i,groups,old,nid,newContext,newSelector;if((context?context.ownerDocument || context:preferredDoc) !== document){setDocument(context);}context = context || document;results = results || [];nodeType = context.nodeType;if(typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11){return results;}if(!seed && documentIsHTML){ // Try to shortcut find operations when possible (e.g., not under DocumentFragment)
if(nodeType !== 11 && (match = rquickExpr.exec(selector))){ // Speed-up: Sizzle("#ID")
if(m = match[1]){if(nodeType === 9){elem = context.getElementById(m); // Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document (jQuery #6963)
if(elem && elem.parentNode){ // Handle the case where IE, Opera, and Webkit return items
// by name instead of ID
if(elem.id === m){results.push(elem);return results;}}else {return results;}}else { // Context is not a document
if(context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context,elem) && elem.id === m){results.push(elem);return results;}} // Speed-up: Sizzle("TAG")
}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results; // Speed-up: Sizzle(".CLASS")
}else if((m = match[3]) && support.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}} // QSA path
if(support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))){nid = old = expando;newContext = context;newSelector = nodeType !== 1 && selector; // qSA works strangely on Element-rooted queries
// We can work around this by specifying an extra ID on the root
// and working up from there (Thanks to Andrew Dupont for the technique)
// IE 8 doesn't work on object elements
if(nodeType === 1 && context.nodeName.toLowerCase() !== "object"){groups = tokenize(selector);if(old = context.getAttribute("id")){nid = old.replace(rescape,"\\$&");}else {context.setAttribute("id",nid);}nid = "[id='" + nid + "'] ";i = groups.length;while(i--) {groups[i] = nid + toSelector(groups[i]);}newContext = rsibling.test(selector) && testContext(context.parentNode) || context;newSelector = groups.join(",");}if(newSelector){try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError) {}finally {if(!old){context.removeAttribute("id");}}}}} // All others
return select(selector.replace(rtrim,"$1"),context,results,seed);} /**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */function createCache(){var keys=[];function cache(key,value){ // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
if(keys.push(key + " ") > Expr.cacheLength){ // Only keep the most recent entries
delete cache[keys.shift()];}return cache[key + " "] = value;}return cache;} /**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */function markFunction(fn){fn[expando] = true;return fn;} /**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */function assert(fn){var div=document.createElement("div");try{return !!fn(div);}catch(e) {return false;}finally { // Remove from its parent by default
if(div.parentNode){div.parentNode.removeChild(div);} // release memory in IE
div = null;}} /**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */function addHandle(attrs,handler){var arr=attrs.split("|"),i=attrs.length;while(i--) {Expr.attrHandle[arr[i]] = handler;}} /**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */function siblingCheck(a,b){var cur=b && a,diff=cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE); // Use IE sourceIndex if available on both nodes
if(diff){return diff;} // Check if b follows a
if(cur){while(cur = cur.nextSibling) {if(cur === b){return -1;}}}return a?1:-1;} /**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return name === "input" && elem.type === type;};} /**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return (name === "input" || name === "button") && elem.type === type;};} /**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */function createPositionalPseudo(fn){return markFunction(function(argument){argument = +argument;return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length; // Match elements found at the specified indexes
while(i--) {if(seed[j = matchIndexes[i]]){seed[j] = !(matches[j] = seed[j]);}}});});} /**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */function testContext(context){return context && typeof context.getElementsByTagName !== "undefined" && context;} // Expose support vars for convenience
support = Sizzle.support = {}; /**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */isXML = Sizzle.isXML = function(elem){ // documentElement is verified for cases where it doesn't yet exist
// (such as loading iframes in IE - #4833)
var documentElement=elem && (elem.ownerDocument || elem).documentElement;return documentElement?documentElement.nodeName !== "HTML":false;}; /**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */setDocument = Sizzle.setDocument = function(node){var hasCompare,parent,doc=node?node.ownerDocument || node:preferredDoc; // If no document and documentElement is available, return
if(doc === document || doc.nodeType !== 9 || !doc.documentElement){return document;} // Set our document
document = doc;docElem = doc.documentElement;parent = doc.defaultView; // Support: IE>8
// If iframe document is assigned to "document" variable and if iframe has been reloaded,
// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
// IE6-8 do not support the defaultView property so parent will be undefined
if(parent && parent !== parent.top){ // IE11 does not have attachEvent, so all must suffer
if(parent.addEventListener){parent.addEventListener("unload",unloadHandler,false);}else if(parent.attachEvent){parent.attachEvent("onunload",unloadHandler);}} /* Support tests
	---------------------------------------------------------------------- */documentIsHTML = !isXML(doc); /* Attributes
	---------------------------------------------------------------------- */ // Support: IE<8
// Verify that getAttribute really returns attributes and not properties
// (excepting IE8 booleans)
support.attributes = assert(function(div){div.className = "i";return !div.getAttribute("className");}); /* getElement(s)By*
	---------------------------------------------------------------------- */ // Check if getElementsByTagName("*") returns only elements
support.getElementsByTagName = assert(function(div){div.appendChild(doc.createComment(""));return !div.getElementsByTagName("*").length;}); // Support: IE<9
support.getElementsByClassName = rnative.test(doc.getElementsByClassName); // Support: IE<10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programatically-set names,
// so use a roundabout getElementsByName test
support.getById = assert(function(div){docElem.appendChild(div).id = expando;return !doc.getElementsByName || !doc.getElementsByName(expando).length;}); // ID find and filter
if(support.getById){Expr.find["ID"] = function(id,context){if(typeof context.getElementById !== "undefined" && documentIsHTML){var m=context.getElementById(id); // Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document #6963
return m && m.parentNode?[m]:[];}};Expr.filter["ID"] = function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id") === attrId;};};}else { // Support: IE6/7
// getElementById is not reliable as a find shortcut
delete Expr.find["ID"];Expr.filter["ID"] = function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node=typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");return node && node.value === attrId;};};} // Tag
Expr.find["TAG"] = support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName !== "undefined"){return context.getElementsByTagName(tag); // DocumentFragment nodes don't have gEBTN
}else if(support.qsa){return context.querySelectorAll(tag);}}:function(tag,context){var elem,tmp=[],i=0, // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
results=context.getElementsByTagName(tag); // Filter out possible comments
if(tag === "*"){while(elem = results[i++]) {if(elem.nodeType === 1){tmp.push(elem);}}return tmp;}return results;}; // Class
Expr.find["CLASS"] = support.getElementsByClassName && function(className,context){if(documentIsHTML){return context.getElementsByClassName(className);}}; /* QSA/matchesSelector
	---------------------------------------------------------------------- */ // QSA and matchesSelector support
// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
rbuggyMatches = []; // qSa(:focus) reports false when true (Chrome 21)
// We allow this because of a bug in IE8/9 that throws an error
// whenever `document.activeElement` is accessed on an iframe
// So, we allow :focus to pass through QSA all the time to avoid the IE error
// See http://bugs.jquery.com/ticket/13378
rbuggyQSA = [];if(support.qsa = rnative.test(doc.querySelectorAll)){ // Build QSA regex
// Regex strategy adopted from Diego Perini
assert(function(div){ // Select is set to empty string on purpose
// This is to test IE's treatment of not explicitly
// setting a boolean content attribute,
// since its presence should be enough
// http://bugs.jquery.com/ticket/12359
docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\f]' msallowcapture=''>" + "<option selected=''></option></select>"; // Support: IE8, Opera 11-12.16
// Nothing should be selected when empty strings follow ^= or $= or *=
// The test attribute must be unknown in Opera but "safe" for WinRT
// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
if(div.querySelectorAll("[msallowcapture^='']").length){rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");} // Support: IE8
// Boolean attributes and "value" are not treated correctly
if(!div.querySelectorAll("[selected]").length){rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");} // Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
if(!div.querySelectorAll("[id~=" + expando + "-]").length){rbuggyQSA.push("~=");} // Webkit/Opera - :checked should return selected option elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
// IE8 throws error here and will not see later tests
if(!div.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");} // Support: Safari 8+, iOS 8+
// https://bugs.webkit.org/show_bug.cgi?id=136851
// In-page `selector#id sibing-combinator selector` fails
if(!div.querySelectorAll("a#" + expando + "+*").length){rbuggyQSA.push(".#.+[+~]");}});assert(function(div){ // Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
var input=doc.createElement("input");input.setAttribute("type","hidden");div.appendChild(input).setAttribute("name","D"); // Support: IE8
// Enforce case-sensitivity of name attribute
if(div.querySelectorAll("[name=d]").length){rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");} // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
// IE8 throws error here and will not see later tests
if(!div.querySelectorAll(":enabled").length){rbuggyQSA.push(":enabled",":disabled");} // Opera 10-11 does not throw on post-comma invalid pseudos
div.querySelectorAll("*,:x");rbuggyQSA.push(",.*:");});}if(support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)){assert(function(div){ // Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9)
support.disconnectedMatch = matches.call(div,"div"); // This should fail with an exception
// Gecko does not error, returns false instead
matches.call(div,"[s!='']:x");rbuggyMatches.push("!=",pseudos);});}rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")); /* Contains
	---------------------------------------------------------------------- */hasCompare = rnative.test(docElem.compareDocumentPosition); // Element contains another
// Purposefully does not implement inclusive descendent
// As in, an element does not contain itself
contains = hasCompare || rnative.test(docElem.contains)?function(a,b){var adown=a.nodeType === 9?a.documentElement:a,bup=b && b.parentNode;return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains?adown.contains(bup):a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));}:function(a,b){if(b){while(b = b.parentNode) {if(b === a){return true;}}}return false;}; /* Sorting
	---------------------------------------------------------------------- */ // Document order sorting
sortOrder = hasCompare?function(a,b){ // Flag for duplicate removal
if(a === b){hasDuplicate = true;return 0;} // Sort on method existence if only one input has compareDocumentPosition
var compare=!a.compareDocumentPosition - !b.compareDocumentPosition;if(compare){return compare;} // Calculate position if both inputs belong to the same document
compare = (a.ownerDocument || a) === (b.ownerDocument || b)?a.compareDocumentPosition(b): // Otherwise we know they are disconnected
1; // Disconnected nodes
if(compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare){ // Choose the first element that is related to our preferred document
if(a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc,a)){return -1;}if(b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc,b)){return 1;} // Maintain original order
return sortInput?indexOf(sortInput,a) - indexOf(sortInput,b):0;}return compare & 4?-1:1;}:function(a,b){ // Exit early if the nodes are identical
if(a === b){hasDuplicate = true;return 0;}var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b]; // Parentless nodes are either documents or disconnected
if(!aup || !bup){return a === doc?-1:b === doc?1:aup?-1:bup?1:sortInput?indexOf(sortInput,a) - indexOf(sortInput,b):0; // If the nodes are siblings, we can do a quick check
}else if(aup === bup){return siblingCheck(a,b);} // Otherwise we need full lists of their ancestors for comparison
cur = a;while(cur = cur.parentNode) {ap.unshift(cur);}cur = b;while(cur = cur.parentNode) {bp.unshift(cur);} // Walk down the tree looking for a discrepancy
while(ap[i] === bp[i]) {i++;}return i? // Do a sibling check if the nodes have a common ancestor
siblingCheck(ap[i],bp[i]): // Otherwise nodes in our document sort first
ap[i] === preferredDoc?-1:bp[i] === preferredDoc?1:0;};return doc;};Sizzle.matches = function(expr,elements){return Sizzle(expr,null,null,elements);};Sizzle.matchesSelector = function(elem,expr){ // Set document vars if needed
if((elem.ownerDocument || elem) !== document){setDocument(elem);} // Make sure that attribute selectors are quoted
expr = expr.replace(rattributeQuotes,"='$1']");if(support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr); // IE 9's matchesSelector returns false on disconnected nodes
if(ret || support.disconnectedMatch ||  // As well, disconnected nodes are said to be in a document
// fragment in IE 9
elem.document && elem.document.nodeType !== 11){return ret;}}catch(e) {}}return Sizzle(expr,document,null,[elem]).length > 0;};Sizzle.contains = function(context,elem){ // Set document vars if needed
if((context.ownerDocument || context) !== document){setDocument(context);}return contains(context,elem);};Sizzle.attr = function(elem,name){ // Set document vars if needed
if((elem.ownerDocument || elem) !== document){setDocument(elem);}var fn=Expr.attrHandle[name.toLowerCase()], // Don't get fooled by Object.prototype properties (jQuery #13807)
val=fn && hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;return val !== undefined?val:support.attributes || !documentIsHTML?elem.getAttribute(name):(val = elem.getAttributeNode(name)) && val.specified?val.value:null;};Sizzle.error = function(msg){throw new Error("Syntax error, unrecognized expression: " + msg);}; /**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */Sizzle.uniqueSort = function(results){var elem,duplicates=[],j=0,i=0; // Unless we *know* we can detect duplicates, assume their presence
hasDuplicate = !support.detectDuplicates;sortInput = !support.sortStable && results.slice(0);results.sort(sortOrder);if(hasDuplicate){while(elem = results[i++]) {if(elem === results[i]){j = duplicates.push(i);}}while(j--) {results.splice(duplicates[j],1);}} // Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
sortInput = null;return results;}; /**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */getText = Sizzle.getText = function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(!nodeType){ // If no nodeType, this is expected to be an array
while(node = elem[i++]) { // Do not traverse comment nodes
ret += getText(node);}}else if(nodeType === 1 || nodeType === 9 || nodeType === 11){ // Use textContent for elements
// innerText usage removed for consistency of new lines (jQuery #11153)
if(typeof elem.textContent === "string"){return elem.textContent;}else { // Traverse its children
for(elem = elem.firstChild;elem;elem = elem.nextSibling) {ret += getText(elem);}}}else if(nodeType === 3 || nodeType === 4){return elem.nodeValue;} // Do not include comment or processing instruction nodes
return ret;};Expr = Sizzle.selectors = { // Can be adjusted by the user
cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function ATTR(match){match[1] = match[1].replace(runescape,funescape); // Move the given value to match[3] whether quoted or unquoted
match[3] = (match[3] || match[4] || match[5] || "").replace(runescape,funescape);if(match[2] === "~="){match[3] = " " + match[3] + " ";}return match.slice(0,4);},"CHILD":function CHILD(match){ /* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/match[1] = match[1].toLowerCase();if(match[1].slice(0,3) === "nth"){ // nth-* requires argument
if(!match[3]){Sizzle.error(match[0]);} // numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
match[4] = +(match[4]?match[5] + (match[6] || 1):2 * (match[3] === "even" || match[3] === "odd"));match[5] = +(match[7] + match[8] || match[3] === "odd"); // other types prohibit arguments
}else if(match[3]){Sizzle.error(match[0]);}return match;},"PSEUDO":function PSEUDO(match){var excess,unquoted=!match[6] && match[2];if(matchExpr["CHILD"].test(match[0])){return null;} // Accept quoted arguments as-is
if(match[3]){match[2] = match[4] || match[5] || ""; // Strip excess characters from unquoted arguments
}else if(unquoted && rpseudo.test(unquoted) && ( // Get excess from tokenize (recursively)
excess = tokenize(unquoted,true)) && ( // advance to the next closing parenthesis
excess = unquoted.indexOf(")",unquoted.length - excess) - unquoted.length)){ // excess is a negative index
match[0] = match[0].slice(0,excess);match[2] = unquoted.slice(0,excess);} // Return only captures needed by the pseudo filter method (type and argument)
return match.slice(0,3);}},filter:{"TAG":function TAG(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return nodeNameSelector === "*"?function(){return true;}:function(elem){return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;};},"CLASS":function CLASS(className){var pattern=classCache[className + " "];return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className,function(elem){return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");});},"ATTR":function ATTR(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);if(result == null){return operator === "!=";}if(!operator){return true;}result += "";return operator === "="?result === check:operator === "!="?result !== check:operator === "^="?check && result.indexOf(check) === 0:operator === "*="?check && result.indexOf(check) > -1:operator === "$="?check && result.slice(-check.length) === check:operator === "~="?(" " + result.replace(rwhitespace," ") + " ").indexOf(check) > -1:operator === "|="?result === check || result.slice(0,check.length + 1) === check + "-":false;};},"CHILD":function CHILD(type,what,argument,first,last){var simple=type.slice(0,3) !== "nth",forward=type.slice(-4) !== "last",ofType=what === "of-type";return first === 1 && last === 0? // Shortcut for :nth-*(n)
function(elem){return !!elem.parentNode;}:function(elem,context,xml){var cache,outerCache,node,diff,nodeIndex,start,dir=simple !== forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType && elem.nodeName.toLowerCase(),useCache=!xml && !ofType;if(parent){ // :(first|last|only)-(child|of-type)
if(simple){while(dir) {node = elem;while(node = node[dir]) {if(ofType?node.nodeName.toLowerCase() === name:node.nodeType === 1){return false;}} // Reverse direction for :only-* (if we haven't yet done so)
start = dir = type === "only" && !start && "nextSibling";}return true;}start = [forward?parent.firstChild:parent.lastChild]; // non-xml :nth-child(...) stores cache data on `parent`
if(forward && useCache){ // Seek `elem` from a previously-cached index
outerCache = parent[expando] || (parent[expando] = {});cache = outerCache[type] || [];nodeIndex = cache[0] === dirruns && cache[1];diff = cache[0] === dirruns && cache[2];node = nodeIndex && parent.childNodes[nodeIndex];while(node = ++nodeIndex && node && node[dir] || ( // Fallback to seeking `elem` from the start
diff = nodeIndex = 0) || start.pop()) { // When found, cache indexes on `parent` and break
if(node.nodeType === 1 && ++diff && node === elem){outerCache[type] = [dirruns,nodeIndex,diff];break;}} // Use previously-cached element index if available
}else if(useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns){diff = cache[1]; // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
}else { // Use the same loop as above to seek `elem` from the start
while(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {if((ofType?node.nodeName.toLowerCase() === name:node.nodeType === 1) && ++diff){ // Cache the index of each encountered element
if(useCache){(node[expando] || (node[expando] = {}))[type] = [dirruns,diff];}if(node === elem){break;}}}} // Incorporate the offset, then check against cycle size
diff -= last;return diff === first || diff % first === 0 && diff / first >= 0;}};},"PSEUDO":function PSEUDO(pseudo,argument){ // pseudo-class names are case-insensitive
// http://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
// Remember that setFilters inherits from pseudos
var args,fn=Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo); // The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
if(fn[expando]){return fn(argument);} // But maintain support for old signatures
if(fn.length > 1){args = [pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--) {idx = indexOf(seed,matched[i]);seed[idx] = !(matches[idx] = matched[i]);}}):function(elem){return fn(elem,0,args);};}return fn;}},pseudos:{ // Potentially complex pseudos
"not":markFunction(function(selector){ // Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length; // Match elements unmatched by `matcher`
while(i--) {if(elem = unmatched[i]){seed[i] = !(matches[i] = elem);}}}):function(elem,context,xml){input[0] = elem;matcher(input,null,xml,results); // Don't keep the element (issue #299)
input[0] = null;return !results.pop();};}),"has":markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length > 0;};}),"contains":markFunction(function(text){text = text.replace(runescape,funescape);return function(elem){return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;};}), // "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// http://www.w3.org/TR/selectors/#lang-pseudo
"lang":markFunction(function(lang){ // lang value must be a valid identifier
if(!ridentifier.test(lang || "")){Sizzle.error("unsupported lang: " + lang);}lang = lang.replace(runescape,funescape).toLowerCase();return function(elem){var elemLang;do {if(elemLang = documentIsHTML?elem.lang:elem.getAttribute("xml:lang") || elem.getAttribute("lang")){elemLang = elemLang.toLowerCase();return elemLang === lang || elemLang.indexOf(lang + "-") === 0;}}while((elem = elem.parentNode) && elem.nodeType === 1);return false;};}), // Miscellaneous
"target":function target(elem){var hash=window.location && window.location.hash;return hash && hash.slice(1) === elem.id;},"root":function root(elem){return elem === docElem;},"focus":function focus(elem){return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);}, // Boolean properties
"enabled":function enabled(elem){return elem.disabled === false;},"disabled":function disabled(elem){return elem.disabled === true;},"checked":function checked(elem){ // In CSS3, :checked should return both checked and selected elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
var nodeName=elem.nodeName.toLowerCase();return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;},"selected":function selected(elem){ // Accessing this property makes selected-by-default
// options in Safari work properly
if(elem.parentNode){elem.parentNode.selectedIndex;}return elem.selected === true;}, // Contents
"empty":function empty(elem){ // http://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(elem = elem.firstChild;elem;elem = elem.nextSibling) {if(elem.nodeType < 6){return false;}}return true;},"parent":function parent(elem){return !Expr.pseudos["empty"](elem);}, // Element/input types
"header":function header(elem){return rheader.test(elem.nodeName);},"input":function input(elem){return rinputs.test(elem.nodeName);},"button":function button(elem){var name=elem.nodeName.toLowerCase();return name === "input" && elem.type === "button" || name === "button";},"text":function text(elem){var attr;return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ( // Support: IE<8
// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");}, // Position-in-collection
"first":createPositionalPseudo(function(){return [0];}),"last":createPositionalPseudo(function(matchIndexes,length){return [length - 1];}),"eq":createPositionalPseudo(function(matchIndexes,length,argument){return [argument < 0?argument + length:argument];}),"even":createPositionalPseudo(function(matchIndexes,length){var i=0;for(;i < length;i += 2) {matchIndexes.push(i);}return matchIndexes;}),"odd":createPositionalPseudo(function(matchIndexes,length){var i=1;for(;i < length;i += 2) {matchIndexes.push(i);}return matchIndexes;}),"lt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument < 0?argument + length:argument;for(;--i >= 0;) {matchIndexes.push(i);}return matchIndexes;}),"gt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument < 0?argument + length:argument;for(;++i < length;) {matchIndexes.push(i);}return matchIndexes;})}};Expr.pseudos["nth"] = Expr.pseudos["eq"]; // Add button/input type pseudos
for(i in {radio:true,checkbox:true,file:true,password:true,image:true}) {Expr.pseudos[i] = createInputPseudo(i);}for(i in {submit:true,reset:true}) {Expr.pseudos[i] = createButtonPseudo(i);} // Easy API for creating new setFilters
function setFilters(){}setFilters.prototype = Expr.filters = Expr.pseudos;Expr.setFilters = new setFilters();tokenize = Sizzle.tokenize = function(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector + " "];if(cached){return parseOnly?0:cached.slice(0);}soFar = selector;groups = [];preFilters = Expr.preFilter;while(soFar) { // Comma and first run
if(!matched || (match = rcomma.exec(soFar))){if(match){ // Don't consume trailing commas as valid
soFar = soFar.slice(match[0].length) || soFar;}groups.push(tokens = []);}matched = false; // Combinators
if(match = rcombinators.exec(soFar)){matched = match.shift();tokens.push({value:matched, // Cast descendant combinators to space
type:match[0].replace(rtrim," ")});soFar = soFar.slice(matched.length);} // Filters
for(type in Expr.filter) {if((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))){matched = match.shift();tokens.push({value:matched,type:type,matches:match});soFar = soFar.slice(matched.length);}}if(!matched){break;}} // Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
return parseOnly?soFar.length:soFar?Sizzle.error(selector): // Cache the tokens
tokenCache(selector,groups).slice(0);};function toSelector(tokens){var i=0,len=tokens.length,selector="";for(;i < len;i++) {selector += tokens[i].value;}return selector;}function addCombinator(matcher,combinator,base){var dir=combinator.dir,checkNonElements=base && dir === "parentNode",doneName=done++;return combinator.first? // Check against closest ancestor/preceding element
function(elem,context,xml){while(elem = elem[dir]) {if(elem.nodeType === 1 || checkNonElements){return matcher(elem,context,xml);}}}: // Check against all ancestor/preceding elements
function(elem,context,xml){var oldCache,outerCache,newCache=[dirruns,doneName]; // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
if(xml){while(elem = elem[dir]) {if(elem.nodeType === 1 || checkNonElements){if(matcher(elem,context,xml)){return true;}}}}else {while(elem = elem[dir]) {if(elem.nodeType === 1 || checkNonElements){outerCache = elem[expando] || (elem[expando] = {});if((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName){ // Assign to newCache so results back-propagate to previous elements
return newCache[2] = oldCache[2];}else { // Reuse newcache so results back-propagate to previous elements
outerCache[dir] = newCache; // A match means we're done; a fail means we have to keep checking
if(newCache[2] = matcher(elem,context,xml)){return true;}}}}}};}function elementMatcher(matchers){return matchers.length > 1?function(elem,context,xml){var i=matchers.length;while(i--) {if(!matchers[i](elem,context,xml)){return false;}}return true;}:matchers[0];}function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;for(;i < len;i++) {Sizzle(selector,contexts[i],results);}return results;}function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map != null;for(;i < len;i++) {if(elem = unmatched[i]){if(!filter || filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}return newUnmatched;}function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter && !postFilter[expando]){postFilter = setMatcher(postFilter);}if(postFinder && !postFinder[expando]){postFinder = setMatcher(postFinder,postSelector);}return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length, // Get initial elements from seed or context
elems=seed || multipleContexts(selector || "*",context.nodeType?[context]:context,[]), // Prefilter to get matcher input, preserving a map for seed-results synchronization
matcherIn=preFilter && (seed || !selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
postFinder || (seed?preFilter:preexisting || postFilter)? // ...intermediate processing is necessary
[]: // ...otherwise use results directly
results:matcherIn; // Find primary matches
if(matcher){matcher(matcherIn,matcherOut,context,xml);} // Apply postFilter
if(postFilter){temp = condense(matcherOut,postMap);postFilter(temp,[],context,xml); // Un-match failing elements by moving them back to matcherIn
i = temp.length;while(i--) {if(elem = temp[i]){matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);}}}if(seed){if(postFinder || preFilter){if(postFinder){ // Get the final matcherOut by condensing this intermediate into postFinder contexts
temp = [];i = matcherOut.length;while(i--) {if(elem = matcherOut[i]){ // Restore matcherIn since elem is not yet a final match
temp.push(matcherIn[i] = elem);}}postFinder(null,matcherOut = [],temp,xml);} // Move matched elements from seed to results to keep them synchronized
i = matcherOut.length;while(i--) {if((elem = matcherOut[i]) && (temp = postFinder?indexOf(seed,elem):preMap[i]) > -1){seed[temp] = !(results[temp] = elem);}}} // Add elements to results, through postFinder if defined
}else {matcherOut = condense(matcherOut === results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else {push.apply(results,matcherOut);}}});}function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative || Expr.relative[" "],i=leadingRelative?1:0, // The foundational matcher ensures that elements are reachable from top-level context(s)
matchContext=addCombinator(function(elem){return elem === checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf(checkContext,elem) > -1;},implicitRelative,true),matchers=[function(elem,context,xml){var ret=!leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml)); // Avoid hanging onto element (issue #299)
checkContext = null;return ret;}];for(;i < len;i++) {if(matcher = Expr.relative[tokens[i].type]){matchers = [addCombinator(elementMatcher(matchers),matcher)];}else {matcher = Expr.filter[tokens[i].type].apply(null,tokens[i].matches); // Return special upon seeing a positional matcher
if(matcher[expando]){ // Find the next relative operator (if any) for proper handling
j = ++i;for(;j < len;j++) {if(Expr.relative[tokens[j].type]){break;}}return setMatcher(i > 1 && elementMatcher(matchers),i > 1 && toSelector( // If the preceding token was a descendant combinator, insert an implicit any-element `*`
tokens.slice(0,i - 1).concat({value:tokens[i - 2].type === " "?"*":""})).replace(rtrim,"$1"),matcher,i < j && matcherFromTokens(tokens.slice(i,j)),j < len && matcherFromTokens(tokens = tokens.slice(j)),j < len && toSelector(tokens));}matchers.push(matcher);}}return elementMatcher(matchers);}function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length > 0,byElement=elementMatchers.length > 0,superMatcher=function superMatcher(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed && [],setMatched=[],contextBackup=outermostContext, // We must always have either seed elements or outermost context
elems=seed || byElement && Expr.find["TAG"]("*",outermost), // Use integer dirruns iff this is the outermost matcher
dirrunsUnique=dirruns += contextBackup == null?1:Math.random() || 0.1,len=elems.length;if(outermost){outermostContext = context !== document && context;} // Add elements passing elementMatchers directly to results
// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
// Support: IE<9, Safari
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
for(;i !== len && (elem = elems[i]) != null;i++) {if(byElement && elem){j = 0;while(matcher = elementMatchers[j++]) {if(matcher(elem,context,xml)){results.push(elem);break;}}if(outermost){dirruns = dirrunsUnique;}} // Track unmatched elements for set filters
if(bySet){ // They will have gone through all possible matchers
if(elem = !matcher && elem){matchedCount--;} // Lengthen the array for every element, matched or not
if(seed){unmatched.push(elem);}}} // Apply set filters to unmatched elements
matchedCount += i;if(bySet && i !== matchedCount){j = 0;while(matcher = setMatchers[j++]) {matcher(unmatched,setMatched,context,xml);}if(seed){ // Reintegrate element matches to eliminate the need for sorting
if(matchedCount > 0){while(i--) {if(!(unmatched[i] || setMatched[i])){setMatched[i] = pop.call(results);}}} // Discard index placeholder values to get only actual matches
setMatched = condense(setMatched);} // Add matches to results
push.apply(results,setMatched); // Seedless set matches succeeding multiple successful matchers stipulate sorting
if(outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1){Sizzle.uniqueSort(results);}} // Override manipulation of globals by nested matchers
if(outermost){dirruns = dirrunsUnique;outermostContext = contextBackup;}return unmatched;};return bySet?markFunction(superMatcher):superMatcher;}compile = Sizzle.compile = function(selector,match /* Internal Use Only */){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector + " "];if(!cached){ // Generate a function of recursive functions that can be used to check each element
if(!match){match = tokenize(selector);}i = match.length;while(i--) {cached = matcherFromTokens(match[i]);if(cached[expando]){setMatchers.push(cached);}else {elementMatchers.push(cached);}} // Cache the compiled function
cached = compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers)); // Save selector and tokenization
cached.selector = selector;}return cached;}; /**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */select = Sizzle.select = function(selector,context,results,seed){var i,tokens,token,type,find,compiled=typeof selector === "function" && selector,match=!seed && tokenize(selector = compiled.selector || selector);results = results || []; // Try to minimize operations if there is no seed and only one group
if(match.length === 1){ // Take a shortcut and set the context if the root selector is an ID
tokens = match[0] = match[0].slice(0);if(tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]){context = (Expr.find["ID"](token.matches[0].replace(runescape,funescape),context) || [])[0];if(!context){return results; // Precompiled matchers will still verify ancestry, so step up a level
}else if(compiled){context = context.parentNode;}selector = selector.slice(tokens.shift().value.length);} // Fetch a seed set for right-to-left matching
i = matchExpr["needsContext"].test(selector)?0:tokens.length;while(i--) {token = tokens[i]; // Abort if we hit a combinator
if(Expr.relative[type = token.type]){break;}if(find = Expr.find[type]){ // Search, expanding context for leading sibling combinators
if(seed = find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)){ // If seed is empty or no tokens remain, we can return early
tokens.splice(i,1);selector = seed.length && toSelector(tokens);if(!selector){push.apply(results,seed);return results;}break;}}}} // Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
(compiled || compile(selector,match))(seed,context,!documentIsHTML,results,rsibling.test(selector) && testContext(context.parentNode) || context);return results;}; // One-time assignments
// Sort stability
support.sortStable = expando.split("").sort(sortOrder).join("") === expando; // Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate; // Initialize against the default document
setDocument(); // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function(div1){ // Should return 1, but returns 4 (following)
return div1.compareDocumentPosition(document.createElement("div")) & 1;}); // Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if(!assert(function(div){div.innerHTML = "<a href='#'></a>";return div.firstChild.getAttribute("href") === "#";})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase() === "type"?1:2);}});} // Support: IE<9
// Use defaultValue in place of getAttribute("value")
if(!support.attributes || !assert(function(div){div.innerHTML = "<input/>";div.firstChild.setAttribute("value","");return div.firstChild.getAttribute("value") === "";})){addHandle("value",function(elem,name,isXML){if(!isXML && elem.nodeName.toLowerCase() === "input"){return elem.defaultValue;}});} // Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if(!assert(function(div){return div.getAttribute("disabled") == null;})){addHandle(booleans,function(elem,name,isXML){var val;if(!isXML){return elem[name] === true?name.toLowerCase():(val = elem.getAttributeNode(name)) && val.specified?val.value:null;}});}return Sizzle;})(window);jQuery.find = Sizzle;jQuery.expr = Sizzle.selectors;jQuery.expr[":"] = jQuery.expr.pseudos;jQuery.unique = Sizzle.uniqueSort;jQuery.text = Sizzle.getText;jQuery.isXMLDoc = Sizzle.isXML;jQuery.contains = Sizzle.contains;var rneedsContext=jQuery.expr.match.needsContext;var rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>|)$/;var risSimple=/^.[^:#\[\.,]*$/; // Implement the identical functionality for filter and not
function winnow(elements,qualifier,not){if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){ /* jshint -W018 */return !!qualifier.call(elem,i,elem) !== not;});}if(qualifier.nodeType){return jQuery.grep(elements,function(elem){return elem === qualifier !== not;});}if(typeof qualifier === "string"){if(risSimple.test(qualifier)){return jQuery.filter(qualifier,elements,not);}qualifier = jQuery.filter(qualifier,elements);}return jQuery.grep(elements,function(elem){return indexOf.call(qualifier,elem) >= 0 !== not;});}jQuery.filter = function(expr,elems,not){var elem=elems[0];if(not){expr = ":not(" + expr + ")";}return elems.length === 1 && elem.nodeType === 1?jQuery.find.matchesSelector(elem,expr)?[elem]:[]:jQuery.find.matches(expr,jQuery.grep(elems,function(elem){return elem.nodeType === 1;}));};jQuery.fn.extend({find:function find(selector){var i,len=this.length,ret=[],self=this;if(typeof selector !== "string"){return this.pushStack(jQuery(selector).filter(function(){for(i = 0;i < len;i++) {if(jQuery.contains(self[i],this)){return true;}}}));}for(i = 0;i < len;i++) {jQuery.find(selector,self[i],ret);} // Needed because $( selector, context ) becomes $( context ).find( selector )
ret = this.pushStack(len > 1?jQuery.unique(ret):ret);ret.selector = this.selector?this.selector + " " + selector:selector;return ret;},filter:function filter(selector){return this.pushStack(winnow(this,selector || [],false));},not:function not(selector){return this.pushStack(winnow(this,selector || [],true));},is:function is(selector){return !!winnow(this, // If this is a positional/relative selector, check membership in the returned set
// so $("p:first").is("p:last") won't return true for a doc with two "p".
typeof selector === "string" && rneedsContext.test(selector)?jQuery(selector):selector || [],false).length;}}); // Initialize a jQuery object
// A central reference to the root jQuery(document)
var rootjQuery, // A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
rquickExpr=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,init=jQuery.fn.init = function(selector,context){var match,elem; // HANDLE: $(""), $(null), $(undefined), $(false)
if(!selector){return this;} // Handle HTML strings
if(typeof selector === "string"){if(selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3){ // Assume that strings that start and end with <> are HTML and skip the regex check
match = [null,selector,null];}else {match = rquickExpr.exec(selector);} // Match html or make sure no context is specified for #id
if(match && (match[1] || !context)){ // HANDLE: $(html) -> $(array)
if(match[1]){context = context instanceof jQuery?context[0]:context; // Option to run scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
jQuery.merge(this,jQuery.parseHTML(match[1],context && context.nodeType?context.ownerDocument || context:document,true)); // HANDLE: $(html, props)
if(rsingleTag.test(match[1]) && jQuery.isPlainObject(context)){for(match in context) { // Properties of context are called as methods if possible
if(jQuery.isFunction(this[match])){this[match](context[match]); // ...and otherwise set as attributes
}else {this.attr(match,context[match]);}}}return this; // HANDLE: $(#id)
}else {elem = document.getElementById(match[2]); // Support: Blackberry 4.6
// gEBID returns nodes no longer in the document (#6963)
if(elem && elem.parentNode){ // Inject the element directly into the jQuery object
this.length = 1;this[0] = elem;}this.context = document;this.selector = selector;return this;} // HANDLE: $(expr, $(...))
}else if(!context || context.jquery){return (context || rootjQuery).find(selector); // HANDLE: $(expr, context)
// (which is just equivalent to: $(context).find(expr)
}else {return this.constructor(context).find(selector);} // HANDLE: $(DOMElement)
}else if(selector.nodeType){this.context = this[0] = selector;this.length = 1;return this; // HANDLE: $(function)
// Shortcut for document ready
}else if(jQuery.isFunction(selector)){return typeof rootjQuery.ready !== "undefined"?rootjQuery.ready(selector): // Execute immediately if ready is not present
selector(jQuery);}if(selector.selector !== undefined){this.selector = selector.selector;this.context = selector.context;}return jQuery.makeArray(selector,this);}; // Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn; // Initialize central reference
rootjQuery = jQuery(document);var rparentsprev=/^(?:parents|prev(?:Until|All))/, // Methods guaranteed to produce a unique set when starting from a unique set
guaranteedUnique={children:true,contents:true,next:true,prev:true};jQuery.extend({dir:function dir(elem,_dir,until){var matched=[],truncate=until !== undefined;while((elem = elem[_dir]) && elem.nodeType !== 9) {if(elem.nodeType === 1){if(truncate && jQuery(elem).is(until)){break;}matched.push(elem);}}return matched;},sibling:function sibling(n,elem){var matched=[];for(;n;n = n.nextSibling) {if(n.nodeType === 1 && n !== elem){matched.push(n);}}return matched;}});jQuery.fn.extend({has:function has(target){var targets=jQuery(target,this),l=targets.length;return this.filter(function(){var i=0;for(;i < l;i++) {if(jQuery.contains(this,targets[i])){return true;}}});},closest:function closest(selectors,context){var cur,i=0,l=this.length,matched=[],pos=rneedsContext.test(selectors) || typeof selectors !== "string"?jQuery(selectors,context || this.context):0;for(;i < l;i++) {for(cur = this[i];cur && cur !== context;cur = cur.parentNode) { // Always skip document fragments
if(cur.nodeType < 11 && (pos?pos.index(cur) > -1: // Don't pass non-elements to Sizzle
cur.nodeType === 1 && jQuery.find.matchesSelector(cur,selectors))){matched.push(cur);break;}}}return this.pushStack(matched.length > 1?jQuery.unique(matched):matched);}, // Determine the position of an element within the set
index:function index(elem){ // No argument, return index in parent
if(!elem){return this[0] && this[0].parentNode?this.first().prevAll().length:-1;} // Index in selector
if(typeof elem === "string"){return indexOf.call(jQuery(elem),this[0]);} // Locate the position of the desired element
return indexOf.call(this, // If it receives a jQuery object, the first element is used
elem.jquery?elem[0]:elem);},add:function add(selector,context){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),jQuery(selector,context))));},addBack:function addBack(selector){return this.add(selector == null?this.prevObject:this.prevObject.filter(selector));}});function sibling(cur,dir){while((cur = cur[dir]) && cur.nodeType !== 1) {}return cur;}jQuery.each({parent:function parent(elem){var parent=elem.parentNode;return parent && parent.nodeType !== 11?parent:null;},parents:function parents(elem){return jQuery.dir(elem,"parentNode");},parentsUntil:function parentsUntil(elem,i,until){return jQuery.dir(elem,"parentNode",until);},next:function next(elem){return sibling(elem,"nextSibling");},prev:function prev(elem){return sibling(elem,"previousSibling");},nextAll:function nextAll(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function prevAll(elem){return jQuery.dir(elem,"previousSibling");},nextUntil:function nextUntil(elem,i,until){return jQuery.dir(elem,"nextSibling",until);},prevUntil:function prevUntil(elem,i,until){return jQuery.dir(elem,"previousSibling",until);},siblings:function siblings(elem){return jQuery.sibling((elem.parentNode || {}).firstChild,elem);},children:function children(elem){return jQuery.sibling(elem.firstChild);},contents:function contents(elem){return elem.contentDocument || jQuery.merge([],elem.childNodes);}},function(name,fn){jQuery.fn[name] = function(until,selector){var matched=jQuery.map(this,fn,until);if(name.slice(-5) !== "Until"){selector = until;}if(selector && typeof selector === "string"){matched = jQuery.filter(selector,matched);}if(this.length > 1){ // Remove duplicates
if(!guaranteedUnique[name]){jQuery.unique(matched);} // Reverse order for parents* and prev-derivatives
if(rparentsprev.test(name)){matched.reverse();}}return this.pushStack(matched);};});var rnotwhite=/\S+/g; // String to Object options format cache
var optionsCache={}; // Convert String-formatted options into Object-formatted ones and store in cache
function createOptions(options){var object=optionsCache[options] = {};jQuery.each(options.match(rnotwhite) || [],function(_,flag){object[flag] = true;});return object;} /*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */jQuery.Callbacks = function(options){ // Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
options = typeof options === "string"?optionsCache[options] || createOptions(options):jQuery.extend({},options);var  // Last fire value (for non-forgettable lists)
memory, // Flag to know if list was already fired
_fired, // Flag to know if list is currently firing
firing, // First callback to fire (used internally by add and fireWith)
firingStart, // End of the loop when firing
firingLength, // Index of currently firing callback (modified by remove if needed)
firingIndex, // Actual callback list
list=[], // Stack of fire calls for repeatable lists
stack=!options.once && [], // Fire callbacks
fire=function fire(data){memory = options.memory && data;_fired = true;firingIndex = firingStart || 0;firingStart = 0;firingLength = list.length;firing = true;for(;list && firingIndex < firingLength;firingIndex++) {if(list[firingIndex].apply(data[0],data[1]) === false && options.stopOnFalse){memory = false; // To prevent further calls using add
break;}}firing = false;if(list){if(stack){if(stack.length){fire(stack.shift());}}else if(memory){list = [];}else {self.disable();}}}, // Actual Callbacks object
self={ // Add a callback or a collection of callbacks to the list
add:function add(){if(list){ // First, we save the current length
var start=list.length;(function add(args){jQuery.each(args,function(_,arg){var type=jQuery.type(arg);if(type === "function"){if(!options.unique || !self.has(arg)){list.push(arg);}}else if(arg && arg.length && type !== "string"){ // Inspect recursively
add(arg);}});})(arguments); // Do we need to add the callbacks to the
// current firing batch?
if(firing){firingLength = list.length; // With memory, if we're not firing then
// we should call right away
}else if(memory){firingStart = start;fire(memory);}}return this;}, // Remove a callback from the list
remove:function remove(){if(list){jQuery.each(arguments,function(_,arg){var index;while((index = jQuery.inArray(arg,list,index)) > -1) {list.splice(index,1); // Handle firing indexes
if(firing){if(index <= firingLength){firingLength--;}if(index <= firingIndex){firingIndex--;}}}});}return this;}, // Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function has(fn){return fn?jQuery.inArray(fn,list) > -1:!!(list && list.length);}, // Remove all callbacks from the list
empty:function empty(){list = [];firingLength = 0;return this;}, // Have the list do nothing anymore
disable:function disable(){list = stack = memory = undefined;return this;}, // Is it disabled?
disabled:function disabled(){return !list;}, // Lock the list in its current state
lock:function lock(){stack = undefined;if(!memory){self.disable();}return this;}, // Is it locked?
locked:function locked(){return !stack;}, // Call all callbacks with the given context and arguments
fireWith:function fireWith(context,args){if(list && (!_fired || stack)){args = args || [];args = [context,args.slice?args.slice():args];if(firing){stack.push(args);}else {fire(args);}}return this;}, // Call all the callbacks with the given arguments
fire:function fire(){self.fireWith(this,arguments);return this;}, // To know if the callbacks have already been called at least once
fired:function fired(){return !!_fired;}};return self;};jQuery.extend({Deferred:function Deferred(func){var tuples=[ // action, add listener, listener list, final state
["resolve","done",jQuery.Callbacks("once memory"),"resolved"],["reject","fail",jQuery.Callbacks("once memory"),"rejected"],["notify","progress",jQuery.Callbacks("memory")]],_state="pending",_promise={state:function state(){return _state;},always:function always(){deferred.done(arguments).fail(arguments);return this;},then:function then() /* fnDone, fnFail, fnProgress */{var fns=arguments;return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(i,tuple){var fn=jQuery.isFunction(fns[i]) && fns[i]; // deferred[ done | fail | progress ] for forwarding actions to newDefer
deferred[tuple[1]](function(){var returned=fn && fn.apply(this,arguments);if(returned && jQuery.isFunction(returned.promise)){returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);}else {newDefer[tuple[0] + "With"](this === _promise?newDefer.promise():this,fn?[returned]:arguments);}});});fns = null;}).promise();}, // Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function promise(obj){return obj != null?jQuery.extend(obj,_promise):_promise;}},deferred={}; // Keep pipe for back-compat
_promise.pipe = _promise.then; // Add list-specific methods
jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[3]; // promise[ done | fail | progress ] = list.add
_promise[tuple[1]] = list.add; // Handle state
if(stateString){list.add(function(){ // state = [ resolved | rejected ]
_state = stateString; // [ reject_list | resolve_list ].disable; progress_list.lock
},tuples[i ^ 1][2].disable,tuples[2][2].lock);} // deferred[ resolve | reject | notify ]
deferred[tuple[0]] = function(){deferred[tuple[0] + "With"](this === deferred?_promise:this,arguments);return this;};deferred[tuple[0] + "With"] = list.fireWith;}); // Make the deferred a promise
_promise.promise(deferred); // Call given func if any
if(func){func.call(deferred,deferred);} // All done!
return deferred;}, // Deferred helper
when:function when(subordinate /* , ..., subordinateN */){var i=0,resolveValues=_slice.call(arguments),length=resolveValues.length, // the count of uncompleted subordinates
remaining=length !== 1 || subordinate && jQuery.isFunction(subordinate.promise)?length:0, // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
deferred=remaining === 1?subordinate:jQuery.Deferred(), // Update function for both resolve and progress values
updateFunc=function updateFunc(i,contexts,values){return function(value){contexts[i] = this;values[i] = arguments.length > 1?_slice.call(arguments):value;if(values === progressValues){deferred.notifyWith(contexts,values);}else if(! --remaining){deferred.resolveWith(contexts,values);}};},progressValues,progressContexts,resolveContexts; // Add listeners to Deferred subordinates; treat others as resolved
if(length > 1){progressValues = new Array(length);progressContexts = new Array(length);resolveContexts = new Array(length);for(;i < length;i++) {if(resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)){resolveValues[i].promise().done(updateFunc(i,resolveContexts,resolveValues)).fail(deferred.reject).progress(updateFunc(i,progressContexts,progressValues));}else {--remaining;}}} // If we're not waiting on anything, resolve the master
if(!remaining){deferred.resolveWith(resolveContexts,resolveValues);}return deferred.promise();}}); // The deferred used on DOM ready
var readyList;jQuery.fn.ready = function(fn){ // Add the callback
jQuery.ready.promise().done(fn);return this;};jQuery.extend({ // Is the DOM ready to be used? Set to true once it occurs.
isReady:false, // A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait:1, // Hold (or release) the ready event
holdReady:function holdReady(hold){if(hold){jQuery.readyWait++;}else {jQuery.ready(true);}}, // Handle when the DOM is ready
ready:function ready(wait){ // Abort if there are pending holds or we're already ready
if(wait === true?--jQuery.readyWait:jQuery.isReady){return;} // Remember that the DOM is ready
jQuery.isReady = true; // If a normal DOM Ready event fired, decrement, and wait if need be
if(wait !== true && --jQuery.readyWait > 0){return;} // If there are functions bound, to execute
readyList.resolveWith(document,[jQuery]); // Trigger any bound ready events
if(jQuery.fn.triggerHandler){jQuery(document).triggerHandler("ready");jQuery(document).off("ready");}}}); /**
 * The ready event handler and self cleanup method
 */function completed(){document.removeEventListener("DOMContentLoaded",completed,false);window.removeEventListener("load",completed,false);jQuery.ready();}jQuery.ready.promise = function(obj){if(!readyList){readyList = jQuery.Deferred(); // Catch cases where $(document).ready() is called after the browser event has already occurred.
// We once tried to use readyState "interactive" here, but it caused issues like the one
// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
if(document.readyState === "complete"){ // Handle it asynchronously to allow scripts the opportunity to delay ready
setTimeout(jQuery.ready);}else { // Use the handy event callback
document.addEventListener("DOMContentLoaded",completed,false); // A fallback to window.onload, that will always work
window.addEventListener("load",completed,false);}}return readyList.promise(obj);}; // Kick off the DOM ready check even if the user does not
jQuery.ready.promise(); // Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access=jQuery.access = function(elems,fn,key,value,chainable,emptyGet,raw){var i=0,len=elems.length,bulk=key == null; // Sets many values
if(jQuery.type(key) === "object"){chainable = true;for(i in key) {jQuery.access(elems,fn,i,key[i],true,emptyGet,raw);} // Sets one value
}else if(value !== undefined){chainable = true;if(!jQuery.isFunction(value)){raw = true;}if(bulk){ // Bulk operations run against the entire set
if(raw){fn.call(elems,value);fn = null; // ...except when executing function values
}else {bulk = fn;fn = function(elem,key,value){return bulk.call(jQuery(elem),value);};}}if(fn){for(;i < len;i++) {fn(elems[i],key,raw?value:value.call(elems[i],i,fn(elems[i],key)));}}}return chainable?elems: // Gets
bulk?fn.call(elems):len?fn(elems[0],key):emptyGet;}; /**
 * Determines whether an object can have data
 */jQuery.acceptData = function(owner){ // Accepts only:
//  - Node
//    - Node.ELEMENT_NODE
//    - Node.DOCUMENT_NODE
//  - Object
//    - Any
/* jshint -W018 */return owner.nodeType === 1 || owner.nodeType === 9 || ! +owner.nodeType;};function Data(){ // Support: Android<4,
// Old WebKit does not have Object.preventExtensions/freeze method,
// return new empty object instead with no [[set]] accessor
Object.defineProperty(this.cache = {},0,{get:function get(){return {};}});this.expando = jQuery.expando + Data.uid++;}Data.uid = 1;Data.accepts = jQuery.acceptData;Data.prototype = {key:function key(owner){ // We can accept data for non-element nodes in modern browsers,
// but we should not, see #8335.
// Always return the key for a frozen object.
if(!Data.accepts(owner)){return 0;}var descriptor={}, // Check if the owner object already has a cache key
unlock=owner[this.expando]; // If not, create one
if(!unlock){unlock = Data.uid++; // Secure it in a non-enumerable, non-writable property
try{descriptor[this.expando] = {value:unlock};Object.defineProperties(owner,descriptor); // Support: Android<4
// Fallback to a less secure definition
}catch(e) {descriptor[this.expando] = unlock;jQuery.extend(owner,descriptor);}} // Ensure the cache object
if(!this.cache[unlock]){this.cache[unlock] = {};}return unlock;},set:function set(owner,data,value){var prop, // There may be an unlock assigned to this node,
// if there is no entry for this "owner", create one inline
// and set the unlock as though an owner entry had always existed
unlock=this.key(owner),cache=this.cache[unlock]; // Handle: [ owner, key, value ] args
if(typeof data === "string"){cache[data] = value; // Handle: [ owner, { properties } ] args
}else { // Fresh assignments by object are shallow copied
if(jQuery.isEmptyObject(cache)){jQuery.extend(this.cache[unlock],data); // Otherwise, copy the properties one-by-one to the cache object
}else {for(prop in data) {cache[prop] = data[prop];}}}return cache;},get:function get(owner,key){ // Either a valid cache is found, or will be created.
// New caches will be created and the unlock returned,
// allowing direct access to the newly created
// empty data object. A valid owner object must be provided.
var cache=this.cache[this.key(owner)];return key === undefined?cache:cache[key];},access:function access(owner,key,value){var stored; // In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
if(key === undefined || key && typeof key === "string" && value === undefined){stored = this.get(owner,key);return stored !== undefined?stored:this.get(owner,jQuery.camelCase(key));} // [*]When the key is not a string, or both a key and value
// are specified, set or extend (existing objects) with either:
//
//   1. An object of properties
//   2. A key and value
//
this.set(owner,key,value); // Since the "set" path can have two possible entry points
// return the expected data based on which path was taken[*]
return value !== undefined?value:key;},remove:function remove(owner,key){var i,name,camel,unlock=this.key(owner),cache=this.cache[unlock];if(key === undefined){this.cache[unlock] = {};}else { // Support array or space separated string of keys
if(jQuery.isArray(key)){ // If "name" is an array of keys...
// When data is initially created, via ("key", "val") signature,
// keys will be converted to camelCase.
// Since there is no way to tell _how_ a key was added, remove
// both plain key and camelCase key. #12786
// This will only penalize the array argument path.
name = key.concat(key.map(jQuery.camelCase));}else {camel = jQuery.camelCase(key); // Try the string as a key before any manipulation
if(key in cache){name = [key,camel];}else { // If a key with the spaces exists, use it.
// Otherwise, create an array by matching non-whitespace
name = camel;name = name in cache?[name]:name.match(rnotwhite) || [];}}i = name.length;while(i--) {delete cache[name[i]];}}},hasData:function hasData(owner){return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});},discard:function discard(owner){if(owner[this.expando]){delete this.cache[owner[this.expando]];}}};var data_priv=new Data();var data_user=new Data(); //	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
var rbrace=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,rmultiDash=/([A-Z])/g;function dataAttr(elem,key,data){var name; // If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(data === undefined && elem.nodeType === 1){name = "data-" + key.replace(rmultiDash,"-$1").toLowerCase();data = elem.getAttribute(name);if(typeof data === "string"){try{data = data === "true"?true:data === "false"?false:data === "null"?null: // Only convert to a number if it doesn't change the string
+data + "" === data?+data:rbrace.test(data)?jQuery.parseJSON(data):data;}catch(e) {} // Make sure we set the data so it isn't changed later
data_user.set(elem,key,data);}else {data = undefined;}}return data;}jQuery.extend({hasData:function hasData(elem){return data_user.hasData(elem) || data_priv.hasData(elem);},data:function data(elem,name,_data){return data_user.access(elem,name,_data);},removeData:function removeData(elem,name){data_user.remove(elem,name);}, // TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to data_priv methods, these can be deprecated.
_data:function _data(elem,name,data){return data_priv.access(elem,name,data);},_removeData:function _removeData(elem,name){data_priv.remove(elem,name);}});jQuery.fn.extend({data:function data(key,value){var i,name,data,elem=this[0],attrs=elem && elem.attributes; // Gets all values
if(key === undefined){if(this.length){data = data_user.get(elem);if(elem.nodeType === 1 && !data_priv.get(elem,"hasDataAttrs")){i = attrs.length;while(i--) { // Support: IE11+
// The attrs elements can be null (#14894)
if(attrs[i]){name = attrs[i].name;if(name.indexOf("data-") === 0){name = jQuery.camelCase(name.slice(5));dataAttr(elem,name,data[name]);}}}data_priv.set(elem,"hasDataAttrs",true);}}return data;} // Sets multiple values
if(typeof key === "object"){return this.each(function(){data_user.set(this,key);});}return access(this,function(value){var data,camelKey=jQuery.camelCase(key); // The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and the
// `value` parameter was not undefined. An empty jQuery object
// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is made.
if(elem && value === undefined){ // Attempt to get data from the cache
// with the key as-is
data = data_user.get(elem,key);if(data !== undefined){return data;} // Attempt to get data from the cache
// with the key camelized
data = data_user.get(elem,camelKey);if(data !== undefined){return data;} // Attempt to "discover" the data in
// HTML5 custom data-* attrs
data = dataAttr(elem,camelKey,undefined);if(data !== undefined){return data;} // We tried really hard, but the data doesn't exist.
return;} // Set the data...
this.each(function(){ // First, attempt to store a copy or reference of any
// data that might've been store with a camelCased key.
var data=data_user.get(this,camelKey); // For HTML5 data-* attribute interop, we have to
// store property names with dashes in a camelCase form.
// This might not apply to all properties...*
data_user.set(this,camelKey,value); // *... In the case of properties that might _actually_
// have dashes, we need to also store a copy of that
// unchanged property.
if(key.indexOf("-") !== -1 && data !== undefined){data_user.set(this,key,value);}});},null,value,arguments.length > 1,null,true);},removeData:function removeData(key){return this.each(function(){data_user.remove(this,key);});}});jQuery.extend({queue:function queue(elem,type,data){var queue;if(elem){type = (type || "fx") + "queue";queue = data_priv.get(elem,type); // Speed up dequeue by getting out quickly if this is just a lookup
if(data){if(!queue || jQuery.isArray(data)){queue = data_priv.access(elem,type,jQuery.makeArray(data));}else {queue.push(data);}}return queue || [];}},dequeue:function dequeue(elem,type){type = type || "fx";var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function next(){jQuery.dequeue(elem,type);}; // If the fx queue is dequeued, always remove the progress sentinel
if(fn === "inprogress"){fn = queue.shift();startLength--;}if(fn){ // Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
if(type === "fx"){queue.unshift("inprogress");} // Clear up the last queue stop function
delete hooks.stop;fn.call(elem,next,hooks);}if(!startLength && hooks){hooks.empty.fire();}}, // Not public - generate a queueHooks object, or return the current one
_queueHooks:function _queueHooks(elem,type){var key=type + "queueHooks";return data_priv.get(elem,key) || data_priv.access(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){data_priv.remove(elem,[type + "queue",key]);})});}});jQuery.fn.extend({queue:function queue(type,data){var setter=2;if(typeof type !== "string"){data = type;type = "fx";setter--;}if(arguments.length < setter){return jQuery.queue(this[0],type);}return data === undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data); // Ensure a hooks for this queue
jQuery._queueHooks(this,type);if(type === "fx" && queue[0] !== "inprogress"){jQuery.dequeue(this,type);}});},dequeue:function dequeue(type){return this.each(function(){jQuery.dequeue(this,type);});},clearQueue:function clearQueue(type){return this.queue(type || "fx",[]);}, // Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function promise(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function resolve(){if(! --count){defer.resolveWith(elements,[elements]);}};if(typeof type !== "string"){obj = type;type = undefined;}type = type || "fx";while(i--) {tmp = data_priv.get(elements[i],type + "queueHooks");if(tmp && tmp.empty){count++;tmp.empty.add(resolve);}}resolve();return defer.promise(obj);}});var pnum=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;var cssExpand=["Top","Right","Bottom","Left"];var isHidden=function isHidden(elem,el){ // isHidden might be called from jQuery#filter function;
// in that case, element will be second argument
elem = el || elem;return jQuery.css(elem,"display") === "none" || !jQuery.contains(elem.ownerDocument,elem);};var rcheckableType=/^(?:checkbox|radio)$/i;(function(){var fragment=document.createDocumentFragment(),div=fragment.appendChild(document.createElement("div")),input=document.createElement("input"); // Support: Safari<=5.1
// Check state lost if the name is set (#11217)
// Support: Windows Web Apps (WWA)
// `name` and `type` must use .setAttribute for WWA (#14901)
input.setAttribute("type","radio");input.setAttribute("checked","checked");input.setAttribute("name","t");div.appendChild(input); // Support: Safari<=5.1, Android<4.2
// Older WebKit doesn't clone checked state correctly in fragments
support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked; // Support: IE<=11+
// Make sure textarea (and checkbox) defaultValue is properly cloned
div.innerHTML = "<textarea>x</textarea>";support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;})();var strundefined=typeof undefined;support.focusinBubbles = "onfocusin" in window;var rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|pointer|contextmenu)|click/,rfocusMorph=/^(?:focusinfocus|focusoutblur)$/,rtypenamespace=/^([^.]*)(?:\.(.+)|)$/;function returnTrue(){return true;}function returnFalse(){return false;}function safeActiveElement(){try{return document.activeElement;}catch(err) {}} /*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */jQuery.event = {global:{},add:function add(elem,types,handler,data,selector){var handleObjIn,eventHandle,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=data_priv.get(elem); // Don't attach events to noData or text/comment nodes (but allow plain objects)
if(!elemData){return;} // Caller can pass in an object of custom data in lieu of the handler
if(handler.handler){handleObjIn = handler;handler = handleObjIn.handler;selector = handleObjIn.selector;} // Make sure that the handler has a unique ID, used to find/remove it later
if(!handler.guid){handler.guid = jQuery.guid++;} // Init the element's event structure and main handler, if this is the first
if(!(events = elemData.events)){events = elemData.events = {};}if(!(eventHandle = elemData.handle)){eventHandle = elemData.handle = function(e){ // Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type?jQuery.event.dispatch.apply(elem,arguments):undefined;};} // Handle multiple events separated by a space
types = (types || "").match(rnotwhite) || [""];t = types.length;while(t--) {tmp = rtypenamespace.exec(types[t]) || [];type = origType = tmp[1];namespaces = (tmp[2] || "").split(".").sort(); // There *must* be a type, no attaching namespace-only handlers
if(!type){continue;} // If event changes its type, use the special event handlers for the changed type
special = jQuery.event.special[type] || {}; // If selector defined, determine special event api type, otherwise given type
type = (selector?special.delegateType:special.bindType) || type; // Update special based on newly reset type
special = jQuery.event.special[type] || {}; // handleObj is passed to all event handlers
handleObj = jQuery.extend({type:type,origType:origType,data:data,handler:handler,guid:handler.guid,selector:selector,needsContext:selector && jQuery.expr.match.needsContext.test(selector),namespace:namespaces.join(".")},handleObjIn); // Init the event handler queue if we're the first
if(!(handlers = events[type])){handlers = events[type] = [];handlers.delegateCount = 0; // Only use addEventListener if the special events handler returns false
if(!special.setup || special.setup.call(elem,data,namespaces,eventHandle) === false){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false);}}}if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid = handler.guid;}} // Add to the element's handler list, delegates in front
if(selector){handlers.splice(handlers.delegateCount++,0,handleObj);}else {handlers.push(handleObj);} // Keep track of which events have ever been used, for event optimization
jQuery.event.global[type] = true;}}, // Detach an event or set of events from an element
remove:function remove(elem,types,handler,selector,mappedTypes){var j,origCount,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=data_priv.hasData(elem) && data_priv.get(elem);if(!elemData || !(events = elemData.events)){return;} // Once for each type.namespace in types; type may be omitted
types = (types || "").match(rnotwhite) || [""];t = types.length;while(t--) {tmp = rtypenamespace.exec(types[t]) || [];type = origType = tmp[1];namespaces = (tmp[2] || "").split(".").sort(); // Unbind all events (on this namespace, if provided) for the element
if(!type){for(type in events) {jQuery.event.remove(elem,type + types[t],handler,selector,true);}continue;}special = jQuery.event.special[type] || {};type = (selector?special.delegateType:special.bindType) || type;handlers = events[type] || [];tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"); // Remove matching events
origCount = j = handlers.length;while(j--) {handleObj = handlers[j];if((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)){handlers.splice(j,1);if(handleObj.selector){handlers.delegateCount--;}if(special.remove){special.remove.call(elem,handleObj);}}} // Remove generic event handler if we removed something and no more handlers exist
// (avoids potential for endless recursion during removal of special event handlers)
if(origCount && !handlers.length){if(!special.teardown || special.teardown.call(elem,namespaces,elemData.handle) === false){jQuery.removeEvent(elem,type,elemData.handle);}delete events[type];}} // Remove the expando if it's no longer used
if(jQuery.isEmptyObject(events)){delete elemData.handle;data_priv.remove(elem,"events");}},trigger:function trigger(event,data,elem,onlyHandlers){var i,cur,tmp,bubbleType,ontype,handle,special,eventPath=[elem || document],type=hasOwn.call(event,"type")?event.type:event,namespaces=hasOwn.call(event,"namespace")?event.namespace.split("."):[];cur = tmp = elem = elem || document; // Don't do events on text and comment nodes
if(elem.nodeType === 3 || elem.nodeType === 8){return;} // focus/blur morphs to focusin/out; ensure we're not firing them right now
if(rfocusMorph.test(type + jQuery.event.triggered)){return;}if(type.indexOf(".") >= 0){ // Namespaced trigger; create a regexp to match event type in handle()
namespaces = type.split(".");type = namespaces.shift();namespaces.sort();}ontype = type.indexOf(":") < 0 && "on" + type; // Caller can pass in a jQuery.Event object, Object, or just an event type string
event = event[jQuery.expando]?event:new jQuery.Event(type,typeof event === "object" && event); // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
event.isTrigger = onlyHandlers?2:3;event.namespace = namespaces.join(".");event.namespace_re = event.namespace?new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"):null; // Clean up the event in case it is being reused
event.result = undefined;if(!event.target){event.target = elem;} // Clone any incoming data and prepend the event, creating the handler arg list
data = data == null?[event]:jQuery.makeArray(data,[event]); // Allow special events to draw outside the lines
special = jQuery.event.special[type] || {};if(!onlyHandlers && special.trigger && special.trigger.apply(elem,data) === false){return;} // Determine event propagation path in advance, per W3C events spec (#9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
if(!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)){bubbleType = special.delegateType || type;if(!rfocusMorph.test(bubbleType + type)){cur = cur.parentNode;}for(;cur;cur = cur.parentNode) {eventPath.push(cur);tmp = cur;} // Only add window if we got to document (e.g., not plain obj or detached DOM)
if(tmp === (elem.ownerDocument || document)){eventPath.push(tmp.defaultView || tmp.parentWindow || window);}} // Fire handlers on the event path
i = 0;while((cur = eventPath[i++]) && !event.isPropagationStopped()) {event.type = i > 1?bubbleType:special.bindType || type; // jQuery handler
handle = (data_priv.get(cur,"events") || {})[event.type] && data_priv.get(cur,"handle");if(handle){handle.apply(cur,data);} // Native handler
handle = ontype && cur[ontype];if(handle && handle.apply && jQuery.acceptData(cur)){event.result = handle.apply(cur,data);if(event.result === false){event.preventDefault();}}}event.type = type; // If nobody prevented the default action, do it now
if(!onlyHandlers && !event.isDefaultPrevented()){if((!special._default || special._default.apply(eventPath.pop(),data) === false) && jQuery.acceptData(elem)){ // Call a native DOM method on the target with the same name name as the event.
// Don't do default actions on window, that's where global variables be (#6170)
if(ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)){ // Don't re-trigger an onFOO event when we call its FOO() method
tmp = elem[ontype];if(tmp){elem[ontype] = null;} // Prevent re-triggering of the same event, since we already bubbled it above
jQuery.event.triggered = type;elem[type]();jQuery.event.triggered = undefined;if(tmp){elem[ontype] = tmp;}}}}return event.result;},dispatch:function dispatch(event){ // Make a writable jQuery.Event from the native event object
event = jQuery.event.fix(event);var i,j,ret,matched,handleObj,handlerQueue=[],args=_slice.call(arguments),handlers=(data_priv.get(this,"events") || {})[event.type] || [],special=jQuery.event.special[event.type] || {}; // Use the fix-ed jQuery.Event rather than the (read-only) native event
args[0] = event;event.delegateTarget = this; // Call the preDispatch hook for the mapped type, and let it bail if desired
if(special.preDispatch && special.preDispatch.call(this,event) === false){return;} // Determine handlers
handlerQueue = jQuery.event.handlers.call(this,event,handlers); // Run delegates first; they may want to stop propagation beneath us
i = 0;while((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {event.currentTarget = matched.elem;j = 0;while((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) { // Triggered event must either 1) have no namespace, or 2) have namespace(s)
// a subset or equal to those in the bound event (both can have no namespace).
if(!event.namespace_re || event.namespace_re.test(handleObj.namespace)){event.handleObj = handleObj;event.data = handleObj.data;ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem,args);if(ret !== undefined){if((event.result = ret) === false){event.preventDefault();event.stopPropagation();}}}}} // Call the postDispatch hook for the mapped type
if(special.postDispatch){special.postDispatch.call(this,event);}return event.result;},handlers:function handlers(event,_handlers){var i,matches,sel,handleObj,handlerQueue=[],delegateCount=_handlers.delegateCount,cur=event.target; // Find delegate handlers
// Black-hole SVG <use> instance trees (#13180)
// Avoid non-left-click bubbling in Firefox (#3861)
if(delegateCount && cur.nodeType && (!event.button || event.type !== "click")){for(;cur !== this;cur = cur.parentNode || this) { // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
if(cur.disabled !== true || event.type !== "click"){matches = [];for(i = 0;i < delegateCount;i++) {handleObj = _handlers[i]; // Don't conflict with Object.prototype properties (#13203)
sel = handleObj.selector + " ";if(matches[sel] === undefined){matches[sel] = handleObj.needsContext?jQuery(sel,this).index(cur) >= 0:jQuery.find(sel,this,null,[cur]).length;}if(matches[sel]){matches.push(handleObj);}}if(matches.length){handlerQueue.push({elem:cur,handlers:matches});}}}} // Add the remaining (directly-bound) handlers
if(delegateCount < _handlers.length){handlerQueue.push({elem:this,handlers:_handlers.slice(delegateCount)});}return handlerQueue;}, // Includes some event props shared by KeyEvent and MouseEvent
props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function filter(event,original){ // Add which for key events
if(event.which == null){event.which = original.charCode != null?original.charCode:original.keyCode;}return event;}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function filter(event,original){var eventDoc,doc,body,button=original.button; // Calculate pageX/Y if missing and clientX/Y available
if(event.pageX == null && original.clientX != null){eventDoc = event.target.ownerDocument || document;doc = eventDoc.documentElement;body = eventDoc.body;event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);} // Add which for click: 1 === left; 2 === middle; 3 === right
// Note: button is not normalized, so don't use it
if(!event.which && button !== undefined){event.which = button & 1?1:button & 2?3:button & 4?2:0;}return event;}},fix:function fix(event){if(event[jQuery.expando]){return event;} // Create a writable copy of the event object and normalize some properties
var i,prop,copy,type=event.type,originalEvent=event,fixHook=this.fixHooks[type];if(!fixHook){this.fixHooks[type] = fixHook = rmouseEvent.test(type)?this.mouseHooks:rkeyEvent.test(type)?this.keyHooks:{};}copy = fixHook.props?this.props.concat(fixHook.props):this.props;event = new jQuery.Event(originalEvent);i = copy.length;while(i--) {prop = copy[i];event[prop] = originalEvent[prop];} // Support: Cordova 2.5 (WebKit) (#13255)
// All events should have a target; Cordova deviceready doesn't
if(!event.target){event.target = document;} // Support: Safari 6.0+, Chrome<28
// Target should not be a text node (#504, #13143)
if(event.target.nodeType === 3){event.target = event.target.parentNode;}return fixHook.filter?fixHook.filter(event,originalEvent):event;},special:{load:{ // Prevent triggered image.load events from bubbling to window.load
noBubble:true},focus:{ // Fire native event if possible so blur/focus sequence is correct
trigger:function trigger(){if(this !== safeActiveElement() && this.focus){this.focus();return false;}},delegateType:"focusin"},blur:{trigger:function trigger(){if(this === safeActiveElement() && this.blur){this.blur();return false;}},delegateType:"focusout"},click:{ // For checkbox, fire native event so checked state will be right
trigger:function trigger(){if(this.type === "checkbox" && this.click && jQuery.nodeName(this,"input")){this.click();return false;}}, // For cross-browser consistency, don't fire native .click() on links
_default:function _default(event){return jQuery.nodeName(event.target,"a");}},beforeunload:{postDispatch:function postDispatch(event){ // Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
if(event.result !== undefined && event.originalEvent){event.originalEvent.returnValue = event.result;}}}},simulate:function simulate(type,elem,event,bubble){ // Piggyback on a donor event to simulate a different one.
// Fake originalEvent to avoid donor's stopPropagation, but if the
// simulated event prevents default then we do the same on the donor.
var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true,originalEvent:{}});if(bubble){jQuery.event.trigger(e,null,elem);}else {jQuery.event.dispatch.call(elem,e);}if(e.isDefaultPrevented()){event.preventDefault();}}};jQuery.removeEvent = function(elem,type,handle){if(elem.removeEventListener){elem.removeEventListener(type,handle,false);}};jQuery.Event = function(src,props){ // Allow instantiation without the 'new' keyword
if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props);} // Event object
if(src && src.type){this.originalEvent = src;this.type = src.type; // Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&  // Support: Android<4.0
src.returnValue === false?returnTrue:returnFalse; // Event type
}else {this.type = src;} // Put explicitly provided properties onto the event object
if(props){jQuery.extend(this,props);} // Create a timestamp if incoming event doesn't have one
this.timeStamp = src && src.timeStamp || jQuery.now(); // Mark it as fixed
this[jQuery.expando] = true;}; // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse,preventDefault:function preventDefault(){var e=this.originalEvent;this.isDefaultPrevented = returnTrue;if(e && e.preventDefault){e.preventDefault();}},stopPropagation:function stopPropagation(){var e=this.originalEvent;this.isPropagationStopped = returnTrue;if(e && e.stopPropagation){e.stopPropagation();}},stopImmediatePropagation:function stopImmediatePropagation(){var e=this.originalEvent;this.isImmediatePropagationStopped = returnTrue;if(e && e.stopImmediatePropagation){e.stopImmediatePropagation();}this.stopPropagation();}}; // Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(orig,fix){jQuery.event.special[orig] = {delegateType:fix,bindType:fix,handle:function handle(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj; // For mousenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
if(!related || related !== target && !jQuery.contains(target,related)){event.type = handleObj.origType;ret = handleObj.handler.apply(this,arguments);event.type = fix;}return ret;}};}); // Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if(!support.focusinBubbles){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){ // Attach a single capturing handler on the document while someone wants focusin/focusout
var handler=function handler(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event),true);};jQuery.event.special[fix] = {setup:function setup(){var doc=this.ownerDocument || this,attaches=data_priv.access(doc,fix);if(!attaches){doc.addEventListener(orig,handler,true);}data_priv.access(doc,fix,(attaches || 0) + 1);},teardown:function teardown(){var doc=this.ownerDocument || this,attaches=data_priv.access(doc,fix) - 1;if(!attaches){doc.removeEventListener(orig,handler,true);data_priv.remove(doc,fix);}else {data_priv.access(doc,fix,attaches);}}};});}jQuery.fn.extend({on:function on(types,selector,data,fn, /*INTERNAL*/one){var origFn,type; // Types can be a map of types/handlers
if(typeof types === "object"){ // ( types-Object, selector, data )
if(typeof selector !== "string"){ // ( types-Object, data )
data = data || selector;selector = undefined;}for(type in types) {this.on(type,selector,data,types[type],one);}return this;}if(data == null && fn == null){ // ( types, fn )
fn = selector;data = selector = undefined;}else if(fn == null){if(typeof selector === "string"){ // ( types, selector, fn )
fn = data;data = undefined;}else { // ( types, data, fn )
fn = data;data = selector;selector = undefined;}}if(fn === false){fn = returnFalse;}else if(!fn){return this;}if(one === 1){origFn = fn;fn = function(event){ // Can use an empty set, since event contains the info
jQuery().off(event);return origFn.apply(this,arguments);}; // Use same guid so caller can remove using origFn
fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);}return this.each(function(){jQuery.event.add(this,types,fn,data,selector);});},one:function one(types,selector,data,fn){return this.on(types,selector,data,fn,1);},off:function off(types,selector,fn){var handleObj,type;if(types && types.preventDefault && types.handleObj){ // ( event )  dispatched jQuery.Event
handleObj = types.handleObj;jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType + "." + handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);return this;}if(typeof types === "object"){ // ( types-object [, selector] )
for(type in types) {this.off(type,selector,types[type]);}return this;}if(selector === false || typeof selector === "function"){ // ( types [, fn] )
fn = selector;selector = undefined;}if(fn === false){fn = returnFalse;}return this.each(function(){jQuery.event.remove(this,types,fn,selector);});},trigger:function trigger(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function triggerHandler(type,data){var elem=this[0];if(elem){return jQuery.event.trigger(type,data,elem,true);}}});var rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,rtagName=/<([\w:]+)/,rhtml=/<|&#?\w+;/,rnoInnerhtml=/<(?:script|style|link)/i, // checked="checked" or checked
rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptType=/^$|\/(?:java|ecma)script/i,rscriptTypeMasked=/^true\/(.*)/,rcleanScript=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, // We have to close these tags to support XHTML (#13200)
wrapMap={ // Support: IE9
option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]}; // Support: IE9
wrapMap.optgroup = wrapMap.option;wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;wrapMap.th = wrapMap.td; // Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget(elem,content){return jQuery.nodeName(elem,"table") && jQuery.nodeName(content.nodeType !== 11?content:content.firstChild,"tr")?elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")):elem;} // Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript(elem){elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;return elem;}function restoreScript(elem){var match=rscriptTypeMasked.exec(elem.type);if(match){elem.type = match[1];}else {elem.removeAttribute("type");}return elem;} // Mark scripts as having already been evaluated
function setGlobalEval(elems,refElements){var i=0,l=elems.length;for(;i < l;i++) {data_priv.set(elems[i],"globalEval",!refElements || data_priv.get(refElements[i],"globalEval"));}}function cloneCopyEvent(src,dest){var i,l,type,pdataOld,pdataCur,udataOld,udataCur,events;if(dest.nodeType !== 1){return;} // 1. Copy private data: events, handlers, etc.
if(data_priv.hasData(src)){pdataOld = data_priv.access(src);pdataCur = data_priv.set(dest,pdataOld);events = pdataOld.events;if(events){delete pdataCur.handle;pdataCur.events = {};for(type in events) {for(i = 0,l = events[type].length;i < l;i++) {jQuery.event.add(dest,type,events[type][i]);}}}} // 2. Copy user data
if(data_user.hasData(src)){udataOld = data_user.access(src);udataCur = jQuery.extend({},udataOld);data_user.set(dest,udataCur);}}function getAll(context,tag){var ret=context.getElementsByTagName?context.getElementsByTagName(tag || "*"):context.querySelectorAll?context.querySelectorAll(tag || "*"):[];return tag === undefined || tag && jQuery.nodeName(context,tag)?jQuery.merge([context],ret):ret;} // Fix IE bugs, see support tests
function fixInput(src,dest){var nodeName=dest.nodeName.toLowerCase(); // Fails to persist the checked state of a cloned checkbox or radio button.
if(nodeName === "input" && rcheckableType.test(src.type)){dest.checked = src.checked; // Fails to return the selected option to the default selected state when cloning options
}else if(nodeName === "input" || nodeName === "textarea"){dest.defaultValue = src.defaultValue;}}jQuery.extend({clone:function clone(elem,dataAndEvents,deepDataAndEvents){var i,l,srcElements,destElements,clone=elem.cloneNode(true),inPage=jQuery.contains(elem.ownerDocument,elem); // Fix IE cloning issues
if(!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)){ // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
destElements = getAll(clone);srcElements = getAll(elem);for(i = 0,l = srcElements.length;i < l;i++) {fixInput(srcElements[i],destElements[i]);}} // Copy the events from the original to the clone
if(dataAndEvents){if(deepDataAndEvents){srcElements = srcElements || getAll(elem);destElements = destElements || getAll(clone);for(i = 0,l = srcElements.length;i < l;i++) {cloneCopyEvent(srcElements[i],destElements[i]);}}else {cloneCopyEvent(elem,clone);}} // Preserve script evaluation history
destElements = getAll(clone,"script");if(destElements.length > 0){setGlobalEval(destElements,!inPage && getAll(elem,"script"));} // Return the cloned set
return clone;},buildFragment:function buildFragment(elems,context,scripts,selection){var elem,tmp,tag,wrap,contains,j,fragment=context.createDocumentFragment(),nodes=[],i=0,l=elems.length;for(;i < l;i++) {elem = elems[i];if(elem || elem === 0){ // Add nodes directly
if(jQuery.type(elem) === "object"){ // Support: QtWebKit, PhantomJS
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,elem.nodeType?[elem]:elem); // Convert non-html into a text node
}else if(!rhtml.test(elem)){nodes.push(context.createTextNode(elem)); // Convert html into DOM nodes
}else {tmp = tmp || fragment.appendChild(context.createElement("div")); // Deserialize a standard representation
tag = (rtagName.exec(elem) || ["",""])[1].toLowerCase();wrap = wrapMap[tag] || wrapMap._default;tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag,"<$1></$2>") + wrap[2]; // Descend through wrappers to the right content
j = wrap[0];while(j--) {tmp = tmp.lastChild;} // Support: QtWebKit, PhantomJS
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,tmp.childNodes); // Remember the top-level container
tmp = fragment.firstChild; // Ensure the created nodes are orphaned (#12392)
tmp.textContent = "";}}} // Remove wrapper from fragment
fragment.textContent = "";i = 0;while(elem = nodes[i++]) { // #4087 - If origin and destination elements are the same, and this is
// that element, do not do anything
if(selection && jQuery.inArray(elem,selection) !== -1){continue;}contains = jQuery.contains(elem.ownerDocument,elem); // Append to fragment
tmp = getAll(fragment.appendChild(elem),"script"); // Preserve script evaluation history
if(contains){setGlobalEval(tmp);} // Capture executables
if(scripts){j = 0;while(elem = tmp[j++]) {if(rscriptType.test(elem.type || "")){scripts.push(elem);}}}}return fragment;},cleanData:function cleanData(elems){var data,elem,type,key,special=jQuery.event.special,i=0;for(;(elem = elems[i]) !== undefined;i++) {if(jQuery.acceptData(elem)){key = elem[data_priv.expando];if(key && (data = data_priv.cache[key])){if(data.events){for(type in data.events) {if(special[type]){jQuery.event.remove(elem,type); // This is a shortcut to avoid jQuery.event.remove's overhead
}else {jQuery.removeEvent(elem,type,data.handle);}}}if(data_priv.cache[key]){ // Discard any remaining `private` data
delete data_priv.cache[key];}}} // Discard any remaining `user` data
delete data_user.cache[elem[data_user.expando]];}}});jQuery.fn.extend({text:function text(value){return access(this,function(value){return value === undefined?jQuery.text(this):this.empty().each(function(){if(this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9){this.textContent = value;}});},null,value,arguments.length);},append:function append(){return this.domManip(arguments,function(elem){if(this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9){var target=manipulationTarget(this,elem);target.appendChild(elem);}});},prepend:function prepend(){return this.domManip(arguments,function(elem){if(this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9){var target=manipulationTarget(this,elem);target.insertBefore(elem,target.firstChild);}});},before:function before(){return this.domManip(arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this);}});},after:function after(){return this.domManip(arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this.nextSibling);}});},remove:function remove(selector,keepData /* Internal Use Only */){var elem,elems=selector?jQuery.filter(selector,this):this,i=0;for(;(elem = elems[i]) != null;i++) {if(!keepData && elem.nodeType === 1){jQuery.cleanData(getAll(elem));}if(elem.parentNode){if(keepData && jQuery.contains(elem.ownerDocument,elem)){setGlobalEval(getAll(elem,"script"));}elem.parentNode.removeChild(elem);}}return this;},empty:function empty(){var elem,i=0;for(;(elem = this[i]) != null;i++) {if(elem.nodeType === 1){ // Prevent memory leaks
jQuery.cleanData(getAll(elem,false)); // Remove any remaining nodes
elem.textContent = "";}}return this;},clone:function clone(dataAndEvents,deepDataAndEvents){dataAndEvents = dataAndEvents == null?false:dataAndEvents;deepDataAndEvents = deepDataAndEvents == null?dataAndEvents:deepDataAndEvents;return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents);});},html:function html(value){return access(this,function(value){var elem=this[0] || {},i=0,l=this.length;if(value === undefined && elem.nodeType === 1){return elem.innerHTML;} // See if we can take a shortcut and just use innerHTML
if(typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["",""])[1].toLowerCase()]){value = value.replace(rxhtmlTag,"<$1></$2>");try{for(;i < l;i++) {elem = this[i] || {}; // Remove element nodes and prevent memory leaks
if(elem.nodeType === 1){jQuery.cleanData(getAll(elem,false));elem.innerHTML = value;}}elem = 0; // If using innerHTML throws an exception, use the fallback method
}catch(e) {}}if(elem){this.empty().append(value);}},null,value,arguments.length);},replaceWith:function replaceWith(){var arg=arguments[0]; // Make the changes, replacing each context element with the new content
this.domManip(arguments,function(elem){arg = this.parentNode;jQuery.cleanData(getAll(this));if(arg){arg.replaceChild(elem,this);}}); // Force removal if there was no new content (e.g., from empty arguments)
return arg && (arg.length || arg.nodeType)?this:this.remove();},detach:function detach(selector){return this.remove(selector,true);},domManip:function domManip(args,callback){ // Flatten any nested arrays
args = concat.apply([],args);var fragment,first,scripts,hasScripts,node,doc,i=0,l=this.length,set=this,iNoClone=l - 1,value=args[0],isFunction=jQuery.isFunction(value); // We can't cloneNode fragments that contain checked, in WebKit
if(isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)){return this.each(function(index){var self=set.eq(index);if(isFunction){args[0] = value.call(this,index,self.html());}self.domManip(args,callback);});}if(l){fragment = jQuery.buildFragment(args,this[0].ownerDocument,false,this);first = fragment.firstChild;if(fragment.childNodes.length === 1){fragment = first;}if(first){scripts = jQuery.map(getAll(fragment,"script"),disableScript);hasScripts = scripts.length; // Use the original fragment for the last item instead of the first because it can end up
// being emptied incorrectly in certain situations (#8070).
for(;i < l;i++) {node = fragment;if(i !== iNoClone){node = jQuery.clone(node,true,true); // Keep references to cloned scripts for later restoration
if(hasScripts){ // Support: QtWebKit
// jQuery.merge because push.apply(_, arraylike) throws
jQuery.merge(scripts,getAll(node,"script"));}}callback.call(this[i],node,i);}if(hasScripts){doc = scripts[scripts.length - 1].ownerDocument; // Reenable scripts
jQuery.map(scripts,restoreScript); // Evaluate executable scripts on first document insertion
for(i = 0;i < hasScripts;i++) {node = scripts[i];if(rscriptType.test(node.type || "") && !data_priv.access(node,"globalEval") && jQuery.contains(doc,node)){if(node.src){ // Optional AJAX dependency, but won't run scripts if not present
if(jQuery._evalUrl){jQuery._evalUrl(node.src);}}else {jQuery.globalEval(node.textContent.replace(rcleanScript,""));}}}}}}return this;}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name] = function(selector){var elems,ret=[],insert=jQuery(selector),last=insert.length - 1,i=0;for(;i <= last;i++) {elems = i === last?this:this.clone(true);jQuery(insert[i])[original](elems); // Support: QtWebKit
// .get() because push.apply(_, arraylike) throws
push.apply(ret,elems.get());}return this.pushStack(ret);};});var iframe,elemdisplay={}; /**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */ // Called only from within defaultDisplay
function actualDisplay(name,doc){var style,elem=jQuery(doc.createElement(name)).appendTo(doc.body), // getDefaultComputedStyle might be reliably used only on attached element
display=window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0]))? // Use of this method is a temporary fix (more like optimization) until something better comes along,
// since it was removed from specification and supported only in FF
style.display:jQuery.css(elem[0],"display"); // We don't have any data stored on the element,
// so use "detach" method as fast way to get rid of the element
elem.detach();return display;} /**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */function defaultDisplay(nodeName){var doc=document,display=elemdisplay[nodeName];if(!display){display = actualDisplay(nodeName,doc); // If the simple way fails, read from inside an iframe
if(display === "none" || !display){ // Use the already-created iframe if possible
iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement); // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
doc = iframe[0].contentDocument; // Support: IE
doc.write();doc.close();display = actualDisplay(nodeName,doc);iframe.detach();} // Store the correct default display
elemdisplay[nodeName] = display;}return display;}var rmargin=/^margin/;var rnumnonpx=new RegExp("^(" + pnum + ")(?!px)[a-z%]+$","i");var getStyles=function getStyles(elem){ // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
if(elem.ownerDocument.defaultView.opener){return elem.ownerDocument.defaultView.getComputedStyle(elem,null);}return window.getComputedStyle(elem,null);};function curCSS(elem,name,computed){var width,minWidth,maxWidth,ret,style=elem.style;computed = computed || getStyles(elem); // Support: IE9
// getPropertyValue is only needed for .css('filter') (#12537)
if(computed){ret = computed.getPropertyValue(name) || computed[name];}if(computed){if(ret === "" && !jQuery.contains(elem.ownerDocument,elem)){ret = jQuery.style(elem,name);} // Support: iOS < 6
// A tribute to the "awesome hack by Dean Edwards"
// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
if(rnumnonpx.test(ret) && rmargin.test(name)){ // Remember the original values
width = style.width;minWidth = style.minWidth;maxWidth = style.maxWidth; // Put in the new values to get a computed value out
style.minWidth = style.maxWidth = style.width = ret;ret = computed.width; // Revert the changed values
style.width = width;style.minWidth = minWidth;style.maxWidth = maxWidth;}}return ret !== undefined? // Support: IE
// IE returns zIndex value as an integer.
ret + "":ret;}function addGetHookIf(conditionFn,hookFn){ // Define the hook, we'll check on the first run if it's really needed.
return {get:function get(){if(conditionFn()){ // Hook not needed (or it's not possible to use it due
// to missing dependency), remove it.
delete this.get;return;} // Hook needed; redefine it so that the support test is not executed again.
return (this.get = hookFn).apply(this,arguments);}};}(function(){var pixelPositionVal,boxSizingReliableVal,docElem=document.documentElement,container=document.createElement("div"),div=document.createElement("div");if(!div.style){return;} // Support: IE9-11+
// Style of cloned element affects source element cloned (#8908)
div.style.backgroundClip = "content-box";div.cloneNode(true).style.backgroundClip = "";support.clearCloneStyle = div.style.backgroundClip === "content-box";container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" + "position:absolute";container.appendChild(div); // Executing both pixelPosition & boxSizingReliable tests require only one layout
// so they're executed at the same time to save the second computation.
function computePixelPositionAndBoxSizingReliable(){div.style.cssText =  // Support: Firefox<29, Android 2.3
// Vendor-prefix box-sizing
"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";div.innerHTML = "";docElem.appendChild(container);var divStyle=window.getComputedStyle(div,null);pixelPositionVal = divStyle.top !== "1%";boxSizingReliableVal = divStyle.width === "4px";docElem.removeChild(container);} // Support: node.js jsdom
// Don't assume that getComputedStyle is a property of the global object
if(window.getComputedStyle){jQuery.extend(support,{pixelPosition:function pixelPosition(){ // This test is executed only once but we still do memoizing
// since we can use the boxSizingReliable pre-computing.
// No need to check if the test was already performed, though.
computePixelPositionAndBoxSizingReliable();return pixelPositionVal;},boxSizingReliable:function boxSizingReliable(){if(boxSizingReliableVal == null){computePixelPositionAndBoxSizingReliable();}return boxSizingReliableVal;},reliableMarginRight:function reliableMarginRight(){ // Support: Android 2.3
// Check if div with explicit width and no margin-right incorrectly
// gets computed margin-right based on width of container. (#3333)
// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
// This support function is only executed once so no memoizing is needed.
var ret,marginDiv=div.appendChild(document.createElement("div")); // Reset CSS: box-sizing; display; margin; border; padding
marginDiv.style.cssText = div.style.cssText =  // Support: Firefox<29, Android 2.3
// Vendor-prefix box-sizing
"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";marginDiv.style.marginRight = marginDiv.style.width = "0";div.style.width = "1px";docElem.appendChild(container);ret = !parseFloat(window.getComputedStyle(marginDiv,null).marginRight);docElem.removeChild(container);div.removeChild(marginDiv);return ret;}});}})(); // A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function(elem,options,callback,args){var ret,name,old={}; // Remember the old values, and insert the new ones
for(name in options) {old[name] = elem.style[name];elem.style[name] = options[name];}ret = callback.apply(elem,args || []); // Revert the old values
for(name in options) {elem.style[name] = old[name];}return ret;};var  // Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
rdisplayswap=/^(none|table(?!-c[ea]).+)/,rnumsplit=new RegExp("^(" + pnum + ")(.*)$","i"),rrelNum=new RegExp("^([+-])=(" + pnum + ")","i"),cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:"0",fontWeight:"400"},cssPrefixes=["Webkit","O","Moz","ms"]; // Return a css property mapped to a potentially vendor prefixed property
function vendorPropName(style,name){ // Shortcut for names that are not vendor prefixed
if(name in style){return name;} // Check for vendor prefixed names
var capName=name[0].toUpperCase() + name.slice(1),origName=name,i=cssPrefixes.length;while(i--) {name = cssPrefixes[i] + capName;if(name in style){return name;}}return origName;}function setPositiveNumber(elem,value,subtract){var matches=rnumsplit.exec(value);return matches? // Guard against undefined "subtract", e.g., when used as in cssHooks
Math.max(0,matches[1] - (subtract || 0)) + (matches[2] || "px"):value;}function augmentWidthOrHeight(elem,name,extra,isBorderBox,styles){var i=extra === (isBorderBox?"border":"content")? // If we already have the right measurement, avoid augmentation
4: // Otherwise initialize for horizontal or vertical properties
name === "width"?1:0,val=0;for(;i < 4;i += 2) { // Both box models exclude margin, so add it if we want it
if(extra === "margin"){val += jQuery.css(elem,extra + cssExpand[i],true,styles);}if(isBorderBox){ // border-box includes padding, so remove it if we want content
if(extra === "content"){val -= jQuery.css(elem,"padding" + cssExpand[i],true,styles);} // At this point, extra isn't border nor margin, so remove border
if(extra !== "margin"){val -= jQuery.css(elem,"border" + cssExpand[i] + "Width",true,styles);}}else { // At this point, extra isn't content, so add padding
val += jQuery.css(elem,"padding" + cssExpand[i],true,styles); // At this point, extra isn't content nor padding, so add border
if(extra !== "padding"){val += jQuery.css(elem,"border" + cssExpand[i] + "Width",true,styles);}}}return val;}function getWidthOrHeight(elem,name,extra){ // Start with offset property, which is equivalent to the border-box value
var valueIsBorderBox=true,val=name === "width"?elem.offsetWidth:elem.offsetHeight,styles=getStyles(elem),isBorderBox=jQuery.css(elem,"boxSizing",false,styles) === "border-box"; // Some non-html elements return undefined for offsetWidth, so check for null/undefined
// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
if(val <= 0 || val == null){ // Fall back to computed then uncomputed css if necessary
val = curCSS(elem,name,styles);if(val < 0 || val == null){val = elem.style[name];} // Computed unit is not pixels. Stop here and return.
if(rnumnonpx.test(val)){return val;} // Check for style in case a browser which returns unreliable values
// for getComputedStyle silently falls back to the reliable elem.style
valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]); // Normalize "", auto, and prepare for extra
val = parseFloat(val) || 0;} // Use the active box-sizing model to add/subtract irrelevant styles
return val + augmentWidthOrHeight(elem,name,extra || (isBorderBox?"border":"content"),valueIsBorderBox,styles) + "px";}function showHide(elements,show){var display,elem,hidden,values=[],index=0,length=elements.length;for(;index < length;index++) {elem = elements[index];if(!elem.style){continue;}values[index] = data_priv.get(elem,"olddisplay");display = elem.style.display;if(show){ // Reset the inline display of this element to learn if it is
// being hidden by cascaded rules or not
if(!values[index] && display === "none"){elem.style.display = "";} // Set elements which have been overridden with display: none
// in a stylesheet to whatever the default browser style is
// for such an element
if(elem.style.display === "" && isHidden(elem)){values[index] = data_priv.access(elem,"olddisplay",defaultDisplay(elem.nodeName));}}else {hidden = isHidden(elem);if(display !== "none" || !hidden){data_priv.set(elem,"olddisplay",hidden?display:jQuery.css(elem,"display"));}}} // Set the display of most of the elements in a second loop
// to avoid the constant reflow
for(index = 0;index < length;index++) {elem = elements[index];if(!elem.style){continue;}if(!show || elem.style.display === "none" || elem.style.display === ""){elem.style.display = show?values[index] || "":"none";}}return elements;}jQuery.extend({ // Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function get(elem,computed){if(computed){ // We should always get a number back from opacity
var ret=curCSS(elem,"opacity");return ret === ""?"1":ret;}}}}, // Don't automatically add "px" to these possibly-unitless properties
cssNumber:{"columnCount":true,"fillOpacity":true,"flexGrow":true,"flexShrink":true,"fontWeight":true,"lineHeight":true,"opacity":true,"order":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true}, // Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{"float":"cssFloat"}, // Get and set the style property on a DOM Node
style:function style(elem,name,value,extra){ // Don't set styles on text and comment nodes
if(!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style){return;} // Make sure that we're working with the right name
var ret,type,hooks,origName=jQuery.camelCase(name),style=elem.style;name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style,origName)); // Gets hook for the prefixed version, then unprefixed version
hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]; // Check if we're setting a value
if(value !== undefined){type = typeof value; // Convert "+=" or "-=" to relative numbers (#7345)
if(type === "string" && (ret = rrelNum.exec(value))){value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem,name)); // Fixes bug #9237
type = "number";} // Make sure that null and NaN values aren't set (#7116)
if(value == null || value !== value){return;} // If a number, add 'px' to the (except for certain CSS properties)
if(type === "number" && !jQuery.cssNumber[origName]){value += "px";} // Support: IE9-11+
// background-* props affect original clone's values
if(!support.clearCloneStyle && value === "" && name.indexOf("background") === 0){style[name] = "inherit";} // If a hook was provided, use that value, otherwise just set the specified value
if(!hooks || !("set" in hooks) || (value = hooks.set(elem,value,extra)) !== undefined){style[name] = value;}}else { // If a hook was provided get the non-computed value from there
if(hooks && "get" in hooks && (ret = hooks.get(elem,false,extra)) !== undefined){return ret;} // Otherwise just get the value from the style object
return style[name];}},css:function css(elem,name,extra,styles){var val,num,hooks,origName=jQuery.camelCase(name); // Make sure that we're working with the right name
name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style,origName)); // Try prefixed name followed by the unprefixed name
hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]; // If a hook was provided get the computed value from there
if(hooks && "get" in hooks){val = hooks.get(elem,true,extra);} // Otherwise, if a way to get the computed value exists, use that
if(val === undefined){val = curCSS(elem,name,styles);} // Convert "normal" to computed value
if(val === "normal" && name in cssNormalTransform){val = cssNormalTransform[name];} // Make numeric if forced or a qualifier was provided and val looks numeric
if(extra === "" || extra){num = parseFloat(val);return extra === true || jQuery.isNumeric(num)?num || 0:val;}return val;}});jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name] = {get:function get(elem,computed,extra){if(computed){ // Certain elements can have dimension info if we invisibly show them
// but it must have a current display style that would benefit
return rdisplayswap.test(jQuery.css(elem,"display")) && elem.offsetWidth === 0?jQuery.swap(elem,cssShow,function(){return getWidthOrHeight(elem,name,extra);}):getWidthOrHeight(elem,name,extra);}},set:function set(elem,value,extra){var styles=extra && getStyles(elem);return setPositiveNumber(elem,value,extra?augmentWidthOrHeight(elem,name,extra,jQuery.css(elem,"boxSizing",false,styles) === "border-box",styles):0);}};}); // Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight,function(elem,computed){if(computed){return jQuery.swap(elem,{"display":"inline-block"},curCSS,[elem,"marginRight"]);}}); // These hooks are used by animate to expand properties
jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix + suffix] = {expand:function expand(value){var i=0,expanded={}, // Assumes a single number if not a string
parts=typeof value === "string"?value.split(" "):[value];for(;i < 4;i++) {expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];}return expanded;}};if(!rmargin.test(prefix)){jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;}});jQuery.fn.extend({css:function css(name,value){return access(this,function(elem,name,value){var styles,len,map={},i=0;if(jQuery.isArray(name)){styles = getStyles(elem);len = name.length;for(;i < len;i++) {map[name[i]] = jQuery.css(elem,name[i],false,styles);}return map;}return value !== undefined?jQuery.style(elem,name,value):jQuery.css(elem,name);},name,value,arguments.length > 1);},show:function show(){return showHide(this,true);},hide:function hide(){return showHide(this);},toggle:function toggle(state){if(typeof state === "boolean"){return state?this.show():this.hide();}return this.each(function(){if(isHidden(this)){jQuery(this).show();}else {jQuery(this).hide();}});}});function Tween(elem,options,prop,end,easing){return new Tween.prototype.init(elem,options,prop,end,easing);}jQuery.Tween = Tween;Tween.prototype = {constructor:Tween,init:function init(elem,options,prop,end,easing,unit){this.elem = elem;this.prop = prop;this.easing = easing || "swing";this.options = options;this.start = this.now = this.cur();this.end = end;this.unit = unit || (jQuery.cssNumber[prop]?"":"px");},cur:function cur(){var hooks=Tween.propHooks[this.prop];return hooks && hooks.get?hooks.get(this):Tween.propHooks._default.get(this);},run:function run(percent){var eased,hooks=Tween.propHooks[this.prop];if(this.options.duration){this.pos = eased = jQuery.easing[this.easing](percent,this.options.duration * percent,0,1,this.options.duration);}else {this.pos = eased = percent;}this.now = (this.end - this.start) * eased + this.start;if(this.options.step){this.options.step.call(this.elem,this.now,this);}if(hooks && hooks.set){hooks.set(this);}else {Tween.propHooks._default.set(this);}return this;}};Tween.prototype.init.prototype = Tween.prototype;Tween.propHooks = {_default:{get:function get(tween){var result;if(tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)){return tween.elem[tween.prop];} // Passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails.
// Simple values such as "10px" are parsed to Float;
// complex values such as "rotate(1rad)" are returned as-is.
result = jQuery.css(tween.elem,tween.prop,""); // Empty strings, null, undefined and "auto" are converted to 0.
return !result || result === "auto"?0:result;},set:function set(tween){ // Use step hook for back compat.
// Use cssHook if its there.
// Use .style if available and use plain properties where available.
if(jQuery.fx.step[tween.prop]){jQuery.fx.step[tween.prop](tween);}else if(tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])){jQuery.style(tween.elem,tween.prop,tween.now + tween.unit);}else {tween.elem[tween.prop] = tween.now;}}}}; // Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set:function set(tween){if(tween.elem.nodeType && tween.elem.parentNode){tween.elem[tween.prop] = tween.now;}}};jQuery.easing = {linear:function linear(p){return p;},swing:function swing(p){return 0.5 - Math.cos(p * Math.PI) / 2;}};jQuery.fx = Tween.prototype.init; // Back Compat <1.8 extension point
jQuery.fx.step = {};var fxNow,timerId,rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$","i"),rrun=/queueHooks$/,animationPrefilters=[defaultPrefilter],tweeners={"*":[function(prop,value){var tween=this.createTween(prop,value),target=tween.cur(),parts=rfxnum.exec(value),unit=parts && parts[3] || (jQuery.cssNumber[prop]?"":"px"), // Starting value computation is required for potential unit mismatches
start=(jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem,prop)),scale=1,maxIterations=20;if(start && start[3] !== unit){ // Trust units reported by jQuery.css
unit = unit || start[3]; // Make sure we update the tween properties later on
parts = parts || []; // Iteratively approximate from a nonzero starting point
start = +target || 1;do { // If previous iteration zeroed out, double until we get *something*.
// Use string for doubling so we don't accidentally see scale as unchanged below
scale = scale || ".5"; // Adjust and apply
start = start / scale;jQuery.style(tween.elem,prop,start + unit); // Update scale, tolerating zero or NaN from tween.cur(),
// break the loop if scale is unchanged or perfect, or if we've just had enough
}while(scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);} // Update tween properties
if(parts){start = tween.start = +start || +target || 0;tween.unit = unit; // If a +=/-= token was provided, we're doing a relative animation
tween.end = parts[1]?start + (parts[1] + 1) * parts[2]:+parts[2];}return tween;}]}; // Animations created synchronously will run synchronously
function createFxNow(){setTimeout(function(){fxNow = undefined;});return fxNow = jQuery.now();} // Generate parameters to create a standard animation
function genFx(type,includeWidth){var which,i=0,attrs={height:type}; // If we include width, step value is 1 to do all cssExpand values,
// otherwise step value is 2 to skip over Left and Right
includeWidth = includeWidth?1:0;for(;i < 4;i += 2 - includeWidth) {which = cssExpand[i];attrs["margin" + which] = attrs["padding" + which] = type;}if(includeWidth){attrs.opacity = attrs.width = type;}return attrs;}function createTween(value,prop,animation){var tween,collection=(tweeners[prop] || []).concat(tweeners["*"]),index=0,length=collection.length;for(;index < length;index++) {if(tween = collection[index].call(animation,prop,value)){ // We're done with this property
return tween;}}}function defaultPrefilter(elem,props,opts){ /* jshint validthis: true */var prop,value,toggle,tween,hooks,oldfire,display,checkDisplay,anim=this,orig={},style=elem.style,hidden=elem.nodeType && isHidden(elem),dataShow=data_priv.get(elem,"fxshow"); // Handle queue: false promises
if(!opts.queue){hooks = jQuery._queueHooks(elem,"fx");if(hooks.unqueued == null){hooks.unqueued = 0;oldfire = hooks.empty.fire;hooks.empty.fire = function(){if(!hooks.unqueued){oldfire();}};}hooks.unqueued++;anim.always(function(){ // Ensure the complete handler is called before this completes
anim.always(function(){hooks.unqueued--;if(!jQuery.queue(elem,"fx").length){hooks.empty.fire();}});});} // Height/width overflow pass
if(elem.nodeType === 1 && ("height" in props || "width" in props)){ // Make sure that nothing sneaks out
// Record all 3 overflow attributes because IE9-10 do not
// change the overflow attribute when overflowX and
// overflowY are set to the same value
opts.overflow = [style.overflow,style.overflowX,style.overflowY]; // Set display property to inline-block for height/width
// animations on inline elements that are having width/height animated
display = jQuery.css(elem,"display"); // Test default display if display is currently "none"
checkDisplay = display === "none"?data_priv.get(elem,"olddisplay") || defaultDisplay(elem.nodeName):display;if(checkDisplay === "inline" && jQuery.css(elem,"float") === "none"){style.display = "inline-block";}}if(opts.overflow){style.overflow = "hidden";anim.always(function(){style.overflow = opts.overflow[0];style.overflowX = opts.overflow[1];style.overflowY = opts.overflow[2];});} // show/hide pass
for(prop in props) {value = props[prop];if(rfxtypes.exec(value)){delete props[prop];toggle = toggle || value === "toggle";if(value === (hidden?"hide":"show")){ // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
if(value === "show" && dataShow && dataShow[prop] !== undefined){hidden = true;}else {continue;}}orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem,prop); // Any non-fx value stops us from restoring the original display value
}else {display = undefined;}}if(!jQuery.isEmptyObject(orig)){if(dataShow){if("hidden" in dataShow){hidden = dataShow.hidden;}}else {dataShow = data_priv.access(elem,"fxshow",{});} // Store state if its toggle - enables .stop().toggle() to "reverse"
if(toggle){dataShow.hidden = !hidden;}if(hidden){jQuery(elem).show();}else {anim.done(function(){jQuery(elem).hide();});}anim.done(function(){var prop;data_priv.remove(elem,"fxshow");for(prop in orig) {jQuery.style(elem,prop,orig[prop]);}});for(prop in orig) {tween = createTween(hidden?dataShow[prop]:0,prop,anim);if(!(prop in dataShow)){dataShow[prop] = tween.start;if(hidden){tween.end = tween.start;tween.start = prop === "width" || prop === "height"?1:0;}}} // If this is a noop like .hide().hide(), restore an overwritten display value
}else if((display === "none"?defaultDisplay(elem.nodeName):display) === "inline"){style.display = display;}}function propFilter(props,specialEasing){var index,name,easing,value,hooks; // camelCase, specialEasing and expand cssHook pass
for(index in props) {name = jQuery.camelCase(index);easing = specialEasing[name];value = props[index];if(jQuery.isArray(value)){easing = value[1];value = props[index] = value[0];}if(index !== name){props[name] = value;delete props[index];}hooks = jQuery.cssHooks[name];if(hooks && "expand" in hooks){value = hooks.expand(value);delete props[name]; // Not quite $.extend, this won't overwrite existing keys.
// Reusing 'index' because we have the correct "name"
for(index in value) {if(!(index in props)){props[index] = value[index];specialEasing[index] = easing;}}}else {specialEasing[name] = easing;}}}function Animation(elem,properties,options){var result,stopped,index=0,length=animationPrefilters.length,deferred=jQuery.Deferred().always(function(){ // Don't match elem in the :animated selector
delete tick.elem;}),tick=function tick(){if(stopped){return false;}var currentTime=fxNow || createFxNow(),remaining=Math.max(0,animation.startTime + animation.duration - currentTime), // Support: Android 2.3
// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
temp=remaining / animation.duration || 0,percent=1 - temp,index=0,length=animation.tweens.length;for(;index < length;index++) {animation.tweens[index].run(percent);}deferred.notifyWith(elem,[animation,percent,remaining]);if(percent < 1 && length){return remaining;}else {deferred.resolveWith(elem,[animation]);return false;}},animation=deferred.promise({elem:elem,props:jQuery.extend({},properties),opts:jQuery.extend(true,{specialEasing:{}},options),originalProperties:properties,originalOptions:options,startTime:fxNow || createFxNow(),duration:options.duration,tweens:[],createTween:function createTween(prop,end){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop] || animation.opts.easing);animation.tweens.push(tween);return tween;},stop:function stop(gotoEnd){var index=0, // If we are going to the end, we want to run all the tweens
// otherwise we skip this part
length=gotoEnd?animation.tweens.length:0;if(stopped){return this;}stopped = true;for(;index < length;index++) {animation.tweens[index].run(1);} // Resolve when we played the last frame; otherwise, reject
if(gotoEnd){deferred.resolveWith(elem,[animation,gotoEnd]);}else {deferred.rejectWith(elem,[animation,gotoEnd]);}return this;}}),props=animation.props;propFilter(props,animation.opts.specialEasing);for(;index < length;index++) {result = animationPrefilters[index].call(animation,elem,props,animation.opts);if(result){return result;}}jQuery.map(props,createTween,animation);if(jQuery.isFunction(animation.opts.start)){animation.opts.start.call(elem,animation);}jQuery.fx.timer(jQuery.extend(tick,{elem:elem,anim:animation,queue:animation.opts.queue})); // attach callbacks from options
return animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);}jQuery.Animation = jQuery.extend(Animation,{tweener:function tweener(props,callback){if(jQuery.isFunction(props)){callback = props;props = ["*"];}else {props = props.split(" ");}var prop,index=0,length=props.length;for(;index < length;index++) {prop = props[index];tweeners[prop] = tweeners[prop] || [];tweeners[prop].unshift(callback);}},prefilter:function prefilter(callback,prepend){if(prepend){animationPrefilters.unshift(callback);}else {animationPrefilters.push(callback);}}});jQuery.speed = function(speed,easing,fn){var opt=speed && typeof speed === "object"?jQuery.extend({},speed):{complete:fn || !fn && easing || jQuery.isFunction(speed) && speed,duration:speed,easing:fn && easing || easing && !jQuery.isFunction(easing) && easing};opt.duration = jQuery.fx.off?0:typeof opt.duration === "number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default; // Normalize opt.queue - true/undefined/null -> "fx"
if(opt.queue == null || opt.queue === true){opt.queue = "fx";} // Queueing
opt.old = opt.complete;opt.complete = function(){if(jQuery.isFunction(opt.old)){opt.old.call(this);}if(opt.queue){jQuery.dequeue(this,opt.queue);}};return opt;};jQuery.fn.extend({fadeTo:function fadeTo(speed,to,easing,callback){ // Show any hidden elements after setting opacity to 0
return this.filter(isHidden).css("opacity",0).show() // Animate to the value specified
.end().animate({opacity:to},speed,easing,callback);},animate:function animate(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function doAnimation(){ // Operate on a copy of prop so per-property easing won't be lost
var anim=Animation(this,jQuery.extend({},prop),optall); // Empty animations, or finishing resolves immediately
if(empty || data_priv.get(this,"finish")){anim.stop(true);}};doAnimation.finish = doAnimation;return empty || optall.queue === false?this.each(doAnimation):this.queue(optall.queue,doAnimation);},stop:function stop(type,clearQueue,gotoEnd){var stopQueue=function stopQueue(hooks){var stop=hooks.stop;delete hooks.stop;stop(gotoEnd);};if(typeof type !== "string"){gotoEnd = clearQueue;clearQueue = type;type = undefined;}if(clearQueue && type !== false){this.queue(type || "fx",[]);}return this.each(function(){var dequeue=true,index=type != null && type + "queueHooks",timers=jQuery.timers,data=data_priv.get(this);if(index){if(data[index] && data[index].stop){stopQueue(data[index]);}}else {for(index in data) {if(data[index] && data[index].stop && rrun.test(index)){stopQueue(data[index]);}}}for(index = timers.length;index--;) {if(timers[index].elem === this && (type == null || timers[index].queue === type)){timers[index].anim.stop(gotoEnd);dequeue = false;timers.splice(index,1);}} // Start the next in the queue if the last step wasn't forced.
// Timers currently will call their complete callbacks, which
// will dequeue but only if they were gotoEnd.
if(dequeue || !gotoEnd){jQuery.dequeue(this,type);}});},finish:function finish(type){if(type !== false){type = type || "fx";}return this.each(function(){var index,data=data_priv.get(this),queue=data[type + "queue"],hooks=data[type + "queueHooks"],timers=jQuery.timers,length=queue?queue.length:0; // Enable finishing flag on private data
data.finish = true; // Empty the queue first
jQuery.queue(this,type,[]);if(hooks && hooks.stop){hooks.stop.call(this,true);} // Look for any active animations, and finish them
for(index = timers.length;index--;) {if(timers[index].elem === this && timers[index].queue === type){timers[index].anim.stop(true);timers.splice(index,1);}} // Look for any animations in the old queue and finish them
for(index = 0;index < length;index++) {if(queue[index] && queue[index].finish){queue[index].finish.call(this);}} // Turn off finishing flag
delete data.finish;});}});jQuery.each(["toggle","show","hide"],function(i,name){var cssFn=jQuery.fn[name];jQuery.fn[name] = function(speed,easing,callback){return speed == null || typeof speed === "boolean"?cssFn.apply(this,arguments):this.animate(genFx(name,true),speed,easing,callback);};}); // Generate shortcuts for custom animations
jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name] = function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.timers = [];jQuery.fx.tick = function(){var timer,i=0,timers=jQuery.timers;fxNow = jQuery.now();for(;i < timers.length;i++) {timer = timers[i]; // Checks the timer has not already been removed
if(!timer() && timers[i] === timer){timers.splice(i--,1);}}if(!timers.length){jQuery.fx.stop();}fxNow = undefined;};jQuery.fx.timer = function(timer){jQuery.timers.push(timer);if(timer()){jQuery.fx.start();}else {jQuery.timers.pop();}};jQuery.fx.interval = 13;jQuery.fx.start = function(){if(!timerId){timerId = setInterval(jQuery.fx.tick,jQuery.fx.interval);}};jQuery.fx.stop = function(){clearInterval(timerId);timerId = null;};jQuery.fx.speeds = {slow:600,fast:200, // Default speed
_default:400}; // Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function(time,type){time = jQuery.fx?jQuery.fx.speeds[time] || time:time;type = type || "fx";return this.queue(type,function(next,hooks){var timeout=setTimeout(next,time);hooks.stop = function(){clearTimeout(timeout);};});};(function(){var input=document.createElement("input"),select=document.createElement("select"),opt=select.appendChild(document.createElement("option"));input.type = "checkbox"; // Support: iOS<=5.1, Android<=4.2+
// Default value for a checkbox should be "on"
support.checkOn = input.value !== ""; // Support: IE<=11+
// Must access selectedIndex to make default options select
support.optSelected = opt.selected; // Support: Android<=2.3
// Options inside disabled selects are incorrectly marked as disabled
select.disabled = true;support.optDisabled = !opt.disabled; // Support: IE<=11+
// An input loses its value after becoming a radio
input = document.createElement("input");input.value = "t";input.type = "radio";support.radioValue = input.value === "t";})();var nodeHook,boolHook,attrHandle=jQuery.expr.attrHandle;jQuery.fn.extend({attr:function attr(name,value){return access(this,jQuery.attr,name,value,arguments.length > 1);},removeAttr:function removeAttr(name){return this.each(function(){jQuery.removeAttr(this,name);});}});jQuery.extend({attr:function attr(elem,name,value){var hooks,ret,nType=elem.nodeType; // don't get/set attributes on text, comment and attribute nodes
if(!elem || nType === 3 || nType === 8 || nType === 2){return;} // Fallback to prop when attributes are not supported
if(typeof elem.getAttribute === strundefined){return jQuery.prop(elem,name,value);} // All attributes are lowercase
// Grab necessary hook if one is defined
if(nType !== 1 || !jQuery.isXMLDoc(elem)){name = name.toLowerCase();hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name)?boolHook:nodeHook);}if(value !== undefined){if(value === null){jQuery.removeAttr(elem,name);}else if(hooks && "set" in hooks && (ret = hooks.set(elem,value,name)) !== undefined){return ret;}else {elem.setAttribute(name,value + "");return value;}}else if(hooks && "get" in hooks && (ret = hooks.get(elem,name)) !== null){return ret;}else {ret = jQuery.find.attr(elem,name); // Non-existent attributes return null, we normalize to undefined
return ret == null?undefined:ret;}},removeAttr:function removeAttr(elem,value){var name,propName,i=0,attrNames=value && value.match(rnotwhite);if(attrNames && elem.nodeType === 1){while(name = attrNames[i++]) {propName = jQuery.propFix[name] || name; // Boolean attributes get special treatment (#10870)
if(jQuery.expr.match.bool.test(name)){ // Set corresponding property to false
elem[propName] = false;}elem.removeAttribute(name);}}},attrHooks:{type:{set:function set(elem,value){if(!support.radioValue && value === "radio" && jQuery.nodeName(elem,"input")){var val=elem.value;elem.setAttribute("type",value);if(val){elem.value = val;}return value;}}}}}); // Hooks for boolean attributes
boolHook = {set:function set(elem,value,name){if(value === false){ // Remove boolean attributes when set to false
jQuery.removeAttr(elem,name);}else {elem.setAttribute(name,name);}return name;}};jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g),function(i,name){var getter=attrHandle[name] || jQuery.find.attr;attrHandle[name] = function(elem,name,isXML){var ret,handle;if(!isXML){ // Avoid an infinite loop by temporarily removing this function from the getter
handle = attrHandle[name];attrHandle[name] = ret;ret = getter(elem,name,isXML) != null?name.toLowerCase():null;attrHandle[name] = handle;}return ret;};});var rfocusable=/^(?:input|select|textarea|button)$/i;jQuery.fn.extend({prop:function prop(name,value){return access(this,jQuery.prop,name,value,arguments.length > 1);},removeProp:function removeProp(name){return this.each(function(){delete this[jQuery.propFix[name] || name];});}});jQuery.extend({propFix:{"for":"htmlFor","class":"className"},prop:function prop(elem,name,value){var ret,hooks,notxml,nType=elem.nodeType; // Don't get/set properties on text, comment and attribute nodes
if(!elem || nType === 3 || nType === 8 || nType === 2){return;}notxml = nType !== 1 || !jQuery.isXMLDoc(elem);if(notxml){ // Fix name and attach hooks
name = jQuery.propFix[name] || name;hooks = jQuery.propHooks[name];}if(value !== undefined){return hooks && "set" in hooks && (ret = hooks.set(elem,value,name)) !== undefined?ret:elem[name] = value;}else {return hooks && "get" in hooks && (ret = hooks.get(elem,name)) !== null?ret:elem[name];}},propHooks:{tabIndex:{get:function get(elem){return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href?elem.tabIndex:-1;}}}});if(!support.optSelected){jQuery.propHooks.selected = {get:function get(elem){var parent=elem.parentNode;if(parent && parent.parentNode){parent.parentNode.selectedIndex;}return null;}};}jQuery.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){jQuery.propFix[this.toLowerCase()] = this;});var rclass=/[\t\r\n\f]/g;jQuery.fn.extend({addClass:function addClass(value){var classes,elem,cur,clazz,j,finalValue,proceed=typeof value === "string" && value,i=0,len=this.length;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,this.className));});}if(proceed){ // The disjunction here is for better compressibility (see removeClass)
classes = (value || "").match(rnotwhite) || [];for(;i < len;i++) {elem = this[i];cur = elem.nodeType === 1 && (elem.className?(" " + elem.className + " ").replace(rclass," "):" ");if(cur){j = 0;while(clazz = classes[j++]) {if(cur.indexOf(" " + clazz + " ") < 0){cur += clazz + " ";}} // only assign if different to avoid unneeded rendering.
finalValue = jQuery.trim(cur);if(elem.className !== finalValue){elem.className = finalValue;}}}}return this;},removeClass:function removeClass(value){var classes,elem,cur,clazz,j,finalValue,proceed=arguments.length === 0 || typeof value === "string" && value,i=0,len=this.length;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,this.className));});}if(proceed){classes = (value || "").match(rnotwhite) || [];for(;i < len;i++) {elem = this[i]; // This expression is here for better compressibility (see addClass)
cur = elem.nodeType === 1 && (elem.className?(" " + elem.className + " ").replace(rclass," "):"");if(cur){j = 0;while(clazz = classes[j++]) { // Remove *all* instances
while(cur.indexOf(" " + clazz + " ") >= 0) {cur = cur.replace(" " + clazz + " "," ");}} // Only assign if different to avoid unneeded rendering.
finalValue = value?jQuery.trim(cur):"";if(elem.className !== finalValue){elem.className = finalValue;}}}}return this;},toggleClass:function toggleClass(value,stateVal){var type=typeof value;if(typeof stateVal === "boolean" && type === "string"){return stateVal?this.addClass(value):this.removeClass(value);}if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,this.className,stateVal),stateVal);});}return this.each(function(){if(type === "string"){ // Toggle individual class names
var className,i=0,self=jQuery(this),classNames=value.match(rnotwhite) || [];while(className = classNames[i++]) { // Check each className given, space separated list
if(self.hasClass(className)){self.removeClass(className);}else {self.addClass(className);}} // Toggle whole class name
}else if(type === strundefined || type === "boolean"){if(this.className){ // store className if set
data_priv.set(this,"__className__",this.className);} // If the element has a class name or if we're passed `false`,
// then remove the whole classname (if there was one, the above saved it).
// Otherwise bring back whatever was previously saved (if anything),
// falling back to the empty string if nothing was stored.
this.className = this.className || value === false?"":data_priv.get(this,"__className__") || "";}});},hasClass:function hasClass(selector){var className=" " + selector + " ",i=0,l=this.length;for(;i < l;i++) {if(this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass," ").indexOf(className) >= 0){return true;}}return false;}});var rreturn=/\r/g;jQuery.fn.extend({val:function val(value){var hooks,ret,isFunction,elem=this[0];if(!arguments.length){if(elem){hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];if(hooks && "get" in hooks && (ret = hooks.get(elem,"value")) !== undefined){return ret;}ret = elem.value;return typeof ret === "string"? // Handle most common string cases
ret.replace(rreturn,""): // Handle cases where value is null/undef or number
ret == null?"":ret;}return;}isFunction = jQuery.isFunction(value);return this.each(function(i){var val;if(this.nodeType !== 1){return;}if(isFunction){val = value.call(this,i,jQuery(this).val());}else {val = value;} // Treat null/undefined as ""; convert numbers to string
if(val == null){val = "";}else if(typeof val === "number"){val += "";}else if(jQuery.isArray(val)){val = jQuery.map(val,function(value){return value == null?"":value + "";});}hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]; // If set returns undefined, fall back to normal setting
if(!hooks || !("set" in hooks) || hooks.set(this,val,"value") === undefined){this.value = val;}});}});jQuery.extend({valHooks:{option:{get:function get(elem){var val=jQuery.find.attr(elem,"value");return val != null?val: // Support: IE10-11+
// option.text throws exceptions (#14686, #14858)
jQuery.trim(jQuery.text(elem));}},select:{get:function get(elem){var value,option,options=elem.options,index=elem.selectedIndex,one=elem.type === "select-one" || index < 0,values=one?null:[],max=one?index + 1:options.length,i=index < 0?max:one?index:0; // Loop through all the selected options
for(;i < max;i++) {option = options[i]; // IE6-9 doesn't update selected after form reset (#2551)
if((option.selected || i === index) && ( // Don't return options that are disabled or in a disabled optgroup
support.optDisabled?!option.disabled:option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode,"optgroup"))){ // Get the specific value for the option
value = jQuery(option).val(); // We don't need an array for one selects
if(one){return value;} // Multi-Selects return an array
values.push(value);}}return values;},set:function set(elem,value){var optionSet,option,options=elem.options,values=jQuery.makeArray(value),i=options.length;while(i--) {option = options[i];if(option.selected = jQuery.inArray(option.value,values) >= 0){optionSet = true;}} // Force browsers to behave consistently when non-matching value is set
if(!optionSet){elem.selectedIndex = -1;}return values;}}}}); // Radios and checkboxes getter/setter
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this] = {set:function set(elem,value){if(jQuery.isArray(value)){return elem.checked = jQuery.inArray(jQuery(elem).val(),value) >= 0;}}};if(!support.checkOn){jQuery.valHooks[this].get = function(elem){return elem.getAttribute("value") === null?"on":elem.value;};}}); // Return jQuery for attributes-only inclusion
jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "),function(i,name){ // Handle event binding
jQuery.fn[name] = function(data,fn){return arguments.length > 0?this.on(name,null,data,fn):this.trigger(name);};});jQuery.fn.extend({hover:function hover(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);},bind:function bind(types,data,fn){return this.on(types,null,data,fn);},unbind:function unbind(types,fn){return this.off(types,null,fn);},delegate:function delegate(selector,types,data,fn){return this.on(types,selector,data,fn);},undelegate:function undelegate(selector,types,fn){ // ( namespace ) or ( selector, types [, fn] )
return arguments.length === 1?this.off(selector,"**"):this.off(types,selector || "**",fn);}});var nonce=jQuery.now();var rquery=/\?/; // Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function(data){return JSON.parse(data + "");}; // Cross-browser xml parsing
jQuery.parseXML = function(data){var xml,tmp;if(!data || typeof data !== "string"){return null;} // Support: IE9
try{tmp = new DOMParser();xml = tmp.parseFromString(data,"text/xml");}catch(e) {xml = undefined;}if(!xml || xml.getElementsByTagName("parsererror").length){jQuery.error("Invalid XML: " + data);}return xml;};var rhash=/#.*$/,rts=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)$/mg, // #7653, #8125, #8152: local protocol detection
rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rurl=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, /* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */prefilters={}, /* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */transports={}, // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
allTypes="*/".concat("*"), // Document location
ajaxLocation=window.location.href, // Segment location into parts
ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase()) || []; // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports(structure){ // dataTypeExpression is optional and defaults to "*"
return function(dataTypeExpression,func){if(typeof dataTypeExpression !== "string"){func = dataTypeExpression;dataTypeExpression = "*";}var dataType,i=0,dataTypes=dataTypeExpression.toLowerCase().match(rnotwhite) || [];if(jQuery.isFunction(func)){ // For each dataType in the dataTypeExpression
while(dataType = dataTypes[i++]) { // Prepend if requested
if(dataType[0] === "+"){dataType = dataType.slice(1) || "*";(structure[dataType] = structure[dataType] || []).unshift(func); // Otherwise append
}else {(structure[dataType] = structure[dataType] || []).push(func);}}}};} // Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR){var inspected={},seekingTransport=structure === transports;function inspect(dataType){var selected;inspected[dataType] = true;jQuery.each(structure[dataType] || [],function(_,prefilterOrFactory){var dataTypeOrTransport=prefilterOrFactory(options,originalOptions,jqXHR);if(typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]){options.dataTypes.unshift(dataTypeOrTransport);inspect(dataTypeOrTransport);return false;}else if(seekingTransport){return !(selected = dataTypeOrTransport);}});return selected;}return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");} // A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions || {};for(key in src) {if(src[key] !== undefined){(flatOptions[key]?target:deep || (deep = {}))[key] = src[key];}}if(deep){jQuery.extend(true,target,deep);}return target;} /* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */function ajaxHandleResponses(s,jqXHR,responses){var ct,type,finalDataType,firstDataType,contents=s.contents,dataTypes=s.dataTypes; // Remove auto dataType and get content-type in the process
while(dataTypes[0] === "*") {dataTypes.shift();if(ct === undefined){ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");}} // Check if we're dealing with a known content-type
if(ct){for(type in contents) {if(contents[type] && contents[type].test(ct)){dataTypes.unshift(type);break;}}} // Check to see if we have a response for the expected dataType
if(dataTypes[0] in responses){finalDataType = dataTypes[0];}else { // Try convertible dataTypes
for(type in responses) {if(!dataTypes[0] || s.converters[type + " " + dataTypes[0]]){finalDataType = type;break;}if(!firstDataType){firstDataType = type;}} // Or just use first one
finalDataType = finalDataType || firstDataType;} // If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
if(finalDataType){if(finalDataType !== dataTypes[0]){dataTypes.unshift(finalDataType);}return responses[finalDataType];}} /* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */function ajaxConvert(s,response,jqXHR,isSuccess){var conv2,current,conv,tmp,prev,converters={}, // Work with a copy of dataTypes in case we need to modify it for conversion
dataTypes=s.dataTypes.slice(); // Create converters map with lowercased keys
if(dataTypes[1]){for(conv in s.converters) {converters[conv.toLowerCase()] = s.converters[conv];}}current = dataTypes.shift(); // Convert to each sequential dataType
while(current) {if(s.responseFields[current]){jqXHR[s.responseFields[current]] = response;} // Apply the dataFilter if provided
if(!prev && isSuccess && s.dataFilter){response = s.dataFilter(response,s.dataType);}prev = current;current = dataTypes.shift();if(current){ // There's only work to do if current dataType is non-auto
if(current === "*"){current = prev; // Convert response if prev dataType is non-auto and differs from current
}else if(prev !== "*" && prev !== current){ // Seek a direct converter
conv = converters[prev + " " + current] || converters["* " + current]; // If none found, seek a pair
if(!conv){for(conv2 in converters) { // If conv2 outputs current
tmp = conv2.split(" ");if(tmp[1] === current){ // If prev can be converted to accepted input
conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];if(conv){ // Condense equivalence converters
if(conv === true){conv = converters[conv2]; // Otherwise, insert the intermediate dataType
}else if(converters[conv2] !== true){current = tmp[0];dataTypes.unshift(tmp[1]);}break;}}}} // Apply converter (if not an equivalence)
if(conv !== true){ // Unless errors are allowed to bubble, catch and return them
if(conv && s["throws"]){response = conv(response);}else {try{response = conv(response);}catch(e) {return {state:"parsererror",error:conv?e:"No conversion from " + prev + " to " + current};}}}}}}return {state:"success",data:response};}jQuery.extend({ // Counter for holding the number of active queries
active:0, // Last-Modified header cache for next request
lastModified:{},etag:{},ajaxSettings:{url:ajaxLocation,type:"GET",isLocal:rlocalProtocol.test(ajaxLocParts[1]),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8", /*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/accepts:{"*":allTypes,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"}, // Data converters
// Keys separate source (or catchall "*") and destination types with a single space
converters:{ // Convert anything to text
"* text":String, // Text to html (true = no transformation)
"text html":true, // Evaluate text as a json expression
"text json":jQuery.parseJSON, // Parse text as xml
"text xml":jQuery.parseXML}, // For options that shouldn't be deep extended:
// you can add your own custom options here if
// and when you create one that shouldn't be
// deep extended (see ajaxExtend)
flatOptions:{url:true,context:true}}, // Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function ajaxSetup(target,settings){return settings? // Building a settings object
ajaxExtend(ajaxExtend(target,jQuery.ajaxSettings),settings): // Extending ajaxSettings
ajaxExtend(jQuery.ajaxSettings,target);},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports), // Main method
ajax:function ajax(url,options){ // If url is an object, simulate pre-1.5 signature
if(typeof url === "object"){options = url;url = undefined;} // Force options to be an object
options = options || {};var transport, // URL without anti-cache param
cacheURL, // Response headers
responseHeadersString,responseHeaders, // timeout handle
timeoutTimer, // Cross-domain detection vars
parts, // To know if global events are to be dispatched
fireGlobals, // Loop variable
i, // Create the final options object
s=jQuery.ajaxSetup({},options), // Callbacks context
callbackContext=s.context || s, // Context for global events is callbackContext if it is a DOM node or jQuery collection
globalEventContext=s.context && (callbackContext.nodeType || callbackContext.jquery)?jQuery(callbackContext):jQuery.event, // Deferreds
deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"), // Status-dependent callbacks
_statusCode=s.statusCode || {}, // Headers (they are sent all at once)
requestHeaders={},requestHeadersNames={}, // The jqXHR state
state=0, // Default abort message
strAbort="canceled", // Fake xhr
jqXHR={readyState:0, // Builds headers hashtable if needed
getResponseHeader:function getResponseHeader(key){var match;if(state === 2){if(!responseHeaders){responseHeaders = {};while(match = rheaders.exec(responseHeadersString)) {responseHeaders[match[1].toLowerCase()] = match[2];}}match = responseHeaders[key.toLowerCase()];}return match == null?null:match;}, // Raw string
getAllResponseHeaders:function getAllResponseHeaders(){return state === 2?responseHeadersString:null;}, // Caches the header
setRequestHeader:function setRequestHeader(name,value){var lname=name.toLowerCase();if(!state){name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;requestHeaders[name] = value;}return this;}, // Overrides response content-type header
overrideMimeType:function overrideMimeType(type){if(!state){s.mimeType = type;}return this;}, // Status-dependent callbacks
statusCode:function statusCode(map){var code;if(map){if(state < 2){for(code in map) { // Lazy-add the new callback in a way that preserves old ones
_statusCode[code] = [_statusCode[code],map[code]];}}else { // Execute the appropriate callbacks
jqXHR.always(map[jqXHR.status]);}}return this;}, // Cancel the request
abort:function abort(statusText){var finalText=statusText || strAbort;if(transport){transport.abort(finalText);}done(0,finalText);return this;}}; // Attach deferreds
deferred.promise(jqXHR).complete = completeDeferred.add;jqXHR.success = jqXHR.done;jqXHR.error = jqXHR.fail; // Remove hash character (#7531: and string promotion)
// Add protocol if not provided (prefilters might expect it)
// Handle falsy url in the settings object (#10093: consistency with old signature)
// We also use the url parameter if available
s.url = ((url || s.url || ajaxLocation) + "").replace(rhash,"").replace(rprotocol,ajaxLocParts[1] + "//"); // Alias method option to type as per ticket #12004
s.type = options.method || options.type || s.method || s.type; // Extract dataTypes list
s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""]; // A cross-domain request is in order when we have a protocol:host:port mismatch
if(s.crossDomain == null){parts = rurl.exec(s.url.toLowerCase());s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:"?"80":"443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:"?"80":"443"))));} // Convert data if not already a string
if(s.data && s.processData && typeof s.data !== "string"){s.data = jQuery.param(s.data,s.traditional);} // Apply prefilters
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR); // If request was aborted inside a prefilter, stop there
if(state === 2){return jqXHR;} // We can fire global events as of now if asked to
// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
fireGlobals = jQuery.event && s.global; // Watch for a new set of requests
if(fireGlobals && jQuery.active++ === 0){jQuery.event.trigger("ajaxStart");} // Uppercase the type
s.type = s.type.toUpperCase(); // Determine if request has content
s.hasContent = !rnoContent.test(s.type); // Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
cacheURL = s.url; // More options handling for requests with no content
if(!s.hasContent){ // If data is available, append data to url
if(s.data){cacheURL = s.url += (rquery.test(cacheURL)?"&":"?") + s.data; // #9682: remove data so that it's not used in an eventual retry
delete s.data;} // Add anti-cache in url if needed
if(s.cache === false){s.url = rts.test(cacheURL)? // If there is already a '_' parameter, set its value
cacheURL.replace(rts,"$1_=" + nonce++): // Otherwise add one to the end
cacheURL + (rquery.test(cacheURL)?"&":"?") + "_=" + nonce++;}} // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){if(jQuery.lastModified[cacheURL]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[cacheURL]);}if(jQuery.etag[cacheURL]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[cacheURL]);}} // Set the correct header, if data is being sent
if(s.data && s.hasContent && s.contentType !== false || options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);} // Set the Accepts header for the server, depending on the dataType
jqXHR.setRequestHeader("Accept",s.dataTypes[0] && s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*"?", " + allTypes + "; q=0.01":""):s.accepts["*"]); // Check for headers option
for(i in s.headers) {jqXHR.setRequestHeader(i,s.headers[i]);} // Allow custom headers/mimetypes and early abort
if(s.beforeSend && (s.beforeSend.call(callbackContext,jqXHR,s) === false || state === 2)){ // Abort if not done already and return
return jqXHR.abort();} // Aborting is no longer a cancellation
strAbort = "abort"; // Install callbacks on deferreds
for(i in {success:1,error:1,complete:1}) {jqXHR[i](s[i]);} // Get transport
transport = inspectPrefiltersOrTransports(transports,s,options,jqXHR); // If no transport, we auto-abort
if(!transport){done(-1,"No Transport");}else {jqXHR.readyState = 1; // Send global event
if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);} // Timeout
if(s.async && s.timeout > 0){timeoutTimer = setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}try{state = 1;transport.send(requestHeaders,done);}catch(e) { // Propagate exception as error if not done
if(state < 2){done(-1,e); // Simply rethrow otherwise
}else {throw e;}}} // Callback for when everything is done
function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText; // Called once
if(state === 2){return;} // State is "done" now
state = 2; // Clear timeout if it exists
if(timeoutTimer){clearTimeout(timeoutTimer);} // Dereference transport for early garbage collection
// (no matter how long the jqXHR object will be used)
transport = undefined; // Cache response headers
responseHeadersString = headers || ""; // Set readyState
jqXHR.readyState = status > 0?4:0; // Determine if successful
isSuccess = status >= 200 && status < 300 || status === 304; // Get response data
if(responses){response = ajaxHandleResponses(s,jqXHR,responses);} // Convert no matter what (that way responseXXX fields are always set)
response = ajaxConvert(s,response,jqXHR,isSuccess); // If successful, handle type chaining
if(isSuccess){ // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){modified = jqXHR.getResponseHeader("Last-Modified");if(modified){jQuery.lastModified[cacheURL] = modified;}modified = jqXHR.getResponseHeader("etag");if(modified){jQuery.etag[cacheURL] = modified;}} // if no content
if(status === 204 || s.type === "HEAD"){statusText = "nocontent"; // if not modified
}else if(status === 304){statusText = "notmodified"; // If we have data, let's convert it
}else {statusText = response.state;success = response.data;error = response.error;isSuccess = !error;}}else { // Extract error from statusText and normalize for non-aborts
error = statusText;if(status || !statusText){statusText = "error";if(status < 0){status = 0;}}} // Set data for the fake xhr object
jqXHR.status = status;jqXHR.statusText = (nativeStatusText || statusText) + ""; // Success/Error
if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);}else {deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);} // Status-dependent callbacks
jqXHR.statusCode(_statusCode);_statusCode = undefined;if(fireGlobals){globalEventContext.trigger(isSuccess?"ajaxSuccess":"ajaxError",[jqXHR,s,isSuccess?success:error]);} // Complete
completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]); // Handle the global AJAX counter
if(! --jQuery.active){jQuery.event.trigger("ajaxStop");}}}return jqXHR;},getJSON:function getJSON(url,data,callback){return jQuery.get(url,data,callback,"json");},getScript:function getScript(url,callback){return jQuery.get(url,undefined,callback,"script");}});jQuery.each(["get","post"],function(i,method){jQuery[method] = function(url,data,callback,type){ // Shift arguments if data argument was omitted
if(jQuery.isFunction(data)){type = type || callback;callback = data;data = undefined;}return jQuery.ajax({url:url,type:method,dataType:type,data:data,success:callback});};});jQuery._evalUrl = function(url){return jQuery.ajax({url:url,type:"GET",dataType:"script",async:false,global:false,"throws":true});};jQuery.fn.extend({wrapAll:function wrapAll(html){var wrap;if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i));});}if(this[0]){ // The elements to wrap the target around
wrap = jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}wrap.map(function(){var elem=this;while(elem.firstElementChild) {elem = elem.firstElementChild;}return elem;}).append(this);}return this;},wrapInner:function wrapInner(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else {self.append(html);}});},wrap:function wrap(html){var isFunction=jQuery.isFunction(html);return this.each(function(i){jQuery(this).wrapAll(isFunction?html.call(this,i):html);});},unwrap:function unwrap(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes);}}).end();}});jQuery.expr.filters.hidden = function(elem){ // Support: Opera <= 12.12
// Opera reports offsetWidths and offsetHeights less than zero on some elements
return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;};jQuery.expr.filters.visible = function(elem){return !jQuery.expr.filters.hidden(elem);};var r20=/%20/g,rbracket=/\[\]$/,rCRLF=/\r?\n/g,rsubmitterTypes=/^(?:submit|button|image|reset|file)$/i,rsubmittable=/^(?:input|select|textarea|keygen)/i;function buildParams(prefix,obj,traditional,add){var name;if(jQuery.isArray(obj)){ // Serialize array item.
jQuery.each(obj,function(i,v){if(traditional || rbracket.test(prefix)){ // Treat each array item as a scalar.
add(prefix,v);}else { // Item is non-scalar (array or object), encode its numeric index.
buildParams(prefix + "[" + (typeof v === "object"?i:"") + "]",v,traditional,add);}});}else if(!traditional && jQuery.type(obj) === "object"){ // Serialize object item.
for(name in obj) {buildParams(prefix + "[" + name + "]",obj[name],traditional,add);}}else { // Serialize scalar item.
add(prefix,obj);}} // Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function(a,traditional){var prefix,s=[],add=function add(key,value){ // If value is a function, invoke it and return its value
value = jQuery.isFunction(value)?value():value == null?"":value;s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);}; // Set traditional to true for jQuery <= 1.3.2 behavior.
if(traditional === undefined){traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;} // If an array was passed in, assume that it is an array of form elements.
if(jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)){ // Serialize the form elements
jQuery.each(a,function(){add(this.name,this.value);});}else { // If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(prefix in a) {buildParams(prefix,a[prefix],traditional,add);}} // Return the resulting serialization
return s.join("&").replace(r20,"+");};jQuery.fn.extend({serialize:function serialize(){return jQuery.param(this.serializeArray());},serializeArray:function serializeArray(){return this.map(function(){ // Can add propHook for "elements" to filter or add form elements
var elements=jQuery.prop(this,"elements");return elements?jQuery.makeArray(elements):this;}).filter(function(){var type=this.type; // Use .is( ":disabled" ) so that fieldset[disabled] works
return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));}).map(function(i,elem){var val=jQuery(this).val();return val == null?null:jQuery.isArray(val)?jQuery.map(val,function(val){return {name:elem.name,value:val.replace(rCRLF,"\r\n")};}):{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});jQuery.ajaxSettings.xhr = function(){try{return new XMLHttpRequest();}catch(e) {}};var xhrId=0,xhrCallbacks={},xhrSuccessStatus={ // file protocol always yields status code 0, assume 200
0:200, // Support: IE9
// #1450: sometimes IE returns 1223 when it should be 204
1223:204},xhrSupported=jQuery.ajaxSettings.xhr(); // Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if(window.attachEvent){window.attachEvent("onunload",function(){for(var key in xhrCallbacks) {xhrCallbacks[key]();}});}support.cors = !!xhrSupported && "withCredentials" in xhrSupported;support.ajax = xhrSupported = !!xhrSupported;jQuery.ajaxTransport(function(options){var callback; // Cross domain only allowed if supported through XMLHttpRequest
if(support.cors || xhrSupported && !options.crossDomain){return {send:function send(headers,complete){var i,xhr=options.xhr(),id=++xhrId;xhr.open(options.type,options.url,options.async,options.username,options.password); // Apply custom fields if provided
if(options.xhrFields){for(i in options.xhrFields) {xhr[i] = options.xhrFields[i];}} // Override mime type if needed
if(options.mimeType && xhr.overrideMimeType){xhr.overrideMimeType(options.mimeType);} // X-Requested-With header
// For cross-domain requests, seeing as conditions for a preflight are
// akin to a jigsaw puzzle, we simply never set it to be sure.
// (it can always be set on a per-request basis or even using ajaxSetup)
// For same-domain requests, won't change header if already provided.
if(!options.crossDomain && !headers["X-Requested-With"]){headers["X-Requested-With"] = "XMLHttpRequest";} // Set headers
for(i in headers) {xhr.setRequestHeader(i,headers[i]);} // Callback
callback = function(type){return function(){if(callback){delete xhrCallbacks[id];callback = xhr.onload = xhr.onerror = null;if(type === "abort"){xhr.abort();}else if(type === "error"){complete( // file: protocol always yields status 0; see #8605, #14207
xhr.status,xhr.statusText);}else {complete(xhrSuccessStatus[xhr.status] || xhr.status,xhr.statusText, // Support: IE9
// Accessing binary-data responseText throws an exception
// (#11426)
typeof xhr.responseText === "string"?{text:xhr.responseText}:undefined,xhr.getAllResponseHeaders());}}};}; // Listen to events
xhr.onload = callback();xhr.onerror = callback("error"); // Create the abort callback
callback = xhrCallbacks[id] = callback("abort");try{ // Do send the request (this may raise an exception)
xhr.send(options.hasContent && options.data || null);}catch(e) { // #14683: Only rethrow if this hasn't been notified as an error yet
if(callback){throw e;}}},abort:function abort(){if(callback){callback();}}};}}); // Install script dataType
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function textScript(text){jQuery.globalEval(text);return text;}}}); // Handle cache's special case and crossDomain
jQuery.ajaxPrefilter("script",function(s){if(s.cache === undefined){s.cache = false;}if(s.crossDomain){s.type = "GET";}}); // Bind script tag hack transport
jQuery.ajaxTransport("script",function(s){ // This transport only deals with cross domain requests
if(s.crossDomain){var script,callback;return {send:function send(_,complete){script = jQuery("<script>").prop({async:true,charset:s.scriptCharset,src:s.url}).on("load error",callback = function(evt){script.remove();callback = null;if(evt){complete(evt.type === "error"?404:200,evt.type);}});document.head.appendChild(script[0]);},abort:function abort(){if(callback){callback();}}};}});var oldCallbacks=[],rjsonp=/(=)\?(?=&|$)|\?\?/; // Default jsonp settings
jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function jsonpCallback(){var callback=oldCallbacks.pop() || jQuery.expando + "_" + nonce++;this[callback] = true;return callback;}}); // Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,jsonProp=s.jsonp !== false && (rjsonp.test(s.url)?"url":typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data"); // Handle iff the expected data type is "jsonp" or we have a parameter to set
if(jsonProp || s.dataTypes[0] === "jsonp"){ // Get callback name, remembering preexisting value associated with it
callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback; // Insert callback into url or form data
if(jsonProp){s[jsonProp] = s[jsonProp].replace(rjsonp,"$1" + callbackName);}else if(s.jsonp !== false){s.url += (rquery.test(s.url)?"&":"?") + s.jsonp + "=" + callbackName;} // Use data converter to retrieve json after script execution
s.converters["script json"] = function(){if(!responseContainer){jQuery.error(callbackName + " was not called");}return responseContainer[0];}; // force json dataType
s.dataTypes[0] = "json"; // Install callback
overwritten = window[callbackName];window[callbackName] = function(){responseContainer = arguments;}; // Clean-up function (fires after converters)
jqXHR.always(function(){ // Restore preexisting value
window[callbackName] = overwritten; // Save back as free
if(s[callbackName]){ // make sure that re-using the options doesn't screw things around
s.jsonpCallback = originalSettings.jsonpCallback; // save the callback name for future use
oldCallbacks.push(callbackName);} // Call if it was a function and we have a response
if(responseContainer && jQuery.isFunction(overwritten)){overwritten(responseContainer[0]);}responseContainer = overwritten = undefined;}); // Delegate to script
return "script";}}); // data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function(data,context,keepScripts){if(!data || typeof data !== "string"){return null;}if(typeof context === "boolean"){keepScripts = context;context = false;}context = context || document;var parsed=rsingleTag.exec(data),scripts=!keepScripts && []; // Single tag
if(parsed){return [context.createElement(parsed[1])];}parsed = jQuery.buildFragment([data],context,scripts);if(scripts && scripts.length){jQuery(scripts).remove();}return jQuery.merge([],parsed.childNodes);}; // Keep a copy of the old load method
var _load=jQuery.fn.load; /**
 * Load a url into a page
 */jQuery.fn.load = function(url,params,callback){if(typeof url !== "string" && _load){return _load.apply(this,arguments);}var selector,type,response,self=this,off=url.indexOf(" ");if(off >= 0){selector = jQuery.trim(url.slice(off));url = url.slice(0,off);} // If it's a function
if(jQuery.isFunction(params)){ // We assume that it's the callback
callback = params;params = undefined; // Otherwise, build a param string
}else if(params && typeof params === "object"){type = "POST";} // If we have elements to modify, make the request
if(self.length > 0){jQuery.ajax({url:url, // if "type" variable is undefined, then "GET" method will be used
type:type,dataType:"html",data:params}).done(function(responseText){ // Save response for use in complete callback
response = arguments;self.html(selector? // If a selector was specified, locate the right elements in a dummy div
// Exclude scripts to avoid IE 'Permission Denied' errors
jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector): // Otherwise use the full result
responseText);}).complete(callback && function(jqXHR,status){self.each(callback,response || [jqXHR.responseText,status,jqXHR]);});}return this;}; // Attach a bunch of functions for handling common AJAX events
jQuery.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(i,type){jQuery.fn[type] = function(fn){return this.on(type,fn);};});jQuery.expr.filters.animated = function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem === fn.elem;}).length;};var docElem=window.document.documentElement; /**
 * Gets a window from an element
 */function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType === 9 && elem.defaultView;}jQuery.offset = {setOffset:function setOffset(elem,options,i){var curPosition,curLeft,curCSSTop,curTop,curOffset,curCSSLeft,calculatePosition,position=jQuery.css(elem,"position"),curElem=jQuery(elem),props={}; // Set position first, in-case top/left are set even on static elem
if(position === "static"){elem.style.position = "relative";}curOffset = curElem.offset();curCSSTop = jQuery.css(elem,"top");curCSSLeft = jQuery.css(elem,"left");calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1; // Need to be able to calculate position if either
// top or left is auto and position is either absolute or fixed
if(calculatePosition){curPosition = curElem.position();curTop = curPosition.top;curLeft = curPosition.left;}else {curTop = parseFloat(curCSSTop) || 0;curLeft = parseFloat(curCSSLeft) || 0;}if(jQuery.isFunction(options)){options = options.call(elem,i,curOffset);}if(options.top != null){props.top = options.top - curOffset.top + curTop;}if(options.left != null){props.left = options.left - curOffset.left + curLeft;}if("using" in options){options.using.call(elem,props);}else {curElem.css(props);}}};jQuery.fn.extend({offset:function offset(options){if(arguments.length){return options === undefined?this:this.each(function(i){jQuery.offset.setOffset(this,options,i);});}var docElem,win,elem=this[0],box={top:0,left:0},doc=elem && elem.ownerDocument;if(!doc){return;}docElem = doc.documentElement; // Make sure it's not a disconnected DOM node
if(!jQuery.contains(docElem,elem)){return box;} // Support: BlackBerry 5, iOS 3 (original iPhone)
// If we don't have gBCR, just use 0,0 rather than error
if(typeof elem.getBoundingClientRect !== strundefined){box = elem.getBoundingClientRect();}win = getWindow(doc);return {top:box.top + win.pageYOffset - docElem.clientTop,left:box.left + win.pageXOffset - docElem.clientLeft};},position:function position(){if(!this[0]){return;}var offsetParent,offset,elem=this[0],parentOffset={top:0,left:0}; // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
if(jQuery.css(elem,"position") === "fixed"){ // Assume getBoundingClientRect is there when computed position is fixed
offset = elem.getBoundingClientRect();}else { // Get *real* offsetParent
offsetParent = this.offsetParent(); // Get correct offsets
offset = this.offset();if(!jQuery.nodeName(offsetParent[0],"html")){parentOffset = offsetParent.offset();} // Add offsetParent borders
parentOffset.top += jQuery.css(offsetParent[0],"borderTopWidth",true);parentOffset.left += jQuery.css(offsetParent[0],"borderLeftWidth",true);} // Subtract parent offsets and element margins
return {top:offset.top - parentOffset.top - jQuery.css(elem,"marginTop",true),left:offset.left - parentOffset.left - jQuery.css(elem,"marginLeft",true)};},offsetParent:function offsetParent(){return this.map(function(){var offsetParent=this.offsetParent || docElem;while(offsetParent && !jQuery.nodeName(offsetParent,"html") && jQuery.css(offsetParent,"position") === "static") {offsetParent = offsetParent.offsetParent;}return offsetParent || docElem;});}}); // Create scrollLeft and scrollTop methods
jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top="pageYOffset" === prop;jQuery.fn[method] = function(val){return access(this,function(elem,method,val){var win=getWindow(elem);if(val === undefined){return win?win[prop]:elem[method];}if(win){win.scrollTo(!top?val:window.pageXOffset,top?val:window.pageYOffset);}else {elem[method] = val;}},method,val,arguments.length,null);};}); // Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each(["top","left"],function(i,prop){jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,function(elem,computed){if(computed){computed = curCSS(elem,prop); // If curCSS returns percentage, fallback to offset
return rnumnonpx.test(computed)?jQuery(elem).position()[prop] + "px":computed;}});}); // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner" + name,content:type,"":"outer" + name},function(defaultExtra,funcName){ // Margin is only for outerHeight, outerWidth
jQuery.fn[funcName] = function(margin,value){var chainable=arguments.length && (defaultExtra || typeof margin !== "boolean"),extra=defaultExtra || (margin === true || value === true?"margin":"border");return access(this,function(elem,type,value){var doc;if(jQuery.isWindow(elem)){ // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
// isn't a whole lot we can do. See pull request at this URL for discussion:
// https://github.com/jquery/jquery/pull/764
return elem.document.documentElement["client" + name];} // Get document width or height
if(elem.nodeType === 9){doc = elem.documentElement; // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
// whichever is greatest
return Math.max(elem.body["scroll" + name],doc["scroll" + name],elem.body["offset" + name],doc["offset" + name],doc["client" + name]);}return value === undefined? // Get width or height on the element, requesting but not forcing parseFloat
jQuery.css(elem,type,extra): // Set width or height on the element
jQuery.style(elem,type,value,extra);},type,chainable?margin:undefined,chainable,null);};});}); // The number of elements contained in the matched element set
jQuery.fn.size = function(){return this.length;};jQuery.fn.andSelf = jQuery.fn.addBack; // Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
if(typeof define === "function" && define.amd){define("jquery",[],function(){return jQuery;});}var  // Map over jQuery in case of overwrite
_jQuery=window.jQuery, // Map over the $ in case of overwrite
_$=window.$;jQuery.noConflict = function(deep){if(window.$ === jQuery){window.$ = _$;}if(deep && window.jQuery === jQuery){window.jQuery = _jQuery;}return jQuery;}; // Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if(typeof noGlobal === strundefined){window.jQuery = window.$ = jQuery;}return jQuery;}); // Otherwise append directly
/*!
 * jQuery Validation Plugin v1.14.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2015 Jörn Zaefferer
 * Released under the MIT license
 */
"use strict";

(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {

    $.extend($.fn, {
        // http://jqueryvalidation.org/validate/
        validate: function validate(options) {

            // if nothing is selected, return nothing; can't chain anyway
            if (!this.length) {
                if (options && options.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.");
                }
                return;
            }

            // check if a validator for this form was already created
            var validator = $.data(this[0], "validator");
            if (validator) {
                return validator;
            }

            // Add novalidate tag if HTML5.
            this.attr("novalidate", "novalidate");

            validator = new $.validator(options, this[0]);
            $.data(this[0], "validator", validator);

            if (validator.settings.onsubmit) {

                this.on("click.validate", ":submit", function (event) {
                    if (validator.settings.submitHandler) {
                        validator.submitButton = event.target;
                    }

                    // allow suppressing validation by adding a cancel class to the submit button
                    if ($(this).hasClass("cancel")) {
                        validator.cancelSubmit = true;
                    }

                    // allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                    if ($(this).attr("formnovalidate") !== undefined) {
                        validator.cancelSubmit = true;
                    }
                });

                // validate the form on submit
                this.on("submit.validate", function (event) {
                    if (validator.settings.debug) {
                        // prevent form submit to be able to see console output
                        event.preventDefault();
                    }
                    function handle() {
                        var hidden, result;
                        if (validator.settings.submitHandler) {
                            if (validator.submitButton) {
                                // insert a hidden input as a replacement for the missing submit button
                                hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm);
                            }
                            result = validator.settings.submitHandler.call(validator, validator.currentForm, event);
                            if (validator.submitButton) {
                                // and clean up afterwards; thanks to no-block-scope, hidden can be referenced
                                hidden.remove();
                            }
                            if (result !== undefined) {
                                return result;
                            }
                            return false;
                        }
                        return true;
                    }

                    // prevent submit for invalid forms or custom submit handlers
                    if (validator.cancelSubmit) {
                        validator.cancelSubmit = false;
                        return handle();
                    }
                    if (validator.form()) {
                        if (validator.pendingRequest) {
                            validator.formSubmitted = true;
                            return false;
                        }
                        return handle();
                    } else {
                        validator.focusInvalid();
                        return false;
                    }
                });
            }

            return validator;
        },
        // http://jqueryvalidation.org/valid/
        valid: function valid() {
            var valid, validator, errorList;

            if ($(this[0]).is("form")) {
                valid = this.validate().form();
            } else {
                errorList = [];
                valid = true;
                validator = $(this[0].form).validate();
                this.each(function () {
                    valid = validator.element(this) && valid;
                    errorList = errorList.concat(validator.errorList);
                });
                validator.errorList = errorList;
            }
            return valid;
        },

        // http://jqueryvalidation.org/rules/
        rules: function rules(command, argument) {
            var element = this[0],
                settings,
                staticRules,
                existingRules,
                data,
                param,
                filtered;

            if (command) {
                settings = $.data(element.form, "validator").settings;
                staticRules = settings.rules;
                existingRules = $.validator.staticRules(element);
                switch (command) {
                    case "add":
                        $.extend(existingRules, $.validator.normalizeRule(argument));
                        // remove messages from rules, but allow them to be set separately
                        delete existingRules.messages;
                        staticRules[element.name] = existingRules;
                        if (argument.messages) {
                            settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
                        }
                        break;
                    case "remove":
                        if (!argument) {
                            delete staticRules[element.name];
                            return existingRules;
                        }
                        filtered = {};
                        $.each(argument.split(/\s/), function (index, method) {
                            filtered[method] = existingRules[method];
                            delete existingRules[method];
                            if (method === "required") {
                                $(element).removeAttr("aria-required");
                            }
                        });
                        return filtered;
                }
            }

            data = $.validator.normalizeRules($.extend({}, $.validator.classRules(element), $.validator.attributeRules(element), $.validator.dataRules(element), $.validator.staticRules(element)), element);

            // make sure required is at front
            if (data.required) {
                param = data.required;
                delete data.required;
                data = $.extend({ required: param }, data);
                $(element).attr("aria-required", "true");
            }

            // make sure remote is at back
            if (data.remote) {
                param = data.remote;
                delete data.remote;
                data = $.extend(data, { remote: param });
            }

            return data;
        }
    });

    // Custom selectors
    $.extend($.expr[":"], {
        // http://jqueryvalidation.org/blank-selector/
        blank: function blank(a) {
            return !$.trim("" + $(a).val());
        },
        // http://jqueryvalidation.org/filled-selector/
        filled: function filled(a) {
            return !!$.trim("" + $(a).val());
        },
        // http://jqueryvalidation.org/unchecked-selector/
        unchecked: function unchecked(a) {
            return !$(a).prop("checked");
        }
    });

    // constructor for validator
    $.validator = function (options, form) {
        this.settings = $.extend(true, {}, $.validator.defaults, options);
        this.currentForm = form;
        this.init();
    };

    // http://jqueryvalidation.org/jQuery.validator.format/
    $.validator.format = function (source, params) {
        if (arguments.length === 1) {
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply(this, args);
            };
        }
        if (arguments.length > 2 && params.constructor !== Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor !== Array) {
            params = [params];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                return n;
            });
        });
        return source;
    };

    $.extend($.validator, {

        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: false,
            focusInvalid: true,
            errorContainer: $([]),
            errorLabelContainer: $([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function onfocusin(element) {
                this.lastActive = element;

                // Hide error label and remove error class on focus if enabled
                if (this.settings.focusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.hideThese(this.errorsFor(element));
                }
            },
            onfocusout: function onfocusout(element) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
            },
            onkeyup: function onkeyup(element, event) {
                // Avoid revalidate the field when pressing one of the following keys
                // Shift       => 16
                // Ctrl        => 17
                // Alt         => 18
                // Caps lock   => 20
                // End         => 35
                // Home        => 36
                // Left arrow  => 37
                // Up arrow    => 38
                // Right arrow => 39
                // Down arrow  => 40
                // Insert      => 45
                // Num lock    => 144
                // AltGr key   => 225
                var excludedKeys = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];

                if (event.which === 9 && this.elementValue(element) === "" || $.inArray(event.keyCode, excludedKeys) !== -1) {
                    return;
                } else if (element.name in this.submitted || element === this.lastElement) {
                    this.element(element);
                }
            },
            onclick: function onclick(element) {
                // click on selects, radiobuttons and checkboxes
                if (element.name in this.submitted) {
                    this.element(element);

                    // or option elements, check parent select in that case
                } else if (element.parentNode.name in this.submitted) {
                        this.element(element.parentNode);
                    }
            },
            highlight: function highlight(element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function unhighlight(element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else {
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            }
        },

        // http://jqueryvalidation.org/jQuery.validator.setDefaults/
        setDefaults: function setDefaults(settings) {
            $.extend($.validator.defaults, settings);
        },

        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: $.validator.format("Please enter no more than {0} characters."),
            minlength: $.validator.format("Please enter at least {0} characters."),
            rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $.validator.format("Please enter a value between {0} and {1}."),
            max: $.validator.format("Please enter a value less than or equal to {0}."),
            min: $.validator.format("Please enter a value greater than or equal to {0}.")
        },

        autoCreateRanges: false,

        prototype: {

            init: function init() {
                this.labelContainer = $(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();

                var groups = this.groups = {},
                    rules;
                $.each(this.settings.groups, function (key, value) {
                    if (typeof value === "string") {
                        value = value.split(/\s/);
                    }
                    $.each(value, function (index, name) {
                        groups[name] = key;
                    });
                });
                rules = this.settings.rules;
                $.each(rules, function (key, value) {
                    rules[key] = $.validator.normalizeRule(value);
                });

                function delegate(event) {
                    var validator = $.data(this.form, "validator"),
                        eventType = "on" + event.type.replace(/^validate/, ""),
                        settings = validator.settings;
                    if (settings[eventType] && !$(this).is(settings.ignore)) {
                        settings[eventType].call(validator, this, event);
                    }
                }

                $(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " + "[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " + "[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " + "[type='radio'], [type='checkbox']", delegate)
                // Support: Chrome, oldIE
                // "select" is provided as event.target when clicking a option
                .on("click.validate", "select, option, [type='radio'], [type='checkbox']", delegate);

                if (this.settings.invalidHandler) {
                    $(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
                }

                // Add aria-required to any Static/Data/Class required fields before first validation
                // Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
                $(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
            },

            // http://jqueryvalidation.org/Validator.form/
            form: function form() {
                this.checkForm();
                $.extend(this.submitted, this.errorMap);
                this.invalid = $.extend({}, this.errorMap);
                if (!this.valid()) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                }
                this.showErrors();
                return this.valid();
            },

            checkForm: function checkForm() {
                this.prepareForm();
                for (var i = 0, elements = this.currentElements = this.elements(); elements[i]; i++) {
                    this.check(elements[i]);
                }
                return this.valid();
            },

            // http://jqueryvalidation.org/Validator.element/
            element: function element(_element) {
                var cleanElement = this.clean(_element),
                    checkElement = this.validationTargetFor(cleanElement),
                    result = true;

                this.lastElement = checkElement;

                if (checkElement === undefined) {
                    delete this.invalid[cleanElement.name];
                } else {
                    this.prepareElement(checkElement);
                    this.currentElements = $(checkElement);

                    result = this.check(checkElement) !== false;
                    if (result) {
                        delete this.invalid[checkElement.name];
                    } else {
                        this.invalid[checkElement.name] = true;
                    }
                }
                // Add aria-invalid status for screen readers
                $(_element).attr("aria-invalid", !result);

                if (!this.numberOfInvalids()) {
                    // Hide error containers on last error
                    this.toHide = this.toHide.add(this.containers);
                }
                this.showErrors();
                return result;
            },

            // http://jqueryvalidation.org/Validator.showErrors/
            showErrors: function showErrors(errors) {
                if (errors) {
                    // add items to error list and map
                    $.extend(this.errorMap, errors);
                    this.errorList = [];
                    for (var name in errors) {
                        this.errorList.push({
                            message: errors[name],
                            element: this.findByName(name)[0]
                        });
                    }
                    // remove items from success list
                    this.successList = $.grep(this.successList, function (element) {
                        return !(element.name in errors);
                    });
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList);
                } else {
                    this.defaultShowErrors();
                }
            },

            // http://jqueryvalidation.org/Validator.resetForm/
            resetForm: function resetForm() {
                if ($.fn.resetForm) {
                    $(this.currentForm).resetForm();
                }
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                var i,
                    elements = this.elements().removeData("previousValue").removeAttr("aria-invalid");

                if (this.settings.unhighlight) {
                    for (i = 0; elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, "");
                    }
                } else {
                    elements.removeClass(this.settings.errorClass);
                }
            },

            numberOfInvalids: function numberOfInvalids() {
                return this.objectLength(this.invalid);
            },

            objectLength: function objectLength(obj) {
                /* jshint unused: false */
                var count = 0,
                    i;
                for (i in obj) {
                    count++;
                }
                return count;
            },

            hideErrors: function hideErrors() {
                this.hideThese(this.toHide);
            },

            hideThese: function hideThese(errors) {
                errors.not(this.containers).text("");
                this.addWrapper(errors).hide();
            },

            valid: function valid() {
                return this.size() === 0;
            },

            size: function size() {
                return this.errorList.length;
            },

            focusInvalid: function focusInvalid() {
                if (this.settings.focusInvalid) {
                    try {
                        $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus()
                        // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                        .trigger("focusin");
                    } catch (e) {
                        // ignore IE throwing errors when focusing hidden elements
                    }
                }
            },

            findLastActive: function findLastActive() {
                var lastActive = this.lastActive;
                return lastActive && $.grep(this.errorList, function (n) {
                    return n.element.name === lastActive.name;
                }).length === 1 && lastActive;
            },

            elements: function elements() {
                var validator = this,
                    rulesCache = {};

                // select all valid inputs inside the form (no submit or reset buttons)
                return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                    if (!this.name && validator.settings.debug && window.console) {
                        console.error("%o has no name assigned", this);
                    }

                    // select only the first element for each name, and only those with rules specified
                    if (this.name in rulesCache || !validator.objectLength($(this).rules())) {
                        return false;
                    }

                    rulesCache[this.name] = true;
                    return true;
                });
            },

            clean: function clean(selector) {
                return $(selector)[0];
            },

            errors: function errors() {
                var errorClass = this.settings.errorClass.split(" ").join(".");
                return $(this.settings.errorElement + "." + errorClass, this.errorContext);
            },

            reset: function reset() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $([]);
                this.toHide = $([]);
                this.currentElements = $([]);
            },

            prepareForm: function prepareForm() {
                this.reset();
                this.toHide = this.errors().add(this.containers);
            },

            prepareElement: function prepareElement(element) {
                this.reset();
                this.toHide = this.errorsFor(element);
            },

            elementValue: function elementValue(element) {
                var val,
                    $element = $(element),
                    type = element.type;

                if (type === "radio" || type === "checkbox") {
                    return this.findByName(element.name).filter(":checked").val();
                } else if (type === "number" && typeof element.validity !== "undefined") {
                    return element.validity.badInput ? false : $element.val();
                }

                val = $element.val();
                if (typeof val === "string") {
                    return val.replace(/\r/g, "");
                }
                return val;
            },

            check: function check(element) {
                element = this.validationTargetFor(this.clean(element));

                var rules = $(element).rules(),
                    rulesCount = $.map(rules, function (n, i) {
                    return i;
                }).length,
                    dependencyMismatch = false,
                    val = this.elementValue(element),
                    result,
                    method,
                    rule;

                for (method in rules) {
                    rule = { method: method, parameters: rules[method] };
                    try {

                        result = $.validator.methods[method].call(this, val, element, rule.parameters);

                        // if a method indicates that the field is optional and therefore valid,
                        // don't mark it as valid when there are no other rules
                        if (result === "dependency-mismatch" && rulesCount === 1) {
                            dependencyMismatch = true;
                            continue;
                        }
                        dependencyMismatch = false;

                        if (result === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(element));
                            return;
                        }

                        if (!result) {
                            this.formatAndAdd(element, rule);
                            return false;
                        }
                    } catch (e) {
                        if (this.settings.debug && window.console) {
                            console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
                        }
                        if (e instanceof TypeError) {
                            e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
                        }

                        throw e;
                    }
                }
                if (dependencyMismatch) {
                    return;
                }
                if (this.objectLength(rules)) {
                    this.successList.push(element);
                }
                return true;
            },

            // return the custom message for the given element and validation method
            // specified in the element's HTML5 data attribute
            // return the generic message if present and no method specific message is present
            customDataMessage: function customDataMessage(element, method) {
                return $(element).data("msg" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase()) || $(element).data("msg");
            },

            // return the custom message for the given element name and validation method
            customMessage: function customMessage(name, method) {
                var m = this.settings.messages[name];
                return m && (m.constructor === String ? m : m[method]);
            },

            // return the first defined argument, allowing empty strings
            findDefined: function findDefined() {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] !== undefined) {
                        return arguments[i];
                    }
                }
                return undefined;
            },

            defaultMessage: function defaultMessage(element, method) {
                return this.findDefined(this.customMessage(element.name, method), this.customDataMessage(element, method),
                // title is never undefined, so handle empty string as undefined
                !this.settings.ignoreTitle && element.title || undefined, $.validator.messages[method], "<strong>Warning: No message defined for " + element.name + "</strong>");
            },

            formatAndAdd: function formatAndAdd(element, rule) {
                var message = this.defaultMessage(element, rule.method),
                    theregex = /\$?\{(\d+)\}/g;
                if (typeof message === "function") {
                    message = message.call(this, rule.parameters, element);
                } else if (theregex.test(message)) {
                    message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
                }
                this.errorList.push({
                    message: message,
                    element: element,
                    method: rule.method
                });

                this.errorMap[element.name] = message;
                this.submitted[element.name] = message;
            },

            addWrapper: function addWrapper(toToggle) {
                if (this.settings.wrapper) {
                    toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
                }
                return toToggle;
            },

            defaultShowErrors: function defaultShowErrors() {
                var i, elements, error;
                for (i = 0; this.errorList[i]; i++) {
                    error = this.errorList[i];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.showLabel(error.element, error.message);
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers);
                }
                if (this.settings.success) {
                    for (i = 0; this.successList[i]; i++) {
                        this.showLabel(this.successList[i]);
                    }
                }
                if (this.settings.unhighlight) {
                    for (i = 0, elements = this.validElements(); elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show();
            },

            validElements: function validElements() {
                return this.currentElements.not(this.invalidElements());
            },

            invalidElements: function invalidElements() {
                return $(this.errorList).map(function () {
                    return this.element;
                });
            },

            showLabel: function showLabel(element, message) {
                var place,
                    group,
                    errorID,
                    error = this.errorsFor(element),
                    elementID = this.idOrName(element),
                    describedBy = $(element).attr("aria-describedby");
                if (error.length) {
                    // refresh error/success class
                    error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    // replace message on existing label
                    error.html(message);
                } else {
                    // create error element
                    error = $("<" + this.settings.errorElement + ">").attr("id", elementID + "-error").addClass(this.settings.errorClass).html(message || "");

                    // Maintain reference to the element to be placed into the DOM
                    place = error;
                    if (this.settings.wrapper) {
                        // make sure the element is visible, even in IE
                        // actually showing the wrapped element is handled elsewhere
                        place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    }
                    if (this.labelContainer.length) {
                        this.labelContainer.append(place);
                    } else if (this.settings.errorPlacement) {
                        this.settings.errorPlacement(place, $(element));
                    } else {
                        place.insertAfter(element);
                    }

                    // Link error back to the element
                    if (error.is("label")) {
                        // If the error is a label, then associate using 'for'
                        error.attr("for", elementID);
                    } else if (error.parents("label[for='" + elementID + "']").length === 0) {
                        // If the element is not a child of an associated label, then it's necessary
                        // to explicitly apply aria-describedby

                        errorID = error.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1");
                        // Respect existing non-error aria-describedby
                        if (!describedBy) {
                            describedBy = errorID;
                        } else if (!describedBy.match(new RegExp("\\b" + errorID + "\\b"))) {
                            // Add to end of list if not already present
                            describedBy += " " + errorID;
                        }
                        $(element).attr("aria-describedby", describedBy);

                        // If this element is grouped, then assign to all elements in the same group
                        group = this.groups[element.name];
                        if (group) {
                            $.each(this.groups, function (name, testgroup) {
                                if (testgroup === group) {
                                    $("[name='" + name + "']", this.currentForm).attr("aria-describedby", error.attr("id"));
                                }
                            });
                        }
                    }
                }
                if (!message && this.settings.success) {
                    error.text("");
                    if (typeof this.settings.success === "string") {
                        error.addClass(this.settings.success);
                    } else {
                        this.settings.success(error, element);
                    }
                }
                this.toShow = this.toShow.add(error);
            },

            errorsFor: function errorsFor(element) {
                var name = this.idOrName(element),
                    describer = $(element).attr("aria-describedby"),
                    selector = "label[for='" + name + "'], label[for='" + name + "'] *";

                // aria-describedby should directly reference the error element
                if (describer) {
                    selector = selector + ", #" + describer.replace(/\s+/g, ", #");
                }
                return this.errors().filter(selector);
            },

            idOrName: function idOrName(element) {
                return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
            },

            validationTargetFor: function validationTargetFor(element) {

                // If radio/checkbox, validate first element in group instead
                if (this.checkable(element)) {
                    element = this.findByName(element.name);
                }

                // Always apply ignore filter
                return $(element).not(this.settings.ignore)[0];
            },

            checkable: function checkable(element) {
                return (/radio|checkbox/i.test(element.type)
                );
            },

            findByName: function findByName(name) {
                return $(this.currentForm).find("[name='" + name + "']");
            },

            getLength: function getLength(value, element) {
                switch (element.nodeName.toLowerCase()) {
                    case "select":
                        return $("option:selected", element).length;
                    case "input":
                        if (this.checkable(element)) {
                            return this.findByName(element.name).filter(":checked").length;
                        }
                }
                return value.length;
            },

            depend: function depend(param, element) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
            },

            dependTypes: {
                "boolean": function boolean(param) {
                    return param;
                },
                "string": function string(param, element) {
                    return !!$(param, element.form).length;
                },
                "function": function _function(param, element) {
                    return param(element);
                }
            },

            optional: function optional(element) {
                var val = this.elementValue(element);
                return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
            },

            startRequest: function startRequest(element) {
                if (!this.pending[element.name]) {
                    this.pendingRequest++;
                    this.pending[element.name] = true;
                }
            },

            stopRequest: function stopRequest(element, valid) {
                this.pendingRequest--;
                // sometimes synchronization fails, make sure pendingRequest is never < 0
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0;
                }
                delete this.pending[element.name];
                if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    $(this.currentForm).submit();
                    this.formSubmitted = false;
                } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false;
                }
            },

            previousValue: function previousValue(element) {
                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(element, "remote")
                });
            },

            // cleans up all forms and elements, removes validator-specific events
            destroy: function destroy() {
                this.resetForm();

                $(this.currentForm).off(".validate").removeData("validator");
            }

        },

        classRuleSettings: {
            required: { required: true },
            email: { email: true },
            url: { url: true },
            date: { date: true },
            dateISO: { dateISO: true },
            number: { number: true },
            digits: { digits: true },
            creditcard: { creditcard: true }
        },

        addClassRules: function addClassRules(className, rules) {
            if (className.constructor === String) {
                this.classRuleSettings[className] = rules;
            } else {
                $.extend(this.classRuleSettings, className);
            }
        },

        classRules: function classRules(element) {
            var rules = {},
                classes = $(element).attr("class");

            if (classes) {
                $.each(classes.split(" "), function () {
                    if (this in $.validator.classRuleSettings) {
                        $.extend(rules, $.validator.classRuleSettings[this]);
                    }
                });
            }
            return rules;
        },

        normalizeAttributeRule: function normalizeAttributeRule(rules, type, method, value) {

            // convert the value to a number for number inputs, and for text for backwards compability
            // allows type="date" and others to be compared as strings
            if (/min|max/.test(method) && (type === null || /number|range|text/.test(type))) {
                value = Number(value);

                // Support Opera Mini, which returns NaN for undefined minlength
                if (isNaN(value)) {
                    value = undefined;
                }
            }

            if (value || value === 0) {
                rules[method] = value;
            } else if (type === method && type !== "range") {

                // exception: the jquery validate 'range' method
                // does not test for the html5 'range' type
                rules[method] = true;
            }
        },

        attributeRules: function attributeRules(element) {
            var rules = {},
                $element = $(element),
                type = element.getAttribute("type"),
                method,
                value;

            for (method in $.validator.methods) {

                // support for <input required> in both html5 and older browsers
                if (method === "required") {
                    value = element.getAttribute(method);

                    // Some browsers return an empty string for the required attribute
                    // and non-HTML5 browsers might have required="" markup
                    if (value === "") {
                        value = true;
                    }

                    // force non-HTML5 browsers to return bool
                    value = !!value;
                } else {
                    value = $element.attr(method);
                }

                this.normalizeAttributeRule(rules, type, method, value);
            }

            // maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
            if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                delete rules.maxlength;
            }

            return rules;
        },

        dataRules: function dataRules(element) {
            var rules = {},
                $element = $(element),
                type = element.getAttribute("type"),
                method,
                value;

            for (method in $.validator.methods) {
                value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());
                this.normalizeAttributeRule(rules, type, method, value);
            }
            return rules;
        },

        staticRules: function staticRules(element) {
            var rules = {},
                validator = $.data(element.form, "validator");

            if (validator.settings.rules) {
                rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
            }
            return rules;
        },

        normalizeRules: function normalizeRules(rules, element) {
            // handle dependency check
            $.each(rules, function (prop, val) {
                // ignore rule when param is explicitly false, eg. required:false
                if (val === false) {
                    delete rules[prop];
                    return;
                }
                if (val.param || val.depends) {
                    var keepRule = true;
                    switch (typeof val.depends) {
                        case "string":
                            keepRule = !!$(val.depends, element.form).length;
                            break;
                        case "function":
                            keepRule = val.depends.call(element, element);
                            break;
                    }
                    if (keepRule) {
                        rules[prop] = val.param !== undefined ? val.param : true;
                    } else {
                        delete rules[prop];
                    }
                }
            });

            // evaluate parameters
            $.each(rules, function (rule, parameter) {
                rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
            });

            // clean number parameters
            $.each(["minlength", "maxlength"], function () {
                if (rules[this]) {
                    rules[this] = Number(rules[this]);
                }
            });
            $.each(["rangelength", "range"], function () {
                var parts;
                if (rules[this]) {
                    if ($.isArray(rules[this])) {
                        rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                    } else if (typeof rules[this] === "string") {
                        parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                        rules[this] = [Number(parts[0]), Number(parts[1])];
                    }
                }
            });

            if ($.validator.autoCreateRanges) {
                // auto-create ranges
                if (rules.min != null && rules.max != null) {
                    rules.range = [rules.min, rules.max];
                    delete rules.min;
                    delete rules.max;
                }
                if (rules.minlength != null && rules.maxlength != null) {
                    rules.rangelength = [rules.minlength, rules.maxlength];
                    delete rules.minlength;
                    delete rules.maxlength;
                }
            }

            return rules;
        },

        // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
        normalizeRule: function normalizeRule(data) {
            if (typeof data === "string") {
                var transformed = {};
                $.each(data.split(/\s/), function () {
                    transformed[this] = true;
                });
                data = transformed;
            }
            return data;
        },

        // http://jqueryvalidation.org/jQuery.validator.addMethod/
        addMethod: function addMethod(name, method, message) {
            $.validator.methods[name] = method;
            $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
            if (method.length < 3) {
                $.validator.addClassRules(name, $.validator.normalizeRule(name));
            }
        },

        methods: {

            // http://jqueryvalidation.org/required-method/
            required: function required(value, element, param) {
                // check if dependency is met
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                if (element.nodeName.toLowerCase() === "select") {
                    // could be an array for select-multiple or a string, both are fine this way
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                if (this.checkable(element)) {
                    return this.getLength(value, element) > 0;
                }
                return value.length > 0;
            },

            // http://jqueryvalidation.org/email-method/
            email: function email(value, element) {
                // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
                // Retrieved 2014-01-14
                // If you have a problem with this implementation, report a bug against the above spec
                // Or use custom methods to implement your own email validation
                return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
            },

            // http://jqueryvalidation.org/url-method/
            url: function url(value, element) {

                // Copyright (c) 2010-2013 Diego Perini, MIT licensed
                // https://gist.github.com/dperini/729294
                // see also https://mathiasbynens.be/demo/url-regex
                // modified to allow protocol-relative URLs
                return this.optional(element) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
            },

            // http://jqueryvalidation.org/date-method/
            date: function date(value, element) {
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
            },

            // http://jqueryvalidation.org/dateISO-method/
            dateISO: function dateISO(value, element) {
                return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
            },

            // http://jqueryvalidation.org/number-method/
            number: function number(value, element) {
                return this.optional(element) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },

            // http://jqueryvalidation.org/digits-method/
            digits: function digits(value, element) {
                return this.optional(element) || /^\d+$/.test(value);
            },

            // http://jqueryvalidation.org/creditcard-method/
            // based on http://en.wikipedia.org/wiki/Luhn_algorithm
            creditcard: function creditcard(value, element) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }
                // accept only spaces, digits and dashes
                if (/[^0-9 \-]+/.test(value)) {
                    return false;
                }
                var nCheck = 0,
                    nDigit = 0,
                    bEven = false,
                    n,
                    cDigit;

                value = value.replace(/\D/g, "");

                // Basing min and max length on
                // http://developer.ean.com/general_info/Valid_Credit_Card_Types
                if (value.length < 13 || value.length > 19) {
                    return false;
                }

                for (n = value.length - 1; n >= 0; n--) {
                    cDigit = value.charAt(n);
                    nDigit = parseInt(cDigit, 10);
                    if (bEven) {
                        if ((nDigit *= 2) > 9) {
                            nDigit -= 9;
                        }
                    }
                    nCheck += nDigit;
                    bEven = !bEven;
                }

                return nCheck % 10 === 0;
            },

            // http://jqueryvalidation.org/minlength-method/
            minlength: function minlength(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length >= param;
            },

            // http://jqueryvalidation.org/maxlength-method/
            maxlength: function maxlength(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length <= param;
            },

            // http://jqueryvalidation.org/rangelength-method/
            rangelength: function rangelength(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length >= param[0] && length <= param[1];
            },

            // http://jqueryvalidation.org/min-method/
            min: function min(value, element, param) {
                return this.optional(element) || value >= param;
            },

            // http://jqueryvalidation.org/max-method/
            max: function max(value, element, param) {
                return this.optional(element) || value <= param;
            },

            // http://jqueryvalidation.org/range-method/
            range: function range(value, element, param) {
                return this.optional(element) || value >= param[0] && value <= param[1];
            },

            // http://jqueryvalidation.org/equalTo-method/
            equalTo: function equalTo(value, element, param) {
                // bind to the blur event of the target in order to revalidate whenever the target field is updated
                // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
                var target = $(param);
                if (this.settings.onfocusout) {
                    target.off(".validate-equalTo").on("blur.validate-equalTo", function () {
                        $(element).valid();
                    });
                }
                return value === target.val();
            },

            // http://jqueryvalidation.org/remote-method/
            remote: function remote(value, element, param) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }

                var previous = this.previousValue(element),
                    validator,
                    data;

                if (!this.settings.messages[element.name]) {
                    this.settings.messages[element.name] = {};
                }
                previous.originalMessage = this.settings.messages[element.name].remote;
                this.settings.messages[element.name].remote = previous.message;

                param = typeof param === "string" && { url: param } || param;

                if (previous.old === value) {
                    return previous.valid;
                }

                previous.old = value;
                validator = this;
                this.startRequest(element);
                data = {};
                data[element.name] = value;
                $.ajax($.extend(true, {
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    context: validator.currentForm,
                    success: function success(response) {
                        var valid = response === true || response === "true",
                            errors,
                            message,
                            submitted;

                        validator.settings.messages[element.name].remote = previous.originalMessage;
                        if (valid) {
                            submitted = validator.formSubmitted;
                            validator.prepareElement(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            delete validator.invalid[element.name];
                            validator.showErrors();
                        } else {
                            errors = {};
                            message = response || validator.defaultMessage(element, "remote");
                            errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                            validator.invalid[element.name] = true;
                            validator.showErrors(errors);
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid);
                    }
                }, param));
                return "pending";
            }
        }

    });

    // ajax mode: abort
    // usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
    // if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

    var pendingRequests = {},
        ajax;
    // Use a prefilter if available (1.5+)
    if ($.ajaxPrefilter) {
        $.ajaxPrefilter(function (settings, _, xhr) {
            var port = settings.port;
            if (settings.mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = xhr;
            }
        });
    } else {
        // Proxy ajax
        ajax = $.ajax;
        $.ajax = function (settings) {
            var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
                port = ("port" in settings ? settings : $.ajaxSettings).port;
            if (mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = ajax.apply(this, arguments);
                return pendingRequests[port];
            }
            return ajax.apply(this, arguments);
        };
    }
});
"use strict";

!(function (a, b, c, d) {
  function e(b, c) {
    this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function (a, b) {
      this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this);
    }, this)), a.each(e.Pipe, a.proxy(function (b, c) {
      this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
    }, this)), this.setup(), this.initialize();
  }function f(a) {
    if (a.touches !== d) return { x: a.touches[0].pageX, y: a.touches[0].pageY };if (a.touches === d) {
      if (a.pageX !== d) return { x: a.pageX, y: a.pageY };if (a.pageX === d) return { x: a.clientX, y: a.clientY };
    }
  }function g(a) {
    var b,
        d,
        e = c.createElement("div"),
        f = a;for (b in f) if ((d = f[b], "undefined" != typeof e.style[d])) return e = null, [d, b];return [!1];
  }function h() {
    return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1];
  }function i() {
    return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0];
  }function j() {
    return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0];
  }function k() {
    return "ontouchstart" in b || !!navigator.msMaxTouchPoints;
  }function l() {
    return b.navigator.msPointerEnabled;
  }var m, n, o;m = { start: 0, startX: 0, startY: 0, current: 0, currentX: 0, currentY: 0, offsetX: 0, offsetY: 0, distance: null, startTime: 0, endTime: 0, updatedX: 0, targetEl: null }, n = { isTouch: !1, isScrolling: !1, isSwiping: !1, direction: !1, inMotion: !1 }, o = { _onDragStart: null, _onDragMove: null, _onDragEnd: null, _transitionEnd: null, _resizer: null, _responsiveCall: null, _goToLoop: null, _checkVisibile: null }, e.Defaults = { items: 3, loop: !1, center: !1, mouseDrag: !0, touchDrag: !0, pullDrag: !0, freeDrag: !1, margin: 0, stagePadding: 0, merge: !1, mergeFit: !0, autoWidth: !1, startPosition: 0, rtl: !1, smartSpeed: 250, fluidSpeed: !1, dragEndSpeed: !1, responsive: {}, responsiveRefreshRate: 200, responsiveBaseElement: b, responsiveClass: !1, fallbackEasing: "swing", info: !1, nestedItemSelector: !1, itemElement: "div", stageElement: "div", themeClass: "owl-theme", baseClass: "owl-carousel", itemClass: "owl-item", centerClass: "center", activeClass: "active" }, e.Width = { Default: "default", Inner: "inner", Outer: "outer" }, e.Plugins = {}, e.Pipe = [{ filter: ["width", "items", "settings"], run: function run(a) {
      a.current = this._items && this._items[this.relative(this._current)];
    } }, { filter: ["items", "settings"], run: function run() {
      var a = this._clones,
          b = this.$stage.children(".cloned");(b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = []);
    } }, { filter: ["items", "settings"], run: function run() {
      var a,
          b,
          c = this._clones,
          d = this._items,
          e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;for (a = 0, b = Math.abs(e / 2); b > a; a++) e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")));
    } }, { filter: ["width", "items", "settings"], run: function run() {
      var a,
          b,
          c,
          d = this.settings.rtl ? 1 : -1,
          e = (this.width() / this.settings.items).toFixed(3),
          f = 0;for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++) a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f);
    } }, { filter: ["width", "items", "settings"], run: function run() {
      var b,
          c,
          d = (this.width() / this.settings.items).toFixed(3),
          e = { width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding, "padding-left": this.settings.stagePadding || "", "padding-right": this.settings.stagePadding || "" };if ((this.$stage.css(e), e = { width: this.settings.autoWidth ? "auto" : d - this.settings.margin }, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function (a) {
        return a > 1;
      }).length > 0)) for (b = 0, c = this._coordinates.length; c > b; b++) e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e);else this.$stage.children().css(e);
    } }, { filter: ["width", "items", "settings"], run: function run(a) {
      a.current && this.reset(this.$stage.children().index(a.current));
    } }, { filter: ["position"], run: function run() {
      this.animate(this.coordinates(this._current));
    } }, { filter: ["width", "position", "items", "settings"], run: function run() {
      var a,
          b,
          c,
          d,
          e = this.settings.rtl ? 1 : -1,
          f = 2 * this.settings.stagePadding,
          g = this.coordinates(this.current()) + f,
          h = g + this.width() * e,
          i = [];for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass));
    } }], e.prototype.initialize = function () {
    if ((this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0)) {
      var b, c, e;if ((b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e)) return this.preloadAutoWidthImages(b), !1;
    }this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized");
  }, e.prototype.setup = function () {
    var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;c ? (a.each(c, function (a) {
      b >= a && a > d && (d = Number(a));
    }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function (a, b) {
      return b.replace(/\b owl-responsive-\S+/g, "");
    }).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", { property: { name: "settings", value: e } }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", { property: { name: "settings", value: this.settings } }));
  }, e.prototype.optionsLogic = function () {
    this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1);
  }, e.prototype.prepare = function (b) {
    var c = this.trigger("prepare", { content: b });return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", { content: c.data }), c.data;
  }, e.prototype.update = function () {
    for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
      return this[a];
    }, this._invalidated), e = {}; c > b;) (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;this._invalidated = {};
  }, e.prototype.width = function (a) {
    switch (a = a || e.Width.Default) {case e.Width.Inner:case e.Width.Outer:
        return this._width;default:
        return this._width - 2 * this.settings.stagePadding + this.settings.margin;}
  }, e.prototype.refresh = function () {
    if (0 === this._items.length) return !1;new Date().getTime();this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed");
  }, e.prototype.eventsCall = function () {
    this.e._onDragStart = a.proxy(function (a) {
      this.onDragStart(a);
    }, this), this.e._onDragMove = a.proxy(function (a) {
      this.onDragMove(a);
    }, this), this.e._onDragEnd = a.proxy(function (a) {
      this.onDragEnd(a);
    }, this), this.e._onResize = a.proxy(function (a) {
      this.onResize(a);
    }, this), this.e._transitionEnd = a.proxy(function (a) {
      this.transitionEnd(a);
    }, this), this.e._preventClick = a.proxy(function (a) {
      this.preventClick(a);
    }, this);
  }, e.prototype.onThrottledResize = function () {
    b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate);
  }, e.prototype.onResize = function () {
    return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1;
  }, e.prototype.eventsRouter = function (a) {
    var b = a.type;"mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a);
  }, e.prototype.internalEvents = function () {
    var c = (k(), l());this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function (a) {
      this.eventsRouter(a);
    }, this)), this.$stage.on("dragstart", function () {
      return !1;
    }), this.$stage.get(0).onselectstart = function () {
      return !1;
    }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function (a) {
      this.eventsRouter(a);
    }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this));
  }, e.prototype.onDragStart = function (d) {
    var e, g, h, i;if ((e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch)) return !1;if (("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = new Date().getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d)) i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0;else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function (a) {
      this.eventsRouter(a);
    }, this));
  }, e.prototype.onDragMove = function (a) {
    var c, e, g, h, i, j;this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)));
  }, e.prototype.onDragEnd = function (b) {
    var d, e, f;if (this.state.isTouch) {
      if (("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0)) return this.state.inMotion = !1, !1;this.drag.endTime = new Date().getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents");
    }
  }, e.prototype.removeClick = function (c) {
    this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function () {
      a(c).off("click.preventClick");
    }, 300);
  }, e.prototype.preventClick = function (b) {
    b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick");
  }, e.prototype.getTransformProperty = function () {
    var a, c;return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12];
  }, e.prototype.closest = function (b) {
    var c = -1,
        d = 30,
        e = this.width(),
        f = this.coordinates();return this.settings.freeDrag || a.each(f, a.proxy(function (a, g) {
      return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c;
    }, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c;
  }, e.prototype.animate = function (b) {
    this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({ transform: "translate3d(" + b + "px,0px, 0px)", transition: this.speed() / 1e3 + "s" }) : this.state.isTouch ? this.$stage.css({ left: b + "px" }) : this.$stage.animate({ left: b }, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function () {
      this.state.inMotion && this.transitionEnd();
    }, this));
  }, e.prototype.current = function (a) {
    if (a === d) return this._current;if (0 === this._items.length) return d;if ((a = this.normalize(a), this._current !== a)) {
      var b = this.trigger("change", { property: { name: "position", value: a } });b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", { property: { name: "position", value: this._current } });
    }return this._current;
  }, e.prototype.invalidate = function (a) {
    this._invalidated[a] = !0;
  }, e.prototype.reset = function (a) {
    a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]));
  }, e.prototype.normalize = function (b, c) {
    var e = c ? this._items.length : this._items.length + this._clones.length;return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b));
  }, e.prototype.relative = function (a) {
    return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0);
  }, e.prototype.maximum = function (a) {
    var b,
        c,
        d,
        e = 0,
        f = this.settings;if (a) return this._items.length - 1;if (!f.loop && f.center) b = this._items.length - 1;else if (f.loop || f.center) if (f.loop || f.center) b = this._items.length + f.items;else {
      if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position.";for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width(); (d = this.coordinates(e)) && !(d * revert >= c);) b = ++e;
    } else b = this._items.length - f.items;return b;
  }, e.prototype.minimum = function (a) {
    return a ? 0 : this._clones.length / 2;
  }, e.prototype.items = function (a) {
    return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a]);
  }, e.prototype.mergers = function (a) {
    return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a]);
  }, e.prototype.clones = function (b) {
    var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function f(a) {
      return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
    };return b === d ? a.map(this._clones, function (a, b) {
      return f(b);
    }) : a.map(this._clones, function (a, c) {
      return a === b ? f(c) : null;
    });
  }, e.prototype.speed = function (a) {
    return a !== d && (this._speed = a), this._speed;
  }, e.prototype.coordinates = function (b) {
    var c = null;return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
      return this.coordinates(b);
    }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c);
  }, e.prototype.duration = function (a, b, c) {
    return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed);
  }, e.prototype.to = function (c, d) {
    if (this.settings.loop) {
      var e = c - this.relative(this.current()),
          f = this.current(),
          g = this.current(),
          h = this.current() + e,
          i = 0 > g - h ? !0 : !1,
          j = this._clones.length + this._items.length;h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function () {
        this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update();
      }, this), 30);
    } else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update();
  }, e.prototype.next = function (a) {
    a = a || !1, this.to(this.relative(this.current()) + 1, a);
  }, e.prototype.prev = function (a) {
    a = a || !1, this.to(this.relative(this.current()) - 1, a);
  }, e.prototype.transitionEnd = function (a) {
    return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"));
  }, e.prototype.viewport = function () {
    var d;if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();else if (b.innerWidth) d = b.innerWidth;else {
      if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";d = c.documentElement.clientWidth;
    }return d;
  }, e.prototype.replace = function (b) {
    this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
      return 1 === this.nodeType;
    }).each(a.proxy(function (a, b) {
      b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1);
    }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items");
  }, e.prototype.add = function (a, b) {
    b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", { content: a, position: b }), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", { content: a, position: b });
  }, e.prototype.remove = function (a) {
    a = this.normalize(a, !0), a !== d && (this.trigger("remove", { content: this._items[a], position: a }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", { content: null, position: a }));
  }, e.prototype.addTriggerableEvents = function () {
    var b = a.proxy(function (b, c) {
      return a.proxy(function (a) {
        a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c]));
      }, this);
    }, this);a.each({ next: this.next, prev: this.prev, to: this.to, destroy: this.destroy, refresh: this.refresh, replace: this.replace, add: this.add, remove: this.remove }, a.proxy(function (a, c) {
      this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"));
    }, this));
  }, e.prototype.watchVisibility = function () {
    function c(a) {
      return a.offsetWidth > 0 && a.offsetHeight > 0;
    }function d() {
      c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile));
    }c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500));
  }, e.prototype.preloadAutoWidthImages = function (b) {
    var c, d, e, f;c = 0, d = this, b.each(function (g, h) {
      e = a(h), f = new Image(), f.onload = function () {
        c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize());
      }, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina");
    });
  }, e.prototype.destroy = function () {
    this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);for (var d in this._plugins) this._plugins[d].destroy();(this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function () {}, this.$stage.off("dragstart", function () {
      return !1;
    })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap();
  }, e.prototype.op = function (a, b, c) {
    var d = this.settings.rtl;switch (b) {case "<":
        return d ? a > c : c > a;case ">":
        return d ? c > a : a > c;case ">=":
        return d ? c >= a : a >= c;case "<=":
        return d ? a >= c : c >= a;}
  }, e.prototype.on = function (a, b, c, d) {
    a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c);
  }, e.prototype.off = function (a, b, c, d) {
    a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c);
  }, e.prototype.trigger = function (b, c, d) {
    var e = { item: { count: this._items.length, index: this.current() } },
        f = a.camelCase(a.grep(["on", b, d], function (a) {
      return a;
    }).join("-").toLowerCase()),
        g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({ relatedTarget: this }, e, c));return this._supress[b] || (a.each(this._plugins, function (a, b) {
      b.onTrigger && b.onTrigger(g);
    }), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g;
  }, e.prototype.suppress = function (b) {
    a.each(b, a.proxy(function (a, b) {
      this._supress[b] = !0;
    }, this));
  }, e.prototype.release = function (b) {
    a.each(b, a.proxy(function (a, b) {
      delete this._supress[b];
    }, this));
  }, e.prototype.browserSupport = function () {
    if ((this.support3d = j(), this.support3d)) {
      this.transformVendor = i();var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : "";
    }this.state.orientation = b.orientation;
  }, a.fn.owlCarousel = function (b) {
    return this.each(function () {
      a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b));
    });
  }, a.fn.owlCarousel.Constructor = e;
})(window.Zepto || window.jQuery, window, document), (function (a, b) {
  var c = function c(b) {
    this._core = b, this._loaded = [], this._handlers = { "initialized.owl.carousel change.owl.carousel": a.proxy(function (b) {
        if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function (a, b) {
          this.load(b);
        }, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h);
      }, this) }, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers);
  };c.Defaults = { lazyLoad: !1 }, c.prototype.load = function (c) {
    var d = this._core.$stage.children().eq(c),
        e = d && d.find(".owl-lazy");!e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
      var e,
          f = a(d),
          g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");this._core.trigger("load", { element: f, url: g }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
        f.css("opacity", 1), this._core.trigger("loaded", { element: f, url: g }, "lazy");
      }, this)).attr("src", g) : (e = new Image(), e.onload = a.proxy(function () {
        f.css({ "background-image": "url(" + g + ")", opacity: "1" }), this._core.trigger("loaded", { element: f, url: g }, "lazy");
      }, this), e.src = g);
    }, this)), this._loaded.push(d.get(0)));
  }, c.prototype.destroy = function () {
    var a, b;for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.Lazy = c;
})(window.Zepto || window.jQuery, window, document), (function (a) {
  var b = function b(c) {
    this._core = c, this._handlers = { "initialized.owl.carousel": a.proxy(function () {
        this._core.settings.autoHeight && this.update();
      }, this), "changed.owl.carousel": a.proxy(function (a) {
        this._core.settings.autoHeight && "position" == a.property.name && this.update();
      }, this), "loaded.owl.lazy": a.proxy(function (a) {
        this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update();
      }, this) }, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers);
  };b.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }, b.prototype.update = function () {
    this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass);
  }, b.prototype.destroy = function () {
    var a, b;for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b;
})(window.Zepto || window.jQuery, window, document), (function (a, b, c) {
  var d = function d(b) {
    this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = { "resize.owl.carousel": a.proxy(function (a) {
        this._core.settings.video && !this.isInFullScreen() && a.preventDefault();
      }, this), "refresh.owl.carousel changed.owl.carousel": a.proxy(function () {
        this._playing && this.stop();
      }, this), "prepared.owl.carousel": a.proxy(function (b) {
        var c = a(b.content).find(".owl-video");c.length && (c.css("display", "none"), this.fetch(c, a(b.content)));
      }, this) }, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
      this.play(a);
    }, this));
  };d.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }, d.prototype.fetch = function (a, b) {
    var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
        d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
        e = a.attr("data-width") || this._core.settings.videoWidth,
        f = a.attr("data-height") || this._core.settings.videoHeight,
        g = a.attr("href");if (!g) throw new Error("Missing video URL.");if ((d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1)) c = "youtube";else {
      if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");c = "vimeo";
    }d = d[6], this._videos[g] = { type: c, id: d, width: e, height: f }, b.attr("data-video", g), this.thumbnail(a, this._videos[g]);
  }, d.prototype.thumbnail = function (b, c) {
    var d,
        e,
        f,
        g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
        h = b.find("img"),
        i = "src",
        j = "",
        k = this._core.settings,
        l = function l(a) {
      e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e);
    };return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void ("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({ type: "GET", url: "http://vimeo.com/api/v2/video/" + c.id + ".json", jsonp: "callback", dataType: "jsonp", success: function success(a) {
        f = a[0].thumbnail_large, l(f);
      } }));
  }, d.prototype.stop = function () {
    this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null;
  }, d.prototype.play = function (b) {
    this._core.trigger("play", null, "video"), this._playing && this.stop();var c,
        d,
        e = a(b.target || b.srcElement),
        f = e.closest("." + this._core.settings.itemClass),
        g = this._videos[f.attr("data-video")],
        h = g.width || "100%",
        i = g.height || this._core.$stage.height();"youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d);
  }, d.prototype.isInFullScreen = function () {
    var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0;
  }, d.prototype.destroy = function () {
    var a, b;this._core.$element.off("click.owl.video");for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.Video = d;
})(window.Zepto || window.jQuery, window, document), (function (a, b, c, d) {
  var e = function e(b) {
    this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = { "change.owl.carousel": a.proxy(function (a) {
        "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value);
      }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
        this.swapping = "translated" == a.type;
      }, this), "translate.owl.carousel": a.proxy(function () {
        this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
      }, this) }, this.core.$element.on(this.handlers);
  };e.Defaults = { animateOut: !1, animateIn: !1 }, e.prototype.swap = function () {
    if (1 === this.core.settings.items && this.core.support3d) {
      this.core.speed(0);var b,
          c = a.proxy(this.clear, this),
          d = this.core.$stage.children().eq(this.previous),
          e = this.core.$stage.children().eq(this.next),
          f = this.core.settings.animateIn,
          g = this.core.settings.animateOut;this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({ left: b + "px" }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c));
    }
  }, e.prototype.clear = function (b) {
    a(b.target).css({ left: "" }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd();
  }, e.prototype.destroy = function () {
    var a, b;for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.Animate = e;
})(window.Zepto || window.jQuery, window, document), (function (a, b, c) {
  var d = function d(b) {
    this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = { "translated.owl.carousel refreshed.owl.carousel": a.proxy(function () {
        this.autoplay();
      }, this), "play.owl.autoplay": a.proxy(function (a, b, c) {
        this.play(b, c);
      }, this), "stop.owl.autoplay": a.proxy(function () {
        this.stop();
      }, this), "mouseover.owl.autoplay": a.proxy(function () {
        this.core.settings.autoplayHoverPause && this.pause();
      }, this), "mouseleave.owl.autoplay": a.proxy(function () {
        this.core.settings.autoplayHoverPause && this.autoplay();
      }, this) }, this.core.$element.on(this.handlers);
  };d.Defaults = { autoplay: !1, autoplayTimeout: 5e3, autoplayHoverPause: !1, autoplaySpeed: !1 }, d.prototype.autoplay = function () {
    this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function () {
      this.play();
    }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval);
  }, d.prototype.play = function () {
    return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed);
  }, d.prototype.stop = function () {
    b.clearInterval(this.interval);
  }, d.prototype.pause = function () {
    b.clearInterval(this.interval);
  }, d.prototype.destroy = function () {
    var a, c;b.clearInterval(this.interval);for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.autoplay = d;
})(window.Zepto || window.jQuery, window, document), (function (a) {
  "use strict";var b = function b(c) {
    this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = { next: this._core.next, prev: this._core.prev, to: this._core.to }, this._handlers = { "prepared.owl.carousel": a.proxy(function (b) {
        this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"));
      }, this), "add.owl.carousel": a.proxy(function (b) {
        this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"));
      }, this), "remove.owl.carousel prepared.owl.carousel": a.proxy(function (a) {
        this._core.settings.dotsData && this._templates.splice(a.position, 1);
      }, this), "change.owl.carousel": a.proxy(function (a) {
        if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
          var b = this._core.current(),
              c = this._core.maximum(),
              d = this._core.minimum();a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value;
        }
      }, this), "changed.owl.carousel": a.proxy(function (a) {
        "position" == a.property.name && this.draw();
      }, this), "refreshed.owl.carousel": a.proxy(function () {
        this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation");
      }, this) }, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers);
  };b.Defaults = { nav: !1, navRewind: !0, navText: ["prev", "next"], navSpeed: !1, navElement: "div", navContainer: !1, navContainerClass: "owl-nav", navClass: ["owl-prev", "owl-next"], slideBy: 1, dotClass: "owl-dot", dotsClass: "owl-dots", dots: !0, dotsEach: !1, dotData: !1, dotsSpeed: !1, dotsContainer: !1, controlsClass: "owl-controls" }, b.prototype.initialize = function () {
    var b,
        c,
        d = this._core.settings;d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function (b) {
      var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();b.preventDefault(), this.to(c, d.dotsSpeed);
    }, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function () {
      this.prev(d.navSpeed);
    }, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function () {
      this.next(d.navSpeed);
    }, this));for (c in this._overrides) this._core[c] = a.proxy(this[c], this);
  }, b.prototype.destroy = function () {
    var a, b, c, d;for (a in this._handlers) this.$element.off(a, this._handlers[a]);for (b in this._controls) this._controls[b].remove();for (d in this.overides) this._core[d] = this._overrides[d];for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null);
  }, b.prototype.update = function () {
    var a,
        b,
        c,
        d = this._core.settings,
        e = this._core.clones().length / 2,
        f = e + this._core.items().length,
        g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;if (("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy)) for (this._pages = [], a = e, b = 0, c = 0; f > a; a++) (b >= g || 0 === b) && (this._pages.push({ start: a - e, end: a - e + g - 1 }), b = 0, ++c), b += this._core.mergers(this._core.relative(a));
  }, b.prototype.draw = function () {
    var b,
        c,
        d = "",
        e = this._core.settings,
        f = (this._core.$stage.children(), this._core.relative(this._core.current()));if ((!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots)) {
      if ((b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b)) {
        for (c = 0; c < this._controls.$indicators.children().length; c++) d += this._templates[this._core.relative(c)];this._controls.$indicators.html(d);
      } else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active");
    }this._controls.$indicators.toggle(e.dots);
  }, b.prototype.onTrigger = function (b) {
    var c = this._core.settings;b.page = { index: a.inArray(this.current(), this._pages), count: this._pages.length, size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items) };
  }, b.prototype.current = function () {
    var b = this._core.relative(this._core.current());return a.grep(this._pages, function (a) {
      return a.start <= b && a.end >= b;
    }).pop();
  }, b.prototype.getPosition = function (b) {
    var c,
        d,
        e = this._core.settings;return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c;
  }, b.prototype.next = function (b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
  }, b.prototype.prev = function (b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
  }, b.prototype.to = function (b, c, d) {
    var e;d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c));
  }, a.fn.owlCarousel.Constructor.Plugins.Navigation = b;
})(window.Zepto || window.jQuery, window, document), (function (a, b) {
  "use strict";var c = function c(d) {
    this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = { "initialized.owl.carousel": a.proxy(function () {
        "URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation");
      }, this), "prepared.owl.carousel": a.proxy(function (b) {
        var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");this._hashes[c] = b.content;
      }, this) }, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function () {
      var a = b.location.hash.substring(1),
          c = this._core.$stage.children(),
          d = this._hashes[a] && c.index(this._hashes[a]) || 0;return a ? void this._core.to(d, !1, !0) : !1;
    }, this));
  };c.Defaults = { URLhashListener: !1 }, c.prototype.destroy = function () {
    var c, d;a(b).off("hashchange.owl.navigation");for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.Hash = c;
})(window.Zepto || window.jQuery, window, document);
/*
Copyright 2014 Igor Vaynberg

Version: 3.5.2 Timestamp: Sat Nov  1 14:43:36 EDT 2014

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
General Public License version 2 (the "GPL License"). You may choose either license to govern your
use of this software only upon the condition that you accept all of the terms of either the Apache
License or the GPL License.

You may obtain a copy of the Apache License and the GPL License at:

http://www.apache.org/licenses/LICENSE-2.0
http://www.gnu.org/licenses/gpl-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the Apache License
or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied. See the Apache License and the GPL License for the specific language governing
permissions and limitations under the Apache License and the GPL License.
*/
"use strict";

!(function (a) {
  "undefined" == typeof a.fn.each2 && a.extend(a.fn, { each2: function each2(b) {
      for (var c = a([0]), d = -1, e = this.length; ++d < e && (c.context = c[0] = this[d]) && b.call(c[0], d, c) !== !1;);return this;
    } });
})(jQuery), (function (a, b) {
  "use strict";function n(b) {
    var c = a(document.createTextNode(""));b.before(c), c.before(b), c.remove();
  }function o(a) {
    function b(a) {
      return m[a] || a;
    }return a.replace(/[^\u0000-\u007E]/g, b);
  }function p(a, b) {
    for (var c = 0, d = b.length; d > c; c += 1) if (r(a, b[c])) return c;return -1;
  }function q() {
    var b = a(l);b.appendTo(document.body);var c = { width: b.width() - b[0].clientWidth, height: b.height() - b[0].clientHeight };return b.remove(), c;
  }function r(a, c) {
    return a === c ? !0 : a === b || c === b ? !1 : null === a || null === c ? !1 : a.constructor === String ? a + "" == c + "" : c.constructor === String ? c + "" == a + "" : !1;
  }function s(a, b, c) {
    var d, e, f;if (null === a || a.length < 1) return [];for (d = a.split(b), e = 0, f = d.length; f > e; e += 1) d[e] = c(d[e]);return d;
  }function t(a) {
    return a.outerWidth(!1) - a.width();
  }function u(c) {
    var d = "keyup-change-value";c.on("keydown", function () {
      a.data(c, d) === b && a.data(c, d, c.val());
    }), c.on("keyup", function () {
      var e = a.data(c, d);e !== b && c.val() !== e && (a.removeData(c, d), c.trigger("keyup-change"));
    });
  }function v(c) {
    c.on("mousemove", function (c) {
      var d = h;(d === b || d.x !== c.pageX || d.y !== c.pageY) && a(c.target).trigger("mousemove-filtered", c);
    });
  }function w(a, c, d) {
    d = d || b;var e;return function () {
      var b = arguments;window.clearTimeout(e), e = window.setTimeout(function () {
        c.apply(d, b);
      }, a);
    };
  }function x(a, b) {
    var c = w(a, function (a) {
      b.trigger("scroll-debounced", a);
    });b.on("scroll", function (a) {
      p(a.target, b.get()) >= 0 && c(a);
    });
  }function y(a) {
    a[0] !== document.activeElement && window.setTimeout(function () {
      var d,
          b = a[0],
          c = a.val().length;a.focus();var e = b.offsetWidth > 0 || b.offsetHeight > 0;e && b === document.activeElement && (b.setSelectionRange ? b.setSelectionRange(c, c) : b.createTextRange && (d = b.createTextRange(), d.collapse(!1), d.select()));
    }, 0);
  }function z(b) {
    b = a(b)[0];var c = 0,
        d = 0;if ("selectionStart" in b) c = b.selectionStart, d = b.selectionEnd - c;else if ("selection" in document) {
      b.focus();var e = document.selection.createRange();d = document.selection.createRange().text.length, e.moveStart("character", -b.value.length), c = e.text.length - d;
    }return { offset: c, length: d };
  }function A(a) {
    a.preventDefault(), a.stopPropagation();
  }function B(a) {
    a.preventDefault(), a.stopImmediatePropagation();
  }function C(b) {
    if (!g) {
      var c = b[0].currentStyle || window.getComputedStyle(b[0], null);g = a(document.createElement("div")).css({ position: "absolute", left: "-10000px", top: "-10000px", display: "none", fontSize: c.fontSize, fontFamily: c.fontFamily, fontStyle: c.fontStyle, fontWeight: c.fontWeight, letterSpacing: c.letterSpacing, textTransform: c.textTransform, whiteSpace: "nowrap" }), g.attr("class", "select2-sizer"), a(document.body).append(g);
    }return g.text(b.val()), g.width();
  }function D(b, c, d) {
    var e,
        g,
        f = [];e = a.trim(b.attr("class")), e && (e = "" + e, a(e.split(/\s+/)).each2(function () {
      0 === this.indexOf("select2-") && f.push(this);
    })), e = a.trim(c.attr("class")), e && (e = "" + e, a(e.split(/\s+/)).each2(function () {
      0 !== this.indexOf("select2-") && (g = d(this), g && f.push(g));
    })), b.attr("class", f.join(" "));
  }function E(a, b, c, d) {
    var e = o(a.toUpperCase()).indexOf(o(b.toUpperCase())),
        f = b.length;return 0 > e ? (c.push(d(a)), void 0) : (c.push(d(a.substring(0, e))), c.push("<span class='select2-match'>"), c.push(d(a.substring(e, e + f))), c.push("</span>"), c.push(d(a.substring(e + f, a.length))), void 0);
  }function F(a) {
    var b = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" };return String(a).replace(/[&<>"'\/\\]/g, function (a) {
      return b[a];
    });
  }function G(c) {
    var d,
        e = null,
        f = c.quietMillis || 100,
        g = c.url,
        h = this;return function (i) {
      window.clearTimeout(d), d = window.setTimeout(function () {
        var d = c.data,
            f = g,
            j = c.transport || a.fn.select2.ajaxDefaults.transport,
            k = { type: c.type || "GET", cache: c.cache || !1, jsonpCallback: c.jsonpCallback || b, dataType: c.dataType || "json" },
            l = a.extend({}, a.fn.select2.ajaxDefaults.params, k);d = d ? d.call(h, i.term, i.page, i.context) : null, f = "function" == typeof f ? f.call(h, i.term, i.page, i.context) : f, e && "function" == typeof e.abort && e.abort(), c.params && (a.isFunction(c.params) ? a.extend(l, c.params.call(h)) : a.extend(l, c.params)), a.extend(l, { url: f, dataType: c.dataType, data: d, success: function success(a) {
            var b = c.results(a, i.page, i);i.callback(b);
          }, error: function error(a, b, c) {
            var d = { hasError: !0, jqXHR: a, textStatus: b, errorThrown: c };i.callback(d);
          } }), e = j.call(h, l);
      }, f);
    };
  }function H(b) {
    var d,
        e,
        c = b,
        f = function f(a) {
      return "" + a.text;
    };a.isArray(c) && (e = c, c = { results: e }), a.isFunction(c) === !1 && (e = c, c = function () {
      return e;
    });var g = c();return g.text && (f = g.text, a.isFunction(f) || (d = g.text, f = function (a) {
      return a[d];
    })), function (b) {
      var g,
          d = b.term,
          e = { results: [] };return "" === d ? (b.callback(c()), void 0) : (g = function (c, e) {
        var h, i;if ((c = c[0], c.children)) {
          h = {};for (i in c) c.hasOwnProperty(i) && (h[i] = c[i]);h.children = [], a(c.children).each2(function (a, b) {
            g(b, h.children);
          }), (h.children.length || b.matcher(d, f(h), c)) && e.push(h);
        } else b.matcher(d, f(c), c) && e.push(c);
      }, a(c().results).each2(function (a, b) {
        g(b, e.results);
      }), b.callback(e), void 0);
    };
  }function I(c) {
    var d = a.isFunction(c);return function (e) {
      var f = e.term,
          g = { results: [] },
          h = d ? c(e) : c;a.isArray(h) && (a(h).each(function () {
        var a = this.text !== b,
            c = a ? this.text : this;("" === f || e.matcher(f, c)) && g.results.push(a ? this : { id: this, text: this });
      }), e.callback(g));
    };
  }function J(b, c) {
    if (a.isFunction(b)) return !0;if (!b) return !1;if ("string" == typeof b) return !0;throw new Error(c + " must be a string, function, or falsy value");
  }function K(b, c) {
    if (a.isFunction(b)) {
      var d = Array.prototype.slice.call(arguments, 2);return b.apply(c, d);
    }return b;
  }function L(b) {
    var c = 0;return a.each(b, function (a, b) {
      b.children ? c += L(b.children) : c++;
    }), c;
  }function M(a, c, d, e) {
    var h,
        i,
        j,
        k,
        l,
        f = a,
        g = !1;if (!e.createSearchChoice || !e.tokenSeparators || e.tokenSeparators.length < 1) return b;for (;;) {
      for (i = -1, j = 0, k = e.tokenSeparators.length; k > j && (l = e.tokenSeparators[j], i = a.indexOf(l), !(i >= 0)); j++);if (0 > i) break;if ((h = a.substring(0, i), a = a.substring(i + l.length), h.length > 0 && (h = e.createSearchChoice.call(this, h, c), h !== b && null !== h && e.id(h) !== b && null !== e.id(h)))) {
        for (g = !1, j = 0, k = c.length; k > j; j++) if (r(e.id(h), e.id(c[j]))) {
          g = !0;break;
        }g || d(h);
      }
    }return f !== a ? a : void 0;
  }function N() {
    var b = this;a.each(arguments, function (a, c) {
      b[c].remove(), b[c] = null;
    });
  }function O(b, c) {
    var d = function d() {};return d.prototype = new b(), d.prototype.constructor = d, d.prototype.parent = b.prototype, d.prototype = a.extend(d.prototype, c), d;
  }if (window.Select2 === b) {
    var c,
        d,
        e,
        f,
        g,
        i,
        j,
        h = { x: 0, y: 0 },
        k = { TAB: 9, ENTER: 13, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SHIFT: 16, CTRL: 17, ALT: 18, PAGE_UP: 33, PAGE_DOWN: 34, HOME: 36, END: 35, BACKSPACE: 8, DELETE: 46, isArrow: function isArrow(a) {
        switch (a = a.which ? a.which : a) {case k.LEFT:case k.RIGHT:case k.UP:case k.DOWN:
            return !0;}return !1;
      }, isControl: function isControl(a) {
        var b = a.which;switch (b) {case k.SHIFT:case k.CTRL:case k.ALT:
            return !0;}return a.metaKey ? !0 : !1;
      }, isFunctionKey: function isFunctionKey(a) {
        return a = a.which ? a.which : a, a >= 112 && 123 >= a;
      } },
        l = "<div class='select2-measure-scrollbar'></div>",
        m = { "Ⓐ": "A", "Ａ": "A", "\xc0": "A", "\xc1": "A", "\xc2": "A", "Ầ": "A", "Ấ": "A", "Ẫ": "A", "Ẩ": "A", "\xc3": "A", "Ā": "A", "Ă": "A", "Ằ": "A", "Ắ": "A", "Ẵ": "A", "Ẳ": "A", "Ȧ": "A", "Ǡ": "A", "\xc4": "A", "Ǟ": "A", "Ả": "A", "\xc5": "A", "Ǻ": "A", "Ǎ": "A", "Ȁ": "A", "Ȃ": "A", "Ạ": "A", "Ậ": "A", "Ặ": "A", "Ḁ": "A", "Ą": "A", "Ⱥ": "A", "Ɐ": "A", "Ꜳ": "AA", "\xc6": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ⓑ": "B", "Ｂ": "B", "Ḃ": "B", "Ḅ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ɓ": "B", "Ⓒ": "C", "Ｃ": "C", "Ć": "C", "Ĉ": "C", "Ċ": "C", "Č": "C", "\xc7": "C", "Ḉ": "C", "Ƈ": "C", "Ȼ": "C", "Ꜿ": "C", "Ⓓ": "D", "Ｄ": "D", "Ḋ": "D", "Ď": "D", "Ḍ": "D", "Ḑ": "D", "Ḓ": "D", "Ḏ": "D", "Đ": "D", "Ƌ": "D", "Ɗ": "D", "Ɖ": "D", "Ꝺ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "ǲ": "Dz", "ǅ": "Dz", "Ⓔ": "E", "Ｅ": "E", "\xc8": "E", "\xc9": "E", "\xca": "E", "Ề": "E", "Ế": "E", "Ễ": "E", "Ể": "E", "Ẽ": "E", "Ē": "E", "Ḕ": "E", "Ḗ": "E", "Ĕ": "E", "Ė": "E", "\xcb": "E", "Ẻ": "E", "Ě": "E", "Ȅ": "E", "Ȇ": "E", "Ẹ": "E", "Ệ": "E", "Ȩ": "E", "Ḝ": "E", "Ę": "E", "Ḙ": "E", "Ḛ": "E", "Ɛ": "E", "Ǝ": "E", "Ⓕ": "F", "Ｆ": "F", "Ḟ": "F", "Ƒ": "F", "Ꝼ": "F", "Ⓖ": "G", "Ｇ": "G", "Ǵ": "G", "Ĝ": "G", "Ḡ": "G", "Ğ": "G", "Ġ": "G", "Ǧ": "G", "Ģ": "G", "Ǥ": "G", "Ɠ": "G", "Ꞡ": "G", "Ᵹ": "G", "Ꝿ": "G", "Ⓗ": "H", "Ｈ": "H", "Ĥ": "H", "Ḣ": "H", "Ḧ": "H", "Ȟ": "H", "Ḥ": "H", "Ḩ": "H", "Ḫ": "H", "Ħ": "H", "Ⱨ": "H", "Ⱶ": "H", "Ɥ": "H", "Ⓘ": "I", "Ｉ": "I", "\xcc": "I", "\xcd": "I", "\xce": "I", "Ĩ": "I", "Ī": "I", "Ĭ": "I", "İ": "I", "\xcf": "I", "Ḯ": "I", "Ỉ": "I", "Ǐ": "I", "Ȉ": "I", "Ȋ": "I", "Ị": "I", "Į": "I", "Ḭ": "I", "Ɨ": "I", "Ⓙ": "J", "Ｊ": "J", "Ĵ": "J", "Ɉ": "J", "Ⓚ": "K", "Ｋ": "K", "Ḱ": "K", "Ǩ": "K", "Ḳ": "K", "Ķ": "K", "Ḵ": "K", "Ƙ": "K", "Ⱪ": "K", "Ꝁ": "K", "Ꝃ": "K", "Ꝅ": "K", "Ꞣ": "K", "Ⓛ": "L", "Ｌ": "L", "Ŀ": "L", "Ĺ": "L", "Ľ": "L", "Ḷ": "L", "Ḹ": "L", "Ļ": "L", "Ḽ": "L", "Ḻ": "L", "Ł": "L", "Ƚ": "L", "Ɫ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ꝇ": "L", "Ꞁ": "L", "Ǉ": "LJ", "ǈ": "Lj", "Ⓜ": "M", "Ｍ": "M", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ɯ": "M", "Ⓝ": "N", "Ｎ": "N", "Ǹ": "N", "Ń": "N", "\xd1": "N", "Ṅ": "N", "Ň": "N", "Ṇ": "N", "Ņ": "N", "Ṋ": "N", "Ṉ": "N", "Ƞ": "N", "Ɲ": "N", "Ꞑ": "N", "Ꞥ": "N", "Ǌ": "NJ", "ǋ": "Nj", "Ⓞ": "O", "Ｏ": "O", "\xd2": "O", "\xd3": "O", "\xd4": "O", "Ồ": "O", "Ố": "O", "Ỗ": "O", "Ổ": "O", "\xd5": "O", "Ṍ": "O", "Ȭ": "O", "Ṏ": "O", "Ō": "O", "Ṑ": "O", "Ṓ": "O", "Ŏ": "O", "Ȯ": "O", "Ȱ": "O", "\xd6": "O", "Ȫ": "O", "Ỏ": "O", "Ő": "O", "Ǒ": "O", "Ȍ": "O", "Ȏ": "O", "Ơ": "O", "Ờ": "O", "Ớ": "O", "Ỡ": "O", "Ở": "O", "Ợ": "O", "Ọ": "O", "Ộ": "O", "Ǫ": "O", "Ǭ": "O", "\xd8": "O", "Ǿ": "O", "Ɔ": "O", "Ɵ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ȣ": "OU", "Ⓟ": "P", "Ｐ": "P", "Ṕ": "P", "Ṗ": "P", "Ƥ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝓ": "P", "Ꝕ": "P", "Ⓠ": "Q", "Ｑ": "Q", "Ꝗ": "Q", "Ꝙ": "Q", "Ɋ": "Q", "Ⓡ": "R", "Ｒ": "R", "Ŕ": "R", "Ṙ": "R", "Ř": "R", "Ȑ": "R", "Ȓ": "R", "Ṛ": "R", "Ṝ": "R", "Ŗ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꝛ": "R", "Ꞧ": "R", "Ꞃ": "R", "Ⓢ": "S", "Ｓ": "S", "ẞ": "S", "Ś": "S", "Ṥ": "S", "Ŝ": "S", "Ṡ": "S", "Š": "S", "Ṧ": "S", "Ṣ": "S", "Ṩ": "S", "Ș": "S", "Ş": "S", "Ȿ": "S", "Ꞩ": "S", "Ꞅ": "S", "Ⓣ": "T", "Ｔ": "T", "Ṫ": "T", "Ť": "T", "Ṭ": "T", "Ț": "T", "Ţ": "T", "Ṱ": "T", "Ṯ": "T", "Ŧ": "T", "Ƭ": "T", "Ʈ": "T", "Ⱦ": "T", "Ꞇ": "T", "Ꜩ": "TZ", "Ⓤ": "U", "Ｕ": "U", "\xd9": "U", "\xda": "U", "\xdb": "U", "Ũ": "U", "Ṹ": "U", "Ū": "U", "Ṻ": "U", "Ŭ": "U", "\xdc": "U", "Ǜ": "U", "Ǘ": "U", "Ǖ": "U", "Ǚ": "U", "Ủ": "U", "Ů": "U", "Ű": "U", "Ǔ": "U", "Ȕ": "U", "Ȗ": "U", "Ư": "U", "Ừ": "U", "Ứ": "U", "Ữ": "U", "Ử": "U", "Ự": "U", "Ụ": "U", "Ṳ": "U", "Ų": "U", "Ṷ": "U", "Ṵ": "U", "Ʉ": "U", "Ⓥ": "V", "Ｖ": "V", "Ṽ": "V", "Ṿ": "V", "Ʋ": "V", "Ꝟ": "V", "Ʌ": "V", "Ꝡ": "VY", "Ⓦ": "W", "Ｗ": "W", "Ẁ": "W", "Ẃ": "W", "Ŵ": "W", "Ẇ": "W", "Ẅ": "W", "Ẉ": "W", "Ⱳ": "W", "Ⓧ": "X", "Ｘ": "X", "Ẋ": "X", "Ẍ": "X", "Ⓨ": "Y", "Ｙ": "Y", "Ỳ": "Y", "\xdd": "Y", "Ŷ": "Y", "Ỹ": "Y", "Ȳ": "Y", "Ẏ": "Y", "Ÿ": "Y", "Ỷ": "Y", "Ỵ": "Y", "Ƴ": "Y", "Ɏ": "Y", "Ỿ": "Y", "Ⓩ": "Z", "Ｚ": "Z", "Ź": "Z", "Ẑ": "Z", "Ż": "Z", "Ž": "Z", "Ẓ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ȥ": "Z", "Ɀ": "Z", "Ⱬ": "Z", "Ꝣ": "Z", "ⓐ": "a", "ａ": "a", "ẚ": "a", "\xe0": "a", "\xe1": "a", "\xe2": "a", "ầ": "a", "ấ": "a", "ẫ": "a", "ẩ": "a", "\xe3": "a", "ā": "a", "ă": "a", "ằ": "a", "ắ": "a", "ẵ": "a", "ẳ": "a", "ȧ": "a", "ǡ": "a", "\xe4": "a", "ǟ": "a", "ả": "a", "\xe5": "a", "ǻ": "a", "ǎ": "a", "ȁ": "a", "ȃ": "a", "ạ": "a", "ậ": "a", "ặ": "a", "ḁ": "a", "ą": "a", "ⱥ": "a", "ɐ": "a", "ꜳ": "aa", "\xe6": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ⓑ": "b", "ｂ": "b", "ḃ": "b", "ḅ": "b", "ḇ": "b", "ƀ": "b", "ƃ": "b", "ɓ": "b", "ⓒ": "c", "ｃ": "c", "ć": "c", "ĉ": "c", "ċ": "c", "č": "c", "\xe7": "c", "ḉ": "c", "ƈ": "c", "ȼ": "c", "ꜿ": "c", "ↄ": "c", "ⓓ": "d", "ｄ": "d", "ḋ": "d", "ď": "d", "ḍ": "d", "ḑ": "d", "ḓ": "d", "ḏ": "d", "đ": "d", "ƌ": "d", "ɖ": "d", "ɗ": "d", "ꝺ": "d", "ǳ": "dz", "ǆ": "dz", "ⓔ": "e", "ｅ": "e", "\xe8": "e", "\xe9": "e", "\xea": "e", "ề": "e", "ế": "e", "ễ": "e", "ể": "e", "ẽ": "e", "ē": "e", "ḕ": "e", "ḗ": "e", "ĕ": "e", "ė": "e", "\xeb": "e", "ẻ": "e", "ě": "e", "ȅ": "e", "ȇ": "e", "ẹ": "e", "ệ": "e", "ȩ": "e", "ḝ": "e", "ę": "e", "ḙ": "e", "ḛ": "e", "ɇ": "e", "ɛ": "e", "ǝ": "e", "ⓕ": "f", "ｆ": "f", "ḟ": "f", "ƒ": "f", "ꝼ": "f", "ⓖ": "g", "ｇ": "g", "ǵ": "g", "ĝ": "g", "ḡ": "g", "ğ": "g", "ġ": "g", "ǧ": "g", "ģ": "g", "ǥ": "g", "ɠ": "g", "ꞡ": "g", "ᵹ": "g", "ꝿ": "g", "ⓗ": "h", "ｈ": "h", "ĥ": "h", "ḣ": "h", "ḧ": "h", "ȟ": "h", "ḥ": "h", "ḩ": "h", "ḫ": "h", "ẖ": "h", "ħ": "h", "ⱨ": "h", "ⱶ": "h", "ɥ": "h", "ƕ": "hv", "ⓘ": "i", "ｉ": "i", "\xec": "i", "\xed": "i", "\xee": "i", "ĩ": "i", "ī": "i", "ĭ": "i", "\xef": "i", "ḯ": "i", "ỉ": "i", "ǐ": "i", "ȉ": "i", "ȋ": "i", "ị": "i", "į": "i", "ḭ": "i", "ɨ": "i", "ı": "i", "ⓙ": "j", "ｊ": "j", "ĵ": "j", "ǰ": "j", "ɉ": "j", "ⓚ": "k", "ｋ": "k", "ḱ": "k", "ǩ": "k", "ḳ": "k", "ķ": "k", "ḵ": "k", "ƙ": "k", "ⱪ": "k", "ꝁ": "k", "ꝃ": "k", "ꝅ": "k", "ꞣ": "k", "ⓛ": "l", "ｌ": "l", "ŀ": "l", "ĺ": "l", "ľ": "l", "ḷ": "l", "ḹ": "l", "ļ": "l", "ḽ": "l", "ḻ": "l", "ſ": "l", "ł": "l", "ƚ": "l", "ɫ": "l", "ⱡ": "l", "ꝉ": "l", "ꞁ": "l", "ꝇ": "l", "ǉ": "lj", "ⓜ": "m", "ｍ": "m", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ɯ": "m", "ⓝ": "n", "ｎ": "n", "ǹ": "n", "ń": "n", "\xf1": "n", "ṅ": "n", "ň": "n", "ṇ": "n", "ņ": "n", "ṋ": "n", "ṉ": "n", "ƞ": "n", "ɲ": "n", "ŉ": "n", "ꞑ": "n", "ꞥ": "n", "ǌ": "nj", "ⓞ": "o", "ｏ": "o", "\xf2": "o", "\xf3": "o", "\xf4": "o", "ồ": "o", "ố": "o", "ỗ": "o", "ổ": "o", "\xf5": "o", "ṍ": "o", "ȭ": "o", "ṏ": "o", "ō": "o", "ṑ": "o", "ṓ": "o", "ŏ": "o", "ȯ": "o", "ȱ": "o", "\xf6": "o", "ȫ": "o", "ỏ": "o", "ő": "o", "ǒ": "o", "ȍ": "o", "ȏ": "o", "ơ": "o", "ờ": "o", "ớ": "o", "ỡ": "o", "ở": "o", "ợ": "o", "ọ": "o", "ộ": "o", "ǫ": "o", "ǭ": "o", "\xf8": "o", "ǿ": "o", "ɔ": "o", "ꝋ": "o", "ꝍ": "o", "ɵ": "o", "ƣ": "oi", "ȣ": "ou", "ꝏ": "oo", "ⓟ": "p", "ｐ": "p", "ṕ": "p", "ṗ": "p", "ƥ": "p", "ᵽ": "p", "ꝑ": "p", "ꝓ": "p", "ꝕ": "p", "ⓠ": "q", "ｑ": "q", "ɋ": "q", "ꝗ": "q", "ꝙ": "q", "ⓡ": "r", "ｒ": "r", "ŕ": "r", "ṙ": "r", "ř": "r", "ȑ": "r", "ȓ": "r", "ṛ": "r", "ṝ": "r", "ŗ": "r", "ṟ": "r", "ɍ": "r", "ɽ": "r", "ꝛ": "r", "ꞧ": "r", "ꞃ": "r", "ⓢ": "s", "ｓ": "s", "\xdf": "s", "ś": "s", "ṥ": "s", "ŝ": "s", "ṡ": "s", "š": "s", "ṧ": "s", "ṣ": "s", "ṩ": "s", "ș": "s", "ş": "s", "ȿ": "s", "ꞩ": "s", "ꞅ": "s", "ẛ": "s", "ⓣ": "t", "ｔ": "t", "ṫ": "t", "ẗ": "t", "ť": "t", "ṭ": "t", "ț": "t", "ţ": "t", "ṱ": "t", "ṯ": "t", "ŧ": "t", "ƭ": "t", "ʈ": "t", "ⱦ": "t", "ꞇ": "t", "ꜩ": "tz", "ⓤ": "u", "ｕ": "u", "\xf9": "u", "\xfa": "u", "\xfb": "u", "ũ": "u", "ṹ": "u", "ū": "u", "ṻ": "u", "ŭ": "u", "\xfc": "u", "ǜ": "u", "ǘ": "u", "ǖ": "u", "ǚ": "u", "ủ": "u", "ů": "u", "ű": "u", "ǔ": "u", "ȕ": "u", "ȗ": "u", "ư": "u", "ừ": "u", "ứ": "u", "ữ": "u", "ử": "u", "ự": "u", "ụ": "u", "ṳ": "u", "ų": "u", "ṷ": "u", "ṵ": "u", "ʉ": "u", "ⓥ": "v", "ｖ": "v", "ṽ": "v", "ṿ": "v", "ʋ": "v", "ꝟ": "v", "ʌ": "v", "ꝡ": "vy", "ⓦ": "w", "ｗ": "w", "ẁ": "w", "ẃ": "w", "ŵ": "w", "ẇ": "w", "ẅ": "w", "ẘ": "w", "ẉ": "w", "ⱳ": "w", "ⓧ": "x", "ｘ": "x", "ẋ": "x", "ẍ": "x", "ⓨ": "y", "ｙ": "y", "ỳ": "y", "\xfd": "y", "ŷ": "y", "ỹ": "y", "ȳ": "y", "ẏ": "y", "\xff": "y", "ỷ": "y", "ẙ": "y", "ỵ": "y", "ƴ": "y", "ɏ": "y", "ỿ": "y", "ⓩ": "z", "ｚ": "z", "ź": "z", "ẑ": "z", "ż": "z", "ž": "z", "ẓ": "z", "ẕ": "z", "ƶ": "z", "ȥ": "z", "ɀ": "z", "ⱬ": "z", "ꝣ": "z", "Ά": "Α", "Έ": "Ε", "Ή": "Η", "Ί": "Ι", "Ϊ": "Ι", "Ό": "Ο", "Ύ": "Υ", "Ϋ": "Υ", "Ώ": "Ω", "ά": "α", "έ": "ε", "ή": "η", "ί": "ι", "ϊ": "ι", "ΐ": "ι", "ό": "ο", "ύ": "υ", "ϋ": "υ", "ΰ": "υ", "ω": "ω", "ς": "σ" };i = a(document), f = (function () {
      var a = 1;return function () {
        return a++;
      };
    })(), c = O(Object, { bind: function bind(a) {
        var b = this;return function () {
          a.apply(b, arguments);
        };
      }, init: function init(c) {
        var d,
            e,
            g = ".select2-results";this.opts = c = this.prepareOpts(c), this.id = c.id, c.element.data("select2") !== b && null !== c.element.data("select2") && c.element.data("select2").destroy(), this.container = this.createContainer(), this.liveRegion = a(".select2-hidden-accessible"), 0 == this.liveRegion.length && (this.liveRegion = a("<span>", { role: "status", "aria-live": "polite" }).addClass("select2-hidden-accessible").appendTo(document.body)), this.containerId = "s2id_" + (c.element.attr("id") || "autogen" + f()), this.containerEventName = this.containerId.replace(/([.])/g, "_").replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"), this.container.attr("id", this.containerId), this.container.attr("title", c.element.attr("title")), this.body = a(document.body), D(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.attr("style", c.element.attr("style")), this.container.css(K(c.containerCss, this.opts.element)), this.container.addClass(K(c.containerCssClass, this.opts.element)), this.elementTabIndex = this.opts.element.attr("tabindex"), this.opts.element.data("select2", this).attr("tabindex", "-1").before(this.container).on("click.select2", A), this.container.data("select2", this), this.dropdown = this.container.find(".select2-drop"), D(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(K(c.dropdownCssClass, this.opts.element)), this.dropdown.data("select2", this), this.dropdown.on("click", A), this.results = d = this.container.find(g), this.search = e = this.container.find("input.select2-input"), this.queryCount = 0, this.resultsPage = 0, this.context = null, this.initContainer(), this.container.on("click", A), v(this.results), this.dropdown.on("mousemove-filtered", g, this.bind(this.highlightUnderEvent)), this.dropdown.on("touchstart touchmove touchend", g, this.bind(function (a) {
          this._touchEvent = !0, this.highlightUnderEvent(a);
        })), this.dropdown.on("touchmove", g, this.bind(this.touchMoved)), this.dropdown.on("touchstart touchend", g, this.bind(this.clearTouchMoved)), this.dropdown.on("click", this.bind(function () {
          this._touchEvent && (this._touchEvent = !1, this.selectHighlighted());
        })), x(80, this.results), this.dropdown.on("scroll-debounced", g, this.bind(this.loadMoreIfNeeded)), a(this.container).on("change", ".select2-input", function (a) {
          a.stopPropagation();
        }), a(this.dropdown).on("change", ".select2-input", function (a) {
          a.stopPropagation();
        }), a.fn.mousewheel && d.mousewheel(function (a, b, c, e) {
          var f = d.scrollTop();e > 0 && 0 >= f - e ? (d.scrollTop(0), A(a)) : 0 > e && d.get(0).scrollHeight - d.scrollTop() + e <= d.height() && (d.scrollTop(d.get(0).scrollHeight - d.height()), A(a));
        }), u(e), e.on("keyup-change input paste", this.bind(this.updateResults)), e.on("focus", function () {
          e.addClass("select2-focused");
        }), e.on("blur", function () {
          e.removeClass("select2-focused");
        }), this.dropdown.on("mouseup", g, this.bind(function (b) {
          a(b.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(b), this.selectHighlighted(b));
        })), this.dropdown.on("click mouseup mousedown touchstart touchend focusin", function (a) {
          a.stopPropagation();
        }), this.nextSearchTerm = b, a.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()), null !== c.maximumInputLength && this.search.attr("maxlength", c.maximumInputLength);var h = c.element.prop("disabled");h === b && (h = !1), this.enable(!h);var i = c.element.prop("readonly");i === b && (i = !1), this.readonly(i), j = j || q(), this.autofocus = c.element.prop("autofocus"), c.element.prop("autofocus", !1), this.autofocus && this.focus(), this.search.attr("placeholder", c.searchInputPlaceholder);
      }, destroy: function destroy() {
        var a = this.opts.element,
            c = a.data("select2"),
            d = this;this.close(), a.length && a[0].detachEvent && d._sync && a.each(function () {
          d._sync && this.detachEvent("onpropertychange", d._sync);
        }), this.propertyObserver && (this.propertyObserver.disconnect(), this.propertyObserver = null), this._sync = null, c !== b && (c.container.remove(), c.liveRegion.remove(), c.dropdown.remove(), a.show().removeData("select2").off(".select2").prop("autofocus", this.autofocus || !1), this.elementTabIndex ? a.attr({ tabindex: this.elementTabIndex }) : a.removeAttr("tabindex"), a.show()), N.call(this, "container", "liveRegion", "dropdown", "results", "search");
      }, optionToData: function optionToData(a) {
        return a.is("option") ? { id: a.prop("value"), text: a.text(), element: a.get(), css: a.attr("class"), disabled: a.prop("disabled"), locked: r(a.attr("locked"), "locked") || r(a.data("locked"), !0) } : a.is("optgroup") ? { text: a.attr("label"), children: [], element: a.get(), css: a.attr("class") } : void 0;
      }, prepareOpts: function prepareOpts(c) {
        var d,
            e,
            g,
            h,
            i = this;if ((d = c.element, "select" === d.get(0).tagName.toLowerCase() && (this.select = e = c.element), e && a.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
          if (this in c) throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.");
        }), c = a.extend({}, { populateResults: function populateResults(d, e, g) {
            var h,
                j = this.opts.id,
                k = this.liveRegion;h = function (d, e, l) {
              var m, n, o, p, q, r, s, t, u, v;d = c.sortResults(d, e, g);var w = [];for (m = 0, n = d.length; n > m; m += 1) o = d[m], q = o.disabled === !0, p = !q && j(o) !== b, r = o.children && o.children.length > 0, s = a("<li></li>"), s.addClass("select2-results-dept-" + l), s.addClass("select2-result"), s.addClass(p ? "select2-result-selectable" : "select2-result-unselectable"), q && s.addClass("select2-disabled"), r && s.addClass("select2-result-with-children"), s.addClass(i.opts.formatResultCssClass(o)), s.attr("role", "presentation"), t = a(document.createElement("div")), t.addClass("select2-result-label"), t.attr("id", "select2-result-label-" + f()), t.attr("role", "option"), v = c.formatResult(o, t, g, i.opts.escapeMarkup), v !== b && (t.html(v), s.append(t)), r && (u = a("<ul></ul>"), u.addClass("select2-result-sub"), h(o.children, u, l + 1), s.append(u)), s.data("select2-data", o), w.push(s[0]);e.append(w), k.text(c.formatMatches(d.length));
            }, h(e, d, 0);
          } }, a.fn.select2.defaults, c), "function" != typeof c.id && (g = c.id, c.id = function (a) {
          return a[g];
        }), a.isArray(c.element.data("select2Tags")))) {
          if ("tags" in c) throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + c.element.attr("id");c.tags = c.element.data("select2Tags");
        }if ((e ? (c.query = this.bind(function (a) {
          var f,
              g,
              h,
              c = { results: [], more: !1 },
              e = a.term;h = function (b, c) {
            var d;b.is("option") ? a.matcher(e, b.text(), b) && c.push(i.optionToData(b)) : b.is("optgroup") && (d = i.optionToData(b), b.children().each2(function (a, b) {
              h(b, d.children);
            }), d.children.length > 0 && c.push(d));
          }, f = d.children(), this.getPlaceholder() !== b && f.length > 0 && (g = this.getPlaceholderOption(), g && (f = f.not(g))), f.each2(function (a, b) {
            h(b, c.results);
          }), a.callback(c);
        }), c.id = function (a) {
          return a.id;
        }) : "query" in c || ("ajax" in c ? (h = c.element.data("ajax-url"), h && h.length > 0 && (c.ajax.url = h), c.query = G.call(c.element, c.ajax)) : "data" in c ? c.query = H(c.data) : "tags" in c && (c.query = I(c.tags), c.createSearchChoice === b && (c.createSearchChoice = function (b) {
          return { id: a.trim(b), text: a.trim(b) };
        }), c.initSelection === b && (c.initSelection = function (b, d) {
          var e = [];a(s(b.val(), c.separator, c.transformVal)).each(function () {
            var b = { id: this, text: this },
                d = c.tags;a.isFunction(d) && (d = d()), a(d).each(function () {
              return r(this.id, b.id) ? (b = this, !1) : void 0;
            }), e.push(b);
          }), d(e);
        }))), "function" != typeof c.query)) throw "query function not defined for Select2 " + c.element.attr("id");if ("top" === c.createSearchChoicePosition) c.createSearchChoicePosition = function (a, b) {
          a.unshift(b);
        };else if ("bottom" === c.createSearchChoicePosition) c.createSearchChoicePosition = function (a, b) {
          a.push(b);
        };else if ("function" != typeof c.createSearchChoicePosition) throw "invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";return c;
      }, monitorSource: function monitorSource() {
        var d,
            c = this.opts.element,
            e = this;c.on("change.select2", this.bind(function () {
          this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection();
        })), this._sync = this.bind(function () {
          var a = c.prop("disabled");a === b && (a = !1), this.enable(!a);var d = c.prop("readonly");d === b && (d = !1), this.readonly(d), this.container && (D(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.addClass(K(this.opts.containerCssClass, this.opts.element))), this.dropdown && (D(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(K(this.opts.dropdownCssClass, this.opts.element)));
        }), c.length && c[0].attachEvent && c.each(function () {
          this.attachEvent("onpropertychange", e._sync);
        }), d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, d !== b && (this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), this.propertyObserver = new d(function (b) {
          a.each(b, e._sync);
        }), this.propertyObserver.observe(c.get(0), { attributes: !0, subtree: !1 }));
      }, triggerSelect: function triggerSelect(b) {
        var c = a.Event("select2-selecting", { val: this.id(b), object: b, choice: b });return this.opts.element.trigger(c), !c.isDefaultPrevented();
      }, triggerChange: function triggerChange(b) {
        b = b || {}, b = a.extend({}, b, { type: "change", val: this.val() }), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(b), this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), this.opts.blurOnChange && this.opts.element.blur();
      }, isInterfaceEnabled: function isInterfaceEnabled() {
        return this.enabledInterface === !0;
      }, enableInterface: function enableInterface() {
        var a = this._enabled && !this._readonly,
            b = !a;return a === this.enabledInterface ? !1 : (this.container.toggleClass("select2-container-disabled", b), this.close(), this.enabledInterface = a, !0);
      }, enable: function enable(a) {
        a === b && (a = !0), this._enabled !== a && (this._enabled = a, this.opts.element.prop("disabled", !a), this.enableInterface());
      }, disable: function disable() {
        this.enable(!1);
      }, readonly: function readonly(a) {
        a === b && (a = !1), this._readonly !== a && (this._readonly = a, this.opts.element.prop("readonly", a), this.enableInterface());
      }, opened: function opened() {
        return this.container ? this.container.hasClass("select2-dropdown-open") : !1;
      }, positionDropdown: function positionDropdown() {
        var v,
            w,
            x,
            y,
            z,
            b = this.dropdown,
            c = this.container,
            d = c.offset(),
            e = c.outerHeight(!1),
            f = c.outerWidth(!1),
            g = b.outerHeight(!1),
            h = a(window),
            i = h.width(),
            k = h.height(),
            l = h.scrollLeft() + i,
            m = h.scrollTop() + k,
            n = d.top + e,
            o = d.left,
            p = m >= n + g,
            q = d.top - g >= h.scrollTop(),
            r = b.outerWidth(!1),
            s = function s() {
          return l >= o + r;
        },
            t = function t() {
          return d.left + l + c.outerWidth(!1) > r;
        },
            u = b.hasClass("select2-drop-above");u ? (w = !0, !q && p && (x = !0, w = !1)) : (w = !1, !p && q && (x = !0, w = !0)), x && (b.hide(), d = this.container.offset(), e = this.container.outerHeight(!1), f = this.container.outerWidth(!1), g = b.outerHeight(!1), l = h.scrollLeft() + i, m = h.scrollTop() + k, n = d.top + e, o = d.left, r = b.outerWidth(!1), b.show(), this.focusSearch()), this.opts.dropdownAutoWidth ? (z = a(".select2-results", b)[0], b.addClass("select2-drop-auto-width"), b.css("width", ""), r = b.outerWidth(!1) + (z.scrollHeight === z.clientHeight ? 0 : j.width), r > f ? f = r : r = f, g = b.outerHeight(!1)) : this.container.removeClass("select2-drop-auto-width"), "static" !== this.body.css("position") && (v = this.body.offset(), n -= v.top, o -= v.left), !s() && t() && (o = d.left + this.container.outerWidth(!1) - r), y = { left: o, width: f }, w ? (y.top = d.top - g, y.bottom = "auto", this.container.addClass("select2-drop-above"), b.addClass("select2-drop-above")) : (y.top = n, y.bottom = "auto", this.container.removeClass("select2-drop-above"), b.removeClass("select2-drop-above")), y = a.extend(y, K(this.opts.dropdownCss, this.opts.element)), b.css(y);
      }, shouldOpen: function shouldOpen() {
        var b;return this.opened() ? !1 : this._enabled === !1 || this._readonly === !0 ? !1 : (b = a.Event("select2-opening"), this.opts.element.trigger(b), !b.isDefaultPrevented());
      }, clearDropdownAlignmentPreference: function clearDropdownAlignmentPreference() {
        this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above");
      }, open: function open() {
        return this.shouldOpen() ? (this.opening(), i.on("mousemove.select2Event", function (a) {
          h.x = a.pageX, h.y = a.pageY;
        }), !0) : !1;
      }, opening: function opening() {
        var f,
            b = this.containerEventName,
            c = "scroll." + b,
            d = "resize." + b,
            e = "orientationchange." + b;this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), this.clearDropdownAlignmentPreference(), this.dropdown[0] !== this.body.children().last()[0] && this.dropdown.detach().appendTo(this.body), f = a("#select2-drop-mask"), 0 === f.length && (f = a(document.createElement("div")), f.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), f.hide(), f.appendTo(this.body), f.on("mousedown touchstart click", function (b) {
          n(f);var d,
              c = a("#select2-drop");c.length > 0 && (d = c.data("select2"), d.opts.selectOnBlur && d.selectHighlighted({ noFocus: !0 }), d.close(), b.preventDefault(), b.stopPropagation());
        })), this.dropdown.prev()[0] !== f[0] && this.dropdown.before(f), a("#select2-drop").removeAttr("id"), this.dropdown.attr("id", "select2-drop"), f.show(), this.positionDropdown(), this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active");var g = this;this.container.parents().add(window).each(function () {
          a(this).on(d + " " + c + " " + e, function () {
            g.opened() && g.positionDropdown();
          });
        });
      }, close: function close() {
        if (this.opened()) {
          var b = this.containerEventName,
              c = "scroll." + b,
              d = "resize." + b,
              e = "orientationchange." + b;this.container.parents().add(window).each(function () {
            a(this).off(c).off(d).off(e);
          }), this.clearDropdownAlignmentPreference(), a("#select2-drop-mask").hide(), this.dropdown.removeAttr("id"), this.dropdown.hide(), this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"), this.results.empty(), i.off("mousemove.select2Event"), this.clearSearch(), this.search.removeClass("select2-active"), this.opts.element.trigger(a.Event("select2-close"));
        }
      }, externalSearch: function externalSearch(a) {
        this.open(), this.search.val(a), this.updateResults(!1);
      }, clearSearch: function clearSearch() {}, getMaximumSelectionSize: function getMaximumSelectionSize() {
        return K(this.opts.maximumSelectionSize, this.opts.element);
      }, ensureHighlightVisible: function ensureHighlightVisible() {
        var c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            b = this.results;if ((d = this.highlight(), !(0 > d))) {
          if (0 == d) return b.scrollTop(0), void 0;c = this.findHighlightableChoices().find(".select2-result-label"), e = a(c[d]), j = (e.offset() || {}).top || 0, f = j + e.outerHeight(!0), d === c.length - 1 && (i = b.find("li.select2-more-results"), i.length > 0 && (f = i.offset().top + i.outerHeight(!0))), g = b.offset().top + b.outerHeight(!1), f > g && b.scrollTop(b.scrollTop() + (f - g)), h = j - b.offset().top, 0 > h && "none" != e.css("display") && b.scrollTop(b.scrollTop() + h);
        }
      }, findHighlightableChoices: function findHighlightableChoices() {
        return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)");
      }, moveHighlight: function moveHighlight(b) {
        for (var c = this.findHighlightableChoices(), d = this.highlight(); d > -1 && d < c.length;) {
          d += b;
          var e = a(c[d]);if (e.hasClass("select2-result-selectable") && !e.hasClass("select2-disabled") && !e.hasClass("select2-selected")) {
            this.highlight(d);break;
          }
        }
      }, highlight: function highlight(b) {
        var d,
            e,
            c = this.findHighlightableChoices();return 0 === arguments.length ? p(c.filter(".select2-highlighted")[0], c.get()) : (b >= c.length && (b = c.length - 1), 0 > b && (b = 0), this.removeHighlight(), d = a(c[b]), d.addClass("select2-highlighted"), this.search.attr("aria-activedescendant", d.find(".select2-result-label").attr("id")), this.ensureHighlightVisible(), this.liveRegion.text(d.text()), e = d.data("select2-data"), e && this.opts.element.trigger({ type: "select2-highlight", val: this.id(e), choice: e }), void 0);
      }, removeHighlight: function removeHighlight() {
        this.results.find(".select2-highlighted").removeClass("select2-highlighted");
      }, touchMoved: function touchMoved() {
        this._touchMoved = !0;
      }, clearTouchMoved: function clearTouchMoved() {
        this._touchMoved = !1;
      }, countSelectableResults: function countSelectableResults() {
        return this.findHighlightableChoices().length;
      }, highlightUnderEvent: function highlightUnderEvent(b) {
        var c = a(b.target).closest(".select2-result-selectable");if (c.length > 0 && !c.is(".select2-highlighted")) {
          var d = this.findHighlightableChoices();this.highlight(d.index(c));
        } else 0 == c.length && this.removeHighlight();
      }, loadMoreIfNeeded: function loadMoreIfNeeded() {
        var c,
            a = this.results,
            b = a.find("li.select2-more-results"),
            d = this.resultsPage + 1,
            e = this,
            f = this.search.val(),
            g = this.context;0 !== b.length && (c = b.offset().top - a.offset().top - a.height(), c <= this.opts.loadMorePadding && (b.addClass("select2-active"), this.opts.query({ element: this.opts.element, term: f, page: d, context: g, matcher: this.opts.matcher, callback: this.bind(function (c) {
            e.opened() && (e.opts.populateResults.call(this, a, c.results, { term: f, page: d, context: g }), e.postprocessResults(c, !1, !1), c.more === !0 ? (b.detach().appendTo(a).html(e.opts.escapeMarkup(K(e.opts.formatLoadMore, e.opts.element, d + 1))), window.setTimeout(function () {
              e.loadMoreIfNeeded();
            }, 10)) : b.remove(), e.positionDropdown(), e.resultsPage = d, e.context = c.context, this.opts.element.trigger({ type: "select2-loaded", items: c }));
          }) })));
      }, tokenize: function tokenize() {}, updateResults: function updateResults(c) {
        function m() {
          d.removeClass("select2-active"), h.positionDropdown(), e.find(".select2-no-results,.select2-selection-limit,.select2-searching").length ? h.liveRegion.text(e.text()) : h.liveRegion.text(h.opts.formatMatches(e.find('.select2-result-selectable:not(".select2-selected")').length));
        }function n(a) {
          e.html(a), m();
        }var g,
            i,
            l,
            d = this.search,
            e = this.results,
            f = this.opts,
            h = this,
            j = d.val(),
            k = a.data(this.container, "select2-last-term");if ((c === !0 || !k || !r(j, k)) && (a.data(this.container, "select2-last-term", j), c === !0 || this.showSearchInput !== !1 && this.opened())) {
          l = ++this.queryCount;var o = this.getMaximumSelectionSize();if (o >= 1 && (g = this.data(), a.isArray(g) && g.length >= o && J(f.formatSelectionTooBig, "formatSelectionTooBig"))) return n("<li class='select2-selection-limit'>" + K(f.formatSelectionTooBig, f.element, o) + "</li>"), void 0;if (d.val().length < f.minimumInputLength) return J(f.formatInputTooShort, "formatInputTooShort") ? n("<li class='select2-no-results'>" + K(f.formatInputTooShort, f.element, d.val(), f.minimumInputLength) + "</li>") : n(""), c && this.showSearch && this.showSearch(!0), void 0;if (f.maximumInputLength && d.val().length > f.maximumInputLength) return J(f.formatInputTooLong, "formatInputTooLong") ? n("<li class='select2-no-results'>" + K(f.formatInputTooLong, f.element, d.val(), f.maximumInputLength) + "</li>") : n(""), void 0;f.formatSearching && 0 === this.findHighlightableChoices().length && n("<li class='select2-searching'>" + K(f.formatSearching, f.element) + "</li>"), d.addClass("select2-active"), this.removeHighlight(), i = this.tokenize(), i != b && null != i && d.val(i), this.resultsPage = 1, f.query({ element: f.element, term: d.val(), page: this.resultsPage, context: null, matcher: f.matcher, callback: this.bind(function (g) {
              var i;if (l == this.queryCount) {
                if (!this.opened()) return this.search.removeClass("select2-active"), void 0;if (g.hasError !== b && J(f.formatAjaxError, "formatAjaxError")) return n("<li class='select2-ajax-error'>" + K(f.formatAjaxError, f.element, g.jqXHR, g.textStatus, g.errorThrown) + "</li>"), void 0;if ((this.context = g.context === b ? null : g.context, this.opts.createSearchChoice && "" !== d.val() && (i = this.opts.createSearchChoice.call(h, d.val(), g.results), i !== b && null !== i && h.id(i) !== b && null !== h.id(i) && 0 === a(g.results).filter(function () {
                  return r(h.id(this), h.id(i));
                }).length && this.opts.createSearchChoicePosition(g.results, i)), 0 === g.results.length && J(f.formatNoMatches, "formatNoMatches"))) return n("<li class='select2-no-results'>" + K(f.formatNoMatches, f.element, d.val()) + "</li>"), void 0;e.empty(), h.opts.populateResults.call(this, e, g.results, { term: d.val(), page: this.resultsPage, context: null }), g.more === !0 && J(f.formatLoadMore, "formatLoadMore") && (e.append("<li class='select2-more-results'>" + f.escapeMarkup(K(f.formatLoadMore, f.element, this.resultsPage)) + "</li>"), window.setTimeout(function () {
                  h.loadMoreIfNeeded();
                }, 10)), this.postprocessResults(g, c), m(), this.opts.element.trigger({ type: "select2-loaded", items: g });
              }
            }) });
        }
      }, cancel: function cancel() {
        this.close();
      }, blur: function blur() {
        this.opts.selectOnBlur && this.selectHighlighted({ noFocus: !0 }), this.close(), this.container.removeClass("select2-container-active"), this.search[0] === document.activeElement && this.search.blur(), this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
      }, focusSearch: function focusSearch() {
        y(this.search);
      }, selectHighlighted: function selectHighlighted(a) {
        if (this._touchMoved) return this.clearTouchMoved(), void 0;var b = this.highlight(),
            c = this.results.find(".select2-highlighted"),
            d = c.closest(".select2-result").data("select2-data");d ? (this.highlight(b), this.onSelect(d, a)) : a && a.noFocus && this.close();
      }, getPlaceholder: function getPlaceholder() {
        var a;return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder || ((a = this.getPlaceholderOption()) !== b ? a.text() : b);
      }, getPlaceholderOption: function getPlaceholderOption() {
        if (this.select) {
          var c = this.select.children("option").first();if (this.opts.placeholderOption !== b) return "first" === this.opts.placeholderOption && c || "function" == typeof this.opts.placeholderOption && this.opts.placeholderOption(this.select);if ("" === a.trim(c.text()) && "" === c.val()) return c;
        }
      }, initContainerWidth: function initContainerWidth() {
        function c() {
          var c, d, e, f, g, h;if ("off" === this.opts.width) return null;if ("element" === this.opts.width) return 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px";if ("copy" === this.opts.width || "resolve" === this.opts.width) {
            if ((c = this.opts.element.attr("style"), c !== b)) for (d = c.split(";"), f = 0, g = d.length; g > f; f += 1) if ((h = d[f].replace(/\s/g, ""), e = h.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i), null !== e && e.length >= 1)) return e[1];return "resolve" === this.opts.width ? (c = this.opts.element.css("width"), c.indexOf("%") > 0 ? c : 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px") : null;
          }return a.isFunction(this.opts.width) ? this.opts.width() : this.opts.width;
        }var d = c.call(this);null !== d && this.container.css("width", d);
      } }), d = O(c, { createContainer: function createContainer() {
        var b = a(document.createElement("div")).attr({ "class": "select2-container" }).html(["<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>", "   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>", "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>", "</a>", "<label for='' class='select2-offscreen'></label>", "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <label for='' class='select2-offscreen'></label>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'", "       aria-autocomplete='list' />", "   </div>", "   <ul class='select2-results' role='listbox'>", "   </ul>", "</div>"].join(""));return b;
      }, enableInterface: function enableInterface() {
        this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled());
      }, opening: function opening() {
        var c, d, e;this.opts.minimumResultsForSearch >= 0 && this.showSearch(!0), this.parent.opening.apply(this, arguments), this.showSearchInput !== !1 && this.search.val(this.focusser.val()), this.opts.shouldFocusInput(this) && (this.search.focus(), c = this.search.get(0), c.createTextRange ? (d = c.createTextRange(), d.collapse(!1), d.select()) : c.setSelectionRange && (e = this.search.val().length, c.setSelectionRange(e, e))), "" === this.search.val() && this.nextSearchTerm != b && (this.search.val(this.nextSearchTerm), this.search.select()), this.focusser.prop("disabled", !0).val(""), this.updateResults(!0), this.opts.element.trigger(a.Event("select2-open"));
      }, close: function close() {
        this.opened() && (this.parent.close.apply(this, arguments), this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus());
      }, focus: function focus() {
        this.opened() ? this.close() : (this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus());
      }, isFocused: function isFocused() {
        return this.container.hasClass("select2-container-active");
      }, cancel: function cancel() {
        this.parent.cancel.apply(this, arguments), this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus();
      }, destroy: function destroy() {
        a("label[for='" + this.focusser.attr("id") + "']").attr("for", this.opts.element.attr("id")), this.parent.destroy.apply(this, arguments), N.call(this, "selection", "focusser");
      }, initContainer: function initContainer() {
        var b,
            g,
            c = this.container,
            d = this.dropdown,
            e = f();this.opts.minimumResultsForSearch < 0 ? this.showSearch(!1) : this.showSearch(!0), this.selection = b = c.find(".select2-choice"), this.focusser = c.find(".select2-focusser"), b.find(".select2-chosen").attr("id", "select2-chosen-" + e), this.focusser.attr("aria-labelledby", "select2-chosen-" + e), this.results.attr("id", "select2-results-" + e), this.search.attr("aria-owns", "select2-results-" + e), this.focusser.attr("id", "s2id_autogen" + e), g = a("label[for='" + this.opts.element.attr("id") + "']"), this.opts.element.focus(this.bind(function () {
          this.focus();
        })), this.focusser.prev().text(g.text()).attr("for", this.focusser.attr("id"));var h = this.opts.element.attr("title");this.opts.element.attr("title", h || g.text()), this.focusser.attr("tabindex", this.elementTabIndex), this.search.attr("id", this.focusser.attr("id") + "_search"), this.search.prev().text(a("label[for='" + this.focusser.attr("id") + "']").text()).attr("for", this.search.attr("id")), this.search.on("keydown", this.bind(function (a) {
          if (this.isInterfaceEnabled() && 229 != a.keyCode) {
            if (a.which === k.PAGE_UP || a.which === k.PAGE_DOWN) return A(a), void 0;switch (a.which) {case k.UP:case k.DOWN:
                return this.moveHighlight(a.which === k.UP ? -1 : 1), A(a), void 0;case k.ENTER:
                return this.selectHighlighted(), A(a), void 0;case k.TAB:
                return this.selectHighlighted({ noFocus: !0 }), void 0;case k.ESC:
                return this.cancel(a), A(a), void 0;}
          }
        })), this.search.on("blur", this.bind(function () {
          document.activeElement === this.body.get(0) && window.setTimeout(this.bind(function () {
            this.opened() && this.search.focus();
          }), 0);
        })), this.focusser.on("keydown", this.bind(function (a) {
          if (this.isInterfaceEnabled() && a.which !== k.TAB && !k.isControl(a) && !k.isFunctionKey(a) && a.which !== k.ESC) {
            if (this.opts.openOnEnter === !1 && a.which === k.ENTER) return A(a), void 0;if (a.which == k.DOWN || a.which == k.UP || a.which == k.ENTER && this.opts.openOnEnter) {
              if (a.altKey || a.ctrlKey || a.shiftKey || a.metaKey) return;return this.open(), A(a), void 0;
            }return a.which == k.DELETE || a.which == k.BACKSPACE ? (this.opts.allowClear && this.clear(), A(a), void 0) : void 0;
          }
        })), u(this.focusser), this.focusser.on("keyup-change input", this.bind(function (a) {
          if (this.opts.minimumResultsForSearch >= 0) {
            if ((a.stopPropagation(), this.opened())) return;this.open();
          }
        })), b.on("mousedown touchstart", "abbr", this.bind(function (a) {
          this.isInterfaceEnabled() && (this.clear(), B(a), this.close(), this.selection && this.selection.focus());
        })), b.on("mousedown touchstart", this.bind(function (c) {
          n(b), this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")), this.opened() ? this.close() : this.isInterfaceEnabled() && this.open(), A(c);
        })), d.on("mousedown touchstart", this.bind(function () {
          this.opts.shouldFocusInput(this) && this.search.focus();
        })), b.on("focus", this.bind(function (a) {
          A(a);
        })), this.focusser.on("focus", this.bind(function () {
          this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")), this.container.addClass("select2-container-active");
        })).on("blur", this.bind(function () {
          this.opened() || (this.container.removeClass("select2-container-active"), this.opts.element.trigger(a.Event("select2-blur")));
        })), this.search.on("focus", this.bind(function () {
          this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")), this.container.addClass("select2-container-active");
        })), this.initContainerWidth(), this.opts.element.hide(), this.setPlaceholder();
      }, clear: function clear(b) {
        var c = this.selection.data("select2-data");if (c) {
          var d = a.Event("select2-clearing");if ((this.opts.element.trigger(d), d.isDefaultPrevented())) return;var e = this.getPlaceholderOption();this.opts.element.val(e ? e.val() : ""), this.selection.find(".select2-chosen").empty(), this.selection.removeData("select2-data"), this.setPlaceholder(), b !== !1 && (this.opts.element.trigger({ type: "select2-removed", val: this.id(c), choice: c }), this.triggerChange({ removed: c }));
        }
      }, initSelection: function initSelection() {
        if (this.isPlaceholderOptionSelected()) this.updateSelection(null), this.close(), this.setPlaceholder();else {
          var c = this;this.opts.initSelection.call(null, this.opts.element, function (a) {
            a !== b && null !== a && (c.updateSelection(a), c.close(), c.setPlaceholder(), c.nextSearchTerm = c.opts.nextSearchTerm(a, c.search.val()));
          });
        }
      }, isPlaceholderOptionSelected: function isPlaceholderOptionSelected() {
        var a;return this.getPlaceholder() === b ? !1 : (a = this.getPlaceholderOption()) !== b && a.prop("selected") || "" === this.opts.element.val() || this.opts.element.val() === b || null === this.opts.element.val();
      }, prepareOpts: function prepareOpts() {
        var b = this.parent.prepareOpts.apply(this, arguments),
            c = this;return "select" === b.element.get(0).tagName.toLowerCase() ? b.initSelection = function (a, b) {
          var d = a.find("option").filter(function () {
            return this.selected && !this.disabled;
          });b(c.optionToData(d));
        } : "data" in b && (b.initSelection = b.initSelection || function (c, d) {
          var e = c.val(),
              f = null;b.query({ matcher: function matcher(a, c, d) {
              var g = r(e, b.id(d));return g && (f = d), g;
            }, callback: a.isFunction(d) ? function () {
              d(f);
            } : a.noop });
        }), b;
      }, getPlaceholder: function getPlaceholder() {
        return this.select && this.getPlaceholderOption() === b ? b : this.parent.getPlaceholder.apply(this, arguments);
      }, setPlaceholder: function setPlaceholder() {
        var a = this.getPlaceholder();if (this.isPlaceholderOptionSelected() && a !== b) {
          if (this.select && this.getPlaceholderOption() === b) return;this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(a)), this.selection.addClass("select2-default"), this.container.removeClass("select2-allowclear");
        }
      }, postprocessResults: function postprocessResults(a, b, c) {
        var d = 0,
            e = this;if ((this.findHighlightableChoices().each2(function (a, b) {
          return r(e.id(b.data("select2-data")), e.opts.element.val()) ? (d = a, !1) : void 0;
        }), c !== !1 && (b === !0 && d >= 0 ? this.highlight(d) : this.highlight(0)), b === !0)) {
          var g = this.opts.minimumResultsForSearch;g >= 0 && this.showSearch(L(a.results) >= g);
        }
      }, showSearch: function showSearch(b) {
        this.showSearchInput !== b && (this.showSearchInput = b, this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !b), this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !b), a(this.dropdown, this.container).toggleClass("select2-with-searchbox", b));
      }, onSelect: function onSelect(a, b) {
        if (this.triggerSelect(a)) {
          var c = this.opts.element.val(),
              d = this.data();this.opts.element.val(this.id(a)), this.updateSelection(a), this.opts.element.trigger({ type: "select2-selected", val: this.id(a), choice: a }), this.nextSearchTerm = this.opts.nextSearchTerm(a, this.search.val()), this.close(), b && b.noFocus || !this.opts.shouldFocusInput(this) || this.focusser.focus(), r(c, this.id(a)) || this.triggerChange({ added: a, removed: d });
        }
      }, updateSelection: function updateSelection(a) {
        var d,
            e,
            c = this.selection.find(".select2-chosen");this.selection.data("select2-data", a), c.empty(), null !== a && (d = this.opts.formatSelection(a, c, this.opts.escapeMarkup)), d !== b && c.append(d), e = this.opts.formatSelectionCssClass(a, c), e !== b && c.addClass(e), this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== b && this.container.addClass("select2-allowclear");
      }, val: function val() {
        var a,
            c = !1,
            d = null,
            e = this,
            f = this.data();if (0 === arguments.length) return this.opts.element.val();if ((a = arguments[0], arguments.length > 1 && (c = arguments[1]), this.select)) this.select.val(a).find("option").filter(function () {
          return this.selected;
        }).each2(function (a, b) {
          return d = e.optionToData(b), !1;
        }), this.updateSelection(d), this.setPlaceholder(), c && this.triggerChange({ added: d, removed: f });else {
          if (!a && 0 !== a) return this.clear(c), void 0;if (this.opts.initSelection === b) throw new Error("cannot call val() if initSelection() is not defined");this.opts.element.val(a), this.opts.initSelection(this.opts.element, function (a) {
            e.opts.element.val(a ? e.id(a) : ""), e.updateSelection(a), e.setPlaceholder(), c && e.triggerChange({ added: a, removed: f });
          });
        }
      }, clearSearch: function clearSearch() {
        this.search.val(""), this.focusser.val("");
      }, data: function data(a) {
        var c,
            d = !1;return 0 === arguments.length ? (c = this.selection.data("select2-data"), c == b && (c = null), c) : (arguments.length > 1 && (d = arguments[1]), a ? (c = this.data(), this.opts.element.val(a ? this.id(a) : ""), this.updateSelection(a), d && this.triggerChange({ added: a, removed: c })) : this.clear(d), void 0);
      } }), e = O(c, { createContainer: function createContainer() {
        var b = a(document.createElement("div")).attr({ "class": "select2-container select2-container-multi" }).html(["<ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <label for='' class='select2-offscreen'></label>", "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi select2-display-none'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));return b;
      }, prepareOpts: function prepareOpts() {
        var b = this.parent.prepareOpts.apply(this, arguments),
            c = this;return "select" === b.element.get(0).tagName.toLowerCase() ? b.initSelection = function (a, b) {
          var d = [];a.find("option").filter(function () {
            return this.selected && !this.disabled;
          }).each2(function (a, b) {
            d.push(c.optionToData(b));
          }), b(d);
        } : "data" in b && (b.initSelection = b.initSelection || function (c, d) {
          var e = s(c.val(), b.separator, b.transformVal),
              f = [];b.query({ matcher: function matcher(c, d, g) {
              var h = a.grep(e, function (a) {
                return r(a, b.id(g));
              }).length;return h && f.push(g), h;
            }, callback: a.isFunction(d) ? function () {
              for (var a = [], c = 0; c < e.length; c++) for (var g = e[c], h = 0; h < f.length; h++) {
                var i = f[h];if (r(g, b.id(i))) {
                  a.push(i), f.splice(h, 1);break;
                }
              }d(a);
            } : a.noop });
        }), b;
      }, selectChoice: function selectChoice(a) {
        var b = this.container.find(".select2-search-choice-focus");b.length && a && a[0] == b[0] || (b.length && this.opts.element.trigger("choice-deselected", b), b.removeClass("select2-search-choice-focus"), a && a.length && (this.close(), a.addClass("select2-search-choice-focus"), this.opts.element.trigger("choice-selected", a)));
      }, destroy: function destroy() {
        a("label[for='" + this.search.attr("id") + "']").attr("for", this.opts.element.attr("id")), this.parent.destroy.apply(this, arguments), N.call(this, "searchContainer", "selection");
      }, initContainer: function initContainer() {
        var c,
            b = ".select2-choices";this.searchContainer = this.container.find(".select2-search-field"), this.selection = c = this.container.find(b);var d = this;this.selection.on("click", ".select2-container:not(.select2-container-disabled) .select2-search-choice:not(.select2-locked)", function () {
          d.search[0].focus(), d.selectChoice(a(this));
        }), this.search.attr("id", "s2id_autogen" + f()), this.search.prev().text(a("label[for='" + this.opts.element.attr("id") + "']").text()).attr("for", this.search.attr("id")), this.opts.element.focus(this.bind(function () {
          this.focus();
        })), this.search.on("input paste", this.bind(function () {
          this.search.attr("placeholder") && 0 == this.search.val().length || this.isInterfaceEnabled() && (this.opened() || this.open());
        })), this.search.attr("tabindex", this.elementTabIndex), this.keydowns = 0, this.search.on("keydown", this.bind(function (a) {
          if (this.isInterfaceEnabled()) {
            ++this.keydowns;var b = c.find(".select2-search-choice-focus"),
                d = b.prev(".select2-search-choice:not(.select2-locked)"),
                e = b.next(".select2-search-choice:not(.select2-locked)"),
                f = z(this.search);if (b.length && (a.which == k.LEFT || a.which == k.RIGHT || a.which == k.BACKSPACE || a.which == k.DELETE || a.which == k.ENTER)) {
              var g = b;return a.which == k.LEFT && d.length ? g = d : a.which == k.RIGHT ? g = e.length ? e : null : a.which === k.BACKSPACE ? this.unselect(b.first()) && (this.search.width(10), g = d.length ? d : e) : a.which == k.DELETE ? this.unselect(b.first()) && (this.search.width(10), g = e.length ? e : null) : a.which == k.ENTER && (g = null), this.selectChoice(g), A(a), g && g.length || this.open(), void 0;
            }if ((a.which === k.BACKSPACE && 1 == this.keydowns || a.which == k.LEFT) && 0 == f.offset && !f.length) return this.selectChoice(c.find(".select2-search-choice:not(.select2-locked)").last()), A(a), void 0;if ((this.selectChoice(null), this.opened())) switch (a.which) {case k.UP:case k.DOWN:
                return this.moveHighlight(a.which === k.UP ? -1 : 1), A(a), void 0;case k.ENTER:
                return this.selectHighlighted(), A(a), void 0;case k.TAB:
                return this.selectHighlighted({ noFocus: !0 }), this.close(), void 0;case k.ESC:
                return this.cancel(a), A(a), void 0;}if (a.which !== k.TAB && !k.isControl(a) && !k.isFunctionKey(a) && a.which !== k.BACKSPACE && a.which !== k.ESC) {
              if (a.which === k.ENTER) {
                if (this.opts.openOnEnter === !1) return;if (a.altKey || a.ctrlKey || a.shiftKey || a.metaKey) return;
              }this.open(), (a.which === k.PAGE_UP || a.which === k.PAGE_DOWN) && A(a), a.which === k.ENTER && A(a);
            }
          }
        })), this.search.on("keyup", this.bind(function () {
          this.keydowns = 0, this.resizeSearch();
        })), this.search.on("blur", this.bind(function (b) {
          this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), this.selectChoice(null), this.opened() || this.clearSearch(), b.stopImmediatePropagation(), this.opts.element.trigger(a.Event("select2-blur"));
        })), this.container.on("click", b, this.bind(function (b) {
          this.isInterfaceEnabled() && (a(b.target).closest(".select2-search-choice").length > 0 || (this.selectChoice(null), this.clearPlaceholder(), this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")), this.open(), this.focusSearch(), b.preventDefault()));
        })), this.container.on("focus", b, this.bind(function () {
          this.isInterfaceEnabled() && (this.container.hasClass("select2-container-active") || this.opts.element.trigger(a.Event("select2-focus")), this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder());
        })), this.initContainerWidth(), this.opts.element.hide(), this.clearSearch();
      }, enableInterface: function enableInterface() {
        this.parent.enableInterface.apply(this, arguments) && this.search.prop("disabled", !this.isInterfaceEnabled());
      }, initSelection: function initSelection() {
        if (("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]), this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val())) {
          var c = this;this.opts.initSelection.call(null, this.opts.element, function (a) {
            a !== b && null !== a && (c.updateSelection(a), c.close(), c.clearSearch());
          });
        }
      }, clearSearch: function clearSearch() {
        var a = this.getPlaceholder(),
            c = this.getMaxSearchWidth();a !== b && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(a).addClass("select2-default"), this.search.width(c > 0 ? c : this.container.css("width"))) : this.search.val("").width(10);
      }, clearPlaceholder: function clearPlaceholder() {
        this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default");
      }, opening: function opening() {
        this.clearPlaceholder(), this.resizeSearch(), this.parent.opening.apply(this, arguments), this.focusSearch(), "" === this.search.val() && this.nextSearchTerm != b && (this.search.val(this.nextSearchTerm), this.search.select()), this.updateResults(!0), this.opts.shouldFocusInput(this) && this.search.focus(), this.opts.element.trigger(a.Event("select2-open"));
      }, close: function close() {
        this.opened() && this.parent.close.apply(this, arguments);
      }, focus: function focus() {
        this.close(), this.search.focus();
      }, isFocused: function isFocused() {
        return this.search.hasClass("select2-focused");
      }, updateSelection: function updateSelection(b) {
        var c = [],
            d = [],
            e = this;a(b).each(function () {
          p(e.id(this), c) < 0 && (c.push(e.id(this)), d.push(this));
        }), b = d, this.selection.find(".select2-search-choice").remove(), a(b).each(function () {
          e.addSelectedChoice(this);
        }), e.postprocessResults();
      }, tokenize: function tokenize() {
        var a = this.search.val();a = this.opts.tokenizer.call(this, a, this.data(), this.bind(this.onSelect), this.opts), null != a && a != b && (this.search.val(a), a.length > 0 && this.open());
      }, onSelect: function onSelect(a, c) {
        this.triggerSelect(a) && "" !== a.text && (this.addSelectedChoice(a), this.opts.element.trigger({ type: "selected", val: this.id(a), choice: a }), this.nextSearchTerm = this.opts.nextSearchTerm(a, this.search.val()), this.clearSearch(), this.updateResults(), (this.select || !this.opts.closeOnSelect) && this.postprocessResults(a, !1, this.opts.closeOnSelect === !0), this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() ? this.updateResults(!0) : this.nextSearchTerm != b && (this.search.val(this.nextSearchTerm), this.updateResults(), this.search.select()), this.positionDropdown()) : (this.close(), this.search.width(10)), this.triggerChange({ added: a }), c && c.noFocus || this.focusSearch());
      }, cancel: function cancel() {
        this.close(), this.focusSearch();
      }, addSelectedChoice: function addSelectedChoice(c) {
        var j,
            k,
            d = !c.locked,
            e = a("<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>"),
            f = a("<li class='select2-search-choice select2-locked'><div></div></li>"),
            g = d ? e : f,
            h = this.id(c),
            i = this.getVal();j = this.opts.formatSelection(c, g.find("div"), this.opts.escapeMarkup), j != b && g.find("div").replaceWith(a("<div></div>").html(j)), k = this.opts.formatSelectionCssClass(c, g.find("div")), k != b && g.addClass(k), d && g.find(".select2-search-choice-close").on("mousedown", A).on("click dblclick", this.bind(function (b) {
          this.isInterfaceEnabled() && (this.unselect(a(b.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), A(b), this.close(), this.focusSearch());
        })).on("focus", this.bind(function () {
          this.isInterfaceEnabled() && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"));
        })), g.data("select2-data", c), g.insertBefore(this.searchContainer), i.push(h), this.setVal(i);
      }, unselect: function unselect(b) {
        var d,
            e,
            c = this.getVal();if ((b = b.closest(".select2-search-choice"), 0 === b.length)) throw "Invalid argument: " + b + ". Must be .select2-search-choice";if (d = b.data("select2-data")) {
          var f = a.Event("select2-removing");if ((f.val = this.id(d), f.choice = d, this.opts.element.trigger(f), f.isDefaultPrevented())) return !1;for (; (e = p(this.id(d), c)) >= 0;) c.splice(e, 1), this.setVal(c), this.select && this.postprocessResults();return b.remove(), this.opts.element.trigger({ type: "select2-removed", val: this.id(d), choice: d }), this.triggerChange({ removed: d }), !0;
        }
      }, postprocessResults: function postprocessResults(a, b, c) {
        var d = this.getVal(),
            e = this.results.find(".select2-result"),
            f = this.results.find(".select2-result-with-children"),
            g = this;e.each2(function (a, b) {
          var c = g.id(b.data("select2-data"));p(c, d) >= 0 && (b.addClass("select2-selected"), b.find(".select2-result-selectable").addClass("select2-selected"));
        }), f.each2(function (a, b) {
          b.is(".select2-result-selectable") || 0 !== b.find(".select2-result-selectable:not(.select2-selected)").length || b.addClass("select2-selected");
        }), -1 == this.highlight() && c !== !1 && this.opts.closeOnSelect === !0 && g.highlight(0), !this.opts.createSearchChoice && !e.filter(".select2-result:not(.select2-selected)").length > 0 && (!a || a && !a.more && 0 === this.results.find(".select2-no-results").length) && J(g.opts.formatNoMatches, "formatNoMatches") && this.results.append("<li class='select2-no-results'>" + K(g.opts.formatNoMatches, g.opts.element, g.search.val()) + "</li>");
      }, getMaxSearchWidth: function getMaxSearchWidth() {
        return this.selection.width() - t(this.search);
      }, resizeSearch: function resizeSearch() {
        var a,
            b,
            c,
            d,
            e,
            f = t(this.search);a = C(this.search) + 10, b = this.search.offset().left, c = this.selection.width(), d = this.selection.offset().left, e = c - (b - d) - f, a > e && (e = c - f), 40 > e && (e = c - f), 0 >= e && (e = a), this.search.width(Math.floor(e));
      }, getVal: function getVal() {
        var a;return this.select ? (a = this.select.val(), null === a ? [] : a) : (a = this.opts.element.val(), s(a, this.opts.separator, this.opts.transformVal));
      }, setVal: function setVal(b) {
        var c;this.select ? this.select.val(b) : (c = [], a(b).each(function () {
          p(this, c) < 0 && c.push(this);
        }), this.opts.element.val(0 === c.length ? "" : c.join(this.opts.separator)));
      }, buildChangeDetails: function buildChangeDetails(a, b) {
        for (var b = b.slice(0), a = a.slice(0), c = 0; c < b.length; c++) for (var d = 0; d < a.length; d++) r(this.opts.id(b[c]), this.opts.id(a[d])) && (b.splice(c, 1), c > 0 && c--, a.splice(d, 1), d--);return { added: b, removed: a };
      }, val: function val(c, d) {
        var e,
            f = this;if (0 === arguments.length) return this.getVal();if ((e = this.data(), e.length || (e = []), !c && 0 !== c)) return this.opts.element.val(""), this.updateSelection([]), this.clearSearch(), d && this.triggerChange({ added: this.data(), removed: e }), void 0;if ((this.setVal(c), this.select)) this.opts.initSelection(this.select, this.bind(this.updateSelection)), d && this.triggerChange(this.buildChangeDetails(e, this.data()));else {
          if (this.opts.initSelection === b) throw new Error("val() cannot be called if initSelection() is not defined");this.opts.initSelection(this.opts.element, function (b) {
            var c = a.map(b, f.id);f.setVal(c), f.updateSelection(b), f.clearSearch(), d && f.triggerChange(f.buildChangeDetails(e, f.data()));
          });
        }this.clearSearch();
      }, onSortStart: function onSortStart() {
        if (this.select) throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");this.search.width(0), this.searchContainer.hide();
      }, onSortEnd: function onSortEnd() {
        var b = [],
            c = this;this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), this.resizeSearch(), this.selection.find(".select2-search-choice").each(function () {
          b.push(c.opts.id(a(this).data("select2-data")));
        }), this.setVal(b), this.triggerChange();
      }, data: function data(b, c) {
        var e,
            f,
            d = this;return 0 === arguments.length ? this.selection.children(".select2-search-choice").map(function () {
          return a(this).data("select2-data");
        }).get() : (f = this.data(), b || (b = []), e = a.map(b, function (a) {
          return d.opts.id(a);
        }), this.setVal(e), this.updateSelection(b), this.clearSearch(), c && this.triggerChange(this.buildChangeDetails(f, this.data())), void 0);
      } }), a.fn.select2 = function () {
      var d,
          e,
          f,
          g,
          h,
          c = Array.prototype.slice.call(arguments, 0),
          i = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search"],
          j = ["opened", "isFocused", "container", "dropdown"],
          k = ["val", "data"],
          l = { search: "externalSearch" };return this.each(function () {
        if (0 === c.length || "object" == typeof c[0]) d = 0 === c.length ? {} : a.extend({}, c[0]), d.element = a(this), "select" === d.element.get(0).tagName.toLowerCase() ? h = d.element.prop("multiple") : (h = d.multiple || !1, "tags" in d && (d.multiple = h = !0)), e = h ? new window.Select2["class"].multi() : new window.Select2["class"].single(), e.init(d);else {
          if ("string" != typeof c[0]) throw "Invalid arguments to select2 plugin: " + c;if (p(c[0], i) < 0) throw "Unknown method: " + c[0];if ((g = b, e = a(this).data("select2"), e === b)) return;if ((f = c[0], "container" === f ? g = e.container : "dropdown" === f ? g = e.dropdown : (l[f] && (f = l[f]), g = e[f].apply(e, c.slice(1))), p(c[0], j) >= 0 || p(c[0], k) >= 0 && 1 == c.length)) return !1;
        }
      }), g === b ? this : g;
    }, a.fn.select2.defaults = { width: "copy", loadMorePadding: 0, closeOnSelect: !0, openOnEnter: !0, containerCss: {}, dropdownCss: {}, containerCssClass: "", dropdownCssClass: "", formatResult: function formatResult(a, b, c, d) {
        var e = [];return E(this.text(a), c.term, e, d), e.join("");
      }, transformVal: function transformVal(b) {
        return a.trim(b);
      }, formatSelection: function formatSelection(a, c, d) {
        return a ? d(this.text(a)) : b;
      }, sortResults: function sortResults(a) {
        return a;
      }, formatResultCssClass: function formatResultCssClass(a) {
        return a.css;
      }, formatSelectionCssClass: function formatSelectionCssClass() {
        return b;
      }, minimumResultsForSearch: 0, minimumInputLength: 0, maximumInputLength: null, maximumSelectionSize: 0, id: function id(a) {
        return a == b ? null : a.id;
      }, text: function text(b) {
        return b && this.data && this.data.text ? a.isFunction(this.data.text) ? this.data.text(b) : b[this.data.text] : b.text;
      }, matcher: function matcher(a, b) {
        return o("" + b).toUpperCase().indexOf(o("" + a).toUpperCase()) >= 0;
      }, separator: ",", tokenSeparators: [], tokenizer: M, escapeMarkup: F, blurOnChange: !1, selectOnBlur: !1, adaptContainerCssClass: function adaptContainerCssClass(a) {
        return a;
      }, adaptDropdownCssClass: function adaptDropdownCssClass() {
        return null;
      }, nextSearchTerm: function nextSearchTerm() {
        return b;
      }, searchInputPlaceholder: "", createSearchChoicePosition: "top", shouldFocusInput: function shouldFocusInput(a) {
        var b = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;return b ? a.opts.minimumResultsForSearch < 0 ? !1 : !0 : !0;
      } }, a.fn.select2.locales = [], a.fn.select2.locales.en = { formatMatches: function formatMatches(a) {
        return 1 === a ? "One result is available, press enter to select it." : a + " results are available, use up and down arrow keys to navigate.";
      }, formatNoMatches: function formatNoMatches() {
        return "No matches found";
      }, formatAjaxError: function formatAjaxError() {
        return "Loading failed";
      }, formatInputTooShort: function formatInputTooShort(a, b) {
        var c = b - a.length;return "Please enter " + c + " or more character" + (1 == c ? "" : "s");
      }, formatInputTooLong: function formatInputTooLong(a, b) {
        var c = a.length - b;return "Please delete " + c + " character" + (1 == c ? "" : "s");
      }, formatSelectionTooBig: function formatSelectionTooBig(a) {
        return "You can only select " + a + " item" + (1 == a ? "" : "s");
      }, formatLoadMore: function formatLoadMore() {
        return "Loading more results…";
      }, formatSearching: function formatSearching() {
        return "Searching…";
      } }, a.extend(a.fn.select2.defaults, a.fn.select2.locales.en), a.fn.select2.ajaxDefaults = { transport: a.ajax, params: { type: "GET", cache: !1, dataType: "json" } }, window.Select2 = { query: { ajax: G, local: H, tags: I }, util: { debounce: w, markMatch: E, escapeMarkup: F, stripDiacritics: o }, "class": { "abstract": c, single: d, multi: e } };
  }
})(jQuery);
/*! Social Likes v3.0.14 by Artem Sapegin - http://sapegin.github.com/social-likes - Licensed MIT */
"use strict";

!(function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery);
})(function (a, b) {
  "use strict";function c(a, b) {
    this.container = a, this.options = b, this.init();
  }function d(b, c) {
    this.widget = b, this.options = a.extend({}, c), this.detectService(), this.service && this.init();
  }function e(a) {
    function b(a, b) {
      return b.toUpper();
    }var c = {},
        d = a.data();for (var e in d) {
      var f = d[e];"yes" === f ? f = !0 : "no" === f && (f = !1), c[e.replace(/-(\w)/g, b)] = f;
    }return c;
  }function f(a, b) {
    return g(a, b, encodeURIComponent);
  }function g(a, b, c) {
    return a.replace(/\{([^\}]+)\}/g, function (a, d) {
      return d in b ? c ? c(b[d]) : b[d] : a;
    });
  }function h(a, b) {
    var c = l + a;return c + " " + c + "_" + b;
  }function i(b, c) {
    function d(g) {
      "keydown" === g.type && 27 !== g.which || a(g.target).closest(b).length || (b.removeClass(m), e.off(f, d), a.isFunction(c) && c());
    }var e = a(document),
        f = "click touchstart keydown";e.on(f, d);
  }function j(a) {
    var b = 10;if (document.documentElement.getBoundingClientRect) {
      var c = parseInt(a.css("left"), 10),
          d = parseInt(a.css("top"), 10),
          e = a[0].getBoundingClientRect();e.left < b ? a.css("left", b - e.left + c) : e.right > window.innerWidth - b && a.css("left", window.innerWidth - e.right - b + c), e.top < b ? a.css("top", b - e.top + d) : e.bottom > window.innerHeight - b && a.css("top", window.innerHeight - e.bottom - b + d);
    }a.addClass(m);
  }var k = "social-likes",
      l = k + "__",
      m = k + "_opened",
      n = "https:" === location.protocol ? "https:" : "http:",
      o = "https:" === n,
      p = { facebook: { counterUrl: "https://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=?", convertNumber: function convertNumber(a) {
        return a.data[0].total_count;
      }, popupUrl: "https://www.facebook.com/sharer/sharer.php?u={url}", popupWidth: 600, popupHeight: 500 }, twitter: { counterUrl: "https://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?", convertNumber: function convertNumber(a) {
        return a.count;
      }, popupUrl: "https://twitter.com/intent/tweet?url={url}&text={title}", popupWidth: 600, popupHeight: 450, click: function click() {
        return (/[\.\?:\-–—]\s*$/.test(this.options.title) || (this.options.title += ":"), !0
        );
      } }, mailru: { counterUrl: n + "//connect.mail.ru/share_count?url_list={url}&callback=1&func=?", convertNumber: function convertNumber(a) {
        for (var b in a) if (a.hasOwnProperty(b)) return a[b].shares;
      }, popupUrl: n + "//connect.mail.ru/share?share_url={url}&title={title}", popupWidth: 550, popupHeight: 360 }, vkontakte: { counterUrl: "https://vk.com/share.php?act=count&url={url}&index={index}", counter: function counter(b, c) {
        var d = p.vkontakte;d._ || (d._ = [], window.VK || (window.VK = {}), window.VK.Share = { count: function count(a, b) {
            d._[a].resolve(b);
          } });var e = d._.length;d._.push(c), a.getScript(f(b, { index: e })).fail(c.reject);
      }, popupUrl: n + "//vk.com/share.php?url={url}&title={title}", popupWidth: 550, popupHeight: 330 }, odnoklassniki: { counterUrl: o ? b : "http://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}", counter: function counter(b, c) {
        var d = p.odnoklassniki;d._ || (d._ = [], window.ODKL || (window.ODKL = {}), window.ODKL.updateCount = function (a, b) {
          d._[a].resolve(b);
        });var e = d._.length;d._.push(c), a.getScript(f(b, { index: e })).fail(c.reject);
      }, popupUrl: "http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}", popupWidth: 550, popupHeight: 360 }, plusone: { counterUrl: o ? b : "http://share.yandex.ru/gpp.xml?url={url}", counter: function counter(b, c) {
        var d = p.plusone;return d._ ? void c.reject() : (window.services || (window.services = {}), window.services.gplus = { cb: function cb(a) {
            "string" == typeof a && (a = a.replace(/\D/g, "")), d._.resolve(parseInt(a, 10));
          } }, d._ = c, void a.getScript(f(b)).fail(c.reject));
      }, popupUrl: "https://plus.google.com/share?url={url}", popupWidth: 700, popupHeight: 500 }, pinterest: { counterUrl: n + "//api.pinterest.com/v1/urls/count.json?url={url}&callback=?", convertNumber: function convertNumber(a) {
        return a.count;
      }, popupUrl: n + "//pinterest.com/pin/create/button/?url={url}&description={title}", popupWidth: 630, popupHeight: 270 } },
      q = { promises: {}, fetch: function fetch(b, c, d) {
      q.promises[b] || (q.promises[b] = {});var e = q.promises[b];if (!d.forceUpdate && e[c]) return e[c];var g = a.extend({}, p[b], d),
          h = a.Deferred(),
          i = g.counterUrl && f(g.counterUrl, { url: c });return i && a.isFunction(g.counter) ? g.counter(i, h) : g.counterUrl ? a.getJSON(i).done(function (b) {
        try {
          var c = b;a.isFunction(g.convertNumber) && (c = g.convertNumber(b)), h.resolve(c);
        } catch (d) {
          h.reject();
        }
      }).fail(h.reject) : h.reject(), e[c] = h.promise(), e[c];
    } };a.fn.socialLikes = function (b) {
    return this.each(function () {
      var d = a(this),
          f = d.data(k);f ? a.isPlainObject(b) && f.update(b) : (f = new c(d, a.extend({}, a.fn.socialLikes.defaults, b, e(d))), d.data(k, f));
    });
  }, a.fn.socialLikes.defaults = { url: window.location.href.replace(window.location.hash, ""), title: document.title, counters: !0, zeroes: !1, wait: 500, timeout: 1e4, popupCheckInterval: 500, singleTitle: "Share" }, c.prototype = { init: function init() {
      this.container.addClass(k), this.single = this.container.hasClass(k + "_single"), this.initUserButtons(), this.countersLeft = 0, this.number = 0, this.container.on("counter." + k, a.proxy(this.updateCounter, this));var b = this.container.children();this.makeSingleButton(), this.buttons = [], b.each(a.proxy(function (b, c) {
        var e = new d(a(c), this.options);this.buttons.push(e), e.options.counterUrl && this.countersLeft++;
      }, this)), this.options.counters ? (this.timer = setTimeout(a.proxy(this.appear, this), this.options.wait), this.timeout = setTimeout(a.proxy(this.ready, this, !0), this.options.timeout)) : this.appear();
    }, initUserButtons: function initUserButtons() {
      !this.userButtonInited && window.socialLikesButtons && a.extend(!0, p, socialLikesButtons), this.userButtonInited = !0;
    }, makeSingleButton: function makeSingleButton() {
      if (this.single) {
        var b = this.container;b.addClass(k + "_vertical"), b.wrap(a("<div>", { "class": k + "_single-w" })), b.wrapInner(a("<div>", { "class": k + "__single-container" }));var c = b.parent(),
            d = a("<div>", { "class": h("widget", "single") }),
            e = a(g('<div class="{buttonCls}"><span class="{iconCls}"></span>{title}</div>', { buttonCls: h("button", "single"), iconCls: h("icon", "single"), title: this.options.singleTitle }));d.append(e), c.append(d), d.on("click", function () {
          var a = k + "__widget_active";return d.toggleClass(a), d.hasClass(a) ? (b.css({ left: -(b.width() - d.width()) / 2, top: -b.height() }), j(b), i(b, function () {
            d.removeClass(a);
          })) : b.removeClass(m), !1;
        }), this.widget = d;
      }
    }, update: function update(b) {
      if (b.forceUpdate || b.url !== this.options.url) {
        this.number = 0, this.countersLeft = this.buttons.length, this.widget && this.widget.find("." + k + "__counter").remove(), a.extend(this.options, b);for (var c = 0; c < this.buttons.length; c++) this.buttons[c].update(b);
      }
    }, updateCounter: function updateCounter(a, b, c) {
      c && (this.number += c, this.single && this.getCounterElem().text(this.number)), this.countersLeft--, 0 === this.countersLeft && (this.appear(), this.ready());
    }, appear: function appear() {
      this.container.addClass(k + "_visible");
    }, ready: function ready(a) {
      this.timeout && clearTimeout(this.timeout), this.container.addClass(k + "_ready"), a || this.container.trigger("ready." + k, this.number);
    }, getCounterElem: function getCounterElem() {
      var b = this.widget.find("." + l + "counter_single");return b.length || (b = a("<span>", { "class": h("counter", "single") }), this.widget.append(b)), b;
    } }, d.prototype = { init: function init() {
      this.detectParams(), this.initHtml(), setTimeout(a.proxy(this.initCounter, this), 0);
    }, update: function update(b) {
      a.extend(this.options, { forceUpdate: !1 }, b), this.widget.find("." + k + "__counter").remove(), this.initCounter();
    }, detectService: function detectService() {
      var b = this.widget.data("service");if (!b) {
        for (var c = this.widget[0], d = c.classList || c.className.split(" "), e = 0; e < d.length; e++) {
          var f = d[e];if (p[f]) {
            b = f;break;
          }
        }if (!b) return;
      }this.service = b, a.extend(this.options, p[b]);
    }, detectParams: function detectParams() {
      var a = this.widget.data();if (a.counter) {
        var b = parseInt(a.counter, 10);isNaN(b) ? this.options.counterUrl = a.counter : this.options.counterNumber = b;
      }a.title && (this.options.title = a.title), a.url && (this.options.url = a.url);
    }, initHtml: function initHtml() {
      var b = this.options,
          c = this.widget,
          d = c.find("a");d.length && this.cloneDataAttrs(d, c);var e = a("<span>", { "class": this.getElementClassNames("button"), text: c.text() });if (b.clickUrl) {
        var g = f(b.clickUrl, { url: b.url, title: b.title }),
            h = a("<a>", { href: g });this.cloneDataAttrs(c, h), c.replaceWith(h), this.widget = c = h;
      } else c.on("click", a.proxy(this.click, this));c.removeClass(this.service), c.addClass(this.getElementClassNames("widget")), e.prepend(a("<span>", { "class": this.getElementClassNames("icon") })), c.empty().append(e), this.button = e;
    }, initCounter: function initCounter() {
      if (this.options.counters) if (this.options.counterNumber) this.updateCounter(this.options.counterNumber);else {
        var b = { counterUrl: this.options.counterUrl, forceUpdate: this.options.forceUpdate };q.fetch(this.service, this.options.url, b).always(a.proxy(this.updateCounter, this));
      }
    }, cloneDataAttrs: function cloneDataAttrs(a, b) {
      var c = a.data();for (var d in c) c.hasOwnProperty(d) && b.data(d, c[d]);
    }, getElementClassNames: function getElementClassNames(a) {
      return h(a, this.service);
    }, updateCounter: function updateCounter(b) {
      b = parseInt(b, 10) || 0;var c = { "class": this.getElementClassNames("counter"), text: b };b || this.options.zeroes || (c["class"] += " " + k + "__counter_empty", c.text = "");var d = a("<span>", c);this.widget.append(d), this.widget.trigger("counter." + k, [this.service, b]);
    }, click: function click(b) {
      var c = this.options,
          d = !0;if ((a.isFunction(c.click) && (d = c.click.call(this, b)), d)) {
        var e = f(c.popupUrl, { url: c.url, title: c.title });e = this.addAdditionalParamsToUrl(e), this.openPopup(e, { width: c.popupWidth, height: c.popupHeight });
      }return !1;
    }, addAdditionalParamsToUrl: function addAdditionalParamsToUrl(b) {
      var c = a.param(a.extend(this.widget.data(), this.options.data));if (a.isEmptyObject(c)) return b;var d = -1 === b.indexOf("?") ? "?" : "&";return b + d + c;
    }, openPopup: function openPopup(b, c) {
      var d = Math.round(screen.width / 2 - c.width / 2),
          e = 0;screen.height > c.height && (e = Math.round(screen.height / 3 - c.height / 2));var f = window.open(b, "sl_" + this.service, "left=" + d + ",top=" + e + ",width=" + c.width + ",height=" + c.height + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");if (f) {
        f.focus(), this.widget.trigger("popup_opened." + k, [this.service, f]);var g = setInterval(a.proxy(function () {
          f.closed && (clearInterval(g), this.widget.trigger("popup_closed." + k, this.service));
        }, this), this.options.popupCheckInterval);
      } else location.href = b;
    } }, a(function () {
    a("." + k).socialLikes();
  });
});