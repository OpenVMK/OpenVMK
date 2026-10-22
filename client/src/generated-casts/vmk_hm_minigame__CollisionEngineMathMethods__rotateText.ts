// vmk_hm_minigame.cct / CollisionEngineMathMethods / rotateText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rotateText(_me: LingoMe, a_sMemname: LingoValue, a_iDir: LingoValue) {
  var textMem = callNamed("member", a_sMemname);
  if (lingoBinary("lte", textMem._number, 0)) {
  return 0;
  }

  if (callNamed("voidp", a_iDir)) {
  a_iDir = 3;
  }

  var t_ar_findMax = new LingoList([]);
  var t_ar_blocks = new LingoList([]);
  for (var tY = 1; tY <= textMem.line.count; ++tY) {
  for (var tX = 1; tX <= textMem.line[tY].char.count; ++tX) {
  callMethod("append", t_ar_blocks, new LingoPropList([symbol("x"), lingoBinary("sub", tX, 1), symbol("y"), lingoBinary("sub", tY, 1), symbol("char"), textMem.line[tY].char[tX]]))
  callMethod("append", t_ar_findMax, lingoBinary("sub", tX, 1))
  callMethod("append", t_ar_findMax, lingoBinary("sub", tY, 1))
  }

  }

  var t_iMax = callMethod("max", t_ar_findMax);
  var t_ar_rotated = new LingoList([]);
  for (var t_blk of t_ar_blocks.toArray()) {
  var t_rotBlk = callNamed("rotateBlk", t_blk, a_iDir, t_iMax);
  callMethod("append", t_ar_rotated, t_rotBlk)
  }

  var outMem = callNamed("new", symbol("field"));
  for (var i = 1; i <= lingoBinary("add", t_iMax, 1); ++i) {
  outMem.line[i].char[i] = " ";
  }

  for (var t_blk of t_ar_rotated.toArray()) {
  outMem.line[lingoBinary("add", t_blk.y, 1)].char[lingoBinary("add", t_blk.x, 1)] = t_blk.char;
  }

  callNamed("put", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "\r", textMem.text), "\r"), "\r"), outMem.text), "\r"))
}

