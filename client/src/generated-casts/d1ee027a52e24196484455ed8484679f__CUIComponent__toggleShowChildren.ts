// d1ee027a52e24196484455ed8484679f.cct / CUIComponent / toggleShowChildren

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function toggleShowChildren(_me: LingoMe) {
  setMeProp(_me, "m_bShowChildren", (lingoTruthy(meProp(_me, "m_bShowChildren")) ? 0 : 1));
  return meProp(_me, "m_bShowChildren");
}

