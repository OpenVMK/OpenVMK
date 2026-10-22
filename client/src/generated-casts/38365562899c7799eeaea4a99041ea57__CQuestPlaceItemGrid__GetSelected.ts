// 38365562899c7799eeaea4a99041ea57.cct / CQuestPlaceItemGrid / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("lt", meProp(_me, "m_mp_iRef_rItem").count, meProp(_me, "m_iSelected"))) {
  return undefined;
  } else {
  return meProp(_me, "m_mp_iRef_rItem")[meProp(_me, "m_iSelected")];
  }

}

