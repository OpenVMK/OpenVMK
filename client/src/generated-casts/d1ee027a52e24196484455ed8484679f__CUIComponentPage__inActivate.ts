// d1ee027a52e24196484455ed8484679f.cct / CUIComponentPage / inActivate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function inActivate(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rActive"))) {
  callMethod("inActivate", meProp(_me, "m_rActive"))
  callMethod("render", meProp(_me, "m_rActive"), meProp(_me, "m_rWriter"))
  }

  if (callNamed("objectp", meProp(_me, "m_rActiveComponent"))) {
  callMethod("showAsActive", meProp(_me, "m_rActiveComponent"), 0)
  callMethod("render", meProp(_me, "m_rActiveComponent"), meProp(_me, "m_rWriter"))
  }

  setMeProp(_me, "m_rActive", undefined);
  setMeProp(_me, "m_rActiveComponent", undefined);
}

