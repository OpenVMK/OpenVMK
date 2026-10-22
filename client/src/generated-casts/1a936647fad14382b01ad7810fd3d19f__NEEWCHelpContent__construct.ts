// 1a936647fad14382b01ad7810fd3d19f.cct / NEEWCHelpContent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pHelp", undefined);
  setMeProp(_me, "pTopic", undefined);
  setMeProp(_me, "pwidth", 300);
  setMeProp(_me, "pNeedUpdate", 1);
  setMeProp(_me, "pOffset", callNamed("point", 0, 0));
  return 1;
}

