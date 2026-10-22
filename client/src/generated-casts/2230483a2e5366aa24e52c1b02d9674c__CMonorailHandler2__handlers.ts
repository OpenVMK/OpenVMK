// 2230483a2e5366aa24e52c1b02d9674c.cct / CMonorailHandler2 / handlers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handlers(_me: LingoMe) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  return new LingoList([symbol("construct"), symbol("deconstruct"), symbol("handle_monorailstation"), symbol("handle_monorailarrive"), symbol("handle_monoraildepart"), symbol("handle_monorailevent"), symbol("regMsgList")]);
}

