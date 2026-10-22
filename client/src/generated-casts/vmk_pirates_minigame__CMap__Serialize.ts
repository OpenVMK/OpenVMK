// vmk_pirates_minigame.cct / CMap / Serialize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Serialize(_me: LingoMe) {
  var fileio = newObj("xtra", new LingoList(["fileio"]));
  var tFileName = callMethod("displaySave", fileio, "Save map as...", "collisionmap.txt");
  callMethod("createFile", fileio, tFileName)
  callMethod("openfile", fileio, tFileName, 2)
  callMethod("writeString", fileio, lingoBinary("join", callNamed("string", meProp(_me, "m_tilesize")), "\r"))
  callMethod("writeString", fileio, lingoBinary("join", callNamed("string", meProp(_me, "m_offset").locH), "\r"))
  callMethod("writeString", fileio, lingoBinary("join", callNamed("string", meProp(_me, "m_offset").locV), "\r"))
  for (var tLine of meProp(_me, "m_map").toArray()) {
  var tString = "";
  for (var tItem of tLine.toArray()) {
  tString = lingoBinary("join", tString, tItem);
  }

  callMethod("writeString", fileio, lingoBinary("join", tString, "\r"))
  }

  callMethod("closeFile", fileio)
}

