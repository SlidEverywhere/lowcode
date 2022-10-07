import { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { common, plugins, config, project, material } from '@alilc/lowcode-engine';
import { Message } from '@alifd/next';
import 'antd/dist/antd.css';

import registerPlugins from './universal/plugin';
import './universal/global.scss';
import { fetchSchema } from 'src/universal/utils'

export const C = createContext(null);

(async function main() {
  await registerPlugins();

  const Workbench = common.skeletonCabin.Workbench;
  function EditorView() {
    /** 插件是否已初始化成功，因为必须要等插件初始化后才能渲染 Workbench */
    const [hasPluginInited, setHasPluginInited] = useState(false);
    const [index, setIndex] = useState(0);
    const [list, setList] = useState([
      {
        image: '',
        schema: project.exportSchema(),
        packages: '',
      },
    ]);
    const keyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      var currKey = 0,
        e = e || event || window.event;
      currKey = e.keyCode || e.which || e.charCode;
      if (currKey == 83 && (e.ctrlKey || e.metaKey)) {
        let meta = list;
        meta[index].schema = project.exportSchema();
        meta[index].packages = material.getAssets().packages;
        setList([...meta]);
        window.localStorage.setItem('projectSchemaList', JSON.stringify(list));
        Message.success('成功保存到本地');
        return false;
      }
    };
    document.onkeydown = keyDown;
    useEffect(() => {
      plugins
        .init()
        .then(() => {
          setHasPluginInited(true);
        })
        .catch((err) => console.error(err));
        // fetchSchema()

        // 模拟云端获取 schema
        const listJSON = window.localStorage.getItem('projectSchemaList') as string
        const list = JSON.parse(listJSON)
        setList(list)
        project.importSchema(list[index].schema);
    }, []);
    
    return hasPluginInited ? (
      // @ts-ignore
      <C.Provider value={{ index, setIndex, list, setList }}>
        <Workbench />
      </C.Provider>
    ) : (
      <></>
    );
  }

  config.setConfig({
    enableCondition: true,
    enableCanvasLock: true,
    supportVariableGlobally: true,
    simulatorUrl: [
      'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/css/react-simulator-renderer.css',
      'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/js/react-simulator-renderer.js',
    ],
  });

  ReactDOM.render(<EditorView />, document.getElementById('lce-container')!);
})();
