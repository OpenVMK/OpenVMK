// core.old.cct / CVisualizer / Refresh

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Refresh(_me: LingoMe) {
  var tRect = callNamed("rect", 100000, 100000, -float(100000), -float(100000));
  for (var tSpr of meProp(_me, "pSpriteList").toArray()) {
  if (lingoBinary("lt", tSpr.locH, tRect[1])) {
  tRect[1] = tSpr.locH;
  }

  if (lingoBinary("lt", tSpr.locV, tRect[2])) {
  tRect[2] = tSpr.locV;
  }

  if (lingoBinary("gt", lingoBinary("add", tSpr.locH, tSpr.width), tRect[3])) {
  tRect[3] = lingoBinary("add", tSpr.locH, tSpr.width);
  }

  if (lingoBinary("gt", lingoBinary("add", tSpr.locV, tSpr.height), tRect[4])) {
  tRect[4] = lingoBinary("add", tSpr.locV, tSpr.height);
  }

  }

  setMeProp(_me, "pLocX", tRect[1]);
  setMeProp(_me, "pLocY", tRect[2]);
  setMeProp(_me, "pwidth", tRect.width);
  setMeProp(_me, "pheight", tRect.height);
  if (lingoBinary("gt", meProp(_me, "pSpriteData").count, 0)) {
  for (var i = 1; i <= meProp(_me, "pSpriteList").count; ++i) {
  meProp(_me, "pSpriteData")[i][symbol("loc")] = lingoBinary("sub", meProp(_me, "pSpriteList")[i].loc, new LingoList([tRect[1], tRect[2]]));
  }

  }

  return 1;
}

