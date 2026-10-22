// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Connection Manager Class / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setThePropOf(_me, "pItemList", new LingoList([]));
  callMethod("sort", _me.pItemList)
  setMeProp(_me, "pListenerList", new LingoPropList([]));
  callMethod("sort", meProp(_me, "pListenerList"))
  setMeProp(_me, "pCommandsList", new LingoPropList([]));
  callMethod("sort", meProp(_me, "pCommandsList"))
  setMeProp(_me, "pClassString", "connection.instance.class");
  return 1;
}

