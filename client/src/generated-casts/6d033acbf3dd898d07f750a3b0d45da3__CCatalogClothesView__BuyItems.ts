// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / BuyItems

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function BuyItems(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iPos", callMethod("GetSelected", _this).code);
  if (lingoBinary("gt", meProp(_me, "m_iPos"), 0)) {
  setMeProp(_me, "m_iId", callMethod("GetSelected", _this).categoryId);
  var t_sPrice = callMethod("GetSelected", _this).price;
  var m_ImgBg = callNamed("member", callNamed("getmemnum", "field.e.active"));
  if (lingoBinary("gte", lingoBinary("sub", meProp(_me, "m_iBalance"), t_sPrice), 0)) {
  setMeProp(_me, "m_bEnoughCredits", 1);
  } else {
  setMeProp(_me, "m_bEnoughCredits", 0);
  }

  if (lingoBinary("eq", meProp(_me, "m_bEnoughCredits"), 0)) {
  var t_rDialogWnd = callNamed("createDialogWindow", callMethod("getID", _this), "NotEnoughCredits", 1, 1);
  callMethod("show", t_rDialogWnd)
  var t_sMsg = callNamed("getText", "cat.not.enough.credits");
  callMethod("setText", t_rDialogWnd, t_sMsg, callNamed("getText", "cat.not.enough.credits.hd"), "OK")
  return 1;
  }

  if ((lingoTruthy(callNamed("DialogWindowExists", "ConfirmBuy")) ? 0 : 1)) {
  var t_rDialogWnd2 = callNamed("createDialogWindow", callMethod("getID", _this), "ConfirmBuy", 2, 1);
  }

  callMethod("show", t_rDialogWnd2)
  if (callNamed("textExists", lingoBinary("join", "product.", meProp(_me, "m_iPos")))) {
  var t_sTxt = callNamed("getText", lingoBinary("join", "product.", meProp(_me, "m_iPos")));
  } else {
  t_sTxt = callNamed("getText", lingoBinary("join", "item.", meProp(_me, "m_iPos")));
  }

  t_sMsg = lingoBinary("joinPad", callNamed("getText", "cat.purchase.confirm"), t_sTxt);
  var t_sOk = callNamed("getText", "mes.accept");
  var t_sCancel = callNamed("getText", "mes.deny");
  var t_mp_Button1 = new LingoPropList([symbol("text"), t_sCancel, symbol("eventID"), symbol("dialogCancel")]);
  var t_mp_Button2 = new LingoPropList([symbol("text"), t_sOk, symbol("eventID"), symbol("dialogOK")]);
  callMethod("setText", t_rDialogWnd2, t_sMsg, callNamed("getText", "cat.purchase.confirm.hd"), t_mp_Button1, t_mp_Button2)
  }

}

