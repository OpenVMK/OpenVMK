// vmk_fireworks_preshow_handler.cct / CFWPSInterface / RenderInstructions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RenderInstructions(_me: LingoMe) {
  if (lingoBinary("and", callNamed("windowExists", meProp(_me, "m_sInstructionsWindowTitle")), lingoBinary("neq", meProp(_me, "m_iInstructionsCurrentPage"), 0))) {
  var tWnd = callNamed("getWindow", meProp(_me, "m_sInstructionsWindowTitle"));
  callMethod("setText", callMethod("getElement", tWnd, "fw.instructions.text"), callNamed("getText", meProp(_me, "m_ar_mp_instructions")[meProp(_me, "m_iInstructionsCurrentPage")].text))
  callMethod("feedImage", callMethod("getElement", tWnd, "fw.instructions.image"), callNamed("member", callNamed("getText", meProp(_me, "m_ar_mp_instructions")[meProp(_me, "m_iInstructionsCurrentPage")].image)).image)
  }

  if (lingoBinary("eq", meProp(_me, "m_iInstructionsCurrentPage"), 1)) {
  callMethod("show", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sInstructionsWindowTitle")), "fw.nextpage"))
  callMethod("hide", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sInstructionsWindowTitle")), "fw.previouspage"))
  } else {
  if (lingoBinary("eq", meProp(_me, "m_iInstructionsCurrentPage"), meProp(_me, "m_ar_mp_instructions").count)) {
  callMethod("hide", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sInstructionsWindowTitle")), "fw.nextpage"))
  callMethod("show", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sInstructionsWindowTitle")), "fw.previouspage"))
  } else {
  callMethod("show", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sInstructionsWindowTitle")), "fw.nextpage"))
  callMethod("show", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sInstructionsWindowTitle")), "fw.previouspage"))
  }

  }

}

