// vmk_sound.cct / Sound Manager Class / getProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getProperty(_me: LingoMe, tPropID: LingoValue) {
  switch (tPropID) {
case symbol("channelCount"):
  return meProp(_me, "pChannelList").count;
  }

  return 0;
}

