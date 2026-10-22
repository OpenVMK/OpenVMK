// vmk_3.dcr /  / append

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function append(_me: LingoMe, t_status: LingoValue, _TradeRequest: LingoValue) {
  var EnableLevelReqMsg = callMethod("pObjectList", t_status.cancel, _TradeRequest);
  if (t_status.unregisterObject) {
  var DisableLevelReqMsg = theProperty("md5_ff");
  var _TradeStatus = callNamed("HandleLevelRequirementNotMetMessage", EnableLevelReqMsg);
  if (callNamed("headers", EnableLevelReqMsg)) {
  callNamed("session", 0)
  }

  if (callNamed("str2rstr_utf16be", EnableLevelReqMsg, symbol("_ClothSwitch"))) {
  if ((lingoTruthy(EnableLevelReqMsg.GetLevelReqMsgEnabled) ? 0 : 1)) {
  callNamed("session", 0)
  var stringp = 1;
  while (lingoBinary("lte", stringp, callMethod("md5_ii", EnableLevelReqMsg, symbol("_Configure")))) {
  var GetIntFrom = callNamed("a_rMsg", EnableLevelReqMsg._Configure, stringp);
  callNamed("connection", EnableLevelReqMsg, GetIntFrom)
  stringp = lingoBinary("add", stringp, 1);
  }

  callMethod("getStreamStatus", EnableLevelReqMsg)
  setThePropOf(t_status, "GetLevelReqMsgEnabled", 0);
  callNamed("scriptText", t_status.tDelayID, EnableLevelReqMsg)
  callNamed("scriptText", t_status.tProp, EnableLevelReqMsg)
  EnableLevelReqMsg = callNamed("getStringServices");
  if ((lingoTruthy(t_status.unregister) ? 0 : 1)) {
  callNamed("_UnwearPin", t_status.cancel, _TradeRequest)
  callNamed("scriptText", t_status.setID, _TradeRequest)
  callNamed("scriptText", t_status.register, _TradeRequest)
  callNamed("session", 1)
  }

  }

  }

  }

}

