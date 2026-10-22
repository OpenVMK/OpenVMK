// 1cc3629b03705a2da146e4473dbbaac4.cct / CThumbList / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_Img", callNamed("image", 0, 0, 32));
  setMeProp(_me, "m_width", 0);
  setMeProp(_me, "m_height", 0);
  setMeProp(_me, "m_margin", 4);
  setMeProp(_me, "m_dimHorz", 4);
  setMeProp(_me, "m_dimVert", 3);
  setMeProp(_me, "m_ar_items", new LingoList([]));
  return 1;
}

