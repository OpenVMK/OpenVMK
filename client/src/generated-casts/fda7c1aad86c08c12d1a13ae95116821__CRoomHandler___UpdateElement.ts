// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _UpdateElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _UpdateElement(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iCategory = callMethod("GetIntFrom", t_rInput);
  var t_iPlaceRef = callMethod("GetIntFrom", t_rInput);
  var t_iAllowGuestMove = callMethod("GetIntFrom", t_rInput);
  var t_iParamCnt = callMethod("GetIntFrom", t_rInput);
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", _this));
  if (callNamed("objectp", t_rContext)) {
  switch (t_iCategory) {
case 1:
case 5:
  var t_iDir = callMethod("GetIntFrom", t_rInput);
  var t_rElem = callMethod("_AccessIndexed", t_rContext, t_iRef, "element");
  if (callNamed("objectp", t_rElem)) {
  callMethod("SetParam", callMethod("getObject", t_rElem), "GUESTMOVE", callNamed("string", t_iAllowGuestMove))
  var t_rTile = callMethod("_AccessIndexed", t_rContext, t_iPlaceRef, "tile");
  if (callNamed("objectp", t_rTile)) {
  callMethod("RemFromStack", callMethod("GetFactor", t_rElem))
  var t_rCopy = t_rTile;
  var t_iStack = 0;
  while (1) {
  if (lingoBinary("gt", callMethod("GetCount", t_rCopy), 0)) {
  t_rCopy = t_rCopy[1];
  t_iStack = lingoBinary("add", t_iStack, 1);
  continue;
  }

  break;
  }

  callMethod("SetParam", t_rElem, "DIR", callNamed("string", t_iDir))
  if ((lingoTruthy(callMethod("SetToTileStack", callMethod("GetFactor", t_rElem), t_rTile, t_iStack)) ? 0 : 1)) {
  callNamed("error", _this, "Failed to set item into a tile!", symbol("_UpdateElement"))
  }

  if ((lingoTruthy(callNamed("voidp", callMethod("GetVisual", t_rElem))) ? 0 : 1)) {
  if (callMethod("IsSelected", callMethod("GetVisual", t_rElem))) {
  callMethod("RemoveHighlighters", callMethod("GetVisual", t_rElem))
  callMethod("CreateHighlighters", callMethod("GetVisual", t_rElem))
  }

  }

  if (lingoBinary("gt", t_iParamCnt, 1)) {
  t_iParamCnt = lingoBinary("sub", t_iParamCnt, 1);
  var t_ar_iParams = new LingoList([]);
  for (var j = 1; j <= t_iParamCnt; ++j) {
  callMethod("add", t_ar_iParams, callMethod("GetIntFrom", t_rInput))
  }

  callMethod("setState", callMethod("GetFactor", t_rElem), t_ar_iParams[1])
  }

  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Tile not found:", t_iPlaceRef), symbol("_UpdateElement"))
  }

  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Element not found:", t_iRef), symbol("_UpdateElement"))
  }

  break;
case 3:
  t_rElem = callMethod("_AccessIndexed", t_rContext, t_iRef, "poster");
  if (callNamed("objectp", t_rElem)) {
  callMethod("SetParam", callMethod("getObject", t_rElem), "GUESTMOVE", callNamed("string", t_iAllowGuestMove))
  var t_rWall = callMethod("_AccessIndexed", t_rContext, t_iPlaceRef, "wall");
  if (callNamed("objectp", t_rWall)) {
  var t_iX = callMethod("GetIntFrom", t_rInput);
  var t_iY = callMethod("GetIntFrom", t_rInput);
  var t_iZ = callMethod("GetIntFrom", t_rInput);
  callMethod("PlaceTo", callMethod("GetFactor", t_rElem), t_rWall, callNamed("vector", t_iX, t_iY, t_iZ))
  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Wall not found:", t_iPlaceRef), symbol("_UpdateElement"))
  }

  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Poster not found:", t_iRef), symbol("_UpdateElement"))
  }

  break;
case 6:
case 7:
  t_rElem = callMethod("_AccessIndexed", t_rContext, t_iRef, "collectable");
  break;
  default:
  callNamed("error", _this, lingoBinary("joinPad", "Unsupported item category:", t_iCategory), symbol("_UpdateElement"))
  break;
  break;
  }

  }

}

