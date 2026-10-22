// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniThumbRenderer / _RenderFurniPreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RenderFurniPreview(_me: LingoMe, _this: LingoValue, a_iTypeCode: LingoValue) {
  if (lingoBinary("gt", a_iTypeCode, 10000)) {
  a_iTypeCode = lingoBinary("sub", a_iTypeCode, 10000);
  }

  var t_rImage = callMethod("getaProp", meProp(_me, "m_iType_rPreviewCache"), a_iTypeCode);
  if ((lingoTruthy(callNamed("voidp", t_rImage)) ? 0 : 1)) {
  /*
   * ⚠ HAND-CORRECTED: never SERVE a degenerate cached render. A furni preview
   * composited before its item_<code> PNG art was resident draws nothing, so the
   * dirty rect never grows and `crop` yields a 1x1 image — and caching THAT froze
   * a blank/wrong thumbnail forever (the inventory & shop showed missing or wrong
   * furni that never healed even after the art arrived). A real preview is always
   * many px wide, so width <= 1 is the empty-render tell: fall through and
   * re-render, by which point the art is resident. Pairs with the guarded cache
   * WRITE below. See [[grayscale-quad-flip-ignored]].
   */
  if (lingoBinary("gt", t_rImage.width, 1)) {
  return t_rImage;
  }

  }

  var t_rMember = callNamed("getMember", lingoBinary("join", "item_", a_iTypeCode));
  if (lingoBinary("gt", t_rMember._number, 0)) {
  /*
   * ⚠ HAND-CORRECTED: residency gate (fast path). Do not duplicate & CACHE the
   * member image until its PNG is resident — a not-yet-loaded bitmap duplicates
   * as a correctly-SIZED but empty buffer, which then froze a blank/wrong furni
   * thumbnail forever. `artResident` also arms the fetch, so the next request
   * (grid re-render) succeeds. See the slow-path gate below and
   * [[grayscale-quad-flip-ignored]].
   */
  if (!lingoTruthy(callNamed("artResident", t_rMember))) {
  return callNamed("image", 1, 1, 32);
  }
  t_rImage = callMethod("duplicate", t_rMember.image);
  // HAND-CORRECTED: a 32-bit `item_<code>` member keeps its own alpha. This is
  // the branch shop products with a whole-picture member take (camera 7001 and
  // film 6001, cast 6453b36a). Our loader hands 32-bit art over with
  // useAlpha 0, so the preview's transparent surround came out WHITE. It is
  // the same fix as the pin/poster previews ([[pin-poster-preview-usealpha]]).
  // The furnimap path below already sets useAlpha itself.
  if (lingoBinary("eq", t_rImage.depth, 32)) {
  setThePropOf(t_rImage, "useAlpha", 1);
  }
  callMethod("setaProp", meProp(_me, "m_iType_rPreviewCache"), a_iTypeCode, t_rImage)
  return t_rImage;
  }

  if (callNamed("voidp", meProp(_me, "m_rFurniMap"))) {
  setMeProp(_me, "m_rFurniMap", callNamed("getThread", symbol("room")).component.m_rFurniMap);
  }

  var t_rStruct = callMethod("GetByTypeCode", meProp(_me, "m_rFurniMap"), a_iTypeCode);
  var t_iDir = 5;
  for (var t_rDir of t_rStruct.child.toArray()) {
  if (lingoBinary("eq", callNamed("integer", t_rDir.param["NUM"]), t_iDir)) {
  break;
  }

  }

  if (callNamed("voidp", t_rDir)) {
  callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "Item definition not complete:", a_iTypeCode), "!"), symbol("_RenderFurniPreview"))
  return callNamed("image", 0, 0, 32);
  }

  /*
   * ⚠ HAND-CORRECTED: residency gate (slow path — the multi-tile / POSTER path).
   *
   * This composites each GFX tile onto a BLACK buffer and derives transparency
   * from an alpha plane accumulated via `extractAlpha` (ink 39). But `extractAlpha`
   * on a bitmap whose PNG is NOT yet resident returns a fully-OPAQUE plane, so the
   * black backing buffer is never carved and the thumbnail/preview is a BLACK BOX
   * around the art — then cached and frozen (the "black around shop posters", and
   * wrong/missing furni thumbnails). The old `width <= 1` guard only catches a
   * TOTALLY empty render, not this partial-but-opaque one.
   *
   * So before compositing, require EVERY GFX tile's art to be resident. If any is
   * not, `artResident` arms its fetch and we return a degenerate 1x1 (UNCACHED),
   * so the next request re-renders correctly once the PNGs have arrived.
   * MEASURED: poster 3002 pre-residency = 2449 black / 0 transparent; once resident
   * = 39 black / 2438 transparent. See [[grayscale-quad-flip-ignored]].
   */
  /*
   * ⚠ HAND-CORRECTED (2): SKIP the "null" placeholder tile, and ARM EVERY real
   * tile before bailing. The furnimap's DTD uses GFX="null" for empty tile
   * positions in a multi-tile item; `getMember("null")` returns a permanent 1x1
   * sentinel with no art (imagePath null) that `artResident` can NEVER satisfy.
   * The old gate returned 1x1 on the FIRST non-resident member, so an item with a
   * "null" tile (e.g. 1215) was blank FOREVER — and because it early-returned at
   * the "null" tile, any REAL tiles ordered after it never had their fetch armed,
   * so they never loaded either. Now: skip the null sentinel, call `artResident`
   * on every real tile (which arms each pending fetch), and only THEN return the
   * degenerate 1x1 if any real tile was still loading — so the next request
   * renders once the PNGs arrive. See [[member-duplicate-not-implemented]].
   */
  var t_bAllResident = 1;
  for (var t_rBlockRdy of t_rDir.child.toArray()) {
  for (var t_rSprRdy of t_rBlockRdy.child.toArray()) {
  var t_rMemRdy = callNamed("getMember", t_rSprRdy.param["GFX"]);
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", t_rMemRdy)) ? 0 : 1), lingoBinary("gt", t_rMemRdy._number, 0))) {
  if (lingoBinary("eq", t_rMemRdy.name, "null")) {
  continue;
  }
  if (!lingoTruthy(callNamed("artResident", t_rMemRdy))) {
  t_bAllResident = 0;
  }
  }
  }
  }

  if (!lingoTruthy(t_bAllResident)) {
  return callNamed("image", 1, 1, 32);
  }

  t_rImage = callNamed("image", 256, 256, 32);
  callMethod("fill", t_rImage, t_rImage.rect, callNamed("rgb", 0, 0, 0))
  var t_rAlpha = callNamed("image", 256, 256, 8, symbol("grayscale"));
  var t_mp_iZ_rBlock = new LingoPropList([]);
  var t_iDivX = lingoBinary("div", t_rImage.width, 2);
  var t_iDivY = lingoBinary("div", t_rImage.height, 2);
  var t_rcDirty = callNamed("rect", t_iDivX, t_iDivY, t_iDivX, t_iDivY);
  /*
   * ⚠ HAND-CORRECTED: default TILESIZE to 32, exactly as the furnimap DTD does.
   *
   * `furnituremap.dtd` declares `<!ATTLIST ITEM TILESIZE CDATA "32">`, so an ITEM
   * that OMITS the attribute is meant to inherit 32. Director's XML parser applies
   * DTD attribute defaults; OUR parser does not, so those items arrive with
   * TILESIZE="" and `value("")` is 0 — every block then lands at tile size 0 and
   * the thumbnail renders empty (the inventory Furnishings grid showed the
   * starburst placeholder / appeared to hang). MEASURED in the test inventory:
   * items 412/471 carry TILESIZE=32 and 1291 carries 24, but 2/39/41/118/126/486/
   * 531/1215 omit it and came through blank. Applying the DTD default here matches
   * OG for the same server data. Scoped to the furni thumbnail; the shared XML
   * parser is left untouched. See [[member-by-name-lowest-wins]].
   */
  var t_sTileSize = t_rStruct.param["TILESIZE"];
  if (lingoBinary("or", callNamed("voidp", t_sTileSize), lingoBinary("eq", t_sTileSize, ""))) {
  t_sTileSize = "32";
  }
  var t_iItemSize = callNamed("value", t_sTileSize);
  for (var t_rBlock of t_rDir.child.toArray()) {
  var t_iX = lingoBinary("mul", callNamed("integer", t_rBlock.param["X"]), t_iItemSize);
  var t_iY = lingoBinary("mul", callNamed("integer", t_rBlock.param["Z"]), t_iItemSize);
  callMethod("addProp", t_mp_iZ_rBlock, lingoBinary("add", t_iX, t_iY), t_rBlock)
  }

  callMethod("sort", t_mp_iZ_rBlock)
  for (var t_rBlock of t_mp_iZ_rBlock.toArray()) {
  var t_fX = lingoBinary("mul", callNamed("integer", t_rBlock.param["X"]), t_iItemSize);
  var t_fY = lingoBinary("mul", callNamed("integer", t_rBlock.param["Y"]), t_iItemSize);
  var t_fXs = lingoBinary("sub", t_fX, t_fY);
  var t_fYs = lingoBinary("mul", 0.5, lingoBinary("add", t_fX, t_fY));
  var t_iOffX = lingoBinary("add", callNamed("integer", t_fXs), t_iDivX);
  var t_iOffY = lingoBinary("add", callNamed("integer", t_fYs), t_iDivY);
  for (var t_rSpr of t_rBlock.child.toArray()) {
  t_rMember = callNamed("getMember", t_rSpr.param["GFX"]);
  if (callNamed("voidp", t_rMember)) {
  continue;
  }

  if (lingoBinary("lt", t_rMember._number, 1)) {
  continue;
  }

  t_iX = lingoBinary("sub", t_iOffX, t_rMember.regPoint.locH);
  t_iY = lingoBinary("sub", t_iOffY, t_rMember.regPoint.locV);
  t_iX = lingoBinary("add", t_iX, t_rSpr.param["X"]);
  t_iY = lingoBinary("add", t_iY, t_rSpr.param["Y"]);
  var t_rImg = t_rMember.image;
  var t_iInk = callNamed("integer", t_rSpr.param["INK"]);
  var t_iBld = callNamed("integer", t_rSpr.param["BLD"]);
  var t_rCol = callNamed("rgb", t_rSpr.param["COL"]);
  var t_rBgc = callNamed("rgb", t_rSpr.param["BGC"]);
  var t_bFlp = lingoBinary("gt", callNamed("integer", t_rSpr.param["FLP"]), 0);
  if (t_iBld) {
  var t_rcImg = t_rImg.rect;
  var t_rAlp = callMethod("extractAlpha", t_rImg);
  if ((lingoTruthy(callNamed("ilk", t_rAlp, symbol("image"))) ? 0 : 1)) {
  t_rAlp = callNamed("image", 1, 1, 8, symbol("grayscale"));
  }

  if (t_bFlp) {
  var t_rQuad = new LingoList([callNamed("point", t_rImg.width, 0), callNamed("point", 0, 0), callNamed("point", 0, t_rImg.height), callNamed("point", t_rImg.width, t_rImg.height)]);
  var t_rTmp = callNamed("image", t_rImg.width, t_rImg.height, t_rImg.depth);
  callMethod("fill", t_rTmp, t_rTmp.rect, callNamed("rgb", 0, 0, 0))
  callMethod("copyPixels", t_rTmp, t_rImg, t_rQuad, t_rcImg, new LingoPropList([symbol("useFastQuads"), 1]))
  t_rImg = t_rTmp;
  t_rQuad = new LingoList([callNamed("point", t_rAlp.width, 0), callNamed("point", 0, 0), callNamed("point", 0, t_rAlp.height), callNamed("point", t_rAlp.width, t_rAlp.height)]);
  t_rTmp = callNamed("image", t_rAlp.width, t_rAlp.height, 8, symbol("grayscale"));
  callMethod("fill", t_rTmp, t_rTmp.rect, callNamed("rgb", 0, 0, 0))
  callMethod("copyPixels", t_rTmp, t_rAlp, t_rQuad, t_rcImg, new LingoPropList([symbol("useFastQuads"), 1]))
  t_rAlp = t_rTmp;
  t_iX = lingoBinary("add", lingoBinary("sub", t_iOffX, lingoBinary("sub", t_rcImg.width, t_rMember.regPoint.locH)), t_rSpr.param["X"]);
  if (lingoBinary("eq", t_rImg.depth, 32)) {
  callMethod("setAlpha", t_rImg, t_rAlp)
  setThePropOf(t_rImg, "useAlpha", 1);
  }

  }

  var t_rcOff = new LingoList([t_iX, t_iY, t_iX, t_iY]);
  callMethod("copyPixels", t_rImage, t_rImg, lingoBinary("add", t_rcImg, t_rcOff), t_rcImg, new LingoPropList([symbol("ink"), t_iInk, symbol("blend"), t_iBld, symbol("color"), t_rCol, symbol("bgColor"), t_rBgc, symbol("useFastQuads"), 1]))
  callMethod("copyPixels", t_rAlpha, t_rAlp, lingoBinary("add", t_rcImg, t_rcOff), t_rcImg, new LingoPropList([symbol("ink"), 39, symbol("useFastQuads"), 1]))
  t_rcDirty = callMethod("union", t_rcDirty, lingoBinary("add", t_rcImg, t_rcOff));
  }

  }

  }

  callMethod("setAlpha", t_rImage, t_rAlpha)
  setThePropOf(t_rImage, "useAlpha", 1);
  t_rImage = callMethod("crop", t_rImage, t_rcDirty);
  /*
   * ⚠ HAND-CORRECTED: only cache a render that actually drew (width > 1). An empty
   * composite (art not yet resident) must NOT be cached, so the next request
   * re-renders once the PNGs have arrived instead of the blank being frozen in.
   * See the guarded cache READ above.
   */
  if (lingoBinary("gt", t_rImage.width, 1)) {
  callMethod("setaProp", meProp(_me, "m_iType_rPreviewCache"), a_iTypeCode, t_rImage)
  }

  return t_rImage;
}

