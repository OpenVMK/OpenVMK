// vmk_fireworks_minigame.cct / CFireworksGameInterface / ExplodeVisibleFireworks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ExplodeVisibleFireworks(_me: LingoMe, a_bCheckMouse: LingoValue) {
  var t_ar_explodableFireworks = new LingoList([]);
  if (a_bCheckMouse) {
  for (var tClickLoc of meProp(_me, "m_ar_clicks").toArray()) {
  for (var i = 1; i <= meProp(_me, "m_ar_fwSpritelist").count; ++i) {
  if (meProp(_me, "m_ar_fwSpritelist")[i].visible) {
  if (callMethod("intersects", meProp(_me, "m_ar_sprGraphicCursor")[1], meProp(_me, "m_ar_fwSpritelist")[i])) {
  callMethod("append", t_ar_explodableFireworks, i)
  }

  }

  }

  }

  } else {
  for (var i = 1; i <= meProp(_me, "m_ar_fwSpritelist").count; ++i) {
  if (meProp(_me, "m_ar_fwSpritelist")[i].visible) {
  callMethod("append", t_ar_explodableFireworks, i)
  }

  }

  }

  for (var i of t_ar_explodableFireworks.toArray()) {
  var tName = callMethod("GetFireWorkName", callMethod("getComponent", _me), i);
  var tBomb = callMethod("GetFireWorkRef", callMethod("getComponent", _me), i);
  var tID = callMethod("GetFireworkId", callMethod("getComponent", _me), i);
  var tOptimalTime = callMethod("GetLagTime", tBomb);
  var tAge = callMethod("getAge", tBomb);
  var tPercentHit = lingoBinary("div", tAge, tOptimalTime);
  if (lingoBinary("gt", tPercentHit, float(1))) {
  tPercentHit = float(1);
  }

  var tPercent = tPercentHit;
  var t_bAccurate = 1;
  if (lingoBinary("neq", tName, meProp(_me, "m_sCurrentSelection"))) {
  t_bAccurate = 0;
  tPercentHit = lingoBinary("div", tPercentHit, 2);
  }

  var t_iType = 0;
  for (var tIcon of meProp(_me, "m_ar_mp_selector").toArray()) {
  if (lingoBinary("eq", tIcon.name, tName)) {
  t_iType = callNamed("integer", tIcon._type);
  }

  }

  if ((lingoTruthy(t_bAccurate) ? 0 : 1)) {
  var t_iSelectedType = 0;
  for (var tIcon of meProp(_me, "m_ar_mp_selector").toArray()) {
  if (lingoBinary("eq", tIcon.name, meProp(_me, "m_sCurrentSelection"))) {
  t_iSelectedType = callNamed("integer", tIcon._type);
  }

  }

  } else {
  t_iSelectedType = t_iType;
  }

  var tScore = callNamed("integer", lingoBinary("mul", tPercent, 1000));
  if ((lingoTruthy(t_bAccurate) ? 0 : 1)) {
  tScore = lingoBinary("div", tScore, 4);
  }

  var t_iHitType = 1;
  if (lingoBinary("gte", tScore, 950)) {
  t_iHitType = 5;
  } else {
  if (lingoBinary("and", lingoBinary("lt", tScore, 950), lingoBinary("gte", tScore, 801))) {
  t_iHitType = 4;
  } else {
  if (lingoBinary("and", lingoBinary("lt", tScore, 801), lingoBinary("gte", tScore, 401))) {
  t_iHitType = 3;
  } else {
  if (lingoBinary("and", lingoBinary("lt", tScore, 401), lingoBinary("gte", tScore, 201))) {
  t_iHitType = 2;
  } else {
  if (lingoBinary("and", lingoBinary("lt", tScore, 201), lingoBinary("gte", tScore, 0))) {
  t_iHitType = 1;
  }

  }

  }

  }

  }

  callMethod("AddHit", callMethod("getComponent", _me), callNamed("integer", lingoBinary("mul", tPercent, 1000)), t_bAccurate, t_iType, tID, t_iHitType, t_iSelectedType)
  callMethod("Explode", tBomb, callMethod("GetFireworkEngine", callMethod("getComponent", _me)), tPercentHit, tPercentHit)
  callMethod("PinComment", _me, lingoBinary("add", meProp(_me, "m_ar_fwSpritelist")[i].loc, callNamed("point", 0, -float(20))), tScore, t_iHitType)
  setThePropOf(meProp(_me, "m_ar_fwSpritelist")[i], "visible", 0);
  callMethod("displayBonus", _me)
  callMethod("updateComboStatus", _me)
  }

}

