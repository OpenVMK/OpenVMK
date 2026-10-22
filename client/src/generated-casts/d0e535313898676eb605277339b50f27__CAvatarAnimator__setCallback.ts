// d0e535313898676eb605277339b50f27.cct / CAvatarAnimator / setCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setCallback(_me: LingoMe, a_sObjName: LingoValue, a_sMethod: LingoValue, a_mp_Data: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", a_sObjName)) ? 0 : 1)) {
  setMeProp(_me, "m_mp_CallBackData", new LingoPropList([symbol("object"), callNamed("getObject", a_sObjName), symbol("method"), a_sMethod, symbol("data"), a_mp_Data]));
  }

}

