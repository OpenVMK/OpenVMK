// core.old.cct / CWindowScrollbar / UpdateImageObjects

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateImageObjects(_me: LingoMe, tPalette: LingoValue, tListStates: LingoValue) {
  if (callNamed("voidp", tPalette)) {
  tPalette = _me.pPalette;
  } else {
  if (callNamed("stringp", tPalette)) {
  tPalette = callNamed("member", callNamed("getmemnum", tPalette));
  }

  }

  for (var f of new LingoList([symbol("top"), symbol("lift"), symbol("bottom"), symbol("bar")]).toArray()) {
  for (var i of tListStates.toArray()) {
  var tDesc = meProp(_me, "pParts")[i][symbol("members")][f];
  if (!lingoTruthy(callNamed("voidp", tDesc))) {
  var tmember = callNamed("member", callNamed("getmemnum", tDesc[symbol("member")]));
  if (!lingoTruthy(callNamed("voidp", tDesc[symbol("palette")]))) {
  setThePropOf(_me, "pPalette", callNamed("member", callNamed("getmemnum", tDesc[symbol("palette")])));
  } else {
  setThePropOf(_me, "pPalette", tPalette);
  }

  var tImage = callMethod("duplicate", tmember.image);
  if (tDesc[symbol("flipH")]) {
  tImage = callMethod("flipH", _me, tImage);
  }

  if (tDesc[symbol("flipV")]) {
  tImage = callMethod("flipV", _me, tImage);
  }

  if (!lingoTruthy(callNamed("voidp", tDesc[symbol("rotate")]))) {
  tImage = callMethod("rotateImg", _me, tImage, tDesc[symbol("rotate")]);
  }

  callMethod("addProp", meProp(_me, "pButtonImg"), callNamed("symbol", lingoBinary("join", lingoBinary("join", f, "_"), i)), tImage)
  }

  }

  callMethod("DefineRects", _me, f)
  }

  return tPalette;
}

