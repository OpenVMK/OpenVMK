// core.old.cct / CWindowDropDown / UpdateImageObjects

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateImageObjects(_me: LingoMe, tPalette: LingoValue, tstate: LingoValue) {
  setMeProp(_me, "pDropDownImg", new LingoPropList([]));
  if (callNamed("voidp", tPalette)) {
  tPalette = _me.pPalette;
  } else {
  if (callNamed("stringp", tPalette)) {
  tPalette = callNamed("member", callNamed("getmemnum", tPalette));
  }

  }

  for (var tV of new LingoList([symbol("top"), symbol("middle"), symbol("bottom")]).toArray()) {
  for (var tH of new LingoList([symbol("left"), symbol("middle"), symbol("right")]).toArray()) {
  var tSymbol = callNamed("symbol", lingoBinary("join", tV, tH));
  var tDesc = meProp(_me, "pProp")[tstate][symbol("members")][tSymbol];
  var tmember = callNamed("member", callNamed("getmemnum", tDesc[symbol("member")]));
  var tImage = callMethod("duplicate", tmember.image);
  if (lingoBinary("neq", tImage.paletteRef, tPalette)) {
  setThePropOf(tImage, "paletteRef", tPalette);
  }

  if (tDesc[symbol("flipH")]) {
  tImage = callMethod("flipH", _me, tImage);
  }

  if (tDesc[symbol("flipV")]) {
  tImage = callMethod("flipV", _me, tImage);
  }

  if (!lingoTruthy(callNamed("voidp", tDesc[symbol("rotate")]))) {
  tImage = callMethod("rotateImg", _me, tImage, tDesc[symbol("rotate")]);
  }

  callMethod("addProp", meProp(_me, "pDropDownImg"), lingoBinary("join", lingoBinary("join", tV, "_"), tH), tImage)
  }

  }

  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pProp")[symbol("optionalimage")]))) {
  var tOptionalImages = meProp(_me, "pProp")[symbol("optionalimage")][symbol("members")];
  for (var i = 1; i <= callMethod("count", tOptionalImages); ++i) {
  tDesc = tOptionalImages[callMethod("getPropAt", tOptionalImages, i)];
  var tMemName = tDesc[symbol("member")];
  tmember = callNamed("member", callNamed("getmemnum", tMemName));
  tImage = callMethod("duplicate", tmember.image);
  if (lingoBinary("neq", tImage.paletteRef, tPalette)) {
  setThePropOf(tImage, "paletteRef", tPalette);
  }

  if (tDesc[symbol("flipH")]) {
  tImage = callMethod("flipH", _me, tImage);
  }

  if (tDesc[symbol("flipV")]) {
  tImage = callMethod("flipV", _me, tImage);
  }

  callMethod("addProp", meProp(_me, "pDropDownImg"), lingoBinary("join", "optionalimage_", callMethod("getPropAt", tOptionalImages, i)), tImage)
  }

  }

  setMeProp(_me, "pDotLineImg", callNamed("image", meProp(_me, "pMaxWidth"), 1, 8, tPalette));
  for (var tXPoint = 0; tXPoint <= lingoBinary("div", meProp(_me, "pMaxWidth"), 2); ++tXPoint) {
  callMethod("setPixel", meProp(_me, "pDotLineImg"), lingoBinary("mul", tXPoint, 2), 0, callNamed("rgb", 0, 0, 0))
  }

  setThePropOf(_me, "pPalette", tPalette);
  return tPalette;
}

