// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationHallOfFame / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Hall Of Fame", t_ar_data))
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.dialog.hd", callNamed("getText", "quest.halloffame.title"))
  callMethod("setButtonTxt", _me, meProp(_me, "m_rWindow"), "mes.accept.button", "OK")
  var t_sMemName = "HELPITEM.node";
  var t_iMemNum = callNamed("createMember", t_sMemName, symbol("text"));
  var t_rMem = callNamed("member", t_iMemNum);
  setThePropOf(t_rMem, "font", "Arial");
  setThePropOf(t_rMem, "wordWrap", 0);
  setThePropOf(t_rMem, "fontStyle", new LingoList([symbol("plain")]));
  setThePropOf(t_rMem, "fontSize", 12);
  setThePropOf(t_rMem, "antialias", 0);
  setThePropOf(t_rMem, "color", callNamed("rgb", 255, 255, 255));
  var t_iW = callMethod("getProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.top100authors"), symbol("width"));
  var t_iH = callMethod("getProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.top100authors"), symbol("height"));
  t_iH = callNamed("max", t_iH, lingoBinary("mul", t_ar_data[symbol("author_count")], 14));
  var t_rImg = callNamed("image", t_iW, t_iH, 32);
  callMethod("fill", t_rImg, t_rImg.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", "#001F56")]))
  var i = 0;
  for (var t_ar_author of t_ar_data[symbol("author_array")].toArray()) {
  setThePropOf(t_rMem, "text", lingoBinary("joinPad", lingoBinary("join", lingoBinary("add", i, 1), "."), t_ar_author[symbol("avatarName")]));
  callMethod("copyPixels", t_rImg, t_rMem.image, lingoBinary("add", t_rMem.image.rect, callNamed("rect", 0, lingoBinary("mul", i, 14), 0, lingoBinary("mul", i, 14))), t_rMem.image.rect)
  i = lingoBinary("add", i, 1);
  }

  i = 0;
  for (var t_ar_author of t_ar_data[symbol("author_array")].toArray()) {
  setThePropOf(t_rMem, "text", t_ar_author[symbol("rating")]._string);
  callMethod("copyPixels", t_rImg, t_rMem.image, lingoBinary("add", t_rMem.image.rect, callNamed("rect", 200, lingoBinary("mul", i, 14), 200, lingoBinary("mul", i, 14))), t_rMem.image.rect)
  i = lingoBinary("add", i, 1);
  }

  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.top100authors"), t_rImg)
  callNamed("removeMember", t_sMemName)
  setMeProp(_me, "m_ar_data", t_ar_data);
}

