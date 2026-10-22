// d0e535313898676eb605277339b50f27.cct / CHiddenMickeyStatus / EventProcHMDetails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProcHMDetails(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var t_rWindow = callNamed("getWindow", meProp(_me, "m_sHiddenMickeyDetailWindowTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseDown"))) {
  switch (tElemID) {
case "close":
case "hm.ok.button":
case "hm.cancel.button":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sHiddenMickeyDetailWindowTitle"))
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), "help.explore.mickey")
  break;
case "hm.details":
  callMethod("click", meProp(_me, "m_pMickeyList"), tParm)
  callMethod("DrawHMDetailsList", _me)
  break;
  default:
  callNamed("put", tElemID)
  break;
  break;
  }

  }

}

