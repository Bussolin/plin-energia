import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DocumentScrapperModule } from './modules/document-scrapper/document-scrapper.module';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [UserModule, DocumentScrapperModule, AuthModule],
    controllers: [],
    providers: [
        {
            provide: 'APP_GUARD',
            useClass: AuthenticationGuard,
        },
    ],
})
export class AppModule {}
