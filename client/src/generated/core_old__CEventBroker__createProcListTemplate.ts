// core.old.cct / CEventBroker / createProcListTemplate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createProcListTemplate(_me: LingoMe, _this: LingoValue) {
  var tList = new LingoPropList([]);
  tList[symbol("mouseEnter")] = new LingoList([symbol("null"), 0]);
  tList[symbol("mouseLeave")] = new LingoList([symbol("null"), 0]);
  tList[symbol("mouseWithin")] = new LingoList([symbol("null"), 0]);
  tList[symbol("mouseDown")] = new LingoList([symbol("null"), 0]);
  tList[symbol("mouseUp")] = new LingoList([symbol("null"), 0]);
  tList[symbol("mouseUpOutSide")] = new LingoList([symbol("null"), 0]);
  tList[symbol("keyDown")] = new LingoList([symbol("null"), 0]);
  tList[symbol("keyUp")] = new LingoList([symbol("null"), 0]);
  return tList;
}

