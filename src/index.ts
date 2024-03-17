import "reflect-metadata";
import express from 'express';
import { AuthRouter } from './routers/auth-router';
import { Container } from 'inversify';
import { AuthClient, IAuthClient } from './clients/auth-client';
import TYPES from './types';
import { AppOptions } from "./options/app-options";

const diContainer = new Container();
diContainer.bind<IAuthClient>(TYPES.IAuthClient).to(AuthClient);
diContainer.bind<AuthRouter>(TYPES.AuthRouter).to(AuthRouter);
diContainer.bind<AppOptions>(TYPES.AppOptions).to(AppOptions);

const app = express();
const port = 5000;

app.use(express.json());
app.use('/auth', diContainer.get<AuthRouter>(TYPES.AuthRouter).router());

app.listen(port);