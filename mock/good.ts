import { MockMethod } from 'vite-plugin-mock'

const mockGoods = [
  {
    goodsId: 1001,
    goodsName: "二手iPhone 13",
    goodsIntro: "95新iPhone 13，128GB，无锁，毕业出售，无划痕，电池健康度90%，带原装充电器",
    goodsCarouselList: ["/images/home/hot1.jpg"],
    goodsCoverImg: "/images/home/hot1.jpg",
    sellingPrice: 3999,
    originalPrice: 5999,
    tag: "数码产品",
    goodsDetailContent: "这是一台95新的iPhone 13，128GB存储，无锁版本，适合学生使用。毕业出售，无划痕，电池健康度90%，带原装充电器。"
  },
  {
    goodsId: 1002,
    goodsName: "二手MacBook Pro",
    goodsIntro: "2019款MacBook Pro，13寸，8GB+256GB，考研结束，电脑保养很好",
    goodsCarouselList: ["/images/home/hot2.jpg"],
    goodsCoverImg: "/images/home/hot2.jpg",
    sellingPrice: 8999,
    originalPrice: 12999,
    tag: "电脑设备",
    goodsDetailContent: "2019款MacBook Pro，13寸屏幕，8GB内存，256GB固态硬盘，适合编程学习。考研结束，电脑保养很好，适合学习办公，带保护壳。"
  },
  {
    goodsId: 1003,
    goodsName: "宿舍小冰箱",
    goodsIntro: "迷你小冰箱，适合宿舍使用，噪音小，省电",
    goodsCarouselList: ["/images/home/hot3.jpg"],
    goodsCoverImg: "/images/home/hot3.jpg",
    sellingPrice: 199,
    originalPrice: 399,
    tag: "生活用品",
    goodsDetailContent: "迷你小冰箱，适合宿舍使用，噪音小，省电。容量适中，可以存放饮料、水果等。"
  },
  {
    goodsId: 1004,
    goodsName: "二手吉他",
    goodsIntro: "民谣吉他，音色纯正，适合初学者，带琴包",
    goodsCarouselList: ["/images/home/hot4.jpg"],
    goodsCoverImg: "/images/home/hot4.jpg",
    sellingPrice: 399,
    originalPrice: 699,
    tag: "乐器",
    goodsDetailContent: "民谣吉他，音色纯正，适合初学者，带琴包。毕业出售，琴况良好。"
  },
  {
    goodsId: 2001,
    goodsName: "二手iPhone 12",
    goodsIntro: "iPhone 12 64GB，八成新，无维修，电池健康度85%",
    goodsCarouselList: ["/images/home/new1.jpg"],
    goodsCoverImg: "/images/home/new1.jpg",
    sellingPrice: 2499,
    originalPrice: 4999,
    tag: "数码产品",
    goodsDetailContent: "iPhone 12 64GB，八成新，无维修，电池健康度85%。毕业出售，价格实惠。"
  },
  {
    goodsId: 2002,
    goodsName: "笔记本电脑",
    goodsIntro: "联想ThinkPad，商务本，性能稳定，适合办公学习",
    goodsCarouselList: ["/images/home/new2.jpg"],
    goodsCoverImg: "/images/home/new2.jpg",
    sellingPrice: 1899,
    originalPrice: 3999,
    tag: "电脑设备",
    goodsDetailContent: "联想ThinkPad，商务本，性能稳定，适合办公学习。考研结束出售，保养良好。"
  },
  {
    goodsId: 2003,
    goodsName: "宿舍台灯",
    goodsIntro: "护眼台灯，LED光源，可调节亮度，带遥控器",
    goodsCarouselList: ["/images/home/new3.jpg"],
    goodsCoverImg: "/images/home/new3.jpg",
    sellingPrice: 59,
    originalPrice: 129,
    tag: "new",
    goodsDetailContent: "护眼台灯，LED光源，可调节亮度，带遥控器。适合夜间学习使用。"
  },
  {
    goodsId: 2004,
    goodsName: "健身卡",
    goodsIntro: "校园健身房年卡，还有8个月有效期，价格实惠",
    goodsCarouselList: ["/images/home/new4.jpg"],
    goodsCoverImg: "/images/home/new4.jpg",
    sellingPrice: 199,
    originalPrice: 599,
    tag: "new",
    goodsDetailContent: "校园健身房年卡，还有8个月有效期，价格实惠。因个人原因转让。"
  },
  {
    goodsId: 3001,
    goodsName: "蓝牙耳机",
    goodsIntro: "AirPods 2代，九成新，音质完美，无杂音",
    goodsCarouselList: ["/images/home/rec1.jpg"],
    goodsCoverImg: "/images/home/rec1.jpg",
    sellingPrice: 699,
    originalPrice: 1299,
    tag: "new",
    goodsDetailContent: "AirPods 2代，九成新，音质完美，无杂音，带原装充电盒。使用一年，保养很好。"
  },
  {
    goodsId: 3002,
    goodsName: "宿舍电饭煲",
    goodsIntro: "迷你电饭煲，2L容量，适合1-2人使用，功能齐全",
    goodsCarouselList: ["/images/home/rec2.jpg"],
    goodsCoverImg: "/images/home/rec2.jpg",
    sellingPrice: 89,
    originalPrice: 199,
    tag: "生活用品",
    goodsDetailContent: "迷你电饭煲，2L容量，适合1-2人使用，功能齐全。宿舍必备神器。"
  },
  {
    goodsId: 3003,
    goodsName: "游戏手柄",
    goodsIntro: "Xbox手柄，无线连接，手感舒适，支持PC和手机",
    goodsCarouselList: ["/images/home/rec3.jpg"],
    goodsCoverImg: "/images/home/rec3.jpg",
    sellingPrice: 199,
    originalPrice: 399,
    tag: "数码产品",
    goodsDetailContent: "Xbox手柄，无线连接，手感舒适，支持PC和手机。游戏必备装备。"
  },
  {
    goodsId: 3004,
    goodsName: "课外书籍",
    goodsIntro: "经典文学名著合集，包含多本畅销书，全新未拆",
    goodsCarouselList: ["/images/home/rec4.jpg"],
    goodsCoverImg: "/images/home/rec4.jpg",
    sellingPrice: 29,
    originalPrice: 89,
    tag: "图书教材",
    goodsDetailContent: "经典文学名著合集，包含多本畅销书，全新未拆。抽奖获得，价格实惠。"
  }
]

