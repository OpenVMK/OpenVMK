-- Script
on construct this
  executeMessage("LoadRoomSound", "pirates_preshow_")
  return 1
end
on deconstruct this
  executeMessage("StopRoomSound")
  return 1
end