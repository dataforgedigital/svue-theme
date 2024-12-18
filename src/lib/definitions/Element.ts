import { Component, DefineComponent, Plugin } from 'vue';
import { ElementInput, ElementInstance } from './../types/element.d';

class Element implements ElementInstance {
  original: Component | DefineComponent;
  components?: Record<string, Component | DefineComponent>;
  props?: Record<string, unknown>;
  plugins: ({ plugin: Plugin, options: unknown })[];

  constructor(args: ElementInput) {
    this.original = args.original;
    this.components = args.components;
    this.props = args.props;
    this.plugins = args.plugins ?? [];
  }
}

export default Element;
