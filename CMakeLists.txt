cmake_minimum_required(VERSION 3.5)
project(sokol-canvas-example-1154)

set(CMAKE_C_STANDARD 11)
set(CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake")

find_package(sokol REQUIRED)

add_executable(${PROJECT_NAME} main.c)
target_link_libraries(${PROJECT_NAME} sokol)

if (EMSCRIPTEN)
  target_link_options(${PROJECT_NAME} PUBLIC -sSINGLE_FILE -sUSE_WEBGL2=1 -sNO_FILESYSTEM=1)
  math(EXPR INITIAL_MEM "1024 * 64 * 750" OUTPUT_FORMAT DECIMAL)
  set(INITIAL_MEM -sINITIAL_MEMORY=${INITIAL_MEM})
  target_link_options(${PROJECT_NAME} PUBLIC ${INITIAL_MEM})
  set(CMAKE_EXECUTABLE_SUFFIX ".mjs")
  add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
    COMMAND "${CMAKE_COMMAND}" -E copy
       "$<TARGET_FILE:${PROJECT_NAME}>"
       "${PROJECT_SOURCE_DIR}/docs/$<TARGET_FILE_NAME:${PROJECT_NAME}>")
endif()