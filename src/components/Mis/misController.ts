// external libraries
import { Response, Request, json } from "express";
import { ResponseError, ResponseSuccess } from "../../utils/ResponseClass";
import Users from "./misModel";
import { CreateRecord } from "./misValidator";
import { validateJson } from "../../helpers/validateJsonHelper";
import client from "../../helpers/redis";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 *    {
 *    "success": true,
 *   "message": "Success"
 *     }
* @body firstName string
* @body lastName string
* @body email string
* @body type string (user,admin,subadmin)
 */
export const create = async (req: Request, res: Response) => {
    let validator: CreateRecord = new CreateRecord();
    validator.firstName = req.body.firstName;
    validator.lastName = req.body.lastName;
    validator.email = req.body.email;
    validator.type = req.body.type;
    try {
        await validateJson(validator);
    } catch (error) {
        let err = new ResponseError(error);
        return res.status(400).json(err)
    }
    let record: CreateRecord = new Users(validator)
    Users.create(record, (err, data) => {
        if (err) {
            let error = new ResponseError({ message: err.message });
            return res.status(400).json(error)
        }
        let response = new ResponseSuccess({ data: data });
        return res.status(201).json(response)
    })

};

/**
 * 
 * @param req 
 * @param res 
 * @returns [
        {
            "firstName": "Salman",
            "lastName": "Khan",
            "email": "salman@gromo.in",
            "createdAt": "2023-05-10 22:23:13.439",
            "updatedAt": "2023-05-10 22:23:13.439"
        }...]
* @query downlaodFlag boolean to download xlsx file
* @query page for pafination
* @query limit , records per page 
* @query type (user,admin,subadmin)
 */
export const getAllusers = async (req: any, res: any) => {
    try {
        let offset: number = 0, page: number = 1, limit: number = 10, type = req.query.type;
        let download: boolean = req.query.downloadFlag;
        if (req.query.page) {
            page = parseInt(req.query.page);
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (page > 1) {
            offset = (page - 1) * limit;
        }
        let chacheKey = `getAllUser-${page}-${offset}`;

        const result = await client.get(chacheKey);
        if (result) {
            let response = new ResponseSuccess({ data: JSON.parse(result) });
            if (download) {
                return res.xls("reports.csv", JSON.parse(JSON.stringify(result)));

            } else {
                return res.status(200).json(response)
            }
        }
        Users.read(offset, limit, type, async (err, data) => {
            if (err) {
                let error = new ResponseError({ message: err.message });
                return res.status(400).json(error)
            } else {
                await client.set(chacheKey, JSON.stringify(data), {
                    EX: 9000,
                    NX: true
                });
                if (download) {
                    return res.xls("reports.csv", JSON.parse(JSON.stringify(data)));
                }
                let response = new ResponseSuccess({ data: data });
                return res.status(200).json(response)
            }
        })
    } catch (error) {
        let err = new ResponseError({ message: error.message });
        return res.status(400).json(err)
    }
}
