// core.old.cct / CWindowXML / moveBy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveBy(_me: LingoMe, _this: LingoValue, a_iOffX: LingoValue, a_iOffY: LingoValue) {
  if (lingoBinary("lt", lingoBinary("add", meProp(_me, "pLocX"), a_iOffX), meProp(_me, "pBoundary")[1])) {
  a_iOffX = lingoBinary("sub", meProp(_me, "pBoundary")[1], meProp(_me, "pLocX"));
  }

  if (lingoBinary("lt", lingoBinary("add", meProp(_me, "pLocY"), a_iOffY), meProp(_me, "pBoundary")[2])) {
  a_iOffY = lingoBinary("sub", meProp(_me, "pBoundary")[2], meProp(_me, "pLocY"));
  }

  if (lingoBinary("gt", lingoBinary("add", lingoBinary("add", meProp(_me, "pLocX"), meProp(_me, "pwidth")), a_iOffX), meProp(_me, "pBoundary")[3])) {
  a_iOffX = lingoBinary("sub", lingoBinary("sub", meProp(_me, "pBoundary")[3], meProp(_me, "pLocX")), meProp(_me, "pwidth"));
  }

  if (lingoBinary("gt", lingoBinary("add", lingoBinary("add", meProp(_me, "pLocY"), meProp(_me, "pheight")), a_iOffY), meProp(_me, "pBoundary")[4])) {
  a_iOffY = lingoBinary("sub", lingoBinary("sub", meProp(_me, "pBoundary")[4], meProp(_me, "pLocY")), meProp(_me, "pheight"));
  }

  setMeProp(_me, "pLocX", lingoBinary("add", meProp(_me, "pLocX"), a_iOffX));
  setMeProp(_me, "pLocY", lingoBinary("add", meProp(_me, "pLocY"), a_iOffY));
  callMethod("moveXY", _this, a_iOffX, a_iOffY)
}

