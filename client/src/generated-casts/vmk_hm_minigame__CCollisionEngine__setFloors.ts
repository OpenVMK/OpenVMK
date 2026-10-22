// vmk_hm_minigame.cct / CCollisionEngine / setFloors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFloors(_me: LingoMe, a_ar_floors: LingoValue) {
  setMeProp(_me, "m_ar_floors", new LingoPropList([]));
  setMeProp(_me, "m_ar_tiles3D", new LingoList([]));
  for (var i = 1; i <= a_ar_floors.count; ++i) {
  var t_vOffset = a_ar_floors[i][1];
  var t_sFloorName = callMethod("getPropAt", a_ar_floors, i);
  var t_ar_floor = callMethod("duplicate", a_ar_floors[i][2]);
  for (var t = 1; t <= t_ar_floor.count; ++t) {
  t_ar_floor[t] = lingoBinary("add", t_ar_floor[t], t_vOffset);
  }

  meProp(_me, "m_ar_floors")[t_sFloorName] = t_ar_floor;
  }

  for (var i = 1; i <= meProp(_me, "m_ar_floors").count; ++i) {
  for (var t_vTile of meProp(_me, "m_ar_floors")[i].toArray()) {
  callMethod("append", meProp(_me, "m_ar_tiles3D"), callMethod("duplicate", t_vTile))
  callMethod("append", meProp(_me, "m_ar_tiles2D"), callMethod("duplicate", t_vTile))
  }

  }

  for (var t_vTile of meProp(_me, "m_ar_tiles2D").toArray()) {
  setThePropOf(t_vTile, "z", 0);
  }

}

