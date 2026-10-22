// vmk_fireworks_preshow_handler.cct / CFWPSInterface / eventProcInstructionsWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcInstructionsWindow(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "fw.previouspage":
  callNamed("executeMessage", "PlayInterfaceSound", "fireworks-UI-2")
  if (lingoBinary("gt", lingoBinary("sub", meProp(_me, "m_iInstructionsCurrentPage"), 1), 0)) {
  setMeProp(_me, "m_iInstructionsCurrentPage", lingoBinary("sub", meProp(_me, "m_iInstructionsCurrentPage"), 1));
  callMethod("RenderInstructions", _me)
  }

  break;
case "fw.nextpage":
  callNamed("executeMessage", "PlayInterfaceSound", "fireworks-UI-2")
  if (lingoBinary("lte", lingoBinary("add", meProp(_me, "m_iInstructionsCurrentPage"), 1), meProp(_me, "m_ar_mp_instructions").count)) {
  setMeProp(_me, "m_iInstructionsCurrentPage", lingoBinary("add", meProp(_me, "m_iInstructionsCurrentPage"), 1));
  callMethod("RenderInstructions", _me)
  }

  break;
case "fw.close":
  callNamed("executeMessage", "PlayInterfaceSound", "fireworks-UI-1")
  callNamed("removeWindow", meProp(_me, "m_sInstructionsWindowTitle"))
  break;
  }

  }

}

