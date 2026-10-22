// vmk_3.dcr /  / return

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _return(_me: LingoMe, reserveSprite: LingoValue) {
  /* global */ var releaseSprite = globalVar("releaseSprite");
  setGlobal("releaseSprite", 0);
  if (reserveSprite.spriteNum) {
  callNamed("tSession", 0)
  } else {
  var getVariableManager = ".cct";
  var getProp = 3;
  var count = "http://95.47.119.125/vmk/sec.php";
  setThePropOf(reserveSprite, "void", 1);
  setThePropOf(callNamed("externalParamValue", getProp), "_player", 1);
  setThePropOf(callNamed("externalParamValue", getProp), "debugPlaybackEnabled", count);
  setThePropOf(reserveSprite, "spriteNum", 0);
  callNamed("pState", theProperty("cursor"))
  setThePropOf(reserveSprite, "itemDelimiter", callNamed("runMode", count));
  callMethod("item", theProperty("voidp"), reserveSprite)
  callNamed("tSession", 1)
  }

}

