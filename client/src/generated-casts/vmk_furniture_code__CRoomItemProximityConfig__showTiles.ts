// vmk_furniture_code.cct / CRoomItemProximityConfig / showTiles

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showTiles(_me: LingoMe, a_ar_vPositions: LingoValue) {
  callMethod("hideTiles", _me)
  for (var t_veScr of a_ar_vPositions.toArray()) {
  var t_rSprite = callNamed("sprite", callNamed("reserveSprite"));
  setThePropOf(t_rSprite, "member", meProp(_me, "m_rTileMember"));
  setThePropOf(t_rSprite, "width", t_rSprite.member.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.height);
  var t_ar_tile = new LingoPropList([symbol("offset"), t_veScr, symbol("sprite"), t_rSprite]);
  callMethod("append", meProp(_me, "m_ar_tiles"), t_ar_tile)
  }

  callMethod("moveTiles", _me, callMethod("GetScrPos", callMethod("getObject", _me)))
}

