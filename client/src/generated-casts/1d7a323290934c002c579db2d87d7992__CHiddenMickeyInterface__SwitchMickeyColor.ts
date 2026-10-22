// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyInterface / SwitchMickeyColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SwitchMickeyColor(_me: LingoMe, _this: LingoValue, a_iMickeyId: LingoValue, a_kNext: LingoValue) {
  var t_mpMickey = callMethod("getaProp", meProp(_me, "m_mpHiddenMickeysInRoom"), a_iMickeyId);
  if (callNamed("voidp", t_mpMickey)) {
  return callNamed("error", _this, "Mickey not found.", symbol("SwitchMickeyColor"));
  }

  var t_iCurrentColor = callMethod("getaProp", meProp(_me, "m_mpMickeyColorList"), a_iMickeyId);
  switch (a_kNext) {
case symbol("next"):
  t_iCurrentColor = lingoBinary("add", t_iCurrentColor, 1);
  if (lingoBinary("gt", t_iCurrentColor, lingoBinary("sub", meProp(_me, "m_mpHMMembersByType").count, 1))) {
  t_iCurrentColor = 0;
  }

  break;
case symbol("previous"):
  t_iCurrentColor = lingoBinary("sub", t_iCurrentColor, 1);
  if (lingoBinary("lt", t_iCurrentColor, 0)) {
  t_iCurrentColor = lingoBinary("sub", meProp(_me, "m_mpHMMembersByType").count, 1);
  }

  break;
  }

  setThePropOf(t_mpMickey["SPRITE"], "member", callMethod("getaProp", callMethod("getaProp", meProp(_me, "m_mpHMMembersByType"), t_iCurrentColor), t_mpMickey["TYPE"]));
  callMethod("setaProp", meProp(_me, "m_mpMickeyColorList"), a_iMickeyId, t_iCurrentColor)
}

