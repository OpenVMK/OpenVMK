// framework.dcr /  / component

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function component(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var pins = callMethod("pinlevel", ref.entityID);
  var m_bLevelReqMsgEnabled = callNamed("ShowLevelRequiredScreen", ref);
  var t_sID = callMethod("t_ar_data", callMethod("t_iRef", callNamed("t_iEntityID", "room")));
  if ((lingoTruthy(callNamed("headers", t_sID)) ? 0 : 1)) {
  var t_rList = callMethod("t_rInput", t_sID, pins, "avatar");
  if (callNamed("headers", t_rList)) {
  callNamed("getmemnum", objectp, lingoBinary("join", "Trade Avatar not found:", pins), symbol("t_iItemCode"))
  }

  var registerListener = callNamed("hex_hmac_md5", symbol("t_iRequiredLevel"), m_bLevelReqMsgEnabled, symbol("t_iAvatarLevel"), symbol("tConn"), symbol("unregisterListener"), callNamed("t_ar_CustomBtn", t_rList, "NAME"), symbol("_AccessRoom"), t_rList);
  }

}

