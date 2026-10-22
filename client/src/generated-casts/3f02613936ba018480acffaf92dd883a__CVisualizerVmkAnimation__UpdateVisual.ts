// 3f02613936ba018480acffaf92dd883a.cct / CVisualizerVmkAnimation / UpdateVisual

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateVisual(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rAnchorObject"))) {
  var tMyPos = callMethod("GetAbsPos", callMethod("getObject", _me));
  var tNpcPos = callMethod("GetAbsPos", meProp(_me, "m_rAnchorObject"));
  var tTime = theProperty("milliSeconds");
  if (lingoBinary("eq", meProp(_me, "m_npcMoveMode"), symbol("stay"))) {
  if (lingoBinary("neq", tMyPos, tNpcPos)) {
  setMeProp(_me, "m_npcMoveMode", symbol("move"));
  setMeProp(_me, "m_npcDeltaDistance", lingoBinary("sub", tNpcPos, tMyPos));
  setMeProp(_me, "m_npcMoveStartPos", tMyPos);
  setMeProp(_me, "m_npcMoveStartTime", tTime);
  }

  } else {
  if (lingoBinary("eq", meProp(_me, "m_npcMoveMode"), symbol("move"))) {
  var tFactor = lingoBinary("div", lingoBinary("sub", tTime, meProp(_me, "m_npcMoveStartTime")), float(500));
  if (lingoBinary("gt", lingoBinary("sub", tTime, meProp(_me, "m_npcMoveStartTime")), 500)) {
  tFactor = float(1);
  }

  var tPos = lingoBinary("add", meProp(_me, "m_npcMoveStartPos"), lingoBinary("mul", tFactor, meProp(_me, "m_npcDeltaDistance")));
  callMethod("SetAbsPos", callMethod("getObject", _me), tPos)
  if (lingoBinary("eq", tPos, tNpcPos)) {
  setMeProp(_me, "m_npcMoveMode", symbol("stay"));
  } else {
  setMeProp(_me, "m_npcMoveMode", symbol("move"));
  setMeProp(_me, "m_npcDeltaDistance", lingoBinary("sub", tNpcPos, tPos));
  setMeProp(_me, "m_npcMoveStartPos", tPos);
  setMeProp(_me, "m_npcMoveStartTime", tTime);
  }

  }

  }

  }

  var t_iFrameCounter = callMethod("GetParam", callMethod("getObject", _me), "FRAMECOUNTER");
  if (lingoBinary("gt", meProp(_me, "m_ar_channels").count, 0)) {
  for (var tChannel of meProp(_me, "m_ar_channels").toArray()) {
  callMethod("update", tChannel, t_iFrameCounter)
  }

  }

}

