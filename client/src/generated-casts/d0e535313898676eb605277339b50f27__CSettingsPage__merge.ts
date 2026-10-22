// d0e535313898676eb605277339b50f27.cct / CSettingsPage / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue) {
  setMeProp(_me, "m_rWindow", a_rWindow);
  callMethod("merge", meProp(_me, "m_rWindow"), "vmk_set_sound.window")
  var t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bMusic")))).image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "set.disablemusic"), t_Img)
  t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bFx")))).image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "set.disableeffects"), t_Img)
  t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bUi")))).image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "set.disableui"), t_Img)
  t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bTradeReq")))).image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "set.traderequests"), t_Img)
  t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bTutorial")))).image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "set.tutorials"), t_Img)
  callNamed("executeMessage", symbol("set_tutorials_state"), meProp(_me, "m_bTutorial"))
  var t_img2 = callNamed("image", 1, 225, 32);
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "set.volume"), t_img2)
  callMethod("SetVolume", _this)
  return 1;
}

