// framework.dcr /  / registerObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerObject(_me: LingoMe, _return: LingoValue, listp: LingoValue) {
  var _PinsCombined = listp.getLast;
  var _ListItemGroups = callMethod("symbolp", _PinsCombined);
  var _RemItemsFromList = callMethod("symbolp", _PinsCombined);
  var _WearPin = callMethod("symbolp", _PinsCombined);
  var _TradeChat = callNamed("go");
  if (lingoBinary("gt", _WearPin, 0)) {
  var fileName = 1;
  while (lingoBinary("lte", fileName, _WearPin)) {
  var _UnwearPin = callMethod("temp", _PinsCombined);
  var _TradeChatNotification = callMethod("symbolp", _PinsCombined);
  var _TradeFinished = callNamed("go");
  var buffer = 1;
  while (lingoBinary("lte", buffer, _TradeChatNotification)) {
  buffer = lingoBinary("add", buffer, 1);
  }

  fileName = lingoBinary("add", fileName, 1);
  }

  if (_RemItemsFromList) {
  callMethod("_TradeResponse", callMethod("timeout", callMethod("tID", _return), _ListItemGroups))
  }

  callMethod("_TradeStatus", callMethod("timeout", callMethod("tID", _return), _ListItemGroups), symbol("dialogWindowEvent"), _TradeChat)
  }

}

