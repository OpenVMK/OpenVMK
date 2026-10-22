// 42c66f7b170484e24189f467fe87b08d.cct / CSoundTracker / CheckTypeStatus

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
  var t_bSetting = callMethod("get", callNamed("getObject", symbol("session")), "music");
  if (t_bSetting) {
  return 1;
  } else {
  return 0;
  }

  break;
case "ui":
case "UI":
case "Ui":
  t_bSetting = callMethod("get", callNamed("getObject", symbol("session")), "ui");
  if (t_bSetting) {
  return 1;
  } else {
  return 0;
  }

  break;
case "fx":
case "FX":
case "Fx":
  t_bSetting = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bSetting) {
  return 1;
  } else {
  return 0;
  }

  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  return 0;
}

