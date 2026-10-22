// vmk_central_handler.cct / CVMKCentralInterface / eventProcRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcRoom(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "VMK Central mouseDown", new LingoList([tEvent, tElemID, tParm])))
  if (lingoBinary("eq", tEvent, symbol("mouseDown"))) {
  switch (tElemID) {
case "vmk_quest_click":
case "vmk_quest_click_b":
  callMethod("showQuestWindow", _me, 1)
  break;
case "hidden_mickey":
case "central_1_cl":
  callMethod("showHiddenMickeyWindow", _me, 1)
  break;
case "camera_click":
  callMethod("cashRegisterClicked", callMethod("getHandler", _me))
  break;
case "herbie_click_area":
  callMethod("RiverAdClicked", callMethod("getHandler", _me))
  break;
  break;
  break;
  }

  }

}

