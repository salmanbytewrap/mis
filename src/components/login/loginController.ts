import * as jwt from 'jsonwebtoken';
import { createToken } from '../../helpers/JwtHelper';

export let login = async (req, res) => {
    console.log("api called")
    let auth: any = req.headers.authorization;
    let data = auth.split("Basic");
    let encrypt = Buffer.from(data[1], 'base64').toString();
    if (!encrypt) {
        return res.status(400).send({ error: "Please enter  your email and password." });

    }
    let decryptdata = encrypt.split(":");
    let email = decryptdata[0].toLowerCase();
    let password = decryptdata[1];

    if (email == "salman@gmail.com" && password == "salman@123") {
        try {
            let payload: any = { email: email, password: password };
            const token = await createToken(payload)
            return res.status(200).send({ data: { ...token } })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    } else {
        return res.status(400).send({ error: "Please enter corrct email and password." });
    }
}