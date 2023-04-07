import { query } from "express"
import { PageDto } from "../dtos/page.dto"
import { SelectQueryBuilder, ObjectLiteral } from 'typeorm'
import { PageOptionsDto } from "../dtos/page-options.dto"
import { PageMetaDto } from "../dtos/page-meta.dto"

export async function paginate (query: SelectQueryBuilder<ObjectLiteral>, pageOptionsDto: PageOptionsDto) {

    query = query.skip(pageOptionsDto.skip).take(pageOptionsDto.take)
    const data = await query.getMany()
    const itemCount = await query.getCount()
    
    const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto })
    return new PageDto(data, pageMeta)
}