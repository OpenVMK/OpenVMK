// mpa03424.dcr / movie events / addImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addImage(_me: LingoMe, inImg: LingoValue, inAdd: LingoValue, inPos: LingoValue, inList: LingoValue) {
  /* global */ var gMain = globalVar("gMain");
  /* global */ var gGlobal = globalVar("gGlobal");
  if (callNamed("voidp", inPos)) {
  inPos = callNamed("point", 0, 0);
  }

  var tRect = inAdd.rect;
  callMethod("copyPixels", inImg, inAdd, lingoBinary("add", tRect, callNamed("rect", inPos[1], inPos[2], inPos[1], inPos[2])), tRect, inList)
}

