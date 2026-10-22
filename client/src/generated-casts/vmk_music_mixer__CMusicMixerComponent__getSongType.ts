// vmk_music_mixer.cct / CMusicMixerComponent / getSongType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getSongType(_me: LingoMe, songname: LingoValue) {
  var t_delim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "_");
  var t_item = songname.item[2];
  setTheProperty("itemDelimiter", t_delim);
  return t_item.char[t_item.length];
}

