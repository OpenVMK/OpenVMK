// vmk_pirates2_game_preshow_handler.cct / CRoomInstanceListItem / setText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setText(_me: LingoMe, i_sText: LingoValue) {
  setMeProp(_me, "m_tText", i_sText);
  callMethod("ResolveImage", _me)
  callMethod("render", _me)
}

