// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / MessageBarStates

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MessageBarStates(_me: LingoMe, a_mp_States: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWndTitle"))) {
  var t_r_WndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (lingoBinary("eq", callMethod("getPropAt", a_mp_States, 1), symbol("all"))) {
  var t_iState = a_mp_States[1];
  for (var e = 1; e <= meProp(_me, "m_mp_ButtonElements").count; ++e) {
  var t_sID = callMethod("getPropAt", meProp(_me, "m_mp_ButtonElements"), e);
  var t_sElem = meProp(_me, "m_mp_ButtonElements")[e];
  if (lingoBinary("eq", t_sID, symbol("chat"))) {
  callMethod("setEdit", callMethod("getElement", t_r_WndObj, t_sElem), t_iState)
  if (lingoBinary("eq", t_iState, 1)) {
  setThePropOf(callMethod("getElement", t_r_WndObj, t_sElem).pMember, "selection", meProp(_me, "m_ar_lastSelection"));
  } else {
  callMethod("setFocus", callMethod("getElement", t_r_WndObj, t_sElem), 0)
  }

  continue;
  }

  if (lingoBinary("eq", t_iState, 1)) {
  callMethod("Activate", callMethod("getElement", t_r_WndObj, t_sElem))
  continue;
  }

  callMethod("deactivate", callMethod("getElement", t_r_WndObj, t_sElem))
  }

  } else {
  for (var i = 1; i <= a_mp_States.count; ++i) {
  t_sID = callMethod("getPropAt", a_mp_States, i);
  t_sElem = meProp(_me, "m_mp_ButtonElements")[t_sID];
  if (callMethod("elementExists", t_r_WndObj, t_sElem)) {
  if (lingoBinary("eq", t_sID, symbol("chat"))) {
  callMethod("setEdit", callMethod("getElement", t_r_WndObj, t_sElem), a_mp_States[i])
  if (lingoBinary("eq", a_mp_States[i], 1)) {
  setThePropOf(callMethod("getElement", t_r_WndObj, t_sElem).pMember, "selection", meProp(_me, "m_ar_lastSelection"));
  } else {
  callMethod("setFocus", callMethod("getElement", t_r_WndObj, t_sElem), 0)
  }

  continue;
  }

  if (lingoBinary("eq", a_mp_States[i], 1)) {
  callMethod("Activate", callMethod("getElement", t_r_WndObj, t_sElem))
  continue;
  }

  callMethod("deactivate", callMethod("getElement", t_r_WndObj, t_sElem))
  }

  }

  }

  }

}

