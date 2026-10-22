// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / SpliceLine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SpliceLine(_me: LingoMe, i_sText: LingoValue) {
  var tOut = new LingoList([]);
  var tMatches = new LingoList([]);
  callMethod("pickMatches", _me, i_sText, meProp(_me, "m_ar_ownWords"), tMatches)
  callMethod("pickMatches", _me, i_sText, meProp(_me, "m_ar_friendWords"), tMatches)
  for (var tFreeWord of meProp(_me, "m_ar_freeWords").toArray()) {
  if (lingoBinary("and", lingoBinary("gt", tFreeWord.length, 0), lingoBinary("eq", callNamed("getPos", meProp(_me, "m_ar_ownWords"), tFreeWord), 0))) {
  var TestString = callNamed("convertToLowerCase", i_sText);
  var tCurrentOffset = 1;
  while (lingoBinary("lt", tCurrentOffset, i_sText.length)) {
  if (lingoBinary("contains", TestString, tFreeWord)) {
  var tOffset = callNamed("offset", tFreeWord, TestString);
  if (lingoBinary("eq", tOffset, 0)) {
  callNamed("error", _me, "W00T!? String contained substring but it's offset is not valid?", symbol("SpliceLine"))
  }

  var tNextIndex = lingoBinary("add", tOffset, tFreeWord.length);
  var tChar = TestString.char[tNextIndex];
  if (lingoBinary("or", callMethod("isSeparator", _me, tChar), lingoBinary("gt", tNextIndex, TestString.length))) {
  callMethod("append", tMatches, new LingoPropList([symbol("offset"), lingoBinary("sub", lingoBinary("add", tCurrentOffset, tOffset), 1), symbol("string"), callNamed("chars", TestString, tOffset, lingoBinary("sub", lingoBinary("add", tOffset, tFreeWord.length), 1))]))
  } else {
  }

  tCurrentOffset = lingoBinary("sub", lingoBinary("add", lingoBinary("add", tCurrentOffset, tOffset), tFreeWord.length), 1);
  TestString = callNamed("chars", TestString, tCurrentOffset, TestString.length);
  continue;
  }

  tCurrentOffset = i_sText.length;
  }

  }

  }

  for (var i = 1; i <= tMatches.count; ++i) {
  for (var j = 1; j <= tMatches.count; ++j) {
  if (lingoBinary("neq", i, j)) {
  var tTest1 = tMatches[i];
  var tTest2 = tMatches[j];
  if (lingoBinary("eq", tTest1.offset, tTest2.offset)) {
  if (lingoBinary("gt", tTest1._string.length, tTest2._string.length)) {
  if (callNamed("voidp", callMethod("getaProp", tTest2, symbol("discard")))) {
  callMethod("setaProp", tTest2, symbol("discard"), 1)
  }

  if (callNamed("voidp", callMethod("getaProp", tTest1, symbol("discard")))) {
  callMethod("setaProp", tTest1, symbol("discard"), 0)
  }

  continue;
  }

  if (callNamed("voidp", callMethod("getaProp", tTest1, symbol("discard")))) {
  callMethod("setaProp", tTest1, symbol("discard"), 1)
  }

  if (callNamed("voidp", callMethod("getaProp", tTest2, symbol("discard")))) {
  callMethod("setaProp", tTest2, symbol("discard"), 0)
  }

  }

  }

  }

  }

  var t_ar_TrueMatches = new LingoList([]);
  for (var tMatch of tMatches.toArray()) {
  if (callNamed("voidp", callMethod("getaProp", tMatch, symbol("discard")))) {
  callMethod("append", t_ar_TrueMatches, tMatch)
  continue;
  }

  if ((lingoTruthy(tMatch.discard) ? 0 : 1)) {
  callMethod("append", t_ar_TrueMatches, tMatch)
  }

  }

  tMatches = t_ar_TrueMatches;
  if (lingoBinary("gt", tMatches.count, 1)) {
  var tBubble = 2;
  for (var i = 1; i <= tMatches.count; ++i) {
  for (var j = tBubble; j <= tMatches.count; ++j) {
  if (lingoBinary("gt", tMatches[i].offset, tMatches[j].offset)) {
  var tTemp = tMatches[i];
  tMatches[i] = tMatches[j];
  tMatches[j] = tTemp;
  }

  }

  tBubble = lingoBinary("add", tBubble, 1);
  }

  }

  var tMaskRegister = new LingoList([]);
  for (var a = 1; a <= i_sText.length; ++a) {
  callMethod("append", tMaskRegister, new LingoPropList([symbol("char"), i_sText.char[a], symbol("mask"), 0]))
  }

  for (var tMatch of tMatches.toArray()) {
  var tMaskedOut = 0;
  for (var t = tMatch.offset; t <= lingoBinary("sub", lingoBinary("add", tMatch.offset, tMatch._string.length), 1); ++t) {
  if (tMaskRegister[t].mask) {
  tMaskedOut = 1;
  }

  }

  if ((lingoTruthy(tMaskedOut) ? 0 : 1)) {
  for (var t = tMatch.offset; t <= lingoBinary("sub", lingoBinary("add", tMatch.offset, tMatch._string.length), 1); ++t) {
  setThePropOf(tMaskRegister[t], "mask", 1);
  }

  callMethod("setaProp", tMatch, symbol("discard"), 0)
  continue;
  }

  callMethod("setaProp", tMatch, symbol("discard"), 1)
  }

  t_ar_TrueMatches = new LingoList([]);
  for (var tMatch of tMatches.toArray()) {
  if (callNamed("voidp", callMethod("getaProp", tMatch, symbol("discard")))) {
  callMethod("append", t_ar_TrueMatches, tMatch)
  continue;
  }

  if ((lingoTruthy(tMatch.discard) ? 0 : 1)) {
  callMethod("append", t_ar_TrueMatches, tMatch)
  }

  }

  tMatches = t_ar_TrueMatches;
  for (var tMatch of tMatches.toArray()) {
  var tLen = tMatch._string.length;
  var t_sOrg = i_sText.char.range(tMatch.offset, lingoBinary("sub", lingoBinary("add", tMatch.offset, tLen), 1));
  setThePropOf(tMatch, "string", t_sOrg);
  }

  var tBlocks = new LingoList([]);
  tCurrentOffset = 1;
  for (var tMatch of tMatches.toArray()) {
  if (lingoBinary("gt", tMatch.offset, tCurrentOffset)) {
  callMethod("append", tBlocks, new LingoPropList([symbol("string"), callNamed("chars", i_sText, tCurrentOffset, lingoBinary("sub", tMatch.offset, 1)), symbol("dest"), symbol("splicer")]))
  }

  callMethod("append", tBlocks, new LingoPropList([symbol("string"), tMatch._string, symbol("dest"), symbol("free")]))
  tCurrentOffset = lingoBinary("add", tMatch.offset, tMatch._string.length);
  }

  if (lingoBinary("lte", tCurrentOffset, i_sText.length)) {
  callMethod("append", tBlocks, new LingoPropList([symbol("string"), callNamed("chars", i_sText, tCurrentOffset, i_sText.length), symbol("dest"), symbol("splicer")]))
  }

  for (var tBlock of tBlocks.toArray()) {
  switch (tBlock.dest) {
case symbol("free"):
  callMethod("append", tOut, tBlock._string)
  break;
case symbol("splicer"):
  var t_ar_splices = callMethod("SpliceString", _me, tBlock._string);
  for (var tSplice of t_ar_splices.toArray()) {
  callMethod("append", tOut, tSplice)
  }

  break;
  }

  }

  return tOut;
}

