// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurnitureMap / GetByTypeCode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetByTypeCode(_me: LingoMe, _this: LingoValue, a_iType: LingoValue) {
  var t_rObjDesc = undefined;
  if (meProp(_me, "m_bReady")) {
  t_rObjDesc = callMethod("getaProp", meProp(_me, "m_mp_iCode_rItem"), a_iType);
  }

  if (callNamed("voidp", t_rObjDesc)) {
  callNamed("error", _this, lingoBinary("joinPad", "Unknown object type code:", a_iType), symbol("GetByTypeCode"))
  return callMethod("GetNode", meProp(_me, "m_rNullObjDesc"));
  } else {
  return t_rObjDesc;
  }

}

