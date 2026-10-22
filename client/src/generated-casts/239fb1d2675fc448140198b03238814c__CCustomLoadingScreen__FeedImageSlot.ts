// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreen / FeedImageSlot

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FeedImageSlot(_me: LingoMe, _this: LingoValue, a_iSlot: LingoValue) {
  var t_rWnd = callNamed("getWindow", "room_custom_load_wnd");
  var t_mpSlotConf = meProp(_me, "m_arConf")[a_iSlot];
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_mpSlotConf, symbol("img")))) ? 0 : 1)) {
  callMethod("feedImage", callMethod("getElement", t_rWnd, lingoBinary("join", "loading.image", a_iSlot)), callNamed("getMember", t_mpSlotConf[symbol("img")]).image)
  if (callNamed("value", callMethod("getaProp", t_mpSlotConf, symbol("flip")))) {
  callMethod("flipH", callMethod("getElement", t_rWnd, lingoBinary("join", "loading.image", a_iSlot)))
  callMethod("render", callMethod("getElement", t_rWnd, lingoBinary("join", "loading.image", a_iSlot)))
  }

  } else {
  callMethod("hide", callMethod("getElement", t_rWnd, lingoBinary("join", "loading.image", a_iSlot)))
  }

}