const mockCategoryData = [
  {
    categoryId: 1,
    categoryName: '数码电子',
    mainImgUrl: '/images/home/category1.jpg',
    secondLevelCategoryVOS: [
      {
        categoryName: '手机数码',
        thirdLevelCategoryVOS: [
          { categoryId: 101, categoryName: 'iPhone' },
          { categoryId: 102, categoryName: 'Android' },
          { categoryId: 103, categoryName: '平板电脑' },
          { categoryId: 104, categoryName: '智能手表' }
        ]
      },
      {
        categoryName: '电脑办公',
        thirdLevelCategoryVOS: [
          { categoryId: 105, categoryName: '笔记本' },
          { categoryId: 106, categoryName: '台式机' },
          { categoryId: 107, categoryName: '键盘鼠标' },
          { categoryId: 108, categoryName: '显示器' }
        ]
      },
      {
        categoryName: '音频设备',
        thirdLevelCategoryVOS: [
          { categoryId: 109, categoryName: '蓝牙耳机' },
          { categoryId: 110, categoryName: '蓝牙音箱' },
          { categoryId: 111, categoryName: '麦克风' },
          { categoryId: 112, categoryName: '录音笔' }
        ]
      }
    ]
  },
  {
    categoryId: 2,
    categoryName: '学习用品',
    mainImgUrl: '/images/home/category2.jpg',
    secondLevelCategoryVOS: [
      {
        categoryName: '书籍资料',
        thirdLevelCategoryVOS: [
          { categoryId: 201, categoryName: '教材课本' },
          { categoryId: 202, categoryName: '考研二手' },
          { categoryId: 203, categoryName: '英语学习' },
          { categoryId: 204, categoryName: '专业书籍' }
        ]
      },
      {
        categoryName: '文具用品',
        thirdLevelCategoryVOS: [
          { categoryId: 205, categoryName: '笔类' },
          { categoryId: 206, categoryName: '笔记本' },
          { categoryId: 207, categoryName: '尺子' },
          { categoryId: 208, categoryName: '计算器' }
        ]
      },
      {
        categoryName: '办公用品',
        thirdLevelCategoryVOS: [
          { categoryId: 209, categoryName: '文件夹' },
          { categoryId: 210, categoryName: '订书机' },
          { categoryId: 211, categoryName: '胶水' },
          { categoryId: 212, categoryName: '便利贴' }
        ]
      }
    ]
  },
  {
    categoryId: 3,
    categoryName: '宿舍生活',
    mainImgUrl: '/images/home/category3.jpg',
    secondLevelCategoryVOS: [
      {
        categoryName: '宿舍用品',
        thirdLevelCategoryVOS: [
          { categoryId: 301, categoryName: '台灯' },
          { categoryId: 302, categoryName: '床品' },
          { categoryId: 303, categoryName: '收纳盒' },
          { categoryId: 304, categoryName: '衣架' }
        ]
      },
      {
        categoryName: '个人护理',
        thirdLevelCategoryVOS: [
          { categoryId: 305, categoryName: '护肤品' },
          { categoryId: 306, categoryName: '化妆品' },
          { categoryId: 307, categoryName: '香水' },
          { categoryId: 308, categoryName: '美妆工具' }
        ]
      },
      {
        categoryName: '运动健身',
        thirdLevelCategoryVOS: [
          { categoryId: 309, categoryName: '运动鞋' },
          { categoryId: 310, categoryName: '运动服' },
          { categoryId: 311, categoryName: '健身器材' },
          { categoryId: 312, categoryName: '瑜伽垫' }
        ]
      }
    ]
  },
  {
    categoryId: 4,
    categoryName: '校园代步',
    mainImgUrl: '/images/home/category4.jpg',
    secondLevelCategoryVOS: [
      {
        categoryName: '自行车',
        thirdLevelCategoryVOS: [
          { categoryId: 401, categoryName: '山地车' },
          { categoryId: 402, categoryName: '公路车' },
          { categoryId: 403, categoryName: '折叠车' },
          { categoryId: 404, categoryName: '电动车' }
        ]
      },
      {
        categoryName: '滑板轮滑',
        thirdLevelCategoryVOS: [
          { categoryId: 405, categoryName: '滑板' },
          { categoryId: 406, categoryName: '轮滑鞋' },
          { categoryId: 407, categoryName: '长板' },
          { categoryId: 408, categoryName: '电动滑板' }
        ]
      }
    ]
  },
  {
    categoryId: 5,
    categoryName: '时尚穿搭',
    mainImgUrl: '/images/home/category5.jpg',
    secondLevelCategoryVOS: [
      {
        categoryName: '男装',
        thirdLevelCategoryVOS: [
          { categoryId: 501, categoryName: 'T恤' },
          { categoryId: 502, categoryName: '衬衫' },
          { categoryId: 503, categoryName: '外套' },
          { categoryId: 504, categoryName: '牛仔裤' }
        ]
      },
      {
        categoryName: '女装',
        thirdLevelCategoryVOS: [
          { categoryId: 505, categoryName: '连衣裙' },
          { categoryId: 506, categoryName: '上衣' },
          { categoryId: 507, categoryName: '外套' },
          { categoryId: 508, categoryName: '半身裙' }
        ]
      },
      {
        categoryName: '配饰',
        thirdLevelCategoryVOS: [
          { categoryId: 509, categoryName: '帽子' },
          { categoryId: 510, categoryName: '围巾' },
          { categoryId: 511, categoryName: '双肩包' },
          { categoryId: 512, categoryName: '首饰' }
        ]
      }
    ]
  },
  {
    categoryId: 6,
    categoryName: '休闲娱乐',
    mainImgUrl: '/images/home/category6.jpg',
    secondLevelCategoryVOS: [
      {
        categoryName: '游戏设备',
        thirdLevelCategoryVOS: [
          { categoryId: 601, categoryName: 'Switch' },
          { categoryId: 602, categoryName: '手柄' },
          { categoryId: 603, categoryName: 'VR设备' },
          { categoryId: 604, categoryName: '游戏耳机' }
        ]
      },
      {
        categoryName: '桌游棋牌',
        thirdLevelCategoryVOS: [
          { categoryId: 605, categoryName: '扑克牌' },
          { categoryId: 606, categoryName: '象棋' },
          { categoryId: 607, categoryName: '围棋' },
          { categoryId: 608, categoryName: '狼人杀' }
        ]
      }
    ]
  }
]

