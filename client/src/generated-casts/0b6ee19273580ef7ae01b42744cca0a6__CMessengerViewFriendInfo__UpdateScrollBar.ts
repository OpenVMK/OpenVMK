// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewFriendInfo / UpdateScrollBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateScrollBar(_me: LingoMe) {
  var tScrollbar = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.scrollbar");
  var t_offset = callMethod("getFriendOffset", meProp(_me, "m_rAddressbookList"));
  callNamed("call", symbol("setScrollOffset"), tScrollbar, t_offset)
}

