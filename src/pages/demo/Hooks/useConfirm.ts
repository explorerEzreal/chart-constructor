import { Modal } from 'antd';
import { useCallback } from 'react';

const { confirm } = Modal;

type ConfirmOptions = {
  title: string;
  content: string;
  okText?: string;
  cancelText?: string;
};

const useConfirm = (fun: (e?: any) => void, options: ConfirmOptions) => {
  const { title, okText, cancelText } = options;

  const handleConfirm = (params?: any) => {
    confirm({
      title,
      okText,
      cancelText,
      onOk: () => {
        fun(params);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return { handleConfirm };
};

export default useConfirm;
