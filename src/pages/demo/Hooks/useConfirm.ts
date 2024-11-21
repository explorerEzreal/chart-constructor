import { Modal } from 'antd';

const { confirm } = Modal;

type ConfirmOptions = {
  title: string;
  content: string;
  okText?: string;
  cancelText?: string;
};

const useConfirm = (fun: (e?: any) => void, options: ConfirmOptions) => {
  const { title, okText, cancelText, content } = options;

  const handleConfirm = (params?: any) => {
    confirm({
      title,
      okText,
      cancelText,
      content,
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
