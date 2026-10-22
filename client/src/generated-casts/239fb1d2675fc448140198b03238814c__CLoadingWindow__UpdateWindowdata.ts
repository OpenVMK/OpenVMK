// 239fb1d2675fc448140198b03238814c.cct / CLoadingWindow / UpdateWindowdata

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateWindowdata(_me: LingoMe, _this: LingoValue, a_mp_Parameters: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("gt", callMethod("findPos", a_mp_Parameters, symbol("headline")), 0)) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloader.hd"), a_mp_Parameters.headline)
  }

  if (lingoBinary("gt", callMethod("findPos", a_mp_Parameters, symbol("infotext")), 0)) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloadfailed"), a_mp_Parameters.infotext)
  }

  if (lingoBinary("gt", callMethod("findPos", a_mp_Parameters, symbol("showbutton")), 0)) {
  var t_bVisibe = a_mp_Parameters.showbutton;
  } else {
  t_bVisibe = 0;
  }

  if (lingoBinary("gt", callMethod("findPos", a_mp_Parameters, symbol("soundloop")), 0)) {
  setMeProp(_me, "m_sSoundName", a_mp_Parameters.soundloop);
  callMethod("EnableLoadingSound", _this, meProp(_me, "m_sSoundName"))
  }

  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloader.ok"), symbol("visible"), t_bVisibe)
  if (lingoBinary("gt", callMethod("findPos", a_mp_Parameters, symbol("ButtonText")), 0)) {
  setMeProp(_me, "m_sButtonText", a_mp_Parameters.ButtonText);
  setThePropOf(callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloader.ok"), "pButtonText", meProp(_me, "m_sButtonText"));
  setThePropOf(callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloader.ok"), "pCachedImgs", new LingoPropList([]));
  callMethod("createButtonImg", callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloader.ok"), meProp(_me, "m_sButtonText"), symbol("up"))
  callMethod("changeState", callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloader.ok"), symbol("up"))
  }

  }

}

