// vmk_casual.cct / CCasualGameModule / OnGameStart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnGameStart(_me: LingoMe, _this: LingoValue, a_iGameID: LingoValue, a_rMsg: LingoValue) {
  callMethod("GameStart", callMethod("getaProp", meProp(_me, "m_mp_iRef_rEngine"), a_iGameID), a_rMsg)
}

