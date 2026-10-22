// vmk_hm_minigame.cct / CHMVisualGhost / setDirection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDirection(_me: LingoMe, i_iDir: LingoValue, i_iMood: LingoValue) {
  switch (i_iDir) {
case 0:
  setMeProp(_me, "m_iDirection", 0);
  setMeProp(_me, "m_bFlip", 0);
  break;
case 1:
  setMeProp(_me, "m_iDirection", 1);
  setMeProp(_me, "m_bFlip", 0);
  break;
case 2:
  setMeProp(_me, "m_iDirection", 2);
  setMeProp(_me, "m_bFlip", 0);
  break;
case 3:
  setMeProp(_me, "m_iDirection", 3);
  setMeProp(_me, "m_bFlip", 0);
  break;
case 4:
  setMeProp(_me, "m_iDirection", 4);
  setMeProp(_me, "m_bFlip", 0);
  break;
case 5:
  setMeProp(_me, "m_iDirection", 3);
  setMeProp(_me, "m_bFlip", 1);
  break;
case 6:
  setMeProp(_me, "m_iDirection", 2);
  setMeProp(_me, "m_bFlip", 1);
  break;
case 7:
  setMeProp(_me, "m_iDirection", 1);
  setMeProp(_me, "m_bFlip", 1);
  break;
  default:
  setMeProp(_me, "m_iDirection", 0);
  setMeProp(_me, "m_bFlip", 1);
  }

  switch (i_iMood) {
case 0:
  setMeProp(_me, "m_sMood", "idl");
  break;
case 1:
  setMeProp(_me, "m_sMood", "chs");
  break;
case 2:
  setMeProp(_me, "m_sMood", "flee");
  break;
  default:
  setMeProp(_me, "m_sMood", "idl");
  }

}

