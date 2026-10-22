// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / ShowHideColorChoosers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowHideColorChoosers(_me: LingoMe, _this: LingoValue, a_sPart: LingoValue, a_mpMySet: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_sElemName = lingoBinary("join", lingoBinary("join", "change.", a_sPart), ".color.");
  if (lingoBinary("eq", a_mpMySet[2].count, 1)) {
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, 1))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, 1)), symbol("visible"), 0)
  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, -float(1)))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, -float(1))), symbol("visible"), 0)
  }

  } else {
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, 1))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, 1)), symbol("visible"), 1)
  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, -float(1)))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, -float(1))), symbol("visible"), 1)
  }

  }

  }

}

