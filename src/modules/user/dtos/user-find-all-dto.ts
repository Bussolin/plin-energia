import { ApiProperty } from '@nestjs/swagger';
import { UserBasicDataDto } from '../common/user-basic-data-dto';

export class UserFindAllResponseDto {
    @ApiProperty({
        description: 'The list of users',
        type: [UserBasicDataDto],
    })
    data: UserBasicDataDto[];
}
