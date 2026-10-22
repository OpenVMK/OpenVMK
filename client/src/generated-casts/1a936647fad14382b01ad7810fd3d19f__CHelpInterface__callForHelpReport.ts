// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / callForHelpReport

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function callForHelpReport(_me: LingoMe, t_sReportedAvatarName: LingoValue) {
  if ((lingoTruthy(callMethod("getComponent", _me).m_visible) ? 0 : 1)) {
  callMethod("showHideHelp", callMethod("getComponent", _me))
  }

  callMethod("changeView", _me, "vmk_hlp_askmods.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElem = callMethod("getElement", tWndObj, "hlp.harrasser.input");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setText", tElem, t_sReportedAvatarName)
  }

  }

}

