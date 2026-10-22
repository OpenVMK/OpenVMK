// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / HandleLogin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleLogin(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  callNamed("executeMessage", symbol("login_hide"))
  callNamed("executeMessage", symbol("ui_show"))
  callNamed("executeMessage", "init_messenger")
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 20)
}

