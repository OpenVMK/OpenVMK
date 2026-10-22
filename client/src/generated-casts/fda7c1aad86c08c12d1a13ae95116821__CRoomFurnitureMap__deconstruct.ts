// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurnitureMap / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_mp_iCode_rItem", undefined);
  setMeProp(_me, "m_rNullObjDesc", undefined);
  setMeProp(_me, "m_ar_sMapFileName", new LingoList([]));
  return 1;
}

