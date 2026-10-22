// d0e535313898676eb605277339b50f27.cct / HMMickeyDetailsList / padNum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function padNum(_me: LingoMe, numToPad: LingoValue, paddedLength: LingoValue) {
  while (1) {
  if (lingoBinary("lte", lingoBinary("sub", callNamed("power", 10, lingoBinary("sub", paddedLength, 1)), numToPad), 0)) {
  break;
  }

  numToPad = lingoBinary("join", "0", numToPad);
  paddedLength = lingoBinary("sub", paddedLength, 1);
  }

  return numToPad;
}

