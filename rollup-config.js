import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify';

export default {
  entry: 'src/main-aot.js',
  dest: 'aot/dist/build.js', // output a single application bundle
  sourceMap: false,
  sourceMapFile: 'aot/dist/build.js.map',
  format: 'iife',
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message );
  },
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      commonjs({
        include: [
          'node_modules/rxjs/**',
          'node_modules/ag-grid-angular/**',
          'node_modules/ng2-codemirror/**',
          'node_modules/socket.io-client/**',
          'node_modules/moment/**',
          'node_modules/hammerjs/**'
        ],
        namedExports: {
          'node_modules/ag-grid-angular/main.js': ['AgGridModule'],
          'node_modules/ng2-codemirror/lib/codemirror.js': ['CodemirrorModule']
        }
      }),
      uglify()
  ]
}