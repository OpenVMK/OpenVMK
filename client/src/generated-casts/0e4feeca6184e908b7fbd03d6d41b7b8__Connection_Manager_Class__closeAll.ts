// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Connection Manager Class / closeAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function closeAll(_me: LingoMe) {
  for (var i = 1; i <= _me.pItemList.count; ++i) {
  if (callNamed("objectExists", _me.pItemList[i])) {
  callNamed("removeObject", _me.pItemList[i])
  }

  }

  setThePropOf(_me, "pItemList", new LingoList([]));
}

