// vmk_monorail_mixer.cct / CMusicMixerSongList / setSongList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setSongList(_me: LingoMe, t_ar_Songs: LingoValue) {
  setMeProp(_me, "m_pSongs", new LingoList([]));
  for (var song of t_ar_Songs.toArray()) {
  var t_Song = callNamed("createObject", symbol("random"), "CMusicMixerSongListItem");
  callMethod("setText", t_Song, song.name)
  callMethod("append", meProp(_me, "m_pSongs"), t_Song)
  }

}

