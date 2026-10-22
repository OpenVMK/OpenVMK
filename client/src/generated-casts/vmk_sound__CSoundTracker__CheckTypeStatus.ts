// vmk_sound.cct / CSoundTracker / CheckTypeStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CheckTypeStatus(_me: LingoMe, a_memSnd: LingoValue) {
  var t_iPos = callMethod("findPos", meProp(_me, "m_mp_SndTypes"), a_memSnd.name);
  if ((lingoTruthy(callNamed("voidp", t_iPos)) ? 0 : 1)) {
  var a_sType = meProp(_me, "m_mp_SndTypes")[t_iPos];
  } else {
  a_sType = undefined;
  }

  switch (a_sType) {
case "music":
case "Music":
case "sound":
  if (meProp(_me, "m_StopJustMusic")) {
  var t_bSetting = 0;
  } else {
  t_bSetting = callMethod("get", callNamed("getObject", symbol("session")), "music");
  }

  return t_bSetting;
case "ui":
case "UI":
case "Ui":
  t_bSetting = callMethod("get", callNamed("getObject", symbol("session")), "ui");
  return t_bSetting;
case "fx":
case "FX":
case "Fx":
  t_bSetting = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  return t_bSetting;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  return 0;
}

