// framework.dcr /  / GetLevelReqMsgEnabled

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetLevelReqMsgEnabled(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var data = callMethod("pinlevel", ref.entityID);
  var confirm = callMethod("pinlevel", ref.entityID);
  if (lingoBinary("eq", confirm, 1)) {
  var t_rOwnSet = callMethod("t_rInput", callMethod("t_ar_data", callNamed("t_iEntityID", symbol("t_sTraderName")).magiword), data, "avatar");
  var t_mp_iRef_rItem_Her = callNamed("t_ar_CustomBtn", t_rOwnSet, "SEX");
  var t_rHerSet = callMethod("netError", callNamed("m_sSecretCode2", symbol("GetLockState")), "name");
  var t_iPinLevel = callNamed("hex_hmac_md5");
  var t_mp_iRef_rItem_Own = "";
  if (callNamed("setDebugLevel", t_rOwnSet)) {
  t_mp_iRef_rItem_Own = callNamed("t_ar_CustomBtn", t_rOwnSet, "NAME");
  }

  callMethod("t_iTraderGender", callNamed("rstr2binl", symbol("t_iResponse"), t_rHerSet, t_iPinLevel), objectp.magiword, data)
  if (lingoBinary("neq", t_mp_iRef_rItem_Her, callMethod("t_kCat", t_iPinLevel, "SEX"))) {
  var text = callNamed("t_sTxt", callMethod("bytesSoFar", objectp), "trade.dialog.oppositeGender", 1, 1);
  var t_dialogEvent = callNamed("hex_hmac_md5", symbol("t_sOwnName"), callNamed("t", "inv.trade.oppositeGender.dialog.OK"), symbol("t_info"), symbol("t_rTrader"), symbol("t_rParameter"), data);
  callMethod("t_dialogName", text)
  } else {
  if (lingoBinary("eq", confirm, 0)) {
  text = callNamed("t_sTxt", callMethod("bytesSoFar", objectp), "trade.dialog.trade.declined", 1, 1);
  t_dialogEvent = callNamed("hex_hmac_md5", symbol("t_sOwnName"), callNamed("t", "inv.trade.declined.dialog.OK"), symbol("t_info"), symbol("t_rTrader"), symbol("t_rParameter"), t_mp_iRef_rItem_Own);
  callMethod("t_dialogName", text)
  }

  }

  }

}

