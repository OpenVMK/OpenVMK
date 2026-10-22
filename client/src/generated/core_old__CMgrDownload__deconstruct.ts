// core.old.cct / CMgrDownload / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  setMeProp(_me, "pTaskQueue", new LingoPropList([]));
  setMeProp(_me, "pActiveTasks", new LingoPropList([]));
  setMeProp(_me, "pReceivedTasks", new LingoList([]));
  setMeProp(_me, "pCompleteTasks", new LingoList([]));
  return 1;
}

