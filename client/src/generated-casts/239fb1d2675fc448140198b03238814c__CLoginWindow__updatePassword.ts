// 239fb1d2675fc448140198b03238814c.cct / CLoginWindow / updatePassword

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updatePassword(_me: LingoMe) {
  var tElem = callMethod("getElement", callNamed("getWindow", meProp(_me, "m_windowTitle")), "password");
  var tStr = "";
  for (var tChar of meProp(_me, "pTempPassword").toArray()) {
  tStr = tStr + "*";
  }

  callMethod("setText", tElem, tStr)
  setTheProperty("selStart", meProp(_me, "pTempPassword").count);
  setTheProperty("selEnd", meProp(_me, "pTempPassword").count);
  return 1;
}

