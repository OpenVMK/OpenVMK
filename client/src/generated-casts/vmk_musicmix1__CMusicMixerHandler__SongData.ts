// vmk_musicmix1.cct / CMusicMixerHandler / SongData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SongData(_me: LingoMe, tMsg: LingoValue) {
  var t_data = callMethod("GetStrFrom", tMsg.connection);
  var t_songData = t_data.value;
  if (lingoBinary("eq", callNamed("ilk", t_songData), symbol("list"))) {
  callMethod("SetTrackData", callMethod("getComponent", _me), t_songData)
  }

}

