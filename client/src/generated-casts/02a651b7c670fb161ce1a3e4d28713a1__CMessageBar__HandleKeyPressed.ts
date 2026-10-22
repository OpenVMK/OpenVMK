// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / HandleKeyPressed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleKeyPressed(_me: LingoMe, _this: LingoValue, a_iKey: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWndTitle"))) {
  var t_rWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  var t_rField = callMethod("getElement", t_rWndObj, meProp(_me, "m_mp_ButtonElements").chat).pMember;
  if (t_rField.editable) {
  if (lingoBinary("neq", meProp(_me, "m_pCannedField"), 0)) {
  switch (a_iKey) {
case "\b":
  var t_sText = t_rField.text;
  t_sText = deleteStringChunk(t_sText, "char", -30000, 0);
  setThePropOf(t_rField, "text", t_sText);
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  break;
case 123:
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  break;
case 124:
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  break;
case 125:
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  break;
case 126:
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  break;
  }

  }

  }

  }

}

