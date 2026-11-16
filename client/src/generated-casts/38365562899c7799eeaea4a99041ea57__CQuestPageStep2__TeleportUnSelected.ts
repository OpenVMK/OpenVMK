// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / TeleportUnSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TeleportUnSelected(_me: LingoMe, a_iOtherID: LingoValue) {
  return;
  if (lingoBinary("eq", meProp(_me, "m_iCurPageName"), symbol("items"))) {
  callMethod("Unhighlight", meProp(_me, "m_rGridRenderer"))
  }

  callMethod("resetBlinker", meProp(_me, "m_ar_components")["quest.prizes"])
}

