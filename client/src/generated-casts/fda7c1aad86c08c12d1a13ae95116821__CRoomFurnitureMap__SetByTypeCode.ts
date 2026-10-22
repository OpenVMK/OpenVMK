// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurnitureMap / SetByTypeCode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetByTypeCode(_me: LingoMe, _this: LingoValue, a_iType: LingoValue, a_rXML: LingoValue) {
  callMethod("setaProp", meProp(_me, "m_mp_iCode_rItem"), a_iType, a_rXML)
}

