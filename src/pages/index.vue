<template>
  <div class="c-index">
    <div class="noEdit">
      <div class="block">
        <strong><span class="span"></span>基础信息</strong>
        <div class="cell">
          <span>身高：</span>
          <span>{{userInfo.height ? userInfo.height+'CM' : ""}}</span>
        </div>
        <div class="cell">
          <span>孕前体重：</span>
          <span>{{userInfo.pregnantBeforeHeight? userInfo.pregnantBeforeHeight+'KG' : ''}}</span>
        </div>

        <div class="cell">
          <span>预产期：</span>
          <span>{{userInfo.dateBirth}}</span>
        </div>

      </div>
      <div class="block">
        <strong><span class="span"></span>健康信息</strong>
        <div class="cell">
          <span>是否有慢性病：</span>
          <span v-if="userInfo.isSlowDiseases === 1">是</span>
          <span v-else-if="userInfo.isSlowDiseases === 2">否</span>
          <span v-else></span>
        </div>
        <div class="cellHtml" v-if="userInfo.isSlowDiseases === 1">
          慢性病症：{{userInfo.chronicDiseaseInformation}}
        </div>
        <div class="cell">
          <span>是否有妊娠期疾病：</span>
          <span v-if="userInfo.isPregnancyDiseases === 1">是</span>
          <span v-else-if="userInfo.isPregnancyDiseases === 2">否</span>
          <span v-else></span>
        </div>
        <div class="cellHtml" v-if="userInfo.isPregnancyDiseases === 1">
          妊娠期疾病：{{userInfo.pregnancyDiseaseInformation}}
        </div>
      </div>
      <div class="block" v-for="(item,index) in userInfo.babyVos" :key="index">
        <strong><span class="span"></span>宝宝信息{{index+1}}</strong>
        <div class="cell">
          <span>宝宝生日：</span>
          <span>{{item.birthday}}</span>
        </div>
        <div class="cell">
          <span>宝宝性别：</span>
          <span v-if="item.sex === 1">小王子</span>
          <span v-else-if="item.sex === 2">小公主</span>
          <span v-else></span>
        </div>
        <div class="cell">
          <span>喂养方式：</span>
          <span v-if="item.feedingWay === 1">母乳</span>
          <span v-if="item.feedingWay === 2">奶粉</span>
          <span v-if="item.feedingWay === 3">混合喂养</span>
        </div>
        <div class="cell">
          <span>宝宝是否有先天性疾病：</span>
          <span v-if="item.isCongenitalDisease === 1">是</span>
          <span v-else-if="item.isCongenitalDisease === 2">否</span>
          <span v-else></span>
        </div>
        <div class="cellHtml"  v-if="item.isCongenitalDisease === 1">
          先天性疾病：{{item.congenitalDiseaseInformation}}
        </div>
        <div class="cell">
          <span>宝宝是否有过敏食物：</span>
          <span v-if="item.isFoodAllergy === 1">是</span>
          <span v-else-if="item.isFoodAllergy === 2">否</span>
          <span v-else></span>
        </div>
        <div class="cellHtml" v-if="item.isFoodAllergy === 1">
          过敏食物：{{item.allergicFoodInformation}}
        </div>
      </div>

    </div>
    <div class="editBtn" @click="editArchives">
      编辑档案
    </div>
  </div>
</template>

<script>
  import { archivesGet } from '@/api/helloTest';
  export default {
    name: "index",
    data() {
      return {
        userInfo: {}
      }
    },
    created() {
      this.archivesGet();
    },
    methods: {
      async archivesGet() {
        var uid = this.$route.query.uid;
        var data = await archivesGet({}, uid);
        this.userInfo = data;
      },
      editArchives() {
        this.$router.push({
          name: 'editPage',
          query: {
            uid: this.$route.query.uid
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .c-index {
    width: 100%;
    min-height: 100vh;
    .noEdit {
      padding: rem(30) rem(30) rem(100) rem(30);
      .block {
        margin-top: rem(40);
        .span {
          width: rem(6);
          height: rem(28);
          background-color: #E4007F;
          display: inline-block;
          margin-right: rem(13);
        }
        strong {
          margin-bottom: 10px;
          display: block;
          font-size: rem(30);
        }
        .cell {
          font-size: rem(28);
          height: rem(80);
          line-height: rem(80);
          display: flex;
          span {
            width: 50%;
            display: inline-block;
            text-indent: rem(27);
            border: 1px solid #E5E5E5;
            box-sizing: border-box;
            margin-top: -1px;
            margin-right: -1px;
          }
        }
        .cellHtml {
          font-size: rem(28);
          margin: 10px 0;
        }
      }
    }
    .editBtn {
      position: fixed;
      bottom: 0;
      width: 80%;
      background-color: #E4007F;
      border-radius: 20px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      font-size: rem(30);
      margin: 10px 10%;
      font-family:PingFang SC;
      font-weight:400;
    }
  }
</style>
