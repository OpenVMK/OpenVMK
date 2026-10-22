// vmk_fireworks.cct / CFireworksGameInterface / dropasec

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dropasec(_me: LingoMe) {
  var tWnd = callNamed("getWindow", meProp(_me, "m_sEndStageWndTitle"));
  setMeProp(_me, "m_iStageStartCount", lingoBinary("sub", meProp(_me, "m_iStageStartCount"), 1));
  callMethod("setText", callMethod("getElement", tWnd, "fw.gamestart.count"), callNamed("string", meProp(_me, "m_iStageStartCount")))
}

