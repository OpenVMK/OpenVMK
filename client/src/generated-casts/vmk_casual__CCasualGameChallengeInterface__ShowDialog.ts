// vmk_casual.cct / CCasualGameChallengeInterface / ShowDialog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowDialog(_me: LingoMe, _this: LingoValue, a_iGameID: LingoValue, a_iChallengerRef: LingoValue, a_iChallengerLevel: LingoValue) {
  setMeProp(_me, "m_sDialogName", callNamed("getUniqueID"));
  setMeProp(_me, "m_iGameID", a_iGameID);
  setMeProp(_me, "m_iChallengerRef", a_iChallengerRef);
  setMeProp(_me, "m_iChallengerLevel", a_iChallengerLevel);
  setMeProp(_me, "m_iTimeLeft", 21);
  var t = callNamed("createDialogWindow", callMethod("getID", _this), meProp(_me, "m_sDialogName"), 2, 0);
  callMethod("UpdateTime", _this, t)
  callMethod("show", t)
}

