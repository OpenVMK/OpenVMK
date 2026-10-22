// vmk_hm_minigame.cct / CHMStage / hideAnimationNodes

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideAnimationNodes(_me: LingoMe) {
  var m_ar_animations = new LingoList([]);
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  if ((lingoTruthy(callNamed("voidp", tRoomContext)) ? 0 : 1)) {
  for (var i = 1; i <= 15; ++i) {
  var tAnimName = lingoBinary("join", "vmk_anim_", i);
  var tNode = callMethod("Search", tRoomContext, "NAME", tAnimName);
  if (lingoBinary("neq", tNode, 0)) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite, callNamed("sprite", 0))) {
  callMethod("append", m_ar_animations, tSprite)
  }

  continue;
  }

  break;
  }

  } else {
  callNamed("put", "ERROR! No room loaded yet")
  }

  for (var tSprite of m_ar_animations.toArray()) {
  if (lingoBinary("neq", tSprite, 0)) {
  setThePropOf(tSprite, "visible", 0);
  }

  }

}

