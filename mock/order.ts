import { MockMethod } from 'vite-plugin-mock'

const mockOrders = [
  {
    orderId: 1001,
    orderNo: "202401150001",
    totalPrice: 3999,
    payStatus: 1,
    payType: 1,
    orderStatus: 1,
    orderStatusString: "待确认",
    createTime: "2024-01-15 10:30:00",
    newBeeMallOrderItemVOS: [
      {
        orderId: 1001,
        goodsName: "二手iPhone 13",
        goodsCoverImg: "/images/home/hot1.jpg",
        sellingPrice: 3999,
        goodsCount: 1
      }
    ]
  },
  {
    orderId: 1002,
    orderNo: "202401150002",
    totalPrice: 8999,
    payStatus: 0,
    payType: 0,
    orderStatus: 0,
    orderStatusString: "待付款",
    createTime: "2024-01-15 11:00:00",
    newBeeMallOrderItemVOS: [
      {
        orderId: 1002,
        goodsName: "二手MacBook Pro",
        goodsCoverImg: "/images/home/hot2.jpg",
        sellingPrice: 8999,
        goodsCount: 1
      }
    ]
  },
  {
    orderId: 1003,
    orderNo: "202401150003",
    totalPrice: 118,
    payStatus: 1,
    payType: 1,
    orderStatus: 2,
    orderStatusString: "待发货",
    createTime: "2024-01-15 12:00:00",
    newBeeMallOrderItemVOS: [
      {
        orderId: 1003,
        goodsName: "宿舍台灯",
        goodsCoverImg: "/images/home/new3.jpg",
        sellingPrice: 59,
        goodsCount: 2
      }
    ]
  },
  {
    orderId: 1004,
    orderNo: "202401150004",
    totalPrice: 788,
    payStatus: 1,
    payType: 1,
    orderStatus: 3,
    orderStatusString: "已发货",
    createTime: "2024-01-15 13:00:00",
    newBeeMallOrderItemVOS: [
      {
        orderId: 1004,
        goodsName: "蓝牙耳机",
        goodsCoverImg: "/images/home/rec1.jpg",
        sellingPrice: 699,
        goodsCount: 1
      },
      {
        orderId: 1004,
        goodsName: "宿舍电饭煲",
        goodsCoverImg: "/images/home/rec2.jpg",
        sellingPrice: 89,
        goodsCount: 1
      }
    ]
  },
  {
    orderId: 1005,
    orderNo: "202401150005",
    totalPrice: 199,
    payStatus: 1,
    payType: 1,
    orderStatus: 4,
    orderStatusString: "交易完成",
    createTime: "2024-01-15 14:00:00",
    newBeeMallOrderItemVOS: [
      {
        orderId: 1005,
        goodsName: "游戏手柄",
        goodsCoverImg: "/images/home/rec3.jpg",
        sellingPrice: 199,
        goodsCount: 1
      }
    ]
  }
]

export default [
  {
    url: '/order',
    method: 'get',
    response: ({ query }) => {
      const pageNumber = parseInt(query.pageNumber) || 1
      const pageSize = parseInt(query.pageSize) || 10
      const status = query.status || ''
      
      let filteredOrders = [...mockOrders]
      
      // 根据状态筛选订单
      if (status !== '') {
        filteredOrders = filteredOrders.filter(order => order.orderStatus === parseInt(status))
      }
      
      const start = (pageNumber - 1) * pageSize
      const end = start + pageSize
      const paginatedOrders = filteredOrders.slice(start, end)
      
      return {
        code: 1,
        message: '获取成功',
        data: {
          list: paginatedOrders,
          totalCount: filteredOrders.length,
          currPage: pageNumber,
          pageSize: pageSize,
          totalPage: Math.ceil(filteredOrders.length / pageSize)
        }
      }
    }
  },
  {
    url: '/order',
    method: 'post',
    response: ({ body }) => {
      const { addressId, cartItemIds } = body
      if (addressId && cartItemIds && cartItemIds.length > 0) {
        return {
          code: 1,
          message: '下单成功',
          data: {
            orderNo: `2024${Date.now()}`,
            orderId: Math.floor(Math.random() * 10000)
          }
        }
      } else {
        return {
          code: 0,
          message: '下单失败，请检查参数',
          data: null
        }
      }
    }
  },
  {
    url: '/order/:id',
    method: 'get',
    response: ({ query }) => {
      const id = query.id
      const order = mockOrders.find(item => item.orderId === parseInt(id))
      
      if (order) {
        return {
          code: 1,
          message: '获取成功',
          data: order
        }
      } else {
        return {
          code: 0,
          message: '订单不存在',
          data: null
        }
      }
    }
  }
] as MockMethod[]
