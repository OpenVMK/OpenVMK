// vmk_monorail_station_handler.cct / CAnimateMonorail / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (meProp(_me, "pAnimating")) {
  if (lingoBinary("lt", meProp(_me, "pIndex"), meProp(_me, "pCurrentAnimation").vertexCount)) {
  for (var tMem of meProp(_me, "mAnimationMembers").toArray()) {
  var tX = meProp(_me, "pCurrentAnimation").x[meProp(_me, "pIndex")];
  var tY = meProp(_me, "pCurrentAnimation").y[meProp(_me, "pIndex")];
  setThePropOf(tMem.member, "regPoint", lingoBinary("add", lingoBinary("sub", tMem.regPoint, callNamed("point", tX, tY)), meProp(_me, "pOffset")));
  }

  setMeProp(_me, "pIndex", lingoBinary("add", meProp(_me, "pIndex"), 1));
  } else {
  setMeProp(_me, "pAnimating", 0);
  }

  }

}

