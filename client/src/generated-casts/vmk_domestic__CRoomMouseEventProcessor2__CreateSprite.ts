// vmk_domestic.cct / CRoomMouseEventProcessor2 / CreateSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateSprite(_me: LingoMe, _this: LingoValue, a_sOwner: LingoValue, a_bActive: LingoValue) {
  var t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  if (a_bActive) {
  setThePropOf(t_rSpr, "scriptInstanceList", new LingoList([callNamed("createObject", symbol("temp"), "CRoomMouseEventAgent")]));
  callMethod("setup", t_rSpr, a_sOwner, _this)
  }

  return t_rSpr;
}

