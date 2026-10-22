// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraViewFinder / SetOffset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetOffset(_me: LingoMe) {
  var tW = lingoBinary("div", meProp(_me, "cameraLens").width, 2);
  var tH = lingoBinary("div", meProp(_me, "cameraLens").height, 2);
  var tX = callNamed("max", tW, callNamed("min", theProperty("mouseH"), lingoBinary("sub", _movie.stage.rect.width, tW)));
  var tY = callNamed("max", tH, callNamed("min", theProperty("mouseV"), lingoBinary("sub", _movie.stage.rect.height, tH)));
  setMeProp(_me, "pOffset", callNamed("rect", lingoBinary("sub", tX, tW), lingoBinary("sub", tY, tH), lingoBinary("add", tX, tW), lingoBinary("add", tY, tH)));
}

