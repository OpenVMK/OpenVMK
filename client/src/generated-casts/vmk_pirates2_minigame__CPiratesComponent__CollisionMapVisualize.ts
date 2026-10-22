// vmk_pirates2_minigame.cct / CPiratesComponent / CollisionMapVisualize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CollisionMapVisualize(_me: LingoMe) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  callNamed("removeObject", "qwerty")
  callNamed("createObject", "qwerty", "CVisualizeCollisionMap")
  setMeProp(_me, "m_cmapVisualizer", callNamed("getObject", "qwerty"));
  callMethod("CreateImage", meProp(_me, "m_cmapVisualizer"), "CMapTestImage", callMethod("GetCollisionMap", meProp(_me, "m_stage")))
  setMeProp(_me, "m_cmapVisualSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_cmapVisualSprite"), "member", callNamed("getMember", "CMapTestImage"));
  setThePropOf(meProp(_me, "m_cmapVisualSprite"), "ink", 33);
  setThePropOf(meProp(_me, "m_cmapVisualSprite"), "loc", callNamed("point", lingoBinary("div", theProperty("stage").image.width, 2), lingoBinary("div", theProperty("stage").image.height, 2)));
  setThePropOf(meProp(_me, "m_cmapVisualSprite"), "locZ", 15000);
}

