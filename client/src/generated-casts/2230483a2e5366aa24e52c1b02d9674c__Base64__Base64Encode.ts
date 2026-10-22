// 2230483a2e5366aa24e52c1b02d9674c.cct / Base64 / Base64Encode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Base64Encode(_me: LingoMe, str: LingoValue, splitChunks: LingoValue) {
  if (lingoBinary("contains", theProperty("platform"), "mac")) {
  return callMethod("Base64EncodeMAC", _me, str, splitChunks);
  }

  var subStrings = new LingoList([]);
  var out = "";
  var i = 1;
  var strRemainder = lingoBinary("mod", str.length, 3);
  var strLength = lingoBinary("sub", str.length, strRemainder);
  while (lingoBinary("lt", i, strLength)) {
  if (lingoBinary("eq", lingoBinary("mod", i, 100), 0)) {
  callMethod("showProgress", _me, lingoBinary("div", callNamed("float", i), strLength))
  }

  var a = callNamed("charToNum", str.char[i]);
  var b = callNamed("charToNum", str.char[lingoBinary("add", i, 1)]);
  var c = callNamed("charToNum", str.char[lingoBinary("add", i, 2)]);
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", a, 252), 4), 1)];
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", lingoBinary("add", lingoBinary("mul", a, 256), b), 1008), 16), 1)];
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", lingoBinary("add", lingoBinary("mul", b, 256), c), 4032), 64), 1)];
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", callNamed("bitAnd", c, 63), 1)];
  i = lingoBinary("add", i, 3);
  if (lingoBinary("and", splitChunks, lingoBinary("eq", lingoBinary("mod", i, 54), 1))) {
  out = out + meProp(_me, "pReturn");
  }

  if (lingoBinary("gt", callNamed("length", out), meProp(_me, "pSubLengthLim"))) {
  callMethod("append", subStrings, out)
  out = "";
  }

  }

  if (lingoBinary("eq", strRemainder, 1)) {
  a = callNamed("charToNum", str.char[i]);
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", a, 252), 4), 1)];
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", lingoBinary("mul", a, 256), 1008), 16), 1)];
  out = out + "=";
  out = out + "=";
  } else {
  if (lingoBinary("eq", strRemainder, 2)) {
  a = callNamed("charToNum", str.char[i]);
  b = callNamed("charToNum", str.char[lingoBinary("add", i, 1)]);
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", a, 252), 4), 1)];
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", lingoBinary("add", lingoBinary("mul", a, 256), b), 1008), 16), 1)];
  out = out + meProp(_me, "pBase64Lookup").char[lingoBinary("add", lingoBinary("div", callNamed("bitAnd", lingoBinary("mul", b, 256), 4032), 64), 1)];
  out = out + "=";
  }

  }

  var b64Str = "";
  for (var s of subStrings.toArray()) {
  b64Str = b64Str + s;
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

