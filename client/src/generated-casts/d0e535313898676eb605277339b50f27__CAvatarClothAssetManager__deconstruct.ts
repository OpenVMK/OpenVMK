// d0e535313898676eb605277339b50f27.cct / CAvatarClothAssetManager / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("removeUpdate", callMethod("getID", _this))
  callNamed("unregisterMessage", "CreateAvatar", callMethod("getID", _this))
  var m_rClothingSet = undefined;
  setMeProp(_me, "m_ar_rCallbacks", undefined);
  setMeProp(_me, "m_mp_sCast_rProps", undefined);
  setMeProp(_me, "m_mp_sName_rStruct", undefined);
  setMeProp(_me, "m_mp_iCode_rProps", undefined);
  setMeProp(_me, "m_ar_iPending", undefined);
  setMeProp(_me, "m_ar_iLoading", undefined);
}

