// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniSetLoader / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  /*
   * ⚠ HAND-CORRECTED: wait for tile ART RESIDENCY, not just cast attach.
   *
   * `IsItemReady` only means the item's CAST is attached — its bitmap PNGs may
   * still be decoding. Firing the callback then rendered a thumbnail/preview from
   * not-yet-resident art (a black box / blank that healed only on re-nav; the
   * "posters sometimes show nothing until you click away and back"). Director
   * shows the whole category at once because it does not composite until the art
   * is there.
   *
   * So probe the renderer: `_RenderFurniPreview` returns a width>1 image ONLY once
   * every tile is resident (its residency gate returns a degenerate 1x1 otherwise,
   * and arms the fetch), and it CACHES the good render — so the probe doubles as
   * priming the cache the real request reuses. An item is truly ready when the
   * probe is non-degenerate. A timeout still fires the callback so a genuinely
   * missing PNG cannot hang the category forever (it then renders whatever is
   * there). See _RenderFurniPreview + `artResident` ([[member-duplicate-not-implemented]]).
   */
  if (callNamed("voidp", meProp(_me, "m_iStartMs"))) {
  setMeProp(_me, "m_iStartMs", theProperty("milliSeconds"));
  }

  var t_rRenderer = callNamed("getThread", symbol("room")).component.m_rThumbRenderer;
  var t_iCount = meProp(_me, "m_ar_iToBeLoaded").count;
  for (var i = t_iCount; i >= 1; --i) {
  var t_iType = meProp(_me, "m_ar_iToBeLoaded")[i];
  if (callMethod("IsItemReady", meProp(_me, "m_rFurniLoader"), t_iType)) {
  var t_bReady = 1;
  if (lingoTruthy(callNamed("objectp", t_rRenderer))) {
  var t_rProbe = callMethod("_RenderFurniPreview", t_rRenderer, t_iType);
  if (!lingoBinary("gt", t_rProbe.width, 1)) {
  t_bReady = 0;
  }
  }

  if (t_bReady) {
  callMethod("deleteAt", meProp(_me, "m_ar_iToBeLoaded"), i)
  }
  }

  }

  if (lingoBinary("gt", meProp(_me, "m_ar_iToBeLoaded").count, 0)) {
  if (lingoBinary("gt", lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_iStartMs")), 8000)) {
  setMeProp(_me, "m_ar_iToBeLoaded", new LingoList([]));
  }
  }

  if (lingoBinary("eq", meProp(_me, "m_ar_iToBeLoaded").count, 0)) {
  callNamed("removeUpdate", callMethod("getID", _this))
  callNamed("call", meProp(_me, "m_kMethod"), meProp(_me, "m_rClient"), meProp(_me, "m_mp_iType_rImage"), meProp(_me, "m_rCallback"))
  callNamed("removeObject", callMethod("getID", _this))
  }

}

