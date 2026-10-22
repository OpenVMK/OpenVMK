// d0e535313898676eb605277339b50f27.cct / CMagicMenu / _EventProcMagic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProcMagic(_me: LingoMe, _this: LingoValue, tEvent: LingoValue, tElemID: LingoValue, tParam: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "magics.grid":
  if (theProperty("doubleClick")) {
  callMethod("ShowMagicInfo", _this, tParam, 1)
  } else {
  callMethod("ShowMagicInfo", _this, tParam, 0)
  }

  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.chat.emotes")
  break;
case "close":
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  break;
  }

  } else {
  if (lingoBinary("and", lingoBinary("eq", tElemID, "magics.stop.button"), lingoBinary("eq", tEvent, symbol("mouseDown")))) {
  callMethod("_StopMagic", _this)
  }

  }

  return 1;
}

