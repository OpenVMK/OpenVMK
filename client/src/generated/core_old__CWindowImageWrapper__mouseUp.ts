// core.old.cct / CWindowImageWrapper / mouseUp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseUp(_me: LingoMe) {
  var t_ptLoc = callNamed("point", lingoBinary("add", lingoBinary("add", lingoBinary("sub", theProperty("mouseH"), _me.pSprite.locH), meProp(_me, "pOwnX")), meProp(_me, "pOffX")), lingoBinary("add", lingoBinary("add", lingoBinary("sub", theProperty("mouseV"), _me.pSprite.locV), meProp(_me, "pOwnY")), meProp(_me, "pOffY")));
  if (lingoBinary("lt", t_ptLoc.locH, 0)) {
  setThePropOf(t_ptLoc, "locH", 0);
  }

  if (lingoBinary("lt", t_ptLoc.locV, 0)) {
  setThePropOf(t_ptLoc, "locV", 0);
  }

  return t_ptLoc;
}

