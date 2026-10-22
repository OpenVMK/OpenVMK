// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage2 / _SuggestNames

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SuggestNames(_me: LingoMe) {
  var t_ar_nameList = meProp(_me, "m_ar_AvatarData")["AvatarNames"];
  var t_sTxt = "";
  if (lingoBinary("gt", t_ar_nameList.count, 0)) {
  for (var i = 1; i <= t_ar_nameList.count; ++i) {
  t_sTxt = lingoBinary("join", lingoBinary("join", t_sTxt, "\t"), t_ar_nameList[i]);
  }

  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "reg.username.taken.hd")) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.taken.hd"), symbol("visible"), 1)
  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "reg.username.list.hd")) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.list.hd"), symbol("visible"), 1)
  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "reg.username.list")) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.list"), t_sTxt)
  }

}

