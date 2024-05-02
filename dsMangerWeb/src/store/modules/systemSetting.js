import { defineStore } from 'pinia'

export const useSystemSettingStore = defineStore('systemSettingStore', {
  // 推荐用于完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      active: false,
      theme: null
    }
  },
  persist: true,
})