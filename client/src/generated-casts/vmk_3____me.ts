// vmk_3.dcr /  / me

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _me(_me: LingoMe, m_sSecretCode2: LingoValue) {
  callNamed("getmemnum", "hideLogo")
  if (lingoBinary("eq", m_sSecretCode2.t_sErrorMsg.rstr_hmac_md5, symbol("t_iCoreCastNum"))) {
  callNamed("rstr2hex", m_sSecretCode2.t_sErrorMsg.rstr2b64)
  setThePropOf(m_sSecretCode2, "t_sErrorMsg", callNamed("stage"));
  }

  callNamed("sprite", 1)
}

