// core.old.cct / CVisualizerXML / moveBy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveBy(_me: LingoMe, tOffX: LingoValue, tOffY: LingoValue) {
  if (lingoBinary("lt", lingoBinary("add", meProp(_me, "pLocX"), tOffX), meProp(_me, "pBoundary")[1])) {
  tOffX = lingoBinary("sub", meProp(_me, "pBoundary")[1], meProp(_me, "pLocX"));
  }

  if (lingoBinary("lt", lingoBinary("add", meProp(_me, "pLocY"), tOffY), meProp(_me, "pBoundary")[2])) {
  tOffY = lingoBinary("sub", meProp(_me, "pBoundary")[2], meProp(_me, "pLocY"));
  }

  if (lingoBinary("gt", lingoBinary("add", lingoBinary("add", meProp(_me, "pLocX"), meProp(_me, "pwidth")), tOffX), meProp(_me, "pBoundary")[3])) {
  tOffX = lingoBinary("sub", lingoBinary("sub", meProp(_me, "pBoundary")[3], meProp(_me, "pLocX")), meProp(_me, "pwidth"));
  }

  if (lingoBinary("gt", lingoBinary("add", lingoBinary("add", meProp(_me, "pLocY"), meProp(_me, "pheight")), tOffY), meProp(_me, "pBoundary")[4])) {
  tOffY = lingoBinary("sub", lingoBinary("sub", meProp(_me, "pBoundary")[4], meProp(_me, "pLocY")), meProp(_me, "pheight"));
  }

  setMeProp(_me, "pLocX", lingoBinary("add", meProp(_me, "pLocX"), tOffX));
  setMeProp(_me, "pLocY", lingoBinary("add", meProp(_me, "pLocY"), tOffY));
  callMethod("moveXY", _me, tOffX, tOffY)
}

