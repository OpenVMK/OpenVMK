// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / MagicFxStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MagicFxStatus(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  if (lingoBinary("eq", _me.m_sMyName, _me.m_sAvatarName)) {
  if ((lingoTruthy(callNamed("timeoutExists", lingoBinary("join", "FxLocator", _me.m_iMyRef))) ? 0 : 1)) {
  callNamed("createTimeout", lingoBinary("join", "FxLocator", _me.m_iMyRef), 200, symbol("GetActualPos"), callMethod("getID", _me), undefined, 0)
  }

  var t_iFxCode = callMethod("GetIntFrom", tMsg.connection);
  setThePropOf(_me, "m_iFuelPercent", callMethod("GetIntFrom", tMsg.connection));
  }

  return 0;
}

