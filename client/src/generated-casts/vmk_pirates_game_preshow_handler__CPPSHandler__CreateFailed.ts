// vmk_pirates_game_preshow_handler.cct / CPPSHandler / CreateFailed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateFailed(_me: LingoMe, tMsg: LingoValue) {
  callMethod("HidePrestart", callMethod("getInterface", _me))
}

