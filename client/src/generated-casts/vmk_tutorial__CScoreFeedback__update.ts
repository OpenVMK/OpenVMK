// vmk_tutorial.cct / CScoreFeedback / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "m_iCounter"), 0)) {
  setMeProp(_me, "m_iCounter", lingoBinary("sub", meProp(_me, "m_iCounter"), 10));
  }

  if (lingoBinary("lte", meProp(_me, "m_iCounter"), 0)) {
  if (lingoBinary("gt", meProp(_me, "m_iBlend"), 0)) {
  setMeProp(_me, "m_iBlend", lingoBinary("sub", meProp(_me, "m_iBlend"), 20));
  setThePropOf(meProp(_me, "m_rSprite"), "blend", meProp(_me, "m_iBlend"));
  }

  }

}

