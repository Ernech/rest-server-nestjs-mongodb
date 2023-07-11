import { Controller, Get, Param } from '@nestjs/common';
import { query } from 'express';
import { Authroization } from 'src/decorators/auth.decorator';
import { SearchService } from 'src/services/search/search.service';

@Controller('search')
export class SearchController {

    constructor(private searchService:SearchService){}

    @Authroization(false)
    @Get('/:collection/:query')
    async search(@Param('collection') collection:string, @Param('query') query:string){
        return this.searchService.search(collection,query);
    }

}
