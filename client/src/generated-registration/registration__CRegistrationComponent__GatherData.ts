// registration.cct / CRegistrationComponent / GatherData

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GatherData(_me: LingoMe, _this: LingoValue, a_sDataType: LingoValue, a_mp_Data: LingoValue) {
  if (callMethod("findPos", meProp(_me, "m_mp_ServerData"), a_sDataType)) {
  meProp(_me, "m_mp_ServerData")[a_sDataType] = a_mp_Data;
  } else {
  callMethod("addProp", meProp(_me, "m_mp_ServerData"), a_sDataType, a_mp_Data)
  }

}

