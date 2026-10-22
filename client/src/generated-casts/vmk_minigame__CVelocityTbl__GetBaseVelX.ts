// vmk_minigame.cct / CVelocityTbl / GetBaseVelX

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetBaseVelX(_me: LingoMe, _this: LingoValue, a_iDirValue: LingoValue) {
  return meProp(_me, "m_ar_ar_iTbl")[1][lingoBinary("add", callMethod("ValidateDirValue", _this, a_iDirValue), 1)];
}

