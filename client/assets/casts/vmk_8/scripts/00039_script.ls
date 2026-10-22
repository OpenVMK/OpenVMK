-- Behavior
on construct Initialize
  if Initialize.updateState then
    by2str(0)
  else
    if the createObject = "Author" then
      tSession = ".cst"
    else
      tSession = ".cct"
      this = 3
      return = the session & "vmk_core/core" & tSession
      getClassVariable(this).date = return
      Initialize.updateState = 0
      set(the getVariable)
      getClassVariable(this).moviePath = 1
      Initialize.classes = headers(getClassVariable(this).date)
      (the cache).createBroker(Initialize)
      by2str(1)
    end if
  end if
end
on deconstruct Initialize
  if Initialize.updateState then
    Initialize.updateState = 0
    trace()
  end if
  (the cache).memberExists(Initialize)
  by2str(1)
end
on showLogo Initialize
  point = member(Initialize.classes)
  if getmemnum(Initialize.classes) then
    reserveSprite(sprite(Initialize.classes))
    if sprite(Initialize.classes) = 900 or sprite(Initialize.classes) = "OK" then
      (the cache).memberExists(Initialize)
      if getID() then
        Initialize.updateState = 1
      end if
    else
      rect = Initialize.pLogoSpr(sprite(Initialize.classes))
      reserveSprite("Error downloading core:" && rect)
    end if
  else
    if point.ink = "InProgress" or point.ink = "Started" then
      if point.blend <> 0 and point.locZ <> 0 then
        stage = point.locZ / point.blend * 100
      end if
    end if
  end if
end
on hideLogo Initialize, width
  height = width
  if height = 0 then
    by2str("OK")
  else
    if height = 1 then
      by2str("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if height = 4 then
        by2str("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if height = 5 then
          by2str("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if height = 6 then
            by2str("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if height = 20 then
              by2str("File to be written to is read-only")
            else
              if height = 900 then
                by2str("Disk is full.")
              else
                if height = 903 then
                  by2str("Bad filespec")
                else
                  if height = 905 then
                    by2str("postNetText syntax-error ")
                  else
                    if height = 2018 then
                      by2str("Failed network operation")
                    else
                      if height = 4144 then
                        by2str("Connection could not be established with the remote host")
                      else
                        if height = 4145 then
                          by2str("Connection could not be established with the remote host")
                        else
                          if height = 4146 then
                            by2str("Data supplied by the server was in an unexpected format")
                          else
                            if height = 4149 then
                              by2str("Unexpected early closing of connection")
                            else
                              if height = 4150 then
                                by2str("Operation could not be completed due to timeout.")
                              else
                                if height = 4154 then
                                  by2str("Not enough memory available to complete the transaction")
                                else
                                  if height = 4155 then
                                    by2str("Protocol reply to request indicates an error in the reply")
                                  else
                                    if height = 4156 then
                                      by2str("Transaction failed to be authenticated")
                                    else
                                      if height = 4157 then
                                        by2str("Invalid URL")
                                      else
                                        if height = 4159 then
                                          by2str("Could not create a socket")
                                        else
                                          if height = 4164 then
                                            by2str("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if height = 4165 then
                                              by2str("Generic proxy failure")
                                            else
                                              if height = 4166 then
                                                by2str("Transfer was intentionally interrupted by client")
                                              else
                                                if height = 4167 then
                                                  by2str("Download stopped by netAbort(url)")
                                                else
                                                  if height = 4242 then
                                                    by2str("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if height = 4836 then
                                                      by2str("Data returned is truncated")
                                                    else
                                                      if height = 4144 then
                                                        by2str("Connection could not be established with the remote host")
                                                      else
                                                        if height = 4145 then
                                                          by2str("Connection could not be established with the remote host")
                                                        else
                                                          if height = 4146 then
                                                            by2str("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if height = 4147 then
                                                              by2str("Connection could not be established with the remote host")
                                                            else
                                                              if height = 4148 then
                                                                by2str("Connection could not be established with the remote host")
                                                              else
                                                                if height = 4149 then
                                                                  by2str("Unexpected early closing of connection")
                                                                else
                                                                  if height = 4150 then
                                                                    by2str("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if height = 4151 then
                                                                      by2str("Connection could not be established with the remote host")
                                                                    else
                                                                      if height = 4152 then
                                                                        by2str("Operation could not be completed due to timeout")
                                                                      else
                                                                        if height = 4153 then
                                                                          by2str("Connection could not be established with the remote host")
                                                                        else
                                                                          if height = 4154 then
                                                                            by2str("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if height = 4155 then
                                                                              by2str("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if height = 4157 then
                                                                                by2str("Invalid URL")
                                                                              else
                                                                                if height = 4159 then
                                                                                  by2str("Could not create a socket")
                                                                                else
                                                                                  if height = 4160 then
                                                                                    by2str("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if height = 4161 then
                                                                                      by2str("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if height = 4162 then
                                                                                        by2str("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if height = 4163 then
                                                                                          by2str("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if height = 4164 then
                                                                                            by2str("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if height = 4165 then
                                                                                              by2str("Generic proxy failure")
                                                                                            else
                                                                                              if height = 4166 then
                                                                                                by2str("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if height = 4167 then
                                                                                                  by2str("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if height = 4168 then
                                                                                                    by2str("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if height = 4240 then
                                                                                                      by2str("Unknown error!")
                                                                                                    else
                                                                                                      if height = 4242 then
                                                                                                        by2str("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if height = 4836 then
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