// vmk_monorail_musicmix_handler.cct / CMusicPlayerHandler / SongList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SongList(_me: LingoMe, tMsg: LingoValue) {
  var t_songCount = callMethod("parseSongList", _me, tMsg);
}

