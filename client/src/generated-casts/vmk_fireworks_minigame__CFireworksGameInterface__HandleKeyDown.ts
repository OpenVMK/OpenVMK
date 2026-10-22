// vmk_fireworks_minigame.cct / CFireworksGameInterface / HandleKeyDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleKeyDown(_me: LingoMe, t_direction: LingoValue) {
  var tNum = lingoBinary("add", meProp(_me, "m_iCurrentSelection"), t_direction);
  if (lingoBinary("lt", tNum, 1)) {
  tNum = meProp(_me, "m_ar_mp_selector").count;
  } else {
  if (lingoBinary("gt", tNum, meProp(_me, "m_ar_mp_selector").count)) {
  tNum = 1;
  }

  }

  if (lingoBinary("gt", meProp(_me, "m_ar_mp_selector").count, 0)) {
  setMeProp(_me, "m_iCurrentSelection", tNum);
  setMeProp(_me, "m_sCurrentSelection", meProp(_me, "m_ar_mp_selector")[tNum].name);
  callMethod("PlaceSelector", _me)
  }

  callMethod("rotateSelector", _me, t_direction)
}

