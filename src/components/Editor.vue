<template>
  <div class="lottery-editor">
    <h1>信息录入</h1>
    <el-form :model="lotteryModel" class="form" ref="lotteryForm" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="lotteryModel.userName"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="idcard">
        <el-input v-model="lotteryModel.idcard"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="lotteryModel.phone"></el-input>
      </el-form-item>
      <el-form-item label="居住地址" prop="address">
        <el-input v-model="lotteryModel.address"  placeholder="请输入居住地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('lotteryForm')">立即创建</el-button>
        <el-button @click="resetForm('lotteryForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <i class="fa fa-home goback fa-1x" aria-hidden="true" @click="goHome">返回首页</i>
  </div>
</template>
<script>
import axios from 'axios' 
export default {
	data() {
		var idcardValidator = (rule, value, callback) => {
			const reg = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
			if (reg.test(value)) {
				callback()
			} else {
				callback(new Error('身份证号码的格式不正确'))
			}
		}
		var phoneValidator = (rule, value, callback) => {
			const reg = /^1[34578]\d{9}$/
			if (reg.test(value)) {
				callback()
			} else {
				callback(new Error('手机号的格式不正确'))
			}
		}
		return {
			lotteryModel: {
				userName: '',
				idcard: '',
				phone: '',
				address: '',
				issue: 1
			},
			rules: {
				userName: [
					{required: true, message: '请输入用户名', trigger: 'blur'}
				],
				idcard: [
					{required: true, message: '请输入身份证号码', trigger: 'blur'},
					{validator: idcardValidator, trigger: 'blur'}
				],
				phone: [
					{required: true, message: '请输入手机号', trigger: 'blur'},
					{validator: phoneValidator, trigger: 'blur'}
				]
			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postAsync()
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		postAsync() {
			const model = {
				name: this.lotteryModel.userName, 
				idcard: this.lotteryModel.idcard,
				phone: this.lotteryModel.phone,
				address: this.lotteryModel.address,
				issue: this.lotteryModel.issue
			}
			axios.post('/api/addchip', model).then(respone => {
				alert('success')
			}).catch(error => {
				alert('faild')
			})
    },
    goHome() {
      this.$router.push({path: '/'})
    }
	}
}
</script>
<style lang="scss" scoped>
.lottery-editor {
    width: 100%;
    margin-top: 5%;
    text-align: center;
    .goback {
      display: block;
      cursor: pointer;
    }
    .form {
      width: 50%;
      display: inline-block;
    }
}
</style>

