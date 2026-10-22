// vmk_casual.cct / CCasualGameChallengeInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("timeoutExists", meProp(_me, "m_sChallengeTimeout"))) {
  callNamed("removeTimeout", meProp(_me, "m_sChallengeTimeout"))
  }

  if (callNamed("DialogWindowExists", meProp(_me, "m_sDialogName"))) {
  callNamed("removeDialogWindow", meProp(_me, "m_sDialogName"))
  }

  return 1;
}

