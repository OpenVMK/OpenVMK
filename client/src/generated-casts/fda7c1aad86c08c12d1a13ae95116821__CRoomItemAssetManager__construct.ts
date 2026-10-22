// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomItemAssetManager / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mp_sCast_rProps", new LingoPropList([]));
  setMeProp(_me, "m_mp_iType_rProps", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_mp_sCast_rProps"))
  callMethod("sort", meProp(_me, "m_mp_iType_rProps"))
  setMeProp(_me, "m_rFurnitureMap", callNamed("getThread", symbol("room")).component.m_rFurniMap);
  setMeProp(_me, "m_iMaxLoading", 5);
  setMeProp(_me, "m_ar_iPending", new LingoList([]));
  setMeProp(_me, "m_ar_iLoading", new LingoList([]));
  callNamed("receiveUpdate", callMethod("getID", _this))
}

