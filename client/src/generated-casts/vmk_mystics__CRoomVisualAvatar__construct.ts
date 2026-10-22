// vmk_mystics.cct / CRoomVisualAvatar / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rMember", undefined);
  setMeProp(_me, "m_rCanvasSpr", undefined);
  setMeProp(_me, "m_rShadowSpr", undefined);
  setMeProp(_me, "m_rCustomSpr", undefined);
  setMeProp(_me, "m_rMysticRenderer", undefined);
  setMeProp(_me, "m_rRenderer", undefined);
  setMeProp(_me, "m_iTileSize", 32);
  setMeProp(_me, "m_veLastScr", callNamed("vector"));
  setMeProp(_me, "m_ar_AvatarOutlook", undefined);
  setMeProp(_me, "m_sBoolAvatarOnTile", 1);
  setMeProp(_me, "m_rFrame", 0);
  return 1;
}

