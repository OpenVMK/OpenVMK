// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / SetSpaceID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSpaceID(_me: LingoMe, a_iSpaceID: LingoValue) {
  setMeProp(_me, "m_iSpaceID", a_iSpaceID);
}

