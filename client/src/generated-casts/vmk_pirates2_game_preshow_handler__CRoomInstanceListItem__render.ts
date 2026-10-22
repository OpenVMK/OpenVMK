// vmk_pirates2_game_preshow_handler.cct / CRoomInstanceListItem / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  if (meProp(_me, "m_bState")) {
  setMeProp(_me, "m_Img", meProp(_me, "m_imgSelected"));
  } else {
  setMeProp(_me, "m_Img", meProp(_me, "m_imgUnselected"));
  }

}

