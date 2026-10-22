// core.old.cct / CWindowDropDown / mouseWithin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseWithin(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "pState"), symbol("open"))) {
  if (callNamed("voidp", meProp(_me, "pLastRollOver"))) {
  setMeProp(_me, "pLastRollOver", 0);
  }

  setMeProp(_me, "pRollOverItem", lingoBinary("add", lingoBinary("div", lingoBinary("sub", lingoBinary("sub", theProperty("mouseV"), _me.pSprite.top), 1), meProp(_me, "pLineHeight")), 1));
  if (lingoBinary("neq", meProp(_me, "pRollOverItem"), meProp(_me, "pLastRollOver"))) {
  if (lingoBinary("gt", meProp(_me, "pRollOverItem"), meProp(_me, "pNumberOfMenuItems"))) {
  setMeProp(_me, "pRollOverItem", meProp(_me, "pNumberOfMenuItems"));
  }

  if (lingoBinary("eq", meProp(_me, "pNumberOfMenuItems"), meProp(_me, "pRollOverItem"))) {
  var tMaskFix = meProp(_me, "pMarginBottom");
  } else {
  tMaskFix = 0;
  }

  var tTempImage = callMethod("duplicate", meProp(_me, "pDropMenuImg"));
  var tTempActiveBoxImg = callNamed("image", _me.pwidth, lingoBinary("add", meProp(_me, "pLineHeight"), tMaskFix), 8, _me.pPalette);
  var tMemberDesc = meProp(_me, "pProp")[symbol("up")][symbol("members")][symbol("activeline")];
  var tmember = callNamed("member", callNamed("getmemnum", tMemberDesc[symbol("member")]));
  callMethod("copyPixels", tTempActiveBoxImg, tmember.image, tTempActiveBoxImg.rect, tmember.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  var tActiveTop = lingoBinary("mul", lingoBinary("sub", meProp(_me, "pRollOverItem"), 1), meProp(_me, "pLineHeight"));
  var tdestrect = callNamed("rect", 0, tActiveTop, _me.pwidth, lingoBinary("add", lingoBinary("add", tActiveTop, meProp(_me, "pLineHeight")), tMaskFix));
  callMethod("copyPixels", tTempImage, tTempActiveBoxImg, tdestrect, tTempActiveBoxImg.rect, new LingoPropList([symbol("maskImage"), callMethod("createMatte", meProp(_me, "pDropMenuImg")), symbol("maskOffset"), callNamed("point", 0, -float(tActiveTop)), symbol("ink"), 39, symbol("useFastQuads"), 1]))
  setThePropOf(_me, "pImage", tTempImage);
  callMethod("reDraw", _me)
  setMeProp(_me, "pLastRollOver", meProp(_me, "pRollOverItem"));
  }

  }

}

