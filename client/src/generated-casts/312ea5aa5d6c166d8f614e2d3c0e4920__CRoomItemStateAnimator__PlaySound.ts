// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemStateAnimator / PlaySound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySound(_me: LingoMe, _this: LingoValue) {
  var t_bMusic = callMethod("get", callNamed("getObject", symbol("session")), "music");
  var t_bFx = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  var t_bUi = callMethod("get", callNamed("getObject", symbol("session")), "ui");
  var t_iVolume = callMethod("get", callNamed("getObject", symbol("session")), "volume");
  var t_bTutorial = callMethod("get", callNamed("getObject", symbol("session")), "tutorial");
  var t_bTradeReq = callMethod("get", callNamed("getObject", symbol("session")), "traderequests");
  var t_bFriendReq = callMethod("get", callNamed("getObject", symbol("session")), "friendrequests");
  if ((lingoTruthy(lingoBinary("eq", meProp(_me, "m_sSound"), "")) ? 0 : 1)) {
  if (t_bFx) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_LoopSnd_obj"))) ? 0 : 1)) {
  setMeProp(_me, "m_LoopSnd_obj", callNamed("createObject", callNamed("getUniqueID"), "CSoundObject"));
  }

  callMethod("Define", meProp(_me, "m_LoopSnd_obj"), meProp(_me, "m_sSound"))
  callMethod("SetSoundType", meProp(_me, "m_LoopSnd_obj"), "fx")
  callMethod("PlaySound", meProp(_me, "m_LoopSnd_obj"))
  }

  }

}

