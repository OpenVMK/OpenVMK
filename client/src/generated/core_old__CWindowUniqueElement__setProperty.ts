// core.old.cct / CWindowUniqueElement / setProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setProperty(_me: LingoMe, tProp: LingoValue, tvalue: LingoValue) {
  switch (tProp) {
case symbol("scaleH"):
  setMeProp(_me, "pScaleH", tvalue);
  break;
case symbol("scaleV"):
  setMeProp(_me, "pScaleV", tvalue);
  break;
case symbol("locX"):
  callMethod("moveTo", _me, tvalue, meProp(_me, "pLocY"))
  break;
case symbol("locY"):
  callMethod("moveTo", _me, meProp(_me, "pLocX"), tvalue)
  break;
case symbol("locH"):
  callMethod("moveTo", _me, tvalue, meProp(_me, "pLocY"))
  break;
case symbol("locV"):
  callMethod("moveTo", _me, meProp(_me, "pLocX"), tvalue)
  break;
case symbol("width"):
  callMethod("ResizeTo", _me, tvalue, meProp(_me, "pheight"))
  break;
case symbol("height"):
  callMethod("ResizeTo", _me, meProp(_me, "pwidth"), tvalue)
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
  setMeProp(_me, "pImage", tvalue);
  callMethod("render", _me)
  break;
case symbol("buffer"):
case symbol("member"):
  setThePropOf(meProp(_me, "pSprite"), "member", tvalue);
  setThePropOf(meProp(_me, "pSprite"), "width", meProp(_me, "pSprite").member.width);
  setThePropOf(meProp(_me, "pSprite"), "height", meProp(_me, "pSprite").member.height);
  break;
case symbol("palette"):
  setMeProp(_me, "pPalette", tvalue);
  setThePropOf(meProp(_me, "pImage"), "paletteRef", meProp(_me, "pPalette"));
  break;
case symbol("depth"):
  setMeProp(_me, "pDepth", tvalue);
  var tImage = callMethod("duplicate", meProp(_me, "pImage"));
  setMeProp(_me, "pImage", callNamed("image", meProp(_me, "pImage").width, meProp(_me, "pImage").height, meProp(_me, "pDepth")));
  callMethod("copyPixels", meProp(_me, "pImage"), tImage, tImage.rect, tImage.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  setThePropOf(meProp(_me, "pImage"), "paletteRef", meProp(_me, "pPalette"));
  break;
case symbol("visible"):
  if (lingoBinary("eq", tvalue, 1)) {
  callMethod("show", _me)
  } else {
  callMethod("hide", _me)
  }

  break;
case symbol("image"):
  setMeProp(_me, "pImage", tvalue);
  callMethod("render", _me)
  break;
  break;
  }

  return 0;
  return 1;
}

