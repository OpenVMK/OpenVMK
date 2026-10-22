// vmk_kelloggs_pirate_handler.cct / KelloggsPirateExtensionInterface / showKelloggsWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showKelloggsWindow(_me: LingoMe, a_true: LingoValue) {
  if (a_true) {
  if (lingoBinary("neq", callNamed("getWindow", meProp(_me, "m_sKelloggsWindowTitle")), 0)) {
  callMethod("setProperty", callNamed("getWindow", meProp(_me, "m_sKelloggsWindowTitle")), symbol("visible"), 1)
  } else {
  if (callNamed("createWindow", meProp(_me, "m_sKelloggsWindowTitle"), "vmk_basic.window")) {
  if (callMethod("merge", callNamed("getWindow", meProp(_me, "m_sKelloggsWindowTitle")), "vmk_kelloqgs_promo.window")) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sKelloggsWindowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("EventProcKelloggsWindow"), callMethod("getID", _me), symbol("mouseUp"))
  var tElem = callMethod("getElement", tWndObj, "basic.window.title");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setText", tElem, callNamed("getText", "kelloggs.title"))
  }

  } else {
  callNamed("error", _me, "Failed to merge Kelloggs window", symbol("showKelloggsWindow"))
  }

  } else {
  callNamed("error", _me, "Failed to create Kelloggs window", symbol("showKelloggsWindow"))
  }

  }

  } else {
  callNamed("removeWindow", meProp(_me, "m_sKelloggsWindowTitle"))
  }

}

