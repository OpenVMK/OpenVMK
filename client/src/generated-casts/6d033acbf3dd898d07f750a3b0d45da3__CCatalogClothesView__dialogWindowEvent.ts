// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, a_sDialogName: LingoValue, a_sDialogEvent: LingoValue) {
  if (lingoBinary("eq", a_sDialogName, "ConfirmBuy")) {
  switch (a_sDialogEvent) {
case symbol("dialogOK"):
  if (lingoBinary("and", callNamed("integerp", meProp(_me, "m_iPos")), callNamed("integerp", meProp(_me, "m_iId")))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 17, new LingoPropList([symbol("int"), meProp(_me, "m_iPos"), symbol("int"), meProp(_me, "m_iId")]))
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "RequestBalance")
  } else {
  callNamed("put", "No item defined")
  }

  break;
case symbol("dialogCancel"):
  break;
  }

  }

}

