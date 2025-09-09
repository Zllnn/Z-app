import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/index-infos',
    method: 'get',
    response: () => {
      return {
        code: 1,
        message: '获取成功',
        data: {
          carousels: [
            {
              carouselId: 1,
              carouselUrl: "/images/home/swiper1.jpg",
              redirectUrl: "/product/1001"
            },
            {
              carouselId: 2,
              carouselUrl: "/images/home/swiper2.jpg",
              redirectUrl: "/product/1002"
            },
            {
              carouselId: 3,
              carouselUrl: "/images/home/swiper3.jpg",
              redirectUrl: "/product/1003"
            }
          ],
          hotGoods: [
            {
              goodsId: 1001,
              goodsName: "二手iPhone 13",
              goodsCoverImg: "/images/home/hot1.jpg",
              sellingPrice: 3999
            },
            {
              goodsId: 1002,
              goodsName: "二手MacBook Pro",
              goodsCoverImg: "/images/home/hot2.jpg",
              sellingPrice: 8999
            },
            {
              goodsId: 1003,
              goodsName: "宿舍小冰箱",
              goodsCoverImg: "/images/home/hot3.jpg",
              sellingPrice: 199
            },
            {
              goodsId: 1004,
              goodsName: "二手吉他",
              goodsCoverImg: "/images/home/hot4.jpg",
              sellingPrice: 399
            }
          ],
          newGoods: [
            {
              goodsId: 2001,
              goodsName: "二手iPhone 12",
              goodsCoverImg: "/images/home/new1.jpg",
              sellingPrice: 2499
            },
            {
              goodsId: 2002,
              goodsName: "笔记本电脑",
              goodsCoverImg: "/images/home/new2.jpg",
              sellingPrice: 1899
            },
            {
              goodsId: 2003,
              goodsName: "宿舍台灯",
              goodsCoverImg: "/images/home/new3.jpg",
              sellingPrice: 59
            },
            {
              goodsId: 2004,
              goodsName: "健身卡",
              goodsCoverImg: "/images/home/new4.jpg",
              sellingPrice: 199
            }
          ],
          recommendGoods: [
            {
              goodsId: 3001,
              goodsName: "蓝牙耳机",
              goodsCoverImg: "/images/home/rec1.jpg",
              sellingPrice: 129
            },
            {
              goodsId: 3002,
              goodsName: "宿舍电饭煲",
              goodsCoverImg: "/images/home/rec2.jpg",
              sellingPrice: 89
            },
            {
              goodsId: 3003,
              goodsName: "游戏手柄",
              goodsCoverImg: "/images/home/rec3.jpg",
              sellingPrice: 79
            },
            {
              goodsId: 3004,
              goodsName: "课外书籍",
              goodsCoverImg: "/images/home/rec4.jpg",
              sellingPrice: 29
            }
          ]
        }
      }
    }
  }
] as MockMethod[]
