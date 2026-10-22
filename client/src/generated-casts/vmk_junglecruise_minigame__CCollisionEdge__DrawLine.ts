// vmk_junglecruise_minigame.cct / CCollisionEdge / DrawLine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawLine(_me: LingoMe, g: LingoValue, p1: LingoValue, p2: LingoValue) {
  callMethod("draw", g, p1, p2, new LingoPropList([symbol("shapeType"), symbol("line"), symbol("lineSize"), 1, symbol("color"), meProp(_me, "m_pColor")]))
}

