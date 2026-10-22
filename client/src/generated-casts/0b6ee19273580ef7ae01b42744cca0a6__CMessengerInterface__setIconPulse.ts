// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / setIconPulse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setIconPulse(_me: LingoMe, a_bState: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_rPulser"))) {
  setMeProp(_me, "m_rPulser", callNamed("createObject", "Messenger Icon Pulser", "CMessengerIconPulser"));
  }

  if (a_bState) {
  if ((lingoTruthy(meProp(_me, "m_bVisible")) ? 0 : 1)) {
  callMethod("Activate", meProp(_me, "m_rPulser"))
  }

  } else {
  callMethod("deactivate", meProp(_me, "m_rPulser"))
  }

}

