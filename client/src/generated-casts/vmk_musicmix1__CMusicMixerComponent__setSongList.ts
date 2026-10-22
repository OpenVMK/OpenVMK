// vmk_musicmix1.cct / CMusicMixerComponent / setSongList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setSongList(_me: LingoMe, i_ar_list: LingoValue, i_bOpenManager: LingoValue) {
  var t_pOldSongList = callMethod("duplicate", meProp(_me, "m_pSongList"));
  var t_ar_oldNames = new LingoList([]);
  for (var tSong of t_pOldSongList.toArray()) {
  callMethod("append", t_ar_oldNames, tSong.name)
  }

  if (lingoBinary("eq", callNamed("ilk", i_ar_list), symbol("list"))) {
  setMeProp(_me, "m_pSongList", i_ar_list);
  callMethod("setSongList", callMethod("getInterface", _me), meProp(_me, "m_pSongList"), i_bOpenManager)
  callNamed("put", lingoBinary("join", lingoBinary("join", t_pOldSongList, "\r"), meProp(_me, "m_pSongList")))
  if (lingoBinary("eq", callMethod("getEditingMode", _me), symbol("new"))) {
  for (var i = 1; i <= meProp(_me, "m_pSongList").count; ++i) {
  tSong = meProp(_me, "m_pSongList")[i];
  if (lingoBinary("eq", callMethod("getOne", t_ar_oldNames, tSong.name), 0)) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Found new at", i), tSong))
  callMethod("setActiveSong", _me, i)
  break;
  }

  }

  callMethod("setEditingMode", _me, symbol("edit"))
  }

  }

}

