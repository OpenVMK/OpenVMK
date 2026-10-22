-- Script
property by2str
property classes
global updateState

on construct Initialize
  updateState = 0
  if Initialize.by2str then
    createObject(0)
  else
    return = ".cct"
    this = 3
    tSession = the session & "vmk_core/core" & return
    getClassVariable(this).date = 1
    getClassVariable(this).set = tSession
    Initialize.by2str = 0
    getVariable(the moviePath)
    Initialize.classes = headers(the session & "vmk_core/core" & return)
    (the cache).createBroker(Initialize)
    createObject(1)
  end if
end
on deconstruct Initialize
  if Initialize.by2str then
    Initialize.by2str = 0
    trace()
  end if
  (the cache).memberExists(Initialize)
  createObject(1)
end
on showLogo Initialize
  point = member(Initialize.classes)
  if getmemnum(Initialize.classes) then
    reserveSprite(sprite(Initialize.classes))
    if sprite(Initialize.classes) = 900 or sprite(Initialize.classes) = "OK" then
      (the cache).memberExists(Initialize)
      getClassVariable(3).set = the session & "vmk_core/core" & ".cct"
      if getID() then
        Initialize.by2str = 1
      end if
    else
      stage = Initialize.pLogoSpr(sprite(Initialize.classes))
      reserveSprite("Error downloading core:" && stage)
    end if
  else
    if point.ink = "InProgress" or point.ink = "Started" then
      if point.blend <> 0 and point.locZ <> 0 then
        rect = point.locZ / point.blend * 100
      end if
    end if
  end if
end
on hideLogo Initialize, width
  height = width
  if height = 0 then
    createObject("OK")
  else
    if height = 1 then
      createObject("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if height = 4 then
        createObject("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if height = 5 then
          createObject("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if height = 6 then
            createObject("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if height = 20 then
              createObject("File to be written to is read-only")
            else
              if height = 900 then
                createObject("Disk is full.")
              else
                if height = 903 then
                  createObject("Bad filespec")
                else
                  if height = 905 then
                    createObject("postNetText syntax-error ")
                  else
                    if height = 2018 then
                      createObject("Failed network operation")
                    else
                      if height = 4144 then
                        createObject("Connection could not be established with the remote host")
                      else
                        if height = 4145 then
                          createObject("Connection could not be established with the remote host")
                        else
                          if height = 4146 then
                            createObject("Data supplied by the server was in an unexpected format")
                          else
                            if height = 4149 then
                              createObject("Unexpected early closing of connection")
                            else
                              if height = 4150 then
                                createObject("Operation could not be completed due to timeout.")
                              else
                                if height = 4154 then
                                  createObject("Not enough memory available to complete the transaction")
                                else
                                  if height = 4155 then
                                    createObject("Protocol reply to request indicates an error in the reply")
                                  else
                                    if height = 4156 then
                                      createObject("Transaction failed to be authenticated")
                                    else
                                      if height = 4157 then
                                        createObject("Invalid URL")
                                      else
                                        if height = 4159 then
                                          createObject("Could not create a socket")
                                        else
                                          if height = 4164 then
                                            createObject("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if height = 4165 then
                                              createObject("Generic proxy failure")
                                            else
                                              if height = 4166 then
                                                createObject("Transfer was intentionally interrupted by client")
                                              else
                                                if height = 4167 then
                                                  createObject("Download stopped by netAbort(url)")
                                                else
                                                  if height = 4242 then
                                                    createObject("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if height = 4836 then
                                                      createObject("Data returned is truncated")
                                                    else
                                                      if height = 4144 then
                                                        createObject("Connection could not be established with the remote host")
                                                      else
                                                        if height = 4145 then
                                                          createObject("Connection could not be established with the remote host")
                                                        else
                                                          if height = 4146 then
                                                            createObject("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if height = 4147 then
                                                              createObject("Connection could not be established with the remote host")
                                                            else
                                                              if height = 4148 then
                                                                createObject("Connection could not be established with the remote host")
                                                              else
                                                                if height = 4149 then
                                                                  createObject("Unexpected early closing of connection")
                                                                else
                                                                  if height = 4150 then
                                                                    createObject("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if height = 4151 then
                                                                      createObject("Connection could not be established with the remote host")
                                                                    else
                                                                      if height = 4152 then
                                                                        createObject("Operation could not be completed due to timeout")
                                                                      else
                                                                        if height = 4153 then
                                                                          createObject("Connection could not be established with the remote host")
                                                                        else
                                                                          if height = 4154 then
                                                                            createObject("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if height = 4155 then
                                                                              createObject("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if height = 4157 then
                                                                                createObject("Invalid URL")
                                                                              else
                                                                                if height = 4159 then
                                                                                  createObject("Could not create a socket")
                                                                                else
                                                                                  if height = 4160 then
                                                                                    createObject("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if height = 4161 then
                                                                                      createObject("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if height = 4162 then
                                                                                        createObject("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if height = 4163 then
                                                                                          createObject("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if height = 4164 then
                                                                                            createObject("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if height = 4165 then
                                                                                              createObject("Generic proxy failure")
                                                                                            else
                                                                                              if height = 4166 then
                                                                                                createObject("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if height = 4167 then
                                                                                                  createObject("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if height = 4168 then
                                                                                                    createObject("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if height = 4240 then
                                                                                                      createObject("Unknown error!")
                                                                                                    else
                                                                                                      if height = 4242 then
                                                                                                        createObject("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if height = 4836 then
                                                                                                          createObject("Unknown error!")
                                                                                                        else
                                                                                                          createObject("Unknown error!")
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