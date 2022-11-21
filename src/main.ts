import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './shares/interceptors/response.interceptor';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const port = process.env.PORT;
    const appName = process.env.APP_NAME || 'test';
    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
        customSiteTitle: appName,
        swaggerOptions: {
            docExpansion: 'list',
            filter: true,
            displayRequestDuration: true,
        },
    });
    app.useGlobalInterceptors(new ResponseInterceptor());
    // app.useGlobalFilters(new HttpExceptionFilter());
    const logger = new Logger();
    await app.listen(port);
    logger.log(`Application is running on: ${port}`);
}

bootstrap();
