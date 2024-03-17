import { Router } from "express";
import { inject, injectable } from "inversify";
import { IAuthClient } from "src/clients/auth-client";
import TYPES from "../types";

@injectable()
export class AuthRouter {
    @inject(TYPES.IAuthClient) private readonly _authClient: IAuthClient;

    router(): Router {
        const router = Router();

        router.post('/login', async (req, res) => {
            const {email, password} = req.body;
            return res.json(await this._authClient.login(email, password));
        })

        return router;
    }
}