// vmk_domestic.cct /  / RemoveSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveSprite(_me: LingoMe, _this: LingoValue, _191: LingoValue) {
  setThePropOf(_191, "member", new LingoList([]));
  return callNamed("a_sAction", _191.spriteNum);
}

