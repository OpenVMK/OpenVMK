// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomChatOutputMgr / _RenderChat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RenderChat(_me: LingoMe, _this: LingoValue, a_rChat: LingoValue) {
  var t_rNameImg = callMethod("render", meProp(_me, "m_rWriterShout"), lingoBinary("join", a_rChat.name, ":"));
  switch (a_rChat.mode) {
case symbol("say"):
  var t_rChatImg = callMethod("render", meProp(_me, "m_rWriterSay"), a_rChat.message);
  break;
case symbol("shout"):
  t_rChatImg = callMethod("render", meProp(_me, "m_rWriterShout"), a_rChat.message);
  break;
case symbol("whisper"):
  t_rChatImg = callMethod("render", meProp(_me, "m_rWriterWhisper"), a_rChat.message);
  break;
  }

  var t_rTextImg = callNamed("image", lingoBinary("add", t_rNameImg.width, t_rChatImg.width), t_rNameImg.height, t_rNameImg.depth);
  callMethod("copyPixels", t_rTextImg, t_rNameImg, t_rNameImg.rect, t_rNameImg.rect)
  callMethod("copyPixels", t_rTextImg, t_rChatImg, lingoBinary("add", t_rChatImg.rect, new LingoList([t_rNameImg.width, 0, t_rNameImg.width, 0])), t_rChatImg.rect)
  var t_rBubble = meProp(_me, "m_ar_rBubbles")[meProp(_me, "m_iNextFreeBbl")];
  setMeProp(_me, "m_iNextFreeBbl", lingoBinary("add", lingoBinary("mod", meProp(_me, "m_iNextFreeBbl"), meProp(_me, "m_iNumBubbles")), 1));
  var t_rImgElem = callMethod("getElement", t_rBubble, "text");
  var t_iCurWidth = callMethod("getProperty", t_rImgElem, symbol("width"));
  var t_iOffWidth = lingoBinary("sub", t_rTextImg.width, t_iCurWidth);
  callMethod("ResizeBy", t_rBubble, t_iOffWidth, 0)
  callMethod("feedImage", t_rImgElem, t_rTextImg)
  var t_iBblWidth = callMethod("getProperty", t_rBubble, symbol("width"));
  var t_iLocX = lingoBinary("sub", a_rChat.loc.x, lingoBinary("div", t_iBblWidth, 2));
  if (lingoBinary("lt", t_iLocX, 0)) {
  t_iLocX = 0;
  }

  if (lingoBinary("gt", lingoBinary("add", t_iLocX, t_iBblWidth), theProperty("stage").rect.width)) {
  t_iLocX = lingoBinary("sub", t_iLocX, lingoBinary("sub", lingoBinary("add", t_iLocX, t_iBblWidth), theProperty("stage").rect.width));
  }

  var t_rColor = a_rChat.color;
  setThePropOf(callMethod("getProperty", callMethod("getElement", t_rBubble, "bubble.color"), symbol("sprite")), "bgColor", t_rColor);
  callMethod("moveTo", t_rBubble, t_iLocX, callMethod("getProperty", t_rBubble, symbol("locY")))
  setMeProp(_me, "m_kBubbleState", symbol("animate"));
  setMeProp(_me, "m_iScrollTimer", 0);
  callMethod("setaProp", meProp(_me, "m_mp_sWnd_sName"), callMethod("getID", t_rBubble), a_rChat.name)
}

