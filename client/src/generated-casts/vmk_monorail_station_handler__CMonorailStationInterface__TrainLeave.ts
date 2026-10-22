// vmk_monorail_station_handler.cct / CMonorailStationInterface / TrainLeave

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TrainLeave(_me: LingoMe) {
  callMethod("hideExits", _me)
  callMethod("hideMasks", _me)
  if (callNamed("threadExists", symbol("animation"))) {
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  callMethod("PlayAnim", tAnimEngine, meProp(_me, "m_animIDs")[2])
  }

  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bOn) {
  callNamed("executeMessage", "PlayInterfaceSound", "MR-doors-close")
  callNamed("executeMessage", "PlayInterfaceSound", "MR-train-leave")
  callNamed("executeMessage", "PlayInterfaceSound", "MRVO-allaboard")
  }

  callMethod("displayText", _me, "Next monorail arrives in a few moments")
}

