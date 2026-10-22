// vmk_shrinking_room_handler.cct / CTextScroller / implode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function implode(_me: LingoMe, t_ar: LingoValue, t_del: LingoValue) {
  var t_s = "";
  for (var c of t_ar.toArray()) {
  t_s = lingoBinary("join", lingoBinary("join", t_s, c), t_del);
  }

  return t_s;
}

