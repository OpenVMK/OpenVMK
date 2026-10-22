// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / initQuestItemSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initQuestItemSprite(_me: LingoMe) {
  var t_rSprite = callNamed("sprite", callNamed("reserveSprite"));
  setThePropOf(t_rSprite, "member", undefined);
  setThePropOf(t_rSprite, "ink", 0);
  setThePropOf(t_rSprite, "blend", 100);
  setThePropOf(t_rSprite, "locV", 0);
  setThePropOf(t_rSprite, "locZ", 0);
  setThePropOf(t_rSprite, "flipH", 0);
  callMethod("append", meProp(_me, "m_ar_QuestItemSprites"), t_rSprite)
  return t_rSprite;
}

