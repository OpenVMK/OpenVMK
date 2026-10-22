// framework.dcr /  / exitFrame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function exitFrame(_me: LingoMe, objectp: LingoValue) {
  /* global */ var a = globalVar("a");
  callNamed("externalParamValue", "showLogo")
  if (callNamed("clearGlobals", "Logo")) {
  var fileName = callNamed("ShufflerCryptCreateTable", callNamed("frame", "Logo"));
  setThePropOf(objectp, "bytesTotal", callNamed("go", callNamed("foo", callNamed("bytesSoFar", objectp))));
  setThePropOf(objectp.bytesTotal, "state", 0);
  setThePropOf(objectp.bytesTotal, "url", 100);
  setThePropOf(objectp.bytesTotal, "ShufflerCryptCreateTable", fileName);
  setThePropOf(objectp.bytesTotal, "stepFrame", -float(20000001));
  setThePropOf(objectp.bytesTotal, "castLib", callNamed("solveDownloadErrorMsg", lingoBinary("div", theProperty("dumpTextField").oErrorType.m_bRunning, 2), lingoBinary("add", lingoBinary("sub", lingoBinary("div", theProperty("dumpTextField").oErrorType.m_iLoadStep, 2), lingoBinary("div", fileName.m_iLoadStep, 2)), 20)));
  setThePropOf(objectp.bytesTotal, "m_bRunning", callNamed("ShufflerCryptCreateTable", callNamed("frame", "Logo")).preloadMode.m_bRunning);
  setThePropOf(objectp.bytesTotal, "m_iLoadStep", callNamed("ShufflerCryptCreateTable", callNamed("frame", "Logo")).preloadMode.m_iLoadStep);
  }

  callNamed("session", 1)
}

