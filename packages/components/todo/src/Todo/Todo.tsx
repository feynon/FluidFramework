/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { RootComponent } from "@prague/aqueduct";
import {
  ISharedCell,
  SharedCell,
} from "@prague/cell";
import {
  IComponentHTMLVisual,
} from "@prague/container-definitions";
import {
  ISharedMap,
  SharedMap,
} from "@prague/map";
import {
  IComponentContext,
  IComponentRuntime,
} from "@prague/runtime-definitions";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { TodoView } from "./TodoView";

import { EmbeddedReactComponentFactory } from "../component-lib/embeddedComponent";
import { IComponentReactViewable } from "../component-lib/interfaces";
import { TodoItemName } from "../TodoItem/index";

// tslint:disable-next-line: no-var-requires no-require-imports
const pkg = require("../../package.json");
export const TodoName = `${pkg.name as string}-todo`;

/**
 * Todo base component.
 * Visually contains the following:
 * - Title
 * - New todo item entry
 * - List of todo items
 */
export class Todo extends RootComponent implements IComponentHTMLVisual, IComponentReactViewable {
  private static readonly supportedInterfaces = ["IComponentHTMLVisual", "IComponentHTMLRender",
  "IComponentReactViewable"];

  // DDS ids stored as variables to minimize simple string mistakes
  private readonly innerCellIds = "innerCellIds";
  private readonly titleId = "title";

  /**
   * Do setup work here
   */
  protected async create() {
    // This allows the RootComponent to do setup. In this case it creates the root map
    await super.create();

    // create a list for of all inner todo item components
    // we will use this to know what components to load.
    this.root.set(this.innerCellIds, SharedMap.create(this.runtime));

    // create a cell that we will use for the title
    // we use a cell because we pass it directly to the contentEditable
    const cell = SharedCell.create(this.runtime);
    // Set the default title
    cell.set("My New Todo");
    this.root.set(this.titleId, cell);
  }

  /**
   * Having a static load function allows us to make async calls while creating our object.
   */
  public static async load(runtime: IComponentRuntime, context: IComponentContext): Promise<Todo> {
    const todo = new Todo(runtime, context, Todo.supportedInterfaces);
    await todo.initialize();

    return todo;
  }

  // start IComponentHTMLVisual

  /**
   * Creates a new view for a caller that doesn't directly support React
   */
  public render(div: HTMLElement) {
    // Because we are using React and our caller is not we will use the
    // ReactDOM to render our JSX.Element directly into the provided div.
    // Because we support IComponentReactViewable and createViewElement returns a JSX.Element
    // we can just call that and minimize duplicate code.
    ReactDOM.render(
        this.createViewElement(),
        div,
    );
  }

  // end IComponentHTMLVisual

  // start IComponentReactViewable

  /**
   * If our caller supports React they can query against the IComponentReactViewable
   * Since this returns a JSX.Element it allows for an easier model.
   */
  public createViewElement(): JSX.Element {
    const innerCellIdsMap = this.root.get<ISharedMap>(this.innerCellIds);

    // callback that allows for creation of new Todo Items
    const createComponent = async (props?: any) => {
      // create a new ID for our component
      const id = `item${Date.now().toString()}`;

      // create a new todo item
      await this.createAndAttachComponent(id, TodoItemName, props);

      // Store the id of the component in our ids map so we can reference it later
      innerCellIdsMap.set(id, "");
    };

    // The factory allows us to create new embedded component without having to pipe the
    // getComponent call throughout the app.
    const factory = new EmbeddedReactComponentFactory(this.getComponent.bind(this));
    const titleTextCell = this.root.get<ISharedCell>(this.titleId);
    return(
      <TodoView
          getComponentView = {(id: string) => factory.create(id)}
          createComponent={createComponent.bind(this)}
          map={innerCellIdsMap}
          textCell={titleTextCell}/>
    );
  }

  // end IComponentReactViewable
}
