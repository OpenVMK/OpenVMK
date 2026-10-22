// d0e535313898676eb605277339b50f27.cct / CAvatarClothAssetManager / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mp_sName_rStruct", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_mp_sName_rStruct"))
  setMeProp(_me, "m_mp_sCast_rProps", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_mp_sCast_rProps"))
  setMeProp(_me, "m_mp_iCode_rProps", new LingoPropList([]));
  setMeProp(_me, "m_ar_rCallbacks", new LingoList([]));
  setMeProp(_me, "m_rClothingMap", callNamed("createObject", symbol("temp"), "CAvatarClothingMap"));
  setMeProp(_me, "m_iMaxLoading", 1);
  setMeProp(_me, "m_ar_iPending", new LingoList([]));
  setMeProp(_me, "m_ar_iLoading", new LingoList([]));
  callNamed("receiveUpdate", callMethod("getID", _this))
}

