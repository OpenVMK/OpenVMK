-- Script
property pGroupId
property pNetId
global pURL

on define pLoadTime
  pURL = 0
  if pLoadTime.pGroupId then
    ptryCount(0)
  else
    pBytesSoFar = ".cct"
    pPercent = 3
    LOADING = the return & "vmk_core/core" & pBytesSoFar
    tURL(pPercent).me = 1
    tURL(pPercent).tpreloadId = LOADING
    pLoadTime.pGroupId = 0
    tFile(the milliSeconds)
    pLoadTime.pNetId = voidp(the return & "vmk_core/core" & pBytesSoFar)
    (the netAbort).preloadNetThing(pLoadTime)
    ptryCount(1)
  end if
end
on Activate pLoadTime
  if pLoadTime.pGroupId then
    pLoadTime.pGroupId = 0
    pState()
  end if
  (the netAbort).done(pLoadTime)
  ptryCount(1)
end
on update pLoadTime
  netError = getStreamStatus(pLoadTime.pNetId)
  if listp(pLoadTime.pNetId) then
    bytesSoFar(error(pLoadTime.pNetId))
    if error(pLoadTime.pNetId) = 900 or error(pLoadTime.pNetId) = "OK" then
      (the netAbort).done(pLoadTime)
      tURL(3).tpreloadId = the return & "vmk_core/core" & ".cct"
      if bytesTotal() then
        pLoadTime.pGroupId = 1
      end if
    else
      put = pLoadTime.TellStreamState(error(pLoadTime.pNetId))
      bytesSoFar("Error downloading core:" && put)
    end if
  else
    if netError.getCastLoadManager = "InProgress" or netError.getCastLoadManager = "Started" then
      if netError.getIntVariable <> 0 and netError.solveNetErrorMsg <> 0 then
        state = netError.solveNetErrorMsg / netError.getIntVariable * 100
      end if
    end if
  end if
end
on pFile pLoadTime, url
  prepareMovie = url
  if prepareMovie = 0 then
    ptryCount("OK")
  else
    if prepareMovie = 1 then
      ptryCount("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if prepareMovie = 4 then
        ptryCount("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if prepareMovie = 5 then
          ptryCount("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if prepareMovie = 6 then
            ptryCount("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if prepareMovie = 20 then
              ptryCount("File to be written to is read-only")
            else
              if prepareMovie = 900 then
                ptryCount("Disk is full.")
              else
                if prepareMovie = 903 then
                  ptryCount("Bad filespec")
                else
                  if prepareMovie = 905 then
                    ptryCount("postNetText syntax-error ")
                  else
                    if prepareMovie = 2018 then
                      ptryCount("Failed network operation")
                    else
                      if prepareMovie = 4144 then
                        ptryCount("Connection could not be established with the remote host")
                      else
                        if prepareMovie = 4145 then
                          ptryCount("Connection could not be established with the remote host")
                        else
                          if prepareMovie = 4146 then
                            ptryCount("Data supplied by the server was in an unexpected format")
                          else
                            if prepareMovie = 4149 then
                              ptryCount("Unexpected early closing of connection")
                            else
                              if prepareMovie = 4150 then
                                ptryCount("Operation could not be completed due to timeout.")
                              else
                                if prepareMovie = 4154 then
                                  ptryCount("Not enough memory available to complete the transaction")
                                else
                                  if prepareMovie = 4155 then
                                    ptryCount("Protocol reply to request indicates an error in the reply")
                                  else
                                    if prepareMovie = 4156 then
                                      ptryCount("Transaction failed to be authenticated")
                                    else
                                      if prepareMovie = 4157 then
                                        ptryCount("Invalid URL")
                                      else
                                        if prepareMovie = 4159 then
                                          ptryCount("Could not create a socket")
                                        else
                                          if prepareMovie = 4164 then
                                            ptryCount("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if prepareMovie = 4165 then
                                              ptryCount("Generic proxy failure")
                                            else
                                              if prepareMovie = 4166 then
                                                ptryCount("Transfer was intentionally interrupted by client")
                                              else
                                                if prepareMovie = 4167 then
                                                  ptryCount("Download stopped by netAbort(url)")
                                                else
                                                  if prepareMovie = 4242 then
                                                    ptryCount("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if prepareMovie = 4836 then
                                                      ptryCount("Data returned is truncated")
                                                    else
                                                      if prepareMovie = 4144 then
                                                        ptryCount("Connection could not be established with the remote host")
                                                      else
                                                        if prepareMovie = 4145 then
                                                          ptryCount("Connection could not be established with the remote host")
                                                        else
                                                          if prepareMovie = 4146 then
                                                            ptryCount("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if prepareMovie = 4147 then
                                                              ptryCount("Connection could not be established with the remote host")
                                                            else
                                                              if prepareMovie = 4148 then
                                                                ptryCount("Connection could not be established with the remote host")
                                                              else
                                                                if prepareMovie = 4149 then
                                                                  ptryCount("Unexpected early closing of connection")
                                                                else
                                                                  if prepareMovie = 4150 then
                                                                    ptryCount("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if prepareMovie = 4151 then
                                                                      ptryCount("Connection could not be established with the remote host")
                                                                    else
                                                                      if prepareMovie = 4152 then
                                                                        ptryCount("Operation could not be completed due to timeout")
                                                                      else
                                                                        if prepareMovie = 4153 then
                                                                          ptryCount("Connection could not be established with the remote host")
                                                                        else
                                                                          if prepareMovie = 4154 then
                                                                            ptryCount("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if prepareMovie = 4155 then
                                                                              ptryCount("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if prepareMovie = 4157 then
                                                                                ptryCount("Invalid URL")
                                                                              else
                                                                                if prepareMovie = 4159 then
                                                                                  ptryCount("Could not create a socket")
                                                                                else
                                                                                  if prepareMovie = 4160 then
                                                                                    ptryCount("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if prepareMovie = 4161 then
                                                                                      ptryCount("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if prepareMovie = 4162 then
                                                                                        ptryCount("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if prepareMovie = 4163 then
                                                                                          ptryCount("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if prepareMovie = 4164 then
                                                                                            ptryCount("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if prepareMovie = 4165 then
                                                                                              ptryCount("Generic proxy failure")
                                                                                            else
                                                                                              if prepareMovie = 4166 then
                                                                                                ptryCount("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if prepareMovie = 4167 then
                                                                                                  ptryCount("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if prepareMovie = 4168 then
                                                                                                    ptryCount("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if prepareMovie = 4240 then
                                                                                                      ptryCount("Unknown error!")
                                                                                                    else
                                                                                                      if prepareMovie = 4242 then
                                                                                                        ptryCount("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if prepareMovie = 4836 then
                                                                                                          ptryCount("Unknown error!")
                                                                                                        else
                                                                                                          ptryCount("Unknown error!")
                                                                                                        end if
                                                                                                      end if
                                                                                                    end if
                                                                                                  end if
                                                                                                end if
                                                                                              end if
                                                                                            end if
                                                                                          end if
                                                                                        end if
                                                                                      end if
                                                                                    end if
                                                                                  end if
                                                                                end if
                                                                              end if
                                                                            end if
                                                                          end if
                                                                        end if
                                                                      end if
                                                                    end if
                                                                  end if
                                                                end if
                                                              end if
                                                            end if
                                                          end if
                                                        end if
                                                      end if
                                                    end if
                                                  end if
                                                end if
                                              end if
                                            end if
                                          end if
                                        end if
                                      end if
                                    end if
                                  end if
                                end if
                              end if
                            end if
                          end if
                        end if
                      end if
                    end if
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