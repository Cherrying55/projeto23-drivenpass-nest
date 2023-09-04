import { Injectable } from '@nestjs/common';
import { SiteRepository } from './sites.repository';

@Injectable()
export class SitesService {
    constructor(private readonly siteRepository: SiteRepository){}
    
    async getByURL(url: string){
        return await this.siteRepository.getByURL(url)
    }

    async create(data: any){
        return await this.siteRepository.create(data)
    }
}
