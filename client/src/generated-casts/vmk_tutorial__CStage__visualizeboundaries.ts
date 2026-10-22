// vmk_tutorial.cct / CStage / visualizeboundaries

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function visualizeboundaries(_me: LingoMe) {
  var tMemNum = callNamed("createMember", "CollisionBoundaries", symbol("bitmap"));
  var tImg = callNamed("image", 800, 600, 32);
  callMethod("draw", meProp(_me, "m_p_CollisionEngine"), tImg, 1)
  setThePropOf(callNamed("member", tMemNum), "image", tImg);
  setThePropOf(meProp(_me, "m_p_CollisionMapSprite"), "member", callNamed("member", tMemNum));
  setThePropOf(meProp(_me, "m_p_CollisionMapSprite"), "loc", callNamed("point", 400, 300));
  setThePropOf(meProp(_me, "m_p_CollisionMapSprite"), "locZ", 0);
  setThePropOf(meProp(_me, "m_p_CollisionMapSprite"), "ink", 36);
}

