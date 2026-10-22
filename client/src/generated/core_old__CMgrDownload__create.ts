// core.old.cct / CMgrDownload / create

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function create(_me: LingoMe, tURL: LingoValue, tMemName: LingoValue, ttype: LingoValue, tForceFlag: LingoValue) {
  return callNamed("queue", _me, tURL, tMemName, ttype, tForceFlag);
}

