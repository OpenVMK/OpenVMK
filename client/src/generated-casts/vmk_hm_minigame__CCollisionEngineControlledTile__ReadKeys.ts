// vmk_hm_minigame.cct / CCollisionEngineControlledTile / ReadKeys

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ReadKeys(_me: LingoMe) {
  switch (1) {
case lingoBinary("and", callNamed("keyPressed", 125), callNamed("keyPressed", 123)):
  var t_iDir = meProp(_me, "m_ar_directions")[1];
  break;
case lingoBinary("and", callNamed("keyPressed", 125), callNamed("keyPressed", 124)):
  t_iDir = meProp(_me, "m_ar_directions")[3];
  break;
case lingoBinary("and", callNamed("keyPressed", 126), callNamed("keyPressed", 124)):
  t_iDir = meProp(_me, "m_ar_directions")[5];
  break;
case lingoBinary("and", callNamed("keyPressed", 126), callNamed("keyPressed", 123)):
  t_iDir = meProp(_me, "m_ar_directions")[7];
  break;
case callNamed("keyPressed", 125):
  t_iDir = meProp(_me, "m_ar_directions")[2];
  break;
case callNamed("keyPressed", 124):
  t_iDir = meProp(_me, "m_ar_directions")[4];
  break;
case callNamed("keyPressed", 126):
  t_iDir = meProp(_me, "m_ar_directions")[6];
  break;
case callNamed("keyPressed", 123):
  t_iDir = meProp(_me, "m_ar_directions")[8];
  break;
  default:
  t_iDir = -float(1);
  }

  var t_action = callMethod("keyPressed", _key, 48);
  return new LingoList([t_iDir, lingoBinary("or", lingoBinary("or", t_action, _key.controlDown), _key.shiftDown)]);
}

