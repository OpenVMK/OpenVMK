// core.old.cct / CVisualizer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pTitle", callMethod("getID", _me));
  setMeProp(_me, "pLayout", new LingoList([]));
  setMeProp(_me, "pLocX", 0);
  setMeProp(_me, "pLocY", 0);
  setMeProp(_me, "pLocZ", 0);
  setMeProp(_me, "pwidth", 0);
  setMeProp(_me, "pheight", 0);
  setMeProp(_me, "pVisible", 1);
  setMeProp(_me, "pSpriteList", new LingoList([]));
  setMeProp(_me, "pSpriteData", new LingoList([]));
  setMeProp(_me, "pActSprList", new LingoPropList([]));
  setMeProp(_me, "pDragFlag", 0);
  setMeProp(_me, "pDragOffset", new LingoList([0, 0]));
  setMeProp(_me, "pBoundary", lingoBinary("add", callNamed("rect", 0, 0, theProperty("stage").rect.width, theProperty("stage").rect.height), new LingoList([-float(1000), -float(1000), 1000, 1000])));
  return 1;
}

