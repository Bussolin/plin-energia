import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule, SwaggerCustomOptions } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Plin leitura')
        .setDescription(
            'Bem-vindo à documentação do Plin leitor. Aqui você encontra informações detalhadas sobre os endpoints disponíveis, como usar, etc.',
        )
        .setVersion('1.0.0')
        // .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    let swaggerOptions: Partial<SwaggerCustomOptions> = {};

    swaggerOptions = {
        swaggerOptions: {
            defaultModelsExpandDepth: -1,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
            tryItOutEnabled: true,
            persistAuthorization: true,
            deepLinking: true,
            filter: true,
            displayRequestDuration: true,
            showRequestDuration: true,
        },
        customSiteTitle: 'Plin leitor API Docs',
    };

    SwaggerModule.setup('api', app, document, swaggerOptions);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
