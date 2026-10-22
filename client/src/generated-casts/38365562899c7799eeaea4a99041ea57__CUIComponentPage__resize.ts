// 38365562899c7799eeaea4a99041ea57.cct / CUIComponentPage / resize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resize(_me: LingoMe, t_iWidth: LingoValue, t_iHeight: LingoValue) {
  setMeProp(_me, "m_iWidth", callNamed("max", meProp(_me, "m_iMinWidth"), t_iWidth));
  setMeProp(_me, "m_iHeight", callNamed("max", meProp(_me, "m_iMinHeight"), t_iHeight));
}

