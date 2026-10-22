// d0e535313898676eb605277339b50f27.cct / CLoaderAvatarRender / SetAvatarInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAvatarInfo(_me: LingoMe, a_ObjAvatar: LingoValue) {
  if (callNamed("objectp", a_ObjAvatar)) {
  setMeProp(_me, "m_ObjAvatar", a_ObjAvatar);
  setMeProp(_me, "m_iMyRef", callNamed("value", callMethod("GetParam", a_ObjAvatar, "REF")));
  }

}

