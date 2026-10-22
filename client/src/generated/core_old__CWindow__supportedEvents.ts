// core.old.cct / CWindow / supportedEvents

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function supportedEvents(_me: LingoMe) {
  var tList = new LingoList([]);
  callMethod("add", tList, symbol("mouseEnter"))
  callMethod("add", tList, symbol("mouseLeave"))
  callMethod("add", tList, symbol("mouseWithin"))
  callMethod("add", tList, symbol("mouseDown"))
  callMethod("add", tList, symbol("mouseUp"))
  callMethod("add", tList, symbol("mouseUpOutSide"))
  callMethod("add", tList, symbol("keyDown"))
  callMethod("add", tList, symbol("keyUp"))
  return tList;
}

