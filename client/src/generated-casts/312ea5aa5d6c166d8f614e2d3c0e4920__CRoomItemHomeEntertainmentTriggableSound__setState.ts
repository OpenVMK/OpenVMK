// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemHomeEntertainmentTriggableSound / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, _this: LingoValue, a_iState: LingoValue) {
  if (lingoBinary("neq", a_iState, meProp(_me, "m_iLastState"))) {
  if ((lingoTruthy(lingoBinary("or", callNamed("voidp", meProp(_me, "m_rSound")), lingoBinary("eq", meProp(_me, "m_rSound"), 0))) ? 0 : 1)) {
  callNamed("executeMessage", "PlayFxSound", meProp(_me, "m_rSound"))
  }

  }

  setMeProp(_me, "m_iLastState", a_iState);
}

