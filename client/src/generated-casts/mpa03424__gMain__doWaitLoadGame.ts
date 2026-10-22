// mpa03424.dcr / gMain / doWaitLoadGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function doWaitLoadGame(_me: LingoMe) {
  /* global */ var gGlobal = globalVar("gGlobal");
  var tStat = callNamed("getStreamStatus", meProp(_me, "pNetVal"));
  if (lingoBinary("eq", theProperty("runMode"), "author")) {
  setThePropOf(_global, "testLoad", lingoBinary("add", _global.testLoad, 10));
  tStat = new LingoPropList([symbol("bytesSoFar"), _global.testLoad, symbol("bytesTotal"), 120, symbol("state"), "Complete"]);
  }

  if (lingoBinary("eq", tStat[symbol("bytesSoFar")], 0)) {
  return;
  }

  var loadStatus = lingoBinary("mul", lingoBinary("div", lingoBinary("mul", tStat[symbol("bytesSoFar")], float(1)), tStat[symbol("bytesTotal")]), float(1));
  if (lingoBinary("gt", loadStatus, 1)) {
  loadStatus = 1;
  }

  if (lingoBinary("lt", meProp(_me, "pLoadTime"), 120)) {
  var tMax = lingoBinary("div", meProp(_me, "pLoadTime"), float(120));
  if (lingoBinary("gt", loadStatus, tMax)) {
  loadStatus = lingoBinary("div", lingoBinary("mul", lingoBinary("div", meProp(_me, "pLoadTime"), 15), 15), float(120));
  } else {
  callNamed("nothing")
  }

  }

  if (callMethod("checkDone", meProp(_me, "pSign"))) {
  callMethod("makeLoadBar", _me, lingoBinary("div", loadStatus, float(2)))
  }

  if (lingoBinary("and", lingoBinary("and", lingoBinary("eq", tStat[symbol("state")], "Complete"), lingoBinary("gt", meProp(_me, "pLoadTime"), 100)), callMethod("checkDone", meProp(_me, "pSign")))) {
  setMeProp(_me, "pStatus", symbol("done"));
  callNamed("go", "continue")
  }

}

