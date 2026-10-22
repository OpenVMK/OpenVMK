-- Score Script
property GET
property stopMovie
property prepareMovie
property d
property b
property a
property url
global hex_md5

on member stageBottom
  hex_md5 = 0
  if stageBottom.GET then
    reserveSprite(0)
  else
    stageBottom.prepareMovie = 1
    stageBottom.stopMovie = alertHook("http://127.0.0.1/vmk/loading.php")
    stageBottom.GET = 0
    exitFrame(the streamStatus)
    (the ExportStageDescriptions).stageRight(stageBottom)
    reserveSprite(1)
  end if
end
on stage stageBottom
  if stageBottom.GET then
    stageBottom.GET = 0
    GetLockState()
  end if
  (the ExportStageDescriptions).handlers(stageBottom)
  reserveSprite(1)
end
on script stageBottom
  foo = put(stageBottom.stopMovie)
  if _movie(stageBottom.stopMovie) then
    if scriptExecutionStyle(stageBottom.stopMovie) = 900 or scriptExecutionStyle(stageBottom.stopMovie) = "OK" then
      sprite("OK")
      if stageBottom.prepareMovie = 2 then
        (the ExportStageDescriptions).handlers(stageBottom)
        scriptText(3).g_rInitializer = "http://127.0.0.1/vmk/vmk_core/core.cct"
        scriptText(3).new(#createBroker, "CConnection").initConvList = "NotAConnectionLol"
        if CTOR() then
          stageBottom.GET = 1
        end if
      else
        sprite("magic maaaaaaaaaaaaaaaaaan")
        scriptText(3).g_rInitializer = "http://127.0.0.1/vmk/loading.php"
        if createBroker("CSpecialScript").tErrorCount = -1 then
          e("http://127.0.0.1/error.html")
          stageBottom.stopMovie = 1234
          reserveSprite()
        end if
        tSession("CInit").d = tSession("CSpecialScript").date(58.31005859375)
        tSession("CInit").b = tSession("CSpecialScript").c(29.3367958068848)
        tSession("CInit").a = tSession("CSpecialScript").c(5437434)
        createBroker("CSpecialScript").Initialize = "on new me" & RETURN & "end"
        clearGlobals = ".cct"
        frame = 3
        DTOR = "http://127.0.0.1/vmk_core/core" & clearGlobals
        stageBottom.prepareMovie = 2
        scriptText(frame).objectp = 1
        scriptText(frame).g_rInitializer = DTOR
        stageBottom.GET = 0
        exitFrame(the streamStatus)
        stageBottom.stopMovie = alertHook("http://127.0.0.1/vmk/vmk_core/core" & clearGlobals)
      end if
    else
      state = stageBottom.m_sSecretCode3(scriptExecutionStyle(stageBottom.stopMovie))
      getVariable("Error downloading core:" && state)
      (the ExportStageDescriptions).handlers(stageBottom)
    end if
  else
    if foo.spriteNum = "InProgress" or foo.spriteNum = "Started" then
      if foo.ilk <> 0 and foo.releaseSprite <> 0 then
        go = foo.releaseSprite / foo.ilk * 100
      end if
    end if
  end if
end
on m_sSecretCode3 stageBottom, bytesTotal
  bytesSoFar = bytesTotal
  if bytesSoFar = 0 then
    reserveSprite("OK")
  else
    if bytesSoFar = 1 then
      reserveSprite("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if bytesSoFar = 4 then
        reserveSprite("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if bytesSoFar = 5 then
          reserveSprite("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if bytesSoFar = 6 then
            reserveSprite("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if bytesSoFar = 20 then
              reserveSprite("File to be written to is read-only")
            else
              if bytesSoFar = 900 then
                reserveSprite("Disk is full.")
              else
                if bytesSoFar = 903 then
                  reserveSprite("Bad filespec")
                else
                  if bytesSoFar = 905 then
                    reserveSprite("postNetText syntax-error ")
                  else
                    if bytesSoFar = 2018 then
                      reserveSprite("Failed network operation")
                    else
                      if bytesSoFar = 4144 then
                        reserveSprite("Connection could not be established with the remote host")
                      else
                        if bytesSoFar = 4145 then
                          reserveSprite("Connection could not be established with the remote host")
                        else
                          if bytesSoFar = 4146 then
                            reserveSprite("Data supplied by the server was in an unexpected format")
                          else
                            if bytesSoFar = 4149 then
                              reserveSprite("Unexpected early closing of connection")
                            else
                              if bytesSoFar = 4150 then
                                reserveSprite("Operation could not be completed due to timeout.")
                              else
                                if bytesSoFar = 4154 then
                                  reserveSprite("Not enough memory available to complete the transaction")
                                else
                                  if bytesSoFar = 4155 then
                                    reserveSprite("Protocol reply to request indicates an error in the reply")
                                  else
                                    if bytesSoFar = 4156 then
                                      reserveSprite("Transaction failed to be authenticated")
                                    else
                                      if bytesSoFar = 4157 then
                                        reserveSprite("Invalid URL")
                                      else
                                        if bytesSoFar = 4159 then
                                          reserveSprite("Could not create a socket")
                                        else
                                          if bytesSoFar = 4164 then
                                            reserveSprite("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if bytesSoFar = 4165 then
                                              reserveSprite("Generic proxy failure")
                                            else
                                              if bytesSoFar = 4166 then
                                                reserveSprite("Transfer was intentionally interrupted by client")
                                              else
                                                if bytesSoFar = 4167 then
                                                  reserveSprite("Download stopped by netAbort(url)")
                                                else
                                                  if bytesSoFar = 4242 then
                                                    reserveSprite("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if bytesSoFar = 4836 then
                                                      reserveSprite("Data returned is truncated")
                                                    else
                                                      if bytesSoFar = 4144 then
                                                        reserveSprite("Connection could not be established with the remote host")
                                                      else
                                                        if bytesSoFar = 4145 then
                                                          reserveSprite("Connection could not be established with the remote host")
                                                        else
                                                          if bytesSoFar = 4146 then
                                                            reserveSprite("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if bytesSoFar = 4147 then
                                                              reserveSprite("Connection could not be established with the remote host")
                                                            else
                                                              if bytesSoFar = 4148 then
                                                                reserveSprite("Connection could not be established with the remote host")
                                                              else
                                                                if bytesSoFar = 4149 then
                                                                  reserveSprite("Unexpected early closing of connection")
                                                                else
                                                                  if bytesSoFar = 4150 then
                                                                    reserveSprite("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if bytesSoFar = 4151 then
                                                                      reserveSprite("Connection could not be established with the remote host")
                                                                    else
                                                                      if bytesSoFar = 4152 then
                                                                        reserveSprite("Operation could not be completed due to timeout")
                                                                      else
                                                                        if bytesSoFar = 4153 then
                                                                          reserveSprite("Connection could not be established with the remote host")
                                                                        else
                                                                          if bytesSoFar = 4154 then
                                                                            reserveSprite("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if bytesSoFar = 4155 then
                                                                              reserveSprite("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if bytesSoFar = 4157 then
                                                                                reserveSprite("Invalid URL")
                                                                              else
                                                                                if bytesSoFar = 4159 then
                                                                                  reserveSprite("Could not create a socket")
                                                                                else
                                                                                  if bytesSoFar = 4160 then
                                                                                    reserveSprite("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if bytesSoFar = 4161 then
                                                                                      reserveSprite("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if bytesSoFar = 4162 then
                                                                                        reserveSprite("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if bytesSoFar = 4163 then
                                                                                          reserveSprite("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if bytesSoFar = 4164 then
                                                                                            reserveSprite("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if bytesSoFar = 4165 then
                                                                                              reserveSprite("Generic proxy failure")
                                                                                            else
                                                                                              if bytesSoFar = 4166 then
                                                                                                reserveSprite("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if bytesSoFar = 4167 then
                                                                                                  reserveSprite("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if bytesSoFar = 4168 then
                                                                                                    reserveSprite("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if bytesSoFar = 4240 then
                                                                                                      reserveSprite("Unknown error!")
                                                                                                    else
                                                                                                      if bytesSoFar = 4242 then
                                                                                                        reserveSprite("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if bytesSoFar = 4836 then
                                                                                                          reserveSprite("Unknown error!")
                                                                                                        else
                                                                                                          reserveSprite("Unknown error!")
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