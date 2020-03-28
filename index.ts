import ImageComp from "./src/app.vue"
import Vue from 'vue'

var installed: boolean = false
function install(){
    if (installed) return;
    installed = true
    Vue.component('ImageComp', ImageComp)
}

(<any>ImageComp).install = install;
export default ImageComp;