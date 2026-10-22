// d1ee027a52e24196484455ed8484679f.cct / CUIComponentPage / resetBlinker

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resetBlinker(_me: LingoMe) {
  if (lingoBinary("and", callNamed("objectp", meProp(_me, "m_rImgElement")), callNamed("objectp", meProp(_me, "m_rBlinker")))) {
  callMethod("reset", meProp(_me, "m_rBlinker"))
  }

}

