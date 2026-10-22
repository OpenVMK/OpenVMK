// d1ee027a52e24196484455ed8484679f.cct / CUIComponent / resize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resize(_me: LingoMe, t_iWidth: LingoValue, t_iHeight: LingoValue) {
  setMeProp(_me, "m_iWidth", t_iWidth);
  setMeProp(_me, "m_iHeight", t_iHeight);
}

