// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / _SellConfirmResponse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SellConfirmResponse(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_mp_iCode_kCategory = new LingoPropList([1, symbol("items"), 2, symbol("clothes"), 3, symbol("posters"), 4, symbol("pins")]);
  var t_bFromHK = callMethod("GetIntFrom", a_rMsg.connection);
  var t_bShowAlert = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iPrc = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iItemCount = callMethod("GetIntFrom", a_rMsg.connection);
  if (t_bFromHK) {
  var t_ar_ItemList = new LingoList([]);
  for (var i = 1; i <= t_iItemCount; ++i) {
  var t_iTyp = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sGrp = callMethod("GetStrFrom", a_rMsg.connection);
  callMethod("RemItem", callMethod("GetInventory", callMethod("getComponent", _this), 1), callMethod("getaProp", t_mp_iCode_kCategory, t_iTyp), t_iRef, t_sGrp)
  }

  if (t_bShowAlert) {
  var t_s_Title = callNamed("getText", "inv.deleted.from.hk.title");
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "ItemsDeletedFromHk", 1, 1);
  callMethod("show", t)
  var t_sTxt = callNamed("replaceChunks", callNamed("getText", "inv.deleted.from.hk"), "$", callNamed("string", t_iItemCount));
  callMethod("setText", t, t_sTxt, t_s_Title, "OK")
  }

  } else {
  t_iTyp = callMethod("GetIntFrom", a_rMsg.connection);
  t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  t_sGrp = callMethod("GetStrFrom", a_rMsg.connection);
  callMethod("RemItem", callMethod("GetInventory", callMethod("getComponent", _this), 1), callMethod("getaProp", t_mp_iCode_kCategory, t_iTyp), t_iRef, t_sGrp)
  callMethod("ShowSellConfirm", callMethod("getInterface", _this), t_iRef, t_iTyp, t_iPrc)
  }

}

