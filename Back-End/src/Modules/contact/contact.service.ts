import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from '../../Common/Schemas/contact.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto);
    return createdContact.save();
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id).exec();
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const existingContact = await this.contactModel
      .findByIdAndUpdate(id, updateContactDto, { new: true })
      .exec();
    if (!existingContact) {
      throw new NotFoundException('Contact not found');
    }
    return existingContact;
  }

  async remove(id: string): Promise<void> {
    const result = await this.contactModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Contact not found');
    }
  }
}
