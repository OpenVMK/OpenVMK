// vmk_pirates_game.cct / CPiratesMessageBar / updateMute

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateMute(_me: LingoMe, t_iTime: LingoValue) {
  if (lingoBinary("gt", t_iTime, 0)) {
  callMethod("setText", _me, lingoBinary("joinPad", lingoBinary("joinPad", "You've been muted for", t_iTime), "seconds."))
  t_iTime = lingoBinary("sub", t_iTime, 1);
  callNamed("createTimeout", lingoBinary("join", "PirateMuteTimer", theProperty("milliSeconds")), 1000, symbol("updateMute"), callMethod("getID", _me), t_iTime, 1)
  } else {
  callMethod("setText", _me, "")
  callMethod("setEditable", _me, 1)
  }

}

