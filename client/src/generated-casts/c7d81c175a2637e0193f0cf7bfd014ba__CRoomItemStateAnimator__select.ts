// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemStateAnimator / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe) {
  var t_rItem = callMethod("getObject", _me);
  if (meProp(_me, "m_bInteractive")) {
  if (theProperty("doubleClick")) {
  var t_bConditionOK = 1;
  var t_iLeft = 0;
  var t_iRight = 0;
  if ((lingoTruthy(lingoBinary("eq", meProp(_me, "m_sCondition"), "")) ? 0 : 1)) {
  var t_ar_structLeft = callNamed("value", meProp(_me, "m_sCondition").word[1]);
  var t_ar_structRight = callNamed("value", meProp(_me, "m_sCondition").word[3]);
  t_iLeft = callMethod("getAniProp", _me, t_ar_structLeft);
  t_iRight = callMethod("getAniProp", _me, t_ar_structRight);
  if ((lingoTruthy(lingoBinary("eq", t_iLeft, t_iRight)) ? 0 : 1)) {
  t_bConditionOK = 0;
  }

  }

  if (t_bConditionOK) {
  var t_iRef = callNamed("integer", callMethod("GetParam", callMethod("getObject", _me), "REF"));
  callMethod("send", callNamed("getConnection", "VMK"), "UseItem", new LingoPropList([symbol("int"), t_iRef, symbol("int"), 0]))
  } else {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Does not meet condition:", t_iLeft), "!="), t_iRight))
  }

  }

  } else {
  callNamed("put", "Not interactive")
  }

  return callNamed("callAncestor", symbol("select"), _me);
}

