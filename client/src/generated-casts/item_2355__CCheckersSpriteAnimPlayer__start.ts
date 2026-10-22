// item_2355.cct / CCheckersSpriteAnimPlayer / start

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function start(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iFrame", 0);
  setMeProp(_me, "m_bPlaying", 1);
  callNamed("receiveUpdate", callMethod("getID", _this))
  if (callNamed("voidp", meProp(_me, "m_rSprite"))) {
  setMeProp(_me, "m_rSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _this))));
  setMeProp(_me, "m_bReleaseSprite", 1);
  }

}

