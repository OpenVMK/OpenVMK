// fda7c1aad86c08c12d1a13ae95116821.cct / RoomMath / PntInsideTile

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PntInsideTile(_me: LingoMe, a_ptTest: LingoValue, a_ptScr: LingoValue, a_iSize: LingoValue) {
  if (callNamed("PntInsideTri", a_ptTest, lingoBinary("add", a_ptScr, callNamed("point", -float(a_iSize), 0)), lingoBinary("add", a_ptScr, callNamed("point", 0, lingoBinary("div", -float(a_iSize), 2))), lingoBinary("add", a_ptScr, callNamed("point", a_iSize, 0)))) {
  return 1;
  }

  if (callNamed("PntInsideTri", a_ptTest, lingoBinary("add", a_ptScr, callNamed("point", -float(a_iSize), 0)), lingoBinary("add", a_ptScr, callNamed("point", 0, lingoBinary("div", a_iSize, 2))), lingoBinary("add", a_ptScr, callNamed("point", a_iSize, 0)))) {
  return 1;
  }

  return 0;
}

