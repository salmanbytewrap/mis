// external libraries
import { Response, Request, json } from "express";
import { ResponseError, ResponseSuccess } from "../../utils/ResponseClass";
import Users from "./misModel";
import { CreateRecord } from "./misValidator";
import { validateJson } from "../../helpers/validateJsonHelper";
import client from "../../helpers/redis";

export const create = async (req: Request, res: Response) => {
    let validator = new CreateRecord();
    validator.firstName = req.body.firstName;
    validator.lastName = req.body.lastName;
    validator.email = req.body.email;
    try {
        await validateJson(validator);
    } catch (error) {
        let err = new ResponseError(error);
        return res.status(400).json(err)
    }
    let record = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    })
    Users.create(record, (err, data) => {
        if (err) {
            let error = new ResponseError({ message: err.message });
            return res.status(400).json(error)
        }
        let response = new ResponseSuccess({ data: data });
        return res.status(200).json(response)
    })

};
export const getAllusers = async (req: any, res: Response) => {
    try {
        let offset: number = 0;
        let page: number = 1
        let limit: number = 10;

        if (req.query.page) {
            page = parseInt(req.query.page);
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (page > 1) {
            offset = (page - 1) * limit;
        }

        // skipped for pagination
        // const result = await client.get("key");
        // if (result) {
        //     let response = new ResponseSuccess({ data: JSON.parse(result) });
        //     return res.status(200).json(response)
        // }
        Users.read(offset, limit, async (err, data) => {
            if (err) {
                let error = new ResponseError({ message: err.message });
                return res.status(400).json(error)
            } else {
                await client.set('key', JSON.stringify(data), {
                    EX: 9000,
                    NX: true
                });

                let response = new ResponseSuccess({ data: data });
                return res.status(200).json(response)
            }
        })
    } catch (error) {
        let err = new ResponseError({ message: error.message });
        return res.status(400).json(err)
    }
}
