// 1a936647fad14382b01ad7810fd3d19f.cct / NEEWCHelpContent / parseContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseContent(_me: LingoMe) {
  var xmlDoc = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "<?xml version=", "\""), "1.0"), "\""), "?>"), "\r");
  xmlDoc = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", xmlDoc, "<CONTENT>"), "\r"), meProp(_me, "pMem").text), "\r"), "</CONTENT>");
  var viewHtml = lingoBinary("join", "<HTML><HEAD><TITLE></TITLE></HEAD><BODY>", "\r");
  var t_fontStyle = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "<FONT FACE=", "\""), "Arial"), "\""), " SIZE=3 COLOR="), "\""), "#FFFFFF"), "\""), ">");
  if (lingoBinary("eq", callNamed("ilk", xmlDoc), symbol("string"))) {
  if (xmlDoc.length) {
  var XmlParser = callNamed("CreateXML", xmlDoc);
  var objects = callMethod("getXMLContent", _me, XmlParser);
  var numObjs = objects.child.count;
  callNamed("put", lingoBinary("join", numObjs, " token(s) on page"))
  if (objects.value.length) {
  callNamed("put", objects.value)
  }

  for (var node of objects.child.toArray()) {
  if (lingoBinary("eq", node._type, "")) {
  var t_insertHtml = callNamed("replaceChunks", node.value, "\\r", "<BR>");
  viewHtml = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", viewHtml, t_fontStyle), t_insertHtml), "</FONT><BR>"), "\r");
  continue;
  }

  if (lingoBinary("eq", node._type, "link")) {
  var t_error = 0;
  var linkdata = lingoBinary("join", "<A HREF=", "\"");
  if (callMethod("getaProp", node.param, "help").length) {
  linkdata = lingoBinary("join", lingoBinary("join", lingoBinary("join", linkdata, "#"), callMethod("getaProp", node.param, "help")), "\"");
  } else {
  if (callMethod("getaProp", node.param, "href").length) {
  linkdata = lingoBinary("join", lingoBinary("join", linkdata, callMethod("getaProp", node.param, "href")), "\"");
  } else {
  t_error = 1;
  callNamed("put", "Unknown link")
  }

  }

  if ((lingoTruthy(t_error) ? 0 : 1)) {
  linkdata = lingoBinary("join", lingoBinary("join", lingoBinary("join", linkdata, ">"), node.value), "</A>");
  viewHtml = lingoBinary("join", viewHtml, linkdata);
  }

  }

  if (lingoBinary("eq", node._type, "image")) {
  t_error = 0;
  var imgdata = lingoBinary("join", "<IMG SRC=", "\"");
  if (callMethod("getaProp", node.param, "id").length) {
  var t_ImgMem = callNamed("member", callMethod("getaProp", node.param, "id"));
  if ((lingoTruthy(callNamed("voidp", t_ImgMem)) ? 0 : 1)) {
  imgdata = lingoBinary("join", lingoBinary("join", lingoBinary("join", imgdata, callMethod("getaProp", node.param, "id")), "\""), ">");
  setThePropOf(meProp(_me, "pViewMem"), "html", viewHtml);
  var t_y = meProp(_me, "pViewMem").image.height;
  var t_x = lingoBinary("sub", lingoBinary("div", meProp(_me, "pwidth"), 2), lingoBinary("div", t_ImgMem.image.width, 2));
  var t_offset = callNamed("rect", t_x, t_y, t_x, t_y);
  callMethod("copyPixels", meProp(_me, "pLayoutImg"), t_ImgMem.image, lingoBinary("add", t_ImgMem.rect, t_offset), t_ImgMem.rect)
  var t_lines = lingoBinary("div", t_ImgMem.image.height, lingoBinary("add", meProp(_me, "pViewMem").fontSize, 0));
  for (var i = 1; i <= lingoBinary("add", t_lines, 1); ++i) {
  viewHtml = lingoBinary("join", viewHtml, "<br>");
  }

  continue;
  }

  t_error = 1;
  }

  }

  }

  }

  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "pTopic"))) ? 0 : 1)) {
  var pages = meProp(_me, "pTopic").pages;
  var activePage = meProp(_me, "pTopic").activePage;
  viewHtml = lingoBinary("join", lingoBinary("join", viewHtml, "\r"), "<HR><table border=0><tr>");
  if (lingoBinary("gt", activePage, 1)) {
  viewHtml = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", viewHtml, "\r"), "<td align=left><A HREF="), "\""), "#previous"), "\""), ">Previous page</A></td>");
  } else {
  viewHtml = lingoBinary("join", lingoBinary("join", viewHtml, "\r"), "<td align=left>&nbsp;</td>");
  }

  if (lingoBinary("lt", activePage, pages.count)) {
  viewHtml = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", viewHtml, "\r"), "<td align=right><A HREF="), "\""), "#next"), "\""), ">Next page</A></td>");
  } else {
  viewHtml = lingoBinary("join", lingoBinary("join", viewHtml, "\r"), "<td align=right>&nbsp;</td>");
  }

  viewHtml = lingoBinary("join", lingoBinary("join", viewHtml, "\r"), "</tr></table><br>");
  } else {
  pages = new LingoList([1, 2, 3, 4, 5, 6, 7, 8]);
  activePage = 1;
  }

  viewHtml = lingoBinary("join", lingoBinary("join", viewHtml, "\r"), "</BODY></HTML>");
  setThePropOf(meProp(_me, "pViewMem"), "html", viewHtml);
  callMethod("setStyle", _me)
  callMethod("copyPixels", meProp(_me, "pLayoutImg"), meProp(_me, "pViewMem").image, meProp(_me, "pViewMem").image.rect, meProp(_me, "pViewMem").image.rect)
}

