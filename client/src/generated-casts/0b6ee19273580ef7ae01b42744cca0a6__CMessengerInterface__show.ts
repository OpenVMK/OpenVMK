// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / show

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function show(_me: LingoMe) {
  setMeProp(_me, "m_bVisible", 1);
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rWindow"))) ? 0 : 1)) {
  callMethod("Init", _me)
  }

  callMethod("show", meProp(_me, "m_rWindow"))
  if (callNamed("objectp", meProp(_me, "m_rCurrentView"))) {
  var t_sView = callMethod("getID", meProp(_me, "m_rCurrentView"));
  if (lingoBinary("neq", t_sView, meProp(_me, "m_sCurrentView"))) {
  callMethod("changeView", _me, meProp(_me, "m_sCurrentView"))
  } else {
  switch (t_sView) {
case "friendlist":
case "friendinfo":
case "friendrequest":
  callMethod("startPolling", callMethod("getComponent", _me))
  break;
  default:
  callMethod("stopPolling", callMethod("getComponent", _me))
  break;
  break;
  }

  }

  } else {
  callMethod("changeView", _me, meProp(_me, "m_sCurrentView"))
  }

  callMethod("updateContent", meProp(_me, "m_rCurrentView"))
  callMethod("setIconPulse", _me, 0)
}

