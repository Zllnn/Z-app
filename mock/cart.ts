import { MockMethod } from 'vite-plugin-mock'

const mockCartItems = [
  {
    cartItemId: 1,
    goodsId: 1001,
    goodsName: "二手iPhone 13",
    goodsCoverImg: "/images/home/hot1.jpg",
    sellingPrice: 2999,
    goodsCount: 1
  },
  {
    cartItemId: 2,
    goodsId: 1002,
    goodsName: "二手MacBook Pro",
    goodsCoverImg: "/images/home/hot2.jpg",
    sellingPrice: 3999,
    goodsCount: 1
  },
  {
    cartItemId: 3,
    goodsId: 2003,
    goodsName: "宿舍台灯",
    goodsCoverImg: "/images/home/new3.jpg",
    sellingPrice: 59,
    goodsCount: 2
  },
  {
    cartItemId: 4,
    goodsId: 3001,
    goodsName: "蓝牙耳机",
    goodsCoverImg: "/images/home/rec1.jpg",
    sellingPrice: 99,
    goodsCount: 1
  },
  {
    cartItemId: 5,
    goodsId: 3002,
    goodsName: "宿舍电饭煲",
    goodsCoverImg: "/images/home/rec2.jpg",
    sellingPrice: 89,
    goodsCount: 1
  }
]

export default [
  {
    url: '/shop-cart',
    method: 'get',
    response: () => {
      return {
        code: 1,
        message: '获取成功',
        data: mockCartItems
      }
    }
  },
  {
    url: '/shop-cart',
    method: 'post',
    response: ({ body }) => {
      const { goodsId, goodsCount } = body
      if (goodsId && goodsCount) {
        // 模拟添加到购物车
        const newCartItem = {
          cartItemId: Math.floor(Math.random() * 10000),
          goodsId,
          goodsCount,
          goodsName: "新添加的商品",
          goodsCoverImg: "/images/home/category1.jpg",
          sellingPrice: 199
        }
        
        return {
          code: 1,
          message: '添加成功',
          data: {
            cartItemId: newCartItem.cartItemId
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
    url: '/shop-cart/:id',
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
  },
  {
    url:'/shop-cart/settle',
    method: 'get',
    response: ({ query }) => {
      const { cartItemIds } =query
      mockCartItems.filter(item => cartItemIds.includes(item.cartItemId))
      return {
        code: 1,
        message: '获取成功',
        data: mockCartItems
      }
    }
  }
] as MockMethod[]
