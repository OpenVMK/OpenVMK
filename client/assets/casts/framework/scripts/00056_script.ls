-- Behavior
on session stage
  if stage.tSession then
    trace(0)
  else
    if the memberExists = "Author" then
      height = ".cst"
    else
      height = ".cct"
      width = 3
      rect = the member & "vmk_core/core" & height
      getmemnum(width).sprite = rect
      stage.tSession = 0
      reserveSprite(the getID)
      getmemnum(width).pLogoSpr = 1
      stage.blend = ink(getmemnum(width).sprite)
      (the locZ).point(stage)
      trace(1)
    end if
  end if
end
on set stage
  if stage.tSession then
    stage.tSession = 0
    loc()
  end if
  (the locZ).image(stage)
  trace(1)
end
on showLogo stage
  _player = tmember(stage.blend)
  if ilk(stage.blend) then
    cache(releaseSprite(stage.blend))
    if releaseSprite(stage.blend) = 900 or releaseSprite(stage.blend) = "OK" then
      (the locZ).image(stage)
      if spriteNum() then
        stage.tSession = 1
      end if
    else
      pState = stage.void(releaseSprite(stage.blend))
      cache("Error downloading core:" && pState)
    end if
  else
    if _player.Initialize = "InProgress" or _player.Initialize = "Started" then
      if _player.cTC <> 0 and _player.createBroker <> 0 then
        debugPlaybackEnabled = _player.createBroker / _player.cTC * 100
      end if
    end if
  end if
end
on this stage, cursor
  runMode = cursor
  if runMode = 0 then
    trace("OK")
  else
    if runMode = 1 then
      trace("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if runMode = 4 then
        trace("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if runMode = 5 then
          trace("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if runMode = 6 then
            trace("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if runMode = 20 then
              trace("File to be written to is read-only")
            else
              if runMode = 900 then
                trace("Disk is full.")
              else
                if runMode = 903 then
                  trace("Bad filespec")
                else
                  if runMode = 905 then
                    trace("postNetText syntax-error ")
                  else
                    if runMode = 2018 then
                      trace("Failed network operation")
                    else
                      if runMode = 4144 then
                        trace("Connection could not be established with the remote host")
                      else
                        if runMode = 4145 then
                          trace("Connection could not be established with the remote host")
                        else
                          if runMode = 4146 then
                            trace("Data supplied by the server was in an unexpected format")
                          else
                            if runMode = 4149 then
                              trace("Unexpected early closing of connection")
                            else
                              if runMode = 4150 then
                                trace("Operation could not be completed due to timeout.")
                              else
                                if runMode = 4154 then
                                  trace("Not enough memory available to complete the transaction")
                                else
                                  if runMode = 4155 then
                                    trace("Protocol reply to request indicates an error in the reply")
                                  else
                                    if runMode = 4156 then
                                      trace("Transaction failed to be authenticated")
                                    else
                                      if runMode = 4157 then
                                        trace("Invalid URL")
                                      else
                                        if runMode = 4159 then
                                          trace("Could not create a socket")
                                        else
                                          if runMode = 4164 then
                                            trace("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if runMode = 4165 then
                                              trace("Generic proxy failure")
                                            else
                                              if runMode = 4166 then
                                                trace("Transfer was intentionally interrupted by client")
                                              else
                                                if runMode = 4167 then
                                                  trace("Download stopped by netAbort(url)")
                                                else
                                                  if runMode = 4242 then
                                                    trace("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if runMode = 4836 then
                                                      trace("Data returned is truncated")
                                                    else
                                                      if runMode = 4144 then
                                                        trace("Connection could not be established with the remote host")
                                                      else
                                                        if runMode = 4145 then
                                                          trace("Connection could not be established with the remote host")
                                                        else
                                                          if runMode = 4146 then
                                                            trace("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if runMode = 4147 then
                                                              trace("Connection could not be established with the remote host")
                                                            else
                                                              if runMode = 4148 then
                                                                trace("Connection could not be established with the remote host")
                                                              else
                                                                if runMode = 4149 then
                                                                  trace("Unexpected early closing of connection")
                                                                else
                                                                  if runMode = 4150 then
                                                                    trace("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if runMode = 4151 then
                                                                      trace("Connection could not be established with the remote host")
                                                                    else
                                                                      if runMode = 4152 then
                                                                        trace("Operation could not be completed due to timeout")
                                                                      else
                                                                        if runMode = 4153 then
                                                                          trace("Connection could not be established with the remote host")
                                                                        else
                                                                          if runMode = 4154 then
                                                                            trace("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if runMode = 4155 then
                                                                              trace("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if runMode = 4157 then
                                                                                trace("Invalid URL")
                                                                              else
                                                                                if runMode = 4159 then
                                                                                  trace("Could not create a socket")
                                                                                else
                                                                                  if runMode = 4160 then
                                                                                    trace("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if runMode = 4161 then
                                                                                      trace("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if runMode = 4162 then
                                                                                        trace("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if runMode = 4163 then
                                                                                          trace("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if runMode = 4164 then
                                                                                            trace("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if runMode = 4165 then
                                                                                              trace("Generic proxy failure")
                                                                                            else
                                                                                              if runMode = 4166 then
                                                                                                trace("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if runMode = 4167 then
                                                                                                  trace("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if runMode = 4168 then
                                                                                                    trace("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if runMode = 4240 then
                                                                                                      trace("Unknown error!")
                                                                                                    else
                                                                                                      if runMode = 4242 then
                                                                                                        trace("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if runMode = 4836 then
                                                                                                          trace("Unknown error!")
                                                                                                        else
                                                                                                          trace("Unknown error!")
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