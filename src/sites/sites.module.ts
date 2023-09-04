import { Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { SiteRepository } from './sites.repository';

@Module({
  controllers: [SitesController],
  providers: [SitesService, SiteRepository],
})
export class SitesModule {}
