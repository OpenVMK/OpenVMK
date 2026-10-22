// vmk_snd_fireworks_preshow.cct / CSoundStart / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  callNamed("executeMessage", "LoadRoomSound", "fireworks_preshow_")
  return 1;
}

