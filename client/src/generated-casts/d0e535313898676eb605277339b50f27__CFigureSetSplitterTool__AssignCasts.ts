// d0e535313898676eb605277339b50f27.cct / CFigureSetSplitterTool / AssignCasts

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AssignCasts(_me: LingoMe) {
  var t_mp_SetAndCasts = new LingoPropList([]);
  for (var i = 1; i <= meProp(_me, "m_mp_SetsAndCasts").count; ++i) {
  var t_sMemberID = callMethod("getPropAt", meProp(_me, "m_mp_SetsAndCasts"), i);
  var t_sCastName = meProp(_me, "m_mp_SetsAndCasts")[i];
  var t_ar_Sets = meProp(_me, "m_mp_MemberList")[t_sMemberID];
  if (callNamed("listp", t_ar_Sets)) {
  for (var e = 1; e <= t_ar_Sets.count; ++e) {
  var t_sSetId = t_ar_Sets[e];
  var t_iPos = callMethod("findPos", t_mp_SetAndCasts, t_sSetId);
  if (lingoBinary("eq", t_iPos, 0)) {
  callMethod("addProp", t_mp_SetAndCasts, t_sSetId, new LingoList([t_sCastName]))
  continue;
  }

  if (lingoBinary("eq", callMethod("findPos", t_mp_SetAndCasts[t_sSetId], t_sCastName), 0)) {
  callMethod("add", t_mp_SetAndCasts[t_sSetId], t_sCastName)
  }

  }

  }

  }

  setMeProp(_me, "m_mpFinalList", t_mp_SetAndCasts);
  callNamed("put", "assigned..")
}

