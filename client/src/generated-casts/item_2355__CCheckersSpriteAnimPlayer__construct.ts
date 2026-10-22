// item_2355.cct / CCheckersSpriteAnimPlayer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iFrame", 0);
  setMeProp(_me, "m_bPlaying", 0);
  setMeProp(_me, "m_ar_rFrames", new LingoList([]));
  setMeProp(_me, "m_ar_rMembers", new LingoList([]));
  setMeProp(_me, "m_bLooping", 0);
  setMeProp(_me, "m_ptCenter", callNamed("point", 0, 0));
  setMeProp(_me, "m_iLocZ", 1000);
  setMeProp(_me, "m_bPositionSet", 0);
  setMeProp(_me, "m_bReleaseSprite", 0);
  setMeProp(_me, "m_bDestroyWhenReady", 0);
}

