// vmk_casual.cct / CCasualGameChallengeInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iTimeLeft", 20);
  setMeProp(_me, "m_iChallengerRef", undefined);
  setMeProp(_me, "m_iGameID", undefined);
  setMeProp(_me, "m_iChallengerLevel", undefined);
  setMeProp(_me, "m_sChallengeTimeout", callNamed("getUniqueID"));
  return 1;
}

