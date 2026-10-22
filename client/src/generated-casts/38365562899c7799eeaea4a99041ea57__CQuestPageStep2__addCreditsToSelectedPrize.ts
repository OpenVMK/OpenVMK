// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / addCreditsToSelectedPrize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addCreditsToSelectedPrize(_me: LingoMe) {
  var t_rComponentPage = meProp(_me, "m_ar_components")["quest.prizes"];
  if (callNamed("objectp", t_rComponentPage)) {
  var t_rActiveComponent = callMethod("GetActiveComponent", t_rComponentPage);
  if (callNamed("objectp", t_rActiveComponent)) {
  var t_rLayout = callMethod("GetLayout", t_rActiveComponent, 2);
  if (callNamed("objectp", t_rLayout)) {
  var t_ar_questData = callMethod("getData", callMethod("GetOwner", callMethod("getManager", _me)));
  var t_iRank = lingoBinary("sub", callMethod("getComponentID", t_rComponentPage, t_rActiveComponent), 1);
  if (lingoBinary("gt", meProp(_me, "m_iCurrentPrize"), 0)) {
  callMethod("AddPrizeCredits", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ar_questData[symbol("questTemplateId")], t_iRank, meProp(_me, "m_iCurrentPrize")]))
  }

  } else {
  callNamed("put", "Choose a prize first")
  }

  }

  }

}

