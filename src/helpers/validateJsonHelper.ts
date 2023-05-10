import { validateOrReject } from "class-validator";

export async function validateJson(validate) {
    try {
        let result = await validateOrReject(validate);
        return true;
    } catch (e) {
        if (e.length) {
            const error = e[0].constraints;
            return new Promise((resolve, reject) => {
                reject({
                    error: "Invalid or missing filed",
                    message: Object.values(error),
                });
            });
        }
    }
}
