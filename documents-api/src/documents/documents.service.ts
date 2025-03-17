import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { Repository } from 'typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto) {
    return this.documentRepository.save(createDocumentDto);
  }

  async findAll() {
    return this.documentRepository.find();
  }

  async findOne(id: number) {
    return this.documentRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {
    const toUpdate = await this.documentRepository.findOne({ where: { id } });

    const updated = Object.assign(toUpdate, updateDocumentDto);

    return this.documentRepository.save(updated);
  }

  async updatePath(id: number, path: string) {
    const toUpdate = await this.documentRepository.findOne({ where: { id } });
    const updated = Object.assign(toUpdate, { path });

    return this.documentRepository.save(updated);
  }

  async download(id: number) {
    const document = await this.documentRepository.findOne({ where: { id } });
    return readFileSync(join(process.cwd(), document.path));
  }

  async remove(id: number) {
    return this.documentRepository.delete(id);
  }

  async count() {
    return await this.documentRepository.count();
  }

}
