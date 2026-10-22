// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualPoster / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_rObj: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  if (lingoBinary("eq", theProperty("runMode"), "Author")) {
  var t_vePos = callMethod("GetAbsPos", t_rObj);
  var t_veOff = callMethod("GetScrPos", callMethod("GetContext", t_rObj));
  var t_rRGB = callNamed("rgb", 20, 255, 20);
  var t_iDir = callNamed("integer", callMethod("GetParam", t_rObj, "DIR"));
  var t_rStruct = callMethod("GetParam", t_rObj, "STRUCT");
  for (var t_rDir of t_rStruct.child.toArray()) {
  if (lingoBinary("eq", callNamed("integer", t_rDir.param["NUM"]), t_iDir)) {
  var t_rBlocks = t_rDir.child;
  break;
  }

  }

  var t_rBlock = t_rBlocks[1];
  var t_iXD = callNamed("integer", t_rBlock.param["XD"]);
  var t_iYD = callNamed("integer", t_rBlock.param["YD"]);
  var t_iZD = callNamed("integer", t_rBlock.param["ZD"]);
  if (lingoBinary("eq", t_iDir, 3)) {
  var t_veA = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_vePos, callNamed("vector", 0, t_iYD, t_iZD))));
  var t_veB = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_vePos, callNamed("vector", 0, 0, t_iZD))));
  var t_veC = lingoBinary("add", t_veOff, callNamed("AbsToScr", t_vePos));
  var t_veD = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_vePos, callNamed("vector", 0, t_iYD, 0))));
  } else {
  t_veA = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_vePos, callNamed("vector", 0, 0, t_iZD))));
  t_veB = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_vePos, callNamed("vector", t_iXD, 0, t_iZD))));
  t_veC = lingoBinary("add", t_veOff, callNamed("AbsToScr", lingoBinary("add", t_vePos, callNamed("vector", t_iXD, 0, 0))));
  t_veD = lingoBinary("add", t_veOff, callNamed("AbsToScr", t_vePos));
  }

  var t_ptA = callNamed("point", t_veA.x, t_veA.y);
  var t_ptB = callNamed("point", t_veB.x, t_veB.y);
  var t_ptC = callNamed("point", t_veC.x, t_veC.y);
  var t_ptD = callNamed("point", t_veD.x, t_veD.y);
  var t_rImage = theProperty("stage").image;
  callMethod("draw", t_rImage, t_ptA, t_ptB, callNamed("rgb", 255, 20, 20))
  callMethod("draw", t_rImage, t_ptB, t_ptC, callNamed("rgb", 255, 20, 20))
  callMethod("draw", t_rImage, t_ptC, t_ptD, callNamed("rgb", 255, 20, 20))
  callMethod("draw", t_rImage, t_ptD, t_ptA, callNamed("rgb", 255, 20, 20))
  }

  if (meProp(_me, "m_bSelected")) {
  t_iDir = callNamed("integer", callMethod("GetParam", t_rObj, "DIR"));
  if (lingoBinary("neq", t_iDir, meProp(_me, "m_rHighLight").lastDir)) {
  callMethod("CreateHighlighters", _this)
  setThePropOf(meProp(_me, "m_rHighLight"), "lastDir", t_iDir);
  }

  callMethod("AdjustHighlighters", _this, meProp(_me, "m_mp_blinkStat").cur)
  setThePropOf(meProp(_me, "m_mp_blinkStat"), "cur", lingoBinary("add", meProp(_me, "m_mp_blinkStat").cur, meProp(_me, "m_mp_blinkStat").inc));
  if (lingoBinary("or", lingoBinary("lte", meProp(_me, "m_mp_blinkStat").cur, meProp(_me, "m_mp_blinkStat").min), lingoBinary("gte", meProp(_me, "m_mp_blinkStat").cur, meProp(_me, "m_mp_blinkStat").max))) {
  setThePropOf(meProp(_me, "m_mp_blinkStat"), "inc", -float(meProp(_me, "m_mp_blinkStat").inc));
  setThePropOf(meProp(_me, "m_mp_blinkStat"), "cur", lingoBinary("add", meProp(_me, "m_mp_blinkStat").cur, meProp(_me, "m_mp_blinkStat").inc));
  }

  t_rObj = callMethod("getObject", _this);
  var t_veScr = callMethod("GetScrPos", t_rObj);
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "locH", t_veScr.x);
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "locV", t_veScr.y);
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "locZ", lingoBinary("add", t_veScr.z, 2));
  }

}

