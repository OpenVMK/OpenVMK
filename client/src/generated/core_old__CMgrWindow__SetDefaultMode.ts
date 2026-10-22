// core.old.cct / CMgrWindow / SetDefaultMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetDefaultMode(_me: LingoMe, _this: LingoValue) {
  setThePropOf(_this, "pInstanceClass", callNamed("GetClsVariable", "window.instance.class"));
}

