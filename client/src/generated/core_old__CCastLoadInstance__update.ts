// core.old.cct / CCastLoadInstance / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "pState"), symbol("done"))) {
  return 1;
  }

  var tStreamStatus = callNamed("getStreamStatus", meProp(_me, "pNetId"));
  if (!lingoTruthy(callNamed("listp", tStreamStatus))) {
  return callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Invalid stream status:", meProp(_me, "pFile")), "/"), tStreamStatus), symbol("update"));
  }

  if (lingoBinary("gt", tStreamStatus.bytesSoFar, 0)) {
  var tBytesSoFar = tStreamStatus.bytesSoFar;
  var tBytesTotal = tStreamStatus.bytesTotal;
  if (lingoBinary("eq", tBytesTotal, 0)) {
  tBytesTotal = tBytesSoFar;
  }

  setMeProp(_me, "pPercent", lingoBinary("div", lingoBinary("mul", float(1), tBytesSoFar), tBytesTotal));
  callMethod("TellStreamState", callNamed("getCastLoadManager"), meProp(_me, "pFile"), meProp(_me, "pState"), meProp(_me, "pPercent"), meProp(_me, "pGroupId"))
  }

  if (lingoBinary("and", lingoBinary("neq", tStreamStatus.bytesSoFar, meProp(_me, "pBytesSoFar")), lingoBinary("gt", tStreamStatus.bytesSoFar, 0))) {
  setMeProp(_me, "pBytesSoFar", tStreamStatus.bytesSoFar);
  setMeProp(_me, "pLoadTime", theProperty("milliSeconds"));
  } else {
  if (lingoBinary("gt", lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "pLoadTime")), callNamed("getIntVariable", "castload.retry.delay", 10000))) {
  var tErrorMsg = callMethod("solveNetErrorMsg", callNamed("getCastLoadManager"), callNamed("netError", meProp(_me, "pNetId")));
  callNamed("error", _me, lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "Failed network operation:", "\r"), meProp(_me, "pURL")), "\r"), tErrorMsg), symbol("update"))
  setMeProp(_me, "ptryCount", lingoBinary("add", meProp(_me, "ptryCount"), 1));
  setMeProp(_me, "pLoadTime", theProperty("milliSeconds"));
  if (lingoBinary("gt", meProp(_me, "ptryCount"), 2)) {
  callNamed("put", lingoBinary("joinPad", "Reactivating", meProp(_me, "pURL")))
  return callMethod("Activate", _me);
  }

  }

  }

  if (lingoBinary("and", lingoBinary("eq", tStreamStatus.url, ""), lingoBinary("neq", tStreamStatus.state, "Complete"))) {
  if (lingoBinary("gt", lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "pLoadTime")), callNamed("getIntVariable", "castload.retry.delay", 10000))) {
  callNamed("error", _me, lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Castload misbehavior, URL for file", "\""), meProp(_me, "pFile")), "\""), "is now EMPTY!"), symbol("update"))
  return callMethod("Activate", _me);
  }

  }

  if (lingoBinary("and", lingoBinary("neq", tStreamStatus.error, ""), lingoBinary("neq", tStreamStatus.error, "OK"))) {
  setMeProp(_me, "pState", symbol("error"));
  }

  if (lingoBinary("and", callNamed("netDone", meProp(_me, "pNetId")), lingoBinary("neq", meProp(_me, "pState"), symbol("error")))) {
  setMeProp(_me, "pPercent", float(1));
  setMeProp(_me, "pState", symbol("done"));
  callMethod("DoneCurrentDownLoad", callNamed("getCastLoadManager"), meProp(_me, "pFile"), meProp(_me, "pURL"), meProp(_me, "pGroupId"), meProp(_me, "pState"))
  }

}

