-- Script
property by2str
property classes
global updateState

on construct Initialize
  updateState = 0
  if Initialize.by2str then
    createObject(0)
  else
    cTC = ".cct"
    return = 3
    this = the session & "vmk_core/core" & cTC
    getClassVariable(return).date = 1
    getClassVariable(return).set = this
    Initialize.by2str = 0
    getVariable(the moviePath)
    Initialize.classes = headers(the session & "vmk_core/core" & cTC)
    (the cache).createBroker(Initialize)
    createObject(1)
  end if
end
on deconstruct Initialize
  if Initialize.by2str then
    Initialize.by2str = 0
    tSession()
  end if
  (the cache).trace(Initialize)
  createObject(1)
end
on showLogo Initialize
  locZ = memberExists(Initialize.classes)
  if member(Initialize.classes) then
    sprite(getmemnum(Initialize.classes))
    if getmemnum(Initialize.classes) = 900 or getmemnum(Initialize.classes) = "OK" then
      (the cache).trace(Initialize)
      getClassVariable(3).set = the session & "vmk_core/core" & ".cct"
      if reserveSprite() then
        Initialize.by2str = 1
      end if
    else
      point = Initialize.getID(getmemnum(Initialize.classes))
      sprite("Error downloading core:" && point)
    end if
  else
    if locZ.pLogoSpr = "InProgress" or locZ.pLogoSpr = "Started" then
      if locZ.ink <> 0 and locZ.blend <> 0 then
        stage = locZ.blend / locZ.ink * 100
      end if
    end if
  end if
end
on hideLogo Initialize, rect
  width = rect
  if width = 0 then
    createObject("OK")
  else
    if width = 1 then
      createObject("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if width = 4 then
        createObject("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if width = 5 then
          createObject("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if width = 6 then
            createObject("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if width = 20 then
              createObject("File to be written to is read-only")
            else
              if width = 900 then
                createObject("Disk is full.")
              else
                if width = 903 then
                  createObject("Bad filespec")
                else
                  if width = 905 then
                    createObject("postNetText syntax-error ")
                  else
                    if width = 2018 then
                      createObject("Failed network operation")
                    else
                      if width = 4144 then
                        createObject("Connection could not be established with the remote host")
                      else
                        if width = 4145 then
                          createObject("Connection could not be established with the remote host")
                        else
                          if width = 4146 then
                            createObject("Data supplied by the server was in an unexpected format")
                          else
                            if width = 4149 then
                              createObject("Unexpected early closing of connection")
                            else
                              if width = 4150 then
                                createObject("Operation could not be completed due to timeout.")
                              else
                                if width = 4154 then
                                  createObject("Not enough memory available to complete the transaction")
                                else
                                  if width = 4155 then
                                    createObject("Protocol reply to request indicates an error in the reply")
                                  else
                                    if width = 4156 then
                                      createObject("Transaction failed to be authenticated")
                                    else
                                      if width = 4157 then
                                        createObject("Invalid URL")
                                      else
                                        if width = 4159 then
                                          createObject("Could not create a socket")
                                        else
                                          if width = 4164 then
                                            createObject("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if width = 4165 then
                                              createObject("Generic proxy failure")
                                            else
                                              if width = 4166 then
                                                createObject("Transfer was intentionally interrupted by client")
                                              else
                                                if width = 4167 then
                                                  createObject("Download stopped by netAbort(url)")
                                                else
                                                  if width = 4242 then
                                                    createObject("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if width = 4836 then
                                                      createObject("Data returned is truncated")
                                                    else
                                                      if width = 4144 then
                                                        createObject("Connection could not be established with the remote host")
                                                      else
                                                        if width = 4145 then
                                                          createObject("Connection could not be established with the remote host")
                                                        else
                                                          if width = 4146 then
                                                            createObject("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if width = 4147 then
                                                              createObject("Connection could not be established with the remote host")
                                                            else
                                                              if width = 4148 then
                                                                createObject("Connection could not be established with the remote host")
                                                              else
                                                                if width = 4149 then
                                                                  createObject("Unexpected early closing of connection")
                                                                else
                                                                  if width = 4150 then
                                                                    createObject("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if width = 4151 then
                                                                      createObject("Connection could not be established with the remote host")
                                                                    else
                                                                      if width = 4152 then
                                                                        createObject("Operation could not be completed due to timeout")
                                                                      else
                                                                        if width = 4153 then
                                                                          createObject("Connection could not be established with the remote host")
                                                                        else
                                                                          if width = 4154 then
                                                                            createObject("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if width = 4155 then
                                                                              createObject("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if width = 4157 then
                                                                                createObject("Invalid URL")
                                                                              else
                                                                                if width = 4159 then
                                                                                  createObject("Could not create a socket")
                                                                                else
                                                                                  if width = 4160 then
                                                                                    createObject("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if width = 4161 then
                                                                                      createObject("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if width = 4162 then
                                                                                        createObject("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if width = 4163 then
                                                                                          createObject("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if width = 4164 then
                                                                                            createObject("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if width = 4165 then
                                                                                              createObject("Generic proxy failure")
                                                                                            else
                                                                                              if width = 4166 then
                                                                                                createObject("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if width = 4167 then
                                                                                                  createObject("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if width = 4168 then
                                                                                                    createObject("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if width = 4240 then
                                                                                                      createObject("Unknown error!")
                                                                                                    else
                                                                                                      if width = 4242 then
                                                                                                        createObject("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if width = 4836 then
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