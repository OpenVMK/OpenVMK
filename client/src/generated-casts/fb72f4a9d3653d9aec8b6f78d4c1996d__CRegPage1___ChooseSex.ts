// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage1 / _ChooseSex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ChooseSex(_me: LingoMe, _this: LingoValue, a_iSex: LingoValue) {
  if (lingoBinary("eq", a_iSex, 0)) {
  a_iSex = "M";
  } else {
  a_iSex = "F";
  }

  if (lingoBinary("eq", meProp(_me, "m_sSex"), a_iSex)) {
  return 1;
  }

  if (lingoBinary("and", callMethod("elementExists", meProp(_me, "m_rWindow"), "reg.boy"), callMethod("elementExists", meProp(_me, "m_rWindow"), "reg.girl"))) {
  switch (a_iSex) {
case "M":
  setMeProp(_me, "m_bBoyState", (lingoTruthy(meProp(_me, "m_bBoyState")) ? 0 : 1));
  setMeProp(_me, "m_bGirlState", 0);
  var t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bBoyState")))).image;
  if ((lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1)) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.boy"), t_Img)
  }

  var t_img2 = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bGirlState")))).image;
  if ((lingoTruthy(callNamed("voidp", t_img2)) ? 0 : 1)) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.girl"), t_img2)
  }

  setMeProp(_me, "m_sSex", "M");
  callMethod("parseAvailableSets", _this)
  break;
case "F":
  setMeProp(_me, "m_bGirlState", (lingoTruthy(meProp(_me, "m_bGirlState")) ? 0 : 1));
  setMeProp(_me, "m_bBoyState", 0);
  t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bGirlState")))).image;
  if ((lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1)) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.girl"), t_Img)
  }

  t_img2 = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bBoyState")))).image;
  if ((lingoTruthy(callNamed("voidp", t_img2)) ? 0 : 1)) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.boy"), t_img2)
  }

  setMeProp(_me, "m_sSex", "F");
  callMethod("parseAvailableSets", _this)
  break;
  }

  }

}

