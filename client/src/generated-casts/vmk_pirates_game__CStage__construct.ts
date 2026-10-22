// vmk_pirates_game.cct / CStage / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_startPositions", new LingoList([]));
  setMeProp(_me, "m_ar_items", new LingoList([]));
  setMeProp(_me, "m_mp_fixtures", new LingoPropList([symbol("buildings"), new LingoPropList([]), symbol("turrets"), new LingoPropList([]), symbol("oilbuildings"), new LingoPropList([])]));
  setMeProp(_me, "m_collisionMap", undefined);
  setMeProp(_me, "m_mp_scores", new LingoPropList([]));
  setMeProp(_me, "m_mp_wind", new LingoPropList([]));
  setMeProp(_me, "m_mp_powerupsettings", new LingoPropList([]));
  setMeProp(_me, "m_sMusic", "");
  setMeProp(_me, "m_bMoonlightUserTriggered", 0);
  return 1;
}

