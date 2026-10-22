// d0e535313898676eb605277339b50f27.cct / CSettingsPage / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  switch (a_sElem) {
case "set.applysound.button":
  callMethod("GetVolume", _this)
  callMethod("_SendChanges", _this)
  break;
case "set.sounds.cancel":
  callNamed("executeMessage", "close_Settings")
  break;
case "set.disablemusic":
  callMethod("_ChangeSettings", _this, "music")
  break;
case "set.disableeffects":
  callMethod("_ChangeSettings", _this, "fx")
  break;
case "set.disableui":
  callMethod("_ChangeSettings", _this, "ui")
  break;
case "set.traderequests":
  callMethod("_ChangeSettings", _this, "traderequests")
  break;
case "set.tutorials":
  callMethod("_ChangeSettings", _this, "tutorials")
  break;
  }

  }

}

