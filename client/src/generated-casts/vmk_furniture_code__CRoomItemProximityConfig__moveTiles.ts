// vmk_furniture_code.cct / CRoomItemProximityConfig / moveTiles

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveTiles(_me: LingoMe, a_vLoc: LingoValue) {
  var a_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  var t_iLocZ = 0;
  var t_rContext = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  var t_rBg = callMethod("Search", a_rContext, "CLASS", "default");
  if (callNamed("objectp", t_rBg)) {
  var t_veOff = callMethod("GetScrPos", t_rBg);
  t_iLocZ = t_veOff.z;
  }

  for (var t_rTile of meProp(_me, "m_ar_tiles").toArray()) {
  var t_veScr = lingoBinary("add", a_vLoc, t_rTile.offset);
  setThePropOf(t_rTile.sprite, "locH", t_veScr.x);
  setThePropOf(t_rTile.sprite, "locV", t_veScr.y);
  setThePropOf(t_rTile.sprite, "locZ", lingoBinary("add", t_iLocZ, 1));
  }

}

