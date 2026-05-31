import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';

export enum FriendRequestStatus {
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
  BLOCKED = 'BLOCKED',
}

export class RespondFriendRequestDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Friend request id',
  })
  @IsUUID()
  friendshipId: string;

  @ApiProperty({
    enum: FriendRequestStatus,
    example: FriendRequestStatus.ACCEPTED,
  })
  @IsEnum(FriendRequestStatus)
  status: FriendRequestStatus;
}