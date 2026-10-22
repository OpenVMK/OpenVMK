// framework.dcr /  / DisableLevelReqMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisableLevelReqMsg(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var t_kInventoryId = callNamed("hex_hmac_md5", 1, symbol("ClearItems"), 2, symbol("UpdateItemList"), 3, symbol("t_mp_sGroup_rItem"), 4, symbol("t_rTargetMap"));
  var eventID = callMethod("pinlevel", ref.entityID);
  var GetParam = callMethod("pinlevel", ref.entityID);
  var t_bShowAlert = callMethod("pinlevel", ref.entityID);
  var t_rConnection = callMethod("pinlevel", ref.entityID);
  if (eventID) {
  var room = new LingoList([]);
  var safe_add = 1;
  while (lingoBinary("lte", safe_add, t_rConnection)) {
  var t_bFromHK = callMethod("pinlevel", ref.entityID);
  var pins = callMethod("pinlevel", ref.entityID);
  var t_sDstGrp = callMethod("removeObject", ref.entityID);
  safe_add = lingoBinary("add", safe_add, 1);
  }

  if (GetParam) {
  var TradeOpen = callNamed("t", "inv.deleted.from.hk.title");
  var text = callNamed("t_sTxt", callMethod("bytesSoFar", objectp), "ItemsDeletedFromHk", 1, 1);
  var avatarsex = callNamed("Init", callNamed("t", "inv.deleted.from.hk"), "$", callNamed("getOne", t_rConnection));
  callMethod("t_iUserRef", text, avatarsex, TradeOpen, "OK")
  }

  t_bFromHK = callMethod("pinlevel", ref.entityID);
  pins = callMethod("pinlevel", ref.entityID);
  t_sDstGrp = callMethod("removeObject", ref.entityID);
  callMethod("t_sTrgGrp", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), 1), callMethod("t_kCat", t_kInventoryId, t_bFromHK), pins, t_sDstGrp)
  callMethod("t_iReqRef", callMethod("t_s_Title", objectp), pins, t_bFromHK, t_bShowAlert)
  }

}

