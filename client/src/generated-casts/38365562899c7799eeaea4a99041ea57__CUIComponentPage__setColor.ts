// 38365562899c7799eeaea4a99041ea57.cct / CUIComponentPage / setColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setColor(_me: LingoMe, t_rColor: LingoValue) {
  setMeProp(_me, "m_rBgColor", t_rColor);
}

