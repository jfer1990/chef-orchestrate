import { NestMiddleware, Injectable } from "@nestjs/common";
import { NextFunction, Response, Request } from "express";
import {UAParser} from 'ua-parser-js';



@Injectable()
export class DeviceInfoMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        const userAgentString = req.headers['user-agent'] || '';
        const parser = new UAParser(userAgentString);
        const result = parser.getResult();
        const deviceType = result.device.type || 'desktop'; 
        const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip ||'unknown';

        req.deviceInfo = {
            deviceType:deviceType,
            browser: result.browser.name || '',
            os: result.os.name || 'Unknow OS',
            userAgent: userAgentString,
            ipAddress: ipAddress
        }
        
        next(); 
    }
}