// vmk_domestic.cct / CRoomFactorDomestic / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iWlkStartTime", 0);
  setMeProp(_me, "m_iStatusDelay", 500);
  setMeProp(_me, "m_veDistance", callNamed("vector"));
  setMeProp(_me, "m_bWalking", 0);
  setMeProp(_me, "m_rTarget", undefined);
  setMeProp(_me, "m_iTarget", 0);
  setMeProp(_me, "m_rOldTarget", undefined);
  setMeProp(_me, "m_iOldStack", 0);
  setMeProp(_me, "m_veTarget", callNamed("vector"));
  setMeProp(_me, "m_veSource", callNamed("vector"));
  setMeProp(_me, "m_rZTransfer", callNamed("createObject", symbol("random"), "CTransferFunction", "CRampClampTransferFunction"));
  return 1;
}

