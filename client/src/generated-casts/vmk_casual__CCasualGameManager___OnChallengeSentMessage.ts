// vmk_casual.cct / CCasualGameManager / _OnChallengeSentMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OnChallengeSentMessage(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  if (_this.valid) {
  var t_iGameCode = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iAvatarRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rObj = callNamed("createDialogWindow", callMethod("getID", _this), callNamed("getUniqueID"), 1, 0);
  callMethod("setText", t_rObj, "Challenge sent", "Challenge sent", "OK", "foo4")
  callMethod("show", t_rObj)
  callMethod("addProp", meProp(_me, "m_mp_sType_rDialog"), "challenge_sent", t_rObj)
  }

}

