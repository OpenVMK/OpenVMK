// vmk_highscore.cct / CHighscoreListItem / setColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setColor(_me: LingoMe, a_rgbColor: LingoValue) {
  setMeProp(_me, "m_textColor", a_rgbColor);
}

