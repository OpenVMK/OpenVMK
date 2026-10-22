// core.old.cct / CMgrSprite / resetSpriteProps

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resetSpriteProps(_me: LingoMe, a_iSpriteNum: LingoValue) {
  var tSprite = callNamed("sprite", a_iSpriteNum);
  setThePropOf(tSprite, "visible", 0);
  setThePropOf(tSprite, "ink", 0);
  setThePropOf(tSprite, "castNum", 0);
  setThePropOf(tSprite, "color", callNamed("rgb", 0, 0, 0));
  setThePropOf(tSprite, "foreColor", 255);
  setThePropOf(tSprite, "backColor", 0);
  setThePropOf(tSprite, "type", 0);
  setThePropOf(tSprite, "loc", callNamed("point", 0, 0));
  setThePropOf(tSprite, "locZ", tSprite.spriteNum);
  setThePropOf(tSprite, "top", 0);
  setThePropOf(tSprite, "left", 0);
  setThePropOf(tSprite, "bottom", 0);
  setThePropOf(tSprite, "right", 0);
  setThePropOf(tSprite, "blend", 100);
  setThePropOf(tSprite, "rotation", 0);
  setThePropOf(tSprite, "skew", 0);
  setThePropOf(tSprite, "stretch", 0);
  setThePropOf(tSprite, "flipH", 0);
  setThePropOf(tSprite, "flipV", 0);
  setThePropOf(tSprite, "cursor", 0);
  setThePropOf(tSprite, "constraint", 0);
  setThePropOf(tSprite, "width", 0);
  setThePropOf(tSprite, "height", 0);
  setThePropOf(tSprite, "rect", callNamed("rect", 0, 0, 0, 0));
  setThePropOf(tSprite, "quad", new LingoList([callNamed("point", 0, 0), callNamed("point", 0, 0), callNamed("point", 0, 0), callNamed("point", 0, 0)]));
  setThePropOf(tSprite, "moveableSprite", 0);
  setThePropOf(tSprite, "scriptInstanceList", new LingoList([]));
  setThePropOf(tSprite, "member", undefined);
}

