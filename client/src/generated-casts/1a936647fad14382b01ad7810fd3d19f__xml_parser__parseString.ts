// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / parseString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseString(_me: LingoMe, xmlString: LingoValue) {
  setThePropOf(_me, "child", new LingoList([]));
  setThePropOf(_me, "_idList", new LingoPropList([]));
  setThePropOf(_me, "_tagList", new LingoPropList([]));
  setThePropOf(_me, "_entityList", new LingoPropList([]));
  callMethod("addProp", _me._entityList, "lt", "<")
  callMethod("addProp", _me._entityList, "gt", ">")
  callMethod("addProp", _me._entityList, "amp", "&")
  callMethod("addProp", _me._entityList, "apos", "'")
  callMethod("addProp", _me._entityList, "quot", "\"")
  var currentNode = _me;
  setThePropOf(_me, "count", 0);
  var elementStack = new LingoList([]);
  var xmlTokens = callNamed("new", callNamed("script", "xml.tokenizer"), xmlString, "<>", 1);
  while (callMethod("hasMoreTokens", xmlTokens)) {
  var token = callMethod("NextToken", xmlTokens);
  if (lingoBinary("eq", token, "<")) {
  token = callMethod("NextToken", xmlTokens);
  switch (token.char[1]) {
case "?":
  if (lingoBinary("neq", token.char.range(2, 4), "xml")) {
  callMethod("append", currentNode.child, callMethod("parseProcInst", _me, token))
  }

  break;
case "!":
  switch (token.char.range(1, 3)) {
case "!DO":
  callMethod("parseDocType", _me, token)
  if (lingoBinary("contains", token, "[")) {
  while (callMethod("hasMoreTokens", xmlTokens)) {
  token = callMethod("NextToken", xmlTokens);
  if (lingoBinary("contains", token, "]")) {
  break;
  }

  switch (token.char.range(1, 3)) {
case "!EN":
  callMethod("parseEntity", _me, token)
  break;
  }

  }

  }

  break;
case "!--":
  while (callMethod("hasMoreTokens", xmlTokens)) {
  var newToken = callMethod("NextToken", xmlTokens);
  if (lingoBinary("eq", newToken, ">")) {
  if (lingoBinary("eq", token.char.range(lingoBinary("sub", token.length, 1), token.length), "--")) {
  break;
  }

  }

  token = newToken;
  }

  break;
case "![C":
  while (callMethod("hasMoreTokens", xmlTokens)) {
  newToken = callMethod("NextToken", xmlTokens);
  if (lingoBinary("eq", newToken, ">")) {
  if (lingoBinary("eq", token.char.range(lingoBinary("sub", token.length, 1), token.length), "]]")) {
  var textNode = callMethod("parseCDATA", _me, token);
  if (lingoBinary("eq", callNamed("ilk", textNode), symbol("instance"))) {
  callMethod("append", currentNode.child, textNode)
  }

  break;
  }

  }

  token = lingoBinary("join", token, newToken);
  }

  break;
  }

  break;
case "/":
  if (elementStack.count) {
  currentNode = elementStack[1];
  callMethod("deleteAt", elementStack, 1)
  setThePropOf(currentNode, "count", lingoBinary("add", currentNode.count, 1));
  }

  break;
  default:
  if (lingoBinary("eq", token.char[token.length], "/")) {
  token = deleteStringChunk(token, "char", token.length, token.length);
  var newNode = callMethod("parseElement", _me, token, 1);
  callMethod("append", currentNode.child, newNode)
  setThePropOf(currentNode, "count", lingoBinary("add", currentNode.count, 1));
  } else {
  callMethod("addAt", elementStack, 1, currentNode)
  newNode = callMethod("parseElement", _me, token, 0);
  callMethod("append", currentNode.child, newNode)
  currentNode = newNode;
  setThePropOf(currentNode, "count", 0);
  }

  }

  continue;
  }

  if (lingoBinary("eq", token, ">")) {
  continue;
  }

  if (lingoBinary("neq", currentNode, _me)) {
  textNode = callMethod("ParseText", _me, token);
  if (lingoBinary("eq", callNamed("ilk", textNode), symbol("instance"))) {
  callMethod("append", currentNode.child, textNode)
  }

  }

  }

}

