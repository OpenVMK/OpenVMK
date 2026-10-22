// vmk_furniture_code.cct / CRoomItemStateAnimator / checkSoundSettings

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkSoundSettings(_me: LingoMe, _this: LingoValue) {
  var t_bMusic = callMethod("get", callNamed("getObject", symbol("session")), "music");
  var t_bFx = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  var t_bUi = callMethod("get", callNamed("getObject", symbol("session")), "ui");
  var t_iVolume = callMethod("get", callNamed("getObject", symbol("session")), "volume");
  var t_bTutorial = callMethod("get", callNamed("getObject", symbol("session")), "tutorial");
  var t_bTradeReq = callMethod("get", callNamed("getObject", symbol("session")), "traderequests");
  var t_bFriendReq = callMethod("get", callNamed("getObject", symbol("session")), "friendrequests");
  if ((lingoTruthy(t_bFx) ? 0 : 1)) {
  callMethod("StopSound", _this)
  } else {
  callMethod("PlaySound", _this)
  }

}

