import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-24 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">404</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">
        没有找到这一页
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        你访问的讲道或页面可能已移动，或链接有误。可以回到首页，或到全部讲道中重新查找。
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Link href="/" className="btn-primary">返回首页</Link>
        <Link href="/archive" className="btn-secondary">全部讲道</Link>
      </div>
    </div>
  );
}
