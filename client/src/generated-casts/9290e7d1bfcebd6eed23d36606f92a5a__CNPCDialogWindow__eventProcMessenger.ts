// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CNPCDialogWindow / eventProcMessenger

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcMessenger(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_wWindowTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  var passEvent = 1;
  var tObject = callMethod("get", callNamed("getObjectManager"), meProp(_me, "m_iClientID"));
  if (lingoBinary("eq", tObject, 0)) {
  passEvent = 0;
  } else {
  if (lingoBinary("eq", callMethod("getOne", callMethod("handlers", tObject), symbol("NPCdialogWindowEvent")), 0)) {
  passEvent = 0;
  }

  }

  switch (tElemID) {
case "close":
case "npc.greeting.close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  if (passEvent) {
  callNamed("call", symbol("NPCdialogWindowEvent"), tObject, meProp(_me, "m_sDialogTitle"), "close")
  }

  callNamed("RemoveNPCDialogWindow", meProp(_me, "m_sDialogTitle"))
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  if (passEvent) {
  callNamed("call", symbol("NPCdialogWindowEvent"), tObject, meProp(_me, "m_sDialogTitle"), "help")
  }

  callNamed("executeMessage", symbol("ui_help"))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", "[NPC Dialog Window] Uncaught #mouseUp: ", tElemID), tParm), callMethod("getElement", tWndObj, tElemID)))
  break;
  }

  }

}

