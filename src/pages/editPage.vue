<template>
  <div class="edit-index">
    <div class="edit">
      <div>
        <strong><span class="span"></span>基本信息</strong>
        <van-field v-model="userInfo.height" type="number" label="身高:" maxlength="3" placeholder="只能填数字，最多3位数">
          <template #button>
            CM
          </template>
        </van-field>
        <van-field v-model="userInfo.pregnantBeforeHeight" type="number" @blur="onBlur" label="孕前体重:" placeholder="精确到小数点后1位">
          <template #button>
            Kg
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="userInfo.dateBirth"
          label="预产期:"
          placeholder="选择预产期"
          @click="showPicker = true"
        />
      </div>
      <div>
        <strong><span class="span"></span>健康信息</strong>
        <div>
          <div class="radioTitle">
            <div class="radioName">
              是否有慢性病：
            </div>
            <van-radio-group v-model="userInfo.isSlowDiseases" direction="horizontal" @change="handleChange(userInfo.isSlowDiseases, '慢性病')">
              <van-radio :name="1" checked-color="#E4007F" icon-size="16px">是</van-radio>
              <van-radio :name="2" checked-color="#E4007F" icon-size="16px">否</van-radio>
            </van-radio-group>
          </div>
          <div class="border" v-if="userInfo.isSlowDiseases === 1"><van-field v-model="userInfo.chronicDiseaseInformation" label="" placeholder="请输入病症" /></div>
        </div>
        <div>
          <div class="radioTitle">
            <div class="radioName">
              是否有妊娠期疾病：
            </div>
            <van-radio-group v-model="userInfo.isPregnancyDiseases" direction="horizontal" @change="handleChange(userInfo.isPregnancyDiseases, '妊娠期疾病')">
              <van-radio :name="1" checked-color="#E4007F" icon-size="16px">是</van-radio>
              <van-radio :name="2" checked-color="#E4007F" icon-size="16px">否</van-radio>
            </van-radio-group>
          </div>
          <div class="border" v-if="userInfo.isPregnancyDiseases === 1"><van-field v-model="userInfo.pregnancyDiseaseInformation" label="" placeholder="请输入病症" /></div>
        </div>

      </div>
      <div>
        <div v-for="(item,index) in userInfo.list" :key="index">
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <strong><span class="span"></span>宝宝信息{{index+1}}</strong>
            <span style="font-size: 13px;color: #999;" @click="deleteBaby(index, userInfo.list, item)">删除</span>
          </div>
          <van-field
            readonly
            clickable
            required
            name="datetimePicker"
            :value="item.birthday"
            label="宝宝生日"
            placeholder="选择宝宝生日"
            @click="item.showBabyBri = true"
          />
          <van-popup v-model="item.showBabyBri" position="bottom">
            <van-datetime-picker
              type="date"
              v-model="item.currentDate"
              title="选择宝宝生日"
              :min-date="babyminDate"
              @confirm="onBabyConfirmTime(item)"
              @cancel="item.showBabyBri = false"
            />
          </van-popup>
          <div class="radioTitle">
            <van-field
              readonly
              required
              label="宝宝性别："
            />
            <van-radio-group v-model="item.sex" direction="horizontal">
              <van-radio :name="1" checked-color="#E4007F" icon-size="16px">小王子</van-radio>
              <van-radio :name="2" checked-color="#E4007F" icon-size="16px">小公主</van-radio>
            </van-radio-group>
          </div>
          <div class="radioTitle">
            <van-field
              readonly
              required
              label="喂养方式："
            />
            <van-radio-group v-model="item.feedingWay" direction="horizontal">
              <van-radio :name="1" checked-color="#E4007F" icon-size="16px">母乳</van-radio>
              <van-radio :name="2" checked-color="#E4007F" icon-size="16px">奶粉</van-radio>
              <van-radio :name="3" checked-color="#E4007F" icon-size="16px">混合喂养</van-radio>
            </van-radio-group>
          </div>
          <div>
            <div class="radioTitle">
              <van-field
                readonly
                required
                :label-width="200"
                label="宝宝是否有先天性疾病："
              />
              <van-radio-group v-model="item.isCongenitalDisease" direction="horizontal" @change="babyChange(item)">
                <van-radio :name="1" checked-color="#E4007F" icon-size="16px">是</van-radio>
                <van-radio :name="2" checked-color="#E4007F" icon-size="16px">否</van-radio>
              </van-radio-group>
            </div>
            <div class="border" v-if="item.isCongenitalDisease === 1"><van-field v-model="item.congenitalDiseaseInformation" label="" placeholder="请输入病症" /></div>
          </div>

          <div>
            <div class="radioTitle">
              <van-field
                readonly
                required
                :label-width="200"
                label="宝宝是否有过敏食物："
              />
              <van-radio-group v-model="item.isFoodAllergy" direction="horizontal" @change="allergyChange(item)">
                <van-radio :name="1" checked-color="#E4007F" icon-size="16px">是</van-radio>
                <van-radio :name="2" checked-color="#E4007F" icon-size="16px">否</van-radio>
              </van-radio-group>
            </div>
            <div class="border" v-if="item.isFoodAllergy === 1"><van-field v-model="item.allergicFoodInformation" label="" placeholder="请输入过敏食物" /></div>
          </div>
        </div>
        <span @click="addTool" class="addBaby">
          +添加宝宝信息
        </span>
        <br />
        <span style="font-size: 12px;color: #E4007F;">最多可以添加3个宝宝信息</span>
      </div>
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="date"
          title="选择预产期"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirmTime"
          @cancel="showPicker = false"
        />
      </van-popup>
    </div>
    <div class="btn">
      <div class="cancelBtn" @click="cancelBtn">
        取消
      </div>
      <div class="saveBtn" @click="saveData">
        保存
      </div>
    </div>
  </div>
