import { MockMethod } from 'vite-plugin-mock'

const mockAddresses = [
  {
    addressId: 1,
    userName: "张三",
    userPhone: "13800138000",
    provinceName: "北京市",
    cityName: "北京市",
    regionName: "朝阳区",
    detailAddress: "三里屯街道工体北路8号三里屯SOHO",
    defaultFlag: 1
  },
  {
    addressId: 2,
    userName: "李四",
    userPhone: "13900139000",
    provinceName: "上海市",
    cityName: "上海市",
    regionName: "浦东新区",
    detailAddress: "陆家嘴街道世纪大道1号东方明珠",
    defaultFlag: 0
  },
  {
    addressId: 3,
    userName: "王五",
    userPhone: "13700137000",
    provinceName: "广东省",
    cityName: "深圳市",
    regionName: "南山区",
    detailAddress: "粤海街道深南大道9988号大族科技中心",
    defaultFlag: 0
  },
  {
    addressId: 4,
    userName: "赵六",
    userPhone: "13600136000",
    provinceName: "浙江省",
    cityName: "杭州市",
    regionName: "西湖区",
    detailAddress: "文三街道文三路259号昌地火炬大厦",
    defaultFlag: 0
  },
  {
    addressId: 5,
    userName: "孙七",
    userPhone: "13500135000",
    provinceName: "江苏省",
    cityName: "南京市",
    regionName: "鼓楼区",
    detailAddress: "中央门街道中山路321号现代大厦",
    defaultFlag: 0
  }
]

export default [
  {
    url: '/address',
    method: 'get',
    response: () => {
      return {
        code: 1,
        message: '获取成功',
        data: mockAddresses
      }
    }
  },
  {
    url: '/address',
    method: 'post',
    response: ({ body }) => {
      const { userName, userPhone, provinceName, cityName, regionName, detailAddress } = body
      if (userName && userPhone && provinceName && cityName && regionName && detailAddress) {
        return {
          code: 1,
          message: '添加成功',
          data: {
            addressId: Math.floor(Math.random() * 10000)
          }
        }
      } else {
        return {
          code: 0,
          message: '添加失败，请检查参数',
          data: null
        }
      }
    }
  },
  {
    url: '/address/:id',
    method: 'put',
    response: ({ query, body }) => {
      const id = query.id
      const { userName, userPhone, provinceName, cityName, regionName, detailAddress } = body
      if (id && userName && userPhone && provinceName && cityName && regionName && detailAddress) {
        return {
          code: 1,
          message: '修改成功',
          data: null
        }
      } else {
        return {
          code: 0,
          message: '修改失败，请检查参数',
          data: null
        }
      }
    }
  },
  {
    url: '/address/:id',
    method: 'delete',
    response: ({ query }) => {
      const id = query.id
      if (id) {
        return {
          code: 1,
          message: '删除成功',
          data: null
        }
      } else {
        return {
          code: 0,
          message: '删除失败，请检查参数',
          data: null
        }
      }
    }
  }
] as MockMethod[]
