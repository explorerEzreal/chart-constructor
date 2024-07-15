import React, { useContext, useReducer, createContext } from 'react';

// 初始化状态
const initialState = {
  type: 'pie',
  option: {},
};

// 创建 reducer 函数
const reducer = (state, payload) => {
  return { ...state, ...payload };
};

// 创建上下文
const PageContext = createContext({
  state: initialState,
  //   dispatch: () => null,
});

// 创建页面上下文提供器
const ContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {};

  return (
    <PageContext.Provider
      value={{
        state,
        dispatch,
        actions,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
export const OverviewContextProvider = React.memo(ContextProvider);

export const useOverviewContext = () => useContext(PageContext);
