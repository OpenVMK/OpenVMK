// vmk_fireworks_minigame.cct / CFireworksGameInterface / setWarningFlash

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setWarningFlash(_me: LingoMe, i_index: LingoValue, a_fPercentTimeLeft: LingoValue) {
  setThePropOf(meProp(_me, "m_ar_mp_flashList")[i_index], "frame", callNamed("integer", lingoBinary("add", lingoBinary("mul", a_fPercentTimeLeft, lingoBinary("sub", meProp(_me, "m_ar_mFlashAnim").count, 1)), float(1))));
  if (lingoBinary("eq", a_fPercentTimeLeft, float(0))) {
  setThePropOf(meProp(_me, "m_ar_mp_flashList")[i_index], "frame", 0);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_mp_flashList")[i_index].sprite.member)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_ar_mp_flashList")[i_index].sprite, "member", undefined);
  }

  } else {
  if (lingoBinary("gt", meProp(_me, "m_ar_mp_flashList")[i_index].frame, meProp(_me, "m_ar_mFlashAnim").count)) {
  setThePropOf(meProp(_me, "m_ar_mp_flashList")[i_index], "frame", 0);
  setThePropOf(meProp(_me, "m_ar_mp_flashList")[i_index].sprite, "member", undefined);
  }

  }

}

