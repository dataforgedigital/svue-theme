import { Component, DefineComponent, Plugin } from "vue"

export interface ElementInstance {
  original: Component | DefineComponent,
  components?: Record<string, Component | DefineComponent>
  props?: Record<string, unknown>,
  plugins: ({ plugin: Plugin, options: unknown })[],
}

export interface ElementInput extends Omit<ElementInstance, 'plugins'> {
  plugins?: ({ plugin: Plugin, options: unknown })[]
}

export type ElementItem = Component | DefineComponent | ElementInput
