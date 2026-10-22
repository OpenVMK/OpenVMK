// vmk_tutorial.cct / CJungleCruiseFactorBoat / SetBlocked

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetBlocked(_me: LingoMe, a_bState: LingoValue, a_blockerID: LingoValue) {
  if (lingoBinary("and", (lingoTruthy(callMethod("IsBlocked", _me)) ? 0 : 1), a_bState)) {
  callMethod("SayWatchout", callMethod("GetHostCharacter", callMethod("getComponent", callNamed("getThread", "junglecruise"))))
  }

  callMethod("setaProp", meProp(_me, "m_mp_blockers"), a_blockerID, a_bState)
}

