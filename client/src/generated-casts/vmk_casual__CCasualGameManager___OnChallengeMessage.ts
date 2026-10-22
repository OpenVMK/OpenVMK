// vmk_casual.cct / CCasualGameManager / _OnChallengeMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OnChallengeMessage(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  if (_this.valid) {
  var t_iGameID = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iAvatarRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iLevel = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rObj = callNamed("createObject", callNamed("getUniqueID"), "CCasualGameChallengeInterface");
  callMethod("ShowDialog", t_rObj, t_iGameID, t_iAvatarRef, t_iLevel)
  }

}

