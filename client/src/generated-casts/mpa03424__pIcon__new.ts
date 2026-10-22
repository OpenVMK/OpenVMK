// mpa03424.dcr / pIcon / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe, inList: LingoValue) {
  setMeProp(_me, "pTime", 0);
  var tNr = inList[symbol("pNr")];
  setMeProp(_me, "pStatus", inList[symbol("pVer")]);
  setMeProp(_me, "pSprite", callNamed("sprite", lingoBinary("add", 10, tNr)));
  setMeProp(_me, "pwidth", meProp(_me, "pSprite").width);
  setMeProp(_me, "pheight", meProp(_me, "pSprite").height);
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("start"))) {
  setMeProp(_me, "pBoing", callMethod("new", callNamed("script", "pBoing"), new LingoPropList([symbol("pStiff"), 0.2, symbol("pDamp"), 0.7, symbol("pPos"), 100, symbol("pStatus"), symbol("bounce")])));
  setThePropOf(meProp(_me, "pSprite"), "width", 1);
  setThePropOf(meProp(_me, "pSprite"), "height", 1);
  setThePropOf(meProp(_me, "pSprite"), "blend", 100);
  }

  return _me;
}

