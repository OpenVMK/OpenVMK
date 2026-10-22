// 38365562899c7799eeaea4a99041ea57.cct / CQuestPage / AddContentFromXML

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddContentFromXML(_me: LingoMe, m_rWindow: LingoValue, m_ar_components: LingoValue, i_sDef: LingoValue) {
  var tDoc = callNamed("CreateXML", callNamed("getMember", i_sDef).text);
  callMethod("Search", tDoc, "TYPE", "CONTENT", 1)
  var t_sDefaultTarget = callMethod("GetParam", tDoc, "TARGET");
  var t_sDefaultDesc = callMethod("GetParam", tDoc, "DESC");
  for (var t_rChild of callMethod("GetNode", tDoc).child.toArray()) {
  if (lingoBinary("eq", t_rChild._type, "ITEM")) {
  callMethod("parseItem", _me, t_rChild, m_ar_components[t_sDefaultTarget], t_sDefaultDesc)
  }

  }

  var t_rClientElement = callMethod("getElement", m_rWindow, t_sDefaultTarget);
  if (lingoBinary("neq", t_rClientElement, 0)) {
  var t_rComponentsPage = callMethod("getaProp", m_ar_components, t_sDefaultTarget);
  if (callNamed("objectp", t_rComponentsPage)) {
  var t_rImg = callMethod("render", t_rComponentsPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

  }

}

