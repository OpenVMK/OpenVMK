// framework.dcr /  / receiveUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function receiveUpdate(_me: LingoMe, _return: LingoValue, listp: LingoValue) {
  var _ListItemGroups = callMethod("symbolp", listp.getLast);
  var _ReceiveCredits = callMethod("symbolp", listp.getLast);
  var fileName = 1;
  while (lingoBinary("lte", fileName, _ReceiveCredits)) {
  var ref = callMethod("symbolp", listp.getLast);
  var entityID = callMethod("symbolp", listp.getLast);
  var GetStrFrom = callMethod("temp", listp.getLast);
  var xtra = callMethod("temp", listp.getLast);
  callMethod("_UpdateCreditBalance", callMethod("timeout", callMethod("tID", _return), _ListItemGroups), symbol("tDelayID"), ref, callMethod("timeout", callMethod("tID", _return), 2), symbol("tDelayID"), entityID, GetStrFrom, xtra)
  fileName = lingoBinary("add", fileName, 1);
  }

  _ReceiveCredits = callMethod("symbolp", listp.getLast);
  fileName = 1;
  while (lingoBinary("lte", fileName, _ReceiveCredits)) {
  ref = callMethod("symbolp", listp.getLast);
  entityID = callMethod("symbolp", listp.getLast);
  GetStrFrom = callMethod("temp", listp.getLast);
  xtra = callMethod("temp", listp.getLast);
  callMethod("_UpdateCreditBalance", callMethod("timeout", callMethod("tID", _return), 2), symbol("tDelayID"), ref, callMethod("timeout", callMethod("tID", _return), _ListItemGroups), symbol("tDelayID"), entityID, GetStrFrom, xtra)
  fileName = lingoBinary("add", fileName, 1);
  }

}

