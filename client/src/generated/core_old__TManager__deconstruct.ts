// core.old.cct / TManager / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  var tObjMngr = callNamed("getObjectManager");
  for (var i = 1; i <= meProp(_me, "pItemList").count; ++i) {
  if (callMethod("exists", tObjMngr, meProp(_me, "pItemList")[i])) {
  callMethod("Remove", tObjMngr, meProp(_me, "pItemList")[i])
  }

  }

  setMeProp(_me, "pItemList", new LingoList([]));
  return 1;
}

