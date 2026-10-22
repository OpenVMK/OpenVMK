// item_2355.cct / CCheckersLobbyInterface / _AvatarAssetsReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AvatarAssetsReady(_me: LingoMe, _this: LingoValue, a_rImage: LingoValue, a_rStruct: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  for (var i = 1; i <= meProp(_me, "m_ar_rAvatarQueue").count; ++i) {
  if (lingoBinary("eq", a_rStruct.name, meProp(_me, "m_ar_rAvatarQueue")[i].name)) {
  if (lingoBinary("eq", meProp(_me, "m_ar_rAvatarQueue")[i].view, meProp(_me, "m_kCurView"))) {
  var t_rRect = callMethod("getProperty", meProp(_me, "m_ar_rAvatarQueue")[i].element, symbol("image")).rect;
  var t_iOffX = lingoBinary("div", lingoBinary("sub", t_rRect.width, a_rImage.width), 2);
  var t_iOffY = lingoBinary("div", lingoBinary("sub", t_rRect.height, a_rImage.height), 2);
  var t_rBuffer = callNamed("image", t_rRect.width, t_rRect.height, 32);
  callMethod("copyPixels", t_rBuffer, a_rImage, lingoBinary("add", a_rImage.rect, new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY])), a_rImage.rect)
  var t_rMem = a_rStruct.mem;
  setThePropOf(t_rMem, "image", a_rImage);
  var t_spr = callMethod("getProperty", meProp(_me, "m_ar_rAvatarQueue")[i].element, symbol("sprite"));
  if (lingoBinary("eq", meProp(_me, "m_kCurView"), symbol("score"))) {
  setThePropOf(t_spr, "width", lingoBinary("mul", a_rImage.width, 1.5));
  setThePropOf(t_spr, "height", lingoBinary("mul", a_rImage.height, 1.5));
  setThePropOf(t_rMem, "regPoint", callNamed("point", 0, -float(7)));
  } else {
  setThePropOf(t_spr, "width", a_rImage.width);
  setThePropOf(t_spr, "height", a_rImage.height);
  setThePropOf(t_rMem, "regPoint", callNamed("point", 0, 0));
  }

  setThePropOf(t_spr, "member", t_rMem);
  }

  callMethod("deleteAt", meProp(_me, "m_ar_rAvatarQueue"), i)
  break;
  }

  }

  }

}

