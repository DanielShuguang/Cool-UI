<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <my-button type="primary" @click="clickButton" round>确定按钮</my-button>
    <my-select @change="changeSelect" editable v-model="selected">
      <my-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        :disabled="item.value === '4'"
      />
    </my-select>
    <MyInput v-model="inputValue" />
    <my-checkbox disabled v-model="radioVal">勾选框</my-checkbox>
    <my-form ref="formRef" :model="formData" :rules="rules">
      <form-item label="表单内容1" prop="input">
        <my-input v-model="formData.input" />
      </form-item>
      <form-item label="内容2" prop="input2">
        <my-input v-model="formData.input2" />
      </form-item>
      <form-item label="表单内容3" prop="input3">
        <my-input v-model="formData.input3" />
      </form-item>
    </my-form>
    <my-button @click="submit">submit</my-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, onUpdated, DefineComponent } from 'vue'
import MyButton from '@/components/button/Button.vue'
import MySelect from '@/components/select/Select.vue'
import MyInput from '@/components/input/Input.vue'
import MyOption from '@/components/select/Option.vue'
import MyCheckbox from '@/components/checkBox/Checkbox.vue'
import { OptionProps } from './typings/ISelect'
import MyForm from './components/form/Form.vue'
import FormItem from './components/form/FormItem.vue'
import { IFormRule } from './typings/IForm'

export default defineComponent({
  name: 'App',
  components: {
    MyButton,
    MySelect,
    MyInput,
    MyOption,
    MyCheckbox,
    MyForm,
    FormItem
  },
  setup() {
    const selected = ref('')
    const options = reactive<OptionProps[]>([])
    const inputValue = ref('')
    const radioVal = ref(false)
    const formData = reactive({
      input: '',
      input2: '',
      input3: ''
    })
    const formRef = ref<DefineComponent | null>(null)
    const rules = reactive<Record<string, IFormRule>>({
      input: { type: 'required', message: '必填' },
      input2: { type: 'required', message: '必填' },
      input3: { type: 'required', message: '必填' }
    })

    function changeSelect() {
      console.log('change', selected.value)
    }

    function clickButton(ev: MouseEvent) {
      console.log(ev)
    }
    const submit = () => {
      if (formRef.value) {
        const result: boolean = formRef.value.formValidate()
        console.log(formRef.value, result)
      }
    }

    onUpdated(() => {
      // console.log('selected', selected.value)
      // console.log('radio', radioVal.value)
    })
    onMounted(() => {
      for (let i = 1; i < 20; i++) {
        options.push({ value: i.toString(), label: '选项' + i })
      }
    })

    return {
      selected,
      options,
      inputValue,
      radioVal,
      changeSelect,
      clickButton,
      formData,
      rules,
      formRef,
      submit
    }
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.app {
  > * {
    margin-right: 20px;
  }
}
</style>
