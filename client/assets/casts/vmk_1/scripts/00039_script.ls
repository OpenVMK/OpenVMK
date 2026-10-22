-- Behavior
on define pLoadTime
  if pLoadTime.pURL then
    pGroupId(0)
  else
    if the ptryCount = "Author" then
      LOADING = ".cst"
    else
      LOADING = ".cct"
      pPercent = 3
      pBytesSoFar = the return & "vmk_core/core" & LOADING
      tURL(pPercent).me = pBytesSoFar
      pLoadTime.pURL = 0
      tpreloadId(the tFile)
      tURL(pPercent).milliSeconds = 1
      pLoadTime.pNetId = voidp(tURL(pPercent).me)
      (the netAbort).preloadNetThing(pLoadTime)
      pGroupId(1)
    end if
  end if
end
on Activate pLoadTime
  if pLoadTime.pURL then
    pLoadTime.pURL = 0
    pState()
  end if
  (the netAbort).done(pLoadTime)
  pGroupId(1)
end
on update pLoadTime
  netError = getStreamStatus(pLoadTime.pNetId)
  if listp(pLoadTime.pNetId) then
    bytesSoFar(error(pLoadTime.pNetId))
    if error(pLoadTime.pNetId) = 900 or error(pLoadTime.pNetId) = "OK" then
      (the netAbort).done(pLoadTime)
      if bytesTotal() then
        pLoadTime.pURL = 1
      end if
    else
      state = pLoadTime.TellStreamState(error(pLoadTime.pNetId))
      bytesSoFar("Error downloading core:" && state)
    end if
  else
    if netError.getCastLoadManager = "InProgress" or netError.getCastLoadManager = "Started" then
      if netError.getIntVariable <> 0 and netError.solveNetErrorMsg <> 0 then
        put = netError.solveNetErrorMsg / netError.getIntVariable * 100
      end if
    end if
  end if
end
on pFile pLoadTime, url
  prepareMovie = url
  if prepareMovie = 0 then
    pGroupId("OK")
  else
    if prepareMovie = 1 then
      pGroupId("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if prepareMovie = 4 then
        pGroupId("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if prepareMovie = 5 then
          pGroupId("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if prepareMovie = 6 then
            pGroupId("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if prepareMovie = 20 then
              pGroupId("File to be written to is read-only")
            else
              if prepareMovie = 900 then
                pGroupId("Disk is full.")
              else
                if prepareMovie = 903 then
                  pGroupId("Bad filespec")
                else
                  if prepareMovie = 905 then
                    pGroupId("postNetText syntax-error ")
                  else
                    if prepareMovie = 2018 then
                      pGroupId("Failed network operation")
                    else
                      if prepareMovie = 4144 then
                        pGroupId("Connection could not be established with the remote host")
                      else
                        if prepareMovie = 4145 then
                          pGroupId("Connection could not be established with the remote host")
                        else
                          if prepareMovie = 4146 then
                            pGroupId("Data supplied by the server was in an unexpected format")
                          else
                            if prepareMovie = 4149 then
                              pGroupId("Unexpected early closing of connection")
                            else
                              if prepareMovie = 4150 then
                                pGroupId("Operation could not be completed due to timeout.")
                              else
                                if prepareMovie = 4154 then
                                  pGroupId("Not enough memory available to complete the transaction")
                                else
                                  if prepareMovie = 4155 then
                                    pGroupId("Protocol reply to request indicates an error in the reply")
                                  else
                                    if prepareMovie = 4156 then
                                      pGroupId("Transaction failed to be authenticated")
                                    else
                                      if prepareMovie = 4157 then
                                        pGroupId("Invalid URL")
                                      else
                                        if prepareMovie = 4159 then
                                          pGroupId("Could not create a socket")
                                        else
                                          if prepareMovie = 4164 then
                                            pGroupId("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if prepareMovie = 4165 then
                                              pGroupId("Generic proxy failure")
                                            else
                                              if prepareMovie = 4166 then
                                                pGroupId("Transfer was intentionally interrupted by client")
                                              else
                                                if prepareMovie = 4167 then
                                                  pGroupId("Download stopped by netAbort(url)")
                                                else
                                                  if prepareMovie = 4242 then
                                                    pGroupId("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if prepareMovie = 4836 then
                                                      pGroupId("Data returned is truncated")
                                                    else
                                                      if prepareMovie = 4144 then
                                                        pGroupId("Connection could not be established with the remote host")
                                                      else
                                                        if prepareMovie = 4145 then
                                                          pGroupId("Connection could not be established with the remote host")
                                                        else
                                                          if prepareMovie = 4146 then
                                                            pGroupId("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if prepareMovie = 4147 then
                                                              pGroupId("Connection could not be established with the remote host")
                                                            else
                                                              if prepareMovie = 4148 then
                                                                pGroupId("Connection could not be established with the remote host")
                                                              else
                                                                if prepareMovie = 4149 then
                                                                  pGroupId("Unexpected early closing of connection")
                                                                else
                                                                  if prepareMovie = 4150 then
                                                                    pGroupId("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if prepareMovie = 4151 then
                                                                      pGroupId("Connection could not be established with the remote host")
                                                                    else
                                                                      if prepareMovie = 4152 then
                                                                        pGroupId("Operation could not be completed due to timeout")
                                                                      else
                                                                        if prepareMovie = 4153 then
                                                                          pGroupId("Connection could not be established with the remote host")
                                                                        else
                                                                          if prepareMovie = 4154 then
                                                                            pGroupId("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if prepareMovie = 4155 then
                                                                              pGroupId("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if prepareMovie = 4157 then
                                                                                pGroupId("Invalid URL")
                                                                              else
                                                                                if prepareMovie = 4159 then
                                                                                  pGroupId("Could not create a socket")
                                                                                else
                                                                                  if prepareMovie = 4160 then
                                                                                    pGroupId("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if prepareMovie = 4161 then
                                                                                      pGroupId("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if prepareMovie = 4162 then
                                                                                        pGroupId("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if prepareMovie = 4163 then
                                                                                          pGroupId("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if prepareMovie = 4164 then
                                                                                            pGroupId("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if prepareMovie = 4165 then
                                                                                              pGroupId("Generic proxy failure")
                                                                                            else
                                                                                              if prepareMovie = 4166 then
                                                                                                pGroupId("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if prepareMovie = 4167 then
                                                                                                  pGroupId("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if prepareMovie = 4168 then
                                                                                                    pGroupId("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if prepareMovie = 4240 then
                                                                                                      pGroupId("Unknown error!")
                                                                                                    else
                                                                                                      if prepareMovie = 4242 then
                                                                                                        pGroupId("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if prepareMovie = 4836 then
                                                                                                          pGroupId("Unknown error!")
                                                                                                        else
                                                                                                          pGroupId("Unknown error!")
                                                                                                        end if
                                                                                                      end if
                                                                                                    end if
                                                                                                  end if
                                                                                                end if
                                                                                              end if
                                                                                            end if
                                                                                          end if
                                                                                        end if
                                                                                      end if
                                                                                    end if
                                                                                  end if
                                                                                end if
                                                                              end if
                                                                            end if
                                                                          end if
                                                                        end if
                                                                      end if
                                                                    end if
                                                                  end if
                                                                end if
                                                              end if
                                                            end if
                                                          end if
                                                        end if
                                                      end if
                                                    end if
                                                  end if
                                                end if
                                              end if
                                            end if
                                          end if
                                        end if
                                      end if
                                    end if
                                  end if
                                end if
                              end if
                            end if
                          end if
                        end if
                      end if
                    end if
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