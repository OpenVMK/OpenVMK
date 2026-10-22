// vmk_monorail_train_handler.cct / CStarField / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_pStarAnimations", new LingoList([]));
  setMeProp(_me, "m_iSpeed", 1);
  setMeProp(_me, "m_iState", symbol("stopped"));
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var slowCounter = 0;
  var fastCounter = 0;
  for (var i = 1; i <= 24; ++i) {
  var t_star = callNamed("createObject", symbol("random"), "CStar");
  if (lingoBinary("eq", lingoBinary("mod", i, 2), 0)) {
  callMethod("Init", t_star, 1)
  fastCounter = lingoBinary("add", fastCounter, 1);
  var tName = lingoBinary("join", "viuh_faded", fastCounter);
  } else {
  callMethod("Init", t_star, 2)
  slowCounter = lingoBinary("add", slowCounter, 1);
  tName = lingoBinary("join", "viuh", slowCounter);
  }

  var tNode = callMethod("Search", tRoomContext, "NAME", tName);
  if (lingoBinary("neq", tNode, 0)) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite, 0)) {
  setThePropOf(tSprite, "loc", callNamed("point", -float(1000), -float(1000)));
  setThePropOf(tSprite, "ink", 33);
  callMethod("setSprite", t_star, tSprite)
  }

  }

  callMethod("append", meProp(_me, "m_pStarAnimations"), t_star)
  }

  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

