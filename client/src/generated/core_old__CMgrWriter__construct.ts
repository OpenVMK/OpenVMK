// core.old.cct / CMgrWriter / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "pWriterClass", callNamed("getClassVariable", "writer.instance.class"));
  setMeProp(_me, "pPlainStruct", callNamed("getStructVariable", "struct.font.plain"));
  setMeProp(_me, "pItemList", new LingoPropList([]));
  return 1;
}

