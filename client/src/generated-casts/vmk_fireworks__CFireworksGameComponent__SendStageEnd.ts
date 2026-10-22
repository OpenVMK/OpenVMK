// vmk_fireworks.cct / CFireworksGameComponent / SendStageEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendStageEnd(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_bScoreSent")) ? 0 : 1)) {
  callMethod("SendScore", _me)
  }

  var tMsg = new LingoList([]);
  callNamed("executeMessage", symbol("SendMinigameAction"), 1, tMsg)
}

