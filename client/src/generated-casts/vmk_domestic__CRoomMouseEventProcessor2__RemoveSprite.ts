// vmk_domestic.cct / CRoomMouseEventProcessor2 / RemoveSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveSprite(_me: LingoMe, _this: LingoValue, a_rSprite: LingoValue) {
  setThePropOf(a_rSprite, "scriptInstanceList", new LingoList([]));
  return callNamed("releaseSprite", a_rSprite.spriteNum);
}

