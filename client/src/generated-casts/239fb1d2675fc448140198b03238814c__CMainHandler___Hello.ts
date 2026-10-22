// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / _Hello

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Hello(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_bEncryptionEnabled = 0;
  if (lingoBinary("neq", callNamed("getVariable", "connection.encryption.enabled"), 0)) {
  t_bEncryptionEnabled = callNamed("getVariableValue", "connection.encryption.enabled");
  }

  if (t_bEncryptionEnabled) {
  var t_iNonceByteCount = callMethod("GetIntFrom", a_rMsg.connection);
  if ((lingoTruthy(callNamed("voidp", t_iNonceByteCount)) ? 0 : 1)) {
  var tConnection = callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK"));
  callMethod("sendNonce", tConnection, t_iNonceByteCount)
  }

  } else {
  t_iNonceByteCount = callMethod("GetIntFrom", a_rMsg.connection);
  if ((lingoTruthy(callNamed("voidp", t_iNonceByteCount)) ? 0 : 1)) {
  if (lingoBinary("gt", t_iNonceByteCount, 0)) {
  }

  }

  }

  if ((lingoTruthy(callNamed("timeoutExists", "login_starter")) ? 0 : 1)) {
  callNamed("createTimeout", "login_starter", 500, symbol("DoTheLogin"), callMethod("getID", _this), undefined, 0)
  }

}

