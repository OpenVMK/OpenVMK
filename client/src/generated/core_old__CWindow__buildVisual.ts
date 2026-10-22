// core.old.cct / CWindow / buildVisual

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function buildVisual(_me: LingoMe, tLayout: LingoValue) {
  tLayout = callMethod("parse", callNamed("getObject", symbol("layout_parser")), tLayout);
  if (!lingoTruthy(callNamed("listp", tLayout))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Invalid window definition:", tLayout), symbol("buildVisual"));
  }

  var tGroupNum = meProp(_me, "pGroupData").count;
  var tElemList = new LingoPropList([]);
  var tmemberlist = new LingoPropList([]);
  var tSpriteList = new LingoPropList([]);
  var tGroupData = new LingoPropList([symbol("members"), new LingoList([]), symbol("sprites"), new LingoList([]), symbol("items"), new LingoList([]), symbol("rect"), new LingoList([]), symbol("border"), new LingoList([])]);
  var tSprManager = callNamed("getSpriteManager");
  var tResManager = callNamed("getResourceManager");
  for (var tElement of tLayout[symbol("elements")].toArray()) {
  var tID = tElement[1][symbol("id")];
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pElemList")[tID]))) {
  tID = lingoBinary("join", tID, tGroupNum);
  }

  var tmember = callNamed("member", callMethod("createMember", tResManager, lingoBinary("join", lingoBinary("join", callMethod("getID", _me), "_"), tID), symbol("bitmap")));
  var tSprite = callNamed("sprite", callMethod("reserveSprite", tSprManager, callMethod("getID", _me)));
  if (lingoBinary("lt", tSprite.spriteNum, 1)) {
  for (var t_rSpr of tSpriteList.toArray()) {
  callNamed("releaseSprite", t_rSpr.spriteNum, callMethod("getID", _me))
  }

  tSpriteList = new LingoPropList([]);
  for (var t_rMem of tmemberlist.toArray()) {
  callNamed("removeMember", t_rMem.name)
  }

  tmemberlist = new LingoPropList([]);
  return callNamed("error", _me, "Failed to build window. System out of sprites!", symbol("buildVisual"));
  }

  tmemberlist[tID] = tmember;
  tSpriteList[tID] = tSprite;
  setThePropOf(tSprite, "castNum", tmember._number);
  setThePropOf(tSprite, "ink", 8);
  var tElemRect = callNamed("rect", 2000, 2000, -float(2000), -float(2000));
  callMethod("add", tGroupData[symbol("members")], tmember)
  callMethod("add", tGroupData[symbol("sprites")], tSprite)
  callMethod("setEventBroker", tSprManager, tSprite.spriteNum, tID)
  callMethod("registerProcedure", tSprite, undefined, callMethod("getID", _me), undefined)
  var tBlend = tElement[1][symbol("blend")];
  var tInk = tElement[1][symbol("ink")];
  var tColor = tElement[1][symbol("color")];
  var tBgColor = tElement[1][symbol("bgColor")];
  var tPalette = tElement[1][symbol("palette")];
  var tIsBlendShared = 1;
  var tIsColorShared = 1;
  var tIsBgColorShared = 1;
  var tIsInkShared = 1;
  var tIsPaletteShared = 1;
  var tUseAlpha = lingoBinary("gt", theProperty("stage").image.depth, 16);
  for (var tItem of tElement.toArray()) {
  tItem[symbol("id")] = tID;
  tItem[symbol("mother")] = callMethod("getID", _me);
  tItem[symbol("buffer")] = tmember;
  tItem[symbol("sprite")] = tSprite;
  if (lingoBinary("neq", tItem[symbol("blend")], tBlend)) {
  tIsBlendShared = 0;
  }

  if (lingoBinary("neq", tItem[symbol("ink")], tInk)) {
  tIsInkShared = 0;
  }

  if (lingoBinary("neq", tItem[symbol("color")], tColor)) {
  tIsColorShared = 0;
  }

  if (lingoBinary("neq", tItem[symbol("bgColor")], tBgColor)) {
  tIsBgColorShared = 0;
  }

  if (lingoBinary("neq", tItem[symbol("palette")], tPalette)) {
  tIsPaletteShared = 0;
  }

  if (tUseAlpha) {
  if (lingoBinary("neq", tItem[symbol("ink")], 0)) {
  tUseAlpha = 0;
  }

  }

  if (lingoBinary("eq", tItem[symbol("type")], "image")) {
  tIsPaletteShared = 0;
  }

  if (tItem[symbol("flipH")]) {
  setThePropOf(tItem, "locH", lingoBinary("sub", tItem.locH, tItem.width));
  }

  if (tItem[symbol("flipV")]) {
  setThePropOf(tItem, "locV", lingoBinary("sub", tItem.locV, tItem.height));
  }

  if (lingoBinary("lt", tItem[symbol("locH")], tElemRect[1])) {
  tElemRect[1] = tItem[symbol("locH")];
  }

  if (lingoBinary("lt", tItem[symbol("locV")], tElemRect[2])) {
  tElemRect[2] = tItem[symbol("locV")];
  }

  if (lingoBinary("gt", lingoBinary("add", tItem[symbol("locH")], tItem[symbol("width")]), tElemRect[3])) {
  tElemRect[3] = lingoBinary("add", tItem[symbol("locH")], tItem[symbol("width")]);
  }

  if (lingoBinary("gt", lingoBinary("add", tItem[symbol("locV")], tItem[symbol("height")]), tElemRect[4])) {
  tElemRect[4] = lingoBinary("add", tItem[symbol("locV")], tItem[symbol("height")]);
  }

  if (!lingoTruthy(callNamed("voidp", tItem[symbol("cursor")]))) {
  callMethod("setcursor", tSprite, tItem[symbol("cursor")])
  continue;
  }

  callMethod("setcursor", tSprite, symbol("arrow"))
  }

  if (lingoBinary("and", tIsPaletteShared, !lingoTruthy(callNamed("voidp", tPalette)))) {
  if (callNamed("stringp", tPalette)) {
  tPalette = callNamed("member", callMethod("getmemnum", tResManager, tPalette));
  }

  setThePropOf(tmember, "image", callNamed("image", tElemRect.width, tElemRect.height, 8, tPalette));
  } else {
  setThePropOf(tmember, "image", callNamed("image", tElemRect.width, tElemRect.height, theProperty("stage").image.depth));
  if (tUseAlpha) {
  setThePropOf(tmember.image, "useAlpha", 1);
  var tAlpha = callNamed("image", tmember.width, tmember.height, 8, symbol("grayscale"));
  /*
   * ⚠ HAND-CORRECTED: fill BLACK, not white, to make the window buffer OPAQUE.
   *
   * The original fills the alpha mask WHITE because Director's grayscale mask
   * polarity is white=opaque. But THIS port's level-plane polarity is inverted
   * (see LingoImage.fill / setAlpha): fill(white) -> level 0, and setAlpha reads
   * level 0 as alpha 0 = TRANSPARENT. So `fill white` here made every window
   * buffer start FULLY TRANSPARENT, and any area not covered by a composited
   * piece (the seams where #strech pieces don't quite meet — e.g. the 3px above
   * "sound settings", the band in the Character window) showed the ROOM straight
   * through the window body.
   *
   * fill(BLACK) -> luma 0 -> level 255 -> setAlpha alpha 255 = OPAQUE, which is
   * the OG's actual intent given our inverted polarity. The rounded corners are
   * unaffected (the corner pieces are ink 36 and the sprite's own ink-8 matte
   * floods the corner-connected white back out). Do NOT "fix" this by flipping
   * the global fill/setAlpha polarity — the avatar composition relies on
   * fill(white)=transparent to reset its alpha (CAvatarRenderer). Scoped here.
   * See [[window-seethrough-strech]].
   */
  callMethod("fill", tAlpha, tAlpha.rect, callNamed("rgb", 0, 0, 0))
  callMethod("setAlpha", tmember.image, tAlpha)
  }

  }

  setThePropOf(tmember, "regPoint", callNamed("point", 0, 0));
  if (lingoBinary("eq", tElement.count, 1)) {
  tItem = tElement[1];
  tItem[symbol("style")] = symbol("unique");
  tItem[symbol("alpha")] = tUseAlpha;
  if (tIsBlendShared) {
  tItem[symbol("blend")] = 100;
  }

  var tWrapper = callMethod("CreateElement", _me, tItem);
  } else {
  var tProps = new LingoPropList([symbol("id"), tID, symbol("type"), symbol("wrapper"), symbol("style"), symbol("wrapper"), symbol("buffer"), tmember, symbol("sprite"), tSprite, symbol("locX"), tElemRect[1], symbol("locY"), tElemRect[2]]);
  tWrapper = callMethod("CreateElement", _me, tProps);
  for (var tItem of tElement.toArray()) {
  tItem[symbol("locH")] = lingoBinary("sub", tItem[symbol("locH")], tElemRect[1]);
  tItem[symbol("locV")] = lingoBinary("sub", tItem[symbol("locV")], tElemRect[2]);
  tItem[symbol("style")] = symbol("grouped");
  tItem[symbol("alpha")] = tUseAlpha;
  if (tIsBlendShared) {
  tItem[symbol("blend")] = 100;
  }

  callMethod("add", tWrapper, callMethod("CreateElement", _me, tItem))
  }

  }

  if (callNamed("objectp", tWrapper)) {
  callMethod("addProp", tElemList, tID, tWrapper)
  callMethod("add", tGroupData[symbol("items")], tWrapper)
  }

  if (tIsBlendShared) {
  setThePropOf(tSprite, "blend", tBlend);
  }

  if (tIsInkShared) {
  setThePropOf(tSprite, "ink", tInk);
  }

  if (tIsColorShared) {
  setThePropOf(tSprite, "color", tColor);
  }

  if (tIsBgColorShared) {
  setThePropOf(tSprite, "bgColor", tBgColor);
  }

  setThePropOf(tSprite, "locH", lingoBinary("add", tElemRect[1], meProp(_me, "pClientRect")[1]));
  setThePropOf(tSprite, "locV", lingoBinary("add", tElemRect[2], meProp(_me, "pClientRect")[2]));
  setThePropOf(tSprite, "width", tElemRect.width);
  setThePropOf(tSprite, "height", tElemRect.height);
  }

  tGroupData[symbol("rect")] = tLayout[symbol("rect")][1];
  tGroupData[symbol("border")] = tLayout[symbol("border")][1];
  if (lingoBinary("eq", tGroupNum, 0)) {
  setMeProp(_me, "pLocX", lingoBinary("add", meProp(_me, "pLocX"), tGroupData[symbol("rect")][1]));
  setMeProp(_me, "pLocY", lingoBinary("add", meProp(_me, "pLocY"), tGroupData[symbol("rect")][2]));
  setMeProp(_me, "pwidth", tGroupData[symbol("rect")].width);
  setMeProp(_me, "pheight", tGroupData[symbol("rect")].height);
  } else {
  var tNewW = lingoBinary("add", lingoBinary("add", meProp(_me, "pClientRect")[1], meProp(_me, "pClientRect")[3]), tGroupData[symbol("rect")].width);
  var tNewH = lingoBinary("add", lingoBinary("add", meProp(_me, "pClientRect")[2], meProp(_me, "pClientRect")[4]), tGroupData[symbol("rect")].height);
  if (lingoBinary("or", lingoBinary("neq", tNewW, meProp(_me, "pwidth")), lingoBinary("neq", tNewH, meProp(_me, "pheight")))) {
  callMethod("ResizeTo", _me, tNewW, tNewH)
  }

  }

  setMeProp(_me, "pClientRect", lingoBinary("add", meProp(_me, "pClientRect"), tGroupData[symbol("border")]));
  for (var i = 1; i <= tSpriteList.count; ++i) {
  var tloc = lingoBinary("sub", tSpriteList[i].loc, new LingoList([tGroupData[symbol("rect")][1], tGroupData[symbol("rect")][2]]));
  setThePropOf(tSpriteList[i], "loc", lingoBinary("add", callNamed("point", meProp(_me, "pLocX"), meProp(_me, "pLocY")), tloc));
  tID = callMethod("getPropAt", tmemberlist, i);
  callMethod("addProp", meProp(_me, "pMemberList"), tID, tmemberlist[tID])
  callMethod("addProp", meProp(_me, "pSpriteList"), tID, tSpriteList[tID])
  }

  /*
   * ⚠ HAND-CORRECTED: an ELEMENT ID MUST BE UNIQUE WITHIN A WINDOW.
   *
   * The original uses `addProp`, which APPENDS — and `pElemList` is only ever
   * cleared in `construct`/`deconstruct`, so every re-`merge` of a definition
   * stacks another copy of the same ids. MEASURED on the navigator's park map
   * after a handful of tab switches: NINE distinct element objects under
   * `nav.frontierland.active1`, four of them reporting a visible sprite.
   *
   * ⚠ THE STALE ENTRIES HOLD RECYCLED SPRITE NUMBERS. Sprites are released and
   * re-reserved correctly (the free list holds steady at 82/150), so an old
   * element's `pSprite` ends up pointing at a channel some OTHER element now
   * owns. `CWindow.draw` then broadcasts over the whole list —
   *
   *     call(#draw, pElemList, tRGB)      -- fills pBuffer.image with a rect
   *
   * — so nine generations each fill a channel, several of which belong to
   * somebody else, and only the live generation is re-`render`ed afterwards.
   * That is why the park map's land labels come back from a tab switch as solid
   * colour blocks while every other element looks fine.
   *
   * `getElement` looks an id up with `getaProp`, which answers the FIRST match,
   * so the duplicates also meant every lookup resolved to the OLDEST generation
   * — which is why wrapping the element `getElement` returned only ever showed
   * `hide()` and never the `draw` that was painting the block.
   *
   * ⚠ DO NOT FIX THIS BY MAKING `addProp` OVERWRITE AGAIN. Director's `addProp`
   * genuinely appends and `CCoreXMLParser.ParseXML` depends on it (see the note
   * on `LingoPropList.addProp`); collapsing it there silently discarded every
   * XML sibling and stopped rooms building at all. The uniqueness belongs here,
   * where the id is the key.
   */
  for (var i = 1; i <= tElemList.count; ++i) {
  callMethod("setaProp", meProp(_me, "pElemList"), callMethod("getPropAt", tElemList, i), tElemList[i])
  }

  callMethod("add", meProp(_me, "pGroupData"), tGroupData)
  callNamed("call", symbol("prepare"), tGroupData[symbol("items")])
  callNamed("call", symbol("render"), tGroupData[symbol("items")])
  return 1;
}

