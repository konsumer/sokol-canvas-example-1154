include_directories(${CMAKE_SOURCE_DIR} ${CMAKE_SOURCE_DIR}/sokol)

# TODO: this is just defines for platform. Could it also be done in cmake?
add_library(sokol STATIC ${CMAKE_SOURCE_DIR}/sokol/sokol.c)

if(CMAKE_SYSTEM_NAME STREQUAL Darwin)
  # compile sokol.c as Objective-C
  target_compile_options(sokol PRIVATE -x objective-c)
  target_link_libraries(sokol
        "-framework QuartzCore"
        "-framework Cocoa"
        "-framework MetalKit"
        "-framework Metal"
        "-framework OpenGL"
        "-framework AudioToolbox")
else()
  if (CMAKE_SYSTEM_NAME STREQUAL Linux)
    target_link_libraries(sokol INTERFACE X11 Xi Xcursor GL asound dl m)
    # target_link_libraries(sokol PUBLIC Threads::Threads)
  endif()
endif()