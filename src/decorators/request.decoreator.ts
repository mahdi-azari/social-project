export function Map(method: string, path: string, middleware: any) {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        if (!Reflect.hasMetadata("routerPath", target)) {
            Reflect.defineMetadata("routerPath", [], target);
        }
        const routes = Reflect.getMetadata("routerPath", target);
        routes.push({
            method,
            path,
            propertyKey,
            middleware,
        });
        Reflect.defineMetadata("routerPath", routes, target);
    };
}
