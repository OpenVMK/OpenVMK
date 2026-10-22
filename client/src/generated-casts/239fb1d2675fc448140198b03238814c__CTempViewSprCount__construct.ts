// 239fb1d2675fc448140198b03238814c.cct / CTempViewSprCount / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "pMem", callNamed("new", symbol("text"), callNamed("castLib", "bin")));
  setThePropOf(meProp(_me, "pMem"), "name", "SpriteCounter");
  setThePropOf(meProp(_me, "pMem"), "font", "Arial");
  setThePropOf(meProp(_me, "pMem"), "wordWrap", 1);
  setThePropOf(meProp(_me, "pMem"), "rect", callNamed("rect", 0, 0, 267, 200));
  setThePropOf(meProp(_me, "pMem"), "fontStyle", new LingoList([symbol("plain")]));
  setThePropOf(meProp(_me, "pMem"), "fontSize", 20);
  setThePropOf(meProp(_me, "pMem"), "antialias", 1);
  setThePropOf(meProp(_me, "pMem"), "color", callNamed("rgb", 250, 250, 250));
  setMeProp(_me, "pSpr", callNamed("sprite", callNamed("reserveSprite")));
  setThePropOf(meProp(_me, "pSpr"), "member", meProp(_me, "pMem"));
  setThePropOf(meProp(_me, "pSpr"), "locH", 760);
  setThePropOf(meProp(_me, "pSpr"), "locV", 1);
  setThePropOf(meProp(_me, "pSpr"), "locZ", 20000000);
  setThePropOf(meProp(_me, "pSpr"), "ink", 36);
  callNamed("createTimeout", "SprLimitRefresh", 3000, symbol("update"), callMethod("getID", _this), undefined, 0)
  callMethod("update", _this)
}

