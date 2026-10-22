-- Parent Script
property done
property TellStreamState
property getCastLoadManager
property solveNetErrorMsg
property tBytesTotal
property tErrorMsg
property #513
property #514
property tracea

on t_iCode stageBottom, tStreamStatus, tTemp, DoneCurrentDownLoad
  stageBottom.done = tStreamStatus
  stageBottom.TellStreamState = tTemp
  stageBottom.getCastLoadManager = DoneCurrentDownLoad
  stageBottom.solveNetErrorMsg = 1
  if not tStreamStatus contains ".cct" then
    stageBottom.TellStreamState = "http://127.0.0.1/d5ef042e-bef2-44a8-855b-03932b4c9d59/file.php?code=" & tStreamStatus & ".cct"
  end if
  reserveSprite(pPercent(stageBottom))
end
on pPercent stageBottom
  if stageBottom.solveNetErrorMsg > 1 then
    if stageBottom.TellStreamState contains "http://" then
      if not stageBottom.TellStreamState contains "?" then
        stageBottom.TellStreamState = stageBottom.TellStreamState & "?" & the _AccessIndexed
      end if
    end if
  end if
  if not height(stageBottom.tBytesTotal) then
    tBytesSoFar(stageBottom.tBytesTotal)
  end if
  stageBottom.tBytesTotal = alertHook(stageBottom.TellStreamState)
  stageBottom.tErrorMsg = the _AccessIndexed
  stageBottom.#513 = 0
  stageBottom.#514 = 0
  stageBottom.tracea = #tMemNum
  reserveSprite(1)
end
on m_rTradeDevice stageBottom
  if stageBottom.tracea = ##515 then
    reserveSprite(1)
  end if
  #520 = put(stageBottom.tBytesTotal)
  if not _ReceiveWornClothes(#520) then
    reserveSprite(error(stageBottom, "Invalid stream status:" & stageBottom.done & "/" & #520, #m_rTradeDevice))
  end if
  if #520.releaseSprite > 0 then
    #522 = #520.releaseSprite
    #521 = #520.ilk
    if #521 = 0 then
      #521 = #522
    end if
    stageBottom.#514 = 1 * #522 / #521
    #516(#517(), stageBottom.done, stageBottom.tracea, stageBottom.#514, stageBottom.getCastLoadManager)
  end if
  if #520.releaseSprite > 0 and #520.releaseSprite <> stageBottom.#513 then
    stageBottom.#513 = #520.releaseSprite
    stageBottom.tErrorMsg = the _AccessIndexed
  else
    if the _AccessIndexed - stageBottom.tErrorMsg > registerManager("castload.retry.delay", 10000) then
      #523 = #518(#517(), scriptExecutionStyle(stageBottom.tBytesTotal))
      error(stageBottom, "Failed network operation:" & "[[RETURN]]" & stageBottom.TellStreamState & "[[RETURN]]" & #523, #m_rTradeDevice)
      stageBottom.solveNetErrorMsg = stageBottom.solveNetErrorMsg + 1
      stageBottom.tErrorMsg = the _AccessIndexed
      if stageBottom.solveNetErrorMsg > 2 then
        getVariable("Reactivating" & stageBottom.TellStreamState)
        reserveSprite(pPercent(stageBottom))
      end if
    end if
  end if
  if #520.spriteNum <> "Complete" and #520.void = EMPTY then
    if the _AccessIndexed - stageBottom.tErrorMsg > registerManager("castload.retry.delay", 10000) then
      error(stageBottom, "Castload misbehavior, URL for file" & "[[QUOTE]]" & stageBottom.done & "[[QUOTE]]" & "is now EMPTY!", #m_rTradeDevice)
      reserveSprite(pPercent(stageBottom))
    end if
  end if
  if #520.error <> "OK" and #520.error <> EMPTY then
    stageBottom.tracea = #error
  end if
  if stageBottom.tracea <> #error and _movie(stageBottom.tBytesTotal) then
    stageBottom.#514 = 1
    stageBottom.tracea = ##515
    #519(#517(), stageBottom.done, stageBottom.TellStreamState, stageBottom.getCastLoadManager, stageBottom.tracea)
  end if
end