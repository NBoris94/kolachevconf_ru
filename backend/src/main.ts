import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Колачевские чтения')
        .setDescription('Колачевские чтения API')
        .setVersion('1.0')
        .addTag('api')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger', app, document)

    app.enableCors({
        credentials: true,
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization',
    })
    app.use(cookieParser())
    await app.listen(3000)
}
bootstrap();
