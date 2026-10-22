// vmk_junglecruise_minigame.cct / CHazardManager / SetRoomContext

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetRoomContext(_me: LingoMe, i_rRoomContext: LingoValue) {
  setMeProp(_me, "m_roomContext", i_rRoomContext);
}

