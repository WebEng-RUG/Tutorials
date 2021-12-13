import { Application } from "express";

// A utility interface defining some generic router class
// that supports registering some routes at an ExpressJS "Application"
export interface IRouter {
    attach(app: Application): void;
}