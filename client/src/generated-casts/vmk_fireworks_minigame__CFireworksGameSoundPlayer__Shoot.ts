// vmk_fireworks_minigame.cct / CFireworksGameSoundPlayer / Shoot

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Shoot(_me: LingoMe, a_rSound: LingoValue, a_fPitch: LingoValue) {
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bOn) {
  callMethod("PlayIfNotBusy", _me, meProp(_me, "m_ar_rFx2Channel")[meProp(_me, "m_iCurFX2Channel")], a_rSound, a_fPitch)
  setMeProp(_me, "m_iCurFX2Channel", lingoBinary("add", meProp(_me, "m_iCurFX2Channel"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iCurFX2Channel"), meProp(_me, "m_ar_rFx2Channel").count)) {
  setMeProp(_me, "m_iCurFX2Channel", 1);
  }

  }

}

