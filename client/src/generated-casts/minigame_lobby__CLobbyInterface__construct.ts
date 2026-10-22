// minigame_lobby.cct / CLobbyInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWindowName", "DefaultLobby");
  setMeProp(_me, "m_iGameListSelection", undefined);
  setMeProp(_me, "m_iPlayerListSelection", undefined);
  setMeProp(_me, "m_iAttributeListSelection", undefined);
  setMeProp(_me, "m_iMyAttributeListSelection", undefined);
  setMeProp(_me, "m_rGameListView", undefined);
  setMeProp(_me, "m_rPlayerListView", undefined);
  setMeProp(_me, "m_rAttributeListView", undefined);
  setMeProp(_me, "m_rMyAttributeListView", undefined);
  return 1;
}

