// vmk_shipwreck_handler.cct / CTextScrollRendererIsometric / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  var t_sName = lingoBinary("join", callMethod("getID", _me), ".bitmapfont");
  if (lingoBinary("neq", callNamed("getObject", t_sName), 0)) {
  callNamed("removeObject", t_sName)
  }

}

