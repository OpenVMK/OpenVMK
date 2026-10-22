// vmk_hm_minigame.cct / CHMAvatarClassPossessed / Action

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Action(_me: LingoMe, a_Ar_Data: LingoValue) {
  var i_iDir = a_Ar_Data[1];
  switch (i_iDir) {
case 0:
  setMeProp(_me, "m_iDir", 0);
  setMeProp(_me, "m_bFlip", 0);
  break;
case 1:
  setMeProp(_me, "m_iDir", 1);
  setMeProp(_me, "m_bFlip", 0);
  break;
case 2:
  setMeProp(_me, "m_iDir", 2);
  setMeProp(_me, "m_bFlip", 0);
  break;
case 3:
  setMeProp(_me, "m_iDir", 3);
  setMeProp(_me, "m_bFlip", 0);
  break;
case 4:
  setMeProp(_me, "m_iDir", 4);
  setMeProp(_me, "m_bFlip", 0);
  break;
case 5:
  setMeProp(_me, "m_iDir", 3);
  setMeProp(_me, "m_bFlip", 1);
  break;
case 6:
  setMeProp(_me, "m_iDir", 2);
  setMeProp(_me, "m_bFlip", 1);
  break;
case 7:
  setMeProp(_me, "m_iDir", 1);
  setMeProp(_me, "m_bFlip", 1);
  break;
  default:
  setMeProp(_me, "m_iDir", 0);
  setMeProp(_me, "m_bFlip", 1);
  }

}

