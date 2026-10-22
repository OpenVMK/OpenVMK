// core.old.cct / CWindowCommonButton / UpdateImageObjects

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateImageObjects(_me: LingoMe, tPalette: LingoValue, tstate: LingoValue) {
  setMeProp(_me, "pButtonImg", new LingoPropList([]));
  if (callNamed("voidp", tPalette)) {
  tPalette = _me.pPalette;
  } else {
  if (callNamed("stringp", tPalette)) {
  tPalette = callNamed("member", callNamed("getmemnum", tPalette));
  }

  }

  for (var f of new LingoList([symbol("left"), symbol("middle"), symbol("right")]).toArray()) {
  var tDesc = meProp(_me, "pProp")[tstate][symbol("members")][f];
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

  callMethod("addProp", meProp(_me, "pButtonImg"), callNamed("symbol", f), tImage)
  }

}

