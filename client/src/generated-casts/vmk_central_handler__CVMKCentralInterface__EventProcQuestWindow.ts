// vmk_central_handler.cct / CVMKCentralInterface / EventProcQuestWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProcQuestWindow(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseDown"))) {
  switch (tElemID) {
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sQuestWindowTitle"))
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), "help.quests.central")
  break;
case "quest.vmksite":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  var t_sURL = callNamed("getText", "quest.vmksite.url");
  if (lingoBinary("eq", t_sURL, 0)) {
  } else {
  callNamed("gotoNetPage", t_sURL, "_new")
  }

  break;
  }

  }

}

