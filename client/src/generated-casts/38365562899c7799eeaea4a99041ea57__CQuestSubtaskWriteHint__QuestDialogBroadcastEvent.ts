// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskWriteHint / QuestDialogBroadcastEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestDialogBroadcastEvent(_me: LingoMe, t_iManagerID: LingoValue, t_ar_results: LingoValue) {
  switch (t_iManagerID) {
case "QuestDialogManagerAddPhoto":
  if (lingoBinary("gt", t_ar_results[symbol("photoId")], 0)) {
  setMeProp(_me, "m_iCurrentID", t_ar_results[symbol("photoId")]);
  callMethod("reDraw", _me)
  }

  break;
  default:
  callNamed("put", "Quest Write Hint: Unknown manager")
  }

}

