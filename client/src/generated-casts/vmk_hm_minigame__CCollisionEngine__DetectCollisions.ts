// vmk_hm_minigame.cct / CCollisionEngine / DetectCollisions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DetectCollisions(_me: LingoMe) {
  for (var _o of meProp(_me, "m_ar_collisionObjects").toArray()) {
  var t_vDir = callMethod("duplicate", callMethod("getDirection", _o));
  setThePropOf(t_vDir, "y", lingoBinary("mul", t_vDir.y, -float(1)));
  if (lingoBinary("eq", t_vDir, callNamed("vector", 0, 0, 0))) {
  continue;
  }

  var t_vPos = callMethod("getLocation", _o);
  var t_vTestPos = lingoBinary("add", t_vPos, lingoBinary("mul", t_vDir, meProp(_me, "m_iTileSize")));
  setThePropOf(t_vTestPos, "z", 0);
  var t_iFound = callMethod("getOne", meProp(_me, "m_ar_furniture")[1], t_vTestPos);
  if (lingoBinary("gt", t_iFound, 0)) {
  var t_vFurniPos3D = meProp(_me, "m_ar_furniture")[2][t_iFound];
  var t_iFurniRef = meProp(_me, "m_ar_furniture")[3][t_iFound];
  var t_iFurniType = meProp(_me, "m_ar_furniture")[4][t_iFound];
  callNamed("put", lingoBinary("joinPad", "Furni-collision detected:", new LingoList([t_iFurniType, t_iFurniRef, t_vFurniPos3D])))
  continue;
  }

  t_iFound = callMethod("getOne", meProp(_me, "m_ar_tiles2D"), t_vTestPos);
  if (lingoBinary("gt", t_iFound, 0)) {
  var t_v3DPos = meProp(_me, "m_ar_tiles3D")[t_iFound];
  callMethod("SetLocation", _o, t_v3DPos, meProp(_me, "m_ar_tileRef")[t_iFound], t_vDir)
  continue;
  }

  var t_linkPos = callMethod("getLink", _me, t_vPos, t_vDir);
  if (callNamed("vectorp", t_linkPos)) {
  var t_iTilePos = callMethod("getOne", meProp(_me, "m_ar_tiles3D"), t_linkPos);
  if (lingoBinary("gt", t_iTilePos, 0)) {
  callMethod("SetLocation", _o, t_linkPos, meProp(_me, "m_ar_tileRef")[t_iTilePos], t_vDir)
  continue;
  }

  }

  var t_vDir2 = callMethod("getTrialDirection", _me, t_vDir, -float(1));
  t_vTestPos = lingoBinary("add", t_vPos, lingoBinary("mul", t_vDir2, meProp(_me, "m_iTileSize")));
  setThePropOf(t_vTestPos, "z", 0);
  t_iFound = callMethod("getOne", meProp(_me, "m_ar_furniture")[1], t_vTestPos);
  if (lingoBinary("gt", t_iFound, 0)) {
  t_vFurniPos3D = meProp(_me, "m_ar_furniture")[2][t_iFound];
  t_iFurniRef = meProp(_me, "m_ar_furniture")[3][t_iFound];
  t_iFurniType = meProp(_me, "m_ar_furniture")[4][t_iFound];
  callNamed("put", lingoBinary("joinPad", "Furni-collision detected:", new LingoList([t_iFurniType, t_iFurniRef, t_vFurniPos3D])))
  continue;
  }

  t_iFound = callMethod("getOne", meProp(_me, "m_ar_tiles2D"), t_vTestPos);
  if (lingoBinary("gt", t_iFound, 0)) {
  t_v3DPos = meProp(_me, "m_ar_tiles3D")[t_iFound];
  callMethod("SetLocation", _o, t_v3DPos, meProp(_me, "m_ar_tileRef")[t_iFound], t_vDir)
  continue;
  }

  var t_vDir1 = callMethod("getTrialDirection", _me, t_vDir, 1);
  t_vTestPos = lingoBinary("add", t_vPos, lingoBinary("mul", t_vDir1, meProp(_me, "m_iTileSize")));
  setThePropOf(t_vTestPos, "z", 0);
  t_iFound = callMethod("getOne", meProp(_me, "m_ar_furniture")[1], t_vTestPos);
  if (lingoBinary("gt", t_iFound, 0)) {
  t_vFurniPos3D = meProp(_me, "m_ar_furniture")[2][t_iFound];
  t_iFurniRef = meProp(_me, "m_ar_furniture")[3][t_iFound];
  t_iFurniType = meProp(_me, "m_ar_furniture")[4][t_iFound];
  callNamed("put", lingoBinary("joinPad", "Furni-collision detected:", new LingoList([t_iFurniType, t_iFurniRef, t_vFurniPos3D])))
  continue;
  }

  t_iFound = callMethod("getOne", meProp(_me, "m_ar_tiles2D"), t_vTestPos);
  if (lingoBinary("gt", t_iFound, 0)) {
  t_v3DPos = meProp(_me, "m_ar_tiles3D")[t_iFound];
  callMethod("SetLocation", _o, t_v3DPos, meProp(_me, "m_ar_tileRef")[t_iFound], t_vDir)
  continue;
  }

  t_linkPos = callMethod("getLink", _me, t_vPos, t_vDir1);
  if (callNamed("vectorp", t_linkPos)) {
  t_iTilePos = callMethod("getOne", meProp(_me, "m_ar_tiles3D"), t_linkPos);
  if (lingoBinary("gt", t_iTilePos, 0)) {
  callMethod("SetLocation", _o, t_linkPos, meProp(_me, "m_ar_tileRef")[t_iTilePos], t_vDir)
  continue;
  }

  }

  t_linkPos = callMethod("getLink", _me, t_vPos, t_vDir2);
  if (callNamed("vectorp", t_linkPos)) {
  t_iTilePos = callMethod("getOne", meProp(_me, "m_ar_tiles3D"), t_linkPos);
  if (lingoBinary("gt", t_iTilePos, 0)) {
  callMethod("SetLocation", _o, t_linkPos, meProp(_me, "m_ar_tileRef")[t_iTilePos], t_vDir)
  continue;
  }

  }

  }

}

