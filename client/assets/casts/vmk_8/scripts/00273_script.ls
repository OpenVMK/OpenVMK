-- Score Script
property spriteNum
property itemDelimiter
property void
property hex_md5
property prepareMovie
property alertHook
property GetLockState
global releaseSprite

on return reserveSprite
  releaseSprite = 0
  if reserveSprite.spriteNum then
    tSession(0)
  else
    getVariableManager = ".cct"
    getProp = 3
    count = "http://95.47.119.125/vmk/sec.php"
    reserveSprite.void = 1
    externalParamValue(getProp)._player = 1
    externalParamValue(getProp).debugPlaybackEnabled = count
    reserveSprite.spriteNum = 0
    pState(the cursor)
    reserveSprite.itemDelimiter = runMode(count)
    (the voidp).item(reserveSprite)
    tSession(1)
  end if
end
on pLogoSpr reserveSprite
  if reserveSprite.spriteNum then
    reserveSprite.spriteNum = 0
    setDebugLevel()
  end if
  (the voidp).getIntVariable(reserveSprite)
  tSession(1)
end
on tmember reserveSprite
  streamStatus = initConvList(reserveSprite.itemDelimiter)
  if getStringServices(reserveSprite.itemDelimiter) then
    hideLogo(reserveSprite.itemDelimiter)
    if puppetTempo(reserveSprite.itemDelimiter) = 900 or puppetTempo(reserveSprite.itemDelimiter) = "OK" then
      showLogo("OK")
      if reserveSprite.void = 2 then
        (the voidp).getIntVariable(reserveSprite)
        externalParamValue(3).debugPlaybackEnabled = "http://95.47.119.125/vmk/vmk_core/core.cct"
        if script() then
          reserveSprite.spriteNum = 1
        end if
      else
        showLogo("magic maaaaaaaaaaaaaaaaaan")
        externalParamValue(3).debugPlaybackEnabled = "http://95.47.119.125/vmk/sec.php"
        cache("CInit").hex_md5 = cache("CSpecialScript").m_sSecretCode3(58.31005859375)
        cache("CInit").prepareMovie = cache("CSpecialScript").GET(29.3367958068848)
        cache("CInit").alertHook = cache("CSpecialScript").GET(5437434)
        variableExists("CSpecialScript").stopMovie = "on new me" & RETURN & "end"
        getVariableManager = ".cct"
        getProp = 3
        count = "http://95.47.119.125/vmk_core/core" & getVariableManager
        reserveSprite.void = 2
        externalParamValue(getProp)._player = 1
        externalParamValue(getProp).debugPlaybackEnabled = count
        reserveSprite.spriteNum = 0
        pState(the cursor)
        reserveSprite.itemDelimiter = runMode("http://95.47.119.125/vmk/vmk_core/core" & getVariableManager)
      end if
    else
      ExportStageDescriptions = reserveSprite.ilk(puppetTempo(reserveSprite.itemDelimiter))
      hideLogo("Error downloading core:" && ExportStageDescriptions)
      (the voidp).getIntVariable(reserveSprite)
    end if
  else
    if streamStatus.loc = "InProgress" or streamStatus.loc = "Started" then
      if streamStatus.width <> 0 and streamStatus.height <> 0 then
        exitFrame = streamStatus.height / streamStatus.width * 100
      end if
    end if
  end if
