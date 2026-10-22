// framework.dcr / test / _SellConfirmResponse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SellConfirmResponse(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_mp_iCode_kCategory = callNamed("propList", 1, symbol("items"), 2, symbol("clothes"), 3, symbol("posters"), 4, symbol("pins"));
  var t_bFromHK = callMethod("GetIntFrom", a_rMsg.connection);
  var t_bShowAlert = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iPrc = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iItemCount = callMethod("GetIntFrom", a_rMsg.connection);
  if (t_bFromHK) {
  var t_ar_ItemList = new LingoList([]);
  var i = 1;
  while (lingoBinary("lte", i, t_iItemCount)) {
  var t_iTyp = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sGrp = callMethod("GetStrFrom", a_rMsg.connection);
  i = lingoBinary("add", i, 1);
  }

  if (t_bShowAlert) {
  var t_s_Title = callNamed("getText", "inv.deleted.from.hk.title");
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "ItemsDeletedFromHk", 1, 1);
  var t_sTxt = callNamed("replaceChunks", callNamed("getText", "inv.deleted.from.hk"), "$", callNamed("string", t_iItemCount));
  callMethod("setText", t, t_sTxt, t_s_Title, "OK")
  }

  t_iTyp = callMethod("GetIntFrom", a_rMsg.connection);
  t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  t_sGrp = callMethod("GetStrFrom", a_rMsg.connection);
  callMethod("RemItem", callMethod("GetInventory", callMethod("getComponent", _this), 1), callMethod("getaProp", t_mp_iCode_kCategory, t_iTyp), t_iRef, t_sGrp)
  callMethod("ShowSellConfirm", callMethod("getInterface", _this), t_iRef, t_iTyp, t_iPrc)
  }

}

