// vmk_3.dcr / Core Thread Class / showLogo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showLogo(_me: LingoMe, _this: LingoValue) {
  callNamed("trace", "showLogo")
  if (callNamed("memberExists", "Logo")) {
  var tmember = callNamed("member", callNamed("getmemnum", "Logo"));
  setThePropOf(_this, "pLogoSpr", callNamed("sprite", callNamed("reserveSprite", callNamed("getID", _this))));
  setThePropOf(_this.pLogoSpr, "ink", 0);
  setThePropOf(_this.pLogoSpr, "blend", 100);
  setThePropOf(_this.pLogoSpr, "member", tmember);
  setThePropOf(_this.pLogoSpr, "locZ", -float(20000001));
  setThePropOf(_this.pLogoSpr, "loc", callNamed("point", lingoBinary("add", lingoBinary("div", theProperty("stage").rect.width, 2), 5), lingoBinary("add", lingoBinary("sub", lingoBinary("div", theProperty("stage").rect.height, 2), lingoBinary("div", tmember.height, 2)), 150)));
  setThePropOf(_this.pLogoSpr, "width", callNamed("member", callNamed("getmemnum", "Logo")).image.width);
  setThePropOf(_this.pLogoSpr, "height", callNamed("member", callNamed("getmemnum", "Logo")).image.height);
  }

  return 1;
}

