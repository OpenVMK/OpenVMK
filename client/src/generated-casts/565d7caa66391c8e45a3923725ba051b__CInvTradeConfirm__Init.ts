// 565d7caa66391c8e45a3923725ba051b.cct / CInvTradeConfirm / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, _this: LingoValue, a_iUserRef: LingoValue, a_iReqRef: LingoValue) {
  setMeProp(_me, "m_iUserRef", a_iUserRef);
  setMeProp(_me, "m_iReqRef", a_iReqRef);
  var t_rContext = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  if (callNamed("voidp", t_rContext)) {
  return callNamed("removeObject", callMethod("getID", _this));
  }

  var t_rSelected = callMethod("_AccessIndexed", t_rContext, a_iUserRef, "avatar");
  if (callNamed("voidp", t_rSelected)) {
  return callNamed("removeObject", callMethod("getID", _this));
  }

  var t_sTxt = callNamed("getText", "tra.confirm");
  setMeProp(_me, "m_sDialogTxt", callNamed("replaceChunks", t_sTxt, "\\$", callMethod("GetParam", t_rSelected, "NAME")));
  setMeProp(_me, "m_sDialog", lingoBinary("join", "InvTradeConfirm", theProperty("milliSeconds")));
  var t_rDialog = callNamed("createDialogWindow", callMethod("getID", _this), meProp(_me, "m_sDialog"), 3, 0);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, meProp(_me, "m_sDialogTxt"), callNamed("getText", "tra.tradeconfirm.hd"), callNamed("getText", "tra.cancel"), callNamed("getText", "tra.refuse"), callNamed("getText", "tra.ok"))
}

