-- Behavior
on CreateDownloadManager
  return createManager(#download_manager, GetClsVariable("download.manager.class"))
end
on RemoveDownloadManager
  return removeManager(#download_manager)
end
on getDownloadManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#download_manager) then
    return t_rMgr.getManager(#download_manager)
  else
    return CreateDownloadManager()
  end if
end
on queueDownload tURL, tMemName, tFileType, tForceFlag
  return getDownloadManager().queue(tURL, tMemName, tFileType, tForceFlag)
end
on abortDownLoad tMemNameOrNum
  return getDownloadManager().abort(tMemNameOrNum)
end
on registerDownloadCallback tMemNameOrNum, tMethod, tClientID, tArgument
  return getDownloadManager().registerCallback(tMemNameOrNum, tMethod, tClientID, tArgument)
end
on getDownLoadPercent tID
  return getDownloadManager().getLoadPercent(tID)
end
on downloadExists tID
  return getDownloadManager().exists(tID)
end
on printDownloads
  return getDownloadManager().print()
end