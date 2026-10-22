// item_2355.cct / CCheckersTrickLevitation / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(meProp(_me, "m_bRingAssigned")) ? 0 : 1)) {
  var t_rRoomContext = callMethod("GetRoomContext", callMethod("GetPiece", _this).m_rGameEngine);
  var t_iTargetTile = callMethod("GetParams", _this)[1];
  var t_rTargetTile = callMethod("_AccessIndexed", t_rRoomContext, t_iTargetTile, "tile");
  if ((lingoTruthy(callNamed("voidp", t_rTargetTile)) ? 0 : 1)) {
  var t_rCurve = callNamed("createObject", symbol("temp"), "CRoomBezierCurve");
  var t_veSource = callMethod("GetAbsPos", callMethod("getObject", callMethod("GetTheTileStack", callMethod("GetPiece", _this))));
  var t_veTarget = callMethod("GetAbsPos", t_rTargetTile);
  var t_veMiddle = lingoBinary("add", lingoBinary("add", t_veSource, lingoBinary("div", lingoBinary("sub", t_veTarget, t_veSource), 2)), callNamed("vector", 0, 0, 20));
  callMethod("clear", t_rCurve)
  callMethod("AddTriple", t_rCurve, t_veSource, t_veMiddle, t_veTarget)
  var t_veScrPos = lingoBinary("add", callNamed("AbsToScr", callMethod("GetPointAt", t_rCurve, 0.5)), callMethod("GetScrPos", t_rRoomContext));
  var t_vTemp = lingoBinary("sub", t_veTarget, t_veSource);
  if (lingoBinary("neq", callNamed("abs", lingoBinary("sub", t_vTemp.x, t_vTemp.y)), float(0))) {
  var t_iDir = 2;
  } else {
  t_iDir = 0;
  }

  callNamed("put", lingoBinary("joinPad", "LEVITATION:", t_veTarget), t_veSource, t_vTemp)
  setThePropOf(meProp(_me, "m_ar_rSprites")[1], "member", callNamed("getMember", lingoBinary("join", lingoBinary("join", "trick_2_ring_", t_iDir), "_front")));
  setThePropOf(meProp(_me, "m_ar_rSprites")[1], "loc", callNamed("point", t_veScrPos.x, t_veScrPos.y));
  setThePropOf(meProp(_me, "m_ar_rSprites")[1], "locZ", lingoBinary("add", t_veScrPos.z, 10000));
  setThePropOf(meProp(_me, "m_ar_rSprites")[1], "width", meProp(_me, "m_ar_rSprites")[1].member.width);
  setThePropOf(meProp(_me, "m_ar_rSprites")[1], "height", meProp(_me, "m_ar_rSprites")[1].member.height);
  setThePropOf(meProp(_me, "m_ar_rSprites")[1], "visible", 1);
  setThePropOf(meProp(_me, "m_ar_rSprites")[2], "member", callNamed("getMember", lingoBinary("join", lingoBinary("join", "trick_2_ring_", t_iDir), "_back")));
  setThePropOf(meProp(_me, "m_ar_rSprites")[2], "loc", callNamed("point", t_veScrPos.x, t_veScrPos.y));
  setThePropOf(meProp(_me, "m_ar_rSprites")[2], "locZ", t_veScrPos.z);
  setThePropOf(meProp(_me, "m_ar_rSprites")[2], "width", meProp(_me, "m_ar_rSprites")[2].member.width);
  setThePropOf(meProp(_me, "m_ar_rSprites")[2], "height", meProp(_me, "m_ar_rSprites")[2].member.height);
  setThePropOf(meProp(_me, "m_ar_rSprites")[2], "visible", 1);
  }

  setMeProp(_me, "m_bRingAssigned", 1);
  }

  setMeProp(_me, "m_iCurFrame", lingoBinary("add", meProp(_me, "m_iCurFrame"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iCurFrame"), meProp(_me, "m_iLastFrame"))) {
  callNamed("removeObject", callMethod("getID", _this))
  }

}

