// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / ShowHideClothesChoosers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowHideClothesChoosers(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_mp_Sets = callNamed("getVariableValue", "SetContents");
  if (callNamed("listp", meProp(_me, "m_ar_availableSets"))) {
  for (var i = 1; i <= meProp(_me, "m_ar_availableSets").count; ++i) {
  var t_sID = callMethod("getPropAt", meProp(_me, "m_ar_availableSets"), i);
  var t_sElemName = lingoBinary("join", lingoBinary("join", "change.", t_sID), ".");
  if (lingoBinary("lt", meProp(_me, "m_ar_availableSets")[i].count, 2)) {
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, 1))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, 1)), symbol("visible"), 0)
  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, -float(1)))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, -float(1))), symbol("visible"), 0)
  }

  continue;
  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, 1))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, 1)), symbol("visible"), 1)
  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, -float(1)))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElemName, -float(1))), symbol("visible"), 1)
  }

  }

  if (lingoBinary("eq", callMethod("findPos", meProp(_me, "m_ar_availableSets"), "ht"), undefined)) {
  var t_sElmName = "change.ht.";
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElmName, 1))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElmName, 1)), symbol("visible"), 0)
  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElmName, -float(1)))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", t_sElmName, -float(1))), symbol("visible"), 0)
  }

  }

  }

  }

}

