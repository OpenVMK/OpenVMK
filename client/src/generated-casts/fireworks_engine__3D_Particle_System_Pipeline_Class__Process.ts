// fireworks_engine.cct / 3D Particle System Pipeline Class / Process

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
  for (var i = 1; i <= callMethod("count", t_data); ++i) {
  var t_viewSpace = callMethod("transformToViewSpace", meProp(_me, "view"), callMethod("getPosition", t_data[i]));
  if (callMethod("testClip", meProp(_me, "view"), t_viewSpace)) {
  callMethod("append", t_lOutput, new LingoList([callMethod("getSpriteRef", t_data[i]), callMethod("transformToProjected", meProp(_me, "view"), t_viewSpace)]))
  }

  }

  return t_lOutput;
}

