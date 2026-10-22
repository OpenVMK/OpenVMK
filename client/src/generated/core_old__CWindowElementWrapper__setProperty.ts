// core.old.cct / CWindowElementWrapper / setProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setProperty(_me: LingoMe, _this: LingoValue, tProp: LingoValue, tvalue: LingoValue) {
  switch (tProp) {
case symbol("scaleH"):
  setMeProp(_me, "pScaleH", tvalue);
  break;
case symbol("scaleV"):
  setMeProp(_me, "pScaleV", tvalue);
  break;
case symbol("locX"):
  callMethod("moveTo", _this, tvalue, meProp(_me, "pLocY"))
  break;
case symbol("locY"):
  callMethod("moveTo", _this, meProp(_me, "pLocX"), tvalue)
  break;
case symbol("locH"):
  callMethod("moveTo", _this, tvalue, meProp(_me, "pLocY"))
  break;
case symbol("locV"):
  callMethod("moveTo", _this, meProp(_me, "pLocX"), tvalue)
  break;
case symbol("width"):
  callMethod("ResizeBy", _this, lingoBinary("sub", meProp(_me, "pwidth"), tvalue), 0)
  break;
case symbol("height"):
  callMethod("ResizeBy", _this, 0, lingoBinary("sub", meProp(_me, "pheight"), tvalue))
  break;
case symbol("color"):
  setThePropOf(meProp(_me, "pSprite"), "color", tvalue);
  break;
case symbol("bgColor"):
  setThePropOf(meProp(_me, "pSprite"), "bgColor", tvalue);
  break;
case symbol("blend"):
  setThePropOf(meProp(_me, "pSprite"), "blend", tvalue);
  break;
case symbol("ink"):
  setThePropOf(meProp(_me, "pSprite"), "ink", tvalue);
  break;
case symbol("cursor"):
  callMethod("setcursor", meProp(_me, "pSprite"), tvalue)
  break;
case symbol("image"):
  var tRegPnt = meProp(_me, "pBuffer").regPoint;
  setThePropOf(meProp(_me, "pBuffer"), "image", tvalue);
  setThePropOf(meProp(_me, "pBuffer"), "regPoint", tRegPnt);
  setThePropOf(meProp(_me, "pSprite"), "width", meProp(_me, "pBuffer").width);
  setThePropOf(meProp(_me, "pSprite"), "height", meProp(_me, "pBuffer").height);
  setMeProp(_me, "pwidth", meProp(_me, "pBuffer").width);
  setMeProp(_me, "pheight", meProp(_me, "pBuffer").height);
  break;
case symbol("buffer"):
case symbol("member"):
  setMeProp(_me, "pBuffer", tvalue);
  setMeProp(_me, "pwidth", meProp(_me, "pBuffer").width);
  setMeProp(_me, "pheight", meProp(_me, "pBuffer").height);
  setMeProp(_me, "pPalette", meProp(_me, "pBuffer").paletteRef);
  setThePropOf(meProp(_me, "pSprite"), "castNum", meProp(_me, "pBuffer")._number);
  break;
case symbol("palette"):
  setMeProp(_me, "pPalette", tvalue);
  setThePropOf(meProp(_me, "pBuffer").image, "paletteRef", meProp(_me, "pPalette"));
  break;
case symbol("depth"):
  var tImage = callMethod("duplicate", meProp(_me, "pBuffer").image);
  setThePropOf(meProp(_me, "pBuffer"), "image", callNamed("image", tImage.width, tImage.height, tvalue));
  callMethod("copyPixels", meProp(_me, "pBuffer").image, tImage, tImage.rect, tImage.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  setThePropOf(meProp(_me, "pBuffer").image, "paletteRef", meProp(_me, "pPalette"));
  if (meProp(_me, "pUseAlpha")) {
  if (lingoBinary("and", lingoBinary("eq", tvalue, 32), lingoBinary("gt", meProp(_me, "pBuffer").image.depth, 16))) {
  setThePropOf(meProp(_me, "pBuffer").image, "useAlpha", 1);
  }

  }

  break;
case symbol("visible"):
  if (lingoBinary("eq", tvalue, 1)) {
  callMethod("show", _this)
  } else {
  callMethod("hide", _this)
  }

  break;
  break;
  }

  return 0;
  return 1;
}

