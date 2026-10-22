// vmk_fireworks.cct / CFireworksGameInterface / HideStageEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideStageEnd(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sEndStageWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sEndStageWndTitle"))
  }

  if (callNamed("timeoutExists", "FWMidStageCountdown")) {
  callNamed("removeTimeout", "FWMidStageCountdown")
  }

}

