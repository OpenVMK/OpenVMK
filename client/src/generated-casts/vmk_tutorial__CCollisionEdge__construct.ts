// vmk_tutorial.cct / CCollisionEdge / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "origin", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "direction", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "intersection", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "normal", callMethod("cross", meProp(_me, "direction"), callNamed("vector", 0, 0, -float(1))));
  callMethod("normalize", meProp(_me, "normal"))
  setMeProp(_me, "m_sName", "");
  setMeProp(_me, "Active", 0);
  return 1;
}

