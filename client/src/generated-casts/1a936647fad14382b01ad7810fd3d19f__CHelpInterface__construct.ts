// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_windowTitle", "Help Window");
  setMeProp(_me, "m_currentView", "vmk_hlp_topics.window");
  setMeProp(_me, "m_pRadioButtons", undefined);
  setMeProp(_me, "m_pHelpMenu", undefined);
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _me), symbol("InitializeObject"))
  callNamed("registerMessage", symbol("open_help_page"), callMethod("getID", _me), symbol("openHelpPage"))
  callNamed("registerMessage", symbol("call_for_help_report"), callMethod("getID", _me), symbol("callForHelpReport"))
  setMeProp(_me, "m_rHelpField", undefined);
  setMeProp(_me, "m_bModal", 0);
  return 1;
}

