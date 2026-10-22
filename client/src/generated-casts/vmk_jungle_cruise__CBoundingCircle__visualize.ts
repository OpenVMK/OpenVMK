// vmk_jungle_cruise.cct / CBoundingCircle / visualize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function visualize(_me: LingoMe) {
  setMeProp(_me, "m_s_BoundaryName", lingoBinary("join", "CircleBoundary", callNamed("getUniqueID")));
  var tMemNum = callNamed("createMember", meProp(_me, "m_s_BoundaryName"), symbol("bitmap"));
  var tImg = callNamed("drawAxionomicCircle", meProp(_me, "radius"));
  setThePropOf(callNamed("member", tMemNum), "image", tImg);
  setThePropOf(meProp(_me, "m_pSprite"), "member", callNamed("member", tMemNum));
  setThePropOf(meProp(_me, "m_pSprite"), "width", meProp(_me, "m_pSprite").member.width);
  setThePropOf(meProp(_me, "m_pSprite"), "height", meProp(_me, "m_pSprite").member.height);
  setThePropOf(meProp(_me, "m_pSprite"), "loc", callNamed("InverseAxonometricPosition", callNamed("point", meProp(_me, "origin").x, meProp(_me, "origin").y)));
  setThePropOf(meProp(_me, "m_pSprite"), "locZ", 0);
  setThePropOf(meProp(_me, "m_pSprite"), "ink", 36);
}

