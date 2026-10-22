// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerIconPulser / Activate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Activate(_me: LingoMe) {
  setMeProp(_me, "m_iCounter", 270);
  if (callNamed("voidp", meProp(_me, "m_gPressed"))) {
  callMethod("build", _me)
  }

  setMeProp(_me, "m_bActive", 1);
}

