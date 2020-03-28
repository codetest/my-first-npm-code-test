<template>
    <div>
        <div v-show="showLoading" :style="StyleOpt" class="loading"></div>
        <div v-show="!showLoading" :style="backgrounStyle"/>
    </div>
</template>
<script lang="ts">
    import Vue from "vue"
    import { Component, Prop } from "vue-property-decorator"
    import {ImageInfo} from "./ImageInfo"
    @Component({name: "App"})
    export default class App extends Vue{
        @Prop()
        Source: string;
        @Prop()
        StyleOpt: any
        showLoading: boolean = false
        backgrounStyle: any = {}

        adjustImageInfo(info: ImageInfo, dstWidth: number, dstHeight: number) {
            var dstHeightToWidthRatio = dstHeight / dstWidth;
            var srcHeightToWidthRadio = info.Height / info.Width
            var factor: number = 1;
            if (srcHeightToWidthRadio > dstHeightToWidthRatio) {
                factor = info.Width / dstWidth;
                info.Width = dstWidth;
                info.Height = info.Height / factor;
            }
            else {
                factor = info.Height / dstHeight;
                info.Height = dstHeight;
                info.Width = info.Width / factor;
            }

            return info
        }

        formatCss(info: ImageInfo, x: number, y: number): any {
            let backgroundPosition: string = -x + "px " + -y + "px"
            let backgroundSize: string = info.Width + "px " + info.Height + "px"
            var dict: any = {
                "background-image": "url('" + info.Url + "')",
                "background-position": backgroundPosition,
                "width": this.StyleOpt.width,
                "height": this.StyleOpt.height,
                "background-size": backgroundSize
            };

            return dict;
        }

        formatStyleOpt(info: ImageInfo) {
            var dstHeight = parseFloat(this.StyleOpt.height);
            var dstWidth = parseFloat(this.StyleOpt.width);
            info = this.adjustImageInfo(info, dstWidth, dstHeight)
            if (info.Width == dstWidth) {
                var y = (info.Height - dstHeight) / 2;
                this.backgrounStyle = this.formatCss(info, 0, y)
            }
            else {
                var x = (info.Width - dstWidth) / 2;
                this.backgrounStyle = this.formatCss(info, x, 0)
            }

            for (var prop in this.StyleOpt) {
                if (prop !== "width" && prop !== "height") {
                    this.backgrounStyle[prop] = this.StyleOpt[prop]
                }
            }
        }

        onImageUpdate(info: ImageInfo) {
            if (this.Source === info.Url) {
                if (info.Width === 0 || info.Height === 0) {
                    this.showLoading = true
                }
                else {
                    this.showLoading = false
                    this.formatStyleOpt(info)
                }
            }
        }

        mounted() {
            var img = new Image()
            img.src = this.Source
            img.onload = () => {
                this.onImageUpdate({Width: img.width, Height: img.height, Url: this.Source})
            }

            img.onerror = () => {
                this.onImageUpdate({Width: 0, Height: 0, Url: ""})
            }
        }
    }
</script>
<style lang="css">
    .loading{
        background-color: gray;
    }
</style>