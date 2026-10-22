// core.old.cct / CVisualizerXML / buildVisual

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function buildVisual(_me: LingoMe, tLayout: LingoValue) {
  var tResMgr = callNamed("getResourceManager");
  var tSprMgr = callNamed("getSpriteManager");
  tLayout = callMethod("parse", callMethod("get", callNamed("getObjectManager"), symbol("layout_parser_xml")), tLayout);
  if (!lingoTruthy(callNamed("listp", tLayout))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Invalid visualizer definition:", tLayout), symbol("buildVisual"));
  }

  if (!lingoTruthy(callNamed("voidp", tLayout[symbol("rect")]))) {
  if (lingoBinary("gt", tLayout[symbol("rect")].count, 0)) {
  setMeProp(_me, "pLocX", lingoBinary("add", meProp(_me, "pLocX"), tLayout[symbol("rect")][1][1]));
  setMeProp(_me, "pLocY", lingoBinary("add", meProp(_me, "pLocY"), tLayout[symbol("rect")][1][2]));
  }

  }

  tLayout = tLayout[symbol("elements")];
  for (var i = 1; i <= tLayout.count; ++i) {
  var tMemNum = callMethod("getmemnum", tResMgr, tLayout[i][symbol("member")]);
  if (lingoBinary("lt", tMemNum, 1)) {
  callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Member", tLayout[i][symbol("member")]), "required by visualizer:"), callMethod("getID", _me)), "not found!"), symbol("buildVisual"))
  meProp(_me, "pSpriteData")[i] = new LingoPropList([]);
  continue;
  }

  var tElem = tLayout[i];
  var tSpr = callNamed("sprite", callMethod("reserveSprite", tSprMgr, callMethod("getID", _me)));
  setThePropOf(tSpr, "castNum", tMemNum);
  setThePropOf(tSpr, "ink", tElem[symbol("ink")]);
  setThePropOf(tSpr, "locH", lingoBinary("add", tElem[symbol("locH")], meProp(_me, "pLocX")));
  setThePropOf(tSpr, "locV", lingoBinary("add", tElem[symbol("locV")], meProp(_me, "pLocY")));
  setThePropOf(tSpr, "width", tElem[symbol("width")]);
  setThePropOf(tSpr, "height", tElem[symbol("height")]);
  setThePropOf(tSpr, "blend", tElem[symbol("blend")]);
  setThePropOf(tSpr, "rotation", tElem[symbol("rotation")]);
  setThePropOf(tSpr, "skew", tElem[symbol("skew")]);
  setThePropOf(tSpr, "flipH", tElem[symbol("flipH")]);
  setThePropOf(tSpr, "flipV", tElem[symbol("flipV")]);
  setThePropOf(tSpr, "color", callNamed("rgb", tElem[symbol("color")]));
  setThePropOf(tSpr, "bgColor", callNamed("rgb", tElem[symbol("bgColor")]));
  if (lingoBinary("or", lingoBinary("eq", tElem[symbol("media")], symbol("text")), lingoBinary("eq", tElem[symbol("media")], symbol("field")))) {
  var tTxtMem = callNamed("member", tMemNum);
  if (!lingoTruthy(callNamed("voidp", tElem[symbol("txtColor")]))) {
  setThePropOf(tTxtMem, "color", callNamed("rgb", tElem[symbol("txtColor")]));
  }

  if (!lingoTruthy(callNamed("voidp", tElem[symbol("txtBgColor")]))) {
  setThePropOf(tTxtMem, "bgColor", callNamed("rgb", tElem[symbol("txtBgColor")]));
  }

  if (lingoBinary("neq", tTxtMem.font, tElem[symbol("font")])) {
  setThePropOf(tTxtMem, "font", tElem[symbol("font")]);
  }

  if (lingoBinary("neq", tTxtMem.fontSize, tElem[symbol("fontSize")])) {
  setThePropOf(tTxtMem, "fontSize", tElem[symbol("fontSize")]);
  }

  if (lingoBinary("neq", tTxtMem.fontStyle, tElem[symbol("fontStyle")])) {
  setThePropOf(tTxtMem, "fontStyle", tElem[symbol("fontStyle")]);
  }

  if (lingoBinary("eq", tElem[symbol("media")], symbol("text"))) {
  if (lingoBinary("neq", tTxtMem.fixedLineSpace, tElem[symbol("fixedLineSpace")])) {
  setThePropOf(tTxtMem, "fixedLineSpace", tElem[symbol("fixedLineSpace")]);
  }

  } else {
  if (lingoBinary("eq", tElem[symbol("media")], symbol("field"))) {
  if (lingoBinary("neq", tTxtMem.lineHeight, tElem[symbol("lineHeight")])) {
  setThePropOf(tTxtMem, "lineHeight", tElem[symbol("lineHeight")]);
  }

  }

  }

  }

  if (callNamed("voidp", tElem[symbol("locZ")])) {
  setThePropOf(tSpr, "locZ", lingoBinary("sub", lingoBinary("add", meProp(_me, "pLocZ"), i), 1));
  } else {
  setThePropOf(tSpr, "locZ", lingoBinary("add", callNamed("integer", tElem[symbol("locZ")]), meProp(_me, "pLocZ")));
  }

  if (!lingoTruthy(callNamed("voidp", tElem[symbol("id")]))) {
  if (lingoBinary("or", lingoBinary("eq", tElem[symbol("Active")], 1), lingoBinary("and", callNamed("voidp", tElem[symbol("Active")]), callNamed("voidp", tElem[symbol("type")])))) {
  callMethod("setEventBroker", tSprMgr, tSpr.spriteNum, tElem[symbol("id")])
  if (!lingoTruthy(callNamed("voidp", tElem[symbol("cursor")]))) {
  callMethod("setcursor", tSpr, tElem[symbol("cursor")])
  }

  if (!lingoTruthy(callNamed("voidp", tElem[symbol("link")]))) {
  callMethod("setLink", tSpr, tElem[symbol("link")])
  }

  }

  meProp(_me, "pActSprList")[tLayout[i][symbol("id")]] = tSpr;
  }

  meProp(_me, "pSpriteData")[i] = new LingoPropList([]);
  callMethod("append", meProp(_me, "pSpriteList"), tSpr)
  if (!lingoTruthy(callNamed("voidp", callMethod("getaProp", tElem, symbol("ElementGroup"))))) {
  var t_sGroup = callMethod("getaProp", tElem, symbol("ElementGroup"));
  if (callNamed("voidp", callMethod("getaProp", meProp(_me, "pElementGroups"), t_sGroup))) {
  callMethod("setaProp", meProp(_me, "pElementGroups"), t_sGroup, new LingoPropList([symbol("state"), 0, symbol("states"), new LingoPropList([])]))
  }

  var tstate = callNamed("value", callMethod("getaProp", tElem, symbol("state")));
  if (callNamed("voidp", callMethod("getaProp", meProp(_me, "pElementGroups")[t_sGroup], tstate))) {
  callMethod("setaProp", meProp(_me, "pElementGroups")[t_sGroup][symbol("states")], tstate, new LingoList([]))
  }

  callMethod("add", callMethod("getaProp", meProp(_me, "pElementGroups")[t_sGroup][symbol("states")], tstate), new LingoPropList([symbol("sprite"), tSpr, symbol("element"), tElem]))
  if (lingoBinary("neq", tstate, 0)) {
  setThePropOf(tSpr, "visible", 0);
  }

  callMethod("setEventBroker", tSprMgr, tSpr.spriteNum, t_sGroup)
  callMethod("registerProcedure", tSpr, symbol("eventProcElementGroup"), callMethod("getID", _me), symbol("mouseWithin"))
  callMethod("registerProcedure", tSpr, symbol("eventProcElementGroup"), callMethod("getID", _me), symbol("mouseDown"))
  callMethod("registerProcedure", tSpr, symbol("eventProcElementGroup"), callMethod("getID", _me), symbol("mouseUp"))
  }

  }

  return callMethod("Refresh", _me);
}

