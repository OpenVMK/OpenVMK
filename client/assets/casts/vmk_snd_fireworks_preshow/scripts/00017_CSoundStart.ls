-- Script
on construct this
  executeMessage("LoadRoomSound", "fireworks_preshow_")
  return 1
end
on deconstruct this
  executeMessage("StopRoomSound")
  return 1
end