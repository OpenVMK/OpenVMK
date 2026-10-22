// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomItemAssetManager / deconstruct

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
  setMeProp(_me, "m_mp_sCast_rProps", undefined);
  setMeProp(_me, "m_mp_iType_rProps", undefined);
  setMeProp(_me, "m_rFurnitureMap", undefined);
  setMeProp(_me, "m_ar_iPending", undefined);
  setMeProp(_me, "m_ar_iLoading", undefined);
}

