// vmk_furniture_code.cct / CRoomItemStateAnimator / setCondition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setCondition(_me: LingoMe, t_sCondition: LingoValue) {
  if (callNamed("stringp", t_sCondition)) {
  setMeProp(_me, "m_sCondition", t_sCondition);
  }

}

