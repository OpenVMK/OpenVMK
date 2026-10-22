// vmk_fireworks_preshow_handler.cct / CFWPSInterface / DisableTimerWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisableTimerWindow(_me: LingoMe) {
  callNamed("removeTimeout", "FWCountdown")
  setMeProp(_me, "m_iTimeLeft", -float(1));
  setMeProp(_me, "m_bSignedUp", 0);
}

