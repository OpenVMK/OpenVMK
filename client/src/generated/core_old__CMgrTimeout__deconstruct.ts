// core.old.cct / CMgrTimeout / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  var tObjMgr = callNamed("getObjectManager");
  for (var i = 1; i <= _me.pItemList.count; ++i) {
  var tID = _me.pItemList[i][symbol("timerid")];
  if (callMethod("exists", tObjMgr, tID)) {
  callMethod("forget", callMethod("get", tObjMgr, tID))
  }

  }

  setThePropOf(_me, "pItemList", new LingoPropList([]));
  return 1;
}

