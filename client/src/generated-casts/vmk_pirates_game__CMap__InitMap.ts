// vmk_pirates_game.cct / CMap / InitMap

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitMap(_me: LingoMe, i_width: LingoValue, i_height: LingoValue) {
  setMeProp(_me, "m_map", new LingoList([]));
  for (var l = 1; l <= i_height; ++l) {
  var tdata = new LingoList([]);
  for (var c = 1; c <= i_width; ++c) {
  callMethod("append", tdata, 0)
  }

  callMethod("append", meProp(_me, "m_map"), tdata)
  }

}

