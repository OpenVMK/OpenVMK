// 42c66f7b170484e24189f467fe87b08d.cct / CSoundObjectBU / CheckTypeStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CheckTypeStatus(_me: LingoMe) {
  var t_iVolume = undefined;
  t_iVolume = callMethod("get", callNamed("getObject", symbol("session")), "volume");
  if (callNamed("voidp", t_iVolume)) {
  t_iVolume = 240;
  }

  switch (meProp(_me, "m_sSoundType")) {
case "music":
case "Music":
  var t_bSetting = callMethod("get", callNamed("getObject", symbol("session")), "music");
  if (t_bSetting) {
  setThePropOf(callNamed("sound", meProp(_me, "m_iSoundChannel")), "volume", t_iVolume);
  callNamed("put", "set volume(", lingoBinary("join", lingoBinary("join", meProp(_me, "m_iSoundChannel"), ") to : "), t_iVolume))
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
  setThePropOf(callNamed("sound", meProp(_me, "m_iSoundChannel")), "volume", t_iVolume);
  callNamed("put", "set volume(", lingoBinary("join", lingoBinary("join", meProp(_me, "m_iSoundChannel"), ") to : "), t_iVolume))
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
  setThePropOf(callNamed("sound", meProp(_me, "m_iSoundChannel")), "volume", t_iVolume);
  callNamed("put", "set volume(", lingoBinary("join", lingoBinary("join", meProp(_me, "m_iSoundChannel"), ") to : "), t_iVolume))
  return 1;
  } else {
  return 0;
  }

  break;
  default:
  setThePropOf(callNamed("sound", meProp(_me, "m_iSoundChannel")), "volume", t_iVolume);
  callNamed("put", "set volume(", lingoBinary("join", lingoBinary("join", meProp(_me, "m_iSoundChannel"), ") to : "), t_iVolume))
  return 1;
  break;
  break;
  break;
  break;
  break;
  }

}

