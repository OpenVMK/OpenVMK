// vmk_pirates_game.cct / CMap / ReadMap

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ReadMap(_me: LingoMe, i_sText: LingoValue) {
  setMeProp(_me, "m_tilesize", callNamed("value", i_sText.line[1]));
  setMeProp(_me, "m_offset", callNamed("point", callNamed("value", i_sText.line[2]), callNamed("value", i_sText.line[3])));
  for (var l = 4; l <= chunkCount(i_sText, "line"); ++l) {
  var tdata = new LingoList([]);
  var tLine = i_sText.line[l];
  for (var c = 1; c <= chunkCount(tLine, "char"); ++c) {
  callMethod("append", tdata, callNamed("value", tLine.char[c]))
  }

  callMethod("append", meProp(_me, "m_map"), tdata)
  }

}

