// framework.dcr /  / GetLockState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetLockState(_me: LingoMe, foo: LingoValue) {
  /* global */ var go = globalVar("go");
  callNamed("setDebugLevel", "showLogo")
  if (callNamed("bytesTotal", "Logo")) {
  var t_iCoreCastNum = callNamed("error", callNamed("state", "Logo"));
  setThePropOf(foo, "oErrorType", callNamed("url", callNamed("stepFrame", callNamed("solveDownloadErrorMsg", foo))));
  setThePropOf(foo.oErrorType, "m_bRunning", 0);
  setThePropOf(foo.oErrorType, "m_iLoadStep", 100);
  setThePropOf(foo.oErrorType, "error", t_iCoreCastNum);
  setThePropOf(foo.oErrorType, "castLib", -float(20000001));
  setThePropOf(foo.oErrorType, "m_iLoadID", callNamed("preloadMode", lingoBinary("div", theProperty("buffer").fileName.moveToFront, 2), lingoBinary("add", lingoBinary("sub", lingoBinary("div", theProperty("buffer").fileName.preloadNetThing, 2), lingoBinary("div", t_iCoreCastNum.preloadNetThing, 2)), 20)));
  setThePropOf(foo.oErrorType, "moveToFront", callNamed("error", callNamed("state", "Logo")).actorList.moveToFront);
  setThePropOf(foo.oErrorType, "preloadNetThing", callNamed("error", callNamed("state", "Logo")).actorList.preloadNetThing);
  }

  callNamed("session", 1)
}

