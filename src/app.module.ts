import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}

//controlers são os endpoints que fazem chamadas HTTP
//services são onde ficam as outras coisas, lógica e etc
