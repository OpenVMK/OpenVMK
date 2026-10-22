// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bHatListReady", 0);
  setMeProp(_me, "m_bAvailableSetsReady", 0);
  setMeProp(_me, "m_Obj_HmDetails", callNamed("createObject", "HMDetails", "CHiddenMickeyStatus"));
  callNamed("createObject", "ImageCache", "CAvatarImageCache")
  callMethod("regMsgList", _me, 1)
  return 1;
}

