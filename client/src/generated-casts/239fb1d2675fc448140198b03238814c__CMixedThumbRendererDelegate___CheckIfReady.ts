// 239fb1d2675fc448140198b03238814c.cct / CMixedThumbRendererDelegate / _CheckIfReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CheckIfReady(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("item")].count, 0)) {
  if (lingoBinary("eq", meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("pin")].count, 0)) {
  if (lingoBinary("eq", meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("poster")].count, 0)) {
  if (lingoBinary("eq", meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("cloth")].count, 0)) {
  if (lingoBinary("eq", meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("room")].count, 0)) {
  callNamed("call", meProp(_me, "m_rCallback")[symbol("method")], new LingoList([callNamed("getObject", meProp(_me, "m_rCallback")[symbol("client")])]), meProp(_me, "m_mp_iType_rOutput"), meProp(_me, "m_rCallback"))
  callNamed("removeObject", callMethod("getID", _this))
  }

  }

  }

  }

  }

}

