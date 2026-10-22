// vmk_casual.cct / CCasualGameModule / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("executeMessage", "unregister_game_module", _this)
  for (var t_rEngine of meProp(_me, "m_mp_iRef_rEngine").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rEngine))
  }

  setMeProp(_me, "m_mp_iRef_rEngine", undefined);
  return 1;
}

