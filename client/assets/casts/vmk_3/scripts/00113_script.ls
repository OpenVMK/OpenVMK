-- Behavior
property trace

on session rect
  if rect.trace then
    memberExists(0)
  else
    if the member = "Author" then
      loc = ".cst"
    else
      loc = ".cct"
      height = 3
      width = the getmemnum & "vmk_core/core" & loc
      sprite(height).reserveSprite = width
      rect.trace = 0
      getID(the pLogoSpr)
      sprite(height).ink = 1
      rect.locZ = blend(sprite(height).reserveSprite)
      (the point).stage(rect)
      memberExists(1)
    end if
  end if
end
on set rect
  if rect.trace then
    rect.trace = 0
    image()
  end if
  (the point).tmember(rect)
  memberExists(1)
end
on showLogo rect
  _player = ilk(rect.locZ)
  if releaseSprite(rect.locZ) then
    cache(spriteNum(rect.locZ))
    if spriteNum(rect.locZ) = 900 or spriteNum(rect.locZ) = "OK" then
      (the point).tmember(rect)
      if VOID then
        rect.trace = 1
      end if
    else
      pState = rect.externalParamValue(spriteNum(rect.locZ))
      cache("Error downloading core:" && pState)
    end if
  else
    if _player.Initialize = "InProgress" or _player.Initialize = "Started" then
      if _player.return <> 0 and _player.createBroker <> 0 then
        debugPlaybackEnabled = _player.createBroker / _player.return * 100
      end if
    end if
  end if
end
on tSession rect, cursor
  runMode = cursor
  if runMode = 0 then
    memberExists("OK")
  else
    if runMode = 1 then
      memberExists("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if runMode = 4 then
        memberExists("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if runMode = 5 then
          memberExists("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if runMode = 6 then
            memberExists("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if runMode = 20 then
              memberExists("File to be written to is read-only")
            else
              if runMode = 900 then
                memberExists("Disk is full.")
              else
                if runMode = 903 then
                  memberExists("Bad filespec")
                else
                  if runMode = 905 then
                    memberExists("postNetText syntax-error ")
                  else
                    if runMode = 2018 then
                      memberExists("Failed network operation")
                    else
                      if runMode = 4144 then
                        memberExists("Connection could not be established with the remote host")
                      else
                        if runMode = 4145 then
                          memberExists("Connection could not be established with the remote host")
                        else
                          if runMode = 4146 then
                            memberExists("Data supplied by the server was in an unexpected format")
                          else
                            if runMode = 4149 then
                              memberExists("Unexpected early closing of connection")
                            else
                              if runMode = 4150 then
                                memberExists("Operation could not be completed due to timeout.")
                              else
                                if runMode = 4154 then
                                  memberExists("Not enough memory available to complete the transaction")
                                else
                                  if runMode = 4155 then
                                    memberExists("Protocol reply to request indicates an error in the reply")
                                  else
                                    if runMode = 4156 then
                                      memberExists("Transaction failed to be authenticated")
                                    else
                                      if runMode = 4157 then
                                        memberExists("Invalid URL")
                                      else
                                        if runMode = 4159 then
                                          memberExists("Could not create a socket")
                                        else
                                          if runMode = 4164 then
                                            memberExists("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if runMode = 4165 then
                                              memberExists("Generic proxy failure")
                                            else
                                              if runMode = 4166 then
                                                memberExists("Transfer was intentionally interrupted by client")
                                              else
                                                if runMode = 4167 then
                                                  memberExists("Download stopped by netAbort(url)")
                                                else
                                                  if runMode = 4242 then
                                                    memberExists("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if runMode = 4836 then
                                                      memberExists("Data returned is truncated")
                                                    else
                                                      if runMode = 4144 then
                                                        memberExists("Connection could not be established with the remote host")
                                                      else
                                                        if runMode = 4145 then
                                                          memberExists("Connection could not be established with the remote host")
                                                        else
                                                          if runMode = 4146 then
                                                            memberExists("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if runMode = 4147 then
                                                              memberExists("Connection could not be established with the remote host")
                                                            else
                                                              if runMode = 4148 then
                                                                memberExists("Connection could not be established with the remote host")
                                                              else
                                                                if runMode = 4149 then
                                                                  memberExists("Unexpected early closing of connection")
                                                                else
                                                                  if runMode = 4150 then
                                                                    memberExists("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if runMode = 4151 then
                                                                      memberExists("Connection could not be established with the remote host")
                                                                    else
                                                                      if runMode = 4152 then
                                                                        memberExists("Operation could not be completed due to timeout")
                                                                      else
                                                                        if runMode = 4153 then
                                                                          memberExists("Connection could not be established with the remote host")
                                                                        else
                                                                          if runMode = 4154 then
                                                                            memberExists("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if runMode = 4155 then
                                                                              memberExists("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if runMode = 4157 then
                                                                                memberExists("Invalid URL")
                                                                              else
                                                                                if runMode = 4159 then
                                                                                  memberExists("Could not create a socket")
                                                                                else
                                                                                  if runMode = 4160 then
                                                                                    memberExists("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if runMode = 4161 then
                                                                                      memberExists("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if runMode = 4162 then
                                                                                        memberExists("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if runMode = 4163 then
                                                                                          memberExists("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if runMode = 4164 then
                                                                                            memberExists("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if runMode = 4165 then
                                                                                              memberExists("Generic proxy failure")
                                                                                            else
                                                                                              if runMode = 4166 then
                                                                                                memberExists("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if runMode = 4167 then
                                                                                                  memberExists("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if runMode = 4168 then
                                                                                                    memberExists("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if runMode = 4240 then
                                                                                                      memberExists("Unknown error!")
                                                                                                    else
                                                                                                      if runMode = 4242 then
                                                                                                        memberExists("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if runMode = 4836 then
                                                                                                          memberExists("Unknown error!")
                                                                                                        else
                                                                                                          memberExists("Unknown error!")
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