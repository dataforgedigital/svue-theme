import { Component, DefineComponent, Plugin } from "vue";
import { ElementInstance } from "./element";

export interface Instance {
  element: ElementInstance;
  components: Map<string, Component | DefineComponent>;
  plugins: Set<{ plugin: Plugin; options: unknown }>;
  providers: Set<Component | DefineComponent>;
}
