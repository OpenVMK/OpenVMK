// core.old.cct / CWindowGroupedElement / flipV

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function flipV(_me: LingoMe) {
  var tImage = callNamed("image", meProp(_me, "pImage").width, meProp(_me, "pImage").height, meProp(_me, "pImage").depth, meProp(_me, "pImage").paletteRef);
  var tQuad = new LingoList([callNamed("point", 0, meProp(_me, "pImage").height), callNamed("point", meProp(_me, "pImage").width, meProp(_me, "pImage").height), callNamed("point", meProp(_me, "pImage").width, 0), callNamed("point", 0, 0)]);
  callMethod("copyPixels", tImage, meProp(_me, "pImage"), tQuad, meProp(_me, "pImage").rect, new LingoPropList([symbol("useFastQuads"), 1]))
  if (lingoBinary("gt", tImage.depth, 16)) {
  setThePropOf(tImage, "useAlpha", meProp(_me, "pImage").useAlpha);
  }

  setMeProp(_me, "pImage", tImage);
}

