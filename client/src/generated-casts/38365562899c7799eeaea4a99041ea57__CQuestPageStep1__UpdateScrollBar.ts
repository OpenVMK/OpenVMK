// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / UpdateScrollBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateScrollBar(_me: LingoMe) {
  var t_offset = callMethod("getCurrentOffset", meProp(_me, "m_rComponentsPage"));
  var tScrollbar = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.scrollbar");
  callNamed("call", symbol("setScrollOffset"), tScrollbar, t_offset)
}

