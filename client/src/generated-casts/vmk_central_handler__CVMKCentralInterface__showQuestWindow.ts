// vmk_central_handler.cct / CVMKCentralInterface / showQuestWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showQuestWindow(_me: LingoMe, a_true: LingoValue) {
  if (a_true) {
  if (callNamed("windowExists", meProp(_me, "m_sQuestWindowTitle"))) {
  callMethod("setProperty", callNamed("getWindow", meProp(_me, "m_sQuestWindowTitle")), symbol("visible"), 1)
  } else {
  if (callNamed("createWindow", meProp(_me, "m_sQuestWindowTitle"), "vmk_basic.window")) {
  if (callMethod("merge", callNamed("getWindow", meProp(_me, "m_sQuestWindowTitle")), "vmk_quest.window")) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sQuestWindowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("EventProcQuestWindow"), callMethod("getID", _me), symbol("mouseDown"))
  var tElem = callMethod("getElement", tWndObj, "basic.window.title");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setText", tElem, callNamed("getText", "quest.title"))
  }

  } else {
  callNamed("error", _me, "Failed to merge Quest window", symbol("showQuestWindow"))
  }

  } else {
  callNamed("error", _me, "Failed to create Quest window", symbol("showQuestWindow"))
  }

  }

  } else {
  callNamed("removeWindow", meProp(_me, "m_sQuestWindowTitle"))
  }

}

