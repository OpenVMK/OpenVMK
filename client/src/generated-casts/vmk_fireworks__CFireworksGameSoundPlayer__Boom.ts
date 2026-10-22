// vmk_fireworks.cct / CFireworksGameSoundPlayer / Boom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Boom(_me: LingoMe, a_rSound: LingoValue, a_fPitch: LingoValue) {
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bOn) {
  callMethod("PlayIfNotBusy", _me, meProp(_me, "m_ar_rFx1Channel")[meProp(_me, "m_iCurFX1Channel")], a_rSound, a_fPitch)
  setMeProp(_me, "m_iCurFX1Channel", lingoBinary("add", meProp(_me, "m_iCurFX1Channel"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iCurFX1Channel"), meProp(_me, "m_ar_rFx1Channel").count)) {
  setMeProp(_me, "m_iCurFX1Channel", 1);
  }

  }

}

