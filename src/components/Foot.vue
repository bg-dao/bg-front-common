<template>
  <div>
    <div class="FooterPC" v-if="!isMobile">
      <div class="FooterPC-layout flext flex-jus-between">
        <div class="FooterPC-left">
          <div class="FooterPC-navTitle">网站导航</div>
          <div class="FooterPC-block flex">
            <div class="FooterPC-left-width"><router-link to="/">首页</router-link></div>
            <div class="FooterPC-left-width"><router-link to="/">交易</router-link></div>
            <div class="FooterPC-left-width"><router-link to="/">区块</router-link></div>
          </div>
          <div class="FooterPC-block flex">
            <div class="FooterPC-block flex">
              <!-- <div class="FooterPC-left-width"><router-link to="/">溯源</router-link></div>
              <div class="FooterPC-left-width"><router-link to="/">存证</router-link></div> -->
            </div>
          </div>

          <!-- <div class="FooterPC-block">
            <div class="flex" >
              <img src="@/assets/img/common/gongan.png" alt="" style="margin-right: 5px" />
              <a href="https://beian.miit.gov.cn/" target="_blank" style="margin-right: 10px">闽ICP备2022017092号-1</a>
              <a href="https://beian.miit.gov.cn/" target="_blank">鲁班链（厦门）数字技术有限公司</a>
            </div>
          </div> -->
        </div>
        <div class="FooterPC-mid">
          <div class="FooterPC-navTitle">友情链接</div>
          <div class="FooterPC-block flex">
            <router-link to="/">可信工程平台</router-link>
          </div>
          <div class="FooterPC-block flex">
            <router-link to="/">供应链平台</router-link>
          </div>
        </div>
        <div class="FooterPC-right">
          <div class="FooterPC-navTitle">联系我们</div>
          <div class="FooterPC-block flex">
            <div>客服热线：400-678-5777</div>
          </div>
          <div class="FooterPC-block flex">
            <div>邮箱：lianjian@lj-ch.com</div>
          </div>
          <div class="FooterPC-block flex">
            <div>地址：厦门市思明区湖滨东路93号华润大厦A座20层</div>
          </div>
        </div>
      </div>
    </div>
    <div class="FooterPC-beian flex flex-jus-center" v-if="!isMobile">
      <div>闽公网安备 35020302034979号</div>
      <div>闽ICP备2021011497号-3</div>
      <div>闽网信备35020321248937100010号</div>
    </div>
    <div class="Footer" v-else></div>
  </div>
</template>

<script>
import { useAppStore } from "@/stores/app.js"
import { mapState } from "pinia"
export default {
  name: "Foot",
  data() {
    return {
      navList: ["index", "block", "tx", "dna"],
    }
  },
  computed: {
    ...mapState(useAppStore, ["isMobile"]),
  },
}
</script>

<style lang="scss">
.FooterPC {
  width: 100%;
  background: $color0;
  height: 234px;
  padding: 40px 0 28px 0;
  font-size: $fontS2;
  color: $color4;
  a {
    font-size: $fontS2;
    color: $color4;
    &:hover {
      color: $colorB;
    }
  }
  .FooterPC-layout {
    width: 1140px;
    margin: 0 auto;
  }
  .FooterPC-navTitle {
    font-size: $fontS3;
    font-weight: 600;
    color: $colorB;
    margin-bottom: 12px;
  }
  .FooterPC-block {
    height: 44px;
    line-height: 44px;
  }
  .FooterPC-left {
    width: 465px;
    .FooterPC-left-width {
      width: 96px;
    }
  }
  .FooterPC-mid {
    width: 330px;
  }
  .FooterPC-right {
    width: 345px;
  }
}

.FooterPC-beian {
  width: 100%;
  height: 64px;
  background: #f5f6fa;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  gap: 88px;
}
</style>