const mockCategories = [
  {
    categoryId: 1,
    categoryLevel: 1,
    categoryName: "数码产品",
    parentId: 0,
    imgUrl: "/images/home/category1.jpg"
  },
  {
    categoryId: 2,
    categoryLevel: 1,
    categoryName: "电脑设备",
    parentId: 0,
    imgUrl: "/images/home/category2.jpg"
  },
  {
    categoryId: 3,
    categoryLevel: 1,
    categoryName: "生活用品",
    parentId: 0,
    imgUrl: "/images/home/category3.jpg"
  },
  {
    categoryId: 4,
    categoryLevel: 1,
    categoryName: "图书教材",
    parentId: 0,
    imgUrl: "/images/home/category4.jpg"
  },
  {
    categoryId: 5,
    categoryLevel: 1,
    categoryName: "运动健身",
    parentId: 0,
    imgUrl: "/images/home/category5.jpg"
  },
  {
    categoryId: 6,
    categoryLevel: 1,
    categoryName: "乐器",
    parentId: 0,
    imgUrl: "/images/home/category6.jpg"
  },
  {
    categoryId: 7,
    categoryLevel: 1,
    categoryName: "校园服务",
    parentId: 0,
    imgUrl: "/images/home/category7.jpg"
  },
  {
    categoryId: 8,
    categoryLevel: 1,
    categoryName: "其他",
    parentId: 0,
    imgUrl: "/images/home/category8.jpg"
  }
]

