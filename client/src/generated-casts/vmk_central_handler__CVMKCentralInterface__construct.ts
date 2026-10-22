// vmk_central_handler.cct / CVMKCentralInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sHiddenMickeyWndTitle", "Hidden Mickey Central");
  setMeProp(_me, "m_sHiddenMickeyDetailWindowTitle", "Hidden Mickey Details");
  setMeProp(_me, "m_sQuestWindowTitle", "VMK Central Quest Window");
  setMeProp(_me, "m_sHerbieWindowTitle", "HerbieWindow");
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initRoom"))
  setMeProp(_me, "m_roomEventSprites", new LingoList([]));
  setMeProp(_me, "m_pMickeyList", undefined);
  var t_HiddenMickeyQuest = callNamed("getThread", "HiddenMickeyQuest");
  if (lingoBinary("neq", t_HiddenMickeyQuest, 0)) {
  callMethod("RequestHiddenMickeyStatus", callMethod("getHandler", t_HiddenMickeyQuest))
  }

  callNamed("registerMessage", symbol("HiddenMickeyQuestStatus"), callMethod("getID", _me), symbol("setMickeyQuestButtonState"))
  return 1;
}

