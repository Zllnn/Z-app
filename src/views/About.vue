<template>
  <s-header :name="'关于我们'"></s-header>
  <div class="about">
    <h1>Z-admin 校园二手交易平台</h1>
    <p class="lead">面向在校师生的本地化二手闲置交易平台，让优质物品在校园内高效流转。</p>

    <div class="cards">
      <div class="card">
        <h3>安全可信</h3>
        <p>以校内为圈层，用户可实名认证，聊天与订单全程留痕，更安心。</p>
      </div>
      <div class="card">
        <h3>便捷高效</h3>
        <p>分类清晰、搜索灵活，支持收藏、购物车与订单跟踪，交易一步到位。</p>
      </div>
      <div class="card">
        <h3>价格友好</h3>
        <p>让闲置更有价值，低成本获取好物，助力绿色循环经济。</p>
      </div>
    </div>

    <ul class="highlights">
      <li><strong>发布与管理：</strong> 一键发布，支持多图、描述与价格设置，随时编辑下架。</li>
      <li><strong>交流与交易：</strong> 站内私信沟通，加入购物车，创建订单，状态清晰可追踪。</li>
      <li><strong>校园特色：</strong> 支持校区/自提点筛选，提倡当面验货或校内自提。</li>
    </ul>

    <div class="cta">
      <span>现在就开始浏览，发现更好的「二手」生活方式。</span>
    </div>
  </div>
</template>

<script setup>
import sHeader from '@/components/SimpleHeader.vue'
</script>

<style scoped>
.about {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px;
  line-height: 1.7;
  margin-top: 50px;
}

.about h1 {
  font-size: 24px;
  margin-bottom: 8px;
}

.lead {
  color: #666;
  margin-bottom: 20px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 16px 0 12px;
}

.card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  background: #fff;
}

.card h3 {
  font-size: 16px;
  margin-bottom: 6px;
}

.highlights {
  margin: 12px 0 20px;
  padding-left: 18px;
  color: #444;
}

.cta {
  padding: 12px 14px;
  background: #f7f7f7;
  border: 1px dashed #e2e2e2;
  border-radius: 8px;
}
</style>