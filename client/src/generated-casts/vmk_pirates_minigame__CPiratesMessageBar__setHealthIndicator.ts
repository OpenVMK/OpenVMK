// vmk_pirates_minigame.cct / CPiratesMessageBar / setHealthIndicator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setHealthIndicator(_me: LingoMe, a_iHealth: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  switch (a_iHealth) {
case 0:
  callMethod("hide", callMethod("getElement", tWndObj, "health1"))
  callMethod("hide", callMethod("getElement", tWndObj, "health2"))
  callMethod("hide", callMethod("getElement", tWndObj, "health3"))
  callMethod("hide", callMethod("getElement", tWndObj, "health4"))
  callMethod("hide", callMethod("getElement", tWndObj, "health5"))
  break;
case 1:
  callMethod("show", callMethod("getElement", tWndObj, "health1"))
  callMethod("hide", callMethod("getElement", tWndObj, "health2"))
  callMethod("hide", callMethod("getElement", tWndObj, "health3"))
  callMethod("hide", callMethod("getElement", tWndObj, "health4"))
  callMethod("hide", callMethod("getElement", tWndObj, "health5"))
  break;
case 2:
  callMethod("show", callMethod("getElement", tWndObj, "health1"))
  callMethod("show", callMethod("getElement", tWndObj, "health2"))
  callMethod("hide", callMethod("getElement", tWndObj, "health3"))
  callMethod("hide", callMethod("getElement", tWndObj, "health4"))
  callMethod("hide", callMethod("getElement", tWndObj, "health5"))
  break;
case 3:
  callMethod("show", callMethod("getElement", tWndObj, "health1"))
  callMethod("show", callMethod("getElement", tWndObj, "health2"))
  callMethod("show", callMethod("getElement", tWndObj, "health3"))
  callMethod("hide", callMethod("getElement", tWndObj, "health4"))
  callMethod("hide", callMethod("getElement", tWndObj, "health5"))
  break;
case 4:
  callMethod("show", callMethod("getElement", tWndObj, "health1"))
  callMethod("show", callMethod("getElement", tWndObj, "health2"))
  callMethod("show", callMethod("getElement", tWndObj, "health3"))
  callMethod("show", callMethod("getElement", tWndObj, "health4"))
  callMethod("hide", callMethod("getElement", tWndObj, "health5"))
  break;
case 5:
  callMethod("show", callMethod("getElement", tWndObj, "health1"))
  callMethod("show", callMethod("getElement", tWndObj, "health2"))
  callMethod("show", callMethod("getElement", tWndObj, "health3"))
  callMethod("show", callMethod("getElement", tWndObj, "health4"))
  callMethod("show", callMethod("getElement", tWndObj, "health5"))
  break;
  }

  }

}

