// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_reloadfurnimaps

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_reloadfurnimaps(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  callMethod("set", callNamed("getObject", symbol("variable_manager")), "furnituremap_url.1", lingoBinary("join", "http://204.12.216.42:8080/GetText/furnimaps/", callNamed("random", 1234512345)))
  callMethod("_LoadMapFile", callMethod("getComponent", callNamed("getThread", "room")).m_rFurniMap)
}

