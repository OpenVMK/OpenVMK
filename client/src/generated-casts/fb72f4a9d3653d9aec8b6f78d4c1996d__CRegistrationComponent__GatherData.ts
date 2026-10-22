// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationComponent / GatherData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GatherData(_me: LingoMe, _this: LingoValue, a_sDataType: LingoValue, a_mp_Data: LingoValue) {
  if (callMethod("findPos", meProp(_me, "m_mp_ServerData"), a_sDataType)) {
  meProp(_me, "m_mp_ServerData")[a_sDataType] = a_mp_Data;
  } else {
  callMethod("addProp", meProp(_me, "m_mp_ServerData"), a_sDataType, a_mp_Data)
  }

}

