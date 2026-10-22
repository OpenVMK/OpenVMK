// vmk_casual.cct / CCasualGameModule / GetGameInstance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetGameInstance(_me: LingoMe, _this: LingoValue, a_iGameID: LingoValue) {
  return callMethod("getaProp", meProp(_me, "m_mp_iRef_rEngine"), a_iGameID);
}

