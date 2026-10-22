// core.old.cct / CMgrDownload / eraseDownloadedItems

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eraseDownloadedItems(_me: LingoMe) {
  for (var i = 1; i <= meProp(_me, "pReceivedTasks").count; ++i) {
  callNamed("removeMember", meProp(_me, "pReceivedTasks")[i])
  }

  return 1;
}

