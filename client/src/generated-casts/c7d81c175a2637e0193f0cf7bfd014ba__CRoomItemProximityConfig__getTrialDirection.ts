// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemProximityConfig / getTrialDirection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getTrialDirection(_me: LingoMe, t_iOldDir: LingoValue, t_iRotDir: LingoValue) {
  var t_newPos = lingoBinary("add", t_iOldDir, t_iRotDir);
  if (lingoBinary("lt", t_newPos, 1)) {
  t_newPos = meProp(_me, "m_ar_directions").count;
  }

  if (lingoBinary("gt", t_newPos, meProp(_me, "m_ar_directions").count)) {
  t_newPos = lingoBinary("mod", t_newPos, meProp(_me, "m_ar_directions").count);
  }

  return meProp(_me, "m_ar_directions")[t_newPos];
}

