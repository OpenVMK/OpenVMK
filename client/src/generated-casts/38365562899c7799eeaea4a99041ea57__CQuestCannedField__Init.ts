// 38365562899c7799eeaea4a99041ea57.cct / CQuestCannedField / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, a_rWindow: LingoValue, a_sFieldName: LingoValue, t_bMultiple: LingoValue) {
  setMeProp(_me, "m_rWindow", a_rWindow);
  setMeProp(_me, "m_sElem", a_sFieldName);
  var t_rElem = callMethod("getElement", a_rWindow, a_sFieldName);
  if (callNamed("objectp", t_rElem)) {
  callNamed("put", lingoBinary("joinPad", "Canned type", t_bMultiple))
  if ((lingoTruthy(t_bMultiple) ? 0 : 1)) {
  }

  setMeProp(_me, "m_rField", callNamed("CreateCannedField", callMethod("getID", meProp(_me, "m_rWindow")), a_sFieldName));
  return meProp(_me, "m_rField");
  }

  return undefined;
}

