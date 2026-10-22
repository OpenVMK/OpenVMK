// framework.dcr /  / _ClothSwitch

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ClothSwitch(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var itemInventory = callNamed("hex_hmac_md5");
  var wornPins = ref.entityID;
  callMethod("tBase", itemInventory, symbol("objectExists"), callMethod("removeObject", wornPins))
  callMethod("tBase", itemInventory, symbol("getThread"), callMethod("pinlevel", wornPins))
  if (lingoBinary("eq", itemInventory, 1)) {
  var pins = callMethod("pinlevel", wornPins);
  if (lingoBinary("neq", pins, -float(1))) {
  callMethod("tBase", callMethod("rstr_md5", itemInventory, symbol("getComponent")), symbol("_AccessRoom"), pins)
  }

  var posters = callMethod("pinlevel", wornPins);
  if (lingoBinary("neq", posters, -float(1))) {
  callMethod("tBase", callMethod("rstr_md5", itemInventory, symbol("getComponent")), symbol("_AccessIndexed"), posters)
  } else {
  if (lingoBinary("eq", itemInventory, 2)) {
  pins = callMethod("pinlevel", wornPins);
  if (lingoBinary("neq", pins, -float(1))) {
  callMethod("tBase", callMethod("rstr_md5", itemInventory, symbol("getComponent")), symbol("_AccessRoom"), pins)
  } else {
  if (lingoBinary("eq", itemInventory, 3)) {
  } else {
  if (lingoBinary("eq", itemInventory, 4)) {
  } else {
  if (lingoBinary("eq", itemInventory, 5)) {
  } else {
  if (lingoBinary("eq", itemInventory, 6)) {
  } else {
  if (lingoBinary("eq", itemInventory, 7)) {
  callMethod("tBase", callMethod("rstr_md5", itemInventory, symbol("getComponent")), symbol("SetParam"), callMethod("pinlevel", wornPins))
  callMethod("tBase", callMethod("rstr_md5", itemInventory, symbol("getComponent")), symbol("define"), callMethod("removeObject", wornPins))
  } else {
  if (lingoBinary("eq", itemInventory, 8)) {
  callMethod("tBase", callMethod("rstr_md5", itemInventory, symbol("getComponent")), symbol("m_rTradeDevice"), callMethod("pinlevel", wornPins))
  callMethod("tBase", callMethod("rstr_md5", itemInventory, symbol("getComponent")), symbol("define"), callMethod("removeObject", wornPins))
  } else {
  if (lingoBinary("eq", itemInventory, 9)) {
  callMethod("tBase", callMethod("rstr_md5", itemInventory, symbol("getComponent")), symbol("m_rTradeDevice"), callMethod("pinlevel", wornPins))
  callMethod("tBase", callMethod("rstr_md5", itemInventory, symbol("getComponent")), symbol("DefineItemInfo"), callMethod("removeObject", wornPins))
  }

  }

  }

  }

  }

  }

  }

  }

  var vmks = "ItemDetails";
  if (callNamed("t_rObj", vmks)) {
  callNamed("t_rObject", vmks)
  }

  if (callMethod("netError", callNamed("m_sSecretCode2", symbol("GetLockState")), "FetchEntityID")) {
  if (lingoBinary("and", (lingoTruthy((lingoTruthy(callNamed("headers", posters)) ? 0 : 1)) ? 0 : 1), callNamed("headers", pins))) {
  var getaProp = callMethod("t_rInput", callMethod("t_ar_data", callMethod("t_iRef", callNamed("t_iEntityID", "room"))), pins, "element");
  if (callNamed("setDebugLevel", getaProp)) {
  callMethod("t_sObjectID", callMethod("m_sSecretCode2", getaProp), "ENTITYID", posters)
  }

  callNamed("getmemnum", objectp, "Object not found in context", symbol("_ClothSwitch"))
  } else {
  if ((lingoTruthy(callMethod("netError", callNamed("m_sSecretCode2", symbol("GetLockState")), "IsTrading")) ? 0 : 1)) {
  var GetInventory = callNamed("stageBottom", vmks, "CInvItemDetails");
  if (callNamed("setDebugLevel", GetInventory)) {
  callMethod("construct", GetInventory, itemInventory)
  } else {
  if ((lingoTruthy(callNamed("headers", callMethod("t_iRef", objectp).items)) ? 0 : 1)) {
  callMethod("clothes", callMethod("t_iRef", objectp).items, itemInventory)
  }

  }

  }

  }

  }

  }

  }

  }

}

