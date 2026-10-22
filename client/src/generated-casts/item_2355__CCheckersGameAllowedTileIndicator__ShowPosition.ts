// item_2355.cct / CCheckersGameAllowedTileIndicator / ShowPosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowPosition(_me: LingoMe, _this: LingoValue, a_rTile: LingoValue, a_rPiece: LingoValue) {
  if (callNamed("voidp", a_rTile)) {
  setThePropOf(meProp(_me, "m_rSprite"), "visible", 0);
  setMeProp(_me, "m_rTile", undefined);
  setMeProp(_me, "m_rPiece", undefined);
  } else {
  setMeProp(_me, "m_rTile", a_rTile);
  setMeProp(_me, "m_rPiece", a_rPiece);
  var t_veAbs = callMethod("GetScrPos", a_rTile);
  setThePropOf(meProp(_me, "m_rSprite"), "locH", t_veAbs.x);
  setThePropOf(meProp(_me, "m_rSprite"), "locV", t_veAbs.y);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", t_veAbs.z);
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  setThePropOf(meProp(_me, "m_rSprite"), "blend", 80);
  setThePropOf(meProp(_me, "m_rSprite"), "visible", 1);
  }

}

