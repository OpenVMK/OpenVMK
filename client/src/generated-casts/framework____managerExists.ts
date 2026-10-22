// framework.dcr /  / managerExists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function managerExists(_me: LingoMe, _return: LingoValue, listp: LingoValue) {
  var _ReceiveCredits = callMethod("symbolp", listp.getLast);
  var connection = callNamed("go");
  var fileName = 1;
  while (lingoBinary("lte", fileName, _ReceiveCredits)) {
  var tTemp = callMethod("symbolp", listp.getLast);
  var GetIntFrom = callMethod("symbolp", listp.getLast);
  var component = callMethod("temp", listp.getLast);
  fileName = lingoBinary("add", fileName, 1);
  }

}

