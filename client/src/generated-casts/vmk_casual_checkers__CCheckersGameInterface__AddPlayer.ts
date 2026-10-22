// vmk_casual_checkers.cct / CCheckersGameInterface / AddPlayer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddPlayer(_me: LingoMe, _this: LingoValue, a_iAvatar: LingoValue, a_sName: LingoValue, a_iIndex: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_iPlayer = a_iIndex;
  if (lingoBinary("eq", a_sName, callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  setMeProp(_me, "m_iOwnPlayer", t_iPlayer);
  }

  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", "player", t_iPlayer));
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, a_sName)
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "player", t_iPlayer), ".level"));
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, "")
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "player", t_iPlayer), ".score"));
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, "")
  }

  for (var i = 1; i <= 12; ++i) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", lingoBinary("join", "player", t_iPlayer), ".piece"), i)), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", lingoBinary("join", "player", t_iPlayer), ".piece"), i)), symbol("blend"), 100)
  }

  }

}

