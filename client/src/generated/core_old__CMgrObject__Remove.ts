// core.old.cct / CMgrObject / Remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Remove(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  var tObj = meProp(_me, "pObjectList")[tID];
  if (meProp(_me, "m_bLogger")) {
  var t_sDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "\"");
  var t_sCls = chunkOf(callNamed("string", tObj), "item", 2, 0);
  setTheProperty("itemDelimiter", t_sDelim);
  m_sLogger = m_sLogger + lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", theProperty("long time"), "Remove"), "\""), tID), "\""), "/"), t_sCls), "\r");
  }

  if (callNamed("voidp", tObj)) {
  return 0;
  }

  if (callNamed("ilk", tObj, symbol("instance"))) {
  if (!lingoTruthy(tObj.valid)) {
  return 0;
  }

  for (var i = 1; i <= tObj.delays.count; ++i) {
  var tDelayID = callMethod("getPropAt", tObj.delays, i);
  callMethod("cancel", tObj, tDelayID)
  }

  callMethod("deconstruct", tObj)
  setThePropOf(tObj, "valid", 0);
  }

  callMethod("deleteOne", meProp(_me, "pUpdateList"), tObj)
  callMethod("deleteOne", meProp(_me, "pPrepareList"), tObj)
  tObj = undefined;
  if (!lingoTruthy(meProp(_me, "pEraseLock"))) {
  callMethod("deleteProp", meProp(_me, "pObjectList"), tID)
  callMethod("deleteOne", meProp(_me, "pInstanceList"), tID)
  callMethod("deleteOne", meProp(_me, "pManagerList"), tID)
  }

  return 1;
}

