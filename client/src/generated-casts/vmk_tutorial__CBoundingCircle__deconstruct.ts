// vmk_tutorial.cct / CBoundingCircle / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("executeMessage", symbol("removeCollisionObject"), _me)
  if (meProp(_me, "m_bVisualizeBoundary")) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_pSprite").spriteNum)
  }

  if (lingoBinary("neq", callNamed("getmemnum", meProp(_me, "m_s_BoundaryName")), 0)) {
  callNamed("removeMember", meProp(_me, "m_s_BoundaryName"))
  }

  }

  return 1;
}

