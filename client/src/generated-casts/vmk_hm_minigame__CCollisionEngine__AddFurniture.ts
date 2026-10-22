// vmk_hm_minigame.cct / CCollisionEngine / AddFurniture

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddFurniture(_me: LingoMe, a_ar_mp_elemProps: LingoValue, a_mp_mp_furniMap: LingoValue, t_ar_floors: LingoValue) {
  setMeProp(_me, "m_ar_furniture", new LingoList([]));
  var t_ar_furni2D = new LingoList([]);
  var t_ar_furni3D = new LingoList([]);
  var t_ar_furniRefs = new LingoList([]);
  var t_ar_furniType = new LingoList([]);
  var t_ar_blockMap = new LingoPropList([]);
  for (var tMap of a_mp_mp_furniMap.toArray()) {
  var t_ar_map = new LingoList([]);
  for (var t_Block of tMap[symbol("map")].toArray()) {
  callMethod("append", t_ar_map, new LingoPropList([symbol("x"), callNamed("value", t_Block["X"]), symbol("y"), callNamed("value", t_Block["Y"])]))
  }

  t_ar_blockMap[callNamed("string", tMap[symbol("code")])] = t_ar_map;
  }

  var t_iFurniRef = 0;
  for (var tElement of a_ar_mp_elemProps.toArray()) {
  t_iFurniRef = lingoBinary("add", t_iFurniRef, 1);
  var t_ar_blocks = t_ar_blockMap[callNamed("string", tElement.code)];
  var t_ar_findMaxX = new LingoList([]);
  var t_ar_findMaxY = new LingoList([]);
  for (var t_ar_block of t_ar_blocks.toArray()) {
  callMethod("append", t_ar_findMaxX, t_ar_block.x)
  callMethod("append", t_ar_findMaxY, t_ar_block.y)
  }

  var t_iMaxX = callMethod("max", t_ar_findMaxX);
  var t_iMaxY = callMethod("max", t_ar_findMaxY);
  var t_ar_rotated = new LingoList([]);
  for (var t_blk of t_ar_blocks.toArray()) {
  var t_rotBlk = callNamed("rotateBlk", t_blk, tElement.Dir, t_iMaxX, t_iMaxY);
  callMethod("append", t_ar_rotated, t_rotBlk)
  }

  for (var t_Block of t_ar_rotated.toArray()) {
  var t_vPos = lingoBinary("add", tElement.pos, callNamed("vector", lingoBinary("mul", t_Block.x, meProp(_me, "m_iTileSize")), lingoBinary("mul", t_Block.y, meProp(_me, "m_iTileSize")), 0));
  var t_iPos = callMethod("getPos", meProp(_me, "m_ar_tiles3D"), t_vPos);
  if (lingoBinary("gt", t_iPos, 0)) {
  switch (tElement[symbol("type")]) {
case symbol("Door"):
case symbol("Coffin"):
case symbol("loop"):
  var t_vPos2D = callMethod("duplicate", t_vPos);
  setThePropOf(t_vPos2D, "z", 0);
  callMethod("append", t_ar_furni2D, t_vPos2D)
  callMethod("append", t_ar_furni3D, t_vPos)
  callMethod("append", t_ar_furniRefs, t_iFurniRef)
  callMethod("append", t_ar_furniType, tElement[symbol("type")])
  break;
  default:
  callMethod("deleteAt", meProp(_me, "m_ar_tiles3D"), t_iPos)
  callMethod("deleteAt", meProp(_me, "m_ar_tiles2D"), t_iPos)
  callMethod("deleteAt", meProp(_me, "m_ar_tileRef"), t_iPos)
  break;
  break;
  }

  continue;
  }

  callNamed("put", lingoBinary("joinPad", "Could NOT REMOVE block", t_vPos))
  }

  }

  setMeProp(_me, "m_ar_furniture", new LingoList([t_ar_furni2D, t_ar_furni3D, t_ar_furniRefs, t_ar_furniType]));
}

