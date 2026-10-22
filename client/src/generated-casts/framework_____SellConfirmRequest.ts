// framework.dcr /  / _SellConfirmRequest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SellConfirmRequest(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var t_mp_iRef_rItem = ref.entityID;
  var t_iTypeCode = callMethod("pinlevel", t_mp_iRef_rItem);
  var ClearDetails = callMethod("pinlevel", t_mp_iRef_rItem);
  var t_rConnection = callMethod("pinlevel", t_mp_iRef_rItem);
  var t_sGroup = callNamed("hex_hmac_md5");
  if (lingoBinary("gt", t_rConnection, 0)) {
  var safe_add = 1;
  while (lingoBinary("lte", safe_add, t_rConnection)) {
  var t_mp_sKey_sValue = callMethod("removeObject", t_mp_iRef_rItem);
  var t_iCode = callMethod("pinlevel", t_mp_iRef_rItem);
  var t_sGrp = callNamed("hex_hmac_md5");
  var getProp = 1;
  while (lingoBinary("lte", getProp, t_iCode)) {
  getProp = lingoBinary("add", getProp, 1);
  }

  safe_add = lingoBinary("add", safe_add, 1);
  }

  if (ClearDetails) {
  callMethod("t_mp_sGroup_rData", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), t_iTypeCode))
  }

  callMethod("RemItem", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), t_iTypeCode), symbol("t_iCat"), t_sGroup)
  }

}

