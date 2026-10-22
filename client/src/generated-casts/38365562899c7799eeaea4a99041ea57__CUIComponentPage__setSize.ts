// 38365562899c7799eeaea4a99041ea57.cct / CUIComponentPage / setSize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setSize(_me: LingoMe, t_iWidth: LingoValue, t_iHeight: LingoValue) {
  setMeProp(_me, "m_iMinWidth", t_iWidth);
  setMeProp(_me, "m_iMinHeight", t_iHeight);
  callMethod("resize", _me, meProp(_me, "m_iMinWidth"), meProp(_me, "m_iMinHeight"))
}

