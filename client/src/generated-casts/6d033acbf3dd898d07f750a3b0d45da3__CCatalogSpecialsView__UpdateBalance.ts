// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / UpdateBalance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateBalance(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iBalance", meProp(_me, "m_mpCatalogData")["balance"]);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iBalance"))) ? 0 : 1)) {
  var t_sTxt = lingoBinary("joinPad", callNamed("string", meProp(_me, "m_iBalance")), callNamed("getText", "cat.credits"));
  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "cat.credits.amount")) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.credits.amount"), t_sTxt)
  }

  } else {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "RequestBalance")
  }

}

