export function Controller(basePath: string) {
    return (target: any) => {
        Reflect.defineMetadata("base", basePath, target);
    };
}