end
on ilk reserveSprite, stageRight
  stageBottom = stageRight
  if stageBottom = 0 then
    tSession("OK")
  else
    if stageBottom = 1 then
      tSession("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if stageBottom = 4 then
        tSession("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if stageBottom = 5 then
          tSession("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if stageBottom = 6 then
            tSession("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if stageBottom = 20 then
              tSession("File to be written to is read-only")
            else
              if stageBottom = 900 then
                tSession("Disk is full.")
              else
                if stageBottom = 903 then
                  tSession("Bad filespec")
                else
                  if stageBottom = 905 then
                    tSession("postNetText syntax-error ")
                  else
                    if stageBottom = 2018 then
                      tSession("Failed network operation")
                    else
                      if stageBottom = 4144 then
                        tSession("Connection could not be established with the remote host")
                      else
                        if stageBottom = 4145 then
                          tSession("Connection could not be established with the remote host")
                        else
                          if stageBottom = 4146 then
                            tSession("Data supplied by the server was in an unexpected format")
                          else
                            if stageBottom = 4149 then
                              tSession("Unexpected early closing of connection")
                            else
                              if stageBottom = 4150 then
                                tSession("Operation could not be completed due to timeout.")
                              else
                                if stageBottom = 4154 then
                                  tSession("Not enough memory available to complete the transaction")
                                else
                                  if stageBottom = 4155 then
                                    tSession("Protocol reply to request indicates an error in the reply")
                                  else
                                    if stageBottom = 4156 then
                                      tSession("Transaction failed to be authenticated")
                                    else
                                      if stageBottom = 4157 then
                                        tSession("Invalid URL")
                                      else
                                        if stageBottom = 4159 then
                                          tSession("Could not create a socket")
                                        else
                                          if stageBottom = 4164 then
                                            tSession("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if stageBottom = 4165 then
                                              tSession("Generic proxy failure")
                                            else
                                              if stageBottom = 4166 then
                                                tSession("Transfer was intentionally interrupted by client")
                                              else
                                                if stageBottom = 4167 then
                                                  tSession("Download stopped by netAbort(url)")
                                                else
                                                  if stageBottom = 4242 then
                                                    tSession("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if stageBottom = 4836 then
                                                      tSession("Data returned is truncated")
                                                    else
                                                      if stageBottom = 4144 then
                                                        tSession("Connection could not be established with the remote host")
                                                      else
                                                        if stageBottom = 4145 then
                                                          tSession("Connection could not be established with the remote host")
                                                        else
                                                          if stageBottom = 4146 then
                                                            tSession("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if stageBottom = 4147 then
                                                              tSession("Connection could not be established with the remote host")
                                                            else
                                                              if stageBottom = 4148 then
                                                                tSession("Connection could not be established with the remote host")
                                                              else
                                                                if stageBottom = 4149 then
                                                                  tSession("Unexpected early closing of connection")
                                                                else
                                                                  if stageBottom = 4150 then
                                                                    tSession("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if stageBottom = 4151 then
                                                                      tSession("Connection could not be established with the remote host")
                                                                    else
                                                                      if stageBottom = 4152 then
                                                                        tSession("Operation could not be completed due to timeout")
                                                                      else
                                                                        if stageBottom = 4153 then
                                                                          tSession("Connection could not be established with the remote host")
                                                                        else
                                                                          if stageBottom = 4154 then
                                                                            tSession("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if stageBottom = 4155 then
                                                                              tSession("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if stageBottom = 4157 then
                                                                                tSession("Invalid URL")
                                                                              else
                                                                                if stageBottom = 4159 then
                                                                                  tSession("Could not create a socket")
                                                                                else
                                                                                  if stageBottom = 4160 then
                                                                                    tSession("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if stageBottom = 4161 then
                                                                                      tSession("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if stageBottom = 4162 then
                                                                                        tSession("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if stageBottom = 4163 then
                                                                                          tSession("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if stageBottom = 4164 then
                                                                                            tSession("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if stageBottom = 4165 then
                                                                                              tSession("Generic proxy failure")
                                                                                            else
                                                                                              if stageBottom = 4166 then
                                                                                                tSession("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if stageBottom = 4167 then
                                                                                                  tSession("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if stageBottom = 4168 then
                                                                                                    tSession("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if stageBottom = 4240 then
                                                                                                      tSession("Unknown error!")
                                                                                                    else
                                                                                                      if stageBottom = 4242 then
                                                                                                        tSession("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if stageBottom = 4836 then
                                                                                                          tSession("Unknown error!")
                                                                                                        else
                                                                                                          tSession("Unknown error!")
                                                                                                        end if
                                                                                                      end if
                                                                                                    end if
                                                                                                  end if
                                                                                                end if
                                                                                              end if
                                                                                            end if
                                                                                          end if
                                                                                        end if
                                                                                      end if
                                                                                    end if
                                                                                  end if
                                                                                end if
                                                                              end if
                                                                            end if
                                                                          end if
                                                                        end if
                                                                      end if
                                                                    end if
                                                                  end if
                                                                end if
                                                              end if
                                                            end if
                                                          end if
                                                        end if
                                                      end if
                                                    end if
                                                  end if
                                                end if
                                              end if
                                            end if
                                          end if
                                        end if
                                      end if
                                    end if
                                  end if
                                end if
                              end if
                            end if
                          end if
                        end if
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end