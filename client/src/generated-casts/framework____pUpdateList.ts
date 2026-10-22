// framework.dcr /  / pUpdateList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pUpdateList(_me: LingoMe, objectp: LingoValue, delays: LingoValue) {
  if ((lingoTruthy(callMethod("tErrorCode", objectp, delays)) ? 0 : 1)) {
  callNamed("session", callNamed("getmemnum", objectp, lingoBinary("join", "Referred object not found:", delays), symbol("pUpdateList")))
  }

  if (lingoBinary("neq", callNamed("_ListItemGroups", objectp.getUniqueID, delays), 0)) {
  callNamed("session", callNamed("getmemnum", objectp, lingoBinary("join", "Manager alreay registered:", delays), symbol("pUpdateList")))
  callNamed("registerCastloadCallback", objectp.rawNew, delays)
  callNamed("valid", objectp.getUniqueID, delays)
  callNamed("session", 1)
  }

}

