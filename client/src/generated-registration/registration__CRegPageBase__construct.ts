// registration.cct / CRegPageBase / construct

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_bVisible", 0);
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_rCurPageObj", undefined);
  setMeProp(_me, "m_iCurrentPage", 0);
  setMeProp(_me, "m_iPageCount", 3);
  setMeProp(_me, "m_iLandingRoom", undefined);
  callNamed("executeMessage", symbol("MinigameState"), symbol("running"))
  return 1;
}

