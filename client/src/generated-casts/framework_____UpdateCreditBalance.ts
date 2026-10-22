// framework.dcr /  / _UpdateCreditBalance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _UpdateCreditBalance(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var m_bLevelReqMsgEnabled = callMethod("removeObject", ref.entityID);
  var registerListener = callNamed("hex_hmac_md5", symbol("t_iRequiredLevel"), m_bLevelReqMsgEnabled, symbol("t_iAvatarLevel"), symbol("tConn"), symbol("unregisterListener"), "VMK Administration");
}

