// 3f02613936ba018480acffaf92dd883a.cct / CAnimationComponent / LoadAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadAnim(_me: LingoMe, i_sVariable: LingoValue) {
  var tNewID = callMethod("GetNewID", _me);
  var tNewArr = callNamed("createObject", lingoBinary("join", "RoomAnimation:", tNewID), "CArrangement");
  callMethod("LoadArrangement", tNewArr, callNamed("getVariableValue", i_sVariable))
  callMethod("SetName", tNewArr, i_sVariable)
  callMethod("setaProp", meProp(_me, "m_mp_arrangements"), tNewID, tNewArr)
  return tNewID;
}

