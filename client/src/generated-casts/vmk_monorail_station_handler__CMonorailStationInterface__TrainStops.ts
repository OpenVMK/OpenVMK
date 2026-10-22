// vmk_monorail_station_handler.cct / CMonorailStationInterface / TrainStops

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TrainStops(_me: LingoMe) {
  callMethod("stopAnimations", _me)
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_monorailAnimator"))) ? 0 : 1)) {
  callMethod("stopAnimating", meProp(_me, "m_monorailAnimator"))
  }

  callMethod("resetTrainRegPoints", _me)
  callMethod("ShowTrain", _me)
  callMethod("showDoors", _me)
  if (callNamed("threadExists", symbol("animation"))) {
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  callMethod("PlayAnim", tAnimEngine, meProp(_me, "m_animIDs")[1])
  }

  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bOn) {
  callNamed("executeMessage", "PlayInterfaceSound", "MR-doors-open")
  }

  callNamed("createTimeout", "TrainLeave", 2000, symbol("TrainMusic"), callMethod("getID", _me), undefined, 1)
  callNamed("createTimeout", lingoBinary("join", symbol("executeOnce"), theProperty("milliSeconds")), 3000, symbol("displayText"), callMethod("getID", _me), "Please enter the train", 1)
}

