// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage1 / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue) {
  callNamed("executeMessage", symbol("login_hide"))
  setMeProp(_me, "m_rWindow", a_rWindow);
  callMethod("merge", meProp(_me, "m_rWindow"), "vmk_reg_step1.window")
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "reg.boy")) {
  var t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bBoyState")))).image;
  if ((lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1)) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.boy"), t_Img)
  }

  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "reg.girl")) {
  var t_img2 = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bGirlState")))).image;
  if ((lingoTruthy(callNamed("voidp", t_img2)) ? 0 : 1)) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.girl"), t_img2)
  }

  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "reg.username.input")) {
  callMethod("setFocus", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.input"), 1)
  }

  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "set.nohats.info"), symbol("blend"), 0)
  callMethod("GenerateNames", _this)
  return 1;
}

