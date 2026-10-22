// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / SendEcho

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendEcho(_me: LingoMe, _this: LingoValue, a_mp_kType_vData: LingoValue) {
  if (lingoBinary("eq", callNamed("ilk", a_mp_kType_vData), symbol("propList"))) {
  var t_sHeader = "";
  var t_iCount = a_mp_kType_vData.count;
  for (var i = 1; i <= t_iCount; ++i) {
  switch (callMethod("getPropAt", a_mp_kType_vData, i)) {
case symbol("bool"):
case symbol("boolean"):
  t_sHeader = t_sHeader + "0";
  break;
case symbol("int"):
case symbol("integer"):
  t_sHeader = t_sHeader + "1";
  break;
case symbol("str"):
case symbol("string"):
  t_sHeader = t_sHeader + "2";
  break;
  break;
  break;
  break;
  }

  }

  var t_mp_kType_vData = new LingoPropList([symbol("str"), t_sHeader]);
  for (var i = 1; i <= a_mp_kType_vData.count; ++i) {
  callMethod("addProp", t_mp_kType_vData, callMethod("getPropAt", a_mp_kType_vData, i), a_mp_kType_vData[i])
  }

  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "echo", t_mp_kType_vData)
  }

}

