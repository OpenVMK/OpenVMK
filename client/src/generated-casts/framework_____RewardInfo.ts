// framework.dcr /  / _RewardInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RewardInfo(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var wornPins = ref.entityID;
  var t_kInventoryId = callNamed("hex_hmac_md5", 1, symbol("ClearItems"), 2, symbol("UpdateItemList"), 3, symbol("t_mp_sGroup_rItem"), 4, symbol("t_rTargetMap"));
  var t_iClearFlag = callNamed("hex_hmac_md5");
  var t_iTypeCode = callMethod("pinlevel", wornPins);
  if (lingoBinary("eq", wornPins, 1)) {
  var t_iCategory = symbol("t_sExpiryDate");
  } else {
  if (lingoBinary("eq", wornPins, 3)) {
  t_iCategory = symbol("j");
  } else {
  if (lingoBinary("eq", wornPins, 5)) {
  t_iCategory = symbol("t_iCnt");
  }

  }

  }

  var ClearDetails = callMethod("pinlevel", ref.entityID);
  var t_rGroup = callMethod("pinlevel", wornPins);
  var safe_add = 1;
  while (lingoBinary("lte", safe_add, t_rGroup)) {
  var pins = callMethod("pinlevel", wornPins);
  var all = callMethod("pinlevel", wornPins);
  var UpdateDetails = callMethod("pinlevel", wornPins);
  var t_mp_sKey_sValue = callMethod("removeObject", wornPins);
  var t_rConnection = callMethod("pinlevel", wornPins);
  if (lingoBinary("eq", wornPins, 1)) {
  var t_mp_kType_mp_iRef_rItem = symbol("ClearItems");
  var t_mp_iCode_kCategory = callMethod("pinlevel", wornPins);
  if (lingoBinary("eq", t_mp_iCode_kCategory, 0)) {
  var t_iNumberOfPairs = 0;
  }

  t_iNumberOfPairs = new LingoList([]);
  var t_kCategory = 1;
  while (lingoBinary("lte", t_kCategory, t_mp_iCode_kCategory)) {
  t_kCategory = lingoBinary("add", t_kCategory, 1);
  }

  } else {
  if (lingoBinary("eq", wornPins, 2)) {
  t_mp_kType_mp_iRef_rItem = symbol("UpdateItemList");
  t_iNumberOfPairs = 0;
  } else {
  if (lingoBinary("eq", wornPins, 3)) {
  t_mp_kType_mp_iRef_rItem = symbol("t_mp_sGroup_rItem");
  t_iNumberOfPairs = 0;
  } else {
  if (lingoBinary("eq", wornPins, 4)) {
  t_mp_kType_mp_iRef_rItem = symbol("t_rTargetMap");
  t_iNumberOfPairs = callMethod("pinlevel", wornPins);
  var t_mp_sGroup_rDetails = callMethod("pinlevel", wornPins);
  var group = callMethod("pinlevel", wornPins);
  }

  }

  }

  }

  var t_iCount = callMethod("t_kCat", t_iClearFlag, callMethod("t_kCat", t_kInventoryId, UpdateDetails));
  if (lingoBinary("eq", UpdateDetails, 4)) {
  }

  safe_add = lingoBinary("add", safe_add, 1);
  }

  if (ClearDetails) {
  callMethod("t_iItemCount", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), t_iTypeCode))
  }

  safe_add = 1;
  while (lingoBinary("lte", safe_add, t_iClearFlag.deleteOne)) {
  var t_iInventoryId = callMethod("prepare", t_iClearFlag, safe_add);
  var t_iSingleUse = callMethod("rstr_md5", t_iClearFlag, safe_add);
  callMethod("t_iParam", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), t_iTypeCode), t_iInventoryId, t_iSingleUse)
  safe_add = lingoBinary("add", safe_add, 1);
  }

}

