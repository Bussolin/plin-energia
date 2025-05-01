import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DocumentScrapperModule } from './modules/document-scrapper/document-scrapper.module';

@Module({
    imports: [UserModule, DocumentScrapperModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
