// vmk_junglecruise_minigame.cct / CBoundingCircle / followBind

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function followBind(_me: LingoMe) {
  setMeProp(_me, "follower", 1);
  setMeProp(_me, "origin", lingoBinary("sub", meProp(_me, "bind").origin, meProp(_me, "bindDistance")));
}

