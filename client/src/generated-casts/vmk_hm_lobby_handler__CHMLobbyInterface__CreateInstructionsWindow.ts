// vmk_hm_lobby_handler.cct / CHMLobbyInterface / CreateInstructionsWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateInstructionsWindow(_me: LingoMe) {
  if (callNamed("createWindow", meProp(_me, "m_sInstructionsWndTitle"), "vmk_hm_simple.window")) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sInstructionsWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_hm_instructions.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Unable to merge instructions dialog", symbol("construct"));
  }

  } else {
  return callNamed("error", _me, "Unable to create instructions dialog", symbol("construct"));
  }

  var t_sTitle = lingoBinary("joinPad", lingoBinary("joinPad", callNamed("getText", "hm.instructions.window.title"), "-"), callNamed("getText", "hm.instructions.title.page.1"));
  callMethod("fixAntialisingTextElement", _me, meProp(_me, "m_sInstructionsWndTitle"), "hm.dialog.hd", 1, t_sTitle)
  callMethod("setText", callMethod("getElement", tWndObj, "hm.instructions.text"), callNamed("getText", meProp(_me, "m_ar_instructionspages")[meProp(_me, "m_iCurInstructionsPage")]))
  callMethod("feedImage", callMethod("getElement", tWndObj, "hm.instructions.image"), callNamed("member", callNamed("getText", meProp(_me, "m_ar_instructionsimage")[meProp(_me, "m_iCurInstructionsPage")])).image)
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("InstructionsEventProc"), callMethod("getID", _me), symbol("mouseUp"))
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

  callMethod("center", tWndObj)
  callMethod("show", tWndObj)
  } else {
  return callNamed("error", _me, "Unable to create Haunted Mansion Instructions window", symbol("construct"));
  }

}

