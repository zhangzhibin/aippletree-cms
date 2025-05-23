import { GlobalConfig } from 'payload'

const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  access: {
    read: () => true, // 所有人都可以读取
    update: ({ req: { user } }) => Boolean(user), // 只有登录用户可以更新
  },
  admin: {
    group: '全局管理',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: '网站名称',
      required: true,
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      label: '网站描述',
    },
    {
      name: 'logo',
      type: 'upload',
      label: '网站Logo',
      relationTo: 'media',
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: '联系信息',
      fields: [
        {
          name: 'email',
          type: 'text',
          label: '联系邮箱',
        },
        {
          name: 'phone',
          type: 'text',
          label: '联系电话',
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'array',
      label: '社交媒体',
      fields: [
        {
          name: 'platform',
          type: 'text',
          label: '平台名称',
        },
        {
          name: 'url',
          type: 'text',
          label: '链接地址',
        },
        {
          name: 'icon',
          type: 'upload',
          label: '图标',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO设置',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta标题',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta描述',
        },
        {
          name: 'keywords',
          type: 'text',
          label: '关键词',
        },
      ],
    },
  ],
}

export default SiteConfig
