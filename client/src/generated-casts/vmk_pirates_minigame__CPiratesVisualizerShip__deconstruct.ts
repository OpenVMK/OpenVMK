// vmk_pirates_minigame.cct / CPiratesVisualizerShip / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  for (var tSprite of meProp(_me, "m_rSprites").toArray()) {
  if ((lingoTruthy(callNamed("voidp", tSprite)) ? 0 : 1)) {
  callMethod("releaseSprite", callNamed("getSpriteManager"), tSprite.spriteNum)
  }

  }

  callNamed("removeMember", meProp(_me, "m_rOwnerDisplayMember").name)
  return 1;
}

