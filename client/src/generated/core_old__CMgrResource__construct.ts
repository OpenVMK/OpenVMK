// core.old.cct / CMgrResource / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pAllMemNumList", new LingoPropList([]));
  callMethod("sort", meProp(_me, "pAllMemNumList"))
  setMeProp(_me, "pDynMemNumList", new LingoList([]));
  callMethod("sort", meProp(_me, "pDynMemNumList"))
  setMeProp(_me, "pBmpMemNumList", new LingoList([]));
  callMethod("sort", meProp(_me, "pBmpMemNumList"))
  setMeProp(_me, "pBin", callNamed("getVariable", "dynamic.bin.cast", "bin"));
  setMeProp(_me, "pLegalDuplicates", new LingoList([]));
  callMethod("add", meProp(_me, "pLegalDuplicates"), callNamed("getVariable", "thread.index.field"))
  callMethod("add", meProp(_me, "pLegalDuplicates"), callNamed("getVariable", "alias.index.field"))
  callMethod("add", meProp(_me, "pLegalDuplicates"), callNamed("getVariable", "texts.index.field"))
  callMethod("add", meProp(_me, "pLegalDuplicates"), callNamed("getVariable", "props.index.field"))
  callMethod("add", meProp(_me, "pLegalDuplicates"), callNamed("getVariable", "service.index.field"))
  if (lingoBinary("contains", theProperty("runMode"), "Author")) {
  callMethod("emptyDynamicBin", _me)
  }

  return 1;
}

