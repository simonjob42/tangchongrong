import type { Metadata } from 'next';
import Link from 'next/link';
import { canonicalAlternates, SITE } from '@/components/sites/tang-chongrong/data/site';

export const metadata: Metadata = {
  title: '版权与声明',
  description: '唐崇荣中文档案的内容性质、版权归属、准确性与隐私说明。',
  alternates: canonicalAlternates('/disclaimer/'),
};

const sections = [
  {
    title: '一、内容性质',
    body: [
      '本站是一个独立整理的非官方讲道档案，不是唐崇荣牧师本人，也不是 STEMI、GRII、RICI 或任何相关机构的官方网站。',
      '本站不声称获得唐崇荣牧师或上述机构的授权、认可或背书。所有讲道视频均由 YouTube 提供，本站不托管任何视频或音频文件。',
    ],
  },
  {
    title: '二、版权归属',
    body: [
      '讲道视频、音频及原始标题的版权归唐崇荣牧师、原出版机构及原发布频道所有。本站仅整理公开可得的目录信息（标题、时长、播放列表归属与视频链接）。',
      '本站自行撰写的导读文字、系列说明与页面设计，采用 CC BY 4.0 许可，转载时请注明来源。',
      '如版权持有人认为某些整理方式不妥，或希望更正、移除特定条目，请通过页脚所列方式联系，我们会尽快处理。',
    ],
  },
  {
    title: '三、准确性与时效',
    body: [
      '目录由程序从公开播放列表导出，可能存在标题识别错误、集数归并错误、时长缺失或系列归属偏差。人物小传、神学主题与语录综合自公开著作、讲道与访谈，属于第三方整理。',
      '本站不保证任何信息的完整性或准确性。讲道内容请以原始视频与出版文本为准；引用语录时请回到原始出处核对。',
      '数据抓取时间为 2026 年 11 月，之后的新增讲道未纳入。',
    ],
  },
  {
    title: '四、神学立场',
    body: [
      '本档案呈现的是唐崇荣牧师的改革宗神学立场。呈现不等于要求读者认同，也不代表本站对其他神学传统的判断。',
      '听道不能替代地方教会的牧养、圣礼与团契生活。若你正在面对具体的信仰或生活问题，请寻求你所在教会的牧者。',
    ],
  },
  {
    title: '五、外部链接',
    body: [
      '本站包含指向 YouTube 及其他网站的外部链接。这些网站的内容、可用性与隐私政策由各自运营者负责，本站无法控制。',
      '嵌入的 YouTube 播放器受 YouTube 服务条款与隐私政策约束；播放视频时，YouTube 可能设置 Cookie 或收集使用数据。',
    ],
  },
  {
    title: '六、隐私',
    body: [
      '本站不设账号系统，不收集姓名、邮箱或任何个人身份信息，也不使用第三方广告或行为追踪脚本。',
      '搜索与筛选完全在浏览器本地完成，不会把查询内容发送到服务器。',
    ],
  },
  {
    title: '七、使用建议',
    body: [
      '本站适合个人学习、查经准备与讲道索引。请勿将整理内容用于商业转售，或伪装成官方发布。',
      '若要长期收听，建议订阅原始 YouTube 频道，以支持原事工的持续发布。',
    ],
  },
  {
    title: '八、变更',
    body: [
      '本声明可能随档案整理方式的变化而更新。重大变更会在本页注明。',
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl pt-10">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">声明</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          版权与声明
        </h1>
        <p className="mt-3 text-sm text-gray-500">最后更新：2026 年 11 月</p>
      </header>

      <div className="mt-10 space-y-9">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-base font-semibold text-gray-900">{section.title}</h2>
            <div className="mt-2.5 space-y-2.5">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h2 className="text-base font-semibold text-gray-900">联系</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          版权更正、内容移除或其他事宜，请发邮件至{' '}
          <a
            href={`mailto:${SITE.email}`}
            className="text-gray-900 underline underline-offset-4 hover:text-primary"
          >
            {SITE.email}
          </a>
          。
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-gray-100 pt-8">
        <Link href="/" className="btn-secondary">返回首页</Link>
        <Link href="/about" className="btn-ghost">关于本站</Link>
        <a
          href="https://www.youtube.com/@Gudao200"
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
        >
          原始频道 ↗
        </a>
      </div>
    </div>
  );
}
