// d1ee027a52e24196484455ed8484679f.cct / CScale9Grid / checkSize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkSize(_me: LingoMe, t_iWidth: LingoValue, t_iHeight: LingoValue, t_xOffset: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_iWidth"), 0)) {
  setMeProp(_me, "m_iWidth", t_iWidth);
  }

  if (lingoBinary("eq", meProp(_me, "m_iHeight"), 0)) {
  setMeProp(_me, "m_iHeight", t_iHeight);
  }

  setThePropOf(meProp(_me, "m_pPos"), "locH", callNamed("max", meProp(_me, "m_pPos").locH, t_xOffset));
  setMeProp(_me, "m_bNeedUpdate", 1);
}

