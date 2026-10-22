// vmk_pirates_minigame.cct / CPiratesMessageBar / setAmmoindicator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAmmoindicator(_me: LingoMe, a_iAmmo: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  switch (a_iAmmo) {
case 0:
  callMethod("hide", callMethod("getElement", tWndObj, "ammo1"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo2"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo3"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo4"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo5"))
  break;
case 1:
  callMethod("show", callMethod("getElement", tWndObj, "ammo1"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo2"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo3"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo4"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo5"))
  break;
case 2:
  callMethod("show", callMethod("getElement", tWndObj, "ammo1"))
  callMethod("show", callMethod("getElement", tWndObj, "ammo2"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo3"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo4"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo5"))
  break;
case 3:
  callMethod("show", callMethod("getElement", tWndObj, "ammo1"))
  callMethod("show", callMethod("getElement", tWndObj, "ammo2"))
  callMethod("show", callMethod("getElement", tWndObj, "ammo3"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo4"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo5"))
  break;
case 4:
  callMethod("show", callMethod("getElement", tWndObj, "ammo1"))
  callMethod("show", callMethod("getElement", tWndObj, "ammo2"))
  callMethod("show", callMethod("getElement", tWndObj, "ammo3"))
  callMethod("show", callMethod("getElement", tWndObj, "ammo4"))
  callMethod("hide", callMethod("getElement", tWndObj, "ammo5"))
  break;
case 5:
  callMethod("show", callMethod("getElement", tWndObj, "ammo1"))
  callMethod("show", callMethod("getElement", tWndObj, "ammo2"))
  callMethod("show", callMethod("getElement", tWndObj, "ammo3"))
  callMethod("show", callMethod("getElement", tWndObj, "ammo4"))
  callMethod("show", callMethod("getElement", tWndObj, "ammo5"))
  break;
  }

  }

}

