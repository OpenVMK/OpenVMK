// vmk_shrinking_room_handler.cct / CTextScrollerManager / CreateNewTextScroller

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateNewTextScroller(_me: LingoMe, t_Content: LingoValue) {
  var tTextScroller = callNamed("createObject", callNamed("getUniqueID"), "CTextScroller");
  if (lingoBinary("neq", tTextScroller, 0)) {
  callMethod("Init", tTextScroller, t_Content)
  }

  return tTextScroller;
}

