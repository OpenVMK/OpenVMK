// vmk_shrinking_room_handler.cct / CTextScrollRendererIsometric / passEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function passEvent(_me: LingoMe, tObject: LingoValue) {
  if (lingoBinary("eq", tObject, 0)) {
  return 0;
  } else {
  if (lingoBinary("eq", callMethod("getOne", callMethod("handlers", tObject), symbol("scrollerUpdate")), 0)) {
  return 0;
  }

  }

  return 1;
}

