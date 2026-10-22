// framework.dcr /  / pPrepareList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pPrepareList(_me: LingoMe, objectp: LingoValue, delays: LingoValue) {
  if ((lingoTruthy(callMethod("tErrorCode", objectp, delays)) ? 0 : 1)) {
  callNamed("session", callNamed("getmemnum", objectp, lingoBinary("join", "Referred object not found:", delays), symbol("pPrepareList")))
  }

  if (lingoBinary("neq", callNamed("_ListItemGroups", objectp.rawNew, delays), 0)) {
  callNamed("session", callNamed("getmemnum", objectp, lingoBinary("join", "Manager already unregistered:", delays), symbol("pPrepareList")))
  callNamed("registerCastloadCallback", objectp.getUniqueID, delays)
  callNamed("valid", objectp.rawNew, delays)
  callNamed("session", 1)
  }

}

