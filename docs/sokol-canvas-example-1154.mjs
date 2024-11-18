
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
["_memory","___indirect_function_table","__sapp_emsc_onpaste","__sapp_html5_get_ask_leave_site","__sapp_emsc_begin_drop","__sapp_emsc_drop","__sapp_emsc_end_drop","__sapp_emsc_invoke_fetch_cb","___em_lib_deps_sokol_app","_sapp_js_add_beforeunload_listener","_sapp_js_remove_beforeunload_listener","_sapp_js_add_clipboard_listener","_sapp_js_remove_clipboard_listener","_sapp_js_write_clipboard","_sapp_js_add_dragndrop_listeners","_sapp_js_dropped_file_size","_sapp_js_fetch_dropped_file","_sapp_js_remove_dragndrop_listeners","_sapp_js_init","_sapp_js_request_pointerlock","_sapp_js_exit_pointerlock","_sapp_js_set_cursor","_sapp_js_clear_favicon","_sapp_js_set_favicon","_slog_js_log","_main","onRuntimeInitialized"].forEach((prop) => {
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
    var f = 'data:application/octet-stream;base64,AGFzbQEAAAAB7wEjYAF/AGABfwF/YAAAYAJ/fwBgAn9/AX9gAAF/YAN/f38Bf2AFf39/f38Bf2AEf39/fwBgA39/fwBgB39/f39/f38AYAJ/fABgA39+fwF+YAABfGAFf39/f38AYAR/f39/AX9gBn98f39/fwF/YAJ+fwF/YAR/fn5/AGAEfX19fQBgAn19AGAEf399fwBgBn9/f39/fwBgCn9/f39/f39/f38AYAh/f39/f39/fwBgAnx/AX9gAn5+AX9gAX8BfGABfQF9YAJ8fwF8YAd/f39/f39/AX9gA35/fwF/YAF8AX5gAn5+AXxgBH9/fn8BfgLfGnMDZW52DV9fYXNzZXJ0X2ZhaWwACANlbnYMc2FwcF9qc19pbml0AAADZW52H2Vtc2NyaXB0ZW5fZ2V0X2VsZW1lbnRfY3NzX3NpemUABgNlbnYoZW1zY3JpcHRlbl9zZXRfcmVzaXplX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiFlbXNjcmlwdGVuX2dldF9kZXZpY2VfcGl4ZWxfcmF0aW8ADQNlbnYiZW1zY3JpcHRlbl9zZXRfY2FudmFzX2VsZW1lbnRfc2l6ZQAGA2VudhhlbXNjcmlwdGVuX3NldF9tYWluX2xvb3AACQNlbnYnZW1zY3JpcHRlbl9yZXF1ZXN0X2FuaW1hdGlvbl9mcmFtZV9sb29wAAMDZW52FXNhcHBfanNfY2xlYXJfZmF2aWNvbgACA2VudhNzYXBwX2pzX3NldF9mYXZpY29uAAkDZW52C3Nsb2dfanNfbG9nAAMDZW52H2Vtc2NyaXB0ZW5fd2ViZ2xfY3JlYXRlX2NvbnRleHQABANlbnYlZW1zY3JpcHRlbl93ZWJnbF9tYWtlX2NvbnRleHRfY3VycmVudAABA2Vudg1nbEdldEludGVnZXJ2AAMDZW52IWVtc2NyaXB0ZW5fd2ViZ2xfZW5hYmxlX2V4dGVuc2lvbgAEA2VuditlbXNjcmlwdGVuX3NldF9tb3VzZWRvd25fY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52KWVtc2NyaXB0ZW5fc2V0X21vdXNldXBfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52K2Vtc2NyaXB0ZW5fc2V0X21vdXNlbW92ZV9jYWxsYmFja19vbl90aHJlYWQABwNlbnYsZW1zY3JpcHRlbl9zZXRfbW91c2VlbnRlcl9jYWxsYmFja19vbl90aHJlYWQABwNlbnYsZW1zY3JpcHRlbl9zZXRfbW91c2VsZWF2ZV9jYWxsYmFja19vbl90aHJlYWQABwNlbnYnZW1zY3JpcHRlbl9zZXRfd2hlZWxfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52KWVtc2NyaXB0ZW5fc2V0X2tleWRvd25fY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52J2Vtc2NyaXB0ZW5fc2V0X2tleXVwX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiplbXNjcmlwdGVuX3NldF9rZXlwcmVzc19jYWxsYmFja19vbl90aHJlYWQABwNlbnYsZW1zY3JpcHRlbl9zZXRfdG91Y2hzdGFydF9jYWxsYmFja19vbl90aHJlYWQABwNlbnYrZW1zY3JpcHRlbl9zZXRfdG91Y2htb3ZlX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiplbXNjcmlwdGVuX3NldF90b3VjaGVuZF9jYWxsYmFja19vbl90aHJlYWQABwNlbnYtZW1zY3JpcHRlbl9zZXRfdG91Y2hjYW5jZWxfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52M2Vtc2NyaXB0ZW5fc2V0X3BvaW50ZXJsb2NrY2hhbmdlX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudjJlbXNjcmlwdGVuX3NldF9wb2ludGVybG9ja2Vycm9yX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudidlbXNjcmlwdGVuX3NldF9mb2N1c19jYWxsYmFja19vbl90aHJlYWQABwNlbnYmZW1zY3JpcHRlbl9zZXRfYmx1cl9jYWxsYmFja19vbl90aHJlYWQABwNlbnYhc2FwcF9qc19hZGRfYmVmb3JldW5sb2FkX2xpc3RlbmVyAAIDZW52HnNhcHBfanNfYWRkX2NsaXBib2FyZF9saXN0ZW5lcgACA2Vudh9zYXBwX2pzX2FkZF9kcmFnbmRyb3BfbGlzdGVuZXJzAAADZW52MmVtc2NyaXB0ZW5fc2V0X3dlYmdsY29udGV4dGxvc3RfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52NmVtc2NyaXB0ZW5fc2V0X3dlYmdsY29udGV4dHJlc3RvcmVkX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudhplbXNjcmlwdGVuX3BlcmZvcm1hbmNlX25vdwANA2VudhtlbXNjcmlwdGVuX2NhbmNlbF9tYWluX2xvb3AAAgNlbnYbc2FwcF9qc19yZXF1ZXN0X3BvaW50ZXJsb2NrAAIDZW52JHNhcHBfanNfcmVtb3ZlX2JlZm9yZXVubG9hZF9saXN0ZW5lcgACA2VudiFzYXBwX2pzX3JlbW92ZV9jbGlwYm9hcmRfbGlzdGVuZXIAAgNlbnYic2FwcF9qc19yZW1vdmVfZHJhZ25kcm9wX2xpc3RlbmVycwAAA2VudgpnbEdldEVycm9yAAUDZW52EWdsR2VuVmVydGV4QXJyYXlzAAMDZW52EWdsQmluZFZlcnRleEFycmF5AAADZW52DWdsUGl4ZWxTdG9yZWkAAwNlbnYMZ2xHZXRTdHJpbmdpAAQDZW52GmdsRGlzYWJsZVZlcnRleEF0dHJpYkFycmF5AAADZW52CGdsRW5hYmxlAAADZW52C2dsRGVwdGhGdW5jAAADZW52C2dsRGVwdGhNYXNrAAADZW52CWdsRGlzYWJsZQAAA2Vudg1nbFN0ZW5jaWxGdW5jAAkDZW52C2dsU3RlbmNpbE9wAAkDZW52DWdsU3RlbmNpbE1hc2sAAANlbnYTZ2xCbGVuZEZ1bmNTZXBhcmF0ZQAIA2VudhdnbEJsZW5kRXF1YXRpb25TZXBhcmF0ZQADA2VudgxnbEJsZW5kQ29sb3IAEwNlbnYLZ2xDb2xvck1hc2sACANlbnYPZ2xQb2x5Z29uT2Zmc2V0ABQDZW52C2dsRnJvbnRGYWNlAAADZW52CmdsQ3VsbEZhY2UAAANlbnYMZ2xCaW5kQnVmZmVyAAMDZW52EGdsQmluZEJ1ZmZlckJhc2UACQNlbnYPZ2xBY3RpdmVUZXh0dXJlAAADZW52DWdsQmluZFRleHR1cmUAAwNlbnYNZ2xCaW5kU2FtcGxlcgADA2Vudg9nbERlbGV0ZUJ1ZmZlcnMAAwNlbnYQZ2xEZWxldGVUZXh0dXJlcwADA2VudhVnbERlbGV0ZVJlbmRlcmJ1ZmZlcnMAAwNlbnYQZ2xEZWxldGVTYW1wbGVycwADA2Vudg9nbERlbGV0ZVByb2dyYW0AAANlbnYMZ2xVc2VQcm9ncmFtAAADZW52FGdsRGVsZXRlRnJhbWVidWZmZXJzAAMDZW52FGdsRGVsZXRlVmVydGV4QXJyYXlzAAMDZW52DGdsR2VuQnVmZmVycwADA2VudgxnbEJ1ZmZlckRhdGEACANlbnYPZ2xCdWZmZXJTdWJEYXRhAAgDZW52D2dsQ3JlYXRlUHJvZ3JhbQAFA2Vudg5nbEF0dGFjaFNoYWRlcgADA2Vudg1nbExpbmtQcm9ncmFtAAADZW52DmdsRGVsZXRlU2hhZGVyAAADZW52DmdsR2V0UHJvZ3JhbWl2AAkDZW52E2dsR2V0UHJvZ3JhbUluZm9Mb2cACANlbnYUZ2xHZXRVbmlmb3JtTG9jYXRpb24ABANlbnYLZ2xVbmlmb3JtMWkAAwNlbnYOZ2xDcmVhdGVTaGFkZXIAAQNlbnYOZ2xTaGFkZXJTb3VyY2UACANlbnYPZ2xDb21waWxlU2hhZGVyAAADZW52DWdsR2V0U2hhZGVyaXYACQNlbnYSZ2xHZXRTaGFkZXJJbmZvTG9nAAgDZW52E2dsR2V0QXR0cmliTG9jYXRpb24ABANlbnYRZ2xCaW5kRnJhbWVidWZmZXIAAwNlbnYKZ2xWaWV3cG9ydAAIA2VudglnbFNjaXNzb3IACANlbnYPZ2xDbGVhckJ1ZmZlcmZ2AAkDZW52D2dsQ2xlYXJCdWZmZXJmaQAVA2Vudg9nbENsZWFyQnVmZmVyaXYACQNlbnYVZ2xTdGVuY2lsRnVuY1NlcGFyYXRlAAgDZW52E2dsU3RlbmNpbE9wU2VwYXJhdGUACANlbnYVZ2xWZXJ0ZXhBdHRyaWJQb2ludGVyABYDZW52FWdsVmVydGV4QXR0cmliRGl2aXNvcgADA2VudhlnbEVuYWJsZVZlcnRleEF0dHJpYkFycmF5AAADZW52F2dsRHJhd0VsZW1lbnRzSW5zdGFuY2VkAA4DZW52DmdsRHJhd0VsZW1lbnRzAAgDZW52FWdsRHJhd0FycmF5c0luc3RhbmNlZAAIA2VudgxnbERyYXdBcnJheXMACQNlbnYMZ2xSZWFkQnVmZmVyAAADZW52EWdsQmxpdEZyYW1lYnVmZmVyABcDZW52F2dsSW52YWxpZGF0ZUZyYW1lYnVmZmVyAAkDZW52CV9hYm9ydF9qcwACA2VudhVfZW1zY3JpcHRlbl9tZW1jcHlfanMACRZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX3dyaXRlAA8DZW52FmVtc2NyaXB0ZW5fcmVzaXplX2hlYXAAAQPPAs0CAgICAgIJAgAAAQAGBQABAwUAAgMBCAkYBAAABgICAAIZBQUFBQUCAQQDAQEPBQUFBQUFBQUFBQUFBQUAAwMDAAADAQACAAICAAAAAAAAAAIAAAUIBQEGBQUEBAEEBAQEBAQEBAQEAwMBAwQDAwEDBAMDAQEDBgEBAQADAQADAgQEAQUAAAEAAAABAQEJCQkCAgICAgICAhoKBgYAAAMABgYGBgYGBgYGCwICAgIBAAAAAQIBAQEBAQsCAgABGwsBAQECAgAJAAICAgICAgAAAAAAAAAAAAAAAAAAAAAAAwAAAAQBAQADAAgBAAYGBAYIBAMEAQYBAQEBAQQEAQEBAQEBAwACBgYFAAAEHAYBDAQBBgYEBAYGBAQEBAQBAAUCAQQFHQYHHgkBCB8REQ4GEAMgAQUFBQIGBAUBAQYAEhIhAAUCBQUFAQABBSIHBAUBcAEXFwUGAQHuBe4FBqoBGX8BQYCABAt/AUEAC38BQQALfwFBAAt/AEG4/gYLfwBB3P4GC38AQbuABwt/AEGQgQcLfwBBlIMHC38AQduDBwt/AEHChwcLfwBBzJEHC38AQYuTBwt/AEHlmAcLfwBBiZwHC38AQeWgBwt/AEH2oQcLfwBBwqIHC38AQbinBwt/AEGwqAcLfwBBn6wHC38AQbj+Bgt/AEHc/gYLfwBB3P4GC38AQYmuBwsHiAkpBm1lbW9yeQIAEV9fd2FzbV9jYWxsX2N0b3JzAHMZX19pbmRpcmVjdF9mdW5jdGlvbl90YWJsZQEAEl9zYXBwX2Vtc2Nfb25wYXN0ZQB9Hl9zYXBwX2h0bWw1X2dldF9hc2tfbGVhdmVfc2l0ZQCDARVfc2FwcF9lbXNjX2JlZ2luX2Ryb3AAhAEPX3NhcHBfZW1zY19kcm9wAIYBE19zYXBwX2Vtc2NfZW5kX2Ryb3AAiQEaX3NhcHBfZW1zY19pbnZva2VfZmV0Y2hfY2IAigEQX19tYWluX2FyZ2NfYXJndgCLAQZtYWxsb2MArgMXX19lbV9saWJfZGVwc19zb2tvbF9hcHADBCpfX2VtX2pzX19zYXBwX2pzX2FkZF9iZWZvcmV1bmxvYWRfbGlzdGVuZXIDBS1fX2VtX2pzX19zYXBwX2pzX3JlbW92ZV9iZWZvcmV1bmxvYWRfbGlzdGVuZXIDBidfX2VtX2pzX19zYXBwX2pzX2FkZF9jbGlwYm9hcmRfbGlzdGVuZXIDBypfX2VtX2pzX19zYXBwX2pzX3JlbW92ZV9jbGlwYm9hcmRfbGlzdGVuZXIDCCBfX2VtX2pzX19zYXBwX2pzX3dyaXRlX2NsaXBib2FyZAMJKF9fZW1fanNfX3NhcHBfanNfYWRkX2RyYWduZHJvcF9saXN0ZW5lcnMDCiJfX2VtX2pzX19zYXBwX2pzX2Ryb3BwZWRfZmlsZV9zaXplAwsjX19lbV9qc19fc2FwcF9qc19mZXRjaF9kcm9wcGVkX2ZpbGUDDCtfX2VtX2pzX19zYXBwX2pzX3JlbW92ZV9kcmFnbmRyb3BfbGlzdGVuZXJzAw0VX19lbV9qc19fc2FwcF9qc19pbml0Aw4kX19lbV9qc19fc2FwcF9qc19yZXF1ZXN0X3BvaW50ZXJsb2NrAw8hX19lbV9qc19fc2FwcF9qc19leGl0X3BvaW50ZXJsb2NrAxAbX19lbV9qc19fc2FwcF9qc19zZXRfY3Vyc29yAxEeX19lbV9qc19fc2FwcF9qc19jbGVhcl9mYXZpY29uAxIcX19lbV9qc19fc2FwcF9qc19zZXRfZmF2aWNvbgMTFF9fZW1fanNfX3Nsb2dfanNfbG9nAxQGZmZsdXNoALoDFWVtc2NyaXB0ZW5fc3RhY2tfaW5pdAC2AxllbXNjcmlwdGVuX3N0YWNrX2dldF9mcmVlALcDGWVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2Jhc2UAuAMYZW1zY3JpcHRlbl9zdGFja19nZXRfZW5kALkDGV9lbXNjcmlwdGVuX3N0YWNrX3Jlc3RvcmUAuwMXX2Vtc2NyaXB0ZW5fc3RhY2tfYWxsb2MAvAMcZW1zY3JpcHRlbl9zdGFja19nZXRfY3VycmVudAC9AxNfX3N0YXJ0X2VtX2xpYl9kZXBzAxUSX19zdG9wX2VtX2xpYl9kZXBzAxYNX19zdGFydF9lbV9qcwMXDF9fc3RvcF9lbV9qcwMYDGR5bkNhbGxfamlqaQC/AwkuAQBBAQsWeXR2eosCjgGSAZMBkgKTApQClQKWApcCmAKZ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DAJAA0AgBCAMQQJ0aigCACIORQ0BIAMgDEEDdGogDiACIAYQnANBASELIAxBAWoiDEEKRw0ADAwLAAsCQCAMQQpJDQBBASELDAsLA0AgBCAMQQJ0aigCAA0BQQEhCyAMQQFqIgxBCkYNCwwACwALQRwhFgwHCyAHIAw6ACdBASEUIAghDSAJIRYgFyERDAELIAkhFgsgFCAWIA1rIgEgFCABShsiEiAQQf////8Hc0oNA0E9IRYgEyAQIBJqIg8gEyAPShsiDCAOSg0EIABBICAMIA8gERCgAyAAIBggEBCaAyAAQTAgDCAPIBFBgIAEcxCgAyAAQTAgEiABQQAQoAMgACANIAEQmgMgAEEgIAwgDyARQYDAAHMQoAMgBygCPCEBDAELCwtBACELDAMLQT0hFgsQlQMgFjYCAAtBfyELCyAHQcAAaiQAIAsLGQACQCAALQAAQSBxDQAgASACIAAQlwMaCwt7AQV/QQAhAQJAIAAoAgAiAiwAAEFQaiIDQQlNDQBBAA8LA0BBfyEEAkAgAUHMmbPmAEsNAEF/IAMgAUEKbCIBaiADIAFB/////wdzSxshBAsgACACQQFqIgM2AgAgAiwAASEFIAQhASADIQIgBUFQaiIDQQpJDQALIAQLtgQAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAUF3ag4SAAECBQMEBgcICQoLDA0ODxAREgsgAiACKAIAIgFBBGo2AgAgACABKAIANgIADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABMgEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMwEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMAAANwMADwsgAiACKAIAIgFBBGo2AgAgACABMQAANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhx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IAI2AhAMAQsgBiACNgIUCyACRQ0BCyACIAY2AhgCQCADKAIQIgRFDQAgAiAENgIQIAQgAjYCGAsgAygCFCIERQ0AIAIgBDYCFCAEIAI2AhgLIAEgAEEBcjYCBCABIABqIAA2AgAgAUEAKALIjQhHDQBBACAANgK8jQgPCwJAIABB/wFLDQAgAEF4cUHcjQhqIQICQAJAQQAoArSNCCIEQQEgAEEDdnQiAHENAEEAIAQgAHI2ArSNCCACIQAMAQsgAigCCCEACyACIAE2AgggACABNgIMIAEgAjYCDCABIAA2AggPC0EfIQICQCAAQf///wdLDQAgAEEmIABBCHZnIgJrdkEBcSACQQF0a0E+aiECCyABIAI2AhwgAUIANwIQIAJBAnRB5I8IaiEFAkACQAJAAkBBACgCuI0IIgRBASACdCIDcQ0AQQAgBCADcjYCuI0IIAUgATYCAEEIIQBBGCECDAELIABBAEEZIAJBAXZrIAJBH0YbdCECIAUoAgAhBQNAIAUiBCgCBEF4cSAARg0CIAJBHXYhBSACQQF0IQIgBCAFQQRxaiIDKAIQIgUNAAsgA0EQaiABNgIAQQghAEEYIQIgBCEFCyABIQQgASEDDAELIAQoAggiBSABNgIMIAQgATYCCEEAIQNBGCEAQQghAgsgASACaiAFNgIAIAEgBDYCDCABIABqIAM2AgBBAEEAKALUjQhBf2oiAUF/IAEbNgLUjQgLC1MBAX4CQAJAIANBwABxRQ0AIAEgA0FAaq2GIQJCACEBDAELIANFDQAgAUHAACADa62IIAIgA60iBIaEIQIgASAEhiEBCyAAIAE3AwAgACACNwMIC1MBAX4CQAJAIANBwABxRQ0AIAIgA0FAaq2IIQFCACECDAELIANFDQAgAkHAACADa62GIAEgA60iBIiEIQEgAiAEiCECCyAAIAE3AwAgACACNwMIC5AEAgV/An4jAEEgayICJAAgAUL///////8/gyEHAkACQCABQjCIQv//AYMiCKciA0H/h39qQf0PSw0AIABCPIggB0IEhoQhByADQYCIf2qtIQgCQAJAIABC//////////8PgyIAQoGAgICAgICACFQNACAHQgF8IQcMAQsgAEKAgICAgICAgAhSDQAgB0IBgyAHfCEHC0IAIAcgB0L/////////B1YiAxshACADrSAIfCEHDAELAkAgACAHhFANACAIQv//AVINACAAQjyIIAdCBIaEQoCAgICAgIAEhCEAQv8PIQcMAQsCQCADQf6HAU0NAEL/DyEHQgAhAAwBCwJAQYD4AEGB+AAgCFAiBBsiBSADayIGQfAATA0AQgAhAEIAIQcMAQsgAkEQaiAAIAcgB0KAgICAgIDAAIQgBBsiB0GAASAGaxCxAyACIAAgByAGELIDIAIpAwAiB0I8iCACQQhqKQMAQgSGhCEAAkACQCAHQv//////////D4MgBSADRyACKQMQIAJBEGpBCGopAwCEQgBSca2EIgdCgYCAgICAgIAIVA0AIABCAXwhAAwBCyAHQoCAgICAgICACFINACAAQgGDIAB8IQALIABCgICAgICAgAiFIAAgAEL/////////B1YiAxshACADrSEHCyACQSBqJAAgB0I0hiABQoCAgICAgICAgH+DhCAAhL8LBgAgACQBCwQAIwELEgBBgIAEJANBAEEPakFwcSQCCwcAIwAjAmsLBAAjAwsEACMCC8gCAQN/AkAgAA0AQQAhAQJAQQAoArD+BkUNAEEAKAKw/gYQugMhAQsCQEEAKALwiwhFDQBBACgC8IsIELoDIAFyIQELAkAQkQMoAgAiAEUNAANAAkACQCAAKAJMQQBODQBBASECDAELIAAQjwNFIQILAkAgACgCFCAAKAIcRg0AIAAQugMgAXIhAQsCQCACDQAgABCQAwsgACgCOCIADQALCxCSAyABDwsCQAJAIAAoAkxBAE4NAEEBIQIMAQsgABCPA0UhAgsCQAJAAkAgACgCFCAAKAIcRg0AIABBAEEAIAAoAiQRBgAaIAAoAhQNAEF/IQEgAkUNAQwCCwJAIAAoAgQiASAAKAIIIgNGDQAgACABIANrrEEBIAAoAigRDAAaC0EAIQEgAEEANgIcIABCADcDECAAQgA3AgQgAg0BCyAAEJADCyABCwYAIAAkAAsSAQJ/IwAgAGtBcHEiASQAIAELBAAjAAsNACABIAIgAyAAEQwACyUBAX4gACABIAKtIAOtQiCGhCAEEL4DIQUgBUIgiKcQtAMgBacLC6quAwQAQYCABAuw6gJBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkxPV01FTU9SWTogTmF0aXZlQWN0aXZpdHkgb25Mb3dNZW1vcnkAX3NhcHBfc3RyY3B5AF9zZ19zdHJjcHkAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05ERVNUUk9ZOiBOYXRpdmVBY3Rpdml0eSBvbkRlc3Ryb3kATnVtcGFkTXVsdGlwbHkAX3NnX3Nsb3RfaW5kZXgAKDApICE9IHNsb3RfaW5kZXgAX3NnX3Bvb2xfYWxsb2NfaW5kZXgALSsgICAwWDB4AC0wWCswWCAwWC0weCsweCAweABXSU4zMl9DUkVBVEVfSEVMUEVSX1dJTkRPV19GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgaGVscGVyIHdpbmRvdwBzYXBwX3dncHVfZ2V0X3JlbmRlcl92aWV3AHNhcHBfZDNkMTFfZ2V0X3JlbmRlcl92aWV3AHNhcHBfd2dwdV9nZXRfZGVwdGhfc3RlbmNpbF92aWV3AHNhcHBfZDNkMTFfZ2V0X2RlcHRoX3N0ZW5jaWxfdmlldwBzYXBwX3dncHVfZ2V0X3Jlc29sdmVfdmlldwBzYXBwX2QzZDExX2dldF9yZXNvbHZlX3ZpZXcAX3NnX2dsX2RyYXcAc2dfZHJhdwBzYXBwX2QzZDExX2dldF9kZXZpY2VfY29udGV4dABXSU4zMl9EVU1NWV9DT05URVhUX1NFVF9QSVhFTEZPUk1BVF9GQUlMRUQ6IGZhaWxlZCB0byBzZXQgcGl4ZWwgZm9ybWF0IGZvciBkdW1teSBHTCBjb250ZXh0AFdJTjMyX0NSRUFURV9EVU1NWV9DT05URVhUX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSBkdW1teSBHTCBjb250ZXh0AF9zYXBwX3RpbWluZ19wdXQAVkFMSURBVEVfU0hBREVSREVTQ19VQl9TVEQxNDBfQVJSQVlfVFlQRTogdW5pZm9ybSBhcnJheXMgb25seSBhbGxvd2VkIGZvciBGTE9BVDQsIElOVDQsIE1BVDQgaW4gc3RkMTQwIGxheW91dABkc3QASW5zZXJ0AFZBTElEQVRFX0FVQl9OT19VQl9BVF9TTE9UOiBzZ19hcHBseV91bmlmb3Jtczogbm8gdW5pZm9ybSBibG9jayBkZWNsYXJhdGlvbiBhdCB0aGlzIHNoYWRlciBzdGFnZSBVQiBzbG90AFZBTElEQVRFX0FQSVBfU0FNUExFX0NPVU5UOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgTVNBQSBzYW1wbGUgY291bnQgZG9lc24ndCBtYXRjaCByZW5kZXIgcGFzcyBhdHRhY2htZW50IHNhbXBsZSBjb3VudABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU1BR0VfU0FNUExFX0NPVU5UOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgc2FtcGxlIGNvdW50IG11c3QgbWF0Y2ggY29sb3IgYXR0YWNobWVudCBzYW1wbGUgY291bnQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFX1NBTVBMRV9DT1VOVFM6IGFsbCBwYXNzIGF0dGFjaG1lbnRzIG11c3QgaGF2ZSB0aGUgc2FtZSBzYW1wbGUgY291bnQAV0lOMzJfRFVNTVlfQ09OVEVYVF9NQUtFX0NVUlJFTlRfRkFJTEVEOiBmYWlsZWQgdG8gbWFrZSBkdW1teSBHTCBjb250ZXh0IGN1cnJlbnQAX3NnX3VuaWZvcm1fYWxpZ25tZW50AF9zZ19zaGFkZXJfY29tbW9uX2luaXQAX3NnX3BpcGVsaW5lX2NvbW1vbl9pbml0AHNnX2NvbW1pdABfc2dfdmFsaWRhdGVfc2V0X3Nsb3RfYml0AEFycm93UmlnaHQAQWx0UmlnaHQAU2hpZnRSaWdodABCcmFja2V0UmlnaHQAQ29udHJvbFJpZ2h0AE1ldGFSaWdodABBcnJvd0xlZnQAQWx0TGVmdABTaGlmdExlZnQAQnJhY2tldExlZnQAQ29udHJvbExlZnQATWV0YUxlZnQAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfQ09MT1JGT1JNQVRfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5jb2xvcl9mb3JtYXQgdG8gYmUgdW5zZXQAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfREVQVEhGT1JNQVRfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kZXB0aF9mb3JtYXQgdG8gYmUgdW5zZXQAdWJfZGVzYy0+c2l6ZSA9PSAoc2l6ZV90KWN1cl91bmlmb3JtX29mZnNldABfc2dfZ2xfYnVmZmVyX3RhcmdldABXSU4zMl9EM0QxMV9HRVRfSURYR0lGQUNUT1JZX0ZBSUxFRDogY291bGQgbm90IG9idGFpbiBJRFhHSUZhY3Rvcnkgb2JqZWN0AFdJTjMyX0QzRDExX0dFVF9JRFhHSUFEQVBURVJfRkFJTEVEOiBjb3VsZCBub3Qgb2J0YWluIElEWEdJQWRhcHRlciBvYmplY3QAV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX1NXQVBDSEFJTl9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgc3dhcGNoYWluIG9iamVjdABOdW1wYWRTdWJ0cmFjdABfY29sb3JfYnVmZmVyX2Zsb2F0AF9jb2xvcl9idWZmZXJfaGFsZl9mbG9hdABWQUxJREFURV9BUElQX0NPTE9SX0ZPUk1BVDogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIGNvbG9yIGF0dGFjaG1lbnQgcGl4ZWwgZm9ybWF0IGRvZXNuJ3QgbWF0Y2ggcGFzcyBjb2xvciBhdHRhY2htZW50IHBpeGVsIGZvcm1hdABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9JTUFHRV9GT1JNQVQ6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IHBpeGVsIGZvcm1hdCBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0FQSVBfREVQVEhfRk9STUFUOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgZGVwdGggcGl4ZWxfZm9ybWF0IGRvZXNuJ3QgbWF0Y2ggcGFzcyBkZXB0aCBhdHRhY2htZW50IHBpeGVsIGZvcm1hdABWQUxJREFURV9JTUFHRURFU0NfTk9fTVNBQV9SVF9TVVBQT1JUOiBNU0FBIG5vdCBzdXBwb3J0ZWQgZm9yIHRoaXMgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19DT0xPUl9JTlZfUElYRUxGT1JNQVQ6IHBhc3MgY29sb3ItYXR0YWNobWVudCBpbWFnZXMgbXVzdCBiZSByZW5kZXJhYmxlIGNvbG9yIHBpeGVsIGZvcm1hdABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU5WX1BJWEVMRk9STUFUOiBwYXNzIGRlcHRoLWF0dGFjaG1lbnQgaW1hZ2UgbXVzdCBiZSBkZXB0aCBvciBkZXB0aC1zdGVuY2lsIHBpeGVsIGZvcm1hdABXSU4zMl9XR0xfU0VUX1BJWEVMRk9STUFUX0ZBSUxFRDogZmFpbGVkIHRvIHNldCBzZWxlY3RlZCBwaXhlbCBmb3JtYXQAV0lOMzJfV0dMX0ZJTkRfUElYRUxGT1JNQVRfRkFJTEVEOiBmYWlsZWQgdG8gZmluZCBtYXRjaGluZyBXR0wgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0lNQUdFREVTQ19ERVBUSF8zRF9JTUFHRTogM0QgaW1hZ2VzIGNhbm5vdCBoYXZlIGEgZGVwdGgvc3RlbmNpbCBpbWFnZSBmb3JtYXQAX3NnX2F0dGFjaG1lbnRzX2F0AF9zZ19zYW1wbGVyX2F0AF9zZ19idWZmZXJfYXQAX3NnX3NoYWRlcl9hdABfc2dfcGlwZWxpbmVfYXQAX3NnX2ltYWdlX2F0AFZBTElEQVRFX1BJUEVMSU5FREVTQ19OT19DT05UX0FUVFJTOiBzZ19waXBlbGluZV9kZXNjLmxheW91dC5hdHRycyBpcyBub3QgY29udGludW91cwBNaW51cwBhdHRzAEJFR0lOUEFTU19BVFRBQ0hNRU5UX0lOVkFMSUQ6IHNnX2JlZ2luX3Bhc3M6IGFuIGF0dGFjaG1lbnQgd2FzIHByb3ZpZGVkIHRoYXQgbm8gbG9uZ2VyIGV4aXN0cwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTk9fQ09OVF9DT0xPUl9BVFRTOiBjb2xvciBhdHRhY2htZW50cyBtdXN0IG9jY3VweSBjb250aW51b3VzIHNsb3RzAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fQ09OVF9VQl9NRU1CRVJTOiB1bmlmb3JtIGJsb2NrIG1lbWJlcnMgbXVzdCBvY2N1cHkgY29udGludW91cyBzbG90cwBMSU5VWF9HTFhfTE9BRF9FTlRSWV9QT0lOVFNfRkFJTEVEOiBmYWlsZWQgdG8gbG9hZCBHTFggZW50cnkgcG9pbnRzAF9zZ19sb29rdXBfYXR0YWNobWVudHMAX3NnX2dsX2Rpc2NhcmRfYXR0YWNobWVudHMAVkFMSURBVEVfQVBJUF9BVFRfQ09VTlQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBudW1iZXIgb2YgcGlwZWxpbmUgY29sb3IgYXR0YWNobWVudHMgZG9lc24ndCBtYXRjaCBudW1iZXIgb2YgcGFzcyBjb2xvciBhdHRhY2htZW50cwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTk9fQVRUQUNITUVOVFM6IHNnX2F0dGFjaG1lbnRzX2Rlc2Mgbm8gY29sb3Igb3IgZGVwdGgtc3RlbmNpbCBhdHRhY2htZW50cwBXR1BVX0FUVEFDSE1FTlRTX0NSRUFURV9URVhUVVJFX1ZJRVdfRkFJTEVEOiB3Z3B1VGV4dHVyZUNyZWF0ZVZpZXcoKSBmYWlsZWQgaW4gY3JlYXRlIGF0dGFjaG1lbnRzAF9zZ19wYXNzX2FjdGlvbl9kZWZhdWx0cwBfc2FwcF9kZXNjX2RlZmF1bHRzAF9zZ19waXBlbGluZV9kZXNjX2RlZmF1bHRzAF9zZ19nbF9pbml0X2xpbWl0cwBfc2dfdmFsaWRhdGVfc2xvdF9iaXRzAF9zZ19nbF9iZWdpbl9wYXNzAHNnX2JlZ2luX3Bhc3MAIV9zZy5jdXJfcGFzcy5pbl9wYXNzAF9zZ19nbF9lbmRfcGFzcwBzZ19lbmRfcGFzcwBhdHRyX2xvYyA8IChHTGludClfc2cubGltaXRzLm1heF92ZXJ0ZXhfYXR0cnMAcG9vbCAmJiBwb29sLT5nZW5fY3RycwBWQUxJREFURV9BQk5EX0VYUEVDVEVEX05PTkZJTFRFUklOR19TQU1QTEVSOiBzZ19hcHBseV9iaW5kaW5nczogc2hhZGVyIGV4cGVjdGVkIFNHX1NBTVBMRVJUWVBFX05PTkZJTFRFUklORywgYnV0IHNhbXBsZXIgaGFzIFNHX0ZJTFRFUl9MSU5FQVIgZmlsdGVycwBfc2dfbm90aWZ5X2NvbW1pdF9saXN0ZW5lcnMAX3NnX3NldHVwX2NvbW1pdF9saXN0ZW5lcnMAX3NnX2Rpc2NhcmRfY29tbWl0X2xpc3RlbmVycwBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfV0dTTF9HUk9VUDFfQklORElOR19DT0xMSVNJT046IHNhbXBsZXIgJ3dnc2xfZ3JvdXAxX2JpbmRpbmdfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIGFsbCBpbWFnZXMsIHNhbXBsZXJzIGFuZCBzdG9yYWdlIGJ1ZmZlcnMAVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX1dHU0xfR1JPVVAxX0JJTkRJTkdfQ09MTElTSU9OOiBzdG9yYWdlIGJ1ZmZlciAnd2dzbF9ncm91cDFfYmluZGluZ19uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgYWxsIGltYWdlcywgc2FtcGxlcnMgYW5kIHN0b3JhZ2UgYnVmZmVycwBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1dHU0xfR1JPVVAxX0JJTkRJTkdfQ09MTElTSU9OOiBpbWFnZSAnd2dzbF9ncm91cDFfYmluZGluZ19uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgYWxsIGltYWdlcywgc2FtcGxlcnMgYW5kIHN0b3JhZ2UgYnVmZmVycwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTUlQTEVWRUw6IHBhc3MgYXR0YWNobWVudCBtaXAgbGV2ZWwgaXMgYmlnZ2VyIHRoYW4gaW1hZ2UgaGFzIG1pcG1hcHMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX01JUExFVkVMOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgbWlwIGxldmVsIGlzIGJpZ2dlciB0aGFuIGltYWdlIGhhcyBtaXBtYXBzAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX01JUExFVkVMOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBtaXAgbGV2ZWwgaXMgYmlnZ2VyIHRoYW4gaW1hZ2UgaGFzIG1pcG1hcHMAVkFMSURBVEVfU0hBREVSREVTQ19OT19VQl9NRU1CRVJTOiBHTCBiYWNrZW5kIHJlcXVpcmVzIHVuaWZvcm0gYmxvY2sgbWVtYmVyIGRlY2xhcmF0aW9ucwAwID09IF9zZy5jb21taXRfbGlzdGVuZXJzLml0ZW1zADAgIT0gX3NnLmNvbW1pdF9saXN0ZW5lcnMuaXRlbXMAX3NnX3NldHVwX3Bvb2xzAF9zZ19kaXNjYXJkX3Bvb2xzADAgPT0gX3NhcHAuZGVmYXVsdF9pY29uX3BpeGVscwAwICE9IF9zYXBwLmRlZmF1bHRfaWNvbl9waXhlbHMAVkFMSURBVEVfU0hBREVSREVTQ19VQl9XR1NMX0dST1VQMF9CSU5ESU5HX0NPTExJU0lPTjogdW5pZm9ybSBibG9jayAnd2dzbF9ncm91cDBfYmluZGluZ19uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgYWxsIHVuaWZvcm0gYmxvY2tzAF9zZ19nbF9hcHBseV9iaW5kaW5ncwBzZ19hcHBseV9iaW5kaW5ncwBfc2dfdmFsaWRhdGVfYXBwbHlfYmluZGluZ3MAX3NnX2dsX2NhY2hlX2NsZWFyX3RleHR1cmVfc2FtcGxlcl9iaW5kaW5ncwBEUkFXX1dJVEhPVVRfQklORElOR1M6IGF0dGVtcHRpbmcgdG8gZHJhdyB3aXRob3V0IHJlc291cmNlIGJpbmRpbmdzAExJTlVYX0dMWF9OT19HTFhGQkNPTkZJR1M6IGdsWEdldEZCQ29uZmlncygpIHJldHVybmVkIG5vIGNvbmZpZ3MATElOVVhfRUdMX05PX0NPTkZJR1M6IGVnbENob29zZUNvbmZpZygpIHJldHVybmVkIG5vIGNvbmZpZ3MAX3NhcHAuZHJvcC5udW1fZmlsZXMgPD0gX3NhcHAuZHJvcC5tYXhfZmlsZXMAVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX0dMU0xfQklORElOR19DT0xMSVNJT046IHN0b3JhZ2UgYnVmZmVyICdnbHNsX2JpbmRpbmdfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIHNoYWRlciBzdGFnZXMAdHJpYW5nbGUtdmVydGljZXMAY2FudmFzAF9zYXBwX2Ryb3BwZWRfZmlsZV9wYXRoX3B0cgBkZXNjLT5kYXRhLnB0cgBXSU4zMl9XR0xfREVTQ1JJQkVfUElYRUxGT1JNQVRfRkFJTEVEOiBmYWlsZWQgdG8gZ2V0IHBpeGVsIGZvcm1hdCBkZXNjcmlwdG9yAF9zZ19nbF9ibGVuZF9mYWN0b3IAZXJyb3IARW50ZXIAMCA9PSBfc2cuY29tbWl0X2xpc3RlbmVycy51cHBlcgBJREVOVElDQUxfQ09NTUlUX0xJU1RFTkVSOiBhdHRlbXB0aW5nIHRvIGFkZCBpZGVudGljYWwgY29tbWl0IGxpc3RlbmVyAF9zZ19nbF9jYWNoZV9pbnZhbGlkYXRlX3RleHR1cmVfc2FtcGxlcgBfc2dfZ2xfY2FjaGVfYmluZF90ZXh0dXJlX3NhbXBsZXIAX3NnX2dsX2Rpc2NhcmRfc2FtcGxlcgBWQUxJREFURV9TSEFERVJERVNDX0NPTVBBUklTT05fU0FNUExFUl9SRVFVSVJFRDogaW1hZ2Ugc2FtcGxlIHR5cGUgREVQVEggY2FuIG9ubHkgYmUgdXNlZCB3aXRoIENPTVBBUklTT04gc2FtcGxlcgBWQUxJREFURV9TSEFERVJERVNDX05PTkZJTFRFUklOR19TQU1QTEVSX1JFUVVJUkVEOiBpbWFnZSBzYW1wbGUgdHlwZSBVTkZJTFRFUkFCTEVfRkxPQVQsIFVJTlQsIFNJTlQgY2FuIG9ubHkgYmUgdXNlZCB3aXRoIE5PTkZJTFRFUklORyBzYW1wbGVyAHNhcHBfZ2xfZ2V0X2ZyYW1lYnVmZmVyAF9zZ19pbml0X2J1ZmZlcgBfc2FwcF9jbGVhcl9kcm9wX2J1ZmZlcgBfc2dfZ2xfY3JlYXRlX2J1ZmZlcgBzZ19tYWtlX2J1ZmZlcgBfc2dfZ2xfY2FjaGVfYmluZF9zdG9yYWdlX2J1ZmZlcgBfc2dfZ2xfZGlzY2FyZF9idWZmZXIAX3NnX2dsX2NhY2hlX2JpbmRfYnVmZmVyAF9zYXBwLmRyb3AuYnVmZmVyAF9zYXBwLmNsaXBib2FyZC5idWZmZXIAVkFMSURBVEVfQVBQRU5EQlVGX1VTQUdFOiBzZ19hcHBlbmRfYnVmZmVyOiBjYW5ub3QgYXBwZW5kIHRvIGltbXV0YWJsZSBidWZmZXIAVkFMSURBVEVfVVBEQVRFQlVGX1VTQUdFOiBzZ191cGRhdGVfYnVmZmVyOiBjYW5ub3QgdXBkYXRlIGltbXV0YWJsZSBidWZmZXIAVkFMSURBVEVfQUJORF9TVE9SQUdFQlVGRkVSX0JJTkRJTkdfQlVGRkVSVFlQRTogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBib3VuZCBzdG9yYWdlIGJ1ZmZlciBzbG90IGlzIG5vdCBvZiB0eXBlIHN0b3JhZ2UgYnVmZmVyAENMSVBCT0FSRF9TVFJJTkdfVE9PX0JJRzogY2xpcGJvYXJkIHN0cmluZyBkaWRuJ3QgZml0IGludG8gY2xpcGJvYXJkIGJ1ZmZlcgBfc2dfaW5pdF9zaGFkZXIAX3NnX2xvb2t1cF9zaGFkZXIAX3NnX2dsX2NyZWF0ZV9zaGFkZXIAX3NnX2dsX2NvbXBpbGVfc2hhZGVyAHRyaWFuZ2xlX3NoYWRlcgBzZ19tYWtlX3NoYWRlcgBfc2dfZ2xfZGlzY2FyZF9zaGFkZXIAYm5kLT5waXAgJiYgYm5kLT5waXAtPnNoYWRlcgBWQUxJREFURV9QSVBFTElORURFU0NfQVRUUl9TRU1BTlRJQ1M6IEQzRDExIG1pc3NpbmcgdmVydGV4IGF0dHJpYnV0ZSBzZW1hbnRpY3MgaW4gc2hhZGVyAF90ZXh0dXJlX2Zsb2F0X2xpbmVhcgBfc2FwcF9jbGVhcgBfc2dfY2xlYXIAc2dfc2V0dXAAc2FwcABzb2tvbF9hcHAAX3NhcHBfZW1zY19kcm9wAF9zZ19nbF9zdGVuY2lsX29wAF9zZ19nbF9ibGVuZF9vcABzbXAAcGlwAEFycm93VXAAUGFnZVVwAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfU0laRV9JU19aRVJPOiBib3VuZCB1bmlmb3JtIGJsb2NrIHNpemUgY2Fubm90IGJlIHplcm8AaW5mbwBWQUxJREFURV9BQk5EX1ZCX09WRVJGTE9XOiBzZ19hcHBseV9iaW5kaW5nczogYnVmZmVyIGluIHZlcnRleCBidWZmZXIgc2xvdCBpcyBvdmVyZmxvd24AVkFMSURBVEVfQUJORF9JQl9PVkVSRkxPVzogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiBpbmRleCBidWZmZXIgc2xvdCBpcyBvdmVyZmxvd24AQXJyb3dEb3duAFBhZ2VEb3duAFdJTjMyX1dHTF9DUkVBVEVfQ09OVEVYVF9BVFRSSUJTX0ZBSUxFRF9PVEhFUjogQ3JlYXRlQ29udGV4dEF0dHJpYnNBUkIgZmFpbGVkIGZvciBvdGhlciByZWFzb24AU2VtaWNvbG9uAHBvc2l0aW9uAExJTlVYX1gxMV9GQUlMRURfVE9fQkVDT01FX09XTkVSX09GX0NMSVBCT0FSRDogWDExOiBGYWlsZWQgdG8gYmVjb21lIG93bmVyIG9mIGNsaXBib2FyZCBzZWxlY3Rpb24AYWN0aW9uAExJTlVYX0dMWF9RVUVSWV9WRVJTSU9OX0ZBSUxFRDogZmFpbGVkIHRvIHF1ZXJ5IEdMWCB2ZXJzaW9uAF9zYXBwX3NldHVwX2RlZmF1bHRfaWNvbgBzYXBwX3NldF9pY29uAF9zYXBwX2Vtc2Nfc2V0X2ljb24AbWFpbgBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfREVQVEhfU1RFTkNJTF9URVhUVVJFX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSBkZXB0aC1zdGVuY2lsIHRleHR1cmUgZm9yIHN3YXBjaGFpbgBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfTVNBQV9URVhUVVJFX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSBtc2FhIHRleHR1cmUgZm9yIHN3YXBjaGFpbgBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfU1VSRkFDRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgc3VyZmFjZSBmb3Igc3dhcGNoYWluAFByaW50U2NyZWVuAG5hbgAwID09IF9zZy5jb21taXRfbGlzdGVuZXJzLm51bQBfc2dfaW5pdF9wb29sAF9zZ19kaXNjYXJkX3Bvb2wAQ09NTUlUX0xJU1RFTkVSX0FSUkFZX0ZVTEw6IGNvbW1pdCBsaXN0ZW5lciBhcnJheSBmdWxsAFdJTjMyX0xPQURfT1BFTkdMMzJfRExMX0ZBSUxFRDogZmFpbGVkIGxvYWRpbmcgb3BlbmdsMzIuZGxsAEVxdWFsAE51bXBhZERlY2ltYWwAQ2Fwc0xvY2sATnVtTG9jawBTY3JvbGxMb2NrAE9LOiBPawBCYWNrc2xhc2gAU2xhc2gAL1VzZXJzL2tvbnN1bWVyL0Rlc2t0b3AvZGV2L3Nva29sLWNhbnZhcy1leGFtcGxlLTExNTQvc29rb2wvc29rb2xfZ2Z4LmgAL1VzZXJzL2tvbnN1bWVyL0Rlc2t0b3AvZGV2L3Nva29sLWNhbnZhcy1leGFtcGxlLTExNTQvc29rb2wvc29rb2xfYXBwLmgAQU5EUk9JRF9XUklURV9NU0dfRkFJTEVEOiBmYWlsZWQgdG8gd3JpdGUgbWVzc2FnZSBpbiBfc2FwcF9hbmRyb2lkX21zZwAhc2hkLT5nbC5wcm9nAExJTlVYX0dMWF9SRVFVSVJFRF9FWFRFTlNJT05TX01JU1NJTkc6IEdMWCBleHRlbnNpb25zIEFSQl9jcmVhdGVfY29udGV4dCBhbmQgQVJCX2NyZWF0ZV9jb250ZXh0X3Byb2ZpbGUgbWlzc2luZwBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1NBTVBMRVJfUEFJUl9HTFNMX05BTUU6IGltYWdlLXNhbXBsZXItcGFpciAnZ2xzbF9uYW1lJyBtaXNzaW5nAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfVU5JRk9STV9HTFNMX05BTUU6IHVuaWZvcm0gYmxvY2sgbWVtYmVyICdnbHNsX25hbWUnIG1pc3NpbmcAd2FybmluZwBfc2dfZ2xfY2FjaGVfcmVzdG9yZV9idWZmZXJfYmluZGluZwBfc2dfZ2xfY2FjaGVfc3RvcmVfYnVmZmVyX2JpbmRpbmcAaW1nAExJTlVYX0dMWF9OT19TVUlUQUJMRV9HTFhGQkNPTkZJRzogZmFpbGVkIHRvIGZpbmQgYSBzdWl0YWJsZSBHTFhGQkNvbmZpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9MQVlFUjogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgaXMgYXJyYXkgdGV4dHVyZSwgYnV0IGxheWVyIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0xBWUVSOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgaXMgYXJyYXkgdGV4dHVyZSwgYnV0IGxheWVyIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0xBWUVSOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgaXMgYXJyYXkgdGV4dHVyZSwgYnV0IGxheWVyIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfRkFDRTogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgaXMgY3ViZW1hcCwgYnV0IGZhY2UgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfRkFDRTogcGFzcyBhdHRhY2htZW50IGltYWdlIGlzIGN1YmVtYXAsIGJ1dCBmYWNlIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0ZBQ0U6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBpcyBjdWJlbWFwLCBidXQgZmFjZSBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX1NMSUNFOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpcyAzZCB0ZXh0dXJlLCBidXQgc2xpY2UgdmFsdWUgaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfU0xJQ0U6IHBhc3MgYXR0YWNobWVudCBpbWFnZSBpcyAzZCB0ZXh0dXJlLCBidXQgc2xpY2UgdmFsdWUgaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfU0xJQ0U6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBpcyAzZCB0ZXh0dXJlLCBidXQgc2xpY2UgdmFsdWUgaXMgdG9vIGJpZwBnbF9idWYAaW5mAF9zZ192ZXJ0ZXhmb3JtYXRfYnl0ZXNpemUAX3NnX2dsX3ZlcnRleGZvcm1hdF9zaXplAF9zZ191bmlmb3JtX3NpemUAb2Zmc2V0IDwgX3NhcHAuZHJvcC5idWZfc2l6ZQBWQUxJREFURV9VUERBVEVCVUZfU0laRTogc2dfdXBkYXRlX2J1ZmZlcjogdXBkYXRlIHNpemUgaXMgYmlnZ2VyIHRoYW4gYnVmZmVyIHNpemUAVkFMSURBVEVfQVBQRU5EQlVGX1NJWkU6IHNnX2FwcGVuZF9idWZmZXI6IG92ZXJhbGwgYXBwZW5kZWQgc2l6ZSBpcyBiaWdnZXIgdGhhbiBidWZmZXIgc2l6ZQBWQUxJREFURV9CVUZGRVJERVNDX0RBVEFfU0laRTogaW1tdXRhYmxlIGJ1ZmZlciBkYXRhIHNpemUgZGlmZmVycyBmcm9tIGJ1ZmZlciBzaXplAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfU0laRV9NSVNNQVRDSDogc2l6ZSBvZiB1bmlmb3JtIGJsb2NrIG1lbWJlcnMgZG9lc24ndCBtYXRjaCB1bmlmb3JtIGJsb2NrIHNpemUAVkFMSURBVEVfQVVCX1NJWkU6IHNnX2FwcGx5X3VuaWZvcm1zOiBkYXRhIHNpemUgZG9lc24ndCBtYXRjaCBkZWNsYXJlZCB1bmlmb3JtIGJsb2NrIHNpemUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFX1NJWkVTOiBhbGwgcGFzcyBhdHRhY2htZW50cyBtdXN0IGhhdmUgdGhlIHNhbWUgc2l6ZQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9JTUFHRV9TSVpFUzogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgc2l6ZSBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgaW1hZ2Ugc2l6ZQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU1BR0VfU0laRVM6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBzaXplIG11c3QgbWF0Y2ggY29sb3IgYXR0YWNobWVudCBpbWFnZSBzaXplAFZBTElEQVRFX0lNQUdFREFUQV9EQVRBX1NJWkU6IHNnX2ltYWdlX2RhdGE6IGRhdGEgc2l6ZSBkb2Vzbid0IG1hdGNoIGV4cGVjdGVkIHN1cmZhY2Ugc2l6ZQBWQUxJREFURV9CRUdJTlBBU1NfQVRUQUNITUVOVFNfRVhJU1RTOiBzZ19iZWdpbl9wYXNzOiBhdHRhY2htZW50cyBvYmplY3Qgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FQSVBfU0hBREVSX0VYSVNUUzogc2dfYXBwbHlfcGlwZWxpbmU6IHNoYWRlciBvYmplY3Qgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfUElQRUxJTkVfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogY3VycmVudGx5IGFwcGxpZWQgcGlwZWxpbmUgb2JqZWN0IG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BUElQX1BJUEVMSU5FX0VYSVNUUzogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIG9iamVjdCBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQVBJUF9DVVJQQVNTX0FUVEFDSE1FTlRTX0VYSVNUUzogc2dfYXBwbHlfcGlwZWxpbmU6IGN1cnJlbnQgcGFzcyBhdHRhY2htZW50cyBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9TTVBfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogYm91bmQgc2FtcGxlciBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9WQl9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiB2ZXJ0ZXggYnVmZmVyIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX0lCX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGluZGV4IGJ1ZmZlciBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9TVE9SQUdFQlVGRkVSX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGJvdW5kIHN0b3JhZ2UgYnVmZmVyIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX0lNR19FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBib3VuZCBpbWFnZSBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0VfTk9fUlQ6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGltYWdlIG11c3QgaGF2ZSByZW5kZXJfdGFyZ2V0PXRydWUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFX05PX1JUOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgbXVzdCBiZSBoYXZlIHJlbmRlcl90YXJnZXQ9dHJ1ZQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU1BR0VfTk9fUlQ6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBtdXN0IGJlIGhhdmUgcmVuZGVyX3RhcmdldD10cnVlAF9zYXBwX3JpbmdfZW5xdWV1ZQBfc2FwcF9yaW5nX2RlcXVldWUAcG9vbC0+ZnJlZV9xdWV1ZQBXSU4zMl9HRVRfUElYRUxGT1JNQVRfQVRUUklCX0ZBSUxFRDogZmFpbGVkIHRvIGdldCBXR0wgcGl4ZWwgZm9ybWF0IGF0dHJpYnV0ZQBCYWNrcXVvdGUAUXVvdGUARGVsZXRlAF9zYXBwX2luaXRfc3RhdGUAX3NhcHBfZGlzY2FyZF9zdGF0ZQBWQUxJREFURV9BUElQX1NIQURFUl9WQUxJRDogc2dfYXBwbHlfcGlwZWxpbmU6IHNoYWRlciBvYmplY3Qgbm90IGluIHZhbGlkIHN0YXRlAFZBTElEQVRFX0FCTkRfUElQRUxJTkVfVkFMSUQ6IHNnX2FwcGx5X2JpbmRpbmdzOiBjdXJyZW50bHkgYXBwbGllZCBwaXBlbGluZSBvYmplY3Qgbm90IGluIHZhbGlkIHN0YXRlAFZBTElEQVRFX0FQSVBfUElQRUxJTkVfVkFMSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBvYmplY3Qgbm90IGluIHZhbGlkIHN0YXRlAFZBTElEQVRFX0FQSVBfQ1VSUEFTU19BVFRBQ0hNRU5UU19WQUxJRDogc2dfYXBwbHlfcGlwZWxpbmU6IGN1cnJlbnQgcGFzcyBhdHRhY2htZW50cyBub3QgaW4gdmFsaWQgc3RhdGUAREVBTExPQ19TQU1QTEVSX0lOVkFMSURfU1RBVEU6IHNnX2RlYWxsb2Nfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gYWxsb2Mgc3RhdGUAREVBTExPQ19JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gYWxsb2Mgc3RhdGUAVU5JTklUX0FUVEFDSE1FTlRTX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9hdHRhY2htZW50cygpOiBhdHRhY2htZW50cyBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfU0FNUExFUl9JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAFVOSU5JVF9CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X2J1ZmZlcigpOiBidWZmZXIgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX1NIQURFUl9JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfc2hhZGVyKCk6IHNoYWRlciBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfUElQRUxJTkVfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAFVOSU5JVF9JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfaW1hZ2UoKTogaW1hZ2UgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUARkFJTF9BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ19mYWlsX2F0dGFjaG1lbnRzKCk6IGF0dGFjaG1lbnRzIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX2F0dGFjaG1lbnRzKCk6IGF0dGFjaG1lbnRzIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ19pbml0X2F0dGFjaG1lbnRzKCk6IHBhc3MgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX1NBTVBMRVJfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9zYW1wbGVyKCk6IHNhbXBsZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX1NBTVBMRVJfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9zYW1wbGVyKCk6IHNhbXBsZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX0JVRkZFUl9JTlZBTElEX1NUQVRFOiBzZ19pbml0X2J1ZmZlcigpOiBidWZmZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX0JVRkZFUl9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX2J1ZmZlcigpOiBidWZmZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBERUFMTE9DX0JVRkZFUl9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX2J1ZmZlcigpOiBidWZmZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX1NIQURFUl9JTlZBTElEX1NUQVRFOiBzZ19pbml0X3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX1NIQURFUl9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBERUFMTE9DX1NIQURFUl9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfcGlwZWxpbmUoKTogcGlwZWxpbmUgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfcGlwZWxpbmUoKTogcGlwZWxpbmUgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBERUFMTE9DX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX2RlYWxsb2NfcGlwZWxpbmUoKTogcGlwZWxpbmUgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX0lNQUdFX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfaW1hZ2UoKTogaW1hZ2UgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX0lNQUdFX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfaW1hZ2UoKTogaW1hZ2UgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlNBVkVJTlNUQU5DRVNUQVRFOiBOYXRpdmVBY3Rpdml0eSBvblNhdmVJbnN0YW5jZVN0YXRlAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OQ1JFQVRFOiBOYXRpdmVBY3Rpdml0eSBvbkNyZWF0ZQBfc2FwcF9pbWFnZV92YWxpZGF0ZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlBBVVNFOiBOYXRpdmVBY3Rpdml0eSBvblBhdXNlAHNhcHBfbWV0YWxfZ2V0X21zYWFfY29sb3JfdGV4dHVyZQBzYXBwX21ldGFsX2dldF9kZXB0aF9zdGVuY2lsX3RleHR1cmUAX3NnX2dsX2NhY2hlX2FjdGl2ZV90ZXh0dXJlAFdHUFVfU1dBUENIQUlOX0NSRUFURV9ERVBUSF9TVEVOQ0lMX1ZJRVdfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIHZpZXcgb2JqZWN0IGZvciBzd2FwY2hhaW4gZGVwdGgtc3RlbmNpbCB0ZXh0dXJlAFdHUFVfU1dBUENIQUlOX0NSRUFURV9NU0FBX1ZJRVdfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIHZpZXcgb2JqZWN0IGZvciBzd2FwY2hhaW4gbXNhYSB0ZXh0dXJlAF9zZ19nbF9pbmRleF90eXBlAF9zZ19nbF92ZXJ0ZXhmb3JtYXRfdHlwZQBfc2dfZ2xfcHJpbWl0aXZlX3R5cGUAQU5EUk9JRF9DUkVBVEVfVEhSRUFEX1BJUEVfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHRocmVhZCBwaXBlAEVzY2FwZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9ET05FOiBOYXRpdmVBY3Rpdml0eSBkb25lAEFORFJPSURfTE9PUF9USFJFQURfRE9ORTogbG9vcCB0aHJlYWQgZG9uZQBfc2dfZ2xfYXBwbHlfcGlwZWxpbmUAVkFMSURBVEVfQUJORF9QSVBFTElORTogc2dfYXBwbHlfYmluZGluZ3M6IG11c3QgYmUgY2FsbGVkIGFmdGVyIHNnX2FwcGx5X3BpcGVsaW5lAF9zZ192YWxpZGF0ZV9hcHBseV9waXBlbGluZQBfc2dfaW5pdF9waXBlbGluZQBfc2cuZ2wuY2FjaGUuY3VyX3BpcGVsaW5lAF9zZ19sb29rdXBfcGlwZWxpbmUAX3NnX2dsX2NyZWF0ZV9waXBlbGluZQBzZ19tYWtlX3BpcGVsaW5lAF9zZ19nbF9kaXNjYXJkX3BpcGVsaW5lAHRyaWFuZ2xlLXBpcGVsaW5lAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OUkVTVU1FOiBOYXRpdmVBY3Rpdml0eSBvblJlc3VtZQBIb21lAFZBTElEQVRFX0FQUEVOREJVRl9VUERBVEU6IHNnX2FwcGVuZF9idWZmZXI6IGNhbm5vdCBjYWxsIHNnX2FwcGVuZF9idWZmZXIgYW5kIHNnX3VwZGF0ZV9idWZmZXIgaW4gc2FtZSBmcmFtZQBWQUxJREFURV9VUERBVEVCVUZfQVBQRU5EOiBzZ191cGRhdGVfYnVmZmVyOiBjYW5ub3QgY2FsbCBzZ191cGRhdGVfYnVmZmVyIGFuZCBzZ19hcHBlbmRfYnVmZmVyIGluIHNhbWUgZnJhbWUAVkFMSURBVEVfVVBEQVRFQlVGX09OQ0U6IHNnX3VwZGF0ZV9idWZmZXI6IG9ubHkgb25lIHVwZGF0ZSBhbGxvd2VkIHBlciBidWZmZXIgYW5kIGZyYW1lAFZBTElEQVRFX1VQRElNR19PTkNFOiBzZ191cGRhdGVfaW1hZ2U6IG9ubHkgb25lIHVwZGF0ZSBhbGxvd2VkIHBlciBpbWFnZSBhbmQgZnJhbWUAdV9kZXNjLT5nbHNsX25hbWUAaW1nX3NtcF9kZXNjLT5nbHNsX25hbWUAc2FwcF9tZXRhbF9nZXRfY3VycmVudF9kcmF3YWJsZQBWQUxJREFURV9JTUFHRURFU0NfQ09NUFJFU1NFRF9JTU1VVEFCTEU6IGNvbXByZXNzZWQgaW1hZ2VzIG11c3QgYmUgaW1tdXRhYmxlAF9zZ19nbF9yZXNldF9zdGF0ZV9jYWNoZQBfc2dfZ2xfc2hhZGVyX3N0YWdlAGRlc2MtPnNhbXBsZXJzW3NyYy0+c2FtcGxlcl9zbG90XS5zdGFnZSA9PSBzcmMtPnN0YWdlAGRlc2MtPmltYWdlc1tzcmMtPmltYWdlX3Nsb3RdLnN0YWdlID09IHNyYy0+c3RhZ2UAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9TQU1QTEVSX1BBSVJfU0FNUExFUl9TVEFHRV9NSVNNQVRDSDogaW1hZ2Utc2FtcGxlci1wYWlyIHN0YWdlIGRvZXNuJ3QgbWF0Y2ggcmVmZXJlbmNlZCBzYW1wbGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfTUVUQUxfQlVGRkVSX1NMT1RfQ09MTElTSU9OOiB1bmlmb3JtIGJsb2NrICdtc2xfYnVmZmVyX24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyB1bmlmb3JtIGJsb2NrcyBhbmQgc3RvcmFnZSBidWZmZXJzIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfSExTTF9SRUdJU1RFUl9UX0NPTExJU0lPTjogaW1hZ2UgJ2hsc2xfcmVnaXN0ZXJfdF9uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgaW1hZ2VzIGFuZCBzdG9yYWdlIGJ1ZmZlcnMgaW4gc2FtZSBzaGFkZXIgc3RhZ2UAVkFMSURBVEVfU0hBREVSREVTQ19VQl9ITFNMX1JFR0lTVEVSX0JfQ09MTElTSU9OOiB1bmlmb3JtIGJsb2NrICdobHNsX3JlZ2lzdGVyX2JfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIHVuaWZvcm0gYmxvY2tzIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9ITFNMX1JFR0lTVEVSX1RfQ09MTElTSU9OOiBzdG9yYWdlX2J1ZmZlciAnaGxzbF9yZWdpc3Rlcl90X24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyBzdG9yYWdlIGJ1ZmZlcnMgYW5kIGltYWdlcyBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfTUVUQUxfQlVGRkVSX1NMT1RfQ09MTElTSU9OOiBzdG9yYWdlIGJ1ZmZlciAnbXNsX2J1ZmZlcl9uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgdW5pZm9ybSBibG9ja3MgYW5kIHN0b3JhZ2UgYnVmZmVyIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9ITFNMX1JFR0lTVEVSX1NfQ09MTElTSU9OOiBzYW1wbGVyICdobHNsX3JlZ2lzdGVyX3NfbicgbXVzdCBiZSB1bmlxdWUgaW4gc2FtZSBzaGFkZXIgc3RhZ2UAVkFMSURBVEVfU0hBREVSREVTQ19TQU1QTEVSX01FVEFMX1NBTVBMRVJfU0xPVF9DT0xMSVNJT046IHNhbXBsZXIgJ21zbF9zYW1wbGVyX24nIG11c3QgYmUgdW5pcXVlIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfTUVUQUxfVEVYVFVSRV9TTE9UX0NPTExJU0lPTjogaW1hZ2UgJ21zbF90ZXh0dXJlX24nIG11c3QgYmUgdW5pcXVlIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX0lNQUdFX1NUQUdFX01JU01BVENIOiBpbWFnZS1zYW1wbGVyLXBhaXIgc3RhZ2UgZG9lc24ndCBtYXRjaCByZWZlcmVuY2VkIGltYWdlIHN0YWdlAF9zZ19nbF91c2FnZQBfc2dfZ2xfYXR0YWNobWVudHNfZHNfaW1hZ2UAX3NnX2dsX2F0dGFjaG1lbnRzX2NvbG9yX2ltYWdlAF9zZ19nbF9hdHRhY2htZW50c19yZXNvbHZlX2ltYWdlAF9zZ19nbF9kaXNjYXJkX2ltYWdlAFZBTElEQVRFX0lNQUdFREVTQ19OT05SVF9QSVhFTEZPUk1BVDogaW52YWxpZCBwaXhlbCBmb3JtYXQgZm9yIG5vbi1yZW5kZXItdGFyZ2V0IGltYWdlAFZBTElEQVRFX0lNQUdFREVTQ19SVF9QSVhFTEZPUk1BVDogaW52YWxpZCBwaXhlbCBmb3JtYXQgZm9yIHJlbmRlci10YXJnZXQgaW1hZ2UAVkFMSURBVEVfVVBESU1HX1VTQUdFOiBzZ191cGRhdGVfaW1hZ2U6IGNhbm5vdCB1cGRhdGUgaW1tdXRhYmxlIGltYWdlAE51bXBhZERpdmlkZQBXR1BVX0NSRUFURV9JTlNUQU5DRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgaW5zdGFuY2UAc2FwcF93Z3B1X2dldF9kZXZpY2UAc2FwcF9tZXRhbF9nZXRfZGV2aWNlAHNhcHBfZDNkMTFfZ2V0X2RldmljZQBCYWNrc3BhY2UAU3BhY2UAV0lOMzJfRDNEMTFfUVVFUllfSU5URVJGQUNFX0lEWEdJREVWSUNFMV9GQUlMRUQ6IGNvdWxkIG5vdCBvYnRhaW4gSURYR0lEZXZpY2UxIGludGVyZmFjZQBQZXJpb2QATElOVVhfR0xYX0VYVEVOU0lPTl9OT1RfRk9VTkQ6IEdMWCBleHRlbnNpb24gbm90IGZvdW5kAF9mbG9hdF9ibGVuZABzZ19xdWVyeV9iYWNrZW5kAF9zZ19nbF9zZXR1cF9iYWNrZW5kAF9zZ19nbF9kaXNjYXJkX2JhY2tlbmQAZHN0ID09IGRzdF9lbmQAZHN0IDwgZHN0X2VuZABibmQARW5kAFZBTElEQVRFX0FCTkRfRVhQRUNURURfU0FNUExFUl9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogc2FtcGxlciBiaW5kaW5nIGlzIG1pc3Npbmcgb3IgdGhlIHNhbXBsZXIgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9WQjogc2dfYXBwbHlfYmluZGluZ3M6IHZlcnRleCBidWZmZXIgYmluZGluZyBpcyBtaXNzaW5nIG9yIGJ1ZmZlciBoYW5kbGUgaXMgaW52YWxpZABWQUxJREFURV9BQk5EX0VYUEVDVEVEX1NUT1JBR0VCVUZGRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHN0b3JhZ2UgYnVmZmVyIGJpbmRpbmcgaXMgbWlzc2luZyBvciB0aGUgYnVmZmVyIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX0FCTkRfRVhQRUNURURfSU1BR0VfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IGltYWdlIGJpbmRpbmcgaXMgbWlzc2luZyBvciB0aGUgaW1hZ2UgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfUElQRUxJTkVERVNDX1NIQURFUjogc2dfcGlwZWxpbmVfZGVzYy5zaGFkZXIgbWlzc2luZyBvciBpbnZhbGlkACFfc2cuY3VyX3Bhc3MudmFsaWQAX3NhcHAudmFsaWQAX3NnLmdsLnZhbGlkAF9zZy52YWxpZABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfSU1BR0U6IHBhc3MgYXR0YWNobWVudCBpbWFnZSBpcyBub3QgdmFsaWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgaXMgbm90IHZhbGlkAFZBTElEQVRFX0JFR0lOUEFTU19DT0xPUl9BVFRBQ0hNRU5UX0lNQUdFOiBzZ19iZWdpbl9wYXNzOiBvbmUgb3IgbW9yZSBjb2xvciBhdHRhY2htZW50IGltYWdlcyBhcmUgbm90IHZhbGlkAFZBTElEQVRFX0JFR0lOUEFTU19ERVBUSFNURU5DSUxfQVRUQUNITUVOVF9JTUFHRTogc2dfYmVnaW5fcGFzczogb25lIG9yIG1vcmUgZGVwdGgtc3RlbmNpbCBhdHRhY2htZW50IGltYWdlcyBhcmUgbm90IHZhbGlkAFZBTElEQVRFX0JFR0lOUEFTU19SRVNPTFZFX0FUVEFDSE1FTlRfSU1BR0U6IHNnX2JlZ2luX3Bhc3M6IG9uZSBvciBtb3JlIHJlc29sdmUgYXR0YWNobWVudCBpbWFnZXMgYXJlIG5vdCB2YWxpZABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9JTUFHRTogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgaW1hZ2Ugbm90IHZhbGlkAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0NPTE9SRk9STUFUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5jb2xvcl9mb3JtYXQgdG8gYmUgdmFsaWQAZGVzYy0+c2hhZGVyLmlkID09IHNoZC0+c2xvdC5pZABhdHRzLT5zbG90LmlkID09IF9zZy5jdXJfcGFzcy5hdHRzX2lkLmlkAGJuZC0+cGlwLT5zaGFkZXItPnNsb3QuaWQgPT0gYm5kLT5waXAtPmNtbi5zaGFkZXJfaWQuaWQAc2hkAFZBTElEQVRFX0JFR0lOUEFTU19DQU5BUlk6IHNnX2JlZ2luX3Bhc3M6IHBhc3Mgc3RydWN0IG5vdCBpbml0aWFsaXplZABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfQ0FOQVJZOiBzZ19hdHRhY2htZW50c19kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9TQU1QTEVSREVTQ19DQU5BUlk6IHNnX3NhbXBsZXJfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfQlVGRkVSREVTQ19DQU5BUlk6IHNnX2J1ZmZlcl9kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9TSEFERVJERVNDX0NBTkFSWTogc2dfc2hhZGVyX2Rlc2Mgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX1BJUEVMSU5FREVTQ19DQU5BUlk6IHNnX3BpcGVsaW5lX2Rlc2Mgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX0lNQUdFREVTQ19DQU5BUlk6IHNnX2ltYWdlX2Rlc2Mgbm90IGluaXRpYWxpemVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OTkFUSVZFV0lORE9XREVTVFJPWUVEOiBOYXRpdmVBY3Rpdml0eSBvbk5hdGl2ZVdpbmRvd0Rlc3Ryb3llZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTklOUFVUUVVFVUVERVNUUk9ZRUQ6IE5hdGl2ZUFjdGl2aXR5IG9uSW5wdXRRdWV1ZURlc3Ryb3llZABBTkRST0lEX1VOS05PV05fTVNHOiB1bmtub3duIG1zZyB0eXBlIHJlY2VpdmVkAFBBU1NfUE9PTF9FWEhBVVNURUQ6IHBhc3MgcG9vbCBleGhhdXN0ZWQAU0FNUExFUl9QT09MX0VYSEFVU1RFRDogc2FtcGxlciBwb29sIGV4aGF1c3RlZABCVUZGRVJfUE9PTF9FWEhBVVNURUQ6IGJ1ZmZlciBwb29sIGV4aGF1c3RlZABTSEFERVJfUE9PTF9FWEhBVVNURUQ6IHNoYWRlciBwb29sIGV4aGF1c3RlZABQSVBFTElORV9QT09MX0VYSEFVU1RFRDogcGlwZWxpbmUgcG9vbCBleGhhdXN0ZWQASU1BR0VfUE9PTF9FWEhBVVNURUQ6IGltYWdlIHBvb2wgZXhoYXVzdGVkAEFORFJPSURfTE9PUF9USFJFQURfU1RBUlRFRDogbG9vcCB0aHJlYWQgc3RhcnRlZABWQUxJREFURV9BQk5EX0VYUEVDVEVEX0RFUFRIX0lNQUdFOiBzZ19hcHBseV9iaW5kaW5nczogZGVwdGggaW1hZ2UgZXhwZWN0ZWQAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9GSUxURVJBQkxFX0lNQUdFOiBzZ19hcHBseV9iaW5kaW5nczogZmlsdGVyYWJsZSBpbWFnZSBleHBlY3RlZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9DUkVBVEVfU1VDQ0VTUzogTmF0aXZlQWN0aXZpdHkgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05OQVRJVkVXSU5ET1dDUkVBVEVEOiBOYXRpdmVBY3Rpdml0eSBvbk5hdGl2ZVdpbmRvd0NyZWF0ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05JTlBVVFFVRVVFQ1JFQVRFRDogTmF0aXZlQWN0aXZpdHkgb25JbnB1dFF1ZXVlQ3JlYXRlZABXSU4zMl9XR0xfQVJCX0NSRUFURV9DT05URVhUX1JFUVVJUkVEOiBBUkJfY3JlYXRlX2NvbnRleHQgcmVxdWlyZWQAV0lOMzJfV0dMX0FSQl9DUkVBVEVfQ09OVEVYVF9QUk9GSUxFX1JFUVVJUkVEOiBBUkJfY3JlYXRlX2NvbnRleHRfcHJvZmlsZSByZXF1aXJlZABWQUxJREFURV9TSEFERVJERVNDX1NPVVJDRV9PUl9CWVRFQ09ERTogc2hhZGVyIHNvdXJjZSBvciBieXRlIGNvZGUgcmVxdWlyZWQAVkFMSURBVEVfU0hBREVSREVTQ19CWVRFQ09ERTogc2hhZGVyIGJ5dGUgY29kZSByZXF1aXJlZABWQUxJREFURV9TSEFERVJERVNDX1NPVVJDRTogc2hhZGVyIHNvdXJjZSBjb2RlIHJlcXVpcmVkAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fQllURUNPREVfU0laRTogc2hhZGVyIGJ5dGUgY29kZSBsZW5ndGggKGluIGJ5dGVzKSByZXF1aXJlZABUUkFDRV9IT09LU19OT1RfRU5BQkxFRDogc2dfaW5zdGFsbF90cmFjZV9ob29rcygpIGNhbGxlZCwgYnV0IFNPS09MX1RSQUNFX0hPT0tTIGlzIG5vdCBkZWZpbmVkAFZBTElEQVRFX0lNQUdFREVTQ19NU0FBX0JVVF9OT19SVDogbm9uLXJlbmRlci10YXJnZXQgaW1hZ2VzIGNhbm5vdCBiZSBtdWx0aXNhbXBsZWQAVkFMSURBVElPTl9GQUlMRUQ6IHZhbGlkYXRpb24gbGF5ZXIgY2hlY2tzIGZhaWxlZABXR1BVX0NSRUFURUJJTkRHUk9VUF9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVCaW5kR3JvdXAgZmFpbGVkAE1BTExPQ19GQUlMRUQ6IG1lbW9yeSBhbGxvY2F0aW9uIGZhaWxlZABMSU5VWF9HTFhfR0VUX1ZJU1VBTF9GUk9NX0ZCQ09ORklHX0ZBSUxFRDogZ2xYR2V0VmlzdWFsRnJvbUZCQ29uZmlnIGZhaWxlZABXR1BVX1NIQURFUl9DUkVBVEVfQklOREdST1VQX0xBWU9VVF9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVCaW5kR3JvdXBMYXlvdXQoKSBmb3Igc2hhZGVyIHN0YWdlIGZhaWxlZABMSU5VWF9FR0xfTk9fTkFUSVZFX1ZJU1VBTDogZWdsR2V0Q29uZmlnQXR0cmliKCkgZm9yIEVHTF9OQVRJVkVfVklTVUFMX0lEIGZhaWxlZABMSU5VWF9FR0xfQklORF9PUEVOR0xfRVNfQVBJX0ZBSUxFRDogZWdsQmluZEFQSShFR0xfT1BFTkdMX0VTX0FQSSkgZmFpbGVkAExJTlVYX0VHTF9CSU5EX09QRU5HTF9BUElfRkFJTEVEOiBlZ2xCaW5kQVBJKEVHTF9PUEVOR0xfQVBJKSBmYWlsZWQATElOVVhfRUdMX0dFVF9ESVNQTEFZX0ZBSUxFRDogZWdsR2V0RGlzcGxheSgpIGZhaWxlZABMSU5VWF9YMTFfT1BFTl9ESVNQTEFZX0ZBSUxFRDogWE9wZW5EaXNwbGF5KCkgZmFpbGVkAExJTlVYX0dMWF9DUkVBVEVfV0lORE9XX0ZBSUxFRDogZ2xYQ3JlYXRlV2luZG93KCkgZmFpbGVkAExJTlVYX1gxMV9DUkVBVEVfV0lORE9XX0ZBSUxFRDogWENyZWF0ZVdpbmRvdygpIGZhaWxlZABXR1BVX0NSRUFURV9URVhUVVJFX1ZJRVdfRkFJTEVEOiB3Z3B1VGV4dHVyZUNyZWF0ZVZpZXcoKSBmYWlsZWQATElOVVhfRUdMX0NSRUFURV9DT05URVhUX0ZBSUxFRDogZWdsQ3JlYXRlQ29udGV4dCgpIGZhaWxlZABXR1BVX0NSRUFURV9QSVBFTElORV9MQVlPVVRfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlUGlwZWxpbmVMYXlvdXQoKSBmYWlsZWQATElOVVhfRUdMX01BS0VfQ1VSUkVOVF9GQUlMRUQ6IGVnbE1ha2VDdXJyZW50KCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1NBTVBMRVJfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlU2FtcGxlcigpIGZhaWxlZABXR1BVX0NSRUFURV9CVUZGRVJfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlQnVmZmVyKCkgZmFpbGVkAExJTlVYX0VHTF9HRVRfVklTVUFMX0lORk9fRkFJTEVEOiBYR2V0VmlzdWFsSW5mbygpIGZhaWxlZABMSU5VWF9FR0xfSU5JVElBTElaRV9GQUlMRUQ6IGVnbEluaXRpYWxpemUoKSBmYWlsZWQAV0dQVV9DUkVBVEVfVEVYVFVSRV9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVUZXh0dXJlKCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1JFTkRFUl9QSVBFTElORV9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVSZW5kZXJQaXBlbGluZSgpIGZhaWxlZABXR1BVX0NSRUFURV9TSEFERVJfTU9EVUxFX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVNoYWRlck1vZHVsZSgpIGZhaWxlZABMSU5VWF9FR0xfQ1JFQVRFX1dJTkRPV19TVVJGQUNFX0ZBSUxFRDogZWdsQ3JlYXRlV2luZG93U3VyZmFjZSgpIGZhaWxlZABXSU4zMl9HRVRfUkFXX0lOUFVUX0RBVEFfRkFJTEVEOiBHZXRSYXdJbnB1dERhdGEoKSBmYWlsZWQAX3NhcHBfZW1zY19zaXplX2NoYW5nZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05XSU5ET1dGT0NVU0NIQU5HRUQ6IE5hdGl2ZUFjdGl2aXR5IG9uV2luZG93Rm9jdXNDaGFuZ2VkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OQ09ORklHVVJBVElPTkNIQU5HRUQ6IE5hdGl2ZUFjdGl2aXR5IG9uQ29uZmlndXJhdGlvbkNoYW5nZWQAVkFMSURBVEVfQUJORF9JQjogc2dfYXBwbHlfYmluZGluZ3M6IHBpcGVsaW5lIG9iamVjdCBkZWZpbmVzIG5vbi1pbmRleGVkIHJlbmRlcmluZywgYnV0IGluZGV4IGJ1ZmZlciBwcm92aWRlZABWQUxJREFURV9BQk5EX05PX0lCOiBzZ19hcHBseV9iaW5kaW5nczogcGlwZWxpbmUgb2JqZWN0IGRlZmluZXMgaW5kZXhlZCByZW5kZXJpbmcsIGJ1dCBubyBpbmRleCBidWZmZXIgcHJvdmlkZWQAVkFMSURBVEVfQVBJUF9QSVBFTElORV9WQUxJRF9JRDogc2dfYXBwbHlfcGlwZWxpbmU6IGludmFsaWQgcGlwZWxpbmUgaWQgcHJvdmlkZWQATnVtcGFkQWRkAF9jb21wcmVzc2VkX3RleHR1cmVfYXN0YwBfdGV4dHVyZV9jb21wcmVzc2lvbl9wdnJ0YwBXRUJLSVRfV0VCR0xfY29tcHJlc3NlZF90ZXh0dXJlX3B2cnRjAF90ZXh0dXJlX2NvbXByZXNzaW9uX2JwdGMAX3RleHR1cmVfY29tcHJlc3Npb25fcmd0YwBfY29tcHJlc3NlZF90ZXh0dXJlX2V0YwBfdGV4dHVyZV9jb21wcmVzc2lvbl9zM3RjAF9jb21wcmVzc2VkX3RleHR1cmVfczN0YwBfc2dfdmFsaWRhdGVfYnVmZmVyX2Rlc2MAX3NnX3ZhbGlkYXRlX3NoYWRlcl9kZXNjAF9zYXBwX3ZhbGlkYXRlX2ljb25fZGVzYwBfc2dfdmFsaWRhdGVfcGlwZWxpbmVfZGVzYwBWQUxJREFURV9BQk5EX0lNQUdFX1RZUEVfTUlTTUFUQ0g6IHNnX2FwcGx5X2JpbmRpbmdzOiB0eXBlIG9mIGJvdW5kIGltYWdlIGRvZXNuJ3QgbWF0Y2ggc2hhZGVyIGRlc2MAYnVmICYmIGRlc2MAcGlwICYmIHNoZCAmJiBkZXNjAHNyYwBfc2FwcF9tYWxsb2MAX3NnX21hbGxvYwBfc2dfc2xvdF9hbGxvYwBfc2dfZ2xfY29tcGFyZV9mdW5jAF90ZXh0dXJlX2ZpbHRlcl9hbmlzb3Ryb3BpYwBwYW5pYwB2YgBhdHRzLT5nbC5mYgBUYWIAVkFMSURBVEVfQlVGRkVSREVTQ19OT19EQVRBOiBkeW5hbWljL3N0cmVhbSB1c2FnZSBidWZmZXJzIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEAVkFMSURBVEVfSU1BR0VERVNDX0lOSkVDVEVEX05PX0RBVEE6IGltYWdlcyB3aXRoIGluamVjdGVkIHRleHR1cmVzIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEAVkFMSURBVEVfSU1BR0VERVNDX1JUX05PX0RBVEE6IHJlbmRlciB0YXJnZXQgaW1hZ2VzIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEAVkFMSURBVEVfSU1BR0VERVNDX0RZTkFNSUNfTk9fREFUQTogZHluYW1pYy9zdHJlYW0gaW1hZ2VzIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEAQ29tbWEAZGVzYy0+Z2xfYnVmZmVyc1tzbG90XQBbAEtleVoAS2V5WQBBTkRST0lEX01TR19ERVNUUk9ZOiBNU0dfREVTVFJPWQBLZXlYAEtleVcAQU5EUk9JRF9NU0dfU0VUX05BVElWRV9XSU5ET1c6IE1TR19TRVRfTkFUSVZFX1dJTkRPVwBLZXlWAEtleVUAS2V5VABLZXlTAEFORFJPSURfTVNHX05PX0ZPQ1VTOiBNU0dfTk9fRk9DVVMAQU5EUk9JRF9NU0dfRk9DVVM6IE1TR19GT0NVUwBpbWdfc21wLT5zYW1wbGVyX3Nsb3QgPCBTR19NQVhfU0FNUExFUl9CSU5EU0xPVFMAYV9zdGF0ZS0+YnVmZmVyX2luZGV4IDwgU0dfTUFYX1ZFUlRFWEJVRkZFUl9CSU5EU0xPVFMAYXR0ci0+dmJfaW5kZXggPCBTR19NQVhfVkVSVEVYQlVGRkVSX0JJTkRTTE9UUwBpbWdfc21wLT5pbWFnZV9zbG90IDwgU0dfTUFYX0lNQUdFX0JJTkRTTE9UUwBfc2cubGltaXRzLm1heF92ZXJ0ZXhfYXR0cnMgPD0gU0dfTUFYX1ZFUlRFWF9BVFRSSUJVVEVTAG51bV9pbWFnZXMgPD0gU0FQUF9NQVhfSUNPTklNQUdFUwBLZXlSAFZBTElEQVRFX0FCTkRfVU5FWFBFQ1RFRF9TQU1QTEVSX0NPTVBBUkVfTkVWRVI6IHNnX2FwcGx5X2JpbmRpbmdzOiBzaGFkZXIgZXhwZWN0cyBTR19TQU1QTEVSVFlQRV9DT01QQVJJU09OIGJ1dCBzYW1wbGVyIGhhcyBTR19DT01QQVJFRlVOQ19ORVZFUgBWQUxJREFURV9BQk5EX0VYUEVDVEVEX1NBTVBMRVJfQ09NUEFSRV9ORVZFUjogc2dfYXBwbHlfYmluZGluZ3M6IHNoYWRlciBleHBlY3RzIFNHX1NBTVBMRVJUWVBFX0ZJTFRFUklORyBvciBTR19TQU1QTEVSVFlQRV9OT05GSUxURVJJTkcgYnV0IHNhbXBsZXIgZG9lc24ndCBoYXZlIFNHX0NPTVBBUkVGVU5DX05FVkVSAFZBTElEQVRFX0FCTkRfVkJfVFlQRTogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiB2ZXJ0ZXggYnVmZmVyIHNsb3QgaXMgbm90IGEgU0dfQlVGRkVSVFlQRV9WRVJURVhCVUZGRVIAVkFMSURBVEVfQUJORF9JQl9UWVBFOiBzZ19hcHBseV9iaW5kaW5nczogYnVmZmVyIGluIGluZGV4IGJ1ZmZlciBzbG90IGlzIG5vdCBhIFNHX0JVRkZFUlRZUEVfSU5ERVhCVUZGRVIAVkFMSURBVEVfU0FNUExFUkRFU0NfQU5JU1RST1BJQ19SRVFVSVJFU19MSU5FQVJfRklMVEVSSU5HOiBzZ19zYW1wbGVyX2Rlc2MubWF4X2FuaXNvdHJvcHkgPiAxIHJlcXVpcmVzIG1pbi9tYWcvbWlwbWFwX2ZpbHRlciB0byBiZSBTR19GSUxURVJfTElORUFSAEtleVEAS2V5UABLZXlPAEtleU4ATkFOAEtleU0AS2V5TABMSU5VWF9HTFhfTE9BRF9MSUJHTF9GQUlMRUQ6IGZhaWxlZCB0byBsb2FkIGxpYkdMAHNsb3QtPnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfSU5JVElBTABLZXlLAEtleUoAS2V5SQBLZXlIAEtleUcAS2V5RgBJTkYAS2V5RQBBTkRST0lEX01TR19TRVRfSU5QVVRfUVVFVUU6IE1TR19TRVRfSU5QVVRfUVVFVUUAQU5EUk9JRF9NU0dfQ1JFQVRFOiBNU0dfQ1JFQVRFAEFORFJPSURfTVNHX1BBVVNFOiBNU0dfUEFVU0UAcGFzc19kZWYuc3dhcGNoYWluLmNvbG9yX2Zvcm1hdCA+IFNHX1BJWEVMRk9STUFUX05PTkUAQU5EUk9JRF9NU0dfUkVTVU1FOiBNU0dfUkVTVU1FAFZBTElEQVRFX0lNQUdFREVTQ19SVF9JTU1VVEFCTEU6IHJlbmRlciB0YXJnZXQgaW1hZ2VzIG11c3QgYmUgU0dfVVNBR0VfSU1NVVRBQkxFAEtleUQAc2xvdC0+aWQgPT0gU0dfSU5WQUxJRF9JRABiaW5kaW5ncy0+c2FtcGxlcnNbaV0uaWQgIT0gU0dfSU5WQUxJRF9JRABiaW5kaW5ncy0+dmVydGV4X2J1ZmZlcnNbaV0uaWQgIT0gU0dfSU5WQUxJRF9JRABiaW5kaW5ncy0+c3RvcmFnZV9idWZmZXJzW2ldLmlkICE9IFNHX0lOVkFMSURfSUQAYmluZGluZ3MtPmltYWdlc1tpXS5pZCAhPSBTR19JTlZBTElEX0lEAFZBTElEQVRFX0JFR0lOUEFTU19BVFRBQ0hNRU5UU19WQUxJRDogc2dfYmVnaW5fcGFzczogYXR0YWNobWVudHMgb2JqZWN0IG5vdCBpbiByZXNvdXJjZSBzdGF0ZSBWQUxJRABLZXlDAFdJTjMyX0hFTFBFUl9XSU5ET1dfR0VURENfRkFJTEVEOiBmYWlsZWQgdG8gZ2V0IGhlbHBlciB3aW5kb3cgREMAS2V5QgBMSU5VWF9HTFhfQ1JFQVRFX0NPTlRFWFRfRkFJTEVEOiBGYWlsZWQgdG8gY3JlYXRlIEdMIGNvbnRleHQgdmlhIGdsWENyZWF0ZUNvbnRleHRBdHRyaWJzQVJCAFdJTjMyX1dHTF9JTkNPTVBBVElCTEVfREVWSUNFX0NPTlRFWFQ6IENyZWF0ZUNvbnRleHRBdHRyaWJzQVJCIGZhaWxlZCB3aXRoIEVSUk9SX0lOQ09NUEFUSUJMRV9ERVZJQ0VfQ09OVEVYVFNfQVJCAEtleUEAPGZgPAZmPABbbGluZToAW2lkOgBEaWdpdDkATnVtcGFkOQBGOQBEaWdpdDgATnVtcGFkOABGOABzbG90IDwgMTI4AERpZ2l0NwBOdW1wYWQ3AEY3AERpZ2l0NgBOdW1wYWQ2AEY2AERpZ2l0NQBOdW1wYWQ1AEY1AERpZ2l0NABOdW1wYWQ0AEY0AHNsb3QgPCA2NABWQUxJREFURV9QSVBFTElORURFU0NfTEFZT1VUX1NUUklERTQ6IHNnX3BpcGVsaW5lX2Rlc2MubGF5b3V0LmJ1ZmZlcnNbXS5zdHJpZGUgbXVzdCBiZSBtdWx0aXBsZSBvZiA0AFZBTElEQVRFX0JVRkZFUkRFU0NfU1RPUkFHRUJVRkZFUl9TSVpFX01VTFRJUExFXzQ6IHNpemUgb2Ygc3RvcmFnZSBidWZmZXJzIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0AERpZ2l0MwBOdW1wYWQzAEYzAERpZ2l0MgBOdW1wYWQyAEYyAF9zZ19hbGlnbl91MzIARjEyAERpZ2l0MQBOdW1wYWQxAEYxAFZBTElEQVRFX0FCTkRfSU1BR0VfTVNBQTogc2dfYXBwbHlfYmluZGluZ3M6IGNhbm5vdCBiaW5kIGltYWdlIHdpdGggc2FtcGxlX2NvdW50PjEARjExAGdsX2F0dHItPnZiX2luZGV4ID09IC0xAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX1NBTVBMRV9DT1VOVDogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgaW1hZ2Ugc2FtcGxlIGNvdW50IG11c3QgYmUgMQBWQUxJREFURV9JTUFHRURFU0NfTVNBQV8zRF9JTUFHRTogM0QgaW1hZ2VzIGNhbm5vdCBoYXZlIGEgc2FtcGxlX2NvdW50ID4gMQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9DT0xPUl9JTUFHRV9NU0FBOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudHMgbXVzdCBoYXZlIGEgY29sb3IgYXR0YWNobWVudCBpbWFnZSB3aXRoIHNhbXBsZSBjb3VudCA+IDEAVkFMSURBVEVfU0hBREVSREVTQ19VQl9BUlJBWV9DT1VOVDogdW5pZm9ybSBhcnJheSBjb3VudCBtdXN0IGJlID49IDEAVkFMSURBVEVfSU1BR0VERVNDX01TQUFfTlVNX01JUE1BUFM6IE1TQUEgaW1hZ2VzIG11c3QgaGF2ZSBudW1fbWlwbWFwcyA9PSAxAERpZ2l0MABjb2xvcjAATnVtcGFkMABGMTAATElOVVhfWDExX1FVRVJZX1NZU1RFTV9EUElfRkFJTEVEOiBmYWlsZWQgdG8gcXVlcnkgc3lzdGVtIGRwaSB2YWx1ZSwgYXNzdW1pbmcgZGVmYXVsdCA5Ni4wAFZBTElEQVRFX0JVRkZFUkRFU0NfU0laRTogc2dfYnVmZmVyX2Rlc2Muc2l6ZSBhbmQgLmRhdGEuc2l6ZSBjYW5ub3QgYm90aCBiZSAwAGFycmF5X2NvdW50ID4gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9TQU1QTEVDT1VOVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uc2FtcGxlX2NvdW50ID4gMABwYXNzX2RlZi5zd2FwY2hhaW4uc2FtcGxlX2NvdW50ID4gMABkZXNjLT5oZWlnaHQgPiAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0hFSUdIVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uaGVpZ2h0ID4gMABwYXNzX2RlZi5zd2FwY2hhaW4uaGVpZ2h0ID4gMABkZXNjLT5tYXhfY29tbWl0X2xpc3RlbmVycyA+IDAAdC0+bnVtID4gMABkZXNjLT53aWR0aCA+IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfV0lEVEg6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndpZHRoID4gMABwYXNzX2RlZi5zd2FwY2hhaW4ud2lkdGggPiAwAHViX2Rlc2MtPnNpemUgPiAwAGRlc2MtPnBpeGVscy5zaXplID4gMABsX3N0YXRlLT5zdHJpZGUgPiAwAFZBTElEQVRFX0lNQUdFREVTQ19IRUlHSFQ6IHNnX2ltYWdlX2Rlc2MuaGVpZ2h0IG11c3QgYmUgPiAwAFZBTElEQVRFX0lNQUdFREVTQ19XSURUSDogc2dfaW1hZ2VfZGVzYy53aWR0aCBtdXN0IGJlID4gMABkZXNjLT5zYW1wbGVfY291bnQgPj0gMABiYXNlX2VsZW1lbnQgPj0gMABkZXNjLT5oZWlnaHQgPj0gMABudW1fZWxlbWVudHMgPj0gMABkZXNjLT5tYXhfZHJvcHBlZF9maWxlcyA+PSAwAG51bV9pbnN0YW5jZXMgPj0gMABkZXNjLT5zd2FwX2ludGVydmFsID49IDAAZGVzYy0+bWF4X2Ryb3BwZWRfZmlsZV9wYXRoX2xlbmd0aCA+PSAwAGRlc2MtPndpZHRoID49IDAAZGVzYy0+Y2xpcGJvYXJkX3NpemUgPj0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFTkRFUlZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LnJlbmRlcl92aWV3ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9EM0QxMV9FWFBFQ1RfUkVOREVSVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLnJlbmRlcl92aWV3ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9XR1BVX0VYUEVDVF9ERVBUSFNURU5DSUxWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5kZXB0aF9zdGVuY2lsX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9ERVBUSFNURU5DSUxWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEuZGVwdGhfc3RlbmNpbF92aWV3ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9XR1BVX0VYUEVDVF9SRVNPTFZFVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUucmVzb2x2ZV92aWV3ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9EM0QxMV9FWFBFQ1RfUkVTT0xWRVZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5yZXNvbHZlX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9TQU1QTEVDT1VOVF9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLnNhbXBsZV9jb3VudCA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0hFSUdIVF9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmhlaWdodCA9PSAwAF9zZy5jdXJfcGFzcy5hdHRzID09IDAAdWItPm51bV91bmlmb3JtcyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fR0xfRVhQRUNUX0ZSQU1FQlVGRkVSX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZ2wuZnJhbWVidWZmZXIgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9XSURUSF9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndpZHRoID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfTVNBQUNPTE9SVEVYVFVSRV9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLm1zYWFfY29sb3JfdGV4dHVyZSA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX0RFUFRIU1RFTkNJTFRFWFRVUkVfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5kZXB0aF9zdGVuY2lsX3RleHR1cmUgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9DVVJSRU5URFJBV0FCTEVfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5jdXJyZW50X2RyYXdhYmxlID09IDAAKGRpbSAlIDgpID09IDAAZ2xHZXRFcnJvcigpID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9XR1BVX0VYUEVDVF9SRU5ERVJWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LnJlbmRlcl92aWV3ICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9EM0QxMV9FWFBFQ1RfUkVOREVSVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEucmVuZGVyX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX0RFUFRIU1RFTkNJTFZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUuZGVwdGhfc3RlbmNpbF92aWV3ICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9EM0QxMV9FWFBFQ1RfREVQVEhTVEVOQ0lMVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEuZGVwdGhfc3RlbmNpbF92aWV3ICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9XR1BVX0VYUEVDVF9SRVNPTFZFVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5yZXNvbHZlX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRVNPTFZFVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEucmVzb2x2ZV92aWV3ICE9IDAAZGVzYy0+cGl4ZWxzLnB0ciAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX01TQUFDT0xPUlRFWFRVUkU6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLm1zYWFfY29sb3JfdGV4dHVyZSAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX0RFUFRIU1RFTkNJTFRFWFRVUkU6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLmRlcHRoX3N0ZW5jaWxfdGV4dHVyZSAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX0NVUlJFTlREUkFXQUJMRTogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwuY3VycmVudF9kcmF3YWJsZSAhPSAwAFdJTjMyX0QzRDExX0NSRUFURV9ERVZJQ0VfQU5EX1NXQVBDSEFJTl9XSVRIX0RFQlVHX0ZBSUxFRDogRDNEMTFDcmVhdGVEZXZpY2VBbmRTd2FwQ2hhaW4oKSB3aXRoIEQzRDExX0NSRUFURV9ERVZJQ0VfREVCVUcgZmFpbGVkLCByZXRyeWluZyB3aXRob3V0IGRlYnVnIGZsYWcuAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9SRUFET05MWTogc2hhZGVyIHN0YWdlIHN0b3JhZ2UgYnVmZmVycyBtdXN0IGJlIHJlYWRvbmx5IChzZ19zaGFkZXJfZGVzYy5zdG9yYWdlX2J1ZmZlcnNbXS5yZWFkb25seSkAV0dQVV9CSU5ER1JPVVBTQ0FDSEVfU0laRV9QT1cyOiBzZ19kZXNjLndncHVfYmluZGdyb3Vwc19jYWNoZV9zaXplIG11c3QgYmUgYSBwb3dlciBvZiAyICh3Z3B1KQBXR1BVX0JJTkRHUk9VUFNDQUNIRV9TSVpFX0dSRUFURVJfT05FOiBzZ19kZXNjLndncHVfYmluZGdyb3Vwc19jYWNoZV9zaXplIG11c3QgYmUgPiAxICh3Z3B1KQBXR1BVX0JJTkRHUk9VUFNfUE9PTF9FWEhBVVNURUQ6IGJpbmRncm91cHMgcG9vbCBleGhhdXN0ZWQgKGluY3JlYXNlIHNnX2Rlc2MuYmluZGdyb3Vwc19jYWNoZV9zaXplKSAod2dwdSkAVkFMSURBVEVfU0hBREVSREVTQ19TQU1QTEVSX05PVF9SRUZFUkVOQ0VEX0JZX0lNQUdFX1NBTVBMRVJfUEFJUlM6IG9uZSBvciBtb3JlIHNhbXBsZXJzIGFyZSBub3QgcmVmZXJlbmNlZCBieSBpbWFnZS1zYW1wbGVyLXBhaXJzIChzZ19zaGFkZXJfZGVzYy5pbWFnZV9zYW1wbGVyX3BhaXJzW10uc2FtcGxlcl9zbG90KQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1NBTVBMRVJfUEFJUl9TQU1QTEVSX1NMT1RfT1VUX09GX1JBTkdFOiBpbWFnZS1zYW1wbGVyLXBhaXIgc2FtcGxlciBzbG90IGluZGV4IGlzIG91dCBvZiByYW5nZSAoc2dfc2hhZGVyX2Rlc2MuaW1hZ2Vfc2FtcGxlcl9wYWlyc1tdLnNhbXBsZXJfc2xvdCkAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9OT1RfUkVGRVJFTkNFRF9CWV9JTUFHRV9TQU1QTEVSX1BBSVJTOiBvbmUgb3IgbW9yZSBpbWFnZXMgYXJlIG5vdCByZWZlcmVuY2VkIGJ5IGJ5IGltYWdlLXNhbXBsZXItcGFpcnMgKHNnX3NoYWRlcl9kZXNjLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5pbWFnZV9zbG90KQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1NBTVBMRVJfUEFJUl9JTUFHRV9TTE9UX09VVF9PRl9SQU5HRTogaW1hZ2Utc2FtcGxlci1wYWlyIGltYWdlIHNsb3QgaW5kZXggaXMgb3V0IG9mIHJhbmdlIChzZ19zaGFkZXJfZGVzYy5pbWFnZV9zYW1wbGVyX3BhaXJzW10uaW1hZ2Vfc2xvdCkAKDB4ODg5MiA9PSB0YXJnZXQpIHx8ICgweDg4OTMgPT0gdGFyZ2V0KSB8fCAoMHg5MEQyID09IHRhcmdldCkASU1BR0VfREFUQV9TSVpFX01JU01BVENIOiBpbWFnZSBkYXRhIHNpemUgbWlzbWF0Y2ggKG11c3QgYmUgd2lkdGgqaGVpZ2h0KjQgYnl0ZXMpAChpbmRleCA+PSAwKSAmJiAoaW5kZXggPD0gX3NhcHAuZHJvcC5tYXhfZmlsZXMpAFRyaWFuZ2xlIChzb2tvbC1hcHApAFZBTElEQVRFX0lNQUdFREFUQV9OT0RBVEE6IHNnX2ltYWdlX2RhdGE6IG5vIGRhdGEgKC5wdHIgYW5kL29yIC5zaXplIGlzIHplcm8pAChkZXNjLT5hbGxvY2F0b3IuYWxsb2NfZm4gJiYgZGVzYy0+YWxsb2NhdG9yLmZyZWVfZm4pIHx8ICghZGVzYy0+YWxsb2NhdG9yLmFsbG9jX2ZuICYmICFkZXNjLT5hbGxvY2F0b3IuZnJlZV9mbikAKG51bGwpAEdMX1ZFUlRFWF9BVFRSSUJVVEVfTk9UX0ZPVU5EX0lOX1NIQURFUjogdmVydGV4IGF0dHJpYnV0ZSBub3QgZm91bmQgaW4gc2hhZGVyIChnbCkAR0xfSU1BR0VfU0FNUExFUl9OQU1FX05PVF9GT1VORF9JTl9TSEFERVI6IGltYWdlLXNhbXBsZXIgbmFtZSBub3QgZm91bmQgaW4gc2hhZGVyIChnbCkAR0xfVEVYVFVSRV9GT1JNQVRfTk9UX1NVUFBPUlRFRDogcGl4ZWwgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgZm9yIHRleHR1cmUgKGdsKQBHTF9BUlJBWV9URVhUVVJFU19OT1RfU1VQUE9SVEVEOiBhcnJheSB0ZXh0dXJlcyBub3Qgc3VwcG9ydGVkIChnbCkAR0xfM0RfVEVYVFVSRVNfTk9UX1NVUFBPUlRFRDogM2QgdGV4dHVyZXMgbm90IHN1cHBvcnRlZCAoZ2wpAEdMX1NIQURFUl9DT01QSUxBVElPTl9GQUlMRUQ6IHNoYWRlciBjb21waWxhdGlvbiBmYWlsZWQgKGdsKQBHTF9TSEFERVJfTElOS0lOR19GQUlMRUQ6IHNoYWRlciBsaW5raW5nIGZhaWxlZCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVDogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UIChnbCkAR0xfRlJBTUVCVUZGRVJfU1RBVFVTX0lOQ09NUExFVEVfQVRUQUNITUVOVDogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfQVRUQUNITUVOVCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19JTkNPTVBMRVRFX01VTFRJU0FNUExFOiBmcmFtZWJ1ZmZlciBjb21wbGV0ZW5lc3MgY2hlY2sgZmFpbGVkIHdpdGggR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9NVUxUSVNBTVBMRSAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19VTlNVUFBPUlRFRDogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX1VOU1VQUE9SVEVEIChnbCkAR0xfRlJBTUVCVUZGRVJfU1RBVFVTX1VOREVGSU5FRDogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX1VOREVGSU5FRCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19VTktOT1dOOiBmcmFtZWJ1ZmZlciBjb21wbGV0ZW5lc3MgY2hlY2sgZmFpbGVkICh1bmtub3duIHJlYXNvbikgKGdsKQBNRVRBTF9DUkVBVEVfU0FNUExFUl9GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgc2FtcGxlciBvYmplY3QgKG1ldGFsKQBNRVRBTF9DUkVBVEVfQlVGRkVSX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSBidWZmZXIgb2JqZWN0IChtZXRhbCkATUVUQUxfQ1JFQVRFX1RFWFRVUkVfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHRleHR1cmUgb2JqZWN0IChtZXRhbCkATUVUQUxfQ1JFQVRFX0RTU19GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgZGVwdGggc3RlbmNpbCBzdGF0ZSAobWV0YWwpAE1FVEFMX0NSRUFURV9SUFNfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHJlbmRlciBwaXBlbGluZSBzdGF0ZSAobWV0YWwpAE1FVEFMX1RFWFRVUkVfRk9STUFUX05PVF9TVVBQT1JURUQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciB0ZXh0dXJlIChtZXRhbCkATUVUQUxfU0hBREVSX0VOVFJZX05PVF9GT1VORDogc2hhZGVyIGVudHJ5IGZ1bmN0aW9uIG5vdCBmb3VuZCAobWV0YWwpAE1FVEFMX1NIQURFUl9DT01QSUxBVElPTl9GQUlMRUQ6IHNoYWRlciBjb21waWxhdGlvbiBmYWlsZWQgKG1ldGFsKQBNRVRBTF9TSEFERVJfQ1JFQVRJT05fRkFJTEVEOiBzaGFkZXIgY3JlYXRpb24gZmFpbGVkIChtZXRhbCkAV0lOMzJfUkVHSVNURVJfUkFXX0lOUFVUX0RFVklDRVNfRkFJTEVEX01PVVNFX1VOTE9DSzogUmVnaXN0ZXJSYXdJbnB1dERldmljZXMoKSBmYWlsZWQgKG9uIG1vdXNlIHVubG9jaykAV0lOMzJfUkVHSVNURVJfUkFXX0lOUFVUX0RFVklDRVNfRkFJTEVEX01PVVNFX0xPQ0s6IFJlZ2lzdGVyUmF3SW5wdXREZXZpY2VzKCkgZmFpbGVkIChvbiBtb3VzZSBsb2NrKQBEUk9QUEVEX0ZJTEVfUEFUSF9UT09fTE9ORzogZHJvcHBlZCBmaWxlIHBhdGggdG9vIGxvbmcgKHNhcHBfZGVzYy5tYXhfZHJvcHBlZF9maWxlZF9wYXRoX2xlbmd0aCkAIV9zYXBwX3JpbmdfZW1wdHkocmluZykAIV9zYXBwX3JpbmdfZnVsbChyaW5nKQAoc2xvdF9pbmRleCA+IDApICYmIChzbG90X2luZGV4IDwgcG9vbC0+c2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcG9vbC0+c2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+YXR0YWNobWVudHNfcG9vbC5zaXplKQAoc2xvdF9pbmRleCA+ICgwKSkgJiYgKHNsb3RfaW5kZXggPCBwLT5zYW1wbGVyX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+YnVmZmVyX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+c2hhZGVyX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+cGlwZWxpbmVfcG9vbC5zaXplKQAoc2xvdF9pbmRleCA+ICgwKSkgJiYgKHNsb3RfaW5kZXggPCBwLT5pbWFnZV9wb29sLnNpemUpAFZBTElEQVRFX0JVRkZFUkRFU0NfREFUQTogaW1tdXRhYmxlIGJ1ZmZlcnMgbXVzdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEgKHNnX2J1ZmZlcl9kZXNjLmRhdGEucHRyIGFuZCBzZ19idWZmZXJfZGVzYy5kYXRhLnNpemUpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gYXR0c19pZCkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBzbXBfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gcGlwX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IGltZ19pZCkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBidWZfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gc2hkX2lkKQBibmQucGlwLT5zaGFkZXIgJiYgKGJuZC5waXAtPmNtbi5zaGFkZXJfaWQuaWQgPT0gYm5kLnBpcC0+c2hhZGVyLT5zbG90LmlkKQBwaXAtPnNoYWRlciAmJiAocGlwLT5jbW4uc2hhZGVyX2lkLmlkID09IHBpcC0+c2hhZGVyLT5zbG90LmlkKQBwaXAtPnNoYWRlciAmJiAocGlwLT5zaGFkZXItPnNsb3QuaWQgPT0gcGlwLT5jbW4uc2hhZGVyX2lkLmlkKQAoc3JjLT5zYW1wbGVyX3Nsb3QgPj0gMCkgJiYgKHNyYy0+c2FtcGxlcl9zbG90IDwgU0dfTUFYX1NBTVBMRVJfQklORFNMT1RTKQBzYnVmX2Rlc2MtPmdsc2xfYmluZGluZ19uIDwgKDIgKiBTR19NQVhfU1RPUkFHRUJVRkZFUl9CSU5EU0xPVFMpAChzcmMtPmltYWdlX3Nsb3QgPj0gMCkgJiYgKHNyYy0+aW1hZ2Vfc2xvdCA8IFNHX01BWF9JTUFHRV9CSU5EU0xPVFMpAChkZXNjLT5jb2xvcl9jb3VudCA+PSAwKSAmJiAoZGVzYy0+Y29sb3JfY291bnQgPD0gU0dfTUFYX0NPTE9SX0FUVEFDSE1FTlRTKQBhdHRzICYmIChpbmRleCA+PSAwKSAmJiAoaW5kZXggPCBTR19NQVhfQ09MT1JfQVRUQUNITUVOVFMpAChudW1faW1hZ2VzID4gMCkgJiYgKG51bV9pbWFnZXMgPD0gU0FQUF9NQVhfSUNPTklNQUdFUykAKGRlc2MtPmF0dGFjaG1lbnRzX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5hdHRhY2htZW50c19wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPnNhbXBsZXJfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPnNhbXBsZXJfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5idWZmZXJfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPmJ1ZmZlcl9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPnNoYWRlcl9wb29sX3NpemUgPiAwKSAmJiAoZGVzYy0+c2hhZGVyX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAoZGVzYy0+cGlwZWxpbmVfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPnBpcGVsaW5lX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAoZGVzYy0+aW1hZ2VfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPmltYWdlX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAocGlwLT5zaGFkZXIgPT0gMCkgJiYgKHBpcC0+Y21uLnNoYWRlcl9pZC5pZCAhPSBTR19JTlZBTElEX0lEKQAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpfHwocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCl8fChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKXx8KHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAoc2hkLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQBwaXAgJiYgKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKQBidWYgJiYgKGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKQBzaGQgJiYgKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKQBXSU4zMl9XR0xfT1BFTkdMX1ZFUlNJT05fTk9UX1NVUFBPUlRFRDogcmVxdWVzdGVkIE9wZW5HTCB2ZXJzaW9uIG5vdCBzdXBwb3J0ZWQgYnkgR0wgZHJpdmVyIChFUlJPUl9JTlZBTElEX1ZFUlNJT05fQVJCKQBXSU4zMl9XR0xfT1BFTkdMX1BST0ZJTEVfTk9UX1NVUFBPUlRFRDogcmVxdWVzdGVkIE9wZW5HTCBwcm9maWxlIG5vdCBzdXBwb3J0IGJ5IEdMIGRyaXZlciAoRVJST1JfSU5WQUxJRF9QUk9GSUxFX0FSQikAVkFMSURBVEVfU0hBREVSREVTQ19TQU1QTEVSX1dHU0xfR1JPVVAxX0JJTkRJTkdfT1VUX09GX1JBTkdFOiBzYW1wbGVyICd3Z3NsX2dyb3VwMV9iaW5kaW5nX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4xMjcpAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9XR1NMX0dST1VQMV9CSU5ESU5HX09VVF9PRl9SQU5HRTogc3RvcmFnZSBidWZmZXIgJ3dnc2xfZ3JvdXAxX2JpbmRpbmdfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjEyNykAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9XR1NMX0dST1VQMV9CSU5ESU5HX09VVF9PRl9SQU5HRTogaW1hZ2UgJ3dnc2xfZ3JvdXAxX2JpbmRpbmdfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjEyNykAVkFMSURBVEVfU0hBREVSREVTQ19VQl9NRVRBTF9CVUZGRVJfU0xPVF9PVVRfT0ZfUkFOR0U6IHVuaWZvcm0gYmxvY2sgJ21zbF9idWZmZXJfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjcpAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfSExTTF9SRUdJU1RFUl9CX09VVF9PRl9SQU5HRTogdW5pZm9ybSBibG9jayAnaGxzbF9yZWdpc3Rlcl9iX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi43KQBWQUxJREFURV9TSEFERVJERVNDX0FUVFJfU1RSSU5HX1RPT19MT05HOiB2ZXJ0ZXggYXR0cmlidXRlIG5hbWUvc2VtYW50aWMgc3RyaW5nIHRvbyBsb25nIChtYXggbGVuIDE2KQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfTUVUQUxfQlVGRkVSX1NMT1RfT1VUX09GX1JBTkdFOiBzdG9yYWdlIGJ1ZmZlciAnbXNsX2J1ZmZlcl9uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgOC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9ITFNMX1JFR0lTVEVSX1NfT1VUX09GX1JBTkdFOiBzYW1wbGVyICdobHNsX3JlZ2lzdGVyX3NfbicgaXMgb3V0IG9mIHJhbmcgKG11c3QgYmUgMC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9NRVRBTF9TQU1QTEVSX1NMT1RfT1VUX09GX1JBTkdFOiBzYW1wbGVyICdtc2xfc2FtcGxlcl9uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9HTFNMX0JJTkRJTkdfT1VUX09GX1JBTkdFOiBzdG9yYWdlIGJ1ZmZlciAnZ2xzbF9iaW5kaW5nX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4xNSkAVkFMSURBVEVfU0hBREVSREVTQ19VQl9XR1NMX0dST1VQMF9CSU5ESU5HX09VVF9PRl9SQU5HRTogdW5pZm9ybSBibG9jayAnd2dzbF9ncm91cDBfYmluZGluZ19uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfTUVUQUxfVEVYVFVSRV9TTE9UX09VVF9PRl9SQU5HRTogaW1hZ2UgJ21zbF90ZXh0dXJlX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4xNSkAVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX0hMU0xfUkVHSVNURVJfVF9PVVRfT0ZfUkFOR0U6IHN0b3JhZ2UgYnVmZmVyICdobHNsX3JlZ2lzdGVyX3RfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjIzKQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX0hMU0xfUkVHSVNURVJfVF9PVVRfT0ZfUkFOR0U6IGltYWdlICdobHNsX3JlZ2lzdGVyX3RfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjIzKQBWQUxJREFURV9CVUZGRVJERVNDX1NUT1JBR0VCVUZGRVJfU1VQUE9SVEVEOiBzdG9yYWdlIGJ1ZmZlcnMgbm90IHN1cHBvcnRlZCBieSB0aGUgYmFja2VuZCAzRCBBUEkgKHJlcXVpcmVzIE9wZW5HTCA+PSA0LjMpAExJTlVYX0dMWF9WRVJTSU9OX1RPT19MT1c6IEdMWCB2ZXJzaW9uIHRvbyBsb3cgKG5lZWQgYXQgbGVhc3QgMS4zKQBEM0QxMV9DUkVBVEVfQ09OU1RBTlRfQlVGRkVSX0ZBSUxFRDogQ3JlYXRlQnVmZmVyKCkgZmFpbGVkIGZvciB1bmlmb3JtIGNvbnN0YW50IGJ1ZmZlciAoZDNkMTEpAEQzRDExX01BUF9GT1JfQVBQRU5EX0JVRkZFUl9GQUlMRUQ6IE1hcCgpIGZhaWxlZCB3aGVuIGFwcGVuZGluZyB0byBidWZmZXIgKGQzZDExKQBEM0QxMV9NQVBfRk9SX1VQREFURV9CVUZGRVJfRkFJTEVEOiBNYXAoKSBmYWlsZWQgd2hlbiB1cGRhdGluZyBidWZmZXIgKGQzZDExKQBEM0QxMV9DUkVBVEVfQlVGRkVSX1NSVl9GQUlMRUQ6IENyZWF0ZVNoYWRlclJlc291cmNlVmlldygpIGZhaWxlZCBmb3Igc3RvcmFnZSBidWZmZXIgKGQzZDExKQBEM0QxMV9DUkVBVEVfMkRfVEVYVFVSRV9VTlNVUFBPUlRFRF9QSVhFTF9GT1JNQVQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciAyZC0sIGN1YmUtIG9yIGFycmF5LXRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfMkRfU1JWX0ZBSUxFRDogQ3JlYXRlU2hhZGVyUmVzb3VyY2VWaWV3KCkgZmFpbGVkIGZvciAyZC0sIGN1YmUtIG9yIGFycmF5LXRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfMkRfVEVYVFVSRV9GQUlMRUQ6IENyZWF0ZVRleHR1cmUyRCgpIGZhaWxlZCBmb3IgMmQtLCBjdWJlLSBvciBhcnJheS10ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFX01TQUFfVEVYVFVSRV9GQUlMRUQ6IENyZWF0ZVRleHR1cmUyRCgpIGZhaWxlZCBmb3IgTVNBQSByZW5kZXIgdGFyZ2V0IHRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfREVQVEhfVEVYVFVSRV9VTlNVUFBPUlRFRF9QSVhFTF9GT1JNQVQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciBkZXB0aC1zdGVuY2lsIHRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfREVQVEhfVEVYVFVSRV9GQUlMRUQ6IENyZWF0ZVRleHR1cmUyRCgpIGZhaWxlZCBmb3IgZGVwdGgtc3RlbmNpbCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFXzNEX1NSVl9GQUlMRUQ6IENyZWF0ZVNoYWRlclJlc291cmNlVmlldygpIGZhaWxlZCBmb3IgM2QgdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV8zRF9URVhUVVJFX1VOU1VQUE9SVEVEX1BJWEVMX0ZPUk1BVDogcGl4ZWwgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgZm9yIDNEIHRleHR1cmUgKGQzZDExKQBEM0QxMV9NQVBfRk9SX1VQREFURV9JTUFHRV9GQUlMRUQ6IE1hcCgpIGZhaWxlZCB3aGVuIHVwZGF0aW5nIGltYWdlIChkM2QxMSkARDNEMTFfU0hBREVSX0NPTVBJTEFUSU9OX0ZBSUxFRDogc2hhZGVyIGNvbXBpbGF0aW9uIGZhaWxlZCAoZDNkMTEpAEQzRDExX0xPQURfRDNEQ09NUElMRVJfNDdfRExMX0ZBSUxFRDogbG9hZGluZyBkM2Rjb21waWxlcl80Ny5kbGwgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX1JUVl9GQUlMRUQ6IENyZWF0ZVJlbmRlclRhcmdldFZpZXcoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfRFNWX0ZBSUxFRDogQ3JlYXRlRGVwdGhTdGVuY2lsVmlldygpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9JTlBVVF9MQVlPVVRfRkFJTEVEOiBDcmVhdGVJbnB1dExheW91dCgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9CVUZGRVJfRkFJTEVEOiBDcmVhdGVCdWZmZXIoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfUkFTVEVSSVpFUl9TVEFURV9GQUlMRUQ6IENyZWF0ZVJhc3Rlcml6ZXJTdGF0ZSgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9TQU1QTEVSX1NUQVRFX0ZBSUxFRDogQ3JlYXRlU2FtcGxlclN0YXRlKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RFUFRIX1NURU5DSUxfU1RBVEVfRkFJTEVEOiBDcmVhdGVEZXB0aFN0ZW5jaWxTdGF0ZSgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9CTEVORF9TVEFURV9GQUlMRUQ6IENyZWF0ZUJsZW5kU3RhdGUoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfM0RfVEVYVFVSRV9GQUlMRUQ6IENyZWF0ZVRleHR1cmUzRCgpIGZhaWxlZCAoZDNkMTEpAE1BQ09TX0lOVkFMSURfTlNPUEVOR0xfUFJPRklMRTogbWFjb3M6IGludmFsaWQgTlNPcGVuR0xQcm9maWxlICh2YWxpZCBjaG9pY2VzIGFyZSAxLjAgYW5kIDQuMSkAcG9vbCAmJiAobnVtID49IDEpAChiaW5kaW5ncy0+X3N0YXJ0X2NhbmFyeSA9PSAwKSAmJiAoYmluZGluZ3MtPl9lbmRfY2FuYXJ5PT0wKQAoX3NhcHAuZnJhbWVidWZmZXJfd2lkdGggPiAwKSAmJiAoX3NhcHAuZnJhbWVidWZmZXJfaGVpZ2h0ID4gMCkAc3JjICYmIGRzdCAmJiAobWF4X2xlbiA+IDApAHB0ciAmJiAoc2l6ZSA+IDApAChwYXNzLT5fc3RhcnRfY2FuYXJ5ID09IDApICYmIChwYXNzLT5fZW5kX2NhbmFyeSA9PSAwKQAoZGVzYy0+X3N0YXJ0X2NhbmFyeSA9PSAwKSAmJiAoZGVzYy0+X2VuZF9jYW5hcnkgPT0gMCkAKGFsaWduID4gMCkgJiYgKChhbGlnbiAmIChhbGlnbiAtIDEpKSA9PSAwKQAoZ2xfdGV4X3Nsb3QgPj0gMCkgJiYgKGdsX3RleF9zbG90IDwgKFNHX01BWF9JTUFHRV9TQU1QTEVSX1BBSVJTKSkAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05TVEFSVDogTmF0aXZlQWN0aXZpdHkgb25TdGFydCgpAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OU1RPUDogTmF0aXZlQWN0aXZpdHkgb25TdG9wKCkARFJBV19SRVFVSVJFRF9CSU5ESU5HU19PUl9VTklGT1JNU19NSVNTSU5HOiBjYWxsIHRvIHNnX2FwcGx5X2JpbmRpbmdzKCkgYW5kL29yIHNnX2FwcGx5X3VuaWZvcm1zKCkgbWlzc2luZyBhZnRlciBzZ19hcHBseV9waXBlbGluZSgpAFZBTElEQVRFX0FVQl9OT19QSVBFTElORTogc2dfYXBwbHlfdW5pZm9ybXM6IG11c3QgYmUgY2FsbGVkIGFmdGVyIHNnX2FwcGx5X3BpcGVsaW5lKCkAQU5EUk9JRF9VTlNVUFBPUlRFRF9JTlBVVF9FVkVOVF9JTlBVVF9DQjogdW5zdXBwb3J0ZWQgaW5wdXQgZXZlbnQgZW5jb3VudGVyZWQgaW4gX3NhcHBfYW5kcm9pZF9pbnB1dF9jYigpAEFORFJPSURfUkVBRF9NU0dfRkFJTEVEOiBmYWlsZWQgdG8gcmVhZCBtZXNzYWdlIGluIF9zYXBwX2FuZHJvaWRfbWFpbl9jYigpAEFORFJPSURfVU5TVVBQT1JURURfSU5QVVRfRVZFTlRfTUFJTl9DQjogdW5zdXBwb3J0ZWQgaW5wdXQgZXZlbnQgZW5jb3VudGVyZWQgaW4gX3NhcHBfYW5kcm9pZF9tYWluX2NiKCkAV0dQVV9SRVFVRVNUX0FEQVBURVJfU1RBVFVTX0VSUk9SOiB3Z3B1OiByZXF1ZXN0aW5nIGFkYXB0ZXIgZmFpbGVkIHdpdGggc3RhdHVzICdlcnJvcicAV0dQVV9SRVFVRVNUX0RFVklDRV9TVEFUVVNfRVJST1I6IHdncHU6IHJlcXVlc3RpbmcgZGV2aWNlIGZhaWxlZCB3aXRoIHN0YXR1cyAnZXJyb3InAFdHUFVfUkVRVUVTVF9BREFQVEVSX1NUQVRVU19VTktOT1dOOiB3Z3B1OiByZXF1ZXN0aW5nIGFkYXB0ZXIgZmFpbGVkIHdpdGggc3RhdHVzICd1bmtub3duJwBXR1BVX1JFUVVFU1RfREVWSUNFX1NUQVRVU19VTktOT1dOOiB3Z3B1OiByZXF1ZXN0aW5nIGRldmljZSBmYWlsZWQgd2l0aCBzdGF0dXMgJ3Vua25vd24nAFdHUFVfUkVRVUVTVF9BREFQVEVSX1NUQVRVU19VTkFWQUlMQUJMRTogd2dwdTogcmVxdWVzdGluZyBhZGFwdGVyIGZhaWxlZCB3aXRoICd1bmF2YWlsYWJsZScATElOVVhfWDExX0RST1BQRURfRklMRV9VUklfV1JPTkdfU0NIRU1FOiBkcm9wcGVkIGZpbGUgVVJMIGRvZXNuJ3Qgc3RhcnQgd2l0aCAnZmlsZTovLycAXSAATUVUQUxfQ1JFQVRFX1JQU19PVVRQVVQ6IABNRVRBTF9TSEFERVJfQ09NUElMQVRJT05fT1VUUFVUOiAARDNEMTFfU0hBREVSX0NPTVBJTEFUSU9OX09VVFBVVDogADowOiAAX3NhcHBfZW1zY193ZWJnbF9pbml0OiAl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HgEAfF8BAA5fAQBDLwEAmWcBAAwfAQA9TAEA6C8BAIZhAQBFbgEAeVQBAC1UAQDYSgEA52UBAHhmAQDOEAEAri4BALpLAQCMLwEADxwBAA2sAQBEAwEA/SoBAMQbAQCXKQEAikABAB1AAQB2GwEA6SkBALA/AQDxSAEA4kABABVYAQAAAAAABQAAAAAAAAAAAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEwAAABQAAADoAQIAAAQAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAP////8KAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoL4BALAIAgAAQbj+BgskJHdpdGhTdGFja1NhdmUsJHN0cmluZ1RvVVRGOE9uU3RhY2sAAEHc/gYLrS8odm9pZCk8Ojo+eyBNb2R1bGUuc29rb2xfYmVmb3JldW5sb2FkID0gKGV2ZW50KSA9PiB7IGlmIChfX3NhcHBfaHRtbDVfZ2V0X2Fza19sZWF2ZV9zaXRlKCkgIT0gMCkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBldmVudC5yZXR1cm5WYWx1ZSA9ICcgJzsgfSB9OyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgTW9kdWxlLnNva29sX2JlZm9yZXVubG9hZCk7IH0AKHZvaWQpPDo6Pnsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIE1vZHVsZS5zb2tvbF9iZWZvcmV1bmxvYWQpOyB9ACh2b2lkKTw6Oj57IE1vZHVsZS5zb2tvbF9wYXN0ZSA9IChldmVudCkgPT4geyBjb25zdCBwYXN0ZWRfc3RyID0gZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7IHdpdGhTdGFja1NhdmUoKCkgPT4geyBjb25zdCBjc3RyID0gc3RyaW5nVG9VVEY4T25TdGFjayhwYXN0ZWRfc3RyKTsgX19zYXBwX2Vtc2Nfb25wYXN0ZShjc3RyKTsgfSk7IH07IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIE1vZHVsZS5zb2tvbF9wYXN0ZSk7IH0AKHZvaWQpPDo6Pnsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgTW9kdWxlLnNva29sX3Bhc3RlKTsgfQAoY29uc3QgY2hhciogY19zdHIpPDo6PnsgY29uc3Qgc3RyID0gVVRGOFRvU3RyaW5nKGNfc3RyKTsgY29uc3QgdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpOyB0YS5zZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScsICdvZmYnKTsgdGEuc2V0QXR0cmlidXRlKCdhdXRvY29ycmVjdCcsICdvZmYnKTsgdGEuc2V0QXR0cmlidXRlKCdhdXRvY2FwaXRhbGl6ZScsICdvZmYnKTsgdGEuc2V0QXR0cmlidXRlKCdzcGVsbGNoZWNrJywgJ2ZhbHNlJyk7IHRhLnN0eWxlLmxlZnQgPSAtMTAwICsgJ3B4JzsgdGEuc3R5bGUudG9wID0gLTEwMCArICdweCc7IHRhLnN0eWxlLmhlaWdodCA9IDE7IHRhLnN0eWxlLndpZHRoID0gMTsgdGEudmFsdWUgPSBzdHI7IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGEpOyB0YS5zZWxlY3QoKTsgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTsgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0YSk7IH0AKGNvbnN0IGNoYXIqIGNhbnZhc19zZWxlY3Rvcl9jc3RyKTw6Oj57IE1vZHVsZS5zb2tvbF9kcm9wX2ZpbGVzID0gW107IGNvbnN0IGNhbnZhc19zZWxlY3RvciA9IFVURjhUb1N0cmluZyhjYW52YXNfc2VsZWN0b3JfY3N0cik7IGNvbnN0IGNhbnZhcyA9IE1vZHVsZS5jYW52YXMgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjYW52YXNfc2VsZWN0b3IpOyBNb2R1bGUuc29rb2xfZHJhZ2VudGVyID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJhZ292ZXIgPSAoZXZlbnQpID0+IHsgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH07IE1vZHVsZS5zb2tvbF9kcm9wID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBjb25zdCBmaWxlcyA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlczsgTW9kdWxlLnNva29sX2Ryb3BwZWRfZmlsZXMgPSBmaWxlczsgX19zYXBwX2Vtc2NfYmVnaW5fZHJvcChmaWxlcy5sZW5ndGgpOyBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7IHdpdGhTdGFja1NhdmUoKCkgPT4geyBjb25zdCBjc3RyID0gc3RyaW5nVG9VVEY4T25TdGFjayhmaWxlc1tpXS5uYW1lKTsgX19zYXBwX2Vtc2NfZHJvcChpLCBjc3RyKTsgfSk7IH0gbGV0IG1vZHMgPSAwOyBpZiAoZXZlbnQuc2hpZnRLZXkpIHsgbW9kcyB8PSAxOyB9IGlmIChldmVudC5jdHJsS2V5KSB7IG1vZHMgfD0gMjsgfSBpZiAoZXZlbnQuYWx0S2V5KSB7IG1vZHMgfD0gNDsgfSBpZiAoZXZlbnQubWV0YUtleSkgeyBtb2RzIHw9IDg7IH0gX19zYXBwX2Vtc2NfZW5kX2Ryb3AoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgbW9kcyk7IH07IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBNb2R1bGUuc29rb2xfZHJhZ2VudGVyLCBmYWxzZSk7IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlLCBmYWxzZSk7IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIE1vZHVsZS5zb2tvbF9kcmFnb3ZlciwgZmFsc2UpOyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIE1vZHVsZS5zb2tvbF9kcm9wLCBmYWxzZSk7IH0AKGludCBpbmRleCk8Ojo+eyAvKiogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gKi8gY29uc3QgZmlsZXMgPSBNb2R1bGUuc29rb2xfZHJvcHBlZF9maWxlczsgaWYgKChpbmRleCA8IDApIHx8IChpbmRleCA+PSBmaWxlcy5sZW5ndGgpKSB7IHJldHVybiAwOyB9IGVsc2UgeyByZXR1cm4gZmlsZXNbaW5kZXhdLnNpemU7IH0gfQAoaW50IGluZGV4LCBfc2FwcF9odG1sNV9mZXRjaF9jYWxsYmFjayBjYWxsYmFjaywgdm9pZCogYnVmX3B0ciwgdWludDMyX3QgYnVmX3NpemUsIHZvaWQqIHVzZXJfZGF0YSk8Ojo+eyBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpOyByZWFkZXIub25sb2FkID0gKGxvYWRFdmVudCkgPT4geyBjb25zdCBjb250ZW50ID0gbG9hZEV2ZW50LnRhcmdldC5yZXN1bHQ7IGlmIChjb250ZW50LmJ5dGVMZW5ndGggPiBidWZfc2l6ZSkgeyBfX3NhcHBfZW1zY19pbnZva2VfZmV0Y2hfY2IoaW5kZXgsIDAsIDEsIGNhbGxiYWNrLCAwLCBidWZfcHRyLCBidWZfc2l6ZSwgdXNlcl9kYXRhKTsgfSBlbHNlIHsgSEVBUFU4LnNldChuZXcgVWludDhBcnJheShjb250ZW50KSwgYnVmX3B0cik7IF9fc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYihpbmRleCwgMSwgMCwgY2FsbGJhY2ssIGNvbnRlbnQuYnl0ZUxlbmd0aCwgYnVmX3B0ciwgYnVmX3NpemUsIHVzZXJfZGF0YSk7IH0gfTsgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiB7IF9fc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYihpbmRleCwgMCwgMiwgY2FsbGJhY2ssIDAsIGJ1Zl9wdHIsIGJ1Zl9zaXplLCB1c2VyX2RhdGEpOyB9OyAvKiogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gKi8gY29uc3QgZmlsZXMgPSBNb2R1bGUuc29rb2xfZHJvcHBlZF9maWxlczsgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGVzW2luZGV4XSk7IH0AKGNvbnN0IGNoYXIqIGNhbnZhc19zZWxlY3Rvcl9jc3RyKTw6Oj57IGNvbnN0IGNhbnZhc19zZWxlY3RvciA9IFVURjhUb1N0cmluZyhjYW52YXNfbmFtZV9jc3RyKTsgY29uc3QgY2FudmFzID0gTW9kdWxlcy5jYW52YXMgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjYW52YXNfc2VsZWN0b3IpOyBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgTW9kdWxlLnNva29sX2RyYWdlbnRlcik7IGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlKTsgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgTW9kdWxlLnNva29sX2RyYWdvdmVyKTsgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBNb2R1bGUuc29rb2xfZHJvcCk7IH0AKGNvbnN0IGNoYXIqIGNhbnZhc19zZWxlY3Rvcl9jc3RyKTw6Oj57IGlmIChNb2R1bGUuY2FudmFzKSB7IHNwZWNpYWxIVE1MVGFyZ2V0c1siIWNhbnZhcyJdID0gTW9kdWxlLnNhcHBfZW1zY190YXJnZXQgPSBNb2R1bGUuY2FudmFzOyBzdHJpbmdUb1VURjgoIiFjYW52YXMiLCBjYW52YXNfc2VsZWN0b3JfY3N0ciwgOCk7IHJldHVybjsgfSBjb25zdCBjYW52YXNfc2VsZWN0b3IgPSBVVEY4VG9TdHJpbmcoY2FudmFzX3NlbGVjdG9yX2NzdHIpOyBNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2FudmFzX3NlbGVjdG9yKTsgTW9kdWxlLmNhbnZhcyA9IE1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0OyBpZiAoIU1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0KSB7IGNvbnNvbGUubG9nKCJzb2tvbF9hcHAuaDogaW52YWxpZCB0YXJnZXQ6IiArIGNhbnZhc19zZWxlY3Rvcik7IH0gaWYgKCFNb2R1bGUuc2FwcF9lbXNjX3RhcmdldC5yZXF1ZXN0UG9pbnRlckxvY2spIHsgY29uc29sZS5sb2coInNva29sX2FwcC5oOiB0YXJnZXQgZG9lc24ndCBzdXBwb3J0IHJlcXVlc3RQb2ludGVyTG9jazoiICsgY2FudmFzX3NlbGVjdG9yKTsgfSB9ACh2b2lkKTw6Oj57IGlmIChNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCkgeyBpZiAoTW9kdWxlLnNhcHBfZW1zY190YXJnZXQucmVxdWVzdFBvaW50ZXJMb2NrKSB7IE1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0LnJlcXVlc3RQb2ludGVyTG9jaygpOyB9IH0gfQAodm9pZCk8Ojo+eyBpZiAoZG9jdW1lbnQuZXhpdFBvaW50ZXJMb2NrKSB7IGRvY3VtZW50LmV4aXRQb2ludGVyTG9jaygpOyB9IH0AKGludCBjdXJzb3JfdHlwZSwgaW50IHNob3duKTw6Oj57IGlmIChNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCkgeyBsZXQgY3Vyc29yOyBpZiAoc2hvd24gPT09IDApIHsgY3Vyc29yID0gIm5vbmUiOyB9IGVsc2Ugc3dpdGNoIChjdXJzb3JfdHlwZSkgeyBjYXNlIDA6IGN1cnNvciA9ICJhdXRvIjsgYnJlYWs7IGNhc2UgMTogY3Vyc29yID0gImRlZmF1bHQiOyBicmVhazsgY2FzZSAyOiBjdXJzb3IgPSAidGV4dCI7IGJyZWFrOyBjYXNlIDM6IGN1cnNvciA9ICJjcm9zc2hhaXIiOyBicmVhazsgY2FzZSA0OiBjdXJzb3IgPSAicG9pbnRlciI7IGJyZWFrOyBjYXNlIDU6IGN1cnNvciA9ICJldy1yZXNpemUiOyBicmVhazsgY2FzZSA2OiBjdXJzb3IgPSAibnMtcmVzaXplIjsgYnJlYWs7IGNhc2UgNzogY3Vyc29yID0gIm53c2UtcmVzaXplIjsgYnJlYWs7IGNhc2UgODogY3Vyc29yID0gIm5lc3ctcmVzaXplIjsgYnJlYWs7IGNhc2UgOTogY3Vyc29yID0gImFsbC1zY3JvbGwiOyBicmVhazsgY2FzZSAxMDogY3Vyc29yID0gIm5vdC1hbGxvd2VkIjsgYnJlYWs7IGRlZmF1bHQ6IGN1cnNvciA9ICJhdXRvIjsgYnJlYWs7IH0gTW9kdWxlLnNhcHBfZW1zY190YXJnZXQuc3R5bGUuY3Vyc29yID0gY3Vyc29yOyB9IH0AKHZvaWQpPDo6PnsgY29uc3QgbGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb2tvbC1hcHAtZmF2aWNvbicpOyBpZiAobGluaykgeyBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKGxpbmspOyB9IH0AKGludCB3LCBpbnQgaCwgY29uc3QgdWludDhfdCogcGl4ZWxzKTw6Oj57IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyBjYW52YXMud2lkdGggPSB3OyBjYW52YXMuaGVpZ2h0ID0gaDsgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IGNvbnN0IGltZ19kYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YSh3LCBoKTsgaW1nX2RhdGEuZGF0YS5zZXQoSEVBUFU4LnN1YmFycmF5KHBpeGVscywgcGl4ZWxzICsgdypoKjQpKTsgY3R4LnB1dEltYWdlRGF0YShpbWdfZGF0YSwgMCwgMCk7IGNvbnN0IG5ld19saW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpOyBuZXdfbGluay5pZCA9ICdzb2tvbC1hcHAtZmF2aWNvbic7IG5ld19saW5rLnJlbCA9ICdzaG9ydGN1dCBpY29uJzsgbmV3X2xpbmsuaHJlZiA9IGNhbnZhcy50b0RhdGFVUkwoKTsgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXdfbGluayk7IH0AKHVpbnQzMl90IGxldmVsLCBjb25zdCBjaGFyKiBjX3N0cik8Ojo+eyBjb25zdCBzdHIgPSBVVEY4VG9TdHJpbmcoY19zdHIpOyBzd2l0Y2ggKGxldmVsKSB7IGNhc2UgMDogY29uc29sZS5lcnJvcihzdHIpOyBicmVhazsgY2FzZSAxOiBjb25zb2xlLmVycm9yKHN0cik7IGJyZWFrOyBjYXNlIDI6IGNvbnNvbGUud2FybihzdHIpOyBicmVhazsgZGVmYXVsdDogY29uc29sZS5pbmZvKHN0cik7IGJyZWFrOyB9IH0A';
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

function sapp_js_add_beforeunload_listener() { Module.sokol_beforeunload = (event) => { if (__sapp_html5_get_ask_leave_site() != 0) { event.preventDefault(); event.returnValue = ' '; } }; window.addEventListener('beforeunload', Module.sokol_beforeunload); }
function sapp_js_remove_beforeunload_listener() { window.removeEventListener('beforeunload', Module.sokol_beforeunload); }
function sapp_js_add_clipboard_listener() { Module.sokol_paste = (event) => { const pasted_str = event.clipboardData.getData('text'); withStackSave(() => { const cstr = stringToUTF8OnStack(pasted_str); __sapp_emsc_onpaste(cstr); }); }; window.addEventListener('paste', Module.sokol_paste); }
function sapp_js_remove_clipboard_listener() { window.removeEventListener('paste', Module.sokol_paste); }
function sapp_js_write_clipboard(c_str) { const str = UTF8ToString(c_str); const ta = document.createElement('textarea'); ta.setAttribute('autocomplete', 'off'); ta.setAttribute('autocorrect', 'off'); ta.setAttribute('autocapitalize', 'off'); ta.setAttribute('spellcheck', 'false'); ta.style.left = -100 + 'px'; ta.style.top = -100 + 'px'; ta.style.height = 1; ta.style.width = 1; ta.value = str; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
function sapp_js_add_dragndrop_listeners(canvas_selector_cstr) { Module.sokol_drop_files = []; const canvas_selector = UTF8ToString(canvas_selector_cstr); const canvas = Module.canvas || document.querySelector(canvas_selector); Module.sokol_dragenter = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_dragleave = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_dragover = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_drop = (event) => { event.stopPropagation(); event.preventDefault(); const files = event.dataTransfer.files; Module.sokol_dropped_files = files; __sapp_emsc_begin_drop(files.length); for (let i = 0; i < files.length; i++) { withStackSave(() => { const cstr = stringToUTF8OnStack(files[i].name); __sapp_emsc_drop(i, cstr); }); } let mods = 0; if (event.shiftKey) { mods |= 1; } if (event.ctrlKey) { mods |= 2; } if (event.altKey) { mods |= 4; } if (event.metaKey) { mods |= 8; } __sapp_emsc_end_drop(event.clientX, event.clientY, mods); }; canvas.addEventListener('dragenter', Module.sokol_dragenter, false); canvas.addEventListener('dragleave', Module.sokol_dragleave, false); canvas.addEventListener('dragover', Module.sokol_dragover, false); canvas.addEventListener('drop', Module.sokol_drop, false); }
function sapp_js_dropped_file_size(index) { /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files; if ((index < 0) || (index >= files.length)) { return 0; } else { return files[index].size; } }
function sapp_js_fetch_dropped_file(index,callback,buf_ptr,buf_size,user_data) { const reader = new FileReader(); reader.onload = (loadEvent) => { const content = loadEvent.target.result; if (content.byteLength > buf_size) { __sapp_emsc_invoke_fetch_cb(index, 0, 1, callback, 0, buf_ptr, buf_size, user_data); } else { HEAPU8.set(new Uint8Array(content), buf_ptr); __sapp_emsc_invoke_fetch_cb(index, 1, 0, callback, content.byteLength, buf_ptr, buf_size, user_data); } }; reader.onerror = () => { __sapp_emsc_invoke_fetch_cb(index, 0, 2, callback, 0, buf_ptr, buf_size, user_data); }; /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files; reader.readAsArrayBuffer(files[index]); }
function sapp_js_remove_dragndrop_listeners(canvas_selector_cstr) { const canvas_selector = UTF8ToString(canvas_name_cstr); const canvas = Modules.canvas || document.querySelector(canvas_selector); canvas.removeEventListener('dragenter', Module.sokol_dragenter); canvas.removeEventListener('dragleave', Module.sokol_dragleave); canvas.removeEventListener('dragover', Module.sokol_dragover); canvas.removeEventListener('drop', Module.sokol_drop); }
function sapp_js_init(canvas_selector_cstr) { if (Module.canvas) { specialHTMLTargets["!canvas"] = Module.sapp_emsc_target = Module.canvas; stringToUTF8("!canvas", canvas_selector_cstr, 8); return; } const canvas_selector = UTF8ToString(canvas_selector_cstr); Module.sapp_emsc_target = document.querySelector(canvas_selector); Module.canvas = Module.sapp_emsc_target; if (!Module.sapp_emsc_target) { console.log("sokol_app.h: invalid target:" + canvas_selector); } if (!Module.sapp_emsc_target.requestPointerLock) { console.log("sokol_app.h: target doesn't support requestPointerLock:" + canvas_selector); } }
function sapp_js_request_pointerlock() { if (Module.sapp_emsc_target) { if (Module.sapp_emsc_target.requestPointerLock) { Module.sapp_emsc_target.requestPointerLock(); } } }
function sapp_js_exit_pointerlock() { if (document.exitPointerLock) { document.exitPointerLock(); } }
function sapp_js_set_cursor(cursor_type,shown) { if (Module.sapp_emsc_target) { let cursor; if (shown === 0) { cursor = "none"; } else switch (cursor_type) { case 0: cursor = "auto"; break; case 1: cursor = "default"; break; case 2: cursor = "text"; break; case 3: cursor = "crosshair"; break; case 4: cursor = "pointer"; break; case 5: cursor = "ew-resize"; break; case 6: cursor = "ns-resize"; break; case 7: cursor = "nwse-resize"; break; case 8: cursor = "nesw-resize"; break; case 9: cursor = "all-scroll"; break; case 10: cursor = "not-allowed"; break; default: cursor = "auto"; break; } Module.sapp_emsc_target.style.cursor = cursor; } }
function sapp_js_clear_favicon() { const link = document.getElementById('sokol-app-favicon'); if (link) { document.head.removeChild(link); } }
function sapp_js_set_favicon(w,h,pixels) { const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h; const ctx = canvas.getContext('2d'); const img_data = ctx.createImageData(w, h); img_data.data.set(HEAPU8.subarray(pixels, pixels + w*h*4)); ctx.putImageData(img_data, 0, 0); const new_link = document.createElement('link'); new_link.id = 'sokol-app-favicon'; new_link.rel = 'shortcut icon'; new_link.href = canvas.toDataURL(); document.head.appendChild(new_link); }
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

  
  
  var webglPowerPreferences = ["default","low-power","high-performance"];
  
  
  
  /** @suppress {duplicate } */
  var _emscripten_webgl_do_create_context = (target, attributes) => {
      assert(attributes);
      var attr32 = ((attributes)>>2);
      var powerPreference = HEAP32[attr32 + (8>>2)];
      var contextAttributes = {
        'alpha': !!HEAP8[attributes + 0],
        'depth': !!HEAP8[attributes + 1],
        'stencil': !!HEAP8[attributes + 2],
        'antialias': !!HEAP8[attributes + 3],
        'premultipliedAlpha': !!HEAP8[attributes + 4],
        'preserveDrawingBuffer': !!HEAP8[attributes + 5],
        'powerPreference': webglPowerPreferences[powerPreference],
        'failIfMajorPerformanceCaveat': !!HEAP8[attributes + 12],
        // The following are not predefined WebGL context attributes in the WebGL specification, so the property names can be minified by Closure.
        majorVersion: HEAP32[attr32 + (16>>2)],
        minorVersion: HEAP32[attr32 + (20>>2)],
        enableExtensionsByDefault: HEAP8[attributes + 24],
        explicitSwapControl: HEAP8[attributes + 25],
        proxyContextToMainThread: HEAP32[attr32 + (28>>2)],
        renderViaOffscreenBackBuffer: HEAP8[attributes + 32]
      };
  
      var canvas = findCanvasEventTarget(target);
  
      if (!canvas) {
        return 0;
      }
  
      if (contextAttributes.explicitSwapControl) {
        return 0;
      }
  
      var contextHandle = GL.createContext(canvas, contextAttributes);
      return contextHandle;
    };
  var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;

  
  
  
  
  
  
  
  
  
  
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

  var printCharBuffers = [null,[],[]];
  
  var printChar = (stream, curr) => {
      var buffer = printCharBuffers[stream];
      assert(buffer);
      if (curr === 0 || curr === 10) {
        (stream === 1 ? out : err)(UTF8ArrayToString(buffer));
        buffer.length = 0;
      } else {
        buffer.push(curr);
      }
    };
  
  var flush_NO_FILESYSTEM = () => {
      // flush anything remaining in the buffers during shutdown
      _fflush(0);
      if (printCharBuffers[1].length) printChar(1, 10);
      if (printCharBuffers[2].length) printChar(2, 10);
    };
  
  
  var SYSCALLS = {
  varargs:undefined,
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  var _fd_write = (fd, iov, iovcnt, pnum) => {
      // hack to support printf in SYSCALLS_REQUIRE_FILESYSTEM=0
      var num = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        for (var j = 0; j < len; j++) {
          printChar(fd, HEAPU8[ptr+j]);
        }
        num += len;
      }
      HEAPU32[((pnum)>>2)] = num;
      return 0;
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
  emscripten_webgl_create_context: _emscripten_webgl_create_context,
  /** @export */
  emscripten_webgl_enable_extension: _emscripten_webgl_enable_extension,
  /** @export */
  emscripten_webgl_make_context_current: _emscripten_webgl_make_context_current,
  /** @export */
  fd_write: _fd_write,
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
var dynCall_jiji = Module['dynCall_jiji'] = createExportWrapper('dynCall_jiji', 5);


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
  'flush_NO_FILESYSTEM',
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
    flush_NO_FILESYSTEM();
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
