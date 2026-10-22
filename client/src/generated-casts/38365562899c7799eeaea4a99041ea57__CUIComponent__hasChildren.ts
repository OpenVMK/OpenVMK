// 38365562899c7799eeaea4a99041ea57.cct / CUIComponent / hasChildren

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hasChildren(_me: LingoMe) {
  return callNamed("bitAnd", lingoBinary("gt", meProp(_me, "m_ar_Children").count, 0), meProp(_me, "m_bShowChildren"));
}

