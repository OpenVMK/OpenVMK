// 1a936647fad14382b01ad7810fd3d19f.cct / NEEWCHelpContent / inside

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function inside(_me: LingoMe, loc: LingoValue, t_target: LingoValue) {
  var t_loc = lingoBinary("sub", loc, meProp(_me, "pOffset"));
  if (callMethod("inside", t_loc, meProp(_me, "pLayoutImg").rect)) {
  setThePropOf(t_target, "locH", t_loc.locH);
  setThePropOf(t_target, "locV", t_loc.locV);
  return 1;
  }

  return 0;
}

