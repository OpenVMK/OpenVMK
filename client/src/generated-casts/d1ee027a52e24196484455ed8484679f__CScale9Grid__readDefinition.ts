// d1ee027a52e24196484455ed8484679f.cct / CScale9Grid / readDefinition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function readDefinition(_me: LingoMe, i_sDef: LingoValue) {
  setMeProp(_me, "m_sDefinition", i_sDef);
  var tDoc = callNamed("CreateXML", callNamed("getMember", i_sDef).text);
  callMethod("Search", tDoc, "TYPE", "SCALE", 1)
  setMeProp(_me, "m_sMemname", callMethod("GetParam", tDoc, "MEMBER"));
  if (lingoBinary("neq", callNamed("getmemnum", meProp(_me, "m_sMemname")), 0)) {
  setMeProp(_me, "m_rMember", callNamed("getMember", meProp(_me, "m_sMemname")));
  if (callNamed("objectp", meProp(_me, "m_rMember"))) {
  setMeProp(_me, "m_rImg", callMethod("duplicate", meProp(_me, "m_rMember").image));
  }

  if (callNamed("objectp", meProp(_me, "m_rImg"))) {
  setMeProp(_me, "m_iWidth", meProp(_me, "m_rImg").width);
  setMeProp(_me, "m_iHeight", meProp(_me, "m_rImg").height);
  }

  } else {
  setMeProp(_me, "m_iWidth", 0);
  setMeProp(_me, "m_iHeight", 0);
  setMeProp(_me, "m_rImg", callNamed("image", meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"), 32));
  }

  var t_sColor = callMethod("GetParam", tDoc, "COLOR");
  if (lingoBinary("contains", t_sColor, "rgb")) {
  setMeProp(_me, "m_rColor", callNamed("value", t_sColor));
  } else {
  if ((lingoTruthy(lingoBinary("eq", t_sColor, "")) ? 0 : 1)) {
  setMeProp(_me, "m_rColor", callNamed("rgb", t_sColor));
  }

  }

  var t_sBgColor = callMethod("GetParam", tDoc, "BGCOLOR");
  if ((lingoTruthy(lingoBinary("eq", t_sBgColor, "")) ? 0 : 1)) {
  setMeProp(_me, "m_rBgColor", callNamed("rgb", t_sBgColor));
  }

  var t_sActiveColor = callMethod("GetParam", tDoc, "ACTIVE");
  if ((lingoTruthy(lingoBinary("eq", t_sActiveColor, "")) ? 0 : 1)) {
  setMeProp(_me, "m_rActiveColor", callNamed("rgb", t_sActiveColor));
  }

  setMeProp(_me, "m_bMask", callNamed("value", callMethod("GetParam", tDoc, "MASK")));
  setMeProp(_me, "m_iBlend", callNamed("value", callMethod("GetParam", tDoc, "BLEND")));
  setMeProp(_me, "m_iInk", callNamed("value", callMethod("GetParam", tDoc, "INK")));
  callMethod("Search", tDoc, "TYPE", "GRID", 1)
  setMeProp(_me, "m_rGrid", callNamed("rect", 0, 0, 0, 0));
  setThePropOf(meProp(_me, "m_rGrid"), "top", callNamed("value", callMethod("GetParam", tDoc, "TOP")));
  setThePropOf(meProp(_me, "m_rGrid"), "left", callNamed("value", callMethod("GetParam", tDoc, "LEFT")));
  setThePropOf(meProp(_me, "m_rGrid"), "bottom", callNamed("value", callMethod("GetParam", tDoc, "BOTTOM")));
  setThePropOf(meProp(_me, "m_rGrid"), "right", callNamed("value", callMethod("GetParam", tDoc, "RIGHT")));
  setMeProp(_me, "m_bNeedUpdate", 1);
  callMethod("close", tDoc)
  tDoc = undefined;
}

