// vmk_highscore.cct / CHighscoreListItem / setLink

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setLink(_me: LingoMe, a_iLink: LingoValue) {
  setMeProp(_me, "m_pLinkedPage", a_iLink);
}

