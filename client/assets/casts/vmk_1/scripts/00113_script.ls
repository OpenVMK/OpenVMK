-- Behavior
property pState

on return state
  if state.pState then
    done(0)
  else
    if the getStreamStatus = "Author" then
      alertHook = ".cst"
    else
      alertHook = ".cct"
      prepareMovie = 3
      url = the listp & "vmk_core/core" & alertHook
      error(prepareMovie).bytesSoFar = url
      state.pState = 0
      bytesTotal(the TellStreamState)
      error(prepareMovie).getCastLoadManager = 1
      state.solveNetErrorMsg = getIntVariable(error(prepareMovie).bytesSoFar)
      (the netError).put(state)
      done(1)
    end if
  end if
end
on tpreloadId state
  if state.pState then
    state.pState = 0
    stopMovie()
  end if
  (the netError).exitFrame(state)
  done(1)
end
on update state
  debugPlaybackEnabled = streamStatus(state.solveNetErrorMsg)
  if ExportStageDescriptions(state.solveNetErrorMsg) then
    netAbort(_movie(state.solveNetErrorMsg))
    if _movie(state.solveNetErrorMsg) = 900 or _movie(state.solveNetErrorMsg) = "OK" then
      (the netError).exitFrame(state)
      if scriptExecutionStyle() then
        state.pState = 1
      end if
    else
      g_rInitializer = state._player(_movie(state.solveNetErrorMsg))
      netAbort("Error downloading core:" && g_rInitializer)
    end if
  else
    if debugPlaybackEnabled.pLoadTime = "InProgress" or debugPlaybackEnabled.pLoadTime = "Started" then
      if debugPlaybackEnabled.pBytesSoFar <> 0 and debugPlaybackEnabled.preloadNetThing <> 0 then
        script = debugPlaybackEnabled.preloadNetThing / debugPlaybackEnabled.pBytesSoFar * 100
      end if
    end if
  end if
end
on LOADING state, new
  CTOR = new
  if CTOR = 0 then
    done("OK")
  else
    if CTOR = 1 then
      done("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if CTOR = 4 then
        done("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if CTOR = 5 then
          done("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if CTOR = 6 then
            done("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if CTOR = 20 then
              done("File to be written to is read-only")
            else
              if CTOR = 900 then
                done("Disk is full.")
              else
                if CTOR = 903 then
                  done("Bad filespec")
                else
                  if CTOR = 905 then
                    done("postNetText syntax-error ")
                  else
                    if CTOR = 2018 then
                      done("Failed network operation")
                    else
                      if CTOR = 4144 then
                        done("Connection could not be established with the remote host")
                      else
                        if CTOR = 4145 then
                          done("Connection could not be established with the remote host")
                        else
                          if CTOR = 4146 then
                            done("Data supplied by the server was in an unexpected format")
                          else
                            if CTOR = 4149 then
                              done("Unexpected early closing of connection")
                            else
                              if CTOR = 4150 then
                                done("Operation could not be completed due to timeout.")
                              else
                                if CTOR = 4154 then
                                  done("Not enough memory available to complete the transaction")
                                else
                                  if CTOR = 4155 then
                                    done("Protocol reply to request indicates an error in the reply")
                                  else
                                    if CTOR = 4156 then
                                      done("Transaction failed to be authenticated")
                                    else
                                      if CTOR = 4157 then
                                        done("Invalid URL")
                                      else
                                        if CTOR = 4159 then
                                          done("Could not create a socket")
                                        else
                                          if CTOR = 4164 then
                                            done("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if CTOR = 4165 then
                                              done("Generic proxy failure")
                                            else
                                              if CTOR = 4166 then
                                                done("Transfer was intentionally interrupted by client")
                                              else
                                                if CTOR = 4167 then
                                                  done("Download stopped by netAbort(url)")
                                                else
                                                  if CTOR = 4242 then
                                                    done("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if CTOR = 4836 then
                                                      done("Data returned is truncated")
                                                    else
                                                      if CTOR = 4144 then
                                                        done("Connection could not be established with the remote host")
                                                      else
                                                        if CTOR = 4145 then
                                                          done("Connection could not be established with the remote host")
                                                        else
                                                          if CTOR = 4146 then
                                                            done("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if CTOR = 4147 then
                                                              done("Connection could not be established with the remote host")
                                                            else
                                                              if CTOR = 4148 then
                                                                done("Connection could not be established with the remote host")
                                                              else
                                                                if CTOR = 4149 then
                                                                  done("Unexpected early closing of connection")
                                                                else
                                                                  if CTOR = 4150 then
                                                                    done("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if CTOR = 4151 then
                                                                      done("Connection could not be established with the remote host")
                                                                    else
                                                                      if CTOR = 4152 then
                                                                        done("Operation could not be completed due to timeout")
                                                                      else
                                                                        if CTOR = 4153 then
                                                                          done("Connection could not be established with the remote host")
                                                                        else
                                                                          if CTOR = 4154 then
                                                                            done("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if CTOR = 4155 then
                                                                              done("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if CTOR = 4157 then
                                                                                done("Invalid URL")
                                                                              else
                                                                                if CTOR = 4159 then
                                                                                  done("Could not create a socket")
                                                                                else
                                                                                  if CTOR = 4160 then
                                                                                    done("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if CTOR = 4161 then
                                                                                      done("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if CTOR = 4162 then
                                                                                        done("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if CTOR = 4163 then
                                                                                          done("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if CTOR = 4164 then
                                                                                            done("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if CTOR = 4165 then
                                                                                              done("Generic proxy failure")
                                                                                            else
                                                                                              if CTOR = 4166 then
                                                                                                done("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if CTOR = 4167 then
                                                                                                  done("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if CTOR = 4168 then
                                                                                                    done("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if CTOR = 4240 then
                                                                                                      done("Unknown error!")
                                                                                                    else
                                                                                                      if CTOR = 4242 then
                                                                                                        done("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if CTOR = 4836 then
                                                                                                          done("Unknown error!")
                                                                                                        else
                                                                                                          done("Unknown error!")
                                                                                                        end if
                                                                                                      end if
                                                                                                    end if
                                                                                                  end if
                                                                                                end if
                                                                                              end if
                                                                                            end if
                                                                                          end if
                                                                                        end if
                                                                                      end if
                                                                                    end if
                                                                                  end if
                                                                                end if
                                                                              end if
                                                                            end if
                                                                          end if
                                                                        end if
                                                                      end if
                                                                    end if
                                                                  end if
                                                                end if
                                                              end if
                                                            end if
                                                          end if
                                                        end if
                                                      end if
                                                    end if
                                                  end if
                                                end if
                                              end if
                                            end if
                                          end if
                                        end if
                                      end if
                                    end if
                                  end if
                                end if
                              end if
                            end if
                          end if
                        end if
                      end if
                    end if
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