// vmk_minigame.cct / CVelocityTbl / GetBaseVelY

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetBaseVelY(_me: LingoMe, _this: LingoValue, a_iDirValue: LingoValue) {
  return meProp(_me, "m_ar_ar_iTbl")[2][lingoBinary("add", callMethod("ValidateDirValue", _this, a_iDirValue), 1)];
}

