import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { Loading } from '@alifd/next';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler';

import { message } from 'antd'
import 'antd/dist/antd.css';

const SamplePreview = () => {
  const [data, setData] = useState<any>({});
  const [index, setIndex] = useState(0);
  const list = JSON.parse(window.localStorage.getItem('projectSchemaList') as string);

  async function init() {
    const { packages } = list[index];
    const { componentsMap: componentsMapArray, componentsTree } = list[index].schema;
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });
    const schema = componentsTree[0];

    const libraryMap = {};
    const libraryAsset: any[] = [];
    // @ts-ignore
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
      // @ts-ignore
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });

    const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];
    const assetLoader = new AssetLoader();
    await assetLoader.load(libraryAsset);
    // @ts-ignore
    const components = await injectComponents(buildComponents(libraryMap, componentsMap));

    setData({
      schema,
      components,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      init();
    }, 200);
  }, [index]);

  useEffect(() => {
    document.onkeydown = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          handleLastPage()
          break
        case 'ArrowRight':
          handleNextPage()
          break
      }
    }

    
  }, [])

  const handleLastPage = () => {
    if (index > 0) {
      setIndex(index - 1);
      return
    }
    else message.warning('当前已是第一页~')
  }
  const handleNextPage = () => {
    if (index < list.length - 1) {
      setIndex(index + 1);
      return
    }
    else message.warning('最后一页了~')
  }

  const { schema, components } = data;

  if (!schema || !components) {
    init();
    return <Loading fullScreen />;
  }
  
  return (
    <div>
      <ReactRenderer
        schema={schema}
        components={components}
        appHelper={{
          requestHandlersMap: {
            fetch: createFetchHandler(),
          }
        }}
      />
    </div>
  );
};

ReactDOM.render(<SamplePreview />, document.getElementById('ice-container'));
