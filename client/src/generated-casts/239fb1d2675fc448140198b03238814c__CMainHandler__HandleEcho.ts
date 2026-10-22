// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / HandleEcho

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleEcho(_me: LingoMe, _this: LingoValue, a_vMsg: LingoValue) {
  var t_sHeader = callMethod("GetStrFrom", a_vMsg.connection);
  for (var i = 1; i <= t_sHeader.length; ++i) {
  switch (chunkOf(t_sHeader, "char", i, 0)) {
case "0":
  callNamed("put", callMethod("GetBoolFrom", a_vMsg.connection))
  break;
case "1":
  callNamed("put", callMethod("GetIntFrom", a_vMsg.connection))
  break;
case "2":
  callNamed("put", callMethod("GetStrFrom", a_vMsg.connection))
  break;
  }

  }

}

