// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemHideable / SetVisibility

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetVisibility(_me: LingoMe) {
  var t_rItem = callMethod("getObject", _me);
  var t_ar_rBlocks = callMethod("GetBlocks", callMethod("GetFactor", t_rItem));
  for (var i = 1; i <= t_ar_rBlocks.count; ++i) {
  var t_rBlock = t_ar_rBlocks[i];
  var t_ar_rSprites = callMethod("GetSprites", callMethod("GetVisual", t_rBlock));
  for (var t_rSpr of t_ar_rSprites.toArray()) {
  setThePropOf(t_rSpr, "visible", meProp(_me, "m_bVisible"));
  }

  }

}

