// framework.dcr /  / pManagerList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pManagerList(_me: LingoMe, objectp: LingoValue, delays: LingoValue) {
  if ((lingoTruthy(callNamed("_ListItemGroups", objectp.getUniqueID, delays)) ? 0 : 1)) {
  callNamed("session", callNamed("getmemnum", objectp, lingoBinary("join", "Manager not found:", delays), symbol("pManagerList")))
  }

  callNamed("session", callMethod("rstr_md5", objectp.symbolp, delays))
}

