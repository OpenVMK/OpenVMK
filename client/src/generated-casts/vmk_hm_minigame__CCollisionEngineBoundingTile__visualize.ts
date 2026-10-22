// vmk_hm_minigame.cct / CCollisionEngineBoundingTile / visualize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function visualize(_me: LingoMe) {
  var m_s_BoundaryName = lingoBinary("join", "CircleBoundary", callNamed("getUniqueID"));
  var tMemNum = callNamed("createMember", m_s_BoundaryName, symbol("bitmap"));
  var tImg = callNamed("drawAxionomicCircle", lingoBinary("div", meProp(_me, "m_iTileSize"), 2));
  setThePropOf(callNamed("member", tMemNum), "image", tImg);
  setMeProp(_me, "m_rSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("member", tMemNum));
  setThePropOf(meProp(_me, "m_rSprite"), "loc", callNamed("point", -float(1000), -float(1000)));
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", 0);
  setThePropOf(meProp(_me, "m_rSprite"), "ink", 36);
}

