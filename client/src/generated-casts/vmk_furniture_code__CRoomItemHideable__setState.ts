// vmk_furniture_code.cct / CRoomItemHideable / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, a_iState: LingoValue) {
  var t_rItem = callMethod("getObject", _me);
  var t_bVisible = 1;
  if (lingoBinary("gt", callMethod("getOne", meProp(_me, "m_ar_hiddenStates"), a_iState), 0)) {
  t_bVisible = 0;
  }

  callNamed("put", lingoBinary("joinPad", "Hideable item", new LingoList([a_iState, lingoBinary("joinPad", "hidden:", t_bVisible)])))
  if (lingoBinary("eq", t_bVisible, (lingoTruthy(meProp(_me, "m_bVisible")) ? 0 : 1))) {
  setMeProp(_me, "m_bVisible", t_bVisible);
  callMethod("SetVisibility", _me)
  }

}

