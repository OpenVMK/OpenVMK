// vmk_hm_minigame.cct / CHMVisualPlayerObject / selectSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function selectSprite(_me: LingoMe) {
  var tColor = callMethod("GetParam", callMethod("getObject", _me), "Team");
  switch (tColor) {
case 1:
  break;
case 2:
  break;
  }

}

