// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorElement / SetToTileStack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetToTileStack(_me: LingoMe, _this: LingoValue, a_rTile: LingoValue, a_iStack: LingoValue) {
  var t_rTile = a_rTile;
  while (1) {
  if (callNamed("voidp", t_rTile)) {
  callNamed("error", _this, "Failed to find tile!", symbol("SetToTileStack"))
  break;
  }

  if (lingoBinary("eq", callMethod("GetParam", callMethod("GetOwner", t_rTile), "CLASS"), "floor")) {
  break;
  continue;
  }

  t_rTile = callMethod("GetOwner", t_rTile);
  }

  if (callMethod("_TestComposition", _this, t_rTile, a_iStack)) {
  callMethod("SetAbsPos", callMethod("getObject", _this), callMethod("GetAbsPos", t_rTile))
  setMeProp(_me, "m_rTile", t_rTile);
  setMeProp(_me, "m_iStack", a_iStack);
  callMethod("_ComposeBlocks", _this)
  } else {
  return 0;
  }

  if ((lingoTruthy(meProp(_me, "m_bteleport")) ? 0 : 1)) {
  var t_ar_rBlocks = callMethod("GetBlocks", callMethod("GetFactor", callMethod("getObject", _this)));
  for (var t_rBlock of t_ar_rBlocks.toArray()) {
  if (lingoBinary("eq", callMethod("GetParam", t_rBlock, "ACT"), 1)) {
  setMeProp(_me, "m_bteleport", 1);
  setMeProp(_me, "m_sDelegate", callNamed("getUniqueID"));
  var t_rDelegate = callNamed("createObject", meProp(_me, "m_sDelegate"), "CFurniPairedItemDelegate");
  callMethod("SetClientItem", t_rDelegate, callMethod("getObject", _this))
  break;
  }

  }

  }

  return 1;
}

