// core.old.cct / CWindowScrollbar / RotateQuad

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RotateQuad(_me: LingoMe, tDestquad: LingoValue, tClockwise: LingoValue) {
  var tPnt1 = tDestquad[1];
  var tPnt2 = tDestquad[2];
  var tPnt3 = tDestquad[3];
  var tPnt4 = tDestquad[4];
  if (tClockwise) {
  return new LingoList([tPnt2, tPnt3, tPnt4, tPnt1]);
  } else {
  return new LingoList([tPnt4, tPnt1, tPnt2, tPnt3]);
  }

}

