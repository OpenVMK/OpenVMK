// d1ee027a52e24196484455ed8484679f.cct / CScale9Grid / inActivate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function inActivate(_me: LingoMe) {
  if (meProp(_me, "m_bShowBorder")) {
  }

  setMeProp(_me, "m_bActive", 0);
  setMeProp(_me, "m_bNeedUpdate", 1);
  setMeProp(_me, "m_bShowBorder", 0);
}

