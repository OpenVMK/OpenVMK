// core.old.cct / CDownload / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "pStatus"), symbol("LOADING"))) {
  return 0;
  }

  var tStreamStatus = callNamed("getStreamStatus", meProp(_me, "pNetId"));
  if (callNamed("listp", tStreamStatus)) {
  var tBytesSoFar = tStreamStatus[symbol("bytesSoFar")];
  var tBytesTotal = tStreamStatus[symbol("bytesTotal")];
  if (lingoBinary("eq", tBytesTotal, 0)) {
  tBytesTotal = tBytesSoFar;
  }

  if (lingoBinary("gt", tStreamStatus[symbol("bytesSoFar")], 0)) {
  setMeProp(_me, "pPercent", lingoBinary("div", lingoBinary("mul", float(1), tBytesSoFar), tBytesTotal));
  }

  }

  if (lingoBinary("eq", callNamed("netDone", meProp(_me, "pNetId")), 1)) {
  if (lingoBinary("eq", callNamed("netError", meProp(_me, "pNetId")), "OK")) {
  callMethod("importFileToCast", _me, meProp(_me, "pURL"))
  callMethod("removeActiveTask", callNamed("getDownloadManager"), meProp(_me, "pMemName"), meProp(_me, "pCallBack"))
  setMeProp(_me, "pStatus", symbol("complete"));
  return 1;
  } else {
  var tError = callMethod("solveNetErrorMsg", callNamed("getDownloadManager"), callNamed("netError", meProp(_me, "pNetId")));
  callNamed("error", _me, lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "Download error:", "\r"), meProp(_me, "pMemName")), "\r"), tError), symbol("update"))
  switch (callNamed("netError", meProp(_me, "pNetId"))) {
case 6:
case 4159:
case 4165:
  if (!lingoTruthy(lingoBinary("contains", meProp(_me, "pURL"), callMethod("getProperty", callNamed("getDownloadManager"), symbol("defaultURL"))))) {
  setMeProp(_me, "pURL", lingoBinary("join", callMethod("getProperty", callNamed("getDownloadManager"), symbol("defaultURL")), meProp(_me, "pURL")));
  callMethod("Activate", _me)
  } else {
  callMethod("removeActiveTask", callNamed("getDownloadManager"), meProp(_me, "pMemName"), meProp(_me, "pCallBack"))
  }

  break;
case 4242:
  return callMethod("removeActiveTask", callNamed("getDownloadManager"), meProp(_me, "pMemName"), meProp(_me, "pCallBack"));
case 4155:
  callNamed("nothing")
  break;
case 4836:
  var tTryCount = meProp(_me, "ptryCount");
  if (lingoBinary("gte", meProp(_me, "ptryCount"), 5)) {
  if (lingoBinary("contains", meProp(_me, "pURL"), "?")) {
  var tParamDelim = "&";
  } else {
  tParamDelim = "?";
  }

  var t_bOnline = 0;
  if (lingoBinary("contains", theProperty("moviePath"), "http://")) {
  t_bOnline = 1;
  } else {
  if (lingoBinary("contains", meProp(_me, "pURL"), "http://")) {
  t_bOnline = 1;
  }

  }

  if (t_bOnline) {
  setMeProp(_me, "pURL", lingoBinary("join", lingoBinary("join", meProp(_me, "pURL"), tParamDelim), theProperty("milliSeconds")));
  }

  }

  callMethod("Activate", _me)
  setMeProp(_me, "ptryCount", tTryCount);
  break;
  break;
  break;
  }

  setMeProp(_me, "ptryCount", lingoBinary("add", meProp(_me, "ptryCount"), 1));
  if (lingoBinary("gt", meProp(_me, "ptryCount"), callNamed("getIntVariable", "download.retry.count", 10))) {
  callMethod("removeActiveTask", callNamed("getDownloadManager"), meProp(_me, "pMemName"), meProp(_me, "pCallBack"))
  return callNamed("error", _me, lingoBinary("join", lingoBinary("join", "Download failed:", "\r"), meProp(_me, "pURL")), symbol("update"));
  }

  }

  }

}

