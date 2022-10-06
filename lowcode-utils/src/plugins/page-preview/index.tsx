import React, { useContext } from 'react';
import { PluginProps, ProjectSchema } from '@alilc/lowcode-types';
import { project } from '@alilc/lowcode-engine';

import { C } from 'src/index';
import './index.scss';

const BaseComponent = {
  version: '1.0.0',
  componentsMap: [
    {
      package: '@alifd/pro-layout',
      version: '1.0.1-beta.6',
      exportName: 'Page',
      main: 'lib/index.js',
      destructuring: true,
      componentName: 'NextPage',
    },
    { devMode: 'lowcode', componentName: 'Page' },
  ],
  componentsTree: [
    {
      componentName: 'Page',
      id: 'node_dockcviv8fo1',
      props: { ref: 'outerView', style: { height: '100%' } },
      fileName: '/',
      dataSource: {
        list: [
          {
            type: 'fetch',
            isInit: true,
            options: {
              params: {},
              method: 'GET',
              isCors: true,
              timeout: 5000,
              headers: {},
              uri: 'mock/info.json',
            },
            id: 'info',
            shouldFetch: {
              type: 'JSFunction',
              value: "function() { \n  console.log('should fetch.....');\n  return true; \n}",
            },
          },
        ],
      },
      state: {
        text: { type: 'JSExpression', value: '"outer"' },
        isShowDialog: { type: 'JSExpression', value: 'false' },
      },
      css: 'body {\n  font-size: 12px;\n}\n\n.button {\n  width: 100px;\n  color: #ff00ff\n}',
      lifeCycles: {
        componentDidMount: {
          type: 'JSFunction',
          value: "function componentDidMount() {\n  console.log('did mount');\n}",
        },
        componentWillUnmount: {
          type: 'JSFunction',
          value: "function componentWillUnmount() {\n  console.log('will unmount');\n}",
        },
      },
      methods: {
        testFunc: {
          type: 'JSFunction',
          value: "function testFunc() {\n  console.log('test func');\n}",
        },
        onClick: {
          type: 'JSFunction',
          value: 'function onClick() {\n  this.setState({\n    isShowDialog: true\n  });\n}',
        },
        closeDialog: {
          type: 'JSFunction',
          value: 'function closeDialog() {\n  this.setState({\n    isShowDialog: false\n  });\n}',
        },
      },
      originCode:
        'class LowcodeComponent extends Component {\n  state = {\n    "text": "outer",\n    "isShowDialog": false\n  }\n  componentDidMount() {\n    console.log(\'did mount\');\n  }\n  componentWillUnmount() {\n    console.log(\'will unmount\');\n  }\n  testFunc() {\n    console.log(\'test func\');\n  }\n  onClick() {\n    this.setState({\n      isShowDialog: true\n    })\n  }\n  closeDialog() {\n    this.setState({\n      isShowDialog: false\n    })\n  }\n}',
      title: '',
      isLocked: false,
      condition: true,
      conditionGroup: '',
      hidden: false,
      children: [
        {
          componentName: 'NextPage',
          id: 'node_ockzs2vw431',
          props: {
            headerDivider: true,
            minHeight: '100vh',
            presetNav: true,
            presetAside: true,
            footer: false,
            nav: false,
            aside: false,
            placeholderStyle: {
              gridRowEnd: 'span 1',
              gridColumnEnd: 'span 12',
            },
            headerProps: { background: 'surface' },
            header: '',
            isTab: false,
            contentAlignCenter: false,
            contentProps: {
              style: { background: 'rgba(255,255,255,0)' },
            },
          },
          title: '页面',
          isLocked: false,
          condition: true,
          conditionGroup: '',
          hidden: false,
        },
      ],
    },
  ],
  i18n: {},
};

export interface Page {
  image: string;
  schema: any;
  packages: any;
}

const PagePreview: React.FC<PluginProps> = (props): React.ReactElement => {
  const { list, setList, setIndex } = useContext(C) as unknown as {
    list: Page[];
    setList: React.Dispatch<
      React.SetStateAction<
        {
          image: string;
          schema: ProjectSchema;
        }[]
      >
    >;
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
  };

  function editPage(event: Event) {
    if (event.target.nodeName === 'IMG' || event.target.nodeName === 'LI') {
      const idx = event.target.dataset['index'];
      project.importSchema(list[idx].schema);
      setIndex(idx);
    }
  }
  function add(event: Event) {
    event.stopPropagation();
    setList([
      ...list,
      {
        image: '',
        schema: BaseComponent,
        packages: '',
      },
    ]);
  }
  
  return (
    <ul className="list-container" onClick={editPage}>
      {list.map(({ image }, index) => {
        return (
          <li data-index={index} className="add">
            {image ? <img src={image} data-index={index} /> : index + 1}
          </li>
        );
      })}
      <li className="add" onClick={add}>
        新建幻灯片
      </li>
    </ul>
  );
};

export default PagePreview;
