// mpa03424.dcr / pBoing / bounce

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function bounce(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("bounce"))) {
  setMeProp(_me, "pVeloc", lingoBinary("add", meProp(_me, "pVeloc"), lingoBinary("mul", lingoBinary("sub", meProp(_me, "pDest"), meProp(_me, "pPos")), meProp(_me, "pStiff"))));
  setMeProp(_me, "pVeloc", lingoBinary("mul", meProp(_me, "pVeloc"), meProp(_me, "pDamp")));
  setMeProp(_me, "pPos", lingoBinary("add", meProp(_me, "pPos"), meProp(_me, "pVeloc")));
  if (lingoBinary("and", lingoBinary("lt", callNamed("abs", meProp(_me, "pVeloc")), 0.1), lingoBinary("lt", callNamed("abs", lingoBinary("sub", meProp(_me, "pDest"), meProp(_me, "pPos"))), 0.1))) {
  setMeProp(_me, "pPos", meProp(_me, "pDest"));
  setMeProp(_me, "pStatus", symbol("nothing"));
  }

  }

  return meProp(_me, "pPos");
}

