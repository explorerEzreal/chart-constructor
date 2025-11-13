import { useState } from 'react';
import type { FC } from 'react';
import { Button, message } from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import './index.less';

export type CodeBlockProps = {
  code: string;
  /** 代码语言，仅作为左上角标签展示 */
  language?: string;
  /** 代码来源标题，传入时优先展示 */
  title?: string;
};

/** 代码块：深色背景展示代码，右上角提供一键复制 */
export const CodeBlock: FC<CodeBlockProps> = ({ code, language = 'tsx', title }) => {
  // 复制成功后短暂展示勾选态，2 秒后复位
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      message.success('代码已复制');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      message.error('请求失败，请稍后重试');
    }
  };

  return (
    <div className="cc-code-block">
      <div className="cc-code-block__bar">
        <span className="cc-code-block__title">{title ?? language}</span>
        <Button
          className="cc-code-block__copy"
          type="text"
          size="small"
          icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleCopy}
        >
          复制
        </Button>
      </div>
      <pre className="cc-code-block__pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
