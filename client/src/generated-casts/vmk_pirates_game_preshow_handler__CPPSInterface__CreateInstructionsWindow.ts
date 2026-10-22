// vmk_pirates_game_preshow_handler.cct / CPPSInterface / CreateInstructionsWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateInstructionsWindow(_me: LingoMe) {
  callNamed("createWindow", meProp(_me, "m_sInstructionsWndTitle"), "vmk_pirates_simple.window")
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
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("InstructionsEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("center", tWndObj)
  callMethod("show", tWndObj)
}

