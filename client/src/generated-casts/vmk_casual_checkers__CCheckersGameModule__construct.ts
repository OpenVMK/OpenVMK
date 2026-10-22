// vmk_casual_checkers.cct / CCheckersGameModule / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_sInterface", callNamed("getUniqueID"));
  setThePropOf(_this, "m_iGameTypeCode", 1);
  setThePropOf(_this, "m_ar_sEngineClass", callNamed("GetClsVariable", "checkers.engine.class"));
  callNamed("executeMessage", "register_game_module", _this)
  return 1;
}

