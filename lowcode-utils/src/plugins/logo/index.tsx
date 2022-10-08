import React from 'react';
import './index.scss';
import { PluginProps } from '@alilc/lowcode-types';

export interface IProps {
  logo?: string;
  href?: string;
}

const Logo: React.FC<IProps & PluginProps> = (props): React.ReactElement => {
  return (
    <a className="lowcode-plugin-logo" href={props.href}>
      {props.logo ? <img className="logo" src={props.logo} /> : ''}
      <h1 className="title">{props.title}</h1>
    </a>
  );
};

export default Logo;
