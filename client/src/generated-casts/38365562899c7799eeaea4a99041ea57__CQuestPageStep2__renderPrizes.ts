// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / renderPrizes

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function renderPrizes(_me: LingoMe) {
  var t_sElemName = "quest.prizes";
  var t_rComponentPage = meProp(_me, "m_ar_components")[t_sElemName];
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), t_sElemName);
  callMethod("feedImage", t_rClientElement, callMethod("render", t_rComponentPage))
  callMethod("updateCurrentCategory", _me)
}

