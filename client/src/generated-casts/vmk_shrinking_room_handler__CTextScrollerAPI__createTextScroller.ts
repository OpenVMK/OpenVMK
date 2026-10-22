// vmk_shrinking_room_handler.cct / CTextScrollerAPI / createTextScroller

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createTextScroller(_me: LingoMe) {
  if (lingoBinary("lt", theProperty("paramCount"), 1)) {
  return 0;
  }

  var t_sContent = callNamed("param", 1);
  return callMethod("CreateNewTextScroller", callMethod("getComponent", callNamed("getThread", "TextScroller")), t_sContent);
}

