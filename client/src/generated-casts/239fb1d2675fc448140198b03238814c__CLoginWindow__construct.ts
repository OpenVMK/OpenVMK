// 239fb1d2675fc448140198b03238814c.cct / CLoginWindow / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_windowTitle", "loginwindow");
  setMeProp(_me, "pTempPassword", new LingoList([]));
  callMethod("showLoginWindow", _me)
  setMeProp(_me, "m_bLoginAllowed", 0);
  setMeProp(_me, "m_objLoadingWindow", undefined);
  return 1;
}

