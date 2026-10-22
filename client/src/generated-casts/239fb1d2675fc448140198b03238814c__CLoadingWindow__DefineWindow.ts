// 239fb1d2675fc448140198b03238814c.cct / CLoadingWindow / DefineWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DefineWindow(_me: LingoMe, _this: LingoValue, a_mp_Parameters: LingoValue) {
  if (callNamed("memberExists", "vmk_preloader.window")) {
  var t_sID = callNamed("getUniqueID");
  if (lingoBinary("gt", callMethod("findPos", a_mp_Parameters, symbol("modal")), 0)) {
  if (a_mp_Parameters.modal) {
  callNamed("createWindow", t_sID, "vmk_preloader.window", 0, 0, symbol("modal"))
  } else {
  callNamed("createWindow", t_sID, "vmk_preloader.window")
  }

  } else {
  callNamed("createWindow", t_sID, "vmk_preloader.window")
  }

  if (callNamed("windowExists", t_sID)) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", t_sID));
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("eventProcLoadingWindow"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("center", meProp(_me, "m_rWindow"))
  if (lingoBinary("gt", callMethod("findPos", a_mp_Parameters, symbol("client")), 0)) {
  setMeProp(_me, "m_objClient", callNamed("getObject", a_mp_Parameters.client));
  }

  if (lingoBinary("gt", callMethod("findPos", a_mp_Parameters, symbol("ButtonText")), 0)) {
  setMeProp(_me, "m_sButtonText", a_mp_Parameters.ButtonText);
  setThePropOf(callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloader.ok"), "pButtonText", meProp(_me, "m_sButtonText"));
  setThePropOf(callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloader.ok"), "pCachedImgs", new LingoPropList([]));
  callMethod("createButtonImg", callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloader.ok"), meProp(_me, "m_sButtonText"), symbol("up"))
  callMethod("changeState", callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloader.ok"), symbol("up"))
  }

  if (lingoBinary("gt", callMethod("findPos", a_mp_Parameters, symbol("headline")), 0)) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloader.hd"), a_mp_Parameters.headline)
  } else {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloader.hd"), "")
  }

  if (lingoBinary("gt", callMethod("findPos", a_mp_Parameters, symbol("infotext")), 0)) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloadfailed"), a_mp_Parameters.infotext)
  } else {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "roomqueue.preloadfailed"), "")
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
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "animation");
  if (callNamed("objectp", t_rElem)) {
  callMethod("show", t_rElem)
  var t_rSprite = callMethod("getProperty", t_rElem, symbol("sprite"));
  if (lingoBinary("gt", t_rSprite.spriteNum, 0)) {
  var t_vPos = callNamed("vector", t_rSprite.locH, t_rSprite.locV, t_rSprite.locZ);
  var t_rAnimationManager = callNamed("getObject", "AnimationManager");
  if (callNamed("objectp", t_rAnimationManager)) {
  callMethod("RemoveAnimation", t_rAnimationManager, "animation")
  callMethod("NewAnimation", t_rAnimationManager, t_vPos, "animation", "preloader.ani", symbol("sprite"))
  }

  }

  }

  }

  }

}

