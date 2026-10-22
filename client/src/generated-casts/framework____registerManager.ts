// framework.dcr /  / registerManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerManager(_me: LingoMe, _return: LingoValue, listp: LingoValue) {
  var _ReceiveCredits = callMethod("symbolp", listp.getLast);
  callNamed("t_iCoreCastNum", _return, "Unimplemented method!", symbol("registerManager"))
  var fileName = 1;
  while (lingoBinary("lte", fileName, _ReceiveCredits)) {
  var GetLevelReqMsgEnabled = callMethod("symbolp", listp.getLast);
  var tTemp = callMethod("symbolp", listp.getLast);
  fileName = lingoBinary("add", fileName, 1);
  }

}

