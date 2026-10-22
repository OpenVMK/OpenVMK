// vmk_highscore.cct / CHighscoreListItem / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_Img", undefined);
  setMeProp(_me, "m_sWriterPlainID", lingoBinary("join", "RoomInstanceItem", callNamed("getUniqueID")));
  setMeProp(_me, "m_iMargin", 0);
  setMeProp(_me, "m_bState", 0);
  setMeProp(_me, "m_bSpecial", 0);
  setMeProp(_me, "m_iType", 2);
  setMeProp(_me, "m_sLand", undefined);
  setMeProp(_me, "m_iWidth", 0);
  setMeProp(_me, "m_iTab1", 20);
  setMeProp(_me, "m_iTab2", 200);
  setMeProp(_me, "m_textColor", callNamed("rgb", 0, 0, 0));
}

