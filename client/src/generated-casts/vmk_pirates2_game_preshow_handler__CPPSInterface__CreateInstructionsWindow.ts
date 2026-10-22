// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / CreateInstructionsWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateInstructionsWindow(_me: LingoMe) {
  callNamed("createWindow", meProp(_me, "m_sInstructionsWndTitle"), "vmk_pirates_window.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sInstructionsWndTitle"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_pirates_instructions.window")) ? 0 : 1)) {
  callNamed("error", _me, "Unable to merge instructions dialog", symbol("construct"))
  }

  } else {
  return callNamed("error", _me, "Unable to create instructions dialog", symbol("construct"));
  }

  callMethod("setText", callMethod("getElement", tWndObj, "pirates.dialog.hd"), callNamed("getText", "pirates.instructions.window.title"))
  callMethod("setText", callMethod("getElement", tWndObj, "pirates.instructions.text"), callNamed("getText", meProp(_me, "m_ar_instructionspages")[meProp(_me, "m_iCurInstructionsPage")]))
  callMethod("feedImage", callMethod("getElement", tWndObj, "pirates.instructions.image"), callNamed("member", callNamed("getText", meProp(_me, "m_ar_instructionsimage")[meProp(_me, "m_iCurInstructionsPage")])).image)
  callMethod("setText", callMethod("getElement", tWndObj, "pirates.dialog.hd"), callNamed("getText", meProp(_me, "m_ar_instructionstitles")[meProp(_me, "m_iCurInstructionsPage")]))
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("InstructionsEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("center", tWndObj)
  callMethod("show", tWndObj)
  if (lingoBinary("lte", meProp(_me, "m_iCurInstructionsPage"), 1)) {
  setMeProp(_me, "m_iCurInstructionsPage", 1);
  callMethod("hide", callMethod("getElement", tWndObj, "button.previous"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.previouspage"))
  }

  if (lingoBinary("gte", meProp(_me, "m_iCurInstructionsPage"), meProp(_me, "m_ar_instructionspages").count)) {
  setMeProp(_me, "m_iCurInstructionsPage", meProp(_me, "m_ar_instructionspages").count);
  callMethod("hide", callMethod("getElement", tWndObj, "button.next"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.nextpage"))
  }

}

