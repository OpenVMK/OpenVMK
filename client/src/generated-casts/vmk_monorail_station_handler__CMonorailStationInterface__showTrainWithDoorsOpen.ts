// vmk_monorail_station_handler.cct / CMonorailStationInterface / showTrainWithDoorsOpen

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showTrainWithDoorsOpen(_me: LingoMe) {
  callMethod("stopAnimations", _me)
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_monorailAnimator"))) ? 0 : 1)) {
  callMethod("stopAnimating", meProp(_me, "m_monorailAnimator"))
  }

  callMethod("resetTrainRegPoints", _me)
  callMethod("ShowTrain", _me)
  callMethod("showDoorsOpen", _me)
}

