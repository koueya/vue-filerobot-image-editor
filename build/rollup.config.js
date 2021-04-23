import commonjs from "@rollup/plugin-commonjs"; // Converti les modules CommonJS en ES6
import vue from "rollup-plugin-vue"; // Gère les composants .vue
import buble from "@rollup/plugin-buble"; // Permet un polyfill de notre code pour un meilleur support sur les navigateurs

export default {
  input: "src/wrapper.js", // Fichier relatif en partant de notre fichier package.json
  output: {
    name: "VueFilerobotImageEditor",
    exports: "named",
  },
  plugins: [
    commonjs(),
    vue({
      css: true, // Injecte dynamiquement notre CSS dans une balise <style>
      compileTemplate: true, // Converti notre template en fonction de rendu Vue
    }),
    buble(), // Traduit en ES5
  ],
};
