// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / InstructionsEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InstructionsEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sInstructionsWndTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "button.next":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  setMeProp(_me, "m_iCurInstructionsPage", lingoBinary("add", meProp(_me, "m_iCurInstructionsPage"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iCurInstructionsPage"), meProp(_me, "m_ar_instructionspages").count)) {
  setMeProp(_me, "m_iCurInstructionsPage", meProp(_me, "m_ar_instructionspages").count);
  }

  callMethod("setText", callMethod("getElement", tWndObj, "pirates.instructions.text"), callNamed("getText", meProp(_me, "m_ar_instructionspages")[meProp(_me, "m_iCurInstructionsPage")]))
  callMethod("feedImage", callMethod("getElement", tWndObj, "pirates.instructions.image"), callNamed("member", callNamed("getText", meProp(_me, "m_ar_instructionsimage")[meProp(_me, "m_iCurInstructionsPage")])).image)
  callMethod("setText", callMethod("getElement", tWndObj, "pirates.dialog.hd"), callNamed("getText", meProp(_me, "m_ar_instructionstitles")[meProp(_me, "m_iCurInstructionsPage")]))
  callMethod("show", callMethod("getElement", tWndObj, "button.previous"))
  callMethod("show", callMethod("getElement", tWndObj, "pirates.previouspage"))
  if (lingoBinary("gte", meProp(_me, "m_iCurInstructionsPage"), meProp(_me, "m_ar_instructionspages").count)) {
  setMeProp(_me, "m_iCurInstructionsPage", meProp(_me, "m_ar_instructionspages").count);
  callMethod("hide", callMethod("getElement", tWndObj, "button.next"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.nextpage"))
  }

  break;
case "button.previous":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  setMeProp(_me, "m_iCurInstructionsPage", lingoBinary("sub", meProp(_me, "m_iCurInstructionsPage"), 1));
  if (lingoBinary("lt", meProp(_me, "m_iCurInstructionsPage"), 1)) {
  setMeProp(_me, "m_iCurInstructionsPage", 1);
  }

  callMethod("setText", callMethod("getElement", tWndObj, "pirates.instructions.text"), callNamed("getText", meProp(_me, "m_ar_instructionspages")[meProp(_me, "m_iCurInstructionsPage")]))
  callMethod("feedImage", callMethod("getElement", tWndObj, "pirates.instructions.image"), callNamed("member", callNamed("getText", meProp(_me, "m_ar_instructionsimage")[meProp(_me, "m_iCurInstructionsPage")])).image)
  callMethod("setText", callMethod("getElement", tWndObj, "pirates.dialog.hd"), callNamed("getText", meProp(_me, "m_ar_instructionstitles")[meProp(_me, "m_iCurInstructionsPage")]))
  callMethod("show", callMethod("getElement", tWndObj, "button.next"))
  callMethod("show", callMethod("getElement", tWndObj, "pirates.nextpage"))
  if (lingoBinary("lte", meProp(_me, "m_iCurInstructionsPage"), 1)) {
  setMeProp(_me, "m_iCurInstructionsPage", 1);
  callMethod("hide", callMethod("getElement", tWndObj, "button.previous"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.previouspage"))
  }

  break;
case "pirates.close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sInstructionsWndTitle"))
  break;
case "pirates.help":
  callNamed("executeMessage", symbol("open_help_page"), "help.games.pirates")
  break;
  default:
  callNamed("put", tElemID)
  }

  }

}

