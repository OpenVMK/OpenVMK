// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraComponent / thumbnailDataStored

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function thumbnailDataStored(_me: LingoMe, tContent: LingoValue) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Thumbnail stored succesfully", "ID:"), tContent.word[1]), "Checksum:"), tContent.word[2]))
  var tCS = callMethod("countCS", _me, meProp(_me, "m_storemember").image);
  var tdata = new LingoPropList([symbol("image"), meProp(_me, "m_storemember").media, symbol("time"), lingoBinary("joinPad", theProperty("date"), theProperty("time")), symbol("cs"), tCS]);
  callMethod("storePhotoData", callNamed("getBinaryManager"), tdata, callMethod("getID", _me))
}

