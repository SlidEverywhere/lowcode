import { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { common, plugins, config, project, material } from '@alilc/lowcode-engine';
import { Message, Dialog } from '@alifd/next';

import registerPlugins from './universal/plugin';
import './universal/global.scss';
import { filterPackages } from '@alilc/lowcode-plugin-inject';

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
    const keyDown = (e) => {
      e.preventDefault();
      var currKey = 0,
        e = e || event || window.event;
      currKey = e.keyCode || e.which || e.charCode;
      if (currKey == 83 && (e.ctrlKey || e.metaKey)) {
        let meta = list;
        meta[index].schema = project.exportSchema();
        setList([...meta]);
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
    }, []);
    return hasPluginInited ? (
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
