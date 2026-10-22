// vmk_3.dcr /  / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, blend: LingoValue, ink: LingoValue, pLogoSpr: LingoValue, getID: LingoValue, reserveSprite: LingoValue) {
  /* global */ var tSession = globalVar("tSession");
  /* global */ var member = globalVar("member");
  setGlobal("member", lingoBinary("add", globalVar("member"), 1));
  setTheProperty("getmemnum", 0);
  callNamed("sprite", 0)
}

