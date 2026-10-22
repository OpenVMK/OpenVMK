// 38365562899c7799eeaea4a99041ea57.cct / CUIComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bActive", 0);
  setMeProp(_me, "m_bShowAsActive", 0);
  setMeProp(_me, "m_ar_layouts", new LingoList([]));
  setMeProp(_me, "m_ar_Children", new LingoList([]));
  setMeProp(_me, "m_bShowChildren", 0);
  return 1;
}

