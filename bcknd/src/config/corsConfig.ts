import {CorsOptions} from 'cors';

const whiteList:string[] = ['http://localhost:3000']; // allowed origins are to be included here..

const corsConfig:CorsOptions = {
    origin: function (origin, cb) {
        if (whiteList.includes(origin as string) || !origin) { //! remove !origin before deployment
            cb(null, true);
        } else {
            cb(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsConfig;