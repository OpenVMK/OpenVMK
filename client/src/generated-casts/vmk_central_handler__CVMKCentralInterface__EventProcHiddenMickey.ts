// vmk_central_handler.cct / CVMKCentralInterface / EventProcHiddenMickey

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProcHiddenMickey(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseDown"))) {
  switch (tElemID) {
case "close":
case "hm.ok.button":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sHiddenMickeyWndTitle"))
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), "help.explore.mickey")
  break;
case "hm.starthm.button":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("put", "Start the Hidden Mickey Quest")
  break;
case "hm.mickeydetail.button":
  callNamed("executeMessage", "ShowHMDetailWindow")
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "VMK Central Hidden Mickey window", new LingoList([tEvent, tElemID, tParm])))
  break;
  }

  }

}

