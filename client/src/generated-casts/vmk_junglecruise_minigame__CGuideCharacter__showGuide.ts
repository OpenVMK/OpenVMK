// vmk_junglecruise_minigame.cct / CGuideCharacter / showGuide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showGuide(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_bGuideVisible")) ? 0 : 1)) {
  setMeProp(_me, "m_charSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setMeProp(_me, "m_barSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_charSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_charSprite"), "locZ", 1);
  setThePropOf(meProp(_me, "m_charSprite"), "loc", callNamed("point", lingoBinary("div", theProperty("stage").image.width, 2), lingoBinary("div", theProperty("stage").image.height, 2)));
  setThePropOf(meProp(_me, "m_charSprite"), "member", meProp(_me, "m_ar_frames")[1]);
  setThePropOf(meProp(_me, "m_charSprite"), "width", meProp(_me, "m_charSprite").member.width);
  setThePropOf(meProp(_me, "m_charSprite"), "height", meProp(_me, "m_charSprite").member.height);
  setThePropOf(meProp(_me, "m_barSprite"), "ink", 1);
  setThePropOf(meProp(_me, "m_barSprite"), "blendLevel", 150);
  setThePropOf(meProp(_me, "m_barSprite"), "locZ", 0);
  setThePropOf(meProp(_me, "m_barSprite"), "loc", callNamed("point", 0, 560));
  setThePropOf(meProp(_me, "m_barSprite"), "width", 800);
  setThePropOf(meProp(_me, "m_barSprite"), "height", 40);
  setMeProp(_me, "m_writerSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_writerSprite"), "member", callNamed("getMember", "NedsText"));
  setThePropOf(meProp(_me, "m_writerSprite"), "loc", callNamed("point", 100, 570));
  setThePropOf(meProp(_me, "m_writerSprite"), "locZ", 0);
  setThePropOf(meProp(_me, "m_writerSprite").member, "image", callNamed("image", 0, 0, 8));
  setThePropOf(meProp(_me, "m_writerSprite"), "width", meProp(_me, "m_writerSprite").member.width);
  setThePropOf(meProp(_me, "m_writerSprite"), "height", meProp(_me, "m_writerSprite").member.height);
  setMeProp(_me, "m_bGuideVisible", 1);
  }

}

