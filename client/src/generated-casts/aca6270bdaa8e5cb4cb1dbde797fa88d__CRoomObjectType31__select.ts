// aca6270bdaa8e5cb4cb1dbde797fa88d.cct / CRoomObjectType31 / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe) {
  callNamed("put", "Photoalbum opened")
  setMeProp(_me, "m_albumview", callNamed("createObject", symbol("random"), "CPhotoAlbumViewer"));
  callNamed("callAncestor", symbol("select"), _me)
}

