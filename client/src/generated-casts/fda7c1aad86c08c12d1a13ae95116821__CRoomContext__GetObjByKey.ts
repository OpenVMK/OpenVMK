// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomContext / GetObjByKey

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetObjByKey(_me: LingoMe, _this: LingoValue, a_sKey: LingoValue) {
  return callMethod("GetObjByKey", _this.m_rFactory, a_sKey);
}

