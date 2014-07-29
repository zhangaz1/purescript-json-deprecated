module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({ 
  
    libFiles: [
      "src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs",
    ],
    
    clean: {
      tests: ["tmp"],
      lib:   ["output"]
    },
  
    pscMake: ["<%=libFiles%>"],
    dotPsci: ["<%=libFiles%>"],
    docgen: {
        readme: {
            src: "src/**/*.purs",
            dest: "tmp/documentation.md"
        }
    },

    psc: {
      tests: {
        options: {
          module: ["Main"],
          main: true
        },
        src: ["tests/Test.purs", "<%=libFiles%>"],
        dest: "tmp/tests.js"
      }
    },

    execute: {
      tests: {
        src: "tmp/tests.js"
      },
      gen_readme: {
        src: "gen-readme.js"
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-purescript");
  grunt.loadNpmTasks("grunt-execute");
  
  grunt.registerTask("test", ["clean:tests", "psc:tests", "execute:tests"]);
  grunt.registerTask("make", ["pscMake", "dotPsci", "docgen", "execute:gen_readme"]);
  grunt.registerTask("default", ["test", "make"]);
};
