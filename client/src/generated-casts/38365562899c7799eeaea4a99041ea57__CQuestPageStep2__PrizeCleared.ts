// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / PrizeCleared

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrizeCleared(_me: LingoMe, t_ar_data: LingoValue) {
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.prizes");
  var t_rComponentPage = meProp(_me, "m_ar_components")["quest.prizes"];
  callMethod("deleteComponentAt", t_rComponentPage, lingoBinary("add", t_ar_data[symbol("rank")], 1))
  var t_rImg = callMethod("render", t_rComponentPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
  callMethod("updateCurrentCategory", _me)
}

