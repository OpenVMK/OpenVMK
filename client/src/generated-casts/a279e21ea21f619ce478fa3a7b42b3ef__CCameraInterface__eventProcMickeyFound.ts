// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraInterface / eventProcMickeyFound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcMickeyFound(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.camera")
  break;
case "hm.foundinfo.ok":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("hideCamera", _me)
  setMeProp(_me, "m_view", symbol("camera"));
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Camera", new LingoList([tEvent, tElemID, tParm])))
  callNamed("pass")
  }

  }

}

