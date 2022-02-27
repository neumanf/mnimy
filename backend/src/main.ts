import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import * as RedisStore from 'connect-redis';

import { AppModule } from './app.module';
import * as Redis from 'redis';

const redisClient = Redis.createClient({
    url: 'redis://localhost:6379',
    password: '',
    legacyMode: true,
});
redisClient.connect().catch(console.error);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({ origin: process.env.FRONTEND_URL, credentials: true });
    app.use(
        session({
            name: 'SESSION_ID',
            store: new (RedisStore(session))({
                client: redisClient as any,
                logErrors: true,
            }),
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 15 * 60 * 1000,
            },
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(3001);
}
bootstrap();
