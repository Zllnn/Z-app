import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/user/login',
    method: 'post',
    response: ({ body }) => {
      const { loginName, passwordMd5 } = body
      if (loginName === 'user' && passwordMd5 === '123456') {
        return {
          code: 1,
          message: '登录成功',
          data: {
            token: 'mock-user-token-123456',
            userInfo: {
              userId: 1001,
              loginName: 'user',
              nickName: '测试用户',
              introduceSign: '这是一个测试用户，喜欢在校园二手交易平台淘好物',
              addressId: 1,
              avatar: '/images/home/category1.jpg'
            }
          }
        }
      } else {
        return {
          code: 0,
          message: '用户名或密码错误',
          data: null
        }
      }
    }
  },
  {
    url: '/user/register',
    method: 'post',
    response: ({ body }) => {
      const { loginName, password } = body
      if (loginName && password) {
        return {
          code: 1,
          message: '注册成功',
          data: {
            userId: Math.floor(Math.random() * 10000),
            loginName,
            nickName: loginName,
            introduceSign: '新用户',
            avatar: '/images/home/category2.jpg'
          }
        }
      } else {
        return {
          code: 0,
          message: '注册失败，请检查输入信息',
          data: null
        }
      }
    }
  },
  {
    url: '/user/info',
    method: 'get',
    response: () => {
      return {
        code: 1,
        message: '获取成功',
        data: {
          userId: 1001,
          loginName: 'user',
          nickName: '测试用户',
          introduceSign: '这是一个测试用户，喜欢在校园二手交易平台淘好物',
          addressId: 1,
          avatar: '/images/home/category1.jpg',
          email: 'user@example.com',
          phone: '13800138000',
          gender: 1,
          birthday: '2000-01-01',
          createTime: '2024-01-01 00:00:00'
        }
      }
    }
  },
  {
    url: '/user/logout',
    method: 'post',
    response: () => {
      return {
        code: 1,
        message: '退出成功',
        data: null
      }
    }
  },
  {
    url: '/user/update',
    method: 'put',
    response: ({ body }) => {
      const { nickName, introduceSign, avatar, email, phone, gender, birthday } = body
      if (nickName || introduceSign || avatar || email || phone || gender || birthday) {
        return {
          code: 1,
          message: '更新成功',
          data: {
            userId: 1001,
            ...body
          }
        }
      } else {
        return {
          code: 0,
          message: '更新失败，请检查参数',
          data: null
        }
      }
    }
  },
  {
    url: '/user/change-password',
    method: 'post',
    response: ({ body }) => {
      const { oldPassword, newPassword } = body
      if (oldPassword === '123456' && newPassword && newPassword.length >= 6) {
        return {
          code: 1,
          message: '密码修改成功',
          data: null
        }
      } else {
        return {
          code: 0,
          message: '密码修改失败，请检查原密码或新密码格式',
          data: null
        }
      }
    }
  }
] as MockMethod[]
