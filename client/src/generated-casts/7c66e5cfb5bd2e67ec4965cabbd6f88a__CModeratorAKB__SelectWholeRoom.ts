// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorAKB / SelectWholeRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SelectWholeRoom(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_ObjUserToOperate", undefined);
  setMeProp(_me, "m_sName", "");
}

