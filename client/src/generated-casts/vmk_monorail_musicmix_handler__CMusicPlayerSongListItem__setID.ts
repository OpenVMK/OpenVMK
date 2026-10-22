// vmk_monorail_musicmix_handler.cct / CMusicPlayerSongListItem / setID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setID(_me: LingoMe, t_ID: LingoValue) {
  setThePropOf(_me, "m_ID", t_ID);
}

