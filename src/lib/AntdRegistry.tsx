'use client';

import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { useServerInsertedHTML } from 'next/navigation';
import { ConfigProvider, theme } from 'antd';

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ));
  return <StyleProvider cache={cache}>
    <ConfigProvider theme={{
      "token": {
        "colorPrimary": "#ffe42f",
        "colorInfo": "#ffe42f"
      },
      "algorithm": theme.darkAlgorithm,
    }}>
      {children}
    </ConfigProvider>
  </StyleProvider>;
};

export default StyledComponentsRegistry;