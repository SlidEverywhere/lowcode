import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { Loading } from '@alifd/next';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler';

import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

import './preview.scss';

const SamplePreview = () => {
  const [data, setData] = useState({});
  const [index, setIndex] = useState(0);
  async function init() {
    const list = JSON.parse(window.localStorage.getItem('projectSchemaList') as string);
    const { packages } = list[index];
    const { componentsMap: componentsMapArray, componentsTree } = list[index].schema;
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });
    const schema = componentsTree[0];

    const libraryMap = {};
    const libraryAsset = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
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
    const components = await injectComponents(buildComponents(libraryMap, componentsMap));

    setData({
      schema,
      components,
    });
  }
  useEffect(() => {
    init();
  }, [index]);
  const { schema, components } = data;

  if (!schema || !components) {
    init();
    return <Loading fullScreen />;
  }
  return (
    <div className="lowcode-plugin-sample-preview">
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={schema}
        components={components}
        appHelper={{
          requestHandlersMap: {
            fetch: createFetchHandler(),
          },
        }}
      />
      <div className="menu">
        <LeftCircleOutlined
          style={{ fontSize: '40px', color: '#08c', cursor: 'pointer' }}
          onClick={() => {
            setIndex(index - 1);
          }}
        />
        <RightCircleOutlined
          style={{ fontSize: '40px', color: '#08c', cursor: 'pointer' }}
          onClick={() => {
            setIndex(index + 1);
          }}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<SamplePreview />, document.getElementById('ice-container'));
