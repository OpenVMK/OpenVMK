// vmk_fireworks_preshow_handler.cct / CFWPSInterface / DisableButtons

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisableButtons(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sSignupWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sSignupWindowTitle"))
  }

}

