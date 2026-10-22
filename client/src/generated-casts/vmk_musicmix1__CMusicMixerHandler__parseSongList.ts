// vmk_musicmix1.cct / CMusicMixerHandler / parseSongList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseSongList(_me: LingoMe, tMsg: LingoValue, i_bOpenManager: LingoValue) {
  var t_songCount = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_Songs = new LingoList([]);
  if (t_songCount) {
  for (var i = 1; i <= t_songCount; ++i) {
  var t_Song = new LingoPropList([]);
  t_Song[symbol("id")] = callMethod("GetIntFrom", tMsg.connection);
  t_Song[symbol("name")] = callMethod("GetStrFrom", tMsg.connection);
  callMethod("append", t_ar_Songs, t_Song)
  }

  }

  callMethod("setSongList", callMethod("getComponent", _me), t_ar_Songs, i_bOpenManager)
  return t_songCount;
}

