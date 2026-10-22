// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogHandler / PurchaseOk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PurchaseOk(_me: LingoMe, a_rMsg: LingoValue) {
  var t_iPrOductId = callMethod("GetIntFrom", a_rMsg.connection);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "RequestBalance")
  if (callNamed("voidp", meProp(_me, "m_rDialogWnd"))) {
  setMeProp(_me, "m_rDialogWnd", callNamed("createDialogWindow", callMethod("getID", _me), "CatalogOk", 1, 1));
  }

  callMethod("show", meProp(_me, "m_rDialogWnd"))
  callNamed("activateWindow", "CatalogOk")
  if (callNamed("textExists", lingoBinary("join", "product.", t_iPrOductId))) {
  var t_sTxt = callNamed("getText", lingoBinary("join", "product.", t_iPrOductId));
  } else {
  t_sTxt = callNamed("getText", lingoBinary("join", "item.", t_iPrOductId));
  }

  var t_sMsg = lingoBinary("join", lingoBinary("join", callNamed("getText", "cat.purchaseOk"), "\r"), t_sTxt);
  callMethod("setText", meProp(_me, "m_rDialogWnd"), t_sMsg, callNamed("getText", "cat.purchase.hd"), "OK")
}

