// 1a936647fad14382b01ad7810fd3d19f.cct / CRadioButtonMenu / getActiveElementID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getActiveElementID(_me: LingoMe) {
  if (meProp(_me, "m_pElements")[1].Active) {
  return 1;
  }

  if (meProp(_me, "m_pElements")[2].Active) {
  return 2;
  }

  if (meProp(_me, "m_pElements")[3].Active) {
  return 0;
  }

  return -float(1);
}

