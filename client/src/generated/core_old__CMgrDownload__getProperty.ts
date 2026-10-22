// core.old.cct / CMgrDownload / getProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getProperty(_me: LingoMe, tPropID: LingoValue) {
  switch (tPropID) {
case symbol("curTaskCount"):
  return lingoBinary("add", meProp(_me, "pTaskQueue").count, meProp(_me, "pActiveTasks").count);
case symbol("actTaskCount"):
  return meProp(_me, "pActiveTasks").count;
case symbol("maxTaskCount"):
  return callNamed("getIntVariable", "net.operation.count");
case symbol("defaultURL"):
  return meProp(_me, "pDefaultURL");
  }

  return 0;
}

