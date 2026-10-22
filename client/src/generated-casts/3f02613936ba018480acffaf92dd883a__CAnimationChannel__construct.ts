// 3f02613936ba018480acffaf92dd883a.cct / CAnimationChannel / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  var m_bInited = 0;
  setMeProp(_me, "m_bActive", 1);
  setMeProp(_me, "m_ar_sprites", new LingoList([]));
  setMeProp(_me, "m_i_frameCounter", 0);
  setMeProp(_me, "m_i_ActiveSpriteSpan", 0);
  setMeProp(_me, "m_rRegpoint", callNamed("point", 400, 300));
  setMeProp(_me, "m_rRoomObject", undefined);
  setMeProp(_me, "m_iLastLocH", 0);
  setMeProp(_me, "m_iLastLocV", 0);
  setMeProp(_me, "m_iDeltaLocZ", 0);
  return 1;
}

