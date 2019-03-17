<template>
  <div class="main">
    <div class="top-region">
      <span class="title">摇号系统</span>
      <i class="fa fa-cog go-editor" aria-hidden="true" @click="goeditor">进入后台</i>
      <span class="start" @click="start">Ready GO</span>
    </div>
    <div class="content">
      <div class="title">结果列表</div>
      <div class="table-head">
        <span :style="{width: '10%'}">序号</span>
        <span :style="{width: '20%'}">姓名</span>
        <span :style="{width: '40%'}">身份证号</span>
        <span :style="{width: '30%'}">手机号</span>
      </div>
      <div class="table-body" :style="{height: maxHeight + 'px'}">
        <transition-group name="lottery-group" tag="p">
          <div class="row" v-for="item in lotteries" :key="item.idcard">
            <span :style="{width: '10%'}">{{item.num}}</span>
            <span :style="{width: '20%'}">{{item.name}}</span>
            <span :style="{width: '40%'}">{{item.idcard}}</span>
            <span :style="{width: '30%'}">{{item.phone}}</span>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { clearInterval } from 'timers';
export default {
  data() {
    return {
      chips: [],
      lotteries: [],
      isbusy: false,
      maxHeight: 200
    }
  },
  methods: {
    start() {
      this.lotteries = []
      if (this.isbusy) {
        this.$notify({
          title: '警告',
          message: '正在摇号中...',
          type: 'warning'
        });
        return
      }
      this.isbusy = true
      axios.get('/api/chips').then(result => {
        if (result.data && result.data.length > 0) {
          const len = result.data.length
          let index = 0
          const addInterval = setInterval(() => {
            const newItem = this._transform(result.data[index])
            newItem.num = this.lotteries.length + 1
            this.lotteries.push(newItem)
            index++
            if (index === len) {
              window.clearInterval(addInterval)
              this.isbusy = false
            }
          }, 800);
        }
      }).catch(err => {
        this.$message.error('很遗憾，获取用户列表出错了！')
        console.error(err)
        this.isbusy = false
      })
    },
    goeditor() {
      this.$router.push({path: '/editor'})
    },
    // 将对象的属性名改为小写
    _transform(obj) {
      const newObj = {}
      for (var attr in obj) {
        newObj[attr.toLowerCase()] = obj[attr]
      }
      return newObj
    }
  },
  mounted() {
    this.maxHeight = document.body.clientHeight - 250
  }
}
</script>
<style lang="scss" scoped>
.main {
  .top-region {
    height: 140px;
    position:static;
    background-color: #1fa67a;
    .title {
      color: white;
      font-size: 70px;
      display: inline-block;
      margin:10px 0px 0px 30px;
      text-shadow: 4px 3px 0 #1d9d74, 9px 8px 0 rgba(0,0,0,0.15)
    }
    .start {
      text-align: center;
      border-radius: 20px;
      line-height: 60px;
      width: 200px;
      float: right;
      color: #238ae6;
      font-weight: 600;
      font-size: 22px;
      background-color: white;
      margin: 40px 5% 0px 0px;
      height: 60px;
      &:hover {
        background-color: #286090;
        color: white;
        border: #286090;
        cursor: pointer;
      }
    }
    .go-editor {
      float:right;
      margin: 10px;
      cursor: pointer;
      font-size: 14px;
      color: white;
      &:hover {
        color: #286090;
      }
    }
  }
  .content {
    margin-top: 20px;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    .title {
      font-family: museo-slab,Georgia,"Times New Roman",Times,serif;
      font-size: 30px;
      font-weight: 500;
      color: #238ae6;
      border-bottom: 1px solid #eee;
    }
    .table-head {
      width: 100%;
      margin-top: 10px;
      border-bottom: 1px solid #EBEEF5;
      height: 40px;
      line-height: 40px;
      span {
        display: inline-block;
        text-align: center;
        font-weight: bold;
        color:#909399;
      }
    }
    .table-body {
      width: 100%;
      overflow-y: auto;
      .row {
        height: 48px;
        border-bottom: 1px solid #EBEEF5;
        line-height: 48px;
        span {
          display: inline-block;
          text-align: center;
        }
      }
    }
  }

  .lottery-group-enter-active, .lottery-group-leave-active {
    transition: all 1s;
  }
  .lottery-group-enter, .lottery-group-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>

