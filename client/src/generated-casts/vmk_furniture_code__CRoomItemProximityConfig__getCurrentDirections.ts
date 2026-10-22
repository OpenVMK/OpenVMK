// vmk_furniture_code.cct / CRoomItemProximityConfig / getCurrentDirections

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getCurrentDirections(_me: LingoMe) {
  var t_ar_directions = callMethod("duplicate", meProp(_me, "m_ar_configuration"));
  var t_iDir = callNamed("value", callMethod("GetParam", callMethod("getObject", _me), "DIR"));
  var t_iBaseIndex = 1;
  switch (t_iDir) {
case 3:
  t_iBaseIndex = 0;
  break;
case 5:
  t_iBaseIndex = 2;
  break;
case 7:
  t_iBaseIndex = 4;
  break;
case 1:
  t_iBaseIndex = 6;
  break;
  }

  for (var i = 1; i <= meProp(_me, "m_ar_directions").count; ++i) {
  t_ar_directions[i] = callMethod("getTrialDirection", _me, t_iBaseIndex, lingoBinary("add", i, 0));
  }

  return t_ar_directions;
}

