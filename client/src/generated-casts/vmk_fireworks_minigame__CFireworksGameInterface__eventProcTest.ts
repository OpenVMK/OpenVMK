// vmk_fireworks_minigame.cct / CFireworksGameInterface / eventProcTest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcTest(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "fw.selectarea":
  var tOfs = lingoBinary("div", tParm.locH, meProp(_me, "m_iIconSpacing"));
  if (lingoBinary("lte", tOfs, meProp(_me, "m_ar_mp_selector").count)) {
  setMeProp(_me, "m_iCurrentSelection", tOfs);
  setMeProp(_me, "m_sCurrentSelection", meProp(_me, "m_ar_mp_selector")[tOfs].name);
  callMethod("PlaceSelector", _me)
  }

  break;
case "fw.exitgame.button":
  if ((lingoTruthy(callNamed("DialogWindowExists", "fw_exit")) ? 0 : 1)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "fw_exit", 2);
  callMethod("show", t)
  callMethod("setText", t, "Do you want to exit?", "Fireworks Game", "No", "Yes")
  }

  break;
case "fw.explode.button":
  callMethod("activateExplodeAll", _me, 1)
  callNamed("createTimeout", "ExplodeAllTimeout", lingoBinary("mul", 10, 1000), symbol("activateExplodeAll"), callMethod("getID", _me), undefined, 1)
  callMethod("ExplodeVisibleFireworks", _me)
  break;
case "controlswitch":
  if (meProp(_me, "m_prepared")) {
  callMethod("toggleControlMethod", _me)
  }

  break;
  }

  }

}

