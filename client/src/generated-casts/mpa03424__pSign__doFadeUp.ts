// mpa03424.dcr / pSign / doFadeUp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function doFadeUp(_me: LingoMe) {
  setMeProp(_me, "pTime", lingoBinary("add", meProp(_me, "pTime"), 1));
  if (lingoBinary("lt", meProp(_me, "pTime"), 11)) {
  setMeProp(_me, "pSignV", lingoBinary("add", meProp(_me, "pSignV"), meProp(_me, "pSpeedV")));
  setMeProp(_me, "pLoaderV", lingoBinary("add", meProp(_me, "pLoaderV"), meProp(_me, "pSpeedV")));
  } else {
  callMethod("frameEvent", meProp(_me, "pSignBounce"))
  setMeProp(_me, "pSignV", lingoBinary("add", meProp(_me, "pSignToV"), meProp(_me, "pSignBounce").pPos));
  callMethod("frameEvent", meProp(_me, "pLoaderBounce"))
  setMeProp(_me, "pLoaderV", lingoBinary("add", meProp(_me, "pLoaderToV"), meProp(_me, "pLoaderBounce").pPos));
  }

  callMethod("doCloud", _me)
  setThePropOf(meProp(_me, "pSign"), "locV", meProp(_me, "pSignV"));
  setThePropOf(meProp(_me, "pLoader"), "locV", meProp(_me, "pLoaderV"));
  if (lingoBinary("eq", meProp(_me, "pTime"), 100)) {
  }

}

