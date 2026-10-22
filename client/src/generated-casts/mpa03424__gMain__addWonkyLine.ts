// mpa03424.dcr / gMain / addWonkyLine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addWonkyLine(_me: LingoMe, inImg: LingoValue, inColor: LingoValue, inPoint: LingoValue, inL: LingoValue) {
  /* global */ var gGlobal = globalVar("gGlobal");
  for (var x = 1; x <= 4; ++x) {
  meProp(_me, "pWonkyLine").vertex[x] = callNamed("point", inL[x][1], inL[x][2]);
  }

  var tAdd = meProp(_me, "pWonkyLine").image;
  callNamed("addImage", inImg, tAdd, inPoint, new LingoPropList([symbol("color"), inColor]))
}

