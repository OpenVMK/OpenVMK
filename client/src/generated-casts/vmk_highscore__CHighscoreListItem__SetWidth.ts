// vmk_highscore.cct / CHighscoreListItem / SetWidth

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetWidth(_me: LingoMe, a_iWidth: LingoValue) {
  setMeProp(_me, "m_iTab2", lingoBinary("sub", a_iWidth, 30));
  setMeProp(_me, "m_iTab2", callNamed("min", meProp(_me, "m_iTab2"), 200));
  setMeProp(_me, "m_iWidth", a_iWidth);
}

