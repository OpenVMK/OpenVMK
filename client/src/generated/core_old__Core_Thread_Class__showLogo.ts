// core.old.cct / Core Thread Class / showLogo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showLogo(_me: LingoMe, _this: LingoValue) {
  if (callNamed("memberExists", "Logo")) {
  var tmember = callNamed("member", callNamed("getmemnum", "Logo"));
  setMeProp(_me, "pLogoSpr", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _this))));
  setThePropOf(meProp(_me, "pLogoSpr"), "ink", 0);
  setThePropOf(meProp(_me, "pLogoSpr"), "blend", 100);
  setThePropOf(meProp(_me, "pLogoSpr"), "member", tmember);
  setThePropOf(meProp(_me, "pLogoSpr"), "locZ", -float(20000001));
  setThePropOf(meProp(_me, "pLogoSpr"), "loc", callNamed("point", lingoBinary("div", theProperty("stage").rect.width, 2), lingoBinary("sub", lingoBinary("div", theProperty("stage").rect.height, 2), lingoBinary("add", lingoBinary("div", tmember.height, 2), 20))));
  setThePropOf(meProp(_me, "pLogoSpr"), "width", callNamed("member", callNamed("getmemnum", "Logo")).image.width);
  setThePropOf(meProp(_me, "pLogoSpr"), "height", callNamed("member", callNamed("getmemnum", "Logo")).image.height);
  }

  return 1;
}

