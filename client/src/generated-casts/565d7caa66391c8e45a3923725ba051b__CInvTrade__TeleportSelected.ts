// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / TeleportSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TeleportSelected(_me: LingoMe, _this: LingoValue, a_iOtherID: LingoValue) {
  var t_ar_rLists = new LingoList([meProp(_me, "m_mp_iRef_rOwnItems"), meProp(_me, "m_mp_iRef_rHerItems"), meProp(_me, "m_mp_iRef_rInvItems")]);
  var i = 0;
  for (var i = 1; i <= 3; ++i) {
  var t_rList = t_ar_rLists[i];
  var c = 1;
  for (var t_rItem of t_rList.toArray()) {
  if ((lingoTruthy(lingoBinary("eq", callMethod("getaProp", t_rItem, symbol("param")), 0)) ? 0 : 1)) {
  if (callNamed("ilk", t_rItem.param, symbol("list"))) {
  if (lingoBinary("eq", t_rItem.param.count, 3)) {
  if (lingoBinary("eq", t_rItem.param[1], 1)) {
  if (lingoBinary("eq", t_rItem.param[3], a_iOtherID)) {
  switch (i) {
case 1:
  callMethod("Highlight", meProp(_me, "m_rGridOwnItems"), c)
  break;
case 2:
  callMethod("Highlight", meProp(_me, "m_rGridHerItems"), c)
  break;
case 3:
  callMethod("Highlight", meProp(_me, "m_rGridInvItems"), c)
  break;
  }

  return;
  }

  }

  }

  }

  }

  c = lingoBinary("add", c, 1);
  }

  }

}

