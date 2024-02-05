import { Router } from "express";

export interface IRoute {
    basePath: string;
    router: Router;
}
