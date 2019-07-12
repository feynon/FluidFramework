/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { IComponent, IComponentHTMLVisual  } from "@prague/container-definitions";
import * as React from "react";
import { IComponentReactViewable } from "./interfaces";

/**
 * Creates a new Embedded Component while allowing you to register the getComponent call upfront.
 */
export class EmbeddedReactComponentFactory {
    constructor(private readonly getComponent: (id: string) => Promise<IComponent>) { }

    public create(id: string): JSX.Element {
        return <EmbeddedComponent getComponent={this.getComponent} id={id} />;
    }
}

interface pEmbed {
    getComponent(id: string): Promise<IComponent>;
    id: string;
}

interface sEmbed {
    element: JSX.Element;
}

/**
 * Given a way to get a component will render that component via react if the component supports IComponentReactViewable
 * or standard HTML if the component supports IComponentHTMLViewable.
 *
 * If the component doesn't exist or supports neither interfaces we render and empty <span/>
 */
export class EmbeddedComponent extends React.Component<pEmbed, sEmbed> {
    constructor(props: pEmbed) {
        super(props);

        this.state = {
            element: <span/>,
        };
    }

    async componentWillMount() {
        const component = await this.props.getComponent(this.props.id);
        if (!component) {
            return;
        }

        // Query to see if the component supports IComponentReactViewable
        const reactViewable = component.query<IComponentReactViewable>("IComponentReactViewable");
        if (reactViewable) {
            this.setState({ element: <ReactEmbeddedComponent component={reactViewable}/>});
            return;
        }

        const htmlVisual = component.query<IComponentHTMLVisual>("IComponentHTMLVisual");
        if (htmlVisual) {
            this.setState({ element: <HTMLEmbeddedComponent component={htmlVisual} />});
            return;
        }
    }

    render() {
        return this.state.element;
    }
}

interface pHTML {
    component: IComponentHTMLVisual;
}

/**
 * Embeds a Fluid Component that supports IComponentHTMLViewable
 */
class HTMLEmbeddedComponent extends React.Component<pHTML, { }> {
    private readonly ref: React.RefObject<HTMLDivElement>;

    constructor(props: pHTML) {
        super(props);

        this.ref = React.createRef<HTMLDivElement>();
    }

    async componentDidMount() {
    }

    render() {
        this.props.component.render(this.ref.current);
        return <div ref={this.ref}></div>;
    }
}

interface pReact {
    component: IComponentReactViewable;
}

/**
 * Embeds a Fluid Component that supports IComponentReactViewable
 */
// tslint:disable-next-line:function-name
function ReactEmbeddedComponent(props: pReact) {
    return props.component.createViewElement();
}
