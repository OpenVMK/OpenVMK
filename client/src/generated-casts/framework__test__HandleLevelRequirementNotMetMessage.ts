// framework.dcr / test / HandleLevelRequirementNotMetMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleLevelRequirementNotMetMessage(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var tConn = a_rMsg.connection;
  var t_iItemCode = callMethod("GetIntFrom", tConn);
  var t_iRequiredLevel = callMethod("GetIntFrom", tConn);
  var t_iAvatarLevel = callMethod("GetIntFrom", tConn);
  callMethod("ShowLevelRequiredScreen", callMethod("getInterface", _this), t_iItemCode, t_iRequiredLevel, t_iAvatarLevel)
}

