// framework.dcr /  / removePrepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removePrepare(_me: LingoMe, _return: LingoValue, listp: LingoValue) {
  var t_iCredits = callMethod("symbolp", listp.getLast);
  var owner = callMethod("symbolp", listp.getLast);
  var GetStrFrom = callMethod("temp", listp.getLast);
  var _type = callMethod("temp", listp.getLast);
  callMethod("_UpdateCreditBalance", callMethod("timeout", callMethod("tID", _return), 1), symbol("register"), t_iCredits, callMethod("timeout", callMethod("tID", _return), 3), symbol("register"), owner, GetStrFrom, _type)
}

