// core.old.cct / CVisualizerXML / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("removeUpdate", callMethod("getID", _me))
  var tSprMgr = callNamed("getSpriteManager");
  for (var i = 1; i <= meProp(_me, "pElementGroups").count; ++i) {
  for (var tstate of meProp(_me, "pElementGroups")[i][symbol("states")].toArray()) {
  for (var tElement of tstate.toArray()) {
  callMethod("removeProcedure", tElement.sprite)
  callNamed("removeEventBroker", tElement.sprite.spriteNum)
  }

  }

  }

  for (var i = 1; i <= meProp(_me, "pSpriteList").count; ++i) {
  callNamed("releaseSprite", meProp(_me, "pSpriteList")[i].spriteNum)
  }

  setMeProp(_me, "pSpriteList", new LingoList([]));
  setMeProp(_me, "pSpriteData", new LingoList([]));
  setMeProp(_me, "pActSprList", new LingoPropList([]));
  setMeProp(_me, "pBoundary", new LingoList([]));
  return 1;
}

