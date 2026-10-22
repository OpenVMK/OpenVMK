// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniThumbRenderer / _FetchPinThumbnail

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _FetchPinThumbnail(_me: LingoMe, _this: LingoValue, a_mp_iType_rOutput: LingoValue, a_rCallback: LingoValue) {
  var t_iCount = a_mp_iType_rOutput.count;
  var t_rIcon = callNamed("getMember", "icon.singleuse").image;
  var t_rAlpha = callMethod("extractAlpha", t_rIcon);
  var t_rRect = t_rIcon.rect;
  var t_rRectAlpha = t_rAlpha.rect;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iType = callMethod("getPropAt", a_mp_iType_rOutput, i);
  var t_rThumb = callMethod("getaProp", meProp(_me, "m_iType_rThumbnailCache"), t_iType);
  if (callNamed("voidp", t_rThumb)) {
  if (lingoBinary("gte", t_iType, 12000)) {
  t_rThumb = callMethod("_ShrinkToThumbnail", _this, callMethod("_RenderPinPreview", _this, lingoBinary("sub", t_iType, 10000)));
  if (callNamed("voidp", t_rThumb)) {
  t_rThumb = callNamed("image", 1, 1, 32);
  }

  var t_rBack = callNamed("image", 40, 40, 32);
  var t_rAlpha2 = callMethod("extractAlpha", t_rBack);
  callMethod("fill", t_rAlpha2, t_rBack.rect, callNamed("rgb", 255, 255, 255))
  setThePropOf(t_rBack, "useAlpha", 0);
  var t_iOffX = lingoBinary("div", lingoBinary("sub", t_rBack.width, t_rThumb.width), 2);
  var t_iOffY = lingoBinary("div", lingoBinary("sub", t_rBack.height, t_rThumb.height), 2);
  callMethod("copyPixels", t_rAlpha2, callMethod("extractAlpha", t_rThumb), lingoBinary("add", t_rThumb.rect, new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY])), t_rThumb.rect)
  callMethod("copyPixels", t_rBack, t_rThumb, lingoBinary("add", t_rThumb.rect, new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY])), t_rThumb.rect)
  callMethod("copyPixels", t_rAlpha2, t_rAlpha, callNamed("rect", lingoBinary("sub", t_rThumb.width, t_rRectAlpha[3]), 1, t_rThumb.width, lingoBinary("add", t_rRectAlpha[4], 1)), t_rRectAlpha, new LingoPropList([symbol("ink"), 39, symbol("useFastQuads"), 1]))
  callMethod("copyPixels", t_rBack, t_rIcon, callNamed("rect", lingoBinary("sub", t_rThumb.width, t_rRect[3]), 1, t_rThumb.width, lingoBinary("add", t_rRect[4], 1)), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  callMethod("setAlpha", t_rBack, t_rAlpha2)
  setThePropOf(t_rBack, "useAlpha", 1);
  t_rThumb = t_rBack;
  } else {
  t_rThumb = callMethod("_ShrinkToThumbnail", _this, callMethod("_RenderPinPreview", _this, t_iType));
  }

  callMethod("setaProp", meProp(_me, "m_iType_rThumbnailCache"), t_iType, t_rThumb)
  }

  if (lingoBinary("eq", callNamed("ilk", a_mp_iType_rOutput[i]), symbol("propList"))) {
  if (lingoBinary("eq", callNamed("ilk", t_rThumb), symbol("image"))) {
  t_rThumb = callMethod("duplicate", t_rThumb);
  } else {
  t_rThumb = callNamed("image", 1, 1, 32);
  }

  callMethod("_RenderPinThumbnailDetails", _this, a_mp_iType_rOutput[i], t_rThumb)
  }

  a_mp_iType_rOutput[i] = t_rThumb;
  }

  if ((lingoTruthy(callNamed("voidp", a_rCallback)) ? 0 : 1)) {
  callNamed("call", a_rCallback.method, new LingoList([callNamed("getObject", a_rCallback.client)]), a_mp_iType_rOutput, a_rCallback)
  }

}

