import { LoadableComponent } from '@loadable/component';
import { omit, set } from 'lodash';
import React from 'react';
import {
    createBrowserRouter,
    createHashRouter,
    matchPath,
    RouteObject,
} from 'react-router-dom';

export interface IRoute<TExtendProperty = any> {
    id: string;
    title?: string;
    path?: string;
    private: boolean;
    index?: boolean;
    outsideLayout?: boolean;
    isInsideSidebar?: boolean;
    element: React.FC<any> | LoadableComponent<unknown>;
    elementProps?: Record<string, any>;
    children?: IRoute<TExtendProperty>[];
}

export class IziRoute<T = any> {
    routes: IRoute<T>[] = [];
    routeObjects: RouteObject[] = [];
    router: ReturnType<typeof createBrowserRouter>;
    pathById: Record<string, string> = {};
    routeById: Record<string, IRoute> = {};
    flatRoutes: Omit<IRoute<T>, 'children'>[] = [];
    routerInstance = createBrowserRouter;
    privateHOC?: (
        Component: React.FC | LoadableComponent<unknown>
    ) => (props: any) => JSX.Element;
    constructor(parameters: {
        routes: IRoute<T>[];
        type?: 'hash' | 'default';
        privateHOC?: (Component: React.FC | LoadableComponent<unknown>) => (props: any) => JSX.Element;
    }) {
        if (parameters.type === 'hash') {
            this.routerInstance = createHashRouter;
        }
        this.routes = parameters.routes;
        this.privateHOC = parameters.privateHOC;
        const test = this.routes
            .map((item) => this.generateRouteObject(item))
            .filter(Boolean) as RouteObject[];
        this.routeObjects = this.routeObjects.concat(test);
        this.router = this.routerInstance(this.routeObjects);
        this.router.subscribe((routerSubriber) => {
            const path = routerSubriber.location.pathname;
            const route = this.getRouteFromPath(path);
            if (route?.title) {
                this.changeTitle(route?.title);
            }
        });
    }

    getRouteObjects() {
        return this.routeObjects;
    }

    getRouter() {
        return this.router;
    }

    getPathPattern(id: string) {
        return this.pathById[id];
    }

    getFlatRoutes() {
        return this.flatRoutes;
    }

    isMatchPath(pattern: string, path: string) {
        return !!matchPath(pattern, path);
    }

    getRouteFromPath(path: string) {
        return this.getFlatRoutes().find((item) => {
            return this.isMatchPath(item.path as string, path);
        });
    }

    getPathById(id: string, params?: Record<string, string>) {
        let path = this.pathById[id];
        if (path) {
            const splitPath = path.split('/');
            path = splitPath
                .map((item) => {
                    if (!/:\w+/g.test(item)) {
                        return item;
                    }
                    const key = item.match(/\w+/g)?.[0] || '';
                    if (!key || !params?.[key]) {
                        return item;
                    }
                    return params[key];
                })
                .filter(Boolean)
                .join('/');
        }
        return '/' + path;
    }

    getRouteById(id: string) {
        return this.routeById[id];
    }

    generateRouteObject(route: IRoute<T>, parentPath = ''): RouteObject | null {
        const fullCurrentPath = [parentPath, route.path].join('/');
        this.pathById[route.id] = fullCurrentPath;
        this.routeById[route.id] = route;
        this.flatRoutes.push({
            ...omit(route, ['children']),
            path: fullCurrentPath,
        });
        let Component = route.element;
        if (route.private && this.privateHOC) {
            Component = this.privateHOC(Component);
        }
        const item: RouteObject = {
            path: route.path,
            element: <Component {...route.elementProps} />,
            children:
                (route.children
                    ?.map((item) => this.generateRouteObject(item, fullCurrentPath))
                    ?.filter(Boolean) as any[]) || [],
        };
        if (route.index) {
            set(item, 'index', true);
            delete item.path;
        }
        if (route.outsideLayout) {
            set(item, 'path', fullCurrentPath);
            this.routeObjects.push(item);
            return null;
        }
        return item;
    }

    changeTitle(title: string) {
        const $title = document.querySelector('title');
        if ($title) {
            $title.remove();
            const $newTitle = document.createElement('title');
            $newTitle.textContent = title;
            document.head.appendChild($newTitle);
        }
    }

    navigate(path: string) {
        const route = this.getRouteFromPath(path);
        if (route?.title) {
            this.changeTitle(route?.title);
        }
        this.getRouter().navigate(path);
    }

    clickNavigate(path: string) {
        return () => this.navigate(path);
    }

    changeTitleToCurrentPath() {
        const route = this.getRouteFromPath(window.location.pathname);
        if (route?.title) {
            this.changeTitle(route?.title);
        }
    }
}
