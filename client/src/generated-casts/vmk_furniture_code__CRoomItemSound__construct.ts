// vmk_furniture_code.cct / CRoomItemSound / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_LoopSnd_obj", undefined);
  setMeProp(_me, "m_iType", undefined);
  setMeProp(_me, "m_sSoundName", "");
  callNamed("registerObject", callNamed("getUniqueID"), _this)
  callNamed("registerMessage", "close_Settings", callMethod("getID", _this), symbol("checkSoundSettings"))
  callNamed("registerMessage", "countSoundItems", callMethod("getID", _this), symbol("countSoundItems"))
  return 1;
}

