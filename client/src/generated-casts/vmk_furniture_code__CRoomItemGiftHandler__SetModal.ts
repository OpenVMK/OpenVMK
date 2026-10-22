// vmk_furniture_code.cct / CRoomItemGiftHandler / SetModal

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetModal(_me: LingoMe, a_bModal: LingoValue) {
  setMeProp(_me, "m_bSetmodal", a_bModal);
}

