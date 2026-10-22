// registration.cct / CRegPage2 / merge

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue) {
  setMeProp(_me, "m_rWindow", a_rWindow);
  callMethod("merge", meProp(_me, "m_rWindow"), "vmk_reg_step2.window")
  callMethod("attachAnimation", _this, "animation", "reg_anim.ani")
  return 1;
}

