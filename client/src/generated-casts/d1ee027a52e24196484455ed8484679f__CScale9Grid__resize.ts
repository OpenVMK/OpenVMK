// d1ee027a52e24196484455ed8484679f.cct / CScale9Grid / resize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resize(_me: LingoMe, i_w: LingoValue, i_h: LingoValue) {
  setMeProp(_me, "m_iWidth", i_w);
  setMeProp(_me, "m_iHeight", i_h);
  setMeProp(_me, "m_bNeedUpdate", 1);
}

