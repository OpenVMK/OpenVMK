// 239fb1d2675fc448140198b03238814c.cct / CMainInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  callNamed("registerMessage", symbol("login_hide"), callMethod("getID", _this), symbol("closeLoginWindow"))
  callNamed("registerMessage", symbol("dictionary_ready"), callMethod("getID", _this), symbol("ShowLogin"))
  callNamed("registerMessage", symbol("ConnectionFailed"), callMethod("getID", _this), symbol("ShowConnectionFailed"))
  return 1;
}

