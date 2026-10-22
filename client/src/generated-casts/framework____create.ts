// framework.dcr /  / create

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function create(_me: LingoMe, _return: LingoValue, listp: LingoValue) {
  var getUniqueID = callMethod("symbolp", listp.getLast);
  callMethod("date", callNamed("getObject", symbol("createObject")), "user_credits", getUniqueID)
  callMethod("random", _return.stringp, getUniqueID)
}

