// mpa03424.dcr / pSign / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe) {
  setMeProp(_me, "pStatus", symbol("fadeUpCloud"));
  setMeProp(_me, "pSignToV", 185);
  setMeProp(_me, "pCloudToV", 59);
  setMeProp(_me, "pLoaderToV", 327);
  setMeProp(_me, "pSpeedV", 30);
  setMeProp(_me, "pSignBounce", callMethod("new", callNamed("script", "pBoing"), new LingoPropList([symbol("pStiff"), 0.08, symbol("pDamp"), 0.85, symbol("pPos"), meProp(_me, "pSpeedV"), symbol("pStatus"), symbol("bounce")])));
  setMeProp(_me, "pLoaderBounce", callMethod("new", callNamed("script", "pBoing"), new LingoPropList([symbol("pStiff"), 0.06, symbol("pDamp"), 0.9, symbol("pPos"), meProp(_me, "pSpeedV"), symbol("pStatus"), symbol("bounce")])));
  setMeProp(_me, "pCloudBounce", callMethod("new", callNamed("script", "pBoing"), new LingoPropList([symbol("pStiff"), 0.06, symbol("pDamp"), 0.8, symbol("pPos"), -float(71), symbol("pStatus"), symbol("bounce")])));
  setMeProp(_me, "pSign", callNamed("sprite", 15));
  setMeProp(_me, "pCloud", callNamed("sprite", 40));
  setMeProp(_me, "pLoader", callNamed("sprite", 16));
  callMethod("initSprites", _me)
  setMeProp(_me, "pTime", 0);
  return _me;
}

