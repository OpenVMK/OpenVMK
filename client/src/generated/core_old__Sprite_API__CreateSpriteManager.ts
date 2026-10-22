// core.old.cct / Sprite API / CreateSpriteManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateSpriteManager(_me: LingoMe) {
  return callNamed("createManager", symbol("sprite_manager"), callNamed("GetClsVariable", "sprite.manager.class"));
}

