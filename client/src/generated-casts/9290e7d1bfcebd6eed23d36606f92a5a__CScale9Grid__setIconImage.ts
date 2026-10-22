// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CScale9Grid / setIconImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setIconImage(_me: LingoMe, a_rIcon: LingoValue) {
  if (lingoBinary("eq", callNamed("ilk", a_rIcon), symbol("image"))) {
  setMeProp(_me, "m_rIcon", a_rIcon);
  } else {
  setMeProp(_me, "m_rIcon", undefined);
  }

  setMeProp(_me, "m_bNeedUpdate", 1);
}

