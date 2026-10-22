// fireworks_engine.cct / Clipping 3D Pipeline Class / Process

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Process(_me: LingoMe, t_data: LingoValue) {
  var t_lOutput = new LingoList([]);
  for (var tVertex of t_data.toArray()) {
  var t_viewSpace = callMethod("transformToViewSpace", meProp(_me, "view"), tVertex);
  if (callMethod("testClip", meProp(_me, "view"), t_viewSpace)) {
  callMethod("append", t_lOutput, callMethod("transformToProjected", meProp(_me, "view"), t_viewSpace))
  }

  }

  return t_lOutput;
}

