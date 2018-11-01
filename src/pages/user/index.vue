<template>
  <div>
    <div>
      <i-card title="卡片标题" extra="额外内容" thumb="https://i.loli.net/2017/08/21/599a521472424.jpg">
        <view slot="content">内容不错</view>
      </i-card>
    </div>
    <div>
      <i-cell-group>
        <i-cell title="我关注的主题" is-link></i-cell>
        <i-cell title="我的收藏"></i-cell>
        <i-cell title="我的通知"></i-cell>
        <i-cell title="帮助与反馈"></i-cell>
      </i-cell-group>
      <i-cell-group>
        <i-cell title="我创建的主题"></i-cell>
        <i-cell title="我创建的主题"></i-cell>
        <i-cell title="我创建的主题"></i-cell>
        <i-cell title="我创建的主题"></i-cell>
        <i-cell title="免流量"></i-cell>
        <i-cell title="免流量"></i-cell>
        <i-cell title="免流量"></i-cell>
        <i-cell title="免流量"></i-cell>
        <i-cell title="免流量">
          <switch slot="footer" checked />
        </i-cell>
      </i-cell-group>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
</style>
