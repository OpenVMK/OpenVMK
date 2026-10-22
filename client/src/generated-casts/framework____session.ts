// framework.dcr /  / session

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function session(_me: LingoMe, stage: LingoValue) {
  if (stage.tSession) {
  callNamed("trace", 0)
  } else {
  if (lingoBinary("eq", theProperty("memberExists"), "Author")) {
  var height = ".cst";
  } else {
  height = ".cct";
  var width = 3;
  var rect = lingoBinary("join", lingoBinary("join", theProperty("member"), "vmk_core/core"), height);
  setThePropOf(callNamed("getmemnum", width), "sprite", rect);
  setThePropOf(stage, "tSession", 0);
  callNamed("reserveSprite", theProperty("getID"))
  setThePropOf(callNamed("getmemnum", width), "pLogoSpr", 1);
  setThePropOf(stage, "blend", callNamed("ink", callNamed("getmemnum", width).sprite));
  callMethod("point", theProperty("locZ"), stage)
  callNamed("trace", 1)
  }

  }

}

