// mpa03424.dcr / movie events / smoothTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function smoothTo(_me: LingoMe, iFrom: LingoValue, iTo: LingoValue, iSpeed: LingoValue) {
  /* global */ var gMain = globalVar("gMain");
  /* global */ var gGlobal = globalVar("gGlobal");
  var tFrom = iFrom;
  iFrom = lingoBinary("add", iFrom, lingoBinary("div", lingoBinary("sub", iTo, iFrom), iSpeed));
  if (lingoBinary("and", lingoBinary("eq", iFrom, tFrom), lingoBinary("lt", iFrom, iTo))) {
  iFrom = lingoBinary("add", iFrom, 1);
  }

  if (lingoBinary("and", lingoBinary("eq", iFrom, tFrom), lingoBinary("gt", iFrom, iTo))) {
  iFrom = lingoBinary("sub", iFrom, 1);
  }

  return iFrom;
}

