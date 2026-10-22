// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / SendLogin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendLogin(_me: LingoMe, _this: LingoValue, a_sName: LingoValue, a_sPassword: LingoValue) {
  var t_sMachineId = callNamed("getMachineID");
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id")), "login", new LingoPropList([symbol("str"), a_sName, symbol("str"), a_sPassword, symbol("str"), t_sMachineId]))
}

