// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / changeView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeView(_me: LingoMe, a_sView: LingoValue) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rWindow"))) ? 0 : 1)) {
  callNamed("put", "ERROR, initializing messenger, init in wrong order")
  return;
  }

  if ((lingoTruthy(meProp(_me, "m_bVisible")) ? 0 : 1)) {
  if (callNamed("objectp", meProp(_me, "m_rCurrentView"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurrentView")))
  setMeProp(_me, "m_rCurrentView", undefined);
  }

  callNamed("put", lingoBinary("joinPad", "Change to new view when messenger is opened!", meProp(_me, "m_sCurrentView")))
  setMeProp(_me, "m_sCurrentView", a_sView);
  } else {
  if (callNamed("objectp", meProp(_me, "m_rCurrentView"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurrentView")))
  setMeProp(_me, "m_rCurrentView", undefined);
  }

  var t_sCls = lingoBinary("join", "vmk.messenger.", a_sView);
  setMeProp(_me, "m_rCurrentView", callNamed("createObject", a_sView, callNamed("GetClsVariable", t_sCls)));
  callMethod("merge", meProp(_me, "m_rCurrentView"), meProp(_me, "m_rWindow"))
  callMethod("toggleTabs", _me, a_sView)
  setMeProp(_me, "m_sCurrentView", a_sView);
  }

}

