// 2230483a2e5366aa24e52c1b02d9674c.cct / Base64 / Base64EncodeMAC

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Base64EncodeMAC(_me: LingoMe, str: LingoValue, splitChunks: LingoValue) {
  var out = "";
  var i = 1;
  var strLength = str.length;
  var strRemainder = lingoBinary("mod", strLength, 3);
  strLength = lingoBinary("sub", strLength, strRemainder);
  var chunk = chunkOf(str, "char", 1, meProp(_me, "pSubLengthLim"));
  str = deleteStringChunk(str, "char", 1, meProp(_me, "pSubLengthLim"));
  var b64Str = "";
  while (lingoBinary("lt", i, strLength)) {
  if (lingoBinary("eq", lingoBinary("mod", i, 100), 0)) {
  callMethod("showProgress", _me, lingoBinary("div", callNamed("float", i), strLength))
  }

  var a = callNamed("charToNum", chunk.char[1]);
  var b = callNamed("charToNum", chunk.char[2]);
  var c = callNamed("charToNum", chunk.char[3]);
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", a, 252), 4), 1)];
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", lingoBinary("add", lingoBinary("mul", a, 256), b), 1008), 16), 1)];
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", lingoBinary("add", lingoBinary("mul", b, 256), c), 4032), 64), 1)];
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", callNamed("bitAnd", c, 63), 1)];
  i = lingoBinary("add", i, 3);
  if (lingoBinary("and", splitChunks, lingoBinary("eq", lingoBinary("mod", i, 54), 1))) {
  out = out + meProp(_me, "pReturn");
  }

  chunk = deleteStringChunk(chunk, "char", 1, 3);
  if (lingoBinary("eq", lingoBinary("mod", lingoBinary("sub", i, 1), meProp(_me, "pSubLengthLim")), 0)) {
  chunk = chunkOf(str, "char", 1, meProp(_me, "pSubLengthLim"));
  str = deleteStringChunk(str, "char", 1, meProp(_me, "pSubLengthLim"));
  b64Str = b64Str + out;
  out = "";
  }

  }

  if (lingoBinary("eq", strRemainder, 1)) {
  a = callNamed("charToNum", chunk.char[1]);
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", a, 252), 4), 1)];
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", lingoBinary("mul", a, 256), 1008), 16), 1)];
  out = out + "==";
  } else {
  if (lingoBinary("eq", strRemainder, 2)) {
  a = callNamed("charToNum", chunk.char[1]);
  b = callNamed("charToNum", chunk.char[2]);
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", a, 252), 4), 1)];
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", lingoBinary("add", lingoBinary("mul", a, 256), b), 1008), 16), 1)];
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", lingoBinary("mul", b, 256), 4032), 64), 1)];
  out = out + "=";
  }

  }

  b64Str = b64Str + out;
  if (splitChunks) {
  if (lingoBinary("eq", b64Str.char.range(lingoBinary("add", lingoBinary("sub", b64Str.length, meProp(_me, "pReturn").length), 1), b64Str.length), meProp(_me, "pReturn"))) {
  b64Str = deleteStringChunk(b64Str, "char", lingoBinary("add", lingoBinary("sub", b64Str.length, meProp(_me, "pReturn").length), 1), b64Str.length);
  }

  }

  b64Str = b64Str + meProp(_me, "pMimeHeader");
  callMethod("showProgress", _me, 1)
  return b64Str;
}

