// core.old.cct / CCastLoadTask / UpdateTaskPercent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateTaskPercent(_me: LingoMe, tInstancePercent: LingoValue, tFile: LingoValue) {
  setMeProp(_me, "pTmpLoadCount", lingoBinary("add", meProp(_me, "pTmpLoadCount"), 1));
  setMeProp(_me, "pTempPercent", lingoBinary("add", meProp(_me, "pTempPercent"), tInstancePercent));
  if (lingoBinary("eq", meProp(_me, "pTmpLoadCount"), meProp(_me, "pCurLoadCount"))) {
  var tTemp = lingoBinary("div", lingoBinary("mul", float(1), lingoBinary("add", meProp(_me, "pTempPercent"), meProp(_me, "pLoadedSoFar"))), meProp(_me, "pCastcount"));
  if (lingoBinary("and", lingoBinary("lte", tTemp, float(1)), lingoBinary("lte", meProp(_me, "pLastPercent"), tTemp))) {
  setMeProp(_me, "pCurrPercent", tTemp);
  } else {
  setMeProp(_me, "pCurrPercent", meProp(_me, "pLastPercent"));
  }

  }

}

