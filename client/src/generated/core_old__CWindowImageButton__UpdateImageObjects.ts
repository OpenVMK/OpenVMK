// core.old.cct / CWindowImageButton / UpdateImageObjects

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateImageObjects(_me: LingoMe, tPalette: LingoValue, tstate: LingoValue, tMemName: LingoValue) {
  if (callNamed("voidp", tPalette)) {
  tPalette = _me.pPalette;
  } else {
  if (callNamed("stringp", tPalette)) {
  tPalette = callNamed("member", callNamed("getmemnum", tPalette));
  }

  }

  if (lingoBinary("eq", tstate, symbol("up"))) {
  tMemName = lingoBinary("join", tMemName, ".active");
  } else {
  if (lingoBinary("eq", tstate, symbol("down"))) {
  tMemName = lingoBinary("join", tMemName, ".pressed");
  }

  }

  var tMemNum = callNamed("getmemnum", tMemName);
  if (lingoBinary("eq", tMemNum, 0)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Member not found:", tMemName), symbol("UpdateImageObjects"));
  }

  var tmember = callNamed("member", tMemNum);
  var tImage = callMethod("duplicate", tmember.image);
  if (lingoBinary("neq", tImage.paletteRef, tPalette)) {
  setThePropOf(tImage, "paletteRef", tPalette);
  }

  callMethod("addProp", _me.pButtonImg, callNamed("symbol", tstate), tImage)
}

