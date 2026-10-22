// core.old.cct / CMgrSprite / preIndexChannels

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function preIndexChannels(_me: LingoMe) {
  setMeProp(_me, "pTotalSprList", new LingoList([]));
  setMeProp(_me, "pFreeSprList", new LingoList([]));
  setMeProp(_me, "pClientList", new LingoList([]));
  for (var i = 1; i <= theProperty("lastChannel"); ++i) {
  callMethod("add", meProp(_me, "pTotalSprList"), i)
  callMethod("add", meProp(_me, "pClientList"), 0)
  callNamed("puppetSprite", i, 1)
  callMethod("resetSpriteProps", _me, i)
  }

  setMeProp(_me, "pFreeSprList", callMethod("duplicate", meProp(_me, "pTotalSprList")));
  callMethod("sort", meProp(_me, "pTotalSprList"))
  return 1;
}

