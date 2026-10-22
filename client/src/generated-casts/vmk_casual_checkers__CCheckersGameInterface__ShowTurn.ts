// vmk_casual_checkers.cct / CCheckersGameInterface / ShowTurn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowTurn(_me: LingoMe, _this: LingoValue, a_iAvatarRef: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var i = 1;
  while (1) {
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "player", i), ".hilite"));
  if (callNamed("objectp", t_rElem)) {
  callMethod("setProperty", t_rElem, symbol("blend"), 0)
  i = lingoBinary("add", i, 1);
  continue;
  }

  break;
  }

  var t_iPlayer = callMethod("GetPlayerIndexByAvatarRef", meProp(_me, "m_rEngine"), a_iAvatarRef);
  var t_bMyTurn = lingoBinary("eq", meProp(_me, "m_iOwnPlayer"), t_iPlayer);
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "quitturn"), symbol("visible"), 0)
  if (lingoBinary("gt", t_iPlayer, 0)) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "player", t_iPlayer), ".hilite")), symbol("blend"), 100)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "player", t_iPlayer), ".giveup")), symbol("visible"), t_bMyTurn)
  }

  }

  callMethod("ShowPosition", callNamed("getObject", meProp(_me, "m_sIndicator")), undefined, undefined)
}

