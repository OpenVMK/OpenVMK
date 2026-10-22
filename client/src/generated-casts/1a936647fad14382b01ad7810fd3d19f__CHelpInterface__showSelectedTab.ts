// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / showSelectedTab

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showSelectedTab(_me: LingoMe, t_tab: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  switch (t_tab) {
case "topics":
  callNamed("removeUpdate", callMethod("getID", _me))
  callMethod("show", callMethod("getElement", tWndObj, "hlp.tab.topics.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "hlp.tab.askmods.active"))
  break;
case "askmods":
  callMethod("hide", callMethod("getElement", tWndObj, "hlp.tab.topics.active"))
  callMethod("show", callMethod("getElement", tWndObj, "hlp.tab.askmods.active"))
  if (lingoBinary("eq", theProperty("environment").productVersion, "10.2")) {
  if (lingoBinary("eq", theProperty("environment").productBuildVersion, "21")) {
  callNamed("receiveUpdate", callMethod("getID", _me))
  }

  }

  break;
  }

}

