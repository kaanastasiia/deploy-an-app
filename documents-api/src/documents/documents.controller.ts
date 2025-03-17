import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

import { configuration } from '../config';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('/health-check')
  async healthCheck() {
    return {
      configuration: configuration(),
      createdDocumentsCount: await this.documentsService.count(),
    };
  }

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(+id, updateDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(+id);
  }

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads/img',
        filename: (req, file, cb) => {
          const name = (Math.random() + 1).toString(36).substring(7);
          const extention = file.mimetype.split('/')[1];
          cb(null, `${name}.${extention}`);
        },
      }),
    }),
  )
  upload(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    this.documentsService.updatePath(+id, file.path);
    return {
      statusCode: 200,
      data: file.path,
    };
  }

  @Get('download/:id')
  async download(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { path } = await this.documentsService.findOne(+id);
    const file = await this.documentsService.download(+id);
    response.setHeader('Content-Type', `image/${path.split('.')[1]}`);
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${path.split('/')[2]}`,
    );
    response.send(file);
  }
}
