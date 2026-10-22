// 239fb1d2675fc448140198b03238814c.cct / CMixedThumbRendererDelegate / _AssetsLoadedCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AssetsLoadedCbk(_me: LingoMe, _this: LingoValue, a_mp_iType_rOutput: LingoValue) {
  var t_iType = callMethod("getPropAt", a_mp_iType_rOutput, 1);
  switch (1) {
case lingoBinary("lt", t_iType, 2000):
  var t_kCategory = symbol("item");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 2000), lingoBinary("lt", t_iType, 3001)):
  t_kCategory = symbol("pin");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 3000), lingoBinary("lt", t_iType, 4001)):
  t_kCategory = symbol("poster");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 20000), lingoBinary("lt", t_iType, 50000)):
  t_kCategory = symbol("cloth");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 5000), lingoBinary("lt", t_iType, 6000)):
  t_kCategory = symbol("room");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 6000), lingoBinary("lt", t_iType, 8000)):
  t_kCategory = symbol("pin");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 10000), lingoBinary("lt", t_iType, 12001)):
  t_kCategory = symbol("item");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 12000), lingoBinary("lt", t_iType, 13001)):
  t_kCategory = symbol("pin");
  break;
  default:
  callNamed("error", _this, lingoBinary("join", lingoBinary("joinPad", "Unknow item category for item number", t_iType), "!"), symbol("_AssetsLoadedCbk"))
  return;
  }

  var t_iCount = meProp(_me, "m_mp_iType_rOutput").count;
  for (var i = 1; i <= t_iCount; ++i) {
  t_iType = callMethod("getPropAt", meProp(_me, "m_mp_iType_rOutput"), i);
  var t_rImage = callMethod("getaProp", a_mp_iType_rOutput, t_iType);
  if ((lingoTruthy(callNamed("voidp", t_rImage)) ? 0 : 1)) {
  meProp(_me, "m_mp_iType_rOutput")[i] = t_rImage;
  }

  }

  meProp(_me, "m_mp_kCategory_mp_iType_rImage")[t_kCategory] = new LingoPropList([]);
  callMethod("_CheckIfReady", _this)
}

