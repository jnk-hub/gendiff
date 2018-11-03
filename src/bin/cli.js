#!/usr/bin/env node
import '@babel/polyfill';
import program from 'commander';
import {version} from '../../package.json';
import cli from '../cli';

program
  .version(version)
  .arguments('<left>, <right>')
  .option('-f, --format <type>', 'Output format')
  .action(cli)
  .parse(process.argv);
