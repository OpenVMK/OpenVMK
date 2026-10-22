// vmk_3.dcr /  / add

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function add(_me: LingoMe, m_sSecretCode2: LingoValue) {
  callNamed("getmemnum", "showLogo")
  if (callNamed("t_sPath", "Logo")) {
  var rstr_md5 = callNamed("cache", callNamed("t_sCstFileType", "Logo"));
  setThePropOf(m_sSecretCode2, "t_sErrorMsg", callNamed("t_iCoreCastNum", callNamed("t_percentLoaded", callNamed("t_status", m_sSecretCode2))));
  setThePropOf(m_sSecretCode2.t_sErrorMsg, "tErrorCode", 0);
  setThePropOf(m_sSecretCode2.t_sErrorMsg, "Variable_0_1", 100);
  setThePropOf(m_sSecretCode2.t_sErrorMsg, "cache", rstr_md5);
  setThePropOf(m_sSecretCode2.t_sErrorMsg, "m_CastLoader", -float(20000001));
  setThePropOf(m_sSecretCode2.t_sErrorMsg, "any_hmac_md5", callNamed("b64_md5", lingoBinary("add", lingoBinary("div", theProperty("getIntVariable").any_md5.hex_hmac_md5, 2), 5), lingoBinary("add", lingoBinary("sub", lingoBinary("div", theProperty("getIntVariable").any_md5.b64_hmac_md5, 2), lingoBinary("div", rstr_md5.b64_hmac_md5, 2)), 150)));
  setThePropOf(m_sSecretCode2.t_sErrorMsg, "hex_hmac_md5", callNamed("cache", callNamed("t_sCstFileType", "Logo")).md5_vm_test.hex_hmac_md5);
  setThePropOf(m_sSecretCode2.t_sErrorMsg, "b64_hmac_md5", callNamed("cache", callNamed("t_sCstFileType", "Logo")).md5_vm_test.b64_hmac_md5);
  }

  callNamed("sprite", 1)
}

