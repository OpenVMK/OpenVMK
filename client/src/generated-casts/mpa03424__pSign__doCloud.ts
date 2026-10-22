// mpa03424.dcr / pSign / doCloud

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function doCloud(_me: LingoMe) {
  callMethod("frameEvent", meProp(_me, "pCloudBounce"))
  setMeProp(_me, "pCloudV", lingoBinary("add", meProp(_me, "pCloudToV"), meProp(_me, "pCloudBounce").pPos));
  setThePropOf(meProp(_me, "pCloud"), "locV", meProp(_me, "pCloudV"));
}

