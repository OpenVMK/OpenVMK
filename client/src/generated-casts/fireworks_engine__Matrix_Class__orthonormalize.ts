// fireworks_engine.cct / Matrix Class / orthonormalize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function orthonormalize(_me: LingoMe, keep: LingoValue) {
  switch (keep) {
case symbol("right"):
case undefined:
  var tX = callMethod("getRight", _me);
  var tY = callMethod("getUp", _me);
  tY = lingoBinary("sub", tY, lingoBinary("mul", tX, callMethod("dot", tY, tX)));
  callMethod("normalize", tY)
  var tZ = callMethod("getForward", _me);
  tZ = lingoBinary("sub", lingoBinary("sub", tZ, lingoBinary("mul", tX, callMethod("dot", tZ, tX))), lingoBinary("mul", tY, callMethod("dot", tZ, tY)));
  callMethod("normalize", tZ)
  callMethod("setRight", _me, tX)
  callMethod("setup", _me, tY)
  callMethod("setForward", _me, tZ)
  break;
case symbol("up"):
  tY = callMethod("getUp", _me);
  tZ = callMethod("getForward", _me);
  tZ = lingoBinary("sub", tZ, lingoBinary("mul", tY, callMethod("dot", tZ, tY)));
  callMethod("normalize", tZ)
  tX = callMethod("getRight", _me);
  tX = lingoBinary("sub", lingoBinary("sub", tX, lingoBinary("mul", tY, callMethod("dot", tX, tY))), lingoBinary("mul", tZ, callMethod("dot", tX, tZ)));
  callMethod("normalize", tX)
  callMethod("setRight", _me, tX)
  callMethod("setup", _me, tY)
  callMethod("setForward", _me, tZ)
  break;
case symbol("forward"):
  tZ = callMethod("getForward", _me);
  tX = callMethod("getRight", _me);
  tX = lingoBinary("sub", tX, lingoBinary("mul", tZ, callMethod("dot", tX, tZ)));
  callMethod("normalize", tX)
  tY = callMethod("getUp", _me);
  tY = lingoBinary("sub", lingoBinary("sub", tY, lingoBinary("mul", tZ, callMethod("dot", tY, tZ))), lingoBinary("mul", tX, callMethod("dot", tY, tX)));
  callMethod("normalize", tY)
  callMethod("setRight", _me, tX)
  callMethod("setup", _me, tY)
  callMethod("setForward", _me, tZ)
  break;
  break;
  }

}

