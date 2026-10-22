// 38365562899c7799eeaea4a99041ea57.cct / CQuestStartDataContainer / QuestDialogBroadcastEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestDialogBroadcastEvent(_me: LingoMe, t_iManagerID: LingoValue, t_ar_results: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "QuestInfo.Start.Container->BroadCastEvent results:", t_ar_results))
}

