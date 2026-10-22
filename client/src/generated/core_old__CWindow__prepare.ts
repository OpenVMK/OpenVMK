// core.old.cct / CWindow / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "pScaleFlagH")) {
  var tOffX = lingoBinary("sub", theProperty("mouseH"), meProp(_me, "pScaleOffset")[1]);
  } else {
  tOffX = 0;
  }

  if (meProp(_me, "pScaleFlagV")) {
  var tOffY = lingoBinary("sub", theProperty("mouseV"), meProp(_me, "pScaleOffset")[2]);
  } else {
  tOffY = 0;
  }

  setMeProp(_me, "pScaleOffset", theProperty("mouseLoc"));
  if (lingoBinary("lt", lingoBinary("add", meProp(_me, "pwidth"), tOffX), 64)) {
  tOffX = lingoBinary("sub", 64, meProp(_me, "pwidth"));
  }

  if (lingoBinary("lt", lingoBinary("add", meProp(_me, "pheight"), tOffY), 64)) {
  tOffY = lingoBinary("sub", 64, meProp(_me, "pheight"));
  }

  callMethod("ResizeBy", _this, tOffX, tOffY)
}

