// vmk_pirates_game.cct / CPiratesSound / playFx

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function playFx(_me: LingoMe, a_sFX: LingoValue) {
  var t_bMusic = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bMusic) {
  setMeProp(_me, "m_iChannel", lingoBinary("add", meProp(_me, "m_iChannel"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iChannel"), meProp(_me, "m_ar_rFX").count)) {
  setMeProp(_me, "m_iChannel", 1);
  }

  callMethod("StopSound", meProp(_me, "m_ar_rFX")[meProp(_me, "m_iChannel")])
  callMethod("SetSoundType", meProp(_me, "m_ar_rFX")[meProp(_me, "m_iChannel")], "fx")
  callMethod("SetParameter", meProp(_me, "m_ar_rFX")[meProp(_me, "m_iChannel")], "cut")
  callMethod("Define", meProp(_me, "m_ar_rFX")[meProp(_me, "m_iChannel")], a_sFX)
  var t_rChannel = callMethod("GetSoundChannel", meProp(_me, "m_ar_rFX")[meProp(_me, "m_iChannel")]);
  if (callNamed("objectp", t_rChannel)) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "m_ar_rFX1", t_rChannel), callMethod("isBusy", t_rChannel)))
  }

  callMethod("PlaySound", meProp(_me, "m_ar_rFX")[meProp(_me, "m_iChannel")])
  t_rChannel = callMethod("GetSoundChannel", meProp(_me, "m_ar_rFX")[meProp(_me, "m_iChannel")]);
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "m_ar_rFX", t_rChannel), callMethod("isBusy", t_rChannel)))
  }

}

