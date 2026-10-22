-- Behavior
on construct Initialize
  if Initialize.updateState then
    by2str(0)
  else
    if the createObject = "Author" then
      this = ".cst"
    else
      this = ".cct"
      return = 3
      cTC = the session & "vmk_core/core" & this
      getClassVariable(return).date = cTC
      Initialize.updateState = 0
      set(the getVariable)
      getClassVariable(return).moviePath = 1
      Initialize.classes = headers(getClassVariable(return).date)
      (the cache).createBroker(Initialize)
      by2str(1)
    end if
  end if
end
on deconstruct Initialize
  if Initialize.updateState then
    Initialize.updateState = 0
    tSession()
  end if
  (the cache).trace(Initialize)
  by2str(1)
end
on showLogo Initialize
  locZ = memberExists(Initialize.classes)
  if member(Initialize.classes) then
    sprite(getmemnum(Initialize.classes))
    if getmemnum(Initialize.classes) = 900 or getmemnum(Initialize.classes) = "OK" then
      (the cache).trace(Initialize)
      if reserveSprite() then
        Initialize.updateState = 1
      end if
    else
      stage = Initialize.getID(getmemnum(Initialize.classes))
      sprite("Error downloading core:" && stage)
    end if
  else
    if locZ.pLogoSpr = "InProgress" or locZ.pLogoSpr = "Started" then
      if locZ.ink <> 0 and locZ.blend <> 0 then
        point = locZ.blend / locZ.ink * 100
      end if
    end if
  end if
end
on hideLogo Initialize, rect
  width = rect
  if width = 0 then
    by2str("OK")
  else
    if width = 1 then
      by2str("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if width = 4 then
        by2str("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if width = 5 then
          by2str("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if width = 6 then
            by2str("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if width = 20 then
              by2str("File to be written to is read-only")
            else
              if width = 900 then
                by2str("Disk is full.")
              else
                if width = 903 then
                  by2str("Bad filespec")
                else
                  if width = 905 then
                    by2str("postNetText syntax-error ")
                  else
                    if width = 2018 then
                      by2str("Failed network operation")
                    else
                      if width = 4144 then
                        by2str("Connection could not be established with the remote host")
                      else
                        if width = 4145 then
                          by2str("Connection could not be established with the remote host")
                        else
                          if width = 4146 then
                            by2str("Data supplied by the server was in an unexpected format")
                          else
                            if width = 4149 then
                              by2str("Unexpected early closing of connection")
                            else
                              if width = 4150 then
                                by2str("Operation could not be completed due to timeout.")
                              else
                                if width = 4154 then
                                  by2str("Not enough memory available to complete the transaction")
                                else
                                  if width = 4155 then
                                    by2str("Protocol reply to request indicates an error in the reply")
                                  else
                                    if width = 4156 then
                                      by2str("Transaction failed to be authenticated")
                                    else
                                      if width = 4157 then
                                        by2str("Invalid URL")
                                      else
                                        if width = 4159 then
                                          by2str("Could not create a socket")
                                        else
                                          if width = 4164 then
                                            by2str("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if width = 4165 then
                                              by2str("Generic proxy failure")
                                            else
                                              if width = 4166 then
                                                by2str("Transfer was intentionally interrupted by client")
                                              else
                                                if width = 4167 then
                                                  by2str("Download stopped by netAbort(url)")
                                                else
                                                  if width = 4242 then
                                                    by2str("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if width = 4836 then
                                                      by2str("Data returned is truncated")
                                                    else
                                                      if width = 4144 then
                                                        by2str("Connection could not be established with the remote host")
                                                      else
                                                        if width = 4145 then
                                                          by2str("Connection could not be established with the remote host")
                                                        else
                                                          if width = 4146 then
                                                            by2str("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if width = 4147 then
                                                              by2str("Connection could not be established with the remote host")
                                                            else
                                                              if width = 4148 then
                                                                by2str("Connection could not be established with the remote host")
                                                              else
                                                                if width = 4149 then
                                                                  by2str("Unexpected early closing of connection")
                                                                else
                                                                  if width = 4150 then
                                                                    by2str("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if width = 4151 then
                                                                      by2str("Connection could not be established with the remote host")
                                                                    else
                                                                      if width = 4152 then
                                                                        by2str("Operation could not be completed due to timeout")
                                                                      else
                                                                        if width = 4153 then
                                                                          by2str("Connection could not be established with the remote host")
                                                                        else
                                                                          if width = 4154 then
                                                                            by2str("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if width = 4155 then
                                                                              by2str("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if width = 4157 then
                                                                                by2str("Invalid URL")
                                                                              else
                                                                                if width = 4159 then
                                                                                  by2str("Could not create a socket")
                                                                                else
                                                                                  if width = 4160 then
                                                                                    by2str("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if width = 4161 then
                                                                                      by2str("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if width = 4162 then
                                                                                        by2str("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if width = 4163 then
                                                                                          by2str("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if width = 4164 then
                                                                                            by2str("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if width = 4165 then
                                                                                              by2str("Generic proxy failure")
                                                                                            else
                                                                                              if width = 4166 then
                                                                                                by2str("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if width = 4167 then
                                                                                                  by2str("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if width = 4168 then
                                                                                                    by2str("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if width = 4240 then
                                                                                                      by2str("Unknown error!")
                                                                                                    else
                                                                                                      if width = 4242 then
                                                                                                        by2str("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if width = 4836 then
                                                                                                          by2str("Unknown error!")
                                                                                                        else
                                                                                                          by2str("Unknown error!")
                                                                                                        end if
                                                                                                      end if
                                                                                                    end if
                                                                                                  end if
                                                                                                end if
                                                                                              end if
                                                                                            end if
                                                                                          end if
                                                                                        end if
                                                                                      end if
                                                                                    end if
                                                                                  end if
                                                                                end if
                                                                              end if
                                                                            end if
                                                                          end if
                                                                        end if
                                                                      end if
                                                                    end if
                                                                  end if
                                                                end if
                                                              end if
                                                            end if
                                                          end if
                                                        end if
                                                      end if
                                                    end if
                                                  end if
                                                end if
                                              end if
                                            end if
                                          end if
                                        end if
                                      end if
                                    end if
                                  end if
                                end if
                              end if
                            end if
                          end if
                        end if
                      end if
                    end if
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