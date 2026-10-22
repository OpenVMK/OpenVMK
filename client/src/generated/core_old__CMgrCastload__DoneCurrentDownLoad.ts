// core.old.cct / CMgrCastload / DoneCurrentDownLoad

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DoneCurrentDownLoad(_me: LingoMe, _this: LingoValue, tFile: LingoValue, tURL: LingoValue, tID: LingoValue, tstate: LingoValue) {
  if (lingoBinary("neq", tstate, symbol("error"))) {
  var tCastNumber = callMethod("getAvailableEmptyCast", _this);
  if (lingoBinary("gt", tCastNumber, 0)) {
  var tCastName = tFile;
  callMethod("setImportedCast", _this, tCastNumber, tCastName, tURL)
  }

  }

  callMethod("OneCastDone", meProp(_me, "pTaskList")[tID], tFile)
  callMethod("changeLoadingCount", meProp(_me, "pTaskList")[tID], -float(1))
  callMethod("removeCastLoadTask", _this, tID)
  if (callNamed("voidp", meProp(_me, "pCurrentDownLoads")[tFile])) {
  return callNamed("error", _this, lingoBinary("joinPad", "CastLoad task was lost!", tFile), symbol("DoneCurrentDownLoad"));
  }

  callMethod("deconstruct", meProp(_me, "pCurrentDownLoads")[tFile])
  callMethod("delay", _this, 50, symbol("removeCastLoadInstance"), tFile)
  return 1;
}

