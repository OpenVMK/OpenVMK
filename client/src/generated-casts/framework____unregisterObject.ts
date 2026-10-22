// framework.dcr /  / unregisterObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterObject(_me: LingoMe, _return: LingoValue, listp: LingoValue) {
  var _ListItemGroups = callMethod("symbolp", listp.getLast);
  var _ReceiveCredits = callMethod("symbolp", listp.getLast);
  var DisableLevelReqMsg = callNamed("go");
  var fileName = 1;
  while (lingoBinary("lte", fileName, _ReceiveCredits)) {
  var EnableLevelReqMsg = callNamed("go");
  callMethod("netDone", EnableLevelReqMsg, symbol("addAt"), callMethod("symbolp", listp.getLast))
  callMethod("netDone", DisableLevelReqMsg, callMethod("preloadMode", EnableLevelReqMsg, symbol("HandleLevelRequirementNotMetMessage")), EnableLevelReqMsg)
  fileName = lingoBinary("add", fileName, 1);
  }

  callMethod("call", callMethod("timeout", callMethod("tID", _return), _ListItemGroups), symbol("dialogWindowEvent"), DisableLevelReqMsg)
}

