// vmk_hm_lobby_handler.cct / CHMLobbyInterface / InstructionsEventProc

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
case "pirates.nextpage":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  setMeProp(_me, "m_iCurInstructionsPage", lingoBinary("add", meProp(_me, "m_iCurInstructionsPage"), 1));
  callMethod("show", callMethod("getElement", tWndObj, "button.previous"))
  callMethod("show", callMethod("getElement", tWndObj, "pirates.previouspage"))
  if (lingoBinary("gte", meProp(_me, "m_iCurInstructionsPage"), meProp(_me, "m_ar_instructionspages").count)) {
  setMeProp(_me, "m_iCurInstructionsPage", meProp(_me, "m_ar_instructionspages").count);
  callMethod("hide", callMethod("getElement", tWndObj, "button.next"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.nextpage"))
  }

  var t_sTitle = lingoBinary("joinPad", lingoBinary("joinPad", callNamed("getText", "hm.instructions.window.title"), "-"), callNamed("getText", lingoBinary("join", "hm.instructions.title.page.", meProp(_me, "m_iCurInstructionsPage"))));
  callMethod("fixAntialisingTextElement", _me, meProp(_me, "m_sInstructionsWndTitle"), "hm.dialog.hd", 1, t_sTitle)
  callMethod("setText", callMethod("getElement", tWndObj, "hm.instructions.text"), callNamed("getText", meProp(_me, "m_ar_instructionspages")[meProp(_me, "m_iCurInstructionsPage")]))
  callMethod("feedImage", callMethod("getElement", tWndObj, "hm.instructions.image"), callNamed("member", callNamed("getText", meProp(_me, "m_ar_instructionsimage")[meProp(_me, "m_iCurInstructionsPage")])).image)
  break;
case "button.previous":
case "pirates.previouspage":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  setMeProp(_me, "m_iCurInstructionsPage", lingoBinary("sub", meProp(_me, "m_iCurInstructionsPage"), 1));
  callMethod("show", callMethod("getElement", tWndObj, "button.next"))
  callMethod("show", callMethod("getElement", tWndObj, "pirates.nextpage"))
  if (lingoBinary("lte", meProp(_me, "m_iCurInstructionsPage"), 1)) {
  setMeProp(_me, "m_iCurInstructionsPage", 1);
  callMethod("hide", callMethod("getElement", tWndObj, "button.previous"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.previouspage"))
  }

  t_sTitle = lingoBinary("joinPad", lingoBinary("joinPad", callNamed("getText", "hm.instructions.window.title"), "-"), callNamed("getText", lingoBinary("join", "hm.instructions.title.page.", meProp(_me, "m_iCurInstructionsPage"))));
  callMethod("fixAntialisingTextElement", _me, meProp(_me, "m_sInstructionsWndTitle"), "hm.dialog.hd", 1, t_sTitle)
  callMethod("setText", callMethod("getElement", tWndObj, "hm.instructions.text"), callNamed("getText", meProp(_me, "m_ar_instructionspages")[meProp(_me, "m_iCurInstructionsPage")]))
  callMethod("feedImage", callMethod("getElement", tWndObj, "hm.instructions.image"), callNamed("member", callNamed("getText", meProp(_me, "m_ar_instructionsimage")[meProp(_me, "m_iCurInstructionsPage")])).image)
  break;
case "hm.close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sInstructionsWndTitle"))
  break;
case "hm.help":
  callNamed("executeMessage", symbol("open_help_page"), "help.games.hauntedmansion")
  break;
  break;
  break;
  }

  }

}

