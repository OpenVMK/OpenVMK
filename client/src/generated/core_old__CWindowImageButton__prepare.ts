// core.old.cct / CWindowImageButton / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe) {
  setThePropOf(_me, "pBlend", _me.pProps[symbol("blend")]);
  setThePropOf(_me, "pButtonImg", new LingoPropList([]));
  if (callNamed("voidp", _me.pFixedSize)) {
  setThePropOf(_me, "pFixedSize", 0);
  }

  var tTemp = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", ".");
  var tMemName = _me.pProps[symbol("member")];
  tMemName = tMemName.item.range(1, lingoBinary("sub", tMemName.item.count, 1));
  setTheProperty("itemDelimiter", tTemp);
  callMethod("UpdateImageObjects", _me, undefined, symbol("up"), tMemName)
  callMethod("UpdateImageObjects", _me, undefined, symbol("down"), tMemName)
  setThePropOf(_me, "pImage", callMethod("createButtonImg", _me, symbol("up")));
  var tTempOffset = _me.pSprite.member.regPoint;
  setThePropOf(_me.pBuffer, "image", _me.pImage);
  setThePropOf(_me.pBuffer, "regPoint", tTempOffset);
  setThePropOf(_me, "pwidth", _me.pImage.width);
  setThePropOf(_me, "pheight", _me.pImage.height);
  setThePropOf(_me.pSprite, "width", _me.pwidth);
  setThePropOf(_me.pSprite, "height", _me.pheight);
  return 1;
}

