// vmk_3.dcr /  / tObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tObject(_me: LingoMe, t_status: LingoValue, _TradeRequest: LingoValue) {
  if (callNamed("headers", callMethod("pObjectList", t_status.cancel, _TradeRequest))) {
  callNamed("session", callNamed("sprite", t_status, lingoBinary("join", "Referred object not found:", _TradeRequest), symbol("owner")))
  }

  var EnableLevelReqMsg = callMethod("pObjectList", t_status.cancel, _TradeRequest);
  callNamed("_UnwearPin", t_status.cancel, _TradeRequest)
  callNamed("scriptText", t_status.tDelayID, EnableLevelReqMsg)
  callNamed("scriptText", t_status.tProp, EnableLevelReqMsg)
  callNamed("scriptText", t_status.setID, _TradeRequest)
  EnableLevelReqMsg = callNamed("getStringServices");
  callNamed("session", 1)
}

