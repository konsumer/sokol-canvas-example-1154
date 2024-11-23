
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
    var f = 'data:application/octet-stream;base64,AGFzbQEAAAABrQEaYAF/AGABfwF/YAAAYAJ/fwBgAn9/AX9gAAF/YAN/f38Bf2AFf39/f38Bf2AEf39/fwBgA39/fwBgB39/f39/f38AYAJ/fABgAAF8YAR9fX19AGACfX0AYAR/f31/AGAGf39/f39/AGAFf39/f38AYAp/f39/f39/f39/AGAIf39/f39/f38AYAJ8fwF/YAR/f39/AX9gAn5+AX9gAX8BfGABfQF9YAN/fn8BfgK9GnIDZW52DV9fYXNzZXJ0X2ZhaWwACANlbnYMc2FwcF9qc19pbml0AAADZW52H2Vtc2NyaXB0ZW5fZ2V0X2VsZW1lbnRfY3NzX3NpemUABgNlbnYoZW1zY3JpcHRlbl9zZXRfcmVzaXplX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiFlbXNjcmlwdGVuX2dldF9kZXZpY2VfcGl4ZWxfcmF0aW8ADANlbnYiZW1zY3JpcHRlbl9zZXRfY2FudmFzX2VsZW1lbnRfc2l6ZQAGA2VudhhlbXNjcmlwdGVuX3NldF9tYWluX2xvb3AACQNlbnYnZW1zY3JpcHRlbl9yZXF1ZXN0X2FuaW1hdGlvbl9mcmFtZV9sb29wAAMDZW52FXNhcHBfanNfY2xlYXJfZmF2aWNvbgACA2VudhNzYXBwX2pzX3NldF9mYXZpY29uAAkDZW52C3Nsb2dfanNfbG9nAAMDZW52H2Vtc2NyaXB0ZW5fd2ViZ2xfY3JlYXRlX2NvbnRleHQABANlbnYlZW1zY3JpcHRlbl93ZWJnbF9tYWtlX2NvbnRleHRfY3VycmVudAABA2Vudg1nbEdldEludGVnZXJ2AAMDZW52IWVtc2NyaXB0ZW5fd2ViZ2xfZW5hYmxlX2V4dGVuc2lvbgAEA2VuditlbXNjcmlwdGVuX3NldF9tb3VzZWRvd25fY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52KWVtc2NyaXB0ZW5fc2V0X21vdXNldXBfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52K2Vtc2NyaXB0ZW5fc2V0X21vdXNlbW92ZV9jYWxsYmFja19vbl90aHJlYWQABwNlbnYsZW1zY3JpcHRlbl9zZXRfbW91c2VlbnRlcl9jYWxsYmFja19vbl90aHJlYWQABwNlbnYsZW1zY3JpcHRlbl9zZXRfbW91c2VsZWF2ZV9jYWxsYmFja19vbl90aHJlYWQABwNlbnYnZW1zY3JpcHRlbl9zZXRfd2hlZWxfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52KWVtc2NyaXB0ZW5fc2V0X2tleWRvd25fY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52J2Vtc2NyaXB0ZW5fc2V0X2tleXVwX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiplbXNjcmlwdGVuX3NldF9rZXlwcmVzc19jYWxsYmFja19vbl90aHJlYWQABwNlbnYsZW1zY3JpcHRlbl9zZXRfdG91Y2hzdGFydF9jYWxsYmFja19vbl90aHJlYWQABwNlbnYrZW1zY3JpcHRlbl9zZXRfdG91Y2htb3ZlX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiplbXNjcmlwdGVuX3NldF90b3VjaGVuZF9jYWxsYmFja19vbl90aHJlYWQABwNlbnYtZW1zY3JpcHRlbl9zZXRfdG91Y2hjYW5jZWxfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52M2Vtc2NyaXB0ZW5fc2V0X3BvaW50ZXJsb2NrY2hhbmdlX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudjJlbXNjcmlwdGVuX3NldF9wb2ludGVybG9ja2Vycm9yX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudidlbXNjcmlwdGVuX3NldF9mb2N1c19jYWxsYmFja19vbl90aHJlYWQABwNlbnYmZW1zY3JpcHRlbl9zZXRfYmx1cl9jYWxsYmFja19vbl90aHJlYWQABwNlbnYhc2FwcF9qc19hZGRfYmVmb3JldW5sb2FkX2xpc3RlbmVyAAIDZW52HnNhcHBfanNfYWRkX2NsaXBib2FyZF9saXN0ZW5lcgACA2Vudh9zYXBwX2pzX2FkZF9kcmFnbmRyb3BfbGlzdGVuZXJzAAIDZW52MmVtc2NyaXB0ZW5fc2V0X3dlYmdsY29udGV4dGxvc3RfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52NmVtc2NyaXB0ZW5fc2V0X3dlYmdsY29udGV4dHJlc3RvcmVkX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudhplbXNjcmlwdGVuX3BlcmZvcm1hbmNlX25vdwAMA2VudhtlbXNjcmlwdGVuX2NhbmNlbF9tYWluX2xvb3AAAgNlbnYbc2FwcF9qc19yZXF1ZXN0X3BvaW50ZXJsb2NrAAIDZW52JHNhcHBfanNfcmVtb3ZlX2JlZm9yZXVubG9hZF9saXN0ZW5lcgACA2VudiFzYXBwX2pzX3JlbW92ZV9jbGlwYm9hcmRfbGlzdGVuZXIAAgNlbnYic2FwcF9qc19yZW1vdmVfZHJhZ25kcm9wX2xpc3RlbmVycwACA2VudgpnbEdldEVycm9yAAUDZW52EWdsR2VuVmVydGV4QXJyYXlzAAMDZW52EWdsQmluZFZlcnRleEFycmF5AAADZW52DWdsUGl4ZWxTdG9yZWkAAwNlbnYMZ2xHZXRTdHJpbmdpAAQDZW52GmdsRGlzYWJsZVZlcnRleEF0dHJpYkFycmF5AAADZW52CGdsRW5hYmxlAAADZW52C2dsRGVwdGhGdW5jAAADZW52C2dsRGVwdGhNYXNrAAADZW52CWdsRGlzYWJsZQAAA2Vudg1nbFN0ZW5jaWxGdW5jAAkDZW52C2dsU3RlbmNpbE9wAAkDZW52DWdsU3RlbmNpbE1hc2sAAANlbnYTZ2xCbGVuZEZ1bmNTZXBhcmF0ZQAIA2VudhdnbEJsZW5kRXF1YXRpb25TZXBhcmF0ZQADA2VudgxnbEJsZW5kQ29sb3IADQNlbnYLZ2xDb2xvck1hc2sACANlbnYPZ2xQb2x5Z29uT2Zmc2V0AA4DZW52C2dsRnJvbnRGYWNlAAADZW52CmdsQ3VsbEZhY2UAAANlbnYMZ2xCaW5kQnVmZmVyAAMDZW52EGdsQmluZEJ1ZmZlckJhc2UACQNlbnYPZ2xBY3RpdmVUZXh0dXJlAAADZW52DWdsQmluZFRleHR1cmUAAwNlbnYNZ2xCaW5kU2FtcGxlcgADA2Vudg9nbERlbGV0ZUJ1ZmZlcnMAAwNlbnYQZ2xEZWxldGVUZXh0dXJlcwADA2VudhVnbERlbGV0ZVJlbmRlcmJ1ZmZlcnMAAwNlbnYQZ2xEZWxldGVTYW1wbGVycwADA2Vudg9nbERlbGV0ZVByb2dyYW0AAANlbnYMZ2xVc2VQcm9ncmFtAAADZW52FGdsRGVsZXRlRnJhbWVidWZmZXJzAAMDZW52FGdsRGVsZXRlVmVydGV4QXJyYXlzAAMDZW52DGdsR2VuQnVmZmVycwADA2VudgxnbEJ1ZmZlckRhdGEACANlbnYPZ2xCdWZmZXJTdWJEYXRhAAgDZW52D2dsQ3JlYXRlUHJvZ3JhbQAFA2Vudg5nbEF0dGFjaFNoYWRlcgADA2Vudg1nbExpbmtQcm9ncmFtAAADZW52DmdsRGVsZXRlU2hhZGVyAAADZW52DmdsR2V0UHJvZ3JhbWl2AAkDZW52E2dsR2V0UHJvZ3JhbUluZm9Mb2cACANlbnYUZ2xHZXRVbmlmb3JtTG9jYXRpb24ABANlbnYLZ2xVbmlmb3JtMWkAAwNlbnYOZ2xDcmVhdGVTaGFkZXIAAQNlbnYOZ2xTaGFkZXJTb3VyY2UACANlbnYPZ2xDb21waWxlU2hhZGVyAAADZW52DWdsR2V0U2hhZGVyaXYACQNlbnYSZ2xHZXRTaGFkZXJJbmZvTG9nAAgDZW52E2dsR2V0QXR0cmliTG9jYXRpb24ABANlbnYRZ2xCaW5kRnJhbWVidWZmZXIAAwNlbnYKZ2xWaWV3cG9ydAAIA2VudglnbFNjaXNzb3IACANlbnYPZ2xDbGVhckJ1ZmZlcmZ2AAkDZW52D2dsQ2xlYXJCdWZmZXJmaQAPA2Vudg9nbENsZWFyQnVmZmVyaXYACQNlbnYVZ2xTdGVuY2lsRnVuY1NlcGFyYXRlAAgDZW52E2dsU3RlbmNpbE9wU2VwYXJhdGUACANlbnYVZ2xWZXJ0ZXhBdHRyaWJQb2ludGVyABADZW52FWdsVmVydGV4QXR0cmliRGl2aXNvcgADA2VudhlnbEVuYWJsZVZlcnRleEF0dHJpYkFycmF5AAADZW52F2dsRHJhd0VsZW1lbnRzSW5zdGFuY2VkABEDZW52DmdsRHJhd0VsZW1lbnRzAAgDZW52FWdsRHJhd0FycmF5c0luc3RhbmNlZAAIA2VudgxnbERyYXdBcnJheXMACQNlbnYMZ2xSZWFkQnVmZmVyAAADZW52EWdsQmxpdEZyYW1lYnVmZmVyABIDZW52F2dsSW52YWxpZGF0ZUZyYW1lYnVmZmVyAAkDZW52CV9hYm9ydF9qcwACA2VudhVfZW1zY3JpcHRlbl9tZW1jcHlfanMACQNlbnYWZW1zY3JpcHRlbl9yZXNpemVfaGVhcAABA64CrAICAgICAgkCAAABAAYFAAEDBQACAwEICRMEAAAGAgIAAhQFBQUFBQIBBAMBARUFBQUFBQUFBQUFBQUFBQADAwMAAAMBAAIAAgIAAAAAAAAAAgAABQgFAQYFBQQEAQQEBAQEBAQEBAQDAwEDBAMDAQMEAwMBAQMGAQEBAAMBAAMCBAQBBQAAAQAAAAEBAQkJCQICAgICAgICFgoGBgAAAwAGBgYGBgYGBgYLAgICAgEAAAABAgEBAQEBCwICAAEXCwEBAQICAAkAAgICAgICAAAAAAAAAAAAAAAAAAAAAAADAAAABAEBAAMACAEABgYEBggEAwQBBgEBAQEBBAQBAQEBAQEDAAIGBgUAABgEAQYGBAQGBgQEBAQEBQUBAQYAAAUCBQUFBQIBAAEAAQUEBQFwARISBQYBAe4F7gUGqgEZfwFBgIAEC38BQQALfwFBAAt/AUEAC38AQfD4Bgt/AEGr+QYLfwBBivsGC38AQd/7Bgt/AEHj/QYLfwBBqv4GC38AQZGCBwt/AEHHiwcLfwBBho0HC38AQeCSBwt/AEGzlQcLfwBB1poHC38AQeebBwt/AEGznAcLfwBBqaEHC38AQaGiBwt/AEGQpgcLfwBB8PgGC38AQav5Bgt/AEGr+QYLfwBB+qcHCwf4CCgGbWVtb3J5AgARX193YXNtX2NhbGxfY3RvcnMAchlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQASX3NhcHBfZW1zY19vbnBhc3RlAHweX3NhcHBfaHRtbDVfZ2V0X2Fza19sZWF2ZV9zaXRlAIIBFV9zYXBwX2Vtc2NfYmVnaW5fZHJvcACDAQ9fc2FwcF9lbXNjX2Ryb3AAhQETX3NhcHBfZW1zY19lbmRfZHJvcACIARpfc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYgCJARBfX21haW5fYXJnY19hcmd2AIoBBm1hbGxvYwCNAxdfX2VtX2xpYl9kZXBzX3Nva29sX2FwcAMEKl9fZW1fanNfX3NhcHBfanNfYWRkX2JlZm9yZXVubG9hZF9saXN0ZW5lcgMFLV9fZW1fanNfX3NhcHBfanNfcmVtb3ZlX2JlZm9yZXVubG9hZF9saXN0ZW5lcgMGJ19fZW1fanNfX3NhcHBfanNfYWRkX2NsaXBib2FyZF9saXN0ZW5lcgMHKl9fZW1fanNfX3NhcHBfanNfcmVtb3ZlX2NsaXBib2FyZF9saXN0ZW5lcgMIIF9fZW1fanNfX3NhcHBfanNfd3JpdGVfY2xpcGJvYXJkAwkoX19lbV9qc19fc2FwcF9qc19hZGRfZHJhZ25kcm9wX2xpc3RlbmVycwMKIl9fZW1fanNfX3NhcHBfanNfZHJvcHBlZF9maWxlX3NpemUDCyNfX2VtX2pzX19zYXBwX2pzX2ZldGNoX2Ryb3BwZWRfZmlsZQMMK19fZW1fanNfX3NhcHBfanNfcmVtb3ZlX2RyYWduZHJvcF9saXN0ZW5lcnMDDRVfX2VtX2pzX19zYXBwX2pzX2luaXQDDiRfX2VtX2pzX19zYXBwX2pzX3JlcXVlc3RfcG9pbnRlcmxvY2sDDyFfX2VtX2pzX19zYXBwX2pzX2V4aXRfcG9pbnRlcmxvY2sDEBtfX2VtX2pzX19zYXBwX2pzX3NldF9jdXJzb3IDER5fX2VtX2pzX19zYXBwX2pzX2NsZWFyX2Zhdmljb24DEhxfX2VtX2pzX19zYXBwX2pzX3NldF9mYXZpY29uAxMUX19lbV9qc19fc2xvZ19qc19sb2cDFAZmZmx1c2gAmgMVZW1zY3JpcHRlbl9zdGFja19pbml0AJIDGWVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2ZyZWUAkwMZZW1zY3JpcHRlbl9zdGFja19nZXRfYmFzZQCUAxhlbXNjcmlwdGVuX3N0YWNrX2dldF9lbmQAlQMZX2Vtc2NyaXB0ZW5fc3RhY2tfcmVzdG9yZQCbAxdfZW1zY3JpcHRlbl9zdGFja19hbGxvYwCcAxxlbXNjcmlwdGVuX3N0YWNrX2dldF9jdXJyZW50AJ0DE19fc3RhcnRfZW1fbGliX2RlcHMDFRJfX3N0b3BfZW1fbGliX2RlcHMDFg1fX3N0YXJ0X2VtX2pzAxcMX19zdG9wX2VtX2pzAxgJJAEAQQELEXhzdXmKAo0BkQGSAZECkgKTApQClQKWApcCmAKZAgrB0QmsAgUAEJIDC5oCASV/IwAhAEHQASEBIAAgAWshAiACJABBACEDIAIgAzYCDEEMIQQgAiAEaiEFIAUhBkEEIQcgBiAHaiEIQfgAIQlB9KkHIQogCCAKIAkQ9wIaQQwhCyACIAtqIQwgDCENQfwAIQ4gDSAOaiEPQQAhECAPIBA2AgBBDCERIAIgEWohEiAS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kAEgjwE2AoTtB0GCASGRAUEBIZIBQQAhkwFBr4IBIZQBIJEBIJIBIJMBIJQBEMUBCwsgAygCuAEhlQEglQEoAhwhlgFBACGXASCXASCWAUchmAFBASGZASCYASCZAXEhmgECQCCaAUUNACADKAK4ASGbASCbASgCICGcAUEAIZ0BIJwBIJ0BSyGeAUEBIZ8BIJ4BIJ8BcSGgAQJAIKABDQBBggEhoQFBACGiASCiASChATYChO0HQYIBIaMBQQEhpAFBACGlAUGyggEhpgEgowEgpAEgpQEgpgEQxQELC0GgASGnASADIKcBaiGoASCoASGpASCpARDcAkEAIaoBIAMgqgE2ApwBAkADQCADKAKcASGrAUEIIawBIKsBIKwBSSGtAUEBIa4BIK0BIK4BcSGvASCvAUUNASADKAK4ASGwAUHsASGxASCwASCxAWohsgEgAygCnAEhswFB0AEhtAEgswEgtAFsIbUBILIBILUBaiG2ASADILYBNgKYASADKAKYASG3ASC3ASgCACG4AQJAAkAguAENAAwBCyADKAKYASG5ASC5ASgCBCG6AUEAIbsBILoBILsBSyG8AUEBIb0BILwBIL0BcSG+AQJAIL4BDQBBhAEhvwFBACHAASDAASC/ATYChO0HQYQBIcEBQQEhwgFBACHDAUHIggEhxAEgwQEgwgEgwwEgxAEQxQELQQEhxQEgAyDFAToAlwFBACHGASADIMYBNgKQAUEAIccBIAMgxwE2AowBQQAhyAEgAyDIATYCiAECQANAIAMoAogBIckBQRAhygEgyQEgygFJIcsBQQEhzAEgywEgzAFxIc0BIM0BRQ0BIAMoApgBIc4BQRAhzwEgzgEgzwFqIdABIAMoAogBIdEBQQwh0gEg0QEg0gFsIdMBINABINMBaiHUASADINQBNgKEASADKAKEASHVASDVASgCACHWAQJAAkAg1gFFDQAgAy0AlwEh1wFBASHYASDXASDYAXEh2QECQCDZAQ0AQYMBIdoBQQAh2wEg2wEg2gE2AoTtB0GDASHcAUEBId0BQQAh3gFB3YIBId8BINwBIN0BIN4BIN8BEMUBCyADKAKEASHgASDgASgCCCHhAUEAIeIBIOEBIOIBRyHjAUEBIeQBIOMBIOQBcSHlAQJAIOUBDQBBjAEh5gFBACHnASDnASDmATYChO0HQYwB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QCAAKAIUIAAoAhxGDQAgABCaAyABciEBCwJAIAINACAAEJkDCyAAKAI4IgANAAsLEJcDIAEPCwJAAkAgACgCTEEATg0AQQEhAgwBCyAAEJgDRSECCwJAAkACQCAAKAIUIAAoAhxGDQAgAEEAQQAgACgCJBEGABogACgCFA0AQX8hASACRQ0BDAILAkAgACgCBCIBIAAoAggiA0YNACAAIAEgA2usQQEgACgCKBEZABoLQQAhASAAQQA2AhwgAEIANwMQIABCADcCBCACDQELIAAQmQMLIAELBgAgACQACxIBAn8jACAAa0FwcSIBJAAgAQsEACMACwubqAMEAEGAgAQLgOYCQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05MT1dNRU1PUlk6IE5hdGl2ZUFjdGl2aXR5IG9uTG93TWVtb3J5AF9zYXBwX3N0cmNweQBfc2dfc3RyY3B5AEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OREVTVFJPWTogTmF0aXZlQWN0aXZpdHkgb25EZXN0cm95AE51bXBhZE11bHRpcGx5AF9zZ19zbG90X2luZGV4ACgwKSAhPSBzbG90X2luZGV4AF9zZ19wb29sX2FsbG9jX2luZGV4AFdJTjMyX0NSRUFURV9IRUxQRVJfV0lORE9XX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSBoZWxwZXIgd2luZG93AHNhcHBfd2dwdV9nZXRfcmVuZGVyX3ZpZXcAc2FwcF9kM2QxMV9nZXRfcmVuZGVyX3ZpZXcAc2FwcF93Z3B1X2dldF9kZXB0aF9zdGVuY2lsX3ZpZXcAc2FwcF9kM2QxMV9nZXRfZGVwdGhfc3RlbmNpbF92aWV3AHNhcHBfd2dwdV9nZXRfcmVzb2x2ZV92aWV3AHNhcHBfZDNkMTFfZ2V0X3Jlc29sdmVfdmlldwBfc2dfZ2xfZHJhdwBzZ19kcmF3AHNhcHBfZDNkMTFfZ2V0X2RldmljZV9jb250ZXh0AFdJTjMyX0RVTU1ZX0NPTlRFWFRfU0VUX1BJWEVMRk9STUFUX0ZBSUxFRDogZmFpbGVkIHRvIHNldCBwaXhlbCBmb3JtYXQgZm9yIGR1bW15IEdMIGNvbnRleHQAV0lOMzJfQ1JFQVRFX0RVTU1ZX0NPTlRFWFRfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIGR1bW15IEdMIGNvbnRleHQAX3NhcHBfdGltaW5nX3B1dABWQUxJREFURV9TSEFERVJERVNDX1VCX1NURDE0MF9BUlJBWV9UWVBFOiB1bmlmb3JtIGFycmF5cyBvbmx5IGFsbG93ZWQgZm9yIEZMT0FUNCwgSU5UNCwgTUFUNCBpbiBzdGQxNDAgbGF5b3V0AGRzdABJbnNlcnQAVkFMSURBVEVfQVVCX05PX1VCX0FUX1NMT1Q6IHNnX2FwcGx5X3VuaWZvcm1zOiBubyB1bmlmb3JtIGJsb2NrIGRlY2xhcmF0aW9uIGF0IHRoaXMgc2hhZGVyIHN0YWdlIFVCIHNsb3QAVkFMSURBVEVfQVBJUF9TQU1QTEVfQ09VTlQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBNU0FBIHNhbXBsZSBjb3VudCBkb2Vzbid0IG1hdGNoIHJlbmRlciBwYXNzIGF0dGFjaG1lbnQgc2FtcGxlIGNvdW50AFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9JTUFHRV9TQU1QTEVfQ09VTlQ6IHBhc3MgZGVwdGggYXR0YWNobWVudCBzYW1wbGUgY291bnQgbXVzdCBtYXRjaCBjb2xvciBhdHRhY2htZW50IHNhbXBsZSBjb3VudABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfSU1BR0VfU0FNUExFX0NPVU5UUzogYWxsIHBhc3MgYXR0YWNobWVudHMgbXVzdCBoYXZlIHRoZSBzYW1lIHNhbXBsZSBjb3VudABXSU4zMl9EVU1NWV9DT05URVhUX01BS0VfQ1VSUkVOVF9GQUlMRUQ6IGZhaWxlZCB0byBtYWtlIGR1bW15IEdMIGNvbnRleHQgY3VycmVudABfc2dfdW5pZm9ybV9hbGlnbm1lbnQAX3NnX3NoYWRlcl9jb21tb25faW5pdABfc2dfcGlwZWxpbmVfY29tbW9uX2luaXQAc2dfY29tbWl0AF9zZ192YWxpZGF0ZV9zZXRfc2xvdF9iaXQAQXJyb3dSaWdodABBbHRSaWdodABTaGlmdFJpZ2h0AEJyYWNrZXRSaWdodABDb250cm9sUmlnaHQATWV0YVJpZ2h0AEFycm93TGVmdABBbHRMZWZ0AFNoaWZ0TGVmdABCcmFja2V0TGVmdABDb250cm9sTGVmdABNZXRhTGVmdABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9DT0xPUkZPUk1BVF9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmNvbG9yX2Zvcm1hdCB0byBiZSB1bnNldABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9ERVBUSEZPUk1BVF9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmRlcHRoX2Zvcm1hdCB0byBiZSB1bnNldAB1Yl9kZXNjLT5zaXplID09IChzaXplX3QpY3VyX3VuaWZvcm1fb2Zmc2V0AF9zZ19nbF9idWZmZXJfdGFyZ2V0AFdJTjMyX0QzRDExX0dFVF9JRFhHSUZBQ1RPUllfRkFJTEVEOiBjb3VsZCBub3Qgb2J0YWluIElEWEdJRmFjdG9yeSBvYmplY3QAV0lOMzJfRDNEMTFfR0VUX0lEWEdJQURBUFRFUl9GQUlMRUQ6IGNvdWxkIG5vdCBvYnRhaW4gSURYR0lBZGFwdGVyIG9iamVjdABXR1BVX1NXQVBDSEFJTl9DUkVBVEVfU1dBUENIQUlOX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSBzd2FwY2hhaW4gb2JqZWN0AE51bXBhZFN1YnRyYWN0AF9jb2xvcl9idWZmZXJfZmxvYXQAX2NvbG9yX2J1ZmZlcl9oYWxmX2Zsb2F0AFZBTElEQVRFX0FQSVBfQ09MT1JfRk9STUFUOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgY29sb3IgYXR0YWNobWVudCBwaXhlbCBmb3JtYXQgZG9lc24ndCBtYXRjaCBwYXNzIGNvbG9yIGF0dGFjaG1lbnQgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0lNQUdFX0ZPUk1BVDogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgcGl4ZWwgZm9ybWF0IG11c3QgbWF0Y2ggY29sb3IgYXR0YWNobWVudCBwaXhlbCBmb3JtYXQAVkFMSURBVEVfQVBJUF9ERVBUSF9GT1JNQVQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBkZXB0aCBwaXhlbF9mb3JtYXQgZG9lc24ndCBtYXRjaCBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0lNQUdFREVTQ19OT19NU0FBX1JUX1NVUFBPUlQ6IE1TQUEgbm90IHN1cHBvcnRlZCBmb3IgdGhpcyBwaXhlbCBmb3JtYXQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0NPTE9SX0lOVl9QSVhFTEZPUk1BVDogcGFzcyBjb2xvci1hdHRhY2htZW50IGltYWdlcyBtdXN0IGJlIHJlbmRlcmFibGUgY29sb3IgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9JTlZfUElYRUxGT1JNQVQ6IHBhc3MgZGVwdGgtYXR0YWNobWVudCBpbWFnZSBtdXN0IGJlIGRlcHRoIG9yIGRlcHRoLXN0ZW5jaWwgcGl4ZWwgZm9ybWF0AFdJTjMyX1dHTF9TRVRfUElYRUxGT1JNQVRfRkFJTEVEOiBmYWlsZWQgdG8gc2V0IHNlbGVjdGVkIHBpeGVsIGZvcm1hdABXSU4zMl9XR0xfRklORF9QSVhFTEZPUk1BVF9GQUlMRUQ6IGZhaWxlZCB0byBmaW5kIG1hdGNoaW5nIFdHTCBwaXhlbCBmb3JtYXQAVkFMSURBVEVfSU1BR0VERVNDX0RFUFRIXzNEX0lNQUdFOiAzRCBpbWFnZXMgY2Fubm90IGhhdmUgYSBkZXB0aC9zdGVuY2lsIGltYWdlIGZvcm1hdABfc2dfYXR0YWNobWVudHNfYXQAX3NnX3NhbXBsZXJfYXQAX3NnX2J1ZmZlcl9hdABfc2dfc2hhZGVyX2F0AF9zZ19waXBlbGluZV9hdABfc2dfaW1hZ2VfYXQAVkFMSURBVEVfUElQRUxJTkVERVNDX05PX0NPTlRfQVRUUlM6IHNnX3BpcGVsaW5lX2Rlc2MubGF5b3V0LmF0dHJzIGlzIG5vdCBjb250aW51b3VzAE1pbnVzAGF0dHMAQkVHSU5QQVNTX0FUVEFDSE1FTlRfSU5WQUxJRDogc2dfYmVnaW5fcGFzczogYW4gYXR0YWNobWVudCB3YXMgcHJvdmlkZWQgdGhhdCBubyBsb25nZXIgZXhpc3RzAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19OT19DT05UX0NPTE9SX0FUVFM6IGNvbG9yIGF0dGFjaG1lbnRzIG11c3Qgb2NjdXB5IGNvbnRpbnVvdXMgc2xvdHMAVkFMSURBVEVfU0hBREVSREVTQ19OT19DT05UX1VCX01FTUJFUlM6IHVuaWZvcm0gYmxvY2sgbWVtYmVycyBtdXN0IG9jY3VweSBjb250aW51b3VzIHNsb3RzAExJTlVYX0dMWF9MT0FEX0VOVFJZX1BPSU5UU19GQUlMRUQ6IGZhaWxlZCB0byBsb2FkIEdMWCBlbnRyeSBwb2ludHMAX3NnX2xvb2t1cF9hdHRhY2htZW50cwBfc2dfZ2xfZGlzY2FyZF9hdHRhY2htZW50cwBWQUxJREFURV9BUElQX0FUVF9DT1VOVDogc2dfYXBwbHlfcGlwZWxpbmU6IG51bWJlciBvZiBwaXBlbGluZSBjb2xvciBhdHRhY2htZW50cyBkb2Vzbid0IG1hdGNoIG51bWJlciBvZiBwYXNzIGNvbG9yIGF0dGFjaG1lbnRzAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19OT19BVFRBQ0hNRU5UUzogc2dfYXR0YWNobWVudHNfZGVzYyBubyBjb2xvciBvciBkZXB0aC1zdGVuY2lsIGF0dGFjaG1lbnRzAFdHUFVfQVRUQUNITUVOVFNfQ1JFQVRFX1RFWFRVUkVfVklFV19GQUlMRUQ6IHdncHVUZXh0dXJlQ3JlYXRlVmlldygpIGZhaWxlZCBpbiBjcmVhdGUgYXR0YWNobWVudHMAX3NnX3Bhc3NfYWN0aW9uX2RlZmF1bHRzAF9zYXBwX2Rlc2NfZGVmYXVsdHMAX3NnX3BpcGVsaW5lX2Rlc2NfZGVmYXVsdHMAX3NnX2dsX2luaXRfbGltaXRzAF9zZ192YWxpZGF0ZV9zbG90X2JpdHMAX3NnX2dsX2JlZ2luX3Bhc3MAc2dfYmVnaW5fcGFzcwAhX3NnLmN1cl9wYXNzLmluX3Bhc3MAX3NnX2dsX2VuZF9wYXNzAHNnX2VuZF9wYXNzAGF0dHJfbG9jIDwgKEdMaW50KV9zZy5saW1pdHMubWF4X3ZlcnRleF9hdHRycwBwb29sICYmIHBvb2wtPmdlbl9jdHJzAFZBTElEQVRFX0FCTkRfRVhQRUNURURfTk9ORklMVEVSSU5HX1NBTVBMRVI6IHNnX2FwcGx5X2JpbmRpbmdzOiBzaGFkZXIgZXhwZWN0ZWQgU0dfU0FNUExFUlRZUEVfTk9ORklMVEVSSU5HLCBidXQgc2FtcGxlciBoYXMgU0dfRklMVEVSX0xJTkVBUiBmaWx0ZXJzAF9zZ19ub3RpZnlfY29tbWl0X2xpc3RlbmVycwBfc2dfc2V0dXBfY29tbWl0X2xpc3RlbmVycwBfc2dfZGlzY2FyZF9jb21taXRfbGlzdGVuZXJzAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9XR1NMX0dST1VQMV9CSU5ESU5HX0NPTExJU0lPTjogc2FtcGxlciAnd2dzbF9ncm91cDFfYmluZGluZ19uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgYWxsIGltYWdlcywgc2FtcGxlcnMgYW5kIHN0b3JhZ2UgYnVmZmVycwBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfV0dTTF9HUk9VUDFfQklORElOR19DT0xMSVNJT046IHN0b3JhZ2UgYnVmZmVyICd3Z3NsX2dyb3VwMV9iaW5kaW5nX24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyBhbGwgaW1hZ2VzLCBzYW1wbGVycyBhbmQgc3RvcmFnZSBidWZmZXJzAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfV0dTTF9HUk9VUDFfQklORElOR19DT0xMSVNJT046IGltYWdlICd3Z3NsX2dyb3VwMV9iaW5kaW5nX24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyBhbGwgaW1hZ2VzLCBzYW1wbGVycyBhbmQgc3RvcmFnZSBidWZmZXJzAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19NSVBMRVZFTDogcGFzcyBhdHRhY2htZW50IG1pcCBsZXZlbCBpcyBiaWdnZXIgdGhhbiBpbWFnZSBoYXMgbWlwbWFwcwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfTUlQTEVWRUw6IHBhc3MgZGVwdGggYXR0YWNobWVudCBtaXAgbGV2ZWwgaXMgYmlnZ2VyIHRoYW4gaW1hZ2UgaGFzIG1pcG1hcHMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfTUlQTEVWRUw6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IG1pcCBsZXZlbCBpcyBiaWdnZXIgdGhhbiBpbWFnZSBoYXMgbWlwbWFwcwBWQUxJREFURV9TSEFERVJERVNDX05PX1VCX01FTUJFUlM6IEdMIGJhY2tlbmQgcmVxdWlyZXMgdW5pZm9ybSBibG9jayBtZW1iZXIgZGVjbGFyYXRpb25zADAgPT0gX3NnLmNvbW1pdF9saXN0ZW5lcnMuaXRlbXMAMCAhPSBfc2cuY29tbWl0X2xpc3RlbmVycy5pdGVtcwBfc2dfc2V0dXBfcG9vbHMAX3NnX2Rpc2NhcmRfcG9vbHMAMCA9PSBfc2FwcC5kZWZhdWx0X2ljb25fcGl4ZWxzADAgIT0gX3NhcHAuZGVmYXVsdF9pY29uX3BpeGVscwBWQUxJREFURV9TSEFERVJERVNDX1VCX1dHU0xfR1JPVVAwX0JJTkRJTkdfQ09MTElTSU9OOiB1bmlmb3JtIGJsb2NrICd3Z3NsX2dyb3VwMF9iaW5kaW5nX24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyBhbGwgdW5pZm9ybSBibG9ja3MAX3NnX2dsX2FwcGx5X2JpbmRpbmdzAHNnX2FwcGx5X2JpbmRpbmdzAF9zZ192YWxpZGF0ZV9hcHBseV9iaW5kaW5ncwBfc2dfZ2xfY2FjaGVfY2xlYXJfdGV4dHVyZV9zYW1wbGVyX2JpbmRpbmdzAERSQVdfV0lUSE9VVF9CSU5ESU5HUzogYXR0ZW1wdGluZyB0byBkcmF3IHdpdGhvdXQgcmVzb3VyY2UgYmluZGluZ3MATElOVVhfR0xYX05PX0dMWEZCQ09ORklHUzogZ2xYR2V0RkJDb25maWdzKCkgcmV0dXJuZWQgbm8gY29uZmlncwBMSU5VWF9FR0xfTk9fQ09ORklHUzogZWdsQ2hvb3NlQ29uZmlnKCkgcmV0dXJuZWQgbm8gY29uZmlncwBfc2FwcC5kcm9wLm51bV9maWxlcyA8PSBfc2FwcC5kcm9wLm1heF9maWxlcwBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfR0xTTF9CSU5ESU5HX0NPTExJU0lPTjogc3RvcmFnZSBidWZmZXIgJ2dsc2xfYmluZGluZ19uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3Mgc2hhZGVyIHN0YWdlcwB0cmlhbmdsZS12ZXJ0aWNlcwAjY2FudmFzAF9zYXBwX2Ryb3BwZWRfZmlsZV9wYXRoX3B0cgBkZXNjLT5kYXRhLnB0cgBXSU4zMl9XR0xfREVTQ1JJQkVfUElYRUxGT1JNQVRfRkFJTEVEOiBmYWlsZWQgdG8gZ2V0IHBpeGVsIGZvcm1hdCBkZXNjcmlwdG9yAF9zZ19nbF9ibGVuZF9mYWN0b3IAZXJyb3IARW50ZXIAMCA9PSBfc2cuY29tbWl0X2xpc3RlbmVycy51cHBlcgBJREVOVElDQUxfQ09NTUlUX0xJU1RFTkVSOiBhdHRlbXB0aW5nIHRvIGFkZCBpZGVudGljYWwgY29tbWl0IGxpc3RlbmVyAF9zZ19nbF9jYWNoZV9pbnZhbGlkYXRlX3RleHR1cmVfc2FtcGxlcgBfc2dfZ2xfY2FjaGVfYmluZF90ZXh0dXJlX3NhbXBsZXIAX3NnX2dsX2Rpc2NhcmRfc2FtcGxlcgBWQUxJREFURV9TSEFERVJERVNDX0NPTVBBUklTT05fU0FNUExFUl9SRVFVSVJFRDogaW1hZ2Ugc2FtcGxlIHR5cGUgREVQVEggY2FuIG9ubHkgYmUgdXNlZCB3aXRoIENPTVBBUklTT04gc2FtcGxlcgBWQUxJREFURV9TSEFERVJERVNDX05PTkZJTFRFUklOR19TQU1QTEVSX1JFUVVJUkVEOiBpbWFnZSBzYW1wbGUgdHlwZSBVTkZJTFRFUkFCTEVfRkxPQVQsIFVJTlQsIFNJTlQgY2FuIG9ubHkgYmUgdXNlZCB3aXRoIE5PTkZJTFRFUklORyBzYW1wbGVyAHNhcHBfZ2xfZ2V0X2ZyYW1lYnVmZmVyAF9zZ19pbml0X2J1ZmZlcgBfc2FwcF9jbGVhcl9kcm9wX2J1ZmZlcgBfc2dfZ2xfY3JlYXRlX2J1ZmZlcgBzZ19tYWtlX2J1ZmZlcgBfc2dfZ2xfY2FjaGVfYmluZF9zdG9yYWdlX2J1ZmZlcgBfc2dfZ2xfZGlzY2FyZF9idWZmZXIAX3NnX2dsX2NhY2hlX2JpbmRfYnVmZmVyAF9zYXBwLmRyb3AuYnVmZmVyAF9zYXBwLmNsaXBib2FyZC5idWZmZXIAVkFMSURBVEVfQVBQRU5EQlVGX1VTQUdFOiBzZ19hcHBlbmRfYnVmZmVyOiBjYW5ub3QgYXBwZW5kIHRvIGltbXV0YWJsZSBidWZmZXIAVkFMSURBVEVfVVBEQVRFQlVGX1VTQUdFOiBzZ191cGRhdGVfYnVmZmVyOiBjYW5ub3QgdXBkYXRlIGltbXV0YWJsZSBidWZmZXIAVkFMSURBVEVfQUJORF9TVE9SQUdFQlVGRkVSX0JJTkRJTkdfQlVGRkVSVFlQRTogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBib3VuZCBzdG9yYWdlIGJ1ZmZlciBzbG90IGlzIG5vdCBvZiB0eXBlIHN0b3JhZ2UgYnVmZmVyAENMSVBCT0FSRF9TVFJJTkdfVE9PX0JJRzogY2xpcGJvYXJkIHN0cmluZyBkaWRuJ3QgZml0IGludG8gY2xpcGJvYXJkIGJ1ZmZlcgBfc2dfaW5pdF9zaGFkZXIAX3NnX2xvb2t1cF9zaGFkZXIAX3NnX2dsX2NyZWF0ZV9zaGFkZXIAX3NnX2dsX2NvbXBpbGVfc2hhZGVyAHRyaWFuZ2xlX3NoYWRlcgBzZ19tYWtlX3NoYWRlcgBfc2dfZ2xfZGlzY2FyZF9zaGFkZXIAYm5kLT5waXAgJiYgYm5kLT5waXAtPnNoYWRlcgBWQUxJREFURV9QSVBFTElORURFU0NfQVRUUl9TRU1BTlRJQ1M6IEQzRDExIG1pc3NpbmcgdmVydGV4IGF0dHJpYnV0ZSBzZW1hbnRpY3MgaW4gc2hhZGVyAF90ZXh0dXJlX2Zsb2F0X2xpbmVhcgBfc2FwcF9jbGVhcgBfc2dfY2xlYXIAc2dfc2V0dXAAc2FwcABzb2tvbF9hcHAAX3NhcHBfZW1zY19kcm9wAF9zZ19nbF9zdGVuY2lsX29wAF9zZ19nbF9ibGVuZF9vcABzbXAAcGlwAEFycm93VXAAUGFnZVVwAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfU0laRV9JU19aRVJPOiBib3VuZCB1bmlmb3JtIGJsb2NrIHNpemUgY2Fubm90IGJlIHplcm8AaW5mbwBWQUxJREFURV9BQk5EX1ZCX09WRVJGTE9XOiBzZ19hcHBseV9iaW5kaW5nczogYnVmZmVyIGluIHZlcnRleCBidWZmZXIgc2xvdCBpcyBvdmVyZmxvd24AVkFMSURBVEVfQUJORF9JQl9PVkVSRkxPVzogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiBpbmRleCBidWZmZXIgc2xvdCBpcyBvdmVyZmxvd24AQXJyb3dEb3duAFBhZ2VEb3duAFdJTjMyX1dHTF9DUkVBVEVfQ09OVEVYVF9BVFRSSUJTX0ZBSUxFRF9PVEhFUjogQ3JlYXRlQ29udGV4dEF0dHJpYnNBUkIgZmFpbGVkIGZvciBvdGhlciByZWFzb24AU2VtaWNvbG9uAHBvc2l0aW9uAExJTlVYX1gxMV9GQUlMRURfVE9fQkVDT01FX09XTkVSX09GX0NMSVBCT0FSRDogWDExOiBGYWlsZWQgdG8gYmVjb21lIG93bmVyIG9mIGNsaXBib2FyZCBzZWxlY3Rpb24AYWN0aW9uAExJTlVYX0dMWF9RVUVSWV9WRVJTSU9OX0ZBSUxFRDogZmFpbGVkIHRvIHF1ZXJ5IEdMWCB2ZXJzaW9uAF9zYXBwX3NldHVwX2RlZmF1bHRfaWNvbgBzYXBwX3NldF9pY29uAF9zYXBwX2Vtc2Nfc2V0X2ljb24AbWFpbgBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfREVQVEhfU1RFTkNJTF9URVhUVVJFX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSBkZXB0aC1zdGVuY2lsIHRleHR1cmUgZm9yIHN3YXBjaGFpbgBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfTVNBQV9URVhUVVJFX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSBtc2FhIHRleHR1cmUgZm9yIHN3YXBjaGFpbgBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfU1VSRkFDRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgc3VyZmFjZSBmb3Igc3dhcGNoYWluAFByaW50U2NyZWVuADAgPT0gX3NnLmNvbW1pdF9saXN0ZW5lcnMubnVtAF9zZ19pbml0X3Bvb2wAX3NnX2Rpc2NhcmRfcG9vbABDT01NSVRfTElTVEVORVJfQVJSQVlfRlVMTDogY29tbWl0IGxpc3RlbmVyIGFycmF5IGZ1bGwAV0lOMzJfTE9BRF9PUEVOR0wzMl9ETExfRkFJTEVEOiBmYWlsZWQgbG9hZGluZyBvcGVuZ2wzMi5kbGwARXF1YWwATnVtcGFkRGVjaW1hbABDYXBzTG9jawBOdW1Mb2NrAFNjcm9sbExvY2sAT0s6IE9rAEJhY2tzbGFzaABTbGFzaAAvaG9tZS9rb25zdW1lci9Eb2N1bWVudHMvZGV2L3Nva29sLWNhbnZhcy1leGFtcGxlLTExNTQvc29rb2wvc29rb2xfZ2Z4LmgAL2hvbWUva29uc3VtZXIvRG9jdW1lbnRzL2Rldi9zb2tvbC1jYW52YXMtZXhhbXBsZS0xMTU0L3Nva29sL3Nva29sX2FwcC5oAEFORFJPSURfV1JJVEVfTVNHX0ZBSUxFRDogZmFpbGVkIHRvIHdyaXRlIG1lc3NhZ2UgaW4gX3NhcHBfYW5kcm9pZF9tc2cAIXNoZC0+Z2wucHJvZwBMSU5VWF9HTFhfUkVRVUlSRURfRVhURU5TSU9OU19NSVNTSU5HOiBHTFggZXh0ZW5zaW9ucyBBUkJfY3JlYXRlX2NvbnRleHQgYW5kIEFSQl9jcmVhdGVfY29udGV4dF9wcm9maWxlIG1pc3NpbmcAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9TQU1QTEVSX1BBSVJfR0xTTF9OQU1FOiBpbWFnZS1zYW1wbGVyLXBhaXIgJ2dsc2xfbmFtZScgbWlzc2luZwBWQUxJREFURV9TSEFERVJERVNDX1VCX1VOSUZPUk1fR0xTTF9OQU1FOiB1bmlmb3JtIGJsb2NrIG1lbWJlciAnZ2xzbF9uYW1lJyBtaXNzaW5nAHdhcm5pbmcAX3NnX2dsX2NhY2hlX3Jlc3RvcmVfYnVmZmVyX2JpbmRpbmcAX3NnX2dsX2NhY2hlX3N0b3JlX2J1ZmZlcl9iaW5kaW5nAGltZwBMSU5VWF9HTFhfTk9fU1VJVEFCTEVfR0xYRkJDT05GSUc6IGZhaWxlZCB0byBmaW5kIGEgc3VpdGFibGUgR0xYRkJDb25maWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfTEFZRVI6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGlzIGFycmF5IHRleHR1cmUsIGJ1dCBsYXllciBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19MQVlFUjogcGFzcyBhdHRhY2htZW50IGltYWdlIGlzIGFycmF5IHRleHR1cmUsIGJ1dCBsYXllciBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9MQVlFUjogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIGFycmF5IHRleHR1cmUsIGJ1dCBsYXllciBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0ZBQ0U6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGlzIGN1YmVtYXAsIGJ1dCBmYWNlIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0ZBQ0U6IHBhc3MgYXR0YWNobWVudCBpbWFnZSBpcyBjdWJlbWFwLCBidXQgZmFjZSBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9GQUNFOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgaXMgY3ViZW1hcCwgYnV0IGZhY2UgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9TTElDRTogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgaXMgM2QgdGV4dHVyZSwgYnV0IHNsaWNlIHZhbHVlIGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1NMSUNFOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgaXMgM2QgdGV4dHVyZSwgYnV0IHNsaWNlIHZhbHVlIGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX1NMSUNFOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgaXMgM2QgdGV4dHVyZSwgYnV0IHNsaWNlIHZhbHVlIGlzIHRvbyBiaWcAZ2xfYnVmAF9zZ192ZXJ0ZXhmb3JtYXRfYnl0ZXNpemUAX3NnX2dsX3ZlcnRleGZvcm1hdF9zaXplAF9zZ191bmlmb3JtX3NpemUAb2Zmc2V0IDwgX3NhcHAuZHJvcC5idWZfc2l6ZQBWQUxJREFURV9VUERBVEVCVUZfU0laRTogc2dfdXBkYXRlX2J1ZmZlcjogdXBkYXRlIHNpemUgaXMgYmlnZ2VyIHRoYW4gYnVmZmVyIHNpemUAVkFMSURBVEVfQVBQRU5EQlVGX1NJWkU6IHNnX2FwcGVuZF9idWZmZXI6IG92ZXJhbGwgYXBwZW5kZWQgc2l6ZSBpcyBiaWdnZXIgdGhhbiBidWZmZXIgc2l6ZQBWQUxJREFURV9CVUZGRVJERVNDX0RBVEFfU0laRTogaW1tdXRhYmxlIGJ1ZmZlciBkYXRhIHNpemUgZGlmZmVycyBmcm9tIGJ1ZmZlciBzaXplAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfU0laRV9NSVNNQVRDSDogc2l6ZSBvZiB1bmlmb3JtIGJsb2NrIG1lbWJlcnMgZG9lc24ndCBtYXRjaCB1bmlmb3JtIGJsb2NrIHNpemUAVkFMSURBVEVfQVVCX1NJWkU6IHNnX2FwcGx5X3VuaWZvcm1zOiBkYXRhIHNpemUgZG9lc24ndCBtYXRjaCBkZWNsYXJlZCB1bmlmb3JtIGJsb2NrIHNpemUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFX1NJWkVTOiBhbGwgcGFzcyBhdHRhY2htZW50cyBtdXN0IGhhdmUgdGhlIHNhbWUgc2l6ZQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9JTUFHRV9TSVpFUzogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgc2l6ZSBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgaW1hZ2Ugc2l6ZQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU1BR0VfU0laRVM6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBzaXplIG11c3QgbWF0Y2ggY29sb3IgYXR0YWNobWVudCBpbWFnZSBzaXplAFZBTElEQVRFX0lNQUdFREFUQV9EQVRBX1NJWkU6IHNnX2ltYWdlX2RhdGE6IGRhdGEgc2l6ZSBkb2Vzbid0IG1hdGNoIGV4cGVjdGVkIHN1cmZhY2Ugc2l6ZQBWQUxJREFURV9CRUdJTlBBU1NfQVRUQUNITUVOVFNfRVhJU1RTOiBzZ19iZWdpbl9wYXNzOiBhdHRhY2htZW50cyBvYmplY3Qgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FQSVBfU0hBREVSX0VYSVNUUzogc2dfYXBwbHlfcGlwZWxpbmU6IHNoYWRlciBvYmplY3Qgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfUElQRUxJTkVfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogY3VycmVudGx5IGFwcGxpZWQgcGlwZWxpbmUgb2JqZWN0IG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BUElQX1BJUEVMSU5FX0VYSVNUUzogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIG9iamVjdCBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQVBJUF9DVVJQQVNTX0FUVEFDSE1FTlRTX0VYSVNUUzogc2dfYXBwbHlfcGlwZWxpbmU6IGN1cnJlbnQgcGFzcyBhdHRhY2htZW50cyBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9TTVBfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogYm91bmQgc2FtcGxlciBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9WQl9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiB2ZXJ0ZXggYnVmZmVyIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX0lCX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGluZGV4IGJ1ZmZlciBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9TVE9SQUdFQlVGRkVSX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGJvdW5kIHN0b3JhZ2UgYnVmZmVyIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX0lNR19FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBib3VuZCBpbWFnZSBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0VfTk9fUlQ6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGltYWdlIG11c3QgaGF2ZSByZW5kZXJfdGFyZ2V0PXRydWUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFX05PX1JUOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgbXVzdCBiZSBoYXZlIHJlbmRlcl90YXJnZXQ9dHJ1ZQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU1BR0VfTk9fUlQ6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBtdXN0IGJlIGhhdmUgcmVuZGVyX3RhcmdldD10cnVlAF9zYXBwX3JpbmdfZW5xdWV1ZQBfc2FwcF9yaW5nX2RlcXVldWUAcG9vbC0+ZnJlZV9xdWV1ZQBXSU4zMl9HRVRfUElYRUxGT1JNQVRfQVRUUklCX0ZBSUxFRDogZmFpbGVkIHRvIGdldCBXR0wgcGl4ZWwgZm9ybWF0IGF0dHJpYnV0ZQBCYWNrcXVvdGUAUXVvdGUARGVsZXRlAF9zYXBwX2luaXRfc3RhdGUAX3NhcHBfZGlzY2FyZF9zdGF0ZQBWQUxJREFURV9BUElQX1NIQURFUl9WQUxJRDogc2dfYXBwbHlfcGlwZWxpbmU6IHNoYWRlciBvYmplY3Qgbm90IGluIHZhbGlkIHN0YXRlAFZBTElEQVRFX0FCTkRfUElQRUxJTkVfVkFMSUQ6IHNnX2FwcGx5X2JpbmRpbmdzOiBjdXJyZW50bHkgYXBwbGllZCBwaXBlbGluZSBvYmplY3Qgbm90IGluIHZhbGlkIHN0YXRlAFZBTElEQVRFX0FQSVBfUElQRUxJTkVfVkFMSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBvYmplY3Qgbm90IGluIHZhbGlkIHN0YXRlAFZBTElEQVRFX0FQSVBfQ1VSUEFTU19BVFRBQ0hNRU5UU19WQUxJRDogc2dfYXBwbHlfcGlwZWxpbmU6IGN1cnJlbnQgcGFzcyBhdHRhY2htZW50cyBub3QgaW4gdmFsaWQgc3RhdGUAREVBTExPQ19TQU1QTEVSX0lOVkFMSURfU1RBVEU6IHNnX2RlYWxsb2Nfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gYWxsb2Mgc3RhdGUAREVBTExPQ19JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gYWxsb2Mgc3RhdGUAVU5JTklUX0FUVEFDSE1FTlRTX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9hdHRhY2htZW50cygpOiBhdHRhY2htZW50cyBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfU0FNUExFUl9JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAFVOSU5JVF9CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X2J1ZmZlcigpOiBidWZmZXIgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX1NIQURFUl9JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfc2hhZGVyKCk6IHNoYWRlciBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfUElQRUxJTkVfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAFVOSU5JVF9JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfaW1hZ2UoKTogaW1hZ2UgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUARkFJTF9BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ19mYWlsX2F0dGFjaG1lbnRzKCk6IGF0dGFjaG1lbnRzIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX2F0dGFjaG1lbnRzKCk6IGF0dGFjaG1lbnRzIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ19pbml0X2F0dGFjaG1lbnRzKCk6IHBhc3MgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX1NBTVBMRVJfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9zYW1wbGVyKCk6IHNhbXBsZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX1NBTVBMRVJfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9zYW1wbGVyKCk6IHNhbXBsZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX0JVRkZFUl9JTlZBTElEX1NUQVRFOiBzZ19pbml0X2J1ZmZlcigpOiBidWZmZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX0JVRkZFUl9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX2J1ZmZlcigpOiBidWZmZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBERUFMTE9DX0JVRkZFUl9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX2J1ZmZlcigpOiBidWZmZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX1NIQURFUl9JTlZBTElEX1NUQVRFOiBzZ19pbml0X3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX1NIQURFUl9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBERUFMTE9DX1NIQURFUl9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfcGlwZWxpbmUoKTogcGlwZWxpbmUgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfcGlwZWxpbmUoKTogcGlwZWxpbmUgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBERUFMTE9DX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX2RlYWxsb2NfcGlwZWxpbmUoKTogcGlwZWxpbmUgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX0lNQUdFX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfaW1hZ2UoKTogaW1hZ2UgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX0lNQUdFX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfaW1hZ2UoKTogaW1hZ2UgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlNBVkVJTlNUQU5DRVNUQVRFOiBOYXRpdmVBY3Rpdml0eSBvblNhdmVJbnN0YW5jZVN0YXRlAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OQ1JFQVRFOiBOYXRpdmVBY3Rpdml0eSBvbkNyZWF0ZQBfc2FwcF9pbWFnZV92YWxpZGF0ZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlBBVVNFOiBOYXRpdmVBY3Rpdml0eSBvblBhdXNlAHNhcHBfbWV0YWxfZ2V0X21zYWFfY29sb3JfdGV4dHVyZQBzYXBwX21ldGFsX2dldF9kZXB0aF9zdGVuY2lsX3RleHR1cmUAX3NnX2dsX2NhY2hlX2FjdGl2ZV90ZXh0dXJlAFdHUFVfU1dBUENIQUlOX0NSRUFURV9ERVBUSF9TVEVOQ0lMX1ZJRVdfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIHZpZXcgb2JqZWN0IGZvciBzd2FwY2hhaW4gZGVwdGgtc3RlbmNpbCB0ZXh0dXJlAFdHUFVfU1dBUENIQUlOX0NSRUFURV9NU0FBX1ZJRVdfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIHZpZXcgb2JqZWN0IGZvciBzd2FwY2hhaW4gbXNhYSB0ZXh0dXJlAF9zZ19nbF9pbmRleF90eXBlAF9zZ19nbF92ZXJ0ZXhmb3JtYXRfdHlwZQBfc2dfZ2xfcHJpbWl0aXZlX3R5cGUAQU5EUk9JRF9DUkVBVEVfVEhSRUFEX1BJUEVfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHRocmVhZCBwaXBlAEVzY2FwZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9ET05FOiBOYXRpdmVBY3Rpdml0eSBkb25lAEFORFJPSURfTE9PUF9USFJFQURfRE9ORTogbG9vcCB0aHJlYWQgZG9uZQBfc2dfZ2xfYXBwbHlfcGlwZWxpbmUAVkFMSURBVEVfQUJORF9QSVBFTElORTogc2dfYXBwbHlfYmluZGluZ3M6IG11c3QgYmUgY2FsbGVkIGFmdGVyIHNnX2FwcGx5X3BpcGVsaW5lAF9zZ192YWxpZGF0ZV9hcHBseV9waXBlbGluZQBfc2dfaW5pdF9waXBlbGluZQBfc2cuZ2wuY2FjaGUuY3VyX3BpcGVsaW5lAF9zZ19sb29rdXBfcGlwZWxpbmUAX3NnX2dsX2NyZWF0ZV9waXBlbGluZQBzZ19tYWtlX3BpcGVsaW5lAF9zZ19nbF9kaXNjYXJkX3BpcGVsaW5lAHRyaWFuZ2xlLXBpcGVsaW5lAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OUkVTVU1FOiBOYXRpdmVBY3Rpdml0eSBvblJlc3VtZQBIb21lAFZBTElEQVRFX0FQUEVOREJVRl9VUERBVEU6IHNnX2FwcGVuZF9idWZmZXI6IGNhbm5vdCBjYWxsIHNnX2FwcGVuZF9idWZmZXIgYW5kIHNnX3VwZGF0ZV9idWZmZXIgaW4gc2FtZSBmcmFtZQBWQUxJREFURV9VUERBVEVCVUZfQVBQRU5EOiBzZ191cGRhdGVfYnVmZmVyOiBjYW5ub3QgY2FsbCBzZ191cGRhdGVfYnVmZmVyIGFuZCBzZ19hcHBlbmRfYnVmZmVyIGluIHNhbWUgZnJhbWUAVkFMSURBVEVfVVBEQVRFQlVGX09OQ0U6IHNnX3VwZGF0ZV9idWZmZXI6IG9ubHkgb25lIHVwZGF0ZSBhbGxvd2VkIHBlciBidWZmZXIgYW5kIGZyYW1lAFZBTElEQVRFX1VQRElNR19PTkNFOiBzZ191cGRhdGVfaW1hZ2U6IG9ubHkgb25lIHVwZGF0ZSBhbGxvd2VkIHBlciBpbWFnZSBhbmQgZnJhbWUAdV9kZXNjLT5nbHNsX25hbWUAaW1nX3NtcF9kZXNjLT5nbHNsX25hbWUAc2FwcF9tZXRhbF9nZXRfY3VycmVudF9kcmF3YWJsZQBWQUxJREFURV9JTUFHRURFU0NfQ09NUFJFU1NFRF9JTU1VVEFCTEU6IGNvbXByZXNzZWQgaW1hZ2VzIG11c3QgYmUgaW1tdXRhYmxlAF9zZ19nbF9yZXNldF9zdGF0ZV9jYWNoZQBfc2dfZ2xfc2hhZGVyX3N0YWdlAGRlc2MtPnNhbXBsZXJzW3NyYy0+c2FtcGxlcl9zbG90XS5zdGFnZSA9PSBzcmMtPnN0YWdlAGRlc2MtPmltYWdlc1tzcmMtPmltYWdlX3Nsb3RdLnN0YWdlID09IHNyYy0+c3RhZ2UAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9TQU1QTEVSX1BBSVJfU0FNUExFUl9TVEFHRV9NSVNNQVRDSDogaW1hZ2Utc2FtcGxlci1wYWlyIHN0YWdlIGRvZXNuJ3QgbWF0Y2ggcmVmZXJlbmNlZCBzYW1wbGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfTUVUQUxfQlVGRkVSX1NMT1RfQ09MTElTSU9OOiB1bmlmb3JtIGJsb2NrICdtc2xfYnVmZmVyX24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyB1bmlmb3JtIGJsb2NrcyBhbmQgc3RvcmFnZSBidWZmZXJzIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfSExTTF9SRUdJU1RFUl9UX0NPTExJU0lPTjogaW1hZ2UgJ2hsc2xfcmVnaXN0ZXJfdF9uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgaW1hZ2VzIGFuZCBzdG9yYWdlIGJ1ZmZlcnMgaW4gc2FtZSBzaGFkZXIgc3RhZ2UAVkFMSURBVEVfU0hBREVSREVTQ19VQl9ITFNMX1JFR0lTVEVSX0JfQ09MTElTSU9OOiB1bmlmb3JtIGJsb2NrICdobHNsX3JlZ2lzdGVyX2JfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIHVuaWZvcm0gYmxvY2tzIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9ITFNMX1JFR0lTVEVSX1RfQ09MTElTSU9OOiBzdG9yYWdlX2J1ZmZlciAnaGxzbF9yZWdpc3Rlcl90X24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyBzdG9yYWdlIGJ1ZmZlcnMgYW5kIGltYWdlcyBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfTUVUQUxfQlVGRkVSX1NMT1RfQ09MTElTSU9OOiBzdG9yYWdlIGJ1ZmZlciAnbXNsX2J1ZmZlcl9uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgdW5pZm9ybSBibG9ja3MgYW5kIHN0b3JhZ2UgYnVmZmVyIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9ITFNMX1JFR0lTVEVSX1NfQ09MTElTSU9OOiBzYW1wbGVyICdobHNsX3JlZ2lzdGVyX3NfbicgbXVzdCBiZSB1bmlxdWUgaW4gc2FtZSBzaGFkZXIgc3RhZ2UAVkFMSURBVEVfU0hBREVSREVTQ19TQU1QTEVSX01FVEFMX1NBTVBMRVJfU0xPVF9DT0xMSVNJT046IHNhbXBsZXIgJ21zbF9zYW1wbGVyX24nIG11c3QgYmUgdW5pcXVlIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfTUVUQUxfVEVYVFVSRV9TTE9UX0NPTExJU0lPTjogaW1hZ2UgJ21zbF90ZXh0dXJlX24nIG11c3QgYmUgdW5pcXVlIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX0lNQUdFX1NUQUdFX01JU01BVENIOiBpbWFnZS1zYW1wbGVyLXBhaXIgc3RhZ2UgZG9lc24ndCBtYXRjaCByZWZlcmVuY2VkIGltYWdlIHN0YWdlAF9zZ19nbF91c2FnZQBfc2dfZ2xfYXR0YWNobWVudHNfZHNfaW1hZ2UAX3NnX2dsX2F0dGFjaG1lbnRzX2NvbG9yX2ltYWdlAF9zZ19nbF9hdHRhY2htZW50c19yZXNvbHZlX2ltYWdlAF9zZ19nbF9kaXNjYXJkX2ltYWdlAFZBTElEQVRFX0lNQUdFREVTQ19OT05SVF9QSVhFTEZPUk1BVDogaW52YWxpZCBwaXhlbCBmb3JtYXQgZm9yIG5vbi1yZW5kZXItdGFyZ2V0IGltYWdlAFZBTElEQVRFX0lNQUdFREVTQ19SVF9QSVhFTEZPUk1BVDogaW52YWxpZCBwaXhlbCBmb3JtYXQgZm9yIHJlbmRlci10YXJnZXQgaW1hZ2UAVkFMSURBVEVfVVBESU1HX1VTQUdFOiBzZ191cGRhdGVfaW1hZ2U6IGNhbm5vdCB1cGRhdGUgaW1tdXRhYmxlIGltYWdlAE51bXBhZERpdmlkZQBXR1BVX0NSRUFURV9JTlNUQU5DRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgaW5zdGFuY2UAc2FwcF93Z3B1X2dldF9kZXZpY2UAc2FwcF9tZXRhbF9nZXRfZGV2aWNlAHNhcHBfZDNkMTFfZ2V0X2RldmljZQBCYWNrc3BhY2UAU3BhY2UAV0lOMzJfRDNEMTFfUVVFUllfSU5URVJGQUNFX0lEWEdJREVWSUNFMV9GQUlMRUQ6IGNvdWxkIG5vdCBvYnRhaW4gSURYR0lEZXZpY2UxIGludGVyZmFjZQBQZXJpb2QATElOVVhfR0xYX0VYVEVOU0lPTl9OT1RfRk9VTkQ6IEdMWCBleHRlbnNpb24gbm90IGZvdW5kAF9mbG9hdF9ibGVuZABzZ19xdWVyeV9iYWNrZW5kAF9zZ19nbF9zZXR1cF9iYWNrZW5kAF9zZ19nbF9kaXNjYXJkX2JhY2tlbmQAZHN0ID09IGRzdF9lbmQAZHN0IDwgZHN0X2VuZABibmQARW5kAFZBTElEQVRFX0FCTkRfRVhQRUNURURfU0FNUExFUl9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogc2FtcGxlciBiaW5kaW5nIGlzIG1pc3Npbmcgb3IgdGhlIHNhbXBsZXIgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9WQjogc2dfYXBwbHlfYmluZGluZ3M6IHZlcnRleCBidWZmZXIgYmluZGluZyBpcyBtaXNzaW5nIG9yIGJ1ZmZlciBoYW5kbGUgaXMgaW52YWxpZABWQUxJREFURV9BQk5EX0VYUEVDVEVEX1NUT1JBR0VCVUZGRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHN0b3JhZ2UgYnVmZmVyIGJpbmRpbmcgaXMgbWlzc2luZyBvciB0aGUgYnVmZmVyIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX0FCTkRfRVhQRUNURURfSU1BR0VfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IGltYWdlIGJpbmRpbmcgaXMgbWlzc2luZyBvciB0aGUgaW1hZ2UgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfUElQRUxJTkVERVNDX1NIQURFUjogc2dfcGlwZWxpbmVfZGVzYy5zaGFkZXIgbWlzc2luZyBvciBpbnZhbGlkACFfc2cuY3VyX3Bhc3MudmFsaWQAX3NhcHAudmFsaWQAX3NnLmdsLnZhbGlkAF9zZy52YWxpZABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfSU1BR0U6IHBhc3MgYXR0YWNobWVudCBpbWFnZSBpcyBub3QgdmFsaWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgaXMgbm90IHZhbGlkAFZBTElEQVRFX0JFR0lOUEFTU19DT0xPUl9BVFRBQ0hNRU5UX0lNQUdFOiBzZ19iZWdpbl9wYXNzOiBvbmUgb3IgbW9yZSBjb2xvciBhdHRhY2htZW50IGltYWdlcyBhcmUgbm90IHZhbGlkAFZBTElEQVRFX0JFR0lOUEFTU19ERVBUSFNURU5DSUxfQVRUQUNITUVOVF9JTUFHRTogc2dfYmVnaW5fcGFzczogb25lIG9yIG1vcmUgZGVwdGgtc3RlbmNpbCBhdHRhY2htZW50IGltYWdlcyBhcmUgbm90IHZhbGlkAFZBTElEQVRFX0JFR0lOUEFTU19SRVNPTFZFX0FUVEFDSE1FTlRfSU1BR0U6IHNnX2JlZ2luX3Bhc3M6IG9uZSBvciBtb3JlIHJlc29sdmUgYXR0YWNobWVudCBpbWFnZXMgYXJlIG5vdCB2YWxpZABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9JTUFHRTogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgaW1hZ2Ugbm90IHZhbGlkAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0NPTE9SRk9STUFUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5jb2xvcl9mb3JtYXQgdG8gYmUgdmFsaWQAZGVzYy0+c2hhZGVyLmlkID09IHNoZC0+c2xvdC5pZABhdHRzLT5zbG90LmlkID09IF9zZy5jdXJfcGFzcy5hdHRzX2lkLmlkAGJuZC0+cGlwLT5zaGFkZXItPnNsb3QuaWQgPT0gYm5kLT5waXAtPmNtbi5zaGFkZXJfaWQuaWQAc2hkAFZBTElEQVRFX0JFR0lOUEFTU19DQU5BUlk6IHNnX2JlZ2luX3Bhc3M6IHBhc3Mgc3RydWN0IG5vdCBpbml0aWFsaXplZABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfQ0FOQVJZOiBzZ19hdHRhY2htZW50c19kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9TQU1QTEVSREVTQ19DQU5BUlk6IHNnX3NhbXBsZXJfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfQlVGRkVSREVTQ19DQU5BUlk6IHNnX2J1ZmZlcl9kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9TSEFERVJERVNDX0NBTkFSWTogc2dfc2hhZGVyX2Rlc2Mgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX1BJUEVMSU5FREVTQ19DQU5BUlk6IHNnX3BpcGVsaW5lX2Rlc2Mgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX0lNQUdFREVTQ19DQU5BUlk6IHNnX2ltYWdlX2Rlc2Mgbm90IGluaXRpYWxpemVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OTkFUSVZFV0lORE9XREVTVFJPWUVEOiBOYXRpdmVBY3Rpdml0eSBvbk5hdGl2ZVdpbmRvd0Rlc3Ryb3llZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTklOUFVUUVVFVUVERVNUUk9ZRUQ6IE5hdGl2ZUFjdGl2aXR5IG9uSW5wdXRRdWV1ZURlc3Ryb3llZABBTkRST0lEX1VOS05PV05fTVNHOiB1bmtub3duIG1zZyB0eXBlIHJlY2VpdmVkAFBBU1NfUE9PTF9FWEhBVVNURUQ6IHBhc3MgcG9vbCBleGhhdXN0ZWQAU0FNUExFUl9QT09MX0VYSEFVU1RFRDogc2FtcGxlciBwb29sIGV4aGF1c3RlZABCVUZGRVJfUE9PTF9FWEhBVVNURUQ6IGJ1ZmZlciBwb29sIGV4aGF1c3RlZABTSEFERVJfUE9PTF9FWEhBVVNURUQ6IHNoYWRlciBwb29sIGV4aGF1c3RlZABQSVBFTElORV9QT09MX0VYSEFVU1RFRDogcGlwZWxpbmUgcG9vbCBleGhhdXN0ZWQASU1BR0VfUE9PTF9FWEhBVVNURUQ6IGltYWdlIHBvb2wgZXhoYXVzdGVkAEFORFJPSURfTE9PUF9USFJFQURfU1RBUlRFRDogbG9vcCB0aHJlYWQgc3RhcnRlZABWQUxJREFURV9BQk5EX0VYUEVDVEVEX0RFUFRIX0lNQUdFOiBzZ19hcHBseV9iaW5kaW5nczogZGVwdGggaW1hZ2UgZXhwZWN0ZWQAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9GSUxURVJBQkxFX0lNQUdFOiBzZ19hcHBseV9iaW5kaW5nczogZmlsdGVyYWJsZSBpbWFnZSBleHBlY3RlZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9DUkVBVEVfU1VDQ0VTUzogTmF0aXZlQWN0aXZpdHkgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05OQVRJVkVXSU5ET1dDUkVBVEVEOiBOYXRpdmVBY3Rpdml0eSBvbk5hdGl2ZVdpbmRvd0NyZWF0ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05JTlBVVFFVRVVFQ1JFQVRFRDogTmF0aXZlQWN0aXZpdHkgb25JbnB1dFF1ZXVlQ3JlYXRlZABXSU4zMl9XR0xfQVJCX0NSRUFURV9DT05URVhUX1JFUVVJUkVEOiBBUkJfY3JlYXRlX2NvbnRleHQgcmVxdWlyZWQAV0lOMzJfV0dMX0FSQl9DUkVBVEVfQ09OVEVYVF9QUk9GSUxFX1JFUVVJUkVEOiBBUkJfY3JlYXRlX2NvbnRleHRfcHJvZmlsZSByZXF1aXJlZABWQUxJREFURV9TSEFERVJERVNDX1NPVVJDRV9PUl9CWVRFQ09ERTogc2hhZGVyIHNvdXJjZSBvciBieXRlIGNvZGUgcmVxdWlyZWQAVkFMSURBVEVfU0hBREVSREVTQ19CWVRFQ09ERTogc2hhZGVyIGJ5dGUgY29kZSByZXF1aXJlZABWQUxJREFURV9TSEFERVJERVNDX1NPVVJDRTogc2hhZGVyIHNvdXJjZSBjb2RlIHJlcXVpcmVkAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fQllURUNPREVfU0laRTogc2hhZGVyIGJ5dGUgY29kZSBsZW5ndGggKGluIGJ5dGVzKSByZXF1aXJlZABUUkFDRV9IT09LU19OT1RfRU5BQkxFRDogc2dfaW5zdGFsbF90cmFjZV9ob29rcygpIGNhbGxlZCwgYnV0IFNPS09MX1RSQUNFX0hPT0tTIGlzIG5vdCBkZWZpbmVkAFZBTElEQVRFX0lNQUdFREVTQ19NU0FBX0JVVF9OT19SVDogbm9uLXJlbmRlci10YXJnZXQgaW1hZ2VzIGNhbm5vdCBiZSBtdWx0aXNhbXBsZWQAVkFMSURBVElPTl9GQUlMRUQ6IHZhbGlkYXRpb24gbGF5ZXIgY2hlY2tzIGZhaWxlZABXR1BVX0NSRUFURUJJTkRHUk9VUF9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVCaW5kR3JvdXAgZmFpbGVkAE1BTExPQ19GQUlMRUQ6IG1lbW9yeSBhbGxvY2F0aW9uIGZhaWxlZABMSU5VWF9HTFhfR0VUX1ZJU1VBTF9GUk9NX0ZCQ09ORklHX0ZBSUxFRDogZ2xYR2V0VmlzdWFsRnJvbUZCQ29uZmlnIGZhaWxlZABXR1BVX1NIQURFUl9DUkVBVEVfQklOREdST1VQX0xBWU9VVF9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVCaW5kR3JvdXBMYXlvdXQoKSBmb3Igc2hhZGVyIHN0YWdlIGZhaWxlZABMSU5VWF9FR0xfTk9fTkFUSVZFX1ZJU1VBTDogZWdsR2V0Q29uZmlnQXR0cmliKCkgZm9yIEVHTF9OQVRJVkVfVklTVUFMX0lEIGZhaWxlZABMSU5VWF9FR0xfQklORF9PUEVOR0xfRVNfQVBJX0ZBSUxFRDogZWdsQmluZEFQSShFR0xfT1BFTkdMX0VTX0FQSSkgZmFpbGVkAExJTlVYX0VHTF9CSU5EX09QRU5HTF9BUElfRkFJTEVEOiBlZ2xCaW5kQVBJKEVHTF9PUEVOR0xfQVBJKSBmYWlsZWQATElOVVhfRUdMX0dFVF9ESVNQTEFZX0ZBSUxFRDogZWdsR2V0RGlzcGxheSgpIGZhaWxlZABMSU5VWF9YMTFfT1BFTl9ESVNQTEFZX0ZBSUxFRDogWE9wZW5EaXNwbGF5KCkgZmFpbGVkAExJTlVYX0dMWF9DUkVBVEVfV0lORE9XX0ZBSUxFRDogZ2xYQ3JlYXRlV2luZG93KCkgZmFpbGVkAExJTlVYX1gxMV9DUkVBVEVfV0lORE9XX0ZBSUxFRDogWENyZWF0ZVdpbmRvdygpIGZhaWxlZABXR1BVX0NSRUFURV9URVhUVVJFX1ZJRVdfRkFJTEVEOiB3Z3B1VGV4dHVyZUNyZWF0ZVZpZXcoKSBmYWlsZWQATElOVVhfRUdMX0NSRUFURV9DT05URVhUX0ZBSUxFRDogZWdsQ3JlYXRlQ29udGV4dCgpIGZhaWxlZABXR1BVX0NSRUFURV9QSVBFTElORV9MQVlPVVRfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlUGlwZWxpbmVMYXlvdXQoKSBmYWlsZWQATElOVVhfRUdMX01BS0VfQ1VSUkVOVF9GQUlMRUQ6IGVnbE1ha2VDdXJyZW50KCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1NBTVBMRVJfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlU2FtcGxlcigpIGZhaWxlZABXR1BVX0NSRUFURV9CVUZGRVJfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlQnVmZmVyKCkgZmFpbGVkAExJTlVYX0VHTF9HRVRfVklTVUFMX0lORk9fRkFJTEVEOiBYR2V0VmlzdWFsSW5mbygpIGZhaWxlZABMSU5VWF9FR0xfSU5JVElBTElaRV9GQUlMRUQ6IGVnbEluaXRpYWxpemUoKSBmYWlsZWQAV0dQVV9DUkVBVEVfVEVYVFVSRV9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVUZXh0dXJlKCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1JFTkRFUl9QSVBFTElORV9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVSZW5kZXJQaXBlbGluZSgpIGZhaWxlZABXR1BVX0NSRUFURV9TSEFERVJfTU9EVUxFX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVNoYWRlck1vZHVsZSgpIGZhaWxlZABMSU5VWF9FR0xfQ1JFQVRFX1dJTkRPV19TVVJGQUNFX0ZBSUxFRDogZWdsQ3JlYXRlV2luZG93U3VyZmFjZSgpIGZhaWxlZABXSU4zMl9HRVRfUkFXX0lOUFVUX0RBVEFfRkFJTEVEOiBHZXRSYXdJbnB1dERhdGEoKSBmYWlsZWQAX3NhcHBfZW1zY19zaXplX2NoYW5nZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05XSU5ET1dGT0NVU0NIQU5HRUQ6IE5hdGl2ZUFjdGl2aXR5IG9uV2luZG93Rm9jdXNDaGFuZ2VkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OQ09ORklHVVJBVElPTkNIQU5HRUQ6IE5hdGl2ZUFjdGl2aXR5IG9uQ29uZmlndXJhdGlvbkNoYW5nZWQAVkFMSURBVEVfQUJORF9JQjogc2dfYXBwbHlfYmluZGluZ3M6IHBpcGVsaW5lIG9iamVjdCBkZWZpbmVzIG5vbi1pbmRleGVkIHJlbmRlcmluZywgYnV0IGluZGV4IGJ1ZmZlciBwcm92aWRlZABWQUxJREFURV9BQk5EX05PX0lCOiBzZ19hcHBseV9iaW5kaW5nczogcGlwZWxpbmUgb2JqZWN0IGRlZmluZXMgaW5kZXhlZCByZW5kZXJpbmcsIGJ1dCBubyBpbmRleCBidWZmZXIgcHJvdmlkZWQAVkFMSURBVEVfQVBJUF9QSVBFTElORV9WQUxJRF9JRDogc2dfYXBwbHlfcGlwZWxpbmU6IGludmFsaWQgcGlwZWxpbmUgaWQgcHJvdmlkZWQATnVtcGFkQWRkAF9jb21wcmVzc2VkX3RleHR1cmVfYXN0YwBfdGV4dHVyZV9jb21wcmVzc2lvbl9wdnJ0YwBXRUJLSVRfV0VCR0xfY29tcHJlc3NlZF90ZXh0dXJlX3B2cnRjAF90ZXh0dXJlX2NvbXByZXNzaW9uX2JwdGMAX3RleHR1cmVfY29tcHJlc3Npb25fcmd0YwBfY29tcHJlc3NlZF90ZXh0dXJlX2V0YwBfdGV4dHVyZV9jb21wcmVzc2lvbl9zM3RjAF9jb21wcmVzc2VkX3RleHR1cmVfczN0YwBfc2dfdmFsaWRhdGVfYnVmZmVyX2Rlc2MAX3NnX3ZhbGlkYXRlX3NoYWRlcl9kZXNjAF9zYXBwX3ZhbGlkYXRlX2ljb25fZGVzYwBfc2dfdmFsaWRhdGVfcGlwZWxpbmVfZGVzYwBWQUxJREFURV9BQk5EX0lNQUdFX1RZUEVfTUlTTUFUQ0g6IHNnX2FwcGx5X2JpbmRpbmdzOiB0eXBlIG9mIGJvdW5kIGltYWdlIGRvZXNuJ3QgbWF0Y2ggc2hhZGVyIGRlc2MAYnVmICYmIGRlc2MAcGlwICYmIHNoZCAmJiBkZXNjAHNyYwBfc2FwcF9tYWxsb2MAX3NnX21hbGxvYwBfc2dfc2xvdF9hbGxvYwBfc2dfZ2xfY29tcGFyZV9mdW5jAF90ZXh0dXJlX2ZpbHRlcl9hbmlzb3Ryb3BpYwBwYW5pYwB2YgBhdHRzLT5nbC5mYgBUYWIAVkFMSURBVEVfQlVGRkVSREVTQ19OT19EQVRBOiBkeW5hbWljL3N0cmVhbSB1c2FnZSBidWZmZXJzIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEAVkFMSURBVEVfSU1BR0VERVNDX0lOSkVDVEVEX05PX0RBVEE6IGltYWdlcyB3aXRoIGluamVjdGVkIHRleHR1cmVzIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEAVkFMSURBVEVfSU1BR0VERVNDX1JUX05PX0RBVEE6IHJlbmRlciB0YXJnZXQgaW1hZ2VzIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEAVkFMSURBVEVfSU1BR0VERVNDX0RZTkFNSUNfTk9fREFUQTogZHluYW1pYy9zdHJlYW0gaW1hZ2VzIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEAQ29tbWEAZGVzYy0+Z2xfYnVmZmVyc1tzbG90XQBbAEtleVoAS2V5WQBBTkRST0lEX01TR19ERVNUUk9ZOiBNU0dfREVTVFJPWQBLZXlYAEtleVcAQU5EUk9JRF9NU0dfU0VUX05BVElWRV9XSU5ET1c6IE1TR19TRVRfTkFUSVZFX1dJTkRPVwBLZXlWAEtleVUAS2V5VABLZXlTAEFORFJPSURfTVNHX05PX0ZPQ1VTOiBNU0dfTk9fRk9DVVMAQU5EUk9JRF9NU0dfRk9DVVM6IE1TR19GT0NVUwBpbWdfc21wLT5zYW1wbGVyX3Nsb3QgPCBTR19NQVhfU0FNUExFUl9CSU5EU0xPVFMAYV9zdGF0ZS0+YnVmZmVyX2luZGV4IDwgU0dfTUFYX1ZFUlRFWEJVRkZFUl9CSU5EU0xPVFMAYXR0ci0+dmJfaW5kZXggPCBTR19NQVhfVkVSVEVYQlVGRkVSX0JJTkRTTE9UUwBpbWdfc21wLT5pbWFnZV9zbG90IDwgU0dfTUFYX0lNQUdFX0JJTkRTTE9UUwBfc2cubGltaXRzLm1heF92ZXJ0ZXhfYXR0cnMgPD0gU0dfTUFYX1ZFUlRFWF9BVFRSSUJVVEVTAG51bV9pbWFnZXMgPD0gU0FQUF9NQVhfSUNPTklNQUdFUwBLZXlSAFZBTElEQVRFX0FCTkRfVU5FWFBFQ1RFRF9TQU1QTEVSX0NPTVBBUkVfTkVWRVI6IHNnX2FwcGx5X2JpbmRpbmdzOiBzaGFkZXIgZXhwZWN0cyBTR19TQU1QTEVSVFlQRV9DT01QQVJJU09OIGJ1dCBzYW1wbGVyIGhhcyBTR19DT01QQVJFRlVOQ19ORVZFUgBWQUxJREFURV9BQk5EX0VYUEVDVEVEX1NBTVBMRVJfQ09NUEFSRV9ORVZFUjogc2dfYXBwbHlfYmluZGluZ3M6IHNoYWRlciBleHBlY3RzIFNHX1NBTVBMRVJUWVBFX0ZJTFRFUklORyBvciBTR19TQU1QTEVSVFlQRV9OT05GSUxURVJJTkcgYnV0IHNhbXBsZXIgZG9lc24ndCBoYXZlIFNHX0NPTVBBUkVGVU5DX05FVkVSAFZBTElEQVRFX0FCTkRfVkJfVFlQRTogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiB2ZXJ0ZXggYnVmZmVyIHNsb3QgaXMgbm90IGEgU0dfQlVGRkVSVFlQRV9WRVJURVhCVUZGRVIAVkFMSURBVEVfQUJORF9JQl9UWVBFOiBzZ19hcHBseV9iaW5kaW5nczogYnVmZmVyIGluIGluZGV4IGJ1ZmZlciBzbG90IGlzIG5vdCBhIFNHX0JVRkZFUlRZUEVfSU5ERVhCVUZGRVIAVkFMSURBVEVfU0FNUExFUkRFU0NfQU5JU1RST1BJQ19SRVFVSVJFU19MSU5FQVJfRklMVEVSSU5HOiBzZ19zYW1wbGVyX2Rlc2MubWF4X2FuaXNvdHJvcHkgPiAxIHJlcXVpcmVzIG1pbi9tYWcvbWlwbWFwX2ZpbHRlciB0byBiZSBTR19GSUxURVJfTElORUFSAEtleVEAS2V5UABLZXlPAEtleU4AS2V5TQBLZXlMAExJTlVYX0dMWF9MT0FEX0xJQkdMX0ZBSUxFRDogZmFpbGVkIHRvIGxvYWQgbGliR0wAc2xvdC0+c3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9JTklUSUFMAEtleUsAS2V5SgBLZXlJAEtleUgAS2V5RwBLZXlGAEtleUUAQU5EUk9JRF9NU0dfU0VUX0lOUFVUX1FVRVVFOiBNU0dfU0VUX0lOUFVUX1FVRVVFAEFORFJPSURfTVNHX0NSRUFURTogTVNHX0NSRUFURQBBTkRST0lEX01TR19QQVVTRTogTVNHX1BBVVNFAHBhc3NfZGVmLnN3YXBjaGFpbi5jb2xvcl9mb3JtYXQgPiBTR19QSVhFTEZPUk1BVF9OT05FAEFORFJPSURfTVNHX1JFU1VNRTogTVNHX1JFU1VNRQBWQUxJREFURV9JTUFHRURFU0NfUlRfSU1NVVRBQkxFOiByZW5kZXIgdGFyZ2V0IGltYWdlcyBtdXN0IGJlIFNHX1VTQUdFX0lNTVVUQUJMRQBLZXlEAHNsb3QtPmlkID09IFNHX0lOVkFMSURfSUQAYmluZGluZ3MtPnNhbXBsZXJzW2ldLmlkICE9IFNHX0lOVkFMSURfSUQAYmluZGluZ3MtPnZlcnRleF9idWZmZXJzW2ldLmlkICE9IFNHX0lOVkFMSURfSUQAYmluZGluZ3MtPnN0b3JhZ2VfYnVmZmVyc1tpXS5pZCAhPSBTR19JTlZBTElEX0lEAGJpbmRpbmdzLT5pbWFnZXNbaV0uaWQgIT0gU0dfSU5WQUxJRF9JRABWQUxJREFURV9CRUdJTlBBU1NfQVRUQUNITUVOVFNfVkFMSUQ6IHNnX2JlZ2luX3Bhc3M6IGF0dGFjaG1lbnRzIG9iamVjdCBub3QgaW4gcmVzb3VyY2Ugc3RhdGUgVkFMSUQAS2V5QwBXSU4zMl9IRUxQRVJfV0lORE9XX0dFVERDX0ZBSUxFRDogZmFpbGVkIHRvIGdldCBoZWxwZXIgd2luZG93IERDAEtleUIATElOVVhfR0xYX0NSRUFURV9DT05URVhUX0ZBSUxFRDogRmFpbGVkIHRvIGNyZWF0ZSBHTCBjb250ZXh0IHZpYSBnbFhDcmVhdGVDb250ZXh0QXR0cmlic0FSQgBXSU4zMl9XR0xfSU5DT01QQVRJQkxFX0RFVklDRV9DT05URVhUOiBDcmVhdGVDb250ZXh0QXR0cmlic0FSQiBmYWlsZWQgd2l0aCBFUlJPUl9JTkNPTVBBVElCTEVfREVWSUNFX0NPTlRFWFRTX0FSQgBLZXlBADxmYDwGZjwAW2xpbmU6AFtpZDoARGlnaXQ5AE51bXBhZDkARjkARGlnaXQ4AE51bXBhZDgARjgAc2xvdCA8IDEyOABEaWdpdDcATnVtcGFkNwBGNwBEaWdpdDYATnVtcGFkNgBGNgBEaWdpdDUATnVtcGFkNQBGNQBEaWdpdDQATnVtcGFkNABGNABzbG90IDwgNjQAVkFMSURBVEVfUElQRUxJTkVERVNDX0xBWU9VVF9TVFJJREU0OiBzZ19waXBlbGluZV9kZXNjLmxheW91dC5idWZmZXJzW10uc3RyaWRlIG11c3QgYmUgbXVsdGlwbGUgb2YgNABWQUxJREFURV9CVUZGRVJERVNDX1NUT1JBR0VCVUZGRVJfU0laRV9NVUxUSVBMRV80OiBzaXplIG9mIHN0b3JhZ2UgYnVmZmVycyBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNABEaWdpdDMATnVtcGFkMwBGMwBEaWdpdDIATnVtcGFkMgBGMgBfc2dfYWxpZ25fdTMyAEYxMgBEaWdpdDEATnVtcGFkMQBGMQBWQUxJREFURV9BQk5EX0lNQUdFX01TQUE6IHNnX2FwcGx5X2JpbmRpbmdzOiBjYW5ub3QgYmluZCBpbWFnZSB3aXRoIHNhbXBsZV9jb3VudD4xAEYxMQBnbF9hdHRyLT52Yl9pbmRleCA9PSAtMQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9TQU1QTEVfQ09VTlQ6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGltYWdlIHNhbXBsZSBjb3VudCBtdXN0IGJlIDEAVkFMSURBVEVfSU1BR0VERVNDX01TQUFfM0RfSU1BR0U6IDNEIGltYWdlcyBjYW5ub3QgaGF2ZSBhIHNhbXBsZV9jb3VudCA+IDEAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfQ09MT1JfSU1BR0VfTVNBQTogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnRzIG11c3QgaGF2ZSBhIGNvbG9yIGF0dGFjaG1lbnQgaW1hZ2Ugd2l0aCBzYW1wbGUgY291bnQgPiAxAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfQVJSQVlfQ09VTlQ6IHVuaWZvcm0gYXJyYXkgY291bnQgbXVzdCBiZSA+PSAxAFZBTElEQVRFX0lNQUdFREVTQ19NU0FBX05VTV9NSVBNQVBTOiBNU0FBIGltYWdlcyBtdXN0IGhhdmUgbnVtX21pcG1hcHMgPT0gMQBEaWdpdDAAY29sb3IwAE51bXBhZDAARjEwAExJTlVYX1gxMV9RVUVSWV9TWVNURU1fRFBJX0ZBSUxFRDogZmFpbGVkIHRvIHF1ZXJ5IHN5c3RlbSBkcGkgdmFsdWUsIGFzc3VtaW5nIGRlZmF1bHQgOTYuMABWQUxJREFURV9CVUZGRVJERVNDX1NJWkU6IHNnX2J1ZmZlcl9kZXNjLnNpemUgYW5kIC5kYXRhLnNpemUgY2Fubm90IGJvdGggYmUgMABhcnJheV9jb3VudCA+IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfU0FNUExFQ09VTlQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLnNhbXBsZV9jb3VudCA+IDAAcGFzc19kZWYuc3dhcGNoYWluLnNhbXBsZV9jb3VudCA+IDAAZGVzYy0+aGVpZ2h0ID4gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9IRUlHSFQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmhlaWdodCA+IDAAcGFzc19kZWYuc3dhcGNoYWluLmhlaWdodCA+IDAAZGVzYy0+bWF4X2NvbW1pdF9saXN0ZW5lcnMgPiAwAHQtPm51bSA+IDAAZGVzYy0+d2lkdGggPiAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1dJRFRIOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53aWR0aCA+IDAAcGFzc19kZWYuc3dhcGNoYWluLndpZHRoID4gMAB1Yl9kZXNjLT5zaXplID4gMABkZXNjLT5waXhlbHMuc2l6ZSA+IDAAbF9zdGF0ZS0+c3RyaWRlID4gMABWQUxJREFURV9JTUFHRURFU0NfSEVJR0hUOiBzZ19pbWFnZV9kZXNjLmhlaWdodCBtdXN0IGJlID4gMABWQUxJREFURV9JTUFHRURFU0NfV0lEVEg6IHNnX2ltYWdlX2Rlc2Mud2lkdGggbXVzdCBiZSA+IDAAZGVzYy0+c2FtcGxlX2NvdW50ID49IDAAYmFzZV9lbGVtZW50ID49IDAAZGVzYy0+aGVpZ2h0ID49IDAAbnVtX2VsZW1lbnRzID49IDAAZGVzYy0+bWF4X2Ryb3BwZWRfZmlsZXMgPj0gMABudW1faW5zdGFuY2VzID49IDAAZGVzYy0+c3dhcF9pbnRlcnZhbCA+PSAwAGRlc2MtPm1heF9kcm9wcGVkX2ZpbGVfcGF0aF9sZW5ndGggPj0gMABkZXNjLT53aWR0aCA+PSAwAGRlc2MtPmNsaXBib2FyZF9zaXplID49IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9XR1BVX0VYUEVDVF9SRU5ERVJWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5yZW5kZXJfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX1JFTkRFUlZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5yZW5kZXJfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfREVQVEhTVEVOQ0lMVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUuZGVwdGhfc3RlbmNpbF92aWV3ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9EM0QxMV9FWFBFQ1RfREVQVEhTVEVOQ0lMVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLmRlcHRoX3N0ZW5jaWxfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfUkVTT0xWRVZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LnJlc29sdmVfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX1JFU09MVkVWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEucmVzb2x2ZV92aWV3ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfU0FNUExFQ09VTlRfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5zYW1wbGVfY291bnQgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9IRUlHSFRfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5oZWlnaHQgPT0gMABfc2cuY3VyX3Bhc3MuYXR0cyA9PSAwAHViLT5udW1fdW5pZm9ybXMgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0dMX0VYUEVDVF9GUkFNRUJVRkZFUl9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmdsLmZyYW1lYnVmZmVyID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfV0lEVEhfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53aWR0aCA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX01TQUFDT0xPUlRFWFRVUkVfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5tc2FhX2NvbG9yX3RleHR1cmUgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9ERVBUSFNURU5DSUxURVhUVVJFX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwuZGVwdGhfc3RlbmNpbF90ZXh0dXJlID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfQ1VSUkVOVERSQVdBQkxFX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwuY3VycmVudF9kcmF3YWJsZSA9PSAwAChkaW0gJSA4KSA9PSAwAGdsR2V0RXJyb3IoKSA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfUkVOREVSVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5yZW5kZXJfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX1JFTkRFUlZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLnJlbmRlcl92aWV3ICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9XR1BVX0VYUEVDVF9ERVBUSFNURU5DSUxWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LmRlcHRoX3N0ZW5jaWxfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX0RFUFRIU1RFTkNJTFZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLmRlcHRoX3N0ZW5jaWxfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfUkVTT0xWRVZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUucmVzb2x2ZV92aWV3ICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9EM0QxMV9FWFBFQ1RfUkVTT0xWRVZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLnJlc29sdmVfdmlldyAhPSAwAGRlc2MtPnBpeGVscy5wdHIgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9NU0FBQ09MT1JURVhUVVJFOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5tc2FhX2NvbG9yX3RleHR1cmUgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9ERVBUSFNURU5DSUxURVhUVVJFOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5kZXB0aF9zdGVuY2lsX3RleHR1cmUgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9DVVJSRU5URFJBV0FCTEU6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLmN1cnJlbnRfZHJhd2FibGUgIT0gMABXSU4zMl9EM0QxMV9DUkVBVEVfREVWSUNFX0FORF9TV0FQQ0hBSU5fV0lUSF9ERUJVR19GQUlMRUQ6IEQzRDExQ3JlYXRlRGV2aWNlQW5kU3dhcENoYWluKCkgd2l0aCBEM0QxMV9DUkVBVEVfREVWSUNFX0RFQlVHIGZhaWxlZCwgcmV0cnlpbmcgd2l0aG91dCBkZWJ1ZyBmbGFnLgBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfUkVBRE9OTFk6IHNoYWRlciBzdGFnZSBzdG9yYWdlIGJ1ZmZlcnMgbXVzdCBiZSByZWFkb25seSAoc2dfc2hhZGVyX2Rlc2Muc3RvcmFnZV9idWZmZXJzW10ucmVhZG9ubHkpAFdHUFVfQklOREdST1VQU0NBQ0hFX1NJWkVfUE9XMjogc2dfZGVzYy53Z3B1X2JpbmRncm91cHNfY2FjaGVfc2l6ZSBtdXN0IGJlIGEgcG93ZXIgb2YgMiAod2dwdSkAV0dQVV9CSU5ER1JPVVBTQ0FDSEVfU0laRV9HUkVBVEVSX09ORTogc2dfZGVzYy53Z3B1X2JpbmRncm91cHNfY2FjaGVfc2l6ZSBtdXN0IGJlID4gMSAod2dwdSkAV0dQVV9CSU5ER1JPVVBTX1BPT0xfRVhIQVVTVEVEOiBiaW5kZ3JvdXBzIHBvb2wgZXhoYXVzdGVkIChpbmNyZWFzZSBzZ19kZXNjLmJpbmRncm91cHNfY2FjaGVfc2l6ZSkgKHdncHUpAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9OT1RfUkVGRVJFTkNFRF9CWV9JTUFHRV9TQU1QTEVSX1BBSVJTOiBvbmUgb3IgbW9yZSBzYW1wbGVycyBhcmUgbm90IHJlZmVyZW5jZWQgYnkgaW1hZ2Utc2FtcGxlci1wYWlycyAoc2dfc2hhZGVyX2Rlc2MuaW1hZ2Vfc2FtcGxlcl9wYWlyc1tdLnNhbXBsZXJfc2xvdCkAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9TQU1QTEVSX1BBSVJfU0FNUExFUl9TTE9UX09VVF9PRl9SQU5HRTogaW1hZ2Utc2FtcGxlci1wYWlyIHNhbXBsZXIgc2xvdCBpbmRleCBpcyBvdXQgb2YgcmFuZ2UgKHNnX3NoYWRlcl9kZXNjLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5zYW1wbGVyX3Nsb3QpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfTk9UX1JFRkVSRU5DRURfQllfSU1BR0VfU0FNUExFUl9QQUlSUzogb25lIG9yIG1vcmUgaW1hZ2VzIGFyZSBub3QgcmVmZXJlbmNlZCBieSBieSBpbWFnZS1zYW1wbGVyLXBhaXJzIChzZ19zaGFkZXJfZGVzYy5pbWFnZV9zYW1wbGVyX3BhaXJzW10uaW1hZ2Vfc2xvdCkAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9TQU1QTEVSX1BBSVJfSU1BR0VfU0xPVF9PVVRfT0ZfUkFOR0U6IGltYWdlLXNhbXBsZXItcGFpciBpbWFnZSBzbG90IGluZGV4IGlzIG91dCBvZiByYW5nZSAoc2dfc2hhZGVyX2Rlc2MuaW1hZ2Vfc2FtcGxlcl9wYWlyc1tdLmltYWdlX3Nsb3QpACgweDg4OTIgPT0gdGFyZ2V0KSB8fCAoMHg4ODkzID09IHRhcmdldCkgfHwgKDB4OTBEMiA9PSB0YXJnZXQpAElNQUdFX0RBVEFfU0laRV9NSVNNQVRDSDogaW1hZ2UgZGF0YSBzaXplIG1pc21hdGNoIChtdXN0IGJlIHdpZHRoKmhlaWdodCo0IGJ5dGVzKQAoaW5kZXggPj0gMCkgJiYgKGluZGV4IDw9IF9zYXBwLmRyb3AubWF4X2ZpbGVzKQBUcmlhbmdsZSAoc29rb2wtYXBwKQBWQUxJREFURV9JTUFHRURBVEFfTk9EQVRBOiBzZ19pbWFnZV9kYXRhOiBubyBkYXRhICgucHRyIGFuZC9vciAuc2l6ZSBpcyB6ZXJvKQAoZGVzYy0+YWxsb2NhdG9yLmFsbG9jX2ZuICYmIGRlc2MtPmFsbG9jYXRvci5mcmVlX2ZuKSB8fCAoIWRlc2MtPmFsbG9jYXRvci5hbGxvY19mbiAmJiAhZGVzYy0+YWxsb2NhdG9yLmZyZWVfZm4pAEdMX1ZFUlRFWF9BVFRSSUJVVEVfTk9UX0ZPVU5EX0lOX1NIQURFUjogdmVydGV4IGF0dHJpYnV0ZSBub3QgZm91bmQgaW4gc2hhZGVyIChnbCkAR0xfSU1BR0VfU0FNUExFUl9OQU1FX05PVF9GT1VORF9JTl9TSEFERVI6IGltYWdlLXNhbXBsZXIgbmFtZSBub3QgZm91bmQgaW4gc2hhZGVyIChnbCkAR0xfVEVYVFVSRV9GT1JNQVRfTk9UX1NVUFBPUlRFRDogcGl4ZWwgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgZm9yIHRleHR1cmUgKGdsKQBHTF9BUlJBWV9URVhUVVJFU19OT1RfU1VQUE9SVEVEOiBhcnJheSB0ZXh0dXJlcyBub3Qgc3VwcG9ydGVkIChnbCkAR0xfM0RfVEVYVFVSRVNfTk9UX1NVUFBPUlRFRDogM2QgdGV4dHVyZXMgbm90IHN1cHBvcnRlZCAoZ2wpAEdMX1NIQURFUl9DT01QSUxBVElPTl9GQUlMRUQ6IHNoYWRlciBjb21waWxhdGlvbiBmYWlsZWQgKGdsKQBHTF9TSEFERVJfTElOS0lOR19GQUlMRUQ6IHNoYWRlciBsaW5raW5nIGZhaWxlZCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVDogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UIChnbCkAR0xfRlJBTUVCVUZGRVJfU1RBVFVTX0lOQ09NUExFVEVfQVRUQUNITUVOVDogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfQVRUQUNITUVOVCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19JTkNPTVBMRVRFX01VTFRJU0FNUExFOiBmcmFtZWJ1ZmZlciBjb21wbGV0ZW5lc3MgY2hlY2sgZmFpbGVkIHdpdGggR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9NVUxUSVNBTVBMRSAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19VTlNVUFBPUlRFRDogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX1VOU1VQUE9SVEVEIChnbCkAR0xfRlJBTUVCVUZGRVJfU1RBVFVTX1VOREVGSU5FRDogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX1VOREVGSU5FRCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19VTktOT1dOOiBmcmFtZWJ1ZmZlciBjb21wbGV0ZW5lc3MgY2hlY2sgZmFpbGVkICh1bmtub3duIHJlYXNvbikgKGdsKQBNRVRBTF9DUkVBVEVfU0FNUExFUl9GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgc2FtcGxlciBvYmplY3QgKG1ldGFsKQBNRVRBTF9DUkVBVEVfQlVGRkVSX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSBidWZmZXIgb2JqZWN0IChtZXRhbCkATUVUQUxfQ1JFQVRFX1RFWFRVUkVfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHRleHR1cmUgb2JqZWN0IChtZXRhbCkATUVUQUxfQ1JFQVRFX0RTU19GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgZGVwdGggc3RlbmNpbCBzdGF0ZSAobWV0YWwpAE1FVEFMX0NSRUFURV9SUFNfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHJlbmRlciBwaXBlbGluZSBzdGF0ZSAobWV0YWwpAE1FVEFMX1RFWFRVUkVfRk9STUFUX05PVF9TVVBQT1JURUQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciB0ZXh0dXJlIChtZXRhbCkATUVUQUxfU0hBREVSX0VOVFJZX05PVF9GT1VORDogc2hhZGVyIGVudHJ5IGZ1bmN0aW9uIG5vdCBmb3VuZCAobWV0YWwpAE1FVEFMX1NIQURFUl9DT01QSUxBVElPTl9GQUlMRUQ6IHNoYWRlciBjb21waWxhdGlvbiBmYWlsZWQgKG1ldGFsKQBNRVRBTF9TSEFERVJfQ1JFQVRJT05fRkFJTEVEOiBzaGFkZXIgY3JlYXRpb24gZmFpbGVkIChtZXRhbCkAV0lOMzJfUkVHSVNURVJfUkFXX0lOUFVUX0RFVklDRVNfRkFJTEVEX01PVVNFX1VOTE9DSzogUmVnaXN0ZXJSYXdJbnB1dERldmljZXMoKSBmYWlsZWQgKG9uIG1vdXNlIHVubG9jaykAV0lOMzJfUkVHSVNURVJfUkFXX0lOUFVUX0RFVklDRVNfRkFJTEVEX01PVVNFX0xPQ0s6IFJlZ2lzdGVyUmF3SW5wdXREZXZpY2VzKCkgZmFpbGVkIChvbiBtb3VzZSBsb2NrKQBEUk9QUEVEX0ZJTEVfUEFUSF9UT09fTE9ORzogZHJvcHBlZCBmaWxlIHBhdGggdG9vIGxvbmcgKHNhcHBfZGVzYy5tYXhfZHJvcHBlZF9maWxlZF9wYXRoX2xlbmd0aCkAIV9zYXBwX3JpbmdfZW1wdHkocmluZykAIV9zYXBwX3JpbmdfZnVsbChyaW5nKQAoc2xvdF9pbmRleCA+IDApICYmIChzbG90X2luZGV4IDwgcG9vbC0+c2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcG9vbC0+c2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+YXR0YWNobWVudHNfcG9vbC5zaXplKQAoc2xvdF9pbmRleCA+ICgwKSkgJiYgKHNsb3RfaW5kZXggPCBwLT5zYW1wbGVyX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+YnVmZmVyX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+c2hhZGVyX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+cGlwZWxpbmVfcG9vbC5zaXplKQAoc2xvdF9pbmRleCA+ICgwKSkgJiYgKHNsb3RfaW5kZXggPCBwLT5pbWFnZV9wb29sLnNpemUpAFZBTElEQVRFX0JVRkZFUkRFU0NfREFUQTogaW1tdXRhYmxlIGJ1ZmZlcnMgbXVzdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEgKHNnX2J1ZmZlcl9kZXNjLmRhdGEucHRyIGFuZCBzZ19idWZmZXJfZGVzYy5kYXRhLnNpemUpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gYXR0c19pZCkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBzbXBfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gcGlwX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IGltZ19pZCkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBidWZfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gc2hkX2lkKQBibmQucGlwLT5zaGFkZXIgJiYgKGJuZC5waXAtPmNtbi5zaGFkZXJfaWQuaWQgPT0gYm5kLnBpcC0+c2hhZGVyLT5zbG90LmlkKQBwaXAtPnNoYWRlciAmJiAocGlwLT5jbW4uc2hhZGVyX2lkLmlkID09IHBpcC0+c2hhZGVyLT5zbG90LmlkKQBwaXAtPnNoYWRlciAmJiAocGlwLT5zaGFkZXItPnNsb3QuaWQgPT0gcGlwLT5jbW4uc2hhZGVyX2lkLmlkKQAoc3JjLT5zYW1wbGVyX3Nsb3QgPj0gMCkgJiYgKHNyYy0+c2FtcGxlcl9zbG90IDwgU0dfTUFYX1NBTVBMRVJfQklORFNMT1RTKQBzYnVmX2Rlc2MtPmdsc2xfYmluZGluZ19uIDwgKDIgKiBTR19NQVhfU1RPUkFHRUJVRkZFUl9CSU5EU0xPVFMpAChzcmMtPmltYWdlX3Nsb3QgPj0gMCkgJiYgKHNyYy0+aW1hZ2Vfc2xvdCA8IFNHX01BWF9JTUFHRV9CSU5EU0xPVFMpAChkZXNjLT5jb2xvcl9jb3VudCA+PSAwKSAmJiAoZGVzYy0+Y29sb3JfY291bnQgPD0gU0dfTUFYX0NPTE9SX0FUVEFDSE1FTlRTKQBhdHRzICYmIChpbmRleCA+PSAwKSAmJiAoaW5kZXggPCBTR19NQVhfQ09MT1JfQVRUQUNITUVOVFMpAChudW1faW1hZ2VzID4gMCkgJiYgKG51bV9pbWFnZXMgPD0gU0FQUF9NQVhfSUNPTklNQUdFUykAKGRlc2MtPmF0dGFjaG1lbnRzX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5hdHRhY2htZW50c19wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPnNhbXBsZXJfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPnNhbXBsZXJfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5idWZmZXJfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPmJ1ZmZlcl9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPnNoYWRlcl9wb29sX3NpemUgPiAwKSAmJiAoZGVzYy0+c2hhZGVyX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAoZGVzYy0+cGlwZWxpbmVfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPnBpcGVsaW5lX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAoZGVzYy0+aW1hZ2VfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPmltYWdlX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAocGlwLT5zaGFkZXIgPT0gMCkgJiYgKHBpcC0+Y21uLnNoYWRlcl9pZC5pZCAhPSBTR19JTlZBTElEX0lEKQAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpfHwocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCl8fChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKXx8KHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAoc2hkLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQBwaXAgJiYgKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKQBidWYgJiYgKGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKQBzaGQgJiYgKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKQBXSU4zMl9XR0xfT1BFTkdMX1ZFUlNJT05fTk9UX1NVUFBPUlRFRDogcmVxdWVzdGVkIE9wZW5HTCB2ZXJzaW9uIG5vdCBzdXBwb3J0ZWQgYnkgR0wgZHJpdmVyIChFUlJPUl9JTlZBTElEX1ZFUlNJT05fQVJCKQBXSU4zMl9XR0xfT1BFTkdMX1BST0ZJTEVfTk9UX1NVUFBPUlRFRDogcmVxdWVzdGVkIE9wZW5HTCBwcm9maWxlIG5vdCBzdXBwb3J0IGJ5IEdMIGRyaXZlciAoRVJST1JfSU5WQUxJRF9QUk9GSUxFX0FSQikAVkFMSURBVEVfU0hBREVSREVTQ19TQU1QTEVSX1dHU0xfR1JPVVAxX0JJTkRJTkdfT1VUX09GX1JBTkdFOiBzYW1wbGVyICd3Z3NsX2dyb3VwMV9iaW5kaW5nX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4xMjcpAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9XR1NMX0dST1VQMV9CSU5ESU5HX09VVF9PRl9SQU5HRTogc3RvcmFnZSBidWZmZXIgJ3dnc2xfZ3JvdXAxX2JpbmRpbmdfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjEyNykAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9XR1NMX0dST1VQMV9CSU5ESU5HX09VVF9PRl9SQU5HRTogaW1hZ2UgJ3dnc2xfZ3JvdXAxX2JpbmRpbmdfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjEyNykAVkFMSURBVEVfU0hBREVSREVTQ19VQl9NRVRBTF9CVUZGRVJfU0xPVF9PVVRfT0ZfUkFOR0U6IHVuaWZvcm0gYmxvY2sgJ21zbF9idWZmZXJfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjcpAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfSExTTF9SRUdJU1RFUl9CX09VVF9PRl9SQU5HRTogdW5pZm9ybSBibG9jayAnaGxzbF9yZWdpc3Rlcl9iX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi43KQBWQUxJREFURV9TSEFERVJERVNDX0FUVFJfU1RSSU5HX1RPT19MT05HOiB2ZXJ0ZXggYXR0cmlidXRlIG5hbWUvc2VtYW50aWMgc3RyaW5nIHRvbyBsb25nIChtYXggbGVuIDE2KQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfTUVUQUxfQlVGRkVSX1NMT1RfT1VUX09GX1JBTkdFOiBzdG9yYWdlIGJ1ZmZlciAnbXNsX2J1ZmZlcl9uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgOC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9ITFNMX1JFR0lTVEVSX1NfT1VUX09GX1JBTkdFOiBzYW1wbGVyICdobHNsX3JlZ2lzdGVyX3NfbicgaXMgb3V0IG9mIHJhbmcgKG11c3QgYmUgMC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9NRVRBTF9TQU1QTEVSX1NMT1RfT1VUX09GX1JBTkdFOiBzYW1wbGVyICdtc2xfc2FtcGxlcl9uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9HTFNMX0JJTkRJTkdfT1VUX09GX1JBTkdFOiBzdG9yYWdlIGJ1ZmZlciAnZ2xzbF9iaW5kaW5nX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4xNSkAVkFMSURBVEVfU0hBREVSREVTQ19VQl9XR1NMX0dST1VQMF9CSU5ESU5HX09VVF9PRl9SQU5HRTogdW5pZm9ybSBibG9jayAnd2dzbF9ncm91cDBfYmluZGluZ19uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfTUVUQUxfVEVYVFVSRV9TTE9UX09VVF9PRl9SQU5HRTogaW1hZ2UgJ21zbF90ZXh0dXJlX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4xNSkAVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX0hMU0xfUkVHSVNURVJfVF9PVVRfT0ZfUkFOR0U6IHN0b3JhZ2UgYnVmZmVyICdobHNsX3JlZ2lzdGVyX3RfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjIzKQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX0hMU0xfUkVHSVNURVJfVF9PVVRfT0ZfUkFOR0U6IGltYWdlICdobHNsX3JlZ2lzdGVyX3RfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjIzKQBWQUxJREFURV9CVUZGRVJERVNDX1NUT1JBR0VCVUZGRVJfU1VQUE9SVEVEOiBzdG9yYWdlIGJ1ZmZlcnMgbm90IHN1cHBvcnRlZCBieSB0aGUgYmFja2VuZCAzRCBBUEkgKHJlcXVpcmVzIE9wZW5HTCA+PSA0LjMpAExJTlVYX0dMWF9WRVJTSU9OX1RPT19MT1c6IEdMWCB2ZXJzaW9uIHRvbyBsb3cgKG5lZWQgYXQgbGVhc3QgMS4zKQBEM0QxMV9DUkVBVEVfQ09OU1RBTlRfQlVGRkVSX0ZBSUxFRDogQ3JlYXRlQnVmZmVyKCkgZmFpbGVkIGZvciB1bmlmb3JtIGNvbnN0YW50IGJ1ZmZlciAoZDNkMTEpAEQzRDExX01BUF9GT1JfQVBQRU5EX0JVRkZFUl9GQUlMRUQ6IE1hcCgpIGZhaWxlZCB3aGVuIGFwcGVuZGluZyB0byBidWZmZXIgKGQzZDExKQBEM0QxMV9NQVBfRk9SX1VQREFURV9CVUZGRVJfRkFJTEVEOiBNYXAoKSBmYWlsZWQgd2hlbiB1cGRhdGluZyBidWZmZXIgKGQzZDExKQBEM0QxMV9DUkVBVEVfQlVGRkVSX1NSVl9GQUlMRUQ6IENyZWF0ZVNoYWRlclJlc291cmNlVmlldygpIGZhaWxlZCBmb3Igc3RvcmFnZSBidWZmZXIgKGQzZDExKQBEM0QxMV9DUkVBVEVfMkRfVEVYVFVSRV9VTlNVUFBPUlRFRF9QSVhFTF9GT1JNQVQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciAyZC0sIGN1YmUtIG9yIGFycmF5LXRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfMkRfU1JWX0ZBSUxFRDogQ3JlYXRlU2hhZGVyUmVzb3VyY2VWaWV3KCkgZmFpbGVkIGZvciAyZC0sIGN1YmUtIG9yIGFycmF5LXRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfMkRfVEVYVFVSRV9GQUlMRUQ6IENyZWF0ZVRleHR1cmUyRCgpIGZhaWxlZCBmb3IgMmQtLCBjdWJlLSBvciBhcnJheS10ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFX01TQUFfVEVYVFVSRV9GQUlMRUQ6IENyZWF0ZVRleHR1cmUyRCgpIGZhaWxlZCBmb3IgTVNBQSByZW5kZXIgdGFyZ2V0IHRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfREVQVEhfVEVYVFVSRV9VTlNVUFBPUlRFRF9QSVhFTF9GT1JNQVQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciBkZXB0aC1zdGVuY2lsIHRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfREVQVEhfVEVYVFVSRV9GQUlMRUQ6IENyZWF0ZVRleHR1cmUyRCgpIGZhaWxlZCBmb3IgZGVwdGgtc3RlbmNpbCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFXzNEX1NSVl9GQUlMRUQ6IENyZWF0ZVNoYWRlclJlc291cmNlVmlldygpIGZhaWxlZCBmb3IgM2QgdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV8zRF9URVhUVVJFX1VOU1VQUE9SVEVEX1BJWEVMX0ZPUk1BVDogcGl4ZWwgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgZm9yIDNEIHRleHR1cmUgKGQzZDExKQBEM0QxMV9NQVBfRk9SX1VQREFURV9JTUFHRV9GQUlMRUQ6IE1hcCgpIGZhaWxlZCB3aGVuIHVwZGF0aW5nIGltYWdlIChkM2QxMSkARDNEMTFfU0hBREVSX0NPTVBJTEFUSU9OX0ZBSUxFRDogc2hhZGVyIGNvbXBpbGF0aW9uIGZhaWxlZCAoZDNkMTEpAEQzRDExX0xPQURfRDNEQ09NUElMRVJfNDdfRExMX0ZBSUxFRDogbG9hZGluZyBkM2Rjb21waWxlcl80Ny5kbGwgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX1JUVl9GQUlMRUQ6IENyZWF0ZVJlbmRlclRhcmdldFZpZXcoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfRFNWX0ZBSUxFRDogQ3JlYXRlRGVwdGhTdGVuY2lsVmlldygpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9JTlBVVF9MQVlPVVRfRkFJTEVEOiBDcmVhdGVJbnB1dExheW91dCgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9CVUZGRVJfRkFJTEVEOiBDcmVhdGVCdWZmZXIoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfUkFTVEVSSVpFUl9TVEFURV9GQUlMRUQ6IENyZWF0ZVJhc3Rlcml6ZXJTdGF0ZSgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9TQU1QTEVSX1NUQVRFX0ZBSUxFRDogQ3JlYXRlU2FtcGxlclN0YXRlKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RFUFRIX1NURU5DSUxfU1RBVEVfRkFJTEVEOiBDcmVhdGVEZXB0aFN0ZW5jaWxTdGF0ZSgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9CTEVORF9TVEFURV9GQUlMRUQ6IENyZWF0ZUJsZW5kU3RhdGUoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfM0RfVEVYVFVSRV9GQUlMRUQ6IENyZWF0ZVRleHR1cmUzRCgpIGZhaWxlZCAoZDNkMTEpAE1BQ09TX0lOVkFMSURfTlNPUEVOR0xfUFJPRklMRTogbWFjb3M6IGludmFsaWQgTlNPcGVuR0xQcm9maWxlICh2YWxpZCBjaG9pY2VzIGFyZSAxLjAgYW5kIDQuMSkAcG9vbCAmJiAobnVtID49IDEpAChiaW5kaW5ncy0+X3N0YXJ0X2NhbmFyeSA9PSAwKSAmJiAoYmluZGluZ3MtPl9lbmRfY2FuYXJ5PT0wKQAoX3NhcHAuZnJhbWVidWZmZXJfd2lkdGggPiAwKSAmJiAoX3NhcHAuZnJhbWVidWZmZXJfaGVpZ2h0ID4gMCkAc3JjICYmIGRzdCAmJiAobWF4X2xlbiA+IDApAHB0ciAmJiAoc2l6ZSA+IDApAChwYXNzLT5fc3RhcnRfY2FuYXJ5ID09IDApICYmIChwYXNzLT5fZW5kX2NhbmFyeSA9PSAwKQAoZGVzYy0+X3N0YXJ0X2NhbmFyeSA9PSAwKSAmJiAoZGVzYy0+X2VuZF9jYW5hcnkgPT0gMCkAKGFsaWduID4gMCkgJiYgKChhbGlnbiAmIChhbGlnbiAtIDEpKSA9PSAwKQAoZ2xfdGV4X3Nsb3QgPj0gMCkgJiYgKGdsX3RleF9zbG90IDwgKFNHX01BWF9JTUFHRV9TQU1QTEVSX1BBSVJTKSkAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05TVEFSVDogTmF0aXZlQWN0aXZpdHkgb25TdGFydCgpAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OU1RPUDogTmF0aXZlQWN0aXZpdHkgb25TdG9wKCkARFJBV19SRVFVSVJFRF9CSU5ESU5HU19PUl9VTklGT1JNU19NSVNTSU5HOiBjYWxsIHRvIHNnX2FwcGx5X2JpbmRpbmdzKCkgYW5kL29yIHNnX2FwcGx5X3VuaWZvcm1zKCkgbWlzc2luZyBhZnRlciBzZ19hcHBseV9waXBlbGluZSgpAFZBTElEQVRFX0FVQl9OT19QSVBFTElORTogc2dfYXBwbHlfdW5pZm9ybXM6IG11c3QgYmUgY2FsbGVkIGFmdGVyIHNnX2FwcGx5X3BpcGVsaW5lKCkAQU5EUk9JRF9VTlNVUFBPUlRFRF9JTlBVVF9FVkVOVF9JTlBVVF9DQjogdW5zdXBwb3J0ZWQgaW5wdXQgZXZlbnQgZW5jb3VudGVyZWQgaW4gX3NhcHBfYW5kcm9pZF9pbnB1dF9jYigpAEFORFJPSURfUkVBRF9NU0dfRkFJTEVEOiBmYWlsZWQgdG8gcmVhZCBtZXNzYWdlIGluIF9zYXBwX2FuZHJvaWRfbWFpbl9jYigpAEFORFJPSURfVU5TVVBQT1JURURfSU5QVVRfRVZFTlRfTUFJTl9DQjogdW5zdXBwb3J0ZWQgaW5wdXQgZXZlbnQgZW5jb3VudGVyZWQgaW4gX3NhcHBfYW5kcm9pZF9tYWluX2NiKCkAV0dQVV9SRVFVRVNUX0FEQVBURVJfU1RBVFVTX0VSUk9SOiB3Z3B1OiByZXF1ZXN0aW5nIGFkYXB0ZXIgZmFpbGVkIHdpdGggc3RhdHVzICdlcnJvcicAV0dQVV9SRVFVRVNUX0RFVklDRV9TVEFUVVNfRVJST1I6IHdncHU6IHJlcXVlc3RpbmcgZGV2aWNlIGZhaWxlZCB3aXRoIHN0YXR1cyAnZXJyb3InAFdHUFVfUkVRVUVTVF9BREFQVEVSX1NUQVRVU19VTktOT1dOOiB3Z3B1OiByZXF1ZXN0aW5nIGFkYXB0ZXIgZmFpbGVkIHdpdGggc3RhdHVzICd1bmtub3duJwBXR1BVX1JFUVVFU1RfREVWSUNFX1NUQVRVU19VTktOT1dOOiB3Z3B1OiByZXF1ZXN0aW5nIGRldmljZSBmYWlsZWQgd2l0aCBzdGF0dXMgJ3Vua25vd24nAFdHUFVfUkVRVUVTVF9BREFQVEVS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ZS5zb2tvbF9iZWZvcmV1bmxvYWQgPSAoZXZlbnQpID0+IHsgaWYgKF9fc2FwcF9odG1sNV9nZXRfYXNrX2xlYXZlX3NpdGUoKSAhPSAwKSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IGV2ZW50LnJldHVyblZhbHVlID0gJyAnOyB9IH07IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBNb2R1bGUuc29rb2xfYmVmb3JldW5sb2FkKTsgfQAodm9pZCk8Ojo+eyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgTW9kdWxlLnNva29sX2JlZm9yZXVubG9hZCk7IH0AKHZvaWQpPDo6PnsgTW9kdWxlLnNva29sX3Bhc3RlID0gKGV2ZW50KSA9PiB7IGNvbnN0IHBhc3RlZF9zdHIgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTsgd2l0aFN0YWNrU2F2ZSgoKSA9PiB7IGNvbnN0IGNzdHIgPSBzdHJpbmdUb1VURjhPblN0YWNrKHBhc3RlZF9zdHIpOyBfX3NhcHBfZW1zY19vbnBhc3RlKGNzdHIpOyB9KTsgfTsgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgTW9kdWxlLnNva29sX3Bhc3RlKTsgfQAodm9pZCk8Ojo+eyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGFzdGUnLCBNb2R1bGUuc29rb2xfcGFzdGUpOyB9AChjb25zdCBjaGFyKiBjX3N0cik8Ojo+eyBjb25zdCBzdHIgPSBVVEY4VG9TdHJpbmcoY19zdHIpOyBjb25zdCB0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7IHRhLnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpOyB0YS5zZXRBdHRyaWJ1dGUoJ2F1dG9jb3JyZWN0JywgJ29mZicpOyB0YS5zZXRBdHRyaWJ1dGUoJ2F1dG9jYXBpdGFsaXplJywgJ29mZicpOyB0YS5zZXRBdHRyaWJ1dGUoJ3NwZWxsY2hlY2snLCAnZmFsc2UnKTsgdGEuc3R5bGUubGVmdCA9IC0xMDAgKyAncHgnOyB0YS5zdHlsZS50b3AgPSAtMTAwICsgJ3B4JzsgdGEuc3R5bGUuaGVpZ2h0ID0gMTsgdGEuc3R5bGUud2lkdGggPSAxOyB0YS52YWx1ZSA9IHN0cjsgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0YSk7IHRhLnNlbGVjdCgpOyBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpOyBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRhKTsgfQAodm9pZCk8Ojo+eyBNb2R1bGUuc29rb2xfZHJvcF9maWxlcyA9IFtdOyBNb2R1bGUuc29rb2xfZHJhZ2VudGVyID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJhZ292ZXIgPSAoZXZlbnQpID0+IHsgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH07IE1vZHVsZS5zb2tvbF9kcm9wID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBjb25zdCBmaWxlcyA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlczsgTW9kdWxlLnNva29sX2Ryb3BwZWRfZmlsZXMgPSBmaWxlczsgX19zYXBwX2Vtc2NfYmVnaW5fZHJvcChmaWxlcy5sZW5ndGgpOyBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7IHdpdGhTdGFja1NhdmUoKCkgPT4geyBjb25zdCBjc3RyID0gc3RyaW5nVG9VVEY4T25TdGFjayhmaWxlc1tpXS5uYW1lKTsgX19zYXBwX2Vtc2NfZHJvcChpLCBjc3RyKTsgfSk7IH0gbGV0IG1vZHMgPSAwOyBpZiAoZXZlbnQuc2hpZnRLZXkpIHsgbW9kcyB8PSAxOyB9IGlmIChldmVudC5jdHJsS2V5KSB7IG1vZHMgfD0gMjsgfSBpZiAoZXZlbnQuYWx0S2V5KSB7IG1vZHMgfD0gNDsgfSBpZiAoZXZlbnQubWV0YUtleSkgeyBtb2RzIHw9IDg7IH0gX19zYXBwX2Vtc2NfZW5kX2Ryb3AoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgbW9kcyk7IH07IC8qKiBAc3VwcHJlc3Mge21pc3NpbmdQcm9wZXJ0aWVzfSAqLyBjb25zdCBjYW52YXMgPSBNb2R1bGUuc2FwcF9lbXNjX3RhcmdldDsgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIE1vZHVsZS5zb2tvbF9kcmFnZW50ZXIsIGZhbHNlKTsgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIE1vZHVsZS5zb2tvbF9kcmFnbGVhdmUsIGZhbHNlKTsgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgTW9kdWxlLnNva29sX2RyYWdvdmVyLCBmYWxzZSk7IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgTW9kdWxlLnNva29sX2Ryb3AsIGZhbHNlKTsgfQAoaW50IGluZGV4KTw6Oj57IC8qKiBAc3VwcHJlc3Mge21pc3NpbmdQcm9wZXJ0aWVzfSAqLyBjb25zdCBmaWxlcyA9IE1vZHVsZS5zb2tvbF9kcm9wcGVkX2ZpbGVzOyBpZiAoKGluZGV4IDwgMCkgfHwgKGluZGV4ID49IGZpbGVzLmxlbmd0aCkpIHsgcmV0dXJuIDA7IH0gZWxzZSB7IHJldHVybiBmaWxlc1tpbmRleF0uc2l6ZTsgfSB9AChpbnQgaW5kZXgsIF9zYXBwX2h0bWw1X2ZldGNoX2NhbGxiYWNrIGNhbGxiYWNrLCB2b2lkKiBidWZfcHRyLCB1aW50MzJfdCBidWZfc2l6ZSwgdm9pZCogdXNlcl9kYXRhKTw6Oj57IGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7IHJlYWRlci5vbmxvYWQgPSAobG9hZEV2ZW50KSA9PiB7IGNvbnN0IGNvbnRlbnQgPSBsb2FkRXZlbnQudGFyZ2V0LnJlc3VsdDsgaWYgKGNvbnRlbnQuYnl0ZUxlbmd0aCA+IGJ1Zl9zaXplKSB7IF9fc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYihpbmRleCwgMCwgMSwgY2FsbGJhY2ssIDAsIGJ1Zl9wdHIsIGJ1Zl9zaXplLCB1c2VyX2RhdGEpOyB9IGVsc2UgeyBIRUFQVTguc2V0KG5ldyBVaW50OEFycmF5KGNvbnRlbnQpLCBidWZfcHRyKTsgX19zYXBwX2Vtc2NfaW52b2tlX2ZldGNoX2NiKGluZGV4LCAxLCAwLCBjYWxsYmFjaywgY29udGVudC5ieXRlTGVuZ3RoLCBidWZfcHRyLCBidWZfc2l6ZSwgdXNlcl9kYXRhKTsgfSB9OyByZWFkZXIub25lcnJvciA9ICgpID0+IHsgX19zYXBwX2Vtc2NfaW52b2tlX2ZldGNoX2NiKGluZGV4LCAwLCAyLCBjYWxsYmFjaywgMCwgYnVmX3B0ciwgYnVmX3NpemUsIHVzZXJfZGF0YSk7IH07IC8qKiBAc3VwcHJlc3Mge21pc3NpbmdQcm9wZXJ0aWVzfSAqLyBjb25zdCBmaWxlcyA9IE1vZHVsZS5zb2tvbF9kcm9wcGVkX2ZpbGVzOyByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZXNbaW5kZXhdKTsgfQAodm9pZCk8Ojo+eyAvKiogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gKi8gY29uc3QgY2FudmFzID0gTW9kdWxlLnNhcHBfZW1zY190YXJnZXQ7IGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBNb2R1bGUuc29rb2xfZHJhZ2VudGVyKTsgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIE1vZHVsZS5zb2tvbF9kcmFnbGVhdmUpOyBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBNb2R1bGUuc29rb2xfZHJhZ292ZXIpOyBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIE1vZHVsZS5zb2tvbF9kcm9wKTsgfQAoY29uc3QgY2hhciogY19zdHJfdGFyZ2V0X3NlbGVjdG9yKTw6Oj57IGNvbnN0IHRhcmdldF9zZWxlY3Rvcl9zdHIgPSBVVEY4VG9TdHJpbmcoY19zdHJfdGFyZ2V0X3NlbGVjdG9yKTsgaWYgKE1vZHVsZVsnY2FudmFzJ10gIT09IHVuZGVmaW5lZCkgeyBpZiAodHlwZW9mIE1vZHVsZVsnY2FudmFzJ10gPT09ICdvYmplY3QnKSB7IHNwZWNpYWxIVE1MVGFyZ2V0c1t0YXJnZXRfc2VsZWN0b3Jfc3RyXSA9IE1vZHVsZVsnY2FudmFzJ107IH0gZWxzZSB7IGNvbnNvbGUud2Fybigic29rb2xfYXBwLmg6IE1vZHVsZVsnY2FudmFzJ10gaXMgc2V0IGJ1dCBpcyBub3QgYW4gb2JqZWN0Iik7IH0gfSBNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCA9IGZpbmRDYW52YXNFdmVudFRhcmdldCh0YXJnZXRfc2VsZWN0b3Jfc3RyKTsgaWYgKCFNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCkgeyBjb25zb2xlLndhcm4oInNva29sX2FwcC5oOiBjYW4ndCBmaW5kIGh0bWw1X2NhbnZhc19zZWxlY3RvciAiLCB0YXJnZXRfc2VsZWN0b3Jfc3RyKTsgfSBpZiAoIU1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0LnJlcXVlc3RQb2ludGVyTG9jaykgeyBjb25zb2xlLndhcm4oInNva29sX2FwcC5oOiB0YXJnZXQgZG9lc24ndCBzdXBwb3J0IHJlcXVlc3RQb2ludGVyTG9jazogIiwgdGFyZ2V0X3NlbGVjdG9yX3N0cik7IH0gfQAodm9pZCk8Ojo+eyBpZiAoTW9kdWxlLnNhcHBfZW1zY190YXJnZXQpIHsgaWYgKE1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0LnJlcXVlc3RQb2ludGVyTG9jaykgeyBNb2R1bGUuc2FwcF9lbXNjX3RhcmdldC5yZXF1ZXN0UG9pbnRlckxvY2soKTsgfSB9IH0AKHZvaWQpPDo6PnsgaWYgKGRvY3VtZW50LmV4aXRQb2ludGVyTG9jaykgeyBkb2N1bWVudC5leGl0UG9pbnRlckxvY2soKTsgfSB9AChpbnQgY3Vyc29yX3R5cGUsIGludCBzaG93bik8Ojo+eyBpZiAoTW9kdWxlLnNhcHBfZW1zY190YXJnZXQpIHsgbGV0IGN1cnNvcjsgaWYgKHNob3duID09PSAwKSB7IGN1cnNvciA9ICJub25lIjsgfSBlbHNlIHN3aXRjaCAoY3Vyc29yX3R5cGUpIHsgY2FzZSAwOiBjdXJzb3IgPSAiYXV0byI7IGJyZWFrOyBjYXNlIDE6IGN1cnNvciA9ICJkZWZhdWx0IjsgYnJlYWs7IGNhc2UgMjogY3Vyc29yID0gInRleHQiOyBicmVhazsgY2FzZSAzOiBjdXJzb3IgPSAiY3Jvc3NoYWlyIjsgYnJlYWs7IGNhc2UgNDogY3Vyc29yID0gInBvaW50ZXIiOyBicmVhazsgY2FzZSA1OiBjdXJzb3IgPSAiZXctcmVzaXplIjsgYnJlYWs7IGNhc2UgNjogY3Vyc29yID0gIm5zLXJlc2l6ZSI7IGJyZWFrOyBjYXNlIDc6IGN1cnNvciA9ICJud3NlLXJlc2l6ZSI7IGJyZWFrOyBjYXNlIDg6IGN1cnNvciA9ICJuZXN3LXJlc2l6ZSI7IGJyZWFrOyBjYXNlIDk6IGN1cnNvciA9ICJhbGwtc2Nyb2xsIjsgYnJlYWs7IGNhc2UgMTA6IGN1cnNvciA9ICJub3QtYWxsb3dlZCI7IGJyZWFrOyBkZWZhdWx0OiBjdXJzb3IgPSAiYXV0byI7IGJyZWFrOyB9IE1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0LnN0eWxlLmN1cnNvciA9IGN1cnNvcjsgfSB9ACh2b2lkKTw6Oj57IGNvbnN0IGxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29rb2wtYXBwLWZhdmljb24nKTsgaWYgKGxpbmspIHsgZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZChsaW5rKTsgfSB9AChpbnQgdywgaW50IGgsIGNvbnN0IHVpbnQ4X3QqIHBpeGVscyk8Ojo+eyBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsgY2FudmFzLndpZHRoID0gdzsgY2FudmFzLmhlaWdodCA9IGg7IGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyBjb25zdCBpbWdfZGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEodywgaCk7IGltZ19kYXRhLmRhdGEuc2V0KEhFQVBVOC5zdWJhcnJheShwaXhlbHMsIHBpeGVscyArIHcqaCo0KSk7IGN0eC5wdXRJbWFnZURhdGEoaW1nX2RhdGEsIDAsIDApOyBjb25zdCBuZXdfbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTsgbmV3X2xpbmsuaWQgPSAnc29rb2wtYXBwLWZhdmljb24nOyBuZXdfbGluay5yZWwgPSAnc2hvcnRjdXQgaWNvbic7IG5ld19saW5rLmhyZWYgPSBjYW52YXMudG9EYXRhVVJMKCk7IGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobmV3X2xpbmspOyB9ACh1aW50MzJfdCBsZXZlbCwgY29uc3QgY2hhciogY19zdHIpPDo6PnsgY29uc3Qgc3RyID0gVVRGOFRvU3RyaW5nKGNfc3RyKTsgc3dpdGNoIChsZXZlbCkgeyBjYXNlIDA6IGNvbnNvbGUuZXJyb3Ioc3RyKTsgYnJlYWs7IGNhc2UgMTogY29uc29sZS5lcnJvcihzdHIpOyBicmVhazsgY2FzZSAyOiBjb25zb2xlLndhcm4oc3RyKTsgYnJlYWs7IGRlZmF1bHQ6IGNvbnNvbGUuaW5mbyhzdHIpOyBicmVhazsgfSB9AA==';
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
function sapp_js_add_dragndrop_listeners() { Module.sokol_drop_files = []; Module.sokol_dragenter = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_dragleave = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_dragover = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_drop = (event) => { event.stopPropagation(); event.preventDefault(); const files = event.dataTransfer.files; Module.sokol_dropped_files = files; __sapp_emsc_begin_drop(files.length); for (let i = 0; i < files.length; i++) { withStackSave(() => { const cstr = stringToUTF8OnStack(files[i].name); __sapp_emsc_drop(i, cstr); }); } let mods = 0; if (event.shiftKey) { mods |= 1; } if (event.ctrlKey) { mods |= 2; } if (event.altKey) { mods |= 4; } if (event.metaKey) { mods |= 8; } __sapp_emsc_end_drop(event.clientX, event.clientY, mods); }; /** @suppress {missingProperties} */ const canvas = Module.sapp_emsc_target; canvas.addEventListener('dragenter', Module.sokol_dragenter, false); canvas.addEventListener('dragleave', Module.sokol_dragleave, false); canvas.addEventListener('dragover', Module.sokol_dragover, false); canvas.addEventListener('drop', Module.sokol_drop, false); }
function sapp_js_dropped_file_size(index) { /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files; if ((index < 0) || (index >= files.length)) { return 0; } else { return files[index].size; } }
function sapp_js_fetch_dropped_file(index,callback,buf_ptr,buf_size,user_data) { const reader = new FileReader(); reader.onload = (loadEvent) => { const content = loadEvent.target.result; if (content.byteLength > buf_size) { __sapp_emsc_invoke_fetch_cb(index, 0, 1, callback, 0, buf_ptr, buf_size, user_data); } else { HEAPU8.set(new Uint8Array(content), buf_ptr); __sapp_emsc_invoke_fetch_cb(index, 1, 0, callback, content.byteLength, buf_ptr, buf_size, user_data); } }; reader.onerror = () => { __sapp_emsc_invoke_fetch_cb(index, 0, 2, callback, 0, buf_ptr, buf_size, user_data); }; /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files; reader.readAsArrayBuffer(files[index]); }
function sapp_js_remove_dragndrop_listeners() { /** @suppress {missingProperties} */ const canvas = Module.sapp_emsc_target; canvas.removeEventListener('dragenter', Module.sokol_dragenter); canvas.removeEventListener('dragleave', Module.sokol_dragleave); canvas.removeEventListener('dragover', Module.sokol_dragover); canvas.removeEventListener('drop', Module.sokol_drop); }
function sapp_js_init(c_str_target_selector) { const target_selector_str = UTF8ToString(c_str_target_selector); if (Module['canvas'] !== undefined) { if (typeof Module['canvas'] === 'object') { specialHTMLTargets[target_selector_str] = Module['canvas']; } else { console.warn("sokol_app.h: Module['canvas'] is set but is not an object"); } } Module.sapp_emsc_target = findCanvasEventTarget(target_selector_str); if (!Module.sapp_emsc_target) { console.warn("sokol_app.h: can't find html5_canvas_selector ", target_selector_str); } if (!Module.sapp_emsc_target.requestPointerLock) { console.warn("sokol_app.h: target doesn't support requestPointerLock: ", target_selector_str); } }
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
