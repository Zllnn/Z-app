<template>
  <div class="address-edit-box">
    <!--新增和编辑使用同一个页面，所以根据 type 判断，是新增还是编辑，-->
    <s-header :name="`${state.type == 'add' ? '新增地址' : '编辑地址'}`"></s-header>
    <van-address-edit class="edit"
     :area-list="state.areaList" 
     :address-info="state.addressInfo"
     :show-delete="state.type == 'edit'"
     show-set-default
     show-search-result
     :search-result="state.searchResult"
     :is-switch-default="state.isSwitchDefault"
     :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { showToast } from 'vant'
import sHeader from '@/components/SimpleHeader.vue'
import { addAddress, EditAddress, DeleteAddress, getAddressDetail } from '@/service/address'
import { tdist } from '@/common/js/utils'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
  areaList: {
    province_list: {},
    city_list: {},
    county_list: {}
  },
  searchResult: [], 
  isSwitchDefault: false,
  type: 'add',
  addressId: '',
  addressInfo: {},
  from: route.query.from
})

onMounted(async () => {
  // 省市区列表构造
  let _province_list = {}
  let _city_list = {}
  let _county_list = {}
  //提取出省市区到变量中
  tdist.getLev1().forEach((p: any) => {
    (_province_list as any)[p.id] = p.text
    tdist.getLev2(p.id).forEach((c: any) => {
      (_city_list as any)[c.id] = c.text
      tdist.getLev3(c.id).forEach((q: any) => (_county_list as any)[q.id] = q.text)
    })
  })
  state.areaList.province_list = _province_list
  state.areaList.city_list = _city_list
  state.areaList.county_list = _county_list

  //获取路由变量
  const { addressId, type, from } = route.query
  state.addressId = addressId as string
  state.type = type as string
  state.from = from as string || ''
  //如果是编辑，则通过id在pinia中获取地址信息
  if (type == 'edit') {
    const address = cart.addressList.find((item: any) => item.id == addressId)
    if (address) {
      state.addressInfo = {
        id: address.id,
        name: address.name,
        tel: address.tel,
      }
    }
  }
  // if (type == 'edit') {
  //   const { data: addressDetail } = await getAddressDetail(addressId)
  //   //找出地区编码
  //   let _areaCode = ''
  //   const province = tdist.getLev1()
  //   Object.entries(state.areaList.county_list).forEach(([id, text]) => {
  //     // 先找出当前对应的区
  //     if (text == addressDetail.regionName) {
  //       // 找到区对应的几个省份
  //       const provinceIndex = province.findIndex(item => item.id.substr(0, 2) == id.substr(0, 2))
  //       // 找到区对应的几个市区
  //       // eslint-disable-next-line no-unused-vars
  //       const cityItem = Object.entries(state.areaList.city_list).filter(([cityId, cityName]) => cityId.substr(0, 4) == id.substr(0, 4))[0]
  //       // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
  //       if (province[provinceIndex].text == addressDetail.provinceName && cityItem[1] == addressDetail.cityName) {
  //         _areaCode = id
  //       }
  //     }
  //   })
  //   state.addressInfo = {
  //     id: addressDetail.addressId,
  //     name: addressDetail.userName,
  //     tel: addressDetail.userPhone,
  //     province: addressDetail.provinceName,
  //     city: addressDetail.cityName,
  //     county: addressDetail.regionName,
  //     addressDetail: addressDetail.detailAddress,
  //     areaCode: _areaCode,
  //     isDefault: !!addressDetail.defaultFlag
  //   }
  // }
})

// 保存地址
const onSave = async (content: any) => {
  const params = {
    userName: content.name,
    userPhone: content.tel,
    provinceName: content.province,
    cityName: content.city,
    regionName: content.county,
    detailAddress: content.addressDetail,
    defaultFlag: content.isDefault ? true : false,
  }
  if (state.type == 'edit') {
    (params as any)['addressId'] = state.addressId
  }
  // await state.type == 'add' ? addAddress(params) : EditAddress(params)
  //保存在pinia中
  const address = {
    id: (params as any).addressId,
    name: params.userName,
    tel: params.userPhone,
    address: params.detailAddress,
    isDefault: params.defaultFlag
  }
  cart.addressList.push(address)
  showToast('保存成功')
  setTimeout(() => {
    router.back()
  }, 1000)
}

const onDelete = async () => {
  await DeleteAddress(state.addressId)
  showToast('删除成功')
  setTimeout(() => {
    router.back()
  }, 1000)
}
</script>

<style lang="scss" scoped>
@use '../common/style/mixin.scss' as *;

.edit {
  .van-field__body {
    textarea {
      height: 26px !important;
    }
  }
  margin-top: 50px;
}

.address-edit-box {
  .van-address-edit {
    .van-button--danger {
      background: $primary;
      border-color: $primary;
    }

    .van-switch--on {
      background: $primary;
    }
  }
}
</style>