// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemEntranceFeeTurnStile / ItemConfiguration

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ItemConfiguration(_me: LingoMe, _this: LingoValue, t_iRef: LingoValue, a_ar_Configuration: LingoValue) {
  setMeProp(_me, "m_iRef", t_iRef);
  callMethod("createItemConfigurationDialog", _this, t_iRef, a_ar_Configuration)
}

