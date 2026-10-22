// 1a936647fad14382b01ad7810fd3d19f.cct / CRadioButtonMenu / getActiveDescription

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getActiveDescription(_me: LingoMe) {
  for (var t_Elem of meProp(_me, "m_pElements").toArray()) {
  if (t_Elem.Active) {
  return callMethod("getaProp", t_Elem, symbol("description"));
  }

  }

  return "";
}