</template>

<script>
  import { archivesGet, archivesEd, deleteArchive } from '@/api/helloTest';
  import Vue from 'vue';
  import { Field,DatetimePicker, Button,RadioGroup, Radio,Popup, Dialog, Toast } from 'vant';
  Vue.use(Field).use(DatetimePicker).use(Button).use(RadioGroup).use(Radio).use(Popup).use(Dialog).use(Toast);
  
  export default {
    name: "HelloTest",
    data() {
      return {
        count: 0, // 计数器检测是否修改
        showPicker: false,
        minDate: new Date(),
        babyminDate: new Date(2017, 0, 1),
        maxDate: new Date(Date.now()+25920000000),
        userInfo: {
          height: '',
          pregnantBeforeHeight: '',
          dateBirth: '',
          isSlowDiseases: '',
          chronicDiseaseInformation: '',
          isPregnancyDiseases: '',
          pregnancyDiseaseInformation: '',
          list: [
            {
              index: 0,
              birthday: '', // 宝宝生日
              sex: '',
              currentDate: new Date(),
              feedingWay: '',     // 喂养方式
              isCongenitalDisease: '',  // 宝宝是否有先天性疾病
              congenitalDiseaseInformation: '',
              isFoodAllergy: '',  // 宝宝是否有过敏食物：
              allergicFoodInformation:  '',
              showBabyBri: false,
            }
          ]
        }
      }
    },
    updated:function () {
      this.count = this.count + 1
    },
    created() {
      // 获取详情
      this.archivesGet();
    },
    methods: {
      async archivesGet() {
        var uid = this.$route.query.uid;
        var data = await archivesGet({}, uid);
        if (data && data.babyVos && data.babyVos.length !== 0) {
          data.babyVos.map( (it, index) => {
            it.index = index;
            it.showBabyBri = false;
            it.birthday = it.birthday ? it.birthday : '';
            it.currentDate = it.birthday ? it.birthday : new Date();
          })
        }
        this.userInfo = {
          height: data.height,
          pregnantBeforeHeight: data.pregnantBeforeHeight,
          dateBirth: data.dateBirth,
          isSlowDiseases: data.isSlowDiseases,
          chronicDiseaseInformation: data.chronicDiseaseInformation,
          isPregnancyDiseases: data.isPregnancyDiseases,
          pregnancyDiseaseInformation: data.pregnancyDiseaseInformation,
          list: data.babyVos
        }
      },
      onConfirmTime(time) {
        this.userInfo.dateBirth = this.formatDate(time, 'YY/MM/DD');
        this.showPicker = false;
      },
      onBabyConfirmTime(item) {
        console.log(item)
        item.birthday = this.formatDate(item.currentDate, 'YY/MM/DD');
        item.showBabyBri = false;
      },
      addTool() {
        if (this.userInfo.list.length < 3) {
          this.userInfo.list.push({
            index: this.userInfo.list.length,
            birthday: '', // 宝宝生日
            sex: '',
            currentDate: new Date(),
            feedingWay: '',     // 喂养方式
            isCongenitalDisease: '',  // 宝宝是否有先天性疾病
            congenitalDiseaseInformation: '',
            isFoodAllergy: '',  // 宝宝是否有过敏食物：
            allergicFoodInformation:  '',
            showBabyBri: false,
          })
          this.userInfo.list = [...this.userInfo.list];
        } else {
          Toast('最多添加3个宝宝信息~');
        }
      },
      async deleteBaby(index, arr, item) {
        if (item.id) {
          var params = {
            id: item.id,
            type: 3, // 1 排卵, 2预产, 3宝宝生日
          }
          await deleteArchive(params);
        }
        arr.splice(index, 1)
        for (let i in arr) {
          arr[i].index = i
        }
      },
      onBlur(e) {
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
        this.userInfo.pregnantBeforeHeight = e.target.value;
      },
      async saveData() {
        var flag = true;
        this.userInfo.list.forEach( item => {
          if (item.birthday == '' ||  item.sex == '' || item.feedingWay == '' || item.isCongenitalDisease == '' || item.isFoodAllergy == '') {
            Toast('请完善宝宝信息~');
            flag = false;
            return false
          } else if (item.isCongenitalDisease == 1 && item.congenitalDiseaseInformation == "") {
            Toast('请输入病症~');
            flag = false;
            return false
          } else if (item.isFoodAllergy == 1 && item.allergicFoodInformation == "") {
            Toast('请输入过敏食物~');
            flag = false;
            return false
          }
        })
        if (flag) {
          let params = {
            model: {
              uid: this.$route.query.uid,
              height: this.userInfo.height,   // 身高
              pregnantBeforeHeight: this.userInfo.pregnantBeforeHeight,   // 体重
              dateBirth: this.userInfo.dateBirth,
              isSlowDiseases: this.userInfo.isSlowDiseases,   // 是否有慢性病
              chronicDiseaseInformation: this.userInfo.chronicDiseaseInformation,   // 慢性病备注
              isPregnancyDiseases: this.userInfo.isPregnancyDiseases,  // 是否需有妊娠期疾病
              pregnancyDiseaseInformation: this.userInfo.pregnancyDiseaseInformation,   // 妊娠期疾病备注
              babyVos: [...this.userInfo.list],
            },
          };
          await archivesEd(params);
          this.$router.go(-1);
        }
      },
      cancelBtn() {
        if (this.count > 1) {
          Dialog.confirm({
            message: '您还填写的信息未保存，退出后将不会储存您填写的信息，是否确定退出当前页面？',
          })
            .then(() => {
              this.count = 0;
              this.$router.go(-1);
            })
            .catch(() => {

            });
        } else {
          this.$router.go(-1);
        }

      },
      handleChange(value, title) {
        if (value === 2) {
          if (title === '慢性病') {
            this.userInfo.chronicDiseaseInformation = '';
          } else {
            // 妊娠期疾病
            this.userInfo.pregnancyDiseaseInformation = '';
          }
        }
      },
      babyChange(item) {
        if (item.isCongenitalDisease === 2) {
          item.congenitalDiseaseInformation = '';
        }
      },
      allergyChange(item) {
        if (item.isFoodAllergy === 2) {
          item.allergicFoodInformation = '';
        }
      },
      formatDate(time,format='YY-MM-DD hh:mm:ss'){
        var date = new Date(time);
        var year = date.getFullYear(),
          month = date.getMonth()+1,//月份是从0开始的
          day = date.getDate(),
          hour = date.getHours(),
          min = date.getMinutes(),
          sec = date.getSeconds();
        var preArr = Array.apply(null,Array(10)).map(function(elem, index) {
          return '0'+index;
        });////开个长度为10的数组 格式为 00 01 02 03

        var newTime = format.replace(/YY/g,year)
                  .replace(/MM/g,preArr[month]||month)
                  .replace(/DD/g,preArr[day]||day)
                  .replace(/hh/g,preArr[hour]||hour)
                  .replace(/mm/g,preArr[min]||min)
                  .replace(/ss/g,preArr[sec]||sec);

        return newTime;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .edit-index {
    width: 100%;
    .edit {
      padding: rem(30) rem(30) rem(100) rem(30);
      .span {
        width: rem(6);
        height: rem(28);
        background-color: #E4007F;
        display: inline-block;
        margin-right: rem(13);
      }
      strong {
        display: block;
        font-size: rem(30);
      }
      .radioTitle {
        margin: rem(30) 0;
        font-size: rem(28);
        .radioName {
          margin: rem(20) rem(30);
        }
      }
      .border {
        border: 1px solid #f5f5f5;
        margin: rem(20) 0;
        border-radius: 5px;
      }
      .addBaby {
        padding: 5px 10px;
        border-radius: 20px;
        font-size: rem(28);
        border: 1px solid #E4007F;
        color: #E4007F;
        display: inline-block;
        margin: 10px;
      }
    }
    .btn {
      position: fixed;
      bottom: 0;
      width: 80%;
      height: rem(80);
      line-height: rem(80);
      text-align: center;
      font-size: rem(30);
      letter-spacing: 2px;
      margin: rem(20) 10%;
      overflow: hidden;
      display: flex;
      .saveBtn {
        background-color: #E4007F;
        color: #fff;
        width: 40%;
        margin: 0 5%;
        border-radius: 20px;
      }
      .cancelBtn {
        width: 40%;
        margin: 0 5%;
        color: #E4007F;
        border: 1px solid #E4007F;
        background-color: #fff;
        border-radius: 20px;
      }
    }
    /deep/.van-radio-group--horizontal {
      margin-left: rem(30);
    }
  }
</style>
