// framework.dcr /  / receivePrepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function receivePrepare(_me: LingoMe, _return: LingoValue, listp: LingoValue) {
  var t_iCredits = callMethod("symbolp", listp.getLast);
  var owner = callMethod("symbolp", listp.getLast);
  var GetStrFrom = callMethod("temp", listp.getLast);
  var _type = callMethod("temp", listp.getLast);
  if (lingoBinary("eq", owner, -float(1))) {
  callMethod("_Configure", callMethod("timeout", callMethod("tID", _return), 3), symbol("register"), t_iCredits, GetStrFrom)
  }

  callMethod("_UpdateCreditBalance", callMethod("timeout", callMethod("tID", _return), 3), symbol("register"), t_iCredits, callMethod("timeout", callMethod("tID", _return), 1), symbol("register"), owner, GetStrFrom, _type)
}

