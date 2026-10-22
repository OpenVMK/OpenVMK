// vmk_hm_minigame.cct / CHMGameInterface / ReadKeys

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ReadKeys(_me: LingoMe) {
  var t_left = 0;
  var t_up = 0;
  var t_right = 0;
  var t_down = 0;
  var t_action = 0;
  var t_bNumPad = 1;
  switch (1) {
case callMethod("keyPressed", _key, 91):
  var t_iDir = 0;
  break;
case callMethod("keyPressed", _key, 92):
  t_iDir = 1;
  break;
case callMethod("keyPressed", _key, 88):
  t_iDir = 2;
  break;
case callMethod("keyPressed", _key, 85):
  t_iDir = 3;
  break;
case callMethod("keyPressed", _key, 84):
  t_iDir = 4;
  break;
case callMethod("keyPressed", _key, 83):
  t_iDir = 5;
  break;
case callMethod("keyPressed", _key, 86):
  t_iDir = 6;
  break;
case callMethod("keyPressed", _key, 89):
  t_iDir = 7;
  break;
  default:
  t_bNumPad = 0;
  t_up = lingoBinary("mul", callMethod("keyPressed", _key, meProp(_me, "m_ar_iKeyTable").up), 1);
  t_right = lingoBinary("mul", callMethod("keyPressed", _key, meProp(_me, "m_ar_iKeyTable").right), 2);
  t_down = lingoBinary("mul", callMethod("keyPressed", _key, meProp(_me, "m_ar_iKeyTable").down), 4);
  t_left = lingoBinary("mul", callMethod("keyPressed", _key, meProp(_me, "m_ar_iKeyTable").left), 8);
  var t_iState = lingoBinary("add", lingoBinary("add", lingoBinary("add", t_up, t_right), t_down), t_left);
  switch (t_iState) {
case 0:
  t_iDir = -float(1);
  break;
case 1:
  t_iDir = 1;
  break;
case 2:
  t_iDir = 3;
  break;
case 3:
  t_iDir = 2;
  break;
case 4:
  t_iDir = 5;
  break;
case 5:
  t_iDir = -float(1);
  break;
case 6:
  t_iDir = 4;
  break;
case 7:
  t_iDir = 3;
  break;
case 8:
  t_iDir = 7;
  break;
case 9:
  t_iDir = 0;
  break;
case 10:
  t_iDir = -float(1);
  break;
case 11:
  t_iDir = 1;
  break;
case 12:
  t_iDir = 6;
  break;
case 13:
  t_iDir = 7;
  break;
case 14:
  t_iDir = 5;
  break;
case 15:
  t_iDir = -float(1);
  break;
  default:
  t_iDir = -float(1);
  }

  if (lingoBinary("gt", t_iDir, -float(1))) {
  t_iDir = meProp(_me, "m_ar_directions")[lingoBinary("add", t_iDir, 1)];
  }

  }

  t_action = callMethod("keyPressed", _key, meProp(_me, "m_ar_iKeyTable").Action);
  return new LingoList([t_iDir, lingoBinary("or", lingoBinary("or", t_action, _key.controlDown), _key.shiftDown), t_bNumPad]);
}

