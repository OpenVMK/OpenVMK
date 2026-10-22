// vmk_furniture_code.cct / CRoomItemStateAnimator / setSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setSound(_me: LingoMe, t_sSound: LingoValue) {
  if (callNamed("stringp", t_sSound)) {
  setMeProp(_me, "m_sSound", t_sSound);
  }

  if (callNamed("memberExists", meProp(_me, "m_sSound"))) {
  callMethod("PlaySound", _me)
  } else {
  setMeProp(_me, "m_sSound", "");
  }

}

