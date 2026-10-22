// vmk_musicmix1.cct / CMusicMixerComponent / getInstrumentType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getInstrumentType(_me: LingoMe, songname: LingoValue) {
  var t_delim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "_");
  var t_item = songname.item[1];
  setTheProperty("itemDelimiter", t_delim);
  return t_item;
}

