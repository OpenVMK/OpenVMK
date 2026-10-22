// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / updateRanks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateRanks(_me: LingoMe) {
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.prizes");
  var t_rComponentPage = meProp(_me, "m_ar_components")["quest.prizes"];
  var t_ar_components = callMethod("GetComponents", t_rComponentPage);
  for (var i = 1; i <= lingoBinary("sub", t_ar_components.count, 1); ++i) {
  var t_rComponent = t_ar_components[i];
  callMethod("setText", callMethod("GetLayout", t_rComponent, 1), lingoBinary("join", lingoBinary("join", callNamed("rank2text", i), "\r"), callNamed("getText", "quest.prize")))
  }

  var t_rImg = callMethod("render", t_rComponentPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
}

