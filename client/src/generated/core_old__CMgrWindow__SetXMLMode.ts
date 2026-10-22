// core.old.cct / CMgrWindow / SetXMLMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetXMLMode(_me: LingoMe, _this: LingoValue) {
  setThePropOf(_this, "pInstanceClass", callNamed("GetClsVariable", "window.instance.xml.class"));
}

