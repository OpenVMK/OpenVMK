// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / openHelpPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function openHelpPage(_me: LingoMe, t_sHelpPage: LingoValue, t_bModal: LingoValue) {
  setMeProp(_me, "m_bModal", t_bModal);
  if ((lingoTruthy(callMethod("getComponent", _me).m_visible) ? 0 : 1)) {
  callMethod("showHideHelp", callMethod("getComponent", _me))
  }

  callMethod("inactivateAllCategories", _me.m_pHelpMenu)
  callMethod("searchNode", _me.m_pHelpMenu, t_sHelpPage)
  callMethod("changeView", _me, "vmk_hlp_topics.window", t_sHelpPage)
  var t_offset = callMethod("getCurrentOffset", _me.m_pHelpMenu);
  callMethod("UpdateScrollBar", _me, t_offset)
}

