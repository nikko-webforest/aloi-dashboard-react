import React from 'react';
import { addDecorator } from '@storybook/react';
// import { MyContext } from './MyContext';
import { Context } from 'ui/index';

addDecorator((story) => <Context.Provider>{story()}</Context.Provider>);
