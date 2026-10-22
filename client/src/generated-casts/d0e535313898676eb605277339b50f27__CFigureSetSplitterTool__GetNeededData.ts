// d0e535313898676eb605277339b50f27.cct / CFigureSetSplitterTool / GetNeededData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetNeededData(_me: LingoMe) {
  setMeProp(_me, "m_mp_SetsToSplit", new LingoPropList([]));
  var t_mp_AllSets = callNamed("getVariable", "AllAvailableSets");
  if (callNamed("listp", t_mp_AllSets)) {
  for (var i = 1; i <= t_mp_AllSets.count; ++i) {
  if (lingoBinary("and", lingoBinary("neq", callMethod("getPropAt", t_mp_AllSets, i), "hd"), lingoBinary("neq", callMethod("getPropAt", t_mp_AllSets, i), "hr"))) {
  var t_mp_PartList = new LingoPropList([]);
  for (var e = 1; e <= t_mp_AllSets[i].count; ++e) {
  callMethod("addProp", meProp(_me, "m_mp_SetsToSplit"), callMethod("getPropAt", t_mp_AllSets[i], e), t_mp_AllSets[i][e][1])
  }

  }

  }

  for (var i = 1; i <= meProp(_me, "m_mp_SetsToSplit").count; ++i) {
  for (var e = 1; e <= meProp(_me, "m_mp_SetsToSplit")[i].count; ++e) {
  var t_sName = lingoBinary("join", lingoBinary("join", callMethod("getPropAt", meProp(_me, "m_mp_SetsToSplit")[i], e), "_"), meProp(_me, "m_mp_SetsToSplit")[i][e]);
  var t_iPos = callMethod("findPos", meProp(_me, "m_mp_MemberList"), t_sName);
  var t_sSetId = callMethod("getPropAt", meProp(_me, "m_mp_SetsToSplit"), i);
  if (lingoBinary("eq", t_iPos, 0)) {
  callMethod("addProp", meProp(_me, "m_mp_MemberList"), t_sName, new LingoList([t_sSetId]))
  continue;
  }

  callMethod("add", meProp(_me, "m_mp_MemberList")[t_iPos], t_sSetId)
  }

  }

  }

}

