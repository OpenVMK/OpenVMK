// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMinigame / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Update task: Minigame", t_ar_data))
  var t_rComponents = meProp(_me, "m_ar_components")["quest.gamelist"];
  callMethod("setActive", t_rComponents, t_ar_data[symbol("GameID")])
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.gamelist");
  var t_rImg = callMethod("render", t_rComponents);
  callMethod("feedImage", t_rClientElement, t_rImg)
  callMethod("updateDefaults", _me)
  callMethod("setAmount", _me, t_ar_data[symbol("score")])
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("taskType")] = t_ar_data[symbol("taskType")];
  callMethod("appendSubResult", t_rManager, t_ar_results)
  }

}

