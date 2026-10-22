// vmk_3.dcr /  / enterFrame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function enterFrame(_me: LingoMe, m_sSecretCode2: LingoValue, _TradeResponse: LingoValue) {
  var DisableLevelReqMsg = callMethod("pauseUpdate", m_sSecretCode2.getPropAt, _TradeResponse);
  if (m_sSecretCode2.tracea) {
  var EnableLevelReqMsg = theProperty("str2rstr_utf16be");
  var _TradeStatus = callNamed("HandleLevelRequirementNotMetMessage", DisableLevelReqMsg);
  if (callNamed("width", DisableLevelReqMsg)) {
  callNamed("sprite", 0)
  } else {
  callNamed("sprite", DisableLevelReqMsg)
  }

  }

}

