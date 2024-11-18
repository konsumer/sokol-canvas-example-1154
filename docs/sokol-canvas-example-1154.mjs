
var Module = (() => {
  var _scriptName = import.meta.url;
  
  return (
async function(moduleArg = {}) {
  var moduleRtn;

// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = moduleArg;

// Set up the promise that indicates the Module is initialized
var readyPromiseResolve, readyPromiseReject;
var readyPromise = new Promise((resolve, reject) => {
  readyPromiseResolve = resolve;
  readyPromiseReject = reject;
});
["_memory","___indirect_function_table","__sapp_emsc_onpaste","__sapp_html5_get_ask_leave_site","__sapp_emsc_begin_drop","__sapp_emsc_drop","__sapp_emsc_end_drop","__sapp_emsc_invoke_fetch_cb","__dk_grab_canvas","___em_lib_deps_sokol_app","_sapp_js_add_beforeunload_listener","_sapp_js_remove_beforeunload_listener","_sapp_js_add_clipboard_listener","_sapp_js_remove_clipboard_listener","_sapp_js_write_clipboard","_sapp_js_add_dragndrop_listeners","_sapp_js_dropped_file_size","_sapp_js_fetch_dropped_file","_sapp_js_remove_dragndrop_listeners","_sapp_js_init","_sapp_js_request_pointerlock","_sapp_js_exit_pointerlock","_sapp_js_set_cursor","_sapp_js_clear_favicon","_sapp_js_set_favicon","__dk_setup_context","_slog_js_log","_main","onRuntimeInitialized"].forEach((prop) => {
  if (!Object.getOwnPropertyDescriptor(readyPromise, prop)) {
    Object.defineProperty(readyPromise, prop, {
      get: () => abort('You are getting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
      set: () => abort('You are setting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
    });
  }
});

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string' && process.type != 'renderer';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?
  const { createRequire } = await import('module');
  let dirname = import.meta.url;
  if (dirname.startsWith("data:")) {
    dirname = '/';
  }
  /** @suppress{duplicate} */
  var require = createRequire(dirname);

}

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)


// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {
  if (typeof process == 'undefined' || !process.release || process.release.name !== 'node') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split('.').slice(0, 3);
  numericVersion = (numericVersion[0] * 10000) + (numericVersion[1] * 100) + (numericVersion[2].split('-')[0] * 1);
  var minVersion = 160000;
  if (numericVersion < 160000) {
    throw new Error('This emscripten-generated code requires node v16.0.0 (detected v' + nodeVersion + ')');
  }

  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');
  var nodePath = require('path');

  // EXPORT_ES6 + ENVIRONMENT_IS_NODE always requires use of import.meta.url,
  // since there's no way getting the current absolute path of the module when
  // support for that is not available.
  if (!import.meta.url.startsWith('data:')) {
    scriptDirectory = nodePath.dirname(require('url').fileURLToPath(import.meta.url)) + '/';
  }

// include: node_shell_read.js
readBinary = (filename) => {
  // We need to re-wrap `file://` strings to URLs. Normalizing isn't
  // necessary in that case, the path should already be absolute.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  var ret = fs.readFileSync(filename);
  assert(ret.buffer);
  return ret;
};

readAsync = (filename, binary = true) => {
  // See the comment in the `readBinary` function.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return new Promise((resolve, reject) => {
    fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(binary ? data.buffer : data);
    });
  });
};
// end include: node_shell_read.js
  if (!Module['thisProgram'] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  // MODULARIZE will export the module in the proper place outside, we don't need to export here

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else
if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof importScripts == 'function') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // When MODULARIZE, this JS may be executed later, after document.currentScript
  // is gone, so we saved it, and we use it here instead of any other info.
  if (_scriptName) {
    scriptDirectory = _scriptName;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.startsWith('blob:')) {
    scriptDirectory = '';
  } else {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, '').lastIndexOf('/')+1);
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  {
// include: web_or_worker_shell_read.js
if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url) => {
    // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
    // See https://github.com/github/fetch/pull/92#issuecomment-140665932
    // Cordova or Electron apps are typically loaded from a file:// url.
    // So use XHR on webview if URL is a file URL.
    if (isFileURI(url)) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            resolve(xhr.response);
            return;
          }
          reject(xhr.status);
        };
        xhr.onerror = reject;
        xhr.send(null);
      });
    }
    return fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (response.ok) {
          return response.arrayBuffer();
        }
        return Promise.reject(new Error(response.status + ' : ' + response.url));
      })
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('asm', 'wasmExports');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');

if (typeof WebAssembly != 'object') {
  err('no native wasm support detected');
}

// include: base64Utils.js
// Converts a string of base64 into a byte array (Uint8Array).
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE != 'undefined' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }

  var decoded = atob(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0 ; i < decoded.length ; ++i) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}
// end include: base64Utils.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.
function _free() {
  // Show a helpful error since we used to include free by default in the past.
  abort('free() called but not included in the build - add `_free` to EXPORTED_FUNCTIONS');
}

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

// include: runtime_shared.js
function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
}

// end include: runtime_shared.js
assert(!Module['STACK_SIZE'], 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')

assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
assert(!Module['INITIAL_MEMORY'], 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

function preRun() {
  var preRuns = Module['preRun'];
  if (preRuns) {
    if (typeof preRuns == 'function') preRuns = [preRuns];
    preRuns.forEach(addOnPreRun);
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  
  callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {
  checkStackCookie();

  var postRuns = Module['postRun'];
  if (postRuns) {
    if (typeof postRuns == 'function') postRuns = [postRuns];
    postRuns.forEach(addOnPostRun);
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  readyPromiseReject(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// show errors on likely calls to FS when it was not included
var FS = {
  error() {
    abort('Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM');
  },
  init() { FS.error() },
  createDataFile() { FS.error() },
  createPreloadedFile() { FS.error() },
  createLazyFile() { FS.error() },
  open() { FS.error() },
  mkdev() { FS.error() },
  registerDevice() { FS.error() },
  analyzePath() { FS.error() },

  ErrnoError() { FS.error() },
};
Module['FS_createDataFile'] = FS.createDataFile;
Module['FS_createPreloadedFile'] = FS.createPreloadedFile;

// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */
var isDataURI = (filename) => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');
// end include: URIUtils.js
function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

// include: runtime_exceptions.js
// end include: runtime_exceptions.js
function findWasmBinary() {
    var f = 'data:application/octet-stream;base64,AGFzbQEAAAABrQEaYAF/AGABfwF/YAAAYAJ/fwBgAn9/AX9gAAF/YAN/f38Bf2AFf39/f38Bf2AEf39/fwBgA39/fwBgB39/f39/f38AYAJ/fABgAAF8YAR/f39/AX9gBH19fX0AYAJ9fQBgBH9/fX8AYAZ/f39/f38AYAV/f39/fwBgCn9/f39/f39/f38AYAh/f39/f39/fwBgAnx/AX9gAn5+AX9gAX8BfGABfQF9YAN/fn8BfgLFGnMDZW52DV9fYXNzZXJ0X2ZhaWwACANlbnYMc2FwcF9qc19pbml0AAADZW52H2Vtc2NyaXB0ZW5fZ2V0X2VsZW1lbnRfY3NzX3NpemUABgNlbnYoZW1zY3JpcHRlbl9zZXRfcmVzaXplX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiFlbXNjcmlwdGVuX2dldF9kZXZpY2VfcGl4ZWxfcmF0aW8ADANlbnYiZW1zY3JpcHRlbl9zZXRfY2FudmFzX2VsZW1lbnRfc2l6ZQAGA2VudhhlbXNjcmlwdGVuX3NldF9tYWluX2xvb3AACQNlbnYnZW1zY3JpcHRlbl9yZXF1ZXN0X2FuaW1hdGlvbl9mcmFtZV9sb29wAAMDZW52FXNhcHBfanNfY2xlYXJfZmF2aWNvbgACA2VudhNzYXBwX2pzX3NldF9mYXZpY29uAAkDZW52C3Nsb2dfanNfbG9nAAMDZW52D19ka19ncmFiX2NhbnZhcwAAA2VudhFfZGtfc2V0dXBfY29udGV4dAANA2VudiVlbXNjcmlwdGVuX3dlYmdsX21ha2VfY29udGV4dF9jdXJyZW50AAEDZW52DWdsR2V0SW50ZWdlcnYAAwNlbnYhZW1zY3JpcHRlbl93ZWJnbF9lbmFibGVfZXh0ZW5zaW9uAAQDZW52K2Vtc2NyaXB0ZW5fc2V0X21vdXNlZG93bl9jYWxsYmFja19vbl90aHJlYWQABwNlbnYpZW1zY3JpcHRlbl9zZXRfbW91c2V1cF9jYWxsYmFja19vbl90aHJlYWQABwNlbnYrZW1zY3JpcHRlbl9zZXRfbW91c2Vtb3ZlX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudixlbXNjcmlwdGVuX3NldF9tb3VzZWVudGVyX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudixlbXNjcmlwdGVuX3NldF9tb3VzZWxlYXZlX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudidlbXNjcmlwdGVuX3NldF93aGVlbF9jYWxsYmFja19vbl90aHJlYWQABwNlbnYpZW1zY3JpcHRlbl9zZXRfa2V5ZG93bl9jYWxsYmFja19vbl90aHJlYWQABwNlbnYnZW1zY3JpcHRlbl9zZXRfa2V5dXBfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52KmVtc2NyaXB0ZW5fc2V0X2tleXByZXNzX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudixlbXNjcmlwdGVuX3NldF90b3VjaHN0YXJ0X2NhbGxiYWNrX29uX3RocmVhZAAHA2VuditlbXNjcmlwdGVuX3NldF90b3VjaG1vdmVfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52KmVtc2NyaXB0ZW5fc2V0X3RvdWNoZW5kX2NhbGxiYWNrX29uX3RocmVhZAAHA2Vudi1lbXNjcmlwdGVuX3NldF90b3VjaGNhbmNlbF9jYWxsYmFja19vbl90aHJlYWQABwNlbnYzZW1zY3JpcHRlbl9zZXRfcG9pbnRlcmxvY2tjaGFuZ2VfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52MmVtc2NyaXB0ZW5fc2V0X3BvaW50ZXJsb2NrZXJyb3JfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52J2Vtc2NyaXB0ZW5fc2V0X2ZvY3VzX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiZlbXNjcmlwdGVuX3NldF9ibHVyX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiFzYXBwX2pzX2FkZF9iZWZvcmV1bmxvYWRfbGlzdGVuZXIAAgNlbnYec2FwcF9qc19hZGRfY2xpcGJvYXJkX2xpc3RlbmVyAAIDZW52H3NhcHBfanNfYWRkX2RyYWduZHJvcF9saXN0ZW5lcnMAAANlbnYyZW1zY3JpcHRlbl9zZXRfd2ViZ2xjb250ZXh0bG9zdF9jYWxsYmFja19vbl90aHJlYWQABwNlbnY2ZW1zY3JpcHRlbl9zZXRfd2ViZ2xjb250ZXh0cmVzdG9yZWRfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52GmVtc2NyaXB0ZW5fcGVyZm9ybWFuY2Vfbm93AAwDZW52G2Vtc2NyaXB0ZW5fY2FuY2VsX21haW5fbG9vcAACA2VudhtzYXBwX2pzX3JlcXVlc3RfcG9pbnRlcmxvY2sAAgNlbnYkc2FwcF9qc19yZW1vdmVfYmVmb3JldW5sb2FkX2xpc3RlbmVyAAIDZW52IXNhcHBfanNfcmVtb3ZlX2NsaXBib2FyZF9saXN0ZW5lcgACA2VudiJzYXBwX2pzX3JlbW92ZV9kcmFnbmRyb3BfbGlzdGVuZXJzAAADZW52CmdsR2V0RXJyb3IABQNlbnYRZ2xHZW5WZXJ0ZXhBcnJheXMAAwNlbnYRZ2xCaW5kVmVydGV4QXJyYXkAAANlbnYNZ2xQaXhlbFN0b3JlaQADA2VudgxnbEdldFN0cmluZ2kABANlbnYaZ2xEaXNhYmxlVmVydGV4QXR0cmliQXJyYXkAAANlbnYIZ2xFbmFibGUAAANlbnYLZ2xEZXB0aEZ1bmMAAANlbnYLZ2xEZXB0aE1hc2sAAANlbnYJZ2xEaXNhYmxlAAADZW52DWdsU3RlbmNpbEZ1bmMACQNlbnYLZ2xTdGVuY2lsT3AACQNlbnYNZ2xTdGVuY2lsTWFzawAAA2VudhNnbEJsZW5kRnVuY1NlcGFyYXRlAAgDZW52F2dsQmxlbmRFcXVhdGlvblNlcGFyYXRlAAMDZW52DGdsQmxlbmRDb2xvcgAOA2VudgtnbENvbG9yTWFzawAIA2Vudg9nbFBvbHlnb25PZmZzZXQADwNlbnYLZ2xGcm9udEZhY2UAAANlbnYKZ2xDdWxsRmFjZQAAA2VudgxnbEJpbmRCdWZmZXIAAwNlbnYQZ2xCaW5kQnVmZmVyQmFzZQAJA2Vudg9nbEFjdGl2ZVRleHR1cmUAAANlbnYNZ2xCaW5kVGV4dHVyZQADA2Vudg1nbEJpbmRTYW1wbGVyAAMDZW52D2dsRGVsZXRlQnVmZmVycwADA2VudhBnbERlbGV0ZVRleHR1cmVzAAMDZW52FWdsRGVsZXRlUmVuZGVyYnVmZmVycwADA2VudhBnbERlbGV0ZVNhbXBsZXJzAAMDZW52D2dsRGVsZXRlUHJvZ3JhbQAAA2VudgxnbFVzZVByb2dyYW0AAANlbnYUZ2xEZWxldGVGcmFtZWJ1ZmZlcnMAAwNlbnYUZ2xEZWxldGVWZXJ0ZXhBcnJheXMAAwNlbnYMZ2xHZW5CdWZmZXJzAAMDZW52DGdsQnVmZmVyRGF0YQAIA2Vudg9nbEJ1ZmZlclN1YkRhdGEACANlbnYPZ2xDcmVhdGVQcm9ncmFtAAUDZW52DmdsQXR0YWNoU2hhZGVyAAMDZW52DWdsTGlua1Byb2dyYW0AAANlbnYOZ2xEZWxldGVTaGFkZXIAAANlbnYOZ2xHZXRQcm9ncmFtaXYACQNlbnYTZ2xHZXRQcm9ncmFtSW5mb0xvZwAIA2VudhRnbEdldFVuaWZvcm1Mb2NhdGlvbgAEA2VudgtnbFVuaWZvcm0xaQADA2Vudg5nbENyZWF0ZVNoYWRlcgABA2Vudg5nbFNoYWRlclNvdXJjZQAIA2Vudg9nbENvbXBpbGVTaGFkZXIAAANlbnYNZ2xHZXRTaGFkZXJpdgAJA2VudhJnbEdldFNoYWRlckluZm9Mb2cACANlbnYTZ2xHZXRBdHRyaWJMb2NhdGlvbgAEA2VudhFnbEJpbmRGcmFtZWJ1ZmZlcgADA2VudgpnbFZpZXdwb3J0AAgDZW52CWdsU2Npc3NvcgAIA2Vudg9nbENsZWFyQnVmZmVyZnYACQNlbnYPZ2xDbGVhckJ1ZmZlcmZpABADZW52D2dsQ2xlYXJCdWZmZXJpdgAJA2VudhVnbFN0ZW5jaWxGdW5jU2VwYXJhdGUACANlbnYTZ2xTdGVuY2lsT3BTZXBhcmF0ZQAIA2VudhVnbFZlcnRleEF0dHJpYlBvaW50ZXIAEQNlbnYVZ2xWZXJ0ZXhBdHRyaWJEaXZpc29yAAMDZW52GWdsRW5hYmxlVmVydGV4QXR0cmliQXJyYXkAAANlbnYXZ2xEcmF3RWxlbWVudHNJbnN0YW5jZWQAEgNlbnYOZ2xEcmF3RWxlbWVudHMACANlbnYVZ2xEcmF3QXJyYXlzSW5zdGFuY2VkAAgDZW52DGdsRHJhd0FycmF5cwAJA2VudgxnbFJlYWRCdWZmZXIAAANlbnYRZ2xCbGl0RnJhbWVidWZmZXIAEwNlbnYXZ2xJbnZhbGlkYXRlRnJhbWVidWZmZXIACQNlbnYJX2Fib3J0X2pzAAIDZW52FV9lbXNjcmlwdGVuX21lbWNweV9qcwAJA2VudhZlbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwAAEDrAKqAgICAgICCQIAAAEABgUAAQMFAAIDAQgJFAQAAAYCAgACFQUFBQUFAgEEAwEBDQUFBQUFBQUFBQUFBQUFAAMDAwAAAwEAAgACAgAAAAAAAAACAAAFCAUBBgUFBAQBBAQEBAQEBAQEBAMDAQMEAwMBAwQDAwEBAwYBAQEAAwEAAwIEBAEFAAABAAAAAQEBCQkJAgICAgICAgIWCgYGAAADAAYGBgYGBgYGBgsCAgICAQAAAAECAQEBAQELAgIAARcLAQEBAgIACQACAgICAgIAAAAAAAAAAAAAAAAAAAAAAAMAAAAEAQEAAwAIAQAGBgQGCAQDBAEGAQEBAQEEBAEBAQEBAQMCBgYYBAEGBgQEBgYEBAQEBAUFAQEGAAAFAgUFBQAABQIBAAEAAQUEBQFwARISBQYBAe4F7gUGuAEbfwFBgIAEC38BQQALfwFBAAt/AUEAC38AQeD4Bgt/AEGCqgcLfwBBmfoGC38AQfj7Bgt/AEHN/AYLfwBB0f4GC38AQZj/Bgt/AEH/ggcLfwBB6YwHC38AQaiOBwt/AEGClAcLfwBBiZcHC38AQf+ZBwt/AEGQmwcLfwBB3JsHC38AQdKgBwt/AEHKoQcLfwBBuaUHC38AQZioBwt/AEHg+AYLfwBBgqoHC38AQYKqBwt/AEGmqgcLB7AJKgZtZW1vcnkCABFfX3dhc21fY2FsbF9jdG9ycwBzGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBABJfc2FwcF9lbXNjX29ucGFzdGUAfR5fc2FwcF9odG1sNV9nZXRfYXNrX2xlYXZlX3NpdGUAgwEVX3NhcHBfZW1zY19iZWdpbl9kcm9wAIQBD19zYXBwX2Vtc2NfZHJvcACGARNfc2FwcF9lbXNjX2VuZF9kcm9wAIkBGl9zYXBwX2Vtc2NfaW52b2tlX2ZldGNoX2NiAIoBEF9fbWFpbl9hcmdjX2FyZ3YAiwEGbWFsbG9jAIoDGF9fZW1fanNfX19ka19ncmFiX2NhbnZhcwMEF19fZW1fbGliX2RlcHNfc29rb2xfYXBwAwUqX19lbV9qc19fc2FwcF9qc19hZGRfYmVmb3JldW5sb2FkX2xpc3RlbmVyAwYtX19lbV9qc19fc2FwcF9qc19yZW1vdmVfYmVmb3JldW5sb2FkX2xpc3RlbmVyAwcnX19lbV9qc19fc2FwcF9qc19hZGRfY2xpcGJvYXJkX2xpc3RlbmVyAwgqX19lbV9qc19fc2FwcF9qc19yZW1vdmVfY2xpcGJvYXJkX2xpc3RlbmVyAwkgX19lbV9qc19fc2FwcF9qc193cml0ZV9jbGlwYm9hcmQDCihfX2VtX2pzX19zYXBwX2pzX2FkZF9kcmFnbmRyb3BfbGlzdGVuZXJzAwsiX19lbV9qc19fc2FwcF9qc19kcm9wcGVkX2ZpbGVfc2l6ZQMMI19fZW1fanNfX3NhcHBfanNfZmV0Y2hfZHJvcHBlZF9maWxlAw0rX19lbV9qc19fc2FwcF9qc19yZW1vdmVfZHJhZ25kcm9wX2xpc3RlbmVycwMOFV9fZW1fanNfX3NhcHBfanNfaW5pdAMPJF9fZW1fanNfX3NhcHBfanNfcmVxdWVzdF9wb2ludGVybG9jawMQIV9fZW1fanNfX3NhcHBfanNfZXhpdF9wb2ludGVybG9jawMRG19fZW1fanNfX3NhcHBfanNfc2V0X2N1cnNvcgMSHl9fZW1fanNfX3NhcHBfanNfY2xlYXJfZmF2aWNvbgMTHF9fZW1fanNfX3NhcHBfanNfc2V0X2Zhdmljb24DFBpfX2VtX2pzX19fZGtfc2V0dXBfY29udGV4dAMVFF9fZW1fanNfX3Nsb2dfanNfbG9nAxYGZmZsdXNoAJkDFWVtc2NyaXB0ZW5fc3RhY2tfaW5pdACPAxllbXNjcmlwdGVuX3N0YWNrX2dldF9mcmVlAJADGWVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2Jhc2UAkQMYZW1zY3JpcHRlbl9zdGFja19nZXRfZW5kAJIDGV9lbXNjcmlwdGVuX3N0YWNrX3Jlc3RvcmUAmgMXX2Vtc2NyaXB0ZW5fc3RhY2tfYWxsb2MAmwMcZW1zY3JpcHRlbl9zdGFja19nZXRfY3VycmVudACcAw1fX3N0YXJ0X2VtX2pzAxcMX19zdG9wX2VtX2pzAxgTX19zdGFydF9lbV9saWJfZGVwcwMZEl9fc3RvcF9lbV9saWJfZGVwcwMaCSQBAEEBCxF5dHZ6iwKOAZIBkwGSApMClAKVApYClwKYApkCmgIKxdEJqgIFABCPAwuaAgElfyMAIQBB0AEhASAAIAFrIQIgAiQAQQAhAyACIAM2AgxBDCEEIAIgBGohBSAFIQZBBCEHIAYgB2ohCEH4ACEJQZysByEKIAggCiAJEPcCGkEMIQsgAiALaiEMIAwhDUH8ACEOIA0gDmohD0EAIRAgDyAQNgIAQQwhESACIBFqIRIgEiETQYABIRQgEyAUaiEVIBUQjwJBACEWIAIgFjYCyAFBACEXIAIgFzYCzAFBDCEYIAIgGGohGSAZIRogGhDsAUEAIRsgGygCqKoHIRwgHBD3AUGoqgchHUEEIR4gHSAeaiEfIB8Q+wFBACEgQQMhIUEBISIgICAhICIQ/wEQdRCCAhCFAkHQASEjIAIgI2ohJCAkJAAPCwMADwsIABB3ELcBDwsDAA8LsAEBEH8jACEDQRAhBCADIARrIQUgBSQAIAUgATYCDCAFIAI2AghBhAIhBkEAIQcgACAHIAYQ+AIaQQEhCCAAIAg2AgBBAiEJIAAgCTYCBEEDIQogACAKNgIIQQQhCyAAIAs2AgxBgAUhDCAAIAw2AiRB4AMhDSAAIA02AihBxYoGIQ4gACAONgI4QQEhDyAAIA86AFBBBSEQIAAgEDYC4AFBECERIAUgEWohEiASJAAPC/8HAnV/An4jACEAQbAHIQEgACABayECIAIkAEEAIQMgAiADNgLMBkEAIQQgAiAENgLQBkEAIQUgAiAFNgLUBkEAIQYgAiAGNgLYBkEAIQcgAiAHNgLcBkEAIQggAiAINgLgBkEAIQkgAiAJNgLkBkEAIQogAiAKNgLoBkEAIQsgAiALNgLsBkEAIQwgAiAMOgDwBkEAIQ0gAiANOgDxBkEAIQ4gAiAOOgDyBkEAIQ8gAiAPOgDzBkEAIRAgAiAQOgD0BkHMBiERIAIgEWohEiASIRNBKSEUIBMgFGohFUEAIRYgFSAWOwAAQQIhFyAVIBdqIRggGCAWOgAAQQAhGSACIBk2AvgGQcwGIRogAiAaaiEbIBshHEEwIR0gHCAdaiEeQgAhdSAeIHU3AgBBCCEfIB4gH2ohIEEAISEgICAhNgIAQQUhIiACICI2AogHQQAhIyACICM2AowHQcwGISQgAiAkaiElICUhJkHEACEnICYgJ2ohKCAoEI4CQQAhKSACICk2AqwHQcwGISogAiAqaiErICshLCAsEK4BEJgBIS0gLRB7QeDfBiEuQdQAIS9B8AUhMCACIDBqITEgMSAuIC8Q9wIaQeAFITIgAiAyaiEzQgAhdiAzIHY3AwBB2AUhNCACIDRqITUgNSB2NwMAQdAFITYgAiA2aiE3IDcgdjcDAEHIBSE4IAIgOGohOSA5IHY3AwBBwAUhOiACIDpqITsgOyB2NwMAQbgFITwgAiA8aiE9ID0gdjcDACACIHY3A7AFQfAFIT4gAiA+aiE/ID8hQCACIEA2AsAFQdQAIUEgAiBBNgLEBUGCsAQhQiACIEI2AsgFQbAFIUMgAiBDaiFEIEQhRSBFEOkBIUYgAiBGNgLsBSACKALsBSFHQQAhSCBIIEc2ArCqBxDFASFJIEkQfCFKIEoQ6gEhSyACIEs2AqwFQawEIUxBACFNQfwAIU4gAiBOaiFPIE8gTSBMEPgCGkH8ACFQIAIgUGohUSBRIVJBBCFTIFIgU2ohVCACKAKsBSFVIFQgVTYCAEH8ACFWIAIgVmohVyBXIVhBCCFZIFggWWohWkHgACFbIFogW2ohXEG04AYhXUHAASFeIFwgXSBeEPcCGkGw/gQhXyACIF82AqAFQfwAIWAgAiBgaiFhIGEhYiBiEOsBIWMgAiBjNgKoBSACKAKoBSFkQQAhZSBlIGQ2AqiqB0H4ACFmQQAhZ0EEIWggAiBoaiFpIGkgZyBmEPgCGkEEIWogAiBqaiFrIGshbEH04QYhbUHgACFuIGwgbSBuEPcCGkH4ACFvQZysByFwQQQhcSACIHFqIXIgcCByIG8Q9wIaQbAHIXMgAiBzaiF0IHQkAA8LGwEDfyMAIQFBECECIAEgAmshAyADIAA2AgwPCxsBA38jACEBQRAhAiABIAJrIQMgAyAANgIMDwubAgEffyMAIQFBECECIAEgAmshAyADIAA2AgggAygCCCEEQQEhBSAEIAVGIQZBASEHIAYgB3EhCAJAAkAgCEUNAEEAIQkgCS0A6MEHIQpBASELIAogC3EhDAJAIAwNAEEBIQ1BACEOIA4gDToA6MEHQeDiBiEPQQAhECAQIA82ApitB0GrwQQhEUEAIRIgEiARNgKkrQdBkOQGIRNBACEUIBQgEzYCrK0HQavBBCEVQQAhFiAWIBU2AritB0HCvwQhF0EAIRggGCAXNgLArQdByeAFIRlBACEaIBogGTYCzK0HQY26BCEbQQAhHCAcIBs2AuDBBwtBlK0HIR0gAyAdNgIMDAELQQAhHiADIB42AgwLIAMoAgwhHyAfDwuwAQEVfyMAIQFBECECIAEgAmshAyADJAAgAyAANgIMQQAhBCAELQDY1gchBUEBIQYgBSAGcSEHAkAgB0UNACADKAIMIQhBACEJIAkoAuDWByEKQQAhCyALKALc1gchDCAIIAogDBB+GhB/IQ1BASEOIA0gDnEhDwJAIA9FDQBBFiEQIBAQgAFB8MEHIRFB4BIhEiARIBJqIRMgExCBARoLC0EQIRQgAyAUaiEVIBUkAA8LuwQBQ38jACEDQSAhBCADIARrIQUgBSQAIAUgADYCGCAFIAE2AhQgBSACNgIQIAUoAhghBkEAIQcgBiAHRyEIQQEhCSAIIAlxIQoCQAJAIApFDQAgBSgCFCELQQAhDCALIAxHIQ1BASEOIA0gDnEhDyAPRQ0AIAUoAhAhEEEAIREgECARSiESQQEhEyASIBNxIRQgFA0BC0HN0wYhFUGVxgQhFkGIGCEXQcCABCEYIBUgFiAXIBgQAAALIAUoAhQhGSAFKAIQIRpBASEbIBogG2shHCAZIBxqIR0gBSAdNgIMQQAhHiAFIB46AAtBACEfIAUgHzYCBAJAA0AgBSgCBCEgIAUoAhAhISAgICFIISJBASEjICIgI3EhJCAkRQ0BIAUoAhghJSAlLQAAISYgBSAmOgALIAUtAAshJ0EYISggJyAodCEpICkgKHUhKgJAICpFDQAgBSgCGCErQQEhLCArICxqIS0gBSAtNgIYCyAFLQALIS4gBSgCFCEvQQEhMCAvIDBqITEgBSAxNgIUIC8gLjoAACAFKAIEITJBASEzIDIgM2ohNCAFIDQ2AgQMAAsACyAFLQALITVBGCE2IDUgNnQhNyA3IDZ1ITgCQAJAIDhFDQAgBSgCDCE5QQAhOiA5IDo6AABBACE7QQEhPCA7IDxxIT0gBSA9OgAfDAELQQEhPkEBIT8gPiA/cSFAIAUgQDoAHwsgBS0AHyFBQQEhQiBBIEJxIUNBICFEIAUgRGohRSBFJAAgQw8LhAEBE39BACEAIAAoAvzBByEBQQAhAiABIAJHIQNBASEEIAMgBHEhBQJAAkAgBQ0AQQAhBiAGKAKQwgchB0EAIQggByAIRyEJQQAhCkEBIQsgCSALcSEMIAohDSAMRQ0BC0EAIQ4gDi0A98MHIQ8gDyENCyANIRBBASERIBAgEXEhEiASDwvgAgMjfwF+BH0jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDEHwwQchBEHgEiEFIAQgBWohBkHwASEHIAYgBxCCASADKAIMIQhBACEJIAkgCDYC2NQHQQAhCiAKKQOgxAchJEEAIQsgCyAkNwPQ1AdBgAIhDEEAIQ0gDSAMNgLs1AdBACEOIA4oAoDEByEPQQAhECAQIA82AqzWB0EAIREgESgChMQHIRJBACETIBMgEjYCsNYHQQAhFCAUKAKIxAchFUEAIRYgFiAVNgK01gdBACEXIBcoAozEByEYQQAhGSAZIBg2ArjWB0EAIRogGioCwNYHISVBACEbIBsgJTgC8NQHQQAhHCAcKgLE1gchJkEAIR0gHSAmOAL01AdBACEeIB4qAsjWByEnQQAhHyAfICc4AvjUB0EAISAgICoCzNYHIShBACEhICEgKDgC/NQHQRAhIiADICJqISMgIyQADwvjAgEsfyMAIQFBECECIAEgAmshAyADJAAgAyAANgIIQQAhBCAELQD4wwchBUEBIQYgBSAGcSEHAkAgBw0AQQAhCCAIKAL8wQchCUEAIQogCSAKRyELQQEhDCALIAxxIQ0CQAJAIA1FDQBBACEOIA4oAvzBByEPIAMoAgghECAQIA8RAAAMAQtBACERIBEoApDCByESQQAhEyASIBNHIRRBASEVIBQgFXEhFgJAIBZFDQBBACEXIBcoApDCByEYIAMoAgghGUEAIRogGigCgMIHIRsgGSAbIBgRAwALCwtBACEcIBwtAPvDByEdQQEhHiAdIB5xIR8CQAJAIB9FDQBBACEgQQAhISAhICA6APvDB0EBISJBASEjICIgI3EhJCADICQ6AA8MAQtBACElQQEhJiAlICZxIScgAyAnOgAPCyADLQAPIShBASEpICggKXEhKkEQISsgAyAraiEsICwkACAqDwu8AQEWfyMAIQJBECEDIAIgA2shBCAEJAAgBCAANgIMIAQgATYCCCAEKAIMIQVBACEGIAUgBkchB0EBIQggByAIcSEJAkACQCAJRQ0AIAQoAgghCkEAIQsgCiALSyEMQQEhDSAMIA1xIQ4gDg0BC0Hp0wYhD0GVxgQhEEGbFyERQc67BCESIA8gECARIBIQAAALIAQoAgwhEyAEKAIIIRRBACEVIBMgFSAUEPgCGkEQIRYgBCAWaiEXIBckAA8LMAEHf0EAIQAgAC0A/MMHIQFBASECQQAhA0EBIQQgASAEcSEFIAIgAyAFGyEGIAYPC9sBARl/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgxBACEEIAQtAOTWByEFQQEhBiAFIAZxIQcCQAJAIAcNAAwBCyADKAIMIQhBACEJIAggCUghCkEBIQsgCiALcSEMAkAgDEUNAEEAIQ0gAyANNgIMCyADKAIMIQ5BACEPIA8oAujWByEQIA4gEEohEUEBIRIgESAScSETAkAgE0UNAEEAIRQgFCgC6NYHIRUgAyAVNgIMCyADKAIMIRZBACEXIBcgFjYC8NYHEIUBC0EQIRggAyAYaiEZIBkkAA8LkgEBEn9BACEAIAAtAOTWByEBQQEhAiABIAJxIQMCQCADRQ0AQQAhBCAEKAL41gchBUEAIQYgBSAGRyEHQQEhCCAHIAhxIQkCQCAJDQBBsLYEIQpBlcYEIQtBoBkhDEGktQQhDSAKIAsgDCANEAAAC0EAIQ4gDigC+NYHIQ9BACEQIBAoAvTWByERIA8gERCCAQsPC5IDATJ/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgwgBCABNgIIQQAhBSAFLQDk1gchBkEBIQcgBiAHcSEIAkACQCAIDQAMAQsgBCgCCCEJQQAhCiAKIAlGIQtBASEMIAsgDHEhDQJAIA1FDQAMAQtBACEOIA4oAvDWByEPQQAhECAQKALo1gchESAPIBFMIRJBASETIBIgE3EhFAJAIBQNAEHXrgQhFUGVxgQhFkHuJSEXQfy7BCEYIBUgFiAXIBgQAAALIAQoAgwhGUEAIRogGSAaSCEbQQEhHCAbIBxxIR0CQAJAIB0NACAEKAIMIR5BACEfIB8oAvDWByEgIB4gIE4hIUEBISIgISAicSEjICNFDQELDAELIAQoAgghJCAEKAIMISUgJRCHASEmQQAhJyAnKALs1gchKCAkICYgKBB+ISlBASEqICkgKnEhKyArDQBB4QAhLEEBIS1BACEuQfMlIS8gLCAtIC4gLxCIAUEAITBBACExIDEgMDYC8NYHC0EQITIgBCAyaiEzIDMkAA8L/AIBMH8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDEEAIQQgBCgC+NYHIQVBACEGIAUgBkchB0EBIQggByAIcSEJAkAgCQ0AQbC2BCEKQZXGBCELQfcXIQxBm7AEIQ0gCiALIAwgDRAAAAsgAygCDCEOQQAhDyAOIA9OIRBBASERIBAgEXEhEgJAAkAgEkUNACADKAIMIRNBACEUIBQoAujWByEVIBMgFUwhFkEBIRcgFiAXcSEYIBgNAQtBlYoGIRlBlcYEIRpB+BchG0GbsAQhHCAZIBogGyAcEAAACyADKAIMIR1BACEeIB4oAuzWByEfIB0gH2whICADICA2AgggAygCCCEhQQAhIiAiKAL01gchIyAhICNIISRBASElICQgJXEhJgJAICYNAEHL0gQhJ0GVxgQhKEH6FyEpQZuwBCEqICcgKCApICoQAAALQQAhKyArKAL41gchLCADKAIIIS0gLCAtaiEuQRAhLyADIC9qITAgMCQAIC4PC8UCASN/IwAhBEEgIQUgBCAFayEGIAYkACAGIAA2AhwgBiABNgIYIAYgAjYCFCAGIAM2AhBBACEHIAcoAtDDByEIQQAhCSAIIAlHIQpBASELIAogC3EhDAJAAkAgDEUNAEEAIQ0gBiANNgIMQZXGBCEOIAYgDjYCDCAGKAIUIQ9BACEQIBAgD0YhEUEBIRIgESAScSETAkAgE0UNACAGKAIcIRRB8OUGIRVBAiEWIBQgFnQhFyAVIBdqIRggGCgCACEZIAYgGTYCFAtBACEaIBooAtDDByEbIAYoAhghHCAGKAIcIR0gBigCFCEeIAYoAhAhHyAGKAIMISBBACEhICEoAtTDByEiQe27BCEjICMgHCAdIB4gHyAgICIgGxEKAAwBCyAGKAIYISQCQCAkDQAQ9gIACwtBICElIAYgJWohJiAmJAAPC8kEAkB/CH0jACEDQRAhBCADIARrIQUgBSQAIAUgADYCDCAFIAE2AgggBSACNgIEQQAhBiAGLQDk1gchB0EBIQggByAIcSEJAkACQCAJDQAMAQtBACEKIAooAvDWByELQQAhDCAMIAtGIQ1BASEOIA0gDnEhDwJAIA9FDQAQhQEMAQsQfyEQQQEhESAQIBFxIRIgEkUNACAFKAIMIRMgE7IhQ0EAIRQgFCoCmMQHIUQgQyBElCFFQQAhFSAVIEU4AsDWByAFKAIIIRYgFrIhRkEAIRcgFyoCmMQHIUcgRiBHlCFIQQAhGCAYIEg4AsTWB0EAIRkgGbIhSUEAIRogGiBJOALI1gdBACEbIBuyIUpBACEcIBwgSjgCzNYHQRchHSAdEIABIAUoAgQhHkEBIR8gHiAfcSEgAkAgIEUNAEEAISEgISgC6NQHISJBASEjICIgI3IhJEEAISUgJSAkNgLo1AcLIAUoAgQhJkECIScgJiAncSEoAkAgKEUNAEEAISkgKSgC6NQHISpBAiErICogK3IhLEEAIS0gLSAsNgLo1AcLIAUoAgQhLkEEIS8gLiAvcSEwAkAgMEUNAEEAITEgMSgC6NQHITJBBCEzIDIgM3IhNEEAITUgNSA0NgLo1AcLIAUoAgQhNkEIITcgNiA3cSE4AkAgOEUNAEEAITkgOSgC6NQHITpBCCE7IDogO3IhPEEAIT0gPSA8NgLo1AcLQfDBByE+QeASIT8gPiA/aiFAIEAQgQEaC0EQIUEgBSBBaiFCIEIkAA8LiAIBFX8jACEIQcAAIQkgCCAJayEKIAokACAKIAA2AjwgCiABNgI4IAogAjYCNCAKIAM2AjAgCiAENgIsIAogBTYCKCAKIAY2AiQgCiAHNgIgIAohC0EgIQwgCyAMEIIBIAooAjghDUEAIQ4gDiANRyEPQQEhECAPIBBxIREgCiAROgAAIAooAjQhEiAKIBI2AgQgCigCPCETIAogEzYCCCAKKAIoIRQgCiAUNgIMIAooAiwhFSAKIBU2AhAgCigCKCEWIAogFjYCFCAKKAIkIRcgCiAXNgIYIAooAiAhGCAKIBg2AhwgCigCMCEZIAohGiAaIBkRAABBwAAhGyAKIBtqIRwgHCQADwtwAQt/IwAhAkGQAiEDIAIgA2shBCAEJABBACEFIAQgBTYCjAIgBCAANgKIAiAEIAE2AoQCIAQoAogCIQYgBCgChAIhByAEIQggCCAGIAcQeCAEIQkgCRCMAUEAIQpBkAIhCyAEIAtqIQwgDCQAIAoPC/oHA2N/C3wTfSMAIQFBICECIAEgAmshAyADJAAgAyAANgIcIAMoAhwhBCAEEI0BQfDBByEFQZwWIQYgBSAGaiEHQQEhCCAHIAhqIQkgCRABQQAhCiAKLQDowwchC0EBIQwgCyAMcSENAkACQCANRQ0AQQAhDiAOKAKUwgchDwJAAkAgDw0AQYAFIRAgECERDAELQQAhEiASKAKUwgchEyATIRELIBEhFCAUtyFkIAMgZDkDEEEAIRUgFSgCmMIHIRYCQAJAIBYNAEHgAyEXIBchGAwBC0EAIRkgGSgCmMIHIRogGiEYCyAYIRsgG7chZSADIGU5AwgMAQtB8MEHIRxBnBYhHSAcIB1qIR5BECEfIAMgH2ohICAgISFBCCEiIAMgImohIyAjISQgHiAhICQQAhpBAiElQQAhJkEAISdBBiEoQQEhKSAnIClxISogJSAmICogKCAlEAMaC0EAISsgKy0ApMIHISxBASEtICwgLXEhLgJAIC5FDQAQBCFmIGa2IW9BACEvIC8gbzgCmMQHCyADKwMQIWcgZ7YhcCBwEPkCIXEgcYshckMAAABPIXMgciBzXSEwIDBFITECQAJAIDENACBxqCEyIDIhMwwBC0GAgICAeCE0IDQhMwsgMyE1QQAhNiA2IDU2AoDEByADKwMIIWggaLYhdCB0EPkCIXUgdYshdkMAAABPIXcgdiB3XSE3IDdFITgCQAJAIDgNACB1qCE5IDkhOgwBC0GAgICAeCE7IDshOgsgOiE8IDYgPDYChMQHIAMrAxAhaSA2KgKYxAcheCB4uyFqIGkgaqIhayBrtiF5IHkQ+QIheiB6iyF7QwAAAE8hfCB7IHxdIT0gPUUhPgJAAkAgPg0AIHqoIT8gPyFADAELQYCAgIB4IUEgQSFACyBAIUIgNiBCNgKIxAcgAysDCCFsIDYqApjEByF9IH27IW0gbCBtoiFuIG62IX4gfhD5AiF/IH+LIYABQwAAAE8hgQEggAEggQFdIUMgQ0UhRAJAAkAgRA0AIH+oIUUgRSFGDAELQYCAgIB4IUcgRyFGCyBGIUhBACFJIEkgSDYCjMQHQQAhSiBKKAKIxAchS0EAIUwgTCgCjMQHIU1B8MEHIU5BnBYhTyBOIE9qIVAgUCBLIE0QBRoQjwFBASFRQQAhUiBSIFE6APTDBxCQASADKAIcIVNB0AAhVCBTIFRqIVUgVRCRAUEAIVYgVi0A8cMHIVdBASFYIFcgWHEhWQJAAkAgWUUNAEEAIVogWi0A8sMHIVtBByFcQQAhXUEBIV4gWyBecSFfIFwgXSBfEAYMAQtBCCFgQQAhYSBgIGEQBwtBICFiIAMgYmohYyBjJAAPC9ENAsgBfwF9IwAhAUGQAiECIAEgAmshAyADJAAgAyAANgKMAiADKAKMAiEEQQAhBSAEIAVHIQZBASEHIAYgB3EhCAJAIAgNAEHVwwUhCUGVxgQhCkHGGCELQcvjBCEMIAkgCiALIAwQAAALIAMoAowCIQ0gDSgCJCEOQQAhDyAOIA9OIRBBASERIBAgEXEhEgJAIBINAEHT6AUhE0GVxgQhFEHHGCEVQcvjBCEWIBMgFCAVIBYQAAALIAMoAowCIRcgFygCKCEYQQAhGSAYIBlOIRpBASEbIBogG3EhHAJAIBwNAEG+5wUhHUGVxgQhHkHIGCEfQcvjBCEgIB0gHiAfICAQAAALIAMoAowCISEgISgCLCEiQQAhIyAiICNOISRBASElICQgJXEhJgJAICYNAEGU5wUhJ0GVxgQhKEHJGCEpQcvjBCEqICcgKCApICoQAAALIAMoAowCISsgKygCMCEsQQAhLSAsIC1OIS5BASEvIC4gL3EhMAJAIDANAEGS6AUhMUGVxgQhMkHKGCEzQcvjBCE0IDEgMiAzIDQQAAALIAMoAowCITUgNSgCQCE2QQAhNyA2IDdOIThBASE5IDggOXEhOgJAIDoNAEHk6AUhO0GVxgQhPEHLGCE9QcvjBCE+IDsgPCA9ID4QAAALIAMoAowCIT8gPygCSCFAQQAhQSBAIEFOIUJBASFDIEIgQ3EhRAJAIEQNAEHi5wUhRUGVxgQhRkHMGCFHQcvjBCFIIEUgRiBHIEgQAAALIAMoAowCIUkgSSgCTCFKQQAhSyBKIEtOIUxBASFNIEwgTXEhTgJAIE4NAEGr6AUhT0GVxgQhUEHNGCFRQcvjBCFSIE8gUCBRIFIQAAALQfDBByFTQaAsIVQgUyBUEIIBIAMoAowCIVVBCCFWIAMgVmohVyBXIVggWCBVEJACQfDBByFZQYQCIVpBCCFbIAMgW2ohXCBZIFwgWhD3AhpBASFdQQAhXiBeIF06APbDB0EAIV8gXygClMIHIWBBACFhIGEgYDYCgMQHQQAhYiBiKAKYwgchY0EAIWQgZCBjNgKExAdBACFlIGUoAoDEByFmQQAhZyBnIGY2AojEB0EAIWggaCgChMQHIWlBACFqIGogaTYCjMQHQQAhayBrKAKcwgchbEEAIW0gbSBsNgKQxAdBACFuIG4oAqDCByFvQQAhcCBwIG82ApTEB0EjIXFBACFyIHIgcToAjNgHQQAhcyBzKALkwwchdEHwwQchdUGcFiF2IHUgdmohd0EBIXggdyB4aiF5Qf8AIXogdCB5IHoQfhpB8MEHIXtBnBYhfCB7IHxqIX1BASF+IH0gfmohf0EAIYABIIABIH82AuTDB0EAIYEBIIEBLQDrwwchggFBASGDASCCASCDAXEhhAFBACGFASCFASCEAToA/MMHQQAhhgEghgEtAKzCByGHAUEBIYgBIIcBIIgBcSGJAUEAIYoBIIoBIIkBOgDY1gdBACGLASCLAS0A2NYHIYwBQQEhjQEgjAEgjQFxIY4BAkAgjgFFDQBBACGPASCPASgCsMIHIZABQQAhkQEgkQEgkAE2AtzWB0EAIZIBIJIBKALc1gchkwEgkwEQnQEhlAFBACGVASCVASCUATYC4NYHC0EAIZYBIJYBLQC0wgchlwFBASGYASCXASCYAXEhmQFBACGaASCaASCZAToA5NYHQQAhmwEgmwEtAOTWByGcAUEBIZ0BIJwBIJ0BcSGeAQJAIJ4BRQ0AQQAhnwEgnwEoArjCByGgAUEAIaEBIKEBIKABNgLo1gdBACGiASCiASgCvMIHIaMBQQAhpAEgpAEgowE2AuzWB0EAIaUBIKUBKALo1gchpgFBACGnASCnASgC7NYHIagBIKYBIKgBbCGpAUEAIaoBIKoBIKkBNgL01gdBACGrASCrASgC9NYHIawBIKwBEJ0BIa0BQQAhrgEgrgEgrQE2AvjWBwtBACGvASCvASgCqMIHIbABQfDBByGxAUGcFyGyASCxASCyAWohswFBgAEhtAEgsAEgswEgtAEQfhpB8MEHIbUBQZwXIbYBILUBILYBaiG3AUEAIbgBILgBILcBNgKowgdDAACAPyHJAUEAIbkBILkBIMkBOAKYxAdBACG6ASC6AS0ApcIHIbsBQQEhvAEguwEgvAFxIb0BQQAhvgEgvgEgvQE6APXDB0EBIb8BQQAhwAEgwAEgvwE6ANDWB0HwwQchwQFBuAIhwgEgwQEgwgFqIcMBIMMBEJECQfDBByHEAUGcFiHFASDEASDFAWohxgEgxgEQC0GQAiHHASADIMcBaiHIASDIASQADwvNBwNYfw98E30jACEDQSAhBCADIARrIQUgBSQAIAUgADYCHCAFIAE2AhggBSACNgIUQfDBByEGQZwWIQcgBiAHaiEIQQghCSAFIAlqIQogCiELIAUhDCAIIAsgDBACGiAFKwMIIVtEAAAAAAAA8D8hXCBbIFxjIQ1BASEOIA0gDnEhDwJAAkAgD0UNACAFKAIYIRAgECgCDCERIBG3IV0gBSBdOQMIDAELIAUrAwghXiBetiFqIGoQ+QIhayBriyFsQwAAAE8hbSBsIG1dIRIgEkUhEwJAAkAgEw0AIGuoIRQgFCEVDAELQYCAgIB4IRYgFiEVCyAVIRdBACEYIBggFzYCgMQHCyAFKwMAIV9EAAAAAAAA8D8hYCBfIGBjIRlBASEaIBkgGnEhGwJAAkAgG0UNACAFKAIYIRwgHCgCECEdIB23IWEgBSBhOQMADAELIAUrAwAhYiBitiFuIG4Q+QIhbyBviyFwQwAAAE8hcSBwIHFdIR4gHkUhHwJAAkAgHw0AIG+oISAgICEhDAELQYCAgIB4ISIgIiEhCyAhISNBACEkICQgIzYChMQHC0EAISUgJS0ApMIHISZBASEnICYgJ3EhKAJAIChFDQAQBCFjIGO2IXJBACEpICkgcjgCmMQHCyAFKwMIIWRBACEqICoqApjEByFzIHO7IWUgZCBloiFmIGa2IXQgdBD5AiF1IHWLIXZDAAAATyF3IHYgd10hKyArRSEsAkACQCAsDQAgdaghLSAtIS4MAQtBgICAgHghLyAvIS4LIC4hMCAqIDA2AojEByAFKwMAIWcgKioCmMQHIXggeLshaCBnIGiiIWkgabYheSB5EPkCIXogeoshe0MAAABPIXwgeyB8XSExIDFFITICQAJAIDINACB6qCEzIDMhNAwBC0GAgICAeCE1IDUhNAsgNCE2QQAhNyA3IDY2AozEB0EAITggOCgCiMQHITlBACE6IDkgOkohO0EBITwgOyA8cSE9AkACQCA9RQ0AQQAhPiA+KAKMxAchP0EAIUAgPyBASiFBQQEhQiBBIEJxIUMgQw0BC0GN0wYhREGVxgQhRUH9KCFGQZ+8BSFHIEQgRSBGIEcQAAALQQAhSCBIKAKIxAchSUEAIUogSigCjMQHIUtB8MEHIUxBnBYhTSBMIE1qIU4gTiBJIEsQBRoQfyFPQQEhUCBPIFBxIVECQCBRRQ0AQQ4hUiBSEIABQfDBByFTQeASIVQgUyBUaiFVIFUQgQEaC0EBIVZBASFXIFYgV3EhWEEgIVkgBSBZaiFaIFokACBYDwvjAQEffyMAIQBBECEBIAAgAWshAiACJABBACEDIAMtAKbCByEEQQAhBSAFKAKQxAchBkEBIQcgBiAHSiEIQQAhCSAJLQDqwwchCkEAIQsgCy0A6cMHIQxBASENIAQgDXEhDkEBIQ8gCCAPcSEQQQEhESAKIBFxIRJBASETIAwgE3EhFCAOIBAgEiAUEAwhFSACIBU2AgwgAigCDCEWIBYQDRpBppkCIRdB8MEHIRhBmBYhGSAYIBlqIRogFyAaEA4gAigCDCEbQczABSEcIBsgHBAPGkEQIR0gAiAdaiEeIB4kAA8LjgkBpQF/QfDBByEAQZwWIQEgACABaiECQQAhA0EBIQRBCSEFQQIhBkEBIQcgBCAHcSEIIAIgAyAIIAUgBhAQGkHwwQchCUGcFiEKIAkgCmohC0EAIQxBASENQQkhDkECIQ9BASEQIA0gEHEhESALIAwgESAOIA8QERpB8MEHIRJBnBYhEyASIBNqIRRBACEVQQEhFkEJIRdBAiEYQQEhGSAWIBlxIRogFCAVIBogFyAYEBIaQfDBByEbQZwWIRwgGyAcaiEdQQAhHkEBIR9BCSEgQQIhIUEBISIgHyAicSEjIB0gHiAjICAgIRATGkHwwQchJEGcFiElICQgJWohJkEAISdBASEoQQkhKUECISpBASErICggK3EhLCAmICcgLCApICoQFBpB8MEHIS1BnBYhLiAtIC5qIS9BACEwQQEhMUEKITJBAiEzQQEhNCAxIDRxITUgLyAwIDUgMiAzEBUaQQIhNkEAITdBASE4QQshOUEBITogOCA6cSE7IDYgNyA7IDkgNhAWGkECITxBACE9QQEhPkELIT9BASFAID4gQHEhQSA8ID0gQSA/IDwQFxpBAiFCQQAhQ0EBIURBCyFFQQEhRiBEIEZxIUcgQiBDIEcgRSBCEBgaQfDBByFIQZwWIUkgSCBJaiFKQQAhS0EBIUxBDCFNQQIhTkEBIU8gTCBPcSFQIEogSyBQIE0gThAZGkHwwQchUUGcFiFSIFEgUmohU0EAIVRBASFVQQwhVkECIVdBASFYIFUgWHEhWSBTIFQgWSBWIFcQGhpB8MEHIVpBnBYhWyBaIFtqIVxBACFdQQEhXkEMIV9BAiFgQQEhYSBeIGFxIWIgXCBdIGIgXyBgEBsaQfDBByFjQZwWIWQgYyBkaiFlQQAhZkEBIWdBDCFoQQIhaUEBIWogZyBqcSFrIGUgZiBrIGggaRAcGkEBIWxBACFtQQEhbkENIW9BAiFwQQEhcSBuIHFxIXIgbCBtIHIgbyBwEB0aQQEhc0EAIXRBASF1QQ4hdkECIXdBASF4IHUgeHEheSBzIHQgeSB2IHcQHhpBAiF6QQAhe0EBIXxBDyF9QQEhfiB8IH5xIX8geiB7IH8gfSB6EB8aQQIhgAFBACGBAUEBIYIBQRAhgwFBASGEASCCASCEAXEhhQEggAEggQEghQEggwEggAEQIBoQIUEAIYYBIIYBLQDY1gchhwFBASGIASCHASCIAXEhiQECQCCJAUUNABAiC0EAIYoBIIoBLQDk1gchiwFBASGMASCLASCMAXEhjQECQCCNAUUNAEHwwQchjgFBnBYhjwEgjgEgjwFqIZABQQEhkQEgkAEgkQFqIZIBIJIBECMLQfDBByGTAUGcFiGUASCTASCUAWohlQFBACGWAUEBIZcBQREhmAFBAiGZAUEBIZoBIJcBIJoBcSGbASCVASCWASCbASCYASCZARAkGkHwwQchnAFBnBYhnQEgnAEgnQFqIZ4BQQAhnwFBASGgAUERIaEBQQIhogFBASGjASCgASCjAXEhpAEgngEgnwEgpAEgoQEgogEQJRoPC/4DAT1/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEQQAhBSAEIAVHIQZBASEHIAYgB3EhCAJAIAgNAEHVwwUhCUGVxgQhCkGb3QAhC0GJwQQhDCAJIAogCyAMEAAACyADKAIMIQ0gDS0AACEOQQEhDyAOIA9xIRACQCAQRQ0AQQAhESARKAKA2AchEkEAIRMgEyASRiEUQQEhFSAUIBVxIRYCQCAWRQ0AEJkBC0EAIRcgFygCgNgHIRhBACEZIBkgGEchGkEBIRsgGiAbcSEcAkAgHA0AQYKrBCEdQZXGBCEeQaDdACEfQYnBBCEgIB0gHiAfICAQAAALQfDBByEhQYwVISIgISAiaiEjIAMgIzYCDAsgAygCDCEkICQQmgEhJSADICU2AgggAygCCCEmAkACQCAmDQAMAQsgAygCCCEnQQAhKCAnIChKISlBASEqICkgKnEhKwJAAkAgK0UNACADKAIIISxBCCEtICwgLUwhLkEBIS8gLiAvcSEwIDANAQtBt6cGITFBlcYEITJBp90AITNBicEEITQgMSAyIDMgNBAAAAsgAygCDCE1IAMoAgghNiA1IDYQmwEhN0EBITggNyA4cSE5AkAgOQ0ADAELIAMoAgwhOiADKAIIITsgOiA7EJwBC0EQITwgAyA8aiE9ID0kAA8LXAIJfwJ8IwAhAEEQIQEgACABayECIAIkABAmIQkgAiAJOQMIIAIrAwghCkEAIQMgCiADEJMBIQRBASEFIAQgBXEhBgJAIAYNABAnC0EQIQcgAiAHaiEIIAgkAA8LzAICI38DfCMAIQJBICEDIAIgA2shBCAEJAAgBCAAOQMQIAQgATYCDCAEKwMQISVEAAAAAABAj0AhJiAlICajISdB8MEHIQVBuAIhBiAFIAZqIQcgByAnEJsCEJwCQQAhCCAILQD5wwchCUEBIQogCSAKcSELAkAgC0UNAEEVIQwgDBCAAUHwwQchDUHgEiEOIA0gDmohDyAPEIEBGkEAIRAgEC0A+cMHIRFBASESIBEgEnEhEwJAIBNFDQBBASEUQQAhFSAVIBQ6APrDBwsLQQAhFiAWLQD6wwchF0EBIRggFyAYcSEZAkACQCAZRQ0AEJ0CEJ4CEJ8CQQAhGkEBIRsgGiAbcSEcIAQgHDoAHwwBC0EBIR1BASEeIB0gHnEhHyAEIB86AB8LIAQtAB8hIEEBISEgICAhcSEiQSAhIyAEICNqISQgJCQAICIPC1QBC39BACEAIAAoAojEByEBQQAhAiABIAJKIQNBASEEIAMgBHEhBQJAAkAgBUUNAEEAIQYgBigCiMQHIQcgByEIDAELQQEhCSAJIQgLIAghCiAKDwtUAQt/QQAhACAAKAKMxAchAUEAIQIgASACSiEDQQEhBCADIARxIQUCQAJAIAVFDQBBACEGIAYoAozEByEHIAchCAwBC0EBIQkgCSEICyAIIQogCg8LCwEBf0EXIQAgAA8LCwEBf0EsIQAgAA8LFAECf0EAIQAgACgCkMQHIQEgAQ8LnSACnQN/Bn4jACEAQdABIQEgACABayECIAIkAEEAIQMgAygCgNgHIQRBACEFIAUgBEYhBkEBIQcgBiAHcSEIAkAgCA0AQeOqBCEJQZXGBCEKQeEZIQtB8MAEIQwgCSAKIAsgDBAAAAtBAyENIAIgDTYCzAFBACEOIA4oAsjlBiEPQcgBIRAgAiAQaiERIBEgDzYCACAOKQLA5QYhnQMgAiCdAzcDwAFBACESIAIgEjYCvAFBACETIAIgEzYCuAECQANAIAIoArgBIRRBAyEVIBQgFUghFkEBIRcgFiAXcSEYIBhFDQEgAigCuAEhGUHAASEaIAIgGmohGyAbIRxBAiEdIBkgHXQhHiAcIB5qIR8gHygCACEgIAIoArgBISFBwAEhIiACICJqISMgIyEkQQIhJSAhICV0ISYgJCAmaiEnICcoAgAhKCAgIChsISkgAigCvAEhKiAqIClqISsgAiArNgK8ASACKAK4ASEsQQEhLSAsIC1qIS4gAiAuNgK4AQwACwALIAIoArwBIS9BAiEwIC8gMHQhMSAxEJ0BITJBACEzIDMgMjYCgNgHQQAhNCA0KAKA2AchNSACIDU2ArQBIAIoArQBITYgAigCvAEhN0ECITggNyA4dCE5IDYgOWohOiACIDo2ArABQQAhOyACIDs2AqwBAkADQCACKAKsASE8QQMhPSA8ID1IIT5BASE/ID4gP3EhQCBARQ0BIAIoAqwBIUFBwAEhQiACIEJqIUMgQyFEQQIhRSBBIEV0IUYgRCBGaiFHIEcoAgAhSCACIEg2AqgBIAIoAqgBIUkgAigCqAEhSiBJIEpsIUsgAiBLNgKkASACKAKsASFMQfDBByFNQYwVIU4gTSBOaiFPQQQhUCBPIFBqIVFBBCFSIEwgUnQhUyBRIFNqIVQgAiBUNgKgASACKAKoASFVIAIoAqABIVYgViBVNgIAIAIoAqgBIVcgAigCoAEhWCBYIFc2AgQgAigCtAEhWSACKAKgASFaIFogWTYCCCACKAKkASFbQQIhXCBbIFx0IV0gAigCoAEhXiBeIF02AgwgAigCpAEhXyACKAK0ASFgQQIhYSBfIGF0IWIgYCBiaiFjIAIgYzYCtAEgAigCrAEhZEEBIWUgZCBlaiFmIAIgZjYCrAEMAAsACyACKAK0ASFnIAIoArABIWggZyBoRiFpQQEhaiBpIGpxIWsCQCBrDQBBhJUFIWxBlcYEIW1B+xkhbkHwwAQhbyBsIG0gbiBvEAAAC0EAIXAgcCkA6dgFIZ4DIAIgngM3A5gBQQAhcSBxKQPo5QYhnwNBiAEhciACIHJqIXMgcyCfAzcDACBxKQPg5QYhoANBgAEhdCACIHRqIXUgdSCgAzcDACBxKQPY5QYhoQMgAiChAzcDeCBxKQPQ5QYhogMgAiCiAzcDcEEAIXYgdigCgNgHIXcgAiB3NgK0AUH///8HIXggAiB4NgJsQYCAgHgheSACIHk2AmhBACF6IAIgejYCZAJAA0AgAigCZCF7QQMhfCB7IHxIIX1BASF+IH0gfnEhfyB/RQ0BIAIoAmQhgAFBwAEhgQEgAiCBAWohggEgggEhgwFBAiGEASCAASCEAXQhhQEggwEghQFqIYYBIIYBKAIAIYcBIAIghwE2AmAgAigCYCGIAUEIIYkBIIgBIIkBbyGKAQJAIIoBRQ0AQfH1BSGLAUGVxgQhjAFBmBohjQFB8MAEIY4BIIsBIIwBII0BII4BEAAACyACKAJgIY8BQQghkAEgjwEgkAFtIZEBIAIgkQE2AlxBACGSASACIJIBNgJYQQAhkwEgAiCTATYCVAJAA0AgAigCWCGUAUEIIZUBIJQBIJUBSCGWAUEBIZcBIJYBIJcBcSGYASCYAUUNASACKAJYIZkBQfAAIZoBIAIgmgFqIZsBIJsBIZwBQQIhnQEgmQEgnQF0IZ4BIJwBIJ4BaiGfASCfASgCACGgASACIKABNgJQQQAhoQEgAiChATYCTAJAA0AgAigCTCGiASACKAJcIaMBIKIBIKMBSCGkAUEBIaUBIKQBIKUBcSGmASCmAUUNASACKAJYIacBQZgBIagBIAIgqAFqIakBIKkBIaoBIKoBIKcBaiGrASCrAS0AACGsASACIKwBOgBLQQAhrQEgAiCtATYCREEAIa4BIAIgrgE2AkACQANAIAIoAkQhrwFBCCGwASCvASCwAUghsQFBASGyASCxASCyAXEhswEgswFFDQEgAi0ASyG0AUH/ASG1ASC0ASC1AXEhtgFBgAEhtwEgtgEgtwFxIbgBQQAhuQEguQEguAFGIboBQQEhuwEgugEguwFxIbwBAkACQCC8AUUNAEH///8HIb0BIL0BIb4BDAELIAIoAlAhvwEgvwEhvgELIL4BIcABIAIgwAE2AjxBACHBASACIMEBNgI4AkADQCACKAI4IcIBIAIoAlwhwwEgwgEgwwFIIcQBQQEhxQEgxAEgxQFxIcYBIMYBRQ0BIAIoArQBIccBIAIoArABIcgBIMcBIMgBSSHJAUEBIcoBIMkBIMoBcSHLAQJAIMsBDQBBk5UFIcwBQZXGBCHNAUGhGiHOAUHwwAQhzwEgzAEgzQEgzgEgzwEQAAALIAIoAjwh0AEgAigCtAEh0QFBBCHSASDRASDSAWoh0wEgAiDTATYCtAEg0QEg0AE2AgAgAigCOCHUAUEBIdUBINQBINUBaiHWASACINYBNgI4IAIoAkAh1wFBASHYASDXASDYAWoh2QEgAiDZATYCQAwACwALIAIoAkQh2gFBASHbASDaASDbAWoh3AEgAiDcATYCRCACLQBLId0BQf8BId4BIN0BIN4BcSHfAUEBIeABIN8BIOABdCHhASACIOEBOgBLDAALAAsgAigCTCHiAUEBIeMBIOIBIOMBaiHkASACIOQBNgJMIAIoAlQh5QFBASHmASDlASDmAWoh5wEgAiDnATYCVAwACwALIAIoAlgh6AFBASHpASDoASDpAWoh6gEgAiDqATYCWAwACwALIAIoAmQh6wFBASHsASDrASDsAWoh7QEgAiDtATYCZAwACwALIAIoArQBIe4BIAIoArABIe8BIO4BIO8BRiHwAUEBIfEBIPABIPEBcSHyAQJAIPIBDQBBhJUFIfMBQZXGBCH0AUGoGiH1AUHwwAQh9gEg8wEg9AEg9QEg9gEQAAALQQAh9wEg9wEoAoDYByH4ASACIPgBNgK0AUEAIfkBIAIg+QE2AjQCQANAIAIoAjQh+gFBAyH7ASD6ASD7AUgh/AFBASH9ASD8ASD9AXEh/gEg/gFFDQEgAigCNCH/AUHAASGAAiACIIACaiGBAiCBAiGCAkECIYMCIP8BIIMCdCGEAiCCAiCEAmohhQIghQIoAgAhhgIgAiCGAjYCMEEAIYcCIAIghwI2AiwCQANAIAIoAiwhiAIgAigCMCGJAiCIAiCJAkghigJBASGLAiCKAiCLAnEhjAIgjAJFDQFB////ByGNAiACII0CNgIoQQAhjgIgAiCOAjYCJAJAA0AgAigCJCGPAiACKAIwIZACII8CIJACSCGRAkEBIZICIJECIJICcSGTAiCTAkUNASACKAIsIZQCIAIoAjAhlQIglAIglQJsIZYCIAIoAiQhlwIglgIglwJqIZgCIAIgmAI2AiAgAigCtAEhmQIgAigCICGaAkECIZsCIJoCIJsCdCGcAiCZAiCcAmohnQIgnQIoAgAhngIgAiCeAjYCHCACKAIcIZ8CQf///wchoAIgnwIgoAJGIaECQQEhogIgoQIgogJxIaMCAkAgowJFDQAgAigCKCGkAkH///8HIaUCIKQCIKUCRyGmAkEBIacCIKYCIKcCcSGoAiCoAkUNACACKAK0ASGpAiACKAIgIaoCQQIhqwIgqgIgqwJ0IawCIKkCIKwCaiGtAkGAgIB4Ia4CIK0CIK4CNgIACyACKAIcIa8CIAIgrwI2AiggAigCJCGwAkEBIbECILACILECaiGyAiACILICNgIkDAALAAsgAigCLCGzAkEBIbQCILMCILQCaiG1AiACILUCNgIsDAALAAsgAigCMCG2AiACKAIwIbcCILYCILcCbCG4AiACKAK0ASG5AkECIboCILgCILoCdCG7AiC5AiC7AmohvAIgAiC8AjYCtAEgAigCNCG9AkEBIb4CIL0CIL4CaiG/AiACIL8CNgI0DAALAAsgAigCtAEhwAIgAigCsAEhwQIgwAIgwQJGIcICQQEhwwIgwgIgwwJxIcQCAkAgxAINAEGElQUhxQJBlcYEIcYCQbsaIccCQfDABCHIAiDFAiDGAiDHAiDIAhAAAAtBACHJAiDJAigCgNgHIcoCIAIgygI2ArQBQQAhywIgAiDLAjYCGAJAA0AgAigCGCHMAkEDIc0CIMwCIM0CSCHOAkEBIc8CIM4CIM8CcSHQAiDQAkUNASACKAIYIdECQcABIdICIAIg0gJqIdMCINMCIdQCQQIh1QIg0QIg1QJ0IdYCINQCINYCaiHXAiDXAigCACHYAiACINgCNgIUQQAh2QIgAiDZAjYCEAJAA0AgAigCECHaAiACKAIUIdsCINoCINsCSCHcAkEBId0CINwCIN0CcSHeAiDeAkUNAUH///8HId8CIAIg3wI2AgxBACHgAiACIOACNgIIAkADQCACKAIIIeECIAIoAhQh4gIg4QIg4gJIIeMCQQEh5AIg4wIg5AJxIeUCIOUCRQ0BIAIoAggh5gIgAigCFCHnAiDmAiDnAmwh6AIgAigCECHpAiDoAiDpAmoh6gIgAiDqAjYCBCACKAK0ASHrAiACKAIEIewCQQIh7QIg7AIg7QJ0Ie4CIOsCIO4CaiHvAiDvAigCACHwAiACIPACNgIAIAIoAgAh8QJB////ByHyAiDxAiDyAkYh8wJBASH0AiDzAiD0AnEh9QICQCD1AkUNACACKAIMIfYCQf///wch9wIg9gIg9wJHIfgCQQEh+QIg+AIg+QJxIfoCIPoCRQ0AIAIoArQBIfsCIAIoAgQh/AJBAiH9AiD8AiD9AnQh/gIg+wIg/gJqIf8CQYCAgHghgAMg/wIggAM2AgALIAIoAgAhgQMgAiCBAzYCDCACKAIIIYIDQQEhgwMgggMggwNqIYQDIAIghAM2AggMAAsACyACKAIQIYUDQQEhhgMghQMghgNqIYcDIAIghwM2AhAMAAsACyACKAIUIYgDIAIoAhQhiQMgiAMgiQNsIYoDIAIoArQBIYsDQQIhjAMgigMgjAN0IY0DIIsDII0DaiGOAyACII4DNgK0ASACKAIYIY8DQQEhkAMgjwMgkANqIZEDIAIgkQM2AhgMAAsACyACKAK0ASGSAyACKAKwASGTAyCSAyCTA0YhlANBASGVAyCUAyCVA3EhlgMCQCCWAw0AQYSVBSGXA0GVxgQhmANBzhohmQNB8MAEIZoDIJcDIJgDIJkDIJoDEAAAC0HQASGbAyACIJsDaiGcAyCcAyQADwvFAQEZfyMAIQFBECECIAEgAmshAyADIAA2AgxBACEEIAMgBDYCCAJAA0AgAygCCCEFQQghBiAFIAZIIQdBASEIIAcgCHEhCSAJRQ0BIAMoAgwhCkEEIQsgCiALaiEMIAMoAgghDUEEIQ4gDSAOdCEPIAwgD2ohECAQKAIIIRFBACESIBIgEUYhE0EBIRQgEyAUcSEVAkAgFUUNAAwCCyADKAIIIRZBASEXIBYgF2ohGCADIBg2AggMAAsACyADKAIIIRkgGQ8L5AIBK38jACECQSAhAyACIANrIQQgBCQAIAQgADYCGCAEIAE2AhQgBCgCFCEFQQghBiAFIAZMIQdBASEIIAcgCHEhCQJAIAkNAEGRywUhCkGVxgQhC0HWGSEMQaPCBSENIAogCyAMIA0QAAALQQAhDiAEIA42AhACQAJAA0AgBCgCECEPIAQoAhQhECAPIBBIIRFBASESIBEgEnEhEyATRQ0BIAQoAhghFEEEIRUgFCAVaiEWIAQoAhAhF0EEIRggFyAYdCEZIBYgGWohGiAEIBo2AgwgBCgCDCEbIBsQngEhHEEBIR0gHCAdcSEeAkAgHg0AQQAhH0EBISAgHyAgcSEhIAQgIToAHwwDCyAEKAIQISJBASEjICIgI2ohJCAEICQ2AhAMAAsAC0EBISVBASEmICUgJnEhJyAEICc6AB8LIAQtAB8hKEEBISkgKCApcSEqQSAhKyAEICtqISwgLCQAICoPC7cCASZ/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgwgBCABNgIIIAQoAgghBUEAIQYgBSAGSiEHQQEhCCAHIAhxIQkCQAJAIAlFDQAgBCgCCCEKQQghCyAKIAtMIQxBASENIAwgDXEhDiAODQELQbenBiEPQZXGBCEQQaAoIRFBl8EEIRIgDyAQIBEgEhAAAAsQCCAEKAIMIRNBBCEUIBMgFGohFSAEKAIIIRZBECEXIBUgFiAXIBcQnwEhGCAEIBg2AgQgBCgCDCEZQQQhGiAZIBpqIRsgBCgCBCEcQQQhHSAcIB10IR4gGyAeaiEfIAQgHzYCACAEKAIAISAgICgCACEhIAQoAgAhIiAiKAIEISMgBCgCACEkICQoAgghJSAhICMgJRAJQRAhJiAEICZqIScgJyQADwthAQp/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEIAQQoAIhBSADIAU2AgggAygCCCEGIAMoAgwhByAGIAcQggEgAygCCCEIQRAhCSADIAlqIQogCiQAIAgPC6gEAUd/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgggAygCCCEEIAQoAgAhBUEAIQYgBSAGSiEHQQEhCCAHIAhxIQkCQCAJDQBB2eQFIQpBlcYEIQtBrxkhDEG59wQhDSAKIAsgDCANEAAACyADKAIIIQ4gDigCBCEPQQAhECAPIBBKIRFBASESIBEgEnEhEwJAIBMNAEGi4wUhFEGVxgQhFUGwGSEWQbn3BCEXIBQgFSAWIBcQAAALIAMoAgghGCAYKAIIIRlBACEaIBkgGkchG0EBIRwgGyAccSEdAkAgHQ0AQeL7BSEeQZXGBCEfQbEZISBBufcEISEgHiAfICAgIRAAAAsgAygCCCEiICIoAgwhI0EAISQgIyAkSyElQQEhJiAlICZxIScCQCAnDQBB9OUFIShBlcYEISlBshkhKkG59wQhKyAoICkgKiArEAAACyADKAIIISwgLCgCACEtIAMoAgghLiAuKAIEIS8gLSAvbCEwQQIhMSAwIDF0ITIgAyAyNgIEIAMoAgQhMyADKAIIITQgNCgCDCE1IDMgNUchNkEBITcgNiA3cSE4AkACQCA4RQ0AQeAAITlBASE6QQAhO0G1GSE8IDkgOiA7IDwQiAFBACE9QQEhPiA9ID5xIT8gAyA/OgAPDAELQQEhQEEBIUEgQCBBcSFCIAMgQjoADwsgAy0ADyFDQQEhRCBDIERxIUVBECFGIAMgRmohRyBHJAAgRQ8LnwMBL38jACEEQSAhBSAEIAVrIQYgBiAANgIcIAYgATYCGCAGIAI2AhQgBiADNgIQQf////8HIQcgBiAHNgIMQQAhCCAGIAg2AghBACEJIAYgCTYCBAJAA0AgBigCBCEKIAYoAhghCyAKIAtIIQxBASENIAwgDXEhDiAORQ0BIAYoAhwhDyAGKAIEIRBBBCERIBAgEXQhEiAPIBJqIRMgEygCACEUIAYoAhwhFSAGKAIEIRZBBCEXIBYgF3QhGCAVIBhqIRkgGSgCBCEaIBQgGmwhGyAGKAIUIRwgBigCECEdIBwgHWwhHiAbIB5rIR8gBiAfNgIAIAYoAgAhIEEAISEgICAhSCEiQQEhIyAiICNxISQCQCAkRQ0AIAYoAgAhJUEAISYgJiAlayEnIAYgJzYCAAsgBigCACEoIAYoAgwhKSAoIClIISpBASErICogK3EhLAJAICxFDQAgBigCACEtIAYgLTYCDCAGKAIEIS4gBiAuNgIICyAGKAIEIS9BASEwIC8gMGohMSAGIDE2AgQMAAsACyAGKAIIITIgMg8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUH83QAhBkHnkgUhByAEIAUgBiAHEAAAC0EAIQggCA8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUGL3gAhBkGwggUhByAEIAUgBiAHEAAAC0EAIQggCA8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUGa3gAhBkGo+AQhByAEIAUgBiAHEAAAC0EAIQggCA8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUGo3gAhBkGG+AQhByAEIAUgBiAHEAAAC0EAIQggCA8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUHK3gAhBkH9kgUhByAEIAUgBiAHEAAAC0EAIQggCA8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUHT3gAhBkHegwQhByAEIAUgBiAHEAAAC0EAIQggCA8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUHl3gAhBkG1ggQhByAEIAUgBiAHEAAAC0EAIQggCA8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUH03gAhBkGugwQhByAEIAUgBiAHEAAAC0EAIQggCA8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUGC3wAhBkHxggQhByAEIAUgBiAHEAAAC0EAIQggCA8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUGU3wAhBkHSkgUhByAEIAUgBiAHEAAAC0EAIQggCA8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUGd3wAhBkGbggQhByAEIAUgBiAHEAAAC0EAIQggCA8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUGs3wAhBkGTgwQhByAEIAUgBiAHEAAAC0EAIQggCA8LTQEJf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUG63wAhBkHQggQhByAEIAUgBiAHEAAAC0EAIQggCA8LVgEKf0EAIQAgAC0A9MMHIQFBASECIAEgAnEhAwJAIAMNAEHcmQUhBEGVxgQhBUHD3wAhBkH8tAQhByAEIAUgBiAHEAAAC0EAIQggCCgCiNgHIQkgCQ8L5QQBTX8jACEBQfAAIQIgASACayEDIAMkACADIAA2AmwgAygCbCEEQQAhBSAEIAVHIQZBASEHIAYgB3EhCAJAIAgNAEHVwwUhCUHSxQQhCkGejAEhC0HkuwQhDCAJIAogCyAMEAAACyADKAJsIQ0gDSgCACEOAkACQCAODQAgAygCbCEPIA8oAmAhECAQRQ0BC0Gy1AYhEUHSxQQhEkGfjAEhE0HkuwQhFCARIBIgEyAUEAAACyADKAJsIRUgFSgCMCEWQQAhFyAWIBdHIRhBASEZIBggGXEhGgJAAkAgGkUNACADKAJsIRsgGygCNCEcQQAhHSAcIB1HIR5BASEfIB4gH3EhICAgDQELIAMoAmwhISAhKAIwISJBACEjICIgI0chJEEBISUgJCAlcSEmAkAgJg0AIAMoAmwhJyAnKAI0IShBACEpICggKUchKkEBISsgKiArcSEsICxFDQELQaiLBiEtQdLFBCEuQaCMASEvQeS7BCEwIC0gLiAvIDAQAAALQZDuByExQeQRITIgMSAyEK8BIAMoAmwhM0EIITQgAyA0aiE1IDUhNiA2IDMQsAFB5AAhN0GU7gchOEEIITkgAyA5aiE6IDggOiA3EPcCGkGQ7gchO0GgASE8IDsgPGohPUEEIT4gOyA+aiE/ID0gPxCxAUGQ7gchQEEEIUEgQCBBaiFCIEIQsgFBASFDQQAhRCBEIEM2AvjuB0EBIUVBACFGIEYgRToAhPQHQZDuByFHQQQhSCBHIEhqIUkgSRCzAUEBIUpBACFLIEsgSjoAkO4HQfAAIUwgAyBMaiFNIE0kAA8LvAEBFn8jACECQRAhAyACIANrIQQgBCQAIAQgADYCDCAEIAE2AgggBCgCDCEFQQAhBiAFIAZHIQdBASEIIAcgCHEhCQJAAkAgCUUNACAEKAIIIQpBACELIAogC0shDEEBIQ0gDCANcSEOIA4NAQtB6dMGIQ9B0sUEIRBBqzAhEUHauwQhEiAPIBAgESASEAAACyAEKAIMIRMgBCgCCCEUQQAhFSATIBUgFBD4AhpBECEWIAQgFmohFyAXJAAPC5kFAUN/IwAhAkEQIQMgAiADayEEIAQkACAEIAE2AgwgBCgCDCEFQeQAIQYgACAFIAYQ9wIaIAAoAkQhBwJAAkAgBw0AQRchCCAIIQkMAQsgACgCRCEKIAohCQsgCSELIAAgCzYCRCAAKAJIIQwCQAJAIAwNAEEsIQ0gDSEODAELIAAoAkghDyAPIQ4LIA4hECAAIBA2AkggACgCTCERAkACQCARDQBBASESIBIhEwwBCyAAKAJMIRQgFCETCyATIRUgACAVNgJMIAAoAgQhFgJAAkAgFg0AQYABIRcgFyEYDAELIAAoAgQhGSAZIRgLIBghGiAAIBo2AgQgACgCCCEbAkACQCAbDQBBgAEhHCAcIR0MAQsgACgCCCEeIB4hHQsgHSEfIAAgHzYCCCAAKAIMISACQAJAICANAEHAACEhICEhIgwBCyAAKAIMISMgIyEiCyAiISQgACAkNgIMIAAoAhAhJQJAAkAgJQ0AQSAhJiAmIScMAQsgACgCECEoICghJwsgJyEpIAAgKTYCECAAKAIUISoCQAJAICoNAEHAACErICshLAwBCyAAKAIUIS0gLSEsCyAsIS4gACAuNgIUIAAoAhghLwJAAkAgLw0AQRAhMCAwITEMAQsgACgCGCEyIDIhMQsgMSEzIAAgMzYCGCAAKAIcITQCQAJAIDQNAEGAgIACITUgNSE2DAELIAAoAhwhNyA3ITYLIDYhOCAAIDg2AhwgACgCICE5AkACQCA5DQBBgAghOiA6ITsMAQsgACgCICE8IDwhOwsgOyE9IAAgPTYCICAAKAIsIT4CQAJAID4NAEGACCE/ID8hQAwBCyAAKAIsIUEgQSFACyBAIUIgACBCNgIsQRAhQyAEIENqIUQgRCQADwv3DAG9AX8jACECQSAhAyACIANrIQQgBCQAIAQgADYCHCAEIAE2AhggBCgCHCEFQQAhBiAFIAZHIQdBASEIIAcgCHEhCQJAIAkNAEHDvAQhCkHSxQQhC0G8/gAhDEHBqgQhDSAKIAsgDCANEAAACyAEKAIYIQ5BACEPIA4gD0chEEEBIREgECARcSESAkAgEg0AQdXDBSETQdLFBCEUQb3+ACEVQcGqBCEWIBMgFCAVIBYQAAALIAQoAhghFyAXKAIEIRhBACEZIBggGUohGkEBIRsgGiAbcSEcAkACQCAcRQ0AIAQoAhghHSAdKAIEIR5BgIAEIR8gHiAfSCEgQQEhISAgICFxISIgIg0BC0GVqQYhI0HSxQQhJEG//gAhJUHBqgQhJiAjICQgJSAmEAAACyAEKAIcIScgBCgCGCEoICgoAgQhKSAnICkQtAEgBCgCHCEqICooAgAhK0E4ISwgKyAsbCEtIAQgLTYCFCAEKAIUIS4gLhC1ASEvIAQoAhwhMCAwIC82AmAgBCgCGCExIDEoAgghMkEAITMgMiAzSiE0QQEhNSA0IDVxITYCQAJAIDZFDQAgBCgCGCE3IDcoAgghOEGAgAQhOSA4IDlIITpBASE7IDogO3EhPCA8DQELQYCrBiE9QdLFBCE+QcT+ACE/QcGqBCFAID0gPiA/IEAQAAALIAQoAhwhQUEQIUIgQSBCaiFDIAQoAhghRCBEKAIIIUUgQyBFELQBIAQoAhwhRiBGKAIQIUdBzAAhSCBHIEhsIUkgBCBJNgIQIAQoAhAhSiBKELUBIUsgBCgCHCFMIEwgSzYCZCAEKAIYIU0gTSgCDCFOQQAhTyBOIE9KIVBBASFRIFAgUXEhUgJAAkAgUkUNACAEKAIYIVMgUygCDCFUQYCABCFVIFQgVUghVkEBIVcgViBXcSFYIFgNAQtBxqgGIVlB0sUEIVpByf4AIVtBwaoEIVwgWSBaIFsgXBAAAAsgBCgCHCFdQSAhXiBdIF5qIV8gBCgCGCFgIGAoAgwhYSBfIGEQtAEgBCgCHCFiIGIoAiAhY0E8IWQgYyBkbCFlIAQgZTYCDCAEKAIMIWYgZhC1ASFnIAQoAhwhaCBoIGc2AmggBCgCGCFpIGkoAhAhakEAIWsgaiBrSiFsQQEhbSBsIG1xIW4CQAJAIG5FDQAgBCgCGCFvIG8oAhAhcEGAgAQhcSBwIHFIIXJBASFzIHIgc3EhdCB0DQELQeKpBiF1QdLFBCF2Qc7+ACF3QcGqBCF4IHUgdiB3IHgQAAALIAQoAhwheUEwIXogeSB6aiF7IAQoAhghfCB8KAIQIX0geyB9ELQBIAQoAhwhfiB+KAIwIX9ByBUhgAEgfyCAAWwhgQEgBCCBATYCCCAEKAIIIYIBIIIBELUBIYMBIAQoAhwhhAEghAEggwE2AmwgBCgCGCGFASCFASgCFCGGAUEAIYcBIIYBIIcBSiGIAUEBIYkBIIgBIIkBcSGKAQJAAkAgigFFDQAgBCgCGCGLASCLASgCFCGMAUGAgAQhjQEgjAEgjQFIIY4BQQEhjwEgjgEgjwFxIZABIJABDQELQa+qBiGRAUHSxQQhkgFB0/4AIZMBQcGqBCGUASCRASCSASCTASCUARAAAAsgBCgCHCGVAUHAACGWASCVASCWAWohlwEgBCgCGCGYASCYASgCFCGZASCXASCZARC0ASAEKAIcIZoBIJoBKAJAIZsBQbwHIZwBIJsBIJwBbCGdASAEIJ0BNgIEIAQoAgQhngEgngEQtQEhnwEgBCgCHCGgASCgASCfATYCcCAEKAIYIaEBIKEBKAIYIaIBQQAhowEgogEgowFKIaQBQQEhpQEgpAEgpQFxIaYBAkACQCCmAUUNACAEKAIYIacBIKcBKAIYIagBQYCABCGpASCoASCpAUghqgFBASGrASCqASCrAXEhrAEgrAENAQtB76cGIa0BQdLFBCGuAUHY/gAhrwFBwaoEIbABIK0BIK4BIK8BILABEAAACyAEKAIcIbEBQdAAIbIBILEBILIBaiGzASAEKAIYIbQBILQBKAIYIbUBILMBILUBELQBIAQoAhwhtgEgtgEoAlAhtwFBuAEhuAEgtwEguAFsIbkBIAQguQE2AgAgBCgCACG6ASC6ARC1ASG7ASAEKAIcIbwBILwBILsBNgJ0QSAhvQEgBCC9AWohvgEgvgEkAA8LuAMBN38jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQQgBCgCICEFQQAhBiAFIAZKIQdBASEIIAcgCHEhCQJAIAkNAEGv5AUhCkHSxQQhC0GkiwEhDEHjogQhDSAKIAsgDCANEAAAC0EAIQ4gDigC8P8HIQ9BACEQIBAgD0YhEUEBIRIgESAScSETAkAgEw0AQYGqBCEUQdLFBCEVQaWLASEWQeOiBCEXIBQgFSAWIBcQAAALQQAhGCAYKALo/wchGUEAIRogGiAZRiEbQQEhHCAbIBxxIR0CQCAdDQBB28MEIR5B0sUEIR9BposBISBB46IEISEgHiAfICAgIRAAAAtBACEiICIoAuz/ByEjQQAhJCAkICNGISVBASEmICUgJnEhJwJAICcNAEGzsQQhKEHSxQQhKUGniwEhKkHjogQhKyAoICkgKiArEAAACyADKAIMISwgLCgCICEtQQAhLiAuIC02Auj/B0EAIS8gLygC6P8HITBBAyExIDAgMXQhMiADIDI2AgggAygCCCEzIDMQtQEhNEEAITUgNSA0NgLw/wdBECE2IAMgNmohNyA3JAAPCzoBBn8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQQgBBC2AUEQIQUgAyAFaiEGIAYkAA8L6AMBO38jACECQRAhAyACIANrIQQgBCQAIAQgADYCDCAEIAE2AgggBCgCDCEFQQAhBiAFIAZHIQdBASEIIAcgCHEhCQJAAkAgCUUNACAEKAIIIQpBASELIAogC04hDEEBIQ0gDCANcSEOIA4NAQtBvdIGIQ9B0sUEIRBBz/0AIRFB+cMEIRIgDyAQIBEgEhAAAAsgBCgCCCETQQEhFCATIBRqIRUgBCgCDCEWIBYgFTYCACAEKAIMIRdBACEYIBcgGDYCBCAEKAIMIRkgGSgCACEaQQIhGyAaIBt0IRwgBCAcNgIEIAQoAgQhHSAdELUBIR4gBCgCDCEfIB8gHjYCCCAEKAIIISBBAiEhICAgIXQhIiAiELUBISMgBCgCDCEkICQgIzYCDCAEKAIMISUgJSgCACEmQQEhJyAmICdrISggBCAoNgIAAkADQCAEKAIAISlBASEqICkgKk4hK0EBISwgKyAscSEtIC1FDQEgBCgCACEuIAQoAgwhLyAvKAIMITAgBCgCDCExIDEoAgQhMkEBITMgMiAzaiE0IDEgNDYCBEECITUgMiA1dCE2IDAgNmohNyA3IC42AgAgBCgCACE4QX8hOSA4IDlqITogBCA6NgIADAALAAtBECE7IAQgO2ohPCA8JAAPC2EBCn8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQQgBBC0AiEFIAMgBTYCCCADKAIIIQYgAygCDCEHIAYgBxCvASADKAIIIQhBECEJIAMgCWohCiAKJAAgCA8LzQEBF38jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDEEBIQRBACEFIAUgBDoAsPkHAkADQBAsIQYgBkUNAQwACwALELUCQQEhB0GQ7gchCEGgCyEJIAggCWohCkEEIQsgCiALaiEMIAcgDBAtQQAhDSANKAK0+QchDiAOEC4QLCEPAkAgD0UNAEGA9gUhEEHSxQQhEUGjwQAhEkHYlAUhEyAQIBEgEiATEAAAC0H1GSEUQQEhFSAUIBUQLxCJAkEQIRYgAyAWaiEXIBckAA8LSwEIf0GQ7gchAEGgASEBIAAgAWohAiACELgBELkBELoBQZDuByEDQaABIQQgAyAEaiEFIAUQuwFBkO4HIQZB5BEhByAGIAcQrwEPC+MNAcsBfyMAIQFBwAAhAiABIAJrIQMgAyQAIAMgADYCPEEBIQQgAyAENgI4AkADQCADKAI4IQUgAygCPCEGIAYoAgAhByAFIAdIIQhBASEJIAggCXEhCiAKRQ0BIAMoAjwhCyALKAJgIQwgAygCOCENQTghDiANIA5sIQ8gDCAPaiEQIBAoAgQhESADIBE2AjQgAygCNCESQQIhEyASIBNGIRRBASEVIBQgFXEhFgJAAkAgFg0AIAMoAjQhF0EDIRggFyAYRiEZQQEhGiAZIBpxIRsgG0UNAQsgAygCPCEcIBwoAmAhHSADKAI4IR5BOCEfIB4gH2whICAdICBqISEgIRC8AQsgAygCOCEiQQEhIyAiICNqISQgAyAkNgI4DAALAAtBASElIAMgJTYCMAJAA0AgAygCMCEmIAMoAjwhJyAnKAIQISggJiAoSCEpQQEhKiApICpxISsgK0UNASADKAI8ISwgLCgCZCEtIAMoAjAhLkHMACEvIC4gL2whMCAtIDBqITEgMSgCBCEyIAMgMjYCLCADKAIsITNBAiE0IDMgNEYhNUEBITYgNSA2cSE3AkACQCA3DQAgAygCLCE4QQMhOSA4IDlGITpBASE7IDogO3EhPCA8RQ0BCyADKAI8IT0gPSgCZCE+IAMoAjAhP0HMACFAID8gQGwhQSA+IEFqIUIgQhC9AQsgAygCMCFDQQEhRCBDIERqIUUgAyBFNgIwDAALAAtBASFGIAMgRjYCKAJAA0AgAygCKCFHIAMoAjwhSCBIKAIgIUkgRyBJSCFKQQEhSyBKIEtxIUwgTEUNASADKAI8IU0gTSgCaCFOIAMoAighT0E8IVAgTyBQbCFRIE4gUWohUiBSKAIEIVMgAyBTNgIkIAMoAiQhVEECIVUgVCBVRiFWQQEhVyBWIFdxIVgCQAJAIFgNACADKAIkIVlBAyFaIFkgWkYhW0EBIVwgWyBccSFdIF1FDQELIAMoAjwhXiBeKAJoIV8gAygCKCFgQTwhYSBgIGFsIWIgXyBiaiFjIGMQvgELIAMoAighZEEBIWUgZCBlaiFmIAMgZjYCKAwACwALQQEhZyADIGc2AiACQANAIAMoAiAhaCADKAI8IWkgaSgCMCFqIGggakgha0EBIWwgayBscSFtIG1FDQEgAygCPCFuIG4oAmwhbyADKAIgIXBByBUhcSBwIHFsIXIgbyByaiFzIHMoAgQhdCADIHQ2AhwgAygCHCF1QQIhdiB1IHZGIXdBASF4IHcgeHEheQJAAkAgeQ0AIAMoAhwhekEDIXsgeiB7RiF8QQEhfSB8IH1xIX4gfkUNAQsgAygCPCF/IH8oAmwhgAEgAygCICGBAUHIFSGCASCBASCCAWwhgwEggAEggwFqIYQBIIQBEL8BCyADKAIgIYUBQQEhhgEghQEghgFqIYcBIAMghwE2AiAMAAsAC0EBIYgBIAMgiAE2AhgCQANAIAMoAhghiQEgAygCPCGKASCKASgCQCGLASCJASCLAUghjAFBASGNASCMASCNAXEhjgEgjgFFDQEgAygCPCGPASCPASgCcCGQASADKAIYIZEBQbwHIZIBIJEBIJIBbCGTASCQASCTAWohlAEglAEoAgQhlQEgAyCVATYCFCADKAIUIZYBQQIhlwEglgEglwFGIZgBQQEhmQEgmAEgmQFxIZoBAkACQCCaAQ0AIAMoAhQhmwFBAyGcASCbASCcAUYhnQFBASGeASCdASCeAXEhnwEgnwFFDQELIAMoAjwhoAEgoAEoAnAhoQEgAygCGCGiAUG8ByGjASCiASCjAWwhpAEgoQEgpAFqIaUBIKUBEMABCyADKAIYIaYBQQEhpwEgpgEgpwFqIagBIAMgqAE2AhgMAAsAC0EBIakBIAMgqQE2AhACQANAIAMoAhAhqgEgAygCPCGrASCrASgCUCGsASCqASCsAUghrQFBASGuASCtASCuAXEhrwEgrwFFDQEgAygCPCGwASCwASgCdCGxASADKAIQIbIBQbgBIbMBILIBILMBbCG0ASCxASC0AWohtQEgtQEoAgQhtgEgAyC2ATYCDCADKAIMIbcBQQIhuAEgtwEguAFGIbkBQQEhugEguQEgugFxIbsBAkACQCC7AQ0AIAMoAgwhvAFBAyG9ASC8ASC9AUYhvgFBASG/ASC+ASC/AXEhwAEgwAFFDQELIAMoAjwhwQEgwQEoAnQhwgEgAygCECHDAUG4ASHEASDDASDEAWwhxQEgwgEgxQFqIcYBIMYBEMEBCyADKAIQIccBQQEhyAEgxwEgyAFqIckBIAMgyQE2AhAMAAsAC0HAACHKASADIMoBaiHLASDLASQADwsGABDCAQ8LdQEOf0EAIQAgACgC8P8HIQFBACECIAIgAUchA0EBIQQgAyAEcSEFAkAgBQ0AQaGqBCEGQdLFBCEHQa6LASEIQf6iBCEJIAYgByAIIAkQAAALQQAhCiAKKALw/wchCyALEMMBQQAhDEEAIQ0gDSAMNgLw/wcPC9QDATZ/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEQQAhBSAEIAVHIQZBASEHIAYgB3EhCAJAIAgNAEHDvAQhCUHSxQQhCkHf/gAhC0HRqgQhDCAJIAogCyAMEAAACyADKAIMIQ0gDSgCdCEOIA4QwwEgAygCDCEPQQAhECAPIBA2AnQgAygCDCERIBEoAnAhEiASEMMBIAMoAgwhE0EAIRQgEyAUNgJwIAMoAgwhFSAVKAJsIRYgFhDDASADKAIMIRdBACEYIBcgGDYCbCADKAIMIRkgGSgCaCEaIBoQwwEgAygCDCEbQQAhHCAbIBw2AmggAygCDCEdIB0oAmQhHiAeEMMBIAMoAgwhH0EAISAgHyAgNgJkIAMoAgwhISAhKAJgISIgIhDDASADKAIMISNBACEkICMgJDYCYCADKAIMISVB0AAhJiAlICZqIScgJxDEASADKAIMIShBwAAhKSAoIClqISogKhDEASADKAIMIStBMCEsICsgLGohLSAtEMQBIAMoAgwhLkEgIS8gLiAvaiEwIDAQxAEgAygCDCExQRAhMiAxIDJqITMgMxDEASADKAIMITQgNBDEAUEQITUgAyA1aiE2IDYkAA8LOgEGfyMAIQFBECECIAEgAmshAyADJAAgAyAANgIMIAMoAgwhBCAEEMoCQRAhBSADIAVqIQYgBiQADws6AQZ/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEIAQQywJBECEFIAMgBWohBiAGJAAPCzoBBn8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQQgBBDMAkEQIQUgAyAFaiEGIAYkAA8LOgEGfyMAIQFBECECIAEgAmshAyADJAAgAyAANgIMIAMoAgwhBCAEEM0CQRAhBSADIAVqIQYgBiQADws6AQZ/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEIAQQzgJBECEFIAMgBWohBiAGJAAPCzoBBn8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQQgBBDPAkEQIQUgAyAFaiEGIAYkAA8LlAEBEn9BACEAIAAtALD5ByEBQQEhAiABIAJxIQMCQCADDQBB6JkFIQRB0sUEIQVBrsEAIQZB7ZQFIQcgBCAFIAYgBxAAAAtBACEIIAgoArT5ByEJAkAgCUUNAEEBIQpBkO4HIQtBoAshDCALIAxqIQ1BBCEOIA0gDmohDyAKIA8QTAtBACEQQQAhESARIBA6ALD5Bw8LlAEBEX8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDEEAIQQgBCgCyO4HIQVBACEGIAUgBkchB0EBIQggByAIcSEJAkACQCAJRQ0AQQAhCiAKKALI7gchCyADKAIMIQxBACENIA0oAszuByEOIAwgDiALEQMADAELIAMoAgwhDyAPEIwDC0EQIRAgAyAQaiERIBEkAA8L/wIBLn8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQRBACEFIAQgBUchBkEBIQcgBiAHcSEIAkAgCA0AQZPEBCEJQdLFBCEKQd/9ACELQYfEBCEMIAkgCiALIAwQAAALIAMoAgwhDSANKAIMIQ5BACEPIA4gD0chEEEBIREgECARcSESAkAgEg0AQdXiBCETQdLFBCEUQeD9ACEVQYfEBCEWIBMgFCAVIBYQAAALIAMoAgwhFyAXKAIMIRggGBDDASADKAIMIRlBACEaIBkgGjYCDCADKAIMIRsgGygCCCEcQQAhHSAcIB1HIR5BASEfIB4gH3EhIAJAICANAEGioQQhIUHSxQQhIkHj/QAhI0GHxAQhJCAhICIgIyAkEAAACyADKAIMISUgJSgCCCEmICYQwwEgAygCDCEnQQAhKCAnICg2AgggAygCDCEpQQAhKiApICo2AgAgAygCDCErQQAhLCArICw2AgRBECEtIAMgLWohLiAuJAAPC1YBCn9BACEAIAAtAJDuByEBQQEhAiABIAJxIQMCQCADDQBB9ZkFIQRB0sUEIQVBvYwBIQZBx5QFIQcgBCAFIAYgBxAAAAtBACEIIAgoAqjwByEJIAkPC8UCASN/IwAhBEEgIQUgBCAFayEGIAYkACAGIAA2AhwgBiABNgIYIAYgAjYCFCAGIAM2AhBBACEHIAcoAtDuByEIQQAhCSAIIAlHIQpBASELIAogC3EhDAJAAkAgDEUNAEEAIQ0gBiANNgIMQdLFBCEOIAYgDjYCDCAGKAIUIQ9BACEQIBAgD0YhEUEBIRIgESAScSETAkAgE0UNACAGKAIcIRRBwO8GIRVBAiEWIBQgFnQhFyAVIBdqIRggGCgCACEZIAYgGTYCFAtBACEaIBooAtDuByEbIAYoAhghHCAGKAIcIR0gBigCFCEeIAYoAhAhHyAGKAIMISBBACEhICEoAtTuByEiQZzHBCEjICMgHCAdIB4gHyAgICIgGxEKAAwBCyAGKAIYISQCQCAkDQAQ9gIACwtBICElIAYgJWohJiAmJAAPC/QBAR9/IwAhAEEQIQEgACABayECIAIkAEGQ7gchA0GgASEEIAMgBGohBSAFEMgBIQYgAiAGNgIIIAIoAgghB0EAIQggCCAHRyEJQQEhCiAJIApxIQsCQAJAIAtFDQBBACEMIAwoApDwByENIAIoAgghDkE4IQ8gDiAPbCEQIA0gEGohESACKAIIIRJBkO4HIRNBoAEhFCATIBRqIRUgFSARIBIQyQEhFiACIBY2AgwMAQtBACEXIAIgFzYCDEHcACEYQQEhGUEAIRpBqYkBIRsgGCAZIBogGxDGAQsgAigCDCEcQRAhHSACIB1qIR4gHiQAIBwPC9oDATp/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgggAygCCCEEQQAhBSAEIAVHIQZBASEHIAYgB3EhCAJAIAgNAEGTxAQhCUHSxQQhCkHr/QAhC0HEgQQhDCAJIAogCyAMEAAACyADKAIIIQ0gDSgCDCEOQQAhDyAOIA9HIRBBASERIBAgEXEhEgJAIBINAEHV4gQhE0HSxQQhFEHs/QAhFUHEgQQhFiATIBQgFSAWEAAACyADKAIIIRcgFygCBCEYQQAhGSAYIBlKIRpBASEbIBogG3EhHAJAAkAgHEUNACADKAIIIR0gHSgCDCEeIAMoAgghHyAfKAIEISBBfyEhICAgIWohIiAfICI2AgRBAiEjICIgI3QhJCAeICRqISUgJSgCACEmIAMgJjYCBCADKAIEISdBACEoICcgKEohKUEBISogKSAqcSErAkACQCArRQ0AIAMoAgQhLCADKAIIIS0gLSgCACEuICwgLkghL0EBITAgLyAwcSExIDENAQtBn50GITJB0sUEITNB7/0AITRBxIEEITUgMiAzIDQgNRAAAAsgAygCBCE2IAMgNjYCDAwBC0EAITcgAyA3NgIMCyADKAIMIThBECE5IAMgOWohOiA6JAAgOA8LuwQBRH8jACEDQRAhBCADIARrIQUgBSQAIAUgADYCDCAFIAE2AgggBSACNgIEIAUoAgwhBkEAIQcgBiAHRyEIQQEhCSAIIAlxIQoCQAJAIApFDQAgBSgCDCELIAsoAgghDEEAIQ0gDCANRyEOQQEhDyAOIA9xIRAgEA0BC0GaoQQhEUHSxQQhEkH6/gAhE0H2wwUhFCARIBIgEyAUEAAACyAFKAIEIRVBACEWIBUgFkohF0EBIRggFyAYcSEZAkACQCAZRQ0AIAUoAgQhGiAFKAIMIRsgGygCACEcIBogHEghHUEBIR4gHSAecSEfIB8NAQtBzZ0GISBB0sUEISFB+/4AISJB9sMFISMgICAhICIgIxAAAAsgBSgCCCEkICQoAgAhJQJAICVFDQBBmtQFISZB0sUEISdB/P4AIShB9sMFISkgJiAnICggKRAAAAsgBSgCCCEqICooAgQhKwJAICtFDQBBt9EFISxB0sUEIS1B/f4AIS5B9sMFIS8gLCAtIC4gLxAAAAsgBSgCDCEwIDAoAgghMSAFKAIEITJBAiEzIDIgM3QhNCAxIDRqITUgNSgCACE2QQEhNyA2IDdqITggNSA4NgIAIAUgODYCACAFKAIAITlBECE6IDkgOnQhOyAFKAIEITxB//8DIT0gPCA9cSE+IDsgPnIhPyAFKAIIIUAgQCA/NgIAIAUoAgghQUEBIUIgQSBCNgIEIAUoAgghQyBDKAIAIURBECFFIAUgRWohRiBGJAAgRA8LiwIBI38jACEAQRAhASAAIAFrIQIgAiQAQZDuByEDQaABIQQgAyAEaiEFQTAhBiAFIAZqIQcgBxDIASEIIAIgCDYCCCACKAIIIQlBACEKIAogCUchC0EBIQwgCyAMcSENAkACQCANRQ0AQQAhDiAOKAKc8AchDyACKAIIIRBByBUhESAQIBFsIRIgDyASaiETIAIoAgghFEGQ7gchFUGgASEWIBUgFmohF0EwIRggFyAYaiEZIBkgEyAUEMkBIRogAiAaNgIMDAELQQAhGyACIBs2AgxB3wAhHEEBIR1BACEeQc2JASEfIBwgHSAeIB8QxgELIAIoAgwhIEEQISEgAiAhaiEiICIkACAgDwuNAgEjfyMAIQBBECEBIAAgAWshAiACJABBkO4HIQNBoAEhBCADIARqIQVBwAAhBiAFIAZqIQcgBxDIASEIIAIgCDYCCCACKAIIIQlBACEKIAogCUchC0EBIQwgCyAMcSENAkACQCANRQ0AQQAhDiAOKAKg8AchDyACKAIIIRBBvAchESAQIBFsIRIgDyASaiETIAIoAgghFEGQ7gchFUGgASEWIBUgFmohF0HAACEYIBcgGGohGSAZIBMgFBDJASEaIAIgGjYCDAwBC0EAIRsgAiAbNgIMQeAAIRxBASEdQQAhHkHZiQEhHyAcIB0gHiAfEMYBCyACKAIMISBBECEhIAIgIWohIiAiJAAgIA8LzgEBFn8jACECQRAhAyACIANrIQQgBCQAIAQgADYCCCAEIAE2AgQgBCgCBCEFQQAhBiAGIAVHIQdBASEIIAcgCHEhCQJAAkAgCUUNACAEKAIIIQogBCgCBCELIAogCxDNASEMIAQgDDYCACAEKAIAIQ0gDSgCACEOIAQoAgQhDyAOIA9GIRBBASERIBAgEXEhEgJAIBJFDQAgBCgCACETIAQgEzYCDAwCCwtBACEUIAQgFDYCDAsgBCgCDCEVQRAhFiAEIBZqIRcgFyQAIBUPC9UCASp/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgwgBCABNgIIIAQoAgwhBUEAIQYgBSAGRyEHQQEhCCAHIAhxIQkCQAJAIAlFDQAgBCgCCCEKQQAhCyALIApHIQxBASENIAwgDXEhDiAODQELQdiiBiEPQdLFBCEQQY3/ACERQb+YBCESIA8gECARIBIQAAALIAQoAgghEyATEM4BIRQgBCAUNgIEIAQoAgQhFUEAIRYgFSAWSiEXQQEhGCAXIBhxIRkCQAJAIBlFDQAgBCgCBCEaIAQoAgwhGyAbKAIAIRwgGiAcSCEdQQEhHiAdIB5xIR8gHw0BC0H1ngYhIEHSxQQhIUGP/wAhIkG/mAQhIyAgICEgIiAjEAAACyAEKAIMISQgJCgCYCElIAQoAgQhJkE4IScgJiAnbCEoICUgKGohKUEQISogBCAqaiErICskACApDwuZAQESfyMAIQFBECECIAEgAmshAyADJAAgAyAANgIMIAMoAgwhBEH//wMhBSAEIAVxIQYgAyAGNgIIIAMoAgghB0EAIQggCCAHRyEJQQEhCiAJIApxIQsCQCALDQBBsoEEIQxB0sUEIQ1Bh/8AIQ5Bo4EEIQ8gDCANIA4gDxAAAAsgAygCCCEQQRAhESADIBFqIRIgEiQAIBAPC84BARZ/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgggBCABNgIEIAQoAgQhBUEAIQYgBiAFRyEHQQEhCCAHIAhxIQkCQAJAIAlFDQAgBCgCCCEKIAQoAgQhCyAKIAsQ0AEhDCAEIAw2AgAgBCgCACENIA0oAgAhDiAEKAIEIQ8gDiAPRiEQQQEhESAQIBFxIRICQCASRQ0AIAQoAgAhEyAEIBM2AgwMAgsLQQAhFCAEIBQ2AgwLIAQoAgwhFUEQIRYgBCAWaiEXIBckACAVDwvWAgEqfyMAIQJBECEDIAIgA2shBCAEJAAgBCAANgIMIAQgATYCCCAEKAIMIQVBACEGIAUgBkchB0EBIQggByAIcSEJAkACQCAJRQ0AIAQoAgghCkEAIQsgCyAKRyEMQQEhDSAMIA1xIQ4gDg0BC0G5ogYhD0HSxQQhEEGU/wAhEUHrmAQhEiAPIBAgESASEAAACyAEKAIIIRMgExDOASEUIAQgFDYCBCAEKAIEIRVBACEWIBUgFkohF0EBIRggFyAYcSEZAkACQCAZRQ0AIAQoAgQhGiAEKAIMIRsgGygCECEcIBogHEghHUEBIR4gHSAecSEfIB8NAQtBoqAGISBB0sUEISFBlv8AISJB65gEISMgICAhICIgIxAAAAsgBCgCDCEkICQoAmQhJSAEKAIEISZBzAAhJyAmICdsISggJSAoaiEpQRAhKiAEICpqISsgKyQAICkPC84BARZ/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgggBCABNgIEIAQoAgQhBUEAIQYgBiAFRyEHQQEhCCAHIAhxIQkCQAJAIAlFDQAgBCgCCCEKIAQoAgQhCyAKIAsQ0gEhDCAEIAw2AgAgBCgCACENIA0oAgAhDiAEKAIEIQ8gDiAPRiEQQQEhESAQIBFxIRICQCASRQ0AIAQoAgAhEyAEIBM2AgwMAgsLQQAhFCAEIBQ2AgwLIAQoAgwhFUEQIRYgBCAWaiEXIBckACAVDwvVAgEqfyMAIQJBECEDIAIgA2shBCAEJAAgBCAANgIMIAQgATYCCCAEKAIMIQVBACEGIAUgBkchB0EBIQggByAIcSEJAkACQCAJRQ0AIAQoAgghCkEAIQsgCyAKRyEMQQEhDSAMIA1xIQ4gDg0BC0H7oQYhD0HSxQQhEEGb/wAhEUGwmAQhEiAPIBAgESASEAAACyAEKAIIIRMgExDOASEUIAQgFDYCBCAEKAIEIRVBACEWIBUgFkohF0EBIRggFyAYcSEZAkACQCAZRQ0AIAQoAgQhGiAEKAIMIRsgGygCICEcIBogHEghHUEBIR4gHSAecSEfIB8NAQtBu54GISBB0sUEISFBnf8AISJBsJgEISMgICAhICIgIxAAAAsgBCgCDCEkICQoAmghJSAEKAIEISZBPCEnICYgJ2whKCAlIChqISlBECEqIAQgKmohKyArJAAgKQ8LlQIBH38jACECQRAhAyACIANrIQQgBCQAIAQgADYCCCAEIAE2AgQgBCgCCCEFQQAhBiAFIAZHIQdBASEIIAcgCHEhCQJAIAkNAEHDvAQhCkHSxQQhC0HW/wAhDEHQuQQhDSAKIAsgDCANEAAACyAEKAIEIQ5BACEPIA8gDkchEEEBIREgECARcSESAkACQCASRQ0AIAQoAgghEyAEKAIEIRQgEyAUENQBIRUgBCAVNgIAIAQoAgAhFiAWKAIAIRcgBCgCBCEYIBcgGEYhGUEBIRogGSAacSEbAkAgG0UNACAEKAIAIRwgBCAcNgIMDAILC0EAIR0gBCAdNgIMCyAEKAIMIR5BECEfIAQgH2ohICAgJAAgHg8L1gIBKn8jACECQRAhAyACIANrIQQgBCQAIAQgADYCDCAEIAE2AgggBCgCDCEFQQAhBiAFIAZHIQdBASEIIAcgCHEhCQJAAkAgCUUNACAEKAIIIQpBACELIAsgCkchDEEBIQ0gDCANcSEOIA4NAQtB96IGIQ9B0sUEIRBBov8AIRFBzZgEIRIgDyAQIBEgEhAAAAsgBCgCCCETIBMQzgEhFCAEIBQ2AgQgBCgCBCEVQQAhFiAVIBZKIRdBASEYIBcgGHEhGQJAAkAgGUUNACAEKAIEIRogBCgCDCEbIBsoAjAhHCAaIBxIIR1BASEeIB0gHnEhHyAfDQELQa6fBiEgQdLFBCEhQaT/ACEiQc2YBCEjICAgISAiICMQAAALIAQoAgwhJCAkKAJsISUgBCgCBCEmQcgVIScgJiAnbCEoICUgKGohKUEQISogBCAqaiErICskACApDwuVAgEffyMAIQJBECEDIAIgA2shBCAEJAAgBCAANgIIIAQgATYCBCAEKAIIIQVBACEGIAUgBkchB0EBIQggByAIcSEJAkAgCQ0AQcO8BCEKQdLFBCELQeH/ACEMQdz9BCENIAogCyAMIA0QAAALIAQoAgQhDkEAIQ8gDyAORyEQQQEhESAQIBFxIRICQAJAIBJFDQAgBCgCCCETIAQoAgQhFCATIBQQ1gEhFSAEIBU2AgAgBCgCACEWIBYoAgAhFyAEKAIEIRggFyAYRiEZQQEhGiAZIBpxIRsCQCAbRQ0AIAQoAgAhHCAEIBw2AgwMAgsLQQAhHSAEIB02AgwLIAQoAgwhHkEQIR8gBCAfaiEgICAkACAeDwvWAgEqfyMAIQJBECEDIAIgA2shBCAEJAAgBCAANgIMIAQgATYCCCAEKAIMIQVBACEGIAUgBkchB0EBIQggByAIcSEJAkACQCAJRQ0AIAQoAgghCkEAIQsgCyAKRyEMQQEhDSAMIA1xIQ4gDg0BC0GaogYhD0HSxQQhEEGp/wAhEUHbmAQhEiAPIBAgESASEAAACyAEKAIIIRMgExDOASEUIAQgFDYCBCAEKAIEIRVBACEWIBUgFkohF0EBIRggFyAYcSEZAkACQCAZRQ0AIAQoAgQhGiAEKAIMIRsgGygCQCEcIBogHEghHUEBIR4gHSAecSEfIB8NAQtB558GISBB0sUEISFBq/8AISJB25gEISMgICAhICIgIxAAAAsgBCgCDCEkICQoAnAhJSAEKAIEISZBvAchJyAmICdsISggJSAoaiEpQRAhKiAEICpqISsgKyQAICkPC5UCAR9/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgggBCABNgIEIAQoAgghBUEAIQYgBSAGRyEHQQEhCCAHIAhxIQkCQCAJDQBBw7wEIQpB0sUEIQtB7P8AIQxBsZwEIQ0gCiALIAwgDRAAAAsgBCgCBCEOQQAhDyAPIA5HIRBBASERIBAgEXEhEgJAAkAgEkUNACAEKAIIIRMgBCgCBCEUIBMgFBDYASEVIAQgFTYCACAEKAIAIRYgFigCACEXIAQoAgQhGCAXIBhGIRlBASEaIBkgGnEhGwJAIBtFDQAgBCgCACEcIAQgHDYCDAwCCwtBACEdIAQgHTYCDAsgBCgCDCEeQRAhHyAEIB9qISAgICQAIB4PC9YCASp/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgwgBCABNgIIIAQoAgwhBUEAIQYgBSAGRyEHQQEhCCAHIAhxIQkCQAJAIAlFDQAgBCgCCCEKQQAhCyALIApHIQxBASENIAwgDXEhDiAODQELQduhBiEPQdLFBCEQQbD/ACERQZ2YBCESIA8gECARIBIQAAALIAQoAgghEyATEM4BIRQgBCAUNgIEIAQoAgQhFUEAIRYgFSAWSiEXQQEhGCAXIBhxIRkCQAJAIBlFDQAgBCgCBCEaIAQoAgwhGyAbKAJQIRwgGiAcSCEdQQEhHiAdIB5xIR8gHw0BC0H9nQYhIEHSxQQhIUGy/wAhIkGdmAQhIyAgICEgIiAjEAAACyAEKAIMISQgJCgCdCElIAQoAgQhJkG4ASEnICYgJ2whKCAlIChqISlBECEqIAQgKmohKyArJAAgKQ8LkQMCJH8HfiMAIQJBECEDIAIgA2shBCAEIAE2AgwgBCgCDCEFIAUpAgAhJiAAICY3AgBBMCEGIAAgBmohByAFIAZqIQggCCkCACEnIAcgJzcCAEEoIQkgACAJaiEKIAUgCWohCyALKQIAISggCiAoNwIAQSAhDCAAIAxqIQ0gBSAMaiEOIA4pAgAhKSANICk3AgBBGCEPIAAgD2ohECAFIA9qIREgESkCACEqIBAgKjcCAEEQIRIgACASaiETIAUgEmohFCAUKQIAISsgEyArNwIAQQghFSAAIBVqIRYgBSAVaiEXIBcpAgAhLCAWICw3AgAgACgCCCEYAkACQCAYDQBBASEZIBkhGgwBCyAAKAIIIRsgGyEaCyAaIRwgACAcNgIIIAAoAgwhHQJAAkAgHQ0AQQEhHiAeIR8MAQsgACgCDCEgICAhHwsgHyEhIAAgITYCDCAAKAIEISICQAJAICINACAAKAIUISMgACAjNgIEDAELIAAoAhQhJAJAICQNACAAKAIEISUgACAlNgIUCwsPC+IDATt/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgwgBCABNgIIIAQoAgwhBUEAIQYgBSAGRyEHQQEhCCAHIAhxIQkCQAJAIAlFDQAgBCgCDCEKIAooAgQhC0EBIQwgCyAMRiENQQEhDiANIA5xIQ8gDw0BC0HfsAYhEEHSxQQhEUGPigEhEkGUtQQhEyAQIBEgEiATEAAACyAEKAIIIRRBACEVIBQgFUchFkEBIRcgFiAXcSEYAkAgGA0AQdXDBSEZQdLFBCEaQZCKASEbQZS1BCEcIBkgGiAbIBwQAAALIAQoAgghHSAdENsBIR5BASEfIB4gH3EhIAJAAkAgIEUNACAEKAIMISFBCCEiICEgImohIyAEKAIIISQgIyAkENwBIAQoAgwhJSAEKAIIISYgJSAmEN0BIScgBCgCDCEoICggJzYCBAwBCyAEKAIMISlBAyEqICkgKjYCBAsgBCgCDCErICsoAgQhLEECIS0gLCAtRiEuQQEhLyAuIC9xITACQCAwDQAgBCgCDCExIDEoAgQhMkEDITMgMiAzRiE0QQEhNSA0IDVxITYgNg0AQcCtBiE3QdLFBCE4QZeKASE5QZS1BCE6IDcgOCA5IDoQAAALQRAhOyAEIDtqITwgPCQADwvLCgKkAX8CfiMAIQFBECECIAEgAmshAyADJAAgAyAANgIIQQAhBCAELQC47gchBUEBIQYgBSAGcSEHAkACQCAHRQ0AQQEhCEEBIQkgCCAJcSEKIAMgCjoADwwBCyADKAIIIQtBACEMIAsgDEchDUEBIQ4gDSAOcSEPAkAgDw0AQdXDBSEQQdLFBCERQcaAASESQfHBBSETIBAgESASIBMQAAALEPEBIAMoAgghFCAUKAIAIRUCQCAVRQ0AQeQAIRZBACEXIBcgFjYCrO8HQeQAIRhBASEZQQAhGkHIgAEhGyAYIBkgGiAbEMYBCyADKAIIIRwgHCgCNCEdAkAgHUUNAEHkACEeQQAhHyAfIB42AqzvB0HkACEgQQEhIUEAISJByYABISMgICAhICIgIxDGAQsgAygCCCEkICQoAgQhJUEAISYgJSAmSyEnQQEhKCAnIChxISkCQCApDQBB5QAhKkEAISsgKyAqNgKs7wdB5QAhLEEBIS1BACEuQcqAASEvICwgLSAuIC8QxgELIAMoAgghMCAwKAIcITFBACEyIDIgMUchM0EBITRBASE1IDMgNXEhNiA0ITcCQCA2DQAgAygCCCE4IDgoAiQhOUEAITogOiA5RyE7QQEhPEEBIT0gOyA9cSE+IDwhNyA+DQAgAygCCCE/ID8oAiwhQEEAIUEgQSBARyFCQQEhQ0EBIUQgQiBEcSFFIEMhNyBFDQAgAygCCCFGIEYoAjAhR0EAIUggSCBHRyFJIEkhNwsgNyFKQQEhSyBKIEtxIUwgAyBMOgAHIAMtAAchTUEBIU4gTSBOcSFPAkACQCBPDQAgAygCCCFQIFAoAgwhUUEBIVIgUSBSRiFTQQEhVCBTIFRxIVUgVUUNACADKAIIIVYgVigCECFXQQAhWCBYIFdHIVlBASFaIFkgWnEhWwJAAkAgW0UNACADKAIIIVwgXCgCFCFdQQAhXiBdIF5LIV9BASFgIF8gYHEhYSBhDQELQeYAIWJBACFjIGMgYjYCrO8HQeYAIWRBASFlQQAhZkHQgAEhZyBkIGUgZiBnEMYBCyADKAIIIWggaCgCBCFpIAMoAgghaiBqKAIUIWsgaSBrRiFsQQEhbSBsIG1xIW4CQCBuDQBB5wAhb0EAIXAgcCBvNgKs7wdB5wAhcUEBIXJBACFzQdGAASF0IHEgciBzIHQQxgELDAELIAMoAgghdSB1KAIQIXZBACF3IHcgdkYheEEBIXkgeCB5cSF6AkAgeg0AQegAIXtBACF8IHwgezYCrO8HQegAIX1BASF+QQAhf0HTgAEhgAEgfSB+IH8ggAEQxgELCyADKAIIIYEBIIEBKAIIIYIBQQMhgwEgggEggwFGIYQBQQEhhQEghAEghQFxIYYBAkAghgFFDQBBACGHASCHAS0AsPAHIYgBQQEhiQEgiAEgiQFxIYoBAkAgigENAEHpACGLAUEAIYwBIIwBIIsBNgKs7wdB6QAhjQFBASGOAUEAIY8BQdaAASGQASCNASCOASCPASCQARDGAQsgAygCCCGRASCRASgCBCGSASCSASGTASCTAa0hpQFCBCGmASClASCmARCKAiGUAUEBIZUBIJQBIJUBcSGWAQJAIJYBDQBB6gAhlwFBACGYASCYASCXATYCrO8HQeoAIZkBQQEhmgFBACGbAUHXgAEhnAEgmQEgmgEgmwEgnAEQxgELCxD1ASGdAUEBIZ4BIJ0BIJ4BcSGfASADIJ8BOgAPCyADLQAPIaABQQEhoQEgoAEgoQFxIaIBQRAhowEgAyCjAWohpAEgpAEkACCiAQ8LkwIBIH8jACECQRAhAyACIANrIQQgBCAANgIMIAQgATYCCCAEKAIIIQUgBSgCBCEGIAQoAgwhByAHIAY2AgAgBCgCDCEIQQAhCSAIIAk2AgQgBCgCDCEKQQAhCyAKIAs6AAggBCgCDCEMQQAhDSAMIA02AgwgBCgCDCEOQQAhDyAOIA82AhAgBCgCCCEQIBAoAgwhEUEBIRIgESASRiETQQEhFEECIRVBASEWIBMgFnEhFyAUIBUgFxshGCAEKAIMIRkgGSAYNgIUIAQoAgwhGkEAIRsgGiAbNgIYIAQoAgghHCAcKAIIIR0gBCgCDCEeIB4gHTYCHCAEKAIIIR8gHygCDCEgIAQoAgwhISAhICA2AiAPC04BCH8jACECQRAhAyACIANrIQQgBCQAIAQgADYCDCAEIAE2AgggBCgCDCEFIAQoAgghBiAFIAYQ1QIhB0EQIQggBCAIaiEJIAkkACAHDwu2CQGKAX8jACECQTAhAyACIANrIQQgBCQAIAQgATYCLCAEKAIsIQVB1BQhBiAAIAUgBhD3AhogACgCECEHQQAhCCAHIAhGIQlBASEKIAkgCnEhCwJAAkAgC0UNAEGrwQQhDCAMIQ0MAQsgACgCECEOIA4hDQsgDSEPIAAgDzYCECAAKAIkIRBBACERIBAgEUYhEkEBIRMgEiATcSEUAkACQCAURQ0AQavBBCEVIBUhFgwBCyAAKAIkIRcgFyEWCyAWIRggACAYNgIkQQAhGSAEIBk2AigCQANAIAQoAighGkEIIRsgGiAbSSEcQQEhHSAcIB1xIR4gHkUNAUHsASEfIAAgH2ohICAEKAIoISFB0AEhIiAhICJsISMgICAjaiEkIAQgJDYCJCAEKAIkISUgJSgCACEmAkAgJkUNACAEKAIkIScgJygCDCEoAkACQCAoDQBBASEpICkhKgwBCyAEKAIkISsgKygCDCEsICwhKgsgKiEtIAQoAiQhLiAuIC02AgxBACEvIAQgLzYCIAJAA0AgBCgCICEwQRAhMSAwIDFJITJBASEzIDIgM3EhNCA0RQ0BIAQoAiQhNUEQITYgNSA2aiE3IAQoAiAhOEEMITkgOCA5bCE6IDcgOmohOyAEIDs2AhwgBCgCHCE8IDwoAgAhPQJAID0NAAwCCyAEKAIcIT4gPi8BBCE/Qf//AyFAID8gQHEhQQJAAkAgQQ0AQQEhQiBCIUMMAQsgBCgCHCFEIEQvAQQhRUH//wMhRiBFIEZxIUcgRyFDCyBDIUggBCgCHCFJIEkgSDsBBCAEKAIgIUpBASFLIEogS2ohTCAEIEw2AiAMAAsACwsgBCgCKCFNQQEhTiBNIE5qIU8gBCBPNgIoDAALAAtBACFQIAQgUDYCGAJAA0AgBCgCGCFRQRAhUiBRIFJJIVNBASFUIFMgVHEhVSBVRQ0BQcwPIVYgACBWaiFXIAQoAhghWEEEIVkgWCBZdCFaIFcgWmohWyAEIFs2AhQgBCgCFCFcIFwoAgAhXQJAIF1FDQAgBCgCFCFeIF4oAgQhXwJAAkAgXw0AQQEhYCBgIWEMAQsgBCgCFCFiIGIoAgQhYyBjIWELIGEhZCAEKAIUIWUgZSBkNgIEIAQoAhQhZiBmKAIIIWcCQAJAIGcNAEEBIWggaCFpDAELIAQoAhQhaiBqKAIIIWsgayFpCyBpIWwgBCgCFCFtIG0gbDYCCAsgBCgCGCFuQQEhbyBuIG9qIXAgBCBwNgIYDAALAAtBACFxIAQgcTYCEAJAA0AgBCgCECFyQRAhcyByIHNJIXRBASF1IHQgdXEhdiB2RQ0BQcwRIXcgACB3aiF4IAQoAhAheUEMIXogeSB6bCF7IHgge2ohfCAEIHw2AgwgBCgCDCF9IH0oAgAhfgJAIH5FDQAgBCgCDCF/IH8oAgQhgAECQAJAIIABDQBBASGBASCBASGCAQwBCyAEKAIMIYMBIIMBKAIEIYQBIIQBIYIBCyCCASGFASAEKAIMIYYBIIYBIIUBNgIECyAEKAIQIYcBQQEhiAEghwEgiAFqIYkBIAQgiQE2AhAMAAsAC0EwIYoBIAQgigFqIYsBIIsBJAAPC+IDATt/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgwgBCABNgIIIAQoAgwhBUEAIQYgBSAGRyEHQQEhCCAHIAhxIQkCQAJAIAlFDQAgBCgCDCEKIAooAgQhC0EBIQwgCyAMRiENQQEhDiANIA5xIQ8gDw0BC0GSsQYhEEHSxQQhEUGzigEhEkHAuQQhEyAQIBEgEiATEAAACyAEKAIIIRRBACEVIBQgFUchFkEBIRcgFiAXcSEYAkAgGA0AQdXDBSEZQdLFBCEaQbSKASEbQcC5BCEcIBkgGiAbIBwQAAALIAQoAgghHSAdEOABIR5BASEfIB4gH3EhIAJAAkAgIEUNACAEKAIMISFBCCEiICEgImohIyAEKAIIISQgIyAkEOEBIAQoAgwhJSAEKAIIISYgJSAmEOIBIScgBCgCDCEoICggJzYCBAwBCyAEKAIMISlBAyEqICkgKjYCBAsgBCgCDCErICsoAgQhLEECIS0gLCAtRiEuQQEhLyAuIC9xITACQCAwDQAgBCgCDCExIDEoAgQhMkEDITMgMiAzRiE0QQEhNSA0IDVxITYgNg0AQfauBiE3QdLFBCE4QbuKASE5QcC5BCE6IDcgOCA5IDoQAAALQRAhOyAEIDtqITwgPCQADwvdNQLHBX8GfiMAIQFBwAEhAiABIAJrIQMgAyQAIAMgADYCuAFBACEEIAQtALjuByEFQQEhBiAFIAZxIQcCQAJAIAdFDQBBASEIQQEhCSAIIAlxIQogAyAKOgC/AQwBCyADKAK4ASELQQAhDCALIAxHIQ1BASEOIA0gDnEhDwJAIA8NAEHVwwUhEEHSxQQhEUGWggEhEkGKwgUhEyAQIBEgEiATEAAACxDxASADKAK4ASEUIBQoAgAhFQJAIBVFDQBB/gAhFkEAIRcgFyAWNgKs7wdB/gAhGEEBIRlBACEaQZiCASEbIBggGSAaIBsQxgELIAMoArgBIRwgHCgC0BQhHQJAIB1FDQBB/gAhHkEAIR8gHyAeNgKs7wdB/gAhIEEBISFBACEiQZmCASEjICAgISAiICMQxgELIAMoArgBISQgJCgCBCElQQAhJiAmICVHISdBASEoICcgKHEhKQJAICkNAEH/ACEqQQAhKyArICo2AqzvB0H/ACEsQQEhLUEAIS5BnIIBIS8gLCAtIC4gLxDGAQsgAygCuAEhMCAwKAIYITFBACEyIDIgMUchM0EBITQgMyA0cSE1AkAgNQ0AQf8AITZBACE3IDcgNjYCrO8HQf8AIThBASE5QQAhOkGdggEhOyA4IDkgOiA7EMYBC0EAITwgAyA8NgK0AQJAA0AgAygCtAEhPUEQIT4gPSA+SSE/QQEhQCA/IEBxIUEgQUUNASADKAK4ASFCQSwhQyBCIENqIUQgAygCtAEhRUEMIUYgRSBGbCFHIEQgR2ohSCBIKAIAIUlBACFKIEkgSkchS0EBIUwgSyBMcSFNAkAgTUUNACADKAK4ASFOQSwhTyBOIE9qIVAgAygCtAEhUUEMIVIgUSBSbCFTIFAgU2ohVCBUKAIAIVUgVRD7AiFWQSAhVyBWIFdJIVhBASFZIFggWXEhWgJAIFoNAEGuASFbQQAhXCBcIFs2AqzvB0GuASFdQQEhXkEAIV9Bp4IBIWAgXSBeIF8gYBDGAQsLIAMoArgBIWFBLCFiIGEgYmohYyADKAK0ASFkQQwhZSBkIGVsIWYgYyBmaiFnIGcoAgQhaEEAIWkgaCBpRyFqQQEhayBqIGtxIWwCQCBsRQ0AIAMoArgBIW1BLCFuIG0gbmohbyADKAK0ASFwQQwhcSBwIHFsIXIgbyByaiFzIHMoAgQhdCB0EPsCIXVBICF2IHUgdkkhd0EBIXggdyB4cSF5AkAgeQ0AQa4BIXpBACF7IHsgejYCrO8HQa4BIXxBASF9QQAhfkGqggEhfyB8IH0gfiB/EMYBCwsgAygCtAEhgAFBASGBASCAASCBAWohggEgAyCCATYCtAEMAAsACyADKAK4ASGDASCDASgCCCGEAUEAIYUBIIUBIIQBRyGGAUEBIYcBIIYBIIcBcSGIAQJAIIgBRQ0AIAMoArgBIYkBIIkBKAIMIYoBQQAhiwEgigEgiwFLIYwBQQEhjQEgjAEgjQFxIY4BAkAgjgENAEGCASGPAUEAIZABIJABII8BNgKs7wdBggEhkQFBASGSAUEAIZMBQa+CASGUASCRASCSASCTASCUARDGAQsLIAMoArgBIZUBIJUBKAIcIZYBQQAhlwEglwEglgFHIZgBQQEhmQEgmAEgmQFxIZoBAkAgmgFFDQAgAygCuAEhmwEgmwEoAiAhnAFBACGdASCcASCdAUshngFBASGfASCeASCfAXEhoAECQCCgAQ0AQYIBIaEBQQAhogEgogEgoQE2AqzvB0GCASGjAUEBIaQBQQAhpQFBsoIBIaYBIKMBIKQBIKUBIKYBEMYBCwtBoAEhpwEgAyCnAWohqAEgqAEhqQEgqQEQ3QJBACGqASADIKoBNgKcAQJAA0AgAygCnAEhqwFBCCGsASCrASCsAUkhrQFBASGuASCtASCuAXEhrwEgrwFFDQEgAygCuAEhsAFB7AEhsQEgsAEgsQFqIbIBIAMoApwBIbMBQdABIbQBILMBILQBbCG1ASCyASC1AWohtgEgAyC2ATYCmAEgAygCmAEhtwEgtwEoAgAhuAECQAJAILgBDQAMAQsgAygCmAEhuQEguQEoAgQhugFBACG7ASC6ASC7AUshvAFBASG9ASC8ASC9AXEhvgECQCC+AQ0AQYQBIb8BQQAhwAEgwAEgvwE2AqzvB0GEASHBAUEBIcIBQQAhwwFByIIBIcQBIMEBIMIBIMMBIMQBEMYBC0EBIcUBIAMgxQE6AJcBQQAhxgEgAyDGATYCkAFBACHHASADIMcBNgKMAUEAIcgBIAMgyAE2AogBAkADQCADKAKIASHJAUEQIcoBIMkBIMoBSSHLAUEBIcwBIMsBIMwBcSHNASDNAUUNASADKAKYASHOAUEQIc8BIM4BIM8BaiHQASADKAKIASHRAUEMIdIBINEBINIBbCHTASDQASDTAWoh1AEgAyDUATYChAEgAygChAEh1QEg1QEoAgAh1gECQAJAINYBRQ0AIAMtAJcBIdcBQQEh2AEg1wEg2AFxIdkBAkAg2QENAEGDASHaAUEAIdsBINsBINoBNgKs7wdBgwEh3AFBASHdAUEAId4BQd2CASHfASDcASDdASDeASDfARDGAQsgAygChAEh4AEg4AEoAggh4QFBACHiASDhASDiAUch4wFBASHkASDjASDkAXEh5QECQCDlAQ0AQYwBIeYBQQAh5wEg5wEg5gE2AqzvB0GMASHoAUEBIekBQQAh6gFB3oIBIesBIOgBIOkBIOoBIOsBEMYBCyADKAKEASHsASDsAS8BBCHtAUH//wMh7gEg7QEg7gFxIe8BIAMg7wE2AoABIAMoAoABIfABQQAh8QEg8AEg8QFKIfIBQQEh8wEg8gEg8wFxIfQBAkAg9AENAEGOASH1AUEAIfYBIPYBIPUBNgKs7wdBjgEh9wFBASH4AUEAIfkBQeCCASH6ASD3ASD4ASD5ASD6ARDGAQsgAygChAEh+wEg+wEoAgAh/AEgAygCgAEh/QEgAygCmAEh/gEg/gEoAgwh/wEg/AEg/QEg/wEQ3gIhgAIgAyCAAjYCfCADKAKEASGBAiCBAigCACGCAiADKAKAASGDAiADKAKYASGEAiCEAigCDCGFAiCCAiCDAiCFAhDfAiGGAiADIIYCNgJ4IAMoApABIYcCIAMoAnwhiAIghwIgiAIQ4AIhiQIgAyCJAjYCkAEgAygCeCGKAiADKAKQASGLAiCLAiCKAmohjAIgAyCMAjYCkAEgAygCjAEhjQJBASGOAiCNAiCOAmohjwIgAyCPAjYCjAEgAygCmAEhkAIgkAIoAgwhkQJBAiGSAiCRAiCSAkYhkwJBASGUAiCTAiCUAnEhlQICQCCVAkUNACADKAKAASGWAkEBIZcCIJYCIJcCSiGYAkEBIZkCIJgCIJkCcSGaAgJAIJoCRQ0AIAMoAoQBIZsCIJsCKAIAIZwCQQQhnQIgnAIgnQJGIZ4CQQEhnwIgngIgnwJxIaACAkAgoAINACADKAKEASGhAiChAigCACGiAkEIIaMCIKICIKMCRiGkAkEBIaUCIKQCIKUCcSGmAiCmAg0AIAMoAoQBIacCIKcCKAIAIagCQQkhqQIgqAIgqQJGIaoCQQEhqwIgqgIgqwJxIawCIKwCDQBBjwEhrQJBACGuAiCuAiCtAjYCrO8HQY8BIa8CQQEhsAJBACGxAkHpggEhsgIgrwIgsAIgsQIgsgIQxgELCwsMAQtBACGzAiADILMCOgCXAQsgAygCiAEhtAJBASG1AiC0AiC1AmohtgIgAyC2AjYCiAEMAAsACyADKAKYASG3AiC3AigCDCG4AkECIbkCILgCILkCRiG6AkEBIbsCILoCILsCcSG8AgJAILwCRQ0AIAMoApABIb0CQRAhvgIgvQIgvgIQ4AIhvwIgAyC/AjYCkAELIAMoApABIcACIAMoApgBIcECIMECKAIEIcICIMACIMICRiHDAkEBIcQCIMMCIMQCcSHFAgJAIMUCDQBBjQEhxgJBACHHAiDHAiDGAjYCrO8HQY0BIcgCQQEhyQJBACHKAkHzggEhywIgyAIgyQIgygIgywIQxgELIAMoAowBIcwCQQAhzQIgzAIgzQJKIc4CQQEhzwIgzgIgzwJxIdACAkAg0AINAEGLASHRAkEAIdICINICINECNgKs7wdBiwEh0wJBASHUAkEAIdUCQfSCASHWAiDTAiDUAiDVAiDWAhDGAQsLIAMoApwBIdcCQQEh2AIg1wIg2AJqIdkCIAMg2QI2ApwBDAALAAtBACHaAiADINoCNgJ0AkADQCADKAJ0IdsCQQgh3AIg2wIg3AJJId0CQQEh3gIg3QIg3gJxId8CIN8CRQ0BIAMoArgBIeACQewOIeECIOACIOECaiHiAiADKAJ0IeMCQQwh5AIg4wIg5AJsIeUCIOICIOUCaiHmAiADIOYCNgJwIAMoAnAh5wIg5wIoAgAh6AICQAJAIOgCDQAMAQsgAygCcCHpAiDpAi0ABCHqAkEBIesCIOoCIOsCcSHsAgJAIOwCDQBBmAEh7QJBACHuAiDuAiDtAjYCrO8HQZgBIe8CQQEh8AJBACHxAkH9ggEh8gIg7wIg8AIg8QIg8gIQxgELIAMoAnAh8wIg8wItAAgh9AJB/wEh9QIg9AIg9QJxIfYCQRAh9wIg9gIg9wJIIfgCQQEh+QIg+AIg+QJxIfoCAkAg+gINAEGUASH7AkEAIfwCIPwCIPsCNgKs7wdBlAEh/QJBASH+AkEAIf8CQYeDASGAAyD9AiD+AiD/AiCAAxDGAQsgAygCcCGBAyCBAy0ACCGCA0EIIYMDQRghhAMgAyCEA2ohhQMghQMggwNqIYYDQaABIYcDIAMghwNqIYgDIIgDIIMDaiGJAyCJAykDACHIBSCGAyDIBTcDACADKQOgASHJBSADIMkFNwMYQf8BIYoDIIIDIIoDcSGLA0EAIYwDQRghjQMgAyCNA2ohjgMgjgMgjAMgiwMQ4QIhjwNBASGQAyCPAyCQA3EhkQMCQCCRAw0AQZUBIZIDQQAhkwMgkwMgkgM2AqzvB0GVASGUA0EBIZUDQQAhlgNBiIMBIZcDIJQDIJUDIJYDIJcDEMYBCyADKAJwIZgDIJgDLQAIIZkDQeAAIZoDIAMgmgNqIZsDIJsDGkEIIZwDQQghnQMgAyCdA2ohngMgngMgnANqIZ8DQaABIaADIAMgoANqIaEDIKEDIJwDaiGiAyCiAykDACHKBSCfAyDKBTcDACADKQOgASHLBSADIMsFNwMIQf8BIaMDIJkDIKMDcSGkA0EAIaUDQeAAIaYDIAMgpgNqIacDQQghqAMgAyCoA2ohqQMgpwMgqQMgpQMgpAMQ4gJBCCGqA0GgASGrAyADIKsDaiGsAyCsAyCqA2ohrQNB4AAhrgMgAyCuA2ohrwMgrwMgqgNqIbADILADKQMAIcwFIK0DIMwFNwMAIAMpA2AhzQUgAyDNBTcDoAELIAMoAnQhsQNBASGyAyCxAyCyA2ohswMgAyCzAzYCdAwACwALQQAhtAMgAyC0AzYCXEEAIbUDIAMgtQM2AlgCQANAIAMoAlghtgNBECG3AyC2AyC3A0khuANBASG5AyC4AyC5A3EhugMgugNFDQEgAygCuAEhuwNBzA8hvAMguwMgvANqIb0DIAMoAlghvgNBBCG/AyC+AyC/A3QhwAMgvQMgwANqIcEDIAMgwQM2AlQgAygCVCHCAyDCAygCACHDAwJAAkAgwwMNAAwBCyADKAJYIcQDQQEhxQMgxQMgxAN0IcYDIAMoAlwhxwMgxwMgxgNyIcgDIAMgyAM2AlwLIAMoAlghyQNBASHKAyDJAyDKA2ohywMgAyDLAzYCWAwACwALQQAhzAMgAyDMAzYCUEEAIc0DIAMgzQM2AkwCQANAIAMoAkwhzgNBECHPAyDOAyDPA0kh0ANBASHRAyDQAyDRA3Eh0gMg0gNFDQEgAygCuAEh0wNBzBEh1AMg0wMg1ANqIdUDIAMoAkwh1gNBDCHXAyDWAyDXA2wh2AMg1QMg2ANqIdkDIAMg2QM2AkggAygCSCHaAyDaAygCACHbAwJAAkAg2wMNAAwBCyADKAJMIdwDQQEh3QMg3QMg3AN0Id4DIAMoAlAh3wMg3wMg3gNyIeADIAMg4AM2AlALIAMoAkwh4QNBASHiAyDhAyDiA2oh4wMgAyDjAzYCTAwACwALQQAh5AMgAyDkAzYCREEAIeUDIAMg5QM2AkBBACHmAyADIOYDNgI8AkADQCADKAI8IecDQRAh6AMg5wMg6ANJIekDQQEh6gMg6QMg6gNxIesDIOsDRQ0BIAMoArgBIewDQYwTIe0DIOwDIO0DaiHuAyADKAI8Ie8DQQwh8AMg7wMg8ANsIfEDIO4DIPEDaiHyAyADIPIDNgI4IAMoAjgh8wMg8wMoAgAh9AMCQAJAIPQDDQAMAQsgAygCOCH1AyD1AygCCCH2A0EAIfcDIPYDIPcDRyH4A0EBIfkDIPgDIPkDcSH6AwJAIPoDDQBBqQEh+wNBACH8AyD8AyD7AzYCrO8HQakBIf0DQQEh/gNBACH/A0HFgwEhgAQg/QMg/gMg/wMggAQQxgELIAMoAjghgQQggQQtAAQhggRB/wEhgwQgggQggwRxIYQEQRAhhQQghAQghQRIIYYEQQEhhwQghgQghwRxIYgEIAMgiAQ6ADcgAygCOCGJBCCJBC0ABSGKBEH/ASGLBCCKBCCLBHEhjARBECGNBCCMBCCNBEghjgRBASGPBCCOBCCPBHEhkAQgAyCQBDoANiADLQA3IZEEQQEhkgQgkQQgkgRxIZMEAkAgkwQNAEGlASGUBEEAIZUEIJUEIJQENgKs7wdBpQEhlgRBASGXBEEAIZgEQcmDASGZBCCWBCCXBCCYBCCZBBDGAQsgAy0ANiGaBEEBIZsEIJoEIJsEcSGcBAJAIJwEDQBBpgEhnQRBACGeBCCeBCCdBDYCrO8HQaYBIZ8EQQEhoARBACGhBEHKgwEhogQgnwQgoAQgoQQgogQQxgELIAMtADchowRBASGkBCCjBCCkBHEhpQQCQCClBEUNACADLQA2IaYEQQEhpwQgpgQgpwRxIagEIKgERQ0AIAMoAjghqQQgqQQtAAQhqgRB/wEhqwQgqgQgqwRxIawEQQEhrQQgrQQgrAR0Ia4EIAMoAkQhrwQgrwQgrgRyIbAEIAMgsAQ2AkQgAygCOCGxBCCxBC0ABSGyBEH/ASGzBCCyBCCzBHEhtARBASG1BCC1BCC0BHQhtgQgAygCQCG3BCC3BCC2BHIhuAQgAyC4BDYCQCADKAK4ASG5BEHMDyG6BCC5BCC6BGohuwQgAygCOCG8BCC8BC0ABCG9BEH/ASG+BCC9BCC+BHEhvwRBBCHABCC/BCDABHQhwQQguwQgwQRqIcIEIAMgwgQ2AjAgAygCuAEhwwRBzBEhxAQgwwQgxARqIcUEIAMoAjghxgQgxgQtAAUhxwRB/wEhyAQgxwQgyARxIckEQQwhygQgyQQgygRsIcsEIMUEIMsEaiHMBCADIMwENgIsIAMoAjAhzQQgzQQoAgAhzgQgAygCOCHPBCDPBCgCACHQBCDOBCDQBEYh0QRBASHSBCDRBCDSBHEh0wQCQCDTBA0AQacBIdQEQQAh1QQg1QQg1AQ2AqzvB0GnASHWBEEBIdcEQQAh2ARB0IMBIdkEINYEINcEINgEINkEEMYBCyADKAIsIdoEINoEKAIAIdsEIAMoAjgh3AQg3AQoAgAh3QQg2wQg3QRGId4EQQEh3wQg3gQg3wRxIeAEAkAg4AQNAEGoASHhBEEAIeIEIOIEIOEENgKs7wdBqAEh4wRBASHkBEEAIeUEQdGDASHmBCDjBCDkBCDlBCDmBBDGAQsgAygCMCHnBCDnBCgCCCHoBEEEIekEIOgEIOkERiHqBEEBIesEQQEh7AQg6gQg7ARxIe0EIOsEIe4EAkAg7QQNACADKAIwIe8EIO8EKAIIIfAEQQMh8QQg8AQg8QRGIfIEQQEh8wRBASH0BCDyBCD0BHEh9QQg8wQh7gQg9QQNACADKAIwIfYEIPYEKAIIIfcEQQUh+AQg9wQg+ARGIfkEIPkEIe4ECyDuBCH6BEEBIfsEIPoEIPsEcSH8BCADIPwEOgArIAMoAjAh/QQg/QQoAggh/gRBAiH/BCD+BCD/BEYhgAVBASGBBSCABSCBBXEhggUgAyCCBToAKiADLQArIYMFQQEhhAUggwUghAVxIYUFAkAghQVFDQAgAy0AKyGGBUEBIYcFIIYFIIcFcSGIBQJAAkAgiAVFDQAgAygCLCGJBSCJBSgCBCGKBUECIYsFIIoFIIsFRiGMBUEBIY0FIIwFII0FcSGOBSCOBQ0BC0GqASGPBUEAIZAFIJAFII8FNgKs7wdBqgEhkQVBASGSBUEAIZMFQdeDASGUBSCRBSCSBSCTBSCUBRDGAQsLIAMtACohlQVBASGWBSCVBSCWBXEhlwUCQCCXBUUNACADLQAqIZgFQQEhmQUgmAUgmQVxIZoFAkACQCCaBUUNACADKAIsIZsFIJsFKAIEIZwFQQMhnQUgnAUgnQVGIZ4FQQEhnwUgngUgnwVxIaAFIKAFDQELQasBIaEFQQAhogUgogUgoQU2AqzvB0GrASGjBUEBIaQFQQAhpQVB2oMBIaYFIKMFIKQFIKUFIKYFEMYBCwsLCyADKAI8IacFQQEhqAUgpwUgqAVqIakFIAMgqQU2AjwMAAsACyADKAJcIaoFIAMoAkQhqwUgqgUgqwVGIawFQQEhrQUgrAUgrQVxIa4FAkAgrgUNAEGsASGvBUEAIbAFILAFIK8FNgKs7wdBrAEhsQVBASGyBUEAIbMFQd+DASG0BSCxBSCyBSCzBSC0BRDGAQsgAygCUCG1BSADKAJAIbYFILUFILYFRiG3BUEBIbgFILcFILgFcSG5BQJAILkFDQBBrQEhugVBACG7BSC7BSC6BTYCrO8HQa0BIbwFQQEhvQVBACG+BUHggwEhvwUgvAUgvQUgvgUgvwUQxgELEPUBIcAFQQEhwQUgwAUgwQVxIcIFIAMgwgU6AL8BCyADLQC/ASHDBUEBIcQFIMMFIMQFcSHFBUHAASHGBSADIMYFaiHHBSDHBSQAIMUFDwuzEwGQAn8jACECQdAAIQMgAiADayEEIAQkACAEIAA2AkwgBCABNgJIQQAhBSAEIAU2AkQCQANAIAQoAkQhBkEIIQcgBiAHSSEIQQEhCSAIIAlxIQogCkUNASAEKAJIIQtB7AEhDCALIAxqIQ0gBCgCRCEOQdABIQ8gDiAPbCEQIA0gEGohESAEIBE2AkAgBCgCTCESQQQhEyASIBNqIRQgBCgCRCEVQQMhFiAVIBZ0IRcgFCAXaiEYIAQgGDYCPCAEKAJAIRkgGSgCACEaAkAgGkUNACAEKAJEIRtBASEcIBwgG3QhHSAEKAJMIR4gHigCACEfIB8gHXIhICAeICA2AgAgBCgCQCEhICEoAgAhIiAEKAI8ISMgIyAiNgIAIAQoAkAhJCAkKAIEISUgBCgCPCEmICYgJTYCBAsgBCgCRCEnQQEhKCAnIChqISkgBCApNgJEDAALAAtBgAIhKiAEICo2AjhBACErIAQgKzYCNAJAA0AgBCgCNCEsQQghLSAsIC1JIS5BASEvIC4gL3EhMCAwRQ0BIAQoAkghMUHsDiEyIDEgMmohMyAEKAI0ITRBDCE1IDQgNWwhNiAzIDZqITcgBCA3NgIwIAQoAkwhOEHEACE5IDggOWohOiAEKAI0ITtBAyE8IDsgPHQhPSA6ID1qIT4gBCA+NgIsIAQoAjAhPyA/KAIAIUACQCBARQ0AIAQoAkwhQSBBKAIAIUJBgAIhQyBCIENyIUQgQSBENgIAIAQoAjAhRSBFKAIAIUYgBCgCLCFHIEcgRjYCACAEKAIwIUggSC0ABCFJIAQoAiwhSkEBIUsgSSBLcSFMIEogTDoABAsgBCgCNCFNQQEhTiBNIE5qIU8gBCBPNgI0DAALAAtBACFQIAQgUDYCKAJAA0AgBCgCKCFRQRAhUiBRIFJJIVNBASFUIFMgVHEhVSBVRQ0BIAQoAkghVkHMDyFXIFYgV2ohWCAEKAIoIVlBBCFaIFkgWnQhWyBYIFtqIVwgBCBcNgIkIAQoAkwhXUGEASFeIF0gXmohXyAEKAIoIWBBBCFhIGAgYXQhYiBfIGJqIWMgBCBjNgIgIAQoAiQhZCBkKAIAIWUCQCBlRQ0AIAQoAkwhZiBmKAIAIWdBgAIhaCBnIGhyIWkgZiBpNgIAIAQoAiQhaiBqKAIAIWsgBCgCICFsIGwgazYCACAEKAIkIW0gbSgCBCFuIAQoAiAhbyBvIG42AgQgBCgCJCFwIHAoAgghcSAEKAIgIXIgciBxNgIIIAQoAiQhcyBzLQAMIXQgBCgCICF1QQEhdiB0IHZxIXcgdSB3OgAMCyAEKAIoIXhBASF5IHggeWoheiAEIHo2AigMAAsAC0EAIXsgBCB7NgIcAkADQCAEKAIcIXxBECF9IHwgfUkhfkEBIX8gfiB/cSGAASCAAUUNASAEKAJIIYEBQcwRIYIBIIEBIIIBaiGDASAEKAIcIYQBQQwhhQEghAEghQFsIYYBIIMBIIYBaiGHASAEIIcBNgIYIAQoAkwhiAFBhAMhiQEgiAEgiQFqIYoBIAQoAhwhiwFBAyGMASCLASCMAXQhjQEgigEgjQFqIY4BIAQgjgE2AhQgBCgCGCGPASCPASgCACGQAQJAIJABRQ0AIAQoAkwhkQEgkQEoAgAhkgFBgAIhkwEgkgEgkwFyIZQBIJEBIJQBNgIAIAQoAhghlQEglQEoAgAhlgEgBCgCFCGXASCXASCWATYCACAEKAIYIZgBIJgBKAIEIZkBIAQoAhQhmgEgmgEgmQE2AgQLIAQoAhwhmwFBASGcASCbASCcAWohnQEgBCCdATYCHAwACwALQQAhngEgBCCeATYCEAJAA0AgBCgCECGfAUEQIaABIJ8BIKABSSGhAUEBIaIBIKEBIKIBcSGjASCjAUUNASAEKAJIIaQBQYwTIaUBIKQBIKUBaiGmASAEKAIQIacBQQwhqAEgpwEgqAFsIakBIKYBIKkBaiGqASAEIKoBNgIMIAQoAkwhqwFBhAQhrAEgqwEgrAFqIa0BIAQoAhAhrgFBAyGvASCuASCvAXQhsAEgrQEgsAFqIbEBIAQgsQE2AgggBCgCDCGyASCyASgCACGzAQJAILMBRQ0AIAQoAgwhtAEgtAEoAgAhtQEgBCgCCCG2ASC2ASC1ATYCACAEKAIMIbcBILcBLQAEIbgBQf8BIbkBILgBILkBcSG6AUEAIbsBILoBILsBTiG8AUEBIb0BILwBIL0BcSG+AQJAAkAgvgFFDQAgBCgCDCG/ASC/AS0ABCHAAUH/ASHBASDAASDBAXEhwgFBECHDASDCASDDAUghxAFBASHFASDEASDFAXEhxgEgxgENAQtB66UGIccBQdLFBCHIAUGmKSHJAUHVigQhygEgxwEgyAEgyQEgygEQAAALIAQoAkghywFBzA8hzAEgywEgzAFqIc0BIAQoAgwhzgEgzgEtAAQhzwFB/wEh0AEgzwEg0AFxIdEBQQQh0gEg0QEg0gF0IdMBIM0BINMBaiHUASDUASgCACHVASAEKAIMIdYBINYBKAIAIdcBINUBINcBRiHYAUEBIdkBINgBINkBcSHaAQJAINoBDQBBgIQFIdsBQdLFBCHcAUGnKSHdAUHVigQh3gEg2wEg3AEg3QEg3gEQAAALIAQoAgwh3wEg3wEtAAQh4AEgBCgCCCHhASDhASDgAToABCAEKAIMIeIBIOIBLQAFIeMBQf8BIeQBIOMBIOQBcSHlAUEAIeYBIOUBIOYBTiHnAUEBIegBIOcBIOgBcSHpAQJAAkAg6QFFDQAgBCgCDCHqASDqAS0ABSHrAUH/ASHsASDrASDsAXEh7QFBECHuASDtASDuAUgh7wFBASHwASDvASDwAXEh8QEg8QENAQtB36QGIfIBQdLFBCHzAUGpKSH0AUHVigQh9QEg8gEg8wEg9AEg9QEQAAALIAQoAkgh9gFBzBEh9wEg9gEg9wFqIfgBIAQoAgwh+QEg+QEtAAUh+gFB/wEh+wEg+gEg+wFxIfwBQQwh/QEg/AEg/QFsIf4BIPgBIP4BaiH/ASD/ASgCACGAAiAEKAIMIYECIIECKAIAIYICIIACIIICRiGDAkEBIYQCIIMCIIQCcSGFAgJAIIUCDQBByoMFIYYCQdLFBCGHAkGqKSGIAkHVigQhiQIghgIghwIgiAIgiQIQAAALIAQoAgwhigIgigItAAUhiwIgBCgCCCGMAiCMAiCLAjoABQsgBCgCECGNAkEBIY4CII0CII4CaiGPAiAEII8CNgIQDAALAAtB0AAhkAIgBCCQAmohkQIgkQIkAA8LTgEIfyMAIQJBECEDIAIgA2shBCAEJAAgBCAANgIMIAQgATYCCCAEKAIMIQUgBCgCCCEGIAUgBhDjAiEHQRAhCCAEIAhqIQkgCSQAIAcPC4cbAdoCfyMAIQJB4AAhAyACIANrIQQgBCQAIAQgATYCXCAEKAJcIQVBrAQhBiAAIAUgBhD3AhogACgC/AMhBwJAAkAgBw0AQQQhCCAIIQkMAQsgACgC/AMhCiAKIQkLIAkhCyAAIAs2AvwDIAAoAoAEIQwCQAJAIAwNAEEBIQ0gDSEODAELIAAoAoAEIQ8gDyEOCyAOIRAgACAQNgKABCAAKAKEBCERAkACQCARDQBBASESIBIhEwwBCyAAKAKEBCEUIBQhEwsgEyEVIAAgFTYChAQgACgCiAQhFgJAAkAgFg0AQQIhFyAXIRgMAQsgACgCiAQhGSAZIRgLIBghGiAAIBo2AogEIAAoAowEIRsCQAJAIBsNAEEAIRwgHCgC4O4HIR0gHSEeDAELIAAoAowEIR8gHyEeCyAeISAgACAgNgKMBCAAKALEAiEhAkACQCAhDQBBCCEiICIhIwwBCyAAKALEAiEkICQhIwsgIyElIAAgJTYCxAIgACgCyAIhJgJAAkAgJg0AQQEhJyAnISgMAQsgACgCyAIhKSApISgLICghKiAAICo2AsgCIAAoAswCISsCQAJAICsNAEEBISwgLCEtDAELIAAoAswCIS4gLiEtCyAtIS8gACAvNgLMAiAAKALQAiEwAkACQCAwDQBBASExIDEhMgwBCyAAKALQAiEzIDMhMgsgMiE0IAAgNDYC0AIgACgC1AIhNQJAAkAgNQ0AQQghNiA2ITcMAQsgACgC1AIhOCA4ITcLIDchOSAAIDk2AtQCIAAoAtgCIToCQAJAIDoNAEEBITsgOyE8DAELIAAoAtgCIT0gPSE8CyA8IT4gACA+NgLYAiAAKALcAiE/AkACQCA/DQBBASFAIEAhQQwBCyAAKALcAiFCIEIhQQsgQSFDIAAgQzYC3AIgACgC4AIhRAJAAkAgRA0AQQEhRSBFIUYMAQsgACgC4AIhRyBHIUYLIEYhSCAAIEg2AuACIAAoAqwCIUkCQAJAIEkNAEEIIUogSiFLDAELIAAoAqwCIUwgTCFLCyBLIU0gACBNNgKsAiAAKAKoAiFOAkACQCBODQBBACFPIE8oAtzuByFQIFAhUQwBCyAAKAKoAiFSIFIhUQsgUSFTIAAgUzYCqAIgACgC7AIhVEEBIVUgVCBVRiFWQQEhVyBWIFdxIVgCQAJAIFhFDQBBACFZIAAgWTYC6AIMAQsgACgC6AIhWgJAAkAgWg0AQQEhWyBbIVwMAQsgACgC6AIhXSBdIVwLIFwhXiAAIF42AugCCyAAKALoAiFfQQQhYCBfIGBKIWFBASFiIGEgYnEhYwJAIGNFDQBBBCFkIAAgZDYC6AILQQAhZSAEIGU2AlgCQANAIAQoAlghZiAAKALoAiFnIGYgZ0ghaEEBIWkgaCBpcSFqIGpFDQFB7AIhayAAIGtqIWwgBCgCWCFtQSQhbiBtIG5sIW8gbCBvaiFwIAQgcDYCVCAEKAJUIXEgcSgCACFyAkACQCByDQBBACFzIHMoAtjuByF0IHQhdQwBCyAEKAJUIXYgdigCACF3IHchdQsgdSF4IAQoAlQheSB5IHg2AgAgBCgCVCF6IHooAgQhewJAAkAgew0AQQ8hfCB8IX0MAQsgBCgCVCF+IH4oAgQhfyB/IX0LIH0hgAEgBCgCVCGBASCBASCAATYCBEHsAiGCASAAIIIBaiGDASAEKAJYIYQBQSQhhQEghAEghQFsIYYBIIMBIIYBaiGHAUEIIYgBIIcBIIgBaiGJASAEIIkBNgJQIAQoAlAhigEgigEoAgQhiwECQAJAIIsBDQBBAiGMASCMASGNAQwBCyAEKAJQIY4BII4BKAIEIY8BII8BIY0BCyCNASGQASAEKAJQIZEBIJEBIJABNgIEIAQoAlAhkgEgkgEoAgghkwECQAJAIJMBDQBBASGUASCUASGVAQwBCyAEKAJQIZYBIJYBKAIIIZcBIJcBIZUBCyCVASGYASAEKAJQIZkBIJkBIJgBNgIIIAQoAlAhmgEgmgEoAgwhmwECQAJAIJsBDQBBASGcASCcASGdAQwBCyAEKAJQIZ4BIJ4BKAIMIZ8BIJ8BIZ0BCyCdASGgASAEKAJQIaEBIKEBIKABNgIMIAQoAlAhogEgogEoAhAhowECQAJAIKMBDQBBAiGkASCkASGlAQwBCyAEKAJQIaYBIKYBKAIQIacBIKcBIaUBCyClASGoASAEKAJQIakBIKkBIKgBNgIQIAQoAlAhqgEgqgEoAhQhqwECQAJAIKsBDQBBASGsASCsASGtAQwBCyAEKAJQIa4BIK4BKAIUIa8BIK8BIa0BCyCtASGwASAEKAJQIbEBILEBILABNgIUIAQoAlAhsgEgsgEoAhghswECQAJAILMBDQBBASG0ASC0ASG1AQwBCyAEKAJQIbYBILYBKAIYIbcBILcBIbUBCyC1ASG4ASAEKAJQIbkBILkBILgBNgIYIAQoAlghugFBASG7ASC6ASC7AWohvAEgBCC8ATYCWAwACwALQQAhvQEgBCC9ATYCTAJAA0AgBCgCTCG+AUEQIb8BIL4BIL8BSCHAAUEBIcEBIMABIMEBcSHCASDCAUUNAUEIIcMBIAAgwwFqIcQBQeAAIcUBIMQBIMUBaiHGASAEKAJMIccBQQwhyAEgxwEgyAFsIckBIMYBIMkBaiHKASAEIMoBNgJIIAQoAkghywEgywEoAgghzAECQCDMAQ0ADAILIAQoAkghzQEgzQEoAgAhzgFBCCHPASDOASDPAUgh0AFBASHRASDQASDRAXEh0gECQCDSAQ0AQcfJBSHTAUHSxQQh1AFB94gBIdUBQdWfBCHWASDTASDUASDVASDWARAAAAtBCCHXASAAINcBaiHYASAEKAJIIdkBINkBKAIAIdoBQQwh2wEg2gEg2wFsIdwBINgBINwBaiHdASAEIN0BNgJEIAQoAkQh3gEg3gEoAgQh3wECQAJAIN8BDQBBASHgASDgASHhAQwBCyAEKAJEIeIBIOIBKAIEIeMBIOMBIeEBCyDhASHkASAEKAJEIeUBIOUBIOQBNgIEIAQoAkQh5gEg5gEoAggh5wECQAJAIOcBDQBBASHoASDoASHpAQwBCyAEKAJEIeoBIOoBKAIIIesBIOsBIekBCyDpASHsASAEKAJEIe0BIO0BIOwBNgIIIAQoAkwh7gFBASHvASDuASDvAWoh8AEgBCDwATYCTAwACwALQSAh8QEgBCDxAWoh8gEg8gEh8wFBICH0ASDzASD0ARCvAUEBIfUBIAQg9QE6AB9BACH2ASAEIPYBNgIYAkADQCAEKAIYIfcBQRAh+AEg9wEg+AFIIfkBQQEh+gEg+QEg+gFxIfsBIPsBRQ0BQQgh/AEgACD8AWoh/QFB4AAh/gEg/QEg/gFqIf8BIAQoAhghgAJBDCGBAiCAAiCBAmwhggIg/wEgggJqIYMCIIMCKAIEIYQCAkAghAJFDQBBACGFAiAEIIUCOgAfCyAEKAIYIYYCQQEhhwIghgIghwJqIYgCIAQgiAI2AhgMAAsAC0EAIYkCIAQgiQI2AhQCQANAIAQoAhQhigJBECGLAiCKAiCLAkghjAJBASGNAiCMAiCNAnEhjgIgjgJFDQFBCCGPAiAAII8CaiGQAkHgACGRAiCQAiCRAmohkgIgBCgCFCGTAkEMIZQCIJMCIJQCbCGVAiCSAiCVAmohlgIgBCCWAjYCECAEKAIQIZcCIJcCKAIIIZgCAkAgmAINAAwCCyAEKAIQIZkCIJkCKAIAIZoCQQghmwIgmgIgmwJIIZwCQQEhnQIgnAIgnQJxIZ4CAkAgngINAEHHyQUhnwJB0sUEIaACQYyJASGhAkHVnwQhogIgnwIgoAIgoQIgogIQAAALIAQtAB8howJBASGkAiCjAiCkAnEhpQICQCClAkUNACAEKAIQIaYCIKYCKAIAIacCQSAhqAIgBCCoAmohqQIgqQIhqgJBAiGrAiCnAiCrAnQhrAIgqgIgrAJqIa0CIK0CKAIAIa4CIAQoAhAhrwIgrwIgrgI2AgQLIAQoAhAhsAIgsAIoAgghsQIgsQIQ5QEhsgIgBCgCECGzAiCzAigCACG0AkEgIbUCIAQgtQJqIbYCILYCIbcCQQIhuAIgtAIguAJ0IbkCILcCILkCaiG6AiC6AigCACG7AiC7AiCyAmohvAIgugIgvAI2AgAgBCgCFCG9AkEBIb4CIL0CIL4CaiG/AiAEIL8CNgIUDAALAAtBACHAAiAEIMACNgIMAkADQCAEKAIMIcECQQghwgIgwQIgwgJIIcMCQQEhxAIgwwIgxAJxIcUCIMUCRQ0BQQghxgIgACDGAmohxwIgBCgCDCHIAkEMIckCIMgCIMkCbCHKAiDHAiDKAmohywIgBCDLAjYCCCAEKAIIIcwCIMwCKAIAIc0CAkAgzQINACAEKAIMIc4CQSAhzwIgBCDPAmoh0AIg0AIh0QJBAiHSAiDOAiDSAnQh0wIg0QIg0wJqIdQCINQCKAIAIdUCIAQoAggh1gIg1gIg1QI2AgALIAQoAgwh1wJBASHYAiDXAiDYAmoh2QIgBCDZAjYCDAwACwALQeAAIdoCIAQg2gJqIdsCINsCJAAPC4AFAU9/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgwgBCABNgIIIAQoAgwhBUEAIQYgBSAGRyEHQQEhCCAHIAhxIQkCQAJAIAlFDQAgBCgCDCEKIAooAgQhC0EBIQwgCyAMRiENQQEhDiANIA5xIQ8gDw0BC0GssAYhEEHSxQQhEUG/igEhEkGw/QQhEyAQIBEgEiATEAAACyAEKAIIIRRBACEVIBQgFUchFkEBIRcgFiAXcSEYAkAgGA0AQdXDBSEZQdLFBCEaQcCKASEbQbD9BCEcIBkgGiAbIBwQAAALIAQoAgghHSAdEOYBIR5BASEfIB4gH3EhIAJAAkAgIEUNACAEKAIIISEgISgCBCEiQZDuByEjQaABISQgIyAkaiElICUgIhDTASEmIAQgJjYCBCAEKAIEISdBACEoICcgKEchKUEBISogKSAqcSErAkACQCArRQ0AIAQoAgQhLCAsKAIEIS1BAiEuIC0gLkYhL0EBITAgLyAwcSExIDFFDQAgBCgCDCEyQQghMyAyIDNqITQgBCgCCCE1IDQgNRDnASAEKAIMITYgBCgCBCE3IAQoAgghOCA2IDcgOBDoASE5IAQoAgwhOiA6IDk2AgQMAQsgBCgCDCE7QQMhPCA7IDw2AgQLDAELIAQoAgwhPUEDIT4gPSA+NgIECyAEKAIMIT8gPygCBCFAQQIhQSBAIEFGIUJBASFDIEIgQ3EhRAJAIEQNACAEKAIMIUUgRSgCBCFGQQMhRyBGIEdGIUhBASFJIEggSXEhSiBKDQBBiqwGIUtB0sUEIUxBzIoBIU1BsP0EIU4gSyBMIE0gThAAAAtBECFPIAQgT2ohUCBQJAAPC6cDAR5/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgggAygCCCEEQREhBSAEIAVLGgJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgBA4SEQABAgMEBQYHCAkKCwwNDg8QEgtBBCEGIAMgBjYCDAwSC0EIIQcgAyAHNgIMDBELQQwhCCADIAg2AgwMEAtBECEJIAMgCTYCDAwPC0EEIQogAyAKNgIMDA4LQQQhCyADIAs2AgwMDQtBBCEMIAMgDDYCDAwMC0EEIQ0gAyANNgIMDAsLQQQhDiADIA42AgwMCgtBBCEPIAMgDzYCDAwJC0EEIRAgAyAQNgIMDAgLQQghESADIBE2AgwMBwtBCCESIAMgEjYCDAwGC0EIIRMgAyATNgIMDAULQQQhFCADIBQ2AgwMBAtBBCEVIAMgFTYCDAwDC0EIIRYgAyAWNgIMDAILQQAhFyADIBc2AgwMAQtB/P4FIRhB0sUEIRlBkzEhGkGH0gQhGyAYIBkgGiAbEAAACyADKAIMIRxBECEdIAMgHWohHiAeJAAgHA8LygoCnAF/An4jACEBQSAhAiABIAJrIQMgAyQAIAMgADYCGEEAIQQgBC0AuO4HIQVBASEGIAUgBnEhBwJAAkAgB0UNAEEBIQhBASEJIAggCXEhCiADIAo6AB8MAQsgAygCGCELQQAhDCALIAxHIQ1BASEOIA0gDnEhDwJAIA8NAEHVwwUhEEHSxQQhEUHugwEhEkG8wgUhEyAQIBEgEiATEAAACxDxASADKAIYIRQgFCgCACEVAkAgFUUNAEGvASEWQQAhFyAXIBY2AqzvB0GvASEYQQEhGUEAIRpB8IMBIRsgGCAZIBogGxDGAQsgAygCGCEcIBwoAqgEIR0CQCAdRQ0AQa8BIR5BACEfIB8gHjYCrO8HQa8BISBBASEhQQAhIkHxgwEhIyAgICEgIiAjEMYBCyADKAIYISQgJCgCBCElAkAgJQ0AQbABISZBACEnICcgJjYCrO8HQbABIShBASEpQQAhKkHygwEhKyAoICkgKiArEMYBC0EAISwgAyAsNgIUAkADQCADKAIUIS1BCCEuIC0gLkghL0EBITAgLyAwcSExIDFFDQEgAygCGCEyQQghMyAyIDNqITQgAygCFCE1QQwhNiA1IDZsITcgNCA3aiE4IAMgODYCECADKAIQITkgOSgCACE6AkACQCA6DQAMAQsgAygCECE7IDsoAgAhPCA8IT0gPawhnQFCBCGeASCdASCeARCKAiE+QQEhPyA+ID9xIUACQCBADQBBsgEhQUEAIUIgQiBBNgKs7wdBsgEhQ0EBIURBACFFQfiDASFGIEMgRCBFIEYQxgELCyADKAIUIUdBASFIIEcgSGohSSADIEk2AhQMAAsACyADKAIYIUogSigCBCFLQZDuByFMQaABIU0gTCBNaiFOIE4gSxDTASFPIAMgTzYCDCADKAIMIVBBACFRIFEgUEchUkEBIVMgUiBTcSFUAkAgVA0AQbABIVVBACFWIFYgVTYCrO8HQbABIVdBASFYQQAhWUH7gwEhWiBXIFggWSBaEMYBCyADKAIMIVtBACFcIFsgXEchXUEBIV4gXSBecSFfAkAgX0UNACADKAIMIWAgYCgCBCFhQQIhYiBhIGJGIWNBASFkIGMgZHEhZQJAIGUNAEGwASFmQQAhZyBnIGY2AqzvB0GwASFoQQEhaUEAIWpB/YMBIWsgaCBpIGogaxDGAQtBASFsIAMgbDoAC0EAIW0gAyBtNgIEAkADQCADKAIEIW5BECFvIG4gb0ghcEEBIXEgcCBxcSFyIHJFDQEgAygCGCFzQQghdCBzIHRqIXVB4AAhdiB1IHZqIXcgAygCBCF4QQwheSB4IHlsIXogdyB6aiF7IAMgezYCACADKAIAIXwgfCgCCCF9AkACQCB9DQBBACF+IAMgfjoACwwBCyADLQALIX9BASGAASB/IIABcSGBAQJAIIEBDQBBsQEhggFBACGDASCDASCCATYCrO8HQbEBIYQBQQEhhQFBACGGAUGFhAEhhwEghAEghQEghgEghwEQxgELIAMoAgAhiAEgiAEoAgAhiQFBCCGKASCJASCKAUghiwFBASGMASCLASCMAXEhjQECQCCNAQ0AQcfJBSGOAUHSxQQhjwFBhoQBIZABQbzCBSGRASCOASCPASCQASCRARAAAAsLIAMoAgQhkgFBASGTASCSASCTAWohlAEgAyCUATYCBAwACwALCxD1ASGVAUEBIZYBIJUBIJYBcSGXASADIJcBOgAfCyADLQAfIZgBQQEhmQEgmAEgmQFxIZoBQSAhmwEgAyCbAWohnAEgnAEkACCaAQ8L9Q0CugF/Dn4jACECQSAhAyACIANrIQQgBCQAIAQgADYCHCAEIAE2AhggBCgCGCEFIAUoAugCIQZBACEHIAYgB04hCEEBIQkgCCAJcSEKAkACQCAKRQ0AIAQoAhghCyALKALoAiEMQQQhDSAMIA1MIQ5BASEPIA4gD3EhECAQDQELQbCmBiERQdLFBCESQcQpIRNB7IoEIRQgESASIBMgFBAAAAtBgAIhFSAEIBU2AhRBACEWIAQgFjYCEAJAA0AgBCgCECEXQQghGCAXIBhIIRlBASEaIBkgGnEhGyAbRQ0BIAQoAhghHEEIIR0gHCAdaiEeQeAAIR8gHiAfaiEgIAQoAhAhIUEMISIgISAibCEjICAgI2ohJCAEICQ2AgwgBCgCDCElICUoAgghJgJAICZFDQAgBCgCDCEnICcoAgAhKEEIISkgKCApSCEqQQEhKyAqICtxISwCQCAsDQBBx8kFIS1B0sUEIS5BySkhL0HsigQhMCAtIC4gLyAwEAAACyAEKAIcITEgBCgCDCEyIDIoAgAhMyAxIDNqITRBASE1IDQgNToAACAEKAIcITYgNigCDCE3QYACITggNyA4ciE5IDYgOTYCDAsgBCgCECE6QQEhOyA6IDtqITwgBCA8NgIQDAALAAsgBCgCHCE9QQAhPiA9ID46AAggBCgCHCE/QRAhQCA/IEBqIUEgBCgCGCFCQQQhQyBCIENqIUQgRCgCACFFIEEgRTYCACAEKAIcIUZBFCFHIEYgR2ohSCAEKAIYIUlBCCFKIEkgSmohS0GgAiFMIEggSyBMEPcCGiAEKAIcIU1BtAIhTiBNIE5qIU8gBCgCGCFQQagCIVEgUCBRaiFSIFIpAgAhvAEgTyC8ATcCAEEQIVMgTyBTaiFUIFIgU2ohVSBVKQIAIb0BIFQgvQE3AgBBCCFWIE8gVmohVyBSIFZqIVggWCkCACG+ASBXIL4BNwIAIAQoAhwhWUHMAiFaIFkgWmohWyAEKAIYIVxBwAIhXSBcIF1qIV4gXikCACG/ASBbIL8BNwIAQSAhXyBbIF9qIWAgXiBfaiFhIGEpAgAhwAEgYCDAATcCAEEYIWIgWyBiaiFjIF4gYmohZCBkKQIAIcEBIGMgwQE3AgBBECFlIFsgZWohZiBeIGVqIWcgZykCACHCASBmIMIBNwIAQQghaCBbIGhqIWkgXiBoaiFqIGopAgAhwwEgaSDDATcCACAEKAIYIWsgaygC6AIhbCAEKAIcIW0gbSBsNgL0AkEAIW4gBCBuNgIIAkADQCAEKAIIIW8gBCgCGCFwIHAoAugCIXEgbyBxSCFyQQEhcyByIHNxIXQgdEUNASAEKAIcIXVB+AIhdiB1IHZqIXcgBCgCCCF4QSQheSB4IHlsIXogdyB6aiF7IAQoAhghfEHsAiF9IHwgfWohfiAEKAIIIX9BJCGAASB/IIABbCGBASB+IIEBaiGCASCCASkCACHEASB7IMQBNwIAQSAhgwEgeyCDAWohhAEgggEggwFqIYUBIIUBKAIAIYYBIIQBIIYBNgIAQRghhwEgeyCHAWohiAEgggEghwFqIYkBIIkBKQIAIcUBIIgBIMUBNwIAQRAhigEgeyCKAWohiwEgggEgigFqIYwBIIwBKQIAIcYBIIsBIMYBNwIAQQghjQEgeyCNAWohjgEgggEgjQFqIY8BII8BKQIAIccBII4BIMcBNwIAIAQoAgghkAFBASGRASCQASCRAWohkgEgBCCSATYCCAwACwALIAQoAhghkwEgkwEoAvwDIZQBIAQoAhwhlQEglQEglAE2AogEIAQoAhghlgEglgEoAoAEIZcBIAQoAhwhmAEgmAEglwE2AowEIAQoAhwhmQEgmQEoAowEIZoBQQEhmwEgmgEgmwFHIZwBQQEhnQEgnAEgnQFxIZ4BAkAgngFFDQAgBCgCHCGfASCfASgCDCGgAUGAAiGhASCgASChAXIhogEgnwEgogE2AgwLIAQoAhghowEgowEoAoQEIaQBIAQoAhwhpQEgpQEgpAE2ApAEIAQoAhghpgEgpgEoAogEIacBIAQoAhwhqAEgqAEgpwE2ApQEIAQoAhghqQEgqQEoAowEIaoBIAQoAhwhqwEgqwEgqgE2ApgEIAQoAhwhrAFBnAQhrQEgrAEgrQFqIa4BIAQoAhghrwFBkAQhsAEgrwEgsAFqIbEBILEBKQIAIcgBIK4BIMgBNwIAQQghsgEgrgEgsgFqIbMBILEBILIBaiG0ASC0ASkCACHJASCzASDJATcCACAEKAIYIbUBILUBLQCgBCG2ASAEKAIcIbcBQQEhuAEgtgEguAFxIbkBILcBILkBOgCsBEEgIboBIAQgugFqIbsBILsBJAAPC14BCX8jACEDQRAhBCADIARrIQUgBSQAIAUgADYCDCAFIAE2AgggBSACNgIEIAUoAgwhBiAFKAIIIQcgBSgCBCEIIAYgByAIEOcCIQlBECEKIAUgCmohCyALJAAgCQ8LqQQBRX8jACEBQdAAIQIgASACayEDIAMkACADIAA2AkhBACEEIAQtAJDuByEFQQEhBiAFIAZxIQcCQCAHDQBB9ZkFIQhB0sUEIQlBoZABIQpB0bUEIQsgCCAJIAogCxAAAAsgAygCSCEMQQAhDSAMIA1HIQ5BASEPIA4gD3EhEAJAIBANAEHVwwUhEUHSxQQhEkGikAEhE0HRtQQhFCARIBIgEyAUEAAACyADKAJIIRVBECEWIAMgFmohFyAXIRggGCAVENkBEMcBIRkgAyAZNgJMIAMoAkwhGgJAIBpFDQAgAygCTCEbQZDuByEcQaABIR0gHCAdaiEeIB4gGxDNASEfIAMgHzYCDCADKAIMISBBACEhICAgIUchIkEBISMgIiAjcSEkAkACQCAkRQ0AIAMoAgwhJSAlKAIEISZBASEnICYgJ0YhKEEBISkgKCApcSEqICoNAQtB37AGIStB0sUEISxBp5ABIS1B0bUEIS4gKyAsIC0gLhAAAAsgAygCDCEvQRAhMCADIDBqITEgMSEyIC8gMhDaASADKAIMITMgMygCBCE0QQIhNSA0IDVGITZBASE3IDYgN3EhOAJAIDgNACADKAIMITkgOSgCBCE6QQMhOyA6IDtGITxBASE9IDwgPXEhPiA+DQBBmq4GIT9B0sUEIUBBqZABIUFB0bUEIUIgPyBAIEEgQhAAAAsLIAMoAkwhQ0HQACFEIAMgRGohRSBFJAAgQw8LsAQBRX8jACEBQeAUIQIgASACayEDIAMkACADIAA2AtgUQQAhBCAELQCQ7gchBUEBIQYgBSAGcSEHAkAgBw0AQfWZBSEIQdLFBCEJQc6QASEKQZ26BCELIAggCSAKIAsQAAALIAMoAtgUIQxBACENIAwgDUchDkEBIQ8gDiAPcSEQAkAgEA0AQdXDBSERQdLFBCESQc+QASETQZ26BCEUIBEgEiATIBQQAAALIAMoAtgUIRVBBCEWIAMgFmohFyAXIRggGCAVEN4BEMoBIRkgAyAZNgLcFCADKALcFCEaAkAgGkUNACADKALcFCEbQZDuByEcQaABIR0gHCAdaiEeIB4gGxDUASEfIAMgHzYCACADKAIAISBBACEhICAgIUchIkEBISMgIiAjcSEkAkACQCAkRQ0AIAMoAgAhJSAlKAIEISZBASEnICYgJ0YhKEEBISkgKCApcSEqICoNAQtBkrEGIStB0sUEISxB1JABIS1BnboEIS4gKyAsIC0gLhAAAAsgAygCACEvQQQhMCADIDBqITEgMSEyIC8gMhDfASADKAIAITMgMygCBCE0QQIhNSA0IDVGITZBASE3IDYgN3EhOAJAIDgNACADKAIAITkgOSgCBCE6QQMhOyA6IDtGITxBASE9IDwgPXEhPiA+DQBB0K8GIT9B0sUEIUBB1pABIUFBnboEIUIgPyBAIEEgQhAAAAsLIAMoAtwUIUNB4BQhRCADIERqIUUgRSQAIEMPC7AEAUV/IwAhAUHABCECIAEgAmshAyADJAAgAyAANgK4BEEAIQQgBC0AkO4HIQVBASEGIAUgBnEhBwJAIAcNAEH1mQUhCEHSxQQhCUHdkAEhCkGH/gQhCyAIIAkgCiALEAAACyADKAK4BCEMQQAhDSAMIA1HIQ5BASEPIA4gD3EhEAJAIBANAEHVwwUhEUHSxQQhEkHekAEhE0GH/gQhFCARIBIgEyAUEAAACyADKAK4BCEVQQwhFiADIBZqIRcgFyEYIBggFRDjARDLASEZIAMgGTYCvAQgAygCvAQhGgJAIBpFDQAgAygCvAQhG0GQ7gchHEGgASEdIBwgHWohHiAeIBsQ1gEhHyADIB82AgggAygCCCEgQQAhISAgICFHISJBASEjICIgI3EhJAJAAkAgJEUNACADKAIIISUgJSgCBCEmQQEhJyAmICdGIShBASEpICggKXEhKiAqDQELQaywBiErQdLFBCEsQeOQASEtQYf+BCEuICsgLCAtIC4QAAALIAMoAgghL0EMITAgAyAwaiExIDEhMiAvIDIQ5AEgAygCCCEzIDMoAgQhNEECITUgNCA1RiE2QQEhNyA2IDdxITgCQCA4DQAgAygCCCE5IDkoAgQhOkEDITsgOiA7RiE8QQEhPSA8ID1xIT4gPg0AQeSsBiE/QdLFBCFAQeWQASFBQYf+BCFCID8gQCBBIEIQAAALCyADKAK8BCFDQcAEIUQgAyBEaiFFIEUkACBDDwubCgGXAX8jACEBQdABIQIgASACayEDIAMkACADIAA2AswBQQAhBCAELQCQ7gchBUEBIQYgBSAGcSEHAkAgBw0AQfWZBSEIQdLFBCEJQduRASEKQaygBCELIAggCSAKIAsQAAALQQAhDCAMLQD87gchDUEBIQ4gDSAOcSEPAkAgD0UNAEHImQUhEEHSxQQhEUHckQEhEkGsoAQhEyAQIBEgEiATEAAAC0EAIRQgFC0A/e4HIRVBASEWIBUgFnEhFwJAIBdFDQBBuqAEIRhB0sUEIRlB3ZEBIRpBrKAEIRsgGCAZIBogGxAAAAsgAygCzAEhHEEAIR0gHCAdRyEeQQEhHyAeIB9xISACQCAgDQBB56AEISFB0sUEISJB3pEBISNBrKAEISQgISAiICMgJBAAAAsgAygCzAEhJSAlKAIAISYCQAJAICYNACADKALMASEnICcoAsABISggKEUNAQtB+9MGISlB0sUEISpB35EBIStBrKAEISwgKSAqICsgLBAAAAsgAygCzAEhLUEIIS4gAyAuaiEvIC8hMCAwIC0Q7QFBCCExIAMgMWohMiAyITMgMxDuASE0QQEhNSA0IDVxITYCQAJAIDYNAAwBCyADKAKEASE3AkACQCA3RQ0AQQAhOCA4KAKE7wchOUEAITogOSA6RiE7QQEhPCA7IDxxIT0CQCA9DQBBz/AFIT5B0sUEIT9B5pEBIUBBrKAEIUEgPiA/IEAgQRAAAAsgAygChAEhQkGQ7gchQ0GgASFEIEMgRGohRSBFIEIQ1wEhRkEAIUcgRyBGNgKE7wdBACFIIEgoAoTvByFJQQAhSiBKIElGIUtBASFMIEsgTHEhTQJAIE1FDQBB4gAhTkEBIU9BACFQQemRASFRIE4gTyBQIFEQxgEMAwtBCCFSIAMgUmohUyBTIVRB/AAhVSBUIFVqIVYgVigCACFXQQAhWCBYIFc2AoDvB0EAIVkgWSgChO8HIVogWigCCCFbQQAhXCBcIFs2AojvB0EAIV0gXSgChO8HIV4gXigCDCFfQQAhYCBgIF82AozvBwwBCyADKAKIASFhQQAhYiBhIGJKIWNBASFkIGMgZHEhZQJAIGUNAEHF5QUhZkHSxQQhZ0HxkQEhaEGsoAQhaSBmIGcgaCBpEAAACyADKAKMASFqQQAhayBqIGtKIWxBASFtIGwgbXEhbgJAIG4NAEGR5AUhb0HSxQQhcEHykQEhcUGsoAQhciBvIHAgcSByEAAACyADKAKUASFzQQEhdCBzIHRLIXVBASF2IHUgdnEhdwJAIHcNAEHv0gUheEHSxQQheUHzkQEhekGsoAQheyB4IHkgeiB7EAAACyADKAKQASF8QQAhfSB8IH1KIX5BASF/IH4gf3EhgAECQCCAAQ0AQf7iBSGBAUHSxQQhggFB9JEBIYMBQaygBCGEASCBASCCASCDASCEARAAAAsgAygCiAEhhQFBACGGASCGASCFATYCiO8HIAMoAowBIYcBQQAhiAEgiAEghwE2AozvByADKAKUASGJAUEAIYoBIIoBIIkBNgKQ7wcgAygCmAEhiwFBACGMASCMASCLATYClO8HIAMoApABIY0BQQAhjgEgjgEgjQE2ApjvBwtBASGPAUEAIZABIJABII8BOgD87gdBASGRAUEAIZIBIJIBIJEBOgD97gdBCCGTASADIJMBaiGUASCUASGVASCVARDvAQtB0AEhlgEgAyCWAWohlwEglwEkAA8L0QIBJH8jACECQYABIQMgAiADayEEIAQkACAEIAE2AnwgBCgCfCEFQcQBIQYgACAFIAYQ9wIaIAAoAnwhBwJAIAcNACAAKAKIASEIAkACQCAIDQBBACEJIAkoAuDuByEKIAohCwwBCyAAKAKIASEMIAwhCwsgCyENIAAgDTYCiAEgACgCjAEhDgJAAkAgDg0AQQAhDyAPKALY7gchECAQIREMAQsgACgCjAEhEiASIRELIBEhEyAAIBM2AowBIAAoApABIRQCQAJAIBQNAEEAIRUgFSgC3O4HIRYgFiEXDAELIAAoApABIRggGCEXCyAXIRkgACAZNgKQAQtBBCEaIAAgGmohG0EEIRwgACAcaiEdQQQhHiAEIB5qIR8gHyEgICAgHRDwAUH4ACEhQQQhIiAEICJqISMgGyAjICEQ9wIaQYABISQgBCAkaiElICUkAA8LohUBqAJ/IwAhAUEwIQIgASACayEDIAMkACADIAA2AihBACEEIAQtALjuByEFQQEhBiAFIAZxIQcCQAJAIAdFDQBBASEIQQEhCSAIIAlxIQogAyAKOgAvDAELEPEBIAMoAighCyALKAIAIQwCQCAMRQ0AQdMBIQ1BACEOIA4gDTYCrO8HQdMBIQ9BASEQQQAhEUGAhQEhEiAPIBAgESASEMYBCyADKAIoIRMgEygCwAEhFAJAIBRFDQBB0wEhFUEAIRYgFiAVNgKs7wdB0wEhF0EBIRhBACEZQYGFASEaIBcgGCAZIBoQxgELIAMoAighGyAbKAJ8IRwCQAJAIBwNACADKAIoIR0gHSgCgAEhHkEAIR8gHiAfSiEgQQEhISAgICFxISICQCAiDQBB2QEhI0EAISQgJCAjNgKs7wdB2QEhJUEBISZBACEnQYSFASEoICUgJiAnICgQxgELIAMoAighKSApKAKEASEqQQAhKyAqICtKISxBASEtICwgLXEhLgJAIC4NAEHbASEvQQAhMCAwIC82AqzvB0HbASExQQEhMkEAITNBhYUBITQgMSAyIDMgNBDGAQsgAygCKCE1IDUoAogBITZBACE3IDYgN0ohOEEBITkgOCA5cSE6AkAgOg0AQd0BITtBACE8IDwgOzYCrO8HQd0BIT1BASE+QQAhP0GGhQEhQCA9ID4gPyBAEMYBCyADKAIoIUEgQSgCjAEhQkEBIUMgQiBDSyFEQQEhRSBEIEVxIUYCQCBGDQBB3wEhR0EAIUggSCBHNgKs7wdB3wEhSUEBIUpBACFLQYeFASFMIEkgSiBLIEwQxgELDAELIAMoAighTSBNKAJ8IU5BkO4HIU9BoAEhUCBPIFBqIVEgUSBOENcBIVIgAyBSNgIkIAMoAiQhU0EAIVQgUyBURyFVQQEhViBVIFZxIVcCQAJAIFdFDQAgAygCJCFYIFgoAgQhWUECIVogWSBaRiFbQQEhXCBbIFxxIV0CQCBdDQBB1QEhXkEAIV8gXyBeNgKs7wdB1QEhYEEBIWFBACFiQbOFASFjIGAgYSBiIGMQxgELQQAhZCADIGQ2AiACQANAIAMoAiAhZUEEIWYgZSBmSCFnQQEhaCBnIGhxIWkgaUUNASADKAIkIWpBCCFrIGoga2ohbEEMIW0gbCBtaiFuIAMoAiAhb0EMIXAgbyBwbCFxIG4gcWohciADIHI2AhwgAygCJCFzIAMoAiAhdCBzIHQQ8gEhdSADIHU2AhggAygCGCF2QQAhdyB2IHdHIXhBASF5IHggeXEhegJAIHpFDQAgAygCGCF7IHsoAgQhfEECIX0gfCB9RiF+QQEhfyB+IH9xIYABAkAggAENAEHWASGBAUEAIYIBIIIBIIEBNgKs7wdB1gEhgwFBASGEAUEAIYUBQbiFASGGASCDASCEASCFASCGARDGAQsgAygCGCGHASCHASgCACGIASADKAIcIYkBIIkBKAIAIYoBIIgBIIoBRiGLAUEBIYwBIIsBIIwBcSGNAQJAII0BDQBB1gEhjgFBACGPASCPASCOATYCrO8HQdYBIZABQQEhkQFBACGSAUG5hQEhkwEgkAEgkQEgkgEgkwEQxgELCyADKAIkIZQBQQghlQEglAEglQFqIZYBQTwhlwEglgEglwFqIZgBIAMoAiAhmQFBDCGaASCZASCaAWwhmwEgmAEgmwFqIZwBIAMgnAE2AhQgAygCJCGdASADKAIgIZ4BIJ0BIJ4BEPMBIZ8BIAMgnwE2AhAgAygCECGgAUEAIaEBIKABIKEBRyGiAUEBIaMBIKIBIKMBcSGkAQJAIKQBRQ0AIAMoAhAhpQEgpQEoAgQhpgFBAiGnASCmASCnAUYhqAFBASGpASCoASCpAXEhqgECQCCqAQ0AQdcBIasBQQAhrAEgrAEgqwE2AqzvB0HXASGtAUEBIa4BQQAhrwFBvoUBIbABIK0BIK4BIK8BILABEMYBCyADKAIQIbEBILEBKAIAIbIBIAMoAhQhswEgswEoAgAhtAEgsgEgtAFGIbUBQQEhtgEgtQEgtgFxIbcBAkAgtwENAEHXASG4AUEAIbkBILkBILgBNgKs7wdB1wEhugFBASG7AUEAIbwBQb+FASG9ASC6ASC7ASC8ASC9ARDGAQsLIAMoAiAhvgFBASG/ASC+ASC/AWohwAEgAyDAATYCIAwACwALIAMoAiQhwQEgwQEQ9AEhwgEgAyDCATYCDCADKAIMIcMBQQAhxAEgwwEgxAFHIcUBQQEhxgEgxQEgxgFxIccBAkAgxwFFDQAgAygCJCHIAUEIIckBIMgBIMkBaiHKAUHsACHLASDKASDLAWohzAEgAyDMATYCCCADKAIMIc0BIM0BKAIEIc4BQQIhzwEgzgEgzwFGIdABQQEh0QEg0AEg0QFxIdIBAkAg0gENAEHYASHTAUEAIdQBINQBINMBNgKs7wdB2AEh1QFBASHWAUEAIdcBQcWFASHYASDVASDWASDXASDYARDGAQsgAygCDCHZASDZASgCACHaASADKAIIIdsBINsBKAIAIdwBINoBINwBRiHdAUEBId4BIN0BIN4BcSHfAQJAIN8BDQBB2AEh4AFBACHhASDhASDgATYCrO8HQdgBIeIBQQEh4wFBACHkAUHGhQEh5QEg4gEg4wEg5AEg5QEQxgELCwwBCyADKAIkIeYBQQAh5wEg5gEg5wFHIegBQQEh6QEg6AEg6QFxIeoBAkAg6gENAEHUASHrAUEAIewBIOwBIOsBNgKs7wdB1AEh7QFBASHuAUEAIe8BQcmFASHwASDtASDuASDvASDwARDGAQsLIAMoAigh8QEg8QEoAoABIfIBAkAg8gFFDQBB2gEh8wFBACH0ASD0ASDzATYCrO8HQdoBIfUBQQEh9gFBACH3AUHMhQEh+AEg9QEg9gEg9wEg+AEQxgELIAMoAigh+QEg+QEoAoQBIfoBAkAg+gFFDQBB3AEh+wFBACH8ASD8ASD7ATYCrO8HQdwBIf0BQQEh/gFBACH/AUHNhQEhgAIg/QEg/gEg/wEggAIQxgELIAMoAighgQIggQIoAogBIYICAkAgggJFDQBB3gEhgwJBACGEAiCEAiCDAjYCrO8HQd4BIYUCQQEhhgJBACGHAkHOhQEhiAIghQIghgIghwIgiAIQxgELIAMoAighiQIgiQIoAowBIYoCAkAgigJFDQBB4AEhiwJBACGMAiCMAiCLAjYCrO8HQeABIY0CQQEhjgJBACGPAkHPhQEhkAIgjQIgjgIgjwIgkAIQxgELIAMoAighkQIgkQIoApABIZICAkAgkgJFDQBB4QEhkwJBACGUAiCUAiCTAjYCrO8HQeEBIZUCQQEhlgJBACGXAkHQhQEhmAIglQIglgIglwIgmAIQxgELIAMoAighmQIgmQIoArgBIZoCAkAgmgJFDQBB9AEhmwJBACGcAiCcAiCbAjYCrO8HQfQBIZ0CQQEhngJBACGfAkHehQEhoAIgnQIgngIgnwIgoAIQxgELCxD1ASGhAkEBIaICIKECIKICcSGjAiADIKMCOgAvCyADLQAvIaQCQQEhpQIgpAIgpQJxIaYCQTAhpwIgAyCnAmohqAIgqAIkACCmAg8LOgEGfyMAIQFBECECIAEgAmshAyADJAAgAyAANgIMIAMoAgwhBCAEEPYBQRAhBSADIAVqIQYgBiQADwuKBQJGfwV9IwAhAkEQIQMgAiADayEEIAQkACAEIAE2AgwgBCgCDCEFQQAhBiAFIAZHIQdBASEIIAcgCHEhCQJAIAkNAEGtwAQhCkHSxQQhC0G8NCEMQaifBCENIAogCyAMIA0QAAALIAQoAgwhDkH4ACEPIAAgDiAPEPcCGkEAIRAgBCAQNgIIAkADQCAEKAIIIRFBBCESIBEgEkghE0EBIRQgEyAUcSEVIBVFDQEgBCgCCCEWQRghFyAWIBdsIRggACAYaiEZIBkoAgAhGgJAIBoNACAEKAIIIRtBGCEcIBsgHGwhHSAAIB1qIR5BASEfIB4gHzYCACAEKAIIISBBGCEhICAgIWwhIiAAICJqISNDAAAAPyFIICMgSDgCCCAEKAIIISRBGCElICQgJWwhJiAAICZqISdDAAAAPyFJICcgSTgCDCAEKAIIIShBGCEpICggKWwhKiAAICpqIStDAAAAPyFKICsgSjgCECAEKAIIISxBGCEtICwgLWwhLiAAIC5qIS9DAACAPyFLIC8gSzgCFAsgBCgCCCEwQRghMSAwIDFsITIgACAyaiEzIDMoAgQhNAJAIDQNACAEKAIIITVBGCE2IDUgNmwhNyAAIDdqIThBASE5IDggOTYCBAsgBCgCCCE6QQEhOyA6IDtqITwgBCA8NgIIDAALAAsgACgCYCE9AkAgPQ0AQQEhPiAAID42AmBDAACAPyFMIAAgTDgCaAsgACgCZCE/AkAgPw0AQQIhQCAAIEA2AmQLIAAoAmwhQQJAIEENAEEBIUIgACBCNgJsQQAhQyAAIEM6AHQLIAAoAnAhRAJAIEQNAEECIUUgACBFNgJwC0EQIUYgBCBGaiFHIEckAA8LFgECf0EAIQBBACEBIAEgADYCrO8HDwtOAQh/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgwgBCABNgIIIAQoAgwhBSAEKAIIIQYgBSAGEO0CIQdBECEIIAQgCGohCSAJJAAgBw8LTgEIfyMAIQJBECEDIAIgA2shBCAEJAAgBCAANgIMIAQgATYCCCAEKAIMIQUgBCgCCCEGIAUgBhDuAiEHQRAhCCAEIAhqIQkgCSQAIAcPCz4BB38jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQQgBBDvAiEFQRAhBiADIAZqIQcgByQAIAUPC5sBARN/IwAhAEEQIQEgACABayECIAIkAEEAIQMgAygCrO8HIQQCQAJAIARFDQBBpgIhBUEAIQZBs4ABIQcgBSAGIAYgBxDGAUEAIQhBASEJIAggCXEhCiACIAo6AA8MAQtBASELQQEhDCALIAxxIQ0gAiANOgAPCyACLQAPIQ5BASEPIA4gD3EhEEEQIREgAiARaiESIBIkACAQDwuAFgKzAn8BfSMAIQFBMCECIAEgAmshAyADJAAgAyAANgIsIAMoAiwhBEEAIQUgBCAFRyEGQQEhByAGIAdxIQgCQCAIDQBB56AEIQlB0sUEIQpB1MYAIQtBmqAEIQwgCSAKIAsgDBAAAAsQLCENAkAgDUUNAEGA9gUhDkHSxQQhD0HVxgAhEEGaoAQhESAOIA8gECAREAAAC0EAIRIgEigChO8HIRMgAyATNgIoIAMoAiwhFEGAASEVIBQgFWohFiADIBY2AiQgAygCLCEXQQQhGCAXIBhqIRkgAyAZNgIgIAMoAighGkEAIRsgGiAbRyEcQQEhHSAcIB1xIR4CQAJAIB5FDQAgAygCKCEfIB8oAoABISACQCAgDQBBvsQFISFB0sUEISJB5MYAISNBmqAEISQgISAiICMgJBAAAAsgAygCKCElICUoAoABISZBwJoCIScgJyAmEF4MAQsgAygCJCEoICgoAjghKUHAmgIhKiAqICkQXgtBACErICsoAojvByEsQQAhLSAtKAKM7wchLkEAIS8gLyAvICwgLhBfQQAhMCAwKAKI7wchMUEAITIgMigCjO8HITNBACE0IDQgNCAxIDMQYCADKAIoITVBACE2IDUgNkchN0EBITggNyA4cSE5AkACQCA5RQ0AIAMoAighOiA6KAIQITsgOyE8DAELQQEhPSA9ITwLIDwhPiADID42AhxBACE/IAMgPzoAG0EAIUAgAyBANgIUAkADQCADKAIUIUEgAygCHCFCIEEgQkghQ0EBIUQgQyBEcSFFIEVFDQEgAygCICFGIAMoAhQhR0EYIUggRyBIbCFJIEYgSWohSiBKKAIAIUtBASFMIEwgS0YhTUEBIU4gTSBOcSFPAkAgT0UNAEEBIVAgAyBQOgAbDAILIAMoAhQhUUEBIVIgUSBSaiFTIAMgUzYCFAwACwALIAMoAiAhVCBUKAJgIVVBASFWIFUgVkYhV0EBIVggVyBYcSFZIAMgWToAEyADKAIgIVogWigCbCFbQQEhXCBbIFxGIV1BASFeIF0gXnEhXyADIF86ABJBACFgIAMgYDoAESADLQAbIWFBASFiIGEgYnEhYwJAIGNFDQBBACFkIAMgZDoAEEEAIWUgAyBlNgIMAkADQCADKAIMIWZBBCFnIGYgZ0ghaEEBIWkgaCBpcSFqIGpFDQEgAygCDCFrQZDuByFsQaALIW0gbCBtaiFuQQghbyBuIG9qIXBB3AAhcSBwIHFqIXJBAiFzIGsgc3QhdCByIHRqIXUgdSgCACF2QQ8hdyB3IHZHIXhBASF5IHggeXEhegJAIHpFDQBBASF7IAMgezoAEUEBIXwgAyB8OgAQIAMoAgwhfUGQ7gchfkGgCyF/IH4gf2ohgAFBCCGBASCAASCBAWohggFB3AAhgwEgggEggwFqIYQBQQIhhQEgfSCFAXQhhgEghAEghgFqIYcBQQ8hiAEghwEgiAE2AgALIAMoAgwhiQFBASGKASCJASCKAWohiwEgAyCLATYCDAwACwALIAMtABAhjAFBASGNASCMASCNAXEhjgECQCCOAUUNAEEBIY8BQf8BIZABII8BIJABcSGRAUH/ASGSASCPASCSAXEhkwFB/wEhlAEgjwEglAFxIZUBQf8BIZYBII8BIJYBcSGXASCRASCTASCVASCXARA8CwsgAy0AEyGYAUEBIZkBIJgBIJkBcSGaAQJAIJoBRQ0AQQAhmwEgmwEtAMD5ByGcAUEBIZ0BIJwBIJ0BcSGeAQJAIJ4BDQBBASGfASADIJ8BOgARQQEhoAFBACGhASChASCgAToAwPkHQQEhogFB/wEhowEgogEgowFxIaQBIKQBEDQLQQAhpQEgpQEoArz5ByGmAUEIIacBIKYBIKcBRyGoAUEBIakBIKgBIKkBcSGqAQJAIKoBRQ0AQQEhqwEgAyCrAToAEUEIIawBQQAhrQEgrQEgrAE2Arz5B0GHBCGuASCuARAzCwsgAy0AEiGvAUEBIbABIK8BILABcSGxAQJAILEBRQ0AQQAhsgEgsgEtAPX5ByGzAUH/ASG0ASCzASC0AXEhtQFB/wEhtgEgtQEgtgFHIbcBQQEhuAEgtwEguAFxIbkBAkAguQFFDQBBASG6ASADILoBOgARQf8BIbsBQQAhvAEgvAEguwE6APX5B0H/ASG9ASC9ARA4CwsgAy0AESG+AUEBIb8BIL4BIL8BcSHAAQJAIMABRQ0AQQAhwQFBACHCASDCASDBATYCwP8HQQAhwwFBACHEASDEASDDATYCxP8HC0EAIcUBIAMgxQE2AggCQANAIAMoAgghxgEgAygCHCHHASDGASDHAUghyAFBASHJASDIASDJAXEhygEgygFFDQEgAygCICHLASADKAIIIcwBQRghzQEgzAEgzQFsIc4BIMsBIM4BaiHPASDPASgCACHQAUEBIdEBINABINEBRiHSAUEBIdMBINIBINMBcSHUAQJAINQBRQ0AIAMoAggh1QEgAygCICHWASADKAIIIdcBQRgh2AEg1wEg2AFsIdkBINYBINkBaiHaAUEIIdsBINoBINsBaiHcAUGAMCHdASDdASDVASDcARBhCyADKAIIId4BQQEh3wEg3gEg3wFqIeABIAMg4AE2AggMAAsACyADKAIoIeEBQQAh4gEg4QEg4gFGIeMBQQEh5AEg4wEg5AFxIeUBAkACQCDlAQ0AIAMoAigh5gEg5gEoAqQBIecBQQAh6AEg5wEg6AFHIekBQQEh6gEg6QEg6gFxIesBIOsBRQ0BCyADLQATIewBQQEh7QEg7AEg7QFxIe4BAkACQCDuAUUNACADLQASIe8BQQEh8AEg7wEg8AFxIfEBIPEBRQ0AIAMoAiAh8gEg8gEqAmghtAIgAygCICHzASDzAS0AdCH0AUH/ASH1ASD0ASD1AXEh9gFB+YkCIfcBQQAh+AEg9wEg+AEgtAIg9gEQYgwBCyADLQATIfkBQQEh+gEg+QEg+gFxIfsBAkACQCD7AUUNACADKAIgIfwBQeAAIf0BIPwBIP0BaiH+AUEIIf8BIP4BIP8BaiGAAkGBMCGBAkEAIYICIIECIIICIIACEGEMAQsgAy0AEiGDAkEBIYQCIIMCIIQCcSGFAgJAIIUCRQ0AIAMoAiAhhgIghgItAHQhhwJB/wEhiAIghwIgiAJxIYkCIAMgiQI2AgRBgjAhigJBACGLAkEEIYwCIAMgjAJqIY0CII0CIY4CIIoCIIsCII4CEGMLCwsLQQAhjwIgAyCPAjYCAAJAA0AgAygCACGQAkEEIZECIJACIJECSCGSAkEBIZMCIJICIJMCcSGUAiCUAkUNASADKAIgIZUCIAMoAgAhlgJBGCGXAiCWAiCXAmwhmAIglQIgmAJqIZkCIJkCKAIEIZoCIAMoAgAhmwJBkO4HIZwCQaALIZ0CIJwCIJ0CaiGeAkGgBiGfAiCeAiCfAmohoAJBAiGhAiCbAiChAnQhogIgoAIgogJqIaMCIKMCIJoCNgIAIAMoAgAhpAJBASGlAiCkAiClAmohpgIgAyCmAjYCAAwACwALIAMoAiAhpwIgpwIoAmQhqAJBACGpAiCpAiCoAjYC4P8HIAMoAiAhqgIgqgIoAnAhqwJBACGsAiCsAiCrAjYC5P8HECwhrQICQCCtAkUNAEGA9gUhrgJB0sUEIa8CQcLHACGwAkGaoAQhsQIgrgIgrwIgsAIgsQIQAAALQTAhsgIgAyCyAmohswIgswIkAA8L5QUBW38jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDEEAIQQgBC0AkO4HIQVBASEGIAUgBnEhBwJAIAcNAEH1mQUhCEHSxQQhCUGgkgEhCkGC/QQhCyAIIAkgCiALEAAAC0EAIQwgDC0A/e4HIQ1BASEOIA0gDnEhDwJAIA8NAEG7oAQhEEHSxQQhEUGhkgEhEkGC/QQhEyAQIBEgEiATEAAAC0EAIRQgFC0AhPQHIRVBASEWIBUgFnEhFwJAIBdFDQBBACEYIBgoApj0ByEZQQEhGiAZIBpqIRtBACEcIBwgGzYCmPQHCyADKAIMIR0gHRD4ASEeQQEhHyAeIB9xISACQAJAICANAEEAISFBACEiICIgIToAoO8HDAELQQAhIyAjLQD87gchJEEBISUgJCAlcSEmAkAgJg0ADAELIAMoAgwhJ0EAISggKCAnNgKc7wcgAygCDCEpQZDuByEqQaABISsgKiAraiEsICwgKRDVASEtIAMgLTYCCCADKAIIIS5BACEvIC4gL0chMEEBITEgMCAxcSEyAkAgMg0AQbK8BCEzQdLFBCE0QaySASE1QYL9BCE2IDMgNCA1IDYQAAALIAMoAgghNyA3KAIEIThBAiE5IDkgOEYhOkEBITsgOiA7cSE8QQAhPSA9IDw6AKDvByADKAIIIT4gPigCuAQhP0EAIUAgPyBARyFBQQEhQiBBIEJxIUMCQAJAIENFDQAgAygCCCFEIEQoArgEIUUgRSgCACFGIAMoAgghRyBHKAIYIUggRiBIRiFJQQEhSiBJIEpxIUsgSw0BC0GgpAYhTEHSxQQhTUGukgEhTkGC/QQhTyBMIE0gTiBPEAAACyADKAIIIVAgUBD5ASADKAIIIVEgUSgCFCFSIAMoAgghUyBTKAK4BCFUIFQoAgghVSBSIFVyIVZBACFXIFcgVjYCpO8HQQAhWEEAIVkgWSBYNgKo7wcLQRAhWiADIFpqIVsgWyQADwvTEwGXAn8jACEBQSAhAiABIAJrIQMgAyQAIAMgADYCGEEAIQQgBC0AuO4HIQVBASEGIAUgBnEhBwJAAkAgB0UNAEEBIQhBASEJIAggCXEhCiADIAo6AB8MAQsQ8QEgAygCGCELAkAgCw0AQfUBIQxBACENIA0gDDYCrO8HQfUBIQ5BASEPQQAhEEHvhQEhESAOIA8gECAREMYBCyADKAIYIRJBkO4HIRNBoAEhFCATIBRqIRUgFSASENUBIRYgAyAWNgIUIAMoAhQhF0EAIRggFyAYRyEZQQEhGiAZIBpxIRsCQCAbDQBB9gEhHEEAIR0gHSAcNgKs7wdB9gEhHkEBIR9BACEgQfGFASEhIB4gHyAgICEQxgELIAMoAhQhIkEAISMgIiAjRyEkQQEhJSAkICVxISYCQCAmDQAQ9QEhJ0EBISggJyAocSEpIAMgKToAHwwBCyADKAIUISogKigCBCErQQIhLCArICxGIS1BASEuIC0gLnEhLwJAIC8NAEH3ASEwQQAhMSAxIDA2AqzvB0H3ASEyQQEhM0EAITRB9YUBITUgMiAzIDQgNRDGAQsgAygCFCE2IDYoArgEITdBACE4IDcgOEchOUEBITogOSA6cSE7AkAgOw0AQdO6BCE8QdLFBCE9QfeFASE+QZT9BCE/IDwgPSA+ID8QAAALIAMoAhQhQCBAKAK4BCFBIEEoAgAhQiADKAIUIUMgQygCGCFEIEIgREYhRUEBIUYgRSBGcSFHAkAgRw0AQfgBIUhBACFJIEkgSDYCrO8HQfgBIUpBASFLQQAhTEH4hQEhTSBKIEsgTCBNEMYBCyADKAIUIU4gTigCuAQhTyBPKAIEIVBBAiFRIFAgUUYhUkEBIVMgUiBTcSFUAkAgVA0AQfkBIVVBACFWIFYgVTYCrO8HQfkBIVdBASFYQQAhWUH5hQEhWiBXIFggWSBaEMYBC0EAIVsgWygCgO8HIVwCQAJAIFxFDQBBACFdIF0oAoTvByFeIAMgXjYCECADKAIQIV9BACFgIF8gYEchYUEBIWIgYSBicSFjAkAgYw0AQdOZBCFkQdLFBCFlQf6FASFmQZT9BCFnIGQgZSBmIGcQAAALIAMoAhAhaCBoKAIAIWlBACFqIGooAoDvByFrIGkga0YhbEEBIW0gbCBtcSFuAkAgbg0AQfoBIW9BACFwIHAgbzYCrO8HQfoBIXFBASFyQQAhc0H/hQEhdCBxIHIgcyB0EMYBCyADKAIQIXUgdSgCBCF2QQIhdyB2IHdGIXhBASF5IHggeXEhegJAIHoNAEH7ASF7QQAhfCB8IHs2AqzvB0H7ASF9QQEhfkEAIX9BgIYBIYABIH0gfiB/IIABEMYBCyADKAIUIYEBIIEBKAL8AiGCASADKAIQIYMBIIMBKAIQIYQBIIIBIIQBRiGFAUEBIYYBIIUBIIYBcSGHAQJAIIcBDQBB/AEhiAFBACGJASCJASCIATYCrO8HQfwBIYoBQQEhiwFBACGMAUGChgEhjQEgigEgiwEgjAEgjQEQxgELQQAhjgEgAyCOATYCDAJAA0AgAygCDCGPASADKAIUIZABIJABKAL8AiGRASCPASCRAUghkgFBASGTASCSASCTAXEhlAEglAFFDQEgAygCECGVASADKAIMIZYBIJUBIJYBEPIBIZcBIAMglwE2AgggAygCFCGYAUEIIZkBIJgBIJkBaiGaAUH4AiGbASCaASCbAWohnAEgAygCDCGdAUEkIZ4BIJ0BIJ4BbCGfASCcASCfAWohoAEgoAEoAgAhoQEgAygCCCGiASCiASgCMCGjASChASCjAUYhpAFBASGlASCkASClAXEhpgECQCCmAQ0AQf0BIacBQQAhqAEgqAEgpwE2AqzvB0H9ASGpAUEBIaoBQQAhqwFBhYYBIawBIKkBIKoBIKsBIKwBEMYBCyADKAIUIa0BIK0BKAKgBCGuASADKAIIIa8BIK8BKAI0IbABIK4BILABRiGxAUEBIbIBILEBILIBcSGzAQJAILMBDQBB/wEhtAFBACG1ASC1ASC0ATYCrO8HQf8BIbYBQQEhtwFBACG4AUGGhgEhuQEgtgEgtwEguAEguQEQxgELIAMoAgwhugFBASG7ASC6ASC7AWohvAEgAyC8ATYCDAwACwALIAMoAhAhvQEgvQEQ9AEhvgEgAyC+ATYCBCADKAIEIb8BQQAhwAEgvwEgwAFHIcEBQQEhwgEgwQEgwgFxIcMBAkACQCDDAUUNACADKAIUIcQBIMQBKAK8AiHFASADKAIEIcYBIMYBKAIwIccBIMUBIMcBRiHIAUEBIckBIMgBIMkBcSHKAQJAIMoBDQBB/gEhywFBACHMASDMASDLATYCrO8HQf4BIc0BQQEhzgFBACHPAUGKhgEh0AEgzQEgzgEgzwEg0AEQxgELDAELIAMoAhQh0QEg0QEoArwCIdIBQQEh0wEg0gEg0wFGIdQBQQEh1QEg1AEg1QFxIdYBAkAg1gENAEH+ASHXAUEAIdgBINgBINcBNgKs7wdB/gEh2QFBASHaAUEAIdsBQYyGASHcASDZASDaASDbASDcARDGAQsLDAELIAMoAhQh3QEg3QEoAvwCId4BQQEh3wEg3gEg3wFGIeABQQEh4QEg4AEg4QFxIeIBAkAg4gENAEH8ASHjAUEAIeQBIOQBIOMBNgKs7wdB/AEh5QFBASHmAUEAIecBQZCGASHoASDlASDmASDnASDoARDGAQsgAygCFCHpASDpASgCgAMh6gFBACHrASDrASgCkO8HIewBIOoBIOwBRiHtAUEBIe4BIO0BIO4BcSHvAQJAIO8BDQBB/QEh8AFBACHxASDxASDwATYCrO8HQf0BIfIBQQEh8wFBACH0AUGRhgEh9QEg8gEg8wEg9AEg9QEQxgELIAMoAhQh9gEg9gEoArwCIfcBQQAh+AEg+AEoApTvByH5ASD3ASD5AUYh+gFBASH7ASD6ASD7AXEh/AECQCD8AQ0AQf4BIf0BQQAh/gEg/gEg/QE2AqzvB0H+ASH/AUEBIYACQQAhgQJBkoYBIYICIP8BIIACIIECIIICEMYBCyADKAIUIYMCIIMCKAKgBCGEAkEAIYUCIIUCKAKY7wchhgIghAIghgJGIYcCQQEhiAIghwIgiAJxIYkCAkAgiQINAEH/ASGKAkEAIYsCIIsCIIoCNgKs7wdB/wEhjAJBASGNAkEAIY4CQZOGASGPAiCMAiCNAiCOAiCPAhDGAQsLEPUBIZACQQEhkQIgkAIgkQJxIZICIAMgkgI6AB8LIAMtAB8hkwJBASGUAiCTAiCUAnEhlQJBICGWAiADIJYCaiGXAiCXAiQAIJUCDws6AQZ/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEIAQQ+gFBECEFIAMgBWohBiAGJAAPC6tFA+UGf0h9BH4jACEBQdAAIQIgASACayEDIAMkACADIAA2AkwgAygCTCEEQQAhBSAEIAVHIQZBASEHIAYgB3EhCAJAIAgNAEGyvAQhCUHSxQQhCkGGyAAhC0Gs/AQhDCAJIAogCyAMEAAACyADKAJMIQ0gDSgCuAQhDkEAIQ8gDiAPRyEQQQEhESAQIBFxIRICQAJAIBJFDQAgAygCTCETIBMoAhghFCADKAJMIRUgFSgCuAQhFiAWKAIAIRcgFCAXRiEYQQEhGSAYIBlxIRogGg0BC0HhowYhG0HSxQQhHEGHyAAhHUGs/AQhHiAbIBwgHSAeEAAACxAsIR8CQCAfRQ0AQYD2BSEgQdLFBCEhQYjIACEiQaz8BCEjICAgISAiICMQAAALQQAhJCAkKALA/wchJSADKAJMISYgJSAmRyEnQQEhKCAnIChxISkCQAJAICkNAEEAISogKigCxP8HISsgAygCTCEsICwoAgAhLSArIC1HIS5BASEvIC4gL3EhMCAwRQ0BCyADKAJMITFBACEyIDIgMTYCwP8HIAMoAkwhMyAzKAIAITRBACE1IDUgNDYCxP8HIAMoAkwhNiA2KAL8BiE3IDcQ8AIhOEEAITkgOSA4NgK0/wcgAygCTCE6IDooApQEITsgOxDxAiE8QQAhPSA9IDw2Arj/ByADKAJMIT5BvAQhPyA+ID9qIUBBgAIhQSBAIEFqIUIgAyBCNgJIQZDuByFDQaALIUQgQyBEaiFFQQghRiBFIEZqIUcgAyBHNgJEIAMoAkghSCBIKAIEIUkgAygCRCFKIEooAgQhSyBJIEtHIUxBASFNIEwgTXEhTgJAIE5FDQAgAygCSCFPIE8oAgQhUCADKAJEIVEgUSBQNgIEIAMoAkghUiBSKAIEIVMgUxDcAiFUIFQQM0EAIVUgVS0AhPQHIVZBASFXIFYgV3EhWAJAIFhFDQBBACFZIFkoAtj0ByFaQQEhWyBaIFtqIVxBACFdIF0gXDYC2PQHCwsgAygCSCFeIF4tAAghX0EBIWAgXyBgcSFhIAMoAkQhYiBiLQAIIWNBASFkIGMgZHEhZSBhIGVHIWZBASFnIGYgZ3EhaAJAIGhFDQAgAygCSCFpIGktAAghaiADKAJEIWtBASFsIGogbHEhbSBrIG06AAggAygCSCFuIG4tAAghb0EBIXAgbyBwcSFxQf8BIXIgcSBycSFzIHMQNEEAIXQgdC0AhPQHIXVBASF2IHUgdnEhdwJAIHdFDQBBACF4IHgoAtj0ByF5QQEheiB5IHpqIXtBACF8IHwgezYC2PQHCwsgAygCSCF9IH0qAgwh5gYgAygCRCF+IH4qAgwh5wYg5gYg5waTIegGQ703hrUh6QYg6AYg6QZeIX9BASGAASB/IIABcSGBAQJAAkAggQFFDQAgAygCSCGCASCCASoCDCHqBiADKAJEIYMBIIMBKgIMIesGIOoGIOsGkyHsBkO9N4Y1Ie0GIOwGIO0GXSGEAUEBIYUBIIQBIIUBcSGGASCGAUUNACADKAJIIYcBIIcBKgIQIe4GIAMoAkQhiAEgiAEqAhAh7wYg7gYg7waTIfAGQ703hrUh8QYg8AYg8QZeIYkBQQEhigEgiQEgigFxIYsBIIsBRQ0AIAMoAkghjAEgjAEqAhAh8gYgAygCRCGNASCNASoCECHzBiDyBiDzBpMh9AZDvTeGNSH1BiD0BiD1Bl0hjgFBASGPASCOASCPAXEhkAEgkAENAQsgAygCSCGRASCRASoCDCH2BiADKAJEIZIBIJIBIPYGOAIMIAMoAkghkwEgkwEqAhAh9wYgAygCRCGUASCUASD3BjgCECADKAJIIZUBIJUBKgIQIfgGIAMoAkghlgEglgEqAgwh+QYg+AYg+QYQPUEAIZcBIJcBLQCE9AchmAFBASGZASCYASCZAXEhmgECQCCaAUUNAEEAIZsBIJsBKALY9AchnAFBASGdASCcASCdAWohngFBACGfASCfASCeATYC2PQHC0EBIaABIAMgoAE6AEMgAygCSCGhASChASoCDCH6BkEAIaIBIKIBsiH7BiD6BiD7BpMh/AZDvTeGtSH9BiD8BiD9Bl4howFBASGkASCjASCkAXEhpQECQCClAUUNACADKAJIIaYBIKYBKgIMIf4GQQAhpwEgpwGyIf8GIP4GIP8GkyGAB0O9N4Y1IYEHIIAHIIEHXSGoAUEBIakBIKgBIKkBcSGqASCqAUUNACADKAJIIasBIKsBKgIQIYIHQQAhrAEgrAGyIYMHIIIHIIMHkyGEB0O9N4a1IYUHIIQHIIUHXiGtAUEBIa4BIK0BIK4BcSGvASCvAUUNACADKAJIIbABILABKgIQIYYHQQAhsQEgsQGyIYcHIIYHIIcHkyGIB0O9N4Y1IYkHIIgHIIkHXSGyAUEBIbMBILIBILMBcSG0ASC0AUUNAEEAIbUBIAMgtQE6AEMLIAMtAEMhtgFBASG3ASC2ASC3AXEhuAFBACG5ASC5AS0ArPoHIboBQQEhuwEgugEguwFxIbwBILgBILwBRyG9AUEBIb4BIL0BIL4BcSG/AQJAIL8BRQ0AIAMtAEMhwAFBASHBASDAASDBAXEhwgFBACHDASDDASDCAToArPoHIAMtAEMhxAFBASHFASDEASDFAXEhxgECQAJAIMYBRQ0AQbeAAiHHASDHARAyDAELQbeAAiHIASDIARA1C0EAIckBIMkBLQCE9AchygFBASHLASDKASDLAXEhzAECQCDMAUUNAEEAIc0BIM0BKALY9AchzgFBASHPASDOASDPAWoh0AFBACHRASDRASDQATYC2PQHCwsLIAMoAkwh0gFBvAQh0wEg0gEg0wFqIdQBQZgCIdUBINQBINUBaiHWASADINYBNgI8QZDuByHXAUGgCyHYASDXASDYAWoh2QFBCCHaASDZASDaAWoh2wFBGCHcASDbASDcAWoh3QEgAyDdATYCOCADKAI8Id4BIN4BLQAAId8BQQEh4AEg3wEg4AFxIeEBIAMoAjgh4gEg4gEtAAAh4wFBASHkASDjASDkAXEh5QEg4QEg5QFHIeYBQQEh5wEg5gEg5wFxIegBAkAg6AFFDQAgAygCPCHpASDpAS0AACHqASADKAI4IesBQQEh7AEg6gEg7AFxIe0BIOsBIO0BOgAAIAMoAjwh7gEg7gEtAAAh7wFBASHwASDvASDwAXEh8QECQAJAIPEBRQ0AQZAXIfIBIPIBEDIMAQtBkBch8wEg8wEQNQtBACH0ASD0AS0AhPQHIfUBQQEh9gEg9QEg9gFxIfcBAkAg9wFFDQBBACH4ASD4ASgC2PQHIfkBQQEh+gEg+QEg+gFqIfsBQQAh/AEg/AEg+wE2Atj0BwsLIAMoAjwh/QEg/QEtACUh/gFB/wEh/wEg/gEg/wFxIYACIAMoAjghgQIggQItACUhggJB/wEhgwIgggIggwJxIYQCIIACIIQCRyGFAkEBIYYCIIUCIIYCcSGHAgJAIIcCRQ0AIAMoAjwhiAIgiAItACUhiQIgAygCOCGKAiCKAiCJAjoAJSADKAI8IYsCIIsCLQAlIYwCQf8BIY0CIIwCII0CcSGOAiCOAhA4QQAhjwIgjwItAIT0ByGQAkEBIZECIJACIJECcSGSAgJAIJICRQ0AQQAhkwIgkwIoAtj0ByGUAkEBIZUCIJQCIJUCaiGWAkEAIZcCIJcCIJYCNgLY9AcLC0EAIZgCIAMgmAI2AjQCQANAIAMoAjQhmQJBAiGaAiCZAiCaAkghmwJBASGcAiCbAiCcAnEhnQIgnQJFDQEgAygCNCGeAgJAAkAgngINACADKAI8IZ8CQQQhoAIgnwIgoAJqIaECIKECIaICDAELIAMoAjwhowJBFCGkAiCjAiCkAmohpQIgpQIhogILIKICIaYCIAMgpgI2AjAgAygCNCGnAgJAAkAgpwINACADKAI4IagCQQQhqQIgqAIgqQJqIaoCIKoCIasCDAELIAMoAjghrAJBFCGtAiCsAiCtAmohrgIgrgIhqwILIKsCIa8CIAMgrwI2AiwgAygCNCGwAkGECCGxAkGFCCGyAiCyAiCxAiCwAhshswIgAyCzAjYCKCADKAIwIbQCILQCKAIAIbUCIAMoAiwhtgIgtgIoAgAhtwIgtQIgtwJHIbgCQQEhuQIguAIguQJxIboCAkACQCC6Ag0AIAMoAjwhuwIguwItACQhvAJB/wEhvQIgvAIgvQJxIb4CIAMoAjghvwIgvwItACQhwAJB/wEhwQIgwAIgwQJxIcICIL4CIMICRyHDAkEBIcQCIMMCIMQCcSHFAiDFAg0AIAMoAjwhxgIgxgItACYhxwJB/wEhyAIgxwIgyAJxIckCIAMoAjghygIgygItACYhywJB/wEhzAIgywIgzAJxIc0CIMkCIM0CRyHOAkEBIc8CIM4CIM8CcSHQAiDQAkUNAQsgAygCMCHRAiDRAigCACHSAiADKAIsIdMCINMCINICNgIAIAMoAigh1AIgAygCMCHVAiDVAigCACHWAiDWAhDcAiHXAiADKAI8IdgCINgCLQAmIdkCQf8BIdoCINkCINoCcSHbAiADKAI8IdwCINwCLQAkId0CQf8BId4CIN0CIN4CcSHfAiDUAiDXAiDbAiDfAhBkQQAh4AIg4AItAIT0ByHhAkEBIeICIOECIOICcSHjAgJAIOMCRQ0AQQAh5AIg5AIoAtj0ByHlAkEBIeYCIOUCIOYCaiHnAkEAIegCIOgCIOcCNgLY9AcLCyADKAIwIekCIOkCKAIEIeoCIAMoAiwh6wIg6wIoAgQh7AIg6gIg7AJHIe0CQQEh7gIg7QIg7gJxIe8CAkACQCDvAg0AIAMoAjAh8AIg8AIoAggh8QIgAygCLCHyAiDyAigCCCHzAiDxAiDzAkch9AJBASH1AiD0AiD1AnEh9gIg9gINACADKAIwIfcCIPcCKAIMIfgCIAMoAiwh+QIg+QIoAgwh+gIg+AIg+gJHIfsCQQEh/AIg+wIg/AJxIf0CIP0CRQ0BCyADKAIwIf4CIP4CKAIEIf8CIAMoAiwhgAMggAMg/wI2AgQgAygCMCGBAyCBAygCCCGCAyADKAIsIYMDIIMDIIIDNgIIIAMoAjAhhAMghAMoAgwhhQMgAygCLCGGAyCGAyCFAzYCDCADKAIoIYcDIAMoAjAhiAMgiAMoAgQhiQMgiQMQ8gIhigMgAygCMCGLAyCLAygCCCGMAyCMAxDyAiGNAyADKAIwIY4DII4DKAIMIY8DII8DEPICIZADIIcDIIoDII0DIJADEGVBACGRAyCRAy0AhPQHIZIDQQEhkwMgkgMgkwNxIZQDAkAglANFDQBBACGVAyCVAygC2PQHIZYDQQEhlwMglgMglwNqIZgDQQAhmQMgmQMgmAM2Atj0BwsLIAMoAjQhmgNBASGbAyCaAyCbA2ohnAMgAyCcAzYCNAwACwALIAMoAjwhnQMgnQMtACQhngMgAygCOCGfAyCfAyCeAzoAJCADKAI8IaADIKADLQAmIaEDIAMoAjghogMgogMgoQM6ACYgAygCTCGjAyCjAygC/AIhpANBACGlAyCkAyClA0ohpgNBASGnAyCmAyCnA3EhqAMCQCCoA0UNACADKAJMIakDQbwEIaoDIKkDIKoDaiGrA0HEAiGsAyCrAyCsA2ohrQMgAyCtAzYCJEGQ7gchrgNBoAshrwMgrgMgrwNqIbADQQghsQMgsAMgsQNqIbIDQcAAIbMDILIDILMDaiG0AyADILQDNgIgIAMoAiQhtQMgtQMtAAAhtgNBASG3AyC2AyC3A3EhuAMgAygCICG5AyC5Ay0AACG6A0EBIbsDILoDILsDcSG8AyC4AyC8A0chvQNBASG+AyC9AyC+A3EhvwMCQCC/A0UNACADKAIkIcADIMADLQAAIcEDIAMoAiAhwgNBASHDAyDBAyDDA3EhxAMgwgMgxAM6AAAgAygCJCHFAyDFAy0AACHGA0EBIccDIMYDIMcDcSHIAwJAAkAgyANFDQBB4hchyQMgyQMQMgwBC0HiFyHKAyDKAxA1C0EAIcsDIMsDLQCE9AchzANBASHNAyDMAyDNA3EhzgMCQCDOA0UNAEEAIc8DIM8DKALY9Ach0ANBASHRAyDQAyDRA2oh0gNBACHTAyDTAyDSAzYC2PQHCwsgAygCJCHUAyDUAygCBCHVAyADKAIgIdYDINYDKAIEIdcDINUDINcDRyHYA0EBIdkDINgDINkDcSHaAwJAAkAg2gMNACADKAIkIdsDINsDKAIIIdwDIAMoAiAh3QMg3QMoAggh3gMg3AMg3gNHId8DQQEh4AMg3wMg4ANxIeEDIOEDDQAgAygCJCHiAyDiAygCECHjAyADKAIgIeQDIOQDKAIQIeUDIOMDIOUDRyHmA0EBIecDIOYDIOcDcSHoAyDoAw0AIAMoAiQh6QMg6QMoAhQh6gMgAygCICHrAyDrAygCFCHsAyDqAyDsA0ch7QNBASHuAyDtAyDuA3Eh7wMg7wNFDQELIAMoAiQh8AMg8AMoAgQh8QMgAygCICHyAyDyAyDxAzYCBCADKAIkIfMDIPMDKAIIIfQDIAMoAiAh9QMg9QMg9AM2AgggAygCJCH2AyD2AygCECH3AyADKAIgIfgDIPgDIPcDNgIQIAMoAiQh+QMg+QMoAhQh+gMgAygCICH7AyD7AyD6AzYCFCADKAIkIfwDIPwDKAIEIf0DIP0DEPMCIf4DIAMoAiQh/wMg/wMoAgghgAQggAQQ8wIhgQQgAygCJCGCBCCCBCgCECGDBCCDBBDzAiGEBCADKAIkIYUEIIUEKAIUIYYEIIYEEPMCIYcEIP4DIIEEIIQEIIcEEDlBACGIBCCIBC0AhPQHIYkEQQEhigQgiQQgigRxIYsEAkAgiwRFDQBBACGMBCCMBCgC2PQHIY0EQQEhjgQgjQQgjgRqIY8EQQAhkAQgkAQgjwQ2Atj0BwsLIAMoAiQhkQQgkQQoAgwhkgQgAygCICGTBCCTBCgCDCGUBCCSBCCUBEchlQRBASGWBCCVBCCWBHEhlwQCQAJAIJcEDQAgAygCJCGYBCCYBCgCGCGZBCADKAIgIZoEIJoEKAIYIZsEIJkEIJsERyGcBEEBIZ0EIJwEIJ0EcSGeBCCeBEUNAQsgAygCJCGfBCCfBCgCDCGgBCADKAIgIaEEIKEEIKAENgIMIAMoAiQhogQgogQoAhghowQgAygCICGkBCCkBCCjBDYCGCADKAIkIaUEIKUEKAIMIaYEIKYEEPQCIacEIAMoAiQhqAQgqAQoAhghqQQgqQQQ9AIhqgQgpwQgqgQQOkEAIasEIKsELQCE9AchrARBASGtBCCsBCCtBHEhrgQCQCCuBEUNAEEAIa8EIK8EKALY9AchsARBASGxBCCwBCCxBGohsgRBACGzBCCzBCCyBDYC2PQHCwtBACG0BCADILQENgIcAkADQCADKAIcIbUEIAMoAkwhtgQgtgQoAvwCIbcEILUEILcESSG4BEEBIbkEILgEILkEcSG6BCC6BEUNASADKAJMIbsEQbwEIbwEILsEILwEaiG9BEHgAiG+BCC9BCC+BGohvwQgAygCHCHABEECIcEEIMAEIMEEdCHCBCC/BCDCBGohwwQgwwQoAgAhxAQgAygCHCHFBEGQ7gchxgRBoAshxwQgxgQgxwRqIcgEQQghyQQgyAQgyQRqIcoEQdwAIcsEIMoEIMsEaiHMBEECIc0EIMUEIM0EdCHOBCDMBCDOBGohzwQgzwQoAgAh0AQgxAQg0ARHIdEEQQEh0gQg0QQg0gRxIdMEAkAg0wRFDQAgAygCTCHUBEG8BCHVBCDUBCDVBGoh1gRB4AIh1wQg1gQg1wRqIdgEIAMoAhwh2QRBAiHaBCDZBCDaBHQh2wQg2AQg2wRqIdwEINwEKAIAId0EIAMg3QQ2AhggAygCGCHeBCADKAIcId8EQZDuByHgBEGgCyHhBCDgBCDhBGoh4gRBCCHjBCDiBCDjBGoh5ARB3AAh5QQg5AQg5QRqIeYEQQIh5wQg3wQg5wR0IegEIOYEIOgEaiHpBCDpBCDeBDYCACADKAIcIeoEQQAh6wQg6wQg6gRGIewEQQEh7QQg7AQg7QRxIe4EAkAg7gRFDQAgAygCGCHvBEEBIfAEIO8EIPAEcSHxBEEAIfIEIPEEIPIERyHzBEEBIfQEIPMEIPQEcSH1BCADKAIYIfYEQQIh9wQg9gQg9wRxIfgEQQAh+QQg+AQg+QRHIfoEQQEh+wQg+gQg+wRxIfwEIAMoAhgh/QRBBCH+BCD9BCD+BHEh/wRBACGABSD/BCCABUchgQVBASGCBSCBBSCCBXEhgwUgAygCGCGEBUEIIYUFIIQFIIUFcSGGBUEAIYcFIIYFIIcFRyGIBUEBIYkFIIgFIIkFcSGKBUH/ASGLBSD1BCCLBXEhjAVB/wEhjQUg/AQgjQVxIY4FQf8BIY8FIIMFII8FcSGQBUH/ASGRBSCKBSCRBXEhkgUgjAUgjgUgkAUgkgUQPAtBACGTBSCTBS0AhPQHIZQFQQEhlQUglAUglQVxIZYFAkAglgVFDQBBACGXBSCXBSgC2PQHIZgFQQEhmQUgmAUgmQVqIZoFQQAhmwUgmwUgmgU2Atj0BwsLIAMoAhwhnAVBASGdBSCcBSCdBWohngUgAyCeBTYCHAwACwALIAMoAkwhnwUgnwUqAqQEIYoHQQAhoAUgoAUqArT6ByGLByCKByCLB5MhjAdDF7fRuCGNByCMByCNB14hoQVBASGiBSChBSCiBXEhowUCQAJAIKMFRQ0AIAMoAkwhpAUgpAUqAqQEIY4HQQAhpQUgpQUqArT6ByGPByCOByCPB5MhkAdDF7fROCGRByCQByCRB10hpgVBASGnBSCmBSCnBXEhqAUgqAVFDQAgAygCTCGpBSCpBSoCqAQhkgdBACGqBSCqBSoCuPoHIZMHIJIHIJMHkyGUB0MXt9G4IZUHIJQHIJUHXiGrBUEBIawFIKsFIKwFcSGtBSCtBUUNACADKAJMIa4FIK4FKgKoBCGWB0EAIa8FIK8FKgK4+gchlwcglgcglweTIZgHQxe30TghmQcgmAcgmQddIbAFQQEhsQUgsAUgsQVxIbIFILIFRQ0AIAMoAkwhswUgswUqAqwEIZoHQQAhtAUgtAUqArz6ByGbByCaByCbB5MhnAdDF7fRuCGdByCcByCdB14htQVBASG2BSC1BSC2BXEhtwUgtwVFDQAgAygCTCG4BSC4BSoCrAQhngdBACG5BSC5BSoCvPoHIZ8HIJ4HIJ8HkyGgB0MXt9E4IaEHIKAHIKEHXSG6BUEBIbsFILoFILsFcSG8BSC8BUUNACADKAJMIb0FIL0FKgKwBCGiB0EAIb4FIL4FKgLA+gchowcgogcgoweTIaQHQxe30bghpQcgpAcgpQdeIb8FQQEhwAUgvwUgwAVxIcEFIMEFRQ0AIAMoAkwhwgUgwgUqArAEIaYHQQAhwwUgwwUqAsD6ByGnByCmByCnB5MhqAdDF7fROCGpByCoByCpB10hxAVBASHFBSDEBSDFBXEhxgUgxgUNAQsgAygCTCHHBUEIIcgFIMcFIMgFaiHJBUGcBCHKBSDJBSDKBWohywVBCCHMBSDLBSDMBWohzQUgzQUpAgAhrgdBCCHOBSADIM4FaiHPBSDPBSDMBWoh0AUg0AUgrgc3AwAgywUpAgAhrwcgAyCvBzcDCCADKQIIIbAHQQAh0QUg0QUgsAc3ArT6B0EQIdIFIAMg0gVqIdMFINMFKQIAIbEHINEFILEHNwK8+gcgAyoCCCGqByADKgIMIasHIAMqAhAhrAcgAyoCFCGtByCqByCrByCsByCtBxA7QQAh1AUg1AUtAIT0ByHVBUEBIdYFINUFINYFcSHXBQJAINcFRQ0AQQAh2AUg2AUoAtj0ByHZBUEBIdoFINkFINoFaiHbBUEAIdwFINwFINsFNgLY9AcLCwsgAygCTCHdBSDdBSgCrAch3gVBACHfBSDfBSgCpPoHIeAFIN4FIOAFRyHhBUEBIeIFIOEFIOIFcSHjBQJAIOMFRQ0AIAMoAkwh5AUg5AUoAqwHIeUFQQAh5gUg5gUg5QU2AqT6ByADKAJMIecFIOcFKAKsByHoBUEBIekFIOkFIOgFRiHqBUEBIesFIOoFIOsFcSHsBQJAAkAg7AVFDQBBxBYh7QUg7QUQNUEAIe4FIO4FLQCE9Ach7wVBASHwBSDvBSDwBXEh8QUCQCDxBUUNAEEAIfIFIPIFKALY9Ach8wVBASH0BSDzBSD0BWoh9QVBACH2BSD2BSD1BTYC2PQHCwwBC0HEFiH3BSD3BRAyIAMoAkwh+AUg+AUoAqwHIfkFQQIh+gUg+gUg+QVGIfsFQYQIIfwFQYUIIf0FQQEh/gUg+wUg/gVxIf8FIPwFIP0FIP8FGyGABiADIIAGNgIEIAMoAgQhgQYggQYQP0EAIYIGIIIGLQCE9AchgwZBASGEBiCDBiCEBnEhhQYCQCCFBkUNAEEAIYYGIIYGKALY9AchhwZBAiGIBiCHBiCIBmohiQZBACGKBiCKBiCJBjYC2PQHCwsLIAMoAkwhiwYgiwYoArAHIYwGQQAhjQYgjQYoAqj6ByGOBiCMBiCOBkchjwZBASGQBiCPBiCQBnEhkQYCQCCRBkUNACADKAJMIZIGIJIGKAKwByGTBkEAIZQGIJQGIJMGNgKo+gcgAygCTCGVBiCVBigCsAchlgZBAiGXBiCXBiCWBkYhmAZBgBIhmQZBgRIhmgZBASGbBiCYBiCbBnEhnAYgmQYgmgYgnAYbIZ0GIAMgnQY2AgAgAygCACGeBiCeBhA+QQAhnwYgnwYtAIT0ByGgBkEBIaEGIKAGIKEGcSGiBgJAIKIGRQ0AQQAhowYgowYoAtj0ByGkBkEBIaUGIKQGIKUGaiGmBkEAIacGIKcGIKYGNgLY9AcLCyADKAJMIagGIKgGLQC4ByGpBkEBIaoGIKkGIKoGcSGrBkEAIawGIKwGLQDE+gchrQZBASGuBiCtBiCuBnEhrwYgqwYgrwZHIbAGQQEhsQYgsAYgsQZxIbIGAkAgsgZFDQAgAygCTCGzBiCzBi0AuAchtAZBASG1BiC0BiC1BnEhtgZBACG3BiC3BiC2BjoAxPoHIAMoAkwhuAYguAYtALgHIbkGQQEhugYguQYgugZxIbsGAkACQCC7BkUNAEGegQIhvAYgvAYQMgwBC0GegQIhvQYgvQYQNQtBACG+BiC+Bi0AhPQHIb8GQQEhwAYgvwYgwAZxIcEGAkAgwQZFDQBBACHCBiDCBigC2PQHIcMGQQEhxAYgwwYgxAZqIcUGQQAhxgYgxgYgxQY2Atj0BwsLIAMoAkwhxwYgxwYoArgEIcgGIMgGKAKMBSHJBkEAIcoGIMoGKALg/QchywYgyQYgywZHIcwGQQEhzQYgzAYgzQZxIc4GAkAgzgZFDQAgAygCTCHPBiDPBigCuAQh0AYg0AYoAowFIdEGQQAh0gYg0gYg0QY2AuD9ByADKAJMIdMGINMGKAK4BCHUBiDUBigCjAUh1QYg1QYQSkEAIdYGINYGLQCE9Ach1wZBASHYBiDXBiDYBnEh2QYCQCDZBkUNAEEAIdoGINoGKALU9Ach2wZBASHcBiDbBiDcBmoh3QZBACHeBiDeBiDdBjYC1PQHCwsLECwh3wYCQCDfBkUNAEGA9gUh4AZB0sUEIeEGQePJACHiBkGs/AQh4wYg4AYg4QYg4gYg4wYQAAALQdAAIeQGIAMg5AZqIeUGIOUGJAAPC7EnAcQEfyMAIQFBkAIhAiABIAJrIQMgAyQAIAMgADYCjAJBACEEIAQtAJDuByEFQQEhBiAFIAZxIQcCQCAHDQBB9ZkFIQhB0sUEIQlBuZIBIQpBvKwEIQsgCCAJIAogCxAAAAtBACEMIAwtAP3uByENQQEhDiANIA5xIQ8CQCAPDQBBu6AEIRBB0sUEIRFBupIBIRJBvKwEIRMgECARIBIgExAAAAsgAygCjAIhFEEAIRUgFCAVRyEWQQEhFyAWIBdxIRgCQCAYDQBB0a0EIRlB0sUEIRpBu5IBIRtBvKwEIRwgGSAaIBsgHBAAAAsgAygCjAIhHSAdKAIAIR4CQAJAIB4NACADKAKMAiEfIB8oAuwBISAgIEUNAQtB0NIGISFB0sUEISJBvJIBISNBvKwEISQgISAiICMgJBAAAAtBACElICUtAIT0ByEmQQEhJyAmICdxISgCQCAoRQ0AQQAhKSApKAKc9AchKkEBISsgKiAraiEsQQAhLSAtICw2Apz0BwtBACEuIC4oAqjvByEvQYACITAgLyAwciExQQAhMiAyIDE2AqjvByADKAKMAiEzIDMQ/AEhNEEBITUgNCA1cSE2AkACQCA2DQBBACE3QQAhOCA4IDc6AKDvBwwBC0EAITkgOS0A/O4HITpBASE7IDogO3EhPAJAIDwNAAwBC0EgIT0gAyA9aiE+ID4hP0HsASFAID8gQBCvAUEAIUEgQSgCnO8HIUJBkO4HIUNBoAEhRCBDIERqIUUgRSBCENUBIUYgAyBGNgIgIAMoAiAhR0EAIUggSCBHRiFJQQEhSiBJIEpxIUsCQCBLRQ0AQQAhTEEAIU0gTSBMOgCg7wcLIAMoAiAhTiBOKAK4BCFPQQAhUCBPIFBHIVFBASFSIFEgUnEhUwJAAkAgU0UNACADKAIgIVQgVCgCGCFVIAMoAiAhViBWKAK4BCFXIFcoAgAhWCBVIFhGIVlBASFaIFkgWnEhWyBbDQELQZajBiFcQdLFBCFdQc2SASFeQbysBCFfIFwgXSBeIF8QAAALIAMoAiAhYCBgKAK4BCFhIAMgYTYCHEEAIWIgAyBiNgIYAkADQCADKAIYIWNBCCFkIGMgZEkhZUEBIWYgZSBmcSFnIGdFDQEgAygCICFoQQghaSBoIGlqIWogAygCGCFrIGoga2ohbCBsLQAAIW1BASFuIG0gbnEhbwJAIG9FDQAgAygCjAIhcEEEIXEgcCBxaiFyIAMoAhghc0ECIXQgcyB0dCF1IHIgdWohdiB2KAIAIXcCQCB3DQBB3tQFIXhB0sUEIXlB0pIBIXpBvKwEIXsgeCB5IHogexAAAAsgAygCjAIhfEEEIX0gfCB9aiF+IAMoAhghf0ECIYABIH8ggAF0IYEBIH4ggQFqIYIBIIIBKAIAIYMBQZDuByGEAUGgASGFASCEASCFAWohhgEghgEggwEQzAEhhwFBICGIASADIIgBaiGJASCJASGKAUEoIYsBIIoBIIsBaiGMASADKAIYIY0BQQIhjgEgjQEgjgF0IY8BIIwBII8BaiGQASCQASCHATYCACADKAKMAiGRAUEkIZIBIJEBIJIBaiGTASADKAIYIZQBQQIhlQEglAEglQF0IZYBIJMBIJYBaiGXASCXASgCACGYAUEgIZkBIAMgmQFqIZoBIJoBIZsBQQQhnAEgmwEgnAFqIZ0BIAMoAhghngFBAiGfASCeASCfAXQhoAEgnQEgoAFqIaEBIKEBIJgBNgIAQSAhogEgAyCiAWohowEgowEhpAFBKCGlASCkASClAWohpgEgAygCGCGnAUECIagBIKcBIKgBdCGpASCmASCpAWohqgEgqgEoAgAhqwFBACGsASCrASCsAUchrQFBASGuASCtASCuAXEhrwECQAJAIK8BRQ0AQSAhsAEgAyCwAWohsQEgsQEhsgFBKCGzASCyASCzAWohtAEgAygCGCG1AUECIbYBILUBILYBdCG3ASC0ASC3AWohuAEguAEoAgAhuQEguQEoAgQhugFBAiG7ASC7ASC6AUYhvAFBASG9ASC8ASC9AXEhvgFBACG/ASC/AS0AoO8HIcABQQEhwQEgwAEgwQFxIcIBIMIBIL4BcSHDAUEAIcQBIMMBIMQBRyHFAUEBIcYBIMUBIMYBcSHHAUEAIcgBIMgBIMcBOgCg7wdBICHJASADIMkBaiHKASDKASHLAUEoIcwBIMsBIMwBaiHNASADKAIYIc4BQQIhzwEgzgEgzwF0IdABIM0BINABaiHRASDRASgCACHSASDSAS0AECHTAUF/IdQBINMBINQBcyHVAUEBIdYBINUBINYBcSHXAUEAIdgBINgBLQCg7wch2QFBASHaASDZASDaAXEh2wEg2wEg1wFxIdwBQQAh3QEg3AEg3QFHId4BQQEh3wEg3gEg3wFxIeABQQAh4QEg4QEg4AE6AKDvBwwBC0EAIeIBQQAh4wEg4wEg4gE6AKDvBwsLIAMoAhgh5AFBASHlASDkASDlAWoh5gEgAyDmATYCGAwACwALIAMoAowCIecBIOcBKAJEIegBAkAg6AFFDQAgAygCjAIh6QEg6QEoAkQh6gFBkO4HIesBQaABIewBIOsBIOwBaiHtASDtASDqARDMASHuASADIO4BNgJoIAMoAowCIe8BIO8BKAJIIfABIAMg8AE2AkQgAygCaCHxAUEAIfIBIPEBIPIBRyHzAUEBIfQBIPMBIPQBcSH1AQJAAkAg9QFFDQAgAygCaCH2ASD2ASgCBCH3AUECIfgBIPgBIPcBRiH5AUEBIfoBIPkBIPoBcSH7AUEAIfwBIPwBLQCg7wch/QFBASH+ASD9ASD+AXEh/wEg/wEg+wFxIYACQQAhgQIggAIggQJHIYICQQEhgwIgggIggwJxIYQCQQAhhQIghQIghAI6AKDvByADKAJoIYYCIIYCLQAQIYcCQX8hiAIghwIgiAJzIYkCQQEhigIgiQIgigJxIYsCQQAhjAIgjAItAKDvByGNAkEBIY4CII0CII4CcSGPAiCPAiCLAnEhkAJBACGRAiCQAiCRAkchkgJBASGTAiCSAiCTAnEhlAJBACGVAiCVAiCUAjoAoO8HDAELQQAhlgJBACGXAiCXAiCWAjoAoO8HCwtBACGYAiADIJgCNgIUAkADQCADKAIUIZkCQRAhmgIgmQIgmgJIIZsCQQEhnAIgmwIgnAJxIZ0CIJ0CRQ0BIAMoAhwhngJBCCGfAiCeAiCfAmohoAJBhAEhoQIgoAIgoQJqIaICIAMoAhQhowJBBCGkAiCjAiCkAnQhpQIgogIgpQJqIaYCIKYCKAIAIacCAkAgpwJFDQAgAygCjAIhqAJBzAAhqQIgqAIgqQJqIaoCIAMoAhQhqwJBAiGsAiCrAiCsAnQhrQIgqgIgrQJqIa4CIK4CKAIAIa8CAkAgrwINAEG/1QUhsAJB0sUEIbECQeuSASGyAkG8rAQhswIgsAIgsQIgsgIgswIQAAALIAMoAowCIbQCQcwAIbUCILQCILUCaiG2AiADKAIUIbcCQQIhuAIgtwIguAJ0IbkCILYCILkCaiG6AiC6AigCACG7AkGQ7gchvAJBoAEhvQIgvAIgvQJqIb4CIL4CILsCEM8BIb8CQSAhwAIgAyDAAmohwQIgwQIhwgJBzAAhwwIgwgIgwwJqIcQCIAMoAhQhxQJBAiHGAiDFAiDGAnQhxwIgxAIgxwJqIcgCIMgCIL8CNgIAQSAhyQIgAyDJAmohygIgygIhywJBzAAhzAIgywIgzAJqIc0CIAMoAhQhzgJBAiHPAiDOAiDPAnQh0AIgzQIg0AJqIdECINECKAIAIdICQQAh0wIg0gIg0wJHIdQCQQEh1QIg1AIg1QJxIdYCAkACQCDWAkUNAEEgIdcCIAMg1wJqIdgCINgCIdkCQcwAIdoCINkCINoCaiHbAiADKAIUIdwCQQIh3QIg3AIg3QJ0Id4CINsCIN4CaiHfAiDfAigCACHgAiDgAigCBCHhAkECIeICIOICIOECRiHjAkEBIeQCIOMCIOQCcSHlAkEAIeYCIOYCLQCg7wch5wJBASHoAiDnAiDoAnEh6QIg6QIg5QJxIeoCQQAh6wIg6gIg6wJHIewCQQEh7QIg7AIg7QJxIe4CQQAh7wIg7wIg7gI6AKDvBwwBC0EAIfACQQAh8QIg8QIg8AI6AKDvBwsLIAMoAhQh8gJBASHzAiDyAiDzAmoh9AIgAyD0AjYCFAwACwALQQAh9QIgAyD1AjYCEAJAA0AgAygCECH2AkEQIfcCIPYCIPcCSSH4AkEBIfkCIPgCIPkCcSH6AiD6AkUNASADKAIcIfsCQQgh/AIg+wIg/AJqIf0CQYQDIf4CIP0CIP4CaiH/AiADKAIQIYADQQMhgQMggAMggQN0IYIDIP8CIIIDaiGDAyCDAygCACGEAwJAIIQDRQ0AIAMoAowCIYUDQYwBIYYDIIUDIIYDaiGHAyADKAIQIYgDQQIhiQMgiAMgiQN0IYoDIIcDIIoDaiGLAyCLAygCACGMAwJAIIwDDQBBtNQFIY0DQdLFBCGOA0H3kgEhjwNBvKwEIZADII0DII4DII8DIJADEAAACyADKAKMAiGRA0GMASGSAyCRAyCSA2ohkwMgAygCECGUA0ECIZUDIJQDIJUDdCGWAyCTAyCWA2ohlwMglwMoAgAhmANBkO4HIZkDQaABIZoDIJkDIJoDaiGbAyCbAyCYAxDRASGcA0EgIZ0DIAMgnQNqIZ4DIJ4DIZ8DQYwBIaADIJ8DIKADaiGhAyADKAIQIaIDQQIhowMgogMgowN0IaQDIKEDIKQDaiGlAyClAyCcAzYCAEEgIaYDIAMgpgNqIacDIKcDIagDQYwBIakDIKgDIKkDaiGqAyADKAIQIasDQQIhrAMgqwMgrAN0Ia0DIKoDIK0DaiGuAyCuAygCACGvA0EAIbADIK8DILADRyGxA0EBIbIDILEDILIDcSGzAwJAAkAgswNFDQBBICG0AyADILQDaiG1AyC1AyG2A0GMASG3AyC2AyC3A2ohuAMgAygCECG5A0ECIboDILkDILoDdCG7AyC4AyC7A2ohvAMgvAMoAgAhvQMgvQMoAgQhvgNBAiG/AyC/AyC+A0YhwANBASHBAyDAAyDBA3EhwgNBACHDAyDDAy0AoO8HIcQDQQEhxQMgxAMgxQNxIcYDIMYDIMIDcSHHA0EAIcgDIMcDIMgDRyHJA0EBIcoDIMkDIMoDcSHLA0EAIcwDIMwDIMsDOgCg7wcMAQtBACHNA0EAIc4DIM4DIM0DOgCg7wcLCyADKAIQIc8DQQEh0AMgzwMg0ANqIdEDIAMg0QM2AhAMAAsAC0EAIdIDIAMg0gM2AgwCQANAIAMoAgwh0wNBCCHUAyDTAyDUA0kh1QNBASHWAyDVAyDWA3Eh1wMg1wNFDQEgAygCHCHYA0EIIdkDINgDINkDaiHaA0HEACHbAyDaAyDbA2oh3AMgAygCDCHdA0EDId4DIN0DIN4DdCHfAyDcAyDfA2oh4AMg4AMoAgAh4QMCQCDhA0UNACADKAKMAiHiA0HMASHjAyDiAyDjA2oh5AMgAygCDCHlA0ECIeYDIOUDIOYDdCHnAyDkAyDnA2oh6AMg6AMoAgAh6QMCQCDpAw0AQY7VBSHqA0HSxQQh6wNBg5MBIewDQbysBCHtAyDqAyDrAyDsAyDtAxAAAAsgAygCjAIh7gNBzAEh7wMg7gMg7wNqIfADIAMoAgwh8QNBAiHyAyDxAyDyA3Qh8wMg8AMg8wNqIfQDIPQDKAIAIfUDQZDuByH2A0GgASH3AyD2AyD3A2oh+AMg+AMg9QMQzAEh+QNBICH6AyADIPoDaiH7AyD7AyH8A0HMASH9AyD8AyD9A2oh/gMgAygCDCH/A0ECIYAEIP8DIIAEdCGBBCD+AyCBBGohggQgggQg+QM2AgBBICGDBCADIIMEaiGEBCCEBCGFBEHMASGGBCCFBCCGBGohhwQgAygCDCGIBEECIYkEIIgEIIkEdCGKBCCHBCCKBGohiwQgiwQoAgAhjARBACGNBCCMBCCNBEchjgRBASGPBCCOBCCPBHEhkAQCQAJAIJAERQ0AQSAhkQQgAyCRBGohkgQgkgQhkwRBzAEhlAQgkwQglARqIZUEIAMoAgwhlgRBAiGXBCCWBCCXBHQhmAQglQQgmARqIZkEIJkEKAIAIZoEIJoEKAIEIZsEQQIhnAQgnAQgmwRGIZ0EQQEhngQgnQQgngRxIZ8EQQAhoAQgoAQtAKDvByGhBEEBIaIEIKEEIKIEcSGjBCCjBCCfBHEhpARBACGlBCCkBCClBEchpgRBASGnBCCmBCCnBHEhqARBACGpBCCpBCCoBDoAoO8HDAELQQAhqgRBACGrBCCrBCCqBDoAoO8HCwsgAygCDCGsBEEBIa0EIKwEIK0EaiGuBCADIK4ENgIMDAALAAtBACGvBCCvBC0AoO8HIbAEQQEhsQQgsAQgsQRxIbIEILIERQ0AQSAhswQgAyCzBGohtAQgtAQhtQQgtQQQ/QEhtgRBASG3BCC2BCC3BHEhuARBACG5BCC5BC0AoO8HIboEQQEhuwQgugQguwRxIbwEILwEILgEcSG9BEEAIb4EIL0EIL4ERyG/BEEBIcAEIL8EIMAEcSHBBEEAIcIEIMIEIMEEOgCg7wcLQZACIcMEIAMgwwRqIcQEIMQEJAAPC6ktAfQEfyMAIQFBwAAhAiABIAJrIQMgAyQAIAMgADYCOEEAIQQgBC0AuO4HIQVBASEGIAUgBnEhBwJAAkAgB0UNAEEBIQhBASEJIAggCXEhCiADIAo6AD8MAQsQ8QFBACELIAsoApzvByEMAkAgDA0AQYACIQ1BACEOIA4gDTYCrO8HQYACIQ9BASEQQQAhEUGkhgEhEiAPIBAgESASEMYBC0EAIRMgEygCnO8HIRRBkO4HIRVBoAEhFiAVIBZqIRcgFyAUENUBIRggAyAYNgI0IAMoAjQhGUEAIRogGSAaRyEbQQEhHCAbIBxxIR0CQCAdDQBBgQIhHkEAIR8gHyAeNgKs7wdBgQIhIEEBISFBACEiQaaGASEjICAgISAiICMQxgELIAMoAjQhJEEAISUgJCAlRyEmQQEhJyAmICdxISgCQCAoDQAQ9QEhKUEBISogKSAqcSErIAMgKzoAPwwBCyADKAI0ISwgLCgCBCEtQQIhLiAtIC5GIS9BASEwIC8gMHEhMQJAIDENAEGCAiEyQQAhMyAzIDI2AqzvB0GCAiE0QQEhNUEAITZBqoYBITcgNCA1IDYgNxDGAQsgAygCNCE4IDgoArgEITlBACE6IDkgOkchO0EBITwgOyA8cSE9AkACQCA9RQ0AIAMoAjQhPiA+KAIYIT8gAygCNCFAIEAoArgEIUEgQSgCACFCID8gQkYhQ0EBIUQgQyBEcSFFIEUNAQtB4aMGIUZB0sUEIUdBq4YBIUhBzqwEIUkgRiBHIEggSRAAAAsgAygCNCFKIEooArgEIUsgAyBLNgIwQQAhTCADIEw2AiwCQANAIAMoAiwhTUEIIU4gTSBOSSFPQQEhUCBPIFBxIVEgUUUNASADKAI0IVJBCCFTIFIgU2ohVCADKAIsIVUgVCBVaiFWIFYtAAAhV0EBIVggVyBYcSFZAkAgWUUNACADKAI4IVpBBCFbIFogW2ohXCADKAIsIV1BAiFeIF0gXnQhXyBcIF9qIWAgYCgCACFhAkAgYQ0AQYMCIWJBACFjIGMgYjYCrO8HQYMCIWRBASFlQQAhZkGxhgEhZyBkIGUgZiBnEMYBCyADKAI4IWhBBCFpIGggaWohaiADKAIsIWtBAiFsIGsgbHQhbSBqIG1qIW4gbigCACFvAkAgb0UNACADKAI4IXBBBCFxIHAgcWohciADKAIsIXNBAiF0IHMgdHQhdSByIHVqIXYgdigCACF3QZDuByF4QaABIXkgeCB5aiF6IHogdxDMASF7IAMgezYCKCADKAIoIXxBACF9IHwgfUchfkEBIX8gfiB/cSGAAQJAIIABDQBBhAIhgQFBACGCASCCASCBATYCrO8HQYQCIYMBQQEhhAFBACGFAUG1hgEhhgEggwEghAEghQEghgEQxgELIAMoAighhwFBACGIASCHASCIAUchiQFBASGKASCJASCKAXEhiwECQCCLAUUNACADKAIoIYwBIIwBKAIEIY0BQQIhjgEgjQEgjgFGIY8BQQEhkAEgjwEgkAFxIZEBIJEBRQ0AIAMoAighkgEgkgEoAiQhkwFBASGUASCUASCTAUYhlQFBASGWASCVASCWAXEhlwECQCCXAQ0AQYUCIZgBQQAhmQEgmQEgmAE2AqzvB0GFAiGaAUEBIZsBQQAhnAFBt4YBIZ0BIJoBIJsBIJwBIJ0BEMYBCyADKAIoIZ4BIJ4BLQAQIZ8BQQEhoAEgnwEgoAFxIaEBAkAgoQFFDQBBhgIhogFBACGjASCjASCiATYCrO8HQYYCIaQBQQEhpQFBACGmAUG4hgEhpwEgpAEgpQEgpgEgpwEQxgELCwsLIAMoAiwhqAFBASGpASCoASCpAWohqgEgAyCqATYCLAwACwALIAMoAjQhqwEgqwEoApQEIawBQQEhrQEgrAEgrQFGIa4BQQEhrwEgrgEgrwFxIbABAkACQCCwAUUNACADKAI4IbEBILEBKAJEIbIBAkAgsgFFDQBBiAIhswFBACG0ASC0ASCzATYCrO8HQYgCIbUBQQEhtgFBACG3AUHBhgEhuAEgtQEgtgEgtwEguAEQxgELDAELIAMoAjghuQEguQEoAkQhugECQCC6AQ0AQYcCIbsBQQAhvAEgvAEguwE2AqzvB0GHAiG9AUEBIb4BQQAhvwFBxIYBIcABIL0BIL4BIL8BIMABEMYBCwsgAygCOCHBASDBASgCRCHCAQJAIMIBRQ0AIAMoAjghwwEgwwEoAkQhxAFBkO4HIcUBQaABIcYBIMUBIMYBaiHHASDHASDEARDMASHIASADIMgBNgIkIAMoAiQhyQFBACHKASDJASDKAUchywFBASHMASDLASDMAXEhzQECQCDNAQ0AQYkCIc4BQQAhzwEgzwEgzgE2AqzvB0GJAiHQAUEBIdEBQQAh0gFByYYBIdMBINABINEBINIBINMBEMYBCyADKAIkIdQBQQAh1QEg1AEg1QFHIdYBQQEh1wEg1gEg1wFxIdgBAkAg2AFFDQAgAygCJCHZASDZASgCBCHaAUECIdsBINoBINsBRiHcAUEBId0BINwBIN0BcSHeASDeAUUNACADKAIkId8BIN8BKAIkIeABQQIh4QEg4QEg4AFGIeIBQQEh4wEg4gEg4wFxIeQBAkAg5AENAEGKAiHlAUEAIeYBIOYBIOUBNgKs7wdBigIh5wFBASHoAUEAIekBQcuGASHqASDnASDoASDpASDqARDGAQsgAygCJCHrASDrAS0AECHsAUEBIe0BIOwBIO0BcSHuAQJAIO4BRQ0AQYsCIe8BQQAh8AEg8AEg7wE2AqzvB0GLAiHxAUEBIfIBQQAh8wFBzIYBIfQBIPEBIPIBIPMBIPQBEMYBCwsLQQAh9QEgAyD1ATYCIAJAA0AgAygCICH2AUEQIfcBIPYBIPcBSSH4AUEBIfkBIPgBIPkBcSH6ASD6AUUNASADKAIwIfsBQQgh/AEg+wEg/AFqIf0BQYQBIf4BIP0BIP4BaiH/ASADKAIgIYACQQQhgQIggAIggQJ0IYICIP8BIIICaiGDAiCDAigCACGEAgJAIIQCRQ0AIAMoAjghhQJBzAAhhgIghQIghgJqIYcCIAMoAiAhiAJBAiGJAiCIAiCJAnQhigIghwIgigJqIYsCIIsCKAIAIYwCAkAgjAINAEGMAiGNAkEAIY4CII4CII0CNgKs7wdBjAIhjwJBASGQAkEAIZECQdOGASGSAiCPAiCQAiCRAiCSAhDGAQsgAygCOCGTAkHMACGUAiCTAiCUAmohlQIgAygCICGWAkECIZcCIJYCIJcCdCGYAiCVAiCYAmohmQIgmQIoAgAhmgICQCCaAkUNACADKAI4IZsCQcwAIZwCIJsCIJwCaiGdAiADKAIgIZ4CQQIhnwIgngIgnwJ0IaACIJ0CIKACaiGhAiChAigCACGiAkGQ7gchowJBoAEhpAIgowIgpAJqIaUCIKUCIKICEM8BIaYCIAMgpgI2AhwgAygCHCGnAkEAIagCIKcCIKgCRyGpAkEBIaoCIKkCIKoCcSGrAgJAIKsCDQBBjQIhrAJBACGtAiCtAiCsAjYCrO8HQY0CIa4CQQEhrwJBACGwAkHWhgEhsQIgrgIgrwIgsAIgsQIQxgELIAMoAhwhsgJBACGzAiCyAiCzAkchtAJBASG1AiC0AiC1AnEhtgICQCC2AkUNACADKAIcIbcCILcCKAIEIbgCQQIhuQIguAIguQJGIboCQQEhuwIgugIguwJxIbwCILwCRQ0AIAMoAhwhvQIgvQIoAhQhvgIgAygCMCG/AkEIIcACIL8CIMACaiHBAkGEASHCAiDBAiDCAmohwwIgAygCICHEAkEEIcUCIMQCIMUCdCHGAiDDAiDGAmohxwIgxwIoAgQhyAIgvgIgyAJGIckCQQEhygIgyQIgygJxIcsCAkAgywINAEGOAiHMAkEAIc0CIM0CIMwCNgKs7wdBjgIhzgJBASHPAkEAIdACQdiGASHRAiDOAiDPAiDQAiDRAhDGAQsgAygCHCHSAiDSAigCNCHTAkEBIdQCINMCINQCRiHVAkEBIdYCINUCINYCcSHXAgJAINcCDQBBjwIh2AJBACHZAiDZAiDYAjYCrO8HQY8CIdoCQQEh2wJBACHcAkHZhgEh3QIg2gIg2wIg3AIg3QIQxgELIAMoAhwh3gIg3gIoAjAh3wJBBiHgAiDfAiDgAmwh4QJB1PAHIeICIOECIOICaiHjAiADIOMCNgIYIAMoAjAh5AIgAygCICHlAkEEIeYCIOUCIOYCdCHnAiDkAiDnAmoh6AIg6AIoApQBIekCQX8h6gIg6QIg6gJqIesCQQEh7AIg6wIg7AJLGgJAAkACQAJAIOsCDgIAAQILIAMoAhgh7QIg7QItAAEh7gJBASHvAiDuAiDvAnEh8AICQCDwAg0AQZACIfECQQAh8gIg8gIg8QI2AqzvB0GQAiHzAkEBIfQCQQAh9QJB3YYBIfYCIPMCIPQCIPUCIPYCEMYBCwwCCyADKAIYIfcCIPcCLQAFIfgCQQEh+QIg+AIg+QJxIfoCAkAg+gINAEGRAiH7AkEAIfwCIPwCIPsCNgKs7wdBkQIh/QJBASH+AkEAIf8CQeCGASGAAyD9AiD+AiD/AiCAAxDGAQsMAQsLCwsLIAMoAiAhgQNBASGCAyCBAyCCA2ohgwMgAyCDAzYCIAwACwALQQAhhAMgAyCEAzYCFAJAA0AgAygCFCGFA0EQIYYDIIUDIIYDSSGHA0EBIYgDIIcDIIgDcSGJAyCJA0UNASADKAIwIYoDQQghiwMgigMgiwNqIYwDQYQDIY0DIIwDII0DaiGOAyADKAIUIY8DQQMhkAMgjwMgkAN0IZEDII4DIJEDaiGSAyCSAygCACGTAwJAIJMDRQ0AIAMoAjghlANBjAEhlQMglAMglQNqIZYDIAMoAhQhlwNBAiGYAyCXAyCYA3QhmQMglgMgmQNqIZoDIJoDKAIAIZsDAkAgmwMNAEGSAiGcA0EAIZ0DIJ0DIJwDNgKs7wdBkgIhngNBASGfA0EAIaADQe2GASGhAyCeAyCfAyCgAyChAxDGAQsgAygCOCGiA0GMASGjAyCiAyCjA2ohpAMgAygCFCGlA0ECIaYDIKUDIKYDdCGnAyCkAyCnA2ohqAMgqAMoAgAhqQMCQCCpA0UNACADKAI4IaoDQYwBIasDIKoDIKsDaiGsAyADKAIUIa0DQQIhrgMgrQMgrgN0Ia8DIKwDIK8DaiGwAyCwAygCACGxA0GQ7gchsgNBoAEhswMgsgMgswNqIbQDILQDILEDENEBIbUDIAMgtQM2AhAgAygCECG2A0EAIbcDILYDILcDRyG4A0EBIbkDILgDILkDcSG6AwJAILoDDQBBlgIhuwNBACG8AyC8AyC7AzYCrO8HQZYCIb0DQQEhvgNBACG/A0HwhgEhwAMgvQMgvgMgvwMgwAMQxgELIAMoAhAhwQNBACHCAyDBAyDCA0chwwNBASHEAyDDAyDEA3EhxQMCQCDFA0UNACADKAIwIcYDQQghxwMgxgMgxwNqIcgDQYQDIckDIMgDIMkDaiHKAyADKAIUIcsDQQMhzAMgywMgzAN0Ic0DIMoDIM0DaiHOAyDOAygCBCHPA0EDIdADIM8DINADRiHRA0EBIdIDINEDINIDcSHTAwJAAkAg0wNFDQAgAygCECHUAyDUAygCLCHVA0EBIdYDINUDINYDRyHXA0EBIdgDINcDINgDcSHZAwJAINkDDQBBkwIh2gNBACHbAyDbAyDaAzYCrO8HQZMCIdwDQQEh3QNBACHeA0HzhgEh3wMg3AMg3QMg3gMg3wMQxgELDAELIAMoAhAh4AMg4AMoAiwh4QNBASHiAyDhAyDiA0Yh4wNBASHkAyDjAyDkA3Eh5QMCQCDlAw0AQZQCIeYDQQAh5wMg5wMg5gM2AqzvB0GUAiHoA0EBIekDQQAh6gNB9YYBIesDIOgDIOkDIOoDIOsDEMYBCwsgAygCMCHsA0EIIe0DIOwDIO0DaiHuA0GEAyHvAyDuAyDvA2oh8AMgAygCFCHxA0EDIfIDIPEDIPIDdCHzAyDwAyDzA2oh9AMg9AMoAgQh9QNBAiH2AyD1AyD2A0Yh9wNBASH4AyD3AyD4A3Eh+QMCQCD5A0UNACADKAIQIfoDIPoDKAIIIfsDQQIh/AMg+wMg/ANHIf0DQQAh/gNBASH/AyD9AyD/A3EhgAQg/gMhgQQCQCCABEUNACADKAIQIYIEIIIEKAIMIYMEQQIhhAQggwQghARHIYUEQQAhhgRBASGHBCCFBCCHBHEhiAQghgQhgQQgiARFDQAgAygCECGJBCCJBCgCECGKBEECIYsEIIoEIIsERyGMBCCMBCGBBAsggQQhjQRBASGOBCCNBCCOBHEhjwQgAyCPBDoADyADLQAPIZAEQQEhkQQgkAQgkQRxIZIEAkAgkgQNAEGVAiGTBEEAIZQEIJQEIJMENgKs7wdBlQIhlQRBASGWBEEAIZcEQfuGASGYBCCVBCCWBCCXBCCYBBDGAQsLCwsLIAMoAhQhmQRBASGaBCCZBCCaBGohmwQgAyCbBDYCFAwACwALQQAhnAQgAyCcBDYCCAJAA0AgAygCCCGdBEEIIZ4EIJ0EIJ4ESSGfBEEBIaAEIJ8EIKAEcSGhBCChBEUNASADKAIwIaIEQQghowQgogQgowRqIaQEQcQAIaUEIKQEIKUEaiGmBCADKAIIIacEQQMhqAQgpwQgqAR0IakEIKYEIKkEaiGqBCCqBCgCACGrBAJAIKsERQ0AIAMoAjghrARBzAEhrQQgrAQgrQRqIa4EIAMoAgghrwRBAiGwBCCvBCCwBHQhsQQgrgQgsQRqIbIEILIEKAIAIbMEAkAgswQNAEGXAiG0BEEAIbUEILUEILQENgKs7wdBlwIhtgRBASG3BEEAIbgEQYWHASG5BCC2BCC3BCC4BCC5BBDGAQsgAygCOCG6BEHMASG7BCC6BCC7BGohvAQgAygCCCG9BEECIb4EIL0EIL4EdCG/BCC8BCC/BGohwAQgwAQoAgAhwQQCQCDBBEUNACADKAI4IcIEQcwBIcMEIMIEIMMEaiHEBCADKAIIIcUEQQIhxgQgxQQgxgR0IccEIMQEIMcEaiHIBCDIBCgCACHJBEGQ7gchygRBoAEhywQgygQgywRqIcwEIMwEIMkEEMwBIc0EIAMgzQQ2AgQgAygCBCHOBEEAIc8EIM4EIM8ERyHQBEEBIdEEINAEINEEcSHSBAJAINIEDQBBmAIh0wRBACHUBCDUBCDTBDYCrO8HQZgCIdUEQQEh1gRBACHXBEGIhwEh2AQg1QQg1gQg1wQg2AQQxgELIAMoAgQh2QRBACHaBCDZBCDaBEch2wRBASHcBCDbBCDcBHEh3QQCQCDdBEUNACADKAIEId4EIN4EKAIkId8EQQMh4AQg3wQg4ARGIeEEQQEh4gQg4QQg4gRxIeMEAkAg4wQNAEGZAiHkBEEAIeUEIOUEIOQENgKs7wdBmQIh5gRBASHnBEEAIegEQYqHASHpBCDmBCDnBCDoBCDpBBDGAQsLCwsgAygCCCHqBEEBIesEIOoEIOsEaiHsBCADIOwENgIIDAALAAsQ9QEh7QRBASHuBCDtBCDuBHEh7wQgAyDvBDoAPwsgAy0APyHwBEEBIfEEIPAEIPEEcSHyBEHAACHzBCADIPMEaiH0BCD0BCQAIPIEDwtJAQl/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEIAQQ/gEhBUEBIQYgBSAGcSEHQRAhCCADIAhqIQkgCSQAIAcPC4wmApAEfwJ+IwAhAUHgACECIAEgAmshAyADJAAgAyAANgJcIAMoAlwhBEEAIQUgBCAFRyEGQQEhByAGIAdxIQgCQCAIDQBBoZUFIQlB0sUEIQpB58kAIQtBpqwEIQwgCSAKIAsgDBAAAAsgAygCXCENIA0oAgAhDkEAIQ8gDiAPRyEQQQEhESAQIBFxIRICQAJAIBJFDQAgAygCXCETIBMoAgAhFCAUKAK4BCEVQQAhFiAVIBZHIRdBASEYIBcgGHEhGSAZDQELQcK6BCEaQdLFBCEbQejJACEcQaasBCEdIBogGyAcIB0QAAALIAMoAlwhHiAeKAIAIR8gHygCuAQhICAgKAIAISEgAygCXCEiICIoAgAhIyAjKAIYISQgISAkRiElQQEhJiAlICZxIScCQCAnDQBB8p8FIShB0sUEISlB6ckAISpBpqwEISsgKCApICogKxAAAAsQLCEsAkAgLEUNAEGA9gUhLUHSxQQhLkHqyQAhL0GmrAQhMCAtIC4gLyAwEAAACyADKAJcITEgMSgCACEyIDIoArgEITMgAyAzNgJYECwhNAJAIDRFDQBBgPYFITVB0sUEITZB7skAITdBpqwEITggNSA2IDcgOBAAAAtBACE5IAMgOTYCVAJAA0AgAygCVCE6QRAhOyA6IDtJITxBASE9IDwgPXEhPiA+RQ0BIAMoAlghP0EIIUAgPyBAaiFBQYQEIUIgQSBCaiFDIAMoAlQhREEDIUUgRCBFdCFGIEMgRmohRyADIEc2AlAgAygCUCFIIEgoAgAhSQJAAkAgSQ0ADAELIAMoAlghSkGMBSFLIEogS2ohTEGsECFNIEwgTWohTiADKAJUIU8gTiBPaiFQIFAtAAAhUUEYIVIgUSBSdCFTIFMgUnUhVCADIFQ6AE8gAy0ATyFVQRghViBVIFZ0IVcgVyBWdSFYQX8hWSBYIFlHIVpBASFbIFogW3EhXAJAIFxFDQAgAygCUCFdIF0tAAQhXkH/ASFfIF4gX3EhYEEQIWEgYCBhSCFiQQEhYyBiIGNxIWQCQCBkDQBBrMoFIWVB0sUEIWZB9skAIWdBpqwEIWggZSBmIGcgaBAAAAsgAygCUCFpIGktAAUhakH/ASFrIGoga3EhbEEQIW0gbCBtSCFuQQEhbyBuIG9xIXACQCBwDQBBlskFIXFB0sUEIXJB98kAIXNBpqwEIXQgcSByIHMgdBAAAAsgAygCXCF1QcwAIXYgdSB2aiF3IAMoAlAheCB4LQAEIXlB/wEheiB5IHpxIXtBAiF8IHsgfHQhfSB3IH1qIX4gfigCACF/IAMgfzYCSCADKAJcIYABQYwBIYEBIIABIIEBaiGCASADKAJQIYMBIIMBLQAFIYQBQf8BIYUBIIQBIIUBcSGGAUECIYcBIIYBIIcBdCGIASCCASCIAWohiQEgiQEoAgAhigEgAyCKATYCRCADKAJIIYsBQQAhjAEgiwEgjAFHIY0BQQEhjgEgjQEgjgFxIY8BAkAgjwENAEGXygQhkAFB0sUEIZEBQfrJACGSAUGmrAQhkwEgkAEgkQEgkgEgkwEQAAALIAMoAkQhlAFBACGVASCUASCVAUchlgFBASGXASCWASCXAXEhmAECQCCYAQ0AQa68BCGZAUHSxQQhmgFB+8kAIZsBQaasBCGcASCZASCaASCbASCcARAAAAsgAygCSCGdASCdASgCOCGeASADIJ4BNgJAIAMoAkghnwFBOCGgASCfASCgAWohoQFBCCGiASChASCiAWohowEgAygCSCGkASCkASgCECGlAUECIaYBIKUBIKYBdCGnASCjASCnAWohqAEgqAEoAgAhqQEgAyCpATYCPCADKAJEIaoBIKoBKAI0IasBIAMgqwE2AjggAy0ATyGsASADKAJAIa0BIAMoAjwhrgEgAygCOCGvAUEYIbABIKwBILABdCGxASCxASCwAXUhsgEgsgEgrQEgrgEgrwEQ2wILCyADKAJUIbMBQQEhtAEgswEgtAFqIbUBIAMgtQE2AlQMAAsACxAsIbYBAkAgtgFFDQBBgPYFIbcBQdLFBCG4AUGCygAhuQFBpqwEIboBILcBILgBILkBILoBEAAAC0EAIbsBIAMguwE2AjQCQANAIAMoAjQhvAFBCCG9ASC8ASC9AUkhvgFBASG/ASC+ASC/AXEhwAEgwAFFDQEgAygCWCHBAUEIIcIBIMEBIMIBaiHDAUHEACHEASDDASDEAWohxQEgAygCNCHGAUEDIccBIMYBIMcBdCHIASDFASDIAWohyQEgyQEoAgAhygECQAJAIMoBDQAMAQsgAygCXCHLAUHMASHMASDLASDMAWohzQEgAygCNCHOAUECIc8BIM4BIM8BdCHQASDNASDQAWoh0QEg0QEoAgAh0gEgAyDSATYCMCADKAJYIdMBQYwFIdQBINMBINQBaiHVAUGkECHWASDVASDWAWoh1wEgAygCNCHYASDXASDYAWoh2QEg2QEtAAAh2gEgAyDaAToALyADKAIwIdsBQSwh3AEg2wEg3AFqId0BIAMoAjAh3gEg3gEoAiAh3wFBAiHgASDfASDgAXQh4QEg3QEg4QFqIeIBIOIBKAIAIeMBIAMg4wE2AiggAy0ALyHkASADKAIoIeUBQf8BIeYBIOQBIOYBcSHnASDnASDlARD1AgsgAygCNCHoAUEBIekBIOgBIOkBaiHqASADIOoBNgI0DAALAAsgAygCXCHrASDrASgCSCHsAUEAIe0BIOwBIO0BRyHuAUEBIe8BIO4BIO8BcSHwAQJAAkAg8AFFDQAgAygCXCHxASDxASgCSCHyAUEsIfMBIPIBIPMBaiH0ASADKAJcIfUBIPUBKAJIIfYBIPYBKAIgIfcBQQIh+AEg9wEg+AF0IfkBIPQBIPkBaiH6ASD6ASgCACH7ASD7ASH8AQwBC0EAIf0BIP0BIfwBCyD8ASH+ASADIP4BNgIkIAMoAiQh/wFBk5ECIYACIIACIP8BENkCIAMoAlwhgQIggQIoAiQhggJBACGDAiCDAiCCAjYCsP8HQQAhhAIgAyCEAjYCIAJAA0AgAygCICGFAkEAIYYCIIYCKALI8AchhwIghQIghwJJIYgCQQEhiQIgiAIgiQJxIYoCIIoCRQ0BIAMoAlwhiwIgiwIoAgAhjAJBvAQhjQIgjAIgjQJqIY4CIAMoAiAhjwJBBCGQAiCPAiCQAnQhkQIgjgIgkQJqIZICIAMgkgI2AhwgAygCICGTAkGQ7gchlAJBoAshlQIglAIglQJqIZYCQQghlwIglgIglwJqIZgCQZABIZkCIJgCIJkCaiGaAkEUIZsCIJMCIJsCbCGcAiCaAiCcAmohnQIgAyCdAjYCGEEAIZ4CIAMgngI6ABdBACGfAiADIJ8CNgIQQQAhoAIgAyCgAjYCDCADKAIcIaECIKECLQAAIaICQRghowIgogIgowJ0IaQCIKQCIKMCdSGlAkEAIaYCIKUCIKYCTiGnAkEBIagCIKcCIKgCcSGpAgJAAkAgqQJFDQAgAygCHCGqAiCqAi0AACGrAkEYIawCIKsCIKwCdCGtAiCtAiCsAnUhrgJBCCGvAiCuAiCvAkghsAJBASGxAiCwAiCxAnEhsgICQCCyAg0AQf3JBSGzAkHSxQQhtAJBncoAIbUCQaasBCG2AiCzAiC0AiC1AiC2AhAAAAsgAygCXCG3AkEoIbgCILcCILgCaiG5AiADKAIcIboCILoCLQAAIbsCQRghvAIguwIgvAJ0Ib0CIL0CILwCdSG+AkECIb8CIL4CIL8CdCHAAiC5AiDAAmohwQIgwQIoAgAhwgIgAyDCAjYCCCADKAIIIcMCQQAhxAIgwwIgxAJHIcUCQQEhxgIgxQIgxgJxIccCAkAgxwINAEG7xAUhyAJB0sUEIckCQZ/KACHKAkGmrAQhywIgyAIgyQIgygIgywIQAAALIAMoAgghzAJBLCHNAiDMAiDNAmohzgIgAygCCCHPAiDPAigCICHQAkECIdECINACINECdCHSAiDOAiDSAmoh0wIg0wIoAgAh1AIgAyDUAjYCDCADKAJcIdUCQQQh1gIg1QIg1gJqIdcCIAMoAhwh2AIg2AItAAAh2QJBGCHaAiDZAiDaAnQh2wIg2wIg2gJ1IdwCQQIh3QIg3AIg3QJ0Id4CINcCIN4CaiHfAiDfAigCACHgAiADKAIcIeECIOECKAIIIeICIOACIOICaiHjAiADIOMCNgIQIAMoAgwh5AIgAygCGCHlAiDlAigCECHmAiDkAiDmAkch5wJBASHoAiDnAiDoAnEh6QICQAJAIOkCDQAgAygCHCHqAiDqAi0AAyHrAkH/ASHsAiDrAiDsAnEh7QIgAygCGCHuAiDuAi0AAyHvAkH/ASHwAiDvAiDwAnEh8QIg7QIg8QJHIfICQQEh8wIg8gIg8wJxIfQCIPQCDQAgAygCHCH1AiD1AigCDCH2AiADKAIYIfcCIPcCKAIMIfgCIPYCIPgCRyH5AkEBIfoCIPkCIPoCcSH7AiD7Ag0AIAMoAhwh/AIg/AItAAQh/QJB/wEh/gIg/QIg/gJxIf8CIAMoAhghgAMggAMtAAQhgQNB/wEhggMggQMgggNxIYMDIP8CIIMDRyGEA0EBIYUDIIQDIIUDcSGGAyCGAw0AIAMoAhwhhwMghwMtAAIhiANB/wEhiQMgiAMgiQNxIYoDIAMoAhghiwMgiwMtAAIhjANB/wEhjQMgjAMgjQNxIY4DIIoDII4DRyGPA0EBIZADII8DIJADcSGRAyCRAw0AIAMoAhAhkgMgAygCGCGTAyCTAygCCCGUAyCSAyCUA0chlQNBASGWAyCVAyCWA3EhlwMglwMNACADKAIYIZgDIJgDLQABIZkDQRghmgMgmQMgmgN0IZsDIJsDIJoDdSGcAyADKAIcIZ0DIJ0DLQABIZ4DQRghnwMgngMgnwN0IaADIKADIJ8DdSGhAyCcAyChA0chogNBASGjAyCiAyCjA3EhpAMgpANFDQELIAMoAgwhpQNBkpECIaYDIKYDIKUDENkCIAMoAiAhpwMgAygCHCGoAyCoAy0AAyGpA0H/ASGqAyCpAyCqA3EhqwMgAygCHCGsAyCsAygCDCGtAyADKAIcIa4DIK4DLQAEIa8DIAMoAhwhsAMgsAMtAAIhsQNB/wEhsgMgsQMgsgNxIbMDIAMoAhAhtANB/wEhtQMgrwMgtQNxIbYDIKcDIKsDIK0DILYDILMDILQDEGZBACG3AyC3Ay0AhPQHIbgDQQEhuQMguAMguQNxIboDAkAgugNFDQBBACG7AyC7AygC3PQHIbwDQQEhvQMgvAMgvQNqIb4DQQAhvwMgvwMgvgM2Atz0BwsgAygCICHAAyADKAIcIcEDIMEDLQABIcIDQRghwwMgwgMgwwN0IcQDIMQDIMMDdSHFAyDAAyDFAxBnQQAhxgMgxgMtAIT0ByHHA0EBIcgDIMcDIMgDcSHJAwJAIMkDRQ0AQQAhygMgygMoAuD0ByHLA0EBIcwDIMsDIMwDaiHNA0EAIc4DIM4DIM0DNgLg9AcLQQEhzwMgAyDPAzoAFwsgAygCGCHQAyDQAy0AACHRA0EYIdIDINEDINIDdCHTAyDTAyDSA3Uh1ANBfyHVAyDUAyDVA0Yh1gNBASHXAyDWAyDXA3Eh2AMCQCDYA0UNACADKAIgIdkDINkDEGhBACHaAyDaAy0AhPQHIdsDQQEh3AMg2wMg3ANxId0DAkAg3QNFDQBBACHeAyDeAygC5PQHId8DQQEh4AMg3wMg4ANqIeEDQQAh4gMg4gMg4QM2AuT0BwtBASHjAyADIOMDOgAXCwwBCyADKAIYIeQDIOQDLQAAIeUDQRgh5gMg5QMg5gN0IecDIOcDIOYDdSHoA0F/IekDIOgDIOkDRyHqA0EBIesDIOoDIOsDcSHsAwJAIOwDRQ0AIAMoAiAh7QMg7QMQMUEAIe4DIO4DLQCE9Ach7wNBASHwAyDvAyDwA3Eh8QMCQCDxA0UNAEEAIfIDIPIDKALo9Ach8wNBASH0AyDzAyD0A2oh9QNBACH2AyD2AyD1AzYC6PQHC0EBIfcDIAMg9wM6ABcLCyADLQAXIfgDQQEh+QMg+AMg+QNxIfoDAkAg+gNFDQAgAygCGCH7AyADKAIcIfwDIPwDKQIAIZEEIPsDIJEENwIAQQgh/QMg+wMg/QNqIf4DIPwDIP0DaiH/AyD/AykCACGSBCD+AyCSBDcCACADKAIQIYAEIAMoAhghgQQggQQggAQ2AgggAygCDCGCBCADKAIYIYMEIIMEIIIENgIQCyADKAIgIYQEQQEhhQQghAQghQRqIYYEIAMghgQ2AiAMAAsACxAsIYcEAkAghwRFDQBBgPYFIYgEQdLFBCGJBEHEygAhigRBpqwEIYsEIIgEIIkEIIoEIIsEEAAAC0EBIYwEQQEhjQQgjAQgjQRxIY4EQeAAIY8EIAMgjwRqIZAEIJAEJAAgjgQPC9wFAVl/IwAhA0EQIQQgAyAEayEFIAUkACAFIAA2AgwgBSABNgIIIAUgAjYCBEEAIQYgBi0AkO4HIQdBASEIIAcgCHEhCQJAIAkNAEH1mQUhCkHSxQQhC0GqkwEhDEHWgwQhDSAKIAsgDCANEAAAC0EAIQ4gDi0A/e4HIQ9BASEQIA8gEHEhEQJAIBENAEG7oAQhEkHSxQQhE0GrkwEhFEHWgwQhFSASIBMgFCAVEAAACyAFKAIMIRZBACEXIBYgF04hGEEBIRkgGCAZcSEaAkAgGg0AQaznBSEbQdLFBCEcQayTASEdQdaDBCEeIBsgHCAdIB4QAAALIAUoAgghH0EAISAgHyAgTiEhQQEhIiAhICJxISMCQCAjDQBB0OcFISRB0sUEISVBrZMBISZB1oMEIScgJCAlICYgJxAAAAsgBSgCBCEoQQAhKSAoIClOISpBASErICogK3EhLAJAICwNAEH/5wUhLUHSxQQhLkGukwEhL0HWgwQhMCAtIC4gLyAwEAAAC0EAITEgMS0AhPQHITJBASEzIDIgM3EhNAJAIDRFDQBBACE1IDUoAqT0ByE2QQEhNyA2IDdqIThBACE5IDkgODYCpPQHC0EAITogOi0A/O4HITtBASE8IDsgPHEhPQJAAkAgPQ0ADAELQQAhPiA+LQCg7wchP0EBIUAgPyBAcSFBAkAgQQ0ADAELQQAhQiBCKAKk7wchQ0EAIUQgRCgCqO8HIUUgQyBFRyFGQQEhRyBGIEdxIUgCQCBIRQ0AQcAAIUlBASFKQQAhS0G4kwEhTCBJIEogSyBMEMYBDAELIAUoAgghTUEAIU4gTiBNRiFPQQEhUCBPIFBxIVECQAJAIFENACAFKAIEIVJBACFTIFMgUkYhVEEBIVUgVCBVcSFWIFZFDQELDAELIAUoAgwhVyAFKAIIIVggBSgCBCFZIFcgWCBZEIACC0EQIVogBSBaaiFbIFskAA8LWgEIfyMAIQNBECEEIAMgBGshBSAFJAAgBSAANgIMIAUgATYCCCAFIAI2AgQgBSgCDCEGIAUoAgghByAFKAIEIQggBiAHIAgQgQJBECEJIAUgCWohCiAKJAAPC/8EAUp/IwAhA0EwIQQgAyAEayEFIAUkACAFIAA2AiwgBSABNgIoIAUgAjYCJEEAIQYgBigCwP8HIQdBACEIIAcgCEchCUEBIQogCSAKcSELAkAgCw0AQcL9BCEMQdLFBCENQYLLACEOQcqDBCEPIAwgDSAOIA8QAAALQQAhECAQKAK4/wchESAFIBE2AiBBACESIBIoArT/ByETIAUgEzYCHCAFKAIkIRRBASEVIBQgFUohFkEBIRdBASEYIBYgGHEhGSAXIRoCQCAZDQBBACEbIBsoAsD/ByEcIBwtABAhHSAdIRoLIBohHkEBIR8gHiAfcSEgIAUgIDoAGyAFKAIgISFBACEiICIgIUchI0EBISQgIyAkcSElAkACQCAlRQ0AIAUoAiAhJkGDKCEnICYgJ0YhKEECISlBBCEqQQEhKyAoICtxISwgKSAqICwbIS0gBSAtNgIUQQAhLiAuKAKw/wchLyAFIC82AhAgBSgCLCEwIAUoAhQhMSAwIDFsITIgBSgCECEzIDIgM2ohNCAFIDQ2AgwgBS0AGyE1QQEhNiA1IDZxITcCQAJAIDdFDQAgBSgCHCE4IAUoAighOSAFKAIgITogBSgCDCE7IAUoAiQhPCA4IDkgOiA7IDwQaQwBCyAFKAIcIT0gBSgCKCE+IAUoAiAhPyAFKAIMIUAgPSA+ID8gQBBqCwwBCyAFLQAbIUFBASFCIEEgQnEhQwJAAkAgQ0UNACAFKAIcIUQgBSgCLCFFIAUoAighRiAFKAIkIUcgRCBFIEYgRxBrDAELIAUoAhwhSCAFKAIsIUkgBSgCKCFKIEggSSBKEGwLC0EwIUsgBSBLaiFMIEwkAA8L/wEBH39BACEAIAAtAJDuByEBQQEhAiABIAJxIQMCQCADDQBB9ZkFIQRB0sUEIQVBx5MBIQZB4KAEIQcgBCAFIAYgBxAAAAtBACEIIAgtAP3uByEJQQEhCiAJIApxIQsCQCALDQBBu6AEIQxB0sUEIQ1ByJMBIQ5B4KAEIQ8gDCANIA4gDxAAAAtBACEQIBAtAIT0ByERQQEhEiARIBJxIRMCQCATRQ0AQQAhFCAUKAKM9AchFUEBIRYgFSAWaiEXQQAhGCAYIBc2Aoz0BwsQgwJBACEZQQAhGiAaIBk2ApzvB0GQ7gchG0HsACEcIBsgHGohHUEgIR4gHSAeEK8BDwsGABCEAg8Liw4CzgF/AX4jACEAQcAAIQEgACABayECIAIkABAsIQMCQCADRQ0AQYD2BSEEQdLFBCEFQcbHACEGQdCgBCEHIAQgBSAGIAcQAAALQQAhCCAIKAKE7wchCUEAIQogCSAKRyELQQEhDCALIAxxIQ0CQCANRQ0AQQAhDiAOKAKE7wchDyACIA82AjwgAigCPCEQIBAoAgAhEUEAIRIgEigCgO8HIRMgESATRiEUQQEhFSAUIBVxIRYCQCAWDQBByZ8FIRdB0sUEIRhByscAIRlB0KAEIRogFyAYIBkgGhAAAAtBACEbIAIgGzoAO0EAIRwgAiAcOgA6IAIoAjwhHSAdKAIQIR4gAiAeNgI0QQAhHyACIB82AjACQANAIAIoAjAhICACKAI0ISEgICAhSCEiQQEhIyAiICNxISQgJEUNASACKAI8ISVBgAEhJiAlICZqISdBKCEoICcgKGohKSACKAIwISpBAiErICogK3QhLCApICxqIS0gLSgCACEuAkAgLkUNACACLQA7IS9BASEwIC8gMHEhMQJAIDENACACKAI8ITIgMigCgAEhMwJAIDMNAEG+xAUhNEHSxQQhNUHSxwAhNkHQoAQhNyA0IDUgNiA3EAAACyACKAI8ITggOCgCgAEhOUGomQIhOiA6IDkQXkEBITsgAiA7OgA7CyACKAI8ITxBgAEhPSA8ID1qIT5BBCE/ID4gP2ohQCACKAIwIUFBAiFCIEEgQnQhQyBAIENqIUQgRCgCACFFIEUoAhwhRiACIEY2AiwgAigCPCFHQYABIUggRyBIaiFJQQQhSiBJIEpqIUsgAigCMCFMQQIhTSBMIE10IU4gSyBOaiFPIE8oAgAhUCBQKAIgIVEgAiBRNgIoIAIoAjwhUkGAASFTIFIgU2ohVEEoIVUgVCBVaiFWIAIoAjAhV0ECIVggVyBYdCFZIFYgWWohWiBaKAIAIVtBqZkCIVwgXCBbEF4gAigCMCFdQeCZAiFeIF0gXmohXyBfEG0gAigCLCFgIAIoAighYSACKAIsIWIgAigCKCFjQQAhZEGAgAEhZUGAzAAhZiBkIGQgYCBhIGQgZCBiIGMgZSBmEG5BASFnIAIgZzoAOgsgAigCMCFoQQEhaSBoIGlqIWogAiBqNgIwDAALAAsgAi0AOiFrQQEhbCBrIGxxIW0CQCBtRQ0AIAIoAjwhbiBuKAKAASFvQcCaAiFwIHAgbxBeC0EgIXEgAiBxaiFyQgAhzgEgciDOATcDACACIM4BNwMYIAIgzgE3AxBBACFzIAIgczYCDEEAIXQgAiB0NgIIAkADQCACKAIIIXUgAigCNCF2IHUgdkghd0EBIXggdyB4cSF5IHlFDQEgAigCCCF6QZDuByF7QaALIXwgeyB8aiF9QaAGIX4gfSB+aiF/QQIhgAEgeiCAAXQhgQEgfyCBAWohggEgggEoAgAhgwFBAiGEASCDASCEAUYhhQFBASGGASCFASCGAXEhhwECQCCHAUUNACACKAIIIYgBQeCZAiGJASCIASCJAWohigEgAigCDCGLAUEBIYwBIIsBIIwBaiGNASACII0BNgIMQRAhjgEgAiCOAWohjwEgjwEhkAFBAiGRASCLASCRAXQhkgEgkAEgkgFqIZMBIJMBIIoBNgIACyACKAIIIZQBQQEhlQEglAEglQFqIZYBIAIglgE2AggMAAsAC0EAIZcBIJcBKALg/wchmAFBAiGZASCYASCZAUYhmgFBASGbASCaASCbAXEhnAECQCCcAUUNAEEAIZ0BIJ0BKAKE7wchngEgngEoAnQhnwEgnwFFDQAgAigCDCGgAUEBIaEBIKABIKEBaiGiASACIKIBNgIMQRAhowEgAiCjAWohpAEgpAEhpQFBAiGmASCgASCmAXQhpwEgpQEgpwFqIagBQYCaAiGpASCoASCpATYCAAtBACGqASCqASgC5P8HIasBQQIhrAEgqwEgrAFGIa0BQQEhrgEgrQEgrgFxIa8BAkAgrwFFDQBBACGwASCwASgChO8HIbEBILEBKAJ0IbIBILIBRQ0AIAIoAgwhswFBASG0ASCzASC0AWohtQEgAiC1ATYCDEEQIbYBIAIgtgFqIbcBILcBIbgBQQIhuQEgswEguQF0IboBILgBILoBaiG7AUGgmgIhvAEguwEgvAE2AgALIAIoAgwhvQFBACG+ASC9ASC+AUohvwFBASHAASC/ASDAAXEhwQECQCDBAUUNACACKAIMIcIBQRAhwwEgAiDDAWohxAEgxAEhxQFBqZkCIcYBIMYBIMIBIMUBEG8LCxAsIccBAkAgxwFFDQBBgPYFIcgBQdLFBCHJAUH4xwAhygFB0KAEIcsBIMgBIMkBIMoBIMsBEAAAC0HAACHMASACIMwBaiHNASDNASQADwvLAgEnf0EAIQAgAC0AkO4HIQFBASECIAEgAnEhAwJAIAMNAEH1mQUhBEHSxQQhBUHSkwEhBkGFiwQhByAEIAUgBiAHEAAAC0EAIQggCC0A/O4HIQlBASEKIAkgCnEhCwJAIAtFDQBByJkFIQxB0sUEIQ1B05MBIQ5BhYsEIQ8gDCANIA4gDxAAAAtBACEQIBAtAP3uByERQQEhEiARIBJxIRMCQCATRQ0AQbqgBCEUQdLFBCEVQdSTASEWQYWLBCEXIBQgFSAWIBcQAAALEIYCQQAhGCAYKAL47gchGUEAIRogGiAZNgKI9AdB1AIhG0GI9AchHEHc9gchHSAdIBwgGxD3AhpBkO4HIR5B+AUhHyAeIB9qISBB1AIhISAgICEQrwEQhwJBACEiICIoAvjuByEjQQEhJCAjICRqISVBACEmICYgJTYC+O4HDwsGABCIAg8LyAIBKX8jACEAQRAhASAAIAFrIQIgAiQAQQAhAyADKALw/wchBEEAIQUgBCAFRyEGQQEhByAGIAdxIQgCQCAIDQBBpqoEIQlB0sUEIQpBtIsBIQtBx6IEIQwgCSAKIAsgDBAAAAtBACENIAIgDTYCDAJAA0AgAigCDCEOQQAhDyAPKALs/wchECAOIBBIIRFBASESIBEgEnEhEyATRQ0BQQAhFCAUKALw/wchFSACKAIMIRZBAyEXIBYgF3QhGCAVIBhqIRkgAiAZNgIIIAIoAgghGiAaKAIAIRtBACEcIBsgHEchHUEBIR4gHSAecSEfAkAgH0UNACACKAIIISAgICgCACEhIAIoAgghIiAiKAIEISMgIyAhEQAACyACKAIMISRBASElICQgJWohJiACICY2AgwMAAsAC0EQIScgAiAnaiEoICgkAA8LLQEGf0EAIQBBASEBIAAgAXEhAiACEMACQQAhA0EBIQQgAyAEcSEFIAUQwQIPC/sOAtMBfwJ9IwAhAEEQIQEgACABayECIAIkABAsIQMCQCADRQ0AQYD2BSEEQdLFBCEFQb7AACEGQZ2DBSEHIAQgBSAGIAcQAAALQQAhCCAIKAK0+QchCSAJEC4QLCEKAkAgCkUNAEGA9gUhC0HSxQQhDEHAwAAhDUGdgwUhDiALIAwgDSAOEAAAC0GQ7gchD0GgCyEQIA8gEGohEUEIIRIgESASaiETQZAGIRQgEyAUEK8BQQEhFUEBIRYgFSAWcSEXIBcQwAIQLCEYAkAgGEUNAEGA9gUhGUHSxQQhGkHDwAAhG0GdgwUhHCAZIBogGyAcEAAAC0EBIR1BASEeIB0gHnEhHyAfEMECECwhIAJAICBFDQBBgPYFISFB0sUEISJBxcAAISNBnYMFISQgISAiICMgJBAAAAtBACElIAIgJTYCDAJAA0AgAigCDCEmQQAhJyAnKALI8AchKCAmIChIISlBASEqICkgKnEhKyArRQ0BIAIoAgwhLEGQ7gchLUGgCyEuIC0gLmohL0EIITAgLyAwaiExQZABITIgMSAyaiEzQRQhNCAsIDRsITUgMyA1aiE2IAIgNjYCCCACKAIIITdB/wEhOCA3IDg6AAAgAigCCCE5Qf8BITogOSA6OgABIAIoAgwhOyA7EDEQLCE8AkAgPEUNAEGA9gUhPUHSxQQhPkHLwAAhP0GdgwUhQCA9ID4gPyBAEAAAC0EAIUEgQS0AhPQHIUJBASFDIEIgQ3EhRAJAIERFDQBBACFFIEUoAuj0ByFGQQEhRyBGIEdqIUhBACFJIEkgSDYC6PQHCyACKAIMIUpBASFLIEogS2ohTCACIEw2AgwMAAsAC0EEIU1BACFOIE4gTTYCtP8HQY2XAiFPQZDuByFQQaALIVEgUCBRaiFSQQghUyBSIFNqIVRBqAQhVSBUIFVqIVYgTyBWEA4QLCFXAkAgV0UNAEGA9gUhWEHSxQQhWUHSwAAhWkGdgwUhWyBYIFkgWiBbEAAAC0EIIVxBACFdIF0gXDYCvPkHQQghXkEAIV8gXyBeNgLU+QdBASFgQQAhYSBhIGA2Atj5B0EBIWJBACFjIGMgYjYC3PkHQQEhZEEAIWUgZSBkNgLg+QdBCCFmQQAhZyBnIGY2AuT5B0EBIWhBACFpIGkgaDYC6PkHQQEhakEAIWsgayBqNgLs+QdBASFsQQAhbSBtIGw2AvD5B0HxFiFuIG4QMkGHBCFvIG8QM0EAIXBB/wEhcSBwIHFxIXIgchA0QZAXIXMgcxA1QYcEIXRBACF1IHQgdSB1EDZBgDwhdiB2IHYgdhA3QQAhdyB3EDhBACF4IHgtAIT0ByF5QQEheiB5IHpxIXsCQCB7RQ0AQQAhfCB8KALY9AchfUEHIX4gfSB+aiF/QQAhgAEggAEgfzYC2PQHC0ECIYEBQQAhggEgggEggQE2Avz5B0EBIYMBQQAhhAEghAEggwE2AoD6B0EBIYUBQQAhhgEghgEghQE2AoT6B0ECIYcBQQAhiAEgiAEghwE2Aoj6B0EBIYkBQQAhigEgigEgiQE2Aoz6B0EBIYsBQQAhjAEgjAEgiwE2ApD6B0HiFyGNASCNARA1QQEhjgFBACGPASCOASCPASCOASCPARA5QYaAAiGQASCQASCQARA6QQAhkQEgkQGyIdMBINMBINMBINMBINMBEDtBACGSASCSAS0AhPQHIZMBQQEhlAEgkwEglAFxIZUBAkAglQFFDQBBACGWASCWASgC2PQHIZcBQQQhmAEglwEgmAFqIZkBQQAhmgEgmgEgmQE2Atj0BwtBACGbASACIJsBNgIEAkADQCACKAIEIZwBQQQhnQEgnAEgnQFIIZ4BQQEhnwEgngEgnwFxIaABIKABRQ0BIAIoAgQhoQFBkO4HIaIBQaALIaMBIKIBIKMBaiGkAUEIIaUBIKQBIKUBaiGmAUHcACGnASCmASCnAWohqAFBAiGpASChASCpAXQhqgEgqAEgqgFqIasBQQ8hrAEgqwEgrAE2AgAgAigCBCGtAUEBIa4BIK0BIK4BaiGvASACIK8BNgIEDAALAAtBASGwAUEAIbEBILEBILABNgKk+gdBAiGyAUEAIbMBILMBILIBNgKo+gdBASG0AUEAIbUBILUBILQBNgKw+gdBASG2AUH/ASG3ASC2ASC3AXEhuAFB/wEhuQEgtgEguQFxIboBQf8BIbsBILYBILsBcSG8AUH/ASG9ASC2ASC9AXEhvgEguAEgugEgvAEgvgEQPEEAIb8BIL8BsiHUASDUASDUARA9QbeAAiHAASDAARA1QcQWIcEBIMEBEDVBgBIhwgEgwgEQPkGFCCHDASDDARA/QZEYIcQBIMQBEDJBnoECIcUBIMUBEDVB0BchxgEgxgEQMkG3gAIhxwEgxwEQNUEAIcgBIMgBLQCE9AchyQFBASHKASDJASDKAXEhywECQCDLAUUNAEEAIcwBIMwBKALY9AchzQFBCiHOASDNASDOAWohzwFBACHQASDQASDPATYC2PQHC0EQIdEBIAIg0QFqIdIBINIBJAAPC1wCBn8GfiMAIQJBECEDIAIgA2shBCAEIAA3AwggBCABNwMAIAQpAwghCCAEKQMAIQlCASEKIAkgCn0hCyAIIAuDIQxCACENIAwgDVEhBUEBIQYgBSAGcSEHIAcPC/IKAY0BfyMAIQdB0AQhCCAHIAhrIQkgCSQAIAkgADYCzAQgCSABNgLIBCAJIAI2AsQEIAkgAzYCwAQgCSAENgK8BCAJIAU2ArgEIAkgBjYCtAQgCSgCyAQhCkECIQsgCiALSxoCQAJAAkACQAJAIAoOAwABAgMLQbXEBSEMIAkgDDYCsAQMAwtBp7EEIQ0gCSANNgKwBAwCC0HJyQQhDiAJIA42ArAEDAELQZK9BCEPIAkgDzYCsAQLQTAhECAJIBBqIREgESESIAkgEjYCLEEwIRMgCSATaiEUIBQhFUGABCEWIBUgFmohFyAJIBc2AiggCSgCzAQhGEEAIRkgGCAZRyEaQQEhGyAaIBtxIRwCQCAcRQ0AIAkoAiwhHSAJKAIoIR5B1scFIR8gHyAdIB4QjAIhICAJICA2AiwgCSgCzAQhISAJKAIsISIgCSgCKCEjICEgIiAjEIwCISQgCSAkNgIsIAkoAiwhJSAJKAIoISZB1McFIScgJyAlICYQjAIhKCAJICg2AiwLIAkoAiwhKSAJKAIoISpB1scFISsgKyApICoQjAIhLCAJICw2AiwgCSgCsAQhLSAJKAIsIS4gCSgCKCEvIC0gLiAvEIwCITAgCSAwNgIsIAkoAiwhMSAJKAIoITJB1McFITMgMyAxIDIQjAIhNCAJIDQ2AiwgCSgCLCE1IAkoAighNkH42AUhNyA3IDUgNhCMAiE4IAkgODYCLCAJKALEBCE5IAkhOkEgITsgOSA6IDsQjQIhPCAJKAIsIT0gCSgCKCE+IDwgPSA+EIwCIT8gCSA/NgIsIAkoAiwhQCAJKAIoIUFB1McFIUIgQiBAIEEQjAIhQyAJIEM2AiwgCSgCuAQhREEAIUUgRCBFRyFGQQEhRyBGIEdxIUgCQAJAIEhFDQAgCSgCLCFJIAkoAighSkG53wYhSyBLIEkgShCMAiFMIAkgTDYCLCAJKAK4BCFNIAkoAiwhTiAJKAIoIU8gTSBOIE8QjAIhUCAJIFA2AiwgCSgCLCFRIAkoAighUkH72AUhUyBTIFEgUhCMAiFUIAkgVDYCLCAJKAK8BCFVIAkhVkEgIVcgVSBWIFcQjQIhWCAJKAIsIVkgCSgCKCFaIFggWSBaEIwCIVsgCSBbNgIsIAkoAiwhXCAJKAIoIV1Btt8GIV4gXiBcIF0QjAIhXyAJIF82AiwMAQsgCSgCLCFgIAkoAighYUHx2AUhYiBiIGAgYRCMAiFjIAkgYzYCLCAJKAK8BCFkIAkhZUEgIWYgZCBlIGYQjQIhZyAJKAIsIWggCSgCKCFpIGcgaCBpEIwCIWogCSBqNgIsIAkoAiwhayAJKAIoIWxB1d4GIW0gbSBrIGwQjAIhbiAJIG42AiwLIAkoAsAEIW9BACFwIG8gcEchcUEBIXIgcSBycSFzAkAgc0UNACAJKAIsIXQgCSgCKCF1QdvfBiF2IHYgdCB1EIwCIXcgCSB3NgIsIAkoAsAEIXggCSgCLCF5IAkoAigheiB4IHkgehCMAiF7IAkgezYCLAsgCSgCLCF8IAkoAighfUHY3wYhfiB+IHwgfRCMAiF/IAkgfzYCLCAJKALIBCGAAUEAIYEBIIEBIIABRiGCAUEBIYMBIIIBIIMBcSGEAQJAIIQBRQ0AIAkoAiwhhQEgCSgCKCGGAUG73wYhhwEghwEghQEghgEQjAIhiAEgCSCIATYCLAsgCSgCyAQhiQFBMCGKASAJIIoBaiGLASCLASGMASCJASCMARAKIAkoAsgEIY0BQQAhjgEgjgEgjQFGIY8BQQEhkAEgjwEgkAFxIZEBAkAgkQFFDQAQ9gIAC0HQBCGSASAJIJIBaiGTASCTASQADwuZAgEgfyMAIQNBECEEIAMgBGshBSAFIAA2AgwgBSABNgIIIAUgAjYCBCAFKAIMIQZBACEHIAYgB0chCEEBIQkgCCAJcSEKAkAgCkUNAANAIAUoAgwhC0EBIQwgCyAMaiENIAUgDTYCDCALLQAAIQ4gBSAOOgADQRghDyAOIA90IRAgECAPdSERQQAhEiASIRMCQCARRQ0AIAUoAgghFCAFKAIEIRVBfyEWIBUgFmohFyAUIBdJIRggGCETCyATIRlBASEaIBkgGnEhGwJAIBtFDQAgBS0AAyEcIAUoAgghHUEBIR4gHSAeaiEfIAUgHzYCCCAdIBw6AAAMAQsLCyAFKAIIISBBACEhICAgIToAACAFKAIIISIgIg8LoQIBH38jACEDQSAhBCADIARrIQUgBSAANgIYIAUgATYCFCAFIAI2AhBBCyEGIAUgBjYCDCAFKAIQIQdBCyEIIAcgCEkhCUEBIQogCSAKcSELAkACQCALRQ0AQQAhDCAFIAw2AhwMAQsgBSgCFCENQQshDiANIA5qIQ8gBSAPNgIIIAUoAgghEEF/IREgECARaiESIAUgEjYCCEEAIRMgEiATOgAAA0AgBSgCGCEUQQohFSAUIBVwIRZBMCEXIBYgF2ohGCAFKAIIIRlBfyEaIBkgGmohGyAFIBs2AgggGyAYOgAAIAUoAhghHEEKIR0gHCAdbiEeIAUgHjYCGCAFKAIYIR8gHw0ACyAFKAIIISAgBSAgNgIcCyAFKAIcISEgIQ8LoAECAX4Of0IAIQEgACABNwIAQRghAiAAIAJqIQNBACEEIAMgBDYCAEEQIQUgACAFaiEGIAYgATcCAEEIIQcgACAHaiEIIAggATcCABCWASEJIAAgCTYCABCXASEKIAAgCjYCBBCYASELIAAgCzYCCBCgASEMIAAgDDYCDBCkASENIAAgDTYCEBClASEOIAAgDjYCFBCpASEPIAAgDzYCGA8LyAICAX4ef0IAIQEgACABNwIAQTghAiAAIAJqIQNBACEEIAMgBDYCAEEwIQUgACAFaiEGIAYgATcCAEEoIQcgACAHaiEIIAggATcCAEEgIQkgACAJaiEKIAogATcCAEEYIQsgACALaiEMIAwgATcCAEEQIQ0gACANaiEOIA4gATcCAEEIIQ8gACAPaiEQIBAgATcCABCUASERIAAgETYCABCVASESIAAgEjYCBBCYASETIAAgEzYCCBCWASEUIAAgFDYCDBCXASEVIAAgFTYCEBChASEWIAAgFjYCFBCiASEXIAAgFzYCGBCjASEYIAAgGDYCHBCmASEZIAAgGTYCIBCnASEaIAAgGjYCJBCoASEbIAAgGzYCKBCqASEcIAAgHDYCLBCrASEdIAAgHTYCMBCsASEeIAAgHjYCNBCtASEfIAAgHzYCOA8L4gUBVX8jACECQRAhAyACIANrIQQgBCQAIAQgATYCDCAEKAIMIQUgBSgC1AEhBkEAIQcgBiAHRyEIQQEhCSAIIAlxIQoCQAJAIApFDQAgBCgCDCELIAsoAtgBIQxBACENIAwgDUchDkEBIQ8gDiAPcSEQIBANAQsgBCgCDCERIBEoAtQBIRJBACETIBIgE0chFEEBIRUgFCAVcSEWAkAgFg0AIAQoAgwhFyAXKALYASEYQQAhGSAYIBlHIRpBASEbIBogG3EhHCAcRQ0BC0GoiwYhHUGVxgQhHkGdGCEfQcGfBCEgIB0gHiAfICAQAAALIAQoAgwhIUGEAiEiIAAgISAiEPcCGiAAKAIsISMCQAJAICMNAEEBISQgJCElDAELIAAoAiwhJiAmISULICUhJyAAICc2AiwgACgCMCEoAkACQCAoDQBBASEpICkhKgwBCyAAKAIwISsgKyEqCyAqISwgACAsNgIwIAAoAugBIS1BACEuIC4gLUYhL0EBITAgLyAwcSExAkAgMUUNAEEEITIgACAyNgLoAUEDITMgACAzNgLsAQsgACgC9AEhNEEAITUgNCA1RiE2QQEhNyA2IDdxITgCQAJAIDhFDQBBlLAEITkgOSE6DAELIAAoAvQBITsgOyE6CyA6ITwgACA8NgL0ASAAKAJAIT0CQAJAID0NAEGAwAAhPiA+IT8MAQsgACgCQCFAIEAhPwsgPyFBIAAgQTYCQCAAKAJIIUICQAJAIEINAEEBIUMgQyFEDAELIAAoAkghRSBFIUQLIEQhRiAAIEY2AkggACgCTCFHAkACQCBHDQBBgBAhSCBIIUkMAQsgACgCTCFKIEohSQsgSSFLIAAgSzYCTCAAKAI4IUxBACFNIEwgTUYhTkEBIU8gTiBPcSFQAkACQCBQRQ0AQfK7BCFRIFEhUgwBCyAAKAI4IVMgUyFSCyBSIVQgACBUNgI4QRAhVSAEIFVqIVYgViQADwtsAgp/AXwjACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQREERERERERkT8hCyAEIAs5AxAgAygCDCEFIAUQoQIgAygCDCEGQSAhByAGIAdqIQggCBCiAkEQIQkgAyAJaiEKIAokAA8LvgoCf38SfSMAIQNBICEEIAMgBGshBSAFJAAgBSAANgIcIAUgATYCGCAFIAI2AhRBACEGIAYtAOzDByEHQX8hCCAHIAhzIQlBASEKIAkgCnEhCyAFIAs6ABMgBSgCGCEMIAwvAR4hDUEAIQ4gDiANOwGG2AdBACEPIA8tANHWByEQQQEhESAQIBFxIRICQAJAIBJFDQAgBSgCGCETIBMoAiAhFCAUsiGCAUEAIRUgFSCCATgCyNYHIAUoAhghFiAWKAIkIRcgF7IhgwFBACEYIBgggwE4AszWBwwBCyAFKAIYIRkgGSgCKCEaIBqyIYQBQQAhGyAbKgKYxAchhQEghAEghQGUIYYBIAUghgE4AgwgBSgCGCEcIBwoAiwhHSAdsiGHAUEAIR4gHioCmMQHIYgBIIcBIIgBlCGJASAFIIkBOAIIQQAhHyAfLQDS1gchIEEBISEgICAhcSEiAkAgIkUNACAFKgIMIYoBQQAhIyAjKgLA1gchiwEgigEgiwGTIYwBQQAhJCAkIIwBOALI1gcgBSoCCCGNAUEAISUgJSoCxNYHIY4BII0BII4BkyGPAUEAISYgJiCPATgCzNYHCyAFKgIMIZABQQAhJyAnIJABOALA1gcgBSoCCCGRAUEAISggKCCRATgCxNYHQQEhKUEAISogKiApOgDS1gcLEH8hK0EBISwgKyAscSEtAkAgLUUNACAFKAIYIS4gLi8BHCEvQf//AyEwIC8gMHEhMUEAITIgMSAyTiEzQQEhNCAzIDRxITUgNUUNACAFKAIYITYgNi8BHCE3Qf//AyE4IDcgOHEhOUEDITogOSA6SCE7QQEhPCA7IDxxIT0gPUUNAEEAIT4gBSA+OgADIAUgPjoAAiAFKAIcIT9BeyFAID8gQGohQUEdIUIgQSBCSxoCQAJAAkACQAJAAkACQCBBDh4AAQUCBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFAwQFC0EEIUMgBSBDNgIEQQEhRCAFIEQ6AAMMBQtBBSFFIAUgRTYCBEEBIUYgBSBGOgADDAQLQQchRyAFIEc2AgQMAwtBCCFIIAUgSDYCBEEBIUkgBSBJOgACDAILQQkhSiAFIEo2AgRBASFLIAUgSzoAAgwBC0EAIUwgBSBMNgIECyAFLQACIU1BASFOIE0gTnEhTwJAIE9FDQBBACFQIFCyIZIBQQAhUSBRIJIBOALI1gdBACFSIFKyIZMBQQAhUyBTIJMBOALM1gcLIAUoAgQhVAJAIFRFDQAgBSgCBCFVIFUQgAEgBSgCGCFWIFYQpAIhV0EAIVggWCBXNgLo1AcgBS0AAyFZQQEhWiBZIFpxIVsCQAJAIFtFDQAgBSgCGCFcIFwvARwhXUECIV4gXSBeSxoCQAJAAkACQAJAIF0OAwABAgMLQQAhX0EAIWAgYCBfNgLs1AcMAwtBAiFhQQAhYiBiIGE2AuzUBwwCC0EBIWNBACFkIGQgYzYC7NQHDAELIAUoAhghZSBlLwEcIWZB//8DIWcgZiBncSFoQQAhaSBpIGg2AuzUBwsMAQtBgAIhakEAIWsgayBqNgLs1AcLQfDBByFsQeASIW0gbCBtaiFuIG4QgQEhb0EBIXAgbyBwcSFxIAUtABMhckEBIXMgciBzcSF0IHQgcXIhdUEAIXYgdSB2RyF3QQEheCB3IHhxIXkgBSB5OgATCyAFLQADIXpBASF7IHoge3EhfAJAIHxFDQAQpQILCyAFLQATIX1BASF+IH0gfnEhf0EgIYABIAUggAFqIYEBIIEBJAAgfw8L+gMDLX8KfQJ8IwAhA0EgIQQgAyAEayEFIAUkACAFIAA2AhwgBSABNgIYIAUgAjYCFEEAIQYgBi0A7sMHIQdBfyEIIAcgCHMhCUEBIQogCSAKcSELIAUgCzoAEyAFKAIYIQwgDC8BHiENQQAhDiAOIA07AYbYBxB/IQ9BASEQIA8gEHEhEQJAIBFFDQBBBiESIBIQgAEgBSgCGCETIBMQpAIhFEEAIRUgFSAUNgLo1AcgBSgCGCEWIBYoAlghF0ECIRggFyAYSxoCQAJAAkACQAJAIBcOAwABAgMLQwrXI70hMCAFIDA4AgwMAwtDcT2qvyExIAUgMTgCDAwCC0MAACDBITIgBSAyOAIMDAELQ83MzL0hMyAFIDM4AgwLIAUqAgwhNCAFKAIYIRkgGSsDQCE6IDq2ITUgNCA1lCE2QQAhGiAaIDY4AoDVByAFKgIMITcgBSgCGCEbIBsrA0ghOyA7tiE4IDcgOJQhOUEAIRwgHCA5OAKE1QdB8MEHIR1B4BIhHiAdIB5qIR8gHxCBASEgQQEhISAgICFxISIgBS0AEyEjQQEhJCAjICRxISUgJSAiciEmQQAhJyAmICdHIShBASEpICggKXEhKiAFICo6ABMLEKUCIAUtABMhK0EBISwgKyAscSEtQSAhLiAFIC5qIS8gLyQAIC0PC5cJAZIBfyMAIQNBICEEIAMgBGshBSAFJAAgBSAANgIcIAUgATYCGCAFIAI2AhRBACEGIAUgBjoAExB/IQdBASEIIAcgCHEhCQJAIAlFDQAgBSgCHCEKQX8hCyAKIAtqIQxBAiENIAwgDUsaAkACQAJAAkACQCAMDgMCAAEDC0EBIQ4gBSAONgIMDAMLQQIhDyAFIA82AgwMAgtBAyEQIAUgEDYCDAwBC0EAIREgBSARNgIMCyAFKAIMIRICQCASRQ0AQQAhEyAFIBM6AAsgBSgCDCEUIBQQgAEgBSgCGCEVIBUtABAhFkEBIRcgFiAXcSEYQQAhGSAZIBg6AOTUByAFKAIYIRogGhCmAiEbQQAhHCAcIBs2AujUByAFKAIMIR1BAyEeIB0gHkYhH0EBISAgHyAgcSEhAkACQCAhRQ0AIAUoAhghIiAiKAIUISNBACEkICQgIzYC4NQHQQAhJSAlLQDwwwchJkF/IScgJiAncyEoQQEhKSAoIClxISogBS0AEyErQQEhLCArICxxIS0gLSAqciEuQQAhLyAuIC9HITBBASExIDAgMXEhMiAFIDI6ABMMAQsgBSgCGCEzIDMtAEAhNEEYITUgNCA1dCE2IDYgNXUhN0EAITggOCA3RyE5QQEhOiA5IDpxITsCQAJAIDtFDQAgBSgCGCE8QcAAIT0gPCA9aiE+ID4QpwIhP0EAIUAgQCA/NgLc1AcMAQsgBSgCGCFBQSAhQiBBIEJqIUMgQxCnAiFEQQAhRSBFIEQ2AtzUBwsgBSgCDCFGQQEhRyBGIEdGIUhBASFJIEggSXEhSgJAIEpFDQBBACFLIEsoAtzUByFMQdcCIU0gTCBNRyFOQQEhTyBOIE9xIVAgUEUNAEEAIVEgUSgC3NQHIVJB2wIhUyBSIFNHIVRBASFVIFQgVXEhViBWRQ0AQQAhVyBXKALo1AchWEEIIVkgWCBZcSFaIFpFDQBBASFbIAUgWzoACwtBACFcIFwoAtzUByFdIF0QqAIhXkEBIV8gXiBfcSFgAkAgYA0AQQAhYSBhLQDvwwchYkF/IWMgYiBjcyFkQQEhZSBkIGVxIWYgBS0AEyFnQQEhaCBnIGhxIWkgaSBmciFqQQAhayBqIGtHIWxBASFtIGwgbXEhbiAFIG46ABMLC0HwwQchb0HgEiFwIG8gcGohcSBxEIEBIXJBASFzIHIgc3EhdCAFLQATIXVBASF2IHUgdnEhdyB3IHRyIXhBACF5IHggeUchekEBIXsgeiB7cSF8IAUgfDoAEyAFLQALIX1BASF+IH0gfnEhfwJAIH9FDQBBAiGAAUEAIYEBIIEBIIABNgLY1AdB8MEHIYIBQeASIYMBIIIBIIMBaiGEASCEARCBASGFAUEBIYYBIIUBIIYBcSGHASAFLQATIYgBQQEhiQEgiAEgiQFxIYoBIIoBIIcBciGLAUEAIYwBIIsBIIwBRyGNAUEBIY4BII0BII4BcSGPASAFII8BOgATCwsLEKUCIAUtABMhkAFBASGRASCQASCRAXEhkgFBICGTASAFIJMBaiGUASCUASQAIJIBDwvkBgJifwZ9IwAhA0EgIQQgAyAEayEFIAUkACAFIAA2AhwgBSABNgIYIAUgAjYCFEEAIQYgBi0A7cMHIQdBfyEIIAcgCHMhCUEBIQogCSAKcSELIAUgCzoAExB/IQxBASENIAwgDXEhDgJAIA5FDQAgBSgCHCEPQWohECAPIBBqIRFBAyESIBEgEksaAkACQAJAAkACQAJAIBEOBAACAQMEC0EKIRMgBSATNgIMDAQLQQshFCAFIBQ2AgwMAwtBDCEVIAUgFTYCDAwCC0ENIRYgBSAWNgIMDAELQQAhFyAFIBc2AgwLIAUoAgwhGAJAIBhFDQAgBSgCDCEZIBkQgAEgBSgCGCEaIBoQqQIhG0EAIRwgHCAbNgLo1AcgBSgCGCEdIB0oAgghHkEAIR8gHyAeNgKI1QdBACEgICAoAojVByEhQQghIiAhICJKISNBASEkICMgJHEhJQJAICVFDQBBCCEmQQAhJyAnICY2AojVBwtBACEoIAUgKDYCCAJAA0AgBSgCCCEpQQAhKiAqKAKI1QchKyApICtIISxBASEtICwgLXEhLiAuRQ0BIAUoAhghL0EQITAgLyAwaiExIAUoAgghMkEwITMgMiAzbCE0IDEgNGohNSAFIDU2AgQgBSgCCCE2QfDBByE3QeASITggNyA4aiE5QTwhOiA5IDpqITtBFCE8IDYgPGwhPSA7ID1qIT4gBSA+NgIAIAUoAgQhPyA/KAIAIUAgBSgCACFBIEEgQDYCACAFKAIEIUIgQigCICFDIEOyIWVBACFEIEQqApjEByFmIGUgZpQhZyAFKAIAIUUgRSBnOAIEIAUoAgQhRiBGKAIkIUcgR7IhaEEAIUggSCoCmMQHIWkgaCBplCFqIAUoAgAhSSBJIGo4AgggBSgCBCFKIEotABwhSyAFKAIAIUxBASFNIEsgTXEhTiBMIE46ABAgBSgCCCFPQQEhUCBPIFBqIVEgBSBRNgIIDAALAAtB8MEHIVJB4BIhUyBSIFNqIVQgVBCBASFVQQEhViBVIFZxIVcgBS0AEyFYQQEhWSBYIFlxIVogWiBXciFbQQAhXCBbIFxHIV1BASFeIF0gXnEhXyAFIF86ABMLCyAFLQATIWBBASFhIGAgYXEhYkEgIWMgBSBjaiFkIGQkACBiDwtgAQt/IwAhA0EQIQQgAyAEayEFIAUgADYCDCAFIAE2AgggBSACNgIEIAUoAgghBiAGLQAAIQdBASEIIAcgCHEhCUEAIQogCiAJOgDR1gdBASELQQEhDCALIAxxIQ0gDQ8LXAEKfyMAIQNBECEEIAMgBGshBSAFIAA2AgwgBSABNgIIIAUgAjYCBEEAIQZBACEHIAcgBjoA0dYHQQAhCEEAIQkgCSAIOgCE2AdBASEKQQEhCyAKIAtxIQwgDA8LhQEBD38jACEDQRAhBCADIARrIQUgBSQAIAUgADYCDCAFIAE2AgggBSACNgIEEH8hBkEBIQcgBiAHcSEIAkAgCEUNAEERIQkgCRCAAUHwwQchCkHgEiELIAogC2ohDCAMEIEBGgtBASENQQEhDiANIA5xIQ9BECEQIAUgEGohESARJAAgDw8LhQEBD38jACEDQRAhBCADIARrIQUgBSQAIAUgADYCDCAFIAE2AgggBSACNgIEEH8hBkEBIQcgBiAHcSEIAkAgCEUNAEESIQkgCRCAAUHwwQchCkHgEiELIAogC2ohDCAMEIEBGgtBASENQQEhDiANIA5xIQ9BECEQIAUgEGohESARJAAgDw8L/gEBG38jACEDQRAhBCADIARrIQUgBSQAIAUgADYCDCAFIAE2AgggBSACNgIEIAUoAgwhBkFhIQcgBiAHaiEIQQEhCSAIIAlLGgJAAkACQAJAIAgOAgABAgtBEyEKIAUgCjYCAAwCC0EUIQsgBSALNgIADAELQQAhDCAFIAw2AgALEH8hDUEBIQ4gDSAOcSEPAkAgD0UNACAFKAIAIRBBACERIBEgEEchEkEBIRMgEiATcSEUIBRFDQAgBSgCACEVIBUQgAFB8MEHIRZB4BIhFyAWIBdqIRggGBCBARoLQQEhGUEBIRogGSAacSEbQRAhHCAFIBxqIR0gHSQAIBsPC7UBAg1/B3wjACECQSAhAyACIANrIQQgBCQAIAQgADYCHCAEIAE5AxAgBCgCHCEFIAUrAwAhD0EAIQYgBrchECAPIBBkIQdBASEIIAcgCHEhCQJAIAlFDQAgBCsDECERIAQoAhwhCiAKKwMAIRIgESASoSETIAQgEzkDCCAEKAIcIQsgBCsDCCEUIAsgFBCrAgsgBCsDECEVIAQoAhwhDCAMIBU5AwBBICENIAQgDWohDiAOJAAPC2MCCH8DfkEAIQAgAC0A9sMHIQFBASECIAEgAnEhAwJAIANFDQBBACEEQQAhBSAFIAQ6APbDBxCsAgsQrQJBACEGIAYpA6DEByEIQgEhCSAIIAl8IQpBACEHIAcgCjcDoMQHDwvyCAGbAX9B8MEHIQBBnBYhASAAIAFqIQJBACEDQQEhBEECIQVBASEGIAQgBnEhByACIAMgByADIAUQEBpB8MEHIQhBnBYhCSAIIAlqIQpBACELQQEhDEECIQ1BASEOIAwgDnEhDyAKIAsgDyALIA0QERpB8MEHIRBBnBYhESAQIBFqIRJBACETQQEhFEECIRVBASEWIBQgFnEhFyASIBMgFyATIBUQEhpB8MEHIRhBnBYhGSAYIBlqIRpBACEbQQEhHEECIR1BASEeIBwgHnEhHyAaIBsgHyAbIB0QExpB8MEHISBBnBYhISAgICFqISJBACEjQQEhJEECISVBASEmICQgJnEhJyAiICMgJyAjICUQFBpB8MEHIShBnBYhKSAoIClqISpBACErQQEhLEECIS1BASEuICwgLnEhLyAqICsgLyArIC0QFRpBAiEwQQAhMUEBITJBASEzIDIgM3EhNCAwIDEgNCAxIDAQFhpBAiE1QQAhNkEBITdBASE4IDcgOHEhOSA1IDYgOSA2IDUQFxpBAiE6QQAhO0EBITxBASE9IDwgPXEhPiA6IDsgPiA7IDoQGBpB8MEHIT9BnBYhQCA/IEBqIUFBACFCQQEhQ0ECIURBASFFIEMgRXEhRiBBIEIgRiBCIEQQGRpB8MEHIUdBnBYhSCBHIEhqIUlBACFKQQEhS0ECIUxBASFNIEsgTXEhTiBJIEogTiBKIEwQGhpB8MEHIU9BnBYhUCBPIFBqIVFBACFSQQEhU0ECIVRBASFVIFMgVXEhViBRIFIgViBSIFQQGxpB8MEHIVdBnBYhWCBXIFhqIVlBACFaQQEhW0ECIVxBASFdIFsgXXEhXiBZIFogXiBaIFwQHBpBASFfQQAhYEEBIWFBAiFiQQEhYyBhIGNxIWQgXyBgIGQgYCBiEB0aQQEhZUEAIWZBASFnQQIhaEEBIWkgZyBpcSFqIGUgZiBqIGYgaBAeGkECIWtBACFsQQEhbUEBIW4gbSBucSFvIGsgbCBvIGwgaxAfGkECIXBBACFxQQEhckEBIXMgciBzcSF0IHAgcSB0IHEgcBAgGkEAIXUgdS0A6MMHIXZBASF3IHYgd3EheAJAIHgNAEECIXlBACF6QQEhe0EBIXwgeyB8cSF9IHkgeiB9IHogeRADGgsQKUEAIX4gfi0A2NYHIX9BASGAASB/IIABcSGBAQJAIIEBRQ0AECoLQQAhggEgggEtAOTWByGDAUEBIYQBIIMBIIQBcSGFAQJAIIUBRQ0AQfDBByGGAUGcFiGHASCGASCHAWohiAFBASGJASCIASCJAWohigEgigEQKwtB8MEHIYsBQZwWIYwBIIsBIIwBaiGNAUEAIY4BQQEhjwFBAiGQAUEBIZEBII8BIJEBcSGSASCNASCOASCSASCOASCQARAkGkHwwQchkwFBnBYhlAEgkwEglAFqIZUBQQAhlgFBASGXAUECIZgBQQEhmQEglwEgmQFxIZoBIJUBIJYBIJoBIJYBIJgBECUaDwvDAQEYf0EAIQAgAC0A+MMHIQFBASECIAEgAnEhAwJAIAMNAEEAIQQgBCgC+MEHIQVBACEGIAUgBkchB0EBIQggByAIcSEJAkACQCAJRQ0AQQAhCiAKKAL4wQchCyALEQIADAELQQAhDCAMKAKMwgchDUEAIQ4gDSAORyEPQQEhECAPIBBxIRECQCARRQ0AQQAhEiASKAKMwgchE0EAIRQgFCgCgMIHIRUgFSATEQAACwtBASEWQQAhFyAXIBY6APjDBwsPC9ACASp/QQAhACAALQDY1gchAUEBIQIgASACcSEDAkAgA0UNAEEAIQQgBCgC4NYHIQVBACEGIAUgBkchB0EBIQggByAIcSEJAkAgCQ0AQcK2BCEKQZXGBCELQfQYIQxB3OMEIQ0gCiALIAwgDRAAAAtBACEOIA4oAuDWByEPIA8QrgILQQAhECAQLQDk1gchEUEBIRIgESAScSETAkAgE0UNAEEAIRQgFCgC+NYHIRVBACEWIBUgFkchF0EBIRggFyAYcSEZAkAgGQ0AQbC2BCEaQZXGBCEbQfgYIRxB3OMEIR0gGiAbIBwgHRAAAAtBACEeIB4oAvjWByEfIB8QrgILQQAhICAgKAKA2AchIUEAISIgISAiRyEjQQEhJCAjICRxISUCQCAlRQ0AQQAhJiAmKAKA2AchJyAnEK4CC0HwwQchKEGgLCEpICggKRCCAQ8LsgIBJX8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQRBACEFIAQgBUshBkEBIQcgBiAHcSEIAkAgCA0AQYHmBSEJQZXGBCEKQaAXIQtB3sMFIQwgCSAKIAsgDBAAAAtBACENIA0oAsTDByEOQQAhDyAOIA9HIRBBASERIBAgEXEhEgJAAkAgEkUNAEEAIRMgEygCxMMHIRQgAygCDCEVQQAhFiAWKALMwwchFyAVIBcgFBEEACEYIAMgGDYCCAwBCyADKAIMIRkgGRCKAyEaIAMgGjYCCAsgAygCCCEbQQAhHCAcIBtGIR1BASEeIB0gHnEhHwJAIB9FDQBBASEgQQAhIUGoFyEiICAgISAhICIQiAELIAMoAgghI0EQISQgAyAkaiElICUkACAjDwuZAQIQfwJ8IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEQQAhBSAFtyERIAQgETkDACADKAIMIQZBACEHIAe3IRIgBiASOQMIIAMoAgwhCEEAIQkgCCAJNgIYIAMoAgwhCkEAIQsgCiALNgIcIAMoAgwhDEEgIQ0gDCANaiEOIA4QowJBECEPIAMgD2ohECAQJAAPCxsBA38jACEBQRAhAiABIAJrIQMgAyAANgIMDws/AQd/IwAhAUEQIQIgASACayEDIAMgADYCDCADKAIMIQRBACEFIAQgBTYCACADKAIMIQZBACEHIAYgBzYCBA8L4AIBKn8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDEEAIQQgAyAENgIIIAMoAgwhBSAFLQAYIQZBASEHIAYgB3EhCAJAIAhFDQAgAygCCCEJQQIhCiAJIApyIQsgAyALNgIICyADKAIMIQwgDC0AGSENQQEhDiANIA5xIQ8CQCAPRQ0AIAMoAgghEEEBIREgECARciESIAMgEjYCCAsgAygCDCETIBMtABohFEEBIRUgFCAVcSEWAkAgFkUNACADKAIIIRdBBCEYIBcgGHIhGSADIBk2AggLIAMoAgwhGiAaLQAbIRtBASEcIBsgHHEhHQJAIB1FDQAgAygCCCEeQQghHyAeIB9yISAgAyAgNgIIC0EAISEgIS8BhtgHISJB//8DISMgIiAjcSEkICQQqgIhJSADKAIIISYgJiAlciEnIAMgJzYCCCADKAIIIShBECEpIAMgKWohKiAqJAAgKA8LOAEGf0EAIQAgAC0AhNgHIQFBASECIAEgAnEhAwJAIANFDQBBACEEQQAhBSAFIAQ6AITYBxAoCw8L4AIBKn8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDEEAIQQgAyAENgIIIAMoAgwhBSAFLQAMIQZBASEHIAYgB3EhCAJAIAhFDQAgAygCCCEJQQIhCiAJIApyIQsgAyALNgIICyADKAIMIQwgDC0ADSENQQEhDiANIA5xIQ8CQCAPRQ0AIAMoAgghEEEBIREgECARciESIAMgEjYCCAsgAygCDCETIBMtAA4hFEEBIRUgFCAVcSEWAkAgFkUNACADKAIIIRdBBCEYIBcgGHIhGSADIBk2AggLIAMoAgwhGiAaLQAPIRtBASEcIBsgHHEhHQJAIB1FDQAgAygCCCEeQQghHyAeIB9yISAgAyAgNgIIC0EAISEgIS8BhtgHISJB//8DISMgIiAjcSEkICQQqgIhJSADKAIIISYgJiAlciEnIAMgJzYCCCADKAIIIShBECEpIAMgKWohKiAqJAAgKA8LngIBIn8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCCEEAIQQgAyAENgIEAkACQANAIAMoAgQhBUGA6QYhBkEDIQcgBSAHdCEIIAYgCGohCSAJKAIAIQogAyAKNgIAQQAhCyAKIAtHIQxBASENIAwgDXEhDiAORQ0BIAMoAgghDyADKAIAIRAgDyAQEPoCIRFBACESIBIgEUYhE0EBIRQgEyAUcSEVAkAgFUUNACADKAIEIRZBgOkGIRdBAyEYIBYgGHQhGSAXIBlqIRogGigCBCEbIAMgGzYCDAwDCyADKAIEIRxBASEdIBwgHWohHiADIB42AgQMAAsAC0EAIR8gAyAfNgIMCyADKAIMISBBECEhIAMgIWohIiAiJAAgIA8LOwEIfyMAIQFBECECIAEgAmshAyADIAA2AgwgAygCDCEEQaEBIQUgBCAFSSEGQQEhByAGIAdxIQggCA8L4AIBKn8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDEEAIQQgAyAENgIIIAMoAgwhBSAFLQAMIQZBASEHIAYgB3EhCAJAIAhFDQAgAygCCCEJQQIhCiAJIApyIQsgAyALNgIICyADKAIMIQwgDC0ADSENQQEhDiANIA5xIQ8CQCAPRQ0AIAMoAgghEEEBIREgECARciESIAMgEjYCCAsgAygCDCETIBMtAA4hFEEBIRUgFCAVcSEWAkAgFkUNACADKAIIIRdBBCEYIBcgGHIhGSADIBk2AggLIAMoAgwhGiAaLQAPIRtBASEcIBsgHHEhHQJAIB1FDQAgAygCCCEeQQghHyAeIB9yISAgAyAgNgIIC0EAISEgIS8BhtgHISJB//8DISMgIiAjcSEkICQQqgIhJSADKAIIISYgJiAlciEnIAMgJzYCCCADKAIIIShBECEpIAMgKWohKiAqJAAgKA8LtAIBKX8jACEBQRAhAiABIAJrIQMgAyAAOwEOQQAhBCADIAQ2AgggAy8BDiEFQf//AyEGIAUgBnEhB0EBIQggByAIcSEJQQAhCiAKIAlHIQtBASEMIAsgDHEhDQJAIA1FDQAgAygCCCEOQYACIQ8gDiAPciEQIAMgEDYCCAsgAy8BDiERQf//AyESIBEgEnEhE0ECIRQgEyAUcSEVQQAhFiAWIBVHIRdBASEYIBcgGHEhGQJAIBlFDQAgAygCCCEaQYAEIRsgGiAbciEcIAMgHDYCCAsgAy8BDiEdQf//AyEeIB0gHnEhH0EEISAgHyAgcSEhQQAhIiAiICFHISNBASEkICMgJHEhJQJAICVFDQAgAygCCCEmQYAIIScgJiAnciEoIAMgKDYCCAsgAygCCCEpICkPC4YGAkV/F3wjACECQTAhAyACIANrIQQgBCQAIAQgADYCLCAEIAE5AyBBACEFIAW3IUcgBCBHOQMYRJqZmZmZmbk/IUggBCBIOQMQIAQoAiwhBkEgIQcgBiAHaiEIIAgQrwIhCUEBIQogCSAKcSELAkAgC0UNACAEKAIsIQwgDCsDECFJRJqZmZmZmek/IUogSSBKoiFLIAQgSzkDGCAEKAIsIQ0gDSsDECFMRDMzMzMzM/M/IU0gTCBNoiFOIAQgTjkDEAsgBCsDICFPIAQrAxghUCBPIFBjIQ5BASEPIA4gD3EhEAJAAkACQCAQDQAgBCsDICFRIAQrAxAhUiBRIFJkIRFBASESIBEgEnEhEyATRQ0BCyAEKAIsIRQgFCgCGCEVQQEhFiAVIBZqIRcgFCAXNgIYIAQoAiwhGCAYKAIYIRlBFCEaIBkgGkohG0EBIRwgGyAccSEdAkAgHUUNACAEKAIsIR4gHhChAgsMAQsgBCgCLCEfQSAhICAfICBqISEgIRCvAiEiQQEhIyAiICNxISQCQCAkRQ0AIAQoAiwhJUEgISYgJSAmaiEnICcQsAIhUyAEIFM5AwggBCsDCCFUIAQoAiwhKCAoKwMIIVUgVSBUoSFWICggVjkDCCAEKAIsISkgKSgCHCEqQQEhKyAqICtrISwgKSAsNgIcCyAEKAIsIS1BICEuIC0gLmohLyAEKwMgIVcgLyBXELECIAQrAyAhWCAEKAIsITAgMCsDCCFZIFkgWKAhWiAwIFo5AwggBCgCLCExIDEoAhwhMkEBITMgMiAzaiE0IDEgNDYCHCAEKAIsITUgNSgCHCE2QQAhNyA2IDdKIThBASE5IDggOXEhOgJAIDoNAEHO5AUhO0GVxgQhPEHDEiE9QZ2FBCE+IDsgPCA9ID4QAAALIAQoAiwhPyA/KwMIIVsgBCgCLCFAIEAoAhwhQSBBtyFcIFsgXKMhXSAEKAIsIUIgQiBdOQMQIAQoAiwhQ0EAIUQgQyBENgIYC0EwIUUgBCBFaiFGIEYkAA8LpAEBFH9BACEAIAAoAvDBByEBQQAhAiABIAJHIQNBASEEIAMgBHEhBQJAAkAgBUUNAEEAIQYgBigC8MEHIQcgBxECAAwBC0EAIQggCCgChMIHIQlBACEKIAkgCkchC0EBIQwgCyAMcSENAkAgDUUNAEEAIQ4gDigChMIHIQ9BACEQIBAoAoDCByERIBEgDxEAAAsLQQEhEkEAIRMgEyASOgD3wwcPC88BARp/QQAhACAALQD3wwchAUEBIQIgASACcSEDAkAgA0UNAEEAIQQgBC0A+MMHIQVBASEGIAUgBnEhByAHDQBBACEIIAgoAvTBByEJQQAhCiAJIApHIQtBASEMIAsgDHEhDQJAAkAgDUUNAEEAIQ4gDigC9MEHIQ8gDxECAAwBC0EAIRAgECgCiMIHIRFBACESIBEgEkchE0EBIRQgEyAUcSEVAkAgFUUNAEEAIRYgFigCiMIHIRdBACEYIBgoAoDCByEZIBkgFxEAAAsLCw8LlAEBEX8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDEEAIQQgBCgCyMMHIQVBACEGIAUgBkchB0EBIQggByAIcSEJAkACQCAJRQ0AQQAhCiAKKALIwwchCyADKAIMIQxBACENIA0oAszDByEOIAwgDiALEQMADAELIAMoAgwhDyAPEIwDC0EQIRAgAyAQaiERIBEkAA8LcAEPfyMAIQFBECECIAEgAmshAyADJAAgAyAANgIMIAMoAgwhBCAEKAIAIQVBASEGIAUgBmohByAHELICIQggAygCDCEJIAkoAgQhCiAIIApGIQtBASEMIAsgDHEhDUEQIQ4gAyAOaiEPIA8kACANDwvqAQIbfwJ8IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEIAQQswIhBUEBIQYgBSAGcSEHAkAgB0UNAEHwnAYhCEGVxgQhCUG6ESEKQcLiBCELIAggCSAKIAsQAAALIAMoAgwhDEEIIQ0gDCANaiEOIAMoAgwhDyAPKAIEIRBBAyERIBAgEXQhEiAOIBJqIRMgEysDACEcIAMgHDkDACADKAIMIRQgFCgCBCEVQQEhFiAVIBZqIRcgFxCyAiEYIAMoAgwhGSAZIBg2AgQgAysDACEdQRAhGiADIBpqIRsgGyQAIB0PC+gBAht/AXwjACECQRAhAyACIANrIQQgBCQAIAQgADYCDCAEIAE5AwAgBCgCDCEFIAUQrwIhBkEBIQcgBiAHcSEIAkAgCEUNAEGInQYhCUGVxgQhCkG0ESELQa/iBCEMIAkgCiALIAwQAAALIAQrAwAhHSAEKAIMIQ1BCCEOIA0gDmohDyAEKAIMIRAgECgCACERQQMhEiARIBJ0IRMgDyATaiEUIBQgHTkDACAEKAIMIRUgFSgCACEWQQEhFyAWIBdqIRggGBCyAiEZIAQoAgwhGiAaIBk2AgBBECEbIAQgG2ohHCAcJAAPCzABBn8jACEBQRAhAiABIAJrIQMgAyAANgIMIAMoAgwhBEGAAiEFIAQgBW8hBiAGDwtLAQp/IwAhAUEQIQIgASACayEDIAMgADYCDCADKAIMIQQgBCgCACEFIAMoAgwhBiAGKAIEIQcgBSAHRiEIQQEhCSAIIAlxIQogCg8LsgIBJX8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQRBACEFIAQgBUshBkEBIQcgBiAHcSEIAkAgCA0AQYHmBSEJQdLFBCEKQbAwIQtB68MFIQwgCSAKIAsgDBAAAAtBACENIA0oAsTuByEOQQAhDyAOIA9HIRBBASERIBAgEXEhEgJAAkAgEkUNAEEAIRMgEygCxO4HIRQgAygCDCEVQQAhFiAWKALM7gchFyAVIBcgFBEEACEYIAMgGDYCCAwBCyADKAIMIRkgGRCKAyEaIAMgGjYCCAsgAygCCCEbQQAhHCAcIBtGIR1BASEeIB0gHnEhHwJAIB9FDQBBASEgQQAhIUG4MCEiICAgISAhICIQxgELIAMoAgghI0EQISQgAyAkaiElICUkACAjDwuiDgHFAX8jACEAQSAhASAAIAFrIQIgAiQAQQEhA0EAIQQgBCADNgKo8AdBACEFQQAhBiAGIAU6AKzwB0EAIQdBACEIIAggBzoArfAHQQAhCUEAIQogCiAJOgCu8AdBACELQQAhDCAMIAs6AK/wB0EAIQ1BACEOIA4gDToAsPAHQQAhDyACIA86AB9BACEQIAIgEDoAHkEAIREgAiAROgAdQQAhEiACIBI6ABxBACETIAIgEzoAG0EAIRQgAiAUOgAaQQAhFSACIBU6ABlBACEWIAIgFjoAGEEAIRcgAiAXOgAXQQAhGCACIBg6ABZBACEZIAIgGTYCEEGdhAIhGkEQIRsgAiAbaiEcIBwhHSAaIB0QDkEAIR4gAiAeNgIMAkADQCACKAIMIR8gAigCECEgIB8gIEghIUEBISIgISAicSEjICNFDQEgAigCDCEkQYM+ISUgJSAkEDAhJiACICY2AgggAigCCCEnQQAhKCAnIChHISlBASEqICkgKnEhKwJAICtFDQAgAigCCCEsQb7BBSEtICwgLRCCAyEuQQAhLyAuIC9HITBBASExIDAgMXEhMgJAAkAgMkUNAEEBITMgAiAzOgAfDAELIAIoAgghNEHYwQUhNSA0IDUQggMhNkEAITcgNiA3RyE4QQEhOSA4IDlxIToCQAJAIDpFDQBBASE7IAIgOzoAHwwBCyACKAIIITxBjMEFIT0gPCA9EIIDIT5BACE/ID4gP0chQEEBIUEgQCBBcSFCAkACQCBCRQ0AQQEhQyACIEM6AB4MAQsgAigCCCFEQfLABSFFIEQgRRCCAyFGQQAhRyBGIEdHIUhBASFJIEggSXEhSgJAAkAgSkUNAEEBIUsgAiBLOgAdDAELIAIoAgghTEGxwAUhTSBMIE0QggMhTkEAIU8gTiBPRyFQQQEhUSBQIFFxIVICQAJAIFJFDQBBASFTIAIgUzoAHAwBCyACKAIIIVRB2MAFIVUgVCBVEIIDIVZBACFXIFYgV0chWEEBIVkgWCBZcSFaAkACQCBaRQ0AQQEhWyACIFs6ABwMAQsgAigCCCFcQabBBSFdIFwgXRCCAyFeQQAhXyBeIF9HIWBBASFhIGAgYXEhYgJAAkAgYkUNAEEBIWMgAiBjOgAbDAELIAIoAgghZEGYwAUhZSBkIGUQggMhZkEAIWcgZiBnRyFoQQEhaSBoIGlxIWoCQAJAIGpFDQBBASFrIAIgazoAGgwBCyACKAIIIWxBzZAEIW0gbCBtEIIDIW5BACFvIG4gb0chcEEBIXEgcCBxcSFyAkACQCByRQ0AQQEhcyACIHM6ABkMAQsgAigCCCF0QeGQBCF1IHQgdRCCAyF2QQAhdyB2IHdHIXhBASF5IHggeXEhegJAAkAgekUNAEEBIXsgAiB7OgAYDAELIAIoAgghfEG4uwQhfSB8IH0QggMhfkEAIX8gfiB/RyGAAUEBIYEBIIABIIEBcSGCAQJAAkAgggFFDQBBASGDASACIIMBOgAXDAELIAIoAgghhAFBupQFIYUBIIQBIIUBEIIDIYYBQQAhhwEghgEghwFHIYgBQQEhiQEgiAEgiQFxIYoBAkACQCCKAUUNAEEBIYsBIAIgiwE6ABYMAQsgAigCCCGMAUGZxAUhjQEgjAEgjQEQggMhjgFBACGPASCOASCPAUchkAFBASGRASCQASCRAXEhkgECQCCSAUUNAEEBIZMBQQAhlAEglAEgkwE6AMj/BwsLCwsLCwsLCwsLCwsLIAIoAgwhlQFBASGWASCVASCWAWohlwEgAiCXATYCDAwACwALIAItABghmAFBASGZASCYASCZAXEhmgECQCCaAQ0AIAItABkhmwFBASGcASCbASCcAXEhnQEgnQFFDQAgAi0AGSGeAUEBIZ8BIJ4BIJ8BcSGgASACIKABOgAYCxC2AkEAIaEBIAIgoQE6AAdBACGiAUEBIaMBIKIBIKMBcSGkASCkARC3AiACLQAZIaUBIAItABchpgEgAi0AFiGnAUEBIagBIKUBIKgBcSGpAUEBIaoBIKYBIKoBcSGrAUEBIawBIKcBIKwBcSGtASCpASCrASCtARC4AiACLQAYIa4BQQEhrwEgrgEgrwFxIbABILABELkCIAItAB8hsQFBASGyASCxASCyAXEhswECQCCzAUUNABC6AgsgAi0AHiG0AUEBIbUBILQBILUBcSG2AQJAILYBRQ0AELsCCyACLQAdIbcBQQEhuAEgtwEguAFxIbkBAkAguQFFDQAQvAILIAItABwhugFBASG7ASC6ASC7AXEhvAECQCC8AUUNABC9AgsgAi0AGyG9AUEBIb4BIL0BIL4BcSG/AQJAIL8BRQ0AEL4CCyACLQAaIcABQQEhwQEgwAEgwQFxIcIBAkAgwgFFDQAQvwILQSAhwwEgAiDDAWohxAEgxAEkAA8LtgcBcH8jACEAQRAhASAAIAFrIQIgAiQAECwhAwJAIANFDQBBgPYFIQRB0sUEIQVB1zwhBkHwnwQhByAEIAUgBiAHEAAAC0GzGiEIQQwhCSACIAlqIQogCiELIAggCxAOECwhDAJAIAxFDQBBgPYFIQ1B0sUEIQ5B2jwhD0HwnwQhECANIA4gDyAQEAAACyACKAIMIRFBACESIBIgETYCtPAHIAIoAgwhE0EAIRQgFCATNgLA8AdBnIoCIRVBDCEWIAIgFmohFyAXIRggFSAYEA4QLCEZAkAgGUUNAEGA9gUhGkHSxQQhG0HePCEcQfCfBCEdIBogGyAcIB0QAAALIAIoAgwhHkEAIR8gHyAeNgK48AdB6ZACISBBDCEhIAIgIWohIiAiISMgICAjEA4QLCEkAkAgJEUNAEGA9gUhJUHSxQQhJkHhPCEnQfCfBCEoICUgJiAnICgQAAALIAIoAgwhKUEQISogKSAqSiErQQEhLCArICxxIS0CQCAtRQ0AQRAhLiACIC42AgwLIAIoAgwhL0EAITAgMCAvNgLI8AdBypYCITFBDCEyIAIgMmohMyAzITQgMSA0EA4QLCE1AkAgNUUNAEGA9gUhNkHSxQQhN0HnPCE4QfCfBCE5IDYgNyA4IDkQAAALIAIoAgwhOkEAITsgOyA6NgLM8AdB84ACITxBDCE9IAIgPWohPiA+IT8gPCA/EA4QLCFAAkAgQEUNAEGA9gUhQUHSxQQhQkHqPCFDQfCfBCFEIEEgQiBDIEQQAAALIAIoAgwhRUEAIUYgRiBFNgK88AdB/5ECIUdBDCFIIAIgSGohSSBJIUogRyBKEA4QLCFLAkAgS0UNAEGA9gUhTEHSxQQhTUHtPCFOQfCfBCFPIEwgTSBOIE8QAAALIAIoAgwhUEEAIVEgUSBQNgLE8AdBACFSIFItAMj/ByFTQQEhVCBTIFRxIVUCQAJAIFVFDQBB/4kCIVZBDCFXIAIgV2ohWCBYIVkgViBZEA4QLCFaAkAgWkUNAEGA9gUhW0HSxQQhXEHxPCFdQfCfBCFeIFsgXCBdIF4QAAALIAIoAgwhX0EAIWAgYCBfNgLM/wcMAQtBASFhQQAhYiBiIGE2Asz/BwtBzZYCIWNBDCFkIAIgZGohZSBlIWYgYyBmEA4QLCFnAkAgZ0UNAEGA9gUhaEHSxQQhaUH3PCFqQfCfBCFrIGggaSBqIGsQAAALIAIoAgwhbEEAIW0gbSBsNgLQ8AdBECFuIAIgbmohbyBvJAAPC6EJAZ8BfyMAIQFBECECIAEgAmshAyADJAAgACEEIAMgBDoAD0GQ7gchBUHEAiEGIAUgBmohB0EMIQggByAIaiEJIAkQwgJBkO4HIQpBxAIhCyAKIAtqIQxBEiENIAwgDWohDiAOEMMCQZDuByEPQcQCIRAgDyAQaiERQRghEiARIBJqIRMgExDEAkGQ7gchFEHEAiEVIBQgFWohFkEeIRcgFiAXaiEYIBgQxAJBkO4HIRlBxAIhGiAZIBpqIRtBMCEcIBsgHGohHSAdEMQCQZDuByEeQcQCIR8gHiAfaiEgQTYhISAgICFqISIgIhDEAkGQ7gchI0HEAiEkICMgJGohJUHCACEmICUgJmohJyAnEMICQZDuByEoQcQCISkgKCApaiEqQcgAISsgKiAraiEsICwQwwJBkO4HIS1BxAIhLiAtIC5qIS9BzgAhMCAvIDBqITEgMRDEAkGQ7gchMkHEAiEzIDIgM2ohNEHUACE1IDQgNWohNiA2EMQCQZDuByE3QcQCITggNyA4aiE5QdoAITogOSA6aiE7IDsQxQJBkO4HITxBxAIhPSA8ID1qIT5B4AAhPyA+ID9qIUAgQBDFAkGQ7gchQUHEAiFCIEEgQmohQ0H4ACFEIEMgRGohRSBFEMQCQZDuByFGQcQCIUcgRiBHaiFIQf4AIUkgSCBJaiFKIEoQxAJBkO4HIUtBxAIhTCBLIExqIU1BigEhTiBNIE5qIU8gTxDCAkGQ7gchUEHEAiFRIFAgUWohUkGQASFTIFIgU2ohVCBUEMICQZDuByFVQcQCIVYgVSBWaiFXQZYBIVggVyBYaiFZIFkQwwJBkO4HIVpBxAIhWyBaIFtqIVxBnAEhXSBcIF1qIV4gXhDEAkGQ7gchX0HEAiFgIF8gYGohYUGiASFiIGEgYmohYyBjEMQCIAMtAA8hZEEBIWUgZCBlcSFmAkAgZkUNAEGQ7gchZ0HEAiFoIGcgaGohaUGoASFqIGkgamohayBrEMICC0GQ7gchbEHEAiFtIGwgbWohbkGuASFvIG4gb2ohcCBwEMICQZDuByFxQcQCIXIgcSByaiFzQboBIXQgcyB0aiF1IHUQwwJBkO4HIXZBxAIhdyB2IHdqIXhBwAEheSB4IHlqIXogehDEAkGQ7gche0HEAiF8IHsgfGohfUHGASF+IH0gfmohfyB/EMQCQZDuByGAAUHEAiGBASCAASCBAWohggFB3gEhgwEgggEggwFqIYQBIIQBEMQCQZDuByGFAUHEAiGGASCFASCGAWohhwFB5AEhiAEghwEgiAFqIYkBIIkBEMQCQZDuByGKAUHEAiGLASCKASCLAWohjAFB8AEhjQEgjAEgjQFqIY4BII4BEMQCQZDuByGPAUHEAiGQASCPASCQAWohkQFB9gEhkgEgkQEgkgFqIZMBIJMBEMQCQZDuByGUAUHEAiGVASCUASCVAWohlgFBggIhlwEglgEglwFqIZgBIJgBEMYCQZDuByGZAUHEAiGaASCZASCaAWohmwFBiAIhnAEgmwEgnAFqIZ0BIJ0BEMYCQRAhngEgAyCeAWohnwEgnwEkAA8L3QYBc38jACEDQRAhBCADIARrIQUgBSQAIAAhBiAFIAY6AA8gASEHIAUgBzoADiACIQggBSAIOgANIAUtAA4hCUEBIQogCSAKcSELAkACQCALRQ0AIAUtAA8hDEEBIQ0gDCANcSEOAkACQCAORQ0AIAUtAA0hD0EBIRAgDyAQcSERAkACQCARRQ0AQZDuByESQcQCIRMgEiATaiEUQeYAIRUgFCAVaiEWIBYQwgJBkO4HIRdBxAIhGCAXIBhqIRlBzAEhGiAZIBpqIRsgGxDCAkGQ7gchHEHEAiEdIBwgHWohHkH8ASEfIB4gH2ohICAgEMICDAELQZDuByEhQcQCISIgISAiaiEjQeYAISQgIyAkaiElICUQxwJBkO4HISZBxAIhJyAmICdqIShBzAEhKSAoIClqISogKhDHAkGQ7gchK0HEAiEsICsgLGohLUH8ASEuIC0gLmohLyAvEMcCC0GQ7gchMEHEAiExIDAgMWohMkG0ASEzIDIgM2ohNCA0EMcCDAELQZDuByE1QcQCITYgNSA2aiE3QeYAITggNyA4aiE5IDkQwwJBkO4HITpBxAIhOyA6IDtqITxBzAEhPSA8ID1qIT4gPhDDAkGQ7gchP0HEAiFAID8gQGohQUH8ASFCIEEgQmohQyBDEMMCQZDuByFEQcQCIUUgRCBFaiFGQbQBIUcgRiBHaiFIIEgQwwILDAELIAUtAA8hSUEBIUogSSBKcSFLAkACQCBLRQ0AQZDuByFMQcQCIU0gTCBNaiFOQeYAIU8gTiBPaiFQIFAQyAJBkO4HIVFBxAIhUiBRIFJqIVNBzAEhVCBTIFRqIVUgVRDIAkGQ7gchVkHEAiFXIFYgV2ohWEH8ASFZIFggWWohWiBaEMgCQZDuByFbQcQCIVwgWyBcaiFdQbQBIV4gXSBeaiFfIF8QxAIMAQtBkO4HIWBBxAIhYSBgIGFqIWJB5gAhYyBiIGNqIWQgZBDJAkGQ7gchZUHEAiFmIGUgZmohZ0HMASFoIGcgaGohaSBpEMkCQZDuByFqQcQCIWsgaiBraiFsQfwBIW0gbCBtaiFuIG4QyQJBkO4HIW9BxAIhcCBvIHBqIXFBtAEhciBxIHJqIXMgcxDJAgsLQRAhdCAFIHRqIXUgdSQADwuhAgEnfyMAIQFBECECIAEgAmshAyADJAAgACEEIAMgBDoADyADLQAPIQVBASEGIAUgBnEhBwJAAkAgB0UNAEGQ7gchCEHEAiEJIAggCWohCkE8IQsgCiALaiEMIAwQwgJBkO4HIQ1BxAIhDiANIA5qIQ9BhAEhECAPIBBqIREgERDCAkGQ7gchEkHEAiETIBIgE2ohFEHqASEVIBQgFWohFiAWEMICDAELQZDuByEXQcQCIRggFyAYaiEZQTwhGiAZIBpqIRsgGxDDAkGQ7gchHEHEAiEdIBwgHWohHkGEASEfIB4gH2ohICAgEMMCQZDuByEhQcQCISIgISAiaiEjQeoBISQgIyAkaiElICUQwwILQRAhJiADICZqIScgJyQADwuRAQEUf0GQ7gchAEHEAiEBIAAgAWohAkGOAiEDIAIgA2ohBCAEEMMCQZDuByEFQcQCIQYgBSAGaiEHQZQCIQggByAIaiEJIAkQwwJBkO4HIQpBxAIhCyAKIAtqIQxBmgIhDSAMIA1qIQ4gDhDDAkGQ7gchD0HEAiEQIA8gEGohEUGgAiESIBEgEmohEyATEMMCDwuRAQEUf0GQ7gchAEHEAiEBIAAgAWohAkGmAiEDIAIgA2ohBCAEEMMCQZDuByEFQcQCIQYgBSAGaiEHQawCIQggByAIaiEJIAkQwwJBkO4HIQpBxAIhCyAKIAtqIQxBsgIhDSAMIA1qIQ4gDhDDAkGQ7gchD0HEAiEQIA8gEGohEUG4AiESIBEgEmohEyATEMMCDwuRAQEUf0GQ7gchAEHEAiEBIAAgAWohAkG+AiEDIAIgA2ohBCAEEMMCQZDuByEFQcQCIQYgBSAGaiEHQcQCIQggByAIaiEJIAkQwwJBkO4HIQpBxAIhCyAKIAtqIQxBygIhDSAMIA1qIQ4gDhDDAkGQ7gchD0HEAiEQIA8gEGohEUHQAiESIBEgEmohEyATEMMCDwuRAQEUf0GQ7gchAEHEAiEBIAAgAWohAkHWAiEDIAIgA2ohBCAEEMMCQZDuByEFQcQCIQYgBSAGaiEHQdwCIQggByAIaiEJIAkQwwJBkO4HIQpBxAIhCyAKIAtqIQxB4gIhDSAMIA1qIQ4gDhDDAkGQ7gchD0HEAiEQIA8gEGohEUHoAiESIBEgEmohEyATEMMCDwvAAgEtf0GQ7gchAEHEAiEBIAAgAWohAkHuAiEDIAIgA2ohBCAEEMMCQZDuByEFQcQCIQYgBSAGaiEHQfQCIQggByAIaiEJIAkQwwJBkO4HIQpBxAIhCyAKIAtqIQxB+gIhDSAMIA1qIQ4gDhDDAkGQ7gchD0HEAiEQIA8gEGohEUGAAyESIBEgEmohEyATEMMCQZDuByEUQcQCIRUgFCAVaiEWQYYDIRcgFiAXaiEYIBgQwwJBkO4HIRlBxAIhGiAZIBpqIRtBjAMhHCAbIBxqIR0gHRDDAkGQ7gchHkHEAiEfIB4gH2ohIEGSAyEhICAgIWohIiAiEMMCQZDuByEjQcQCISQgIyAkaiElQZgDISYgJSAmaiEnICcQwwJBkO4HIShBxAIhKSAoIClqISpBngMhKyAqICtqISwgLBDDAg8LSwEKf0GQ7gchAEHEAiEBIAAgAWohAkGkAyEDIAIgA2ohBCAEEMMCQZDuByEFQcQCIQYgBSAGaiEHQaoDIQggByAIaiEJIAkQwwIPC5IHAXR/IwAhAUEQIQIgASACayEDIAMkACAAIQQgAyAEOgAPIAMtAA8hBUEBIQYgBSAGcSEHAkACQCAHDQBBACEIIAgoAoj9ByEJIAlFDQELQZKRAiEKQQAhCyAKIAsQQEEAIQxBACENIA0gDDYCiP0HQQAhDiAOLQCE9AchD0EBIRAgDyAQcSERAkAgEUUNAEEAIRIgEigCxPQHIRNBASEUIBMgFGohFUEAIRYgFiAVNgLE9AcLCyADLQAPIRdBASEYIBcgGHEhGQJAAkAgGQ0AQQAhGiAaKAKM/QchGyAbRQ0BC0GTkQIhHEEAIR0gHCAdEEBBACEeQQAhHyAfIB42Aoz9B0EAISAgIC0AhPQHISFBASEiICEgInEhIwJAICNFDQBBACEkICQoAsT0ByElQQEhJiAlICZqISdBACEoICggJzYCxPQHCwsgAy0ADyEpQQEhKiApICpxISsCQAJAICsNAEEAISwgLCgCkP0HIS0gLUUNAQtBACEuIC4tALDwByEvQQEhMCAvIDBxITECQCAxRQ0AQdKhAiEyQQAhMyAyIDMQQAtBACE0QQAhNSA1IDQ2ApD9B0EAITYgNi0AhPQHITdBASE4IDcgOHEhOQJAIDlFDQBBACE6IDooAsT0ByE7QQEhPCA7IDxqIT1BACE+ID4gPTYCxPQHCwtBACE/IAMgPzYCCAJAA0AgAygCCCFAQRAhQSBAIEFJIUJBASFDIEIgQ3EhRCBERQ0BIAMtAA8hRUEBIUYgRSBGcSFHAkACQCBHDQAgAygCCCFIQZDuByFJQaALIUogSSBKaiFLQQghTCBLIExqIU1B3AMhTiBNIE5qIU9BAiFQIEggUHQhUSBPIFFqIVIgUigCACFTIFNFDQELQQAhVCBULQCw8AchVUEBIVYgVSBWcSFXAkAgV0UNACADKAIIIVhB0qECIVlBACFaIFkgWCBaEEELIAMoAgghW0GQ7gchXEGgCyFdIFwgXWohXkEIIV8gXiBfaiFgQdwDIWEgYCBhaiFiQQIhYyBbIGN0IWQgYiBkaiFlQQAhZiBlIGY2AgBBACFnIGctAIT0ByFoQQEhaSBoIGlxIWoCQCBqRQ0AQQAhayBrKALE9AchbEEBIW0gbCBtaiFuQQAhbyBvIG42AsT0BwsLIAMoAgghcEEBIXEgcCBxaiFyIAMgcjYCCAwACwALQRAhcyADIHNqIXQgdCQADwvHBwGAAX8jACEBQRAhAiABIAJrIQMgAyQAIAAhBCADIAQ6AA8QLCEFAkAgBUUNAEGA9gUhBkHSxQQhB0HHPyEIQeqsBCEJIAYgByAIIAkQAAALQQAhCiADIAo2AggDQCADKAIIIQtBECEMIAsgDEghDUEAIQ5BASEPIA0gD3EhECAOIRECQCAQRQ0AIAMoAgghEkEAIRMgEygC0PAHIRQgEiAUSCEVIBUhEQsgESEWQQEhFyAWIBdxIRgCQCAYRQ0AIAMtAA8hGUEBIRogGSAacSEbAkACQCAbDQAgAygCCCEcQZDuByEdQaALIR4gHSAeaiEfQQghICAfICBqISFBrAQhIiAhICJqISNBDCEkIBwgJGwhJSAjICVqISYgJigCBCEnICdFDQELIAMoAgghKEHAiQIhKSAoIClqISogAyAqNgIEIAMoAgQhKyArEEJBACEsICwtAIT0ByEtQQEhLiAtIC5xIS8CQCAvRQ0AQQAhMCAwKALI9AchMUEBITIgMSAyaiEzQQAhNCA0IDM2Asj0BwtB4RshNUEAITYgNSA2EENBk4oCITdBACE4IDcgOBBDQe+AAiE5QQAhOiA5IDoQQ0GamAIhO0EAITwgOyA8EENBACE9ID0tAIT0ByE+QQEhPyA+ID9xIUACQCBARQ0AQQAhQSBBKALM9AchQkEEIUMgQiBDaiFEQQAhRSBFIEQ2Asz0BwsgAygCCCFGQQAhRyBGIEcQREEAIUggSC0AhPQHIUlBASFKIEkgSnEhSwJAIEtFDQBBACFMIEwoAtD0ByFNQQEhTiBNIE5qIU9BACFQIFAgTzYC0PQHCyADKAIIIVFBkO4HIVJBoAshUyBSIFNqIVRBCCFVIFQgVWohVkGsBCFXIFYgV2ohWEEMIVkgUSBZbCFaIFggWmohW0EAIVwgWyBcNgIAIAMoAgghXUGQ7gchXkGgCyFfIF4gX2ohYEEIIWEgYCBhaiFiQawEIWMgYiBjaiFkQQwhZSBdIGVsIWYgZCBmaiFnQQAhaCBnIGg2AgQgAygCCCFpQZDuByFqQaALIWsgaiBraiFsQQghbSBsIG1qIW5BrAQhbyBuIG9qIXBBDCFxIGkgcWwhciBwIHJqIXNBACF0IHMgdDYCCCADKAIEIXVBACF2IHYgdTYCvP8HCyADKAIIIXdBASF4IHcgeGoheSADIHk2AggMAQsLECwhegJAIHpFDQBBgPYFIXtB0sUEIXxB2j8hfUHqrAQhfiB7IHwgfSB+EAAAC0EQIX8gAyB/aiGAASCAASQADwt1AQ1/IwAhAUEQIQIgASACayEDIAMgADYCDCADKAIMIQRBASEFIAQgBToAACADKAIMIQZBASEHIAYgBzoAASADKAIMIQhBASEJIAggCToAAyADKAIMIQpBASELIAogCzoAAiADKAIMIQxBASENIAwgDToABA8LPwEHfyMAIQFBECECIAEgAmshAyADIAA2AgwgAygCDCEEQQEhBSAEIAU6AAAgAygCDCEGQQEhByAGIAc6AAEPC1EBCX8jACEBQRAhAiABIAJrIQMgAyAANgIMIAMoAgwhBEEBIQUgBCAFOgAAIAMoAgwhBkEBIQcgBiAHOgACIAMoAgwhCEEBIQkgCCAJOgAEDws/AQd/IwAhAUEQIQIgASACayEDIAMgADYCDCADKAIMIQRBASEFIAQgBToAACADKAIMIQZBASEHIAYgBzoAAg8LYwELfyMAIQFBECECIAEgAmshAyADIAA2AgwgAygCDCEEQQEhBSAEIAU6AAAgAygCDCEGQQEhByAGIAc6AAIgAygCDCEIQQEhCSAIIAk6AAQgAygCDCEKQQEhCyAKIAs6AAUPC2MBC38jACEBQRAhAiABIAJrIQMgAyAANgIMIAMoAgwhBEEBIQUgBCAFOgAAIAMoAgwhBkEBIQcgBiAHOgABIAMoAgwhCEEBIQkgCCAJOgACIAMoAgwhCkEBIQsgCiALOgAEDwtjAQt/IwAhAUEQIQIgASACayEDIAMgADYCDCADKAIMIQRBASEFIAQgBToAACADKAIMIQZBASEHIAYgBzoAAyADKAIMIQhBASEJIAggCToAAiADKAIMIQpBASELIAogCzoABA8LLQEFfyMAIQFBECECIAEgAmshAyADIAA2AgwgAygCDCEEQQEhBSAEIAU6AAAPC/IDAT5/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEQQAhBSAEIAVHIQZBASEHIAYgB3EhCAJAIAgNAEGD0gQhCUHSxQQhCkHXwQAhC0GBtgQhDCAJIAogCyAMEAAACxAsIQ0CQCANRQ0AQYD2BSEOQdLFBCEPQdjBACEQQYG2BCERIA4gDyAQIBEQAAALQQAhEiADIBI2AggCQANAIAMoAgghEyADKAIMIRQgFCgCHCEVIBMgFUghFkEBIRcgFiAXcSEYIBhFDQEgAygCDCEZQSwhGiAZIBpqIRsgAygCCCEcQQIhHSAcIB10IR4gGyAeaiEfIB8oAgAhIAJAICBFDQAgAygCDCEhQSwhIiAhICJqISMgAygCCCEkQQIhJSAkICV0ISYgIyAmaiEnICcoAgAhKCAoENACIAMoAgwhKSApLQA0ISpBASErICogK3EhLAJAICwNACADKAIMIS1BLCEuIC0gLmohLyADKAIIITBBAiExIDAgMXQhMiAvIDJqITNBASE0IDQgMxBFCwsgAygCCCE1QQEhNiA1IDZqITcgAyA3NgIIDAALAAsQLCE4AkAgOEUNAEGA9gUhOUHSxQQhOkHhwQAhO0GBtgQhPCA5IDogOyA8EAAAC0EQIT0gAyA9aiE+ID4kAA8L1gQBTX8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQRBACEFIAQgBUchBkEBIQcgBiAHcSEIAkAgCA0AQZfKBCEJQdLFBCEKQdDCACELQYaQBSEMIAkgCiALIAwQAAALECwhDQJAIA1FDQBBgPYFIQ5B0sUEIQ9B0cIAIRBBhpAFIREgDiAPIBAgERAAAAtBACESIAMgEjYCCAJAA0AgAygCCCETIAMoAgwhFCAUKAIMIRUgEyAVSCEWQQEhFyAWIBdxIRggGEUNASADKAIMIRlBOCEaIBkgGmohG0EIIRwgGyAcaiEdIAMoAgghHkECIR8gHiAfdCEgIB0gIGohISAhKAIAISICQCAiRQ0AIAMoAgwhI0E4ISQgIyAkaiElQQghJiAlICZqIScgAygCCCEoQQIhKSAoICl0ISogJyAqaiErICsoAgAhLEEAIS0gLCAtENECIAMoAgwhLiAuLQBIIS9BASEwIC8gMHEhMQJAIDENACADKAIMITJBOCEzIDIgM2ohNEEIITUgNCA1aiE2IAMoAgghN0ECITggNyA4dCE5IDYgOWohOkEBITsgOyA6EEYLCyADKAIIITxBASE9IDwgPWohPiADID42AggMAAsACyADKAIMIT8gPygCPCFAAkAgQEUNACADKAIMIUFBOCFCIEEgQmohQ0EEIUQgQyBEaiFFQQEhRiBGIEUQRwsQLCFHAkAgR0UNAEGA9gUhSEHSxQQhSUHdwgAhSkGGkAUhSyBIIEkgSiBLEAAAC0EQIUwgAyBMaiFNIE0kAA8LqAIBI38jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQRBACEFIAQgBUchBkEBIQcgBiAHcSEIAkAgCA0AQa68BCEJQdLFBCEKQZjDACELQeSyBCEMIAkgCiALIAwQAAALECwhDQJAIA1FDQBBgPYFIQ5B0sUEIQ9BmcMAIRBB5LIEIREgDiAPIBAgERAAAAsgAygCDCESIBIoAjQhE0EAIRQgFCATENECIAMoAgwhFSAVLQA4IRZBASEXIBYgF3EhGAJAIBgNACADKAIMIRlBNCEaIBkgGmohG0EBIRwgHCAbEEgLECwhHQJAIB1FDQBBgPYFIR5B0sUEIR9BnsMAISBB5LIEISEgHiAfICAgIRAAAAtBECEiIAMgImohIyAjJAAPC5ECAR5/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEQQAhBSAEIAVHIQZBASEHIAYgB3EhCAJAIAgNAEGqoAUhCUHSxQQhCkGuxAAhC0GsugQhDCAJIAogCyAMEAAACxAsIQ0CQCANRQ0AQYD2BSEOQdLFBCEPQa/EACEQQay6BCERIA4gDyAQIBEQAAALIAMoAgwhEiASKAKMBSETAkAgE0UNACADKAIMIRQgFCgCjAUhFSAVENMCIAMoAgwhFiAWKAKMBSEXIBcQSQsQLCEYAkAgGEUNAEGA9gUhGUHSxQQhGkG0xAAhG0GsugQhHCAZIBogGyAcEAAAC0EQIR0gAyAdaiEeIB4kAA8LgQEBD38jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQRBACEFIAQgBUchBkEBIQcgBiAHcSEIAkAgCA0AQbK8BCEJQdLFBCEKQf7EACELQZj+BCEMIAkgCiALIAwQAAALIAMoAgwhDSANENQCQRAhDiADIA5qIQ8gDyQADwvzAwE/fyMAIQFBECECIAEgAmshAyADJAAgAyAANgIMIAMoAgwhBEEAIQUgBCAFRyEGQQEhByAGIAdxIQgCQCAIDQBB05kEIQlB0sUEIQpBtcYAIQtByJwEIQwgCSAKIAsgDBAAAAsQLCENAkAgDUUNAEGA9gUhDkHSxQQhD0G2xgAhEEHInAQhESAOIA8gECAREAAACyADKAIMIRIgEigCgAEhE0EAIRQgFCATRyEVQQEhFiAVIBZxIRcCQCAXRQ0AIAMoAgwhGEGAASEZIBggGWohGkEBIRsgGyAaEEsLQQAhHCADIBw2AggCQANAIAMoAgghHUEEIR4gHSAeSCEfQQEhICAfICBxISEgIUUNASADKAIMISJBgAEhIyAiICNqISRBKCElICQgJWohJiADKAIIISdBAiEoICcgKHQhKSAmIClqISogKigCACErAkAgK0UNACADKAIMISxBgAEhLSAsIC1qIS5BKCEvIC4gL2ohMCADKAIIITFBAiEyIDEgMnQhMyAwIDNqITRBASE1IDUgNBBLCyADKAIIITZBASE3IDYgN2ohOCADIDg2AggMAAsACxAsITkCQCA5RQ0AQYD2BSE6QdLFBCE7Qb/GACE8QcicBCE9IDogOyA8ID0QAAALQRAhPiADID5qIT8gPyQADwuBCwGuAX8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQRBACEFIAUoAoj9ByEGIAQgBkYhB0EBIQggByAIcSEJAkAgCUUNAEEAIQpBACELIAsgCjYCiP0HQZKRAiEMQQAhDSAMIA0QQEEAIQ4gDi0AhPQHIQ9BASEQIA8gEHEhEQJAIBFFDQBBACESIBIoAsT0ByETQQEhFCATIBRqIRVBACEWIBYgFTYCxPQHCwsgAygCDCEXQQAhGCAYKAKM/QchGSAXIBlGIRpBASEbIBogG3EhHAJAIBxFDQBBACEdQQAhHiAeIB02Aoz9B0GTkQIhH0EAISAgHyAgEEBBACEhICEtAIT0ByEiQQEhIyAiICNxISQCQCAkRQ0AQQAhJSAlKALE9AchJkEBIScgJiAnaiEoQQAhKSApICg2AsT0BwsLIAMoAgwhKkEAISsgKygCkP0HISwgKiAsRiEtQQEhLiAtIC5xIS8CQCAvRQ0AQQAhMEEAITEgMSAwNgKQ/QdB0qECITJBACEzIDIgMxBAQQAhNCA0LQCE9AchNUEBITYgNSA2cSE3AkAgN0UNAEEAITggOCgCxPQHITlBASE6IDkgOmohO0EAITwgPCA7NgLE9AcLC0EAIT0gAyA9NgIIAkADQCADKAIIIT5BECE/ID4gP0khQEEBIUEgQCBBcSFCIEJFDQEgAygCDCFDIAMoAgghREGQ7gchRUGgCyFGIEUgRmohR0EIIUggRyBIaiFJQdwDIUogSSBKaiFLQQIhTCBEIEx0IU0gSyBNaiFOIE4oAgAhTyBDIE9GIVBBASFRIFAgUXEhUgJAIFJFDQAgAygCCCFTQZDuByFUQaALIVUgVCBVaiFWQQghVyBWIFdqIVhB3AMhWSBYIFlqIVpBAiFbIFMgW3QhXCBaIFxqIV1BACFeIF0gXjYCAEEAIV9BACFgIGAgXzYCkP0HIAMoAgghYUHSoQIhYkEAIWMgYiBhIGMQQUEAIWQgZC0AhPQHIWVBASFmIGUgZnEhZwJAIGdFDQBBACFoIGgoAsT0ByFpQQEhaiBpIGpqIWtBACFsIGwgazYCxPQHCwsgAygCCCFtQQEhbiBtIG5qIW8gAyBvNgIIDAALAAsgAygCDCFwQQAhcSBxKALU/QchciBwIHJGIXNBASF0IHMgdHEhdQJAIHVFDQBBACF2QQAhdyB3IHY2AtT9BwsgAygCDCF4QQAheSB5KALY/QcheiB4IHpGIXtBASF8IHsgfHEhfQJAIH1FDQBBACF+QQAhfyB/IH42Atj9BwsgAygCDCGAAUEAIYEBIIEBKALc/QchggEggAEgggFGIYMBQQEhhAEggwEghAFxIYUBAkAghQFFDQBBACGGAUEAIYcBIIcBIIYBNgLc/QcLQQAhiAEgAyCIATYCBAJAA0AgAygCBCGJAUEQIYoBIIkBIIoBSCGLAUEBIYwBIIsBIIwBcSGNASCNAUUNASADKAIMIY4BIAMoAgQhjwFBkO4HIZABQaALIZEBIJABIJEBaiGSAUEIIZMBIJIBIJMBaiGUAUGQASGVASCUASCVAWohlgFBFCGXASCPASCXAWwhmAEglgEgmAFqIZkBIJkBKAIQIZoBII4BIJoBRiGbAUEBIZwBIJsBIJwBcSGdAQJAIJ0BRQ0AIAMoAgQhngFBkO4HIZ8BQaALIaABIJ8BIKABaiGhAUEIIaIBIKEBIKIBaiGjAUGQASGkASCjASCkAWohpQFBFCGmASCeASCmAWwhpwEgpQEgpwFqIagBQQAhqQEgqAEgqQE2AhALIAMoAgQhqgFBASGrASCqASCrAWohrAEgAyCsATYCBAwACwALQRAhrQEgAyCtAWohrgEgrgEkAA8L8AYBbH8jACECQRAhAyACIANrIQQgBCQAIAQgADYCDCAEIAE2AggQLCEFAkAgBUUNAEGA9gUhBkHSxQQhB0GVwAAhCEGasgQhCSAGIAcgCCAJEAAAC0EAIQogBCAKNgIEAkADQCAEKAIEIQtBECEMIAsgDEkhDUEBIQ4gDSAOcSEPIA9FDQEgBCgCBCEQQZDuByERQaALIRIgESASaiETQQghFCATIBRqIRVBrAQhFiAVIBZqIRdBDCEYIBAgGGwhGSAXIBlqIRogBCAaNgIAIAQoAgAhGyAbKAIAIRxBACEdIB0gHEchHkEBIR8gHiAfcSEgAkAgIEUNACAEKAIMISEgBCgCACEiICIoAgQhIyAhICNGISRBASElICQgJXEhJgJAICYNACAEKAIIIScgBCgCACEoICgoAgghKSAnIClGISpBASErICogK3EhLCAsRQ0BCyAEKAIEIS1BwIkCIS4gLSAuaiEvIC8Q0gIgBCgCACEwIDAoAgAhMUEAITIgMSAyEEMQLCEzAkAgM0UNAEGA9gUhNEHSxQQhNUGbwAAhNkGasgQhNyA0IDUgNiA3EAAAC0EAITggOC0AhPQHITlBASE6IDkgOnEhOwJAIDtFDQBBACE8IDwoAsz0ByE9QQEhPiA9ID5qIT9BACFAIEAgPzYCzPQHCyAEKAIEIUFBACFCIEEgQhBEECwhQwJAIENFDQBBgPYFIURB0sUEIUVBnsAAIUZBmrIEIUcgRCBFIEYgRxAAAAtBACFIIEgtAIT0ByFJQQEhSiBJIEpxIUsCQCBLRQ0AQQAhTCBMKALQ9AchTUEBIU4gTSBOaiFPQQAhUCBQIE82AtD0BwsgBCgCACFRQQAhUiBRIFI2AgAgBCgCACFTQQAhVCBTIFQ2AgQgBCgCACFVQQAhViBVIFY2AggLIAQoAgQhV0EBIVggVyBYaiFZIAQgWTYCBAwACwALIAQoAgwhWkEAIVsgWygCqP8HIVwgWiBcRiFdQQEhXiBdIF5xIV8CQAJAIF8NACAEKAIIIWBBACFhIGEoAqz/ByFiIGAgYkYhY0EBIWQgYyBkcSFlIGVFDQELQQAhZkEAIWcgZyBmNgKk/wdBACFoQQAhaSBpIGg2Aqj/B0EAIWpBACFrIGsgajYCrP8HC0EQIWwgBCBsaiFtIG0kAA8LnAIBIX8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDBAsIQQCQCAERQ0AQYD2BSEFQdLFBCEGQb0/IQdBzfgEIQggBSAGIAcgCBAAAAtBACEJIAkoArz/ByEKIAMoAgwhCyAKIAtHIQxBASENIAwgDXEhDgJAIA5FDQAgAygCDCEPQQAhECAQIA82Arz/ByADKAIMIREgERBCQQAhEiASLQCE9AchE0EBIRQgEyAUcSEVAkAgFUUNAEEAIRYgFigCyPQHIRdBASEYIBcgGGohGUEAIRogGiAZNgLI9AcLCxAsIRsCQCAbRQ0AQYD2BSEcQdLFBCEdQcM/IR5BzfgEIR8gHCAdIB4gHxAAAAtBECEgIAMgIGohISAhJAAPC7oBARd/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEQQAhBSAFKALg/QchBiAEIAZGIQdBASEIIAcgCHEhCQJAIAlFDQBBACEKQQAhCyALIAo2AuD9B0EAIQwgDBBKQQAhDSANLQCE9AchDkEBIQ8gDiAPcSEQAkAgEEUNAEEAIREgESgC1PQHIRJBASETIBIgE2ohFEEAIRUgFSAUNgLU9AcLC0EQIRYgAyAWaiEXIBckAA8LawENfyMAIQFBECECIAEgAmshAyADIAA2AgwgAygCDCEEQQAhBSAFKALA/wchBiAEIAZGIQdBASEIIAcgCHEhCQJAIAlFDQBBACEKQQAhCyALIAo2AsD/B0EAIQxBACENIA0gDDYCxP8HCw8LkwgBfn8jACECQSAhAyACIANrIQQgBCQAIAQgADYCHCAEIAE2AhggBCgCHCEFQQAhBiAFIAZHIQdBASEIIAcgCHEhCQJAAkAgCUUNACAEKAIYIQpBACELIAogC0chDEEBIQ0gDCANcSEOIA4NAQtBu8MFIQ9B0sUEIRBBusEAIRFBvLUEIRIgDyAQIBEgEhAAAAsQLCETAkAgE0UNAEGA9gUhFEHSxQQhFUG7wQAhFkG8tQQhFyAUIBUgFiAXEAAACyAEKAIYIRggGCgCHCEZQQAhGiAaIBlHIRsgBCgCHCEcQQEhHSAbIB1xIR4gHCAeOgA0IAQoAhwhHyAfKAIkISAgIBDWAiEhIAQgITYCFCAEKAIcISIgIigCKCEjICMQ1wIhJCAEICQ2AhBBACElIAQgJTYCDAJAA0AgBCgCDCEmIAQoAhwhJyAnKAIcISggJiAoSCEpQQEhKiApICpxISsgK0UNAUEAISwgBCAsNgIIIAQoAhwhLSAtLQA0IS5BASEvIC4gL3EhMAJAAkAgMEUNACAEKAIYITFBHCEyIDEgMmohMyAEKAIMITRBAiE1IDQgNXQhNiAzIDZqITcgNygCACE4AkAgOA0AQb/HBSE5QdLFBCE6QcLBACE7Qby1BCE8IDkgOiA7IDwQAAALIAQoAhghPUEcIT4gPSA+aiE/IAQoAgwhQEECIUEgQCBBdCFCID8gQmohQyBDKAIAIUQgBCBENgIIDAELQQEhRUEIIUYgBCBGaiFHIEchSCBFIEgQTSAEKAIIIUkCQCBJDQBBgNIEIUpB0sUEIUtBxsEAIUxBvLUEIU0gSiBLIEwgTRAAAAsgBCgCFCFOIE4Q2AIgBCgCFCFPIAQoAgghUCBPIFAQ2QIgBCgCFCFRIAQoAhwhUiBSKAIIIVMgBCgCECFUQQAhVSBRIFMgVSBUEE4gBCgCHCFWIFYoAighV0EBIVggVyBYRiFZQQEhWiBZIFpxIVsCQCBbRQ0AIAQoAhghXCBcKAIQIV1BACFeIF0gXkchX0EBIWAgXyBgcSFhAkAgYQ0AQbewBCFiQdLFBCFjQcvBACFkQby1BCFlIGIgYyBkIGUQAAALIAQoAhQhZiAEKAIcIWcgZygCCCFoIAQoAhghaSBpKAIQIWpBACFrIGYgayBoIGoQTwsgBCgCFCFsIGwQ2gILIAQoAgghbSAEKAIcIW5BLCFvIG4gb2ohcCAEKAIMIXFBAiFyIHEgcnQhcyBwIHNqIXQgdCBtNgIAIAQoAgwhdUEBIXYgdSB2aiF3IAQgdzYCDAwACwALECwheAJAIHhFDQBBgPYFIXlB0sUEIXpB0sEAIXtBvLUEIXwgeSB6IHsgfBAAAAtBAiF9QSAhfiAEIH5qIX8gfyQAIH0PC7kBARF/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgggAygCCCEEQX8hBSAEIAVqIQZBAiEHIAYgB0saAkACQAJAAkACQCAGDgMAAQIDC0GSkQIhCCADIAg2AgwMAwtBk5ECIQkgAyAJNgIMDAILQdKhAiEKIAMgCjYCDAwBC0H8/gUhC0HSxQQhDEHkNyENQcWOBCEOIAsgDCANIA4QAAALIAMoAgwhD0EQIRAgAyAQaiERIBEkACAPDwu5AQERfyMAIQFBECECIAEgAmshAyADJAAgAyAANgIIIAMoAgghBEF/IQUgBCAFaiEGQQIhByAGIAdLGgJAAkACQAJAAkAgBg4DAAECAwtB5JECIQggAyAINgIMDAMLQeiRAiEJIAMgCTYCDAwCC0HgkQIhCiADIAo2AgwMAQtB/P4FIQtB0sUEIQxB9zchDUGdjwUhDiALIAwgDSAOEAAACyADKAIMIQ9BECEQIAMgEGohESARJAAgDw8LogIBIX8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQRBkpECIQUgBCAFRiEGQQEhByAGIAdxIQgCQAJAIAhFDQBBACEJIAkoAoj9ByEKQQAhCyALIAo2AtT9BwwBCyADKAIMIQxBk5ECIQ0gDCANRiEOQQEhDyAOIA9xIRACQAJAIBBFDQBBACERIBEoAoz9ByESQQAhEyATIBI2Atj9BwwBCyADKAIMIRRB0qECIRUgFCAVRiEWQQEhFyAWIBdxIRgCQAJAIBhFDQBBACEZIBkoApD9ByEaQQAhGyAbIBo2Atz9BwwBC0H8/gUhHEHSxQQhHUH3PiEeQfXJBCEfIBwgHSAeIB8QAAALCwtBECEgIAMgIGohISAhJAAPC9oGAWh/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgwgBCABNgIIIAQoAgwhBUGSkQIhBiAGIAVGIQdBASEIIAcgCHEhCQJAIAkNACAEKAIMIQpBk5ECIQsgCyAKRiEMQQEhDSAMIA1xIQ4gDg0AIAQoAgwhD0HSoQIhECAQIA9GIRFBASESIBEgEnEhEyATDQBBhIkGIRRB0sUEIRVByT4hFkGXtgQhFyAUIBUgFiAXEAAACyAEKAIMIRhBkpECIRkgGCAZRiEaQQEhGyAaIBtxIRwCQAJAIBxFDQBBACEdIB0oAoj9ByEeIAQoAgghHyAeIB9HISBBASEhICAgIXEhIgJAICJFDQAgBCgCCCEjQQAhJCAkICM2Aoj9ByAEKAIMISUgBCgCCCEmICUgJhBAQQAhJyAnLQCE9AchKEEBISkgKCApcSEqAkAgKkUNAEEAISsgKygCxPQHISxBASEtICwgLWohLkEAIS8gLyAuNgLE9AcLCwwBCyAEKAIMITBBk5ECITEgMCAxRiEyQQEhMyAyIDNxITQCQAJAIDRFDQBBACE1IDUoAoz9ByE2IAQoAgghNyA2IDdHIThBASE5IDggOXEhOgJAIDpFDQAgBCgCCCE7QQAhPCA8IDs2Aoz9ByAEKAIMIT0gBCgCCCE+ID0gPhBAQQAhPyA/LQCE9AchQEEBIUEgQCBBcSFCAkAgQkUNAEEAIUMgQygCxPQHIURBASFFIEQgRWohRkEAIUcgRyBGNgLE9AcLCwwBCyAEKAIMIUhB0qECIUkgSCBJRiFKQQEhSyBKIEtxIUwCQAJAIExFDQBBACFNIE0oApD9ByFOIAQoAgghTyBOIE9HIVBBASFRIFAgUXEhUgJAIFJFDQAgBCgCCCFTQQAhVCBUIFM2ApD9B0EAIVUgVS0AsPAHIVZBASFXIFYgV3EhWAJAIFhFDQAgBCgCDCFZIAQoAgghWiBZIFoQQAtBACFbIFstAIT0ByFcQQEhXSBcIF1xIV4CQCBeRQ0AQQAhXyBfKALE9AchYEEBIWEgYCBhaiFiQQAhYyBjIGI2AsT0BwsLDAELQfz+BSFkQdLFBCFlQd8+IWZBl7YEIWcgZCBlIGYgZxAAAAsLC0EQIWggBCBoaiFpIGkkAA8LlwMBLX8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCDCADKAIMIQRBkpECIQUgBCAFRiEGQQEhByAGIAdxIQgCQAJAIAhFDQBBACEJIAkoAtT9ByEKAkAgCkUNACADKAIMIQtBACEMIAwoAtT9ByENIAsgDRDZAkEAIQ5BACEPIA8gDjYC1P0HCwwBCyADKAIMIRBBk5ECIREgECARRiESQQEhEyASIBNxIRQCQAJAIBRFDQBBACEVIBUoAtj9ByEWAkAgFkUNACADKAIMIRdBACEYIBgoAtj9ByEZIBcgGRDZAkEAIRpBACEbIBsgGjYC2P0HCwwBCyADKAIMIRxB0qECIR0gHCAdRiEeQQEhHyAeIB9xISACQAJAICBFDQBBACEhICEoAtz9ByEiAkAgIkUNACADKAIMISNBACEkICQoAtz9ByElICMgJRDZAkEAISZBACEnICcgJjYC3P0HCwwBC0H8/gUhKEHSxQQhKUGPPyEqQdHJBCErICggKSAqICsQAAALCwtBECEsIAMgLGohLSAtJAAPC7QJAZABfyMAIQRBICEFIAQgBWshBiAGJAAgBiAAOgAfIAYgATYCGCAGIAI2AhQgBiADNgIQIAYtAB8hB0EYIQggByAIdCEJIAkgCHUhCkEAIQsgCiALTiEMQQEhDSAMIA1xIQ4CQAJAIA5FDQAgBi0AHyEPQRghECAPIBB0IREgESAQdSESQRAhEyASIBNIIRRBASEVIBQgFXEhFiAWDQELQZXVBiEXQdLFBCEYQeI/IRlBwrIEIRogFyAYIBkgGhAAAAsgBi0AHyEbQRghHCAbIBx0IR0gHSAcdSEeQQAhHyAfKALQ8AchICAeICBOISFBASEiICEgInEhIwJAAkAgI0UNAAwBCxAsISQCQCAkRQ0AQYD2BSElQdLFBCEmQeY/ISdBwrIEISggJSAmICcgKBAAAAsgBi0AHyEpQRghKiApICp0ISsgKyAqdSEsQZDuByEtQaALIS4gLSAuaiEvQQghMCAvIDBqITFBrAQhMiAxIDJqITNBDCE0ICwgNGwhNSAzIDVqITYgBiA2NgIMIAYoAgwhNyA3KAIAITggBigCGCE5IDggOUchOkEBITsgOiA7cSE8AkAgPA0AIAYoAgwhPSA9KAIEIT4gBigCFCE/ID4gP0chQEEBIUEgQCBBcSFCIEINACAGKAIMIUMgQygCCCFEIAYoAhAhRSBEIEVHIUZBASFHIEYgR3EhSCBIRQ0BCyAGLQAfIUlBGCFKIEkgSnQhSyBLIEp1IUxBwIkCIU0gTCBNaiFOIE4Q0gIgBigCGCFPIAYoAgwhUCBQKAIAIVEgTyBRRyFSQQEhUyBSIFNxIVQCQCBURQ0AIAYoAgwhVSBVKAIAIVYgVkUNACAGKAIMIVcgVygCACFYQQAhWSBYIFkQQxAsIVoCQCBaRQ0AQYD2BSFbQdLFBCFcQe0/IV1BwrIEIV4gWyBcIF0gXhAAAAtBACFfIF8tAIT0ByFgQQEhYSBgIGFxIWICQCBiRQ0AQQAhYyBjKALM9AchZEEBIWUgZCBlaiFmQQAhZyBnIGY2Asz0BwsLIAYoAhghaAJAIGhFDQAgBigCGCFpIAYoAhQhaiBpIGoQQxAsIWsCQCBrRQ0AQYD2BSFsQdLFBCFtQfM/IW5BwrIEIW8gbCBtIG4gbxAAAAtBACFwIHAtAIT0ByFxQQEhciBxIHJxIXMCQCBzRQ0AQQAhdCB0KALM9AchdUEBIXYgdSB2aiF3QQAheCB4IHc2Asz0BwsLIAYtAB8heUEYIXogeSB6dCF7IHsgenUhfCAGKAIQIX0gfCB9EEQQLCF+AkAgfkUNAEGA9gUhf0HSxQQhgAFB+D8hgQFBwrIEIYIBIH8ggAEggQEgggEQAAALQQAhgwEggwEtAIT0ByGEAUEBIYUBIIQBIIUBcSGGAQJAIIYBRQ0AQQAhhwEghwEoAtD0ByGIAUEBIYkBIIgBIIkBaiGKAUEAIYsBIIsBIIoBNgLQ9AcLIAYoAhghjAEgBigCDCGNASCNASCMATYCACAGKAIUIY4BIAYoAgwhjwEgjwEgjgE2AgQgBigCECGQASAGKAIMIZEBIJEBIJABNgIIC0EgIZIBIAYgkgFqIZMBIJMBJAAPC5ACARZ/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgggAygCCCEEQX8hBSAEIAVqIQZBByEHIAYgB0saAkACQAJAAkACQAJAAkACQAJAAkAgBg4IAAECAwQFBgcIC0GABCEIIAMgCDYCDAwIC0GBBCEJIAMgCTYCDAwHC0GCBCEKIAMgCjYCDAwGC0GDBCELIAMgCzYCDAwFC0GEBCEMIAMgDDYCDAwEC0GFBCENIAMgDTYCDAwDC0GGBCEOIAMgDjYCDAwCC0GHBCEPIAMgDzYCDAwBC0H8/gUhEEHSxQQhEUHmOCESQYXEBSETIBAgESASIBMQAAALIAMoAgwhFEEQIRUgAyAVaiEWIBYkACAUDwsQAQF/QRAhASAAIAEQrwEPC/8CASd/IwAhA0EQIQQgAyAEayEFIAUkACAFIAA2AgggBSABNgIEIAUgAjYCACAFKAIAIQZBASEHIAYgB0YhCEEBIQkgCCAJcSEKAkACQCAKRQ0AQQEhCyAFIAs2AgwMAQsgBSgCBCEMQQAhDSAMIA1KIQ5BASEPIA4gD3EhEAJAIBANAEGF4gUhEUHSxQQhEkGcMSETQb+KBCEUIBEgEiATIBQQAAALIAUoAgQhFUEBIRYgFSAWRiEXQQEhGCAXIBhxIRkCQCAZRQ0AIAUoAgghGkF/IRsgGiAbaiEcQQghHSAcIB1LGgJAAkACQAJAAkAgHA4JAAECAgABAgIDBAtBBCEeIAUgHjYCDAwFC0EIIR8gBSAfNgIMDAQLQRAhICAFICA2AgwMAwtBECEhIAUgITYCDAwCC0H8/gUhIkHSxQQhI0GtMSEkQb+KBCElICIgIyAkICUQAAALQRAhJiAFICY2AgwLIAUoAgwhJ0EQISggBSAoaiEpICkkACAnDwvoBQFLfyMAIQNBECEEIAMgBGshBSAFJAAgBSAANgIIIAUgATYCBCAFIAI2AgAgBSgCBCEGQQAhByAGIAdKIQhBASEJIAggCXEhCgJAIAoNAEGF4gUhC0HSxQQhDEG3MSENQbrSBCEOIAsgDCANIA4QAAALIAUoAgQhD0EBIRAgDyAQRiERQQEhEiARIBJxIRMCQAJAIBNFDQAgBSgCCCEUQX8hFSAUIBVqIRZBCCEXIBYgF0saAkACQAJAAkACQAJAIBYOCQABAgMAAQIDBAULQQQhGCAFIBg2AgwMBgtBCCEZIAUgGTYCDAwFC0EMIRogBSAaNgIMDAQLQRAhGyAFIBs2AgwMAwtBwAAhHCAFIBw2AgwMAgtB/P4FIR1B0sUEIR5ByTEhH0G60gQhICAdIB4gHyAgEAAACyAFKAIAISFBASEiICEgIkYhI0EBISQgIyAkcSElAkAgJUUNACAFKAIIISZBfyEnICYgJ2ohKEEIISkgKCApSxoCQAJAAkACQAJAAkAgKA4JAAECAwABAgMEBQsgBSgCBCEqQQIhKyAqICt0ISwgBSAsNgIMDAYLIAUoAgQhLUEDIS4gLSAudCEvIAUgLzYCDAwFCyAFKAIEITBBDCExIDAgMWwhMiAFIDI2AgwMBAsgBSgCBCEzQQQhNCAzIDR0ITUgBSA1NgIMDAMLIAUoAgQhNkEGITcgNiA3dCE4IAUgODYCDAwCC0H8/gUhOUHSxQQhOkHeMSE7QbrSBCE8IDkgOiA7IDwQAAALIAUoAgghPUF/IT4gPSA+aiE/QQghQCA/IEBLGgJAAkACQCA/DgkAAAAAAAAAAAECCyAFKAIEIUFBBCFCIEEgQnQhQyAFIEM2AgwMAgsgBSgCBCFEQQYhRSBEIEV0IUYgBSBGNgIMDAELQfz+BSFHQdLFBCFIQe8xIUlButIEIUogRyBIIEkgShAAAAsgBSgCDCFLQRAhTCAFIExqIU0gTSQAIEsPC+oBAR5/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgwgBCABNgIIIAQoAgghBUEAIQYgBSAGSyEHQQEhCCAHIAhxIQkCQAJAIAlFDQAgBCgCCCEKIAQoAgghC0EBIQwgCyAMayENIAogDXEhDiAORQ0BC0Hp1AYhD0HSxQQhEEHpMCERQerbBSESIA8gECARIBIQAAALIAQoAgwhEyAEKAIIIRRBASEVIBQgFWshFiATIBZqIRcgBCgCCCEYQQEhGSAYIBlrIRpBfyEbIBogG3MhHCAXIBxxIR1BECEeIAQgHmohHyAfJAAgHQ8L/wUCUH8UfiMAIQNBICEEIAMgBGshBSAFJAAgBSABNgIcIAUgAjoAG0EIIQYgBSAGaiEHIAcQ3QIgBSgCHCEIQQIhCSAIIAlLGgJAAkACQAJAAkAgCA4DAAECAwsgBS0AGyEKQf8BIQsgCiALcSEMQYABIQ0gDCANSCEOQQEhDyAOIA9xIRACQCAQDQBBodkFIRFB0sUEIRJB+IEBIRNBg6AEIRQgESASIBMgFBAAAAsgBS0AGyEVQf8BIRYgFSAWcSEXQcAAIRggFyAYSCEZQQEhGiAZIBpxIRsCQAJAIBtFDQAgBS0AGyEcQf8BIR0gHCAdcSEeIB4hHyAfrSFTQgEhVCBUIFOGIVUgBSBVNwMIDAELIAUtABshIEH/ASEhICAgIXEhIkHAACEjICIgI2shJCAkISUgJa0hVkIBIVcgVyBWhiFYIAUgWDcDEAsMAwsgBS0AGyEmQf8BIScgJiAncSEoQcAAISkgKCApSCEqQQEhKyAqICtxISwCQCAsDQBB9NkFIS1B0sUEIS5BgIIBIS9Bg6AEITAgLSAuIC8gMBAAAAsgBS0AGyExQf8BITIgMSAycSEzIDMhNCA0rSFZQgEhWiBaIFmGIVsgBSBbNwMIDAILIAUtABshNUH/ASE2IDUgNnEhN0HAACE4IDcgOEghOUEBITogOSA6cSE7AkAgOw0AQfTZBSE8QdLFBCE9QYSCASE+QYOgBCE/IDwgPSA+ID8QAAALIAUtABshQEH/ASFBIEAgQXEhQiBCIUMgQ60hXEIBIV0gXSBchiFeIAUgXjcDEAwBC0H8/gUhREHSxQQhRUGIggEhRkGDoAQhRyBEIEUgRiBHEAAACyAAKQMAIV8gBSkDCCFgIF8gYIMhYUIAIWIgYSBiUSFIQQAhSUEBIUogSCBKcSFLIEkhTAJAIEtFDQAgACkDCCFjIAUpAxAhZCBjIGSDIWVCACFmIGUgZlEhTSBNIUwLIEwhTkEBIU8gTiBPcSFQQSAhUSAFIFFqIVIgUiQAIFAPC70FAkR/Fn4jACEEQRAhBSAEIAVrIQYgBiQAIAYgAjYCDCAGIAM6AAsgBigCDCEHQQIhCCAHIAhLGgJAAkACQAJAIAcOAwABAgMLIAYtAAshCUH/ASEKIAkgCnEhC0GAASEMIAsgDEghDUEBIQ4gDSAOcSEPAkAgDw0AQaHZBSEQQdLFBCERQeGBASESQY+LBCETIBAgESASIBMQAAALIAYtAAshFEH/ASEVIBQgFXEhFkHAACEXIBYgF0ghGEEBIRkgGCAZcSEaAkACQCAaRQ0AIAYtAAshG0H/ASEcIBsgHHEhHSAdIR4gHq0hSEIBIUkgSSBIhiFKIAEpAwAhSyBLIEqEIUwgASBMNwMADAELIAYtAAshH0H/ASEgIB8gIHEhIUHAACEiICEgImshIyAjISQgJK0hTUIBIU4gTiBNhiFPIAEpAwghUCBQIE+EIVEgASBRNwMICwwCCyAGLQALISVB/wEhJiAlICZxISdBwAAhKCAnIChIISlBASEqICkgKnEhKwJAICsNAEH02QUhLEHSxQQhLUHpgQEhLkGPiwQhLyAsIC0gLiAvEAAACyAGLQALITBB/wEhMSAwIDFxITIgMiEzIDOtIVJCASFTIFMgUoYhVCABKQMAIVUgVSBUhCFWIAEgVjcDAAwBCyAGLQALITRB/wEhNSA0IDVxITZBwAAhNyA2IDdIIThBASE5IDggOXEhOgJAIDoNAEH02QUhO0HSxQQhPEHtgQEhPUGPiwQhPiA7IDwgPSA+EAAACyAGLQALIT9B/wEhQCA/IEBxIUEgQSFCIEKtIVdCASFYIFggV4YhWSABKQMIIVogWiBZhCFbIAEgWzcDCAsgASkDACFcIAAgXDcDAEEIIUMgACBDaiFEIAEgQ2ohRSBFKQMAIV0gRCBdNwMAQRAhRiAGIEZqIUcgRyQADwvIHQGDA38jACECQfAAIQMgAiADayEEIAQkACAEIAA2AmggBCABNgJkIAQoAmghBUEAIQYgBSAGRyEHQQEhCCAHIAhxIQkCQAJAIAlFDQAgBCgCZCEKQQAhCyAKIAtHIQxBASENIAwgDXEhDiAODQELQc7DBSEPQdLFBCEQQbzDACERQeK5BCESIA8gECARIBIQAAALIAQoAmghEyATKAKMBSEUAkAgFEUNAEGfxwQhFUHSxQQhFkG9wwAhF0HiuQQhGCAVIBYgFyAYEAAACxAsIRkCQCAZRQ0AQYD2BSEaQdLFBCEbQb7DACEcQeK5BCEdIBogGyAcIB0QAAALQQAhHiAEIB42AmACQANAIAQoAmAhH0EQISAgHyAgSCEhQQEhIiAhICJxISMgI0UNASAEKAJoISRBjAUhJSAkICVqISZBBCEnICYgJ2ohKCAEKAJgISlBBSEqICkgKnQhKyAoICtqISwgBCgCZCEtQSwhLiAtIC5qIS8gBCgCYCEwQQwhMSAwIDFsITIgLyAyaiEzIDMoAgAhNCAsIDQQ5AIgBCgCYCE1QQEhNiA1IDZqITcgBCA3NgJgDAALAAsgBCgCZCE4IDgoAgQhOUEBITogOiA5EOUCITsgBCA7NgJcIAQoAmQhPCA8KAIYIT1BAiE+ID4gPRDlAiE/IAQgPzYCWCAEKAJcIUACQAJAAkAgQEUNACAEKAJYIUEgQQ0BC0EDIUIgBCBCNgJsDAELEFAhQyAEIEM2AlQgBCgCVCFEIAQoAlwhRSBEIEUQUSAEKAJUIUYgBCgCWCFHIEYgRxBRIAQoAlQhSCBIEFIgBCgCXCFJIEkQUyAEKAJYIUogShBTECwhSwJAIEtFDQBBgPYFIUxB0sUEIU1B0MMAIU5B4rkEIU8gTCBNIE4gTxAAAAsgBCgCVCFQQYKXAiFRQdAAIVIgBCBSaiFTIFMhVCBQIFEgVBBUIAQoAlAhVQJAIFUNAEEAIVYgBCBWNgJMIAQoAlQhV0GElwIhWEHMACFZIAQgWWohWiBaIVsgVyBYIFsQVCAEKAJMIVxBACFdIFwgXUohXkEBIV8gXiBfcSFgAkAgYEUNACAEKAJMIWEgYRC0AiFiIAQgYjYCSCAEKAJUIWMgBCgCTCFkIAQoAkghZUHMACFmIAQgZmohZyBnIWggYyBkIGggZRBVQQYhaUEBIWpBACFrQdrDACFsIGkgaiBrIGwQxgEgBCgCSCFtQQYhbkEDIW9B28MAIXAgbiBvIG0gcBDGASAEKAJIIXEgcRDDAQsgBCgCVCFyIHIQSUEDIXMgBCBzNgJsDAELIAQoAlQhdCAEKAJoIXUgdSB0NgKMBRAsIXYCQCB2RQ0AQYD2BSF3QdLFBCF4QeTDACF5QeK5BCF6IHcgeCB5IHoQAAALQQAheyAEIHs2AkQCQANAIAQoAkQhfEEIIX0gfCB9SSF+QQEhfyB+IH9xIYABIIABRQ0BIAQoAmQhgQFB7AEhggEggQEgggFqIYMBIAQoAkQhhAFB0AEhhQEghAEghQFsIYYBIIMBIIYBaiGHASAEIIcBNgJAIAQoAkAhiAEgiAEoAgAhiQECQAJAIIkBDQAMAQsgBCgCQCGKASCKASgCBCGLAUEAIYwBIIsBIIwBSyGNAUEBIY4BII0BII4BcSGPAQJAII8BDQBB4uUFIZABQdLFBCGRAUHqwwAhkgFB4rkEIZMBIJABIJEBIJIBIJMBEAAACyAEKAJoIZQBQYwFIZUBIJQBIJUBaiGWAUGEBCGXASCWASCXAWohmAEgBCgCRCGZAUHEASGaASCZASCaAWwhmwEgmAEgmwFqIZwBIAQgnAE2AjwgBCgCPCGdASCdASgCACGeAQJAIJ4BRQ0AQebwBSGfAUHSxQQhoAFB7MMAIaEBQeK5BCGiASCfASCgASChASCiARAAAAtBACGjASAEIKMBNgI4QQAhpAEgBCCkATYCNAJAA0AgBCgCNCGlAUEQIaYBIKUBIKYBSCGnAUEBIagBIKcBIKgBcSGpASCpAUUNASAEKAJAIaoBQRAhqwEgqgEgqwFqIawBIAQoAjQhrQFBDCGuASCtASCuAWwhrwEgrAEgrwFqIbABIAQgsAE2AjAgBCgCMCGxASCxASgCACGyAQJAILIBDQAMAgsgBCgCMCGzASCzASgCACG0ASAEKAIwIbUBILUBLwEEIbYBQf//AyG3ASC2ASC3AXEhuAEgBCgCQCG5ASC5ASgCDCG6ASC0ASC4ASC6ARDeAiG7ASAEILsBNgIsIAQoAjAhvAEgvAEoAgAhvQEgBCgCMCG+ASC+AS8BBCG/AUH//wMhwAEgvwEgwAFxIcEBIAQoAkAhwgEgwgEoAgwhwwEgvQEgwQEgwwEQ3wIhxAEgBCDEATYCKCAEKAI4IcUBIAQoAiwhxgEgxQEgxgEQ4AIhxwEgBCDHATYCOCAEKAI8IcgBQQQhyQEgyAEgyQFqIcoBIAQoAjQhywFBDCHMASDLASDMAWwhzQEgygEgzQFqIc4BIAQgzgE2AiQgBCgCMCHPASDPASgCACHQASAEKAIkIdEBINEBINABNgIEIAQoAjAh0gEg0gEvAQQh0wEgBCgCJCHUASDUASDTATsBCCAEKAI4IdUBIAQoAiQh1gEg1gEg1QE7AQogBCgCMCHXASDXASgCCCHYAUEAIdkBINgBINkBRyHaAUEBIdsBINoBINsBcSHcAQJAINwBDQBBhoIFId0BQdLFBCHeAUH6wwAh3wFB4rkEIeABIN0BIN4BIN8BIOABEAAACyAEKAJUIeEBIAQoAjAh4gEg4gEoAggh4wEg4QEg4wEQViHkASAEKAIkIeUBIOUBIOQBNgIAIAQoAigh5gEgBCgCOCHnASDnASDmAWoh6AEgBCDoATYCOCAEKAI8IekBIOkBKAIAIeoBQQEh6wEg6gEg6wFqIewBIOkBIOwBNgIAIAQoAjQh7QFBASHuASDtASDuAWoh7wEgBCDvATYCNAwACwALIAQoAkAh8AEg8AEoAgwh8QFBAiHyASDxASDyAUYh8wFBASH0ASDzASD0AXEh9QECQCD1AUUNACAEKAI4IfYBQRAh9wEg9gEg9wEQ4AIh+AEgBCD4ATYCOAsgBCgCQCH5ASD5ASgCBCH6ASAEKAI4IfsBIPoBIPsBRiH8AUEBIf0BIPwBIP0BcSH+AQJAIP4BDQBBmY4EIf8BQdLFBCGAAkGCxAAhgQJB4rkEIYICIP8BIIACIIECIIICEAAACwsgBCgCRCGDAkEBIYQCIIMCIIQCaiGFAiAEIIUCNgJEDAALAAtBACGGAiAEIIYCNgIgAkADQCAEKAIgIYcCQQghiAIghwIgiAJJIYkCQQEhigIgiQIgigJxIYsCIIsCRQ0BIAQoAmQhjAJB7A4hjQIgjAIgjQJqIY4CIAQoAiAhjwJBDCGQAiCPAiCQAmwhkQIgjgIgkQJqIZICIAQgkgI2AhwgBCgCHCGTAiCTAigCACGUAgJAAkAglAINAAwBCyAEKAIcIZUCIJUCLQAIIZYCQf8BIZcCIJYCIJcCcSGYAkEQIZkCIJgCIJkCSCGaAkEBIZsCIJoCIJsCcSGcAgJAIJwCDQBBqqUGIZ0CQdLFBCGeAkGMxAAhnwJB4rkEIaACIJ0CIJ4CIJ8CIKACEAAACyAEKAIcIaECIKECLQAIIaICIAQoAmghowJBjAUhpAIgowIgpAJqIaUCQaQQIaYCIKUCIKYCaiGnAiAEKAIgIagCIKcCIKgCaiGpAiCpAiCiAjoAAAsgBCgCICGqAkEBIasCIKoCIKsCaiGsAiAEIKwCNgIgDAALAAsQLCGtAgJAIK0CRQ0AQYD2BSGuAkHSxQQhrwJBkcQAIbACQeK5BCGxAiCuAiCvAiCwAiCxAhAAAAtBACGyAiAEILICNgIYQY2XAiGzAkEYIbQCIAQgtAJqIbUCILUCIbYCILMCILYCEA4gBCgCVCG3AiC3AhBKQQAhuAIgBCC4AjYCFEEAIbkCIAQguQI2AhACQANAIAQoAhAhugJBECG7AiC6AiC7AkkhvAJBASG9AiC8AiC9AnEhvgIgvgJFDQEgBCgCZCG/AkGMEyHAAiC/AiDAAmohwQIgBCgCECHCAkEMIcMCIMICIMMCbCHEAiDBAiDEAmohxQIgBCDFAjYCDCAEKAIMIcYCIMYCKAIAIccCAkACQCDHAg0ADAELIAQoAgwhyAIgyAIoAgghyQJBACHKAiDJAiDKAkchywJBASHMAiDLAiDMAnEhzQICQCDNAg0AQZiCBSHOAkHSxQQhzwJBm8QAIdACQeK5BCHRAiDOAiDPAiDQAiDRAhAAAAsgBCgCVCHSAiAEKAIMIdMCINMCKAIIIdQCINICINQCEFYh1QIgBCDVAjYCCCAEKAIIIdYCQX8h1wIg1gIg1wJHIdgCQQEh2QIg2AIg2QJxIdoCAkACQCDaAkUNACAEKAIIIdsCIAQoAhQh3AIg2wIg3AIQVyAEKAIUId0CQQEh3gIg3QIg3gJqId8CIAQg3wI2AhQgBCgCaCHgAkGMBSHhAiDgAiDhAmoh4gJBrBAh4wIg4gIg4wJqIeQCIAQoAhAh5QIg5AIg5QJqIeYCIOYCIN0COgAADAELIAQoAmgh5wJBjAUh6AIg5wIg6AJqIekCQawQIeoCIOkCIOoCaiHrAiAEKAIQIewCIOsCIOwCaiHtAkH/ASHuAiDtAiDuAjoAAEEIIe8CQQEh8AJBACHxAkGixAAh8gIg7wIg8AIg8QIg8gIQxgEgBCgCDCHzAiDzAigCCCH0AkEIIfUCQQMh9gJBo8QAIfcCIPUCIPYCIPQCIPcCEMYBCwsgBCgCECH4AkEBIfkCIPgCIPkCaiH6AiAEIPoCNgIQDAALAAsgBCgCGCH7AiD7AhBKECwh/AICQCD8AkUNAEGA9gUh/QJB0sUEIf4CQanEACH/AkHiuQQhgAMg/QIg/gIg/wIggAMQAAALQQIhgQMgBCCBAzYCbAsgBCgCbCGCA0HwACGDAyAEIIMDaiGEAyCEAyQAIIIDDwvlAQEafyMAIQJBECEDIAIgA2shBCAEJAAgBCAANgIMIAQgATYCCCAEKAIMIQVBACEGIAUgBkchB0EBIQggByAIcSEJAkAgCQ0AQZyGBCEKQdLFBCELQdQwIQxBzYAEIQ0gCiALIAwgDRAAAAsgBCgCCCEOQQAhDyAOIA9HIRBBASERIBAgEXEhEgJAAkAgEkUNACAEKAIMIRMgBCgCCCEUQSAhFSATIBQgFRD9AhogBCgCDCEWQQAhFyAWIBc6AB8MAQsgBCgCDCEYQSAhGSAYIBkQrwELQRAhGiAEIBpqIRsgGyQADwvkBAFIfyMAIQJBICEDIAIgA2shBCAEJAAgBCAANgIcIAQgATYCGCAEKAIYIQVBACEGIAUgBkchB0EBIQggByAIcSEJAkAgCQ0AQdrDBSEKQdLFBCELQaLDACEMQfe5BCENIAogCyAMIA0QAAALECwhDgJAIA5FDQBBgPYFIQ9B0sUEIRBBo8MAIRFB97kEIRIgDyAQIBEgEhAAAAsgBCgCHCETIBMQ5gIhFCAUEFghFSAEIBU2AhQgBCgCFCEWQQEhF0EYIRggBCAYaiEZIBkhGkEAIRsgFiAXIBogGxBZIAQoAhQhHCAcEFpBACEdIAQgHTYCECAEKAIUIR5BgZcCIR9BECEgIAQgIGohISAhISIgHiAfICIQWyAEKAIQISMCQCAjDQBBACEkIAQgJDYCDCAEKAIUISVBhJcCISZBDCEnIAQgJ2ohKCAoISkgJSAmICkQWyAEKAIMISpBACErICogK0ohLEEBIS0gLCAtcSEuAkAgLkUNACAEKAIMIS8gLxC0AiEwIAQgMDYCCCAEKAIUITEgBCgCDCEyIAQoAgghM0EMITQgBCA0aiE1IDUhNiAxIDIgNiAzEFxBBSE3QQEhOEEAITlBsMMAITogNyA4IDkgOhDGASAEKAIIITtBBSE8QQMhPUGxwwAhPiA8ID0gOyA+EMYBIAQoAgghPyA/EMMBCyAEKAIUIUAgQBBTQQAhQSAEIEE2AhQLECwhQgJAIEJFDQBBgPYFIUNB0sUEIURBt8MAIUVB97kEIUYgQyBEIEUgRhAAAAsgBCgCFCFHQSAhSCAEIEhqIUkgSSQAIEcPC6YBARB/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgggAygCCCEEQX8hBSAEIAVqIQZBASEHIAYgB0saAkACQAJAAkAgBg4CAAECC0GxlgIhCCADIAg2AgwMAgtBsJYCIQkgAyAJNgIMDAELQfz+BSEKQdLFBCELQf83IQxBtoMFIQ0gCiALIAwgDRAAAAsgAygCDCEOQRAhDyADIA9qIRAgECQAIA4PC7YbAu4Cfwt+IwAhA0HAACEEIAMgBGshBSAFJAAgBSAANgI8IAUgATYCOCAFIAI2AjQgBSgCPCEGQQAhByAGIAdHIQhBASEJIAggCXEhCgJAAkAgCkUNACAFKAI4IQtBACEMIAsgDEchDUEBIQ4gDSAOcSEPIA9FDQAgBSgCNCEQQQAhESAQIBFHIRJBASETIBIgE3EhFCAUDQELQcfDBSEVQdLFBCEWQbjEACEXQfD9BCEYIBUgFiAXIBgQAAALIAUoAjwhGSAZKAK4BCEaQQAhGyAaIBtGIRxBASEdIBwgHXEhHgJAAkAgHkUNACAFKAI8IR8gHygCGCEgICANAQtBy6sGISFB0sUEISJBucQAISNB8P0EISQgISAiICMgJBAAAAsgBSgCNCElICUoAgQhJiAFKAI4IScgJygCACEoICYgKEYhKUEBISogKSAqcSErAkAgKw0AQamfBSEsQdLFBCEtQbrEACEuQfD9BCEvICwgLSAuIC8QAAALIAUoAjghMCAwKAKMBSExAkAgMQ0AQaDHBCEyQdLFBCEzQbvEACE0QfD9BCE1IDIgMyA0IDUQAAALQQAhNiA2KALI8AchN0EQITggNyA4TCE5QQEhOiA5IDpxITsCQCA7DQBB2coFITxB0sUEIT1BvMQAIT5B8P0EIT8gPCA9ID4gPxAAAAsgBSgCOCFAIAUoAjwhQSBBIEA2ArgEIAUoAjQhQiBCKAL8AyFDIAUoAjwhRCBEIEM2AvwGIAUoAjwhRUG8BCFGIEUgRmohR0GAAiFIIEcgSGohSSAFKAI0IUpBqAIhSyBKIEtqIUwgTCkCACHxAiBJIPECNwIAQRAhTSBJIE1qIU4gTCBNaiFPIE8pAgAh8gIgTiDyAjcCAEEIIVAgSSBQaiFRIEwgUGohUiBSKQIAIfMCIFEg8wI3AgAgBSgCPCFTQbwEIVQgUyBUaiFVQZgCIVYgVSBWaiFXIAUoAjQhWEHAAiFZIFggWWohWiBaKQIAIfQCIFcg9AI3AgBBICFbIFcgW2ohXCBaIFtqIV0gXSkCACH1AiBcIPUCNwIAQRghXiBXIF5qIV8gWiBeaiFgIGApAgAh9gIgXyD2AjcCAEEQIWEgVyBhaiFiIFogYWohYyBjKQIAIfcCIGIg9wI3AgBBCCFkIFcgZGohZSBaIGRqIWYgZikCACH4AiBlIPgCNwIAIAUoAjwhZ0G8BCFoIGcgaGohaUHEAiFqIGkgamohayAFKAI0IWxB7AIhbSBsIG1qIW5BCCFvIG4gb2ohcCBwKQIAIfkCIGsg+QI3AgBBGCFxIGsgcWohciBwIHFqIXMgcygCACF0IHIgdDYCAEEQIXUgayB1aiF2IHAgdWohdyB3KQIAIfoCIHYg+gI3AgBBCCF4IGsgeGoheSBwIHhqIXogeikCACH7AiB5IPsCNwIAQQAheyAFIHs2AjACQANAIAUoAjAhfEEEIX0gfCB9SCF+QQEhfyB+IH9xIYABIIABRQ0BIAUoAjQhgQFB7AIhggEggQEgggFqIYMBIAUoAjAhhAFBJCGFASCEASCFAWwhhgEggwEghgFqIYcBIIcBKAIEIYgBIAUoAjwhiQFBvAQhigEgiQEgigFqIYsBQeACIYwBIIsBIIwBaiGNASAFKAIwIY4BQQIhjwEgjgEgjwF0IZABII0BIJABaiGRASCRASCIATYCACAFKAIwIZIBQQEhkwEgkgEgkwFqIZQBIAUglAE2AjAMAAsACyAFKAI0IZUBIJUBKAKEBCGWASAFKAI8IZcBIJcBIJYBNgKsByAFKAI0IZgBIJgBKAKIBCGZASAFKAI8IZoBIJoBIJkBNgKwByAFKAI0IZsBIJsBKAKMBCGcASAFKAI8IZ0BIJ0BIJwBNgK0ByAFKAI0IZ4BIJ4BLQCgBCGfASAFKAI8IaABQQEhoQEgnwEgoQFxIaIBIKABIKIBOgC4B0EAIaMBIAUgowE2AiwCQANAIAUoAiwhpAFBCCGlASCkASClAUghpgFBASGnASCmASCnAXEhqAEgqAFFDQEgBSgCPCGpAUEIIaoBIKkBIKoBaiGrASAFKAIsIawBIKsBIKwBaiGtAUEAIa4BIK0BIK4BOgAAIAUoAiwhrwFBASGwASCvASCwAWohsQEgBSCxATYCLAwACwALQQAhsgEgBSCyATYCKAJAA0AgBSgCKCGzAUEQIbQBILMBILQBSCG1AUEBIbYBILUBILYBcSG3ASC3AUUNASAFKAI8IbgBQbwEIbkBILgBILkBaiG6ASAFKAIoIbsBQQQhvAEguwEgvAF0Ib0BILoBIL0BaiG+AUH/ASG/ASC+ASC/AToAACAFKAIoIcABQQEhwQEgwAEgwQFqIcIBIAUgwgE2AigMAAsAC0EAIcMBIAUgwwE2AiQCQANAIAUoAiQhxAFBACHFASDFASgCyPAHIcYBIMQBIMYBSCHHAUEBIcgBIMcBIMgBcSHJASDJAUUNASAFKAI0IcoBQQghywEgygEgywFqIcwBQeAAIc0BIMwBIM0BaiHOASAFKAIkIc8BQQwh0AEgzwEg0AFsIdEBIM4BINEBaiHSASAFINIBNgIgIAUoAiAh0wEg0wEoAggh1AECQCDUAQ0ADAILIAUoAiAh1QEg1QEoAgAh1gFBCCHXASDWASDXAUgh2AFBASHZASDYASDZAXEh2gECQCDaAQ0AQcfJBSHbAUHSxQQh3AFB28QAId0BQfD9BCHeASDbASDcASDdASDeARAAAAsgBSgCNCHfAUEIIeABIN8BIOABaiHhASAFKAIgIeIBIOIBKAIAIeMBQQwh5AEg4wEg5AFsIeUBIOEBIOUBaiHmASAFIOYBNgIcIAUoAhwh5wEg5wEoAgQh6AEgBSDoATYCGCAFKAIcIekBIOkBKAIIIeoBIAUg6gE2AhQgBSgCJCHrASAFIOsBNgIQIAUoAjgh7AFBjAUh7QEg7AEg7QFqIe4BQQQh7wEg7gEg7wFqIfABIAUoAiQh8QFBBSHyASDxASDyAXQh8wEg8AEg8wFqIfQBIPQBEOgCIfUBQQEh9gEg9QEg9gFxIfcBAkAg9wENACAFKAI8IfgBIPgBKAK4BCH5ASD5ASgCjAUh+gEgBSgCOCH7AUGMBSH8ASD7ASD8AWoh/QFBBCH+ASD9ASD+AWoh/wEgBSgCJCGAAkEFIYECIIACIIECdCGCAiD/ASCCAmohgwIggwIQ6QIhhAIg+gEghAIQXSGFAiAFIIUCNgIQCyAFKAIQIYYCQX8hhwIghgIghwJHIYgCQQEhiQIgiAIgiQJxIYoCAkACQCCKAkUNACAFKAIQIYsCQQAhjAIgjAIoAsjwByGNAiCLAiCNAkghjgJBASGPAiCOAiCPAnEhkAICQCCQAg0AQeygBCGRAkHSxQQhkgJB5MQAIZMCQfD9BCGUAiCRAiCSAiCTAiCUAhAAAAsgBSgCPCGVAkG8BCGWAiCVAiCWAmohlwIgBSgCECGYAkEEIZkCIJgCIJkCdCGaAiCXAiCaAmohmwIgBSCbAjYCDCAFKAIMIZwCIJwCLQAAIZ0CQRghngIgnQIgngJ0IZ8CIJ8CIJ4CdSGgAkF/IaECIKACIKECRiGiAkEBIaMCIKICIKMCcSGkAgJAIKQCDQBB5dwFIaUCQdLFBCGmAkHmxAAhpwJB8P0EIagCIKUCIKYCIKcCIKgCEAAACyAFKAIgIakCIKkCKAIAIaoCIAUoAgwhqwIgqwIgqgI6AAAgBSgCGCGsAkEBIa0CIKwCIK0CRiGuAkEBIa8CIK4CIK8CcSGwAgJAAkAgsAJFDQAgBSgCDCGxAkEAIbICILECILICOgABDAELIAUoAhQhswIgBSgCDCG0AiC0AiCzAjoAASAFKAI8IbUCQQEhtgIgtQIgtgI6ABALIAUoAhwhtwIgtwIoAgAhuAJBACG5AiC4AiC5AkohugJBASG7AiC6AiC7AnEhvAICQCC8Ag0AQYrmBSG9AkHSxQQhvgJB7sQAIb8CQfD9BCHAAiC9AiC+AiC/AiDAAhAAAAsgBSgCHCHBAiDBAigCACHCAiAFKAIMIcMCIMMCIMICOgACIAUoAiAhxAIgxAIoAgQhxQIgBSgCDCHGAiDGAiDFAjYCCCAFKAIgIccCIMcCKAIIIcgCIMgCEOoCIckCIAUoAgwhygIgygIgyQI6AAMgBSgCICHLAiDLAigCCCHMAiDMAhDrAiHNAiAFKAIMIc4CIM4CIM0CNgIMIAUoAiAhzwIgzwIoAggh0AIg0AIQ7AIh0QIgBSgCDCHSAiDSAiDRAjoABCAFKAI8IdMCQQgh1AIg0wIg1AJqIdUCIAUoAiAh1gIg1gIoAgAh1wIg1QIg1wJqIdgCQQEh2QIg2AIg2QI6AAAMAQtBByHaAkECIdsCQQAh3AJB9sQAId0CINoCINsCINwCIN0CEMYBIAUoAjgh3gJBjAUh3wIg3gIg3wJqIeACQQQh4QIg4AIg4QJqIeICIAUoAiQh4wJBBSHkAiDjAiDkAnQh5QIg4gIg5QJqIeYCIOYCEOkCIecCQQch6AJBAyHpAkH3xAAh6gIg6AIg6QIg5wIg6gIQxgELIAUoAiQh6wJBASHsAiDrAiDsAmoh7QIgBSDtAjYCJAwACwALQQIh7gJBwAAh7wIgBSDvAmoh8AIg8AIkACDuAg8LUwEMfyMAIQFBECECIAEgAmshAyADIAA2AgwgAygCDCEEIAQtAAAhBUEYIQYgBSAGdCEHIAcgBnUhCEEAIQkgCSAIRiEKQQEhCyAKIAtxIQwgDA8LJAEEfyMAIQFBECECIAEgAmshAyADIAA2AgwgAygCDCEEIAQPC6EDAR9/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgggAygCCCEEQX8hBSAEIAVqIQZBECEHIAYgB0saAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgBg4RAAECAwQFBgcICQoLDA0ODxARC0EBIQggAyAINgIMDBELQQIhCSADIAk2AgwMEAtBAyEKIAMgCjYCDAwPC0EEIQsgAyALNgIMDA4LQQQhDCADIAw2AgwMDQtBBCENIAMgDTYCDAwMC0EEIQ4gAyAONgIMDAsLQQQhDyADIA82AgwMCgtBAiEQIAMgEDYCDAwJC0ECIREgAyARNgIMDAgLQQIhEiADIBI2AgwMBwtBBCETIAMgEzYCDAwGC0EEIRQgAyAUNgIMDAULQQQhFSADIBU2AgwMBAtBBCEWIAMgFjYCDAwDC0ECIRcgAyAXNgIMDAILQQQhGCADIBg2AgwMAQtB/P4FIRlB0sUEIRpBljghG0Gh0gQhHCAZIBogGyAcEAAACyADKAIMIR1BECEeIAMgHmohHyAfJAAgHQ8LiQIBFX8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCCCADKAIIIQRBfyEFIAQgBWohBkEQIQcgBiAHSxoCQAJAAkACQAJAAkACQAJAAkAgBg4RAAAAAAEBAgIDAwQDAwQFBgYHC0GGKCEIIAMgCDYCDAwHC0GAKCEJIAMgCTYCDAwGC0GBKCEKIAMgCjYCDAwFC0GCKCELIAMgCzYCDAwEC0GDKCEMIAMgDDYCDAwDC0HohgIhDSADIA02AgwMAgtBiyghDiADIA42AgwMAQtB/P4FIQ9B0sUEIRBBtTghEUHZ+gQhEiAPIBAgESASEAAACyADKAIMIRNBECEUIAMgFGohFSAVJAAgEw8LqgEBFX8jACEBQRAhAiABIAJrIQMgAyAANgIIIAMoAgghBEEGIQUgBCAFRiEGAkACQAJAIAYNAEEIIQcgBCAHRiEIIAgNAEF2IQkgBCAJaiEKQQIhCyAKIAtJIQwgDA0AQXMhDSAEIA1qIQ5BAiEPIA4gD0shECAQDQELQQEhESADIBE6AA8MAQtBACESIAMgEjoADwsgAy0ADyETQf8BIRQgEyAUcSEVIBUPC4MCASJ/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgwgBCABNgIIIAQoAgwhBUEAIQYgBSAGRyEHQQEhCCAHIAhxIQkCQAJAIAlFDQAgBCgCCCEKQQAhCyAKIAtOIQxBASENIAwgDXEhDiAORQ0AIAQoAgghD0EEIRAgDyAQSCERQQEhEiARIBJxIRMgEw0BC0H8pgYhFEHSxQQhFUHDxgAhFkHGjwUhFyAUIBUgFiAXEAAACyAEKAIMIRhBgAEhGSAYIBlqIRpBBCEbIBogG2ohHCAEKAIIIR1BAiEeIB0gHnQhHyAcIB9qISAgICgCACEhQRAhIiAEICJqISMgIyQAICEPC4MCASJ/IwAhAkEQIQMgAiADayEEIAQkACAEIAA2AgwgBCABNgIIIAQoAgwhBUEAIQYgBSAGRyEHQQEhCCAHIAhxIQkCQAJAIAlFDQAgBCgCCCEKQQAhCyAKIAtOIQxBASENIAwgDXEhDiAORQ0AIAQoAgghD0EEIRAgDyAQSCERQQEhEiARIBJxIRMgEw0BC0H8pgYhFEHSxQQhFUHIxgAhFkHljwUhFyAUIBUgFiAXEAAACyAEKAIMIRhBgAEhGSAYIBlqIRpBFCEbIBogG2ohHCAEKAIIIR1BAiEeIB0gHnQhHyAcIB9qISAgICgCACEhQRAhIiAEICJqISMgIyQAICEPC4YBARB/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgwgAygCDCEEQQAhBSAEIAVHIQZBASEHIAYgB3EhCAJAIAgNAEHTmQQhCUHSxQQhCkHNxgAhC0GqjwUhDCAJIAogCyAMEAAACyADKAIMIQ0gDSgCpAEhDkEQIQ8gAyAPaiEQIBAkACAODwvVAQETfyMAIQFBECECIAEgAmshAyADJAAgAyAANgIIIAMoAgghBEF/IQUgBCAFaiEGQQQhByAGIAdLGgJAAkACQAJAAkACQAJAIAYOBQABAgMEBQtBACEIIAMgCDYCDAwFC0EBIQkgAyAJNgIMDAQLQQMhCiADIAo2AgwMAwtBBCELIAMgCzYCDAwCC0EFIQwgAyAMNgIMDAELQfz+BSENQdLFBCEOQc84IQ9B8voEIRAgDSAOIA8gEBAAAAsgAygCDCERQRAhEiADIBJqIRMgEyQAIBEPC7UBARF/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgggAygCCCEEQX8hBSAEIAVqIQZBAiEHIAYgB0saAkACQAJAAkACQCAGDgMAAQIDC0EAIQggAyAINgIMDAMLQYMoIQkgAyAJNgIMDAILQYUoIQogAyAKNgIMDAELQfz+BSELQdLFBCEMQdg4IQ1Bx/oEIQ4gCyAMIA0gDhAAAAsgAygCDCEPQRAhECADIBBqIREgESQAIA8PC5ECARZ/IwAhAUEQIQIgASACayEDIAMkACADIAA2AgggAygCCCEEQX8hBSAEIAVqIQZBByEHIAYgB0saAkACQAJAAkACQAJAAkACQAJAAkAgBg4IAAECAwQFBgcIC0GAPCEIIAMgCDYCDAwIC0EAIQkgAyAJNgIMDAcLQYE8IQogAyAKNgIMDAYLQYI8IQsgAyALNgIMDAULQYM8IQwgAyAMNgIMDAQLQYoqIQ0gAyANNgIMDAMLQYeKAiEOIAMgDjYCDAwCC0GIigIhDyADIA82AgwMAQtB/P4FIRBB0sUEIRFB9DghEkGMvAQhEyAQIBEgEiATEAAACyADKAIMIRRBECEVIAMgFWohFiAWJAAgFA8LkAMBHX8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCCCADKAIIIQRBfyEFIAQgBWohBkEOIQcgBiAHSxoCQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAYODwABAgMEBQYHCAkKCwwNDg8LQQAhCCADIAg2AgwMDwtBASEJIAMgCTYCDAwOC0GABiEKIAMgCjYCDAwNC0GBBiELIAMgCzYCDAwMC0GCBiEMIAMgDDYCDAwLC0GDBiENIAMgDTYCDAwKC0GGBiEOIAMgDjYCDAwJC0GHBiEPIAMgDzYCDAwIC0GEBiEQIAMgEDYCDAwHC0GFBiERIAMgETYCDAwGC0GIBiESIAMgEjYCDAwFC0GBgAIhEyADIBM2AgwMBAtBgoACIRQgAyAUNgIMDAMLQYOAAiEVIAMgFTYCDAwCC0GEgAIhFiADIBY2AgwMAQtB/P4FIRdB0sUEIRhBiTkhGUGTsQQhGiAXIBggGSAaEAAACyADKAIMIRtBECEcIAMgHGohHSAdJAAgGw8LuQEBEX8jACEBQRAhAiABIAJrIQMgAyQAIAMgADYCCCADKAIIIQRBfyEFIAQgBWohBkECIQcgBiAHSxoCQAJAAkACQAJAIAYOAwABAgMLQYaAAiEIIAMgCDYCDAwDC0GKgAIhCSADIAk2AgwMAgtBi4ACIQogAyAKNgIMDAELQfz+BSELQdLFBCEMQZI5IQ1BnrwEIQ4gCyAMIA0gDhAAAAsgAygCDCEPQRAhECADIBBqIREgESQAIA8PC/oDAUR/IwAhAkEQIQMgAiADayEEIAQkACAEIAA6AA8gBCABNgIIIAQtAA8hBUH/ASEGIAUgBnEhB0EQIQggByAISCEJQQEhCiAJIApxIQsCQCALDQBBtaUGIQxB0sUEIQ1B5D4hDkHgtQQhDyAMIA0gDiAPEAAACyAELQAPIRBB/wEhESAQIBFxIRJBkO4HIRNBoAshFCATIBRqIRVBCCEWIBUgFmohF0HcAyEYIBcgGGohGUECIRogEiAadCEbIBkgG2ohHCAcKAIAIR0gBCgCCCEeIB0gHkchH0EBISAgHyAgcSEhAkAgIUUNACAEKAIIISIgBC0ADyEjQf8BISQgIyAkcSElQZDuByEmQaALIScgJiAnaiEoQQghKSAoIClqISpB3AMhKyAqICtqISxBAiEtICUgLXQhLiAsIC5qIS8gLyAiNgIAIAQoAgghMEEAITEgMSAwNgKQ/QdBACEyIDItALDwByEzQQEhNCAzIDRxITUCQCA1RQ0AIAQtAA8hNkH/ASE3IDYgN3EhOCAEKAIIITlB0qECITogOiA4IDkQQQtBACE7IDstAIT0ByE8QQEhPSA8ID1xIT4CQCA+RQ0AQQAhPyA/KALE9AchQEEBIUEgQCBBaiFCQQAhQyBDIEI2AsT0BwsLQRAhRCAEIERqIUUgRSQADwsFABBwAAuQBAEDfwJAIAJBgARJDQAgACABIAIQcSAADwsgACACaiEDAkACQCABIABzQQNxDQACQAJAIABBA3ENACAAIQIMAQsCQCACDQAgACECDAELIAAhAgNAIAIgAS0AADoAACABQQFqIQEgAkEBaiICQQNxRQ0BIAIgA0kNAAsLIANBfHEhBAJAIANBwABJDQAgAiAEQUBqIgVLDQADQCACIAEoAgA2AgAgAiABKAIENgIEIAIgASgCCDYCCCACIAEoAgw2AgwgAiABKAIQNgIQIAIgASgCFDYCFCACIAEoAhg2AhggAiABKAIcNgIcIAIgASgCIDYCICACIAEoAiQ2AiQgAiABKAIoNgIoIAIgASgCLDYCLCACIAEoAjA2AjAgAiABKAI0NgI0IAIgASgCODYCOCACIAEoAjw2AjwgAUHAAGohASACQcAAaiICIAVNDQALCyACIARPDQEDQCACIAEoAgA2AgAgAUEEaiEBIAJBBGoiAiAESQ0ADAILAAsCQCADQQRPDQAgACECDAELAkAgACADQXxqIgRNDQAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCwJAIAIgA08NAANAIAIgAS0AADoAACABQQFqIQEgAkEBaiICIANHDQALCyAAC/ICAgN/AX4CQCACRQ0AIAAgAToAACAAIAJqIgNBf2ogAToAACACQQNJDQAgACABOgACIAAgAToAASADQX1qIAE6AAAgA0F+aiABOgAAIAJBB0kNACAAIAE6AAMgA0F8aiABOgAAIAJBCUkNACAAQQAgAGtBA3EiBGoiAyABQf8BcUGBgoQIbCIBNgIAIAMgAiAEa0F8cSIEaiICQXxqIAE2AgAgBEEJSQ0AIAMgATYCCCADIAE2AgQgAkF4aiABNgIAIAJBdGogATYCACAEQRlJDQAgAyABNgIYIAMgATYCFCADIAE2AhAgAyABNgIMIAJBcGogATYCACACQWxqIAE2AgAgAkFoaiABNgIAIAJBZGogATYCACAEIANBBHFBGHIiBWsiAkEgSQ0AIAGtQoGAgIAQfiEGIAMgBWohAQNAIAEgBjcDGCABIAY3AxAgASAGNwMIIAEgBjcDACABQSBqIQEgAkFgaiICQR9LDQALCyAAC5ABAgJ/AX0CQCAAvCIBQRd2Qf8BcSICQZUBSw0AAkAgAkH9AEsNACAAQwAAAACUDwsCQAJAIACLIgBDAAAAS5JDAAAAy5IgAJMiA0MAAAA/XkUNACAAIAOSQwAAgL+SIQAMAQsgACADkiEAIANDAAAAv19FDQAgAEMAAIA/kiEACyAAjCAAIAFBAEgbIQALIAALWQECfyABLQAAIQICQCAALQAAIgNFDQAgAyACQf8BcUcNAANAIAEtAAEhAiAALQABIgNFDQEgAUEBaiEBIABBAWohACADIAJB/wFxRg0ACwsgAyACQf8BcWsLiAEBA38gACEBAkACQCAAQQNxRQ0AAkAgAC0AAA0AIAAgAGsPCyAAIQEDQCABQQFqIgFBA3FFDQEgAS0AAA0ADAILAAsDQCABIgJBBGohAUGAgoQIIAIoAgAiA2sgA3JBgIGChHhxQYCBgoR4Rg0ACwNAIAIiAUEBaiECIAEtAAANAAsLIAEgAGsLgQIBAX8CQAJAAkACQCABIABzQQNxDQAgAkEARyEDAkAgAUEDcUUNACACRQ0AA0AgACABLQAAIgM6AAAgA0UNBSAAQQFqIQAgAkF/aiICQQBHIQMgAUEBaiIBQQNxRQ0BIAINAAsLIANFDQIgAS0AAEUNAyACQQRJDQADQEGAgoQIIAEoAgAiA2sgA3JBgIGChHhxQYCBgoR4Rw0CIAAgAzYCACAAQQRqIQAgAUEEaiEBIAJBfGoiAkEDSw0ACwsgAkUNAQsDQCAAIAEtAAAiAzoAACADRQ0CIABBAWohACABQQFqIQEgAkF/aiICDQALC0EAIQILIABBACACEPgCGiAACw4AIAAgASACEPwCGiAAC/kBAQN/AkACQAJAAkAgAUH/AXEiAkUNAAJAIABBA3FFDQAgAUH/AXEhAwNAIAAtAAAiBEUNBSAEIANGDQUgAEEBaiIAQQNxDQALC0GAgoQIIAAoAgAiA2sgA3JBgIGChHhxQYCBgoR4Rw0BIAJBgYKECGwhAgNAQYCChAggAyACcyIEayAEckGAgYKEeHFBgIGChHhHDQIgACgCBCEDIABBBGoiBCEAIANBgIKECCADa3JBgIGChHhxQYCBgoR4Rg0ADAMLAAsgACAAEPsCag8LIAAhBAsDQCAEIgAtAAAiA0UNASAAQQFqIQQgAyABQf8BcUcNAAsLIAALGgAgACABEP4CIgBBACAALQAAIAFB/wFxRhsLhwEBAn8CQAJAAkAgAkEESQ0AIAEgAHJBA3ENAQNAIAAoAgAgASgCAEcNAiABQQRqIQEgAEEEaiEAIAJBfGoiAkEDSw0ACwsgAkUNAQsCQANAIAAtAAAiAyABLQAAIgRHDQEgAUEBaiEBIABBAWohACACQX9qIgJFDQIMAAsACyADIARrDwtBAAvpAQECfyACQQBHIQMCQAJAAkAgAEEDcUUNACACRQ0AIAFB/wFxIQQDQCAALQAAIARGDQIgAkF/aiICQQBHIQMgAEEBaiIAQQNxRQ0BIAINAAsLIANFDQECQCAALQAAIAFB/wFxRg0AIAJBBEkNACABQf8BcUGBgoQIbCEEA0BBgIKECCAAKAIAIARzIgNrIANyQYCBgoR4cUGAgYKEeEcNAiAAQQRqIQAgAkF8aiICQQNLDQALCyACRQ0BCyABQf8BcSEDA0ACQCAALQAAIANHDQAgAA8LIABBAWohACACQX9qIgINAAsLQQALjAEBAn8CQCABLAAAIgINACAADwtBACEDAkAgACACEP8CIgBFDQACQCABLQABDQAgAA8LIAAtAAFFDQACQCABLQACDQAgACABEIMDDwsgAC0AAkUNAAJAIAEtAAMNACAAIAEQhAMPCyAALQADRQ0AAkAgAS0ABA0AIAAgARCFAw8LIAAgARCGAyEDCyADC3cBBH8gAC0AASICQQBHIQMCQCACRQ0AIAAtAABBCHQgAnIiBCABLQAAQQh0IAEtAAFyIgVGDQAgAEEBaiEBA0AgASIALQABIgJBAEchAyACRQ0BIABBAWohASAEQQh0QYD+A3EgAnIiBCAFRw0ACwsgAEEAIAMbC5kBAQR/IABBAmohAiAALQACIgNBAEchBAJAAkAgA0UNACAALQABQRB0IAAtAABBGHRyIANBCHRyIgMgAS0AAUEQdCABLQAAQRh0ciABLQACQQh0ciIFRg0AA0AgAkEBaiEBIAItAAEiAEEARyEEIABFDQIgASECIAMgAHJBCHQiAyAFRw0ADAILAAsgAiEBCyABQX5qQQAgBBsLqwEBBH8gAEEDaiECIAAtAAMiA0EARyEEAkACQCADRQ0AIAAtAAFBEHQgAC0AAEEYdHIgAC0AAkEIdHIgA3IiBSABKAAAIgBBGHQgAEGA/gNxQQh0ciAAQQh2QYD+A3EgAEEYdnJyIgFGDQADQCACQQFqIQMgAi0AASIAQQBHIQQgAEUNAiADIQIgBUEIdCAAciIFIAFHDQAMAgsACyACIQMLIANBfWpBACAEGwuFBwENfyMAQaAIayICJAAgAkGYCGpCADcDACACQZAIakIANwMAIAJCADcDiAggAkIANwOACEEAIQMCQAJAAkACQAJAAkAgAS0AACIEDQBBfyEFQQEhBgwBCwNAIAAgA2otAABFDQIgAiAEQf8BcUECdGogA0EBaiIDNgIAIAJBgAhqIARBA3ZBHHFqIgYgBigCAEEBIAR0cjYCACABIANqLQAAIgQNAAtBASEGQX8hBSADQQFLDQILQX8hB0EBIQgMAgtBACEJDAILQQAhCUEBIQpBASEEA0ACQAJAIAEgBWogBGotAAAiByABIAZqLQAAIghHDQACQCAEIApHDQAgCiAJaiEJQQEhBAwCCyAEQQFqIQQMAQsCQCAHIAhNDQAgBiAFayEKQQEhBCAGIQkMAQtBASEEIAkhBSAJQQFqIQlBASEKCyAEIAlqIgYgA0kNAAtBfyEHQQAhBkEBIQlBASEIQQEhBANAAkACQCABIAdqIARqLQAAIgsgASAJai0AACIMRw0AAkAgBCAIRw0AIAggBmohBkEBIQQMAgsgBEEBaiEEDAELAkAgCyAMTw0AIAkgB2shCEEBIQQgCSEGDAELQQEhBCAGIQcgBkEBaiEGQQEhCAsgBCAGaiIJIANJDQALIAohBgsCQAJAIAEgASAIIAYgB0EBaiAFQQFqSyIEGyINaiAHIAUgBBsiCkEBaiIIEIADRQ0AIAogAyAKQX9zaiIEIAogBEsbQQFqIQ1BACEODAELIAMgDWshDgsgA0F/aiEMIANBP3IhC0EAIQcgACEGA0ACQCAAIAZrIANPDQBBACEJIABBACALEIEDIgQgACALaiAEGyEAIARFDQAgBCAGayADSQ0CCwJAAkACQCACQYAIaiAGIAxqLQAAIgRBA3ZBHHFqKAIAIAR2QQFxDQAgAyEEDAELAkAgAyACIARBAnRqKAIAIgRGDQAgAyAEayIEIAcgBCAHSxshBAwBCyAIIQQCQAJAIAEgCCAHIAggB0sbIglqLQAAIgVFDQADQCAFQf8BcSAGIAlqLQAARw0CIAEgCUEBaiIJai0AACIFDQALIAghBAsDQAJAIAQgB0sNACAGIQkMBgsgASAEQX9qIgRqLQAAIAYgBGotAABGDQALIA0hBCAOIQcMAgsgCSAKayEEC0EAIQcLIAYgBGohBgwACwALIAJBoAhqJAAgCQsHAD8AQRB0CwYAQfT/BwtTAQJ/QQAoAtz4BiIBIABBB2pBeHEiAmohAAJAAkACQCACRQ0AIAAgAU0NAQsgABCHA00NASAAEHINAQsQiANBMDYCAEF/DwtBACAANgLc+AYgAQvkIgELfyMAQRBrIgEkAAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEH0AUsNAAJAQQAoAvj/ByICQRAgAEELakH4A3EgAEELSRsiA0EDdiIEdiIAQQNxRQ0AAkACQCAAQX9zQQFxIARqIgNBA3QiBEGggAhqIgAgBEGogAhqKAIAIgQoAggiBUcNAEEAIAJBfiADd3E2Avj/BwwBCyAFIAA2AgwgACAFNgIICyAEQQhqIQAgBCADQQN0IgNBA3I2AgQgBCADaiIEIAQoAgRBAXI2AgQMCwsgA0EAKAKAgAgiBk0NAQJAIABFDQACQAJAIAAgBHRBAiAEdCIAQQAgAGtycWgiBEEDdCIAQaCACGoiBSAAQaiACGooAgAiACgCCCIHRw0AQQAgAkF+IAR3cSICNgL4/wcMAQsgByAFNgIMIAUgBzYCCAsgACADQQNyNgIEIAAgA2oiByAEQQN0IgQgA2siA0EBcjYCBCAAIARqIAM2AgACQCAGRQ0AIAZBeHFBoIAIaiEFQQAoAoyACCEEAkACQCACQQEgBkEDdnQiCHENAEEAIAIgCHI2Avj/ByAFIQgMAQsgBSgCCCEICyAFIAQ2AgggCCAENgIMIAQgBTYCDCAEIAg2AggLIABBCGohAEEAIAc2AoyACEEAIAM2AoCACAwLC0EAKAL8/wciCUUNASAJaEECdEGogghqKAIAIgcoAgRBeHEgA2shBCAHIQUCQANAAkAgBSgCECIADQAgBSgCFCIARQ0CCyAAKAIEQXhxIANrIgUgBCAFIARJIgUbIQQgACAHIAUbIQcgACEFDAALAAsgBygCGCEKAkAgBygCDCIAIAdGDQAgBygCCCIFIAA2AgwgACAFNgIIDAoLAkACQCAHKAIUIgVFDQAgB0EUaiEIDAELIAcoAhAiBUUNAyAHQRBqIQgLA0AgCCELIAUiAEEUaiEIIAAoAhQiBQ0AIABBEGohCCAAKAIQIgUNAAsgC0EANgIADAkLQX8hAyAAQb9/Sw0AIABBC2oiBEF4cSEDQQAoAvz/ByIKRQ0AQR8hBgJAIABB9P//B0sNACADQSYgBEEIdmciAGt2QQFxIABBAXRrQT5qIQYLQQAgA2shBAJAAkACQAJAIAZBAnRBqIIIaigCACIFDQBBACEAQQAhCAwBC0EAIQAgA0EAQRkgBkEBdmsgBkEfRht0IQdBACEIA0ACQCAFKAIEQXhxIANrIgIgBE8NACACIQQgBSEIIAINAEEAIQQgBSEIIAUhAAwDCyAAIAUoAhQiAiACIAUgB0EddkEEcWooAhAiC0YbIAAgAhshACAHQQF0IQcgCyEFIAsNAAsLAkAgACAIcg0AQQAhCEECIAZ0IgBBACAAa3IgCnEiAEUNAyAAaEECdEGogghqKAIAIQALIABFDQELA0AgACgCBEF4cSADayICIARJIQcCQCAAKAIQIgUNACAAKAIUIQULIAIgBCAHGyEEIAAgCCAHGyEIIAUhACAFDQALCyAIRQ0AIARBACgCgIAIIANrTw0AIAgoAhghCwJAIAgoAgwiACAIRg0AIAgoAggiBSAANgIMIAAgBTYCCAwICwJAAkAgCCgCFCIFRQ0AIAhBFGohBwwBCyAIKAIQIgVFDQMgCEEQaiEHCwNAIAchAiAFIgBBFGohByAAKAIUIgUNACAAQRBqIQcgACgCECIFDQALIAJBADYCAAwHCwJAQQAoAoCACCIAIANJDQBBACgCjIAIIQQCQAJAIAAgA2siBUEQSQ0AIAQgA2oiByAFQQFyNgIEIAQgAGogBTYCACAEIANBA3I2AgQMAQsgBCAAQQNyNgIEIAQgAGoiACAAKAIEQQFyNgIEQQAhB0EAIQULQQAgBTYCgIAIQQAgBzYCjIAIIARBCGohAAwJCwJAQQAoAoSACCIHIANNDQBBACAHIANrIgQ2AoSACEEAQQAoApCACCIAIANqIgU2ApCACCAFIARBAXI2AgQgACADQQNyNgIEIABBCGohAAwJCwJAAkBBACgC0IMIRQ0AQQAoAtiDCCEEDAELQQBCfzcC3IMIQQBCgKCAgICABDcC1IMIQQAgAUEMakFwcUHYqtWqBXM2AtCDCEEAQQA2AuSDCEEAQQA2ArSDCEGAICEEC0EAIQAgBCADQS9qIgZqIgJBACAEayILcSIIIANNDQhBACEAAkBBACgCsIMIIgRFDQBBACgCqIMIIgUgCGoiCiAFTQ0JIAogBEsNCQsCQAJAQQAtALSDCEEEcQ0AAkACQAJAAkACQEEAKAKQgAgiBEUNAEG4gwghAANAAkAgBCAAKAIAIgVJDQAgBCAFIAAoAgRqSQ0DCyAAKAIIIgANAAsLQQAQiQMiB0F/Rg0DIAghAgJAQQAoAtSDCCIAQX9qIgQgB3FFDQAgCCAHayAEIAdqQQAgAGtxaiECCyACIANNDQMCQEEAKAKwgwgiAEUNAEEAKAKogwgiBCACaiIFIARNDQQgBSAASw0ECyACEIkDIgAgB0cNAQwFCyACIAdrIAtxIgIQiQMiByAAKAIAIAAoAgRqRg0BIAchAAsgAEF/Rg0BAkAgAiADQTBqSQ0AIAAhBwwECyAGIAJrQQAoAtiDCCIEakEAIARrcSIEEIkDQX9GDQEgBCACaiECIAAhBwwDCyAHQX9HDQILQQBBACgCtIMIQQRyNgK0gwgLIAgQiQMhB0EAEIkDIQAgB0F/Rg0FIABBf0YNBSAHIABPDQUgACAHayICIANBKGpNDQULQQBBACgCqIMIIAJqIgA2AqiDCAJAIABBACgCrIMITQ0AQQAgADYCrIMICwJAAkBBACgCkIAIIgRFDQBBuIMIIQADQCAHIAAoAgAiBSAAKAIEIghqRg0CIAAoAggiAA0ADAULAAsCQAJAQQAoAoiACCIARQ0AIAcgAE8NAQtBACAHNgKIgAgLQQAhAEEAIAI2AryDCEEAIAc2AriDCEEAQX82ApiACEEAQQAoAtCDCDYCnIAIQQBBADYCxIMIA0AgAEEDdCIEQaiACGogBEGggAhqIgU2AgAgBEGsgAhqIAU2AgAgAEEBaiIAQSBHDQALQQAgAkFYaiIAQXggB2tBB3EiBGsiBTYChIAIQQAgByAEaiIENgKQgAggBCAFQQFyNgIEIAcgAGpBKDYCBEEAQQAoAuCDCDYClIAIDAQLIAQgB08NAiAEIAVJDQIgACgCDEEIcQ0CIAAgCCACajYCBEEAIARBeCAEa0EHcSIAaiIFNgKQgAhBAEEAKAKEgAggAmoiByAAayIANgKEgAggBSAAQQFyNgIEIAQgB2pBKDYCBEEAQQAoAuCDCDYClIAIDAMLQQAhAAwGC0EAIQAMBAsCQCAHQQAoAoiACE8NAEEAIAc2AoiACAsgByACaiEFQbiDCCEAAkACQANAIAAoAgAiCCAFRg0BIAAoAggiAA0ADAILAAsgAC0ADEEIcUUNAwtBuIMIIQACQANAAkAgBCAAKAIAIgVJDQAgBCAFIAAoAgRqIgVJDQILIAAoAgghAAwACwALQQAgAkFYaiIAQXggB2tBB3EiCGsiCzYChIAIQQAgByAIaiIINgKQgAggCCALQQFyNgIEIAcgAGpBKDYCBEEAQQAoAuCDCDYClIAIIAQgBUEnIAVrQQdxakFRaiIAIAAgBEEQakkbIghBGzYCBCAIQRBqQQApAsCDCDcCACAIQQApAriDCDcCCEEAIAhBCGo2AsCDCEEAIAI2AryDCEEAIAc2AriDCEEAQQA2AsSDCCAIQRhqIQADQCAAQQc2AgQgAEEIaiEHIABBBGohACAHIAVJDQALIAggBEYNACAIIAgoAgRBfnE2AgQgBCAIIARrIgdBAXI2AgQgCCAHNgIAAkACQCAHQf8BSw0AIAdBeHFBoIAIaiEAAkACQEEAKAL4/wciBUEBIAdBA3Z0IgdxDQBBACAFIAdyNgL4/wcgACEFDAELIAAoAgghBQsgACAENgIIIAUgBDYCDEEMIQdBCCEIDAELQR8hAAJAIAdB////B0sNACAHQSYgB0EIdmciAGt2QQFxIABBAXRrQT5qIQALIAQgADYCHCAEQgA3AhAgAEECdEGogghqIQUCQAJAAkBBACgC/P8HIghBASAAdCICcQ0AQQAgCCACcjYC/P8HIAUgBDYCACAEIAU2AhgMAQsgB0EAQRkgAEEBdmsgAEEfRht0IQAgBSgCACEIA0AgCCIFKAIEQXhxIAdGDQIgAEEddiEIIABBAXQhACAFIAhBBHFqIgIoAhAiCA0ACyACQRBqIAQ2AgAgBCAFNgIYC0EIIQdBDCEIIAQhBSAEIQAMAQsgBSgCCCIAIAQ2AgwgBSAENgIIIAQgADYCCEEAIQBBGCEHQQwhCAsgBCAIaiAFNgIAIAQgB2ogADYCAAtBACgChIAIIgAgA00NAEEAIAAgA2siBDYChIAIQQBBACgCkIAIIgAgA2oiBTYCkIAIIAUgBEEBcjYCBCAAIANBA3I2AgQgAEEIaiEADAQLEIgDQTA2AgBBACEADAMLIAAgBzYCACAAIAAoAgQgAmo2AgQgByAIIAMQiwMhAAwCCwJAIAtFDQACQAJAIAggCCgCHCIHQQJ0QaiCCGoiBSgCAEcNACAFIAA2AgAgAA0BQQAgCkF+IAd3cSIKNgL8/wcMAgsCQAJAIAsoAhAgCEcNACALIAA2AhAMAQsgCyAANgIUCyAARQ0BCyAAIAs2AhgCQCAIKAIQIgVFDQAgACAFNgIQIAUgADYCGAsgCCgCFCIFRQ0AIAAgBTYCFCAFIAA2AhgLAkACQCAEQQ9LDQAgCCAEIANqIgBBA3I2AgQgCCAAaiIAIAAoAgRBAXI2AgQMAQsgCCADQQNyNgIEIAggA2oiByAEQQFyNgIEIAcgBGogBDYCAAJAIARB/wFLDQAgBEF4cUGggAhqIQACQAJAQQAoAvj/ByIDQQEgBEEDdnQiBHENAEEAIAMgBHI2Avj/ByAAIQQMAQsgACgCCCEECyAAIAc2AgggBCAHNgIMIAcgADYCDCAHIAQ2AggMAQtBHyEAAkAgBEH///8HSw0AIARBJiAEQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgByAANgIcIAdCADcCECAAQQJ0QaiCCGohAwJAAkACQCAKQQEgAHQiBXENAEEAIAogBXI2Avz/ByADIAc2AgAgByADNgIYDAELIARBAEEZIABBAXZrIABBH0YbdCEAIAMoAgAhBQNAIAUiAygCBEF4cSAERg0CIABBHXYhBSAAQQF0IQAgAyAFQQRxaiICKAIQIgUNAAsgAkEQaiAHNgIAIAcgAzYCGAsgByAHNgIMIAcgBzYCCAwBCyADKAIIIgAgBzYCDCADIAc2AgggB0EANgIYIAcgAzYCDCAHIAA2AggLIAhBCGohAAwBCwJAIApFDQACQAJAIAcgBygCHCIIQQJ0QaiCCGoiBSgCAEcNACAFIAA2AgAgAA0BQQAgCUF+IAh3cTYC/P8HDAILAkACQCAKKAIQIAdHDQAgCiAANgIQDAELIAogADYCFAsgAEUNAQsgACAKNgIYAkAgBygCECIFRQ0AIAAgBTYCECAFIAA2AhgLIAcoAhQiBUUNACAAIAU2AhQgBSAANgIYCwJAAkAgBEEPSw0AIAcgBCADaiIAQQNyNgIEIAcgAGoiACAAKAIEQQFyNgIEDAELIAcgA0EDcjYCBCAHIANqIgMgBEEBcjYCBCADIARqIAQ2AgACQCAGRQ0AIAZBeHFBoIAIaiEFQQAoAoyACCEAAkACQEEBIAZBA3Z0IgggAnENAEEAIAggAnI2Avj/ByAFIQgMAQsgBSgCCCEICyAFIAA2AgggCCAANgIMIAAgBTYCDCAAIAg2AggLQQAgAzYCjIAIQQAgBDYCgIAICyAHQQhqIQALIAFBEGokACAAC/YHAQd/IABBeCAAa0EHcWoiAyACQQNyNgIEIAFBeCABa0EHcWoiBCADIAJqIgVrIQACQAJAIARBACgCkIAIRw0AQQAgBTYCkIAIQQBBACgChIAIIABqIgI2AoSACCAFIAJBAXI2AgQMAQsCQCAEQQAoAoyACEcNAEEAIAU2AoyACEEAQQAoAoCACCAAaiICNgKAgAggBSACQQFyNgIEIAUgAmogAjYCAAwBCwJAIAQoAgQiAUEDcUEBRw0AIAFBeHEhBiAEKAIMIQICQAJAIAFB/wFLDQACQCACIAQoAggiB0cNAEEAQQAoAvj/B0F+IAFBA3Z3cTYC+P8HDAILIAcgAjYCDCACIAc2AggMAQsgBCgCGCEIAkACQCACIARGDQAgBCgCCCIBIAI2AgwgAiABNgIIDAELAkACQAJAIAQoAhQiAUUNACAEQRRqIQcMAQsgBCgCECIBRQ0BIARBEGohBwsDQCAHIQkgASICQRRqIQcgAigCFCIBDQAgAkEQaiEHIAIoAhAiAQ0ACyAJQQA2AgAMAQtBACECCyAIRQ0AAkACQCAEIAQoAhwiB0ECdEGogghqIgEoAgBHDQAgASACNgIAIAINAUEAQQAoAvz/B0F+IAd3cTYC/P8HDAILAkACQCAIKAIQIARHDQAgCCACNgIQDAELIAggAjYCFAsgAkUNAQsgAiAINgIYAkAgBCgCECIBRQ0AIAIgATYCECABIAI2AhgLIAQoAhQiAUUNACACIAE2AhQgASACNgIYCyAGIABqIQAgBCAGaiIEKAIEIQELIAQgAUF+cTYCBCAFIABBAXI2AgQgBSAAaiAANgIAAkAgAEH/AUsNACAAQXhxQaCACGohAgJAAkBBACgC+P8HIgFBASAAQQN2dCIAcQ0AQQAgASAAcjYC+P8HIAIhAAwBCyACKAIIIQALIAIgBTYCCCAAIAU2AgwgBSACNgIMIAUgADYCCAwBC0EfIQICQCAAQf///wdLDQAgAEEmIABBCHZnIgJrdkEBcSACQQF0a0E+aiECCyAFIAI2AhwgBUIANwIQIAJBAnRBqIIIaiEBAkACQAJAQQAoAvz/ByIHQQEgAnQiBHENAEEAIAcgBHI2Avz/ByABIAU2AgAgBSABNgIYDAELIABBAEEZIAJBAXZrIAJBH0YbdCECIAEoAgAhBwNAIAciASgCBEF4cSAARg0CIAJBHXYhByACQQF0IQIgASAHQQRxaiIEKAIQIgcNAAsgBEEQaiAFNgIAIAUgATYCGAsgBSAFNgIMIAUgBTYCCAwBCyABKAIIIgIgBTYCDCABIAU2AgggBUEANgIYIAUgATYCDCAFIAI2AggLIANBCGoLwgwBB38CQCAARQ0AIABBeGoiASAAQXxqKAIAIgJBeHEiAGohAwJAIAJBAXENACACQQJxRQ0BIAEgASgCACIEayIBQQAoAoiACEkNASAEIABqIQACQAJAAkACQCABQQAoAoyACEYNACABKAIMIQICQCAEQf8BSw0AIAIgASgCCCIFRw0CQQBBACgC+P8HQX4gBEEDdndxNgL4/wcMBQsgASgCGCEGAkAgAiABRg0AIAEoAggiBCACNgIMIAIgBDYCCAwECwJAAkAgASgCFCIERQ0AIAFBFGohBQwBCyABKAIQIgRFDQMgAUEQaiEFCwNAIAUhByAEIgJBFGohBSACKAIUIgQNACACQRBqIQUgAigCECIEDQALIAdBADYCAAwDCyADKAIEIgJBA3FBA0cNA0EAIAA2AoCACCADIAJBfnE2AgQgASAAQQFyNgIEIAMgADYCAA8LIAUgAjYCDCACIAU2AggMAgtBACECCyAGRQ0AAkACQCABIAEoAhwiBUECdEGogghqIgQoAgBHDQAgBCACNgIAIAINAUEAQQAoAvz/B0F+IAV3cTYC/P8HDAILAkACQCAGKAIQIAFHDQAgBiACNgIQDAELIAYgAjYCFAsgAkUNAQsgAiAGNgIYAkAgASgCECIERQ0AIAIgBDYCECAEIAI2AhgLIAEoAhQiBEUNACACIAQ2AhQgBCACNgIYCyABIANPDQAgAygCBCIEQQFxRQ0AAkACQAJAAkACQCAEQQJxDQACQCADQQAoApCACEcNAEEAIAE2ApCACEEAQQAoAoSACCAAaiIANgKEgAggASAAQQFyNgIEIAFBACgCjIAIRw0GQQBBADYCgIAIQQBBADYCjIAIDwsCQCADQQAoAoyACEcNAEEAIAE2AoyACEEAQQAoAoCACCAAaiIANgKAgAggASAAQQFyNgIEIAEgAGogADYCAA8LIARBeHEgAGohACADKAIMIQICQCAEQf8BSw0AAkAgAiADKAIIIgVHDQBBAEEAKAL4/wdBfiAEQQN2d3E2Avj/BwwFCyAFIAI2AgwgAiAFNgIIDAQLIAMoAhghBgJAIAIgA0YNACADKAIIIgQgAjYCDCACIAQ2AggMAwsCQAJAIAMoAhQiBEUNACADQRRqIQUMAQsgAygCECIERQ0CIANBEGohBQsDQCAFIQcgBCICQRRqIQUgAigCFCIEDQAgAkEQaiEFIAIoAhAiBA0ACyAHQQA2AgAMAgsgAyAEQX5xNgIEIAEgAEEBcjYCBCABIABqIAA2AgAMAwtBACECCyAGRQ0AAkACQCADIAMoAhwiBUECdEGogghqIgQoAgBHDQAgBCACNgIAIAINAUEAQQAoAvz/B0F+IAV3cTYC/P8HDAILAkACQCAGKAIQIANHDQAgBiACNgIQDAELIAYgAjYCFAsgAkUNAQsgAiAGNgIYAkAgAygCECIERQ0AIAIgBDYCECAEIAI2AhgLIAMoAhQiBEUNACACIAQ2AhQgBCACNgIYCyABIABBAXI2AgQgASAAaiAANgIAIAFBACgCjIAIRw0AQQAgADYCgIAIDwsCQCAAQf8BSw0AIABBeHFBoIAIaiECAkACQEEAKAL4/wciBEEBIABBA3Z0IgBxDQBBACAEIAByNgL4/wcgAiEADAELIAIoAgghAAsgAiABNgIIIAAgATYCDCABIAI2AgwgASAANgIIDwtBHyECAkAgAEH///8HSw0AIABBJiAAQQh2ZyICa3ZBAXEgAkEBdGtBPmohAgsgASACNgIcIAFCADcCECACQQJ0QaiCCGohBQJAAkACQAJAQQAoAvz/ByIEQQEgAnQiA3ENAEEAIAQgA3I2Avz/ByAFIAE2AgBBCCEAQRghAgwBCyAAQQBBGSACQQF2ayACQR9GG3QhAiAFKAIAIQUDQCAFIgQoAgRBeHEgAEYNAiACQR12IQUgAkEBdCECIAQgBUEEcWoiAygCECIFDQALIANBEGogATYCAEEIIQBBGCECIAQhBQsgASEEIAEhAwwBCyAEKAIIIgUgATYCDCAEIAE2AghBACEDQRghAEEIIQILIAEgAmogBTYCACABIAQ2AgwgASAAaiADNgIAQQBBACgCmIAIQX9qIgFBfyABGzYCmIAICwsGACAAJAELBAAjAQsSAEGAgAQkA0EAQQ9qQXBxJAILBwAjACMCawsEACMDCwQAIwILAgALAgALDQBB6IMIEJMDQeyDCAsJAEHogwgQlAMLBABBAQsCAAvIAgEDfwJAIAANAEEAIQECQEEAKALwgwhFDQBBACgC8IMIEJkDIQELAkBBACgC8IMIRQ0AQQAoAvCDCBCZAyABciEBCwJAEJUDKAIAIgBFDQADQAJAAkAgACgCTEEATg0AQQEhAgwBCyAAEJcDRSECCwJAIAAoAhQgACgCHEYNACAAEJkDIAFyIQELAkAgAg0AIAAQmAMLIAAoAjgiAA0ACwsQlgMgAQ8LAkACQCAAKAJMQQBODQBBASECDAELIAAQlwNFIQILAkACQAJAIAAoAhQgACgCHEYNACAAQQBBACAAKAIkEQYAGiAAKAIUDQBBfyEBIAJFDQEMAgsCQCAAKAIEIgEgACgCCCIDRg0AIAAgASADa6xBASAAKAIoERkAGgtBACEBIABBADYCHCAAQgA3AxAgAEIANwIEIAINAQsgABCYAwsgAQsGACAAJAALEgECfyMAIABrQXBxIgEkACABCwQAIwALC8eqAwQAQYCABAvw5QJBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkxPV01FTU9SWTogTmF0aXZlQWN0aXZpdHkgb25Mb3dNZW1vcnkAX3NhcHBfc3RyY3B5AF9zZ19zdHJjcHkAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05ERVNUUk9ZOiBOYXRpdmVBY3Rpdml0eSBvbkRlc3Ryb3kATnVtcGFkTXVsdGlwbHkAX3NnX3Nsb3RfaW5kZXgAKDApICE9IHNsb3RfaW5kZXgAX3NnX3Bvb2xfYWxsb2NfaW5kZXgAV0lOMzJfQ1JFQVRFX0hFTFBFUl9XSU5ET1dfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIGhlbHBlciB3aW5kb3cAc2FwcF93Z3B1X2dldF9yZW5kZXJfdmlldwBzYXBwX2QzZDExX2dldF9yZW5kZXJfdmlldwBzYXBwX3dncHVfZ2V0X2RlcHRoX3N0ZW5jaWxfdmlldwBzYXBwX2QzZDExX2dldF9kZXB0aF9zdGVuY2lsX3ZpZXcAc2FwcF93Z3B1X2dldF9yZXNvbHZlX3ZpZXcAc2FwcF9kM2QxMV9nZXRfcmVzb2x2ZV92aWV3AF9zZ19nbF9kcmF3AHNnX2RyYXcAc2FwcF9kM2QxMV9nZXRfZGV2aWNlX2NvbnRleHQAV0lOMzJfRFVNTVlfQ09OVEVYVF9TRVRfUElYRUxGT1JNQVRfRkFJTEVEOiBmYWlsZWQgdG8gc2V0IHBpeGVsIGZvcm1hdCBmb3IgZHVtbXkgR0wgY29udGV4dABXSU4zMl9DUkVBVEVfRFVNTVlfQ09OVEVYVF9GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgZHVtbXkgR0wgY29udGV4dABfc2FwcF90aW1pbmdfcHV0AFZBTElEQVRFX1NIQURFUkRFU0NfVUJfU1REMTQwX0FSUkFZX1RZUEU6IHVuaWZvcm0gYXJyYXlzIG9ubHkgYWxsb3dlZCBmb3IgRkxPQVQ0LCBJTlQ0LCBNQVQ0IGluIHN0ZDE0MCBsYXlvdXQAZHN0AEluc2VydABWQUxJREFURV9BVUJfTk9fVUJfQVRfU0xPVDogc2dfYXBwbHlfdW5pZm9ybXM6IG5vIHVuaWZvcm0gYmxvY2sgZGVjbGFyYXRpb24gYXQgdGhpcyBzaGFkZXIgc3RhZ2UgVUIgc2xvdABWQUxJREFURV9BUElQX1NBTVBMRV9DT1VOVDogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIE1TQUEgc2FtcGxlIGNvdW50IGRvZXNuJ3QgbWF0Y2ggcmVuZGVyIHBhc3MgYXR0YWNobWVudCBzYW1wbGUgY291bnQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFX1NBTVBMRV9DT1VOVDogcGFzcyBkZXB0aCBhdHRhY2htZW50IHNhbXBsZSBjb3VudCBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgc2FtcGxlIGNvdW50AFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19JTUFHRV9TQU1QTEVfQ09VTlRTOiBhbGwgcGFzcyBhdHRhY2htZW50cyBtdXN0IGhhdmUgdGhlIHNhbWUgc2FtcGxlIGNvdW50AFdJTjMyX0RVTU1ZX0NPTlRFWFRfTUFLRV9DVVJSRU5UX0ZBSUxFRDogZmFpbGVkIHRvIG1ha2UgZHVtbXkgR0wgY29udGV4dCBjdXJyZW50AF9zZ191bmlmb3JtX2FsaWdubWVudABfc2dfc2hhZGVyX2NvbW1vbl9pbml0AF9zZ19waXBlbGluZV9jb21tb25faW5pdABzZ19jb21taXQAX3NnX3ZhbGlkYXRlX3NldF9zbG90X2JpdABBcnJvd1JpZ2h0AEFsdFJpZ2h0AFNoaWZ0UmlnaHQAQnJhY2tldFJpZ2h0AENvbnRyb2xSaWdodABNZXRhUmlnaHQAQXJyb3dMZWZ0AEFsdExlZnQAU2hpZnRMZWZ0AEJyYWNrZXRMZWZ0AENvbnRyb2xMZWZ0AE1ldGFMZWZ0AFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0NPTE9SRk9STUFUX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uY29sb3JfZm9ybWF0IHRvIGJlIHVuc2V0AFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0RFUFRIRk9STUFUX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZGVwdGhfZm9ybWF0IHRvIGJlIHVuc2V0AHViX2Rlc2MtPnNpemUgPT0gKHNpemVfdCljdXJfdW5pZm9ybV9vZmZzZXQAX3NnX2dsX2J1ZmZlcl90YXJnZXQAV0lOMzJfRDNEMTFfR0VUX0lEWEdJRkFDVE9SWV9GQUlMRUQ6IGNvdWxkIG5vdCBvYnRhaW4gSURYR0lGYWN0b3J5IG9iamVjdABXSU4zMl9EM0QxMV9HRVRfSURYR0lBREFQVEVSX0ZBSUxFRDogY291bGQgbm90IG9idGFpbiBJRFhHSUFkYXB0ZXIgb2JqZWN0AFdHUFVfU1dBUENIQUlOX0NSRUFURV9TV0FQQ0hBSU5fRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIHN3YXBjaGFpbiBvYmplY3QATnVtcGFkU3VidHJhY3QAX2NvbG9yX2J1ZmZlcl9mbG9hdABfY29sb3JfYnVmZmVyX2hhbGZfZmxvYXQAVkFMSURBVEVfQVBJUF9DT0xPUl9GT1JNQVQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBjb2xvciBhdHRhY2htZW50IHBpeGVsIGZvcm1hdCBkb2Vzbid0IG1hdGNoIHBhc3MgY29sb3IgYXR0YWNobWVudCBwaXhlbCBmb3JtYXQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0VfRk9STUFUOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBwaXhlbCBmb3JtYXQgbXVzdCBtYXRjaCBjb2xvciBhdHRhY2htZW50IHBpeGVsIGZvcm1hdABWQUxJREFURV9BUElQX0RFUFRIX0ZPUk1BVDogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIGRlcHRoIHBpeGVsX2Zvcm1hdCBkb2Vzbid0IG1hdGNoIHBhc3MgZGVwdGggYXR0YWNobWVudCBwaXhlbCBmb3JtYXQAVkFMSURBVEVfSU1BR0VERVNDX05PX01TQUFfUlRfU1VQUE9SVDogTVNBQSBub3Qgc3VwcG9ydGVkIGZvciB0aGlzIHBpeGVsIGZvcm1hdABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfQ09MT1JfSU5WX1BJWEVMRk9STUFUOiBwYXNzIGNvbG9yLWF0dGFjaG1lbnQgaW1hZ2VzIG11c3QgYmUgcmVuZGVyYWJsZSBjb2xvciBwaXhlbCBmb3JtYXQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lOVl9QSVhFTEZPUk1BVDogcGFzcyBkZXB0aC1hdHRhY2htZW50IGltYWdlIG11c3QgYmUgZGVwdGggb3IgZGVwdGgtc3RlbmNpbCBwaXhlbCBmb3JtYXQAV0lOMzJfV0dMX1NFVF9QSVhFTEZPUk1BVF9GQUlMRUQ6IGZhaWxlZCB0byBzZXQgc2VsZWN0ZWQgcGl4ZWwgZm9ybWF0AFdJTjMyX1dHTF9GSU5EX1BJWEVMRk9STUFUX0ZBSUxFRDogZmFpbGVkIHRvIGZpbmQgbWF0Y2hpbmcgV0dMIHBpeGVsIGZvcm1hdABWQUxJREFURV9JTUFHRURFU0NfREVQVEhfM0RfSU1BR0U6IDNEIGltYWdlcyBjYW5ub3QgaGF2ZSBhIGRlcHRoL3N0ZW5jaWwgaW1hZ2UgZm9ybWF0AF9zZ19hdHRhY2htZW50c19hdABfc2dfc2FtcGxlcl9hdABfc2dfYnVmZmVyX2F0AF9zZ19zaGFkZXJfYXQAX3NnX3BpcGVsaW5lX2F0AF9zZ19pbWFnZV9hdABWQUxJREFURV9QSVBFTElORURFU0NfTk9fQ09OVF9BVFRSUzogc2dfcGlwZWxpbmVfZGVzYy5sYXlvdXQuYXR0cnMgaXMgbm90IGNvbnRpbnVvdXMATWludXMAYXR0cwBCRUdJTlBBU1NfQVRUQUNITUVOVF9JTlZBTElEOiBzZ19iZWdpbl9wYXNzOiBhbiBhdHRhY2htZW50IHdhcyBwcm92aWRlZCB0aGF0IG5vIGxvbmdlciBleGlzdHMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX05PX0NPTlRfQ09MT1JfQVRUUzogY29sb3IgYXR0YWNobWVudHMgbXVzdCBvY2N1cHkgY29udGludW91cyBzbG90cwBWQUxJREFURV9TSEFERVJERVNDX05PX0NPTlRfVUJfTUVNQkVSUzogdW5pZm9ybSBibG9jayBtZW1iZXJzIG11c3Qgb2NjdXB5IGNvbnRpbnVvdXMgc2xvdHMATElOVVhfR0xYX0xPQURfRU5UUllfUE9JTlRTX0ZBSUxFRDogZmFpbGVkIHRvIGxvYWQgR0xYIGVudHJ5IHBvaW50cwBfc2dfbG9va3VwX2F0dGFjaG1lbnRzAF9zZ19nbF9kaXNjYXJkX2F0dGFjaG1lbnRzAFZBTElEQVRFX0FQSVBfQVRUX0NPVU5UOiBzZ19hcHBseV9waXBlbGluZTogbnVtYmVyIG9mIHBpcGVsaW5lIGNvbG9yIGF0dGFjaG1lbnRzIGRvZXNuJ3QgbWF0Y2ggbnVtYmVyIG9mIHBhc3MgY29sb3IgYXR0YWNobWVudHMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX05PX0FUVEFDSE1FTlRTOiBzZ19hdHRhY2htZW50c19kZXNjIG5vIGNvbG9yIG9yIGRlcHRoLXN0ZW5jaWwgYXR0YWNobWVudHMAV0dQVV9BVFRBQ0hNRU5UU19DUkVBVEVfVEVYVFVSRV9WSUVXX0ZBSUxFRDogd2dwdVRleHR1cmVDcmVhdGVWaWV3KCkgZmFpbGVkIGluIGNyZWF0ZSBhdHRhY2htZW50cwBfc2dfcGFzc19hY3Rpb25fZGVmYXVsdHMAX3NhcHBfZGVzY19kZWZhdWx0cwBfc2dfcGlwZWxpbmVfZGVzY19kZWZhdWx0cwBfc2dfZ2xfaW5pdF9saW1pdHMAX3NnX3ZhbGlkYXRlX3Nsb3RfYml0cwBfc2dfZ2xfYmVnaW5fcGFzcwBzZ19iZWdpbl9wYXNzACFfc2cuY3VyX3Bhc3MuaW5fcGFzcwBfc2dfZ2xfZW5kX3Bhc3MAc2dfZW5kX3Bhc3MAYXR0cl9sb2MgPCAoR0xpbnQpX3NnLmxpbWl0cy5tYXhfdmVydGV4X2F0dHJzAHBvb2wgJiYgcG9vbC0+Z2VuX2N0cnMAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9OT05GSUxURVJJTkdfU0FNUExFUjogc2dfYXBwbHlfYmluZGluZ3M6IHNoYWRlciBleHBlY3RlZCBTR19TQU1QTEVSVFlQRV9OT05GSUxURVJJTkcsIGJ1dCBzYW1wbGVyIGhhcyBTR19GSUxURVJfTElORUFSIGZpbHRlcnMAX3NnX25vdGlmeV9jb21taXRfbGlzdGVuZXJzAF9zZ19zZXR1cF9jb21taXRfbGlzdGVuZXJzAF9zZ19kaXNjYXJkX2NvbW1pdF9saXN0ZW5lcnMAVkFMSURBVEVfU0hBREVSREVTQ19TQU1QTEVSX1dHU0xfR1JPVVAxX0JJTkRJTkdfQ09MTElTSU9OOiBzYW1wbGVyICd3Z3NsX2dyb3VwMV9iaW5kaW5nX24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyBhbGwgaW1hZ2VzLCBzYW1wbGVycyBhbmQgc3RvcmFnZSBidWZmZXJzAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9XR1NMX0dST1VQMV9CSU5ESU5HX0NPTExJU0lPTjogc3RvcmFnZSBidWZmZXIgJ3dnc2xfZ3JvdXAxX2JpbmRpbmdfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIGFsbCBpbWFnZXMsIHNhbXBsZXJzIGFuZCBzdG9yYWdlIGJ1ZmZlcnMAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9XR1NMX0dST1VQMV9CSU5ESU5HX0NPTExJU0lPTjogaW1hZ2UgJ3dnc2xfZ3JvdXAxX2JpbmRpbmdfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIGFsbCBpbWFnZXMsIHNhbXBsZXJzIGFuZCBzdG9yYWdlIGJ1ZmZlcnMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX01JUExFVkVMOiBwYXNzIGF0dGFjaG1lbnQgbWlwIGxldmVsIGlzIGJpZ2dlciB0aGFuIGltYWdlIGhhcyBtaXBtYXBzAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9NSVBMRVZFTDogcGFzcyBkZXB0aCBhdHRhY2htZW50IG1pcCBsZXZlbCBpcyBiaWdnZXIgdGhhbiBpbWFnZSBoYXMgbWlwbWFwcwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9NSVBMRVZFTDogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgbWlwIGxldmVsIGlzIGJpZ2dlciB0aGFuIGltYWdlIGhhcyBtaXBtYXBzAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fVUJfTUVNQkVSUzogR0wgYmFja2VuZCByZXF1aXJlcyB1bmlmb3JtIGJsb2NrIG1lbWJlciBkZWNsYXJhdGlvbnMAMCA9PSBfc2cuY29tbWl0X2xpc3RlbmVycy5pdGVtcwAwICE9IF9zZy5jb21taXRfbGlzdGVuZXJzLml0ZW1zAF9zZ19zZXR1cF9wb29scwBfc2dfZGlzY2FyZF9wb29scwAwID09IF9zYXBwLmRlZmF1bHRfaWNvbl9waXhlbHMAMCAhPSBfc2FwcC5kZWZhdWx0X2ljb25fcGl4ZWxzAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfV0dTTF9HUk9VUDBfQklORElOR19DT0xMSVNJT046IHVuaWZvcm0gYmxvY2sgJ3dnc2xfZ3JvdXAwX2JpbmRpbmdfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIGFsbCB1bmlmb3JtIGJsb2NrcwBfc2dfZ2xfYXBwbHlfYmluZGluZ3MAc2dfYXBwbHlfYmluZGluZ3MAX3NnX3ZhbGlkYXRlX2FwcGx5X2JpbmRpbmdzAF9zZ19nbF9jYWNoZV9jbGVhcl90ZXh0dXJlX3NhbXBsZXJfYmluZGluZ3MARFJBV19XSVRIT1VUX0JJTkRJTkdTOiBhdHRlbXB0aW5nIHRvIGRyYXcgd2l0aG91dCByZXNvdXJjZSBiaW5kaW5ncwBMSU5VWF9HTFhfTk9fR0xYRkJDT05GSUdTOiBnbFhHZXRGQkNvbmZpZ3MoKSByZXR1cm5lZCBubyBjb25maWdzAExJTlVYX0VHTF9OT19DT05GSUdTOiBlZ2xDaG9vc2VDb25maWcoKSByZXR1cm5lZCBubyBjb25maWdzAF9zYXBwLmRyb3AubnVtX2ZpbGVzIDw9IF9zYXBwLmRyb3AubWF4X2ZpbGVzAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9HTFNMX0JJTkRJTkdfQ09MTElTSU9OOiBzdG9yYWdlIGJ1ZmZlciAnZ2xzbF9iaW5kaW5nX24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyBzaGFkZXIgc3RhZ2VzAHRyaWFuZ2xlLXZlcnRpY2VzAGNhbnZhcwBfc2FwcF9kcm9wcGVkX2ZpbGVfcGF0aF9wdHIAZGVzYy0+ZGF0YS5wdHIAV0lOMzJfV0dMX0RFU0NSSUJFX1BJWEVMRk9STUFUX0ZBSUxFRDogZmFpbGVkIHRvIGdldCBwaXhlbCBmb3JtYXQgZGVzY3JpcHRvcgBfc2dfZ2xfYmxlbmRfZmFjdG9yAGVycm9yAEVudGVyADAgPT0gX3NnLmNvbW1pdF9saXN0ZW5lcnMudXBwZXIASURFTlRJQ0FMX0NPTU1JVF9MSVNURU5FUjogYXR0ZW1wdGluZyB0byBhZGQgaWRlbnRpY2FsIGNvbW1pdCBsaXN0ZW5lcgBfc2dfZ2xfY2FjaGVfaW52YWxpZGF0ZV90ZXh0dXJlX3NhbXBsZXIAX3NnX2dsX2NhY2hlX2JpbmRfdGV4dHVyZV9zYW1wbGVyAF9zZ19nbF9kaXNjYXJkX3NhbXBsZXIAVkFMSURBVEVfU0hBREVSREVTQ19DT01QQVJJU09OX1NBTVBMRVJfUkVRVUlSRUQ6IGltYWdlIHNhbXBsZSB0eXBlIERFUFRIIGNhbiBvbmx5IGJlIHVzZWQgd2l0aCBDT01QQVJJU09OIHNhbXBsZXIAVkFMSURBVEVfU0hBREVSREVTQ19OT05GSUxURVJJTkdfU0FNUExFUl9SRVFVSVJFRDogaW1hZ2Ugc2FtcGxlIHR5cGUgVU5GSUxURVJBQkxFX0ZMT0FULCBVSU5ULCBTSU5UIGNhbiBvbmx5IGJlIHVzZWQgd2l0aCBOT05GSUxURVJJTkcgc2FtcGxlcgBzYXBwX2dsX2dldF9mcmFtZWJ1ZmZlcgBfc2dfaW5pdF9idWZmZXIAX3NhcHBfY2xlYXJfZHJvcF9idWZmZXIAX3NnX2dsX2NyZWF0ZV9idWZmZXIAc2dfbWFrZV9idWZmZXIAX3NnX2dsX2NhY2hlX2JpbmRfc3RvcmFnZV9idWZmZXIAX3NnX2dsX2Rpc2NhcmRfYnVmZmVyAF9zZ19nbF9jYWNoZV9iaW5kX2J1ZmZlcgBfc2FwcC5kcm9wLmJ1ZmZlcgBfc2FwcC5jbGlwYm9hcmQuYnVmZmVyAFZBTElEQVRFX0FQUEVOREJVRl9VU0FHRTogc2dfYXBwZW5kX2J1ZmZlcjogY2Fubm90IGFwcGVuZCB0byBpbW11dGFibGUgYnVmZmVyAFZBTElEQVRFX1VQREFURUJVRl9VU0FHRTogc2dfdXBkYXRlX2J1ZmZlcjogY2Fubm90IHVwZGF0ZSBpbW11dGFibGUgYnVmZmVyAFZBTElEQVRFX0FCTkRfU1RPUkFHRUJVRkZFUl9CSU5ESU5HX0JVRkZFUlRZUEU6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgYm91bmQgc3RvcmFnZSBidWZmZXIgc2xvdCBpcyBub3Qgb2YgdHlwZSBzdG9yYWdlIGJ1ZmZlcgBDTElQQk9BUkRfU1RSSU5HX1RPT19CSUc6IGNsaXBib2FyZCBzdHJpbmcgZGlkbid0IGZpdCBpbnRvIGNsaXBib2FyZCBidWZmZXIAX3NnX2luaXRfc2hhZGVyAF9zZ19sb29rdXBfc2hhZGVyAF9zZ19nbF9jcmVhdGVfc2hhZGVyAF9zZ19nbF9jb21waWxlX3NoYWRlcgB0cmlhbmdsZV9zaGFkZXIAc2dfbWFrZV9zaGFkZXIAX3NnX2dsX2Rpc2NhcmRfc2hhZGVyAGJuZC0+cGlwICYmIGJuZC0+cGlwLT5zaGFkZXIAVkFMSURBVEVfUElQRUxJTkVERVNDX0FUVFJfU0VNQU5USUNTOiBEM0QxMSBtaXNzaW5nIHZlcnRleCBhdHRyaWJ1dGUgc2VtYW50aWNzIGluIHNoYWRlcgBfdGV4dHVyZV9mbG9hdF9saW5lYXIAX3NhcHBfY2xlYXIAX3NnX2NsZWFyAHNnX3NldHVwAHNhcHAAc29rb2xfYXBwAF9zYXBwX2Vtc2NfZHJvcABfc2dfZ2xfc3RlbmNpbF9vcABfc2dfZ2xfYmxlbmRfb3AAc21wAHBpcABBcnJvd1VwAFBhZ2VVcABWQUxJREFURV9TSEFERVJERVNDX1VCX1NJWkVfSVNfWkVSTzogYm91bmQgdW5pZm9ybSBibG9jayBzaXplIGNhbm5vdCBiZSB6ZXJvAGluZm8AVkFMSURBVEVfQUJORF9WQl9PVkVSRkxPVzogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiB2ZXJ0ZXggYnVmZmVyIHNsb3QgaXMgb3ZlcmZsb3duAFZBTElEQVRFX0FCTkRfSUJfT1ZFUkZMT1c6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgaW4gaW5kZXggYnVmZmVyIHNsb3QgaXMgb3ZlcmZsb3duAEFycm93RG93bgBQYWdlRG93bgBXSU4zMl9XR0xfQ1JFQVRFX0NPTlRFWFRfQVRUUklCU19GQUlMRURfT1RIRVI6IENyZWF0ZUNvbnRleHRBdHRyaWJzQVJCIGZhaWxlZCBmb3Igb3RoZXIgcmVhc29uAFNlbWljb2xvbgBwb3NpdGlvbgBMSU5VWF9YMTFfRkFJTEVEX1RPX0JFQ09NRV9PV05FUl9PRl9DTElQQk9BUkQ6IFgxMTogRmFpbGVkIHRvIGJlY29tZSBvd25lciBvZiBjbGlwYm9hcmQgc2VsZWN0aW9uAGFjdGlvbgBMSU5VWF9HTFhfUVVFUllfVkVSU0lPTl9GQUlMRUQ6IGZhaWxlZCB0byBxdWVyeSBHTFggdmVyc2lvbgBfc2FwcF9zZXR1cF9kZWZhdWx0X2ljb24Ac2FwcF9zZXRfaWNvbgBfc2FwcF9lbXNjX3NldF9pY29uAG1haW4AV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX0RFUFRIX1NURU5DSUxfVEVYVFVSRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgZGVwdGgtc3RlbmNpbCB0ZXh0dXJlIGZvciBzd2FwY2hhaW4AV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX01TQUFfVEVYVFVSRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgbXNhYSB0ZXh0dXJlIGZvciBzd2FwY2hhaW4AV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX1NVUkZBQ0VfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIHN1cmZhY2UgZm9yIHN3YXBjaGFpbgBQcmludFNjcmVlbgAwID09IF9zZy5jb21taXRfbGlzdGVuZXJzLm51bQBfc2dfaW5pdF9wb29sAF9zZ19kaXNjYXJkX3Bvb2wAQ09NTUlUX0xJU1RFTkVSX0FSUkFZX0ZVTEw6IGNvbW1pdCBsaXN0ZW5lciBhcnJheSBmdWxsAFdJTjMyX0xPQURfT1BFTkdMMzJfRExMX0ZBSUxFRDogZmFpbGVkIGxvYWRpbmcgb3BlbmdsMzIuZGxsAEVxdWFsAE51bXBhZERlY2ltYWwAQ2Fwc0xvY2sATnVtTG9jawBTY3JvbGxMb2NrAE9LOiBPawBCYWNrc2xhc2gAU2xhc2gAL2hvbWUva29uc3VtZXIvRGVza3RvcC9zb2tvbC1jYW52YXMtZXhhbXBsZS0xMTU0L3Nva29sL3Nva29sX2dmeC5oAC9ob21lL2tvbnN1bWVyL0Rlc2t0b3Avc29rb2wtY2FudmFzLWV4YW1wbGUtMTE1NC9zb2tvbC9zb2tvbF9hcHAuaABBTkRST0lEX1dSSVRFX01TR19GQUlMRUQ6IGZhaWxlZCB0byB3cml0ZSBtZXNzYWdlIGluIF9zYXBwX2FuZHJvaWRfbXNnACFzaGQtPmdsLnByb2cATElOVVhfR0xYX1JFUVVJUkVEX0VYVEVOU0lPTlNfTUlTU0lORzogR0xYIGV4dGVuc2lvbnMgQVJCX2NyZWF0ZV9jb250ZXh0IGFuZCBBUkJfY3JlYXRlX2NvbnRleHRfcHJvZmlsZSBtaXNzaW5nAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX0dMU0xfTkFNRTogaW1hZ2Utc2FtcGxlci1wYWlyICdnbHNsX25hbWUnIG1pc3NpbmcAVkFMSURBVEVfU0hBREVSREVTQ19VQl9VTklGT1JNX0dMU0xfTkFNRTogdW5pZm9ybSBibG9jayBtZW1iZXIgJ2dsc2xfbmFtZScgbWlzc2luZwB3YXJuaW5nAF9zZ19nbF9jYWNoZV9yZXN0b3JlX2J1ZmZlcl9iaW5kaW5nAF9zZ19nbF9jYWNoZV9zdG9yZV9idWZmZXJfYmluZGluZwBpbWcATElOVVhfR0xYX05PX1NVSVRBQkxFX0dMWEZCQ09ORklHOiBmYWlsZWQgdG8gZmluZCBhIHN1aXRhYmxlIEdMWEZCQ29uZmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0xBWUVSOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpcyBhcnJheSB0ZXh0dXJlLCBidXQgbGF5ZXIgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTEFZRVI6IHBhc3MgYXR0YWNobWVudCBpbWFnZSBpcyBhcnJheSB0ZXh0dXJlLCBidXQgbGF5ZXIgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfTEFZRVI6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBpcyBhcnJheSB0ZXh0dXJlLCBidXQgbGF5ZXIgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9GQUNFOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpcyBjdWJlbWFwLCBidXQgZmFjZSBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19GQUNFOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgaXMgY3ViZW1hcCwgYnV0IGZhY2UgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfRkFDRTogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIGN1YmVtYXAsIGJ1dCBmYWNlIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfU0xJQ0U6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGlzIDNkIHRleHR1cmUsIGJ1dCBzbGljZSB2YWx1ZSBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19TTElDRTogcGFzcyBhdHRhY2htZW50IGltYWdlIGlzIDNkIHRleHR1cmUsIGJ1dCBzbGljZSB2YWx1ZSBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9TTElDRTogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIDNkIHRleHR1cmUsIGJ1dCBzbGljZSB2YWx1ZSBpcyB0b28gYmlnAGdsX2J1ZgBfc2dfdmVydGV4Zm9ybWF0X2J5dGVzaXplAF9zZ19nbF92ZXJ0ZXhmb3JtYXRfc2l6ZQBfc2dfdW5pZm9ybV9zaXplAG9mZnNldCA8IF9zYXBwLmRyb3AuYnVmX3NpemUAVkFMSURBVEVfVVBEQVRFQlVGX1NJWkU6IHNnX3VwZGF0ZV9idWZmZXI6IHVwZGF0ZSBzaXplIGlzIGJpZ2dlciB0aGFuIGJ1ZmZlciBzaXplAFZBTElEQVRFX0FQUEVOREJVRl9TSVpFOiBzZ19hcHBlbmRfYnVmZmVyOiBvdmVyYWxsIGFwcGVuZGVkIHNpemUgaXMgYmlnZ2VyIHRoYW4gYnVmZmVyIHNpemUAVkFMSURBVEVfQlVGRkVSREVTQ19EQVRBX1NJWkU6IGltbXV0YWJsZSBidWZmZXIgZGF0YSBzaXplIGRpZmZlcnMgZnJvbSBidWZmZXIgc2l6ZQBWQUxJREFURV9TSEFERVJERVNDX1VCX1NJWkVfTUlTTUFUQ0g6IHNpemUgb2YgdW5pZm9ybSBibG9jayBtZW1iZXJzIGRvZXNuJ3QgbWF0Y2ggdW5pZm9ybSBibG9jayBzaXplAFZBTElEQVRFX0FVQl9TSVpFOiBzZ19hcHBseV91bmlmb3JtczogZGF0YSBzaXplIGRvZXNuJ3QgbWF0Y2ggZGVjbGFyZWQgdW5pZm9ybSBibG9jayBzaXplAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19JTUFHRV9TSVpFUzogYWxsIHBhc3MgYXR0YWNobWVudHMgbXVzdCBoYXZlIHRoZSBzYW1lIHNpemUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0VfU0laRVM6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IHNpemUgbXVzdCBtYXRjaCBjb2xvciBhdHRhY2htZW50IGltYWdlIHNpemUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFX1NJWkVTOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2Ugc2l6ZSBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgaW1hZ2Ugc2l6ZQBWQUxJREFURV9JTUFHRURBVEFfREFUQV9TSVpFOiBzZ19pbWFnZV9kYXRhOiBkYXRhIHNpemUgZG9lc24ndCBtYXRjaCBleHBlY3RlZCBzdXJmYWNlIHNpemUAVkFMSURBVEVfQkVHSU5QQVNTX0FUVEFDSE1FTlRTX0VYSVNUUzogc2dfYmVnaW5fcGFzczogYXR0YWNobWVudHMgb2JqZWN0IG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BUElQX1NIQURFUl9FWElTVFM6IHNnX2FwcGx5X3BpcGVsaW5lOiBzaGFkZXIgb2JqZWN0IG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX1BJUEVMSU5FX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGN1cnJlbnRseSBhcHBsaWVkIHBpcGVsaW5lIG9iamVjdCBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQVBJUF9QSVBFTElORV9FWElTVFM6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBvYmplY3Qgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FQSVBfQ1VSUEFTU19BVFRBQ0hNRU5UU19FWElTVFM6IHNnX2FwcGx5X3BpcGVsaW5lOiBjdXJyZW50IHBhc3MgYXR0YWNobWVudHMgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfU01QX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGJvdW5kIHNhbXBsZXIgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfVkJfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogdmVydGV4IGJ1ZmZlciBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9JQl9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBpbmRleCBidWZmZXIgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfU1RPUkFHRUJVRkZFUl9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBib3VuZCBzdG9yYWdlIGJ1ZmZlciBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9JTUdfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogYm91bmQgaW1hZ2Ugbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0lNQUdFX05PX1JUOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpbWFnZSBtdXN0IGhhdmUgcmVuZGVyX3RhcmdldD10cnVlAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19JTUFHRV9OT19SVDogcGFzcyBhdHRhY2htZW50IGltYWdlIG11c3QgYmUgaGF2ZSByZW5kZXJfdGFyZ2V0PXRydWUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFX05PX1JUOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgbXVzdCBiZSBoYXZlIHJlbmRlcl90YXJnZXQ9dHJ1ZQBfc2FwcF9yaW5nX2VucXVldWUAX3NhcHBfcmluZ19kZXF1ZXVlAHBvb2wtPmZyZWVfcXVldWUAV0lOMzJfR0VUX1BJWEVMRk9STUFUX0FUVFJJQl9GQUlMRUQ6IGZhaWxlZCB0byBnZXQgV0dMIHBpeGVsIGZvcm1hdCBhdHRyaWJ1dGUAQmFja3F1b3RlAFF1b3RlAERlbGV0ZQBfc2FwcF9pbml0X3N0YXRlAF9zYXBwX2Rpc2NhcmRfc3RhdGUAVkFMSURBVEVfQVBJUF9TSEFERVJfVkFMSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBzaGFkZXIgb2JqZWN0IG5vdCBpbiB2YWxpZCBzdGF0ZQBWQUxJREFURV9BQk5EX1BJUEVMSU5FX1ZBTElEOiBzZ19hcHBseV9iaW5kaW5nczogY3VycmVudGx5IGFwcGxpZWQgcGlwZWxpbmUgb2JqZWN0IG5vdCBpbiB2YWxpZCBzdGF0ZQBWQUxJREFURV9BUElQX1BJUEVMSU5FX1ZBTElEOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgb2JqZWN0IG5vdCBpbiB2YWxpZCBzdGF0ZQBWQUxJREFURV9BUElQX0NVUlBBU1NfQVRUQUNITUVOVFNfVkFMSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBjdXJyZW50IHBhc3MgYXR0YWNobWVudHMgbm90IGluIHZhbGlkIHN0YXRlAERFQUxMT0NfU0FNUExFUl9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX3NhbXBsZXIoKTogc2FtcGxlciBtdXN0IGJlIGluIGFsbG9jIHN0YXRlAERFQUxMT0NfSU1BR0VfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19pbWFnZSgpOiBpbWFnZSBtdXN0IGJlIGluIGFsbG9jIHN0YXRlAFVOSU5JVF9BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfYXR0YWNobWVudHMoKTogYXR0YWNobWVudHMgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX1NBTVBMRVJfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X3NhbXBsZXIoKTogc2FtcGxlciBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfQlVGRkVSX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAFVOSU5JVF9TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9waXBlbGluZSgpOiBwaXBlbGluZSBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfSU1BR0VfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAEZBSUxfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9hdHRhY2htZW50cygpOiBhdHRhY2htZW50cyBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAERFQUxMT0NfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19hdHRhY2htZW50cygpOiBhdHRhY2htZW50cyBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAElOSVRfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9hdHRhY2htZW50cygpOiBwYXNzIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9TQU1QTEVSX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9TQU1QTEVSX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ19pbml0X3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ19pbml0X2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05TQVZFSU5TVEFOQ0VTVEFURTogTmF0aXZlQWN0aXZpdHkgb25TYXZlSW5zdGFuY2VTdGF0ZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkNSRUFURTogTmF0aXZlQWN0aXZpdHkgb25DcmVhdGUAX3NhcHBfaW1hZ2VfdmFsaWRhdGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05QQVVTRTogTmF0aXZlQWN0aXZpdHkgb25QYXVzZQBzYXBwX21ldGFsX2dldF9tc2FhX2NvbG9yX3RleHR1cmUAc2FwcF9tZXRhbF9nZXRfZGVwdGhfc3RlbmNpbF90ZXh0dXJlAF9zZ19nbF9jYWNoZV9hY3RpdmVfdGV4dHVyZQBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfREVQVEhfU1RFTkNJTF9WSUVXX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSB2aWV3IG9iamVjdCBmb3Igc3dhcGNoYWluIGRlcHRoLXN0ZW5jaWwgdGV4dHVyZQBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfTVNBQV9WSUVXX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSB2aWV3IG9iamVjdCBmb3Igc3dhcGNoYWluIG1zYWEgdGV4dHVyZQBfc2dfZ2xfaW5kZXhfdHlwZQBfc2dfZ2xfdmVydGV4Zm9ybWF0X3R5cGUAX3NnX2dsX3ByaW1pdGl2ZV90eXBlAEFORFJPSURfQ1JFQVRFX1RIUkVBRF9QSVBFX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSB0aHJlYWQgcGlwZQBFc2NhcGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfRE9ORTogTmF0aXZlQWN0aXZpdHkgZG9uZQBBTkRST0lEX0xPT1BfVEhSRUFEX0RPTkU6IGxvb3AgdGhyZWFkIGRvbmUAX3NnX2dsX2FwcGx5X3BpcGVsaW5lAFZBTElEQVRFX0FCTkRfUElQRUxJTkU6IHNnX2FwcGx5X2JpbmRpbmdzOiBtdXN0IGJlIGNhbGxlZCBhZnRlciBzZ19hcHBseV9waXBlbGluZQBfc2dfdmFsaWRhdGVfYXBwbHlfcGlwZWxpbmUAX3NnX2luaXRfcGlwZWxpbmUAX3NnLmdsLmNhY2hlLmN1cl9waXBlbGluZQBfc2dfbG9va3VwX3BpcGVsaW5lAF9zZ19nbF9jcmVhdGVfcGlwZWxpbmUAc2dfbWFrZV9waXBlbGluZQBfc2dfZ2xfZGlzY2FyZF9waXBlbGluZQB0cmlhbmdsZS1waXBlbGluZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlJFU1VNRTogTmF0aXZlQWN0aXZpdHkgb25SZXN1bWUASG9tZQBWQUxJREFURV9BUFBFTkRCVUZfVVBEQVRFOiBzZ19hcHBlbmRfYnVmZmVyOiBjYW5ub3QgY2FsbCBzZ19hcHBlbmRfYnVmZmVyIGFuZCBzZ191cGRhdGVfYnVmZmVyIGluIHNhbWUgZnJhbWUAVkFMSURBVEVfVVBEQVRFQlVGX0FQUEVORDogc2dfdXBkYXRlX2J1ZmZlcjogY2Fubm90IGNhbGwgc2dfdXBkYXRlX2J1ZmZlciBhbmQgc2dfYXBwZW5kX2J1ZmZlciBpbiBzYW1lIGZyYW1lAFZBTElEQVRFX1VQREFURUJVRl9PTkNFOiBzZ191cGRhdGVfYnVmZmVyOiBvbmx5IG9uZSB1cGRhdGUgYWxsb3dlZCBwZXIgYnVmZmVyIGFuZCBmcmFtZQBWQUxJREFURV9VUERJTUdfT05DRTogc2dfdXBkYXRlX2ltYWdlOiBvbmx5IG9uZSB1cGRhdGUgYWxsb3dlZCBwZXIgaW1hZ2UgYW5kIGZyYW1lAHVfZGVzYy0+Z2xzbF9uYW1lAGltZ19zbXBfZGVzYy0+Z2xzbF9uYW1lAHNhcHBfbWV0YWxfZ2V0X2N1cnJlbnRfZHJhd2FibGUAVkFMSURBVEVfSU1BR0VERVNDX0NPTVBSRVNTRURfSU1NVVRBQkxFOiBjb21wcmVzc2VkIGltYWdlcyBtdXN0IGJlIGltbXV0YWJsZQBfc2dfZ2xfcmVzZXRfc3RhdGVfY2FjaGUAX3NnX2dsX3NoYWRlcl9zdGFnZQBkZXNjLT5zYW1wbGVyc1tzcmMtPnNhbXBsZXJfc2xvdF0uc3RhZ2UgPT0gc3JjLT5zdGFnZQBkZXNjLT5pbWFnZXNbc3JjLT5pbWFnZV9zbG90XS5zdGFnZSA9PSBzcmMtPnN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX1NBTVBMRVJfU1RBR0VfTUlTTUFUQ0g6IGltYWdlLXNhbXBsZXItcGFpciBzdGFnZSBkb2Vzbid0IG1hdGNoIHJlZmVyZW5jZWQgc2FtcGxlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX1VCX01FVEFMX0JVRkZFUl9TTE9UX0NPTExJU0lPTjogdW5pZm9ybSBibG9jayAnbXNsX2J1ZmZlcl9uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgdW5pZm9ybSBibG9ja3MgYW5kIHN0b3JhZ2UgYnVmZmVycyBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX0hMU0xfUkVHSVNURVJfVF9DT0xMSVNJT046IGltYWdlICdobHNsX3JlZ2lzdGVyX3RfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIGltYWdlcyBhbmQgc3RvcmFnZSBidWZmZXJzIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfSExTTF9SRUdJU1RFUl9CX0NPTExJU0lPTjogdW5pZm9ybSBibG9jayAnaGxzbF9yZWdpc3Rlcl9iX24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyB1bmlmb3JtIGJsb2NrcyBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfSExTTF9SRUdJU1RFUl9UX0NPTExJU0lPTjogc3RvcmFnZV9idWZmZXIgJ2hsc2xfcmVnaXN0ZXJfdF9uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3Mgc3RvcmFnZSBidWZmZXJzIGFuZCBpbWFnZXMgaW4gc2FtZSBzaGFkZXIgc3RhZ2UAVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX01FVEFMX0JVRkZFUl9TTE9UX0NPTExJU0lPTjogc3RvcmFnZSBidWZmZXIgJ21zbF9idWZmZXJfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIHVuaWZvcm0gYmxvY2tzIGFuZCBzdG9yYWdlIGJ1ZmZlciBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfSExTTF9SRUdJU1RFUl9TX0NPTExJU0lPTjogc2FtcGxlciAnaGxzbF9yZWdpc3Rlcl9zX24nIG11c3QgYmUgdW5pcXVlIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9NRVRBTF9TQU1QTEVSX1NMT1RfQ09MTElTSU9OOiBzYW1wbGVyICdtc2xfc2FtcGxlcl9uJyBtdXN0IGJlIHVuaXF1ZSBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX01FVEFMX1RFWFRVUkVfU0xPVF9DT0xMSVNJT046IGltYWdlICdtc2xfdGV4dHVyZV9uJyBtdXN0IGJlIHVuaXF1ZSBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1NBTVBMRVJfUEFJUl9JTUFHRV9TVEFHRV9NSVNNQVRDSDogaW1hZ2Utc2FtcGxlci1wYWlyIHN0YWdlIGRvZXNuJ3QgbWF0Y2ggcmVmZXJlbmNlZCBpbWFnZSBzdGFnZQBfc2dfZ2xfdXNhZ2UAX3NnX2dsX2F0dGFjaG1lbnRzX2RzX2ltYWdlAF9zZ19nbF9hdHRhY2htZW50c19jb2xvcl9pbWFnZQBfc2dfZ2xfYXR0YWNobWVudHNfcmVzb2x2ZV9pbWFnZQBfc2dfZ2xfZGlzY2FyZF9pbWFnZQBWQUxJREFURV9JTUFHRURFU0NfTk9OUlRfUElYRUxGT1JNQVQ6IGludmFsaWQgcGl4ZWwgZm9ybWF0IGZvciBub24tcmVuZGVyLXRhcmdldCBpbWFnZQBWQUxJREFURV9JTUFHRURFU0NfUlRfUElYRUxGT1JNQVQ6IGludmFsaWQgcGl4ZWwgZm9ybWF0IGZvciByZW5kZXItdGFyZ2V0IGltYWdlAFZBTElEQVRFX1VQRElNR19VU0FHRTogc2dfdXBkYXRlX2ltYWdlOiBjYW5ub3QgdXBkYXRlIGltbXV0YWJsZSBpbWFnZQBOdW1wYWREaXZpZGUAV0dQVV9DUkVBVEVfSU5TVEFOQ0VfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIGluc3RhbmNlAHNhcHBfd2dwdV9nZXRfZGV2aWNlAHNhcHBfbWV0YWxfZ2V0X2RldmljZQBzYXBwX2QzZDExX2dldF9kZXZpY2UAQmFja3NwYWNlAFNwYWNlAFdJTjMyX0QzRDExX1FVRVJZX0lOVEVSRkFDRV9JRFhHSURFVklDRTFfRkFJTEVEOiBjb3VsZCBub3Qgb2J0YWluIElEWEdJRGV2aWNlMSBpbnRlcmZhY2UAUGVyaW9kAExJTlVYX0dMWF9FWFRFTlNJT05fTk9UX0ZPVU5EOiBHTFggZXh0ZW5zaW9uIG5vdCBmb3VuZABfZmxvYXRfYmxlbmQAc2dfcXVlcnlfYmFja2VuZABfc2dfZ2xfc2V0dXBfYmFja2VuZABfc2dfZ2xfZGlzY2FyZF9iYWNrZW5kAGRzdCA9PSBkc3RfZW5kAGRzdCA8IGRzdF9lbmQAYm5kAEVuZABWQUxJREFURV9BQk5EX0VYUEVDVEVEX1NBTVBMRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHNhbXBsZXIgYmluZGluZyBpcyBtaXNzaW5nIG9yIHRoZSBzYW1wbGVyIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX0FCTkRfRVhQRUNURURfVkI6IHNnX2FwcGx5X2JpbmRpbmdzOiB2ZXJ0ZXggYnVmZmVyIGJpbmRpbmcgaXMgbWlzc2luZyBvciBidWZmZXIgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9TVE9SQUdFQlVGRkVSX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiBzdG9yYWdlIGJ1ZmZlciBiaW5kaW5nIGlzIG1pc3Npbmcgb3IgdGhlIGJ1ZmZlciBoYW5kbGUgaXMgaW52YWxpZABWQUxJREFURV9BQk5EX0VYUEVDVEVEX0lNQUdFX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiBpbWFnZSBiaW5kaW5nIGlzIG1pc3Npbmcgb3IgdGhlIGltYWdlIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX1BJUEVMSU5FREVTQ19TSEFERVI6IHNnX3BpcGVsaW5lX2Rlc2Muc2hhZGVyIG1pc3Npbmcgb3IgaW52YWxpZAAhX3NnLmN1cl9wYXNzLnZhbGlkAF9zYXBwLnZhbGlkAF9zZy5nbC52YWxpZABfc2cudmFsaWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgaXMgbm90IHZhbGlkAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9JTUFHRTogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfQ09MT1JfQVRUQUNITUVOVF9JTUFHRTogc2dfYmVnaW5fcGFzczogb25lIG9yIG1vcmUgY29sb3IgYXR0YWNobWVudCBpbWFnZXMgYXJlIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfREVQVEhTVEVOQ0lMX0FUVEFDSE1FTlRfSU1BR0U6IHNnX2JlZ2luX3Bhc3M6IG9uZSBvciBtb3JlIGRlcHRoLXN0ZW5jaWwgYXR0YWNobWVudCBpbWFnZXMgYXJlIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfUkVTT0xWRV9BVFRBQ0hNRU5UX0lNQUdFOiBzZ19iZWdpbl9wYXNzOiBvbmUgb3IgbW9yZSByZXNvbHZlIGF0dGFjaG1lbnQgaW1hZ2VzIGFyZSBub3QgdmFsaWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0U6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGltYWdlIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9DT0xPUkZPUk1BVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uY29sb3JfZm9ybWF0IHRvIGJlIHZhbGlkAGRlc2MtPnNoYWRlci5pZCA9PSBzaGQtPnNsb3QuaWQAYXR0cy0+c2xvdC5pZCA9PSBfc2cuY3VyX3Bhc3MuYXR0c19pZC5pZABibmQtPnBpcC0+c2hhZGVyLT5zbG90LmlkID09IGJuZC0+cGlwLT5jbW4uc2hhZGVyX2lkLmlkAHNoZABWQUxJREFURV9CRUdJTlBBU1NfQ0FOQVJZOiBzZ19iZWdpbl9wYXNzOiBwYXNzIHN0cnVjdCBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0NBTkFSWTogc2dfYXR0YWNobWVudHNfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfU0FNUExFUkRFU0NfQ0FOQVJZOiBzZ19zYW1wbGVyX2Rlc2Mgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX0JVRkZFUkRFU0NfQ0FOQVJZOiBzZ19idWZmZXJfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfU0hBREVSREVTQ19DQU5BUlk6IHNnX3NoYWRlcl9kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9QSVBFTElORURFU0NfQ0FOQVJZOiBzZ19waXBlbGluZV9kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9JTUFHRURFU0NfQ0FOQVJZOiBzZ19pbWFnZV9kZXNjIG5vdCBpbml0aWFsaXplZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTk5BVElWRVdJTkRPV0RFU1RST1lFRDogTmF0aXZlQWN0aXZpdHkgb25OYXRpdmVXaW5kb3dEZXN0cm95ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05JTlBVVFFVRVVFREVTVFJPWUVEOiBOYXRpdmVBY3Rpdml0eSBvbklucHV0UXVldWVEZXN0cm95ZWQAQU5EUk9JRF9VTktOT1dOX01TRzogdW5rbm93biBtc2cgdHlwZSByZWNlaXZlZABQQVNTX1BPT0xfRVhIQVVTVEVEOiBwYXNzIHBvb2wgZXhoYXVzdGVkAFNBTVBMRVJfUE9PTF9FWEhBVVNURUQ6IHNhbXBsZXIgcG9vbCBleGhhdXN0ZWQAQlVGRkVSX1BPT0xfRVhIQVVTVEVEOiBidWZmZXIgcG9vbCBleGhhdXN0ZWQAU0hBREVSX1BPT0xfRVhIQVVTVEVEOiBzaGFkZXIgcG9vbCBleGhhdXN0ZWQAUElQRUxJTkVfUE9PTF9FWEhBVVNURUQ6IHBpcGVsaW5lIHBvb2wgZXhoYXVzdGVkAElNQUdFX1BPT0xfRVhIQVVTVEVEOiBpbWFnZSBwb29sIGV4aGF1c3RlZABBTkRST0lEX0xPT1BfVEhSRUFEX1NUQVJURUQ6IGxvb3AgdGhyZWFkIHN0YXJ0ZWQAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9ERVBUSF9JTUFHRTogc2dfYXBwbHlfYmluZGluZ3M6IGRlcHRoIGltYWdlIGV4cGVjdGVkAFZBTElEQVRFX0FCTkRfRVhQRUNURURfRklMVEVSQUJMRV9JTUFHRTogc2dfYXBwbHlfYmluZGluZ3M6IGZpbHRlcmFibGUgaW1hZ2UgZXhwZWN0ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfQ1JFQVRFX1NVQ0NFU1M6IE5hdGl2ZUFjdGl2aXR5IHN1Y2Nlc3NmdWxseSBjcmVhdGVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OTkFUSVZFV0lORE9XQ1JFQVRFRDogTmF0aXZlQWN0aXZpdHkgb25OYXRpdmVXaW5kb3dDcmVhdGVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OSU5QVVRRVUVVRUNSRUFURUQ6IE5hdGl2ZUFjdGl2aXR5IG9uSW5wdXRRdWV1ZUNyZWF0ZWQAV0lOMzJfV0dMX0FSQl9DUkVBVEVfQ09OVEVYVF9SRVFVSVJFRDogQVJCX2NyZWF0ZV9jb250ZXh0IHJlcXVpcmVkAFdJTjMyX1dHTF9BUkJfQ1JFQVRFX0NPTlRFWFRfUFJPRklMRV9SRVFVSVJFRDogQVJCX2NyZWF0ZV9jb250ZXh0X3Byb2ZpbGUgcmVxdWlyZWQAVkFMSURBVEVfU0hBREVSREVTQ19TT1VSQ0VfT1JfQllURUNPREU6IHNoYWRlciBzb3VyY2Ugb3IgYnl0ZSBjb2RlIHJlcXVpcmVkAFZBTElEQVRFX1NIQURFUkRFU0NfQllURUNPREU6IHNoYWRlciBieXRlIGNvZGUgcmVxdWlyZWQAVkFMSURBVEVfU0hBREVSREVTQ19TT1VSQ0U6IHNoYWRlciBzb3VyY2UgY29kZSByZXF1aXJlZABWQUxJREFURV9TSEFERVJERVNDX05PX0JZVEVDT0RFX1NJWkU6IHNoYWRlciBieXRlIGNvZGUgbGVuZ3RoIChpbiBieXRlcykgcmVxdWlyZWQAVFJBQ0VfSE9PS1NfTk9UX0VOQUJMRUQ6IHNnX2luc3RhbGxfdHJhY2VfaG9va3MoKSBjYWxsZWQsIGJ1dCBTT0tPTF9UUkFDRV9IT09LUyBpcyBub3QgZGVmaW5lZABWQUxJREFURV9JTUFHRURFU0NfTVNBQV9CVVRfTk9fUlQ6IG5vbi1yZW5kZXItdGFyZ2V0IGltYWdlcyBjYW5ub3QgYmUgbXVsdGlzYW1wbGVkAFZBTElEQVRJT05fRkFJTEVEOiB2YWxpZGF0aW9uIGxheWVyIGNoZWNrcyBmYWlsZWQAV0dQVV9DUkVBVEVCSU5ER1JPVVBfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlQmluZEdyb3VwIGZhaWxlZABNQUxMT0NfRkFJTEVEOiBtZW1vcnkgYWxsb2NhdGlvbiBmYWlsZWQATElOVVhfR0xYX0dFVF9WSVNVQUxfRlJPTV9GQkNPTkZJR19GQUlMRUQ6IGdsWEdldFZpc3VhbEZyb21GQkNvbmZpZyBmYWlsZWQAV0dQVV9TSEFERVJfQ1JFQVRFX0JJTkRHUk9VUF9MQVlPVVRfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlQmluZEdyb3VwTGF5b3V0KCkgZm9yIHNoYWRlciBzdGFnZSBmYWlsZWQATElOVVhfRUdMX05PX05BVElWRV9WSVNVQUw6IGVnbEdldENvbmZpZ0F0dHJpYigpIGZvciBFR0xfTkFUSVZFX1ZJU1VBTF9JRCBmYWlsZWQATElOVVhfRUdMX0JJTkRfT1BFTkdMX0VTX0FQSV9GQUlMRUQ6IGVnbEJpbmRBUEkoRUdMX09QRU5HTF9FU19BUEkpIGZhaWxlZABMSU5VWF9FR0xfQklORF9PUEVOR0xfQVBJX0ZBSUxFRDogZWdsQmluZEFQSShFR0xfT1BFTkdMX0FQSSkgZmFpbGVkAExJTlVYX0VHTF9HRVRfRElTUExBWV9GQUlMRUQ6IGVnbEdldERpc3BsYXkoKSBmYWlsZWQATElOVVhfWDExX09QRU5fRElTUExBWV9GQUlMRUQ6IFhPcGVuRGlzcGxheSgpIGZhaWxlZABMSU5VWF9HTFhfQ1JFQVRFX1dJTkRPV19GQUlMRUQ6IGdsWENyZWF0ZVdpbmRvdygpIGZhaWxlZABMSU5VWF9YMTFfQ1JFQVRFX1dJTkRPV19GQUlMRUQ6IFhDcmVhdGVXaW5kb3coKSBmYWlsZWQAV0dQVV9DUkVBVEVfVEVYVFVSRV9WSUVXX0ZBSUxFRDogd2dwdVRleHR1cmVDcmVhdGVWaWV3KCkgZmFpbGVkAExJTlVYX0VHTF9DUkVBVEVfQ09OVEVYVF9GQUlMRUQ6IGVnbENyZWF0ZUNvbnRleHQoKSBmYWlsZWQAV0dQVV9DUkVBVEVfUElQRUxJTkVfTEFZT1VUX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVBpcGVsaW5lTGF5b3V0KCkgZmFpbGVkAExJTlVYX0VHTF9NQUtFX0NVUlJFTlRfRkFJTEVEOiBlZ2xNYWtlQ3VycmVudCgpIGZhaWxlZABXR1BVX0NSRUFURV9TQU1QTEVSX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVNhbXBsZXIoKSBmYWlsZWQAV0dQVV9DUkVBVEVfQlVGRkVSX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZUJ1ZmZlcigpIGZhaWxlZABMSU5VWF9FR0xfR0VUX1ZJU1VBTF9JTkZPX0ZBSUxFRDogWEdldFZpc3VhbEluZm8oKSBmYWlsZWQATElOVVhfRUdMX0lOSVRJQUxJWkVfRkFJTEVEOiBlZ2xJbml0aWFsaXplKCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1RFWFRVUkVfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlVGV4dHVyZSgpIGZhaWxlZABXR1BVX0NSRUFURV9SRU5ERVJfUElQRUxJTkVfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlUmVuZGVyUGlwZWxpbmUoKSBmYWlsZWQAV0dQVV9DUkVBVEVfU0hBREVSX01PRFVMRV9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVTaGFkZXJNb2R1bGUoKSBmYWlsZWQATElOVVhfRUdMX0NSRUFURV9XSU5ET1dfU1VSRkFDRV9GQUlMRUQ6IGVnbENyZWF0ZVdpbmRvd1N1cmZhY2UoKSBmYWlsZWQAV0lOMzJfR0VUX1JBV19JTlBVVF9EQVRBX0ZBSUxFRDogR2V0UmF3SW5wdXREYXRhKCkgZmFpbGVkAF9zYXBwX2Vtc2Nfc2l6ZV9jaGFuZ2VkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OV0lORE9XRk9DVVNDSEFOR0VEOiBOYXRpdmVBY3Rpdml0eSBvbldpbmRvd0ZvY3VzQ2hhbmdlZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkNPTkZJR1VSQVRJT05DSEFOR0VEOiBOYXRpdmVBY3Rpdml0eSBvbkNvbmZpZ3VyYXRpb25DaGFuZ2VkAFZBTElEQVRFX0FCTkRfSUI6IHNnX2FwcGx5X2JpbmRpbmdzOiBwaXBlbGluZSBvYmplY3QgZGVmaW5lcyBub24taW5kZXhlZCByZW5kZXJpbmcsIGJ1dCBpbmRleCBidWZmZXIgcHJvdmlkZWQAVkFMSURBVEVfQUJORF9OT19JQjogc2dfYXBwbHlfYmluZGluZ3M6IHBpcGVsaW5lIG9iamVjdCBkZWZpbmVzIGluZGV4ZWQgcmVuZGVyaW5nLCBidXQgbm8gaW5kZXggYnVmZmVyIHByb3ZpZGVkAFZBTElEQVRFX0FQSVBfUElQRUxJTkVfVkFMSURfSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBpbnZhbGlkIHBpcGVsaW5lIGlkIHByb3ZpZGVkAE51bXBhZEFkZABfY29tcHJlc3NlZF90ZXh0dXJlX2FzdGMAX3RleHR1cmVfY29tcHJlc3Npb25fcHZydGMAV0VCS0lUX1dFQkdMX2NvbXByZXNzZWRfdGV4dHVyZV9wdnJ0YwBfdGV4dHVyZV9jb21wcmVzc2lvbl9icHRjAF90ZXh0dXJlX2NvbXByZXNzaW9uX3JndGMAX2NvbXByZXNzZWRfdGV4dHVyZV9ldGMAX3RleHR1cmVfY29tcHJlc3Npb25fczN0YwBfY29tcHJlc3NlZF90ZXh0dXJlX3MzdGMAX3NnX3ZhbGlkYXRlX2J1ZmZlcl9kZXNjAF9zZ192YWxpZGF0ZV9zaGFkZXJfZGVzYwBfc2FwcF92YWxpZGF0ZV9pY29uX2Rlc2MAX3NnX3ZhbGlkYXRlX3BpcGVsaW5lX2Rlc2MAVkFMSURBVEVfQUJORF9JTUFHRV9UWVBFX01JU01BVENIOiBzZ19hcHBseV9iaW5kaW5nczogdHlwZSBvZiBib3VuZCBpbWFnZSBkb2Vzbid0IG1hdGNoIHNoYWRlciBkZXNjAGJ1ZiAmJiBkZXNjAHBpcCAmJiBzaGQgJiYgZGVzYwBzcmMAX3NhcHBfbWFsbG9jAF9zZ19tYWxsb2MAX3NnX3Nsb3RfYWxsb2MAX3NnX2dsX2NvbXBhcmVfZnVuYwBfdGV4dHVyZV9maWx0ZXJfYW5pc290cm9waWMAcGFuaWMAdmIAYXR0cy0+Z2wuZmIAVGFiAFZBTElEQVRFX0JVRkZFUkRFU0NfTk9fREFUQTogZHluYW1pYy9zdHJlYW0gdXNhZ2UgYnVmZmVycyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAFZBTElEQVRFX0lNQUdFREVTQ19JTkpFQ1RFRF9OT19EQVRBOiBpbWFnZXMgd2l0aCBpbmplY3RlZCB0ZXh0dXJlcyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAFZBTElEQVRFX0lNQUdFREVTQ19SVF9OT19EQVRBOiByZW5kZXIgdGFyZ2V0IGltYWdlcyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAFZBTElEQVRFX0lNQUdFREVTQ19EWU5BTUlDX05PX0RBVEE6IGR5bmFtaWMvc3RyZWFtIGltYWdlcyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAENvbW1hAGRlc2MtPmdsX2J1ZmZlcnNbc2xvdF0AWwBLZXlaAEtleVkAQU5EUk9JRF9NU0dfREVTVFJPWTogTVNHX0RFU1RST1kAS2V5WABLZXlXAEFORFJPSURfTVNHX1NFVF9OQVRJVkVfV0lORE9XOiBNU0dfU0VUX05BVElWRV9XSU5ET1cAS2V5VgBLZXlVAEtleVQAS2V5UwBBTkRST0lEX01TR19OT19GT0NVUzogTVNHX05PX0ZPQ1VTAEFORFJPSURfTVNHX0ZPQ1VTOiBNU0dfRk9DVVMAaW1nX3NtcC0+c2FtcGxlcl9zbG90IDwgU0dfTUFYX1NBTVBMRVJfQklORFNMT1RTAGFfc3RhdGUtPmJ1ZmZlcl9pbmRleCA8IFNHX01BWF9WRVJURVhCVUZGRVJfQklORFNMT1RTAGF0dHItPnZiX2luZGV4IDwgU0dfTUFYX1ZFUlRFWEJVRkZFUl9CSU5EU0xPVFMAaW1nX3NtcC0+aW1hZ2Vfc2xvdCA8IFNHX01BWF9JTUFHRV9CSU5EU0xPVFMAX3NnLmxpbWl0cy5tYXhfdmVydGV4X2F0dHJzIDw9IFNHX01BWF9WRVJURVhfQVRUUklCVVRFUwBudW1faW1hZ2VzIDw9IFNBUFBfTUFYX0lDT05JTUFHRVMAS2V5UgBWQUxJREFURV9BQk5EX1VORVhQRUNURURfU0FNUExFUl9DT01QQVJFX05FVkVSOiBzZ19hcHBseV9iaW5kaW5nczogc2hhZGVyIGV4cGVjdHMgU0dfU0FNUExFUlRZUEVfQ09NUEFSSVNPTiBidXQgc2FtcGxlciBoYXMgU0dfQ09NUEFSRUZVTkNfTkVWRVIAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9TQU1QTEVSX0NPTVBBUkVfTkVWRVI6IHNnX2FwcGx5X2JpbmRpbmdzOiBzaGFkZXIgZXhwZWN0cyBTR19TQU1QTEVSVFlQRV9GSUxURVJJTkcgb3IgU0dfU0FNUExFUlRZUEVfTk9ORklMVEVSSU5HIGJ1dCBzYW1wbGVyIGRvZXNuJ3QgaGF2ZSBTR19DT01QQVJFRlVOQ19ORVZFUgBWQUxJREFURV9BQk5EX1ZCX1RZUEU6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgaW4gdmVydGV4IGJ1ZmZlciBzbG90IGlzIG5vdCBhIFNHX0JVRkZFUlRZUEVfVkVSVEVYQlVGRkVSAFZBTElEQVRFX0FCTkRfSUJfVFlQRTogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiBpbmRleCBidWZmZXIgc2xvdCBpcyBub3QgYSBTR19CVUZGRVJUWVBFX0lOREVYQlVGRkVSAFZBTElEQVRFX1NBTVBMRVJERVNDX0FOSVNUUk9QSUNfUkVRVUlSRVNfTElORUFSX0ZJTFRFUklORzogc2dfc2FtcGxlcl9kZXNjLm1heF9hbmlzb3Ryb3B5ID4gMSByZXF1aXJlcyBtaW4vbWFnL21pcG1hcF9maWx0ZXIgdG8gYmUgU0dfRklMVEVSX0xJTkVBUgBLZXlRAEtleVAAS2V5TwBLZXlOAEtleU0AS2V5TABMSU5VWF9HTFhfTE9BRF9MSUJHTF9GQUlMRUQ6IGZhaWxlZCB0byBsb2FkIGxpYkdMAHNsb3QtPnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfSU5JVElBTABLZXlLAEtleUoAS2V5SQBLZXlIAEtleUcAS2V5RgBLZXlFAEFORFJPSURfTVNHX1NFVF9JTlBVVF9RVUVVRTogTVNHX1NFVF9JTlBVVF9RVUVVRQBBTkRST0lEX01TR19DUkVBVEU6IE1TR19DUkVBVEUAQU5EUk9JRF9NU0dfUEFVU0U6IE1TR19QQVVTRQBwYXNzX2RlZi5zd2FwY2hhaW4uY29sb3JfZm9ybWF0ID4gU0dfUElYRUxGT1JNQVRfTk9ORQBBTkRST0lEX01TR19SRVNVTUU6IE1TR19SRVNVTUUAVkFMSURBVEVfSU1BR0VERVNDX1JUX0lNTVVUQUJMRTogcmVuZGVyIHRhcmdldCBpbWFnZXMgbXVzdCBiZSBTR19VU0FHRV9JTU1VVEFCTEUAS2V5RABzbG90LT5pZCA9PSBTR19JTlZBTElEX0lEAGJpbmRpbmdzLT5zYW1wbGVyc1tpXS5pZCAhPSBTR19JTlZBTElEX0lEAGJpbmRpbmdzLT52ZXJ0ZXhfYnVmZmVyc1tpXS5pZCAhPSBTR19JTlZBTElEX0lEAGJpbmRpbmdzLT5zdG9yYWdlX2J1ZmZlcnNbaV0uaWQgIT0gU0dfSU5WQUxJRF9JRABiaW5kaW5ncy0+aW1hZ2VzW2ldLmlkICE9IFNHX0lOVkFMSURfSUQAVkFMSURBVEVfQkVHSU5QQVNTX0FUVEFDSE1FTlRTX1ZBTElEOiBzZ19iZWdpbl9wYXNzOiBhdHRhY2htZW50cyBvYmplY3Qgbm90IGluIHJlc291cmNlIHN0YXRlIFZBTElEAEtleUMAV0lOMzJfSEVMUEVSX1dJTkRPV19HRVREQ19GQUlMRUQ6IGZhaWxlZCB0byBnZXQgaGVscGVyIHdpbmRvdyBEQwBLZXlCAExJTlVYX0dMWF9DUkVBVEVfQ09OVEVYVF9GQUlMRUQ6IEZhaWxlZCB0byBjcmVhdGUgR0wgY29udGV4dCB2aWEgZ2xYQ3JlYXRlQ29udGV4dEF0dHJpYnNBUkIAV0lOMzJfV0dMX0lOQ09NUEFUSUJMRV9ERVZJQ0VfQ09OVEVYVDogQ3JlYXRlQ29udGV4dEF0dHJpYnNBUkIgZmFpbGVkIHdpdGggRVJST1JfSU5DT01QQVRJQkxFX0RFVklDRV9DT05URVhUU19BUkIAS2V5QQA8ZmA8BmY8AFtsaW5lOgBbaWQ6AERpZ2l0OQBOdW1wYWQ5AEY5AERpZ2l0OABOdW1wYWQ4AEY4AHNsb3QgPCAxMjgARGlnaXQ3AE51bXBhZDcARjcARGlnaXQ2AE51bXBhZDYARjYARGlnaXQ1AE51bXBhZDUARjUARGlnaXQ0AE51bXBhZDQARjQAc2xvdCA8IDY0AFZBTElEQVRFX1BJUEVMSU5FREVTQ19MQVlPVVRfU1RSSURFNDogc2dfcGlwZWxpbmVfZGVzYy5sYXlvdXQuYnVmZmVyc1tdLnN0cmlkZSBtdXN0IGJlIG11bHRpcGxlIG9mIDQAVkFMSURBVEVfQlVGRkVSREVTQ19TVE9SQUdFQlVGRkVSX1NJWkVfTVVMVElQTEVfNDogc2l6ZSBvZiBzdG9yYWdlIGJ1ZmZlcnMgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQARGlnaXQzAE51bXBhZDMARjMARGlnaXQyAE51bXBhZDIARjIAX3NnX2FsaWduX3UzMgBGMTIARGlnaXQxAE51bXBhZDEARjEAVkFMSURBVEVfQUJORF9JTUFHRV9NU0FBOiBzZ19hcHBseV9iaW5kaW5nczogY2Fubm90IGJpbmQgaW1hZ2Ugd2l0aCBzYW1wbGVfY291bnQ+MQBGMTEAZ2xfYXR0ci0+dmJfaW5kZXggPT0gLTEAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfU0FNUExFX0NPVU5UOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpbWFnZSBzYW1wbGUgY291bnQgbXVzdCBiZSAxAFZBTElEQVRFX0lNQUdFREVTQ19NU0FBXzNEX0lNQUdFOiAzRCBpbWFnZXMgY2Fubm90IGhhdmUgYSBzYW1wbGVfY291bnQgPiAxAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0NPTE9SX0lNQUdFX01TQUE6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50cyBtdXN0IGhhdmUgYSBjb2xvciBhdHRhY2htZW50IGltYWdlIHdpdGggc2FtcGxlIGNvdW50ID4gMQBWQUxJREFURV9TSEFERVJERVNDX1VCX0FSUkFZX0NPVU5UOiB1bmlmb3JtIGFycmF5IGNvdW50IG11c3QgYmUgPj0gMQBWQUxJREFURV9JTUFHRURFU0NfTVNBQV9OVU1fTUlQTUFQUzogTVNBQSBpbWFnZXMgbXVzdCBoYXZlIG51bV9taXBtYXBzID09IDEARGlnaXQwAGNvbG9yMABOdW1wYWQwAEYxMABMSU5VWF9YMTFfUVVFUllfU1lTVEVNX0RQSV9GQUlMRUQ6IGZhaWxlZCB0byBxdWVyeSBzeXN0ZW0gZHBpIHZhbHVlLCBhc3N1bWluZyBkZWZhdWx0IDk2LjAAVkFMSURBVEVfQlVGRkVSREVTQ19TSVpFOiBzZ19idWZmZXJfZGVzYy5zaXplIGFuZCAuZGF0YS5zaXplIGNhbm5vdCBib3RoIGJlIDAAYXJyYXlfY291bnQgPiAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1NBTVBMRUNPVU5UOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5zYW1wbGVfY291bnQgPiAwAHBhc3NfZGVmLnN3YXBjaGFpbi5zYW1wbGVfY291bnQgPiAwAGRlc2MtPmhlaWdodCA+IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfSEVJR0hUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5oZWlnaHQgPiAwAHBhc3NfZGVmLnN3YXBjaGFpbi5oZWlnaHQgPiAwAGRlc2MtPm1heF9jb21taXRfbGlzdGVuZXJzID4gMAB0LT5udW0gPiAwAGRlc2MtPndpZHRoID4gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9XSURUSDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2lkdGggPiAwAHBhc3NfZGVmLnN3YXBjaGFpbi53aWR0aCA+IDAAdWJfZGVzYy0+c2l6ZSA+IDAAZGVzYy0+cGl4ZWxzLnNpemUgPiAwAGxfc3RhdGUtPnN0cmlkZSA+IDAAVkFMSURBVEVfSU1BR0VERVNDX0hFSUdIVDogc2dfaW1hZ2VfZGVzYy5oZWlnaHQgbXVzdCBiZSA+IDAAVkFMSURBVEVfSU1BR0VERVNDX1dJRFRIOiBzZ19pbWFnZV9kZXNjLndpZHRoIG11c3QgYmUgPiAwAGRlc2MtPnNhbXBsZV9jb3VudCA+PSAwAGJhc2VfZWxlbWVudCA+PSAwAGRlc2MtPmhlaWdodCA+PSAwAG51bV9lbGVtZW50cyA+PSAwAGRlc2MtPm1heF9kcm9wcGVkX2ZpbGVzID49IDAAbnVtX2luc3RhbmNlcyA+PSAwAGRlc2MtPnN3YXBfaW50ZXJ2YWwgPj0gMABkZXNjLT5tYXhfZHJvcHBlZF9maWxlX3BhdGhfbGVuZ3RoID49IDAAZGVzYy0+d2lkdGggPj0gMABkZXNjLT5jbGlwYm9hcmRfc2l6ZSA+PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfUkVOREVSVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUucmVuZGVyX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRU5ERVJWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEucmVuZGVyX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX0RFUFRIU1RFTkNJTFZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LmRlcHRoX3N0ZW5jaWxfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX0RFUFRIU1RFTkNJTFZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5kZXB0aF9zdGVuY2lsX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFU09MVkVWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5yZXNvbHZlX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRVNPTFZFVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLnJlc29sdmVfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1NBTVBMRUNPVU5UX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uc2FtcGxlX2NvdW50ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfSEVJR0hUX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uaGVpZ2h0ID09IDAAX3NnLmN1cl9wYXNzLmF0dHMgPT0gMAB1Yi0+bnVtX3VuaWZvcm1zID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9HTF9FWFBFQ1RfRlJBTUVCVUZGRVJfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5nbC5mcmFtZWJ1ZmZlciA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1dJRFRIX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2lkdGggPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9NU0FBQ09MT1JURVhUVVJFX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwubXNhYV9jb2xvcl90ZXh0dXJlID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfREVQVEhTVEVOQ0lMVEVYVFVSRV9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLmRlcHRoX3N0ZW5jaWxfdGV4dHVyZSA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX0NVUlJFTlREUkFXQUJMRV9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLmN1cnJlbnRfZHJhd2FibGUgPT0gMAAoZGltICUgOCkgPT0gMABnbEdldEVycm9yKCkgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFTkRFUlZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUucmVuZGVyX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRU5ERVJWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5yZW5kZXJfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfREVQVEhTVEVOQ0lMVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5kZXB0aF9zdGVuY2lsX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9ERVBUSFNURU5DSUxWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5kZXB0aF9zdGVuY2lsX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFU09MVkVWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LnJlc29sdmVfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX1JFU09MVkVWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5yZXNvbHZlX3ZpZXcgIT0gMABkZXNjLT5waXhlbHMucHRyICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfTVNBQUNPTE9SVEVYVFVSRTogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwubXNhYV9jb2xvcl90ZXh0dXJlICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfREVQVEhTVEVOQ0lMVEVYVFVSRTogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwuZGVwdGhfc3RlbmNpbF90ZXh0dXJlICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfQ1VSUkVOVERSQVdBQkxFOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5jdXJyZW50X2RyYXdhYmxlICE9IDAAV0lOMzJfRDNEMTFfQ1JFQVRFX0RFVklDRV9BTkRfU1dBUENIQUlOX1dJVEhfREVCVUdfRkFJTEVEOiBEM0QxMUNyZWF0ZURldmljZUFuZFN3YXBDaGFpbigpIHdpdGggRDNEMTFfQ1JFQVRFX0RFVklDRV9ERUJVRyBmYWlsZWQsIHJldHJ5aW5nIHdpdGhvdXQgZGVidWcgZmxhZy4AVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX1JFQURPTkxZOiBzaGFkZXIgc3RhZ2Ugc3RvcmFnZSBidWZmZXJzIG11c3QgYmUgcmVhZG9ubHkgKHNnX3NoYWRlcl9kZXNjLnN0b3JhZ2VfYnVmZmVyc1tdLnJlYWRvbmx5KQBXR1BVX0JJTkRHUk9VUFNDQUNIRV9TSVpFX1BPVzI6IHNnX2Rlc2Mud2dwdV9iaW5kZ3JvdXBzX2NhY2hlX3NpemUgbXVzdCBiZSBhIHBvd2VyIG9mIDIgKHdncHUpAFdHUFVfQklOREdST1VQU0NBQ0hFX1NJWkVfR1JFQVRFUl9PTkU6IHNnX2Rlc2Mud2dwdV9iaW5kZ3JvdXBzX2NhY2hlX3NpemUgbXVzdCBiZSA+IDEgKHdncHUpAFdHUFVfQklOREdST1VQU19QT09MX0VYSEFVU1RFRDogYmluZGdyb3VwcyBwb29sIGV4aGF1c3RlZCAoaW5jcmVhc2Ugc2dfZGVzYy5iaW5kZ3JvdXBzX2NhY2hlX3NpemUpICh3Z3B1KQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfTk9UX1JFRkVSRU5DRURfQllfSU1BR0VfU0FNUExFUl9QQUlSUzogb25lIG9yIG1vcmUgc2FtcGxlcnMgYXJlIG5vdCByZWZlcmVuY2VkIGJ5IGltYWdlLXNhbXBsZXItcGFpcnMgKHNnX3NoYWRlcl9kZXNjLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5zYW1wbGVyX3Nsb3QpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX1NBTVBMRVJfU0xPVF9PVVRfT0ZfUkFOR0U6IGltYWdlLXNhbXBsZXItcGFpciBzYW1wbGVyIHNsb3QgaW5kZXggaXMgb3V0IG9mIHJhbmdlIChzZ19zaGFkZXJfZGVzYy5pbWFnZV9zYW1wbGVyX3BhaXJzW10uc2FtcGxlcl9zbG90KQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX05PVF9SRUZFUkVOQ0VEX0JZX0lNQUdFX1NBTVBMRVJfUEFJUlM6IG9uZSBvciBtb3JlIGltYWdlcyBhcmUgbm90IHJlZmVyZW5jZWQgYnkgYnkgaW1hZ2Utc2FtcGxlci1wYWlycyAoc2dfc2hhZGVyX2Rlc2MuaW1hZ2Vfc2FtcGxlcl9wYWlyc1tdLmltYWdlX3Nsb3QpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX0lNQUdFX1NMT1RfT1VUX09GX1JBTkdFOiBpbWFnZS1zYW1wbGVyLXBhaXIgaW1hZ2Ugc2xvdCBpbmRleCBpcyBvdXQgb2YgcmFuZ2UgKHNnX3NoYWRlcl9kZXNjLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5pbWFnZV9zbG90KQAoMHg4ODkyID09IHRhcmdldCkgfHwgKDB4ODg5MyA9PSB0YXJnZXQpIHx8ICgweDkwRDIgPT0gdGFyZ2V0KQBJTUFHRV9EQVRBX1NJWkVfTUlTTUFUQ0g6IGltYWdlIGRhdGEgc2l6ZSBtaXNtYXRjaCAobXVzdCBiZSB3aWR0aCpoZWlnaHQqNCBieXRlcykAKGluZGV4ID49IDApICYmIChpbmRleCA8PSBfc2FwcC5kcm9wLm1heF9maWxlcykAVHJpYW5nbGUgKHNva29sLWFwcCkAVkFMSURBVEVfSU1BR0VEQVRBX05PREFUQTogc2dfaW1hZ2VfZGF0YTogbm8gZGF0YSAoLnB0ciBhbmQvb3IgLnNpemUgaXMgemVybykAKGRlc2MtPmFsbG9jYXRvci5hbGxvY19mbiAmJiBkZXNjLT5hbGxvY2F0b3IuZnJlZV9mbikgfHwgKCFkZXNjLT5hbGxvY2F0b3IuYWxsb2NfZm4gJiYgIWRlc2MtPmFsbG9jYXRvci5mcmVlX2ZuKQBHTF9WRVJURVhfQVRUUklCVVRFX05PVF9GT1VORF9JTl9TSEFERVI6IHZlcnRleCBhdHRyaWJ1dGUgbm90IGZvdW5kIGluIHNoYWRlciAoZ2wpAEdMX0lNQUdFX1NBTVBMRVJfTkFNRV9OT1RfRk9VTkRfSU5fU0hBREVSOiBpbWFnZS1zYW1wbGVyIG5hbWUgbm90IGZvdW5kIGluIHNoYWRlciAoZ2wpAEdMX1RFWFRVUkVfRk9STUFUX05PVF9TVVBQT1JURUQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciB0ZXh0dXJlIChnbCkAR0xfQVJSQVlfVEVYVFVSRVNfTk9UX1NVUFBPUlRFRDogYXJyYXkgdGV4dHVyZXMgbm90IHN1cHBvcnRlZCAoZ2wpAEdMXzNEX1RFWFRVUkVTX05PVF9TVVBQT1JURUQ6IDNkIHRleHR1cmVzIG5vdCBzdXBwb3J0ZWQgKGdsKQBHTF9TSEFERVJfQ09NUElMQVRJT05fRkFJTEVEOiBzaGFkZXIgY29tcGlsYXRpb24gZmFpbGVkIChnbCkAR0xfU0hBREVSX0xJTktJTkdfRkFJTEVEOiBzaGFkZXIgbGlua2luZyBmYWlsZWQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfSU5DT01QTEVURV9NSVNTSU5HX0FUVEFDSE1FTlQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19JTkNPTVBMRVRFX0FUVEFDSE1FTlQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0FUVEFDSE1FTlQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfSU5DT01QTEVURV9NVUxUSVNBTVBMRTogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTVVMVElTQU1QTEUgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfVU5TVVBQT1JURUQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9VTlNVUFBPUlRFRCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19VTkRFRklORUQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9VTkRFRklORUQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfVU5LTk9XTjogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCAodW5rbm93biByZWFzb24pIChnbCkATUVUQUxfQ1JFQVRFX1NBTVBMRVJfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHNhbXBsZXIgb2JqZWN0IChtZXRhbCkATUVUQUxfQ1JFQVRFX0JVRkZFUl9GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgYnVmZmVyIG9iamVjdCAobWV0YWwpAE1FVEFMX0NSRUFURV9URVhUVVJFX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSB0ZXh0dXJlIG9iamVjdCAobWV0YWwpAE1FVEFMX0NSRUFURV9EU1NfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIGRlcHRoIHN0ZW5jaWwgc3RhdGUgKG1ldGFsKQBNRVRBTF9DUkVBVEVfUlBTX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSByZW5kZXIgcGlwZWxpbmUgc3RhdGUgKG1ldGFsKQBNRVRBTF9URVhUVVJFX0ZPUk1BVF9OT1RfU1VQUE9SVEVEOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgdGV4dHVyZSAobWV0YWwpAE1FVEFMX1NIQURFUl9FTlRSWV9OT1RfRk9VTkQ6IHNoYWRlciBlbnRyeSBmdW5jdGlvbiBub3QgZm91bmQgKG1ldGFsKQBNRVRBTF9TSEFERVJfQ09NUElMQVRJT05fRkFJTEVEOiBzaGFkZXIgY29tcGlsYXRpb24gZmFpbGVkIChtZXRhbCkATUVUQUxfU0hBREVSX0NSRUFUSU9OX0ZBSUxFRDogc2hhZGVyIGNyZWF0aW9uIGZhaWxlZCAobWV0YWwpAFdJTjMyX1JFR0lTVEVSX1JBV19JTlBVVF9ERVZJQ0VTX0ZBSUxFRF9NT1VTRV9VTkxPQ0s6IFJlZ2lzdGVyUmF3SW5wdXREZXZpY2VzKCkgZmFpbGVkIChvbiBtb3VzZSB1bmxvY2spAFdJTjMyX1JFR0lTVEVSX1JBV19JTlBVVF9ERVZJQ0VTX0ZBSUxFRF9NT1VTRV9MT0NLOiBSZWdpc3RlclJhd0lucHV0RGV2aWNlcygpIGZhaWxlZCAob24gbW91c2UgbG9jaykARFJPUFBFRF9GSUxFX1BBVEhfVE9PX0xPTkc6IGRyb3BwZWQgZmlsZSBwYXRoIHRvbyBsb25nIChzYXBwX2Rlc2MubWF4X2Ryb3BwZWRfZmlsZWRfcGF0aF9sZW5ndGgpACFfc2FwcF9yaW5nX2VtcHR5KHJpbmcpACFfc2FwcF9yaW5nX2Z1bGwocmluZykAKHNsb3RfaW5kZXggPiAwKSAmJiAoc2xvdF9pbmRleCA8IHBvb2wtPnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHBvb2wtPnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPmF0dGFjaG1lbnRzX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+c2FtcGxlcl9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPmJ1ZmZlcl9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPnNoYWRlcl9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPnBpcGVsaW5lX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+aW1hZ2VfcG9vbC5zaXplKQBWQUxJREFURV9CVUZGRVJERVNDX0RBVEE6IGltbXV0YWJsZSBidWZmZXJzIG11c3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhIChzZ19idWZmZXJfZGVzYy5kYXRhLnB0ciBhbmQgc2dfYnVmZmVyX2Rlc2MuZGF0YS5zaXplKQBwICYmIChTR19JTlZBTElEX0lEICE9IGF0dHNfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gc21wX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IHBpcF9pZCkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBpbWdfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gYnVmX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IHNoZF9pZCkAYm5kLnBpcC0+c2hhZGVyICYmIChibmQucGlwLT5jbW4uc2hhZGVyX2lkLmlkID09IGJuZC5waXAtPnNoYWRlci0+c2xvdC5pZCkAcGlwLT5zaGFkZXIgJiYgKHBpcC0+Y21uLnNoYWRlcl9pZC5pZCA9PSBwaXAtPnNoYWRlci0+c2xvdC5pZCkAcGlwLT5zaGFkZXIgJiYgKHBpcC0+c2hhZGVyLT5zbG90LmlkID09IHBpcC0+Y21uLnNoYWRlcl9pZC5pZCkAKHNyYy0+c2FtcGxlcl9zbG90ID49IDApICYmIChzcmMtPnNhbXBsZXJfc2xvdCA8IFNHX01BWF9TQU1QTEVSX0JJTkRTTE9UUykAc2J1Zl9kZXNjLT5nbHNsX2JpbmRpbmdfbiA8ICgyICogU0dfTUFYX1NUT1JBR0VCVUZGRVJfQklORFNMT1RTKQAoc3JjLT5pbWFnZV9zbG90ID49IDApICYmIChzcmMtPmltYWdlX3Nsb3QgPCBTR19NQVhfSU1BR0VfQklORFNMT1RTKQAoZGVzYy0+Y29sb3JfY291bnQgPj0gMCkgJiYgKGRlc2MtPmNvbG9yX2NvdW50IDw9IFNHX01BWF9DT0xPUl9BVFRBQ0hNRU5UUykAYXR0cyAmJiAoaW5kZXggPj0gMCkgJiYgKGluZGV4IDwgU0dfTUFYX0NPTE9SX0FUVEFDSE1FTlRTKQAobnVtX2ltYWdlcyA+IDApICYmIChudW1faW1hZ2VzIDw9IFNBUFBfTUFYX0lDT05JTUFHRVMpAChkZXNjLT5hdHRhY2htZW50c19wb29sX3NpemUgPiAwKSAmJiAoZGVzYy0+YXR0YWNobWVudHNfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5zYW1wbGVyX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5zYW1wbGVyX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAoZGVzYy0+YnVmZmVyX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5idWZmZXJfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5zaGFkZXJfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPnNoYWRlcl9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPnBpcGVsaW5lX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5waXBlbGluZV9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPmltYWdlX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5pbWFnZV9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKHBpcC0+c2hhZGVyID09IDApICYmIChwaXAtPmNtbi5zaGFkZXJfaWQuaWQgIT0gU0dfSU5WQUxJRF9JRCkAKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKXx8KHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpfHwoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCl8fChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAcGlwICYmIChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAYnVmICYmIChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAc2hkICYmIChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAV0lOMzJfV0dMX09QRU5HTF9WRVJTSU9OX05PVF9TVVBQT1JURUQ6IHJlcXVlc3RlZCBPcGVuR0wgdmVyc2lvbiBub3Qgc3VwcG9ydGVkIGJ5IEdMIGRyaXZlciAoRVJST1JfSU5WQUxJRF9WRVJTSU9OX0FSQikAV0lOMzJfV0dMX09QRU5HTF9QUk9GSUxFX05PVF9TVVBQT1JURUQ6IHJlcXVlc3RlZCBPcGVuR0wgcHJvZmlsZSBub3Qgc3VwcG9ydCBieSBHTCBkcml2ZXIgKEVSUk9SX0lOVkFMSURfUFJPRklMRV9BUkIpAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9XR1NMX0dST1VQMV9CSU5ESU5HX09VVF9PRl9SQU5HRTogc2FtcGxlciAnd2dzbF9ncm91cDFfYmluZGluZ19uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTI3KQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfV0dTTF9HUk9VUDFfQklORElOR19PVVRfT0ZfUkFOR0U6IHN0b3JhZ2UgYnVmZmVyICd3Z3NsX2dyb3VwMV9iaW5kaW5nX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4xMjcpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfV0dTTF9HUk9VUDFfQklORElOR19PVVRfT0ZfUkFOR0U6IGltYWdlICd3Z3NsX2dyb3VwMV9iaW5kaW5nX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4xMjcpAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfTUVUQUxfQlVGRkVSX1NMT1RfT1VUX09GX1JBTkdFOiB1bmlmb3JtIGJsb2NrICdtc2xfYnVmZmVyX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi43KQBWQUxJREFURV9TSEFERVJERVNDX1VCX0hMU0xfUkVHSVNURVJfQl9PVVRfT0ZfUkFOR0U6IHVuaWZvcm0gYmxvY2sgJ2hsc2xfcmVnaXN0ZXJfYl9uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uNykAVkFMSURBVEVfU0hBREVSREVTQ19BVFRSX1NUUklOR19UT09fTE9ORzogdmVydGV4IGF0dHJpYnV0ZSBuYW1lL3NlbWFudGljIHN0cmluZyB0b28gbG9uZyAobWF4IGxlbiAxNikAVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX01FVEFMX0JVRkZFUl9TTE9UX09VVF9PRl9SQU5HRTogc3RvcmFnZSBidWZmZXIgJ21zbF9idWZmZXJfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDguLjE1KQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfSExTTF9SRUdJU1RFUl9TX09VVF9PRl9SQU5HRTogc2FtcGxlciAnaGxzbF9yZWdpc3Rlcl9zX24nIGlzIG91dCBvZiByYW5nIChtdXN0IGJlIDAuLjE1KQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfTUVUQUxfU0FNUExFUl9TTE9UX09VVF9PRl9SQU5HRTogc2FtcGxlciAnbXNsX3NhbXBsZXJfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjE1KQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfR0xTTF9CSU5ESU5HX09VVF9PRl9SQU5HRTogc3RvcmFnZSBidWZmZXIgJ2dsc2xfYmluZGluZ19uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfV0dTTF9HUk9VUDBfQklORElOR19PVVRfT0ZfUkFOR0U6IHVuaWZvcm0gYmxvY2sgJ3dnc2xfZ3JvdXAwX2JpbmRpbmdfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjE1KQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX01FVEFMX1RFWFRVUkVfU0xPVF9PVVRfT0ZfUkFOR0U6IGltYWdlICdtc2xfdGV4dHVyZV9uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9ITFNMX1JFR0lTVEVSX1RfT1VUX09GX1JBTkdFOiBzdG9yYWdlIGJ1ZmZlciAnaGxzbF9yZWdpc3Rlcl90X24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4yMykAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9ITFNMX1JFR0lTVEVSX1RfT1VUX09GX1JBTkdFOiBpbWFnZSAnaGxzbF9yZWdpc3Rlcl90X24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4yMykAVkFMSURBVEVfQlVGRkVSREVTQ19TVE9SQUdFQlVGRkVSX1NVUFBPUlRFRDogc3RvcmFnZSBidWZmZXJzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGJhY2tlbmQgM0QgQVBJIChyZXF1aXJlcyBPcGVuR0wgPj0gNC4zKQBMSU5VWF9HTFhfVkVSU0lPTl9UT09fTE9XOiBHTFggdmVyc2lvbiB0b28gbG93IChuZWVkIGF0IGxlYXN0IDEuMykARDNEMTFfQ1JFQVRFX0NPTlNUQU5UX0JVRkZFUl9GQUlMRUQ6IENyZWF0ZUJ1ZmZlcigpIGZhaWxlZCBmb3IgdW5pZm9ybSBjb25zdGFudCBidWZmZXIgKGQzZDExKQBEM0QxMV9NQVBfRk9SX0FQUEVORF9CVUZGRVJfRkFJTEVEOiBNYXAoKSBmYWlsZWQgd2hlbiBhcHBlbmRpbmcgdG8gYnVmZmVyIChkM2QxMSkARDNEMTFfTUFQX0ZPUl9VUERBVEVfQlVGRkVSX0ZBSUxFRDogTWFwKCkgZmFpbGVkIHdoZW4gdXBkYXRpbmcgYnVmZmVyIChkM2QxMSkARDNEMTFfQ1JFQVRFX0JVRkZFUl9TUlZfRkFJTEVEOiBDcmVhdGVTaGFkZXJSZXNvdXJjZVZpZXcoKSBmYWlsZWQgZm9yIHN0b3JhZ2UgYnVmZmVyIChkM2QxMSkARDNEMTFfQ1JFQVRFXzJEX1RFWFRVUkVfVU5TVVBQT1JURURfUElYRUxfRk9STUFUOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgMmQtLCBjdWJlLSBvciBhcnJheS10ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFXzJEX1NSVl9GQUlMRUQ6IENyZWF0ZVNoYWRlclJlc291cmNlVmlldygpIGZhaWxlZCBmb3IgMmQtLCBjdWJlLSBvciBhcnJheS10ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFXzJEX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlMkQoKSBmYWlsZWQgZm9yIDJkLSwgY3ViZS0gb3IgYXJyYXktdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV9NU0FBX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlMkQoKSBmYWlsZWQgZm9yIE1TQUEgcmVuZGVyIHRhcmdldCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RFUFRIX1RFWFRVUkVfVU5TVVBQT1JURURfUElYRUxfRk9STUFUOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgZGVwdGgtc3RlbmNpbCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RFUFRIX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlMkQoKSBmYWlsZWQgZm9yIGRlcHRoLXN0ZW5jaWwgdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV8zRF9TUlZfRkFJTEVEOiBDcmVhdGVTaGFkZXJSZXNvdXJjZVZpZXcoKSBmYWlsZWQgZm9yIDNkIHRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfM0RfVEVYVFVSRV9VTlNVUFBPUlRFRF9QSVhFTF9GT1JNQVQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciAzRCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfTUFQX0ZPUl9VUERBVEVfSU1BR0VfRkFJTEVEOiBNYXAoKSBmYWlsZWQgd2hlbiB1cGRhdGluZyBpbWFnZSAoZDNkMTEpAEQzRDExX1NIQURFUl9DT01QSUxBVElPTl9GQUlMRUQ6IHNoYWRlciBjb21waWxhdGlvbiBmYWlsZWQgKGQzZDExKQBEM0QxMV9MT0FEX0QzRENPTVBJTEVSXzQ3X0RMTF9GQUlMRUQ6IGxvYWRpbmcgZDNkY29tcGlsZXJfNDcuZGxsIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9SVFZfRkFJTEVEOiBDcmVhdGVSZW5kZXJUYXJnZXRWaWV3KCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RTVl9GQUlMRUQ6IENyZWF0ZURlcHRoU3RlbmNpbFZpZXcoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfSU5QVVRfTEFZT1VUX0ZBSUxFRDogQ3JlYXRlSW5wdXRMYXlvdXQoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfQlVGRkVSX0ZBSUxFRDogQ3JlYXRlQnVmZmVyKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX1JBU1RFUklaRVJfU1RBVEVfRkFJTEVEOiBDcmVhdGVSYXN0ZXJpemVyU3RhdGUoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfU0FNUExFUl9TVEFURV9GQUlMRUQ6IENyZWF0ZVNhbXBsZXJTdGF0ZSgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9ERVBUSF9TVEVOQ0lMX1NUQVRFX0ZBSUxFRDogQ3JlYXRlRGVwdGhTdGVuY2lsU3RhdGUoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfQkxFTkRfU1RBVEVfRkFJTEVEOiBDcmVhdGVCbGVuZFN0YXRlKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFXzNEX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlM0QoKSBmYWlsZWQgKGQzZDExKQBNQUNPU19JTlZBTElEX05TT1BFTkdMX1BST0ZJTEU6IG1hY29zOiBpbnZhbGlkIE5TT3BlbkdMUHJvZmlsZSAodmFsaWQgY2hvaWNlcyBhcmUgMS4wIGFuZCA0LjEpAHBvb2wgJiYgKG51bSA+PSAxKQAoYmluZGluZ3MtPl9zdGFydF9jYW5hcnkgPT0gMCkgJiYgKGJpbmRpbmdzLT5fZW5kX2NhbmFyeT09MCkAKF9zYXBwLmZyYW1lYnVmZmVyX3dpZHRoID4gMCkgJiYgKF9zYXBwLmZyYW1lYnVmZmVyX2hlaWdodCA+IDApAHNyYyAmJiBkc3QgJiYgKG1heF9sZW4gPiAwKQBwdHIgJiYgKHNpemUgPiAwKQAocGFzcy0+X3N0YXJ0X2NhbmFyeSA9PSAwKSAmJiAocGFzcy0+X2VuZF9jYW5hcnkgPT0gMCkAKGRlc2MtPl9zdGFydF9jYW5hcnkgPT0gMCkgJiYgKGRlc2MtPl9lbmRfY2FuYXJ5ID09IDApAChhbGlnbiA+IDApICYmICgoYWxpZ24gJiAoYWxpZ24gLSAxKSkgPT0gMCkAKGdsX3RleF9zbG90ID49IDApICYmIChnbF90ZXhfc2xvdCA8IChTR19NQVhfSU1BR0VfU0FNUExFUl9QQUlSUykpAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OU1RBUlQ6IE5hdGl2ZUFjdGl2aXR5IG9uU3RhcnQoKQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlNUT1A6IE5hdGl2ZUFjdGl2aXR5IG9uU3RvcCgpAERSQVdfUkVRVUlSRURfQklORElOR1NfT1JfVU5JRk9STVNfTUlTU0lORzogY2FsbCB0byBzZ19hcHBseV9iaW5kaW5ncygpIGFuZC9vciBzZ19hcHBseV91bmlmb3JtcygpIG1pc3NpbmcgYWZ0ZXIgc2dfYXBwbHlfcGlwZWxpbmUoKQBWQUxJREFURV9BVUJfTk9fUElQRUxJTkU6IHNnX2FwcGx5X3VuaWZvcm1zOiBtdXN0IGJlIGNhbGxlZCBhZnRlciBzZ19hcHBseV9waXBlbGluZSgpAEFORFJPSURfVU5TVVBQT1JURURfSU5QVVRfRVZFTlRfSU5QVVRfQ0I6IHVuc3VwcG9ydGVkIGlucHV0IGV2ZW50IGVuY291bnRlcmVkIGluIF9zYXBwX2FuZHJvaWRfaW5wdXRfY2IoKQBBTkRST0lEX1JFQURfTVNHX0ZBSUxFRDogZmFpbGVkIHRvIHJlYWQgbWVzc2FnZSBpbiBfc2FwcF9hbmRyb2lkX21haW5fY2IoKQBBTkRST0lEX1VOU1VQUE9SVEVEX0lOUFVUX0VWRU5UX01BSU5fQ0I6IHVuc3VwcG9ydGVkIGlucHV0IGV2ZW50IGVuY291bnRlcmVkIGluIF9zYXBwX2FuZHJvaWRfbWFpbl9jYigpAFdHUFVfUkVRVUVTVF9BREFQVEVSX1NUQVRVU19FUlJPUjogd2dwdTogcmVxdWVzdGluZyBhZGFwdGVyIGZhaWxlZCB3aXRoIHN0YXR1cyAnZXJyb3InAFdHUFVfUkVRVUVTVF9ERVZJQ0VfU1RBVFVTX0VSUk9SOiB3Z3B1OiByZXF1ZXN0aW5nIGRldmljZSBmYWlsZWQgd2l0aCBzdGF0dXMgJ2Vycm9yJwBXR1BVX1JFUVVFU1RfQURBUFRFUl9TVEFUVVNfVU5LTk9XTjogd2dwdTogcmVxdWVzdGluZyBhZGFwdGVyIGZhaWxlZCB3aXRoIHN0YXR1cyAndW5rbm93bicAV0dQVV9SRVFVRVNUX0RFVklDRV9TVEFUVVNfVU5LTk9XTjogd2dwdTog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PnsgaWYgKE1vZHVsZS5jYW52YXMpIHsgcmV0dXJuOyB9IGNvbnN0IGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFVURjhUb1N0cmluZyhzZWxlY3RvcikpOyBpZiAoZSkgeyBNb2R1bGUuY2FudmFzID0gZTsgfSBjb25zb2xlLmxvZygnY2FudmFzIHNldCcsIE1vZHVsZS5jYW52YXMpOyB9ACh2b2lkKTw6Oj57IE1vZHVsZS5zb2tvbF9iZWZvcmV1bmxvYWQgPSAoZXZlbnQpID0+IHsgaWYgKF9fc2FwcF9odG1sNV9nZXRfYXNrX2xlYXZlX3NpdGUoKSAhPSAwKSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IGV2ZW50LnJldHVyblZhbHVlID0gJyAnOyB9IH07IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBNb2R1bGUuc29rb2xfYmVmb3JldW5sb2FkKTsgfQAodm9pZCk8Ojo+eyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgTW9kdWxlLnNva29sX2JlZm9yZXVubG9hZCk7IH0AKHZvaWQpPDo6PnsgTW9kdWxlLnNva29sX3Bhc3RlID0gKGV2ZW50KSA9PiB7IGNvbnN0IHBhc3RlZF9zdHIgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTsgd2l0aFN0YWNrU2F2ZSgoKSA9PiB7IGNvbnN0IGNzdHIgPSBzdHJpbmdUb1VURjhPblN0YWNrKHBhc3RlZF9zdHIpOyBfX3NhcHBfZW1zY19vbnBhc3RlKGNzdHIpOyB9KTsgfTsgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgTW9kdWxlLnNva29sX3Bhc3RlKTsgfQAodm9pZCk8Ojo+eyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGFzdGUnLCBNb2R1bGUuc29rb2xfcGFzdGUpOyB9AChjb25zdCBjaGFyKiBjX3N0cik8Ojo+eyBjb25zdCBzdHIgPSBVVEY4VG9TdHJpbmcoY19zdHIpOyBjb25zdCB0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7IHRhLnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpOyB0YS5zZXRBdHRyaWJ1dGUoJ2F1dG9jb3JyZWN0JywgJ29mZicpOyB0YS5zZXRBdHRyaWJ1dGUoJ2F1dG9jYXBpdGFsaXplJywgJ29mZicpOyB0YS5zZXRBdHRyaWJ1dGUoJ3NwZWxsY2hlY2snLCAnZmFsc2UnKTsgdGEuc3R5bGUubGVmdCA9IC0xMDAgKyAncHgnOyB0YS5zdHlsZS50b3AgPSAtMTAwICsgJ3B4JzsgdGEuc3R5bGUuaGVpZ2h0ID0gMTsgdGEuc3R5bGUud2lkdGggPSAxOyB0YS52YWx1ZSA9IHN0cjsgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0YSk7IHRhLnNlbGVjdCgpOyBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpOyBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRhKTsgfQAoY29uc3QgY2hhciogY2FudmFzX25hbWVfY3N0cik8Ojo+eyBNb2R1bGUuc29rb2xfZHJvcF9maWxlcyA9IFtdOyBjb25zdCBjYW52YXNfbmFtZSA9IFVURjhUb1N0cmluZyhjYW52YXNfbmFtZV9jc3RyKTsgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzX25hbWUpOyBNb2R1bGUuc29rb2xfZHJhZ2VudGVyID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJhZ292ZXIgPSAoZXZlbnQpID0+IHsgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH07IE1vZHVsZS5zb2tvbF9kcm9wID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBjb25zdCBmaWxlcyA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlczsgTW9kdWxlLnNva29sX2Ryb3BwZWRfZmlsZXMgPSBmaWxlczsgX19zYXBwX2Vtc2NfYmVnaW5fZHJvcChmaWxlcy5sZW5ndGgpOyBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7IHdpdGhTdGFja1NhdmUoKCkgPT4geyBjb25zdCBjc3RyID0gc3RyaW5nVG9VVEY4T25TdGFjayhmaWxlc1tpXS5uYW1lKTsgX19zYXBwX2Vtc2NfZHJvcChpLCBjc3RyKTsgfSk7IH0gbGV0IG1vZHMgPSAwOyBpZiAoZXZlbnQuc2hpZnRLZXkpIHsgbW9kcyB8PSAxOyB9IGlmIChldmVudC5jdHJsS2V5KSB7IG1vZHMgfD0gMjsgfSBpZiAoZXZlbnQuYWx0S2V5KSB7IG1vZHMgfD0gNDsgfSBpZiAoZXZlbnQubWV0YUtleSkgeyBtb2RzIHw9IDg7IH0gX19zYXBwX2Vtc2NfZW5kX2Ryb3AoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgbW9kcyk7IH07IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBNb2R1bGUuc29rb2xfZHJhZ2VudGVyLCBmYWxzZSk7IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlLCBmYWxzZSk7IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIE1vZHVsZS5zb2tvbF9kcmFnb3ZlciwgZmFsc2UpOyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIE1vZHVsZS5zb2tvbF9kcm9wLCBmYWxzZSk7IH0AKGludCBpbmRleCk8Ojo+eyAvKiogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gKi8gY29uc3QgZmlsZXMgPSBNb2R1bGUuc29rb2xfZHJvcHBlZF9maWxlczsgaWYgKChpbmRleCA8IDApIHx8IChpbmRleCA+PSBmaWxlcy5sZW5ndGgpKSB7IHJldHVybiAwOyB9IGVsc2UgeyByZXR1cm4gZmlsZXNbaW5kZXhdLnNpemU7IH0gfQAoaW50IGluZGV4LCBfc2FwcF9odG1sNV9mZXRjaF9jYWxsYmFjayBjYWxsYmFjaywgdm9pZCogYnVmX3B0ciwgdWludDMyX3QgYnVmX3NpemUsIHZvaWQqIHVzZXJfZGF0YSk8Ojo+eyBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpOyByZWFkZXIub25sb2FkID0gKGxvYWRFdmVudCkgPT4geyBjb25zdCBjb250ZW50ID0gbG9hZEV2ZW50LnRhcmdldC5yZXN1bHQ7IGlmIChjb250ZW50LmJ5dGVMZW5ndGggPiBidWZfc2l6ZSkgeyBfX3NhcHBfZW1zY19pbnZva2VfZmV0Y2hfY2IoaW5kZXgsIDAsIDEsIGNhbGxiYWNrLCAwLCBidWZfcHRyLCBidWZfc2l6ZSwgdXNlcl9kYXRhKTsgfSBlbHNlIHsgSEVBUFU4LnNldChuZXcgVWludDhBcnJheShjb250ZW50KSwgYnVmX3B0cik7IF9fc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYihpbmRleCwgMSwgMCwgY2FsbGJhY2ssIGNvbnRlbnQuYnl0ZUxlbmd0aCwgYnVmX3B0ciwgYnVmX3NpemUsIHVzZXJfZGF0YSk7IH0gfTsgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiB7IF9fc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYihpbmRleCwgMCwgMiwgY2FsbGJhY2ssIDAsIGJ1Zl9wdHIsIGJ1Zl9zaXplLCB1c2VyX2RhdGEpOyB9OyAvKiogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gKi8gY29uc3QgZmlsZXMgPSBNb2R1bGUuc29rb2xfZHJvcHBlZF9maWxlczsgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGVzW2luZGV4XSk7IH0AKGNvbnN0IGNoYXIqIGNhbnZhc19uYW1lX2NzdHIpPDo6PnsgY29uc3QgY2FudmFzX25hbWUgPSBVVEY4VG9TdHJpbmcoY2FudmFzX25hbWVfY3N0cik7IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc19uYW1lKTsgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIE1vZHVsZS5zb2tvbF9kcmFnZW50ZXIpOyBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgTW9kdWxlLnNva29sX2RyYWdsZWF2ZSk7IGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIE1vZHVsZS5zb2tvbF9kcmFnb3Zlcik7IGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgTW9kdWxlLnNva29sX2Ryb3ApOyB9AChjb25zdCBjaGFyKiBjX3N0cl90YXJnZXQpPDo6PnsgY29uc3QgdGFyZ2V0X3N0ciA9IFVURjhUb1N0cmluZyhjX3N0cl90YXJnZXQpOyBNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldF9zdHIpOyBpZiAoIU1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0KSB7IGNvbnNvbGUubG9nKCJzb2tvbF9hcHAuaDogaW52YWxpZCB0YXJnZXQ6IiArIHRhcmdldF9zdHIpOyB9IGlmICghTW9kdWxlLnNhcHBfZW1zY190YXJnZXQucmVxdWVzdFBvaW50ZXJMb2NrKSB7IGNvbnNvbGUubG9nKCJzb2tvbF9hcHAuaDogdGFyZ2V0IGRvZXNuJ3Qgc3VwcG9ydCByZXF1ZXN0UG9pbnRlckxvY2s6IiArIHRhcmdldF9zdHIpOyB9IH0AKHZvaWQpPDo6PnsgaWYgKE1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0KSB7IGlmIChNb2R1bGUuc2FwcF9lbXNjX3RhcmdldC5yZXF1ZXN0UG9pbnRlckxvY2spIHsgTW9kdWxlLnNhcHBfZW1zY190YXJnZXQucmVxdWVzdFBvaW50ZXJMb2NrKCk7IH0gfSB9ACh2b2lkKTw6Oj57IGlmIChkb2N1bWVudC5leGl0UG9pbnRlckxvY2spIHsgZG9jdW1lbnQuZXhpdFBvaW50ZXJMb2NrKCk7IH0gfQAoaW50IGN1cnNvcl90eXBlLCBpbnQgc2hvd24pPDo6PnsgaWYgKE1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0KSB7IGxldCBjdXJzb3I7IGlmIChzaG93biA9PT0gMCkgeyBjdXJzb3IgPSAibm9uZSI7IH0gZWxzZSBzd2l0Y2ggKGN1cnNvcl90eXBlKSB7IGNhc2UgMDogY3Vyc29yID0gImF1dG8iOyBicmVhazsgY2FzZSAxOiBjdXJzb3IgPSAiZGVmYXVsdCI7IGJyZWFrOyBjYXNlIDI6IGN1cnNvciA9ICJ0ZXh0IjsgYnJlYWs7IGNhc2UgMzogY3Vyc29yID0gImNyb3NzaGFpciI7IGJyZWFrOyBjYXNlIDQ6IGN1cnNvciA9ICJwb2ludGVyIjsgYnJlYWs7IGNhc2UgNTogY3Vyc29yID0gImV3LXJlc2l6ZSI7IGJyZWFrOyBjYXNlIDY6IGN1cnNvciA9ICJucy1yZXNpemUiOyBicmVhazsgY2FzZSA3OiBjdXJzb3IgPSAibndzZS1yZXNpemUiOyBicmVhazsgY2FzZSA4OiBjdXJzb3IgPSAibmVzdy1yZXNpemUiOyBicmVhazsgY2FzZSA5OiBjdXJzb3IgPSAiYWxsLXNjcm9sbCI7IGJyZWFrOyBjYXNlIDEwOiBjdXJzb3IgPSAibm90LWFsbG93ZWQiOyBicmVhazsgZGVmYXVsdDogY3Vyc29yID0gImF1dG8iOyBicmVhazsgfSBNb2R1bGUuc2FwcF9lbXNjX3RhcmdldC5zdHlsZS5jdXJzb3IgPSBjdXJzb3I7IH0gfQAodm9pZCk8Ojo+eyBjb25zdCBsaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nva29sLWFwcC1mYXZpY29uJyk7IGlmIChsaW5rKSB7IGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQobGluayk7IH0gfQAoaW50IHcsIGludCBoLCBjb25zdCB1aW50OF90KiBwaXhlbHMpPDo6PnsgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IGNhbnZhcy53aWR0aCA9IHc7IGNhbnZhcy5oZWlnaHQgPSBoOyBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgY29uc3QgaW1nX2RhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHcsIGgpOyBpbWdfZGF0YS5kYXRhLnNldChIRUFQVTguc3ViYXJyYXkocGl4ZWxzLCBwaXhlbHMgKyB3KmgqNCkpOyBjdHgucHV0SW1hZ2VEYXRhKGltZ19kYXRhLCAwLCAwKTsgY29uc3QgbmV3X2xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7IG5ld19saW5rLmlkID0gJ3Nva29sLWFwcC1mYXZpY29uJzsgbmV3X2xpbmsucmVsID0gJ3Nob3J0Y3V0IGljb24nOyBuZXdfbGluay5ocmVmID0gY2FudmFzLnRvRGF0YVVSTCgpOyBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG5ld19saW5rKTsgfQAoX0Jvb2wgYWxwaGEsIF9Cb29sIGFudGlhbGlhcywgX0Jvb2wgcHJlbXVsdGlwbGllZEFscGhhLCBfQm9vbCBwcmVzZXJ2ZURyYXdpbmdCdWZmZXIpPDo6PnsgaWYgKCFNb2R1bGUuY2FudmFzKSB7IGNvbnNvbGUuZXJyb3IoJ01ha2Ugc3VyZSB0byBzZXR1cCBNb2R1bGUuY2FudmFzJyk7IH0gcmV0dXJuIEdMLmNyZWF0ZUNvbnRleHQoTW9kdWxlLmNhbnZhcywgeyBkZXB0aDogdHJ1ZSwgc3RlbmNpbDogdHJ1ZSwgZW5hYmxlRXh0ZW5zaW9uc0J5RGVmYXVsdDogdHJ1ZSwgbWFqb3JWZXJzaW9uOiAyLCBhbHBoYSwgYW50aWFsaWFzLCBwcmVtdWx0aXBsaWVkQWxwaGEsIHByZXNlcnZlRHJhd2luZ0J1ZmZlciB9KTsgfQAodWludDMyX3QgbGV2ZWwsIGNvbnN0IGNoYXIqIGNfc3RyKTw6Oj57IGNvbnN0IHN0ciA9IFVURjhUb1N0cmluZyhjX3N0cik7IHN3aXRjaCAobGV2ZWwpIHsgY2FzZSAwOiBjb25zb2xlLmVycm9yKHN0cik7IGJyZWFrOyBjYXNlIDE6IGNvbnNvbGUuZXJyb3Ioc3RyKTsgYnJlYWs7IGNhc2UgMjogY29uc29sZS53YXJuKHN0cik7IGJyZWFrOyBkZWZhdWx0OiBjb25zb2xlLmluZm8oc3RyKTsgYnJlYWs7IH0gfQAAQYKqBwskJHdpdGhTdGFja1NhdmUsJHN0cmluZ1RvVVRGOE9uU3RhY2sA';
    return f;
}

var wasmBinaryFile;

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  var binary = tryParseAsDataURI(file);
  if (binary) {
    return binary;
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw 'both async and sync fetching of the wasm failed';
}

function getBinaryPromise(binaryFile) {

  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then((binary) => {
    return WebAssembly.instantiate(binary, imports);
  }).then(receiver, (reason) => {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

function getWasmImports() {
  // prepare imports
  return {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  }
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  var info = getWasmImports();
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    

    wasmMemory = wasmExports['memory'];
    
    assert(wasmMemory, 'memory not found in wasm exports');
    updateMemoryViews();

    wasmTable = wasmExports['__indirect_function_table'];
    
    assert(wasmTable, 'table not found in wasm exports');

    addOnInit(wasmExports['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
        // If instantiation fails, reject the module ready promise.
        readyPromiseReject(e);
    }
  }

  wasmBinaryFile ??= findWasmBinary();

  // If instantiation fails, reject the module ready promise.
  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// include: runtime_debug.js
// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
}

function legacyModuleProp(prop, newName, incoming=true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incoming ? ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)' : '';
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);

      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

/**
 * Intercept access to a global symbol.  This enables us to give informative
 * warnings/errors when folks attempt to use symbols they did not include in
 * their build, or no symbols that no longer exist.
 */
function hookGlobalSymbolAccess(sym, func) {
  if (typeof globalThis != 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        func();
        return undefined;
      }
    });
  }
}

function missingGlobal(sym, msg) {
  hookGlobalSymbolAccess(sym, () => {
    warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
  });
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');
missingGlobal('asm', 'Please use wasmExports instead');

function missingLibrarySymbol(sym) {
  hookGlobalSymbolAccess(sym, () => {
    // Can't `abort()` here because it would break code that does runtime
    // checks.  e.g. `if (typeof SDL === 'undefined')`.
    var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
    // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
    // library.js, which means $name for a JS name with no prefix, or name
    // for a JS name like _name.
    var librarySymbol = sym;
    if (!librarySymbol.startsWith('_')) {
      librarySymbol = '$' + sym;
    }
    msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
    if (isExportedByForceFilesystem(sym)) {
      msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
    }
    warnOnce(msg);
  });

  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}
// end include: runtime_debug.js
// === Body ===

function _dk_grab_canvas(selector) { if (Module.canvas) { return; } const e = document.querySelector(UTF8ToString(selector)); if (e) { Module.canvas = e; } console.log('canvas set', Module.canvas); }
function sapp_js_add_beforeunload_listener() { Module.sokol_beforeunload = (event) => { if (__sapp_html5_get_ask_leave_site() != 0) { event.preventDefault(); event.returnValue = ' '; } }; window.addEventListener('beforeunload', Module.sokol_beforeunload); }
function sapp_js_remove_beforeunload_listener() { window.removeEventListener('beforeunload', Module.sokol_beforeunload); }
function sapp_js_add_clipboard_listener() { Module.sokol_paste = (event) => { const pasted_str = event.clipboardData.getData('text'); withStackSave(() => { const cstr = stringToUTF8OnStack(pasted_str); __sapp_emsc_onpaste(cstr); }); }; window.addEventListener('paste', Module.sokol_paste); }
function sapp_js_remove_clipboard_listener() { window.removeEventListener('paste', Module.sokol_paste); }
function sapp_js_write_clipboard(c_str) { const str = UTF8ToString(c_str); const ta = document.createElement('textarea'); ta.setAttribute('autocomplete', 'off'); ta.setAttribute('autocorrect', 'off'); ta.setAttribute('autocapitalize', 'off'); ta.setAttribute('spellcheck', 'false'); ta.style.left = -100 + 'px'; ta.style.top = -100 + 'px'; ta.style.height = 1; ta.style.width = 1; ta.value = str; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
function sapp_js_add_dragndrop_listeners(canvas_name_cstr) { Module.sokol_drop_files = []; const canvas_name = UTF8ToString(canvas_name_cstr); const canvas = document.getElementById(canvas_name); Module.sokol_dragenter = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_dragleave = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_dragover = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_drop = (event) => { event.stopPropagation(); event.preventDefault(); const files = event.dataTransfer.files; Module.sokol_dropped_files = files; __sapp_emsc_begin_drop(files.length); for (let i = 0; i < files.length; i++) { withStackSave(() => { const cstr = stringToUTF8OnStack(files[i].name); __sapp_emsc_drop(i, cstr); }); } let mods = 0; if (event.shiftKey) { mods |= 1; } if (event.ctrlKey) { mods |= 2; } if (event.altKey) { mods |= 4; } if (event.metaKey) { mods |= 8; } __sapp_emsc_end_drop(event.clientX, event.clientY, mods); }; canvas.addEventListener('dragenter', Module.sokol_dragenter, false); canvas.addEventListener('dragleave', Module.sokol_dragleave, false); canvas.addEventListener('dragover', Module.sokol_dragover, false); canvas.addEventListener('drop', Module.sokol_drop, false); }
function sapp_js_dropped_file_size(index) { /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files; if ((index < 0) || (index >= files.length)) { return 0; } else { return files[index].size; } }
function sapp_js_fetch_dropped_file(index,callback,buf_ptr,buf_size,user_data) { const reader = new FileReader(); reader.onload = (loadEvent) => { const content = loadEvent.target.result; if (content.byteLength > buf_size) { __sapp_emsc_invoke_fetch_cb(index, 0, 1, callback, 0, buf_ptr, buf_size, user_data); } else { HEAPU8.set(new Uint8Array(content), buf_ptr); __sapp_emsc_invoke_fetch_cb(index, 1, 0, callback, content.byteLength, buf_ptr, buf_size, user_data); } }; reader.onerror = () => { __sapp_emsc_invoke_fetch_cb(index, 0, 2, callback, 0, buf_ptr, buf_size, user_data); }; /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files; reader.readAsArrayBuffer(files[index]); }
function sapp_js_remove_dragndrop_listeners(canvas_name_cstr) { const canvas_name = UTF8ToString(canvas_name_cstr); const canvas = document.getElementById(canvas_name); canvas.removeEventListener('dragenter', Module.sokol_dragenter); canvas.removeEventListener('dragleave', Module.sokol_dragleave); canvas.removeEventListener('dragover', Module.sokol_dragover); canvas.removeEventListener('drop', Module.sokol_drop); }
function sapp_js_init(c_str_target) { const target_str = UTF8ToString(c_str_target); Module.sapp_emsc_target = document.getElementById(target_str); if (!Module.sapp_emsc_target) { console.log("sokol_app.h: invalid target:" + target_str); } if (!Module.sapp_emsc_target.requestPointerLock) { console.log("sokol_app.h: target doesn't support requestPointerLock:" + target_str); } }
function sapp_js_request_pointerlock() { if (Module.sapp_emsc_target) { if (Module.sapp_emsc_target.requestPointerLock) { Module.sapp_emsc_target.requestPointerLock(); } } }
function sapp_js_exit_pointerlock() { if (document.exitPointerLock) { document.exitPointerLock(); } }
function sapp_js_set_cursor(cursor_type,shown) { if (Module.sapp_emsc_target) { let cursor; if (shown === 0) { cursor = "none"; } else switch (cursor_type) { case 0: cursor = "auto"; break; case 1: cursor = "default"; break; case 2: cursor = "text"; break; case 3: cursor = "crosshair"; break; case 4: cursor = "pointer"; break; case 5: cursor = "ew-resize"; break; case 6: cursor = "ns-resize"; break; case 7: cursor = "nwse-resize"; break; case 8: cursor = "nesw-resize"; break; case 9: cursor = "all-scroll"; break; case 10: cursor = "not-allowed"; break; default: cursor = "auto"; break; } Module.sapp_emsc_target.style.cursor = cursor; } }
function sapp_js_clear_favicon() { const link = document.getElementById('sokol-app-favicon'); if (link) { document.head.removeChild(link); } }
function sapp_js_set_favicon(w,h,pixels) { const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h; const ctx = canvas.getContext('2d'); const img_data = ctx.createImageData(w, h); img_data.data.set(HEAPU8.subarray(pixels, pixels + w*h*4)); ctx.putImageData(img_data, 0, 0); const new_link = document.createElement('link'); new_link.id = 'sokol-app-favicon'; new_link.rel = 'shortcut icon'; new_link.href = canvas.toDataURL(); document.head.appendChild(new_link); }
function _dk_setup_context(alpha,antialias,premultipliedAlpha,preserveDrawingBuffer) { if (!Module.canvas) { console.error('Make sure to setup Module.canvas'); } return GL.createContext(Module.canvas, { depth: true, stencil: true, enableExtensionsByDefault: true, majorVersion: 2, alpha, antialias, premultipliedAlpha, preserveDrawingBuffer }); }
function slog_js_log(level,c_str) { const str = UTF8ToString(c_str); switch (level) { case 0: console.error(str); break; case 1: console.error(str); break; case 2: console.warn(str); break; default: console.info(str); break; } }

// end include: preamble.js


  /** @constructor */
  function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }

  var callRuntimeCallbacks = (callbacks) => {
      // Pass the module as the first argument.
      callbacks.forEach((f) => f(Module));
    };

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': abort('to do getValue(i64) use WASM_BIGINT');
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = Module['noExitRuntime'] || true;

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': abort('to do setValue(i64) use WASM_BIGINT');
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var stackRestore = (val) => __emscripten_stack_restore(val);

  var stackSave = () => _emscripten_stack_get_current();

  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };

  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder() : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number=} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined/NaN means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  var ___assert_fail = (condition, filename, line, func) => {
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    };

  var __abort_js = () => {
      abort('native code called abort()');
    };

  var __emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

  
  var _emscripten_set_main_loop_timing = (mode, value) => {
      MainLoop.timingMode = mode;
      MainLoop.timingValue = value;
  
      if (!MainLoop.func) {
        err('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (!MainLoop.running) {
        
        MainLoop.running = true;
      }
      if (mode == 0) {
        MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now())|0;
          setTimeout(MainLoop.runner, timeUntilNextTick); // doing this each time means that on exception, we stop
        };
        MainLoop.method = 'timeout';
      } else if (mode == 1) {
        MainLoop.scheduler = function MainLoop_scheduler_rAF() {
          MainLoop.requestAnimationFrame(MainLoop.runner);
        };
        MainLoop.method = 'rAF';
      } else if (mode == 2) {
        if (typeof MainLoop.setImmediate == 'undefined') {
          if (typeof setImmediate == 'undefined') {
            // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
            var setImmediates = [];
            var emscriptenMainLoopMessageId = 'setimmediate';
            /** @param {Event} event */
            var MainLoop_setImmediate_messageHandler = (event) => {
              // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
              // so check for both cases.
              if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                event.stopPropagation();
                setImmediates.shift()();
              }
            };
            addEventListener("message", MainLoop_setImmediate_messageHandler, true);
            MainLoop.setImmediate = /** @type{function(function(): ?, ...?): number} */((func) => {
              setImmediates.push(func);
              if (ENVIRONMENT_IS_WORKER) {
                Module['setImmediates'] ??= [];
                Module['setImmediates'].push(func);
                postMessage({target: emscriptenMainLoopMessageId}); // In --proxy-to-worker, route the message via proxyClient.js
              } else postMessage(emscriptenMainLoopMessageId, "*"); // On the main thread, can just send the message to itself.
            });
          } else {
            MainLoop.setImmediate = setImmediate;
          }
        }
        MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
          MainLoop.setImmediate(MainLoop.runner);
        };
        MainLoop.method = 'immediate';
      }
      return 0;
    };
  
  var _emscripten_get_now = () => performance.now();
  
  
  var runtimeKeepaliveCounter = 0;
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
  
  /** @suppress {duplicate } */
  /** @param {boolean|number=} implicit */
  var exitJS = (status, implicit) => {
      EXITSTATUS = status;
  
      checkUnflushedContent();
  
      // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
      if (keepRuntimeAlive() && !implicit) {
        var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
        readyPromiseReject(msg);
        err(msg);
      }
  
      _proc_exit(status);
    };
  var _exit = exitJS;
  
  var handleException = (e) => {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      checkStackCookie();
      if (e instanceof WebAssembly.RuntimeError) {
        if (_emscripten_stack_get_current() <= 0) {
          err('Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)');
        }
      }
      quit_(1, e);
    };
  
  var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
  
    /**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */
  var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
      assert(!MainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
      MainLoop.func = iterFunc;
      MainLoop.arg = arg;
  
      var thisMainLoopId = MainLoop.currentlyRunningMainloop;
      function checkIsRunning() {
        if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
          
          maybeExit();
          return false;
        }
        return true;
      }
  
      // We create the loop runner here but it is not actually running until
      // _emscripten_set_main_loop_timing is called (which might happen a
      // later time).  This member signifies that the current runner has not
      // yet been started so that we can call runtimeKeepalivePush when it
      // gets it timing set for the first time.
      MainLoop.running = false;
      MainLoop.runner = function MainLoop_runner() {
        if (ABORT) return;
        if (MainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = MainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (MainLoop.remainingBlockers) {
            var remaining = MainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              MainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              MainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          MainLoop.updateStatus();
  
          // catches pause/resume main loop from blocker execution
          if (!checkIsRunning()) return;
  
          setTimeout(MainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (!checkIsRunning()) return;
  
        // Implement very basic swap interval control
        MainLoop.currentFrameNumber = MainLoop.currentFrameNumber + 1 | 0;
        if (MainLoop.timingMode == 1 && MainLoop.timingValue > 1 && MainLoop.currentFrameNumber % MainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          MainLoop.scheduler();
          return;
        } else if (MainLoop.timingMode == 0) {
          MainLoop.tickStartTime = _emscripten_get_now();
        }
  
        if (MainLoop.method === 'timeout' && Module.ctx) {
          warnOnce('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          MainLoop.method = ''; // just warn once per call to set main loop
        }
  
        MainLoop.runIter(iterFunc);
  
        // catch pauses from the main loop itself
        if (!checkIsRunning()) return;
  
        MainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps && fps > 0) {
          _emscripten_set_main_loop_timing(0, 1000.0 / fps);
        } else {
          // Do rAF by rendering each frame (no decimating)
          _emscripten_set_main_loop_timing(1, 1);
        }
  
        MainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'unwind';
      }
    };
  
  
  var callUserCallback = (func) => {
      if (ABORT) {
        err('user callback triggered after runtime exited or application aborted.  Ignoring.');
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
  
  var MainLoop = {
  running:false,
  scheduler:null,
  method:"",
  currentlyRunningMainloop:0,
  func:null,
  arg:0,
  timingMode:0,
  timingValue:0,
  currentFrameNumber:0,
  queue:[],
  preMainLoop:[],
  postMainLoop:[],
  pause() {
        MainLoop.scheduler = null;
        // Incrementing this signals the previous main loop that it's now become old, and it must return.
        MainLoop.currentlyRunningMainloop++;
      },
  resume() {
        MainLoop.currentlyRunningMainloop++;
        var timingMode = MainLoop.timingMode;
        var timingValue = MainLoop.timingValue;
        var func = MainLoop.func;
        MainLoop.func = null;
        // do not set timing and call scheduler, we will do it on the next lines
        setMainLoop(func, 0, false, MainLoop.arg, true);
        _emscripten_set_main_loop_timing(timingMode, timingValue);
        MainLoop.scheduler();
      },
  updateStatus() {
        if (Module['setStatus']) {
          var message = Module['statusMessage'] || 'Please wait...';
          var remaining = MainLoop.remainingBlockers ?? 0;
          var expected = MainLoop.expectedBlockers ?? 0;
          if (remaining) {
            if (remaining < expected) {
              Module['setStatus'](`{message} ({expected - remaining}/{expected})`);
            } else {
              Module['setStatus'](message);
            }
          } else {
            Module['setStatus']('');
          }
        }
      },
  init() {
        Module['preMainLoop'] && MainLoop.preMainLoop.push(Module['preMainLoop']);
        Module['postMainLoop'] && MainLoop.postMainLoop.push(Module['postMainLoop']);
      },
  runIter(func) {
        if (ABORT) return;
        for (var pre of MainLoop.preMainLoop) {
          if (pre() === false) {
            return; // |return false| skips a frame
          }
        }
        callUserCallback(func);
        for (var post of MainLoop.postMainLoop) {
          post();
        }
        checkStackCookie();
      },
  nextRAF:0,
  fakeRequestAnimationFrame(func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (MainLoop.nextRAF === 0) {
          MainLoop.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= MainLoop.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            MainLoop.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(MainLoop.nextRAF - now, 0);
        setTimeout(func, delay);
      },
  requestAnimationFrame(func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func);
          return;
        }
        var RAF = MainLoop.fakeRequestAnimationFrame;
        RAF(func);
      },
  };
  var _emscripten_cancel_main_loop = () => {
      MainLoop.pause();
      MainLoop.func = null;
    };

  var _emscripten_get_device_pixel_ratio = () => {
      return (typeof devicePixelRatio == 'number' && devicePixelRatio) || 1.0;
    };

  var JSEvents = {
  removeAllEventListeners() {
        while (JSEvents.eventHandlers.length) {
          JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
        }
        JSEvents.deferredCalls = [];
      },
  inEventHandler:0,
  deferredCalls:[],
  deferCall(targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false;
  
          for (var i in arrA) {
            if (arrA[i] != arrB[i]) return false;
          }
          return true;
        }
        // Test if the given call was already queued, and if so, don't add it again.
        for (var call of JSEvents.deferredCalls) {
          if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
            return;
          }
        }
        JSEvents.deferredCalls.push({
          targetFunction,
          precedence,
          argsList
        });
  
        JSEvents.deferredCalls.sort((x,y) => x.precedence < y.precedence);
      },
  removeDeferredCalls(targetFunction) {
        JSEvents.deferredCalls = JSEvents.deferredCalls.filter((call) => call.targetFunction != targetFunction);
      },
  canPerformEventHandlerRequests() {
        if (navigator.userActivation) {
          // Verify against transient activation status from UserActivation API
          // whether it is possible to perform a request here without needing to defer. See
          // https://developer.mozilla.org/en-US/docs/Web/Security/User_activation#transient_activation
          // and https://caniuse.com/mdn-api_useractivation
          // At the time of writing, Firefox does not support this API: https://bugzilla.mozilla.org/show_bug.cgi?id=1791079
          return navigator.userActivation.isActive;
        }
  
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
      },
  runDeferredCalls() {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return;
        }
        var deferredCalls = JSEvents.deferredCalls;
        JSEvents.deferredCalls = [];
        for (var call of deferredCalls) {
          call.targetFunction(...call.argsList);
        }
      },
  eventHandlers:[],
  removeAllHandlersOnTarget:(target, eventTypeString) => {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (JSEvents.eventHandlers[i].target == target &&
            (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
             JSEvents._removeHandler(i--);
           }
        }
      },
  _removeHandler(i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
        JSEvents.eventHandlers.splice(i, 1);
      },
  registerOrRemoveHandler(eventHandler) {
        if (!eventHandler.target) {
          err('registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:');
          console.dir(eventHandler);
          return -4;
        }
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = function(event) {
            // Increment nesting count for the event handler.
            ++JSEvents.inEventHandler;
            JSEvents.currentEventHandler = eventHandler;
            // Process any old deferred calls the user has placed.
            JSEvents.runDeferredCalls();
            // Process the actual event, calls back to user C code handler.
            eventHandler.handlerFunc(event);
            // Process any new deferred calls that were placed right now from this event handler.
            JSEvents.runDeferredCalls();
            // Out of event handler - restore nesting count.
            --JSEvents.inEventHandler;
          };
  
          eventHandler.target.addEventListener(eventHandler.eventTypeString,
                                               eventHandler.eventListenerFunc,
                                               eventHandler.useCapture);
          JSEvents.eventHandlers.push(eventHandler);
        } else {
          for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (JSEvents.eventHandlers[i].target == eventHandler.target
             && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
               JSEvents._removeHandler(i--);
             }
          }
        }
        return 0;
      },
  getNodeNameForTarget(target) {
        if (!target) return '';
        if (target == window) return '#window';
        if (target == screen) return '#screen';
        return target?.nodeName || '';
      },
  fullscreenEnabled() {
        return document.fullscreenEnabled
        // Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitFullscreenEnabled.
        // TODO: If Safari at some point ships with unprefixed version, update the version check above.
        || document.webkitFullscreenEnabled
         ;
      },
  };
  
  var maybeCStringToJsString = (cString) => {
      // "cString > 2" checks if the input is a number, and isn't of the special
      // values we accept here, EMSCRIPTEN_EVENT_TARGET_* (which map to 0, 1, 2).
      // In other words, if cString > 2 then it's a pointer to a valid place in
      // memory, and points to a C string.
      return cString > 2 ? UTF8ToString(cString) : cString;
    };
  
  /** @type {Object} */
  var specialHTMLTargets = [0, typeof document != 'undefined' ? document : 0, typeof window != 'undefined' ? window : 0];
  var findEventTarget = (target) => {
      target = maybeCStringToJsString(target);
      var domElement = specialHTMLTargets[target] || (typeof document != 'undefined' ? document.querySelector(target) : undefined);
      return domElement;
    };
  
  var getBoundingClientRect = (e) => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {'left':0,'top':0};
  var _emscripten_get_element_css_size = (target, width, height) => {
      target = findEventTarget(target);
      if (!target) return -4;
  
      var rect = getBoundingClientRect(target);
      HEAPF64[((width)>>3)] = rect.width;
      HEAPF64[((height)>>3)] = rect.height;
  
      return 0;
    };

  var _emscripten_performance_now = () => performance.now();

  var wasmTableMirror = [];
  
  /** @type {WebAssembly.Table} */
  var wasmTable;
  var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      assert(wasmTable.get(funcPtr) == func, 'JavaScript-side Wasm function table mirror is out of date!');
      return func;
    };
  var _emscripten_request_animation_frame_loop = (cb, userData) => {
      function tick(timeStamp) {
        if (getWasmTableEntry(cb)(timeStamp, userData)) {
          requestAnimationFrame(tick);
        }
      }
      return requestAnimationFrame(tick);
    };

  var getHeapMax = () =>
      HEAPU8.length;
  
  var alignMemory = (size, alignment) => {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    };
  
  var abortOnCannotGrowMemory = (requestedSize) => {
      abort(`Cannot enlarge memory arrays to size ${requestedSize} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${HEAP8.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      abortOnCannotGrowMemory(requestedSize);
    };

  
  
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.focusEvent ||= _malloc(256);
  
      var focusEventHandlerFunc = (e = event) => {
        var nodeName = JSEvents.getNodeNameForTarget(e.target);
        var id = e.target.id ? e.target.id : '';
  
        var focusEvent = JSEvents.focusEvent;
        stringToUTF8(nodeName, focusEvent + 0, 128);
        stringToUTF8(id, focusEvent + 128, 128);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: focusEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_blur_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);

  
  var findCanvasEventTarget = findEventTarget;
  var _emscripten_set_canvas_element_size = (target, width, height) => {
      var canvas = findCanvasEventTarget(target);
      if (!canvas) return -4;
      canvas.width = width;
      canvas.height = height;
      return 0;
    };

  var _emscripten_set_focus_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);

  
  
  
  
  var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.keyEvent ||= _malloc(160);
  
      var keyEventHandlerFunc = (e) => {
        assert(e);
  
        var keyEventData = JSEvents.keyEvent;
        HEAPF64[((keyEventData)>>3)] = e.timeStamp;
  
        var idx = ((keyEventData)>>2);
  
        HEAP32[idx + 2] = e.location;
        HEAP8[keyEventData + 12] = e.ctrlKey;
        HEAP8[keyEventData + 13] = e.shiftKey;
        HEAP8[keyEventData + 14] = e.altKey;
        HEAP8[keyEventData + 15] = e.metaKey;
        HEAP8[keyEventData + 16] = e.repeat;
        HEAP32[idx + 5] = e.charCode;
        HEAP32[idx + 6] = e.keyCode;
        HEAP32[idx + 7] = e.which;
        stringToUTF8(e.key || '', keyEventData + 32, 32);
        stringToUTF8(e.code || '', keyEventData + 64, 32);
        stringToUTF8(e.char || '', keyEventData + 96, 32);
        stringToUTF8(e.locale || '', keyEventData + 128, 32);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_keydown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);

  var _emscripten_set_keypress_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);

  var _emscripten_set_keyup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);

  
  var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
      var iterFunc = getWasmTableEntry(func);
      setMainLoop(iterFunc, fps, simulateInfiniteLoop);
    };

  
  
  
  var fillMouseEventData = (eventStruct, e, target) => {
      assert(eventStruct % 4 == 0);
      HEAPF64[((eventStruct)>>3)] = e.timeStamp;
      var idx = ((eventStruct)>>2);
      HEAP32[idx + 2] = e.screenX;
      HEAP32[idx + 3] = e.screenY;
      HEAP32[idx + 4] = e.clientX;
      HEAP32[idx + 5] = e.clientY;
      HEAP8[eventStruct + 24] = e.ctrlKey;
      HEAP8[eventStruct + 25] = e.shiftKey;
      HEAP8[eventStruct + 26] = e.altKey;
      HEAP8[eventStruct + 27] = e.metaKey;
      HEAP16[idx*2 + 14] = e.button;
      HEAP16[idx*2 + 15] = e.buttons;
  
      HEAP32[idx + 8] = e["movementX"]
        ;
  
      HEAP32[idx + 9] = e["movementY"]
        ;
  
      // Note: rect contains doubles (truncated to placate SAFE_HEAP, which is the same behaviour when writing to HEAP32 anyway)
      var rect = getBoundingClientRect(target);
      HEAP32[idx + 10] = e.clientX - (rect.left | 0);
      HEAP32[idx + 11] = e.clientY - (rect.top  | 0);
  
    };
  
  
  
  var registerMouseEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.mouseEvent ||= _malloc(64);
      target = findEventTarget(target);
  
      var mouseEventHandlerFunc = (e = event) => {
        // TODO: Make this access thread safe, or this could update live while app is reading it.
        fillMouseEventData(JSEvents.mouseEvent, e, target);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString != 'mousemove' && eventTypeString != 'mouseenter' && eventTypeString != 'mouseleave', // Mouse move events do not allow fullscreen/pointer lock requests to be handled in them!
        eventTypeString,
        callbackfunc,
        handlerFunc: mouseEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_mousedown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);

  var _emscripten_set_mouseenter_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, "mouseenter", targetThread);

  var _emscripten_set_mouseleave_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, "mouseleave", targetThread);

  var _emscripten_set_mousemove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);

  var _emscripten_set_mouseup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);

  
  
  
  var fillPointerlockChangeEventData = (eventStruct) => {
      var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
      var isPointerlocked = !!pointerLockElement;
      // Assigning a boolean to HEAP32 with expected type coercion.
      /** @suppress{checkTypes} */
      HEAP8[eventStruct] = isPointerlocked;
      var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
      var id = pointerLockElement?.id || '';
      stringToUTF8(nodeName, eventStruct + 1, 128);
      stringToUTF8(id, eventStruct + 129, 128);
    };
  
  
  
  var registerPointerlockChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.pointerlockChangeEvent ||= _malloc(257);
  
      var pointerlockChangeEventHandlerFunc = (e = event) => {
        var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
        fillPointerlockChangeEventData(pointerlockChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: pointerlockChangeEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  
  /** @suppress {missingProperties} */
  var _emscripten_set_pointerlockchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      // TODO: Currently not supported in pthreads or in --proxy-to-worker mode. (In pthreads mode, document object is not defined)
      if (!document || !document.body || (!document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock)) {
        return -1;
      }
  
      target = findEventTarget(target);
      if (!target) return -4;
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mozpointerlockchange", targetThread);
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "webkitpointerlockchange", targetThread);
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mspointerlockchange", targetThread);
      return registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread);
    };

  
  
  
  
  var registerPointerlockErrorEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  
      var pointerlockErrorEventHandlerFunc = (e = event) => {
        if (getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: pointerlockErrorEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  
  /** @suppress {missingProperties} */
  var _emscripten_set_pointerlockerror_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      // TODO: Currently not supported in pthreads or in --proxy-to-worker mode. (In pthreads mode, document object is not defined)
      if (!document || !document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock) {
        return -1;
      }
  
      target = findEventTarget(target);
  
      if (!target) return -4;
      registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "mozpointerlockerror", targetThread);
      registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "webkitpointerlockerror", targetThread);
      registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "mspointerlockerror", targetThread);
      return registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "pointerlockerror", targetThread);
    };

  
  
  
  var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.uiEvent ||= _malloc(36);
  
      target = findEventTarget(target);
  
      var uiEventHandlerFunc = (e = event) => {
        if (e.target != target) {
          // Never take ui events such as scroll via a 'bubbled' route, but always from the direct element that
          // was targeted. Otherwise e.g. if app logs a message in response to a page scroll, the Emscripten log
          // message box could cause to scroll, generating a new (bubbled) scroll message, causing a new log print,
          // causing a new scroll, etc..
          return;
        }
        var b = document.body; // Take document.body to a variable, Closure compiler does not outline access to it on its own.
        if (!b) {
          // During a page unload 'body' can be null, with "Cannot read property 'clientWidth' of null" being thrown
          return;
        }
        var uiEvent = JSEvents.uiEvent;
        HEAP32[((uiEvent)>>2)] = 0; // always zero for resize and scroll
        HEAP32[(((uiEvent)+(4))>>2)] = b.clientWidth;
        HEAP32[(((uiEvent)+(8))>>2)] = b.clientHeight;
        HEAP32[(((uiEvent)+(12))>>2)] = innerWidth;
        HEAP32[(((uiEvent)+(16))>>2)] = innerHeight;
        HEAP32[(((uiEvent)+(20))>>2)] = outerWidth;
        HEAP32[(((uiEvent)+(24))>>2)] = outerHeight;
        HEAP32[(((uiEvent)+(28))>>2)] = pageXOffset | 0; // scroll offsets are float
        HEAP32[(((uiEvent)+(32))>>2)] = pageYOffset | 0;
        if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: uiEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_resize_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);

  
  
  
  
  var registerTouchEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.touchEvent ||= _malloc(1552);
  
      target = findEventTarget(target);
  
      var touchEventHandlerFunc = (e) => {
        assert(e);
        var t, touches = {}, et = e.touches;
        // To ease marshalling different kinds of touches that browser reports (all touches are listed in e.touches,
        // only changed touches in e.changedTouches, and touches on target at a.targetTouches), mark a boolean in
        // each Touch object so that we can later loop only once over all touches we see to marshall over to Wasm.
  
        for (let t of et) {
          // Browser might recycle the generated Touch objects between each frame (Firefox on Android), so reset any
          // changed/target states we may have set from previous frame.
          t.isChanged = t.onTarget = 0;
          touches[t.identifier] = t;
        }
        // Mark which touches are part of the changedTouches list.
        for (let t of e.changedTouches) {
          t.isChanged = 1;
          touches[t.identifier] = t;
        }
        // Mark which touches are part of the targetTouches list.
        for (let t of e.targetTouches) {
          touches[t.identifier].onTarget = 1;
        }
  
        var touchEvent = JSEvents.touchEvent;
        HEAPF64[((touchEvent)>>3)] = e.timeStamp;
        HEAP8[touchEvent + 12] = e.ctrlKey;
        HEAP8[touchEvent + 13] = e.shiftKey;
        HEAP8[touchEvent + 14] = e.altKey;
        HEAP8[touchEvent + 15] = e.metaKey;
        var idx = touchEvent + 16;
        var targetRect = getBoundingClientRect(target);
        var numTouches = 0;
        for (let t of Object.values(touches)) {
          var idx32 = ((idx)>>2); // Pre-shift the ptr to index to HEAP32 to save code size
          HEAP32[idx32 + 0] = t.identifier;
          HEAP32[idx32 + 1] = t.screenX;
          HEAP32[idx32 + 2] = t.screenY;
          HEAP32[idx32 + 3] = t.clientX;
          HEAP32[idx32 + 4] = t.clientY;
          HEAP32[idx32 + 5] = t.pageX;
          HEAP32[idx32 + 6] = t.pageY;
          HEAP8[idx + 28] = t.isChanged;
          HEAP8[idx + 29] = t.onTarget;
          HEAP32[idx32 + 8] = t.clientX - (targetRect.left | 0);
          HEAP32[idx32 + 9] = t.clientY - (targetRect.top  | 0);
  
          idx += 48;
  
          if (++numTouches > 31) {
            break;
          }
        }
        HEAP32[(((touchEvent)+(8))>>2)] = numTouches;
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, touchEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString == 'touchstart' || eventTypeString == 'touchend',
        eventTypeString,
        callbackfunc,
        handlerFunc: touchEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_touchcancel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread);

  var _emscripten_set_touchend_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread);

  var _emscripten_set_touchmove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread);

  var _emscripten_set_touchstart_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread);

  
  
  var GLctx;
  
  var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
      // Extension available in WebGL 1 from Firefox 26 and Google Chrome 30 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('ANGLE_instanced_arrays');
      // Because this extension is a core function in WebGL 2, assign the extension entry points in place of
      // where the core functions will reside in WebGL 2. This way the calling code can call these without
      // having to dynamically branch depending if running against WebGL 1 or WebGL 2.
      if (ext) {
        ctx['vertexAttribDivisor'] = (index, divisor) => ext['vertexAttribDivisorANGLE'](index, divisor);
        ctx['drawArraysInstanced'] = (mode, first, count, primcount) => ext['drawArraysInstancedANGLE'](mode, first, count, primcount);
        ctx['drawElementsInstanced'] = (mode, count, type, indices, primcount) => ext['drawElementsInstancedANGLE'](mode, count, type, indices, primcount);
        return 1;
      }
    };
  
  var webgl_enable_OES_vertex_array_object = (ctx) => {
      // Extension available in WebGL 1 from Firefox 25 and WebKit 536.28/desktop Safari 6.0.3 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('OES_vertex_array_object');
      if (ext) {
        ctx['createVertexArray'] = () => ext['createVertexArrayOES']();
        ctx['deleteVertexArray'] = (vao) => ext['deleteVertexArrayOES'](vao);
        ctx['bindVertexArray'] = (vao) => ext['bindVertexArrayOES'](vao);
        ctx['isVertexArray'] = (vao) => ext['isVertexArrayOES'](vao);
        return 1;
      }
    };
  
  var webgl_enable_WEBGL_draw_buffers = (ctx) => {
      // Extension available in WebGL 1 from Firefox 28 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('WEBGL_draw_buffers');
      if (ext) {
        ctx['drawBuffers'] = (n, bufs) => ext['drawBuffersWEBGL'](n, bufs);
        return 1;
      }
    };
  
  var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) =>
      // Closure is expected to be allowed to minify the '.dibvbi' property, so not accessing it quoted.
      !!(ctx.dibvbi = ctx.getExtension('WEBGL_draw_instanced_base_vertex_base_instance'));
  
  var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (ctx) => {
      // Closure is expected to be allowed to minify the '.mdibvbi' property, so not accessing it quoted.
      return !!(ctx.mdibvbi = ctx.getExtension('WEBGL_multi_draw_instanced_base_vertex_base_instance'));
    };
  
  var webgl_enable_EXT_polygon_offset_clamp = (ctx) => {
      return !!(ctx.extPolygonOffsetClamp = ctx.getExtension('EXT_polygon_offset_clamp'));
    };
  
  var webgl_enable_EXT_clip_control = (ctx) => {
      return !!(ctx.extClipControl = ctx.getExtension('EXT_clip_control'));
    };
  
  var webgl_enable_WEBGL_polygon_mode = (ctx) => {
      return !!(ctx.webglPolygonMode = ctx.getExtension('WEBGL_polygon_mode'));
    };
  
  var webgl_enable_WEBGL_multi_draw = (ctx) => {
      // Closure is expected to be allowed to minify the '.multiDrawWebgl' property, so not accessing it quoted.
      return !!(ctx.multiDrawWebgl = ctx.getExtension('WEBGL_multi_draw'));
    };
  
  var getEmscriptenSupportedExtensions = (ctx) => {
      // Restrict the list of advertised extensions to those that we actually
      // support.
      var supportedExtensions = [
        // WebGL 1 extensions
        'ANGLE_instanced_arrays',
        'EXT_blend_minmax',
        'EXT_disjoint_timer_query',
        'EXT_frag_depth',
        'EXT_shader_texture_lod',
        'EXT_sRGB',
        'OES_element_index_uint',
        'OES_fbo_render_mipmap',
        'OES_standard_derivatives',
        'OES_texture_float',
        'OES_texture_half_float',
        'OES_texture_half_float_linear',
        'OES_vertex_array_object',
        'WEBGL_color_buffer_float',
        'WEBGL_depth_texture',
        'WEBGL_draw_buffers',
        // WebGL 2 extensions
        'EXT_color_buffer_float',
        'EXT_conservative_depth',
        'EXT_disjoint_timer_query_webgl2',
        'EXT_texture_norm16',
        'NV_shader_noperspective_interpolation',
        'WEBGL_clip_cull_distance',
        // WebGL 1 and WebGL 2 extensions
        'EXT_clip_control',
        'EXT_color_buffer_half_float',
        'EXT_depth_clamp',
        'EXT_float_blend',
        'EXT_polygon_offset_clamp',
        'EXT_texture_compression_bptc',
        'EXT_texture_compression_rgtc',
        'EXT_texture_filter_anisotropic',
        'KHR_parallel_shader_compile',
        'OES_texture_float_linear',
        'WEBGL_blend_func_extended',
        'WEBGL_compressed_texture_astc',
        'WEBGL_compressed_texture_etc',
        'WEBGL_compressed_texture_etc1',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_compressed_texture_s3tc_srgb',
        'WEBGL_debug_renderer_info',
        'WEBGL_debug_shaders',
        'WEBGL_lose_context',
        'WEBGL_multi_draw',
        'WEBGL_polygon_mode'
      ];
      // .getSupportedExtensions() can return null if context is lost, so coerce to empty array.
      return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext));
    };
  
  
  var GL = {
  counter:1,
  buffers:[],
  programs:[],
  framebuffers:[],
  renderbuffers:[],
  textures:[],
  shaders:[],
  vaos:[],
  contexts:[],
  offscreenCanvases:{
  },
  queries:[],
  samplers:[],
  transformFeedbacks:[],
  syncs:[],
  stringCache:{
  },
  stringiCache:{
  },
  unpackAlignment:4,
  unpackRowLength:0,
  recordError:(errorCode) => {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },
  getNewId:(table) => {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },
  genObject:(n, buffers, createFunction, objectTable
        ) => {
        for (var i = 0; i < n; i++) {
          var buffer = GLctx[createFunction]();
          var id = buffer && GL.getNewId(objectTable);
          if (buffer) {
            buffer.name = id;
            objectTable[id] = buffer;
          } else {
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
          }
          HEAP32[(((buffers)+(i*4))>>2)] = id;
        }
      },
  getSource:(shader, count, string, length) => {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAPU32[(((length)+(i*4))>>2)] : undefined;
          source += UTF8ToString(HEAPU32[(((string)+(i*4))>>2)], len);
        }
        return source;
      },
  createContext:(/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
  
        // BUG: Workaround Safari WebGL issue: After successfully acquiring WebGL
        // context on a canvas, calling .getContext() will always return that
        // context independent of which 'webgl' or 'webgl2'
        // context version was passed. See:
        //   https://bugs.webkit.org/show_bug.cgi?id=222758
        // and:
        //   https://github.com/emscripten-core/emscripten/issues/13295.
        // TODO: Once the bug is fixed and shipped in Safari, adjust the Safari
        // version field in above check.
        if (!canvas.getContextSafariWebGL2Fixed) {
          canvas.getContextSafariWebGL2Fixed = canvas.getContext;
          /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (Object|null)} */
          function fixedGetContext(ver, attrs) {
            var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
            return ((ver == 'webgl') == (gl instanceof WebGLRenderingContext)) ? gl : null;
          }
          canvas.getContext = fixedGetContext;
        }
  
        var ctx =
          (webGLContextAttributes.majorVersion > 1)
          ?
            canvas.getContext("webgl2", webGLContextAttributes)
          :
          (canvas.getContext("webgl", webGLContextAttributes)
            // https://caniuse.com/#feat=webgl
            );
  
        if (!ctx) return 0;
  
        var handle = GL.registerContext(ctx, webGLContextAttributes);
  
        return handle;
      },
  registerContext:(ctx, webGLContextAttributes) => {
        // without pthreads a context is just an integer ID
        var handle = GL.getNewId(GL.contexts);
  
        var context = {
          handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx
        };
  
        // Store the created context object so that we can access the context
        // given a canvas without having to pass the parameters again.
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault == 'undefined' || webGLContextAttributes.enableExtensionsByDefault) {
          GL.initExtensions(context);
        }
  
        return handle;
      },
  makeContextCurrent:(contextHandle) => {
  
        // Active Emscripten GL layer context object.
        GL.currentContext = GL.contexts[contextHandle];
        // Active WebGL context object.
        Module.ctx = GLctx = GL.currentContext?.GLctx;
        return !(contextHandle && !GLctx);
      },
  getContext:(contextHandle) => {
        return GL.contexts[contextHandle];
      },
  deleteContext:(contextHandle) => {
        if (GL.currentContext === GL.contexts[contextHandle]) {
          GL.currentContext = null;
        }
        if (typeof JSEvents == 'object') {
          // Release all JS event handlers on the DOM element that the GL context is
          // associated with since the context is now deleted.
          JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
        }
        // Make sure the canvas object no longer refers to the context object so
        // there are no GC surprises.
        if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) {
          GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
        }
        GL.contexts[contextHandle] = null;
      },
  initExtensions:(context) => {
        // If this function is called without a specific context object, init the
        // extensions of the currently active context.
        context ||= GL.currentContext;
  
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
  
        var GLctx = context.GLctx;
  
        // Detect the presence of a few extensions manually, ction GL interop
        // layer itself will need to know if they exist.
  
        // Extensions that are available in both WebGL 1 and WebGL 2
        webgl_enable_WEBGL_multi_draw(GLctx);
        webgl_enable_EXT_polygon_offset_clamp(GLctx);
        webgl_enable_EXT_clip_control(GLctx);
        webgl_enable_WEBGL_polygon_mode(GLctx);
        // Extensions that are only available in WebGL 1 (the calls will be no-ops
        // if called on a WebGL 2 context active)
        webgl_enable_ANGLE_instanced_arrays(GLctx);
        webgl_enable_OES_vertex_array_object(GLctx);
        webgl_enable_WEBGL_draw_buffers(GLctx);
        // Extensions that are available from WebGL >= 2 (no-op if called on a WebGL 1 context active)
        webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
        webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  
        // On WebGL 2, EXT_disjoint_timer_query is replaced with an alternative
        // that's based on core APIs, and exposes only the queryCounterEXT()
        // entrypoint.
        if (context.version >= 2) {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2");
        }
  
        // However, Firefox exposes the WebGL 1 version on WebGL 2 as well and
        // thus we look for the WebGL 1 version again if the WebGL 2 version
        // isn't present. https://bugzilla.mozilla.org/show_bug.cgi?id=1328882
        if (context.version < 2 || !GLctx.disjointTimerQueryExt)
        {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
        }
  
        getEmscriptenSupportedExtensions(GLctx).forEach((ext) => {
          // WEBGL_lose_context, WEBGL_debug_renderer_info and WEBGL_debug_shaders
          // are not enabled by default.
          if (!ext.includes('lose_context') && !ext.includes('debug')) {
            // Call .getExtension() to enable that extension permanently.
            GLctx.getExtension(ext);
          }
        });
      },
  };
  
  var registerWebGlEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  
      var webGlEventHandlerFunc = (e = event) => {
        if (getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: webGlEventHandlerFunc,
        useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_webglcontextlost_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      registerWebGlEventCallback(target, userData, useCapture, callbackfunc, 31, "webglcontextlost", targetThread);
      return 0;
    };

  
  var _emscripten_set_webglcontextrestored_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      registerWebGlEventCallback(target, userData, useCapture, callbackfunc, 32, "webglcontextrestored", targetThread);
      return 0;
    };

  
  
  
  
  
  var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.wheelEvent ||= _malloc(96);
  
      // The DOM Level 3 events spec event 'wheel'
      var wheelHandlerFunc = (e = event) => {
        var wheelEvent = JSEvents.wheelEvent;
        fillMouseEventData(wheelEvent, e, target);
        HEAPF64[(((wheelEvent)+(64))>>3)] = e["deltaX"];
        HEAPF64[(((wheelEvent)+(72))>>3)] = e["deltaY"];
        HEAPF64[(((wheelEvent)+(80))>>3)] = e["deltaZ"];
        HEAP32[(((wheelEvent)+(88))>>2)] = e["deltaMode"];
        if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: true,
        eventTypeString,
        callbackfunc,
        handlerFunc: wheelHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_wheel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      target = findEventTarget(target);
      if (!target) return -4;
      if (typeof target.onwheel != 'undefined') {
        return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
      } else {
        return -1;
      }
    };

  
  
  
  
  
  
  
  
  
  
  var _emscripten_webgl_enable_extension = (contextHandle, extension) => {
      var context = GL.getContext(contextHandle);
      var extString = UTF8ToString(extension);
      if (extString.startsWith('GL_')) extString = extString.substr(3); // Allow enabling extensions both with "GL_" prefix and without.
  
      // Switch-board that pulls in code for all GL extensions, even if those are not used :/
      // Build with -sGL_SUPPORT_SIMPLE_ENABLE_EXTENSIONS=0 to avoid this.
  
      // Obtain function entry points to WebGL 1 extension related functions.
      if (extString == 'ANGLE_instanced_arrays') webgl_enable_ANGLE_instanced_arrays(GLctx);
      if (extString == 'OES_vertex_array_object') webgl_enable_OES_vertex_array_object(GLctx);
      if (extString == 'WEBGL_draw_buffers') webgl_enable_WEBGL_draw_buffers(GLctx);
  
      if (extString == 'WEBGL_draw_instanced_base_vertex_base_instance') webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
      if (extString == 'WEBGL_multi_draw_instanced_base_vertex_base_instance') webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  
      if (extString == 'WEBGL_multi_draw') webgl_enable_WEBGL_multi_draw(GLctx);
      if (extString == 'EXT_polygon_offset_clamp') webgl_enable_EXT_polygon_offset_clamp(GLctx);
      if (extString == 'EXT_clip_control') webgl_enable_EXT_clip_control(GLctx);
      if (extString == 'WEBGL_polygon_mode') webgl_enable_WEBGL_polygon_mode(GLctx);
  
      var ext = context.GLctx.getExtension(extString);
      return !!ext;
    };

  var _emscripten_webgl_make_context_current = (contextHandle) => {
      var success = GL.makeContextCurrent(contextHandle);
      return success ? 0 : -5;
    };

  var _glActiveTexture = (x0) => GLctx.activeTexture(x0);

  var _glAttachShader = (program, shader) => {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
    };

  var _glBindBuffer = (target, buffer) => {
  
      if (target == 0x88EB /*GL_PIXEL_PACK_BUFFER*/) {
        // In WebGL 2 glReadPixels entry point, we need to use a different WebGL 2
        // API function call when a buffer is bound to
        // GL_PIXEL_PACK_BUFFER_BINDING point, so must keep track whether that
        // binding point is non-null to know what is the proper API function to
        // call.
        GLctx.currentPixelPackBufferBinding = buffer;
      } else if (target == 0x88EC /*GL_PIXEL_UNPACK_BUFFER*/) {
        // In WebGL 2 gl(Compressed)Tex(Sub)Image[23]D entry points, we need to
        // use a different WebGL 2 API function call when a buffer is bound to
        // GL_PIXEL_UNPACK_BUFFER_BINDING point, so must keep track whether that
        // binding point is non-null to know what is the proper API function to
        // call.
        GLctx.currentPixelUnpackBufferBinding = buffer;
      }
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    };

  var _glBindBufferBase = (target, index, buffer) => {
      GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
    };

  var _glBindFramebuffer = (target, framebuffer) => {
  
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
  
    };

  var _glBindSampler = (unit, sampler) => {
      GLctx.bindSampler(unit, GL.samplers[sampler]);
    };

  var _glBindTexture = (target, texture) => {
      GLctx.bindTexture(target, GL.textures[texture]);
    };

  var _glBindVertexArray = (vao) => {
      GLctx.bindVertexArray(GL.vaos[vao]);
    };

  var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);

  var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);

  var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);

  var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);

  var _glBufferData = (target, size, data, usage) => {
  
      if (GL.currentContext.version >= 2) {
        // If size is zero, WebGL would interpret uploading the whole input
        // arraybuffer (starting from given offset), which would not make sense in
        // WebAssembly, so avoid uploading if size is zero. However we must still
        // call bufferData to establish a backing storage of zero bytes.
        if (data && size) {
          GLctx.bufferData(target, HEAPU8, usage, data, size);
        } else {
          GLctx.bufferData(target, size, usage);
        }
        return;
      }
      // N.b. here first form specifies a heap subarray, second form an integer
      // size, so the ?: code here is polymorphic. It is advised to avoid
      // randomly mixing both uses in calling code, to avoid any potential JS
      // engine JIT issues.
      GLctx.bufferData(target, data ? HEAPU8.subarray(data, data+size) : size, usage);
    };

  var _glBufferSubData = (target, offset, size, data) => {
      if (GL.currentContext.version >= 2) {
        size && GLctx.bufferSubData(target, offset, HEAPU8, data, size);
        return;
      }
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data+size));
    };

  var _glClearBufferfi = (x0, x1, x2, x3) => GLctx.clearBufferfi(x0, x1, x2, x3);

  var _glClearBufferfv = (buffer, drawbuffer, value) => {
  
      GLctx.clearBufferfv(buffer, drawbuffer, HEAPF32, ((value)>>2));
    };

  var _glClearBufferiv = (buffer, drawbuffer, value) => {
  
      GLctx.clearBufferiv(buffer, drawbuffer, HEAP32, ((value)>>2));
    };

  var _glColorMask = (red, green, blue, alpha) => {
      GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
    };

  var _glCompileShader = (shader) => {
      GLctx.compileShader(GL.shaders[shader]);
    };

  var _glCreateProgram = () => {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      // Store additional information needed for each shader program:
      program.name = id;
      // Lazy cache results of
      // glGetProgramiv(GL_ACTIVE_UNIFORM_MAX_LENGTH/GL_ACTIVE_ATTRIBUTE_MAX_LENGTH/GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH)
      program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
      program.uniformIdCounter = 1;
      GL.programs[id] = program;
      return id;
    };

  var _glCreateShader = (shaderType) => {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
  
      return id;
    };

  var _glCullFace = (x0) => GLctx.cullFace(x0);

  var _glDeleteBuffers = (n, buffers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((buffers)+(i*4))>>2)];
        var buffer = GL.buffers[id];
  
        // From spec: "glDeleteBuffers silently ignores 0's and names that do not
        // correspond to existing buffer objects."
        if (!buffer) continue;
  
        GLctx.deleteBuffer(buffer);
        buffer.name = 0;
        GL.buffers[id] = null;
  
        if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
        if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
      }
    };

  var _glDeleteFramebuffers = (n, framebuffers) => {
      for (var i = 0; i < n; ++i) {
        var id = HEAP32[(((framebuffers)+(i*4))>>2)];
        var framebuffer = GL.framebuffers[id];
        if (!framebuffer) continue; // GL spec: "glDeleteFramebuffers silently ignores 0s and names that do not correspond to existing framebuffer objects".
        GLctx.deleteFramebuffer(framebuffer);
        framebuffer.name = 0;
        GL.framebuffers[id] = null;
      }
    };

  var _glDeleteProgram = (id) => {
      if (!id) return;
      var program = GL.programs[id];
      if (!program) {
        // glDeleteProgram actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteProgram(program);
      program.name = 0;
      GL.programs[id] = null;
    };

  var _glDeleteRenderbuffers = (n, renderbuffers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((renderbuffers)+(i*4))>>2)];
        var renderbuffer = GL.renderbuffers[id];
        if (!renderbuffer) continue; // GL spec: "glDeleteRenderbuffers silently ignores 0s and names that do not correspond to existing renderbuffer objects".
        GLctx.deleteRenderbuffer(renderbuffer);
        renderbuffer.name = 0;
        GL.renderbuffers[id] = null;
      }
    };

  var _glDeleteSamplers = (n, samplers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((samplers)+(i*4))>>2)];
        var sampler = GL.samplers[id];
        if (!sampler) continue;
        GLctx.deleteSampler(sampler);
        sampler.name = 0;
        GL.samplers[id] = null;
      }
    };

  var _glDeleteShader = (id) => {
      if (!id) return;
      var shader = GL.shaders[id];
      if (!shader) {
        // glDeleteShader actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteShader(shader);
      GL.shaders[id] = null;
    };

  var _glDeleteTextures = (n, textures) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((textures)+(i*4))>>2)];
        var texture = GL.textures[id];
        // GL spec: "glDeleteTextures silently ignores 0s and names that do not
        // correspond to existing textures".
        if (!texture) continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
      }
    };

  var _glDeleteVertexArrays = (n, vaos) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((vaos)+(i*4))>>2)];
        GLctx.deleteVertexArray(GL.vaos[id]);
        GL.vaos[id] = null;
      }
    };

  var _glDepthFunc = (x0) => GLctx.depthFunc(x0);

  var _glDepthMask = (flag) => {
      GLctx.depthMask(!!flag);
    };

  var _glDisable = (x0) => GLctx.disable(x0);

  var _glDisableVertexAttribArray = (index) => {
      GLctx.disableVertexAttribArray(index);
    };

  var _glDrawArrays = (mode, first, count) => {
  
      GLctx.drawArrays(mode, first, count);
  
    };

  var _glDrawArraysInstanced = (mode, first, count, primcount) => {
      GLctx.drawArraysInstanced(mode, first, count, primcount);
    };

  var _glDrawElements = (mode, count, type, indices) => {
  
      GLctx.drawElements(mode, count, type, indices);
  
    };

  var _glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
      GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
    };

  var _glEnable = (x0) => GLctx.enable(x0);

  var _glEnableVertexAttribArray = (index) => {
      GLctx.enableVertexAttribArray(index);
    };

  var _glFrontFace = (x0) => GLctx.frontFace(x0);

  var _glGenBuffers = (n, buffers) => {
      GL.genObject(n, buffers, 'createBuffer', GL.buffers
        );
    };

  var _glGenVertexArrays = (n, arrays) => {
      GL.genObject(n, arrays, 'createVertexArray', GL.vaos
        );
    };

  
  var _glGetAttribLocation = (program, name) => {
      return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
    };

  var _glGetError = () => {
      var error = GLctx.getError() || GL.lastError;
      GL.lastError = 0/*GL_NO_ERROR*/;
      return error;
    };

  var readI53FromI64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAP32[(((ptr)+(4))>>2)] * 4294967296;
    };
  
  var readI53FromU64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAPU32[(((ptr)+(4))>>2)] * 4294967296;
    };
  var writeI53ToI64 = (ptr, num) => {
      HEAPU32[((ptr)>>2)] = num;
      var lower = HEAPU32[((ptr)>>2)];
      HEAPU32[(((ptr)+(4))>>2)] = (num - lower)/4294967296;
      var deserialized = (num >= 0) ? readI53FromU64(ptr) : readI53FromI64(ptr);
      var offset = ((ptr)>>2);
      if (deserialized != num) warnOnce(`writeI53ToI64() out of range: serialized JS Number ${num} to Wasm heap as bytes lo=${ptrToString(HEAPU32[offset])}, hi=${ptrToString(HEAPU32[offset+1])}, which deserializes back to ${deserialized} instead!`);
    };
  
  
  var webglGetExtensions = function $webglGetExtensions() {
      var exts = getEmscriptenSupportedExtensions(GLctx);
      exts = exts.concat(exts.map((e) => "GL_" + e));
      return exts;
    };
  
  var emscriptenWebGLGet = (name_, p, type) => {
      // Guard against user passing a null pointer.
      // Note that GLES2 spec does not say anything about how passing a null
      // pointer should be treated.  Testing on desktop core GL 3, the application
      // crashes on glGetIntegerv to a null pointer, but better to report an error
      // instead of doing anything random.
      if (!p) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var ret = undefined;
      switch (name_) { // Handle a few trivial GLES values
        case 0x8DFA: // GL_SHADER_COMPILER
          ret = 1;
          break;
        case 0x8DF8: // GL_SHADER_BINARY_FORMATS
          if (type != 0 && type != 1) {
            GL.recordError(0x500); // GL_INVALID_ENUM
          }
          // Do not write anything to the out pointer, since no binary formats are
          // supported.
          return;
        case 0x87FE: // GL_NUM_PROGRAM_BINARY_FORMATS
        case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
          ret = 0;
          break;
        case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
          // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete
          // since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be
          // queried for length), so implement it ourselves to allow C++ GLES2
          // code get the length.
          var formats = GLctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
          ret = formats ? formats.length : 0;
          break;
  
        case 0x821D: // GL_NUM_EXTENSIONS
          if (GL.currentContext.version < 2) {
            // Calling GLES3/WebGL2 function with a GLES2/WebGL1 context
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
            return;
          }
          ret = webglGetExtensions().length;
          break;
        case 0x821B: // GL_MAJOR_VERSION
        case 0x821C: // GL_MINOR_VERSION
          if (GL.currentContext.version < 2) {
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          }
          ret = name_ == 0x821B ? 3 : 0; // return version 3.0
          break;
      }
  
      if (ret === undefined) {
        var result = GLctx.getParameter(name_);
        switch (typeof result) {
          case "number":
            ret = result;
            break;
          case "boolean":
            ret = result ? 1 : 0;
            break;
          case "string":
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          case "object":
            if (result === null) {
              // null is a valid result for some (e.g., which buffer is bound -
              // perhaps nothing is bound), but otherwise can mean an invalid
              // name_, which we need to report as an error
              switch (name_) {
                case 0x8894: // ARRAY_BUFFER_BINDING
                case 0x8B8D: // CURRENT_PROGRAM
                case 0x8895: // ELEMENT_ARRAY_BUFFER_BINDING
                case 0x8CA6: // FRAMEBUFFER_BINDING or DRAW_FRAMEBUFFER_BINDING
                case 0x8CA7: // RENDERBUFFER_BINDING
                case 0x8069: // TEXTURE_BINDING_2D
                case 0x85B5: // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
                case 0x8F36: // COPY_READ_BUFFER_BINDING or COPY_READ_BUFFER
                case 0x8F37: // COPY_WRITE_BUFFER_BINDING or COPY_WRITE_BUFFER
                case 0x88ED: // PIXEL_PACK_BUFFER_BINDING
                case 0x88EF: // PIXEL_UNPACK_BUFFER_BINDING
                case 0x8CAA: // READ_FRAMEBUFFER_BINDING
                case 0x8919: // SAMPLER_BINDING
                case 0x8C1D: // TEXTURE_BINDING_2D_ARRAY
                case 0x806A: // TEXTURE_BINDING_3D
                case 0x8E25: // TRANSFORM_FEEDBACK_BINDING
                case 0x8C8F: // TRANSFORM_FEEDBACK_BUFFER_BINDING
                case 0x8A28: // UNIFORM_BUFFER_BINDING
                case 0x8514: { // TEXTURE_BINDING_CUBE_MAP
                  ret = 0;
                  break;
                }
                default: {
                  GL.recordError(0x500); // GL_INVALID_ENUM
                  return;
                }
              }
            } else if (result instanceof Float32Array ||
                       result instanceof Uint32Array ||
                       result instanceof Int32Array ||
                       result instanceof Array) {
              for (var i = 0; i < result.length; ++i) {
                switch (type) {
                  case 0: HEAP32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 2: HEAPF32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 4: HEAP8[(p)+(i)] = result[i] ? 1 : 0; break;
                }
              }
              return;
            } else {
              try {
                ret = result.name | 0;
              } catch(e) {
                GL.recordError(0x500); // GL_INVALID_ENUM
                err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
                return;
              }
            }
            break;
          default:
            GL.recordError(0x500); // GL_INVALID_ENUM
            err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof(result)}!`);
            return;
        }
      }
  
      switch (type) {
        case 1: writeI53ToI64(p, ret); break;
        case 0: HEAP32[((p)>>2)] = ret; break;
        case 2:   HEAPF32[((p)>>2)] = ret; break;
        case 4: HEAP8[p] = ret ? 1 : 0; break;
      }
    };
  
  var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);

  var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
      var log = GLctx.getProgramInfoLog(GL.programs[program]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };

  var _glGetProgramiv = (program, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      if (program >= GL.counter) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      program = GL.programs[program];
  
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getProgramInfoLog(program);
        if (log === null) log = '(unknown error)';
        HEAP32[((p)>>2)] = log.length + 1;
      } else if (pname == 0x8B87 /* GL_ACTIVE_UNIFORM_MAX_LENGTH */) {
        if (!program.maxUniformLength) {
          var numActiveUniforms = GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
          for (var i = 0; i < numActiveUniforms; ++i) {
            program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformLength;
      } else if (pname == 0x8B8A /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */) {
        if (!program.maxAttributeLength) {
          var numActiveAttributes = GLctx.getProgramParameter(program, 0x8B89/*GL_ACTIVE_ATTRIBUTES*/);
          for (var i = 0; i < numActiveAttributes; ++i) {
            program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxAttributeLength;
      } else if (pname == 0x8A35 /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */) {
        if (!program.maxUniformBlockNameLength) {
          var numActiveUniformBlocks = GLctx.getProgramParameter(program, 0x8A36/*GL_ACTIVE_UNIFORM_BLOCKS*/);
          for (var i = 0; i < numActiveUniformBlocks; ++i) {
            program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformBlockNameLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getProgramParameter(program, pname);
      }
    };

  
  var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };

  var _glGetShaderiv = (shader, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = '(unknown error)';
        // The GLES2 specification says that if the shader has an empty info log,
        // a value of 0 is returned. Otherwise the log has a null char appended.
        // (An empty string is falsey, so we can just check that instead of
        // looking at log.length.)
        var logLength = log ? log.length + 1 : 0;
        HEAP32[((p)>>2)] = logLength;
      } else if (pname == 0x8B88) { // GL_SHADER_SOURCE_LENGTH
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        // source may be a null, or the empty string, both of which are falsey
        // values that we report a 0 length for.
        var sourceLength = source ? source.length + 1 : 0;
        HEAP32[((p)>>2)] = sourceLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getShaderParameter(GL.shaders[shader], pname);
      }
    };

  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  
  var stringToNewUTF8 = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8(str, ret, size);
      return ret;
    };
  var _glGetStringi = (name, index) => {
      if (GL.currentContext.version < 2) {
        GL.recordError(0x502 /* GL_INVALID_OPERATION */); // Calling GLES3/WebGL2 function with a GLES2/WebGL1 context
        return 0;
      }
      var stringiCache = GL.stringiCache[name];
      if (stringiCache) {
        if (index < 0 || index >= stringiCache.length) {
          GL.recordError(0x501/*GL_INVALID_VALUE*/);
          return 0;
        }
        return stringiCache[index];
      }
      switch (name) {
        case 0x1F03 /* GL_EXTENSIONS */:
          var exts = webglGetExtensions().map(stringToNewUTF8);
          stringiCache = GL.stringiCache[name] = exts;
          if (index < 0 || index >= stringiCache.length) {
            GL.recordError(0x501/*GL_INVALID_VALUE*/);
            return 0;
          }
          return stringiCache[index];
        default:
          GL.recordError(0x500/*GL_INVALID_ENUM*/);
          return 0;
      }
    };

  /** @suppress {checkTypes} */
  var jstoi_q = (str) => parseInt(str);
  
  /** @noinline */
  var webglGetLeftBracePos = (name) => name.slice(-1) == ']' && name.lastIndexOf('[');
  
  var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
      var uniformLocsById = program.uniformLocsById, // Maps GLuint -> WebGLUniformLocation
        uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, // Maps name -> [uniform array length, GLuint]
        i, j;
  
      // On the first time invocation of glGetUniformLocation on this shader program:
      // initialize cache data structures and discover which uniforms are arrays.
      if (!uniformLocsById) {
        // maps GLint integer locations to WebGLUniformLocations
        program.uniformLocsById = uniformLocsById = {};
        // maps integer locations back to uniform name strings, so that we can lazily fetch uniform array locations
        program.uniformArrayNamesById = {};
  
        var numActiveUniforms = GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
        for (i = 0; i < numActiveUniforms; ++i) {
          var u = GLctx.getActiveUniform(program, i);
          var nm = u.name;
          var sz = u.size;
          var lb = webglGetLeftBracePos(nm);
          var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
  
          // Assign a new location.
          var id = program.uniformIdCounter;
          program.uniformIdCounter += sz;
          // Eagerly get the location of the uniformArray[0] base element.
          // The remaining indices >0 will be left for lazy evaluation to
          // improve performance. Those may never be needed to fetch, if the
          // application fills arrays always in full starting from the first
          // element of the array.
          uniformSizeAndIdsByName[arrayName] = [sz, id];
  
          // Store placeholder integers in place that highlight that these
          // >0 index locations are array indices pending population.
          for (j = 0; j < sz; ++j) {
            uniformLocsById[id] = j;
            program.uniformArrayNamesById[id++] = arrayName;
          }
        }
      }
    };
  
  
  
  var _glGetUniformLocation = (program, name) => {
  
      name = UTF8ToString(name);
  
      if (program = GL.programs[program]) {
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var uniformLocsById = program.uniformLocsById; // Maps GLuint -> WebGLUniformLocation
        var arrayIndex = 0;
        var uniformBaseName = name;
  
        // Invariant: when populating integer IDs for uniform locations, we must
        // maintain the precondition that arrays reside in contiguous addresses,
        // i.e. for a 'vec4 colors[10];', colors[4] must be at location
        // colors[0]+4.  However, user might call glGetUniformLocation(program,
        // "colors") for an array, so we cannot discover based on the user input
        // arguments whether the uniform we are dealing with is an array. The only
        // way to discover which uniforms are arrays is to enumerate over all the
        // active uniforms in the program.
        var leftBrace = webglGetLeftBracePos(name);
  
        // If user passed an array accessor "[index]", parse the array index off the accessor.
        if (leftBrace > 0) {
          arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0; // "index]", coerce parseInt(']') with >>>0 to treat "foo[]" as "foo[0]" and foo[-1] as unsigned out-of-bounds.
          uniformBaseName = name.slice(0, leftBrace);
        }
  
        // Have we cached the location of this uniform before?
        // A pair [array length, GLint of the uniform location]
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
  
        // If an uniform with this name exists, and if its index is within the
        // array limits (if it's even an array), query the WebGLlocation, or
        // return an existing cached location.
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
          arrayIndex += sizeAndId[1]; // Add the base location of the uniform to the array index offset.
          if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
            return arrayIndex;
          }
        }
      }
      else {
        // N.b. we are currently unable to distinguish between GL program IDs that
        // never existed vs GL program IDs that have been deleted, so report
        // GL_INVALID_VALUE in both cases.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
      }
      return -1;
    };

  var tempFixedLengthArray = [];
  var _glInvalidateFramebuffer = (target, numAttachments, attachments) => {
      var list = tempFixedLengthArray[numAttachments];
      for (var i = 0; i < numAttachments; i++) {
        list[i] = HEAP32[(((attachments)+(i*4))>>2)];
      }
  
      GLctx.invalidateFramebuffer(target, list);
    };

  var _glLinkProgram = (program) => {
      program = GL.programs[program];
      GLctx.linkProgram(program);
      // Invalidate earlier computed uniform->ID mappings, those have now become stale
      program.uniformLocsById = 0; // Mark as null-like so that glGetUniformLocation() knows to populate this again.
      program.uniformSizeAndIdsByName = {};
  
    };

  var _glPixelStorei = (pname, param) => {
      if (pname == 3317) {
        GL.unpackAlignment = param;
      } else if (pname == 3314) {
        GL.unpackRowLength = param;
      }
      GLctx.pixelStorei(pname, param);
    };

  var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);

  var _glReadBuffer = (x0) => GLctx.readBuffer(x0);

  var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);

  var _glShaderSource = (shader, count, string, length) => {
      var source = GL.getSource(shader, count, string, length);
  
      GLctx.shaderSource(GL.shaders[shader], source);
    };

  var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);

  var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);

  var _glStencilMask = (x0) => GLctx.stencilMask(x0);

  var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);

  var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);

  var webglGetUniformLocation = (location) => {
      var p = GLctx.currentProgram;
  
      if (p) {
        var webglLoc = p.uniformLocsById[location];
        // p.uniformLocsById[location] stores either an integer, or a
        // WebGLUniformLocation.
        // If an integer, we have not yet bound the location, so do it now. The
        // integer value specifies the array index we should bind to.
        if (typeof webglLoc == 'number') {
          p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ''));
        }
        // Else an already cached WebGLUniformLocation, return it.
        return webglLoc;
      } else {
        GL.recordError(0x502/*GL_INVALID_OPERATION*/);
      }
    };
  
  var _glUniform1i = (location, v0) => {
      GLctx.uniform1i(webglGetUniformLocation(location), v0);
    };

  var _glUseProgram = (program) => {
      program = GL.programs[program];
      GLctx.useProgram(program);
      // Record the currently active program so that we can access the uniform
      // mapping table of that program.
      GLctx.currentProgram = program;
    };

  var _glVertexAttribDivisor = (index, divisor) => {
      GLctx.vertexAttribDivisor(index, divisor);
    };

  var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    };

  var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);



  
  
  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };

  
  var withStackSave = (f) => {
      var stack = stackSave();
      var ret = f();
      stackRestore(stack);
      return ret;
    };


      Module["requestAnimationFrame"] = MainLoop.requestAnimationFrame;
      Module["pauseMainLoop"] = MainLoop.pause;
      Module["resumeMainLoop"] = MainLoop.resume;
      MainLoop.init();;
for (var i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));;
function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var wasmImports = {
  /** @export */
  __assert_fail: ___assert_fail,
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  _dk_grab_canvas,
  /** @export */
  _dk_setup_context,
  /** @export */
  _emscripten_memcpy_js: __emscripten_memcpy_js,
  /** @export */
  emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
  /** @export */
  emscripten_get_device_pixel_ratio: _emscripten_get_device_pixel_ratio,
  /** @export */
  emscripten_get_element_css_size: _emscripten_get_element_css_size,
  /** @export */
  emscripten_performance_now: _emscripten_performance_now,
  /** @export */
  emscripten_request_animation_frame_loop: _emscripten_request_animation_frame_loop,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
  /** @export */
  emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
  /** @export */
  emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
  /** @export */
  emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
  /** @export */
  emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
  /** @export */
  emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
  /** @export */
  emscripten_set_main_loop: _emscripten_set_main_loop,
  /** @export */
  emscripten_set_mousedown_callback_on_thread: _emscripten_set_mousedown_callback_on_thread,
  /** @export */
  emscripten_set_mouseenter_callback_on_thread: _emscripten_set_mouseenter_callback_on_thread,
  /** @export */
  emscripten_set_mouseleave_callback_on_thread: _emscripten_set_mouseleave_callback_on_thread,
  /** @export */
  emscripten_set_mousemove_callback_on_thread: _emscripten_set_mousemove_callback_on_thread,
  /** @export */
  emscripten_set_mouseup_callback_on_thread: _emscripten_set_mouseup_callback_on_thread,
  /** @export */
  emscripten_set_pointerlockchange_callback_on_thread: _emscripten_set_pointerlockchange_callback_on_thread,
  /** @export */
  emscripten_set_pointerlockerror_callback_on_thread: _emscripten_set_pointerlockerror_callback_on_thread,
  /** @export */
  emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
  /** @export */
  emscripten_set_touchcancel_callback_on_thread: _emscripten_set_touchcancel_callback_on_thread,
  /** @export */
  emscripten_set_touchend_callback_on_thread: _emscripten_set_touchend_callback_on_thread,
  /** @export */
  emscripten_set_touchmove_callback_on_thread: _emscripten_set_touchmove_callback_on_thread,
  /** @export */
  emscripten_set_touchstart_callback_on_thread: _emscripten_set_touchstart_callback_on_thread,
  /** @export */
  emscripten_set_webglcontextlost_callback_on_thread: _emscripten_set_webglcontextlost_callback_on_thread,
  /** @export */
  emscripten_set_webglcontextrestored_callback_on_thread: _emscripten_set_webglcontextrestored_callback_on_thread,
  /** @export */
  emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
  /** @export */
  emscripten_webgl_enable_extension: _emscripten_webgl_enable_extension,
  /** @export */
  emscripten_webgl_make_context_current: _emscripten_webgl_make_context_current,
  /** @export */
  glActiveTexture: _glActiveTexture,
  /** @export */
  glAttachShader: _glAttachShader,
  /** @export */
  glBindBuffer: _glBindBuffer,
  /** @export */
  glBindBufferBase: _glBindBufferBase,
  /** @export */
  glBindFramebuffer: _glBindFramebuffer,
  /** @export */
  glBindSampler: _glBindSampler,
  /** @export */
  glBindTexture: _glBindTexture,
  /** @export */
  glBindVertexArray: _glBindVertexArray,
  /** @export */
  glBlendColor: _glBlendColor,
  /** @export */
  glBlendEquationSeparate: _glBlendEquationSeparate,
  /** @export */
  glBlendFuncSeparate: _glBlendFuncSeparate,
  /** @export */
  glBlitFramebuffer: _glBlitFramebuffer,
  /** @export */
  glBufferData: _glBufferData,
  /** @export */
  glBufferSubData: _glBufferSubData,
  /** @export */
  glClearBufferfi: _glClearBufferfi,
  /** @export */
  glClearBufferfv: _glClearBufferfv,
  /** @export */
  glClearBufferiv: _glClearBufferiv,
  /** @export */
  glColorMask: _glColorMask,
  /** @export */
  glCompileShader: _glCompileShader,
  /** @export */
  glCreateProgram: _glCreateProgram,
  /** @export */
  glCreateShader: _glCreateShader,
  /** @export */
  glCullFace: _glCullFace,
  /** @export */
  glDeleteBuffers: _glDeleteBuffers,
  /** @export */
  glDeleteFramebuffers: _glDeleteFramebuffers,
  /** @export */
  glDeleteProgram: _glDeleteProgram,
  /** @export */
  glDeleteRenderbuffers: _glDeleteRenderbuffers,
  /** @export */
  glDeleteSamplers: _glDeleteSamplers,
  /** @export */
  glDeleteShader: _glDeleteShader,
  /** @export */
  glDeleteTextures: _glDeleteTextures,
  /** @export */
  glDeleteVertexArrays: _glDeleteVertexArrays,
  /** @export */
  glDepthFunc: _glDepthFunc,
  /** @export */
  glDepthMask: _glDepthMask,
  /** @export */
  glDisable: _glDisable,
  /** @export */
  glDisableVertexAttribArray: _glDisableVertexAttribArray,
  /** @export */
  glDrawArrays: _glDrawArrays,
  /** @export */
  glDrawArraysInstanced: _glDrawArraysInstanced,
  /** @export */
  glDrawElements: _glDrawElements,
  /** @export */
  glDrawElementsInstanced: _glDrawElementsInstanced,
  /** @export */
  glEnable: _glEnable,
  /** @export */
  glEnableVertexAttribArray: _glEnableVertexAttribArray,
  /** @export */
  glFrontFace: _glFrontFace,
  /** @export */
  glGenBuffers: _glGenBuffers,
  /** @export */
  glGenVertexArrays: _glGenVertexArrays,
  /** @export */
  glGetAttribLocation: _glGetAttribLocation,
  /** @export */
  glGetError: _glGetError,
  /** @export */
  glGetIntegerv: _glGetIntegerv,
  /** @export */
  glGetProgramInfoLog: _glGetProgramInfoLog,
  /** @export */
  glGetProgramiv: _glGetProgramiv,
  /** @export */
  glGetShaderInfoLog: _glGetShaderInfoLog,
  /** @export */
  glGetShaderiv: _glGetShaderiv,
  /** @export */
  glGetStringi: _glGetStringi,
  /** @export */
  glGetUniformLocation: _glGetUniformLocation,
  /** @export */
  glInvalidateFramebuffer: _glInvalidateFramebuffer,
  /** @export */
  glLinkProgram: _glLinkProgram,
  /** @export */
  glPixelStorei: _glPixelStorei,
  /** @export */
  glPolygonOffset: _glPolygonOffset,
  /** @export */
  glReadBuffer: _glReadBuffer,
  /** @export */
  glScissor: _glScissor,
  /** @export */
  glShaderSource: _glShaderSource,
  /** @export */
  glStencilFunc: _glStencilFunc,
  /** @export */
  glStencilFuncSeparate: _glStencilFuncSeparate,
  /** @export */
  glStencilMask: _glStencilMask,
  /** @export */
  glStencilOp: _glStencilOp,
  /** @export */
  glStencilOpSeparate: _glStencilOpSeparate,
  /** @export */
  glUniform1i: _glUniform1i,
  /** @export */
  glUseProgram: _glUseProgram,
  /** @export */
  glVertexAttribDivisor: _glVertexAttribDivisor,
  /** @export */
  glVertexAttribPointer: _glVertexAttribPointer,
  /** @export */
  glViewport: _glViewport,
  /** @export */
  sapp_js_add_beforeunload_listener,
  /** @export */
  sapp_js_add_clipboard_listener,
  /** @export */
  sapp_js_add_dragndrop_listeners,
  /** @export */
  sapp_js_clear_favicon,
  /** @export */
  sapp_js_init,
  /** @export */
  sapp_js_remove_beforeunload_listener,
  /** @export */
  sapp_js_remove_clipboard_listener,
  /** @export */
  sapp_js_remove_dragndrop_listeners,
  /** @export */
  sapp_js_request_pointerlock,
  /** @export */
  sapp_js_set_favicon,
  /** @export */
  slog_js_log
};
var wasmExports = createWasm();
var ___wasm_call_ctors = createExportWrapper('__wasm_call_ctors', 0);
var __sapp_emsc_onpaste = Module['__sapp_emsc_onpaste'] = createExportWrapper('_sapp_emsc_onpaste', 1);
var __sapp_html5_get_ask_leave_site = Module['__sapp_html5_get_ask_leave_site'] = createExportWrapper('_sapp_html5_get_ask_leave_site', 0);
var __sapp_emsc_begin_drop = Module['__sapp_emsc_begin_drop'] = createExportWrapper('_sapp_emsc_begin_drop', 1);
var __sapp_emsc_drop = Module['__sapp_emsc_drop'] = createExportWrapper('_sapp_emsc_drop', 2);
var __sapp_emsc_end_drop = Module['__sapp_emsc_end_drop'] = createExportWrapper('_sapp_emsc_end_drop', 3);
var __sapp_emsc_invoke_fetch_cb = Module['__sapp_emsc_invoke_fetch_cb'] = createExportWrapper('_sapp_emsc_invoke_fetch_cb', 8);
var _main = Module['_main'] = createExportWrapper('__main_argc_argv', 2);
var _malloc = createExportWrapper('malloc', 1);
var _fflush = createExportWrapper('fflush', 1);
var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports['emscripten_stack_init'])();
var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'])();
var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'])();
var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'])();
var __emscripten_stack_restore = (a0) => (__emscripten_stack_restore = wasmExports['_emscripten_stack_restore'])(a0);
var __emscripten_stack_alloc = (a0) => (__emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'])(a0);
var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'])();


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

var missingLibrarySymbols = [
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'convertI32PairToI53',
  'convertI32PairToI53Checked',
  'convertU32PairToI53',
  'getTempRet0',
  'setTempRet0',
  'zeroMemory',
  'growMemory',
  'strError',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'initRandomFill',
  'randomFill',
  'emscriptenLog',
  'readEmAsmArgs',
  'getExecutableName',
  'listenOnce',
  'autoResumeAudioContext',
  'dynCallLegacy',
  'getDynCaller',
  'dynCall',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'asmjsMangle',
  'asyncLoad',
  'mmapAlloc',
  'HandleAllocator',
  'getNativeTypeSize',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'getCFunc',
  'ccall',
  'cwrap',
  'uleb128Encode',
  'sigToWasmTypes',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'intArrayFromString',
  'intArrayToString',
  'AsciiToString',
  'stringToAscii',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'writeArrayToMemory',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'jsStackTrace',
  'getCallstack',
  'convertPCtoSourceLocation',
  'getEnvStrings',
  'checkWasiClock',
  'flush_NO_FILESYSTEM',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'createDyncallWrapper',
  'safeSetTimeout',
  'setImmediateWrapped',
  'clearImmediateWrapped',
  'polyfillSetImmediate',
  'registerPostMainLoop',
  'registerPreMainLoop',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'ExceptionInfo',
  'findMatchingCatch',
  'Browser_asyncPrepareDataCounter',
  'safeRequestAnimationFrame',
  'isLeapYear',
  'ydayFromDate',
  'arraySum',
  'addDays',
  'getSocketFromFD',
  'getSocketAddress',
  'heapObjectForWebGLType',
  'toTypedArrayIndex',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  'emscriptenWebGLGetUniform',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'writeGLArray',
  'runAndAbortIfError',
  'emscriptenWebGLGetIndexed',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'setErrNo',
  'demangle',
  'stackTrace',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

var unexportedSymbols = [
  'run',
  'addOnPreRun',
  'addOnInit',
  'addOnPreMain',
  'addOnExit',
  'addOnPostRun',
  'addRunDependency',
  'removeRunDependency',
  'out',
  'err',
  'callMain',
  'abort',
  'wasmMemory',
  'wasmExports',
  'writeStackCookie',
  'checkStackCookie',
  'intArrayFromBase64',
  'tryParseAsDataURI',
  'writeI53ToI64',
  'readI53FromI64',
  'readI53FromU64',
  'stackSave',
  'stackRestore',
  'stackAlloc',
  'ptrToString',
  'exitJS',
  'getHeapMax',
  'abortOnCannotGrowMemory',
  'ENV',
  'ERRNO_CODES',
  'DNS',
  'Protocols',
  'Sockets',
  'timers',
  'warnOnce',
  'readEmAsmArgsArray',
  'jstoi_q',
  'jstoi_s',
  'handleException',
  'keepRuntimeAlive',
  'callUserCallback',
  'maybeExit',
  'alignMemory',
  'wasmTable',
  'noExitRuntime',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'UTF16Decoder',
  'stringToNewUTF8',
  'stringToUTF8OnStack',
  'JSEvents',
  'registerKeyEventCallback',
  'specialHTMLTargets',
  'maybeCStringToJsString',
  'findEventTarget',
  'findCanvasEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'registerTouchEventCallback',
  'UNWIND_CACHE',
  'ExitStatus',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'Browser',
  'getPreloadedImageData__data',
  'wget',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'SYSCALLS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'webgl_enable_EXT_polygon_offset_clamp',
  'webgl_enable_EXT_clip_control',
  'webgl_enable_WEBGL_polygon_mode',
  'GL',
  'emscriptenWebGLGet',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'registerWebGlEventCallback',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance',
  'webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'print',
  'printErr',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);



var calledRun;
var calledPrerun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain(args = []) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(calledPrerun, 'cannot call main without calling preRun first');

  var entryFunction = _main;

  args.unshift(thisProgram);

  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv;
  args.forEach((arg) => {
    HEAPU32[((argv_ptr)>>2)] = stringToUTF8OnStack(arg);
    argv_ptr += 4;
  });
  HEAPU32[((argv_ptr)>>2)] = 0;

  try {

    var ret = entryFunction(argc, argv);

    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  }
  catch (e) {
    return handleException(e);
  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run(args = arguments_) {

  if (runDependencies > 0) {
    return;
  }

  stackCheckInit();

  if (!calledPrerun) {
    calledPrerun = 1;
    preRun();

    // a preRun added a dependency, run will be called later
    if (runDependencies > 0) {
      return;
    }
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = 1;
    Module['calledRun'] = 1;

    if (ABORT) return;

    initRuntime();

    preMain();

    readyPromiseResolve(Module);
    Module['onRuntimeInitialized']?.();

    if (shouldRunNow) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(() => {
      setTimeout(() => Module['setStatus'](''), 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    _fflush(0);
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
    warnOnce('(this may also be due to not including full filesystem support - try building with -sFORCE_FILESYSTEM)');
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;

run();

// end include: postamble.js

// include: postamble_modularize.js
// In MODULARIZE mode we wrap the generated code in a factory function
// and return either the Module itself, or a promise of the module.
//
// We assign to the `moduleRtn` global here and configure closure to see
// this as and extern so it won't get minified.

moduleRtn = readyPromise;

// Assertion for attempting to access module properties on the incoming
// moduleArg.  In the past we used this object as the prototype of the module
// and assigned properties to it, but now we return a distinct object.  This
// keeps the instance private until it is ready (i.e the promise has been
// resolved).
for (const prop of Object.keys(Module)) {
  if (!(prop in moduleArg)) {
    Object.defineProperty(moduleArg, prop, {
      configurable: true,
      get() {
        abort(`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`)
      }
    });
  }
}
// end include: postamble_modularize.js



  return moduleRtn;
}
);
})();
export default Module;
