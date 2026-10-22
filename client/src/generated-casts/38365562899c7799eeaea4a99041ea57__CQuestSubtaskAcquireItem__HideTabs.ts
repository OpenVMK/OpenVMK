// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAcquireItem / HideTabs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideTabs(_me: LingoMe) {
  var t_ar_tabs = new LingoList(["furniture", "pins", "clothes", "posters"]);
  for (var t_sTabName of t_ar_tabs.toArray()) {
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "tra.tab.", t_sTabName), ".active")))
  }

  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "tra.tab.", meProp(_me, "m_sSelectedTab")), ".active")))
}

