import type { FC, ReactNode } from 'react';
import './index.less';

export type GuideSectionProps = {
  /** 小节锚点 id，供目录跳转使用 */
  id: string;
  title: string;
  desc?: string;
  children: ReactNode;
};

/** 文档小节：统一标题、描述与内容间距 */
export const GuideSection: FC<GuideSectionProps> = ({ id, title, desc, children }) => (
  <section className="cc-guide-section" id={id}>
    <h2 className="cc-guide-section__title">{title}</h2>
    {desc ? <p className="cc-guide-section__desc">{desc}</p> : null}
    <div className="cc-guide-section__body">{children}</div>
  </section>
);

export default GuideSection;
