// core.old.cct / Download API / CreateDownloadManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateDownloadManager(_me: LingoMe) {
  return callNamed("createManager", symbol("download_manager"), callNamed("GetClsVariable", "download.manager.class"));
}

