// vmk_cambodian_handler.cct / CVisualizerBoat / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var tSprite of meProp(_me, "m_rSprites").toArray()) {
  callNamed("releaseSprite", tSprite.spriteNum)
  }

  callNamed("removeMember", callNamed("member", meProp(_me, "m_iMemnumAvatarVisualizer")).name)
  return 1;
}

