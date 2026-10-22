// core.old.cct / CWindowDropDown / RotateQuad

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RotateQuad(_me: LingoMe, tDestquad: LingoValue, tClockwise: LingoValue) {
  var tPoint1 = tDestquad[1];
  var tPoint2 = tDestquad[2];
  var tPoint3 = tDestquad[3];
  var tPoint4 = tDestquad[4];
  if (lingoBinary("eq", tClockwise, 1)) {
  tDestquad = new LingoList([tPoint2, tPoint3, tPoint4, tPoint1]);
  } else {
  tDestquad = new LingoList([tPoint4, tPoint1, tPoint2, tPoint3]);
  }

  return tDestquad;
}

