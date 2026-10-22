// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationTaskHint / reDraw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reDraw(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "m_iCurrentID"), 0)) {
  var tempMember = callNamed("getMember", "tempImg");
  var tPic = callMethod("getPhoto", callMethod("getInterface", callNamed("getThread", symbol("QuestEngine"))), meProp(_me, "m_iCurrentID"));
  if ((lingoTruthy(callNamed("voidp", tPic)) ? 0 : 1)) {
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "fto.view"))
  var tPhotoMedia = tPic.pic;
  if (callNamed("voidp", tPhotoMedia)) {
  callMethod("RequestQuestPhoto", callMethod("getInterface", callNamed("getThread", symbol("QuestEngine"))), meProp(_me, "m_iCurrentID"))
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "fto.view"), callNamed("getMember", "loaderImg").image)
  } else {
  setThePropOf(tempMember, "media", tPhotoMedia.image);
  setThePropOf(tempMember, "palette", callNamed("getMember", "sepia_palette_catalog"));
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "fto.view"), tempMember.image)
  }

  } else {
  callMethod("RequestQuestPhoto", callMethod("getInterface", callNamed("getThread", symbol("QuestEngine"))), meProp(_me, "m_iCurrentID"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "fto.view"))
  }

  }

}

