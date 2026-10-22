// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / HideFindableItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideFindableItem(_me: LingoMe, t_ar_data: LingoValue) {
  if (callNamed("listp", t_ar_data)) {
  callMethod("hideFoundItem", _me, t_ar_data)
  } else {
  for (var t_rSprite of meProp(_me, "m_ar_QuestItemSprites").toArray()) {
  callNamed("releaseSprite", t_rSprite.spriteNum)
  }

  setMeProp(_me, "m_ar_QuestItemSprites", new LingoList([]));
  }

}

