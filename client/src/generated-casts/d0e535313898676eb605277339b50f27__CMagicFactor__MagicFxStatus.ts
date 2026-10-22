// d0e535313898676eb605277339b50f27.cct / CMagicFactor / MagicFxStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MagicFxStatus(_me: LingoMe, tMsg: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_sMyName"), meProp(_me, "m_sAvatarName"))) {
  if ((lingoTruthy(callNamed("timeoutExists", lingoBinary("join", "FxLocator", meProp(_me, "m_iMyRef")))) ? 0 : 1)) {
  callNamed("createTimeout", lingoBinary("join", "FxLocator", meProp(_me, "m_iMyRef")), 200, symbol("GetActualPos"), callMethod("getID", _me), undefined, 0)
  }

  var t_iFxCode = callMethod("GetIntFrom", tMsg.connection);
  setMeProp(_me, "m_iFuelPercent", callMethod("GetIntFrom", tMsg.connection));
  } else {
  return 0;
  }

}

