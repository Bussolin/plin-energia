import { UserBasicDataDto, UserIdInputDto } from '../common/user-basic-data-dto';
import { OmitType } from '@nestjs/swagger';

export class UserUpdateInputDto extends OmitType(UserBasicDataDto, ['id']) {}

export class UserUpdateInputIdDto extends UserIdInputDto {}
