declare global {
  namespace Express {
    interface Request {
      deviceInfo?: {
        deviceType: string;
        browser: string;
        os: string;
        userAgent: string;
        ipAddress: string;
      }
    }
  }
}

export {}