// vmk_hm_minigame.cct / CollisionEngineMathMethods / rotateBlk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rotateBlk(_me: LingoMe, a_blk: LingoValue, a_iDir: LingoValue, a_iMaxX: LingoValue, a_iMaxY: LingoValue) {
  var t_rRotBlk = new LingoPropList([symbol("x"), a_blk.x, symbol("y"), a_blk.y]);
  switch (a_iDir) {
case 1:
case "1":
  setThePropOf(t_rRotBlk, "x", a_blk.y);
  setThePropOf(t_rRotBlk, "y", lingoBinary("sub", a_iMaxX, a_blk.x));
  break;
case 7:
case "7":
  setThePropOf(t_rRotBlk, "x", lingoBinary("sub", a_iMaxX, a_blk.x));
  setThePropOf(t_rRotBlk, "y", lingoBinary("sub", a_iMaxY, a_blk.y));
  break;
case 5:
case "5":
  setThePropOf(t_rRotBlk, "x", lingoBinary("sub", a_iMaxY, a_blk.y));
  setThePropOf(t_rRotBlk, "y", a_blk.x);
  break;
  break;
  break;
  break;
  }

  return t_rRotBlk;
}

