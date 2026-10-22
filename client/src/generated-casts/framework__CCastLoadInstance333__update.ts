// framework.dcr / CCastLoadInstance333 / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (lingoBinary("eq", _me.pState, symbol("done"))) {
  return 1;
  }

  var tStreamStatus = callNamed("getStreamStatus", _me.pNetId);
  if ((lingoTruthy(callNamed("listp", tStreamStatus)) ? 0 : 1)) {
  return callNamed("error", _me, lingoBinary("join", lingoBinary("join", lingoBinary("join", "Invalid stream status:", _me.pFile), "/"), tStreamStatus), symbol("update"));
  }

  if (lingoBinary("gt", tStreamStatus.bytesSoFar, 0)) {
  var tBytesSoFar = tStreamStatus.bytesSoFar;
  var tBytesTotal = tStreamStatus.bytesTotal;
  if (lingoBinary("eq", tBytesTotal, 0)) {
  tBytesTotal = tBytesSoFar;
  }

  setThePropOf(_me, "pPercent", lingoBinary("div", lingoBinary("mul", 1, tBytesSoFar), tBytesTotal));
  callNamed("TellStreamState", callNamed("getCastLoadManager"), _me.pFile, _me.pState, _me.pPercent, _me.pGroupId)
  }

  if (lingoBinary("and", lingoBinary("gt", tStreamStatus.bytesSoFar, 0), lingoBinary("neq", tStreamStatus.bytesSoFar, _me.pBytesSoFar))) {
  setThePropOf(_me, "pBytesSoFar", tStreamStatus.bytesSoFar);
  setThePropOf(_me, "pLoadTime", theProperty("milliSeconds"));
  } else {
  if (lingoBinary("gt", lingoBinary("sub", theProperty("milliSeconds"), _me.pLoadTime), callNamed("getIntVariable", "castload.retry.delay", 10000))) {
  var tErrorMsg = callNamed("solveNetErrorMsg", callNamed("getCastLoadManager"), callNamed("netError", _me.pNetId));
  callNamed("error", _me, lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "Failed network operation:", "[[RETURN]]"), _me.pURL), "[[RETURN]]"), tErrorMsg), symbol("update"))
  setThePropOf(_me, "ptryCount", lingoBinary("add", _me.ptryCount, 1));
  setThePropOf(_me, "pLoadTime", theProperty("milliSeconds"));
  if (lingoBinary("gt", _me.ptryCount, 2)) {
  callNamed("put", lingoBinary("join", "Reactivating", _me.pURL))
  return callNamed("Activate", _me);
  }

  }

  }

  if (lingoBinary("and", lingoBinary("neq", tStreamStatus.state, "Complete"), lingoBinary("eq", tStreamStatus.url, ""))) {
  if (lingoBinary("gt", lingoBinary("sub", theProperty("milliSeconds"), _me.pLoadTime), callNamed("getIntVariable", "castload.retry.delay", 10000))) {
  callNamed("error", _me, lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "Castload misbehavior, URL for file", "[[QUOTE]]"), _me.pFile), "[[QUOTE]]"), "is now EMPTY!"), symbol("update"))
  return callNamed("Activate", _me);
  }

  }

  if (lingoBinary("and", lingoBinary("neq", tStreamStatus.error, "OK"), lingoBinary("neq", tStreamStatus.error, ""))) {
  setThePropOf(_me, "pState", symbol("error"));
  }

  if (lingoBinary("and", lingoBinary("neq", _me.pState, symbol("error")), callNamed("netDone", _me.pNetId))) {
  setThePropOf(_me, "pPercent", 1);
  setThePropOf(_me, "pState", symbol("done"));
  callNamed("DoneCurrentDownLoad", callNamed("getCastLoadManager"), _me.pFile, _me.pURL, _me.pGroupId, _me.pState)
  }

}

