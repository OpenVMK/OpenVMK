// vmk_hm_overrides.cct / CHMVisualGhostPuff / setDirection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDirection(_me: LingoMe, i_iDir: LingoValue, i_iMood: LingoValue) {
  if (lingoBinary("eq", i_iDir, 0)) {
  setThePropOf(_me, "m_iDirection", 0);
  setMeProp(_me, "m_bFlip", 0);
  } else {
  if (lingoBinary("eq", i_iDir, 1)) {
  setThePropOf(_me, "m_iDirection", 1);
  setMeProp(_me, "m_bFlip", 0);
  } else {
  if (lingoBinary("eq", i_iDir, 2)) {
  setThePropOf(_me, "m_iDirection", 2);
  setMeProp(_me, "m_bFlip", 0);
  } else {
  if (lingoBinary("eq", i_iDir, 3)) {
  setThePropOf(_me, "m_iDirection", 3);
  setMeProp(_me, "m_bFlip", 0);
  } else {
  if (lingoBinary("eq", i_iDir, 4)) {
  setThePropOf(_me, "m_iDirection", 4);
  setMeProp(_me, "m_bFlip", 0);
  } else {
  if (lingoBinary("eq", i_iDir, 5)) {
  setThePropOf(_me, "m_iDirection", 3);
  setMeProp(_me, "m_bFlip", 1);
  } else {
  if (lingoBinary("eq", i_iDir, 6)) {
  setThePropOf(_me, "m_iDirection", 2);
  setMeProp(_me, "m_bFlip", 1);
  } else {
  if (lingoBinary("eq", i_iDir, 7)) {
  setThePropOf(_me, "m_iDirection", 1);
  setMeProp(_me, "m_bFlip", 1);
  } else {
  setThePropOf(_me, "m_iDirection", 0);
  setMeProp(_me, "m_bFlip", 1);
  }

  }

  }

  }

  }

  }

  }

  }

}

