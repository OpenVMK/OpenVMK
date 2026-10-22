// vmk_casual_checkers.cct / CCheckersSpriteAnimPlayer / stop

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stop(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bPlaying")) {
  callNamed("removeUpdate", callMethod("getID", _this))
  setMeProp(_me, "m_bPlaying", 0);
  }

  if (meProp(_me, "m_bReleaseSprite")) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_rSprite").spriteNum)
  }

  }

  setMeProp(_me, "m_rSprite", undefined);
  if (meProp(_me, "m_bDestroyWhenReady")) {
  callNamed("removeObject", callMethod("getID", _this))
  }

}

