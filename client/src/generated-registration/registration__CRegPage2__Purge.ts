// registration.cct / CRegPage2 / Purge

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Purge(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue) {
  var t_rAnimationManager = callNamed("getObject", "AnimationManager");
  if (callNamed("objectp", t_rAnimationManager)) {
  callMethod("ClearAll", t_rAnimationManager)
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  setMeProp(_me, "m_rWindow", undefined);
  return callMethod("unmerge", a_rWindow);
  } else {
  return 1;
  }

}

