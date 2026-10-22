// vmk_npc_matterhorn.cct / CMatterhornHandler / selectNPC

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function selectNPC(_me: LingoMe, npcRef: LingoValue) {
  var tMsg = new LingoPropList([symbol("int"), npcRef, symbol("int"), 0]);
  callMethod("send", callNamed("getConnection", "VMK"), 584, tMsg)
}

