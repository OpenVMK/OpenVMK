// vmk_hm_minigame.cct / CHMPlayerStatus / updatePosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updatePosition(_me: LingoMe, a_iLoc: LingoValue) {
  var t_pNameDelta = callNamed("point", 0, 70);
  var t_pBarDelta = callNamed("point", 0, 60);
  var t_pArrowDelta = callNamed("point", 0, 80);
  if (lingoBinary("eq", meProp(_me, "m_iStatus"), symbol("possessed"))) {
  t_pNameDelta = lingoBinary("add", t_pNameDelta, callNamed("point", 0, 10));
  t_pArrowDelta = lingoBinary("add", t_pArrowDelta, callNamed("point", 0, 10));
  var t_iTimePossessed = lingoBinary("div", lingoBinary("sub", lingoBinary("mul", float(1), theProperty("milliSeconds")), meProp(_me, "m_iPossessStartTime")), meProp(_me, "m_iBarTime"));
  if (lingoBinary("gt", t_iTimePossessed, 1)) {
  t_iTimePossessed = 1;
  }

  if (lingoBinary("gt", meProp(_me, "m_ar_teams").count, 1)) {
  var tW = meProp(_me, "m_ar_teams").bar[1].width;
  setThePropOf(meProp(_me, "m_ar_teams").bar[1], "visible", 1);
  setThePropOf(meProp(_me, "m_ar_teams").bar[1], "loc", lingoBinary("sub", callNamed("point", lingoBinary("sub", a_iLoc.x, lingoBinary("div", tW, 2)), a_iLoc.y), t_pBarDelta));
  setThePropOf(meProp(_me, "m_ar_teams").bar[1], "locZ", lingoBinary("add", a_iLoc.z, 10003));
  setThePropOf(meProp(_me, "m_ar_teams").bar[2], "visible", 1);
  setThePropOf(meProp(_me, "m_ar_teams").bar[2], "loc", lingoBinary("add", meProp(_me, "m_ar_teams").bar[1].loc, callNamed("point", 1, 1)));
  setThePropOf(meProp(_me, "m_ar_teams").bar[2], "locZ", lingoBinary("add", a_iLoc.z, 10004));
  setThePropOf(meProp(_me, "m_ar_teams").bar[2], "width", lingoBinary("mul", t_iTimePossessed, lingoBinary("sub", tW, 2)));
  setThePropOf(meProp(_me, "m_ar_teams").bar[2], "height", 2);
  }

  } else {
  if (lingoBinary("eq", meProp(_me, "m_iStatus"), symbol("delayed"))) {
  t_pNameDelta = lingoBinary("add", t_pNameDelta, callNamed("point", 0, 10));
  t_pArrowDelta = lingoBinary("add", t_pArrowDelta, callNamed("point", 0, 10));
  var t_iTimeDelayed = lingoBinary("div", lingoBinary("sub", lingoBinary("mul", float(1), theProperty("milliSeconds")), meProp(_me, "m_iDelayedStartTime")), meProp(_me, "m_iBarTime"));
  if (lingoBinary("gt", t_iTimeDelayed, 1)) {
  t_iTimeDelayed = 1;
  }

  if (lingoBinary("gt", meProp(_me, "m_ar_teams").count, 1)) {
  tW = meProp(_me, "m_ar_teams").bar[1].width;
  setThePropOf(meProp(_me, "m_ar_teams").bar[1], "visible", 1);
  setThePropOf(meProp(_me, "m_ar_teams").bar[1], "loc", lingoBinary("sub", callNamed("point", lingoBinary("sub", a_iLoc.x, lingoBinary("div", tW, 2)), a_iLoc.y), t_pBarDelta));
  setThePropOf(meProp(_me, "m_ar_teams").bar[1], "locZ", lingoBinary("add", a_iLoc.z, 10003));
  setThePropOf(meProp(_me, "m_ar_teams").bar[2], "visible", 1);
  setThePropOf(meProp(_me, "m_ar_teams").bar[2], "loc", lingoBinary("add", meProp(_me, "m_ar_teams").bar[1].loc, callNamed("point", 1, 1)));
  setThePropOf(meProp(_me, "m_ar_teams").bar[2], "locZ", lingoBinary("add", a_iLoc.z, 10004));
  setThePropOf(meProp(_me, "m_ar_teams").bar[2], "width", lingoBinary("mul", t_iTimeDelayed, lingoBinary("sub", tW, 2)));
  setThePropOf(meProp(_me, "m_ar_teams").bar[2], "height", 2);
  }

  } else {
  setThePropOf(meProp(_me, "m_ar_teams").bar[1], "visible", 0);
  setThePropOf(meProp(_me, "m_ar_teams").bar[2], "visible", 0);
  }

  }

  if (lingoBinary("gt", meProp(_me, "m_ar_teams").count, 0)) {
  setThePropOf(meProp(_me, "m_ar_teams").name[1], "loc", lingoBinary("sub", callNamed("point", a_iLoc.x, a_iLoc.y), t_pNameDelta));
  setThePropOf(meProp(_me, "m_ar_teams").name[1], "locZ", lingoBinary("add", a_iLoc.z, 10001));
  }

  if (lingoBinary("gt", meProp(_me, "m_ar_teams").count, 2)) {
  setThePropOf(meProp(_me, "m_ar_teams").arrow[1], "loc", lingoBinary("sub", callNamed("point", a_iLoc.x, a_iLoc.y), t_pArrowDelta));
  setThePropOf(meProp(_me, "m_ar_teams").arrow[1], "locZ", lingoBinary("add", a_iLoc.z, 10002));
  for (var i = 1; i <= meProp(_me, "m_ar_arrows").count; ++i) {
  var t_rArrow = meProp(_me, "m_ar_arrows")[i];
  setThePropOf(t_rArrow, "loc", callNamed("point", a_iLoc.x, a_iLoc.y));
  setThePropOf(t_rArrow, "locZ", lingoBinary("sub", a_iLoc.z, 1));
  }

  }

}

