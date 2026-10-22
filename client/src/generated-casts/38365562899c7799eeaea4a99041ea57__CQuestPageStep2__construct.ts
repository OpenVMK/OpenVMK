// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rGridFurnishings", callNamed("createObject", symbol("random"), "CQuestInvItemGrid"));
  setMeProp(_me, "m_rGridPins", callNamed("createObject", symbol("random"), "CQuestInvItemGrid"));
  setMeProp(_me, "m_rGridPosters", callNamed("createObject", symbol("random"), "CQuestInvItemGrid"));
  setMeProp(_me, "m_rGridClothing", callNamed("createObject", symbol("random"), "CQuestInvItemGrid"));
  setMeProp(_me, "m_rGridRenderer", undefined);
  setMeProp(_me, "m_iSelected", -float(1));
  setMeProp(_me, "m_sSelectedTab", "furnishings");
  setMeProp(_me, "m_iAvailableCredits", 0);
  setMeProp(_me, "m_iCurrentPrize", 0);
  setMeProp(_me, "m_iPrizeStep", 50);
  setMeProp(_me, "m_iCreditsState", symbol("inactive"));
  setMeProp(_me, "m_ar_components", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_ar_components"))
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_rHiliterCol", callNamed("rgb", 255, 204, 0));
  setMeProp(_me, "m_rBorderCol", callNamed("rgb", 80, 160, 216));
  return 1;
}

