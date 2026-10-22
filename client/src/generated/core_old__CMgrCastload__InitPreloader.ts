// core.old.cct / CMgrCastload / InitPreloader

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitPreloader(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "pWaitList", new LingoPropList([]));
  setMeProp(_me, "pTaskList", new LingoPropList([]));
  setMeProp(_me, "pAvailableDynCasts", new LingoPropList([]));
  setMeProp(_me, "pPermanentLevelList", new LingoPropList([]));
  setMeProp(_me, "pCurrentDownLoads", new LingoPropList([]));
  setMeProp(_me, "pLatestTaskID", "");
  for (var f = 1; f <= theProperty("number of castLibs"); ++f) {
  var tCastNumber = callMethod("FindCastNumber", _this, lingoBinary("joinPad", meProp(_me, "pNullCastName"), f));
  if (lingoBinary("gt", tCastNumber, 0)) {
  callMethod("addProp", meProp(_me, "pAvailableDynCasts"), lingoBinary("joinPad", meProp(_me, "pNullCastName"), f), tCastNumber)
  }

  }

  return 1;
}