export default [
  {
    url: '/categories',
    method: 'get',
    response: () => {
      return {
        code: 1,
        message: '获取成功',
        data: mockCategoryData
      }
    }
  },
  {
    url: '/goods/detail/:id',
    method: 'get',
    response: ({ query }) => {
      const id = query.id
      const good = mockGoods.find(item => item.goodsId === parseInt(id))
      
      if (good) {
        return {
          code: 1,
          message: '获取成功',
          data: good
        }
      } else {
        return {
          code: 0,
          message: '商品不存在',
          data: null
        }
      }
    }
  },
  {
    url: '/search',
    method: 'get',
    response: ({ query }) => {
      const keyword = query.keyword || ''
      const categoryId = query.goodsCategoryId || ''
      const orderBy = query.orderBy || ''
      const pageNumber = parseInt(query.pageNumber) || 1
      const pageSize = parseInt(query.pageSize) || 10
      
      let filteredGoods = [...mockGoods]
      
      // 关键词搜索
      if (keyword) {
        filteredGoods = filteredGoods.filter(item => 
          item.goodsName.includes(keyword) || item.goodsIntro.includes(keyword)
        )
      }
      
      // 分类筛选
      if (categoryId) {
        // 这里可以根据categoryId进行筛选，暂时返回所有商品
        filteredGoods = filteredGoods
      }
      
      // 排序
      if (orderBy === 'new') {
        filteredGoods = filteredGoods.filter(item => item.tag === 'new')
      } else if (orderBy === 'price') {
        filteredGoods = filteredGoods.sort((a, b) => a.sellingPrice - b.sellingPrice)
      }
      
      // 分页
      const start = (pageNumber - 1) * pageSize
      const end = start + pageSize
      const list = filteredGoods.slice(start, end)
      
      return {
        code: 1,
        message: '搜索成功',
        data: {
          list,
          totalCount: filteredGoods.length,
          currPage: pageNumber,
          pageSize,
          totalPage: Math.ceil(filteredGoods.length / pageSize)
        }
      }
    }
  }
] as MockMethod[]
